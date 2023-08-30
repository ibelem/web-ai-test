import { writable } from 'svelte/store';

export const numberofruns = writable(1);

const settings = () => {
  const state = {
    wasm_1: false,
    wasm_4: false,
    webgl: false,
    webgpu: false,
    webnn_cpu_1: false,
    webnn_cpu_4: false,
    webnn_gpu: false,
    webnn_npu: false,
    mobilenet_v2_7: false,
    mobilenet_v2_10: false,
    efficientnet_lite4_11: false,
    resnet50_v1_12: false,
    resnet50_v2_7: false,
    squeezenet_11_7: false,
    fns_candy_8: false,
    emotion_ferplus_8: false,
    densenet_9: false,
    tinyyolov2_8: false
  };

  const { subscribe, set, update } = writable(state);

  const methods = {
    toggleBackends() {
      update(state => ({
        ...state, wasm_1: !state.wasm_1,
        wasm_4: !state.wasm_4,
        webgl: !state.webgl,
        webgpu: !state.webgpu,
        webnn_cpu_1: !state.webnn_cpu_1,
        webnn_cpu_4: !state.webnn_cpu_4,
        webnn_gpu: !state.webnn_gpu,
        webnn_npu: !state.webnn_npu
      }))
    },
    toggleWasm1() {
      update(state => ({ ...state, wasm_1: !state.wasm_1 }))
    },
    toggleWasm4() {
      update(state => ({ ...state, wasm_4: !state.wasm_4 }))
    },
    toggleWebgl() {
      update(state => ({ ...state, webgl: !state.webgl }))
    },
    toggleWebGpu() {
      update(state => ({ ...state, webgpu: !state.webgpu }))
    },
    toggleWebnnCpu1() {
      update(state => ({ ...state, webnn_cpu_1: !state.webnn_cpu_1 }))
    },
    toggleWebnnCpu4() {
      update(state => ({ ...state, webnn_cpu_4: !state.webnn_cpu_4 }))
    },
    toggleWebnnGpu() {
      update(state => ({ ...state, webnn_gpu: !state.webnn_gpu }))
    },
    toggleWebnnNpu() {
      update(state => ({ ...state, webnn_npu: !state.webnn_npu }))
    },
    toggleModels() {
      update(state => ({
        ...state, mobilenet_v2_7: !state.mobilenet_v2_7,
        mobilenet_v2_10: !state.mobilenet_v2_10,
        efficientnet_lite4_11: !state.efficientnet_lite4_11,
        resnet50_v1_12: !state.resnet50_v1_12,
        resnet50_v2_7: !state.resnet50_v2_7,
        squeezenet_11_7: !state.squeezenet_11_7,
        fns_candy_8: !state.fns_candy_8,
        emotion_ferplus_8: !state.emotion_ferplus_8,
        densenet_9: !state.densenet_9,
        tinyyolov2_8: !state.tinyyolov2_8
      }))
    },
    toggle_mobilenet_v2_7() {
      update(state => ({ ...state, mobilenet_v2_7: !state.mobilenet_v2_7 }))
    },
    toggle_mobilenet_v2_10() {
      update(state => ({ ...state, mobilenet_v2_10: !state.mobilenet_v2_10 }))
    },
    toggle_efficientnet_lite4_11() {
      update(state => ({ ...state, efficientnet_lite4_11: !state.efficientnet_lite4_11 }))
    },
    toggle_resnet50_v1_12() {
      update(state => ({ ...state, resnet50_v1_12: !state.resnet50_v1_12 }))
    },
    toggle_resnet50_v2_7() {
      update(state => ({ ...state, resnet50_v2_7: !state.resnet50_v2_7 }))
    },
    toggle_squeezenet_11_7() {
      update(state => ({ ...state, squeezenet_11_7: !state.squeezenet_11_7 }))
    },
    toggle_fns_candy_8() {
      update(state => ({ ...state, fns_candy_8: !state.fns_candy_8 }))
    },
    toggle_emotion_ferplus_8() {
      update(state => ({ ...state, emotion_ferplus_8: !state.emotion_ferplus_8 }))
    },
    toggle_densenet_9() {
      update(state => ({ ...state, densenet_9: !state.densenet_9 }))
    },
    toggle_tinyyolov2_8() {
      update(state => ({ ...state, tinyyolov2_8: !state.tinyyolov2_8 }))
    },
  };

  return {
    subscribe,
    ...methods
  }
}

export default settings()