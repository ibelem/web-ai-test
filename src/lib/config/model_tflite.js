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

const mediaPipeHandDetectionHandLandmarkDetectorTFLite = () => {
  const configs = [
    ['fp32', 'MediaPipe-Hand-Detection_HandLandmarkDetector_float.tflite', '7.69MB'],
    // ['fp16', 'MediaPipe-Hand-Detection_HandLandmarkDetector_fp16.tflite', '224 KB'],
    // ['int8', 'MediaPipe-Hand-Detection_HandLandmarkDetector_int8.tflite', '112 KB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.OBJECT_DETECTION,
    tag: '',
    id: `mediapipe_hand_detection_hand_landmark_detector_tflite_${dt}`,
    name: 'MediaPipe Hand Detection Hand Landmark Detector compute-benchmark',
    description: '',
    note: '',
    source: 'https://huggingface.co/qualcomm/MediaPipe-Hand-Detection/tree/main',
    hf: {
      model: 'webnn/MediaPipe-Hand-Detection',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mediaPipeSelfieSegmentationTFLite = () => {
  const configs = [
    ['fp32', 'MediaPipe-Selfie-Segmentation_float.tflite', '447 KB'],
    // ['fp16', 'MediaPipe-Selfie-Segmentation_fp16.tflite', '224 KB'],
    // ['int8', 'MediaPipe-Selfie-Segmentation_int8.tflite', '112 KB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_SEGMENTATION,
    tag: '',
    id: `mediapipe_selfie_segmentation_tflite_${dt}`,
    name: 'MediaPipe Selfie Segmentation 256x256 compute-benchmark',
    description: 'MediaPipe-Selfie-Segmentation: Optimized for Mobile Deployment. Segments the person from background in a selfie image and realtime background segmentation in video conferencing',
    note: '',
    source: 'https://huggingface.co/qualcomm/MediaPipe-Selfie-Segmentation/tree/main',
    hf: {
      model: 'webnn/MediaPipe-Selfie-Segmentation',
      file: `${file}`
    },
    model: ``,
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
    ['fp32', 'MobileNet-v3-Small_float.tflite', '9.71 MB'],
    // ['fp16', 'MobileNet-v3-Small_fp16.tflite', '4.87 MB'],
    // ['int8', 'MobileNet-v3-Small_int8.tflite', '2.44 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `mobilenet_v3_small_tflite_${dt}`,
    name: 'MobileNet v3 Small compute-benchmark',
    description: 'Imagenet (ILSVRC-2012-CLS) classification with MobileNet V3 large (depth multiplier 0.75).',
    note: '',
    source: 'https://github.com/GoogleChrome/webai-compute-benchmark/blob/main/resources/litert-js/src/download-models.mjs',
    hf: {
      model: 'webnn/MobileNet-v3-Small',
      file: `${file}`
    },
    model: ``,
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

// --- litert-community Image Classification Models (from HuggingFace) ---

const alexNetTFLite = () => {
  const configs = [
    ['fp32', 'alexnet.tflite', '233.1 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `alexnet_tflite_${dt}`,
    name: 'AlexNet',
    description: 'AlexNet is a convolutional neural network pre-trained on the ImageNet-1k dataset.',
    note: '',
    source: 'https://huggingface.co/litert-community/alexnet',
    hf: {
      model: 'litert-community/alexnet',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const beitBasePatch16_224TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '333.8 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `beit_base_patch16_224_tflite_${dt}`,
    name: 'BEiT Base Patch16 224',
    description: 'BEiT (Bidirectional Encoder representation from Image Transformers) pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/beit_base_patch16_224',
    hf: {
      model: 'litert-community/beit_base_patch16_224',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const caformerS18TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '100.7 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `caformer_s18_tflite_${dt}`,
    name: 'CAFormer S18',
    description: 'CAFormer S18 image classification model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/caformer_s18',
    hf: {
      model: 'litert-community/caformer_s18',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const caitXxs24_224TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '45.9 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `cait_xxs24_224_tflite_${dt}`,
    name: 'CaiT XXS24 224',
    description: 'CaiT (Class-Attention in Image Transformers) XXS24 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/cait_xxs24_224',
    hf: {
      model: 'litert-community/cait_xxs24_224',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const coatLiteTinyTFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '22.0 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `coat_lite_tiny_tflite_${dt}`,
    name: 'CoaT Lite Tiny',
    description: 'CoaT (Co-Scale Conv-Attentional Image Transformers) Lite Tiny model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/coat_lite_tiny',
    hf: {
      model: 'litert-community/coat_lite_tiny',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const convnextBaseTFLite = () => {
  const configs = [
    ['fp32', 'convnext_base.tflite', '338.2 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `convnext_base_tflite_${dt}`,
    name: 'ConvNeXt Base',
    description: 'ConvNeXt Base model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/convnext_base',
    hf: {
      model: 'litert-community/convnext_base',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const convnextLargeTFLite = () => {
  const configs = [
    ['fp32', 'convnext_large.tflite', '754.6 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `convnext_large_tflite_${dt}`,
    name: 'ConvNeXt Large',
    description: 'ConvNeXt Large model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/convnext_large',
    hf: {
      model: 'litert-community/convnext_large',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const convnextSmallTFLite = () => {
  const configs = [
    ['fp32', 'convnext_small.tflite', '191.9 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `convnext_small_tflite_${dt}`,
    name: 'ConvNeXt Small',
    description: 'ConvNeXt Small model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/convnext_small',
    hf: {
      model: 'litert-community/convnext_small',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const convnextTinyTFLite = () => {
  const configs = [
    ['fp32', 'convnext_tiny.tflite', '109.1 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `convnext_tiny_tflite_${dt}`,
    name: 'ConvNeXt Tiny',
    description: 'ConvNeXt Tiny model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/convnext_tiny',
    hf: {
      model: 'litert-community/convnext_tiny',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const deit3SmallPatch16_224TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '84.3 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `deit3_small_patch16_224_tflite_${dt}`,
    name: 'DeiT3 Small Patch16 224',
    description: 'DeiT III Small model with patch size 16 and resolution 224, pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/deit3_small_patch16_224',
    hf: {
      model: 'litert-community/deit3_small_patch16_224',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const deitTinyPatch16_224TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '21.9 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `deit_tiny_patch16_224_tflite_${dt}`,
    name: 'DeiT Tiny Patch16 224',
    description: 'DeiT (Data-efficient Image Transformers) Tiny model with patch size 16 and resolution 224.',
    note: '',
    source: 'https://huggingface.co/litert-community/deit_tiny_patch16_224',
    hf: {
      model: 'litert-community/deit_tiny_patch16_224',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const densenet121TFLite = () => {
  const configs = [
    ['fp32', 'densenet121.tflite', '30.5 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `densenet121_tflite_${dt}`,
    name: 'DenseNet 121',
    description: 'DenseNet-121 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/densenet121',
    hf: {
      model: 'litert-community/densenet121',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetB0LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_b0.tflite', '20.3 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_b0_litert_tflite_${dt}`,
    name: 'EfficientNet B0',
    description: 'EfficientNet B0 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_b0',
    hf: {
      model: 'litert-community/efficientnet_b0',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetB1LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_b1.tflite', '30.0 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_b1_litert_tflite_${dt}`,
    name: 'EfficientNet B1',
    description: 'EfficientNet B1 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_b1',
    hf: {
      model: 'litert-community/efficientnet_b1',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetB2LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_b2.tflite', '35.0 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_b2_litert_tflite_${dt}`,
    name: 'EfficientNet B2',
    description: 'EfficientNet B2 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_b2',
    hf: {
      model: 'litert-community/efficientnet_b2',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetB3LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_b3.tflite', '46.9 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_b3_litert_tflite_${dt}`,
    name: 'EfficientNet B3',
    description: 'EfficientNet B3 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_b3',
    hf: {
      model: 'litert-community/efficientnet_b3',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetB4LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_b4.tflite', '74.0 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_b4_litert_tflite_${dt}`,
    name: 'EfficientNet B4',
    description: 'EfficientNet B4 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_b4',
    hf: {
      model: 'litert-community/efficientnet_b4',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetB5LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_b5.tflite', '116.2 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_b5_litert_tflite_${dt}`,
    name: 'EfficientNet B5',
    description: 'EfficientNet B5 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_b5',
    hf: {
      model: 'litert-community/efficientnet_b5',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetB6LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_b6.tflite', '164.4 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_b6_litert_tflite_${dt}`,
    name: 'EfficientNet B6',
    description: 'EfficientNet B6 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_b6',
    hf: {
      model: 'litert-community/efficientnet_b6',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetB7LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_b7.tflite', '253.3 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_b7_litert_tflite_${dt}`,
    name: 'EfficientNet B7',
    description: 'EfficientNet B7 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_b7',
    hf: {
      model: 'litert-community/efficientnet_b7',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetV2LTFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_v2_l.tflite', '452.2 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_v2_l_tflite_${dt}`,
    name: 'EfficientNet V2 L',
    description: 'EfficientNetV2 Large model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_v2_l',
    hf: {
      model: 'litert-community/efficientnet_v2_l',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetV2MTFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_v2_m.tflite', '206.7 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_v2_m_tflite_${dt}`,
    name: 'EfficientNet V2 M',
    description: 'EfficientNetV2 Medium model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_v2_m',
    hf: {
      model: 'litert-community/efficientnet_v2_m',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const efficientnetV2STFLite = () => {
  const configs = [
    ['fp32', 'efficientnet_v2_s.tflite', '82.1 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `efficientnet_v2_s_tflite_${dt}`,
    name: 'EfficientNet V2 S',
    description: 'EfficientNetV2 Small model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/efficientnet_v2_s',
    hf: {
      model: 'litert-community/efficientnet_v2_s',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const googleNetTFLite = () => {
  const configs = [
    ['fp32', 'googlenet.tflite', '25.3 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `googlenet_tflite_${dt}`,
    name: 'GoogLeNet',
    description: 'GoogLeNet (Inception v1) model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/googlenet',
    hf: {
      model: 'litert-community/googlenet',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const inceptionV3LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'inception_v3.tflite', '91.1 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `inception_v3_litert_tflite_${dt}`,
    name: 'Inception v3',
    description: 'Inception v3 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/inception_v3',
    hf: {
      model: 'litert-community/inception_v3',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mnasnet1_0TFLite = () => {
  const configs = [
    ['fp32', 'mnasnet1_0.tflite', '16.7 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `mnasnet1_0_tflite_${dt}`,
    name: 'MNASNet 1.0',
    description: 'MNASNet 1.0 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/mnasnet1_0',
    hf: {
      model: 'litert-community/mnasnet1_0',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mobileNetV2LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'mobilenet_v2.tflite', '13.4 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `mobilenet_v2_litert_tflite_${dt}`,
    name: 'MobileNet v2 (litert-community)',
    description: 'MobileNetV2 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/MobileNet-v2',
    hf: {
      model: 'litert-community/MobileNet-v2',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mobileNetV3LargeLiteRTTFLite = () => {
  const configs = [
    ['fp32', 'mobilenet_v3_large.tflite', '20.9 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `mobilenet_v3_large_litert_tflite_${dt}`,
    name: 'MobileNet v3 Large',
    description: 'MobileNetV3 Large model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/MobileNet-v3-large',
    hf: {
      model: 'litert-community/MobileNet-v3-large',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mobileNetV3SmallLiteRTTFLite = () => {
  const configs = [
    ['fp32', 'mobilenet_v3_small.tflite', '9.7 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `mobilenet_v3_small_litert_tflite_${dt}`,
    name: 'MobileNet v3 Small (litert-community)',
    description: 'MobileNetV3 Small model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/MobileNet-v3-small',
    hf: {
      model: 'litert-community/MobileNet-v3-small',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const mobileViTV2_100TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '18.8 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `mobilevitv2_100_tflite_${dt}`,
    name: 'MobileViT V2 1.0',
    description: 'MobileViT V2 1.0 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/mobilevitv2_100',
    hf: {
      model: 'litert-community/mobilevitv2_100',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const pvtV2B0TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '14.1 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `pvt_v2_b0_tflite_${dt}`,
    name: 'PVT V2 B0',
    description: 'Pyramid Vision Transformer V2 B0 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/pvt_v2_b0',
    hf: {
      model: 'litert-community/pvt_v2_b0',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const pvtV2B1TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '53.6 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `pvt_v2_b1_tflite_${dt}`,
    name: 'PVT V2 B1',
    description: 'Pyramid Vision Transformer V2 B1 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/pvt_v2_b1',
    hf: {
      model: 'litert-community/pvt_v2_b1',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const regnetY400MFTFLite = () => {
  const configs = [
    ['fp32', 'regnet_y_400mf.tflite', '17.2 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `regnet_y_400mf_tflite_${dt}`,
    name: 'RegNet Y 400MF',
    description: 'RegNet Y 400MF model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/regnet_y_400mf',
    hf: {
      model: 'litert-community/regnet_y_400mf',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const resnet18TFLite = () => {
  const configs = [
    ['fp32', 'resnet18.tflite', '44.6 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `resnet18_tflite_${dt}`,
    name: 'ResNet 18',
    description: 'ResNet-18 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/resnet18',
    hf: {
      model: 'litert-community/resnet18',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const resnet34TFLite = () => {
  const configs = [
    ['fp32', 'resnet34.tflite', '83.1 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `resnet34_tflite_${dt}`,
    name: 'ResNet 34',
    description: 'ResNet-34 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/resnet34',
    hf: {
      model: 'litert-community/resnet34',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const resnet50LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'resnet50.tflite', '97.4 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `resnet50_litert_tflite_${dt}`,
    name: 'ResNet 50',
    description: 'ResNet-50 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/resnet50',
    hf: {
      model: 'litert-community/resnet50',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const resnet101TFLite = () => {
  const configs = [
    ['fp32', 'resnet101.tflite', '169.8 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `resnet101_tflite_${dt}`,
    name: 'ResNet 101',
    description: 'ResNet-101 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/resnet101',
    hf: {
      model: 'litert-community/resnet101',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const resnet152TFLite = () => {
  const configs = [
    ['fp32', 'resnet152.tflite', '229.4 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `resnet152_tflite_${dt}`,
    name: 'ResNet 152',
    description: 'ResNet-152 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/resnet152',
    hf: {
      model: 'litert-community/resnet152',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const resnext50_32x4dTFLite = () => {
  const configs = [
    ['fp32', 'resnext50_32x4d.tflite', '96.1 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `resnext50_32x4d_tflite_${dt}`,
    name: 'ResNeXt 50 32x4d',
    description: 'ResNeXt-50 32x4d model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/resnext50_32x4d',
    hf: {
      model: 'litert-community/resnext50_32x4d',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const shufflenetV2X0_5TFLite = () => {
  const configs = [
    ['fp32', 'shufflenet_v2_x0_5.tflite', '5.4 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `shufflenet_v2_x0_5_tflite_${dt}`,
    name: 'ShuffleNet V2 x0.5',
    description: 'ShuffleNet V2 x0.5 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/shufflenet_v2_x0_5',
    hf: {
      model: 'litert-community/shufflenet_v2_x0_5',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const shufflenetV2X1_0TFLite = () => {
  const configs = [
    ['fp32', 'shufflenet_v2_x1_0.tflite', '8.9 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `shufflenet_v2_x1_0_tflite_${dt}`,
    name: 'ShuffleNet V2 x1.0',
    description: 'ShuffleNet V2 x1.0 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/shufflenet_v2_x1_0',
    hf: {
      model: 'litert-community/shufflenet_v2_x1_0',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const shufflenetV2X1_5TFLite = () => {
  const configs = [
    ['fp32', 'shufflenet_v2_x1_5.tflite', '13.5 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `shufflenet_v2_x1_5_tflite_${dt}`,
    name: 'ShuffleNet V2 x1.5',
    description: 'ShuffleNet V2 x1.5 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/shufflenet_v2_x1_5',
    hf: {
      model: 'litert-community/shufflenet_v2_x1_5',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const shufflenetV2X2_0TFLite = () => {
  const configs = [
    ['fp32', 'shufflenet_v2_x2_0.tflite', '28.3 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `shufflenet_v2_x2_0_tflite_${dt}`,
    name: 'ShuffleNet V2 x2.0',
    description: 'ShuffleNet V2 x2.0 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/shufflenet_v2_x2_0',
    hf: {
      model: 'litert-community/shufflenet_v2_x2_0',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const squeezenet1_0LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'squeezenet1_0.tflite', '4.8 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `squeezenet1_0_litert_tflite_${dt}`,
    name: 'SqueezeNet 1.0',
    description: 'SqueezeNet 1.0 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/squeezenet1_0',
    hf: {
      model: 'litert-community/squeezenet1_0',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const squeezenet1_1LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'squeezenet1_1.tflite', '4.7 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `squeezenet1_1_litert_tflite_${dt}`,
    name: 'SqueezeNet 1.1',
    description: 'SqueezeNet 1.1 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/squeezenet1_1',
    hf: {
      model: 'litert-community/squeezenet1_1',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const swinTinyPatch4Window7_224TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '109.2 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `swin_tiny_patch4_window7_224_tflite_${dt}`,
    name: 'Swin Tiny Patch4 Window7 224',
    description: 'Swin Transformer Tiny model with patch size 4 and window size 7, pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/swin_tiny_patch4_window7_224',
    hf: {
      model: 'litert-community/swin_tiny_patch4_window7_224',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const swinV2TinyWindow8_256TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '110.2 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `swinv2_tiny_window8_256_tflite_${dt}`,
    name: 'Swin V2 Tiny Window8 256',
    description: 'Swin Transformer V2 Tiny model with window size 8 and resolution 256, pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/swinv2_tiny_window8_256',
    hf: {
      model: 'litert-community/swinv2_tiny_window8_256',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vgg11TFLite = () => {
  const configs = [
    ['fp32', 'vgg11.tflite', '506.8 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vgg11_tflite_${dt}`,
    name: 'VGG 11',
    description: 'VGG-11 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vgg11',
    hf: {
      model: 'litert-community/vgg11',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vgg11BnTFLite = () => {
  const configs = [
    ['fp32', 'vgg11_bn.tflite', '506.9 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vgg11_bn_tflite_${dt}`,
    name: 'VGG 11 BN',
    description: 'VGG-11 with Batch Normalization model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vgg11_bn',
    hf: {
      model: 'litert-community/vgg11_bn',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vgg13TFLite = () => {
  const configs = [
    ['fp32', 'vgg13.tflite', '507.6 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vgg13_tflite_${dt}`,
    name: 'VGG 13',
    description: 'VGG-13 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vgg13',
    hf: {
      model: 'litert-community/vgg13',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vgg13BnTFLite = () => {
  const configs = [
    ['fp32', 'vgg13_bn.tflite', '507.6 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vgg13_bn_tflite_${dt}`,
    name: 'VGG 13 BN',
    description: 'VGG-13 with Batch Normalization model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vgg13_bn',
    hf: {
      model: 'litert-community/vgg13_bn',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vgg16LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'vgg16.tflite', '527.8 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vgg16_litert_tflite_${dt}`,
    name: 'VGG 16',
    description: 'VGG-16 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vgg16',
    hf: {
      model: 'litert-community/vgg16',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vgg16BnTFLite = () => {
  const configs = [
    ['fp32', 'vgg16_bn.tflite', '527.8 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vgg16_bn_tflite_${dt}`,
    name: 'VGG 16 BN',
    description: 'VGG-16 with Batch Normalization model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vgg16_bn',
    hf: {
      model: 'litert-community/vgg16_bn',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vgg19LiteRTTFLite = () => {
  const configs = [
    ['fp32', 'vgg19.tflite', '548.1 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vgg19_litert_tflite_${dt}`,
    name: 'VGG 19',
    description: 'VGG-19 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vgg19',
    hf: {
      model: 'litert-community/vgg19',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vgg19BnTFLite = () => {
  const configs = [
    ['fp32', 'vgg19_bn.tflite', '548.1 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vgg19_bn_tflite_${dt}`,
    name: 'VGG 19 BN',
    description: 'VGG-19 with Batch Normalization model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vgg19_bn',
    hf: {
      model: 'litert-community/vgg19_bn',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const visformerSmallTFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '153.7 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `visformer_small_tflite_${dt}`,
    name: 'Visformer Small',
    description: 'Visformer Small model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/visformer_small',
    hf: {
      model: 'litert-community/visformer_small',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vitBasePatch16_224TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '330.3 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vit_base_patch16_224_tflite_${dt}`,
    name: 'ViT Base Patch16 224',
    description: 'Vision Transformer (ViT) Base model with patch size 16 and resolution 224, pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vit_base_patch16_224',
    hf: {
      model: 'litert-community/vit_base_patch16_224',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vitSmallPatch16_224TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '84.2 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vit_small_patch16_224_tflite_${dt}`,
    name: 'ViT Small Patch16 224',
    description: 'Vision Transformer (ViT) Small model with patch size 16 and resolution 224, pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vit_small_patch16_224',
    hf: {
      model: 'litert-community/vit_small_patch16_224',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const vitTinyPatch16_224TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '21.9 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `vit_tiny_patch16_224_tflite_${dt}`,
    name: 'ViT Tiny Patch16 224',
    description: 'Vision Transformer (ViT) Tiny model with patch size 16 and resolution 224, pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/vit_tiny_patch16_224',
    hf: {
      model: 'litert-community/vit_tiny_patch16_224',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const wideResnet50_2TFLite = () => {
  const configs = [
    ['fp32', 'wide_resnet50_2.tflite', '262.7 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `wide_resnet50_2_tflite_${dt}`,
    name: 'Wide ResNet 50-2',
    description: 'Wide ResNet-50-2 model pre-trained on ImageNet-1k.',
    note: '',
    source: 'https://huggingface.co/litert-community/wide_resnet50_2',
    hf: {
      model: 'litert-community/wide_resnet50_2',
      file: `${file}`
    },
    model: ``,
    size: size,
    format: 'tflite',
    datatype: dt,
    inputstip: 'Get inputs from compiled model dynamically'
  }));
};

const xcitTiny24P8_224TFLite = () => {
  const configs = [
    ['fp32', 'model.tflite', '46.6 MB'],
  ];
  return configs.map(([dt, file, size]) => ({
    category: MODEL_CATEGORIES.IMAGE_CLASSIFICATION,
    tag: '',
    id: `xcit_tiny_24_p8_224_tflite_${dt}`,
    name: 'XCiT Tiny 24 P8 224',
    description: 'XCiT (Cross-Covariance Image Transformers) Tiny 24 model with patch size 8 and resolution 224.',
    note: '',
    source: 'https://huggingface.co/litert-community/xcit_tiny_24_p8_224',
    hf: {
      model: 'litert-community/xcit_tiny_24_p8_224',
      file: `${file}`
    },
    model: ``,
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
  ...mediaPipeHandDetectionHandLandmarkDetectorTFLite(),
  ...mediaPipeSelfieSegmentationTFLite(),
  ...mobileBertTFLite(),
  // ...mobileBertQatTFLite(),
  ...mobileNetV2TFLite(),
  ...mobileNetV3SmallTFLite(),
  // ...moViNetTFLite(),
  ...resNetV2TFLite(),
  ...squeezeNetTFLite(),
  ...ssdMobilenetV2TFLite(),
  ...yoloV5TFLite(),
  // litert-community Image Classification Models
  ...alexNetTFLite(),
  ...beitBasePatch16_224TFLite(),
  ...caformerS18TFLite(),
  ...caitXxs24_224TFLite(),
  ...coatLiteTinyTFLite(),
  ...convnextBaseTFLite(),
  ...convnextLargeTFLite(),
  ...convnextSmallTFLite(),
  ...convnextTinyTFLite(),
  ...deit3SmallPatch16_224TFLite(),
  ...deitTinyPatch16_224TFLite(),
  ...densenet121TFLite(),
  ...efficientnetB0LiteRTTFLite(),
  ...efficientnetB1LiteRTTFLite(),
  ...efficientnetB2LiteRTTFLite(),
  ...efficientnetB3LiteRTTFLite(),
  ...efficientnetB4LiteRTTFLite(),
  ...efficientnetB5LiteRTTFLite(),
  ...efficientnetB6LiteRTTFLite(),
  ...efficientnetB7LiteRTTFLite(),
  ...efficientnetV2LTFLite(),
  ...efficientnetV2MTFLite(),
  ...efficientnetV2STFLite(),
  ...googleNetTFLite(),
  ...inceptionV3LiteRTTFLite(),
  ...mnasnet1_0TFLite(),
  ...mobileNetV2LiteRTTFLite(),
  ...mobileNetV3LargeLiteRTTFLite(),
  ...mobileNetV3SmallLiteRTTFLite(),
  ...mobileViTV2_100TFLite(),
  ...pvtV2B0TFLite(),
  ...pvtV2B1TFLite(),
  ...regnetY400MFTFLite(),
  ...resnet18TFLite(),
  ...resnet34TFLite(),
  ...resnet50LiteRTTFLite(),
  ...resnet101TFLite(),
  ...resnet152TFLite(),
  ...resnext50_32x4dTFLite(),
  ...shufflenetV2X0_5TFLite(),
  ...shufflenetV2X1_0TFLite(),
  ...shufflenetV2X1_5TFLite(),
  ...shufflenetV2X2_0TFLite(),
  ...squeezenet1_0LiteRTTFLite(),
  ...squeezenet1_1LiteRTTFLite(),
  ...swinTinyPatch4Window7_224TFLite(),
  ...swinV2TinyWindow8_256TFLite(),
  ...vgg11TFLite(),
  ...vgg11BnTFLite(),
  ...vgg13TFLite(),
  ...vgg13BnTFLite(),
  ...vgg16LiteRTTFLite(),
  ...vgg16BnTFLite(),
  ...vgg19LiteRTTFLite(),
  ...vgg19BnTFLite(),
  ...visformerSmallTFLite(),
  ...vitBasePatch16_224TFLite(),
  ...vitSmallPatch16_224TFLite(),
  ...vitTinyPatch16_224TFLite(),
  ...wideResnet50_2TFLite(),
  ...xcitTiny24P8_224TFLite()
];