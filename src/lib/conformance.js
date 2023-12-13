export const conformanceEnv = {
  "version": '122.0.6178.0',
  'last_update': 'Dec 12, 2023'
}

export const conformance = [
  {
    "name": "densenet",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "",
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
        0.000008106231689453125,
        0.00000718235969543457,
        0.00000667572021484375
      ]
    }
  },
  {
    "name": "efficientnet_lite",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "e8": "pass",
      "error": "",
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
      "error": "",
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
    "name": "mobilenet_v2",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "",
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
      "error": "",
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
      "error": "",
      "max_diff": [
        0.000044226646423339844,
        0.000043272972106933594,
        0.00004088878631591797
      ]
    }
  },
  {
    "name": "mobilenet_v2_12",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "",
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
      "error": "",
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
      "error": "",
      "max_diff": [
        0.000044226646423339844,
        0.000043272972106933594,
        0.00004088878631591797
      ]
    }
  },
  {
    "name": "resnet50_v1",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
        0.0000040531158447265625,
        0.0000033974647521972656,
        0.0000032186508178710938
      ]
    }
  },
  {
    "name": "squeezenet",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
    "name": "selfie_segmentation_general",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
        5.96046447758973e-8,
        5.960464477539865e-8,
        5.960464477539616e-8
      ]
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
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
        5.96046447758973e-8,
        5.960464477539865e-8,
        5.960464477539616e-8
      ]
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
      "e3": "pass",
      "e4": "pass",
      "e5": "pass",
      "e6": "pass",
      "e7": "pass",
      "e8": "fail",
      "error": "",
      "max_diff": [
        5.960479321975778e-8,
        5.960476901692294e-8,
        5.960475240266984e-8
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
    "name": "emotion_ferplus",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
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
    "name": "realesrgan_x4_64_fp32",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to compile shader: \nShader source:\n#version 300 es\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    in vec2 TexCoords;\n    out vec4 outputColor;\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    // Custom vector types to handle higher dimenalities.\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    \n    uniform sampler2D Im2Col;\nuniform sampler2D K;\nuniform sampler2D B;\n    \n      vec2 offsetToCoords(int offset, int width, int height) {\n        int t = offset / width;\n        int s = offset - t*width;\n        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);\n        return coords;\n      }\n      \n\n      int coordsToOffset(vec2 coords, int width, int height) {\n        float s = coords.s * float(width);\n        float t = coords.t * float(height);\n        int offset = int(t) * width + int(s);\n        return offset;\n      }\n      \n\n      void toVec(vec2 texCoords, out int c[4]) {\n        int offset = coordsToOffset(texCoords, 4096, 64);\n        \n        c[0] = offset / 262144;\n        offset -= c[0] * 262144;\n        c[1] = offset / 4096;\n        offset -= c[1] * 4096;\n        c[2] = offset / 64;\n        offset -= c[2] * 64;\n        c[3] = offset;\n      }\n      void toVec(int offset, out int c[4]) {\n        \n        c[0] = offset / 262144;\n        offset -= c[0] * 262144;\n        c[1] = offset / 4096;\n        offset -= c[1] * 4096;\n        c[2] = offset / 64;\n        offset -= c[2] * 64;\n        c[3] = offset;\n      }\n    \n\n      int indicesToOffset_B(int indices[1]) {\n        int offset = 0;\n        \n        offset += indices[0] * 1;\n        \n        return offset;\n      }\n      \nhighp float decode(highp vec4 rgba) {\n        return rgba.r;\n      }\n        \n\n        float getColorAsFloat(vec4 color) {\n            return decode(color);\n        }\n        \n\n        float _B(int m[1]) {\n          int offset = indicesToOffset_B(m);\n          vec2 coords = offsetToCoords(offset, 1, 64);\n          float value = getColorAsFloat(texture(B, coords));\n          return value;\n        }\n        \n\n    \n\nfloat process(int indices[4]) {\n  int b[1];\n  b[0] = indices[1];\n  int im2col[4];\n  im2col[0] = indices[0];\n  im2col[1] = indices[2];\n  im2col[2] = indices[3];\n  int im2colOffset = im2col[0] * 589824 + im2col[1] * 9216 + im2col[2] * 144;\n  int kernelOffset = indices[1] * 144;\n  float value = _B(b);\n  for (int i = 0; i < 144; ++i) {\n    vec2 im2colCoords = offsetToCoords(im2colOffset, 144, 4096);\n    vec2 kernelCoords = offsetToCoords(kernelOffset, 144, 64);\n    value += dot(texture(Im2Col, im2colCoords), texture(K, kernelCoords));\n    ++im2colOffset;\n    ++kernelOffset;\n  }\n  \n  return value;\n}\n      \n  void main() {\n    int indices[4];\n    toVec(TexCoords, indices);\n    vec4 result = vec4(process(indices));\n    outputColor = result;\n  }\n  ",
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
    "name": "tinyyolo_v2",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK only supports constant padding mode.",
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
      "error": "cannot resolve operator 'Crop' with opsets: ai.onnx v7",
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
      "max_diff": [
        0.00002193450927734375,
        0.00002002716064453125,
        0.00001895427703857422
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
        0.000010132789611816406,
        0.000010132789611816406,
        0.000010132789611816406
      ]
    }
  },
  {
    "name": "albert_base_v2",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
      "e3": "pass",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.000812530517578125,
        0.0008068084716796875,
        0.00080108642578125
      ]
    },
    "webnn_gpu": {
      "e3": "pass",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "Failed to execute 'conv2d' on 'MLGraphBuilder': The length of strides should be 2.",
      "max_diff": [
        0.000209808349609375,
        0.0001983642578125,
        0.000186920166015625
      ]
    }
  },
  {
    "name": "bart_large_cnn",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
      "e3": "pass",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.0006444454193115234,
        0.0002510547637939453,
        0.0002422332763671875
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
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
    "name": "bert_base_uncased",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
    "name": "codegen_350m_mono",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
      "error": "[WebGPU] Kernel \"[ReduceMean] 1463206432\" failed. TypeError: Cannot read properties of undefined (reading 'dims')",
      "max_diff": [
        0.000102996826171875,
        0.00010251998901367188,
        0.0000972747802734375
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
    "name": "detr_resnet_50",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Resample2d only supports Linear mode.",
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
      "e3": "fail",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        3.7048935890197754,
        3.1106033325195312,
        2.7789793014526367
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
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
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
    "name": "gpt2_decoder",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
        0.0001163482666015625,
        0.000087738037109375,
        0.00008392333984375
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
        0.0000591278076171875,
        0.00005626678466796875,
        0.00005340576171875
      ]
    }
  },
  {
    "name": "m2m100_decoder",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Can't create a session. ERROR_CODE: 6, ERROR_MESSAGE: Exception during initialization: std::bad_alloc",
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
      "max_diff": [
        0.0001163482666015625,
        0.000087738037109375,
        0.00008392333984375
      ]
    },
    "webnn_gpu": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Can't create a session. ERROR_CODE: 6, ERROR_MESSAGE: Exception during initialization: std::bad_alloc",
      "max_diff": [
        0.0000591278076171875,
        0.00005626678466796875,
        0.00005340576171875
      ]
    }
  },
  {
    "name": "m2m100_encoder",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
        3.8030099868774414,
        3.788203001022339,
        3.7807400226593018
      ]
    },
    "webnn_gpu": {
      "e3": "pass",
      "e4": "pass",
      "e5": "pass",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "Can't create a session. ERROR_CODE: 6, ERROR_MESSAGE: Exception during initialization: std::bad_alloc",
      "max_diff": [
        0.000003814697265625,
        0.0000035762786865234375,
        0.0000035762786865234375
      ]
    }
  },
  {
    "name": "sd_2_1_vae_decoder",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "e3": "fail",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
        0.2238803207874298,
        0.2064879834651947,
        0.2004568874835968
      ]
    },
    "webnn_gpu": {
      "e3": "fail",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "Can't create a session. ERROR_CODE: 6, ERROR_MESSAGE: Exception during initialization: std::bad_alloc",
      "max_diff": [
        0.07682406902313232,
        0.06450235843658447,
        0.06291526556015015
      ]
    }
  },
  {
    "name": "sd_2_1_vae_encoder",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
        0.01663947105407715,
        0.01031494140625,
        0.007647991180419922
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
        0.2900047302246094,
        0.22171926498413086,
        0.21052336692810059
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
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
      "error": "",
      "max_diff": [
        0.0000457763671875,
        0.000041961669921875,
        0.000041961669921875
      ]
    }
  },
  {
    "name": "t5_small_encoder",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "name": "whisper_tiny_decoder",
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "gpu": "NVIDIA GeForce RTX 2080 Ti Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'conv2d' on 'MLGraphBuilder': The length of strides should be 2.",
      "max_diff": []
    }
  },
  {
    "name": "densenet",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
        8.838298320770264,
        7.476792097091675,
        5.4472315311431885
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
        0.000009775161743164062,
        0.00000858306884765625,
        0.00000762939453125
      ]
    }
  },
  {
    "name": "efficientnet_lite",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
        0.004653145442716777,
        0.004359509097412229,
        0.004306867136619985
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
    "name": "mobilenet_v2",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "",
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
      "error": "",
      "max_diff": [
        0.00004374980926513672,
        0.00004172325134277344,
        0.00003981590270996094
      ]
    }
  },
  {
    "name": "mobilenet_v2_12",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "",
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
        4.074793696403503,
        3.8982450366020203,
        3.674678683280945
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
    }
  },
  {
    "name": "resnet50_v1",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
        10.589870601892471,
        8.446761131286621,
        8.255826234817505
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
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
        3.9310596883296967,
        3.91005627438426,
        3.743229627609253
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
        0.0017053484916687012,
        0.001658320426940918,
        0.0015978813171386719
      ]
    }
  },
  {
    "name": "squeezenet",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "",
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
      "error": "",
      "max_diff": [
        0.000004291534423828125,
        0.0000040531158447265625,
        0.000003814697265625
      ]
    }
  },
  {
    "name": "selfie_segmentation_general",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
        5.96046447758973e-8,
        5.960464477539865e-8,
        5.960464477539616e-8
      ]
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
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
        5.96046447758973e-8,
        5.960464477539865e-8,
        5.960464477539616e-8
      ]
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
    "name": "emotion_ferplus",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Can't create a session. ERROR_CODE: 1, ERROR_MESSAGE: Node 'Resize' OpType:Resize with domain:com.ms.internal.nhwc was inserted using the NHWC format as requested by WebNNExecutionProvider, but was not selected by that EP. This means the graph is now invalid as there will not be an EP able to run the node. This could be a bug in layout transformer, or in the GetCapability implementation of the EP.",
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
    "name": "fns_candy",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "cannot resolve operator 'Crop' with opsets: ai.onnx v7",
      "max_diff": [
        0.0000016689300537109375,
        0.0000016689300537109375,
        4.76837158203125e-7
      ]
    },
    "webgpu": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "max_diff": [
        0.0000016689300537109375,
        0.0000010728836059570312,
        9.685754776000977e-7
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
        0.8636398315429688,
        0.8368682861328125,
        0.8368682861328125
      ]
    }
  },
  {
    "name": "tinyyolo_v2",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "resize (packed) does not support mode: 'nearest'",
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
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        0.000019073486328125,
        0.000019073486328125,
        0.000019073486328125
      ]
    }
  },
  {
    "name": "albert_base_v2",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": [
        0.0000209808349609375,
        0.000019073486328125,
        0.000018358230590820312
      ]
    },
    "webgl": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "input tensor[0] check failed: expected type 'int32' but got int64",
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
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to compile the graph.",
      "max_diff": [
        0.000019073486328125,
        0.000019073486328125,
        0.000019073486328125
      ]
    }
  },
  {
    "name": "bart_large_cnn",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
  }
  ,
  {
    "name": "codegen_350m_mono",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
      "error": "offset is out of bounds",
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
        0.00012493133544921875,
        0.00012302398681640625,
        0.00012111663818359375
      ]
    }
  },
  {
    "name": "detr_resnet_50",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': Resample2d only supports Linear mode.",
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
      "e3": "fail",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "offset is out of bounds",
      "max_diff": [
        17.682235583662987,
        17.590599864721298,
        17.4832643866539
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
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
      "error": "offset is out of bounds",
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
    "name": "gpt2_decoder",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
        32.69708061218262,
        32.629987716674805,
        32.41153144836426
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
        0.0001277923583984375,
        0.00008392333984375,
        0.000080108642578125
      ]
    }
  },
  {
    "name": "m2m100_decoder",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Can't create a session. ERROR_CODE: 6, ERROR_MESSAGE: Exception during initialization: std::bad_alloc",
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
      "max_diff": [
        32.69708061218262,
        32.629987716674805,
        32.41153144836426
      ]
    },
    "webnn_gpu": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Can't create a session. ERROR_CODE: 6, ERROR_MESSAGE: Exception during initialization: std::bad_alloc",
      "max_diff": [
        0.0001277923583984375,
        0.00008392333984375,
        0.000080108642578125
      ]
    }
  },
  {
    "name": "m2m100_encoder",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
    },
    "webgl": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Array buffer allocation failed",
      "max_diff": []
    },
    "webgpu": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Array buffer allocation failed",
      "max_diff": [
        32.69708061218262,
        32.629987716674805,
        32.41153144836426
      ]
    },
    "webnn_gpu": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Array buffer allocation failed",
      "max_diff": [
        0.0001277923583984375,
        0.00008392333984375,
        0.000080108642578125
      ]
    }
  },
  {
    "name": "sd_2_1_vae_decoder",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
        0.0749686062335968,
        0.07239368557929993,
        0.07136225700378418
      ]
    }
  },
  {
    "name": "sd_2_1_vae_encoder",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
        0.016813039779663086,
        0.010313987731933594,
        0.0077478885650634766
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
        10.879173278808594,
        7.500782012939453,
        5.927822589874268
      ]
    },
    "webnn_gpu": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to compile the graph.",
      "max_diff": [
        0.0749686062335968,
        0.07239368557929993,
        0.07136225700378418
      ]
    }
  },
  {
    "name": "sam_b_decoder",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": [
        0.016813039779663086,
        0.010313987731933594,
        0.0077478885650634766
      ]
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
      "error": "Failed to execute 'requestDevice' on 'GPUAdapter': D3D12 create command queue failed with DXGI_ERROR_DEVICE_REMOVED (0x887A0005)\n    at CheckHRESULTImpl (..\\..\\third_party\\dawn\\src\\dawn\\native\\d3d\\D3DError.cpp:109)\n    at Initialize (..\\..\\third_party\\dawn\\src\\dawn\\native\\d3d12\\DeviceD3D12.cpp:100)\n    at Create (..\\..\\third_party\\dawn\\src\\dawn\\native\\d3d12\\DeviceD3D12.cpp:85)\n",
      "max_diff": [
        10.879173278808594,
        7.500782012939453,
        5.927822589874268
      ]
    },
    "webnn_gpu": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to open the command recorder.",
      "max_diff": [
        0.0749686062335968,
        0.07239368557929993,
        0.07136225700378418
      ]
    }
  },
  {
    "name": "sam_b_encoder",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Can't create a session. ERROR_CODE: 2, ERROR_MESSAGE: The initializer of graph has unsupported type, name: ortshared_7_1_3_2_token_290 type: 7",
      "max_diff": [
        0.016813039779663086,
        0.010313987731933594,
        0.0077478885650634766
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
      "error": "Failed to execute 'requestDevice' on 'GPUAdapter': D3D12 create command queue failed with DXGI_ERROR_DEVICE_REMOVED (0x887A0005)\n    at CheckHRESULTImpl (..\\..\\third_party\\dawn\\src\\dawn\\native\\d3d\\D3DError.cpp:109)\n    at Initialize (..\\..\\third_party\\dawn\\src\\dawn\\native\\d3d12\\DeviceD3D12.cpp:100)\n    at Create (..\\..\\third_party\\dawn\\src\\dawn\\native\\d3d12\\DeviceD3D12.cpp:85)\n",
      "max_diff": [
        10.879173278808594,
        7.500782012939453,
        5.927822589874268
      ]
    },
    "webnn_gpu": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': DirectML: Failed to open the command recorder.",
      "max_diff": [
        0.0749686062335968,
        0.07239368557929993,
        0.07136225700378418
      ]
    }
  },
  {
    "name": "t5_small_decoder",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
      "error": "",
      "max_diff": [
        0.00006866455078125,
        0.000064849853515625,
        0.000064849853515625
      ]
    }
  },
  {
    "name": "t5_small_encoder",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
    "name": "whisper_tiny_decoder",
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
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
      "e3": "fail",
      "e4": "fail",
      "e5": "fail",
      "e6": "fail",
      "e7": "fail",
      "e8": "fail",
      "error": "",
      "max_diff": [
        26.5541353225708,
        25.51456117630005,
        25.121667861938477
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
    "gpu": "Intel Iris(R) Xe Graphics Direct3D11",
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
      "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep dimensions.",
      "max_diff": []
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
        15.329186916351318,
        15.308025360107422,
        15.307694435119629
      ]
    },
    "webnn_gpu": {
      "e3": "n/a",
      "e4": "n/a",
      "e5": "n/a",
      "e6": "n/a",
      "e7": "n/a",
      "e8": "n/a",
      "error": "Failed to execute 'conv2d' on 'MLGraphBuilder': The length of strides should be 2.",
      "max_diff": [
        0.0000457763671875,
        0.0000457763671875,
        0.0000457763671875
      ]
    }
  }
]