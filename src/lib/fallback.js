export const fallbackEnv = {
  "windows": 'Windows 11 22H2 22621.2861',
  "version": '122.0.6193.0',
  'last_update': 'Dec 20, 2023'
}
export const fallback = [
  {
    "name": "albert_base_v2",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 127,
    "nodes_in_the_graph": 677,
    "nodes_supported_by_webnn": 547,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Sqrt",
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt",
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Gather",
      "MatMul",
      "Sqrt",
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Gather",
      "MatMul",
      "Sqrt",
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
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The operator (reduceSum) is not supported.",
    "partitions_supported_by_webnn": 252,
    "nodes_in_the_graph": 1387,
    "nodes_supported_by_webnn": 1129,
    "supported": [
      "Abs",
      "Add",
      "Concat",
      "Conv",
      "Div",
      "Flatten",
      "Mul",
      "Pow",
      "ReduceMean",
      "ReduceSum",
      "Reshape",
      "Sigmoid",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "ArgMax",
      "Cast",
      "Expand",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt",
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
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 243,
    "nodes_in_the_graph": 1441,
    "nodes_supported_by_webnn": 1192,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "Neg",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Reshape",
      "Slice",
      "Sqrt",
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
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 108,
    "nodes_supported_by_webnn": 104,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Concat",
      "Conv",
      "Relu"
    ],
    "not_supported": [
      "ArgMax",
      "Resize"
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
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 170,
    "nodes_in_the_graph": 1051,
    "nodes_supported_by_webnn": 864,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "Div",
      "MaxPool",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Sigmoid",
      "Slice",
      "Softmax",
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
      "Resize",
      "Sin",
      "Slice",
      "Sqrt",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Flatten: BOOL",
      "Transpose: BOOL",
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Erf",
      "MatMul",
      "Sqrt"
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Erf",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt"
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Conv",
      "Erf",
      "MatMul",
      "Sqrt"
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt",
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
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 140,
    "nodes_in_the_graph": 551,
    "nodes_supported_by_webnn": 400,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt",
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
    "name": "flan_t5_small_encoder",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 83,
    "nodes_in_the_graph": 350,
    "nodes_supported_by_webnn": 256,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt",
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
    "name": "fns_candy",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK only supports constant padding mode.",
    "partitions_supported_by_webnn": 6,
    "nodes_in_the_graph": 69,
    "nodes_supported_by_webnn": 20,
    "supported": [
      "Conv",
      "Pad",
      "Relu",
      "Transpose"
    ],
    "not_supported": [
      "Add",
      "Affine",
      "Conv",
      "ConvTranspose",
      "Crop",
      "ImageScaler",
      "InstanceNormalization",
      "Mul",
      "Relu",
      "Tanh"
    ]
  },
  {
    "name": "fns_candy",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 59,
    "nodes_supported_by_webnn": 15,
    "supported": [
      "Conv",
      "InstanceNormalization",
      "Pad",
      "Relu"
    ],
    "not_supported": [
      "Add",
      "Affine",
      "Conv",
      "ConvTranspose",
      "Crop",
      "ImageScaler",
      "InstanceNormalization",
      "Mul",
      "Relu",
      "Tanh"
    ]
  },
  {
    "name": "gpt2_decoder",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 63,
    "nodes_in_the_graph": 692,
    "nodes_supported_by_webnn": 624,
    "supported": [
      "Add",
      "Div",
      "Gemm",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Split",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt",
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
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
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
      "Reshape",
      "Sqrt",
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
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "partitions_supported_by_webnn": 10,
    "nodes_in_the_graph": 122,
    "nodes_supported_by_webnn": 113,
    "supported": [
      "Add",
      "Conv",
      "Flatten",
      "Gemm",
      "GlobalAveragePool",
      "HardSwish",
      "Mul",
      "ReduceMean",
      "Relu"
    ],
    "not_supported": [
      "HardSigmoid"
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Sigmoid",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "MatMul",
      "Sqrt"
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt",
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
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 149,
    "nodes_in_the_graph": 876,
    "nodes_supported_by_webnn": 580,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Reshape",
      "Sqrt",
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
    "partitions_supported_by_webnn": 93,
    "nodes_in_the_graph": 876,
    "nodes_supported_by_webnn": 730,
    "supported": [
      "Add",
      "Cast",
      "Div",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger",
      "QuantizeLinear"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "mt5_small_encoder",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 92,
    "nodes_in_the_graph": 557,
    "nodes_supported_by_webnn": 369,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Reshape",
      "Sqrt",
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
    "partitions_supported_by_webnn": 60,
    "nodes_in_the_graph": 557,
    "nodes_supported_by_webnn": 462,
    "supported": [
      "Add",
      "Cast",
      "Div",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger",
      "QuantizeLinear"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "realesrgan_x4_128_fp32",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK backend doesn't support concat inputs size 5",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1026,
    "nodes_supported_by_webnn": 1026,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize",
      "Transpose"
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
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK backend doesn't support concat inputs size 5",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1026,
    "nodes_supported_by_webnn": 1026,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize",
      "Transpose"
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
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK backend doesn't support concat inputs size 5",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1026,
    "nodes_supported_by_webnn": 1026,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize",
      "Transpose"
    ]
  },
  {
    "name": "realesrgan_x4_512_fp32",
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
    "name": "realesrgan_x4_1024_fp32",
    "backend": "gpu",
    "error": "Crash",
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
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK backend doesn't support concat inputs size 5",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1026,
    "nodes_supported_by_webnn": 1026,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "LeakyRelu",
      "Mul",
      "Resize",
      "Transpose"
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
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 79,
    "nodes_in_the_graph": 366,
    "nodes_supported_by_webnn": 257,
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
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
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
      "Reciprocal",
      "ReduceMax",
      "Resize",
      "Shape",
      "Sin",
      "Slice",
      "Sqrt",
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
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
      "Sqrt",
      "Unsqueeze"
    ]
  },
  {
    "name": "sam_b_encoder",
    "backend": "gpu",
    "error": "Crash"
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
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Slice",
      "Softmax",
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
      "ScatterND",
      "Sin",
      "Split",
      "Sqrt",
      "Tile",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "sam_vit_base",
    "backend": "gpu",
    "error": "Crash"
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
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
      "Sqrt",
      "Unsqueeze"
    ]
  },
  {
    "name": "sam_vit_base_vision_encoder",
    "backend": "gpu",
    "error": "Crash"
  },
  {
    "name": "segment_anything",
    "backend": "cpu",
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 75,
    "nodes_in_the_graph": 345,
    "nodes_supported_by_webnn": 256,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Div",
      "Flatten",
      "Gemm",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
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
      "Resize",
      "Sin",
      "Sqrt"
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
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 4,
    "nodes_in_the_graph": 170,
    "nodes_supported_by_webnn": 167,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Conv",
      "ConvTranspose",
      "Mul",
      "Relu",
      "Sigmoid"
    ],
    "not_supported": [
      "Resize"
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Conv",
      "Erf",
      "Gather",
      "MatMul",
      "Sqrt",
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
    "name": "t5_small_decoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 106,
    "nodes_in_the_graph": 364,
    "nodes_supported_by_webnn": 255,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt",
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
    "name": "t5_small_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 63,
    "nodes_in_the_graph": 212,
    "nodes_supported_by_webnn": 146,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt",
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Erf",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt"
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
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Conv",
      "Erf",
      "MatMul",
      "Sqrt"
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
  }
  ,

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
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 341,
    "nodes_supported_by_webnn": 1,
    "supported": [
      "Transpose"
    ],
    "not_supported": [
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
      "Pow: FLOAT16",
      "ReduceMean: FLOAT16",
      "Relu: FLOAT16",
      "Reshape: FLOAT16",
      "Slice: FLOAT16",
      "Softmax: FLOAT16",
      "Split: FLOAT16",
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
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Resample2d only supports Linear mode.",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 2224,
    "nodes_supported_by_webnn": 6,
    "supported": [
      "Resize",
      "Transpose"
    ],
    "not_supported": [
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
      "Pow: FLOAT16",
      "ReduceMean: FLOAT16",
      "Reshape: FLOAT16",
      "Sigmoid: FLOAT16",
      "Slice: FLOAT16",
      "Softmax: FLOAT16",
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
    "partitions_supported_by_webnn": 62,
    "nodes_in_the_graph": 2218,
    "nodes_supported_by_webnn": 2157,
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
    ],
    "not_supported": [
      "InstanceNormalization"
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
    "partitions_supported_by_webnn": 31,
    "nodes_in_the_graph": 295,
    "nodes_supported_by_webnn": 265,
    "supported": [
      "Add",
      "Cast",
      "Conv",
      "MatMul",
      "Mul",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Softmax",
      "Transpose"
    ],
    "not_supported": [
      "InstanceNormalization"
    ]
  },
  {
    "name": "albert_base_v2_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 127,
    "nodes_in_the_graph": 711,
    "nodes_supported_by_webnn": 563,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "albert_base_v2_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 10,
    "nodes_in_the_graph": 711,
    "nodes_supported_by_webnn": 691,
    "supported": [
      "Add",
      "Cast",
      "Div",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "bart_large_cnn_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 136,
    "nodes_in_the_graph": 969,
    "nodes_supported_by_webnn": 706,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "bart_large_cnn_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 74,
    "nodes_in_the_graph": 969,
    "nodes_supported_by_webnn": 846,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Expand",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "bert_base_cased_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 139,
    "nodes_in_the_graph": 908,
    "nodes_supported_by_webnn": 640,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "bert_base_cased_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 75,
    "nodes_in_the_graph": 908,
    "nodes_supported_by_webnn": 780,
    "supported": [
      "Add",
      "Cast",
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
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "bert_base_multilingual_cased_ner_hrl_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 136,
    "nodes_in_the_graph": 891,
    "nodes_supported_by_webnn": 627,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "bert_base_multilingual_cased_ner_hrl_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 74,
    "nodes_in_the_graph": 891,
    "nodes_supported_by_webnn": 764,
    "supported": [
      "Add",
      "Cast",
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
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "bert_base_multilingual_uncased_sentiment_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 137,
    "nodes_in_the_graph": 899,
    "nodes_supported_by_webnn": 631,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "bert_base_multilingual_uncased_sentiment_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 75,
    "nodes_in_the_graph": 899,
    "nodes_supported_by_webnn": 770,
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
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "bert_base_uncased_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 139,
    "nodes_in_the_graph": 908,
    "nodes_supported_by_webnn": 640,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "bert_base_uncased_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 75,
    "nodes_in_the_graph": 908,
    "nodes_supported_by_webnn": 780,
    "supported": [
      "Add",
      "Cast",
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
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "clip_vit_base_patch16_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The operator (reduceSum) is not supported.",
    "partitions_supported_by_webnn": 253,
    "nodes_in_the_graph": 1928,
    "nodes_supported_by_webnn": 1420,
    "supported": [
      "Abs",
      "Add",
      "Concat",
      "Div",
      "Flatten",
      "Mul",
      "Pow",
      "ReduceMean",
      "ReduceSum",
      "Reshape",
      "Sigmoid",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "ArgMax",
      "Cast",
      "ConvInteger",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Expand",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "clip_vit_base_patch16_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 150,
    "nodes_in_the_graph": 1928,
    "nodes_supported_by_webnn": 1678,
    "supported": [
      "Abs",
      "Add",
      "ArgMax",
      "Cast",
      "Concat",
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
    ],
    "not_supported": [
      "ConvInteger",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "codegen_350m_mono_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 243,
    "nodes_in_the_graph": 1748,
    "nodes_supported_by_webnn": 1354,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "Neg",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Slice",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "codegen_350m_mono_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 163,
    "nodes_in_the_graph": 1748,
    "nodes_supported_by_webnn": 1522,
    "supported": [
      "Add",
      "Cast",
      "Concat",
      "Div",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger",
      "Slice"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "detr_resnet_50_int8",
    "backend": "cpu",
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 224,
    "nodes_in_the_graph": 1724,
    "nodes_supported_by_webnn": 1211,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "MaxPool",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Sigmoid",
      "Slice",
      "Softmax",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "ConvInteger",
      "Cos",
      "CumSum",
      "DynamicQuantizeLinear",
      "Expand",
      "Flatten",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Resize",
      "Sin",
      "Slice",
      "Sqrt",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Flatten: BOOL",
      "Transpose: BOOL",
      "Unsqueeze: BOOL",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "detr_resnet_50_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 156,
    "nodes_in_the_graph": 1690,
    "nodes_supported_by_webnn": 1412,
    "supported": [
      "Add",
      "Cast",
      "Concat",
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
      "ConvInteger",
      "CumSum",
      "DynamicQuantizeLinear",
      "MatMulInteger",
      "Slice"
    ]
  },
  {
    "name": "dino_vitb16_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 134,
    "nodes_in_the_graph": 871,
    "nodes_supported_by_webnn": 615,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "ConvInteger",
      "DynamicQuantizeLinear",
      "Erf",
      "MatMul",
      "MatMulInteger",
      "Sqrt"
    ]
  },
  {
    "name": "dino_vitb16_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 73,
    "nodes_in_the_graph": 871,
    "nodes_supported_by_webnn": 749,
    "supported": [
      "Add",
      "Cast",
      "Concat",
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
      "ConvInteger",
      "DynamicQuantizeLinear",
      "MatMulInteger"
    ]
  },
  {
    "name": "distil_medium_en_decoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 38,
    "nodes_in_the_graph": 266,
    "nodes_supported_by_webnn": 191,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Sqrt"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "distil_medium_en_decoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 23,
    "nodes_in_the_graph": 266,
    "nodes_supported_by_webnn": 230,
    "supported": [
      "Add",
      "Cast",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "distil_medium_en_encoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 269,
    "nodes_in_the_graph": 1929,
    "nodes_supported_by_webnn": 1416,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "ConvInteger",
      "DynamicQuantizeLinear",
      "Erf",
      "MatMul",
      "MatMulInteger",
      "Sqrt"
    ]
  },
  {
    "name": "distil_medium_en_encoder_int8",
    "backend": "gpu",
    "error": "Crash"
  },
  {
    "name": "distilbart_cnn_6_6_decoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 113,
    "nodes_in_the_graph": 810,
    "nodes_supported_by_webnn": 593,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_decoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 62,
    "nodes_in_the_graph": 810,
    "nodes_supported_by_webnn": 709,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Expand",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_encoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 70,
    "nodes_in_the_graph": 495,
    "nodes_supported_by_webnn": 358,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_encoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 38,
    "nodes_in_the_graph": 495,
    "nodes_supported_by_webnn": 432,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Erf",
      "Expand",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "distilbert_base_cased_distilled_squad_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 70,
    "nodes_in_the_graph": 457,
    "nodes_supported_by_webnn": 314,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Squeeze",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Split",
      "Sqrt",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: BOOL"
    ]
  },
  {
    "name": "distilbert_base_cased_distilled_squad_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 40,
    "nodes_in_the_graph": 457,
    "nodes_supported_by_webnn": 391,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Equal",
      "Erf",
      "Expand",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger",
      "Split"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "distilbert_base_uncased_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 72,
    "nodes_in_the_graph": 471,
    "nodes_supported_by_webnn": 325,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Sqrt",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: BOOL"
    ]
  },
  {
    "name": "distilbert_base_uncased_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 40,
    "nodes_in_the_graph": 471,
    "nodes_supported_by_webnn": 405,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Equal",
      "Erf",
      "Expand",
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
    ],
    "not_supported": [
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "distilbert_base_uncased_mnli_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 70,
    "nodes_in_the_graph": 462,
    "nodes_supported_by_webnn": 316,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Sqrt",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: BOOL"
    ]
  },
  {
    "name": "distilbert_base_uncased_mnli_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 40,
    "nodes_in_the_graph": 462,
    "nodes_supported_by_webnn": 395,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Equal",
      "Erf",
      "Expand",
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
      "Where"
    ],
    "not_supported": [
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "distilgpt2_decoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 57,
    "nodes_in_the_graph": 479,
    "nodes_supported_by_webnn": 366,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Split",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "distilgpt2_decoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 27,
    "nodes_in_the_graph": 479,
    "nodes_supported_by_webnn": 427,
    "supported": [
      "Add",
      "Cast",
      "Div",
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
    ],
    "not_supported": [
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "flan_t5_small_decoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 149,
    "nodes_in_the_graph": 876,
    "nodes_supported_by_webnn": 580,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Reshape",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "flan_t5_small_decoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 93,
    "nodes_in_the_graph": 876,
    "nodes_supported_by_webnn": 730,
    "supported": [
      "Add",
      "Cast",
      "Div",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger",
      "QuantizeLinear"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "flan_t5_small_encoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 83,
    "nodes_in_the_graph": 350,
    "nodes_supported_by_webnn": 256,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Gather",
      "MatMul",
      "Reshape",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "flan_t5_small_encoder_int8",
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
    "name": "msmarco_distilbert_base_v4_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 68,
    "nodes_in_the_graph": 448,
    "nodes_supported_by_webnn": 309,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Equal",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Sqrt",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: BOOL"
    ]
  },
  {
    "name": "msmarco_distilbert_base_v4_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 38,
    "nodes_in_the_graph": 448,
    "nodes_supported_by_webnn": 385,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Equal",
      "Erf",
      "Expand",
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
    ],
    "not_supported": [
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "mt5_small_decoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 149,
    "nodes_in_the_graph": 876,
    "nodes_supported_by_webnn": 580,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Reshape",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "mt5_small_decoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 93,
    "nodes_in_the_graph": 876,
    "nodes_supported_by_webnn": 730,
    "supported": [
      "Add",
      "Cast",
      "Div",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger",
      "QuantizeLinear"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "mt5_small_encoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 92,
    "nodes_in_the_graph": 557,
    "nodes_supported_by_webnn": 369,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Reshape",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "mt5_small_encoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 60,
    "nodes_in_the_graph": 557,
    "nodes_supported_by_webnn": 462,
    "supported": [
      "Add",
      "Cast",
      "Div",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger",
      "QuantizeLinear"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "sam_vit_base_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 242,
    "nodes_in_the_graph": 1572,
    "nodes_supported_by_webnn": 1084,
    "supported": [
      "Add",
      "Concat",
      "ConvTranspose",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Slice",
      "Softmax",
      "Squeeze",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Add",
      "Cast",
      "ConvInteger",
      "Cos",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Einsum",
      "Erf",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Pad",
      "ScatterND",
      "Sin",
      "Split",
      "Sqrt",
      "Tile",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Transpose: UINT8"
    ]
  },
  {
    "name": "sam_vit_base_int8",
    "backend": "gpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create gather operator.",
    "partitions_supported_by_webnn": 148,
    "nodes_in_the_graph": 1525,
    "nodes_supported_by_webnn": 1238,
    "supported": [
      "Add",
      "Cast",
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
      "Squeeze",
      "Sub",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "not_supported": [
      "Add",
      "ConvInteger",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Einsum",
      "MatMulInteger",
      "Pad",
      "ScatterND",
      "Split",
      "Tile",
      "Transpose",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Transpose: UINT8"
    ]
  },
  {
    "name": "sam_vit_base_prompt_encoder_mask_decoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 86,
    "nodes_in_the_graph": 549,
    "nodes_supported_by_webnn": 367,
    "supported": [
      "Add",
      "Concat",
      "ConvTranspose",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Slice",
      "Softmax",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "Cos",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "ScatterND",
      "Sin",
      "Sqrt",
      "Tile",
      "Transpose",
      "Where"
    ],
    "input_type_not_supported": [
      "Transpose: UINT8"
    ]
  },
  {
    "name": "sam_vit_base_prompt_encoder_mask_decoder_int8",
    "backend": "gpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create gather operator.",
    "partitions_supported_by_webnn": 54,
    "nodes_in_the_graph": 547,
    "nodes_supported_by_webnn": 453,
    "supported": [
      "Add",
      "Cast",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "MatMulInteger",
      "ScatterND",
      "Tile",
      "Transpose"
    ],
    "input_type_not_supported": [
      "Transpose: UINT8"
    ]
  },
  {
    "name": "sam_vit_base_vision_encoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 145,
    "nodes_in_the_graph": 1031,
    "nodes_supported_by_webnn": 736,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Slice",
      "Softmax",
      "Split",
      "Squeeze",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Add",
      "Cast",
      "ConvInteger",
      "DynamicQuantizeLinear",
      "Einsum",
      "Erf",
      "MatMul",
      "MatMulInteger",
      "Pad",
      "Sqrt",
      "Unsqueeze"
    ]
  },
  {
    "name": "sam_vit_base_vision_encoder_int8",
    "backend": "gpu",
    "error": "Crash"
  },

  {
    "name": "squeezebert_uncased_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 136,
    "nodes_in_the_graph": 921,
    "nodes_supported_by_webnn": 660,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "ConvInteger",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Gather",
      "MatMul",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "squeezebert_uncased_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 74,
    "nodes_in_the_graph": 875,
    "nodes_supported_by_webnn": 750,
    "supported": [
      "Add",
      "Cast",
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
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "ConvInteger",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "t5_small_decoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 107,
    "nodes_in_the_graph": 590,
    "nodes_supported_by_webnn": 377,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Reshape",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "t5_small_decoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 65,
    "nodes_in_the_graph": 590,
    "nodes_supported_by_webnn": 485,
    "supported": [
      "Add",
      "Cast",
      "Div",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger",
      "QuantizeLinear"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "t5_small_encoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 64,
    "nodes_in_the_graph": 351,
    "nodes_supported_by_webnn": 219,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose",
      "Unsqueeze"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Reshape",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "t5_small_encoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 40,
    "nodes_in_the_graph": 351,
    "nodes_supported_by_webnn": 284,
    "supported": [
      "Add",
      "Cast",
      "Div",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger",
      "QuantizeLinear"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "vit_base_patch16_224_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 135,
    "nodes_in_the_graph": 878,
    "nodes_supported_by_webnn": 618,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "ConvInteger",
      "DynamicQuantizeLinear",
      "Erf",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Sqrt"
    ]
  },
  {
    "name": "vit_base_patch16_224_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 74,
    "nodes_in_the_graph": 878,
    "nodes_supported_by_webnn": 754,
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
      "Transpose"
    ],
    "not_supported": [
      "ConvInteger",
      "DynamicQuantizeLinear",
      "MatMulInteger"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_decoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
    "partitions_supported_by_webnn": 207,
    "nodes_in_the_graph": 1471,
    "nodes_supported_by_webnn": 1103,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Tanh",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Split",
      "Sqrt",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_decoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 111,
    "nodes_in_the_graph": 1471,
    "nodes_supported_by_webnn": 1286,
    "supported": [
      "Add",
      "Cast",
      "Div",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger",
      "Split"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_encoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 134,
    "nodes_in_the_graph": 871,
    "nodes_supported_by_webnn": 615,
    "supported": [
      "Add",
      "Concat",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "ConvInteger",
      "DynamicQuantizeLinear",
      "Erf",
      "MatMul",
      "MatMulInteger",
      "Sqrt"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_encoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 73,
    "nodes_in_the_graph": 871,
    "nodes_supported_by_webnn": 749,
    "supported": [
      "Add",
      "Cast",
      "Concat",
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
      "ConvInteger",
      "DynamicQuantizeLinear",
      "MatMulInteger"
    ]
  },
  {
    "name": "whisper_tiny_decoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 74,
    "nodes_in_the_graph": 532,
    "nodes_supported_by_webnn": 389,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Erf",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Sqrt"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "whisper_tiny_decoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 43,
    "nodes_in_the_graph": 532,
    "nodes_supported_by_webnn": 464,
    "supported": [
      "Add",
      "Cast",
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
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  },
  {
    "name": "whisper_tiny_encoder_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 49,
    "nodes_in_the_graph": 357,
    "nodes_supported_by_webnn": 264,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "ConvInteger",
      "DynamicQuantizeLinear",
      "Erf",
      "MatMul",
      "MatMulInteger",
      "Sqrt"
    ]
  },
  {
    "name": "whisper_tiny_encoder_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 26,
    "nodes_in_the_graph": 341,
    "nodes_supported_by_webnn": 297,
    "supported": [
      "Add",
      "Cast",
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
      "ConvInteger",
      "DynamicQuantizeLinear",
      "MatMulInteger"
    ]
  },
  {
    "name": "xlm_roberta_base_int8",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 140,
    "nodes_in_the_graph": 915,
    "nodes_supported_by_webnn": 640,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "Pow",
      "ReduceMean",
      "Reshape",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Add",
      "Cast",
      "CumSum",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Equal",
      "Erf",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Mul",
      "Not",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Add: INT64",
      "Mul: INT32",
      "Unsqueeze: INT64"
    ]
  },
  {
    "name": "xlm_roberta_base_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 77,
    "nodes_in_the_graph": 915,
    "nodes_supported_by_webnn": 786,
    "supported": [
      "Add",
      "Cast",
      "Div",
      "Equal",
      "Erf",
      "MatMul",
      "Mul",
      "Not",
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
      "CumSum",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMulInteger"
    ],
    "input_type_not_supported": [
      "Gather: UINT8"
    ]
  }
]