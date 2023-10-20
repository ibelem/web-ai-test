// import * as ort from 'onnxruntime-web';
import { models } from '../../config';
import { updateTestQueueStatus, addResult, updateInfo, sleep, median, loadScript, removeElement, getUrlById, getBackupUrlById, getLocalUrlById, setModelDownloadUrl } from '../js/utils';
import { testQueueStore, testQueueLengthStore, resultsStore, numberOfRunsStore, modelDownloadUrlStore } from '../../store/store';
import { getModelOPFS } from '../js/nn_utils'

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

// const models = {
//   'albert-base-v2': 'bert64', // tjs/albert-base-v2/onnx/model.onnx. TODO: NaN
//   'bart-large-cnn-encoder': 'bert64', // tjs/facebook/bart-large-cnn/onnx/encoder_model.onnx
//   'bert-base-cased': 'bert64', // tjs/bert-base-cased/onnx/model.onnx
//   'bert-base-uncased': 'bert64', // tjs/bert-base-uncased/onnx/model.onnx
//   'candy-8': 'img224', // webnn. If the value is set to 0.5, conformance test would fail.
//   'clip-vit-base-patch16': 'clip', // tjs/openai/clip-vit-base-patch16/onnx/model.onnx
//   'densenet-9': 'img224', // webnn
//   'detr-resnet-50': 'img224', // tjs/facebook/detr-resnet-50/onnx/model.onnx. TODO: conformance fails
//   'dino-vitb16': 'img224', // tjs/facebook/dino-vitb16/onnx/model.onnx
//   'distilbert-base-uncased': 'bert64', // tjs/distilbert-base-uncased/onnx/model.onnx
//   'distilgpt2': 'llm-decoder', // tjs/gpt2/onnx/decoder_model_merged.onnx. TODO: NaN
//   'efficientnet-lite4-11': { 'images:0': ['float32', 'random', [1, 224, 224, 3]] }, // webnn
//   'emotion-ferplus-8': { 'Input3': ['float32', 'random', [1, 1, 64, 64]] }, // webnn
//   'gpt2': 'llm-decoder', // tjs/gpt2/onnx/decoder_model_merged.onnx. TODO: NaN
//   'mobilenetv2-12': 'img224', // from teams
//   'resnet50-v2-7': 'img224', // webnn
//   't5-small-decoder': 't5-decoder', // tjs/t5-small/onnx/decoder_model_merged.onnx
//   't5-small-encoder': 't5-encoder', // tjs/t5-small/onnx/encoder_model.onnx
//   'tinyyolov2-8': { 'image': ['float32', 'random', [1, 3, 416, 416]] }, // webnn
//   'whisper-tiny-decoder': 'whisper-decoder', // tjs/openai/whisper-tiny/onnx/decoder_model_merged.onnx
//   'whisper-tiny-encoder': { 'input_features': ['float32', 'random', [1, 80, 3000]] }, // tjs/openai/whisper-tiny/onnx/encoder_model.onnx


//   // TODO
//   'm2m100-decoder': 'm2m100-decoder', // https://huggingface.co/Xenova/m2m100/resolve/main/onnx/decoder_model_merged.onnx. TODO: RuntimeError: Aborted()
//   'm2m100-encoder': 'm2m100-encoder',// https://huggingface.co/Xenova/m2m100_418M/resolve/main/onnx/encoder_model.onnx. TODO: RangeError: offset is out of bounds

//   'sam-b-decoder': 'sam-decoder', // sam/sam_vit_b-decoder.onnx. TODO: Need model
//   'sam-h-decoder-static': 'sam-decoder', // sam/segment-anything-vit-h-static-shapes-static.onnx. TODO: Need model
//   'sam-b-encoder': 'sam-encoder', // sam/sam_vit_b-encoder.onnx. TODO: Need model

//   'sd-text-encoder': '',
//   'sd-unet': '',
//   'sd-vae-decoder': '',
//   'sd-vae-encoder': '',

//   // Obsolete
//   'mobilenetv2-7': 'img224',
//   'mobilenetv2-10': 'img224',
//   'resnet50-v1-12': 'img224',

// }

const getInputsById = (id) => {
  for (const model of models) {
    if (model.id === id) {
      return model.inputs.value;
    }
  }
  return null;
}

const getFeeds = (session, modelName, _backend) => {
  let feeds = {};
  let inputs = getInputsById(modelName);
  let inputNames = session.inputNames;
  console.log('--- session.inputNames ---');
  console.log(inputNames)
  // let decSeqLen = 128;
  // let encSeqLen = 128;

  // if (['bart-large', 'bart-large-12'].indexOf(inputs) >= 0) {
  //   const kvdim = (modelName === 'bart-large') ? 16 : 12;
  //   const hiddendim = (modelName === 'bart-large') ? 1024 : 768;
  //   for (var k in inputNames) {
  //     const v = inputNames[k];
  //     if (v.startsWith('past_key_values')) {
  //       feeds[v] = getTensor('float32', 1., [1, kvdim, decSeqLen, 64]);
  //     }
  //     if (v.startsWith('encoder_attention_mask')) {
  //       feeds['encoder_attention_mask'] = getTensor('int64', 1n, [1, encSeqLen]);
  //     }
  //   }
  //   feeds['use_cache_branch'] = getTensor('bool', false);
  //   feeds['input_ids'] = getTensor('int64', 99n, [1, decSeqLen]);
  //   feeds['encoder_hidden_states'] = getTensor('float32', 1, [1, encSeqLen, hiddendim]);
  // }

  // if (['bert', 'bert64'].indexOf(inputs) >= 0) {
  //   if ([].indexOf(modelName) >= 0) {
  //     decSeqLen = 1;
  //   }
  //   const dtype = inputs == 'bert' ? 'int32' : 'int64';
  //   const value = inputs == 'bert' ? 99 : 99n;
  //   const one = inputs == 'bert' ? 1 : 1n;

  //   for (var k in inputNames) {
  //     const v = inputNames[k];
  //     if (v === 'input_ids') {
  //       feeds[v] = getTensor(dtype, value, [1, decSeqLen]);
  //     }
  //     if (v === 'input_mask' || v === 'attention_mask') {
  //       feeds[v] = getTensor(dtype, one, [1, decSeqLen]);
  //     }
  //     if (v === 'token_type_ids' || v == 'segment_ids') {
  //       feeds[v] = getTensor(dtype, one, [1, decSeqLen]);
  //     }
  //   }
  // }

  // if (inputs === 'clip') {
  //   feeds['input_ids'] = getTensor('int64', 49407n, [1, 77]);
  //   feeds['pixel_values'] = getTensor('float32', 99, [1, 3, 224, 224]);
  //   feeds['attention_mask'] = getTensor('int64', 1n, [1, 77]);
  // }

  if (inputs === 'img224') {
    feeds[inputNames[0]] = getTensor('float32', 'random', [1, 3, 224, 224]);
  }

  // if (inputs == 'llm-decoder') {
  //   if (modelName === 'gpt2') {
  //     decSeqLen = 8;
  //   } else if (modelName === 'distilgpt2') {
  //     decSeqLen = 16;
  //   }
  //   for (var k in inputNames) {
  //     const v = inputNames[k];
  //     if (v.startsWith('past_key_values')) {
  //       feeds[v] = getTensor('float32', 1., [1, 12, decSeqLen, 64]);
  //     }
  //   }
  //   feeds['use_cache_branch'] = getTensor('bool', false);
  //   feeds['input_ids'] = getTensor('int64', 99n, [1, decSeqLen]);
  //   feeds['attention_mask'] = getTensor('int64', 1n, [1, decSeqLen]);
  // }

  // if (inputs == 'm2m100-decoder') {
  //   feeds['encoder_attention_mask'] = getTensor('int64', 1n, [1, encSeqLen]);
  //   feeds['input_ids'] = getTensor('int64', 99n, [1, decSeqLen]);
  //   feeds['encoder_hidden_states'] = getTensor('float32', 1, [1, encSeqLen, 1024]);
  //   const encoder_shape = [1, 16, encSeqLen, 64];
  //   const decoder_shape = [1, 16, decSeqLen, 64];
  //   for (var k in inputNames) {
  //     const v = inputNames[k];
  //     if (v.startsWith('past_key_values.')) {
  //       if (v.includes('decoder')) {
  //         feeds[v] = getTensor('float32', 1, decoder_shape);
  //       } else if (v.includes('encoder')) {
  //         feeds[v] = getTensor('float32', 1, encoder_shape);
  //       }
  //     }
  //   }
  //   feeds['use_cache_branch'] = getTensor('bool', true);
  // }

  // if (inputs == 'm2m100-encoder') {
  //   feeds['input_ids'] = getTensor('int64', 99n, [1, encSeqLen]);
  //   feeds['attention_mask'] = getTensor('int64', 1n, [1, encSeqLen]);
  // }

  // if (inputs == 'sam-decoder') {
  //   feeds['image_embeddings'] = getTensor('float32', 0.5, [1, 256, 64, 64]);
  //   feeds['point_coords'] = new ort.Tensor(new Float32Array([327.1111, 426.875, 241.77777, 341.5, 398.22223, 498.02084]), [1, 3, 2]);
  //   feeds['point_labels'] = new ort.Tensor(new Float32Array([0., 2., 3.]), [1, 3]);
  //   feeds['mask_input'] = getTensor('float32', 0., [1, 1, 256, 256]);
  //   feeds['has_mask_input'] = getTensor('float32', 1., [1]);
  //   if (inputNames.includes('orig_im_size')) {
  //     feeds['orig_im_size'] = new ort.Tensor(new Float32Array([512., 512.]), [2]);
  //   }
  // }

  // if (inputs == 'sam-encoder') {
  //   feeds['input_image'] = fillTensor('float32', 1., [224, 224, 3]);
  // }

  // if (['t5-decoder', 'flan-t5-decoder'].indexOf(inputs) >= 0) {
  //   decSeqLen = 1;
  //   feeds['input_ids'] = getTensor('int64', 99n, [1, decSeqLen]);
  //   feeds['encoder_hidden_states'] = getTensor('float32', 1, [1, decSeqLen, 512]);
  //   const encoder_shape = (inputs == 't5-decoder') ? [1, 8, encSeqLen, 64] : [1, 6, encSeqLen, 64];
  //   const decoder_shape = (inputs == 't5-decoder') ? [1, 8, decSeqLen, 64] : [1, 6, decSeqLen, 64];
  //   for (var k in inputNames) {
  //     const v = inputNames[k];
  //     if (v.startsWith('past_key_values.')) {
  //       if (v.includes('decoder')) {
  //         feeds[v] = getTensor('float32', 1, decoder_shape);
  //       } else if (v.includes('encoder')) {
  //         feeds[v] = getTensor('float32', 1, encoder_shape);
  //       }
  //     }
  //     if (v == 'encoder_attention_mask') {
  //       feeds['encoder_attention_mask'] = getTensor('int64', 1n, [1, encSeqLen]);
  //     }
  //   }
  //   feeds['use_cache_branch'] = getTensor('bool', true);
  // }

  // if (inputs === 't5-encoder') {
  //   feeds['input_ids'] = getTensor('int64', 99n, [1, decSeqLen]);
  // }

  // if (inputs === 'whisper-decoder') {
  //   feeds['input_ids'] = getTensor('int64', 1n, [1, 1]);
  //   feeds['encoder_hidden_states'] = getTensor('float32', 'random', [1, 1500, 384]);
  //   for (var k in inputNames) {
  //     const v = inputNames[k];
  //     if (v.startsWith('past_key_values.')) {
  //       if (v.includes('decoder')) {
  //         feeds[v] = getTensor('float32', 1, [1, 6, decSeqLen, 64]);
  //       } else if (v.includes('encoder')) {
  //         feeds[v] = getTensor('float32', 1, [1, 6, 1500, 64]);
  //       }
  //     }
  //   }
  //   feeds['use_cache_branch'] = getTensor('bool', false);
  // }

  if (isDict(inputs)) {
    for (let key in inputs) {
      let value = inputs[key];
      feeds[key] = getTensor(value[0], value[1], value[2]);
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
    _data = data === 'random' ? Math.random() : data;
  } else {
    let size = 1;
    dims.forEach((dim) => {
      size *= dim;
    });
    _data = typedArray.from({ length: size }, () => data === 'random' ? Math.random() : data);
  }
  return new ort.Tensor(type, _data, dims);
}

const isDict = (v) => {
  return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
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

const getFreeDimensionOverridesById = (id) => {
  for (let i = 0; i < models.length; i++) {
    if (models[i].id === id) {
      return models[i].inputs.batch;
    }
  }
  return null;
}

const getModelUrl = (_model) => {
  let modelPath = getUrlById(_model);
  if (modelDownloadUrl === 1) {
    modelPath = getUrlById(_model);
  } else if (modelDownloadUrl === 2) {
    modelPath = getBackupUrlById(_model);
  } else if (modelDownloadUrl === 0) {
    modelPath = getLocalUrlById(_model);
  }

  return modelPath;
}

// const getInputShapeById = (id) => {
//   for (let i = 0; i < models.length; i++) {
//     if (models[i].id === id) {
//       return models[i].inputshape;
//     }
//   }
//   return null;
// }

// const getFeeds = (_model, _dataType) => {
//   let feed = {};
//   let datatype = 'float32';
//   switch (_dataType) {
//     case 'fp32':
//       datatype = 'float32';
//       break;
//     case 'fp16':
//       datatype = 'float16';
//       break;
//     case 'int64':
//       datatype = 'int64';
//       break;
//     case 'uint64':
//       datatype = 'uint64';
//       break;
//     case 'int32':
//       datatype = 'int32';
//       break;
//     case 'uint32':
//       datatype = 'uint32';
//       break;
//     case 'int8':
//       datatype = 'int8';
//       break;
//     case 'uint8':
//       datatype = 'uint8';
//       break;
//     default:
//       datatype = 'float32';
//       break;
//   }

//   switch (_model) {
//     case 'mobilenet_v2':
//       feed["input"] = generateTensor(datatype, getInputShapeById(_model), 0.5);
//       break;
//     default:
//       break;
//   }

//   if (feed) {
//     // Without clone(), you'll get DOMException: Failed to execute 'postMessage' on 'Worker': ArrayBuffer at index 0 is already detached.
//     return feed;
//   }

// }

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
    await loadScript('webgpu', `../ort/1.16/web/ort.webgpu.js`);
  } else {
    removeElement('webgpu');
    await loadScript('default', `../ort/1.16/web/ort.js`);
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

  if (backend === 'wasm') {
    ort.env.wasm.numThreads = numThreads;
    ort.env.wasm.simd = wasmSimd;
  } else {
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.simd = wasmSimd;
  }

  if (backend === 'webnn') {
    ort.env.wasm.proxy = true;
  } else {
    ort.env.wasm.proxy = false;
  }

  let freeDimensionOverrides = getFreeDimensionOverridesById(_model);
  console.log('options.freeDimensionOverrides:');
  console.log(freeDimensionOverrides)
  if (freeDimensionOverrides) {
    options.freeDimensionOverrides = freeDimensionOverrides;
  }

  l(`ort.env.wasm.numThreads ${ort.env.wasm.numThreads} thread(s)`)
  l(`ort.env.wasm.simd ${ort.env.wasm.simd}`)
  l(`EP options numThreads ${numThreads} thread(s)`)

  if (backend === 'webgpu') {
    options = { executionProviders: ["webgpu"] };
  }

  l(`EP options:`)
  l(options.executionProviders[0])

  updateTestQueueStatus(_id, 2);
  addResult(_model, _modelType, _dataType, _backend, 1, [], null);
  addResult(_model, _modelType, _dataType, _backend, 2, 0, [], 0, null);
  updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Testing ${_model} (${_modelType}/${_dataType}) with ${_backend} backend`);

  let modelPath = getModelUrl(_model);

  updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Downloading model from ${modelPath}`);
  const modelBuffer = await getModelOPFS(_model, modelPath, false);
  updateInfo(`${testQueueLength - testQueue.length + 1} /${testQueueLength} Creating onnx runtime web inference session`);
  const sess = await ort.InferenceSession.create(modelBuffer, options);
  let feeds = getFeeds(sess, _model, _backend);
  updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Warming up`);

  let warmupTime = 0;
  const warmupstart = performance.now();

  if (backend === 'webnn') {
    await sess.run(clone(feeds));
  } else {
    await sess.run(feeds);
  }

  warmupTime = performance.now() - warmupstart;

  updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Warm Up Time: ${warmupTime} ms`);

  let inferenceTimes = [];
  let inferenceTimesMedian = null;
  for (var i = 0; i < numOfRuns; i++) {
    const start = performance.now();
    l(feeds);
    if (backend === 'webnn') {
      await sess.run(clone(feeds));
    } else {
      await sess.run(feeds);
    }

    let inferenceTime = performance.now() - start;
    inferenceTimes.push(inferenceTime);
    inferenceTimesMedian = parseFloat(median(inferenceTimes).toFixed(2));
    updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} - ${i + 1}/${numOfRuns} Inference Time: ${inferenceTime} ms`);
    addResult(_model, _modelType, _dataType, _backend, 3, warmupTime, inferenceTimes, inferenceTimesMedian, null);
  }

  updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Inference Times: [${inferenceTimes}] ms`);
  updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Inference Time (Median): ${inferenceTimesMedian} ms`);

  await sess.release();
  updateInfo(`${testQueueLength - testQueue.length + 1}/${testQueueLength} Test ${_model} (${_modelType}/${_dataType}) with ${_backend} backend completed`);
}

export const runOnnx = async (_id, _model, _modelType, _dataType, _backend) => {
  await main(_id, _model, _modelType, _dataType, _backend);

  // const [err, data] = await to(main(_id, _model, _modelType, _dataType, _backend));
  // if (err) {
  //   addResult(_model, _modelType, _dataType, _backend, 4, 0, [], 0, err.message);
  //   updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Error: ${_model} (${_modelType}/${_dataType}) with ${_backend} backend`);
  //   updateInfo(err.message);
  // } else {
  //   // use data 
  // }
}