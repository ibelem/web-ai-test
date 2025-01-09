export const siteTitle = "Web AI Run";
export const siteDescription = "";
export const siteURL = "";

export let environment = {
  cpu: '',
  logicCores: 0,
  gpu: null,
  os: null,
  osVersion: null,
  webbrowser: null,
  browserVersion: null
};

export const corsSites = [
  'github.io',
  'huggingface.co',
  'vercel.app',
  'webai.run'
]

export const tracking = [
  'tfsm',
  'goog',
  'ctni'
]

export const ortDists = {
  webgpu: {
    version: '2024-11-19',
    url: 'https://ibelem.github.io/onnxruntime-web-dist/webgpu/ort.all.min.js'
  },
  webnn_webglfix_wasm: {
    version: '2024-11-14',
    url: '../ort/ort.all.min.js'
  },
  wasm_relaxed_simd: {
    version: '2025-01-03',
    url: '../ort_relaxed_simd/ort.all.min.js'
  }
}

export const modelHosts = {
  hf: 'https://huggingface.co/webml/models/resolve/main/',
  cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/',
  local: 'models/'
}

export const uniqueBackends = [
  'wasm_1',
  'wasm_4',
  'webgl',
  'webgpu',
  'webnn_cpu',
  'webnn_gpu',
  'webnn_npu'
];

const albertBaseV2 = () => {
  const configs = [
    ['fp32', 'model.onnx', '43.1 MB'],
    ['fp16', 'model_fp16.onnx', '21.8 MB'],
    ['int8', 'model_quantized.onnx', '38.3 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Fill-Mask',
    tag: '',
    id: `albert_base_v2_${dt}`,
    name: 'ALBERT Base v2',
    description: 'ALBERT is a transformers model pretrained on a large corpus of English data in a self-supervised fashion, using a masked language modeling (MLM) objective.',
    note: '',
    source: 'https://huggingface.co/Xenova/albert-base-v2',
    hf: {
      model: 'xenova/albert-base-v2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "sequence_length": 128 }],
      'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "sequence_length": 128 }],
      'token_type_ids': ['int64', 1n, [1, 128], { "batch_size": 1, "sequence_length": 128 }],
    }],
    inputstip: '[1, 128] [1, 128] [1, 128]'
  }))
}

const bartLargeCnn = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '777 MB'],
    ['fp16', 'encoder_model_fp16.onnx', '388 MB'],
    ['int8', 'encoder_model_quantized.onnx', '195 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Summarization',
    tag: '',
    id: `bart_large_cnn_${dt}`,
    name: 'BART Large CNN Encoder',
    description: 'BART is a transformer encoder-encoder (seq2seq) model with a bidirectional (BERT-like) encoder and an autoregressive (GPT-like) decoder.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/bart-large-cnn',
    hf: {
      model: 'xenova/bart-large-cnn',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 128]'
  }))
}

const bertBaseCased = () => {
  const configs = [
    ['fp32', 'model.onnx', '413 MB'],
    ['fp16', 'model_fp16.onnx', '206 MB'],
    ['int8', 'model_quantized.onnx', '104 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Fill-Mask',
    tag: '',
    id: `bert_base_cased_${dt}`,
    name: 'BERT Base Cased',
    description: 'A transformers model pretrained on a large corpus of English data in a self-supervised fashion.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/bert-base-cased',
    hf: {
      model: 'xenova/bert-base-cased',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 9], { "batch_size": 1, "sequence_length": 9 }],
      'attention_mask': ['int64', 1n, [1, 9], { "batch_size": 1, "sequence_length": 9 }],
      'token_type_ids': ['int64', 1n, [1, 9], { "batch_size": 1, "sequence_length": 9 }],
    }],
    inputstip: '[1, 9] [1, 9] [1, 9]'
  }))
}

const bertBaseUncased = () => {
  const configs = [
    ['fp32', 'model.onnx', '418 MB'],
    ['fp16', 'model_fp16.onnx', '209 MB'],
    ['int8', 'model_quantized.onnx', '105 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Fill-Mask',
    tag: '',
    id: `bert_base_uncased_${dt}`,
    name: 'BERT Base Uncased',
    description: 'A transformers model pretrained on a large corpus of English data in a self-supervised fashion.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/bert-base-uncased',
    hf: {
      model: 'xenova/bert-base-uncased',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "sequence_length": 128 }],
      'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "sequence_length": 128 }],
      'token_type_ids': ['int64', 1n, [1, 128], { "batch_size": 1, "sequence_length": 128 }],
    }],
    inputstip: '[1, 128] [1, 128] [1, 128]'
  }))
}

const bertBaseMultilingualCasedNerHrl = () => {
  const configs = [
    ['fp32', 'model.onnx', '676 MB'],
    ['fp16', 'model_fp16.onnx', '338 MB'],
    ['int8', 'model_quantized.onnx', '170 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Token Classification',
    tag: '',
    id: `bert_base_multilingual_cased_ner_hrl_${dt}`,
    name: 'BERT Base Multilingual Cased NER HRL',
    description: 'A Named Entity Recognition model for 10 high resourced languages (Arabic, German, English, Spanish, French, Italian, Latvian, Dutch, Portuguese and Chinese) based on a fine-tuned mBERT base model.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/bert-base-multilingual-cased-ner-hrl',
    hf: {
      model: 'xenova/bert-base-multilingual-cased-ner-hrl',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
      'attention_mask': ['int64', 1n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
      'token_type_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
    }],
    inputstip: '[1, 1] [1, 1] [1, 1]'
  }))
}

const bertBaseMultilingualUncasedSentiment = () => {
  const configs = [
    ['fp32', 'model.onnx', '638 MB'],
    ['fp16', 'model_fp16.onnx', '319 MB'],
    ['int8', 'model_quantized.onnx', '160.78 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Classification',
    tag: '',
    id: `bert_base_multilingual_uncased_sentiment_${dt}`,
    name: 'BERT Base Multilingual Uncased Sentiment',
    description: 'A bert-base-multilingual-uncased model finetuned for sentiment analysis on product reviews in six languages: English, Dutch, German, French, Spanish, and Italian.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/bert-base-multilingual-uncased-sentiment',
    hf: {
      model: 'xenova/bert-base-multilingual-uncased-sentiment',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 63], { "batch_size": 1, "sequence_length": 63 }],
      'attention_mask': ['int64', 1n, [1, 63], { "batch_size": 1, "sequence_length": 63 }],
      'token_type_ids': ['int64', 1n, [1, 63], { "batch_size": 1, "sequence_length": 63 }],
    }],
    inputstip: '[1, 63] [1, 63] [1, 63]'
  }))
}

const BGELargeEnV1_5 = () => {
  const configs = [
    ['fp32', 'model.onnx', '1.24 GB'],
    ['fp16', 'model_fp16.onnx', ' 637 MB'],
    ['int8', 'model_quantized.onnx', '321 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '2H',
    id: `bge_large_en_v1_5_${dt}`,
    name: 'BAAI General Embedding (BGE) Large EN v1.5',
    description: 'FlagEmbedding focuses on retrieval-augmented LLMs.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/bge-large-en-v1.5',
    hf: {
      model: 'xenova/bge-large-en-v1.5',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 101n, [2, 5], { "batch_size": 1, "sequence_length": 5 }],
      'attention_mask': ['int64', 1n, [2, 5], { "batch_size": 2, "sequence_length": 5 }],
      'token_type_ids': ['int64', 0n, [2, 5], { "batch_size": 2, "sequence_length": 5 }]
    }],
    inputstip: '[2, 5] [2, 5] [2, 5]'
  }))
}

const BGERerankerBase = () => {
  const configs = [
    ['fp32', 'model.onnx', '1.03 GB'],
    ['fp16', 'model_fp16.onnx', ' 530 MB'],
    ['int8', 'model_quantized.onnx', '266 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Classification',
    tag: '2H',
    id: `bge_reranker_base_${dt}`,
    name: 'BAAI General Embedding (BGE) Reranker Base',
    description: 'Lightweight reranker model, easy to deploy, with fast inference.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/bge-reranker-base',
    hf: {
      model: 'xenova/bge-reranker-base',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 101n, [2, 5], { "batch_size": 1, "sequence_length": 5 }],
      'attention_mask': ['int64', 1n, [2, 5], { "batch_size": 2, "sequence_length": 5 }]
    }],
    inputstip: '[2, 5] [2, 5]'
  }))
}

const clipVitBasePatch16 = () => {
  const configs = [
    ['fp32', 'model.onnx', '571 MB'],
    ['fp16', 'model_fp16.onnx', '286 MB'],
    ['int8', 'model_quantized.onnx', '144 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Zero-Shot Image Classification',
    tag: '',
    id: `clip_vit_base_patch16_${dt}`,
    name: 'CLIP ViT Base',
    description: 'A Contrastive Language-Image Pre-Training (CLIP) model developed by researchers at OpenAI to learn about what contributes to robustness in computer vision tasks.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/clip-vit-base-patch16',
    hf: {
      model: 'xenova/clip-vit-base-patch16',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 49407n, [1, 77], { "text_batch_size": 1, "sequence_length": 77 }],
      'pixel_values': ['float32', 99, [1, 3, 224, 224], { "image_batch_size": 1, "num_channels": 3, "height": 224, "width": 224 }],
      'attention_mask': ['int64', 1n, [1, 77], { "text_batch_size": 1, "sequence_length": 77 }]
    }],
    inputstip: '[1, 77] [1, 3, 224, 224] [1, 77]'
  }))
}

const codeGenMono350M = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '1.33 GB'],
    ['fp16', 'decoder_model_fp16.onnx', '690 MB'],
    ['int8', 'decoder_model_quantized.onnx', '350 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '',
    id: `codegen_350m_mono_${dt}`,
    name: 'CodeGen Mono 350M',
    description: 'A family of autoregressive language models for program synthesis.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/codegen-350M-mono',
    hf: {
      model: 'xenova/codegen-350m-mono',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 8], { "batch_size": 1, "sequence_length": 8 }],
      'attention_mask': ['int64', 1n, [1, 8], { "batch_size": 1, "sequence_length": 8 }]
    }],
    inputstip: '[1, 8] [1, 8]'
  }))
}

const detrResnet50 = () => {
  const configs = [
    ['fp32', 'model.onnx', '159 MB'],
    ['fp16', 'model_fp16.onnx', '79.9 MB'],
    ['int8', 'model_quantized.onnx', '41.1 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Object Detection',
    tag: '2h',
    id: `detr_resnet_50_${dt}`,
    name: 'DETR w/i ResNet-50',
    description: 'DEtection TRansformer (DETR) model with ResNet-50 backbone trained end-to-end on COCO 2017 object detection (118k annotated images). The DETR model is an encoder-decoder transformer with a convolutional backbone.',
    note: '',
    source: 'https://huggingface.co/Xenova/detr-resnet-50',
    hf: {
      model: 'xenova/detr-resnet-50',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1, "num_channels": 3, "height": 224, "width": 224 }],
      'pixel_mask': ['int64', 1n, [1, 64, 64], { "batch_size": 1 }]
    }],
    inputstip: '[1, 3, 224, 224] [1, 64, 64]'
  }))
}

const dinoVitb16 = () => {
  const configs = [
    ['fp32', 'model.onnx', '327 MB'],
    ['fp16', 'model_fp16.onnx', '163 MB'],
    ['int8', 'model_quantized.onnx', '83.4 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '',
    id: `dino_vitb16_${dt}`,
    name: 'DINO ViT',
    description: 'Vision Transformer (ViT) model trained using the DINO method.',
    note: '',
    source: 'https://huggingface.co/Xenova/dino-vitb16',
    hf: {
      model: 'xenova/dino-vitb16',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{ 'pixel_values': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1, "num_channels": 3, "height": 224, "width": 224 }] }],
    inputstip: '[1, 3, 224, 224]'
  }))
}

const distilbartCnn66Decoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '585 MB'],
    // // ['fp16', 'decoder_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_model_quantized.onnx', '147 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Summarization',
    tag: '',
    id: `distilbart_cnn_6_6_decoder_${dt}`,
    name: 'Distilbart CNN 6-6 Decoder',
    description: 'A text summarization model built upon a Transformer model.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/distilbart-cnn-6-6',
    hf: {
      model: 'xenova/distilbart-cnn-6-6',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 168], { "batch_size": 1, "decoder_sequence_length": 168 }],
      'encoder_attention_mask': ['int64', 1n, [1, 168], { "batch_size": 1, "encoder_sequence_length": 168 }],
      'encoder_hidden_states': ['float32', 1, [1, 168, 1024], { "batch_size": 1, "encoder_sequence_length": 168 }]
    }],
    inputstip: '[1, 168] [1, 168] [1, 168, 1024]'
  }))
}

const distilbartCnn66DecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '537 MB'],
    // // ['fp16', 'decoder_with_past_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '135 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Summarization',
    tag: '',
    id: `distilbart_cnn_6_6_decoder_with_past_${dt}`,
    name: 'Distilbart CNN 6-6 Decoder w/i Past',
    description: 'A text summarization model built upon a Transformer model.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/distilbart-cnn-6-6',
    hf: {
      model: 'xenova/distilbart-cnn-6-6',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 168], { "batch_size": 1, "encoder_sequence_length": 168 }],
      'input_ids': ['int64', 99n, [1, 1], {
        "batch_size": 1,
        "past_decoder_sequence_length": 168,
        "encoder_sequence_length_out": 168,
      }]
    }],
    inputstip: '[1, 168] [1, 1]'
  }))
}

const distilbartCnn66DecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '585 MB'],
    ['fp16', 'decoder_model_merged_fp16.onnx', '293 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '193 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Summarization',
    tag: '',
    id: `distilbart_cnn_6_6_decoder_merged_${dt}`,
    name: 'Distilbart CNN 6-6 Decoder KV-Cache',
    description: 'A text summarization model built upon a Transformer model.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/distilbart-cnn-6-6',
    hf: {
      model: 'xenova/distilbart-cnn-6-6',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 168], { "batch_size": 1, "encoder_sequence_length": 168 }],
      'input_ids': ['int64', 99n, [1, 168], { "batch_size": 1, "decoder_sequence_length": 168 }],
      'encoder_hidden_states': ['float32', 1, [1, 168, 1024], { "batch_size": 1, "encoder_sequence_length": 168 }],
      'use_cache_branch': ['bool', 1, [1], {
        "past_decoder_sequence_length": 168,
        "encoder_sequence_length_out": 168,
      }],
    }],
    inputstip: '[1, 168] [1, 168] [1, 168, 1024]'
  }))
}

const distilbartCnn66Encoder = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '488 MB'],
    ['fp16', 'encoder_model_fp16.onnx', '244 MB'],
    ['int8', 'encoder_model_quantized.onnx', '122.85 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Summarization',
    tag: '',
    id: `distilbart_cnn_6_6_encoder_${dt}`,
    name: 'Distilbart CNN 6-6 Encoder',
    description: 'A text summarization model built upon a Transformer model.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/distilbart-cnn-6-6',
    hf: {
      model: 'xenova/distilbart-cnn-6-6',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 168], { "batch_size": 1, "encoder_sequence_length": 168 }],
      'attention_mask': ['int64', 1n, [1, 168], { "batch_size": 1, "encoder_sequence_length": 168 }]
    }],
    inputstip: '[1, 168] [1, 168]'
  }))
}

const distilbertBaseUncased = () => {
  const configs = [
    ['fp32', 'model.onnx', '255 MB'],
    ['fp16', 'model_fp16.onnx', '127 MB'],
    ['int8', 'model_quantized.onnx', '64.5 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Fill-Mask',
    tag: '',
    id: `distilbert_base_uncased_${dt}`,
    name: 'DistilBERT Base Uncased',
    description: 'DistilBERT is a transformers model, smaller and faster than BERT, which was pretrained on the same corpus in a self-supervised fashion, using the BERT base model as a teacher.',
    note: '',
    source: 'https://huggingface.co/Xenova/distilbert-base-uncased',
    hf: {
      model: 'xenova/distilbert-base-uncased',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 50], { "batch_size": 1, "sequence_length": 50 }],
      'attention_mask': ['int64', 1n, [1, 50], { "batch_size": 1, "sequence_length": 50 }]
    }],
    inputstip: '[1, 50] [1, 50]'
  }))
}

const distilbertBaseCasedDistilledSquad = () => {
  const configs = [
    ['fp32', 'model.onnx', '248 MB'],
    ['fp16', 'model_fp16.onnx', '124 MB'],
    ['int8', 'model_quantized.onnx', '62.7 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Question Answering',
    tag: '',
    id: `distilbert_base_cased_distilled_squad_${dt}`,
    name: 'DistilBERT Base Cased Distilled Squad',
    description: 'A small, fast, cheap and light Transformer model trained by distilling BERT base.',
    note: '',
    source: 'https://huggingface.co/Xenova/distilbert-base-cased-distilled-squad',
    hf: {
      model: 'xenova/distilbert-base-cased-distilled-squad',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 262], { "batch_size": 1, "sequence_length": 262 }],
      'attention_mask': ['int64', 1n, [1, 262], { "batch_size": 1, "sequence_length": 262 }]
    }],
    inputstip: '[1, 262] [1, 262]'
  }))
}

const distilbertBaseUncasedMnli = () => {
  const configs = [
    ['fp32', 'model.onnx', '255 MB'],
    ['fp16', 'model_fp16.onnx', '127 MB'],
    ['int8', 'model_quantized.onnx', '64.4 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Zero-Shot Classification',
    tag: '',
    id: `distilbert_base_uncased_mnli_${dt}`,
    name: 'DistilBERT Base Uncased Mnli',
    description: 'An uncased DistilBERT model fine-tuned on Multi-Genre Natural Language Inference (MNLI) dataset for the zero-shot classification task.',
    note: '',
    source: 'https://huggingface.co/Xenova/distilbert-base-uncased-mnli',
    hf: {
      model: 'xenova/distilbert-base-uncased-mnli',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 50], { "batch_size": 1, "sequence_length": 50 }],
      'attention_mask': ['int64', 1n, [1, 50], { "batch_size": 1, "sequence_length": 50 }]
    }],
    inputstip: '[1, 50] [1, 50]'
  }))
}

const distilgpt2Decoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '313 MB'],
    ['fp16', 'decoder_model_fp16.onnx', '157 MB'],
    ['int8', 'decoder_model_quantized.onnx', '79.6 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '',
    id: `distilgpt2_decoder_${dt}`,
    name: 'DistilGPT2 Decoder',
    description: 'An English-language model pre-trained with the supervision of the smallest version of Generative Pre-trained Transformer 2 (GPT-2).',
    note: '',
    source: 'https://huggingface.co/Xenova/distilgpt2',
    hf: {
      model: 'xenova/distilgpt2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 16], { "batch_size": 1, "sequence_length": 16 }],
      'attention_mask': ['int64', 1n, [1, 16], { "batch_size": 1, "sequence_length": 16 }],
    }],
    inputstip: '[1, 16] [1, 16]'
  }))
}

const distilgpt2DecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '313 MB'],
    // // ['fp16', 'decoder_with_past_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '79.6 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '',
    id: `distilgpt2_decoder_with_past_${dt}`,
    name: 'DistilGPT2 Decoder w/i Past',
    description: 'An English-language model pre-trained with the supervision of the smallest version of Generative Pre-trained Transformer 2 (GPT-2).',
    note: '',
    source: 'https://huggingface.co/Xenova/distilgpt2',
    hf: {
      model: 'xenova/distilgpt2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "past_sequence_length": 16 }],
      'attention_mask': ['int64', 1n, [1, 16], { "batch_size": 1, "past_sequence_length + 1": 16 }]
    }],
    inputstip: '[1, 16] [1, 16]'
  }))
}

const distilgpt2DecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '314 MB'],
    // // ['fp16', 'decoder_merged_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '80.9 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '',
    id: `distilgpt2_decoder_merged_${dt}`,
    name: 'DistilGPT2 Decoder KV-Cache',
    description: 'An English-language model pre-trained with the supervision of the smallest version of Generative Pre-trained Transformer 2 (GPT-2).',
    note: '',
    source: 'https://huggingface.co/Xenova/distilgpt2',
    hf: {
      model: 'xenova/distilgpt2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 16], { "batch_size": 1, "sequence_length": 16 }],
      'attention_mask': ['int64', 1n, [1, 16], { "batch_size": 1, "attention_mask_sequence_length": 16 }],
      'use_cache_branch': ['bool', 1, [1], {
        "past_sequence_length": 16
      }]
    }],
    inputstip: '[1, 16] [1, 16]'
  }))
}

const distiluseBaseMultilingualCasedV2 = () => {
  const configs = [
    ['fp32', 'model.onnx', '514 MB'],
    ['fp16', 'model_fp16.onnx', '257 MB'],
    ['int8', 'model_quantized.onnx', '129 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Sentence Similarity',
    tag: '2h',
    id: `distiluse_base_multilingual_cased_v2_${dt}`,
    name: 'Distiluse Base Multilingual Cased v2',
    description: 'Maps sentences & paragraphs to a 512 dimensional dense vector space and can be used for tasks like clustering or semantic search.',
    note: '',
    source: 'https://huggingface.co/Xenova/distiluse-base-multilingual-cased-v2',
    hf: {
      model: 'xenova/distiluse-base-multilingual-cased-v2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 16], { "batch_size": 1, "sequence_length": 16 }],
      'attention_mask': ['int64', 1n, [1, 16], { "batch_size": 1, "sequence_length": 16 }],
    }],
    inputstip: '[1, 16] [1, 16]'
  }))
}

const distilMediumEnDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '332 MB'],
    ['int8', 'decoder_model_quantized.onnx', '84.6 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: `distil_medium_en_decoder_${dt}`,
    name: 'Distil-Whisper Decoder',
    description: 'ML-powered speech recognition, 49% smaller, 4.2x faster Whisper Speech Recognition model.',
    note: '',
    source: 'https://huggingface.co/distil-whisper/distil-medium.en',
    hf: {
      model: 'distil-whisper/distil-medium.en',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 1, "past_decoder_sequence_length": 1, "encoder_sequence_length_out": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 1500, 1024], { "batch_size": 1, "encoder_sequence_length / 2": 1500 }]
    }],
    inputstip: '[1, 1] [1, 1500, 1024]'
  }))
}

const distilMediumEnDecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '316 MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '80.6 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: `distil_medium_en_decoder_with_past_${dt}`,
    name: 'Distil-Whisper Decoder w/i Past',
    description: 'ML-powered speech recognition, 49% smaller, 4.2x faster Whisper Speech Recognition model.',
    note: '',
    source: 'https://huggingface.co/distil-whisper/distil-medium.en',
    hf: {
      model: 'distil-whisper/distil-medium.en',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "past_decoder_sequence_length": 1, "encoder_sequence_length_out": 1500 }],
    }],
    inputstip: '[1, 1]'
  }))
}

const distilMediumEnDecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '332 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '84.7 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: `distil_medium_en_decoder_merged_${dt}`,
    name: 'Distil-Whisper Decoder KV-Cache',
    description: 'ML-powered speech recognition, 49% smaller, 4.2x faster Whisper Speech Recognition model.',
    note: '',
    source: 'https://huggingface.co/distil-whisper/distil-medium.en',
    hf: {
      model: 'distil-whisper/distil-medium.en',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 1, "past_decoder_sequence_length": 1, "encoder_sequence_length_out": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 1500, 1024], { "batch_size": 1, "encoder_sequence_length / 2": 1500 }],
      'use_cache_branch': ['bool', 1, [1], {}]
    }],
    inputstip: '[1, 1] [1, 1500, 1024] [1]'
  }))
}

const distilMediumEnEncoder = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '1.14 GB'],
    ['int8', 'encoder_model_quantized.onnx', '298 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: `distil_medium_en_encoder_${dt}`,
    name: 'Distil-Whisper Encoder',
    description: 'ML-powered speech recognition, 49% smaller, 4.2x faster Whisper Speech Recognition model',
    note: 'Large model',
    source: 'https://huggingface.co/distil-whisper/distil-medium.en',
    hf: {
      model: 'distil-whisper/distil-medium.en',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_features': ['float32', 'random', [1, 80, 3000], { "batch_size": 1, "feature_size": 80, "encoder_sequence_length": 3000 }],
    }],
    inputstip: '[1, 80, 3000]'
  }))
}

const esrgan = () => {
  const configs = [
    // tile size, float bits, est. VRAM requirement
    // [64, 32, 1],
    // [64, 16, 1],
    // [128, 32, 2],
    // [128, 16, 2],
    [256, 32, 4],
    [256, 16, 4],
    // [512, 32, 8],
    // [512, 16, 8],
    // [1024, 32, 16],
    // [1024, 16, 16],
  ]
  return configs.map(([tile, fp, vram]) => ({
    category: 'Image-to-Image',
    tag: '',
    id: `realesrgan_x4_${tile}_fp${fp}`,
    name: `RealESRGAN x4 ${tile}`,
    description: `Image Super-Resolution x4, tile size = ${tile}, recommended VRAM >${vram} GB`,
    note: tile == 1024 ? 'Out-of-memory test model, run this model tests individually rather than together with other models. Slow on CPU' : 'Slow on CPU',
    source: `RealESRGAN_x4plus_fp${fp}_t${tile}_torchscript.onnx`,
    model: fp == 16 ? `fp16/realesrgan/RealESRGAN_x4plus_fp${fp}_t${tile}_torchscript.onnx` : `realesrgan/RealESRGAN_x4plus_fp${fp}_t${tile}_torchscript.onnx`,
    size: fp == 16 ? "35.2 MB" : '65 MB',
    format: 'onnx',
    datatype: `fp${fp}`,
    inputs: [{ [`in_image_float${fp}_rgb01`]: [`float${fp}`, 'random', [1, 3, tile, tile], {}] }],
    inputstip: `[1, 3, ${tile}, ${tile}]`
  }))
}

const faceParsing = () => {
  const configs = [
    ['fp32', 'model.onnx', '221 MB'],
    // ['fp16', 'model_fp16.onnx', ' MB'],
    ['int8', 'model_quantized.onnx', '56.2 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Segmentation',
    tag: '',
    id: `face_parsing_${dt}`,
    name: 'Face Parsing',
    description: 'Fine-tuned from nvidia/mit-b5 with CelebAMask-HQ for face parsing.',
    note: '',
    source: 'https://huggingface.co/jonathandinu/face-parsing',
    hf: {
      model: 'jonathandinu/face-parsing',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 512, 512], { "batch_size": 1 ,"num_channels": 3, "height": 512, "width": 512}]
    }],
    inputstip: '[1, 3, 512, 512]'
  }))
}

const flanT5SmallDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '221 MB'],
    // ['fp16', 'decoder_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_model_quantized.onnx', '56.2 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `flan_t5_small_decoder_${dt}`,
    name: 'FLAN-T5 Small Decoder',
    description: 'If you already know T5, FLAN-T5 is just better at everything. Flan-PaLM 540B achieves state-of-the-art performance on several benchmarks, such as 75.2% on five-shot MMLU.',
    note: '',
    source: 'https://huggingface.co/Xenova/flan-t5-small',
    hf: {
      model: 'xenova/flan-t5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "decoder_sequence_length": 128 }],
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 128] [1, 128, 512]'
  }))
}

const flanT5SmallDecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '209 MB'],
    // ['fp16', 'decoder_with_past_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '147 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `flan_t5_small_decoder_with_past_${dt}`,
    name: 'FLAN-T5 Small Decoder w/i Past',
    description: 'If you already know T5, FLAN-T5 is just better at everything. Flan-PaLM 540B achieves state-of-the-art performance on several benchmarks, such as 75.2% on five-shot MMLU.',
    note: '',
    source: 'https://huggingface.co/Xenova/flan-t5-small',
    hf: {
      model: 'xenova/flan-t5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "past_decoder_sequence_length": 128, "encoder_sequence_length_out": 128 }],
      'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 1] [1, 128, 512]'
  }))
}

const flanT5SmallDecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '222 MB'],
    ['fp16', 'decoder_model_merged_fp16.onnx', ' 111 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '56.5 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `flan_t5_small_decoder_merged_${dt}`,
    name: 'FLAN-T5 Small Decoder KV-Cache',
    description: 'If you already know T5, FLAN-T5 is just better at everything. Flan-PaLM 540B achieves state-of-the-art performance on several benchmarks, such as 75.2% on five-shot MMLU.',
    note: '',
    source: 'https://huggingface.co/Xenova/flan-t5-small',
    hf: {
      model: 'xenova/flan-t5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "decoder_sequence_length": 128 }],
      'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'use_cache_branch': ['bool', 1, [1], {
        "past_decoder_sequence_length": 128,
        "encoder_sequence_length_out": 128
      }]
    }],
    inputstip: '[1, 128] [1, 128] [1, 128, 512]'
  }))
}

const flanT5SmallEncoder = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '134 MB'],
    ['fp16', 'encoder_model_fp16.onnx', ' 67.5 MB'],
    ['int8', 'encoder_model_quantized.onnx', '34.1 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `flan_t5_small_encoder_${dt}`,
    name: 'FLAN-T5 Small Encoder',
    description: 'If you already know T5, FLAN-T5 is just better at everything. Flan-PaLM 540B achieves state-of-the-art performance on several benchmarks, such as 75.2% on five-shot MMLU.',
    note: '',
    source: 'https://huggingface.co/Xenova/flan-t5-small',
    hf: {
      model: 'xenova/flan-t5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 128]'
  }))
}

const florence2Decoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '370 MB'],
    ['fp16', 'decoder_model_fp16.onnx', '185 MB'],
    ['int8', 'decoder_model_quantized.onnx', '93.2 MB'],
    ['int4', 'decoder_model_q4.onnx', '61 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_decoder_${dt}`,
    name: 'Florence-2 Base Decoder',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/onnx-community/Florence-2-base',
    hf: {
      model: 'onnx-community/florence-2-base',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 512, 768], { "batch_size": 1, "decoder_sequence_length": 512 }],
      'encoder_attention_mask': ['int64', 99n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'encoder_hidden_states': ['float32', 'random', [1, 512, 768], { "batch_size": 1, "encoder_sequence_length": 512 }],
    }],
    inputstip: '[1, 512, 768] [1, 512] [1, 512, 768]'
  }))
}

const florence2DecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '370 MB'],
    ['fp16', 'decoder_model_merged_fp16.onnx', '185 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '93.6 MB'],
    ['int4', 'decoder_model_merged_q4.onnx', '61.4 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_decoder_merged_${dt}`,
    name: 'Florence-2 Base Decoder KV-Cache',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/onnx-community/Florence-2-base',
    hf: {
      model: 'onnx-community/florence-2-base',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 16, 768], { "batch_size": 1, "decoder_sequence_length": 16, "past_decoder_sequence_length": 16, "encoder_sequence_length_out": 512 }],
      'encoder_attention_mask': ['int64', 99n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'encoder_hidden_states': ['float32', 'random', [1, 512, 768], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'use_cache_branch': ['bool', 1, [1], {}]
    }],
    inputstip: '[1, 16, 768] [1, 512] [1, 512, 768]'
  }))
}

const florence2DecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '343 MB'],
    ['fp16', 'decoder_with_past_model_fp16.onnx', '171 MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '86.3 MB'],
    ['int4', 'decoder_with_past_model_q4.onnx', '56.7 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_decoder_with_past_${dt}`,
    name: 'Florence-2 Base Decoder w/i Past',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/onnx-community/Florence-2-base',
    hf: {
      model: 'onnx-community/florence-2-base',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 16, 768], { "batch_size": 1, "past_decoder_sequence_length": 16, "encoder_sequence_length_out": 512 }],
      'encoder_attention_mask': ['int64', 99n, [1, 512], { "batch_size": 1, "encoder_sequence_length_out": 512 }],
    }],
    inputstip: '[1, 16, 768] [1, 512]'
  }))
}

const florence2Encoder = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '165 MB'],
    ['fp16', 'encoder_model_fp16.onnx', '82.7 MB'],
    ['int8', 'encoder_model_quantized.onnx', '41.6 MB'],
    ['int4', 'encoder_model_q4.onnx', '28.6 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_encoder_${dt}`,
    name: 'Florence-2 Base Encoder',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/onnx-community/Florence-2-base',
    hf: {
      model: 'onnx-community/florence-2-base',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 512, 768], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'attention_mask': ['int64', 1n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
    }],
    inputstip: '[1, 512, 768] [1, 512]'
  }))
}

const florence2EmbedTokens = () => {
  const configs = [
    ['fp32', 'embed_tokens.onnx', '150 MB'],
    ['fp16', 'embed_tokens_fp16.onnx', '75.1 MB'],
    ['int8', 'embed_tokens_quantized.onnx', '37.5 MB'],
    ['int4', 'embed_tokens_q4.onnx', '150 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_embed_tokens_${dt}`,
    name: 'Florence-2 Base Embed Tokens',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/onnx-community/Florence-2-base',
    hf: {
      model: 'onnx-community/florence-2-base',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 512], { "batch_size": 1, "sequence_length": 512 }],
    }],
    inputstip: '[1, 512]'
  }))
}

const florence2VisionEncoder = () => {
  const configs = [
    ['fp32', 'vision_encoder.onnx', '349 MB'],
    ['fp16', 'vision_encoder_fp16.onnx', '175 MB'],
    ['int8', 'vision_encoder_quantized.onnx', '77.5 MB'],
    ['int4', 'vision_encoder_q4.onnx', '89.4 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_vision_encoder_${dt}`,
    name: 'Florence-2 Base Vision Encoder',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/onnx-community/Florence-2-base',
    hf: {
      model: 'onnx-community/florence-2-base',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "batch_size": 1, "height": 30, "width": 30 }],
    }],
    inputstip: '[1, 3, 30, 30]'
  }))
}

const florence2ConditionalDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '7.44 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_conditional_decoder_${dt}`,
    name: 'Florence 2 For Conditional Generation Decoder',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-Florence2ForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-florence2forconditionalgeneration',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 16, 32], { "batch_size": 1, "decoder_sequence_length": 16 }],
      'encoder_attention_mask': ['int64', 99n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'encoder_hidden_states': ['float32', 'random', [1, 512, 32], { "batch_size": 1, "encoder_sequence_length": 512 }],
    }],
    inputstip: '[1, 16, 32] [1, 512] [1, 512, 32]'
  }))
}

const florence2ConditionalDecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '7.50 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_conditional_decoder_merged_${dt}`,
    name: 'Florence 2 For Conditional Generation Decoder KV-Cache',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-Florence2ForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-florence2forconditionalgeneration',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 16, 32], { "batch_size": 1, "decoder_sequence_length": 16, "past_decoder_sequence_length": 16, "encoder_sequence_length_out": 512 }],
      'encoder_attention_mask': ['int64', 99n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'encoder_hidden_states': ['float32', 'random', [1, 512, 32], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'use_cache_branch': ['bool', 1, [1], {}]
    }],
    inputstip: '[1, 16, 32] [1, 512] [1, 512, 32]'
  }))
}

const florence2ConditionalDecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '7.43 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_conditional_decoder_with_past_${dt}`,
    name: 'Florence 2 For Conditional Generation Decoder w/i Past',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-Florence2ForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-florence2forconditionalgeneration',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 16, 32], { "batch_size": 1, "past_decoder_sequence_length": 16, "encoder_sequence_length_out": 512 }],
      'encoder_attention_mask': ['int64', 99n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
    }],
    inputstip: '[1, 16, 32] [1, 512]'
  }))
}

const florence2ConditionalEncoder = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '4.82 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_conditional_encoder_${dt}`,
    name: 'Florence 2 For Conditional Generation Encoder',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-Florence2ForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-florence2forconditionalgeneration',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 512, 32], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'attention_mask': ['int64', 1n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
    }],
    inputstip: '[1, 512, 32] [1, 512]'
  }))
}

const florence2ConditionalEmbedTokens = () => {
  const configs = [
    ['fp32', 'embed_tokens.onnx', '6.26 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_conditional_embed_tokens_${dt}`,
    name: 'Florence 2 For Conditional Generation Embed Tokens',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-Florence2ForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-florence2forconditionalgeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 512], { "batch_size": 1, "sequence_length": 512 }],
    }],
    inputstip: '[1, 512]'
  }))
}

const florence2ConditionalVisionEncoder = () => {
  const configs = [
    ['fp32', 'vision_encoder.onnx', '2.62 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `florence2_conditional_vision_encoder_${dt}`,
    name: 'Florence 2 For Conditional Generation Vision Encoder',
    description: 'An advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tasks',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-Florence2ForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-florence2forconditionalgeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "batch_size": 1, "height": 30, "width": 30 }],
    }],
    inputstip: '[1, 3, 30, 30]'
  }))
}

const gemma2bItMerged = () => {
  const configs = [
    ['int4', 'model.onnx', '150 KB', 'model.onnx.data', '2.29 GB'],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `gemma_2b_it_merged_${dt}`,
    name: 'Gemma 2B IT KV-Cache',
    description: 'Gemma is a family of lightweight, state-of-the-art open models from Google, text-to-text, decoder-only. ONNX model converted by https://huggingface.co/EmbeddedLLM/gemma-2b-it-onnx',
    note: 'Large model with external data.',
    source: 'https://huggingface.co/webml/gemma-2b-it',
    hf: {
      model: 'webml/gemma-2b-it',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} + ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1, "past_sequence_length": 1 }],
      'attention_mask': ['int64', 1n, [1, 1], { "batch_size": 1, "total_sequence_length": 1 }],
      'position_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
    }],
    inputstip: '[1, 1] [1, 1] [1, 1]'
  }))
}

const gteBaseEnV1_5 = () => {
  const configs = [
    ['fp32', 'model.onnx', '530 MB'],
    ['fp16', 'model_fp16.onnx', '265 MB'],
    ['int8', 'model_quantized.onnx', '139 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Sentence Similarity',
    tag: '2h',
    id: `gte_base_en_v1_5_${dt}`,
    name: 'General Text Embeddings (GTE) Base EN v1.5',
    description: 'GTE-v1.5 series upgraded gte embeddings that support the context length of up to 8192, while further enhancing model performance. The models are built upon the transformer++ encoder backbone (BERT + RoPE + GLU).',
    note: 'Large model',
    source: 'https://huggingface.co/Alibaba-NLP/gte-base-en-v1.5',
    hf: {
      model: 'alibaba-nlp/gte-base-en-v1.5',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 16], { "batch_size": 1, "sequence_length": 16 }],
      'attention_mask': ['int64', 1n, [1, 16], { "batch_size": 1, "sequence_length": 16 }]
    }],
    inputstip: '[1, 16] [1, 16] [1, 16]'
  }))
}

const gteSmall = () => {
  const configs = [
    ['fp32', 'model.onnx', '126 MB'],
    ['fp16', 'model_fp16.onnx', '63.6 MB'],
    ['int8', 'model_quantized.onnx', '32.4 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Sentence Similarity',
    tag: '2h',
    id: `gte_small_${dt}`,
    name: 'General Text Embeddings (GTE) Small',
    description: 'To be applied to various downstream tasks of text embeddings, including information retrieval, semantic textual similarity, text reranking, etc.',
    note: '',
    source: 'https://huggingface.co/Supabase/gte-small',
    hf: {
      model: 'supabase/gte-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 16], { "batch_size": 1, "sequence_length": 16 }],
      'attention_mask': ['int64', 1n, [1, 16], { "batch_size": 1, "sequence_length": 16 }],
      'token_type_ids': ['int64', 1n, [1, 16], { "batch_size": 1, "sequence_length": 16 }],
    }],
    inputstip: '[1, 16] [1, 16] [1, 16]'
  }))
}

const jinaClipV1Text = () => {
  const configs = [
    ['fp32', 'text_model.onnx', '522 MB'],
    ['fp16', 'text_model_fp16.onnx', '261 MB'],
    ['int8', 'text_model_quantized.onnx', '131 MB'],
    ['int4', 'text_model_q4.onnx', '157 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '2h',
    id: `jina_clip_v1_text_${dt}`,
    name: 'Jina CLIP v1 (Text)',
    description: 'A state-of-the-art English multimodal (text-image) embedding model.',
    note: 'Large model',
    source: 'https://huggingface.co/jinaai/jina-clip-v1',
    hf: {
      model: 'jinaai/jina-clip-v1',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 101n, [1, 16], { "batch_size": 1, "sequence_length": 16 }]
    }],
    inputstip: '[1, 16]'
  }))
}

const jinaClipV1Vision = () => {
  const configs = [
    ['fp32', 'vision_model.onnx', '327 MB'],
    ['fp16', 'vision_model_fp16.onnx', '164 MB'],
    ['int8', 'vision_model_quantized.onnx', '83.7 MB'],
    ['int4', 'vision_model_q4.onnx', '54.5 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '2h',
    id: `jina_clip_v1_vision_${dt}`,
    name: 'Jina CLIP v1 (Vision)',
    description: 'A state-of-the-art English multimodal (text-image) embedding model.',
    note: '',
    source: 'https://huggingface.co/jinaai/jina-clip-v1',
    hf: {
      model: 'jinaai/jina-clip-v1',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1 }],
    }],
    inputstip: '[1, 3, 224, 224]'
  }))
}

const jinaEmbeddingsV2BaseCode = () => {
  const configs = [
    ['fp32', 'model.onnx', '611 MB'],
    ['fp16', 'model_fp16.onnx', '306 MB'],
    ['int8', 'model_quantized.onnx', '154 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '2h',
    id: `jina_embeddings_v2_base_code_${dt}`,
    name: 'Jina Embeddings v2 Base Code',
    description: 'An multilingual embedding model speaks English and 30 widely used programming languages. Same as other jina-embeddings-v2 series, it supports 8192 sequence length.',
    note: 'Large model',
    source: 'https://huggingface.co/jinaai/jina-embeddings-v2-base-code',
    hf: {
      model: 'jinaai/jina-embeddings-v2-base-code',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [2, 26], { "batch": 2, "sequence": 26 }],
      'attention_mask': ['int64', 1n, [2, 26], { "batch": 2, "sequence": 26 }],
    }],
    inputstip: '[2, 26] [2, 26]'
  }))
}

const jinaRerankerV1TurboEn = () => {
  const configs = [
    ['fp32', 'model.onnx', '144 MB'],
    ['fp16', 'model_fp16.onnx', '72.2 MB'],
    ['int8', 'model_quantized.onnx', '36.5 MB'],
    ['int4', 'model_q4.onnx', '98.7 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Classification',
    tag: '2h',
    id: `jina_reranker_v1_turbo_en_${dt}`,
    name: 'Jina Reranker v1 Turbo EN',
    description: 'Leverages the power of our JinaBERT model as its foundation, processing significantly longer sequences of text compared to other reranking models, up to an impressive 8,192 tokens.',
    note: '',
    source: 'https://huggingface.co/jinaai/jina-reranker-v1-turbo-en',
    hf: {
      model: 'jinaai/jina-reranker-v1-turbo-en',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 2n, [10, 20], { "batch": 10, "sequence": 20 }],
      'attention_mask': ['int64', 1n, [10, 20], { "batch": 10, "sequence": 20 }],
    }],
    inputstip: '[10, 20] [10, 20]'
  }))
}

const llama2CStories15MDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '58.2 MB'],
    ['fp16', 'decoder_model_fp16.onnx', '29.2 MB'],
    ['int8', 'decoder_model_quantized.onnx', '14.9 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llama2_c_stories15m_decoder_${dt}`,
    name: 'llama2.c Stories 15M Decoder',
    description: 'Llama 2 LLM architecture',
    note: '',
    source: 'https://huggingface.co/Xenova/llama2.c-stories15M',
    hf: {
      model: 'xenova/llama2.c-stories15m',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 5], { "batch_size": 1, "sequence_length": 5 }],
      'attention_mask': ['int64', 1n, [1, 5], { "batch_size": 1, "past_sequence_length + 1": 5 }],
    }],
    inputstip: '[1, 5] [1, 5]'
  }))
}

const llama2CStories15MDecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '58.5 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '15.3 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llama2_c_stories15m_decoder_merged_${dt}`,
    name: 'llama2.c Stories 15M Decoder KV-Cache',
    description: 'Llama 2 LLM architecture',
    note: '',
    source: 'https://huggingface.co/Xenova/llama2.c-stories15M',
    hf: {
      model: 'xenova/llama2.c-stories15m',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 5], { "batch_size": 1, "sequence_length": 5, "past_sequence_length": 4 }],
      'attention_mask': ['int64', 1n, [1, 1], { "batch_size": 1, "attention_mask_sequence_length": 1 }],
      'use_cache_branch': ['bool', 1, [1], {}]
    }],
    inputstip: '[1, 5] [1, 1] [1]'
  }))
}

const llama2CStories15MDecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '58.2 MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '14.9 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llama2_c_stories15m_decoder_with_past_${dt}`,
    name: 'llama2.c Stories 15M Decoder w/i Past',
    description: 'Llama 2 LLM architecture',
    note: '',
    source: 'https://huggingface.co/Xenova/llama2.c-stories15M',
    hf: {
      model: 'xenova/llama2.c-stories15m',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1 }],
      'attention_mask': ['int64', 1n, [1, 6], { "batch_size": 1, "past_sequence_length + 1": 6 }],
    }],
    inputstip: '[1, 1] [1, 6]'
  }))
}

const llavaDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '6.05 MB'],
    ['fp16', 'decoder_model_fp16.onnx', '5.09 MB'],
    ['int8', 'decoder_model_quantized.onnx', '4.61 MB'],
    ['int4', 'decoder_model_q4.onnx', '4.69 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llava_decoder_${dt}`,
    name: 'Llava Decoder',
    description: 'Tiny Random Llava For Conditional Generation',
    note: 'https://huggingface.co/docs/transformers/main/en/model_doc/llava',
    source: 'https://huggingface.co/Xenova/tiny-random-LlavaForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-llavaforconditionalgeneration',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 576, 16], { "batch_size": 1, "sequence_length": 576 }],
      'attention_mask': ['int64', 1n, [1, 576], { "batch_size": 1, "sequence_length": 576 }],
    }],
    inputstip: '[1, 576, 16] [1, 576]'
  }))
}

const llavaDecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '10.1 MB'],
    ['fp16', 'decoder_model_merged_fp16.onnx', '9.19 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '8.73 MB'],
    ['int4', 'decoder_model_merged_q4.onnx', '8.76 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llava_decoder_merged_${dt}`,
    name: 'Llava Decoder KV-Cache',
    description: 'Tiny Random Llava For Conditional Generation',
    note: 'https://huggingface.co/docs/transformers/main/en/model_doc/llava',
    source: 'https://huggingface.co/Xenova/tiny-random-LlavaForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-llavaforconditionalgeneration',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 576, 16], { "batch_size": 1, "sequence_length": 576, "past_sequence_length": 576 }],
      'attention_mask': ['int64', 1n, [1, 1], { "batch_size": 1, "attention_mask_sequence_length": 1 }],
      'use_cache_branch': ['bool', 1, [1], {}]
    }],
    inputstip: '[1, 576, 16] [1, 1] [1]'
  }))
}

const llavaDecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '6.05 MB'],
    ['fp16', 'decoder_with_past_model_fp16.onnx', '5.09 MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '4.61 MB'],
    ['int4', 'decoder_with_past_model_q4.onnx', '4.69 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llava_decoder_with_past_${dt}`,
    name: 'Llava Decoder w/i Past',
    description: 'Tiny Random Llava For Conditional Generation',
    note: 'https://huggingface.co/docs/transformers/main/en/model_doc/llava',
    source: 'https://huggingface.co/Xenova/tiny-random-LlavaForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-llavaforconditionalgeneration',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 576, 16], { "batch_size": 1, "sequence_length": 576 }],
      'attention_mask': ['int64', 1n, [1, 576], { "batch_size": 1, "past_sequence_length + 1": 576 }],
    }],
    inputstip: '[1, 576, 16] [1, 576]'
  }))
}

const llavaEmbedTokens = () => {
  const configs = [
    ['fp32', 'embed_tokens.onnx', '1.95 MB'],
    ['fp16', 'embed_tokens_fp16.onnx', '0.97 MB'],
    ['int8', 'embed_tokens_quantized.onnx', '500 KB'],
    ['int4', 'embed_tokens_q4.onnx', '1.95 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llava_embed_tokens_${dt}`,
    name: 'Llava Embed Tokens',
    description: 'Tiny Random Llava For Conditional Generation',
    note: 'https://huggingface.co/docs/transformers/main/en/model_doc/llava',
    source: 'https://huggingface.co/Xenova/tiny-random-LlavaForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-llavaforconditionalgeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 576], { "batch_size": 1, "sequence_length": 576 }],
    }],
    inputstip: '[1, 576]'
  }))
}

const llavaVisionEncoder = () => {
  const configs = [
    ['fp32', 'vision_encoder.onnx', '100 KB'],
    ['fp16', 'vision_encoder_fp16.onnx', '84.9 KB'],
    ['int8', 'vision_encoder_quantized.onnx', '83.5 KB'],
    ['int4', 'vision_encoder_q4.onnx', '78.4 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llava_vision_encoder_${dt}`,
    name: 'Llava Vision Encoder',
    description: 'Tiny Random Llava For Conditional Generation',
    note: 'https://huggingface.co/docs/transformers/main/en/model_doc/llava',
    source: 'https://huggingface.co/Xenova/tiny-random-LlavaForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-llavaforconditionalgeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "batch_size": 1 }],
    }],
    inputstip: '[1, 3, 30, 30]'
  }))
}

const llavaPhiDecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '2.19 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llava_phi_decoder_merged_${dt}`,
    name: '[Undefined] Llava Phi Decoder KV-Cache',
    description: 'Tiny Random Llava For Conditional Generation Phi',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-LlavaForConditionalGeneration_phi',
    hf: {
      model: 'xenova/tiny-random-llavaforconditionalgeneration_phi',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'position_ids': ['int64', 99n, [1, 576], { "batch_size": 1, "sequence_length": 576, "past_sequence_length": 575 }],
      'inputs_embeds': ['float32', 'random', [1, 576, 16], { "batch_size": 1, "sequence_length": 576 }],
      'attention_mask': ['int64', 1n, [1, 576], { "batch_size": 1, "past_sequence_length + 1": 576 }],
    }],
    inputstip: '[1, 576, 16] [1, 576, 16] [1, 576]'
  }))
}

const llavaPhiEmbedTokens = () => {
  const configs = [
    ['fp32', 'embed_tokens.onnx', '1.95 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llava_phi_embed_tokens_${dt}`,
    name: 'Llava Phi Embed Tokens',
    description: 'Tiny Random Llava For Conditional Generation Phi',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-LlavaForConditionalGeneration_phi',
    hf: {
      model: 'xenova/tiny-random-llavaforconditionalgeneration_phi',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 256], { "batch_size": 1, "sequence_length": 256 }],
    }],
    inputstip: '[1, 256]'
  }))
}

const llavaPhiVisionEncoder = () => {
  const configs = [
    ['fp32', 'vision_encoder.onnx', '100 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `llava_phi_vision_encoder_${dt}`,
    name: 'Llava Phi Vision Encoder',
    description: 'Tiny Random Llava For Conditional Generation Phi',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/tiny-random-LlavaForConditionalGeneration_phi',
    hf: {
      model: 'xenova/tiny-random-llavaforconditionalgeneration_phi',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "batch_size": 1 }],
    }],
    inputstip: '[1, 3, 30, 30]'
  }))
}

const mobileVitSmall = () => {
  const configs = [
    ['fp32', 'model.onnx', '21.5 MB'],
    ['fp16', 'model_fp16.onnx', '11.0 MB'],
    ['int8', 'model_quantized.onnx', '6.01 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Classification',
    tag: '',
    id: `mobilevit_small_${dt}`,
    name: 'MobileViT Small',
    description: 'MobileViT model pre-trained on ImageNet-1k at resolution 256x256. It was introduced in MobileViT: Light-weight, General-purpose, and Mobile-friendly Vision Transformer.',
    note: '',
    source: 'https://huggingface.co/Xenova/mobilevit-small',
    hf: {
      model: 'xenova/mobilevit-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{ 'pixel_values': ['float32', 'random', [1, 3, 256, 256], { "batch_size": 1, "num_channels": 3, "height": 256, "width": 256 }] }],
    inputstip: '[1, 3, 256, 256]'
  }))
}

const moondream2DecoderMerged = () => {
  const configs = [
    ['fp16', 'decoder_model_merged_fp16.onnx', '194 MB', 'decoder_model_merged_fp16.onnx_data', '2.25 GB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '1.22 GB', '', ''],
    ['int4', 'decoder_model_merged_q4.onnx', '786 MB', '', ''],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `moondream2_decoder_merged_${dt}`,
    name: '[Undefined] moondream2 Decoder KV-Cache',
    description: 'A small vision language model designed to run efficiently on edge devices',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/moondream2',
    hf: {
      model: 'xenova/moondream2',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'position_ids': ['int64', 99n, [1, 256], { "batch_size": 1, "sequence_length": 256, "past_sequence_length": 255 }],    
      'attention_mask': ['int64', 1n, [1, 256], { "batch_size": 1, "past_sequence_length + 1": 256 }],  
      'inputs_embeds': ['float32', 'random', [1, 256, 2048], { "batch_size": 1, "sequence_length": 256 }],
    }],
    inputstip: '[1, 256] [1, 256] [1, 256, 2048]'
  }))
}

const moondream2EmbedTokens = () => {
  const configs = [
    ['fp16', 'embed_tokens_fp16.onnx', '200 MB'],
    ['int8', 'embed_tokens_quantized.onnx', '100 MB'],
    ['int4', 'embed_tokens_q4.onnx', '400 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `moondream2_embed_tokens_${dt}`,
    name: 'moondream2 Embed Tokens',
    description: 'A small vision language model designed to run efficiently on edge devices',
    note: '',
    source: 'https://huggingface.co/Xenova/moondream2',
    hf: {
      model: 'xenova/moondream2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 256], { "batch_size": 1, "sequence_length": 256 }],
    }],
    inputstip: '[1, 256]'
  }))
}

const moondream2VisionEncoder = () => {
  const configs = [
    ['fp16', 'vision_encoder_fp16.onnx', '838 MB'],
    ['int8', 'vision_encoder_quantized.onnx', '423 MB'],
    ['int4', 'vision_encoder_q4.onnx', '266 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '2h',
    id: `moondream2_vision_encoder_${dt}`,
    name: 'moondream2 Vision Encoder',
    description: 'A small vision language model designed to run efficiently on edge devices',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/moondream2',
    hf: {
      model: 'xenova/moondream2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 378, 378], { "batch_size": 1 }],
    }],
    inputstip: '[1, 3, 378, 378]'
  }))
}

const msmarcoDistilbertBaseV4 = () => {
  const configs = [
    ['fp32', 'model.onnx', '253 MB'],
    ['fp16', 'model_fp16.onnx', ' 126 MB'],
    ['int8', 'model_quantized.onnx', '63.8 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Sentence Similarity',
    tag: '',
    id: `msmarco_distilbert_base_v4_${dt}`,
    name: 'MS MARCO DistilBert Base v4',
    description: 'Maps sentences & paragraphs to a 768 dimensional dense vector space and can be used for tasks like clustering or semantic search.',
    note: '',
    source: 'https://huggingface.co/Xenova/msmarco-distilbert-base-v4',
    hf: {
      model: 'xenova/msmarco-distilbert-base-v4',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 50], { "batch_size": 1, "sequence_length": 50 }],
      'attention_mask': ['int64', 1n, [1, 50], { "batch_size": 1, "sequence_length": 50 }]
    }],
    inputstip: '[1, 50] [1, 50]'
  }))
}

const mt5SmallDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '1.04 GB'],
    // ['fp16', 'decoder_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_model_quantized.onnx', '270 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `mt5_small_decoder_${dt}`,
    name: 'mT5 Small Decoder',
    description: 'mT5 is pretrained on the mC4 corpus, covering 101 languages',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/mt5-small',
    hf: {
      model: 'xenova/mt5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "decoder_sequence_length": 128 }],
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 128] [1, 128, 512]'
  }))
}

const mt5SmallDecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '1.03 GB'],
    // ['fp16', 'decoder_with_past_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '147 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `mt5_small_decoder_with_past_${dt}`,
    name: 'mT5 Small Decoder w/i Past',
    description: 'mT5 is pretrained on the mC4 corpus, covering 101 languages',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/mt5-small',
    hf: {
      model: 'xenova/mt5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 128, "past_decoder_sequence_length": 128, "encoder_sequence_length_out": 128 }],
      'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 1] [1, 128, 512]'
  }))
}

const mt5SmallDecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '1.04 GB'],
    ['fp16', 'decoder_model_merged_fp16.onnx', '537 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '147 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `mt5_small_decoder_merged_${dt}`,
    name: 'mT5 Small Decoder KV-Cache',
    description: 'mT5 is pretrained on the mC4 corpus, covering 101 languages',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/mt5-small',
    hf: {
      model: 'xenova/mt5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "decoder_sequence_length": 128 }],
      'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'use_cache_branch': ['bool', 1, [1], {
        "past_decoder_sequence_length": 128,
        "encoder_sequence_length_out": 128
      }]
    }],
    inputstip: '[1, 128] [1, 128] [1, 128, 512]'
  }))
}

const mt5SmallEncoder = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '560 MB'],
    ['fp16', 'encoder_model_fp16.onnx', '280 MB'],
    ['int8', 'encoder_model_quantized.onnx', '140 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `mt5_small_encoder_${dt}`,
    name: 'mT5 Small Encoder',
    description: 'mT5 is pretrained on the mC4 corpus, covering 101 languages',
    note: 'Large modelIt is recommended to run tests on this large model individually rather than together with other models.',
    source: 'https://huggingface.co/Xenova/mt5-small',
    hf: {
      model: 'xenova/mt5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 128]'
  }))
}
const mxbaiEmbedLargeV1 = () => {
  const configs = [
    ['fp32', 'model.onnx', '1.24 GB'],
    ['fp16', 'model_fp16.onnx', '637 MB'],
    ['int8', 'model_quantized.onnx', '321 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '2h',
    id: `mxbai_embed_large_v1_${dt}`,
    name: 'MxbAI Embed Large v1',
    description: 'The crispy sentence embedding family from mixedbread ai, provideing several ways to produce sentence embeddings.',
    note: 'Large model',
    source: 'https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1',
    hf: {
      model: 'mixedbread-ai/mxbai-embed-large-v1',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 101n, [5, 18], { "batch_size": 5, "sequence_length": 18 }],
      'attention_mask': ['int64', 1n, [5, 18], { "batch_size": 5, "sequence_length": 18 }],
      'token_type_ids': ['int64', 0n, [5, 18], { "batch_size": 5, "sequence_length": 18 }],
    }],
    inputstip: '[5, 18] [5, 18] [5, 18]'
  }))
}

const mxbaiRerankBaseV1 = () => {
  const configs = [
    ['fp32', 'model.onnx', '704 MB'],
    // // ['fp16', 'model_fp16.onnx', ' MB'],
    ['int8', 'model_quantized.onnx', '232 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Classification',
    tag: '2h',
    id: `mxbai_rerank_base_v1_${dt}`,
    name: 'MxbAI Rerank Base v1',
    description: 'The base model of powerful reranker models from mixedbread ai.',
    note: 'Large model',
    source: 'https://huggingface.co/mixedbread-ai/mxbai-rerank-base-v1',
    hf: {
      model: 'mixedbread-ai/mxbai-rerank-base-v1',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 101n, [5, 18], { "batch_size": 5, "sequence_length": 18 }],
      'attention_mask': ['int64', 1n, [5, 18], { "batch_size": 5, "sequence_length": 18 }]
    }],
    inputstip: '[5, 18] [5, 18]'
  }))
}

const nomicEmbedTextV1 = () => {
  const configs = [
    ['fp32', 'model.onnx', '522 MB'],
    ['int8', 'model_quantized.onnx', '131 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Sentence Similarity',
    tag: '2h',
    id: `nomic_embed_text_v1_${dt}`,
    name: 'Nomic Embed Text v1',
    description: 'A Reproducible Long Context (8192) Text Embedder that surpasses OpenAI text-embedding-ada-002 and text-embedding-3-small performance on short and long context tasks.',
    note: 'Large model',
    source: 'https://huggingface.co/nomic-ai/nomic-embed-text-v1',
    hf: {
      model: 'nomic-ai/nomic-embed-text-v1',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 101n, [2, 16], { "batch_size": 2, "sequence_length": 16 }],
      'attention_mask': ['int64', 1n, [2, 16], { "batch_size": 2, "sequence_length": 16 }],
      'token_type_ids': ['int64', 0n, [2, 16], { "batch_size": 2, "sequence_length": 16 }],
    }],
    inputstip: '[2, 16] [2, 16] [2, 16]'
  }))
}

const nomicEmbedTextV1_5 = () => {
  const configs = [
    ['fp32', 'model.onnx', '522 MB'],
    ['int8', 'model_quantized.onnx', '132 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Sentence Similarity',
    tag: '2h',
    id: `nomic_embed_text_v1_5_${dt}`,
    name: 'Nomic Embed Text v1.5',
    description: 'An improvement upon Nomic Embed that utilizes Matryoshka Representation Learning which gives developers the flexibility to trade off the embedding size for a negligible reduction in performance.',
    note: 'Large model',
    source: 'https://huggingface.co/nomic-ai/nomic-embed-text-v1.5',
    hf: {
      model: 'nomic-ai/nomic-embed-text-v1.5',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 101n, [2, 16], { "batch_size": 2, "sequence_length": 16 }],
      'attention_mask': ['int64', 1n, [2, 16], { "batch_size": 2, "sequence_length": 16 }],
      'token_type_ids': ['int64', 0n, [2, 16], { "batch_size": 2, "sequence_length": 16 }],
    }],
    inputstip: '[2, 16] [2, 16] [2, 16]'
  }))
}

const paraphraseMultilingualMpnetBaseV2 = () => {
  const configs = [
    ['fp32', 'model.onnx', '1.03 GB'],
    ['fp16', 'model_fp16.onnx', '529 MB'],
    ['int8', 'model_quantized.onnx', '265 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Sentence Similarity',
    tag: '2h',
    id: `paraphrase_multilingual_mpnet_base_v2_${dt}`,
    name: 'Paraphrase Multilingual Mpnet Base v2',
    description: 'Maps sentences & paragraphs to a 768 dimensional dense vector space and can be used for tasks like clustering or semantic search.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/paraphrase-multilingual-mpnet-base-v2',
    hf: {
      model: 'xenova/paraphrase-multilingual-mpnet-base-v2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "sequence_length": 128 }],
      'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 128]'
  }))
}

const phi3Mini4kInstructMerged = () => {
  const configs = [
    ['int4', 'model_q4.onnx', '0.98 GB', 'model_q4.onnx_data', '1.54 GB'],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `phi_3_mini_4k_instruct_merged_${dt}`,
    name: 'Phi-3 Mini 4k Instruct KV-Cache',
    description: 'Phi-3 Mini is a lightweight, state-of-the-art open model built upon datasets used for Phi-2 - synthetic data and filtered websites - with a focus on very high-quality, reasoning dense data.',
    note: 'Large model with external data.',
    source: 'https://huggingface.co/Xenova/Phi-3-mini-4k-instruct',
    hf: {
      model: 'xenova/phi-3-mini-4k-instruct',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} + ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1, "past_sequence_length": 255 }],
      'attention_mask': ['int64', 1n, [1, 256], { "batch_size": 1, "total_sequence_length": 256 }],
      'position_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
    }],
    inputstip: '[1, 1] [1, 256] [1, 1]'
  }))
}

const phi35MiniInstructMerged = () => {
  const configs = [
    ['int4', 'model_q4f16.onnx', '210 MB', 'model_q4f16.onnx_data', '1.95 GB'],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `phi_3_5_mini_instruct_merged_${dt}`,
    name: 'Phi-3.5-mini Instruct KV-Cache',
    description: 'Phi-3.5-mini is a lightweight, state-of-the-art open model built upon datasets used for Phi-3 - synthetic data and filtered publicly available websites - with a focus on very high-quality, reasoning dense data.',
    note: 'Large model with external data.',
    source: 'https://huggingface.co/onnx-community/Phi-3.5-mini-instruct-onnx-web',
    hf: {
      model: 'onnx-community/phi-3.5-mini-instruct-onnx-web',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} + ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1, "past_sequence_length": 255 }],
      'attention_mask': ['int64', 1n, [1, 256], { "batch_size": 1, "total_sequence_length": 256 }],
      'position_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
    }],
    inputstip: '[1, 1] [1, 256] [1, 1]'

  }))
}

const Qwen2_0_5bInstructMerged = () => {
  const configs = [
    ['fp32', 'model.onnx', '1.85 GB'],
    ['fp16', 'model_fp16.onnx', '951 MB'],
    ['int8', 'model_quantized.onnx', '489 MB'],
    ['int4', 'model_q4.onnx', '750 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `qwen2_0_5b_instruct_merged_${dt}`,
    name: 'Qwen2 0.5b Instruct KV-Cache',
    description: 'Qwen2 is a language model series including decoder language models of different model sizes.',
    note: 'Large model',
    source: 'https://huggingface.co/webml/Qwen2-0.5B-Instruct',
    hf: {
      model: 'webml/qwen2-0.5b-instruct',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1, "past_sequence_length": 1 }],
      'attention_mask': ['int64', 1n, [1, 2], { "batch_size": 1, "past_sequence_length + 1": 2 }],
      'position_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
    }],
    inputstip: '[1, 1] [1, 2] [1, 1]'
  }))
}

const samVitBase = () => {
  const configs = [
    ['fp32', 'model.onnx', '358 MB'],
    ['fp16', 'model_fp16.onnx', '179 MB'],
    ['int8', 'model_quantized.onnx', '100 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Mask Generation',
    tag: '',
    id: `sam_vit_base_${dt}`,
    name: 'SAM ViT Base',
    description: 'The ViT Base (ViT-B) version of Segment Anything Model (SAM) produces high quality object masks from input prompts such as points or boxes, and it can be used to generate masks for all objects in an image',
    note: '',
    source: 'https://huggingface.co/Xenova/sam-vit-base',
    hf: {
      model: 'xenova/sam-vit-base',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 1024, 1024], { "batch_size": 1 }],
      'input_points': ['float32', 'random', [1, 1, 1, 2], { "batch_size": 1, "point_batch_size": 1, "nb_points_per_image": 1 }],
    }],
    inputstip: '[1, 3, 1024, 1024] [1, 1, 1, 2]'
  }))
}

const samVitBasePromptEncoderMaskDecoder = () => {
  const configs = [
    ['fp32', 'prompt_encoder_mask_decoder.onnx', '15.7 MB'],
    ['int8', 'prompt_encoder_mask_decoder_quantized.onnx', '4.67 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Mask Generation',
    tag: '',
    id: `sam_vit_base_prompt_encoder_mask_decoder_${dt}`,
    name: 'SAM ViT Base Prompt/Mask Encoder',
    description: 'The ViT Base (ViT-B) version of Segment Anything Model (SAM) produces high quality object masks from input prompts such as points or boxes, and it can be used to generate masks for all objects in an image',
    note: '',
    source: 'https://huggingface.co/Xenova/sam-vit-base',
    hf: {
      model: 'xenova/sam-vit-base',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_points': ['float32', 'random', [1, 1, 1, 2], { "batch_size": 1, "point_batch_size": 1, "nb_points_per_image": 1 }],
      'image_embeddings': ['float32', 'random', [1, 256, 64, 64], { "batch_size": 1 }],
      'image_positional_embeddings': ['float32', 'random', [1, 256, 64, 64], { "batch_size": 1 }],
    }],
    inputstip: '[1, 1, 1, 2] [1, 256, 64, 64] [1, 256, 64, 64]'
  }))
}

const samVitBasePromptEncoderMaskDecoderFP16 = () => {
  const configs = [
    ['fp16', 'prompt_encoder_mask_decoder_fp16.onnx', '8.15 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Mask Generation',
    tag: '',
    id: `sam_vit_base_prompt_encoder_mask_decoder_${dt}`,
    name: 'SAM ViT Base Prompt/Mask Encoder',
    description: 'The ViT Base (ViT-B) version of Segment Anything Model (SAM) produces high quality object masks from input prompts such as points or boxes, and it can be used to generate masks for all objects in an image',
    note: '',
    source: 'https://huggingface.co/Xenova/sam-vit-base',
    hf: {
      model: 'xenova/sam-vit-base',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_points': ['float32', 'random', [1, 1, 1, 2], { "batch_size": 1, "point_batch_size": 1, "nb_points_per_image": 1 }],
      'input_labels': ['int64', 1n, [1, 1, 1], { "batch_size": 1, "point_batch_size": 1, "nb_points_per_image": 1 }],
      'image_embeddings': ['float32', 'random', [1, 256, 64, 64], { "batch_size": 1 }],
      'image_positional_embeddings': ['float32', 'random', [1, 256, 64, 64], { "batch_size": 1 }],
    }],
    inputstip: '[1, 1, 1, 2] [1, 256, 64, 64] [1, 256, 64, 64]'
  }))
}

const samVitBaseVisionEncoder = () => {
  const configs = [
    ['fp32', 'vision_encoder.onnx', '342 MB'],
    ['fp16', 'vision_encoder_fp16.onnx', '171 MB'],
    ['int8', 'vision_encoder_quantized.onnx', '96.4 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Mask Generation',
    tag: '',
    id: `sam_vit_base_vision_encoder_${dt}`,
    name: 'SAM ViT Base Vision Encoder',
    description: 'The ViT Base (ViT-B) version of Segment Anything Model (SAM) produces high quality object masks from input prompts such as points or boxes, and it can be used to generate masks for all objects in an image',
    note: '',
    source: 'https://huggingface.co/Xenova/sam-vit-base',
    hf: {
      model: 'xenova/sam-vit-base',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 1024, 1024], { "batch_size": 1 }]
    }],
    inputstip: '[1, 3, 1024, 1024]'
  }))
}

const SnowflakeArcticEmbedM = () => {
  const configs = [
    ['fp32', 'model.onnx', '415 MB'],
    ['fp16', 'model_fp16.onnx', '208 MB'],
    ['int8', 'model_quantized.onnx', '104 MB'],
    ['int4', 'model_q4.onnx', '142 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Sentence Similarity',
    tag: '2h',
    id: `snowflake_arctic_embed_m_${dt}`,
    name: 'Snowflake Arctic Embed M',
    description: 'An improvement upon Nomic Embed that utilizes Matryoshka Representation Learning which gives developers the flexibility to trade off the embedding size for a negligible reduction in performance.',
    note: 'Large model',
    source: 'https://huggingface.co/Snowflake/snowflake-arctic-embed-m',
    hf: {
      model: 'snowflake/snowflake-arctic-embed-m',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 101n, [3, 19], { "batch_size": 3, "sequence_length": 19 }],
      'attention_mask': ['int64', 1n, [3, 19], { "batch_size": 3, "sequence_length": 19 }],
      'token_type_ids': ['int64', 0n, [3, 19], { "batch_size": 3, "sequence_length": 19 }],
    }],
    inputstip: '[3, 19] [3, 19] [3, 19]'
  }))
}

const squeezebertUncased = () => {
  const configs = [
    ['fp32', 'model.onnx', '192 MB'],
    ['fp16', 'model_fp16.onnx', '96.5 MB'],
    ['int8', 'model_quantized.onnx', '48.8 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Masked Language',
    tag: '',
    id: `squeezebert_uncased_${dt}`,
    name: 'SqueezeBERT Uncased',
    description: 'A pretrained model for the English language using a masked language modeling (MLM) and Sentence Order Prediction (SOP) objective. This model is case-insensitive. The authors found that SqueezeBERT is 4.3x faster than bert-base-uncased on a Google Pixel 3 smartphone.',
    note: '',
    source: 'https://huggingface.co/Xenova/squeezebert-uncased',
    hf: {
      model: 'xenova/squeezebert-uncased',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 50], { "batch_size": 1, "sequence_length": 50 }],
      'attention_mask': ['int64', 1n, [1, 50], { "batch_size": 1, "sequence_length": 50 }],
      'token_type_ids': ['int64', 1n, [1, 50], { "batch_size": 1, "sequence_length": 50 }]
    }],
    inputstip: '[1, 50] [1, 50]'
  }))
}

const t5SmallDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '158.95 MB'],
    // ['fp16', 'decoder_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_model_quantized.onnx', '40.2 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `t5_small_decoder_${dt}`,
    name: 'T5 Small Decoder',
    description: 'A Text-To-Text transfer transformer model, reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings.',
    note: '',
    source: 'https://huggingface.co/Xenova/t5-small',
    hf: {
      model: 'xenova/t5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "decoder_sequence_length": 128 }],
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 128] [1, 128, 512]'
  }))
}

const t5SmallDecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '146 MB'],
    // ['fp16', 'decoder_with_past_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '37.1 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `t5_small_decoder_with_past_${dt}`,
    name: 'T5 Small Decoder w/i Past',
    description: 'A Text-To-Text transfer transformer model, reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings.',
    note: '',
    source: 'https://huggingface.co/Xenova/t5-small',
    hf: {
      model: 'xenova/t5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 128, "past_decoder_sequence_length": 128, "encoder_sequence_length_out": 128 }],
      'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 1] [1, 128, 512]'
  }))
}

const t5SmallDecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '159 MB'],
    ['fp16', 'decoder_model_merged_fp16.onnx', '79.8 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '40.4 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `t5_small_decoder_merged_${dt}`,
    name: 'T5 Small Decoder KV-Cache',
    description: 'A Text-To-Text transfer transformer model, reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings.',
    note: '',
    source: 'https://huggingface.co/Xenova/t5-small',
    hf: {
      model: 'xenova/t5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "decoder_sequence_length": 128 }],
      'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'use_cache_branch': ['bool', 1, [1], {
        "past_decoder_sequence_length": 128,
        "encoder_sequence_length_out": 128
      }]
    }],
    inputstip: '[1, 128] [1, 128] [1, 128, 512]'
  }))
}

const t5SmallEncoder = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '134 MB'],
    ['fp16', 'encoder_model_fp16.onnx', '67.4 MB'],
    ['int8', 'encoder_model_quantized.onnx', '33.99 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `t5_small_encoder_${dt}`,
    name: 'T5 Small Encoder',
    description: 'A Text-To-Text transfer transformer model, reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings.',
    note: '',
    source: 'https://huggingface.co/Xenova/t5-small',
    hf: {
      model: 'xenova/t5-small',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 128]'
  }))
}

const tinyLlamaV0Decoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '17.9 MB'],
    ['fp16', 'decoder_model_fp16.onnx', '9.20 MB'],
    ['int8', 'decoder_model_quantized.onnx', '4.88 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `tinyllama_v0_decoder_${dt}`,
    name: 'TinyLlama v0 Decoder',
    description: 'https://huggingface.co/Maykeye/TinyLLama-v0 with ONNX weights to be compatible with Transformers.js.',
    note: '',
    source: 'https://huggingface.co/Xenova/TinyLLama-v0',
    hf: {
      model: 'xenova/tinyllama-v0',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 41], { "batch_size": 1, "sequence_length": 41 }],
      'attention_mask': ['int64', 1n, [1, 41], { "batch_size": 1, "sequence_length": 41 }]
    }],
    inputstip: '[1, 41] [1, 41]'
  }))
}

const tinyLlamaV0DecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '18.2 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '5.36 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `tinyllama_v0_decoder_merged_${dt}`,
    name: 'TinyLlama v0 Decoder KV-Cache',
    description: 'https://huggingface.co/Maykeye/TinyLLama-v0 with ONNX weights to be compatible with Transformers.js.',
    note: '',
    source: 'https://huggingface.co/Xenova/TinyLLama-v0',
    hf: {
      model: 'xenova/tinyllama-v0',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 41], { "batch_size": 1, "sequence_length": 41, "past_sequence_length": 40 }],
      'attention_mask': ['int64', 1n, [1, 1], { "batch_size": 1, "attention_mask_sequence_length": 1 }],
      'use_cache_branch': ['bool', 1, [1], {}]
    }],
    inputstip: '[1, 41] [1, 1] [1]'
  }))
}

const tinyLlamaV0DecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '17.9 MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '4.88 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `tinyllama_v0_decoder_with_past_${dt}`,
    name: 'TinyLlama v0 Decoder w/i Past',
    description: 'https://huggingface.co/Maykeye/TinyLLama-v0 with ONNX weights to be compatible with Transformers.js.',
    note: '',
    source: 'https://huggingface.co/Xenova/TinyLLama-v0',
    hf: {
      model: 'xenova/tinyllama-v0',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "past_sequence_length": 1 }],
      'attention_mask': ['int64', 1n, [1, 2], { "batch_size": 1, "past_sequence_length + 1": 2 }]
    }],
    inputstip: '[1, 1] [1, 2]'
  }))
}

const tinyLlama1_1BChatv1_0Merged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '2.00 MB', 'decoder_model_merged.onnx_data', '4.09 GB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '1.02 GB', '', ''],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `tinyllama_1_1b_chat_v1_0_merged_${dt}`,
    name: 'TinyLlama 1.1B Chat v1.0 Decoder KV-Cache',
    description: 'This is the chat model finetuned on top of TinyLlama/TinyLlama-1.1B-intermediate-step-1431k-3T. ',
    note: 'Large model with external data.',
    source: 'https://huggingface.co/Xenova/TinyLlama-1.1B-Chat-v1.0',
    hf: {
      model: 'xenova/tinyllama-1.1b-chat-v1.0',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 41], { "batch_size": 1, "sequence_length": 41 }],
      'attention_mask': ['int64', 1n, [1, 41], { "batch_size": 1, "past_sequence_length + 1": 41 }],
      'position_ids': ['int64', 0n, [1, 41], { "batch_size": 1, "sequence_length": 41 }],
    }],
    inputstip: '[1, 41] [1, 41] [1, 41]'
  }))
}

const tinyLlama1_1BChatv1_0Merged_2 = () => {
  const configs = [
    ['fp16', 'decoder_model_merged_fp16.onnx', '1.80 GB', 'decoder_model_merged.onnx.data', '250 MB'],
    ['int4', 'decoder_model_merged_int4.onnx', '681 MB', '', ''],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `tinyllama_1_1b_chat_v1_0_merged_${dt}`,
    name: 'TinyLlama 1.1B Chat v1.0 Decoder KV-Cache',
    description: 'This is the chat model finetuned on top of TinyLlama/TinyLlama-1.1B-intermediate-step-1431k-3T. https://huggingface.co/schmuell/TinyLlama-1.1B-Chat-v1.0-int4/ https://huggingface.co/schmuell/TinyLlama-1.1B-Chat-v1.0-fp16/',
    note: 'Large model with external data.',
    source: 'https://huggingface.co/webml/TinyLlama-1.1B-Chat-v1.0',
    hf: {
      model: 'webml/tinyllama-1.1b-chat-v1.0',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 41], { "batch_size": 1, "sequence_length": 41 }],
      'attention_mask': ['int64', 1n, [1, 41], { "batch_size": 1, "past_sequence_length + 1": 41 }],
      'position_ids': ['int64', 0n, [1, 41], { "batch_size": 1, "sequence_length": 41 }],
    }],
    inputstip: '[1, 41] [1, 41] [1, 41]'
  }))
}

const metaLlama_3_8bInstructMerged = () => {
  const configs = [
    ['fp16', 'rank_0_Meta-Llama-3-8B-Instruct_decoder_merged_model_fp16.onnx', '1.79 MB', 'rank_0_Meta-Llama-3-8B-Instruct_decoder_merged_model_fp16.onnx.data', '14.9 GB']
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '2h',
    id: `meta_llama_3_8b_instruct_merged_${dt}`,
    name: '[DO NOT RUN] Meta Llama 3 8b Instruct KV-Cache',
    description: 'Llama 3 is an auto-regressive language model that uses an optimized transformer architecture. The tuned versions use supervised fine-tuning (SFT) and reinforcement learning with human feedback (RLHF).',
    note: 'Unable to run now, 14.9GB. Large model with external data.',
    source: 'https://huggingface.co/webml/Meta-Llama-3-8B-Instruct-onnx-fp16',
    hf: {
      model: 'webml/meta-llama-3-8b-instruct-onnx-fp16',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 41], { "batch_size": 1, "sequence_length": 41 }],
      'attention_mask': ['int64', 1n, [1, 41], { "batch_size": 1, "past_sequence_length + 1": 41 }],
      'position_ids': ['int64', 1n, [1, 41], { "batch_size": 1, "sequence_length": 41 }],
    }],
    inputstip: '[1, 41] [1, 41] [1, 41]'
  }))
}

const uaeLargeV1 = () => {
  const configs = [
    ['fp32', 'model.onnx', '1.24 GB'],
    ['fp16', 'model_fp16.onnx', '637 MB'],
    ['int8', 'model_quantized.onnx', '321 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '',
    id: `uae_large_v1_${dt}`,
    name: 'Universal AnglE Embedding (UAE) Large v1',
    description: 'Generate high-quality text embeddings.',
    note: '',
    source: 'https://huggingface.co/WhereIsAI/UAE-Large-V1',
    hf: {
      model: 'whereisai/uae-large-v1',
      file: `${file}`,
    },
    model: 'Large model',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "sequence_length": 128 }],
      'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "sequence_length": 128 }],
      'token_type_ids': ['int64', 1n, [1, 128], { "batch_size": 1, "sequence_length": 128 }],
    }],
    inputstip: '[1, 128] [1, 128] [1, 128]'
  }))
}

const UniVaRLambda1 = () => {
  const configs = [
    ['fp32', 'model.onnx', '522 MB'],
    ['fp16', 'model_fp16.onnx', '261 MB'],
    ['int8', 'model_quantized.onnx', '131 MB'],
    ['int8', 'model_q4.onnx', '293 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Sentence Similarity',
    tag: '2h',
    id: `univar_lambda_1_${dt}`,
    name: 'UniVaR Lambda 1',
    description: 'https://huggingface.co/CAiRE/UniVaR-lambda-1, the same model with nomic-ai/nomic-embed-text-v1? A Reproducible Long Context (8192) Text Embedder that surpasses OpenAI text-embedding-ada-002 and text-embedding-3-small performance on short and long context tasks.',
    note: 'Large model',
    source: 'https://huggingface.co/webml/UniVaR-lambda-1',
    hf: {
      model: 'webml/univar-lambda-1',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 101n, [2, 16], { "batch_size": 2, "sequence_length": 16 }],
      'attention_mask': ['int64', 1n, [2, 16], { "batch_size": 2, "sequence_length": 16 }]
    }],
    inputstip: '[2, 16] [2, 16]'
  }))
}

const vitBasePatch16224 = () => {
  const configs = [
    ['fp32', 'model.onnx', '330 MB'],
    ['fp16', 'model_fp16.onnx', '165 MB'],
    ['int8', 'model_quantized.onnx', '84.17 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Classification',
    tag: '',
    id: `vit_base_patch16_224_${dt}`,
    name: 'Vision Transformer (ViT) Base-sized',
    description: 'Vision Transformer (ViT) model pre-trained on ImageNet-21k (14 million images, 21,843 classes) at resolution 224x224, and fine-tuned on ImageNet 2012.',
    note: '',
    source: 'https://huggingface.co/Xenova/vit-base-patch16-224',
    hf: {
      model: 'xenova/vit-base-patch16-224',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 1, [1, 3, 224, 224], { "batch_size": 1, "num_channels": 3, "height": 224, "width": 224 }]
    }],
    inputstip: '[1, 3, 224, 224]'
  }))
}

const vitGpt2ImageCaptioningDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '584 MB'],
    // ['fp16', 'decoder_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_model_quantized.onnx', '149 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-to-Text',
    tag: '',
    id: `vit_gpt2_image_captioning_decoder_${dt}`,
    name: 'ViT GPT2 Image Captioning Decoder',
    description: 'An image captioning model using transformers.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/vit-gpt2-image-captioning',
    hf: {
      model: 'xenova/vit-gpt2-image-captioning',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 168], { "batch_size": 1, "decoder_sequence_length": 168 }],
      'encoder_hidden_states': ['float32', 'random', [1, 168, 768], { "batch_size": 1, "encoder_sequence_length": 168 }]
    }],
    inputstip: '[1, 168] [1, 168, 768]'
  }))
}

const vitGpt2ImageCaptioningDecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '584 MB'],
    // ['fp16', 'decoder_with_past_model_fp16.onnx', ' MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '149 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-to-Text',
    tag: '',
    id: `vit_gpt2_image_captioning_decoder_with_past_${dt}`,
    name: 'ViT GPT2 Image Captioning Decoder w/i Past',
    description: 'An image captioning model using transformers.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/vit-gpt2-image-captioning',
    hf: {
      model: 'xenova/vit-gpt2-image-captioning',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 168 }],
      'encoder_hidden_states': ['float32', 'random', [1, 168, 768], { "batch_size": 1, "encoder_sequence_length": 168 }],
    }],
    inputstip: '[1, 1] [1, 168, 768]'
  }))
}

const vitGpt2ImageCaptioningDecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '586 MB'],
    ['fp16', 'decoder_model_merged_fp16.onnx', '295 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '149.04 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-to-Text',
    tag: '',
    id: `vit_gpt2_image_captioning_decoder_merged_${dt}`,
    name: 'ViT GPT2 Image Captioning Decoder KV-Cache',
    description: 'An image captioning model using transformers.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/vit-gpt2-image-captioning',
    hf: {
      model: 'xenova/vit-gpt2-image-captioning',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 168], { "batch_size": 1, "decoder_sequence_length": 168 }],
      'encoder_hidden_states': ['float32', 'random', [1, 168, 768], { "batch_size": 1, "encoder_sequence_length": 168 }],
      'use_cache_branch': ['bool', 1, [1], { "past_sequence_length": 168 }]
    }],
    inputstip: '[1, 168] [1, 168, 768]'
  }))
}

const vitGpt2ImageCaptioningEncoder = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '327 MB'],
    ['fp16', 'encoder_model_fp16.onnx', '163 MB'],
    ['int8', 'encoder_model_quantized.onnx', '83.40 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-to-Text',
    tag: '',
    id: `vit_gpt2_image_captioning_encoder_${dt}`,
    name: 'ViT GPT2 Image Captioning Encoder',
    description: 'An image captioning model using transformers.',
    note: '',
    source: 'https://huggingface.co/Xenova/vit-gpt2-image-captioning',
    hf: {
      model: 'xenova/vit-gpt2-image-captioning',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 1, [1, 3, 224, 224], { "batch_size": 1, "num_channels": 3, "height": 224, "width": 224 }]
    }],
    inputstip: '[1, 3, 224, 224]'
  }))
}

const whisperTinyDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '112 MB'],
    ['fp16', 'decoder_model_fp16.onnx', '56.6 MB'],
    ['int8', 'decoder_model_quantized.onnx', '29.0 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `whisper_tiny_decoder_${dt}`,
    name: 'Whisper Tiny Decoder',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation.',
    note: '',
    source: 'https://huggingface.co/onnx-community/whisper-tiny',
    hf: {
      model: 'onnx-community/whisper-tiny',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 1500, 384], { "batch_size": 1, "encoder_sequence_length / 2": 1500 }]
    }],
    inputstip: '[1, 1] [1, 1500, 384]'
  }))
}

const whisperTinyWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '108 MB'],
    ['fp16', 'decoder_with_past_model_fp16.onnx', '54.3 MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '27.8 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `whisper_tiny_decoder_with_past_${dt}`,
    name: 'Whisper Tiny Decoder w/i Past',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation.',
    note: '',
    source: 'https://huggingface.co/onnx-community/whisper-tiny',
    hf: {
      model: 'onnx-community/whisper-tiny',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], {
        "batch_size": 1,
        "past_decoder_sequence_length": 128,
        "encoder_sequence_length_out": 1500
      }],
    }],
    inputstip: '[1, 1]'
  }))
}

const whisperTinyMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '113 MB'],
    ['fp16', 'decoder_model_merged_fp16.onnx', '56.8 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '29.2 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `whisper_tiny_decoder_merged_${dt}`,
    name: 'Whisper Tiny Decoder KV-Cache',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation.',
    note: '',
    source: 'https://huggingface.co/onnx-community/whisper-tiny',
    hf: {
      model: 'onnx-community/whisper-tiny',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 1500, 384], { "batch_size": 1, "encoder_sequence_length / 2": 1500 }],
      'use_cache_branch': ['bool', 1, [1], {
        "past_decoder_sequence_length": 128,
        "encoder_sequence_length_out": 1500
      }]
    }],
    inputstip: '[1, 1] [1, 1500, 384]'
  }))
}

const whisperTinyEncoder = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '31.3 MB'],
    ['fp16', 'encoder_model_fp16.onnx', '15.7 MB'],
    ['int8', 'encoder_model_quantized.onnx', '9.65 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `whisper_tiny_encoder_${dt}`,
    name: 'Whisper Tiny Encoder',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation.',
    note: '',
    source: 'https://huggingface.co/onnx-community/whisper-tiny',
    hf: {
      model: 'onnx-community/whisper-tiny',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_features': ['float32', 'random', [1, 80, 3000], { "batch_size": 1, "feature_size": 80, "encoder_sequence_length": 3000 }]
    }],
    inputstip: '[1, 80, 3000]'
  }))
}

const xlmRobertaBase = () => {
  const configs = [
    ['fp32', 'model.onnx', '1.03 GB'],
    ['fp16', 'model_fp16.onnx', '531 MB'],
    ['int8', 'model_quantized.onnx', '267 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Fill-Mask',
    tag: '',
    id: `xlm_roberta_base_${dt}`,
    name: 'XLM-RoBERTa Base',
    description: 'RoBERTa is a transformers model pretrained on a large corpus in a self-supervised fashion. XLM-RoBERTa is a multilingual version of RoBERTa. It is pre-trained on 2.5TB of filtered CommonCrawl data containing 100 languages.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/xlm-roberta-base',
    hf: {
      model: 'xenova/xlm-roberta-base',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 50], { "batch_size": 1, "sequence_length": 50 }],
      'attention_mask': ['int64', 1n, [1, 50], { "batch_size": 1, "sequence_length": 50 }]
    }],
    inputstip: '[1, 50] [1, 50]'
  }))
}

const yoloV8N = () => {
  const configs = [
    ['fp32', 'yolov8n.onnx', '12.8 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Object Detection',
    tag: '2h',
    id: `yolov8n_${dt}`,
    name: 'YOLO v8n',
    description: 'Real-Time End-to-End Object Detection',
    note: 'Manually exported to ONNX',
    source: 'https://github.com/ultralytics/ultralytics',
    hf: {
      model: 'webml/yolov8n',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'images': ['float32', 'random', [1, 3, 640, 640], {}],
    }],
    inputstip: '[1, 3, 640, 640]'
  }))
}

const yoloV8XPose = () => {
  const configs = [
    ['fp32', 'model.onnx', '265 MB'],
    ['fp16', 'model_fp16.onnx', '132 MB'],
    ['int8', 'model_quantized.onnx', '66.8 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Object Detection',
    tag: '',
    id: `yolov8x_pose_${dt}`,
    name: 'YOLO v8x Pose',
    description: 'Real-Time End-to-End Object Detection',
    note: '',
    source: 'https://huggingface.co/Xenova/yolov8x-pose',
    hf: {
      model: 'xenova/yolov8x-pose',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'images': ['float32', 'random', [1, 3, 640, 640], {}],
    }],
    inputstip: '[1, 3, 640, 640]'
  }))
}

const yoloV10N = () => {
  const configs = [
    ['fp32', 'model.onnx', '8.95 MB'],
    ['fp16', 'model_fp16.onnx', '4.51 MB'],
    ['int8', 'model_quantized.onnx', '2.52 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Object Detection',
    tag: '',
    id: `yolov10n_${dt}`,
    name: 'YOLO v10n',
    description: 'Real-Time End-to-End Object Detection',
    note: '',
    source: 'https://huggingface.co/onnx-community/yolov10n',
    hf: {
      model: 'onnx-community/yolov10n',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'images': ['float32', 'random', [1, 3, 640, 640], {}],
    }],
    inputstip: '[1, 3, 640, 640]'
  }))
}

export let models = [
  {
    category: 'Model Access Check',
    tag: '',
    id: 'model_access_check',
    name: 'Model Access Check',
    description: '',
    source: '',
    model: '01.onnx'
  },
  ...albertBaseV2(),
  ...bartLargeCnn(),
  ...bertBaseCased(),
  ...bertBaseUncased(),
  ...bertBaseMultilingualCasedNerHrl(),
  ...bertBaseMultilingualUncasedSentiment(),
  ...BGELargeEnV1_5(),
  ...BGERerankerBase(),
  ...clipVitBasePatch16(),
  ...codeGenMono350M(),
  {
    category: 'Image Segmentation',
    tag: '',
    id: 'deeplab_v3',
    name: 'DeepLab v3',
    description: 'A series of deep learning architectures designed to tackle the problem of semantic segmentation.',
    note: '',
    source: 'tflite converted',
    model: 'deeplab-mobilenetv2.onnx',
    size: '8.07 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'sub_7': ['float32', 'random', [1, 513, 513, 3], {}] }],
    inputstip: '[1, 513, 513, 3]'
  },
  {
    category: 'Image Classification',
    tag: '',
    id: 'densenet',
    name: 'DenseNet 121',
    description: 'A type of convolutional neural network that utilises dense connections between layers.',
    note: '',
    source: 'https://github.com/onnx/models/blob/main/vision/classification/densenet-121/model/densenet-9.onnx',
    model: 'densenet-9.onnx',
    size: '31.2 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'data_0': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  ...detrResnet50(),
  ...dinoVitb16(),
  ...distilbartCnn66Decoder(),
  ...distilbartCnn66DecoderWithPast(),
  ...distilbartCnn66DecoderMerged(),
  ...distilbartCnn66Encoder(),
  ...distilbertBaseUncased(),
  ...distilbertBaseCasedDistilledSquad(),
  ...distilbertBaseUncasedMnli(),
  ...distilgpt2Decoder(),
  ...distilgpt2DecoderWithPast(),
  ...distilgpt2DecoderMerged(),
  ...distilMediumEnDecoder(),
  ...distilMediumEnDecoderWithPast(),
  ...distilMediumEnDecoderMerged(),
  ...distilMediumEnEncoder(),
  ...distiluseBaseMultilingualCasedV2(),
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'efficientnet_lite',
    name: 'EfficientNet Lite 4',
    description: 'A convolutional neural network architecture and scaling method.',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/efficientnet-lite4/model/efficientnet-lite4-11.onnx',
    model: 'efficientnet-lite4-11.onnx',
    size: '49.54 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'images:0': ['float32', 'random', [1, 224, 224, 3], {}] }],
    inputstip: '[1, 224, 224, 3] '
  },
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'efficientnet_lite_fp16',
    name: 'EfficientNet Lite 4',
    description: 'A convolutional neural network architecture and scaling method.',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/validated/vision/classification/efficientnet-lite4/model onnx-public-models/efficientnet-lite4/opset-11-fp16/',
    model: 'fp16/efficientnet-lite4-opset-11-fp16.onnx',
    size: '24.8 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'images:0': ['float16', 'random', [1, 224, 224, 3], {}] }],
    inputstip: '[1, 224, 224, 3]'
  },
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'efficientnet_lite_demo_fp16',
    name: 'EfficientNet Lite 4 Demo',
    description: 'A convolutional neural network architecture and scaling method.',
    note: '',
    source: 'https://huggingface.co/webnn/efficientnet-lite4/',
    model: 'fp16/image-classification/efficientnet-lite4_fp16.onnx',
    size: '24.8 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'pixel_values': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'efficientnet_lite_int8',
    tag: '2h',
    name: 'EfficientNet Lite 4',
    description: 'A convolutional neural network architecture and scaling method.',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/validated/vision/classification/efficientnet-lite4/model onnx-public-models/efficientnet-lite4/opset-11-int8/',
    model: 'int8/efficientnet-lite4-opset-11-int8.onnx',
    size: '12.9 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'images:0': ['float32', 'random', [1, 224, 224, 3], {}] }],
    inputstip: '[1, 224, 224, 3]'
  },
  {
    category: 'Image Classification',
    id: 'efficientnet_lite_qdq_int8',
    tag: '2h',
    name: 'EfficientNet Lite 4 QDQ',
    description: 'A convolutional neural network architecture and scaling method.',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/validated/vision/classification/efficientnet-lite4',
    model: 'int8/efficientnet-lite4-11-qdq.onnx',
    size: '12.8 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'images:0': ['float32', 'random', [1, 224, 224, 3], {}] }],
    inputstip: '[1, 224, 224, 3]'
  },
  ...esrgan(),
  ...faceParsing(),
  {
    category: 'Object Detection',
    tag: '',
    id: 'faster_r_cnn_fp16',
    name: 'Faster R-CNN',
    description: 'Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks',
    note: '',
    source: '',
    model: 'fp16/faster-r-cnn-opset-12-fp16.onnx',
    size: '84.4 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'image': ['float16', 'random', [3, 224, 224], { "height": 224, "width": 224 }] }],
    inputstip: '[3, 224, 224]'
  },
  {
    category: 'Object Detection',
    id: 'faster_r_cnn_int8',
    name: 'Faster R-CNN',
    description: 'Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks',
    note: '',
    source: '',
    model: 'int8/faster-r-cnn-opset-12-int8.onnx',
    size: '42.5 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'image': ['float32', 'random', [3, 224, 224], {"height": 224, "width": 224}] }],
    inputstip: '[3, 224, 224]'
  },
  {
    category: 'Object Detection',
    id: 'faster_r_cnn_qdq_int8',
    name: 'Faster R-CNN QDQ',
    description: 'Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/validated/vision/object_detection_segmentation/faster-rcnn',
    model: 'int8/FasterRCNN-12-qdq.onnx',
    size: '42.4 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'image': ['float32', 'random', [3, 224, 224], {"height": 224, "width": 224}] }],
    inputstip: '[3, 224, 224]'
  },
  {
    category: 'Image Segmentation',
    tag: '',
    id: 'fcn_resnet50_fp16',
    name: 'FCN ResNet-50',
    description: 'Fully-Convolutional Network model with a ResNet-50 backbone',
    note: '',
    source: '',
    model: 'fp16/fcn-resnet50-opset-12-fp16.onnx',
    size: '67.3 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'input': ['float16', 'random', [1, 3, 224, 224], { "batch": 1, "height": 224, "width": 224 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Segmentation',
    id: 'fcn_resnet50_int8',
    name: 'FCN ResNet-50',
    description: 'Fully-Convolutional Network model with a ResNet-50 backbone',
    note: '',
    source: '',
    model: 'int8/fcn-resnet50-opset-12-int8.onnx',
    size: '33.8 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], {"batch": 1, "height": 224, "width": 224}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Segmentation',
    id: 'fcn_resnet50_qdq_int8',
    name: 'FCN ResNet-50 QDQ',
    description: 'Fully-Convolutional Network model with a ResNet-50 backbone',
    note: '',
    source: 'https://github.com/onnx/models/blob/main/validated/vision/object_detection_segmentation/fcn/',
    model: 'int8/fcn-resnet50-12-qdq.onnx',
    size: '33.7 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], {"batch": 1, "height": 224, "width": 224}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  ...flanT5SmallDecoder(),
  ...flanT5SmallDecoderWithPast(),
  ...flanT5SmallDecoderMerged(),
  ...flanT5SmallEncoder(),
  ...florence2Decoder(),
  ...florence2DecoderMerged(),
  ...florence2DecoderWithPast(),
  ...florence2Encoder(),
  ...florence2EmbedTokens(),
  ...florence2VisionEncoder(),
  ...florence2ConditionalDecoder(),
  ...florence2ConditionalDecoderMerged(),
  ...florence2ConditionalDecoderWithPast(),
  ...florence2ConditionalEncoder(),
  ...florence2ConditionalEmbedTokens(),
  ...florence2ConditionalVisionEncoder(),
  ...gemma2bItMerged(),
  {
    category: 'Text Generation',
    tag: '',
    id: 'gpt2_decoder_fp32',
    name: 'GPT-2 Decoder',
    description: 'A transformers model pretrained on a very large corpus of English data in a self-supervised fashion.',
    note: 'Large model',
    source: 'https://huggingface.co/openai-community/gpt2',
    hf: {
      model: 'openai-community/gpt2',
      file: `decoder_model.onnx`,
    },
    model: '',
    size: '623 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 8], { "batch_size": 1, "sequence_length": 8 }],
      'attention_mask': ['int64', 1n, [1, 8], { "batch_size": 1, "sequence_length": 8 }]
    }],
    inputstip: '[1, 8] [1, 8]'
  },
  {
    category: 'Text Generation',
    tag: '',
    id: 'gpt2_decoder_with_past_fp32',
    name: 'GPT-2 Decoder w/i Past',
    description: 'A transformers model pretrained on a very large corpus of English data in a self-supervised fashion.',
    note: 'Large model',
    source: 'https://huggingface.co/openai-community/gpt2',
    hf: {
      model: 'openai-community/gpt2',
      file: `decoder_with_past_model.onnx`,
    },
    model: '',
    size: '623 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 8, "past_sequence_length": 8 }],
      'attention_mask': ['int64', 1n, [1, 9], { "batch_size": 1, "past_sequence_length + 1": 9 }],
    }],
    inputstip: '[1, 1] [1, 9]'
  },
  {
    category: 'Text Generation',
    tag: '',
    id: 'gpt2_decoder_merged_fp32',
    name: 'GPT-2 Decoder KV-Cache',
    description: 'A transformers model pretrained on a very large corpus of English data in a self-supervised fashion.',
    note: 'Large model',
    source: 'https://huggingface.co/openai-community/gpt2',
    hf: {
      model: 'openai-community/gpt2',
      file: `decoder_model_merged.onnx`,
    },
    model: '',
    size: '624 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 8], { "batch_size": 1, "sequence_length": 8 }],
      'attention_mask': ['int64', 1n, [1, 8], { "batch_size": 1, "attention_mask_sequence_length": 8 }],
      'use_cache_branch': ['bool', 1, [1], {
        "past_sequence_length": 8
      }]
    }],
    inputstip: '[1, 8] [1, 8]'
  },
  {
    category: 'Image Classification',
    tag: '',
    id: 'inception_v1_fp16',
    name: 'Inception v1',
    description: 'Also known as GoogLeNet, this network set the state of the art in ImageNet classification in 2014.',
    note: '',
    source: '',
    model: 'fp16/inception-v1-opset-12-fp16.onnx',
    size: '13.3 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'data_0': ['float16', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'inception_v1_int8',
    name: 'Inception v1',
    description: 'Also known as GoogLeNet, this network set the state of the art in ImageNet classification in 2014.',
    note: '',
    source: '',
    model: 'int8/inception-v1-opset-12-int8.onnx',
    size: '9.71 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'data_0': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Translation',
    tag: '',
    id: 'm2m100_decoder',
    name: 'M2M100 418M Decoder',
    description: 'A multilingual encoder-decoder (seq-to-seq) model.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/m2m100_418M',
    model: 'm2m100-decoder.onnx',
    size: '1.24 GB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "decoder_sequence_length": 128 }],
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'encoder_hidden_states': ['float32', 1, [1, 128, 1024], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 128] [1, 128, 1024]'
  },
  {
    category: 'Translation',
    tag: '',
    id: 'm2m100_encoder',
    name: 'M2M100 418M Encoder',
    description: 'A multilingual encoder-decoder (seq-to-seq) model.',
    note: 'Large model',
    source: 'https://huggingface.co/Xenova/m2m100_418M',
    model: 'm2m100-encoder.onnx',
    size: '1.05 GB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'input_ids': ['int64', 99n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
    }],
    inputstip: '[1, 128] [1, 128]'
  },
  {
    category: 'Object Detection',
    id: 'mask_r_cnn_int8',
    name: 'Mask R-CNN',
    description: 'Extends Faster R-CNN by adding a branch for predicting an object mask in parallel with the existing branch for bounding box recognition',
    note: '',
    source: '',
    model: 'int8/mask-r-cnn-opset-12-int8.onnx',
    size: '45.9 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'image': ['float32', 'random', [3, 224, 224], {"height": 224, "width": 224}] }],
    inputstip: '[3, 224, 224]'
  },
  {
    category: 'Object Detection',
    id: 'mask_r_cnn_qdq_int8',
    name: 'Mask R-CNN QDQ',
    description: 'Extends Faster R-CNN by adding a branch for predicting an object mask in parallel with the existing branch for bounding box recognition',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/validated/vision/object_detection_segmentation/mask-rcnn',
    model: 'int8/MaskRCNN-12-qdq.onnx',
    size: '43.5 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'image': ['float32', 'random', [3, 224, 224], {"height": 224, "width": 224}] }],
    inputstip: '[3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'mobilenet_v2_10',
    name: 'MobileNet v2_10',
    description: 'A computer vision model designed for training classifiers.',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-10.onnx',
    model: 'mobilenetv2-10.onnx',
    size: '13.32 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'mobilenet_v2_12',
    name: 'MobileNet v2_12',
    description: 'A computer vision model designed for training classifiers.',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-12.onnx',
    model: 'mobilenetv2-12.onnx',
    size: '13.32 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'mobilenet_v2_fp16',
    name: 'MobileNet v2',
    description: 'A computer vision model designed for training classifiers.',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/vision/classification/mobilenet',
    model: 'fp16/mobilenetv2-fp16.onnx',
    size: '7.42 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'input': ['float16', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'mobilenet_v2_demo_fp16',
    name: 'MobileNet v2 Demo',
    description: 'A computer vision model designed for training classifiers.',
    note: '',
    source: 'https://huggingface.co/webnn/mobilenet-v2',
    model: 'fp16/image-classification/mobilenet-v2_fp16.onnx',
    size: '7.42 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'pixel_values': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'mobilenet_v2_12_int8',
    name: 'MobileNet v2_12',
    description: 'A computer vision model designed for training classifiers.',
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
    tag: '2h',
    id: 'mobilenet_v2_12_qdq_int8',
    name: 'MobileNet v2_12 QDQ',
    description: 'A computer vision model designed for training classifiers.',
    note: '',
    source: 'https://github.com/onnx/models/blob/main/validated/vision/classification/mobilenet/',
    model: 'int8/mobilenetv2-12-qdq.onnx',
    size: '3.42 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '',
    id: 'mobilenet_v3',
    name: 'MobileNet v3',
    description: 'A computer vision model designed for training classifiers.',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/Computer_Vision/mobilenetv3_small_100_Opset17_timm',
    model: 'mobilenetv3_small_100_Opset17.onnx',
    size: '9.70 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'x': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  ...gteBaseEnV1_5(),
  ...gteSmall(),
  ...jinaClipV1Text(),
  ...jinaClipV1Vision(),
  ...jinaEmbeddingsV2BaseCode(),
  ...jinaRerankerV1TurboEn(),
  ...llama2CStories15MDecoder(),
  ...llama2CStories15MDecoderMerged(),
  ...llama2CStories15MDecoderWithPast(),
  ...llavaDecoder(),
  ...llavaDecoderMerged(),
  ...llavaDecoderWithPast(),
  ...llavaEmbedTokens(),
  ...llavaVisionEncoder(),
  ...llavaPhiDecoderMerged(),
  ...llavaPhiEmbedTokens(),
  ...llavaPhiVisionEncoder(),
  ...moondream2DecoderMerged(),
  ...moondream2EmbedTokens(),
  ...moondream2VisionEncoder(),
  ...mobileVitSmall(),
  ...msmarcoDistilbertBaseV4(),
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_powerpoint_combined_floatie_lre_online_fp32',
  //   name: 'Combined Floatie Lre Online MS PowerPoint',
  //   description: 'Microsoft Office 16 AI model',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/fp32/PowerPointCombinedFloatieLreOnline.onnx',
  //   size: '1.58 MB',
  //   format: 'onnx',
  //   datatype: 'fp32',
  //   inputs: [{
  //     'contexts': ['int64', 1n, [1], {}],
  //     'tcids': ['int64', 1n, [1, 20], {}],
  //     'timings': ['float32', 'random', [1, 20], {}],
  //   }],
  //   inputstip: '[1] [1, 20] [1, 20]'
  // },
  {
    category: 'Microsoft 365',
    tag: '2h',
    id: 'ms_powerpoint_open_lifeguard_desktop_fp32',
    name: 'Open Lifeguard Desktop MS PowerPoint',
    description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 9]',
    note: '',
    source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
    model: 'ms-office/fp32/PowerPointOpenLifeguardDesktop.onnx',
    size: '178 KB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'inputs': ['float32', 'random', [1, 9], { "?": 1 }],
    }],
    inputstip: '[1, 9]'
  },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_powerpoint_open_lifeguard_desktop_20210922_fp32',
  //   name: 'Open Lifeguard Desktop 20210922 MS PowerPoint ',
  //   description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 21]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/fp32/PowerPointOpenLifeguardDesktop20210922.onnx',
  //   size: '445 KB',
  //   format: 'onnx',
  //   datatype: 'fp32',
  //   inputs: [{
  //     'inputs': ['float32', 'random', [1, 21], {"?": 1}],
  //   }],
  //   inputstip: '[1, 21]'
  // },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_powerpoint_combined_floatie_lre_offline_exploration_v3_int8',
  //   name: 'Combined Floatie Lre Offline Exploration V3 MS PowerPoint ',
  //   description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/int8/PowerPointCombinedFloatieLreOfflineExplorationV3.onnx',
  //   size: '629 KB',
  //   format: 'onnx',
  //   datatype: 'int8',
  //   inputs: [{
  //     'raw_timings': ['float32', 'random', [1, 20], {"?": 1}],
  //     'raw_tcids': ['int64', 1n, [1, 20], {"?": 1}],
  //     'raw_contexts': ['int64', 1n, [1], {"?": 1}],
  //     'raw_explicits': ['int64', 1n, [1], {"?": 1}],
  //   }],
  //   inputstip: '[1, 20] [1, 20] [1] [1]'
  // },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_powerpoint_floatie_terminal_v5_int8',
  //   name: 'Floatie Terminal V5 MS PowerPoint ',
  //   description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/int8/PowerPointFloatieTerminalV5.onnx',
  //   size: '1.38 MB',
  //   format: 'onnx',
  //   datatype: 'int8',
  //   inputs: [{
  //     'raw_timings': ['float32', 'random', [1, 20], {"?": 1}],
  //     'raw_tcids': ['int64', 1n, [1, 20], {"?": 1}],
  //     'raw_contexts': ['int64', 1n, [1], {"?": 1}],
  //     'raw_explicits': ['int64', 1n, [1], {"?": 1}],
  //   }],
  //   inputstip: '[1, 20] [1, 20] [1] [1]'
  // },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_powerpoint_combined_floatie_lre_online_v3_int8',
  //   name: 'Combined Floatie Lre Online V3 MS PowerPoint',
  //   description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/int8/PowerPointCombinedFloatieLreOnlineV3.onnx',
  //   size: '553 KB',
  //   format: 'onnx',
  //   datatype: 'int8',
  //   inputs: [{
  //     'raw_timings': ['float32', 'random', [1, 20], {"?": 1}],
  //     'raw_tcids': ['int64', 1n, [1, 20], {"?": 1}],
  //     'raw_contexts': ['int64', 1n, [1], {"?": 1}],
  //     'raw_explicits': ['int64', 1n, [1], {"?": 1}],
  //   }],
  //   inputstip: '[1, 20] [1, 20] [1] [1]'
  // },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_powerpoint_combined_floatie_v4_int8',
  //   name: 'Combined Floatie V4 MS PowerPoint',
  //   description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/int8/PowerPointCombinedFloatieV4.onnx',
  //   size: '412 KB',
  //   format: 'onnx',
  //   datatype: 'int8',
  //   inputs: [{
  //     'raw_timings': ['float32', 'random', [1, 20], {"?": 1}],
  //     'raw_tcids': ['int64', 1n, [1, 20], {"?": 1}],
  //     'raw_contexts': ['int64', 1n, [1], {"?": 1}],
  //     'raw_explicits': ['int64', 1n, [1], {"?": 1}],
  //   }],
  //   inputstip: '[1, 20] [1, 20] [1] [1]'
  // },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_powerpoint_floatie_all_v5_int8',
  //   name: 'Floatie All V5 MS PowerPoint',
  //   description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/int8/PowerPointFloatieAllV5.onnx',
  //   size: '502 KB',
  //   format: 'onnx',
  //   datatype: 'int8',
  //   inputs: [{
  //     'raw_timings': ['float32', 'random', [1, 20], {"?": 1}],
  //     'raw_tcids': ['int64', 1n, [1, 20], {"?": 1}],
  //     'raw_contexts': ['int64', 1n, [1], {"?": 1}],
  //     'raw_explicits': ['int64', 1n, [1], {"?": 1}],
  //   }],
  //   inputstip: '[1, 20] [1, 20] [1] [1]'
  // },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_word_fluency_v2_int8',
  //   name: 'Fluency v2 MS Word [Failed to run]',
  //   description: '[SentencepieceTokenizer(-1) is not a registered function/op] Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/int8/word_fluency_v2.onnx',
  //   size: '13.5 MB',
  //   format: 'onnx',
  //   datatype: 'int8',
  //   inputs: [{
  //     'pre_inputs': ['string', 'random', 'A', {}],
  //     'max_length': ['int64', 1n, [1], {}],
  //     'decoder_start_token_id': ['int64', 1n, [1], {}],
  //     'post_space_sep': ['string[1]', 'random', ['B'], {}],
  //     'post_empty_sep': ['string[1]', 'random', ['C'], {}],
  //     'post_delimiter': ['string', 'random', 'D', {}],
  //   }],
  //   inputstip: ''
  // },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_word_combined_floatie_lre_online_fp32',
  //   name: 'Combined Floatie Lre Online MS Word',
  //   description: 'Microsoft Office 16 AI model',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/fp32/WordCombinedFloatieLreOnline.onnx',
  //   size: '286 KB',
  //   format: 'onnx',
  //   datatype: 'fp32',
  //   inputs: [{
  //     'contexts': ['int64', 1n, [1], {}],
  //     'tcids': ['int64', 1n, [1, 20], {}],
  //     'timings': ['float32', 'random', [1, 20], {}],
  //   }],
  //   inputstip: '[1] [1, 20] [1, 20]'
  // },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_word_combined_floatie_lre_offline_exploration_v3_int8',
  //   name: 'Combined Floatie Lre Offline Exploration V3 MS Word',
  //   description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/int8/WordCombinedFloatieLreOfflineExplorationV3.onnx',
  //   size: '2.05 MB',
  //   format: 'onnx',
  //   datatype: 'int8',
  //   inputs: [{
  //     'raw_timings': ['float32', 'random', [1, 20], {"?": 1}],
  //     'raw_tcids': ['int64', 1n, [1, 20], {"?": 1}],
  //     'raw_contexts': ['int64', 1n, [1], {"?": 1}],
  //     'raw_explicits': ['int64', 1n, [1], {"?": 1}],
  //   }],
  //   inputstip: '[1, 20] [1, 20] [1] [1]'
  // },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_word_combined_floatie_v4_int8',
  //   name: 'Combined Floatie V4 MS Word',
  //   description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/int8/WordCombinedFloatieV4.onnx',
  //   size: '430 KB',
  //   format: 'onnx',
  //   datatype: 'int8',
  //   inputs: [{
  //     'raw_timings': ['float32', 'random', [1, 20], {"?": 1}],
  //     'raw_tcids': ['int64', 1n, [1, 20], {"?": 1}],
  //     'raw_contexts': ['int64', 1n, [1], {"?": 1}],
  //     'raw_explicits': ['int64', 1n, [1], {"?": 1}],
  //   }],
  //   inputstip: '[1, 20] [1, 20] [1] [1]'
  // },
  {
    category: 'Microsoft 365',
    tag: '2h',
    id: 'ms_word_combined_floatie_lre_online_v3_int8',
    name: 'Combined Floatie Lre Online V3 MS Word',
    description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
    note: '',
    source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
    model: 'ms-office/int8/WordCombinedFloatieLreOnlineV3.onnx',
    size: '1.19 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'raw_timings': ['float32', 'random', [1, 20], {"?": 1}],
      'raw_tcids': ['int64', 1n, [1, 20], {"?": 1}],
      'raw_contexts': ['int64', 1n, [1], {"?": 1}],
      'raw_explicits': ['int64', 1n, [1], {"?": 1}],
    }],
    inputstip: '[1, 20] [1, 20] [1] [1]'
  },
  {
    category: 'Microsoft 365',
    tag: '2h',
    id: 'ms_word_combined_floatie_lre_online_v3_static_int8',
    name: 'Combined Floatie Lre Online V3 Static Shape MS Word',
    description: 'Microsoft Office 16 AI model.',
    note: '',
    source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
    model: 'ms-office/int8/WordCombinedFloatieLreOnlineV3Fixed.onnx',
    size: '1.19 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'raw_timings': ['float32', 'random', [1, 20], {}],
      'raw_tcids': ['int64', 1n, [1, 20], {}],
      'raw_contexts': ['int64', 1n, [1], {}],
      'raw_explicits': ['int64', 1n, [1], {}],
    }],
    inputstip: '[1, 20] [1, 20] [1] [1]'
  },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_word_floatie_all_v5_int8',
  //   name: 'Floatie All V5 MS Word',
  //   description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/int8/WordFloatieAllV5.onnx',
  //   size: '507 KB',
  //   format: 'onnx',
  //   datatype: 'int8',
  //   inputs: [{
  //     'raw_timings': ['float32', 'random', [1, 20], {"?": 1}],
  //     'raw_tcids': ['int64', 1n, [1, 20], {"?": 1}],
  //     'raw_contexts': ['int64', 1n, [1], {"?": 1}],
  //     'raw_explicits': ['int64', 1n, [1], {"?": 1}],
  //   }],
  //   inputstip: '[1, 20] [1, 20] [1] [1]'
  // },
  // {
  //   category: 'Microsoft 365',
  //   tag: '2h',
  //   id: 'ms_word_floatie_terminal_v5_int8',
  //   name: 'Floatie Terminal V5 MS Word',
  //   description: 'Microsoft Office 16 AI model. With unnamed dynamic dimensions [?, 20] [?, 20] [?] [?]',
  //   note: '',
  //   source: 'C:\Program Files\Microsoft Office\root\Office16\AI\*.onnx',
  //   model: 'ms-office/int8/WordFloatieTerminalV5.onnx',
  //   size: '993 KB',
  //   format: 'onnx',
  //   datatype: 'int8',
  //   inputs: [{
  //     'raw_timings': ['float32', 'random', [1, 20], {"?": 1}],
  //     'raw_tcids': ['int64', 1n, [1, 20], {"?": 1}],
  //     'raw_contexts': ['int64', 1n, [1], {"?": 1}],
  //     'raw_explicits': ['int64', 1n, [1], {"?": 1}],
  //   }],
  //   inputstip: '[1, 20] [1, 20] [1] [1]'
  // },
  ...mt5SmallDecoder(),
  ...mt5SmallDecoderWithPast(),
  ...mt5SmallDecoderMerged(),
  ...mt5SmallEncoder(),
  ...mxbaiEmbedLargeV1(),
  ...mxbaiRerankBaseV1(),
  ...nomicEmbedTextV1(),
  ...nomicEmbedTextV1_5(),
  ...paraphraseMultilingualMpnetBaseV2(),
  ...phi35MiniInstructMerged(),
  ...phi3Mini4kInstructMerged(),
  ...Qwen2_0_5bInstructMerged(),
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'resnet50_v1',
    name: 'ResNet50 v1',
    description: 'A convolutional neural network that is 50 layers deep.',
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
    tag: '2h',
    id: 'resnet50_v1_fp16',
    name: 'ResNet50 v1',
    description: 'A convolutional neural network that is 50 layers deep.',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/resnet/model/ onnx-public-models/resnet50-v1/opset-12-fp16-fixed-dim',
    model: 'fp16/resnet50-v1-opset-12-fp16-fixed-dim.onnx',
    size: '62.0 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'data': ['float16', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'resnet50_demo_fp16',
    name: 'ResNet50 Demo',
    description: 'A convolutional neural network that is 50 layers deep.',
    note: '',
    source: 'https://huggingface.co/Xenova/resnet-50/',
    model: 'fp16/image-classification/resnet-50_fp16.onnx',
    size: '48.7 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'pixel_values': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1, "num_channels": 3, "height": 224 ," width": 224 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'resnet50_v1_qdq_int8',
    name: 'ResNet50 v1 QDQ',
    description: 'A convolutional neural network that is 50 layers deep.',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/validated/vision/classification/resnet',
    model: 'int8/resnet50-v1-12-qdq.onnx',
    size: '24.5 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'data': ['float32', 'random', [1, 3, 224, 224], { "N": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '',
    id: 'resnet50_v2',
    name: 'ResNet50 v2',
    description: 'A convolutional neural network that is 50 layers deep.',
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
    category: 'Mask Generation',
    tag: '',
    id: 'sam_b_decoder',
    name: 'SAM B Decoder',
    description: 'Segment Anything Model (SAM) produces high quality object masks from input prompts such as points or boxes, and it can be used to generate masks for all objects in an image.',
    note: '',
    source: '',
    model: 'segment-anything/sam-b-decoder.onnx',
    size: '15.7 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'image_embeddings': ['float32', 'random', [1, 256, 64, 64], {}],
      'point_coords': ['float32', 'random', [1, 2, 2], { "num_points": 2 }],
      'point_labels': ['float32', 'random', [1, 2], { "num_points": 2 }],
      'mask_input': ['float32', 'random', [1, 1, 256, 256], {}],
      'has_mask_input': ['float32', 'random', [1], {}],
      'orig_im_size': ['float32', [512, 512], [2], {}]
    }],
    inputstip: '[1, 256, 64, 64] [1, 2, 2] [1, 2] [1, 1, 256, 256] [512, 512] [2]'
  },
  {
    category: 'Mask Generation',
    tag: '',
    id: 'sam_b_encoder',
    name: 'SAM B Encoder',
    description: 'Segment Anything Model (SAM) produces high quality object masks from input prompts such as points or boxes, and it can be used to generate masks for all objects in an image.',
    note: 'Large model',
    source: '',
    model: 'segment-anything/sam-b-encoder.onnx',
    size: '342 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'input_image': ['float32', 1., [224, 224, 3], { "image_height": 224, "image_width": 224 }] }],
    inputstip: '[224, 224, 3]'
  },
  ...samVitBase(),
  ...samVitBasePromptEncoderMaskDecoder(),
  ...samVitBasePromptEncoderMaskDecoderFP16(),
  ...samVitBaseVisionEncoder(),
  {
    category: 'Text-to-Image',
    tag: '2h',
    id: 'sd_turbo_text_encoder_fp32',
    name: 'SD-Turbo Text Encoder',
    description: 'SD-Turbo is a distilled version of Stable Diffusion 2.1, based on a novel training method called Adversarial Diffusion Distillation (ADD), which allows sampling large-scale foundational image diffusion models in 1 to 4 steps at high image quality. ',
    note: 'Large model',
    source: 'https://huggingface.co/schmuell/sd-turbo-ort-web',
    model: 'sd-turbo/text_encoder/model.onnx',
    size: '649 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'input_ids': ['int32', 1, [1, 77], { "batch_size": 1, "sequence_length": 77 }]
    }],
    inputstip: '[1, 77]'
  },
  {
    category: 'Text-to-Image',
    tag: '2h',
    id: 'sd_turbo_unet_fp32',
    name: 'SD-Turbo UNet',
    description: 'SD-Turbo is a distilled version of Stable Diffusion 2.1, based on a novel training method called Adversarial Diffusion Distillation (ADD), which allows sampling large-scale foundational image diffusion models in 1 to 4 steps at high image quality. ',
    note: 'Large model',
    source: 'https://huggingface.co/schmuell/sd-turbo-ort-web',
    model: 'sd-turbo/unet/model.onnx',
    size: '1.61 GB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'sample': ['float32', 1, [1, 4, 64, 64], { "batch_size": 1, "num_channels": 4, "height": 64, "width": 64 }],
      'timestep': ['int64', 1n, [1], { "steps": 1 }],
      'encoder_hidden_states': ['float32', 1, [1, 77, 1024], { "batch_size": 1, "sequence_length": 77 }]
    }],
    inputstip: '[1, 4, 64, 64] [1] [1, 77, 1024]'
  },
  {
    category: 'Text-to-Image',
    tag: '',
    id: 'sd_turbo_vae_decoder_fp32',
    name: 'SD-Turbo VAE Decoder',
    description: 'SD-Turbo is a distilled version of Stable Diffusion 2.1, based on a novel training method called Adversarial Diffusion Distillation (ADD), which allows sampling large-scale foundational image diffusion models in 1 to 4 steps at high image quality. ',
    note: '',
    source: 'https://huggingface.co/schmuell/sd-turbo-ort-web',
    model: 'sd-turbo/vae_decoder/model.onnx',
    size: '94.5 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'latent_sample': ['float32', 'random', [1, 4, 64, 64], { "batch_size": 1, "num_channels_latent": 4, "height_latent": 64, "width_latent": 64 }]
    }],
    inputstip: '[1, 4, 64, 64]'
  },
  {
    category: 'Text-to-Image',
    tag: '2h',
    id: 'sd_turbo_text_encoder_fp16',
    name: 'SD-Turbo Text Encoder (no_layernorm)',
    description: 'SD-Turbo is a distilled version of Stable Diffusion 2.1, based on a novel training method called Adversarial Diffusion Distillation (ADD), which allows sampling large-scale foundational image diffusion models in 1 to 4 steps at high image quality. ',
    note: '',
    source: 'https://huggingface.co/schmuell/sd-turbo-ort-web',
    model: 'fp16/sd-turbo/text_encoder/model.onnx',
    size: '649 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'input_ids': ['int32', 1, [1, 77], {
        'batch_size': 1,
        'sequence_length': 77
      }]
    }],
    inputstip: '[1, 77]'
  },
  {
    category: 'Text-to-Image',
    tag: '2h',
    id: 'sd_turbo_text_encoder_layernorm_demo_fp16',
    name: 'SD-Turbo Text Encoder (layernorm) Demo',
    description: 'SD-Turbo is a distilled version of Stable Diffusion 2.1, based on a novel training method called Adversarial Diffusion Distillation (ADD), which allows sampling large-scale foundational image diffusion models in 1 to 4 steps at high image quality. ',
    note: '',
    source: 'https://huggingface.co/schmuell/sd-turbo-ort-web',
    model: 'fp16/sd-turbo/text_encoder/model_layernorm.onnx',
    size: '649 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'input_ids': ['int32', 1, [1, 77], {}]
    }],
    inputstip: '[1, 77]'
  },
  {
    category: 'Text-to-Image',
    tag: '2h',
    id: 'sd_turbo_unet_fp16',
    name: 'SD-Turbo UNet (no_layernorm)',
    description: 'SD-Turbo is a distilled version of Stable Diffusion 2.1, based on a novel training method called Adversarial Diffusion Distillation (ADD), which allows sampling large-scale foundational image diffusion models in 1 to 4 steps at high image quality. ',
    note: 'Large model',
    source: 'https://huggingface.co/schmuell/sd-turbo-ort-web',
    model: 'fp16/sd-turbo/unet/model.onnx',
    size: '1.61 GB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'sample': ['float16', 1, [1, 4, 64, 64], {}],
      'timestep': ['float16', 1, [1], {}],
      'encoder_hidden_states': ['float16', 1, [1, 77, 1024], {}]
    }],
    inputstip: '[1, 4, 64, 64] [1] [1, 77, 1024]'
  },
  {
    category: 'Text-to-Image',
    tag: '2h',
    id: 'sd_turbo_unet_layernorm_demo_fp16',
    name: 'SD-Turbo UNet (layernorm) Demo',
    description: 'SD-Turbo is a distilled version of Stable Diffusion 2.1, based on a novel training method called Adversarial Diffusion Distillation (ADD), which allows sampling large-scale foundational image diffusion models in 1 to 4 steps at high image quality. ',
    note: 'Large model',
    source: 'https://huggingface.co/schmuell/sd-turbo-ort-web',
    model: 'fp16/sd-turbo/unet/model_layernorm.onnx',
    size: '1.61 GB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'sample': ['float16', 1, [1, 4, 64, 64], {}],
      'timestep': ['float16', 1, [1], {}],
      'encoder_hidden_states': ['float16', 1, [1, 77, 1024], {}]
    }],
    inputstip: '[1, 4, 64, 64] [1] [1, 77, 1024]'
  },
  {
    category: 'Zero-Shot Image Classification',
    tag: '2h',
    id: 'sd_safety_checker_demo_fp16',
    name: 'SD Safety Checker Demo',
    description: 'Can be used for identifying not safe for work (NSFW) image. Should not be used to intentionally create hostile or alienating environments for people.',
    note: 'Large model',
    source: 'https://github.com/microsoft/Olive/tree/main/examples/directml/stable_diffusion#test-inference',
    model: 'fp16/sd_safety_checker_int32_reduceSum.onnx',
    size: '580 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'clip_input': ['float16', 1, [1, 3, 224, 224], { "batch": 1, "channels": 3, "height": 224, "width": 224 }],
      'images': ['float16', 1, [1, 224, 224, 3], { "batch": 1, "height": 224, "width": 224, "channels": 3 }]
    }],
    inputstip: '[1, 3, 224, 224] [1, 224, 224, 3]'
  },
  {
    category: 'Text-to-Image',
    tag: '2h',
    id: 'sd_1_5_text_encoder_demo_fp16',
    name: 'SD 1.5 text Encoder Demo',
    description: 'Stable Diffusion 1.5, a latent text-to-image diffusion model capable of generating photo-realistic images given any text input.',
    note: '',
    source: 'https://huggingface.co/aluhrs13/stable-diffusion-v1-5-olive-optimized/tree/main/text_encoder',
    model: 'fp16/stable-diffusion-1.5/text-encoder.onnx',
    size: '235 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'input_ids': ['int32', 1, [2, 77], { "batch": 2, "sequence": 77 }]
    }],
    inputstip: '[2, 77]'
  },
  {
    category: 'Text-to-Image',
    tag: '2h',
    id: 'sd_1_5_unet_demo_fp16',
    name: 'SD 1.5 UNet (layernorm) Demo',
    description: 'Stable Diffusion 1.5, a latent text-to-image diffusion model capable of generating photo-realistic images given any text input.',
    note: 'Large model',
    source: 'https://huggingface.co/runwayml/stable-diffusion-v1-5',
    model: 'fp16/stable-diffusion-1.5/sd-unet-v1.5-model-b2c4h64w64s77-float16-compute-and-inputs-layernorm.onnx',
    size: '1.60 GB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'sample': ['float16', 1, [2, 4, 64, 64], {}],
      'timestep': ['int64', 1n, [2], {}],
      'encoder_hidden_states': ['float16', 1, [2, 77, 768], {}]
    }],
    inputstip: '[2, 4, 64, 64] [2] [2, 77, 768]'
  },
  {
    category: 'Text-to-Image',
    tag: '2h',
    id: 'sd_vae_decoder_demo_fp16',
    name: 'SD (1.5 + Turbo) VAE Decoder Demo',
    description: 'Stable Diffusion 1.5, a latent text-to-image diffusion model capable of generating photo-realistic images given any text input.',
    note: '',
    source: 'N/A',
    model: 'fp16/stable-diffusion-1.5/Stable-Diffusion-v1.5-vae-decoder-float16-fp32-instancenorm.onnx',
    size: '94.5 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'latent_sample': ['float16', 'random', [1, 4, 64, 64], { "batch": 1, "channels": 4, "height": 64, "width": 64 }]
    }],
    inputstip: '[1, 4, 64, 64]'
  },
  {
    category: 'Text-to-Image',
    tag: '',
    id: 'sd_2_1_vae_decoder',
    name: 'SD 2.1 VAE Decoder',
    description: 'Stable Diffusion 2.1, a latent text-to-image diffusion model capable of generating photo-realistic images given any text input.',
    note: 'Slow on CPU. Reduce number of runs and run this model tests individually rather than together with other models.',
    source: 'https://huggingface.co/aislamov/stable-diffusion-2-1-base-onnx/tree/main',
    model: 'sd-2.1-vae-decoder.onnx',
    size: '94.5 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'latent_sample': ['float32', 'random', [1, 4, 64, 64], {
        "vaedec_sample_batch": 1,
        "vaedec_sample_channels": 4,
        "vaedec_sample_height": 64,
        "vaedec_sample_width": 64
      }]
    }],
    inputstip: '[1, 4, 64, 64]'
  },
  {
    category: 'Text-to-Image',
    tag: '',
    id: 'sd_2_1_vae_encoder',
    name: 'SD 2.1 VAE Encoder',
    description: 'Stable Diffusion 2.1, a latent text-to-image diffusion model capable of generating photo-realistic images given any text input.',
    note: 'Slow on CPU. Reduce number of runs and run this model tests individually rather than together with other models.',
    source: 'https://huggingface.co/aislamov/stable-diffusion-2-1-base-onnx/tree/main',
    model: 'sd-2.1-vae-encoder.onnx',
    size: '130.42 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'sample': ['float32', 'random', [1, 3, 512, 512], {
        "vaeenc_sample_batch": 1,
        "vaeenc_sample_channels": 3,
        "vaeenc_sample_height": 512,
        "vaeenc_sample_width": 512
      }]
    }],
    inputstip: '[1, 3, 512, 512]'
  },
  {
    category: 'Mask Generation',
    tag: '2h',
    id: 'segment_anything_decoder',
    name: 'Segment Anything Decoder',
    description: 'An AI model from Meta AI that can cut out any object in any image.',
    note: '',
    source: 'MSFT',
    model: 'segment-anything/sam_vit_b_01ec64.decoder.onnx',
    size: '15.7 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'image_embeddings': ['float32', 'random', [1, 256, 64, 64], {}],
      'point_coords': ['float32', 'random', [1, 2, 2], { "num_points": 2 }],
      'point_labels': ['float32', 'random', [1, 2], { "num_points": 2 }],
      'mask_input': ['float32', 'random', [1, 1, 256, 256], {}],
      'has_mask_input': ['float32', 'random', [1], {}],
      'orig_im_size': ['float32', [512, 512], [2], {}]
    }],
    inputstip: '[1, 256, 64, 64] [1, 2, 2] [1, 2] [1, 1, 256, 256] [1] [2]'
  },
  {
    category: 'Mask Generation',
    tag: '2h',
    id: 'segment_anything_decoder_demo_fp16',
    name: 'Segment Anything Decoder Demo',
    description: 'An AI model from Meta AI that can cut out any object in any image.',
    note: '',
    source: 'MSFT',
    model: 'fp16/segment-anything/sam_vit_b_01ec64.decoder-fp16.onnx',
    size: '8.04 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'image_embeddings': ['float32', 'random', [1, 256, 64, 64], {}],
      'point_coords': ['float32', 'random', [1, 2, 2], { "num_points": 2 }],
      'point_labels': ['float32', 'random', [1, 2], { "num_points": 2 }],
      'mask_input': ['float32', 'random', [1, 1, 256, 256], {}],
      'has_mask_input': ['float32', 'random', [1], {}],
      'orig_im_size': ['float32', [512, 512], [2], {}]
    }],
    inputstip: '[1, 256, 64, 64] [1, 2, 2] [1, 2] [1, 1, 256, 256] [1] [2]'
  },
  {
    category: 'Mask Generation',
    tag: '2h',
    id: 'segment_anything_encoder_demo_fp16',
    name: 'Segment Anything Encoder Demo',
    description: 'An AI model from Meta AI that can cut out any object in any image.',
    note: '',
    source: 'MSFT',
    model: 'fp16/segment-anything/sam_vit_b_01ec64.encoder-fp16.onnx',
    size: '171 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'input_image': ['float32', 'random', [1, 3, 1024, 1024], {}]
    }],
    inputstip: '[1, 3, 1024, 1024]'
  },

  {
    category: 'Image Segmentation',
    tag: '',
    id: 'selfie_segmentation_general',
    name: 'Selfie Segmentation General',
    description: 'Easily separate the background from users within a scene and focus on what matters.',
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
    category: 'Image Segmentation',
    tag: '',
    id: 'selfie_segmentation_landscape',
    name: 'Selfie Segmentation Landscape',
    description: 'Easily separate the background from users within a scene and focus on what matters.',
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
    category: 'Image Classification',
    tag: '',
    id: 'shufflenet_fp16',
    name: 'ShuffleNet',
    description: 'An Extremely Efficient Convolutional Neural Network for Mobile Devices',
    note: '',
    source: '',
    model: 'fp16/shufflenet-v2-opset-12-fp16.onnx',
    size: '4.42 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'input': ['float16', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 224, 224]'
  },
  {
    category: 'Image Classification',
    id: 'shufflenet_int8',
    name: 'ShuffleNet',
    description: 'An Extremely Efficient Convolutional Neural Network for Mobile Devices',
    note: '',
    source: '',
    model: 'int8/shufflenet-v2-opset-12-int8.onnx',
    size: '2.27 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  ...SnowflakeArcticEmbedM(),
  ...squeezebertUncased(),
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'squeezenet',
    name: 'SqueezeNet 1.1',
    description: 'A deep convolutional neural network (CNN) perform image classification.',
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
    tag: '2h',
    id: 'squeezenet_fp16',
    name: 'SqueezeNet 1.0',
    description: 'A deep convolutional neural network (CNN) perform image classification.',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/classification/squeezenet/model/ onnx-public-models',
    model: 'fp16/squeezenet1.0-opset-12-fp16.onnx',
    size: '2.36 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'data_0': ['float16', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '2h',
    id: 'squeezenet_qdq_int8',
    name: 'SqueezeNet 1.0 QDQ',
    description: 'A deep convolutional neural network (CNN) perform image classification.',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/validated/vision/classification/squeezenet',
    model: 'int8/squeezenet1.0-13-qdq.onnx',
    size: '1.28 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'data_0': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Object Detection',
    tag: '',
    id: 'ssd_fp16',
    name: 'SSD',
    description: 'Single-Shot multibox Detection (SSD) network for detecting objects in images using a single deep neural network',
    note: '',
    source: '',
    model: 'fp16/ssd-opset-12-fp16.onnx',
    size: '38.3 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'image': ['float16', 'random', [1, 3, 1200, 1200], {}] }],
    inputstip: '[1, 3, 1200, 1200]'
  },
  {
    category: 'Object Detection',
    tag: '',
    id: 'ssd_mobilenet_v1_fp16',
    name: 'SSD MobileNet v1',
    description: 'Single-Shot multibox Detection (SSD) network intended to perform object detection',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/validated/vision/object_detection_segmentation/ssd-mobilenetv1',
    model: 'fp16/ssd-mobilenet-v1-opset-12-fp16.onnx',
    size: '16.9 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'inputs': ['uint8', 1, [1, 224, 224, 3], { "unk__6578": 1, "unk__6579": 224, "unk__6580": 224 }] }],
    inputstip: '[1, 224, 224, 3]'
  },
  {
    category: 'Object Detection',
    id: 'ssd_mobilenet_v1_int8',
    name: 'SSD MobileNet v1',
    description: 'Single-Shot multibox Detection (SSD) network intended to perform object detection',
    note: '',
    source: '',
    model: 'int8/ssd-mobilenet-v1-opset-12-int8.onnx',
    size: '8.54 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'inputs': ['float32', 'random', [1, 224, 224, 3], {"unk__6578": 1, "unk__6579": 224, "unk__6580": 224 }] }],
    inputstip: '[1, 224, 224, 3]'
  },
  {
    category: 'Object Detection',
    tag: '',
    id: 'ssd_mobilenet_v1_qdq_int8',
    name: 'SSD MobileNet v1 QDQ',
    description: 'Single-Shot multibox Detection (SSD) network intended to perform object detection',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/validated/vision/object_detection_segmentation/ssd-mobilenetv1',
    model: 'int8/ssd_mobilenet_v1_13-qdq.onnx',
    size: '9.54 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'inputs': ['uint8', 1, [1, 224, 224, 3], { "unk__6578": 1, "unk__6579": 224, "unk__6580": 224 }] }],
    inputstip: '[1, 224, 224, 3]'
  },
  {
    category: 'Object Detection',
    id: 'ssd_int8',
    name: 'SSD',
    description: 'Single-Shot multibox Detection (SSD) network for detecting objects in images using a single deep neural network',
    note: '',
    source: '',
    model: 'int8/ssd-opset-12-int8.onnx',
    size: '19.5 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'image': ['float32', 'random', [1, 3, 1200, 1200], {}] }],
    inputstip: '[1, 3, 1200, 1200]'
  },
  {
    category: 'Object Detection',
    id: 'ssd_qdq_int8',
    name: 'SSD QDQ',
    description: 'Single-Shot multibox Detection (SSD) network for detecting objects in images using a single deep neural network',
    note: '',
    source: 'https://github.com/onnx/models/tree/main/validated/vision/object_detection_segmentation/ssd',
    model: 'int8/ssd-12-qdq.onnx',
    size: '19.5 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'image': ['float32', 'random', [1, 3, 1200, 1200], {}] }],
    inputstip: '[1, 3, 1200, 1200]'
  },
  {
    category: 'Image Classification',
    id: 'swin_small_fp32',
    tag: '2h',
    name: '[dml-ai-hub] Swim Small',
    description: 'https://huggingface.co/microsoft/dml-ai-hub-models/',
    note: '',
    source: 'https://huggingface.co/microsoft/dml-ai-hub-models/',
    model: 'dml-ai-hub-models/swin_small.onnx',
    size: '192 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'image_tensor': ['float32', 'random', [1, 3, 224, 224], {}] }],
    inputstip: '[1, 3, 224, 224]'
  },
  ...t5SmallDecoder(),
  ...t5SmallDecoderWithPast(),
  ...t5SmallDecoderMerged(),
  ...t5SmallEncoder(),
  ...tinyLlamaV0Decoder(),
  ...tinyLlamaV0DecoderMerged(),
  ...tinyLlamaV0DecoderWithPast(),
  ...tinyLlama1_1BChatv1_0Merged(),
  ...tinyLlama1_1BChatv1_0Merged_2(),
  ...metaLlama_3_8bInstructMerged(),
  {
    category: 'Object Detection',
    tag: '',
    id: 'tinyyolo_v2',
    name: 'Tiny YOLO v2',
    description: 'A real-time neural network for object detection.',
    note: '',
    source: 'https://github.com/onnx/models/raw/main/vision/object_detection_segmentation/tiny-yolov2/model/tinyyolov2-8.onnx',
    model: 'tinyyolov2-8.onnx',
    size: '60.5 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'image': ['float32', 'random', [1, 3, 416, 416], { "None": 1 }] }],
    inputstip: '[1, 3, 416, 416]'
  },
  ...uaeLargeV1(),
  ...UniVaRLambda1(),
  ...vitBasePatch16224(),
  ...vitGpt2ImageCaptioningDecoder(),
  ...vitGpt2ImageCaptioningDecoderWithPast(),
  ...vitGpt2ImageCaptioningDecoderMerged(),
  ...vitGpt2ImageCaptioningEncoder(),
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'voiceitt_casr_decoder_epoch_fp32',
    name: 'ISV Voiceitt CASR.JS Decoder Epoch',
    description: 'Voiceitt CASR.JS Library',
    note: '',
    source: 'https://www.voiceitt.com/',
    model: 'isv/voiceitt/onnx/decoder-epoch-40-avg-10.onnx',
    size: '1.99MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'y': ['int64', 99n, [1000, 2], { "N": 1000 }],
    }],
    inputstip: '[1000, 2]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'voiceitt_casr_encoder_epoch_40_merged_int8',
    name: 'ISV Voiceitt CASR.JS Encoder Epoch 40 KV-Cache',
    description: 'Voiceitt CASR.JS Library',
    note: '',
    source: 'https://www.voiceitt.com/',
    model: 'isv/voiceitt/onnx/encoder-epoch-40-avg-10.qt8.onnx',
    size: '120MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'x': ['float32', 'random', [1,39,80], {"N": 1}],
      'cached_val_4': ['float32', 'random', [4,32,1,96], {}],
      'cached_val_3': ['float32', 'random', [2,8,1,96], {}],
      'cached_val_2': ['float32', 'random', [3,16,1,96], {}],
      'cached_val_1': ['float32', 'random', [4,32,1,96], {}],
      'cached_val_0': ['float32', 'random', [2,64,1,96], {}],
      'cached_val2_4': ['float32', 'random', [4,32,1,96], {}],
      'cached_val2_3': ['float32', 'random', [2,8,1,96], {}],
      'cached_val2_2': ['float32', 'random', [3,16,1,96], {}],
      'cached_val2_1': ['float32', 'random', [4,32,1,96], {}],
      'cached_val2_0': ['float32', 'random', [2,64,1,96], {}],
      'cached_len_4': ['int64', 1n, [4,1], {}],
      'cached_len_3': ['int64', 1n, [2,1], {}],
      'cached_len_2': ['int64', 1n, [3,1], {}],
      'cached_len_1': ['int64', 1n, [4,1], {}],
      'cached_len_0': ['int64', 1n, [2,1], {}],
      'cached_key_4': ['float32', 'random', [4,32,1,192], {}],
      'cached_key_3': ['float32', 'random', [2,8,1,192], {}],
      'cached_key_2': ['float32', 'random', [3,16,1,192], {}],
      'cached_key_1': ['float32', 'random', [4,32,1,192], {}],
      'cached_key_0': ['float32', 'random', [2,64,1,192], {}],
      'cached_conv2_4': ['float32', 'random', [4,1,384,30], {}],
      'cached_conv2_3': ['float32', 'random', [2,1,384,30], {}],
      'cached_conv2_2': ['float32', 'random', [3,1,384,30], {}],
      'cached_conv2_1': ['float32', 'random', [4,1,384,30], {}],
      'cached_conv2_0': ['float32', 'random', [2,1,384,30], {}],
      'cached_conv1_4': ['float32', 'random', [4,1,384,30], {}],
      'cached_conv1_3': ['float32', 'random', [2,1,384,30], {}],
      'cached_conv1_2': ['float32', 'random', [3,1,384,30], {}],
      'cached_conv1_1': ['float32', 'random', [4,1,384,30], {}],
      'cached_conv1_0': ['float32', 'random', [2,1,384,30], {}],
      'cached_avg_4': ['float32', 'random', [4,1,384], {}],
      'cached_avg_3': ['float32', 'random', [2,1,384], {}],
      'cached_avg_2': ['float32', 'random', [3,1,384], {}],
      'cached_avg_1': ['float32', 'random', [4,1,384], {}],
      'cached_avg_0': ['float32', 'random', [2,1,384], {}]
    }],
    inputstip: '[1, 39, 80]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'voiceitt_casr_encoder_epoch_70_merged_int8',
    name: 'ISV Voiceitt CASR.JS Encoder Epoch 70 KV-Cache',
    description: 'Voiceitt CASR.JS Library',
    note: '',
    source: 'https://www.voiceitt.com/',
    model: 'isv/voiceitt/onnx/encoder-epoch-70-avg-20.onnx',
    size: '147MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'x_lens': ['int64', 1n, [1], {"N": 1}],
      'x': ['float32', 'random', [1,45,80], {}],
      'processed_lens': ['int64', 1n, [1], {}],
      'embed_states': ['float32', 'random', [1,128,3,19], {}],
      'cached_val2_9': ['float32', 'random', [16,1,96], {}],
      'cached_val2_8': ['float32', 'random', [16,1,96], {}],
      'cached_val2_7': ['float32', 'random', [32,1,48], {}],
      'cached_val2_6': ['float32', 'random', [32,1,48], {}],
      'cached_val2_5': ['float32', 'random', [32,1,48], {}],
      'cached_val2_4': ['float32', 'random', [32,1,48], {}],
      'cached_val2_3': ['float32', 'random', [64,1,48], {}],
      'cached_val2_2': ['float32', 'random', [64,1,48], {}],
      'cached_val2_18': ['float32', 'random', [64,1,48], {}],
      'cached_val2_17': ['float32', 'random', [64,1,48], {}],
      'cached_val2_16': ['float32', 'random', [32,1,48], {}],
      'cached_val2_15': ['float32', 'random', [32,1,48], {}],
      'cached_val2_14': ['float32', 'random', [32,1,48], {}],
      'cached_val2_13': ['float32', 'random', [32,1,48], {}],
      'cached_val2_12': ['float32', 'random', [16,1,96], {}],
      'cached_val2_11': ['float32', 'random', [16,1,96], {}],
      'cached_val2_10': ['float32', 'random', [16,1,96], {}],
      'cached_val2_1': ['float32', 'random', [128,1,48], {}],
      'cached_val2_0': ['float32', 'random', [128,1,48], {}],
      'cached_val1_9': ['float32', 'random', [16,1,96], {}],
      'cached_val1_8': ['float32', 'random', [16,1,96], {}],
      'cached_val1_7': ['float32', 'random', [32,1,48], {}],
      'cached_val1_6': ['float32', 'random', [32,1,48], {}],
      'cached_val1_5': ['float32', 'random', [32,1,48], {}],
      'cached_val1_4': ['float32', 'random', [32,1,48], {}],
      'cached_val1_3': ['float32', 'random', [64,1,48], {}],
      'cached_val1_2': ['float32', 'random', [64,1,48], {}],
      'cached_val1_18': ['float32', 'random', [64,1,48], {}],
      'cached_val1_17': ['float32', 'random', [64,1,48], {}],
      'cached_val1_16': ['float32', 'random', [32,1,48], {}],
      'cached_val1_15': ['float32', 'random', [32,1,48], {}],
      'cached_val1_14': ['float32', 'random', [32,1,48], {}],
      'cached_val1_13': ['float32', 'random', [32,1,48], {}],
      'cached_val1_12': ['float32', 'random', [16,1,96], {}],
      'cached_val1_11': ['float32', 'random', [16,1,96], {}],
      'cached_val1_10': ['float32', 'random', [16,1,96], {}],
      'cached_val1_1': ['float32', 'random', [128,1,48], {}],
      'cached_val1_0': ['float32', 'random', [128,1,48], {}],
      'cached_nonlin_attn_18': ['float32', 'random', [1,1,64,192], {}],
      'cached_nonlin_attn_17': ['float32', 'random', [1,1,64,192], {}],
      'cached_nonlin_attn_16': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_15': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_14': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_13': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_12': ['float32', 'random', [1,1,16,576], {}],
      'cached_nonlin_attn_11': ['float32', 'random', [1,1,16,576], {}],
      'cached_nonlin_attn_10': ['float32', 'random', [1,1,16,576], {}],
      'cached_nonlin_attn_9': ['float32', 'random', [1,1,16,576], {}],
      'cached_nonlin_attn_8': ['float32', 'random', [1,1,16,576], {}],
      'cached_nonlin_attn_7': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_6': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_5': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_4': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_3': ['float32', 'random', [1,1,64,192], {}],
      'cached_nonlin_attn_2': ['float32', 'random', [1,1,64,192], {}],
      'cached_nonlin_attn_1': ['float32', 'random', [1,1,128,144], {}],
      'cached_nonlin_attn_0': ['float32', 'random', [1,1,128,144], {}],
      'cached_key_18': ['float32', 'random', [64,1,128], {}],
      'cached_key_17': ['float32', 'random', [64,1,128], {}],
      'cached_key_16': ['float32', 'random', [32,1,128], {}],
      'cached_key_15': ['float32', 'random', [32,1,128], {}],
      'cached_key_14': ['float32', 'random', [32,1,128], {}],
      'cached_key_13': ['float32', 'random', [32,1,128], {}],
      'cached_key_12': ['float32', 'random', [16,1,256], {}],
      'cached_key_11': ['float32', 'random', [16,1,256], {}],
      'cached_key_10': ['float32', 'random', [16,1,256], {}],
      'cached_key_9': ['float32', 'random', [16,1,256], {}],
      'cached_key_8': ['float32', 'random', [16,1,256], {}],
      'cached_key_7': ['float32', 'random', [32,1,128], {}],
      'cached_key_6': ['float32', 'random', [32,1,128], {}],
      'cached_key_5': ['float32', 'random', [32,1,128], {}],
      'cached_key_4': ['float32', 'random', [32,1,128], {}],
      'cached_key_3': ['float32', 'random', [64,1,128], {}],
      'cached_key_2': ['float32', 'random', [64,1,128], {}],
      'cached_key_1': ['float32', 'random', [128,1,128], {}],
      'cached_key_0': ['float32', 'random', [128,1,128], {}],
      'cached_conv2_9': ['float32', 'random', [1,768,7], {}],
      'cached_conv2_8': ['float32', 'random', [1,768,7], {}],
      'cached_conv2_7': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_6': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_5': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_4': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_3': ['float32', 'random', [1,256,15], {}],
      'cached_conv2_2': ['float32', 'random', [1,256,15], {}],
      'cached_conv2_18': ['float32', 'random', [1,256,15], {}],
      'cached_conv2_17': ['float32', 'random', [1,256,15], {}],
      'cached_conv2_16': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_15': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_14': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_13': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_12': ['float32', 'random', [1,768,7], {}],
      'cached_conv2_11': ['float32', 'random', [1,768,7], {}],
      'cached_conv2_10': ['float32', 'random', [1,768,7], {}],
      'cached_conv2_1': ['float32', 'random', [1,192,15], {}],
      'cached_conv2_0': ['float32', 'random', [1,192,15], {}],
      'cached_conv1_9': ['float32', 'random', [1,768,7], {}],
      'cached_conv1_8': ['float32', 'random', [1,768,7], {}],
      'cached_conv1_7': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_6': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_5': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_4': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_3': ['float32', 'random', [1,256,15], {}],
      'cached_conv1_2': ['float32', 'random', [1,256,15], {}],
      'cached_conv1_18': ['float32', 'random', [1,256,15], {}],
      'cached_conv1_17': ['float32', 'random', [1,256,15], {}],
      'cached_conv1_16': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_15': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_14': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_13': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_12': ['float32', 'random', [1,768,7], {}],
      'cached_conv1_11': ['float32', 'random', [1,768,7], {}],
      'cached_conv1_10': ['float32', 'random', [1,768,7], {}],
      'cached_conv1_1': ['float32', 'random', [1,192,15], {}],
      'cached_conv1_0': ['float32', 'random', [1,192,15], {}],
    }],
    inputstip: '[1, 45, 80] [1] [1 [1, 128, 3, 19]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'voiceitt_casr_encoder_epoch_70_static_merged_fp32',
    name: 'ISV Voiceitt CASR.JS Encoder Epoch 70 Static Shape KV-Cache',
    description: 'Voiceitt CASR.JS Library',
    note: '',
    source: 'https://www.voiceitt.com/',
    model: 'isv/voiceitt/onnx/encoder-epoch-70-avg-1-chunk-16-left-128-ps.onnx',
    size: '578MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'x_lens': ['int64', 1n, [1], {}],
      'x': ['float32', 'random', [1,45,80], {}],
      'processed_lens': ['int64', 1n, [1], {}],
      'embed_states': ['float32', 'random', [1,128,3,19], {}],
      'cached_val2_9': ['float32', 'random', [16,1,96], {}],
      'cached_val2_8': ['float32', 'random', [16,1,96], {}],
      'cached_val2_7': ['float32', 'random', [32,1,48], {}],
      'cached_val2_6': ['float32', 'random', [32,1,48], {}],
      'cached_val2_5': ['float32', 'random', [32,1,48], {}],
      'cached_val2_4': ['float32', 'random', [32,1,48], {}],
      'cached_val2_3': ['float32', 'random', [64,1,48], {}],
      'cached_val2_2': ['float32', 'random', [64,1,48], {}],
      'cached_val2_18': ['float32', 'random', [64,1,48], {}],
      'cached_val2_17': ['float32', 'random', [64,1,48], {}],
      'cached_val2_16': ['float32', 'random', [32,1,48], {}],
      'cached_val2_15': ['float32', 'random', [32,1,48], {}],
      'cached_val2_14': ['float32', 'random', [32,1,48], {}],
      'cached_val2_13': ['float32', 'random', [32,1,48], {}],
      'cached_val2_12': ['float32', 'random', [16,1,96], {}],
      'cached_val2_11': ['float32', 'random', [16,1,96], {}],
      'cached_val2_10': ['float32', 'random', [16,1,96], {}],
      'cached_val2_1': ['float32', 'random', [128,1,48], {}],
      'cached_val2_0': ['float32', 'random', [128,1,48], {}],
      'cached_val1_9': ['float32', 'random', [16,1,96], {}],
      'cached_val1_8': ['float32', 'random', [16,1,96], {}],
      'cached_val1_7': ['float32', 'random', [32,1,48], {}],
      'cached_val1_6': ['float32', 'random', [32,1,48], {}],
      'cached_val1_5': ['float32', 'random', [32,1,48], {}],
      'cached_val1_4': ['float32', 'random', [32,1,48], {}],
      'cached_val1_3': ['float32', 'random', [64,1,48], {}],
      'cached_val1_2': ['float32', 'random', [64,1,48], {}],
      'cached_val1_18': ['float32', 'random', [64,1,48], {}],
      'cached_val1_17': ['float32', 'random', [64,1,48], {}],
      'cached_val1_16': ['float32', 'random', [32,1,48], {}],
      'cached_val1_15': ['float32', 'random', [32,1,48], {}],
      'cached_val1_14': ['float32', 'random', [32,1,48], {}],
      'cached_val1_13': ['float32', 'random', [32,1,48], {}],
      'cached_val1_12': ['float32', 'random', [16,1,96], {}],
      'cached_val1_11': ['float32', 'random', [16,1,96], {}],
      'cached_val1_10': ['float32', 'random', [16,1,96], {}],
      'cached_val1_1': ['float32', 'random', [128,1,48], {}],
      'cached_val1_0': ['float32', 'random', [128,1,48], {}],
      'cached_nonlin_attn_18': ['float32', 'random', [1,1,64,192], {}],
      'cached_nonlin_attn_17': ['float32', 'random', [1,1,64,192], {}],
      'cached_nonlin_attn_16': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_15': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_14': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_13': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_12': ['float32', 'random', [1,1,16,576], {}],
      'cached_nonlin_attn_11': ['float32', 'random', [1,1,16,576], {}],
      'cached_nonlin_attn_10': ['float32', 'random', [1,1,16,576], {}],
      'cached_nonlin_attn_9': ['float32', 'random', [1,1,16,576], {}],
      'cached_nonlin_attn_8': ['float32', 'random', [1,1,16,576], {}],
      'cached_nonlin_attn_7': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_6': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_5': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_4': ['float32', 'random', [1,1,32,384], {}],
      'cached_nonlin_attn_3': ['float32', 'random', [1,1,64,192], {}],
      'cached_nonlin_attn_2': ['float32', 'random', [1,1,64,192], {}],
      'cached_nonlin_attn_1': ['float32', 'random', [1,1,128,144], {}],
      'cached_nonlin_attn_0': ['float32', 'random', [1,1,128,144], {}],
      'cached_key_18': ['float32', 'random', [64,1,128], {}],
      'cached_key_17': ['float32', 'random', [64,1,128], {}],
      'cached_key_16': ['float32', 'random', [32,1,128], {}],
      'cached_key_15': ['float32', 'random', [32,1,128], {}],
      'cached_key_14': ['float32', 'random', [32,1,128], {}],
      'cached_key_13': ['float32', 'random', [32,1,128], {}],
      'cached_key_12': ['float32', 'random', [16,1,256], {}],
      'cached_key_11': ['float32', 'random', [16,1,256], {}],
      'cached_key_10': ['float32', 'random', [16,1,256], {}],
      'cached_key_9': ['float32', 'random', [16,1,256], {}],
      'cached_key_8': ['float32', 'random', [16,1,256], {}],
      'cached_key_7': ['float32', 'random', [32,1,128], {}],
      'cached_key_6': ['float32', 'random', [32,1,128], {}],
      'cached_key_5': ['float32', 'random', [32,1,128], {}],
      'cached_key_4': ['float32', 'random', [32,1,128], {}],
      'cached_key_3': ['float32', 'random', [64,1,128], {}],
      'cached_key_2': ['float32', 'random', [64,1,128], {}],
      'cached_key_1': ['float32', 'random', [128,1,128], {}],
      'cached_key_0': ['float32', 'random', [128,1,128], {}],
      'cached_conv2_9': ['float32', 'random', [1,768,7], {}],
      'cached_conv2_8': ['float32', 'random', [1,768,7], {}],
      'cached_conv2_7': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_6': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_5': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_4': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_3': ['float32', 'random', [1,256,15], {}],
      'cached_conv2_2': ['float32', 'random', [1,256,15], {}],
      'cached_conv2_18': ['float32', 'random', [1,256,15], {}],
      'cached_conv2_17': ['float32', 'random', [1,256,15], {}],
      'cached_conv2_16': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_15': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_14': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_13': ['float32', 'random', [1,512,7], {}],
      'cached_conv2_12': ['float32', 'random', [1,768,7], {}],
      'cached_conv2_11': ['float32', 'random', [1,768,7], {}],
      'cached_conv2_10': ['float32', 'random', [1,768,7], {}],
      'cached_conv2_1': ['float32', 'random', [1,192,15], {}],
      'cached_conv2_0': ['float32', 'random', [1,192,15], {}],
      'cached_conv1_9': ['float32', 'random', [1,768,7], {}],
      'cached_conv1_8': ['float32', 'random', [1,768,7], {}],
      'cached_conv1_7': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_6': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_5': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_4': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_3': ['float32', 'random', [1,256,15], {}],
      'cached_conv1_2': ['float32', 'random', [1,256,15], {}],
      'cached_conv1_18': ['float32', 'random', [1,256,15], {}],
      'cached_conv1_17': ['float32', 'random', [1,256,15], {}],
      'cached_conv1_16': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_15': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_14': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_13': ['float32', 'random', [1,512,7], {}],
      'cached_conv1_12': ['float32', 'random', [1,768,7], {}],
      'cached_conv1_11': ['float32', 'random', [1,768,7], {}],
      'cached_conv1_10': ['float32', 'random', [1,768,7], {}],
      'cached_conv1_1': ['float32', 'random', [1,192,15], {}],
      'cached_conv1_0': ['float32', 'random', [1,192,15], {}],
    }],
    inputstip: '[1, 45, 80] [1] [1] [1, 128, 3, 19]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'voiceitt_casr_joiner_epoch_fp32',
    name: 'ISV Voiceitt CASR.JS Joiner Epoch',
    description: 'Voiceitt CASR.JS Library',
    note: '',
    source: 'https://www.voiceitt.com/',
    model: 'isv/voiceitt/onnx/joiner-epoch-40-avg-10.onnx',
    size: '0.97MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'encoder_out': ['float32', 'random', [1000, 512], { "N": 1000 }],
      'decoder_out': ['float32', 'random', [1000, 512], { "N": 1000 }]
    }],
    inputstip: '[1000, 512] [1000, 512]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'voiceitt_casr_tack_fbank_fp32',
    name: 'ISV Voiceitt CASR.JS Library Tack Fbank',
    description: 'Voiceitt CASR.JS Library',
    note: '',
    source: 'https://www.voiceitt.com/',
    model: 'isv/voiceitt/onnx/tack_fbank.onnx',
    size: '90.6KB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'audio': ['float32', 'random', [1, 1000], { "length": 1000 }]
    }],
    inputstip: '[1, 1000]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'voiceitt_casr_tack_mfcc_fp32',
    name: 'ISV Voiceitt CASR.JS Library Tack MFCC',
    description: 'Voiceitt CASR.JS Library',
    note: '',
    source: 'https://www.voiceitt.com/',
    model: 'isv/voiceitt/onnx/tack_mfcc.onnx',
    size: '61KB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'audio': ['float32', 'random', [1, 1000], { "length": 1000 }]
    }],
    inputstip: '[1, 1000]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'voiceitt_casr_vad_fp32',
    name: 'ISV Voiceitt CASR.JS Library VAD',
    description: 'Voiceitt CASR.JS Library',
    note: '',
    source: 'https://www.voiceitt.com/',
    model: 'isv/voiceitt/onnx/vad_model.onnx',
    size: '874KB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'mfcc': ['float32', 'random', [1000, 40], { "length": 1000 }]
    }],
    inputstip: '[1000, 40]'
  },
  ...whisperTinyDecoder(),
  ...whisperTinyWithPast(),
  ...whisperTinyMerged(),
  ...whisperTinyEncoder(),
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'whisper_base_decoder_static_merged',
    name: 'Whisper Base Decoder Static Shape KV-Cache',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation.',
    note: '',
    source: 'customized',
    model: 'whisper-customized/whisper_base_decoder_static_kvcache.onnx',
    size: '186 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'input_ids': ['int32', 1, [1, 1], {}],
      'attention_mask': ['int64', 1n, [1, 128], {}],
      'past_key_values_length': ['int32', 1, [1], {}]
    }],
    inputstip: '[1, 4] [1, 128] [1]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'whisper_base_decoder_static',
    name: 'Whisper Base Decoder Static Shape Non-KV-Cache',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation.',
    note: '',
    source: 'customized',
    model: 'whisper-customized/whisper_base_decoder_static_non_kvcache.onnx',
    size: '197 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'input_ids': ['int32', 1, [1, 4], {}],
      'attention_mask': ['int32', 1, [1, 4], {}],
      'encoder_hidden_states': ['float32', 'random', [1, 1500, 512], {}]
    }],
    inputstip: '[1, 4] [1, 4] [1, 1500, 512]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'whisper_base_encoder',
    name: 'Whisper Base Encoder',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation.',
    note: '',
    source: 'customized',
    model: 'whisper-customized/whisper_base_encoder.onnx',
    size: '78.6 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{
      'input_features': ['float32', 'random', [1, 80, 3000], {}]
    }],
    inputstip: '[1, 80, 3000]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'whisper_base_decoder_static_gelu_4dmask_demo_merged_fp16',
    name: 'Whisper Base Decoder Static Shape KV-Cache Demo',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation. (LayerNorm, Gelu, 4dmask)',
    note: '',
    source: 'https://huggingface.co/microsoft/whisper-base-webnn/',
    model: 'fp16/whisper-base/whisper_base_decoder_static_kvcache_128_lm_fp16_layernorm_gelu_4dmask.onnx',
    size: '143 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'input_ids': ['int32', 1, [1, 1], {}],
      'attention_mask': ['float16', 'random', [1, 1, 1, 128], {}],
      'position_ids': ['int32', 1, [1], {}]
    }],
    inputstip: '[1, 1] [1, 1, 1, 128] [1]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'whisper_base_decoder_static_gelu_4dmask_mltensor_demo_merged_fp16',
    name: 'Whisper Base Decoder Static Shape KV-Cache MLTensor Demo GPU',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation. (LayerNorm, Gelu, 4dmask) https://github.com/microsoft/webnn-developer-preview/pull/67',
    note: '',
    source: 'https://huggingface.co/microsoft/whisper-base-webnn/',
    model: 'fp16/whisper-base/whisper_base_decoder_static_kvcache_128_lm_fp16_layernorm_gelu_4dmask_iobinding.onnx',
    size: '143 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'input_ids': ['int32', 1, [1, 1], {}],
      'attention_mask': ['float16', 'random', [1, 1, 1, 128], {}],
      'position_ids': ['int32', 1, [1], {}]
    }],
    inputstip: '[1, 1] [1, 1, 1, 128] [1]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'whisper_base_decoder_static_gelu_4dmask_demo_fp16',
    name: 'Whisper Base Decoder Static Shape Non-KV-Cache Demo',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation. (LayerNorm, Gelu, 4dmask)',
    note: '',
    source: 'https://huggingface.co/microsoft/whisper-base-webnn/',
    model: 'fp16/whisper-base/whisper_base_decoder_static_non_kvcache_lm_fp16_layernorm_gelu_4dmask.onnx',
    size: '149 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'input_ids': ['int32', 1, [1, 4], {}],
      'attention_mask': ['float16', 'random', [1, 1, 4, 4], {}],
      'encoder_hidden_states': ['float16', 'random', [1, 1500, 512], {}]
    }],
    inputstip: '[1, 4] [1, 1, 4, 4] [1, 1500, 512]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'whisper_base_decoder_static_gelu_4dmask_mltensor_demo_fp16',
    name: 'Whisper Base Decoder Static Shape Non-KV-Cache MLTensor Demo GPU',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation. (LayerNorm, Gelu, 4dmask) https://github.com/microsoft/webnn-developer-preview/pull/67',
    note: '',
    source: 'https://huggingface.co/microsoft/whisper-base-webnn/',
    model: 'fp16/whisper-base/whisper_base_decoder_static_non_kvcache_lm_fp16_layernorm_gelu_4dmask_iobinding.onnx',
    size: '149 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'input_ids': ['int32', 1, [1, 4], {}],
      'attention_mask': ['float16', 'random', [1, 1, 4, 4], {}],
      'encoder_hidden_states': ['float16', 'random', [1, 1500, 512], {}]
    }],
    inputstip: '[1, 4] [1, 1, 4, 4] [1, 1500, 512]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '2h',
    id: 'whisper_base_encoder_gelu_demo_fp16',
    name: 'Whisper Base Encoder Demo',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation. (LayerNorm + Gelu)',
    note: '',
    source: 'https://huggingface.co/microsoft/whisper-base-webnn/',
    model: 'fp16/whisper-base/whisper_base_encoder_lm_fp16_layernorm_gelu.onnx',
    size: '39.3 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'input_features': ['float16', 'random', [1, 80, 3000], {}]
    }],
    inputstip: '[1, 80, 3000]'
  },
  ...xlmRobertaBase(),
  {
    category: 'Object Detection',
    tag: '',
    id: 'yolo_v3_fp16',
    name: 'YOLO v3',
    description: 'YOLOv3 (You Only Look Once, Version 3) is a real-time object detection algorithm that identifies specific objects in videos, live feeds or images',
    note: '',
    source: '',
    model: 'fp16/yolo-v3-opset-12-fp16.onnx',
    size: '118 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{
      'input_1': ['float16', 'random', [1, 3, 416, 416], { "unk__576": 1, "unk__577": 416, "unk__578": 416 }],
      'image_shape': ['float16', 'random', [1, 2], { "unk__579": 1 }]
    }],
    inputstip: '[1, 3, 416, 416]'
  },
  {
    category: 'Object Detection',
    id: 'yolo_v3_int8',
    name: 'YOLO v3',
    description: 'YOLOv3 (You Only Look Once, Version 3) is a real-time object detection algorithm that identifies specific objects in videos, live feeds or images',
    note: '',
    source: '',
    model: 'int8/yolo-v3-opset-12-int8.onnx',
    size: '60.2 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{
      'input_1': ['float32', 'random', [1, 3, 416, 416], { "unk__576": 1, "unk__577": 416, "unk__578": 416 }], 
      'image_shape': ['float32', 'random', [1, 2], { "unk__579": 1 }]
    }],
    inputstip: '[1, 3, 416, 416]'
  },
  ...yoloV8N(),
  ...yoloV8XPose(),
  ...yoloV10N(),
];

export const cpu = [
  "Intel Core Ultra 9 285K", "Intel Core Ultra 7 265K", "Intel Core Ultra 7 265KF", "Intel Core Ultra 5 245K", "Intel Core Ultra 5 245KF",
  "Intel Core Ultra 9 288V", "Intel Core Ultra 7 268V", "Intel Core Ultra 7 266V", "Intel Core Ultra 7 258V", "Intel Core Ultra 7 256V", "Intel Core Ultra 5 238V", "Intel Core Ultra 5 236V", "Intel Core Ultra 5 228V", "Intel Core Ultra 5 226V",
  "Intel Core Ultra 7 155H", "Intel Core Ultra 7 155U", "Intel Core Ultra 7 164U", "Intel Core Ultra 7 165H", "Intel Core Ultra 7 165U", "Intel Core Ultra 9 185H",
  "Intel Core Ultra 5 125H", "Intel Core Ultra 5 125U", "Intel Core Ultra 5 134U", "Intel Core Ultra 5 135H", "Intel Core Ultra 5 135U",
  "Intel Core Ultra 7 165UL", "Intel Core Ultra 7 165HL", "Intel Core Ultra 7 155UL", "Intel Core Ultra 7 155HL", "Intel Core Ultra 5 135UL", "Intel Core Ultra 5 135HL", "Intel Core Ultra 5 125UL", "Intel Core Ultra 5 125HL", "Intel Core Ultra 3 105UL",
  "Intel Core 7 250H", "Intel Core 7 160HL", "Intel Core 7 160UL", "Intel Core 7 150HL", "Intel Core 7 150UL", "Intel Core 7 150U",
  "Intel Core 5 130HL", "Intel Core 5 130UL", "Intel Core 5 120HL", "Intel Core 5 120UL", "Intel Core 5 120U",
  "Intel Core 3 100HL", "Intel Core 3 100UL", "Intel Core 3 100U",
  "Intel Core i9 14900K", "Intel Core i9 14900KF", "Intel Core i9 14900T", "Intel Core i9 14900HX", "Intel Core i9 14900F", "Intel Core i9 14900",
  "Intel Core i7 14700K", "Intel Core i7 14700KF", "Intel Core i7 14700T", "Intel Core i7 14700HX", "Intel Core i7 14700F", "Intel Core i7 14700", "Intel Core i7 14650HX",
  "Intel Core i5 14600K", "Intel Core i5 14600KF", "Intel Core i5 14600T", "Intel Core i5 14600",
  "Intel Core i5 14500HX", "Intel Core i5 14500T", "Intel Core i5 14500", "Intel Core i5 14490F",
  "Intel Core i5 14450HX", "Intel Core i5 14400F", "Intel Core i5 14400T", "Intel Core i5 14400",
  "Intel Core i3 14100F", "Intel Core i3 14100T", "Intel Core i3 14100",
  "Intel Processor 300", "Intel Processor 300T",
  "Intel Core i7-1355U", "Intel Core i7-1360P", "Intel Core i7-13620H", "Intel Core i7-13650HX", "Intel Core i7-1365U", "Intel Core i7-1365UE", "Intel Core i7-13700", "Intel Core i7-13700E", "Intel Core i7-13700F", "Intel Core i7-13700H", "Intel Core i7-13700HX", "Intel Core i7-13700K", "Intel Core i7-13700KF", "Intel Core i7-13700T", "Intel Core i7-13700TE", "Intel Core i7-13705H", "Intel Core i7-1370P", "Intel Core i7-1370PE", "Intel Core i7-13790F", "Intel Core i7-13800H", "Intel Core i7-13800HE", "Intel Core i7-13850HX",
  "Intel Core i5-1334U", "Intel Core i5-1335U", "Intel Core i5-1335UE", "Intel Core i5-13400", "Intel Core i5-13400E", "Intel Core i5-13400F", "Intel Core i5-13400T", "Intel Core i5-1340P", "Intel Core i5-1340PE", "Intel Core i5-13420H", "Intel Core i5-13450HX", "Intel Core i5-1345U", "Intel Core i5-1345UE", "Intel Core i5-13490F", "Intel Core i5-13500", "Intel Core i5-13500E", "Intel Core i5-13500H", "Intel Core i5-13500HX", "Intel Core i5-13500T", "Intel Core i5-13500TE", "Intel Core i5-13505H", "Intel Core i5-1350P", "Intel Core i5-1350PE", "Intel Core i5-13600", "Intel Core i5-13600H", "Intel Core i5-13600HE", "Intel Core i5-13600HX", "Intel Core i5-13600K", "Intel Core i5-13600KF", "Intel Core i5-13600T",
  "Intel Core i3-1305U", "Intel Core i3-13100", "Intel Core i3-13100E", "Intel Core i3-13100F", "Intel Core i3-13100T", "Intel Core i3-13100TE", "Intel Core i3-1315U", "Intel Core i3-1315UE", "Intel Core i3-1320PE", "Intel Core i3-13300HE",
  "Intel Core i9-13900", "Intel Core i9-13900E", "Intel Core i9-13900F", "Intel Core i9-13900H", "Intel Core i9-13900HK", "Intel Core i9-13900HX", "Intel Core i9-13900K", "Intel Core i9-13900KF", "Intel Core i9-13900KS", "Intel Core i9-13900T", "Intel Core i9-13900TE", "Intel Core i9-13905H", "Intel Core i9-13950HX", "Intel Core i9-13980HX",
  "Intel Core i7-1250U", "Intel Core i7-1255U", "Intel Core i7-1255UL", "Intel Core i7-1260P", "Intel Core i7-1260U", "Intel Core i7-12650H", "Intel Core i7-12650HX", "Intel Core i7-1265U", "Intel Core i7-1265UE", "Intel Core i7-1265UL", "Intel Core i7-12700", "Intel Core i7-12700E", "Intel Core i7-12700F", "Intel Core i7-12700H", "Intel Core i7-12700HL", "Intel Core i7-12700K", "Intel Core i7-12700KF", "Intel Core i7-12700T", "Intel Core i7-12700TE", "Intel Core i7-1270P", "Intel Core i7-1270PE", "Intel Core i7-12800H", "Intel Core i7-12800HE", "Intel Core i7-12800HL", "Intel Core i7-12800HX", "Intel Core i7-1280P", "Intel Core i7-12850HX",
  "Intel Core i5-1230U", "Intel Core i5-1235U", "Intel Core i5-1235UL", "Intel Core i5-12400", "Intel Core i5-12400F", "Intel Core i5-12400T", "Intel Core i5-1240P", "Intel Core i5-1240U", "Intel Core i5-12450H", "Intel Core i5-12450HX", "Intel Core i5-1245U", "Intel Core i5-1245UE", "Intel Core i5-1245UL", "Intel Core i5-12500", "Intel Core i5-12500E", "Intel Core i5-12500H", "Intel Core i5-12500HL", "Intel Core i5-12500T", "Intel Core i5-12500TE", "Intel Core i5-1250P", "Intel Core i5-1250PE", "Intel Core i5-12600", "Intel Core i5-12600H", "Intel Core i5-12600HE", "Intel Core i5-12600HL", "Intel Core i5-12600HX", "Intel Core i5-12600K", "Intel Core i5-12600KF", "Intel Core i5-12600T",
  "Intel Core i9-12900", "Intel Core i9-12900E", "Intel Core i9-12900F", "Intel Core i9-12900H", "Intel Core i9-12900HK", "Intel Core i9-12900HX", "Intel Core i9-12900K", "Intel Core i9-12900KF", "Intel Core i9-12900KS", "Intel Core i9-12900T", "Intel Core i9-12900TE", "Intel Core i9-12950HX",
  "Intel Core i3-12100", "Intel Core i3-12100E", "Intel Core i3-12100F", "Intel Core i3-12100T", "Intel Core i3-12100TE", "Intel Core i3-1210U", "Intel Core i3-1215U", "Intel Core i3-1215UE", "Intel Core i3-1215UL", "Intel Core i3-1220P", "Intel Core i3-1220PE", "Intel Core i3-12300", "Intel Core i3-12300HE", "Intel Core i3-12300HL", "Intel Core i3-12300T",
  "Intel Core i5-1130G7", "Intel Core i5-11320H", "Intel Core i5-1135G7", "Intel Core i5-11400", "Intel Core i5-11400F", "Intel Core i5-11400H", "Intel Core i5-11400T", "Intel Core i5-1140G7", "Intel Core i5-1145G7", "Intel Core i5-1145G7E", "Intel Core i5-1145GRE", "Intel Core i5-11500", "Intel Core i5-11500H", "Intel Core i5-11500HE", "Intel Core i5-11500T", "Intel Core i5-1155G7", "Intel Core i5-11600", "Intel Core i5-11600K", "Intel Core i5-11600KF", "Intel Core i5-11600T",
  "Intel Core i5-11260H", "Intel Core i5-11300H", "Intel Core i7-11370H", "Intel Core i7-11375H", "Intel Core i7-11390H", "Intel Core i7-11600H", "Intel Core i7-1160G7", "Intel Core i7-1165G7", "Intel Core i7-11700", "Intel Core i7-11700F", "Intel Core i7-11700K", "Intel Core i7-11700KF", "Intel Core i7-11700T", "Intel Core i7-11800H", "Intel Core i7-1180G7", "Intel Core i7-11850H", "Intel Core i7-11850HE", "Intel Core i7-1185G7", "Intel Core i7-1185G7E", "Intel Core i7-1185GRE", "Intel Core i7-1195G7",
  "Intel Core i3-1115G4", "Intel Core i3-1115G4E", "Intel Core i3-1115GRE", "Intel Core i3-1120G4", "Intel Core i3-1125G4",
  "Intel Core i3-11100HE", "Intel Core i3-1110G4", "Intel Core i9-11900", "Intel Core i9-11900F", "Intel Core i9-11900H", "Intel Core i9-11900K", "Intel Core i9-11900KF", "Intel Core i9-11900T", "Intel Core i9-11950H", "Intel Core i9-11980HK",
  "Intel Core i7-10510U", "Intel Core i7-10510Y", "Intel Core i7-1060G7", "Intel Core i7-10610U", "Intel Core i7-1065G7", "Intel Core i7-1068G7", "Intel Core i7-1068NG7", "Intel Core i7-10700", "Intel Core i7-10700E", "Intel Core i7-10700F", "Intel Core i7-10700K", "Intel Core i7-10700KF", "Intel Core i7-10700T", "Intel Core i7-10700TE", "Intel Core i7-10710U", "Intel Core i7-10750H", "Intel Core i7-10810U", "Intel Core i7-10850H", "Intel Core i7-10870H", "Intel Core i7-10875H",
  "Intel Core i3-1000G1", "Intel Core i3-1000G4", "Intel Core i3-1005G1", "Intel Core i3-10100", "Intel Core i3-10100E", "Intel Core i3-10100F", "Intel Core i3-10100T", "Intel Core i3-10100TE", "Intel Core i3-10100Y", "Intel Core i3-10105", "Intel Core i3-10105F", "Intel Core i3-10105T", "Intel Core i3-10110U", "Intel Core i3-10110Y", "Intel Core i3-10300", "Intel Core i3-10300T", "Intel Core i3-10305", "Intel Core i3-10305T", "Intel Core i3-10320", "Intel Core i3-10325",
  "Intel Core i9-10850K", "Intel Core i9-10885H", "Intel Core i9-10900", "Intel Core i9-10900E", "Intel Core i9-10900F", "Intel Core i9-10900K", "Intel Core i9-10900KF", "Intel Core i9-10900T", "Intel Core i9-10900TE", "Intel Core i9-10900X", "Intel Core i9-10920X", "Intel Core i9-10940X", "Intel Core i9-10980HK", "Intel Core i9-10980XE",
  "Intel Core i5-10200H", "Intel Core i5-10210U", "Intel Core i5-10210Y", "Intel Core i5-10300H", "Intel Core i5-1030G4", "Intel Core i5-1030G7", "Intel Core i5-10310U", "Intel Core i5-10310Y", "Intel Core i5-1035G1", "Intel Core i5-1035G4", "Intel Core i5-1035G7", "Intel Core i5-1038NG7", "Intel Core i5-10400", "Intel Core i5-10400F", "Intel Core i5-10400H", "Intel Core i5-10400T", "Intel Core i5-10500", "Intel Core i5-10500E", "Intel Core i5-10500H", "Intel Core i5-10500T", "Intel Core i5-10500TE", "Intel Core i5-10505", "Intel Core i5-10600", "Intel Core i5-10600K", "Intel Core i5-10600KF", "Intel Core i5-10600T",
  "Intel Core i9-9820X", "Intel Core i9-9880H", "Intel Core i9-9900", "Intel Core i9-9900K", "Intel Core i9-9900KF", "Intel Core i9-9900KS", "Intel Core i9-9900T", "Intel Core i9-9900X", "Intel Core i9-9920X", "Intel Core i9-9940X", "Intel Core i9-9960X", "Intel Core i9-9980HK", "Intel Core i9-9980XE",
  "Intel Core i7-9700", "Intel Core i7-9700E", "Intel Core i7-9700F", "Intel Core i7-9700K", "Intel Core i7-9700KF", "Intel Core i7-9700T", "Intel Core i7-9700TE", "Intel Core i7-9750H", "Intel Core i7-9750HF", "Intel Core i7-9800X", "Intel Core i7-9850H", "Intel Core i7-9850HE", "Intel Core i7-9850HL",
  "Intel Core i5-9300H", "Intel Core i5-9300HF", "Intel Core i5-9400", "Intel Core i5-9400F", "Intel Core i5-9400H", "Intel Core i5-9400T", "Intel Core i5-9500", "Intel Core i5-9500E", "Intel Core i5-9500F", "Intel Core i5-9500T", "Intel Core i5-9500TE", "Intel Core i5-9600", "Intel Core i5-9600K", "Intel Core i5-9600KF", "Intel Core i5-9600T",
  "Intel Core i3-9100", "Intel Core i3-9100E", "Intel Core i3-9100F", "Intel Core i3-9100HL", "Intel Core i3-9100T", "Intel Core i3-9100TE", "Intel Core i3-9300", "Intel Core i3-9300T", "Intel Core i3-9320", "Intel Core i3-9350K", "Intel Core i3-9350KF",
  "Intel Core i3-8100", "Intel Core i3-8100B", "Intel Core i3-8100H", "Intel Core i3-8100T", "Intel Core i3-8109U", "Intel Core i3-8130U", "Intel Core i3-8140U", "Intel Core i3-8145U", "Intel Core i3-8145UE", "Intel Core i3-8300", "Intel Core i3-8300T", "Intel Core i3-8350K",
  "Intel Core i5-8250U", "Intel Core i5-8257U", "Intel Core i5-8259U", "Intel Core i5-8260U", "Intel Core i5-8265U", "Intel Core i5-8269U", "Intel Core i5-8279U", "Intel Core i5-8300H", "Intel Core i5-8305G", "Intel Core i5-8310Y", "Intel Core i5-8350U", "Intel Core i5-8365U", "Intel Core i5-8365UE", "Intel Core i5-8400", "Intel Core i5-8400B", "Intel Core i5-8400H", "Intel Core i5-8400T", "Intel Core i5-8500",
  "Intel Core i5-8200Y", "Intel Core i5-8210Y", "Intel Core i5-8500B", "Intel Core i5-8500T", "Intel Core i5-8600", "Intel Core i5-8600K", "Intel Core i5-8600T",
  "Intel Core i7-8086K", "Intel Core i7-8500Y", "Intel Core i7-8550U", "Intel Core i7-8557U", "Intel Core i7-8559U", "Intel Core i7-8565U", "Intel Core i7-8569U", "Intel Core i7-8650U", "Intel Core i7-8665U", "Intel Core i7-8665UE", "Intel Core i7-8700", "Intel Core i7-8700B", "Intel Core i7-8700K", "Intel Core i7-8700T", "Intel Core i7-8705G", "Intel Core i7-8706G", "Intel Core i7-8709G", "Intel Core i7-8750H", "Intel Core i7-8809G", "Intel Core i7-8850H",
  "Intel Core i9-7900X", "Intel Core i9-7920X", "Intel Core i9-7940X", "Intel Core i9-7960X", "Intel Core i9-7980XE", "Intel Core i9-8950HK",
  "Intel Core i7-7800X", "Intel Core i7-7820HQ", "Intel Core i7-7820X",
  "Intel Atom x6200FE", "Intel Atom x6211E", "Intel Atom x6212RE", "Intel Atom x6413E", "Intel Atom x6414RE", "Intel Atom x6425E", "Intel Atom x6425RE", "Intel Atom x6427FE", "Intel Celeron 6305", "Intel Celeron 7300", "Intel Celeron 7305", "Intel Celeron 3867U", "Intel Celeron 4205U", "Intel Celeron 4305U", "Intel Celeron 4305UE", "Intel Celeron 5205U", "Intel Celeron 5305U", "Intel Celeron 6305E", "Intel Celeron 6600HE", "Intel Celeron 7305E", "Intel Celeron 7305L", "Intel Celeron G4900", "Intel Celeron G4900T", "Intel Celeron G4920", "Intel Celeron G4930", "Intel Celeron G4930E", "Intel Celeron G4930T", "Intel Celeron G4932E", "Intel Celeron G4950", "Intel Celeron G5900", "Intel Celeron G5900E", "Intel Celeron G5900T", "Intel Celeron G5900TE", "Intel Celeron G5905", "Intel Celeron G5905T", "Intel Celeron G5920", "Intel Celeron G5925", "Intel Celeron G6900", "Intel Celeron G6900E", "Intel Celeron G6900T", "Intel Celeron G6900TE", "Intel Celeron J4005", "Intel Celeron J4025", "Intel Celeron J4105", "Intel Celeron J4115", "Intel Celeron J4125", "Intel Celeron J6412", "Intel Celeron J6413", "Intel Celeron N4000", "Intel Celeron N4020", "Intel Celeron N4100", "Intel Celeron N4120", "Intel Celeron N4500", "Intel Celeron N4505", "Intel Celeron N5100", "Intel Celeron N5105", "Intel Celeron N6210", "Intel Celeron N6211",
  "Intel Core i3-N300", "Intel Core i3-N305",
  "Intel Core m3-8100Y", "Intel Pentium Gold 4417U", "Intel Pentium Gold 4425Y", "Intel Pentium Gold 5405U", "Intel Pentium Gold 6405U", "Intel Pentium Gold 6500Y", "Intel Pentium Gold 6805", "Intel Pentium Gold 7505", "Intel Pentium Gold 8500", "Intel Pentium Gold 8505", "Intel Pentium Gold G5400", "Intel Pentium Gold G5400T", "Intel Pentium Gold G5420", "Intel Pentium Gold G5420T", "Intel Pentium Gold G5500", "Intel Pentium Gold G5500T", "Intel Pentium Gold G5600", "Intel Pentium Gold G5600E", "Intel Pentium Gold G5600T", "Intel Pentium Gold G5620", "Intel Pentium Gold G6400", "Intel Pentium Gold G6400E", "Intel Pentium Gold G6400T", "Intel Pentium Gold G6400TE", "Intel Pentium Gold G6405", "Intel Pentium Gold G6405T", "Intel Pentium Gold G6500", "Intel Pentium Gold G6500T", "Intel Pentium Gold G6505", "Intel Pentium Gold G6505T", "Intel Pentium Gold G6600", "Intel Pentium Gold G6605", "Intel Pentium Gold G7400", "Intel Pentium Gold G7400E", "Intel Pentium Gold G7400T", "Intel Pentium Gold G7400TE", "Intel Pentium J6426", "Intel Pentium N6415", "Intel Pentium Silver J5005", "Intel Pentium Silver J5040", "Intel Pentium Silver N5000", "Intel Pentium Silver N5030", "Intel Pentium Silver N6000", "Intel Pentium Silver N6005", "Intel N100", "Intel N200", "Intel N50", "Intel N95", "Intel N97", "Intel U300", "Intel U300E",
  "AMD Ryzen 9 9950X", "AMD Ryzen 9 9900X", "AMD Ryzen 7 9700X", "AMD Ryzen 5 9600X",
  "AMD Ryzen 7 8700G", "AMD Ryzen 7 8700F", "AMD Ryzen 5 8600G", "AMD Ryzen 5 8500G", "AMD Ryzen 5 8400F", "AMD Ryzen 3 8300G",
  "AMD Ryzen AI 9 HX 375", "AMD Ryzen AI 9 HX 370", "AMD Ryzen AI 9 365", "AMD Radeon PRO W7900",
  "AMD Threadripper PRO 7995WX", "AMD Threadripper PRO 7985WX", "AMD Threadripper PRO 7975WX", "AMD Threadripper PRO 7965WX", "AMD Threadripper PRO 7955WX", "AMD Threadripper PRO 7945WX", "AMD Threadripper 7980X", "AMD Threadripper 7970X", "AMD Threadripper 7960X",
  "AMD Threadripper PRO 3945WX", "AMD Threadripper PRO 3955WX", "AMD Threadripper PRO 3975WX", "AMD Threadripper PRO 3995WX", "AMD Threadripper PRO 5945WX", "AMD Threadripper PRO 5955WX", "AMD Threadripper PRO 5965WX", "AMD Threadripper PRO 5975WX", "AMD Threadripper PRO 5995WX",
  "AMD Ryzen 9 8945HS", "AMD Ryzen 7 8845HS", "AMD Ryzen 7 8840HS", "AMD Ryzen 7 8840U", "AMD Ryzen 5 8645HS", "AMD Ryzen 5 8640HS", "AMD Ryzen 5 8640U", "AMD Ryzen 5 8540U", "AMD Ryzen 3 8440U", "AMD Ryzen 9 7945HX3D",
  "AMD Ryzen 5 7520C", "AMD Ryzen 3 7320C",
  "AMD Ryzen 9 5980HS", "AMD Ryzen 9 5980HX",
  "AMD Ryzen 9 6900HS", "AMD Ryzen 9 6900HX", "AMD Ryzen 9 6980HS", "AMD Ryzen 9 6980HX",
  "AMD Ryzen 9 7845HX", "AMD Ryzen 9 7900X", "AMD Ryzen 9 7900X3D", "AMD Ryzen 9 7940H", "AMD Ryzen 9 7940HS", "AMD Ryzen 9 7945HX", "AMD Ryzen 9 7950X", "AMD Ryzen 9 7950X3D",
  "AMD Ryzen 9 PRO 3900", "AMD Ryzen 9 PRO 5945", "AMD Ryzen 9 PRO 6950H", "AMD Ryzen 9 PRO 6950HS", "AMD Ryzen V2516", "AMD Ryzen V2546", "AMD Ryzen V2718", "AMD Ryzen V2748",
  "AMD Ryzen 9 5900", "AMD Ryzen 9 7900", "AMD Ryzen 9 3900", "AMD Ryzen 9 3900X", "AMD Ryzen 9 3900XT", "AMD Ryzen 9 3950X", "AMD Ryzen 9 4900H", "AMD Ryzen 9 4900HS", "AMD Ryzen 9 5900HS", "AMD Ryzen 9 5900HX", "AMD Ryzen 9 5900XT", "AMD Ryzen 9 5900X", "AMD Ryzen 9 5950X",
  "AMD Ryzen 7 2700",
  "AMD Ryzen 7 5800XT", "AMD Ryzen 7 5800", "AMD Ryzen 7 7700", "AMD Ryzen 7 2700E", "AMD Ryzen 7 2700X", "AMD Ryzen 7 3700C", "AMD Ryzen 7 3700U", "AMD Ryzen 7 3700X", "AMD Ryzen 7 3750H", "AMD Ryzen 7 3780U", "AMD Ryzen 7 3800X", "AMD Ryzen 7 3800XT", "AMD Ryzen 7 4700G", "AMD Ryzen 7 4700GE", "AMD Ryzen 7 4700U", "AMD Ryzen 7 4800H", "AMD Ryzen 7 4800HS", "AMD Ryzen 7 4800U", "AMD Ryzen 7 5700G", "AMD Ryzen 7 5700GE", "AMD Ryzen 7 5700U", "AMD Ryzen 7 5700X", "AMD Ryzen 7 5800H", "AMD Ryzen 7 5800HS", "AMD Ryzen 7 5800U", "AMD Ryzen 7 5800X", "AMD Ryzen 7 5800X3D", 
  "AMD Ryzen 7 5825C", "AMD Ryzen 7 5825U", "AMD Ryzen 7 6800H", "AMD Ryzen 7 6800HS", "AMD Ryzen 7 6800U", "AMD Ryzen 7 6810U", "AMD Ryzen 7 7700X", "AMD Ryzen 7 7730U", "AMD Ryzen 7 7735HS", "AMD Ryzen 7 7735U", "AMD Ryzen 7 7736U", "AMD Ryzen 7 7745HX", 
  "AMD Ryzen 7 7800X3D", "AMD Ryzen 7 7840H", "AMD Ryzen 7 7840HS", "AMD Ryzen 7 7840S", "AMD Ryzen 7 7840U", "AMD Ryzen 7 PRO 2700", "AMD Ryzen 7 PRO 3700", "AMD Ryzen 7 PRO 5845", "AMD Ryzen 7 PRO 2700X", "AMD Ryzen 7 PRO 3700U", "AMD Ryzen 7 PRO 4750G", "AMD Ryzen 7 PRO 4750GE", "AMD Ryzen 7 PRO 4750U", "AMD Ryzen 7 PRO 5850HS", "AMD Ryzen 7 PRO 5850HX", "AMD Ryzen 7 PRO 5850U", "AMD Ryzen 7 PRO 5875U", "AMD Ryzen 7 PRO 6850H", "AMD Ryzen 7 PRO 6850HS", "AMD Ryzen 7 PRO 6850U", "AMD Ryzen 7 PRO 6860Z", "AMD Ryzen 7 PRO 7730U", "AMD Ryzen 7 PRO 7840U",
  "AMD Ryzen 5 4600GE", "AMD Ryzen 5 4600H", "AMD Ryzen 5 4600HS", "AMD Ryzen 5 4600U",
  "AMD Ryzen 5 5300G", "AMD Ryzen 5 5300GE", "AMD Ryzen 5 5425U", "AMD Ryzen 5 5500U", "AMD Ryzen 5 5560U", "AMD Ryzen 5 5600G", "AMD Ryzen 5 5600GE", "AMD Ryzen 5 5600H", "AMD Ryzen 5 5600HS", "AMD Ryzen 5 5600U", "AMD Ryzen 5 5600X", "AMD Ryzen 5 5625C", "AMD Ryzen 5 5625U",
  "AMD Ryzen 5 6600H", "AMD Ryzen 5 6600HS", "AMD Ryzen 5 6600U",
  "AMD Ryzen 5 7520U", "AMD Ryzen 5 7530U", "AMD Ryzen 5 7535HS", "AMD Ryzen 5 7535U", "AMD Ryzen 5 7540U", "AMD Ryzen 5 7600X", "AMD Ryzen 5 7640HS", "AMD Ryzen 5 7640S", "AMD Ryzen 5 7640U", "AMD Ryzen 5 7645HX", "AMD Ryzen 5 7640H",
  "AMD Ryzen 5 PRO 2600", "AMD Ryzen 5 PRO 3600", "AMD Ryzen 5 PRO 5645", "AMD Ryzen 5 PRO 3350G", "AMD Ryzen 5 PRO 3350GE", "AMD Ryzen 5 PRO 3400G", "AMD Ryzen 5 PRO 3400GE", "AMD Ryzen 5 PRO 3500U",
  "AMD Ryzen 5 PRO 4650G", "AMD Ryzen 5 PRO 4650GE", "AMD Ryzen 5 PRO 4650U",
  "AMD Ryzen 5 PRO 5475U", "AMD Ryzen 5 PRO 5650G", "AMD Ryzen 5 PRO 5650GE", "AMD Ryzen 5 PRO 5650HS", "AMD Ryzen 5 PRO 5650HX", "AMD Ryzen 5 PRO 5650U", "AMD Ryzen 5 PRO 5675U", "AMD Ryzen 5 PRO 5750G", "AMD Ryzen 5 PRO 5750GE",
  "AMD Ryzen 5 PRO 6650H", "AMD Ryzen 5 PRO 6650HS", "AMD Ryzen 5 PRO 6650U", "AMD Ryzen 5 PRO 7530U", "AMD Ryzen 5 PRO 7540U", "AMD Ryzen 5 PRO 7640U", "AMD Ryzen 5 PRO 4655G", "AMD Ryzen 5 PRO 4655GE",
  "AMD Athlon Gold 7220C", "AMD Athlon Silver 7120C",
  "AMD AMD 3015e", "AMD AMD 3020e", "AMD Athlon 3000G", "AMD Athlon 300GE", "AMD Athlon 300U", "AMD Athlon 320GE", "AMD Athlon 7120e", "AMD Athlon 7120U", "AMD Athlon 7220e", "AMD Athlon 7220U", "AMD Athlon Gold 3150C", "AMD Athlon Gold 3150G", "AMD Athlon Gold 3150GE", "AMD Athlon Gold 3150U", "AMD Athlon Silver 3050C", "AMD Athlon Silver 3050e", "AMD Athlon Silver 3050GE", "AMD Athlon Silver 3050U", "AMD Athlon Gold PRO 3125GE", "AMD Athlon Gold PRO 3150G", "AMD Athlon Gold PRO 3150GE", "AMD Athlon Gold PRO 4150GE", "AMD Athlon PRO 300GE", "AMD Athlon PRO 300U", 
  "AMD Athlon PRO 3045B", "AMD EPYC 7252", "AMD EPYC 7262", "AMD EPYC 7272", "AMD EPYC 7282", "AMD EPYC 7302", "AMD EPYC 7313", "AMD EPYC 7343", "AMD EPYC 7352", "AMD EPYC 7402", "AMD EPYC 7413", "AMD EPYC 7443", "AMD EPYC 7452", "AMD EPYC 7453", "AMD EPYC 7502", "AMD EPYC 7513", "AMD EPYC 7532", "AMD EPYC 7542", "AMD EPYC 7543", "AMD EPYC 7552", "AMD EPYC 7642", "AMD EPYC 7643", "AMD EPYC 7662", "AMD EPYC 7663", "AMD EPYC 7702", "AMD EPYC 7713", "AMD EPYC 7742", "AMD EPYC 7763", "AMD EPYC 7232P", "AMD EPYC 72F3", "AMD EPYC 7302P", "AMD EPYC 7313P", "AMD EPYC 73F3", 
  "AMD EPYC 7402P", "AMD EPYC 7443P", "AMD EPYC 74F3", "AMD EPYC 7502P", "AMD EPYC 7543P", "AMD EPYC 75F3", "AMD EPYC 7702P", "AMD EPYC 7713P", "AMD EPYC 7F32", "AMD EPYC 7F52", "AMD EPYC 7F72", "AMD EPYC 7H12", "AMD Ryzen R2312", "AMD Ryzen R2314", "AMD Ryzen R2514", "AMD Ryzen R2544", "AMD Ryzen Z1", "AMD Ryzen Z1 Extreme", "AMD Ryzen 3 3100", "AMD Ryzen 3 4100", "AMD Ryzen 3 2300X", "AMD Ryzen 3 3200G", "AMD Ryzen 3 3200GE", "AMD Ryzen 3 3200U", "AMD Ryzen 3 3250C", "AMD Ryzen 3 3250U", "AMD Ryzen 3 3300U", "AMD Ryzen 3 3350U", "AMD Ryzen 3 4300G", "AMD Ryzen 3 4300GE", "AMD Ryzen 3 4300U", "AMD Ryzen 3 5125C", 
  "AMD Ryzen 3 5300G", "AMD Ryzen 3 5300GE", "AMD Ryzen 3 5300GE", "AMD Ryzen 3 5300U", "AMD Ryzen 3 5400U", "AMD Ryzen 3 5425C", "AMD Ryzen 3 5425U", "AMD Ryzen 3 7320e", "AMD Ryzen 3 7320U", "AMD Ryzen 3 7330U", "AMD Ryzen 3 7335U", "AMD Ryzen 3 7440U", "AMD Ryzen 3 5380U", "AMD Ryzen 3 PRO 3200G", "AMD Ryzen 3 PRO 3200GE", "AMD Ryzen 3 PRO 3300U", "AMD Ryzen 3 PRO 4350G", "AMD Ryzen 3 PRO 4350GE", "AMD Ryzen 3 PRO 4450U", "AMD Ryzen 3 PRO 5350G", "AMD Ryzen 3 PRO 5350GE", "AMD Ryzen 3 PRO 5450U", "AMD Ryzen 3 PRO 5475U", "AMD Ryzen 3 PRO 7330U", "AMD Ryzen 3 PRO 4355G", "AMD Ryzen 3 PRO 4355GE", "AMD Ryzen 5 2600", 
  "AMD Ryzen 5 3600", "AMD Ryzen 5 4500", "AMD Ryzen 5 5500", "AMD Ryzen 5 5600", "AMD Ryzen 5 7600", "AMD Ryzen 5 2500X", "AMD Ryzen 5 2600E", "AMD Ryzen 5 2600X", "AMD Ryzen 5 3350G", "AMD Ryzen 5 3350GE", "AMD Ryzen 5 3400G", "AMD Ryzen 5 3400GE", "AMD Ryzen 5 3450U", "AMD Ryzen 5 3500", "AMD Ryzen 5 3500C", "AMD Ryzen 5 3500U", "AMD Ryzen 5 3500X", "AMD Ryzen 5 3550H", "AMD Ryzen 5 3580U", "AMD Ryzen 5 3600X", "AMD Ryzen 5 3600XT", "AMD Ryzen 5 4500U", "AMD Ryzen 5 4600G",
  "Apple M4", "Apple M3 Ultra", "Apple M3 Max", "Apple M3 Pro", "Apple M3", "Apple M2 Ultra", "Apple M2 Max", "Apple M2 Pro", "Apple M2", "Apple M1 Ultra", "Apple M1 Max", "Apple M1 Pro", "Apple M1", 
  "Apple A17 Pro", "Apple A16 Bionic", "Apple A15 Bionic", "Apple A14 Bionic", "Apple A13 Bionic", "Apple A12Z Bionic", "Apple A12X Bionic", "Apple A12 Bionic", "Apple A11 Bionic", "Apple A10X Fusion", "Apple A10 Fusion", "Apple A9X", "Apple A9", "Apple A8X", "Apple A7", "Apple A6X", "Apple A6", "Apple A5X", "Apple A5", "Apple A4", 
  "Qualcomm Snapdragon X Elite X1E-00-1DE", "Qualcomm Snapdragon X Elite X1E-84-100", "Qualcomm Snapdragon X Elite X1E-80-100", "Qualcomm Snapdragon X Elite X1E-78-100", 
  "Qualcomm Snapdragon X Plus X1P-66-100", "Qualcomm Snapdragon X Plus X1P-64-100", "Qualcomm Snapdragon X Plus X1P-46-100", "Qualcomm Snapdragon X Plus X1P-42-100",
  "Qualcomm Snapdragon 8 Gen 4", "Qualcomm Snapdragon 8 Gen 3", "Qualcomm Snapdragon 8 Gen 2", "Qualcomm Snapdragon 8 Gen 1", "Qualcomm Snapdragon 888+", "Qualcomm Snapdragon 888", "Qualcomm Snapdragon 870", "Qualcomm Snapdragon 865+", "Qualcomm Snapdragon 865", "Qualcomm Snapdragon 860", "Qualcomm Snapdragon 855+", "Qualcomm Snapdragon 855", "Qualcomm Snapdragon 845", "Qualcomm Snapdragon 835", "Qualcomm Snapdragon 821", "Qualcomm Snapdragon 820", "Qualcomm Snapdragon 7+ Gen 2", "Qualcomm Snapdragon 7 Gen 1", "Qualcomm Snapdragon 6 Gen 1", "Qualcomm Snapdragon 4 Gen 1", "MTK"
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
  "Nvidia GeForce RTX 5090",
  "Nvidia GeForce RTX 5080",
  "Nvidia GeForce RTX 5070",
  "Nvidia GeForce RTX 5060",
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
