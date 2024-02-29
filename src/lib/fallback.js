export const fallbackEnv = {
  "windows": 'Windows 11 23H2 22631.3007',
  "version": '123.0.6283.0',
  'last_update': 'Feb 06, 2024'
}
export const fallback = [
  {
    "name": "albert_base_v2",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 140,
    "nodes_in_the_graph": 677,
    "nodes_supported_by_webnn": 534,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "albert_base_v2",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 677,
    "nodes_supported_by_webnn": 677,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "bart_large_cnn",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 136,
    "nodes_in_the_graph": 703,
    "nodes_supported_by_webnn": 562,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "bart_large_cnn",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 703,
    "nodes_supported_by_webnn": 703,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "bert_base_cased",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 139,
    "nodes_in_the_graph": 636,
    "nodes_supported_by_webnn": 494,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Gather",
      "MatMul",
      "Pow",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "bert_base_cased",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 636,
    "nodes_supported_by_webnn": 636,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "bert_base_multilingual_cased_ner_hrl",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 136,
    "nodes_in_the_graph": 620,
    "nodes_supported_by_webnn": 481,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Gather",
      "MatMul",
      "Pow",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "bert_base_multilingual_cased_ner_hrl",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 620,
    "nodes_supported_by_webnn": 620,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "bert_base_multilingual_uncased_sentiment",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 136,
    "nodes_in_the_graph": 622,
    "nodes_supported_by_webnn": 483,
    "supported": [
      "Add",
      "Div",
      "Gemm",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Gather",
      "MatMul",
      "Pow",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "bert_base_multilingual_uncased_sentiment",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 622,
    "nodes_supported_by_webnn": 622,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Gather",
      "Gemm",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "bert_base_uncased",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 139,
    "nodes_in_the_graph": 636,
    "nodes_supported_by_webnn": 494,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Gather",
      "MatMul",
      "Pow",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "bert_base_uncased",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 636,
    "nodes_supported_by_webnn": 636,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "clip_vit_base_patch16",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 254,
    "nodes_in_the_graph": 1387,
    "nodes_supported_by_webnn": 1123,
    "supported": [
      "Abs",
      "Add",
      "Concat",
      "Conv",
      "Div",
      "Flatten",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Sigmoid",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "ArgMax",
      "Cast",
      "Expand",
      "Gather",
      "MatMul",
      "Pow",
      "ReduceSum",
      "Reshape",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "clip_vit_base_patch16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1385,
    "nodes_supported_by_webnn": 1385,
    "supported": [
      "Abs",
      "Add",
      "ArgMax",
      "Cast",
      "Concat",
      "Conv",
      "Div",
      "Expand",
      "Flatten",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "ReduceSum",
      "Reshape",
      "Sigmoid",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "codegen_350m_mono",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 263,
    "nodes_in_the_graph": 1441,
    "nodes_supported_by_webnn": 1172,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "Neg",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Slice",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "codegen_350m_mono",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 81,
    "nodes_in_the_graph": 1441,
    "nodes_supported_by_webnn": 1361,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Neg",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "not_supported": [
      "Slice"
    ]
  },
  {
    "name": "deeplab_v3",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 108,
    "nodes_supported_by_webnn": 107,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Concat",
      "Conv",
      "Relu",
      "Resize"
    ],
    "not_supported": [
      "ArgMax"
    ]
  },
  {
    "name": "deeplab_v3",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 109,
    "nodes_supported_by_webnn": 109,
    "supported": [
      "Add",
      "ArgMax",
      "AveragePool",
      "Clip",
      "Concat",
      "Conv",
      "Relu",
      "Resize",
      "Transpose"
    ]
  },
  {
    "name": "densenet",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 63,
    "nodes_in_the_graph": 617,
    "nodes_supported_by_webnn": 555,
    "supported": [
      "Add",
      "AveragePool",
      "Concat",
      "Conv",
      "GlobalAveragePool",
      "MaxPool",
      "Mul",
      "Relu",
      "Transpose"
    ],
    "not_supported": [
      "BatchNormalization"
    ]
  },
  {
    "name": "densenet",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 491,
    "nodes_supported_by_webnn": 491,
    "supported": [
      "Add",
      "AveragePool",
      "BatchNormalization",
      "Concat",
      "Conv",
      "GlobalAveragePool",
      "MaxPool",
      "Mul",
      "Relu"
    ]
  },
  {
    "name": "detr_resnet_50",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 169,
    "nodes_in_the_graph": 1049,
    "nodes_supported_by_webnn": 863,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "Div",
      "MaxPool",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Sigmoid",
      "Slice",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "Cos",
      "CumSum",
      "Expand",
      "Flatten",
      "Gather",
      "MatMul",
      "Pow",
      "Resize",
      "Sin",
      "Slice",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Flatten: BOOL",
      "Unsqueeze: BOOL",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "detr_resnet_50",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 7,
    "nodes_in_the_graph": 1017,
    "nodes_supported_by_webnn": 1011,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Conv",
      "Cos",
      "Div",
      "Expand",
      "Flatten",
      "Gather",
      "MatMul",
      "MaxPool",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Sin",
      "Slice",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "not_supported": [
      "CumSum",
      "Slice"
    ]
  },
  {
    "name": "dino_vitb16",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 134,
    "nodes_in_the_graph": 604,
    "nodes_supported_by_webnn": 471,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Erf",
      "MatMul",
      "Pow"
    ]
  },
  {
    "name": "dino_vitb16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 602,
    "nodes_supported_by_webnn": 602,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "Div",
      "Erf",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ]
  },
  {
    "name": "distil_medium_en_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 38,
    "nodes_in_the_graph": 191,
    "nodes_supported_by_webnn": 151,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Erf",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "distil_medium_en_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 191,
    "nodes_supported_by_webnn": 191,
    "supported": [
      "Add",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ]
  },
  {
    "name": "distil_medium_en_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 269,
    "nodes_in_the_graph": 1391,
    "nodes_supported_by_webnn": 1122,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Conv",
      "Erf",
      "MatMul",
      "Pow"
    ]
  },
  {
    "name": "distil_medium_en_encoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 1295,
    "nodes_supported_by_webnn": 1293,
    "supported": [
      "Add",
      "Div",
      "Erf",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Conv"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 113,
    "nodes_in_the_graph": 590,
    "nodes_supported_by_webnn": 473,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Pow",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 590,
    "nodes_supported_by_webnn": 590,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_decoder_merged",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 102,
    "nodes_in_the_graph": 536,
    "nodes_supported_by_webnn": 431,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Expand",
      "Gather",
      "If",
      "MatMul",
      "Pow",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_decoder_merged",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 536,
    "nodes_supported_by_webnn": 536,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "not_supported": [
      "If"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_decoder_with_past",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 102,
    "nodes_in_the_graph": 535,
    "nodes_supported_by_webnn": 431,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Gather",
      "MatMul",
      "Pow",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_decoder_with_past",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 535,
    "nodes_supported_by_webnn": 535,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 70,
    "nodes_in_the_graph": 361,
    "nodes_supported_by_webnn": 286,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_encoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 361,
    "nodes_supported_by_webnn": 361,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "distilbert_base_cased_distilled_squad",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 70,
    "nodes_in_the_graph": 319,
    "nodes_supported_by_webnn": 240,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Squeeze",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Split",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: BOOL"
    ]
  },
  {
    "name": "distilbert_base_cased_distilled_squad",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 319,
    "nodes_supported_by_webnn": 318,
    "supported": [
      "Add",
      "Div",
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Squeeze",
      "Sub",
      "Transpose",
      "Where"
    ],
    "not_supported": [
      "Split"
    ]
  },
  {
    "name": "distilbert_base_uncased",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 72,
    "nodes_in_the_graph": 332,
    "nodes_supported_by_webnn": 251,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: BOOL"
    ]
  },
  {
    "name": "distilbert_base_uncased",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 332,
    "nodes_supported_by_webnn": 332,
    "supported": [
      "Add",
      "Div",
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Where"
    ]
  },
  {
    "name": "distilbert_base_uncased_mnli",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 69,
    "nodes_in_the_graph": 318,
    "nodes_supported_by_webnn": 240,
    "supported": [
      "Add",
      "Div",
      "Gemm",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: BOOL"
    ]
  },
  {
    "name": "distilbert_base_uncased_mnli",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 318,
    "nodes_supported_by_webnn": 318,
    "supported": [
      "Add",
      "Div",
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "Gemm",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Where"
    ]
  },
  {
    "name": "distilgpt2_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 39,
    "nodes_in_the_graph": 356,
    "nodes_supported_by_webnn": 312,
    "supported": [
      "Add",
      "Div",
      "Gemm",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "distilgpt2_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 356,
    "nodes_supported_by_webnn": 356,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Gather",
      "Gemm",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "distilgpt2_decoder_merged",
    "backend": "cpu"
  },
  {
    "name": "distilgpt2_decoder_merged",
    "backend": "gpu"
  },
  {
    "name": "distilgpt2_decoder_with_past",
    "backend": "cpu"
  },
  {
    "name": "distilgpt2_decoder_with_past",
    "backend": "gpu"
  },
  {
    "name": "efficientnet_lite",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 179,
    "nodes_supported_by_webnn": 179,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Conv",
      "Gemm",
      "Softmax",
      "Squeeze"
    ]
  },
  {
    "name": "efficientnet_lite",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 180,
    "nodes_supported_by_webnn": 180,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Conv",
      "Gemm",
      "Softmax",
      "Squeeze",
      "Transpose"
    ]
  },
  {
    "name": "emotion_ferplus",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 34,
    "nodes_supported_by_webnn": 34,
    "supported": [
      "Conv",
      "Div",
      "Gemm",
      "MaxPool",
      "Relu",
      "Reshape",
      "Sub",
      "Transpose"
    ]
  },
  {
    "name": "emotion_ferplus",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 32,
    "nodes_supported_by_webnn": 32,
    "supported": [
      "Conv",
      "Div",
      "Gemm",
      "MaxPool",
      "Relu",
      "Reshape",
      "Sub"
    ]
  },
  {
    "name": "flan_t5_small_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 139,
    "nodes_in_the_graph": 551,
    "nodes_supported_by_webnn": 392,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "flan_t5_small_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 551,
    "nodes_supported_by_webnn": 551,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "flan_t5_small_decoder_merged",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 123,
    "nodes_in_the_graph": 527,
    "nodes_supported_by_webnn": 384,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "If",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "flan_t5_small_decoder_merged",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 527,
    "nodes_supported_by_webnn": 527,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "If"
    ]
  },
  {
    "name": "flan_t5_small_decoder_with_past",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 123,
    "nodes_in_the_graph": 519,
    "nodes_supported_by_webnn": 376,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "flan_t5_small_decoder_with_past",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 527,
    "nodes_supported_by_webnn": 527,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "flan_t5_small_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 82,
    "nodes_in_the_graph": 350,
    "nodes_supported_by_webnn": 248,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "flan_t5_small_encoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 350,
    "nodes_supported_by_webnn": 350,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "gpt2_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 75,
    "nodes_in_the_graph": 692,
    "nodes_supported_by_webnn": 612,
    "supported": [
      "Add",
      "Div",
      "Gemm",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "gpt2_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 692,
    "nodes_supported_by_webnn": 692,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Gather",
      "Gemm",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "gpt2_decoder_merged",
    "backend": "cpu"
  },
  {
    "name": "gpt2_decoder_merged",
    "backend": "gpu"
  },
  {
    "name": "gpt2_decoder_with_past",
    "backend": "cpu"
  },
  {
    "name": "gpt2_decoder_with_past",
    "backend": "gpu"
  },
  {
    "name": "m2m100_decoder",
    "backend": "cpu",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  {
    "name": "m2m100_decoder",
    "backend": "gpu",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  {
    "name": "m2m100_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 125,
    "nodes_in_the_graph": 666,
    "nodes_supported_by_webnn": 528,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Add",
      "Cast",
      "CumSum",
      "Equal",
      "Expand",
      "Gather",
      "MatMul",
      "Mul",
      "Not",
      "Pow",
      "Reshape",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Add: INT64",
      "Mul: INT32",
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "m2m100_encoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 666,
    "nodes_supported_by_webnn": 665,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Equal",
      "Expand",
      "Gather",
      "MatMul",
      "Mul",
      "Not",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "not_supported": [
      "CumSum"
    ]
  },
  {
    "name": "mobilenet_v2",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 102,
    "nodes_supported_by_webnn": 102,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "Gemm",
      "GlobalAveragePool",
      "Reshape",
      "Transpose"
    ]
  },
  {
    "name": "mobilenet_v2",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 100,
    "nodes_supported_by_webnn": 100,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "Gemm",
      "GlobalAveragePool",
      "Reshape"
    ]
  },
  {
    "name": "mobilenet_v2_12",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 102,
    "nodes_supported_by_webnn": 102,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "Gemm",
      "GlobalAveragePool",
      "Reshape",
      "Transpose"
    ]
  },
  {
    "name": "mobilenet_v2_12",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 100,
    "nodes_supported_by_webnn": 100,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "Gemm",
      "GlobalAveragePool",
      "Reshape"
    ]
  },
  {
    "name": "mobilenet_v3",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 10,
    "nodes_in_the_graph": 124,
    "nodes_supported_by_webnn": 115,
    "supported": [
      "Add",
      "Conv",
      "Flatten",
      "Gemm",
      "GlobalAveragePool",
      "HardSigmoid",
      "HardSwish",
      "Mul",
      "ReduceMean",
      "Relu",
      "Transpose"
    ],
    "not_supported": [
      "HardSigmoid"
    ]
  },
  {
    "name": "mobilenet_v3",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 122,
    "nodes_supported_by_webnn": 122,
    "supported": [
      "Add",
      "Conv",
      "Flatten",
      "Gemm",
      "GlobalAveragePool",
      "HardSigmoid",
      "HardSwish",
      "Mul",
      "ReduceMean",
      "Relu"
    ]
  },
  {
    "name": "mobilevit_small",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 94,
    "nodes_in_the_graph": 570,
    "nodes_supported_by_webnn": 477,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "Div",
      "Gemm",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Sigmoid",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "MatMul",
      "Pow"
    ]
  },
  {
    "name": "mobilevit_small",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 563,
    "nodes_supported_by_webnn": 563,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "Div",
      "Gemm",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Sigmoid",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ]
  },
  {
    "name": "msmarco_distilbert_base_v4",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 68,
    "nodes_in_the_graph": 314,
    "nodes_supported_by_webnn": 237,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: BOOL"
    ]
  },
  {
    "name": "msmarco_distilbert_base_v4",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 314,
    "nodes_supported_by_webnn": 314,
    "supported": [
      "Add",
      "Div",
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Where"
    ]
  },
  {
    "name": "mt5_small_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 139,
    "nodes_in_the_graph": 551,
    "nodes_supported_by_webnn": 392,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "mt5_small_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 551,
    "nodes_supported_by_webnn": 551,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "mt5_small_decoder_merged",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 123,
    "nodes_in_the_graph": 527,
    "nodes_supported_by_webnn": 384,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "If",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "mt5_small_decoder_merged",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 527,
    "nodes_supported_by_webnn": 527,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "If"
    ]
  },
  {
    "name": "mt5_small_decoder_with_past",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 123,
    "nodes_in_the_graph": 519,
    "nodes_supported_by_webnn": 376,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "mt5_small_decoder_with_past",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 527,
    "nodes_supported_by_webnn": 527,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "mt5_small_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 82,
    "nodes_in_the_graph": 350,
    "nodes_supported_by_webnn": 248,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "mt5_small_encoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 350,
    "nodes_supported_by_webnn": 350,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "realesrgan_x4_1024_fp32",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 1030,
    "nodes_supported_by_webnn": 1028,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Transpose"
    ],
    "not_supported": [
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_1024_fp32",
    "backend": "gpu",
    "error": "crash"
  },
  {
    "name": "realesrgan_x4_128_fp32",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 1030,
    "nodes_supported_by_webnn": 1028,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Transpose"
    ],
    "not_supported": [
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_128_fp32",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_256_fp32",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 1030,
    "nodes_supported_by_webnn": 1028,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Transpose"
    ],
    "not_supported": [
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_256_fp32",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_512_fp32",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 1030,
    "nodes_supported_by_webnn": 1028,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Transpose"
    ],
    "not_supported": [
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_512_fp32",
    "backend": "gpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_64_fp32",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 1030,
    "nodes_supported_by_webnn": 1028,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Transpose"
    ],
    "not_supported": [
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_64_fp32",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize"
    ]
  },
  {
    "name": "resnet50_v1",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 124,
    "nodes_supported_by_webnn": 124,
    "supported": [
      "Add",
      "Conv",
      "Flatten",
      "Gemm",
      "GlobalAveragePool",
      "MaxPool",
      "Relu",
      "Transpose"
    ]
  },
  {
    "name": "resnet50_v1",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 122,
    "nodes_supported_by_webnn": 122,
    "supported": [
      "Add",
      "Conv",
      "Flatten",
      "Gemm",
      "GlobalAveragePool",
      "MaxPool",
      "Relu"
    ]
  },
  {
    "name": "resnet50_v2",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 18,
    "nodes_in_the_graph": 177,
    "nodes_supported_by_webnn": 159,
    "supported": [
      "Add",
      "Conv",
      "Gemm",
      "GlobalAveragePool",
      "MaxPool",
      "Relu",
      "Reshape",
      "Transpose"
    ],
    "not_supported": [
      "BatchNormalization"
    ]
  },
  {
    "name": "resnet50_v2",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 141,
    "nodes_supported_by_webnn": 141,
    "supported": [
      "Add",
      "BatchNormalization",
      "Conv",
      "Gemm",
      "GlobalAveragePool",
      "MaxPool",
      "Relu",
      "Reshape"
    ]
  },
  {
    "name": "sam_b_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 79,
    "nodes_in_the_graph": 366,
    "nodes_supported_by_webnn": 258,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Div",
      "Flatten",
      "Floor",
      "Gemm",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "ArgMax",
      "Cast",
      "Concat",
      "Cos",
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "LayerNormalization",
      "MatMul",
      "Not",
      "Pow",
      "Reciprocal",
      "ReduceMax",
      "Resize",
      "Shape",
      "Sin",
      "Slice",
      "Transpose",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Concat: INT64",
      "Slice: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "sam_b_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 349,
    "nodes_supported_by_webnn": 345,
    "supported": [
      "Add",
      "ArgMax",
      "Cast",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Cos",
      "Div",
      "Equal",
      "Erf",
      "Expand",
      "Flatten",
      "Floor",
      "Gather",
      "Gemm",
      "LayerNormalization",
      "MatMul",
      "Mul",
      "Not",
      "Pow",
      "Reciprocal",
      "ReduceMax",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Sin",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Resize",
      "Shape",
      "Slice"
    ]
  },
  {
    "name": "sam_b_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 120,
    "nodes_in_the_graph": 591,
    "nodes_supported_by_webnn": 400,
    "supported": [
      "Add",
      "Conv",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Squeeze",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Add",
      "Einsum",
      "Erf",
      "LayerNormalization",
      "MatMul",
      "Pad",
      "Pow",
      "Unsqueeze"
    ]
  },
  {
    "name": "sam_b_encoder",
    "backend": "gpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "partitions_supported_by_webnn": 34,
    "nodes_in_the_graph": 593,
    "nodes_supported_by_webnn": 512,
    "supported": [
      "Add",
      "Conv",
      "Div",
      "Erf",
      "LayerNormalization",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Squeeze",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Add",
      "Einsum",
      "Pad",
      "Unsqueeze"
    ]
  },
  {
    "name": "sam_vit_base",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 238,
    "nodes_in_the_graph": 1136,
    "nodes_supported_by_webnn": 843,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Div",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Slice",
      "Softmax",
      "Sqrt",
      "Squeeze",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Add",
      "Cos",
      "Einsum",
      "Erf",
      "Gather",
      "MatMul",
      "Pad",
      "Pow",
      "ScatterND",
      "Sin",
      "Split",
      "Tile",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "sam_vit_base",
    "backend": "gpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "partitions_supported_by_webnn": 48,
    "nodes_in_the_graph": 1135,
    "nodes_supported_by_webnn": 1040,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Cos",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Sin",
      "Slice",
      "Softmax",
      "Sqrt",
      "Squeeze",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "not_supported": [
      "Add",
      "Einsum",
      "Pad",
      "ScatterND",
      "Split",
      "Tile",
      "Unsqueeze"
    ]
  },
  {
    "name": "sam_vit_base_prompt_encoder_mask_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 85,
    "nodes_in_the_graph": 364,
    "nodes_supported_by_webnn": 272,
    "supported": [
      "Add",
      "Concat",
      "ConvTranspose",
      "Div",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Slice",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cos",
      "Erf",
      "Gather",
      "MatMul",
      "Pow",
      "ScatterND",
      "Sin",
      "Tile",
      "Where"
    ]
  },
  {
    "name": "sam_vit_base_prompt_encoder_mask_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 5,
    "nodes_in_the_graph": 362,
    "nodes_supported_by_webnn": 358,
    "supported": [
      "Add",
      "Concat",
      "ConvTranspose",
      "Cos",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Sin",
      "Slice",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "not_supported": [
      "ScatterND",
      "Tile"
    ]
  },
  {
    "name": "sam_vit_base_vision_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 143,
    "nodes_in_the_graph": 780,
    "nodes_supported_by_webnn": 590,
    "supported": [
      "Add",
      "Conv",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Squeeze",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Add",
      "Einsum",
      "Erf",
      "MatMul",
      "Pad",
      "Pow",
      "Unsqueeze"
    ]
  },
  {
    "name": "sam_vit_base_vision_encoder",
    "backend": "gpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "partitions_supported_by_webnn": 33,
    "nodes_in_the_graph": 781,
    "nodes_supported_by_webnn": 701,
    "supported": [
      "Add",
      "Conv",
      "Div",
      "Erf",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Squeeze",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Add",
      "Einsum",
      "Pad",
      "Unsqueeze"
    ]
  },
  {
    "name": "segment_anything",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 73,
    "nodes_in_the_graph": 345,
    "nodes_supported_by_webnn": 258,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Div",
      "Flatten",
      "Gemm",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "ArgMax",
      "Cast",
      "Cos",
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "LayerNormalization",
      "MatMul",
      "Not",
      "Pow",
      "Sin"
    ]
  },
  {
    "name": "segment_anything",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 329,
    "nodes_supported_by_webnn": 329,
    "supported": [
      "Add",
      "ArgMax",
      "Cast",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Cos",
      "Div",
      "Equal",
      "Erf",
      "Expand",
      "Flatten",
      "Gather",
      "Gemm",
      "LayerNormalization",
      "MatMul",
      "Mul",
      "Not",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Sin",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "selfie_segmentation_general",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 170,
    "nodes_supported_by_webnn": 170,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Conv",
      "ConvTranspose",
      "Mul",
      "Relu",
      "Resize",
      "Sigmoid"
    ]
  },
  {
    "name": "selfie_segmentation_general",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 172,
    "nodes_supported_by_webnn": 172,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Conv",
      "ConvTranspose",
      "Mul",
      "Relu",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Transpose"
    ]
  },
  {
    "name": "selfie_segmentation_landscape",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 170,
    "nodes_supported_by_webnn": 170,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "ConvTranspose",
      "GlobalAveragePool",
      "Mul",
      "Relu",
      "Resize",
      "Sigmoid"
    ]
  },
  {
    "name": "selfie_segmentation_landscape",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 172,
    "nodes_supported_by_webnn": 172,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "ConvTranspose",
      "GlobalAveragePool",
      "Mul",
      "Relu",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Transpose"
    ]
  },
  {
    "name": "squeezebert_uncased",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 136,
    "nodes_in_the_graph": 582,
    "nodes_supported_by_webnn": 444,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Conv",
      "Erf",
      "Gather",
      "MatMul",
      "Pow",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "squeezebert_uncased",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 73,
    "nodes_in_the_graph": 536,
    "nodes_supported_by_webnn": 464,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Conv"
    ]
  },
  {
    "name": "squeezenet",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 67,
    "nodes_supported_by_webnn": 67,
    "supported": [
      "AveragePool",
      "Concat",
      "Conv",
      "MaxPool",
      "Relu",
      "Reshape",
      "Transpose"
    ]
  },
  {
    "name": "squeezenet",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 65,
    "nodes_supported_by_webnn": 65,
    "supported": [
      "AveragePool",
      "Concat",
      "Conv",
      "MaxPool",
      "Relu",
      "Reshape"
    ]
  },
  {
    "name": "sd_2_1_vae_decoder",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Add",
      "Cast",
      "Conv",
      "Div",
      "Exp",
      "InstanceNormalization",
      "MatMul",
      "Mul",
      "ReduceMax",
      "ReduceSum",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Conv: FLOAT16",
      "Div: FLOAT16",
      "Mul: FLOAT16",
      "Reshape: FLOAT16",
      "Resize: FLOAT16",
      "Sigmoid: FLOAT16",
      "Softmax: FLOAT16",
      "Sqrt: FLOAT16",
      "Sub: FLOAT16",
      "Transpose: FLOAT16"
    ]
  },
  {
    "name": "sd_2_1_vae_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 292,
    "nodes_supported_by_webnn": 292,
    "supported": [
      "Add",
      "Cast",
      "Conv",
      "Div",
      "InstanceNormalization",
      "MatMul",
      "Mul",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Softmax",
      "Sqrt",
      "Transpose"
    ]
  },
  {
    "name": "sd_2_1_vae_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 30,
    "nodes_in_the_graph": 272,
    "nodes_supported_by_webnn": 242,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "Mul",
      "Reshape",
      "Sigmoid",
      "Slice",
      "Softmax",
      "Squeeze",
      "Transpose"
    ],
    "not_supported": [
      "Exp",
      "InstanceNormalization",
      "MatMul",
      "RandomNormalLike"
    ]
  },
  {
    "name": "sd_2_1_vae_encoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 224,
    "nodes_supported_by_webnn": 223,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "Exp",
      "InstanceNormalization",
      "MatMul",
      "Mul",
      "Reshape",
      "Sigmoid",
      "Slice",
      "Softmax",
      "Transpose"
    ],
    "not_supported": [
      "RandomNormalLike"
    ]
  },
  {
    "name": "t5_small_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 105,
    "nodes_in_the_graph": 364,
    "nodes_supported_by_webnn": 255,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "t5_small_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 364,
    "nodes_supported_by_webnn": 364,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "t5_small_decoder_merged",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 93,
    "nodes_in_the_graph": 346,
    "nodes_supported_by_webnn": 249,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "If",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "t5_small_decoder_merged",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 346,
    "nodes_supported_by_webnn": 346,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "If"
    ]
  },
  {
    "name": "t5_small_decoder_with_past",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 93,
    "nodes_in_the_graph": 340,
    "nodes_supported_by_webnn": 243,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "t5_small_decoder_with_past",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 346,
    "nodes_supported_by_webnn": 346,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "t5_small_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 62,
    "nodes_in_the_graph": 212,
    "nodes_supported_by_webnn": 146,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "t5_small_encoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 212,
    "nodes_supported_by_webnn": 212,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "tinyyolo_v2",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 9,
    "nodes_in_the_graph": 51,
    "nodes_supported_by_webnn": 43,
    "supported": [
      "Add",
      "Conv",
      "LeakyRelu",
      "MaxPool",
      "Mul",
      "Transpose"
    ],
    "not_supported": [
      "BatchNormalization"
    ]
  },
  {
    "name": "tinyyolo_v2",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 33,
    "nodes_supported_by_webnn": 33,
    "supported": [
      "Add",
      "BatchNormalization",
      "Conv",
      "LeakyRelu",
      "MaxPool",
      "Mul"
    ]
  },
  {
    "name": "vit_base_patch16_224",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 135,
    "nodes_in_the_graph": 606,
    "nodes_supported_by_webnn": 472,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "Div",
      "Gemm",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Erf",
      "Gather",
      "MatMul",
      "Pow"
    ]
  },
  {
    "name": "vit_base_patch16_224",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 604,
    "nodes_supported_by_webnn": 604,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "Div",
      "Erf",
      "Gather",
      "Gemm",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 136,
    "nodes_in_the_graph": 1059,
    "nodes_supported_by_webnn": 923,
    "supported": [
      "Add",
      "Div",
      "Gemm",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Gather",
      "MatMul",
      "Pow",
      "Reshape",
      "Split",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 25,
    "nodes_in_the_graph": 1059,
    "nodes_supported_by_webnn": 1035,
    "supported": [
      "Add",
      "Div",
      "Gather",
      "Gemm",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Where"
    ],
    "not_supported": [
      "Split"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_decoder_merged",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 135,
    "nodes_in_the_graph": 1095,
    "nodes_supported_by_webnn": 959,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Gemm",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Gather",
      "If",
      "MatMul",
      "Pow",
      "Reshape",
      "Split",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_decoder_merged",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 25,
    "nodes_in_the_graph": 1095,
    "nodes_supported_by_webnn": 1071,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Gather",
      "Gemm",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Tanh",
      "Transpose",
      "Where"
    ],
    "not_supported": [
      "If",
      "Split"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_decoder_with_past",
    "backend": "cpu",
    "error": ""
  },
  {
    "name": "vit_gpt2_image_captioning_decoder_with_past",
    "backend": "gpu",
    "error": ""
  },
  {
    "name": "vit_gpt2_image_captioning_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 134,
    "nodes_in_the_graph": 604,
    "nodes_supported_by_webnn": 471,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Erf",
      "MatMul",
      "Pow"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_encoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 602,
    "nodes_supported_by_webnn": 602,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "Div",
      "Erf",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ]
  },
  {
    "name": "whisper_base_decoder_static",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 561,
    "nodes_supported_by_webnn": 561,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "whisper_base_decoder_static_merged",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 529,
    "nodes_supported_by_webnn": 529,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "whisper_tiny_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 74,
    "nodes_in_the_graph": 385,
    "nodes_supported_by_webnn": 309,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Erf",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "whisper_tiny_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 385,
    "nodes_supported_by_webnn": 385,
    "supported": [
      "Add",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ]
  },
  {
    "name": "whisper_tiny_decoder_merged",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 67,
    "nodes_in_the_graph": 357,
    "nodes_supported_by_webnn": 289,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Erf",
      "Gather",
      "If",
      "MatMul",
      "Pow",
      "Reshape"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "whisper_tiny_decoder_merged",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 357,
    "nodes_supported_by_webnn": 357,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "If"
    ]
  },
  {
    "name": "whisper_tiny_decoder_with_past",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 67,
    "nodes_in_the_graph": 357,
    "nodes_supported_by_webnn": 289,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Erf",
      "Gather",
      "MatMul",
      "Pow",
      "Reshape"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "whisper_tiny_decoder_with_past",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 357,
    "nodes_supported_by_webnn": 357,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Erf",
      "Gather",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ]
  },
  {
    "name": "whisper_tiny_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 49,
    "nodes_in_the_graph": 259,
    "nodes_supported_by_webnn": 210,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Conv",
      "Erf",
      "MatMul",
      "Pow"
    ]
  },
  {
    "name": "whisper_tiny_encoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 243,
    "nodes_supported_by_webnn": 241,
    "supported": [
      "Add",
      "Div",
      "Erf",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Conv"
    ]
  },
  {
    "name": "xlm_roberta_base",
    "backend": "cpu",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  {
    "name": "xlm_roberta_base",
    "backend": "gpu",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  {
    "name": "efficientnet_lite_fp16",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Conv",
      "Gemm",
      "Softmax",
      "Squeeze",
      "Transpose"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "AveragePool: FLOAT16",
      "Clip: FLOAT16",
      "Conv: FLOAT16",
      "Gemm: FLOAT16",
      "Softmax: FLOAT16",
      "Squeeze: FLOAT16",
      "Transpose: FLOAT16"
    ]
  },
  {
    "name": "efficientnet_lite_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 180,
    "nodes_supported_by_webnn": 180,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Conv",
      "Gemm",
      "Softmax",
      "Squeeze",
      "Transpose"
    ]
  },
  {
    "name": "mobilenet_v2_fp16",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Add",
      "Clip",
      "Conv",
      "Reshape"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Clip: FLOAT16",
      "Conv: FLOAT16",
      "Reshape: FLOAT16"
    ]
  },
  {
    "name": "mobilenet_v2_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 100,
    "nodes_supported_by_webnn": 100,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "Reshape"
    ]
  },
  {
    "name": "realesrgan_x4_1024_fp16",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Add",
      "Cast",
      "CastLike",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Less",
      "Mul",
      "Resize",
      "Where"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Concat: FLOAT16",
      "Conv: FLOAT16",
      "LeakyRelu: FLOAT16",
      "Mul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "realesrgan_x4_1024_fp16",
    "backend": "gpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_128_fp16",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Add",
      "Cast",
      "CastLike",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Less",
      "Mul",
      "Resize",
      "Where"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Concat: FLOAT16",
      "Conv: FLOAT16",
      "LeakyRelu: FLOAT16",
      "Mul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "realesrgan_x4_128_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_256_fp16",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Add",
      "Cast",
      "CastLike",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Less",
      "Mul",
      "Resize",
      "Where"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Concat: FLOAT16",
      "Conv: FLOAT16",
      "LeakyRelu: FLOAT16",
      "Mul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "realesrgan_x4_256_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_512_fp16",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Add",
      "Cast",
      "CastLike",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Less",
      "Mul",
      "Resize",
      "Where"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Concat: FLOAT16",
      "Conv: FLOAT16",
      "LeakyRelu: FLOAT16",
      "Mul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "realesrgan_x4_512_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize"
    ]
  },
  {
    "name": "realesrgan_x4_64_fp16",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Add",
      "Cast",
      "CastLike",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Less",
      "Mul",
      "Resize",
      "Where"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Concat: FLOAT16",
      "Conv: FLOAT16",
      "LeakyRelu: FLOAT16",
      "Mul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "realesrgan_x4_64_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize"
    ]
  },
  {
    "name": "resnet50_v1_fp16",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Add",
      "Conv",
      "Flatten",
      "Gemm",
      "GlobalAveragePool",
      "MaxPool",
      "Relu"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Conv: FLOAT16",
      "Flatten: FLOAT16",
      "Gemm: FLOAT16",
      "GlobalAveragePool: FLOAT16",
      "MaxPool: FLOAT16",
      "Relu: FLOAT16"
    ]
  },
  {
    "name": "resnet50_v1_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 122,
    "nodes_supported_by_webnn": 122,
    "supported": [
      "Add",
      "Conv",
      "Flatten",
      "Gemm",
      "GlobalAveragePool",
      "MaxPool",
      "Relu"
    ]
  },
  {
    "name": "segment_anything_fp16",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 19,
    "nodes_in_the_graph": 587,
    "nodes_supported_by_webnn": 81,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Resize",
      "Sqrt",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Add",
      "ArgMax",
      "Cast",
      "Concat",
      "ConstantOfShape",
      "Conv",
      "ConvTranspose",
      "Cos",
      "Div",
      "Equal",
      "Erf",
      "Exp",
      "Expand",
      "Flatten",
      "Gather",
      "Gemm",
      "LayerNormalization",
      "MatMul",
      "Mul",
      "Neg",
      "Not",
      "Pow",
      "Reciprocal",
      "ReduceMax",
      "ReduceMean",
      "ReduceSum",
      "Relu",
      "Reshape",
      "Shape",
      "Sin",
      "Size",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "WEBNN_12145297230675277246_0",
      "WEBNN_12145297230675277246_1"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Concat: FLOAT16",
      "Conv: FLOAT16",
      "ConvTranspose: FLOAT16",
      "Div: FLOAT16",
      "Flatten: FLOAT16",
      "Gemm: FLOAT16",
      "Mul: FLOAT16",
      "Neg: INT64",
      "ReduceMean: FLOAT16",
      "Relu: FLOAT16",
      "Reshape: FLOAT16",
      "Shape: FLOAT16",
      "Slice: FLOAT16",
      "Slice: INT64",
      "Softmax: FLOAT16",
      "Split: FLOAT16",
      "Sqrt: FLOAT16",
      "Sub: FLOAT16",
      "Transpose: FLOAT16",
      "Unsqueeze: FLOAT16"
    ]
  },
  {
    "name": "segment_anything_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 333,
    "nodes_supported_by_webnn": 333,
    "supported": [
      "Add",
      "ArgMax",
      "Cast",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Cos",
      "Div",
      "Equal",
      "Erf",
      "Expand",
      "Flatten",
      "Gather",
      "Gemm",
      "LayerNormalization",
      "MatMul",
      "Mul",
      "Not",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Sin",
      "Slice",
      "Softmax",
      "Split",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "squeezenet_fp16",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Concat",
      "Conv",
      "GlobalAveragePool",
      "MaxPool",
      "Relu",
      "Softmax"
    ],
    "input_type_not_supported": [
      "Concat: FLOAT16",
      "Conv: FLOAT16",
      "GlobalAveragePool: FLOAT16",
      "MaxPool: FLOAT16",
      "Relu: FLOAT16",
      "Softmax: FLOAT16"
    ]
  },
  {
    "name": "squeezenet_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 65,
    "nodes_supported_by_webnn": 65,
    "supported": [
      "Concat",
      "Conv",
      "GlobalAveragePool",
      "MaxPool",
      "Relu",
      "Softmax"
    ]
  },
  {
    "name": "sd_1_5_unet_fp16",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "Add",
      "Cast",
      "Concat",
      "Conv",
      "Cos",
      "Div",
      "Erf",
      "Exp",
      "Expand",
      "Gemm",
      "InstanceNormalization",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMax",
      "ReduceMean",
      "ReduceSum",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Sin",
      "Slice",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Concat: FLOAT16",
      "Conv: FLOAT16",
      "Div: FLOAT16",
      "Gemm: FLOAT16",
      "Mul: FLOAT16",
      "ReduceMean: FLOAT16",
      "Reshape: FLOAT16",
      "Sigmoid: FLOAT16",
      "Slice: FLOAT16",
      "Softmax: FLOAT16",
      "Sqrt: FLOAT16",
      "Sub: FLOAT16",
      "Transpose: FLOAT16",
      "Unsqueeze: FLOAT16",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "sd_1_5_unet_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 2218,
    "nodes_supported_by_webnn": 2218,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Conv",
      "Cos",
      "Div",
      "Erf",
      "Expand",
      "Gemm",
      "InstanceNormalization",
      "MatMul",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Sin",
      "Slice",
      "Softmax",
      "Sqrt",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ]
  },
  {
    "name": "sd_1_5_vae_decoder_fp16",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 295,
    "nodes_supported_by_webnn": 1,
    "supported": [
      "Softmax"
    ],
    "not_supported": [
      "Add",
      "Cast",
      "Conv",
      "InstanceNormalization",
      "MatMul",
      "Mul",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Transpose"
    ],
    "input_type_not_supported": [
      "Add: FLOAT16",
      "Conv: FLOAT16",
      "Mul: FLOAT16",
      "Reshape: FLOAT16",
      "Resize: FLOAT16",
      "Sigmoid: FLOAT16",
      "Transpose: FLOAT16"
    ]
  },
  {
    "name": "sd_1_5_vae_decoder_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 295,
    "nodes_supported_by_webnn": 295,
    "supported": [
      "Add",
      "Cast",
      "Conv",
      "InstanceNormalization",
      "MatMul",
      "Mul",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Softmax",
      "Transpose"
    ]
  }
]