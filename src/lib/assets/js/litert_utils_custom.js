import {
  updateTestQueueStatus, addResult, updateInfo, median, removeElement,
  average, minimum, getInputsById
} from './utils';
import { liteRtJsVersionStore, testQueueStore, testQueueLengthStore, resultsStore, numberOfRunsStore, customStore } from '../../store/store';
import { sleep, getModelUrl } from '$lib/assets/js/utils';
import to from 'await-to-js';
import percentile from 'percentile';
import { loadAndCompile, Tensor, unloadLiteRt } from '@litertjs/core';
import { createInputTensors, getOrderedInputDescriptors, getOrderedOutputDescriptors, getInputDataTypes } from './litert_helper';

/**
 * @type {{ selected?: any; stable?: any; dev?: any; }}
 */
export let liteRtJsVersion;

liteRtJsVersionStore.subscribe((value) => {
  liteRtJsVersion = value;
});

/**
 * @type {number}
 */
export let numOfRuns;

numberOfRunsStore.subscribe((value) => {
  numOfRuns = value;
});

/**
 * @type {string[]}
 */
export let testQueue;
testQueueStore.subscribe((value) => {
  testQueue = value;
});

/**
 * @type {number}
 */
export let testQueueLength;

testQueueLengthStore.subscribe((value) => {
  testQueueLength = value;
});

/**
 * @type {string[]}
 */
export let results;
resultsStore.subscribe((value) => {
  results = value;
});

const main = async (_id, _model, _modelType, _dataType, _modelSize, _backend, _buffer) => {
  console.log(getInputsById(_model));
  const removeTag = () => {
    removeElement('default');
    removeElement('webgpu');
    removeElement('webnn');
  }

  if (liteRtJsVersion) {
    removeTag();
  }

  // Initialize LiteRT.js's Wasm files (guarded and idempotent)
  const isWebNN = _backend.startsWith('webnn');
  const needsJspi = isWebNN;
  const needsThreads = _backend === 'wasm_4';
  const requiredMode = needsJspi ? 'jspi' : (needsThreads ? 'threaded' : 'standard');

  try {
    if (typeof window !== 'undefined') {
      const { loadLiteRt } = await import('@litertjs/core');
      const wasmRoot = '/litertjs/2.5.0/core/wasm';

      // If already loaded with a different mode, unload first
      if (window.__litertLoaded__ && window.__litertMode__ !== requiredMode) {
        try {
          unloadLiteRt();
        } catch (e) {
          console.warn('LiteRT unload warning:', e?.message || e);
        }
        window.__litertLoaded__ = false;
      }

      if (!window.__litertLoaded__) {
        updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Initializing LiteRT.js's Wasm files`);
        if (needsJspi) {
          await loadLiteRt(wasmRoot, {jspi: true});
          updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] [JSPI] LiteRt loaded with JSPI for WebNN`);
        } else if (needsThreads) {
          try {
            await loadLiteRt(wasmRoot, {threads: true});
            updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] [Multithreaded Wasm] LiteRt loaded with threads`);
          } catch (e) {
            await loadLiteRt(wasmRoot, {threads: false});
            updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] [Multithreaded Wasm] Failed to load LiteRt with threads`);
          }
        } else {
          await loadLiteRt(wasmRoot, {threads: false});
        }
        window.__litertLoaded__ = true;
        window.__litertMode__ = requiredMode;
      }
    }
  } catch (e) {
    console.warn('LiteRT WASM load warning:', e?.message || e);
  }

  let accelerator = 'webgpu';
  let webNNOptions = {};
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Initialize LiteRT.js's Wasm files for ${_backend} backend`);

  if (_backend.indexOf('wasm') > -1) {
    accelerator = 'wasm';
  } else if (_backend.startsWith('webnn')) {
    accelerator = 'webnn';
    if (_backend === 'webnn_cpu') {
      webNNOptions = { devicePreference: 'cpu' };
    } else if (_backend === 'webnn_gpu') {
      webNNOptions = { devicePreference: 'gpu' };
    } else if (_backend === 'webnn_npu') {
      webNNOptions = { devicePreference: 'npu' };
    }
  }

  updateTestQueueStatus(_id, 2);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 1, null, null, null, null, [], null, null, null, null, null);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 2, null, null, null, null, [], null, null, null, null, null);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Testing ${_model} (${_modelType}/${_dataType}/${_modelSize}) with ${_backend} backend`);

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Load model from local model buffer`);

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Compiling model, please wait...`);

  const compilationStart = performance.now();
  const compileOpts = { accelerator };
  if (accelerator === 'webnn') {
    compileOpts.webNNOptions = webNNOptions;
  }
  const model = await loadAndCompile(_buffer, compileOpts);
  let loadAndCompilationTime = performance.now() - compilationStart;
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Load and Compilation Time: ${loadAndCompilationTime} ms`);

  let inputDataTypes = getInputDataTypes(model);
  let dataTypeStyle = 'float32'; // default value

  if (inputDataTypes) {
    // For UI purpose only, it doesn't represent the actual model input data types
    // Check for highest priority data types first
    if (inputDataTypes.some(type => type.includes('uint4') || type.includes('int4'))) {
      dataTypeStyle = 'int4';
    } else if (inputDataTypes.some(type => type.includes('uint8') || type.includes('int8'))) {
      dataTypeStyle = 'int8';
    } else if (inputDataTypes.some(type => type.includes('float16'))) {
      dataTypeStyle = 'float16';
    } else if (inputDataTypes.some(type => type.includes('int32') || type.includes('int64'))) {
      dataTypeStyle = 'float32';
    }
    // If none of the above match, it stays 'float32' (default)
  }

  document.body.setAttribute('class', dataTypeStyle);

  const inputDescriptors = getOrderedInputDescriptors(model);
  const outputDescriptors = getOrderedOutputDescriptors(model);

  if (inputDescriptors && inputDescriptors.length > 0) {
    customStore.update((current) => ({
      ...current,
      inputs: inputDescriptors || []
    }));
  }

  if (outputDescriptors && outputDescriptors.length > 0) {
    customStore.update((current) => ({
      ...current,
      outputs: outputDescriptors || []
    }));
  }

  let numOfWarmups = 1;
  let firstInferenceTime = 0, warmupTimes = [], inferenceTimes = [], timeToFirstInference = null, inferenceTimesAverage = null, inferenceTimesMedian = null, inferenceTimesThroughput = null, inferenceTimesNinety = null, inferenceTimesBest = null;

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inferencing, please wait... `);

  // Create base tensors only for WASM/WebNN backend (since it reuses them)
  // For WebGPU, we'll create fresh tensors each iteration anyway
  const isWebGPU = _backend === 'webgpu';
  let baseTensors = null;
  if (!isWebGPU) {
    const { inputTensors } = createInputTensors(model);
    baseTensors = inputTensors;
    console.log(`Base tensors created: ${baseTensors?.length} tensors`);
  }

  let throughputStart = performance.now();
  for (let i = 0; i < numOfWarmups + numOfRuns; i++) {
    // Always create fresh tensors for each iteration
    let inputTensors;
    if (isWebGPU) {
      // Create fresh tensors each iteration for WebGPU
      const { inputTensors: freshTensors } = createInputTensors(model);
      inputTensors = freshTensors;
    } else {
      // For WASM/WebNN, reuse the baseTensors (created once above)
      inputTensors = baseTensors;
    }

    const gpuTensors = [];
    let processedInputs = [];

    if (isWebGPU) {
      for (const tensor of inputTensors) {
        const gpuTensor = await tensor.moveTo('webgpu');
        gpuTensors.push(gpuTensor);
        processedInputs.push(gpuTensor);
      }
    } else {
      processedInputs = inputTensors;
    }

    console.log(`About to call model.run() with ${processedInputs?.length} tensors`);
    let start = performance.now();

    // Based on the source code of `compiled_model.ts`, the `run` method
    // for the primary signature expects a single argument: an array of Tensors.
    const results = await model.run(processedInputs);

    // Collect results on CPU for inspection
    let cpuResults = [];
    if (isWebGPU) {
      for (const result of results) {
        const cpuResult = await result.moveTo('wasm');
        cpuResults.push(cpuResult);
      }
    } else {
      cpuResults = Array.isArray(results) ? results : [results];
    }

    let inferenceTime = performance.now() - start;

    if (i === 0) {
      firstInferenceTime = parseFloat(inferenceTime).toFixed(2);
      timeToFirstInference = (parseFloat(loadAndCompilationTime) + parseFloat(firstInferenceTime)).toFixed(2);
    }

    (i < numOfWarmups) ? warmupTimes.push(inferenceTime) : inferenceTimes.push(inferenceTime);

    if (cpuResults.length > 0) {
      try {
        console.log('Result data:', cpuResults[0]);
      } catch { }
    }

    // Cleanup
    // 1. Delete CPU results we created
    cpuResults.forEach(r => { if (r?.delete) r.delete(); });

    if (isWebGPU) {
      // 2. Delete GPU tensors we created
      gpuTensors.forEach(t => { if (t?.delete) t.delete(); });
      // 3. Delete the fresh CPU input tensors we created this iteration
      inputTensors.forEach(t => {
        try {
          if (t && t?.delete) t.delete();
        } catch (ex) {
          console.warn('Error deleting inputTensor:', ex);
        }
      });
    }
    // Note: For WASM/WebNN path, we reuse baseTensors, so don't delete them in the loop
  }

  // Final cleanup: delete base tensors only if they exist (WASM case)
  if (baseTensors) {
    baseTensors.forEach(t => {
      try {
        if (t && t?.delete) t.delete();
      } catch (ex) {
        console.error('Error deleting baseTensor:', ex);
      }
    }
    );
  }

  // Explicitly delete the compiled model to prevent state leakage to the next run.
  if (model?.delete) {
    model.delete();
    console.log(`Model for ${_model} with ${_backend} backend explicitly deleted.`);
  }

  inferenceTimesThroughput = parseFloat(1000.00 / ((performance.now() - throughputStart) / (numOfWarmups + numOfRuns))).toFixed(2) + ' FPS';

  inferenceTimesAverage = average(inferenceTimes);
  inferenceTimesMedian = parseFloat(median(inferenceTimes).toFixed(2));

  inferenceTimesNinety = percentile(90, inferenceTimes);
  inferenceTimesNinety = inferenceTimesNinety.toFixed(2);
  inferenceTimesBest = minimum(inferenceTimes);

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time on Warmup / ${numOfWarmups} time(s): [${warmupTimes}] ms`);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] First Inference Time: ${firstInferenceTime} ms`);
  await sleep(100);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Time to First Inference: ${timeToFirstInference} ms`);
  await sleep(100);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (Average): ${inferenceTimesAverage} ms`);
  await sleep(100);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (Median): ${inferenceTimesMedian} ms`);
  await sleep(100);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (90th Percentile): ${inferenceTimesNinety} ms`);
  await sleep(100);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (Best): ${inferenceTimesBest} ms`);
  await sleep(100);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (${numOfRuns} runs/iterations): [${inferenceTimes}] ms`);
  await sleep(100);
  const totalInferenceTimes = inferenceTimes.reduce((a, b) => a + b, 0).toFixed(2);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (${numOfRuns} runs/iterations in total): ${totalInferenceTimes} ms`);
  await sleep(100);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Throughput (${numOfRuns} runs/iterations): ${inferenceTimesThroughput}`);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 3, loadAndCompilationTime, null, firstInferenceTime, timeToFirstInference, inferenceTimes, inferenceTimesMedian, inferenceTimesThroughput, inferenceTimesNinety, inferenceTimesAverage, inferenceTimesBest, null);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Test ${_model} (${_modelType}/${_dataType}) with ${_backend} backend completed`);
  await sleep(500);
}

export const runTflite = async (_id, _model, _modelType, _dataType, _modelSize, _backend, _buffer) => {
  // await main(_id, _model, _modelType, _dataType, _modelSize, _backend);

  // let modelInfo = JSON.stringify(getModelInfoById(_model), null, '');
  // modelInfo = modelInfo.replaceAll(':', ': ');
  // updateInfo(`Model Info: ${modelInfo}`)

  if (_backend === 'webgl') {
    updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Skip: No ${_backend} accelerator for LiteRT.js`);
  } else {
    const [err, data] = await to(main(_id, _model, _modelType, _dataType, _modelSize, _backend, _buffer));
    if (err) {
      addResult(_model, _modelType, _dataType, _modelSize, _backend, 4, null, null, null, [], null, null, null, null, err.message);
      updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Error: ${_model} (${_modelType}/${_dataType}) with ${_backend} backend`);
      updateInfo(err.message);
    } else {
      // use data 
    }
  }
}