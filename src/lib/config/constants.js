export const MODEL_CATEGORIES = {
  FILL_MASK: 'Fill-Mask',
  SUMMARIZATION: 'Summarization',
  TEXT_CLASSIFICATION: 'Text Classification',
  TOKEN_CLASSIFICATION: 'Token Classification',
  FEATURE_EXTRACTION: 'Feature Extraction',
  ZERO_SHOT_IMAGE_CLASSIFICATION: 'Zero-Shot Image Classification',
  TEXT_GENERATION: 'Text Generation',
  DEPTH_ESTIMATION: 'Depth Estimation',
  OBJECT_DETECTION: 'Object Detection',
  IMAGE_TEXT_TO_TEXT: 'Image-Text-to-Text',
  MASK_GENERATION: 'Mask Generation',
  IMAGE_SEGMENTATION: 'Image Segmentation',
  KEYPOINT_DETECTION: 'Keypoint Detection',
  IMAGE_CLASSIFICATION: 'Image Classification',
  SENTENCE_SIMILARITY: 'Sentence Similarity',
  QUESTION_ANSWERING: 'Question Answering',
  ZERO_SHOT_CLASSIFICATION: 'Zero-Shot Classification',
  TEXT2TEXT_GENERATION: 'Text2Text Generation',
  AUTOMATIC_SPEECH_RECOGNITION: 'Automatic Speech Recognition',
  IMAGE_TO_IMAGE: 'Image-to-Image',
  IMAGE_TO_TEXT: 'Image-to-Text',
  TEXT_TO_SPEECH: 'Text-to-Speech',
  TRANSLATION: 'Translation',
  AUDIO_CLASSIFICATION: 'Audio Classification',
  VIDEO_CLASSIFICATION: 'Video Classification',
  OPERATORS: 'Operators',
  MICROSOFT_365: 'Microsoft 365'
};

export const DATA_TYPES = {
  FP32: 'fp32',
  FP16: 'fp16',
  INT8: 'int8',
  INT4: 'int4',
  Q4: 'q4',
  Q4F16: 'q4f16'
};

export const MODEL_HOSTS = {
  hf: 'https://huggingface.co/webml/models/resolve/main/',
  hfm: 'https://hf-mirror.com/webml/models/resolve/main/',
  cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/',
  local: 'models/'
};

export const MODEL_FORMATS = {
  ONNX: 'onnx',
  TFLITE: 'tflite'
};

export const UNIQUE_BACKENDS = [
  'wasm_1',
  'wasm_4', 
  'webgl',
  'webgpu',
  'webnn_cpu',
  'webnn_gpu',
  'webnn_npu'
];

export const CORS_SITES = [
  'github.io',
  'huggingface.co', 
  'vercel.app',
  'webai.run'
];

export const TRACKING = [
  'tfsm',
  'goog',
  'ctni', 
  'mocq',
  'advn',
  'dma',
  'lpaa'
];

export const ORT_DISTS = {
  webnn_webglfix_wasm: {
    version: '2025-9-12',
    url: '../ort/ort.webgpu.min.js'
  },
  wasm_relaxed_simd: {
    version: '2025-01-03', 
    url: '../ort_relaxed_simd/ort.all.min.js'
  }
};