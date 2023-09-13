import { autoStore, numberOfRunsStore, backendsStore, dataTypesStore, modelTypesStore, modelsStore, testQueueStore, resultsStore } from '../../store/store'
import { models } from '../../config';
import { goto } from '$app/navigation';
import { base } from '$app/paths';

export const getGpu = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    let renderer = gl?.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    if (renderer) {
      renderer = renderer.replace('(R)', '').replace('(TM)', '')
        .replace('ANGLE', '').replace('0x00003EA0', '')
        .replace('Mesa DRI', '')
        .replace('OpenGL ES', '').replace('OpenGL 4.6', '')
        .replace('3.2', '').replace('Open Source Technology Center', '')
        .replace('Direct3D11', '').replace('D3D11', '')
        .replace('vs_5_0', '').replace('ps_5_0', '')
        .replace('(Intel', '').replace('Microsoft', '').replace('Google', '')
        .replace('(TM', '').replaceAll('(', '').replaceAll(')', '').replaceAll(',', '').trim();
      return renderer
    }
  }
}

export const addResult = (result) => {
  resultsStore.update((arr) => [...arr, result]);
}

export const resetResult = () => {
  resultsStore.update(() => []);
}

export const clearTestQueue = () => {
  testQueueStore.update(() => []);
}

export const updateStore = (numOfRuns, backends, dataTypes, modelTypes, models) => {
  numberOfRunsStore.update(() => numOfRuns);
  backendsStore.update(() => backends);
  dataTypesStore.update(() => dataTypes);
  modelTypesStore.update(() => modelTypes);
  modelsStore.update(() => models);
}

export const resetStore = () => {
  autoStore.update(() => false);
  numberOfRunsStore.update(() => 1);
  backendsStore.update(() => []);
  dataTypesStore.update(() => []);
  modelTypesStore.update(() => []);
  modelsStore.update(() => []);
  testQueueStore.update(() => []);
  resultsStore.update(() => []);
}

/**
 * @type {boolean}
 */
let auto;
autoStore.subscribe((value) => {
  auto = value;
});

/**
 * @type {number}
 */
let numOfRuns;

numberOfRunsStore.subscribe((value) => {
  numOfRuns = value;
});

/**
 * @type {string[]}
 */
let selectedBackends;
backendsStore.subscribe((value) => {
  selectedBackends = value;
});

/**
 * @type {string[]}
 */
let selectedModelTypes;
modelTypesStore.subscribe((value) => {
  selectedModelTypes = value;
});

/**
 * @type {string[]}
 */
let selectedDataTypes;
dataTypesStore.subscribe((value) => {
  selectedDataTypes = value;
});

/**
 * @type {string[]}
 */
let selectedModels;
modelsStore.subscribe((value) => {
  selectedModels = value;
});

/**
 * @type {string[]}
 */
let testQueue;
testQueueStore.subscribe((value) => {
  testQueue = value;
});

export const goTo = () => {
  if (selectedModels.length > 0 && selectedBackends.length > 0 && selectedDataTypes.length > 0 && selectedModelTypes.length > 0) {
    if (selectedBackends.length > 0 && selectedBackends.length <= 8) {
      let backend;
      if (selectedBackends.length === 8) {
        backend = 'all';
      } else {
        backend = selectedBackends.toString();
      }

      let dataType;
      if (selectedDataTypes.length === 3) {
        dataType = 'all';
      } else {
        dataType = selectedDataTypes.toString();
      }

      let modelType;
      if (selectedModelTypes.length === 4) {
        modelType = 'all';
      } else {
        modelType = selectedModelTypes.toString();
      }

      let model = selectedModels.toString();
      let url;

      if (location.pathname === '/' || location.pathname === '/web-ai-benchmark') {
        url = `${base}?modeltype=${modelType}&datatype=${dataType}&backend=${backend}&run=${numOfRuns}&model=${model}`
      } else {
        if (!auto) {
          url = `${base}?modeltype=${modelType}&datatype=${dataType}&backend=${backend}&run=${numOfRuns}`
        } else {
          url = `${base}?modeltype=${modelType}&datatype=${dataType}&backend=${backend}&run=${numOfRuns}&model=${model}`
        }
      }

      goto(url);
    }
  } else {
    let url = `${base}?`
    goto(url);
  }
}

export const updateTestQueue = () => {
  /**
   * @type {string[]}
   */
  let testQueue = [];
  if (selectedModels) {
    let id = 1;
    for (const m of selectedModels) {
      for (const dt of selectedDataTypes) {
        for (const b of selectedBackends) {
          for (const mt of selectedModelTypes) {
            const matchedModels = models.filter(
              (model) => model.id === m && model.format === mt && model.datatype === dt
            );

            if (matchedModels.length > 0) {

              // t = `${mt} ${m} ${dt} ${b}`;
              // testQueue.push(t);

              let t = {
                id: id,
                model: m,
                modeltype: mt,
                datatype: dt,
                backend: b
              }
              testQueue.push(t);
              id++;
            }
          }
        }
      }
    }

    testQueueStore.update(() => testQueue);
  }
};

export const stringToArray = (value) => {
  if (value.indexOf(',') > -1) {
    value = value.split(',');
  } else {
    value = [value];
  }
  return value;
};

export const filterTestQueue = (id) => {
  let filteredTestQueue = testQueue.filter((testQueue) => testQueue.id !== id);
  testQueueStore.update(() => filteredTestQueue);
}

export const urlToStoreHome = (urlSearchParams) => {
  if (urlSearchParams.size > 0) {
    let modelType = urlSearchParams.get('modeltype');
    let dataType = urlSearchParams.get('datatype');
    let backend = urlSearchParams.get('backend');
    let numOfRuns = urlSearchParams.get('run');
    let model = urlSearchParams.get('model');

    if (modelType.indexOf(',') > -1) {
      modelType = stringToArray(modelType);
    } else if (modelType.toLowerCase() === 'all') {
      modelType = ['onnx', 'tflite', 'npy', 'pt'];
    } else {
      modelType = [modelType];
    }

    if (dataType.indexOf(',') > -1) {
      dataType = stringToArray(dataType);
    } else if (dataType.toLowerCase() === 'all') {
      dataType = ['fp32', 'fp16', 'int8'];
    } else {
      dataType = [dataType];
    }

    if (backend.indexOf(',') > -1) {
      backend = stringToArray(backend);
    } else if (backend.toLowerCase() === 'all') {
      backend = [
        'wasm_1',
        'wasm_4',
        'webgl',
        'webgpu',
        'webnn_cpu_1',
        'webnn_cpu_4',
        'webnn_gpu',
        'webnn_npu'
      ];
    } else {
      backend = [backend];
    }

    if (model) {
      if (model.indexOf(',') > -1) {
        model = stringToArray(model);
      } else {
        model = [model];
      }
    } else {
      model = 'none';
    }

    numOfRuns = parseInt(numOfRuns);

    if (numOfRuns <= 1) {
      numOfRuns = 1;
    } else if (numOfRuns > 1000) {
      numOfRuns = 1000;
    }

    if (modelType && dataType && backend && model) {
      if (numOfRuns) {
        updateStore(numOfRuns, backend, dataType, modelType, model);
      } else {
        updateStore(1, backend, dataType, modelType, model);
      }
    }
  }
};

export const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));