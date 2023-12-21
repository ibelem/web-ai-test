export const conformanceEnv = {
  "windows": 'Windows 11 Enterprise 21H2',
  "version": '122.0.6195.2',
  'last_update': 'Dec 20, 2023'
}

export const conformance = [
  {
    "name": "albert_base_v2",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
      "max_diff": []
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.0007402896881103516,
        0.00028884410858154297,
        0.00026535987854003906
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.00013017654418945312,
        0.00011157989501953125,
        0.00010967254638671875
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.00010013580322265625,
        0.0000972747802734375,
        0.00009632110595703125
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The operator (reduceSum) is not supported.",
      "max_diff": [
        0.00010013580322265625,
        0.0000972747802734375,
        0.00009632110595703125
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
      "max_diff": [
        0.00010013580322265625,
        0.0000972747802734375,
        0.00009632110595703125
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
      "max_diff": [
        0.00010013580322265625,
        0.0000972747802734375,
        0.00009632110595703125
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.000022619962692260742,
        0.000018477439880371094,
        0.00001811981201171875
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
      "max_diff": [
        0.000022619962692260742,
        0.000018477439880371094,
        0.00001811981201171875
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
      "max_diff": [
        0.0000591278076171875,
        0.00005340576171875,
        0.00005340576171875
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "fail",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "crash",
      "max_diff": [
        0.0014657974243164062,
        0.0008783340454101562,
        0.0007991790771484375
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.00018787384033203125,
        0.00018787384033203125,
        0.00018739700317382812
      ]
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
    "name": "efficientnet_lite",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "pass",
      "e6": "pass",
      "e7": "pass",
      "e8": "fail",
      "error": "",
      "max_diff": [
        1.3969838619232178e-8,
        1.0710209608078003e-8,
        1.0710209608078003e-8
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "pass",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.0000011920928955078125,
        9.685754776000977e-7,
        9.5367431640625e-7
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
      "max_diff": [
        0.0000011920928955078125,
        9.685754776000977e-7,
        9.5367431640625e-7
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
      "max_diff": []
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK only supports constant padding mode.",
      "max_diff": []
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": "dims.forEach is not a function"
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
      "max_diff": []
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": "Aborted(). Build with -sASSERTIONS for more info."
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Aborted(). Build with -sASSERTIONS for more info.",
      "max_diff": []
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
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
        0.0000030994415283203125
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.00005996227264404297,
        0.00005817413330078125,
        0.00005650520324707031
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.00005996227264404297,
        0.00005817413330078125,
        0.00005650520324707031
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.000030159950256347656,
        0.000030159950256347656,
        0.0000286102294921875
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.00002384185791015625,
        0.000020802021026611328,
        0.000019073486328125
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "pass",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.0000021457672119140625,
        0.0000019073486328125,
        0.0000019073486328125
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
      "max_diff": [
        0.0000021457672119140625,
        0.0000019073486328125,
        0.0000019073486328125
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': The value of scalar operand b must be 2 or 0.5 for pow.",
      "max_diff": [
        0.0000021457672119140625,
        0.0000019073486328125,
        0.0000019073486328125
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "webnn_gpu": { "error": "Crash" }
  },
  {
    "name": "realesrgan_x4_128_fp32",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK backend doesn't support concat inputs size 5",
      "max_diff": []
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "webnn_gpu": {
      "error": "Crash"
    }
  }
  ,
  {
    "name": "realesrgan_x4_512_fp32",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK backend doesn't support concat inputs size 5",
      "max_diff": []
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK backend doesn't support concat inputs size 5",
      "max_diff": []
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK backend doesn't support concat inputs size 5",
      "max_diff": [
        0.00003355741500854492,
        0.000029981136322021484,
        0.000028848648071289062
      ]
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
    "name": "resnet50_v1",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.00003355741500854492,
        0.000029981136322021484,
        0.000028848648071289062
      ]
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
        6.6789305210113525,
        6.31169992685318,
        5.822868496179581
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
        0.0033956170082092285,
        0.0033259987831115723,
        0.00321042537689209
      ]
    }
  },
  {
    "name": "resnet50_v2",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.000018596649169921875,
        0.000018417835235595703,
        0.000015616416931152344
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": "failed to call OrtRun(). ERROR_CODE: 1, ERROR_MESSAGE: Non-zero status code returned while running Resize node. Name:'/Resize_1' Status Message: upsamplebase.h:345 ScalesValidation Scale value should be greater than 0."
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
      "max_diff": []
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "webnn_gpu": {
      "error": "Crash"
    }
  }
  ,
  {
    "name": "sam_vit_base",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "webnn_gpu": {
      "error": "Crash"
    }
  }
  ,
  {
    "name": "sam_vit_base_prompt_encoder_mask_decoder",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "pass",
      "e6": "pass",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        9.5367431640625e-7,
        1.1920928955078125e-7,
        5.960464477539063e-8
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "webnn_gpu": {
      "error": "Crash"
    }
  }
  ,
  {
    "name": "segment_anything",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
      "max_diff": []
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
        6.192848324775696,
        6.18369460105896,
        6.175914406776428
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
        0.33737099170684814,
        0.33737099170684814,
        0.33737099170684814
      ]
    }
  },
  {
    "name": "segment_anything",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
      "max_diff": []
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
        6.192848324775696,
        6.18369460105896,
        6.175914406776428
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
        0.33737099170684814,
        0.33737099170684814,
        0.33737099170684814
      ]
    }
  },
  {
    "name": "selfie_segmentation_general",
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
      "max_diff": []
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "pass",
      "e6": "pass",
      "e7": "pass",
      "e8": "fail",
      "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
      "max_diff": [
        5.960479366348107e-8,
        5.960476942542322e-8,
        5.960475225729188e-8
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]",
      "max_diff": [
        5.960479366348107e-8,
        5.960476942542322e-8,
        5.960475225729188e-8
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]",
      "max_diff": [
        0.00001239776611328125,
        0.000011682510375976562,
        0.000011682510375976562
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]"
    },
    "webnn_cpu_4": {
      "e3": "fail",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "failed to call OrtRun(). ERROR_CODE: 2, ERROR_MESSAGE: Non-zero status code returned while running Gather node. Name:'/embeddings/token_type_embeddings/Gather' Status Message: indices element out of data bounds, idx=99 must be within the inclusive range [-2,1]",
      "max_diff": [
        0.0028543025255203247,
        0.0026347339153289795,
        0.0024251341819763184
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "fail",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.0167999267578125,
        0.010313987731933594,
        0.007810831069946289
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "pass",
      "e6": "pass",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        8.344650268554688e-7,
        7.972121238708496e-7,
        7.953494787216187e-7
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.0000209808349609375,
        0.000019073486328125,
        0.000018358230590820312
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "pass",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.0000133514404296875,
        0.0000133514404296875,
        0.000011444091796875
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": ""
    },
    "webnn_cpu_4": {
      "e3": "pass",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.00012874603271484375,
        0.00009107589721679688,
        0.0000699758529663086
      ]
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
    "gpu": "Intel Arc A770 Graphics Direct3D11",
    "wasm_4": {
      "e3": "1e-3",
      "e4": "1e-4",
      "e5": "1e-5",
      "e6": "1e-6",
      "e7": "1e-7",
      "e8": "1e-8",
      "error": "Aborted(). Build with -sASSERTIONS for more info."
    },
    "webnn_cpu_4": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Aborted(). Build with -sASSERTIONS for more info.",
      "max_diff": [
        0.00012874603271484375,
        0.00009107589721679688,
        0.0000699758529663086
      ]
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
  }
]