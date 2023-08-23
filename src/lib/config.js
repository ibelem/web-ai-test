export const siteTitle = "Web AI Benchmark";
export const siteDescription = "";
export const siteURL = "";

export let environment = {
  cpu: null,
  logicCores: 0,
  gpu: null,
  os: null,
  osVersion: null,
  webbrowser: null,
  browserVersion: null
};

export let config = {
  backend: {
    wasm: false,
    webgl: false,
    webgpu: false,
    webnn: {
      cpu: false,
      gpu: false,
      npu: false,
    },
    all: false
  },
  wasm: {
    threads: {
      one: false,
      two: false,
      four: false
    },
  },
  webnn: {
    cpu: {
      threads: {
        one: false,
        two: false,
        four: false
      }
    }
  }
};

export let models = [
  {
    id: 1,
    category: 'Image Classification',
    name: 'mobilenetv2-7',
    url: 'https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-7.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
  {
    id: 2,
    category: 'Image Classification',
    name: 'resnet50-v1-7',
    url: 'https://github.com/onnx/models/raw/main/vision/classification/resnet/model/resnet50-v1-7.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
  {
    id: 3,
    category: 'Image Classification',
    name: 'squeezenet1.1-7',
    url: 'https://github.com/onnx/models/raw/main/vision/classification/squeezenet/model/squeezenet1.1-7.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
  {
    id: 4,
    category: 'Image Classification',
    name: 'efficientnet-lite4-11',
    url: 'https://github.com/onnx/models/raw/main/vision/classification/efficientnet-lite4/model/efficientnet-lite4-11.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
  {
    id: 5,
    category: 'Object Detection',
    name: 'tinyyolov2-8',
    url: 'https://github.com/onnx/models/raw/main/vision/object_detection_segmentation/tiny-yolov2/model/tinyyolov2-8.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  }
];

export const gpu = [
  "Intel Arc A770 (16GB)",
  "Intel Arc A770 (8GB)",
  "Intel Arc A770M (16GB)",
  "Intel Arc A750 (8GB)",
  "Intel Arc A730M (12GB)",
  "Intel Arc A570M (8GB)",
  "Intel Arc A550M (8GB)",
  "Intel Arc A530M (4/8GB)",
  "Intel Arc A370M (4GB)",
  "Intel Arc A350M (4GB)",
  "Intel Arc A310 (4GB)",
  "Intel Arc Pro A60(12GB)",
  "Intel Arc Pro A60M(8GB)",
  "Intel Arc Pro A50(6GB)",
  "Intel Arc Pro A40(6GB)",
  "Intel Arc Pro A30M(4GB)",
  "Nvidia GeForce RTX 4090",
  "Nvidia GeForce RTX 4080",
  "Nvidia GeForce RTX 4070 Ti",
  "Nvidia GeForce RTX 4070",
  "Nvidia GeForce RTX 4060 Ti",
  "Nvidia GeForce RTX 4060",
  "Nvidia GeForce RTX 3090 Ti",
  "Nvidia GeForce RTX 3090",
  "Nvidia GeForce RTX 3080 Ti",
  "Nvidia GeForce RTX 3080",
  "Nvidia GeForce RTX 3070 Ti",
  "Nvidia GeForce RTX 3070",
  "Nvidia GeForce RTX 3060 Ti",
  "Nvidia GeForce RTX 3060",
  "Nvidia GeForce RTX 3050"];