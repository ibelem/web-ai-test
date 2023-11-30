/*!
 * ONNX Runtime Web v1.17.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
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
              backendInfo.initPromise = backendInfo.backend.init();
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

// common/dist/esm/inference-session-impl.js
var InferenceSession;
var init_inference_session_impl = __esm({
  "common/dist/esm/inference-session-impl.js"() {
    "use strict";
    init_backend_impl();
    init_tensor();
    InferenceSession = class _InferenceSession {
      constructor(handler) {
        this.handler = handler;
      }
      async run(feeds, arg1, arg2) {
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
        return returnValue;
      }
      async release() {
        return this.handler.dispose();
      }
      static async create(arg0, arg1, arg2, arg3) {
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
      constructor(handler) {
        this.handler = handler;
      }
      get inputNames() {
        return this.handler.inputNames;
      }
      get outputNames() {
        return this.handler.outputNames;
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
          return new _TrainingSession(handler);
        } else {
          throw new Error(noBackendErrMsg);
        }
      }
      /**
       * Helper function for runTrainStep and future runStep methods that handles the type-narrowing conversion from
       * the given parameters to SessionHandler.FetchesType and RunOptions.
       *
       * @param feeds the required input
       * @param arg1 narrowed & converted into the SessionHandler.FetchesType or RunOptions object
       * @param arg2 optional RunOptions object.
       * @returns
       */
      typeNarrowingForRunStep(feeds, arg1, arg2) {
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
      async runTrainStep(feeds, arg1, arg2) {
        const [fetches, options] = this.typeNarrowingForRunStep(feeds, arg1, arg2);
        const results = await this.handler.runTrainStep(feeds, fetches, options);
        return this.convertHandlerReturnTypeToMapOfTensors(results);
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
  "web/lib/wasm/binding/ort-wasm.js"(exports, module) {
    "use strict";
    var ortWasm = (() => {
      var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
      if (typeof __filename !== "undefined")
        _scriptDir = _scriptDir || __filename;
      return function(moduleArg = {}) {
        var p = moduleArg, aa, ba;
        p.ready = new Promise((a, b) => {
          aa = a;
          ba = b;
        });
        var ca = Object.assign({}, p), da = "./this.program", ea = "object" == typeof window, q = "function" == typeof importScripts, fa = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, r = "", ha, ia, ja;
        if (fa) {
          var fs = (init_fs(), __toCommonJS(fs_exports)), ka = (init_path(), __toCommonJS(path_exports));
          r = q ? ka.dirname(r) + "/" : __dirname + "/";
          ha = (a, b) => {
            a = a.startsWith("file://") ? new URL(a) : ka.normalize(a);
            return fs.readFileSync(a, b ? void 0 : "utf8");
          };
          ja = (a) => {
            a = ha(a, true);
            a.buffer || (a = new Uint8Array(a));
            return a;
          };
          ia = (a, b, c, d = true) => {
            a = a.startsWith("file://") ? new URL(a) : ka.normalize(a);
            fs.readFile(a, d ? void 0 : "utf8", (e, f) => {
              e ? c(e) : b(d ? f.buffer : f);
            });
          };
          !p.thisProgram && 1 < process.argv.length && (da = process.argv[1].replace(/\\/g, "/"));
          process.argv.slice(2);
          p.inspect = () => "[Emscripten Module object]";
        } else if (ea || q)
          q ? r = self.location.href : "undefined" != typeof document && document.currentScript && (r = document.currentScript.src), _scriptDir && (r = _scriptDir), 0 !== r.indexOf("blob:") ? r = r.substr(0, r.replace(/[?#].*/, "").lastIndexOf("/") + 1) : r = "", ha = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.send(null);
            return b.responseText;
          }, q && (ja = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          }), ia = (a, b, c) => {
            var d = new XMLHttpRequest();
            d.open("GET", a, true);
            d.responseType = "arraybuffer";
            d.onload = () => {
              200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
            };
            d.onerror = c;
            d.send(null);
          };
        var la = console.log.bind(console), t = console.error.bind(console);
        Object.assign(p, ca);
        ca = null;
        "object" != typeof WebAssembly && ma("no native wasm support detected");
        var na, oa = false, x, A, B, pa, E, I, qa, ra, sa, ta;
        function ua() {
          var a = na.buffer;
          p.HEAP8 = x = new Int8Array(a);
          p.HEAP16 = B = new Int16Array(a);
          p.HEAPU8 = A = new Uint8Array(a);
          p.HEAPU16 = pa = new Uint16Array(a);
          p.HEAP32 = E = new Int32Array(a);
          p.HEAPU32 = I = new Uint32Array(a);
          p.HEAPF32 = qa = new Float32Array(a);
          p.HEAPF64 = ta = new Float64Array(a);
          p.HEAP64 = ra = new BigInt64Array(a);
          p.HEAPU64 = sa = new BigUint64Array(a);
        }
        var va = [], wa = [], xa = [], J = 0, ya = null, K = null;
        function ma(a) {
          a = "Aborted(" + a + ")";
          t(a);
          oa = true;
          a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
          ba(a);
          throw a;
        }
        function za(a) {
          return a.startsWith("data:application/octet-stream;base64,");
        }
        var Aa;
        Aa = "ort-wasm.wasm";
        if (!za(Aa)) {
          var Ba = Aa;
          Aa = p.locateFile ? p.locateFile(Ba, r) : r + Ba;
        }
        function Ca(a) {
          if (ja)
            return ja(a);
          throw "both async and sync fetching of the wasm failed";
        }
        function Da(a) {
          if (ea || q) {
            if ("function" == typeof fetch && !a.startsWith("file://"))
              return fetch(a, { credentials: "same-origin" }).then((b) => {
                if (!b.ok)
                  throw "failed to load wasm binary file at '" + a + "'";
                return b.arrayBuffer();
              }).catch(() => Ca(a));
            if (ia)
              return new Promise((b, c) => {
                ia(a, (d) => b(new Uint8Array(d)), c);
              });
          }
          return Promise.resolve().then(() => Ca(a));
        }
        function Ea(a, b, c) {
          return Da(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {
            t(`failed to asynchronously prepare wasm: ${d}`);
            ma(d);
          });
        }
        function Fa(a, b) {
          var c = Aa;
          return "function" != typeof WebAssembly.instantiateStreaming || za(c) || c.startsWith("file://") || fa || "function" != typeof fetch ? Ea(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
            t(`wasm streaming compile failed: ${e}`);
            t("falling back to ArrayBuffer instantiation");
            return Ea(c, a, b);
          }));
        }
        var Ha = [], Ia = 0, L = 0;
        function Ja(a) {
          this.qe = a;
          this.ke = a - 24;
          this.Ie = function(b) {
            I[this.ke + 4 >>> 2 >>> 0] = b;
          };
          this.re = function() {
            return I[this.ke + 4 >>> 2 >>> 0];
          };
          this.He = function(b) {
            I[this.ke + 8 >>> 2 >>> 0] = b;
          };
          this.ye = function(b) {
            x[this.ke + 12 >>> 0 >>> 0] = b ? 1 : 0;
          };
          this.Ee = function() {
            return 0 != x[this.ke + 12 >>> 0 >>> 0];
          };
          this.ze = function(b) {
            x[this.ke + 13 >>> 0 >>> 0] = b ? 1 : 0;
          };
          this.Ae = function() {
            return 0 != x[this.ke + 13 >>> 0 >>> 0];
          };
          this.Ge = function(b, c) {
            this.se(0);
            this.Ie(b);
            this.He(c);
          };
          this.se = function(b) {
            I[this.ke + 16 >>> 2 >>> 0] = b;
          };
          this.De = function() {
            return I[this.ke + 16 >>> 2 >>> 0];
          };
          this.Fe = function() {
            if (Ka(this.re()))
              return I[this.qe >>> 2 >>> 0];
            var b = this.De();
            return 0 !== b ? b : this.qe;
          };
        }
        var Na = (a) => {
          var b = L;
          if (!b)
            return La(0), 0;
          var c = new Ja(b);
          c.se(b);
          var d = c.re();
          if (!d)
            return La(0), b;
          for (var e in a) {
            var f = a[e];
            if (0 === f || f === d)
              break;
            if (Ma(f, d, c.ke + 16))
              return La(f), b;
          }
          La(d);
          return b;
        }, Oa = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, Pa = (a, b, c) => {
          b >>>= 0;
          var d = b + c;
          for (c = b; a[c] && !(c >= d); )
            ++c;
          if (16 < c - b && a.buffer && Oa)
            return Oa.decode(a.subarray(b, c));
          for (d = ""; b < c; ) {
            var e = a[b++];
            if (e & 128) {
              var f = a[b++] & 63;
              if (192 == (e & 224))
                d += String.fromCharCode((e & 31) << 6 | f);
              else {
                var g = a[b++] & 63;
                e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
                65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
              }
            } else
              d += String.fromCharCode(e);
          }
          return d;
        }, Qa = (a, b) => (a >>>= 0) ? Pa(A, a, b) : "", Ra = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
          }
          return b;
        }, Sa = (a, b, c, d) => {
          c >>>= 0;
          if (!(0 < d))
            return 0;
          var e = c;
          d = c + d - 1;
          for (var f = 0; f < a.length; ++f) {
            var g = a.charCodeAt(f);
            if (55296 <= g && 57343 >= g) {
              var h = a.charCodeAt(++f);
              g = 65536 + ((g & 1023) << 10) | h & 1023;
            }
            if (127 >= g) {
              if (c >= d)
                break;
              b[c++ >>> 0] = g;
            } else {
              if (2047 >= g) {
                if (c + 1 >= d)
                  break;
                b[c++ >>> 0] = 192 | g >> 6;
              } else {
                if (65535 >= g) {
                  if (c + 2 >= d)
                    break;
                  b[c++ >>> 0] = 224 | g >> 12;
                } else {
                  if (c + 3 >= d)
                    break;
                  b[c++ >>> 0] = 240 | g >> 18;
                  b[c++ >>> 0] = 128 | g >> 12 & 63;
                }
                b[c++ >>> 0] = 128 | g >> 6 & 63;
              }
              b[c++ >>> 0] = 128 | g & 63;
            }
          }
          b[c >>> 0] = 0;
          return c - e;
        }, Ta = (a) => {
          if (null === a)
            return "null";
          var b = typeof a;
          return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
        }, Ua, M = (a) => {
          for (var b = ""; A[a >>> 0]; )
            b += Ua[A[a++ >>> 0]];
          return b;
        }, Va = {}, Wa = {}, Xa = {}, N;
        function Ya(a, b, c = {}) {
          var d = b.name;
          if (!a)
            throw new N(`type "${d}" must have a positive integer typeid pointer`);
          if (Wa.hasOwnProperty(a)) {
            if (c.Be)
              return;
            throw new N(`Cannot register type '${d}' twice`);
          }
          Wa[a] = b;
          delete Xa[a];
          Va.hasOwnProperty(a) && (b = Va[a], delete Va[a], b.forEach((e) => e()));
        }
        function O(a, b, c = {}) {
          if (!("argPackAdvance" in b))
            throw new TypeError("registerType registeredInstance requires argPackAdvance");
          Ya(a, b, c);
        }
        var Za = (a, b, c) => {
          switch (b) {
            case 1:
              return c ? (d) => x[d >>> 0 >>> 0] : (d) => A[d >>> 0 >>> 0];
            case 2:
              return c ? (d) => B[d >>> 1 >>> 0] : (d) => pa[d >>> 1 >>> 0];
            case 4:
              return c ? (d) => E[d >>> 2 >>> 0] : (d) => I[d >>> 2 >>> 0];
            case 8:
              return c ? (d) => ra[d >>> 3] : (d) => sa[d >>> 3];
            default:
              throw new TypeError(`invalid integer width (${b}): ${a}`);
          }
        };
        function $a() {
          this.me = [void 0];
          this.we = [];
        }
        var P = new $a();
        function ab(a) {
          a >>>= 0;
          a >= P.ke && 0 === --P.get(a).xe && P.se(a);
        }
        var Q = (a) => {
          if (!a)
            throw new N("Cannot use deleted val. handle = " + a);
          return P.get(a).value;
        }, R = (a) => {
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
              return P.re({ xe: 1, value: a });
          }
        };
        function bb(a) {
          return this.fromWireType(E[a >>> 2 >>> 0]);
        }
        var cb = (a, b) => {
          switch (b) {
            case 4:
              return function(c) {
                return this.fromWireType(qa[c >>> 2 >>> 0]);
              };
            case 8:
              return function(c) {
                return this.fromWireType(ta[c >>> 3 >>> 0]);
              };
            default:
              throw new TypeError(`invalid float width (${b}): ${a}`);
          }
        };
        function db(a) {
          return this.fromWireType(I[a >>> 2 >>> 0]);
        }
        var eb = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, fb = (a, b) => {
          var c = a >> 1;
          for (var d = c + b / 2; !(c >= d) && pa[c >>> 0]; )
            ++c;
          c <<= 1;
          if (32 < c - a && eb)
            return eb.decode(A.subarray(a >>> 0, c >>> 0));
          c = "";
          for (d = 0; !(d >= b / 2); ++d) {
            var e = B[a + 2 * d >>> 1 >>> 0];
            if (0 == e)
              break;
            c += String.fromCharCode(e);
          }
          return c;
        }, gb = (a, b, c) => {
          void 0 === c && (c = 2147483647);
          if (2 > c)
            return 0;
          c -= 2;
          var d = b;
          c = c < 2 * a.length ? c / 2 : a.length;
          for (var e = 0; e < c; ++e)
            B[b >>> 1 >>> 0] = a.charCodeAt(e), b += 2;
          B[b >>> 1 >>> 0] = 0;
          return b - d;
        }, hb = (a) => 2 * a.length, ib = (a, b) => {
          for (var c = 0, d = ""; !(c >= b / 4); ) {
            var e = E[a + 4 * c >>> 2 >>> 0];
            if (0 == e)
              break;
            ++c;
            65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
          }
          return d;
        }, jb = (a, b, c) => {
          b >>>= 0;
          void 0 === c && (c = 2147483647);
          if (4 > c)
            return 0;
          var d = b;
          c = d + c - 4;
          for (var e = 0; e < a.length; ++e) {
            var f = a.charCodeAt(e);
            if (55296 <= f && 57343 >= f) {
              var g = a.charCodeAt(++e);
              f = 65536 + ((f & 1023) << 10) | g & 1023;
            }
            E[b >>> 2 >>> 0] = f;
            b += 4;
            if (b + 4 > c)
              break;
          }
          E[b >>> 2 >>> 0] = 0;
          return b - d;
        }, kb = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            55296 <= d && 57343 >= d && ++c;
            b += 4;
          }
          return b;
        }, mb = (a, b) => {
          var c = Wa[a];
          if (void 0 === c)
            throw a = lb(a), c = M(a), T(a), new N(b + " has unknown type " + c);
          return c;
        }, nb = {}, ob = (a) => {
          var b = nb[a];
          return void 0 === b ? M(a) : b;
        }, pb = [], qb = () => "object" == typeof globalThis ? globalThis : Function("return this")(), rb = (a) => {
          var b = pb.length;
          pb.push(a);
          return b;
        }, sb = (a, b) => {
          for (var c = Array(a), d = 0; d < a; ++d)
            c[d] = mb(I[b + 4 * d >>> 2 >>> 0], "parameter " + d);
          return c;
        }, tb = (a) => {
          if (void 0 === a)
            return "_unknown";
          a = a.replace(/[^a-zA-Z0-9_]/g, "$");
          var b = a.charCodeAt(0);
          return 48 <= b && 57 >= b ? `_${a}` : a;
        }, ub = {};
        function vb(a, b) {
          a = tb(a);
          return { [a]: function() {
            return b.apply(this, arguments);
          } }[a];
        }
        function wb(a) {
          var b = Function;
          if (!(b instanceof Function))
            throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
          var c = vb(b.name || "unknownFunctionName", function() {
          });
          c.prototype = b.prototype;
          c = new c();
          a = b.apply(c, a);
          return a instanceof Object ? a : c;
        }
        var xb = (a) => {
          for (var b = "", c = 0; c < a; ++c)
            b += (0 !== c ? ", " : "") + "arg" + c;
          var d = "return function emval_allocator_" + a + "(constructor, argTypes, args) {\n  var HEAPU32 = getMemory();\n";
          for (c = 0; c < a; ++c)
            d += "var argType" + c + " = requireRegisteredType(HEAPU32[((argTypes)>>>2)], 'parameter " + c + "');\nvar arg" + c + " = argType" + c + ".readValueFromPointer(args);\nargs += argType" + c + "['argPackAdvance'];\nargTypes += 4;\n";
          return new Function("requireRegisteredType", "Module", "valueToHandle", "getMemory", d + ("var obj = new constructor(" + b + ");\nreturn valueToHandle(obj);\n}\n"))(mb, p, R, () => I);
        }, yb = {}, U = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), zb = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Ab = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Cb = (a) => {
          var b = Ra(a) + 1, c = Bb(b);
          c && Sa(a, A, c, b);
          return c;
        }, Db = {}, Fb = () => {
          if (!Eb) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: da || "./this.program" }, b;
            for (b in Db)
              void 0 === Db[b] ? delete a[b] : a[b] = Db[b];
            var c = [];
            for (b in a)
              c.push(`${b}=${a[b]}`);
            Eb = c;
          }
          return Eb;
        }, Eb, Gb = [null, [], []], Hb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ib = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function Jb(a) {
          var b = Array(Ra(a) + 1);
          Sa(a, b, 0, b.length);
          return b;
        }
        function Kb(a, b, c, d) {
          function e(l, w, y) {
            for (l = "number" == typeof l ? l.toString() : l || ""; l.length < w; )
              l = y[0] + l;
            return l;
          }
          function f(l, w) {
            return e(l, w, "0");
          }
          function g(l, w) {
            function y(C) {
              return 0 > C ? -1 : 0 < C ? 1 : 0;
            }
            var z;
            0 === (z = y(l.getFullYear() - w.getFullYear())) && 0 === (z = y(l.getMonth() - w.getMonth())) && (z = y(l.getDate() - w.getDate()));
            return z;
          }
          function h(l) {
            switch (l.getDay()) {
              case 0:
                return new Date(l.getFullYear() - 1, 11, 29);
              case 1:
                return l;
              case 2:
                return new Date(l.getFullYear(), 0, 3);
              case 3:
                return new Date(
                  l.getFullYear(),
                  0,
                  2
                );
              case 4:
                return new Date(l.getFullYear(), 0, 1);
              case 5:
                return new Date(l.getFullYear() - 1, 11, 31);
              case 6:
                return new Date(l.getFullYear() - 1, 11, 30);
            }
          }
          function k(l) {
            var w = l.ne;
            for (l = new Date(new Date(l.oe + 1900, 0, 1).getTime()); 0 < w; ) {
              var y = l.getMonth(), z = (U(l.getFullYear()) ? Hb : Ib)[y];
              if (w > z - l.getDate())
                w -= z - l.getDate() + 1, l.setDate(1), 11 > y ? l.setMonth(y + 1) : (l.setMonth(0), l.setFullYear(l.getFullYear() + 1));
              else {
                l.setDate(l.getDate() + w);
                break;
              }
            }
            y = new Date(l.getFullYear() + 1, 0, 4);
            w = h(new Date(
              l.getFullYear(),
              0,
              4
            ));
            y = h(y);
            return 0 >= g(w, l) ? 0 >= g(y, l) ? l.getFullYear() + 1 : l.getFullYear() : l.getFullYear() - 1;
          }
          a >>>= 0;
          b >>>= 0;
          c >>>= 0;
          d >>>= 0;
          var m = I[d + 40 >>> 2 >>> 0];
          d = { Le: E[d >>> 2 >>> 0], Ke: E[d + 4 >>> 2 >>> 0], te: E[d + 8 >>> 2 >>> 0], ve: E[d + 12 >>> 2 >>> 0], ue: E[d + 16 >>> 2 >>> 0], oe: E[d + 20 >>> 2 >>> 0], le: E[d + 24 >>> 2 >>> 0], ne: E[d + 28 >>> 2 >>> 0], Ne: E[d + 32 >>> 2 >>> 0], Je: E[d + 36 >>> 2 >>> 0], Me: m ? Qa(m) : "" };
          c = Qa(c);
          m = {
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
          for (var n in m)
            c = c.replace(new RegExp(n, "g"), m[n]);
          var u = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), v = "January February March April May June July August September October November December".split(" ");
          m = { "%a": (l) => u[l.le].substring(0, 3), "%A": (l) => u[l.le], "%b": (l) => v[l.ue].substring(0, 3), "%B": (l) => v[l.ue], "%C": (l) => f((l.oe + 1900) / 100 | 0, 2), "%d": (l) => f(l.ve, 2), "%e": (l) => e(l.ve, 2, " "), "%g": (l) => k(l).toString().substring(2), "%G": (l) => k(l), "%H": (l) => f(l.te, 2), "%I": (l) => {
            l = l.te;
            0 == l ? l = 12 : 12 < l && (l -= 12);
            return f(l, 2);
          }, "%j": (l) => {
            for (var w = 0, y = 0; y <= l.ue - 1; w += (U(l.oe + 1900) ? Hb : Ib)[y++])
              ;
            return f(l.ve + w, 3);
          }, "%m": (l) => f(l.ue + 1, 2), "%M": (l) => f(l.Ke, 2), "%n": () => "\n", "%p": (l) => 0 <= l.te && 12 > l.te ? "AM" : "PM", "%S": (l) => f(l.Le, 2), "%t": () => "	", "%u": (l) => l.le || 7, "%U": (l) => f(Math.floor((l.ne + 7 - l.le) / 7), 2), "%V": (l) => {
            var w = Math.floor((l.ne + 7 - (l.le + 6) % 7) / 7);
            2 >= (l.le + 371 - l.ne - 2) % 7 && w++;
            if (w)
              53 == w && (y = (l.le + 371 - l.ne) % 7, 4 == y || 3 == y && U(l.oe) || (w = 1));
            else {
              w = 52;
              var y = (l.le + 7 - l.ne - 1) % 7;
              (4 == y || 5 == y && U(l.oe % 400 - 1)) && w++;
            }
            return f(w, 2);
          }, "%w": (l) => l.le, "%W": (l) => f(Math.floor((l.ne + 7 - (l.le + 6) % 7) / 7), 2), "%y": (l) => (l.oe + 1900).toString().substring(2), "%Y": (l) => l.oe + 1900, "%z": (l) => {
            l = l.Je;
            var w = 0 <= l;
            l = Math.abs(l) / 60;
            return (w ? "+" : "-") + String("0000" + (l / 60 * 100 + l % 60)).slice(-4);
          }, "%Z": (l) => l.Me, "%%": () => "%" };
          c = c.replace(/%%/g, "\0\0");
          for (n in m)
            c.includes(n) && (c = c.replace(new RegExp(n, "g"), m[n](d)));
          c = c.replace(/\0\0/g, "%");
          n = Jb(c);
          if (n.length > b)
            return 0;
          x.set(n, a >>> 0);
          return n.length - 1;
        }
        for (var Lb = [], Mb, V = (a) => {
          var b = Lb[a];
          b || (a >= Lb.length && (Lb.length = a + 1), Lb[a] = b = Mb.get(a));
          return b;
        }, Nb = Array(256), Ob = 0; 256 > Ob; ++Ob)
          Nb[Ob] = String.fromCharCode(Ob);
        Ua = Nb;
        N = p.BindingError = class extends Error {
          constructor(a) {
            super(a);
            this.name = "BindingError";
          }
        };
        p.InternalError = class extends Error {
          constructor(a) {
            super(a);
            this.name = "InternalError";
          }
        };
        Object.assign($a.prototype, { get(a) {
          return this.me[a];
        }, has(a) {
          return void 0 !== this.me[a];
        }, re(a) {
          var b = this.we.pop() || this.me.length;
          this.me[b] = a;
          return b;
        }, se(a) {
          this.me[a] = void 0;
          this.we.push(a);
        } });
        P.me.push({ value: void 0 }, { value: null }, { value: true }, { value: false });
        P.ke = P.me.length;
        p.count_emval_handles = () => {
          for (var a = 0, b = P.ke; b < P.me.length; ++b)
            void 0 !== P.me[b] && ++a;
          return a;
        };
        var Ze = {
          u: function(a) {
            a = new Ja(a >>> 0);
            a.Ee() || (a.ye(true), Ia--);
            a.ze(false);
            Ha.push(a);
            Pb(a.qe);
            return a.Fe();
          },
          M: () => {
            W(0, 0);
            var a = Ha.pop();
            Qb(a.qe);
            L = 0;
          },
          a: function() {
            return Na([]);
          },
          l: function(a) {
            return Na([a >>> 0]);
          },
          x: function(a, b) {
            return Na([a >>> 0, b >>> 0]);
          },
          q: function(a, b, c) {
            return Na([a >>> 0, b >>> 0, c >>> 0]);
          },
          xb: () => {
            var a = Ha.pop();
            a || ma("no exception to throw");
            var b = a.qe;
            a.Ae() || (Ha.push(a), a.ze(true), a.ye(false), Ia++);
            L = b;
            throw L;
          },
          t: function(a, b, c) {
            a >>>= 0;
            new Ja(a).Ge(b >>> 0, c >>> 0);
            L = a;
            Ia++;
            throw L;
          },
          Ra: () => Ia,
          g: function(a) {
            L || (L = a >>> 0);
            throw L;
          },
          yb: function() {
            return 0;
          },
          Uc: function() {
          },
          Dc: function() {
          },
          Fc: function() {
          },
          xc: function() {
            return 0;
          },
          Sc: function() {
          },
          Mc: function() {
          },
          Rc: function() {
          },
          Rb: function() {
          },
          Ec: function() {
          },
          Bc: function() {
          },
          Tc: function() {
          },
          Cc: function() {
          },
          Ub: function(a, b, c, d, e) {
            b >>>= 0;
            b = M(b);
            var f = -1 != b.indexOf("u");
            f && (e = (1n << 64n) - 1n);
            O(a >>> 0, { name: b, fromWireType: (g) => g, toWireType: function(g, h) {
              if ("bigint" != typeof h && "number" != typeof h)
                throw new TypeError(`Cannot convert "${Ta(h)}" to ${this.name}`);
              if (h < d || h > e)
                throw new TypeError(`Passing a number "${Ta(h)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);
              return h;
            }, argPackAdvance: 8, readValueFromPointer: Za(b, c >>> 0, !f), pe: null });
          },
          Xc: function(a, b, c, d) {
            b = M(b >>> 0);
            O(a >>> 0, { name: b, fromWireType: function(e) {
              return !!e;
            }, toWireType: function(e, f) {
              return f ? c : d;
            }, argPackAdvance: 8, readValueFromPointer: function(e) {
              return this.fromWireType(A[e >>> 0]);
            }, pe: null });
          },
          Wc: function(a, b) {
            b = M(b >>> 0);
            O(a >>> 0, {
              name: b,
              fromWireType: (c) => {
                var d = Q(c);
                ab(c);
                return d;
              },
              toWireType: (c, d) => R(d),
              argPackAdvance: 8,
              readValueFromPointer: bb,
              pe: null
            });
          },
          Tb: function(a, b, c) {
            b = M(b >>> 0);
            O(a >>> 0, { name: b, fromWireType: (d) => d, toWireType: (d, e) => e, argPackAdvance: 8, readValueFromPointer: cb(b, c >>> 0), pe: null });
          },
          ua: function(a, b, c, d, e) {
            a >>>= 0;
            c >>>= 0;
            b = M(b >>> 0);
            -1 === e && (e = 4294967295);
            e = (h) => h;
            if (0 === d) {
              var f = 32 - 8 * c;
              e = (h) => h << f >>> f;
            }
            var g = b.includes("unsigned") ? function(h, k) {
              return k >>> 0;
            } : function(h, k) {
              return k;
            };
            O(a, {
              name: b,
              fromWireType: e,
              toWireType: g,
              argPackAdvance: 8,
              readValueFromPointer: Za(b, c, 0 !== d),
              pe: null
            });
          },
          _: function(a, b, c) {
            function d(f) {
              return new e(x.buffer, I[f + 4 >>> 2 >>> 0], I[f >>> 2 >>> 0]);
            }
            var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
            c = M(c >>> 0);
            O(a >>> 0, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { Be: true });
          },
          Vb: function(a, b) {
            b = M(b >>> 0);
            var c = "std::string" === b;
            O(a >>> 0, { name: b, fromWireType: function(d) {
              var e = I[d >>> 2 >>> 0], f = d + 4;
              if (c)
                for (var g = f, h = 0; h <= e; ++h) {
                  var k = f + h;
                  if (h == e || 0 == A[k >>> 0]) {
                    g = Qa(g, k - g);
                    if (void 0 === m)
                      var m = g;
                    else
                      m += String.fromCharCode(0), m += g;
                    g = k + 1;
                  }
                }
              else {
                m = Array(e);
                for (h = 0; h < e; ++h)
                  m[h] = String.fromCharCode(A[f + h >>> 0]);
                m = m.join("");
              }
              T(d);
              return m;
            }, toWireType: function(d, e) {
              e instanceof ArrayBuffer && (e = new Uint8Array(e));
              var f = "string" == typeof e;
              if (!(f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array))
                throw new N("Cannot pass non-string to std::string");
              var g = c && f ? Ra(e) : e.length;
              var h = Bb(4 + g + 1), k = h + 4;
              I[h >>> 2 >>> 0] = g;
              if (c && f)
                Sa(e, A, k, g + 1);
              else if (f)
                for (f = 0; f < g; ++f) {
                  var m = e.charCodeAt(f);
                  if (255 < m)
                    throw T(k), new N("String has UTF-16 code units that do not fit in 8 bits");
                  A[k + f >>> 0] = m;
                }
              else
                for (f = 0; f < g; ++f)
                  A[k + f >>> 0] = e[f];
              null !== d && d.push(T, h);
              return h;
            }, argPackAdvance: 8, readValueFromPointer: db, pe(d) {
              T(d);
            } });
          },
          Ab: function(a, b, c) {
            b >>>= 0;
            c >>>= 0;
            c = M(c);
            if (2 === b) {
              var d = fb;
              var e = gb;
              var f = hb;
              var g = () => pa;
              var h = 1;
            } else
              4 === b && (d = ib, e = jb, f = kb, g = () => I, h = 2);
            O(a >>> 0, { name: c, fromWireType: (k) => {
              for (var m = I[k >>> 2 >>> 0], n = g(), u, v = k + 4, l = 0; l <= m; ++l) {
                var w = k + 4 + l * b;
                if (l == m || 0 == n[w >>> h])
                  v = d(v, w - v), void 0 === u ? u = v : (u += String.fromCharCode(0), u += v), v = w + b;
              }
              T(k);
              return u;
            }, toWireType: (k, m) => {
              if ("string" != typeof m)
                throw new N(`Cannot pass non-string to C++ string type ${c}`);
              var n = f(m), u = Bb(4 + n + b);
              I[u >>> 2] = n >> h;
              e(m, u + 4, n + b);
              null !== k && k.push(T, u);
              return u;
            }, argPackAdvance: 8, readValueFromPointer: bb, pe(k) {
              T(k);
            } });
          },
          $c: function(a, b) {
            b = M(b >>> 0);
            O(a >>> 0, { Ce: true, name: b, argPackAdvance: 0, fromWireType: () => {
            }, toWireType: () => {
            } });
          },
          Vc: () => true,
          od: function(a, b, c) {
            b >>>= 0;
            c >>>= 0;
            a = Q(a >>> 0);
            b = mb(b, "emval::as");
            var d = [], e = R(d);
            I[c >>> 2 >>> 0] = e;
            return b.toWireType(d, a);
          },
          la: function(a, b, c, d, e) {
            c >>>= 0;
            d >>>= 0;
            e >>>= 0;
            a = pb[a >>> 0];
            b = Q(b >>> 0);
            c = ob(c);
            var f = [];
            I[d >>> 2 >>> 0] = R(f);
            return a(b, c, f, e);
          },
          dd: function(a, b, c, d) {
            c >>>= 0;
            d >>>= 0;
            a = pb[a >>> 0];
            b = Q(b >>> 0);
            c = ob(c);
            a(b, c, null, d);
          },
          wc: ab,
          pd: function(a, b) {
            b >>>= 0;
            a = Q(a >>> 0);
            b = Q(b);
            return a == b;
          },
          vc: function(a) {
            a >>>= 0;
            if (0 === a)
              return R(qb());
            a = ob(a);
            return R(qb()[a]);
          },
          ja: function(a, b) {
            var c = sb(a, b >>> 0), d = c[0];
            b = d.name + "_$" + c.slice(1).map(function(n) {
              return n.name;
            }).join("_") + "$";
            var e = ub[b];
            if (void 0 !== e)
              return e;
            e = ["retType"];
            for (var f = [d], g = "", h = 0; h < a - 1; ++h)
              g += (0 !== h ? ", " : "") + "arg" + h, e.push("argType" + h), f.push(c[1 + h]);
            var k = "return function " + tb("methodCaller_" + b) + "(handle, name, destructors, args) {\n", m = 0;
            for (h = 0; h < a - 1; ++h)
              k += "    var arg" + h + " = argType" + h + ".readValueFromPointer(args" + (m ? "+" + m : "") + ");\n", m += c[h + 1].argPackAdvance;
            k += "    var rv = handle[name](" + g + ");\n";
            for (h = 0; h < a - 1; ++h)
              c[h + 1].deleteObject && (k += "    argType" + h + ".deleteObject(arg" + h + ");\n");
            d.Ce || (k += "    return retType.toWireType(destructors, rv);\n");
            e.push(k + "};\n");
            a = wb(e).apply(null, f);
            e = rb(a);
            return ub[b] = e;
          },
          id: function(a, b) {
            b >>>= 0;
            a = Q(a >>> 0);
            b = Q(b);
            return R(a[b]);
          },
          P: function(a) {
            a >>>= 0;
            4 < a && (P.get(a).xe += 1);
          },
          qd: function(a, b, c, d) {
            c >>>= 0;
            d >>>= 0;
            a = Q(a >>> 0);
            var e = yb[b];
            e || (e = xb(b), yb[b] = e);
            return e(a, c, d);
          },
          hd: function() {
            return R([]);
          },
          ld: function(a) {
            a = Q(a >>> 0);
            for (var b = Array(a.length), c = 0; c < a.length; c++)
              b[c] = a[c];
            return R(b);
          },
          X: function(a) {
            return R(ob(a >>> 0));
          },
          Qa: function() {
            return R({});
          },
          rd: function(a) {
            a >>>= 0;
            for (var b = Q(a); b.length; ) {
              var c = b.pop();
              b.pop()(c);
            }
            ab(a);
          },
          td: function(a, b, c) {
            b >>>= 0;
            c >>>= 0;
            a = Q(a >>> 0);
            b = Q(b);
            c = Q(c);
            a[b] = c;
          },
          vb: function(a, b) {
            b >>>= 0;
            a = mb(a >>> 0, "_emval_take_value");
            a = a.readValueFromPointer(b);
            return R(a);
          },
          Jc: function(a, b) {
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
          },
          Kc: function(a, b) {
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
            E[b + 28 >>> 2 >>> 0] = (U(a.getFullYear()) ? zb : Ab)[a.getMonth()] + a.getDate() - 1 | 0;
            E[b + 36 >>> 2 >>> 0] = -(60 * a.getTimezoneOffset());
            var c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset(), d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
            E[b + 32 >>> 2 >>> 0] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
          },
          Lc: function(a) {
            a >>>= 0;
            var b = new Date(E[a + 20 >>> 2 >>> 0] + 1900, E[a + 16 >>> 2 >>> 0], E[a + 12 >>> 2 >>> 0], E[a + 8 >>> 2 >>> 0], E[a + 4 >>> 2 >>> 0], E[a >>> 2 >>> 0], 0), c = E[a + 32 >>> 2 >>> 0], d = b.getTimezoneOffset(), e = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(), f = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(), g = Math.min(f, e);
            0 > c ? E[a + 32 >>> 2 >>> 0] = Number(e != f && g == d) : 0 < c != (g == d) && (e = Math.max(f, e), b.setTime(b.getTime() + 6e4 * ((0 < c ? g : e) - d)));
            E[a + 24 >>> 2 >>> 0] = b.getDay();
            E[a + 28 >>> 2 >>> 0] = (U(b.getFullYear()) ? zb : Ab)[b.getMonth()] + b.getDate() - 1 | 0;
            E[a >>> 2 >>> 0] = b.getSeconds();
            E[a + 4 >>> 2 >>> 0] = b.getMinutes();
            E[a + 8 >>> 2 >>> 0] = b.getHours();
            E[a + 12 >>> 2 >>> 0] = b.getDate();
            E[a + 16 >>> 2 >>> 0] = b.getMonth();
            E[a + 20 >>> 2 >>> 0] = b.getYear();
            return BigInt(b.getTime() / 1e3);
          },
          Gc: function() {
            return -52;
          },
          Ic: function() {
          },
          zc: function(a, b, c) {
            function d(k) {
              return (k = k.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? k[1] : "GMT";
            }
            c >>>= 0;
            var e = (/* @__PURE__ */ new Date()).getFullYear(), f = new Date(e, 0, 1), g = new Date(e, 6, 1);
            e = f.getTimezoneOffset();
            var h = g.getTimezoneOffset();
            I[a >>> 0 >>> 2 >>> 0] = 60 * Math.max(e, h);
            E[b >>> 0 >>> 2 >>> 0] = Number(e != h);
            a = d(f);
            b = d(g);
            a = Cb(a);
            b = Cb(b);
            h < e ? (I[c >>> 2 >>> 0] = a, I[c + 4 >>> 2 >>> 0] = b) : (I[c >>> 2 >>> 0] = b, I[c + 4 >>> 2 >>> 0] = a);
          },
          hb: () => {
            ma("");
          },
          Sb: () => Date.now(),
          Ac: function() {
            return 4294901760;
          },
          da: () => performance.now(),
          Qc: function(a, b, c) {
            b >>>= 0;
            return A.copyWithin(a >>> 0 >>> 0, b >>> 0, b + (c >>> 0) >>> 0);
          },
          yc: function(a) {
            a >>>= 0;
            var b = A.length;
            if (4294901760 < a)
              return false;
            for (var c = 1; 4 >= c; c *= 2) {
              var d = b * (1 + 0.2 / c);
              d = Math.min(d, a + 100663296);
              var e = Math;
              d = Math.max(a, d);
              a: {
                e = (e.min.call(e, 4294901760, d + (65536 - d % 65536) % 65536) - na.buffer.byteLength + 65535) / 65536;
                try {
                  na.grow(e);
                  ua();
                  var f = 1;
                  break a;
                } catch (g) {
                }
                f = void 0;
              }
              if (f)
                return true;
            }
            return false;
          },
          Oc: function(a, b) {
            a >>>= 0;
            b >>>= 0;
            var c = 0;
            Fb().forEach((d, e) => {
              var f = b + c;
              e = I[a + 4 * e >>> 2 >>> 0] = f;
              for (f = 0; f < d.length; ++f)
                x[e++ >>> 0 >>> 0] = d.charCodeAt(f);
              x[e >>> 0 >>> 0] = 0;
              c += d.length + 1;
            });
            return 0;
          },
          Pc: function(a, b) {
            a >>>= 0;
            b >>>= 0;
            var c = Fb();
            I[a >>> 2 >>> 0] = c.length;
            var d = 0;
            c.forEach((e) => d += e.length + 1);
            I[b >>> 2 >>> 0] = d;
            return 0;
          },
          zb: () => 52,
          Qb: function() {
            return 52;
          },
          Nc: function() {
            return 70;
          },
          Pb: function(a, b, c, d) {
            b >>>= 0;
            c >>>= 0;
            d >>>= 0;
            for (var e = 0, f = 0; f < c; f++) {
              var g = I[b >>> 2 >>> 0], h = I[b + 4 >>> 2 >>> 0];
              b += 8;
              for (var k = 0; k < h; k++) {
                var m = A[g + k >>> 0], n = Gb[a];
                0 === m || 10 === m ? ((1 === a ? la : t)(Pa(n, 0)), n.length = 0) : n.push(m);
              }
              e += h;
            }
            I[d >>> 2 >>> 0] = e;
            return 0;
          },
          gb: Rb,
          Yc: Sb,
          ra: Tb,
          E: Ub,
          pa: Vb,
          ea: Wb,
          Zc: Xb,
          bd: Yb,
          N: Zb,
          z: $b,
          b: ac,
          _b: bc,
          sa: cc,
          e: dc,
          Cb: ec,
          h: fc,
          W: gc,
          i: hc,
          _c: ic,
          j: jc,
          r: kc,
          s: lc,
          o: mc,
          za: nc,
          Ua: oc,
          ga: pc,
          Nb: qc,
          Ya: rc,
          Gb: sc,
          kb: tc,
          dc: uc,
          qc: vc,
          ac: wc,
          bc: xc,
          Wb: yc,
          ia: zc,
          fb: Ac,
          wa: Bc,
          Bb: Cc,
          ba: Dc,
          cc: Ec,
          Oa: Fc,
          D: Gc,
          K: Hc,
          Eb: Ic,
          gd: Jc,
          oa: Kc,
          L: Lc,
          $: Mc,
          T: Nc,
          y: Oc,
          Db: Pc,
          $b: Qc,
          B: Rc,
          Fb: Sc,
          fd: Tc,
          Pa: Uc,
          ab: Vc,
          ec: Wc,
          Xb: Xc,
          Kb: Yc,
          V: Zc,
          F: $c,
          C: ad,
          $a: bd,
          O: cd,
          d: dd,
          Wa: ed,
          k: fd,
          va: gd,
          Va: hd,
          sb: jd,
          f: kd,
          rc: ld,
          aa: md,
          bb: nd,
          xa: od,
          jb: pd,
          db: qd,
          c: rd,
          oc: sd,
          jd: td,
          m: ud,
          mc: vd,
          n: wd,
          pc: xd,
          lc: yd,
          md: zd,
          p: Ad,
          Ma: Bd,
          qb: Cd,
          La: Dd,
          Ib: Ed,
          A: Fd,
          H: Gd,
          U: Hd,
          Ta: Id,
          ic: Jd,
          cb: Kd,
          ta: Ld,
          ma: Md,
          Q: Nd,
          Za: Od,
          Ga: Pd,
          ib: Qd,
          Ca: Rd,
          gc: Sd,
          Ba: Td,
          Da: Ud,
          sd: Vd,
          na: Wd,
          kd: Xd,
          Ha: Yd,
          Fa: Zd,
          sc: $d,
          kc: ae,
          Ea: be,
          Ia: ce,
          mb: de,
          fa: ee,
          ya: fe,
          fc: ge,
          jc: he,
          Hb: ie,
          Aa: je,
          ka: ke,
          wb: le,
          ed: me,
          R: ne,
          tb: oe,
          Sa: pe,
          eb: qe,
          I: re,
          S: se,
          ub: te,
          cd: ue,
          Z: ve,
          lb: we,
          ha: xe,
          Yb: ye,
          ud: ze,
          w: Ae,
          _a: Be,
          nd: Ce,
          Lb: De,
          hc: Ee,
          uc: Fe,
          Mb: Ge,
          Jb: He,
          Xa: Ie,
          tc: Je,
          Ob: Ke,
          Ja: Le,
          Zb: Me,
          Y: Ne,
          nc: Oe,
          J: Pe,
          ad: Qe,
          rb: Re,
          qa: Se,
          G: Te,
          ob: Ue,
          Ka: Ve,
          Na: We,
          nb: Xe,
          pb: Ye,
          v: function(a) {
            return a >>> 0;
          },
          Hc: Kb,
          ca: function(a, b, c, d) {
            return Kb(a >>> 0, b >>> 0, c >>> 0, d >>> 0);
          }
        }, X = function() {
          var a = { a: Ze };
          J++;
          Fa(a, function(b) {
            X = b.instance.exports;
            X = $e();
            na = X.vd;
            ua();
            Mb = X.ae;
            wa.unshift(X.wd);
            J--;
            0 == J && (null !== ya && (clearInterval(ya), ya = null), K && (b = K, K = null, b()));
          }).catch(ba);
          return {};
        }();
        p._OrtInit = (a, b) => (p._OrtInit = X.xd)(a, b);
        p._OrtGetLastError = (a, b) => (p._OrtGetLastError = X.yd)(a, b);
        p._OrtCreateSessionOptions = (a, b, c, d, e, f, g, h, k, m) => (p._OrtCreateSessionOptions = X.zd)(a, b, c, d, e, f, g, h, k, m);
        p._OrtAppendExecutionProvider = (a, b) => (p._OrtAppendExecutionProvider = X.Ad)(a, b);
        p._OrtAddFreeDimensionOverride = (a, b, c) => (p._OrtAddFreeDimensionOverride = X.Bd)(a, b, c);
        p._OrtAddSessionConfigEntry = (a, b, c) => (p._OrtAddSessionConfigEntry = X.Cd)(a, b, c);
        p._OrtReleaseSessionOptions = (a) => (p._OrtReleaseSessionOptions = X.Dd)(a);
        p._OrtCreateSession = (a, b, c) => (p._OrtCreateSession = X.Ed)(a, b, c);
        p._OrtReleaseSession = (a) => (p._OrtReleaseSession = X.Fd)(a);
        p._OrtGetInputOutputCount = (a, b, c) => (p._OrtGetInputOutputCount = X.Gd)(a, b, c);
        p._OrtGetInputName = (a, b) => (p._OrtGetInputName = X.Hd)(a, b);
        p._OrtGetOutputName = (a, b) => (p._OrtGetOutputName = X.Id)(a, b);
        p._OrtFree = (a) => (p._OrtFree = X.Jd)(a);
        p._OrtCreateTensor = (a, b, c, d, e, f) => (p._OrtCreateTensor = X.Kd)(a, b, c, d, e, f);
        p._OrtGetTensorData = (a, b, c, d, e) => (p._OrtGetTensorData = X.Ld)(a, b, c, d, e);
        p._OrtReleaseTensor = (a) => (p._OrtReleaseTensor = X.Md)(a);
        p._OrtCreateRunOptions = (a, b, c, d) => (p._OrtCreateRunOptions = X.Nd)(a, b, c, d);
        p._OrtAddRunConfigEntry = (a, b, c) => (p._OrtAddRunConfigEntry = X.Od)(a, b, c);
        p._OrtReleaseRunOptions = (a) => (p._OrtReleaseRunOptions = X.Pd)(a);
        p._OrtCreateBinding = (a) => (p._OrtCreateBinding = X.Qd)(a);
        p._OrtBindInput = (a, b, c) => (p._OrtBindInput = X.Rd)(a, b, c);
        p._OrtBindOutput = (a, b, c, d) => (p._OrtBindOutput = X.Sd)(a, b, c, d);
        p._OrtClearBoundOutputs = (a) => (p._OrtClearBoundOutputs = X.Td)(a);
        p._OrtReleaseBinding = (a) => (p._OrtReleaseBinding = X.Ud)(a);
        p._OrtRunWithBinding = (a, b, c, d, e) => (p._OrtRunWithBinding = X.Vd)(a, b, c, d, e);
        p._OrtRun = (a, b, c, d, e, f, g, h) => (p._OrtRun = X.Wd)(a, b, c, d, e, f, g, h);
        p._OrtEndProfiling = (a) => (p._OrtEndProfiling = X.Xd)(a);
        var Bb = p._malloc = (a) => (Bb = p._malloc = X.Yd)(a), T = p._free = (a) => (T = p._free = X.Zd)(a), lb = (a) => (lb = X._d)(a);
        p.__embind_initialize_bindings = () => (p.__embind_initialize_bindings = X.$d)();
        var W = (a, b) => (W = X.be)(a, b), La = (a) => (La = X.ce)(a), Y = () => (Y = X.de)(), Z = (a) => (Z = X.ee)(a), af = (a) => (af = X.fe)(a), Qb = (a) => (Qb = X.ge)(a), Pb = (a) => (Pb = X.he)(a), Ma = (a, b, c) => (Ma = X.ie)(a, b, c), Ka = (a) => (Ka = X.je)(a);
        function fc(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function dc(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function kd(a, b, c) {
          var d = Y();
          try {
            V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function ac(a, b) {
          var c = Y();
          try {
            return V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function fd(a, b) {
          var c = Y();
          try {
            V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function Gc(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function dd(a) {
          var b = Y();
          try {
            V(a)();
          } catch (c) {
            Z(b);
            if (c !== c + 0)
              throw c;
            W(1, 0);
          }
        }
        function kc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function jc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function hc(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function rd(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function ud(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function $b(a) {
          var b = Y();
          try {
            return V(a)();
          } catch (c) {
            Z(b);
            if (c !== c + 0)
              throw c;
            W(1, 0);
          }
        }
        function Oc(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function Ae(a, b, c) {
          var d = Y();
          try {
            V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function wd(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function lc(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            return V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Wb(a, b) {
          var c = Y();
          try {
            return V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function Zc(a, b) {
          var c = Y();
          try {
            return V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
            return 0n;
          }
        }
        function Rb(a, b) {
          var c = Y();
          try {
            return V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function mc(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function re(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function Ad(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Fe(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function le(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Fd(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function ve(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function nc(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Gd(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function Ac(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function Je(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function te(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function $d(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Hd(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function $c(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
            return 0n;
          }
        }
        function ld(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function vc(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function pc(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function Od(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function ze(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function oe(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function se(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function jd(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function qe(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function qd(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function xd(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function Re(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function ad(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
            return 0n;
          }
        }
        function sd(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Oe(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y) {
          var z = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y);
          } catch (C) {
            Z(z);
            if (C !== C + 0)
              throw C;
            W(1, 0);
          }
        }
        function ke(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Ke(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function Hc(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Mc(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function Pe(a, b) {
          var c = Y();
          try {
            V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function cd(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
            return 0n;
          }
        }
        function Lc(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Zb(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Kd(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function ed(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function vd(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function nd(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function yd(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Vd(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function qc(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z) {
          var C = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z);
          } catch (D) {
            Z(C);
            if (D !== D + 0)
              throw D;
            W(1, 0);
          }
        }
        function Nd(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Uc(a, b) {
          var c = Y();
          try {
            return V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function rc(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F) {
          var G = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F);
          } catch (H) {
            Z(G);
            if (H !== H + 0)
              throw H;
            W(1, 0);
          }
        }
        function Ie(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Fc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Ld(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function Nc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function fe(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function We(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C) {
          var D = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C);
          } catch (F) {
            Z(D);
            if (F !== F + 0)
              throw F;
            W(1, 0);
          }
        }
        function Cd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z) {
          var C = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z);
          } catch (D) {
            Z(C);
            if (D !== D + 0)
              throw D;
            W(1, 0);
          }
        }
        function Bd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y) {
          var z = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y);
          } catch (C) {
            Z(z);
            if (C !== C + 0)
              throw C;
            W(1, 0);
          }
        }
        function Dd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w) {
          var y = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w);
          } catch (z) {
            Z(y);
            if (z !== z + 0)
              throw z;
            W(1, 0);
          }
        }
        function Ye(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G) {
          var H = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G);
          } catch (S) {
            Z(H);
            if (S !== S + 0)
              throw S;
            W(1, 0);
          }
        }
        function Ve(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D) {
          var F = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D);
          } catch (G) {
            Z(F);
            if (G !== G + 0)
              throw G;
            W(1, 0);
          }
        }
        function Ue(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z) {
          var C = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z);
          } catch (D) {
            Z(C);
            if (D !== D + 0)
              throw D;
            W(1, 0);
          }
        }
        function Xe(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F) {
          var G = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F);
          } catch (H) {
            Z(G);
            if (H !== H + 0)
              throw H;
            W(1, 0);
          }
        }
        function Ge(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function De(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function Ne(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w) {
          var y = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w);
          } catch (z) {
            Z(y);
            if (z !== z + 0)
              throw z;
            W(1, 0);
          }
        }
        function Te(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Se(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function Vb(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function od(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Yc(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
            return 0n;
          }
        }
        function zc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function He(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function ne(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function de(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Dc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function ae(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function he(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function xe(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Vc(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function ee(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Le(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function ce(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function Yd(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Ce(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Jd(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function Kc(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            return V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Pd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w) {
          var y = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w);
          } catch (z) {
            Z(y);
            if (z !== z + 0)
              throw z;
            W(1, 0);
          }
        }
        function Zd(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function Wd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w) {
          var y = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w);
          } catch (z) {
            Z(y);
            if (z !== z + 0)
              throw z;
            W(1, 0);
          }
        }
        function hd(a, b, c) {
          var d = Y();
          try {
            V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function Ed(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function be(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G, H, S, df, ef, ff) {
          var gf = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G, H, S, df, ef, ff);
          } catch (Ga) {
            Z(gf);
            if (Ga !== Ga + 0)
              throw Ga;
            W(1, 0);
          }
        }
        function we(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function tc(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Md(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function pd(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Ud(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G) {
          var H = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G);
          } catch (S) {
            Z(H);
            if (S !== S + 0)
              throw S;
            W(1, 0);
          }
        }
        function cc(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function zd(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Ee(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function ie(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Rd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z) {
          var C = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z);
          } catch (D) {
            Z(C);
            if (D !== D + 0)
              throw D;
            W(1, 0);
          }
        }
        function Td(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F) {
          var G = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F);
          } catch (H) {
            Z(G);
            if (H !== H + 0)
              throw H;
            W(1, 0);
          }
        }
        function Sd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D) {
          var F = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D);
          } catch (G) {
            Z(F);
            if (G !== G + 0)
              throw G;
            W(1, 0);
          }
        }
        function Xd(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function oc(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function sc(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F) {
          var G = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F);
          } catch (H) {
            Z(G);
            if (H !== H + 0)
              throw H;
            W(1, 0);
          }
        }
        function td(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Id(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function Rc(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function bd(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
            return 0n;
          }
        }
        function ge(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Sc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function je(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Wc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function pe(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function md(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function Bc(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            return V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Be(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function gc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Ic(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function uc(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function Ec(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            return V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function xc(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function Jc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function wc(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Qc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Tc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Pc(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function me(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function ue(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function bc(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function ec(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function gd(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function Yb(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function Qe(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Ub(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Me(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function ye(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Tb(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function Cc(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Xc(a) {
          var b = Y();
          try {
            return V(a)();
          } catch (c) {
            Z(b);
            if (c !== c + 0)
              throw c;
            W(1, 0);
            return 0n;
          }
        }
        function yc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function ic(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Qd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y) {
          var z = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y);
          } catch (C) {
            Z(z);
            if (C !== C + 0)
              throw C;
            W(1, 0);
          }
        }
        function Xb(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function Sb(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function $e() {
          var a = X;
          a = Object.assign({}, a);
          var b = (d) => () => d() >>> 0, c = (d) => (e) => d(e) >>> 0;
          a.__errno_location = b(a.__errno_location);
          a.Yd = c(a.Yd);
          a._d = c(a._d);
          a.de = b(a.de);
          a.fe = c(a.fe);
          return a;
        }
        p.stackAlloc = af;
        p.stackSave = Y;
        p.stackRestore = Z;
        p.UTF8ToString = Qa;
        p.stringToUTF8 = (a, b, c) => Sa(a, A, b, c);
        p.lengthBytesUTF8 = Ra;
        var bf;
        K = function cf() {
          bf || hf();
          bf || (K = cf);
        };
        function hf() {
          if (!(0 < J)) {
            for (; 0 < va.length; )
              va.shift()(p);
            if (!(0 < J || bf || (bf = true, p.calledRun = true, oa))) {
              for (; 0 < wa.length; )
                wa.shift()(p);
              for (aa(p); 0 < xa.length; )
                xa.shift()(p);
            }
          }
        }
        hf();
        return moduleArg.ready;
      };
    })();
    if (typeof exports === "object" && typeof module === "object")
      module.exports = ortWasm;
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
          if (typeof Blob === "undefined") {
            config.mainScriptUrlOrBlob = join(__dirname, "ort-wasm-threaded.js");
          } else {
            const scriptSourceCode = `var ortWasmThreaded=${factory.toString()};`;
            config.mainScriptUrlOrBlob = new Blob([scriptSourceCode], { type: "text/javascript" });
          }
        }
        factory(config).then(
          // wasm module initialized successfully
          (module) => {
            initializing = false;
            initialized = true;
            wasm = module;
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
var ortEnvInitialized, getSessionInputOutputCount, initOrt, initRuntime, activeSessions, isOrtEnvInitialized, createSessionAllocate, createSessionFinalize, createSession, releaseSession, prepareInputOutputTensor, run, endProfiling;
var init_wasm_core_impl = __esm({
  "web/lib/wasm/wasm-core-impl.ts"() {
    "use strict";
    init_run_options();
    init_session_options();
    init_wasm_common();
    init_wasm_factory();
    init_wasm_utils();
    ortEnvInitialized = false;
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
    initOrt = (numThreads, loggingLevel) => {
      const errorCode = getInstance()._OrtInit(numThreads, loggingLevel);
      if (errorCode !== 0) {
        checkLastError("Can't initialize onnxruntime.");
      }
    };
    initRuntime = async (env3) => {
      initOrt(env3.wasm.numThreads, logLevelStringToEnum(env3.logLevel));
      if (false) {
        const initJsep = null.init;
        await initJsep(getInstance(), env3);
      }
      ortEnvInitialized = true;
    };
    activeSessions = /* @__PURE__ */ new Map();
    isOrtEnvInitialized = () => ortEnvInitialized;
    createSessionAllocate = (model) => {
      const wasm2 = getInstance();
      const modelDataOffset = wasm2._malloc(model.byteLength);
      if (modelDataOffset === 0) {
        throw new Error(`Can't create a session. failed to allocate a buffer of size ${model.byteLength}.`);
      }
      wasm2.HEAPU8.set(model, modelDataOffset);
      return [modelDataOffset, model.byteLength];
    };
    createSessionFinalize = (modelData, options) => {
      const wasm2 = getInstance();
      let sessionHandle = 0;
      let sessionOptionsHandle = 0;
      let ioBindingHandle = 0;
      let allocs = [];
      const inputNamesUTF8Encoded = [];
      const outputNamesUTF8Encoded = [];
      try {
        [sessionOptionsHandle, allocs] = setSessionOptions(options);
        sessionHandle = wasm2._OrtCreateSession(modelData[0], modelData[1], sessionOptionsHandle);
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
        wasm2._free(modelData[0]);
        if (sessionOptionsHandle !== 0) {
          wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);
        }
        allocs.forEach((alloc) => wasm2._free(alloc));
      }
    };
    createSession = (model, options) => {
      const modelData = createSessionAllocate(model);
      return createSessionFinalize(modelData, options);
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
var scriptSrc, initializeWebAssemblyInstance, initializeRuntime, createSessionAllocate2, createSessionFinalize2, createSession2, releaseSession2, run2, endProfiling2, isOrtEnvInitialized2;
var init_proxy_wrapper = __esm({
  "web/lib/wasm/proxy-wrapper.ts"() {
    "use strict";
    init_esm();
    init_wasm_core_impl();
    init_wasm_factory();
    scriptSrc = typeof document !== "undefined" ? document?.currentScript?.src : void 0;
    initializeWebAssemblyInstance = async () => {
      if (false) {
        if (initialized) {
          return;
        }
        if (initializing) {
          throw new Error("multiple calls to 'initWasm()' detected.");
        }
        if (aborted) {
          throw new Error("previous call to 'initWasm()' failed.");
        }
        initializing = true;
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
          const message = { type: "init-wasm", in: env2.wasm };
          proxyWorker.postMessage(message);
        });
      } else {
        return initializeWebAssembly(env2.wasm);
      }
    };
    initializeRuntime = async (env3) => {
      if (false) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          initOrtCallbacks = [resolve, reject];
          const message = { type: "init-ort", in: env3 };
          proxyWorker.postMessage(message);
        });
      } else {
        await initRuntime(env3);
      }
    };
    createSessionAllocate2 = async (model) => {
      if (false) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          createSessionAllocateCallbacks.push([resolve, reject]);
          const message = { type: "create_allocate", in: { model } };
          proxyWorker.postMessage(message, [model.buffer]);
        });
      } else {
        return createSessionAllocate(model);
      }
    };
    createSessionFinalize2 = async (modeldata, options) => {
      if (false) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          createSessionFinalizeCallbacks.push([resolve, reject]);
          const message = { type: "create_finalize", in: { modeldata, options } };
          proxyWorker.postMessage(message);
        });
      } else {
        return createSessionFinalize(modeldata, options);
      }
    };
    createSession2 = async (model, options) => {
      if (false) {
        if (options?.preferredOutputLocation) {
          throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
        }
        ensureWorker();
        return new Promise((resolve, reject) => {
          createSessionCallbacks.push([resolve, reject]);
          const message = { type: "create", in: { model, options } };
          proxyWorker.postMessage(message, [model.buffer]);
        });
      } else {
        return createSession(model, options);
      }
    };
    releaseSession2 = async (sessionId) => {
      if (false) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          releaseSessionCallbacks.push([resolve, reject]);
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
          runCallbacks.push([resolve, reject]);
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
          endProfilingCallbacks.push([resolve, reject]);
          const message = { type: "end-profiling", in: sessionId };
          proxyWorker.postMessage(message);
        });
      } else {
        endProfiling(sessionId);
      }
    };
    isOrtEnvInitialized2 = async () => {
      if (false) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          isOrtEnvInitializedCallbacks.push([resolve, reject]);
          const message = { type: "is-ort-env-initialized" };
          proxyWorker.postMessage(message);
        });
      } else {
        return isOrtEnvInitialized();
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
var runtimeInitializationPromise, encodeTensorMetadata, decodeTensorMetadata, OnnxruntimeWebAssemblySessionHandler;
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
      async createSessionAllocate(path) {
        const response = await fetch(path);
        if (response.status !== 200) {
          throw new Error(`failed to load model: ${path}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return createSessionAllocate2(new Uint8Array(arrayBuffer));
      }
      async loadModel(pathOrBuffer, options) {
        if (!await isOrtEnvInitialized2()) {
          if (!runtimeInitializationPromise) {
            runtimeInitializationPromise = initializeRuntime(env2);
          }
          await runtimeInitializationPromise;
          runtimeInitializationPromise = void 0;
        }
        if (typeof pathOrBuffer === "string") {
          if (typeof process !== "undefined" && process.versions && process.versions.node) {
            const model = await readFile2(pathOrBuffer);
            [this.sessionId, this.inputNames, this.outputNames] = await createSession2(model, options);
          } else {
            const modelData = await this.createSessionAllocate(pathOrBuffer);
            [this.sessionId, this.inputNames, this.outputNames] = await createSessionFinalize2(modelData, options);
          }
        } else {
          [this.sessionId, this.inputNames, this.outputNames] = await createSession2(pathOrBuffer, options);
        }
      }
      async dispose() {
        return releaseSession2(this.sessionId);
      }
      async run(feeds, fetches, options) {
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
      if (typeof env2.wasm.numThreads !== "number" || !Number.isInteger(env2.wasm.numThreads) || env2.wasm.numThreads <= 0) {
        const numCpuLogicalCores = typeof navigator === "undefined" ? cpus().length : navigator.hardwareConcurrency;
        env2.wasm.numThreads = Math.min(4, Math.ceil((numCpuLogicalCores || 1) / 2));
      }
    };
    OnnxruntimeWebAssemblyBackend = class {
      async init() {
        initializeFlags();
        await initializeWebAssemblyInstance();
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
    registerBackend("webnn", wasmBackend2, 9);
  }
}
Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
export {
  InferenceSession2 as InferenceSession,
  Tensor2 as Tensor,
  TrainingSession2 as TrainingSession,
  lib_default as default,
  env2 as env,
  registerBackend
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24taW1wbC50cyIsICIuLi8uLi8uLi9jb21tb24vbGliL2luZmVyZW5jZS1zZXNzaW9uLnRzIiwgIi4uLy4uLy4uL2NvbW1vbi9saWIvb25ueC12YWx1ZS50cyIsICIuLi8uLi8uLi9jb21tb24vbGliL3RyYWluaW5nLXNlc3Npb24taW1wbC50cyIsICIuLi8uLi8uLi9jb21tb24vbGliL3RyYWluaW5nLXNlc3Npb24udHMiLCAiLi4vLi4vLi4vY29tbW9uL2xpYi9pbmRleC50cyIsICJub2RlanMtaWdub3JlOm5vZGU6b3MiLCAibm9kZWpzLWlnbm9yZTpmcyIsICJub2RlanMtaWdub3JlOnBhdGgiLCAiLi4vLi4vbGliL3dhc20vYmluZGluZy9vcnQtd2FzbS5qcyIsICIuLi8uLi9saWIvd2FzbS93YXNtLWZhY3RvcnkudHMiLCAiLi4vLi4vbGliL3dhc20vd2FzbS11dGlscy50cyIsICIuLi8uLi9saWIvd2FzbS9ydW4tb3B0aW9ucy50cyIsICIuLi8uLi9saWIvd2FzbS9zZXNzaW9uLW9wdGlvbnMudHMiLCAiLi4vLi4vbGliL3dhc20vd2FzbS1jb21tb24udHMiLCAiLi4vLi4vbGliL3dhc20vd2FzbS1jb3JlLWltcGwudHMiLCAiLi4vLi4vbGliL3dhc20vcHJveHktd3JhcHBlci50cyIsICJub2RlanMtaWdub3JlOm5vZGU6ZnMvcHJvbWlzZXMiLCAiLi4vLi4vbGliL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZS50cyIsICIuLi8uLi9saWIvYmFja2VuZC13YXNtLnRzIiwgIi4uLy4uL2xpYi9iYWNrZW5kLXdhc20taW5mZXJlbmNlLnRzIiwgIi4uLy4uL2xpYi9pbmRleC50cyIsICIuLi8uLi9saWIvdmVyc2lvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7QmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kLmpzJztcblxuaW50ZXJmYWNlIEJhY2tlbmRJbmZvIHtcbiAgYmFja2VuZDogQmFja2VuZDtcbiAgcHJpb3JpdHk6IG51bWJlcjtcblxuICBpbml0UHJvbWlzZT86IFByb21pc2U8dm9pZD47XG4gIGluaXRpYWxpemVkPzogYm9vbGVhbjtcbiAgYWJvcnRlZD86IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhY2tlbmRzOiBNYXA8c3RyaW5nLCBCYWNrZW5kSW5mbz4gPSBuZXcgTWFwKCk7XG5jb25zdCBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHk6IHN0cmluZ1tdID0gW107XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBiYWNrZW5kLlxuICpcbiAqIEBwYXJhbSBuYW1lIC0gdGhlIG5hbWUgYXMgYSBrZXkgdG8gbG9va3VwIGFzIGFuIGV4ZWN1dGlvbiBwcm92aWRlci5cbiAqIEBwYXJhbSBiYWNrZW5kIC0gdGhlIGJhY2tlbmQgb2JqZWN0LlxuICogQHBhcmFtIHByaW9yaXR5IC0gYW4gaW50ZWdlciBpbmRpY2F0aW5nIHRoZSBwcmlvcml0eSBvZiB0aGUgYmFja2VuZC4gSGlnaGVyIG51bWJlciBtZWFucyBoaWdoZXIgcHJpb3JpdHkuIGlmIHByaW9yaXR5XG4gKiA8IDAsIGl0IHdpbGwgYmUgY29uc2lkZXJlZCBhcyBhICdiZXRhJyB2ZXJzaW9uIGFuZCB3aWxsIG5vdCBiZSB1c2VkIGFzIGEgZmFsbGJhY2sgYmFja2VuZCBieSBkZWZhdWx0LlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyQmFja2VuZCA9IChuYW1lOiBzdHJpbmcsIGJhY2tlbmQ6IEJhY2tlbmQsIHByaW9yaXR5OiBudW1iZXIpOiB2b2lkID0+IHtcbiAgaWYgKGJhY2tlbmQgJiYgdHlwZW9mIGJhY2tlbmQuaW5pdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgYmFja2VuZC5jcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IGN1cnJlbnRCYWNrZW5kID0gYmFja2VuZHMuZ2V0KG5hbWUpO1xuICAgIGlmIChjdXJyZW50QmFja2VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBiYWNrZW5kcy5zZXQobmFtZSwge2JhY2tlbmQsIHByaW9yaXR5fSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50QmFja2VuZC5wcmlvcml0eSA+IHByaW9yaXR5KSB7XG4gICAgICAvLyBzYW1lIG5hbWUgaXMgYWxyZWFkeSByZWdpc3RlcmVkIHdpdGggYSBoaWdoZXIgcHJpb3JpdHkuIHNraXAgcmVnaXN0ZXJhdGlvbi5cbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kLnByaW9yaXR5ID09PSBwcmlvcml0eSkge1xuICAgICAgaWYgKGN1cnJlbnRCYWNrZW5kLmJhY2tlbmQgIT09IGJhY2tlbmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcmVnaXN0ZXIgYmFja2VuZCBcIiR7bmFtZX1cIiB1c2luZyBwcmlvcml0eSAke3ByaW9yaXR5fWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcmlvcml0eSA+PSAwKSB7XG4gICAgICBjb25zdCBpID0gYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaSAhPT0gLTEpIHtcbiAgICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnNwbGljZShpLCAxKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJhY2tlbmRzLmdldChiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHlbaV0pIS5wcmlvcml0eSA8PSBwcmlvcml0eSkge1xuICAgICAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5zcGxpY2UoaSwgMCwgbmFtZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkucHVzaChuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgdmFsaWQgYmFja2VuZCcpO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlIGJhY2tlbmQgYnkgc3BlY2lmaWVkIGhpbnRzLlxuICpcbiAqIEBwYXJhbSBiYWNrZW5kSGludHMgLSBhIGxpc3Qgb2YgZXhlY3V0aW9uIHByb3ZpZGVyIG5hbWVzIHRvIGxvb2t1cC4gSWYgb21pdHRlZCB1c2UgcmVnaXN0ZXJlZCBiYWNrZW5kcyBhcyBsaXN0LlxuICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGJhY2tlbmQuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZUJhY2tlbmQgPSBhc3luYyhiYWNrZW5kSGludHM6IHJlYWRvbmx5IHN0cmluZ1tdKTogUHJvbWlzZTxCYWNrZW5kPiA9PiB7XG4gIGNvbnN0IGJhY2tlbmROYW1lcyA9IGJhY2tlbmRIaW50cy5sZW5ndGggPT09IDAgPyBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkgOiBiYWNrZW5kSGludHM7XG4gIGNvbnN0IGVycm9ycyA9IFtdO1xuICBmb3IgKGNvbnN0IGJhY2tlbmROYW1lIG9mIGJhY2tlbmROYW1lcykge1xuICAgIGNvbnN0IGJhY2tlbmRJbmZvID0gYmFja2VuZHMuZ2V0KGJhY2tlbmROYW1lKTtcbiAgICBpZiAoYmFja2VuZEluZm8pIHtcbiAgICAgIGlmIChiYWNrZW5kSW5mby5pbml0aWFsaXplZCkge1xuICAgICAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcbiAgICAgIH0gZWxzZSBpZiAoYmFja2VuZEluZm8uYWJvcnRlZCkge1xuICAgICAgICBjb250aW51ZTsgIC8vIGN1cnJlbnQgYmFja2VuZCBpcyB1bmF2YWlsYWJsZTsgdHJ5IG5leHRcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNJbml0aWFsaXppbmcgPSAhIWJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFpc0luaXRpYWxpemluZykge1xuICAgICAgICAgIGJhY2tlbmRJbmZvLmluaXRQcm9taXNlID0gYmFja2VuZEluZm8uYmFja2VuZC5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgICAgIGJhY2tlbmRJbmZvLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGJhY2tlbmRJbmZvLmJhY2tlbmQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmICghaXNJbml0aWFsaXppbmcpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaCh7bmFtZTogYmFja2VuZE5hbWUsIGVycjogZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJhY2tlbmRJbmZvLmFib3J0ZWQgPSB0cnVlO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZGVsZXRlIGJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgbm8gYXZhaWxhYmxlIGJhY2tlbmQgZm91bmQuIEVSUjogJHtlcnJvcnMubWFwKGUgPT4gYFske2UubmFtZX1dICR7ZS5lcnJ9YCkuam9pbignLCAnKX1gKTtcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7VHJhaW5pbmdTZXNzaW9ufSBmcm9tICcuL3RyYWluaW5nLXNlc3Npb24uanMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFNlc3Npb25IYW5kbGVyIHtcbiAgdHlwZSBGZWVkc1R5cGUgPSB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX07XG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGx9O1xuICB0eXBlIFJldHVyblR5cGUgPSB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX07XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBzaGFyZWQgU2Vzc2lvbkhhbmRsZXIgZnVuY3Rpb25hbGl0eVxuICpcbiAqIEBpZ25vcmVcbiAqL1xuaW50ZXJmYWNlIFNlc3Npb25IYW5kbGVyIHtcbiAgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIHJlYWRvbmx5IGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuICByZWFkb25seSBvdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgaGFuZGxlciBpbnN0YW5jZSBvZiBhbiBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgZXh0ZW5kcyBTZXNzaW9uSGFuZGxlciB7XG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQ7XG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIHJ1bihmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgaGFuZGxlciBpbnN0YW5jZSBvZiBhIHRyYWluaW5nIGluZmVyZW5jZSBzZXNzaW9uLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xuICBydW5UcmFpblN0ZXAoXG4gICAgICBmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG5cbiAgZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8bnVtYmVyPjtcbiAgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYXJyYXk6IFVpbnQ4QXJyYXksIHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+O1xuICBnZXRDb250aWd1b3VzUGFyYW1ldGVycyh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxPbm54VmFsdWU+O1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIGJhY2tlbmQgdGhhdCBwcm92aWRlcyBpbXBsZW1lbnRhdGlvbiBvZiBtb2RlbCBpbmZlcmVuY2luZy5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQmFja2VuZCB7XG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiYWNrZW5kIGFzeW5jaHJvbm91c2x5LiBTaG91bGQgdGhyb3cgd2hlbiBmYWlsZWQuXG4gICAqL1xuICBpbml0KCk6IFByb21pc2U8dm9pZD47XG5cbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIodXJpT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcblxuICBjcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGVyP1xuICAgICAgKGNoZWNrcG9pbnRTdGF0ZVVyaU9yQnVmZmVyOiBUcmFpbmluZ1Nlc3Npb24uVVJJb3JCdWZmZXIsIHRyYWluTW9kZWxVcmlPckJ1ZmZlcjogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyLFxuICAgICAgIGV2YWxNb2RlbFVyaU9yQnVmZmVyOiBUcmFpbmluZ1Nlc3Npb24uVVJJb3JCdWZmZXIsIG9wdGltaXplck1vZGVsVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VUklvckJ1ZmZlcixcbiAgICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxUcmFpbmluZ1Nlc3Npb25IYW5kbGVyPjtcbn1cblxuZXhwb3J0IHtyZWdpc3RlckJhY2tlbmR9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSAvanMvc2NyaXB0cy91cGRhdGUtdmVyc2lvbi50c1xuLy8gRG8gbm90IG1vZGlmeSBmaWxlIGNvbnRlbnQgbWFudWFsbHkuXG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzEuMTcuMCc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7RW52fSBmcm9tICcuL2Vudi5qcyc7XG5pbXBvcnQge3ZlcnNpb259IGZyb20gJy4vdmVyc2lvbi5qcyc7XG5cbnR5cGUgTG9nTGV2ZWxUeXBlID0gRW52Wydsb2dMZXZlbCddO1xuXG5sZXQgbG9nTGV2ZWxWYWx1ZTogUmVxdWlyZWQ8TG9nTGV2ZWxUeXBlPiA9ICd3YXJuaW5nJztcblxuZXhwb3J0IGNvbnN0IGVudjogRW52ID0ge1xuICB3YXNtOiB7fSBhcyBFbnYuV2ViQXNzZW1ibHlGbGFncyxcbiAgd2ViZ2w6IHt9IGFzIEVudi5XZWJHTEZsYWdzLFxuICB3ZWJncHU6IHt9IGFzIEVudi5XZWJHcHVGbGFncyxcbiAgdmVyc2lvbnM6IHtjb21tb246IHZlcnNpb259LFxuXG4gIHNldCBsb2dMZXZlbCh2YWx1ZTogTG9nTGV2ZWxUeXBlKSB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgWyd2ZXJib3NlJywgJ2luZm8nLCAnd2FybmluZycsICdlcnJvcicsICdmYXRhbCddLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBsb2dnaW5nIGxldmVsOiAke3ZhbHVlfWApO1xuICAgIH1cbiAgICBsb2dMZXZlbFZhbHVlID0gdmFsdWU7XG4gIH0sXG4gIGdldCBsb2dMZXZlbCgpOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+IHtcbiAgICByZXR1cm4gbG9nTGV2ZWxWYWx1ZTtcbiAgfSxcbn07XG5cbi8vIHNldCBwcm9wZXJ0eSAnbG9nTGV2ZWwnIHNvIHRoYXQgdGhleSBjYW4gYmUgY29ycmVjdGx5IHRyYW5zZmVycmVkIHRvIHdvcmtlciBieSBgcG9zdE1lc3NhZ2UoKWAuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZW52LCAnbG9nTGV2ZWwnLCB7ZW51bWVyYWJsZTogdHJ1ZX0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge2VudiBhcyBlbnZJbXBsfSBmcm9tICcuL2Vudi1pbXBsLmpzJztcblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIEVudiB7XG4gIGV4cG9ydCB0eXBlIFdhc21QcmVmaXhPckZpbGVQYXRocyA9IHN0cmluZ3x7XG4gICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG4gICAgJ29ydC13YXNtLndhc20nPzogc3RyaW5nO1xuICAgICdvcnQtd2FzbS10aHJlYWRlZC53YXNtJz86IHN0cmluZztcbiAgICAnb3J0LXdhc20tc2ltZC53YXNtJz86IHN0cmluZztcbiAgICAnb3J0LXRyYWluaW5nLXdhc20tc2ltZC53YXNtJz86IHN0cmluZztcbiAgICAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC53YXNtJz86IHN0cmluZztcbiAgICAvKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuICB9O1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgbnVtYmVyIG9mIHRocmVhZChzKS4gSWYgb21pdHRlZCBvciBzZXQgdG8gMCwgbnVtYmVyIG9mIHRocmVhZChzKSB3aWxsIGJlIGRldGVybWluZWQgYnkgc3lzdGVtLiBJZiBzZXRcbiAgICAgKiB0byAxLCBubyB3b3JrZXIgdGhyZWFkIHdpbGwgYmUgc3Bhd25lZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IG11bHRpdGhyZWFkIGZlYXR1cmUgaXMgYXZhaWxhYmxlIGluIGN1cnJlbnQgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYDBgXG4gICAgICovXG4gICAgbnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgU0lNRC4gSWYgc2V0IHRvIGZhbHNlLCBTSU1EIHdpbGwgYmUgZm9yY2VseSBkaXNhYmxlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IFNJTUQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdHJ1ZWBcbiAgICAgKi9cbiAgICBzaW1kPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgYSBudW1iZXIgc3BlY2lmeWluZyB0aGUgdGltZW91dCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgV2ViQXNzZW1ibHkgYmFja2VuZCwgaW4gbWlsbGlzZWNvbmRzLiBBIHplcm9cbiAgICAgKiB2YWx1ZSBpbmRpY2F0ZXMgbm8gdGltZW91dCBpcyBzZXQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAwYFxuICAgICAqL1xuICAgIGluaXRUaW1lb3V0PzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU2V0IGEgY3VzdG9tIFVSTCBwcmVmaXggdG8gdGhlIC53YXNtIGZpbGVzIG9yIGEgc2V0IG9mIG92ZXJyaWRlcyBmb3IgZWFjaCAud2FzbSBmaWxlLiBUaGUgb3ZlcnJpZGUgcGF0aCBzaG91bGQgYmVcbiAgICAgKiBhbiBhYnNvbHV0ZSBwYXRoLlxuICAgICAqL1xuICAgIHdhc21QYXRocz86IFdhc21QcmVmaXhPckZpbGVQYXRocztcblxuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBwcm94eSB0aGUgZXhlY3V0aW9uIG9mIG1haW4gdGhyZWFkIHRvIGEgd29ya2VyIHRocmVhZC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHByb3h5PzogYm9vbGVhbjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xGbGFncyB7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgV2ViR0wgQ29udGV4dCBJRCAod2ViZ2wgb3Igd2ViZ2wyKS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCd3ZWJnbDInYFxuICAgICAqL1xuICAgIGNvbnRleHRJZD86ICd3ZWJnbCd8J3dlYmdsMic7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBXZWJHTCByZW5kZXJpbmcgY29udGV4dC5cbiAgICAgKi9cbiAgICByZWFkb25seSBjb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgbWF4aW11bSBiYXRjaCBzaXplIGZvciBtYXRtdWwuIDAgbWVhbnMgdG8gZGlzYWJsZSBiYXRjaGluZy5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgbWF0bXVsTWF4QmF0Y2hTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHRleHR1cmUgY2FjaGUgbW9kZS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCdmdWxsJ2BcbiAgICAgKi9cbiAgICB0ZXh0dXJlQ2FjaGVNb2RlPzogJ2luaXRpYWxpemVyT25seSd8J2Z1bGwnO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHBhY2tlZCB0ZXh0dXJlIG1vZGVcbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHBhY2s/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgd2hldGhlciBlbmFibGUgYXN5bmMgZG93bmxvYWQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBhc3luYz86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUZsYWdzIHtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgbW9kZS5cbiAgICAgKi9cbiAgICBwcm9maWxpbmdNb2RlPzogJ29mZid8J2RlZmF1bHQnO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGV2aWNlIGZvciBXZWJHUFUuXG4gICAgICpcbiAgICAgKiBXaGVuIHVzZSB3aXRoIFR5cGVTY3JpcHQsIHRoZSB0eXBlIG9mIHRoaXMgcHJvcGVydHkgaXMgYEdQVURldmljZWAgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cbiAgICAgKiBVc2UgYGNvbnN0IGRldmljZSA9IGVudi53ZWJncHUuZGV2aWNlIGFzIEdQVURldmljZTtgIGluIFR5cGVTY3JpcHQgdG8gYWNjZXNzIHRoaXMgcHJvcGVydHkgd2l0aCBjb3JyZWN0IHR5cGUuXG4gICAgICpcbiAgICAgKiBzZWUgY29tbWVudHMgb24ge0BsaW5rIEdwdUJ1ZmZlclR5cGV9IGZvciBtb3JlIGRldGFpbHMgYWJvdXQgd2h5IG5vdCB1c2UgdHlwZXMgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cbiAgICAgKi9cbiAgICByZWFkb25seSBkZXZpY2U6IHVua25vd247XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB3aGV0aGVyIHZhbGlkYXRlIGlucHV0IGNvbnRlbnQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICB2YWxpZGF0ZUlucHV0Q29udGVudD86IGJvb2xlYW47XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnYge1xuICAvKipcbiAgICogc2V0IHRoZSBzZXZlcml0eSBsZXZlbCBmb3IgbG9nZ2luZy5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgJ3dhcm5pbmcnYFxuICAgKi9cbiAgbG9nTGV2ZWw/OiAndmVyYm9zZSd8J2luZm8nfCd3YXJuaW5nJ3wnZXJyb3InfCdmYXRhbCc7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZSB3aGV0aGVyIHJ1biBpbiBkZWJ1ZyBtb2RlLlxuICAgKlxuICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICovXG4gIGRlYnVnPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogR2V0IHZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcGFja2FnZS5cbiAgICovXG4gIHJlYWRvbmx5IHZlcnNpb25zOiB7XG4gICAgcmVhZG9ubHkgY29tbW9uOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgd2ViPzogc3RyaW5nO1xuICAgIHJlYWRvbmx5IG5vZGU/OiBzdHJpbmc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgIHJlYWRvbmx5ICdyZWFjdC1uYXRpdmUnPzogc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkFzc2VtYmx5XG4gICAqL1xuICByZWFkb25seSB3YXNtOiBFbnYuV2ViQXNzZW1ibHlGbGFncztcblxuICAvKipcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJHTFxuICAgKi9cbiAgcmVhZG9ubHkgd2ViZ2w6IEVudi5XZWJHTEZsYWdzO1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkdQVVxuICAgKi9cbiAgcmVhZG9ubHkgd2ViZ3B1OiBFbnYuV2ViR3B1RmxhZ3M7XG5cbiAgW25hbWU6IHN0cmluZ106IHVua25vd247XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGFzIGEgZ2xvYmFsIHNpbmdsZXRvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudjogRW52ID0gZW52SW1wbDtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3JUb0RhdGFVcmxPcHRpb25zLCBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnN9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IudG9EYXRhVVJMKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclRvRGF0YVVSTCA9ICh0ZW5zb3I6IFRlbnNvciwgb3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY2FudmFzLndpZHRoID0gdGVuc29yLmRpbXNbM107XG4gIGNhbnZhcy5oZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1szXTtcbiAgICB9IGVsc2UgeyAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucz8uZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgKG5vcm0ubWVhbikgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW5bMF0sIG5vcm0ubWVhblsxXSwgbm9ybS5tZWFuWzJdLCAwXTtcbiAgICAgICAgaWYgKG5vcm0ubWVhblszXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybU1lYW5bM10gPSBub3JtLm1lYW5bM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLmJpYXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybUJpYXMgPSBbMCwgMCwgMCwgMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgKG5vcm0uYmlhcykgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhc107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXNbMF0sIG5vcm0uYmlhc1sxXSwgbm9ybS5iaWFzWzJdLCAwXTtcbiAgICAgICAgaWYgKG5vcm0uYmlhc1szXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybUJpYXNbM10gPSBub3JtLmJpYXNbM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcbiAgICBsZXQgclRlbnNvclBvaW50ZXIgPSAwLCBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSwgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLCBhVGVuc29yUG9pbnRlciA9IC0xO1xuXG4gICAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICAgIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQkEnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JCRycpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgd2lkdGg7IGorKykge1xuICAgICAgICBjb25zdCBSID0gKCh0ZW5zb3IuZGF0YVtyVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMF0pICogbm9ybU1lYW5bMF07ICAvLyBSIHZhbHVlXG4gICAgICAgIGNvbnN0IEcgPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgIC8vIEcgdmFsdWVcbiAgICAgICAgY29uc3QgQiA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAgLy8gQiB2YWx1ZVxuICAgICAgICBjb25zdCBBID0gYVRlbnNvclBvaW50ZXIgPT09IC0xID9cbiAgICAgICAgICAgIDI1NSA6XG4gICAgICAgICAgICAoKHRlbnNvci5kYXRhW2FUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1szXSkgKiBub3JtTWVhblszXTsgIC8vIEEgdmFsdWVcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9yZXN0cmljdC1wbHVzLW9wZXJhbmRzXG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgnICsgUiArICcsJyArIEcgKyAnLCcgKyBCICsgJywnICsgQSArICcpJztcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LmZpbGxSZWN0KGosIGksIDEsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xuICB9XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci50b0ltYWdlRGF0YSgpXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JUb0ltYWdlRGF0YSA9ICh0ZW5zb3I6IFRlbnNvciwgb3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YSA9PiB7XG4gIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJyk7XG4gIGxldCBpbWFnZTogSW1hZ2VEYXRhO1xuICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCAmIGZvcm1hdFxuICAgIGxldCB3aWR0aDogbnVtYmVyO1xuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICBsZXQgY2hhbm5lbHM6IG51bWJlcjtcbiAgICBpZiAob3B0aW9ucz8udGVuc29yTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzFdO1xuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1szXTtcbiAgICB9IGVsc2UgeyAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1sxXTtcbiAgICB9XG4gICAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zICE9PSB1bmRlZmluZWQgPyAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQicpIDogJ1JHQic7XG5cbiAgICBjb25zdCBub3JtID0gb3B0aW9ucz8ubm9ybTtcbiAgICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLm1lYW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybU1lYW4gPSBbMjU1LCAyNTUsIDI1NSwgMjU1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiAobm9ybS5tZWFuKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhblswXSwgbm9ybS5tZWFuWzFdLCBub3JtLm1lYW5bMl0sIDI1NV07XG4gICAgICAgIGlmIChub3JtLm1lYW5bM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1NZWFuWzNdID0gbm9ybS5tZWFuWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1CaWFzID0gWzAsIDAsIDAsIDBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIChub3JtLmJpYXMpID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1CaWFzWzNdID0gbm9ybS5iaWFzWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgJiYgKGNoYW5uZWxzID09PSA0ICYmIG9wdGlvbnMuZm9ybWF0ICE9PSAnUkdCQScpIHx8XG4gICAgICAgICAgKGNoYW5uZWxzID09PSAzICYmIChvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQicgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdCR1InKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgZm9ybWF0IGRvZXNuXFwndCBtYXRjaCBpbnB1dCB0ZW5zb3IgZGltcycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICAgIGNvbnN0IHN0ZXAgPSA0O1xuICAgIGxldCBySW1hZ2VQb2ludGVyID0gMCwgZ0ltYWdlUG9pbnRlciA9IDEsIGJJbWFnZVBvaW50ZXIgPSAyLCBhSW1hZ2VQb2ludGVyID0gMztcbiAgICBsZXQgclRlbnNvclBvaW50ZXIgPSAwLCBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSwgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLCBhVGVuc29yUG9pbnRlciA9IC0xO1xuXG4gICAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICAgIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQkEnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JCRycpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH1cblxuICAgIGltYWdlID0gcGl4ZWxzMkRDb250ZXh0LmNyZWF0ZUltYWdlRGF0YSh3aWR0aCwgaGVpZ2h0KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVpZ2h0ICogd2lkdGg7XG4gICAgICAgICBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGdJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYkltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGkrKykge1xuICAgICAgaW1hZ2UuZGF0YVtySW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbclRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzBdKSAqIG5vcm1NZWFuWzBdOyAgLy8gUiB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtnSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbZ1RlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzFdKSAqIG5vcm1NZWFuWzFdOyAgLy8gRyB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtiSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAgLy8gQiB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVthSW1hZ2VQb2ludGVyXSA9IGFUZW5zb3JQb2ludGVyID09PSAtMSA/XG4gICAgICAgICAgMjU1IDpcbiAgICAgICAgICAoKHRlbnNvci5kYXRhW2FUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1szXSkgKiBub3JtTWVhblszXTsgIC8vIEEgdmFsdWVcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgfVxuICByZXR1cm4gaW1hZ2U7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge09wdGlvbnNEaW1lbnNpb25zLCBPcHRpb25zRm9ybWF0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMsIE9wdGlvbnNUZW5zb3JGb3JtYXQsIE9wdGlvbnNUZW5zb3JMYXlvdXQsIFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9ucywgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMsIFRlbnNvckZyb21UZXh0dXJlT3B0aW9ucywgVGVuc29yRnJvbVVybE9wdGlvbnN9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLWltcGwuanMnO1xuaW1wb3J0IHtUZW5zb3IgYXMgVGVuc29ySW50ZXJmYWNlfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmludGVyZmFjZSBCdWZmZXJUb1RlbnNvck9wdGlvbnMgZXh0ZW5kcyBPcHRpb25zRGltZW5zaW9ucywgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNUZW5zb3JGb3JtYXQge31cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIGltYWdlIG9iamVjdFxuICpcbiAqIEBwYXJhbSBidWZmZXIgLSBFeHRyYWN0ZWQgaW1hZ2UgYnVmZmVyIGRhdGEgLSBhc3N1bWluZyBSR0JBIGZvcm1hdFxuICogQHBhcmFtIGltYWdlRm9ybWF0IC0gaW5wdXQgaW1hZ2UgY29uZmlndXJhdGlvbiAtIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb25zIGhlaWdodCwgd2lkdGgsIGZvcm1hdFxuICogQHBhcmFtIHRlbnNvckZvcm1hdCAtIG91dHB1dCB0ZW5zb3IgY29uZmlndXJhdGlvbiAtIERlZmF1bHQgaXMgUkdCIGZvcm1hdFxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9UZW5zb3IgPSAoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheXx1bmRlZmluZWQsIG9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyk6IFRlbnNvciA9PiB7XG4gIGlmIChidWZmZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgYnVmZmVyIG11c3QgYmUgZGVmaW5lZCcpO1xuICB9XG4gIGlmIChvcHRpb25zLmhlaWdodCA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMud2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgaGVpZ2h0IGFuZCB3aWR0aCBtdXN0IGJlIGRlZmluZWQnKTtcbiAgfVxuICBpZiAob3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xuICAgIHRocm93IG5ldyBFcnJvcignTkhXQyBUZW5zb3IgbGF5b3V0IGlzIG5vdCBzdXBwb3J0ZWQgeWV0Jyk7XG4gIH1cblxuICBjb25zdCB7aGVpZ2h0LCB3aWR0aH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IG5vcm0gPSBvcHRpb25zLm5vcm0gPz8ge21lYW46IDI1NSwgYmlhczogMH07XG4gIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbiAgaWYgKHR5cGVvZiAobm9ybS5tZWFuKSA9PT0gJ251bWJlcicpIHtcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICB9IGVsc2Uge1xuICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiFbMF0sIG5vcm0ubWVhbiFbMV0sIG5vcm0ubWVhbiFbMl0sIG5vcm0ubWVhbiFbM10gPz8gMjU1XTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgKG5vcm0uYmlhcykgPT09ICdudW1iZXInKSB7XG4gICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcbiAgfSBlbHNlIHtcbiAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMhWzBdLCBub3JtLmJpYXMhWzFdLCBub3JtLmJpYXMhWzJdLCBub3JtLmJpYXMhWzNdID8/IDBdO1xuICB9XG5cbiAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5mb3JtYXQgOiAnUkdCQSc7XG4gIC8vIGRlZmF1bHQgdmFsdWUgaXMgUkdCQSBzaW5jZSBpbWFnZWRhdGEgYW5kIEhUTUxJbWFnZUVsZW1lbnQgdXNlcyBpdFxuXG4gIGNvbnN0IG91dHB1dGZvcm1hdCA9XG4gICAgICBvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRlbnNvckZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgY29uc3QgZmxvYXQzMkRhdGEgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBGbG9hdDMyQXJyYXkoc3RyaWRlICogNCkgOiBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDMpO1xuXG4gIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICBsZXQgc3RlcCA9IDQsIHJJbWFnZVBvaW50ZXIgPSAwLCBnSW1hZ2VQb2ludGVyID0gMSwgYkltYWdlUG9pbnRlciA9IDIsIGFJbWFnZVBvaW50ZXIgPSAzO1xuICBsZXQgclRlbnNvclBvaW50ZXIgPSAwLCBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSwgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLCBhVGVuc29yUG9pbnRlciA9IC0xO1xuXG4gIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBpbnB1dCBpbWFnZSBmb3JtYXRcbiAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xuICAgIHN0ZXAgPSAzO1xuICAgIHJJbWFnZVBvaW50ZXIgPSAwO1xuICAgIGdJbWFnZVBvaW50ZXIgPSAxO1xuICAgIGJJbWFnZVBvaW50ZXIgPSAyO1xuICAgIGFJbWFnZVBvaW50ZXIgPSAtMTtcbiAgfVxuXG4gIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBvdXRwdXQgdGVuc29yIGZvcm1hdFxuICBpZiAob3V0cHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XG4gIH0gZWxzZSBpZiAob3V0cHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gIH0gZWxzZSBpZiAob3V0cHV0Zm9ybWF0ID09PSAnQkdSJykge1xuICAgIGJUZW5zb3JQb2ludGVyID0gMDtcbiAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICByVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmlkZTtcbiAgICAgICBpKyssIHJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYkltYWdlUG9pbnRlciArPSBzdGVwLCBnSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGFJbWFnZVBvaW50ZXIgKz0gc3RlcCkge1xuICAgIGZsb2F0MzJEYXRhW3JUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltySW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzBdKSAvIG5vcm1NZWFuWzBdO1xuICAgIGZsb2F0MzJEYXRhW2dUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltnSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzFdKSAvIG5vcm1NZWFuWzFdO1xuICAgIGZsb2F0MzJEYXRhW2JUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltiSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzJdKSAvIG5vcm1NZWFuWzJdO1xuICAgIGlmIChhVGVuc29yUG9pbnRlciAhPT0gLTEgJiYgYUltYWdlUG9pbnRlciAhPT0gLTEpIHtcbiAgICAgIGZsb2F0MzJEYXRhW2FUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlclthSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzNdKSAvIG5vcm1NZWFuWzNdO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZsb2F0MzJBcnJheSAtPiBvcnQuVGVuc29yXG4gIGNvbnN0IG91dHB1dFRlbnNvciA9IG91dHB1dGZvcm1hdCA9PT0gJ1JHQkEnID8gbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgNCwgaGVpZ2h0LCB3aWR0aF0pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVGVuc29yKCdmbG9hdDMyJywgZmxvYXQzMkRhdGEsIFsxLCAzLCBoZWlnaHQsIHdpZHRoXSk7XG4gIHJldHVybiBvdXRwdXRUZW5zb3I7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tSW1hZ2UoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21JbWFnZSA9IGFzeW5jKFxuICAgIGltYWdlOiBJbWFnZURhdGF8SFRNTEltYWdlRWxlbWVudHxJbWFnZUJpdG1hcHxzdHJpbmcsXG4gICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zfFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zfFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnN8XG4gICAgVGVuc29yRnJvbVVybE9wdGlvbnMpOiBQcm9taXNlPFRlbnNvcj4gPT4ge1xuICAvLyBjaGVja2luZyB0aGUgdHlwZSBvZiBpbWFnZSBvYmplY3RcbiAgY29uc3QgaXNIVE1MSW1hZ2VFbGUgPSB0eXBlb2YgKEhUTUxJbWFnZUVsZW1lbnQpICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGNvbnN0IGlzSW1hZ2VEYXRhRWxlID0gdHlwZW9mIChJbWFnZURhdGEpICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEltYWdlRGF0YTtcbiAgY29uc3QgaXNJbWFnZUJpdG1hcCA9IHR5cGVvZiAoSW1hZ2VCaXRtYXApICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEltYWdlQml0bWFwO1xuICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiBpbWFnZSA9PT0gJ3N0cmluZyc7XG5cbiAgbGV0IGRhdGE6IFVpbnQ4Q2xhbXBlZEFycmF5fHVuZGVmaW5lZDtcbiAgbGV0IGJ1ZmZlclRvVGVuc29yT3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucyA/PyB7fTtcblxuICAvLyBmaWxsaW5nIGFuZCBjaGVja2luZyBpbWFnZSBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgaWYgKGlzSFRNTEltYWdlRWxlKSB7XG4gICAgLy8gSFRNTEltYWdlRWxlbWVudCAtIGltYWdlIG9iamVjdCAtIGZvcm1hdCBpcyBSR0JBIGJ5IGRlZmF1bHRcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZEhlaWdodCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZFdpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVkSGVpZ2h0O1xuICAgICAgICB3aWR0aCA9IG9wdGlvbnMucmVzaXplZFdpZHRoO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIGlmIChvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBpbnB1dCBjb25maWcgZm9ybWF0IG11c3QgYmUgUkdCQSBmb3IgSFRNTEltYWdlRWxlbWVudCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy50ZW5zb3JGb3JtYXQgPSAnUkdCQSc7XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMudGVuc29yRm9ybWF0ID0gJ1JHQkEnO1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIH1cblxuICAgICAgcGl4ZWxzMkRDb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XG4gICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNJbWFnZURhdGFFbGUpIHtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZFdpZHRoICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkSGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGhlaWdodCA9IG9wdGlvbnMucmVzaXplZEhlaWdodDtcbiAgICAgIHdpZHRoID0gb3B0aW9ucy5yZXNpemVkV2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgIHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmZvcm1hdCA9ICdSR0JBJztcbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgdGVtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICB0ZW1wQ2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZSwgMCwgMCk7XG4gICAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGltYWdlLmRhdGE7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzSW1hZ2VCaXRtYXApIHtcbiAgICAvLyBJbWFnZUJpdG1hcCAtIGltYWdlIG9iamVjdCAtIGZvcm1hdCBtdXN0IGJlIHByb3ZpZGVkIGJ5IHVzZXJcbiAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGltYWdlIGNvbmZpZyB3aXRoIGZvcm1hdCBmb3IgSW1hZ2ViaXRtYXAnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICBjb25zdCB3aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgcGl4ZWxzMkRDb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuICAgICAgcmV0dXJuIGJ1ZmZlclRvVGVuc29yKGRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1N0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGlmICghaW1hZ2UgfHwgIWNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIG5ld0ltYWdlLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XG4gICAgICBuZXdJbWFnZS5zcmMgPSBpbWFnZTtcbiAgICAgIG5ld0ltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY2FudmFzLndpZHRoID0gbmV3SW1hZ2Uud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBuZXdJbWFnZS5oZWlnaHQ7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKG5ld0ltYWdlLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjb25zdCBpbWcgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIHJlc29sdmUoYnVmZmVyVG9UZW5zb3IoaW1nLmRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGRhdGEgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZCAtIGFib3J0ZWQgdGVuc29yIGNyZWF0aW9uJyk7XG4gIH1cblxuICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGJ1ZmZlclRvVGVuc29yKGRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBkYXRhIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWQgLSBhYm9ydGVkIHRlbnNvciBjcmVhdGlvbicpO1xuICB9XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tVGV4dHVyZSgpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbVRleHR1cmUgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5UZXh0dXJlRGF0YVR5cGVzPihcbiAgICB0ZXh0dXJlOiBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGUsIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBkb3dubG9hZCwgZGlzcG9zZX0gPSBvcHRpb25zO1xuICAvLyBBbHdheXMgYXNzdW1lIFJHQkFGMzIuIFRPRE86IHN1cHBvcnQgZGlmZmVyZW50IHRleHR1cmUgZm9ybWF0XG4gIGNvbnN0IGRpbXMgPSBbMSwgaGVpZ2h0LCB3aWR0aCwgNF07XG4gIHJldHVybiBuZXcgVGVuc29yKHtsb2NhdGlvbjogJ3RleHR1cmUnLCB0eXBlOiAnZmxvYXQzMicsIHRleHR1cmUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlfSk7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tR3B1QnVmZmVyKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tR3B1QnVmZmVyID0gPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyRGF0YVR5cGVzPihcbiAgICBncHVCdWZmZXI6IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlLCBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHtkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2V9ID0gb3B0aW9ucztcbiAgcmV0dXJuIG5ldyBUZW5zb3Ioe2xvY2F0aW9uOiAnZ3B1LWJ1ZmZlcicsIHR5cGU6IGRhdGFUeXBlID8/ICdmbG9hdDMyJywgZ3B1QnVmZmVyLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZX0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbVBpbm5lZEJ1ZmZlcigpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbVBpbm5lZEJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkNwdVBpbm5lZERhdGFUeXBlcz4oXG4gICAgdHlwZTogVCwgYnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuRGF0YVR5cGVNYXBbVF0sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvciA9PlxuICAgIG5ldyBUZW5zb3Ioe2xvY2F0aW9uOiAnY3B1LXBpbm5lZCcsIHR5cGUsIGRhdGE6IGJ1ZmZlciwgZGltczogZGltcyA/PyBbYnVmZmVyLmxlbmd0aF19KTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLmpzJztcblxuZXhwb3J0IHR5cGUgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyA9IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yfFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxJbnQ4QXJyYXlDb25zdHJ1Y3RvcnxcbiAgICBVaW50MTZBcnJheUNvbnN0cnVjdG9yfEludDE2QXJyYXlDb25zdHJ1Y3RvcnxJbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxcbiAgICBGbG9hdDY0QXJyYXlDb25zdHJ1Y3RvcnxVaW50MzJBcnJheUNvbnN0cnVjdG9yfEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3I7XG5leHBvcnQgdHlwZSBTdXBwb3J0ZWRUeXBlZEFycmF5ID0gSW5zdGFuY2VUeXBlPFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnM+O1xuXG4vLyBhIHJ1bnRpbWUgbWFwIHRoYXQgbWFwcyB0eXBlIHN0cmluZyB0byBUeXBlZEFycmF5IGNvbnN0cnVjdG9yLiBTaG91bGQgbWF0Y2ggVGVuc29yLkRhdGFUeXBlTWFwLlxuZXhwb3J0IGNvbnN0IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgPSBuZXcgTWFwPHN0cmluZywgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz4oW1xuICBbJ2Zsb2F0MzInLCBGbG9hdDMyQXJyYXldLFxuICBbJ3VpbnQ4JywgVWludDhBcnJheV0sXG4gIFsnaW50OCcsIEludDhBcnJheV0sXG4gIFsndWludDE2JywgVWludDE2QXJyYXldLFxuICBbJ2Zsb2F0MTYnLCBVaW50MTZBcnJheV0sXG4gIFsnaW50MTYnLCBJbnQxNkFycmF5XSxcbiAgWydpbnQzMicsIEludDMyQXJyYXldLFxuICBbJ2Jvb2wnLCBVaW50OEFycmF5XSxcbiAgWydmbG9hdDY0JywgRmxvYXQ2NEFycmF5XSxcbiAgWyd1aW50MzInLCBVaW50MzJBcnJheV0sXG5dKTtcblxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQID0gbmV3IE1hcDxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLCBUZW5zb3IuVHlwZT4oW1xuICBbRmxvYXQzMkFycmF5LCAnZmxvYXQzMiddLFxuICBbVWludDhBcnJheSwgJ3VpbnQ4J10sXG4gIFtJbnQ4QXJyYXksICdpbnQ4J10sXG4gIFtVaW50MTZBcnJheSwgJ3VpbnQxNiddLFxuICBbSW50MTZBcnJheSwgJ2ludDE2J10sXG4gIFtJbnQzMkFycmF5LCAnaW50MzInXSxcbiAgW0Zsb2F0NjRBcnJheSwgJ2Zsb2F0NjQnXSxcbiAgW1VpbnQzMkFycmF5LCAndWludDMyJ10sXG5dKTtcblxuLy8gdGhlIGZvbGxvd2luZyBjb2RlIGFsbG93cyBkZWxheWluZyBleGVjdXRpb24gb2YgQmlnSW50IGNoZWNraW5nLiBUaGlzIGFsbG93cyBsYXp5IGluaXRpYWxpemF0aW9uIGZvclxuLy8gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCBhbmQgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCwgd2hpY2ggYWxsb3dzIEJpZ0ludCBwb2x5ZmlsbFxuLy8gaWYgYXZhaWxhYmxlLlxubGV0IGlzQmlnSW50Q2hlY2tlZCA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IGNoZWNrQmlnSW50ID0gKCkgPT4ge1xuICBpZiAoIWlzQmlnSW50Q2hlY2tlZCkge1xuICAgIGlzQmlnSW50Q2hlY2tlZCA9IHRydWU7XG4gICAgY29uc3QgaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ0ludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBCaWdJbnQ2NEFycmF5LmZyb20gPT09ICdmdW5jdGlvbic7XG4gICAgY29uc3QgaXNCaWdVaW50NjRBcnJheUF2YWlsYWJsZSA9XG4gICAgICAgIHR5cGVvZiBCaWdVaW50NjRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEJpZ1VpbnQ2NEFycmF5LmZyb20gPT09ICdmdW5jdGlvbic7XG5cbiAgICBpZiAoaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlKSB7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnaW50NjQnLCBCaWdJbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ0ludDY0QXJyYXksICdpbnQ2NCcpO1xuICAgIH1cbiAgICBpZiAoaXNCaWdVaW50NjRBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ3VpbnQ2NCcsIEJpZ1VpbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ1VpbnQ2NEFycmF5LCAndWludDY0Jyk7XG4gICAgfVxuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0NwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycywgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLCBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcblxuLyoqXG4gKiBjYWxjdWxhdGUgc2l6ZSBmcm9tIGRpbXMuXG4gKlxuICogQHBhcmFtIGRpbXMgdGhlIGRpbXMgYXJyYXkuIE1heSBiZSBhbiBpbGxlZ2FsIGlucHV0LlxuICovXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlU2l6ZSA9IChkaW1zOiByZWFkb25seSB1bmtub3duW10pOiBudW1iZXIgPT4ge1xuICBsZXQgc2l6ZSA9IDE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGltcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGRpbSA9IGRpbXNbaV07XG4gICAgaWYgKHR5cGVvZiBkaW0gIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNTYWZlSW50ZWdlcihkaW0pKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYW4gaW50ZWdlciwgZ290OiAke2RpbX1gKTtcbiAgICB9XG4gICAgaWYgKGRpbSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290OiAke2RpbX1gKTtcbiAgICB9XG4gICAgc2l6ZSAqPSBkaW07XG4gIH1cbiAgcmV0dXJuIHNpemU7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5yZXNoYXBlKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclJlc2hhcGUgPSAodGVuc29yOiBUZW5zb3IsIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yID0+IHtcbiAgc3dpdGNoICh0ZW5zb3IubG9jYXRpb24pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3IodGVuc29yLnR5cGUsIHRlbnNvci5kYXRhLCBkaW1zKTtcbiAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdjcHUtcGlubmVkJyxcbiAgICAgICAgZGF0YTogdGVuc29yLmRhdGEgYXMgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzWydkYXRhJ10sXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAndGV4dHVyZScsXG4gICAgICAgIHRleHR1cmU6IHRlbnNvci50ZXh0dXJlLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXG4gICAgICAgIGRpbXMsXG4gICAgICB9KTtcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdncHUtYnVmZmVyJyxcbiAgICAgICAgZ3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRlbnNvclJlc2hhcGU6IHRlbnNvciBsb2NhdGlvbiAke3RlbnNvci5sb2NhdGlvbn0gaXMgbm90IHN1cHBvcnRlZGApO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge3RlbnNvclRvRGF0YVVSTCwgdGVuc29yVG9JbWFnZURhdGF9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24taW1wbC5qcyc7XG5pbXBvcnQge1RlbnNvclRvRGF0YVVybE9wdGlvbnMsIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9uc30gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi5qcyc7XG5pbXBvcnQge3RlbnNvckZyb21HcHVCdWZmZXIsIHRlbnNvckZyb21JbWFnZSwgdGVuc29yRnJvbVBpbm5lZEJ1ZmZlciwgdGVuc29yRnJvbVRleHR1cmV9IGZyb20gJy4vdGVuc29yLWZhY3RvcnktaW1wbC5qcyc7XG5pbXBvcnQge0NwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycywgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLCBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucywgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucywgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLCBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnMsIFRlbnNvckZyb21VcmxPcHRpb25zLCBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7Y2hlY2tCaWdJbnQsIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAsIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIFN1cHBvcnRlZFR5cGVkQXJyYXksIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnN9IGZyb20gJy4vdGVuc29yLWltcGwtdHlwZS1tYXBwaW5nLmpzJztcbmltcG9ydCB7Y2FsY3VsYXRlU2l6ZSwgdGVuc29yUmVzaGFwZX0gZnJvbSAnLi90ZW5zb3ItdXRpbHMtaW1wbC5qcyc7XG5pbXBvcnQge1RlbnNvciBhcyBUZW5zb3JJbnRlcmZhY2V9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLy8gdHlwZSBhbGlhc2VzIGZvciB0aG9zZSBleHBvcnRlZCBmcm9tIFRlbnNvciBpbnRlcmZhY2VcblxudHlwZSBUZW5zb3JUeXBlID0gVGVuc29ySW50ZXJmYWNlLlR5cGU7XG50eXBlIFRlbnNvckRhdGFUeXBlID0gVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlO1xudHlwZSBUZW5zb3JEYXRhTG9jYXRpb24gPSBUZW5zb3JJbnRlcmZhY2UuRGF0YUxvY2F0aW9uO1xudHlwZSBUZW5zb3JUZXh0dXJlVHlwZSA9IFRlbnNvckludGVyZmFjZS5UZXh0dXJlVHlwZTtcbnR5cGUgVGVuc29yR3B1QnVmZmVyVHlwZSA9IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlO1xuXG4vKipcbiAqIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IgaW50ZXJmYWNlLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNsYXNzIFRlbnNvciBpbXBsZW1lbnRzIFRlbnNvckludGVyZmFjZSB7XG4gIC8vICNyZWdpb24gY29uc3RydWN0b3JzXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICB0eXBlOiBUZW5zb3JUeXBlLCBkYXRhOiBUZW5zb3JEYXRhVHlwZXxyZWFkb25seSBzdHJpbmdbXXxyZWFkb25seSBudW1iZXJbXXxyZWFkb25seSBib29sZWFuW10sXG4gICAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IENQVSB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuIFR5cGUgaXMgaW5mZXJyZWQgZnJvbSBkYXRhLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZGF0YTogVGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYm9vbGVhbltdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgcGlubmVkIENQVSBkYXRhIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdjcHUtcGlubmVkJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJHTCB0ZXh0dXJlIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICd0ZXh0dXJlJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgV2ViR1BVIGJ1ZmZlciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnZ3B1LWJ1ZmZlcicuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgYXJnMDogVGVuc29yVHlwZXxUZW5zb3JEYXRhVHlwZXxyZWFkb25seSBzdHJpbmdbXXxyZWFkb25seSBib29sZWFuW118Q3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzfFxuICAgICAgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc3xHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gICAgICBhcmcxPzogVGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYm9vbGVhbltdLCBhcmcyPzogcmVhZG9ubHkgbnVtYmVyW10pIHtcbiAgICAvLyBwZXJmb3JtIG9uZS10aW1lIGNoZWNrIGZvciBCaWdJbnQgc3VwcG9ydFxuICAgIGNoZWNrQmlnSW50KCk7XG5cbiAgICBsZXQgdHlwZTogVGVuc29yVHlwZTtcbiAgICBsZXQgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdvYmplY3QnICYmICdsb2NhdGlvbicgaW4gYXJnMCkge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3IgZnJvbSBzcGVjaWZpYyBsb2NhdGlvblxuICAgICAgLy9cbiAgICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gYXJnMC5sb2NhdGlvbjtcbiAgICAgIHR5cGUgPSBhcmcwLnR5cGU7XG4gICAgICBkaW1zID0gYXJnMC5kaW1zO1xuICAgICAgc3dpdGNoIChhcmcwLmxvY2F0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOiB7XG4gICAgICAgICAgY29uc3QgZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldCh0eXBlKTtcbiAgICAgICAgICBpZiAoIWV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBwaW5uZWQgYnVmZmVyYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghKGFyZzAuZGF0YSBpbnN0YW5jZW9mIGV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgYnVmZmVyIHNob3VsZCBiZSBvZiB0eXBlICR7ZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IubmFtZX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jcHVEYXRhID0gYXJnMC5kYXRhO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHR1cmUnOiB7XG4gICAgICAgICAgaWYgKHR5cGUgIT09ICdmbG9hdDMyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gdGV4dHVyZWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gYXJnMC50ZXh0dXJlO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XG4gICAgICAgICAgdGhpcy5kaXNwb3NlciA9IGFyZzAuZGlzcG9zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdncHUtYnVmZmVyJzoge1xuICAgICAgICAgIGlmICgodHlwZSAhPT0gJ2Zsb2F0MzInICYmIHR5cGUgIT09ICdmbG9hdDE2JyAmJiB0eXBlICE9PSAnaW50MzInICYmIHR5cGUgIT09ICdpbnQ2NCcgJiYgdHlwZSAhPT0gJ3VpbnQzMicgJiZcbiAgICAgICAgICAgICAgIHR5cGUgIT09ICdib29sJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIGdwdSBidWZmZXJgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ncHVCdWZmZXJEYXRhID0gYXJnMC5ncHVCdWZmZXI7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUZW5zb3IgY29uc3RydWN0b3I6IHVuc3VwcG9ydGVkIGxvY2F0aW9uICcke3RoaXMuZGF0YUxvY2F0aW9ufSdgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3Igb2YgbG9jYXRpb24gJ2NwdSdcbiAgICAgIC8vXG4gICAgICBsZXQgZGF0YTogVGVuc29yRGF0YVR5cGU7XG4gICAgICBsZXQgbWF5YmVEaW1zOiB0eXBlb2YgYXJnMXx0eXBlb2YgYXJnMjtcbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgYXJnMCBpcyB0eXBlIG9yIGRhdGFcbiAgICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gT3ZlcnJpZGU6IGNvbnN0cnVjdG9yKHR5cGUsIGRhdGEsIC4uLilcbiAgICAgICAgLy9cbiAgICAgICAgdHlwZSA9IGFyZzA7XG4gICAgICAgIG1heWJlRGltcyA9IGFyZzI7XG4gICAgICAgIGlmIChhcmcwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIC8vIHN0cmluZyB0ZW5zb3JcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Egc3RyaW5nIHRlbnNvclxcJ3MgZGF0YSBtdXN0IGJlIGEgc3RyaW5nIGFycmF5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3ZSBkb24ndCBjaGVjayB3aGV0aGVyIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIGFycmF5IGlzIHN0cmluZzsgdGhpcyBpcyB0b28gc2xvdy4gd2UgYXNzdW1lIGl0J3MgY29ycmVjdCBhbmRcbiAgICAgICAgICAvLyBlcnJvciB3aWxsIGJlIHBvcHVsYXRlZCBhdCBpbmZlcmVuY2VcbiAgICAgICAgICBkYXRhID0gYXJnMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBudW1lcmljIHRlbnNvclxuICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuZ2V0KGFyZzApO1xuICAgICAgICAgIGlmICh0eXBlZEFycmF5Q29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5zdXBwb3J0ZWQgdGVuc29yIHR5cGU6ICR7YXJnMH0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgICAgICBpZiAoYXJnMCA9PT0gJ2Zsb2F0MTYnKSB7XG4gICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGhlcmUgYmVjYXVzZSB3aGVuIHVzZXIgdHJ5IHRvIHVzZSBudW1iZXIgYXJyYXkgYXMgZGF0YSxcbiAgICAgICAgICAgICAgLy8gZS5nLiBuZXcgVGVuc29yKCdmbG9hdDE2JywgWzEsIDIsIDMsIDRdLCBkaW1zKSksIGl0IHdpbGwgYWN0dWFsbHkgY2FsbFxuICAgICAgICAgICAgICAvLyBVaW50MTZBcnJheS5mcm9tKGFyZzEpIHdoaWNoIGdlbmVyYXRlcyB3cm9uZyBkYXRhLlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgICAgJ0NyZWF0aW5nIGEgZmxvYXQxNiB0ZW5zb3IgZnJvbSBudW1iZXIgYXJyYXkgaXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIHVzZSBVaW50MTZBcnJheSBhcyBkYXRhLicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmcwID09PSAndWludDY0JyB8fCBhcmcwID09PSAnaW50NjQnKSB7XG4gICAgICAgICAgICAgIC8vIHVzZSAnYXMgYW55JyBoZXJlIGJlY2F1c2U6XG4gICAgICAgICAgICAgIC8vIDEuIFR5cGVTY3JpcHQncyBjaGVjayBvbiB0eXBlIG9mICdBcnJheS5pc0FycmF5KCknIGRvZXMgbm90IHdvcmsgd2l0aCByZWFkb25seSBhcnJheXMuXG4gICAgICAgICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzE3MDAyXG4gICAgICAgICAgICAgIC8vIDIuIFR5cGVTY3JpcHQncyBjaGVjayBvbiB1bmlvbiB0eXBlIG9mICcoQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3IpLmZyb20oKSdcbiAgICAgICAgICAgICAgLy8gZG9lcyBub3QgYWNjZXB0IHBhcmFtZXRlciBtYXBGbi5cbiAgICAgICAgICAgICAgLy8gMy4gcGFyYW1ldGVycyBvZiAnU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycy5mcm9tKCknIGRvZXMgbm90IG1hdGNoIHRoZSByZXF1aXJlbWVudCBvZiB0aGUgdW5pb25cbiAgICAgICAgICAgICAgLy8gdHlwZS5cblxuICAgICAgICAgICAgICAvLyBhc3N1bWUgJ2FyZzEnIGlzIG9mIHR5cGUgXCJyZWFkb25seSBudW1iZXJbXXxyZWFkb25seSBiaWdpbnRbXVwiIGhlcmUuXG5cbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgZGF0YSA9ICh0eXBlZEFycmF5Q29uc3RydWN0b3IgYXMgYW55KS5mcm9tKGFyZzEsIEJpZ0ludCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBhc3N1bWUgJ2FyZzEnIGlzIG9mIHR5cGUgXCJyZWFkb25seSBudW1iZXJbXVwiIGhlcmUuXG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgIGRhdGEgPSAodHlwZWRBcnJheUNvbnN0cnVjdG9yIGFzIGFueSkuZnJvbShhcmcxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGFyZzEgaW5zdGFuY2VvZiB0eXBlZEFycmF5Q29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIGRhdGEgPSBhcmcxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBICR7dHlwZX0gdGVuc29yJ3MgZGF0YSBtdXN0IGJlIHR5cGUgb2YgJHt0eXBlZEFycmF5Q29uc3RydWN0b3J9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL1xuICAgICAgICAvLyBPdmVycmlkZTogY29uc3RydWN0b3IoZGF0YSwgLi4uKVxuICAgICAgICAvL1xuICAgICAgICBtYXliZURpbXMgPSBhcmcxO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcwKSkge1xuICAgICAgICAgIC8vIG9ubHkgYm9vbGVhbltdIGFuZCBzdHJpbmdbXSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICBpZiAoYXJnMC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RlbnNvciB0eXBlIGNhbm5vdCBiZSBpbmZlcnJlZCBmcm9tIGFuIGVtcHR5IGFycmF5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBmaXJzdEVsZW1lbnRUeXBlID0gdHlwZW9mIGFyZzBbMF07XG4gICAgICAgICAgaWYgKGZpcnN0RWxlbWVudFR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0eXBlID0gJ3N0cmluZyc7XG4gICAgICAgICAgICBkYXRhID0gYXJnMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0RWxlbWVudFR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdHlwZSA9ICdib29sJztcbiAgICAgICAgICAgIC8vICdhcmcwJyBpcyBvZiB0eXBlICdib29sZWFuW10nLiBVaW50OEFycmF5LmZyb20oYm9vbGVhbltdKSBhY3R1YWxseSB3b3JrcywgYnV0IHR5cGVzY3JpcHQgdGhpbmtzIHRoaXMgaXNcbiAgICAgICAgICAgIC8vIHdyb25nIHR5cGUuIFdlIHVzZSAnYXMgYW55JyB0byBtYWtlIGl0IGhhcHB5LlxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGRhdGEgPSBVaW50OEFycmF5LmZyb20oYXJnMCBhcyBhbnlbXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgZWxlbWVudCB0eXBlIG9mIGRhdGEgYXJyYXk6ICR7Zmlyc3RFbGVtZW50VHlwZX0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGdldCB0ZW5zb3IgdHlwZSBmcm9tIFR5cGVkQXJyYXlcbiAgICAgICAgICBjb25zdCBtYXBwZWRUeXBlID1cbiAgICAgICAgICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5nZXQoYXJnMC5jb25zdHJ1Y3RvciBhcyBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzKTtcbiAgICAgICAgICBpZiAobWFwcGVkVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0eXBlIGZvciB0ZW5zb3IgZGF0YTogJHthcmcwLmNvbnN0cnVjdG9yfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdHlwZSA9IG1hcHBlZFR5cGU7XG4gICAgICAgICAgZGF0YSA9IGFyZzAgYXMgU3VwcG9ydGVkVHlwZWRBcnJheTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0eXBlIGFuZCBkYXRhIGlzIHByb2Nlc3NlZCwgbm93IHByb2Nlc3NpbmcgZGltc1xuICAgICAgaWYgKG1heWJlRGltcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGFzc3VtZSAxLUQgdGVuc29yIGlmIGRpbXMgb21pdHRlZFxuICAgICAgICBtYXliZURpbXMgPSBbZGF0YS5sZW5ndGhdO1xuICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtYXliZURpbXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgdGVuc29yXFwncyBkaW1zIG11c3QgYmUgYSBudW1iZXIgYXJyYXknKTtcbiAgICAgIH1cbiAgICAgIGRpbXMgPSBtYXliZURpbXMgYXMgcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgIH1cblxuICAgIC8vIHBlcmZvcm0gY2hlY2sgb24gZGltc1xuICAgIGNvbnN0IHNpemUgPSBjYWxjdWxhdGVTaXplKGRpbXMpO1xuICAgIC8vIGlmIGRhdGEgaXMgb24gQ1BVLCBjaGVjayB3aGV0aGVyIGRhdGEgbGVuZ3RoIG1hdGNoZXMgdGVuc29yIHNpemVcbiAgICBpZiAodGhpcy5jcHVEYXRhICYmIHNpemUgIT09IHRoaXMuY3B1RGF0YS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yJ3Mgc2l6ZSgke3NpemV9KSBkb2VzIG5vdCBtYXRjaCBkYXRhIGxlbmd0aCgke3RoaXMuY3B1RGF0YS5sZW5ndGh9KS5gKTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZGltcyA9IGRpbXM7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBmYWN0b3J5XG4gIHN0YXRpYyBhc3luYyBmcm9tSW1hZ2UoXG4gICAgICBpbWFnZTogSW1hZ2VEYXRhfEhUTUxJbWFnZUVsZW1lbnR8SW1hZ2VCaXRtYXB8c3RyaW5nLFxuICAgICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zfFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zfFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnN8XG4gICAgICBUZW5zb3JGcm9tVXJsT3B0aW9ucyk6IFByb21pc2U8VGVuc29ySW50ZXJmYWNlPiB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21JbWFnZShpbWFnZSwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRleHR1cmU8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5UZXh0dXJlRGF0YVR5cGVzPihcbiAgICAgIHRleHR1cmU6IFRlbnNvclRleHR1cmVUeXBlLCBvcHRpb25zOiBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VD4pOiBUZW5zb3JJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0ZW5zb3JGcm9tVGV4dHVyZSh0ZXh0dXJlLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tR3B1QnVmZmVyPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyRGF0YVR5cGVzPihcbiAgICAgIGdwdUJ1ZmZlcjogVGVuc29yR3B1QnVmZmVyVHlwZSwgb3B0aW9uczogVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VD4pOiBUZW5zb3JJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0ZW5zb3JGcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVBpbm5lZEJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkNwdVBpbm5lZERhdGFUeXBlcz4oXG4gICAgICB0eXBlOiBULCBidWZmZXI6IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZU1hcFtUXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbVBpbm5lZEJ1ZmZlcih0eXBlLCBidWZmZXIsIGRpbXMpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gY29udmVyc2lvbnNcbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGVuc29yVG9EYXRhVVJMKHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YSB7XG4gICAgcmV0dXJuIHRlbnNvclRvSW1hZ2VEYXRhKHRoaXMsIG9wdGlvbnMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHB1YmxpYyBmaWVsZHNcbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG4gIHJlYWRvbmx5IHR5cGU6IFRlbnNvclR5cGU7XG4gIHJlYWRvbmx5IHNpemU6IG51bWJlcjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHJpdmF0ZSBmaWVsZHNcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgZGF0YUxvY2F0aW9uOiBUZW5zb3JEYXRhTG9jYXRpb247XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgZGF0YSBvbiBDUFUsIGlmIGxvY2F0aW9uIGlzICdjcHUnIG9yICdjcHUtcGlubmVkJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBjcHVEYXRhPzogVGVuc29yRGF0YVR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyB0ZXh0dXJlIHdoZW4gbG9jYXRpb24gaXMgJ3RleHR1cmUnLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGdwdVRleHR1cmVEYXRhPzogVGVuc29yVGV4dHVyZVR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyBHUFUgYnVmZmVyIHdoZW4gbG9jYXRpb24gaXMgJ2dwdS1idWZmZXInLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGdwdUJ1ZmZlckRhdGE/OiBUZW5zb3JHcHVCdWZmZXJUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgYW4gb3B0aW9uYWwgZG93bmxvYWRlciBmdW5jdGlvbiB0byBkb3dubG9hZCBkYXRhIGZyb20gR1BVIHRvIENQVS5cbiAgICovXG4gIHByaXZhdGUgZG93bmxvYWRlcj8oKTogUHJvbWlzZTxUZW5zb3JEYXRhVHlwZT47XG5cbiAgLyoqXG4gICAqIGEgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGRhdGEgaXMgYmVpbmcgZG93bmxvYWRlZCBmcm9tIEdQVSB0byBDUFUuXG4gICAqL1xuICBwcml2YXRlIGlzRG93bmxvYWRpbmc/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgYW4gb3B0aW9uYWwgZGlzcG9zZXIgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdW5kZXJseWluZyBkYXRhLlxuICAgKi9cbiAgcHJpdmF0ZSBkaXNwb3Nlcj8oKTogdm9pZDtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHJvcGVydGllc1xuICBnZXQgZGF0YSgpOiBUZW5zb3JEYXRhVHlwZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICghdGhpcy5jcHVEYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1RoZSBkYXRhIGlzIG5vdCBvbiBDUFUuIFVzZSBgZ2V0RGF0YSgpYCB0byBkb3dubG9hZCBHUFUgZGF0YSB0byBDUFUsICcgK1xuICAgICAgICAgICdvciB1c2UgYHRleHR1cmVgIG9yIGBncHVCdWZmZXJgIHByb3BlcnR5IHRvIGFjY2VzcyB0aGUgR1BVIGRhdGEgZGlyZWN0bHkuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNwdURhdGE7XG4gIH1cblxuICBnZXQgbG9jYXRpb24oKTogVGVuc29yRGF0YUxvY2F0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhTG9jYXRpb247XG4gIH1cblxuICBnZXQgdGV4dHVyZSgpOiBUZW5zb3JUZXh0dXJlVHlwZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICghdGhpcy5ncHVUZXh0dXJlRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR0wgdGV4dHVyZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1VGV4dHVyZURhdGE7XG4gIH1cblxuICBnZXQgZ3B1QnVmZmVyKCk6IFRlbnNvckdwdUJ1ZmZlclR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuZ3B1QnVmZmVyRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR1BVIGJ1ZmZlci4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1QnVmZmVyRGF0YTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBtZXRob2RzXG5cbiAgYXN5bmMgZ2V0RGF0YShyZWxlYXNlRGF0YT86IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPiB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIHN3aXRjaCAodGhpcy5kYXRhTG9jYXRpb24pIHtcbiAgICAgIGNhc2UgJ2NwdSc6XG4gICAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICAgIGNhc2UgJ3RleHR1cmUnOlxuICAgICAgY2FzZSAnZ3B1LWJ1ZmZlcic6IHtcbiAgICAgICAgaWYgKCF0aGlzLmRvd25sb2FkZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBub3QgY3JlYXRlZCB3aXRoIGEgc3BlY2lmaWVkIGRhdGEgZG93bmxvYWRlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgYmVpbmcgZG93bmxvYWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZG93bmxvYWRlcigpO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgICAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG5cbiAgICAgICAgICBpZiAocmVsZWFzZURhdGEgJiYgdGhpcy5kaXNwb3Nlcikge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlcigpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZGF0YTtcblxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBnZXQgZGF0YSBmcm9tIGxvY2F0aW9uOiAke3RoaXMuZGF0YUxvY2F0aW9ufWApO1xuICAgIH1cbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNEb3dubG9hZGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgYmVpbmcgZG93bmxvYWRlZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaXNwb3Nlcikge1xuICAgICAgdGhpcy5kaXNwb3NlcigpO1xuICAgICAgdGhpcy5kaXNwb3NlciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5jcHVEYXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZ3B1VGV4dHVyZURhdGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5ncHVCdWZmZXJEYXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdub25lJztcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHRlbnNvciB1dGlsaXRpZXNcbiAgcHJpdmF0ZSBlbnN1cmVWYWxpZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhTG9jYXRpb24gPT09ICdub25lJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdGVuc29yIGlzIGRpc3Bvc2VkLicpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2hhcGUoZGltczogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3JJbnRlcmZhY2Uge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAodGhpcy5kb3dubG9hZGVyIHx8IHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJlc2hhcGUgYSB0ZW5zb3IgdGhhdCBvd25zIEdQVSByZXNvdXJjZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbnNvclJlc2hhcGUodGhpcywgZGltcyk7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge1RlbnNvckZhY3Rvcnl9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHtUZW5zb3IgYXMgVGVuc29ySW1wbH0gZnJvbSAnLi90ZW5zb3ItaW1wbC5qcyc7XG5pbXBvcnQge1R5cGVkVGVuc29yVXRpbHN9IGZyb20gJy4vdGVuc29yLXV0aWxzLmpzJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlZGVjbGFyZSAqL1xuXG4vKipcbiAqIHJlcHJlc2VudCBhIGJhc2ljIHRlbnNvciB3aXRoIHNwZWNpZmllZCBkaW1lbnNpb25zIGFuZCBkYXRhIHR5cGUuXG4gKi9cbmludGVyZmFjZSBUeXBlZFRlbnNvckJhc2U8VCBleHRlbmRzIFRlbnNvci5UeXBlPiB7XG4gIC8qKlxuICAgKiBHZXQgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIHJlYWRvbmx5IGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xuICAvKipcbiAgICogR2V0IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIHJlYWRvbmx5IHR5cGU6IFQ7XG4gIC8qKlxuICAgKiBHZXQgdGhlIGJ1ZmZlciBkYXRhIG9mIHRoZSB0ZW5zb3IuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBvbiBDUFUgKGVnLiBpdCdzIGluIHRoZSBmb3JtIG9mIFdlYkdMIHRleHR1cmUgb3IgV2ViR1BVIGJ1ZmZlciksIHRocm93IGVycm9yLlxuICAgKi9cbiAgcmVhZG9ubHkgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdO1xuICAvKipcbiAgICogR2V0IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YS5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiBUZW5zb3IuRGF0YUxvY2F0aW9uO1xuICAvKipcbiAgICogR2V0IHRoZSBXZWJHTCB0ZXh0dXJlIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gR1BVIGFzIFdlYkdMIHRleHR1cmUsIHRocm93IGVycm9yLlxuICAgKi9cbiAgcmVhZG9ubHkgdGV4dHVyZTogVGVuc29yLlRleHR1cmVUeXBlO1xuICAvKipcbiAgICogR2V0IHRoZSBXZWJHUFUgYnVmZmVyIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gR1BVIGFzIFdlYkdQVSBidWZmZXIsIHRocm93IGVycm9yLlxuICAgKi9cbiAgcmVhZG9ubHkgZ3B1QnVmZmVyOiBUZW5zb3IuR3B1QnVmZmVyVHlwZTtcblxuICAvKipcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBDUFUsIHJldHVybnMgdGhlIGRhdGEgaW1tZWRpYXRlbHkuXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIEdQVSwgZG93bmxvYWRzIHRoZSBkYXRhIGFuZCByZXR1cm5zIHRoZSBwcm9taXNlLlxuICAgKlxuICAgKiBAcGFyYW0gcmVsZWFzZURhdGEgLSB3aGV0aGVyIHJlbGVhc2UgdGhlIGRhdGEgb24gR1BVLiBJZ25vcmUgaWYgZGF0YSBpcyBhbHJlYWR5IG9uIENQVS5cbiAgICovXG4gIGdldERhdGEocmVsZWFzZURhdGE/OiBib29sZWFuKTogUHJvbWlzZTxUZW5zb3IuRGF0YVR5cGVNYXBbVF0+O1xuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgb24gQ1BVLCByZW1vdmUgaXRzIGludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgdW5kZXJseWluZyBkYXRhLlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBHUFUsIHJlbGVhc2UgdGhlIGRhdGEgb24gR1BVLlxuICAgKlxuICAgKiBBZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24sIHRoZSB0ZW5zb3IgaXMgY29uc2lkZXJlZCBubyBsb25nZXIgdmFsaWQuIEl0cyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnbm9uZScuXG4gICAqL1xuICBkaXNwb3NlKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBUZW5zb3Ige1xuICBpbnRlcmZhY2UgRGF0YVR5cGVNYXAge1xuICAgIGZsb2F0MzI6IEZsb2F0MzJBcnJheTtcbiAgICB1aW50ODogVWludDhBcnJheTtcbiAgICBpbnQ4OiBJbnQ4QXJyYXk7XG4gICAgdWludDE2OiBVaW50MTZBcnJheTtcbiAgICBpbnQxNjogSW50MTZBcnJheTtcbiAgICBpbnQzMjogSW50MzJBcnJheTtcbiAgICBpbnQ2NDogQmlnSW50NjRBcnJheTtcbiAgICBzdHJpbmc6IHN0cmluZ1tdO1xuICAgIGJvb2w6IFVpbnQ4QXJyYXk7XG4gICAgZmxvYXQxNjogVWludDE2QXJyYXk7ICAvLyBLZWVwIHVzaW5nIFVpbnQxNkFycmF5IHVudGlsIHdlIGhhdmUgYSBjb25jcmV0ZSBzb2x1dGlvbiBmb3IgZmxvYXQgMTYuXG4gICAgZmxvYXQ2NDogRmxvYXQ2NEFycmF5O1xuICAgIHVpbnQzMjogVWludDMyQXJyYXk7XG4gICAgdWludDY0OiBCaWdVaW50NjRBcnJheTtcbiAgICAvLyBjb21wbGV4NjQ6IG5ldmVyO1xuICAgIC8vIGNvbXBsZXgxMjg6IG5ldmVyO1xuICAgIC8vIGJmbG9hdDE2OiBuZXZlcjtcbiAgfVxuXG4gIGludGVyZmFjZSBFbGVtZW50VHlwZU1hcCB7XG4gICAgZmxvYXQzMjogbnVtYmVyO1xuICAgIHVpbnQ4OiBudW1iZXI7XG4gICAgaW50ODogbnVtYmVyO1xuICAgIHVpbnQxNjogbnVtYmVyO1xuICAgIGludDE2OiBudW1iZXI7XG4gICAgaW50MzI6IG51bWJlcjtcbiAgICBpbnQ2NDogYmlnaW50O1xuICAgIHN0cmluZzogc3RyaW5nO1xuICAgIGJvb2w6IGJvb2xlYW47XG4gICAgZmxvYXQxNjogbnVtYmVyOyAgLy8gS2VlcCB1c2luZyBVaW50MTZBcnJheSB1bnRpbCB3ZSBoYXZlIGEgY29uY3JldGUgc29sdXRpb24gZm9yIGZsb2F0IDE2LlxuICAgIGZsb2F0NjQ6IG51bWJlcjtcbiAgICB1aW50MzI6IG51bWJlcjtcbiAgICB1aW50NjQ6IGJpZ2ludDtcbiAgICAvLyBjb21wbGV4NjQ6IG5ldmVyO1xuICAgIC8vIGNvbXBsZXgxMjg6IG5ldmVyO1xuICAgIC8vIGJmbG9hdDE2OiBuZXZlcjtcbiAgfVxuXG4gIHR5cGUgRGF0YVR5cGUgPSBEYXRhVHlwZU1hcFtUeXBlXTtcbiAgdHlwZSBFbGVtZW50VHlwZSA9IEVsZW1lbnRUeXBlTWFwW1R5cGVdO1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBwaW5uZWQgQ1BVIGJ1ZmZlclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgQ3B1UGlubmVkRGF0YVR5cGVzID0gRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZyc+O1xuXG4gIC8qKlxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJHTCB0ZXh0dXJlXG4gICAqL1xuICBleHBvcnQgdHlwZSBUZXh0dXJlVHlwZSA9IFdlYkdMVGV4dHVyZTtcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViR0wgdGV4dHVyZVxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVGV4dHVyZURhdGFUeXBlcyA9ICdmbG9hdDMyJztcblxuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR1BVIGJ1ZmZlclxuICAgKlxuICAgKiBUaGUgcmVhc29uIHdoeSB3ZSBkb24ndCB1c2UgdHlwZSBcIkdQVUJ1ZmZlclwiIGRlZmluZWQgaW4gd2ViZ3B1LmQudHMgZnJvbSBAd2ViZ3B1L3R5cGVzIGlzIGJlY2F1c2UgXCJAd2ViZ3B1L3R5cGVzXCJcbiAgICogcmVxdWlyZXMgXCJAdHlwZXMvZG9tLXdlYmNvZGVjc1wiIGFzIHBlZXIgZGVwZW5kZW5jeSB3aGVuIHVzaW5nIFR5cGVTY3JpcHQgPCB2NS4xIGFuZCBpdHMgdmVyc2lvbiBuZWVkIHRvIGJlIGNob3NlblxuICAgKiBjYXJlZnVsbHkgYWNjb3JkaW5nIHRvIHRoZSBUeXBlU2NyaXB0IHZlcnNpb24gYmVpbmcgdXNlZC4gVGhpcyBtZWFucyBzbyBmYXIgdGhlcmUgaXMgbm90IGEgd2F5IHRvIGtlZXAgZXZlcnlcbiAgICogVHlwZVNjcmlwdCB2ZXJzaW9uIGhhcHB5LiBJdCB0dXJucyBvdXQgdGhhdCB3ZSB3aWxsIGVhc2lseSBicm9rZSB1c2VycyBvbiBzb21lIFR5cGVTY3JpcHQgdmVyc2lvbi5cbiAgICpcbiAgICogZm9yIG1vcmUgaW5mbyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2dwdXdlYi90eXBlcy9pc3N1ZXMvMTI3XG4gICAqL1xuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJUeXBlID0ge3NpemU6IG51bWJlcjsgbWFwU3RhdGU6ICd1bm1hcHBlZCcgfCAncGVuZGluZycgfCAnbWFwcGVkJ307XG5cbiAgLyoqXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcbiAgICovXG4gIGV4cG9ydCB0eXBlIEdwdUJ1ZmZlckRhdGFUeXBlcyA9ICdmbG9hdDMyJ3wnZmxvYXQxNid8J2ludDMyJ3wnaW50NjQnfCd1aW50MzInfCdib29sJztcblxuICAvKipcbiAgICogcmVwcmVzZW50IHdoZXJlIHRoZSB0ZW5zb3IgZGF0YSBpcyBzdG9yZWRcbiAgICovXG4gIGV4cG9ydCB0eXBlIERhdGFMb2NhdGlvbiA9ICdub25lJ3wnY3B1J3wnY3B1LXBpbm5lZCd8J3RleHR1cmUnfCdncHUtYnVmZmVyJztcblxuICAvKipcbiAgICogcmVwcmVzZW50IHRoZSBkYXRhIHR5cGUgb2YgYSB0ZW5zb3JcbiAgICovXG4gIGV4cG9ydCB0eXBlIFR5cGUgPSBrZXlvZiBEYXRhVHlwZU1hcDtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgbXVsdGktZGltZW5zaW9uYWwgYXJyYXlzIHRvIGZlZWQgdG8gb3IgZmV0Y2ggZnJvbSBtb2RlbCBpbmZlcmVuY2luZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUeXBlZFRlbnNvcjxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IGV4dGVuZHMgVHlwZWRUZW5zb3JCYXNlPFQ+LCBUeXBlZFRlbnNvclV0aWxzPFQ+IHt9XG4vKipcbiAqIFJlcHJlc2VudCBtdWx0aS1kaW1lbnNpb25hbCBhcnJheXMgdG8gZmVlZCB0byBvciBmZXRjaCBmcm9tIG1vZGVsIGluZmVyZW5jaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvciBleHRlbmRzIFR5cGVkVGVuc29yQmFzZTxUZW5zb3IuVHlwZT4sIFR5cGVkVGVuc29yVXRpbHM8VGVuc29yLlR5cGU+IHt9XG5cbi8qKlxuICogdHlwZSBUZW5zb3JDb25zdHJ1Y3RvciBkZWZpbmVzIHRoZSBjb25zdHJ1Y3RvcnMgb2YgJ1RlbnNvcicgdG8gY3JlYXRlIENQVSB0ZW5zb3IgaW5zdGFuY2VzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckNvbnN0cnVjdG9yIHtcbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gc3BlY2lmeSBlbGVtZW50IHR5cGVcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KHR5cGU6ICdzdHJpbmcnLCBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ3N0cmluZyddfHJlYWRvbmx5IHN0cmluZ1tdLFxuICAgICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3N0cmluZyc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgYm9vbCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcodHlwZTogJ2Jvb2wnLCBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ2Jvb2wnXXxyZWFkb25seSBib29sZWFuW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdib29sJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyA2NC1iaXQgaW50ZWdlciB0eXBlZCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXc8VCBleHRlbmRzICd1aW50NjQnfCdpbnQ2NCc+KFxuICAgICAgdHlwZTogVCwgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdfHJlYWRvbmx5IGJpZ2ludFtdfHJlYWRvbmx5IG51bWJlcltdLFxuICAgICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8VD47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBudW1lcmljIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldzxUIGV4dGVuZHMgRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZyd8J2Jvb2wnfCd1aW50NjQnfCdpbnQ2NCc+PihcbiAgICAgIHR5cGU6IFQsIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXXxyZWFkb25seSBudW1iZXJbXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8VD47XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIENQVSB0ZW5zb3IgLSBpbmZlciBlbGVtZW50IHR5cGVzXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBmbG9hdDMyIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEZsb2F0MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogSW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50OCc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogVWludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MTYgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogVWludDE2QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50MTYnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDE2IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEludDE2QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdpbnQxNic+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW50MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogSW50MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBCaWdJbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50NjQnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHN0cmluZyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiByZWFkb25seSBzdHJpbmdbXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3N0cmluZyc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgYm9vbCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiByZWFkb25seSBib29sZWFuW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdib29sJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBmbG9hdDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEZsb2F0NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0NjQnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBVaW50MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQzMic+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEJpZ1VpbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDY0Jz47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGZhbGwgYmFjayB0byBub24tZ2VuZXJpYyB0ZW5zb3IgdHlwZSBkZWNsYXJhdGlvblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KHR5cGU6IFRlbnNvci5UeXBlLCBkYXRhOiBUZW5zb3IuRGF0YVR5cGV8cmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYmlnaW50W118cmVhZG9ubHkgYm9vbGVhbltdLFxuICAgICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogVGVuc29yLkRhdGFUeXBlLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3I7XG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IFRlbnNvciA9IFRlbnNvckltcGwgYXMgKFRlbnNvckNvbnN0cnVjdG9yICYgVGVuc29yRmFjdG9yeSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7cmVzb2x2ZUJhY2tlbmR9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXJ9IGZyb20gJy4vYmFja2VuZC5qcyc7XG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZX0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbnR5cGUgU2Vzc2lvbk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlNlc3Npb25PcHRpb25zO1xudHlwZSBSdW5PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5SdW5PcHRpb25zO1xudHlwZSBGZWVkc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLkZlZWRzVHlwZTtcbnR5cGUgRmV0Y2hlc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLkZldGNoZXNUeXBlO1xudHlwZSBSZXR1cm5UeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5SZXR1cm5UeXBlO1xuXG5leHBvcnQgY2xhc3MgSW5mZXJlbmNlU2Vzc2lvbiBpbXBsZW1lbnRzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2Uge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKGhhbmRsZXI6IEluZmVyZW5jZVNlc3Npb25IYW5kbGVyKSB7XG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgfVxuICBydW4oZmVlZHM6IEZlZWRzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBydW4oZmVlZHM6IEZlZWRzVHlwZSwgZmV0Y2hlczogRmV0Y2hlc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgYXN5bmMgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xuICAgIGNvbnN0IGZldGNoZXM6IHtbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfG51bGx9ID0ge307XG4gICAgbGV0IG9wdGlvbnM6IFJ1bk9wdGlvbnMgPSB7fTtcbiAgICAvLyBjaGVjayBpbnB1dHNcbiAgICBpZiAodHlwZW9mIGZlZWRzICE9PSAnb2JqZWN0JyB8fCBmZWVkcyA9PT0gbnVsbCB8fCBmZWVkcyBpbnN0YW5jZW9mIFRlbnNvciB8fCBBcnJheS5pc0FycmF5KGZlZWRzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAnXFwnZmVlZHNcXCcgbXVzdCBiZSBhbiBvYmplY3QgdGhhdCB1c2UgaW5wdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLicpO1xuICAgIH1cblxuICAgIGxldCBpc0ZldGNoZXNFbXB0eSA9IHRydWU7XG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG92ZXJyaWRlIGlzIGJlaW5nIHVzZWRcbiAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoYXJnMSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChhcmcxIGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2ZldGNoZXNcXCcgY2Fubm90IGJlIGEgVGVuc29yJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgIGlmIChhcmcxLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2ZldGNoZXNcXCcgY2Fubm90IGJlIGFuIGVtcHR5IGFycmF5LicpO1xuICAgICAgICB9XG4gICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgIC8vIG91dHB1dCBuYW1lc1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgYXJnMSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2ZldGNoZXNcXCcgbXVzdCBiZSBhIHN0cmluZyBhcnJheSBvciBhbiBvYmplY3QuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLm91dHB1dE5hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2ZldGNoZXMnIGNvbnRhaW5zIGludmFsaWQgb3V0cHV0IG5hbWU6ICR7bmFtZX0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVjaWRlIHdoZXRoZXIgYXJnMSBpcyBmZXRjaGVzIG9yIG9wdGlvbnNcbiAgICAgICAgLy8gaWYgYW55IG91dHB1dCBuYW1lIGlzIHByZXNlbnQgYW5kIGl0cyB2YWx1ZSBpcyB2YWxpZCBPbm54VmFsdWUsIHdlIGNvbnNpZGVyIGl0IGZldGNoZXNcbiAgICAgICAgbGV0IGlzRmV0Y2hlcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBhcmcxS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZzEpO1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xuICAgICAgICAgIGlmIChhcmcxS2V5cy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdiA9IChhcmcxIGFzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlKVtuYW1lXTtcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsIHx8IHYgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRmV0Y2hlcykge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMgPSBhcmcxIGFzIFJ1bk9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5leHBlY3RlZCBhcmd1bWVudFsxXTogbXVzdCBiZSBcXCdmZXRjaGVzXFwnIG9yIFxcJ29wdGlvbnNcXCcuJyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgYWxsIGlucHV0cyBhcmUgaW4gZmVlZFxuICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLmlucHV0TmFtZXMpIHtcbiAgICAgIGlmICh0eXBlb2YgZmVlZHNbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW5wdXQgJyR7bmFtZX0nIGlzIG1pc3NpbmcgaW4gJ2ZlZWRzJy5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBubyBmZXRjaGVzIGlzIHNwZWNpZmllZCwgd2UgdXNlIHRoZSBmdWxsIG91dHB1dCBuYW1lcyBsaXN0XG4gICAgaWYgKGlzRmV0Y2hlc0VtcHR5KSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xuICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmZWVkcywgZmV0Y2hlcyBhbmQgb3B0aW9ucyBhcmUgcHJlcGFyZWRcblxuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmhhbmRsZXIucnVuKGZlZWRzLCBmZXRjaGVzLCBvcHRpb25zKTtcbiAgICBjb25zdCByZXR1cm5WYWx1ZToge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV9ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmVzdWx0cykge1xuICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdHMsIGtleSkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1trZXldO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gbmV3IFRlbnNvcihyZXN1bHQudHlwZSwgcmVzdWx0LmRhdGEsIHJlc3VsdC5kaW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICBhc3luYyByZWxlYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aD86IG51bWJlciwgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBVaW50OEFycmF5LCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgYXN5bmMgY3JlYXRlKFxuICAgICAgYXJnMDogc3RyaW5nfEFycmF5QnVmZmVyTGlrZXxVaW50OEFycmF5LCBhcmcxPzogU2Vzc2lvbk9wdGlvbnN8bnVtYmVyLCBhcmcyPzogbnVtYmVyLFxuICAgICAgYXJnMz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPiB7XG4gICAgLy8gZWl0aGVyIGxvYWQgZnJvbSBhIGZpbGUgb3IgYnVmZmVyXG4gICAgbGV0IGZpbGVQYXRoT3JVaW50OEFycmF5OiBzdHJpbmd8VWludDhBcnJheTtcbiAgICBsZXQgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMgPSB7fTtcblxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhcmcwIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgZmlsZVBhdGhPclVpbnQ4QXJyYXkgPSBhcmcwO1xuICAgICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0JyAmJiBhcmcxICE9PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmcxO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICBhcmcwIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcbiAgICAgICAgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgYXJnMCBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyKSkge1xuICAgICAgY29uc3QgYnVmZmVyID0gYXJnMDtcbiAgICAgIGxldCBieXRlT2Zmc2V0ID0gMDtcbiAgICAgIGxldCBieXRlTGVuZ3RoID0gYXJnMC5ieXRlTGVuZ3RoO1xuICAgICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0JyAmJiBhcmcxICE9PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmcxO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgYnl0ZU9mZnNldCA9IGFyZzE7XG4gICAgICAgIGlmICghTnVtYmVyLmlzU2FmZUludGVnZXIoYnl0ZU9mZnNldCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnYnl0ZU9mZnNldFxcJyBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2J5dGVPZmZzZXQnIGlzIG91dCBvZiByYW5nZSBbMCwgJHtidWZmZXIuYnl0ZUxlbmd0aH0pLmApO1xuICAgICAgICB9XG4gICAgICAgIGJ5dGVMZW5ndGggPSBhcmcwLmJ5dGVMZW5ndGggLSBieXRlT2Zmc2V0O1xuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgYnl0ZUxlbmd0aCA9IGFyZzI7XG4gICAgICAgICAgaWYgKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihieXRlTGVuZ3RoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2J5dGVMZW5ndGhcXCcgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYnl0ZUxlbmd0aCA8PSAwIHx8IGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoID4gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZUxlbmd0aCcgaXMgb3V0IG9mIHJhbmdlICgwLCAke2J1ZmZlci5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldH1dLmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzMgPT09ICdvYmplY3QnICYmIGFyZzMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmczO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdieXRlTGVuZ3RoXFwnIG11c3QgYmUgYSBudW1iZXIuJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICB9XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMF06IG11c3QgYmUgXFwncGF0aFxcJyBvciBcXCdidWZmZXJcXCcuJyk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGJhY2tlbmQgaGludHNcbiAgICBjb25zdCBlcHMgPSBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyB8fCBbXTtcbiAgICBjb25zdCBiYWNrZW5kSGludHMgPSBlcHMubWFwKGkgPT4gdHlwZW9mIGkgPT09ICdzdHJpbmcnID8gaSA6IGkubmFtZSk7XG4gICAgY29uc3QgYmFja2VuZCA9IGF3YWl0IHJlc29sdmVCYWNrZW5kKGJhY2tlbmRIaW50cyk7XG4gICAgY29uc3QgaGFuZGxlciA9IGF3YWl0IGJhY2tlbmQuY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoZmlsZVBhdGhPclVpbnQ4QXJyYXksIG9wdGlvbnMpO1xuICAgIHJldHVybiBuZXcgSW5mZXJlbmNlU2Vzc2lvbihoYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlci5zdGFydFByb2ZpbGluZygpO1xuICB9XG4gIGVuZFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZXIuZW5kUHJvZmlsaW5nKCk7XG4gIH1cblxuICBnZXQgaW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE5hbWVzO1xuICB9XG4gIGdldCBvdXRwdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5vdXRwdXROYW1lcztcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlcjogSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW1wbH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLmpzJztcbmltcG9ydCB7T25ueFZhbHVlLCBPbm54VmFsdWVEYXRhTG9jYXRpb259IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIEluZmVyZW5jZVNlc3Npb24ge1xuICAvLyAjcmVnaW9uIGlucHV0L291dHB1dCB0eXBlc1xuXG4gIHR5cGUgT25ueFZhbHVlTWFwVHlwZSA9IHtyZWFkb25seSBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfTtcbiAgdHlwZSBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUgPSB7cmVhZG9ubHkgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGx9O1xuXG4gIC8qKlxuICAgKiBBIGZlZWRzIChtb2RlbCBpbnB1dHMpIGlzIGFuIG9iamVjdCB0aGF0IHVzZXMgaW5wdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgdHlwZSBGZWVkc1R5cGUgPSBPbm54VmFsdWVNYXBUeXBlO1xuXG4gIC8qKlxuICAgKiBBIGZldGNoZXMgKG1vZGVsIG91dHB1dHMpIGNvdWxkIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgKlxuICAgKiAtIE9taXR0ZWQuIFVzZSBtb2RlbCdzIG91dHB1dCBuYW1lcyBkZWZpbml0aW9uLlxuICAgKiAtIEFuIGFycmF5IG9mIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBvdXRwdXQgbmFtZXMuXG4gICAqIC0gQW4gb2JqZWN0IHRoYXQgdXNlIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgb3IgbnVsbCBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICpcbiAgICogQHJlbWFya1xuICAgKiBkaWZmZXJlbnQgZnJvbSBpbnB1dCBhcmd1bWVudCwgaW4gb3V0cHV0LCBPbm54VmFsdWUgaXMgb3B0aW9uYWwuIElmIGFuIE9ubnhWYWx1ZSBpcyBwcmVzZW50IGl0IHdpbGwgYmVcbiAgICogdXNlZCBhcyBhIHByZS1hbGxvY2F0ZWQgdmFsdWUgYnkgdGhlIGluZmVyZW5jZSBlbmdpbmU7IGlmIG9taXR0ZWQsIGluZmVyZW5jZSBlbmdpbmUgd2lsbCBhbGxvY2F0ZSBidWZmZXJcbiAgICogaW50ZXJuYWxseS5cbiAgICovXG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSByZWFkb25seSBzdHJpbmdbXXxOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLyoqXG4gICAqIEEgaW5mZXJlbmNpbmcgcmV0dXJuIHR5cGUgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgdHlwZSBSZXR1cm5UeXBlID0gT25ueFZhbHVlTWFwVHlwZTtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBzZXNzaW9uIG9wdGlvbnNcblxuICAvKipcbiAgICogQSBzZXQgb2YgY29uZmlndXJhdGlvbnMgZm9yIHNlc3Npb24gYmVoYXZpb3IuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEFuIGV4ZWN1dGlvbiBwcm92aWRlciBvcHRpb24gY2FuIGJlIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIGV4ZWN1dGlvbiBwcm92aWRlcixcbiAgICAgKiBvciBhbiBvYmplY3Qgb2YgY29ycmVzcG9uZGluZyB0eXBlLlxuICAgICAqL1xuICAgIGV4ZWN1dGlvblByb3ZpZGVycz86IHJlYWRvbmx5IEV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50cmEgT1AgdGhyZWFkcyBudW1iZXIuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICBpbnRyYU9wTnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlciBPUCB0aHJlYWRzIG51bWJlci5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIGludGVyT3BOdW1UaHJlYWRzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGZyZWVEaW1lbnNpb25PdmVycmlkZXM/OiB7cmVhZG9ubHkgW2RpbWVuc2lvbk5hbWU6IHN0cmluZ106IG51bWJlcn07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3B0aW1pemF0aW9uIGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw/OiAnZGlzYWJsZWQnfCdiYXNpYyd8J2V4dGVuZGVkJ3wnYWxsJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIENQVSBtZW1vcnkgYXJlbmEuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlQ3B1TWVtQXJlbmE/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBlbmFibGUgbWVtb3J5IHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlTWVtUGF0dGVybj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBleGVjdXRpb25Nb2RlPzogJ3NlcXVlbnRpYWwnfCdwYXJhbGxlbCc7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpbWl6ZWQgbW9kZWwgZmlsZSBwYXRoLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBzZXR0aW5nIGlzIHNwZWNpZmllZCwgdGhlIG9wdGltaXplZCBtb2RlbCB3aWxsIGJlIGR1bXBlZC4gSW4gYnJvd3NlciwgYSBibG9iIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIHdpdGggYSBwb3AtdXAgd2luZG93LlxuICAgICAqL1xuICAgIG9wdGltaXplZE1vZGVsRmlsZVBhdGg/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXZXRoZXIgZW5hYmxlIHByb2ZpbGluZy5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIGZ1dHVyZSB1c2UuXG4gICAgICovXG4gICAgZW5hYmxlUHJvZmlsaW5nPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEZpbGUgcHJlZml4IGZvciBwcm9maWxpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYSBwbGFjZWhvbGRlciBmb3IgYSBmdXR1cmUgdXNlLlxuICAgICAqL1xuICAgIHByb2ZpbGVGaWxlUHJlZml4Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIElELlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ0lkPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIHNldmVyaXR5IGxldmVsLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwfDF8MnwzfDQ7XG5cbiAgICAvKipcbiAgICAgKiBMb2cgdmVyYm9zaXR5IGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqL1xuICAgIGxvZ1ZlcmJvc2l0eUxldmVsPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBzdHJpbmcgYXMgYSBwcmVmZXJyZWQgZGF0YSBsb2NhdGlvbiBmb3IgYWxsIG91dHB1dHMsIG9yIGFuIG9iamVjdCB0aGF0IHVzZSBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgYVxuICAgICAqIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIFdlYiBmb3IgV2ViR0wgYW5kIFdlYkdQVSBFUC5cbiAgICAgKi9cbiAgICBwcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj86IE9ubnhWYWx1ZURhdGFMb2NhdGlvbnx7cmVhZG9ubHkgW291dHB1dE5hbWU6IHN0cmluZ106IE9ubnhWYWx1ZURhdGFMb2NhdGlvbn07XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBjb25maWd1cmF0aW9ucyBmb3IgYSBzZXNzaW9uLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvc2Vzc2lvbi9cbiAgICAgKiBvbm54cnVudGltZV9zZXNzaW9uX29wdGlvbnNfY29uZmlnX2tleXMuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBqc1xuICAgICAqIGV4dHJhOiB7XG4gICAgICogICBzZXNzaW9uOiB7XG4gICAgICogICAgIHNldF9kZW5vcm1hbF9hc196ZXJvOiBcIjFcIixcbiAgICAgKiAgICAgZGlzYWJsZV9wcmVwYWNraW5nOiBcIjFcIlxuICAgICAqICAgfSxcbiAgICAgKiAgIG9wdGltaXphdGlvbjoge1xuICAgICAqICAgICBlbmFibGVfZ2VsdV9hcHByb3hpbWF0aW9uOiBcIjFcIlxuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBleHRyYT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICB9XG5cbiAgLy8gI3JlZ2lvbiBleGVjdXRpb24gcHJvdmlkZXJzXG5cbiAgLy8gQ3VycmVudGx5LCB3ZSBoYXZlIHRoZSBmb2xsb3dpbmcgYmFja2VuZHMgdG8gc3VwcG9ydCBleGVjdXRpb24gcHJvdmlkZXJzOlxuICAvLyBCYWNrZW5kIE5vZGUuanMgYmluZGluZzogc3VwcG9ydHMgJ2NwdScgYW5kICdjdWRhJy5cbiAgLy8gQmFja2VuZCBXZWJBc3NlbWJseTogc3VwcG9ydHMgJ2NwdScsICd3YXNtJywgJ3hubnBhY2snIGFuZCAnd2Vibm4nLlxuICAvLyBCYWNrZW5kIE9OTlguanM6IHN1cHBvcnRzICd3ZWJnbCcuXG4gIC8vIEJhY2tlbmQgUmVhY3QgTmF0aXZlOiBzdXBwb3J0cyAnY3B1JywgJ3hubnBhY2snLCAnY29yZW1sJyAoaU9TKSwgJ25uYXBpJyAoQW5kcm9pZCkuXG4gIGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcCB7XG4gICAgY3B1OiBDcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBjb3JlbWw6IENvcmVNbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGN1ZGE6IEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBkbWw6IERtbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHRlbnNvcnJ0OiBUZW5zb3JSdEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdhc206IFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2ViZ2w6IFdlYkdMRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgeG5ucGFjazogWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdlYmdwdTogV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2Vibm46IFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgbm5hcGk6IE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gIH1cblxuICB0eXBlIEV4ZWN1dGlvblByb3ZpZGVyTmFtZSA9IGtleW9mIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwO1xuICB0eXBlIEV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnID1cbiAgICAgIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwW0V4ZWN1dGlvblByb3ZpZGVyTmFtZV18RXhlY3V0aW9uUHJvdmlkZXJPcHRpb258RXhlY3V0aW9uUHJvdmlkZXJOYW1lfHN0cmluZztcblxuICBleHBvcnQgaW50ZXJmYWNlIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBDcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnY3B1JztcbiAgICB1c2VBcmVuYT86IGJvb2xlYW47XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBDdWRhRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2N1ZGEnO1xuICAgIGRldmljZUlkPzogbnVtYmVyO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29yZU1sRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2NvcmVtbCc7XG4gICAgY29yZU1sRmxhZ3M/OiBudW1iZXI7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBEbWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnZG1sJztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFRlbnNvclJ0RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3RlbnNvcnJ0JztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dhc20nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2ViZ2wnO1xuICAgIC8vIFRPRE86IGFkZCBmbGFnc1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd4bm5wYWNrJztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJncHUnO1xuICAgIHByZWZlcnJlZExheW91dD86ICdOQ0hXJ3wnTkhXQyc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJubic7XG4gICAgZGV2aWNlVHlwZT86ICdjcHUnfCdncHUnfCducHUnO1xuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2RlZmF1bHQnfCdsb3ctcG93ZXInfCdoaWdoLXBlcmZvcm1hbmNlJztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjb3JlbWwnO1xuICAgIHVzZUNQVU9ubHk/OiBib29sZWFuO1xuICAgIGVuYWJsZU9uU3ViZ3JhcGg/OiBib29sZWFuO1xuICAgIG9ubHlFbmFibGVEZXZpY2VXaXRoQU5FPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ25uYXBpJztcbiAgICB1c2VGUDE2PzogYm9vbGVhbjtcbiAgICB1c2VOQ0hXPzogYm9vbGVhbjtcbiAgICBjcHVEaXNhYmxlZD86IGJvb2xlYW47XG4gICAgY3B1T25seT86IGJvb2xlYW47XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHJ1biBvcHRpb25zXG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIGNvbmZpZ3VyYXRpb25zIGZvciBpbmZlcmVuY2UgcnVuIGJlaGF2aW9yXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFJ1bk9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dTZXZlcml0eUxldmVsPzogMHwxfDJ8M3w0O1xuXG4gICAgLyoqXG4gICAgICogTG9nIHZlcmJvc2l0eSBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKi9cbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRlcm1pbmF0ZSBhbGwgaW5jb21wbGV0ZSBPcnRSdW4gY2FsbHMgYXMgc29vbiBhcyBwb3NzaWJsZSBpZiB0cnVlXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgdGVybWluYXRlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEEgdGFnIGZvciB0aGUgUnVuKCkgY2FsbHMgdXNpbmcgdGhpc1xuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIHRhZz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNldCBhIHNpbmdsZSBydW4gY29uZmlndXJhdGlvbiBlbnRyeS4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Nlc3Npb24vXG4gICAgICogb25ueHJ1bnRpbWVfcnVuX29wdGlvbnNfY29uZmlnX2tleXMuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogZXh0cmE6IHtcbiAgICAgKiAgIG1lbW9yeToge1xuICAgICAqICAgICBlbmFibGVfbWVtb3J5X2FyZW5hX3Nocmlua2FnZTogXCIxXCIsXG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGV4dHJhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB2YWx1ZSBtZXRhZGF0YVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlXG4gIGludGVyZmFjZSBWYWx1ZU1ldGFkYXRhIHtcbiAgICAvLyBUQkRcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBydW50aW1lIGluc3RhbmNlIG9mIGFuIE9OTlggbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbiB7XG4gIC8vICNyZWdpb24gcnVuKClcblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1bihmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgdGhlIG1vZGVsIGFzeW5jaHJvbm91c2x5IHdpdGggdGhlIGdpdmVuIGZlZWRzLCBmZXRjaGVzIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLklucHV0VHlwZWAgZm9yIGRldGFpbC5cbiAgICogQHBhcmFtIGZldGNoZXMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgb3V0cHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5PdXRwdXRUeXBlYCBmb3JcbiAgICogZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1bihmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHJlbGVhc2UoKVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlIHRoZSBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgdGhlIHVuZGVybHlpbmcgcmVzb3VyY2VzLlxuICAgKi9cbiAgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHByb2ZpbGluZ1xuXG4gIC8qKlxuICAgKiBTdGFydCBwcm9maWxpbmcuXG4gICAqL1xuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBFbmQgcHJvZmlsaW5nLlxuICAgKi9cbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQ7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0YWRhdGFcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8vIC8qKlxuICAvLyAgKiBHZXQgaW5wdXQgbWV0YWRhdGEgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgLy8gICovXG4gIC8vIHJlYWRvbmx5IGlucHV0TWV0YWRhdGE6IFJlYWRvbmx5QXJyYXk8UmVhZG9ubHk8SW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhPj47XG5cbiAgLy8gLyoqXG4gIC8vICAqIEdldCBvdXRwdXQgbWV0YWRhdGEgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgLy8gICovXG4gIC8vIHJlYWRvbmx5IG91dHB1dE1ldGFkYXRhOiBSZWFkb25seUFycmF5PFJlYWRvbmx5PEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YT4+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gY3JlYXRlKClcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gT05OWCBtb2RlbCBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gdXJpIC0gVGhlIFVSSSBvciBmaWxlIHBhdGggb2YgdGhlIG1vZGVsIHRvIGxvYWQuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXG4gICAqL1xuICBjcmVhdGUodXJpOiBzdHJpbmcsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIHNlZ21lbnQgb2YgYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gYnl0ZU9mZnNldCAtIFRoZSBiZWdpbm5pbmcgb2YgdGhlIHNwZWNpZmllZCBwb3J0aW9uIG9mIHRoZSBhcnJheSBidWZmZXIuXG4gICAqIEBwYXJhbSBieXRlTGVuZ3RoIC0gVGhlIGxlbmd0aCBpbiBieXRlcyBvZiB0aGUgYXJyYXkgYnVmZmVyLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg/OiBudW1iZXIsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGEgVWludDhBcnJheS5cbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciAtIEEgVWludDhBcnJheSByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IEluZmVyZW5jZVNlc3Npb246IEluZmVyZW5jZVNlc3Npb25GYWN0b3J5ID0gSW5mZXJlbmNlU2Vzc2lvbkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbnR5cGUgTm9uVGVuc29yVHlwZSA9IG5ldmVyO1xuXG4vKipcbiAqIFR5cGUgT25ueFZhbHVlIFJlcHJlc2VudHMgYm90aCB0ZW5zb3JzIGFuZCBub24tdGVuc29ycyB2YWx1ZSBmb3IgbW9kZWwncyBpbnB1dHMvb3V0cHV0cy5cbiAqXG4gKiBOT1RFOiBjdXJyZW50bHkgbm90IHN1cHBvcnQgbm9uLXRlbnNvclxuICovXG5leHBvcnQgdHlwZSBPbm54VmFsdWUgPSBUZW5zb3J8Tm9uVGVuc29yVHlwZTtcblxuLyoqXG4gKiBUeXBlIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiByZXByZXNlbnRzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSBvZiBhbiBPbm54VmFsdWUuXG4gKi9cbmV4cG9ydCB0eXBlIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiA9IFRlbnNvci5EYXRhTG9jYXRpb247XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7cmVzb2x2ZUJhY2tlbmR9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcbmltcG9ydCB7U2Vzc2lvbkhhbmRsZXIsIFRyYWluaW5nU2Vzc2lvbkhhbmRsZXJ9IGZyb20gJy4vYmFja2VuZC5qcyc7XG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5pbXBvcnQge1RyYWluaW5nU2Vzc2lvbiBhcyBUcmFpbmluZ1Nlc3Npb25JbnRlcmZhY2UsIFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnN9IGZyb20gJy4vdHJhaW5pbmctc2Vzc2lvbi5qcyc7XG5cbnR5cGUgU2Vzc2lvbk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zO1xudHlwZSBGZWVkc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZTtcbnR5cGUgRmV0Y2hlc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlO1xudHlwZSBSZXR1cm5UeXBlID0gSW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlO1xudHlwZSBSdW5PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zO1xuXG5jb25zdCBub0JhY2tlbmRFcnJNc2c6IHN0cmluZyA9ICdUcmFpbmluZyBiYWNrZW5kIGNvdWxkIG5vdCBiZSByZXNvbHZlZC4gJyArXG4gICAgJ01ha2Ugc3VyZSB5b3VcXCdyZSB1c2luZyB0aGUgY29ycmVjdCBjb25maWd1cmF0aW9uICYgV2ViQXNzZW1ibHkgZmlsZXMuJztcblxuZXhwb3J0IGNsYXNzIFRyYWluaW5nU2Vzc2lvbiBpbXBsZW1lbnRzIFRyYWluaW5nU2Vzc2lvbkludGVyZmFjZSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoaGFuZGxlcjogVHJhaW5pbmdTZXNzaW9uSGFuZGxlcikge1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gIH1cbiAgcHJpdmF0ZSBoYW5kbGVyOiBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyO1xuXG4gIGdldCBpbnB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmlucHV0TmFtZXM7XG4gIH1cbiAgZ2V0IG91dHB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLm91dHB1dE5hbWVzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZSh0cmFpbmluZ09wdGlvbnM6IFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnMsIHNlc3Npb25PcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxUcmFpbmluZ1Nlc3Npb24+IHtcbiAgICBjb25zdCBldmFsTW9kZWw6IHN0cmluZ3xVaW50OEFycmF5ID0gdHJhaW5pbmdPcHRpb25zLmV2YWxNb2RlbCB8fCAnJztcbiAgICBjb25zdCBvcHRpbWl6ZXJNb2RlbDogc3RyaW5nfFVpbnQ4QXJyYXkgPSB0cmFpbmluZ09wdGlvbnMub3B0aW1pemVyTW9kZWwgfHwgJyc7XG4gICAgY29uc3Qgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMgPSBzZXNzaW9uT3B0aW9ucyB8fCB7fTtcblxuICAgIC8vIGdldCBiYWNrZW5kIGhpbnRzXG4gICAgY29uc3QgZXBzID0gb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMgfHwgW107XG4gICAgY29uc3QgYmFja2VuZEhpbnRzID0gZXBzLm1hcChpID0+IHR5cGVvZiBpID09PSAnc3RyaW5nJyA/IGkgOiBpLm5hbWUpO1xuICAgIGNvbnN0IGJhY2tlbmQgPSBhd2FpdCByZXNvbHZlQmFja2VuZChiYWNrZW5kSGludHMpO1xuICAgIGlmIChiYWNrZW5kLmNyZWF0ZVRyYWluaW5nU2Vzc2lvbkhhbmRsZXIpIHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBiYWNrZW5kLmNyZWF0ZVRyYWluaW5nU2Vzc2lvbkhhbmRsZXIoXG4gICAgICAgICAgdHJhaW5pbmdPcHRpb25zLmNoZWNrcG9pbnRTdGF0ZSwgdHJhaW5pbmdPcHRpb25zLnRyYWluTW9kZWwsIGV2YWxNb2RlbCwgb3B0aW1pemVyTW9kZWwsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIG5ldyBUcmFpbmluZ1Nlc3Npb24oaGFuZGxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihub0JhY2tlbmRFcnJNc2cpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gZm9yIHJ1blRyYWluU3RlcCBhbmQgZnV0dXJlIHJ1blN0ZXAgbWV0aG9kcyB0aGF0IGhhbmRsZXMgdGhlIHR5cGUtbmFycm93aW5nIGNvbnZlcnNpb24gZnJvbVxuICAgKiB0aGUgZ2l2ZW4gcGFyYW1ldGVycyB0byBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSBhbmQgUnVuT3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIHRoZSByZXF1aXJlZCBpbnB1dFxuICAgKiBAcGFyYW0gYXJnMSBuYXJyb3dlZCAmIGNvbnZlcnRlZCBpbnRvIHRoZSBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSBvciBSdW5PcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0gYXJnMiBvcHRpb25hbCBSdW5PcHRpb25zIG9iamVjdC5cbiAgICogQHJldHVybnNcbiAgICovXG4gIHR5cGVOYXJyb3dpbmdGb3JSdW5TdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6XG4gICAgICBbU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUsIFJ1bk9wdGlvbnNdIHtcbiAgICBjb25zdCBmZXRjaGVzOiB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZXxudWxsfSA9IHt9O1xuICAgIGxldCBvcHRpb25zOiBSdW5PcHRpb25zID0ge307XG4gICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgaWYgKHR5cGVvZiBmZWVkcyAhPT0gJ29iamVjdCcgfHwgZmVlZHMgPT09IG51bGwgfHwgZmVlZHMgaW5zdGFuY2VvZiBUZW5zb3IgfHwgQXJyYXkuaXNBcnJheShmZWVkcykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgJ1xcJ2ZlZWRzXFwnIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgdXNlIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy4nKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGZXRjaGVzRW1wdHkgPSB0cnVlO1xuICAgIC8vIGRldGVybWluZSB3aGljaCBvdmVycmlkZSBpcyBiZWluZyB1c2VkXG4gICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGFyZzEgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5leHBlY3RlZCBhcmd1bWVudFsxXTogY2Fubm90IGJlIG51bGwuJyk7XG4gICAgICB9XG4gICAgICBpZiAoYXJnMSBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIGNhbm5vdCBiZSBhIFRlbnNvcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICBpZiAoYXJnMS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIGNhbm5vdCBiZSBhbiBlbXB0eSBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAvLyBvdXRwdXQgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGFyZzEpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkgb3IgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5vdXRwdXROYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdmZXRjaGVzJyBjb250YWlucyBpbnZhbGlkIG91dHB1dCBuYW1lOiAke25hbWV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRlY2lkZSB3aGV0aGVyIGFyZzEgaXMgZmV0Y2hlcyBvciBvcHRpb25zXG4gICAgICAgIC8vIGlmIGFueSBvdXRwdXQgbmFtZSBpcyBwcmVzZW50IGFuZCBpdHMgdmFsdWUgaXMgdmFsaWQgT25ueFZhbHVlLCB3ZSBjb25zaWRlciBpdCBmZXRjaGVzXG4gICAgICAgIGxldCBpc0ZldGNoZXMgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgYXJnMUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmcxKTtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMub3V0cHV0TmFtZXMpIHtcbiAgICAgICAgICBpZiAoYXJnMUtleXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSAoYXJnMSBhcyBJbmZlcmVuY2VTZXNzaW9uLk51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSlbbmFtZV07XG4gICAgICAgICAgICBpZiAodiA9PT0gbnVsbCB8fCB2IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlcyA9IHRydWU7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZldGNoZXMpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMSBhcyBSdW5PcHRpb25zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IG11c3QgYmUgXFwnZmV0Y2hlc1xcJyBvciBcXCdvcHRpb25zXFwnLicpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dHMgYXJlIGluIGZlZWRcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5pbnB1dE5hbWVzKSB7XG4gICAgICBpZiAodHlwZW9mIGZlZWRzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlucHV0ICcke25hbWV9JyBpcyBtaXNzaW5nIGluICdmZWVkcycuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxuICAgIGlmIChpc0ZldGNoZXNFbXB0eSkge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMub3V0cHV0TmFtZXMpIHtcbiAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFtmZXRjaGVzLCBvcHRpb25zXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgbWV0aG9kIGZvciBydW5UcmFpblN0ZXAgYW5kIGFueSBvdGhlciBydW5TdGVwIG1ldGhvZHMuIFRha2VzIHRoZSBSZXR1cm5UeXBlIHJlc3VsdCBmcm9tIHRoZSBTZXNzaW9uSGFuZGxlclxuICAgKiBhbmQgY2hhbmdlcyBpdCBpbnRvIGEgbWFwIG9mIFRlbnNvcnMuXG4gICAqXG4gICAqIEBwYXJhbSByZXN1bHRzXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBjb252ZXJ0SGFuZGxlclJldHVyblR5cGVUb01hcE9mVGVuc29ycyhyZXN1bHRzOiBTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlKTogUmV0dXJuVHlwZSB7XG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IHtbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfSA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3VsdHMpIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHRzLCBrZXkpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNba2V5XTtcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IG5ldyBUZW5zb3IocmVzdWx0LnR5cGUsIHJlc3VsdC5kYXRhLCByZXN1bHQuZGltcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG5cbiAgcnVuVHJhaW5TdGVwKGZlZWRzOiBGZWVkc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgcnVuVHJhaW5TdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGZldGNoZXM6IEZldGNoZXNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIGFzeW5jIHJ1blRyYWluU3RlcChmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGV8UnVuT3B0aW9ucywgYXJnMj86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+IHtcbiAgICBjb25zdCBbZmV0Y2hlcywgb3B0aW9uc10gPSB0aGlzLnR5cGVOYXJyb3dpbmdGb3JSdW5TdGVwKGZlZWRzLCBhcmcxLCBhcmcyKTtcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5oYW5kbGVyLnJ1blRyYWluU3RlcChmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuY29udmVydEhhbmRsZXJSZXR1cm5UeXBlVG9NYXBPZlRlbnNvcnMocmVzdWx0cyk7XG4gIH1cblxuICBhc3luYyBnZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5ID0gdHJ1ZSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5nZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5KTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRQYXJhbWV0ZXJzQnVmZmVyKGFycmF5OiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5ID0gdHJ1ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhcmFtc1NpemUgPSBhd2FpdCB0aGlzLmdldFBhcmFtZXRlcnNTaXplKHRyYWluYWJsZU9ubHkpO1xuICAgIC8vIGNoZWNraW5nIHRoYXQgdGhlIHNpemUgb2YgdGhlIFVpbnQ4QXJyYXkgaXMgZXF1aXZhbGVudCB0byB0aGUgYnl0ZSBsZW5ndGggb2YgYSBGbG9hdDMyQXJyYXkgb2YgdGhlIG51bWJlclxuICAgIC8vIG9mIHBhcmFtZXRlcnNcbiAgICBpZiAoYXJyYXkubGVuZ3RoICE9PSA0ICogcGFyYW1zU2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdTaXplIG9mIHRoZSBidWZmZXIgcGFzc2VkIGludG8gbG9hZFBhcmFtZXRlcnNCdWZmZXIgbXVzdCBtYXRjaCB0aGUgbnVtYmVyIG9mIHBhcmFtZXRlcnMgaW4gJyArXG4gICAgICAgICAgJ3RoZSBtb2RlbC4gUGxlYXNlIHVzZSBnZXRQYXJhbWV0ZXJzU2l6ZSBtZXRob2QgdG8gY2hlY2suJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIubG9hZFBhcmFtZXRlcnNCdWZmZXIoYXJyYXksIHRyYWluYWJsZU9ubHkpO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seSA9IHRydWUpOiBQcm9taXNlPE9ubnhWYWx1ZT4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seSk7XG4gIH1cblxuICBhc3luYyByZWxlYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xuICB9XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7VHJhaW5pbmdTZXNzaW9uIGFzIFRyYWluaW5nU2Vzc2lvbkltcGx9IGZyb20gJy4vdHJhaW5pbmctc2Vzc2lvbi1pbXBsLmpzJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlZGVjbGFyZSAqL1xuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgVHJhaW5pbmdTZXNzaW9uIHtcbiAgLyoqXG4gICAqIEVpdGhlciBVUkkgZmlsZSBwYXRoIChzdHJpbmcpIG9yIFVpbnQ4QXJyYXkgY29udGFpbmluZyBtb2RlbCBvciBjaGVja3BvaW50IGluZm9ybWF0aW9uLlxuICAgKi9cbiAgdHlwZSBVUklvckJ1ZmZlciA9IHN0cmluZ3xVaW50OEFycmF5O1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIHJ1bnRpbWUgaW5zdGFuY2Ugb2YgYW4gT05OWCB0cmFpbmluZyBzZXNzaW9uLFxuICogd2hpY2ggY29udGFpbnMgYSBtb2RlbCB0aGF0IGNhbiBiZSB0cmFpbmVkLCBhbmQsIG9wdGlvbmFsbHksXG4gKiBhbiBldmFsIGFuZCBvcHRpbWl6ZXIgbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBydW4oKVxuXG4gIC8qKlxuICAgKiBSdW4gVHJhaW5TdGVwIGFzeW5jaHJvbm91c2x5IHdpdGggdGhlIGdpdmVuIGZlZWRzIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLklucHV0VHlwZWAgZm9yXG4gICBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgdHJhaW5pbmcuXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqL1xuICBydW5UcmFpblN0ZXAoZmVlZHM6IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvKipcbiAgICogUnVuIGEgc2luZ2xlIHRyYWluIHN0ZXAgd2l0aCB0aGUgZ2l2ZW4gaW5wdXRzIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuXG4gICAqIEBwYXJhbSBmZXRjaGVzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIG91dHB1dC5cbiAgICogZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nXG4gICB2YWx1ZXMuXG4gICAqL1xuICBydW5UcmFpblN0ZXAoXG4gICAgICBmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGNvcHkgcGFyYW1ldGVyc1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHNpemUgb2YgYWxsIHBhcmFtZXRlcnMgZm9yIHRoZSB0cmFpbmluZyBzdGF0ZS4gQ2FsY3VsYXRlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHByaW1pdGl2ZSAoZGF0YXR5cGUgb2ZcbiAgICogdGhlIHBhcmFtZXRlcnMpIGVsZW1lbnRzIG9mIGFsbCB0aGUgcGFyYW1ldGVycyBpbiB0aGUgdHJhaW5pbmcgc3RhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gV2hlbiBzZXQgdG8gdHJ1ZSwgdGhlIHNpemUgaXMgY2FsY3VsYXRlZCBmb3IgdHJhaW5hYmxlIHBhcmFtcyBvbmx5LiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gICAqL1xuICBnZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxudW1iZXI+O1xuXG4gIC8qKlxuICAgKiBDb3BpZXMgcGFyYW1ldGVyIHZhbHVlcyBmcm9tIHRoZSBnaXZlbiBhcnJheSB0byB0aGUgdHJhaW5pbmcgc3RhdGUuIEN1cnJlbnRseSwgb25seSBzdXBwb3J0aW5nIG1vZGVscyB3aXRoXG4gICAqIHBhcmFtZXRlcnMgb2YgdHlwZSBGbG9hdDMyLlxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gRmxvYXQzMiBidWZmZXIgY29udGFpbmluZyBwYXJhbWV0ZXJzIGNvbnZlcnRlZCB0byBhIFVpbnQ4QXJyYXkuXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gVHJ1ZSBpZiB0cmFpbmFibGUgcGFyYW1ldGVycyBvbmx5IHRvIGJlIG1vZGlmaWVkLCBmYWxzZSBvdGhlcndpc2UuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICovXG4gIGxvYWRQYXJhbWV0ZXJzQnVmZmVyKGFycmF5OiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogQ29waWVzIHRoZSBtb2RlbCBwYXJhbWV0ZXJzIHRvIGEgY29udGlndW91cyBidWZmZXIuIFVzdWFsbHkgdXNlZCBpbiB0aGUgY29udGV4dCBvZiBGZWRlcmF0ZWQgTGVhcm5pbmcuXG4gICAqIEN1cnJlbnRseSwgb25seSBzdXBwb3J0aW5nIG1vZGVscyB3aXRoIHBhcmFtZXRlcnMgb2YgdHlwZSBGbG9hdDMyLlxuICAgKlxuICAgKiBAcGFyYW0gdHJhaW5hYmxlT25seSAtIFdoZW4gc2V0IHRvIHRydWUsIG9ubHkgdHJhaW5hYmxlIHBhcmFtZXRlcnMgYXJlIGNvcGllZC4gVHJhaW5hYmxlIHBhcmFtZXRlcnMgYXJlIHBhcmFtZXRlcnNcbiAgICogZm9yIHdoaWNoIHJlcXVpcmVzX2dyYWQgaXMgc2V0IHRvIHRydWUuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBGbG9hdDMyIE9ubnhWYWx1ZSBvZiB0aGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMuXG4gICAqL1xuICBnZXRDb250aWd1b3VzUGFyYW1ldGVycyh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxPbm54VmFsdWU+O1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcblxuICAvKipcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cbiAgICovXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0YWRhdGFcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgb3B0aW9uYWwgcGFyYW1ldGVycyB0aGF0IGNhbiBiZSBwYXNzZWQgaW50byB0aGUgVHJhaW5pbmdTZXNzaW9uRmFjdG9yeS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb25DcmVhdGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFVSSSBvciBidWZmZXIgZm9yIGEgLmNrcHQgZmlsZSB0aGF0IGNvbnRhaW5zIHRoZSBjaGVja3BvaW50IGZvciB0aGUgdHJhaW5pbmcgbW9kZWwuXG4gICAqL1xuICBjaGVja3BvaW50U3RhdGU6IFRyYWluaW5nU2Vzc2lvbi5VUklvckJ1ZmZlcjtcbiAgLyoqXG4gICAqIFVSSSBvciBidWZmZXIgZm9yIHRoZSAub25ueCB0cmFpbmluZyBmaWxlLlxuICAgKi9cbiAgdHJhaW5Nb2RlbDogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyO1xuICAvKipcbiAgICogT3B0aW9uYWwuIFVSSSBvciBidWZmZXIgZm9yIHRoZSAub25ueCBvcHRpbWl6ZXIgbW9kZWwgZmlsZS5cbiAgICovXG4gIG9wdGltaXplck1vZGVsPzogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyO1xuICAvKipcbiAgICogT3B0aW9uYWwuIFVSSSBvciBidWZmZXIgZm9yIHRoZSAub25ueCBldmFsIG1vZGVsIGZpbGUuXG4gICAqL1xuICBldmFsTW9kZWw/OiBUcmFpbmluZ1Nlc3Npb24uVVJJb3JCdWZmZXI7XG59XG5cbi8qKlxuICogRGVmaW5lcyBtZXRob2Qgb3ZlcmxvYWQgcG9zc2liaWxpdGllcyBmb3IgY3JlYXRpbmcgYSBUcmFpbmluZ1Nlc3Npb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gY3JlYXRlKClcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBUcmFpbmluZ1Nlc3Npb24gYW5kIGFzeW5jaHJvbm91c2x5IGxvYWRzIGFueSBtb2RlbHMgcGFzc2VkIGluIHRocm91Z2ggdHJhaW5pbmdPcHRpb25zXG4gICAqXG4gICAqIEBwYXJhbSB0cmFpbmluZ09wdGlvbnMgc3BlY2lmeSBtb2RlbHMgYW5kIGNoZWNrcG9pbnRzIHRvIGxvYWQgaW50byB0aGUgVHJhaW5pbmcgU2Vzc2lvblxuICAgKiBAcGFyYW0gc2Vzc2lvbk9wdGlvbnMgc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciB0cmFpbmluZyBzZXNzaW9uIGJlaGF2aW9yXG4gICAqXG4gICAqIEByZXR1cm5zIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIFRyYWluaW5nU2Vzc2lvbiBvYmplY3RcbiAgICovXG4gIGNyZWF0ZSh0cmFpbmluZ09wdGlvbnM6IFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnMsIHNlc3Npb25PcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbj47XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgVHJhaW5pbmdTZXNzaW9uOiBUcmFpbmluZ1Nlc3Npb25GYWN0b3J5ID0gVHJhaW5pbmdTZXNzaW9uSW1wbDtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLyoqXG4gKiAjIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSVxuICpcbiAqIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSSBpcyBhIHVuaWZpZWQgQVBJIGZvciBhbGwgSmF2YVNjcmlwdCB1c2FnZXMsIGluY2x1ZGluZyB0aGUgZm9sbG93aW5nIE5QTSBwYWNrYWdlczpcbiAqXG4gKiAtIFtvbm54cnVudGltZS1ub2RlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS1ub2RlKVxuICogLSBbb25ueHJ1bnRpbWUtd2ViXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS13ZWIpXG4gKiAtIFtvbm54cnVudGltZS1yZWFjdC1uYXRpdmVdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLXJlYWN0LW5hdGl2ZSlcbiAqXG4gKiBTZWUgYWxzbzpcbiAqIC0gW0dldCBTdGFydGVkXShodHRwczovL29ubnhydW50aW1lLmFpL2RvY3MvZ2V0LXN0YXJ0ZWQvd2l0aC1qYXZhc2NyaXB0Lmh0bWwpXG4gKiAtIFtJbmZlcmVuY2UgZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUtaW5mZXJlbmNlLWV4YW1wbGVzL3RyZWUvbWFpbi9qcylcbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2JhY2tlbmQuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9lbnYuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLmpzJztcbiIsICJleHBvcnQgY29uc3QgY3B1cyA9IHVuZGVmaW5lZDsiLCAiZXhwb3J0IGNvbnN0IHJlYWRGaWxlID0gdW5kZWZpbmVkOyIsICJleHBvcnQgY29uc3Qgam9pbiA9IHVuZGVmaW5lZDsiLCAiXG52YXIgb3J0V2FzbSA9ICgoKSA9PiB7XG4gIHZhciBfc2NyaXB0RGlyID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0ID8gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMgOiB1bmRlZmluZWQ7XG4gIGlmICh0eXBlb2YgX19maWxlbmFtZSAhPT0gJ3VuZGVmaW5lZCcpIF9zY3JpcHREaXIgPSBfc2NyaXB0RGlyIHx8IF9fZmlsZW5hbWU7XG4gIHJldHVybiAoXG5mdW5jdGlvbihtb2R1bGVBcmcgPSB7fSkge1xuXG52YXIgcD1tb2R1bGVBcmcsYWEsYmE7cC5yZWFkeT1uZXcgUHJvbWlzZSgoYSxiKT0+e2FhPWE7YmE9Yn0pO3ZhciBjYT1PYmplY3QuYXNzaWduKHt9LHApLGRhPVwiLi90aGlzLnByb2dyYW1cIixlYT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93LHE9XCJmdW5jdGlvblwiPT10eXBlb2YgaW1wb3J0U2NyaXB0cyxmYT1cIm9iamVjdFwiPT10eXBlb2YgcHJvY2VzcyYmXCJvYmplY3RcIj09dHlwZW9mIHByb2Nlc3MudmVyc2lvbnMmJlwic3RyaW5nXCI9PXR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGUscj1cIlwiLGhhLGlhLGphO1xuaWYoZmEpe3ZhciBmcz1yZXF1aXJlKFwiZnNcIiksa2E9cmVxdWlyZShcInBhdGhcIik7cj1xP2thLmRpcm5hbWUocikrXCIvXCI6X19kaXJuYW1lK1wiL1wiO2hhPShhLGIpPT57YT1hLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpP25ldyBVUkwoYSk6a2Eubm9ybWFsaXplKGEpO3JldHVybiBmcy5yZWFkRmlsZVN5bmMoYSxiP3ZvaWQgMDpcInV0ZjhcIil9O2phPWE9PnthPWhhKGEsITApO2EuYnVmZmVyfHwoYT1uZXcgVWludDhBcnJheShhKSk7cmV0dXJuIGF9O2lhPShhLGIsYyxkPSEwKT0+e2E9YS5zdGFydHNXaXRoKFwiZmlsZTovL1wiKT9uZXcgVVJMKGEpOmthLm5vcm1hbGl6ZShhKTtmcy5yZWFkRmlsZShhLGQ/dm9pZCAwOlwidXRmOFwiLChlLGYpPT57ZT9jKGUpOmIoZD9mLmJ1ZmZlcjpmKX0pfTshcC50aGlzUHJvZ3JhbSYmMTxwcm9jZXNzLmFyZ3YubGVuZ3RoJiYoZGE9cHJvY2Vzcy5hcmd2WzFdLnJlcGxhY2UoL1xcXFwvZyxcIi9cIikpO3Byb2Nlc3MuYXJndi5zbGljZSgyKTtwLmluc3BlY3Q9KCk9PlwiW0Vtc2NyaXB0ZW4gTW9kdWxlIG9iamVjdF1cIn1lbHNlIGlmKGVhfHxcbnEpcT9yPXNlbGYubG9jYXRpb24uaHJlZjpcInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQmJmRvY3VtZW50LmN1cnJlbnRTY3JpcHQmJihyPWRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjKSxfc2NyaXB0RGlyJiYocj1fc2NyaXB0RGlyKSwwIT09ci5pbmRleE9mKFwiYmxvYjpcIik/cj1yLnN1YnN0cigwLHIucmVwbGFjZSgvWz8jXS4qLyxcIlwiKS5sYXN0SW5kZXhPZihcIi9cIikrMSk6cj1cIlwiLGhhPWE9Pnt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiR0VUXCIsYSwhMSk7Yi5zZW5kKG51bGwpO3JldHVybiBiLnJlc3BvbnNlVGV4dH0scSYmKGphPWE9Pnt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiR0VUXCIsYSwhMSk7Yi5yZXNwb25zZVR5cGU9XCJhcnJheWJ1ZmZlclwiO2Iuc2VuZChudWxsKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYi5yZXNwb25zZSl9KSxpYT0oYSxiLGMpPT57dmFyIGQ9bmV3IFhNTEh0dHBSZXF1ZXN0O2Qub3BlbihcIkdFVFwiLGEsITApO2QucmVzcG9uc2VUeXBlPVxuXCJhcnJheWJ1ZmZlclwiO2Qub25sb2FkPSgpPT57MjAwPT1kLnN0YXR1c3x8MD09ZC5zdGF0dXMmJmQucmVzcG9uc2U/YihkLnJlc3BvbnNlKTpjKCl9O2Qub25lcnJvcj1jO2Quc2VuZChudWxsKX07dmFyIGxhPWNvbnNvbGUubG9nLmJpbmQoY29uc29sZSksdD1jb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihwLGNhKTtjYT1udWxsO1wib2JqZWN0XCIhPXR5cGVvZiBXZWJBc3NlbWJseSYmbWEoXCJubyBuYXRpdmUgd2FzbSBzdXBwb3J0IGRldGVjdGVkXCIpO3ZhciBuYSxvYT0hMSx4LEEsQixwYSxFLEkscWEscmEsc2EsdGE7XG5mdW5jdGlvbiB1YSgpe3ZhciBhPW5hLmJ1ZmZlcjtwLkhFQVA4PXg9bmV3IEludDhBcnJheShhKTtwLkhFQVAxNj1CPW5ldyBJbnQxNkFycmF5KGEpO3AuSEVBUFU4PUE9bmV3IFVpbnQ4QXJyYXkoYSk7cC5IRUFQVTE2PXBhPW5ldyBVaW50MTZBcnJheShhKTtwLkhFQVAzMj1FPW5ldyBJbnQzMkFycmF5KGEpO3AuSEVBUFUzMj1JPW5ldyBVaW50MzJBcnJheShhKTtwLkhFQVBGMzI9cWE9bmV3IEZsb2F0MzJBcnJheShhKTtwLkhFQVBGNjQ9dGE9bmV3IEZsb2F0NjRBcnJheShhKTtwLkhFQVA2ND1yYT1uZXcgQmlnSW50NjRBcnJheShhKTtwLkhFQVBVNjQ9c2E9bmV3IEJpZ1VpbnQ2NEFycmF5KGEpfXZhciB2YT1bXSx3YT1bXSx4YT1bXSxKPTAseWE9bnVsbCxLPW51bGw7XG5mdW5jdGlvbiBtYShhKXthPVwiQWJvcnRlZChcIithK1wiKVwiO3QoYSk7b2E9ITA7YT1uZXcgV2ViQXNzZW1ibHkuUnVudGltZUVycm9yKGErXCIuIEJ1aWxkIHdpdGggLXNBU1NFUlRJT05TIGZvciBtb3JlIGluZm8uXCIpO2JhKGEpO3Rocm93IGE7fWZ1bmN0aW9uIHphKGEpe3JldHVybiBhLnN0YXJ0c1dpdGgoXCJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsXCIpfXZhciBBYTtBYT1cIm9ydC13YXNtLndhc21cIjtpZighemEoQWEpKXt2YXIgQmE9QWE7QWE9cC5sb2NhdGVGaWxlP3AubG9jYXRlRmlsZShCYSxyKTpyK0JhfWZ1bmN0aW9uIENhKGEpe2lmKGphKXJldHVybiBqYShhKTt0aHJvd1wiYm90aCBhc3luYyBhbmQgc3luYyBmZXRjaGluZyBvZiB0aGUgd2FzbSBmYWlsZWRcIjt9XG5mdW5jdGlvbiBEYShhKXtpZihlYXx8cSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZmV0Y2gmJiFhLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpKXJldHVybiBmZXRjaChhLHtjcmVkZW50aWFsczpcInNhbWUtb3JpZ2luXCJ9KS50aGVuKGI9PntpZighYi5vayl0aHJvd1wiZmFpbGVkIHRvIGxvYWQgd2FzbSBiaW5hcnkgZmlsZSBhdCAnXCIrYStcIidcIjtyZXR1cm4gYi5hcnJheUJ1ZmZlcigpfSkuY2F0Y2goKCk9PkNhKGEpKTtpZihpYSlyZXR1cm4gbmV3IFByb21pc2UoKGIsYyk9PntpYShhLGQ9PmIobmV3IFVpbnQ4QXJyYXkoZCkpLGMpfSl9cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9PkNhKGEpKX1mdW5jdGlvbiBFYShhLGIsYyl7cmV0dXJuIERhKGEpLnRoZW4oZD0+V2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoZCxiKSkudGhlbihkPT5kKS50aGVuKGMsZD0+e3QoYGZhaWxlZCB0byBhc3luY2hyb25vdXNseSBwcmVwYXJlIHdhc206ICR7ZH1gKTttYShkKX0pfVxuZnVuY3Rpb24gRmEoYSxiKXt2YXIgYz1BYTtyZXR1cm5cImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZ3x8emEoYyl8fGMuc3RhcnRzV2l0aChcImZpbGU6Ly9cIil8fGZhfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBmZXRjaD9FYShjLGEsYik6ZmV0Y2goYyx7Y3JlZGVudGlhbHM6XCJzYW1lLW9yaWdpblwifSkudGhlbihkPT5XZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhkLGEpLnRoZW4oYixmdW5jdGlvbihlKXt0KGB3YXNtIHN0cmVhbWluZyBjb21waWxlIGZhaWxlZDogJHtlfWApO3QoXCJmYWxsaW5nIGJhY2sgdG8gQXJyYXlCdWZmZXIgaW5zdGFudGlhdGlvblwiKTtyZXR1cm4gRWEoYyxhLGIpfSkpfXZhciBIYT1bXSxJYT0wLEw9MDtcbmZ1bmN0aW9uIEphKGEpe3RoaXMucWU9YTt0aGlzLmtlPWEtMjQ7dGhpcy5JZT1mdW5jdGlvbihiKXtJW3RoaXMua2UrND4+PjI+Pj4wXT1ifTt0aGlzLnJlPWZ1bmN0aW9uKCl7cmV0dXJuIElbdGhpcy5rZSs0Pj4+Mj4+PjBdfTt0aGlzLkhlPWZ1bmN0aW9uKGIpe0lbdGhpcy5rZSs4Pj4+Mj4+PjBdPWJ9O3RoaXMueWU9ZnVuY3Rpb24oYil7eFt0aGlzLmtlKzEyPj4+MD4+PjBdPWI/MTowfTt0aGlzLkVlPWZ1bmN0aW9uKCl7cmV0dXJuIDAhPXhbdGhpcy5rZSsxMj4+PjA+Pj4wXX07dGhpcy56ZT1mdW5jdGlvbihiKXt4W3RoaXMua2UrMTM+Pj4wPj4+MF09Yj8xOjB9O3RoaXMuQWU9ZnVuY3Rpb24oKXtyZXR1cm4gMCE9eFt0aGlzLmtlKzEzPj4+MD4+PjBdfTt0aGlzLkdlPWZ1bmN0aW9uKGIsYyl7dGhpcy5zZSgwKTt0aGlzLkllKGIpO3RoaXMuSGUoYyl9O3RoaXMuc2U9ZnVuY3Rpb24oYil7SVt0aGlzLmtlKzE2Pj4+Mj4+PjBdPWJ9O3RoaXMuRGU9ZnVuY3Rpb24oKXtyZXR1cm4gSVt0aGlzLmtlK1xuMTY+Pj4yPj4+MF19O3RoaXMuRmU9ZnVuY3Rpb24oKXtpZihLYSh0aGlzLnJlKCkpKXJldHVybiBJW3RoaXMucWU+Pj4yPj4+MF07dmFyIGI9dGhpcy5EZSgpO3JldHVybiAwIT09Yj9iOnRoaXMucWV9fVxudmFyIE5hPWE9Pnt2YXIgYj1MO2lmKCFiKXJldHVybiBMYSgwKSwwO3ZhciBjPW5ldyBKYShiKTtjLnNlKGIpO3ZhciBkPWMucmUoKTtpZighZClyZXR1cm4gTGEoMCksYjtmb3IodmFyIGUgaW4gYSl7dmFyIGY9YVtlXTtpZigwPT09Znx8Zj09PWQpYnJlYWs7aWYoTWEoZixkLGMua2UrMTYpKXJldHVybiBMYShmKSxifUxhKGQpO3JldHVybiBifSxPYT1cInVuZGVmaW5lZFwiIT10eXBlb2YgVGV4dERlY29kZXI/bmV3IFRleHREZWNvZGVyKFwidXRmOFwiKTp2b2lkIDAsUGE9KGEsYixjKT0+e2I+Pj49MDt2YXIgZD1iK2M7Zm9yKGM9YjthW2NdJiYhKGM+PWQpOykrK2M7aWYoMTY8Yy1iJiZhLmJ1ZmZlciYmT2EpcmV0dXJuIE9hLmRlY29kZShhLnN1YmFycmF5KGIsYykpO2ZvcihkPVwiXCI7YjxjOyl7dmFyIGU9YVtiKytdO2lmKGUmMTI4KXt2YXIgZj1hW2IrK10mNjM7aWYoMTkyPT0oZSYyMjQpKWQrPVN0cmluZy5mcm9tQ2hhckNvZGUoKGUmMzEpPDw2fGYpO2Vsc2V7dmFyIGc9YVtiKytdJlxuNjM7ZT0yMjQ9PShlJjI0MCk/KGUmMTUpPDwxMnxmPDw2fGc6KGUmNyk8PDE4fGY8PDEyfGc8PDZ8YVtiKytdJjYzOzY1NTM2PmU/ZCs9U3RyaW5nLmZyb21DaGFyQ29kZShlKTooZS09NjU1MzYsZCs9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxlPj4xMCw1NjMyMHxlJjEwMjMpKX19ZWxzZSBkKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpfXJldHVybiBkfSxRYT0oYSxiKT0+KGE+Pj49MCk/UGEoQSxhLGIpOlwiXCIsUmE9YT0+e2Zvcih2YXIgYj0wLGM9MDtjPGEubGVuZ3RoOysrYyl7dmFyIGQ9YS5jaGFyQ29kZUF0KGMpOzEyNz49ZD9iKys6MjA0Nz49ZD9iKz0yOjU1Mjk2PD1kJiY1NzM0Mz49ZD8oYis9NCwrK2MpOmIrPTN9cmV0dXJuIGJ9LFNhPShhLGIsYyxkKT0+e2M+Pj49MDtpZighKDA8ZCkpcmV0dXJuIDA7dmFyIGU9YztkPWMrZC0xO2Zvcih2YXIgZj0wO2Y8YS5sZW5ndGg7KytmKXt2YXIgZz1hLmNoYXJDb2RlQXQoZik7aWYoNTUyOTY8PWcmJjU3MzQzPj1nKXt2YXIgaD1cbmEuY2hhckNvZGVBdCgrK2YpO2c9NjU1MzYrKChnJjEwMjMpPDwxMCl8aCYxMDIzfWlmKDEyNz49Zyl7aWYoYz49ZClicmVhaztiW2MrKz4+PjBdPWd9ZWxzZXtpZigyMDQ3Pj1nKXtpZihjKzE+PWQpYnJlYWs7YltjKys+Pj4wXT0xOTJ8Zz4+Nn1lbHNle2lmKDY1NTM1Pj1nKXtpZihjKzI+PWQpYnJlYWs7YltjKys+Pj4wXT0yMjR8Zz4+MTJ9ZWxzZXtpZihjKzM+PWQpYnJlYWs7YltjKys+Pj4wXT0yNDB8Zz4+MTg7YltjKys+Pj4wXT0xMjh8Zz4+MTImNjN9YltjKys+Pj4wXT0xMjh8Zz4+NiY2M31iW2MrKz4+PjBdPTEyOHxnJjYzfX1iW2M+Pj4wXT0wO3JldHVybiBjLWV9LFRhPWE9PntpZihudWxsPT09YSlyZXR1cm5cIm51bGxcIjt2YXIgYj10eXBlb2YgYTtyZXR1cm5cIm9iamVjdFwiPT09Ynx8XCJhcnJheVwiPT09Ynx8XCJmdW5jdGlvblwiPT09Yj9hLnRvU3RyaW5nKCk6XCJcIithfSxVYSxNPWE9Pntmb3IodmFyIGI9XCJcIjtBW2E+Pj4wXTspYis9VWFbQVthKys+Pj4wXV07cmV0dXJuIGJ9LFxuVmE9e30sV2E9e30sWGE9e30sTjtmdW5jdGlvbiBZYShhLGIsYz17fSl7dmFyIGQ9Yi5uYW1lO2lmKCFhKXRocm93IG5ldyBOKGB0eXBlIFwiJHtkfVwiIG11c3QgaGF2ZSBhIHBvc2l0aXZlIGludGVnZXIgdHlwZWlkIHBvaW50ZXJgKTtpZihXYS5oYXNPd25Qcm9wZXJ0eShhKSl7aWYoYy5CZSlyZXR1cm47dGhyb3cgbmV3IE4oYENhbm5vdCByZWdpc3RlciB0eXBlICcke2R9JyB0d2ljZWApO31XYVthXT1iO2RlbGV0ZSBYYVthXTtWYS5oYXNPd25Qcm9wZXJ0eShhKSYmKGI9VmFbYV0sZGVsZXRlIFZhW2FdLGIuZm9yRWFjaChlPT5lKCkpKX1mdW5jdGlvbiBPKGEsYixjPXt9KXtpZighKFwiYXJnUGFja0FkdmFuY2VcImluIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJyZWdpc3RlclR5cGUgcmVnaXN0ZXJlZEluc3RhbmNlIHJlcXVpcmVzIGFyZ1BhY2tBZHZhbmNlXCIpO1lhKGEsYixjKX1cbnZhciBaYT0oYSxiLGMpPT57c3dpdGNoKGIpe2Nhc2UgMTpyZXR1cm4gYz9kPT54W2Q+Pj4wPj4+MF06ZD0+QVtkPj4+MD4+PjBdO2Nhc2UgMjpyZXR1cm4gYz9kPT5CW2Q+Pj4xPj4+MF06ZD0+cGFbZD4+PjE+Pj4wXTtjYXNlIDQ6cmV0dXJuIGM/ZD0+RVtkPj4+Mj4+PjBdOmQ9PklbZD4+PjI+Pj4wXTtjYXNlIDg6cmV0dXJuIGM/ZD0+cmFbZD4+PjNdOmQ9PnNhW2Q+Pj4zXTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgaW50ZWdlciB3aWR0aCAoJHtifSk6ICR7YX1gKTt9fTtmdW5jdGlvbiAkYSgpe3RoaXMubWU9W3ZvaWQgMF07dGhpcy53ZT1bXX12YXIgUD1uZXcgJGE7ZnVuY3Rpb24gYWIoYSl7YT4+Pj0wO2E+PVAua2UmJjA9PT0tLVAuZ2V0KGEpLnhlJiZQLnNlKGEpfVxudmFyIFE9YT0+e2lmKCFhKXRocm93IG5ldyBOKFwiQ2Fubm90IHVzZSBkZWxldGVkIHZhbC4gaGFuZGxlID0gXCIrYSk7cmV0dXJuIFAuZ2V0KGEpLnZhbHVlfSxSPWE9Pntzd2l0Y2goYSl7Y2FzZSB2b2lkIDA6cmV0dXJuIDE7Y2FzZSBudWxsOnJldHVybiAyO2Nhc2UgITA6cmV0dXJuIDM7Y2FzZSAhMTpyZXR1cm4gNDtkZWZhdWx0OnJldHVybiBQLnJlKHt4ZToxLHZhbHVlOmF9KX19O2Z1bmN0aW9uIGJiKGEpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShFW2E+Pj4yPj4+MF0pfXZhciBjYj0oYSxiKT0+e3N3aXRjaChiKXtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShxYVtjPj4+Mj4+PjBdKX07Y2FzZSA4OnJldHVybiBmdW5jdGlvbihjKXtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUodGFbYz4+PjM+Pj4wXSl9O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcihgaW52YWxpZCBmbG9hdCB3aWR0aCAoJHtifSk6ICR7YX1gKTt9fTtcbmZ1bmN0aW9uIGRiKGEpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShJW2E+Pj4yPj4+MF0pfVxudmFyIGViPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBUZXh0RGVjb2Rlcj9uZXcgVGV4dERlY29kZXIoXCJ1dGYtMTZsZVwiKTp2b2lkIDAsZmI9KGEsYik9Pnt2YXIgYz1hPj4xO2Zvcih2YXIgZD1jK2IvMjshKGM+PWQpJiZwYVtjPj4+MF07KSsrYztjPDw9MTtpZigzMjxjLWEmJmViKXJldHVybiBlYi5kZWNvZGUoQS5zdWJhcnJheShhPj4+MCxjPj4+MCkpO2M9XCJcIjtmb3IoZD0wOyEoZD49Yi8yKTsrK2Qpe3ZhciBlPUJbYSsyKmQ+Pj4xPj4+MF07aWYoMD09ZSlicmVhaztjKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpfXJldHVybiBjfSxnYj0oYSxiLGMpPT57dm9pZCAwPT09YyYmKGM9MjE0NzQ4MzY0Nyk7aWYoMj5jKXJldHVybiAwO2MtPTI7dmFyIGQ9YjtjPWM8MiphLmxlbmd0aD9jLzI6YS5sZW5ndGg7Zm9yKHZhciBlPTA7ZTxjOysrZSlCW2I+Pj4xPj4+MF09YS5jaGFyQ29kZUF0KGUpLGIrPTI7QltiPj4+MT4+PjBdPTA7cmV0dXJuIGItZH0saGI9YT0+MiphLmxlbmd0aCxpYj0oYSxiKT0+XG57Zm9yKHZhciBjPTAsZD1cIlwiOyEoYz49Yi80KTspe3ZhciBlPUVbYSs0KmM+Pj4yPj4+MF07aWYoMD09ZSlicmVhazsrK2M7NjU1MzY8PWU/KGUtPTY1NTM2LGQrPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUyOTZ8ZT4+MTAsNTYzMjB8ZSYxMDIzKSk6ZCs9U3RyaW5nLmZyb21DaGFyQ29kZShlKX1yZXR1cm4gZH0samI9KGEsYixjKT0+e2I+Pj49MDt2b2lkIDA9PT1jJiYoYz0yMTQ3NDgzNjQ3KTtpZig0PmMpcmV0dXJuIDA7dmFyIGQ9YjtjPWQrYy00O2Zvcih2YXIgZT0wO2U8YS5sZW5ndGg7KytlKXt2YXIgZj1hLmNoYXJDb2RlQXQoZSk7aWYoNTUyOTY8PWYmJjU3MzQzPj1mKXt2YXIgZz1hLmNoYXJDb2RlQXQoKytlKTtmPTY1NTM2KygoZiYxMDIzKTw8MTApfGcmMTAyM31FW2I+Pj4yPj4+MF09ZjtiKz00O2lmKGIrND5jKWJyZWFrfUVbYj4+PjI+Pj4wXT0wO3JldHVybiBiLWR9LGtiPWE9Pntmb3IodmFyIGI9MCxjPTA7YzxhLmxlbmd0aDsrK2Mpe3ZhciBkPWEuY2hhckNvZGVBdChjKTtcbjU1Mjk2PD1kJiY1NzM0Mz49ZCYmKytjO2IrPTR9cmV0dXJuIGJ9LG1iPShhLGIpPT57dmFyIGM9V2FbYV07aWYodm9pZCAwPT09Yyl0aHJvdyBhPWxiKGEpLGM9TShhKSxUKGEpLG5ldyBOKGIrXCIgaGFzIHVua25vd24gdHlwZSBcIitjKTtyZXR1cm4gY30sbmI9e30sb2I9YT0+e3ZhciBiPW5iW2FdO3JldHVybiB2b2lkIDA9PT1iP00oYSk6Yn0scGI9W10scWI9KCk9Plwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpLHJiPWE9Pnt2YXIgYj1wYi5sZW5ndGg7cGIucHVzaChhKTtyZXR1cm4gYn0sc2I9KGEsYik9Pntmb3IodmFyIGM9QXJyYXkoYSksZD0wO2Q8YTsrK2QpY1tkXT1tYihJW2IrNCpkPj4+Mj4+PjBdLFwicGFyYW1ldGVyIFwiK2QpO3JldHVybiBjfSx0Yj1hPT57aWYodm9pZCAwPT09YSlyZXR1cm5cIl91bmtub3duXCI7YT1hLnJlcGxhY2UoL1teYS16QS1aMC05X10vZyxcIiRcIik7dmFyIGI9YS5jaGFyQ29kZUF0KDApO1xucmV0dXJuIDQ4PD1iJiY1Nz49Yj9gXyR7YX1gOmF9LHViPXt9O2Z1bmN0aW9uIHZiKGEsYil7YT10YihhKTtyZXR1cm57W2FdOmZ1bmN0aW9uKCl7cmV0dXJuIGIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX1bYV19ZnVuY3Rpb24gd2IoYSl7dmFyIGI9RnVuY3Rpb247aWYoIShiIGluc3RhbmNlb2YgRnVuY3Rpb24pKXRocm93IG5ldyBUeXBlRXJyb3IoYG5ld18gY2FsbGVkIHdpdGggY29uc3RydWN0b3IgdHlwZSAke3R5cGVvZiBifSB3aGljaCBpcyBub3QgYSBmdW5jdGlvbmApO3ZhciBjPXZiKGIubmFtZXx8XCJ1bmtub3duRnVuY3Rpb25OYW1lXCIsZnVuY3Rpb24oKXt9KTtjLnByb3RvdHlwZT1iLnByb3RvdHlwZTtjPW5ldyBjO2E9Yi5hcHBseShjLGEpO3JldHVybiBhIGluc3RhbmNlb2YgT2JqZWN0P2E6Y31cbnZhciB4Yj1hPT57Zm9yKHZhciBiPVwiXCIsYz0wO2M8YTsrK2MpYis9KDAhPT1jP1wiLCBcIjpcIlwiKStcImFyZ1wiK2M7dmFyIGQ9XCJyZXR1cm4gZnVuY3Rpb24gZW12YWxfYWxsb2NhdG9yX1wiK2ErXCIoY29uc3RydWN0b3IsIGFyZ1R5cGVzLCBhcmdzKSB7XFxuICB2YXIgSEVBUFUzMiA9IGdldE1lbW9yeSgpO1xcblwiO2ZvcihjPTA7YzxhOysrYylkKz1cInZhciBhcmdUeXBlXCIrYytcIiA9IHJlcXVpcmVSZWdpc3RlcmVkVHlwZShIRUFQVTMyWygoYXJnVHlwZXMpPj4+MildLCAncGFyYW1ldGVyIFwiK2MrXCInKTtcXG52YXIgYXJnXCIrYytcIiA9IGFyZ1R5cGVcIitjK1wiLnJlYWRWYWx1ZUZyb21Qb2ludGVyKGFyZ3MpO1xcbmFyZ3MgKz0gYXJnVHlwZVwiK2MrXCJbJ2FyZ1BhY2tBZHZhbmNlJ107XFxuYXJnVHlwZXMgKz0gNDtcXG5cIjtyZXR1cm4obmV3IEZ1bmN0aW9uKFwicmVxdWlyZVJlZ2lzdGVyZWRUeXBlXCIsXCJNb2R1bGVcIixcInZhbHVlVG9IYW5kbGVcIixcImdldE1lbW9yeVwiLGQrKFwidmFyIG9iaiA9IG5ldyBjb25zdHJ1Y3RvcihcIitcbmIrXCIpO1xcbnJldHVybiB2YWx1ZVRvSGFuZGxlKG9iaik7XFxufVxcblwiKSkpKG1iLHAsUiwoKT0+SSl9LHliPXt9LFU9YT0+MD09PWElNCYmKDAhPT1hJTEwMHx8MD09PWElNDAwKSx6Yj1bMCwzMSw2MCw5MSwxMjEsMTUyLDE4MiwyMTMsMjQ0LDI3NCwzMDUsMzM1XSxBYj1bMCwzMSw1OSw5MCwxMjAsMTUxLDE4MSwyMTIsMjQzLDI3MywzMDQsMzM0XSxDYj1hPT57dmFyIGI9UmEoYSkrMSxjPUJiKGIpO2MmJlNhKGEsQSxjLGIpO3JldHVybiBjfSxEYj17fSxGYj0oKT0+e2lmKCFFYil7dmFyIGE9e1VTRVI6XCJ3ZWJfdXNlclwiLExPR05BTUU6XCJ3ZWJfdXNlclwiLFBBVEg6XCIvXCIsUFdEOlwiL1wiLEhPTUU6XCIvaG9tZS93ZWJfdXNlclwiLExBTkc6KFwib2JqZWN0XCI9PXR5cGVvZiBuYXZpZ2F0b3ImJm5hdmlnYXRvci5sYW5ndWFnZXMmJm5hdmlnYXRvci5sYW5ndWFnZXNbMF18fFwiQ1wiKS5yZXBsYWNlKFwiLVwiLFwiX1wiKStcIi5VVEYtOFwiLF86ZGF8fFwiLi90aGlzLnByb2dyYW1cIn0sYjtmb3IoYiBpbiBEYil2b2lkIDA9PT1cbkRiW2JdP2RlbGV0ZSBhW2JdOmFbYl09RGJbYl07dmFyIGM9W107Zm9yKGIgaW4gYSljLnB1c2goYCR7Yn09JHthW2JdfWApO0ViPWN9cmV0dXJuIEVifSxFYixHYj1bbnVsbCxbXSxbXV0sSGI9WzMxLDI5LDMxLDMwLDMxLDMwLDMxLDMxLDMwLDMxLDMwLDMxXSxJYj1bMzEsMjgsMzEsMzAsMzEsMzAsMzEsMzEsMzAsMzEsMzAsMzFdO2Z1bmN0aW9uIEpiKGEpe3ZhciBiPUFycmF5KFJhKGEpKzEpO1NhKGEsYiwwLGIubGVuZ3RoKTtyZXR1cm4gYn1cbmZ1bmN0aW9uIEtiKGEsYixjLGQpe2Z1bmN0aW9uIGUobCx3LHkpe2ZvcihsPVwibnVtYmVyXCI9PXR5cGVvZiBsP2wudG9TdHJpbmcoKTpsfHxcIlwiO2wubGVuZ3RoPHc7KWw9eVswXStsO3JldHVybiBsfWZ1bmN0aW9uIGYobCx3KXtyZXR1cm4gZShsLHcsXCIwXCIpfWZ1bmN0aW9uIGcobCx3KXtmdW5jdGlvbiB5KEMpe3JldHVybiAwPkM/LTE6MDxDPzE6MH12YXIgejswPT09KHo9eShsLmdldEZ1bGxZZWFyKCktdy5nZXRGdWxsWWVhcigpKSkmJjA9PT0oej15KGwuZ2V0TW9udGgoKS13LmdldE1vbnRoKCkpKSYmKHo9eShsLmdldERhdGUoKS13LmdldERhdGUoKSkpO3JldHVybiB6fWZ1bmN0aW9uIGgobCl7c3dpdGNoKGwuZ2V0RGF5KCkpe2Nhc2UgMDpyZXR1cm4gbmV3IERhdGUobC5nZXRGdWxsWWVhcigpLTEsMTEsMjkpO2Nhc2UgMTpyZXR1cm4gbDtjYXNlIDI6cmV0dXJuIG5ldyBEYXRlKGwuZ2V0RnVsbFllYXIoKSwwLDMpO2Nhc2UgMzpyZXR1cm4gbmV3IERhdGUobC5nZXRGdWxsWWVhcigpLFxuMCwyKTtjYXNlIDQ6cmV0dXJuIG5ldyBEYXRlKGwuZ2V0RnVsbFllYXIoKSwwLDEpO2Nhc2UgNTpyZXR1cm4gbmV3IERhdGUobC5nZXRGdWxsWWVhcigpLTEsMTEsMzEpO2Nhc2UgNjpyZXR1cm4gbmV3IERhdGUobC5nZXRGdWxsWWVhcigpLTEsMTEsMzApfX1mdW5jdGlvbiBrKGwpe3ZhciB3PWwubmU7Zm9yKGw9bmV3IERhdGUoKG5ldyBEYXRlKGwub2UrMTkwMCwwLDEpKS5nZXRUaW1lKCkpOzA8dzspe3ZhciB5PWwuZ2V0TW9udGgoKSx6PShVKGwuZ2V0RnVsbFllYXIoKSk/SGI6SWIpW3ldO2lmKHc+ei1sLmdldERhdGUoKSl3LT16LWwuZ2V0RGF0ZSgpKzEsbC5zZXREYXRlKDEpLDExPnk/bC5zZXRNb250aCh5KzEpOihsLnNldE1vbnRoKDApLGwuc2V0RnVsbFllYXIobC5nZXRGdWxsWWVhcigpKzEpKTtlbHNle2wuc2V0RGF0ZShsLmdldERhdGUoKSt3KTticmVha319eT1uZXcgRGF0ZShsLmdldEZ1bGxZZWFyKCkrMSwwLDQpO3c9aChuZXcgRGF0ZShsLmdldEZ1bGxZZWFyKCksXG4wLDQpKTt5PWgoeSk7cmV0dXJuIDA+PWcodyxsKT8wPj1nKHksbCk/bC5nZXRGdWxsWWVhcigpKzE6bC5nZXRGdWxsWWVhcigpOmwuZ2V0RnVsbFllYXIoKS0xfWE+Pj49MDtiPj4+PTA7Yz4+Pj0wO2Q+Pj49MDt2YXIgbT1JW2QrNDA+Pj4yPj4+MF07ZD17TGU6RVtkPj4+Mj4+PjBdLEtlOkVbZCs0Pj4+Mj4+PjBdLHRlOkVbZCs4Pj4+Mj4+PjBdLHZlOkVbZCsxMj4+PjI+Pj4wXSx1ZTpFW2QrMTY+Pj4yPj4+MF0sb2U6RVtkKzIwPj4+Mj4+PjBdLGxlOkVbZCsyND4+PjI+Pj4wXSxuZTpFW2QrMjg+Pj4yPj4+MF0sTmU6RVtkKzMyPj4+Mj4+PjBdLEplOkVbZCszNj4+PjI+Pj4wXSxNZTptP1FhKG0pOlwiXCJ9O2M9UWEoYyk7bT17XCIlY1wiOlwiJWEgJWIgJWQgJUg6JU06JVMgJVlcIixcIiVEXCI6XCIlbS8lZC8leVwiLFwiJUZcIjpcIiVZLSVtLSVkXCIsXCIlaFwiOlwiJWJcIixcIiVyXCI6XCIlSTolTTolUyAlcFwiLFwiJVJcIjpcIiVIOiVNXCIsXCIlVFwiOlwiJUg6JU06JVNcIixcIiV4XCI6XCIlbS8lZC8leVwiLFwiJVhcIjpcIiVIOiVNOiVTXCIsXG5cIiVFY1wiOlwiJWNcIixcIiVFQ1wiOlwiJUNcIixcIiVFeFwiOlwiJW0vJWQvJXlcIixcIiVFWFwiOlwiJUg6JU06JVNcIixcIiVFeVwiOlwiJXlcIixcIiVFWVwiOlwiJVlcIixcIiVPZFwiOlwiJWRcIixcIiVPZVwiOlwiJWVcIixcIiVPSFwiOlwiJUhcIixcIiVPSVwiOlwiJUlcIixcIiVPbVwiOlwiJW1cIixcIiVPTVwiOlwiJU1cIixcIiVPU1wiOlwiJVNcIixcIiVPdVwiOlwiJXVcIixcIiVPVVwiOlwiJVVcIixcIiVPVlwiOlwiJVZcIixcIiVPd1wiOlwiJXdcIixcIiVPV1wiOlwiJVdcIixcIiVPeVwiOlwiJXlcIn07Zm9yKHZhciBuIGluIG0pYz1jLnJlcGxhY2UobmV3IFJlZ0V4cChuLFwiZ1wiKSxtW25dKTt2YXIgdT1cIlN1bmRheSBNb25kYXkgVHVlc2RheSBXZWRuZXNkYXkgVGh1cnNkYXkgRnJpZGF5IFNhdHVyZGF5XCIuc3BsaXQoXCIgXCIpLHY9XCJKYW51YXJ5IEZlYnJ1YXJ5IE1hcmNoIEFwcmlsIE1heSBKdW5lIEp1bHkgQXVndXN0IFNlcHRlbWJlciBPY3RvYmVyIE5vdmVtYmVyIERlY2VtYmVyXCIuc3BsaXQoXCIgXCIpO209e1wiJWFcIjpsPT51W2wubGVdLnN1YnN0cmluZygwLDMpLFwiJUFcIjpsPT51W2wubGVdLFwiJWJcIjpsPT5cbnZbbC51ZV0uc3Vic3RyaW5nKDAsMyksXCIlQlwiOmw9PnZbbC51ZV0sXCIlQ1wiOmw9PmYoKGwub2UrMTkwMCkvMTAwfDAsMiksXCIlZFwiOmw9PmYobC52ZSwyKSxcIiVlXCI6bD0+ZShsLnZlLDIsXCIgXCIpLFwiJWdcIjpsPT5rKGwpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpLFwiJUdcIjpsPT5rKGwpLFwiJUhcIjpsPT5mKGwudGUsMiksXCIlSVwiOmw9PntsPWwudGU7MD09bD9sPTEyOjEyPGwmJihsLT0xMik7cmV0dXJuIGYobCwyKX0sXCIlalwiOmw9Pntmb3IodmFyIHc9MCx5PTA7eTw9bC51ZS0xO3crPShVKGwub2UrMTkwMCk/SGI6SWIpW3krK10pO3JldHVybiBmKGwudmUrdywzKX0sXCIlbVwiOmw9PmYobC51ZSsxLDIpLFwiJU1cIjpsPT5mKGwuS2UsMiksXCIlblwiOigpPT5cIlxcblwiLFwiJXBcIjpsPT4wPD1sLnRlJiYxMj5sLnRlP1wiQU1cIjpcIlBNXCIsXCIlU1wiOmw9PmYobC5MZSwyKSxcIiV0XCI6KCk9PlwiXFx0XCIsXCIldVwiOmw9PmwubGV8fDcsXCIlVVwiOmw9PmYoTWF0aC5mbG9vcigobC5uZSs3LWwubGUpLzcpLDIpLFwiJVZcIjpsPT5cbnt2YXIgdz1NYXRoLmZsb29yKChsLm5lKzctKGwubGUrNiklNykvNyk7Mj49KGwubGUrMzcxLWwubmUtMiklNyYmdysrO2lmKHcpNTM9PXcmJih5PShsLmxlKzM3MS1sLm5lKSU3LDQ9PXl8fDM9PXkmJlUobC5vZSl8fCh3PTEpKTtlbHNle3c9NTI7dmFyIHk9KGwubGUrNy1sLm5lLTEpJTc7KDQ9PXl8fDU9PXkmJlUobC5vZSU0MDAtMSkpJiZ3Kyt9cmV0dXJuIGYodywyKX0sXCIld1wiOmw9PmwubGUsXCIlV1wiOmw9PmYoTWF0aC5mbG9vcigobC5uZSs3LShsLmxlKzYpJTcpLzcpLDIpLFwiJXlcIjpsPT4obC5vZSsxOTAwKS50b1N0cmluZygpLnN1YnN0cmluZygyKSxcIiVZXCI6bD0+bC5vZSsxOTAwLFwiJXpcIjpsPT57bD1sLkplO3ZhciB3PTA8PWw7bD1NYXRoLmFicyhsKS82MDtyZXR1cm4odz9cIitcIjpcIi1cIikrU3RyaW5nKFwiMDAwMFwiKyhsLzYwKjEwMCtsJTYwKSkuc2xpY2UoLTQpfSxcIiVaXCI6bD0+bC5NZSxcIiUlXCI6KCk9PlwiJVwifTtjPWMucmVwbGFjZSgvJSUvZyxcIlxceDAwXFx4MDBcIik7Zm9yKG4gaW4gbSljLmluY2x1ZGVzKG4pJiZcbihjPWMucmVwbGFjZShuZXcgUmVnRXhwKG4sXCJnXCIpLG1bbl0oZCkpKTtjPWMucmVwbGFjZSgvXFwwXFwwL2csXCIlXCIpO249SmIoYyk7aWYobi5sZW5ndGg+YilyZXR1cm4gMDt4LnNldChuLGE+Pj4wKTtyZXR1cm4gbi5sZW5ndGgtMX1mb3IodmFyIExiPVtdLE1iLFY9YT0+e3ZhciBiPUxiW2FdO2J8fChhPj1MYi5sZW5ndGgmJihMYi5sZW5ndGg9YSsxKSxMYlthXT1iPU1iLmdldChhKSk7cmV0dXJuIGJ9LE5iPUFycmF5KDI1NiksT2I9MDsyNTY+T2I7KytPYilOYltPYl09U3RyaW5nLmZyb21DaGFyQ29kZShPYik7VWE9TmI7Tj1wLkJpbmRpbmdFcnJvcj1jbGFzcyBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKGEpe3N1cGVyKGEpO3RoaXMubmFtZT1cIkJpbmRpbmdFcnJvclwifX07cC5JbnRlcm5hbEVycm9yPWNsYXNzIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoYSl7c3VwZXIoYSk7dGhpcy5uYW1lPVwiSW50ZXJuYWxFcnJvclwifX07XG5PYmplY3QuYXNzaWduKCRhLnByb3RvdHlwZSx7Z2V0KGEpe3JldHVybiB0aGlzLm1lW2FdfSxoYXMoYSl7cmV0dXJuIHZvaWQgMCE9PXRoaXMubWVbYV19LHJlKGEpe3ZhciBiPXRoaXMud2UucG9wKCl8fHRoaXMubWUubGVuZ3RoO3RoaXMubWVbYl09YTtyZXR1cm4gYn0sc2UoYSl7dGhpcy5tZVthXT12b2lkIDA7dGhpcy53ZS5wdXNoKGEpfX0pO1AubWUucHVzaCh7dmFsdWU6dm9pZCAwfSx7dmFsdWU6bnVsbH0se3ZhbHVlOiEwfSx7dmFsdWU6ITF9KTtQLmtlPVAubWUubGVuZ3RoO3AuY291bnRfZW12YWxfaGFuZGxlcz0oKT0+e2Zvcih2YXIgYT0wLGI9UC5rZTtiPFAubWUubGVuZ3RoOysrYil2b2lkIDAhPT1QLm1lW2JdJiYrK2E7cmV0dXJuIGF9O1xudmFyIFplPXt1OmZ1bmN0aW9uKGEpe2E9bmV3IEphKGE+Pj4wKTthLkVlKCl8fChhLnllKCEwKSxJYS0tKTthLnplKCExKTtIYS5wdXNoKGEpO1BiKGEucWUpO3JldHVybiBhLkZlKCl9LE06KCk9PntXKDAsMCk7dmFyIGE9SGEucG9wKCk7UWIoYS5xZSk7TD0wfSxhOmZ1bmN0aW9uKCl7cmV0dXJuIE5hKFtdKX0sbDpmdW5jdGlvbihhKXtyZXR1cm4gTmEoW2E+Pj4wXSl9LHg6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gTmEoW2E+Pj4wLGI+Pj4wXSl9LHE6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBOYShbYT4+PjAsYj4+PjAsYz4+PjBdKX0seGI6KCk9Pnt2YXIgYT1IYS5wb3AoKTthfHxtYShcIm5vIGV4Y2VwdGlvbiB0byB0aHJvd1wiKTt2YXIgYj1hLnFlO2EuQWUoKXx8KEhhLnB1c2goYSksYS56ZSghMCksYS55ZSghMSksSWErKyk7TD1iO3Rocm93IEw7fSx0OmZ1bmN0aW9uKGEsYixjKXthPj4+PTA7KG5ldyBKYShhKSkuR2UoYj4+PjAsYz4+PjApO0w9YTtJYSsrO3Rocm93IEw7fSxSYTooKT0+XG5JYSxnOmZ1bmN0aW9uKGEpe0x8fChMPWE+Pj4wKTt0aHJvdyBMO30seWI6ZnVuY3Rpb24oKXtyZXR1cm4gMH0sVWM6ZnVuY3Rpb24oKXt9LERjOmZ1bmN0aW9uKCl7fSxGYzpmdW5jdGlvbigpe30seGM6ZnVuY3Rpb24oKXtyZXR1cm4gMH0sU2M6ZnVuY3Rpb24oKXt9LE1jOmZ1bmN0aW9uKCl7fSxSYzpmdW5jdGlvbigpe30sUmI6ZnVuY3Rpb24oKXt9LEVjOmZ1bmN0aW9uKCl7fSxCYzpmdW5jdGlvbigpe30sVGM6ZnVuY3Rpb24oKXt9LENjOmZ1bmN0aW9uKCl7fSxVYjpmdW5jdGlvbihhLGIsYyxkLGUpe2I+Pj49MDtiPU0oYik7dmFyIGY9LTEhPWIuaW5kZXhPZihcInVcIik7ZiYmKGU9KDFuPDw2NG4pLTFuKTtPKGE+Pj4wLHtuYW1lOmIsZnJvbVdpcmVUeXBlOmc9PmcsdG9XaXJlVHlwZTpmdW5jdGlvbihnLGgpe2lmKFwiYmlnaW50XCIhPXR5cGVvZiBoJiZcIm51bWJlclwiIT10eXBlb2YgaCl0aHJvdyBuZXcgVHlwZUVycm9yKGBDYW5ub3QgY29udmVydCBcIiR7VGEoaCl9XCIgdG8gJHt0aGlzLm5hbWV9YCk7XG5pZihoPGR8fGg+ZSl0aHJvdyBuZXcgVHlwZUVycm9yKGBQYXNzaW5nIGEgbnVtYmVyIFwiJHtUYShoKX1cIiBmcm9tIEpTIHNpZGUgdG8gQy9DKysgc2lkZSB0byBhbiBhcmd1bWVudCBvZiB0eXBlIFwiJHtifVwiLCB3aGljaCBpcyBvdXRzaWRlIHRoZSB2YWxpZCByYW5nZSBbJHtkfSwgJHtlfV0hYCk7cmV0dXJuIGh9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6WmEoYixjPj4+MCwhZikscGU6bnVsbH0pfSxYYzpmdW5jdGlvbihhLGIsYyxkKXtiPU0oYj4+PjApO08oYT4+PjAse25hbWU6Yixmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7cmV0dXJuISFlfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGUsZil7cmV0dXJuIGY/YzpkfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShBW2U+Pj4wXSl9LHBlOm51bGx9KX0sV2M6ZnVuY3Rpb24oYSxiKXtiPU0oYj4+PjApO08oYT4+PjAse25hbWU6YixcbmZyb21XaXJlVHlwZTpjPT57dmFyIGQ9UShjKTthYihjKTtyZXR1cm4gZH0sdG9XaXJlVHlwZTooYyxkKT0+UihkKSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmJiLHBlOm51bGx9KX0sVGI6ZnVuY3Rpb24oYSxiLGMpe2I9TShiPj4+MCk7TyhhPj4+MCx7bmFtZTpiLGZyb21XaXJlVHlwZTpkPT5kLHRvV2lyZVR5cGU6KGQsZSk9PmUsYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpjYihiLGM+Pj4wKSxwZTpudWxsfSl9LHVhOmZ1bmN0aW9uKGEsYixjLGQsZSl7YT4+Pj0wO2M+Pj49MDtiPU0oYj4+PjApOy0xPT09ZSYmKGU9NDI5NDk2NzI5NSk7ZT1oPT5oO2lmKDA9PT1kKXt2YXIgZj0zMi04KmM7ZT1oPT5oPDxmPj4+Zn12YXIgZz1iLmluY2x1ZGVzKFwidW5zaWduZWRcIik/ZnVuY3Rpb24oaCxrKXtyZXR1cm4gaz4+PjB9OmZ1bmN0aW9uKGgsayl7cmV0dXJuIGt9O08oYSx7bmFtZTpiLGZyb21XaXJlVHlwZTplLHRvV2lyZVR5cGU6ZyxhcmdQYWNrQWR2YW5jZTo4LFxucmVhZFZhbHVlRnJvbVBvaW50ZXI6WmEoYixjLDAhPT1kKSxwZTpudWxsfSl9LF86ZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGQoZil7cmV0dXJuIG5ldyBlKHguYnVmZmVyLElbZis0Pj4+Mj4+PjBdLElbZj4+PjI+Pj4wXSl9dmFyIGU9W0ludDhBcnJheSxVaW50OEFycmF5LEludDE2QXJyYXksVWludDE2QXJyYXksSW50MzJBcnJheSxVaW50MzJBcnJheSxGbG9hdDMyQXJyYXksRmxvYXQ2NEFycmF5LEJpZ0ludDY0QXJyYXksQmlnVWludDY0QXJyYXldW2JdO2M9TShjPj4+MCk7TyhhPj4+MCx7bmFtZTpjLGZyb21XaXJlVHlwZTpkLGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6ZH0se0JlOiEwfSl9LFZiOmZ1bmN0aW9uKGEsYil7Yj1NKGI+Pj4wKTt2YXIgYz1cInN0ZDo6c3RyaW5nXCI9PT1iO08oYT4+PjAse25hbWU6Yixmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZCl7dmFyIGU9SVtkPj4+Mj4+PjBdLGY9ZCs0O2lmKGMpZm9yKHZhciBnPWYsaD0wO2g8PWU7KytoKXt2YXIgaz1cbmYraDtpZihoPT1lfHwwPT1BW2s+Pj4wXSl7Zz1RYShnLGstZyk7aWYodm9pZCAwPT09bSl2YXIgbT1nO2Vsc2UgbSs9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSxtKz1nO2c9aysxfX1lbHNle209QXJyYXkoZSk7Zm9yKGg9MDtoPGU7KytoKW1baF09U3RyaW5nLmZyb21DaGFyQ29kZShBW2YraD4+PjBdKTttPW0uam9pbihcIlwiKX1UKGQpO3JldHVybiBtfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGQsZSl7ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyJiYoZT1uZXcgVWludDhBcnJheShlKSk7dmFyIGY9XCJzdHJpbmdcIj09dHlwZW9mIGU7aWYoIShmfHxlIGluc3RhbmNlb2YgVWludDhBcnJheXx8ZSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHxlIGluc3RhbmNlb2YgSW50OEFycmF5KSl0aHJvdyBuZXcgTihcIkNhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gc3RkOjpzdHJpbmdcIik7dmFyIGc9YyYmZj9SYShlKTplLmxlbmd0aDt2YXIgaD1CYig0K2crMSksaz1oKzQ7SVtoPj4+Mj4+PjBdPVxuZztpZihjJiZmKVNhKGUsQSxrLGcrMSk7ZWxzZSBpZihmKWZvcihmPTA7ZjxnOysrZil7dmFyIG09ZS5jaGFyQ29kZUF0KGYpO2lmKDI1NTxtKXRocm93IFQoayksbmV3IE4oXCJTdHJpbmcgaGFzIFVURi0xNiBjb2RlIHVuaXRzIHRoYXQgZG8gbm90IGZpdCBpbiA4IGJpdHNcIik7QVtrK2Y+Pj4wXT1tfWVsc2UgZm9yKGY9MDtmPGc7KytmKUFbaytmPj4+MF09ZVtmXTtudWxsIT09ZCYmZC5wdXNoKFQsaCk7cmV0dXJuIGh9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6ZGIscGUoZCl7VChkKX19KX0sQWI6ZnVuY3Rpb24oYSxiLGMpe2I+Pj49MDtjPj4+PTA7Yz1NKGMpO2lmKDI9PT1iKXt2YXIgZD1mYjt2YXIgZT1nYjt2YXIgZj1oYjt2YXIgZz0oKT0+cGE7dmFyIGg9MX1lbHNlIDQ9PT1iJiYoZD1pYixlPWpiLGY9a2IsZz0oKT0+SSxoPTIpO08oYT4+PjAse25hbWU6Yyxmcm9tV2lyZVR5cGU6az0+e2Zvcih2YXIgbT1JW2s+Pj4yPj4+MF0sbj1nKCksdSx2PWsrXG40LGw9MDtsPD1tOysrbCl7dmFyIHc9ays0K2wqYjtpZihsPT1tfHwwPT1uW3c+Pj5oXSl2PWQodix3LXYpLHZvaWQgMD09PXU/dT12Oih1Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKDApLHUrPXYpLHY9dytifVQoayk7cmV0dXJuIHV9LHRvV2lyZVR5cGU6KGssbSk9PntpZihcInN0cmluZ1wiIT10eXBlb2YgbSl0aHJvdyBuZXcgTihgQ2Fubm90IHBhc3Mgbm9uLXN0cmluZyB0byBDKysgc3RyaW5nIHR5cGUgJHtjfWApO3ZhciBuPWYobSksdT1CYig0K24rYik7SVt1Pj4+Ml09bj4+aDtlKG0sdSs0LG4rYik7bnVsbCE9PWsmJmsucHVzaChULHUpO3JldHVybiB1fSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmJiLHBlKGspe1Qoayl9fSl9LCRjOmZ1bmN0aW9uKGEsYil7Yj1NKGI+Pj4wKTtPKGE+Pj4wLHtDZTohMCxuYW1lOmIsYXJnUGFja0FkdmFuY2U6MCxmcm9tV2lyZVR5cGU6KCk9Pnt9LHRvV2lyZVR5cGU6KCk9Pnt9fSl9LFZjOigpPT4hMCxvZDpmdW5jdGlvbihhLFxuYixjKXtiPj4+PTA7Yz4+Pj0wO2E9UShhPj4+MCk7Yj1tYihiLFwiZW12YWw6OmFzXCIpO3ZhciBkPVtdLGU9UihkKTtJW2M+Pj4yPj4+MF09ZTtyZXR1cm4gYi50b1dpcmVUeXBlKGQsYSl9LGxhOmZ1bmN0aW9uKGEsYixjLGQsZSl7Yz4+Pj0wO2Q+Pj49MDtlPj4+PTA7YT1wYlthPj4+MF07Yj1RKGI+Pj4wKTtjPW9iKGMpO3ZhciBmPVtdO0lbZD4+PjI+Pj4wXT1SKGYpO3JldHVybiBhKGIsYyxmLGUpfSxkZDpmdW5jdGlvbihhLGIsYyxkKXtjPj4+PTA7ZD4+Pj0wO2E9cGJbYT4+PjBdO2I9UShiPj4+MCk7Yz1vYihjKTthKGIsYyxudWxsLGQpfSx3YzphYixwZDpmdW5jdGlvbihhLGIpe2I+Pj49MDthPVEoYT4+PjApO2I9UShiKTtyZXR1cm4gYT09Yn0sdmM6ZnVuY3Rpb24oYSl7YT4+Pj0wO2lmKDA9PT1hKXJldHVybiBSKHFiKCkpO2E9b2IoYSk7cmV0dXJuIFIocWIoKVthXSl9LGphOmZ1bmN0aW9uKGEsYil7dmFyIGM9c2IoYSxiPj4+MCksZD1jWzBdO2I9ZC5uYW1lK1wiXyRcIitjLnNsaWNlKDEpLm1hcChmdW5jdGlvbihuKXtyZXR1cm4gbi5uYW1lfSkuam9pbihcIl9cIikrXG5cIiRcIjt2YXIgZT11YltiXTtpZih2b2lkIDAhPT1lKXJldHVybiBlO2U9W1wicmV0VHlwZVwiXTtmb3IodmFyIGY9W2RdLGc9XCJcIixoPTA7aDxhLTE7KytoKWcrPSgwIT09aD9cIiwgXCI6XCJcIikrXCJhcmdcIitoLGUucHVzaChcImFyZ1R5cGVcIitoKSxmLnB1c2goY1sxK2hdKTt2YXIgaz1cInJldHVybiBmdW5jdGlvbiBcIit0YihcIm1ldGhvZENhbGxlcl9cIitiKStcIihoYW5kbGUsIG5hbWUsIGRlc3RydWN0b3JzLCBhcmdzKSB7XFxuXCIsbT0wO2ZvcihoPTA7aDxhLTE7KytoKWsrPVwiICAgIHZhciBhcmdcIitoK1wiID0gYXJnVHlwZVwiK2grXCIucmVhZFZhbHVlRnJvbVBvaW50ZXIoYXJnc1wiKyhtP1wiK1wiK206XCJcIikrXCIpO1xcblwiLG0rPWNbaCsxXS5hcmdQYWNrQWR2YW5jZTtrKz1cIiAgICB2YXIgcnYgPSBoYW5kbGVbbmFtZV0oXCIrZytcIik7XFxuXCI7Zm9yKGg9MDtoPGEtMTsrK2gpY1toKzFdLmRlbGV0ZU9iamVjdCYmKGsrPVwiICAgIGFyZ1R5cGVcIitoK1wiLmRlbGV0ZU9iamVjdChhcmdcIitoK1wiKTtcXG5cIik7ZC5DZXx8XG4oays9XCIgICAgcmV0dXJuIHJldFR5cGUudG9XaXJlVHlwZShkZXN0cnVjdG9ycywgcnYpO1xcblwiKTtlLnB1c2goaytcIn07XFxuXCIpO2E9d2IoZSkuYXBwbHkobnVsbCxmKTtlPXJiKGEpO3JldHVybiB1YltiXT1lfSxpZDpmdW5jdGlvbihhLGIpe2I+Pj49MDthPVEoYT4+PjApO2I9UShiKTtyZXR1cm4gUihhW2JdKX0sUDpmdW5jdGlvbihhKXthPj4+PTA7NDxhJiYoUC5nZXQoYSkueGUrPTEpfSxxZDpmdW5jdGlvbihhLGIsYyxkKXtjPj4+PTA7ZD4+Pj0wO2E9UShhPj4+MCk7dmFyIGU9eWJbYl07ZXx8KGU9eGIoYikseWJbYl09ZSk7cmV0dXJuIGUoYSxjLGQpfSxoZDpmdW5jdGlvbigpe3JldHVybiBSKFtdKX0sbGQ6ZnVuY3Rpb24oYSl7YT1RKGE+Pj4wKTtmb3IodmFyIGI9QXJyYXkoYS5sZW5ndGgpLGM9MDtjPGEubGVuZ3RoO2MrKyliW2NdPWFbY107cmV0dXJuIFIoYil9LFg6ZnVuY3Rpb24oYSl7cmV0dXJuIFIob2IoYT4+PjApKX0sUWE6ZnVuY3Rpb24oKXtyZXR1cm4gUih7fSl9LFxucmQ6ZnVuY3Rpb24oYSl7YT4+Pj0wO2Zvcih2YXIgYj1RKGEpO2IubGVuZ3RoOyl7dmFyIGM9Yi5wb3AoKTtiLnBvcCgpKGMpfWFiKGEpfSx0ZDpmdW5jdGlvbihhLGIsYyl7Yj4+Pj0wO2M+Pj49MDthPVEoYT4+PjApO2I9UShiKTtjPVEoYyk7YVtiXT1jfSx2YjpmdW5jdGlvbihhLGIpe2I+Pj49MDthPW1iKGE+Pj4wLFwiX2VtdmFsX3Rha2VfdmFsdWVcIik7YT1hLnJlYWRWYWx1ZUZyb21Qb2ludGVyKGIpO3JldHVybiBSKGEpfSxKYzpmdW5jdGlvbihhLGIpe2E9LTkwMDcxOTkyNTQ3NDA5OTI+YXx8OTAwNzE5OTI1NDc0MDk5MjxhP05hTjpOdW1iZXIoYSk7Yj4+Pj0wO2E9bmV3IERhdGUoMUUzKmEpO0VbYj4+PjI+Pj4wXT1hLmdldFVUQ1NlY29uZHMoKTtFW2IrND4+PjI+Pj4wXT1hLmdldFVUQ01pbnV0ZXMoKTtFW2IrOD4+PjI+Pj4wXT1hLmdldFVUQ0hvdXJzKCk7RVtiKzEyPj4+Mj4+PjBdPWEuZ2V0VVRDRGF0ZSgpO0VbYisxNj4+PjI+Pj4wXT1hLmdldFVUQ01vbnRoKCk7RVtiK1xuMjA+Pj4yPj4+MF09YS5nZXRVVENGdWxsWWVhcigpLTE5MDA7RVtiKzI0Pj4+Mj4+PjBdPWEuZ2V0VVRDRGF5KCk7RVtiKzI4Pj4+Mj4+PjBdPShhLmdldFRpbWUoKS1EYXRlLlVUQyhhLmdldFVUQ0Z1bGxZZWFyKCksMCwxLDAsMCwwLDApKS84NjRFNXwwfSxLYzpmdW5jdGlvbihhLGIpe2E9LTkwMDcxOTkyNTQ3NDA5OTI+YXx8OTAwNzE5OTI1NDc0MDk5MjxhP05hTjpOdW1iZXIoYSk7Yj4+Pj0wO2E9bmV3IERhdGUoMUUzKmEpO0VbYj4+PjI+Pj4wXT1hLmdldFNlY29uZHMoKTtFW2IrND4+PjI+Pj4wXT1hLmdldE1pbnV0ZXMoKTtFW2IrOD4+PjI+Pj4wXT1hLmdldEhvdXJzKCk7RVtiKzEyPj4+Mj4+PjBdPWEuZ2V0RGF0ZSgpO0VbYisxNj4+PjI+Pj4wXT1hLmdldE1vbnRoKCk7RVtiKzIwPj4+Mj4+PjBdPWEuZ2V0RnVsbFllYXIoKS0xOTAwO0VbYisyND4+PjI+Pj4wXT1hLmdldERheSgpO0VbYisyOD4+PjI+Pj4wXT0oVShhLmdldEZ1bGxZZWFyKCkpP3piOkFiKVthLmdldE1vbnRoKCldK1xuYS5nZXREYXRlKCktMXwwO0VbYiszNj4+PjI+Pj4wXT0tKDYwKmEuZ2V0VGltZXpvbmVPZmZzZXQoKSk7dmFyIGM9KG5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSw2LDEpKS5nZXRUaW1lem9uZU9mZnNldCgpLGQ9KG5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSwwLDEpKS5nZXRUaW1lem9uZU9mZnNldCgpO0VbYiszMj4+PjI+Pj4wXT0oYyE9ZCYmYS5nZXRUaW1lem9uZU9mZnNldCgpPT1NYXRoLm1pbihkLGMpKXwwfSxMYzpmdW5jdGlvbihhKXthPj4+PTA7dmFyIGI9bmV3IERhdGUoRVthKzIwPj4+Mj4+PjBdKzE5MDAsRVthKzE2Pj4+Mj4+PjBdLEVbYSsxMj4+PjI+Pj4wXSxFW2ErOD4+PjI+Pj4wXSxFW2ErND4+PjI+Pj4wXSxFW2E+Pj4yPj4+MF0sMCksYz1FW2ErMzI+Pj4yPj4+MF0sZD1iLmdldFRpbWV6b25lT2Zmc2V0KCksZT0obmV3IERhdGUoYi5nZXRGdWxsWWVhcigpLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksZj0obmV3IERhdGUoYi5nZXRGdWxsWWVhcigpLDAsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksXG5nPU1hdGgubWluKGYsZSk7MD5jP0VbYSszMj4+PjI+Pj4wXT1OdW1iZXIoZSE9ZiYmZz09ZCk6MDxjIT0oZz09ZCkmJihlPU1hdGgubWF4KGYsZSksYi5zZXRUaW1lKGIuZ2V0VGltZSgpKzZFNCooKDA8Yz9nOmUpLWQpKSk7RVthKzI0Pj4+Mj4+PjBdPWIuZ2V0RGF5KCk7RVthKzI4Pj4+Mj4+PjBdPShVKGIuZ2V0RnVsbFllYXIoKSk/emI6QWIpW2IuZ2V0TW9udGgoKV0rYi5nZXREYXRlKCktMXwwO0VbYT4+PjI+Pj4wXT1iLmdldFNlY29uZHMoKTtFW2ErND4+PjI+Pj4wXT1iLmdldE1pbnV0ZXMoKTtFW2ErOD4+PjI+Pj4wXT1iLmdldEhvdXJzKCk7RVthKzEyPj4+Mj4+PjBdPWIuZ2V0RGF0ZSgpO0VbYSsxNj4+PjI+Pj4wXT1iLmdldE1vbnRoKCk7RVthKzIwPj4+Mj4+PjBdPWIuZ2V0WWVhcigpO3JldHVybiBCaWdJbnQoYi5nZXRUaW1lKCkvMUUzKX0sR2M6ZnVuY3Rpb24oKXtyZXR1cm4tNTJ9LEljOmZ1bmN0aW9uKCl7fSx6YzpmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChrKXtyZXR1cm4oaz1cbmsudG9UaW1lU3RyaW5nKCkubWF0Y2goL1xcKChbQS1aYS16IF0rKVxcKSQvKSk/a1sxXTpcIkdNVFwifWM+Pj49MDt2YXIgZT0obmV3IERhdGUpLmdldEZ1bGxZZWFyKCksZj1uZXcgRGF0ZShlLDAsMSksZz1uZXcgRGF0ZShlLDYsMSk7ZT1mLmdldFRpbWV6b25lT2Zmc2V0KCk7dmFyIGg9Zy5nZXRUaW1lem9uZU9mZnNldCgpO0lbYT4+PjA+Pj4yPj4+MF09NjAqTWF0aC5tYXgoZSxoKTtFW2I+Pj4wPj4+Mj4+PjBdPU51bWJlcihlIT1oKTthPWQoZik7Yj1kKGcpO2E9Q2IoYSk7Yj1DYihiKTtoPGU/KElbYz4+PjI+Pj4wXT1hLElbYys0Pj4+Mj4+PjBdPWIpOihJW2M+Pj4yPj4+MF09YixJW2MrND4+PjI+Pj4wXT1hKX0saGI6KCk9PnttYShcIlwiKX0sU2I6KCk9PkRhdGUubm93KCksQWM6ZnVuY3Rpb24oKXtyZXR1cm4gNDI5NDkwMTc2MH0sZGE6KCk9PnBlcmZvcm1hbmNlLm5vdygpLFFjOmZ1bmN0aW9uKGEsYixjKXtiPj4+PTA7cmV0dXJuIEEuY29weVdpdGhpbihhPj4+MD4+PjAsYj4+PlxuMCxiKyhjPj4+MCk+Pj4wKX0seWM6ZnVuY3Rpb24oYSl7YT4+Pj0wO3ZhciBiPUEubGVuZ3RoO2lmKDQyOTQ5MDE3NjA8YSlyZXR1cm4hMTtmb3IodmFyIGM9MTs0Pj1jO2MqPTIpe3ZhciBkPWIqKDErLjIvYyk7ZD1NYXRoLm1pbihkLGErMTAwNjYzMjk2KTt2YXIgZT1NYXRoO2Q9TWF0aC5tYXgoYSxkKTthOntlPShlLm1pbi5jYWxsKGUsNDI5NDkwMTc2MCxkKyg2NTUzNi1kJTY1NTM2KSU2NTUzNiktbmEuYnVmZmVyLmJ5dGVMZW5ndGgrNjU1MzUpLzY1NTM2O3RyeXtuYS5ncm93KGUpO3VhKCk7dmFyIGY9MTticmVhayBhfWNhdGNoKGcpe31mPXZvaWQgMH1pZihmKXJldHVybiEwfXJldHVybiExfSxPYzpmdW5jdGlvbihhLGIpe2E+Pj49MDtiPj4+PTA7dmFyIGM9MDtGYigpLmZvckVhY2goKGQsZSk9Pnt2YXIgZj1iK2M7ZT1JW2ErNCplPj4+Mj4+PjBdPWY7Zm9yKGY9MDtmPGQubGVuZ3RoOysrZil4W2UrKz4+PjA+Pj4wXT1kLmNoYXJDb2RlQXQoZik7eFtlPj4+MD4+PjBdPTA7XG5jKz1kLmxlbmd0aCsxfSk7cmV0dXJuIDB9LFBjOmZ1bmN0aW9uKGEsYil7YT4+Pj0wO2I+Pj49MDt2YXIgYz1GYigpO0lbYT4+PjI+Pj4wXT1jLmxlbmd0aDt2YXIgZD0wO2MuZm9yRWFjaChlPT5kKz1lLmxlbmd0aCsxKTtJW2I+Pj4yPj4+MF09ZDtyZXR1cm4gMH0semI6KCk9PjUyLFFiOmZ1bmN0aW9uKCl7cmV0dXJuIDUyfSxOYzpmdW5jdGlvbigpe3JldHVybiA3MH0sUGI6ZnVuY3Rpb24oYSxiLGMsZCl7Yj4+Pj0wO2M+Pj49MDtkPj4+PTA7Zm9yKHZhciBlPTAsZj0wO2Y8YztmKyspe3ZhciBnPUlbYj4+PjI+Pj4wXSxoPUlbYis0Pj4+Mj4+PjBdO2IrPTg7Zm9yKHZhciBrPTA7azxoO2srKyl7dmFyIG09QVtnK2s+Pj4wXSxuPUdiW2FdOzA9PT1tfHwxMD09PW0/KCgxPT09YT9sYTp0KShQYShuLDApKSxuLmxlbmd0aD0wKTpuLnB1c2gobSl9ZSs9aH1JW2Q+Pj4yPj4+MF09ZTtyZXR1cm4gMH0sZ2I6UmIsWWM6U2IscmE6VGIsRTpVYixwYTpWYixlYTpXYixaYzpYYixiZDpZYixcbk46WmIsejokYixiOmFjLF9iOmJjLHNhOmNjLGU6ZGMsQ2I6ZWMsaDpmYyxXOmdjLGk6aGMsX2M6aWMsajpqYyxyOmtjLHM6bGMsbzptYyx6YTpuYyxVYTpvYyxnYTpwYyxOYjpxYyxZYTpyYyxHYjpzYyxrYjp0YyxkYzp1YyxxYzp2YyxhYzp3YyxiYzp4YyxXYjp5YyxpYTp6YyxmYjpBYyx3YTpCYyxCYjpDYyxiYTpEYyxjYzpFYyxPYTpGYyxEOkdjLEs6SGMsRWI6SWMsZ2Q6SmMsb2E6S2MsTDpMYywkOk1jLFQ6TmMseTpPYyxEYjpQYywkYjpRYyxCOlJjLEZiOlNjLGZkOlRjLFBhOlVjLGFiOlZjLGVjOldjLFhiOlhjLEtiOlljLFY6WmMsRjokYyxDOmFkLCRhOmJkLE86Y2QsZDpkZCxXYTplZCxrOmZkLHZhOmdkLFZhOmhkLHNiOmpkLGY6a2QscmM6bGQsYWE6bWQsYmI6bmQseGE6b2QsamI6cGQsZGI6cWQsYzpyZCxvYzpzZCxqZDp0ZCxtOnVkLG1jOnZkLG46d2QscGM6eGQsbGM6eWQsbWQ6emQscDpBZCxNYTpCZCxxYjpDZCxMYTpEZCxJYjpFZCxBOkZkLEg6R2QsVTpIZCxUYTpJZCxcbmljOkpkLGNiOktkLHRhOkxkLG1hOk1kLFE6TmQsWmE6T2QsR2E6UGQsaWI6UWQsQ2E6UmQsZ2M6U2QsQmE6VGQsRGE6VWQsc2Q6VmQsbmE6V2Qsa2Q6WGQsSGE6WWQsRmE6WmQsc2M6JGQsa2M6YWUsRWE6YmUsSWE6Y2UsbWI6ZGUsZmE6ZWUseWE6ZmUsZmM6Z2UsamM6aGUsSGI6aWUsQWE6amUsa2E6a2Usd2I6bGUsZWQ6bWUsUjpuZSx0YjpvZSxTYTpwZSxlYjpxZSxJOnJlLFM6c2UsdWI6dGUsY2Q6dWUsWjp2ZSxsYjp3ZSxoYTp4ZSxZYjp5ZSx1ZDp6ZSx3OkFlLF9hOkJlLG5kOkNlLExiOkRlLGhjOkVlLHVjOkZlLE1iOkdlLEpiOkhlLFhhOkllLHRjOkplLE9iOktlLEphOkxlLFpiOk1lLFk6TmUsbmM6T2UsSjpQZSxhZDpRZSxyYjpSZSxxYTpTZSxHOlRlLG9iOlVlLEthOlZlLE5hOldlLG5iOlhlLHBiOlllLHY6ZnVuY3Rpb24oYSl7cmV0dXJuIGE+Pj4wfSxIYzpLYixjYTpmdW5jdGlvbihhLGIsYyxkKXtyZXR1cm4gS2IoYT4+PjAsYj4+PjAsYz4+PjAsZD4+PjApfX0sWD1mdW5jdGlvbigpe3ZhciBhPVxue2E6WmV9O0orKztGYShhLGZ1bmN0aW9uKGIpe1g9Yi5pbnN0YW5jZS5leHBvcnRzO1g9JGUoKTtuYT1YLnZkO3VhKCk7TWI9WC5hZTt3YS51bnNoaWZ0KFgud2QpO0otLTswPT1KJiYobnVsbCE9PXlhJiYoY2xlYXJJbnRlcnZhbCh5YSkseWE9bnVsbCksSyYmKGI9SyxLPW51bGwsYigpKSl9KS5jYXRjaChiYSk7cmV0dXJue319KCk7cC5fT3J0SW5pdD0oYSxiKT0+KHAuX09ydEluaXQ9WC54ZCkoYSxiKTtwLl9PcnRHZXRMYXN0RXJyb3I9KGEsYik9PihwLl9PcnRHZXRMYXN0RXJyb3I9WC55ZCkoYSxiKTtwLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucz0oYSxiLGMsZCxlLGYsZyxoLGssbSk9PihwLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucz1YLnpkKShhLGIsYyxkLGUsZixnLGgsayxtKTtwLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcj0oYSxiKT0+KHAuX09ydEFwcGVuZEV4ZWN1dGlvblByb3ZpZGVyPVguQWQpKGEsYik7XG5wLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGU9KGEsYixjKT0+KHAuX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZT1YLkJkKShhLGIsYyk7cC5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5PShhLGIsYyk9PihwLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnk9WC5DZCkoYSxiLGMpO3AuX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucz1hPT4ocC5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zPVguRGQpKGEpO3AuX09ydENyZWF0ZVNlc3Npb249KGEsYixjKT0+KHAuX09ydENyZWF0ZVNlc3Npb249WC5FZCkoYSxiLGMpO3AuX09ydFJlbGVhc2VTZXNzaW9uPWE9PihwLl9PcnRSZWxlYXNlU2Vzc2lvbj1YLkZkKShhKTtwLl9PcnRHZXRJbnB1dE91dHB1dENvdW50PShhLGIsYyk9PihwLl9PcnRHZXRJbnB1dE91dHB1dENvdW50PVguR2QpKGEsYixjKTtwLl9PcnRHZXRJbnB1dE5hbWU9KGEsYik9PihwLl9PcnRHZXRJbnB1dE5hbWU9WC5IZCkoYSxiKTtcbnAuX09ydEdldE91dHB1dE5hbWU9KGEsYik9PihwLl9PcnRHZXRPdXRwdXROYW1lPVguSWQpKGEsYik7cC5fT3J0RnJlZT1hPT4ocC5fT3J0RnJlZT1YLkpkKShhKTtwLl9PcnRDcmVhdGVUZW5zb3I9KGEsYixjLGQsZSxmKT0+KHAuX09ydENyZWF0ZVRlbnNvcj1YLktkKShhLGIsYyxkLGUsZik7cC5fT3J0R2V0VGVuc29yRGF0YT0oYSxiLGMsZCxlKT0+KHAuX09ydEdldFRlbnNvckRhdGE9WC5MZCkoYSxiLGMsZCxlKTtwLl9PcnRSZWxlYXNlVGVuc29yPWE9PihwLl9PcnRSZWxlYXNlVGVuc29yPVguTWQpKGEpO3AuX09ydENyZWF0ZVJ1bk9wdGlvbnM9KGEsYixjLGQpPT4ocC5fT3J0Q3JlYXRlUnVuT3B0aW9ucz1YLk5kKShhLGIsYyxkKTtwLl9PcnRBZGRSdW5Db25maWdFbnRyeT0oYSxiLGMpPT4ocC5fT3J0QWRkUnVuQ29uZmlnRW50cnk9WC5PZCkoYSxiLGMpO3AuX09ydFJlbGVhc2VSdW5PcHRpb25zPWE9PihwLl9PcnRSZWxlYXNlUnVuT3B0aW9ucz1YLlBkKShhKTtcbnAuX09ydENyZWF0ZUJpbmRpbmc9YT0+KHAuX09ydENyZWF0ZUJpbmRpbmc9WC5RZCkoYSk7cC5fT3J0QmluZElucHV0PShhLGIsYyk9PihwLl9PcnRCaW5kSW5wdXQ9WC5SZCkoYSxiLGMpO3AuX09ydEJpbmRPdXRwdXQ9KGEsYixjLGQpPT4ocC5fT3J0QmluZE91dHB1dD1YLlNkKShhLGIsYyxkKTtwLl9PcnRDbGVhckJvdW5kT3V0cHV0cz1hPT4ocC5fT3J0Q2xlYXJCb3VuZE91dHB1dHM9WC5UZCkoYSk7cC5fT3J0UmVsZWFzZUJpbmRpbmc9YT0+KHAuX09ydFJlbGVhc2VCaW5kaW5nPVguVWQpKGEpO3AuX09ydFJ1bldpdGhCaW5kaW5nPShhLGIsYyxkLGUpPT4ocC5fT3J0UnVuV2l0aEJpbmRpbmc9WC5WZCkoYSxiLGMsZCxlKTtwLl9PcnRSdW49KGEsYixjLGQsZSxmLGcsaCk9PihwLl9PcnRSdW49WC5XZCkoYSxiLGMsZCxlLGYsZyxoKTtwLl9PcnRFbmRQcm9maWxpbmc9YT0+KHAuX09ydEVuZFByb2ZpbGluZz1YLlhkKShhKTtcbnZhciBCYj1wLl9tYWxsb2M9YT0+KEJiPXAuX21hbGxvYz1YLllkKShhKSxUPXAuX2ZyZWU9YT0+KFQ9cC5fZnJlZT1YLlpkKShhKSxsYj1hPT4obGI9WC5fZCkoYSk7cC5fX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzPSgpPT4ocC5fX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzPVguJGQpKCk7dmFyIFc9KGEsYik9PihXPVguYmUpKGEsYiksTGE9YT0+KExhPVguY2UpKGEpLFk9KCk9PihZPVguZGUpKCksWj1hPT4oWj1YLmVlKShhKSxhZj1hPT4oYWY9WC5mZSkoYSksUWI9YT0+KFFiPVguZ2UpKGEpLFBiPWE9PihQYj1YLmhlKShhKSxNYT0oYSxiLGMpPT4oTWE9WC5pZSkoYSxiLGMpLEthPWE9PihLYT1YLmplKShhKTtmdW5jdGlvbiBmYyhhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fVxuZnVuY3Rpb24gZGMoYSxiLGMpe3ZhciBkPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCl9fWZ1bmN0aW9uIGtkKGEsYixjKXt2YXIgZD1ZKCk7dHJ5e1YoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCl9fWZ1bmN0aW9uIGFjKGEsYil7dmFyIGM9WSgpO3RyeXtyZXR1cm4gVihhKShiKX1jYXRjaChkKXtaKGMpO2lmKGQhPT1kKzApdGhyb3cgZDtXKDEsMCl9fWZ1bmN0aW9uIGZkKGEsYil7dmFyIGM9WSgpO3RyeXtWKGEpKGIpfWNhdGNoKGQpe1ooYyk7aWYoZCE9PWQrMCl0aHJvdyBkO1coMSwwKX19ZnVuY3Rpb24gR2MoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCl9Y2F0Y2goZil7WihlKTtpZihmIT09ZiswKXRocm93IGY7VygxLDApfX1cbmZ1bmN0aW9uIGRkKGEpe3ZhciBiPVkoKTt0cnl7VihhKSgpfWNhdGNoKGMpe1ooYik7aWYoYyE9PWMrMCl0aHJvdyBjO1coMSwwKX19ZnVuY3Rpb24ga2MoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1mdW5jdGlvbiBqYyhhLGIsYyxkLGUsZil7dmFyIGc9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19ZnVuY3Rpb24gaGMoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19ZnVuY3Rpb24gcmQoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fVxuZnVuY3Rpb24gdWQoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1mdW5jdGlvbiAkYihhKXt2YXIgYj1ZKCk7dHJ5e3JldHVybiBWKGEpKCl9Y2F0Y2goYyl7WihiKTtpZihjIT09YyswKXRocm93IGM7VygxLDApfX1mdW5jdGlvbiBPYyhhLGIsYyl7dmFyIGQ9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMpfWNhdGNoKGUpe1ooZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1coMSwwKX19ZnVuY3Rpb24gQWUoYSxiLGMpe3ZhciBkPVkoKTt0cnl7VihhKShiLGMpfWNhdGNoKGUpe1ooZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1coMSwwKX19ZnVuY3Rpb24gd2QoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7VihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19XG5mdW5jdGlvbiBsYyhhLGIsYyxkLGUsZixnLGgpe3ZhciBrPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCl9Y2F0Y2gobSl7WihrKTtpZihtIT09bSswKXRocm93IG07VygxLDApfX1mdW5jdGlvbiBXYihhLGIpe3ZhciBjPVkoKTt0cnl7cmV0dXJuIFYoYSkoYil9Y2F0Y2goZCl7WihjKTtpZihkIT09ZCswKXRocm93IGQ7VygxLDApfX1mdW5jdGlvbiBaYyhhLGIpe3ZhciBjPVkoKTt0cnl7cmV0dXJuIFYoYSkoYil9Y2F0Y2goZCl7WihjKTtpZihkIT09ZCswKXRocm93IGQ7VygxLDApO3JldHVybiAwbn19ZnVuY3Rpb24gUmIoYSxiKXt2YXIgYz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIpfWNhdGNoKGQpe1ooYyk7aWYoZCE9PWQrMCl0aHJvdyBkO1coMSwwKX19ZnVuY3Rpb24gbWMoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtaKG0pO2lmKG4hPT1uKzApdGhyb3cgbjtXKDEsMCl9fVxuZnVuY3Rpb24gcmUoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fWZ1bmN0aW9uIEFkKGEsYixjLGQsZSxmLGcpe3ZhciBoPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1mdW5jdGlvbiBGZShhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e1YoYSkoYixjLGQpfWNhdGNoKGYpe1ooZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1coMSwwKX19ZnVuY3Rpb24gbGUoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtaKGgpO2lmKGshPT1rKzApdGhyb3cgaztXKDEsMCl9fWZ1bmN0aW9uIEZkKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKG0pe1ooayk7aWYobSE9PW0rMCl0aHJvdyBtO1coMSwwKX19XG5mdW5jdGlvbiB2ZShhLGIsYyxkLGUpe3ZhciBmPVkoKTt0cnl7VihhKShiLGMsZCxlKX1jYXRjaChnKXtaKGYpO2lmKGchPT1nKzApdGhyb3cgZztXKDEsMCl9fWZ1bmN0aW9uIG5jKGEsYixjLGQsZSxmLGcsaCxrLG0pe3ZhciBuPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrLG0pfWNhdGNoKHUpe1oobik7aWYodSE9PXUrMCl0aHJvdyB1O1coMSwwKX19ZnVuY3Rpb24gR2QoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe1oobSk7aWYobiE9PW4rMCl0aHJvdyBuO1coMSwwKX19ZnVuY3Rpb24gQWMoYSxiLGMsZCxlLGYsZyxoLGssbSxuKXt2YXIgdT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4pfWNhdGNoKHYpe1oodSk7aWYodiE9PXYrMCl0aHJvdyB2O1coMSwwKX19XG5mdW5jdGlvbiBKZShhLGIsYyxkLGUsZixnLGgsayl7dmFyIG09WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayl9Y2F0Y2gobil7WihtKTtpZihuIT09biswKXRocm93IG47VygxLDApfX1mdW5jdGlvbiB0ZShhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe1ooaCk7aWYoayE9PWsrMCl0aHJvdyBrO1coMSwwKX19ZnVuY3Rpb24gJGQoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtaKGgpO2lmKGshPT1rKzApdGhyb3cgaztXKDEsMCl9fWZ1bmN0aW9uIEhkKGEsYixjLGQsZSxmLGcsaCxrLG0pe3ZhciBuPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSl9Y2F0Y2godSl7WihuKTtpZih1IT09dSswKXRocm93IHU7VygxLDApfX1cbmZ1bmN0aW9uICRjKGEsYixjKXt2YXIgZD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyl9Y2F0Y2goZSl7WihkKTtpZihlIT09ZSswKXRocm93IGU7VygxLDApO3JldHVybiAwbn19ZnVuY3Rpb24gbGQoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fWZ1bmN0aW9uIHZjKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgsayl9Y2F0Y2gobil7WihtKTtpZihuIT09biswKXRocm93IG47VygxLDApfX1mdW5jdGlvbiBwYyhhLGIsYyxkLGUsZixnLGgsayxtLG4sdSl7dmFyIHY9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUpfWNhdGNoKGwpe1oodik7aWYobCE9PWwrMCl0aHJvdyBsO1coMSwwKX19XG5mdW5jdGlvbiBPZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwpe3ZhciB3PVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsKX1jYXRjaCh5KXtaKHcpO2lmKHkhPT15KzApdGhyb3cgeTtXKDEsMCl9fWZ1bmN0aW9uIHplKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1KXt2YXIgdj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1KX1jYXRjaChsKXtaKHYpO2lmKGwhPT1sKzApdGhyb3cgbDtXKDEsMCl9fWZ1bmN0aW9uIG9lKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1KXt2YXIgdj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1KX1jYXRjaChsKXtaKHYpO2lmKGwhPT1sKzApdGhyb3cgbDtXKDEsMCl9fWZ1bmN0aW9uIHNlKGEsYixjLGQsZSl7dmFyIGY9WSgpO3RyeXtWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19XG5mdW5jdGlvbiBqZChhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe1ooaCk7aWYoayE9PWsrMCl0aHJvdyBrO1coMSwwKX19ZnVuY3Rpb24gcWUoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe1oobSk7aWYobiE9PW4rMCl0aHJvdyBuO1coMSwwKX19ZnVuY3Rpb24gcWQoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtaKGgpO2lmKGshPT1rKzApdGhyb3cgaztXKDEsMCl9fWZ1bmN0aW9uIHhkKGEsYixjLGQsZSxmLGcsaCxrLG0sbil7dmFyIHU9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4pfWNhdGNoKHYpe1oodSk7aWYodiE9PXYrMCl0aHJvdyB2O1coMSwwKX19XG5mdW5jdGlvbiBSZShhLGIsYyxkLGUsZixnLGgpe3ZhciBrPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoKX1jYXRjaChtKXtaKGspO2lmKG0hPT1tKzApdGhyb3cgbTtXKDEsMCl9fWZ1bmN0aW9uIGFkKGEsYixjLGQpe3ZhciBlPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQpfWNhdGNoKGYpe1ooZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1coMSwwKTtyZXR1cm4gMG59fWZ1bmN0aW9uIHNkKGEsYixjLGQsZSl7dmFyIGY9WSgpO3RyeXtWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19ZnVuY3Rpb24gT2UoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSl7dmFyIHo9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5KX1jYXRjaChDKXtaKHopO2lmKEMhPT1DKzApdGhyb3cgQztXKDEsMCl9fVxuZnVuY3Rpb24ga2UoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7VihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19ZnVuY3Rpb24gS2UoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe1oobSk7aWYobiE9PW4rMCl0aHJvdyBuO1coMSwwKX19ZnVuY3Rpb24gSGMoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19ZnVuY3Rpb24gTWMoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsKXt2YXIgdz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwpfWNhdGNoKHkpe1oodyk7aWYoeSE9PXkrMCl0aHJvdyB5O1coMSwwKX19XG5mdW5jdGlvbiBQZShhLGIpe3ZhciBjPVkoKTt0cnl7VihhKShiKX1jYXRjaChkKXtaKGMpO2lmKGQhPT1kKzApdGhyb3cgZDtXKDEsMCl9fWZ1bmN0aW9uIGNkKGEsYixjKXt2YXIgZD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyl9Y2F0Y2goZSl7WihkKTtpZihlIT09ZSswKXRocm93IGU7VygxLDApO3JldHVybiAwbn19ZnVuY3Rpb24gTGMoYSxiLGMsZCxlLGYsZyxoLGssbSl7dmFyIG49WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoLGssbSl9Y2F0Y2godSl7WihuKTtpZih1IT09dSswKXRocm93IHU7VygxLDApfX1mdW5jdGlvbiBaYihhLGIsYyxkLGUpe3ZhciBmPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1cbmZ1bmN0aW9uIEtkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCl7dmFyIHc9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwpfWNhdGNoKHkpe1oodyk7aWYoeSE9PXkrMCl0aHJvdyB5O1coMSwwKX19ZnVuY3Rpb24gZWQoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1mdW5jdGlvbiB2ZChhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe1ooaCk7aWYoayE9PWsrMCl0aHJvdyBrO1coMSwwKX19ZnVuY3Rpb24gbmQoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1cbmZ1bmN0aW9uIHlkKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKG0pe1ooayk7aWYobSE9PW0rMCl0aHJvdyBtO1coMSwwKX19ZnVuY3Rpb24gVmQoYSxiLGMsZCxlLGYsZyxoLGssbSxuKXt2YXIgdT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbil9Y2F0Y2godil7Wih1KTtpZih2IT09diswKXRocm93IHY7VygxLDApfX1mdW5jdGlvbiBxYyhhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHope3ZhciBDPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseil9Y2F0Y2goRCl7WihDKTtpZihEIT09RCswKXRocm93IEQ7VygxLDApfX1mdW5jdGlvbiBOZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KXt2YXIgbD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpfWNhdGNoKHcpe1oobCk7aWYodyE9PXcrMCl0aHJvdyB3O1coMSwwKX19XG5mdW5jdGlvbiBVYyhhLGIpe3ZhciBjPVkoKTt0cnl7cmV0dXJuIFYoYSkoYil9Y2F0Y2goZCl7WihjKTtpZihkIT09ZCswKXRocm93IGQ7VygxLDApfX1mdW5jdGlvbiByYyhhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYpe3ZhciBHPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQsRil9Y2F0Y2goSCl7WihHKTtpZihIIT09SCswKXRocm93IEg7VygxLDApfX1mdW5jdGlvbiBJZShhLGIsYyxkLGUsZixnLGgsayxtKXt2YXIgbj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0pfWNhdGNoKHUpe1oobik7aWYodSE9PXUrMCl0aHJvdyB1O1coMSwwKX19ZnVuY3Rpb24gRmMoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1cbmZ1bmN0aW9uIExkKGEsYixjLGQsZSxmLGcsaCxrLG0sbil7dmFyIHU9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4pfWNhdGNoKHYpe1oodSk7aWYodiE9PXYrMCl0aHJvdyB2O1coMSwwKX19ZnVuY3Rpb24gTmMoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fWZ1bmN0aW9uIGZlKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fWZ1bmN0aW9uIFdlKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDKXt2YXIgRD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDKX1jYXRjaChGKXtaKEQpO2lmKEYhPT1GKzApdGhyb3cgRjtXKDEsMCl9fVxuZnVuY3Rpb24gQ2QoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6KXt2YXIgQz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseil9Y2F0Y2goRCl7WihDKTtpZihEIT09RCswKXRocm93IEQ7VygxLDApfX1mdW5jdGlvbiBCZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5KXt2YXIgej1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkpfWNhdGNoKEMpe1ooeik7aWYoQyE9PUMrMCl0aHJvdyBDO1coMSwwKX19ZnVuY3Rpb24gRGQoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcpe3ZhciB5PVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcpfWNhdGNoKHope1ooeSk7aWYoeiE9PXorMCl0aHJvdyB6O1coMSwwKX19XG5mdW5jdGlvbiBZZShhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYsRyl7dmFyIEg9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYsRyl9Y2F0Y2goUyl7WihIKTtpZihTIT09UyswKXRocm93IFM7VygxLDApfX1mdW5jdGlvbiBWZShhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxEKXt2YXIgRj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQpfWNhdGNoKEcpe1ooRik7aWYoRyE9PUcrMCl0aHJvdyBHO1coMSwwKX19ZnVuY3Rpb24gVWUoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6KXt2YXIgQz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseil9Y2F0Y2goRCl7WihDKTtpZihEIT09RCswKXRocm93IEQ7VygxLDApfX1cbmZ1bmN0aW9uIFhlKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQsRil7dmFyIEc9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYpfWNhdGNoKEgpe1ooRyk7aWYoSCE9PUgrMCl0aHJvdyBIO1coMSwwKX19ZnVuY3Rpb24gR2UoYSxiLGMsZCxlLGYsZyxoLGssbSl7dmFyIG49WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtKX1jYXRjaCh1KXtaKG4pO2lmKHUhPT11KzApdGhyb3cgdTtXKDEsMCl9fWZ1bmN0aW9uIERlKGEsYixjLGQsZSxmLGcsaCxrLG0sbil7dmFyIHU9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4pfWNhdGNoKHYpe1oodSk7aWYodiE9PXYrMCl0aHJvdyB2O1coMSwwKX19XG5mdW5jdGlvbiBOZShhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyl7dmFyIHk9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyl9Y2F0Y2goeil7Wih5KTtpZih6IT09eiswKXRocm93IHo7VygxLDApfX1mdW5jdGlvbiBUZShhLGIsYyxkLGUsZixnLGgsayxtKXt2YXIgbj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0pfWNhdGNoKHUpe1oobik7aWYodSE9PXUrMCl0aHJvdyB1O1coMSwwKX19ZnVuY3Rpb24gU2UoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe1oobSk7aWYobiE9PW4rMCl0aHJvdyBuO1coMSwwKX19ZnVuY3Rpb24gVmIoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1cbmZ1bmN0aW9uIG9kKGEsYixjLGQsZSl7dmFyIGY9WSgpO3RyeXtWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19ZnVuY3Rpb24gWWMoYSxiLGMpe3ZhciBkPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCk7cmV0dXJuIDBufX1mdW5jdGlvbiB6YyhhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtaKGgpO2lmKGshPT1rKzApdGhyb3cgaztXKDEsMCl9fWZ1bmN0aW9uIEhlKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fVxuZnVuY3Rpb24gbmUoYSxiLGMsZCxlLGYsZyxoLGssbSxuKXt2YXIgdT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbil9Y2F0Y2godil7Wih1KTtpZih2IT09diswKXRocm93IHY7VygxLDApfX1mdW5jdGlvbiBkZShhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KXt2YXIgbD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpfWNhdGNoKHcpe1oobCk7aWYodyE9PXcrMCl0aHJvdyB3O1coMSwwKX19ZnVuY3Rpb24gRGMoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fWZ1bmN0aW9uIGFlKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpe3ZhciBsPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdil9Y2F0Y2godyl7WihsKTtpZih3IT09dyswKXRocm93IHc7VygxLDApfX1cbmZ1bmN0aW9uIGhlKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKG0pe1ooayk7aWYobSE9PW0rMCl0aHJvdyBtO1coMSwwKX19ZnVuY3Rpb24geGUoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCl9Y2F0Y2gobSl7WihrKTtpZihtIT09bSswKXRocm93IG07VygxLDApfX1mdW5jdGlvbiBWYyhhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fWZ1bmN0aW9uIGVlKGEsYixjLGQsZSxmLGcsaCxrLG0pe3ZhciBuPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSl9Y2F0Y2godSl7WihuKTtpZih1IT09dSswKXRocm93IHU7VygxLDApfX1cbmZ1bmN0aW9uIExlKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtaKG0pO2lmKG4hPT1uKzApdGhyb3cgbjtXKDEsMCl9fWZ1bmN0aW9uIGNlKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtaKG0pO2lmKG4hPT1uKzApdGhyb3cgbjtXKDEsMCl9fWZ1bmN0aW9uIFlkKGEsYixjLGQsZSxmLGcsaCxrLG0pe3ZhciBuPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSl9Y2F0Y2godSl7WihuKTtpZih1IT09dSswKXRocm93IHU7VygxLDApfX1mdW5jdGlvbiBDZShhLGIsYyxkLGUsZil7dmFyIGc9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7WihnKTtpZihoIT09aCswKXRocm93IGg7VygxLDApfX1cbmZ1bmN0aW9uIEpkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1KXt2YXIgdj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1KX1jYXRjaChsKXtaKHYpO2lmKGwhPT1sKzApdGhyb3cgbDtXKDEsMCl9fWZ1bmN0aW9uIEtjKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoKX1jYXRjaChtKXtaKGspO2lmKG0hPT1tKzApdGhyb3cgbTtXKDEsMCl9fWZ1bmN0aW9uIFBkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3KXt2YXIgeT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3KX1jYXRjaCh6KXtaKHkpO2lmKHohPT16KzApdGhyb3cgejtXKDEsMCl9fWZ1bmN0aW9uIFpkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCl7dmFyIHc9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwpfWNhdGNoKHkpe1oodyk7aWYoeSE9PXkrMCl0aHJvdyB5O1coMSwwKX19XG5mdW5jdGlvbiBXZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyl7dmFyIHk9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyl9Y2F0Y2goeil7Wih5KTtpZih6IT09eiswKXRocm93IHo7VygxLDApfX1mdW5jdGlvbiBoZChhLGIsYyl7dmFyIGQ9WSgpO3RyeXtWKGEpKGIsYyl9Y2F0Y2goZSl7WihkKTtpZihlIT09ZSswKXRocm93IGU7VygxLDApfX1mdW5jdGlvbiBFZChhLGIsYyxkLGUsZixnLGgsayxtKXt2YXIgbj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0pfWNhdGNoKHUpe1oobik7aWYodSE9PXUrMCl0aHJvdyB1O1coMSwwKX19XG5mdW5jdGlvbiBiZShhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYsRyxILFMsZGYsZWYsZmYpe3ZhciBnZj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQsRixHLEgsUyxkZixlZixmZil9Y2F0Y2goR2Epe1ooZ2YpO2lmKEdhIT09R2ErMCl0aHJvdyBHYTtXKDEsMCl9fWZ1bmN0aW9uIHdlKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fWZ1bmN0aW9uIHRjKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpe3ZhciBsPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpfWNhdGNoKHcpe1oobCk7aWYodyE9PXcrMCl0aHJvdyB3O1coMSwwKX19XG5mdW5jdGlvbiBNZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSl7dmFyIHY9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSl9Y2F0Y2gobCl7Wih2KTtpZihsIT09bCswKXRocm93IGw7VygxLDApfX1mdW5jdGlvbiBwZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KXt2YXIgbD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpfWNhdGNoKHcpe1oobCk7aWYodyE9PXcrMCl0aHJvdyB3O1coMSwwKX19ZnVuY3Rpb24gVWQoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6LEMsRCxGLEcpe3ZhciBIPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6LEMsRCxGLEcpfWNhdGNoKFMpe1ooSCk7aWYoUyE9PVMrMCl0aHJvdyBTO1coMSwwKX19ZnVuY3Rpb24gY2MoYSxiLGMpe3ZhciBkPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCl9fVxuZnVuY3Rpb24gemQoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdil7dmFyIGw9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KX1jYXRjaCh3KXtaKGwpO2lmKHchPT13KzApdGhyb3cgdztXKDEsMCl9fWZ1bmN0aW9uIEVlKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCl7dmFyIHc9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwpfWNhdGNoKHkpe1oodyk7aWYoeSE9PXkrMCl0aHJvdyB5O1coMSwwKX19ZnVuY3Rpb24gaWUoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCl9Y2F0Y2gobSl7WihrKTtpZihtIT09bSswKXRocm93IG07VygxLDApfX1mdW5jdGlvbiBSZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHope3ZhciBDPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6KX1jYXRjaChEKXtaKEMpO2lmKEQhPT1EKzApdGhyb3cgRDtXKDEsMCl9fVxuZnVuY3Rpb24gVGQoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6LEMsRCxGKXt2YXIgRz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQsRil9Y2F0Y2goSCl7WihHKTtpZihIIT09SCswKXRocm93IEg7VygxLDApfX1mdW5jdGlvbiBTZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxEKXt2YXIgRj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQpfWNhdGNoKEcpe1ooRik7aWYoRyE9PUcrMCl0aHJvdyBHO1coMSwwKX19ZnVuY3Rpb24gWGQoYSxiLGMsZCxlLGYsZyxoLGssbSxuKXt2YXIgdT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbil9Y2F0Y2godil7Wih1KTtpZih2IT09diswKXRocm93IHY7VygxLDApfX1cbmZ1bmN0aW9uIG9jKGEsYixjLGQsZSxmLGcsaCxrLG0sbil7dmFyIHU9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoLGssbSxuKX1jYXRjaCh2KXtaKHUpO2lmKHYhPT12KzApdGhyb3cgdjtXKDEsMCl9fWZ1bmN0aW9uIHNjKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQsRil7dmFyIEc9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6LEMsRCxGKX1jYXRjaChIKXtaKEcpO2lmKEghPT1IKzApdGhyb3cgSDtXKDEsMCl9fWZ1bmN0aW9uIHRkKGEsYixjLGQsZSl7dmFyIGY9WSgpO3RyeXtWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19ZnVuY3Rpb24gSWQoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUpe3ZhciB2PVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUpfWNhdGNoKGwpe1oodik7aWYobCE9PWwrMCl0aHJvdyBsO1coMSwwKX19XG5mdW5jdGlvbiBSYyhhLGIsYyxkLGUpe3ZhciBmPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1mdW5jdGlvbiBiZChhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCk7cmV0dXJuIDBufX1mdW5jdGlvbiBnZShhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe1ooaCk7aWYoayE9PWsrMCl0aHJvdyBrO1coMSwwKX19ZnVuY3Rpb24gU2MoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fWZ1bmN0aW9uIGplKGEsYixjLGQsZSl7dmFyIGY9WSgpO3RyeXtWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19XG5mdW5jdGlvbiBXYyhhLGIsYyxkLGUsZil7dmFyIGc9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19ZnVuY3Rpb24gcGUoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe1oobSk7aWYobiE9PW4rMCl0aHJvdyBuO1coMSwwKX19ZnVuY3Rpb24gbWQoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fWZ1bmN0aW9uIEJjKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoKX1jYXRjaChtKXtaKGspO2lmKG0hPT1tKzApdGhyb3cgbTtXKDEsMCl9fWZ1bmN0aW9uIEJlKGEsYixjLGQpe3ZhciBlPVkoKTt0cnl7VihhKShiLGMsZCl9Y2F0Y2goZil7WihlKTtpZihmIT09ZiswKXRocm93IGY7VygxLDApfX1cbmZ1bmN0aW9uIGdjKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7WihnKTtpZihoIT09aCswKXRocm93IGg7VygxLDApfX1mdW5jdGlvbiBJYyhhLGIsYyxkLGUsZil7dmFyIGc9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19ZnVuY3Rpb24gdWMoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUpe3ZhciB2PVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1KX1jYXRjaChsKXtaKHYpO2lmKGwhPT1sKzApdGhyb3cgbDtXKDEsMCl9fWZ1bmN0aW9uIEVjKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoKX1jYXRjaChtKXtaKGspO2lmKG0hPT1tKzApdGhyb3cgbTtXKDEsMCl9fVxuZnVuY3Rpb24geGMoYSxiLGMsZCxlLGYsZyxoLGssbSxuKXt2YXIgdT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4pfWNhdGNoKHYpe1oodSk7aWYodiE9PXYrMCl0aHJvdyB2O1coMSwwKX19ZnVuY3Rpb24gSmMoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1mdW5jdGlvbiB3YyhhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KXt2YXIgbD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KX1jYXRjaCh3KXtaKGwpO2lmKHchPT13KzApdGhyb3cgdztXKDEsMCl9fWZ1bmN0aW9uIFFjKGEsYixjLGQsZSxmLGcpe3ZhciBoPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe1ooaCk7aWYoayE9PWsrMCl0aHJvdyBrO1coMSwwKX19XG5mdW5jdGlvbiBUYyhhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtaKGgpO2lmKGshPT1rKzApdGhyb3cgaztXKDEsMCl9fWZ1bmN0aW9uIFBjKGEsYixjLGQpe3ZhciBlPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQpfWNhdGNoKGYpe1ooZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1coMSwwKX19ZnVuY3Rpb24gbWUoYSxiLGMsZCxlLGYsZyxoLGssbSl7dmFyIG49WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtKX1jYXRjaCh1KXtaKG4pO2lmKHUhPT11KzApdGhyb3cgdTtXKDEsMCl9fWZ1bmN0aW9uIHVlKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpe3ZhciBsPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdil9Y2F0Y2godyl7WihsKTtpZih3IT09dyswKXRocm93IHc7VygxLDApfX1cbmZ1bmN0aW9uIGJjKGEsYixjKXt2YXIgZD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyl9Y2F0Y2goZSl7WihkKTtpZihlIT09ZSswKXRocm93IGU7VygxLDApfX1mdW5jdGlvbiBlYyhhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fWZ1bmN0aW9uIGdkKGEsYixjLGQpe3ZhciBlPVkoKTt0cnl7VihhKShiLGMsZCl9Y2F0Y2goZil7WihlKTtpZihmIT09ZiswKXRocm93IGY7VygxLDApfX1mdW5jdGlvbiBZYihhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fWZ1bmN0aW9uIFFlKGEsYixjLGQsZSl7dmFyIGY9WSgpO3RyeXtWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19XG5mdW5jdGlvbiBVYihhLGIsYyxkLGUsZil7dmFyIGc9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19ZnVuY3Rpb24gTWUoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdil7dmFyIGw9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KX1jYXRjaCh3KXtaKGwpO2lmKHchPT13KzApdGhyb3cgdztXKDEsMCl9fWZ1bmN0aW9uIHllKGEsYixjLGQsZSxmLGcsaCxrLG0pe3ZhciBuPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSl9Y2F0Y2godSl7WihuKTtpZih1IT09dSswKXRocm93IHU7VygxLDApfX1mdW5jdGlvbiBUYihhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fVxuZnVuY3Rpb24gQ2MoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19ZnVuY3Rpb24gWGMoYSl7dmFyIGI9WSgpO3RyeXtyZXR1cm4gVihhKSgpfWNhdGNoKGMpe1ooYik7aWYoYyE9PWMrMCl0aHJvdyBjO1coMSwwKTtyZXR1cm4gMG59fWZ1bmN0aW9uIHljKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7WihnKTtpZihoIT09aCswKXRocm93IGg7VygxLDApfX1mdW5jdGlvbiBpYyhhLGIsYyxkLGUsZil7dmFyIGc9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19XG5mdW5jdGlvbiBRZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5KXt2YXIgej1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkpfWNhdGNoKEMpe1ooeik7aWYoQyE9PUMrMCl0aHJvdyBDO1coMSwwKX19ZnVuY3Rpb24gWGIoYSxiLGMpe3ZhciBkPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCl9fWZ1bmN0aW9uIFNiKGEsYixjKXt2YXIgZD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyl9Y2F0Y2goZSl7WihkKTtpZihlIT09ZSswKXRocm93IGU7VygxLDApfX1cbmZ1bmN0aW9uICRlKCl7dmFyIGE9WDthPU9iamVjdC5hc3NpZ24oe30sYSk7dmFyIGI9ZD0+KCk9PmQoKT4+PjAsYz1kPT5lPT5kKGUpPj4+MDthLl9fZXJybm9fbG9jYXRpb249YihhLl9fZXJybm9fbG9jYXRpb24pO2EuWWQ9YyhhLllkKTthLl9kPWMoYS5fZCk7YS5kZT1iKGEuZGUpO2EuZmU9YyhhLmZlKTtyZXR1cm4gYX1wLnN0YWNrQWxsb2M9YWY7cC5zdGFja1NhdmU9WTtwLnN0YWNrUmVzdG9yZT1aO3AuVVRGOFRvU3RyaW5nPVFhO3Auc3RyaW5nVG9VVEY4PShhLGIsYyk9PlNhKGEsQSxiLGMpO3AubGVuZ3RoQnl0ZXNVVEY4PVJhO3ZhciBiZjtLPWZ1bmN0aW9uIGNmKCl7YmZ8fGhmKCk7YmZ8fChLPWNmKX07XG5mdW5jdGlvbiBoZigpe2lmKCEoMDxKKSl7Zm9yKDswPHZhLmxlbmd0aDspdmEuc2hpZnQoKShwKTtpZighKDA8Snx8YmZ8fChiZj0hMCxwLmNhbGxlZFJ1bj0hMCxvYSkpKXtmb3IoOzA8d2EubGVuZ3RoOyl3YS5zaGlmdCgpKHApO2ZvcihhYShwKTswPHhhLmxlbmd0aDspeGEuc2hpZnQoKShwKX19fWhmKCk7XG5cblxuICByZXR1cm4gbW9kdWxlQXJnLnJlYWR5XG59XG5cbik7XG59KSgpO1xuaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JylcbiAgbW9kdWxlLmV4cG9ydHMgPSBvcnRXYXNtO1xuZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKVxuICBkZWZpbmUoW10sICgpID0+IG9ydFdhc20pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQge0Vudn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtPcnRXYXNtTW9kdWxlfSBmcm9tICcuL2JpbmRpbmcvb3J0LXdhc20nO1xuaW1wb3J0IHtPcnRXYXNtVGhyZWFkZWRNb2R1bGV9IGZyb20gJy4vYmluZGluZy9vcnQtd2FzbS10aHJlYWRlZCc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMgKi9cbmxldCBvcnRXYXNtRmFjdG9yeTogRW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT47XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1RSQUlOSU5HKSB7XG4gIG9ydFdhc21GYWN0b3J5ID0gcmVxdWlyZSgnLi9iaW5kaW5nL29ydC10cmFpbmluZy13YXNtLXNpbWQuanMnKTtcbn0gZWxzZSB7XG4gIG9ydFdhc21GYWN0b3J5ID1cbiAgICAgIEJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgPyByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXdhc20uanMnKSA6IHJlcXVpcmUoJy4vYmluZGluZy9vcnQtd2FzbS1zaW1kLmpzZXAuanMnKTtcbn1cblxuY29uc3Qgb3J0V2FzbUZhY3RvcnlUaHJlYWRlZDogRW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT4gPSAhQlVJTERfREVGUy5ESVNBQkxFX1dBU01fVEhSRUFEID9cbiAgICAoQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSA/IHJlcXVpcmUoJy4vYmluZGluZy9vcnQtd2FzbS10aHJlYWRlZC5qcycpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vYmluZGluZy9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAuanMnKSkgOlxuICAgIG9ydFdhc21GYWN0b3J5O1xuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzICovXG5cbmxldCB3YXNtOiBPcnRXYXNtTW9kdWxlfHVuZGVmaW5lZDtcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xubGV0IGFib3J0ZWQgPSBmYWxzZTtcblxuY29uc3QgaXNNdWx0aVRocmVhZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBJZiAnU2hhcmVkQXJyYXlCdWZmZXInIGlzIG5vdCBhdmFpbGFibGUsIFdlYkFzc2VtYmx5IHRocmVhZHMgd2lsbCBub3Qgd29yay5cbiAgICBpZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRlc3QgZm9yIHRyYW5zZmVyYWJpbGl0eSBvZiBTQUJzIChmb3IgYnJvd3NlcnMuIG5lZWRlZCBmb3IgRmlyZWZveClcbiAgICAvLyBodHRwczovL2dyb3Vwcy5nb29nbGUuY29tL2ZvcnVtLyMhbXNnL21vemlsbGEuZGV2LnBsYXRmb3JtL0lIa0JabEhFVHBBL2R3c01OY2hXRVFBSlxuICAgIGlmICh0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBuZXcgTWVzc2FnZUNoYW5uZWwoKS5wb3J0MS5wb3N0TWVzc2FnZShuZXcgU2hhcmVkQXJyYXlCdWZmZXIoMSkpO1xuICAgIH1cblxuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IHRocmVhZHMgY2FwYWJpbGl0eSAoZm9yIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMpXG4gICAgLy8gVGhpcyB0eXBlZCBhcnJheSBpcyBhIFdlYkFzc2VtYmx5IHByb2dyYW0gY29udGFpbmluZyB0aHJlYWRlZCBpbnN0cnVjdGlvbnMuXG4gICAgcmV0dXJuIFdlYkFzc2VtYmx5LnZhbGlkYXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgIDAsICAwLCAxLCA0LCAxLCAgOTYsIDAsICAgMCwgIDMsIDIsIDEsICAwLCA1LFxuICAgICAgNCwgMSwgIDMsICAgMSwgICAxLCAxMCwgMTEsIDEsIDksIDAsIDY1LCAwLCAgMjU0LCAxNiwgMiwgMCwgMjYsIDExXG4gICAgXSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBpc1NpbWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHRyeSB7XG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgU0lNRCBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIFNJTUQgaW5zdHJ1Y3Rpb25zLlxuXG4gICAgLy8gVGhlIGJpbmFyeSBkYXRhIGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBmb2xsb3dpbmcgY29kZSBieSB3YXQyd2FzbTpcbiAgICAvL1xuICAgIC8vIChtb2R1bGVcbiAgICAvLyAgICh0eXBlICR0MCAoZnVuYykpXG4gICAgLy8gICAoZnVuYyAkZjAgKHR5cGUgJHQwKVxuICAgIC8vICAgICAoZHJvcFxuICAgIC8vICAgICAgIChpMzJ4NC5kb3RfaTE2eDhfc1xuICAgIC8vICAgICAgICAgKGk4eDE2LnNwbGF0XG4gICAgLy8gICAgICAgICAgIChpMzIuY29uc3QgMCkpXG4gICAgLy8gICAgICAgICAodjEyOC5jb25zdCBpMzJ4NCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCAweDAwMDAwMDAwKSkpKSlcblxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAwLCAgIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgNCwgMSwgOTYsIDAsIDAsIDMsIDIsIDEsIDAsIDEwLCAzMCwgMSwgICAyOCwgIDAsIDY1LCAwLFxuICAgICAgMjUzLCAxNSwgMjUzLCAxMiwgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAgMCwgIDI1MywgMTg2LCAxLCAyNiwgMTFcbiAgICBdKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGdldFdhc21GaWxlTmFtZSA9ICh1c2VTaW1kOiBib29sZWFuLCB1c2VUaHJlYWRzOiBib29sZWFuKSA9PiB7XG4gIGlmICh1c2VTaW1kKSB7XG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkcpIHtcbiAgICAgIHJldHVybiAnb3J0LXRyYWluaW5nLXdhc20tc2ltZC53YXNtJztcbiAgICB9XG4gICAgcmV0dXJuIHVzZVRocmVhZHMgPyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC53YXNtJyA6ICdvcnQtd2FzbS1zaW1kLndhc20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1c2VUaHJlYWRzID8gJ29ydC13YXNtLXRocmVhZGVkLndhc20nIDogJ29ydC13YXNtLndhc20nO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5ID0gYXN5bmMoZmxhZ3M6IEVudi5XZWJBc3NlbWJseUZsYWdzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtdWx0aXBsZSBjYWxscyB0byBcXCdpbml0aWFsaXplV2ViQXNzZW1ibHkoKVxcJyBkZXRlY3RlZC4nKTtcbiAgfVxuICBpZiAoYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJldmlvdXMgY2FsbCB0byBcXCdpbml0aWFsaXplV2ViQXNzZW1ibHkoKVxcJyBmYWlsZWQuJyk7XG4gIH1cblxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gIC8vIHdhc20gZmxhZ3MgYXJlIGFscmVhZHkgaW5pdGlhbGl6ZWRcbiAgY29uc3QgdGltZW91dCA9IGZsYWdzLmluaXRUaW1lb3V0ITtcbiAgY29uc3QgbnVtVGhyZWFkcyA9IGZsYWdzLm51bVRocmVhZHMhO1xuICBjb25zdCBzaW1kID0gZmxhZ3Muc2ltZCE7XG5cbiAgY29uc3QgdXNlVGhyZWFkcyA9IG51bVRocmVhZHMgPiAxICYmIGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQoKTtcbiAgY29uc3QgdXNlU2ltZCA9IHNpbWQgJiYgaXNTaW1kU3VwcG9ydGVkKCk7XG5cbiAgY29uc3Qgd2FzbVBhdGhzID0gZmxhZ3Mud2FzbVBhdGhzO1xuICBjb25zdCB3YXNtUHJlZml4T3ZlcnJpZGUgPSB0eXBlb2Ygd2FzbVBhdGhzID09PSAnc3RyaW5nJyA/IHdhc21QYXRocyA6IHVuZGVmaW5lZDtcbiAgY29uc3Qgd2FzbUZpbGVOYW1lID0gZ2V0V2FzbUZpbGVOYW1lKHVzZVNpbWQsIHVzZVRocmVhZHMpO1xuICBjb25zdCB3YXNtUGF0aE92ZXJyaWRlID0gdHlwZW9mIHdhc21QYXRocyA9PT0gJ29iamVjdCcgPyB3YXNtUGF0aHNbd2FzbUZpbGVOYW1lXSA6IHVuZGVmaW5lZDtcblxuICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG5cbiAgY29uc3QgdGFza3M6IEFycmF5PFByb21pc2U8dm9pZD4+ID0gW107XG5cbiAgLy8gcHJvbWlzZSBmb3IgdGltZW91dFxuICBpZiAodGltZW91dCA+IDApIHtcbiAgICB0YXNrcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSwgdGltZW91dCk7XG4gICAgfSkpO1xuICB9XG5cbiAgLy8gcHJvbWlzZSBmb3IgbW9kdWxlIGluaXRpYWxpemF0aW9uXG4gIHRhc2tzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB1c2VUaHJlYWRzID8gb3J0V2FzbUZhY3RvcnlUaHJlYWRlZCA6IG9ydFdhc21GYWN0b3J5O1xuICAgIGNvbnN0IGNvbmZpZzogUGFydGlhbDxPcnRXYXNtTW9kdWxlPiA9IHtcbiAgICAgIGxvY2F0ZUZpbGU6IChmaWxlTmFtZTogc3RyaW5nLCBzY3JpcHREaXJlY3Rvcnk6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1RIUkVBRCAmJiB1c2VUaHJlYWRzICYmIGZpbGVOYW1lLmVuZHNXaXRoKCcud29ya2VyLmpzJykgJiZcbiAgICAgICAgICAgIHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgLy8gVGhpcyByZXF1aXJlKCkgZnVuY3Rpb24gaXMgaGFuZGxlZCBieSBlc2J1aWxkIHBsdWdpbiB0byBsb2FkIGZpbGUgY29udGVudCBhcyBzdHJpbmcuXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHNcbiAgICAgICAgICAgICAgICByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXdhc20tdGhyZWFkZWQud29ya2VyLmpzJylcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAge3R5cGU6ICd0ZXh0L2phdmFzY3JpcHQnfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbGVOYW1lLmVuZHNXaXRoKCcud2FzbScpKSB7XG4gICAgICAgICAgaWYgKHdhc21QYXRoT3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHJldHVybiB3YXNtUGF0aE92ZXJyaWRlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByZWZpeCA9IHdhc21QcmVmaXhPdmVycmlkZSA/PyBzY3JpcHREaXJlY3Rvcnk7XG5cbiAgICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgICAgICAgICAgIGlmICh3YXNtRmlsZU5hbWUgPT09ICdvcnQtd2FzbS1zaW1kLndhc20nKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcmVmaXggKyAnb3J0LXdhc20tc2ltZC5qc2VwLndhc20nO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3YXNtRmlsZU5hbWUgPT09ICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLndhc20nKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcmVmaXggKyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLndhc20nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBwcmVmaXggKyB3YXNtRmlsZU5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2NyaXB0RGlyZWN0b3J5ICsgZmlsZU5hbWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fVEhSRUFEICYmIHVzZVRocmVhZHMpIHtcbiAgICAgIGlmICh0eXBlb2YgQmxvYiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uZmlnLm1haW5TY3JpcHRVcmxPckJsb2IgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnb3J0LXdhc20tdGhyZWFkZWQuanMnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdFNvdXJjZUNvZGUgPSBgdmFyIG9ydFdhc21UaHJlYWRlZD0ke2ZhY3RvcnkudG9TdHJpbmcoKX07YDtcbiAgICAgICAgY29uZmlnLm1haW5TY3JpcHRVcmxPckJsb2IgPSBuZXcgQmxvYihbc2NyaXB0U291cmNlQ29kZV0sIHt0eXBlOiAndGV4dC9qYXZhc2NyaXB0J30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZhY3RvcnkoY29uZmlnKS50aGVuKFxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHlcbiAgICAgICAgbW9kdWxlID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgd2FzbSA9IG1vZHVsZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIHdhc20gbW9kdWxlIGZhaWxlZCB0byBpbml0aWFsaXplXG4gICAgICAgICh3aGF0KSA9PiB7XG4gICAgICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgICAgcmVqZWN0KHdoYXQpO1xuICAgICAgICB9KTtcbiAgfSkpO1xuXG4gIGF3YWl0IFByb21pc2UucmFjZSh0YXNrcyk7XG5cbiAgaWYgKGlzVGltZW91dCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgV2ViQXNzZW1ibHkgYmFja2VuZCBpbml0aWFsaXppbmcgZmFpbGVkIGR1ZSB0byB0aW1lb3V0OiAke3RpbWVvdXR9bXNgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEluc3RhbmNlID0gKCk6IE9ydFdhc21Nb2R1bGUgPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQgJiYgd2FzbSkge1xuICAgIHJldHVybiB3YXNtO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBpcyBub3QgaW5pdGlhbGl6ZWQgeWV0LicpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpc3Bvc2UgPSAoKTogdm9pZCA9PiB7XG4gIGlmIChpbml0aWFsaXplZCAmJiAhaW5pdGlhbGl6aW5nICYmICFhYm9ydGVkKSB7XG4gICAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuICAgICh3YXNtIGFzIE9ydFdhc21UaHJlYWRlZE1vZHVsZSkuUFRocmVhZD8udGVybWluYXRlQWxsVGhyZWFkcygpO1xuICAgIHdhc20gPSB1bmRlZmluZWQ7XG5cbiAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIGFib3J0ZWQgPSB0cnVlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge2dldEluc3RhbmNlfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5cbmV4cG9ydCBjb25zdCBhbGxvY1dhc21TdHJpbmcgPSAoZGF0YTogc3RyaW5nLCBhbGxvY3M6IG51bWJlcltdKTogbnVtYmVyID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgY29uc3QgZGF0YUxlbmd0aCA9IHdhc20ubGVuZ3RoQnl0ZXNVVEY4KGRhdGEpICsgMTtcbiAgY29uc3QgZGF0YU9mZnNldCA9IHdhc20uX21hbGxvYyhkYXRhTGVuZ3RoKTtcbiAgd2FzbS5zdHJpbmdUb1VURjgoZGF0YSwgZGF0YU9mZnNldCwgZGF0YUxlbmd0aCk7XG4gIGFsbG9jcy5wdXNoKGRhdGFPZmZzZXQpO1xuXG4gIHJldHVybiBkYXRhT2Zmc2V0O1xufTtcblxuaW50ZXJmYWNlIEV4dHJhT3B0aW9uc0hhbmRsZXIge1xuICAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IGl0ZXJhdGVFeHRyYU9wdGlvbnMgPVxuICAgIChvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgcHJlZml4OiBzdHJpbmcsIHNlZW46IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+LFxuICAgICBoYW5kbGVyOiBFeHRyYU9wdGlvbnNIYW5kbGVyKTogdm9pZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoc2Vlbi5oYXMob3B0aW9ucykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBpbiBvcHRpb25zJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2Vlbi5hZGQob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAocHJlZml4KSA/IHByZWZpeCArIGtleSA6IGtleTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBuYW1lICsgJy4nLCBzZWVuLCBoYW5kbGVyKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgaGFuZGxlcihuYW1lLCAodmFsdWUpID8gJzEnIDogJzAnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGhhbmRsZSBleHRyYSBjb25maWcgdHlwZTogJHt0eXBlb2YgdmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbi8qKlxuICogY2hlY2sgd2ViIGFzc2VtYmx5IEFQSSdzIGxhc3QgZXJyb3IgYW5kIHRocm93IGVycm9yIGlmIGFueSBlcnJvciBvY2N1cnJlZC5cbiAqIEBwYXJhbSBtZXNzYWdlIGEgbWVzc2FnZSB1c2VkIHdoZW4gYW4gZXJyb3Igb2NjdXJyZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBjaGVja0xhc3RFcnJvciA9IChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICB0cnkge1xuICAgIGNvbnN0IHBhcmFtc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg4KTtcbiAgICB3YXNtLl9PcnRHZXRMYXN0RXJyb3IocGFyYW1zT2Zmc2V0LCBwYXJhbXNPZmZzZXQgKyA0KTtcbiAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLkhFQVAzMltwYXJhbXNPZmZzZXQgLyA0XTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VQb2ludGVyID0gd2FzbS5IRUFQVTMyW3BhcmFtc09mZnNldCAvIDQgKyAxXTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2VQb2ludGVyID8gd2FzbS5VVEY4VG9TdHJpbmcoZXJyb3JNZXNzYWdlUG9pbnRlcikgOiAnJztcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bWVzc2FnZX0gRVJST1JfQ09ERTogJHtlcnJvckNvZGV9LCBFUlJPUl9NRVNTQUdFOiAke2Vycm9yTWVzc2FnZX1gKTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtnZXRJbnN0YW5jZX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuaW1wb3J0IHthbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zfSBmcm9tICcuL3dhc20tdXRpbHMnO1xuXG5leHBvcnQgY29uc3Qgc2V0UnVuT3B0aW9ucyA9IChvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBbbnVtYmVyLCBudW1iZXJbXV0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xuICBjb25zdCBhbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3QgcnVuT3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB0cnkge1xuICAgIGlmIChvcHRpb25zPy5sb2dTZXZlcml0eUxldmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA9IDI7ICAvLyBEZWZhdWx0IHRvIHdhcm5pbmdcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5sb2dTZXZlcml0eUxldmVsICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwpIHx8XG4gICAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHwgb3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID4gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgc2VydmVyaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmxvZ1ZlcmJvc2l0eUxldmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgPSAwOyAgLy8gRGVmYXVsdCB0byAwXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8udGVybWluYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMudGVybWluYXRlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHRhZ0RhdGFPZmZzZXQgPSAwO1xuICAgIGlmIChvcHRpb25zPy50YWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFnRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhvcHRpb25zLnRhZywgYWxsb2NzKTtcbiAgICB9XG5cbiAgICBydW5PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlUnVuT3B0aW9ucyhcbiAgICAgICAgcnVuT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsISwgcnVuT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCEsICEhcnVuT3B0aW9ucy50ZXJtaW5hdGUhLCB0YWdEYXRhT2Zmc2V0KTtcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIHJ1biBvcHRpb25zLicpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5leHRyYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKG9wdGlvbnMuZXh0cmEsICcnLCBuZXcgV2Vha1NldDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oKSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhrZXksIGFsbG9jcyk7XG4gICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh2YWx1ZSwgYWxsb2NzKTtcblxuICAgICAgICBpZiAod2FzbS5fT3J0QWRkUnVuQ29uZmlnRW50cnkocnVuT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBydW4gY29uZmlnIGVudHJ5OiAke2tleX0gLSAke3ZhbHVlfS5gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtydW5PcHRpb25zSGFuZGxlLCBhbGxvY3NdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgIHdhc20uX09ydFJlbGVhc2VSdW5PcHRpb25zKHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cbiAgICBhbGxvY3MuZm9yRWFjaChhbGxvYyA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge2dldEluc3RhbmNlfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQge2FsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3IsIGl0ZXJhdGVFeHRyYU9wdGlvbnN9IGZyb20gJy4vd2FzbS11dGlscyc7XG5cbmNvbnN0IGdldEdyYXBoT3B0aW16YXRpb25MZXZlbCA9IChncmFwaE9wdGltaXphdGlvbkxldmVsOiBzdHJpbmd8dW5rbm93bik6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAoZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCkge1xuICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ2V4dGVuZGVkJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gOTk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZ3JhcGggb3B0aW1pemF0aW9uIGxldmVsOiAke2dyYXBoT3B0aW1pemF0aW9uTGV2ZWx9YCk7XG4gIH1cbn07XG5cbmNvbnN0IGdldEV4ZWN1dGlvbk1vZGUgPSAoZXhlY3V0aW9uTW9kZTogJ3NlcXVlbnRpYWwnfCdwYXJhbGxlbCcpOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGV4ZWN1dGlvbk1vZGUpIHtcbiAgICBjYXNlICdzZXF1ZW50aWFsJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ3BhcmFsbGVsJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGV4ZWN1dGlvbiBtb2RlOiAke2V4ZWN1dGlvbk1vZGV9YCk7XG4gIH1cbn07XG5cbmNvbnN0IGFwcGVuZERlZmF1bHRPcHRpb25zID0gKG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiB2b2lkID0+IHtcbiAgaWYgKCFvcHRpb25zLmV4dHJhKSB7XG4gICAgb3B0aW9ucy5leHRyYSA9IHt9O1xuICB9XG4gIGlmICghb3B0aW9ucy5leHRyYS5zZXNzaW9uKSB7XG4gICAgb3B0aW9ucy5leHRyYS5zZXNzaW9uID0ge307XG4gIH1cbiAgY29uc3Qgc2Vzc2lvbiA9IG9wdGlvbnMuZXh0cmEuc2Vzc2lvbiBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBpZiAoIXNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBzZXNzaW9uLnVzZV9vcnRfbW9kZWxfYnl0ZXNfZGlyZWN0bHkgPSAnMSc7XG4gIH1cblxuICAvLyBpZiB1c2luZyBKU0VQIHdpdGggV2ViR1BVLCBhbHdheXMgZGlzYWJsZSBtZW1vcnkgcGF0dGVyblxuICBpZiAob3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMgJiZcbiAgICAgIG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzLnNvbWUoZXAgPT4gKHR5cGVvZiBlcCA9PT0gJ3N0cmluZycgPyBlcCA6IGVwLm5hbWUpID09PSAnd2ViZ3B1JykpIHtcbiAgICBvcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4gPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3Qgc2V0RXhlY3V0aW9uUHJvdmlkZXJzID1cbiAgICAoc2Vzc2lvbk9wdGlvbnNIYW5kbGU6IG51bWJlciwgZXhlY3V0aW9uUHJvdmlkZXJzOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLkV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnW10sXG4gICAgIGFsbG9jczogbnVtYmVyW10pOiB2b2lkID0+IHtcbiAgICAgIGZvciAoY29uc3QgZXAgb2YgZXhlY3V0aW9uUHJvdmlkZXJzKSB7XG4gICAgICAgIGxldCBlcE5hbWUgPSB0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lO1xuXG4gICAgICAgIC8vIGNoZWNrIEVQIG5hbWVcbiAgICAgICAgc3dpdGNoIChlcE5hbWUpIHtcbiAgICAgICAgICBjYXNlICd4bm5wYWNrJzpcbiAgICAgICAgICAgIGVwTmFtZSA9ICdYTk5QQUNLJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3dlYm5uJzpcbiAgICAgICAgICAgIGVwTmFtZSA9ICdXRUJOTic7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb25zdCB3ZWJubk9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgICAgICAgICAgIGlmICh3ZWJubk9wdGlvbnM/LmRldmljZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKCdkZXZpY2VUeXBlJywgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcod2Vibm5PcHRpb25zLmRldmljZVR5cGUsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT1cbiAgICAgICAgICAgICAgICAgICAgMCkge1xuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAnZGV2aWNlVHlwZScgLSAke3dlYm5uT3B0aW9ucy5kZXZpY2VUeXBlfS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHdlYm5uT3B0aW9ucz8ubnVtVGhyZWFkcykge1xuICAgICAgICAgICAgICAgIGxldCBudW1UaHJlYWRzID0gd2Vibm5PcHRpb25zLm51bVRocmVhZHM7XG4gICAgICAgICAgICAgICAgLy8gSnVzdCBpZ25vcmUgaW52YWxpZCB3ZWJubk9wdGlvbnMubnVtVGhyZWFkcy5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG51bVRocmVhZHMgIT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIobnVtVGhyZWFkcykgfHwgbnVtVGhyZWFkcyA8IDApIHtcbiAgICAgICAgICAgICAgICAgIG51bVRocmVhZHMgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKCdudW1UaHJlYWRzJywgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcobnVtVGhyZWFkcy50b1N0cmluZygpLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XG4gICAgICAgICAgICAgICAgICAgIDApIHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ251bVRocmVhZHMnIC0gJHt3ZWJubk9wdGlvbnMubnVtVGhyZWFkc30uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh3ZWJubk9wdGlvbnM/LnBvd2VyUHJlZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ3Bvd2VyUHJlZmVyZW5jZScsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHdlYm5uT3B0aW9ucy5wb3dlclByZWZlcmVuY2UsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT1cbiAgICAgICAgICAgICAgICAgICAgMCkge1xuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAncG93ZXJQcmVmZXJlbmNlJyAtICR7d2Vibm5PcHRpb25zLnBvd2VyUHJlZmVyZW5jZX0uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd3ZWJncHUnOlxuICAgICAgICAgICAgZXBOYW1lID0gJ0pTJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHdlYmdwdU9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgICAgICBpZiAod2ViZ3B1T3B0aW9ucz8ucHJlZmVycmVkTGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkNIVycgJiYgd2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgIT09ICdOSFdDJykge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwcmVmZXJyZWRMYXlvdXQgbXVzdCBiZSBlaXRoZXIgJ05DSFcnIG9yICdOSFdDJzogJHt3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygncHJlZmVycmVkTGF5b3V0JywgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcod2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT1cbiAgICAgICAgICAgICAgICAgICAgMCkge1xuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAncHJlZmVycmVkTGF5b3V0JyAtICR7d2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXR9LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd2FzbSc6XG4gICAgICAgICAgY2FzZSAnY3B1JzpcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZXhlY3V0aW9uIHByb3ZpZGVyOiAke2VwTmFtZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVwTmFtZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoZXBOYW1lLCBhbGxvY3MpO1xuICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QXBwZW5kRXhlY3V0aW9uUHJvdmlkZXIoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGVwTmFtZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFwcGVuZCBleGVjdXRpb24gcHJvdmlkZXI6ICR7ZXBOYW1lfS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbmV4cG9ydCBjb25zdCBzZXRTZXNzaW9uT3B0aW9ucyA9IChvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlcltdXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xuICBjb25zdCBhbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3Qgc2Vzc2lvbk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBhcHBlbmREZWZhdWx0T3B0aW9ucyhzZXNzaW9uT3B0aW9ucyk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBncmFwaE9wdGltaXphdGlvbkxldmVsID0gZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsKHNlc3Npb25PcHRpb25zLmdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPz8gJ2FsbCcpO1xuICAgIGNvbnN0IGV4ZWN1dGlvbk1vZGUgPSBnZXRFeGVjdXRpb25Nb2RlKHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvbk1vZGUgPz8gJ3NlcXVlbnRpYWwnKTtcbiAgICBjb25zdCBsb2dJZERhdGFPZmZzZXQgPVxuICAgICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMubG9nSWQgPT09ICdzdHJpbmcnID8gYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLmxvZ0lkLCBhbGxvY3MpIDogMDtcblxuICAgIGNvbnN0IGxvZ1NldmVyaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID8/IDI7ICAvLyBEZWZhdWx0IHRvIDIgLSB3YXJuaW5nXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxvZ1NldmVyaXR5TGV2ZWwpIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPiA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXJ2ZXJpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke2xvZ1NldmVyaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9nVmVyYm9zaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCA/PyAwOyAgLy8gRGVmYXVsdCB0byAwIC0gdmVyYm9zZVxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihsb2dWZXJib3NpdHlMZXZlbCkgfHwgbG9nVmVyYm9zaXR5TGV2ZWwgPCAwIHx8IGxvZ1ZlcmJvc2l0eUxldmVsID4gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtsb2dWZXJib3NpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0ID0gdHlwZW9mIHNlc3Npb25PcHRpb25zLm9wdGltaXplZE1vZGVsRmlsZVBhdGggPT09ICdzdHJpbmcnID9cbiAgICAgICAgYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLm9wdGltaXplZE1vZGVsRmlsZVBhdGgsIGFsbG9jcykgOlxuICAgICAgICAwO1xuXG4gICAgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucyhcbiAgICAgICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCwgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVDcHVNZW1BcmVuYSwgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVNZW1QYXR0ZXJuLCBleGVjdXRpb25Nb2RlLFxuICAgICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZVByb2ZpbGluZywgMCwgbG9nSWREYXRhT2Zmc2V0LCBsb2dTZXZlcml0eUxldmVsLCBsb2dWZXJib3NpdHlMZXZlbCxcbiAgICAgICAgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCk7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgc2Vzc2lvbiBvcHRpb25zLicpO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMpIHtcbiAgICAgIHNldEV4ZWN1dGlvblByb3ZpZGVycyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwgc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzLCBhbGxvY3MpO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nOiAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIodmFsdWUpIHx8IHZhbHVlIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgdmFsdWUgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyOiAke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcobmFtZSwgYWxsb2NzKTtcbiAgICAgICAgaWYgKHdhc20uX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZShzZXNzaW9uT3B0aW9uc0hhbmRsZSwgbmFtZU9mZnNldCwgdmFsdWUpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlOiAke25hbWV9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhzZXNzaW9uT3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cbiAgICBhbGxvY3MuZm9yRWFjaChhbGxvYyA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3J9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbi8vIFRoaXMgZmlsZSBpbmNsdWRlcyBjb21tb24gZGVmaW5pdGlvbnMuIFRoZXkgZG8gTk9UIGhhdmUgZGVwZW5kZW5jeSBvbiB0aGUgV2ViQXNzZW1ibHkgaW5zdGFuY2UuXG5cbi8qKlxuICogQ29waWVkIGZyb20gT05OWCBkZWZpbml0aW9uLiBVc2UgdGhpcyB0byBkcm9wIGRlcGVuZGVuY3kgJ29ubnhfcHJvdG8nIHRvIGRlY3JlYXNlIGNvbXBpbGVkIC5qcyBmaWxlIHNpemUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIERhdGFUeXBlIHtcbiAgdW5kZWZpbmVkID0gMCxcbiAgZmxvYXQgPSAxLFxuICB1aW50OCA9IDIsXG4gIGludDggPSAzLFxuICB1aW50MTYgPSA0LFxuICBpbnQxNiA9IDUsXG4gIGludDMyID0gNixcbiAgaW50NjQgPSA3LFxuICBzdHJpbmcgPSA4LFxuICBib29sID0gOSxcbiAgZmxvYXQxNiA9IDEwLFxuICBkb3VibGUgPSAxMSxcbiAgdWludDMyID0gMTIsXG4gIHVpbnQ2NCA9IDEzLFxuICBjb21wbGV4NjQgPSAxNCxcbiAgY29tcGxleDEyOCA9IDE1LFxuICBiZmxvYXQxNiA9IDE2XG59XG5cbi8qKlxuICogTWFwIHN0cmluZyB0ZW5zb3IgZGF0YSB0byBlbnVtIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bSA9ICh0eXBlOiBzdHJpbmcpOiBEYXRhVHlwZSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2ludDgnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDg7XG4gICAgY2FzZSAndWludDgnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ4O1xuICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmJvb2w7XG4gICAgY2FzZSAnaW50MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDE2O1xuICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDE2O1xuICAgIGNhc2UgJ2ludDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQzMjtcbiAgICBjYXNlICd1aW50MzInOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQzMjtcbiAgICBjYXNlICdmbG9hdDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5mbG9hdDE2O1xuICAgIGNhc2UgJ2Zsb2F0MzInOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0O1xuICAgIGNhc2UgJ2Zsb2F0NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmRvdWJsZTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnN0cmluZztcbiAgICBjYXNlICdpbnQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50NjQ7XG4gICAgY2FzZSAndWludDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50NjQ7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgZW51bSB2YWx1ZSB0byBzdHJpbmcgdGVuc29yIGRhdGFcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nID0gKHR5cGVQcm90bzogRGF0YVR5cGUpOiBUZW5zb3IuVHlwZSA9PiB7XG4gIHN3aXRjaCAodHlwZVByb3RvKSB7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ4OlxuICAgICAgcmV0dXJuICdpbnQ4JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ4OlxuICAgICAgcmV0dXJuICd1aW50OCc7XG4gICAgY2FzZSBEYXRhVHlwZS5ib29sOlxuICAgICAgcmV0dXJuICdib29sJztcbiAgICBjYXNlIERhdGFUeXBlLmludDE2OlxuICAgICAgcmV0dXJuICdpbnQxNic7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50MTY6XG4gICAgICByZXR1cm4gJ3VpbnQxNic7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQzMjpcbiAgICAgIHJldHVybiAnaW50MzInO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDMyOlxuICAgICAgcmV0dXJuICd1aW50MzInO1xuICAgIGNhc2UgRGF0YVR5cGUuZmxvYXQxNjpcbiAgICAgIHJldHVybiAnZmxvYXQxNic7XG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDpcbiAgICAgIHJldHVybiAnZmxvYXQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS5kb3VibGU6XG4gICAgICByZXR1cm4gJ2Zsb2F0NjQnO1xuICAgIGNhc2UgRGF0YVR5cGUuc3RyaW5nOlxuICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50NjQ6XG4gICAgICByZXR1cm4gJ2ludDY0JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ2NDpcbiAgICAgIHJldHVybiAndWludDY0JztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlUHJvdG99YCk7XG4gIH1cbn07XG5cbi8qKlxuICogZ2V0IHRlbnNvciBlbGVtZW50IHNpemUgaW4gYnl0ZXMgYnkgdGhlIGdpdmVuIGRhdGEgdHlwZVxuICogQHJldHVybnMgc2l6ZSBpbiBpbnRlZ2VyIG9yIHVuZGVmaW5lZCBpZiB0aGUgZGF0YSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFRlbnNvckVsZW1lbnRTaXplID0gKGRhdGVUeXBlOiBudW1iZXIpOiBudW1iZXJ8XG4gICAgdW5kZWZpbmVkID0+IFt1bmRlZmluZWQsIDQsIDEsIDEsIDIsIDIsIDQsIDgsIHVuZGVmaW5lZCwgMSwgMiwgOCwgNCwgOCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1bZGF0ZVR5cGVdO1xuXG4vKipcbiAqIGdldCB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvciBieSB0aGUgZ2l2ZW4gdGVuc29yIHR5cGVcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3RvciA9ICh0eXBlOiBUZW5zb3IuVHlwZSk6IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yfFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxcbiAgICBJbnQ4QXJyYXlDb25zdHJ1Y3RvcnxVaW50MTZBcnJheUNvbnN0cnVjdG9yfEludDE2QXJyYXlDb25zdHJ1Y3RvcnxJbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfFxuICAgIFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxGbG9hdDY0QXJyYXlDb25zdHJ1Y3RvcnxVaW50MzJBcnJheUNvbnN0cnVjdG9yfEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3IgPT4ge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2Zsb2F0MTYnOlxuICAgICAgICAgIHJldHVybiBVaW50MTZBcnJheTtcbiAgICAgICAgY2FzZSAnZmxvYXQzMic6XG4gICAgICAgICAgcmV0dXJuIEZsb2F0MzJBcnJheTtcbiAgICAgICAgY2FzZSAndWludDgnOlxuICAgICAgICAgIHJldHVybiBVaW50OEFycmF5O1xuICAgICAgICBjYXNlICdpbnQ4JzpcbiAgICAgICAgICByZXR1cm4gSW50OEFycmF5O1xuICAgICAgICBjYXNlICd1aW50MTYnOlxuICAgICAgICAgIHJldHVybiBVaW50MTZBcnJheTtcbiAgICAgICAgY2FzZSAnaW50MTYnOlxuICAgICAgICAgIHJldHVybiBJbnQxNkFycmF5O1xuICAgICAgICBjYXNlICdpbnQzMic6XG4gICAgICAgICAgcmV0dXJuIEludDMyQXJyYXk7XG4gICAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgICAgIHJldHVybiBVaW50OEFycmF5O1xuICAgICAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgICAgICByZXR1cm4gRmxvYXQ2NEFycmF5O1xuICAgICAgICBjYXNlICd1aW50MzInOlxuICAgICAgICAgIHJldHVybiBVaW50MzJBcnJheTtcbiAgICAgICAgY2FzZSAnaW50NjQnOlxuICAgICAgICAgIHJldHVybiBCaWdJbnQ2NEFycmF5O1xuICAgICAgICBjYXNlICd1aW50NjQnOlxuICAgICAgICAgIHJldHVybiBCaWdVaW50NjRBcnJheTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgIH1cbiAgICB9O1xuXG4vKipcbiAqIE1hcCBzdHJpbmcgbG9nIGxldmVsIHRvIGludGVnZXIgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGxvZ0xldmVsU3RyaW5nVG9FbnVtID0gKGxvZ0xldmVsPzogJ3ZlcmJvc2UnfCdpbmZvJ3wnd2FybmluZyd8J2Vycm9yJ3wnZmF0YWwnKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2dMZXZlbCkge1xuICAgIGNhc2UgJ3ZlcmJvc2UnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2ZhdGFsJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7bG9nTGV2ZWx9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGVuc29yIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IEdQVSBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSA9ICh0eXBlOiBUZW5zb3IuVHlwZSk6IHR5cGUgaXMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcyA9PiB0eXBlID09PSAnZmxvYXQzMicgfHxcbiAgICB0eXBlID09PSAnaW50MzInIHx8IHR5cGUgPT09ICdpbnQ2NCcgfHwgdHlwZSA9PT0gJ2Jvb2wnIHx8IHR5cGUgPT09ICdmbG9hdDE2JyB8fCB0eXBlID09PSAndWludDMyJztcblxuLyoqXG4gKiBNYXAgc3RyaW5nIGRhdGEgbG9jYXRpb24gdG8gaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtID0gKGxvY2F0aW9uOiBUZW5zb3IuRGF0YUxvY2F0aW9uKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2NhdGlvbikge1xuICAgIGNhc2UgJ25vbmUnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgbG9jYXRpb246ICR7bG9jYXRpb259YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGludGVnZXIgZGF0YSBsb2NhdGlvbiB0byBzdHJpbmcgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvbkVudW1Ub1N0cmluZyA9IChsb2NhdGlvbjogbnVtYmVyKTogVGVuc29yLkRhdGFMb2NhdGlvbnx1bmRlZmluZWQgPT5cbiAgICAoWydub25lJywgJ2NwdScsICdjcHUtcGlubmVkJywgJ3RleHR1cmUnLCAnZ3B1LWJ1ZmZlciddIGFzIGNvbnN0KVtsb2NhdGlvbl07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7RW52LCBJbmZlcmVuY2VTZXNzaW9uLCBUZW5zb3J9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7U2VyaWFsaXphYmxlTW9kZWxkYXRhLCBTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGEsIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhLCBUZW5zb3JNZXRhZGF0YX0gZnJvbSAnLi9wcm94eS1tZXNzYWdlcyc7XG5pbXBvcnQge3NldFJ1bk9wdGlvbnN9IGZyb20gJy4vcnVuLW9wdGlvbnMnO1xuaW1wb3J0IHtzZXRTZXNzaW9uT3B0aW9uc30gZnJvbSAnLi9zZXNzaW9uLW9wdGlvbnMnO1xuaW1wb3J0IHtkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0sIGdldFRlbnNvckVsZW1lbnRTaXplLCBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUsIGxvZ0xldmVsU3RyaW5nVG9FbnVtLCB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZywgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0sIHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcn0gZnJvbSAnLi93YXNtLWNvbW1vbic7XG5pbXBvcnQge2dldEluc3RhbmNlfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQge2FsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3J9IGZyb20gJy4vd2FzbS11dGlscyc7XG5cbmxldCBvcnRFbnZJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4vKipcbiAqIGdldCB0aGUgaW5wdXQvb3V0cHV0IGNvdW50IG9mIHRoZSBzZXNzaW9uLlxuICogQHBhcmFtIHNlc3Npb25IYW5kbGUgdGhlIGhhbmRsZSByZXByZXNlbnRpbmcgdGhlIHNlc3Npb24uIHNob3VsZCBiZSBub24temVyby5cbiAqIEByZXR1cm5zIGEgdHVwbGUgaW5jbHVkaW5nIDIgbnVtYmVycywgcmVwcmVzZW50aW5nIHRoZSBpbnB1dCBjb3VudCBhbmQgb3V0cHV0IGNvdW50LlxuICovXG5jb25zdCBnZXRTZXNzaW9uSW5wdXRPdXRwdXRDb3VudCA9IChzZXNzaW9uSGFuZGxlOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDgpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldElucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSwgZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIDQpO1xuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGdldCBzZXNzaW9uIGlucHV0L291dHB1dCBjb3VudC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIFt3YXNtLkhFQVAzMltkYXRhT2Zmc2V0IC8gNF0sIHdhc20uSEVBUDMyW2RhdGFPZmZzZXQgLyA0ICsgMV1dO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbml0aWFsaXplIE9SVCBlbnZpcm9ubWVudC5cbiAqIEBwYXJhbSBudW1UaHJlYWRzIFNldEdsb2JhbEludHJhT3BOdW1UaHJlYWRzKG51bVRocmVhZHMpXG4gKiBAcGFyYW0gbG9nZ2luZ0xldmVsIENyZWF0ZUVudihzdGF0aWNfY2FzdDxPcnRMb2dnaW5nTGV2ZWw+KGxvZ2dpbmdfbGV2ZWwpKVxuICovXG5jb25zdCBpbml0T3J0ID0gKG51bVRocmVhZHM6IG51bWJlciwgbG9nZ2luZ0xldmVsOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgY29uc3QgZXJyb3JDb2RlID0gZ2V0SW5zdGFuY2UoKS5fT3J0SW5pdChudW1UaHJlYWRzLCBsb2dnaW5nTGV2ZWwpO1xuICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgaW5pdGlhbGl6ZSBvbm54cnVudGltZS4nKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbnRpYWxpemUgcnVudGltZSBlbnZpcm9ubWVudC5cbiAqIEBwYXJhbSBlbnYgcGFzc2VkIGluIHRoZSBlbnZpcm9ubWVudCBjb25maWcgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgaW5pdFJ1bnRpbWUgPSBhc3luYyhlbnY6IEVudik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAvLyBpbml0IE9SVFxuICBpbml0T3J0KGVudi53YXNtLm51bVRocmVhZHMhLCBsb2dMZXZlbFN0cmluZ1RvRW51bShlbnYubG9nTGV2ZWwpKTtcblxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgICAvLyBpbml0IEpTRVAgaWYgYXZhaWxhYmxlXG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuICAgIGNvbnN0IGluaXRKc2VwID0gcmVxdWlyZSgnLi9qc2VwL2luaXQnKS5pbml0O1xuICAgIGF3YWl0IGluaXRKc2VwKGdldEluc3RhbmNlKCksIGVudik7XG4gIH1cblxuICBvcnRFbnZJbml0aWFsaXplZCA9IHRydWU7XG59O1xuXG4vKipcbiAqIHZhbGlkIGRhdGEgbG9jYXRpb25zIGZvciBpbnB1dC9vdXRwdXQgdGVuc29ycy5cbiAqL1xudHlwZSBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dCA9ICdjcHUnfCdjcHUtcGlubmVkJ3wnZ3B1LWJ1ZmZlcic7XG5cbnR5cGUgSU9CaW5kaW5nU3RhdGUgPSB7XG4gIC8qKlxuICAgKiB0aGUgaGFuZGxlIG9mIElPIGJpbmRpbmcuXG4gICAqL1xuICByZWFkb25seSBoYW5kbGU6IG51bWJlcjtcblxuICAvKipcbiAgICogdGhlIHByZWZlcnJlZCBsb2NhdGlvbiBmb3IgZWFjaCBvdXRwdXQgdGVuc29yLlxuICAgKlxuICAgKiB2YWx1ZSBpcyBvbmUgb2YgJ2NwdScsICdjcHUtcGlubmVkJywgJ2dwdS1idWZmZXInLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zOiByZWFkb25seSBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dFtdO1xuXG4gIC8qKlxuICAgKiBlbnVtIHZhbHVlIG9mIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IHJlYWRvbmx5IG51bWJlcltdO1xufTtcblxuLyoqXG4gKiAgdHVwbGUgZWxlbWVudHMgYXJlOiBJbmZlcmVuY2VTZXNzaW9uIElEOyBpbnB1dE5hbWVzVVRGOEVuY29kZWQ7IG91dHB1dE5hbWVzVVRGOEVuY29kZWQ7IGJpbmRpbmdTdGF0ZVxuICovXG50eXBlIFNlc3Npb25NZXRhZGF0YSA9IFtcbiAgaW5mZXJlbmNlU2Vzc2lvbklkOiBudW1iZXIsIGlucHV0TmFtZXNVVEY4RW5jb2RlZDogbnVtYmVyW10sIG91dHB1dE5hbWVzVVRGOEVuY29kZWQ6IG51bWJlcltdLFxuICBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlfG51bGxcbl07XG5cbmNvbnN0IGFjdGl2ZVNlc3Npb25zID0gbmV3IE1hcDxudW1iZXIsIFNlc3Npb25NZXRhZGF0YT4oKTtcblxuZXhwb3J0IGNvbnN0IGlzT3J0RW52SW5pdGlhbGl6ZWQgPSAoKTogYm9vbGVhbiA9PiBvcnRFbnZJbml0aWFsaXplZDtcblxuLyoqXG4gKiBhbGxvY2F0ZSB0aGUgbWVtb3J5IGFuZCBtZW1jcHkgdGhlIG1vZGVsIGJ5dGVzLCBwcmVwYXJpbmcgZm9yIGNyZWF0aW5nIGFuIGluc3RhbmNlIG9mIEluZmVyZW5jZVNlc3Npb24uXG4gKiBAcmV0dXJucyBhIDItZWxlbWVudHMgdHVwbGUgLSB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgYWxsb2NhdGVkIGJ1ZmZlclxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbkFsbG9jYXRlID0gKG1vZGVsOiBVaW50OEFycmF5KTogW251bWJlciwgbnVtYmVyXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBtb2RlbERhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MobW9kZWwuYnl0ZUxlbmd0aCk7XG4gIGlmIChtb2RlbERhdGFPZmZzZXQgPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGNyZWF0ZSBhIHNlc3Npb24uIGZhaWxlZCB0byBhbGxvY2F0ZSBhIGJ1ZmZlciBvZiBzaXplICR7bW9kZWwuYnl0ZUxlbmd0aH0uYCk7XG4gIH1cbiAgd2FzbS5IRUFQVTguc2V0KG1vZGVsLCBtb2RlbERhdGFPZmZzZXQpO1xuICByZXR1cm4gW21vZGVsRGF0YU9mZnNldCwgbW9kZWwuYnl0ZUxlbmd0aF07XG59O1xuXG4vKipcbiAqIGNyZWF0ZSBhbiBpbmZlcmVuY2Ugc2Vzc2lvbiB1c2luZyB0aGUgcHJlcGFyZWQgYnVmZmVyIGNvbnRhaW5pbmcgdGhlIG1vZGVsIGRhdGEuXG4gKiBAcGFyYW0gbW9kZWxEYXRhIGEgMi1lbGVtZW50cyB0dXBsZSBjb250YWluaW5nIHRoZSBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBtb2RlbCBkYXRhIGJ1ZmZlci5cbiAqIEBwYXJhbSBvcHRpb25zIGFuIG9wdGlvbmFsIHNlc3Npb24gb3B0aW9ucyBvYmplY3QuXG4gKiBAcmV0dXJucyBhIDMtZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyBbc2Vzc2lvbiBoYW5kbGUsIGlucHV0IG5hbWVzLCBvdXRwdXQgbmFtZXNdXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uRmluYWxpemUgPVxuICAgIChtb2RlbERhdGE6IFNlcmlhbGl6YWJsZU1vZGVsZGF0YSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGEgPT4ge1xuICAgICAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgICAgIGxldCBzZXNzaW9uSGFuZGxlID0gMDtcbiAgICAgIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XG4gICAgICBsZXQgaW9CaW5kaW5nSGFuZGxlID0gMDtcbiAgICAgIGxldCBhbGxvY3M6IG51bWJlcltdID0gW107XG4gICAgICBjb25zdCBpbnB1dE5hbWVzVVRGOEVuY29kZWQgPSBbXTtcbiAgICAgIGNvbnN0IG91dHB1dE5hbWVzVVRGOEVuY29kZWQgPSBbXTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdID0gc2V0U2Vzc2lvbk9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAgICAgc2Vzc2lvbkhhbmRsZSA9IHdhc20uX09ydENyZWF0ZVNlc3Npb24obW9kZWxEYXRhWzBdLCBtb2RlbERhdGFbMV0sIHNlc3Npb25PcHRpb25zSGFuZGxlKTtcbiAgICAgICAgaWYgKHNlc3Npb25IYW5kbGUgPT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgYSBzZXNzaW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgW2lucHV0Q291bnQsIG91dHB1dENvdW50XSA9IGdldFNlc3Npb25JbnB1dE91dHB1dENvdW50KHNlc3Npb25IYW5kbGUpO1xuXG4gICAgICAgIGNvbnN0IGlucHV0TmFtZXMgPSBbXTtcbiAgICAgICAgY29uc3Qgb3V0cHV0TmFtZXMgPSBbXTtcbiAgICAgICAgY29uc3Qgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zOiBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dFtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHdhc20uX09ydEdldElucHV0TmFtZShzZXNzaW9uSGFuZGxlLCBpKTtcbiAgICAgICAgICBpZiAobmFtZSA9PT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgZ2V0IGFuIGlucHV0IG5hbWUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlucHV0TmFtZXNVVEY4RW5jb2RlZC5wdXNoKG5hbWUpO1xuICAgICAgICAgIGlucHV0TmFtZXMucHVzaCh3YXNtLlVURjhUb1N0cmluZyhuYW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHdhc20uX09ydEdldE91dHB1dE5hbWUoc2Vzc2lvbkhhbmRsZSwgaSk7XG4gICAgICAgICAgaWYgKG5hbWUgPT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGdldCBhbiBvdXRwdXQgbmFtZS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5wdXNoKG5hbWUpO1xuICAgICAgICAgIGNvbnN0IG5hbWVTdHJpbmcgPSB3YXNtLlVURjhUb1N0cmluZyhuYW1lKTtcbiAgICAgICAgICBvdXRwdXROYW1lcy5wdXNoKG5hbWVTdHJpbmcpO1xuXG4gICAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IHR5cGVvZiBvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbiA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gOlxuICAgICAgICAgICAgICAgIG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uPy5bbmFtZVN0cmluZ10gPz8gJ2NwdSc7XG4gICAgICAgICAgICBpZiAobG9jYXRpb24gIT09ICdjcHUnICYmIGxvY2F0aW9uICE9PSAnY3B1LXBpbm5lZCcgJiYgbG9jYXRpb24gIT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcHJlZmVycmVkIG91dHB1dCBsb2NhdGlvbjogJHtsb2NhdGlvbn0uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMucHVzaChsb2NhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXNlIElPIGJpbmRpbmcgb25seSB3aGVuIGF0IGxlYXN0IG9uZSBvdXRwdXQgaXMgcHJlZmZlcmVkIHRvIGJlIG9uIEdQVS5cbiAgICAgICAgbGV0IGJpbmRpbmdTdGF0ZTogSU9CaW5kaW5nU3RhdGV8bnVsbCA9IG51bGw7XG4gICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSAmJiBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMuc29tZShsID0+IGwgPT09ICdncHUtYnVmZmVyJykpIHtcbiAgICAgICAgICBpb0JpbmRpbmdIYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVCaW5kaW5nKHNlc3Npb25IYW5kbGUpO1xuICAgICAgICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgPT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBJTyBiaW5kaW5nLicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJpbmRpbmdTdGF0ZSA9IHtcbiAgICAgICAgICAgIGhhbmRsZTogaW9CaW5kaW5nSGFuZGxlLFxuICAgICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLFxuICAgICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZDogb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLm1hcChsID0+IGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bShsKSksXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGl2ZVNlc3Npb25zLnNldChzZXNzaW9uSGFuZGxlLCBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBiaW5kaW5nU3RhdGVdKTtcbiAgICAgICAgcmV0dXJuIFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzLCBvdXRwdXROYW1lc107XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlucHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goYnVmID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG5cbiAgICAgICAgaWYgKGlvQmluZGluZ0hhbmRsZSAhPT0gMCkge1xuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VCaW5kaW5nKGlvQmluZGluZ0hhbmRsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vzc2lvbkhhbmRsZSAhPT0gMCkge1xuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VTZXNzaW9uKHNlc3Npb25IYW5kbGUpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLl9mcmVlKG1vZGVsRGF0YVswXSk7XG4gICAgICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucyhzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgYWxsb2NzLmZvckVhY2goYWxsb2MgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xuICAgICAgfVxuICAgIH07XG5cblxuLyoqXG4gKiBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgSW5mZXJlbmNlU2Vzc2lvbi5cbiAqIEByZXR1cm5zIHRoZSBtZXRhZGF0YSBvZiBJbmZlcmVuY2VTZXNzaW9uLiAwLXZhbHVlIGhhbmRsZSBmb3IgZmFpbHVyZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb24gPVxuICAgIChtb2RlbDogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGEgPT4ge1xuICAgICAgY29uc3QgbW9kZWxEYXRhOiBTZXJpYWxpemFibGVNb2RlbGRhdGEgPSBjcmVhdGVTZXNzaW9uQWxsb2NhdGUobW9kZWwpO1xuICAgICAgcmV0dXJuIGNyZWF0ZVNlc3Npb25GaW5hbGl6ZShtb2RlbERhdGEsIG9wdGlvbnMpO1xuICAgIH07XG5cbmV4cG9ydCBjb25zdCByZWxlYXNlU2Vzc2lvbiA9IChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCByZWxlYXNlIHNlc3Npb24uIGludmFsaWQgc2Vzc2lvbiBpZDogJHtzZXNzaW9uSWR9YCk7XG4gIH1cbiAgY29uc3QgW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZCwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCwgaW9CaW5kaW5nU3RhdGVdID0gc2Vzc2lvbjtcblxuICBpZiAoaW9CaW5kaW5nU3RhdGUpIHtcbiAgICB3YXNtLl9PcnRSZWxlYXNlQmluZGluZyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpO1xuICB9XG5cbiAgd2FzbS5qc2VwVW5yZWdpc3RlckJ1ZmZlcnM/LihzZXNzaW9uSWQpO1xuXG4gIGlucHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goYnVmID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG4gIHdhc20uX09ydFJlbGVhc2VTZXNzaW9uKHNlc3Npb25IYW5kbGUpO1xuICBhY3RpdmVTZXNzaW9ucy5kZWxldGUoc2Vzc2lvbklkKTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IgPVxuICAgICh0ZW5zb3I6IFRlbnNvck1ldGFkYXRhfG51bGwsIHRlbnNvckhhbmRsZXM6IG51bWJlcltdLCBhbGxvY3M6IG51bWJlcltdLCBzZXNzaW9uSWQ6IG51bWJlciwgaW5kZXg6IG51bWJlcik6XG4gICAgICAgIHZvaWQgPT4ge1xuICAgICAgICAgIGlmICghdGVuc29yKSB7XG4gICAgICAgICAgICB0ZW5zb3JIYW5kbGVzLnB1c2goMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcbiAgICAgICAgICBjb25zdCBkaW1zID0gdGVuc29yWzFdO1xuICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGVuc29yWzNdO1xuXG4gICAgICAgICAgbGV0IHJhd0RhdGE6IG51bWJlcjtcbiAgICAgICAgICBsZXQgZGF0YUJ5dGVMZW5ndGg6IG51bWJlcjtcblxuICAgICAgICAgIGlmIChkYXRhVHlwZSA9PT0gJ3N0cmluZycgJiYgbG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChsb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICBjb25zdCBncHVCdWZmZXIgPSB0ZW5zb3JbMl0uZ3B1QnVmZmVyIGFzIEdQVUJ1ZmZlcjtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTaXplSW5CeXRlcyA9IGdldFRlbnNvckVsZW1lbnRTaXplKHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSkhO1xuICAgICAgICAgICAgZGF0YUJ5dGVMZW5ndGggPSBkaW1zLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpICogZWxlbWVudFNpemVJbkJ5dGVzO1xuICAgICAgICAgICAgcmF3RGF0YSA9IHdhc20uanNlcFJlZ2lzdGVyQnVmZmVyKHNlc3Npb25JZCwgaW5kZXgsIGdwdUJ1ZmZlciwgZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gNCAqIGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICByYXdEYXRhID0gd2FzbS5fbWFsbG9jKGRhdGFCeXRlTGVuZ3RoKTtcbiAgICAgICAgICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICAgICAgICAgIGxldCBkYXRhSW5kZXggPSByYXdEYXRhIC8gNDtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdGVuc29yIGRhdGEgYXQgaW5kZXggJHtpfSBpcyBub3QgYSBzdHJpbmdgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2FzbS5IRUFQVTMyW2RhdGFJbmRleCsrXSA9IGFsbG9jV2FzbVN0cmluZyhkYXRhW2ldLCBhbGxvY3MpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICAgICAgICAgIGFsbG9jcy5wdXNoKHJhd0RhdGEpO1xuICAgICAgICAgICAgICB3YXNtLkhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YUJ5dGVMZW5ndGgpLCByYXdEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gICAgICAgICAgY29uc3QgZGltc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogZGltcy5sZW5ndGgpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGltSW5kZXggPSBkaW1zT2Zmc2V0IC8gNDtcbiAgICAgICAgICAgIGRpbXMuZm9yRWFjaChkID0+IHdhc20uSEVBUDMyW2RpbUluZGV4KytdID0gZCk7XG4gICAgICAgICAgICBjb25zdCB0ZW5zb3IgPSB3YXNtLl9PcnRDcmVhdGVUZW5zb3IoXG4gICAgICAgICAgICAgICAgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpLCByYXdEYXRhLCBkYXRhQnl0ZUxlbmd0aCwgZGltc09mZnNldCwgZGltcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGxvY2F0aW9uKSk7XG4gICAgICAgICAgICBpZiAodGVuc29yID09PSAwKSB7XG4gICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBjcmVhdGUgdGVuc29yIGZvciBpbnB1dC9vdXRwdXQuIHNlc3Npb249JHtzZXNzaW9uSWR9LCBpbmRleD0ke2luZGV4fS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbnNvckhhbmRsZXMucHVzaCh0ZW5zb3IpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4vKipcbiAqIHBlcmZvcm0gaW5mZXJlbmNlIHJ1blxuICovXG5leHBvcnQgY29uc3QgcnVuID0gYXN5bmMoXG4gICAgc2Vzc2lvbklkOiBudW1iZXIsIGlucHV0SW5kaWNlczogbnVtYmVyW10sIGlucHV0VGVuc29yczogVGVuc29yTWV0YWRhdGFbXSwgb3V0cHV0SW5kaWNlczogbnVtYmVyW10sXG4gICAgb3V0cHV0VGVuc29yczogQXJyYXk8VGVuc29yTWV0YWRhdGF8bnVsbD4sIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8VGVuc29yTWV0YWRhdGFbXT4gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBydW4gaW5mZXJlbmNlLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xuICB9XG4gIGNvbnN0IFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGlvQmluZGluZ1N0YXRlXSA9IHNlc3Npb247XG5cbiAgY29uc3QgaW5wdXRDb3VudCA9IGlucHV0SW5kaWNlcy5sZW5ndGg7XG4gIGNvbnN0IG91dHB1dENvdW50ID0gb3V0cHV0SW5kaWNlcy5sZW5ndGg7XG5cbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xuICBsZXQgcnVuT3B0aW9uc0FsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBpbnB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IG91dHB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IGlucHV0T3V0cHV0QWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IGJlZm9yZVJ1blN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgY29uc3QgaW5wdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIDQpO1xuICBjb25zdCBpbnB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKGlucHV0Q291bnQgKiA0KTtcbiAgY29uc3Qgb3V0cHV0VmFsdWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG4gIGNvbnN0IG91dHB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG5cbiAgdHJ5IHtcbiAgICBbcnVuT3B0aW9uc0hhbmRsZSwgcnVuT3B0aW9uc0FsbG9jc10gPSBzZXRSdW5PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgLy8gY3JlYXRlIGlucHV0IHRlbnNvcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKGlucHV0VGVuc29yc1tpXSwgaW5wdXRUZW5zb3JIYW5kbGVzLCBpbnB1dE91dHB1dEFsbG9jcywgc2Vzc2lvbklkLCBpbnB1dEluZGljZXNbaV0pO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBvdXRwdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKFxuICAgICAgICAgIG91dHB1dFRlbnNvcnNbaV0sIG91dHB1dFRlbnNvckhhbmRsZXMsIGlucHV0T3V0cHV0QWxsb2NzLCBzZXNzaW9uSWQsIGlucHV0Q291bnQgKyBvdXRwdXRJbmRpY2VzW2ldKTtcbiAgICB9XG5cbiAgICBsZXQgaW5wdXRWYWx1ZXNJbmRleCA9IGlucHV0VmFsdWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgaW5wdXROYW1lc0luZGV4ID0gaW5wdXROYW1lc09mZnNldCAvIDQ7XG4gICAgbGV0IG91dHB1dFZhbHVlc0luZGV4ID0gb3V0cHV0VmFsdWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgb3V0cHV0TmFtZXNJbmRleCA9IG91dHB1dE5hbWVzT2Zmc2V0IC8gNDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5IRUFQVTMyW2lucHV0VmFsdWVzSW5kZXgrK10gPSBpbnB1dFRlbnNvckhhbmRsZXNbaV07XG4gICAgICB3YXNtLkhFQVBVMzJbaW5wdXROYW1lc0luZGV4KytdID0gaW5wdXROYW1lc1VURjhFbmNvZGVkW2lucHV0SW5kaWNlc1tpXV07XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5IRUFQVTMyW291dHB1dFZhbHVlc0luZGV4KytdID0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXTtcbiAgICAgIHdhc20uSEVBUFUzMltvdXRwdXROYW1lc0luZGV4KytdID0gb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtvdXRwdXRJbmRpY2VzW2ldXTtcbiAgICB9XG5cbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgaW9CaW5kaW5nU3RhdGUpIHtcbiAgICAgIGNvbnN0IHtoYW5kbGUsIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucywgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZH0gPSBpb0JpbmRpbmdTdGF0ZTtcblxuICAgICAgaWYgKGlucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGggIT09IGlucHV0Q291bnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCBjb3VudCBmcm9tIGZlZWRzICgke1xuICAgICAgICAgICAgaW5wdXRDb3VudH0pIGlzIGV4cGVjdGVkIHRvIGJlIGFsd2F5cyBlcXVhbCB0byBtb2RlbCdzIGlucHV0IGNvdW50ICgke2lucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGh9KS5gKTtcbiAgICAgIH1cblxuICAgICAgLy8gcHJvY2VzcyBpbnB1dHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaW5wdXRJbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRCaW5kSW5wdXQoaGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCBpbnB1dFRlbnNvckhhbmRsZXNbaV0pO1xuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgaW5wdXRbJHtpfV0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHByb2Nlc3MgcHJlLWFsbG9jYXRlZCBvdXRwdXRzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBvdXRwdXRJbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IG91dHB1dFRlbnNvcnNbaV0/LlszXTsgIC8vIHVuZGVmaW5lZCBtZWFucyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuXG5cbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgLy8gb3V0cHV0IGlzIHByZS1hbGxvY2F0ZWQuIGJpbmQgdGhlIHRlbnNvci5cbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRCaW5kT3V0cHV0KGhhbmRsZSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIG91dHB1dFRlbnNvckhhbmRsZXNbaV0sIDApO1xuICAgICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIHByZS1hbGxvY2F0ZWQgb3V0cHV0WyR7aX1dIGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb3V0cHV0IGlzIG5vdCBwcmUtYWxsb2NhdGVkLiByZXNldCBwcmVmZXJyZWQgbG9jYXRpb24uXG4gICAgICAgICAgY29uc3QgZXJyb3JDb2RlID1cbiAgICAgICAgICAgICAgd2FzbS5fT3J0QmluZE91dHB1dChoYW5kbGUsIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCAwLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkW2luZGV4XSk7XG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgb3V0cHV0WyR7aX1dIHRvICR7b3V0cHV0UHJlZmVycmVkTG9jYXRpb25zW2ldfSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGVycm9yQ29kZTogbnVtYmVyO1xuXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVICYmIGlvQmluZGluZ1N0YXRlKSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW5XaXRoQmluZGluZyhcbiAgICAgICAgICBzZXNzaW9uSGFuZGxlLCBpb0JpbmRpbmdTdGF0ZS5oYW5kbGUsIG91dHB1dENvdW50LCBvdXRwdXRWYWx1ZXNPZmZzZXQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW4oXG4gICAgICAgICAgc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc09mZnNldCwgaW5wdXRWYWx1ZXNPZmZzZXQsIGlucHV0Q291bnQsIG91dHB1dE5hbWVzT2Zmc2V0LCBvdXRwdXRDb3VudCxcbiAgICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cblxuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdmYWlsZWQgdG8gY2FsbCBPcnRSdW4oKS4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXQ6IFRlbnNvck1ldGFkYXRhW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgdGVuc29yID0gd2FzbS5IRUFQVTMyW291dHB1dFZhbHVlc09mZnNldCAvIDQgKyBpXTtcbiAgICAgIGlmICh0ZW5zb3IgPT09IG91dHB1dFRlbnNvckhhbmRsZXNbaV0pIHtcbiAgICAgICAgLy8gb3V0cHV0IHRlbnNvciBpcyBwcmUtYWxsb2NhdGVkLiBubyBuZWVkIHRvIGNvcHkgZGF0YS5cbiAgICAgICAgb3V0cHV0LnB1c2gob3V0cHV0VGVuc29yc1tpXSEpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgICAgIC8vIHN0YWNrIGFsbG9jYXRlIDQgcG9pbnRlciB2YWx1ZVxuICAgICAgY29uc3QgdGVuc29yRGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogNCk7XG5cbiAgICAgIGxldCBrZWVwT3V0cHV0VGVuc29yID0gZmFsc2U7XG4gICAgICBsZXQgdHlwZTogVGVuc29yLlR5cGV8dW5kZWZpbmVkLCBkYXRhT2Zmc2V0ID0gMDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldFRlbnNvckRhdGEoXG4gICAgICAgICAgICB0ZW5zb3IsIHRlbnNvckRhdGFPZmZzZXQsIHRlbnNvckRhdGFPZmZzZXQgKyA0LCB0ZW5zb3JEYXRhT2Zmc2V0ICsgOCwgdGVuc29yRGF0YU9mZnNldCArIDEyKTtcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBhY2Nlc3Mgb3V0cHV0IHRlbnNvciBkYXRhIG9uIGluZGV4ICR7aX0uYCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRlbnNvckRhdGFJbmRleCA9IHRlbnNvckRhdGFPZmZzZXQgLyA0O1xuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGRhdGFPZmZzZXQgPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgY29uc3QgZGltc0xlbmd0aCA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGNvbnN0IGRpbXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBkaW1zLnB1c2god2FzbS5IRUFQVTMyW2RpbXNPZmZzZXQgLyA0ICsgaV0pO1xuICAgICAgICB9XG4gICAgICAgIHdhc20uX09ydEZyZWUoZGltc09mZnNldCk7XG5cbiAgICAgICAgY29uc3Qgc2l6ZSA9IGRpbXMucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSk7XG4gICAgICAgIHR5cGUgPSB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhkYXRhVHlwZSk7XG5cbiAgICAgICAgY29uc3QgcHJlZmVycmVkTG9jYXRpb24gPSBpb0JpbmRpbmdTdGF0ZT8ub3V0cHV0UHJlZmVycmVkTG9jYXRpb25zW291dHB1dEluZGljZXNbaV1dO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN0cmluZ0RhdGE6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgbGV0IGRhdGFJbmRleCA9IGRhdGFPZmZzZXQgLyA0O1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB3YXNtLkhFQVBVMzJbZGF0YUluZGV4KytdO1xuICAgICAgICAgICAgY29uc3QgbWF4Qnl0ZXNUb1JlYWQgPSBpID09PSBzaXplIC0gMSA/IHVuZGVmaW5lZCA6IHdhc20uSEVBUFUzMltkYXRhSW5kZXhdIC0gb2Zmc2V0O1xuICAgICAgICAgICAgc3RyaW5nRGF0YS5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG9mZnNldCwgbWF4Qnl0ZXNUb1JlYWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIHN0cmluZ0RhdGEsICdjcHUnXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgYSBjZXJ0YWluIG91dHB1dCdzIHByZWZlcnJlZCBsb2NhdGlvbiBpcyBHUFUgYnV0IHRoZSB0ZW5zb3IgaXMgZW1wdHksIHdlIHN0aWxsIG5lZWQgdG8gY3JlYXRlIGEgQ1BVXG4gICAgICAgICAgLy8gdGVuc29yIGZvciBpdC4gVGhlcmUgaXMgbm8gbWFwcGluZyBHUFUgYnVmZmVyIGZvciBhbiBlbXB0eSB0ZW5zb3IuXG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgJiYgc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IHdhc20uanNlcEdldEJ1ZmZlcihkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTaXplID0gZ2V0VGVuc29yRWxlbWVudFNpemUoZGF0YVR5cGUpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRTaXplID09PSB1bmRlZmluZWQgfHwgIWlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSh0eXBlKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkbyBub3QgcmVsZWFzZSB0aGUgdGVuc29yIHJpZ2h0IG5vdy4gaXQgd2lsbCBiZSByZWxlYXNlZCB3aGVuIHVzZXIgY2FsbHMgdGVuc29yLmRpc3Bvc2UoKS5cbiAgICAgICAgICAgIGtlZXBPdXRwdXRUZW5zb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBvdXRwdXQucHVzaChbXG4gICAgICAgICAgICAgIHR5cGUsIGRpbXMsIHtcbiAgICAgICAgICAgICAgICBncHVCdWZmZXIsXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6IHdhc20uanNlcENyZWF0ZURvd25sb2FkZXIoZ3B1QnVmZmVyLCBzaXplICogZWxlbWVudFNpemUsIHR5cGUpLFxuICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICdncHUtYnVmZmVyJ1xuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgdHlwZWRBcnJheUNvbnN0cnVjdG9yKHNpemUpO1xuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIC5zZXQod2FzbS5IRUFQVTguc3ViYXJyYXkoZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aCkpO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIGRhdGEsICdjcHUnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLnN0YWNrUmVzdG9yZShiZWZvcmVHZXRUZW5zb3JEYXRhU3RhY2spO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgZGF0YU9mZnNldCkge1xuICAgICAgICAgIHdhc20uX2ZyZWUoZGF0YU9mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFrZWVwT3V0cHV0VGVuc29yKSB7XG4gICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlvQmluZGluZ1N0YXRlKSB7XG4gICAgICB3YXNtLl9PcnRDbGVhckJvdW5kT3V0cHV0cyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xuXG4gICAgaW5wdXRUZW5zb3JIYW5kbGVzLmZvckVhY2godiA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcbiAgICBvdXRwdXRUZW5zb3JIYW5kbGVzLmZvckVhY2godiA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcbiAgICBpbnB1dE91dHB1dEFsbG9jcy5mb3JFYWNoKHAgPT4gd2FzbS5fZnJlZShwKSk7XG5cbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIHJ1bk9wdGlvbnNBbGxvY3MuZm9yRWFjaChwID0+IHdhc20uX2ZyZWUocCkpO1xuICB9XG59O1xuXG4vKipcbiAqIGVuZCBwcm9maWxpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc2Vzc2lvbiBpZCcpO1xuICB9XG4gIGNvbnN0IHNlc3Npb25IYW5kbGUgPSBzZXNzaW9uWzBdO1xuXG4gIC8vIHByb2ZpbGUgZmlsZSBuYW1lIGlzIG5vdCB1c2VkIHlldCwgYnV0IGl0IG11c3QgYmUgZnJlZWQuXG4gIGNvbnN0IHByb2ZpbGVGaWxlTmFtZSA9IHdhc20uX09ydEVuZFByb2ZpbGluZyhzZXNzaW9uSGFuZGxlKTtcbiAgaWYgKHByb2ZpbGVGaWxlTmFtZSA9PT0gMCkge1xuICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGdldCBhbiBwcm9maWxlIGZpbGUgbmFtZS4nKTtcbiAgfVxuICB3YXNtLl9PcnRGcmVlKHByb2ZpbGVGaWxlTmFtZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMgPSAodGVuc29yczogcmVhZG9ubHkgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXSk6IEFycmF5QnVmZmVyTGlrZVtdID0+IHtcbiAgY29uc3QgYnVmZmVyczogQXJyYXlCdWZmZXJMaWtlW10gPSBbXTtcbiAgZm9yIChjb25zdCB0ZW5zb3Igb2YgdGVuc29ycykge1xuICAgIGNvbnN0IGRhdGEgPSB0ZW5zb3JbMl07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpICYmICdidWZmZXInIGluIGRhdGEpIHtcbiAgICAgIGJ1ZmZlcnMucHVzaChkYXRhLmJ1ZmZlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiBidWZmZXJzO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtFbnYsIGVudiwgSW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtPcnRXYXNtTWVzc2FnZSwgU2VyaWFsaXphYmxlTW9kZWxkYXRhLCBTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGEsIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhLCBUZW5zb3JNZXRhZGF0YX0gZnJvbSAnLi9wcm94eS1tZXNzYWdlcyc7XG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4vd2FzbS1jb3JlLWltcGwnO1xuaW1wb3J0IHtpbml0aWFsaXplV2ViQXNzZW1ibHl9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcblxuY29uc3QgaXNQcm94eSA9ICgpOiBib29sZWFuID0+ICEhZW52Lndhc20ucHJveHkgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbmxldCBwcm94eVdvcmtlcjogV29ya2VyfHVuZGVmaW5lZDtcbmxldCBpbml0aWFsaXppbmcgPSBmYWxzZTtcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGFib3J0ZWQgPSBmYWxzZTtcblxuLy8gcmVzb2x2ZTsgcmVqZWN0XG50eXBlIFByb21pc2VDYWxsYmFja3M8VCA9IHZvaWQ+ID0gWyhyZXN1bHQ6IFQpID0+IHZvaWQsIChyZWFzb246IHVua25vd24pID0+IHZvaWRdO1xuXG5sZXQgaW5pdFdhc21DYWxsYmFja3M6IFByb21pc2VDYWxsYmFja3M7XG5sZXQgaW5pdE9ydENhbGxiYWNrczogUHJvbWlzZUNhbGxiYWNrcztcbmNvbnN0IGNyZWF0ZVNlc3Npb25BbGxvY2F0ZUNhbGxiYWNrczogQXJyYXk8UHJvbWlzZUNhbGxiYWNrczxTZXJpYWxpemFibGVNb2RlbGRhdGE+PiA9IFtdO1xuY29uc3QgY3JlYXRlU2Vzc2lvbkZpbmFsaXplQ2FsbGJhY2tzOiBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4+ID0gW107XG5jb25zdCBjcmVhdGVTZXNzaW9uQ2FsbGJhY2tzOiBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4+ID0gW107XG5jb25zdCByZWxlYXNlU2Vzc2lvbkNhbGxiYWNrczogQXJyYXk8UHJvbWlzZUNhbGxiYWNrczx2b2lkPj4gPSBbXTtcbmNvbnN0IHJ1bkNhbGxiYWNrczogQXJyYXk8UHJvbWlzZUNhbGxiYWNrczxTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdPj4gPSBbXTtcbmNvbnN0IGVuZFByb2ZpbGluZ0NhbGxiYWNrczogQXJyYXk8UHJvbWlzZUNhbGxiYWNrczx2b2lkPj4gPSBbXTtcbmNvbnN0IGlzT3J0RW52SW5pdGlhbGl6ZWRDYWxsYmFja3M6IEFycmF5PFByb21pc2VDYWxsYmFja3M8Ym9vbGVhbj4+ID0gW107XG5cbmNvbnN0IGVuc3VyZVdvcmtlciA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKGluaXRpYWxpemluZyB8fCAhaW5pdGlhbGl6ZWQgfHwgYWJvcnRlZCB8fCAhcHJveHlXb3JrZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvcmtlciBub3QgcmVhZHknKTtcbiAgfVxufTtcblxuY29uc3Qgb25Qcm94eVdvcmtlck1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudDxPcnRXYXNtTWVzc2FnZT4pOiB2b2lkID0+IHtcbiAgc3dpdGNoIChldi5kYXRhLnR5cGUpIHtcbiAgICBjYXNlICdpbml0LXdhc20nOlxuICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgaW5pdFdhc21DYWxsYmFja3NbMF0oKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2luaXQtb3J0JzpcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBpbml0T3J0Q2FsbGJhY2tzWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluaXRPcnRDYWxsYmFja3NbMF0oKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NyZWF0ZV9hbGxvY2F0ZSc6XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgY3JlYXRlU2Vzc2lvbkFsbG9jYXRlQ2FsbGJhY2tzLnNoaWZ0KCkhWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyZWF0ZVNlc3Npb25BbGxvY2F0ZUNhbGxiYWNrcy5zaGlmdCgpIVswXShldi5kYXRhLm91dCEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY3JlYXRlX2ZpbmFsaXplJzpcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBjcmVhdGVTZXNzaW9uRmluYWxpemVDYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3JlYXRlU2Vzc2lvbkZpbmFsaXplQ2FsbGJhY2tzLnNoaWZ0KCkhWzBdKGV2LmRhdGEub3V0ISk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjcmVhdGUnOlxuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGNyZWF0ZVNlc3Npb25DYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3JlYXRlU2Vzc2lvbkNhbGxiYWNrcy5zaGlmdCgpIVswXShldi5kYXRhLm91dCEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmVsZWFzZSc6XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgcmVsZWFzZVNlc3Npb25DYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVsZWFzZVNlc3Npb25DYWxsYmFja3Muc2hpZnQoKSFbMF0oKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3J1bic6XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgcnVuQ2FsbGJhY2tzLnNoaWZ0KCkhWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJ1bkNhbGxiYWNrcy5zaGlmdCgpIVswXShldi5kYXRhLm91dCEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZW5kLXByb2ZpbGluZyc6XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgZW5kUHJvZmlsaW5nQ2FsbGJhY2tzLnNoaWZ0KCkhWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVuZFByb2ZpbGluZ0NhbGxiYWNrcy5zaGlmdCgpIVswXSgpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaXMtb3J0LWVudi1pbml0aWFsaXplZCc6XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgaXNPcnRFbnZJbml0aWFsaXplZENhbGxiYWNrcy5zaGlmdCgpIVsxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc09ydEVudkluaXRpYWxpemVkQ2FsbGJhY2tzLnNoaWZ0KCkhWzBdKGV2LmRhdGEub3V0ISk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICB9XG59O1xuXG5jb25zdCBzY3JpcHRTcmMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gKGRvY3VtZW50Py5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDogdW5kZWZpbmVkO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5SW5zdGFuY2UgPSBhc3luYygpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGluaXRpYWxpemluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtdWx0aXBsZSBjYWxscyB0byBcXCdpbml0V2FzbSgpXFwnIGRldGVjdGVkLicpO1xuICAgIH1cbiAgICBpZiAoYWJvcnRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmV2aW91cyBjYWxsIHRvIFxcJ2luaXRXYXNtKClcXCcgZmFpbGVkLicpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgICAvLyBvdmVyd3JpdGUgd2FzbSBmaWxlcGF0aHNcbiAgICBpZiAoZW52Lndhc20ud2FzbVBhdGhzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChzY3JpcHRTcmMgJiYgc2NyaXB0U3JjLmluZGV4T2YoJ2Jsb2I6JykgIT09IDApIHtcbiAgICAgICAgZW52Lndhc20ud2FzbVBhdGhzID0gc2NyaXB0U3JjLnN1YnN0cigwLCArKHNjcmlwdFNyYykubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBwcm94eVdvcmtlcj8udGVybWluYXRlKCk7XG5cbiAgICAgIGNvbnN0IHdvcmtlclVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoXG4gICAgICAgICAgW1xuICAgICAgICAgICAgLy8gVGhpcyByZXF1aXJlKCkgZnVuY3Rpb24gaXMgaGFuZGxlZCBieSBlc2J1aWxkIHBsdWdpbiB0byBsb2FkIGZpbGUgY29udGVudCBhcyBzdHJpbmcuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0c1xuICAgICAgICAgICAgcmVxdWlyZSgnLi9wcm94eS13b3JrZXIvbWFpbicpXG4gICAgICAgICAgXSxcbiAgICAgICAgICB7dHlwZTogJ3RleHQvamF2YXNjcmlwdCd9KSk7XG4gICAgICBwcm94eVdvcmtlciA9IG5ldyBXb3JrZXIod29ya2VyVXJsLCB7bmFtZTogJ29ydC13YXNtLXByb3h5LXdvcmtlcid9KTtcbiAgICAgIHByb3h5V29ya2VyLm9uZXJyb3IgPSAoZXY6IEVycm9yRXZlbnQpID0+IHJlamVjdChldik7XG4gICAgICBwcm94eVdvcmtlci5vbm1lc3NhZ2UgPSBvblByb3h5V29ya2VyTWVzc2FnZTtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwod29ya2VyVXJsKTtcbiAgICAgIGluaXRXYXNtQ2FsbGJhY2tzID0gW3Jlc29sdmUsIHJlamVjdF07XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnaW5pdC13YXNtJywgaW4gOiBlbnYud2FzbX07XG4gICAgICBwcm94eVdvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIHJldHVybiBpbml0aWFsaXplV2ViQXNzZW1ibHkoZW52Lndhc20pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVJ1bnRpbWUgPSBhc3luYyhlbnY6IEVudik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpbml0T3J0Q2FsbGJhY2tzID0gW3Jlc29sdmUsIHJlamVjdF07XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnaW5pdC1vcnQnLCBpbiA6IGVudn07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgY29yZS5pbml0UnVudGltZShlbnYpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbkFsbG9jYXRlID0gYXN5bmMobW9kZWw6IFVpbnQ4QXJyYXkpOiBQcm9taXNlPFNlcmlhbGl6YWJsZU1vZGVsZGF0YT4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVNb2RlbGRhdGE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNyZWF0ZVNlc3Npb25BbGxvY2F0ZUNhbGxiYWNrcy5wdXNoKFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdjcmVhdGVfYWxsb2NhdGUnLCBpbiA6IHttb2RlbH19O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFttb2RlbC5idWZmZXJdKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29yZS5jcmVhdGVTZXNzaW9uQWxsb2NhdGUobW9kZWwpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbkZpbmFsaXplID0gYXN5bmMobW9kZWxkYXRhOiBTZXJpYWxpemFibGVNb2RlbGRhdGEsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4gPT4ge1xuICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICAgICAgZW5zdXJlV29ya2VyKCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjcmVhdGVTZXNzaW9uRmluYWxpemVDYWxsYmFja3MucHVzaChbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2NyZWF0ZV9maW5hbGl6ZScsIGluIDoge21vZGVsZGF0YSwgb3B0aW9uc319O1xuICAgICAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29yZS5jcmVhdGVTZXNzaW9uRmluYWxpemUobW9kZWxkYXRhLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9XG4gICAgYXN5bmMobW9kZWw6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICAvLyBjaGVjayB1bnN1cHBvcnRlZCBvcHRpb25zXG4gICAgaWYgKG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nlc3Npb24gb3B0aW9uIFwicHJlZmVycmVkT3V0cHV0TG9jYXRpb25cIiBpcyBub3Qgc3VwcG9ydGVkIGZvciBwcm94eS4nKTtcbiAgICB9XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY3JlYXRlU2Vzc2lvbkNhbGxiYWNrcy5wdXNoKFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdjcmVhdGUnLCBpbiA6IHttb2RlbCwgb3B0aW9uc319O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFttb2RlbC5idWZmZXJdKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29yZS5jcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gYXN5bmMoc2Vzc2lvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVsZWFzZVNlc3Npb25DYWxsYmFja3MucHVzaChbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAncmVsZWFzZScsIGluIDogc2Vzc2lvbklkfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb3JlLnJlbGVhc2VTZXNzaW9uKHNlc3Npb25JZCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyhcbiAgICBzZXNzaW9uSWQ6IG51bWJlciwgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSwgaW5wdXRzOiBUZW5zb3JNZXRhZGF0YVtdLCBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgICBvdXRwdXRzOiBBcnJheTxUZW5zb3JNZXRhZGF0YXxudWxsPiwgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgLy8gY2hlY2sgaW5wdXRzIGxvY2F0aW9uXG4gICAgaWYgKGlucHV0cy5zb21lKHQgPT4gdFszXSAhPT0gJ2NwdScpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lucHV0IHRlbnNvciBvbiBHUFUgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XG4gICAgfVxuICAgIC8vIGNoZWNrIG91dHB1dHMgbG9jYXRpb25cbiAgICBpZiAob3V0cHV0cy5zb21lKHQgPT4gdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncHJlLWFsbG9jYXRlZCBvdXRwdXQgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcnVuQ2FsbGJhY2tzLnB1c2goW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3Qgc2VyaWFsaXphYmxlSW5wdXRzID0gaW5wdXRzIGFzIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW107ICAvLyBldmVyeSBpbnB1dCBpcyBvbiBDUFUuXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9XG4gICAgICAgICAge3R5cGU6ICdydW4nLCBpbiA6IHtzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzOiBzZXJpYWxpemFibGVJbnB1dHMsIG91dHB1dEluZGljZXMsIG9wdGlvbnN9fTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBjb3JlLmV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzKHNlcmlhbGl6YWJsZUlucHV0cykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLnJ1bihzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IGFzeW5jKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVuZFByb2ZpbGluZ0NhbGxiYWNrcy5wdXNoKFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdlbmQtcHJvZmlsaW5nJywgaW4gOiBzZXNzaW9uSWR9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvcmUuZW5kUHJvZmlsaW5nKHNlc3Npb25JZCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpc09ydEVudkluaXRpYWxpemVkID0gYXN5bmMoKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlzT3J0RW52SW5pdGlhbGl6ZWRDYWxsYmFja3MucHVzaChbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnaXMtb3J0LWVudi1pbml0aWFsaXplZCd9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLmlzT3J0RW52SW5pdGlhbGl6ZWQoKTtcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgcmVhZEZpbGUgPSB1bmRlZmluZWQ7IiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge3JlYWRGaWxlfSBmcm9tICdub2RlOmZzL3Byb21pc2VzJztcbmltcG9ydCB7ZW52LCBJbmZlcmVuY2VTZXNzaW9uLCBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciwgU2Vzc2lvbkhhbmRsZXIsIFRlbnNvcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtTZXJpYWxpemFibGVNb2RlbGRhdGEsIFRlbnNvck1ldGFkYXRhfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCB7Y3JlYXRlU2Vzc2lvbiwgY3JlYXRlU2Vzc2lvbkFsbG9jYXRlLCBjcmVhdGVTZXNzaW9uRmluYWxpemUsIGVuZFByb2ZpbGluZywgaW5pdGlhbGl6ZVJ1bnRpbWUsIGlzT3J0RW52SW5pdGlhbGl6ZWQsIHJlbGVhc2VTZXNzaW9uLCBydW59IGZyb20gJy4vcHJveHktd3JhcHBlcic7XG5pbXBvcnQge2lzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZX0gZnJvbSAnLi93YXNtLWNvbW1vbic7XG5cbmxldCBydW50aW1lSW5pdGlhbGl6YXRpb25Qcm9taXNlOiBQcm9taXNlPHZvaWQ+fHVuZGVmaW5lZDtcblxuZXhwb3J0IGNvbnN0IGVuY29kZVRlbnNvck1ldGFkYXRhID0gKHRlbnNvcjogVGVuc29yLCBnZXROYW1lOiAoKSA9PiBzdHJpbmcpOiBUZW5zb3JNZXRhZGF0YSA9PiB7XG4gIHN3aXRjaCAodGVuc29yLmxvY2F0aW9uKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBbdGVuc29yLnR5cGUsIHRlbnNvci5kaW1zLCB0ZW5zb3IuZGF0YSwgJ2NwdSddO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHtncHVCdWZmZXI6IHRlbnNvci5ncHVCdWZmZXJ9LCAnZ3B1LWJ1ZmZlciddO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBsb2NhdGlvbjogJHt0ZW5zb3IubG9jYXRpb259IGZvciAke2dldE5hbWUoKX1gKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRlY29kZVRlbnNvck1ldGFkYXRhID0gKHRlbnNvcjogVGVuc29yTWV0YWRhdGEpOiBUZW5zb3IgPT4ge1xuICBzd2l0Y2ggKHRlbnNvclszXSkge1xuICAgIGNhc2UgJ2NwdSc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih0ZW5zb3JbMF0sIHRlbnNvclsyXSwgdGVuc29yWzFdKTtcbiAgICBjYXNlICdncHUtYnVmZmVyJzoge1xuICAgICAgY29uc3QgZGF0YVR5cGUgPSB0ZW5zb3JbMF07XG4gICAgICBpZiAoIWlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZShkYXRhVHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGRhdGEgdHlwZTogJHtkYXRhVHlwZX0gZm9yIGRlc2VyaWFsaXppbmcgR1BVIHRlbnNvcmApO1xuICAgICAgfVxuICAgICAgY29uc3Qge2dwdUJ1ZmZlciwgZG93bmxvYWQsIGRpc3Bvc2V9ID0gdGVuc29yWzJdO1xuICAgICAgcmV0dXJuIFRlbnNvci5mcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwge2RhdGFUeXBlLCBkaW1zOiB0ZW5zb3JbMV0sIGRvd25sb2FkLCBkaXNwb3NlfSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBsb2NhdGlvbjogJHt0ZW5zb3JbM119YCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIgaW1wbGVtZW50cyBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciB7XG4gIHByaXZhdGUgc2Vzc2lvbklkOiBudW1iZXI7XG5cbiAgaW5wdXROYW1lczogc3RyaW5nW107XG4gIG91dHB1dE5hbWVzOiBzdHJpbmdbXTtcblxuICBhc3luYyBjcmVhdGVTZXNzaW9uQWxsb2NhdGUocGF0aDogc3RyaW5nKTogUHJvbWlzZTxTZXJpYWxpemFibGVNb2RlbGRhdGE+IHtcbiAgICAvLyBmZXRjaCBtb2RlbCBmcm9tIHVybCBhbmQgbW92ZSB0byB3YXNtIGhlYXAuIFRoZSBhcnJheWJ1ZmZmZXIgdGhhdCBoZWxkIHRoZSBodHRwXG4gICAgLy8gcmVzcG9uc2UgaXMgZnJlZWQgb25jZSB3ZSByZXR1cm5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBhdGgpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gbG9hZCBtb2RlbDogJHtwYXRofWApO1xuICAgIH1cbiAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG4gICAgcmV0dXJuIGNyZWF0ZVNlc3Npb25BbGxvY2F0ZShuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikpO1xuICB9XG5cbiAgYXN5bmMgbG9hZE1vZGVsKHBhdGhPckJ1ZmZlcjogc3RyaW5nfFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCEoYXdhaXQgaXNPcnRFbnZJbml0aWFsaXplZCgpKSkge1xuICAgICAgaWYgKCFydW50aW1lSW5pdGlhbGl6YXRpb25Qcm9taXNlKSB7XG4gICAgICAgIHJ1bnRpbWVJbml0aWFsaXphdGlvblByb21pc2UgPSBpbml0aWFsaXplUnVudGltZShlbnYpO1xuICAgICAgfVxuICAgICAgYXdhaXQgcnVudGltZUluaXRpYWxpemF0aW9uUHJvbWlzZTtcbiAgICAgIHJ1bnRpbWVJbml0aWFsaXphdGlvblByb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwYXRoT3JCdWZmZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MudmVyc2lvbnMgJiYgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlKSB7XG4gICAgICAgIC8vIG5vZGVcbiAgICAgICAgY29uc3QgbW9kZWwgPSBhd2FpdCByZWFkRmlsZShwYXRoT3JCdWZmZXIpO1xuICAgICAgICBbdGhpcy5zZXNzaW9uSWQsIHRoaXMuaW5wdXROYW1lcywgdGhpcy5vdXRwdXROYW1lc10gPSBhd2FpdCBjcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJyb3dzZXJcbiAgICAgICAgLy8gZmV0Y2ggbW9kZWwgYW5kIG1vdmUgdG8gd2FzbSBoZWFwLlxuICAgICAgICBjb25zdCBtb2RlbERhdGE6IFNlcmlhbGl6YWJsZU1vZGVsZGF0YSA9IGF3YWl0IHRoaXMuY3JlYXRlU2Vzc2lvbkFsbG9jYXRlKHBhdGhPckJ1ZmZlcik7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2Vzc2lvblxuICAgICAgICBbdGhpcy5zZXNzaW9uSWQsIHRoaXMuaW5wdXROYW1lcywgdGhpcy5vdXRwdXROYW1lc10gPSBhd2FpdCBjcmVhdGVTZXNzaW9uRmluYWxpemUobW9kZWxEYXRhLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgW3RoaXMuc2Vzc2lvbklkLCB0aGlzLmlucHV0TmFtZXMsIHRoaXMub3V0cHV0TmFtZXNdID0gYXdhaXQgY3JlYXRlU2Vzc2lvbihwYXRoT3JCdWZmZXIsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRpc3Bvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHJlbGVhc2VTZXNzaW9uKHRoaXMuc2Vzc2lvbklkKTtcbiAgfVxuXG4gIGFzeW5jIHJ1bihmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSwgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTpcbiAgICAgIFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT4ge1xuICAgIGNvbnN0IGlucHV0QXJyYXk6IFRlbnNvcltdID0gW107XG4gICAgY29uc3QgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIE9iamVjdC5lbnRyaWVzKGZlZWRzKS5mb3JFYWNoKGt2cCA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmlucHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGlucHV0ICcke25hbWV9J2ApO1xuICAgICAgfVxuICAgICAgaW5wdXRBcnJheS5wdXNoKHRlbnNvcik7XG4gICAgICBpbnB1dEluZGljZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvdXRwdXRBcnJheTogQXJyYXk8VGVuc29yfG51bGw+ID0gW107XG4gICAgY29uc3Qgb3V0cHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBPYmplY3QuZW50cmllcyhmZXRjaGVzKS5mb3JFYWNoKGt2cCA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm91dHB1dE5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvdXRwdXQgJyR7bmFtZX0nYCk7XG4gICAgICB9XG4gICAgICBvdXRwdXRBcnJheS5wdXNoKHRlbnNvcik7XG4gICAgICBvdXRwdXRJbmRpY2VzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaW5wdXRzID1cbiAgICAgICAgaW5wdXRBcnJheS5tYXAoKHQsIGkpID0+IGVuY29kZVRlbnNvck1ldGFkYXRhKHQsICgpID0+IGBpbnB1dCBcIiR7dGhpcy5pbnB1dE5hbWVzW2lucHV0SW5kaWNlc1tpXV19XCJgKSk7XG4gICAgY29uc3Qgb3V0cHV0cyA9IG91dHB1dEFycmF5Lm1hcChcbiAgICAgICAgKHQsIGkpID0+IHQgPyBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgb3V0cHV0IFwiJHt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dfVwiYCkgOiBudWxsKTtcblxuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBydW4odGhpcy5zZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHJlc3VsdE1hcDogU2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZSA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0TWFwW3RoaXMub3V0cHV0TmFtZXNbb3V0cHV0SW5kaWNlc1tpXV1dID0gb3V0cHV0QXJyYXlbaV0gPz8gZGVjb2RlVGVuc29yTWV0YWRhdGEocmVzdWx0c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRNYXA7XG4gIH1cblxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICAvLyBUT0RPOiBpbXBsZW1lbnQgcHJvZmlsaW5nXG4gIH1cblxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgdm9pZCBlbmRQcm9maWxpbmcodGhpcy5zZXNzaW9uSWQpO1xuICB9XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7Y3B1c30gZnJvbSAnbm9kZTpvcyc7XG5pbXBvcnQge0JhY2tlbmQsIGVudiwgSW5mZXJlbmNlU2Vzc2lvbiwgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXJ9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7aW5pdGlhbGl6ZVdlYkFzc2VtYmx5SW5zdGFuY2V9IGZyb20gJy4vd2FzbS9wcm94eS13cmFwcGVyJztcbmltcG9ydCB7T25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyfSBmcm9tICcuL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZSc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyBhbGwgZmxhZ3MgZm9yIFdlYkFzc2VtYmx5LlxuICpcbiAqIFRob3NlIGZsYWdzIGFyZSBhY2Nlc3NpYmxlIGZyb20gYG9ydC5lbnYud2FzbWAuIFVzZXJzIGFyZSBhbGxvdyB0byBzZXQgdGhvc2UgZmxhZ3MgYmVmb3JlIHRoZSBmaXJzdCBpbmZlcmVuY2Ugc2Vzc2lvblxuICogYmVpbmcgY3JlYXRlZCwgdG8gb3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVGbGFncyA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5pbml0VGltZW91dCAhPT0gJ251bWJlcicgfHwgZW52Lndhc20uaW5pdFRpbWVvdXQgPCAwKSB7XG4gICAgZW52Lndhc20uaW5pdFRpbWVvdXQgPSAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5zaW1kICE9PSAnYm9vbGVhbicpIHtcbiAgICBlbnYud2FzbS5zaW1kID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW52Lndhc20ucHJveHkgIT09ICdib29sZWFuJykge1xuICAgIGVudi53YXNtLnByb3h5ID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGVudi53YXNtLm51bVRocmVhZHMgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGVudi53YXNtLm51bVRocmVhZHMpIHx8IGVudi53YXNtLm51bVRocmVhZHMgPD0gMCkge1xuICAgIGNvbnN0IG51bUNwdUxvZ2ljYWxDb3JlcyA9IHR5cGVvZiBuYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnID8gY3B1cygpLmxlbmd0aCA6IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5O1xuICAgIGVudi53YXNtLm51bVRocmVhZHMgPSBNYXRoLm1pbig0LCBNYXRoLmNlaWwoKG51bUNwdUxvZ2ljYWxDb3JlcyB8fCAxKSAvIDIpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kIGltcGxlbWVudHMgQmFja2VuZCB7XG4gIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gcG9wdWxhdGUgd2FzbSBmbGFnc1xuICAgIGluaXRpYWxpemVGbGFncygpO1xuXG4gICAgLy8gaW5pdCB3YXNtXG4gICAgYXdhaXQgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5SW5zdGFuY2UoKTtcbiAgfVxuICBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xuICBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihidWZmZXI6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xuICBhc3luYyBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihwYXRoT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPiB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIoKTtcbiAgICBhd2FpdCBoYW5kbGVyLmxvYWRNb2RlbChwYXRoT3JCdWZmZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaGFuZGxlcik7XG4gIH1cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kLXdhc20nO1xuZXhwb3J0IGNvbnN0IHdhc21CYWNrZW5kID0gbmV3IE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kKCk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXMsIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMgKi9cbi8vIFdlIHVzZSBcInJlcXVpcmVcIiBpbnN0ZWFkIG9mIFwiaW1wb3J0XCIgaGVyZSBiZWNhdXNlIGltcG9ydCBzdGF0ZW1lbnQgbXVzdCBiZSBwdXQgaW4gdG9wIGxldmVsLiBPdXIgY3VycmVudCBjb2RlIGRvZXNcbi8vIG5vdCBhbGxvdyBidW5kbGVyIHRvIHRyZWUtc2hha2luZyBjb2RlIGFzIGV4cGVjdGVkIGJlY2F1c2Ugc29tZSBjb2RlcyBhcmUgdHJlYXRlZCBhcyBoYXZpbmcgc2lkZSBlZmZlY3RzLlxuLy8gU28gd2UgaW1wb3J0IGNvZGUgaW5zaWRlIHRoZSBpZi1jbGF1c2UgdG8gYWxsb3cgYnVuZGxlciByZW1vdmUgdGhlIGNvZGUgc2FmZWx5LlxuXG5leHBvcnQgKiBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuaW1wb3J0ICogYXMgb3J0IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5leHBvcnQgZGVmYXVsdCBvcnQ7XG5cbmltcG9ydCB7cmVnaXN0ZXJCYWNrZW5kLCBlbnZ9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5pbXBvcnQge3ZlcnNpb259IGZyb20gJy4vdmVyc2lvbic7XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdMKSB7XG4gIGNvbnN0IG9ubnhqc0JhY2tlbmQgPSByZXF1aXJlKCcuL2JhY2tlbmQtb25ueGpzJykub25ueGpzQmFja2VuZDtcbiAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJnbCcsIG9ubnhqc0JhY2tlbmQsIC0xMCk7XG59XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU00pIHtcbiAgY29uc3Qgd2FzbUJhY2tlbmQgPSBCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkcgPyByZXF1aXJlKCcuL2JhY2tlbmQtd2FzbS1pbmZlcmVuY2UnKS53YXNtQmFja2VuZCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZSgnLi9iYWNrZW5kLXdhc20tdHJhaW5pbmcnKS53YXNtQmFja2VuZDtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVICYmIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5ncHUpIHtcbiAgICByZWdpc3RlckJhY2tlbmQoJ3dlYmdwdScsIHdhc21CYWNrZW5kLCA1KTtcbiAgfVxuICByZWdpc3RlckJhY2tlbmQoJ2NwdScsIHdhc21CYWNrZW5kLCAxMCk7XG4gIHJlZ2lzdGVyQmFja2VuZCgnd2FzbScsIHdhc21CYWNrZW5kLCAxMCk7XG4gIGlmIChCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkcpIHtcbiAgICByZWdpc3RlckJhY2tlbmQoJ3hubnBhY2snLCB3YXNtQmFja2VuZCwgOSk7XG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJubicsIHdhc21CYWNrZW5kLCA5KTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZW52LnZlcnNpb25zLCAnd2ViJywge3ZhbHVlOiB2ZXJzaW9uLCBlbnVtZXJhYmxlOiB0cnVlfSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgL2pzL3NjcmlwdHMvdXBkYXRlLXZlcnNpb24udHNcbi8vIERvIG5vdCBtb2RpZnkgZmlsZSBjb250ZW50IG1hbnVhbGx5LlxuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcxLjE3LjAnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFjTSxVQUNBLDBCQVlPLGlCQTBDQTtBQXJFYjs7O0FBY0EsSUFBTSxXQUFxQyxvQkFBSSxJQUFHO0FBQ2xELElBQU0sMkJBQXFDLENBQUE7QUFZcEMsSUFBTSxrQkFBa0IsQ0FBQyxNQUFjLFNBQWtCLGFBQTBCO0FBQ3hGLFVBQUksV0FBVyxPQUFPLFFBQVEs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S0FBSyxPQUFHLFlBQVkscUJBQXFCLEdBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRSxTQUFTLEdBQUU7QUFBQyxjQUFFLGtDQUFrQyxDQUFDLEVBQUU7QUFBRSxjQUFFLDJDQUEyQztBQUFFLG1CQUFPLEdBQUcsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLENBQUMsQ0FBQztBQUFBLFFBQUM7QUFBQyxZQUFJLEtBQUcsQ0FBQyxHQUFFLEtBQUcsR0FBRSxJQUFFO0FBQy9YLGlCQUFTLEdBQUcsR0FBRTtBQUFDLGVBQUssS0FBRztBQUFFLGVBQUssS0FBRyxJQUFFO0FBQUcsZUFBSyxLQUFHLFNBQVMsR0FBRTtBQUFDLGNBQUUsS0FBSyxLQUFHLE1BQUksTUFBSSxDQUFDLElBQUU7QUFBQSxVQUFDO0FBQUUsZUFBSyxLQUFHLFdBQVU7QUFBQyxtQkFBTyxFQUFFLEtBQUssS0FBRyxNQUFJLE1BQUksQ0FBQztBQUFBLFVBQUM7QUFBRSxlQUFLLEtBQUcsU0FBUyxHQUFFO0FBQUMsY0FBRSxLQUFLLEtBQUcsTUFBSSxNQUFJLENBQUMsSUFBRTtBQUFBLFVBQUM7QUFBRSxlQUFLLEtBQUcsU0FBUyxHQUFFO0FBQUMsY0FBRSxLQUFLLEtBQUcsT0FBSyxNQUFJLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBQSxVQUFDO0FBQUUsZUFBSyxLQUFHLFdBQVU7QUFBQyxtQkFBTyxLQUFHLEVBQUUsS0FBSyxLQUFHLE9BQUssTUFBSSxDQUFDO0FBQUEsVUFBQztBQUFFLGVBQUssS0FBRyxTQUFTLEdBQUU7QUFBQyxjQUFFLEtBQUssS0FBRyxPQUFLLE1BQUksQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFBLFVBQUM7QUFBRSxlQUFLLEtBQUcsV0FBVTtBQUFDLG1CQUFPLEtBQUcsRUFBRSxLQUFLLEtBQUcsT0FBSyxNQUFJLENBQUM7QUFBQSxVQUFDO0FBQUUsZUFBSyxLQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMsaUJBQUssR0FBRyxDQUFDO0FBQUUsaUJBQUssR0FBRyxDQUFDO0FBQUUsaUJBQUssR0FBRyxDQUFDO0FBQUEs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O0FBQUUsY0FBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLG1CQUFPLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxVQUFFLElBQUcsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsbUJBQUs7QUFBRSxtQkFBSztBQUFFLGdCQUFFLEdBQUcsTUFBSSxDQUFDO0FBQUUsZ0JBQUUsRUFBRSxNQUFJLENBQUM7QUFBRSxnQkFBRSxHQUFHLENBQUM7QUFBRSxjQUFFLEdBQUUsR0FBRSxNQUFLLENBQUM7QUFBQSxVQUFDO0FBQUEsVUFBRSxJQUFHO0FBQUEsVUFBRyxJQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMsbUJBQUs7QUFBRSxnQkFBRSxFQUFFLE1BQUksQ0FBQztBQUFFLGdCQUFFLEVBQUUsQ0FBQztBQUFFLG1CQUFPLEtBQUc7QUFBQSxVQUFDO0FBQUEsVUFBRSxJQUFHLFNBQVMsR0FBRTtBQUFDLG1CQUFLO0FBQUUsZ0JBQUcsTUFBSTtBQUFFLHFCQUFPLEVBQUUsR0FBRyxDQUFDO0FBQUUsZ0JBQUUsR0FBRyxDQUFDO0FBQUUsbUJBQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQUEsVUFBQztBQUFBLFVBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsR0FBRyxHQUFFLE1BQUksQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDO0FBQUUsZ0JBQUUsRUFBRSxPQUFLLE9BQUssRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLFNBQVMsR0FBRTtBQUFDLHFCQUFPLEVBQUU7QUFBQSxZQUFJLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFDdGlCO0FBQUksZ0JBQUksSUFBRSxHQUFHLENBQUM7QUFBRSxnQkFBRyxXQUFTO0FBQUUscUJBQU87QUFBRSxnQkFBRSxDQUFDLFNBQVM7QUFBRSxxQkFBUSxJQUFFLENBQUMsQ0FBQyxHQUFFLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsRUFBRTtBQUFFLG9CQUFJLE1BQUksSUFBRSxPQUFLLE1BQUksUUFBTSxHQUFFLEVBQUUsS0FBSyxZQUFVLENBQUMsR0FBRSxFQUFFLEtBQUssRUFBRSxJQUFFLENBQUMsQ0FBQztBQUFFLGdCQUFJLElBQUUscUJBQW1CLEdBQUcsa0JBQWdCLENBQUMsSUFBRSx5Q0FBd0MsSUFBRTtBQUFFLGlCQUFJLElBQUUsR0FBRSxJQUFFLElBQUUsR0FBRSxFQUFFO0FBQUUsbUJBQUcsZ0JBQWMsSUFBRSxlQUFhLElBQUUsZ0NBQThCLElBQUUsTUFBSSxJQUFFLE1BQUksUUFBTyxLQUFHLEVBQUUsSUFBRSxDQUFDLEVBQUU7QUFBZSxpQkFBRywrQkFBNkIsSUFBRTtBQUFPLGlCQUFJLElBQUUsR0FBRSxJQUFFLElBQUUsR0FBRSxFQUFFO0FBQUUsZ0JBQUUsSUFBRSxDQUFDLEVBQUUsaUJBQWUsS0FBRyxnQkFBYyxJQUFFLHNCQUFvQixJQUFFO0FBQVEsY0FBRSxPQUNoZixLQUFHO0FBQXFELGNBQUUsS0FBSyxJQUFFLE1BQU07QUFBRSxnQkFBRSxHQUFHLENBQUMsRUFBRSxNQUFNLE1BQUssQ0FBQztBQUFFLGdCQUFFLEdBQUcsQ0FBQztBQUFFLG1CQUFPLEdBQUcsQ0FBQyxJQUFFO0FBQUEsVUFBQztBQUFBLFVBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRTtBQUFDLG1CQUFLO0FBQUUsZ0JBQUUsRUFBRSxNQUFJLENBQUM7QUFBRSxnQkFBRSxFQUFFLENBQUM7QUFBRSxtQkFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUEsVUFBQztBQUFBLFVBQUUsR0FBRSxTQUFTLEdBQUU7QUFBQyxtQkFBSztBQUFFLGdCQUFFLE1BQUksRUFBRSxJQUFJLENBQUMsRUFBRSxNQUFJO0FBQUEsVUFBRTtBQUFBLFVBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxtQkFBSztBQUFFLG1CQUFLO0FBQUUsZ0JBQUUsRUFBRSxNQUFJLENBQUM7QUFBRSxnQkFBSSxJQUFFLEdBQUcsQ0FBQztBQUFFLGtCQUFJLElBQUUsR0FBRyxDQUFDLEdBQUUsR0FBRyxDQUFDLElBQUU7QUFBRyxtQkFBTyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFVBQUUsSUFBRyxXQUFVO0FBQUMsbUJBQU8sRUFBRSxDQUFDLENBQUM7QUFBQSxVQUFDO0FBQUEsVUFBRSxJQUFHLFNBQVMsR0FBRTtBQUFDLGdCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUscUJBQVEsSUFBRSxNQUFNLEVBQUUsTUFBTSxHQUFFLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTztBQUFJLGdCQUFFLENBQUMsSUFBRSxFQUFFLENBQUM7QUFBRSxtQkFBTyxFQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsVUFBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLG1CQUFPLEVBQUUsR0FBRyxNQUFJLENBQUMsQ0FBQztBQUFBLFVBQUM7QUFBQSxVQUFFLElBQUcsV0FBVTtBQUFDLG1CQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUEsVUFBQztBQUFBLFVBQ3JmLElBQUcsU0FBUyxHQUFFO0FBQUMsbUJBQUs7QUFBRSxxQkFBUSxJQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUUsVUFBUTtBQUFDLGtCQUFJLElBQUUsRUFBRSxJQUFJO0FBQUUsZ0JBQUUsSUFBSSxFQUFFLENBQUM7QUFBQSxZQUFDO0FBQUMsZUFBRyxDQUFDO0FBQUEsVUFBQztBQUFBLFVBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsbUJBQUs7QUFBRSxtQkFBSztBQUFFLGdCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsZ0JBQUUsRUFBRSxDQUFDO0FBQUUsZ0JBQUUsRUFBRSxDQUFDO0FBQUUsY0FBRSxDQUFDLElBQUU7QUFBQSxVQUFDO0FBQUEsVUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMsbUJBQUs7QUFBRSxnQkFBRSxHQUFHLE1BQUksR0FBRSxtQkFBbUI7QUFBRSxnQkFBRSxFQUFFLHFCQUFxQixDQUFDO0FBQUUsbUJBQU8sRUFBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFVBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRTtBQUFDLGdCQUFFLG9CQUFrQixLQUFHLG1CQUFpQixJQUFFLE1BQUksT0FBTyxDQUFDO0FBQUUsbUJBQUs7QUFBRSxnQkFBRSxJQUFJLEtBQUssTUFBSSxDQUFDO0FBQUUsY0FBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsY0FBYztBQUFFLGNBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsY0FBYztBQUFFLGNBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsWUFBWTtBQUFFLGNBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsV0FBVztBQUFFLGNBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsWUFBWTtBQUFFLGNBQUUsSUFDcmYsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLGVBQWUsSUFBRTtBQUFLLGNBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsVUFBVTtBQUFFLGNBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxLQUFHLEVBQUUsUUFBUSxJQUFFLEtBQUssSUFBSSxFQUFFLGVBQWUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxLQUFHLFFBQU07QUFBQSxVQUFDO0FBQUEsVUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMsZ0JBQUUsb0JBQWtCLEtBQUcsbUJBQWlCLElBQUUsTUFBSSxPQUFPLENBQUM7QUFBRSxtQkFBSztBQUFFLGdCQUFFLElBQUksS0FBSyxNQUFJLENBQUM7QUFBRSxjQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxXQUFXO0FBQUUsY0FBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxXQUFXO0FBQUUsY0FBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxTQUFTO0FBQUUsY0FBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxRQUFRO0FBQUUsY0FBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxTQUFTO0FBQUUsY0FBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxZQUFZLElBQUU7QUFBSyxjQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLE9BQU87QUFBRSxjQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsS0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLElBQUUsS0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQzFmLEVBQUUsUUFBUSxJQUFFLElBQUU7QUFBRSxjQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLEtBQUcsRUFBRSxrQkFBa0I7QUFBRyxnQkFBSSxJQUFHLElBQUksS0FBSyxFQUFFLFlBQVksR0FBRSxHQUFFLENBQUMsRUFBRyxrQkFBa0IsR0FBRSxJQUFHLElBQUksS0FBSyxFQUFFLFlBQVksR0FBRSxHQUFFLENBQUMsRUFBRyxrQkFBa0I7QUFBRSxjQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsS0FBRyxLQUFHLEtBQUcsRUFBRSxrQkFBa0IsS0FBRyxLQUFLLElBQUksR0FBRSxDQUFDLEtBQUc7QUFBQSxVQUFDO0FBQUEsVUFBRSxJQUFHLFNBQVMsR0FBRTtBQUFDLG1CQUFLO0FBQUUsZ0JBQUksSUFBRSxJQUFJLEtBQUssRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsTUFBSyxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxFQUFFLE1BQUksTUFBSSxDQUFDLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLGtCQUFrQixHQUFFLElBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQixHQUFFLElBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQixHQUN4Z0IsSUFBRSxLQUFLLElBQUksR0FBRSxDQUFDO0FBQUUsZ0JBQUUsSUFBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxPQUFPLEtBQUcsS0FBRyxLQUFHLENBQUMsSUFBRSxJQUFFLE1BQUksS0FBRyxPQUFLLElBQUUsS0FBSyxJQUFJLEdBQUUsQ0FBQyxHQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsSUFBRSxRQUFNLElBQUUsSUFBRSxJQUFFLEtBQUcsRUFBRTtBQUFHLGNBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsT0FBTztBQUFFLGNBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxLQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsSUFBRSxLQUFHLElBQUksRUFBRSxTQUFTLENBQUMsSUFBRSxFQUFFLFFBQVEsSUFBRSxJQUFFO0FBQUUsY0FBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsV0FBVztBQUFFLGNBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsV0FBVztBQUFFLGNBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsU0FBUztBQUFFLGNBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsUUFBUTtBQUFFLGNBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsU0FBUztBQUFFLGNBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsUUFBUTtBQUFFLG1CQUFPLE9BQU8sRUFBRSxRQUFRLElBQUUsR0FBRztBQUFBLFVBQUM7QUFBQSxVQUFFLElBQUcsV0FBVTtBQUFDLG1CQUFNO0FBQUEsVUFBRztBQUFBLFVBQUUsSUFBRyxXQUFVO0FBQUEsVUFBQztBQUFBLFVBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMscUJBQVMsRUFBRSxHQUFFO0FBQUMsc0JBQU8sSUFDL2YsRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsS0FBRyxFQUFFLENBQUMsSUFBRTtBQUFBLFlBQUs7QUFBQyxtQkFBSztBQUFFLGdCQUFJLEtBQUcsb0JBQUksUUFBTSxZQUFZLEdBQUUsSUFBRSxJQUFJLEtBQUssR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLElBQUksS0FBSyxHQUFFLEdBQUUsQ0FBQztBQUFFLGdCQUFFLEVBQUUsa0JBQWtCO0FBQUUsZ0JBQUksSUFBRSxFQUFFLGtCQUFrQjtBQUFFLGNBQUUsTUFBSSxNQUFJLE1BQUksQ0FBQyxJQUFFLEtBQUcsS0FBSyxJQUFJLEdBQUUsQ0FBQztBQUFFLGNBQUUsTUFBSSxNQUFJLE1BQUksQ0FBQyxJQUFFLE9BQU8sS0FBRyxDQUFDO0FBQUUsZ0JBQUUsRUFBRSxDQUFDO0FBQUUsZ0JBQUUsRUFBRSxDQUFDO0FBQUUsZ0JBQUUsR0FBRyxDQUFDO0FBQUUsZ0JBQUUsR0FBRyxDQUFDO0FBQUUsZ0JBQUUsS0FBRyxFQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsR0FBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxNQUFJLEVBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxHQUFFLEVBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFO0FBQUEsVUFBRTtBQUFBLFVBQUUsSUFBRyxNQUFJO0FBQUMsZUFBRyxFQUFFO0FBQUEsVUFBQztBQUFBLFVBQUUsSUFBRyxNQUFJLEtBQUssSUFBSTtBQUFBLFVBQUUsSUFBRyxXQUFVO0FBQUMsbUJBQU87QUFBQSxVQUFVO0FBQUEsVUFBRSxJQUFHLE1BQUksWUFBWSxJQUFJO0FBQUEsVUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxtQkFBSztBQUFFLG1CQUFPLEVBQUUsV0FBVyxNQUFJLE1BQUksR0FBRSxNQUNqZixHQUFFLEtBQUcsTUFBSSxPQUFLLENBQUM7QUFBQSxVQUFDO0FBQUEsVUFBRSxJQUFHLFNBQVMsR0FBRTtBQUFDLG1CQUFLO0FBQUUsZ0JBQUksSUFBRSxFQUFFO0FBQU8sZ0JBQUcsYUFBVztBQUFFLHFCQUFNO0FBQUcscUJBQVEsSUFBRSxHQUFFLEtBQUcsR0FBRSxLQUFHLEdBQUU7QUFBQyxrQkFBSSxJQUFFLEtBQUcsSUFBRSxNQUFHO0FBQUcsa0JBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxTQUFTO0FBQUUsa0JBQUksSUFBRTtBQUFLLGtCQUFFLEtBQUssSUFBSSxHQUFFLENBQUM7QUFBRSxpQkFBRTtBQUFDLHFCQUFHLEVBQUUsSUFBSSxLQUFLLEdBQUUsWUFBVyxLQUFHLFFBQU0sSUFBRSxTQUFPLEtBQUssSUFBRSxHQUFHLE9BQU8sYUFBVyxTQUFPO0FBQU0sb0JBQUc7QUFBQyxxQkFBRyxLQUFLLENBQUM7QUFBRSxxQkFBRztBQUFFLHNCQUFJLElBQUU7QUFBRSx3QkFBTTtBQUFBLGdCQUFDLFNBQU8sR0FBRTtBQUFBLGdCQUFDO0FBQUMsb0JBQUU7QUFBQSxjQUFNO0FBQUMsa0JBQUc7QUFBRSx1QkFBTTtBQUFBLFlBQUU7QUFBQyxtQkFBTTtBQUFBLFVBQUU7QUFBQSxVQUFFLElBQUcsU0FBUyxHQUFFLEdBQUU7QUFBQyxtQkFBSztBQUFFLG1CQUFLO0FBQUUsZ0JBQUksSUFBRTtBQUFFLGVBQUcsRUFBRSxRQUFRLENBQUMsR0FBRSxNQUFJO0FBQUMsa0JBQUksSUFBRSxJQUFFO0FBQUUsa0JBQUUsRUFBRSxJQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsSUFBRTtBQUFFLG1CQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxFQUFFO0FBQUUsa0JBQUUsUUFBTSxNQUFJLENBQUMsSUFBRSxFQUFFLFdBQVcsQ0FBQztBQUFFLGdCQUFFLE1BQUksTUFBSSxDQUFDLElBQUU7QUFDbmYsbUJBQUcsRUFBRSxTQUFPO0FBQUEsWUFBQyxDQUFDO0FBQUUsbUJBQU87QUFBQSxVQUFDO0FBQUEsVUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMsbUJBQUs7QUFBRSxtQkFBSztBQUFFLGdCQUFJLElBQUUsR0FBRztBQUFFLGNBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFO0FBQU8sZ0JBQUksSUFBRTtBQUFFLGNBQUUsUUFBUSxPQUFHLEtBQUcsRUFBRSxTQUFPLENBQUM7QUFBRSxjQUFFLE1BQUksTUFBSSxDQUFDLElBQUU7QUFBRSxtQkFBTztBQUFBLFVBQUM7QUFBQSxVQUFFLElBQUcsTUFBSTtBQUFBLFVBQUcsSUFBRyxXQUFVO0FBQUMsbUJBQU87QUFBQSxVQUFFO0FBQUEsVUFBRSxJQUFHLFdBQVU7QUFBQyxtQkFBTztBQUFBLFVBQUU7QUFBQSxVQUFFLElBQUcsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsbUJBQUs7QUFBRSxtQkFBSztBQUFFLG1CQUFLO0FBQUUscUJBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSTtBQUFDLGtCQUFJLElBQUUsRUFBRSxNQUFJLE1BQUksQ0FBQyxHQUFFLElBQUUsRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDO0FBQUUsbUJBQUc7QUFBRSx1QkFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUk7QUFBQyxvQkFBSSxJQUFFLEVBQUUsSUFBRSxNQUFJLENBQUMsR0FBRSxJQUFFLEdBQUcsQ0FBQztBQUFFLHNCQUFJLEtBQUcsT0FBSyxNQUFJLE1BQUksSUFBRSxLQUFHLEdBQUcsR0FBRyxHQUFFLENBQUMsQ0FBQyxHQUFFLEVBQUUsU0FBTyxLQUFHLEVBQUUsS0FBSyxDQUFDO0FBQUEsY0FBQztBQUFDLG1CQUFHO0FBQUEsWUFBQztBQUFDLGNBQUUsTUFBSSxNQUFJLENBQUMsSUFBRTtBQUFFLG1CQUFPO0FBQUEsVUFBQztBQUFBLFVBQUUsSUFBRztBQUFBLFVBQUcsSUFBRztBQUFBLFVBQUcsSUFBRztBQUFBLFVBQUcsR0FBRTtBQUFBLFVBQUcsSUFBRztBQUFBLFVBQUcsSUFBRztBQUFBLFVBQUcsSUFBRztBQUFBLFVBQUcsSUFBRztBQUFBLFVBQ2xmLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLEdBQUU7QUFBQSxVQUFHLElBQUc7QUFBQSxVQUNuZixJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxHQUFFO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxHQUFFO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxHQUFFO0FBQUEsVUFBRyxHQUFFO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxHQUFFO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxJQUFHO0FBQUEsVUFBRyxH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QUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsbUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsbUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUs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QUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsbUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFDOWEsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUMzYyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQ3ZhLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsbUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBRSxtQkFBTztBQUFBLFVBQUU7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQ3BiLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsbUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxtQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFDcmIsaUJBQVMsR0FBRyxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsbUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUUsbUJBQU87QUFBQSxVQUFFO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLG1CQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLG1CQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUM5WSxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FB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TUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQzFjLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUN2WixpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFDM2IsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFDM1gsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLG1CQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFDMWMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsbUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUUsbUJBQU87QUFBQSxVQUFFO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLG1CQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFDM1ksaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLG1CQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUNsZCxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVB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QyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLG1CQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQzFlLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFDdlUsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUc7QUFBQyxjQUFJLEtBQUcsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsSUFBRyxFQUFFO0FBQUEsVUFBQyxTQUFPLElBQUc7QUFBQyxjQUFFLEVBQUU7QUFBRSxnQkFBRyxPQUFLLEtBQUc7QUFBRSxvQkFBTTtBQUFHLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxtQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQzlaLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsbUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFDMWUsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUMvZSxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLGNBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUMvWixpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLG1CQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLFNBQU8sR0FBRTtBQUFDLGNBQUUsQ0FBQztBQUFFLGdCQUFHLE1BQUksSUFBRTtBQUFFLG9CQUFNO0FBQUUsY0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsbUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsY0FBSSxJQUFFLEVBQUU7QUFBRSxjQUFHO0FBQUMsY0FBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFDN2UsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxtQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxTQUFPLEdBQUU7QUFBQyxjQUFFLENBQUM7QUFBRSxnQkFBRyxNQUFJLElBQUU7QUFBRSxvQkFBTTtBQUFFLGNBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxtQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFFLG1CQUFPO0FBQUEsVUFBRTtBQUFBLFFBQUM7QUFBQyxpQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFFLGNBQUc7QUFBQyxjQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxFQUFFO0FBQUUsY0FBRztBQUFDLG1CQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsU0FBTyxHQUFFO0FBQUMsY0FBRSxDQUFDO0FBQUUsZ0JBQUcsTUFBSSxJQUFFO0FBQUUsb0JBQU07QUFBRSxjQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsR0FBRyxHQUFFLEdB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Q3RDLGtCQUFnQixRQUFRQSxjQUFhLEVBQUU7QUFDdkMsTUFBSSxNQUE2QjtBQUMvQixvQkFBZ0IsV0FBV0EsY0FBYSxDQUFDO0FBQ3pDLG9CQUFnQixTQUFTQSxjQUFhLENBQUM7QUFBQSxFQUN6QztBQUNGO0FBRUEsT0FBTyxlQUFlQyxLQUFJLFVBQVUsT0FBTyxFQUFDLE9BQU9DLFVBQVMsWUFBWSxLQUFJLENBQUM7IiwKICAibmFtZXMiOiBbImkiLCAiZW52IiwgIlRlbnNvciIsICJUZW5zb3IiLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiVHJhaW5pbmdTZXNzaW9uIiwgIkluZmVyZW5jZVNlc3Npb24iLCAiVGVuc29yIiwgIlRyYWluaW5nU2Vzc2lvbiIsICJlbnYiLCAid2FzbSIsICJ3YXNtIiwgIndhc20iLCAid2FzbSIsICJlbnYiLCAidGVuc29yIiwgImVycm9yQ29kZSIsICJpIiwgImNyZWF0ZVNlc3Npb25BbGxvY2F0ZSIsICJjcmVhdGVTZXNzaW9uRmluYWxpemUiLCAiY3JlYXRlU2Vzc2lvbiIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImlzT3J0RW52SW5pdGlhbGl6ZWQiLCAiZW52IiwgInJlYWRGaWxlIiwgIlRlbnNvciIsICJjcmVhdGVTZXNzaW9uQWxsb2NhdGUiLCAiaXNPcnRFbnZJbml0aWFsaXplZCIsICJlbnYiLCAicmVhZEZpbGUiLCAiY3JlYXRlU2Vzc2lvbiIsICJjcmVhdGVTZXNzaW9uRmluYWxpemUiLCAicmVsZWFzZVNlc3Npb24iLCAicnVuIiwgImVuZFByb2ZpbGluZyIsICJlbnYiLCAidmVyc2lvbiIsICJ3YXNtQmFja2VuZCIsICJlbnYiLCAidmVyc2lvbiJdCn0K
