export const conformanceEnv = {
  "windows": 'Windows 11',
  "version": '132.0.6780.0',
  'last_update': 'Oct 17, 2024'
}


export const conformance = [{
  "name": "mobilenet_v2_10",
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
    "error": "input tensor[0] check failed: expected shape '[,3,224,224]' but got [1,3,224,224]",
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
      0.000007927417755126953,
      0.000007569789886474609,
      0.000007510185241699219
    ]
  },
  "webnn_cpu": {
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
  "webnn_gpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00004374980926513672,
      0.00004172325134277344,
      0.00003981590270996094
    ]
  },
  "webnn_npu": {
    "e3": "",
    "e4": "",
    "e5": "",
    "e6": "",
    "e7": "",
    "e8": "",
    "error": "",
    "max_diff": []
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
    "e3": "n/a",
    "e4": "n/a",
    "e5": "n/a",
    "e6": "n/a",
    "e7": "n/a",
    "e8": "n/a",
    "error": "input tensor[0] check failed: expected shape '[,3,224,224]' but got [1,3,224,224]",
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
      0.000008821487426757812,
      0.000008702278137207031,
      0.000008225440979003906
    ]
  },
  "webnn_cpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.000024080276489257812,
      0.000023126602172851562,
      0.000018775463104248047
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
  },
  "webnn_npu": {
    "e3": "",
    "e4": "",
    "e5": "",
    "e6": "",
    "e7": "",
    "e8": "",
    "error": "",
    "max_diff": []
  }
},{
  "name": "squeezenet",
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
  "webnn_cpu": {
    "e3": "pass",
    "e4": "pass",
    "e5": "fail",
    "e6": "fail",
    "e7": "fail",
    "e8": "fail",
    "error": "",
    "max_diff": [
      0.00001239776611328125,
      0.000011682510375976562,
      0.000011682510375976562
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
      0.0000040531158447265625,
      0.000003814697265625
    ]
  },
  "webnn_npu": {
    "e3": "",
    "e4": "",
    "e5": "",
    "e6": "",
    "e7": "",
    "e8": "",
    "error": "",
    "max_diff": []
  }
}
]
