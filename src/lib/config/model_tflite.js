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
    inputs: [
      { 'input_ids': ['int32', 1, [1, 384], {}] },
      { 'input_mask': ['int32', 1, [1, 384], {}] },
      { 'segment_ids': ['int32', 1, [1, 384], {}] },
    ],
    inputstip: '[1,384] [1,384] [1,384]'
  }];
};

// const efficientdetLite4DetectionTFLite = () => {
//   return [{
//     category: MODEL_CATEGORIES.OBJECT_DETECTION,
//     tag: '',
//     id: 'efficientdet_lite4_detection_tflite_fp32',
//     name: 'Efficientdet Lite4 Detection',
//     description: 'EfficientDet object detection model (SSD with EfficientNet-b0 + BiFPN feature extractor, shared box predictor and focal loss), trained on COCO 2017 dataset.',
//     note: '',
//     source: 'https://www.kaggle.com/models/tensorflow/efficientdet/tfLite/lite4-detection-default',
//     hf: {
//       model: '',
//       file: ''
//     },
//     model: 'tflite/fp32/efficientdet_lite4_detection_default_v2.tflite',
//     size: '19.8 MB',
//     format: 'tflite',
//     datatype: 'int8',
//     inputs: [{ 'input': ['uint8', 'random', [1,640,640,3], {}] }],
//     inputstip: '[1,640,640,3]'
//   }];
// };

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
    inputs: [{ 'images': ['float32', 'random', [1, 300, 300, 3], {}] }],
    inputstip: '[1,300,300,3]'
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
    inputs: [{ 'x.1': ['float32', 'random', [1, 512, 512, 3], {}] }],
    inputstip: '[1, 512, 512, 3]'
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
    inputs: [{ 'input_0': ['float32', 'random', [1, 50, 50, 3], {}] }],
    inputstip: '[1,50,50,3]'
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
    inputs: [
	{ 'inputs': ['int32', 1, [1,384], {}] },
        { 'inputs_1': ['int32', 1, [1,384], {}] },
	{ 'inputs_2': ['int32', 1, [1,384], {}] },

],
    inputstip: '[1,384] [1,384] [1,384]'
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
    inputs: [{ 'args_0': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
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
    inputs: [{ 'serving_default_inputs:0': ['float32', 'random', [1, 224, 224, 3], {}] }],
    inputstip: '[-1,224,224,3]'
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
    inputs: [
      { 'serving_default_image:0': ['float32', 'random', [1, 1, 172, 172, 3], {}] },
      { 'serving_default_state_block0_layer0_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 24], {}] },
      { 'serving_default_state_block0_layer0_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block1_layer0_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 80], {}] },
      { 'serving_default_state_block1_layer0_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block1_layer0_stream_buffer:0': ['float32', 'random', [1, 2, 22, 22, 80], {}] },

      { 'serving_default_state_block1_layer1_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 80], {}] },
      { 'serving_default_state_block1_layer1_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block1_layer1_stream_buffer:0': ['float32', 'random', [1, 2, 22, 22, 80], {}] },

      { 'serving_default_state_block1_layer2_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 80], {}] },
      { 'serving_default_state_block1_layer2_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block1_layer2_stream_buffer:0': ['float32', 'random', [1, 2, 22, 22, 80], {}] },

      { 'serving_default_state_block2_layer0_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 184], {}] },
      { 'serving_default_state_block2_layer0_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block2_layer0_stream_buffer:0': ['float32', 'random', [1, 4, 11, 11, 184], {}] },

      { 'serving_default_state_block2_layer1_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 112], {}] },
      { 'serving_default_state_block2_layer1_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block2_layer1_stream_buffer:0': ['float32', 'random', [1, 2, 11, 11, 112], {}] },

      { 'serving_default_state_block2_layer2_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 184], {}] },
      { 'serving_default_state_block2_layer2_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block2_layer2_stream_buffer:0': ['float32', 'random', [1, 2, 11, 11, 184], {}] },

      { 'serving_default_state_block3_layer0_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 184], {}] },
      { 'serving_default_state_block3_layer0_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block3_layer0_stream_buffer:0': ['float32', 'random', [1, 4, 11, 11, 184], {}] },

      { 'serving_default_state_block3_layer1_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 184], {}] },
      { 'serving_default_state_block3_layer1_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block3_layer1_stream_buffer:0': ['float32', 'random', [1, 2, 11, 11, 184], {}] },

      { 'serving_default_state_block3_layer2_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 184], {}] },
      { 'serving_default_state_block3_layer2_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block3_layer2_stream_buffer:0': ['float32', 'random', [1, 2, 11, 11, 184], {}] },

      { 'serving_default_state_block3_layer3_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 184], {}] },
      { 'serving_default_state_block3_layer3_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block3_layer3_stream_buffer:0': ['float32', 'random', [1, 2, 11, 11, 184], {}] },

      { 'serving_default_state_block4_layer0_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 384], {}] },
      { 'serving_default_state_block4_layer0_pool_frame_count:0': ['int32', 1, [1], {}] },
      { 'serving_default_state_block4_layer0_stream_buffer:0': ['float32', 'random', [1, 4, 6, 6, 384], {}] },

      { 'serving_default_state_block4_layer1_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 280], {}] },
      { 'serving_default_state_block4_layer1_pool_frame_count:0': ['int32', 1, [1], {}] },

      { 'serving_default_state_block4_layer2_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 280], {}] },
      { 'serving_default_state_block4_layer2_pool_frame_count:0': ['int32', 1, [1], {}] },


      { 'serving_default_state_block4_layer3_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 344], {}] },
      { 'serving_default_state_block4_layer3_pool_frame_count:0': ['int32', 1, [1], {}] },


      { 'serving_default_state_head_pool_buffer:0': ['float32', 'random', [1, 1, 1, 1, 480], {}] },
      { 'serving_default_state_head_pool_frame_count:0': ['int32', 1, [1], {}] },
    ],
    inputstip: '[1,1,172,172,3] [...]...[...]'
  }];
};

// Export TFLite models
export const tfliteModels = [
  ...albertTFLite(),
  // ...efficientdetLite4DetectionTFLite(),
  ...efficientNetLite4V2TFLite(),
  ...efficientViTL2SegTFLite(),
  ...ESRGANTFLite(),
  // ...mobileBertQatTFLite(),
  ...mobileNetV2TFLite(),
  ...mobileNetV3SmallTFLite(),
  // ...moViNetTFLite(),
  // Add more TFLite models here
];