import { MODEL_CATEGORIES } from './constants.js';

const albertTFLite = () => {
  const configs = [
    ['fp32', 'albert_lite_base_squadv1_v1.tflite', '42.7 MB'],
    // Future datatypes can be added here when available:
    // ['fp16', 'albert_lite_base_squadv1_v1_fp16.tflite', '21.4 MB'],
    // ['int8', 'albert_lite_base_squadv1_v1_int8.tflite', '10.7 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.FILL_MASK,
    tag: '',
    id: `albert_tflite_${dt}`,
    name: 'ALBERT',
    description: 'ALBERT: A Lite BERT for Self-supervised Learning of Language Representations',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/albert/tfLite',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically',
  }));
};

const deepLabV3TFLite = () => {
  const configs = [
    ['fp32', 'deeplab_v3.tflite', '2.65 MB'],
    // ['fp16', 'deeplab_v3_fp16.tflite', '1.33 MB'],
    // ['int8', 'deeplab_v3_int8.tflite', '0.67 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_SEGMENTATION,
    tag: '',
    id: `deeplab_v3_tflite_${dt}`,
    name: 'DeepLab v3',
    description: 'DeepLab is a state-of-art deep learning model for semantic image segmentation',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/deeplabv3/tfLite/default',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientdetLite4DetectionTFLite = () => {
  const configs = [
    ['int8', 'efficientdet_lite4_detection_default_v2.tflite', '19.8 MB'],
    // ['fp32', 'efficientdet_lite4_detection_default_v2_fp32.tflite', '78 MB'],
    // ['fp16', 'efficientdet_lite4_detection_default_v2_fp16.tflite', '39 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.OBJECT_DETECTION,
    tag: '',
    id: `efficientdet_lite4_detection_tflite_${dt}`,
    name: 'Efficientdet Lite4 Detection',
    description: 'EfficientDet object detection model (SSD with EfficientNet-b0 + BiFPN feature extractor, shared box predictor and focal loss), trained on COCO 2017 dataset.',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/efficientdet/tfLite/lite4-detection-default',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientNetLite4V2TFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_lite4_v2.tflite', '49.4 MB'],
    // ['fp16', 'efficientnet_lite4_v2_fp16.tflite', '24.7 MB'],
    // ['int8', 'efficientnet_lite4_v2_int8.tflite', '12.4 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_lite4_v2_tflite_${dt}`,
    name: 'EfficientNet Lite4 v2',
    description: 'Imagenet (ILSVRC-2012-CLS) classification with EfficientNet-B0.',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/efficientnet/tfLite/lite4-fp32',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientViTL2SegTFLite = () => {
  const configs = [
    ['fp32', 'efficientvit_seg_l2_ade20k_r512x512.tflite', '196 MB'],
    // ['fp16', 'efficientvit_seg_l2_ade20k_r512x512_fp16.tflite', '98 MB'],
    // ['int8', 'efficientvit_seg_l2_ade20k_r512x512_int8.tflite', '49 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_SEGMENTATION,
    tag: '',
    id: `efficient_vit_l2_seg_tflite_${dt}`,
    name: 'EfficientViT L2 Seg',
    description: 'EfficientViT is a machine learning model that can segment images from the Cityscape dataset.',
    note: '',
    source: 'https://github.com/google-ai-edge/LiteRT/tree/main/litert/js/demos/efficientvit_segmentation',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const ESRGANTFLite = () => {
  const configs = [
    ['fp32', 'esrgan-v1.tflite', '4.76 MB'],
    // ['fp16', 'esrgan-v1_fp16.tflite', '2.38 MB'],
    // ['int8', 'esrgan-v1_int8.tflite', '1.19 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_TO_IMAGE,
    tag: '',
    id: `esrgan_tf2_tflite_${dt}`,
    name: 'ESRGAN',
    description: 'Enhanced Super Resolution GAN for image super resolution. ',
    note: '',
    source: 'https://www.kaggle.com/models/kaggle/esrgan-tf2/tfLite',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const inceptionV4TFLite = () => {
  const configs = [
    ['fp32', 'inception_v4.tflite', '162 MB'],
    // ['fp16', 'inception_v4_fp16.tflite', '81 MB'],
    // ['int8', 'inception_v4_int8.tflite', '41 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `inception_v4_tflite_${dt}`,
    name: 'Inception v4',
    description: 'Inception v4 is a neural network architecture for image classification',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/inception/tfLite/v4',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mediaPipeSelfieSegmentationTFLite = () => {
  const configs = [
    ['fp32', 'MediaPipe-Selfie-Segmentation.tflite', '447 KB'],
    // ['fp16', 'MediaPipe-Selfie-Segmentation_fp16.tflite', '224 KB'],
    // ['int8', 'MediaPipe-Selfie-Segmentation_int8.tflite', '112 KB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_SEGMENTATION,
    tag: '',
    id: `mediapipe_selfie_segmentation_tflite_${dt}`,
    name: 'MediaPipe Selfie Segmentation 256x256',
    description: 'MediaPipe-Selfie-Segmentation: Optimized for Mobile Deployment. Segments the person from background in a selfie image and realtime background segmentation in video conferencing',
    note: '',
    source: 'https://huggingface.co/qualcomm/MediaPipe-Selfie-Segmentation/tree/main',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mobileBertTFLite = () => {
  const configs = [
    ['fp32', 'mobilebert.tflite', '94.2 MB'],
    // ['fp16', 'mobilebert_fp16.tflite', '47.1 MB'],
    // ['int8', 'mobilebert_int8.tflite', '23.6 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.FILL_MASK,
    tag: '',
    id: `mobilebert_tflite_${dt}`,
    name: 'MobileBert',
    description: 'MobileBert trained on Squad 1.1 in fp32.',
    note: '',
    source: 'https://www.kaggle.com/models/iree/mobilebert/tfLite/fp32',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mobileBertQatTFLite = () => {
  const configs = [
    ['int8', 'mobilebert_xs_qat_lite_v1.tflite', '33.8 MB'],
    // ['fp32', 'mobilebert_xs_qat_lite_v1_fp32.tflite', '135 MB'],
    // ['fp16', 'mobilebert_xs_qat_lite_v1_fp16.tflite', '67.5 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.FILL_MASK,
    tag: '',
    id: `mobilebert_qat_tflite_${dt}`,
    name: 'MobileBert QAT',
    description: 'MobileBert-QAT is a language model that trained for SQuAD task.',
    note: '',
    source: 'https://www.kaggle.com/models/google/mobilebert/tfLite',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mobileNetV2TFLite = () => {
  const configs = [
    ['fp32', 'torchvision_mobilenet_v2.tflite', '13.3 MB'],
    // ['fp16', 'torchvision_mobilenet_v2_fp16.tflite', '6.7 MB'],
    // ['int8', 'torchvision_mobilenet_v2_int8.tflite', '3.4 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `mobilenet_v2_tflite_${dt}`,
    name: 'MobileNet v2',
    description: 'An implementation of the MobileNetV2 architecture within the PyTorch ecosystem',
    note: '',
    source: 'https://github.com/google-ai-edge/LiteRT/tree/main/litert/js/demos/mobilenetv2',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mobileNetV3SmallTFLite = () => {
  const configs = [
    ['fp32', 'mobilenet_v3_small_100_224_v1.tflite', '9.73 MB'],
    // ['fp16', 'mobilenet_v3_small_100_224_v1_fp16.tflite', '4.87 MB'],
    // ['int8', 'mobilenet_v3_small_100_224_v1_int8.tflite', '2.44 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `mobilenet_v3_small_100_224_tflite_${dt}`,
    name: 'MobileNet v3',
    description: 'Imagenet (ILSVRC-2012-CLS) classification with MobileNet V3 large (depth multiplier 0.75).',
    note: '',
    source: 'https://www.kaggle.com/models/google/mobilenet-v3/tfLite/small-100-224-classification',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const moViNetTFLite = () => {
  const configs = [
    ['fp16', 'movinet_a0_stream_kinetics_600_classification_v2.tflite', '7.62 MB'],
    // ['fp32', 'movinet_a0_stream_kinetics_600_classification_v2_fp32.tflite', '15.2 MB'],
    // ['int8', 'movinet_a0_stream_kinetics_600_classification_v2_int8.tflite', '3.8 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.VIDEO_CLASSIFICATION,
    tag: '',
    id: `movinet_tflite_${dt}`,
    name: 'MoViNet',
    description: 'MoViNets (Mobile Video Networks) provide a family of efficient video classification models, supporting inference on streaming video',
    note: '',
    source: 'https://www.kaggle.com/models/google/movinet/tfLite/a0-stream-kinetics-600-classification-tflite-float16',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const resNetV2TFLite = () => {
  const configs = [
    ['fp32', 'resnet_v2_101.tflite', '170 MB'],
    // ['fp16', 'resnet_v2_101_fp16.tflite', '85 MB'],
    // ['int8', 'resnet_v2_101_int8.tflite', '43 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `resnet_v2_tflite_${dt}`,
    name: 'ResNet v2',
    description: 'ResNet v2 is a family of network architectures for image classification with a variable number of layers.',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/resnet-v2',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const squeezeNetTFLite = () => {
  const configs = [
    ['fp32', 'squeezenet.tflite', '4.77 MB'],
    // ['fp16', 'squeezenet_fp16.tflite', '2.39 MB'],
    // ['int8', 'squeezenet_int8.tflite', '1.2 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `squeezenet_tflite_${dt}`,
    name: 'SqueezeNet',
    description: 'SqueezeNet is a neural network architecture for image classification',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/squeezenet',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const ssdMobilenetV2TFLite = () => {
  const configs = [
    ['fp32', 'ssd_mobilenet_v2_100.tflite', '17.1 MB'],
    // ['fp16', 'ssd_mobilenet_v2_100_fp16.tflite', '8.6 MB'],
    // ['int8', 'ssd_mobilenet_v2_100_int8.tflite', '4.3 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.OBJECT_DETECTION,
    tag: '',
    id: `ssd_mobilenet_v2_tflite_${dt}`,
    name: 'SSD MobileNet v2',
    description: 'Mobilenet V2 with SSDLite head trained on COCO 2017, in fp32.',
    note: '',
    source: 'https://www.kaggle.com/models/iree/ssd-mobilenet-v2',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const yoloV5TFLite = () => {
  const configs = [
    ['fp32', 'yolo_v5_v1.tflite', '7.25 MB'],
    // ['fp16', 'yolo_v5_v1_fp16.tflite', '3.63 MB'],
    // ['int8', 'yolo_v5_v1_int8.tflite', '1.82 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.OBJECT_DETECTION,
    tag: '',
    id: `yolo_v5_tflite_${dt}`,
    name: 'YOLO v5',
    description: 'YOLOv5 (https://docs.ultralytics.com/) is a family of object detection architectures and models pretrained on the COCO dataset',
    note: '',
    source: 'https://www.kaggle.com/models/kaggle/yolo-v5',
    hf: {
      model: '',
      file: ''
    },
    model: `tflite/${dt}/${file}`,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

// Export TFLite models
export const tfliteModels = [
  ...albertTFLite(),
  ...deepLabV3TFLite(),
  // ...efficientdetLite4DetectionTFLite(),
  ...efficientNetLite4V2TFLite(),
  ...efficientViTL2SegTFLite(),
  ...ESRGANTFLite(),
  ...inceptionV4TFLite(),
  ...mediaPipeSelfieSegmentationTFLite(),
  ...mobileBertTFLite(),
  // ...mobileBertQatTFLite(),
  ...mobileNetV2TFLite(),
  ...mobileNetV3SmallTFLite(),
  // ...moViNetTFLite(),
  ...resNetV2TFLite(),
  ...squeezeNetTFLite(),
  ...ssdMobilenetV2TFLite(),
  ...yoloV5TFLite()
  // Add more TFLite models here
];