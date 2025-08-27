import { MODEL_CATEGORIES } from './constants.js';

// TFLite model functions
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
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
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
    inputs: [{ 'input': ['float32', 'random', [1, 512, 512, 3], {}] }],
    inputstip: '[1, 512, 512, 3]'
  }];
};

// Export TFLite models
export const tfliteModels = [
  ...mobileNetV2TFLite(),
  ...efficientViTL2SegTFLite(),
  // Add more TFLite models here
];