// import * as ort from 'onnxruntime-web';
import { models, ortDists } from '../../config';
import { updateTestQueueStatus, addResult, updateInfo, median, loadScript, removeElement, getHfUrlById, getAwsUrlById, getLocalUrlById, getHfMirrorUrlById, average, minimum } from '../js/utils';
import { testQueueStore, testQueueLengthStore, resultsStore, numberOfRunsStore, modelDownloadUrlStore } from '../../store/store';
import { getModelOPFS } from '../js/nn_utils'
import to from 'await-to-js';

/**
 * @type {number}
 */
export let numOfRuns;

numberOfRunsStore.subscribe((value) => {
  numOfRuns = value;
});

/**
 * @type {number}
 */
export let modelDownloadUrl;

modelDownloadUrlStore.subscribe((value) => {
  modelDownloadUrl = value;
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

const getInputsById = (id) => {
  for (const model of models) {
    if (model.id === id) {
      return model.inputs;
    }
  }
  return null;
}

const getFeeds = (session, modelName, _backend) => {
  let feeds = {};
  let inputs = getInputsById(modelName);
  let inputNames = session.inputNames;

  for (let input of inputs) {
    if (isDict(input)) {
      for (let key in input) {
        let value = input[key];
        feeds[key] = getTensor(value[0], value[1], value[2]);
      }
    }
  }

  return feeds;
}

const getTensor = (type, data, dims) => {
  let typedArray;
  if (type === 'bool') {
    return new ort.Tensor(type, [data], [1]);
  } else if (type === 'uint16') {
    typedArray = Uint16Array;
  } else if (type === 'float16') {
    typedArray = Uint16Array;
  } else if (type === 'float32') {
    typedArray = Float32Array;
  } else if (type === 'int32') {
    typedArray = Int32Array;
  } else if (type === 'int64') {
    typedArray = BigInt64Array;
  }

  let _data;
  if (Array.isArray(data)) {
    _data = data;
  } else {
    let size = 1;
    dims.forEach((dim) => {
      size *= dim;
    });
    if (data === 'random') {
      _data = typedArray.from({ length: size }, () => Math.random());
    } else if (data === 'ramp') {
      _data = typedArray.from({ length: size }, (_, i) => i);
    } else {
      _data = typedArray.from({ length: size }, () => data);
    }

  }
  return new ort.Tensor(type, _data, dims);
}

const isDict = (v) => {
  return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
}

export const dataTypeToArrayConstructor = {
  float32: Float32Array,
  uint16: Uint16Array,
  float16: Uint16Array,
  int32: Int32Array,
  int64: BigInt64Array,
  BigInt64Array: BigInt64Array,
};

export const clone = (x) => {
  let feed = {};
  for (const [key, value] of Object.entries(x)) {
    let func = dataTypeToArrayConstructor[value.type];
    let arrayType = func.from(value.data);
    feed[key] = new ort.Tensor(
      value.type,
      arrayType.slice(0),
      value.dims
    );
  }
  return feed;
}

const l = (i) => {
  console.log(i);
}

const getFreeDimensionOverridesById = (id) => {
  for (let i = 0; i < models.length; i++) {
    if (models[i].id === id) {
      const firstKey = Object.keys(models[i].inputs[0])[0];
      return models[i].inputs[0][firstKey][3];
    }
  }
  return null;
}

const getModelUrl = (_model) => {
  let modelPath = getHfUrlById(_model);
  if (modelDownloadUrl === 1) {
    modelPath = getHfUrlById(_model);
  } else if (modelDownloadUrl === 2) {
    modelPath = getHfMirrorUrlById(_model);
  } else if (modelDownloadUrl === 3) {
    modelPath = getAwsUrlById(_model);
  } else if (modelDownloadUrl === 0) {
    modelPath = getLocalUrlById(_model);
  }
  return modelPath;
}

const main = async (_id, _model, _modelType, _dataType, _modelSize, _backend) => {

  let backend = 'wasm';
  let wasmSimd = false;
  let numThreads = 1;
  let deviceType = 'cpu';

  switch (_backend) {
    case 'wasm_1':
      backend = 'wasm';
      wasmSimd = true;
      numThreads = 1;
      deviceType = 'cpu';
      break;
    case 'wasm_4':
      backend = 'wasm';
      wasmSimd = true;
      numThreads = 4;
      deviceType = 'cpu';
      break;
    case 'webgl':
      backend = 'webgl';
      deviceType = 'gpu';
      break;
    case 'webgpu':
      backend = 'webgpu';
      wasmSimd = true;
      numThreads = 4;
      deviceType = 'gpu';
      break;
    case 'webnn_cpu_1':
      backend = 'webnn';
      wasmSimd = true;
      numThreads = 1;
      deviceType = 'cpu';
      break;
    case 'webnn_cpu_4':
      backend = 'webnn';
      wasmSimd = true;
      numThreads = 4;
      deviceType = 'cpu';
      break;
    case 'webnn_gpu':
      backend = 'webnn';
      wasmSimd = true;
      numThreads = 4;
      deviceType = 'gpu';
      break;
    case 'webnn_npu':
      backend = 'webnn';
      wasmSimd = true;
      numThreads = 1;
      deviceType = 'npu';
      break;
    default:
      backend = 'wasm';
      wasmSimd = true;
      numThreads = 1;
      deviceType = 'cpu';
      break;
  }

  if (backend === 'webgpu') {
    removeElement('default');
    removeElement('webnn');
    await loadScript('webgpu', ortDists.webgpu.url);
  } else if (backend === 'webnn' || backend === 'webgl') {
    removeElement('webgpu');
    removeElement('default');
    await loadScript('webnn', ortDists.webnn_webglfix.url);
  } else {
    removeElement('webnn');
    removeElement('webgpu');
    await loadScript('default', ortDists.public.url);
  }

  let options = {
    executionProviders: [
      {
        name: backend,
        deviceType: deviceType,
        powerPreference: "default",
        preferredLayout: 'NHWC',
        numThreads: numThreads
      },
    ],
    //executionProviders: [{name: "webnn", deviceType: 'gpu', powerPreference: 'high-performance' }],
  };

  // options.logSeverityLevel = 0;
  // options.logVerbosityLevel = 0;

  if (backend === 'wasm' || backend === 'webgpu') {
    ort.env.wasm.numThreads = numThreads;
    ort.env.wasm.simd = wasmSimd;
  } else {
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.simd = wasmSimd;
  }

  if (backend === 'webnn' || _backend === 'wasm_4') {
    ort.env.wasm.proxy = true;
  } else {
    ort.env.wasm.proxy = false;
  }

  let freeDimensionOverrides = getFreeDimensionOverridesById(_model);
  if (freeDimensionOverrides) {
    options.freeDimensionOverrides = freeDimensionOverrides;
  }

  l(`ort.env.wasm.numThreads: ${ort.env.wasm.numThreads}`)
  l(`ort.env.wasm.simd: ${ort.env.wasm.simd}`)
  l(`EP options numThreads: ${numThreads}`)
  l(`ort.env.wasm.proxy: ${ort.env.wasm.proxy}`)

  // if (backend === 'webgpu') {
  //   options = { executionProviders: ["webgpu"] };
  // }

  l(`EP options:`)
  l(options.executionProviders[0])

  updateTestQueueStatus(_id, 2);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 1, null, null, [], null, null, null, null);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 2, null, null, [], null, null, null, null);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Testing ${_model} (${_modelType}/${_dataType}/${_modelSize}) with ${_backend} backend`);

  let modelPath = getModelUrl(_model);

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Downloading model from ${modelPath}`);

  let modelBuffer = await getModelOPFS(_model, modelPath, false);
  if (modelBuffer.byteLength < 1024) {
    modelBuffer = await getModelOPFS(_model, modelPath, true);
  }
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Creating onnx runtime web inference session`);

  const compilationStart = performance.now();
  const sess = await ort.InferenceSession.create(modelBuffer, options);
  let compilationTime = performance.now() - compilationStart;
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Compilation Time: ${compilationTime} ms`);

  let feeds = getFeeds(sess, _model, _backend);

  let numOfWarmups = 10;

  if (backend === 'webgl' || backend === 'webgpu' || (backend === 'webnn' && deviceType === 'gpu')) {
    numOfWarmups = 10;
  }

  let firstInferenceTime = 0;
  let warmupTime = 0;
  let warmupTimes = [];
  for (let j = 0; j < numOfWarmups; j++) {
    const warmupstart = performance.now();
    if (backend === 'webnn' || _backend === 'wasm_4') {
      await sess.run(clone(feeds));
    } else {
      await sess.run(feeds);
    }
    warmupTime = performance.now() - warmupstart;
    if (j === 0) {
      firstInferenceTime = warmupTime;
    }
    warmupTimes.push(warmupTime);
  }

  let inferenceTimes = [];
  let inferenceTimesMedian = null;
  let inferenceTimesAverage = null;
  let inferenceTimesBest = null;
  for (let i = 0; i < numOfRuns; i++) {
    const start = performance.now();
    if (backend === 'webnn' || _backend === 'wasm_4') {
      // console.time('wanming_');
      await sess.run(clone(feeds));
      // console.timeEnd('wanming_');
    } else {
      await sess.run(feeds);
    }
    let inferenceTime = performance.now() - start;
    inferenceTimes.push(inferenceTime);
    // updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time [${i + 1}/${numOfRuns}]: ${inferenceTime} ms`);
  }

  inferenceTimesMedian = parseFloat(median(inferenceTimes).toFixed(2));
  inferenceTimesAverage = average(inferenceTimes);
  inferenceTimesBest = minimum(inferenceTimes);

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time on Warmup [${numOfWarmups} times]: [${warmupTimes}] ms`);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] First Inference Time on Warmup: ${firstInferenceTime} ms`);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (Best): ${inferenceTimesBest} ms`);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (Median): ${inferenceTimesMedian} ms`);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (Average): ${inferenceTimesAverage} ms`);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Times: [${numOfRuns} times] [${inferenceTimes}] ms`);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 3, compilationTime, firstInferenceTime, inferenceTimes, inferenceTimesMedian, inferenceTimesAverage, inferenceTimesBest, null);

  await sess.release();
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Test ${_model} (${_modelType}/${_dataType}) with ${_backend} backend completed`);
}

export const runOnnx = async (_id, _model, _modelType, _dataType, _modelSize, _backend) => {
  // await main(_id, _model, _modelType, _dataType, _modelSize, _backend);

  const [err, data] = await to(main(_id, _model, _modelType, _dataType, _modelSize, _backend));
  if (err) {
    addResult(_model, _modelType, _dataType, _modelSize, _backend, 4, null, null, [], null, null, null, err.message);
    updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Error: ${_model} (${_modelType}/${_dataType}) with ${_backend} backend`);
    updateInfo(err.message);
  } else {
    // use data 
  }
}