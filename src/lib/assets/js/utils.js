import { numberofrunsStore, backendsStore, dataTypesStore, modelTypesStore, modelsStore, testQueueStore } from '../../store'
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

export const clearTestQueue = () => {
  testQueueStore.update(() => []);
}

export const initStore = () => {
  numberofrunsStore.update(() => 1);
  backendsStore.update(() => []);
  dataTypesStore.update(() => []);
  modelTypesStore.update(() => []);
  modelsStore.update(() => []);
  testQueueStore.update(() => []);
}

export const updateStore = (numOfRuns, backends, dataTypes, modelTypes, models) => {
  numberofrunsStore.update(() => numOfRuns);
  backendsStore.update(() => backends);
  dataTypesStore.update(() => dataTypes);
  modelTypesStore.update(() => modelTypes);
  modelsStore.update(() => models);
}

/**
 * @type {number}
 */
let numOfRuns;

numberofrunsStore.subscribe((value) => {
  numOfRuns = value;
});

export const goTo = (selectedModels, selectedBackends, selectedDataTypes, selectedModelTypes) => {
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
      if (selectedModelTypes.length === 3) {
        modelType = 'all';
      } else {
        modelType = selectedModelTypes.toString();
      }

      let model = selectedModels.toString();

      let url = `${base}?modeltype=${modelType}&datatype=${dataType}&backend=${backend}&run=${numOfRuns}&model=${model}`
      goto(url);
    }
  } else {
    console.log('goto else')
    let url = `${base}?`
    goto(url);
  }
}

export const testQueue = (models, selectedModels, selectedBackends, selectedDataTypes, selectedModelTypes) => {
  /**
   * @type {string[]}
   */
  let testQueue = [];
  if (selectedModels) {
    let t = '';
    for (const b of selectedBackends) {
      for (const dt of selectedDataTypes) {
        for (const mt of selectedModelTypes) {
          for (const m of selectedModels) {
            const matchedModels = models.filter(
              (model) => model.id === m && model.format === mt && model.datatype === dt
            );

            if (matchedModels.length > 0) {
              t = `${mt} ${m} ${dt} ${b}`;
              testQueue.push(t);
            }
          }
        }
      }
    }
    testQueueStore.update(() => testQueue);
  }

  goTo(selectedModels, selectedBackends, selectedDataTypes, selectedModelTypes);
};