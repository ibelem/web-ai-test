// import * as ort from 'onnxruntime-web';
import { models, ortDists } from '$lib/config';
import { updateTestQueueStatus, addResult, updateInfo, median, loadScript, removeElement, getModelHFFileById, getModelExternalDataNameById, getHfUrlById, getAwsUrlById, getLocalUrlById, average, minimum } from '../js/utils';
import { ortWebVersionStore, testQueueStore, testQueueLengthStore, resultsStore, numberOfRunsStore, modelDownloadUrlStore } from '../../store/store';
import { sleep, getQueryValue } from '$lib/assets/js/utils';
import { getModelOPFS, getModelCache } from '$lib/assets/js/nn_utils'
import { dataTypeToArrayConstructor, isDict } from '$lib/assets/js/data_type';
import to from 'await-to-js';
import percentile from 'percentile';

/**
 * @type {{ selected?: any; stable?: any; dev?: any; }}
 */
export let ortWebVersion;

ortWebVersionStore.subscribe((value) => {
  ortWebVersion = value;
});

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
                fdo[key?.toString().trim()] = ob[key];
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
  } else if (modelDownloadUrl === 3) {
    modelPath = getAwsUrlById(_model);
  } else if (modelDownloadUrl === 0) {
    modelPath = getLocalUrlById(_model);
  }
  return modelPath;
}

const main = async (_id, _model, _modelType, _dataType, _modelSize, _backend) => {

  let backend = 'wasm';
  let numThreads = 1;
  let deviceType = 'cpu';
  let enableIoBinding = false;
  let webgpuDevice;
  let webgpuInputBuffer = {};
  let feedsInfo = [];

  if (getQueryValue('io') == 'true') {
    enableIoBinding = true;
  } else {
    enableIoBinding = false;
  }

  switch (_backend) {
    case 'wasm_1':
      backend = 'wasm';
      numThreads = 1;
      deviceType = 'cpu';
      break;
    case 'wasm_4':
      backend = 'wasm';
      numThreads = 4;
      deviceType = 'cpu';
      break;
    case 'webgl':
      backend = 'webgl';
      deviceType = 'gpu';
      break;
    case 'webgpu':
      backend = 'webgpu';
      numThreads = 4;
      deviceType = 'gpu';
      break;
    case 'webnn_cpu_1':
      backend = 'webnn';
      numThreads = 1;
      deviceType = 'cpu';
      break;
    case 'webnn_cpu_4':
      backend = 'webnn';
      numThreads = 4;
      deviceType = 'cpu';
      break;
    case 'webnn_gpu':
      backend = 'webnn';
      numThreads = 4;
      deviceType = 'gpu';
      break;
    case 'webnn_npu':
      backend = 'webnn';
      numThreads = 4;
      deviceType = 'npu';
      break;
    default:
      backend = 'wasm';
      numThreads = 1;
      deviceType = 'cpu';
      break;
  }

  const removeTag = () => {
    removeElement('default');
    removeElement('webgpu');
    removeElement('webnn');
  }

  if (ortWebVersion) {
    if (ortWebVersion.selected === 2) {
      if (backend === 'webgpu') {
        removeTag();
        await loadScript('webgpu', ortDists.webgpu.url);
      } else {
        removeTag();
        await loadScript('webnn', ortDists.webnn_webglfix_wasm.url);
      }
    } else if (ortWebVersion.selected === 1) {
      await loadScript('default', `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ortWebVersion.dev}/dist/ort.all.min.js`);
    } else {
      await loadScript('default', `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ortWebVersion.stable}/dist/ort.all.min.js`);
    }
  }
  else {
    if (backend === 'webgpu') {
      removeTag();
      await loadScript('webgpu', ortDists.webgpu.url);
    } else {
      removeTag();
      await loadScript('webnn', ortDists.webnn_webglfix_wasm.url);
    }
  }

  let modelPath = getModelUrl(_model);

  let options = {
    executionProviders: [
      {
        name: backend,
        deviceType: deviceType,
        preferredLayout: 'NHWC',
        numThreads: numThreads
      },
    ],
    //executionProviders: [{name: "webnn", deviceType: 'gpu', powerPreference: 'high-performance' }],
  };

  const externalDataName = getModelExternalDataNameById(_model);
  if (externalDataName) {
    const modelHFFile = getModelHFFileById(_model);
    let externalDataPath = modelPath.replace(modelHFFile, externalDataName);
    options.externalData = [
      {
        path: externalDataName,
        data: externalDataPath
      }
    ];
  }

  const mlContext = await navigator.ml?.createContext({ deviceType, numThreads });

  const getFeedInfo = (inputName, type, data, dims) => {
    if (!sess.inputNames.includes(inputName)) {
      return;
    }
    let typedArray;
    let typeBytes;
    if (type === 'bool') {
      return new ort.Tensor(type, [data], [1]);
    } else if (type === 'int4') {
      typedArray = Int8Array;
    } else if (type === 'int8') {
      typedArray = Int8Array;
    } else if (type === 'uint8') {
      typedArray = Uint8Array;
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
    if (typeBytes === undefined) {
      typeBytes = typedArray.BYTES_PER_ELEMENT;
    }

    let size, _data;
    if (Array.isArray(data) || ArrayBuffer.isView(data)) {
      size = data.length;
      _data = typedArray.from(data);
    } else {
      size = dims.reduce((a, b) => a * b);
      if (data === 'random') {
        _data = typedArray.from({ length: size }, () => Math.random());
      } else if (data === 'ramp') {
        _data = typedArray.from({ length: size }, (_, i) => i);
      } else {
        _data = typedArray.from({ length: size }, () => data);
      }
    }

    feedsInfo[inputName] = {
      type: type,
      data: _data,
      shape: dims,
      dims: dims,
      size: Math.ceil(size * typeBytes / 16) * 16
    };
    // return new ort.Tensor(type, _data, dims);
  }

  const getFeedsInfo = (session, modelName) => {
    let feeds = {};
    let inputs = getInputsById(modelName);
    let inputNames = session.inputNames;

    for (let input of inputs) {
      if (isDict(input)) {
        for (let key in input) {
          let value = input[key];
          feeds[key] = getFeedInfo(key, value[0], value[1], value[2]);
        }
      }
    }

    if (modelName.indexOf('_merged') > -1 || modelName.indexOf('_with_past') > -1) {
      for (var k in inputNames) {
        const v = inputNames[k];
        if (v.startsWith('past_key_values.')) {
          if (modelName.indexOf('phi_3_mini_4k_instruct_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 32, 255, 96]);
          } else if (modelName.indexOf('phi_3_5_mini_instruct_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float16', 1, [1, 32, 255, 96]);
          } else if (modelName.indexOf('gemma_2b_it_') > -1) {
            feeds[v] = getFeedInfo(v, 'float16', 1, [1, 1, 1, 256]);
          } else if (modelName.indexOf('tinyllama_1_1b_chat_v1_0_merged_fp32') > -1 || modelName.indexOf('tinyllama_1_1b_chat_v1_0_merged_int8') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 0, 64]);
          } else if (modelName.indexOf('tinyllama_1_1b_chat_v1_0_merged_fp16') > -1 || modelName.indexOf('tinyllama_1_1b_chat_v1_0_merged_int4') > -1) {
            feeds[v] = getFeedInfo(v, 'float16', 1, [1, 4, 0, 64]);
          } else if (modelName.indexOf('tinyllama_v0_decoder_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 16, 40, 4]);
          } else if (modelName.indexOf('tinyllama_v0_decoder_with_past_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 16, 1, 4]);
          } else if (modelName.indexOf('meta_llama_3_8b_instruct_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float16', 1, [1, 4, 0, 64]);
          } else if (modelName.indexOf('llama2_c_stories15m_decoder_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 6, 4, 48]);
          } else if (modelName.indexOf('llama2_c_stories15m_decoder_with_past_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 6, 5, 48]);
          } else if (modelName.indexOf('llava_decoder_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 576, 4]);
          } else if (modelName.indexOf('llava_decoder_with_past_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 575, 4]);
          } else if (modelName.indexOf('llava_phi_decoder_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 575, 4]);
          } else if (modelName.indexOf('moondream2_decoder_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 32, 255, 64]);
          } else if (modelName.indexOf('qwen2_0_5b_instruct_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 2, 1, 64]);
          } else if (modelName.indexOf('distilbart_cnn_6_6_decoder_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 16, 168, 64]);
          } else if (modelName.indexOf('distilgpt2_decoder_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 12, 16, 64]);
          } else if (modelName.indexOf('flan_t5_small_decoder_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 6, 128, 64]);
          } else if (modelName.indexOf('florence2_decoder_merged_') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 12, 16, 64]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 12, 512, 64]);
            }
          } else if (modelName.indexOf('florence2_decoder_with_past_') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 12, 16, 64]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 12, 512, 64]);
            }
          } else if (modelName.indexOf('florence2_conditional_decoder_merged_') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 2, 16, 16]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 2, 512, 16]);
            }
          } else if (modelName.indexOf('florence2_conditional_decoder_with_past_') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 2, 16, 16]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 2, 512, 16]);
            }
          } else if (modelName.indexOf('gpt2_decoder_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 12, 8, 64]);
          } else if (modelName.indexOf('mt5_small_decoder_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 6, 128, 64]);
          } else if (modelName.indexOf('t5_small_decoder_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 8, 128, 64]);
          } else if (modelName.indexOf('vit_gpt2_image_captioning_decoder_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 12, 168, 64]);
          } else if (modelName.indexOf('distil_medium_en_decoder_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 16, 1, 64]);
          } else if (modelName.indexOf('distil_medium_en_decoder_with_past_') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 16, 1, 64]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 16, 1500, 64]);
            }
          } else if (modelName.indexOf('whisper_base_decoder_static_') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float16', 1, [1, 8, 127, 64]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float16', 1, [1, 8, 1500, 64]);
            }
          } else if (modelName.indexOf('whisper_tiny_decoder_') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 6, 128, 64]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 6, 1500, 64]);
            }
          }
        } else if (modelName.indexOf('voiceitt_casr_encoder_epoch_40_merged_int8') > -1) {
          feeds['cached_len_0'] = getFeedInfo('cached_len_0', 'int64', 1n, [2, 1]);
          feeds['cached_len_1'] = getFeedInfo('cached_len_1', 'int64', 1n, [4, 1]);
          feeds['cached_len_2'] = getFeedInfo('cached_len_2', 'int64', 1n, [3, 1]);
          feeds['cached_len_3'] = getFeedInfo('cached_len_3', 'int64', 1n, [2, 1]);
          feeds['cached_len_4'] = getFeedInfo('cached_len_4', 'int64', 1n, [4, 1]);
          feeds['cached_avg_0'] = getFeedInfo('cached_avg_0', 'float32', 1, [2, 1, 384]);
          feeds['cached_avg_1'] = getFeedInfo('cached_avg_1', 'float32', 1, [4, 1, 384]);
          feeds['cached_avg_2'] = getFeedInfo('cached_avg_2', 'float32', 1, [3, 1, 384]);
          feeds['cached_avg_3'] = getFeedInfo('cached_avg_3', 'float32', 1, [2, 1, 384]);
          feeds['cached_avg_4'] = getFeedInfo('cached_avg_4', 'float32', 1, [4, 1, 384]);
          feeds['cached_key_0'] = getFeedInfo('cached_key_0', 'float32', 1, [2, 64, 1, 192]);
          feeds['cached_key_1'] = getFeedInfo('cached_key_1', 'float32', 1, [4, 32, 1, 192]);
          feeds['cached_key_2'] = getFeedInfo('cached_key_2', 'float32', 1, [3, 16, 1, 192]);
          feeds['cached_key_3'] = getFeedInfo('cached_key_3', 'float32', 1, [2, 8, 1, 192]);
          feeds['cached_key_4'] = getFeedInfo('cached_key_4', 'float32', 1, [4, 32, 1, 192]);
          feeds['cached_val_0'] = getFeedInfo('cached_val_0', 'float32', 1, [2, 64, 1, 96]);
          feeds['cached_val_1'] = getFeedInfo('cached_val_1', 'float32', 1, [4, 32, 1, 96]);
          feeds['cached_val_2'] = getFeedInfo('cached_val_2', 'float32', 1, [3, 16, 1, 96]);
          feeds['cached_val_3'] = getFeedInfo('cached_val_3', 'float32', 1, [2, 8, 1, 96]);
          feeds['cached_val_4'] = getFeedInfo('cached_val_4', 'float32', 1, [4, 32, 1, 96]);
          feeds['cached_val2_0'] = getFeedInfo('cached_val2_0', 'float32', 1, [2, 64, 1, 96]);
          feeds['cached_val2_1'] = getFeedInfo('cached_val2_1', 'float32', 1, [4, 32, 1, 96]);
          feeds['cached_val2_2'] = getFeedInfo('cached_val2_2', 'float32', 1, [3, 16, 1, 96]);
          feeds['cached_val2_3'] = getFeedInfo('cached_val2_3', 'float32', 1, [2, 8, 1, 96]);
          feeds['cached_val2_4'] = getFeedInfo('cached_val2_4', 'float32', 1, [4, 32, 1, 96]);
          feeds['cached_conv1_0'] = getFeedInfo('cached_conv1_0', 'float32', 1, [2, 1, 384, 30]);
          feeds['cached_conv1_1'] = getFeedInfo('cached_conv1_1', 'float32', 1, [4, 1, 384, 30]);
          feeds['cached_conv1_2'] = getFeedInfo('cached_conv1_2', 'float32', 1, [3, 1, 384, 30]);
          feeds['cached_conv1_3'] = getFeedInfo('cached_conv1_3', 'float32', 1, [2, 1, 384, 30]);
          feeds['cached_conv1_4'] = getFeedInfo('cached_conv1_4', 'float32', 1, [4, 1, 384, 30]);
          feeds['cached_conv2_0'] = getFeedInfo('cached_conv2_0', 'float32', 1, [2, 1, 384, 30]);
          feeds['cached_conv2_1'] = getFeedInfo('cached_conv2_1', 'float32', 1, [4, 1, 384, 30]);
          feeds['cached_conv2_2'] = getFeedInfo('cached_conv2_2', 'float32', 1, [3, 1, 384, 30]);
          feeds['cached_conv2_3'] = getFeedInfo('cached_conv2_3', 'float32', 1, [2, 1, 384, 30]);
          feeds['cached_conv2_4'] = getFeedInfo('cached_conv2_4', 'float32', 1, [4, 1, 384, 30]);
        } else if (modelName.indexOf('voiceitt_casr_encoder_epoch_70_merged_int8') > -1) {
          feeds['cached_conv1_0'] = getFeedInfo('cached_conv1_0', 'float32', 1, [1,192,15]);
          feeds['cached_conv1_1'] = getFeedInfo('cached_conv1_1', 'float32', 1, [1,192,15]);
          feeds['cached_conv1_10'] = getFeedInfo('cached_conv1_10', 'float32', 1, [1,768,7]);
          feeds['cached_conv1_11'] = getFeedInfo('cached_conv1_11', 'float32', 1, [1,768,7]);
          feeds['cached_conv1_12'] = getFeedInfo('cached_conv1_12', 'float32', 1, [1,768,7]);
          feeds['cached_conv1_13'] = getFeedInfo('cached_conv1_13', 'float32', 1, [1,512,7]);
          feeds['cached_conv1_14'] = getFeedInfo('cached_conv1_14', 'float32', 1, [1,512,7]);
          feeds['cached_conv1_15'] = getFeedInfo('cached_conv1_15', 'float32', 1, [1,512,7]);
          feeds['cached_conv1_16'] = getFeedInfo('cached_conv1_16', 'float32', 1, [1,512,7]);
          feeds['cached_conv1_17'] = getFeedInfo('cached_conv1_17', 'float32', 1, [1,256,15]);
          feeds['cached_conv1_18'] = getFeedInfo('cached_conv1_18', 'float32', 1, [1,256,15]);
          feeds['cached_conv1_2'] = getFeedInfo('cached_conv1_2', 'float32', 1, [1,256,15]);
          feeds['cached_conv1_3'] = getFeedInfo('cached_conv1_3', 'float32', 1, [1,256,15]);
          feeds['cached_conv1_4'] = getFeedInfo('cached_conv1_4', 'float32', 1, [1,512,7]);
          feeds['cached_conv1_5'] = getFeedInfo('cached_conv1_5', 'float32', 1, [1,512,7]);
          feeds['cached_conv1_6'] = getFeedInfo('cached_conv1_6', 'float32', 1, [1,512,7]);
          feeds['cached_conv1_7'] = getFeedInfo('cached_conv1_7', 'float32', 1, [1,512,7]);
          feeds['cached_conv1_8'] = getFeedInfo('cached_conv1_8', 'float32', 1, [1,768,7]);
          feeds['cached_conv1_9'] = getFeedInfo('cached_conv1_9', 'float32', 1, [1,768,7]);
          feeds['cached_conv2_0'] = getFeedInfo('cached_conv2_0', 'float32', 1, [1,192,15]);
          feeds['cached_conv2_1'] = getFeedInfo('cached_conv2_1', 'float32', 1, [1,192,15]);
          feeds['cached_conv2_10'] = getFeedInfo('cached_conv2_10', 'float32', 1, [1,768,7]);
          feeds['cached_conv2_11'] = getFeedInfo('cached_conv2_11', 'float32', 1, [1,768,7]);
          feeds['cached_conv2_12'] = getFeedInfo('cached_conv2_12', 'float32', 1, [1,768,7]);
          feeds['cached_conv2_13'] = getFeedInfo('cached_conv2_13', 'float32', 1, [1,512,7]);
          feeds['cached_conv2_14'] = getFeedInfo('cached_conv2_14', 'float32', 1, [1,512,7]);
          feeds['cached_conv2_15'] = getFeedInfo('cached_conv2_15', 'float32', 1, [1,512,7]);
          feeds['cached_conv2_16'] = getFeedInfo('cached_conv2_16', 'float32', 1, [1,512,7]);
          feeds['cached_conv2_17'] = getFeedInfo('cached_conv2_17', 'float32', 1, [1,256,15]);
          feeds['cached_conv2_18'] = getFeedInfo('cached_conv2_18', 'float32', 1, [1,256,15]);
          feeds['cached_conv2_2'] = getFeedInfo('cached_conv2_2', 'float32', 1, [1,256,15]);
          feeds['cached_conv2_3'] = getFeedInfo('cached_conv2_3', 'float32', 1, [1,256,15]);
          feeds['cached_conv2_4'] = getFeedInfo('cached_conv2_4', 'float32', 1, [1,512,7]);
          feeds['cached_conv2_5'] = getFeedInfo('cached_conv2_5', 'float32', 1, [1,512,7]);
          feeds['cached_conv2_6'] = getFeedInfo('cached_conv2_6', 'float32', 1, [1,512,7]);
          feeds['cached_conv2_7'] = getFeedInfo('cached_conv2_7', 'float32', 1, [1,512,7]);
          feeds['cached_conv2_8'] = getFeedInfo('cached_conv2_8', 'float32', 1, [1,768,7]);
          feeds['cached_conv2_9'] = getFeedInfo('cached_conv2_9', 'float32', 1, [1,768,7]);
          feeds['cached_key_0'] = getFeedInfo('cached_key_0', 'float32', 1, [128,1,128]);
          feeds['cached_key_1'] = getFeedInfo('cached_key_1', 'float32', 1, [128,1,128]);
          feeds['cached_key_2'] = getFeedInfo('cached_key_2', 'float32', 1, [64,1,128]);
          feeds['cached_key_3'] = getFeedInfo('cached_key_3', 'float32', 1, [64,1,128]);
          feeds['cached_key_4'] = getFeedInfo('cached_key_4', 'float32', 1, [32,1,128]);
          feeds['cached_key_5'] = getFeedInfo('cached_key_5', 'float32', 1, [32,1,128]);
          feeds['cached_key_6'] = getFeedInfo('cached_key_6', 'float32', 1, [32,1,128]);
          feeds['cached_key_7'] = getFeedInfo('cached_key_7', 'float32', 1, [32,1,128]);
          feeds['cached_key_8'] = getFeedInfo('cached_key_8', 'float32', 1, [16,1,256]);
          feeds['cached_key_9'] = getFeedInfo('cached_key_9', 'float32', 1, [16,1,256]);
          feeds['cached_key_10'] = getFeedInfo('cached_key_10', 'float32', 1, [16,1,256]);
          feeds['cached_key_11'] = getFeedInfo('cached_key_11', 'float32', 1, [16,1,256]);
          feeds['cached_key_12'] = getFeedInfo('cached_key_12', 'float32', 1, [16,1,256]);
          feeds['cached_key_13'] = getFeedInfo('cached_key_13', 'float32', 1, [32,1,128]);
          feeds['cached_key_14'] = getFeedInfo('cached_key_14', 'float32', 1, [32,1,128]);
          feeds['cached_key_15'] = getFeedInfo('cached_key_15', 'float32', 1, [32,1,128]);
          feeds['cached_key_16'] = getFeedInfo('cached_key_16', 'float32', 1, [32,1,128]);
          feeds['cached_key_17'] = getFeedInfo('cached_key_17', 'float32', 1, [64,1,128]);
          feeds['cached_key_18'] = getFeedInfo('cached_key_18', 'float32', 1, [64,1,128]);
          feeds['cached_nonlin_attn_0'] = getFeedInfo('cached_nonlin_attn_0', 'float32', 1, [1,1,128,144]);
          feeds['cached_nonlin_attn_1'] = getFeedInfo('cached_nonlin_attn_1', 'float32', 1, [1,1,128,144]);
          feeds['cached_nonlin_attn_2'] = getFeedInfo('cached_nonlin_attn_2', 'float32', 1, [1,1,64,192]);
          feeds['cached_nonlin_attn_3'] = getFeedInfo('cached_nonlin_attn_3', 'float32', 1, [1,1,64,192]);
          feeds['cached_nonlin_attn_4'] = getFeedInfo('cached_nonlin_attn_4', 'float32', 1, [1,1,32,384]);
          feeds['cached_nonlin_attn_5'] = getFeedInfo('cached_nonlin_attn_5', 'float32', 1, [1,1,32,384]);
          feeds['cached_nonlin_attn_6'] = getFeedInfo('cached_nonlin_attn_6', 'float32', 1, [1,1,32,384]);
          feeds['cached_nonlin_attn_7'] = getFeedInfo('cached_nonlin_attn_7', 'float32', 1, [1,1,32,384]);
          feeds['cached_nonlin_attn_8'] = getFeedInfo('cached_nonlin_attn_8', 'float32', 1, [1,1,16,576]);
          feeds['cached_nonlin_attn_9'] = getFeedInfo('cached_nonlin_attn_9', 'float32', 1, [1,1,16,576]);
          feeds['cached_nonlin_attn_10'] = getFeedInfo('cached_nonlin_attn_10', 'float32', 1, [1,1,16,576]);
          feeds['cached_nonlin_attn_11'] = getFeedInfo('cached_nonlin_attn_11', 'float32', 1, [1,1,16,576]);
          feeds['cached_nonlin_attn_12'] = getFeedInfo('cached_nonlin_attn_12', 'float32', 1, [1,1,16,576]);
          feeds['cached_nonlin_attn_13'] = getFeedInfo('cached_nonlin_attn_13', 'float32', 1, [1,1,32,384]);
          feeds['cached_nonlin_attn_14'] = getFeedInfo('cached_nonlin_attn_14', 'float32', 1, [1,1,32,384]);
          feeds['cached_nonlin_attn_15'] = getFeedInfo('cached_nonlin_attn_15', 'float32', 1, [1,1,32,384]);
          feeds['cached_nonlin_attn_16'] = getFeedInfo('cached_nonlin_attn_16', 'float32', 1, [1,1,32,384]);
          feeds['cached_nonlin_attn_17'] = getFeedInfo('cached_nonlin_attn_17', 'float32', 1, [1,1,64,192]);
          feeds['cached_nonlin_attn_18'] = getFeedInfo('cached_nonlin_attn_18', 'float32', 1, [1,1,64,192]);
          feeds['cached_val1_0'] = getFeedInfo('cached_val1_0', 'float32', 1, [128,1,48]);
          feeds['cached_val1_1'] = getFeedInfo('cached_val1_1', 'float32', 1, [128,1,48]);
          feeds['cached_val1_10'] = getFeedInfo('cached_val1_10', 'float32', 1, [16,1,96]);
          feeds['cached_val1_11'] = getFeedInfo('cached_val1_11', 'float32', 1, [16,1,96]);
          feeds['cached_val1_12'] = getFeedInfo('cached_val1_12', 'float32', 1, [16,1,96]);
          feeds['cached_val1_13'] = getFeedInfo('cached_val1_13', 'float32', 1, [32,1,48]);
          feeds['cached_val1_14'] = getFeedInfo('cached_val1_14', 'float32', 1, [32,1,48]);
          feeds['cached_val1_15'] = getFeedInfo('cached_val1_15', 'float32', 1, [32,1,48]);
          feeds['cached_val1_16'] = getFeedInfo('cached_val1_16', 'float32', 1, [32,1,48]);
          feeds['cached_val1_17'] = getFeedInfo('cached_val1_17', 'float32', 1, [64,1,48]);
          feeds['cached_val1_18'] = getFeedInfo('cached_val1_18', 'float32', 1, [64,1,48]);
          feeds['cached_val1_2'] = getFeedInfo('cached_val1_2', 'float32', 1, [64,1,48]);
          feeds['cached_val1_3'] = getFeedInfo('cached_val1_3', 'float32', 1, [64,1,48]);
          feeds['cached_val1_4'] = getFeedInfo('cached_val1_4', 'float32', 1, [32,1,48]);
          feeds['cached_val1_5'] = getFeedInfo('cached_val1_5', 'float32', 1, [32,1,48]);
          feeds['cached_val1_6'] = getFeedInfo('cached_val1_6', 'float32', 1, [32,1,48]);
          feeds['cached_val1_7'] = getFeedInfo('cached_val1_7', 'float32', 1, [32,1,48]);
          feeds['cached_val1_8'] = getFeedInfo('cached_val1_8', 'float32', 1, [16,1,96]);
          feeds['cached_val1_9'] = getFeedInfo('cached_val1_9', 'float32', 1, [16,1,96]);
          feeds['cached_val2_0'] = getFeedInfo('cached_val2_0', 'float32', 1, [128,1,48]);
          feeds['cached_val2_1'] = getFeedInfo('cached_val2_1', 'float32', 1, [128,1,48]);
          feeds['cached_val2_10'] = getFeedInfo('cached_val2_10', 'float32', 1, [16,1,96]);
          feeds['cached_val2_11'] = getFeedInfo('cached_val2_11', 'float32', 1, [16,1,96]);
          feeds['cached_val2_12'] = getFeedInfo('cached_val2_12', 'float32', 1, [16,1,96]);
          feeds['cached_val2_13'] = getFeedInfo('cached_val2_13', 'float32', 1, [32,1,48]);
          feeds['cached_val2_14'] = getFeedInfo('cached_val2_14', 'float32', 1, [32,1,48]);
          feeds['cached_val2_15'] = getFeedInfo('cached_val2_15', 'float32', 1, [32,1,48]);
          feeds['cached_val2_16'] = getFeedInfo('cached_val2_16', 'float32', 1, [32,1,48]);
          feeds['cached_val2_17'] = getFeedInfo('cached_val2_17', 'float32', 1, [64,1,48]);
          feeds['cached_val2_18'] = getFeedInfo('cached_val2_18', 'float32', 1, [64,1,48]);
          feeds['cached_val2_2'] = getFeedInfo('cached_val2_2', 'float32', 1, [64,1,48]);
          feeds['cached_val2_3'] = getFeedInfo('cached_val2_3', 'float32', 1, [64,1,48]);
          feeds['cached_val2_4'] = getFeedInfo('cached_val2_4', 'float32', 1, [32,1,48]);
          feeds['cached_val2_5'] = getFeedInfo('cached_val2_5', 'float32', 1, [32,1,48]);
          feeds['cached_val2_6'] = getFeedInfo('cached_val2_6', 'float32', 1, [32,1,48]);
          feeds['cached_val2_7'] = getFeedInfo('cached_val2_7', 'float32', 1, [32,1,48]);
          feeds['cached_val2_8'] = getFeedInfo('cached_val2_8', 'float32', 1, [16,1,96]);
          feeds['cached_val2_9'] = getFeedInfo('cached_val2_9', 'float32', 1, [16,1,96]);
        }
      }
    }

    return feeds;
  }

  options.logSeverityLevel = 0;
  // options.logVerbosityLevel = 0;

  if (_backend === 'wasm_4') {
    ort.env.wasm.numThreads = numThreads;
  } else {
    ort.env.wasm.numThreads = 1
  }
  ort.env.wasm.simd = true;
  ort.env.wasm.proxy = false;

  // (backend === 'webnn' || _backend === 'wasm_4') ? ort.env.wasm.proxy = true : ort.env.wasm.proxy = false;
  // (_backend === 'wasm_4') ? ort.env.wasm.proxy = true : ort.env.wasm.proxy = false;

  let freeDimensionOverrides = getFreeDimensionOverridesById(_model);

  if (freeDimensionOverrides) {
    options.freeDimensionOverrides = freeDimensionOverrides;
  }

  if (_backend === "webgpu" && enableIoBinding === true) {
    options.preferredOutputLocation = "gpu-buffer";
  }

  l(`ort.env.wasm.numThreads: ${ort.env.wasm.numThreads}`)
  l(`ort.env.wasm.simd: ${ort.env.wasm.simd}`)
  l(`ort.env.wasm.proxy: ${ort.env.wasm.proxy}`)

  l(`EP options numThreads: ${numThreads}`)

  l(`options:`)
  l(options)

  updateTestQueueStatus(_id, 2);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 1, null, null, null, [], null, null, null, null, null);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 2, null, null, null, [], null, null, null, null, null);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Testing ${_model} (${_modelType}/${_dataType}/${_modelSize}) with ${_backend} backend`);

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Downloading model from ${modelPath}`);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  let modelBuffer = null;
  if (!isSafari) {
    modelBuffer = await getModelOPFS(_model, modelPath, false);
    if (modelBuffer.byteLength < 1024) {
      modelBuffer = await getModelOPFS(_model, modelPath, true);
    }
  } else {
    modelBuffer = await getModelCache(_model, modelPath, false);
    if (modelBuffer.byteLength < 1024) {
      modelBuffer = await getModelCache(_model, modelPath, true);
    }
  }

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Creating onnx runtime web inference session`);

  const compilationStart = performance.now();

  // const sess = null;
  // if(externalDataName) {
  //   sess = await ort.InferenceSession.create(modelPath, options);
  // } else {
  //   sess = await ort.InferenceSession.create(modelBuffer, options);
  // }
  const sess = await ort.InferenceSession.create(modelBuffer, options);

  if (Object.keys(feedsInfo).length === 0) {
    getFeedsInfo(sess, _model);
  }

  let compilationTime = performance.now() - compilationStart;
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Compilation Time: ${compilationTime} ms`);

  if (_backend === "webgpu" && enableIoBinding === true) {
    webgpuDevice = ort.env.webgpu.device;
  }

  let numOfWarmups = 1;

  if (_backend === 'webgl' || _backend === 'webgpu' || (_backend === 'webnn' && deviceType === 'gpu')) {
    numOfWarmups = 1;
  }

  let firstInferenceTime = 0, warmupTimes = [], inferenceTimes = [], timeToFirstInference = null, inferenceTimesAverage = null, inferenceTimesMedian = null, inferenceTimesThroughput = null, inferenceTimesNinety = null, inferenceTimesBest = null;

  if (_backend === 'webgpu' || _backend === 'webnn') {
    updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] IO Binding: ${enableIoBinding}`);
  }

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inferencing, please wait... `);

  let throughputStart = performance.now();
  for (let i = 0; i < numOfWarmups + numOfRuns; i++) {
    let feeds = {};
    Object.keys(feedsInfo).forEach(key => {
      let dims = feedsInfo[key].dims;
      let bufferSize = feedsInfo[key].size;
      if (enableIoBinding && _backend === "webgpu") {
        const myPreAllocatedBuffer = webgpuDevice.createBuffer({
          size: bufferSize,
          usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
        });

        webgpuDevice.queue.writeBuffer(myPreAllocatedBuffer, 0, feedsInfo[key].data);
        feeds[key] = ort.Tensor.fromGpuBuffer(myPreAllocatedBuffer, { dataType: feedsInfo[key].type, dims });
      }
      else if (enableIoBinding && _backend === "webnn") {
        //console.time(feed);
        // mlContext.writeTensor(inputMlBuffer[key], feeds[key].data);
        //console.timeEnd(feed);
        feeds[key] = new ort.Tensor(feedsInfo[key].type, feedsInfo[key].data, feedsInfo[key].dims);
      }
      else {
        feeds[key] = new ort.Tensor(feedsInfo[key].type, feedsInfo[key].data, feedsInfo[key].dims);
      }
    });

    // console.log('-- feeds --');
    // console.log(feeds);

    let start;
    start = performance.now();
    await sess.run(feeds);

    if (_backend === "webgpu" && enableIoBinding) {
      await webgpuDevice.queue.onSubmittedWorkDone();
    }

    let inferenceTime = performance.now() - start;

    if (i === 0) {
      firstInferenceTime = parseFloat(inferenceTime).toFixed(2);
      timeToFirstInference = (parseFloat(compilationTime) + parseFloat(firstInferenceTime)).toFixed(2);
    }

    (i < numOfWarmups) ? warmupTimes.push(inferenceTime) : inferenceTimes.push(inferenceTime);

    // updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time [${i + 1}/${numOfRuns}]: ${inferenceTime} ms`);
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
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (${numOfRuns} times): [${inferenceTimes}] ms`);
  await sleep(100);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Throughput (${numOfRuns} times): ${inferenceTimesThroughput}`);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 3, compilationTime, firstInferenceTime, timeToFirstInference, inferenceTimes, inferenceTimesMedian, inferenceTimesThroughput, inferenceTimesNinety, inferenceTimesAverage, inferenceTimesBest, null);

  await sess.release();
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Test ${_model} (${_modelType}/${_dataType}) with ${_backend} backend completed`);
  await sleep(500);
}

export const runOnnx = async (_id, _model, _modelType, _dataType, _modelSize, _backend) => {
  // await main(_id, _model, _modelType, _dataType, _modelSize, _backend);

  // let modelInfo = JSON.stringify(getModelInfoById(_model), null, '');
  // modelInfo = modelInfo.replaceAll(':', ': ');
  // updateInfo(`Model Info: ${modelInfo}`)

  const [err, data] = await to(main(_id, _model, _modelType, _dataType, _modelSize, _backend));
  if (err) {
    addResult(_model, _modelType, _dataType, _modelSize, _backend, 4, null, null, null, [], null, null, null, null, err.message);
    updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Error: ${_model} (${_modelType}/${_dataType}) with ${_backend} backend`);
    updateInfo(err.message);
  } else {
    // use data 
  }
}