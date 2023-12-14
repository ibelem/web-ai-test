// import * as ort from 'onnxruntime-web';
import { models, ortDists } from '../../config';
import { compareObjects, addConformance, updateConformance, updateConformanceLog, loadScript, removeElement, getHfUrlById, getAwsUrlById, getLocalUrlById, getHfMirrorUrlById, clearConformance } from './utils';
import { sleepStore, modelDownloadUrlStore, conformanceQueueStore, conformanceStore } from '../../store/store';
import { getGpu } from '$lib/assets/js/utils';
import { getModelOPFS } from './nn_utils'
import to from 'await-to-js';
import { sleep } from '$lib/assets/js/utils';
// import localforage from 'localforage';


/**
 * @type {string[]}
 */
export let conformance;
conformanceStore.subscribe((value) => {
  conformance = value;
});

/**
 * @type {string[]}
 */
let conformanceQueue;
conformanceQueueStore.subscribe((value) => {
  conformanceQueue = value;
});

/**
 * @type {number}
 */
export let modelDownloadUrl;

modelDownloadUrlStore.subscribe((value) => {
  modelDownloadUrl = value;
});

/**
 * @type {boolean}
 */
export let sleeping;
sleepStore.subscribe((value) => {
  sleeping = value;
});

export const updateSleep = (value) => {
  sleepStore.update(() => value);
}

const getInputsById = (id) => {
  for (const model of models) {
    if (model.id === id) {
      return model.inputs;
    }
  }
  return null;
}

const getFeeds = (session, modelName) => {
  let feeds = {};
  let inputs = getInputsById(modelName);
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
  } else if (type === 'int8') {
    typedArray = Int8Array;
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
  if (Array.isArray(data) || ArrayBuffer.isView(data)) {
    _data = data;
  } else {
    let size = 1;
    dims.forEach((dim) => {
      size *= dim;
    });
    if (data === 'random') {
      // _data = typedArray.from({ length: size }, () => Math.random());
      _data = typedArray.from({ length: size }, () => 0.5446213812076073);
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
      let fdo = {};
      for (let input of models[i].inputs) {
        for (let key in input) {
          let value = input[key];
          let ob = value[3];
          if (Object.keys(ob).length !== 0) {
            Object.keys(ob).forEach(key => {
              if (ob[key].toString().trim()) {
                fdo[key] = ob[key];
              }
            });
          }
        }
      }
      return fdo;
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

export let rawResult = '';

const mainConformance = async (_model, _modelType, _dataType, _backend) => {

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

  (backend === 'webnn' || _backend === 'wasm_4') ? ort.env.wasm.proxy = true : ort.env.wasm.proxy = false;

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

  l(`options.freeDimensionOverrides:`);
  l(freeDimensionOverrides);

  updateConformanceLog(`[1] Testing ${_model} (${_modelType}/${_dataType}) conformance with ${_backend} backend on ${getGpu()}`);

  let modelPath = getModelUrl(_model);

  updateConformanceLog(`[2] Downloading model from ${modelPath}`);

  let modelBuffer = await getModelOPFS(_model, modelPath, false);
  if (modelBuffer.byteLength < 1024) {
    modelBuffer = await getModelOPFS(_model, modelPath, true);
  }

  updateConformanceLog(`[3] Creating onnx runtime web inference session`);
  const sess = await ort.InferenceSession.create(modelBuffer, options);
  updateConformanceLog(`[4] ${_model} compiled`);
  let feeds = getFeeds(sess, _model);

  updateConformanceLog(`[5] Inferencing ... `);

  let results;
  if (backend === 'webnn' || _backend === 'wasm_4') {
    const input = clone(feeds);
    results = await sess.run(input);
  } else {
    results = await sess.run(feeds);
  }

  let result = results[sess.outputNames[0]]["data"];
  let obj = {
    "name": _model,
    "backend": _backend,
    "gpu": getGpu()
  };

  console.log(`---- ${_backend} ----`);
  console.log(result);

  rawResult = result;

  // result = result.subarray(0, 100);

  if (result instanceof BigInt64Array) {
    console.log(`The variable array is a BigInt64Array`)
  }

  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  // updateConformanceLog(JSON.stringify(result));
  updateConformanceLog(`[6] You can copy raw inference results in Console of Developer Tool`);
  if (_backend === "wasm_4") {
    // // await localforage.setItem(_model + "__wasm_4", result);
    obj.result = result;
  }

  await sess.release();

  if (_backend === "wasm_4") {
    obj.e3 = '1e-3';
    obj.e4 = '1e-4';
    obj.e5 = '1e-5';
    obj.e6 = '1e-6';
    obj.e7 = '1e-7';
    obj.e8 = '1e-8';
    updateConformanceLog(`[7] Using ${_backend} results as the baseline`);
  } else {
    if (result instanceof BigInt64Array) {
      for (let c of conformance) {
        if (c.name === _model && c.backend === "wasm_4") {
          let r = '';
          await compareObjects(JSON.stringify(result), c.result, 1e-3) ? r = 'pass' : r = 'fail';
          obj.e3 = r;
          updateConformanceLog(`[7.1] Conformance [1e-3] on ${_backend}: ${r}`);

          await compareObjects(JSON.stringify(result), c.result, 1e-4) ? r = 'pass' : r = 'fail';
          obj.e4 = r;
          updateConformanceLog(`[7.2] Conformance [1e-4] on ${_backend}: ${r}`);

          await compareObjects(JSON.stringify(result), c.result, 1e-5) ? r = 'pass' : r = 'fail';
          obj.e5 = r;
          updateConformanceLog(`[7.3] Conformance [1e-5] on ${_backend}: ${r}`);

          await compareObjects(JSON.stringify(result), c.result, 1e-6) ? r = 'pass' : r = 'fail';
          obj.e6 = r;
          updateConformanceLog(`[7.4] Conformance [1e-6] on ${_backend}: ${r}`);

          await compareObjects(JSON.stringify(result), c.result, 1e-7) ? r = 'pass' : r = 'fail';
          obj.e7 = r;
          updateConformanceLog(`[7.5] Conformance [1e-7] on ${_backend}: ${r}`);

          await compareObjects(JSON.stringify(result), c.result, 1e-8) ? r = 'pass' : r = 'fail';
          obj.e8 = r;
          updateConformanceLog(`[7.6] Conformance [1e-8] on ${_backend}: ${r}`);
        }
      }
    } else {
      for (let c of conformance) {
        if (c.name === _model && c.backend === "wasm_4") {
          let r = '';
          await compareObjects(result, c.result, 1e-3) ? r = 'pass' : r = 'fail';
          obj.e3 = r;
          updateConformanceLog(`[7.1] Conformance [1e-3] on ${_backend}: ${r}`);

          await compareObjects(result, c.result, 1e-4) ? r = 'pass' : r = 'fail';
          obj.e4 = r;
          updateConformanceLog(`[7.2] Conformance [1e-4] on ${_backend}: ${r}`);

          await compareObjects(result, c.result, 1e-5) ? r = 'pass' : r = 'fail';
          obj.e5 = r;
          updateConformanceLog(`[7.3] Conformance [1e-5] on ${_backend}: ${r}`);

          await compareObjects(result, c.result, 1e-6) ? r = 'pass' : r = 'fail';
          obj.e6 = r;
          updateConformanceLog(`[7.4] Conformance [1e-6] on ${_backend}: ${r}`);

          await compareObjects(result, c.result, 1e-7) ? r = 'pass' : r = 'fail';
          obj.e7 = r;
          updateConformanceLog(`[7.5] Conformance [1e-7] on ${_backend}: ${r}`);

          await compareObjects(result, c.result, 1e-8) ? r = 'pass' : r = 'fail';
          obj.e8 = r;
          updateConformanceLog(`[7.6] Conformance [1e-8] on ${_backend}: ${r}`);
        }
      }
    }
  }

  addConformance(obj);

  if (_backend === "webnn_gpu") {
    // clearConformance();
    let obj = conformance.map(obj => {
      const { result, ...rest } = obj;
      return rest;
    });
    updateConformance(obj);
  }

  if (sleeping) {
    await sleep(10000);
  }

  updateConformanceLog(`[8] Conformance test of ${_model} (${_modelType} /${_dataType}) with ${_backend} backend on ${getGpu()} completed`);
  updateConformanceLog('|-------------------------------------------------------------------------------------|');
  next(_model, _backend);
}

const next = (_model, _backend) => {
  let filteredConformanceQueue = conformanceQueue.filter(
    (item) => item !== `${_model}__${_backend}`
  );
  conformanceQueueStore.update(() => filteredConformanceQueue);
  if (conformanceQueue.length > 0) {
    location.href = location.origin + `/conformance?${conformanceQueue[0]}`;
  }
}

export const runOnnxConformance = async (_model, _modelType, _dataType, _backend) => {
  // mainConformance(_model, _modelType, _dataType, _backend);
  const [err, data] = await to(mainConformance(_model, _modelType, _dataType, _backend));
  if (err) {
    updateConformanceLog(`[Error] ${_model} (${_modelType}/${_dataType}) with ${_backend} backend`);
    updateConformanceLog(`[Error] ${err.message}`);
    let obj = {
      "name": _model,
      "backend": _backend,
      "gpu": getGpu(),
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a"
    };
    obj.error = err.message;
    addConformance(obj);

    if (_backend === "webnn_gpu") {
      // clearConformance();
      let obj = conformance.map(obj => {
        const { result, ...rest } = obj;
        return rest;
      });
      updateConformance(obj);
    }

    next(_model, _backend);
  } else {
    // use data 
  }
}