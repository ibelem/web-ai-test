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
  browserVersion: null,
  onnxruntimeweb: 1.16
};

export const localhost = '10.239.115.52:5173';

export const corsSites = [
  'ibelem.github.io',
  'webai.run',
  'ai-benchmark.vercel.app'
]

export const uniqueBackends = [
  'wasm_1',
  'wasm_4',
  'webgl',
  'webgpu',
  'webnn_cpu_1',
  'webnn_cpu_4',
  'webnn_gpu',
  'webnn_npu'
];

export let models = [
  {
    category: 'Model Access Check',
    id: 'model_access_check',
    name: 'Model Access Check',
    url:
    {
      source: '',
      github: '',
      hf: 'https://huggingface.co/webml/models/resolve/main/01.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/01.onnx',
      local: 'models/01.onnx'
    }
  },
  {
    category: 'Image Classification',
    id: 'densenet',
    name: 'DenseNet 121',
    url:
    {
      source: 'https://github.com/onnx/models/blob/main/vision/classification/densenet-121/model/densenet-9.onnx',
      github: 'https://ibelem.github.io/onnxruntime-web-dist/models/densenet-9.onnx',
      hf: 'https://huggingface.co/webml/models/resolve/main/densenet-9.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/densenet-9.onnx',
      local: 'models/densenet-9.onnx'
    },
    format: 'onnx',
    datatype: 'fp32',
    inputs: {
      value: 'img224',
      batch: {}
    }
  },
  {
    category: 'Image Classification',
    id: 'efficientnet_lite',
    name: 'EfficientNet Lite 4',
    url:
    {
      source: 'https://github.com/onnx/models/raw/main/vision/classification/efficientnet-lite4/model/efficientnet-lite4-11.onnx',
      github: 'https://ibelem.github.io/onnxruntime-web-dist/models/efficientnet-lite4-11.onnx',
      hf: 'https://huggingface.co/webml/models/resolve/main/efficientnet-lite4-11.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/efficientnet-lite4-11.onnx',
      local: 'models/efficientnet-lite4-11.onnx'
    },
    format: 'onnx',
    datatype: 'fp32',
    inputs: {
      value: { 'images:0': ['float32', 'random', [1, 224, 224, 3]] },
      batch: {}
    }
  },
  {
    category: 'Image Classification',
    id: 'mobilenet_v2',
    name: 'MobileNet v2',
    url:
    {
      source: 'https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-10.onnx',
      github: 'https://ibelem.github.io/onnxruntime-web-dist/models/mobilenetv2-10.onnx',
      hf: 'https://huggingface.co/webml/models/resolve/main/mobilenetv2-10.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/mobilenetv2-10.onnx',
      local: 'models/mobilenetv2-10.onnx'
    },
    format: 'onnx',
    datatype: 'fp32',
    inputs: {
      value: 'img224',
      batch: { "batch_size": 1 }
    }
  },
  {
    category: 'Image Classification',
    id: 'mobilenet_v2',
    name: 'MobileNet v2',
    url: {
      source: '',
      github: '',
      hf: '',
      local: ''
    },
    format: 'tflite',
    datatype: 'int8',
    inputs: {
      value: 'img224',
      batch: { "batch_size": 1 }
    }
  },
  // {
  //   category: 'Image Classification',
  //   id: 'mobilenet_v2',
  //   name: 'MobileNet v2',
  //   url: {
  //     source: '',
  //     github: '',
  //     hf: '',
  //     local: ''
  //   },
  //   format: 'npy',
  //   datatype: 'fp32',
  //   inputs: {
  //     value: 'img224',
  //     batch: { "batch_size": 1 }
  //   }
  // },
  // {
  //   category: 'Image Classification',
  //   id: 'mobilenet_v2',
  //   name: 'MobileNet v2',
  //   url: {
  //     source: '',
  //     github: '',
  //     hf: '',
  //     local: ''
  //   },
  //   format: 'pt',
  //   datatype: 'fp32',
  //   inputs: {
  //     value: 'img224',
  //     batch: { "batch_size": 1 }
  //   }
  // },
  {
    category: 'Image Classification',
    id: 'resnet50_v1',
    name: 'ResNet50 v1',
    url:
    {
      source: 'https://github.com/onnx/models/raw/main/vision/classification/resnet/model/resnet50-v1-12.onnx',
      github: 'https://ibelem.github.io/onnxruntime-web-dist/models/resnet50-v1-12.onnx',
      hf: 'https://huggingface.co/webml/models/resolve/main/resnet50-v1-12.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/resnet50-v1-12.onnx',
      local: 'models/resnet50-v1-12.onnx'
    },
    format: 'onnx',
    datatype: 'fp32',
    inputs: {
      value: 'img224',
      batch: { "N": 1 }
    }
  },
  {
    category: 'Image Classification',
    id: 'resnet50_v2',
    name: 'ResNet50 v2',
    url:
    {
      source: 'https://github.com/onnx/models/raw/main/vision/classification/resnet/model/resnet50-v2-7.onnx',
      github: 'https://ibelem.github.io/onnxruntime-web-dist/models/resnet50-v2-7.onnx',
      hf: 'https://huggingface.co/webml/models/resolve/main/resnet50-v2-7.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/resnet50-v2-7.onnx',
      local: 'models/resnet50-v2-7.onnx'
    },
    format: 'onnx',
    datatype: 'fp32',
    inputs: {
      value: 'img224',
      batch: { "N": 1 }
    }
  },
  {
    category: 'Image Classification',
    id: 'squeezenet',
    name: 'SqueezeNet 1.1',
    url:
    {
      source: 'https://github.com/onnx/models/raw/main/vision/classification/squeezenet/model/squeezenet1.1-7.onnx',
      github: 'https://ibelem.github.io/onnxruntime-web-dist/models/squeezenet1.1-7.onnx',
      hf: 'https://huggingface.co/webml/models/resolve/main/squeezenet1.1-7.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/squeezenet1.1-7.onnx',
      local: 'models/squeezenet1.1-7.onnx'
    },
    format: 'onnx',
    datatype: 'fp32',
    inputs: {
      value: 'img224',
      batch: {}
    }
  },
  {
    category: 'Semantic Segmentation',
    id: 'deeplab_v3',
    name: 'DeepLab v3',
    url:
    {
      source: 'https://huggingface.co/Xenova/deeplabv3-mobilevit-small/blob/main/onnx/model.onnx',
      github: '',
      hf: 'https://huggingface.co/webml/models/resolve/main/deeplabv3-mobilevit-small.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/deeplabv3-mobilevit-small.onnx',
      local: 'models/deeplabv3-mobilevit-small.onnx'
    },
    format: 'onnx',
    datatype: 'fp32',
    inputs: {
      value: { 'pixel_values': ['float32', 'random', [1, 3, 512, 512]] },
      batch: { "batch_size": 1 }
    }
  },
  {
    category: 'Object Detection',
    id: 'tinyyolo_v2',
    name: 'Tiny YOLO v2',
    url:
    {
      source: 'https://github.com/onnx/models/raw/main/vision/object_detection_segmentation/tiny-yolov2/model/tinyyolov2-8.onnx',
      github: 'https://ibelem.github.io/onnxruntime-web-dist/models/tinyyolov2-8.onnx',
      hf: 'https://huggingface.co/webml/models/resolve/main/tinyyolov2-8.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/tinyyolov2-8.onnx',
      local: 'models/tinyyolov2-8.onnx'
    },
    format: 'onnx',
    datatype: 'fp32',
    inputs: {
      value: { 'image': ['float32', 'random', [1, 3, 416, 416]] },
      batch: { "None": 1 }
    }
  },
  {
    category: 'Face Analysis',
    id: 'emotion_ferplus',
    name: 'Emotion FERPlus',
    url:
    {
      source: 'https://github.com/onnx/models/raw/main/vision/body_analysis/emotion_ferplus/model/emotion-ferplus-8.onnx',
      github: 'https://ibelem.github.io/onnxruntime-web-dist/models/emotion-ferplus-8.onnx',
      hf: 'https://huggingface.co/webml/models/resolve/main/emotion-ferplus-8.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/emotion-ferplus-8.onnx',
      local: 'models/emotion-ferplus-8.onnx'
    },
    format: 'onnx',
    datatype: 'fp32',
    inputs: {
      value: { 'Input3': ['float32', 'random', [1, 1, 64, 64]] },
      batch: {}
    }
  },
  {
    category: 'Semantic Segmentation',
    id: 'segment_anything_decoder',
    name: 'Segment Anything Decoder',
    url: {
      source: '',
      github: '',
      hf: '',
      local: ''
    },
    format: 'onnx',
    datatype: 'fp16',
    inputs: {
      value: '',
      batch: {}
    }
  },
  {
    category: 'Semantic Segmentation',
    id: 'segment_anything_encoder',
    name: 'Segment Anything Encoder',
    url: {
      source: '',
      github: '',
      hf: '',
      local: ''
    },
    format: 'onnx',
    datatype: 'fp16',
    inputs: {
      value: '',
      batch: {}
    }
  },
  {
    category: 'Semantic Segmentation',
    id: 'selfie_segmentation_general',
    name: 'Selfie Segmentation (General)',
    url:
    {
      source: 'https://storage.googleapis.com/mediapipe-assets/selfie_segmentation.tflite',
      github: 'https://ibelem.github.io/onnxruntime-web-dist/models/selfie_segmentation.tflite',
      hf: 'https://huggingface.co/webml/models/resolve/main/selfie_segmentation.tflite',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/selfie_segmentation.tflite',
      local: 'models/selfie_segmentation.tflite'
    },
    format: 'tflite',
    datatype: 'fp32',
    inputs: {
      value: '',
      batch: {}
    }
  },
  {
    category: 'Style Transfer',
    id: 'fns_candy',
    name: 'FNS Candy',
    url:
    {
      source: 'https://github.com/microsoft/Windows-Machine-Learning/raw/master/Samples/CustomTensorization/CustomTensorization/fns-candy.onnx',
      github: 'https://ibelem.github.io/onnxruntime-web-dist/models/fns-candy.onnx',
      hf: 'https://huggingface.co/webml/models/resolve/main/fns-candy.onnx',
      cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/fns-candy.onnx',
      local: 'models/fns-candy.onnx'
    },
    format: 'onnx',
    datatype: 'fp32',
    inputs: {
      value: { 'inputImage': ['float32', 'random', [1, 3, 720, 720]] },
      batch: { 'None': 1 }
    }
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