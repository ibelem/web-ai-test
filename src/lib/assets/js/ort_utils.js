// import * as ort from 'onnxruntime-web';
import { models, localhost } from '../../config';
import { updateTestQueueStatus, addResult, updateInfo, sleep, catchEm, median } from '../js/utils';
import { testQueueStore, testQueueLengthStore, resultsStore, numberOfRunsStore } from '../../store/store'

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

export const generateTensor = (dataType, shape, val) => {
  let size = 1;
  shape.forEach((element) => {
    size *= element;
  });
  switch (dataType) {
    case "uint16":
      return new ort.Tensor(
        dataType,
        Uint16Array.from({ length: size }, () => val),
        shape
      );
    case "float16":
      return new ort.Tensor(
        dataType,
        Uint16Array.from({ length: size }, () => val),
        shape
      );
    case "float32":
      return new ort.Tensor(
        dataType,
        Float32Array.from({ length: size }, () => val),
        shape
      );
    case "int32":
      return new ort.Tensor(
        dataType,
        Int32Array.from({ length: size }, () => val),
        shape
      );
    case "int64":
      return new ort.Tensor(
        dataType,
        BigInt64Array.from({ length: size }, () => val),
        shape
      );
  }
  throw new Error(`Input tensor type ${dataType} is unknown`);
}

export const type_to_func = {
  float32: Float32Array,
  uint16: Uint16Array,
  float16: Uint16Array,
  int32: Int32Array,
  BigInt64Array: BigInt64Array,
};

export const clone = (x) => {
  let feed = {};
  for (const [key, value] of Object.entries(x)) {
    let func = type_to_func[value.type];
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

const getUrlById = (id) => {
  for (let i = 0; i < models.length; i++) {
    if (models[i].id === id) {
      return models[i].url;
    }
  }
  return null;
}

const getInputShapeById = (id) => {
  for (let i = 0; i < models.length; i++) {
    if (models[i].id === id) {
      return models[i].inputshape;
    }
  }
  return null;
}

const getFeeds = (_model, _dataType) => {
  let feed = {};
  let datatype = 'float32';
  switch (_dataType) {
    case 'fp32':
      datatype = 'float32';
      break;
    case 'fp16':
      datatype = 'float16';
      break;
    case 'int64':
      datatype = 'int64';
      break;
    case 'uint64':
      datatype = 'uint64';
      break;
    case 'int32':
      datatype = 'int32';
      break;
    case 'uint32':
      datatype = 'uint32';
      break;
    case 'int8':
      datatype = 'int8';
      break;
    case 'uint8':
      datatype = 'uint8';
      break;
    default:
      datatype = 'float32';
      break;
  }

  switch (_model) {
    case 'mobilenet_v2':
      feed["input"] = generateTensor(datatype, getInputShapeById(_model), 0.5);
      break;
    default:
      break;
  }

  if (feed) {
    // Without clone(), you'll get DOMException: Failed to execute 'postMessage' on 'Worker': ArrayBuffer at index 0 is already detached.
    return feed;
  }

}

const main = async (_id, _model, _modelType, _dataType, _backend) => {

  let backend = 'wasm';
  let wasmSimd = true;
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
      wasmSimd = false;
      numThreads = 1;
      deviceType = 'gpu';
      break;
    case 'webgpu':
      backend = 'webgpu';
      wasmSimd = false;
      numThreads = 1;
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
      numThreads = 1;
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

  if (_modelType === 'onnx') {
    // let wasmPaths = `https://${localhost}/node_modules/onnxruntime-web/dist/`

    // if (location.hostname.indexOf('github') > -1) {
    //   wasmPaths = 'https://ibelem.github.io/onnxruntime-web-dist/1.16/web/dist/'
    // }

    // console.log(location.hostname);
    // console.log(wasmPaths);

    // https://github.com/microsoft/onnxruntime/blob/main/js/common/lib/env.ts
    ort.env.wasm.numThreads = numThreads;
    ort.env.wasm.simd = wasmSimd;
    // ort.env.wasm.wasmPaths = '../node_modules/onnxruntime-web/dist/'
    // ort.env.wasm.wasmPaths = wasmPaths;
    ort.env.wasm.proxy = true;
    // ort.env.logLevel = "verbose"; // "error";
    // ort.env.debug = false;

    updateTestQueueStatus(_id, 2);
    addResult(_model, _modelType, _dataType, _backend, 1, []);

    let modelPath = getUrlById(_model);

    const options = {
      executionProviders: [
        {
          name: backend,
          deviceType: deviceType,
          powerPreference: "default",
        },
      ],
      //executionProviders: [{name: "webnn", deviceType: 'gpu', powerPreference: 'high-performance' }],
    };

    l(options.executionProviders)

    addResult(_model, _modelType, _dataType, _backend, 2, 0, [], 0);
    updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Testing ${_model} (${_modelType}/${_dataType}) with ${backend} backend`);
    updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Creating onnx runtime web inference session ...`);

    const sess = await ort.InferenceSession.create(modelPath, options);
    updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Warming up ...`);
    let feeds = clone(getFeeds(_model, _dataType));

    let warmupTime = 0;
    const warmupstart = performance.now();
    await sess.run(feeds);
    warmupTime = performance.now() - warmupstart;

    updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Warm Up Time: ${warmupTime} ms`);

    let inferenceTimes = [];
    let inferenceTimesMedian = null;
    for (var i = 0; i < numOfRuns; i++) {
      const start = performance.now();
      feeds = clone(getFeeds(_model, _dataType));
      const outputs = await sess.run(feeds);
      let inferenceTime = performance.now() - start;
      inferenceTimes.push(inferenceTime);
      inferenceTimesMedian = parseFloat(median(inferenceTimes).toFixed(2));
      updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} - ${i + 1}/${numOfRuns} Inference Time: ${inferenceTime} ms`);
      addResult(_model, _modelType, _dataType, _backend, 3, warmupTime, inferenceTimes, inferenceTimesMedian);
    }

    updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Inference Times: [${inferenceTimes}] ms`);
    updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Inference Time (Median): ${inferenceTimesMedian} ms`);

    await sess.release();
    updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Test ${_model} (${_modelType}/${_dataType}) with ${backend} backend completed`);
  }
}

export const catchMain = async (_id, _model, _modelType, _dataType, _backend) => {
  // const [err, data] = await catchEm(main(_id, _model, _modelType, _dataType, _backend));
  // if (err) {
  //   addResult(_model, _modelType, _dataType, _backend, 4, []);
  //   updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Error: ${_model} (${_modelType}/${_dataType}) with ${_backend} backend ...`);
  // } else {
  //   // use data
  // }

  await main(_id, _model, _modelType, _dataType, _backend);
}