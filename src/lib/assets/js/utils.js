import { autoStore, infoStore, numberOfRunsStore, backendsStore, dataTypesStore, modelTypesStore, modelsStore, testQueueStore, testQueueLengthStore, resultsStore } from '../../store/store'
import { models, uniqueBackends } from '../../config';
import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { environment } from '$lib/config.js';
import { UAParser } from 'ua-parser-js';
import html2canvas from 'html2canvas';

export const initResult = (newItem) => {
  resultsStore.update(items => {
    const exists = items.some(item =>
      item.model === newItem.model &&
      item.modeltype === newItem.modeltype &&
      item.datatype === newItem.datatype
    );
    if (!exists) {
      return [...items, newItem];
    }
    return items;
  });
}

export const addResult = (model, modeltype, datatype, backend, backendstatus, backendinference) => {
  resultsStore.update(items => {
    return items.map(item => {
      if (
        item.model === model &&
        item.modeltype === modeltype &&
        item.datatype === datatype
      ) {
        const updatedItem = { ...item };
        for (const key in updatedItem) {
          if (key !== "id" && key !== "model" && key !== "modeltype" && key !== "datatype") {
            updatedItem[backend].status = backendstatus;
            updatedItem[backend].inference = backendinference;
          }
        }
        return updatedItem;
      }
      return item;
    });
  });
}

export const resetResult = () => {
  resultsStore.update(() => []);
}

export const updateStore = (numOfRuns, backends, dataTypes, modelTypes, models) => {
  numberOfRunsStore.update(() => numOfRuns);
  backendsStore.update(() => backends);
  dataTypesStore.update(() => dataTypes);
  modelTypesStore.update(() => modelTypes);
  modelsStore.update(() => models);
  infoStore.update(() => []);
}

export const resetStore = () => {
  autoStore.update(() => false);
  numberOfRunsStore.update(() => 1);
  backendsStore.update(() => []);
  dataTypesStore.update(() => []);
  modelTypesStore.update(() => []);
  modelsStore.update(() => []);
  testQueueStore.update(() => []);
  testQueueLengthStore.update(() => 0);
  resultsStore.update(() => []);
  infoStore.update(() => []);
}

/**
 * @type {string[]}
 */
export let info;
infoStore.subscribe((value) => {
  info = value;
});

const padNumber = (num, fill) => {
  let len = ('' + num).length;
  return Array(fill > len ? fill - len + 1 || 0 : 0).join(0) + num;
};

const getDateTime = () => {
  let date = new Date(),
    m = padNumber(date.getMonth() + 1, 2),
    d = padNumber(date.getDate(), 2),
    hour = padNumber(date.getHours(), 2),
    min = padNumber(date.getMinutes(), 2),
    sec = padNumber(date.getSeconds(), 2);
  return `${m}/${d} ${hour}:${min}:${sec}`;
};

export const updateInfo = (value) => {
  infoStore.update((arr) => [...arr, getDateTime() + ' ' + value]);
}

export const resetInfo = () => {
  infoStore.update(() => []);
}

/**
 * @type {boolean}
 */
export let auto;
autoStore.subscribe((value) => {
  auto = value;
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
export let selectedBackends;
backendsStore.subscribe((value) => {
  selectedBackends = value;
});

/**
 * @type {string[]}
 */
export let selectedModelTypes;
modelTypesStore.subscribe((value) => {
  selectedModelTypes = value;
});

/**
 * @type {string[]}
 */
export let selectedDataTypes;
dataTypesStore.subscribe((value) => {
  selectedDataTypes = value;
});

/**
 * @type {string[]}
 */
export let selectedModels;
modelsStore.subscribe((value) => {
  selectedModels = value;
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

export const removeStringFromArray = (array, string) => {
  const indexToRemove = array.indexOf(string);
  if (indexToRemove !== -1) {
    array.splice(indexToRemove, 1);
  }
  return array;
}

export const getURLParameterValue = (parameter) => {
  let url = new URL(location.href);
  return url.searchParams.get(parameter);
}

export const trimComma = (string) => {
  if (string && string.startsWith(',')) {
    string = string.slice(1);
  }

  if (string && string.endsWith(',')) {
    string = string.slice(0, -1);
  }

  return string;
}

export const getUniqueDataTypes = () => {
  let uniqueDataTypes = [];
  for (let model of models) {
    let datatype = model.datatype;
    if (datatype && !uniqueDataTypes.includes(datatype)) {
      uniqueDataTypes.push(datatype);
    }
  }
  return uniqueDataTypes;
}

export const getUniqueDataTypesByModelId = (modelid) => {
  const matchingModels = models.filter(model => model.id === modelid);
  return [...new Set(matchingModels.map(model => model.datatype))];
}

export const getUniqueModelTypesByModelId = (modelid) => {
  const matchingModels = models.filter(model => model.id === modelid);
  return [...new Set(matchingModels.map(model => model.format))];
}

export const getUniqueModels = () => {
  let uniqueModels = [];
  for (let model of models) {
    let id = model.id;
    if (id && !uniqueModels.includes(id)) {
      uniqueModels.push(id);
    }
  }
  return uniqueModels;
}

export const getUniqueModelTypes = () => {
  let uniqueModelTypes = [];
  for (let model of models) {
    let format = model.format;
    if (format && !uniqueModelTypes.includes(format)) {
      uniqueModelTypes.push(format);
    }
  }
  return uniqueModelTypes;
}

let newUrl = '';

export const goTo = (key, value) => {
  let url = new URL(window.location.href);
  if (key !== undefined) {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.set(key, 'none');
    }
    newUrl = url.toString();
    console.log('goto: ' + newUrl)
    goto(newUrl);
  }
}

export const filterTestQueue = (id) => {
  let filteredTestQueue = testQueue.filter((testQueue) => testQueue.id !== id);
  testQueueStore.update(() => filteredTestQueue);
}

export const updateTestQueueStatus = (id, status) => {
  testQueueStore.update(items => {
    return items.map(item => {
      if (item.id === id) {
        return { ...item, status: status };
      }
      return item;
    });
  });
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
              // Status: 0 Not selected, 1 Not started, 2 In testing, 3 Completed, 4 Fail or Error
              let t = {
                id: id,
                status: 1,
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
    testQueueLengthStore.update(() => testQueue.length)
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

export const arrayToStringWithComma = (array) => {
  return array.join(',');
}

export const containsAllElementsInArray = (string, array) => {
  return array.every(element => string.includes(element));
}

export const urlToStore = (urlSearchParams, modelIdFromUrl) => {
  if (urlSearchParams.size > 0) {
    let modelType = urlSearchParams.get('modeltype');
    let dataType = urlSearchParams.get('datatype');
    let backend = urlSearchParams.get('backend');
    let numOfRuns = urlSearchParams.get('run');
    let model = urlSearchParams.get('model');

    if (modelType.indexOf(',') > -1) {
      modelType = stringToArray(modelType);
    } else if (modelType.toLowerCase() === 'none') {
      modelType = [];
    } else if (modelType.toLowerCase() === 'all') {
      modelType = getUniqueModelTypes();
    } else {
      modelType = [modelType];
    }

    if (dataType.indexOf(',') > -1) {
      dataType = stringToArray(dataType);
    } else if (dataType.toLowerCase() === 'none') {
      dataType = [];
    } else if (dataType.toLowerCase() === 'all') {
      dataType = getUniqueDataTypes();
    } else {
      dataType = [dataType];
    }

    if (backend.indexOf(',') > -1) {
      backend = stringToArray(backend);
    } else if (backend.toLowerCase() === 'none') {
      backend = [];
    } else if (backend.toLowerCase() === 'all') {
      backend = uniqueBackends;
    } else {
      backend = [backend];
    }

    if (model && model.indexOf(',') > -1) {
      model = stringToArray(model);
    } else if (model?.toLowerCase() === 'none') {
      model = [];
    } else if (model?.toLowerCase() === 'all') {
      model = getUniqueModels();
    } else {
      model = [model];
    }

    numOfRuns = parseInt(numOfRuns);
    if (numOfRuns <= 1) {
      numOfRuns = 1;
    } else if (numOfRuns > 1000) {
      numOfRuns = 1000;
    }

    if (modelIdFromUrl) {
      updateStore(numOfRuns, backend, dataType, modelType, [modelIdFromUrl]);
    } else {
      updateStore(numOfRuns, backend, dataType, modelType, model);
    }

    updateTestQueue();
  }
};

export const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

export const random = () => {
  return (Math.random() * (1000 - 1) + 1).toFixed(2);
};

export const median = (arr, length) => {
  if (arr.length == 0) {
    return;
  }
  const sorted = arr.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    let evenSum = 0;
    if (length === 0) {
      evenSum = parseInt(sorted[middle - 1]) + parseInt(sorted[middle]);
    } else if (length === 2) {
      evenSum = parseFloat(sorted[middle - 1]) + parseFloat(sorted[middle]);
    }
    return (evenSum / 2.0).toFixed(length);
  } else {
    return sorted[middle];
  }
};

export const run = async () => {
  if (
    testQueue[0] && getModelIdfromPath() === testQueue[0].model
  ) {
    let t0 = testQueue[0];
    let r = {
      id: t0.id,
      model: t0.model,
      modeltype: t0.modeltype,
      datatype: t0.datatype
    };
    for (const prop of selectedBackends) {
      r[prop] = {
        status: 1,
        inference: []
      };
    }
    initResult(r);
    addResult(t0.model, t0.modeltype, t0.datatype, t0.backend, 1, []);
    updateTestQueueStatus(t0.id, 2);
    updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Testing ${t0.model} (${t0.modeltype}/${t0.datatype}) with ${t0.backend} backend ...`);
    addResult(t0.model, t0.modeltype, t0.datatype, t0.backend, 2, []);
    updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} Test ${t0.model} (${t0.modeltype}/${t0.datatype}) with ${t0.backend} backend completed`);
    await sleep(1000);
    addResult(t0.model, t0.modeltype, t0.datatype, t0.backend, 3, [random(), random(), random()]);
    filterTestQueue(t0.id);
    run();
  } else if (testQueue[0] && auto) {
    let path = `${base}/run/${testQueue[0].model}`;
    updateInfo(`Go to next page to test ${testQueue[0].model}`);
    goto(path);
  } else if (auto) {
    updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} All tests completed`);
    console.log('NEW URL ' + newUrl)
    goto(newUrl);
  } else {
    updateInfo(`${testQueueLength - testQueue.length}/${testQueueLength} All tests completed`);
  }
};

const saveAs = (uri, filename) => {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

export const downloadScreenshot = () => {
  html2canvas(document.querySelector('#result')).then((canvas) => {
    saveAs(canvas.toDataURL(), 'inference_time_median.png');
    updateInfo(`Inference time median data screenshot downloaded`);
  });
}

export const copyRawInference = async (value) => {
  value = value.toString().replaceAll(',', ' ');
  updateInfo(`Inference time data copied`);
  await navigator.clipboard.writeText(value);
}

export const copyResults = async () => {
  let json = '';
  for (let r of results) {
    delete r.id;
    for (let key in r) {
      if (r[key].hasOwnProperty("status")) {
        delete r[key].status;
      }
    }
    json = JSON.stringify(r) + '\r\n\r\n' + json;
  }
  json = getEnvironment() + json;
  await navigator.clipboard.writeText(json);
  updateInfo(`Full test data copied`);
}

export const copyInfo = async () => {
  let log = info.toString().replaceAll(',', '\r\n');
  await navigator.clipboard.writeText(log);
  updateInfo(`Log history copied`);
}

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

const getEnvironment = () => {
  let parser = UAParser(navigator.userAgent);

  let cpu = '';
  if (parser.cpu.architecture) {
    cpu = 'CPU: ' + parser.cpu.architecture.replace('amd64', 'x86-64') + ' ' + navigator.hardwareConcurrency + ' logical cores\r\n';
  } else {
    cpu = 'CPU: ' + navigator.hardwareConcurrency + ' logical cores\r\n';
  }
  let gpu = 'GPU: ' + getGpu() + '\r\n';
  let os = 'OS: ' + parser.os.name + ' ' + parser.os.version + '\r\n';
  let webbrowser = 'Browser: ' + parser.browser.name + ' ' + parser.browser.version + '\r\n';
  let onnxruntimeweb = 'ONNX Runtime Web: ' + environment.onnxruntimeweb + '\r\n\r\n';
  return cpu + gpu + os + webbrowser + onnxruntimeweb;
}

export const getModelIdfromPath = () => {
  let path = location.pathname;
  path = path.replace('/web-ai-benchmark/run/', '').replaceAll('/run/', '').replaceAll('/', '').trim().toLowerCase();
  return path;
}
