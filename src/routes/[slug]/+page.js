import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */

import { numberofruns } from '../../store';
import settings from '../../store';
import { goto } from '$app/navigation';

/**
 * @type {number}
 */
let numOfRuns;

numberofruns.subscribe((value) => {
  numOfRuns = value;
});

const setNumberOfRuns = () => {
  numberofruns.update(() => numOfRuns);
};

let backends = '';
let models = '';

let setBackend = (/** @type {string} */ backend) => {
  if (backend === 'wasm' || backend === 'wasm1' || backend === 'wasm_1') {
    settings.setWasm1();
  } else if (backend === 'wasm4' || backend === 'wasm_4') {
    settings.setWasm4();
  } else if (backend === 'webgl') {
    settings.setWebgl();
  } else if (backend === 'webgpu') {
    settings.setWebGpu();
  } else if (backend === 'webnncpu' || backend === 'webnncpu1' || backend === 'webnncpu_1' || backend === 'webnn_cpu_1') {
    settings.setWebnnCpu1();
  } else if (backend === 'webnncpu4' || backend === 'webnncpu_4' || backend === 'webnn_cpu_4') {
    settings.setWebnnCpu4();
  } else if (backend === 'webnngpu' || backend === 'webnn_gpu') {
    settings.setWebnnGpu();
  } else if (backend === 'webnnnpu' || backend === 'webnn_npu') {
    settings.setWebnnNpu();
  } else if (backend === 'none') {
    settings.clearBackends();
  }
}

let setModel = (/** @type {string} */ model) => {
  if (model === 'mobilenet' || model === 'mobilenetv2' || model === 'mobilenet_v2') {
    settings.set_mobilenet_v2_7();
    settings.set_mobilenet_v2_10();
  } else if (model === 'mobilenet_v2_7') {
    settings.set_mobilenet_v2_7();
  } else if (model === 'mobilenet_v2_10') {
    settings.set_mobilenet_v2_10();
  } else if (model === 'efficientnet_lite4_11' || model === 'efficientnet_lite' || model === 'efficientnet') {
    settings.set_efficientnet_lite4_11();
  } else if (model === 'resnet50' || model === 'resnet') {
    settings.set_resnet50_v1_12();
    settings.set_resnet50_v2_7();
  } else if (model === 'resnet50_v1_12' || model === 'resnet50_v1' || model === 'resnet50v1') {
    settings.set_resnet50_v1_12();
  } else if (model === 'resnet50_v2_7' || model === 'resnet50_v2' || model === 'resnet50v2') {
    settings.set_resnet50_v2_7();
  } else if (model === 'squeezenet_11_7' || model === 'squeezenet') {
    settings.set_squeezenet_11_7();
  } else if (model === 'fns_candy_8' || model === 'fns_candy' || model === 'fnscandy') {
    settings.set_fns_candy_8();
  } else if (model === 'emotion_ferplus_8' || model === 'emotion_ferplus' || model === 'emotionferplus') {
    settings.set_emotion_ferplus_8();
  } else if (model === 'densenet_9' || model === 'densenet') {
    settings.set_densenet_9();
  } else if (model === 'tinyyolov2_8' || model === 'tinyyolo_v2_8' || model === 'tinyyolov2' || model === 'tinyyolo') {
    settings.set_tinyyolov2_8();
  } else if (model === 'none') {
    settings.clearModels();
  }
}

export function load({ params }) {
  console.log(params.slug)

  if (params.slug.split('-').length !== 3 || !Number.isInteger(parseFloat(params.slug.split('-')[0].trim()))) {
    throw error(404, 'Not found, unexpected URL path, please double check.');
  } else {
    numOfRuns = parseInt(params.slug.split('-')[0].trim());
    backends = params.slug.split('-')[1].trim();
    models = params.slug.split('-')[2].trim();
  }

  if (numOfRuns > 1000) {
    numOfRuns = 1000
  } else if (numOfRuns < 1) {
    numOfRuns = 1
  }

  setNumberOfRuns();

  if (backends.indexOf(',') > -1) {
    for (let b of backends.split(',')) {
      let backend = b.toLowerCase().trim();
      setBackend(backend);
    }
  } else if (backends === 'all') {
    settings.setBackends();
  } else {
    setBackend(backends);
  }

  if (models.indexOf(',') > -1) {
    for (let m of models.split(',')) {
      let model = m.toLowerCase().trim();
      setModel(model);
    }
  } else if (models === 'all') {
    settings.setModels();
  } else {
    setModel(models);
  }

  // if (params.slug) {
  //   return {
  //     backends: [],
  //     models: [],
  //   };
  // }

  // throw error(404, 'Not found');
}