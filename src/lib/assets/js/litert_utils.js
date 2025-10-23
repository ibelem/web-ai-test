import {
  updateTestQueueStatus, addResult, updateInfo, median, removeElement,
  average, minimum, getInputsById
} from '../js/utils';
import { liteRtJsVersionStore, testQueueStore, testQueueLengthStore, resultsStore, numberOfRunsStore } from '../../store/store';
import { sleep, getModelUrl } from '$lib/assets/js/utils';
import to from 'await-to-js';
import percentile from 'percentile';
import { loadAndCompile, Tensor } from '@litertjs/core';
import { createInputTensors } from './litert_helper';

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

const main = async (_id, _model, _modelType, _dataType, _modelSize, _backend) => {
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
  try {
    if (typeof window !== 'undefined' && !window.__litertLoaded__) {
      const { loadLiteRt } = await import('@litertjs/core');
      const wasmRoot = '/litertjs/0.2.1/core/wasm';
      updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Initializing LiteRT.js's Wasm files`);
      if (_backend === 'wasm_4') {
        try {
          await loadLiteRt(wasmRoot, {threads: true});
          updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] [Multithreaded Wasm] LiteRt loaded with threads`);
        } catch (e) {
          await loadLiteRt(wasmRoot);
          updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] [Multithreaded Wasm] Failed to load LiteRt with threads`);
        }
      } else {
        await loadLiteRt(wasmRoot);
      }
      window.__litertLoaded__ = true;
    }
  } catch (e) {
    console.warn('LiteRT WASM load warning:', e?.message || e);
  }

  let modelPath = getModelUrl(_model);
  let accelerator = 'webgpu';
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Initialize LiteRT.js's Wasm files for ${_backend} backend`);

  if (_backend === 'wasm_1') {
    accelerator = 'wasm';
  }

  updateTestQueueStatus(_id, 2);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 1, null, null, null, null, [], null, null, null, null, null);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 2, null, null, null, null, [], null, null, null, null, null);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Testing ${_model} (${_modelType}/${_dataType}/${_modelSize}) with ${_backend} backend`);

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Fetching model from ${modelPath}`);

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Compiling model, please wait...`);

  const compilationStart = performance.now();
  const model = await loadAndCompile(modelPath, { accelerator });
  let loadAndCompilationTime = performance.now() - compilationStart;
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Load and Compilation Time: ${loadAndCompilationTime} ms`);

  let numOfWarmups = 1;
  let firstInferenceTime = 0, warmupTimes = [], inferenceTimes = [], timeToFirstInference = null, inferenceTimesAverage = null, inferenceTimesMedian = null, inferenceTimesThroughput = null, inferenceTimesNinety = null, inferenceTimesBest = null;

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inferencing, please wait... `);

  // Create base tensors only for WASM backend (since it reuses them)
  // For WebGPU, we'll create fresh tensors each iteration anyway
  let baseTensors = null;
  if (_backend !== 'webgpu') {
    const { inputTensors } = createInputTensors(model);
    baseTensors = inputTensors;
    console.log(`Base tensors created: ${baseTensors?.length} tensors`);
  }

  let throughputStart = performance.now();
  for (let i = 0; i < numOfWarmups + numOfRuns; i++) {
    // Always create fresh tensors for each iteration
    let inputTensors;
    if (_backend === 'webgpu') {
      // Create fresh tensors each iteration for WebGPU
      const { inputTensors: freshTensors } = createInputTensors(model);
      inputTensors = freshTensors;
    } else {
      // For WASM, reuse the baseTensors (created once above)
      inputTensors = baseTensors;
    }

    const gpuTensors = [];
    let processedInputs = [];

    if (_backend === 'webgpu') {
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
    const results = model.run(processedInputs);

    // Collect results on CPU for inspection
    let cpuResults = [];
    if (_backend === 'webgpu') {
      for (const result of results) {
        const cpuResult = await result.moveTo('wasm');
        cpuResults.push(cpuResult);
      }
    } else {
      cpuResults = results;
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

    if (_backend === 'webgpu') {
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
    // Note: For WASM path, we reuse baseTensors, so don't delete them in the loop
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

export const runTflite = async (_id, _model, _modelType, _dataType, _modelSize, _backend) => {
  // await main(_id, _model, _modelType, _dataType, _modelSize, _backend);

  // let modelInfo = JSON.stringify(getModelInfoById(_model), null, '');
  // modelInfo = modelInfo.replaceAll(':', ': ');
  // updateInfo(`Model Info: ${modelInfo}`)

  if (_backend === 'webgl') {
    updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Skip: No ${_backend} accelerator for LiteRT.js`);
  } else if (_backend === 'webnn_cpu' || _backend === 'webnn_gpu' || _backend === 'webnn_npu') {
    updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Skip: The ${_backend} accelerator support for LiteRT.js is WIP`);
  } else {
    const [err, data] = await to(main(_id, _model, _modelType, _dataType, _modelSize, _backend));
    if (err) {
      addResult(_model, _modelType, _dataType, _modelSize, _backend, 4, null, null, null, [], null, null, null, null, err.message);
      updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Error: ${_model} (${_modelType}/${_dataType}) with ${_backend} backend`);
      updateInfo(err.message);
    } else {
      // use data 
    }
  }
}