const adamCoddViTBaseNSFWDetector = () => {
  const configs = [
    ['fp32', 'model.onnx', '328 MB'],
    ['fp16', 'model_fp16.onnx', '164 MB'],
    ['q4f16', 'model_fp16.onnx', '47.9 MB'],
    ['int8', 'model_quantized.onnx', '84.4 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Classification',
    tag: '',
    id: `adamcodd_vit_base_nsfw_detector_${dt}`,
    name: 'AdamCodd ViT base NSFW Detector',
    description: 'ViT model specifically to detect NSFW/SFW images for stable diffusion usage',
    note: '',
    source: 'https://huggingface.co/AdamCodd/vit-base-nsfw-detector/',
    hf: {
      model: 'AdamCodd/vit-base-nsfw-detector',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
       'pixel_values': ['float32', 'random', [1, 3, 384, 384], { "batch_size": 1, "num_channels":3, "height": 384, "width": 384 }],
    }],
    inputstip: '[1, 3, 384, 384]'
  }))
}

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


const briaAiRmbg2 = () => {
  const configs = [
    ['fp32', 'model.onnx', '976 MB'],
    ['fp16', 'model_fp16.onnx', '489 MB'],
    ['q4f16', 'model_fp16.onnx', '222 MB'],
    ['int8', 'model_quantized.onnx', '349 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Segmentation',
    tag: '',
    id: `bria_ai_rmbg_2_${dt}`,
    name: 'BRIA AI RMBG 2.0',
    description: 'BRIA Background Removal v2.0. RMBG v2.0 is new state-of-the-art background removal model significantly improves RMBG v1.4.',
    note: '',
    source: 'https://huggingface.co/briaai/RMBG-2.0/',
    hf: {
      model: '',
      file: ``,
    },
    model: `briaai/RMBG-2.0/onnx/${file}`,
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
       'pixel_values': ['float32', 'random', [1, 3, 1024, 1024], { "height": 1024, "width": 1024 }],
    }],
    inputstip: '[1, 3, 1024, 1024]'
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
    tag: '',
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
    tag: '',
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

const tinyClapHtsatUnfusedHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '7.54 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '',
    id: `tiny_clap_htsat_unfused_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Zero-shot Audio Classification Tiny CLAP HTSAT Unfused ${dt}`,
    description: 'Zero-shot Audio Classification - Tiny CLAP HTSAT Unfused',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-clap-htsat-unfused',
    hf: {
      model: 'hf-internal-testing/tiny-clap-htsat-unfused',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [2, 6], { "text_batch_size": 2, "sequence_length": 6 }],
      'input_features': ['float32', 'random', [1, 1, 1001, 64], { "audio_batch_size": 1, "num_channels": 1, "height": 1001, "width": 64 }],
      'attention_mask': ['int64', 1n, [2, 6], {}],
    }],
    inputstip: '[2, 6] [1, 1, 1001, 64] [2, 6]'
  }))
}

const tinyRandomGroupViTModelHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '4.48 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '',
    id: `tiny_random_group_vit_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Zero-shot Image Classification Tiny Random Group ViT ${dt}`,
    description: 'Zero-shot Image Classification - Tiny Random Group ViT Model',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-GroupViTModel',
    hf: {
      model: 'hf-internal-testing/tiny-random-GroupViTModel',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [2, 10], { "text_batch_size": 2, "sequence_length": 10 }],
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "image_batch_size": 1, "num_channels": 3, "height": 30, "width": 30 }],
      'attention_mask': ['int64', 1n, [2, 10], {}],
    }],
    inputstip: '[2, 10] [1, 3, 30, 30] [2, 10]'
  }))
}

const tinyRandomOwlViTHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '1.99 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '',
    id: `tiny_random_owl_vit_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Zero-shot Object Detection Tiny Random Owl ViT ${dt}`,
    description: 'Zero-shot Object Detection - Tiny Random Owl ViT for Object Detection',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-OwlViTForObjectDetection',
    hf: {
      model: 'hf-internal-testing/tiny-random-OwlViTForObjectDetection',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [2, 4], { "text_batch_size": 2, "sequence_length": 4 }],
      'pixel_values': ['float32', 'random', [1, 3, 32, 32], { "image_batch_size": 1, "num_channels": 3, "height": 32, "width": 32 }],
      'attention_mask': ['int64', 1n, [2, 4], {}],
    }],
    inputstip: '[2, 4] [1, 3, 32, 32] [2, 4]'
  }))
}

const tinyRandomClipModelHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '782 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Zero-Shot Image Classification',
    tag: '',
    id: `tiny_random_clip_tfbench_model_${dt}`,
    name: `TFBench_Model CLIPModel Tiny Random ${dt}`,
    description: 'Tiny Random Clip model',
    note: '',
    source: 'https://huggingface.co/onnx-internal-testing/tiny-random-CLIPModel-ONNX',
    hf: {
      model: 'onnx-internal-testing/tiny-random-CLIPModel-ONNX',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [2, 15], { "text_batch_size": 2, "sequence_length": 15 }],
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "image_batch_size": 1, "num_channels": 3, "height": 30, "width": 30 }],
      'attention_mask': ['int64', 1n, [2, 15], {}],
    }],
    inputstip: '[2, 15] [1, 3, 30, 30] [2, 15]'
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

const deepSeekR1DistillQwen1_5BDemoMerged = () => {
  const configs = [
    ['fp16', 'model_fp16.onnx', '275 KB', 'model.onnx.data', '1.27 GB'],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '',
    id: `deepseek_r1_distill_qwen_1_5b_demo_merged_${dt}`,
    name: `DeepSeek R1 Distill Qwen 1.5B Static KV-Cache Demo ${dt}`,
    description: 'The optimized version of DeepSeek-R1-Distill-Qwen-1.5B to accelerate inference',
    note: 'Large model with external data',
    source: 'https://huggingface.co/webnn/DeepSeek-R1-Distill-ONNX',
    hf: {
      model: 'webnn/DeepSeek-R1-Distill-ONNX',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} + ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
      'attention_mask': ['int64', 1n, [1, 512], { "total_sequence_length": 512, "past_sequence_length": 512 }],
      'position_ids': ['int64', 1n, [1, 1], {}],
    }],
    inputstip: '[1, 1] [1, 512] [1, 1]'
  }))
}

const depthAnythingBase = () => {
  const configs = [
    ['fp32', 'model.onnx', '371 MB'],
    ['fp16', 'model_fp16.onnx', '185 MB'],
    ['int8', 'model_quantized.onnx', '97.9 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Depth Estimation',
    tag: '',
    isv: 'ms',
    id: `depth_anything_base_${dt}`,
    name: `Depth Anything Base`,
    description: 'Depth Anything Base',
    note: '',
    source: 'https://huggingface.co/Xenova/depth-anything-base-hf',
    hf: {
      model: 'xenova/depth-anything-base-hf',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 518, 518], {
        "batch_size": 1,
        "num_channels": 3,
        "height": 518,
        "width": 518,
      }]
    }],
    inputstip: '[1, 3, 518, 518]'
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
    tag: '',
    isv: 'ms',
    id: `detr_resnet_50_${dt}`,
    name: `DETR ResNet-50`,
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
      'pixel_values': ['float32', 'random', [1, 3, 640, 640], { "batch_size": 1, "num_channels": 3, "height": 640, "width": 640 }],
      'pixel_mask': ['int64', 1n, [1, 64, 64], { "batch_size": 1 }]
    }],
    inputstip: '[1, 3, 640, 640] [1, 64, 64]'
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
    tag: '',
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

const distilLargeV3Decoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '455 MB'],
    ['int8', 'decoder_model_quantized.onnx', '115 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `distil_large_v3_decoder_${dt}`,
    name: 'Distil-Whisper Distil Large v3 Decoder',
    description: 'The model is faster than previous Distil-Whisper models: 6.3x faster than large-v3, and 1.1x faster than distil-large-v2.',
    note: '',
    source: 'https://huggingface.co/distil-whisper/distil-large-v3',
    hf: {
      model: 'distil-whisper/distil-large-v3',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 1, "past_decoder_sequence_length": 1, "encoder_sequence_length_out": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 1500, 1280], { "batch_size": 1, "encoder_sequence_length / 2": 1500 }]
    }],
    inputstip: '[1, 1] [1, 1500, 1280]'
  }))
}

const distilLargeV3DecoderWithPast = () => {
  const configs = [
    ['fp32', 'decoder_with_past_model.onnx', '430 MB'],
    ['int8', 'decoder_with_past_model_quantized.onnx', '109 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `distil_large_v3_decoder_with_past_${dt}`,
    name: 'Distil-Whisper Distil Large v3 Decoder w/i Past',
    description: 'The model is faster than previous Distil-Whisper models: 6.3x faster than large-v3, and 1.1x faster than distil-large-v2.',
    note: '',
    source: 'https://huggingface.co/distil-whisper/distil-large-v3',
    hf: {
      model: 'distil-whisper/distil-large-v3',
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

const distilLargeV3DecoderMerged = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '455 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '115 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `distil_large_v3_decoder_merged_${dt}`,
    name: 'Distil-Whisper Distil Large v3 Decoder KV-Cache',
    description: 'The model is faster than previous Distil-Whisper models: 6.3x faster than large-v3, and 1.1x faster than distil-large-v2.',
    note: '',
    source: 'https://huggingface.co/distil-whisper/distil-large-v3',
    hf: {
      model: 'distil-whisper/distil-large-v3',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 1, "past_decoder_sequence_length": 1, "encoder_sequence_length_out": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 1500, 1280], { "batch_size": 1, "encoder_sequence_length / 2": 1500 }],
      'use_cache_branch': ['bool', 1, [1], {}]
    }],
    inputstip: '[1, 1] [1, 1500, 1280] [1]'
  }))
}

const distilLargeV3Encoder = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '646 KB', 'encoder_model.onnx_data', '2.37 GB'],
    ['int8', 'encoder_model_quantized.onnx', '615 MB', '', ''],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `distil_large_v3_encoder_${dt}`,
    name: 'Distil-Whisper Distil Large v3 Encoder',
    description: 'The model is faster than previous Distil-Whisper models: 6.3x faster than large-v3, and 1.1x faster than distil-large-v2.',
    note: 'Large model',
    source: 'https://huggingface.co/distil-whisper/distil-large-v3',
    hf: {
      model: 'distil-whisper/distil-large-v3',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} + ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_features': ['float32', 'random', [1, 128, 3000], { "batch_size": 1, "feature_size": 128, "encoder_sequence_length": 3000 }],
    }],
    inputstip: '[1, 128, 3000]'
  }))
}

const distilMediumEnDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model.onnx', '332 MB'],
    ['int8', 'decoder_model_quantized.onnx', '84.6 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `distil_medium_en_decoder_${dt}`,
    name: 'Distil-Whisper Distil Medium En Decoder',
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
    tag: '',
    id: `distil_medium_en_decoder_with_past_${dt}`,
    name: 'Distil-Whisper Distil Medium En Decoder w/i Past',
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
    tag: '',
    id: `distil_medium_en_decoder_merged_${dt}`,
    name: 'Distil-Whisper Distil Medium En Decoder KV-Cache',
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
    tag: '',
    id: `distil_medium_en_encoder_${dt}`,
    name: 'Distil-Whisper Distil Medium En Encoder',
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

const dPTForDepthEstimationHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '68.3 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Depth Estimation',
    tag: '',
    id: `tiny_random_dpt_for_depth_estimation_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Depth Estimation Tiny Random DPT ${dt}`,
    description: 'Depth Estimation - Tiny Random DPT for Depth Estimation',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-DPTForDepthEstimation',
    hf: {
      model: 'hf-internal-testing/tiny-random-DPTForDepthEstimation',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 32, 32], {
        "batch_size": 1, "num_channels": 3,
        "height": 32,
        "width": 32
      }],
    }],
    inputstip: '[1, 3, 32, 32]'
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
      'pixel_values': ['float32', 'random', [1, 3, 512, 512], { "batch_size": 1, "num_channels": 3, "height": 512, "width": 512 }]
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
    tag: '',
    isv: 'ms',
    id: `florence2_decoder_${dt}`,
    name: `Florence-2 Base Decoder`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_decoder_merged_${dt}`,
    name: `Florence-2 Base WIP Decoder KV-Cache`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_decoder_with_past_${dt}`,
    name: `Florence-2 Base Decoder w/i Past`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_encoder_${dt}`,
    name: `Florence-2 Base Encoder`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_embed_tokens_${dt}`,
    name: `Florence-2 Base Embed Tokens`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_vision_encoder_${dt}`,
    name: `Florence-2 Base Vision Encoder`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_conditional_decoder_${dt}`,
    name: `Florence 2 Conditional Generation Decoder`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_conditional_decoder_merged_${dt}`,
    name: `Florence 2 Conditional Generation WIP Decoder KV-Cache`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_conditional_decoder_with_past_${dt}`,
    name: `Florence 2 Conditional Generation Decoder w/i Past`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_conditional_encoder_${dt}`,
    name: `Florence 2 Conditional Generation Encoder`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_conditional_embed_tokens_${dt}`,
    name: `Florence 2 Conditional Generation Embed Tokens`,
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
    tag: '',
    isv: 'ms',
    id: `florence2_conditional_vision_encoder_${dt}`,
    name: `Florence 2 Conditional Generation Vision Encoder`,
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
    tag: '',
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
    tag: '',
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
    tag: '',
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
    tag: '',
    isv: 'ms',
    id: `jina_clip_v1_text_${dt}`,
    name: `Jina CLIP v1 Text`,
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
    tag: '',
    isv: 'ms',
    id: `jina_clip_v1_vision_${dt}`,
    name: `Jina CLIP v1 Vision`,
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
    tag: '',
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
    tag: '',
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

const kokoro82MV1 = () => {
  const configs = [
    ['fp32', 'model.onnx', '310 MB'],
    ['fp16', 'model_fp16.onnx', '155 MB'],
    ['int8', 'model_quantized.onnx', '88 MB'],
    ['q4', 'model_q4.onnx', '219 MB'],
    ['q4f16', 'model_q4f16.onnx', '147 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text-to-Speech',
    tag: '',
    id: `kokoro_82m_v1_${dt}`,
    name: 'Kokoro 82M v1',
    description: 'Kokoro is a frontier TTS model for its size of 82 million parameters (text in/audio out).',
    note: '',
    source: 'https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX',
    hf: {
      model: 'onnx-community/Kokoro-82M-v1.0-ONNX',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 48], { "sequence_length": 48 }],
      'style': ['float32', 'random', [1, 256], {}],
      'speed': ['float32', 'random', [1], {}],
    }],
    inputstip: '[1, 256] [1, 256] [1]'
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
    tag: '',
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
    tag: '',
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
    tag: '',
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

const llama2CStories15MHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '58.0 MB'],
    ['int8', 'model_quantized.onnx', '14.6 MB']
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '',
    id: `llama2_c_stories15m_tfbench_model_${dt}`,
    name: `TFBench_Model LlamaForCausalLM llama2.c Stories 15M ${dt}`,
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
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
      'attention_mask': ['int64', 1n, [1, 10], { "batch_size": 1, "past_sequence_length + 1": 10, "past_sequence_length": 9 }],
      'position_ids': ['int64', 9n, [1, 1], {}],
    }],
    inputstip: '[1, 1] [1, 10] [1, 1]'
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
    tag: '',
    isv: 'ms',
    id: `llava_decoder_${dt}`,
    name: `Llava Decoder`,
    description: 'Tiny Random Llava for Conditional Generation',
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
    tag: '',
    isv: 'ms',
    id: `llava_decoder_merged_${dt}`,
    name: `Llava WIP Decoder KV-Cache`,
    description: 'Tiny Random Llava for Conditional Generation',
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
    tag: '',
    isv: 'ms',
    id: `llava_decoder_with_past_${dt}`,
    name: `Llava Decoder w/i Past`,
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
    tag: '',
    isv: 'ms',
    id: `llava_embed_tokens_${dt}`,
    name: `Llava Embed Tokens`,
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
    tag: '',
    isv: 'ms',
    id: `llava_vision_encoder_${dt}`,
    name: `Llava Vision Encoder`,
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
    tag: '',
    isv: 'ms',
    id: `llava_phi_decoder_merged_${dt}`,
    name: `Llava Phi WIP Decoder KV-Cache`,
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
      'input_ids': ['int64', 99n, [1, 576, 16], { "batch_size": 1, "sequence_length": 576 }],
      'attention_mask': ['int64', 1n, [1, 576], { "batch_size": 1, "past_sequence_length + 1": 576 }],
      'position_ids': ['int64', 99n, [1, 576], { "batch_size": 1, "sequence_length": 576, "past_sequence_length": 575 }],
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
    tag: '',
    isv: 'ms',
    id: `llava_phi_embed_tokens_${dt}`,
    name: `Llava Phi Embed Tokens`,
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
    tag: '',
    isv: 'ms',
    id: `llava_phi_vision_encoder_${dt}`,
    name: `Llava Phi Vision Encoder`,
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

const marqoFashionSigLIPText = () => {
  const configs = [
    ['fp32', 'text_model.onnx', '420 MB'],
    ['fp16', 'text_model_fp16.onnx', '210 MB'],
    ['int8', 'text_model_quantized.onnx', '105 MB'],
    ['q4f16', 'text_model_q4f16.onnx', '103 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Zero-Shot Image Classification',
    tag: '',
    isv: '',
    id: `marqo_fashion_sig_lip_text_${dt}`,
    name: `Marqo-FashionSigLIP Text`,
    description: 'Marqo-FashionSigLIP is a multimodal embedding model that provides up to 57% improvement in MRR and recall over fashion clip.',
    note: '',
    source: 'https://huggingface.co/Marqo/marqo-fashionSigLIP',
    hf: {
      model: 'Marqo/marqo-fashionSigLIP',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 64], { "batch_size": 1, "sequence_length": 64 }]
    }],
    inputstip: '[1, 64]'
  }))
}

const marqoFashionSigLIPVision = () => {
  const configs = [
    ['fp32', 'vision_model.onnx', '354 MB'],
    ['fp16', 'vision_model_fp16.onnx', '177 MB'],
    ['int8', 'vision_model_quantized.onnx', '89.6 MB'],
    ['q4f16', 'vision_model_q4f16.onnx', '51.1 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Zero-Shot Image Classification',
    tag: '',
    isv: '',
    id: `marqo_fashion_sig_lip_vision_${dt}`,
    name: `Marqo FashionSigLIP Vision`,
    description: 'Marqo-FashionSigLIP is a multimodal embedding model that provides up to 57% improvement in MRR and recall over fashion clip.',
    note: '',
    source: 'https://huggingface.co/Marqo/marqo-fashionSigLIP',
    hf: {
      model: 'Marqo/marqo-fashionSigLIP',
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

const mediapipeSelfieSegmentation = () => {
  const configs = [
    ['fp32', 'model.onnx', '452 KB'],
    ['fp16', 'model_fp16.onnx', '246 KB'],
    ['int8', 'model_quantized.onnx', '219 KB'],
    ['q4', 'model_q4.onnx', '452 KB'],
    ['q4f16', 'model_q4f16.onnx', '246 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Segmentation',
    tag: '',
    id: `mediapipe_selfie_segmentation_${dt}`,
    name: 'Mediapipe Selfie Segmentation 256x256',
    description: 'Selfie segmentation',
    note: '',
    source: 'https://huggingface.co/onnx-community/mediapipe_selfie_segmentation',
    hf: {
      model: 'onnx-community/mediapipe_selfie_segmentation',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 256, 256], { "batch_size": 1 }],
    }],
    inputstip: '[1, 3, 256, 256]'
  }))
}

const mediapipeSelfieSegmentationLandscape = () => {
  const configs = [
    ['fp32', 'model.onnx', '452 KB'],
    ['fp16', 'model_fp16.onnx', '246 KB'],
    ['int8', 'model_quantized.onnx', '219 KB'],
    ['q4', 'model_q4.onnx', '452 KB'],
    ['q4f16', 'model_q4f16.onnx', '246 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Segmentation',
    tag: '',
    id: `mediapipe_selfie_segmentation_landscape_${dt}`,
    name: 'Mediapipe Selfie Segmentation Landscape 144x256',
    description: 'Selfie segmentation Landscape',
    note: '',
    source: 'https://huggingface.co/onnx-community/mediapipe_selfie_segmentation_landscape',
    hf: {
      model: 'onnx-community/mediapipe_selfie_segmentation_landscape',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 144, 256], { "batch_size": 1 }],
    }],
    inputstip: '[1, 3, 144, 256]'
  }))
}

const mobileClipS0Text = () => {
  const configs = [
    ['fp32', 'text_model.onnx', '161 MB'],
    ['fp16', 'text_model_fp16.onnx', '81 MB'],
    ['int8', 'text_model_quantized.onnx', '40.8 MB'],
    ['int4', 'text_model_q4.onnx', '120 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Zero-Shot Image Classification',
    tag: '',
    isv: 'ms',
    id: `mobileclip_s0_text_${dt}`,
    name: `MobileCLIP s0 Text`,
    description: 'MobileCLIP: Fast Image-Text Models through Multi-Modal Reinforced Training https://huggingface.co/spaces/webml-community/mobileclip-webnn-gpu',
    note: '',
    source: 'https://huggingface.co/Xenova/mobileclip_s0',
    hf: {
      model: 'xenova/mobileclip_s0',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 101n, [2, 77], { "batch_size": 2, "sequence_length": 77 }]
    }],
    inputstip: '[2, 77]'
  }))
}

const mobileClipS0Vision = () => {
  const configs = [
    ['fp32', 'vision_model.onnx', '43.4 MB'],
    ['fp16', 'vision_model_fp16.onnx', '21.8 MB'],
    ['int8', 'vision_model_quantized.onnx', '11.2 MB'],
    ['int4', 'vision_model_q4.onnx', '34.9 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Zero-Shot Image Classification',
    tag: '',
    isv: 'ms',
    id: `mobileclip_s0_vision_${dt}`,
    name: `MobileCLIP s0 Vision`,
    description: 'MobileCLIP: Fast Image-Text Models through Multi-Modal Reinforced Training https://huggingface.co/spaces/webml-community/mobileclip-webnn-gpu',
    note: '',
    source: 'https://huggingface.co/Xenova/mobileclip_s0',
    hf: {
      model: 'xenova/mobileclip_s0',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 256, 256], { "batch_size": 1 }],
    }],
    inputstip: '[1, 3, 256, 256]'
  }))
}

const mobileNetV4 = () => {
  const configs = [
    ['fp32', 'model.onnx', '14.3 MB'],
    ['fp16', 'model_fp16.onnx', '7.21 MB'],
    ['int8', 'model_quantized.onnx', '3.74 MB']
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Classification',
    tag: '',
    id: `mobilenet_v4_${dt}`,
    name: 'MobileNet v4 HF-FDO',
    description: 'https://huggingface.co/timm/mobilenetv4_conv_small.e2400_r224_in1k with ONNX weights to be compatible with Transformers.js.',
    note: '',
    source: 'https://huggingface.co/onnx-community/mobilenetv4s-webnn',
    hf: {
      model: 'onnx-community/mobilenetv4s-webnn',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 224, 224], {
        "batch_size": 1,
        "num_channels": 3,
        "height": 224,
        "width": 224,
      }]
    }],
    inputstip: '[1, 3, 224, 224]'
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

const modNet = () => {
  const configs = [
    ['fp32', 'model.onnx', '24.6 MB'],
    ['fp16', 'model_fp16.onnx', '12.3 MB'],
    ['int8', 'model_quantized.onnx', '6.32 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Segmentation',
    tag: '',
    isv: 'ms',
    id: `mod_net_${dt}`,
    name: `MODNet`,
    description: 'MODNet: Trimap-Free Portrait Matting in Real Time',
    note: '',
    source: 'https://huggingface.co/Xenova/modnet',
    hf: {
      model: 'xenova/modnet',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input': ['float32', 'random', [1, 3, 256, 256], {
        "batch_size": 1,
        "height": 256,
        "width": 256,
      }]
    }],
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
    tag: '',
    isv: 'ms',
    id: `moondream2_decoder_merged_${dt}`,
    name: `moondream2 WIP Decoder KV-Cache`,
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
    tag: '',
    isv: 'ms',
    id: `moondream2_embed_tokens_${dt}`,
    name: `moondream2 Embed Tokens`,
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
    tag: '',
    isv: 'ms',
    id: `moondream2_vision_encoder_${dt}`,
    name: `moondream2 Vision Encoder`,
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

const movenetMultiposeLightning = () => {
  const configs = [
    ['fp32', 'model.onnx', '18.1 MB'],
    ['fp16', 'model_fp16.onnx', '9.2 MB'],
    ['int8', 'model_quantized.onnx', '5.01 MB'],
    ['int8', 'model_q4.onnx', '18.1 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Keypoint Detection',
    tag: '',
    isv: 'ms',
    id: `movenet_multipose_lightning_${dt}`,
    name: `MoveNet Multipose Lightning`,
    description: '',
    note: '',
    source: 'https://huggingface.co/Xenova/MoveNet-multipose-lightning',
    hf: {
      model: 'xenova/MoveNet-multipose-lightning',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input': ['int32', 99, [1, 192, 192, 3], { "unk__1502": 192, "unk__1503": 192 }]
    }],
    inputstip: '[1, 192, 192, 3]'
  }))
}

const movenetSingleposeLightning = () => {
  const configs = [
    ['fp32', 'model.onnx', '8.97 MB'],
    ['fp16', 'model_fp16.onnx', '4.56 MB'],
    ['int8', 'model_quantized.onnx', '2.65 MB'],
    ['int8', 'model_q4.onnx', '8.97 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Keypoint Detection',
    tag: '',
    isv: 'ms',
    id: `movenet_singlepose_lightning_${dt}`,
    name: `MoveNet Singlepose Lightning`,
    description: '',
    note: '',
    source: 'https://huggingface.co/Xenova/MoveNet-singlepose-lightning',
    hf: {
      model: 'xenova/MoveNet-singlepose-lightning',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input': ['int32', 99, [1, 192, 192, 3], {}]
    }],
    inputstip: '[1, 192, 192, 3]'
  }))
}

const movenetSingleposeThunder = () => {
  const configs = [
    ['fp32', 'model.onnx', '23.9 MB'],
    ['fp16', 'model_fp16.onnx', '12 MB'],
    ['int8', 'model_quantized.onnx', '6.44 MB'],
    ['int4', 'model_q4.onnx', '23.9 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Keypoint Detection',
    tag: '',
    isv: 'ms',
    id: `movenet_singlepose_thunder_${dt}`,
    name: `MoveNet Singlepose Thunder`,
    description: '',
    note: '',
    source: 'https://huggingface.co/Xenova/MoveNet-singlepose-thunder',
    hf: {
      model: 'xenova/MoveNet-singlepose-thunder',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input': ['int32', 99, [1, 256, 256, 3], {}]
    }],
    inputstip: '[1, 256, 256, 3]'
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
    tag: '',
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
    tag: '',
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
    tag: '',
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
    tag: '',
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
    tag: '',
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

const phi3Mini4kInstructDemoMerged = () => {
  const configs = [
    ['fp16', 'model_fp16.onnx', '2.01 MB', 'model.onnx.data', '1.98 GB'],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: 'pv',
    id: `phi_3_mini_4k_instruct_demo_merged_${dt}`,
    name: `Phi-3 Mini 4k Instruct Static KV-Cache Demo ${dt}`,
    description: 'Phi-3 Mini is a lightweight, state-of-the-art open model built upon datasets used for Phi-2 - synthetic data and filtered websites - with a focus on very high-quality, reasoning dense data',
    note: 'Large model with external data',
    source: 'https://huggingface.co/webnn/Phi-3-mini-4k-instruct-onnx',
    hf: {
      model: 'webnn/Phi-3-mini-4k-instruct-onnx',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} + ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
      'position_ids': ['int64', 1n, [1, 1], {}],
      'attention_mask': ['int64', 1n, [1, 512], { "total_sequence_length": 512, "past_sequence_length": 512 }],
    }],
    inputstip: '[1, 1] [1, 1] [1, 512]'
  }))
}

const phi3Mini4kInstructMerged = () => {
  const configs = [
    ['int4', 'model_q4.onnx', '0.98 GB', 'model_q4.onnx_data', '1.54 GB'],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '',
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
    ['q4f16', 'model_q4f16.onnx', '210 MB', 'model_q4f16.onnx_data', '1.95 GB'],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '',
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

const qwen2_0_5bInstructDemoMerged = () => {
  const configs = [
    ['fp16', 'model_fp16.onnx', '236 KB', 'model.onnx.data', '528 MB'],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '',
    id: `qwen2_0_5b_instruct_demo_merged_${dt}`,
    name: `Qwen2 0.5B Instruct Static KV-Cache Demo ${dt}`,
    description: 'Qwen2 is the new series of Qwen large language models',
    note: 'Large model with external data',
    source: 'https://huggingface.co/webnn/Qwen2-0.5B-Instruct-onnx',
    hf: {
      model: 'webnn/Qwen2-0.5B-Instruct-onnx',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} + ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
      'attention_mask': ['int64', 1n, [1, 512], { "total_sequence_length": 512, "past_sequence_length": 512 }],
      'position_ids': ['int64', 1n, [1, 1], {}],
    }],
    inputstip: '[1, 1] [1, 512] [1, 1]'
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
    tag: '',
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

const Qwen2VLForConditionalGenerationEmbedding = () => {
  const configs = [
    ['fp32', 'embed_tokens.onnx', '9.28 MB']
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '',
    id: `qwen2_vl_for_conditional_generation_embed_tfbench_model_${dt}`,
    name: `TFBench_Model Qwen2VL Conditional Generation Embedding ${dt}`,
    description: 'Qwen2 VL for Conditional Generation Embedding',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-Qwen2VLForConditionalGeneration',
    hf: {
      model: 'hf-internal-testing/tiny-random-Qwen2VLForConditionalGeneration',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
    }],
    inputstip: '[1, 1]'
  }))
}

const Qwen2VLForConditionalGenerationTextDecoder = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '9.37 MB']
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '',
    id: `qwen2_vl_for_conditional_generation_text_decoder_tfbench_model_merged_${dt}`,
    name: `TFBench_Model Qwen2VL Conditional Generation WIP dim_changes Text Decoder ${dt}`,
    description: 'Qwen2 VL for Conditional Generation Text Decoder',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-Qwen2VLForConditionalGeneration',
    hf: {
      model: 'hf-internal-testing/tiny-random-Qwen2VLForConditionalGeneration',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'inputs_embeds': ['float32', 'random', [1, 1, 16], { "batch_size": 1, "sequence_length": 1 }],
      'attention_mask': ['int64', 1n, [1, 1], { "past_sequence_length": 0 }],
      'position_ids': ['int64', 1n, [3, 1, 1], {}],
    }],
    inputstip: '[1, 1, 16] [1, 1] [3, 1, 1]'
  }))
}

const Qwen2VLForConditionalGenerationVisionEncoder = () => {
  const configs = [
    ['fp32', 'vision_encoder.onnx', '204 KB']
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '',
    id: `qwen2_vl_for_conditional_generation_vision_encoder_tfbench_model_${dt}`,
    name: `TFBench_Model Qwen2VL Conditional Generation WIP Vision Encoder ${dt}`,
    description: 'Qwen2 VL for Conditional Generation Vision Encoder',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-Qwen2VLForConditionalGeneration',
    hf: {
      model: 'hf-internal-testing/tiny-random-Qwen2VLForConditionalGeneration',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [256, 1176], {
        "batch_size * grid_t * grid_h * grid_w": 256,
        "channel * temporal_patch_size * patch_size * patch_size": 1176
      }],
      'grid_thw': ['int64', 1n, [1, 3], { "batch_size": 1 }],
    }],
    inputstip: '[256, 1176] [1, 3]'
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

const slimSAM77UniformVisionEncoder = () => {
  const configs = [
    ['fp32', 'vision_encoder.onnx', '22.1 MB'],
    ['int8', 'vision_encoder_quantized.onnx', '8.46 MB']
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Mask Generation',
    tag: '',
    id: `slimsam_77_uniform_vision_encoder_tfbench_model_${dt}`,
    name: `TFBench_Model SamModel SlimSAM 77 Uniform Vision Encoder ${dt}`,
    description: 'SamModel SlimSAM 77 Uniform Vision Encoder',
    note: '',
    source: 'https://huggingface.co/Xenova/slimsam-77-uniform',
    hf: {
      model: 'xenova/slimsam-77-uniform',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 1024, 1024], { "batch_size": 1 }],
    }],
    inputstip: '[1, 3, 1024, 1024]'
  }))
}

const slimSAM77UniformPromptEncoderMaskDecoder = () => {
  const configs = [
    ['fp32', 'prompt_encoder_mask_decoder.onnx', '15.7 MB'],
    ['int8', 'prompt_encoder_mask_decoder_quantized.onnx', '4.67 MB']
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Mask Generation',
    tag: '',
    id: `slimsam_77_uniform_prompt_encoder_mask_decoder_tfbench_model_${dt}`,
    name: `TFBench_Model SamModel SlimSAM 77 Uniform Prompt Encoder Mask Decoder ${dt}`,
    description: 'SlimSAM 77 Uniform Prompt Encoder Mask Decoder',
    note: '',
    source: 'https://huggingface.co/Xenova/slimsam-77-uniform',
    hf: {
      model: 'xenova/slimsam-77-uniform',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_points': ['float32', 'random', [1, 1, 1, 2], { "batch_size": 1, "point_batch_size": 1, "nb_points_per_image": 1 }],
      'input_labels': ['int64', 0n, [1, 1, 1], {}],
      'image_embeddings': ['float32', 'random', [1, 256, 64, 64], {}],
      'image_positional_embeddings': ['float32', 'random', [1, 256, 64, 64], {}],
    }],
    inputstip: '[1, 1, 1, 2] [1, 1, 1] [1, 256, 64, 64] [1, 256, 64, 64]'
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
    tag: '',
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

const snowflakeArcticEmbedXs = () => {
  const configs = [
    ['fp32', 'model.onnx', '86.2 MB'],
    ['int8', 'model_quantized.onnx', '21.9 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Sentence Similarity',
    tag: '',
    id: `snowflake_arctic_embed_xs_tfbench_model_${dt}`,
    name: `TFBench_Model BertModel Arctic Embed XS ${dt}`,
    description: 'A suite of text embedding models that focuses on creating high-quality retrieval models optimized for performance',
    note: '',
    source: 'https://huggingface.co/Snowflake/snowflake-arctic-embed-xs',
    hf: {
      model: 'snowflake/snowflake-arctic-embed-xs',
      file: `${file}`
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [2, 4], { "batch_size": 2, "sequence_length": 4 }],
      'attention_mask': ['int64', 1n, [2, 4], {}],
      'token_type_ids': ['int64', 0n, [2, 4], {}],
    }],
    inputstip: '[2, 4] [2, 4] [2, 4]'
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
      'encoder_attention_mask': ['int64', 1n, [1, 128], { "batch_size": 1, "encoder_sequence_length": 128 }],
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 128, "past_decoder_sequence_length": 128, "encoder_sequence_length_out": 128 }],
      'encoder_hidden_states': ['float32', 'random', [1, 128, 512], { "batch_size": 1, "encoder_sequence_length": 128 }]
    }],
    inputstip: '[1, 128] [1, 1] [1, 128, 512]'
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
      'encoder_attention_mask': ['int64', 1n, [1, 9], { "encoder_sequence_length": 9 }],
      'input_ids': ['int64', 5n, [1, 1], {
        "batch_size": 1,
        "decoder_sequence_length": 1,
        "past_decoder_sequence_length": 2,
        "encoder_sequence_length_out": 9
      }],
      'encoder_hidden_states': ['float32', 'random', [1, 9, 512], {}],
      'use_cache_branch': ['bool', 1, [1], {}]
    }],
    inputstip: '[1, 9] [1, 1] [1, 9, 512] [1]'
  }))
}

const t5SmallDecoderMerged = () => {
  const configs = [
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
      'encoder_attention_mask': ['int64', 1n, [1, 9], { "encoder_sequence_length": 9 }],
      'input_ids': ['int64', 5n, [1, 1], {
        "batch_size": 1,
        "decoder_sequence_length": 1,
        "past_decoder_sequence_length": 2,
        "encoder_sequence_length_out": 9
      }],
      'encoder_hidden_states': ['float32', 'random', [1, 9, 512], {}],
      'use_cache_branch': ['bool', 1, [1], {}]
    }],
    inputstip: '[1, 9] [1, 1] [1, 9, 512] [1]'
  }))
}

const t5SmallEncoder = () => {
  const configs = [
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
      'input_ids': ['int64', 99n, [1, 9], { "batch_size": 1, "encoder_sequence_length": 9 }],
      'attention_mask': ['int64', 1n, [1, 9], {}]
    }],
    inputstip: '[1, 9] [1, 9]'
  }))
}

const t5SmallEncoderHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '134 MB'],
    ['int8', 'encoder_model_quantized.onnx', '33.9 MB']
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `t5__small_encoder_tfbench_model_${dt}`,
    name: `TFBench_Model T5 Conditional Generation T5 Small Encoder ${dt}`,
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
      'input_ids': ['int64', 99n, [1, 9], { "batch_size": 1, "encoder_sequence_length": 9 }],
      'attention_mask': ['int64', 1n, [1, 9], {}]
    }],
    inputstip: '[1, 9] [1, 9]'
  }))
}

const t5SmallDecoderMergedHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '159 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '40.4 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `t5__small_decoder_tfbench_model_merged_${dt}`,
    name: `TFBench_Model T5 Conditional Generation WIP T5 Small Decoder KV-Cache ${dt}`,
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
      'encoder_attention_mask': ['int64', 1n, [1, 9], { "encoder_sequence_length": 9 }],
      'input_ids': ['int64', 5n, [1, 1], {
        "batch_size": 1,
        "decoder_sequence_length": 1,
        "past_decoder_sequence_length": 2,
        "encoder_sequence_length_out": 9
      }],
      'encoder_hidden_states': ['float32', 'random', [1, 9, 512], {}],
      'use_cache_branch': ['bool', 1, [1], {}]
    }],
    inputstip: '[1, 9] [1, 1] [1, 9, 512] [1]'
  }))
}

const tinyLlama_1_1B_ChatV1_0DemoMerged = () => {
  const configs = [
    ['fp16', 'model_fp16.onnx', '188 KB', 'model.onnx.data', '680 MB'],
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '',
    id: `tinyllama_1_1b_chat_v1_0_demo_merged_${dt}`,
    name: `TinyLlama 1.1B Chat v1.0 Static KV-Cache Demo ${dt}`,
    description: 'A chat model finetuned on top of TinyLlama/TinyLlama-1.1B-intermediate-step-1431k-3T',
    note: 'Large model with external data',
    source: 'https://huggingface.co/webnn/TinyLlama-1.1B-Chat-v1.0-onnx',
    hf: {
      model: 'webnn/TinyLlama-1.1B-Chat-v1.0-onnx',
      file: `${file}`,
      externalData: `${externalData}`
    },
    model: '',
    size: `${size} + ${edSize}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
      'attention_mask': ['int64', 1n, [1, 512], { "total_sequence_length": 512, "past_sequence_length": 512 }],
      'position_ids': ['int64', 1n, [1, 1], {}],
    }],
    inputstip: '[1, 1] [1, 512] [1, 1]'
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
    tag: '',
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
    tag: '',
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
    tag: '',
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
    tag: '',
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
    tag: '',
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

const tinyRandomBertForQuestionAnsweringHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '448 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Question Answering',
    tag: '',
    id: `tiny_random_bert_for_question_answering_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Question Answering Tiny Random Bert ${dt}`,
    description: 'Question Answering - Tiny Random Bert for Question Answering',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-BertForQuestionAnswering',
    hf: {
      model: 'hf-internal-testing/tiny-random-BertForQuestionAnswering',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 512], { "batch_size": 1, "sequence_length": 512 }],
      'attention_mask': ['int64', 1n, [1, 512], {}],
      'token_type_ids': ['int64', 0n, [1, 512], {}],
    }],
    inputstip: '[1, 512] [1, 512] [1, 512]'
  }))
}

const tinyRandomBertForSequenceClassificationHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '453 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Classification',
    tag: '',
    id: `tiny_random_bert_for_sequence_classification_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Text Classification Tiny Random Bert for Sequence Classification ${dt}`,
    description: 'Text Classification - Tiny Random Bert for Sequence Classification',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-BertForSequenceClassification',
    hf: {
      model: 'hf-internal-testing/tiny-random-BertForSequenceClassification',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 43n, [1, 512], { "batch_size": 1, "sequence_length": 512 }],
      'attention_mask': ['int64', 1n, [1, 512], {}],
      'token_type_ids': ['int64', 0n, [1, 512], {}],
    }],
    inputstip: '[1, 512] [1, 512] [1, 512]'
  }))
}

const tinyRandomBertForTokenClassificationHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '448 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Token Classification',
    tag: '',
    id: `tiny_random_bert_for_token_classification_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Token Classification Tiny Random Bert ${dt}`,
    description: 'Token Classification - Tiny Random Bert for Token Classification',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-BertForTokenClassification',
    hf: {
      model: 'hf-internal-testing/tiny-random-BertForTokenClassification',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [256, 7], { "batch_size": 256, "sequence_length": 7 }],
      'attention_mask': ['int64', 1n, [256, 7], {}],
      'token_type_ids': ['int64', 0n, [256, 7], {}],
    }],
    inputstip: '[256, 7] [256, 7] [256, 7]'
  }))
}

const tinyRandomBertModelHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '439 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Feature Extraction',
    tag: '',
    id: `tiny_random_bert_model_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Feature Extraction Tiny Random Bert ${dt}`,
    description: 'Feature Extraction - Tiny Random Bert Model',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-BertModel',
    hf: {
      model: 'hf-internal-testing/tiny-random-BertModel',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [64, 20], { "batch_size": 64, "sequence_length": 20 }],
      'attention_mask': ['int64', 1n, [64, 20], {}],
      'token_type_ids': ['int64', 0n, [64, 20], {}],
    }],
    inputstip: '[64, 20] [64, 20] [64, 20]'
  }))
}

const tinyRandomBertForMaskedLMHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '461 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Fill-Mask',
    tag: '',
    id: `tiny_random_bert_for_masked_lm_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Fill-Mask Tiny Random Bert for Masked LM ${dt}`,
    description: 'Fill-Mask - Tiny Random Bert for Masked LM',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-BertForMaskedLM',
    hf: {
      model: 'hf-internal-testing/tiny-random-BertForMaskedLM',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [32, 36], { "batch_size": 32, "sequence_length": 36 }],
      'attention_mask': ['int64', 1n, [32, 36], {}],
      'token_type_ids': ['int64', 0n, [32, 36], {}],
    }],
    inputstip: '[32, 36] [32, 36] [32, 36]'
  }))
}


const tinyRandomLlamaForCausalLMHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '8.00 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text Generation',
    tag: '',
    id: `tiny_random_llama_for_causal_lm_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Text Generation Tiny Random Llama for Causal LM ${dt}`,
    description: 'Text Generation - Tiny Random Llama for Causal LM',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-LlamaForCausalLM',
    hf: {
      model: 'hf-internal-testing/tiny-random-LlamaForCausalLM',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 1], { "batch_size": 1, "sequence_length": 1 }],
      'attention_mask': ['int64', 1n, [1, 266], { "past_sequence_length + 1": 266 }],
      'position_ids': ['int64', 1n, [1, 1], {}],
      'past_key_values.0.key': ['float32', 'random', [1, 4, 265, 4], { "past_sequence_length": 265 }],
      'past_key_values.0.value': ['float32', 'random', [1, 4, 265, 4], {}],
      'past_key_values.1.key': ['float32', 'random', [1, 4, 265, 4], {}],
      'past_key_values.1.value': ['float32', 'random', [1, 4, 265, 4], {}],
    }],
    inputstip: '[1, 1] [1, 266] [1, 1] [1, 4, 265, 4]'
  }))
}

const tinyRandomMoonshineForConditionalGenerationEncoderHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '533 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `tiny_random_moonshine_for_conditional_generation_encoder_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Automatic Speech Recognition Tiny Random Moonshine Conditional Generation Encoder ${dt}`,
    description: 'Automatic Speech Recognition - Tiny Random Moonshine for Conditional Generation Encoder',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-MoonshineForConditionalGeneration',
    hf: {
      model: 'hf-internal-testing/tiny-random-MoonshineForConditionalGeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_values': ['float32', 'random', [1, 16000], { "batch_size": 1, "num_samples": 16000 }],
    }],
    inputstip: '[1, 16000]'
  }))
}

const tinyRandomMoonshineForConditionalGenerationDecoderMergedHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '8.38 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `tiny_random_moonshine_for_conditional_generation_decoder_tfbench_pipeline_merged_${dt}`,
    name: `TFBench_Pipeline Automatic Speech Recognition WIP Tiny Random Moonshine Conditional Generation Decoder KV-Cache ${dt}`,
    description: 'Automatic Speech Recognition - Tiny Random Moonshine for Conditional Generation Decoder KV-Cache',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-MoonshineForConditionalGeneration',
    hf: {
      model: 'hf-internal-testing/tiny-random-MoonshineForConditionalGeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 1n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 40, 64], { "batch_size": 1, "encoder_sequence_length": 40 }],
      'use_cache_branch': ['bool', 1, [1], { 'past_decoder_sequence_length': 0, 'encoder_sequence_length_out': 0 }]
    }],
    inputstip: '[1, 1] [1, 40, 64] [1]'
  }))
}

const tinyRandomM2M100ForConditionalGenerationEncoderT2THFTFBenchmark = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '7.87 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `tiny_random_m2m100_for_conditional_generation_encoder_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Translation Tiny Random M2M100 Conditional Generation Encoder ${dt}`,
    description: 'Translation - Tiny Random M2M100 for Conditional Generation Encoder',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-M2M100ForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-M2M100ForConditionalGeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 14], { "batch_size": 1, "encoder_sequence_length": 14 }],
      'attention_mask': ['int64', 1n, [1, 14], {}],
    }],
    inputstip: '[1, 14] [1, 14]'
  }))
}

const tinyRandomM2M100ForConditionalGenerationDecoderT2TMergedHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '8.02 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `tiny_random_m2m100_for_conditional_generation_tfbench_pipeline_merged_${dt}`,
    name: `TFBench_Pipeline Translation WIP Tiny Random M2M100 Conditional Generation Decoder KV-Cache ${dt}`,
    description: 'Translation - Tiny Random M2M100 for Conditional Generation Decoder KV-Cache',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-M2M100ForConditionalGeneration',
    hf: {
      model: 'xenova/tiny-random-M2M100ForConditionalGeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 14], { "encoder_sequence_length": 14 }],
      'input_ids': ['int64', 2n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 14, 16], {}],
      'use_cache_branch': ['bool', 1, [1], { "past_decoder_sequence_length": 0, "encoder_sequence_length_out": 0 }]
    }],
    inputstip: '[1, 14] [1, 14] [1, 14, 16] [1]'
  }))
}

const tinyRandomSwin2SRForImageSuperResolutionHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '1.16 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-to-Image',
    tag: '',
    id: `tiny_random_swin_2_sr_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Image to Image Tiny Random Swin2 SR for Image Super Resolution ${dt}`,
    description: 'Image to Image - Tiny Random Swin2 SR for Image Super Resolution',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-Swin2SRForImageSuperResolution',
    hf: {
      model: 'hf-internal-testing/tiny-random-Swin2SRForImageSuperResolution',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 16, 32], { "batch_size": 1, "num_channels": 3, "height": 16, "width": 32 }],
    }],
    inputstip: '[1, 3, 16, 32]'
  }))
}

const tinyRandomT5ForConditionalGenerationEncoderHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '4.10 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Summarization',
    tag: '',
    id: `tiny_random_t5_for_conditional_generation_encoder_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Summarization Tiny Random T5 Conditional Generation Encoder ${dt}`,
    description: 'Summarization - Tiny Random T5 for Conditional Generation Encoder',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-T5ForConditionalGeneration',
    hf: {
      model: 'hf-internal-testing/tiny-random-T5ForConditionalGeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'attention_mask': ['int64', 1n, [1, 512], {}],
    }],
    inputstip: '[1, 512] [1, 512]'
  }))
}

const tinyRandomT5ForConditionalGenerationDecoderMergedHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '4.39 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Summarization',
    tag: '',
    id: `tiny_random_t5_for_conditional_generation_decoder_tfbench_pipeline_merged_${dt}`,
    name: `TFBench_Pipeline Summarization WIP Tiny Random T5 Conditional Generation Decoder KV-Cache ${dt}`,
    description: 'Summarization - Tiny Random T5 for Conditional Generation Decoder KV-Cache',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-T5ForConditionalGeneration',
    hf: {
      model: 'hf-internal-testing/tiny-random-T5ForConditionalGeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'input_ids': ['int64', 0n, [1, 1], { "decoder_sequence_length": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 512, 32], {}],
      'use_cache_branch': ['bool', 1, [1], { "past_decoder_sequence_length": 0, "encoder_sequence_length_out": 0 }]
    }],
    inputstip: '[1, 512] [1, 512] [1, 512, 32] [1]'
  }))
}

const tinyRandomT5ForConditionalGenerationEncoderT2THFTFBenchmark = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '4.10 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `tiny_random_t5_for_conditional_generation_encoder_t2t_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Text to Text Generation Tiny Random T5 Conditional Generation Encoder ${dt}`,
    description: 'Text to Text Generation - Tiny Random T5 for Conditional Generation Encoder',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-T5ForConditionalGeneration',
    hf: {
      model: 'hf-internal-testing/tiny-random-T5ForConditionalGeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 9n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'attention_mask': ['int64', 1n, [1, 512], {}],
    }],
    inputstip: '[1, 512] [1, 512]'
  }))
}

const tinyRandomT5ForConditionalGenerationDecoderT2TMergedHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '4.39 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text2Text Generation',
    tag: '',
    id: `tiny_random_t5_for_conditional_generation_decoder_t2t_tfbench_pipeline_merged_${dt}`,
    name: `TFBench_Pipeline Text to Text Generation WIP Tiny Random T5 Conditional Generation Decoder KV-Cache ${dt}`,
    description: 'Text to Text Generation - Tiny Random T5 for Conditional Generation Decoder KV-Cache',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-T5ForConditionalGeneration',
    hf: {
      model: 'hf-internal-testing/tiny-random-T5ForConditionalGeneration',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'encoder_attention_mask': ['int64', 1n, [1, 512], { "batch_size": 1, "encoder_sequence_length": 512 }],
      'input_ids': ['int64', 0n, [1, 1], { "decoder_sequence_length": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 512, 32], {}],
      'use_cache_branch': ['bool', 1, [1], { "past_decoder_sequence_length": 0, "encoder_sequence_length_out": 0 }]
    }],
    inputstip: '[1, 512] [1, 512] [1, 512, 32] [1]'
  }))
}

const tinyRandomUnispeechHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '238 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Audio Classification',
    tag: '',
    id: `tiny_random_unispeech_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Audio Classification Tiny Random Unispeech ${dt}`,
    description: 'Audio Classification - Tiny Random Unispeech.',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-unispeech',
    hf: {
      model: 'hf-internal-testing/tiny-random-unispeech',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_values': ['float32', 'random', [1, 16000], { "batch_size": 1, "sequence_length": 16000 }],
    }],
    inputstip: '[1, 16000]'
  }))
}

const tinyRandomVisionEncoderDecoderModelViTGPTEncoderHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '262 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '',
    id: `tiny_random_vision_encoder_decoder_vit_gpt_encoder_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Document Question Answering Tiny Random Vit GPT2 Encoder ${dt}`,
    description: 'Document Question Answering - Tiny Random Vision Encoder Decoder Model ViT GPT2 Encoder',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-VisionEncoderDecoderModel-vit-gpt2',
    hf: {
      model: 'hf-internal-testing/tiny-random-VisionEncoderDecoderModel-vit-gpt2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "batch_size": 1, "num_channels": 3, "height": 30, "width": 30 }],
    }],
    inputstip: '[1, 3, 30, 30]'
  }))
}

const tinyRandomVisionEncoderDecoderModelViTGPTDecoderMergedHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '1.57 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '',
    id: `tiny_random_vision_encoder_decoder_vit_gpt_decoder_tfbench_pipeline_merged_${dt}`,
    name: `TFBench_Pipeline Document Question Answering WIP Tiny Random Vit GPT2 Decoder KV-Cache ${dt}`,
    description: 'Document Question Answering - Tiny Random Vision Encoder Decoder Model ViT GPT2 Decoder KV-Cache',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-VisionEncoderDecoderModel-vit-gpt2',
    hf: {
      model: 'hf-internal-testing/tiny-random-VisionEncoderDecoderModel-vit-gpt2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 41], { "batch_size": 1, "decoder_sequence_length": 41 }],
      'encoder_hidden_states': ['float32', 'random', [1, 226, 32], { "batch_size": 1, "encoder_sequence_length": 226 }],
      'use_cache_branch': ['bool', 1, [1], { 'past_sequence_length': 0 }]
    }],
    inputstip: '[1, 41] [1, 226, 32] [1]'
  }))
}

const tinyRandomVisionEncoderDecoderModelViTGPT2EncoderHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '262 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '',
    id: `tiny_random_vision_encoder_decoder_vit_gpt_2_encoder_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Image to Text Tiny Random Vit GPT2 Encoder ${dt}`,
    description: 'Image to Text - Tiny Random Vision Encoder Decoder Model ViT GPT2 Encoder',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-VisionEncoderDecoderModel-vit-gpt2',
    hf: {
      model: 'hf-internal-testing/tiny-random-VisionEncoderDecoderModel-vit-gpt2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "batch_size": 1, "num_channels": 3, "height": 30, "width": 30 }],
    }],
    inputstip: '[1, 3, 30, 30]'
  }))
}

const tinyRandomVisionEncoderDecoderModelViTGPT2DecoderMergedHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '1.57 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image-Text-to-Text',
    tag: '',
    id: `tiny_random_vision_encoder_decoder_vit_gpt_2_decoder_tfbench_pipeline_merged_${dt}`,
    name: `TFBench_Pipeline Image to Text WIP Tiny Random Vit GPT2 Decoder KV-Cache ${dt}`,
    description: 'Image to Text - Tiny Random Vision Encoder Decoder Model ViT GPT2 Decoder KV-Cache',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-VisionEncoderDecoderModel-vit-gpt2',
    hf: {
      model: 'hf-internal-testing/tiny-random-VisionEncoderDecoderModel-vit-gpt2',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 0n, [1, 1], { "batch_size": 1, "decoder_sequence_length": 1 }],
      'encoder_hidden_states': ['float32', 'random', [1, 226, 32], { "batch_size": 1, "encoder_sequence_length": 226 }],
      'use_cache_branch': ['bool', 1, [1], { 'past_sequence_length': 0 }]
    }],
    inputstip: '[1, 1] [1, 226, 32] [1]'
  }))
}

const tinyRandomViTHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '270 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Classification',
    tag: '',
    id: `tiny_random_vit_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Image Classification Tiny Random ViT ${dt}`,
    description: 'Image Classification - Tiny Random ViT',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-vit',
    hf: {
      model: 'hf-internal-testing/tiny-random-vit',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "batch_size": 1, "num_channels": 3, "height": 30, "width": 30 }],
    }],
    inputstip: '[1, 3, 30, 30]'
  }))
}

const tinyRandomViTMAEModelHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '254 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Image Feature Extraction',
    tag: '',
    id: `tiny_random_vit_mae_model_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Image Feature Extraction Tiny Random ViT MAE ${dt}`,
    description: 'Image Feature Extraction - Tiny Random ViT MAE Model',
    note: '',
    source: 'https://huggingface.co/hf-internal-testing/tiny-random-ViTMAEModel',
    hf: {
      model: 'hf-internal-testing/tiny-random-ViTMAEModel',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "batch_size": 1, "num_channels": 3, "height": 30, "width": 30 }],
    }],
    inputstip: '[1, 3, 30, 30]'
  }))
}


const tinyRandomViTsHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '511 KB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Text-to-Speech',
    tag: '',
    id: `tiny_random_vits_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Text to Audio Tiny Random ViTs ${dt}`,
    description: 'Text to Audio - Tiny Random ViTs',
    note: '',
    source: 'https://huggingface.co/Xenova/tiny-random-vits',
    hf: {
      model: 'xenova/tiny-random-vits',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 383], { "text_batch_size": 1, "sequence_length": 383 }],
      'attention_mask': ['int64', 1n, [1, 383], {}],
    }],
    inputstip: '[1, 383] [1, 383]'
  }))
}

const tinyRandomYolosForObjectDetectionHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'model.onnx', '1.16 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Object Detection',
    tag: '',
    id: `tiny_random_yolos_for_object_detection_tfbench_pipeline_${dt}`,
    name: `TFBench_Pipeline Object Detection Tiny Random Yolos ${dt}`,
    description: 'Object Detection - Tiny Random Yolos for Object Detection',
    note: '',
    source: 'https://huggingface.co/onnx-internal-testing/tiny-random-YolosForObjectDetection-ONNX',
    hf: {
      model: 'onnx-internal-testing/tiny-random-YolosForObjectDetection-ONNX',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 30, 30], { "batch_size": 1, "num_channels": 3, "height": 30, "width": 30 }],
    }],
    inputstip: '[1, 3, 30, 30]'
  }))
}

const metaLlama_3_8bInstructMerged = () => {
  const configs = [
    ['fp16', 'rank_0_Meta-Llama-3-8B-Instruct_decoder_merged_model_fp16.onnx', '1.79 MB', 'rank_0_Meta-Llama-3-8B-Instruct_decoder_merged_model_fp16.onnx.data', '14.9 GB']
  ]
  return configs.map(([dt, file, size, externalData, edSize]) => ({
    category: 'Text Generation',
    tag: '',
    isv: 'ms',
    id: `meta_llama_3_8b_instruct_merged_${dt}`,
    name: `[DO NOT RUN] Meta Llama 3 8b Instruct WIP KV-Cache`,
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
    tag: '',
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

const whisperTinyEnEncoderHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'encoder_model.onnx', '31.3 MB'],
    ['int8', 'encoder_model_quantized.onnx', '9.65 MB']
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `whisper_tiny_en_encoder_tfbench_model_${dt}`,
    name: `TFBench_Model Whisper Conditional Generation Whisper Tiny.en Encoder ${dt}`,
    description: 'A Text-To-Text transfer transformer model, reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings.',
    note: '',
    source: 'https://huggingface.co/onnx-community/whisper-tiny.en',
    hf: {
      model: 'onnx-community/whisper-tiny.en',
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

const whisperTinyEnDecoderMergedHFTFBenchmark = () => {
  const configs = [
    ['fp32', 'decoder_model_merged.onnx', '113.0 MB'],
    ['int8', 'decoder_model_merged_quantized.onnx', '29.2 MB']
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Automatic Speech Recognition',
    tag: '',
    id: `whisper_tiny_en_decoder_tfbench_model_merged_${dt}`,
    name: `TFBench_Model Whisper Conditional Generation WIP Whisper Tiny.en Decoder KV-Cache ${dt}`,
    description: 'A Text-To-Text transfer transformer model, reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings.',
    note: '',
    source: 'https://huggingface.co/onnx-community/whisper-tiny.en',
    hf: {
      model: 'onnx-community/whisper-tiny.en',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'input_ids': ['int64', 99n, [1, 2], { "batch_size": 1, "decoder_sequence_length": 2 }],
      'encoder_hidden_states': ['float32', 'random', [1, 1500, 384], { "batch_size": 1, "encoder_sequence_length / 2": 1500 }],
      'use_cache_branch': ['bool', 1, [1], {
        "past_decoder_sequence_length": 0,
        "encoder_sequence_length_out": 0
      }]
    }],
    inputstip: '[1, 2] [1, 1500, 384] [1]'
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

const yoloV8M = () => {
  const configs = [
    ['fp16', 'model_fp16.onnx', '49.5 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Object Detection',
    tag: '2h',
    isv: 'ms',
    id: `yolov8m_${dt}`,
    name: `YOLO v8m (medium)`,
    description: 'Real-Time End-to-End Object Detection',
    note: '',
    source: 'https://github.com/ultralytics/ultralytics',
    hf: {
      model: 'webnn/yolov8m',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 640, 640], {}],
    }],
    inputstip: '[1, 3, 640, 640]'
  }))
}

const yoloV8N = () => {
  const configs = [
    ['fp16', 'model_fp16.onnx', '49.5 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Object Detection',
    tag: '2h',
    isv: 'ms',
    id: `yolov8n_${dt}`,
    name: `YOLO v8n (nano)`,
    description: 'Real-Time End-to-End Object Detection',
    note: '',
    source: 'https://github.com/ultralytics/ultralytics',
    hf: {
      model: 'webnn/yolov8n',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'pixel_values': ['float32', 'random', [1, 3, 640, 640], {}],
    }],
    inputstip: '[1, 3, 640, 640]'
  }))
}

const yoloV8NPose = () => {
  const configs = [
    ['fp32', 'model.onnx', '12.8 MB'],
    ['fp16', 'model_fp16.onnx', '6.47 MB'],
    ['int8', 'model_quantized.onnx', '3.58 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Object Detection',
    tag: '2h',
    isv: 'ms',
    id: `yolov8n_pose_${dt}`,
    name: `YOLO v8n Pose (nano)`,
    description: 'Real-Time End-to-End Object Detection',
    note: 'Manually exported to ONNX',
    source: 'https://github.com/ultralytics/ultralytics',
    hf: {
      model: 'xenova/yolov8n-pose',
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
    tag: '2h',
    isv: 'ms',
    id: `yolov8x_pose_${dt}`,
    name: `YOLO v8x Pose (extra large)`,
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
    name: 'YOLO v10n (nano)',
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

const yolo11N = () => {
  const configs = [
    ['fp32', 'yolo11n.onnx', '10.2 MB'],
    ['fp16', 'yolo11n_fp16.onnx', '5.15 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Object Detection',
    tag: '',
    id: `yolo11n_${dt}`,
    name: `YOLO 11n (nano)`,
    description: 'Real-Time End-to-End Object Detection',
    note: '',
    source: 'https://huggingface.co/webnn/yolo11n',
    hf: {
      model: 'webnn/yolo11n',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'images': [dt == 'fp16' ? 'float16' : 'float32', 'random', [1, 3, 640, 640], {}],
    }],
    inputstip: '[1, 3, 640, 640]'
  }))
}

const yolo12N = () => {
  const configs = [
    ['fp32', 'yolo12n.onnx', '10.1 MB'],
    ['fp16', 'yolo12n_fp16.onnx', '5.15 MB'],
  ]
  return configs.map(([dt, file, size]) => ({
    category: 'Object Detection',
    tag: '',
    id: `yolo12n_${dt}`,
    name: `YOLO 12n (nano)`,
    description: 'YOLO12 is a versatile model that supports a wide range of core computer vision tasks',
    note: '',
    source: 'https://huggingface.co/webnn/yolo12n',
    hf: {
      model: 'webnn/yolo12n',
      file: `${file}`,
    },
    model: '',
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{
      'images': [dt == 'fp16' ? 'float16' : 'float32', 'random', [1, 3, 640, 640], {}],
    }],
    inputstip: '[1, 3, 640, 640]'
  }))
}

const onnxOperatorsAdd2Inputs = () => {
  const configs = [
    ['fp32', 'float32', 'add_two_inputs_fp32.onnx', '1 KB', 'onnx_op_add_2_inputs', 'Add two-input 1x2', 'ONNX Operator - two-input Add 1x2 FP32'],
    ['fp16', 'float16', 'add_two_inputs_fp16.onnx', '1 KB', 'onnx_op_add_2_inputs', 'Add two-input 1x2', 'ONNX Operator - two-input Add 1x2 FP16'],
  ]
  return configs.map(([dt, dt_full, file, size, id, name, des]) => ({
    category: 'Operators',
    tag: 'onnx_operators',
    id: `${id}_${dt}`,
    name: `${name}`,
    description: `${des}`,
    note: '',
    source: '',
    hf: {
      model: '',
      file: ``,
    },
    model: `onnx_operators/${dt}/${file}`,
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{ 'input1': [`${dt_full}`, 'random', [1, 2], {}] },
    { 'input2': [`${dt_full}`, 'random', [1, 2], {}] }],
    inputstip: `[1,2] [1,2]`
  }))
}

const onnxOperatorsAddConstant = () => {
  const configs = [
    ['fp32', 'float32', 'add_constant_fp32.onnx', '1 KB', 'onnx_op_add_constant', 'Add constant 1x2', 'ONNX Operator - Add with custom constant 1x2 FP32'],
    ['fp16', 'float16', 'add_constant_fp16.onnx', '1 KB', 'onnx_op_add_constant', 'Add constant 1x2', 'ONNX Operator - Add with custom constant 1x2 FP16'],
  ]
  return configs.map(([dt, dt_full, file, size, id, name, des]) => ({
    category: 'Operators',
    tag: 'onnx_operators',
    id: `${id}_${dt}`,
    name: `${name}`,
    description: `${des}`,
    note: '',
    source: '',
    hf: {
      model: '',
      file: ``,
    },
    model: `onnx_operators/${dt}/${file}`,
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{ 'input': [`${dt_full}`, 'random', [1,2], {}] }],
    inputstip: `[1,2]`
  }))
}

const onnxOperatorsConv = () => {
  const configs = [
    ['fp32', 'float32', 'conv_fp32.onnx', '3.78 KB'],
    ['fp16', 'float16', 'conv_fp16.onnx', '2.46 KB'],
  ]
  return configs.map(([dt, dt_full, file, size]) => ({
    category: 'Operators',
    tag: 'onnx_operators',
    id: `onnx_op_conv_${dt}`,
    name: 'Conv',
    description: `ONNX Operator - Conv ${dt}`,
    note: '',
    source: '',
    hf: {
      model: '',
      file: ``,
    },
    model: `onnx_operators/${dt}/${file}`,
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{ 'input': [`${dt_full}`, 'random', [1, 3, 224, 224], {}] }],
    inputstip: `[1,3,224,224]`
  }))
}

const onnxOperatorsMatMul2D = () => {
  const configs = [
    ['fp32', 'float32', 'matmul_2d_fp32.onnx', '512 KB', 'onnx_op_matmul_2d', 'MatMul 2D', 'ONNX Operator - MatMul 2D FP32'],
    ['fp16', 'float16', 'matmul_2d_fp16.onnx', '322 KB', 'onnx_op_matmul_2d', 'MatMul 2D', 'ONNX Operator - MatMul 2D FP16'],
  ]
  return configs.map(([dt, dt_full, file, size, id, name, des]) => ({
    category: 'Operators',
    tag: 'onnx_operators',
    id: `${id}_${dt}`,
    name: `${name}`,
    description: `${des}`,
    note: '',
    source: '',
    hf: {
      model: '',
      file: ``,
    },
    model: `onnx_operators/${dt}/${file}`,
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{ 'input_a': [`${dt_full}`, 'random', [128, 256], {}] }],
    inputstip: `[128,256]`
  }))
}

const onnxOperatorsMatMul3D = () => {
  const configs = [
    ['fp32', 'float32', 'matmul_3d_fp32.onnx', '3.00 MB', 'onnx_op_matmul_3d', 'MatMul 3D', 'ONNX Operator - MatMul 3D FP32'],
    ['fp16', 'float16', 'matmul_3d_fp16.onnx', '1.89 MB', 'onnx_op_matmul_3d', 'MatMul 3D', 'ONNX Operator - MatMul 3D FP16'],
  ]
  return configs.map(([dt, dt_full, file, size, id, name, des]) => ({
    category: 'Operators',
    tag: 'onnx_operators',
    id: `${id}_${dt}`,
    name: `${name}`,
    description: `${des}`,
    note: '',
    source: '',
    hf: {
      model: '',
      file: ``,
    },
    model: `onnx_operators/${dt}/${file}`,
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{ 'input_a': [`${dt_full}`, 'random', [1, 512, 768], {}] }],
    inputstip: `[1,512,768]`
  }))
}

const onnxOperatorsGemm_32_512 = () => {
  const configs = [
    ['fp32', 'float32', 'gemm_32x512x128_fp32.onnx', '256 KB', 'onnx_op_gemm_32x512x128', 'Gemm 32x512x128', 'ONNX Operator - Gemm 32x512x128 FP32'],
    ['fp16', 'float16', 'gemm_32x512x128_fp16.onnx', '161 KB', 'onnx_op_gemm_32x512x128', 'Gemm 32x512x128', 'ONNX Operator - Gemm 32x512x128 FP16'],
  ]
  return configs.map(([dt, dt_full, file, size, id, name, des]) => ({
    category: 'Operators',
    tag: 'onnx_operators',
    id: `${id}_${dt}`,
    name: `${name}`,
    description: `${des}`,
    note: '',
    source: '',
    hf: {
      model: '',
      file: ``,
    },
    model: `onnx_operators/${dt}/${file}`,
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{ 'input': [`${dt_full}`, 'random', [32, 512], {}] }],
    inputstip: `[32, 512]`
  }))
}

const onnxOperatorsGemm_1_1024 = () => {
  const configs = [
    ['fp32', 'float32', 'gemm_1x1024x512_fp32.onnx', '2.00 MB', 'onnx_op_gemm_1x1024x512', 'Gemm 1x1024x512', 'ONNX Operator - Gemm 1x1024x512 FP32'],
    ['fp16', 'float16', 'gemm_1x1024x512_fp16.onnx', '1.26MB', 'onnx_op_gemm_1x1024x512', 'Gemm 1x1024x512', 'ONNX Operator - Gemm 1x1024x512 FP16'],
  ]
  return configs.map(([dt, dt_full, file, size, id, name, des]) => ({
    category: 'Operators',
    tag: 'onnx_operators',
    id: `${id}_${dt}`,
    name: `${name}`,
    description: `${des}`,
    note: '',
    source: '',
    hf: {
      model: '',
      file: ``,
    },
    model: `onnx_operators/${dt}/${file}`,
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{ 'input': [`${dt_full}`, 'random', [1, 1024], {}] }],
    inputstip: `[1, 1024]`
  }))
}

const onnxOperatorsIdentity_1x1 = () => {
  const configs = [
    ['fp32', 'float32', 'identity_fp32.onnx', '1 KB', 'onnx_op_identity_1x1', 'Identity 1D 1x1', 'ONNX Operator - Identity 1D 1x1 FP32'],
    ['fp16', 'float16', 'identity_fp16.onnx', '1 KB', 'onnx_op_identity_1x1', 'Identity 1D 1x1', 'ONNX Operator - Identity 1D 1x1 FP16'],
  ]
  return configs.map(([dt, dt_full, file, size, id, name, des]) => ({
    category: 'Operators',
    tag: 'onnx_operators',
    id: `${id}_${dt}`,
    name: `${name}`,
    description: `${des}`,
    note: '',
    source: '',
    hf: {
      model: '',
      file: ``,
    },
    model: `onnx_operators/${dt}/${file}`,
    size: `${size}`,
    format: 'onnx',
    datatype: `${dt}`,
    inputs: [{ 'input': [`${dt_full}`, 'random', [1, 1], {}] }],
    inputstip: `[1,1]`
  }))
}

export const onnxModels = [
  {
    category: 'Model Access Check',
    tag: '',
    id: 'model_access_check',
    name: 'Model Access Check',
    description: '',
    source: '',
    model: '01.onnx'
  },
  ...adamCoddViTBaseNSFWDetector(),
  ...albertBaseV2(),
  ...briaAiRmbg2(),
  ...bartLargeCnn(),
  ...bertBaseCased(),
  ...bertBaseUncased(),
  ...bertBaseMultilingualCasedNerHrl(),
  ...bertBaseMultilingualUncasedSentiment(),
  ...BGELargeEnV1_5(),
  ...BGERerankerBase(),
  ...tinyRandomClipModelHFTFBenchmark(),
  ...clipVitBasePatch16(),
  ...codeGenMono350M(),
  ...deepSeekR1DistillQwen1_5BDemoMerged(),
  ...depthAnythingBase(),
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
  ...distilLargeV3Decoder(),
  ...distilLargeV3DecoderWithPast(),
  ...distilLargeV3DecoderMerged(),
  ...distilLargeV3Encoder(),
  ...distilMediumEnDecoder(),
  ...distilMediumEnDecoderWithPast(),
  ...distilMediumEnDecoderMerged(),
  ...distilMediumEnEncoder(),
  ...distiluseBaseMultilingualCasedV2(),
  {
    category: 'Image Classification',
    tag: '',
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
    tag: '',
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
    tag: '',
    id: 'efficientnet_lite_demo_fp16',
    name: 'EfficientNet Lite 4 Demo fp16',
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
    tag: '',
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
    tag: '',
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
  ...dPTForDepthEstimationHFTFBenchmark(),
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
    inputs: [{ 'image': ['float32', 'random', [3, 224, 224], { "height": 224, "width": 224 }] }],
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
    inputs: [{ 'image': ['float32', 'random', [3, 224, 224], { "height": 224, "width": 224 }] }],
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
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], { "batch": 1, "height": 224, "width": 224 }] }],
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
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], { "batch": 1, "height": 224, "width": 224 }] }],
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
    inputs: [{ 'image': ['float32', 'random', [3, 224, 224], { "height": 224, "width": 224 }] }],
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
    inputs: [{ 'image': ['float32', 'random', [3, 224, 224], { "height": 224, "width": 224 }] }],
    inputstip: '[3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '',
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
    tag: '',
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
    tag: '',
    id: 'mobilenet_v2_demo_fp16',
    name: 'MobileNet v2 Demo fp16',
    description: 'A computer vision model designed for training classifiers.',
    note: '',
    source: 'https://huggingface.co/onnx-community/mobilenet_v2_1.0_224-ONNX/tree/main',
    model: 'fp16/image-classification/mobilenet-v2_fp16.onnx',
    size: '7.42 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'pixel_values': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '',
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
    tag: '',
    id: 'mobilenet_v2_12_qdq_int8',
    name: 'MobileNet v2_12 QDQ (with Gather)',
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
    id: 'mobilenet_v2_12_qdq_no_gather_int8',
    name: 'MobileNet v2_12 QDQ (w/o Gather)',
    description: 'A computer vision model designed for training classifiers.',
    note: '',
    source: 'https://github.com/onnx/models/blob/main/validated/vision/classification/mobilenet/',
    model: 'int8/mobilenetv2-12-qdq-static.onnx',
    size: '3.42 MB',
    format: 'onnx',
    datatype: 'int8',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], {}] }],
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
  // {
  //   category: 'Object Detection',
  //   tag: '',
  //   id: 'isv_t_gazenet_fp32',
  //   name: 'ISV T gazeNet',
  //   description: 'End-to-end eye-movement event detection with deep neural networks',
  //   note: '',
  //   source: 'ISV T',
  //   model: 'gazenet.onnx',
  //   size: '7.42 MB',
  //   format: 'onnx',
  //   datatype: 'fp32',
  //   inputs: [{ 'image': ['float32', 'random', [1, 1, 256, 192], {}] }],
  //   inputstip: '[1, 1, 256, 192]'
  // },
  ...gteBaseEnV1_5(),
  ...gteSmall(),
  ...jinaClipV1Text(),
  ...jinaClipV1Vision(),
  ...jinaEmbeddingsV2BaseCode(),
  ...jinaRerankerV1TurboEn(),
  ...kokoro82MV1(),
  ...llama2CStories15MDecoder(),
  ...llama2CStories15MDecoderMerged(),
  ...llama2CStories15MDecoderWithPast(),
  ...llama2CStories15MHFTFBenchmark(),
  ...llavaDecoder(),
  ...llavaDecoderMerged(),
  ...llavaDecoderWithPast(),
  ...llavaEmbedTokens(),
  ...llavaVisionEncoder(),
  ...llavaPhiDecoderMerged(),
  ...llavaPhiEmbedTokens(),
  ...llavaPhiVisionEncoder(),
  ...marqoFashionSigLIPText(),
  ...marqoFashionSigLIPVision(),
  ...mediapipeSelfieSegmentation(),
  ...mediapipeSelfieSegmentationLandscape(),
  ...mobileClipS0Text(),
  ...mobileClipS0Vision(),
  ...moondream2DecoderMerged(),
  ...moondream2EmbedTokens(),
  ...moondream2VisionEncoder(),
  ...mobileNetV4(),
  ...mobileVitSmall(),
  ...modNet(),
  ...movenetMultiposeLightning(),
  ...movenetSingleposeLightning(),
  ...movenetSingleposeThunder(),
  ...msmarcoDistilbertBaseV4(),
  // {
  //   category: 'Microsoft 365',
  //   tag: '',
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
    tag: '',
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
  //   tag: '',
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
  //   tag: '',
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
  //   tag: '',
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
  //   tag: '',
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
  //   tag: '',
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
  //   tag: '',
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
  //   tag: '',
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
  //   tag: '',
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
  //   tag: '',
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
  //   tag: '',
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
    tag: '',
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
      'raw_timings': ['float32', 'random', [1, 20], { "?": 1 }],
      'raw_tcids': ['int64', 1n, [1, 20], { "?": 1 }],
      'raw_contexts': ['int64', 1n, [1], { "?": 1 }],
      'raw_explicits': ['int64', 1n, [1], { "?": 1 }],
    }],
    inputstip: '[1, 20] [1, 20] [1] [1]'
  },
  {
    category: 'Microsoft 365',
    tag: '',
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
  //   tag: '',
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
  //   tag: '',
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
  ...onnxOperatorsAdd2Inputs(),
  ...onnxOperatorsAddConstant(),
  ...onnxOperatorsConv(),
  ...onnxOperatorsMatMul2D(),
  ...onnxOperatorsMatMul3D(),
  ...onnxOperatorsGemm_32_512(),
  ...onnxOperatorsGemm_1_1024(),
  ...onnxOperatorsIdentity_1x1(),
  ...paraphraseMultilingualMpnetBaseV2(),
  ...phi3Mini4kInstructDemoMerged(),
  ...phi35MiniInstructMerged(),
  ...phi3Mini4kInstructMerged(),
  ...qwen2_0_5bInstructDemoMerged(),
  ...Qwen2_0_5bInstructMerged(),
  ...Qwen2VLForConditionalGenerationEmbedding(),
  ...Qwen2VLForConditionalGenerationTextDecoder(),
  ...Qwen2VLForConditionalGenerationVisionEncoder(),
  {
    category: 'Image Classification',
    tag: '',
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
    tag: '',
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
    tag: '',
    id: 'resnet50_demo_fp16',
    name: 'ResNet50 Demo fp16',
    description: 'A convolutional neural network that is 50 layers deep.',
    note: '',
    source: 'https://huggingface.co/Xenova/resnet-50/',
    model: 'fp16/image-classification/resnet-50_fp16.onnx',
    size: '48.7 MB',
    format: 'onnx',
    datatype: 'fp16',
    inputs: [{ 'pixel_values': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1, "num_channels": 3, "height": 224, " width": 224 }] }],
    inputstip: '[1, 3, 224, 224]'
  },
  {
    category: 'Image Classification',
    tag: '',
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
    tag: '',
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
    tag: '',
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
    tag: '',
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
    tag: '',
    id: 'sd_turbo_text_encoder_layernorm_demo_fp16',
    name: 'SD-Turbo Text Encoder (layernorm) Demo fp16',
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
    tag: '',
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
    tag: '',
    id: 'sd_turbo_unet_layernorm_demo_fp16',
    name: 'SD-Turbo UNet (layernorm) Demo fp16',
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
    tag: '',
    id: 'sd_safety_checker_demo_fp16',
    name: 'SD Safety Checker Demo fp16',
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
    tag: 'pv',
    id: 'sd_1_5_text_encoder_demo_fp16',
    name: 'SD 1.5 text Encoder Demo fp16',
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
    tag: 'pv',
    id: 'sd_1_5_unet_demo_fp16',
    name: 'SD 1.5 UNet (layernorm) Demo fp16',
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
    tag: 'pv',
    id: 'sd_vae_decoder_demo_fp16',
    name: 'SD (1.5 + Turbo) VAE Decoder Demo fp16',
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
    tag: '',
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
    tag: '',
    id: 'segment_anything_decoder_demo_fp16',
    name: 'Segment Anything Decoder Demo fp16',
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
    tag: '',
    id: 'segment_anything_encoder_demo_fp16',
    name: 'Segment Anything Encoder Demo fp16',
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
    id: 'isv_z_proxy_fp32',
    name: 'ISV Z Proxy',
    description: '',
    note: '',
    source: '',
    model: 'isv_z_proxy.onnx',
    size: '13.3 MB',
    format: 'onnx',
    datatype: 'fp32',
    inputs: [{ 'input': ['float32', 'random', [1, 3, 224, 224], { "batch_size": 1 }] }],
    inputstip: '[1, 3, 224, 224]'
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
  ...slimSAM77UniformVisionEncoder(),
  ...slimSAM77UniformPromptEncoderMaskDecoder(),
  ...SnowflakeArcticEmbedM(),
  ...snowflakeArcticEmbedXs(),
  ...squeezebertUncased(),
  {
    category: 'Image Classification',
    tag: '',
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
    tag: '',
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
    tag: '',
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
    inputs: [{ 'inputs': ['float32', 'random', [1, 224, 224, 3], { "unk__6578": 1, "unk__6579": 224, "unk__6580": 224 }] }],
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
    tag: '',
    name: 'Swim Small',
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
  ...t5SmallEncoderHFTFBenchmark(),
  ...t5SmallDecoderMergedHFTFBenchmark(),
  ...tinyLlama_1_1B_ChatV1_0DemoMerged(),
  ...tinyLlamaV0Decoder(),
  ...tinyLlamaV0DecoderMerged(),
  ...tinyLlamaV0DecoderWithPast(),
  ...tinyLlama1_1BChatv1_0Merged(),
  ...tinyLlama1_1BChatv1_0Merged_2(),
  ...tinyClapHtsatUnfusedHFTFBenchmark(),
  ...tinyRandomGroupViTModelHFTFBenchmark(),
  ...tinyRandomOwlViTHFTFBenchmark(),
  ...tinyRandomBertModelHFTFBenchmark(),
  ...tinyRandomBertForQuestionAnsweringHFTFBenchmark(),
  ...tinyRandomBertForSequenceClassificationHFTFBenchmark(),
  ...tinyRandomBertForTokenClassificationHFTFBenchmark(),
  ...tinyRandomBertForMaskedLMHFTFBenchmark(),
  ...tinyRandomLlamaForCausalLMHFTFBenchmark(),
  ...tinyRandomMoonshineForConditionalGenerationEncoderHFTFBenchmark(),
  ...tinyRandomMoonshineForConditionalGenerationDecoderMergedHFTFBenchmark(),
  ...tinyRandomM2M100ForConditionalGenerationEncoderT2THFTFBenchmark(),
  ...tinyRandomM2M100ForConditionalGenerationDecoderT2TMergedHFTFBenchmark(),
  ...tinyRandomSwin2SRForImageSuperResolutionHFTFBenchmark(),
  ...tinyRandomT5ForConditionalGenerationEncoderHFTFBenchmark(),
  ...tinyRandomT5ForConditionalGenerationDecoderMergedHFTFBenchmark(),
  ...tinyRandomT5ForConditionalGenerationEncoderT2THFTFBenchmark(),
  ...tinyRandomT5ForConditionalGenerationDecoderT2TMergedHFTFBenchmark(),
  ...tinyRandomUnispeechHFTFBenchmark(),
  ...tinyRandomVisionEncoderDecoderModelViTGPTEncoderHFTFBenchmark(),
  ...tinyRandomVisionEncoderDecoderModelViTGPTDecoderMergedHFTFBenchmark(),
  ...tinyRandomVisionEncoderDecoderModelViTGPT2EncoderHFTFBenchmark(),
  ...tinyRandomVisionEncoderDecoderModelViTGPT2DecoderMergedHFTFBenchmark(),
  ...tinyRandomViTHFTFBenchmark(),
  ...tinyRandomViTMAEModelHFTFBenchmark(),
  ...tinyRandomViTsHFTFBenchmark(),
  ...tinyRandomYolosForObjectDetectionHFTFBenchmark(),
  // ...metaLlama_3_8bInstructMerged(),
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
    tag: '',
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
    tag: '',
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
      'x': ['float32', 'random', [1, 39, 80], { "N": 1 }],
      'cached_val_4': ['float32', 'random', [4, 32, 1, 96], {}],
      'cached_val_3': ['float32', 'random', [2, 8, 1, 96], {}],
      'cached_val_2': ['float32', 'random', [3, 16, 1, 96], {}],
      'cached_val_1': ['float32', 'random', [4, 32, 1, 96], {}],
      'cached_val_0': ['float32', 'random', [2, 64, 1, 96], {}],
      'cached_val2_4': ['float32', 'random', [4, 32, 1, 96], {}],
      'cached_val2_3': ['float32', 'random', [2, 8, 1, 96], {}],
      'cached_val2_2': ['float32', 'random', [3, 16, 1, 96], {}],
      'cached_val2_1': ['float32', 'random', [4, 32, 1, 96], {}],
      'cached_val2_0': ['float32', 'random', [2, 64, 1, 96], {}],
      'cached_len_4': ['int64', 1n, [4, 1], {}],
      'cached_len_3': ['int64', 1n, [2, 1], {}],
      'cached_len_2': ['int64', 1n, [3, 1], {}],
      'cached_len_1': ['int64', 1n, [4, 1], {}],
      'cached_len_0': ['int64', 1n, [2, 1], {}],
      'cached_key_4': ['float32', 'random', [4, 32, 1, 192], {}],
      'cached_key_3': ['float32', 'random', [2, 8, 1, 192], {}],
      'cached_key_2': ['float32', 'random', [3, 16, 1, 192], {}],
      'cached_key_1': ['float32', 'random', [4, 32, 1, 192], {}],
      'cached_key_0': ['float32', 'random', [2, 64, 1, 192], {}],
      'cached_conv2_4': ['float32', 'random', [4, 1, 384, 30], {}],
      'cached_conv2_3': ['float32', 'random', [2, 1, 384, 30], {}],
      'cached_conv2_2': ['float32', 'random', [3, 1, 384, 30], {}],
      'cached_conv2_1': ['float32', 'random', [4, 1, 384, 30], {}],
      'cached_conv2_0': ['float32', 'random', [2, 1, 384, 30], {}],
      'cached_conv1_4': ['float32', 'random', [4, 1, 384, 30], {}],
      'cached_conv1_3': ['float32', 'random', [2, 1, 384, 30], {}],
      'cached_conv1_2': ['float32', 'random', [3, 1, 384, 30], {}],
      'cached_conv1_1': ['float32', 'random', [4, 1, 384, 30], {}],
      'cached_conv1_0': ['float32', 'random', [2, 1, 384, 30], {}],
      'cached_avg_4': ['float32', 'random', [4, 1, 384], {}],
      'cached_avg_3': ['float32', 'random', [2, 1, 384], {}],
      'cached_avg_2': ['float32', 'random', [3, 1, 384], {}],
      'cached_avg_1': ['float32', 'random', [4, 1, 384], {}],
      'cached_avg_0': ['float32', 'random', [2, 1, 384], {}]
    }],
    inputstip: '[1, 39, 80]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '',
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
      'x_lens': ['int64', 1n, [1], { "N": 1 }],
      'x': ['float32', 'random', [1, 45, 80], {}],
      'processed_lens': ['int64', 1n, [1], {}],
      'embed_states': ['float32', 'random', [1, 128, 3, 19], {}],
      'cached_val2_9': ['float32', 'random', [16, 1, 96], {}],
      'cached_val2_8': ['float32', 'random', [16, 1, 96], {}],
      'cached_val2_7': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_6': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_5': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_4': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_3': ['float32', 'random', [64, 1, 48], {}],
      'cached_val2_2': ['float32', 'random', [64, 1, 48], {}],
      'cached_val2_18': ['float32', 'random', [64, 1, 48], {}],
      'cached_val2_17': ['float32', 'random', [64, 1, 48], {}],
      'cached_val2_16': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_15': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_14': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_13': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_12': ['float32', 'random', [16, 1, 96], {}],
      'cached_val2_11': ['float32', 'random', [16, 1, 96], {}],
      'cached_val2_10': ['float32', 'random', [16, 1, 96], {}],
      'cached_val2_1': ['float32', 'random', [128, 1, 48], {}],
      'cached_val2_0': ['float32', 'random', [128, 1, 48], {}],
      'cached_val1_9': ['float32', 'random', [16, 1, 96], {}],
      'cached_val1_8': ['float32', 'random', [16, 1, 96], {}],
      'cached_val1_7': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_6': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_5': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_4': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_3': ['float32', 'random', [64, 1, 48], {}],
      'cached_val1_2': ['float32', 'random', [64, 1, 48], {}],
      'cached_val1_18': ['float32', 'random', [64, 1, 48], {}],
      'cached_val1_17': ['float32', 'random', [64, 1, 48], {}],
      'cached_val1_16': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_15': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_14': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_13': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_12': ['float32', 'random', [16, 1, 96], {}],
      'cached_val1_11': ['float32', 'random', [16, 1, 96], {}],
      'cached_val1_10': ['float32', 'random', [16, 1, 96], {}],
      'cached_val1_1': ['float32', 'random', [128, 1, 48], {}],
      'cached_val1_0': ['float32', 'random', [128, 1, 48], {}],
      'cached_nonlin_attn_18': ['float32', 'random', [1, 1, 64, 192], {}],
      'cached_nonlin_attn_17': ['float32', 'random', [1, 1, 64, 192], {}],
      'cached_nonlin_attn_16': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_15': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_14': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_13': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_12': ['float32', 'random', [1, 1, 16, 576], {}],
      'cached_nonlin_attn_11': ['float32', 'random', [1, 1, 16, 576], {}],
      'cached_nonlin_attn_10': ['float32', 'random', [1, 1, 16, 576], {}],
      'cached_nonlin_attn_9': ['float32', 'random', [1, 1, 16, 576], {}],
      'cached_nonlin_attn_8': ['float32', 'random', [1, 1, 16, 576], {}],
      'cached_nonlin_attn_7': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_6': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_5': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_4': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_3': ['float32', 'random', [1, 1, 64, 192], {}],
      'cached_nonlin_attn_2': ['float32', 'random', [1, 1, 64, 192], {}],
      'cached_nonlin_attn_1': ['float32', 'random', [1, 1, 128, 144], {}],
      'cached_nonlin_attn_0': ['float32', 'random', [1, 1, 128, 144], {}],
      'cached_key_18': ['float32', 'random', [64, 1, 128], {}],
      'cached_key_17': ['float32', 'random', [64, 1, 128], {}],
      'cached_key_16': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_15': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_14': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_13': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_12': ['float32', 'random', [16, 1, 256], {}],
      'cached_key_11': ['float32', 'random', [16, 1, 256], {}],
      'cached_key_10': ['float32', 'random', [16, 1, 256], {}],
      'cached_key_9': ['float32', 'random', [16, 1, 256], {}],
      'cached_key_8': ['float32', 'random', [16, 1, 256], {}],
      'cached_key_7': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_6': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_5': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_4': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_3': ['float32', 'random', [64, 1, 128], {}],
      'cached_key_2': ['float32', 'random', [64, 1, 128], {}],
      'cached_key_1': ['float32', 'random', [128, 1, 128], {}],
      'cached_key_0': ['float32', 'random', [128, 1, 128], {}],
      'cached_conv2_9': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv2_8': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv2_7': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_6': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_5': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_4': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_3': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv2_2': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv2_18': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv2_17': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv2_16': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_15': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_14': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_13': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_12': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv2_11': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv2_10': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv2_1': ['float32', 'random', [1, 192, 15], {}],
      'cached_conv2_0': ['float32', 'random', [1, 192, 15], {}],
      'cached_conv1_9': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv1_8': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv1_7': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_6': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_5': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_4': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_3': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv1_2': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv1_18': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv1_17': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv1_16': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_15': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_14': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_13': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_12': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv1_11': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv1_10': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv1_1': ['float32', 'random', [1, 192, 15], {}],
      'cached_conv1_0': ['float32', 'random', [1, 192, 15], {}],
    }],
    inputstip: '[1, 45, 80] [1] [1 [1, 128, 3, 19]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '',
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
      'x': ['float32', 'random', [1, 45, 80], {}],
      'processed_lens': ['int64', 1n, [1], {}],
      'embed_states': ['float32', 'random', [1, 128, 3, 19], {}],
      'cached_val2_9': ['float32', 'random', [16, 1, 96], {}],
      'cached_val2_8': ['float32', 'random', [16, 1, 96], {}],
      'cached_val2_7': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_6': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_5': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_4': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_3': ['float32', 'random', [64, 1, 48], {}],
      'cached_val2_2': ['float32', 'random', [64, 1, 48], {}],
      'cached_val2_18': ['float32', 'random', [64, 1, 48], {}],
      'cached_val2_17': ['float32', 'random', [64, 1, 48], {}],
      'cached_val2_16': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_15': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_14': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_13': ['float32', 'random', [32, 1, 48], {}],
      'cached_val2_12': ['float32', 'random', [16, 1, 96], {}],
      'cached_val2_11': ['float32', 'random', [16, 1, 96], {}],
      'cached_val2_10': ['float32', 'random', [16, 1, 96], {}],
      'cached_val2_1': ['float32', 'random', [128, 1, 48], {}],
      'cached_val2_0': ['float32', 'random', [128, 1, 48], {}],
      'cached_val1_9': ['float32', 'random', [16, 1, 96], {}],
      'cached_val1_8': ['float32', 'random', [16, 1, 96], {}],
      'cached_val1_7': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_6': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_5': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_4': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_3': ['float32', 'random', [64, 1, 48], {}],
      'cached_val1_2': ['float32', 'random', [64, 1, 48], {}],
      'cached_val1_18': ['float32', 'random', [64, 1, 48], {}],
      'cached_val1_17': ['float32', 'random', [64, 1, 48], {}],
      'cached_val1_16': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_15': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_14': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_13': ['float32', 'random', [32, 1, 48], {}],
      'cached_val1_12': ['float32', 'random', [16, 1, 96], {}],
      'cached_val1_11': ['float32', 'random', [16, 1, 96], {}],
      'cached_val1_10': ['float32', 'random', [16, 1, 96], {}],
      'cached_val1_1': ['float32', 'random', [128, 1, 48], {}],
      'cached_val1_0': ['float32', 'random', [128, 1, 48], {}],
      'cached_nonlin_attn_18': ['float32', 'random', [1, 1, 64, 192], {}],
      'cached_nonlin_attn_17': ['float32', 'random', [1, 1, 64, 192], {}],
      'cached_nonlin_attn_16': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_15': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_14': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_13': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_12': ['float32', 'random', [1, 1, 16, 576], {}],
      'cached_nonlin_attn_11': ['float32', 'random', [1, 1, 16, 576], {}],
      'cached_nonlin_attn_10': ['float32', 'random', [1, 1, 16, 576], {}],
      'cached_nonlin_attn_9': ['float32', 'random', [1, 1, 16, 576], {}],
      'cached_nonlin_attn_8': ['float32', 'random', [1, 1, 16, 576], {}],
      'cached_nonlin_attn_7': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_6': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_5': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_4': ['float32', 'random', [1, 1, 32, 384], {}],
      'cached_nonlin_attn_3': ['float32', 'random', [1, 1, 64, 192], {}],
      'cached_nonlin_attn_2': ['float32', 'random', [1, 1, 64, 192], {}],
      'cached_nonlin_attn_1': ['float32', 'random', [1, 1, 128, 144], {}],
      'cached_nonlin_attn_0': ['float32', 'random', [1, 1, 128, 144], {}],
      'cached_key_18': ['float32', 'random', [64, 1, 128], {}],
      'cached_key_17': ['float32', 'random', [64, 1, 128], {}],
      'cached_key_16': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_15': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_14': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_13': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_12': ['float32', 'random', [16, 1, 256], {}],
      'cached_key_11': ['float32', 'random', [16, 1, 256], {}],
      'cached_key_10': ['float32', 'random', [16, 1, 256], {}],
      'cached_key_9': ['float32', 'random', [16, 1, 256], {}],
      'cached_key_8': ['float32', 'random', [16, 1, 256], {}],
      'cached_key_7': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_6': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_5': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_4': ['float32', 'random', [32, 1, 128], {}],
      'cached_key_3': ['float32', 'random', [64, 1, 128], {}],
      'cached_key_2': ['float32', 'random', [64, 1, 128], {}],
      'cached_key_1': ['float32', 'random', [128, 1, 128], {}],
      'cached_key_0': ['float32', 'random', [128, 1, 128], {}],
      'cached_conv2_9': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv2_8': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv2_7': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_6': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_5': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_4': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_3': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv2_2': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv2_18': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv2_17': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv2_16': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_15': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_14': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_13': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv2_12': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv2_11': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv2_10': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv2_1': ['float32', 'random', [1, 192, 15], {}],
      'cached_conv2_0': ['float32', 'random', [1, 192, 15], {}],
      'cached_conv1_9': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv1_8': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv1_7': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_6': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_5': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_4': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_3': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv1_2': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv1_18': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv1_17': ['float32', 'random', [1, 256, 15], {}],
      'cached_conv1_16': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_15': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_14': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_13': ['float32', 'random', [1, 512, 7], {}],
      'cached_conv1_12': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv1_11': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv1_10': ['float32', 'random', [1, 768, 7], {}],
      'cached_conv1_1': ['float32', 'random', [1, 192, 15], {}],
      'cached_conv1_0': ['float32', 'random', [1, 192, 15], {}],
    }],
    inputstip: '[1, 45, 80] [1] [1] [1, 128, 3, 19]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: '',
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
    tag: '',
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
    tag: '',
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
    tag: '',
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
  ...whisperTinyEnEncoderHFTFBenchmark(),
  ...whisperTinyEnDecoderMergedHFTFBenchmark(),
  {
    category: 'Automatic Speech Recognition',
    tag: '',
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
    tag: '',
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
    tag: '',
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
    tag: '',
    id: 'whisper_base_decoder_static_gelu_4dmask_demo_merged_fp16',
    name: 'Whisper Base Decoder Static Shape KV-Cache Demo fp16',
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
    tag: '',
    id: 'whisper_base_decoder_static_gelu_4dmask_mltensor_demo_merged_fp16',
    name: 'Whisper Base Decoder Static Shape KV-Cache MLTensor Demo GPU fp16',
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
    tag: '',
    id: 'whisper_base_decoder_static_gelu_4dmask_demo_fp16',
    name: 'Whisper Base Decoder Static Shape Non-KV-Cache Demo fp16',
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
    tag: '',
    id: 'whisper_base_decoder_static_gelu_4dmask_mltensor_demo_fp16',
    name: 'Whisper Base Decoder Static Shape Non-KV-Cache MLTensor Demo GPU fp16',
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
    tag: '',
    id: 'whisper_base_encoder_gelu_demo_fp16',
    name: 'Whisper Base Encoder Demo fp16',
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
  {
    category: 'Automatic Speech Recognition',
    tag: 'pv',
    id: 'whisper_small_encoder_fp16',
    name: 'Whisper Small Encoder',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation.',
    note: '',
    source: '',
    hf: {
      model: '',
      file: '',
    },
    model: 'fp16/whisper-small/whisper_small_encoder.onnx',
    size: `168MB`,
    format: 'onnx',
    datatype: `fp16`,
    inputs: [{
      'input_features': ['float16', 'random', [1, 80, 3000], {}],
    }],
    inputstip: '[1, 80, 3000]'
  },
  {
    category: 'Automatic Speech Recognition',
    tag: 'pv',
    id: 'whisper_small_decoder_static_fp16',
    name: 'Whisper Small Decoder Static Shape Non-KV-Cache',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation.',
    note: '',
    source: '',
    hf: {
      model: '',
      file: '',
    },
    model: 'fp16/whisper-small/whisper_small_decoder_static_non_kvcache_lm.onnx',
    size: `292MB`,
    format: 'onnx',
    datatype: `fp16`,
    inputs: [{
      'input_ids': ['int32', 1, [1, 4], {}],
      'attention_mask': ['float16', 'random', [1, 4], {}],
      'encoder_hidden_states': ['float16', 'random', [1, 1500, 768], {}]
    }],
    inputstip: '[1, 4] [1, 4] [1, 1500, 768]'
  }
  ,
  {
    category: 'Automatic Speech Recognition',
    tag: 'pv',
    id: 'whisper_small_decoder_static_merged_fp16',
    name: 'Whisper Small Decoder Static Shape KV-Cache',
    description: 'A pre-trained model for automatic speech recognition (ASR) and speech translation.',
    note: '',
    source: '',
    hf: {
      model: '',
      file: '',
    },
    model: 'fp16/whisper-small/whisper_small_decoder_static_kvcache_128_lm.onnx',
    size: `266MB`,
    format: 'onnx',
    datatype: `fp16`,
    inputs: [{
      'input_ids': ['int32', 1, [1, 1], {}],
      'attention_mask': ['float16', 'random', [1, 128], {}],
      'position_ids': ['int32', 1, [1], {}]
    }],
    inputstip: '[1, 1] [1, 128] [1]'
  },
  ...xlmRobertaBase(),
  ...yoloV8M(),
  ...yoloV8N(),
  ...yoloV8NPose(),
  ...yoloV8XPose(),
  ...yoloV10N(),
  ...yolo11N(),
  ...yolo12N(),
];