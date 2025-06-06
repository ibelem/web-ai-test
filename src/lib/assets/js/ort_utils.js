// import * as ort from 'onnxruntime-web';
import { models, ortDists } from '$lib/config';
import {
  updateTestQueueStatus, addResult, updateInfo, median, loadScript, removeElement, getModelHFFileById, getModelExternalDataNameById,
  getHfUrlById, getHfmUrlById, getAwsUrlById, getLocalUrlById, getHfConfigById, getHfmConfigById, getLocalConfigById, average, minimum
} from '../js/utils';
import { ortWebVersionStore, testQueueStore, testQueueLengthStore, resultsStore, numberOfRunsStore, modelDownloadUrlStore } from '../../store/store';
import { sleep, getQueryValue, getURLParameterValue } from '$lib/assets/js/utils';
import { getModelOPFS, getModelCache } from '$lib/assets/js/nn_utils'
import { isDict } from '$lib/assets/js/data_type';
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
  } else if (modelDownloadUrl === 2) {
    modelPath = getHfmUrlById(_model);
  } else if (modelDownloadUrl === 3) {
    modelPath = getAwsUrlById(_model);
  } else if (modelDownloadUrl === 0) {
    modelPath = getLocalUrlById(_model);
  }
  return modelPath;
}

const getConfigUrl = (_model) => {
  let configPath = getHfConfigById(_model);
  if (modelDownloadUrl === 1) {
    configPath = getHfConfigById(_model);
  } else if (modelDownloadUrl === 2) {
    configPath = getHfmConfigById(_model);
  }
  // else if (modelDownloadUrl === 3) {
  //   configPath = getAwsUrlById(_model);
  // } 
  else if (modelDownloadUrl === 0) {
    configPath = getLocalConfigById(_model);
  }
  return configPath;
}

const main = async (_id, _model, _modelType, _dataType, _modelSize, _backend) => {

  let backend = 'wasm';
  let numThreads = 1;
  let deviceType = 'cpu';
  let enableMLTensor = false;
  let webgpuDevice;
  let webgpuInputBuffer = {};
  let feedsInfo = [];

  if (_model.indexOf('mltensor') > -1) {
    enableMLTensor = true;
  }

  if (getQueryValue('mltensor') == 'true') {
    enableMLTensor = true;
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
      deviceType = 'gpu';
      break;
    case 'webnn_cpu':
      backend = 'webnn';
      deviceType = 'cpu';
      break;
    case 'webnn_gpu':
      backend = 'webnn';
      deviceType = 'gpu';
      break;
    case 'webnn_npu':
      backend = 'webnn';
      deviceType = 'npu';
      break;
    default:
      backend = 'wasm';
      deviceType = 'cpu';
      break;
  }

  const removeTag = () => {
    removeElement('default');
    removeElement('webgpu');
    removeElement('webnn');
  }

  let relaxedSimd = null;
  relaxedSimd = getURLParameterValue('relaxedsimd')?.toLocaleLowerCase().trim();

  let customORT = null;
  customORT = getURLParameterValue('ort')?.trim();
  if(customORT) {
    removeTag();
    await loadScript('ort_custom', customORT);
  } else {
    if (ortWebVersion) {
      if (relaxedSimd === "1") {
        l(`Loading ONNX Runtime Web with relaxed SIMD optimization`)
        await loadScript('wasm', ortDists.wasm_relaxed_simd.url);
      } else {
        if (ortWebVersion.selected === 2) {
          removeTag();
          await loadScript('webnn', ortDists.webnn_webglfix_wasm.url);
        } else if (ortWebVersion.selected === 1) {
          await loadScript('default', `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ortWebVersion.dev}/dist/ort.all.min.js`);
        } else {
          await loadScript('default', `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ortWebVersion.stable}/dist/ort.all.min.js`);
        }
      }
    }
    else {
      removeTag();
      if (relaxedSimd === "1") {
        l(`Loading ONNX Runtime Web with relaxed SIMD optimization`)
        await loadScript('wasm', ortDists.wasm_relaxed_simd.url);
      } else {
        await loadScript('webnn', ortDists.webnn_webglfix_wasm.url);
      }
    }
  }

  let modelPath = getModelUrl(_model);
  let configPath = getConfigUrl(_model);

  const fetchConfigJson = async () => {
    if (configPath) {
      try {
        updateInfo(`Config.json - Fetching from ${configPath}`);
        const response = await fetch(configPath);
        if (!response.ok) {
          if (response.status === 404) {
            updateInfo(`Config.json - HTTP 404 when fetching from ${configPath}, use local freeDimensionOverrides when needed`);
            return;
          }
        }

        const config = await response.json();
        const tjsConfig = config['transformers.js_config'];
        if (tjsConfig) {
          // Priority 1: device_config
          if (tjsConfig.device_config) {
            // Use the current deviceType string, e.g., "webnn-gpu"
            const deviceKey = deviceType === 'cpu' ? 'webnn-cpu'
              : deviceType === 'gpu' ? 'webnn-gpu'
              : deviceType === 'npu' ? 'webnn-npu'
              : 'webnn';
            const deviceOverrides = tjsConfig.device_config[deviceKey]?.free_dimension_overrides;
            if (deviceOverrides) {
              updateInfo(`Config.json - device_config free_dimension_overrides for ${deviceKey}:`);
              for (let key in deviceOverrides) {
                updateInfo(`Config.json - ${key}: ${deviceOverrides[key]}`);
              }
              return deviceOverrides;
            }
          }
          // Priority 2: top-level free_dimension_overrides
          if (tjsConfig.free_dimension_overrides) {
            const overrides = tjsConfig.free_dimension_overrides;
            updateInfo(`Config.json - top-level free_dimension_overrides:`);
            for (let key in overrides) {
              updateInfo(`Config.json - ${key}: ${overrides[key]}`);
            }
            return overrides;
          }
          updateInfo(`Config.json - No free_dimension_overrides found in config.json, use local freeDimensionOverrides when needed`);
        } else {
          updateInfo(`Config.json - No transformers.js_config found in config.json, so no freeDimensionOverrides available, use local freeDimensionOverrides when needed`);
        }
      } catch (error) {
        updateInfo(`Config.json - Error fetching or processing - ${error}, use local freeDimensionOverrides when needed`);
      }
    } else {
      updateInfo(`Config.json - No Config.json can be leveraged, use local freeDimensionOverrides when needed`);
    }
  }

  let options = {
    executionProviders: [
      {
        name: backend,
        deviceType: deviceType,
        preferredLayout: 'NHWC'
      },
    ],
    //executionProviders: [{name: "webnn", deviceType: 'gpu', powerPreference: 'high-performance' }],
  };

  if (_backend === 'wasm_1' || _backend === 'wasm_4') {
    options.executionProviders[0].numThreads = numThreads
    l(`Wasm EP options numThreads: ${numThreads}`)
  }

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

  const mlContext = await navigator.ml?.createContext({ deviceType });

  const getFeedInfo = (inputName, type, data, dims) => {
    if (!sess.inputNames.includes(inputName)) {
      return;
    }
    let typedArray;
    let typeBytes;
    if (type === 'bool') {
      data = [data];
      dims = [1];
      typedArray = Uint8Array;
      typeBytes = 1;
    } else if (type === 'int4') {
      typedArray = Int8Array;
    } else if (type === 'int8') {
      typedArray = Int8Array;
    } else if (type === 'uint8') {
      typedArray = Uint8Array;
    } else if (type === 'uint16') {
      typedArray = Uint16Array;
    } else if (type === 'float16') {
      typedArray = Float16Array;
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

    // console.log(feedsInfo);
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

    if (modelName.indexOf('llama2_c_stories15m_tfbench_model_') > -1) {
      for (var k in inputNames) {
        const v = inputNames[k];
        if (v.startsWith('past_key_values.')) {
          feeds[v] = getFeedInfo(v, 'float32', 1, [1, 6, 9, 48]);
        }
      }
    }

    if (modelName.indexOf('_merged') > -1 || modelName.indexOf('_with_past') > -1) {
      for (var k in inputNames) {
        const v = inputNames[k];
        if (v.startsWith('past_key_values.')) {
          if(modelName.indexOf('deepseek_r1_distill_qwen_1_5b_demo_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float16', 1, [1, 2, 512, 128]);
          } else if (modelName.indexOf('qwen2_0_5b_instruct_demo_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float16', 1, [1, 2, 512, 64]);
          } else if (modelName.indexOf('whisper_small_decoder_static_fp16') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float16', 1, [1, 12, 4, 64]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float16', 1, [1, 12, 1500, 64]);
            }
          } else if (modelName.indexOf('whisper_small_decoder_static_merged_fp16') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float16', 1, [1, 12, 127, 64]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float16', 1, [1, 12, 1500, 64]);
            }
          } else if (modelName.indexOf('phi_3_mini_4k_instruct_demo_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float16', 1, [1, 32, 512, 96]);
          } else if (modelName.indexOf('tinyllama_1_1b_chat_v1_0_demo_merged_') > -1) {
            feeds[v] = getFeedInfo(v, 'float16', 1, [1, 4, 512, 64]);
          } else if (modelName.indexOf('phi_3_mini_4k_instruct_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 32, 255, 96]);
          } else if (modelName.indexOf('t5__small_decoder_tfbench_model') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 8, 2, 64]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 8, 9, 64]);
            }
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
          } else if (modelName.indexOf('qwen2_vl_for_conditional_generation_text_decoder_tfbench_model_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 1, 0, 8]);
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
          } else if (modelName.indexOf('tiny_random_vision_encoder_decoder_vit_gpt_decoder_tfbench') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 0, 8]);
          } else if (modelName.indexOf('tiny_random_vision_encoder_decoder_vit_gpt_2_decoder_') > -1) {
            feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 0, 8]);
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
          } else if (modelName.indexOf('whisper_tiny_en_decoder_tfbench_model') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 6, 0, 64]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 6, 0, 64]);
            }
          } else if (modelName.indexOf('tiny_random_moonshine_for_conditional_generation_decoder_tfbench_pipeline') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 2, 0, 32]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 2, 0, 32]);
            }
          } else if (modelName.indexOf('tiny_random_t5_for_conditional_generation_decoder_tfbench_pipeline') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 0, 8]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 0, 8]);
            }
          } else if (modelName.indexOf('tiny_random_t5_for_conditional_generation_decoder_t2t_tfbench_pipeline') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 0, 8]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 0, 8]);
            }
          } else if (modelName.indexOf('tiny_random_m2m100_for_conditional_generation_tfbench_pipeline') > -1) {
            if (v.includes('decoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 0, 4]);
            } else if (v.includes('encoder')) {
              feeds[v] = getFeedInfo(v, 'float32', 1, [1, 4, 0, 4]);
            }
          }
        }
      }
    }

    return feeds;
  }

  options.logSeverityLevel = 0;
  options.logVerbosityLevel = 0;

  ort.env.logLevel = "verbose";
  ort.env.debug = true;

  // options.graphOptimizationLevel = 'disabled';

  if (_backend === 'wasm_4') {
    ort.env.wasm.numThreads = numThreads;
  } else {
    ort.env.wasm.numThreads = 1
  }
  ort.env.wasm.simd = true;
  ort.env.wasm.proxy = false;

  if (relaxedSimd === "1") {
    l('Setting: ort.env.wasm.relaxedSimd = true')
    ort.env.wasm.relaxedSimd = true;
  }

  // (backend === 'webnn' || _backend === 'wasm_4') ? ort.env.wasm.proxy = true : ort.env.wasm.proxy = false;
  // (_backend === 'wasm_4') ? ort.env.wasm.proxy = true : ort.env.wasm.proxy = false;

  const freeDimensionOverrides = getFreeDimensionOverridesById(_model);
  const freeDimensionOverridesFromConfigJson = await fetchConfigJson();

  if (freeDimensionOverridesFromConfigJson) {
    options.freeDimensionOverrides = freeDimensionOverridesFromConfigJson;
  } else if (freeDimensionOverrides) {
    options.freeDimensionOverrides = freeDimensionOverrides;
  }

  if (_backend === "webgpu" && enableMLTensor) {
    options.preferredOutputLocation = "gpu-buffer";
  }

  if (_backend === "webnn_gpu" && enableMLTensor) {
    options.preferredOutputLocation = "ml-tensor";
  }

  l(`ort.env.wasm.numThreads: ${ort.env.wasm.numThreads}`)
  l(`ort.env.wasm.simd: ${ort.env.wasm.simd}`)
  l(`ort.env.wasm.proxy: ${ort.env.wasm.proxy}`)

  l(`options:`)
  l(options)

  updateTestQueueStatus(_id, 2);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 1, null, null, null, [], null, null, null, null, null);
  addResult(_model, _modelType, _dataType, _modelSize, _backend, 2, null, null, null, [], null, null, null, null, null);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Testing ${_model} (${_modelType}/${_dataType}/${_modelSize}) with ${_backend} backend`);

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Fetching model from ${modelPath}`);

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

  if (_backend === "webgpu" && enableMLTensor) {
    webgpuDevice = ort.env.webgpu.device;
  }

  let numOfWarmups = 3;

  if (_backend === 'webgl' || _backend === 'webgpu' || (_backend === 'webnn_gpu' && deviceType === 'gpu')) {
    numOfWarmups = 3;
  }

  let firstInferenceTime = 0, warmupTimes = [], inferenceTimes = [], timeToFirstInference = null, inferenceTimesAverage = null, inferenceTimesMedian = null, inferenceTimesThroughput = null, inferenceTimesNinety = null, inferenceTimesBest = null;

  if (_backend === 'webgpu' || _backend === 'webnn_gpu') {
    updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] enableMLTensor: ${enableMLTensor}`);
  }

  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inferencing, please wait... `);

  let throughputStart = performance.now();
  for (let i = 0; i < numOfWarmups + numOfRuns; i++) {
    let feeds = {};
    Object.keys(feedsInfo).forEach(key => {
      let dims = feedsInfo[key].dims;
      let bufferSize = feedsInfo[key].size;
      if (enableMLTensor && _backend === "webgpu") {
        if (!(bufferSize in webgpuInputBuffer)) {
          webgpuInputBuffer[bufferSize] = webgpuDevice.createBuffer({
            size: bufferSize,
            usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
          });
        }
        webgpuDevice.queue.writeBuffer(webgpuInputBuffer[bufferSize], 0, feedsInfo[key].data);
        feeds[key] = ort.Tensor.fromGpuBuffer(webgpuInputBuffer[feedsInfo[key].size], { dataType: feedsInfo[key].type, dims });
      } else {
        feeds[key] = new ort.Tensor(feedsInfo[key].type, feedsInfo[key].data, feedsInfo[key].dims);
      }
    });

    let start;
    start = performance.now();
    console.log('---- feeds ----');
    console.log(feeds);
    const result = await sess.run(feeds);

    // await Promise.all(Object.values(result).map(output => f.dispose()));

    if (_backend === "webgpu" && enableMLTensor) {
      await webgpuDevice.queue.onSubmittedWorkDone();
    }

    if (_backend === "webnn_gpu" && enableMLTensor) {
      if (i === (numOfWarmups + numOfRuns - 1)) {
        // console.log(result);
        // console.log(sess.outputNames);

        const promises = [];
        for (let j = 0; j < sess.outputNames.length; j++) {
          promises.push(result[sess.outputNames[j]].getData());
        }
        await Promise.all(promises)
          .then((results) => {
            console.log("[Success] readTensor: ", results);
          })
          .catch((e) => {
            console.log("[Error] readTensor: ", e.message);
          });
      }
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
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (${numOfRuns} runs/iterations): [${inferenceTimes}] ms`);
  await sleep(100);
  const totalInferenceTimes = inferenceTimes.reduce((a, b) => a + b, 0).toFixed(2);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Inference Time (${numOfRuns} runs/iterations in total): ${totalInferenceTimes} ms`);
  await sleep(100);
  updateInfo(`[${testQueueLength - testQueue.length + 1}/${testQueueLength}] Throughput (${numOfRuns} runs/iterations): ${inferenceTimesThroughput}`);
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