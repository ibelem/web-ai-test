import { MODEL_CATEGORIES } from './constants.js';

const albertTFLite = () => {
  return [{
    category: MODEL_CATEGORIES.FILL_MASK,
    tag: '',
    id: 'albert_tflite_fp32',
    name: 'ALBERT',
    description: 'ALBERT: A Lite BERT for Self-supervised Learning of Language Representations',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/albert/tfLite',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/albert_lite_base_squadv1_v1.tflite',
    size: '42.7 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically',
  }];
};

const deepLabV3TFLite = () => {
  return [{
    category: MODEL_CATEGORIES.IMAGE_SEGMENTATION,
    tag: '',
    id: 'deeplab_v3_tflite_fp32',
    name: 'DeepLab v3',
    description: 'DeepLab is a state-of-art deep learning model for semantic image segmentation',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/deeplabv3/tfLite/default',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/deeplab_v3.tflite',
    size: '2.65 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const efficientdetLite4DetectionTFLite = () => {
  return [{
    category: MODEL_CATEGORIES.OBJECT_DETECTION,
    tag: '',
    id: 'efficientdet_lite4_detection_tflite_fp32',
    name: 'Efficientdet Lite4 Detection',
    description: 'EfficientDet object detection model (SSD with EfficientNet-b0 + BiFPN feature extractor, shared box predictor and focal loss), trained on COCO 2017 dataset.',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/efficientdet/tfLite/lite4-detection-default',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/int8/efficientdet_lite4_detection_default_v2.tflite',
    size: '19.8 MB',
    format: 'tflite',
    datatype: 'int8',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const efficientNetLite4V2TFLite = () => {
  return [{
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: 'efficientnet_lite4_v2_tflite_fp32',
    name: 'EfficientNet Lite4 v2',
    description: 'Imagenet (ILSVRC-2012-CLS) classification with EfficientNet-B0.',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/efficientnet/tfLite/lite4-fp32',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/efficientnet_lite4_v2.tflite',
    size: '49.4 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const efficientViTL2SegTFLite = () => {
  return [{
    category: MODEL_CATEGORIES.IMAGE_SEGMENTATION,
    tag: '',
    id: 'efficient_vit_l2_seg_tflite_fp32',
    name: 'EfficientViT L2 Seg',
    description: 'EfficientViT is a machine learning model that can segment images from the Cityscape dataset.',
    note: '',
    source: 'https://github.com/google-ai-edge/LiteRT/tree/main/litert/js/demos/efficientvit_segmentation',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/efficientvit_seg_l2_ade20k_r512x512.tflite',
    size: '196 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const ESRGANTFLite = () => {
  return [{
    category: MODEL_CATEGORIES.IMAGE_TO_IMAGE,
    tag: '',
    id: 'esrgan_tf2_tflite_fp32',
    name: 'ESRGAN',
    description: 'Enhanced Super Resolution GAN for image super resolution. ',
    note: '',
    source: 'https://www.kaggle.com/models/kaggle/esrgan-tf2/tfLite',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/esrgan-v1.tflite',
    size: '4.76 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const inceptionV4TFLite = () => {
  return [{
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: 'inception_v4_tflite_fp32',
    name: 'Inception v4',
    description: 'Inception v4 is a neural network architecture for image classification',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/inception/tfLite/v4',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/inception_v4.tflite',
    size: '162 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const mediaPipeSelfieSegmentationTFLite = () => {
  return [{
    category: MODEL_CATEGORIES.IMAGE_SEGMENTATION,
    tag: '',
    id: 'mediapipe_selfie_segmentation_tflite_fp32',
    name: 'MediaPipe Selfie Segmentation 256x256',
    description: 'MediaPipe-Selfie-Segmentation: Optimized for Mobile Deployment. Segments the person from background in a selfie image and realtime background segmentation in video conferencing',
    note: '',
    source: 'https://huggingface.co/qualcomm/MediaPipe-Selfie-Segmentation/tree/main',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/MediaPipe-Selfie-Segmentation.tflite',
    size: '447 KB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const mobileBertTFLite = () => {
  return [{
    category: MODEL_CATEGORIES.FILL_MASK,
    tag: '',
    id: 'mobilebert_tflite_fp32',
    name: 'MobileBert',
    description: 'MobileBert trained on Squad 1.1 in fp32.',
    note: '',
    source: 'https://www.kaggle.com/models/iree/mobilebert/tfLite/fp32',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/mobilebert.tflite',
    size: '94.2 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const mobileBertQatTFLite = () => {
  return [{
    category: MODEL_CATEGORIES.FILL_MASK,
    tag: '',
    id: 'mobilebert_qat_tflite_int8',
    name: 'MobileBert QAT',
    description: 'MobileBert-QAT is a language model that trained for SQuAD task.',
    note: '',
    source: 'https://www.kaggle.com/models/google/mobilebert/tfLite',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/int8/mobilebert_xs_qat_lite_v1.tflite',
    size: '33.8 MB',
    format: 'tflite',
    datatype: 'int8',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const mobileNetV2TFLite = () => {
  return [{
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: 'mobilenet_v2_tflite_fp32',
    name: 'MobileNet v2',
    description: 'An implementation of the MobileNetV2 architecture within the PyTorch ecosystem',
    note: '',
    source: 'https://github.com/google-ai-edge/LiteRT/tree/main/litert/js/demos/mobilenetv2',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/torchvision_mobilenet_v2.tflite',
    size: '13.3 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const mobileNetV3SmallTFLite = () => {
  return [{
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: 'mobilenet_v3_small_100_224_tflite_fp32',
    name: 'MobileNet v3',
    description: 'Imagenet (ILSVRC-2012-CLS) classification with MobileNet V3 large (depth multiplier 0.75).',
    note: '',
    source: 'https://www.kaggle.com/models/google/mobilenet-v3/tfLite/small-100-224-classification',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/mobilenet_v3_small_100_224_v1.tflite',
    size: '9.73 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const moViNetTFLite = () => {
  return [{
    category: MODEL_CATEGORIES.VIDEO_CLASSIFICATION,
    tag: '',
    id: 'movinet_tflite_fp16',
    name: 'MoViNet',
    description: 'MoViNets (Mobile Video Networks) provide a family of efficient video classification models, supporting inference on streaming video',
    note: '',
    source: 'https://www.kaggle.com/models/google/movinet/tfLite/a0-stream-kinetics-600-classification-tflite-float16',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp16/movinet_a0_stream_kinetics_600_classification_v2.tflite',
    size: '7.62 MB',
    format: 'tflite',
    datatype: 'fp16',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const resNetV2TFLite = () => {
  return [{
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: 'resnet_v2_tflite_fp32',
    name: 'ResNet v2',
    description: 'ResNet v2 is a family of network architectures for image classification with a variable number of layers.',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/resnet-v2',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/resnet_v2_101.tflite',
    size: '170 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const squeezeNetTFLite = () => {
  return [{
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: 'squeezenet_tflite_fp32',
    name: 'SqueezeNet',
    description: 'SqueezeNet is a neural network architecture for image classification',
    note: '',
    source: 'https://www.kaggle.com/models/tensorflow/squeezenet',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/squeezenet.tflite',
    size: '4.77 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const ssdMobilenetV2TFLite = () => {
  return [{
    category: MODEL_CATEGORIES.OBJECT_DETECTION,
    tag: '',
    id: 'ssd_mobilenet_v2_tflite_fp32',
    name: 'SSD MobileNet v2',
    description: 'Mobilenet V2 with SSDLite head trained on COCO 2017, in fp32.',
    note: '',
    source: 'https://www.kaggle.com/models/iree/ssd-mobilenet-v2',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/ssd_mobilenet_v2_100.tflite',
    size: '17.1 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
};

const yoloV5TFLite = () => {
  return [{
    category: MODEL_CATEGORIES.OBJECT_DETECTION,
    tag: '',
    id: 'yolo_v5_tflite_fp32',
    name: 'YOLO v5',
    description: 'YOLOv5 (https://docs.ultralytics.com/) is a family of object detection architectures and models pretrained on the COCO dataset',
    note: '',
    source: 'https://www.kaggle.com/models/kaggle/yolo-v5',
    hf: {
      model: '',
      file: ''
    },
    model: 'tflite/fp32/yolo_v5_v1.tflite',
    size: '7.25 MB',
    format: 'tflite',
    datatype: 'fp32',
    inputstip: 'Get inputs from compiled model dynamically'
  }];
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