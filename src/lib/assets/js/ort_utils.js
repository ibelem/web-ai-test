// import * as ort from 'onnxruntime-web';
import { models, ortDists } from '../../config';
import { updateTestQueueStatus, addResult, updateInfo, sleep, median, loadScript, removeElement, getHfUrlById, getAwsUrlById, getLocalUrlById } from '../js/utils';
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
  console.log(inputs);
  let inputNames = session.inputNames;
  console.log('session.inputNames: ' + inputNames);

  for (let input of inputs) {
    if (isDict(input)) {
      for (let key in input) {
        let value = input[key];
        feeds[key] = getTensor(value[0], value[1], value[2]);
      }
    }
  }

  console.log('------ feeds ------');
  console.log(feeds);

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
    modelPath = getAwsUrlById(_model);
  } else if (modelDownloadUrl === 0) {
    modelPath = getLocalUrlById(_model);
  }

  return modelPath;
}

const main = async (_id, _model, _modelType, _dataType, _backend) => {

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
    await loadScript('webgpu', ortDists.webgpu);
  } else if (backend === 'webnn' || backend === 'webgl') {
    removeElement('webgpu');
    removeElement('default');
    await loadScript('webnn', ortDists.webnn_webglfix);
  } else {
    removeElement('webnn');
    removeElement('webgpu');
    await loadScript('default', ortDists.public);
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
  //// options.logVerbosityLevel = 0;

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
  console.log('options.freeDimensionOverrides: ');
  console.log(freeDimensionOverrides);
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
  addResult(_model, _modelType, _dataType, _backend, 1, [], null);
  addResult(_model, _modelType, _dataType, _backend, 2, 0, [], 0, null);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Testing ${_model} (${_modelType}/${_dataType}) with ${_backend} backend`);

  let modelPath = getModelUrl(_model);

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Downloading model from ${modelPath}`);

  let modelBuffer = await getModelOPFS(_model, modelPath, false);
  if (modelBuffer.byteLength < 1024) {
    modelBuffer = await getModelOPFS(_model, modelPath, true);
  }
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Creating onnx runtime web inference session`);

  const sess = await ort.InferenceSession.create(modelBuffer, options);
  let feeds = getFeeds(sess, _model, _backend);

  let numOfWarmups = 1;

  if (backend === 'webgl' || backend === 'webgpu' || (backend === 'webnn' && deviceType === 'gpu')) {
    numOfWarmups = 5;
  }

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Warming up ${numOfWarmups} time(s)`);

  let firstWarmupTime = 0;
  let warmupTime = 0;
  for (let j = 0; j < numOfWarmups; j++) {
    const warmupstart = performance.now();

    if (backend === 'webnn' || _backend === 'wasm_4') {
      await sess.run(clone(feeds));
    } else {
      await sess.run(feeds);
    }

    warmupTime = performance.now() - warmupstart;
    if (j === 0) {
      firstWarmupTime = warmupTime;
    }
    updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Warm Up Time [${j + 1}/${numOfWarmups}]: ${warmupTime} ms`);
  }

  let inferenceTimes = [];
  let inferenceTimesMedian = null;
  for (let i = 0; i < numOfRuns; i++) {
    const start = performance.now();
    // l(feeds);
    if (backend === 'webnn' || _backend === 'wasm_4') {
      l('Clone feeds for: ' + backend + ' ' + _backend);
      await sess.run(clone(feeds));
    } else {
      await sess.run(feeds);
    }

    let inferenceTime = performance.now() - start;
    inferenceTimes.push(inferenceTime);
    inferenceTimesMedian = parseFloat(median(inferenceTimes).toFixed(2));
    updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time [${i + 1}/${numOfRuns}]: ${inferenceTime} ms`);
    addResult(_model, _modelType, _dataType, _backend, 3, firstWarmupTime, inferenceTimes, inferenceTimesMedian, null);
  }

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Times: [${inferenceTimes}] ms`);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (Median): ${inferenceTimesMedian} ms`);

  await sess.release();
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Test ${_model} (${_modelType}/${_dataType}) with ${_backend} backend completed`);
}

export const runOnnx = async (_id, _model, _modelType, _dataType, _backend) => {
  // await main(_id, _model, _modelType, _dataType, _backend);

  const [err, data] = await to(main(_id, _model, _modelType, _dataType, _backend));
  if (err) {
    addResult(_model, _modelType, _dataType, _backend, 4, 0, [], 0, err.message);
    updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Error: ${_model} (${_modelType}/${_dataType}) with ${_backend} backend`);
    updateInfo(err.message);
  } else {
    // use data 
  }
}