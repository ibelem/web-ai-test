export const fallbackEnv = {
  "version": '121.0.6144.0',
  'last_update': 'Nov 24, 2023'
}
export const fallback = [
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
    "partitions_supported_by_webnn": 63,
    "nodes_in_the_graph": 491,
    "nodes_supported_by_webnn": 429,
    "supported": [
      "Add",
      "AveragePool",
      "Concat",
      "Conv",
      "GlobalAveragePool",
      "MaxPool",
      "Mul",
      "Relu"
    ],
    "not_supported": [
      "BatchNormalization"
    ]
  },
  {
    "name": "efficientnet_lite",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 179,
    "nodes_supported_by_webnn": 178,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Conv",
      "Gemm",
      "Softmax"
    ],
    "not_supported": [
      "Squeeze"
    ]
  },
  {
    "name": "efficientnet_lite",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 180,
    "nodes_supported_by_webnn": 179,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Conv",
      "Gemm",
      "Softmax",
      "Transpose"
    ],
    "not_supported": [
      "Squeeze"
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
    "name": "resnet50_v1",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 124,
    "nodes_supported_by_webnn": 123,
    "supported": [
      "Add",
      "Conv",
      "Gemm",
      "GlobalAveragePool",
      "MaxPool",
      "Relu",
      "Transpose"
    ],
    "not_supported": [
      "Flatten"
    ]
  },
  {
    "name": "resnet50_v1",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 122,
    "nodes_supported_by_webnn": 121,
    "supported": [
      "Add",
      "Conv",
      "Gemm",
      "GlobalAveragePool",
      "MaxPool",
      "Relu"
    ],
    "not_supported": [
      "Flatten"
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
    "partitions_supported_by_webnn": 18,
    "nodes_in_the_graph": 141,
    "nodes_supported_by_webnn": 123,
    "supported": [
      "Add",
      "Conv",
      "Gemm",
      "GlobalAveragePool",
      "MaxPool",
      "Relu",
      "Reshape"
    ],
    "not_supported": [
      "BatchNormalization"
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
    "nodes_supported_by_webnn": 108,
    "supported": [
      "Add",
      "AveragePool",
      "Clip",
      "Concat",
      "Conv",
      "Relu",
      "Resize",
      "Transpose"
    ],
    "not_supported": [
      "ArgMax"
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
    "partitions_supported_by_webnn": 4,
    "nodes_in_the_graph": 176,
    "nodes_supported_by_webnn": 173,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "ConvTranspose",
      "GlobalAveragePool",
      "Mul",
      "Relu",
      "Sigmoid",
      "Transpose"
    ],
    "not_supported": [
      "Upsample"
    ]
  },
  {
    "name": "selfie_segmentation_landscape",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 4,
    "nodes_in_the_graph": 172,
    "nodes_supported_by_webnn": 169,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "ConvTranspose",
      "GlobalAveragePool",
      "Mul",
      "Relu",
      "Reshape",
      "Sigmoid",
      "Transpose"
    ],
    "not_supported": [
      "Upsample"
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
    "partitions_supported_by_webnn": 6,
    "nodes_in_the_graph": 59,
    "nodes_supported_by_webnn": 10,
    "supported": [
      "Conv",
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
    "name": "realesrgan_x4_64_fp32",
    "backend": "cpu",
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 1026,
    "nodes_supported_by_webnn": 1024,
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
    "name": "realesrgan_x4_128_fp32",
    "backend": "cpu",
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 1026,
    "nodes_supported_by_webnn": 1024,
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
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 1026,
    "nodes_supported_by_webnn": 1024,
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
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 1026,
    "nodes_supported_by_webnn": 1024,
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
    "backend": "cpu",
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 1026,
    "nodes_supported_by_webnn": 1024,
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
    "error": "Out of memory, tab crash",
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
    "partitions_supported_by_webnn": 9,
    "nodes_in_the_graph": 33,
    "nodes_supported_by_webnn": 25,
    "supported": [
      "Add",
      "Conv",
      "LeakyRelu",
      "MaxPool",
      "Mul"
    ],
    "not_supported": [
      "BatchNormalization"
    ]
  },
  {
    "name": "dino_vitb16",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "partitions_supported_by_webnn": 134,
    "nodes_in_the_graph": 602,
    "nodes_supported_by_webnn": 469,
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
      "ReduceSum: FLOAT16",
      "Reshape: FLOAT16",
      "Resize: FLOAT16",
      "Sigmoid: FLOAT16",
      "Softmax: FLOAT16",
      "Sub: FLOAT16",
      "Transpose: FLOAT16"
    ]
  },
  {
    "name": "sd_2_1_vae_decoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 38,
    "nodes_in_the_graph": 292,
    "nodes_supported_by_webnn": 252,
    "supported": [
      "Add",
      "Conv",
      "Div",
      "Mul",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Softmax",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "InstanceNormalization",
      "MatMul",
      "Sqrt"
    ]
  },
  {
    "name": "sd_2_1_vae_encoder",
    "backend": "cpu",
    "error": "",
    "partitions_supported_by_webnn": 30,
    "nodes_in_the_graph": 272,
    "nodes_supported_by_webnn": 241,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "Mul",
      "Reshape",
      "Sigmoid",
      "Slice",
      "Softmax",
      "Transpose"
    ],
    "not_supported": [
      "Exp",
      "InstanceNormalization",
      "MatMul",
      "RandomNormalLike",
      "Squeeze"
    ]
  },
  {
    "name": "sd_2_1_vae_encoder",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 30,
    "nodes_in_the_graph": 224,
    "nodes_supported_by_webnn": 194,
    "supported": [
      "Add",
      "Clip",
      "Conv",
      "Mul",
      "Reshape",
      "Sigmoid",
      "Slice",
      "Softmax",
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
    "name": "sam_b_decoder",
    "backend": "cpu",
    "error": "Can't create a session. ERROR_CODE: 2, ERROR_MESSAGE: The initializer of graph has unsupported type, name: ortshared_7_1_1_1_token_308 type: 7",
    "partitions_supported_by_webnn": 82,
    "nodes_in_the_graph": 366,
    "nodes_supported_by_webnn": 247,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Div",
      "Floor",
      "Gemm",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Slice",
      "Softmax",
      "Split",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "ArgMax",
      "Cast",
      "Concat",
      "Cos",
      "Equal",
      "Erf",
      "Expand",
      "Flatten",
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
      "Slice: INT64"
    ]
  },
  {
    "name": "sam_b_decoder",
    "backend": "gpu",
    "error": "Failed to execute 'constant' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 83,
    "nodes_in_the_graph": 349,
    "nodes_supported_by_webnn": 236,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Div",
      "Floor",
      "Gemm",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Slice",
      "Softmax",
      "Split",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "ArgMax",
      "Cast",
      "Cos",
      "Equal",
      "Erf",
      "Expand",
      "Flatten",
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
      "Unsqueeze"
    ]
  },
  {
    "name": "sam_b_encoder",
    "backend": "cpu",
    "error": "Can't create a session. ERROR_CODE: 2, ERROR_MESSAGE: The initializer of graph has unsupported type, name: ortshared_7_1_3_2_token_290 type: 7",
    "partitions_supported_by_webnn": 132,
    "nodes_in_the_graph": 591,
    "nodes_supported_by_webnn": 363,
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
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Add",
      "Einsum",
      "Erf",
      "LayerNormalization",
      "MatMul",
      "Pad",
      "Sqrt",
      "Squeeze",
      "Unsqueeze"
    ]
  },
  {
    "name": "sam_b_encoder",
    "backend": "gpu",
    "error": "Failed to execute 'constant' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 132,
    "nodes_in_the_graph": 593,
    "nodes_supported_by_webnn": 365,
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
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Add",
      "Einsum",
      "Erf",
      "LayerNormalization",
      "MatMul",
      "Pad",
      "Sqrt",
      "Squeeze",
      "Unsqueeze"
    ]
  },
  {
    "name": "segment_anything",
    "backend": "cpu",
    "error": "Can't create a session. ERROR_CODE: 2, ERROR_MESSAGE: The initializer of graph has unsupported type, name: ortshared_7_1_1_2_token_370 type: 7",
    "partitions_supported_by_webnn": 77,
    "nodes_in_the_graph": 345,
    "nodes_supported_by_webnn": 247,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Div",
      "Gemm",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Slice",
      "Softmax",
      "Split",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "ArgMax",
      "Cast",
      "Cos",
      "Equal",
      "Erf",
      "Expand",
      "Flatten",
      "Gather",
      "LayerNormalization",
      "MatMul",
      "Not",
      "Sin",
      "Sqrt",
      "Unsqueeze"
    ]
  },
  {
    "name": "segment_anything",
    "backend": "gpu",
    "error": "Failed to execute 'constant' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 77,
    "nodes_in_the_graph": 329,
    "nodes_supported_by_webnn": 232,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Div",
      "Gemm",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Slice",
      "Softmax",
      "Split",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "ArgMax",
      "Cast",
      "Cos",
      "Equal",
      "Erf",
      "Expand",
      "Flatten",
      "Gather",
      "LayerNormalization",
      "MatMul",
      "Not",
      "Sin",
      "Sqrt",
      "Unsqueeze"
    ]
  },
  {
    "name": "t5_small_decoder",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
      "Reshape: INT64"
    ]
  },
  {
    "name": "t5_small_decoder",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 106,
    "nodes_in_the_graph": 364,
    "nodes_supported_by_webnn": 256,
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
      "Sqrt",
      "Unsqueeze"
    ]
  },
  {
    "name": "whisper_tiny_encoder",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "error": "Failed to execute 'conv2d' on 'MLGraphBuilder': The length of strides should be 2.",
    "partitions_supported_by_webnn": 48,
    "nodes_in_the_graph": 243,
    "nodes_supported_by_webnn": 196,
    "supported": [
      "Add",
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
    "name": "albert_base_v2",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    ]
  },
  {
    "name": "albert_base_v2",
    "backend": "gpu",
    "error": "",
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
    ]
  },
  {
    "name": "bart_large_cnn",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
      "Reshape: INT64"
    ]
  },
  {
    "name": "bart_large_cnn",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 137,
    "nodes_in_the_graph": 703,
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
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Erf",
      "Expand",
      "Gather",
      "MatMul",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "bert_base_cased",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    ]
  },
  {
    "name": "bert_base_cased",
    "backend": "gpu",
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
    ]
  },
  {
    "name": "bert_base_uncased",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    ]
  },
  {
    "name": "bert_base_uncased",
    "backend": "gpu",
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
    ]
  },
  {
    "name": "gpt2_decoder",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
      "Reshape: INT64"
    ]
  },
  {
    "name": "gpt2_decoder",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 65,
    "nodes_in_the_graph": 692,
    "nodes_supported_by_webnn": 626,
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
      "Sqrt",
      "Unsqueeze",
      "Where"
    ]
  }
  {
    "name": "m2m100_decoder",
    "backend": "cpu",
    "error": "Can't create a session. ERROR_CODE: 6, ERROR_MESSAGE: Exception during initialization: std::bad_alloc"
  },
  {
    "name": "m2m100_decoder",
    "backend": "gpu",
    "error": "Can't create a session. ERROR_CODE: 6, ERROR_MESSAGE: Exception during initialization: std::bad_alloc"
  },
  {
    "name": "m2m100_encoder",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
      "Reshape: INT64"
    ]
  },
  {
    "name": "m2m100_encoder",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 128,
    "nodes_in_the_graph": 666,
    "nodes_supported_by_webnn": 532,
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
      "CumSum",
      "Equal",
      "Expand",
      "Gather",
      "MatMul",
      "Not",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "t5_small_encoder",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
      "Reshape: INT64"
    ]
  },
  {
    "name": "t5_small_encoder",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 63,
    "nodes_in_the_graph": 212,
    "nodes_supported_by_webnn": 147,
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
      "Sqrt",
      "Unsqueeze"
    ]
  },
  {
    "name": "whisper_tiny_encoder",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "error": "Failed to execute 'conv2d' on 'MLGraphBuilder': The length of strides should be 2.",
    "partitions_supported_by_webnn": 48,
    "nodes_in_the_graph": 243,
    "nodes_supported_by_webnn": 196,
    "supported": [
      "Add",
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
    "name": "sd_1_5_unet_fp16",
    "backend": "cpu",
    "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
    "partitions_supported_by_webnn": 3,
    "nodes_in_the_graph": 2224,
    "nodes_supported_by_webnn": 3,
    "supported": [
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
      "Pow: FLOAT16",
      "ReduceMean: FLOAT16",
      "Reshape: FLOAT16",
      "Sigmoid: FLOAT16",
      "Slice: FLOAT16",
      "Softmax: FLOAT16",
      "Sub: FLOAT16",
      "Transpose: FLOAT16"
    ]
  },
  {
    "name": "sd_1_5_unet_fp16",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 379,
    "nodes_in_the_graph": 2218,
    "nodes_supported_by_webnn": 1692,
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
      "Resize",
      "Sigmoid",
      "Slice",
      "Softmax",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "Cos",
      "Erf",
      "Expand",
      "InstanceNormalization",
      "MatMul",
      "Sin",
      "Sqrt",
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
    "partitions_supported_by_webnn": 38,
    "nodes_in_the_graph": 295,
    "nodes_supported_by_webnn": 257,
    "supported": [
      "Add",
      "Conv",
      "Mul",
      "Reshape",
      "Resize",
      "Sigmoid",
      "Softmax",
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "InstanceNormalization",
      "MatMul"
    ]
  },
  {
    "name": "segment_anything_fp16",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
    "partitions_supported_by_webnn": 27,
    "nodes_in_the_graph": 587,
    "nodes_supported_by_webnn": 72,
    "supported": [
      "Add",
      "Div",
      "Mul",
      "ReduceMean",
      "Resize",
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
      "Gemm: FLOAT16",
      "Mul: FLOAT16",
      "Neg: INT64",
      "Pow: FLOAT16",
      "ReduceMean: FLOAT16",
      "ReduceSum: FLOAT16",
      "Relu: FLOAT16",
      "Reshape: FLOAT16",
      "Shape: FLOAT16",
      "Slice: FLOAT16",
      "Slice: INT64",
      "Softmax: FLOAT16",
      "Split: FLOAT16",
      "Sub: FLOAT16",
      "Transpose: FLOAT16"
    ]
  },
  {
    "name": "segment_anything_fp16",
    "backend": "gpu",
    "error": "Failed to execute 'constant' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 78,
    "nodes_in_the_graph": 333,
    "nodes_supported_by_webnn": 232,
    "supported": [
      "Add",
      "Concat",
      "Conv",
      "ConvTranspose",
      "Div",
      "Gemm",
      "Mul",
      "Pow",
      "ReduceMean",
      "Relu",
      "Reshape",
      "Resize",
      "Slice",
      "Softmax",
      "Split",
      "Sub",
      "Transpose"
    ],
    "not_supported": [
      "ArgMax",
      "Cast",
      "Cos",
      "Equal",
      "Erf",
      "Expand",
      "Flatten",
      "Gather",
      "LayerNormalization",
      "MatMul",
      "Not",
      "Sin",
      "Sqrt",
      "Unsqueeze"
    ]
  },
  {
    "name": "mobilenet_v2_12_int8",
    "backend": "cpu",
    "error": "",
    "not_supported": [
      "DequantizeLinear",
      "QLinearAdd",
      "QLinearConv",
      "QLinearGlobalAveragePool",
      "QLinearMatMul",
      "QuantizeLinear",
      "Reshape"
    ],
    "input_type_not_supported": [
      "Reshape: UINT8"
    ]
  },
  {
    "name": "mobilenet_v2_12_int8",
    "backend": "gpu",
    "error": "",
    "not_supported": [
      "DequantizeLinear",
      "QLinearAdd",
      "QLinearConv",
      "QLinearGlobalAveragePool",
      "QLinearMatMul",
      "QuantizeLinear",
      "Reshape"
    ],
    "input_type_not_supported": [
      "Reshape: UINT8"
    ]
  },
  {
    "name": "albert_base_v2_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    ]
  },
  {
    "name": "albert_base_v2_int8",
    "backend": "gpu",
    "error": "",
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
    ]
  },
  {
    "name": "bart_large_cnn_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
      "Reshape: INT64"
    ]
  },
  {
    "name": "bart_large_cnn_int8",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 137,
    "nodes_in_the_graph": 969,
    "nodes_supported_by_webnn": 707,
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
    ]
  },
  {
    "name": "bert_base_cased_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    ]
  },
  {
    "name": "bert_base_cased_int8",
    "backend": "gpu",
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
    ]
  },
  {
    "name": "bert_base_uncased_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    ]
  },
  {
    "name": "bert_base_uncased_int8",
    "backend": "gpu",
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
    ]
  },
  {
    "name": "bert_base_multilingual_cased_ner_hrl_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    ]
  },
  {
    "name": "bert_base_multilingual_cased_ner_hrl_int8",
    "backend": "gpu",
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
    ]
  },
  {
    "name": "bert_base_multilingual_uncased_sentiment_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    ]
  },
  {
    "name": "bert_base_multilingual_uncased_sentiment_int8",
    "backend": "gpu",
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
    ]
  },
  {
    "name": "clip_vit_base_patch16_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
    "partitions_supported_by_webnn": 253,
    "nodes_in_the_graph": 1928,
    "nodes_supported_by_webnn": 1419,
    "supported": [
      "Abs",
      "Add",
      "Concat",
      "Div",
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
      "Flatten",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Reshape",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "clip_vit_base_patch16_int8",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 254,
    "nodes_in_the_graph": 1928,
    "nodes_supported_by_webnn": 1420,
    "supported": [
      "Abs",
      "Add",
      "Concat",
      "Div",
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
      "Flatten",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "detr_resnet_50_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Resample2d only supports Linear mode.",
    "partitions_supported_by_webnn": 224,
    "nodes_in_the_graph": 1724,
    "nodes_supported_by_webnn": 1206,
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
      "Resize",
      "Sigmoid",
      "Slice",
      "Softmax",
      "Sub",
      "Transpose"
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
      "Sin",
      "Slice",
      "Sqrt",
      "Transpose",
      "Unsqueeze",
      "Where"
    ],
    "input_type_not_supported": [
      "Transpose: BOOL"
    ]
  },
  {
    "name": "detr_resnet_50_int8",
    "backend": "gpu",
    "error": "",
    "partitions_supported_by_webnn": 224,
    "nodes_in_the_graph": 1690,
    "nodes_supported_by_webnn": 1173,
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
      "Resize",
      "Sigmoid",
      "Slice",
      "Softmax",
      "Sub",
      "Transpose"
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
      "Sin",
      "Slice",
      "Sqrt",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "dino_vitb16_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "name": "distilbart_cnn_6_6_encoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
      "Reshape: INT64"
    ]
  },
  {
    "name": "distilbart_cnn_6_6_encoder_int8",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 71,
    "nodes_in_the_graph": 495,
    "nodes_supported_by_webnn": 359,
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
    ]
  },
  {
    "name": "distilbart_cnn_6_6_decoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    ]
  },
  {
    "name": "distilbart_cnn_6_6_decoder_int8",
    "backend": "gpu",
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
    ]
  },
  {
    "name": "distilbert_base_cased_distilled_squad_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
    "partitions_supported_by_webnn": 69,
    "nodes_in_the_graph": 457,
    "nodes_supported_by_webnn": 312,
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
      "Split",
      "Sqrt",
      "Squeeze",
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
    "partitions_supported_by_webnn": 70,
    "nodes_in_the_graph": 457,
    "nodes_supported_by_webnn": 313,
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
      "Split",
      "Sqrt",
      "Squeeze",
      "Where"
    ]
  },
  {
    "name": "distilbert_base_uncased_mnli_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "partitions_supported_by_webnn": 71,
    "nodes_in_the_graph": 462,
    "nodes_supported_by_webnn": 317,
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
      "Sqrt",
      "Where"
    ]
  },
  {
    "name": "distilgpt2_decoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
      "Reshape: INT64"
    ]
  },
  {
    "name": "distilgpt2_decoder_int8",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 59,
    "nodes_in_the_graph": 479,
    "nodes_supported_by_webnn": 368,
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
      "Sqrt",
      "Unsqueeze",
      "Where"
    ]
  },
  {
    "name": "distil_medium_en_decoder_int8",
    "backend": "cpu",
    "error": ""
  },
  {
    "name": "distil_medium_en_decoder_int8",
    "backend": "gpu",
    "error": ""
  },
  {
    "name": "t5_small_decoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
    "partitions_supported_by_webnn": 106,
    "nodes_in_the_graph": 590,
    "nodes_supported_by_webnn": 376,
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
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Reshape",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "t5_small_decoder_int8",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
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
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Sqrt",
      "Unsqueeze"
    ]
  },
  {
    "name": "t5_small_encoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
    "partitions_supported_by_webnn": 63,
    "nodes_in_the_graph": 351,
    "nodes_supported_by_webnn": 218,
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
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Reshape",
      "Sqrt",
      "Unsqueeze"
    ],
    "input_type_not_supported": [
      "Reshape: INT64"
    ]
  },
  {
    "name": "t5_small_encoder_int8",
    "backend": "gpu",
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
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
      "Transpose"
    ],
    "not_supported": [
      "Cast",
      "DequantizeLinear",
      "DynamicQuantizeLinear",
      "Gather",
      "MatMul",
      "MatMulInteger",
      "QuantizeLinear",
      "Sqrt",
      "Unsqueeze"
    ]
  },
  {
    "name": "vit_base_patch16_224_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "name": "vit_gpt2_image_captioning_decoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "error": "Failed to execute 'input' on 'MLGraphBuilder': Failed to read the 'dataType' property from 'MLOperandDescriptor': The provided value 'int64' is not a valid enum value of type MLOperandDataType.",
    "partitions_supported_by_webnn": 208,
    "nodes_in_the_graph": 1471,
    "nodes_supported_by_webnn": 1104,
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
      "Split",
      "Sqrt",
      "Where"
    ]
  },
  {
    "name": "vit_gpt2_image_captioning_encoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "name": "whisper_tiny_decoder_int8",
    "backend": "cpu",
    "error": ""
  },
  {
    "name": "whisper_tiny_decoder_int8",
    "backend": "gpu",
    "error": ""
  },
  {
    "name": "whisper_tiny_encoder_int8",
    "backend": "cpu",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "partitions_supported_by_webnn": 49,
    "nodes_in_the_graph": 341,
    "nodes_supported_by_webnn": 248,
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
  }

]