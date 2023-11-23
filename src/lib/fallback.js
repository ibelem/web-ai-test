export const fallbackEnv = {
  "version": '121.0.6142.1',
  'last_update': 'Nov 23, 2023'
}
export const fallback = [
  {
    "name": "densenet",
    "backend": "cpu",
    "supported": [
      "Transpose",
      "Conv",
      "Relu",
      "MaxPool",
      "Mul",
      "Add",
      "Concat",
      "AveragePool",
      "GlobalAveragePool"
    ],
    "not_supported": [
      "BatchNormalization"
    ],
    "partitions_supported_by_webnn": 63,
    "nodes_in_the_graph": 617,
    "nodes_supported_by_webnn": 555,
    "input_type_not_supported": []
  },
  {
    "name": "densenet",
    "backend": "gpu",
    "supported": [
      "Transpose",
      "Conv",
      "Relu",
      "MaxPool",
      "Mul",
      "Add",
      "Concat",
      "AveragePool",
      "GlobalAveragePool"
    ],
    "not_supported": [
      "BatchNormalization"
    ],
    "partitions_supported_by_webnn": 63,
    "nodes_in_the_graph": 491,
    "nodes_supported_by_webnn": 429,
    "input_type_not_supported": []
  },
  {
    "name": "efficientnet_lite",
    "backend": "cpu",
    "supported": [
      "Conv",
      "Clip",
      "Add",
      "AveragePool",
      "Gemm",
      "Softmax"
    ],
    "not_supported": [
      "Squeeze"
    ],
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 179,
    "nodes_supported_by_webnn": 178,
    "input_type_not_supported": []
  },
  {
    "name": "efficientnet_lite",
    "backend": "gpu",
    "supported": [
      "Conv",
      "Clip",
      "Add",
      "AveragePool",
      "Gemm",
      "Softmax",
      "Transpose"
    ],
    "not_supported": [
      "Squeeze"
    ],
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 180,
    "nodes_supported_by_webnn": 179,
    "input_type_not_supported": []
  },
  {
    "name": "mobilenet_v2",
    "backend": "cpu",
    "supported": [
      "Transpose",
      "Conv",
      "Clip",
      "Add",
      "GlobalAveragePool",
      "Reshape",
      "Gemm"
    ],
    "not_supported": [],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 102,
    "nodes_supported_by_webnn": 102,
    "input_type_not_supported": []
  },
  {
    "name": "mobilenet_v2",
    "backend": "gpu",
    "supported": [
      "Transpose",
      "Conv",
      "Clip",
      "Add",
      "GlobalAveragePool",
      "Reshape",
      "Gemm"
    ],
    "not_supported": [],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 100,
    "nodes_supported_by_webnn": 100,
    "input_type_not_supported": []
  },
  {
    "name": "mobilenet_v2_12",
    "backend": "cpu",
    "supported": [
      "Transpose",
      "Conv",
      "Clip",
      "Add",
      "GlobalAveragePool",
      "Reshape",
      "Gemm"
    ],
    "not_supported": [],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 102,
    "nodes_supported_by_webnn": 102,
    "input_type_not_supported": []
  },
  {
    "name": "mobilenet_v2_12",
    "backend": "gpu",
    "supported": [
      "Transpose",
      "Conv",
      "Clip",
      "Add",
      "GlobalAveragePool",
      "Reshape",
      "Gemm"
    ],
    "not_supported": [],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 100,
    "nodes_supported_by_webnn": 100,
    "input_type_not_supported": []
  },
  {
    "name": "resnet50_v1",
    "backend": "cpu",
    "supported": [
      "Transpose",
      "Conv",
      "Relu",
      "MaxPool",
      "Add",
      "GlobalAveragePool",
      "Gemm"
    ],
    "not_supported": [
      "Flatten"
    ],
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 124,
    "nodes_supported_by_webnn": 123,
    "input_type_not_supported": []
  },
  {
    "name": "resnet50_v1",
    "backend": "gpu",
    "supported": [
      "Transpose",
      "Conv",
      "Relu",
      "MaxPool",
      "Add",
      "GlobalAveragePool",
      "Gemm"
    ],
    "not_supported": [
      "Flatten"
    ],
    "partitions_supported_by_webnn": 2,
    "nodes_in_the_graph": 122,
    "nodes_supported_by_webnn": 121,
    "input_type_not_supported": []
  },
  {
    "name": "resnet50_v2",
    "backend": "cpu",
    "supported": [
      "Transpose",
      "Conv",
      "Relu",
      "MaxPool",
      "Add",
      "GlobalAveragePool",
      "Reshape",
      "Gemm"
    ],
    "not_supported": [
      "BatchNormalization"
    ],
    "partitions_supported_by_webnn": 18,
    "nodes_in_the_graph": 177,
    "nodes_supported_by_webnn": 159,
    "input_type_not_supported": []
  },
  {
    "name": "resnet50_v2",
    "backend": "gpu",
    "supported": [
      "Transpose",
      "Conv",
      "Relu",
      "MaxPool",
      "Add",
      "GlobalAveragePool",
      "Reshape",
      "Gemm"
    ],
    "not_supported": [
      "BatchNormalization"
    ],
    "partitions_supported_by_webnn": 18,
    "nodes_in_the_graph": 141,
    "nodes_supported_by_webnn": 123,
    "input_type_not_supported": []
  },
  {
    "name": "squeezenet",
    "backend": "cpu",
    "supported": [
      "Transpose",
      "Conv",
      "Relu",
      "MaxPool",
      "Concat",
      "AveragePool",
      "Reshape"
    ],
    "not_supported": [],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 67,
    "nodes_supported_by_webnn": 67,
    "input_type_not_supported": []
  },
  {
    "name": "squeezenet",
    "backend": "gpu",
    "supported": [
      "Transpose",
      "Conv",
      "Relu",
      "MaxPool",
      "Concat",
      "AveragePool",
      "Reshape"
    ],
    "not_supported": [],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 65,
    "nodes_supported_by_webnn": 65,
    "input_type_not_supported": []
  },
  {
    "name": "deeplab_v3",
    "backend": "cpu",
    "supported": [
      "Conv",
      "Clip",
      "Add",
      "AveragePool",
      "Relu",
      "Resize",
      "Concat"
    ],
    "not_supported": [
      "ArgMax"
    ],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 108,
    "nodes_supported_by_webnn": 107,
    "input_type_not_supported": []
  },
  {
    "name": "deeplab_v3",
    "backend": "gpu",
    "supported": [
      "Conv",
      "Clip",
      "Add",
      "AveragePool",
      "Relu",
      "Resize",
      "Concat",
      "Transpose"
    ],
    "not_supported": [
      "ArgMax"
    ],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 109,
    "nodes_supported_by_webnn": 108,
    "input_type_not_supported": []
  },
  {
    "name": "selfie_segmentation_general",
    "backend": "cpu",
    "supported": [
      "Conv",
      "Add",
      "Clip",
      "Mul",
      "Relu",
      "AveragePool",
      "Sigmoid",
      "Resize",
      "ConvTranspose"
    ],
    "not_supported": [],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 170,
    "nodes_supported_by_webnn": 170,
    "input_type_not_supported": []
  },
  {
    "name": "selfie_segmentation_landscape",
    "backend": "cpu",
    "supported": [
      "Conv",
      "Add",
      "Clip",
      "Mul",
      "Relu",
      "GlobalAveragePool",
      "Sigmoid",
      "Transpose",
      "ConvTranspose"
    ],
    "not_supported": [
      "Upsample"
    ],
    "partitions_supported_by_webnn": 4,
    "nodes_in_the_graph": 176,
    "nodes_supported_by_webnn": 173,
    "input_type_not_supported": []
  },
  {
    "name": "emotion_ferplus",
    "backend": "cpu",
    "supported": [
      "Sub",
      "Div",
      "Transpose",
      "Conv",
      "Relu",
      "MaxPool",
      "Reshape",
      "Gemm"
    ],
    "not_supported": [],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 34,
    "nodes_supported_by_webnn": 34,
    "input_type_not_supported": []
  },
  {
    "name": "emotion_ferplus",
    "backend": "gpu",
    "supported": [
      "Sub",
      "Div",
      "Transpose",
      "Conv",
      "Relu",
      "MaxPool",
      "Reshape",
      "Gemm"
    ],
    "not_supported": [],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 32,
    "nodes_supported_by_webnn": 32,
    "input_type_not_supported": []
  },
  {
    "name": "fns_candy",
    "backend": "gpu",
    "supported": [
      "Pad",
      "Transpose",
      "Conv",
      "Relu"
    ],
    "not_supported": [
      "ImageScaler",
      "InstanceNormalization",
      "Crop",
      "Add",
      "Conv",
      "Relu",
      "ConvTranspose",
      "Tanh",
      "Affine",
      "Mul"
    ],
    "partitions_supported_by_webnn": 6,
    "nodes_in_the_graph": 59,
    "nodes_supported_by_webnn": 10,
    "input_type_not_supported": []
  },
  {
    "name": "realesrgan_x4_64_fp32",
    "backend": "gpu",
    "supported": [
      "Transpose",
      "Conv",
      "LeakyRelu",
      "Concat",
      "Add",
      "Mul",
      "Resize"
    ],
    "not_supported": [
      "Resize"
    ],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "input_type_not_supported": []
  },
  {
    "name": "realesrgan_x4_128_fp32",
    "backend": "gpu",
    "supported": [
      "Transpose",
      "Conv",
      "LeakyRelu",
      "Concat",
      "Add",
      "Mul",
      "Resize"
    ],
    "not_supported": [
      "Resize"
    ],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "input_type_not_supported": []
  },
  {
    "name": "realesrgan_x4_256_fp32",
    "backend": "gpu",
    "supported": [
      "Transpose",
      "Conv",
      "LeakyRelu",
      "Concat",
      "Add",
      "Mul",
      "Resize"
    ],
    "not_supported": [
      "Resize"
    ],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "input_type_not_supported": []
  },
  {
    "name": "realesrgan_x4_512_fp32",
    "backend": "gpu",
    "supported": [
      "Transpose",
      "Conv",
      "LeakyRelu",
      "Concat",
      "Add",
      "Mul",
      "Resize"
    ],
    "not_supported": [
      "Resize"
    ],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 1024,
    "nodes_supported_by_webnn": 1024,
    "input_type_not_supported": []
  },
  {
    "name": "tinyyolo_v2",
    "backend": "cpu",
    "supported": [
      "Mul",
      "Add",
      "Transpose",
      "Conv",
      "LeakyRelu",
      "MaxPool"
    ],
    "not_supported": [
      "BatchNormalization"
    ],
    "partitions_supported_by_webnn": 9,
    "nodes_in_the_graph": 51,
    "nodes_supported_by_webnn": 43,
    "input_type_not_supported": []
  },
  {
    "name": "tinyyolo_v2",
    "backend": "gpu",
    "supported": [
      "Mul",
      "Add",
      "Transpose",
      "Conv",
      "LeakyRelu",
      "MaxPool"
    ],
    "not_supported": [
      "BatchNormalization"
    ],
    "partitions_supported_by_webnn": 9,
    "nodes_in_the_graph": 33,
    "nodes_supported_by_webnn": 25,
    "input_type_not_supported": []
  },
  {
    "name": "sd_1_5_vae_decoder_fp16",
    "backend": "cpu",
    "supported": [
      "Softmax"
    ],
    "not_supported": [
      "Mul",
      "Conv",
      "Reshape",
      "InstanceNormalization",
      "Add",
      "Sigmoid",
      "Transpose",
      "MatMul",
      "Cast",
      "Resize"
    ],
    "partitions_supported_by_webnn": 1,
    "nodes_in_the_graph": 295,
    "nodes_supported_by_webnn": 1,
    "input_type_not_supported": [
      "Mul: FLOAT16",
      "Conv: FLOAT16",
      "Reshape: FLOAT16",
      "Add: FLOAT16",
      "Sigmoid: FLOAT16",
      "Transpose: FLOAT16",
      "MatMul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "sd_1_5_vae_decoder_fp16",
    "backend": "gpu",
    "supported": [
      "Softmax",
      "Mul",
      "Conv",
      "Reshape",
      "Add",
      "Sigmoid",
      "Transpose",
      "MatMul",
      "Resize"
    ],
    "not_supported": [
      "Mul",
      "Conv",
      "Reshape",
      "InstanceNormalization",
      "Add",
      "Sigmoid",
      "Transpose",
      "MatMul",
      "Cast",
      "Resize"
    ],
    "partitions_supported_by_webnn": 33,
    "nodes_in_the_graph": 295,
    "nodes_supported_by_webnn": 263,
    "input_type_not_supported": [
      "Mul: FLOAT16",
      "Conv: FLOAT16",
      "Reshape: FLOAT16",
      "Add: FLOAT16",
      "Sigmoid: FLOAT16",
      "Transpose: FLOAT16",
      "MatMul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "sd_2_1_vae_decoder",
    "backend": "cpu",
    "supported": [],
    "not_supported": [
      "Sqrt",
      "Div",
      "Cast",
      "Conv",
      "Reshape",
      "InstanceNormalization",
      "Mul",
      "Add",
      "Sigmoid",
      "Transpose",
      "MatMul",
      "Softmax",
      "Resize",
      "ReduceMax",
      "Sub",
      "Exp",
      "ReduceSum"
    ],
    "partitions_supported_by_webnn": 0,
    "nodes_in_the_graph": 0,
    "nodes_supported_by_webnn": 0,
    "input_type_not_supported": [
      "Sqrt: FLOAT16",
      "Div: FLOAT16",
      "Conv: FLOAT16",
      "Reshape: FLOAT16",
      "Mul: FLOAT16",
      "Add: FLOAT16",
      "Sigmoid: FLOAT16",
      "Transpose: FLOAT16",
      "MatMul: FLOAT16",
      "Softmax: FLOAT16",
      "Resize: FLOAT16",
      "ReduceMax: FLOAT16",
      "Sub: FLOAT16",
      "Exp: FLOAT16",
      "ReduceSum: FLOAT16"
    ]
  },
  {
    "name": "mobilenet_v2_fp16",
    "backend": "cpu",
    "supported": [],
    "not_supported": [
      "Conv",
      "Clip",
      "Add",
      "Reshape"
    ],
    "partitions_supported_by_webnn": 0,
    "nodes_in_the_graph": 0,
    "nodes_supported_by_webnn": 0,
    "input_type_not_supported": [
      "Conv: FLOAT16",
      "Clip: FLOAT16",
      "Add: FLOAT16",
      "Reshape: FLOAT16"
    ]
  },
  {
    "name": "squeezenet_fp16",
    "backend": "cpu",
    "supported": [],
    "not_supported": [
      "Conv",
      "Relu",
      "MaxPool",
      "Concat",
      "GlobalAveragePool",
      "Softmax"
    ],
    "partitions_supported_by_webnn": 0,
    "nodes_in_the_graph": 0,
    "nodes_supported_by_webnn": 0,
    "input_type_not_supported": [
      "Conv: FLOAT16",
      "Relu: FLOAT16",
      "MaxPool: FLOAT16",
      "Concat: FLOAT16",
      "GlobalAveragePool: FLOAT16",
      "Softmax: FLOAT16"
    ]
  },
  {
    "name": "realesrgan_x4_64_fp16",
    "backend": "cpu",
    "supported": [],
    "not_supported": [
      "Conv",
      "LeakyRelu",
      "Concat",
      "Add",
      "Mul",
      "Resize",
      "CastLike",
      "Less",
      "Where",
      "Cast"
    ],
    "partitions_supported_by_webnn": 0,
    "nodes_in_the_graph": 0,
    "nodes_supported_by_webnn": 0,
    "input_type_not_supported": [
      "Conv: FLOAT16",
      "LeakyRelu: FLOAT16",
      "Concat: FLOAT16",
      "Add: FLOAT16",
      "Mul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "realesrgan_x4_128_fp16",
    "backend": "cpu",
    "supported": [],
    "not_supported": [
      "Conv",
      "LeakyRelu",
      "Concat",
      "Add",
      "Mul",
      "Resize",
      "CastLike",
      "Less",
      "Where",
      "Cast"
    ],
    "partitions_supported_by_webnn": 0,
    "nodes_in_the_graph": 0,
    "nodes_supported_by_webnn": 0,
    "input_type_not_supported": [
      "Conv: FLOAT16",
      "LeakyRelu: FLOAT16",
      "Concat: FLOAT16",
      "Add: FLOAT16",
      "Mul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "realesrgan_x4_256_fp16",
    "backend": "cpu",
    "supported": [],
    "not_supported": [
      "Conv",
      "LeakyRelu",
      "Concat",
      "Add",
      "Mul",
      "Resize",
      "CastLike",
      "Less",
      "Where",
      "Cast"
    ],
    "partitions_supported_by_webnn": 0,
    "nodes_in_the_graph": 0,
    "nodes_supported_by_webnn": 0,
    "input_type_not_supported": [
      "Conv: FLOAT16",
      "LeakyRelu: FLOAT16",
      "Concat: FLOAT16",
      "Add: FLOAT16",
      "Mul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "realesrgan_x4_512_fp16",
    "backend": "cpu",
    "supported": [],
    "not_supported": [
      "Conv",
      "LeakyRelu",
      "Concat",
      "Add",
      "Mul",
      "Resize",
      "CastLike",
      "Less",
      "Where",
      "Cast"
    ],
    "partitions_supported_by_webnn": 0,
    "nodes_in_the_graph": 0,
    "nodes_supported_by_webnn": 0,
    "input_type_not_supported": [
      "Conv: FLOAT16",
      "LeakyRelu: FLOAT16",
      "Concat: FLOAT16",
      "Add: FLOAT16",
      "Mul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "realesrgan_x4_1024_fp16",
    "backend": "cpu",
    "supported": [],
    "not_supported": [
      "Conv",
      "LeakyRelu",
      "Concat",
      "Add",
      "Mul",
      "Resize",
      "CastLike",
      "Less",
      "Where",
      "Cast"
    ],
    "partitions_supported_by_webnn": 0,
    "nodes_in_the_graph": 0,
    "nodes_supported_by_webnn": 0,
    "input_type_not_supported": [
      "Conv: FLOAT16",
      "LeakyRelu: FLOAT16",
      "Concat: FLOAT16",
      "Add: FLOAT16",
      "Mul: FLOAT16",
      "Resize: FLOAT16"
    ]
  },
  {
    "name": "mobilenet_v2_12_int8",
    "backend": "cpu",
    "supported": [],
    "not_supported": [
      "QuantizeLinear",
      "QLinearConv",
      "QLinearAdd",
      "QLinearGlobalAveragePool",
      "Reshape",
      "QLinearMatMul",
      "DequantizeLinear"
    ],
    "partitions_supported_by_webnn": 0,
    "nodes_in_the_graph": 0,
    "nodes_supported_by_webnn": 0,
    "input_type_not_supported": [
      "Reshape: UINT8"
    ]
  },
  {
    "name": "mobilenet_v2_12_int8",
    "backend": "gpu",
    "supported": [],
    "not_supported": [
      "QuantizeLinear",
      "QLinearConv",
      "QLinearAdd",
      "QLinearGlobalAveragePool",
      "Reshape",
      "QLinearMatMul",
      "DequantizeLinear"
    ],
    "partitions_supported_by_webnn": 0,
    "nodes_in_the_graph": 0,
    "nodes_supported_by_webnn": 0,
    "input_type_not_supported": [
      "Reshape: UINT8"
    ]
  }
]