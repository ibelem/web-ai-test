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

export const localhost = 'int.sh.intel.com:5173';

export const corsSites = [
  'ibelem.github.io',
  'webai.run',
  'ai-benchmark.vercel.app'
]

export const ortDists = {
  public: 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js',
  webgpu: '../ort/1.17/web/webgpu/ort.webgpu.min.js',
  webnn_webglfix: 'https://ibelem.github.io/onnxruntime-web-dist/1.16_20/ort.min.js'
}

export const modelHosts = {
  hf: 'https://huggingface.co/webml/models/resolve/main/',
  hfmirror: 'https://hf-mirror.com/webml/models/resolve/main/',
  cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/',
  local: 'models/'
}

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
    description: '',
    source: '',
    model: '01.onnx'
  },
  {
    category: 'Image Classification',
    id: 'densenet',
    name: 'DenseNet 121',
    description: 'A type of convolutional neural network that utilises dense connections between layers',
    note: '',
    source: 'https://github.com/onnx/models/blob/main/vision/classification/densenet-121/model/densenet-9.onnx',
    model: 'densenet-9.onnx',
    size: '31.2 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'data_0': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'efficientnet_lite',
    name: 'EfficientNet Lite 4',
    description: 'A convolutional neural network architecture and scaling method',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/efficientnet-lite4/model/efficientnet-lite4-11.onnx',
    model: 'efficientnet-lite4-11.onnx',
    size: '49.5 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'images:0': ['float32', 'random', [1, 224, 224, 3], {}] }],
    inputstip: '[1, 224, 224, 3] '
  },
  {
    category: 'Image Classification',
    id: 'mobilenet_v2',
    name: 'MobileNet v2_10',
    description: 'A computer vision model designed for training classifiers',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-10.onnx',
    model: 'mobilenetv2-10.onnx',
    size: '13.3 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'mobilenet_v2_12',
    name: 'MobileNet v2_12',
    description: 'A computer vision model designed for training classifiers',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-12.onnx',
    model: 'mobilenetv2-12.onnx',
    size: '13.3 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'mobilenet_v2_fp16',
    name: 'MobileNet v2',
    description: 'A computer vision model designed for training classifiers',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/vision/classification/mobilenet',
    model: 'fp16/mobilenetv2-fp16.onnx',
    size: '7.42 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'input': ['float16', 'random', [1, 3, 224, 224], { "batch_size": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'mobilenet_v2_12_int8',
    name: 'MobileNet v2_12',
    description: 'A computer vision model designed for training classifiers',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/vision/classification/mobilenet',
    model: 'int8/mobilenetv2-12-int8.onnx',
    size: '13.3 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'resnet50_v1',
    name: 'ResNet50 v1',
    description: 'A convolutional neural network that is 50 layers deep',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/resnet/model/resnet50-v1-12.onnx',
    model: 'resnet50-v1-12.onnx',
    size: '97.8 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'data': ['float32', 'random', [1, 3, 224, 224], { "N": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'resnet50_v2',
    name: 'ResNet50 v2',
    description: 'A convolutional neural network that is 50 layers deep',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/resnet/model/resnet50-v2-7.onnx',
    model: 'resnet50-v2-7.onnx',
    size: '97.7 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'data': ['float32', 'random', [1, 3, 224, 224], { "N": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'squeezenet',
    name: 'SqueezeNet 1.1',
    description: 'A deep convolutional neural network (CNN) perform image classification',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/squeezenet/model/squeezenet1.1-7.onnx',
    model: 'squeezenet1.1-7.onnx',
    size: '4.72 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'data': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'squeezenet_fp16',
    name: 'SqueezeNet 1.0',
    description: 'A deep convolutional neural network (CNN) perform image classification',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/squeezenet/model/squeezenet1.1-7.onnx',
    model: 'fp16/sueezenet1.0-fp16.onnx',
    size: '2.36 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'data_0': ['float16', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Semantic Segmentation',
    id: 'deeplab_v3',
    name: 'DeepLab v3',
    description: 'A series of deep learning architectures designed to tackle the problem of semantic segmentation',
    note: '',
    source: 'ftlite converted',
    model: 'deeplab-mobilenetv2.onnx',
    size: '8.46 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'sub_7': ['float32', 'random', [1, 513, 513, 3], {}] }],
    inputstip: '[1, 513, 513, 3]'
  },
  {
    category: 'Semantic Segmentation',
    id: 'selfie_segmentation_general',
    name: 'Selfie Segmentation General',
    description: 'Easily separate the background from users within a scene and focus on what matters',
    note: '',
    source: 'https://github.com/PINTO0309/PINTO_model_zoo/tree/main/109_Selfie_Segmentation',
    model: 'selfie-segmentation-general.onnx',
    size: '437 KB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'input_1:0': ['float32', 'random', [1, 256, 256, 3], {}] }],
    inputstip: '[1, 256, 256, 3]'
  },
  {
    category: 'Semantic Segmentation',
    id: 'selfie_segmentation_landscape',
    name: 'Selfie Segmentation Landscape',
    description: 'Easily separate the background from users within a scene and focus on what matters',
    note: '',
    source: 'https://storage.googleapis.com/mediapipe-assets/selfie_segmentation.tflite https://github.com/keijiro/SelfieBarracuda',
    model: 'selfie-segmentation-landscape.onnx',
    size: '435 KB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'input_1:0': ['float32', 'random', [1, 144, 256, 3], {}] }],
    inputstip: '[1, 144, 256, 3]'
  },
  {
    category: 'Face Analysis',
    id: 'emotion_ferplus',
    name: 'Emotion FERPlus',
    description: 'A deep convolutional neural network for emotion recognition in faces',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/body_analysis/emotion_ferplus/model/emotion-ferplus-8.onnx',
    model: 'emotion-ferplus-8.onnx',
    size: '35 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'Input3': ['float32', 'random', [1, 1, 64, 64], {}] }],
    inputstip: '[1, 1, 64, 64]'
  },
  {
    category: 'Style Transfer',
    id: 'fns_candy',
    name: 'FNS Candy',
    description: 'A style transfer model to re-style images or video streams',
    note: '',
    source: 'https://github.com/microsoft/Windows-Machine-Learning/raw/master/Samples/CustomTensorization/CustomTensorization/fns-candy.onnx',
    model: 'fns-candy.onnx',
    size: '1.63 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'inputImage': ['float32', 'random', [1, 3, 720, 720], { 'None': 1 }] }],
    inputstip: '[1, 3, 720, 720]'
  },
  {
    category: 'Object Detection',
    id: 'tinyyolo_v2',
    name: 'Tiny YOLO v2',
    description: '[1, 3, 416, 416] / A real-time neural network for object detection',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/object_detection_segmentation/tiny-yolov2/model/tinyyolov2-8.onnx',
    model: 'tinyyolov2-8.onnx',
    size: '60.5 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'image': ['float32', 'random', [1, 3, 416, 416], { "None": 1 }] }],
    inputstip: '[1, 3, 416, 416]'
  },
  {
    category: 'Masked Language Modeling (MLM)',
    id: 'bert_base_cased_int8',
    name: 'BERT Base Cased',
    description: 'A transformers model pretrained on a large corpus of English data in a self-supervised fashion',
    note: '',
    source: 'https://huggingface.co/Xenova/bert-base-cased/tree/main/onnx',
    model: 'transformer.js/bert-base-cased/model_quantized.onnx',
    size: '104MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 9], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 9], { "batch_size": 1 }],
      'token_type_ids': ['int64', 1n, [1, 9], { "batch_size": 1 }],
    }],
    inputstip: '[1, 9] [1, 9] [1, 9]'
  },
  {
    category: 'Token Classification',
    id: 'bert_base_multilingual_cased_ner_hrl_int8',
    name: 'BERT Base Multilingual Cased NER HRL',
    description: 'A Named Entity Recognition model for 10 high resourced languages (Arabic, German, English, Spanish, French, Italian, Latvian, Dutch, Portuguese and Chinese) based on a fine-tuned mBERT base model',
    note: '',
    source: 'https://huggingface.co/Xenova/bert-base-multilingual-cased-ner-hrl/tree/main/onnx',
    model: 'transformer.js/bert-base-multilingual-cased-ner-hrl/model_quantized.onnx',
    size: '170MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 1], { "batch_size": 1 }],
      'token_type_ids': ['int64', 1n, [1, 1], { "batch_size": 1 }],
    }],
    inputstip: '[1, 1] [1, 1] [1, 1]'
  },
  {
    category: 'Text Classification',
    id: 'bert_base_multilingual_uncased_sentiment_int8',
    name: 'BERT Base Multilingual Uncased Sentiment',
    description: 'A bert-base-multilingual-uncased model finetuned for sentiment analysis on product reviews in six languages: English, Dutch, German, French, Spanish, and Italian',
    note: '',
    source: 'https://huggingface.co/Xenova/bert-base-multilingual-uncased-sentiment/tree/main/onnx',
    model: 'transformer.js/bert-base-multilingual-uncased-sentiment/model_quantized.onnx',
    size: '160MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 63], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 63], { "batch_size": 1 }],
      'token_type_ids': ['int64', 1n, [1, 63], { "batch_size": 1 }],
    }],
    inputstip: '[1, 63] [1, 63] [1, 63]'
  },
  {
    category: 'Text Generation',
    id: 'codegen_350m_mono_int8',
    name: 'CodeGen Mono 350M',
    description: 'A family of autoregressive language models for program synthesis',
    note: 'Large model. It is recommended to run tests on this large model individually rather than together with other models',
    source: 'https://huggingface.co/Xenova/codegen-350M-mono/tree/main/onnx',
    model: 'transformer.js/codegen-350m-mono/decoder_model_quantized.onnx',
    size: '350MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 8], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 8], { "batch_size": 1 }]
    }],
    inputstip: '[1, 8] [1, 8]'
  },
  {
    category: 'Zero-Shot Image Classification',
    id: 'clip_vit_base_patch16_int8',
    name: 'CLIP ViT Base',
    description: 'A Contrastive Language-Image Pre-Training (CLIP) model developed by researchers at OpenAI to learn about what contributes to robustness in computer vision tasks',
    note: '',
    source: 'https://huggingface.co/Xenova/clip-vit-base-patch16/tree/main/onnx',
    model: 'transformer.js/clip-vit-base-patch16/model_quantized.onnx',
    size: '144 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 49407n, [1, 77], { "batch_size": 1 }],
      'pixel_values': ['float32', 99, [1, 3, 224, 224], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 77], { "batch_size": 1 }]
    }],
    inputstip: '[1, 77] [1, 3, 224, 224] [1, 77]'
  },
  {
    category: 'Object Detection',
    id: 'detr_resnet_50_int8',
    name: 'DETR w/i ResNet-50',
    description: 'DEtection TRansformer (DETR) model with ResNet-50 backbone trained end-to-end on COCO 2017 object detection (118k annotated images). The DETR model is an encoder-decoder transformer with a convolutional backbone.',
    note: '',
    source: 'https://huggingface.co/Xenova/detr-resnet-50/tree/main/onnx',
    model: 'transformer.js/detr-resnet-50/model_quantized.onnx',
    size: '41.1 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'pixel_values': ['float32', 'random', [1, 3, 224, 224], {}] },
    { 'pixel_mask': ['int64', 1n, [1, 64, 64], {}] },
    ],
    inputstip: '[1, 3, 224, 224] [1, 64, 64]'
  },
  {
    category: 'Text Summarization',
    id: 'distilbart_cnn_6_6_encoder_int8',
    name: 'Distilbart CNN 6-6 Encoder',
    description: 'A text summarization model built upon a Transformer model',
    note: '',
    source: 'https://huggingface.co/Xenova/distilbart-cnn-6-6/tree/main/onnx',
    model: 'transformer.js/distilbart-cnn-6-6/encoder_model_quantized.onnx',
    size: '122MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 168], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 168], { "batch_size": 1 }]
    }],
    inputstip: '[1, 168] [1, 168]'
  },
  {
    category: 'Text Summarization',
    id: 'distilbart_cnn_6_6_decoder_int8',
    name: 'Distilbart CNN 6-6 Decoder',
    description: 'A text summarization model built upon a Transformer model',
    note: '',
    source: 'https://huggingface.co/Xenova/distilbart-cnn-6-6/tree/main/onnx',
    model: 'transformer.js/distilbart-cnn-6-6/decoder_model_quantized.onnx',
    size: '147MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 168], { "batch_size": 1 }],
      'encoder_attention_mask': ['int64', 1n, [1, 168], { "batch_size": 1 }],
      'encoder_hidden_states': ['float32', 1, [1, 168, 1024], { "batch_size": 1 }]
    }],
    inputstip: '[1, 168] [1, 168] [1, 168, 1024]'
  },
  {
    category: 'Question Answering',
    id: 'distilbert_base_cased_distilled_squad_int8',
    name: 'DistilBERT Base Cased Distilled Squad',
    description: 'A small, fast, cheap and light Transformer model trained by distilling BERT base',
    note: '',
    source: 'https://huggingface.co/Xenova/distilbert-base-cased-distilled-squad/tree/main/onnx',
    model: 'transformer.js/distilbert-base-cased-distilled-squad/model_quantized.onnx',
    size: '62.7MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 262], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 262], { "batch_size": 1 }]
    }],
    inputstip: '[1, 262] [1, 262]'
  },
  {
    category: 'Zero-Shot Classification',
    id: 'distilbert_base_uncased_mnli_int8',
    name: 'DistilBERT Base Uncased Mnli',
    description: 'An uncased DistilBERT model fine-tuned on Multi-Genre Natural Language Inference (MNLI) dataset for the zero-shot classification task',
    note: '',
    source: 'https://huggingface.co/Xenova/distilbert-base-uncased-mnli/tree/main/onnx',
    model: 'transformer.js/distilbert-base-uncased-mnli/model_quantized.onnx',
    size: '64.4MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 50], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 50], { "batch_size": 1 }]
    }],
    inputstip: '[1, 50] [1, 50]'
  },
  {
    category: 'Text Generation',
    id: 'distilgpt2_decoder_int8',
    name: 'DistilGPT2 Decoder',
    description: 'An English-language model pre-trained with the supervision of the smallest version of Generative Pre-trained Transformer 2 (GPT-2)',
    note: '',
    source: 'https://huggingface.co/Xenova/distilgpt2/tree/main',
    model: 'transformer.js/distilgpt2/decoder_model_quantized.onnx',
    size: '79.6MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 16], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 16], { "batch_size": 1 }],
    }],
    inputstip: '[1, 16] [1, 16]'
  },
  {
    category: 'Text Generation',
    id: 'gpt2_decoder',
    name: 'GPT-2 Decoder',
    description: 'A transformers model pretrained on a very large corpus of English data in a self-supervised fashion',
    note: 'Large model. It is recommended to run tests on this large model individually rather than together with other models',
    source: 'https://huggingface.co/gpt2/tree/main/onnx',
    model: 'gpt2-decoder.onnx',
    size: '623 MB',
    format: 'onnx',
    datatype: 'int64',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 8], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 8], { "batch_size": 1 }],
      inputstip: '[1, 8] [1, 8]'
    }]
  },
  {
    category: 'Multilingual Translation',
    id: 'm2m100_decoder',
    name: 'M2M100 418M Decoder',
    description: 'A multilingual encoder-decoder (seq-to-seq) model',
    note: 'Large model. It is recommended to run tests on this large model individually rather than together with other models',
    source: 'https://huggingface.co/Xenova/m2m100_418M/tree/main/onnx',
    model: 'm2m100-decoder.onnx',
    size: '1.24GB',
    format: 'onnx',
    datatype: 'int64',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1 }],
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1 }],
      'encoder_hidden_states': ['float32', 1, [1, 128, 1024], { "batch_size": 1 }]
    }],
    inputstip: '[1, 128] [1, 128] [1, 128, 1024]'
  },
  {
    category: 'Multilingual Translation',
    id: 'm2m100_encoder',
    name: 'M2M100 418M Encoder',
    description: 'A multilingual encoder-decoder (seq-to-seq) model',
    note: 'Large model. It is recommended to run tests on this large model individually rather than together with other models',
    source: 'https://huggingface.co/Xenova/m2m100_418M/tree/main/onnx',
    model: 'm2m100-encoder.onnx',
    size: '1.05GB',
    format: 'onnx',
    datatype: 'int64',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1 }],
    }],
    inputstip: '[1, 128] [1, 128]'
  },
  {
    category: 'Text To Image',
    id: 'sd_2_1_vae_decoder',
    name: 'SD 2.1 VAE Decoder',
    description: 'Stable Diffusion 2.1 (text-to-image diffusion model)',
    note: '',
    source: 'https://huggingface.co/aislamov/stable-diffusion-2-1-base-onnx/tree/main',
    model: 'sd-2.1-vae-decoder.onnx',
    size: '94.5 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'latent_sample': ['float32', 'random', [1, 4, 64, 64], { "vaedec_sample_batch": 1 }]
    }],
    inputstip: '[1, 4, 64, 64]'
  },
  {
    category: 'Text To Image',
    id: 'sd_2_1_vae_encoder',
    name: 'SD 2.1 VAE Encoder',
    description: 'Stable Diffusion 2.1 (text-to-image diffusion model)',
    note: '',
    source: 'https://huggingface.co/aislamov/stable-diffusion-2-1-base-onnx/tree/main',
    model: 'sd-2.1-vae-encoder.onnx',
    size: '130 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'latent_sample': ['float32', 'random', [1, 4, 64, 64], { "vaedec_sample_batch": 1 }]
    }],
    inputstip: '[1, 4, 64, 64]'
  },
  {
    category: 'Semantic Segmentation',
    id: 'segment_anything',
    name: 'Segment Anything',
    description: 'An AI model from Meta AI that can cut out any object in any image',
    note: '',
    source: 'MSFT',
    model: 'segment-anything-vit-h-static-shapes-origin-im-size-initializer-optimized-float32.onnx',
    size: '19.6 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'image_embeddings': ['float32', 'random', [1, 256, 64, 64], {}] },
    { 'point_coords': ['float32', 'random', [1, 2, 2], {}] },
    { 'point_labels': ['float32', 'random', [1, 2], {}] },
    { 'mask_input': ['float32', 'random', [1, 1, 256, 256], {}] },
    { 'has_mask_input': ['float32', 'random', [1], {}] }],
    inputstip: '[1, 256, 64, 64] [1, 2, 2] [1, 2] [1, 1, 256, 256] [1]'
  },
  {
    category: 'Semantic Segmentation',
    id: 'segment_anything_fp16',
    name: 'Segment Anything',
    description: 'An AI model from Meta AI that can cut out any object in any image',
    note: '',
    source: 'MSFT',
    model: 'fp16/segment-anything-vit-h-static-shapes-origin-im-size-initializer-optimized-float16.onnx',
    size: '9.8 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'image_embeddings': ['float16', 'random', [1, 256, 64, 64], {}] },
    { 'point_coords': ['float16', 'random', [1, 2, 2], {}] },
    { 'point_labels': ['float16', 'random', [1, 2], {}] },
    { 'mask_input': ['float16', 'random', [1, 1, 256, 256], {}] },
    { 'has_mask_input': ['float16', 'random', [1], {}] }],
    inputstip: '[1, 256, 64, 64] [1, 2, 2] [1, 2] [1, 1, 256, 256] [1]'
  },
  {
    category: 'Text-To-Text Translation',
    id: 't5_small_decoder',
    name: 'T5 Small Decoder',
    description: 'A Text-To-Text transfer transformer model, reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings',
    note: '',
    source: 'https://huggingface.co/Xenova/t5-small/tree/main/onnx',
    model: 'transformer.js/t5-small/decoder_model.onnx',
    size: '158 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1 }] },
    { 'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1 }] },
    { 'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1 }] }],
    inputstip: '[1, 128] [1, 128] [1, 128, 512]'
  },
  {
    category: 'Text-To-Text Translation',
    id: 't5_small_decoder_int8',
    name: 'T5 Small Decoder',
    description: 'A Text-To-Text transfer transformer model, reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings',
    note: '',
    source: 'https://huggingface.co/Xenova/t5-small/tree/main/onnx',
    model: 'transformer.js/t5-small/decoder_model_quantized.onnx',
    size: '40.2 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1 }] },
    { 'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1 }] },
    { 'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1 }] }],
    inputstip: '[1, 128] [1, 128] [1, 128, 512]'
  },
  {
    category: 'Text-To-Text Translation',
    id: 't5_small_encoder',
    name: 'T5 Small Encoder',
    description: 'A Text-To-Text transfer transformer model, reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings',
    note: '',
    source: 'https://huggingface.co/Xenova/t5-small/tree/main/onnx',
    model: 'transformer.js/t5-small/encoder_model.onnx',
    size: '134 MB',
    format: 'onnx',
    datatype: 'int64',
    inputs: [{ 'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1 }] }, { 'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1 }] }],
    inputstip: '[1, 128] [1, 128]'
  },
  {
    category: 'Text-To-Text Translation',
    id: 't5_small_encoder_int8',
    name: 'T5 Small Encoder',
    description: 'A Text-To-Text transfer transformer model, reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings',
    note: '',
    source: 'https://huggingface.co/Xenova/t5-small/tree/main/onnx',
    model: 'transformer.js/t5-small/encoder_model_quantized.onnx',
    size: '33.9 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1 }] },
    { 'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1 }] }],
    inputstip: '[1, 128] [1, 128]'
  },
  {
    category: 'Image Classification',
    id: 'vit_base_patch16_224_int8',
    name: 'Vision Transformer (ViT) Base-sized',
    description: 'Vision Transformer (ViT) model pre-trained on ImageNet-21k (14 million images, 21,843 classes) at resolution 224x224, and fine-tuned on ImageNet 2012',
    note: '',
    source: 'https://huggingface.co/Xenova/vit-base-patch16-224/tree/main',
    model: 'transformer.js/vit-base-patch16-224/model_quantized.onnx',
    size: '84.1 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'pixel_values': ['float32', 1, [1, 3, 224, 224], { "batch_size": 1 }]
    }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image-to-Text',
    id: 'vit_gpt2_image_captioning_decoder_int8',
    name: 'ViT GPT2 Image Captioning Decoder',
    description: 'An image captioning model using transformers',
    note: '',
    source: 'https://huggingface.co/Xenova/vit-gpt2-image-captioning/tree/main/onnx',
    model: 'transformer.js/vit-gpt2-image-captioning/decoder_model_quantized.onnx',
    size: '149 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 1n, [1, 168], { "batch_size": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 168, 768], { "batch_size": 1 }]
    }],
    inputstip: '[1, 168] [1, 168, 768]'
  },
  {
    category: 'Image-to-Text',
    id: 'vit_gpt2_image_captioning_encoder_int8',
    name: 'ViT GPT2 Image Captioning Encoder',
    description: 'An image captioning model using transformers',
    note: '',
    source: 'https://huggingface.co/Xenova/vit-gpt2-image-captioning/tree/main/onnx',
    model: 'transformer.js/vit-gpt2-image-captioning/encoder_model_quantized.onnx',
    size: '83.4 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'pixel_values': ['float32', 1, [1, 3, 224, 224], { "batch_size": 1 }]
    }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Speech Recognition',
    id: 'whisper_tiny_decoder',
    name: 'Whisper Tiny Decoder',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation',
    note: '',
    source: 'https://huggingface.co/Xenova/whisper-tiny.en/tree/main/onnx',
    model: 'transformer.js/whisper-tiny.en/decoder_model.onnx',
    size: '112 MB',
    format: 'onnx',
    datatype: 'int64',
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 1500, 384], { "batch_size": 1 }]
    }],
    inputstip: '[1, 1] [1, 1500, 384]'
  },
  {
    category: 'Speech Recognition',
    id: 'whisper_tiny_decoder_int8',
    name: 'Whisper Tiny Decoder',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation',
    note: '',
    source: 'https://huggingface.co/Xenova/whisper-tiny.en/tree/main/onnx',
    model: 'transformer.js/whisper-tiny.en/decoder_model_quantized.onnx',
    size: '29.0 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 1500, 384], { "batch_size": 1 }]
    }],
    inputstip: '[1, 1] [1, 1500, 384]'
  },
  {
    category: 'Speech Recognition',
    id: 'whisper_tiny_encoder',
    name: 'Whisper Tiny Encoder',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation',
    note: '',
    source: 'https://huggingface.co/Xenova/whisper-tiny.en/tree/main/onnx',
    model: 'transformer.js/whisper-tiny.en/encoder_model.onnx',
    size: '31.3 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'input_features': ['float32', 'random', [1, 80, 3000], { "batch_size": 1 }]
    }],
    inputstip: '[1, 80, 3000]'
  },

  {
    category: 'Speech Recognition',
    id: 'whisper_tiny_encoder_int8',
    name: 'Whisper Tiny Encoder',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation',
    note: '',
    source: 'https://huggingface.co/Xenova/whisper-tiny.en/tree/main/onnx',
    model: 'transformer.js/whisper-tiny.en/encoder_model_quantized.onnx',
    size: '9.65 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_features': ['float32', 'random', [1, 80, 3000], { "batch_size": 1 }]
    }],
    inputstip: '[1, 80, 3000]'
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