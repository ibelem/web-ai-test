export const fallbackEnv = {
  "windows": '',
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
    "name": "realesrgan_x4_1024_fp32",
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
  }
]