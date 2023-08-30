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

export let models = [
  {
    category: 'Image Classification',
    id: 'densenet_9',
    name: 'DenseNet-121',
    url: 'https://github.com/onnx/models/blob/main/vision/classification/densenet-121/model/densenet-9.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
  {
    category: 'Image Classification',
    id: 'efficientnet_lite4_11',
    name: 'EfficientNet Lite4-11',
    url: 'https://github.com/onnx/models/raw/main/vision/classification/efficientnet-lite4/model/efficientnet-lite4-11.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
  {
    category: 'Image Classification',
    id: 'mobilenet_v2_7',
    name: 'MobileNet v2-7',
    url: 'https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-7.onnx',
    format: 'onnx',
    datatype: 'fp32'
  },
  {
    category: 'Image Classification',
    id: 'mobilenet_v2_10',
    name: 'MobileNet v2-1.0',
    url: 'https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-10.onnx',
    format: 'onnx',
    datatype: 'fp32'
  },

  {
    category: 'Image Classification',
    id: 'resnet50-v1-7',
    name: 'ResNet50 v1',
    url: 'https://github.com/onnx/models/raw/main/vision/classification/resnet/model/resnet50-v1-12.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
  {
    category: 'Image Classification',
    id: 'resnet50-v2-7',
    name: 'ResNet50 v2',
    url: 'https://github.com/onnx/models/raw/main/vision/classification/resnet/model/resnet50-v2-7.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
  {
    category: 'Image Classification',
    id: 'squeezenet-11-7',
    name: 'https://github.com/onnx/models/blob/main/vision/classification/squeezenet/model/squeezenet1.1-7.onnx',
    url: 'https://github.com/onnx/models/raw/main/vision/classification/squeezenet/model/squeezenet1.1-7.onnx',
    format: 'onnx',
    datatype: 'fp32',
  },

  {
    category: 'Object Detection',
    id: 'tinyyolov2-8',
    name: 'Tiny YOLO v2',
    url: 'https://github.com/onnx/models/raw/main/vision/object_detection_segmentation/tiny-yolov2/model/tinyyolov2-8.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
  {
    category: 'Face Analysis',
    id: 'emotion_ferplus_8',
    name: 'Emotion FERPlus',
    url: 'https://github.com/onnx/models/raw/main/vision/body_analysis/emotion_ferplus/model/emotion-ferplus-8.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
  {
    category: 'Style Transfer',
    id: 'fns_candy_8',
    name: 'FNS Candy',
    url: 'https://github.com/microsoft/Windows-Machine-Learning/raw/master/Samples/CustomTensorization/CustomTensorization/fns-candy.onnx',
    format: 'onnx',
    datatype: 'fp32',
    selected: false
  },
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