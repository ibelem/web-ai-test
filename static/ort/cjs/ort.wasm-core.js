/*!
 * ONNX Runtime Web v1.17.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// common/dist/esm/backend-impl.js
var backends, backendsSortedByPriority, registerBackend, resolveBackend;
var init_backend_impl = __esm({
  "common/dist/esm/backend-impl.js"() {
    "use strict";
    backends = /* @__PURE__ */ new Map();
    backendsSortedByPriority = [];
    registerBackend = (name, backend, priority) => {
      if (backend && typeof backend.init === "function" && typeof backend.createInferenceSessionHandler === "function") {
        const currentBackend = backends.get(name);
        if (currentBackend === void 0) {
          backends.set(name, { backend, priority });
        } else if (currentBackend.priority > priority) {
          return;
        } else if (currentBackend.priority === priority) {
          if (currentBackend.backend !== backend) {
            throw new Error(`cannot register backend "${name}" using priority ${priority}`);
          }
        }
        if (priority >= 0) {
          const i = backendsSortedByPriority.indexOf(name);
          if (i !== -1) {
            backendsSortedByPriority.splice(i, 1);
          }
          for (let i2 = 0; i2 < backendsSortedByPriority.length; i2++) {
            if (backends.get(backendsSortedByPriority[i2]).priority <= priority) {
              backendsSortedByPriority.splice(i2, 0, name);
              return;
            }
          }
          backendsSortedByPriority.push(name);
        }
        return;
      }
      throw new TypeError("not a valid backend");
    };
    resolveBackend = async (backendHints) => {
      const backendNames = backendHints.length === 0 ? backendsSortedByPriority : backendHints;
      const errors = [];
      for (const backendName of backendNames) {
        const backendInfo = backends.get(backendName);
        if (backendInfo) {
          if (backendInfo.initialized) {
            return backendInfo.backend;
          } else if (backendInfo.aborted) {
            continue;
          }
          const isInitializing = !!backendInfo.initPromise;
          try {
            if (!isInitializing) {
              backendInfo.initPromise = backendInfo.backend.init(backendName);
            }
            await backendInfo.initPromise;
            backendInfo.initialized = true;
            return backendInfo.backend;
          } catch (e) {
            if (!isInitializing) {
              errors.push({ name: backendName, err: e });
            }
            backendInfo.aborted = true;
          } finally {
            delete backendInfo.initPromise;
          }
        }
      }
      throw new Error(`no available backend found. ERR: ${errors.map((e) => `[${e.name}] ${e.err}`).join(", ")}`);
    };
  }
});

// common/dist/esm/backend.js
var init_backend = __esm({
  "common/dist/esm/backend.js"() {
    "use strict";
    init_backend_impl();
  }
});

// common/dist/esm/version.js
var version;
var init_version = __esm({
  "common/dist/esm/version.js"() {
    "use strict";
    version = "1.17.0";
  }
});

// common/dist/esm/env-impl.js
var logLevelValue, env;
var init_env_impl = __esm({
  "common/dist/esm/env-impl.js"() {
    "use strict";
    init_version();
    logLevelValue = "warning";
    env = {
      wasm: {},
      webgl: {},
      webgpu: {},
      versions: { common: version },
      set logLevel(value) {
        if (value === void 0) {
          return;
        }
        if (typeof value !== "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(value) === -1) {
          throw new Error(`Unsupported logging level: ${value}`);
        }
        logLevelValue = value;
      },
      get logLevel() {
        return logLevelValue;
      }
    };
    Object.defineProperty(env, "logLevel", { enumerable: true });
  }
});

// common/dist/esm/env.js
var env2;
var init_env = __esm({
  "common/dist/esm/env.js"() {
    "use strict";
    init_env_impl();
    env2 = env;
  }
});

// common/dist/esm/tensor-conversion-impl.js
var tensorToDataURL, tensorToImageData;
var init_tensor_conversion_impl = __esm({
  "common/dist/esm/tensor-conversion-impl.js"() {
    "use strict";
    tensorToDataURL = (tensor, options) => {
      const canvas = document.createElement("canvas");
      canvas.width = tensor.dims[3];
      canvas.height = tensor.dims[2];
      const pixels2DContext = canvas.getContext("2d");
      if (pixels2DContext != null) {
        let width;
        let height;
        if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
          width = tensor.dims[2];
          height = tensor.dims[3];
        } else {
          width = tensor.dims[3];
          height = tensor.dims[2];
        }
        const inputformat = options?.format !== void 0 ? options.format : "RGB";
        const norm = options?.norm;
        let normMean;
        let normBias;
        if (norm === void 0 || norm.mean === void 0) {
          normMean = [255, 255, 255, 255];
        } else {
          if (typeof norm.mean === "number") {
            normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
          } else {
            normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 0];
            if (norm.mean[3] !== void 0) {
              normMean[3] = norm.mean[3];
            }
          }
        }
        if (norm === void 0 || norm.bias === void 0) {
          normBias = [0, 0, 0, 0];
        } else {
          if (typeof norm.bias === "number") {
            normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
          } else {
            normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
            if (norm.bias[3] !== void 0) {
              normBias[3] = norm.bias[3];
            }
          }
        }
        const stride = height * width;
        let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
        if (inputformat === "RGBA") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
          aTensorPointer = stride * 3;
        } else if (inputformat === "RGB") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
        } else if (inputformat === "RBG") {
          rTensorPointer = 0;
          bTensorPointer = stride;
          gTensorPointer = stride * 2;
        }
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            const R = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
            const G = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
            const B = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
            const A = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
            pixels2DContext.fillStyle = "rgba(" + R + "," + G + "," + B + "," + A + ")";
            pixels2DContext.fillRect(j, i, 1, 1);
          }
        }
        return canvas.toDataURL();
      } else {
        throw new Error("Can not access image data");
      }
    };
    tensorToImageData = (tensor, options) => {
      const pixels2DContext = document.createElement("canvas").getContext("2d");
      let image;
      if (pixels2DContext != null) {
        let width;
        let height;
        let channels;
        if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
          width = tensor.dims[2];
          height = tensor.dims[1];
          channels = tensor.dims[3];
        } else {
          width = tensor.dims[3];
          height = tensor.dims[2];
          channels = tensor.dims[1];
        }
        const inputformat = options !== void 0 ? options.format !== void 0 ? options.format : "RGB" : "RGB";
        const norm = options?.norm;
        let normMean;
        let normBias;
        if (norm === void 0 || norm.mean === void 0) {
          normMean = [255, 255, 255, 255];
        } else {
          if (typeof norm.mean === "number") {
            normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
          } else {
            normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 255];
            if (norm.mean[3] !== void 0) {
              normMean[3] = norm.mean[3];
            }
          }
        }
        if (norm === void 0 || norm.bias === void 0) {
          normBias = [0, 0, 0, 0];
        } else {
          if (typeof norm.bias === "number") {
            normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
          } else {
            normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
            if (norm.bias[3] !== void 0) {
              normBias[3] = norm.bias[3];
            }
          }
        }
        const stride = height * width;
        if (options !== void 0) {
          if (options.format !== void 0 && (channels === 4 && options.format !== "RGBA") || channels === 3 && (options.format !== "RGB" && options.format !== "BGR")) {
            throw new Error("Tensor format doesn't match input tensor dims");
          }
        }
        const step = 4;
        let rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
        let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
        if (inputformat === "RGBA") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
          aTensorPointer = stride * 3;
        } else if (inputformat === "RGB") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
        } else if (inputformat === "RBG") {
          rTensorPointer = 0;
          bTensorPointer = stride;
          gTensorPointer = stride * 2;
        }
        image = pixels2DContext.createImageData(width, height);
        for (let i = 0; i < height * width; rImagePointer += step, gImagePointer += step, bImagePointer += step, aImagePointer += step, i++) {
          image.data[rImagePointer] = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
          image.data[gImagePointer] = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
          image.data[bImagePointer] = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
          image.data[aImagePointer] = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
        }
      } else {
        throw new Error("Can not access image data");
      }
      return image;
    };
  }
});

// common/dist/esm/tensor-factory-impl.js
var bufferToTensor, tensorFromImage, tensorFromTexture, tensorFromGpuBuffer, tensorFromPinnedBuffer;
var init_tensor_factory_impl = __esm({
  "common/dist/esm/tensor-factory-impl.js"() {
    "use strict";
    init_tensor_impl();
    bufferToTensor = (buffer, options) => {
      if (buffer === void 0) {
        throw new Error("Image buffer must be defined");
      }
      if (options.height === void 0 || options.width === void 0) {
        throw new Error("Image height and width must be defined");
      }
      if (options.tensorLayout === "NHWC") {
        throw new Error("NHWC Tensor layout is not supported yet");
      }
      const { height, width } = options;
      const norm = options.norm ?? { mean: 255, bias: 0 };
      let normMean;
      let normBias;
      if (typeof norm.mean === "number") {
        normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
      } else {
        normMean = [norm.mean[0], norm.mean[1], norm.mean[2], norm.mean[3] ?? 255];
      }
      if (typeof norm.bias === "number") {
        normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
      } else {
        normBias = [norm.bias[0], norm.bias[1], norm.bias[2], norm.bias[3] ?? 0];
      }
      const inputformat = options.format !== void 0 ? options.format : "RGBA";
      const outputformat = options.tensorFormat !== void 0 ? options.tensorFormat !== void 0 ? options.tensorFormat : "RGB" : "RGB";
      const stride = height * width;
      const float32Data = outputformat === "RGBA" ? new Float32Array(stride * 4) : new Float32Array(stride * 3);
      let step = 4, rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
      let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
      if (inputformat === "RGB") {
        step = 3;
        rImagePointer = 0;
        gImagePointer = 1;
        bImagePointer = 2;
        aImagePointer = -1;
      }
      if (outputformat === "RGBA") {
        aTensorPointer = stride * 3;
      } else if (outputformat === "RBG") {
        rTensorPointer = 0;
        bTensorPointer = stride;
        gTensorPointer = stride * 2;
      } else if (outputformat === "BGR") {
        bTensorPointer = 0;
        gTensorPointer = stride;
        rTensorPointer = stride * 2;
      }
      for (let i = 0; i < stride; i++, rImagePointer += step, bImagePointer += step, gImagePointer += step, aImagePointer += step) {
        float32Data[rTensorPointer++] = (buffer[rImagePointer] + normBias[0]) / normMean[0];
        float32Data[gTensorPointer++] = (buffer[gImagePointer] + normBias[1]) / normMean[1];
        float32Data[bTensorPointer++] = (buffer[bImagePointer] + normBias[2]) / normMean[2];
        if (aTensorPointer !== -1 && aImagePointer !== -1) {
          float32Data[aTensorPointer++] = (buffer[aImagePointer] + normBias[3]) / normMean[3];
        }
      }
      const outputTensor = outputformat === "RGBA" ? new Tensor("float32", float32Data, [1, 4, height, width]) : new Tensor("float32", float32Data, [1, 3, height, width]);
      return outputTensor;
    };
    tensorFromImage = async (image, options) => {
      const isHTMLImageEle = typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement;
      const isImageDataEle = typeof ImageData !== "undefined" && image instanceof ImageData;
      const isImageBitmap = typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap;
      const isString = typeof image === "string";
      let data;
      let bufferToTensorOptions = options ?? {};
      if (isHTMLImageEle) {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const pixels2DContext = canvas.getContext("2d");
        if (pixels2DContext != null) {
          let height = image.height;
          let width = image.width;
          if (options !== void 0 && options.resizedHeight !== void 0 && options.resizedWidth !== void 0) {
            height = options.resizedHeight;
            width = options.resizedWidth;
          }
          if (options !== void 0) {
            bufferToTensorOptions = options;
            if (options.tensorFormat !== void 0) {
              throw new Error("Image input config format must be RGBA for HTMLImageElement");
            } else {
              bufferToTensorOptions.tensorFormat = "RGBA";
            }
            bufferToTensorOptions.height = height;
            bufferToTensorOptions.width = width;
          } else {
            bufferToTensorOptions.tensorFormat = "RGBA";
            bufferToTensorOptions.height = height;
            bufferToTensorOptions.width = width;
          }
          pixels2DContext.drawImage(image, 0, 0);
          data = pixels2DContext.getImageData(0, 0, width, height).data;
        } else {
          throw new Error("Can not access image data");
        }
      } else if (isImageDataEle) {
        let height;
        let width;
        if (options !== void 0 && options.resizedWidth !== void 0 && options.resizedHeight !== void 0) {
          height = options.resizedHeight;
          width = options.resizedWidth;
        } else {
          height = image.height;
          width = image.width;
        }
        if (options !== void 0) {
          bufferToTensorOptions = options;
        }
        bufferToTensorOptions.format = "RGBA";
        bufferToTensorOptions.height = height;
        bufferToTensorOptions.width = width;
        if (options !== void 0) {
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = width;
          tempCanvas.height = height;
          const pixels2DContext = tempCanvas.getContext("2d");
          if (pixels2DContext != null) {
            pixels2DContext.putImageData(image, 0, 0);
            data = pixels2DContext.getImageData(0, 0, width, height).data;
          } else {
            throw new Error("Can not access image data");
          }
        } else {
          data = image.data;
        }
      } else if (isImageBitmap) {
        if (options === void 0) {
          throw new Error("Please provide image config with format for Imagebitmap");
        }
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const pixels2DContext = canvas.getContext("2d");
        if (pixels2DContext != null) {
          const height = image.height;
          const width = image.width;
          pixels2DContext.drawImage(image, 0, 0, width, height);
          data = pixels2DContext.getImageData(0, 0, width, height).data;
          bufferToTensorOptions.height = height;
          bufferToTensorOptions.width = width;
          return bufferToTensor(data, bufferToTensorOptions);
        } else {
          throw new Error("Can not access image data");
        }
      } else if (isString) {
        return new Promise((resolve, reject) => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!image || !context) {
            return reject();
          }
          const newImage = new Image();
          newImage.crossOrigin = "Anonymous";
          newImage.src = image;
          newImage.onload = () => {
            canvas.width = newImage.width;
            canvas.height = newImage.height;
            context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
            const img = context.getImageData(0, 0, canvas.width, canvas.height);
            bufferToTensorOptions.height = canvas.height;
            bufferToTensorOptions.width = canvas.width;
            resolve(bufferToTensor(img.data, bufferToTensorOptions));
          };
        });
      } else {
        throw new Error("Input data provided is not supported - aborted tensor creation");
      }
      if (data !== void 0) {
        return bufferToTensor(data, bufferToTensorOptions);
      } else {
        throw new Error("Input data provided is not supported - aborted tensor creation");
      }
    };
    tensorFromTexture = (texture, options) => {
      const { width, height, download, dispose } = options;
      const dims = [1, height, width, 4];
      return new Tensor({ location: "texture", type: "float32", texture, dims, download, dispose });
    };
    tensorFromGpuBuffer = (gpuBuffer, options) => {
      const { dataType, dims, download, dispose } = options;
      return new Tensor({ location: "gpu-buffer", type: dataType ?? "float32", gpuBuffer, dims, download, dispose });
    };
    tensorFromPinnedBuffer = (type, buffer, dims) => new Tensor({ location: "cpu-pinned", type, data: buffer, dims: dims ?? [buffer.length] });
  }
});

// common/dist/esm/tensor-impl-type-mapping.js
var NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP, NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP, isBigIntChecked, checkBigInt;
var init_tensor_impl_type_mapping = __esm({
  "common/dist/esm/tensor-impl-type-mapping.js"() {
    "use strict";
    NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP = /* @__PURE__ */ new Map([
      ["float32", Float32Array],
      ["uint8", Uint8Array],
      ["int8", Int8Array],
      ["uint16", Uint16Array],
      ["float16", Uint16Array],
      ["int16", Int16Array],
      ["int32", Int32Array],
      ["bool", Uint8Array],
      ["float64", Float64Array],
      ["uint32", Uint32Array]
    ]);
    NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP = /* @__PURE__ */ new Map([
      [Float32Array, "float32"],
      [Uint8Array, "uint8"],
      [Int8Array, "int8"],
      [Uint16Array, "uint16"],
      [Int16Array, "int16"],
      [Int32Array, "int32"],
      [Float64Array, "float64"],
      [Uint32Array, "uint32"]
    ]);
    isBigIntChecked = false;
    checkBigInt = () => {
      if (!isBigIntChecked) {
        isBigIntChecked = true;
        const isBigInt64ArrayAvailable = typeof BigInt64Array !== "undefined" && typeof BigInt64Array.from === "function";
        const isBigUint64ArrayAvailable = typeof BigUint64Array !== "undefined" && typeof BigUint64Array.from === "function";
        if (isBigInt64ArrayAvailable) {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64", BigInt64Array);
          NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array, "int64");
        }
        if (isBigUint64ArrayAvailable) {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64", BigUint64Array);
          NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array, "uint64");
        }
      }
    };
  }
});

// common/dist/esm/tensor-utils-impl.js
var calculateSize, tensorReshape;
var init_tensor_utils_impl = __esm({
  "common/dist/esm/tensor-utils-impl.js"() {
    "use strict";
    init_tensor_impl();
    calculateSize = (dims) => {
      let size = 1;
      for (let i = 0; i < dims.length; i++) {
        const dim = dims[i];
        if (typeof dim !== "number" || !Number.isSafeInteger(dim)) {
          throw new TypeError(`dims[${i}] must be an integer, got: ${dim}`);
        }
        if (dim < 0) {
          throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${dim}`);
        }
        size *= dim;
      }
      return size;
    };
    tensorReshape = (tensor, dims) => {
      switch (tensor.location) {
        case "cpu":
          return new Tensor(tensor.type, tensor.data, dims);
        case "cpu-pinned":
          return new Tensor({
            location: "cpu-pinned",
            data: tensor.data,
            type: tensor.type,
            dims
          });
        case "texture":
          return new Tensor({
            location: "texture",
            texture: tensor.texture,
            type: tensor.type,
            dims
          });
        case "gpu-buffer":
          return new Tensor({
            location: "gpu-buffer",
            gpuBuffer: tensor.gpuBuffer,
            type: tensor.type,
            dims
          });
        default:
          throw new Error(`tensorReshape: tensor location ${tensor.location} is not supported`);
      }
    };
  }
});

// common/dist/esm/tensor-impl.js
var Tensor;
var init_tensor_impl = __esm({
  "common/dist/esm/tensor-impl.js"() {
    "use strict";
    init_tensor_conversion_impl();
    init_tensor_factory_impl();
    init_tensor_impl_type_mapping();
    init_tensor_utils_impl();
    Tensor = class {
      /**
       * implementation.
       */
      constructor(arg0, arg1, arg2) {
        checkBigInt();
        let type;
        let dims;
        if (typeof arg0 === "object" && "location" in arg0) {
          this.dataLocation = arg0.location;
          type = arg0.type;
          dims = arg0.dims;
          switch (arg0.location) {
            case "cpu-pinned": {
              const expectedTypedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(type);
              if (!expectedTypedArrayConstructor) {
                throw new TypeError(`unsupported type "${type}" to create tensor from pinned buffer`);
              }
              if (!(arg0.data instanceof expectedTypedArrayConstructor)) {
                throw new TypeError(`buffer should be of type ${expectedTypedArrayConstructor.name}`);
              }
              this.cpuData = arg0.data;
              break;
            }
            case "texture": {
              if (type !== "float32") {
                throw new TypeError(`unsupported type "${type}" to create tensor from texture`);
              }
              this.gpuTextureData = arg0.texture;
              this.downloader = arg0.download;
              this.disposer = arg0.dispose;
              break;
            }
            case "gpu-buffer": {
              if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "bool") {
                throw new TypeError(`unsupported type "${type}" to create tensor from gpu buffer`);
              }
              this.gpuBufferData = arg0.gpuBuffer;
              this.downloader = arg0.download;
              this.disposer = arg0.dispose;
              break;
            }
            default:
              throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
          }
        } else {
          let data;
          let maybeDims;
          if (typeof arg0 === "string") {
            type = arg0;
            maybeDims = arg2;
            if (arg0 === "string") {
              if (!Array.isArray(arg1)) {
                throw new TypeError("A string tensor's data must be a string array.");
              }
              data = arg1;
            } else {
              const typedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(arg0);
              if (typedArrayConstructor === void 0) {
                throw new TypeError(`Unsupported tensor type: ${arg0}.`);
              }
              if (Array.isArray(arg1)) {
                if (arg0 === "float16") {
                  throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");
                } else if (arg0 === "uint64" || arg0 === "int64") {
                  data = typedArrayConstructor.from(arg1, BigInt);
                } else {
                  data = typedArrayConstructor.from(arg1);
                }
              } else if (arg1 instanceof typedArrayConstructor) {
                data = arg1;
              } else {
                throw new TypeError(`A ${type} tensor's data must be type of ${typedArrayConstructor}`);
              }
            }
          } else {
            maybeDims = arg1;
            if (Array.isArray(arg0)) {
              if (arg0.length === 0) {
                throw new TypeError("Tensor type cannot be inferred from an empty array.");
              }
              const firstElementType = typeof arg0[0];
              if (firstElementType === "string") {
                type = "string";
                data = arg0;
              } else if (firstElementType === "boolean") {
                type = "bool";
                data = Uint8Array.from(arg0);
              } else {
                throw new TypeError(`Invalid element type of data array: ${firstElementType}.`);
              }
            } else {
              const mappedType = NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.get(arg0.constructor);
              if (mappedType === void 0) {
                throw new TypeError(`Unsupported type for tensor data: ${arg0.constructor}.`);
              }
              type = mappedType;
              data = arg0;
            }
          }
          if (maybeDims === void 0) {
            maybeDims = [data.length];
          } else if (!Array.isArray(maybeDims)) {
            throw new TypeError("A tensor's dims must be a number array");
          }
          dims = maybeDims;
          this.cpuData = data;
          this.dataLocation = "cpu";
        }
        const size = calculateSize(dims);
        if (this.cpuData && size !== this.cpuData.length) {
          throw new Error(`Tensor's size(${size}) does not match data length(${this.cpuData.length}).`);
        }
        this.type = type;
        this.dims = dims;
        this.size = size;
      }
      // #endregion
      // #region factory
      static async fromImage(image, options) {
        return tensorFromImage(image, options);
      }
      static fromTexture(texture, options) {
        return tensorFromTexture(texture, options);
      }
      static fromGpuBuffer(gpuBuffer, options) {
        return tensorFromGpuBuffer(gpuBuffer, options);
      }
      static fromPinnedBuffer(type, buffer, dims) {
        return tensorFromPinnedBuffer(type, buffer, dims);
      }
      // #endregion
      // #region conversions
      toDataURL(options) {
        return tensorToDataURL(this, options);
      }
      toImageData(options) {
        return tensorToImageData(this, options);
      }
      // #endregion
      // #region properties
      get data() {
        this.ensureValid();
        if (!this.cpuData) {
          throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
        }
        return this.cpuData;
      }
      get location() {
        return this.dataLocation;
      }
      get texture() {
        this.ensureValid();
        if (!this.gpuTextureData) {
          throw new Error("The data is not stored as a WebGL texture.");
        }
        return this.gpuTextureData;
      }
      get gpuBuffer() {
        this.ensureValid();
        if (!this.gpuBufferData) {
          throw new Error("The data is not stored as a WebGPU buffer.");
        }
        return this.gpuBufferData;
      }
      // #endregion
      // #region methods
      async getData(releaseData) {
        this.ensureValid();
        switch (this.dataLocation) {
          case "cpu":
          case "cpu-pinned":
            return this.data;
          case "texture":
          case "gpu-buffer": {
            if (!this.downloader) {
              throw new Error("The current tensor is not created with a specified data downloader.");
            }
            if (this.isDownloading) {
              throw new Error("The current tensor is being downloaded.");
            }
            try {
              this.isDownloading = true;
              const data = await this.downloader();
              this.downloader = void 0;
              this.dataLocation = "cpu";
              this.cpuData = data;
              if (releaseData && this.disposer) {
                this.disposer();
                this.disposer = void 0;
              }
              return data;
            } finally {
              this.isDownloading = false;
            }
          }
          default:
            throw new Error(`cannot get data from location: ${this.dataLocation}`);
        }
      }
      dispose() {
        if (this.isDownloading) {
          throw new Error("The current tensor is being downloaded.");
        }
        if (this.disposer) {
          this.disposer();
          this.disposer = void 0;
        }
        this.cpuData = void 0;
        this.gpuTextureData = void 0;
        this.gpuBufferData = void 0;
        this.downloader = void 0;
        this.isDownloading = void 0;
        this.dataLocation = "none";
      }
      // #endregion
      // #region tensor utilities
      ensureValid() {
        if (this.dataLocation === "none") {
          throw new Error("The tensor is disposed.");
        }
      }
      reshape(dims) {
        this.ensureValid();
        if (this.downloader || this.disposer) {
          throw new Error("Cannot reshape a tensor that owns GPU resource.");
        }
        return tensorReshape(this, dims);
      }
    };
  }
});

// common/dist/esm/tensor.js
var Tensor2;
var init_tensor = __esm({
  "common/dist/esm/tensor.js"() {
    "use strict";
    init_tensor_impl();
    Tensor2 = Tensor;
  }
});

// common/dist/esm/trace.js
var TRACE, TRACE_FUNC, TRACE_FUNC_BEGIN, TRACE_FUNC_END;
var init_trace = __esm({
  "common/dist/esm/trace.js"() {
    "use strict";
    init_env_impl();
    TRACE = (deviceType, label) => {
      if (!env.wasm.trace) {
        return;
      }
      console.timeStamp(`${deviceType}::ORT::${label}`);
    };
    TRACE_FUNC = (msg, extraMsg) => {
      const stack = new Error().stack?.split(/\r\n|\r|\n/g) || [];
      let hasTraceFunc = false;
      for (let i = 0; i < stack.length; i++) {
        if (hasTraceFunc && !stack[i].includes("TRACE_FUNC")) {
          let label = `FUNC_${msg}::${stack[i].trim().split(" ")[1]}`;
          if (extraMsg) {
            label += `::${extraMsg}`;
          }
          TRACE("CPU", label);
          return;
        }
        if (stack[i].includes("TRACE_FUNC")) {
          hasTraceFunc = true;
        }
      }
    };
    TRACE_FUNC_BEGIN = (extraMsg) => {
      if (!env.wasm.trace) {
        return;
      }
      TRACE_FUNC("BEGIN", extraMsg);
    };
    TRACE_FUNC_END = (extraMsg) => {
      if (!env.wasm.trace) {
        return;
      }
      TRACE_FUNC("END", extraMsg);
    };
  }
});

// common/dist/esm/inference-session-impl.js
var InferenceSession;
var init_inference_session_impl = __esm({
  "common/dist/esm/inference-session-impl.js"() {
    "use strict";
    init_backend_impl();
    init_tensor();
    init_trace();
    InferenceSession = class _InferenceSession {
      constructor(handler) {
        this.handler = handler;
      }
      async run(feeds, arg1, arg2) {
        TRACE_FUNC_BEGIN();
        const fetches = {};
        let options = {};
        if (typeof feeds !== "object" || feeds === null || feeds instanceof Tensor2 || Array.isArray(feeds)) {
          throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
        }
        let isFetchesEmpty = true;
        if (typeof arg1 === "object") {
          if (arg1 === null) {
            throw new TypeError("Unexpected argument[1]: cannot be null.");
          }
          if (arg1 instanceof Tensor2) {
            throw new TypeError("'fetches' cannot be a Tensor");
          }
          if (Array.isArray(arg1)) {
            if (arg1.length === 0) {
              throw new TypeError("'fetches' cannot be an empty array.");
            }
            isFetchesEmpty = false;
            for (const name of arg1) {
              if (typeof name !== "string") {
                throw new TypeError("'fetches' must be a string array or an object.");
              }
              if (this.outputNames.indexOf(name) === -1) {
                throw new RangeError(`'fetches' contains invalid output name: ${name}.`);
              }
              fetches[name] = null;
            }
            if (typeof arg2 === "object" && arg2 !== null) {
              options = arg2;
            } else if (typeof arg2 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
          } else {
            let isFetches = false;
            const arg1Keys = Object.getOwnPropertyNames(arg1);
            for (const name of this.outputNames) {
              if (arg1Keys.indexOf(name) !== -1) {
                const v = arg1[name];
                if (v === null || v instanceof Tensor2) {
                  isFetches = true;
                  isFetchesEmpty = false;
                  fetches[name] = v;
                }
              }
            }
            if (isFetches) {
              if (typeof arg2 === "object" && arg2 !== null) {
                options = arg2;
              } else if (typeof arg2 !== "undefined") {
                throw new TypeError("'options' must be an object.");
              }
            } else {
              options = arg1;
            }
          }
        } else if (typeof arg1 !== "undefined") {
          throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
        }
        for (const name of this.inputNames) {
          if (typeof feeds[name] === "undefined") {
            throw new Error(`input '${name}' is missing in 'feeds'.`);
          }
        }
        if (isFetchesEmpty) {
          for (const name of this.outputNames) {
            fetches[name] = null;
          }
        }
        const results = await this.handler.run(feeds, fetches, options);
        const returnValue = {};
        for (const key in results) {
          if (Object.hasOwnProperty.call(results, key)) {
            const result = results[key];
            if (result instanceof Tensor2) {
              returnValue[key] = result;
            } else {
              returnValue[key] = new Tensor2(result.type, result.data, result.dims);
            }
          }
        }
        TRACE_FUNC_END();
        return returnValue;
      }
      async release() {
        return this.handler.dispose();
      }
      static async create(arg0, arg1, arg2, arg3) {
        TRACE_FUNC_BEGIN();
        let filePathOrUint8Array;
        let options = {};
        if (typeof arg0 === "string") {
          filePathOrUint8Array = arg0;
          if (typeof arg1 === "object" && arg1 !== null) {
            options = arg1;
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("'options' must be an object.");
          }
        } else if (arg0 instanceof Uint8Array) {
          filePathOrUint8Array = arg0;
          if (typeof arg1 === "object" && arg1 !== null) {
            options = arg1;
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("'options' must be an object.");
          }
        } else if (arg0 instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && arg0 instanceof SharedArrayBuffer) {
          const buffer = arg0;
          let byteOffset = 0;
          let byteLength = arg0.byteLength;
          if (typeof arg1 === "object" && arg1 !== null) {
            options = arg1;
          } else if (typeof arg1 === "number") {
            byteOffset = arg1;
            if (!Number.isSafeInteger(byteOffset)) {
              throw new RangeError("'byteOffset' must be an integer.");
            }
            if (byteOffset < 0 || byteOffset >= buffer.byteLength) {
              throw new RangeError(`'byteOffset' is out of range [0, ${buffer.byteLength}).`);
            }
            byteLength = arg0.byteLength - byteOffset;
            if (typeof arg2 === "number") {
              byteLength = arg2;
              if (!Number.isSafeInteger(byteLength)) {
                throw new RangeError("'byteLength' must be an integer.");
              }
              if (byteLength <= 0 || byteOffset + byteLength > buffer.byteLength) {
                throw new RangeError(`'byteLength' is out of range (0, ${buffer.byteLength - byteOffset}].`);
              }
              if (typeof arg3 === "object" && arg3 !== null) {
                options = arg3;
              } else if (typeof arg3 !== "undefined") {
                throw new TypeError("'options' must be an object.");
              }
            } else if (typeof arg2 !== "undefined") {
              throw new TypeError("'byteLength' must be a number.");
            }
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("'options' must be an object.");
          }
          filePathOrUint8Array = new Uint8Array(buffer, byteOffset, byteLength);
        } else {
          throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
        }
        const eps = options.executionProviders || [];
        const backendHints = eps.map((i) => typeof i === "string" ? i : i.name);
        const backend = await resolveBackend(backendHints);
        const handler = await backend.createInferenceSessionHandler(filePathOrUint8Array, options);
        TRACE_FUNC_END();
        return new _InferenceSession(handler);
      }
      startProfiling() {
        this.handler.startProfiling();
      }
      endProfiling() {
        this.handler.endProfiling();
      }
      get inputNames() {
        return this.handler.inputNames;
      }
      get outputNames() {
        return this.handler.outputNames;
      }
    };
  }
});

// common/dist/esm/inference-session.js
var InferenceSession2;
var init_inference_session = __esm({
  "common/dist/esm/inference-session.js"() {
    "use strict";
    init_inference_session_impl();
    InferenceSession2 = InferenceSession;
  }
});

// common/dist/esm/onnx-value.js
var init_onnx_value = __esm({
  "common/dist/esm/onnx-value.js"() {
    "use strict";
  }
});

// common/dist/esm/training-session-impl.js
var noBackendErrMsg, TrainingSession;
var init_training_session_impl = __esm({
  "common/dist/esm/training-session-impl.js"() {
    "use strict";
    init_backend_impl();
    init_tensor();
    noBackendErrMsg = "Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.";
    TrainingSession = class _TrainingSession {
      constructor(handler, hasOptimizerModel, hasEvalModel) {
        this.handler = handler;
        this.hasOptimizerModel = hasOptimizerModel;
        this.hasEvalModel = hasEvalModel;
      }
      get trainingInputNames() {
        return this.handler.inputNames;
      }
      get trainingOutputNames() {
        return this.handler.outputNames;
      }
      get evalInputNames() {
        if (this.hasEvalModel) {
          return this.handler.evalInputNames;
        } else {
          throw new Error("This training session has no evalModel loaded.");
        }
      }
      get evalOutputNames() {
        if (this.hasEvalModel) {
          return this.handler.evalOutputNames;
        } else {
          throw new Error("This training session has no evalModel loaded.");
        }
      }
      static async create(trainingOptions, sessionOptions) {
        const evalModel = trainingOptions.evalModel || "";
        const optimizerModel = trainingOptions.optimizerModel || "";
        const options = sessionOptions || {};
        const eps = options.executionProviders || [];
        const backendHints = eps.map((i) => typeof i === "string" ? i : i.name);
        const backend = await resolveBackend(backendHints);
        if (backend.createTrainingSessionHandler) {
          const handler = await backend.createTrainingSessionHandler(trainingOptions.checkpointState, trainingOptions.trainModel, evalModel, optimizerModel, options);
          return new _TrainingSession(handler, !!trainingOptions.optimizerModel, !!trainingOptions.evalModel);
        } else {
          throw new Error(noBackendErrMsg);
        }
      }
      /**
       * Helper function for runTrainStep and future runStep methods that handles the type-narrowing conversion from
       * the given parameters to SessionHandler.FetchesType and RunOptions.
       *
       * @param inputNames the feeds object is checked that they contain all input names in the provided list of input
       * names.
       * @param outputNames the fetches object is checked that their keys match up with valid names in the list of output
       * names.
       * @param feeds the required input
       * @param arg1 narrowed & converted into the SessionHandler.FetchesType or RunOptions object
       * @param arg2 optional RunOptions object.
       * @returns
       */
      typeNarrowingForRunStep(inputNames, outputNames, feeds, arg1, arg2) {
        const fetches = {};
        let options = {};
        if (typeof feeds !== "object" || feeds === null || feeds instanceof Tensor2 || Array.isArray(feeds)) {
          throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
        }
        let isFetchesEmpty = true;
        if (typeof arg1 === "object") {
          if (arg1 === null) {
            throw new TypeError("Unexpected argument[1]: cannot be null.");
          }
          if (arg1 instanceof Tensor2) {
            throw new TypeError("'fetches' cannot be a Tensor");
          }
          if (Array.isArray(arg1)) {
            if (arg1.length === 0) {
              throw new TypeError("'fetches' cannot be an empty array.");
            }
            isFetchesEmpty = false;
            for (const name of arg1) {
              if (typeof name !== "string") {
                throw new TypeError("'fetches' must be a string array or an object.");
              }
              if (outputNames.indexOf(name) === -1) {
                throw new RangeError(`'fetches' contains invalid output name: ${name}.`);
              }
              fetches[name] = null;
            }
            if (typeof arg2 === "object" && arg2 !== null) {
              options = arg2;
            } else if (typeof arg2 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
          } else {
            let isFetches = false;
            const arg1Keys = Object.getOwnPropertyNames(arg1);
            for (const name of outputNames) {
              if (arg1Keys.indexOf(name) !== -1) {
                const v = arg1[name];
                if (v === null || v instanceof Tensor2) {
                  isFetches = true;
                  isFetchesEmpty = false;
                  fetches[name] = v;
                }
              }
            }
            if (isFetches) {
              if (typeof arg2 === "object" && arg2 !== null) {
                options = arg2;
              } else if (typeof arg2 !== "undefined") {
                throw new TypeError("'options' must be an object.");
              }
            } else {
              options = arg1;
            }
          }
        } else if (typeof arg1 !== "undefined") {
          throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
        }
        for (const name of inputNames) {
          if (typeof feeds[name] === "undefined") {
            throw new Error(`input '${name}' is missing in 'feeds'.`);
          }
        }
        if (isFetchesEmpty) {
          for (const name of outputNames) {
            fetches[name] = null;
          }
        }
        return [fetches, options];
      }
      /**
       * Helper method for runTrainStep and any other runStep methods. Takes the ReturnType result from the SessionHandler
       * and changes it into a map of Tensors.
       *
       * @param results
       * @returns
       */
      convertHandlerReturnTypeToMapOfTensors(results) {
        const returnValue = {};
        for (const key in results) {
          if (Object.hasOwnProperty.call(results, key)) {
            const result = results[key];
            if (result instanceof Tensor2) {
              returnValue[key] = result;
            } else {
              returnValue[key] = new Tensor2(result.type, result.data, result.dims);
            }
          }
        }
        return returnValue;
      }
      async lazyResetGrad() {
        await this.handler.lazyResetGrad();
      }
      async runTrainStep(feeds, arg1, arg2) {
        const [fetches, options] = this.typeNarrowingForRunStep(this.trainingInputNames, this.trainingOutputNames, feeds, arg1, arg2);
        const results = await this.handler.runTrainStep(feeds, fetches, options);
        return this.convertHandlerReturnTypeToMapOfTensors(results);
      }
      async runOptimizerStep(options) {
        if (this.hasOptimizerModel) {
          await this.handler.runOptimizerStep(options || {});
        } else {
          throw new Error("This TrainingSession has no OptimizerModel loaded.");
        }
      }
      async runEvalStep(feeds, arg1, arg2) {
        if (this.hasEvalModel) {
          const [fetches, options] = this.typeNarrowingForRunStep(this.evalInputNames, this.evalOutputNames, feeds, arg1, arg2);
          const results = await this.handler.runEvalStep(feeds, fetches, options);
          return this.convertHandlerReturnTypeToMapOfTensors(results);
        } else {
          throw new Error("This TrainingSession has no EvalModel loaded.");
        }
      }
      async getParametersSize(trainableOnly = true) {
        return this.handler.getParametersSize(trainableOnly);
      }
      async loadParametersBuffer(array, trainableOnly = true) {
        const paramsSize = await this.getParametersSize(trainableOnly);
        if (array.length !== 4 * paramsSize) {
          throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");
        }
        return this.handler.loadParametersBuffer(array, trainableOnly);
      }
      async getContiguousParameters(trainableOnly = true) {
        return this.handler.getContiguousParameters(trainableOnly);
      }
      async release() {
        return this.handler.dispose();
      }
    };
  }
});

// common/dist/esm/training-session.js
var TrainingSession2;
var init_training_session = __esm({
  "common/dist/esm/training-session.js"() {
    "use strict";
    init_training_session_impl();
    TrainingSession2 = TrainingSession;
  }
});

// common/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  InferenceSession: () => InferenceSession2,
  TRACE: () => TRACE,
  TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
  TRACE_FUNC_END: () => TRACE_FUNC_END,
  Tensor: () => Tensor2,
  TrainingSession: () => TrainingSession2,
  env: () => env2,
  registerBackend: () => registerBackend
});
var init_esm = __esm({
  "common/dist/esm/index.js"() {
    "use strict";
    init_backend();
    init_env();
    init_inference_session();
    init_tensor();
    init_trace();
    init_onnx_value();
    init_training_session();
  }
});

// nodejs-ignore:node:os
var cpus;
var init_node_os = __esm({
  "nodejs-ignore:node:os"() {
    cpus = void 0;
  }
});

// nodejs-ignore:fs
var fs_exports = {};
__export(fs_exports, {
  readFile: () => readFile
});
var readFile;
var init_fs = __esm({
  "nodejs-ignore:fs"() {
    readFile = void 0;
  }
});

// nodejs-ignore:path
var path_exports = {};
__export(path_exports, {
  join: () => join
});
var join;
var init_path = __esm({
  "nodejs-ignore:path"() {
    join = void 0;
  }
});

// web/lib/wasm/binding/ort-wasm.js
var require_ort_wasm = __commonJS({
  "web/lib/wasm/binding/ort-wasm.js"(exports, module2) {
    "use strict";
    var ortWasm = (() => {
      var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
      if (typeof __filename !== "undefined")
        _scriptDir = _scriptDir || __filename;
      return function(moduleArg = {}) {
        var h = moduleArg, aa, ba;
        h.ready = new Promise((a, b) => {
          aa = a;
          ba = b;
        });
        var ca = Object.assign({}, h), da = "./this.program", ea = "object" == typeof window, m = "function" == typeof importScripts, fa = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, p = "", ha, t, w;
        if (fa) {
          var fs = (init_fs(), __toCommonJS(fs_exports)), ia = (init_path(), __toCommonJS(path_exports));
          p = m ? ia.dirname(p) + "/" : __dirname + "/";
          ha = (a, b) => {
            a = a.startsWith("file://") ? new URL(a) : ia.normalize(a);
            return fs.readFileSync(a, b ? void 0 : "utf8");
          };
          w = (a) => {
            a = ha(a, true);
            a.buffer || (a = new Uint8Array(a));
            return a;
          };
          t = (a, b, c, d = true) => {
            a = a.startsWith("file://") ? new URL(a) : ia.normalize(a);
            fs.readFile(a, d ? void 0 : "utf8", (e, g) => {
              e ? c(e) : b(d ? g.buffer : g);
            });
          };
          !h.thisProgram && 1 < process.argv.length && (da = process.argv[1].replace(/\\/g, "/"));
          process.argv.slice(2);
          h.inspect = () => "[Emscripten Module object]";
        } else if (ea || m)
          m ? p = self.location.href : "undefined" != typeof document && document.currentScript && (p = document.currentScript.src), _scriptDir && (p = _scriptDir), 0 !== p.indexOf("blob:") ? p = p.substr(0, p.replace(/[?#].*/, "").lastIndexOf("/") + 1) : p = "", ha = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.send(null);
            return b.responseText;
          }, m && (w = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          }), t = (a, b, c) => {
            var d = new XMLHttpRequest();
            d.open("GET", a, true);
            d.responseType = "arraybuffer";
            d.onload = () => {
              200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
            };
            d.onerror = c;
            d.send(null);
          };
        var ja = console.log.bind(console), x = console.error.bind(console);
        Object.assign(h, ca);
        ca = null;
        "object" != typeof WebAssembly && ka("no native wasm support detected");
        var z, la = false, A, B, C, D, E, G, ma, na, oa, pa;
        function qa() {
          var a = z.buffer;
          h.HEAP8 = A = new Int8Array(a);
          h.HEAP16 = C = new Int16Array(a);
          h.HEAPU8 = B = new Uint8Array(a);
          h.HEAPU16 = D = new Uint16Array(a);
          h.HEAP32 = E = new Int32Array(a);
          h.HEAPU32 = G = new Uint32Array(a);
          h.HEAPF32 = ma = new Float32Array(a);
          h.HEAPF64 = pa = new Float64Array(a);
          h.HEAP64 = na = new BigInt64Array(a);
          h.HEAPU64 = oa = new BigUint64Array(a);
        }
        var ra = [], sa = [], ta = [], I = 0, ua = null, J = null;
        function ka(a) {
          a = "Aborted(" + a + ")";
          x(a);
          la = true;
          a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
          ba(a);
          throw a;
        }
        function va(a) {
          return a.startsWith("data:application/octet-stream;base64,");
        }
        var K;
        K = "ort-wasm.wasm";
        if (!va(K)) {
          var wa = K;
          K = h.locateFile ? h.locateFile(wa, p) : p + wa;
        }
        function xa(a) {
          if (w)
            return w(a);
          throw "both async and sync fetching of the wasm failed";
        }
        function ya(a) {
          if (ea || m) {
            if ("function" == typeof fetch && !a.startsWith("file://"))
              return fetch(a, { credentials: "same-origin" }).then((b) => {
                if (!b.ok)
                  throw "failed to load wasm binary file at '" + a + "'";
                return b.arrayBuffer();
              }).catch(() => xa(a));
            if (t)
              return new Promise((b, c) => {
                t(a, (d) => b(new Uint8Array(d)), c);
              });
          }
          return Promise.resolve().then(() => xa(a));
        }
        function za(a, b, c) {
          return ya(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {
            x(`failed to asynchronously prepare wasm: ${d}`);
            ka(d);
          });
        }
        function Aa(a, b) {
          var c = K;
          return "function" != typeof WebAssembly.instantiateStreaming || va(c) || c.startsWith("file://") || fa || "function" != typeof fetch ? za(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
            x(`wasm streaming compile failed: ${e}`);
            x("falling back to ArrayBuffer instantiation");
            return za(c, a, b);
          }));
        }
        function Ba(a) {
          this.Va = a - 24;
          this.fb = function(b) {
            G[this.Va + 4 >>> 2 >>> 0] = b;
          };
          this.eb = function(b) {
            G[this.Va + 8 >>> 2 >>> 0] = b;
          };
          this.Za = function(b, c) {
            this.$a();
            this.fb(b);
            this.eb(c);
          };
          this.$a = function() {
            G[this.Va + 16 >>> 2 >>> 0] = 0;
          };
        }
        var Ca = 0, Da = 0, Ea = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, Fa = (a, b, c) => {
          b >>>= 0;
          var d = b + c;
          for (c = b; a[c] && !(c >= d); )
            ++c;
          if (16 < c - b && a.buffer && Ea)
            return Ea.decode(a.subarray(b, c));
          for (d = ""; b < c; ) {
            var e = a[b++];
            if (e & 128) {
              var g = a[b++] & 63;
              if (192 == (e & 224))
                d += String.fromCharCode((e & 31) << 6 | g);
              else {
                var l = a[b++] & 63;
                e = 224 == (e & 240) ? (e & 15) << 12 | g << 6 | l : (e & 7) << 18 | g << 12 | l << 6 | a[b++] & 63;
                65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
              }
            } else
              d += String.fromCharCode(e);
          }
          return d;
        }, L = (a, b) => (a >>>= 0) ? Fa(B, a, b) : "", M = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
          }
          return b;
        }, N = (a, b, c, d) => {
          c >>>= 0;
          if (!(0 < d))
            return 0;
          var e = c;
          d = c + d - 1;
          for (var g = 0; g < a.length; ++g) {
            var l = a.charCodeAt(g);
            if (55296 <= l && 57343 >= l) {
              var k = a.charCodeAt(++g);
              l = 65536 + ((l & 1023) << 10) | k & 1023;
            }
            if (127 >= l) {
              if (c >= d)
                break;
              b[c++ >>> 0] = l;
            } else {
              if (2047 >= l) {
                if (c + 1 >= d)
                  break;
                b[c++ >>> 0] = 192 | l >> 6;
              } else {
                if (65535 >= l) {
                  if (c + 2 >= d)
                    break;
                  b[c++ >>> 0] = 224 | l >> 12;
                } else {
                  if (c + 3 >= d)
                    break;
                  b[c++ >>> 0] = 240 | l >> 18;
                  b[c++ >>> 0] = 128 | l >> 12 & 63;
                }
                b[c++ >>> 0] = 128 | l >> 6 & 63;
              }
              b[c++ >>> 0] = 128 | l & 63;
            }
          }
          b[c >>> 0] = 0;
          return c - e;
        }, Ga = (a) => {
          if (null === a)
            return "null";
          var b = typeof a;
          return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
        }, Ha, O = (a) => {
          for (var b = ""; B[a >>> 0]; )
            b += Ha[B[a++ >>> 0]];
          return b;
        }, Ia = {}, Ja = {}, Ka = {}, P;
        function La(a, b, c = {}) {
          var d = b.name;
          if (!a)
            throw new P(`type "${d}" must have a positive integer typeid pointer`);
          if (Ja.hasOwnProperty(a)) {
            if (c.gb)
              return;
            throw new P(`Cannot register type '${d}' twice`);
          }
          Ja[a] = b;
          delete Ka[a];
          Ia.hasOwnProperty(a) && (b = Ia[a], delete Ia[a], b.forEach((e) => e()));
        }
        function Q(a, b, c = {}) {
          if (!("argPackAdvance" in b))
            throw new TypeError("registerType registeredInstance requires argPackAdvance");
          La(a, b, c);
        }
        var Ma = (a, b, c) => {
          switch (b) {
            case 1:
              return c ? (d) => A[d >>> 0 >>> 0] : (d) => B[d >>> 0 >>> 0];
            case 2:
              return c ? (d) => C[d >>> 1 >>> 0] : (d) => D[d >>> 1 >>> 0];
            case 4:
              return c ? (d) => E[d >>> 2 >>> 0] : (d) => G[d >>> 2 >>> 0];
            case 8:
              return c ? (d) => na[d >>> 3] : (d) => oa[d >>> 3];
            default:
              throw new TypeError(`invalid integer width (${b}): ${a}`);
          }
        };
        function Na() {
          this.Sa = [void 0];
          this.bb = [];
        }
        var R = new Na();
        function Oa(a) {
          a >>>= 0;
          a >= R.Va && 0 === --R.get(a).cb && R.$a(a);
        }
        var S = (a) => {
          if (!a)
            throw new P("Cannot use deleted val. handle = " + a);
          return R.get(a).value;
        }, T = (a) => {
          switch (a) {
            case void 0:
              return 1;
            case null:
              return 2;
            case true:
              return 3;
            case false:
              return 4;
            default:
              return R.Za({ cb: 1, value: a });
          }
        };
        function Pa(a) {
          return this.fromWireType(E[a >>> 2 >>> 0]);
        }
        var Qa = (a, b) => {
          switch (b) {
            case 4:
              return function(c) {
                return this.fromWireType(ma[c >>> 2 >>> 0]);
              };
            case 8:
              return function(c) {
                return this.fromWireType(pa[c >>> 3 >>> 0]);
              };
            default:
              throw new TypeError(`invalid float width (${b}): ${a}`);
          }
        };
        function Ra(a) {
          return this.fromWireType(G[a >>> 2 >>> 0]);
        }
        var Sa = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, Ta = (a, b) => {
          var c = a >> 1;
          for (var d = c + b / 2; !(c >= d) && D[c >>> 0]; )
            ++c;
          c <<= 1;
          if (32 < c - a && Sa)
            return Sa.decode(B.subarray(a >>> 0, c >>> 0));
          c = "";
          for (d = 0; !(d >= b / 2); ++d) {
            var e = C[a + 2 * d >>> 1 >>> 0];
            if (0 == e)
              break;
            c += String.fromCharCode(e);
          }
          return c;
        }, Ua = (a, b, c) => {
          void 0 === c && (c = 2147483647);
          if (2 > c)
            return 0;
          c -= 2;
          var d = b;
          c = c < 2 * a.length ? c / 2 : a.length;
          for (var e = 0; e < c; ++e)
            C[b >>> 1 >>> 0] = a.charCodeAt(e), b += 2;
          C[b >>> 1 >>> 0] = 0;
          return b - d;
        }, Va = (a) => 2 * a.length, Wa = (a, b) => {
          for (var c = 0, d = ""; !(c >= b / 4); ) {
            var e = E[a + 4 * c >>> 2 >>> 0];
            if (0 == e)
              break;
            ++c;
            65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
          }
          return d;
        }, Xa = (a, b, c) => {
          b >>>= 0;
          void 0 === c && (c = 2147483647);
          if (4 > c)
            return 0;
          var d = b;
          c = d + c - 4;
          for (var e = 0; e < a.length; ++e) {
            var g = a.charCodeAt(e);
            if (55296 <= g && 57343 >= g) {
              var l = a.charCodeAt(++e);
              g = 65536 + ((g & 1023) << 10) | l & 1023;
            }
            E[b >>> 2 >>> 0] = g;
            b += 4;
            if (b + 4 > c)
              break;
          }
          E[b >>> 2 >>> 0] = 0;
          return b - d;
        }, Ya = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            55296 <= d && 57343 >= d && ++c;
            b += 4;
          }
          return b;
        }, V = (a, b) => {
          var c = Ja[a];
          if (void 0 === c)
            throw a = Za(a), c = O(a), U(a), new P(b + " has unknown type " + c);
          return c;
        }, $a = {}, W = (a) => {
          var b = $a[a];
          return void 0 === b ? O(a) : b;
        }, X = [], bb = () => "object" == typeof globalThis ? globalThis : Function("return this")(), cb = (a) => {
          var b = X.length;
          X.push(a);
          return b;
        }, db = (a, b) => {
          for (var c = Array(a), d = 0; d < a; ++d)
            c[d] = V(G[b + 4 * d >>> 2 >>> 0], "parameter " + d);
          return c;
        }, eb = (a) => {
          if (void 0 === a)
            return "_unknown";
          a = a.replace(/[^a-zA-Z0-9_]/g, "$");
          var b = a.charCodeAt(0);
          return 48 <= b && 57 >= b ? `_${a}` : a;
        }, fb = {};
        function gb(a, b) {
          a = eb(a);
          return { [a]: function() {
            return b.apply(this, arguments);
          } }[a];
        }
        function hb(a) {
          var b = Function;
          if (!(b instanceof Function))
            throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
          var c = gb(b.name || "unknownFunctionName", function() {
          });
          c.prototype = b.prototype;
          c = new c();
          a = b.apply(c, a);
          return a instanceof Object ? a : c;
        }
        var ib = (a) => {
          for (var b = "", c = 0; c < a; ++c)
            b += (0 !== c ? ", " : "") + "arg" + c;
          var d = "return function emval_allocator_" + a + "(constructor, argTypes, args) {\n  var HEAPU32 = getMemory();\n";
          for (c = 0; c < a; ++c)
            d += "var argType" + c + " = requireRegisteredType(HEAPU32[((argTypes)>>>2)], 'parameter " + c + "');\nvar arg" + c + " = argType" + c + ".readValueFromPointer(args);\nargs += argType" + c + "['argPackAdvance'];\nargTypes += 4;\n";
          return new Function("requireRegisteredType", "Module", "valueToHandle", "getMemory", d + ("var obj = new constructor(" + b + ");\nreturn valueToHandle(obj);\n}\n"))(V, h, T, () => G);
        }, jb = {}, Y = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), kb = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], lb = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], nb = (a) => {
          var b = M(a) + 1, c = mb(b);
          c && N(a, B, c, b);
          return c;
        }, ob = {}, qb = () => {
          if (!pb) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: da || "./this.program" }, b;
            for (b in ob)
              void 0 === ob[b] ? delete a[b] : a[b] = ob[b];
            var c = [];
            for (b in a)
              c.push(`${b}=${a[b]}`);
            pb = c;
          }
          return pb;
        }, pb, rb = [null, [], []], sb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], tb = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function ub(a) {
          var b = Array(M(a) + 1);
          N(a, b, 0, b.length);
          return b;
        }
        function vb(a, b, c, d) {
          function e(f, r, u) {
            for (f = "number" == typeof f ? f.toString() : f || ""; f.length < r; )
              f = u[0] + f;
            return f;
          }
          function g(f, r) {
            return e(f, r, "0");
          }
          function l(f, r) {
            function u(ab) {
              return 0 > ab ? -1 : 0 < ab ? 1 : 0;
            }
            var H;
            0 === (H = u(f.getFullYear() - r.getFullYear())) && 0 === (H = u(f.getMonth() - r.getMonth())) && (H = u(f.getDate() - r.getDate()));
            return H;
          }
          function k(f) {
            switch (f.getDay()) {
              case 0:
                return new Date(f.getFullYear() - 1, 11, 29);
              case 1:
                return f;
              case 2:
                return new Date(f.getFullYear(), 0, 3);
              case 3:
                return new Date(
                  f.getFullYear(),
                  0,
                  2
                );
              case 4:
                return new Date(f.getFullYear(), 0, 1);
              case 5:
                return new Date(f.getFullYear() - 1, 11, 31);
              case 6:
                return new Date(f.getFullYear() - 1, 11, 30);
            }
          }
          function n(f) {
            var r = f.Ta;
            for (f = new Date(new Date(f.Ua + 1900, 0, 1).getTime()); 0 < r; ) {
              var u = f.getMonth(), H = (Y(f.getFullYear()) ? sb : tb)[u];
              if (r > H - f.getDate())
                r -= H - f.getDate() + 1, f.setDate(1), 11 > u ? f.setMonth(u + 1) : (f.setMonth(0), f.setFullYear(f.getFullYear() + 1));
              else {
                f.setDate(f.getDate() + r);
                break;
              }
            }
            u = new Date(f.getFullYear() + 1, 0, 4);
            r = k(new Date(
              f.getFullYear(),
              0,
              4
            ));
            u = k(u);
            return 0 >= l(r, f) ? 0 >= l(u, f) ? f.getFullYear() + 1 : f.getFullYear() : f.getFullYear() - 1;
          }
          a >>>= 0;
          b >>>= 0;
          c >>>= 0;
          d >>>= 0;
          var q = G[d + 40 >>> 2 >>> 0];
          d = { kb: E[d >>> 2 >>> 0], jb: E[d + 4 >>> 2 >>> 0], Xa: E[d + 8 >>> 2 >>> 0], ab: E[d + 12 >>> 2 >>> 0], Ya: E[d + 16 >>> 2 >>> 0], Ua: E[d + 20 >>> 2 >>> 0], Oa: E[d + 24 >>> 2 >>> 0], Ta: E[d + 28 >>> 2 >>> 0], mb: E[d + 32 >>> 2 >>> 0], ib: E[d + 36 >>> 2 >>> 0], lb: q ? L(q) : "" };
          c = L(c);
          q = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S",
            "%Ec": "%c",
            "%EC": "%C",
            "%Ex": "%m/%d/%y",
            "%EX": "%H:%M:%S",
            "%Ey": "%y",
            "%EY": "%Y",
            "%Od": "%d",
            "%Oe": "%e",
            "%OH": "%H",
            "%OI": "%I",
            "%Om": "%m",
            "%OM": "%M",
            "%OS": "%S",
            "%Ou": "%u",
            "%OU": "%U",
            "%OV": "%V",
            "%Ow": "%w",
            "%OW": "%W",
            "%Oy": "%y"
          };
          for (var v in q)
            c = c.replace(new RegExp(v, "g"), q[v]);
          var y = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), F = "January February March April May June July August September October November December".split(" ");
          q = { "%a": (f) => y[f.Oa].substring(0, 3), "%A": (f) => y[f.Oa], "%b": (f) => F[f.Ya].substring(0, 3), "%B": (f) => F[f.Ya], "%C": (f) => g((f.Ua + 1900) / 100 | 0, 2), "%d": (f) => g(f.ab, 2), "%e": (f) => e(f.ab, 2, " "), "%g": (f) => n(f).toString().substring(2), "%G": (f) => n(f), "%H": (f) => g(f.Xa, 2), "%I": (f) => {
            f = f.Xa;
            0 == f ? f = 12 : 12 < f && (f -= 12);
            return g(f, 2);
          }, "%j": (f) => {
            for (var r = 0, u = 0; u <= f.Ya - 1; r += (Y(f.Ua + 1900) ? sb : tb)[u++])
              ;
            return g(f.ab + r, 3);
          }, "%m": (f) => g(f.Ya + 1, 2), "%M": (f) => g(f.jb, 2), "%n": () => "\n", "%p": (f) => 0 <= f.Xa && 12 > f.Xa ? "AM" : "PM", "%S": (f) => g(f.kb, 2), "%t": () => "	", "%u": (f) => f.Oa || 7, "%U": (f) => g(Math.floor((f.Ta + 7 - f.Oa) / 7), 2), "%V": (f) => {
            var r = Math.floor((f.Ta + 7 - (f.Oa + 6) % 7) / 7);
            2 >= (f.Oa + 371 - f.Ta - 2) % 7 && r++;
            if (r)
              53 == r && (u = (f.Oa + 371 - f.Ta) % 7, 4 == u || 3 == u && Y(f.Ua) || (r = 1));
            else {
              r = 52;
              var u = (f.Oa + 7 - f.Ta - 1) % 7;
              (4 == u || 5 == u && Y(f.Ua % 400 - 1)) && r++;
            }
            return g(r, 2);
          }, "%w": (f) => f.Oa, "%W": (f) => g(Math.floor((f.Ta + 7 - (f.Oa + 6) % 7) / 7), 2), "%y": (f) => (f.Ua + 1900).toString().substring(2), "%Y": (f) => f.Ua + 1900, "%z": (f) => {
            f = f.ib;
            var r = 0 <= f;
            f = Math.abs(f) / 60;
            return (r ? "+" : "-") + String("0000" + (f / 60 * 100 + f % 60)).slice(-4);
          }, "%Z": (f) => f.lb, "%%": () => "%" };
          c = c.replace(/%%/g, "\0\0");
          for (v in q)
            c.includes(v) && (c = c.replace(new RegExp(v, "g"), q[v](d)));
          c = c.replace(/\0\0/g, "%");
          v = ub(c);
          if (v.length > b)
            return 0;
          A.set(v, a >>> 0);
          return v.length - 1;
        }
        for (var wb = Array(256), xb = 0; 256 > xb; ++xb)
          wb[xb] = String.fromCharCode(xb);
        Ha = wb;
        P = h.BindingError = class extends Error {
          constructor(a) {
            super(a);
            this.name = "BindingError";
          }
        };
        h.InternalError = class extends Error {
          constructor(a) {
            super(a);
            this.name = "InternalError";
          }
        };
        Object.assign(Na.prototype, { get(a) {
          return this.Sa[a];
        }, has(a) {
          return void 0 !== this.Sa[a];
        }, Za(a) {
          var b = this.bb.pop() || this.Sa.length;
          this.Sa[b] = a;
          return b;
        }, $a(a) {
          this.Sa[a] = void 0;
          this.bb.push(a);
        } });
        R.Sa.push({ value: void 0 }, { value: null }, { value: true }, { value: false });
        R.Va = R.Sa.length;
        h.count_emval_handles = () => {
          for (var a = 0, b = R.Va; b < R.Sa.length; ++b)
            void 0 !== R.Sa[b] && ++a;
          return a;
        };
        var yb = { a: function(a, b, c) {
          a >>>= 0;
          new Ba(a).Za(b >>> 0, c >>> 0);
          Ca = a;
          Da++;
          throw Ca;
        }, v: function() {
          return 0;
        }, ba: function() {
        }, N: function() {
        }, P: function() {
        }, H: function() {
          return 0;
        }, $: function() {
        }, V: function() {
        }, _: function() {
        }, B: function() {
        }, O: function() {
        }, L: function() {
        }, aa: function() {
        }, M: function() {
        }, E: function(a, b, c, d, e) {
          b >>>= 0;
          b = O(b);
          var g = -1 != b.indexOf("u");
          g && (e = (1n << 64n) - 1n);
          Q(a >>> 0, { name: b, fromWireType: (l) => l, toWireType: function(l, k) {
            if ("bigint" != typeof k && "number" != typeof k)
              throw new TypeError(`Cannot convert "${Ga(k)}" to ${this.name}`);
            if (k < d || k > e)
              throw new TypeError(`Passing a number "${Ga(k)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);
            return k;
          }, argPackAdvance: 8, readValueFromPointer: Ma(b, c >>> 0, !g), Wa: null });
        }, ea: function(a, b, c, d) {
          b = O(b >>> 0);
          Q(a >>> 0, { name: b, fromWireType: function(e) {
            return !!e;
          }, toWireType: function(e, g) {
            return g ? c : d;
          }, argPackAdvance: 8, readValueFromPointer: function(e) {
            return this.fromWireType(B[e >>> 0]);
          }, Wa: null });
        }, da: function(a, b) {
          b = O(b >>> 0);
          Q(a >>> 0, {
            name: b,
            fromWireType: (c) => {
              var d = S(c);
              Oa(c);
              return d;
            },
            toWireType: (c, d) => T(d),
            argPackAdvance: 8,
            readValueFromPointer: Pa,
            Wa: null
          });
        }, D: function(a, b, c) {
          b = O(b >>> 0);
          Q(a >>> 0, { name: b, fromWireType: (d) => d, toWireType: (d, e) => e, argPackAdvance: 8, readValueFromPointer: Qa(b, c >>> 0), Wa: null });
        }, p: function(a, b, c, d, e) {
          a >>>= 0;
          c >>>= 0;
          b = O(b >>> 0);
          -1 === e && (e = 4294967295);
          e = (k) => k;
          if (0 === d) {
            var g = 32 - 8 * c;
            e = (k) => k << g >>> g;
          }
          var l = b.includes("unsigned") ? function(k, n) {
            return n >>> 0;
          } : function(k, n) {
            return n;
          };
          Q(a, {
            name: b,
            fromWireType: e,
            toWireType: l,
            argPackAdvance: 8,
            readValueFromPointer: Ma(b, c, 0 !== d),
            Wa: null
          });
        }, l: function(a, b, c) {
          function d(g) {
            return new e(A.buffer, G[g + 4 >>> 2 >>> 0], G[g >>> 2 >>> 0]);
          }
          var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
          c = O(c >>> 0);
          Q(a >>> 0, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { gb: true });
        }, F: function(a, b) {
          b = O(b >>> 0);
          var c = "std::string" === b;
          Q(a >>> 0, { name: b, fromWireType: function(d) {
            var e = G[d >>> 2 >>> 0], g = d + 4;
            if (c)
              for (var l = g, k = 0; k <= e; ++k) {
                var n = g + k;
                if (k == e || 0 == B[n >>> 0]) {
                  l = L(l, n - l);
                  if (void 0 === q)
                    var q = l;
                  else
                    q += String.fromCharCode(0), q += l;
                  l = n + 1;
                }
              }
            else {
              q = Array(e);
              for (k = 0; k < e; ++k)
                q[k] = String.fromCharCode(B[g + k >>> 0]);
              q = q.join("");
            }
            U(d);
            return q;
          }, toWireType: function(d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var g = "string" == typeof e;
            if (!(g || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array))
              throw new P("Cannot pass non-string to std::string");
            var l = c && g ? M(e) : e.length;
            var k = mb(4 + l + 1), n = k + 4;
            G[k >>> 2 >>> 0] = l;
            if (c && g)
              N(e, B, n, l + 1);
            else if (g)
              for (g = 0; g < l; ++g) {
                var q = e.charCodeAt(g);
                if (255 < q)
                  throw U(n), new P("String has UTF-16 code units that do not fit in 8 bits");
                B[n + g >>> 0] = q;
              }
            else
              for (g = 0; g < l; ++g)
                B[n + g >>> 0] = e[g];
            null !== d && d.push(U, k);
            return k;
          }, argPackAdvance: 8, readValueFromPointer: Ra, Wa(d) {
            U(d);
          } });
        }, x: function(a, b, c) {
          b >>>= 0;
          c >>>= 0;
          c = O(c);
          if (2 === b) {
            var d = Ta;
            var e = Ua;
            var g = Va;
            var l = () => D;
            var k = 1;
          } else
            4 === b && (d = Wa, e = Xa, g = Ya, l = () => G, k = 2);
          Q(a >>> 0, { name: c, fromWireType: (n) => {
            for (var q = G[n >>> 2 >>> 0], v = l(), y, F = n + 4, f = 0; f <= q; ++f) {
              var r = n + 4 + f * b;
              if (f == q || 0 == v[r >>> k])
                F = d(F, r - F), void 0 === y ? y = F : (y += String.fromCharCode(0), y += F), F = r + b;
            }
            U(n);
            return y;
          }, toWireType: (n, q) => {
            if ("string" != typeof q)
              throw new P(`Cannot pass non-string to C++ string type ${c}`);
            var v = g(q), y = mb(4 + v + b);
            G[y >>> 2] = v >> k;
            e(q, y + 4, v + b);
            null !== n && n.push(U, y);
            return y;
          }, argPackAdvance: 8, readValueFromPointer: Pa, Wa(n) {
            U(n);
          } });
        }, fa: function(a, b) {
          b = O(b >>> 0);
          Q(a >>> 0, { hb: true, name: b, argPackAdvance: 0, fromWireType: () => {
          }, toWireType: () => {
          } });
        }, ca: () => true, o: function(a, b, c) {
          b >>>= 0;
          c >>>= 0;
          a = S(a >>> 0);
          b = V(b, "emval::as");
          var d = [], e = T(d);
          G[c >>> 2 >>> 0] = e;
          return b.toWireType(d, a);
        }, h: function(a, b, c, d, e) {
          c >>>= 0;
          d >>>= 0;
          e >>>= 0;
          a = X[a >>> 0];
          b = S(b >>> 0);
          c = W(c);
          var g = [];
          G[d >>> 2 >>> 0] = T(g);
          return a(b, c, g, e);
        }, r: function(a, b, c, d) {
          c >>>= 0;
          d >>>= 0;
          a = X[a >>> 0];
          b = S(b >>> 0);
          c = W(c);
          a(b, c, null, d);
        }, b: Oa, y: function(a, b) {
          b >>>= 0;
          a = S(a >>> 0);
          b = S(b);
          return a == b;
        }, u: function(a) {
          a >>>= 0;
          if (0 === a)
            return T(bb());
          a = W(a);
          return T(bb()[a]);
        }, g: function(a, b) {
          var c = db(a, b >>> 0), d = c[0];
          b = d.name + "_$" + c.slice(1).map(function(v) {
            return v.name;
          }).join("_") + "$";
          var e = fb[b];
          if (void 0 !== e)
            return e;
          e = ["retType"];
          for (var g = [d], l = "", k = 0; k < a - 1; ++k)
            l += (0 !== k ? ", " : "") + "arg" + k, e.push("argType" + k), g.push(c[1 + k]);
          var n = "return function " + eb("methodCaller_" + b) + "(handle, name, destructors, args) {\n", q = 0;
          for (k = 0; k < a - 1; ++k)
            n += "    var arg" + k + " = argType" + k + ".readValueFromPointer(args" + (q ? "+" + q : "") + ");\n", q += c[k + 1].argPackAdvance;
          n += "    var rv = handle[name](" + l + ");\n";
          for (k = 0; k < a - 1; ++k)
            c[k + 1].deleteObject && (n += "    argType" + k + ".deleteObject(arg" + k + ");\n");
          d.hb || (n += "    return retType.toWireType(destructors, rv);\n");
          e.push(n + "};\n");
          a = hb(e).apply(null, g);
          e = cb(a);
          return fb[b] = e;
        }, q: function(a, b) {
          b >>>= 0;
          a = S(a >>> 0);
          b = S(b);
          return T(a[b]);
        }, c: function(a) {
          a >>>= 0;
          4 < a && (R.get(a).cb += 1);
        }, G: function(a, b, c, d) {
          c >>>= 0;
          d >>>= 0;
          a = S(a >>> 0);
          var e = jb[b];
          e || (e = ib(b), jb[b] = e);
          return e(a, c, d);
        }, s: function() {
          return T([]);
        }, k: function(a) {
          a = S(a >>> 0);
          for (var b = Array(a.length), c = 0; c < a.length; c++)
            b[c] = a[c];
          return T(b);
        }, d: function(a) {
          return T(W(a >>> 0));
        }, j: function() {
          return T({});
        }, e: function(a) {
          a >>>= 0;
          for (var b = S(a); b.length; ) {
            var c = b.pop();
            b.pop()(c);
          }
          Oa(a);
        }, i: function(a, b, c) {
          b >>>= 0;
          c >>>= 0;
          a = S(a >>> 0);
          b = S(b);
          c = S(c);
          a[b] = c;
        }, f: function(a, b) {
          b >>>= 0;
          a = V(a >>> 0, "_emval_take_value");
          a = a.readValueFromPointer(b);
          return T(a);
        }, S: function(a, b) {
          a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
          b >>>= 0;
          a = new Date(1e3 * a);
          E[b >>> 2 >>> 0] = a.getUTCSeconds();
          E[b + 4 >>> 2 >>> 0] = a.getUTCMinutes();
          E[b + 8 >>> 2 >>> 0] = a.getUTCHours();
          E[b + 12 >>> 2 >>> 0] = a.getUTCDate();
          E[b + 16 >>> 2 >>> 0] = a.getUTCMonth();
          E[b + 20 >>> 2 >>> 0] = a.getUTCFullYear() - 1900;
          E[b + 24 >>> 2 >>> 0] = a.getUTCDay();
          E[b + 28 >>> 2 >>> 0] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;
        }, T: function(a, b) {
          a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
          b >>>= 0;
          a = new Date(1e3 * a);
          E[b >>> 2 >>> 0] = a.getSeconds();
          E[b + 4 >>> 2 >>> 0] = a.getMinutes();
          E[b + 8 >>> 2 >>> 0] = a.getHours();
          E[b + 12 >>> 2 >>> 0] = a.getDate();
          E[b + 16 >>> 2 >>> 0] = a.getMonth();
          E[b + 20 >>> 2 >>> 0] = a.getFullYear() - 1900;
          E[b + 24 >>> 2 >>> 0] = a.getDay();
          E[b + 28 >>> 2 >>> 0] = (Y(a.getFullYear()) ? kb : lb)[a.getMonth()] + a.getDate() - 1 | 0;
          E[b + 36 >>> 2 >>> 0] = -(60 * a.getTimezoneOffset());
          var c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset(), d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
          E[b + 32 >>> 2 >>> 0] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
        }, U: function(a) {
          a >>>= 0;
          var b = new Date(E[a + 20 >>> 2 >>> 0] + 1900, E[a + 16 >>> 2 >>> 0], E[a + 12 >>> 2 >>> 0], E[a + 8 >>> 2 >>> 0], E[a + 4 >>> 2 >>> 0], E[a >>> 2 >>> 0], 0), c = E[a + 32 >>> 2 >>> 0], d = b.getTimezoneOffset(), e = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(), g = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(), l = Math.min(
            g,
            e
          );
          0 > c ? E[a + 32 >>> 2 >>> 0] = Number(e != g && l == d) : 0 < c != (l == d) && (e = Math.max(g, e), b.setTime(b.getTime() + 6e4 * ((0 < c ? l : e) - d)));
          E[a + 24 >>> 2 >>> 0] = b.getDay();
          E[a + 28 >>> 2 >>> 0] = (Y(b.getFullYear()) ? kb : lb)[b.getMonth()] + b.getDate() - 1 | 0;
          E[a >>> 2 >>> 0] = b.getSeconds();
          E[a + 4 >>> 2 >>> 0] = b.getMinutes();
          E[a + 8 >>> 2 >>> 0] = b.getHours();
          E[a + 12 >>> 2 >>> 0] = b.getDate();
          E[a + 16 >>> 2 >>> 0] = b.getMonth();
          E[a + 20 >>> 2 >>> 0] = b.getYear();
          return BigInt(b.getTime() / 1e3);
        }, Q: function() {
          return -52;
        }, R: function() {
        }, J: function(a, b, c) {
          function d(n) {
            return (n = n.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? n[1] : "GMT";
          }
          c >>>= 0;
          var e = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(e, 0, 1), l = new Date(e, 6, 1);
          e = g.getTimezoneOffset();
          var k = l.getTimezoneOffset();
          G[a >>> 0 >>> 2 >>> 0] = 60 * Math.max(e, k);
          E[b >>> 0 >>> 2 >>> 0] = Number(e != k);
          a = d(g);
          b = d(l);
          a = nb(a);
          b = nb(b);
          k < e ? (G[c >>> 2 >>> 0] = a, G[c + 4 >>> 2 >>> 0] = b) : (G[c >>> 2 >>> 0] = b, G[c + 4 >>> 2 >>> 0] = a);
        }, t: () => {
          ka("");
        }, C: () => Date.now(), K: function() {
          return 4294901760;
        }, n: () => performance.now(), Z: function(a, b, c) {
          b >>>= 0;
          return B.copyWithin(a >>> 0 >>> 0, b >>> 0, b + (c >>> 0) >>> 0);
        }, I: function(a) {
          a >>>= 0;
          var b = B.length;
          if (4294901760 < a)
            return false;
          for (var c = 1; 4 >= c; c *= 2) {
            var d = b * (1 + 0.2 / c);
            d = Math.min(d, a + 100663296);
            var e = Math;
            d = Math.max(a, d);
            a: {
              e = (e.min.call(e, 4294901760, d + (65536 - d % 65536) % 65536) - z.buffer.byteLength + 65535) / 65536;
              try {
                z.grow(e);
                qa();
                var g = 1;
                break a;
              } catch (l) {
              }
              g = void 0;
            }
            if (g)
              return true;
          }
          return false;
        }, X: function(a, b) {
          a >>>= 0;
          b >>>= 0;
          var c = 0;
          qb().forEach((d, e) => {
            var g = b + c;
            e = G[a + 4 * e >>> 2 >>> 0] = g;
            for (g = 0; g < d.length; ++g)
              A[e++ >>> 0 >>> 0] = d.charCodeAt(g);
            A[e >>> 0 >>> 0] = 0;
            c += d.length + 1;
          });
          return 0;
        }, Y: function(a, b) {
          a >>>= 0;
          b >>>= 0;
          var c = qb();
          G[a >>> 2 >>> 0] = c.length;
          var d = 0;
          c.forEach((e) => d += e.length + 1);
          G[b >>> 2 >>> 0] = d;
          return 0;
        }, w: () => 52, A: function() {
          return 52;
        }, W: function() {
          return 70;
        }, z: function(a, b, c, d) {
          b >>>= 0;
          c >>>= 0;
          d >>>= 0;
          for (var e = 0, g = 0; g < c; g++) {
            var l = G[b >>> 2 >>> 0], k = G[b + 4 >>> 2 >>> 0];
            b += 8;
            for (var n = 0; n < k; n++) {
              var q = B[l + n >>> 0], v = rb[a];
              0 === q || 10 === q ? ((1 === a ? ja : x)(Fa(v, 0)), v.length = 0) : v.push(q);
            }
            e += k;
          }
          G[d >>> 2 >>> 0] = e;
          return 0;
        }, ga: vb, m: function(a, b, c, d) {
          return vb(a >>> 0, b >>> 0, c >>> 0, d >>> 0);
        } }, Z = function() {
          var a = { a: yb };
          I++;
          Aa(a, function(b) {
            Z = b.instance.exports;
            Z = zb();
            z = Z.ha;
            qa();
            sa.unshift(Z.ia);
            I--;
            0 == I && (null !== ua && (clearInterval(ua), ua = null), J && (b = J, J = null, b()));
          }).catch(ba);
          return {};
        }();
        h._OrtInit = (a, b) => (h._OrtInit = Z.ja)(a, b);
        h._OrtGetLastError = (a, b) => (h._OrtGetLastError = Z.ka)(a, b);
        h._OrtCreateSessionOptions = (a, b, c, d, e, g, l, k, n, q) => (h._OrtCreateSessionOptions = Z.la)(a, b, c, d, e, g, l, k, n, q);
        h._OrtAppendExecutionProvider = (a, b) => (h._OrtAppendExecutionProvider = Z.ma)(a, b);
        h._OrtAddFreeDimensionOverride = (a, b, c) => (h._OrtAddFreeDimensionOverride = Z.na)(a, b, c);
        h._OrtAddSessionConfigEntry = (a, b, c) => (h._OrtAddSessionConfigEntry = Z.oa)(a, b, c);
        h._OrtReleaseSessionOptions = (a) => (h._OrtReleaseSessionOptions = Z.pa)(a);
        h._OrtCreateSession = (a, b, c) => (h._OrtCreateSession = Z.qa)(a, b, c);
        h._OrtReleaseSession = (a) => (h._OrtReleaseSession = Z.ra)(a);
        h._OrtGetInputOutputCount = (a, b, c) => (h._OrtGetInputOutputCount = Z.sa)(a, b, c);
        h._OrtGetInputName = (a, b) => (h._OrtGetInputName = Z.ta)(a, b);
        h._OrtGetOutputName = (a, b) => (h._OrtGetOutputName = Z.ua)(a, b);
        h._OrtFree = (a) => (h._OrtFree = Z.va)(a);
        h._OrtCreateTensor = (a, b, c, d, e, g) => (h._OrtCreateTensor = Z.wa)(a, b, c, d, e, g);
        h._OrtGetTensorData = (a, b, c, d, e) => (h._OrtGetTensorData = Z.xa)(a, b, c, d, e);
        h._OrtReleaseTensor = (a) => (h._OrtReleaseTensor = Z.ya)(a);
        h._OrtCreateRunOptions = (a, b, c, d) => (h._OrtCreateRunOptions = Z.za)(a, b, c, d);
        h._OrtAddRunConfigEntry = (a, b, c) => (h._OrtAddRunConfigEntry = Z.Aa)(a, b, c);
        h._OrtReleaseRunOptions = (a) => (h._OrtReleaseRunOptions = Z.Ba)(a);
        h._OrtCreateBinding = (a) => (h._OrtCreateBinding = Z.Ca)(a);
        h._OrtBindInput = (a, b, c) => (h._OrtBindInput = Z.Da)(a, b, c);
        h._OrtBindOutput = (a, b, c, d) => (h._OrtBindOutput = Z.Ea)(a, b, c, d);
        h._OrtClearBoundOutputs = (a) => (h._OrtClearBoundOutputs = Z.Fa)(a);
        h._OrtReleaseBinding = (a) => (h._OrtReleaseBinding = Z.Ga)(a);
        h._OrtRunWithBinding = (a, b, c, d, e) => (h._OrtRunWithBinding = Z.Ha)(a, b, c, d, e);
        h._OrtRun = (a, b, c, d, e, g, l, k) => (h._OrtRun = Z.Ia)(a, b, c, d, e, g, l, k);
        h._OrtEndProfiling = (a) => (h._OrtEndProfiling = Z.Ja)(a);
        var mb = h._malloc = (a) => (mb = h._malloc = Z.Ka)(a), U = h._free = (a) => (U = h._free = Z.La)(a), Za = (a) => (Za = Z.Ma)(a);
        h.__embind_initialize_bindings = () => (h.__embind_initialize_bindings = Z.Na)();
        var Ab = () => (Ab = Z.Pa)(), Bb = (a) => (Bb = Z.Qa)(a), Cb = (a) => (Cb = Z.Ra)(a);
        function zb() {
          var a = Z;
          a = Object.assign({}, a);
          var b = (d) => () => d() >>> 0, c = (d) => (e) => d(e) >>> 0;
          a.__errno_location = b(a.__errno_location);
          a.Ka = c(a.Ka);
          a.Ma = c(a.Ma);
          a.Pa = b(a.Pa);
          a.Ra = c(a.Ra);
          return a;
        }
        h.stackAlloc = Cb;
        h.stackSave = Ab;
        h.stackRestore = Bb;
        h.UTF8ToString = L;
        h.stringToUTF8 = (a, b, c) => N(a, B, b, c);
        h.lengthBytesUTF8 = M;
        var Db;
        J = function Eb() {
          Db || Fb();
          Db || (J = Eb);
        };
        function Fb() {
          if (!(0 < I)) {
            for (; 0 < ra.length; )
              ra.shift()(h);
            if (!(0 < I || Db || (Db = true, h.calledRun = true, la))) {
              for (; 0 < sa.length; )
                sa.shift()(h);
              for (aa(h); 0 < ta.length; )
                ta.shift()(h);
            }
          }
        }
        Fb();
        return moduleArg.ready;
      };
    })();
    if (typeof exports === "object" && typeof module2 === "object")
      module2.exports = ortWasm;
    else if (typeof define === "function" && define["amd"])
      define([], () => ortWasm);
  }
});

// web/lib/wasm/wasm-factory.ts
var ortWasmFactory, ortWasmFactoryThreaded, wasm, initialized, initializing, aborted, isMultiThreadSupported, isSimdSupported, getWasmFileName, initializeWebAssembly, getInstance;
var init_wasm_factory = __esm({
  "web/lib/wasm/wasm-factory.ts"() {
    "use strict";
    if (false) {
      ortWasmFactory = null;
    } else {
      ortWasmFactory = true ? require_ort_wasm() : null;
    }
    ortWasmFactoryThreaded = false ? true ? null : null : ortWasmFactory;
    initialized = false;
    initializing = false;
    aborted = false;
    isMultiThreadSupported = () => {
      try {
        if (typeof SharedArrayBuffer === "undefined") {
          return false;
        }
        if (typeof MessageChannel !== "undefined") {
          new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));
        }
        return WebAssembly.validate(new Uint8Array([
          0,
          97,
          115,
          109,
          1,
          0,
          0,
          0,
          1,
          4,
          1,
          96,
          0,
          0,
          3,
          2,
          1,
          0,
          5,
          4,
          1,
          3,
          1,
          1,
          10,
          11,
          1,
          9,
          0,
          65,
          0,
          254,
          16,
          2,
          0,
          26,
          11
        ]));
      } catch (e) {
        return false;
      }
    };
    isSimdSupported = () => {
      try {
        return WebAssembly.validate(new Uint8Array([
          0,
          97,
          115,
          109,
          1,
          0,
          0,
          0,
          1,
          4,
          1,
          96,
          0,
          0,
          3,
          2,
          1,
          0,
          10,
          30,
          1,
          28,
          0,
          65,
          0,
          253,
          15,
          253,
          12,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          253,
          186,
          1,
          26,
          11
        ]));
      } catch (e) {
        return false;
      }
    };
    getWasmFileName = (useSimd, useThreads) => {
      if (useSimd) {
        if (false) {
          return "ort-training-wasm-simd.wasm";
        }
        return useThreads ? "ort-wasm-simd-threaded.wasm" : "ort-wasm-simd.wasm";
      } else {
        return useThreads ? "ort-wasm-threaded.wasm" : "ort-wasm.wasm";
      }
    };
    initializeWebAssembly = async (flags) => {
      if (initialized) {
        return Promise.resolve();
      }
      if (initializing) {
        throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
      }
      if (aborted) {
        throw new Error("previous call to 'initializeWebAssembly()' failed.");
      }
      initializing = true;
      const timeout = flags.initTimeout;
      const numThreads = flags.numThreads;
      const simd = flags.simd;
      const useThreads = numThreads > 1 && isMultiThreadSupported();
      const useSimd = simd && isSimdSupported();
      const wasmPaths = flags.wasmPaths;
      const wasmPrefixOverride = typeof wasmPaths === "string" ? wasmPaths : void 0;
      const wasmFileName = getWasmFileName(useSimd, useThreads);
      const wasmPathOverride = typeof wasmPaths === "object" ? wasmPaths[wasmFileName] : void 0;
      let isTimeout = false;
      const tasks = [];
      if (timeout > 0) {
        tasks.push(new Promise((resolve) => {
          setTimeout(() => {
            isTimeout = true;
            resolve();
          }, timeout);
        }));
      }
      tasks.push(new Promise((resolve, reject) => {
        const factory = useThreads ? ortWasmFactoryThreaded : ortWasmFactory;
        const config = {
          locateFile: (fileName, scriptDirectory) => {
            if (false) {
              return URL.createObjectURL(new Blob(
                [
                  // This require() function is handled by esbuild plugin to load file content as string.
                  // eslint-disable-next-line @typescript-eslint/no-require-imports
                  null
                ],
                { type: "text/javascript" }
              ));
            }
            if (fileName.endsWith(".wasm")) {
              if (wasmPathOverride) {
                return wasmPathOverride;
              }
              const prefix = wasmPrefixOverride ?? scriptDirectory;
              if (false) {
                if (wasmFileName === "ort-wasm-simd.wasm") {
                  return prefix + "ort-wasm-simd.jsep.wasm";
                } else if (wasmFileName === "ort-wasm-simd-threaded.wasm") {
                  return prefix + "ort-wasm-simd-threaded.jsep.wasm";
                }
              }
              return prefix + wasmFileName;
            }
            return scriptDirectory + fileName;
          }
        };
        if (false) {
          config.numThreads = numThreads;
          if (typeof Blob === "undefined") {
            config.mainScriptUrlOrBlob = join(__dirname, "ort-wasm-threaded.js");
          } else {
            const scriptSourceCode = `var ortWasmThreaded=${factory.toString()};`;
            config.mainScriptUrlOrBlob = new Blob([scriptSourceCode], { type: "text/javascript" });
          }
        }
        factory(config).then(
          // wasm module initialized successfully
          (module2) => {
            initializing = false;
            initialized = true;
            wasm = module2;
            resolve();
          },
          // wasm module failed to initialize
          (what) => {
            initializing = false;
            aborted = true;
            reject(what);
          }
        );
      }));
      await Promise.race(tasks);
      if (isTimeout) {
        throw new Error(`WebAssembly backend initializing failed due to timeout: ${timeout}ms`);
      }
    };
    getInstance = () => {
      if (initialized && wasm) {
        return wasm;
      }
      throw new Error("WebAssembly is not initialized yet.");
    };
  }
});

// web/lib/wasm/wasm-utils.ts
var allocWasmString, iterateExtraOptions, checkLastError;
var init_wasm_utils = __esm({
  "web/lib/wasm/wasm-utils.ts"() {
    "use strict";
    init_wasm_factory();
    allocWasmString = (data, allocs) => {
      const wasm2 = getInstance();
      const dataLength = wasm2.lengthBytesUTF8(data) + 1;
      const dataOffset = wasm2._malloc(dataLength);
      wasm2.stringToUTF8(data, dataOffset, dataLength);
      allocs.push(dataOffset);
      return dataOffset;
    };
    iterateExtraOptions = (options, prefix, seen, handler) => {
      if (typeof options == "object" && options !== null) {
        if (seen.has(options)) {
          throw new Error("Circular reference in options");
        } else {
          seen.add(options);
        }
      }
      Object.entries(options).forEach(([key, value]) => {
        const name = prefix ? prefix + key : key;
        if (typeof value === "object") {
          iterateExtraOptions(value, name + ".", seen, handler);
        } else if (typeof value === "string" || typeof value === "number") {
          handler(name, value.toString());
        } else if (typeof value === "boolean") {
          handler(name, value ? "1" : "0");
        } else {
          throw new Error(`Can't handle extra config type: ${typeof value}`);
        }
      });
    };
    checkLastError = (message) => {
      const wasm2 = getInstance();
      const stack = wasm2.stackSave();
      try {
        const paramsOffset = wasm2.stackAlloc(8);
        wasm2._OrtGetLastError(paramsOffset, paramsOffset + 4);
        const errorCode = wasm2.HEAP32[paramsOffset / 4];
        const errorMessagePointer = wasm2.HEAPU32[paramsOffset / 4 + 1];
        const errorMessage = errorMessagePointer ? wasm2.UTF8ToString(errorMessagePointer) : "";
        throw new Error(`${message} ERROR_CODE: ${errorCode}, ERROR_MESSAGE: ${errorMessage}`);
      } finally {
        wasm2.stackRestore(stack);
      }
    };
  }
});

// web/lib/wasm/run-options.ts
var setRunOptions;
var init_run_options = __esm({
  "web/lib/wasm/run-options.ts"() {
    "use strict";
    init_wasm_factory();
    init_wasm_utils();
    setRunOptions = (options) => {
      const wasm2 = getInstance();
      let runOptionsHandle = 0;
      const allocs = [];
      const runOptions = options || {};
      try {
        if (options?.logSeverityLevel === void 0) {
          runOptions.logSeverityLevel = 2;
        } else if (typeof options.logSeverityLevel !== "number" || !Number.isInteger(options.logSeverityLevel) || options.logSeverityLevel < 0 || options.logSeverityLevel > 4) {
          throw new Error(`log serverity level is not valid: ${options.logSeverityLevel}`);
        }
        if (options?.logVerbosityLevel === void 0) {
          runOptions.logVerbosityLevel = 0;
        } else if (typeof options.logVerbosityLevel !== "number" || !Number.isInteger(options.logVerbosityLevel)) {
          throw new Error(`log verbosity level is not valid: ${options.logVerbosityLevel}`);
        }
        if (options?.terminate === void 0) {
          runOptions.terminate = false;
        }
        let tagDataOffset = 0;
        if (options?.tag !== void 0) {
          tagDataOffset = allocWasmString(options.tag, allocs);
        }
        runOptionsHandle = wasm2._OrtCreateRunOptions(
          runOptions.logSeverityLevel,
          runOptions.logVerbosityLevel,
          !!runOptions.terminate,
          tagDataOffset
        );
        if (runOptionsHandle === 0) {
          checkLastError("Can't create run options.");
        }
        if (options?.extra !== void 0) {
          iterateExtraOptions(options.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {
            const keyDataOffset = allocWasmString(key, allocs);
            const valueDataOffset = allocWasmString(value, allocs);
            if (wasm2._OrtAddRunConfigEntry(runOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
              checkLastError(`Can't set a run config entry: ${key} - ${value}.`);
            }
          });
        }
        return [runOptionsHandle, allocs];
      } catch (e) {
        if (runOptionsHandle !== 0) {
          wasm2._OrtReleaseRunOptions(runOptionsHandle);
        }
        allocs.forEach((alloc) => wasm2._free(alloc));
        throw e;
      }
    };
  }
});

// web/lib/wasm/session-options.ts
var getGraphOptimzationLevel, getExecutionMode, appendDefaultOptions, setExecutionProviders, setSessionOptions;
var init_session_options = __esm({
  "web/lib/wasm/session-options.ts"() {
    "use strict";
    init_wasm_factory();
    init_wasm_utils();
    getGraphOptimzationLevel = (graphOptimizationLevel) => {
      switch (graphOptimizationLevel) {
        case "disabled":
          return 0;
        case "basic":
          return 1;
        case "extended":
          return 2;
        case "all":
          return 99;
        default:
          throw new Error(`unsupported graph optimization level: ${graphOptimizationLevel}`);
      }
    };
    getExecutionMode = (executionMode) => {
      switch (executionMode) {
        case "sequential":
          return 0;
        case "parallel":
          return 1;
        default:
          throw new Error(`unsupported execution mode: ${executionMode}`);
      }
    };
    appendDefaultOptions = (options) => {
      if (!options.extra) {
        options.extra = {};
      }
      if (!options.extra.session) {
        options.extra.session = {};
      }
      const session = options.extra.session;
      if (!session.use_ort_model_bytes_directly) {
        session.use_ort_model_bytes_directly = "1";
      }
      if (options.executionProviders && options.executionProviders.some((ep) => (typeof ep === "string" ? ep : ep.name) === "webgpu")) {
        options.enableMemPattern = false;
      }
    };
    setExecutionProviders = (sessionOptionsHandle, executionProviders, allocs) => {
      for (const ep of executionProviders) {
        let epName = typeof ep === "string" ? ep : ep.name;
        switch (epName) {
          case "xnnpack":
            epName = "XNNPACK";
            break;
          case "webnn":
            epName = "WEBNN";
            if (typeof ep !== "string") {
              const webnnOptions = ep;
              if (webnnOptions?.deviceType) {
                const keyDataOffset = allocWasmString("deviceType", allocs);
                const valueDataOffset = allocWasmString(webnnOptions.deviceType, allocs);
                if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                  checkLastError(`Can't set a session config entry: 'deviceType' - ${webnnOptions.deviceType}.`);
                }
              }
              if (webnnOptions?.numThreads) {
                let numThreads = webnnOptions.numThreads;
                if (typeof numThreads != "number" || !Number.isInteger(numThreads) || numThreads < 0) {
                  numThreads = 0;
                }
                const keyDataOffset = allocWasmString("numThreads", allocs);
                const valueDataOffset = allocWasmString(numThreads.toString(), allocs);
                if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                  checkLastError(`Can't set a session config entry: 'numThreads' - ${webnnOptions.numThreads}.`);
                }
              }
              if (webnnOptions?.powerPreference) {
                const keyDataOffset = allocWasmString("powerPreference", allocs);
                const valueDataOffset = allocWasmString(webnnOptions.powerPreference, allocs);
                if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                  checkLastError(
                    `Can't set a session config entry: 'powerPreference' - ${webnnOptions.powerPreference}.`
                  );
                }
              }
            }
            break;
          case "webgpu":
            epName = "JS";
            if (typeof ep !== "string") {
              const webgpuOptions = ep;
              if (webgpuOptions?.preferredLayout) {
                if (webgpuOptions.preferredLayout !== "NCHW" && webgpuOptions.preferredLayout !== "NHWC") {
                  throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${webgpuOptions.preferredLayout}`);
                }
                const keyDataOffset = allocWasmString("preferredLayout", allocs);
                const valueDataOffset = allocWasmString(webgpuOptions.preferredLayout, allocs);
                if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                  checkLastError(
                    `Can't set a session config entry: 'preferredLayout' - ${webgpuOptions.preferredLayout}.`
                  );
                }
              }
            }
            break;
          case "wasm":
          case "cpu":
            continue;
          default:
            throw new Error(`not supported execution provider: ${epName}`);
        }
        const epNameDataOffset = allocWasmString(epName, allocs);
        if (getInstance()._OrtAppendExecutionProvider(sessionOptionsHandle, epNameDataOffset) !== 0) {
          checkLastError(`Can't append execution provider: ${epName}.`);
        }
      }
    };
    setSessionOptions = (options) => {
      const wasm2 = getInstance();
      let sessionOptionsHandle = 0;
      const allocs = [];
      const sessionOptions = options || {};
      appendDefaultOptions(sessionOptions);
      try {
        const graphOptimizationLevel = getGraphOptimzationLevel(sessionOptions.graphOptimizationLevel ?? "all");
        const executionMode = getExecutionMode(sessionOptions.executionMode ?? "sequential");
        const logIdDataOffset = typeof sessionOptions.logId === "string" ? allocWasmString(sessionOptions.logId, allocs) : 0;
        const logSeverityLevel = sessionOptions.logSeverityLevel ?? 2;
        if (!Number.isInteger(logSeverityLevel) || logSeverityLevel < 0 || logSeverityLevel > 4) {
          throw new Error(`log serverity level is not valid: ${logSeverityLevel}`);
        }
        const logVerbosityLevel = sessionOptions.logVerbosityLevel ?? 0;
        if (!Number.isInteger(logVerbosityLevel) || logVerbosityLevel < 0 || logVerbosityLevel > 4) {
          throw new Error(`log verbosity level is not valid: ${logVerbosityLevel}`);
        }
        const optimizedModelFilePathOffset = typeof sessionOptions.optimizedModelFilePath === "string" ? allocWasmString(sessionOptions.optimizedModelFilePath, allocs) : 0;
        sessionOptionsHandle = wasm2._OrtCreateSessionOptions(
          graphOptimizationLevel,
          !!sessionOptions.enableCpuMemArena,
          !!sessionOptions.enableMemPattern,
          executionMode,
          !!sessionOptions.enableProfiling,
          0,
          logIdDataOffset,
          logSeverityLevel,
          logVerbosityLevel,
          optimizedModelFilePathOffset
        );
        if (sessionOptionsHandle === 0) {
          checkLastError("Can't create session options.");
        }
        if (sessionOptions.executionProviders) {
          setExecutionProviders(sessionOptionsHandle, sessionOptions.executionProviders, allocs);
        }
        if (sessionOptions.freeDimensionOverrides) {
          for (const [name, value] of Object.entries(sessionOptions.freeDimensionOverrides)) {
            if (typeof name !== "string") {
              throw new Error(`free dimension override name must be a string: ${name}`);
            }
            if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
              throw new Error(`free dimension override value must be a non-negative integer: ${value}`);
            }
            const nameOffset = allocWasmString(name, allocs);
            if (wasm2._OrtAddFreeDimensionOverride(sessionOptionsHandle, nameOffset, value) !== 0) {
              checkLastError(`Can't set a free dimension override: ${name} - ${value}.`);
            }
          }
        }
        if (sessionOptions.extra !== void 0) {
          iterateExtraOptions(sessionOptions.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {
            const keyDataOffset = allocWasmString(key, allocs);
            const valueDataOffset = allocWasmString(value, allocs);
            if (wasm2._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
              checkLastError(`Can't set a session config entry: ${key} - ${value}.`);
            }
          });
        }
        return [sessionOptionsHandle, allocs];
      } catch (e) {
        if (sessionOptionsHandle !== 0) {
          wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);
        }
        allocs.forEach((alloc) => wasm2._free(alloc));
        throw e;
      }
    };
  }
});

// web/lib/wasm/wasm-common.ts
var tensorDataTypeStringToEnum, tensorDataTypeEnumToString, getTensorElementSize, tensorTypeToTypedArrayConstructor, logLevelStringToEnum, isGpuBufferSupportedType, dataLocationStringToEnum;
var init_wasm_common = __esm({
  "web/lib/wasm/wasm-common.ts"() {
    "use strict";
    tensorDataTypeStringToEnum = (type) => {
      switch (type) {
        case "int8":
          return 3 /* int8 */;
        case "uint8":
          return 2 /* uint8 */;
        case "bool":
          return 9 /* bool */;
        case "int16":
          return 5 /* int16 */;
        case "uint16":
          return 4 /* uint16 */;
        case "int32":
          return 6 /* int32 */;
        case "uint32":
          return 12 /* uint32 */;
        case "float16":
          return 10 /* float16 */;
        case "float32":
          return 1 /* float */;
        case "float64":
          return 11 /* double */;
        case "string":
          return 8 /* string */;
        case "int64":
          return 7 /* int64 */;
        case "uint64":
          return 13 /* uint64 */;
        default:
          throw new Error(`unsupported data type: ${type}`);
      }
    };
    tensorDataTypeEnumToString = (typeProto) => {
      switch (typeProto) {
        case 3 /* int8 */:
          return "int8";
        case 2 /* uint8 */:
          return "uint8";
        case 9 /* bool */:
          return "bool";
        case 5 /* int16 */:
          return "int16";
        case 4 /* uint16 */:
          return "uint16";
        case 6 /* int32 */:
          return "int32";
        case 12 /* uint32 */:
          return "uint32";
        case 10 /* float16 */:
          return "float16";
        case 1 /* float */:
          return "float32";
        case 11 /* double */:
          return "float64";
        case 8 /* string */:
          return "string";
        case 7 /* int64 */:
          return "int64";
        case 13 /* uint64 */:
          return "uint64";
        default:
          throw new Error(`unsupported data type: ${typeProto}`);
      }
    };
    getTensorElementSize = (dateType) => [void 0, 4, 1, 1, 2, 2, 4, 8, void 0, 1, 2, 8, 4, 8, void 0, void 0, void 0][dateType];
    tensorTypeToTypedArrayConstructor = (type) => {
      switch (type) {
        case "float16":
          return Uint16Array;
        case "float32":
          return Float32Array;
        case "uint8":
          return Uint8Array;
        case "int8":
          return Int8Array;
        case "uint16":
          return Uint16Array;
        case "int16":
          return Int16Array;
        case "int32":
          return Int32Array;
        case "bool":
          return Uint8Array;
        case "float64":
          return Float64Array;
        case "uint32":
          return Uint32Array;
        case "int64":
          return BigInt64Array;
        case "uint64":
          return BigUint64Array;
        default:
          throw new Error(`unsupported type: ${type}`);
      }
    };
    logLevelStringToEnum = (logLevel) => {
      switch (logLevel) {
        case "verbose":
          return 0;
        case "info":
          return 1;
        case "warning":
          return 2;
        case "error":
          return 3;
        case "fatal":
          return 4;
        default:
          throw new Error(`unsupported logging level: ${logLevel}`);
      }
    };
    isGpuBufferSupportedType = (type) => type === "float32" || type === "int32" || type === "int64" || type === "bool" || type === "float16" || type === "uint32";
    dataLocationStringToEnum = (location) => {
      switch (location) {
        case "none":
          return 0;
        case "cpu":
          return 1;
        case "cpu-pinned":
          return 2;
        case "texture":
          return 3;
        case "gpu-buffer":
          return 4;
        default:
          throw new Error(`unsupported data location: ${location}`);
      }
    };
  }
});

// web/lib/wasm/wasm-core-impl.ts
var initOrt, initRuntime, initEp, activeSessions, getSessionInputOutputCount, copyFromExternalBuffer, createSession, releaseSession, prepareInputOutputTensor, run, endProfiling;
var init_wasm_core_impl = __esm({
  "web/lib/wasm/wasm-core-impl.ts"() {
    "use strict";
    init_run_options();
    init_session_options();
    init_wasm_common();
    init_wasm_factory();
    init_wasm_utils();
    initOrt = (numThreads, loggingLevel) => {
      const errorCode = getInstance()._OrtInit(numThreads, loggingLevel);
      if (errorCode !== 0) {
        checkLastError("Can't initialize onnxruntime.");
      }
    };
    initRuntime = async (env3) => {
      initOrt(env3.wasm.numThreads, logLevelStringToEnum(env3.logLevel));
    };
    initEp = async (env3, epName) => {
      if (false) {
        if (typeof navigator === "undefined" || !navigator.gpu) {
          throw new Error("WebGPU is not supported in current environment");
        }
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
          throw new Error(
            'Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.'
          );
        }
        if (!env3.wasm.simd) {
          throw new Error(
            "Not supported for WebGPU=ON and SIMD=OFF. Please set `env.wasm.simd` to true when using `webgpu` EP"
          );
        }
        const initJsep = null.init;
        await initJsep(getInstance(), env3, adapter);
      }
    };
    activeSessions = /* @__PURE__ */ new Map();
    getSessionInputOutputCount = (sessionHandle) => {
      const wasm2 = getInstance();
      const stack = wasm2.stackSave();
      try {
        const dataOffset = wasm2.stackAlloc(8);
        const errorCode = wasm2._OrtGetInputOutputCount(sessionHandle, dataOffset, dataOffset + 4);
        if (errorCode !== 0) {
          checkLastError("Can't get session input/output count.");
        }
        return [wasm2.HEAP32[dataOffset / 4], wasm2.HEAP32[dataOffset / 4 + 1]];
      } finally {
        wasm2.stackRestore(stack);
      }
    };
    copyFromExternalBuffer = (model) => {
      const wasm2 = getInstance();
      const modelDataOffset = wasm2._malloc(model.byteLength);
      if (modelDataOffset === 0) {
        throw new Error(`Can't create a session. failed to allocate a buffer of size ${model.byteLength}.`);
      }
      wasm2.HEAPU8.set(model, modelDataOffset);
      return [modelDataOffset, model.byteLength];
    };
    createSession = (modelData, options) => {
      let modelDataOffset, modelDataLength;
      const wasm2 = getInstance();
      if (Array.isArray(modelData)) {
        [modelDataOffset, modelDataLength] = modelData;
      } else if (modelData.buffer === wasm2.HEAPU8.buffer) {
        [modelDataOffset, modelDataLength] = [modelData.byteOffset, modelData.byteLength];
      } else {
        [modelDataOffset, modelDataLength] = copyFromExternalBuffer(modelData);
      }
      let sessionHandle = 0;
      let sessionOptionsHandle = 0;
      let ioBindingHandle = 0;
      let allocs = [];
      const inputNamesUTF8Encoded = [];
      const outputNamesUTF8Encoded = [];
      try {
        [sessionOptionsHandle, allocs] = setSessionOptions(options);
        sessionHandle = wasm2._OrtCreateSession(modelDataOffset, modelDataLength, sessionOptionsHandle);
        if (sessionHandle === 0) {
          checkLastError("Can't create a session.");
        }
        const [inputCount, outputCount] = getSessionInputOutputCount(sessionHandle);
        const inputNames = [];
        const outputNames = [];
        const outputPreferredLocations = [];
        for (let i = 0; i < inputCount; i++) {
          const name = wasm2._OrtGetInputName(sessionHandle, i);
          if (name === 0) {
            checkLastError("Can't get an input name.");
          }
          inputNamesUTF8Encoded.push(name);
          inputNames.push(wasm2.UTF8ToString(name));
        }
        for (let i = 0; i < outputCount; i++) {
          const name = wasm2._OrtGetOutputName(sessionHandle, i);
          if (name === 0) {
            checkLastError("Can't get an output name.");
          }
          outputNamesUTF8Encoded.push(name);
          const nameString = wasm2.UTF8ToString(name);
          outputNames.push(nameString);
          if (false) {
            const location = typeof options?.preferredOutputLocation === "string" ? options.preferredOutputLocation : options?.preferredOutputLocation?.[nameString] ?? "cpu";
            if (location !== "cpu" && location !== "cpu-pinned" && location !== "gpu-buffer") {
              throw new Error(`Not supported preferred output location: ${location}.`);
            }
            outputPreferredLocations.push(location);
          }
        }
        let bindingState = null;
        if (false) {
          ioBindingHandle = wasm2._OrtCreateBinding(sessionHandle);
          if (ioBindingHandle === 0) {
            checkLastError("Can't create IO binding.");
          }
          bindingState = {
            handle: ioBindingHandle,
            outputPreferredLocations,
            outputPreferredLocationsEncoded: outputPreferredLocations.map((l) => dataLocationStringToEnum(l))
          };
        }
        activeSessions.set(sessionHandle, [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, bindingState]);
        return [sessionHandle, inputNames, outputNames];
      } catch (e) {
        inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        if (ioBindingHandle !== 0) {
          wasm2._OrtReleaseBinding(ioBindingHandle);
        }
        if (sessionHandle !== 0) {
          wasm2._OrtReleaseSession(sessionHandle);
        }
        throw e;
      } finally {
        wasm2._free(modelDataOffset);
        if (sessionOptionsHandle !== 0) {
          wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);
        }
        allocs.forEach((alloc) => wasm2._free(alloc));
      }
    };
    releaseSession = (sessionId) => {
      const wasm2 = getInstance();
      const session = activeSessions.get(sessionId);
      if (!session) {
        throw new Error(`cannot release session. invalid session id: ${sessionId}`);
      }
      const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState] = session;
      if (ioBindingState) {
        wasm2._OrtReleaseBinding(ioBindingState.handle);
      }
      wasm2.jsepUnregisterBuffers?.(sessionId);
      inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
      outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
      wasm2._OrtReleaseSession(sessionHandle);
      activeSessions.delete(sessionId);
    };
    prepareInputOutputTensor = (tensor, tensorHandles, allocs, sessionId, index) => {
      if (!tensor) {
        tensorHandles.push(0);
        return;
      }
      const wasm2 = getInstance();
      const dataType = tensor[0];
      const dims = tensor[1];
      const location = tensor[3];
      let rawData;
      let dataByteLength;
      if (dataType === "string" && location === "gpu-buffer") {
        throw new Error("String tensor is not supported on GPU.");
      }
      if (location === "gpu-buffer") {
        const gpuBuffer = tensor[2].gpuBuffer;
        const elementSizeInBytes = getTensorElementSize(tensorDataTypeStringToEnum(dataType));
        dataByteLength = dims.reduce((a, b) => a * b, 1) * elementSizeInBytes;
        rawData = wasm2.jsepRegisterBuffer(sessionId, index, gpuBuffer, dataByteLength);
      } else {
        const data = tensor[2];
        if (Array.isArray(data)) {
          dataByteLength = 4 * data.length;
          rawData = wasm2._malloc(dataByteLength);
          allocs.push(rawData);
          let dataIndex = rawData / 4;
          for (let i = 0; i < data.length; i++) {
            if (typeof data[i] !== "string") {
              throw new TypeError(`tensor data at index ${i} is not a string`);
            }
            wasm2.HEAPU32[dataIndex++] = allocWasmString(data[i], allocs);
          }
        } else {
          dataByteLength = data.byteLength;
          rawData = wasm2._malloc(dataByteLength);
          allocs.push(rawData);
          wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
        }
      }
      const stack = wasm2.stackSave();
      const dimsOffset = wasm2.stackAlloc(4 * dims.length);
      try {
        let dimIndex = dimsOffset / 4;
        dims.forEach((d) => wasm2.HEAP32[dimIndex++] = d);
        const tensor2 = wasm2._OrtCreateTensor(
          tensorDataTypeStringToEnum(dataType),
          rawData,
          dataByteLength,
          dimsOffset,
          dims.length,
          dataLocationStringToEnum(location)
        );
        if (tensor2 === 0) {
          checkLastError(`Can't create tensor for input/output. session=${sessionId}, index=${index}.`);
        }
        tensorHandles.push(tensor2);
      } finally {
        wasm2.stackRestore(stack);
      }
    };
    run = async (sessionId, inputIndices, inputTensors, outputIndices, outputTensors, options) => {
      const wasm2 = getInstance();
      const session = activeSessions.get(sessionId);
      if (!session) {
        throw new Error(`cannot run inference. invalid session id: ${sessionId}`);
      }
      const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState] = session;
      const inputCount = inputIndices.length;
      const outputCount = outputIndices.length;
      let runOptionsHandle = 0;
      let runOptionsAllocs = [];
      const inputTensorHandles = [];
      const outputTensorHandles = [];
      const inputOutputAllocs = [];
      const beforeRunStack = wasm2.stackSave();
      const inputValuesOffset = wasm2.stackAlloc(inputCount * 4);
      const inputNamesOffset = wasm2.stackAlloc(inputCount * 4);
      const outputValuesOffset = wasm2.stackAlloc(outputCount * 4);
      const outputNamesOffset = wasm2.stackAlloc(outputCount * 4);
      try {
        [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);
        for (let i = 0; i < inputCount; i++) {
          prepareInputOutputTensor(inputTensors[i], inputTensorHandles, inputOutputAllocs, sessionId, inputIndices[i]);
        }
        for (let i = 0; i < outputCount; i++) {
          prepareInputOutputTensor(
            outputTensors[i],
            outputTensorHandles,
            inputOutputAllocs,
            sessionId,
            inputCount + outputIndices[i]
          );
        }
        let inputValuesIndex = inputValuesOffset / 4;
        let inputNamesIndex = inputNamesOffset / 4;
        let outputValuesIndex = outputValuesOffset / 4;
        let outputNamesIndex = outputNamesOffset / 4;
        for (let i = 0; i < inputCount; i++) {
          wasm2.HEAPU32[inputValuesIndex++] = inputTensorHandles[i];
          wasm2.HEAPU32[inputNamesIndex++] = inputNamesUTF8Encoded[inputIndices[i]];
        }
        for (let i = 0; i < outputCount; i++) {
          wasm2.HEAPU32[outputValuesIndex++] = outputTensorHandles[i];
          wasm2.HEAPU32[outputNamesIndex++] = outputNamesUTF8Encoded[outputIndices[i]];
        }
        if (false) {
          const { handle, outputPreferredLocations, outputPreferredLocationsEncoded } = ioBindingState;
          if (inputNamesUTF8Encoded.length !== inputCount) {
            throw new Error(`input count from feeds (${inputCount}) is expected to be always equal to model's input count (${inputNamesUTF8Encoded.length}).`);
          }
          for (let i = 0; i < inputCount; i++) {
            const index = inputIndices[i];
            const errorCode2 = await wasm2._OrtBindInput(handle, inputNamesUTF8Encoded[index], inputTensorHandles[i]);
            if (errorCode2 !== 0) {
              checkLastError(`Can't bind input[${i}] for session=${sessionId}.`);
            }
          }
          for (let i = 0; i < outputCount; i++) {
            const index = outputIndices[i];
            const location = outputTensors[i]?.[3];
            if (location) {
              const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], outputTensorHandles[i], 0);
              if (errorCode2 !== 0) {
                checkLastError(`Can't bind pre-allocated output[${i}] for session=${sessionId}.`);
              }
            } else {
              const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], 0, outputPreferredLocationsEncoded[index]);
              if (errorCode2 !== 0) {
                checkLastError(`Can't bind output[${i}] to ${outputPreferredLocations[i]} for session=${sessionId}.`);
              }
            }
          }
        }
        let errorCode;
        if (false) {
          errorCode = await wasm2._OrtRunWithBinding(
            sessionHandle,
            ioBindingState.handle,
            outputCount,
            outputValuesOffset,
            runOptionsHandle
          );
        } else {
          errorCode = await wasm2._OrtRun(
            sessionHandle,
            inputNamesOffset,
            inputValuesOffset,
            inputCount,
            outputNamesOffset,
            outputCount,
            outputValuesOffset,
            runOptionsHandle
          );
        }
        if (errorCode !== 0) {
          checkLastError("failed to call OrtRun().");
        }
        const output = [];
        for (let i = 0; i < outputCount; i++) {
          const tensor = wasm2.HEAPU32[outputValuesOffset / 4 + i];
          if (tensor === outputTensorHandles[i]) {
            output.push(outputTensors[i]);
            continue;
          }
          const beforeGetTensorDataStack = wasm2.stackSave();
          const tensorDataOffset = wasm2.stackAlloc(4 * 4);
          let keepOutputTensor = false;
          let type, dataOffset = 0;
          try {
            const errorCode2 = wasm2._OrtGetTensorData(
              tensor,
              tensorDataOffset,
              tensorDataOffset + 4,
              tensorDataOffset + 8,
              tensorDataOffset + 12
            );
            if (errorCode2 !== 0) {
              checkLastError(`Can't access output tensor data on index ${i}.`);
            }
            let tensorDataIndex = tensorDataOffset / 4;
            const dataType = wasm2.HEAPU32[tensorDataIndex++];
            dataOffset = wasm2.HEAPU32[tensorDataIndex++];
            const dimsOffset = wasm2.HEAPU32[tensorDataIndex++];
            const dimsLength = wasm2.HEAPU32[tensorDataIndex++];
            const dims = [];
            for (let i2 = 0; i2 < dimsLength; i2++) {
              dims.push(wasm2.HEAPU32[dimsOffset / 4 + i2]);
            }
            wasm2._OrtFree(dimsOffset);
            const size = dims.reduce((a, b) => a * b, 1);
            type = tensorDataTypeEnumToString(dataType);
            const preferredLocation = ioBindingState?.outputPreferredLocations[outputIndices[i]];
            if (type === "string") {
              if (preferredLocation === "gpu-buffer") {
                throw new Error("String tensor is not supported on GPU.");
              }
              const stringData = [];
              let dataIndex = dataOffset / 4;
              for (let i2 = 0; i2 < size; i2++) {
                const offset = wasm2.HEAPU32[dataIndex++];
                const maxBytesToRead = i2 === size - 1 ? void 0 : wasm2.HEAPU32[dataIndex] - offset;
                stringData.push(wasm2.UTF8ToString(offset, maxBytesToRead));
              }
              output.push([type, dims, stringData, "cpu"]);
            } else {
              if (preferredLocation === "gpu-buffer" && size > 0) {
                const gpuBuffer = wasm2.jsepGetBuffer(dataOffset);
                const elementSize = getTensorElementSize(dataType);
                if (elementSize === void 0 || !isGpuBufferSupportedType(type)) {
                  throw new Error(`Unsupported data type: ${type}`);
                }
                keepOutputTensor = true;
                output.push([
                  type,
                  dims,
                  {
                    gpuBuffer,
                    download: wasm2.jsepCreateDownloader(gpuBuffer, size * elementSize, type),
                    dispose: () => {
                      wasm2._OrtReleaseTensor(tensor);
                    }
                  },
                  "gpu-buffer"
                ]);
              } else {
                const typedArrayConstructor = tensorTypeToTypedArrayConstructor(type);
                const data = new typedArrayConstructor(size);
                new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(wasm2.HEAPU8.subarray(dataOffset, dataOffset + data.byteLength));
                output.push([type, dims, data, "cpu"]);
              }
            }
          } finally {
            wasm2.stackRestore(beforeGetTensorDataStack);
            if (type === "string" && dataOffset) {
              wasm2._free(dataOffset);
            }
            if (!keepOutputTensor) {
              wasm2._OrtReleaseTensor(tensor);
            }
          }
        }
        if (ioBindingState) {
          wasm2._OrtClearBoundOutputs(ioBindingState.handle);
        }
        return output;
      } finally {
        wasm2.stackRestore(beforeRunStack);
        inputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));
        outputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));
        inputOutputAllocs.forEach((p) => wasm2._free(p));
        if (runOptionsHandle !== 0) {
          wasm2._OrtReleaseRunOptions(runOptionsHandle);
        }
        runOptionsAllocs.forEach((p) => wasm2._free(p));
      }
    };
    endProfiling = (sessionId) => {
      const wasm2 = getInstance();
      const session = activeSessions.get(sessionId);
      if (!session) {
        throw new Error("invalid session id");
      }
      const sessionHandle = session[0];
      const profileFileName = wasm2._OrtEndProfiling(sessionHandle);
      if (profileFileName === 0) {
        checkLastError("Can't get an profile file name.");
      }
      wasm2._OrtFree(profileFileName);
    };
  }
});

// web/lib/wasm/proxy-wrapper.ts
var initializing2, initialized2, aborted2, scriptSrc, initializeWebAssemblyAndOrtRuntime, initializeOrtEp, copyFromExternalBuffer2, createSession2, releaseSession2, run2, endProfiling2;
var init_proxy_wrapper = __esm({
  "web/lib/wasm/proxy-wrapper.ts"() {
    "use strict";
    init_esm();
    init_wasm_core_impl();
    init_wasm_factory();
    initializing2 = false;
    initialized2 = false;
    aborted2 = false;
    scriptSrc = typeof document !== "undefined" ? document?.currentScript?.src : void 0;
    initializeWebAssemblyAndOrtRuntime = async () => {
      if (initialized2) {
        return;
      }
      if (initializing2) {
        throw new Error("multiple calls to 'initWasm()' detected.");
      }
      if (aborted2) {
        throw new Error("previous call to 'initWasm()' failed.");
      }
      initializing2 = true;
      if (false) {
        if (env2.wasm.wasmPaths === void 0) {
          if (scriptSrc && scriptSrc.indexOf("blob:") !== 0) {
            env2.wasm.wasmPaths = scriptSrc.substr(0, +scriptSrc.lastIndexOf("/") + 1);
          }
        }
        return new Promise((resolve, reject) => {
          proxyWorker?.terminate();
          const workerUrl = URL.createObjectURL(new Blob(
            [
              // This require() function is handled by esbuild plugin to load file content as string.
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              null
            ],
            { type: "text/javascript" }
          ));
          proxyWorker = new Worker(workerUrl, { name: "ort-wasm-proxy-worker" });
          proxyWorker.onerror = (ev) => reject(ev);
          proxyWorker.onmessage = onProxyWorkerMessage;
          URL.revokeObjectURL(workerUrl);
          initWasmCallbacks = [resolve, reject];
          const message = { type: "init-wasm", in: env2 };
          proxyWorker.postMessage(message);
        });
      } else {
        try {
          await initializeWebAssembly(env2.wasm);
          await initRuntime(env2);
          initialized2 = true;
        } catch (e) {
          aborted2 = true;
          throw e;
        } finally {
          initializing2 = false;
        }
      }
    };
    initializeOrtEp = async (epName) => {
      if (false) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("init-ep", [resolve, reject]);
          const message = { type: "init-ep", in: { epName, env: env2 } };
          proxyWorker.postMessage(message);
        });
      } else {
        await initEp(env2, epName);
      }
    };
    copyFromExternalBuffer2 = async (buffer) => {
      if (false) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("copy-from", [resolve, reject]);
          const message = { type: "copy-from", in: { buffer } };
          proxyWorker.postMessage(message, [buffer.buffer]);
        });
      } else {
        return copyFromExternalBuffer(buffer);
      }
    };
    createSession2 = async (model, options) => {
      if (false) {
        if (options?.preferredOutputLocation) {
          throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
        }
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("create", [resolve, reject]);
          const message = { type: "create", in: { model, options } };
          const transferable = [];
          if (model instanceof Uint8Array) {
            transferable.push(model.buffer);
          }
          proxyWorker.postMessage(message, transferable);
        });
      } else {
        return createSession(model, options);
      }
    };
    releaseSession2 = async (sessionId) => {
      if (false) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("release", [resolve, reject]);
          const message = { type: "release", in: sessionId };
          proxyWorker.postMessage(message);
        });
      } else {
        releaseSession(sessionId);
      }
    };
    run2 = async (sessionId, inputIndices, inputs, outputIndices, outputs, options) => {
      if (false) {
        if (inputs.some((t) => t[3] !== "cpu")) {
          throw new Error("input tensor on GPU is not supported for proxy.");
        }
        if (outputs.some((t) => t)) {
          throw new Error("pre-allocated output tensor is not supported for proxy.");
        }
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("run", [resolve, reject]);
          const serializableInputs = inputs;
          const message = { type: "run", in: { sessionId, inputIndices, inputs: serializableInputs, outputIndices, options } };
          proxyWorker.postMessage(message, extractTransferableBuffers(serializableInputs));
        });
      } else {
        return run(sessionId, inputIndices, inputs, outputIndices, outputs, options);
      }
    };
    endProfiling2 = async (sessionId) => {
      if (false) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("end-profiling", [resolve, reject]);
          const message = { type: "end-profiling", in: sessionId };
          proxyWorker.postMessage(message);
        });
      } else {
        endProfiling(sessionId);
      }
    };
  }
});

// nodejs-ignore:node:fs/promises
var readFile2;
var init_promises = __esm({
  "nodejs-ignore:node:fs/promises"() {
    readFile2 = void 0;
  }
});

// web/lib/wasm/session-handler-inference.ts
var encodeTensorMetadata, decodeTensorMetadata, OnnxruntimeWebAssemblySessionHandler;
var init_session_handler_inference = __esm({
  "web/lib/wasm/session-handler-inference.ts"() {
    "use strict";
    init_promises();
    init_esm();
    init_proxy_wrapper();
    init_wasm_common();
    encodeTensorMetadata = (tensor, getName) => {
      switch (tensor.location) {
        case "cpu":
          return [tensor.type, tensor.dims, tensor.data, "cpu"];
        case "gpu-buffer":
          return [tensor.type, tensor.dims, { gpuBuffer: tensor.gpuBuffer }, "gpu-buffer"];
        default:
          throw new Error(`invalid data location: ${tensor.location} for ${getName()}`);
      }
    };
    decodeTensorMetadata = (tensor) => {
      switch (tensor[3]) {
        case "cpu":
          return new Tensor2(tensor[0], tensor[2], tensor[1]);
        case "gpu-buffer": {
          const dataType = tensor[0];
          if (!isGpuBufferSupportedType(dataType)) {
            throw new Error(`not supported data type: ${dataType} for deserializing GPU tensor`);
          }
          const { gpuBuffer, download, dispose } = tensor[2];
          return Tensor2.fromGpuBuffer(gpuBuffer, { dataType, dims: tensor[1], download, dispose });
        }
        default:
          throw new Error(`invalid data location: ${tensor[3]}`);
      }
    };
    OnnxruntimeWebAssemblySessionHandler = class {
      async fetchModelAndCopyToWasmMemory(path) {
        const response = await fetch(path);
        if (response.status !== 200) {
          throw new Error(`failed to load model: ${path}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return copyFromExternalBuffer2(new Uint8Array(arrayBuffer));
      }
      async loadModel(pathOrBuffer, options) {
        TRACE_FUNC_BEGIN();
        let model;
        if (typeof pathOrBuffer === "string") {
          if (typeof process !== "undefined" && process.versions && process.versions.node) {
            model = await readFile2(pathOrBuffer);
          } else {
            model = await this.fetchModelAndCopyToWasmMemory(pathOrBuffer);
          }
        } else {
          model = pathOrBuffer;
        }
        [this.sessionId, this.inputNames, this.outputNames] = await createSession2(model, options);
        TRACE_FUNC_END();
      }
      async dispose() {
        return releaseSession2(this.sessionId);
      }
      async run(feeds, fetches, options) {
        TRACE_FUNC_BEGIN();
        const inputArray = [];
        const inputIndices = [];
        Object.entries(feeds).forEach((kvp) => {
          const name = kvp[0];
          const tensor = kvp[1];
          const index = this.inputNames.indexOf(name);
          if (index === -1) {
            throw new Error(`invalid input '${name}'`);
          }
          inputArray.push(tensor);
          inputIndices.push(index);
        });
        const outputArray = [];
        const outputIndices = [];
        Object.entries(fetches).forEach((kvp) => {
          const name = kvp[0];
          const tensor = kvp[1];
          const index = this.outputNames.indexOf(name);
          if (index === -1) {
            throw new Error(`invalid output '${name}'`);
          }
          outputArray.push(tensor);
          outputIndices.push(index);
        });
        const inputs = inputArray.map((t, i) => encodeTensorMetadata(t, () => `input "${this.inputNames[inputIndices[i]]}"`));
        const outputs = outputArray.map(
          (t, i) => t ? encodeTensorMetadata(t, () => `output "${this.outputNames[outputIndices[i]]}"`) : null
        );
        const results = await run2(this.sessionId, inputIndices, inputs, outputIndices, outputs, options);
        const resultMap = {};
        for (let i = 0; i < results.length; i++) {
          resultMap[this.outputNames[outputIndices[i]]] = outputArray[i] ?? decodeTensorMetadata(results[i]);
        }
        TRACE_FUNC_END();
        return resultMap;
      }
      startProfiling() {
      }
      endProfiling() {
        void endProfiling2(this.sessionId);
      }
    };
  }
});

// web/lib/backend-wasm.ts
var initializeFlags, OnnxruntimeWebAssemblyBackend;
var init_backend_wasm = __esm({
  "web/lib/backend-wasm.ts"() {
    "use strict";
    init_node_os();
    init_esm();
    init_proxy_wrapper();
    init_session_handler_inference();
    initializeFlags = () => {
      if (typeof env2.wasm.initTimeout !== "number" || env2.wasm.initTimeout < 0) {
        env2.wasm.initTimeout = 0;
      }
      if (typeof env2.wasm.simd !== "boolean") {
        env2.wasm.simd = true;
      }
      if (typeof env2.wasm.proxy !== "boolean") {
        env2.wasm.proxy = false;
      }
      if (typeof env2.wasm.trace !== "boolean") {
        env2.wasm.trace = false;
      }
      if (typeof env2.wasm.numThreads !== "number" || !Number.isInteger(env2.wasm.numThreads) || env2.wasm.numThreads <= 0) {
        const numCpuLogicalCores = typeof navigator === "undefined" ? cpus().length : navigator.hardwareConcurrency;
        env2.wasm.numThreads = Math.min(4, Math.ceil((numCpuLogicalCores || 1) / 2));
      }
    };
    OnnxruntimeWebAssemblyBackend = class {
      /**
       * This function initializes the WebAssembly backend.
       *
       * This function will be called only once for each backend name. It will be called the first time when
       * `ort.InferenceSession.create()` is called with a registered backend name.
       *
       * @param backendName - the registered backend name.
       */
      async init(backendName) {
        initializeFlags();
        await initializeWebAssemblyAndOrtRuntime();
        await initializeOrtEp(backendName);
      }
      async createInferenceSessionHandler(pathOrBuffer, options) {
        const handler = new OnnxruntimeWebAssemblySessionHandler();
        await handler.loadModel(pathOrBuffer, options);
        return Promise.resolve(handler);
      }
    };
  }
});

// web/lib/backend-wasm-inference.ts
var backend_wasm_inference_exports = {};
__export(backend_wasm_inference_exports, {
  wasmBackend: () => wasmBackend
});
var wasmBackend;
var init_backend_wasm_inference = __esm({
  "web/lib/backend-wasm-inference.ts"() {
    "use strict";
    init_backend_wasm();
    wasmBackend = new OnnxruntimeWebAssemblyBackend();
  }
});

// web/lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  InferenceSession: () => InferenceSession2,
  TRACE: () => TRACE,
  TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
  TRACE_FUNC_END: () => TRACE_FUNC_END,
  Tensor: () => Tensor2,
  TrainingSession: () => TrainingSession2,
  default: () => lib_default,
  env: () => env2,
  registerBackend: () => registerBackend
});
module.exports = __toCommonJS(lib_exports);
init_esm();
init_esm();
init_esm();

// web/lib/version.ts
var version2 = "1.17.0";

// web/lib/index.ts
var lib_default = esm_exports;
if (false) {
  const onnxjsBackend = null.onnxjsBackend;
  registerBackend("webgl", onnxjsBackend, -10);
}
if (true) {
  const wasmBackend2 = true ? (init_backend_wasm_inference(), __toCommonJS(backend_wasm_inference_exports)).wasmBackend : null.wasmBackend;
  if (false) {
    registerBackend("webgpu", wasmBackend2, 5);
  }
  registerBackend("cpu", wasmBackend2, 10);
  registerBackend("wasm", wasmBackend2, 10);
  if (true) {
    registerBackend("xnnpack", wasmBackend2, 9);
    if (false) {
      registerBackend("webnn", wasmBackend2, 9);
    }
  }
}
Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvdHJhY2UudHMiLCAiLi4vLi4vLi4vY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24udHMiLCAiLi4vLi4vLi4vY29tbW9uL2xpYi9vbm54LXZhbHVlLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvdHJhaW5pbmctc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvdHJhaW5pbmctc2Vzc2lvbi50cyIsICIuLi8uLi8uLi9jb21tb24vbGliL2luZGV4LnRzIiwgIm5vZGVqcy1pZ25vcmU6bm9kZTpvcyIsICJub2RlanMtaWdub3JlOmZzIiwgIm5vZGVqcy1pZ25vcmU6cGF0aCIsICIuLi8uLi9saWIvd2FzbS9iaW5kaW5nL29ydC13YXNtLmpzIiwgIi4uLy4uL2xpYi93YXNtL3dhc20tZmFjdG9yeS50cyIsICIuLi8uLi9saWIvd2FzbS93YXNtLXV0aWxzLnRzIiwgIi4uLy4uL2xpYi93YXNtL3J1bi1vcHRpb25zLnRzIiwgIi4uLy4uL2xpYi93YXNtL3Nlc3Npb24tb3B0aW9ucy50cyIsICIuLi8uLi9saWIvd2FzbS93YXNtLWNvbW1vbi50cyIsICIuLi8uLi9saWIvd2FzbS93YXNtLWNvcmUtaW1wbC50cyIsICIuLi8uLi9saWIvd2FzbS9wcm94eS13cmFwcGVyLnRzIiwgIm5vZGVqcy1pZ25vcmU6bm9kZTpmcy9wcm9taXNlcyIsICIuLi8uLi9saWIvd2FzbS9zZXNzaW9uLWhhbmRsZXItaW5mZXJlbmNlLnRzIiwgIi4uLy4uL2xpYi9iYWNrZW5kLXdhc20udHMiLCAiLi4vLi4vbGliL2JhY2tlbmQtd2FzbS1pbmZlcmVuY2UudHMiLCAiLi4vLi4vbGliL2luZGV4LnRzIiwgIi4uLy4uL2xpYi92ZXJzaW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuXG5pbnRlcmZhY2UgQmFja2VuZEluZm8ge1xuICBiYWNrZW5kOiBCYWNrZW5kO1xuICBwcmlvcml0eTogbnVtYmVyO1xuXG4gIGluaXRQcm9taXNlPzogUHJvbWlzZTx2b2lkPjtcbiAgaW5pdGlhbGl6ZWQ/OiBib29sZWFuO1xuICBhYm9ydGVkPzogYm9vbGVhbjtcbn1cblxuY29uc3QgYmFja2VuZHM6IE1hcDxzdHJpbmcsIEJhY2tlbmRJbmZvPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eTogc3RyaW5nW10gPSBbXTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIGJhY2tlbmQuXG4gKlxuICogQHBhcmFtIG5hbWUgLSB0aGUgbmFtZSBhcyBhIGtleSB0byBsb29rdXAgYXMgYW4gZXhlY3V0aW9uIHByb3ZpZGVyLlxuICogQHBhcmFtIGJhY2tlbmQgLSB0aGUgYmFja2VuZCBvYmplY3QuXG4gKiBAcGFyYW0gcHJpb3JpdHkgLSBhbiBpbnRlZ2VyIGluZGljYXRpbmcgdGhlIHByaW9yaXR5IG9mIHRoZSBiYWNrZW5kLiBIaWdoZXIgbnVtYmVyIG1lYW5zIGhpZ2hlciBwcmlvcml0eS4gaWYgcHJpb3JpdHlcbiAqIDwgMCwgaXQgd2lsbCBiZSBjb25zaWRlcmVkIGFzIGEgJ2JldGEnIHZlcnNpb24gYW5kIHdpbGwgbm90IGJlIHVzZWQgYXMgYSBmYWxsYmFjayBiYWNrZW5kIGJ5IGRlZmF1bHQuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJCYWNrZW5kID0gKG5hbWU6IHN0cmluZywgYmFja2VuZDogQmFja2VuZCwgcHJpb3JpdHk6IG51bWJlcik6IHZvaWQgPT4ge1xuICBpZiAoYmFja2VuZCAmJiB0eXBlb2YgYmFja2VuZC5pbml0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgY3VycmVudEJhY2tlbmQgPSBiYWNrZW5kcy5nZXQobmFtZSk7XG4gICAgaWYgKGN1cnJlbnRCYWNrZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJhY2tlbmRzLnNldChuYW1lLCB7YmFja2VuZCwgcHJpb3JpdHl9KTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kLnByaW9yaXR5ID4gcHJpb3JpdHkpIHtcbiAgICAgIC8vIHNhbWUgbmFtZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgd2l0aCBhIGhpZ2hlciBwcmlvcml0eS4gc2tpcCByZWdpc3RlcmF0aW9uLlxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEJhY2tlbmQucHJpb3JpdHkgPT09IHByaW9yaXR5KSB7XG4gICAgICBpZiAoY3VycmVudEJhY2tlbmQuYmFja2VuZCAhPT0gYmFja2VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCByZWdpc3RlciBiYWNrZW5kIFwiJHtuYW1lfVwiIHVzaW5nIHByaW9yaXR5ICR7cHJpb3JpdHl9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByaW9yaXR5ID49IDApIHtcbiAgICAgIGNvbnN0IGkgPSBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYmFja2VuZHMuZ2V0KGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eVtpXSkhLnByaW9yaXR5IDw9IHByaW9yaXR5KSB7XG4gICAgICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnNwbGljZShpLCAwLCBuYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5wdXNoKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSB2YWxpZCBiYWNrZW5kJyk7XG59O1xuXG4vKipcbiAqIFJlc29sdmUgYmFja2VuZCBieSBzcGVjaWZpZWQgaGludHMuXG4gKlxuICogQHBhcmFtIGJhY2tlbmRIaW50cyAtIGEgbGlzdCBvZiBleGVjdXRpb24gcHJvdmlkZXIgbmFtZXMgdG8gbG9va3VwLiBJZiBvbWl0dGVkIHVzZSByZWdpc3RlcmVkIGJhY2tlbmRzIGFzIGxpc3QuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgYmFja2VuZC5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCByZXNvbHZlQmFja2VuZCA9IGFzeW5jKGJhY2tlbmRIaW50czogcmVhZG9ubHkgc3RyaW5nW10pOiBQcm9taXNlPEJhY2tlbmQ+ID0+IHtcbiAgY29uc3QgYmFja2VuZE5hbWVzID0gYmFja2VuZEhpbnRzLmxlbmd0aCA9PT0gMCA/IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eSA6IGJhY2tlbmRIaW50cztcbiAgY29uc3QgZXJyb3JzID0gW107XG4gIGZvciAoY29uc3QgYmFja2VuZE5hbWUgb2YgYmFja2VuZE5hbWVzKSB7XG4gICAgY29uc3QgYmFja2VuZEluZm8gPSBiYWNrZW5kcy5nZXQoYmFja2VuZE5hbWUpO1xuICAgIGlmIChiYWNrZW5kSW5mbykge1xuICAgICAgaWYgKGJhY2tlbmRJbmZvLmluaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybiBiYWNrZW5kSW5mby5iYWNrZW5kO1xuICAgICAgfSBlbHNlIGlmIChiYWNrZW5kSW5mby5hYm9ydGVkKSB7XG4gICAgICAgIGNvbnRpbnVlOyAgLy8gY3VycmVudCBiYWNrZW5kIGlzIHVuYXZhaWxhYmxlOyB0cnkgbmV4dFxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0luaXRpYWxpemluZyA9ICEhYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIWlzSW5pdGlhbGl6aW5nKSB7XG4gICAgICAgICAgYmFja2VuZEluZm8uaW5pdFByb21pc2UgPSBiYWNrZW5kSW5mby5iYWNrZW5kLmluaXQoYmFja2VuZE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xuICAgICAgICBiYWNrZW5kSW5mby5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBiYWNrZW5kSW5mby5iYWNrZW5kO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoIWlzSW5pdGlhbGl6aW5nKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goe25hbWU6IGJhY2tlbmROYW1lLCBlcnI6IGV9KTtcbiAgICAgICAgfVxuICAgICAgICBiYWNrZW5kSW5mby5hYm9ydGVkID0gdHJ1ZTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGRlbGV0ZSBiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoYG5vIGF2YWlsYWJsZSBiYWNrZW5kIGZvdW5kLiBFUlI6ICR7ZXJyb3JzLm1hcChlID0+IGBbJHtlLm5hbWV9XSAke2UuZXJyfWApLmpvaW4oJywgJyl9YCk7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb259IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuaW1wb3J0IHtPbm54VmFsdWV9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5pbXBvcnQge1RyYWluaW5nU2Vzc2lvbn0gZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLmpzJztcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBTZXNzaW9uSGFuZGxlciB7XG4gIHR5cGUgRmVlZHNUeXBlID0ge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV9O1xuICB0eXBlIEZldGNoZXNUeXBlID0ge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsfTtcbiAgdHlwZSBSZXR1cm5UeXBlID0ge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV9O1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgc2hhcmVkIFNlc3Npb25IYW5kbGVyIGZ1bmN0aW9uYWxpdHlcbiAqXG4gKiBAaWdub3JlXG4gKi9cbmludGVyZmFjZSBTZXNzaW9uSGFuZGxlciB7XG4gIGRpc3Bvc2UoKTogUHJvbWlzZTx2b2lkPjtcblxuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIGhhbmRsZXIgaW5zdGFuY2Ugb2YgYW4gaW5mZXJlbmNlIHNlc3Npb24uXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xuICBlbmRQcm9maWxpbmcoKTogdm9pZDtcblxuICBydW4oZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSwgZmV0Y2hlczogU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGU+O1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIGhhbmRsZXIgaW5zdGFuY2Ugb2YgYSB0cmFpbmluZyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uSGFuZGxlciBleHRlbmRzIFNlc3Npb25IYW5kbGVyIHtcbiAgcmVhZG9ubHkgZXZhbElucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuICByZWFkb25seSBldmFsT3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIGxhenlSZXNldEdyYWQoKTogUHJvbWlzZTx2b2lkPjtcbiAgcnVuVHJhaW5TdGVwKFxuICAgICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSwgZmV0Y2hlczogU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGU+O1xuICBydW5PcHRpbWl6ZXJTdGVwKG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG4gIHJ1bkV2YWxTdGVwKFxuICAgICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSwgZmV0Y2hlczogU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGU+O1xuXG4gIGdldFBhcmFtZXRlcnNTaXplKHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPG51bWJlcj47XG4gIGxvYWRQYXJhbWV0ZXJzQnVmZmVyKGFycmF5OiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPjtcbiAgZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8T25ueFZhbHVlPjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBiYWNrZW5kIHRoYXQgcHJvdmlkZXMgaW1wbGVtZW50YXRpb24gb2YgbW9kZWwgaW5mZXJlbmNpbmcuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tlbmQge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmFja2VuZCBhc3luY2hyb25vdXNseS4gU2hvdWxkIHRocm93IHdoZW4gZmFpbGVkLlxuICAgKi9cbiAgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcblxuICBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcih1cmlPckJ1ZmZlcjogc3RyaW5nfFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xuXG4gIGNyZWF0ZVRyYWluaW5nU2Vzc2lvbkhhbmRsZXI/XG4gICAgICAoY2hlY2twb2ludFN0YXRlVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VUklvckJ1ZmZlciwgdHJhaW5Nb2RlbFVyaU9yQnVmZmVyOiBUcmFpbmluZ1Nlc3Npb24uVVJJb3JCdWZmZXIsXG4gICAgICAgZXZhbE1vZGVsVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VUklvckJ1ZmZlciwgb3B0aW1pemVyTW9kZWxVcmlPckJ1ZmZlcjogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyLFxuICAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbkhhbmRsZXI+O1xufVxuXG5leHBvcnQge3JlZ2lzdGVyQmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IC9qcy9zY3JpcHRzL3VwZGF0ZS12ZXJzaW9uLnRzXG4vLyBEbyBub3QgbW9kaWZ5IGZpbGUgY29udGVudCBtYW51YWxseS5cblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMS4xNy4wJztcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtFbnZ9IGZyb20gJy4vZW52LmpzJztcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAnLi92ZXJzaW9uLmpzJztcblxudHlwZSBMb2dMZXZlbFR5cGUgPSBFbnZbJ2xvZ0xldmVsJ107XG5cbmxldCBsb2dMZXZlbFZhbHVlOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+ID0gJ3dhcm5pbmcnO1xuXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSB7XG4gIHdhc206IHt9IGFzIEVudi5XZWJBc3NlbWJseUZsYWdzLFxuICB3ZWJnbDoge30gYXMgRW52LldlYkdMRmxhZ3MsXG4gIHdlYmdwdToge30gYXMgRW52LldlYkdwdUZsYWdzLFxuICB2ZXJzaW9uczoge2NvbW1vbjogdmVyc2lvbn0sXG5cbiAgc2V0IGxvZ0xldmVsKHZhbHVlOiBMb2dMZXZlbFR5cGUpIHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCBbJ3ZlcmJvc2UnLCAnaW5mbycsICd3YXJuaW5nJywgJ2Vycm9yJywgJ2ZhdGFsJ10uaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7dmFsdWV9YCk7XG4gICAgfVxuICAgIGxvZ0xldmVsVmFsdWUgPSB2YWx1ZTtcbiAgfSxcbiAgZ2V0IGxvZ0xldmVsKCk6IFJlcXVpcmVkPExvZ0xldmVsVHlwZT4ge1xuICAgIHJldHVybiBsb2dMZXZlbFZhbHVlO1xuICB9LFxufTtcblxuLy8gc2V0IHByb3BlcnR5ICdsb2dMZXZlbCcgc28gdGhhdCB0aGV5IGNhbiBiZSBjb3JyZWN0bHkgdHJhbnNmZXJyZWQgdG8gd29ya2VyIGJ5IGBwb3N0TWVzc2FnZSgpYC5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnYsICdsb2dMZXZlbCcsIHtlbnVtZXJhYmxlOiB0cnVlfSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7ZW52IGFzIGVudkltcGx9IGZyb20gJy4vZW52LWltcGwuanMnO1xuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgRW52IHtcbiAgZXhwb3J0IHR5cGUgV2FzbVByZWZpeE9yRmlsZVBhdGhzID0gc3RyaW5nfHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cbiAgICAnb3J0LXdhc20ud2FzbSc/OiBzdHJpbmc7XG4gICAgJ29ydC13YXNtLXRocmVhZGVkLndhc20nPzogc3RyaW5nO1xuICAgICdvcnQtd2FzbS1zaW1kLndhc20nPzogc3RyaW5nO1xuICAgICdvcnQtdHJhaW5pbmctd2FzbS1zaW1kLndhc20nPzogc3RyaW5nO1xuICAgICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLndhc20nPzogc3RyaW5nO1xuICAgIC8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG4gIH07XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViQXNzZW1ibHlGbGFncyB7XG4gICAgLyoqXG4gICAgICogc2V0IG9yIGdldCBudW1iZXIgb2YgdGhyZWFkKHMpLiBJZiBvbWl0dGVkIG9yIHNldCB0byAwLCBudW1iZXIgb2YgdGhyZWFkKHMpIHdpbGwgYmUgZGV0ZXJtaW5lZCBieSBzeXN0ZW0uIElmIHNldFxuICAgICAqIHRvIDEsIG5vIHdvcmtlciB0aHJlYWQgd2lsbCBiZSBzcGF3bmVkLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IHdoZW4gV2ViQXNzZW1ibHkgbXVsdGl0aHJlYWQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgMGBcbiAgICAgKi9cbiAgICBudW1UaHJlYWRzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogc2V0IG9yIGdldCBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIGVuYWJsZSBTSU1ELiBJZiBzZXQgdG8gZmFsc2UsIFNJTUQgd2lsbCBiZSBmb3JjZWx5IGRpc2FibGVkLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IHdoZW4gV2ViQXNzZW1ibHkgU0lNRCBmZWF0dXJlIGlzIGF2YWlsYWJsZSBpbiBjdXJyZW50IGNvbnRleHQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB0cnVlYFxuICAgICAqL1xuICAgIHNpbWQ/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogc2V0IG9yIGdldCBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIGVuYWJsZSB0cmFjZS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHRyYWNlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgYSBudW1iZXIgc3BlY2lmeWluZyB0aGUgdGltZW91dCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgV2ViQXNzZW1ibHkgYmFja2VuZCwgaW4gbWlsbGlzZWNvbmRzLiBBIHplcm9cbiAgICAgKiB2YWx1ZSBpbmRpY2F0ZXMgbm8gdGltZW91dCBpcyBzZXQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAwYFxuICAgICAqL1xuICAgIGluaXRUaW1lb3V0PzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU2V0IGEgY3VzdG9tIFVSTCBwcmVmaXggdG8gdGhlIC53YXNtIGZpbGVzIG9yIGEgc2V0IG9mIG92ZXJyaWRlcyBmb3IgZWFjaCAud2FzbSBmaWxlLiBUaGUgb3ZlcnJpZGUgcGF0aCBzaG91bGQgYmVcbiAgICAgKiBhbiBhYnNvbHV0ZSBwYXRoLlxuICAgICAqL1xuICAgIHdhc21QYXRocz86IFdhc21QcmVmaXhPckZpbGVQYXRocztcblxuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBwcm94eSB0aGUgZXhlY3V0aW9uIG9mIG1haW4gdGhyZWFkIHRvIGEgd29ya2VyIHRocmVhZC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHByb3h5PzogYm9vbGVhbjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xGbGFncyB7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgV2ViR0wgQ29udGV4dCBJRCAod2ViZ2wgb3Igd2ViZ2wyKS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCd3ZWJnbDInYFxuICAgICAqL1xuICAgIGNvbnRleHRJZD86ICd3ZWJnbCd8J3dlYmdsMic7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBXZWJHTCByZW5kZXJpbmcgY29udGV4dC5cbiAgICAgKi9cbiAgICByZWFkb25seSBjb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgbWF4aW11bSBiYXRjaCBzaXplIGZvciBtYXRtdWwuIDAgbWVhbnMgdG8gZGlzYWJsZSBiYXRjaGluZy5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgbWF0bXVsTWF4QmF0Y2hTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHRleHR1cmUgY2FjaGUgbW9kZS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCdmdWxsJ2BcbiAgICAgKi9cbiAgICB0ZXh0dXJlQ2FjaGVNb2RlPzogJ2luaXRpYWxpemVyT25seSd8J2Z1bGwnO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHBhY2tlZCB0ZXh0dXJlIG1vZGVcbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHBhY2s/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgd2hldGhlciBlbmFibGUgYXN5bmMgZG93bmxvYWQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBhc3luYz86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdVByb2ZpbGluZ0RhdGFWMVRlbnNvck1ldGFkYXRhIHtcbiAgICBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcbiAgICBkYXRhVHlwZTogc3RyaW5nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1UHJvZmlsaW5nRGF0YVYxIHtcbiAgICB2ZXJzaW9uOiAxO1xuICAgIGlucHV0c01ldGFkYXRhOiByZWFkb25seSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YVtdO1xuICAgIG91dHB1dHNNZXRhZGF0YTogcmVhZG9ubHkgV2ViR3B1UHJvZmlsaW5nRGF0YVYxVGVuc29yTWV0YWRhdGFbXTtcbiAgICBrZXJuZWxJZDogbnVtYmVyO1xuICAgIGtlcm5lbFR5cGU6IHN0cmluZztcbiAgICBrZXJuZWxOYW1lOiBzdHJpbmc7XG4gICAgc3RhcnRUaW1lOiBudW1iZXI7XG4gICAgZW5kVGltZTogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IHR5cGUgV2ViR3B1UHJvZmlsaW5nRGF0YSA9IFdlYkdwdVByb2ZpbGluZ0RhdGFWMTtcblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUZsYWdzIHtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgbW9kZS5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBgZW52LndlYmdwdS5wcm9maWxpbmcubW9kZWAgaW5zdGVhZC4gSWYgYGVudi53ZWJncHUucHJvZmlsaW5nLm1vZGVgIGlzIHNldCwgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlXG4gICAgICogaWdub3JlZC5cbiAgICAgKi9cbiAgICBwcm9maWxpbmdNb2RlPzogJ29mZid8J2RlZmF1bHQnO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHByb2ZpbGluZyBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIHByb2ZpbGluZz86IHtcbiAgICAgIC8qKlxuICAgICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXG4gICAgICAgKlxuICAgICAgICogQGRlZmF1bHRWYWx1ZSBgJ29mZidgXG4gICAgICAgKi9cbiAgICAgIG1vZGU/OiAnb2ZmJ3wnZGVmYXVsdCc7XG5cbiAgICAgIC8qKlxuICAgICAgICogU2V0IG9yIGdldCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gYSBwcm9maWxpbmcgZGF0YSBpcyByZWNlaXZlZC4gSWYgbm90IHNldCwgdGhlIHByb2ZpbGluZyBkYXRhIHdpbGwgYmVcbiAgICAgICAqIHByaW50ZWQgdG8gY29uc29sZS5cbiAgICAgICAqL1xuICAgICAgb25kYXRhPzogKGRhdGE6IFdlYkdwdVByb2ZpbGluZ0RhdGEpID0+IHZvaWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRldmljZSBmb3IgV2ViR1BVLlxuICAgICAqXG4gICAgICogV2hlbiB1c2Ugd2l0aCBUeXBlU2NyaXB0LCB0aGUgdHlwZSBvZiB0aGlzIHByb3BlcnR5IGlzIGBHUFVEZXZpY2VgIGRlZmluZWQgaW4gXCJAd2ViZ3B1L3R5cGVzXCIuXG4gICAgICogVXNlIGBjb25zdCBkZXZpY2UgPSBlbnYud2ViZ3B1LmRldmljZSBhcyBHUFVEZXZpY2U7YCBpbiBUeXBlU2NyaXB0IHRvIGFjY2VzcyB0aGlzIHByb3BlcnR5IHdpdGggY29ycmVjdCB0eXBlLlxuICAgICAqXG4gICAgICogc2VlIGNvbW1lbnRzIG9uIHtAbGluayBHcHVCdWZmZXJUeXBlfSBmb3IgbW9yZSBkZXRhaWxzIGFib3V0IHdoeSBub3QgdXNlIHR5cGVzIGRlZmluZWQgaW4gXCJAd2ViZ3B1L3R5cGVzXCIuXG4gICAgICovXG4gICAgcmVhZG9ubHkgZGV2aWNlOiB1bmtub3duO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgd2hldGhlciB2YWxpZGF0ZSBpbnB1dCBjb250ZW50LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICovXG4gICAgdmFsaWRhdGVJbnB1dENvbnRlbnQ/OiBib29sZWFuO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW52IHtcbiAgLyoqXG4gICAqIHNldCB0aGUgc2V2ZXJpdHkgbGV2ZWwgZm9yIGxvZ2dpbmcuXG4gICAqXG4gICAqIEBkZWZhdWx0VmFsdWUgYCd3YXJuaW5nJ2BcbiAgICovXG4gIGxvZ0xldmVsPzogJ3ZlcmJvc2UnfCdpbmZvJ3wnd2FybmluZyd8J2Vycm9yJ3wnZmF0YWwnO1xuICAvKipcbiAgICogSW5kaWNhdGUgd2hldGhlciBydW4gaW4gZGVidWcgbW9kZS5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAqL1xuICBkZWJ1Zz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEdldCB2ZXJzaW9uIG9mIHRoZSBjdXJyZW50IHBhY2thZ2UuXG4gICAqL1xuICByZWFkb25seSB2ZXJzaW9uczoge1xuICAgIHJlYWRvbmx5IGNvbW1vbjogc3RyaW5nO1xuICAgIHJlYWRvbmx5IHdlYj86IHN0cmluZztcbiAgICByZWFkb25seSBub2RlPzogc3RyaW5nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICByZWFkb25seSAncmVhY3QtbmF0aXZlJz86IHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJBc3NlbWJseVxuICAgKi9cbiAgcmVhZG9ubHkgd2FzbTogRW52LldlYkFzc2VtYmx5RmxhZ3M7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViR0xcbiAgICovXG4gIHJlYWRvbmx5IHdlYmdsOiBFbnYuV2ViR0xGbGFncztcblxuICAvKipcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJHUFVcbiAgICovXG4gIHJlYWRvbmx5IHdlYmdwdTogRW52LldlYkdwdUZsYWdzO1xuXG4gIFtuYW1lOiBzdHJpbmddOiB1bmtub3duO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBhcyBhIGdsb2JhbCBzaW5nbGV0b24uXG4gKi9cbmV4cG9ydCBjb25zdCBlbnY6IEVudiA9IGVudkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7VGVuc29yVG9EYXRhVXJsT3B0aW9ucywgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvRGF0YVVSTCgpXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JUb0RhdGFVUkwgPSAodGVuc29yOiBUZW5zb3IsIG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGNhbnZhcy53aWR0aCA9IHRlbnNvci5kaW1zWzNdO1xuICBjYW52YXMuaGVpZ2h0ID0gdGVuc29yLmRpbXNbMl07XG4gIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgIC8vIERlZmF1bHQgdmFsdWVzIGZvciBoZWlnaHQgYW5kIHdpZHRoICYgZm9ybWF0XG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XG4gICAgbGV0IGhlaWdodDogbnVtYmVyO1xuICAgIGlmIChvcHRpb25zPy50ZW5zb3JMYXlvdXQgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzJdO1xuICAgICAgaGVpZ2h0ID0gdGVuc29yLmRpbXNbM107XG4gICAgfSBlbHNlIHsgIC8vIERlZmF1bHQgbGF5b3V0IGlzIE5DV0hcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbM107XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dGZvcm1hdCA9IG9wdGlvbnM/LmZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5mb3JtYXQgOiAnUkdCJztcblxuICAgIGNvbnN0IG5vcm0gPSBvcHRpb25zPy5ub3JtO1xuICAgIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgbGV0IG5vcm1CaWFzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0ubWVhbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBub3JtTWVhbiA9IFsyNTUsIDI1NSwgMjU1LCAyNTVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIChub3JtLm1lYW4pID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuWzBdLCBub3JtLm1lYW5bMV0sIG5vcm0ubWVhblsyXSwgMF07XG4gICAgICAgIGlmIChub3JtLm1lYW5bM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1NZWFuWzNdID0gbm9ybS5tZWFuWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1CaWFzID0gWzAsIDAsIDAsIDBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIChub3JtLmJpYXMpID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1CaWFzWzNdID0gbm9ybS5iaWFzWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gICAgLy8gRGVmYXVsdCBwb2ludGVyIGFzc2lnbm1lbnRzXG4gICAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCwgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMiwgYVRlbnNvclBvaW50ZXIgPSAtMTtcblxuICAgIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBpbnB1dCBpbWFnZSBmb3JtYXRcbiAgICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQicpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdpZHRoOyBqKyspIHtcbiAgICAgICAgY29uc3QgUiA9ICgodGVuc29yLmRhdGFbclRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzBdKSAqIG5vcm1NZWFuWzBdOyAgLy8gUiB2YWx1ZVxuICAgICAgICBjb25zdCBHID0gKCh0ZW5zb3IuZGF0YVtnVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMV0pICogbm9ybU1lYW5bMV07ICAvLyBHIHZhbHVlXG4gICAgICAgIGNvbnN0IEIgPSAoKHRlbnNvci5kYXRhW2JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1syXSkgKiBub3JtTWVhblsyXTsgIC8vIEIgdmFsdWVcbiAgICAgICAgY29uc3QgQSA9IGFUZW5zb3JQb2ludGVyID09PSAtMSA/XG4gICAgICAgICAgICAyNTUgOlxuICAgICAgICAgICAgKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107ICAvLyBBIHZhbHVlXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvcmVzdHJpY3QtcGx1cy1vcGVyYW5kc1xuICAgICAgICBwaXhlbHMyRENvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoJyArIFIgKyAnLCcgKyBHICsgJywnICsgQiArICcsJyArIEEgKyAnKSc7XG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5maWxsUmVjdChqLCBpLCAxLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IudG9JbWFnZURhdGEoKVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVG9JbWFnZURhdGEgPSAodGVuc29yOiBUZW5zb3IsIG9wdGlvbnM/OiBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMpOiBJbWFnZURhdGEgPT4ge1xuICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpO1xuICBsZXQgaW1hZ2U6IEltYWdlRGF0YTtcbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IGNoYW5uZWxzOiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1sxXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbM107XG4gICAgfSBlbHNlIHsgIC8vIERlZmF1bHQgbGF5b3V0IGlzIE5DV0hcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbM107XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbMV07XG4gICAgfVxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgKG5vcm0ubWVhbikgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW5bMF0sIG5vcm0ubWVhblsxXSwgbm9ybS5tZWFuWzJdLCAyNTVdO1xuICAgICAgICBpZiAobm9ybS5tZWFuWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtTWVhblszXSA9IG5vcm0ubWVhblszXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0uYmlhcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBub3JtQmlhcyA9IFswLCAwLCAwLCAwXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiAobm9ybS5iaWFzKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xuICAgICAgICBpZiAobm9ybS5iaWFzWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtQmlhc1szXSA9IG5vcm0uYmlhc1szXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0cmlkZSA9IGhlaWdodCAqIHdpZHRoO1xuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvcHRpb25zLmZvcm1hdCAhPT0gdW5kZWZpbmVkICYmIChjaGFubmVscyA9PT0gNCAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQkEnKSB8fFxuICAgICAgICAgIChjaGFubmVscyA9PT0gMyAmJiAob3B0aW9ucy5mb3JtYXQgIT09ICdSR0InICYmIG9wdGlvbnMuZm9ybWF0ICE9PSAnQkdSJykpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIGZvcm1hdCBkb2VzblxcJ3QgbWF0Y2ggaW5wdXQgdGVuc29yIGRpbXMnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcbiAgICBjb25zdCBzdGVwID0gNDtcbiAgICBsZXQgckltYWdlUG9pbnRlciA9IDAsIGdJbWFnZVBvaW50ZXIgPSAxLCBiSW1hZ2VQb2ludGVyID0gMiwgYUltYWdlUG9pbnRlciA9IDM7XG4gICAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCwgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMiwgYVRlbnNvclBvaW50ZXIgPSAtMTtcblxuICAgIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBpbnB1dCBpbWFnZSBmb3JtYXRcbiAgICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQicpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9XG5cbiAgICBpbWFnZSA9IHBpeGVsczJEQ29udGV4dC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodCAqIHdpZHRoO1xuICAgICAgICAgckltYWdlUG9pbnRlciArPSBzdGVwLCBnSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYUltYWdlUG9pbnRlciArPSBzdGVwLCBpKyspIHtcbiAgICAgIGltYWdlLmRhdGFbckltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW3JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1swXSkgKiBub3JtTWVhblswXTsgIC8vIFIgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbZ0ltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgIC8vIEcgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbYkltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1syXSkgKiBub3JtTWVhblsyXTsgIC8vIEIgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbYUltYWdlUG9pbnRlcl0gPSBhVGVuc29yUG9pbnRlciA9PT0gLTEgP1xuICAgICAgICAgIDI1NSA6XG4gICAgICAgICAgKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107ICAvLyBBIHZhbHVlXG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbiAgcmV0dXJuIGltYWdlO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtPcHRpb25zRGltZW5zaW9ucywgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLCBPcHRpb25zVGVuc29yRm9ybWF0LCBPcHRpb25zVGVuc29yTGF5b3V0LCBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucywgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucywgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLCBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnMsIFRlbnNvckZyb21VcmxPcHRpb25zfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7VGVuc29yIGFzIFRlbnNvckludGVyZmFjZX0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG5pbnRlcmZhY2UgQnVmZmVyVG9UZW5zb3JPcHRpb25zIGV4dGVuZHMgT3B0aW9uc0RpbWVuc2lvbnMsIE9wdGlvbnNUZW5zb3JMYXlvdXQsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcHRpb25zRm9ybWF0LCBPcHRpb25zVGVuc29yRm9ybWF0IHt9XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSBpbWFnZSBvYmplY3RcbiAqXG4gKiBAcGFyYW0gYnVmZmVyIC0gRXh0cmFjdGVkIGltYWdlIGJ1ZmZlciBkYXRhIC0gYXNzdW1pbmcgUkdCQSBmb3JtYXRcbiAqIEBwYXJhbSBpbWFnZUZvcm1hdCAtIGlucHV0IGltYWdlIGNvbmZpZ3VyYXRpb24gLSByZXF1aXJlZCBjb25maWd1cmF0aW9ucyBoZWlnaHQsIHdpZHRoLCBmb3JtYXRcbiAqIEBwYXJhbSB0ZW5zb3JGb3JtYXQgLSBvdXRwdXQgdGVuc29yIGNvbmZpZ3VyYXRpb24gLSBEZWZhdWx0IGlzIFJHQiBmb3JtYXRcbiAqL1xuZXhwb3J0IGNvbnN0IGJ1ZmZlclRvVGVuc29yID0gKGJ1ZmZlcjogVWludDhDbGFtcGVkQXJyYXl8dW5kZWZpbmVkLCBvcHRpb25zOiBCdWZmZXJUb1RlbnNvck9wdGlvbnMpOiBUZW5zb3IgPT4ge1xuICBpZiAoYnVmZmVyID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGJ1ZmZlciBtdXN0IGJlIGRlZmluZWQnKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oZWlnaHQgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLndpZHRoID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGhlaWdodCBhbmQgd2lkdGggbXVzdCBiZSBkZWZpbmVkJyk7XG4gIH1cbiAgaWYgKG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05IV0MgVGVuc29yIGxheW91dCBpcyBub3Qgc3VwcG9ydGVkIHlldCcpO1xuICB9XG5cbiAgY29uc3Qge2hlaWdodCwgd2lkdGh9ID0gb3B0aW9ucztcblxuICBjb25zdCBub3JtID0gb3B0aW9ucy5ub3JtID8/IHttZWFuOiAyNTUsIGJpYXM6IDB9O1xuICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuXG4gIGlmICh0eXBlb2YgKG5vcm0ubWVhbikgPT09ICdudW1iZXInKSB7XG4gICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgfSBlbHNlIHtcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4hWzBdLCBub3JtLm1lYW4hWzFdLCBub3JtLm1lYW4hWzJdLCBub3JtLm1lYW4hWzNdID8/IDI1NV07XG4gIH1cblxuICBpZiAodHlwZW9mIChub3JtLmJpYXMpID09PSAnbnVtYmVyJykge1xuICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhc107XG4gIH0gZWxzZSB7XG4gICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzIVswXSwgbm9ybS5iaWFzIVsxXSwgbm9ybS5iaWFzIVsyXSwgbm9ybS5iaWFzIVszXSA/PyAwXTtcbiAgfVxuXG4gIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQkEnO1xuICAvLyBkZWZhdWx0IHZhbHVlIGlzIFJHQkEgc2luY2UgaW1hZ2VkYXRhIGFuZCBIVE1MSW1hZ2VFbGVtZW50IHVzZXMgaXRcblxuICBjb25zdCBvdXRwdXRmb3JtYXQgPVxuICAgICAgb3B0aW9ucy50ZW5zb3JGb3JtYXQgIT09IHVuZGVmaW5lZCA/IChvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy50ZW5zb3JGb3JtYXQgOiAnUkdCJykgOiAnUkdCJztcbiAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gIGNvbnN0IGZsb2F0MzJEYXRhID0gb3V0cHV0Zm9ybWF0ID09PSAnUkdCQScgPyBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDQpIDogbmV3IEZsb2F0MzJBcnJheShzdHJpZGUgKiAzKTtcblxuICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcbiAgbGV0IHN0ZXAgPSA0LCBySW1hZ2VQb2ludGVyID0gMCwgZ0ltYWdlUG9pbnRlciA9IDEsIGJJbWFnZVBvaW50ZXIgPSAyLCBhSW1hZ2VQb2ludGVyID0gMztcbiAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCwgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMiwgYVRlbnNvclBvaW50ZXIgPSAtMTtcblxuICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XG4gIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQicpIHtcbiAgICBzdGVwID0gMztcbiAgICBySW1hZ2VQb2ludGVyID0gMDtcbiAgICBnSW1hZ2VQb2ludGVyID0gMTtcbiAgICBiSW1hZ2VQb2ludGVyID0gMjtcbiAgICBhSW1hZ2VQb2ludGVyID0gLTE7XG4gIH1cblxuICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgb3V0cHV0IHRlbnNvciBmb3JtYXRcbiAgaWYgKG91dHB1dGZvcm1hdCA9PT0gJ1JHQkEnKSB7XG4gICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xuICB9IGVsc2UgaWYgKG91dHB1dGZvcm1hdCA9PT0gJ1JCRycpIHtcbiAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICB9IGVsc2UgaWYgKG91dHB1dGZvcm1hdCA9PT0gJ0JHUicpIHtcbiAgICBiVGVuc29yUG9pbnRlciA9IDA7XG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgclRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpZGU7XG4gICAgICAgaSsrLCBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXApIHtcbiAgICBmbG9hdDMyRGF0YVtyVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbckltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1swXSkgLyBub3JtTWVhblswXTtcbiAgICBmbG9hdDMyRGF0YVtnVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbZ0ltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1sxXSkgLyBub3JtTWVhblsxXTtcbiAgICBmbG9hdDMyRGF0YVtiVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbYkltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1syXSkgLyBub3JtTWVhblsyXTtcbiAgICBpZiAoYVRlbnNvclBvaW50ZXIgIT09IC0xICYmIGFJbWFnZVBvaW50ZXIgIT09IC0xKSB7XG4gICAgICBmbG9hdDMyRGF0YVthVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbYUltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1szXSkgLyBub3JtTWVhblszXTtcbiAgICB9XG4gIH1cblxuICAvLyBGbG9hdDMyQXJyYXkgLT4gb3J0LlRlbnNvclxuICBjb25zdCBvdXRwdXRUZW5zb3IgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBUZW5zb3IoJ2Zsb2F0MzInLCBmbG9hdDMyRGF0YSwgWzEsIDQsIGhlaWdodCwgd2lkdGhdKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgMywgaGVpZ2h0LCB3aWR0aF0pO1xuICByZXR1cm4gb3V0cHV0VGVuc29yO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUltYWdlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tSW1hZ2UgPSBhc3luYyhcbiAgICBpbWFnZTogSW1hZ2VEYXRhfEhUTUxJbWFnZUVsZW1lbnR8SW1hZ2VCaXRtYXB8c3RyaW5nLFxuICAgIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9uc3xUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9uc3xUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zfFxuICAgIFRlbnNvckZyb21VcmxPcHRpb25zKTogUHJvbWlzZTxUZW5zb3I+ID0+IHtcbiAgLy8gY2hlY2tpbmcgdGhlIHR5cGUgb2YgaW1hZ2Ugb2JqZWN0XG4gIGNvbnN0IGlzSFRNTEltYWdlRWxlID0gdHlwZW9mIChIVE1MSW1hZ2VFbGVtZW50KSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50O1xuICBjb25zdCBpc0ltYWdlRGF0YUVsZSA9IHR5cGVvZiAoSW1hZ2VEYXRhKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGE7XG4gIGNvbnN0IGlzSW1hZ2VCaXRtYXAgPSB0eXBlb2YgKEltYWdlQml0bWFwKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZUJpdG1hcDtcbiAgY29uc3QgaXNTdHJpbmcgPSB0eXBlb2YgaW1hZ2UgPT09ICdzdHJpbmcnO1xuXG4gIGxldCBkYXRhOiBVaW50OENsYW1wZWRBcnJheXx1bmRlZmluZWQ7XG4gIGxldCBidWZmZXJUb1RlbnNvck9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnMgPz8ge307XG5cbiAgLy8gZmlsbGluZyBhbmQgY2hlY2tpbmcgaW1hZ2UgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gIGlmIChpc0hUTUxJbWFnZUVsZSkge1xuICAgIC8vIEhUTUxJbWFnZUVsZW1lbnQgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgaXMgUkdCQSBieSBkZWZhdWx0XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgICAgbGV0IGhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgIGxldCB3aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRIZWlnaHQgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGhlaWdodCA9IG9wdGlvbnMucmVzaXplZEhlaWdodDtcbiAgICAgICAgd2lkdGggPSBvcHRpb25zLnJlc2l6ZWRXaWR0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICBpZiAob3B0aW9ucy50ZW5zb3JGb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgaW5wdXQgY29uZmlnIGZvcm1hdCBtdXN0IGJlIFJHQkEgZm9yIEhUTUxJbWFnZUVsZW1lbnQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMudGVuc29yRm9ybWF0ID0gJ1JHQkEnO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLnRlbnNvckZvcm1hdCA9ICdSR0JBJztcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG4gICAgICB9XG5cbiAgICAgIHBpeGVsczJEQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xuICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzSW1hZ2VEYXRhRWxlKSB7XG4gICAgbGV0IGhlaWdodDogbnVtYmVyO1xuICAgIGxldCB3aWR0aDogbnVtYmVyO1xuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRXaWR0aCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZEhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZWRIZWlnaHQ7XG4gICAgICB3aWR0aCA9IG9wdGlvbnMucmVzaXplZFdpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICB3aWR0aCA9IGltYWdlLndpZHRoO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5mb3JtYXQgPSAnUkdCQSc7XG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcblxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHRlbXBDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgdGVtcENhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgdGVtcENhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IHRlbXBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5wdXRJbWFnZURhdGEoaW1hZ2UsIDAsIDApO1xuICAgICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBpbWFnZS5kYXRhO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ltYWdlQml0bWFwKSB7XG4gICAgLy8gSW1hZ2VCaXRtYXAgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgbXVzdCBiZSBwcm92aWRlZCBieSB1c2VyXG4gICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBpbWFnZSBjb25maWcgd2l0aCBmb3JtYXQgZm9yIEltYWdlYml0bWFwJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgY29uc3Qgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgIHBpeGVsczJEQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIHJldHVybiBidWZmZXJUb1RlbnNvcihkYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNTdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBpZiAoIWltYWdlIHx8ICFjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiByZWplY3QoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld0ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICBuZXdJbWFnZS5jcm9zc09yaWdpbiA9ICdBbm9ueW1vdXMnO1xuICAgICAgbmV3SW1hZ2Uuc3JjID0gaW1hZ2U7XG4gICAgICBuZXdJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IG5ld0ltYWdlLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gbmV3SW1hZ2UuaGVpZ2h0O1xuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShuZXdJbWFnZSwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY29uc3QgaW1nID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gY2FudmFzLndpZHRoO1xuICAgICAgICByZXNvbHZlKGJ1ZmZlclRvVGVuc29yKGltZy5kYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBkYXRhIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWQgLSBhYm9ydGVkIHRlbnNvciBjcmVhdGlvbicpO1xuICB9XG5cbiAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBidWZmZXJUb1RlbnNvcihkYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgZGF0YSBwcm92aWRlZCBpcyBub3Qgc3VwcG9ydGVkIC0gYWJvcnRlZCB0ZW5zb3IgY3JlYXRpb24nKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbVRleHR1cmUoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21UZXh0dXJlID0gPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZURhdGFUeXBlcz4oXG4gICAgdGV4dHVyZTogVGVuc29ySW50ZXJmYWNlLlRleHR1cmVUeXBlLCBvcHRpb25zOiBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VD4pOiBUZW5zb3IgPT4ge1xuICBjb25zdCB7d2lkdGgsIGhlaWdodCwgZG93bmxvYWQsIGRpc3Bvc2V9ID0gb3B0aW9ucztcbiAgLy8gQWx3YXlzIGFzc3VtZSBSR0JBRjMyLiBUT0RPOiBzdXBwb3J0IGRpZmZlcmVudCB0ZXh0dXJlIGZvcm1hdFxuICBjb25zdCBkaW1zID0gWzEsIGhlaWdodCwgd2lkdGgsIDRdO1xuICByZXR1cm4gbmV3IFRlbnNvcih7bG9jYXRpb246ICd0ZXh0dXJlJywgdHlwZTogJ2Zsb2F0MzInLCB0ZXh0dXJlLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZX0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcigpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbUdwdUJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gICAgZ3B1QnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyVHlwZSwgb3B0aW9uczogVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VD4pOiBUZW5zb3IgPT4ge1xuICBjb25zdCB7ZGF0YVR5cGUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlfSA9IG9wdGlvbnM7XG4gIHJldHVybiBuZXcgVGVuc29yKHtsb2NhdGlvbjogJ2dwdS1idWZmZXInLCB0eXBlOiBkYXRhVHlwZSA/PyAnZmxvYXQzMicsIGdwdUJ1ZmZlciwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2V9KTtcbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21QaW5uZWRCdWZmZXIoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21QaW5uZWRCdWZmZXIgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxuICAgIHR5cGU6IFQsIGJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlTWFwW1RdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3IgPT5cbiAgICBuZXcgVGVuc29yKHtsb2NhdGlvbjogJ2NwdS1waW5uZWQnLCB0eXBlLCBkYXRhOiBidWZmZXIsIGRpbXM6IGRpbXMgPz8gW2J1ZmZlci5sZW5ndGhdfSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPSBGbG9hdDMyQXJyYXlDb25zdHJ1Y3RvcnxVaW50OEFycmF5Q29uc3RydWN0b3J8SW50OEFycmF5Q29uc3RydWN0b3J8XG4gICAgVWludDE2QXJyYXlDb25zdHJ1Y3RvcnxJbnQxNkFycmF5Q29uc3RydWN0b3J8SW50MzJBcnJheUNvbnN0cnVjdG9yfEJpZ0ludDY0QXJyYXlDb25zdHJ1Y3RvcnxVaW50OEFycmF5Q29uc3RydWN0b3J8XG4gICAgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3J8VWludDMyQXJyYXlDb25zdHJ1Y3RvcnxCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yO1xuZXhwb3J0IHR5cGUgU3VwcG9ydGVkVHlwZWRBcnJheSA9IEluc3RhbmNlVHlwZTxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzPjtcblxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQID0gbmV3IE1hcDxzdHJpbmcsIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnM+KFtcbiAgWydmbG9hdDMyJywgRmxvYXQzMkFycmF5XSxcbiAgWyd1aW50OCcsIFVpbnQ4QXJyYXldLFxuICBbJ2ludDgnLCBJbnQ4QXJyYXldLFxuICBbJ3VpbnQxNicsIFVpbnQxNkFycmF5XSxcbiAgWydmbG9hdDE2JywgVWludDE2QXJyYXldLFxuICBbJ2ludDE2JywgSW50MTZBcnJheV0sXG4gIFsnaW50MzInLCBJbnQzMkFycmF5XSxcbiAgWydib29sJywgVWludDhBcnJheV0sXG4gIFsnZmxvYXQ2NCcsIEZsb2F0NjRBcnJheV0sXG4gIFsndWludDMyJywgVWludDMyQXJyYXldLFxuXSk7XG5cbi8vIGEgcnVudGltZSBtYXAgdGhhdCBtYXBzIHR5cGUgc3RyaW5nIHRvIFR5cGVkQXJyYXkgY29uc3RydWN0b3IuIFNob3VsZCBtYXRjaCBUZW5zb3IuRGF0YVR5cGVNYXAuXG5leHBvcnQgY29uc3QgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCA9IG5ldyBNYXA8U3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycywgVGVuc29yLlR5cGU+KFtcbiAgW0Zsb2F0MzJBcnJheSwgJ2Zsb2F0MzInXSxcbiAgW1VpbnQ4QXJyYXksICd1aW50OCddLFxuICBbSW50OEFycmF5LCAnaW50OCddLFxuICBbVWludDE2QXJyYXksICd1aW50MTYnXSxcbiAgW0ludDE2QXJyYXksICdpbnQxNiddLFxuICBbSW50MzJBcnJheSwgJ2ludDMyJ10sXG4gIFtGbG9hdDY0QXJyYXksICdmbG9hdDY0J10sXG4gIFtVaW50MzJBcnJheSwgJ3VpbnQzMiddLFxuXSk7XG5cbi8vIHRoZSBmb2xsb3dpbmcgY29kZSBhbGxvd3MgZGVsYXlpbmcgZXhlY3V0aW9uIG9mIEJpZ0ludCBjaGVja2luZy4gVGhpcyBhbGxvd3MgbGF6eSBpbml0aWFsaXphdGlvbiBmb3Jcbi8vIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgYW5kIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIHdoaWNoIGFsbG93cyBCaWdJbnQgcG9seWZpbGxcbi8vIGlmIGF2YWlsYWJsZS5cbmxldCBpc0JpZ0ludENoZWNrZWQgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBjaGVja0JpZ0ludCA9ICgpID0+IHtcbiAgaWYgKCFpc0JpZ0ludENoZWNrZWQpIHtcbiAgICBpc0JpZ0ludENoZWNrZWQgPSB0cnVlO1xuICAgIGNvbnN0IGlzQmlnSW50NjRBcnJheUF2YWlsYWJsZSA9IHR5cGVvZiBCaWdJbnQ2NEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQmlnSW50NjRBcnJheS5mcm9tID09PSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IGlzQmlnVWludDY0QXJyYXlBdmFpbGFibGUgPVxuICAgICAgICB0eXBlb2YgQmlnVWludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBCaWdVaW50NjRBcnJheS5mcm9tID09PSAnZnVuY3Rpb24nO1xuXG4gICAgaWYgKGlzQmlnSW50NjRBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ2ludDY0JywgQmlnSW50NjRBcnJheSk7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLnNldChCaWdJbnQ2NEFycmF5LCAnaW50NjQnKTtcbiAgICB9XG4gICAgaWYgKGlzQmlnVWludDY0QXJyYXlBdmFpbGFibGUpIHtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuc2V0KCd1aW50NjQnLCBCaWdVaW50NjRBcnJheSk7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLnNldChCaWdVaW50NjRBcnJheSwgJ3VpbnQ2NCcpO1xuICAgIH1cbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMsIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycywgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc30gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnLi90ZW5zb3ItaW1wbC5qcyc7XG5cbi8qKlxuICogY2FsY3VsYXRlIHNpemUgZnJvbSBkaW1zLlxuICpcbiAqIEBwYXJhbSBkaW1zIHRoZSBkaW1zIGFycmF5LiBNYXkgYmUgYW4gaWxsZWdhbCBpbnB1dC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVNpemUgPSAoZGltczogcmVhZG9ubHkgdW5rbm93bltdKTogbnVtYmVyID0+IHtcbiAgbGV0IHNpemUgPSAxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBkaW0gPSBkaW1zW2ldO1xuICAgIGlmICh0eXBlb2YgZGltICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzU2FmZUludGVnZXIoZGltKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgZGltc1ske2l9XSBtdXN0IGJlIGFuIGludGVnZXIsIGdvdDogJHtkaW19YCk7XG4gICAgfVxuICAgIGlmIChkaW0gPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgZGltc1ske2l9XSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIsIGdvdDogJHtkaW19YCk7XG4gICAgfVxuICAgIHNpemUgKj0gZGltO1xuICB9XG4gIHJldHVybiBzaXplO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IucmVzaGFwZSgpXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JSZXNoYXBlID0gKHRlbnNvcjogVGVuc29yLCBkaW1zOiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvciA9PiB7XG4gIHN3aXRjaCAodGVuc29yLmxvY2F0aW9uKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHRlbnNvci50eXBlLCB0ZW5zb3IuZGF0YSwgZGltcyk7XG4gICAgY2FzZSAnY3B1LXBpbm5lZCc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAnY3B1LXBpbm5lZCcsXG4gICAgICAgIGRhdGE6IHRlbnNvci5kYXRhIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1snZGF0YSddLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGNhc2UgJ3RleHR1cmUnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3Ioe1xuICAgICAgICBsb2NhdGlvbjogJ3RleHR1cmUnLFxuICAgICAgICB0ZXh0dXJlOiB0ZW5zb3IudGV4dHVyZSxcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAnZ3B1LWJ1ZmZlcicsXG4gICAgICAgIGdwdUJ1ZmZlcjogdGVuc29yLmdwdUJ1ZmZlcixcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXG4gICAgICAgIGRpbXMsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0ZW5zb3JSZXNoYXBlOiB0ZW5zb3IgbG9jYXRpb24gJHt0ZW5zb3IubG9jYXRpb259IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHt0ZW5zb3JUb0RhdGFVUkwsIHRlbnNvclRvSW1hZ2VEYXRhfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLWltcGwuanMnO1xuaW1wb3J0IHtUZW5zb3JUb0RhdGFVcmxPcHRpb25zLCBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnN9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xuaW1wb3J0IHt0ZW5zb3JGcm9tR3B1QnVmZmVyLCB0ZW5zb3JGcm9tSW1hZ2UsIHRlbnNvckZyb21QaW5uZWRCdWZmZXIsIHRlbnNvckZyb21UZXh0dXJlfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LWltcGwuanMnO1xuaW1wb3J0IHtDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMsIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycywgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnMsIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucywgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zLCBUZW5zb3JGcm9tVXJsT3B0aW9ucywgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc30gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQge2NoZWNrQmlnSW50LCBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLCBTdXBwb3J0ZWRUeXBlZEFycmF5LCBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzfSBmcm9tICcuL3RlbnNvci1pbXBsLXR5cGUtbWFwcGluZy5qcyc7XG5pbXBvcnQge2NhbGN1bGF0ZVNpemUsIHRlbnNvclJlc2hhcGV9IGZyb20gJy4vdGVuc29yLXV0aWxzLWltcGwuanMnO1xuaW1wb3J0IHtUZW5zb3IgYXMgVGVuc29ySW50ZXJmYWNlfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbi8vIHR5cGUgYWxpYXNlcyBmb3IgdGhvc2UgZXhwb3J0ZWQgZnJvbSBUZW5zb3IgaW50ZXJmYWNlXG5cbnR5cGUgVGVuc29yVHlwZSA9IFRlbnNvckludGVyZmFjZS5UeXBlO1xudHlwZSBUZW5zb3JEYXRhVHlwZSA9IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZTtcbnR5cGUgVGVuc29yRGF0YUxvY2F0aW9uID0gVGVuc29ySW50ZXJmYWNlLkRhdGFMb2NhdGlvbjtcbnR5cGUgVGVuc29yVGV4dHVyZVR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGU7XG50eXBlIFRlbnNvckdwdUJ1ZmZlclR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyVHlwZTtcblxuLyoqXG4gKiB0aGUgaW1wbGVtZW50YXRpb24gb2YgVGVuc29yIGludGVyZmFjZS5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBUZW5zb3IgaW1wbGVtZW50cyBUZW5zb3JJbnRlcmZhY2Uge1xuICAvLyAjcmVnaW9uIGNvbnN0cnVjdG9yc1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgQ1BVIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgdHlwZTogVGVuc29yVHlwZSwgZGF0YTogVGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgYm9vbGVhbltdLFxuICAgICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLiBUeXBlIGlzIGluZmVycmVkIGZyb20gZGF0YS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFRlbnNvckRhdGFUeXBlfHJlYWRvbmx5IHN0cmluZ1tdfHJlYWRvbmx5IGJvb2xlYW5bXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIHBpbm5lZCBDUFUgZGF0YSB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnY3B1LXBpbm5lZCcuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgV2ViR0wgdGV4dHVyZSB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAndGV4dHVyZScuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIFdlYkdQVSBidWZmZXIgd2l0aCB0aGUgZ2l2ZW4gdHlwZSBhbmQgZGltcy5cbiAgICpcbiAgICogVGVuc29yJ3MgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ2dwdS1idWZmZXInLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcblxuICAvKipcbiAgICogaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIGFyZzA6IFRlbnNvclR5cGV8VGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYm9vbGVhbltdfENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc3xcbiAgICAgIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnN8R3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICAgICAgYXJnMT86IFRlbnNvckRhdGFUeXBlfHJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IHN0cmluZ1tdfHJlYWRvbmx5IGJvb2xlYW5bXSwgYXJnMj86IHJlYWRvbmx5IG51bWJlcltdKSB7XG4gICAgLy8gcGVyZm9ybSBvbmUtdGltZSBjaGVjayBmb3IgQmlnSW50IHN1cHBvcnRcbiAgICBjaGVja0JpZ0ludCgpO1xuXG4gICAgbGV0IHR5cGU6IFRlbnNvclR5cGU7XG4gICAgbGV0IGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xuXG4gICAgaWYgKHR5cGVvZiBhcmcwID09PSAnb2JqZWN0JyAmJiAnbG9jYXRpb24nIGluIGFyZzApIHtcbiAgICAgIC8vXG4gICAgICAvLyBjb25zdHJ1Y3RpbmcgdGVuc29yIGZyb20gc3BlY2lmaWMgbG9jYXRpb25cbiAgICAgIC8vXG4gICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9IGFyZzAubG9jYXRpb247XG4gICAgICB0eXBlID0gYXJnMC50eXBlO1xuICAgICAgZGltcyA9IGFyZzAuZGltcztcbiAgICAgIHN3aXRjaCAoYXJnMC5sb2NhdGlvbikge1xuICAgICAgICBjYXNlICdjcHUtcGlubmVkJzoge1xuICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5nZXQodHlwZSk7XG4gICAgICAgICAgaWYgKCFleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gcGlubmVkIGJ1ZmZlcmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIShhcmcwLmRhdGEgaW5zdGFuY2VvZiBleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGJ1ZmZlciBzaG91bGQgYmUgb2YgdHlwZSAke2V4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yLm5hbWV9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY3B1RGF0YSA9IGFyZzAuZGF0YTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd0ZXh0dXJlJzoge1xuICAgICAgICAgIGlmICh0eXBlICE9PSAnZmxvYXQzMicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIHRleHR1cmVgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ncHVUZXh0dXJlRGF0YSA9IGFyZzAudGV4dHVyZTtcbiAgICAgICAgICB0aGlzLmRvd25sb2FkZXIgPSBhcmcwLmRvd25sb2FkO1xuICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSBhcmcwLmRpc3Bvc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnZ3B1LWJ1ZmZlcic6IHtcbiAgICAgICAgICBpZiAoKHR5cGUgIT09ICdmbG9hdDMyJyAmJiB0eXBlICE9PSAnZmxvYXQxNicgJiYgdHlwZSAhPT0gJ2ludDMyJyAmJiB0eXBlICE9PSAnaW50NjQnICYmIHR5cGUgIT09ICd1aW50MzInICYmXG4gICAgICAgICAgICAgICB0eXBlICE9PSAnYm9vbCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBncHUgYnVmZmVyYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IGFyZzAuZ3B1QnVmZmVyO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XG4gICAgICAgICAgdGhpcy5kaXNwb3NlciA9IGFyZzAuZGlzcG9zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yIGNvbnN0cnVjdG9yOiB1bnN1cHBvcnRlZCBsb2NhdGlvbiAnJHt0aGlzLmRhdGFMb2NhdGlvbn0nYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vXG4gICAgICAvLyBjb25zdHJ1Y3RpbmcgdGVuc29yIG9mIGxvY2F0aW9uICdjcHUnXG4gICAgICAvL1xuICAgICAgbGV0IGRhdGE6IFRlbnNvckRhdGFUeXBlO1xuICAgICAgbGV0IG1heWJlRGltczogdHlwZW9mIGFyZzF8dHlwZW9mIGFyZzI7XG4gICAgICAvLyBjaGVjayB3aGV0aGVyIGFyZzAgaXMgdHlwZSBvciBkYXRhXG4gICAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIE92ZXJyaWRlOiBjb25zdHJ1Y3Rvcih0eXBlLCBkYXRhLCAuLi4pXG4gICAgICAgIC8vXG4gICAgICAgIHR5cGUgPSBhcmcwO1xuICAgICAgICBtYXliZURpbXMgPSBhcmcyO1xuICAgICAgICBpZiAoYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHN0cmluZyB0ZW5zb3JcXCdzIGRhdGEgbXVzdCBiZSBhIHN0cmluZyBhcnJheS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2UgZG9uJ3QgY2hlY2sgd2hldGhlciBldmVyeSBlbGVtZW50IGluIHRoZSBhcnJheSBpcyBzdHJpbmc7IHRoaXMgaXMgdG9vIHNsb3cuIHdlIGFzc3VtZSBpdCdzIGNvcnJlY3QgYW5kXG4gICAgICAgICAgLy8gZXJyb3Igd2lsbCBiZSBwb3B1bGF0ZWQgYXQgaW5mZXJlbmNlXG4gICAgICAgICAgZGF0YSA9IGFyZzE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbnVtZXJpYyB0ZW5zb3JcbiAgICAgICAgICBjb25zdCB0eXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldChhcmcwKTtcbiAgICAgICAgICBpZiAodHlwZWRBcnJheUNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuc3VwcG9ydGVkIHRlbnNvciB0eXBlOiAke2FyZzB9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICAgICAgaWYgKGFyZzAgPT09ICdmbG9hdDE2Jykge1xuICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBoZXJlIGJlY2F1c2Ugd2hlbiB1c2VyIHRyeSB0byB1c2UgbnVtYmVyIGFycmF5IGFzIGRhdGEsXG4gICAgICAgICAgICAgIC8vIGUuZy4gbmV3IFRlbnNvcignZmxvYXQxNicsIFsxLCAyLCAzLCA0XSwgZGltcykpLCBpdCB3aWxsIGFjdHVhbGx5IGNhbGxcbiAgICAgICAgICAgICAgLy8gVWludDE2QXJyYXkuZnJvbShhcmcxKSB3aGljaCBnZW5lcmF0ZXMgd3JvbmcgZGF0YS5cbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgICAgICdDcmVhdGluZyBhIGZsb2F0MTYgdGVuc29yIGZyb20gbnVtYmVyIGFycmF5IGlzIG5vdCBzdXBwb3J0ZWQuIFBsZWFzZSB1c2UgVWludDE2QXJyYXkgYXMgZGF0YS4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMCA9PT0gJ3VpbnQ2NCcgfHwgYXJnMCA9PT0gJ2ludDY0Jykge1xuICAgICAgICAgICAgICAvLyB1c2UgJ2FzIGFueScgaGVyZSBiZWNhdXNlOlxuICAgICAgICAgICAgICAvLyAxLiBUeXBlU2NyaXB0J3MgY2hlY2sgb24gdHlwZSBvZiAnQXJyYXkuaXNBcnJheSgpJyBkb2VzIG5vdCB3b3JrIHdpdGggcmVhZG9ubHkgYXJyYXlzLlxuICAgICAgICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xNzAwMlxuICAgICAgICAgICAgICAvLyAyLiBUeXBlU2NyaXB0J3MgY2hlY2sgb24gdW5pb24gdHlwZSBvZiAnKEJpZ0ludDY0QXJyYXlDb25zdHJ1Y3RvcnxCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yKS5mcm9tKCknXG4gICAgICAgICAgICAgIC8vIGRvZXMgbm90IGFjY2VwdCBwYXJhbWV0ZXIgbWFwRm4uXG4gICAgICAgICAgICAgIC8vIDMuIHBhcmFtZXRlcnMgb2YgJ1N1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMuZnJvbSgpJyBkb2VzIG5vdCBtYXRjaCB0aGUgcmVxdWlyZW1lbnQgb2YgdGhlIHVuaW9uXG4gICAgICAgICAgICAgIC8vIHR5cGUuXG5cbiAgICAgICAgICAgICAgLy8gYXNzdW1lICdhcmcxJyBpcyBvZiB0eXBlIFwicmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgYmlnaW50W11cIiBoZXJlLlxuXG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgIGRhdGEgPSAodHlwZWRBcnJheUNvbnN0cnVjdG9yIGFzIGFueSkuZnJvbShhcmcxLCBCaWdJbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gYXNzdW1lICdhcmcxJyBpcyBvZiB0eXBlIFwicmVhZG9ubHkgbnVtYmVyW11cIiBoZXJlLlxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICBkYXRhID0gKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciBhcyBhbnkpLmZyb20oYXJnMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcxIGluc3RhbmNlb2YgdHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICBkYXRhID0gYXJnMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQSAke3R5cGV9IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mICR7dHlwZWRBcnJheUNvbnN0cnVjdG9yfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gT3ZlcnJpZGU6IGNvbnN0cnVjdG9yKGRhdGEsIC4uLilcbiAgICAgICAgLy9cbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMCkpIHtcbiAgICAgICAgICAvLyBvbmx5IGJvb2xlYW5bXSBhbmQgc3RyaW5nW10gaXMgc3VwcG9ydGVkXG4gICAgICAgICAgaWYgKGFyZzAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUZW5zb3IgdHlwZSBjYW5ub3QgYmUgaW5mZXJyZWQgZnJvbSBhbiBlbXB0eSBhcnJheS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZmlyc3RFbGVtZW50VHlwZSA9IHR5cGVvZiBhcmcwWzBdO1xuICAgICAgICAgIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdHlwZSA9ICdzdHJpbmcnO1xuICAgICAgICAgICAgZGF0YSA9IGFyZzA7XG4gICAgICAgICAgfSBlbHNlIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnYm9vbCc7XG4gICAgICAgICAgICAvLyAnYXJnMCcgaXMgb2YgdHlwZSAnYm9vbGVhbltdJy4gVWludDhBcnJheS5mcm9tKGJvb2xlYW5bXSkgYWN0dWFsbHkgd29ya3MsIGJ1dCB0eXBlc2NyaXB0IHRoaW5rcyB0aGlzIGlzXG4gICAgICAgICAgICAvLyB3cm9uZyB0eXBlLiBXZSB1c2UgJ2FzIGFueScgdG8gbWFrZSBpdCBoYXBweS5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzAgYXMgYW55W10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGVsZW1lbnQgdHlwZSBvZiBkYXRhIGFycmF5OiAke2ZpcnN0RWxlbWVudFR5cGV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBnZXQgdGVuc29yIHR5cGUgZnJvbSBUeXBlZEFycmF5XG4gICAgICAgICAgY29uc3QgbWFwcGVkVHlwZSA9XG4gICAgICAgICAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuZ2V0KGFyZzAuY29uc3RydWN0b3IgYXMgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyk7XG4gICAgICAgICAgaWYgKG1hcHBlZFR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5zdXBwb3J0ZWQgdHlwZSBmb3IgdGVuc29yIGRhdGE6ICR7YXJnMC5jb25zdHJ1Y3Rvcn0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHR5cGUgPSBtYXBwZWRUeXBlO1xuICAgICAgICAgIGRhdGEgPSBhcmcwIGFzIFN1cHBvcnRlZFR5cGVkQXJyYXk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdHlwZSBhbmQgZGF0YSBpcyBwcm9jZXNzZWQsIG5vdyBwcm9jZXNzaW5nIGRpbXNcbiAgICAgIGlmIChtYXliZURpbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBhc3N1bWUgMS1EIHRlbnNvciBpZiBkaW1zIG9taXR0ZWRcbiAgICAgICAgbWF5YmVEaW1zID0gW2RhdGEubGVuZ3RoXTtcbiAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWF5YmVEaW1zKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHRlbnNvclxcJ3MgZGltcyBtdXN0IGJlIGEgbnVtYmVyIGFycmF5Jyk7XG4gICAgICB9XG4gICAgICBkaW1zID0gbWF5YmVEaW1zIGFzIHJlYWRvbmx5IG51bWJlcltdO1xuXG4gICAgICB0aGlzLmNwdURhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnY3B1JztcbiAgICB9XG5cbiAgICAvLyBwZXJmb3JtIGNoZWNrIG9uIGRpbXNcbiAgICBjb25zdCBzaXplID0gY2FsY3VsYXRlU2l6ZShkaW1zKTtcbiAgICAvLyBpZiBkYXRhIGlzIG9uIENQVSwgY2hlY2sgd2hldGhlciBkYXRhIGxlbmd0aCBtYXRjaGVzIHRlbnNvciBzaXplXG4gICAgaWYgKHRoaXMuY3B1RGF0YSAmJiBzaXplICE9PSB0aGlzLmNwdURhdGEubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbnNvcidzIHNpemUoJHtzaXplfSkgZG9lcyBub3QgbWF0Y2ggZGF0YSBsZW5ndGgoJHt0aGlzLmNwdURhdGEubGVuZ3RofSkuYCk7XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmRpbXMgPSBkaW1zO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gZmFjdG9yeVxuICBzdGF0aWMgYXN5bmMgZnJvbUltYWdlKFxuICAgICAgaW1hZ2U6IEltYWdlRGF0YXxIVE1MSW1hZ2VFbGVtZW50fEltYWdlQml0bWFwfHN0cmluZyxcbiAgICAgIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9uc3xUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9uc3xUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zfFxuICAgICAgVGVuc29yRnJvbVVybE9wdGlvbnMpOiBQcm9taXNlPFRlbnNvckludGVyZmFjZT4ge1xuICAgIHJldHVybiB0ZW5zb3JGcm9tSW1hZ2UoaW1hZ2UsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21UZXh0dXJlPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZURhdGFUeXBlcz4oXG4gICAgICB0ZXh0dXJlOiBUZW5zb3JUZXh0dXJlVHlwZSwgb3B0aW9uczogVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQ+KTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbVRleHR1cmUodGV4dHVyZSwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUdwdUJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gICAgICBncHVCdWZmZXI6IFRlbnNvckdwdUJ1ZmZlclR5cGUsIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+KTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbUdwdUJ1ZmZlcihncHVCdWZmZXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21QaW5uZWRCdWZmZXI8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxuICAgICAgdHlwZTogVCwgYnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuRGF0YVR5cGVNYXBbVF0sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvciB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21QaW5uZWRCdWZmZXIodHlwZSwgYnVmZmVyLCBkaW1zKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGNvbnZlcnNpb25zXG4gIHRvRGF0YVVSTChvcHRpb25zPzogVGVuc29yVG9EYXRhVXJsT3B0aW9ucyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRlbnNvclRvRGF0YVVSTCh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHRvSW1hZ2VEYXRhKG9wdGlvbnM/OiBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMpOiBJbWFnZURhdGEge1xuICAgIHJldHVybiB0ZW5zb3JUb0ltYWdlRGF0YSh0aGlzLCBvcHRpb25zKTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwdWJsaWMgZmllbGRzXG4gIHJlYWRvbmx5IGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xuICByZWFkb25seSB0eXBlOiBUZW5zb3JUeXBlO1xuICByZWFkb25seSBzaXplOiBudW1iZXI7XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHByaXZhdGUgZmllbGRzXG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXG4gICAqL1xuICBwcml2YXRlIGRhdGFMb2NhdGlvbjogVGVuc29yRGF0YUxvY2F0aW9uO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIGRhdGEgb24gQ1BVLCBpZiBsb2NhdGlvbiBpcyAnY3B1JyBvciAnY3B1LXBpbm5lZCcuIG90aGVyd2lzZSBlbXB0eS5cbiAgICovXG4gIHByaXZhdGUgY3B1RGF0YT86IFRlbnNvckRhdGFUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgdGV4dHVyZSB3aGVuIGxvY2F0aW9uIGlzICd0ZXh0dXJlJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBncHVUZXh0dXJlRGF0YT86IFRlbnNvclRleHR1cmVUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgR1BVIGJ1ZmZlciB3aGVuIGxvY2F0aW9uIGlzICdncHUtYnVmZmVyJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBncHVCdWZmZXJEYXRhPzogVGVuc29yR3B1QnVmZmVyVHlwZTtcblxuICAvKipcbiAgICogc3RvcmVzIGFuIG9wdGlvbmFsIGRvd25sb2FkZXIgZnVuY3Rpb24gdG8gZG93bmxvYWQgZGF0YSBmcm9tIEdQVSB0byBDUFUuXG4gICAqL1xuICBwcml2YXRlIGRvd25sb2FkZXI/KCk6IFByb21pc2U8VGVuc29yRGF0YVR5cGU+O1xuXG4gIC8qKlxuICAgKiBhIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBkYXRhIGlzIGJlaW5nIGRvd25sb2FkZWQgZnJvbSBHUFUgdG8gQ1BVLlxuICAgKi9cbiAgcHJpdmF0ZSBpc0Rvd25sb2FkaW5nPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogc3RvcmVzIGFuIG9wdGlvbmFsIGRpc3Bvc2VyIGZ1bmN0aW9uIHRvIGRpc3Bvc2UgdGhlIHVuZGVybHlpbmcgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgZGlzcG9zZXI/KCk6IHZvaWQ7XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHByb3BlcnRpZXNcbiAgZ2V0IGRhdGEoKTogVGVuc29yRGF0YVR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuY3B1RGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdUaGUgZGF0YSBpcyBub3Qgb24gQ1BVLiBVc2UgYGdldERhdGEoKWAgdG8gZG93bmxvYWQgR1BVIGRhdGEgdG8gQ1BVLCAnICtcbiAgICAgICAgICAnb3IgdXNlIGB0ZXh0dXJlYCBvciBgZ3B1QnVmZmVyYCBwcm9wZXJ0eSB0byBhY2Nlc3MgdGhlIEdQVSBkYXRhIGRpcmVjdGx5LicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jcHVEYXRhO1xuICB9XG5cbiAgZ2V0IGxvY2F0aW9uKCk6IFRlbnNvckRhdGFMb2NhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YUxvY2F0aW9uO1xuICB9XG5cbiAgZ2V0IHRleHR1cmUoKTogVGVuc29yVGV4dHVyZVR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuZ3B1VGV4dHVyZURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgaXMgbm90IHN0b3JlZCBhcyBhIFdlYkdMIHRleHR1cmUuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdwdVRleHR1cmVEYXRhO1xuICB9XG5cbiAgZ2V0IGdwdUJ1ZmZlcigpOiBUZW5zb3JHcHVCdWZmZXJUeXBlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKCF0aGlzLmdwdUJ1ZmZlckRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgaXMgbm90IHN0b3JlZCBhcyBhIFdlYkdQVSBidWZmZXIuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdwdUJ1ZmZlckRhdGE7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0aG9kc1xuXG4gIGFzeW5jIGdldERhdGEocmVsZWFzZURhdGE/OiBib29sZWFuKTogUHJvbWlzZTxUZW5zb3JEYXRhVHlwZT4ge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBzd2l0Y2ggKHRoaXMuZGF0YUxvY2F0aW9uKSB7XG4gICAgICBjYXNlICdjcHUnOlxuICAgICAgY2FzZSAnY3B1LXBpbm5lZCc6XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XG4gICAgICAgIGlmICghdGhpcy5kb3dubG9hZGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgbm90IGNyZWF0ZWQgd2l0aCBhIHNwZWNpZmllZCBkYXRhIGRvd25sb2FkZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNEb3dubG9hZGluZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmRvd25sb2FkZXIoKTtcbiAgICAgICAgICB0aGlzLmRvd25sb2FkZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnY3B1JztcbiAgICAgICAgICB0aGlzLmNwdURhdGEgPSBkYXRhO1xuXG4gICAgICAgICAgaWYgKHJlbGVhc2VEYXRhICYmIHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZ2V0IGRhdGEgZnJvbSBsb2NhdGlvbjogJHt0aGlzLmRhdGFMb2NhdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRG93bmxvYWRpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgIHRoaXMuZGlzcG9zZXIoKTtcbiAgICAgIHRoaXMuZGlzcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuY3B1RGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRvd25sb2FkZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnbm9uZSc7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB0ZW5zb3IgdXRpbGl0aWVzXG4gIHByaXZhdGUgZW5zdXJlVmFsaWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YUxvY2F0aW9uID09PSAnbm9uZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRlbnNvciBpcyBkaXNwb3NlZC4nKTtcbiAgICB9XG4gIH1cblxuICByZXNoYXBlKGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKHRoaXMuZG93bmxvYWRlciB8fCB0aGlzLmRpc3Bvc2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZXNoYXBlIGEgdGVuc29yIHRoYXQgb3ducyBHUFUgcmVzb3VyY2UuJyk7XG4gICAgfVxuICAgIHJldHVybiB0ZW5zb3JSZXNoYXBlKHRoaXMsIGRpbXMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3JGYWN0b3J5fSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7VGVuc29yIGFzIFRlbnNvckltcGx9IGZyb20gJy4vdGVuc29yLWltcGwuanMnO1xuaW1wb3J0IHtUeXBlZFRlbnNvclV0aWxzfSBmcm9tICcuL3RlbnNvci11dGlscy5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuLyoqXG4gKiByZXByZXNlbnQgYSBiYXNpYyB0ZW5zb3Igd2l0aCBzcGVjaWZpZWQgZGltZW5zaW9ucyBhbmQgZGF0YSB0eXBlLlxuICovXG5pbnRlcmZhY2UgVHlwZWRUZW5zb3JCYXNlPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xuICAvKipcbiAgICogR2V0IHRoZSBkaW1lbnNpb25zIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSB0eXBlOiBUO1xuICAvKipcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gQ1BVIChlZy4gaXQncyBpbiB0aGUgZm9ybSBvZiBXZWJHTCB0ZXh0dXJlIG9yIFdlYkdQVSBidWZmZXIpLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbjtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR0wgdGV4dHVyZSB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHTCB0ZXh0dXJlLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR1BVIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHUFUgYnVmZmVyLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGdwdUJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGU7XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYnVmZmVyIGRhdGEgb2YgdGhlIHRlbnNvci5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgb24gQ1BVLCByZXR1cm5zIHRoZSBkYXRhIGltbWVkaWF0ZWx5LlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBHUFUsIGRvd25sb2FkcyB0aGUgZGF0YSBhbmQgcmV0dXJucyB0aGUgcHJvbWlzZS5cbiAgICpcbiAgICogQHBhcmFtIHJlbGVhc2VEYXRhIC0gd2hldGhlciByZWxlYXNlIHRoZSBkYXRhIG9uIEdQVS4gSWdub3JlIGlmIGRhdGEgaXMgYWxyZWFkeSBvbiBDUFUuXG4gICAqL1xuICBnZXREYXRhKHJlbGVhc2VEYXRhPzogYm9vbGVhbik6IFByb21pc2U8VGVuc29yLkRhdGFUeXBlTWFwW1RdPjtcblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgdGVuc29yIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIENQVSwgcmVtb3ZlIGl0cyBpbnRlcm5hbCByZWZlcmVuY2UgdG8gdGhlIHVuZGVybHlpbmcgZGF0YS5cbiAgICogSWYgdGhlIGRhdGEgaXMgb24gR1BVLCByZWxlYXNlIHRoZSBkYXRhIG9uIEdQVS5cbiAgICpcbiAgICogQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCB0aGUgdGVuc29yIGlzIGNvbnNpZGVyZWQgbm8gbG9uZ2VyIHZhbGlkLiBJdHMgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ25vbmUnLlxuICAgKi9cbiAgZGlzcG9zZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgVGVuc29yIHtcbiAgaW50ZXJmYWNlIERhdGFUeXBlTWFwIHtcbiAgICBmbG9hdDMyOiBGbG9hdDMyQXJyYXk7XG4gICAgdWludDg6IFVpbnQ4QXJyYXk7XG4gICAgaW50ODogSW50OEFycmF5O1xuICAgIHVpbnQxNjogVWludDE2QXJyYXk7XG4gICAgaW50MTY6IEludDE2QXJyYXk7XG4gICAgaW50MzI6IEludDMyQXJyYXk7XG4gICAgaW50NjQ6IEJpZ0ludDY0QXJyYXk7XG4gICAgc3RyaW5nOiBzdHJpbmdbXTtcbiAgICBib29sOiBVaW50OEFycmF5O1xuICAgIGZsb2F0MTY6IFVpbnQxNkFycmF5OyAgLy8gS2VlcCB1c2luZyBVaW50MTZBcnJheSB1bnRpbCB3ZSBoYXZlIGEgY29uY3JldGUgc29sdXRpb24gZm9yIGZsb2F0IDE2LlxuICAgIGZsb2F0NjQ6IEZsb2F0NjRBcnJheTtcbiAgICB1aW50MzI6IFVpbnQzMkFycmF5O1xuICAgIHVpbnQ2NDogQmlnVWludDY0QXJyYXk7XG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XG4gIH1cblxuICBpbnRlcmZhY2UgRWxlbWVudFR5cGVNYXAge1xuICAgIGZsb2F0MzI6IG51bWJlcjtcbiAgICB1aW50ODogbnVtYmVyO1xuICAgIGludDg6IG51bWJlcjtcbiAgICB1aW50MTY6IG51bWJlcjtcbiAgICBpbnQxNjogbnVtYmVyO1xuICAgIGludDMyOiBudW1iZXI7XG4gICAgaW50NjQ6IGJpZ2ludDtcbiAgICBzdHJpbmc6IHN0cmluZztcbiAgICBib29sOiBib29sZWFuO1xuICAgIGZsb2F0MTY6IG51bWJlcjsgIC8vIEtlZXAgdXNpbmcgVWludDE2QXJyYXkgdW50aWwgd2UgaGF2ZSBhIGNvbmNyZXRlIHNvbHV0aW9uIGZvciBmbG9hdCAxNi5cbiAgICBmbG9hdDY0OiBudW1iZXI7XG4gICAgdWludDMyOiBudW1iZXI7XG4gICAgdWludDY0OiBiaWdpbnQ7XG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XG4gIH1cblxuICB0eXBlIERhdGFUeXBlID0gRGF0YVR5cGVNYXBbVHlwZV07XG4gIHR5cGUgRWxlbWVudFR5cGUgPSBFbGVtZW50VHlwZU1hcFtUeXBlXTtcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgcGlubmVkIENQVSBidWZmZXJcbiAgICovXG4gIGV4cG9ydCB0eXBlIENwdVBpbm5lZERhdGFUeXBlcyA9IEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPjtcblxuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR0wgdGV4dHVyZVxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVGV4dHVyZVR5cGUgPSBXZWJHTFRleHR1cmU7XG5cbiAgLyoqXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcbiAgICovXG4gIGV4cG9ydCB0eXBlIFRleHR1cmVEYXRhVHlwZXMgPSAnZmxvYXQzMic7XG5cbiAgLyoqXG4gICAqIHR5cGUgYWxpYXMgZm9yIFdlYkdQVSBidWZmZXJcbiAgICpcbiAgICogVGhlIHJlYXNvbiB3aHkgd2UgZG9uJ3QgdXNlIHR5cGUgXCJHUFVCdWZmZXJcIiBkZWZpbmVkIGluIHdlYmdwdS5kLnRzIGZyb20gQHdlYmdwdS90eXBlcyBpcyBiZWNhdXNlIFwiQHdlYmdwdS90eXBlc1wiXG4gICAqIHJlcXVpcmVzIFwiQHR5cGVzL2RvbS13ZWJjb2RlY3NcIiBhcyBwZWVyIGRlcGVuZGVuY3kgd2hlbiB1c2luZyBUeXBlU2NyaXB0IDwgdjUuMSBhbmQgaXRzIHZlcnNpb24gbmVlZCB0byBiZSBjaG9zZW5cbiAgICogY2FyZWZ1bGx5IGFjY29yZGluZyB0byB0aGUgVHlwZVNjcmlwdCB2ZXJzaW9uIGJlaW5nIHVzZWQuIFRoaXMgbWVhbnMgc28gZmFyIHRoZXJlIGlzIG5vdCBhIHdheSB0byBrZWVwIGV2ZXJ5XG4gICAqIFR5cGVTY3JpcHQgdmVyc2lvbiBoYXBweS4gSXQgdHVybnMgb3V0IHRoYXQgd2Ugd2lsbCBlYXNpbHkgYnJva2UgdXNlcnMgb24gc29tZSBUeXBlU2NyaXB0IHZlcnNpb24uXG4gICAqXG4gICAqIGZvciBtb3JlIGluZm8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ncHV3ZWIvdHlwZXMvaXNzdWVzLzEyN1xuICAgKi9cbiAgZXhwb3J0IHR5cGUgR3B1QnVmZmVyVHlwZSA9IHtzaXplOiBudW1iZXI7IG1hcFN0YXRlOiAndW5tYXBwZWQnIHwgJ3BlbmRpbmcnIHwgJ21hcHBlZCd9O1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXG4gICAqL1xuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJEYXRhVHlwZXMgPSAnZmxvYXQzMid8J2Zsb2F0MTYnfCdpbnQzMid8J2ludDY0J3wndWludDMyJ3wnYm9vbCc7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB3aGVyZSB0aGUgdGVuc29yIGRhdGEgaXMgc3RvcmVkXG4gICAqL1xuICBleHBvcnQgdHlwZSBEYXRhTG9jYXRpb24gPSAnbm9uZSd8J2NwdSd8J2NwdS1waW5uZWQnfCd0ZXh0dXJlJ3wnZ3B1LWJ1ZmZlcic7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB0aGUgZGF0YSB0eXBlIG9mIGEgdGVuc29yXG4gICAqL1xuICBleHBvcnQgdHlwZSBUeXBlID0ga2V5b2YgRGF0YVR5cGVNYXA7XG59XG5cbi8qKlxuICogUmVwcmVzZW50IG11bHRpLWRpbWVuc2lvbmFsIGFycmF5cyB0byBmZWVkIHRvIG9yIGZldGNoIGZyb20gbW9kZWwgaW5mZXJlbmNpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWRUZW5zb3I8VCBleHRlbmRzIFRlbnNvci5UeXBlPiBleHRlbmRzIFR5cGVkVGVuc29yQmFzZTxUPiwgVHlwZWRUZW5zb3JVdGlsczxUPiB7fVxuLyoqXG4gKiBSZXByZXNlbnQgbXVsdGktZGltZW5zaW9uYWwgYXJyYXlzIHRvIGZlZWQgdG8gb3IgZmV0Y2ggZnJvbSBtb2RlbCBpbmZlcmVuY2luZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW5zb3IgZXh0ZW5kcyBUeXBlZFRlbnNvckJhc2U8VGVuc29yLlR5cGU+LCBUeXBlZFRlbnNvclV0aWxzPFRlbnNvci5UeXBlPiB7fVxuXG4vKipcbiAqIHR5cGUgVGVuc29yQ29uc3RydWN0b3IgZGVmaW5lcyB0aGUgY29uc3RydWN0b3JzIG9mICdUZW5zb3InIHRvIGNyZWF0ZSBDUFUgdGVuc29yIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JDb25zdHJ1Y3RvciB7XG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIHNwZWNpZnkgZWxlbWVudCB0eXBlXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgc3RyaW5nIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyh0eXBlOiAnc3RyaW5nJywgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwWydzdHJpbmcnXXxyZWFkb25seSBzdHJpbmdbXSxcbiAgICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdzdHJpbmcnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGJvb2wgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KHR5cGU6ICdib29sJywgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwWydib29sJ118cmVhZG9ubHkgYm9vbGVhbltdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnYm9vbCc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgNjQtYml0IGludGVnZXIgdHlwZWQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3PFQgZXh0ZW5kcyAndWludDY0J3wnaW50NjQnPihcbiAgICAgIHR5cGU6IFQsIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXXxyZWFkb25seSBiaWdpbnRbXXxyZWFkb25seSBudW1iZXJbXSxcbiAgICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgbnVtZXJpYyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXc8VCBleHRlbmRzIEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnfCdib29sJ3wndWludDY0J3wnaW50NjQnPj4oXG4gICAgICB0eXBlOiBULCBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF18cmVhZG9ubHkgbnVtYmVyW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPFQ+O1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gaW5mZXIgZWxlbWVudCB0eXBlc1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgZmxvYXQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBGbG9hdDMyQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdmbG9hdDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IFVpbnQ4QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50OCc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDE2IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IFVpbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBJbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50MTYnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDMyIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEludDMyQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdpbnQzMic+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW50NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogQmlnSW50NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogcmVhZG9ubHkgc3RyaW5nW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdzdHJpbmcnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGJvb2wgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogcmVhZG9ubHkgYm9vbGVhbltdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnYm9vbCc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgZmxvYXQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBGbG9hdDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdmbG9hdDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogVWludDMyQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBCaWdVaW50NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ2NCc+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIENQVSB0ZW5zb3IgLSBmYWxsIGJhY2sgdG8gbm9uLWdlbmVyaWMgdGVuc29yIHR5cGUgZGVjbGFyYXRpb25cblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyh0eXBlOiBUZW5zb3IuVHlwZSwgZGF0YTogVGVuc29yLkRhdGFUeXBlfHJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IHN0cmluZ1tdfHJlYWRvbmx5IGJpZ2ludFtdfHJlYWRvbmx5IGJvb2xlYW5bXSxcbiAgICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvcjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IFRlbnNvci5EYXRhVHlwZSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yO1xuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBUZW5zb3IgPSBUZW5zb3JJbXBsIGFzIChUZW5zb3JDb25zdHJ1Y3RvciAmIFRlbnNvckZhY3RvcnkpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge2Vudn0gZnJvbSAnLi9lbnYtaW1wbC5qcyc7XG5cbmV4cG9ydCBjb25zdCBUUkFDRSA9IChkZXZpY2VUeXBlOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcpID0+IHtcbiAgaWYgKCFlbnYud2FzbS50cmFjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICBjb25zb2xlLnRpbWVTdGFtcChgJHtkZXZpY2VUeXBlfTo6T1JUOjoke2xhYmVsfWApO1xufTtcblxuY29uc3QgVFJBQ0VfRlVOQyA9IChtc2c6IHN0cmluZywgZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoL1xcclxcbnxcXHJ8XFxuL2cpIHx8IFtdO1xuICBsZXQgaGFzVHJhY2VGdW5jID0gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaGFzVHJhY2VGdW5jICYmICFzdGFja1tpXS5pbmNsdWRlcygnVFJBQ0VfRlVOQycpKSB7XG4gICAgICBsZXQgbGFiZWwgPSBgRlVOQ18ke21zZ306OiR7c3RhY2tbaV0udHJpbSgpLnNwbGl0KCcgJylbMV19YDtcbiAgICAgIGlmIChleHRyYU1zZykge1xuICAgICAgICBsYWJlbCArPSBgOjoke2V4dHJhTXNnfWA7XG4gICAgICB9XG4gICAgICBUUkFDRSgnQ1BVJywgbGFiZWwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3RhY2tbaV0uaW5jbHVkZXMoJ1RSQUNFX0ZVTkMnKSkge1xuICAgICAgaGFzVHJhY2VGdW5jID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBUUkFDRV9GVU5DX0JFR0lOID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICghZW52Lndhc20udHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnQkVHSU4nLCBleHRyYU1zZyk7XG59O1xuXG5leHBvcnQgY29uc3QgVFJBQ0VfRlVOQ19FTkQgPSAoZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcbiAgaWYgKCFlbnYud2FzbS50cmFjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBUUkFDRV9GVU5DKCdFTkQnLCBleHRyYU1zZyk7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge3Jlc29sdmVCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb25IYW5kbGVyfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9uIGFzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2V9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuaW1wb3J0IHtPbm54VmFsdWV9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnLi90ZW5zb3IuanMnO1xuaW1wb3J0IHtUUkFDRV9GVU5DX0JFR0lOLCBUUkFDRV9GVU5DX0VORH0gZnJvbSAnLi90cmFjZS5qcyc7XG5cbnR5cGUgU2Vzc2lvbk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlNlc3Npb25PcHRpb25zO1xudHlwZSBSdW5PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5SdW5PcHRpb25zO1xudHlwZSBGZWVkc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLkZlZWRzVHlwZTtcbnR5cGUgRmV0Y2hlc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLkZldGNoZXNUeXBlO1xudHlwZSBSZXR1cm5UeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5SZXR1cm5UeXBlO1xuXG5leHBvcnQgY2xhc3MgSW5mZXJlbmNlU2Vzc2lvbiBpbXBsZW1lbnRzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2Uge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKGhhbmRsZXI6IEluZmVyZW5jZVNlc3Npb25IYW5kbGVyKSB7XG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgfVxuICBydW4oZmVlZHM6IEZlZWRzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBydW4oZmVlZHM6IEZlZWRzVHlwZSwgZmV0Y2hlczogRmV0Y2hlc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgYXN5bmMgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcbiAgICBjb25zdCBmZXRjaGVzOiB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZXxudWxsfSA9IHt9O1xuICAgIGxldCBvcHRpb25zOiBSdW5PcHRpb25zID0ge307XG4gICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgaWYgKHR5cGVvZiBmZWVkcyAhPT0gJ29iamVjdCcgfHwgZmVlZHMgPT09IG51bGwgfHwgZmVlZHMgaW5zdGFuY2VvZiBUZW5zb3IgfHwgQXJyYXkuaXNBcnJheShmZWVkcykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgJ1xcJ2ZlZWRzXFwnIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgdXNlIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy4nKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGZXRjaGVzRW1wdHkgPSB0cnVlO1xuICAgIC8vIGRldGVybWluZSB3aGljaCBvdmVycmlkZSBpcyBiZWluZyB1c2VkXG4gICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGFyZzEgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5leHBlY3RlZCBhcmd1bWVudFsxXTogY2Fubm90IGJlIG51bGwuJyk7XG4gICAgICB9XG4gICAgICBpZiAoYXJnMSBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIGNhbm5vdCBiZSBhIFRlbnNvcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICBpZiAoYXJnMS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIGNhbm5vdCBiZSBhbiBlbXB0eSBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAvLyBvdXRwdXQgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGFyZzEpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkgb3IgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5vdXRwdXROYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdmZXRjaGVzJyBjb250YWlucyBpbnZhbGlkIG91dHB1dCBuYW1lOiAke25hbWV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRlY2lkZSB3aGV0aGVyIGFyZzEgaXMgZmV0Y2hlcyBvciBvcHRpb25zXG4gICAgICAgIC8vIGlmIGFueSBvdXRwdXQgbmFtZSBpcyBwcmVzZW50IGFuZCBpdHMgdmFsdWUgaXMgdmFsaWQgT25ueFZhbHVlLCB3ZSBjb25zaWRlciBpdCBmZXRjaGVzXG4gICAgICAgIGxldCBpc0ZldGNoZXMgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgYXJnMUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmcxKTtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMub3V0cHV0TmFtZXMpIHtcbiAgICAgICAgICBpZiAoYXJnMUtleXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSAoYXJnMSBhcyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLk51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSlbbmFtZV07XG4gICAgICAgICAgICBpZiAodiA9PT0gbnVsbCB8fCB2IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlcyA9IHRydWU7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZldGNoZXMpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMSBhcyBSdW5PcHRpb25zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IG11c3QgYmUgXFwnZmV0Y2hlc1xcJyBvciBcXCdvcHRpb25zXFwnLicpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dHMgYXJlIGluIGZlZWRcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5pbnB1dE5hbWVzKSB7XG4gICAgICBpZiAodHlwZW9mIGZlZWRzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlucHV0ICcke25hbWV9JyBpcyBtaXNzaW5nIGluICdmZWVkcycuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxuICAgIGlmIChpc0ZldGNoZXNFbXB0eSkge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMub3V0cHV0TmFtZXMpIHtcbiAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMgYXJlIHByZXBhcmVkXG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bihmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IHtbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfSA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3VsdHMpIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHRzLCBrZXkpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNba2V5XTtcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IG5ldyBUZW5zb3IocmVzdWx0LnR5cGUsIHJlc3VsdC5kYXRhLCByZXN1bHQuZGltcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICBhc3luYyByZWxlYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aD86IG51bWJlciwgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBVaW50OEFycmF5LCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgYXN5bmMgY3JlYXRlKFxuICAgICAgYXJnMDogc3RyaW5nfEFycmF5QnVmZmVyTGlrZXxVaW50OEFycmF5LCBhcmcxPzogU2Vzc2lvbk9wdGlvbnN8bnVtYmVyLCBhcmcyPzogbnVtYmVyLFxuICAgICAgYXJnMz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIC8vIGVpdGhlciBsb2FkIGZyb20gYSBmaWxlIG9yIGJ1ZmZlclxuICAgIGxldCBmaWxlUGF0aE9yVWludDhBcnJheTogc3RyaW5nfFVpbnQ4QXJyYXk7XG4gICAgbGV0IG9wdGlvbnM6IFNlc3Npb25PcHRpb25zID0ge307XG5cbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IGFyZzA7XG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucyA9IGFyZzE7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXJnMCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICAgYXJnMCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8XG4gICAgICAgICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGFyZzAgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcikpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGFyZzA7XG4gICAgICBsZXQgYnl0ZU9mZnNldCA9IDA7XG4gICAgICBsZXQgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGJ5dGVPZmZzZXQgPSBhcmcxO1xuICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVPZmZzZXQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2J5dGVPZmZzZXRcXCcgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBieXRlT2Zmc2V0ID49IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdieXRlT2Zmc2V0JyBpcyBvdXQgb2YgcmFuZ2UgWzAsICR7YnVmZmVyLmJ5dGVMZW5ndGh9KS5gKTtcbiAgICAgICAgfVxuICAgICAgICBieXRlTGVuZ3RoID0gYXJnMC5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldDtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGJ5dGVMZW5ndGggPSBhcmcyO1xuICAgICAgICAgIGlmICghTnVtYmVyLmlzU2FmZUludGVnZXIoYnl0ZUxlbmd0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdieXRlTGVuZ3RoXFwnIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJ5dGVMZW5ndGggPD0gMCB8fCBieXRlT2Zmc2V0ICsgYnl0ZUxlbmd0aCA+IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2J5dGVMZW5ndGgnIGlzIG91dCBvZiByYW5nZSAoMCwgJHtidWZmZXIuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXR9XS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmczID09PSAnb2JqZWN0JyAmJiBhcmczICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gYXJnMztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmczICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnYnl0ZUxlbmd0aFxcJyBtdXN0IGJlIGEgbnVtYmVyLicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgfVxuICAgICAgZmlsZVBhdGhPclVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGFyZ3VtZW50WzBdOiBtdXN0IGJlIFxcJ3BhdGhcXCcgb3IgXFwnYnVmZmVyXFwnLicpO1xuICAgIH1cblxuICAgIC8vIGdldCBiYWNrZW5kIGhpbnRzXG4gICAgY29uc3QgZXBzID0gb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMgfHwgW107XG4gICAgY29uc3QgYmFja2VuZEhpbnRzID0gZXBzLm1hcChpID0+IHR5cGVvZiBpID09PSAnc3RyaW5nJyA/IGkgOiBpLm5hbWUpO1xuICAgIGNvbnN0IGJhY2tlbmQgPSBhd2FpdCByZXNvbHZlQmFja2VuZChiYWNrZW5kSGludHMpO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKGZpbGVQYXRoT3JVaW50OEFycmF5LCBvcHRpb25zKTtcbiAgICBUUkFDRV9GVU5DX0VORCgpO1xuICAgIHJldHVybiBuZXcgSW5mZXJlbmNlU2Vzc2lvbihoYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlci5zdGFydFByb2ZpbGluZygpO1xuICB9XG4gIGVuZFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZXIuZW5kUHJvZmlsaW5nKCk7XG4gIH1cblxuICBnZXQgaW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE5hbWVzO1xuICB9XG4gIGdldCBvdXRwdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5vdXRwdXROYW1lcztcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlcjogSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW1wbH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLmpzJztcbmltcG9ydCB7T25ueFZhbHVlLCBPbm54VmFsdWVEYXRhTG9jYXRpb259IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIEluZmVyZW5jZVNlc3Npb24ge1xuICAvLyAjcmVnaW9uIGlucHV0L291dHB1dCB0eXBlc1xuXG4gIHR5cGUgT25ueFZhbHVlTWFwVHlwZSA9IHtyZWFkb25seSBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfTtcbiAgdHlwZSBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUgPSB7cmVhZG9ubHkgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGx9O1xuXG4gIC8qKlxuICAgKiBBIGZlZWRzIChtb2RlbCBpbnB1dHMpIGlzIGFuIG9iamVjdCB0aGF0IHVzZXMgaW5wdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgdHlwZSBGZWVkc1R5cGUgPSBPbm54VmFsdWVNYXBUeXBlO1xuXG4gIC8qKlxuICAgKiBBIGZldGNoZXMgKG1vZGVsIG91dHB1dHMpIGNvdWxkIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgKlxuICAgKiAtIE9taXR0ZWQuIFVzZSBtb2RlbCdzIG91dHB1dCBuYW1lcyBkZWZpbml0aW9uLlxuICAgKiAtIEFuIGFycmF5IG9mIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBvdXRwdXQgbmFtZXMuXG4gICAqIC0gQW4gb2JqZWN0IHRoYXQgdXNlIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgb3IgbnVsbCBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICpcbiAgICogQHJlbWFya1xuICAgKiBkaWZmZXJlbnQgZnJvbSBpbnB1dCBhcmd1bWVudCwgaW4gb3V0cHV0LCBPbm54VmFsdWUgaXMgb3B0aW9uYWwuIElmIGFuIE9ubnhWYWx1ZSBpcyBwcmVzZW50IGl0IHdpbGwgYmVcbiAgICogdXNlZCBhcyBhIHByZS1hbGxvY2F0ZWQgdmFsdWUgYnkgdGhlIGluZmVyZW5jZSBlbmdpbmU7IGlmIG9taXR0ZWQsIGluZmVyZW5jZSBlbmdpbmUgd2lsbCBhbGxvY2F0ZSBidWZmZXJcbiAgICogaW50ZXJuYWxseS5cbiAgICovXG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSByZWFkb25seSBzdHJpbmdbXXxOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLyoqXG4gICAqIEEgaW5mZXJlbmNpbmcgcmV0dXJuIHR5cGUgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgdHlwZSBSZXR1cm5UeXBlID0gT25ueFZhbHVlTWFwVHlwZTtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBzZXNzaW9uIG9wdGlvbnNcblxuICAvKipcbiAgICogQSBzZXQgb2YgY29uZmlndXJhdGlvbnMgZm9yIHNlc3Npb24gYmVoYXZpb3IuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEFuIGV4ZWN1dGlvbiBwcm92aWRlciBvcHRpb24gY2FuIGJlIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIGV4ZWN1dGlvbiBwcm92aWRlcixcbiAgICAgKiBvciBhbiBvYmplY3Qgb2YgY29ycmVzcG9uZGluZyB0eXBlLlxuICAgICAqL1xuICAgIGV4ZWN1dGlvblByb3ZpZGVycz86IHJlYWRvbmx5IEV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50cmEgT1AgdGhyZWFkcyBudW1iZXIuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICBpbnRyYU9wTnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlciBPUCB0aHJlYWRzIG51bWJlci5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIGludGVyT3BOdW1UaHJlYWRzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGZyZWVEaW1lbnNpb25PdmVycmlkZXM/OiB7cmVhZG9ubHkgW2RpbWVuc2lvbk5hbWU6IHN0cmluZ106IG51bWJlcn07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3B0aW1pemF0aW9uIGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw/OiAnZGlzYWJsZWQnfCdiYXNpYyd8J2V4dGVuZGVkJ3wnYWxsJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIENQVSBtZW1vcnkgYXJlbmEuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlQ3B1TWVtQXJlbmE/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBlbmFibGUgbWVtb3J5IHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlTWVtUGF0dGVybj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBleGVjdXRpb25Nb2RlPzogJ3NlcXVlbnRpYWwnfCdwYXJhbGxlbCc7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpbWl6ZWQgbW9kZWwgZmlsZSBwYXRoLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBzZXR0aW5nIGlzIHNwZWNpZmllZCwgdGhlIG9wdGltaXplZCBtb2RlbCB3aWxsIGJlIGR1bXBlZC4gSW4gYnJvd3NlciwgYSBibG9iIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIHdpdGggYSBwb3AtdXAgd2luZG93LlxuICAgICAqL1xuICAgIG9wdGltaXplZE1vZGVsRmlsZVBhdGg/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXZXRoZXIgZW5hYmxlIHByb2ZpbGluZy5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIGZ1dHVyZSB1c2UuXG4gICAgICovXG4gICAgZW5hYmxlUHJvZmlsaW5nPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEZpbGUgcHJlZml4IGZvciBwcm9maWxpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYSBwbGFjZWhvbGRlciBmb3IgYSBmdXR1cmUgdXNlLlxuICAgICAqL1xuICAgIHByb2ZpbGVGaWxlUHJlZml4Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIElELlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ0lkPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIHNldmVyaXR5IGxldmVsLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwfDF8MnwzfDQ7XG5cbiAgICAvKipcbiAgICAgKiBMb2cgdmVyYm9zaXR5IGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqL1xuICAgIGxvZ1ZlcmJvc2l0eUxldmVsPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBzdHJpbmcgYXMgYSBwcmVmZXJyZWQgZGF0YSBsb2NhdGlvbiBmb3IgYWxsIG91dHB1dHMsIG9yIGFuIG9iamVjdCB0aGF0IHVzZSBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgYVxuICAgICAqIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIFdlYiBmb3IgV2ViR0wgYW5kIFdlYkdQVSBFUC5cbiAgICAgKi9cbiAgICBwcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj86IE9ubnhWYWx1ZURhdGFMb2NhdGlvbnx7cmVhZG9ubHkgW291dHB1dE5hbWU6IHN0cmluZ106IE9ubnhWYWx1ZURhdGFMb2NhdGlvbn07XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBjb25maWd1cmF0aW9ucyBmb3IgYSBzZXNzaW9uLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvc2Vzc2lvbi9cbiAgICAgKiBvbm54cnVudGltZV9zZXNzaW9uX29wdGlvbnNfY29uZmlnX2tleXMuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBqc1xuICAgICAqIGV4dHJhOiB7XG4gICAgICogICBzZXNzaW9uOiB7XG4gICAgICogICAgIHNldF9kZW5vcm1hbF9hc196ZXJvOiBcIjFcIixcbiAgICAgKiAgICAgZGlzYWJsZV9wcmVwYWNraW5nOiBcIjFcIlxuICAgICAqICAgfSxcbiAgICAgKiAgIG9wdGltaXphdGlvbjoge1xuICAgICAqICAgICBlbmFibGVfZ2VsdV9hcHByb3hpbWF0aW9uOiBcIjFcIlxuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBleHRyYT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICB9XG5cbiAgLy8gI3JlZ2lvbiBleGVjdXRpb24gcHJvdmlkZXJzXG5cbiAgLy8gQ3VycmVudGx5LCB3ZSBoYXZlIHRoZSBmb2xsb3dpbmcgYmFja2VuZHMgdG8gc3VwcG9ydCBleGVjdXRpb24gcHJvdmlkZXJzOlxuICAvLyBCYWNrZW5kIE5vZGUuanMgYmluZGluZzogc3VwcG9ydHMgJ2NwdScgYW5kICdjdWRhJy5cbiAgLy8gQmFja2VuZCBXZWJBc3NlbWJseTogc3VwcG9ydHMgJ2NwdScsICd3YXNtJywgJ3hubnBhY2snIGFuZCAnd2Vibm4nLlxuICAvLyBCYWNrZW5kIE9OTlguanM6IHN1cHBvcnRzICd3ZWJnbCcuXG4gIC8vIEJhY2tlbmQgUmVhY3QgTmF0aXZlOiBzdXBwb3J0cyAnY3B1JywgJ3hubnBhY2snLCAnY29yZW1sJyAoaU9TKSwgJ25uYXBpJyAoQW5kcm9pZCkuXG4gIGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcCB7XG4gICAgY3B1OiBDcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBjb3JlbWw6IENvcmVNbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGN1ZGE6IEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBkbWw6IERtbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHRlbnNvcnJ0OiBUZW5zb3JSdEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdhc206IFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2ViZ2w6IFdlYkdMRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgeG5ucGFjazogWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdlYmdwdTogV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2Vibm46IFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgbm5hcGk6IE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gIH1cblxuICB0eXBlIEV4ZWN1dGlvblByb3ZpZGVyTmFtZSA9IGtleW9mIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwO1xuICB0eXBlIEV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnID1cbiAgICAgIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwW0V4ZWN1dGlvblByb3ZpZGVyTmFtZV18RXhlY3V0aW9uUHJvdmlkZXJPcHRpb258RXhlY3V0aW9uUHJvdmlkZXJOYW1lfHN0cmluZztcblxuICBleHBvcnQgaW50ZXJmYWNlIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBDcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnY3B1JztcbiAgICB1c2VBcmVuYT86IGJvb2xlYW47XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBDdWRhRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2N1ZGEnO1xuICAgIGRldmljZUlkPzogbnVtYmVyO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29yZU1sRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2NvcmVtbCc7XG4gICAgY29yZU1sRmxhZ3M/OiBudW1iZXI7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBEbWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnZG1sJztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFRlbnNvclJ0RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3RlbnNvcnJ0JztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dhc20nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2ViZ2wnO1xuICAgIC8vIFRPRE86IGFkZCBmbGFnc1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd4bm5wYWNrJztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJncHUnO1xuICAgIHByZWZlcnJlZExheW91dD86ICdOQ0hXJ3wnTkhXQyc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJubic7XG4gICAgZGV2aWNlVHlwZT86ICdjcHUnfCdncHUnfCducHUnO1xuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2RlZmF1bHQnfCdsb3ctcG93ZXInfCdoaWdoLXBlcmZvcm1hbmNlJztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjb3JlbWwnO1xuICAgIHVzZUNQVU9ubHk/OiBib29sZWFuO1xuICAgIGVuYWJsZU9uU3ViZ3JhcGg/OiBib29sZWFuO1xuICAgIG9ubHlFbmFibGVEZXZpY2VXaXRoQU5FPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ25uYXBpJztcbiAgICB1c2VGUDE2PzogYm9vbGVhbjtcbiAgICB1c2VOQ0hXPzogYm9vbGVhbjtcbiAgICBjcHVEaXNhYmxlZD86IGJvb2xlYW47XG4gICAgY3B1T25seT86IGJvb2xlYW47XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHJ1biBvcHRpb25zXG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIGNvbmZpZ3VyYXRpb25zIGZvciBpbmZlcmVuY2UgcnVuIGJlaGF2aW9yXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFJ1bk9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dTZXZlcml0eUxldmVsPzogMHwxfDJ8M3w0O1xuXG4gICAgLyoqXG4gICAgICogTG9nIHZlcmJvc2l0eSBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKi9cbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRlcm1pbmF0ZSBhbGwgaW5jb21wbGV0ZSBPcnRSdW4gY2FsbHMgYXMgc29vbiBhcyBwb3NzaWJsZSBpZiB0cnVlXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgdGVybWluYXRlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEEgdGFnIGZvciB0aGUgUnVuKCkgY2FsbHMgdXNpbmcgdGhpc1xuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIHRhZz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNldCBhIHNpbmdsZSBydW4gY29uZmlndXJhdGlvbiBlbnRyeS4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Nlc3Npb24vXG4gICAgICogb25ueHJ1bnRpbWVfcnVuX29wdGlvbnNfY29uZmlnX2tleXMuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogZXh0cmE6IHtcbiAgICAgKiAgIG1lbW9yeToge1xuICAgICAqICAgICBlbmFibGVfbWVtb3J5X2FyZW5hX3Nocmlua2FnZTogXCIxXCIsXG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGV4dHJhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB2YWx1ZSBtZXRhZGF0YVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlXG4gIGludGVyZmFjZSBWYWx1ZU1ldGFkYXRhIHtcbiAgICAvLyBUQkRcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBydW50aW1lIGluc3RhbmNlIG9mIGFuIE9OTlggbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbiB7XG4gIC8vICNyZWdpb24gcnVuKClcblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1bihmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgdGhlIG1vZGVsIGFzeW5jaHJvbm91c2x5IHdpdGggdGhlIGdpdmVuIGZlZWRzLCBmZXRjaGVzIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLklucHV0VHlwZWAgZm9yIGRldGFpbC5cbiAgICogQHBhcmFtIGZldGNoZXMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgb3V0cHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5PdXRwdXRUeXBlYCBmb3JcbiAgICogZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1bihmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHJlbGVhc2UoKVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlIHRoZSBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgdGhlIHVuZGVybHlpbmcgcmVzb3VyY2VzLlxuICAgKi9cbiAgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHByb2ZpbGluZ1xuXG4gIC8qKlxuICAgKiBTdGFydCBwcm9maWxpbmcuXG4gICAqL1xuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBFbmQgcHJvZmlsaW5nLlxuICAgKi9cbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQ7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0YWRhdGFcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8vIC8qKlxuICAvLyAgKiBHZXQgaW5wdXQgbWV0YWRhdGEgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgLy8gICovXG4gIC8vIHJlYWRvbmx5IGlucHV0TWV0YWRhdGE6IFJlYWRvbmx5QXJyYXk8UmVhZG9ubHk8SW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhPj47XG5cbiAgLy8gLyoqXG4gIC8vICAqIEdldCBvdXRwdXQgbWV0YWRhdGEgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgLy8gICovXG4gIC8vIHJlYWRvbmx5IG91dHB1dE1ldGFkYXRhOiBSZWFkb25seUFycmF5PFJlYWRvbmx5PEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YT4+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gY3JlYXRlKClcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gT05OWCBtb2RlbCBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gdXJpIC0gVGhlIFVSSSBvciBmaWxlIHBhdGggb2YgdGhlIG1vZGVsIHRvIGxvYWQuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXG4gICAqL1xuICBjcmVhdGUodXJpOiBzdHJpbmcsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIHNlZ21lbnQgb2YgYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gYnl0ZU9mZnNldCAtIFRoZSBiZWdpbm5pbmcgb2YgdGhlIHNwZWNpZmllZCBwb3J0aW9uIG9mIHRoZSBhcnJheSBidWZmZXIuXG4gICAqIEBwYXJhbSBieXRlTGVuZ3RoIC0gVGhlIGxlbmd0aCBpbiBieXRlcyBvZiB0aGUgYXJyYXkgYnVmZmVyLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg/OiBudW1iZXIsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGEgVWludDhBcnJheS5cbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciAtIEEgVWludDhBcnJheSByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IEluZmVyZW5jZVNlc3Npb246IEluZmVyZW5jZVNlc3Npb25GYWN0b3J5ID0gSW5mZXJlbmNlU2Vzc2lvbkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbnR5cGUgTm9uVGVuc29yVHlwZSA9IG5ldmVyO1xuXG4vKipcbiAqIFR5cGUgT25ueFZhbHVlIFJlcHJlc2VudHMgYm90aCB0ZW5zb3JzIGFuZCBub24tdGVuc29ycyB2YWx1ZSBmb3IgbW9kZWwncyBpbnB1dHMvb3V0cHV0cy5cbiAqXG4gKiBOT1RFOiBjdXJyZW50bHkgbm90IHN1cHBvcnQgbm9uLXRlbnNvclxuICovXG5leHBvcnQgdHlwZSBPbm54VmFsdWUgPSBUZW5zb3J8Tm9uVGVuc29yVHlwZTtcblxuLyoqXG4gKiBUeXBlIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiByZXByZXNlbnRzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSBvZiBhbiBPbm54VmFsdWUuXG4gKi9cbmV4cG9ydCB0eXBlIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiA9IFRlbnNvci5EYXRhTG9jYXRpb247XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7cmVzb2x2ZUJhY2tlbmR9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcbmltcG9ydCB7U2Vzc2lvbkhhbmRsZXIsIFRyYWluaW5nU2Vzc2lvbkhhbmRsZXJ9IGZyb20gJy4vYmFja2VuZC5qcyc7XG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5pbXBvcnQge1RyYWluaW5nU2Vzc2lvbiBhcyBUcmFpbmluZ1Nlc3Npb25JbnRlcmZhY2UsIFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnN9IGZyb20gJy4vdHJhaW5pbmctc2Vzc2lvbi5qcyc7XG5cbnR5cGUgU2Vzc2lvbk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zO1xudHlwZSBGZWVkc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZTtcbnR5cGUgRmV0Y2hlc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlO1xudHlwZSBSZXR1cm5UeXBlID0gSW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlO1xudHlwZSBSdW5PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zO1xuXG5jb25zdCBub0JhY2tlbmRFcnJNc2c6IHN0cmluZyA9ICdUcmFpbmluZyBiYWNrZW5kIGNvdWxkIG5vdCBiZSByZXNvbHZlZC4gJyArXG4gICAgJ01ha2Ugc3VyZSB5b3VcXCdyZSB1c2luZyB0aGUgY29ycmVjdCBjb25maWd1cmF0aW9uICYgV2ViQXNzZW1ibHkgZmlsZXMuJztcblxuZXhwb3J0IGNsYXNzIFRyYWluaW5nU2Vzc2lvbiBpbXBsZW1lbnRzIFRyYWluaW5nU2Vzc2lvbkludGVyZmFjZSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoaGFuZGxlcjogVHJhaW5pbmdTZXNzaW9uSGFuZGxlciwgaGFzT3B0aW1pemVyTW9kZWw6IGJvb2xlYW4sIGhhc0V2YWxNb2RlbDogYm9vbGVhbikge1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgdGhpcy5oYXNPcHRpbWl6ZXJNb2RlbCA9IGhhc09wdGltaXplck1vZGVsO1xuICAgIHRoaXMuaGFzRXZhbE1vZGVsID0gaGFzRXZhbE1vZGVsO1xuICB9XG4gIHByaXZhdGUgaGFuZGxlcjogVHJhaW5pbmdTZXNzaW9uSGFuZGxlcjtcbiAgcHJpdmF0ZSBoYXNPcHRpbWl6ZXJNb2RlbDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBoYXNFdmFsTW9kZWw6IGJvb2xlYW47XG5cbiAgZ2V0IHRyYWluaW5nSW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE5hbWVzO1xuICB9XG4gIGdldCB0cmFpbmluZ091dHB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLm91dHB1dE5hbWVzO1xuICB9XG5cbiAgZ2V0IGV2YWxJbnB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5oYXNFdmFsTW9kZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZXZhbElucHV0TmFtZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyB0cmFpbmluZyBzZXNzaW9uIGhhcyBubyBldmFsTW9kZWwgbG9hZGVkLicpO1xuICAgIH1cbiAgfVxuICBnZXQgZXZhbE91dHB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5oYXNFdmFsTW9kZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZXZhbE91dHB1dE5hbWVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgdHJhaW5pbmcgc2Vzc2lvbiBoYXMgbm8gZXZhbE1vZGVsIGxvYWRlZC4nKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY3JlYXRlKHRyYWluaW5nT3B0aW9uczogVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9ucywgc2Vzc2lvbk9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbj4ge1xuICAgIGNvbnN0IGV2YWxNb2RlbDogc3RyaW5nfFVpbnQ4QXJyYXkgPSB0cmFpbmluZ09wdGlvbnMuZXZhbE1vZGVsIHx8ICcnO1xuICAgIGNvbnN0IG9wdGltaXplck1vZGVsOiBzdHJpbmd8VWludDhBcnJheSA9IHRyYWluaW5nT3B0aW9ucy5vcHRpbWl6ZXJNb2RlbCB8fCAnJztcbiAgICBjb25zdCBvcHRpb25zOiBTZXNzaW9uT3B0aW9ucyA9IHNlc3Npb25PcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gZ2V0IGJhY2tlbmQgaGludHNcbiAgICBjb25zdCBlcHMgPSBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyB8fCBbXTtcbiAgICBjb25zdCBiYWNrZW5kSGludHMgPSBlcHMubWFwKGkgPT4gdHlwZW9mIGkgPT09ICdzdHJpbmcnID8gaSA6IGkubmFtZSk7XG4gICAgY29uc3QgYmFja2VuZCA9IGF3YWl0IHJlc29sdmVCYWNrZW5kKGJhY2tlbmRIaW50cyk7XG4gICAgaWYgKGJhY2tlbmQuY3JlYXRlVHJhaW5pbmdTZXNzaW9uSGFuZGxlcikge1xuICAgICAgY29uc3QgaGFuZGxlciA9IGF3YWl0IGJhY2tlbmQuY3JlYXRlVHJhaW5pbmdTZXNzaW9uSGFuZGxlcihcbiAgICAgICAgICB0cmFpbmluZ09wdGlvbnMuY2hlY2twb2ludFN0YXRlLCB0cmFpbmluZ09wdGlvbnMudHJhaW5Nb2RlbCwgZXZhbE1vZGVsLCBvcHRpbWl6ZXJNb2RlbCwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gbmV3IFRyYWluaW5nU2Vzc2lvbihoYW5kbGVyLCAhIXRyYWluaW5nT3B0aW9ucy5vcHRpbWl6ZXJNb2RlbCwgISF0cmFpbmluZ09wdGlvbnMuZXZhbE1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG5vQmFja2VuZEVyck1zZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBmdW5jdGlvbiBmb3IgcnVuVHJhaW5TdGVwIGFuZCBmdXR1cmUgcnVuU3RlcCBtZXRob2RzIHRoYXQgaGFuZGxlcyB0aGUgdHlwZS1uYXJyb3dpbmcgY29udmVyc2lvbiBmcm9tXG4gICAqIHRoZSBnaXZlbiBwYXJhbWV0ZXJzIHRvIFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlIGFuZCBSdW5PcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gaW5wdXROYW1lcyB0aGUgZmVlZHMgb2JqZWN0IGlzIGNoZWNrZWQgdGhhdCB0aGV5IGNvbnRhaW4gYWxsIGlucHV0IG5hbWVzIGluIHRoZSBwcm92aWRlZCBsaXN0IG9mIGlucHV0XG4gICAqIG5hbWVzLlxuICAgKiBAcGFyYW0gb3V0cHV0TmFtZXMgdGhlIGZldGNoZXMgb2JqZWN0IGlzIGNoZWNrZWQgdGhhdCB0aGVpciBrZXlzIG1hdGNoIHVwIHdpdGggdmFsaWQgbmFtZXMgaW4gdGhlIGxpc3Qgb2Ygb3V0cHV0XG4gICAqIG5hbWVzLlxuICAgKiBAcGFyYW0gZmVlZHMgdGhlIHJlcXVpcmVkIGlucHV0XG4gICAqIEBwYXJhbSBhcmcxIG5hcnJvd2VkICYgY29udmVydGVkIGludG8gdGhlIFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlIG9yIFJ1bk9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSBhcmcyIG9wdGlvbmFsIFJ1bk9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgdHlwZU5hcnJvd2luZ0ZvclJ1blN0ZXAoXG4gICAgICBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXSwgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdLCBmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGV8UnVuT3B0aW9ucyxcbiAgICAgIGFyZzI/OiBSdW5PcHRpb25zKTogW1Nlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLCBSdW5PcHRpb25zXSB7XG4gICAgY29uc3QgZmV0Y2hlczoge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV8bnVsbH0gPSB7fTtcbiAgICBsZXQgb3B0aW9uczogUnVuT3B0aW9ucyA9IHt9O1xuICAgIC8vIGNoZWNrIGlucHV0c1xuICAgIGlmICh0eXBlb2YgZmVlZHMgIT09ICdvYmplY3QnIHx8IGZlZWRzID09PSBudWxsIHx8IGZlZWRzIGluc3RhbmNlb2YgVGVuc29yIHx8IEFycmF5LmlzQXJyYXkoZmVlZHMpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICdcXCdmZWVkc1xcJyBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IHVzZSBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuJyk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmV0Y2hlc0VtcHR5ID0gdHJ1ZTtcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggb3ZlcnJpZGUgaXMgYmVpbmcgdXNlZFxuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChhcmcxID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZzEgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBjYW5ub3QgYmUgYSBUZW5zb3InKTtcbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgaWYgKGFyZzEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBjYW5ub3QgYmUgYW4gZW1wdHkgYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgLy8gb3V0cHV0IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBhcmcxKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBtdXN0IGJlIGEgc3RyaW5nIGFycmF5IG9yIGFuIG9iamVjdC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG91dHB1dE5hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2ZldGNoZXMnIGNvbnRhaW5zIGludmFsaWQgb3V0cHV0IG5hbWU6ICR7bmFtZX0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVjaWRlIHdoZXRoZXIgYXJnMSBpcyBmZXRjaGVzIG9yIG9wdGlvbnNcbiAgICAgICAgLy8gaWYgYW55IG91dHB1dCBuYW1lIGlzIHByZXNlbnQgYW5kIGl0cyB2YWx1ZSBpcyB2YWxpZCBPbm54VmFsdWUsIHdlIGNvbnNpZGVyIGl0IGZldGNoZXNcbiAgICAgICAgbGV0IGlzRmV0Y2hlcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBhcmcxS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZzEpO1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2Ygb3V0cHV0TmFtZXMpIHtcbiAgICAgICAgICBpZiAoYXJnMUtleXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSAoYXJnMSBhcyBJbmZlcmVuY2VTZXNzaW9uLk51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSlbbmFtZV07XG4gICAgICAgICAgICBpZiAodiA9PT0gbnVsbCB8fCB2IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlcyA9IHRydWU7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZldGNoZXMpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMSBhcyBSdW5PcHRpb25zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IG11c3QgYmUgXFwnZmV0Y2hlc1xcJyBvciBcXCdvcHRpb25zXFwnLicpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dHMgYXJlIGluIGZlZWRcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgaW5wdXROYW1lcykge1xuICAgICAgaWYgKHR5cGVvZiBmZWVkc1tuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCAnJHtuYW1lfScgaXMgbWlzc2luZyBpbiAnZmVlZHMnLmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIG5vIGZldGNoZXMgaXMgc3BlY2lmaWVkLCB3ZSB1c2UgdGhlIGZ1bGwgb3V0cHV0IG5hbWVzIGxpc3RcbiAgICBpZiAoaXNGZXRjaGVzRW1wdHkpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBvdXRwdXROYW1lcykge1xuICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2ZldGNoZXMsIG9wdGlvbnNdO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgZm9yIHJ1blRyYWluU3RlcCBhbmQgYW55IG90aGVyIHJ1blN0ZXAgbWV0aG9kcy4gVGFrZXMgdGhlIFJldHVyblR5cGUgcmVzdWx0IGZyb20gdGhlIFNlc3Npb25IYW5kbGVyXG4gICAqIGFuZCBjaGFuZ2VzIGl0IGludG8gYSBtYXAgb2YgVGVuc29ycy5cbiAgICpcbiAgICogQHBhcmFtIHJlc3VsdHNcbiAgICogQHJldHVybnNcbiAgICovXG4gIGNvbnZlcnRIYW5kbGVyUmV0dXJuVHlwZVRvTWFwT2ZUZW5zb3JzKHJlc3VsdHM6IFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGUpOiBSZXR1cm5UeXBlIHtcbiAgICBjb25zdCByZXR1cm5WYWx1ZToge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV9ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmVzdWx0cykge1xuICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdHMsIGtleSkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1trZXldO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gbmV3IFRlbnNvcihyZXN1bHQudHlwZSwgcmVzdWx0LmRhdGEsIHJlc3VsdC5kaW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICBhc3luYyBsYXp5UmVzZXRHcmFkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuaGFuZGxlci5sYXp5UmVzZXRHcmFkKCk7XG4gIH1cblxuICBydW5UcmFpblN0ZXAoZmVlZHM6IEZlZWRzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBydW5UcmFpblN0ZXAoZmVlZHM6IEZlZWRzVHlwZSwgZmV0Y2hlczogRmV0Y2hlc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgYXN5bmMgcnVuVHJhaW5TdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xuICAgIGNvbnN0IFtmZXRjaGVzLCBvcHRpb25zXSA9XG4gICAgICAgIHRoaXMudHlwZU5hcnJvd2luZ0ZvclJ1blN0ZXAodGhpcy50cmFpbmluZ0lucHV0TmFtZXMsIHRoaXMudHJhaW5pbmdPdXRwdXROYW1lcywgZmVlZHMsIGFyZzEsIGFyZzIpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmhhbmRsZXIucnVuVHJhaW5TdGVwKGZlZWRzLCBmZXRjaGVzLCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0SGFuZGxlclJldHVyblR5cGVUb01hcE9mVGVuc29ycyhyZXN1bHRzKTtcbiAgfVxuXG4gIGFzeW5jIHJ1bk9wdGltaXplclN0ZXAob3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9uc3x1bmRlZmluZWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5oYXNPcHRpbWl6ZXJNb2RlbCkge1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bk9wdGltaXplclN0ZXAob3B0aW9ucyB8fCB7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBUcmFpbmluZ1Nlc3Npb24gaGFzIG5vIE9wdGltaXplck1vZGVsIGxvYWRlZC4nKTtcbiAgICB9XG4gIH1cblxuICBydW5FdmFsU3RlcChmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9uc3x1bmRlZmluZWQpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBydW5FdmFsU3RlcChmZWVkczogRmVlZHNUeXBlLCBmZXRjaGVzOiBGZXRjaGVzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnN8dW5kZWZpbmVkKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgYXN5bmMgcnVuRXZhbFN0ZXAoZmVlZHM6IEZlZWRzVHlwZSwgYXJnMT86IEZldGNoZXNUeXBlfFJ1bk9wdGlvbnMsIGFyZzI/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPiB7XG4gICAgaWYgKHRoaXMuaGFzRXZhbE1vZGVsKSB7XG4gICAgICBjb25zdCBbZmV0Y2hlcywgb3B0aW9uc10gPVxuICAgICAgICAgIHRoaXMudHlwZU5hcnJvd2luZ0ZvclJ1blN0ZXAodGhpcy5ldmFsSW5wdXROYW1lcywgdGhpcy5ldmFsT3V0cHV0TmFtZXMsIGZlZWRzLCBhcmcxLCBhcmcyKTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmhhbmRsZXIucnVuRXZhbFN0ZXAoZmVlZHMsIGZldGNoZXMsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXMuY29udmVydEhhbmRsZXJSZXR1cm5UeXBlVG9NYXBPZlRlbnNvcnMocmVzdWx0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBUcmFpbmluZ1Nlc3Npb24gaGFzIG5vIEV2YWxNb2RlbCBsb2FkZWQuJyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seSA9IHRydWUpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seSk7XG4gIH1cblxuICBhc3luYyBsb2FkUGFyYW1ldGVyc0J1ZmZlcihhcnJheTogVWludDhBcnJheSwgdHJhaW5hYmxlT25seSA9IHRydWUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXJhbXNTaXplID0gYXdhaXQgdGhpcy5nZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5KTtcbiAgICAvLyBjaGVja2luZyB0aGF0IHRoZSBzaXplIG9mIHRoZSBVaW50OEFycmF5IGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJ5dGUgbGVuZ3RoIG9mIGEgRmxvYXQzMkFycmF5IG9mIHRoZSBudW1iZXJcbiAgICAvLyBvZiBwYXJhbWV0ZXJzXG4gICAgaWYgKGFycmF5Lmxlbmd0aCAhPT0gNCAqIHBhcmFtc1NpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnU2l6ZSBvZiB0aGUgYnVmZmVyIHBhc3NlZCBpbnRvIGxvYWRQYXJhbWV0ZXJzQnVmZmVyIG11c3QgbWF0Y2ggdGhlIG51bWJlciBvZiBwYXJhbWV0ZXJzIGluICcgK1xuICAgICAgICAgICd0aGUgbW9kZWwuIFBsZWFzZSB1c2UgZ2V0UGFyYW1ldGVyc1NpemUgbWV0aG9kIHRvIGNoZWNrLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmxvYWRQYXJhbWV0ZXJzQnVmZmVyKGFycmF5LCB0cmFpbmFibGVPbmx5KTtcbiAgfVxuXG4gIGFzeW5jIGdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKHRyYWluYWJsZU9ubHkgPSB0cnVlKTogUHJvbWlzZTxPbm54VmFsdWU+IHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKHRyYWluYWJsZU9ubHkpO1xuICB9XG5cbiAgYXN5bmMgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmRpc3Bvc2UoKTtcbiAgfVxufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb259IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuaW1wb3J0IHtPbm54VmFsdWV9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5pbXBvcnQge1RyYWluaW5nU2Vzc2lvbiBhcyBUcmFpbmluZ1Nlc3Npb25JbXBsfSBmcm9tICcuL3RyYWluaW5nLXNlc3Npb24taW1wbC5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFRyYWluaW5nU2Vzc2lvbiB7XG4gIC8qKlxuICAgKiBFaXRoZXIgVVJJIGZpbGUgcGF0aCAoc3RyaW5nKSBvciBVaW50OEFycmF5IGNvbnRhaW5pbmcgbW9kZWwgb3IgY2hlY2twb2ludCBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHR5cGUgVVJJb3JCdWZmZXIgPSBzdHJpbmd8VWludDhBcnJheTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBydW50aW1lIGluc3RhbmNlIG9mIGFuIE9OTlggdHJhaW5pbmcgc2Vzc2lvbixcbiAqIHdoaWNoIGNvbnRhaW5zIGEgbW9kZWwgdGhhdCBjYW4gYmUgdHJhaW5lZCwgYW5kLCBvcHRpb25hbGx5LFxuICogYW4gZXZhbCBhbmQgb3B0aW1pemVyIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYWluaW5nU2Vzc2lvbiB7XG4gIC8vICNyZWdpb24gcnVuKClcblxuICAvKipcbiAgICogTGF6aWx5IHJlc2V0cyB0aGUgZ3JhZGllbnRzIG9mIGFsbCB0cmFpbmFibGUgcGFyYW1ldGVycyB0byB6ZXJvLiBTaG91bGQgaGFwcGVuIGFmdGVyIHRoZSBpbnZvY2F0aW9uIG9mXG4gICAqIHJ1bk9wdGltaXplclN0ZXAuXG4gICAqL1xuICBsYXp5UmVzZXRHcmFkKCk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJ1biBUcmFpblN0ZXAgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3JcbiAgIGRldGFpbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCB0cmFpbmluZy5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1blRyYWluU3RlcChmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8qKlxuICAgKiBSdW4gYSBzaW5nbGUgdHJhaW4gc3RlcCB3aXRoIHRoZSBnaXZlbiBpbnB1dHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC5cbiAgICogQHBhcmFtIGZldGNoZXMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgb3V0cHV0LlxuICAgKiBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgdHJhaW5pbmcuXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZ1xuICAgdmFsdWVzLlxuICAgKi9cbiAgcnVuVHJhaW5TdGVwKFxuICAgICAgZmVlZHM6IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlLCBmZXRjaGVzOiBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlLFxuICAgICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvKipcbiAgICogUnVucyBhIHNpbmdsZSBvcHRpbWl6ZXIgc3RlcCwgd2hpY2ggcGVyZm9ybXMgd2VpZ2h0IHVwZGF0ZXMgZm9yIHRoZSB0cmFpbmFibGUgcGFyYW1ldGVycyB1c2luZyB0aGUgb3B0aW1pemVyIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIG9wdGltaXppbmcuXG4gICAqL1xuICBydW5PcHRpbWl6ZXJTdGVwKG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSdW4gYSBzaW5nbGUgZXZhbCBzdGVwIHdpdGggdGhlIGdpdmVuIGlucHV0cyBhbmQgb3B0aW9ucyB1c2luZyB0aGUgZXZhbCBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGV2YWwgc3RlcC5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nXG4gICB2YWx1ZXMuXG4gICAqL1xuICBydW5FdmFsU3RlcChmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8qKlxuICAgKiBSdW4gYSBzaW5nbGUgZXZhbCBzdGVwIHdpdGggdGhlIGdpdmVuIGlucHV0cyBhbmQgb3B0aW9ucyB1c2luZyB0aGUgZXZhbCBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LlxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuXG4gICAqIGRldGFpbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCBldmFsIHN0ZXAuXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZ1xuICAgdmFsdWVzLlxuICAgKi9cbiAgcnVuRXZhbFN0ZXAoXG4gICAgICBmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGNvcHkgcGFyYW1ldGVyc1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHNpemUgb2YgYWxsIHBhcmFtZXRlcnMgZm9yIHRoZSB0cmFpbmluZyBzdGF0ZS4gQ2FsY3VsYXRlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHByaW1pdGl2ZSAoZGF0YXR5cGUgb2ZcbiAgICogdGhlIHBhcmFtZXRlcnMpIGVsZW1lbnRzIG9mIGFsbCB0aGUgcGFyYW1ldGVycyBpbiB0aGUgdHJhaW5pbmcgc3RhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gV2hlbiBzZXQgdG8gdHJ1ZSwgdGhlIHNpemUgaXMgY2FsY3VsYXRlZCBmb3IgdHJhaW5hYmxlIHBhcmFtcyBvbmx5LiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gICAqL1xuICBnZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxudW1iZXI+O1xuXG4gIC8qKlxuICAgKiBDb3BpZXMgcGFyYW1ldGVyIHZhbHVlcyBmcm9tIHRoZSBnaXZlbiBhcnJheSB0byB0aGUgdHJhaW5pbmcgc3RhdGUuIEN1cnJlbnRseSwgb25seSBzdXBwb3J0aW5nIG1vZGVscyB3aXRoXG4gICAqIHBhcmFtZXRlcnMgb2YgdHlwZSBGbG9hdDMyLlxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gRmxvYXQzMiBidWZmZXIgY29udGFpbmluZyBwYXJhbWV0ZXJzIGNvbnZlcnRlZCB0byBhIFVpbnQ4QXJyYXkuXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gVHJ1ZSBpZiB0cmFpbmFibGUgcGFyYW1ldGVycyBvbmx5IHRvIGJlIG1vZGlmaWVkLCBmYWxzZSBvdGhlcndpc2UuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICovXG4gIGxvYWRQYXJhbWV0ZXJzQnVmZmVyKGFycmF5OiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogQ29waWVzIHRoZSBtb2RlbCBwYXJhbWV0ZXJzIHRvIGEgY29udGlndW91cyBidWZmZXIuIFVzdWFsbHkgdXNlZCBpbiB0aGUgY29udGV4dCBvZiBGZWRlcmF0ZWQgTGVhcm5pbmcuXG4gICAqIEN1cnJlbnRseSwgb25seSBzdXBwb3J0aW5nIG1vZGVscyB3aXRoIHBhcmFtZXRlcnMgb2YgdHlwZSBGbG9hdDMyLlxuICAgKlxuICAgKiBAcGFyYW0gdHJhaW5hYmxlT25seSAtIFdoZW4gc2V0IHRvIHRydWUsIG9ubHkgdHJhaW5hYmxlIHBhcmFtZXRlcnMgYXJlIGNvcGllZC4gVHJhaW5hYmxlIHBhcmFtZXRlcnMgYXJlIHBhcmFtZXRlcnNcbiAgICogZm9yIHdoaWNoIHJlcXVpcmVzX2dyYWQgaXMgc2V0IHRvIHRydWUuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBGbG9hdDMyIE9ubnhWYWx1ZSBvZiB0aGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMuXG4gICAqL1xuICBnZXRDb250aWd1b3VzUGFyYW1ldGVycyh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxPbm54VmFsdWU+O1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcblxuICAvKipcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cbiAgICovXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0YWRhdGFcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgdHJhaW5pbmcgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSB0cmFpbmluZ0lucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBHZXQgb3V0cHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgdHJhaW5pbmcgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSB0cmFpbmluZ091dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgZXZhbCBtb2RlbC4gSXMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZXZhbCBtb2RlbCBpcyBsb2FkZWQuXG4gICAqL1xuICByZWFkb25seSBldmFsSW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldCBvdXRwdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBldmFsIG1vZGVsLiBJcyBhbiBlbXB0eSBhcnJheSBpZiBubyBldmFsIG1vZGVsIGlzIGxvYWRlZC5cbiAgICovXG4gIHJlYWRvbmx5IGV2YWxPdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIG9wdGlvbmFsIHBhcmFtZXRlcnMgdGhhdCBjYW4gYmUgcGFzc2VkIGludG8gdGhlIFRyYWluaW5nU2Vzc2lvbkZhY3RvcnkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBVUkkgb3IgYnVmZmVyIGZvciBhIC5ja3B0IGZpbGUgdGhhdCBjb250YWlucyB0aGUgY2hlY2twb2ludCBmb3IgdGhlIHRyYWluaW5nIG1vZGVsLlxuICAgKi9cbiAgY2hlY2twb2ludFN0YXRlOiBUcmFpbmluZ1Nlc3Npb24uVVJJb3JCdWZmZXI7XG4gIC8qKlxuICAgKiBVUkkgb3IgYnVmZmVyIGZvciB0aGUgLm9ubnggdHJhaW5pbmcgZmlsZS5cbiAgICovXG4gIHRyYWluTW9kZWw6IFRyYWluaW5nU2Vzc2lvbi5VUklvckJ1ZmZlcjtcbiAgLyoqXG4gICAqIE9wdGlvbmFsLiBVUkkgb3IgYnVmZmVyIGZvciB0aGUgLm9ubnggb3B0aW1pemVyIG1vZGVsIGZpbGUuXG4gICAqL1xuICBvcHRpbWl6ZXJNb2RlbD86IFRyYWluaW5nU2Vzc2lvbi5VUklvckJ1ZmZlcjtcbiAgLyoqXG4gICAqIE9wdGlvbmFsLiBVUkkgb3IgYnVmZmVyIGZvciB0aGUgLm9ubnggZXZhbCBtb2RlbCBmaWxlLlxuICAgKi9cbiAgZXZhbE1vZGVsPzogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyO1xufVxuXG4vKipcbiAqIERlZmluZXMgbWV0aG9kIG92ZXJsb2FkIHBvc3NpYmlsaXRpZXMgZm9yIGNyZWF0aW5nIGEgVHJhaW5pbmdTZXNzaW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYWluaW5nU2Vzc2lvbkZhY3Rvcnkge1xuICAvLyAjcmVnaW9uIGNyZWF0ZSgpXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgVHJhaW5pbmdTZXNzaW9uIGFuZCBhc3luY2hyb25vdXNseSBsb2FkcyBhbnkgbW9kZWxzIHBhc3NlZCBpbiB0aHJvdWdoIHRyYWluaW5nT3B0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0gdHJhaW5pbmdPcHRpb25zIHNwZWNpZnkgbW9kZWxzIGFuZCBjaGVja3BvaW50cyB0byBsb2FkIGludG8gdGhlIFRyYWluaW5nIFNlc3Npb25cbiAgICogQHBhcmFtIHNlc3Npb25PcHRpb25zIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgdHJhaW5pbmcgc2Vzc2lvbiBiZWhhdmlvclxuICAgKlxuICAgKiBAcmV0dXJucyBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBUcmFpbmluZ1Nlc3Npb24gb2JqZWN0XG4gICAqL1xuICBjcmVhdGUodHJhaW5pbmdPcHRpb25zOiBUcmFpbmluZ1Nlc3Npb25DcmVhdGVPcHRpb25zLCBzZXNzaW9uT3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxUcmFpbmluZ1Nlc3Npb24+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IFRyYWluaW5nU2Vzc2lvbjogVHJhaW5pbmdTZXNzaW9uRmFjdG9yeSA9IFRyYWluaW5nU2Vzc2lvbkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8qKlxuICogIyBPTk5YIFJ1bnRpbWUgSmF2YVNjcmlwdCBBUElcbiAqXG4gKiBPTk5YIFJ1bnRpbWUgSmF2YVNjcmlwdCBBUEkgaXMgYSB1bmlmaWVkIEFQSSBmb3IgYWxsIEphdmFTY3JpcHQgdXNhZ2VzLCBpbmNsdWRpbmcgdGhlIGZvbGxvd2luZyBOUE0gcGFja2FnZXM6XG4gKlxuICogLSBbb25ueHJ1bnRpbWUtbm9kZV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtbm9kZSlcbiAqIC0gW29ubnhydW50aW1lLXdlYl0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtd2ViKVxuICogLSBbb25ueHJ1bnRpbWUtcmVhY3QtbmF0aXZlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS1yZWFjdC1uYXRpdmUpXG4gKlxuICogU2VlIGFsc286XG4gKiAtIFtHZXQgU3RhcnRlZF0oaHR0cHM6Ly9vbm54cnVudGltZS5haS9kb2NzL2dldC1zdGFydGVkL3dpdGgtamF2YXNjcmlwdC5odG1sKVxuICogLSBbSW5mZXJlbmNlIGV4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lLWluZmVyZW5jZS1leGFtcGxlcy90cmVlL21haW4vanMpXG4gKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9iYWNrZW5kLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vZW52LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3IuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90cmFjZS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLmpzJztcbiIsICJleHBvcnQgY29uc3QgY3B1cyA9IHVuZGVmaW5lZDsiLCAiZXhwb3J0IGNvbnN0IHJlYWRGaWxlID0gdW5kZWZpbmVkOyIsICJleHBvcnQgY29uc3Qgam9pbiA9IHVuZGVmaW5lZDsiLCAiXG52YXIgb3J0V2FzbSA9ICgoKSA9PiB7XG4gIHZhciBfc2NyaXB0RGlyID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0ID8gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMgOiB1bmRlZmluZWQ7XG4gIGlmICh0eXBlb2YgX19maWxlbmFtZSAhPT0gJ3VuZGVmaW5lZCcpIF9zY3JpcHREaXIgPSBfc2NyaXB0RGlyIHx8IF9fZmlsZW5hbWU7XG4gIHJldHVybiAoXG5mdW5jdGlvbihtb2R1bGVBcmcgPSB7fSkge1xuXG52YXIgaD1tb2R1bGVBcmcsYWEsYmE7aC5yZWFkeT1uZXcgUHJvbWlzZSgoYSxiKT0+e2FhPWE7YmE9Yn0pO3ZhciBjYT1PYmplY3QuYXNzaWduKHt9LGgpLGRhPVwiLi90aGlzLnByb2dyYW1cIixlYT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93LG09XCJmdW5jdGlvblwiPT10eXBlb2YgaW1wb3J0U2NyaXB0cyxmYT1cIm9iamVjdFwiPT10eXBlb2YgcHJvY2VzcyYmXCJvYmplY3RcIj09dHlwZW9mIHByb2Nlc3MudmVyc2lvbnMmJlwic3RyaW5nXCI9PXR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGUscD1cIlwiLGhhLHQsdztcbmlmKGZhKXt2YXIgZnM9cmVxdWlyZShcImZzXCIpLGlhPXJlcXVpcmUoXCJwYXRoXCIpO3A9bT9pYS5kaXJuYW1lKHApK1wiL1wiOl9fZGlybmFtZStcIi9cIjtoYT0oYSxiKT0+e2E9YS5zdGFydHNXaXRoKFwiZmlsZTovL1wiKT9uZXcgVVJMKGEpOmlhLm5vcm1hbGl6ZShhKTtyZXR1cm4gZnMucmVhZEZpbGVTeW5jKGEsYj92b2lkIDA6XCJ1dGY4XCIpfTt3PWE9PnthPWhhKGEsITApO2EuYnVmZmVyfHwoYT1uZXcgVWludDhBcnJheShhKSk7cmV0dXJuIGF9O3Q9KGEsYixjLGQ9ITApPT57YT1hLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpP25ldyBVUkwoYSk6aWEubm9ybWFsaXplKGEpO2ZzLnJlYWRGaWxlKGEsZD92b2lkIDA6XCJ1dGY4XCIsKGUsZyk9PntlP2MoZSk6YihkP2cuYnVmZmVyOmcpfSl9OyFoLnRoaXNQcm9ncmFtJiYxPHByb2Nlc3MuYXJndi5sZW5ndGgmJihkYT1wcm9jZXNzLmFyZ3ZbMV0ucmVwbGFjZSgvXFxcXC9nLFwiL1wiKSk7cHJvY2Vzcy5hcmd2LnNsaWNlKDIpO2guaW5zcGVjdD0oKT0+XCJbRW1zY3JpcHRlbiBNb2R1bGUgb2JqZWN0XVwifWVsc2UgaWYoZWF8fFxubSltP3A9c2VsZi5sb2NhdGlvbi5ocmVmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBkb2N1bWVudCYmZG9jdW1lbnQuY3VycmVudFNjcmlwdCYmKHA9ZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMpLF9zY3JpcHREaXImJihwPV9zY3JpcHREaXIpLDAhPT1wLmluZGV4T2YoXCJibG9iOlwiKT9wPXAuc3Vic3RyKDAscC5yZXBsYWNlKC9bPyNdLiovLFwiXCIpLmxhc3RJbmRleE9mKFwiL1wiKSsxKTpwPVwiXCIsaGE9YT0+e3ZhciBiPW5ldyBYTUxIdHRwUmVxdWVzdDtiLm9wZW4oXCJHRVRcIixhLCExKTtiLnNlbmQobnVsbCk7cmV0dXJuIGIucmVzcG9uc2VUZXh0fSxtJiYodz1hPT57dmFyIGI9bmV3IFhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcIkdFVFwiLGEsITEpO2IucmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIjtiLnNlbmQobnVsbCk7cmV0dXJuIG5ldyBVaW50OEFycmF5KGIucmVzcG9uc2UpfSksdD0oYSxiLGMpPT57dmFyIGQ9bmV3IFhNTEh0dHBSZXF1ZXN0O2Qub3BlbihcIkdFVFwiLGEsITApO2QucmVzcG9uc2VUeXBlPVxuXCJhcnJheWJ1ZmZlclwiO2Qub25sb2FkPSgpPT57MjAwPT1kLnN0YXR1c3x8MD09ZC5zdGF0dXMmJmQucmVzcG9uc2U/YihkLnJlc3BvbnNlKTpjKCl9O2Qub25lcnJvcj1jO2Quc2VuZChudWxsKX07dmFyIGphPWNvbnNvbGUubG9nLmJpbmQoY29uc29sZSkseD1jb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihoLGNhKTtjYT1udWxsO1wib2JqZWN0XCIhPXR5cGVvZiBXZWJBc3NlbWJseSYma2EoXCJubyBuYXRpdmUgd2FzbSBzdXBwb3J0IGRldGVjdGVkXCIpO3ZhciB6LGxhPSExLEEsQixDLEQsRSxHLG1hLG5hLG9hLHBhO1xuZnVuY3Rpb24gcWEoKXt2YXIgYT16LmJ1ZmZlcjtoLkhFQVA4PUE9bmV3IEludDhBcnJheShhKTtoLkhFQVAxNj1DPW5ldyBJbnQxNkFycmF5KGEpO2guSEVBUFU4PUI9bmV3IFVpbnQ4QXJyYXkoYSk7aC5IRUFQVTE2PUQ9bmV3IFVpbnQxNkFycmF5KGEpO2guSEVBUDMyPUU9bmV3IEludDMyQXJyYXkoYSk7aC5IRUFQVTMyPUc9bmV3IFVpbnQzMkFycmF5KGEpO2guSEVBUEYzMj1tYT1uZXcgRmxvYXQzMkFycmF5KGEpO2guSEVBUEY2ND1wYT1uZXcgRmxvYXQ2NEFycmF5KGEpO2guSEVBUDY0PW5hPW5ldyBCaWdJbnQ2NEFycmF5KGEpO2guSEVBUFU2ND1vYT1uZXcgQmlnVWludDY0QXJyYXkoYSl9dmFyIHJhPVtdLHNhPVtdLHRhPVtdLEk9MCx1YT1udWxsLEo9bnVsbDtcbmZ1bmN0aW9uIGthKGEpe2E9XCJBYm9ydGVkKFwiK2ErXCIpXCI7eChhKTtsYT0hMDthPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3IoYStcIi4gQnVpbGQgd2l0aCAtc0FTU0VSVElPTlMgZm9yIG1vcmUgaW5mby5cIik7YmEoYSk7dGhyb3cgYTt9ZnVuY3Rpb24gdmEoYSl7cmV0dXJuIGEuc3RhcnRzV2l0aChcImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxcIil9dmFyIEs7Sz1cIm9ydC13YXNtLndhc21cIjtpZighdmEoSykpe3ZhciB3YT1LO0s9aC5sb2NhdGVGaWxlP2gubG9jYXRlRmlsZSh3YSxwKTpwK3dhfWZ1bmN0aW9uIHhhKGEpe2lmKHcpcmV0dXJuIHcoYSk7dGhyb3dcImJvdGggYXN5bmMgYW5kIHN5bmMgZmV0Y2hpbmcgb2YgdGhlIHdhc20gZmFpbGVkXCI7fVxuZnVuY3Rpb24geWEoYSl7aWYoZWF8fG0pe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGZldGNoJiYhYS5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSlyZXR1cm4gZmV0Y2goYSx7Y3JlZGVudGlhbHM6XCJzYW1lLW9yaWdpblwifSkudGhlbihiPT57aWYoIWIub2spdGhyb3dcImZhaWxlZCB0byBsb2FkIHdhc20gYmluYXJ5IGZpbGUgYXQgJ1wiK2ErXCInXCI7cmV0dXJuIGIuYXJyYXlCdWZmZXIoKX0pLmNhdGNoKCgpPT54YShhKSk7aWYodClyZXR1cm4gbmV3IFByb21pc2UoKGIsYyk9Pnt0KGEsZD0+YihuZXcgVWludDhBcnJheShkKSksYyl9KX1yZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKT0+eGEoYSkpfWZ1bmN0aW9uIHphKGEsYixjKXtyZXR1cm4geWEoYSkudGhlbihkPT5XZWJBc3NlbWJseS5pbnN0YW50aWF0ZShkLGIpKS50aGVuKGQ9PmQpLnRoZW4oYyxkPT57eChgZmFpbGVkIHRvIGFzeW5jaHJvbm91c2x5IHByZXBhcmUgd2FzbTogJHtkfWApO2thKGQpfSl9XG5mdW5jdGlvbiBBYShhLGIpe3ZhciBjPUs7cmV0dXJuXCJmdW5jdGlvblwiIT10eXBlb2YgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmd8fHZhKGMpfHxjLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpfHxmYXx8XCJmdW5jdGlvblwiIT10eXBlb2YgZmV0Y2g/emEoYyxhLGIpOmZldGNoKGMse2NyZWRlbnRpYWxzOlwic2FtZS1vcmlnaW5cIn0pLnRoZW4oZD0+V2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcoZCxhKS50aGVuKGIsZnVuY3Rpb24oZSl7eChgd2FzbSBzdHJlYW1pbmcgY29tcGlsZSBmYWlsZWQ6ICR7ZX1gKTt4KFwiZmFsbGluZyBiYWNrIHRvIEFycmF5QnVmZmVyIGluc3RhbnRpYXRpb25cIik7cmV0dXJuIHphKGMsYSxiKX0pKX1cbmZ1bmN0aW9uIEJhKGEpe3RoaXMuVmE9YS0yNDt0aGlzLmZiPWZ1bmN0aW9uKGIpe0dbdGhpcy5WYSs0Pj4+Mj4+PjBdPWJ9O3RoaXMuZWI9ZnVuY3Rpb24oYil7R1t0aGlzLlZhKzg+Pj4yPj4+MF09Yn07dGhpcy5aYT1mdW5jdGlvbihiLGMpe3RoaXMuJGEoKTt0aGlzLmZiKGIpO3RoaXMuZWIoYyl9O3RoaXMuJGE9ZnVuY3Rpb24oKXtHW3RoaXMuVmErMTY+Pj4yPj4+MF09MH19XG52YXIgQ2E9MCxEYT0wLEVhPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBUZXh0RGVjb2Rlcj9uZXcgVGV4dERlY29kZXIoXCJ1dGY4XCIpOnZvaWQgMCxGYT0oYSxiLGMpPT57Yj4+Pj0wO3ZhciBkPWIrYztmb3IoYz1iO2FbY10mJiEoYz49ZCk7KSsrYztpZigxNjxjLWImJmEuYnVmZmVyJiZFYSlyZXR1cm4gRWEuZGVjb2RlKGEuc3ViYXJyYXkoYixjKSk7Zm9yKGQ9XCJcIjtiPGM7KXt2YXIgZT1hW2IrK107aWYoZSYxMjgpe3ZhciBnPWFbYisrXSY2MztpZigxOTI9PShlJjIyNCkpZCs9U3RyaW5nLmZyb21DaGFyQ29kZSgoZSYzMSk8PDZ8Zyk7ZWxzZXt2YXIgbD1hW2IrK10mNjM7ZT0yMjQ9PShlJjI0MCk/KGUmMTUpPDwxMnxnPDw2fGw6KGUmNyk8PDE4fGc8PDEyfGw8PDZ8YVtiKytdJjYzOzY1NTM2PmU/ZCs9U3RyaW5nLmZyb21DaGFyQ29kZShlKTooZS09NjU1MzYsZCs9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxlPj4xMCw1NjMyMHxlJjEwMjMpKX19ZWxzZSBkKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpfXJldHVybiBkfSxcbkw9KGEsYik9PihhPj4+PTApP0ZhKEIsYSxiKTpcIlwiLE09YT0+e2Zvcih2YXIgYj0wLGM9MDtjPGEubGVuZ3RoOysrYyl7dmFyIGQ9YS5jaGFyQ29kZUF0KGMpOzEyNz49ZD9iKys6MjA0Nz49ZD9iKz0yOjU1Mjk2PD1kJiY1NzM0Mz49ZD8oYis9NCwrK2MpOmIrPTN9cmV0dXJuIGJ9LE49KGEsYixjLGQpPT57Yz4+Pj0wO2lmKCEoMDxkKSlyZXR1cm4gMDt2YXIgZT1jO2Q9YytkLTE7Zm9yKHZhciBnPTA7ZzxhLmxlbmd0aDsrK2cpe3ZhciBsPWEuY2hhckNvZGVBdChnKTtpZig1NTI5Njw9bCYmNTczNDM+PWwpe3ZhciBrPWEuY2hhckNvZGVBdCgrK2cpO2w9NjU1MzYrKChsJjEwMjMpPDwxMCl8ayYxMDIzfWlmKDEyNz49bCl7aWYoYz49ZClicmVhaztiW2MrKz4+PjBdPWx9ZWxzZXtpZigyMDQ3Pj1sKXtpZihjKzE+PWQpYnJlYWs7YltjKys+Pj4wXT0xOTJ8bD4+Nn1lbHNle2lmKDY1NTM1Pj1sKXtpZihjKzI+PWQpYnJlYWs7YltjKys+Pj4wXT0yMjR8bD4+MTJ9ZWxzZXtpZihjKzM+PVxuZClicmVhaztiW2MrKz4+PjBdPTI0MHxsPj4xODtiW2MrKz4+PjBdPTEyOHxsPj4xMiY2M31iW2MrKz4+PjBdPTEyOHxsPj42JjYzfWJbYysrPj4+MF09MTI4fGwmNjN9fWJbYz4+PjBdPTA7cmV0dXJuIGMtZX0sR2E9YT0+e2lmKG51bGw9PT1hKXJldHVyblwibnVsbFwiO3ZhciBiPXR5cGVvZiBhO3JldHVyblwib2JqZWN0XCI9PT1ifHxcImFycmF5XCI9PT1ifHxcImZ1bmN0aW9uXCI9PT1iP2EudG9TdHJpbmcoKTpcIlwiK2F9LEhhLE89YT0+e2Zvcih2YXIgYj1cIlwiO0JbYT4+PjBdOyliKz1IYVtCW2ErKz4+PjBdXTtyZXR1cm4gYn0sSWE9e30sSmE9e30sS2E9e30sUDtcbmZ1bmN0aW9uIExhKGEsYixjPXt9KXt2YXIgZD1iLm5hbWU7aWYoIWEpdGhyb3cgbmV3IFAoYHR5cGUgXCIke2R9XCIgbXVzdCBoYXZlIGEgcG9zaXRpdmUgaW50ZWdlciB0eXBlaWQgcG9pbnRlcmApO2lmKEphLmhhc093blByb3BlcnR5KGEpKXtpZihjLmdiKXJldHVybjt0aHJvdyBuZXcgUChgQ2Fubm90IHJlZ2lzdGVyIHR5cGUgJyR7ZH0nIHR3aWNlYCk7fUphW2FdPWI7ZGVsZXRlIEthW2FdO0lhLmhhc093blByb3BlcnR5KGEpJiYoYj1JYVthXSxkZWxldGUgSWFbYV0sYi5mb3JFYWNoKGU9PmUoKSkpfWZ1bmN0aW9uIFEoYSxiLGM9e30pe2lmKCEoXCJhcmdQYWNrQWR2YW5jZVwiaW4gYikpdGhyb3cgbmV3IFR5cGVFcnJvcihcInJlZ2lzdGVyVHlwZSByZWdpc3RlcmVkSW5zdGFuY2UgcmVxdWlyZXMgYXJnUGFja0FkdmFuY2VcIik7TGEoYSxiLGMpfVxudmFyIE1hPShhLGIsYyk9Pntzd2l0Y2goYil7Y2FzZSAxOnJldHVybiBjP2Q9PkFbZD4+PjA+Pj4wXTpkPT5CW2Q+Pj4wPj4+MF07Y2FzZSAyOnJldHVybiBjP2Q9PkNbZD4+PjE+Pj4wXTpkPT5EW2Q+Pj4xPj4+MF07Y2FzZSA0OnJldHVybiBjP2Q9PkVbZD4+PjI+Pj4wXTpkPT5HW2Q+Pj4yPj4+MF07Y2FzZSA4OnJldHVybiBjP2Q9Pm5hW2Q+Pj4zXTpkPT5vYVtkPj4+M107ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKGBpbnZhbGlkIGludGVnZXIgd2lkdGggKCR7Yn0pOiAke2F9YCk7fX07ZnVuY3Rpb24gTmEoKXt0aGlzLlNhPVt2b2lkIDBdO3RoaXMuYmI9W119dmFyIFI9bmV3IE5hO2Z1bmN0aW9uIE9hKGEpe2E+Pj49MDthPj1SLlZhJiYwPT09LS1SLmdldChhKS5jYiYmUi4kYShhKX1cbnZhciBTPWE9PntpZighYSl0aHJvdyBuZXcgUChcIkNhbm5vdCB1c2UgZGVsZXRlZCB2YWwuIGhhbmRsZSA9IFwiK2EpO3JldHVybiBSLmdldChhKS52YWx1ZX0sVD1hPT57c3dpdGNoKGEpe2Nhc2Ugdm9pZCAwOnJldHVybiAxO2Nhc2UgbnVsbDpyZXR1cm4gMjtjYXNlICEwOnJldHVybiAzO2Nhc2UgITE6cmV0dXJuIDQ7ZGVmYXVsdDpyZXR1cm4gUi5aYSh7Y2I6MSx2YWx1ZTphfSl9fTtmdW5jdGlvbiBQYShhKXtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUoRVthPj4+Mj4+PjBdKX12YXIgUWE9KGEsYik9Pntzd2l0Y2goYil7Y2FzZSA0OnJldHVybiBmdW5jdGlvbihjKXtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUobWFbYz4+PjI+Pj4wXSl9O2Nhc2UgODpyZXR1cm4gZnVuY3Rpb24oYyl7cmV0dXJuIHRoaXMuZnJvbVdpcmVUeXBlKHBhW2M+Pj4zPj4+MF0pfTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgZmxvYXQgd2lkdGggKCR7Yn0pOiAke2F9YCk7fX07XG5mdW5jdGlvbiBSYShhKXtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUoR1thPj4+Mj4+PjBdKX1cbnZhciBTYT1cInVuZGVmaW5lZFwiIT10eXBlb2YgVGV4dERlY29kZXI/bmV3IFRleHREZWNvZGVyKFwidXRmLTE2bGVcIik6dm9pZCAwLFRhPShhLGIpPT57dmFyIGM9YT4+MTtmb3IodmFyIGQ9YytiLzI7IShjPj1kKSYmRFtjPj4+MF07KSsrYztjPDw9MTtpZigzMjxjLWEmJlNhKXJldHVybiBTYS5kZWNvZGUoQi5zdWJhcnJheShhPj4+MCxjPj4+MCkpO2M9XCJcIjtmb3IoZD0wOyEoZD49Yi8yKTsrK2Qpe3ZhciBlPUNbYSsyKmQ+Pj4xPj4+MF07aWYoMD09ZSlicmVhaztjKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpfXJldHVybiBjfSxVYT0oYSxiLGMpPT57dm9pZCAwPT09YyYmKGM9MjE0NzQ4MzY0Nyk7aWYoMj5jKXJldHVybiAwO2MtPTI7dmFyIGQ9YjtjPWM8MiphLmxlbmd0aD9jLzI6YS5sZW5ndGg7Zm9yKHZhciBlPTA7ZTxjOysrZSlDW2I+Pj4xPj4+MF09YS5jaGFyQ29kZUF0KGUpLGIrPTI7Q1tiPj4+MT4+PjBdPTA7cmV0dXJuIGItZH0sVmE9YT0+MiphLmxlbmd0aCxXYT0oYSxiKT0+XG57Zm9yKHZhciBjPTAsZD1cIlwiOyEoYz49Yi80KTspe3ZhciBlPUVbYSs0KmM+Pj4yPj4+MF07aWYoMD09ZSlicmVhazsrK2M7NjU1MzY8PWU/KGUtPTY1NTM2LGQrPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUyOTZ8ZT4+MTAsNTYzMjB8ZSYxMDIzKSk6ZCs9U3RyaW5nLmZyb21DaGFyQ29kZShlKX1yZXR1cm4gZH0sWGE9KGEsYixjKT0+e2I+Pj49MDt2b2lkIDA9PT1jJiYoYz0yMTQ3NDgzNjQ3KTtpZig0PmMpcmV0dXJuIDA7dmFyIGQ9YjtjPWQrYy00O2Zvcih2YXIgZT0wO2U8YS5sZW5ndGg7KytlKXt2YXIgZz1hLmNoYXJDb2RlQXQoZSk7aWYoNTUyOTY8PWcmJjU3MzQzPj1nKXt2YXIgbD1hLmNoYXJDb2RlQXQoKytlKTtnPTY1NTM2KygoZyYxMDIzKTw8MTApfGwmMTAyM31FW2I+Pj4yPj4+MF09ZztiKz00O2lmKGIrND5jKWJyZWFrfUVbYj4+PjI+Pj4wXT0wO3JldHVybiBiLWR9LFlhPWE9Pntmb3IodmFyIGI9MCxjPTA7YzxhLmxlbmd0aDsrK2Mpe3ZhciBkPWEuY2hhckNvZGVBdChjKTtcbjU1Mjk2PD1kJiY1NzM0Mz49ZCYmKytjO2IrPTR9cmV0dXJuIGJ9LFY9KGEsYik9Pnt2YXIgYz1KYVthXTtpZih2b2lkIDA9PT1jKXRocm93IGE9WmEoYSksYz1PKGEpLFUoYSksbmV3IFAoYitcIiBoYXMgdW5rbm93biB0eXBlIFwiK2MpO3JldHVybiBjfSwkYT17fSxXPWE9Pnt2YXIgYj0kYVthXTtyZXR1cm4gdm9pZCAwPT09Yj9PKGEpOmJ9LFg9W10sYmI9KCk9Plwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpLGNiPWE9Pnt2YXIgYj1YLmxlbmd0aDtYLnB1c2goYSk7cmV0dXJuIGJ9LGRiPShhLGIpPT57Zm9yKHZhciBjPUFycmF5KGEpLGQ9MDtkPGE7KytkKWNbZF09VihHW2IrNCpkPj4+Mj4+PjBdLFwicGFyYW1ldGVyIFwiK2QpO3JldHVybiBjfSxlYj1hPT57aWYodm9pZCAwPT09YSlyZXR1cm5cIl91bmtub3duXCI7YT1hLnJlcGxhY2UoL1teYS16QS1aMC05X10vZyxcIiRcIik7dmFyIGI9YS5jaGFyQ29kZUF0KDApO3JldHVybiA0ODw9XG5iJiY1Nz49Yj9gXyR7YX1gOmF9LGZiPXt9O2Z1bmN0aW9uIGdiKGEsYil7YT1lYihhKTtyZXR1cm57W2FdOmZ1bmN0aW9uKCl7cmV0dXJuIGIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX1bYV19ZnVuY3Rpb24gaGIoYSl7dmFyIGI9RnVuY3Rpb247aWYoIShiIGluc3RhbmNlb2YgRnVuY3Rpb24pKXRocm93IG5ldyBUeXBlRXJyb3IoYG5ld18gY2FsbGVkIHdpdGggY29uc3RydWN0b3IgdHlwZSAke3R5cGVvZiBifSB3aGljaCBpcyBub3QgYSBmdW5jdGlvbmApO3ZhciBjPWdiKGIubmFtZXx8XCJ1bmtub3duRnVuY3Rpb25OYW1lXCIsZnVuY3Rpb24oKXt9KTtjLnByb3RvdHlwZT1iLnByb3RvdHlwZTtjPW5ldyBjO2E9Yi5hcHBseShjLGEpO3JldHVybiBhIGluc3RhbmNlb2YgT2JqZWN0P2E6Y31cbnZhciBpYj1hPT57Zm9yKHZhciBiPVwiXCIsYz0wO2M8YTsrK2MpYis9KDAhPT1jP1wiLCBcIjpcIlwiKStcImFyZ1wiK2M7dmFyIGQ9XCJyZXR1cm4gZnVuY3Rpb24gZW12YWxfYWxsb2NhdG9yX1wiK2ErXCIoY29uc3RydWN0b3IsIGFyZ1R5cGVzLCBhcmdzKSB7XFxuICB2YXIgSEVBUFUzMiA9IGdldE1lbW9yeSgpO1xcblwiO2ZvcihjPTA7YzxhOysrYylkKz1cInZhciBhcmdUeXBlXCIrYytcIiA9IHJlcXVpcmVSZWdpc3RlcmVkVHlwZShIRUFQVTMyWygoYXJnVHlwZXMpPj4+MildLCAncGFyYW1ldGVyIFwiK2MrXCInKTtcXG52YXIgYXJnXCIrYytcIiA9IGFyZ1R5cGVcIitjK1wiLnJlYWRWYWx1ZUZyb21Qb2ludGVyKGFyZ3MpO1xcbmFyZ3MgKz0gYXJnVHlwZVwiK2MrXCJbJ2FyZ1BhY2tBZHZhbmNlJ107XFxuYXJnVHlwZXMgKz0gNDtcXG5cIjtyZXR1cm4obmV3IEZ1bmN0aW9uKFwicmVxdWlyZVJlZ2lzdGVyZWRUeXBlXCIsXCJNb2R1bGVcIixcInZhbHVlVG9IYW5kbGVcIixcImdldE1lbW9yeVwiLGQrKFwidmFyIG9iaiA9IG5ldyBjb25zdHJ1Y3RvcihcIitcbmIrXCIpO1xcbnJldHVybiB2YWx1ZVRvSGFuZGxlKG9iaik7XFxufVxcblwiKSkpKFYsaCxULCgpPT5HKX0samI9e30sWT1hPT4wPT09YSU0JiYoMCE9PWElMTAwfHwwPT09YSU0MDApLGtiPVswLDMxLDYwLDkxLDEyMSwxNTIsMTgyLDIxMywyNDQsMjc0LDMwNSwzMzVdLGxiPVswLDMxLDU5LDkwLDEyMCwxNTEsMTgxLDIxMiwyNDMsMjczLDMwNCwzMzRdLG5iPWE9Pnt2YXIgYj1NKGEpKzEsYz1tYihiKTtjJiZOKGEsQixjLGIpO3JldHVybiBjfSxvYj17fSxxYj0oKT0+e2lmKCFwYil7dmFyIGE9e1VTRVI6XCJ3ZWJfdXNlclwiLExPR05BTUU6XCJ3ZWJfdXNlclwiLFBBVEg6XCIvXCIsUFdEOlwiL1wiLEhPTUU6XCIvaG9tZS93ZWJfdXNlclwiLExBTkc6KFwib2JqZWN0XCI9PXR5cGVvZiBuYXZpZ2F0b3ImJm5hdmlnYXRvci5sYW5ndWFnZXMmJm5hdmlnYXRvci5sYW5ndWFnZXNbMF18fFwiQ1wiKS5yZXBsYWNlKFwiLVwiLFwiX1wiKStcIi5VVEYtOFwiLF86ZGF8fFwiLi90aGlzLnByb2dyYW1cIn0sYjtmb3IoYiBpbiBvYil2b2lkIDA9PT1cbm9iW2JdP2RlbGV0ZSBhW2JdOmFbYl09b2JbYl07dmFyIGM9W107Zm9yKGIgaW4gYSljLnB1c2goYCR7Yn09JHthW2JdfWApO3BiPWN9cmV0dXJuIHBifSxwYixyYj1bbnVsbCxbXSxbXV0sc2I9WzMxLDI5LDMxLDMwLDMxLDMwLDMxLDMxLDMwLDMxLDMwLDMxXSx0Yj1bMzEsMjgsMzEsMzAsMzEsMzAsMzEsMzEsMzAsMzEsMzAsMzFdO2Z1bmN0aW9uIHViKGEpe3ZhciBiPUFycmF5KE0oYSkrMSk7TihhLGIsMCxiLmxlbmd0aCk7cmV0dXJuIGJ9XG5mdW5jdGlvbiB2YihhLGIsYyxkKXtmdW5jdGlvbiBlKGYscix1KXtmb3IoZj1cIm51bWJlclwiPT10eXBlb2YgZj9mLnRvU3RyaW5nKCk6Znx8XCJcIjtmLmxlbmd0aDxyOylmPXVbMF0rZjtyZXR1cm4gZn1mdW5jdGlvbiBnKGYscil7cmV0dXJuIGUoZixyLFwiMFwiKX1mdW5jdGlvbiBsKGYscil7ZnVuY3Rpb24gdShhYil7cmV0dXJuIDA+YWI/LTE6MDxhYj8xOjB9dmFyIEg7MD09PShIPXUoZi5nZXRGdWxsWWVhcigpLXIuZ2V0RnVsbFllYXIoKSkpJiYwPT09KEg9dShmLmdldE1vbnRoKCktci5nZXRNb250aCgpKSkmJihIPXUoZi5nZXREYXRlKCktci5nZXREYXRlKCkpKTtyZXR1cm4gSH1mdW5jdGlvbiBrKGYpe3N3aXRjaChmLmdldERheSgpKXtjYXNlIDA6cmV0dXJuIG5ldyBEYXRlKGYuZ2V0RnVsbFllYXIoKS0xLDExLDI5KTtjYXNlIDE6cmV0dXJuIGY7Y2FzZSAyOnJldHVybiBuZXcgRGF0ZShmLmdldEZ1bGxZZWFyKCksMCwzKTtjYXNlIDM6cmV0dXJuIG5ldyBEYXRlKGYuZ2V0RnVsbFllYXIoKSxcbjAsMik7Y2FzZSA0OnJldHVybiBuZXcgRGF0ZShmLmdldEZ1bGxZZWFyKCksMCwxKTtjYXNlIDU6cmV0dXJuIG5ldyBEYXRlKGYuZ2V0RnVsbFllYXIoKS0xLDExLDMxKTtjYXNlIDY6cmV0dXJuIG5ldyBEYXRlKGYuZ2V0RnVsbFllYXIoKS0xLDExLDMwKX19ZnVuY3Rpb24gbihmKXt2YXIgcj1mLlRhO2ZvcihmPW5ldyBEYXRlKChuZXcgRGF0ZShmLlVhKzE5MDAsMCwxKSkuZ2V0VGltZSgpKTswPHI7KXt2YXIgdT1mLmdldE1vbnRoKCksSD0oWShmLmdldEZ1bGxZZWFyKCkpP3NiOnRiKVt1XTtpZihyPkgtZi5nZXREYXRlKCkpci09SC1mLmdldERhdGUoKSsxLGYuc2V0RGF0ZSgxKSwxMT51P2Yuc2V0TW9udGgodSsxKTooZi5zZXRNb250aCgwKSxmLnNldEZ1bGxZZWFyKGYuZ2V0RnVsbFllYXIoKSsxKSk7ZWxzZXtmLnNldERhdGUoZi5nZXREYXRlKCkrcik7YnJlYWt9fXU9bmV3IERhdGUoZi5nZXRGdWxsWWVhcigpKzEsMCw0KTtyPWsobmV3IERhdGUoZi5nZXRGdWxsWWVhcigpLFxuMCw0KSk7dT1rKHUpO3JldHVybiAwPj1sKHIsZik/MD49bCh1LGYpP2YuZ2V0RnVsbFllYXIoKSsxOmYuZ2V0RnVsbFllYXIoKTpmLmdldEZ1bGxZZWFyKCktMX1hPj4+PTA7Yj4+Pj0wO2M+Pj49MDtkPj4+PTA7dmFyIHE9R1tkKzQwPj4+Mj4+PjBdO2Q9e2tiOkVbZD4+PjI+Pj4wXSxqYjpFW2QrND4+PjI+Pj4wXSxYYTpFW2QrOD4+PjI+Pj4wXSxhYjpFW2QrMTI+Pj4yPj4+MF0sWWE6RVtkKzE2Pj4+Mj4+PjBdLFVhOkVbZCsyMD4+PjI+Pj4wXSxPYTpFW2QrMjQ+Pj4yPj4+MF0sVGE6RVtkKzI4Pj4+Mj4+PjBdLG1iOkVbZCszMj4+PjI+Pj4wXSxpYjpFW2QrMzY+Pj4yPj4+MF0sbGI6cT9MKHEpOlwiXCJ9O2M9TChjKTtxPXtcIiVjXCI6XCIlYSAlYiAlZCAlSDolTTolUyAlWVwiLFwiJURcIjpcIiVtLyVkLyV5XCIsXCIlRlwiOlwiJVktJW0tJWRcIixcIiVoXCI6XCIlYlwiLFwiJXJcIjpcIiVJOiVNOiVTICVwXCIsXCIlUlwiOlwiJUg6JU1cIixcIiVUXCI6XCIlSDolTTolU1wiLFwiJXhcIjpcIiVtLyVkLyV5XCIsXCIlWFwiOlwiJUg6JU06JVNcIixcblwiJUVjXCI6XCIlY1wiLFwiJUVDXCI6XCIlQ1wiLFwiJUV4XCI6XCIlbS8lZC8leVwiLFwiJUVYXCI6XCIlSDolTTolU1wiLFwiJUV5XCI6XCIleVwiLFwiJUVZXCI6XCIlWVwiLFwiJU9kXCI6XCIlZFwiLFwiJU9lXCI6XCIlZVwiLFwiJU9IXCI6XCIlSFwiLFwiJU9JXCI6XCIlSVwiLFwiJU9tXCI6XCIlbVwiLFwiJU9NXCI6XCIlTVwiLFwiJU9TXCI6XCIlU1wiLFwiJU91XCI6XCIldVwiLFwiJU9VXCI6XCIlVVwiLFwiJU9WXCI6XCIlVlwiLFwiJU93XCI6XCIld1wiLFwiJU9XXCI6XCIlV1wiLFwiJU95XCI6XCIleVwifTtmb3IodmFyIHYgaW4gcSljPWMucmVwbGFjZShuZXcgUmVnRXhwKHYsXCJnXCIpLHFbdl0pO3ZhciB5PVwiU3VuZGF5IE1vbmRheSBUdWVzZGF5IFdlZG5lc2RheSBUaHVyc2RheSBGcmlkYXkgU2F0dXJkYXlcIi5zcGxpdChcIiBcIiksRj1cIkphbnVhcnkgRmVicnVhcnkgTWFyY2ggQXByaWwgTWF5IEp1bmUgSnVseSBBdWd1c3QgU2VwdGVtYmVyIE9jdG9iZXIgTm92ZW1iZXIgRGVjZW1iZXJcIi5zcGxpdChcIiBcIik7cT17XCIlYVwiOmY9PnlbZi5PYV0uc3Vic3RyaW5nKDAsMyksXCIlQVwiOmY9PnlbZi5PYV0sXCIlYlwiOmY9PlxuRltmLllhXS5zdWJzdHJpbmcoMCwzKSxcIiVCXCI6Zj0+RltmLllhXSxcIiVDXCI6Zj0+ZygoZi5VYSsxOTAwKS8xMDB8MCwyKSxcIiVkXCI6Zj0+ZyhmLmFiLDIpLFwiJWVcIjpmPT5lKGYuYWIsMixcIiBcIiksXCIlZ1wiOmY9Pm4oZikudG9TdHJpbmcoKS5zdWJzdHJpbmcoMiksXCIlR1wiOmY9Pm4oZiksXCIlSFwiOmY9PmcoZi5YYSwyKSxcIiVJXCI6Zj0+e2Y9Zi5YYTswPT1mP2Y9MTI6MTI8ZiYmKGYtPTEyKTtyZXR1cm4gZyhmLDIpfSxcIiVqXCI6Zj0+e2Zvcih2YXIgcj0wLHU9MDt1PD1mLllhLTE7cis9KFkoZi5VYSsxOTAwKT9zYjp0YilbdSsrXSk7cmV0dXJuIGcoZi5hYityLDMpfSxcIiVtXCI6Zj0+ZyhmLllhKzEsMiksXCIlTVwiOmY9PmcoZi5qYiwyKSxcIiVuXCI6KCk9PlwiXFxuXCIsXCIlcFwiOmY9PjA8PWYuWGEmJjEyPmYuWGE/XCJBTVwiOlwiUE1cIixcIiVTXCI6Zj0+ZyhmLmtiLDIpLFwiJXRcIjooKT0+XCJcXHRcIixcIiV1XCI6Zj0+Zi5PYXx8NyxcIiVVXCI6Zj0+ZyhNYXRoLmZsb29yKChmLlRhKzctZi5PYSkvNyksMiksXCIlVlwiOmY9Plxue3ZhciByPU1hdGguZmxvb3IoKGYuVGErNy0oZi5PYSs2KSU3KS83KTsyPj0oZi5PYSszNzEtZi5UYS0yKSU3JiZyKys7aWYocik1Mz09ciYmKHU9KGYuT2ErMzcxLWYuVGEpJTcsND09dXx8Mz09dSYmWShmLlVhKXx8KHI9MSkpO2Vsc2V7cj01Mjt2YXIgdT0oZi5PYSs3LWYuVGEtMSklNzsoND09dXx8NT09dSYmWShmLlVhJTQwMC0xKSkmJnIrK31yZXR1cm4gZyhyLDIpfSxcIiV3XCI6Zj0+Zi5PYSxcIiVXXCI6Zj0+ZyhNYXRoLmZsb29yKChmLlRhKzctKGYuT2ErNiklNykvNyksMiksXCIleVwiOmY9PihmLlVhKzE5MDApLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpLFwiJVlcIjpmPT5mLlVhKzE5MDAsXCIlelwiOmY9PntmPWYuaWI7dmFyIHI9MDw9ZjtmPU1hdGguYWJzKGYpLzYwO3JldHVybihyP1wiK1wiOlwiLVwiKStTdHJpbmcoXCIwMDAwXCIrKGYvNjAqMTAwK2YlNjApKS5zbGljZSgtNCl9LFwiJVpcIjpmPT5mLmxiLFwiJSVcIjooKT0+XCIlXCJ9O2M9Yy5yZXBsYWNlKC8lJS9nLFwiXFx4MDBcXHgwMFwiKTtmb3IodiBpbiBxKWMuaW5jbHVkZXModikmJlxuKGM9Yy5yZXBsYWNlKG5ldyBSZWdFeHAodixcImdcIikscVt2XShkKSkpO2M9Yy5yZXBsYWNlKC9cXDBcXDAvZyxcIiVcIik7dj11YihjKTtpZih2Lmxlbmd0aD5iKXJldHVybiAwO0Euc2V0KHYsYT4+PjApO3JldHVybiB2Lmxlbmd0aC0xfWZvcih2YXIgd2I9QXJyYXkoMjU2KSx4Yj0wOzI1Nj54YjsrK3hiKXdiW3hiXT1TdHJpbmcuZnJvbUNoYXJDb2RlKHhiKTtIYT13YjtQPWguQmluZGluZ0Vycm9yPWNsYXNzIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoYSl7c3VwZXIoYSk7dGhpcy5uYW1lPVwiQmluZGluZ0Vycm9yXCJ9fTtoLkludGVybmFsRXJyb3I9Y2xhc3MgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihhKXtzdXBlcihhKTt0aGlzLm5hbWU9XCJJbnRlcm5hbEVycm9yXCJ9fTtcbk9iamVjdC5hc3NpZ24oTmEucHJvdG90eXBlLHtnZXQoYSl7cmV0dXJuIHRoaXMuU2FbYV19LGhhcyhhKXtyZXR1cm4gdm9pZCAwIT09dGhpcy5TYVthXX0sWmEoYSl7dmFyIGI9dGhpcy5iYi5wb3AoKXx8dGhpcy5TYS5sZW5ndGg7dGhpcy5TYVtiXT1hO3JldHVybiBifSwkYShhKXt0aGlzLlNhW2FdPXZvaWQgMDt0aGlzLmJiLnB1c2goYSl9fSk7Ui5TYS5wdXNoKHt2YWx1ZTp2b2lkIDB9LHt2YWx1ZTpudWxsfSx7dmFsdWU6ITB9LHt2YWx1ZTohMX0pO1IuVmE9Ui5TYS5sZW5ndGg7aC5jb3VudF9lbXZhbF9oYW5kbGVzPSgpPT57Zm9yKHZhciBhPTAsYj1SLlZhO2I8Ui5TYS5sZW5ndGg7KytiKXZvaWQgMCE9PVIuU2FbYl0mJisrYTtyZXR1cm4gYX07XG52YXIgeWI9e2E6ZnVuY3Rpb24oYSxiLGMpe2E+Pj49MDsobmV3IEJhKGEpKS5aYShiPj4+MCxjPj4+MCk7Q2E9YTtEYSsrO3Rocm93IENhO30sdjpmdW5jdGlvbigpe3JldHVybiAwfSxiYTpmdW5jdGlvbigpe30sTjpmdW5jdGlvbigpe30sUDpmdW5jdGlvbigpe30sSDpmdW5jdGlvbigpe3JldHVybiAwfSwkOmZ1bmN0aW9uKCl7fSxWOmZ1bmN0aW9uKCl7fSxfOmZ1bmN0aW9uKCl7fSxCOmZ1bmN0aW9uKCl7fSxPOmZ1bmN0aW9uKCl7fSxMOmZ1bmN0aW9uKCl7fSxhYTpmdW5jdGlvbigpe30sTTpmdW5jdGlvbigpe30sRTpmdW5jdGlvbihhLGIsYyxkLGUpe2I+Pj49MDtiPU8oYik7dmFyIGc9LTEhPWIuaW5kZXhPZihcInVcIik7ZyYmKGU9KDFuPDw2NG4pLTFuKTtRKGE+Pj4wLHtuYW1lOmIsZnJvbVdpcmVUeXBlOmw9PmwsdG9XaXJlVHlwZTpmdW5jdGlvbihsLGspe2lmKFwiYmlnaW50XCIhPXR5cGVvZiBrJiZcIm51bWJlclwiIT10eXBlb2Ygayl0aHJvdyBuZXcgVHlwZUVycm9yKGBDYW5ub3QgY29udmVydCBcIiR7R2Eoayl9XCIgdG8gJHt0aGlzLm5hbWV9YCk7XG5pZihrPGR8fGs+ZSl0aHJvdyBuZXcgVHlwZUVycm9yKGBQYXNzaW5nIGEgbnVtYmVyIFwiJHtHYShrKX1cIiBmcm9tIEpTIHNpZGUgdG8gQy9DKysgc2lkZSB0byBhbiBhcmd1bWVudCBvZiB0eXBlIFwiJHtifVwiLCB3aGljaCBpcyBvdXRzaWRlIHRoZSB2YWxpZCByYW5nZSBbJHtkfSwgJHtlfV0hYCk7cmV0dXJuIGt9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6TWEoYixjPj4+MCwhZyksV2E6bnVsbH0pfSxlYTpmdW5jdGlvbihhLGIsYyxkKXtiPU8oYj4+PjApO1EoYT4+PjAse25hbWU6Yixmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7cmV0dXJuISFlfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGUsZyl7cmV0dXJuIGc/YzpkfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShCW2U+Pj4wXSl9LFdhOm51bGx9KX0sZGE6ZnVuY3Rpb24oYSxiKXtiPU8oYj4+PjApO1EoYT4+PjAse25hbWU6YixcbmZyb21XaXJlVHlwZTpjPT57dmFyIGQ9UyhjKTtPYShjKTtyZXR1cm4gZH0sdG9XaXJlVHlwZTooYyxkKT0+VChkKSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOlBhLFdhOm51bGx9KX0sRDpmdW5jdGlvbihhLGIsYyl7Yj1PKGI+Pj4wKTtRKGE+Pj4wLHtuYW1lOmIsZnJvbVdpcmVUeXBlOmQ9PmQsdG9XaXJlVHlwZTooZCxlKT0+ZSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOlFhKGIsYz4+PjApLFdhOm51bGx9KX0scDpmdW5jdGlvbihhLGIsYyxkLGUpe2E+Pj49MDtjPj4+PTA7Yj1PKGI+Pj4wKTstMT09PWUmJihlPTQyOTQ5NjcyOTUpO2U9az0+aztpZigwPT09ZCl7dmFyIGc9MzItOCpjO2U9az0+azw8Zz4+Pmd9dmFyIGw9Yi5pbmNsdWRlcyhcInVuc2lnbmVkXCIpP2Z1bmN0aW9uKGssbil7cmV0dXJuIG4+Pj4wfTpmdW5jdGlvbihrLG4pe3JldHVybiBufTtRKGEse25hbWU6Yixmcm9tV2lyZVR5cGU6ZSx0b1dpcmVUeXBlOmwsYXJnUGFja0FkdmFuY2U6OCxcbnJlYWRWYWx1ZUZyb21Qb2ludGVyOk1hKGIsYywwIT09ZCksV2E6bnVsbH0pfSxsOmZ1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBkKGcpe3JldHVybiBuZXcgZShBLmJ1ZmZlcixHW2crND4+PjI+Pj4wXSxHW2c+Pj4yPj4+MF0pfXZhciBlPVtJbnQ4QXJyYXksVWludDhBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheSxCaWdJbnQ2NEFycmF5LEJpZ1VpbnQ2NEFycmF5XVtiXTtjPU8oYz4+PjApO1EoYT4+PjAse25hbWU6Yyxmcm9tV2lyZVR5cGU6ZCxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmR9LHtnYjohMH0pfSxGOmZ1bmN0aW9uKGEsYil7Yj1PKGI+Pj4wKTt2YXIgYz1cInN0ZDo6c3RyaW5nXCI9PT1iO1EoYT4+PjAse25hbWU6Yixmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZCl7dmFyIGU9R1tkPj4+Mj4+PjBdLGc9ZCs0O2lmKGMpZm9yKHZhciBsPWcsaz0wO2s8PWU7KytrKXt2YXIgbj1cbmcraztpZihrPT1lfHwwPT1CW24+Pj4wXSl7bD1MKGwsbi1sKTtpZih2b2lkIDA9PT1xKXZhciBxPWw7ZWxzZSBxKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDApLHErPWw7bD1uKzF9fWVsc2V7cT1BcnJheShlKTtmb3Ioaz0wO2s8ZTsrK2spcVtrXT1TdHJpbmcuZnJvbUNoYXJDb2RlKEJbZytrPj4+MF0pO3E9cS5qb2luKFwiXCIpfVUoZCk7cmV0dXJuIHF9LHRvV2lyZVR5cGU6ZnVuY3Rpb24oZCxlKXtlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXImJihlPW5ldyBVaW50OEFycmF5KGUpKTt2YXIgZz1cInN0cmluZ1wiPT10eXBlb2YgZTtpZighKGd8fGUgaW5zdGFuY2VvZiBVaW50OEFycmF5fHxlIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXl8fGUgaW5zdGFuY2VvZiBJbnQ4QXJyYXkpKXRocm93IG5ldyBQKFwiQ2Fubm90IHBhc3Mgbm9uLXN0cmluZyB0byBzdGQ6OnN0cmluZ1wiKTt2YXIgbD1jJiZnP00oZSk6ZS5sZW5ndGg7dmFyIGs9bWIoNCtsKzEpLG49ays0O0dbaz4+PjI+Pj4wXT1sO1xuaWYoYyYmZylOKGUsQixuLGwrMSk7ZWxzZSBpZihnKWZvcihnPTA7ZzxsOysrZyl7dmFyIHE9ZS5jaGFyQ29kZUF0KGcpO2lmKDI1NTxxKXRocm93IFUobiksbmV3IFAoXCJTdHJpbmcgaGFzIFVURi0xNiBjb2RlIHVuaXRzIHRoYXQgZG8gbm90IGZpdCBpbiA4IGJpdHNcIik7QltuK2c+Pj4wXT1xfWVsc2UgZm9yKGc9MDtnPGw7KytnKUJbbitnPj4+MF09ZVtnXTtudWxsIT09ZCYmZC5wdXNoKFUsayk7cmV0dXJuIGt9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6UmEsV2EoZCl7VShkKX19KX0seDpmdW5jdGlvbihhLGIsYyl7Yj4+Pj0wO2M+Pj49MDtjPU8oYyk7aWYoMj09PWIpe3ZhciBkPVRhO3ZhciBlPVVhO3ZhciBnPVZhO3ZhciBsPSgpPT5EO3ZhciBrPTF9ZWxzZSA0PT09YiYmKGQ9V2EsZT1YYSxnPVlhLGw9KCk9Pkcsaz0yKTtRKGE+Pj4wLHtuYW1lOmMsZnJvbVdpcmVUeXBlOm49Pntmb3IodmFyIHE9R1tuPj4+Mj4+PjBdLHY9bCgpLHksRj1uKzQsZj1cbjA7Zjw9cTsrK2Ype3ZhciByPW4rNCtmKmI7aWYoZj09cXx8MD09dltyPj4+a10pRj1kKEYsci1GKSx2b2lkIDA9PT15P3k9RjooeSs9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSx5Kz1GKSxGPXIrYn1VKG4pO3JldHVybiB5fSx0b1dpcmVUeXBlOihuLHEpPT57aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHEpdGhyb3cgbmV3IFAoYENhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gQysrIHN0cmluZyB0eXBlICR7Y31gKTt2YXIgdj1nKHEpLHk9bWIoNCt2K2IpO0dbeT4+PjJdPXY+Pms7ZShxLHkrNCx2K2IpO251bGwhPT1uJiZuLnB1c2goVSx5KTtyZXR1cm4geX0sYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpQYSxXYShuKXtVKG4pfX0pfSxmYTpmdW5jdGlvbihhLGIpe2I9TyhiPj4+MCk7UShhPj4+MCx7aGI6ITAsbmFtZTpiLGFyZ1BhY2tBZHZhbmNlOjAsZnJvbVdpcmVUeXBlOigpPT57fSx0b1dpcmVUeXBlOigpPT57fX0pfSxjYTooKT0+ITAsbzpmdW5jdGlvbihhLGIsXG5jKXtiPj4+PTA7Yz4+Pj0wO2E9UyhhPj4+MCk7Yj1WKGIsXCJlbXZhbDo6YXNcIik7dmFyIGQ9W10sZT1UKGQpO0dbYz4+PjI+Pj4wXT1lO3JldHVybiBiLnRvV2lyZVR5cGUoZCxhKX0saDpmdW5jdGlvbihhLGIsYyxkLGUpe2M+Pj49MDtkPj4+PTA7ZT4+Pj0wO2E9WFthPj4+MF07Yj1TKGI+Pj4wKTtjPVcoYyk7dmFyIGc9W107R1tkPj4+Mj4+PjBdPVQoZyk7cmV0dXJuIGEoYixjLGcsZSl9LHI6ZnVuY3Rpb24oYSxiLGMsZCl7Yz4+Pj0wO2Q+Pj49MDthPVhbYT4+PjBdO2I9UyhiPj4+MCk7Yz1XKGMpO2EoYixjLG51bGwsZCl9LGI6T2EseTpmdW5jdGlvbihhLGIpe2I+Pj49MDthPVMoYT4+PjApO2I9UyhiKTtyZXR1cm4gYT09Yn0sdTpmdW5jdGlvbihhKXthPj4+PTA7aWYoMD09PWEpcmV0dXJuIFQoYmIoKSk7YT1XKGEpO3JldHVybiBUKGJiKClbYV0pfSxnOmZ1bmN0aW9uKGEsYil7dmFyIGM9ZGIoYSxiPj4+MCksZD1jWzBdO2I9ZC5uYW1lK1wiXyRcIitjLnNsaWNlKDEpLm1hcChmdW5jdGlvbih2KXtyZXR1cm4gdi5uYW1lfSkuam9pbihcIl9cIikrXG5cIiRcIjt2YXIgZT1mYltiXTtpZih2b2lkIDAhPT1lKXJldHVybiBlO2U9W1wicmV0VHlwZVwiXTtmb3IodmFyIGc9W2RdLGw9XCJcIixrPTA7azxhLTE7KytrKWwrPSgwIT09az9cIiwgXCI6XCJcIikrXCJhcmdcIitrLGUucHVzaChcImFyZ1R5cGVcIitrKSxnLnB1c2goY1sxK2tdKTt2YXIgbj1cInJldHVybiBmdW5jdGlvbiBcIitlYihcIm1ldGhvZENhbGxlcl9cIitiKStcIihoYW5kbGUsIG5hbWUsIGRlc3RydWN0b3JzLCBhcmdzKSB7XFxuXCIscT0wO2ZvcihrPTA7azxhLTE7KytrKW4rPVwiICAgIHZhciBhcmdcIitrK1wiID0gYXJnVHlwZVwiK2srXCIucmVhZFZhbHVlRnJvbVBvaW50ZXIoYXJnc1wiKyhxP1wiK1wiK3E6XCJcIikrXCIpO1xcblwiLHErPWNbaysxXS5hcmdQYWNrQWR2YW5jZTtuKz1cIiAgICB2YXIgcnYgPSBoYW5kbGVbbmFtZV0oXCIrbCtcIik7XFxuXCI7Zm9yKGs9MDtrPGEtMTsrK2spY1trKzFdLmRlbGV0ZU9iamVjdCYmKG4rPVwiICAgIGFyZ1R5cGVcIitrK1wiLmRlbGV0ZU9iamVjdChhcmdcIitrK1wiKTtcXG5cIik7ZC5oYnx8XG4obis9XCIgICAgcmV0dXJuIHJldFR5cGUudG9XaXJlVHlwZShkZXN0cnVjdG9ycywgcnYpO1xcblwiKTtlLnB1c2gobitcIn07XFxuXCIpO2E9aGIoZSkuYXBwbHkobnVsbCxnKTtlPWNiKGEpO3JldHVybiBmYltiXT1lfSxxOmZ1bmN0aW9uKGEsYil7Yj4+Pj0wO2E9UyhhPj4+MCk7Yj1TKGIpO3JldHVybiBUKGFbYl0pfSxjOmZ1bmN0aW9uKGEpe2E+Pj49MDs0PGEmJihSLmdldChhKS5jYis9MSl9LEc6ZnVuY3Rpb24oYSxiLGMsZCl7Yz4+Pj0wO2Q+Pj49MDthPVMoYT4+PjApO3ZhciBlPWpiW2JdO2V8fChlPWliKGIpLGpiW2JdPWUpO3JldHVybiBlKGEsYyxkKX0sczpmdW5jdGlvbigpe3JldHVybiBUKFtdKX0sazpmdW5jdGlvbihhKXthPVMoYT4+PjApO2Zvcih2YXIgYj1BcnJheShhLmxlbmd0aCksYz0wO2M8YS5sZW5ndGg7YysrKWJbY109YVtjXTtyZXR1cm4gVChiKX0sZDpmdW5jdGlvbihhKXtyZXR1cm4gVChXKGE+Pj4wKSl9LGo6ZnVuY3Rpb24oKXtyZXR1cm4gVCh7fSl9LGU6ZnVuY3Rpb24oYSl7YT4+Pj1cbjA7Zm9yKHZhciBiPVMoYSk7Yi5sZW5ndGg7KXt2YXIgYz1iLnBvcCgpO2IucG9wKCkoYyl9T2EoYSl9LGk6ZnVuY3Rpb24oYSxiLGMpe2I+Pj49MDtjPj4+PTA7YT1TKGE+Pj4wKTtiPVMoYik7Yz1TKGMpO2FbYl09Y30sZjpmdW5jdGlvbihhLGIpe2I+Pj49MDthPVYoYT4+PjAsXCJfZW12YWxfdGFrZV92YWx1ZVwiKTthPWEucmVhZFZhbHVlRnJvbVBvaW50ZXIoYik7cmV0dXJuIFQoYSl9LFM6ZnVuY3Rpb24oYSxiKXthPS05MDA3MTk5MjU0NzQwOTkyPmF8fDkwMDcxOTkyNTQ3NDA5OTI8YT9OYU46TnVtYmVyKGEpO2I+Pj49MDthPW5ldyBEYXRlKDFFMyphKTtFW2I+Pj4yPj4+MF09YS5nZXRVVENTZWNvbmRzKCk7RVtiKzQ+Pj4yPj4+MF09YS5nZXRVVENNaW51dGVzKCk7RVtiKzg+Pj4yPj4+MF09YS5nZXRVVENIb3VycygpO0VbYisxMj4+PjI+Pj4wXT1hLmdldFVUQ0RhdGUoKTtFW2IrMTY+Pj4yPj4+MF09YS5nZXRVVENNb250aCgpO0VbYisyMD4+PjI+Pj4wXT1hLmdldFVUQ0Z1bGxZZWFyKCktXG4xOTAwO0VbYisyND4+PjI+Pj4wXT1hLmdldFVUQ0RheSgpO0VbYisyOD4+PjI+Pj4wXT0oYS5nZXRUaW1lKCktRGF0ZS5VVEMoYS5nZXRVVENGdWxsWWVhcigpLDAsMSwwLDAsMCwwKSkvODY0RTV8MH0sVDpmdW5jdGlvbihhLGIpe2E9LTkwMDcxOTkyNTQ3NDA5OTI+YXx8OTAwNzE5OTI1NDc0MDk5MjxhP05hTjpOdW1iZXIoYSk7Yj4+Pj0wO2E9bmV3IERhdGUoMUUzKmEpO0VbYj4+PjI+Pj4wXT1hLmdldFNlY29uZHMoKTtFW2IrND4+PjI+Pj4wXT1hLmdldE1pbnV0ZXMoKTtFW2IrOD4+PjI+Pj4wXT1hLmdldEhvdXJzKCk7RVtiKzEyPj4+Mj4+PjBdPWEuZ2V0RGF0ZSgpO0VbYisxNj4+PjI+Pj4wXT1hLmdldE1vbnRoKCk7RVtiKzIwPj4+Mj4+PjBdPWEuZ2V0RnVsbFllYXIoKS0xOTAwO0VbYisyND4+PjI+Pj4wXT1hLmdldERheSgpO0VbYisyOD4+PjI+Pj4wXT0oWShhLmdldEZ1bGxZZWFyKCkpP2tiOmxiKVthLmdldE1vbnRoKCldK2EuZ2V0RGF0ZSgpLTF8MDtFW2IrMzY+Pj5cbjI+Pj4wXT0tKDYwKmEuZ2V0VGltZXpvbmVPZmZzZXQoKSk7dmFyIGM9KG5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSw2LDEpKS5nZXRUaW1lem9uZU9mZnNldCgpLGQ9KG5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSwwLDEpKS5nZXRUaW1lem9uZU9mZnNldCgpO0VbYiszMj4+PjI+Pj4wXT0oYyE9ZCYmYS5nZXRUaW1lem9uZU9mZnNldCgpPT1NYXRoLm1pbihkLGMpKXwwfSxVOmZ1bmN0aW9uKGEpe2E+Pj49MDt2YXIgYj1uZXcgRGF0ZShFW2ErMjA+Pj4yPj4+MF0rMTkwMCxFW2ErMTY+Pj4yPj4+MF0sRVthKzEyPj4+Mj4+PjBdLEVbYSs4Pj4+Mj4+PjBdLEVbYSs0Pj4+Mj4+PjBdLEVbYT4+PjI+Pj4wXSwwKSxjPUVbYSszMj4+PjI+Pj4wXSxkPWIuZ2V0VGltZXpvbmVPZmZzZXQoKSxlPShuZXcgRGF0ZShiLmdldEZ1bGxZZWFyKCksNiwxKSkuZ2V0VGltZXpvbmVPZmZzZXQoKSxnPShuZXcgRGF0ZShiLmdldEZ1bGxZZWFyKCksMCwxKSkuZ2V0VGltZXpvbmVPZmZzZXQoKSxsPU1hdGgubWluKGcsXG5lKTswPmM/RVthKzMyPj4+Mj4+PjBdPU51bWJlcihlIT1nJiZsPT1kKTowPGMhPShsPT1kKSYmKGU9TWF0aC5tYXgoZyxlKSxiLnNldFRpbWUoYi5nZXRUaW1lKCkrNkU0KigoMDxjP2w6ZSktZCkpKTtFW2ErMjQ+Pj4yPj4+MF09Yi5nZXREYXkoKTtFW2ErMjg+Pj4yPj4+MF09KFkoYi5nZXRGdWxsWWVhcigpKT9rYjpsYilbYi5nZXRNb250aCgpXStiLmdldERhdGUoKS0xfDA7RVthPj4+Mj4+PjBdPWIuZ2V0U2Vjb25kcygpO0VbYSs0Pj4+Mj4+PjBdPWIuZ2V0TWludXRlcygpO0VbYSs4Pj4+Mj4+PjBdPWIuZ2V0SG91cnMoKTtFW2ErMTI+Pj4yPj4+MF09Yi5nZXREYXRlKCk7RVthKzE2Pj4+Mj4+PjBdPWIuZ2V0TW9udGgoKTtFW2ErMjA+Pj4yPj4+MF09Yi5nZXRZZWFyKCk7cmV0dXJuIEJpZ0ludChiLmdldFRpbWUoKS8xRTMpfSxROmZ1bmN0aW9uKCl7cmV0dXJuLTUyfSxSOmZ1bmN0aW9uKCl7fSxKOmZ1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBkKG4pe3JldHVybihuPW4udG9UaW1lU3RyaW5nKCkubWF0Y2goL1xcKChbQS1aYS16IF0rKVxcKSQvKSk/XG5uWzFdOlwiR01UXCJ9Yz4+Pj0wO3ZhciBlPShuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKSxnPW5ldyBEYXRlKGUsMCwxKSxsPW5ldyBEYXRlKGUsNiwxKTtlPWcuZ2V0VGltZXpvbmVPZmZzZXQoKTt2YXIgaz1sLmdldFRpbWV6b25lT2Zmc2V0KCk7R1thPj4+MD4+PjI+Pj4wXT02MCpNYXRoLm1heChlLGspO0VbYj4+PjA+Pj4yPj4+MF09TnVtYmVyKGUhPWspO2E9ZChnKTtiPWQobCk7YT1uYihhKTtiPW5iKGIpO2s8ZT8oR1tjPj4+Mj4+PjBdPWEsR1tjKzQ+Pj4yPj4+MF09Yik6KEdbYz4+PjI+Pj4wXT1iLEdbYys0Pj4+Mj4+PjBdPWEpfSx0OigpPT57a2EoXCJcIil9LEM6KCk9PkRhdGUubm93KCksSzpmdW5jdGlvbigpe3JldHVybiA0Mjk0OTAxNzYwfSxuOigpPT5wZXJmb3JtYW5jZS5ub3coKSxaOmZ1bmN0aW9uKGEsYixjKXtiPj4+PTA7cmV0dXJuIEIuY29weVdpdGhpbihhPj4+MD4+PjAsYj4+PjAsYisoYz4+PjApPj4+MCl9LEk6ZnVuY3Rpb24oYSl7YT4+Pj0wO3ZhciBiPUIubGVuZ3RoO1xuaWYoNDI5NDkwMTc2MDxhKXJldHVybiExO2Zvcih2YXIgYz0xOzQ+PWM7Yyo9Mil7dmFyIGQ9YiooMSsuMi9jKTtkPU1hdGgubWluKGQsYSsxMDA2NjMyOTYpO3ZhciBlPU1hdGg7ZD1NYXRoLm1heChhLGQpO2E6e2U9KGUubWluLmNhbGwoZSw0Mjk0OTAxNzYwLGQrKDY1NTM2LWQlNjU1MzYpJTY1NTM2KS16LmJ1ZmZlci5ieXRlTGVuZ3RoKzY1NTM1KS82NTUzNjt0cnl7ei5ncm93KGUpO3FhKCk7dmFyIGc9MTticmVhayBhfWNhdGNoKGwpe31nPXZvaWQgMH1pZihnKXJldHVybiEwfXJldHVybiExfSxYOmZ1bmN0aW9uKGEsYil7YT4+Pj0wO2I+Pj49MDt2YXIgYz0wO3FiKCkuZm9yRWFjaCgoZCxlKT0+e3ZhciBnPWIrYztlPUdbYSs0KmU+Pj4yPj4+MF09Zztmb3IoZz0wO2c8ZC5sZW5ndGg7KytnKUFbZSsrPj4+MD4+PjBdPWQuY2hhckNvZGVBdChnKTtBW2U+Pj4wPj4+MF09MDtjKz1kLmxlbmd0aCsxfSk7cmV0dXJuIDB9LFk6ZnVuY3Rpb24oYSxiKXthPj4+PTA7Yj4+Pj0wO3ZhciBjPVxucWIoKTtHW2E+Pj4yPj4+MF09Yy5sZW5ndGg7dmFyIGQ9MDtjLmZvckVhY2goZT0+ZCs9ZS5sZW5ndGgrMSk7R1tiPj4+Mj4+PjBdPWQ7cmV0dXJuIDB9LHc6KCk9PjUyLEE6ZnVuY3Rpb24oKXtyZXR1cm4gNTJ9LFc6ZnVuY3Rpb24oKXtyZXR1cm4gNzB9LHo6ZnVuY3Rpb24oYSxiLGMsZCl7Yj4+Pj0wO2M+Pj49MDtkPj4+PTA7Zm9yKHZhciBlPTAsZz0wO2c8YztnKyspe3ZhciBsPUdbYj4+PjI+Pj4wXSxrPUdbYis0Pj4+Mj4+PjBdO2IrPTg7Zm9yKHZhciBuPTA7bjxrO24rKyl7dmFyIHE9QltsK24+Pj4wXSx2PXJiW2FdOzA9PT1xfHwxMD09PXE/KCgxPT09YT9qYTp4KShGYSh2LDApKSx2Lmxlbmd0aD0wKTp2LnB1c2gocSl9ZSs9a31HW2Q+Pj4yPj4+MF09ZTtyZXR1cm4gMH0sZ2E6dmIsbTpmdW5jdGlvbihhLGIsYyxkKXtyZXR1cm4gdmIoYT4+PjAsYj4+PjAsYz4+PjAsZD4+PjApfX0sWj1mdW5jdGlvbigpe3ZhciBhPXthOnlifTtJKys7QWEoYSxmdW5jdGlvbihiKXtaPWIuaW5zdGFuY2UuZXhwb3J0cztcblo9emIoKTt6PVouaGE7cWEoKTtzYS51bnNoaWZ0KFouaWEpO0ktLTswPT1JJiYobnVsbCE9PXVhJiYoY2xlYXJJbnRlcnZhbCh1YSksdWE9bnVsbCksSiYmKGI9SixKPW51bGwsYigpKSl9KS5jYXRjaChiYSk7cmV0dXJue319KCk7aC5fT3J0SW5pdD0oYSxiKT0+KGguX09ydEluaXQ9Wi5qYSkoYSxiKTtoLl9PcnRHZXRMYXN0RXJyb3I9KGEsYik9PihoLl9PcnRHZXRMYXN0RXJyb3I9Wi5rYSkoYSxiKTtoLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucz0oYSxiLGMsZCxlLGcsbCxrLG4scSk9PihoLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucz1aLmxhKShhLGIsYyxkLGUsZyxsLGssbixxKTtoLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcj0oYSxiKT0+KGguX09ydEFwcGVuZEV4ZWN1dGlvblByb3ZpZGVyPVoubWEpKGEsYik7aC5fT3J0QWRkRnJlZURpbWVuc2lvbk92ZXJyaWRlPShhLGIsYyk9PihoLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGU9Wi5uYSkoYSxiLGMpO1xuaC5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5PShhLGIsYyk9PihoLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnk9Wi5vYSkoYSxiLGMpO2guX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucz1hPT4oaC5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zPVoucGEpKGEpO2guX09ydENyZWF0ZVNlc3Npb249KGEsYixjKT0+KGguX09ydENyZWF0ZVNlc3Npb249Wi5xYSkoYSxiLGMpO2guX09ydFJlbGVhc2VTZXNzaW9uPWE9PihoLl9PcnRSZWxlYXNlU2Vzc2lvbj1aLnJhKShhKTtoLl9PcnRHZXRJbnB1dE91dHB1dENvdW50PShhLGIsYyk9PihoLl9PcnRHZXRJbnB1dE91dHB1dENvdW50PVouc2EpKGEsYixjKTtoLl9PcnRHZXRJbnB1dE5hbWU9KGEsYik9PihoLl9PcnRHZXRJbnB1dE5hbWU9Wi50YSkoYSxiKTtoLl9PcnRHZXRPdXRwdXROYW1lPShhLGIpPT4oaC5fT3J0R2V0T3V0cHV0TmFtZT1aLnVhKShhLGIpO2guX09ydEZyZWU9YT0+KGguX09ydEZyZWU9Wi52YSkoYSk7XG5oLl9PcnRDcmVhdGVUZW5zb3I9KGEsYixjLGQsZSxnKT0+KGguX09ydENyZWF0ZVRlbnNvcj1aLndhKShhLGIsYyxkLGUsZyk7aC5fT3J0R2V0VGVuc29yRGF0YT0oYSxiLGMsZCxlKT0+KGguX09ydEdldFRlbnNvckRhdGE9Wi54YSkoYSxiLGMsZCxlKTtoLl9PcnRSZWxlYXNlVGVuc29yPWE9PihoLl9PcnRSZWxlYXNlVGVuc29yPVoueWEpKGEpO2guX09ydENyZWF0ZVJ1bk9wdGlvbnM9KGEsYixjLGQpPT4oaC5fT3J0Q3JlYXRlUnVuT3B0aW9ucz1aLnphKShhLGIsYyxkKTtoLl9PcnRBZGRSdW5Db25maWdFbnRyeT0oYSxiLGMpPT4oaC5fT3J0QWRkUnVuQ29uZmlnRW50cnk9Wi5BYSkoYSxiLGMpO2guX09ydFJlbGVhc2VSdW5PcHRpb25zPWE9PihoLl9PcnRSZWxlYXNlUnVuT3B0aW9ucz1aLkJhKShhKTtoLl9PcnRDcmVhdGVCaW5kaW5nPWE9PihoLl9PcnRDcmVhdGVCaW5kaW5nPVouQ2EpKGEpO1xuaC5fT3J0QmluZElucHV0PShhLGIsYyk9PihoLl9PcnRCaW5kSW5wdXQ9Wi5EYSkoYSxiLGMpO2guX09ydEJpbmRPdXRwdXQ9KGEsYixjLGQpPT4oaC5fT3J0QmluZE91dHB1dD1aLkVhKShhLGIsYyxkKTtoLl9PcnRDbGVhckJvdW5kT3V0cHV0cz1hPT4oaC5fT3J0Q2xlYXJCb3VuZE91dHB1dHM9Wi5GYSkoYSk7aC5fT3J0UmVsZWFzZUJpbmRpbmc9YT0+KGguX09ydFJlbGVhc2VCaW5kaW5nPVouR2EpKGEpO2guX09ydFJ1bldpdGhCaW5kaW5nPShhLGIsYyxkLGUpPT4oaC5fT3J0UnVuV2l0aEJpbmRpbmc9Wi5IYSkoYSxiLGMsZCxlKTtoLl9PcnRSdW49KGEsYixjLGQsZSxnLGwsayk9PihoLl9PcnRSdW49Wi5JYSkoYSxiLGMsZCxlLGcsbCxrKTtoLl9PcnRFbmRQcm9maWxpbmc9YT0+KGguX09ydEVuZFByb2ZpbGluZz1aLkphKShhKTtcbnZhciBtYj1oLl9tYWxsb2M9YT0+KG1iPWguX21hbGxvYz1aLkthKShhKSxVPWguX2ZyZWU9YT0+KFU9aC5fZnJlZT1aLkxhKShhKSxaYT1hPT4oWmE9Wi5NYSkoYSk7aC5fX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzPSgpPT4oaC5fX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzPVouTmEpKCk7dmFyIEFiPSgpPT4oQWI9Wi5QYSkoKSxCYj1hPT4oQmI9Wi5RYSkoYSksQ2I9YT0+KENiPVouUmEpKGEpO2Z1bmN0aW9uIHpiKCl7dmFyIGE9WjthPU9iamVjdC5hc3NpZ24oe30sYSk7dmFyIGI9ZD0+KCk9PmQoKT4+PjAsYz1kPT5lPT5kKGUpPj4+MDthLl9fZXJybm9fbG9jYXRpb249YihhLl9fZXJybm9fbG9jYXRpb24pO2EuS2E9YyhhLkthKTthLk1hPWMoYS5NYSk7YS5QYT1iKGEuUGEpO2EuUmE9YyhhLlJhKTtyZXR1cm4gYX1oLnN0YWNrQWxsb2M9Q2I7aC5zdGFja1NhdmU9QWI7aC5zdGFja1Jlc3RvcmU9QmI7aC5VVEY4VG9TdHJpbmc9TDtcbmguc3RyaW5nVG9VVEY4PShhLGIsYyk9Pk4oYSxCLGIsYyk7aC5sZW5ndGhCeXRlc1VURjg9TTt2YXIgRGI7Sj1mdW5jdGlvbiBFYigpe0RifHxGYigpO0RifHwoSj1FYil9O2Z1bmN0aW9uIEZiKCl7aWYoISgwPEkpKXtmb3IoOzA8cmEubGVuZ3RoOylyYS5zaGlmdCgpKGgpO2lmKCEoMDxJfHxEYnx8KERiPSEwLGguY2FsbGVkUnVuPSEwLGxhKSkpe2Zvcig7MDxzYS5sZW5ndGg7KXNhLnNoaWZ0KCkoaCk7Zm9yKGFhKGgpOzA8dGEubGVuZ3RoOyl0YS5zaGlmdCgpKGgpfX19RmIoKTtcblxuXG4gIHJldHVybiBtb2R1bGVBcmcucmVhZHlcbn1cblxuKTtcbn0pKCk7XG5pZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuICBtb2R1bGUuZXhwb3J0cyA9IG9ydFdhc207XG5lbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10pXG4gIGRlZmluZShbXSwgKCkgPT4gb3J0V2FzbSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7RW52fSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge09ydFdhc21Nb2R1bGV9IGZyb20gJy4vYmluZGluZy9vcnQtd2FzbSc7XG5pbXBvcnQge09ydFdhc21UaHJlYWRlZE1vZHVsZX0gZnJvbSAnLi9iaW5kaW5nL29ydC13YXNtLXRocmVhZGVkJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cyAqL1xubGV0IG9ydFdhc21GYWN0b3J5OiBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPjtcblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkcpIHtcbiAgb3J0V2FzbUZhY3RvcnkgPSByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXRyYWluaW5nLXdhc20tc2ltZC5qcycpO1xufSBlbHNlIHtcbiAgb3J0V2FzbUZhY3RvcnkgPVxuICAgICAgQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSA/IHJlcXVpcmUoJy4vYmluZGluZy9vcnQtd2FzbS5qcycpIDogcmVxdWlyZSgnLi9iaW5kaW5nL29ydC13YXNtLXNpbWQuanNlcC5qcycpO1xufVxuXG5jb25zdCBvcnRXYXNtRmFjdG9yeVRocmVhZGVkOiBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPiA9ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9USFJFQUQgP1xuICAgIChCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVID8gcmVxdWlyZSgnLi9iaW5kaW5nL29ydC13YXNtLXRocmVhZGVkLmpzJykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZSgnLi9iaW5kaW5nL29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC5qcycpKSA6XG4gICAgb3J0V2FzbUZhY3Rvcnk7XG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMgKi9cblxubGV0IHdhc206IE9ydFdhc21Nb2R1bGV8dW5kZWZpbmVkO1xubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG5sZXQgYWJvcnRlZCA9IGZhbHNlO1xuXG5jb25zdCBpc011bHRpVGhyZWFkU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICB0cnkge1xuICAgIC8vIElmICdTaGFyZWRBcnJheUJ1ZmZlcicgaXMgbm90IGF2YWlsYWJsZSwgV2ViQXNzZW1ibHkgdGhyZWFkcyB3aWxsIG5vdCB3b3JrLlxuICAgIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVGVzdCBmb3IgdHJhbnNmZXJhYmlsaXR5IG9mIFNBQnMgKGZvciBicm93c2Vycy4gbmVlZGVkIGZvciBGaXJlZm94KVxuICAgIC8vIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vZm9ydW0vIyFtc2cvbW96aWxsYS5kZXYucGxhdGZvcm0vSUhrQlpsSEVUcEEvZHdzTU5jaFdFUUFKXG4gICAgaWYgKHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5ldyBNZXNzYWdlQ2hhbm5lbCgpLnBvcnQxLnBvc3RNZXNzYWdlKG5ldyBTaGFyZWRBcnJheUJ1ZmZlcigxKSk7XG4gICAgfVxuXG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgdGhyZWFkcyBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIHRocmVhZGVkIGluc3RydWN0aW9ucy5cbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMCwgOTcsIDExNSwgMTA5LCAxLCAwLCAgMCwgIDAsIDEsIDQsIDEsICA5NiwgMCwgICAwLCAgMywgMiwgMSwgIDAsIDUsXG4gICAgICA0LCAxLCAgMywgICAxLCAgIDEsIDEwLCAxMSwgMSwgOSwgMCwgNjUsIDAsICAyNTQsIDE2LCAyLCAwLCAyNiwgMTFcbiAgICBdKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGlzU2ltZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSBTSU1EIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgU0lNRCBpbnN0cnVjdGlvbnMuXG5cbiAgICAvLyBUaGUgYmluYXJ5IGRhdGEgaXMgZ2VuZXJhdGVkIGZyb20gdGhlIGZvbGxvd2luZyBjb2RlIGJ5IHdhdDJ3YXNtOlxuICAgIC8vXG4gICAgLy8gKG1vZHVsZVxuICAgIC8vICAgKHR5cGUgJHQwIChmdW5jKSlcbiAgICAvLyAgIChmdW5jICRmMCAodHlwZSAkdDApXG4gICAgLy8gICAgIChkcm9wXG4gICAgLy8gICAgICAgKGkzMng0LmRvdF9pMTZ4OF9zXG4gICAgLy8gICAgICAgICAoaTh4MTYuc3BsYXRcbiAgICAvLyAgICAgICAgICAgKGkzMi5jb25zdCAwKSlcbiAgICAvLyAgICAgICAgICh2MTI4LmNvbnN0IGkzMng0IDB4MDAwMDAwMDAgMHgwMDAwMDAwMCAweDAwMDAwMDAwIDB4MDAwMDAwMDApKSkpKVxuXG4gICAgcmV0dXJuIFdlYkFzc2VtYmx5LnZhbGlkYXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDAsICAgOTcsIDExNSwgMTA5LCAxLCAwLCAwLCAwLCAxLCA0LCAxLCA5NiwgMCwgMCwgMywgMiwgMSwgMCwgMTAsIDMwLCAxLCAgIDI4LCAgMCwgNjUsIDAsXG4gICAgICAyNTMsIDE1LCAyNTMsIDEyLCAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDAsIDAsIDAsIDAsIDAsIDAsIDAsICAwLCAgMjUzLCAxODYsIDEsIDI2LCAxMVxuICAgIF0pKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgZ2V0V2FzbUZpbGVOYW1lID0gKHVzZVNpbWQ6IGJvb2xlYW4sIHVzZVRocmVhZHM6IGJvb2xlYW4pID0+IHtcbiAgaWYgKHVzZVNpbWQpIHtcbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9UUkFJTklORykge1xuICAgICAgcmV0dXJuICdvcnQtdHJhaW5pbmctd2FzbS1zaW1kLndhc20nO1xuICAgIH1cbiAgICByZXR1cm4gdXNlVGhyZWFkcyA/ICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLndhc20nIDogJ29ydC13YXNtLXNpbWQud2FzbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVzZVRocmVhZHMgPyAnb3J0LXdhc20tdGhyZWFkZWQud2FzbScgOiAnb3J0LXdhc20ud2FzbSc7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplV2ViQXNzZW1ibHkgPSBhc3luYyhmbGFnczogRW52LldlYkFzc2VtYmx5RmxhZ3MpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIGlmIChpbml0aWFsaXppbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpcGxlIGNhbGxzIHRvIFxcJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpXFwnIGRldGVjdGVkLicpO1xuICB9XG4gIGlmIChhYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcmV2aW91cyBjYWxsIHRvIFxcJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpXFwnIGZhaWxlZC4nKTtcbiAgfVxuXG4gIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgLy8gd2FzbSBmbGFncyBhcmUgYWxyZWFkeSBpbml0aWFsaXplZFxuICBjb25zdCB0aW1lb3V0ID0gZmxhZ3MuaW5pdFRpbWVvdXQhO1xuICBjb25zdCBudW1UaHJlYWRzID0gZmxhZ3MubnVtVGhyZWFkcyE7XG4gIGNvbnN0IHNpbWQgPSBmbGFncy5zaW1kITtcblxuICBjb25zdCB1c2VUaHJlYWRzID0gbnVtVGhyZWFkcyA+IDEgJiYgaXNNdWx0aVRocmVhZFN1cHBvcnRlZCgpO1xuICBjb25zdCB1c2VTaW1kID0gc2ltZCAmJiBpc1NpbWRTdXBwb3J0ZWQoKTtcblxuICBjb25zdCB3YXNtUGF0aHMgPSBmbGFncy53YXNtUGF0aHM7XG4gIGNvbnN0IHdhc21QcmVmaXhPdmVycmlkZSA9IHR5cGVvZiB3YXNtUGF0aHMgPT09ICdzdHJpbmcnID8gd2FzbVBhdGhzIDogdW5kZWZpbmVkO1xuICBjb25zdCB3YXNtRmlsZU5hbWUgPSBnZXRXYXNtRmlsZU5hbWUodXNlU2ltZCwgdXNlVGhyZWFkcyk7XG4gIGNvbnN0IHdhc21QYXRoT3ZlcnJpZGUgPSB0eXBlb2Ygd2FzbVBhdGhzID09PSAnb2JqZWN0JyA/IHdhc21QYXRoc1t3YXNtRmlsZU5hbWVdIDogdW5kZWZpbmVkO1xuXG4gIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcblxuICBjb25zdCB0YXNrczogQXJyYXk8UHJvbWlzZTx2b2lkPj4gPSBbXTtcblxuICAvLyBwcm9taXNlIGZvciB0aW1lb3V0XG4gIGlmICh0aW1lb3V0ID4gMCkge1xuICAgIHRhc2tzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpc1RpbWVvdXQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9LCB0aW1lb3V0KTtcbiAgICB9KSk7XG4gIH1cblxuICAvLyBwcm9taXNlIGZvciBtb2R1bGUgaW5pdGlhbGl6YXRpb25cbiAgdGFza3MucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHVzZVRocmVhZHMgPyBvcnRXYXNtRmFjdG9yeVRocmVhZGVkIDogb3J0V2FzbUZhY3Rvcnk7XG4gICAgY29uc3QgY29uZmlnOiBQYXJ0aWFsPE9ydFdhc21Nb2R1bGU+ID0ge1xuICAgICAgbG9jYXRlRmlsZTogKGZpbGVOYW1lOiBzdHJpbmcsIHNjcmlwdERpcmVjdG9yeTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fVEhSRUFEICYmIHVzZVRocmVhZHMgJiYgZmlsZU5hbWUuZW5kc1dpdGgoJy53b3JrZXIuanMnKSAmJlxuICAgICAgICAgICAgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIHJlcXVpcmUoKSBmdW5jdGlvbiBpcyBoYW5kbGVkIGJ5IGVzYnVpbGQgcGx1Z2luIHRvIGxvYWQgZmlsZSBjb250ZW50IGFzIHN0cmluZy5cbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0c1xuICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vYmluZGluZy9vcnQtd2FzbS10aHJlYWRlZC53b3JrZXIuanMnKVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB7dHlwZTogJ3RleHQvamF2YXNjcmlwdCd9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsZU5hbWUuZW5kc1dpdGgoJy53YXNtJykpIHtcbiAgICAgICAgICBpZiAod2FzbVBhdGhPdmVycmlkZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdhc21QYXRoT3ZlcnJpZGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcHJlZml4ID0gd2FzbVByZWZpeE92ZXJyaWRlID8/IHNjcmlwdERpcmVjdG9yeTtcblxuICAgICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgICAgICAgaWYgKHdhc21GaWxlTmFtZSA9PT0gJ29ydC13YXNtLXNpbWQud2FzbScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZWZpeCArICdvcnQtd2FzbS1zaW1kLmpzZXAud2FzbSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdhc21GaWxlTmFtZSA9PT0gJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZWZpeCArICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHByZWZpeCArIHdhc21GaWxlTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzY3JpcHREaXJlY3RvcnkgKyBmaWxlTmFtZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9USFJFQUQgJiYgdXNlVGhyZWFkcykge1xuICAgICAgY29uZmlnLm51bVRocmVhZHMgPSBudW1UaHJlYWRzO1xuICAgICAgaWYgKHR5cGVvZiBCbG9iID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25maWcubWFpblNjcmlwdFVybE9yQmxvYiA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdvcnQtd2FzbS10aHJlYWRlZC5qcycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0U291cmNlQ29kZSA9IGB2YXIgb3J0V2FzbVRocmVhZGVkPSR7ZmFjdG9yeS50b1N0cmluZygpfTtgO1xuICAgICAgICBjb25maWcubWFpblNjcmlwdFVybE9yQmxvYiA9IG5ldyBCbG9iKFtzY3JpcHRTb3VyY2VDb2RlXSwge3R5cGU6ICd0ZXh0L2phdmFzY3JpcHQnfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZmFjdG9yeShjb25maWcpLnRoZW4oXG4gICAgICAgIC8vIHdhc20gbW9kdWxlIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseVxuICAgICAgICBtb2R1bGUgPT4ge1xuICAgICAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICB3YXNtID0gbW9kdWxlO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgZmFpbGVkIHRvIGluaXRpYWxpemVcbiAgICAgICAgKHdoYXQpID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3Qod2hhdCk7XG4gICAgICAgIH0pO1xuICB9KSk7XG5cbiAgYXdhaXQgUHJvbWlzZS5yYWNlKHRhc2tzKTtcblxuICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBXZWJBc3NlbWJseSBiYWNrZW5kIGluaXRpYWxpemluZyBmYWlsZWQgZHVlIHRvIHRpbWVvdXQ6ICR7dGltZW91dH1tc2ApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5zdGFuY2UgPSAoKTogT3J0V2FzbU1vZHVsZSA9PiB7XG4gIGlmIChpbml0aWFsaXplZCAmJiB3YXNtKSB7XG4gICAgcmV0dXJuIHdhc207XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IGlzIG5vdCBpbml0aWFsaXplZCB5ZXQuJyk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlzcG9zZSA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKGluaXRpYWxpemVkICYmICFpbml0aWFsaXppbmcgJiYgIWFib3J0ZWQpIHtcbiAgICBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gICAgKHdhc20gYXMgT3J0V2FzbVRocmVhZGVkTW9kdWxlKS5QVGhyZWFkPy50ZXJtaW5hdGVBbGxUaHJlYWRzKCk7XG4gICAgd2FzbSA9IHVuZGVmaW5lZDtcblxuICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgYWJvcnRlZCA9IHRydWU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IGFsbG9jV2FzbVN0cmluZyA9IChkYXRhOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiBudW1iZXIgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBkYXRhTGVuZ3RoID0gd2FzbS5sZW5ndGhCeXRlc1VURjgoZGF0YSkgKyAxO1xuICBjb25zdCBkYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKGRhdGFMZW5ndGgpO1xuICB3YXNtLnN0cmluZ1RvVVRGOChkYXRhLCBkYXRhT2Zmc2V0LCBkYXRhTGVuZ3RoKTtcbiAgYWxsb2NzLnB1c2goZGF0YU9mZnNldCk7XG5cbiAgcmV0dXJuIGRhdGFPZmZzZXQ7XG59O1xuXG5pbnRlcmZhY2UgRXh0cmFPcHRpb25zSGFuZGxlciB7XG4gIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgaXRlcmF0ZUV4dHJhT3B0aW9ucyA9XG4gICAgKG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBwcmVmaXg6IHN0cmluZywgc2VlbjogV2Vha1NldDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4sXG4gICAgIGhhbmRsZXI6IEV4dHJhT3B0aW9uc0hhbmRsZXIpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0JyAmJiBvcHRpb25zICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChzZWVuLmhhcyhvcHRpb25zKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGluIG9wdGlvbnMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWVuLmFkZChvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBPYmplY3QuZW50cmllcyhvcHRpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9IChwcmVmaXgpID8gcHJlZml4ICsga2V5IDoga2V5O1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIG5hbWUgKyAnLicsIHNlZW4sIGhhbmRsZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGhhbmRsZXIobmFtZSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICBoYW5kbGVyKG5hbWUsICh2YWx1ZSkgPyAnMScgOiAnMCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgaGFuZGxlIGV4dHJhIGNvbmZpZyB0eXBlOiAke3R5cGVvZiB2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuLyoqXG4gKiBjaGVjayB3ZWIgYXNzZW1ibHkgQVBJJ3MgbGFzdCBlcnJvciBhbmQgdGhyb3cgZXJyb3IgaWYgYW55IGVycm9yIG9jY3VycmVkLlxuICogQHBhcmFtIG1lc3NhZ2UgYSBtZXNzYWdlIHVzZWQgd2hlbiBhbiBlcnJvciBvY2N1cnJlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNoZWNrTGFzdEVycm9yID0gKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFyYW1zT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDgpO1xuICAgIHdhc20uX09ydEdldExhc3RFcnJvcihwYXJhbXNPZmZzZXQsIHBhcmFtc09mZnNldCArIDQpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uSEVBUDMyW3BhcmFtc09mZnNldCAvIDRdO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZVBvaW50ZXIgPSB3YXNtLkhFQVBVMzJbcGFyYW1zT2Zmc2V0IC8gNCArIDFdO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZVBvaW50ZXIgPyB3YXNtLlVURjhUb1N0cmluZyhlcnJvck1lc3NhZ2VQb2ludGVyKSA6ICcnO1xuICAgIHRocm93IG5ldyBFcnJvcihgJHttZXNzYWdlfSBFUlJPUl9DT0RFOiAke2Vycm9yQ29kZX0sIEVSUk9SX01FU1NBR0U6ICR7ZXJyb3JNZXNzYWdlfWApO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge2dldEluc3RhbmNlfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQge2FsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3IsIGl0ZXJhdGVFeHRyYU9wdGlvbnN9IGZyb20gJy4vd2FzbS11dGlscyc7XG5cbmV4cG9ydCBjb25zdCBzZXRSdW5PcHRpb25zID0gKG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlcltdXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBsZXQgcnVuT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGNvbnN0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBydW5PcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRyeSB7XG4gICAgaWYgKG9wdGlvbnM/LmxvZ1NldmVyaXR5TGV2ZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID0gMjsgIC8vIERlZmF1bHQgdG8gd2FybmluZ1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCkgfHxcbiAgICAgICAgb3B0aW9ucy5sb2dTZXZlcml0eUxldmVsIDwgMCB8fCBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPiA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXJ2ZXJpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke29wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8ubG9nVmVyYm9zaXR5TGV2ZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCA9IDA7ICAvLyBEZWZhdWx0IHRvIDBcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy50ZXJtaW5hdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy50ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgdGFnRGF0YU9mZnNldCA9IDA7XG4gICAgaWYgKG9wdGlvbnM/LnRhZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YWdEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKG9wdGlvbnMudGFnLCBhbGxvY3MpO1xuICAgIH1cblxuICAgIHJ1bk9wdGlvbnNIYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVSdW5PcHRpb25zKFxuICAgICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwhLCBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsISwgISFydW5PcHRpb25zLnRlcm1pbmF0ZSEsIHRhZ0RhdGFPZmZzZXQpO1xuICAgIGlmIChydW5PcHRpb25zSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgcnVuIG9wdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmV4dHJhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnMob3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRSdW5Db25maWdFbnRyeShydW5PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHJ1biBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3J1bk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIGFsbG9jcy5mb3JFYWNoKGFsbG9jID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb259IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7YWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9uc30gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuY29uc3QgZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsID0gKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw6IHN0cmluZ3x1bmtub3duKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChncmFwaE9wdGltaXphdGlvbkxldmVsKSB7XG4gICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAnZXh0ZW5kZWQnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAnYWxsJzpcbiAgICAgIHJldHVybiA5OTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBncmFwaCBvcHRpbWl6YXRpb24gbGV2ZWw6ICR7Z3JhcGhPcHRpbWl6YXRpb25MZXZlbH1gKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0RXhlY3V0aW9uTW9kZSA9IChleGVjdXRpb25Nb2RlOiAnc2VxdWVudGlhbCd8J3BhcmFsbGVsJyk6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAoZXhlY3V0aW9uTW9kZSkge1xuICAgIGNhc2UgJ3NlcXVlbnRpYWwnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAncGFyYWxsZWwnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZXhlY3V0aW9uIG1vZGU6ICR7ZXhlY3V0aW9uTW9kZX1gKTtcbiAgfVxufTtcblxuY29uc3QgYXBwZW5kRGVmYXVsdE9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IHZvaWQgPT4ge1xuICBpZiAoIW9wdGlvbnMuZXh0cmEpIHtcbiAgICBvcHRpb25zLmV4dHJhID0ge307XG4gIH1cbiAgaWYgKCFvcHRpb25zLmV4dHJhLnNlc3Npb24pIHtcbiAgICBvcHRpb25zLmV4dHJhLnNlc3Npb24gPSB7fTtcbiAgfVxuICBjb25zdCBzZXNzaW9uID0gb3B0aW9ucy5leHRyYS5zZXNzaW9uIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGlmICghc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIHNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSA9ICcxJztcbiAgfVxuXG4gIC8vIGlmIHVzaW5nIEpTRVAgd2l0aCBXZWJHUFUsIGFsd2F5cyBkaXNhYmxlIG1lbW9yeSBwYXR0ZXJuXG4gIGlmIChvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyAmJlxuICAgICAgb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMuc29tZShlcCA9PiAodHlwZW9mIGVwID09PSAnc3RyaW5nJyA/IGVwIDogZXAubmFtZSkgPT09ICd3ZWJncHUnKSkge1xuICAgIG9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybiA9IGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBzZXRFeGVjdXRpb25Qcm92aWRlcnMgPVxuICAgIChzZXNzaW9uT3B0aW9uc0hhbmRsZTogbnVtYmVyLCBleGVjdXRpb25Qcm92aWRlcnM6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uRXhlY3V0aW9uUHJvdmlkZXJDb25maWdbXSxcbiAgICAgYWxsb2NzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xuICAgICAgZm9yIChjb25zdCBlcCBvZiBleGVjdXRpb25Qcm92aWRlcnMpIHtcbiAgICAgICAgbGV0IGVwTmFtZSA9IHR5cGVvZiBlcCA9PT0gJ3N0cmluZycgPyBlcCA6IGVwLm5hbWU7XG5cbiAgICAgICAgLy8gY2hlY2sgRVAgbmFtZVxuICAgICAgICBzd2l0Y2ggKGVwTmFtZSkge1xuICAgICAgICAgIGNhc2UgJ3hubnBhY2snOlxuICAgICAgICAgICAgZXBOYW1lID0gJ1hOTlBBQ0snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd2Vibm4nOlxuICAgICAgICAgICAgZXBOYW1lID0gJ1dFQk5OJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHdlYm5uT3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICAgICAgICAgICAgaWYgKHdlYm5uT3B0aW9ucz8uZGV2aWNlVHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ2RldmljZVR5cGUnLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh3ZWJubk9wdGlvbnMuZGV2aWNlVHlwZSwgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PVxuICAgICAgICAgICAgICAgICAgICAwKSB7XG4gICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICdkZXZpY2VUeXBlJyAtICR7d2Vibm5PcHRpb25zLmRldmljZVR5cGV9LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAod2Vibm5PcHRpb25zPy5udW1UaHJlYWRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IG51bVRocmVhZHMgPSB3ZWJubk9wdGlvbnMubnVtVGhyZWFkcztcbiAgICAgICAgICAgICAgICAvLyBKdXN0IGlnbm9yZSBpbnZhbGlkIHdlYm5uT3B0aW9ucy5udW1UaHJlYWRzLlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbnVtVGhyZWFkcyAhPSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihudW1UaHJlYWRzKSB8fCBudW1UaHJlYWRzIDwgMCkge1xuICAgICAgICAgICAgICAgICAgbnVtVGhyZWFkcyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ251bVRocmVhZHMnLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhudW1UaHJlYWRzLnRvU3RyaW5nKCksIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT1cbiAgICAgICAgICAgICAgICAgICAgMCkge1xuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAnbnVtVGhyZWFkcycgLSAke3dlYm5uT3B0aW9ucy5udW1UaHJlYWRzfS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHdlYm5uT3B0aW9ucz8ucG93ZXJQcmVmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygncG93ZXJQcmVmZXJlbmNlJywgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcod2Vibm5PcHRpb25zLnBvd2VyUHJlZmVyZW5jZSwgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PVxuICAgICAgICAgICAgICAgICAgICAwKSB7XG4gICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICBgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICdwb3dlclByZWZlcmVuY2UnIC0gJHt3ZWJubk9wdGlvbnMucG93ZXJQcmVmZXJlbmNlfS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3dlYmdwdSc6XG4gICAgICAgICAgICBlcE5hbWUgPSAnSlMnO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgY29uc3Qgd2ViZ3B1T3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zPy5wcmVmZXJyZWRMYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAod2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgIT09ICdOQ0hXJyAmJiB3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCAhPT0gJ05IV0MnKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHByZWZlcnJlZExheW91dCBtdXN0IGJlIGVpdGhlciAnTkNIVycgb3IgJ05IV0MnOiAke3dlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKCdwcmVmZXJyZWRMYXlvdXQnLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCwgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PVxuICAgICAgICAgICAgICAgICAgICAwKSB7XG4gICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICBgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICdwcmVmZXJyZWRMYXlvdXQnIC0gJHt3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dH0uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd3YXNtJzpcbiAgICAgICAgICBjYXNlICdjcHUnOlxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgbm90IHN1cHBvcnRlZCBleGVjdXRpb24gcHJvdmlkZXI6ICR7ZXBOYW1lfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXBOYW1lRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhlcE5hbWUsIGFsbG9jcyk7XG4gICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcihzZXNzaW9uT3B0aW9uc0hhbmRsZSwgZXBOYW1lRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYXBwZW5kIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9LmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuZXhwb3J0IGNvbnN0IHNldFNlc3Npb25PcHRpb25zID0gKG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGNvbnN0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBzZXNzaW9uT3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGFwcGVuZERlZmF1bHRPcHRpb25zKHNlc3Npb25PcHRpb25zKTtcblxuICB0cnkge1xuICAgIGNvbnN0IGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPSBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwoc2Vzc2lvbk9wdGlvbnMuZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCA/PyAnYWxsJyk7XG4gICAgY29uc3QgZXhlY3V0aW9uTW9kZSA9IGdldEV4ZWN1dGlvbk1vZGUoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uTW9kZSA/PyAnc2VxdWVudGlhbCcpO1xuICAgIGNvbnN0IGxvZ0lkRGF0YU9mZnNldCA9XG4gICAgICAgIHR5cGVvZiBzZXNzaW9uT3B0aW9ucy5sb2dJZCA9PT0gJ3N0cmluZycgPyBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMubG9nSWQsIGFsbG9jcykgOiAwO1xuXG4gICAgY29uc3QgbG9nU2V2ZXJpdHlMZXZlbCA9IHNlc3Npb25PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPz8gMjsgIC8vIERlZmF1bHQgdG8gMiAtIHdhcm5pbmdcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nU2V2ZXJpdHlMZXZlbCkgfHwgbG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHwgbG9nU2V2ZXJpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNlcnZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nU2V2ZXJpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dWZXJib3NpdHlMZXZlbCA9IHNlc3Npb25PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID8/IDA7ICAvLyBEZWZhdWx0IHRvIDAgLSB2ZXJib3NlXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxvZ1ZlcmJvc2l0eUxldmVsKSB8fCBsb2dWZXJib3NpdHlMZXZlbCA8IDAgfHwgbG9nVmVyYm9zaXR5TGV2ZWwgPiA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyB2ZXJib3NpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke2xvZ1ZlcmJvc2l0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGltaXplZE1vZGVsRmlsZVBhdGhPZmZzZXQgPSB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCA9PT0gJ3N0cmluZycgP1xuICAgICAgICBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCwgYWxsb2NzKSA6XG4gICAgICAgIDA7XG5cbiAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZVNlc3Npb25PcHRpb25zKFxuICAgICAgICBncmFwaE9wdGltaXphdGlvbkxldmVsLCAhIXNlc3Npb25PcHRpb25zLmVuYWJsZUNwdU1lbUFyZW5hLCAhIXNlc3Npb25PcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4sIGV4ZWN1dGlvbk1vZGUsXG4gICAgICAgICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlUHJvZmlsaW5nLCAwLCBsb2dJZERhdGFPZmZzZXQsIGxvZ1NldmVyaXR5TGV2ZWwsIGxvZ1ZlcmJvc2l0eUxldmVsLFxuICAgICAgICBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0KTtcbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBzZXNzaW9uIG9wdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycykge1xuICAgICAgc2V0RXhlY3V0aW9uUHJvdmlkZXJzKHNlc3Npb25PcHRpb25zSGFuZGxlLCBzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMsIGFsbG9jcyk7XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmZyZWVEaW1lbnNpb25PdmVycmlkZXMpIHtcbiAgICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSkge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZSBuYW1lIG11c3QgYmUgYSBzdHJpbmc6ICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgfHwgdmFsdWUgPCAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZSB2YWx1ZSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXI6ICR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhuYW1lLCBhbGxvY3MpO1xuICAgICAgICBpZiAod2FzbS5fT3J0QWRkRnJlZURpbWVuc2lvbk92ZXJyaWRlKHNlc3Npb25PcHRpb25zSGFuZGxlLCBuYW1lT2Zmc2V0LCB2YWx1ZSkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGU6ICR7bmFtZX0gLSAke3ZhbHVlfS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5leHRyYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKHNlc3Npb25PcHRpb25zLmV4dHJhLCAnJywgbmV3IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KCksIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoa2V5LCBhbGxvY3MpO1xuICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XG5cbiAgICAgICAgaWYgKHdhc20uX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJHtrZXl9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBbc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgIHdhc20uX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucyhzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIGFsbG9jcy5mb3JFYWNoKGFsbG9jID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuLy8gVGhpcyBmaWxlIGluY2x1ZGVzIGNvbW1vbiBkZWZpbml0aW9ucy4gVGhleSBkbyBOT1QgaGF2ZSBkZXBlbmRlbmN5IG9uIHRoZSBXZWJBc3NlbWJseSBpbnN0YW5jZS5cblxuLyoqXG4gKiBDb3BpZWQgZnJvbSBPTk5YIGRlZmluaXRpb24uIFVzZSB0aGlzIHRvIGRyb3AgZGVwZW5kZW5jeSAnb25ueF9wcm90bycgdG8gZGVjcmVhc2UgY29tcGlsZWQgLmpzIGZpbGUgc2l6ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gRGF0YVR5cGUge1xuICB1bmRlZmluZWQgPSAwLFxuICBmbG9hdCA9IDEsXG4gIHVpbnQ4ID0gMixcbiAgaW50OCA9IDMsXG4gIHVpbnQxNiA9IDQsXG4gIGludDE2ID0gNSxcbiAgaW50MzIgPSA2LFxuICBpbnQ2NCA9IDcsXG4gIHN0cmluZyA9IDgsXG4gIGJvb2wgPSA5LFxuICBmbG9hdDE2ID0gMTAsXG4gIGRvdWJsZSA9IDExLFxuICB1aW50MzIgPSAxMixcbiAgdWludDY0ID0gMTMsXG4gIGNvbXBsZXg2NCA9IDE0LFxuICBjb21wbGV4MTI4ID0gMTUsXG4gIGJmbG9hdDE2ID0gMTZcbn1cblxuLyoqXG4gKiBNYXAgc3RyaW5nIHRlbnNvciBkYXRhIHRvIGVudW0gdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtID0gKHR5cGU6IHN0cmluZyk6IERhdGFUeXBlID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnaW50OCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50ODtcbiAgICBjYXNlICd1aW50OCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDg7XG4gICAgY2FzZSAnYm9vbCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuYm9vbDtcbiAgICBjYXNlICdpbnQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MTY7XG4gICAgY2FzZSAndWludDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MTY7XG4gICAgY2FzZSAnaW50MzInOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDMyO1xuICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDMyO1xuICAgIGNhc2UgJ2Zsb2F0MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0MTY7XG4gICAgY2FzZSAnZmxvYXQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZmxvYXQ7XG4gICAgY2FzZSAnZmxvYXQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZG91YmxlO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuc3RyaW5nO1xuICAgIGNhc2UgJ2ludDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ2NDtcbiAgICBjYXNlICd1aW50NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ2NDtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xuICB9XG59O1xuXG4vKipcbiAqIE1hcCBlbnVtIHZhbHVlIHRvIHN0cmluZyB0ZW5zb3IgZGF0YVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcgPSAodHlwZVByb3RvOiBEYXRhVHlwZSk6IFRlbnNvci5UeXBlID0+IHtcbiAgc3dpdGNoICh0eXBlUHJvdG8pIHtcbiAgICBjYXNlIERhdGFUeXBlLmludDg6XG4gICAgICByZXR1cm4gJ2ludDgnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDg6XG4gICAgICByZXR1cm4gJ3VpbnQ4JztcbiAgICBjYXNlIERhdGFUeXBlLmJvb2w6XG4gICAgICByZXR1cm4gJ2Jvb2wnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50MTY6XG4gICAgICByZXR1cm4gJ2ludDE2JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQxNjpcbiAgICAgIHJldHVybiAndWludDE2JztcbiAgICBjYXNlIERhdGFUeXBlLmludDMyOlxuICAgICAgcmV0dXJuICdpbnQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50MzI6XG4gICAgICByZXR1cm4gJ3VpbnQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDE2OlxuICAgICAgcmV0dXJuICdmbG9hdDE2JztcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0OlxuICAgICAgcmV0dXJuICdmbG9hdDMyJztcbiAgICBjYXNlIERhdGFUeXBlLmRvdWJsZTpcbiAgICAgIHJldHVybiAnZmxvYXQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS5zdHJpbmc6XG4gICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ2NDpcbiAgICAgIHJldHVybiAnaW50NjQnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDY0OlxuICAgICAgcmV0dXJuICd1aW50NjQnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGVQcm90b31gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBnZXQgdGVuc29yIGVsZW1lbnQgc2l6ZSBpbiBieXRlcyBieSB0aGUgZ2l2ZW4gZGF0YSB0eXBlXG4gKiBAcmV0dXJucyBzaXplIGluIGludGVnZXIgb3IgdW5kZWZpbmVkIGlmIHRoZSBkYXRhIHR5cGUgaXMgbm90IHN1cHBvcnRlZFxuICovXG5leHBvcnQgY29uc3QgZ2V0VGVuc29yRWxlbWVudFNpemUgPSAoZGF0ZVR5cGU6IG51bWJlcik6IG51bWJlcnxcbiAgICB1bmRlZmluZWQgPT4gW3VuZGVmaW5lZCwgNCwgMSwgMSwgMiwgMiwgNCwgOCwgdW5kZWZpbmVkLCAxLCAyLCA4LCA0LCA4LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXVtkYXRlVHlwZV07XG5cbi8qKlxuICogZ2V0IHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yIGJ5IHRoZSBnaXZlbiB0ZW5zb3IgdHlwZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gKHR5cGU6IFRlbnNvci5UeXBlKTogRmxvYXQzMkFycmF5Q29uc3RydWN0b3J8VWludDhBcnJheUNvbnN0cnVjdG9yfFxuICAgIEludDhBcnJheUNvbnN0cnVjdG9yfFVpbnQxNkFycmF5Q29uc3RydWN0b3J8SW50MTZBcnJheUNvbnN0cnVjdG9yfEludDMyQXJyYXlDb25zdHJ1Y3RvcnxCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3J8XG4gICAgVWludDhBcnJheUNvbnN0cnVjdG9yfEZsb2F0NjRBcnJheUNvbnN0cnVjdG9yfFVpbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvciA9PiB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICAgICAgcmV0dXJuIFVpbnQxNkFycmF5O1xuICAgICAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgICAgICByZXR1cm4gRmxvYXQzMkFycmF5O1xuICAgICAgICBjYXNlICd1aW50OCc6XG4gICAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XG4gICAgICAgIGNhc2UgJ2ludDgnOlxuICAgICAgICAgIHJldHVybiBJbnQ4QXJyYXk7XG4gICAgICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICAgICAgcmV0dXJuIFVpbnQxNkFycmF5O1xuICAgICAgICBjYXNlICdpbnQxNic6XG4gICAgICAgICAgcmV0dXJuIEludDE2QXJyYXk7XG4gICAgICAgIGNhc2UgJ2ludDMyJzpcbiAgICAgICAgICByZXR1cm4gSW50MzJBcnJheTtcbiAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XG4gICAgICAgIGNhc2UgJ2Zsb2F0NjQnOlxuICAgICAgICAgIHJldHVybiBGbG9hdDY0QXJyYXk7XG4gICAgICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICAgICAgcmV0dXJuIFVpbnQzMkFycmF5O1xuICAgICAgICBjYXNlICdpbnQ2NCc6XG4gICAgICAgICAgcmV0dXJuIEJpZ0ludDY0QXJyYXk7XG4gICAgICAgIGNhc2UgJ3VpbnQ2NCc6XG4gICAgICAgICAgcmV0dXJuIEJpZ1VpbnQ2NEFycmF5O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZTogJHt0eXBlfWApO1xuICAgICAgfVxuICAgIH07XG5cbi8qKlxuICogTWFwIHN0cmluZyBsb2cgbGV2ZWwgdG8gaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgbG9nTGV2ZWxTdHJpbmdUb0VudW0gPSAobG9nTGV2ZWw/OiAndmVyYm9zZSd8J2luZm8nfCd3YXJuaW5nJ3wnZXJyb3InfCdmYXRhbCcpOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGxvZ0xldmVsKSB7XG4gICAgY2FzZSAndmVyYm9zZSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdpbmZvJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAnZXJyb3InOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSAnZmF0YWwnOlxuICAgICAgcmV0dXJuIDQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHtsb2dMZXZlbH1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBnaXZlbiB0ZW5zb3IgdHlwZSBpcyBzdXBwb3J0ZWQgYnkgR1BVIGJ1ZmZlclxuICovXG5leHBvcnQgY29uc3QgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlID0gKHR5cGU6IFRlbnNvci5UeXBlKTogdHlwZSBpcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0+IHR5cGUgPT09ICdmbG9hdDMyJyB8fFxuICAgIHR5cGUgPT09ICdpbnQzMicgfHwgdHlwZSA9PT0gJ2ludDY0JyB8fCB0eXBlID09PSAnYm9vbCcgfHwgdHlwZSA9PT0gJ2Zsb2F0MTYnIHx8IHR5cGUgPT09ICd1aW50MzInO1xuXG4vKipcbiAqIE1hcCBzdHJpbmcgZGF0YSBsb2NhdGlvbiB0byBpbnRlZ2VyIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0gPSAobG9jYXRpb246IFRlbnNvci5EYXRhTG9jYXRpb24pOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGxvY2F0aW9uKSB7XG4gICAgY2FzZSAnbm9uZSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAnY3B1LXBpbm5lZCc6XG4gICAgICByZXR1cm4gMjtcbiAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxuICAgICAgcmV0dXJuIDQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSBsb2NhdGlvbjogJHtsb2NhdGlvbn1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgaW50ZWdlciBkYXRhIGxvY2F0aW9uIHRvIHN0cmluZyB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZGF0YUxvY2F0aW9uRW51bVRvU3RyaW5nID0gKGxvY2F0aW9uOiBudW1iZXIpOiBUZW5zb3IuRGF0YUxvY2F0aW9ufHVuZGVmaW5lZCA9PlxuICAgIChbJ25vbmUnLCAnY3B1JywgJ2NwdS1waW5uZWQnLCAndGV4dHVyZScsICdncHUtYnVmZmVyJ10gYXMgY29uc3QpW2xvY2F0aW9uXTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtFbnYsIEluZmVyZW5jZVNlc3Npb24sIFRlbnNvcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciwgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLCBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSwgVGVuc29yTWV0YWRhdGF9IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0IHtzZXRSdW5PcHRpb25zfSBmcm9tICcuL3J1bi1vcHRpb25zJztcbmltcG9ydCB7c2V0U2Vzc2lvbk9wdGlvbnN9IGZyb20gJy4vc2Vzc2lvbi1vcHRpb25zJztcbmltcG9ydCB7ZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtLCBnZXRUZW5zb3JFbGVtZW50U2l6ZSwgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlLCBsb2dMZXZlbFN0cmluZ1RvRW51bSwgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcsIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtLCB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3J9IGZyb20gJy4vd2FzbS1jb21tb24nO1xuaW1wb3J0IHtnZXRJbnN0YW5jZX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuaW1wb3J0IHthbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yfSBmcm9tICcuL3dhc20tdXRpbHMnO1xuXG4vLyAjcmVnaW9uIEluaXRpYWxpemF0aW9uc1xuXG4vKipcbiAqIFRoZXJlIGFyZSA0IGRpZmZlcmVudCBcImluaXRpYWxpemF0aW9uXCIgc3RlcHMgZm9yIE9SVC4gVGhleSBoYXBwZW4gaW4gZGlmZmVyZW50IHBsYWNlcyBhbmQgZGlmZmVyZW50IHRpbWUuXG4gKlxuICogMS4gSmF2YVNjcmlwdCBpbml0aWFsaXphdGlvbiBmb3Igb25ueHJ1bnRpbWUtY29tbW9uIGFuZCBvbm54cnVudGltZS13ZWIuXG4gKiAgICBUaGlzIGlzIHRoZSBmaXJzdCBpbml0aWFsaXphdGlvbiBzdGVwLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBjYWxscyBvbm54cnVudGltZS1jb21tb24ncyByZWdpc3RlckJhY2tlbmQoKVxuICogZnVuY3Rpb24gbXVsdGlwbGUgdGltZXMgdG8gcmVnaXN0ZXIgYWxsIHRoZSBhdmFpbGFibGUgYmFja2VuZHMuIFRoZSBiYWNrZW5kIHJlZ2lzdHJhdGlvbiBpcyB2ZXJ5IGZhc3QuIEl0IG9ubHlcbiAqIHJlZ2lzdGVycyB0aGUgYmFja2VuZCBuYW1lIHdpdGggdGhlIHVuaW5pdGlhbGl6ZWQgYmFja2VuZCBvYmplY3QuIE5vIGhlYXZ5IGluaXRpYWxpemF0aW9uIGlzIGRvbmUgaW4gdGhpcyBzdGVwLlxuICogICAgUmVmZXIgdG8gd2ViL2xpYi9pbmRleC50cyBmb3IgdGhlIGJhY2tlbmQgcmVnaXN0cmF0aW9uLlxuICpcbiAqIDIuIFdlYkFzc2VtYmx5IGFydGlmYWN0IGluaXRpYWxpemF0aW9uLlxuICogICAgVGhpcyBoYXBwZW5zIHdoZW4gYW55IHJlZ2lzdGVyZWQgd2FzbSBiYWNrZW5kIGlzIHVzZWQgZm9yIHRoZSBmaXJzdCB0aW1lIChpZS4gYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBvclxuICogYG9ydC5UcmFpbmluZ1Nlc3Npb24uY3JlYXRlKClgIGlzIGNhbGxlZCkuIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIGRvZXMgdGhlIGZvbGxvd2luZ3M6XG4gKiAgICAgLSBjcmVhdGUgYSBwcm94eSB3b3JrZXIgYW5kIG1ha2Ugc3VyZSB0aGUgcHJveHkgd29ya2VyIGlzIHJlYWR5IHRvIHJlY2VpdmUgbWVzc2FnZXMsIGlmIHByb3h5IGlzIGVuYWJsZWQuXG4gKiAgICAgLSBwZXJmb3JtIGZlYXR1cmUgZGV0ZWN0aW9uLCBsb2NhdGUgY29ycmVjdCBXZWJBc3NlbWJseSBhcnRpZmFjdCBwYXRoIGFuZCBjYWxsIHRoZSBFbXNjcmlwdGVuIGdlbmVyYXRlZFxuICogSmF2YVNjcmlwdCBjb2RlIHRvIGluaXRpYWxpemUgdGhlIFdlYkFzc2VtYmx5IHJ1bnRpbWUuXG4gKiAgICAgICAgIC0gaWYgcHJveHkgaXMgZW5hYmxlZCwgdGhpcyBzdGVwIGhhcHBlbnMgaW4gdGhlIHByb3h5IHdvcmtlciB1c2luZyBtZXNzYWdlICdpbml0LXdhc20nLlxuICogICAgICAgICAtIGRvd25sb2FkaW5nIHRoZSAnb3J0LXdhc217Li4ufS53YXNtJyBmaWxlIGlzIGRvbmUgaW4gdGhpcyBzdGVwLlxuICogICAgICAgICAtIGlmIG11bHRpLXRocmVhZCBpcyBlbmFibGVkLCBvbmUgb3IgbW9yZSB3ZWJ3b3JrZXIgd2lsbCBiZSBjcmVhdGVkIHRvIGluaXRpYWxpemUgdGhlIFBUaHJlYWQgdGhyZWFkcG9vbC5cbiAqXG4gKiAzLiBPUlQgZW52aXJvbm1lbnQgaW5pdGlhbGl6YXRpb24uXG4gKiAgICBUaGlzIGhhcHBlbnMgYWZ0ZXIgc3RlcCAyLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBwZXJmb3JtcyBPTk5YIFJ1bnRpbWUgZW52aXJvbm1lbnQgaW5pdGlhbGl6YXRpb24uXG4gKiBGdW5jdGlvbiBgX09ydEluaXQoKWAgaXMgY2FsbGVkIGluIHRoaXMgc3RlcC5cbiAqICAgICAtIGlmIHByb3h5IGlzIGVuYWJsZWQsIHRoaXMgc3RlcCBoYXBwZW5zIGluIHRoZSBwcm94eSB3b3JrZXIgdXNpbmcgbWVzc2FnZSAnaW5pdC1vcnQnLlxuICogICAgIC0gbG9nZ2luZyBsZXZlbCAob3J0LmVudi5sb2dMZXZlbCkgYW5kIHRocmVhZCBudW1iZXIgKG9ydC5lbnYud2FzbS5udW1UaHJlYWRzKSBhcmUgc2V0IGluIHRoaXMgc3RlcC5cbiAqXG4gKiA0LiBTZXNzaW9uIGluaXRpYWxpemF0aW9uLlxuICogICAgVGhpcyBoYXBwZW5zIHdoZW4gYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBvciBgb3J0LlRyYWluaW5nU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkLiBVbmxpa2UgdGhlIGZpcnN0IDNcbiAqIHN0ZXBzICh0aGV5IG9ubHkgY2FsbGVkIG9uY2UpLCB0aGlzIHN0ZXAgd2lsbCBiZSBkb25lIGZvciBlYWNoIHNlc3Npb24uIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIGRvZXMgdGhlXG4gKiBmb2xsb3dpbmdzOlxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVSTDpcbiAqICAgIC0gZG93bmxvYWQgdGhlIG1vZGVsIGRhdGEgZnJvbSB0aGUgVVJMLlxuICogICAgLSBjb3B5IHRoZSBtb2RlbCBkYXRhIHRvIHRoZSBXQVNNIGhlYXAuIChwcm94eTogJ2NvcHktZnJvbScpXG4gKiAgICAtIGRlcmVmZXJlbmNlIHRoZSBtb2RlbCBidWZmZXIuIFRoaXMgc3RlcCBhbGxvd3MgdGhlIG9yaWdpbmFsIEFycmF5QnVmZmVyIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxuICogICAgLSBjYWxsIGBfT3J0Q3JlYXRlU2Vzc2lvbigpYCB0byBjcmVhdGUgdGhlIHNlc3Npb24uIChwcm94eTogJ2NyZWF0ZScpXG4gKlxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVpbnQ4QXJyYXkgb2JqZWN0OlxuICogICAgLSBjb3B5IHRoZSBtb2RlbCBkYXRhIHRvIHRoZSBXQVNNIGhlYXAuIChwcm94eTogJ2NvcHktZnJvbScpXG4gKiAgICAtIGNhbGwgYF9PcnRDcmVhdGVTZXNzaW9uKClgIHRvIGNyZWF0ZSB0aGUgc2Vzc2lvbi4gKHByb3h5OiAnY3JlYXRlJylcbiAqXG4gKlxuICovXG5cbi8qKlxuICogaW5pdGlhbGl6ZSBPUlQgZW52aXJvbm1lbnQuXG4gKlxuICogQHBhcmFtIG51bVRocmVhZHMgU2V0R2xvYmFsSW50cmFPcE51bVRocmVhZHMobnVtVGhyZWFkcylcbiAqIEBwYXJhbSBsb2dnaW5nTGV2ZWwgQ3JlYXRlRW52KHN0YXRpY19jYXN0PE9ydExvZ2dpbmdMZXZlbD4obG9nZ2luZ19sZXZlbCkpXG4gKi9cbmNvbnN0IGluaXRPcnQgPSAobnVtVGhyZWFkczogbnVtYmVyLCBsb2dnaW5nTGV2ZWw6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCBlcnJvckNvZGUgPSBnZXRJbnN0YW5jZSgpLl9PcnRJbml0KG51bVRocmVhZHMsIGxvZ2dpbmdMZXZlbCk7XG4gIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBpbml0aWFsaXplIG9ubnhydW50aW1lLicpO1xuICB9XG59O1xuXG4vKipcbiAqIGludGlhbGl6ZSBydW50aW1lIGVudmlyb25tZW50LlxuICogQHBhcmFtIGVudiBwYXNzZWQgaW4gdGhlIGVudmlyb25tZW50IGNvbmZpZyBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0UnVudGltZSA9IGFzeW5jKGVudjogRW52KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIC8vIGluaXQgT1JUXG4gIGluaXRPcnQoZW52Lndhc20ubnVtVGhyZWFkcyEsIGxvZ0xldmVsU3RyaW5nVG9FbnVtKGVudi5sb2dMZXZlbCkpO1xufTtcblxuLyoqXG4gKiBwZXJmb3JtIEVQIHNwZWNpZmljIGluaXRpYWxpemF0aW9uLlxuICpcbiAqIEBwYXJhbSBlbnZcbiAqIEBwYXJhbSBlcE5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRFcCA9IGFzeW5jKGVudjogRW52LCBlcE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgZXBOYW1lID09PSAnd2ViZ3B1Jykge1xuICAgIC8vIHBlcmZvcm0gV2ViR1BVIGF2YWlsYWJpbGl0eSBjaGVja1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhbmF2aWdhdG9yLmdwdSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJHUFUgaXMgbm90IHN1cHBvcnRlZCBpbiBjdXJyZW50IGVudmlyb25tZW50Jyk7XG4gICAgfVxuICAgIGNvbnN0IGFkYXB0ZXIgPSBhd2FpdCBuYXZpZ2F0b3IuZ3B1LnJlcXVlc3RBZGFwdGVyKCk7XG4gICAgaWYgKCFhZGFwdGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0ZhaWxlZCB0byBnZXQgR1BVIGFkYXB0ZXIuIFlvdSBtYXkgbmVlZCB0byBlbmFibGUgZmxhZyBcIi0tZW5hYmxlLXVuc2FmZS13ZWJncHVcIiBpZiB5b3UgYXJlIHVzaW5nIENocm9tZS4nKTtcbiAgICB9XG5cbiAgICBpZiAoIWVudi53YXNtLnNpbWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnTm90IHN1cHBvcnRlZCBmb3IgV2ViR1BVPU9OIGFuZCBTSU1EPU9GRi4gUGxlYXNlIHNldCBgZW52Lndhc20uc2ltZGAgdG8gdHJ1ZSB3aGVuIHVzaW5nIGB3ZWJncHVgIEVQJyk7XG4gICAgfVxuXG4gICAgLy8gaW5pdCBKU0VQIGlmIGF2YWlsYWJsZVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbiAgICBjb25zdCBpbml0SnNlcCA9IHJlcXVpcmUoJy4vanNlcC9pbml0JykuaW5pdDtcbiAgICBhd2FpdCBpbml0SnNlcChnZXRJbnN0YW5jZSgpLCBlbnYsIGFkYXB0ZXIpO1xuICB9XG59O1xuXG4vLyAjZW5kcmVnaW9uIEluaXRpYWxpemF0aW9uc1xuXG4vKipcbiAqIHZhbGlkIGRhdGEgbG9jYXRpb25zIGZvciBpbnB1dC9vdXRwdXQgdGVuc29ycy5cbiAqL1xudHlwZSBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dCA9ICdjcHUnfCdjcHUtcGlubmVkJ3wnZ3B1LWJ1ZmZlcic7XG5cbnR5cGUgSU9CaW5kaW5nU3RhdGUgPSB7XG4gIC8qKlxuICAgKiB0aGUgaGFuZGxlIG9mIElPIGJpbmRpbmcuXG4gICAqL1xuICByZWFkb25seSBoYW5kbGU6IG51bWJlcjtcblxuICAvKipcbiAgICogdGhlIHByZWZlcnJlZCBsb2NhdGlvbiBmb3IgZWFjaCBvdXRwdXQgdGVuc29yLlxuICAgKlxuICAgKiB2YWx1ZSBpcyBvbmUgb2YgJ2NwdScsICdjcHUtcGlubmVkJywgJ2dwdS1idWZmZXInLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zOiByZWFkb25seSBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dFtdO1xuXG4gIC8qKlxuICAgKiBlbnVtIHZhbHVlIG9mIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IHJlYWRvbmx5IG51bWJlcltdO1xufTtcblxuLyoqXG4gKiAgdHVwbGUgZWxlbWVudHMgYXJlOiBJbmZlcmVuY2VTZXNzaW9uIElEOyBpbnB1dE5hbWVzVVRGOEVuY29kZWQ7IG91dHB1dE5hbWVzVVRGOEVuY29kZWQ7IGJpbmRpbmdTdGF0ZVxuICovXG50eXBlIFNlc3Npb25NZXRhZGF0YSA9IFtcbiAgaW5mZXJlbmNlU2Vzc2lvbklkOiBudW1iZXIsIGlucHV0TmFtZXNVVEY4RW5jb2RlZDogbnVtYmVyW10sIG91dHB1dE5hbWVzVVRGOEVuY29kZWQ6IG51bWJlcltdLFxuICBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlfG51bGxcbl07XG5cbmNvbnN0IGFjdGl2ZVNlc3Npb25zID0gbmV3IE1hcDxudW1iZXIsIFNlc3Npb25NZXRhZGF0YT4oKTtcblxuLyoqXG4gKiBnZXQgdGhlIGlucHV0L291dHB1dCBjb3VudCBvZiB0aGUgc2Vzc2lvbi5cbiAqIEBwYXJhbSBzZXNzaW9uSGFuZGxlIHRoZSBoYW5kbGUgcmVwcmVzZW50aW5nIHRoZSBzZXNzaW9uLiBzaG91bGQgYmUgbm9uLXplcm8uXG4gKiBAcmV0dXJucyBhIHR1cGxlIGluY2x1ZGluZyAyIG51bWJlcnMsIHJlcHJlc2VudGluZyB0aGUgaW5wdXQgY291bnQgYW5kIG91dHB1dCBjb3VudC5cbiAqL1xuY29uc3QgZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQgPSAoc2Vzc2lvbkhhbmRsZTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg4KTtcbiAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRHZXRJbnB1dE91dHB1dENvdW50KHNlc3Npb25IYW5kbGUsIGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyA0KTtcbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgc2Vzc2lvbiBpbnB1dC9vdXRwdXQgY291bnQuJyk7XG4gICAgfVxuICAgIHJldHVybiBbd2FzbS5IRUFQMzJbZGF0YU9mZnNldCAvIDRdLCB3YXNtLkhFQVAzMltkYXRhT2Zmc2V0IC8gNCArIDFdXTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogYWxsb2NhdGUgdGhlIG1lbW9yeSBhbmQgbWVtY3B5IHRoZSBleHRlcm5hbCBidWZmZXIuXG4gKlxuICogQHBhcmFtIG1vZGVsIC0gdGhlIGV4dGVybmFsIGJ1ZmZlciBjb250YWluaW5nIHRoZSBtb2RlbCBkYXRhLiBNdXN0IG5vdCBiZSB0aGUgc2FtZSBidWZmZXIgYXMgdGhlIFdBU00gaGVhcC5cbiAqIEByZXR1cm5zIGEgMi1lbGVtZW50cyB0dXBsZSAtIHRoZSBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBhbGxvY2F0ZWQgYnVmZmVyXG4gKi9cbmV4cG9ydCBjb25zdCBjb3B5RnJvbUV4dGVybmFsQnVmZmVyID0gKG1vZGVsOiBVaW50OEFycmF5KTogW251bWJlciwgbnVtYmVyXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBtb2RlbERhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MobW9kZWwuYnl0ZUxlbmd0aCk7XG4gIGlmIChtb2RlbERhdGFPZmZzZXQgPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGNyZWF0ZSBhIHNlc3Npb24uIGZhaWxlZCB0byBhbGxvY2F0ZSBhIGJ1ZmZlciBvZiBzaXplICR7bW9kZWwuYnl0ZUxlbmd0aH0uYCk7XG4gIH1cbiAgd2FzbS5IRUFQVTguc2V0KG1vZGVsLCBtb2RlbERhdGFPZmZzZXQpO1xuICByZXR1cm4gW21vZGVsRGF0YU9mZnNldCwgbW9kZWwuYnl0ZUxlbmd0aF07XG59O1xuXG4vKipcbiAqIGNyZWF0ZSBhbiBpbmZlcmVuY2Ugc2Vzc2lvbiBmcm9tIGEgbW9kZWwgZGF0YSBidWZmZXIuXG4gKlxuICogQHBhcmFtIG1vZGVsRGF0YSAtIGVpdGhlciBhIFVpbnQ4QXJyYXkgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbW9kZWwgZGF0YSwgb3IgYSAyLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgdGhlXG4gKiAgICAgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YSBidWZmZXIuXG4gKiBAcGFyYW0gb3B0aW9ucyBhbiBvcHRpb25hbCBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0LlxuICogQHJldHVybnMgYSAzLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgW3Nlc3Npb24gaGFuZGxlLCBpbnB1dCBuYW1lcywgb3V0cHV0IG5hbWVzXVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9XG4gICAgKG1vZGVsRGF0YTogVWludDhBcnJheXxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcbiAgICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGEgPT4ge1xuICAgICAgbGV0IG1vZGVsRGF0YU9mZnNldDogbnVtYmVyLCBtb2RlbERhdGFMZW5ndGg6IG51bWJlcjtcbiAgICAgIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbERhdGEpKSB7XG4gICAgICAgIC8vIGlmIG1vZGVsIGRhdGEgaXMgYW4gYXJyYXksIGl0IG11c3QgYmUgYSAyLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIG1vZGVsIGRhdGFcbiAgICAgICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IG1vZGVsRGF0YTtcbiAgICAgIH0gZWxzZSBpZiAobW9kZWxEYXRhLmJ1ZmZlciA9PT0gd2FzbS5IRUFQVTguYnVmZmVyKSB7XG4gICAgICAgIC8vIGlmIG1vZGVsIGRhdGEgdXNlcyB0aGUgc2FtZSBidWZmZXIgYXMgdGhlIFdBU00gaGVhcCwgd2UgZG9uJ3QgbmVlZCB0byBjb3B5IGl0LlxuICAgICAgICBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGhdID0gW21vZGVsRGF0YS5ieXRlT2Zmc2V0LCBtb2RlbERhdGEuYnl0ZUxlbmd0aF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBvdGhlcndpc2UsIGNvcHkgdGhlIG1vZGVsIGRhdGEgdG8gdGhlIFdBU00gaGVhcC5cbiAgICAgICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIobW9kZWxEYXRhKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNlc3Npb25IYW5kbGUgPSAwO1xuICAgICAgbGV0IHNlc3Npb25PcHRpb25zSGFuZGxlID0gMDtcbiAgICAgIGxldCBpb0JpbmRpbmdIYW5kbGUgPSAwO1xuICAgICAgbGV0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcbiAgICAgIGNvbnN0IGlucHV0TmFtZXNVVEY4RW5jb2RlZCA9IFtdO1xuICAgICAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IFtdO1xuXG4gICAgICB0cnkge1xuICAgICAgICBbc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGFsbG9jc10gPSBzZXRTZXNzaW9uT3B0aW9ucyhvcHRpb25zKTtcblxuICAgICAgICBzZXNzaW9uSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlU2Vzc2lvbihtb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aCwgc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgICAgICBpZiAoc2Vzc2lvbkhhbmRsZSA9PT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBhIHNlc3Npb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBbaW5wdXRDb3VudCwgb3V0cHV0Q291bnRdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSk7XG5cbiAgICAgICAgY29uc3QgaW5wdXROYW1lcyA9IFtdO1xuICAgICAgICBjb25zdCBvdXRwdXROYW1lcyA9IFtdO1xuICAgICAgICBjb25zdCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnM6IFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBuYW1lID0gd2FzbS5fT3J0R2V0SW5wdXROYW1lKHNlc3Npb25IYW5kbGUsIGkpO1xuICAgICAgICAgIGlmIChuYW1lID09PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgYW4gaW5wdXQgbmFtZS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLnB1c2gobmFtZSk7XG4gICAgICAgICAgaW5wdXROYW1lcy5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBuYW1lID0gd2FzbS5fT3J0R2V0T3V0cHV0TmFtZShzZXNzaW9uSGFuZGxlLCBpKTtcbiAgICAgICAgICBpZiAobmFtZSA9PT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgZ2V0IGFuIG91dHB1dCBuYW1lLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLnB1c2gobmFtZSk7XG4gICAgICAgICAgY29uc3QgbmFtZVN0cmluZyA9IHdhc20uVVRGOFRvU3RyaW5nKG5hbWUpO1xuICAgICAgICAgIG91dHB1dE5hbWVzLnB1c2gobmFtZVN0cmluZyk7XG5cbiAgICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdHlwZW9mIG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbiA6XG4gICAgICAgICAgICAgICAgb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24/LltuYW1lU3RyaW5nXSA/PyAnY3B1JztcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbiAhPT0gJ2NwdScgJiYgbG9jYXRpb24gIT09ICdjcHUtcGlubmVkJyAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCBwcmVmZXJyZWQgb3V0cHV0IGxvY2F0aW9uOiAke2xvY2F0aW9ufS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1c2UgSU8gYmluZGluZyBvbmx5IHdoZW4gYXQgbGVhc3Qgb25lIG91dHB1dCBpcyBwcmVmZmVyZWQgdG8gYmUgb24gR1BVLlxuICAgICAgICBsZXQgYmluZGluZ1N0YXRlOiBJT0JpbmRpbmdTdGF0ZXxudWxsID0gbnVsbDtcbiAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVICYmIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5zb21lKGwgPT4gbCA9PT0gJ2dwdS1idWZmZXInKSkge1xuICAgICAgICAgIGlvQmluZGluZ0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZUJpbmRpbmcoc2Vzc2lvbkhhbmRsZSk7XG4gICAgICAgICAgaWYgKGlvQmluZGluZ0hhbmRsZSA9PT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIElPIGJpbmRpbmcuJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYmluZGluZ1N0YXRlID0ge1xuICAgICAgICAgICAgaGFuZGxlOiBpb0JpbmRpbmdIYW5kbGUsXG4gICAgICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsXG4gICAgICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkOiBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMubWFwKGwgPT4gZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGwpKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25IYW5kbGUsIFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGJpbmRpbmdTdGF0ZV0pO1xuICAgICAgICByZXR1cm4gW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXMsIG91dHB1dE5hbWVzXTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goYnVmID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcblxuICAgICAgICBpZiAoaW9CaW5kaW5nSGFuZGxlICE9PSAwKSB7XG4gICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nSGFuZGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXNzaW9uSGFuZGxlICE9PSAwKSB7XG4gICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb24oc2Vzc2lvbkhhbmRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uX2ZyZWUobW9kZWxEYXRhT2Zmc2V0KTtcbiAgICAgICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zKHNlc3Npb25PcHRpb25zSGFuZGxlKTtcbiAgICAgICAgfVxuICAgICAgICBhbGxvY3MuZm9yRWFjaChhbGxvYyA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgICB9XG4gICAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJlbGVhc2Ugc2Vzc2lvbi4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcbiAgfVxuICBjb25zdCBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZV0gPSBzZXNzaW9uO1xuXG4gIGlmIChpb0JpbmRpbmdTdGF0ZSkge1xuICAgIHdhc20uX09ydFJlbGVhc2VCaW5kaW5nKGlvQmluZGluZ1N0YXRlLmhhbmRsZSk7XG4gIH1cblxuICB3YXNtLmpzZXBVbnJlZ2lzdGVyQnVmZmVycz8uKHNlc3Npb25JZCk7XG5cbiAgaW5wdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goYnVmID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG4gIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb24oc2Vzc2lvbkhhbmRsZSk7XG4gIGFjdGl2ZVNlc3Npb25zLmRlbGV0ZShzZXNzaW9uSWQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVJbnB1dE91dHB1dFRlbnNvciA9XG4gICAgKHRlbnNvcjogVGVuc29yTWV0YWRhdGF8bnVsbCwgdGVuc29ySGFuZGxlczogbnVtYmVyW10sIGFsbG9jczogbnVtYmVyW10sIHNlc3Npb25JZDogbnVtYmVyLCBpbmRleDogbnVtYmVyKTpcbiAgICAgICAgdm9pZCA9PiB7XG4gICAgICAgICAgaWYgKCF0ZW5zb3IpIHtcbiAgICAgICAgICAgIHRlbnNvckhhbmRsZXMucHVzaCgwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICAgICAgICAgIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xuICAgICAgICAgIGNvbnN0IGRpbXMgPSB0ZW5zb3JbMV07XG4gICAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0ZW5zb3JbM107XG5cbiAgICAgICAgICBsZXQgcmF3RGF0YTogbnVtYmVyO1xuICAgICAgICAgIGxldCBkYXRhQnl0ZUxlbmd0aDogbnVtYmVyO1xuXG4gICAgICAgICAgaWYgKGRhdGFUeXBlID09PSAnc3RyaW5nJyAmJiBsb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGxvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IHRlbnNvclsyXS5ncHVCdWZmZXIgYXMgR1BVQnVmZmVyO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFNpemVJbkJ5dGVzID0gZ2V0VGVuc29yRWxlbWVudFNpemUodGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpKSE7XG4gICAgICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRpbXMucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSkgKiBlbGVtZW50U2l6ZUluQnl0ZXM7XG4gICAgICAgICAgICByYXdEYXRhID0gd2FzbS5qc2VwUmVnaXN0ZXJCdWZmZXIoc2Vzc2lvbklkLCBpbmRleCwgZ3B1QnVmZmVyLCBkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0ZW5zb3JbMl07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgIC8vIHN0cmluZyB0ZW5zb3JcbiAgICAgICAgICAgICAgZGF0YUJ5dGVMZW5ndGggPSA0ICogZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcbiAgICAgICAgICAgICAgbGV0IGRhdGFJbmRleCA9IHJhd0RhdGEgLyA0O1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB0ZW5zb3IgZGF0YSBhdCBpbmRleCAke2l9IGlzIG5vdCBhIHN0cmluZ2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3YXNtLkhFQVBVMzJbZGF0YUluZGV4KytdID0gYWxsb2NXYXNtU3RyaW5nKGRhdGFbaV0sIGFsbG9jcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICAgICAgICByYXdEYXRhID0gd2FzbS5fbWFsbG9jKGRhdGFCeXRlTGVuZ3RoKTtcbiAgICAgICAgICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICAgICAgICAgIHdhc20uSEVBUFU4LnNldChuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhQnl0ZUxlbmd0aCksIHJhd0RhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgICAgICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDQgKiBkaW1zLmxlbmd0aCk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkaW1JbmRleCA9IGRpbXNPZmZzZXQgLyA0O1xuICAgICAgICAgICAgZGltcy5mb3JFYWNoKGQgPT4gd2FzbS5IRUFQMzJbZGltSW5kZXgrK10gPSBkKTtcbiAgICAgICAgICAgIGNvbnN0IHRlbnNvciA9IHdhc20uX09ydENyZWF0ZVRlbnNvcihcbiAgICAgICAgICAgICAgICB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksIHJhd0RhdGEsIGRhdGFCeXRlTGVuZ3RoLCBkaW1zT2Zmc2V0LCBkaW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obG9jYXRpb24pKTtcbiAgICAgICAgICAgIGlmICh0ZW5zb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGNyZWF0ZSB0ZW5zb3IgZm9yIGlucHV0L291dHB1dC4gc2Vzc2lvbj0ke3Nlc3Npb25JZH0sIGluZGV4PSR7aW5kZXh9LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVuc29ySGFuZGxlcy5wdXNoKHRlbnNvcik7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbi8qKlxuICogcGVyZm9ybSBpbmZlcmVuY2UgcnVuXG4gKi9cbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyhcbiAgICBzZXNzaW9uSWQ6IG51bWJlciwgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSwgaW5wdXRUZW5zb3JzOiBUZW5zb3JNZXRhZGF0YVtdLCBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgICBvdXRwdXRUZW5zb3JzOiBBcnJheTxUZW5zb3JNZXRhZGF0YXxudWxsPiwgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJ1biBpbmZlcmVuY2UuIGludmFsaWQgc2Vzc2lvbiBpZDogJHtzZXNzaW9uSWR9YCk7XG4gIH1cbiAgY29uc3QgW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZCwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCwgaW9CaW5kaW5nU3RhdGVdID0gc2Vzc2lvbjtcblxuICBjb25zdCBpbnB1dENvdW50ID0gaW5wdXRJbmRpY2VzLmxlbmd0aDtcbiAgY29uc3Qgb3V0cHV0Q291bnQgPSBvdXRwdXRJbmRpY2VzLmxlbmd0aDtcblxuICBsZXQgcnVuT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGxldCBydW5PcHRpb25zQWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IGlucHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3Qgb3V0cHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3QgaW5wdXRPdXRwdXRBbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3QgYmVmb3JlUnVuU3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICBjb25zdCBpbnB1dFZhbHVlc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhpbnB1dENvdW50ICogNCk7XG4gIGNvbnN0IGlucHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIDQpO1xuICBjb25zdCBvdXRwdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2Mob3V0cHV0Q291bnQgKiA0KTtcbiAgY29uc3Qgb3V0cHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2Mob3V0cHV0Q291bnQgKiA0KTtcblxuICB0cnkge1xuICAgIFtydW5PcHRpb25zSGFuZGxlLCBydW5PcHRpb25zQWxsb2NzXSA9IHNldFJ1bk9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAvLyBjcmVhdGUgaW5wdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IoaW5wdXRUZW5zb3JzW2ldLCBpbnB1dFRlbnNvckhhbmRsZXMsIGlucHV0T3V0cHV0QWxsb2NzLCBzZXNzaW9uSWQsIGlucHV0SW5kaWNlc1tpXSk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG91dHB1dCB0ZW5zb3JzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IoXG4gICAgICAgICAgb3V0cHV0VGVuc29yc1tpXSwgb3V0cHV0VGVuc29ySGFuZGxlcywgaW5wdXRPdXRwdXRBbGxvY3MsIHNlc3Npb25JZCwgaW5wdXRDb3VudCArIG91dHB1dEluZGljZXNbaV0pO1xuICAgIH1cblxuICAgIGxldCBpbnB1dFZhbHVlc0luZGV4ID0gaW5wdXRWYWx1ZXNPZmZzZXQgLyA0O1xuICAgIGxldCBpbnB1dE5hbWVzSW5kZXggPSBpbnB1dE5hbWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgb3V0cHV0VmFsdWVzSW5kZXggPSBvdXRwdXRWYWx1ZXNPZmZzZXQgLyA0O1xuICAgIGxldCBvdXRwdXROYW1lc0luZGV4ID0gb3V0cHV0TmFtZXNPZmZzZXQgLyA0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICB3YXNtLkhFQVBVMzJbaW5wdXRWYWx1ZXNJbmRleCsrXSA9IGlucHV0VGVuc29ySGFuZGxlc1tpXTtcbiAgICAgIHdhc20uSEVBUFUzMltpbnB1dE5hbWVzSW5kZXgrK10gPSBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5wdXRJbmRpY2VzW2ldXTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICB3YXNtLkhFQVBVMzJbb3V0cHV0VmFsdWVzSW5kZXgrK10gPSBvdXRwdXRUZW5zb3JIYW5kbGVzW2ldO1xuICAgICAgd2FzbS5IRUFQVTMyW291dHB1dE5hbWVzSW5kZXgrK10gPSBvdXRwdXROYW1lc1VURjhFbmNvZGVkW291dHB1dEluZGljZXNbaV1dO1xuICAgIH1cblxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSAmJiBpb0JpbmRpbmdTdGF0ZSkge1xuICAgICAgY29uc3Qge2hhbmRsZSwgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkfSA9IGlvQmluZGluZ1N0YXRlO1xuXG4gICAgICBpZiAoaW5wdXROYW1lc1VURjhFbmNvZGVkLmxlbmd0aCAhPT0gaW5wdXRDb3VudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlucHV0IGNvdW50IGZyb20gZmVlZHMgKCR7XG4gICAgICAgICAgICBpbnB1dENvdW50fSkgaXMgZXhwZWN0ZWQgdG8gYmUgYWx3YXlzIGVxdWFsIHRvIG1vZGVsJ3MgaW5wdXQgY291bnQgKCR7aW5wdXROYW1lc1VURjhFbmNvZGVkLmxlbmd0aH0pLmApO1xuICAgICAgfVxuXG4gICAgICAvLyBwcm9jZXNzIGlucHV0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBpbnB1dEluZGljZXNbaV07XG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydEJpbmRJbnB1dChoYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIGlucHV0VGVuc29ySGFuZGxlc1tpXSk7XG4gICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBpbnB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcHJvY2VzcyBwcmUtYWxsb2NhdGVkIG91dHB1dHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IG91dHB1dEluZGljZXNbaV07XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gb3V0cHV0VGVuc29yc1tpXT8uWzNdOyAgLy8gdW5kZWZpbmVkIG1lYW5zIG91dHB1dCBpcyBub3QgcHJlLWFsbG9jYXRlZC5cblxuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAvLyBvdXRwdXQgaXMgcHJlLWFsbG9jYXRlZC4gYmluZCB0aGUgdGVuc29yLlxuICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEJpbmRPdXRwdXQoaGFuZGxlLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgb3V0cHV0VGVuc29ySGFuZGxlc1tpXSwgMCk7XG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgcHJlLWFsbG9jYXRlZCBvdXRwdXRbJHtpfV0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuIHJlc2V0IHByZWZlcnJlZCBsb2NhdGlvbi5cbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPVxuICAgICAgICAgICAgICB3YXNtLl9PcnRCaW5kT3V0cHV0KGhhbmRsZSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIDAsIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWRbaW5kZXhdKTtcbiAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBvdXRwdXRbJHtpfV0gdG8gJHtvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbaV19IGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZXJyb3JDb2RlOiBudW1iZXI7XG5cbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgaW9CaW5kaW5nU3RhdGUpIHtcbiAgICAgIGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydFJ1bldpdGhCaW5kaW5nKFxuICAgICAgICAgIHNlc3Npb25IYW5kbGUsIGlvQmluZGluZ1N0YXRlLmhhbmRsZSwgb3V0cHV0Q291bnQsIG91dHB1dFZhbHVlc09mZnNldCwgcnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydFJ1bihcbiAgICAgICAgICBzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzT2Zmc2V0LCBpbnB1dFZhbHVlc09mZnNldCwgaW5wdXRDb3VudCwgb3V0cHV0TmFtZXNPZmZzZXQsIG91dHB1dENvdW50LFxuICAgICAgICAgIG91dHB1dFZhbHVlc09mZnNldCwgcnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuXG4gICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ2ZhaWxlZCB0byBjYWxsIE9ydFJ1bigpLicpO1xuICAgIH1cblxuICAgIGNvbnN0IG91dHB1dDogVGVuc29yTWV0YWRhdGFbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCB0ZW5zb3IgPSB3YXNtLkhFQVBVMzJbb3V0cHV0VmFsdWVzT2Zmc2V0IC8gNCArIGldO1xuICAgICAgaWYgKHRlbnNvciA9PT0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXSkge1xuICAgICAgICAvLyBvdXRwdXQgdGVuc29yIGlzIHByZS1hbGxvY2F0ZWQuIG5vIG5lZWQgdG8gY29weSBkYXRhLlxuICAgICAgICBvdXRwdXQucHVzaChvdXRwdXRUZW5zb3JzW2ldISk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiZWZvcmVHZXRUZW5zb3JEYXRhU3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICAgICAgLy8gc3RhY2sgYWxsb2NhdGUgNCBwb2ludGVyIHZhbHVlXG4gICAgICBjb25zdCB0ZW5zb3JEYXRhT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDQgKiA0KTtcblxuICAgICAgbGV0IGtlZXBPdXRwdXRUZW5zb3IgPSBmYWxzZTtcbiAgICAgIGxldCB0eXBlOiBUZW5zb3IuVHlwZXx1bmRlZmluZWQsIGRhdGFPZmZzZXQgPSAwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0VGVuc29yRGF0YShcbiAgICAgICAgICAgIHRlbnNvciwgdGVuc29yRGF0YU9mZnNldCwgdGVuc29yRGF0YU9mZnNldCArIDQsIHRlbnNvckRhdGFPZmZzZXQgKyA4LCB0ZW5zb3JEYXRhT2Zmc2V0ICsgMTIpO1xuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFjY2VzcyBvdXRwdXQgdGVuc29yIGRhdGEgb24gaW5kZXggJHtpfS5gKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGVuc29yRGF0YUluZGV4ID0gdGVuc29yRGF0YU9mZnNldCAvIDQ7XG4gICAgICAgIGNvbnN0IGRhdGFUeXBlID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgZGF0YU9mZnNldCA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBjb25zdCBkaW1zTGVuZ3RoID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgY29uc3QgZGltcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRpbXMucHVzaCh3YXNtLkhFQVBVMzJbZGltc09mZnNldCAvIDQgKyBpXSk7XG4gICAgICAgIH1cbiAgICAgICAgd2FzbS5fT3J0RnJlZShkaW1zT2Zmc2V0KTtcblxuICAgICAgICBjb25zdCBzaXplID0gZGltcy5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKTtcbiAgICAgICAgdHlwZSA9IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nKGRhdGFUeXBlKTtcblxuICAgICAgICBjb25zdCBwcmVmZXJyZWRMb2NhdGlvbiA9IGlvQmluZGluZ1N0YXRlPy5vdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbb3V0cHV0SW5kaWNlc1tpXV07XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RyaW5nIHRlbnNvciBpcyBub3Qgc3VwcG9ydGVkIG9uIEdQVS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc3RyaW5nRGF0YTogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICBsZXQgZGF0YUluZGV4ID0gZGF0YU9mZnNldCAvIDQ7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHdhc20uSEVBUFUzMltkYXRhSW5kZXgrK107XG4gICAgICAgICAgICBjb25zdCBtYXhCeXRlc1RvUmVhZCA9IGkgPT09IHNpemUgLSAxID8gdW5kZWZpbmVkIDogd2FzbS5IRUFQVTMyW2RhdGFJbmRleF0gLSBvZmZzZXQ7XG4gICAgICAgICAgICBzdHJpbmdEYXRhLnB1c2god2FzbS5VVEY4VG9TdHJpbmcob2Zmc2V0LCBtYXhCeXRlc1RvUmVhZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgc3RyaW5nRGF0YSwgJ2NwdSddKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBhIGNlcnRhaW4gb3V0cHV0J3MgcHJlZmVycmVkIGxvY2F0aW9uIGlzIEdQVSBidXQgdGhlIHRlbnNvciBpcyBlbXB0eSwgd2Ugc3RpbGwgbmVlZCB0byBjcmVhdGUgYSBDUFVcbiAgICAgICAgICAvLyB0ZW5zb3IgZm9yIGl0LiBUaGVyZSBpcyBubyBtYXBwaW5nIEdQVSBidWZmZXIgZm9yIGFuIGVtcHR5IHRlbnNvci5cbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyAmJiBzaXplID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZ3B1QnVmZmVyID0gd2FzbS5qc2VwR2V0QnVmZmVyKGRhdGFPZmZzZXQpO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFNpemUgPSBnZXRUZW5zb3JFbGVtZW50U2l6ZShkYXRhVHlwZSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudFNpemUgPT09IHVuZGVmaW5lZCB8fCAhaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlKHR5cGUpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRvIG5vdCByZWxlYXNlIHRoZSB0ZW5zb3IgcmlnaHQgbm93LiBpdCB3aWxsIGJlIHJlbGVhc2VkIHdoZW4gdXNlciBjYWxscyB0ZW5zb3IuZGlzcG9zZSgpLlxuICAgICAgICAgICAga2VlcE91dHB1dFRlbnNvciA9IHRydWU7XG5cbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcbiAgICAgICAgICAgICAgdHlwZSwgZGltcywge1xuICAgICAgICAgICAgICAgIGdwdUJ1ZmZlcixcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogd2FzbS5qc2VwQ3JlYXRlRG93bmxvYWRlcihncHVCdWZmZXIsIHNpemUgKiBlbGVtZW50U2l6ZSwgdHlwZSksXG4gICAgICAgICAgICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgJ2dwdS1idWZmZXInXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdHlwZWRBcnJheUNvbnN0cnVjdG9yID0gdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yKHR5cGUpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG5ldyB0eXBlZEFycmF5Q29uc3RydWN0b3Ioc2l6ZSk7XG4gICAgICAgICAgICBuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgLnNldCh3YXNtLkhFQVBVOC5zdWJhcnJheShkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgZGF0YS5ieXRlTGVuZ3RoKSk7XG4gICAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgZGF0YSwgJ2NwdSddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uc3RhY2tSZXN0b3JlKGJlZm9yZUdldFRlbnNvckRhdGFTdGFjayk7XG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiBkYXRhT2Zmc2V0KSB7XG4gICAgICAgICAgd2FzbS5fZnJlZShkYXRhT2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWtlZXBPdXRwdXRUZW5zb3IpIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW9CaW5kaW5nU3RhdGUpIHtcbiAgICAgIHdhc20uX09ydENsZWFyQm91bmRPdXRwdXRzKGlvQmluZGluZ1N0YXRlLmhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShiZWZvcmVSdW5TdGFjayk7XG5cbiAgICBpbnB1dFRlbnNvckhhbmRsZXMuZm9yRWFjaCh2ID0+IHdhc20uX09ydFJlbGVhc2VUZW5zb3IodikpO1xuICAgIG91dHB1dFRlbnNvckhhbmRsZXMuZm9yRWFjaCh2ID0+IHdhc20uX09ydFJlbGVhc2VUZW5zb3IodikpO1xuICAgIGlucHV0T3V0cHV0QWxsb2NzLmZvckVhY2gocCA9PiB3YXNtLl9mcmVlKHApKTtcblxuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgcnVuT3B0aW9uc0FsbG9jcy5mb3JFYWNoKHAgPT4gd2FzbS5fZnJlZShwKSk7XG4gIH1cbn07XG5cbi8qKlxuICogZW5kIHByb2ZpbGluZ1xuICovXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzZXNzaW9uIGlkJyk7XG4gIH1cbiAgY29uc3Qgc2Vzc2lvbkhhbmRsZSA9IHNlc3Npb25bMF07XG5cbiAgLy8gcHJvZmlsZSBmaWxlIG5hbWUgaXMgbm90IHVzZWQgeWV0LCBidXQgaXQgbXVzdCBiZSBmcmVlZC5cbiAgY29uc3QgcHJvZmlsZUZpbGVOYW1lID0gd2FzbS5fT3J0RW5kUHJvZmlsaW5nKHNlc3Npb25IYW5kbGUpO1xuICBpZiAocHJvZmlsZUZpbGVOYW1lID09PSAwKSB7XG4gICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgZ2V0IGFuIHByb2ZpbGUgZmlsZSBuYW1lLicpO1xuICB9XG4gIHdhc20uX09ydEZyZWUocHJvZmlsZUZpbGVOYW1lKTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyA9ICh0ZW5zb3JzOiByZWFkb25seSBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKTogQXJyYXlCdWZmZXJMaWtlW10gPT4ge1xuICBjb25zdCBidWZmZXJzOiBBcnJheUJ1ZmZlckxpa2VbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHRlbnNvciBvZiB0ZW5zb3JzKSB7XG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkgJiYgJ2J1ZmZlcicgaW4gZGF0YSkge1xuICAgICAgYnVmZmVycy5wdXNoKGRhdGEuYnVmZmVyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ1ZmZlcnM7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge2VudiwgSW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtPcnRXYXNtTWVzc2FnZSwgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSwgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEsIFRlbnNvck1ldGFkYXRhfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnLi93YXNtLWNvcmUtaW1wbCc7XG5pbXBvcnQge2luaXRpYWxpemVXZWJBc3NlbWJseX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuXG5jb25zdCBpc1Byb3h5ID0gKCk6IGJvb2xlYW4gPT4gISFlbnYud2FzbS5wcm94eSAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xubGV0IHByb3h5V29ya2VyOiBXb3JrZXJ8dW5kZWZpbmVkO1xubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgYWJvcnRlZCA9IGZhbHNlO1xuXG50eXBlIFByb21pc2VDYWxsYmFja3M8VCA9IHZvaWQ+ID0gW3Jlc29sdmU6IChyZXN1bHQ6IFQpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbjogdW5rbm93bikgPT4gdm9pZF07XG5sZXQgaW5pdFdhc21DYWxsYmFja3M6IFByb21pc2VDYWxsYmFja3M7XG5jb25zdCBxdWV1ZWRDYWxsYmFja3M6IE1hcDxPcnRXYXNtTWVzc2FnZVsndHlwZSddLCBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPHVua25vd24+Pj4gPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGVucXVldWVDYWxsYmFja3MgPSAodHlwZTogT3J0V2FzbU1lc3NhZ2VbJ3R5cGUnXSwgY2FsbGJhY2tzOiBQcm9taXNlQ2FsbGJhY2tzPHVua25vd24+KTogdm9pZCA9PiB7XG4gIGNvbnN0IHF1ZXVlID0gcXVldWVkQ2FsbGJhY2tzLmdldCh0eXBlKTtcbiAgaWYgKHF1ZXVlKSB7XG4gICAgcXVldWUucHVzaChjYWxsYmFja3MpO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlZENhbGxiYWNrcy5zZXQodHlwZSwgW2NhbGxiYWNrc10pO1xuICB9XG59O1xuXG5jb25zdCBlbnN1cmVXb3JrZXIgPSAoKTogdm9pZCA9PiB7XG4gIGlmIChpbml0aWFsaXppbmcgfHwgIWluaXRpYWxpemVkIHx8IGFib3J0ZWQgfHwgIXByb3h5V29ya2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b3JrZXIgbm90IHJlYWR5Jyk7XG4gIH1cbn07XG5cbmNvbnN0IG9uUHJveHlXb3JrZXJNZXNzYWdlID0gKGV2OiBNZXNzYWdlRXZlbnQ8T3J0V2FzbU1lc3NhZ2U+KTogdm9pZCA9PiB7XG4gIHN3aXRjaCAoZXYuZGF0YS50eXBlKSB7XG4gICAgY2FzZSAnaW5pdC13YXNtJzpcbiAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICBpbml0V2FzbUNhbGxiYWNrc1sxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzWzBdKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbml0LWVwJzpcbiAgICBjYXNlICdjb3B5LWZyb20nOlxuICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgY2FzZSAncmVsZWFzZSc6XG4gICAgY2FzZSAncnVuJzpcbiAgICBjYXNlICdlbmQtcHJvZmlsaW5nJzoge1xuICAgICAgY29uc3QgY2FsbGJhY2tzID0gcXVldWVkQ2FsbGJhY2tzLmdldChldi5kYXRhLnR5cGUpITtcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBjYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2tzLnNoaWZ0KCkhWzBdKGV2LmRhdGEub3V0ISk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgfVxufTtcblxuY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6IHVuZGVmaW5lZDtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVXZWJBc3NlbWJseUFuZE9ydFJ1bnRpbWUgPSBhc3luYygpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChpbml0aWFsaXppbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpcGxlIGNhbGxzIHRvIFxcJ2luaXRXYXNtKClcXCcgZGV0ZWN0ZWQuJyk7XG4gIH1cbiAgaWYgKGFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzIGNhbGwgdG8gXFwnaW5pdFdhc20oKVxcJyBmYWlsZWQuJyk7XG4gIH1cblxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgLy8gb3ZlcndyaXRlIHdhc20gZmlsZXBhdGhzXG4gICAgaWYgKGVudi53YXNtLndhc21QYXRocyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoc2NyaXB0U3JjICYmIHNjcmlwdFNyYy5pbmRleE9mKCdibG9iOicpICE9PSAwKSB7XG4gICAgICAgIGVudi53YXNtLndhc21QYXRocyA9IHNjcmlwdFNyYy5zdWJzdHIoMCwgKyhzY3JpcHRTcmMpLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcHJveHlXb3JrZXI/LnRlcm1pbmF0ZSgpO1xuXG4gICAgICBjb25zdCB3b3JrZXJVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIC8vIFRoaXMgcmVxdWlyZSgpIGZ1bmN0aW9uIGlzIGhhbmRsZWQgYnkgZXNidWlsZCBwbHVnaW4gdG8gbG9hZCBmaWxlIGNvbnRlbnQgYXMgc3RyaW5nLlxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHNcbiAgICAgICAgICAgIHJlcXVpcmUoJy4vcHJveHktd29ya2VyL21haW4nKVxuICAgICAgICAgIF0sXG4gICAgICAgICAge3R5cGU6ICd0ZXh0L2phdmFzY3JpcHQnfSkpO1xuICAgICAgcHJveHlXb3JrZXIgPSBuZXcgV29ya2VyKHdvcmtlclVybCwge25hbWU6ICdvcnQtd2FzbS1wcm94eS13b3JrZXInfSk7XG4gICAgICBwcm94eVdvcmtlci5vbmVycm9yID0gKGV2OiBFcnJvckV2ZW50KSA9PiByZWplY3QoZXYpO1xuICAgICAgcHJveHlXb3JrZXIub25tZXNzYWdlID0gb25Qcm94eVdvcmtlck1lc3NhZ2U7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHdvcmtlclVybCk7XG4gICAgICBpbml0V2FzbUNhbGxiYWNrcyA9IFtyZXNvbHZlLCByZWplY3RdO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2luaXQtd2FzbScsIGluIDogZW52fTtcbiAgICAgIHByb3h5V29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGluaXRpYWxpemVXZWJBc3NlbWJseShlbnYud2FzbSk7XG4gICAgICBhd2FpdCBjb3JlLmluaXRSdW50aW1lKGVudik7XG4gICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICB0aHJvdyBlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplT3J0RXAgPSBhc3luYyhlcE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdpbml0LWVwJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2luaXQtZXAnLCBpbiA6IHtlcE5hbWUsIGVudn19O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IGNvcmUuaW5pdEVwKGVudiwgZXBOYW1lKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIgPSBhc3luYyhidWZmZXI6IFVpbnQ4QXJyYXkpOiBQcm9taXNlPFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdjb3B5LWZyb20nLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnY29weS1mcm9tJywgaW4gOiB7YnVmZmVyfX07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgW2J1ZmZlci5idWZmZXJdKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29yZS5jb3B5RnJvbUV4dGVybmFsQnVmZmVyKGJ1ZmZlcik7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID1cbiAgICBhc3luYyhtb2RlbDogU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXJ8VWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgICBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4gPT4ge1xuICAgICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgICAgICAgICAvLyBjaGVjayB1bnN1cHBvcnRlZCBvcHRpb25zXG4gICAgICAgICAgICBpZiAob3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXNzaW9uIG9wdGlvbiBcInByZWZlcnJlZE91dHB1dExvY2F0aW9uXCIgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnY3JlYXRlJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnY3JlYXRlJywgaW4gOiB7bW9kZWwsIG9wdGlvbnN9fTtcbiAgICAgICAgICAgICAgY29uc3QgdHJhbnNmZXJhYmxlOiBUcmFuc2ZlcmFibGVbXSA9IFtdO1xuICAgICAgICAgICAgICBpZiAobW9kZWwgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmZXJhYmxlLnB1c2gobW9kZWwuYnVmZmVyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgdHJhbnNmZXJhYmxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY29yZS5jcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbmV4cG9ydCBjb25zdCByZWxlYXNlU2Vzc2lvbiA9IGFzeW5jKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ3JlbGVhc2UnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAncmVsZWFzZScsIGluIDogc2Vzc2lvbklkfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb3JlLnJlbGVhc2VTZXNzaW9uKHNlc3Npb25JZCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyhcbiAgICBzZXNzaW9uSWQ6IG51bWJlciwgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSwgaW5wdXRzOiBUZW5zb3JNZXRhZGF0YVtdLCBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgICBvdXRwdXRzOiBBcnJheTxUZW5zb3JNZXRhZGF0YXxudWxsPiwgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgLy8gY2hlY2sgaW5wdXRzIGxvY2F0aW9uXG4gICAgaWYgKGlucHV0cy5zb21lKHQgPT4gdFszXSAhPT0gJ2NwdScpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lucHV0IHRlbnNvciBvbiBHUFUgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XG4gICAgfVxuICAgIC8vIGNoZWNrIG91dHB1dHMgbG9jYXRpb25cbiAgICBpZiAob3V0cHV0cy5zb21lKHQgPT4gdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncHJlLWFsbG9jYXRlZCBvdXRwdXQgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygncnVuJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3Qgc2VyaWFsaXphYmxlSW5wdXRzID0gaW5wdXRzIGFzIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW107ICAvLyBldmVyeSBpbnB1dCBpcyBvbiBDUFUuXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9XG4gICAgICAgICAge3R5cGU6ICdydW4nLCBpbiA6IHtzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzOiBzZXJpYWxpemFibGVJbnB1dHMsIG91dHB1dEluZGljZXMsIG9wdGlvbnN9fTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBjb3JlLmV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzKHNlcmlhbGl6YWJsZUlucHV0cykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLnJ1bihzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IGFzeW5jKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2VuZC1wcm9maWxpbmcnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnZW5kLXByb2ZpbGluZycsIGluIDogc2Vzc2lvbklkfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb3JlLmVuZFByb2ZpbGluZyhzZXNzaW9uSWQpO1xuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCByZWFkRmlsZSA9IHVuZGVmaW5lZDsiLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7cmVhZEZpbGV9IGZyb20gJ25vZGU6ZnMvcHJvbWlzZXMnO1xuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9uLCBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciwgU2Vzc2lvbkhhbmRsZXIsIFRlbnNvciwgVFJBQ0VfRlVOQ19CRUdJTiwgVFJBQ0VfRlVOQ19FTkR9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsIFRlbnNvck1ldGFkYXRhfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCB7Y29weUZyb21FeHRlcm5hbEJ1ZmZlciwgY3JlYXRlU2Vzc2lvbiwgZW5kUHJvZmlsaW5nLCByZWxlYXNlU2Vzc2lvbiwgcnVufSBmcm9tICcuL3Byb3h5LXdyYXBwZXInO1xuaW1wb3J0IHtpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGV9IGZyb20gJy4vd2FzbS1jb21tb24nO1xuXG5leHBvcnQgY29uc3QgZW5jb2RlVGVuc29yTWV0YWRhdGEgPSAodGVuc29yOiBUZW5zb3IsIGdldE5hbWU6ICgpID0+IHN0cmluZyk6IFRlbnNvck1ldGFkYXRhID0+IHtcbiAgc3dpdGNoICh0ZW5zb3IubG9jYXRpb24pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHRlbnNvci5kYXRhLCAnY3B1J107XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XG4gICAgICByZXR1cm4gW3RlbnNvci50eXBlLCB0ZW5zb3IuZGltcywge2dwdUJ1ZmZlcjogdGVuc29yLmdwdUJ1ZmZlcn0sICdncHUtYnVmZmVyJ107XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvci5sb2NhdGlvbn0gZm9yICR7Z2V0TmFtZSgpfWApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZGVjb2RlVGVuc29yTWV0YWRhdGEgPSAodGVuc29yOiBUZW5zb3JNZXRhZGF0YSk6IFRlbnNvciA9PiB7XG4gIHN3aXRjaCAodGVuc29yWzNdKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHRlbnNvclswXSwgdGVuc29yWzJdLCB0ZW5zb3JbMV0pO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XG4gICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcbiAgICAgIGlmICghaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlKGRhdGFUeXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZGF0YSB0eXBlOiAke2RhdGFUeXBlfSBmb3IgZGVzZXJpYWxpemluZyBHUFUgdGVuc29yYCk7XG4gICAgICB9XG4gICAgICBjb25zdCB7Z3B1QnVmZmVyLCBkb3dubG9hZCwgZGlzcG9zZX0gPSB0ZW5zb3JbMl07XG4gICAgICByZXR1cm4gVGVuc29yLmZyb21HcHVCdWZmZXIoZ3B1QnVmZmVyLCB7ZGF0YVR5cGUsIGRpbXM6IHRlbnNvclsxXSwgZG93bmxvYWQsIGRpc3Bvc2V9KTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvclszXX1gKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlTZXNzaW9uSGFuZGxlciBpbXBsZW1lbnRzIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIHtcbiAgcHJpdmF0ZSBzZXNzaW9uSWQ6IG51bWJlcjtcblxuICBpbnB1dE5hbWVzOiBzdHJpbmdbXTtcbiAgb3V0cHV0TmFtZXM6IHN0cmluZ1tdO1xuXG4gIGFzeW5jIGZldGNoTW9kZWxBbmRDb3B5VG9XYXNtTWVtb3J5KHBhdGg6IHN0cmluZyk6IFByb21pc2U8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXI+IHtcbiAgICAvLyBmZXRjaCBtb2RlbCBmcm9tIHVybCBhbmQgbW92ZSB0byB3YXNtIGhlYXAuIFRoZSBhcnJheWJ1ZmZmZXIgdGhhdCBoZWxkIHRoZSBodHRwXG4gICAgLy8gcmVzcG9uc2UgaXMgZnJlZWQgb25jZSB3ZSByZXR1cm5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBhdGgpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gbG9hZCBtb2RlbDogJHtwYXRofWApO1xuICAgIH1cbiAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG4gICAgcmV0dXJuIGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRNb2RlbChwYXRoT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcbiAgICBsZXQgbW9kZWw6IFBhcmFtZXRlcnM8dHlwZW9mIGNyZWF0ZVNlc3Npb24+WzBdO1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoT3JCdWZmZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MudmVyc2lvbnMgJiYgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlKSB7XG4gICAgICAgIC8vIG5vZGVcbiAgICAgICAgbW9kZWwgPSBhd2FpdCByZWFkRmlsZShwYXRoT3JCdWZmZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYnJvd3NlclxuICAgICAgICAvLyBmZXRjaCBtb2RlbCBhbmQgY29weSB0byB3YXNtIGhlYXAuXG4gICAgICAgIG1vZGVsID0gYXdhaXQgdGhpcy5mZXRjaE1vZGVsQW5kQ29weVRvV2FzbU1lbW9yeShwYXRoT3JCdWZmZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtb2RlbCA9IHBhdGhPckJ1ZmZlcjtcbiAgICB9XG5cbiAgICBbdGhpcy5zZXNzaW9uSWQsIHRoaXMuaW5wdXROYW1lcywgdGhpcy5vdXRwdXROYW1lc10gPSBhd2FpdCBjcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcbiAgICBUUkFDRV9GVU5DX0VORCgpO1xuICB9XG5cbiAgYXN5bmMgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gcmVsZWFzZVNlc3Npb24odGhpcy5zZXNzaW9uSWQpO1xuICB9XG5cbiAgYXN5bmMgcnVuKGZlZWRzOiBTZXNzaW9uSGFuZGxlci5GZWVkc1R5cGUsIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIGNvbnN0IGlucHV0QXJyYXk6IFRlbnNvcltdID0gW107XG4gICAgY29uc3QgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIE9iamVjdC5lbnRyaWVzKGZlZWRzKS5mb3JFYWNoKGt2cCA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmlucHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGlucHV0ICcke25hbWV9J2ApO1xuICAgICAgfVxuICAgICAgaW5wdXRBcnJheS5wdXNoKHRlbnNvcik7XG4gICAgICBpbnB1dEluZGljZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvdXRwdXRBcnJheTogQXJyYXk8VGVuc29yfG51bGw+ID0gW107XG4gICAgY29uc3Qgb3V0cHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBPYmplY3QuZW50cmllcyhmZXRjaGVzKS5mb3JFYWNoKGt2cCA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm91dHB1dE5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvdXRwdXQgJyR7bmFtZX0nYCk7XG4gICAgICB9XG4gICAgICBvdXRwdXRBcnJheS5wdXNoKHRlbnNvcik7XG4gICAgICBvdXRwdXRJbmRpY2VzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaW5wdXRzID1cbiAgICAgICAgaW5wdXRBcnJheS5tYXAoKHQsIGkpID0+IGVuY29kZVRlbnNvck1ldGFkYXRhKHQsICgpID0+IGBpbnB1dCBcIiR7dGhpcy5pbnB1dE5hbWVzW2lucHV0SW5kaWNlc1tpXV19XCJgKSk7XG4gICAgY29uc3Qgb3V0cHV0cyA9IG91dHB1dEFycmF5Lm1hcChcbiAgICAgICAgKHQsIGkpID0+IHQgPyBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgb3V0cHV0IFwiJHt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dfVwiYCkgOiBudWxsKTtcblxuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBydW4odGhpcy5zZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHJlc3VsdE1hcDogU2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZSA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0TWFwW3RoaXMub3V0cHV0TmFtZXNbb3V0cHV0SW5kaWNlc1tpXV1dID0gb3V0cHV0QXJyYXlbaV0gPz8gZGVjb2RlVGVuc29yTWV0YWRhdGEocmVzdWx0c1tpXSk7XG4gICAgfVxuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XG4gICAgcmV0dXJuIHJlc3VsdE1hcDtcbiAgfVxuXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCBwcm9maWxpbmdcbiAgfVxuXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB2b2lkIGVuZFByb2ZpbGluZyh0aGlzLnNlc3Npb25JZCk7XG4gIH1cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtjcHVzfSBmcm9tICdub2RlOm9zJztcbmltcG9ydCB7QmFja2VuZCwgZW52LCBJbmZlcmVuY2VTZXNzaW9uLCBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtpbml0aWFsaXplT3J0RXAsIGluaXRpYWxpemVXZWJBc3NlbWJseUFuZE9ydFJ1bnRpbWV9IGZyb20gJy4vd2FzbS9wcm94eS13cmFwcGVyJztcbmltcG9ydCB7T25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyfSBmcm9tICcuL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZSc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyBhbGwgZmxhZ3MgZm9yIFdlYkFzc2VtYmx5LlxuICpcbiAqIFRob3NlIGZsYWdzIGFyZSBhY2Nlc3NpYmxlIGZyb20gYG9ydC5lbnYud2FzbWAuIFVzZXJzIGFyZSBhbGxvdyB0byBzZXQgdGhvc2UgZmxhZ3MgYmVmb3JlIHRoZSBmaXJzdCBpbmZlcmVuY2Ugc2Vzc2lvblxuICogYmVpbmcgY3JlYXRlZCwgdG8gb3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVGbGFncyA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5pbml0VGltZW91dCAhPT0gJ251bWJlcicgfHwgZW52Lndhc20uaW5pdFRpbWVvdXQgPCAwKSB7XG4gICAgZW52Lndhc20uaW5pdFRpbWVvdXQgPSAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5zaW1kICE9PSAnYm9vbGVhbicpIHtcbiAgICBlbnYud2FzbS5zaW1kID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW52Lndhc20ucHJveHkgIT09ICdib29sZWFuJykge1xuICAgIGVudi53YXNtLnByb3h5ID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGVudi53YXNtLnRyYWNlICE9PSAnYm9vbGVhbicpIHtcbiAgICBlbnYud2FzbS50cmFjZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5udW1UaHJlYWRzICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihlbnYud2FzbS5udW1UaHJlYWRzKSB8fCBlbnYud2FzbS5udW1UaHJlYWRzIDw9IDApIHtcbiAgICBjb25zdCBudW1DcHVMb2dpY2FsQ29yZXMgPSB0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyA/IGNwdXMoKS5sZW5ndGggOiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeTtcbiAgICBlbnYud2FzbS5udW1UaHJlYWRzID0gTWF0aC5taW4oNCwgTWF0aC5jZWlsKChudW1DcHVMb2dpY2FsQ29yZXMgfHwgMSkgLyAyKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCBpbXBsZW1lbnRzIEJhY2tlbmQge1xuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgV2ViQXNzZW1ibHkgYmFja2VuZC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBvbmx5IG9uY2UgZm9yIGVhY2ggYmFja2VuZCBuYW1lLiBJdCB3aWxsIGJlIGNhbGxlZCB0aGUgZmlyc3QgdGltZSB3aGVuXG4gICAqIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkIHdpdGggYSByZWdpc3RlcmVkIGJhY2tlbmQgbmFtZS5cbiAgICpcbiAgICogQHBhcmFtIGJhY2tlbmROYW1lIC0gdGhlIHJlZ2lzdGVyZWQgYmFja2VuZCBuYW1lLlxuICAgKi9cbiAgYXN5bmMgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gcG9wdWxhdGUgd2FzbSBmbGFnc1xuICAgIGluaXRpYWxpemVGbGFncygpO1xuXG4gICAgLy8gaW5pdCB3YXNtXG4gICAgYXdhaXQgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSgpO1xuXG4gICAgLy8gcGVyZm9ybWUgRVAgc3BlY2lmaWMgaW5pdGlhbGl6YXRpb25cbiAgICBhd2FpdCBpbml0aWFsaXplT3J0RXAoYmFja2VuZE5hbWUpO1xuICB9XG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKHBhdGg6IHN0cmluZywgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG4gIGFzeW5jIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKHBhdGhPckJ1ZmZlcjogc3RyaW5nfFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+IHtcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IE9ubnhydW50aW1lV2ViQXNzZW1ibHlTZXNzaW9uSGFuZGxlcigpO1xuICAgIGF3YWl0IGhhbmRsZXIubG9hZE1vZGVsKHBhdGhPckJ1ZmZlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShoYW5kbGVyKTtcbiAgfVxufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge09ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmQtd2FzbSc7XG5leHBvcnQgY29uc3Qgd2FzbUJhY2tlbmQgPSBuZXcgT25ueHJ1bnRpbWVXZWJBc3NlbWJseUJhY2tlbmQoKTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlcywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cyAqL1xuLy8gV2UgdXNlIFwicmVxdWlyZVwiIGluc3RlYWQgb2YgXCJpbXBvcnRcIiBoZXJlIGJlY2F1c2UgaW1wb3J0IHN0YXRlbWVudCBtdXN0IGJlIHB1dCBpbiB0b3AgbGV2ZWwuIE91ciBjdXJyZW50IGNvZGUgZG9lc1xuLy8gbm90IGFsbG93IGJ1bmRsZXIgdG8gdHJlZS1zaGFraW5nIGNvZGUgYXMgZXhwZWN0ZWQgYmVjYXVzZSBzb21lIGNvZGVzIGFyZSB0cmVhdGVkIGFzIGhhdmluZyBzaWRlIGVmZmVjdHMuXG4vLyBTbyB3ZSBpbXBvcnQgY29kZSBpbnNpZGUgdGhlIGlmLWNsYXVzZSB0byBhbGxvdyBidW5kbGVyIHJlbW92ZSB0aGUgY29kZSBzYWZlbHkuXG5cbmV4cG9ydCAqIGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5pbXBvcnQgKiBhcyBvcnQgZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0IG9ydDtcblxuaW1wb3J0IHtyZWdpc3RlckJhY2tlbmQsIGVudn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAnLi92ZXJzaW9uJztcblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR0wpIHtcbiAgY29uc3Qgb25ueGpzQmFja2VuZCA9IHJlcXVpcmUoJy4vYmFja2VuZC1vbm54anMnKS5vbm54anNCYWNrZW5kO1xuICByZWdpc3RlckJhY2tlbmQoJ3dlYmdsJywgb25ueGpzQmFja2VuZCwgLTEwKTtcbn1cblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTSkge1xuICBjb25zdCB3YXNtQmFja2VuZCA9IEJVSUxEX0RFRlMuRElTQUJMRV9UUkFJTklORyA/IHJlcXVpcmUoJy4vYmFja2VuZC13YXNtLWluZmVyZW5jZScpLndhc21CYWNrZW5kIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlKCcuL2JhY2tlbmQtd2FzbS10cmFpbmluZycpLndhc21CYWNrZW5kO1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgICByZWdpc3RlckJhY2tlbmQoJ3dlYmdwdScsIHdhc21CYWNrZW5kLCA1KTtcbiAgfVxuICByZWdpc3RlckJhY2tlbmQoJ2NwdScsIHdhc21CYWNrZW5kLCAxMCk7XG4gIHJlZ2lzdGVyQmFja2VuZCgnd2FzbScsIHdhc21CYWNrZW5kLCAxMCk7XG4gIGlmIChCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkcpIHtcbiAgICByZWdpc3RlckJhY2tlbmQoJ3hubnBhY2snLCB3YXNtQmFja2VuZCwgOSk7XG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCTk4pIHtcbiAgICAgIHJlZ2lzdGVyQmFja2VuZCgnd2Vibm4nLCB3YXNtQmFja2VuZCwgOSk7XG4gICAgfVxuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnYudmVyc2lvbnMsICd3ZWInLCB7dmFsdWU6IHZlcnNpb24sIGVudW1lcmFibGU6IHRydWV9KTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSAvanMvc2NyaXB0cy91cGRhdGUtdmVyc2lvbi50c1xuLy8gRG8gbm90IG1vZGlmeSBmaWxlIGNvbnRlbnQgbWFudWFsbHkuXG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzEuMTcuMCc7XG4iXSwK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SSxJQUFFLFlBQVUsT0FBTyxJQUFFLEVBQUUsU0FBUyxJQUFFLEtBQUcsSUFBRyxFQUFFLFNBQU87QUFBRyxrQkFBRSxFQUFFLENBQUMsSUFBRTtBQUFFLG1CQUFPO0FBQUEsVUFBQztBQUFDLG1CQUFTLEVBQUUsR0FBRSxHQUFFO0FBQUMsbUJBQU8sRUFBRSxHQUFFLEdBQUUsR0FBRztBQUFBLFVBQUM7QUFBQyxtQkFBUyxFQUFFLEdBQUUsR0FBRTtBQUFDLHFCQUFTLEVBQUUsSUFBRztBQUFDLHFCQUFPLElBQUUsS0FBRyxLQUFHLElBQUUsS0FBRyxJQUFFO0FBQUEsWUFBQztBQUFDLGdCQUFJO0FBQUUsbUJBQUssSUFBRSxFQUFFLEVBQUUsWUFBWSxJQUFFLEVBQUUsWUFBWSxDQUFDLE1BQUksT0FBSyxJQUFFLEVBQUUsRUFBRSxTQUFTLElBQUUsRUFBRSxTQUFTLENBQUMsT0FBSyxJQUFFLEVBQUUsRUFBRSxRQUFRLElBQUUsRUFBRSxRQUFRLENBQUM7QUFBRyxtQkFBTztBQUFBLFVBQUM7QUFBQyxtQkFBUyxFQUFFLEdBQUU7QUFBQyxvQkFBTyxFQUFFLE9BQU8sR0FBRTtBQUFBLGNBQUMsS0FBSztBQUFFLHVCQUFPLElBQUksS0FBSyxFQUFFLFlBQVksSUFBRSxHQUFFLElBQUcsRUFBRTtBQUFBLGNBQUUsS0FBSztBQUFFLHVCQUFPO0FBQUEsY0FBRSxLQUFLO0FBQUUsdUJBQU8sSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQztBQUFBLGNBQUUsS0FBSztBQUFFLHVCQUFPLElBQUk7QUFBQSxrQkFBSyxFQUFFLFlBQVk7QUFBQSxrQkFDNWY7QUFBQSxrQkFBRTtBQUFBLGdCQUFDO0FBQUEsY0FBRSxLQUFLO0FBQUUsdUJBQU8sSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQztBQUFBLGNBQUUsS0FBSztBQUFFLHVCQUFPLElBQUksS0FBSyxFQUFFLFlBQVksSUFBRSxHQUFFLElBQUcsRUFBRTtBQUFBLGNBQUUsS0FBSztBQUFFLHVCQUFPLElBQUksS0FBSyxFQUFF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QTJELE1BQU0sR0FBRyxHQUFFLElBQUUsd0ZBQXdGLE1BQU0sR0FBRztBQUFFLGNBQUUsRUFBQyxNQUFLLE9BQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFFLE1BQUssT0FDemYsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFFLE1BQUssT0FBRyxHQUFHLEVBQUUsS0FBRyxRQUFNLE1BQUksR0FBRSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLENBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxFQUFFLElBQUcsR0FBRSxHQUFHLEdBQUUsTUFBSyxPQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLENBQUMsR0FBRSxNQUFLLE9BQUc7QUFBQyxnQkFBRSxFQUFFO0FBQUcsaUJBQUcsSUFBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLEtBQUc7QUFBSSxtQkFBTyxFQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsR0FBRSxNQUFLLE9BQUc7QUFBQyxxQkFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUcsRUFBRSxLQUFHLEdBQUUsTUFBSSxFQUFFLEVBQUUsS0FBRyxJQUFJLElBQUUsS0FBRyxJQUFJLEdBQUc7QUFBRTtBQUFDLG1CQUFPLEVBQUUsRUFBRSxLQUFHLEdBQUUsQ0FBQztBQUFBLFVBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxFQUFFLEtBQUcsR0FBRSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLENBQUMsR0FBRSxNQUFLLE1BQUksTUFBSyxNQUFLLE9BQUcsS0FBRyxFQUFFLE1BQUksS0FBRyxFQUFFLEtBQUcsT0FBSyxNQUFLLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFB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O0FBQUEsVUFBQyxFQUFDLENBQUM7QUFBQSxRQUFDLEdBQUUsSUFBRyxNQUFJLE1BQUcsR0FBRSxTQUFTLEdBQUUsR0FDbmYsR0FBRTtBQUFDLGlCQUFLO0FBQUUsaUJBQUs7QUFBRSxjQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsY0FBRSxFQUFFLEdBQUUsV0FBVztBQUFFLGNBQUksSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUM7QUFBRSxZQUFFLE1BQUksTUFBSSxDQUFDLElBQUU7QUFBRSxpQkFBTyxFQUFFLFdBQVcsR0FBRSxDQUFDO0FBQUEsUUFBQyxHQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxpQkFBSztBQUFFLGlCQUFLO0FBQUUsaUJBQUs7QUFBRSxjQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsY0FBRSxFQUFFLE1BQUksQ0FBQztBQUFFLGNBQUUsRUFBRSxDQUFDO0FBQUUsY0FBSSxJQUFFLENBQUM7QUFBRSxZQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsaUJBQU8sRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsUUFBQyxHQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsaUJBQUs7QUFBRSxpQkFBSztBQUFFLGNBQUUsRUFBRSxNQUFJLENBQUM7QUFBRSxjQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsY0FBRSxFQUFFLENBQUM7QUFBRSxZQUFFLEdBQUUsR0FBRSxNQUFLLENBQUM7QUFBQSxRQUFDLEdBQUUsR0FBRSxJQUFHLEdBQUUsU0FBUyxHQUFFLEdBQUU7QUFBQyxpQkFBSztBQUFFLGNBQUUsRUFBRSxNQUFJLENBQUM7QUFBRSxjQUFFLEVBQUUsQ0FBQztBQUFFLGlCQUFPLEtBQUc7QUFBQSxRQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUU7QUFBQyxpQkFBSztBQUFFLGNBQUcsTUFBSTtBQUFFLG1CQUFPLEVBQUUsR0FBRyxDQUFDO0FBQUUsY0FBRSxFQUFFLENBQUM7QUFBRSxpQkFBTyxFQUFF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Q0FBQztBQUFFLGlCQUFLO0FBQUUsY0FBRSxJQUFJLEtBQUssTUFBSSxDQUFDO0FBQUUsWUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsV0FBVztBQUFFLFlBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsV0FBVztBQUFFLFlBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsU0FBUztBQUFFLFlBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsUUFBUTtBQUFFLFlBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsU0FBUztBQUFFLFlBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsWUFBWSxJQUFFO0FBQUssWUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxPQUFPO0FBQUUsWUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLEtBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxJQUFFLEtBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFFLEVBQUUsUUFBUSxJQUFFLElBQUU7QUFBRSxZQUFFLElBQUUsT0FDaGYsTUFBSSxDQUFDLElBQUUsRUFBRSxLQUFHLEVBQUUsa0JBQWtCO0FBQUcsY0FBSSxJQUFHLElBQUksS0FBSyxFQUFFLFlBQVksR0FBRSxHQUFFLENBQUMsRUFBRyxrQkFBa0IsR0FBRSxJQUFHLElBQUksS0FBSyxFQUFFLFlBQVksR0FBRSxHQUFFLENBQUMsRUFBRyxrQkFBa0I7QUFBRSxZQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsS0FBRyxLQUFHLEtBQUcsRUFBRSxrQkFBa0IsS0FBRyxLQUFLLElBQUksR0FBRSxDQUFDLEtBQUc7QUFBQSxRQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUU7QUFBQyxpQkFBSztBQUFFLGNBQUksSUFBRSxJQUFJLEtBQUssRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsTUFBSyxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxFQUFFLE1BQUksTUFBSSxDQUFDLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLGtCQUFrQixHQUFFLElBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQixHQUFFLElBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQixHQUFFLElBQUUsS0FBSztBQUFBLFlBQUk7QUFBQSxZQUMzZjtBQUFBLFVBQUM7QUFBRSxjQUFFLElBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsT0FBTyxLQUFHLEtBQUcsS0FBRyxDQUFDLElBQUUsSUFBRSxNQUFJLEtBQUcsT0FBSyxJQUFFLEtBQUssSUFBSSxHQUFFLENBQUMsR0FBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLElBQUUsUUFBTSxJQUFFLElBQUUsSUFBRSxLQUFHLEVBQUU7QUFBRyxZQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLE9BQU87QUFBRSxZQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsS0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLElBQUUsS0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUUsRUFBRSxRQUFRLElBQUUsSUFBRTtBQUFFLFlBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLFdBQVc7QUFBRSxZQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLFdBQVc7QUFBRSxZQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLFNBQVM7QUFBRSxZQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLFFBQVE7QUFBRSxZQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLFNBQVM7QUFBRSxZQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLFFB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LGNBQWEsQ0FBQztBQUN6QyxRQUFJLE9BQTJCO0FBQzdCLHNCQUFnQixTQUFTQSxjQUFhLENBQUM7QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFDRjtBQUVBLE9BQU8sZUFBZUMsS0FBSSxVQUFVLE9BQU8sRUFBQyxPQUFPQyxVQUFTLFlBQVksS0FBSSxDQUFDOyIsCiAgIm5hbWVzIjogWyJpIiwgImVudiIsICJUZW5zb3IiLCAiVGVuc29yIiwgIkluZmVyZW5jZVNlc3Npb24iLCAiVGVuc29yIiwgIlRyYWluaW5nU2Vzc2lvbiIsICJJbmZlcmVuY2VTZXNzaW9uIiwgIlRlbnNvciIsICJUcmFpbmluZ1Nlc3Npb24iLCAiZW52IiwgIm1vZHVsZSIsICJtb2R1bGUiLCAid2FzbSIsICJ3YXNtIiwgIndhc20iLCAiZW52IiwgIndhc20iLCAidGVuc29yIiwgImVycm9yQ29kZSIsICJpIiwgImluaXRpYWxpemluZyIsICJpbml0aWFsaXplZCIsICJhYm9ydGVkIiwgImNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIiLCAiY3JlYXRlU2Vzc2lvbiIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJyZWFkRmlsZSIsICJUZW5zb3IiLCAiY29weUZyb21FeHRlcm5hbEJ1ZmZlciIsICJyZWFkRmlsZSIsICJjcmVhdGVTZXNzaW9uIiwgInJlbGVhc2VTZXNzaW9uIiwgInJ1biIsICJlbmRQcm9maWxpbmciLCAiZW52IiwgIkluZmVyZW5jZVNlc3Npb24iLCAiVGVuc29yIiwgIlRyYWluaW5nU2Vzc2lvbiIsICJlbnYiLCAidmVyc2lvbiIsICJ3YXNtQmFja2VuZCIsICJlbnYiLCAidmVyc2lvbiJdCn0K
