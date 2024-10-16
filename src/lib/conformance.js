export const conformanceEnv = {
  "windows": 'Windows 11',
  "version": '122.0.6199.0',
  'last_update': 'Dec 27, 2023'
}


export const conformance = [{
  "name": "albert_base_v2",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "input tensor[0] check failed: expected type 'int32' but got int64",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      33.38951301574707,
      33.37293243408203,
      33.334235191345215
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.00023651123046875,
      0.00020599365234375,
      0.00018310546875
    ]
  }
},
{
  "name": "bart_large_cnn",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      3.3474311009049416,
      3.2973439693450928,
      3.1554124653339386
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to create identity dml operator to implement expand operation.",
    "max_diff": []
  }
},
{
  "name": "bert_base_cased",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      17.209242582321167,
      16.718894004821777,
      16.349547505378723
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to create identity dml operator to implement expand operation.",
    "max_diff": [
      0.00021839141845703125,
      0.00019979476928710938,
      0.00019502639770507812
    ]
  }
},
{
  "name": "bert_base_uncased",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      12.097976684570312,
      12.090683460235596,
      12.047224998474121
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00010204315185546875,
      0.00010156631469726562,
      0.00010061264038085938
    ]
  }
},
{
  "name": "clip_vit_base_patch16",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v14",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      23.596741676330566
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to create identity dml operator to implement expand operation.",
    "max_diff": [
      0.00010204315185546875,
      0.00010156631469726562,
      0.00010061264038085938
    ]
  }
},
{
  "name": "codegen_350m_mono",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "only support ONNX model with IR_VERSION>=3",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      23.596741676330566
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to create identity dml operator to implement expand operation.",
    "max_diff": [
      0.00012493133544921875,
      0.00012302398681640625,
      0.00012111663818359375
    ]
  }
},
{
  "name": "deeplab_v3",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ArgMax' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to create identity dml operator to implement expand operation.",
    "max_diff": []
  }
},
{
  "name": "densenet",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000006794929504394531,
      0.000006556510925292969,
      0.000006496906280517578
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      11.510278224945068,
      7.810117959976196,
      7.092913389205933
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000007510185241699219,
      0.000005304813385009766,
      0.000005245208740234375
    ]
  }
},
{
  "name": "detr_resnet_50",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.000006794929504394531,
      0.000006556510925292969,
      0.000006496906280517578
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      17.822755128145218,
      17.732417918741703,
      17.528581202030182
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.042156219482421875,
      0.0413358211517334,
      0.035083770751953125
    ]
  }
},
{
  "name": "dino_vitb16",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": [
      0.000006794929504394531,
      0.000006556510925292969,
      0.000006496906280517578
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      32.69708061218262,
      32.629987716674805,
      32.41153144836426
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000110626220703125,
      0.0000896453857421875,
      0.000080108642578125
    ]
  }
},
{
  "name": "distil_medium_en_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      13.976814270019531,
      13.397911071777344,
      13.210067749023438
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00016021728515625,
      0.00014495849609375,
      0.0001373291015625
    ]
  }
},
{
  "name": "distil_medium_en_encoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Transpose] 1259393608\" failed. Error: Transpose requires 1 input.",
    "max_diff": [
      13.976814270019531,
      13.397911071777344,
      13.210067749023438
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0015869140625,
      0.0013055801391601562,
      0.0012922286987304688
    ]
  }
},
{
  "name": "distilbert_base_uncased",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      13.051748752593994,
      12.853779315948486,
      12.734652519226074
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create equal operator.",
    "max_diff": []
  }
},
{
  "name": "distilbert_base_uncased_mnli",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      2.906608507037163,
      2.351063035428524,
      1.9506558179855347
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create equal operator.",
    "max_diff": []
  }
},
{
  "name": "efficientnet_lite",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": [
      1.0943040251731873e-8,
      1.0710209608078003e-8,
      1.0710209608078003e-8
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.01184381265193224,
      0.011605177307501435,
      0.011337515898048878
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create equal operator.",
    "max_diff": [
      1.6298145055770874e-8,
      1.257285475730896e-8,
      1.1408701539039612e-8
    ]
  }
},
{
  "name": "emotion_ferplus",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": [
      0.0000016689300537109375,
      0.0000016689300537109375,
      4.76837158203125e-7
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000016689300537109375,
      0.0000010728836059570312,
      9.685754776000977e-7
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create equal operator.",
    "max_diff": [
      0.0008299350738525391,
      0.000277690589427948,
      0.0002448558807373047
    ]
  }
},
{
  "name": "flan_t5_small_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v13",
    "max_diff": [
      0.0000016689300537109375,
      0.0000016689300537109375,
      4.76837158203125e-7
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      46.863200545310974,
      46.86319637298584,
      46.86319637298584
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create equal operator.",
    "max_diff": [
      0.000087738037109375,
      0.000080108642578125,
      0.0000762939453125
    ]
  }
},
{
  "name": "flan_t5_small_encoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.6190033555030823,
      0.6190032660961151,
      0.6190032362937927
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      9.98377799987793e-7,
      9.76957380771637e-7,
      9.611248970031738e-7
    ]
  }
},
{
  "name": "fns_candy",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Crop' with opsets: ai.onnx v7",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "max_diff": [
      0.6190033555030823,
      0.6190032660961151,
      0.6190032362937927
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      112.70199584960938,
      106.85770797729492,
      89.81424713134766
    ]
  }
},
{
  "name": "gpt2_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "dims.forEach is not a function"
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "dims.forEach is not a function",
    "max_diff": [
      0.6190033555030823,
      0.6190032660961151,
      0.6190032362937927
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "dims.forEach is not a function",
    "max_diff": [
      112.70199584960938,
      106.85770797729492,
      89.81424713134766
    ]
  }
},
{
  "name": "m2m100_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": []
  }
},
{
  "name": "m2m100_encoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'CumSum' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      3.827578544616699,
      3.7939682006835938,
      3.776263952255249
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create equal operator.",
    "max_diff": []
  }
},
{
  "name": "mobilenet_v2",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'CumSum' with opsets: ai.onnx v11",
    "max_diff": [
      0.000016450881958007812,
      0.00001621246337890625,
      0.00001621246337890625
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      5.939446449279785,
      5.828056812286377,
      5.096329569816589
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create equal operator.",
    "max_diff": [
      0.000041604042053222656,
      0.00004029273986816406,
      0.000039696693420410156
    ]
  }
},
{
  "name": "mobilenet_v2_12",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'CumSum' with opsets: ai.onnx v11",
    "max_diff": [
      0.000016450881958007812,
      0.00001621246337890625,
      0.00001621246337890625
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      7.8720488250255585,
      4.638053596019745,
      4.588278651237488
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create equal operator.",
    "max_diff": [
      0.000041604042053222656,
      0.00004029273986816406,
      0.000039696693420410156
    ]
  }
},
{
  "name": "mobilenet_v3",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'HardSwish' with opsets: ai.onnx v17",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      5.266820907592773,
      5.1238550543785095,
      5.105825066566467
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": []
  }
},
{
  "name": "mobilevit_small",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "cannot resolve operator 'HardSwish' with opsets: ai.onnx v17",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      27.443352222442627,
      26.507712244987488,
      26.398580312728882
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.000738188624382019,
      0.0006301403045654297,
      0.0005985498428344727
    ]
  }
},
{
  "name": "msmarco_distilbert_base_v4",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      2.1477367877960205,
      2.147050142288208,
      2.109988033771515
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create equal operator.",
    "max_diff": [
      0.000738188624382019,
      0.0006301403045654297,
      0.0005985498428344727
    ]
  }
},
{
  "name": "mt5_small_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'DynamicQuantizeLinear' with opsets: ai.onnx v13",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00002288818359375,
      0.00002288818359375,
      0.00002288818359375
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create identity operator.",
    "max_diff": [
      0.000738188624382019,
      0.0006301403045654297,
      0.0005985498428344727
    ]
  }
},
{
  "name": "mt5_small_encoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'DequantizeLinear' with opsets: ai.onnx v13",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.06810641288757324,
      0.048030734062194824,
      0.04422581195831299
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create identity operator.",
    "max_diff": [
      0.000738188624382019,
      0.0006301403045654297,
      0.0005985498428344727
    ]
  }
},
{
  "name": "realesrgan_x4_1024_fp32",
  "gpu": "IA",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "realesrgan_x4_128_fp32",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to compile shader: \nShader source:\n#version 300 es\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    in vec2 TexCoords;\n    out vec4 outputColor;\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    // Custom vector types to handle higher dimenalities.\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    \n    uniform sampler2D Im2Col;\nuniform sampler2D K;\nuniform sampler2D B;\n    \n      vec2 offsetToCoords(int offset, int width, int height) {\n        int t = offset / width;\n        int s = offset - t*width;\n        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);\n        return coords;\n      }\n      \n\n      int coordsToOffset(vec2 coords, int width, int height) {\n        float s = coords.s * float(width);\n        float t = coords.t * float(height);\n        int offset = int(t) * width + int(s);\n        return offset;\n      }\n      \n\n      void toVec(vec2 texCoords, out int c[4]) {\n        int offset = coordsToOffset(texCoords, 8192, 128);\n        \n        c[0] = offset / 1048576;\n        offset -= c[0] * 1048576;\n        c[1] = offset / 16384;\n        offset -= c[1] * 16384;\n        c[2] = offset / 128;\n        offset -= c[2] * 128;\n        c[3] = offset;\n      }\n      void toVec(int offset, out int c[4]) {\n        \n        c[0] = offset / 1048576;\n        offset -= c[0] * 1048576;\n        c[1] = offset / 16384;\n        offset -= c[1] * 16384;\n        c[2] = offset / 128;\n        offset -= c[2] * 128;\n        c[3] = offset;\n      }\n    \n\n      int indicesToOffset_B(int indices[1]) {\n        int offset = 0;\n        \n        offset += indices[0] * 1;\n        \n        return offset;\n      }\n      \nhighp float decode(highp vec4 rgba) {\n        return rgba.r;\n      }\n        \n\n        float getColorAsFloat(vec4 color) {\n            return decode(color);\n        }\n        \n\n        float _B(int m[1]) {\n          int offset = indicesToOffset_B(m);\n          vec2 coords = offsetToCoords(offset, 1, 64);\n          float value = getColorAsFloat(texture(B, coords));\n          return value;\n        }\n        \n\n    \n\nfloat process(int indices[4]) {\n  int b[1];\n  b[0] = indices[1];\n  int im2col[4];\n  im2col[0] = indices[0];\n  im2col[1] = indices[2];\n  im2col[2] = indices[3];\n  int im2colOffset = im2col[0] * 2359296 + im2col[1] * 18432 + im2col[2] * 144;\n  int kernelOffset = indices[1] * 144;\n  float value = _B(b);\n  for (int i = 0; i < 144; ++i) {\n    vec2 im2colCoords = offsetToCoords(im2colOffset, 144, 16384);\n    vec2 kernelCoords = offsetToCoords(kernelOffset, 144, 64);\n    value += dot(texture(Im2Col, im2colCoords), texture(K, kernelCoords));\n    ++im2colOffset;\n    ++kernelOffset;\n  }\n  \n  return value;\n}\n      \n  void main() {\n    int indices[4];\n    toVec(TexCoords, indices);\n    vec4 result = vec4(process(indices));\n    outputColor = result;\n  }\n  ",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0009764432907104492,
      0.0009294748306274414,
      0.0008859038352966309
    ]
  }
},
{
  "name": "realesrgan_x4_256_fp32",
  "gpu": "IA",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "realesrgan_x4_512_fp32",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to compile shader: \nShader source:\n#version 300 es\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    in vec2 TexCoords;\n    out vec4 outputColor;\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    // Custom vector types to handle higher dimenalities.\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    \n    uniform sampler2D Im2Col;\nuniform sampler2D K;\nuniform sampler2D B;\n    \n      vec2 offsetToCoords(int offset, int width, int height) {\n        int t = offset / width;\n        int s = offset - t*width;\n        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);\n        return coords;\n      }\n      \n\n      int coordsToOffset(vec2 coords, int width, int height) {\n        float s = coords.s * float(width);\n        float t = coords.t * float(height);\n        int offset = int(t) * width + int(s);\n        return offset;\n      }\n      \n\n      void toVec(vec2 texCoords, out int c[4]) {\n        int offset = coordsToOffset(texCoords, 4096, 4096);\n        \n        c[0] = offset / 16777216;\n        offset -= c[0] * 16777216;\n        c[1] = offset / 262144;\n        offset -= c[1] * 262144;\n        c[2] = offset / 512;\n        offset -= c[2] * 512;\n        c[3] = offset;\n      }\n      void toVec(int offset, out int c[4]) {\n        \n        c[0] = offset / 16777216;\n        offset -= c[0] * 16777216;\n        c[1] = offset / 262144;\n        offset -= c[1] * 262144;\n        c[2] = offset / 512;\n        offset -= c[2] * 512;\n        c[3] = offset;\n      }\n    \n\n      int indicesToOffset_B(int indices[1]) {\n        int offset = 0;\n        \n        offset += indices[0] * 1;\n        \n        return offset;\n      }\n      \nhighp float decode(highp vec4 rgba) {\n        return rgba.r;\n      }\n        \n\n        float getColorAsFloat(vec4 color) {\n            return decode(color);\n        }\n        \n\n        float _B(int m[1]) {\n          int offset = indicesToOffset_B(m);\n          vec2 coords = offsetToCoords(offset, 1, 64);\n          float value = getColorAsFloat(texture(B, coords));\n          return value;\n        }\n        \n\n    \n\nfloat process(int indices[4]) {\n  int b[1];\n  b[0] = indices[1];\n  int im2col[4];\n  im2col[0] = indices[0];\n  im2col[1] = indices[2];\n  im2col[2] = indices[3];\n  int im2colOffset = im2col[0] * 37748736 + im2col[1] * 73728 + im2col[2] * 144;\n  int kernelOffset = indices[1] * 144;\n  float value = _B(b);\n  for (int i = 0; i < 144; ++i) {\n    vec2 im2colCoords = offsetToCoords(im2colOffset, 6144, 6144);\n    vec2 kernelCoords = offsetToCoords(kernelOffset, 144, 64);\n    value += dot(texture(Im2Col, im2colCoords), texture(K, kernelCoords));\n    ++im2colOffset;\n    ++kernelOffset;\n  }\n  \n  return value;\n}\n      \n  void main() {\n    int indices[4];\n    toVec(TexCoords, indices);\n    vec4 result = vec4(process(indices));\n    outputColor = result;\n  }\n  ",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "max_diff": []
  }
},
{
  "name": "realesrgan_x4_64_fp32",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "resize (packed) does not support mode: 'nearest'",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0012232065200805664,
      0.0011976361274719238,
      0.0011892318725585938
    ]
  }
},
{
  "name": "resnet50_v1",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "resize (packed) does not support mode: 'nearest'",
    "max_diff": [
      0.000005125999450683594,
      0.0000050067901611328125,
      0.00000476837158203125
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      7.336547434329987,
      6.814261585474014,
      6.7657630443573
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      2.9157959818840027,
      2.7844046354293823,
      2.7417203783988953
    ]
  }
},
{
  "name": "resnet50_v2",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000011444091796875,
      0.000006616115570068359,
      0.0000064373016357421875
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      3.9936503171920776,
      3.3503682613372803,
      3.248608034104109
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0017006993293762207,
      0.0016607046127319336,
      0.0015892982482910156
    ]
  }
},
{
  "name": "sam_b_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 1, ERROR_MESSAGE: Non-zero status code returned while running Resize node. Name:'/Resize_1' Status Message: upsamplebase.h:345 ScalesValidation Scale value should be greater than 0."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v17",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Resize] 43330664\" failed. Error: no GPU data for output: 0",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create gather operator.",
    "max_diff": []
  }
},
{
  "name": "sam_b_encoder",
  "gpu": "IA",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "sam_vit_base",
  "gpu": "IA",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "sam_vit_base_prompt_encoder_mask_decoder",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "WebGpuBackend: Failed to get GPU adapter.",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create gather operator.",
    "max_diff": []
  }
},
{
  "name": "sam_vit_base_vision_encoder",
  "gpu": "IA",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "segment_anything",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "offset is out of bounds"
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Split' with opsets: ai.onnx v17, com.microsoft.nchwc v1, ai.onnx.ml v3, com.ms.internal.nhwc v18, ai.onnx.training v1, ai.onnx.preview.training v1, com.microsoft v1, com.microsoft.experimental v1, org.pytorch.aten v1, com.microsoft.dml v1",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "offset is out of bounds",
    "max_diff": [
      6.134488105773926,
      6.1335484981536865,
      6.100045800209045
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to create identity dml operator to implement expand operation.",
    "max_diff": [
      0.33737099170684814,
      0.33737099170684814,
      0.33737099170684814
    ]
  }
},
{
  "name": "selfie_segmentation_general",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'Split' with opsets: ai.onnx v17, com.microsoft.nchwc v1, ai.onnx.ml v3, com.ms.internal.nhwc v18, ai.onnx.training v1, ai.onnx.preview.training v1, com.microsoft v1, com.microsoft.experimental v1, org.pytorch.aten v1, com.microsoft.dml v1",
    "max_diff": [
      1.0000000596046448,
      1.0000000596046448,
      1.0000000596046448
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.554187536239624,
      0.554187536239624,
      0.554187536239624
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      5.960464477589711e-8,
      5.960464477539863e-8,
      5.960464477539614e-8
    ]
  }
},
{
  "name": "selfie_segmentation_landscape",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'Split' with opsets: ai.onnx v17, com.microsoft.nchwc v1, ai.onnx.ml v3, com.ms.internal.nhwc v18, ai.onnx.training v1, ai.onnx.preview.training v1, com.microsoft v1, com.microsoft.experimental v1, org.pytorch.aten v1, com.microsoft.dml v1",
    "max_diff": [
      1.0000000596046448,
      1.0000000596046448,
      1.0000000596046448
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.9050596356391907,
      0.9050596356391907,
      0.9050596356391907
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      5.960479330063926e-8,
      5.960476908888686e-8,
      5.960475245845882e-8
    ]
  }
},
{
  "name": "squeezebert_uncased",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": [
      1.0000000596046448,
      1.0000000596046448,
      1.0000000596046448
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": []
  }
},
{
  "name": "squeezenet",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": [
      0.000011563301086425781,
      0.000011563301086425781,
      0.000011086463928222656
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      4.761427342891693,
      4.74394679069519,
      4.697716623544693
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00000476837158203125,
      0.000003814697265625,
      0.000003814697265625
    ]
  }
},
{
  "name": "sd_2_1_vae_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.000011563301086425781,
      0.000011563301086425781,
      0.000011086463928222656
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.5044900178909302,
      0.48897770047187805,
      0.4888308048248291
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.07062754034996033,
      0.0615498423576355,
      0.05582559108734131
    ]
  }
},
{
  "name": "sd_2_1_vae_encoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      38.25035026669502,
      29.92469012737274,
      29.52024358510971
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.015822172164916992,
      0.0148162841796875,
      0.01385498046875
    ]
  }
},
{
  "name": "t5_small_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      49.747586488723755,
      49.747586250305176,
      49.747586250305176
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.0000457763671875,
      0.000041961669921875,
      0.000041961669921875
    ]
  }
},
{
  "name": "t5_small_encoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.810014296323061,
      0.8100142888724804,
      0.8100142776966095
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000020563602447509766,
      0.0000017285346984863281,
      0.0000016987323760986328
    ]
  }
},
{
  "name": "tinyyolo_v2",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v13",
    "max_diff": [
      0.000010930001735687256,
      0.00000959634780883789,
      0.00000903010368347168
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00002193450927734375,
      0.00002002716064453125,
      0.00001895427703857422
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.007975101470947266,
      0.007841706275939941,
      0.007765412330627441
    ]
  }
},
{
  "name": "whisper_tiny_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.000010930001735687256,
      0.00000959634780883789,
      0.00000903010368347168
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      21.30232048034668,
      20.312785148620605,
      19.718436241149902
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000457763671875,
      0.0000457763671875,
      0.0000457763671875
    ]
  }
},
{
  "name": "whisper_tiny_encoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": [
      0.000010930001735687256,
      0.00000959634780883789,
      0.00000903010368347168
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      15.329277038574219,
      15.307855606079102,
      15.307456016540527
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00014638900756835938,
      0.00009918212890625,
      0.00007319450378417969
    ]
  }
},
{
  "name": "xlm_roberta_base",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": [
      0.000010930001735687256,
      0.00000959634780883789,
      0.00000903010368347168
    ]
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      15.329277038574219,
      15.307855606079102,
      15.307456016540527
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.00014638900756835938,
      0.00009918212890625,
      0.00007319450378417969
    ]
  }
},
{
  "name": "bert_base_multilingual_cased_ner_hrl",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000057220458984375,
      0.0000040531158447265625,
      0.0000027418136596679688
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000003814697265625,
      0.0000029802322387695312,
      0.0000021457672119140625
    ]
  }
},
{
  "name": "bert_base_multilingual_uncased_sentiment",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.2802811488509178,
      0.25040028244256973,
      0.21392244845628738
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000035390257835388184,
      0.0000033080577850341797,
      0.000002905726432800293
    ]
  }
},
{
  "name": "distilbart_cnn_6_6_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      34.76414495706558,
      33.54916241765022,
      33.54629558324814
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to create identity dml operator to implement expand operation.",
    "max_diff": []
  }
},
{
  "name": "distilbart_cnn_6_6_encoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 1, ERROR_MESSAGE: Non-zero status code returned while running Resize node. Name:'/Resize_1' Status Message: upsamplebase.h:345 ScalesValidation Scale value should be greater than 0."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Resize] 43330664\" failed. Error: no GPU data for output: 0",
    "max_diff": [
      1.973664402961731,
      1.9544406533241272,
      1.9540172219276428
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to create identity dml operator to implement expand operation.",
    "max_diff": []
  }
},
{
  "name": "distilbert_base_cased_distilled_squad",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 1, ERROR_MESSAGE: Non-zero status code returned while running Resize node. Name:'/Resize_1' Status Message: upsamplebase.h:345 ScalesValidation Scale value should be greater than 0."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Split] 269651288\" failed. Error: Failed to generate kernel's output[0] with dims [1,262,2]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: 533196088",
    "max_diff": [
      1.973664402961731,
      1.9544406533241272,
      1.9540172219276428
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create equal operator.",
    "max_diff": []
  }
},
{
  "name": "distilgpt2_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000133514404296875,
      0.00012969970703125,
      0.00012969970703125
    ]
  }
},
{
  "name": "vit_base_patch16_224",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      4.061344027519226,
      3.9368819296360016,
      3.7573360204696655
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000003337860107421875,
      0.000003039836883544922,
      0.00000286102294921875
    ]
  }
},
{
  "name": "vit_gpt2_image_captioning_decoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.0055084228515625,
      0.005401611328125,
      0.00531005859375
    ]
  }
},
{
  "name": "vit_gpt2_image_captioning_encoder",
  "gpu": "IA",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      2.1085802018642426,
      2.0824245512485504,
      2.07527394592762
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00016808509826660156,
      0.00005626678466796875,
      0.00004850327968597412
    ]
  }
},

{
  "name": "bart_large_cnn",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      3.3474311009049416,
      3.2973439693450928,
      3.1554124653339386
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0005121231079101562,
      0.00019991397857666016,
      0.00015471875667572021
    ]
  }
},
{
  "name": "bert_base_cased",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      17.209242582321167,
      16.718894004821777,
      16.349547505378723
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000064849853515625,
      0.00006461143493652344,
      0.00006313621997833252
    ]
  }
},
{
  "name": "bert_base_uncased",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      12.097976684570312,
      12.090683460235596,
      12.047224998474121
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0001049041748046875,
      0.00010395050048828125,
      0.000102996826171875
    ]
  }
},
{
  "name": "clip_vit_base_patch16",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v14",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      23.596741676330566
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000171661376953125
    ]
  }
},
{
  "name": "codegen_350m_mono",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "only support ONNX model with IR_VERSION>=3",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      23.596741676330566
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00012493133544921875,
      0.00012302398681640625,
      0.00012111663818359375
    ]
  }
},
{
  "name": "deeplab_v3",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ArgMax' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      11,
      11,
      11
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": []
  }
},
{
  "name": "densenet",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'ArgMax' with opsets: ai.onnx v13",
    "max_diff": [
      0.000006794929504394531,
      0.000006556510925292969,
      0.000006496906280517578
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      12.870842814445496,
      11.79231309890747,
      10.751255989074707
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000008821487426757812,
      0.000008821487426757812,
      0.00000858306884765625
    ]
  }
},
{
  "name": "detr_resnet_50",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.000006794929504394531,
      0.000006556510925292969,
      0.000006496906280517578
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      17.69161355495453,
      17.60128764808178,
      17.403537154197693
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.04217338562011719,
      0.04138612747192383,
      0.035101890563964844
    ]
  }
},
{
  "name": "dino_vitb16",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": [
      0.000006794929504394531,
      0.000006556510925292969,
      0.000006496906280517578
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      32.69708061218262,
      32.629987716674805,
      32.41153144836426
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0001277923583984375,
      0.00008392333984375,
      0.000080108642578125
    ]
  }
},
{
  "name": "distil_medium_en_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      10.1580810546875,
      9.966197967529297,
      9.705230712890625
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00016021728515625,
      0.00014495849609375,
      0.0001373291015625
    ]
  }
},
{
  "name": "distil_medium_en_encoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Transpose] 1259393608\" failed. Error: Transpose requires 1 input.",
    "max_diff": [
      10.1580810546875,
      9.966197967529297,
      9.705230712890625
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0015621185302734375,
      0.0014934539794921875,
      0.0014410018920898438
    ]
  }
},
{
  "name": "distilbert_base_uncased",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      13.051748752593994,
      12.853779315948486,
      12.734652519226074
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00019919872283935547,
      0.0001983642578125,
      0.0001976490020751953
    ]
  }
},
{
  "name": "distilbert_base_uncased_mnli",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      2.906608507037163,
      2.351063035428524,
      1.9506558179855347
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000029802322387695312,
      0.0000016689300537109375
    ]
  }
},
{
  "name": "efficientnet_lite",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      1.0943040251731873e-8,
      1.0710209608078003e-8,
      1.0710209608078003e-8
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.3030359090771526,
      0.2582338082138449,
      0.2425632412196137
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      1.6298145055770874e-8,
      1.1641532182693481e-8,
      1.0244548320770264e-8
    ]
  }
},
{
  "name": "emotion_ferplus",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000016689300537109375,
      0.0000016689300537109375,
      4.76837158203125e-7
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000016689300537109375,
      0.0000010728836059570312,
      9.685754776000977e-7
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0008203983306884766,
      0.0002774372696876526,
      0.00024366378784179688
    ]
  }
},
{
  "name": "flan_t5_small_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v13",
    "max_diff": [
      0.0000016689300537109375,
      0.0000016689300537109375,
      4.76837158203125e-7
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      46.863200545310974,
      46.86319637298584,
      46.86319637298584
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000080108642578125,
      0.000080108642578125,
      0.000080108642578125
    ]
  }
},
{
  "name": "flan_t5_small_encoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.6190033555030823,
      0.6190032660961151,
      0.6190032362937927
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000010728836059570312,
      0.0000010281801223754883,
      0.0000010132789611816406
    ]
  }
},
{
  "name": "fns_candy",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Crop' with opsets: ai.onnx v7",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "max_diff": [
      0.6190033555030823,
      0.6190032660961151,
      0.6190032362937927
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      112.58638000488281,
      106.75559616088867,
      89.71975708007812
    ]
  }
},
{
  "name": "gpt2_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "dims.forEach is not a function"
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "dims.forEach is not a function",
    "max_diff": [
      0.6190033555030823,
      0.6190032660961151,
      0.6190032362937927
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "dims.forEach is not a function",
    "max_diff": [
      112.58638000488281,
      106.75559616088867,
      89.71975708007812
    ]
  }
},
{
  "name": "m2m100_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.6190033555030823,
      0.6190032660961151,
      0.6190032362937927
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      112.58638000488281,
      106.75559616088867,
      89.71975708007812
    ]
  }
},
{
  "name": "m2m100_encoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'CumSum' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      3.827578544616699,
      3.7939682006835938,
      3.776263952255249
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.0000041425228118896484,
      0.0000040531158447265625,
      0.0000040531158447265625
    ]
  }
},
{
  "name": "mobilenet_v2",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'CumSum' with opsets: ai.onnx v11",
    "max_diff": [
      0.000016450881958007812,
      0.00001621246337890625,
      0.00001621246337890625
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      5.896218776702881,
      5.7853100299835205,
      5.424070954322815
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.00004374980926513672,
      0.00004172325134277344,
      0.00003981590270996094
    ]
  }
},
{
  "name": "mobilenet_v2_12",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'CumSum' with opsets: ai.onnx v11",
    "max_diff": [
      0.000016450881958007812,
      0.00001621246337890625,
      0.00001621246337890625
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      5.896218776702881,
      5.7853100299835205,
      5.424070954322815
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.00004374980926513672,
      0.00004172325134277344,
      0.00003981590270996094
    ]
  }
},
{
  "name": "mobilenet_v3",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'HardSwish' with opsets: ai.onnx v17",
    "max_diff": [
      0.000016450881958007812,
      0.00001621246337890625,
      0.00001621246337890625
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      6.857086181640625,
      6.133522629737854,
      5.558514356613159
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.00004374980926513672,
      0.00004172325134277344,
      0.00003981590270996094
    ]
  }
},
{
  "name": "mobilevit_small",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "cannot resolve operator 'HardSwish' with opsets: ai.onnx v17",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      40.96002221107483,
      34.49267578125,
      33.995140075683594
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.0007492750883102417,
      0.0006580352783203125,
      0.0006177425384521484
    ]
  }
},
{
  "name": "msmarco_distilbert_base_v4",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      2.1477367877960205,
      2.147050142288208,
      2.109988033771515
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.000006496906280517578,
      0.000006079673767089844,
      0.0000059604644775390625
    ]
  }
},
{
  "name": "mt5_small_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'DynamicQuantizeLinear' with opsets: ai.onnx v13",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.00002288818359375,
      0.00002288818359375,
      0.00002288818359375
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.000030517578125,
      0.000030517578125,
      0.000030517578125
    ]
  }
},
{
  "name": "mt5_small_encoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'DequantizeLinear' with opsets: ai.onnx v13",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.06810641288757324,
      0.048030734062194824,
      0.04422581195831299
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.05367523431777954,
      0.05249452590942383,
      0.05195820331573486
    ]
  }
},
{
  "name": "realesrgan_x4_1024_fp32",
  "gpu": "IX",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "realesrgan_x4_128_fp32",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to compile shader: \nShader source:\n#version 300 es\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    in vec2 TexCoords;\n    out vec4 outputColor;\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    // Custom vector types to handle higher dimenalities.\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    \n    uniform sampler2D Im2Col;\nuniform sampler2D K;\nuniform sampler2D B;\n    \n      vec2 offsetToCoords(int offset, int width, int height) {\n        int t = offset / width;\n        int s = offset - t*width;\n        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);\n        return coords;\n      }\n      \n\n      int coordsToOffset(vec2 coords, int width, int height) {\n        float s = coords.s * float(width);\n        float t = coords.t * float(height);\n        int offset = int(t) * width + int(s);\n        return offset;\n      }\n      \n\n      void toVec(vec2 texCoords, out int c[4]) {\n        int offset = coordsToOffset(texCoords, 8192, 128);\n        \n        c[0] = offset / 1048576;\n        offset -= c[0] * 1048576;\n        c[1] = offset / 16384;\n        offset -= c[1] * 16384;\n        c[2] = offset / 128;\n        offset -= c[2] * 128;\n        c[3] = offset;\n      }\n      void toVec(int offset, out int c[4]) {\n        \n        c[0] = offset / 1048576;\n        offset -= c[0] * 1048576;\n        c[1] = offset / 16384;\n        offset -= c[1] * 16384;\n        c[2] = offset / 128;\n        offset -= c[2] * 128;\n        c[3] = offset;\n      }\n    \n\n      int indicesToOffset_B(int indices[1]) {\n        int offset = 0;\n        \n        offset += indices[0] * 1;\n        \n        return offset;\n      }\n      \nhighp float decode(highp vec4 rgba) {\n        return rgba.r;\n      }\n        \n\n        float getColorAsFloat(vec4 color) {\n            return decode(color);\n        }\n        \n\n        float _B(int m[1]) {\n          int offset = indicesToOffset_B(m);\n          vec2 coords = offsetToCoords(offset, 1, 64);\n          float value = getColorAsFloat(texture(B, coords));\n          return value;\n        }\n        \n\n    \n\nfloat process(int indices[4]) {\n  int b[1];\n  b[0] = indices[1];\n  int im2col[4];\n  im2col[0] = indices[0];\n  im2col[1] = indices[2];\n  im2col[2] = indices[3];\n  int im2colOffset = im2col[0] * 2359296 + im2col[1] * 18432 + im2col[2] * 144;\n  int kernelOffset = indices[1] * 144;\n  float value = _B(b);\n  for (int i = 0; i < 144; ++i) {\n    vec2 im2colCoords = offsetToCoords(im2colOffset, 144, 16384);\n    vec2 kernelCoords = offsetToCoords(kernelOffset, 144, 64);\n    value += dot(texture(Im2Col, im2colCoords), texture(K, kernelCoords));\n    ++im2colOffset;\n    ++kernelOffset;\n  }\n  \n  return value;\n}\n      \n  void main() {\n    int indices[4];\n    toVec(TexCoords, indices);\n    vec4 result = vec4(process(indices));\n    outputColor = result;\n  }\n  ",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0009790658950805664,
      0.0008960962295532227,
      0.0008537173271179199
    ]
  }
},
{
  "name": "realesrgan_x4_256_fp32",
  "gpu": "IX",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "realesrgan_x4_512_fp32",
  "gpu": "IX",
  "webgpu": {
    "error": "crash"
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "max_diff": []
  }
},
{
  "name": "realesrgan_x4_64_fp32",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "resize (packed) does not support mode: 'nearest'",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.001246333122253418,
      0.0012222528457641602,
      0.0012115240097045898
    ]
  }
},
{
  "name": "resnet50_v1",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "resize (packed) does not support mode: 'nearest'",
    "max_diff": [
      0.000005125999450683594,
      0.0000050067901611328125,
      0.00000476837158203125
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      10.282863855361938,
      8.448967218399048,
      7.790903568267822
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0034165680408477783,
      0.0033472180366516113,
      0.0032221078872680664
    ]
  }
},
{
  "name": "resnet50_v2",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "resize (packed) does not support mode: 'nearest'",
    "max_diff": [
      0.000011444091796875,
      0.000006616115570068359,
      0.0000064373016357421875
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      6.48945689201355,
      6.09247550368309,
      6.020538792014122
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0017012953758239746,
      0.0016503334045410156,
      0.0015981197357177734
    ]
  }
},
{
  "name": "sam_b_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 1, ERROR_MESSAGE: Non-zero status code returned while running Resize node. Name:'/Resize_1' Status Message: upsamplebase.h:345 ScalesValidation Scale value should be greater than 0."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v17",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Resize] 43330664\" failed. Error: no GPU data for output: 0",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "failed to call OrtRun(). ERROR_CODE: 1, ERROR_MESSAGE: Non-zero status code returned while running Resize node. Name:'/Resize_1' Status Message: upsamplebase.h:345 ScalesValidation Scale value should be greater than 0.",
    "max_diff": []
  }
},
{
  "name": "sam_b_encoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.775623694062233,
      0.7736928164958954,
      0.770184800028801
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "max_diff": []
  }
},
{
  "name": "sam_vit_base",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.07714486122131348,
      0.0380784273147583,
      0.012905299663543701
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "max_diff": []
  }
},
{
  "name": "sam_vit_base_prompt_encoder_mask_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 1, ERROR_MESSAGE: Non-zero status code returned while running Resize node. Name:'/Resize_1' Status Message: upsamplebase.h:345 ScalesValidation Scale value should be greater than 0."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Resize] 43330664\" failed. Error: no GPU data for output: 0",
    "max_diff": [
      0.011669129133224487,
      0.006672859191894531,
      0.00010073184967041016
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create gather operator.",
    "max_diff": []
  }
},
{
  "name": "sam_vit_base_vision_encoder",
  "gpu": "IX",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "segment_anything",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Split' with opsets: ai.onnx v17, com.microsoft.nchwc v1, ai.onnx.ml v3, com.ms.internal.nhwc v18, ai.onnx.training v1, ai.onnx.preview.training v1, com.microsoft v1, com.microsoft.experimental v1, org.pytorch.aten v1, com.microsoft.dml v1",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      7.847261935472488,
      7.837342768907547,
      7.836942404508591
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00018739700317382812,
      0.0001850724220275879,
      0.00018286705017089844
    ]
  }
},
{
  "name": "selfie_segmentation_general",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      1.0000000596046448,
      1.0000000596046448,
      1.0000000596046448
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.554187536239624,
      0.554187536239624,
      0.554187536239624
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      5.960464477589734e-8,
      5.960464477539865e-8,
      5.960464477539616e-8
    ]
  }
},
{
  "name": "selfie_segmentation_landscape",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      1.0000000596046448,
      1.0000000596046448,
      1.0000000596046448
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.7858695387840271,
      0.7858695387840271,
      0.7858695387840271
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      5.960479380023962e-8,
      5.960476954133798e-8,
      5.960475231533058e-8
    ]
  }
},
{
  "name": "squeezebert_uncased",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": []
  }
},
{
  "name": "squeezenet",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Uniform Im2Col not found.",
    "max_diff": [
      0.000011563301086425781,
      0.000011563301086425781,
      0.000011086463928222656
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      4.952257394790649,
      4.855574280023575,
      4.759401768445969
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "max_diff": [
      0.000004291534423828125,
      0.0000040531158447265625,
      0.000003814697265625
    ]
  }
},
{
  "name": "sd_2_1_vae_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.000011563301086425781,
      0.000011563301086425781,
      0.000011086463928222656
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.5044900178909302,
      0.48897770047187805,
      0.4888308048248291
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to record commands and bind resources for execution.",
    "max_diff": [
      0.0749686062335968,
      0.07239368557929993,
      0.07136225700378418
    ]
  }
},
{
  "name": "sd_2_1_vae_encoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      38.06181827187538,
      29.98255930840969,
      29.423725336790085
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.012973308563232422,
      0.012963294982910156,
      0.012957572937011719
    ]
  }
},
{
  "name": "t5_small_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      49.747586488723755,
      49.747586250305176,
      49.747586250305176
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.00006866455078125,
      0.000064849853515625,
      0.000064849853515625
    ]
  }
},
{
  "name": "t5_small_encoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.810014296323061,
      0.8100142888724804,
      0.8100142776966095
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000019776634871959686,
      0.0000017881393432617188,
      0.0000017583370208740234
    ]
  }
},
{
  "name": "tinyyolo_v2",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000010930001735687256,
      0.00000959634780883789,
      0.00000903010368347168
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00002193450927734375,
      0.00002002716064453125,
      0.00001895427703857422
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.007991790771484375,
      0.007845401763916016,
      0.007765769958496094
    ]
  }
},
{
  "name": "whisper_tiny_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      23.507308959960938,
      22.9509859085083,
      22.619447708129883
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000457763671875,
      0.0000457763671875,
      0.0000457763671875
    ]
  }
},
{
  "name": "whisper_tiny_encoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      15.329221725463867,
      15.30799674987793,
      15.307649612426758
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00007486343383789062,
      0.00005054473876953125,
      0.000045299530029296875
    ]
  }
},
{
  "name": "xlm_roberta_base",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      15.329221725463867,
      15.30799674987793,
      15.307649612426758
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.00007486343383789062,
      0.00005054473876953125,
      0.000045299530029296875
    ]
  }
},
{
  "name": "bert_base_multilingual_cased_ner_hrl",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000057220458984375,
      0.0000040531158447265625,
      0.0000027418136596679688
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000003814697265625,
      0.0000029802322387695312,
      0.0000021457672119140625
    ]
  }
},
{
  "name": "bert_base_multilingual_uncased_sentiment",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.2802811488509178,
      0.25040028244256973,
      0.21392244845628738
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00000476837158203125,
      0.000004626810550689697,
      0.0000033527612686157227
    ]
  }
},
{
  "name": "distilbart_cnn_6_6_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      34.76414495706558,
      33.54916241765022,
      33.54629558324814
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.00011444091796875,
      0.000110626220703125,
      0.00009918212890625
    ]
  }
},
{
  "name": "distilbart_cnn_6_6_encoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      1.973664402961731,
      1.9544406533241272,
      1.9540172219276428
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00004029273986816406,
      0.000038623809814453125,
      0.00003790855407714844
    ]
  }
},
{
  "name": "distilbert_base_cased_distilled_squad",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Split] 269651288\" failed. Error: Failed to generate kernel's output[0] with dims [1,262,2]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: 533196088",
    "max_diff": [
      1.973664402961731,
      1.9544406533241272,
      1.9540172219276428
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000247955322265625,
      0.000019073486328125,
      0.0000152587890625
    ]
  }
},
{
  "name": "distilgpt2_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000133514404296875,
      0.00012969970703125,
      0.00012969970703125
    ]
  }
},
{
  "name": "vit_base_patch16_224",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      4.061344027519226,
      3.9368819296360016,
      3.7573360204696655
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000003337860107421875,
      0.000003159046173095703,
      0.0000030994415283203125
    ]
  }
},
{
  "name": "vit_gpt2_image_captioning_decoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.0059661865234375,
      0.00592041015625,
      0.005889892578125
    ]
  }
},
{
  "name": "vit_gpt2_image_captioning_encoder",
  "gpu": "IX",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      2.1085802018642426,
      2.0824245512485504,
      2.07527394592762
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00013434886932373047,
      0.00010776519775390625,
      0.00009763240814208984
    ]
  }
},
{
  "name": "albert_base_v2",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "input tensor[0] check failed: expected type 'int32' but got int64",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "crash",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.000209808349609375,
      0.0001983642578125,
      0.000186920166015625
    ]
  }
},
{
  "name": "bart_large_cnn",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      1.6673560738563538,
      1.600584328174591,
      1.2053453736007214
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0006394386291503906,
      0.0002498626708984375,
      0.0001935213804244995
    ]
  }
},
{
  "name": "bert_base_cased",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0001583099365234375,
      0.00015354156494140625,
      0.00014209747314453125
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0003161430358886719,
      0.0002741813659667969,
      0.00026416778564453125
    ]
  }
},
{
  "name": "bert_base_multilingual_cased_ner_hrl",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000026226043701171875,
      0.0000025033950805664062,
      0.0000019073486328125
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000001430511474609375,
      0.0000013113021850585938,
      0.0000011920928955078125
    ]
  }
},
{
  "name": "bert_base_multilingual_uncased_sentiment",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000002816319465637207,
      0.000002771615982055664,
      0.0000025331974029541016
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000006206333637237549,
      0.000006198883056640625,
      0.000005081295967102051
    ]
  }
},
{
  "name": "bert_base_uncased",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000102996826171875,
      0.00010251998901367188,
      0.0000972747802734375
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00010585784912109375,
      0.00010251998901367188,
      0.00010204315185546875
    ]
  }
},
{
  "name": "clip_vit_base_patch16",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v14",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000171661376953125
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000133514404296875
    ]
  }
},
{
  "name": "codegen_350m_mono",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "only support ONNX model with IR_VERSION>=3",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      0.0000171661376953125
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000049591064453125,
      0.000049591064453125,
      0.00004673004150390625
    ]
  }
},
{
  "name": "deeplab_v3",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ArgMax' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": []
  }
},
{
  "name": "densenet",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'ArgMax' with opsets: ai.onnx v13",
    "max_diff": [
      0.000006556510925292969,
      0.000006198883056640625,
      0.0000059604644775390625
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      0.00001049041748046875,
      0.000010251998901367188,
      0.000009931623935699463
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000006377696990966797,
      0.000006079673767089844,
      0.000006057322025299072
    ]
  }
},
{
  "name": "detr_resnet_50",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.000006556510925292969,
      0.000006198883056640625,
      0.0000059604644775390625
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      3.6950864791870117,
      2.8552427291870117,
      2.527867376804352
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00008869171142578125,
      0.00008487701416015625,
      0.00008106231689453125
    ]
  }
},
{
  "name": "dino_vitb16",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": [
      0.000006556510925292969,
      0.000006198883056640625,
      0.0000059604644775390625
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      0.0001163482666015625,
      0.000087738037109375,
      0.00008392333984375
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000591278076171875,
      0.00005626678466796875,
      0.00005340576171875
    ]
  }
},
{
  "name": "distil_medium_en_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.000006556510925292969,
      0.000006198883056640625,
      0.0000059604644775390625
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Sub] 1445238128\" failed. TypeError: Cannot read properties of undefined (reading 'dataType')",
    "max_diff": [
      0.0001373291015625,
      0.0001373291015625,
      0.00012969970703125
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000152587890625,
      0.00014495849609375,
      0.00012969970703125
    ]
  }
},
{
  "name": "distil_medium_en_encoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Transpose] 1259393608\" failed. Error: Transpose requires 1 input.",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0017642974853515625,
      0.0014467239379882812,
      0.001247406005859375
    ]
  }
},
{
  "name": "distilbart_cnn_6_6_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "crash"
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.000118255615234375,
      0.00011444091796875,
      0.000110626220703125
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.00008392333984375,
      0.00008392333984375,
      0.00008392333984375
    ]
  }
},
{
  "name": "distilbart_cnn_6_6_encoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.1399591565132141,
      0.06383085250854492,
      0.06308043003082275
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000031948089599609375,
      0.00003170967102050781,
      0.00002956390380859375
    ]
  }
},
{
  "name": "distilbert_base_cased_distilled_squad",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Split] 269651288\" failed. Error: Failed to generate kernel's output[0] with dims [1,262,2]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: 533196088",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000011444091796875,
      0.0000095367431640625,
      0.0000095367431640625
    ]
  }
},
{
  "name": "distilbert_base_uncased",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Split] 269651288\" failed. Error: Failed to generate kernel's output[0] with dims [1,262,2]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: 533196088",
    "max_diff": [
      5.251593589782715,
      5.217927694320679,
      5.199874401092529
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00018930435180664062,
      0.0001876354217529297,
      0.00018739700317382812
    ]
  }
},
{
  "name": "distilbert_base_uncased_mnli",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Split] 269651288\" failed. Error: Failed to generate kernel's output[0] with dims [1,262,2]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: 533196088",
    "max_diff": [
      0.3404064178466797,
      0.2906765937805176,
      0.15689444541931152
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000025033950805664062,
      0.0000016689300537109375,
      2.384185791015625e-7
    ]
  }
},
{
  "name": "distilgpt2_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "[WebGPU] Kernel \"[Split] 269651288\" failed. Error: Failed to generate kernel's output[0] with dims [1,262,2]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: 533196088",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000141143798828125,
      0.000141143798828125,
      0.0001373291015625
    ]
  }
},
{
  "name": "efficientnet_lite",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      9.546056389808655e-9,
      8.847564458847046e-9,
      8.381903171539307e-9
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Split] 269651288\" failed. Error: Failed to generate kernel's output[0] with dims [1,262,2]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: 533196088",
    "max_diff": [
      1.1175870895385742e-8,
      9.778887033462524e-9,
      8.614733815193176e-9
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      1.1175870895385742e-8,
      8.847564458847046e-9,
      7.2177499532699585e-9
    ]
  }
},
{
  "name": "emotion_ferplus",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.0000016689300537109375,
      0.0000016689300537109375,
      4.76837158203125e-7
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "[WebGPU] Kernel \"[Split] 269651288\" failed. Error: Failed to generate kernel's output[0] with dims [1,262,2]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: 533196088",
    "max_diff": [
      0.0000016689300537109375,
      0.0000010728836059570312,
      9.685754776000977e-7
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      6.556510925292969e-7,
      4.954636096954346e-7,
      4.76837158203125e-7
    ]
  }
},
{
  "name": "flan_t5_small_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000118255615234375,
      0.000110626220703125,
      0.000110626220703125
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.0000762939453125,
      0.0000762939453125,
      0.0000762939453125
    ]
  }
},
{
  "name": "flan_t5_small_encoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000010728836059570312,
      0.000001043081283569336,
      0.0000010132789611816406
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      7.748603820800781e-7,
      7.450580596923828e-7,
      7.450580596923828e-7
    ]
  }
},
{
  "name": "fns_candy",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Crop' with opsets: ai.onnx v7",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "max_diff": [
      0.0000010728836059570312,
      0.000001043081283569336,
      0.0000010132789611816406
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      112.75996398925781,
      107.00114059448242,
      89.95167541503906
    ]
  }
},
{
  "name": "gpt2_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "dims.forEach is not a function"
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "dims.forEach is not a function",
    "max_diff": [
      0.0000010728836059570312,
      0.000001043081283569336,
      0.0000010132789611816406
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "dims.forEach is not a function",
    "max_diff": [
      112.75996398925781,
      107.00114059448242,
      89.95167541503906
    ]
  }
},
{
  "name": "m2m100_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.0000010728836059570312,
      0.000001043081283569336,
      0.0000010132789611816406
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      112.75996398925781,
      107.00114059448242,
      89.95167541503906
    ]
  }
},
{
  "name": "m2m100_encoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'CumSum' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      3.827578544616699,
      3.7939682006835938,
      3.776263952255249
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.000003814697265625,
      0.0000035762786865234375,
      0.0000035762786865234375
    ]
  }
},
{
  "name": "mobilenet_v2",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'CumSum' with opsets: ai.onnx v11",
    "max_diff": [
      0.000016450881958007812,
      0.00001621246337890625,
      0.00001621246337890625
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.000006318092346191406,
      0.0000059604644775390625,
      0.0000057220458984375
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.000044226646423339844,
      0.000043272972106933594,
      0.00004088878631591797
    ]
  }
},
{
  "name": "mobilenet_v2_12",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'CumSum' with opsets: ai.onnx v11",
    "max_diff": [
      0.000016450881958007812,
      0.00001621246337890625,
      0.00001621246337890625
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.000006318092346191406,
      0.0000059604644775390625,
      0.0000057220458984375
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.000044226646423339844,
      0.000043272972106933594,
      0.00004088878631591797
    ]
  }
},
{
  "name": "mobilenet_v3",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'HardSwish' with opsets: ai.onnx v17",
    "max_diff": [
      0.000016450881958007812,
      0.00001621246337890625,
      0.00001621246337890625
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.000035881996154785156,
      0.00003075599670410156,
      0.000027239322662353516
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.000044226646423339844,
      0.000043272972106933594,
      0.00004088878631591797
    ]
  }
},
{
  "name": "mobilevit_small",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "cannot resolve operator 'HardSwish' with opsets: ai.onnx v17",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.000012487173080444336,
      0.000012099742889404297,
      0.000011980533599853516
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.000016868114471435547,
      0.000015616416931152344,
      0.000015616416931152344
    ]
  }
},
{
  "name": "msmarco_distilbert_base_v4",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v11",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.4543842077255249,
      0.44970059394836426,
      0.44472193717956543
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.000005424022674560547,
      0.000005364418029785156,
      0.000005304813385009766
    ]
  }
},
{
  "name": "mt5_small_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'DynamicQuantizeLinear' with opsets: ai.onnx v13",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.000030517578125,
      0.000030517578125,
      0.000030517578125
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.000030517578125,
      0.000030517578125,
      0.000030517578125
    ]
  }
},
{
  "name": "mt5_small_encoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'DequantizeLinear' with opsets: ai.onnx v13",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.047087788581848145,
      0.04524683952331543,
      0.04485970735549927
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Failed to build graph: hardSwish is not implemented.",
    "max_diff": [
      0.054199934005737305,
      0.04642045497894287,
      0.04264974594116211
    ]
  }
},
{
  "name": "realesrgan_x4_1024_fp32",
  "gpu": "N2",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "realesrgan_x4_128_fp32",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to compile shader: \nShader source:\n#version 300 es\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    in vec2 TexCoords;\n    out vec4 outputColor;\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    // Custom vector types to handle higher dimenalities.\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    \n    uniform sampler2D Im2Col;\nuniform sampler2D K;\nuniform sampler2D B;\n    \n      vec2 offsetToCoords(int offset, int width, int height) {\n        int t = offset / width;\n        int s = offset - t*width;\n        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);\n        return coords;\n      }\n      \n\n      int coordsToOffset(vec2 coords, int width, int height) {\n        float s = coords.s * float(width);\n        float t = coords.t * float(height);\n        int offset = int(t) * width + int(s);\n        return offset;\n      }\n      \n\n      void toVec(vec2 texCoords, out int c[4]) {\n        int offset = coordsToOffset(texCoords, 8192, 128);\n        \n        c[0] = offset / 1048576;\n        offset -= c[0] * 1048576;\n        c[1] = offset / 16384;\n        offset -= c[1] * 16384;\n        c[2] = offset / 128;\n        offset -= c[2] * 128;\n        c[3] = offset;\n      }\n      void toVec(int offset, out int c[4]) {\n        \n        c[0] = offset / 1048576;\n        offset -= c[0] * 1048576;\n        c[1] = offset / 16384;\n        offset -= c[1] * 16384;\n        c[2] = offset / 128;\n        offset -= c[2] * 128;\n        c[3] = offset;\n      }\n    \n\n      int indicesToOffset_B(int indices[1]) {\n        int offset = 0;\n        \n        offset += indices[0] * 1;\n        \n        return offset;\n      }\n      \nhighp float decode(highp vec4 rgba) {\n        return rgba.r;\n      }\n        \n\n        float getColorAsFloat(vec4 color) {\n            return decode(color);\n        }\n        \n\n        float _B(int m[1]) {\n          int offset = indicesToOffset_B(m);\n          vec2 coords = offsetToCoords(offset, 1, 64);\n          float value = getColorAsFloat(texture(B, coords));\n          return value;\n        }\n        \n\n    \n\nfloat process(int indices[4]) {\n  int b[1];\n  b[0] = indices[1];\n  int im2col[4];\n  im2col[0] = indices[0];\n  im2col[1] = indices[2];\n  im2col[2] = indices[3];\n  int im2colOffset = im2col[0] * 2359296 + im2col[1] * 18432 + im2col[2] * 144;\n  int kernelOffset = indices[1] * 144;\n  float value = _B(b);\n  for (int i = 0; i < 144; ++i) {\n    vec2 im2colCoords = offsetToCoords(im2colOffset, 144, 16384);\n    vec2 kernelCoords = offsetToCoords(kernelOffset, 144, 64);\n    value += dot(texture(Im2Col, im2colCoords), texture(K, kernelCoords));\n    ++im2colOffset;\n    ++kernelOffset;\n  }\n  \n  return value;\n}\n      \n  void main() {\n    int indices[4];\n    toVec(TexCoords, indices);\n    vec4 result = vec4(process(indices));\n    outputColor = result;\n  }\n  ",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000010371208190917969,
      0.000009179115295410156,
      0.000008463859558105469
    ]
  }
},
{
  "name": "realesrgan_x4_256_fp32",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to compile shader: \nShader source:\n#version 300 es\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    in vec2 TexCoords;\n    out vec4 outputColor;\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    // Custom vector types to handle higher dimenalities.\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    \n    uniform sampler2D Im2Col;\nuniform sampler2D K;\nuniform sampler2D B;\n    \n      vec2 offsetToCoords(int offset, int width, int height) {\n        int t = offset / width;\n        int s = offset - t*width;\n        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);\n        return coords;\n      }\n      \n\n      int coordsToOffset(vec2 coords, int width, int height) {\n        float s = coords.s * float(width);\n        float t = coords.t * float(height);\n        int offset = int(t) * width + int(s);\n        return offset;\n      }\n      \n\n      void toVec(vec2 texCoords, out int c[4]) {\n        int offset = coordsToOffset(texCoords, 16384, 256);\n        \n        c[0] = offset / 4194304;\n        offset -= c[0] * 4194304;\n        c[1] = offset / 65536;\n        offset -= c[1] * 65536;\n        c[2] = offset / 256;\n        offset -= c[2] * 256;\n        c[3] = offset;\n      }\n      void toVec(int offset, out int c[4]) {\n        \n        c[0] = offset / 4194304;\n        offset -= c[0] * 4194304;\n        c[1] = offset / 65536;\n        offset -= c[1] * 65536;\n        c[2] = offset / 256;\n        offset -= c[2] * 256;\n        c[3] = offset;\n      }\n    \n\n      int indicesToOffset_B(int indices[1]) {\n        int offset = 0;\n        \n        offset += indices[0] * 1;\n        \n        return offset;\n      }\n      \nhighp float decode(highp vec4 rgba) {\n        return rgba.r;\n      }\n        \n\n        float getColorAsFloat(vec4 color) {\n            return decode(color);\n        }\n        \n\n        float _B(int m[1]) {\n          int offset = indicesToOffset_B(m);\n          vec2 coords = offsetToCoords(offset, 1, 64);\n          float value = getColorAsFloat(texture(B, coords));\n          return value;\n        }\n        \n\n    \n\nfloat process(int indices[4]) {\n  int b[1];\n  b[0] = indices[1];\n  int im2col[4];\n  im2col[0] = indices[0];\n  im2col[1] = indices[2];\n  im2col[2] = indices[3];\n  int im2colOffset = im2col[0] * 9437184 + im2col[1] * 36864 + im2col[2] * 144;\n  int kernelOffset = indices[1] * 144;\n  float value = _B(b);\n  for (int i = 0; i < 144; ++i) {\n    vec2 im2colCoords = offsetToCoords(im2colOffset, 3072, 3072);\n    vec2 kernelCoords = offsetToCoords(kernelOffset, 144, 64);\n    value += dot(texture(Im2Col, im2colCoords), texture(K, kernelCoords));\n    ++im2colOffset;\n    ++kernelOffset;\n  }\n  \n  return value;\n}\n      \n  void main() {\n    int indices[4];\n    toVec(TexCoords, indices);\n    vec4 result = vec4(process(indices));\n    outputColor = result;\n  }\n  ",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.0000133514404296875,
      0.000012040138244628906,
      0.00001150369644165039
    ]
  }
},
{
  "name": "realesrgan_x4_512_fp32",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to compile shader: \nShader source:\n#version 300 es\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    in vec2 TexCoords;\n    out vec4 outputColor;\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    // Custom vector types to handle higher dimenalities.\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    \n    uniform sampler2D Im2Col;\nuniform sampler2D K;\nuniform sampler2D B;\n    \n      vec2 offsetToCoords(int offset, int width, int height) {\n        int t = offset / width;\n        int s = offset - t*width;\n        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);\n        return coords;\n      }\n      \n\n      int coordsToOffset(vec2 coords, int width, int height) {\n        float s = coords.s * float(width);\n        float t = coords.t * float(height);\n        int offset = int(t) * width + int(s);\n        return offset;\n      }\n      \n\n      void toVec(vec2 texCoords, out int c[4]) {\n        int offset = coordsToOffset(texCoords, 4096, 4096);\n        \n        c[0] = offset / 16777216;\n        offset -= c[0] * 16777216;\n        c[1] = offset / 262144;\n        offset -= c[1] * 262144;\n        c[2] = offset / 512;\n        offset -= c[2] * 512;\n        c[3] = offset;\n      }\n      void toVec(int offset, out int c[4]) {\n        \n        c[0] = offset / 16777216;\n        offset -= c[0] * 16777216;\n        c[1] = offset / 262144;\n        offset -= c[1] * 262144;\n        c[2] = offset / 512;\n        offset -= c[2] * 512;\n        c[3] = offset;\n      }\n    \n\n      int indicesToOffset_B(int indices[1]) {\n        int offset = 0;\n        \n        offset += indices[0] * 1;\n        \n        return offset;\n      }\n      \nhighp float decode(highp vec4 rgba) {\n        return rgba.r;\n      }\n        \n\n        float getColorAsFloat(vec4 color) {\n            return decode(color);\n        }\n        \n\n        float _B(int m[1]) {\n          int offset = indicesToOffset_B(m);\n          vec2 coords = offsetToCoords(offset, 1, 64);\n          float value = getColorAsFloat(texture(B, coords));\n          return value;\n        }\n        \n\n    \n\nfloat process(int indices[4]) {\n  int b[1];\n  b[0] = indices[1];\n  int im2col[4];\n  im2col[0] = indices[0];\n  im2col[1] = indices[2];\n  im2col[2] = indices[3];\n  int im2colOffset = im2col[0] * 37748736 + im2col[1] * 73728 + im2col[2] * 144;\n  int kernelOffset = indices[1] * 144;\n  float value = _B(b);\n  for (int i = 0; i < 144; ++i) {\n    vec2 im2colCoords = offsetToCoords(im2colOffset, 6144, 6144);\n    vec2 kernelCoords = offsetToCoords(kernelOffset, 144, 64);\n    value += dot(texture(Im2Col, im2colCoords), texture(K, kernelCoords));\n    ++im2colOffset;\n    ++kernelOffset;\n  }\n  \n  return value;\n}\n      \n  void main() {\n    int indices[4];\n    toVec(TexCoords, indices);\n    vec4 result = vec4(process(indices));\n    outputColor = result;\n  }\n  ",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.02951580286026001,
      0.0288659930229187,
      0.028653621673583984
    ]
  }
},
{
  "name": "realesrgan_x4_64_fp32",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000005304813385009766,
      0.000005066394805908203,
      0.000005066394805908203
    ]
  }
},
{
  "name": "resnet50_v1",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.0000073909759521484375,
      0.0000054836273193359375,
      0.000005364418029785156
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000011324882507324219,
      0.000010609626770019531,
      0.00001049041748046875
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000007152557373046875,
      0.0000059604644775390625,
      0.0000054389238357543945
    ]
  }
},
{
  "name": "resnet50_v2",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.000011920928955078125,
      0.000008344650268554688,
      0.000008285045623779297
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000009298324584960938,
      0.000008344650268554688,
      0.000008046627044677734
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000073909759521484375,
      0.000007331371307373047,
      0.000007115304470062256
    ]
  }
},
{
  "name": "sam_b_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 1, ERROR_MESSAGE: Non-zero status code returned while running Resize node. Name:'/Resize_1' Status Message: upsamplebase.h:345 ScalesValidation Scale value should be greater than 0."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Expand' with opsets: ai.onnx v17",
    "max_diff": [
      0.000011920928955078125,
      0.000008344650268554688,
      0.000008285045623779297
    ]
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "[WebGPU] Kernel \"[Resize] 43330664\" failed. Error: no GPU data for output: 0",
    "max_diff": [
      0.000009298324584960938,
      0.000008344650268554688,
      0.000008046627044677734
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "failed to call OrtRun(). ERROR_CODE: 1, ERROR_MESSAGE: Non-zero status code returned while running Resize node. Name:'/Resize_1' Status Message: upsamplebase.h:345 ScalesValidation Scale value should be greater than 0.",
    "max_diff": [
      0.0000073909759521484375,
      0.000007331371307373047,
      0.000007115304470062256
    ]
  }
},
{
  "name": "sam_b_encoder",
  "gpu": "N2",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "sam_vit_base",
  "gpu": "N2",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "sam_vit_base_prompt_encoder_mask_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.011664927005767822,
      0.006672680377960205,
      0.00010085105895996094
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to create gather operator.",
    "max_diff": []
  }
},
{
  "name": "sam_vit_base_vision_encoder",
  "gpu": "N2",
  "webnn_gpu": {
    "error": "crash"
  }
},
{
  "name": "segment_anything",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Split' with opsets: ai.onnx v17, com.microsoft.nchwc v1, ai.onnx.ml v3, com.ms.internal.nhwc v18, ai.onnx.training v1, ai.onnx.preview.training v1, com.microsoft v1, com.microsoft.experimental v1, org.pytorch.aten v1, com.microsoft.dml v1",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00022083520889282227,
      0.0002200007438659668,
      0.00021731853485107422
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00018513202667236328,
      0.0001837015151977539,
      0.00018358230590820312
    ]
  }
},
{
  "name": "selfie_segmentation_general",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'Split' with opsets: ai.onnx v17, com.microsoft.nchwc v1, ai.onnx.ml v3, com.ms.internal.nhwc v18, ai.onnx.training v1, ai.onnx.preview.training v1, com.microsoft v1, com.microsoft.experimental v1, org.pytorch.aten v1, com.microsoft.dml v1",
    "max_diff": [
      1.0000000596046448,
      1.0000000596046448,
      1.0000000596046448
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      5.96046447758971e-8,
      5.960464477539863e-8,
      5.960464477539614e-8
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      5.960464477589735e-8,
      5.960464477539865e-8,
      5.960464477539616e-8
    ]
  }
},
{
  "name": "selfie_segmentation_landscape",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'Split' with opsets: ai.onnx v17, com.microsoft.nchwc v1, ai.onnx.ml v3, com.ms.internal.nhwc v18, ai.onnx.training v1, ai.onnx.preview.training v1, com.microsoft v1, com.microsoft.experimental v1, org.pytorch.aten v1, com.microsoft.dml v1",
    "max_diff": [
      1.0000000596046448,
      1.0000000596046448,
      1.0000000596046448
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      5.960464477667902e-8,
      5.960464477542746e-8,
      5.960464477539761e-8
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "fail",
    "error": "",
    "max_diff": [
      5.960479380299078e-8,
      5.960476954727399e-8,
      5.96047522979969e-8
    ]
  }
},
{
  "name": "squeezebert_uncased",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": [
      1.0000000596046448,
      1.0000000596046448,
      1.0000000596046448
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": []
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": []
  }
},
{
  "name": "squeezenet",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": [
      0.000011563301086425781,
      0.000011563301086425781,
      0.000011086463928222656
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000009775161743164062,
      0.000009298324584960938,
      0.000009298324584960938
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000003337860107421875,
      0.0000030994415283203125,
      0.00000286102294921875
    ]
  }
},
{
  "name": "sd_2_1_vae_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.000011563301086425781,
      0.000011563301086425781,
      0.000011086463928222656
    ]
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.5044900178909302,
      0.48897770047187805,
      0.4888308048248291
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.07682406902313232,
      0.06450235843658447,
      0.06291526556015015
    ]
  }
},
{
  "name": "sd_2_1_vae_encoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },

  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.2900047302246094,
      0.2215738296508789,
      0.2105240821838379
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.009752273559570312,
      0.008214950561523438,
      0.008192062377929688
    ]
  }
},
{
  "name": "t5_small_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },

  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00005340576171875,
      0.00005340576171875,
      0.00005340576171875
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.0000457763671875,
      0.000041961669921875,
      0.000041961669921875
    ]
  }
},
{
  "name": "t5_small_encoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },

  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v13",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000022649765014648438,
      0.0000021457672119140625,
      0.0000021457672119140625
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000001043081283569336,
      0.000001043081283569336,
      0.0000010244548320770264
    ]
  }
},
{
  "name": "tinyyolo_v2",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "cannot resolve operator 'Range' with opsets: ai.onnx v13",
    "max_diff": [
      0.000010930001735687256,
      0.00000959634780883789,
      0.00000903010368347168
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00002193450927734375,
      0.00002002716064453125,
      0.00001895427703857422
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000008821487426757812,
      0.000008821487426757812,
      0.000008821487426757812
    ]
  }
},
{
  "name": "vit_base_patch16_224",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": [
      0.000010930001735687256,
      0.00000959634780883789,
      0.00000903010368347168
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000064373016357421875,
      0.0000059604644775390625,
      0.0000054836273193359375
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000004291534423828125,
      0.000003337860107421875,
      0.000003337860107421875
    ]
  }
},
{
  "name": "vit_gpt2_image_captioning_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": [
      0.000010930001735687256,
      0.00000959634780883789,
      0.00000903010368347168
    ]
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "pass",
    "e6": "pass",
    "e7": "pass",
    "e8": "pass",
    "error": "",
    "max_diff": [
      null,
      null,
      null
    ]
  },
  "webnn_gpu": {
    "e3": "fail",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "crash",
    "max_diff": [
      0.003726959228515625,
      0.003719329833984375,
      0.003696441650390625
    ]
  }
},
{
  "name": "vit_gpt2_image_captioning_encoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00007557868957519531,
      0.00002230703830718994,
      0.00002181529998779297
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00007450580596923828,
      0.00006389617919921875,
      0.000057578086853027344
    ]
  }
},
{
  "name": "whisper_tiny_decoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Cannot read properties of null (reading 'irVersion')",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000034332275390625,
      0.0000286102294921875,
      0.0000286102294921875
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.0000286102294921875,
      0.000026702880859375,
      0.0000247955322265625
    ]
  }
},
{
  "name": "whisper_tiny_encoder",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": ""
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'Erf' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "pass",
    "e4": "fail",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00013399124145507812,
      0.00007867813110351562,
      0.00006693601608276367
    ]
  },
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00007677078247070312,
      0.0000743865966796875,
      0.000056743621826171875
    ]
  }
},
{
  "name": "xlm_roberta_base",
  "gpu": "N2",
  "wasm_4": {
    "e3": "1e-3",
    "e4": "1e-4",
    "e5": "1e-5",
    "e6": "1e-6",
    "e7": "1e-7",
    "e8": "1e-8",
    "error": "Aborted(). Build with -sASSERTIONS for more info."
  },
  "webgl": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "cannot resolve operator 'ConstantOfShape' with opsets: ai.onnx v11",
    "max_diff": []
  },
  "webgpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.00013399124145507812,
      0.00007867813110351562,
      0.00006693601608276367
    ]
  },
  "webnn_gpu": {
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "Aborted(). Build with -sASSERTIONS for more info.",
    "max_diff": [
      0.00007677078247070312,
      0.0000743865966796875,
      0.000056743621826171875
    ]
  }
}
]
