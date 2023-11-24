/*!
 * ONNX Runtime Web v1.17.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
"use strict";
var ort = (() => {
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
        async loadParametersBuffer(_array, _trainableOnly) {
          throw new Error("Method not implemented.");
        }
        async getContiguousParameters(_trainableOnly) {
          throw new Error("Method not implemented.");
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
            this.re = a;
            this.le = a - 24;
            this.Je = function(b) {
              I[this.le + 4 >>> 2 >>> 0] = b;
            };
            this.se = function() {
              return I[this.le + 4 >>> 2 >>> 0];
            };
            this.Ie = function(b) {
              I[this.le + 8 >>> 2 >>> 0] = b;
            };
            this.ze = function(b) {
              x[this.le + 12 >>> 0 >>> 0] = b ? 1 : 0;
            };
            this.Fe = function() {
              return 0 != x[this.le + 12 >>> 0 >>> 0];
            };
            this.Ae = function(b) {
              x[this.le + 13 >>> 0 >>> 0] = b ? 1 : 0;
            };
            this.Be = function() {
              return 0 != x[this.le + 13 >>> 0 >>> 0];
            };
            this.He = function(b, c) {
              this.te(0);
              this.Je(b);
              this.Ie(c);
            };
            this.te = function(b) {
              I[this.le + 16 >>> 2 >>> 0] = b;
            };
            this.Ee = function() {
              return I[this.le + 16 >>> 2 >>> 0];
            };
            this.Ge = function() {
              if (Ka(this.se()))
                return I[this.re >>> 2 >>> 0];
              var b = this.Ee();
              return 0 !== b ? b : this.re;
            };
          }
          var Na = (a) => {
            var b = L;
            if (!b)
              return La(0), 0;
            var c = new Ja(b);
            c.te(b);
            var d = c.se();
            if (!d)
              return La(0), b;
            for (var e in a) {
              var f = a[e];
              if (0 === f || f === d)
                break;
              if (Ma(f, d, c.le + 16))
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
              if (c.Ce)
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
            this.ne = [void 0];
            this.xe = [];
          }
          var P = new $a();
          function ab(a) {
            a >>>= 0;
            a >= P.le && 0 === --P.get(a).ye && P.te(a);
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
                return P.se({ ye: 1, value: a });
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
              var w = l.oe;
              for (l = new Date(new Date(l.pe + 1900, 0, 1).getTime()); 0 < w; ) {
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
            d = { Me: E[d >>> 2 >>> 0], Le: E[d + 4 >>> 2 >>> 0], ue: E[d + 8 >>> 2 >>> 0], we: E[d + 12 >>> 2 >>> 0], ve: E[d + 16 >>> 2 >>> 0], pe: E[d + 20 >>> 2 >>> 0], me: E[d + 24 >>> 2 >>> 0], oe: E[d + 28 >>> 2 >>> 0], Oe: E[d + 32 >>> 2 >>> 0], Ke: E[d + 36 >>> 2 >>> 0], Ne: m ? Qa(m) : "" };
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
            m = { "%a": (l) => u[l.me].substring(0, 3), "%A": (l) => u[l.me], "%b": (l) => v[l.ve].substring(0, 3), "%B": (l) => v[l.ve], "%C": (l) => f((l.pe + 1900) / 100 | 0, 2), "%d": (l) => f(l.we, 2), "%e": (l) => e(l.we, 2, " "), "%g": (l) => k(l).toString().substring(2), "%G": (l) => k(l), "%H": (l) => f(l.ue, 2), "%I": (l) => {
              l = l.ue;
              0 == l ? l = 12 : 12 < l && (l -= 12);
              return f(l, 2);
            }, "%j": (l) => {
              for (var w = 0, y = 0; y <= l.ve - 1; w += (U(l.pe + 1900) ? Hb : Ib)[y++])
                ;
              return f(l.we + w, 3);
            }, "%m": (l) => f(l.ve + 1, 2), "%M": (l) => f(l.Le, 2), "%n": () => "\n", "%p": (l) => 0 <= l.ue && 12 > l.ue ? "AM" : "PM", "%S": (l) => f(l.Me, 2), "%t": () => "	", "%u": (l) => l.me || 7, "%U": (l) => f(Math.floor((l.oe + 7 - l.me) / 7), 2), "%V": (l) => {
              var w = Math.floor((l.oe + 7 - (l.me + 6) % 7) / 7);
              2 >= (l.me + 371 - l.oe - 2) % 7 && w++;
              if (w)
                53 == w && (y = (l.me + 371 - l.oe) % 7, 4 == y || 3 == y && U(l.pe) || (w = 1));
              else {
                w = 52;
                var y = (l.me + 7 - l.oe - 1) % 7;
                (4 == y || 5 == y && U(l.pe % 400 - 1)) && w++;
              }
              return f(w, 2);
            }, "%w": (l) => l.me, "%W": (l) => f(Math.floor((l.oe + 7 - (l.me + 6) % 7) / 7), 2), "%y": (l) => (l.pe + 1900).toString().substring(2), "%Y": (l) => l.pe + 1900, "%z": (l) => {
              l = l.Ke;
              var w = 0 <= l;
              l = Math.abs(l) / 60;
              return (w ? "+" : "-") + String("0000" + (l / 60 * 100 + l % 60)).slice(-4);
            }, "%Z": (l) => l.Ne, "%%": () => "%" };
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
            return this.ne[a];
          }, has(a) {
            return void 0 !== this.ne[a];
          }, se(a) {
            var b = this.xe.pop() || this.ne.length;
            this.ne[b] = a;
            return b;
          }, te(a) {
            this.ne[a] = void 0;
            this.xe.push(a);
          } });
          P.ne.push({ value: void 0 }, { value: null }, { value: true }, { value: false });
          P.le = P.ne.length;
          p.count_emval_handles = () => {
            for (var a = 0, b = P.le; b < P.ne.length; ++b)
              void 0 !== P.ne[b] && ++a;
            return a;
          };
          var $e = {
            u: function(a) {
              a = new Ja(a >>> 0);
              a.Fe() || (a.ze(true), Ia--);
              a.Ae(false);
              Ha.push(a);
              Pb(a.re);
              return a.Ge();
            },
            M: () => {
              W(0, 0);
              var a = Ha.pop();
              Qb(a.re);
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
            yb: () => {
              var a = Ha.pop();
              a || ma("no exception to throw");
              var b = a.re;
              a.Be() || (Ha.push(a), a.Ae(true), a.ze(false), Ia++);
              L = b;
              throw L;
            },
            t: function(a, b, c) {
              a >>>= 0;
              new Ja(a).He(b >>> 0, c >>> 0);
              L = a;
              Ia++;
              throw L;
            },
            Ra: () => Ia,
            g: function(a) {
              L || (L = a >>> 0);
              throw L;
            },
            zb: function() {
              return 0;
            },
            Vc: function() {
            },
            Ec: function() {
            },
            Gc: function() {
            },
            yc: function() {
              return 0;
            },
            Tc: function() {
            },
            Nc: function() {
            },
            Sc: function() {
            },
            Sb: function() {
            },
            Fc: function() {
            },
            Cc: function() {
            },
            Uc: function() {
            },
            Dc: function() {
            },
            Vb: function(a, b, c, d, e) {
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
              }, argPackAdvance: 8, readValueFromPointer: Za(b, c >>> 0, !f), qe: null });
            },
            Yc: function(a, b, c, d) {
              b = M(b >>> 0);
              O(a >>> 0, { name: b, fromWireType: function(e) {
                return !!e;
              }, toWireType: function(e, f) {
                return f ? c : d;
              }, argPackAdvance: 8, readValueFromPointer: function(e) {
                return this.fromWireType(A[e >>> 0]);
              }, qe: null });
            },
            Xc: function(a, b) {
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
                qe: null
              });
            },
            Ub: function(a, b, c) {
              b = M(b >>> 0);
              O(a >>> 0, { name: b, fromWireType: (d) => d, toWireType: (d, e) => e, argPackAdvance: 8, readValueFromPointer: cb(b, c >>> 0), qe: null });
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
                qe: null
              });
            },
            Z: function(a, b, c) {
              function d(f) {
                return new e(x.buffer, I[f + 4 >>> 2 >>> 0], I[f >>> 2 >>> 0]);
              }
              var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
              c = M(c >>> 0);
              O(a >>> 0, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { Ce: true });
            },
            Wb: function(a, b) {
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
              }, argPackAdvance: 8, readValueFromPointer: db, qe(d) {
                T(d);
              } });
            },
            Bb: function(a, b, c) {
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
              }, argPackAdvance: 8, readValueFromPointer: bb, qe(k) {
                T(k);
              } });
            },
            ad: function(a, b) {
              b = M(b >>> 0);
              O(a >>> 0, { De: true, name: b, argPackAdvance: 0, fromWireType: () => {
              }, toWireType: () => {
              } });
            },
            Wc: () => true,
            pd: function(a, b, c) {
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
            fd: function(a, b, c, d) {
              c >>>= 0;
              d >>>= 0;
              a = pb[a >>> 0];
              b = Q(b >>> 0);
              c = ob(c);
              a(b, c, null, d);
            },
            xc: ab,
            qd: function(a, b) {
              b >>>= 0;
              a = Q(a >>> 0);
              b = Q(b);
              return a == b;
            },
            wc: function(a) {
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
              d.De || (k += "    return retType.toWireType(destructors, rv);\n");
              e.push(k + "};\n");
              a = wb(e).apply(null, f);
              e = rb(a);
              return ub[b] = e;
            },
            jd: function(a, b) {
              b >>>= 0;
              a = Q(a >>> 0);
              b = Q(b);
              return R(a[b]);
            },
            P: function(a) {
              a >>>= 0;
              4 < a && (P.get(a).ye += 1);
            },
            rd: function(a, b, c, d) {
              c >>>= 0;
              d >>>= 0;
              a = Q(a >>> 0);
              var e = yb[b];
              e || (e = xb(b), yb[b] = e);
              return e(a, c, d);
            },
            id: function() {
              return R([]);
            },
            md: function(a) {
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
            sd: function(a) {
              a >>>= 0;
              for (var b = Q(a); b.length; ) {
                var c = b.pop();
                b.pop()(c);
              }
              ab(a);
            },
            ud: function(a, b, c) {
              b >>>= 0;
              c >>>= 0;
              a = Q(a >>> 0);
              b = Q(b);
              c = Q(c);
              a[b] = c;
            },
            wb: function(a, b) {
              b >>>= 0;
              a = mb(a >>> 0, "_emval_take_value");
              a = a.readValueFromPointer(b);
              return R(a);
            },
            Kc: function(a, b) {
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
            Lc: function(a, b) {
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
            Mc: function(a) {
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
            Hc: function() {
              return -52;
            },
            Jc: function() {
            },
            Ac: function(a, b, c) {
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
            Tb: () => Date.now(),
            Bc: function() {
              return 4294901760;
            },
            da: () => performance.now(),
            Rc: function(a, b, c) {
              b >>>= 0;
              return A.copyWithin(a >>> 0 >>> 0, b >>> 0, b + (c >>> 0) >>> 0);
            },
            zc: function(a) {
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
            Pc: function(a, b) {
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
            Qc: function(a, b) {
              a >>>= 0;
              b >>>= 0;
              var c = Fb();
              I[a >>> 2 >>> 0] = c.length;
              var d = 0;
              c.forEach((e) => d += e.length + 1);
              I[b >>> 2 >>> 0] = d;
              return 0;
            },
            Ab: () => 52,
            Rb: function() {
              return 52;
            },
            Oc: function() {
              return 70;
            },
            Qb: function(a, b, c, d) {
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
            Zc: Sb,
            ra: Tb,
            E: Ub,
            pa: Vb,
            ea: Wb,
            _c: Xb,
            cd: Yb,
            N: Zb,
            z: $b,
            b: ac,
            $b: bc,
            sa: cc,
            e: dc,
            Db: ec,
            h: fc,
            W: gc,
            i: hc,
            $c: ic,
            j: jc,
            r: kc,
            s: lc,
            o: mc,
            za: nc,
            Ua: oc,
            ga: pc,
            Ob: qc,
            Ya: rc,
            Hb: sc,
            lb: tc,
            ec: uc,
            rc: vc,
            bc: wc,
            cc: xc,
            Xb: yc,
            ia: zc,
            fb: Ac,
            wa: Bc,
            Cb: Cc,
            ba: Dc,
            dc: Ec,
            Oa: Fc,
            D: Gc,
            K: Hc,
            Fb: Ic,
            hd: Jc,
            oa: Kc,
            L: Lc,
            _: Mc,
            U: Nc,
            y: Oc,
            Eb: Pc,
            ac: Qc,
            B: Rc,
            Gb: Sc,
            gd: Tc,
            Pa: Uc,
            ab: Vc,
            fc: Wc,
            Yb: Xc,
            Lb: Yc,
            O: Zc,
            F: $c,
            C: ad,
            jb: bd,
            R: cd,
            d: dd,
            Wa: ed,
            k: fd,
            va: gd,
            Va: hd,
            tb: jd,
            f: kd,
            sc: ld,
            aa: md,
            bb: nd,
            xa: od,
            kb: pd,
            db: qd,
            c: rd,
            pc: sd,
            kd: td,
            m: ud,
            nc: vd,
            n: wd,
            qc: xd,
            mc: yd,
            nd: zd,
            p: Ad,
            Ma: Bd,
            rb: Cd,
            La: Dd,
            Jb: Ed,
            A: Fd,
            H: Gd,
            V: Hd,
            Ta: Id,
            jc: Jd,
            cb: Kd,
            ta: Ld,
            ma: Md,
            Q: Nd,
            Za: Od,
            Ga: Pd,
            ib: Qd,
            Ca: Rd,
            hc: Sd,
            Ba: Td,
            Da: Ud,
            td: Vd,
            na: Wd,
            ld: Xd,
            Ha: Yd,
            Fa: Zd,
            tc: $d,
            lc: ae,
            Ea: be,
            Ia: ce,
            nb: de,
            fa: ee,
            ya: fe,
            gc: ge,
            kc: he,
            Ib: ie,
            Aa: je,
            ka: ke,
            xb: le,
            ed: me,
            T: ne,
            ub: oe,
            $a: pe,
            Sa: qe,
            eb: re,
            I: se,
            S: te,
            vb: ue,
            dd: ve,
            $: we,
            mb: xe,
            ha: ye,
            Zb: ze,
            vd: Ae,
            w: Be,
            _a: Ce,
            od: De,
            Mb: Ee,
            ic: Fe,
            vc: Ge,
            Nb: He,
            Kb: Ie,
            Xa: Je,
            uc: Ke,
            Pb: Le,
            Ja: Me,
            _b: Ne,
            Y: Oe,
            oc: Pe,
            J: Qe,
            bd: Re,
            sb: Se,
            qa: Te,
            G: Ue,
            pb: Ve,
            Ka: We,
            Na: Xe,
            ob: Ye,
            qb: Ze,
            v: function(a) {
              return a >>> 0;
            },
            Ic: Kb,
            ca: function(a, b, c, d) {
              return Kb(a >>> 0, b >>> 0, c >>> 0, d >>> 0);
            }
          }, X = function() {
            var a = { a: $e };
            J++;
            Fa(a, function(b) {
              X = b.instance.exports;
              X = af();
              na = X.wd;
              ua();
              Mb = X.be;
              wa.unshift(X.xd);
              J--;
              0 == J && (null !== ya && (clearInterval(ya), ya = null), K && (b = K, K = null, b()));
            }).catch(ba);
            return {};
          }();
          p._OrtInit = (a, b) => (p._OrtInit = X.yd)(a, b);
          p._OrtGetLastError = (a, b) => (p._OrtGetLastError = X.zd)(a, b);
          p._OrtCreateSessionOptions = (a, b, c, d, e, f, g, h, k, m) => (p._OrtCreateSessionOptions = X.Ad)(a, b, c, d, e, f, g, h, k, m);
          p._OrtAppendExecutionProvider = (a, b) => (p._OrtAppendExecutionProvider = X.Bd)(a, b);
          p._OrtAddFreeDimensionOverride = (a, b, c) => (p._OrtAddFreeDimensionOverride = X.Cd)(a, b, c);
          p._OrtAddSessionConfigEntry = (a, b, c) => (p._OrtAddSessionConfigEntry = X.Dd)(a, b, c);
          p._OrtReleaseSessionOptions = (a) => (p._OrtReleaseSessionOptions = X.Ed)(a);
          p._OrtCreateSession = (a, b, c) => (p._OrtCreateSession = X.Fd)(a, b, c);
          p._OrtReleaseSession = (a) => (p._OrtReleaseSession = X.Gd)(a);
          p._OrtGetInputOutputCount = (a, b, c) => (p._OrtGetInputOutputCount = X.Hd)(a, b, c);
          p._OrtGetInputName = (a, b) => (p._OrtGetInputName = X.Id)(a, b);
          p._OrtGetOutputName = (a, b) => (p._OrtGetOutputName = X.Jd)(a, b);
          p._OrtFree = (a) => (p._OrtFree = X.Kd)(a);
          p._OrtCreateTensor = (a, b, c, d, e, f) => (p._OrtCreateTensor = X.Ld)(a, b, c, d, e, f);
          p._OrtGetTensorData = (a, b, c, d, e) => (p._OrtGetTensorData = X.Md)(a, b, c, d, e);
          p._OrtReleaseTensor = (a) => (p._OrtReleaseTensor = X.Nd)(a);
          p._OrtCreateRunOptions = (a, b, c, d) => (p._OrtCreateRunOptions = X.Od)(a, b, c, d);
          p._OrtAddRunConfigEntry = (a, b, c) => (p._OrtAddRunConfigEntry = X.Pd)(a, b, c);
          p._OrtReleaseRunOptions = (a) => (p._OrtReleaseRunOptions = X.Qd)(a);
          p._OrtCreateBinding = (a) => (p._OrtCreateBinding = X.Rd)(a);
          p._OrtBindInput = (a, b, c) => (p._OrtBindInput = X.Sd)(a, b, c);
          p._OrtBindOutput = (a, b, c, d) => (p._OrtBindOutput = X.Td)(a, b, c, d);
          p._OrtClearBoundOutputs = (a) => (p._OrtClearBoundOutputs = X.Ud)(a);
          p._OrtReleaseBinding = (a) => (p._OrtReleaseBinding = X.Vd)(a);
          p._OrtRunWithBinding = (a, b, c, d, e) => (p._OrtRunWithBinding = X.Wd)(a, b, c, d, e);
          p._OrtRun = (a, b, c, d, e, f, g, h) => (p._OrtRun = X.Xd)(a, b, c, d, e, f, g, h);
          p._OrtEndProfiling = (a) => (p._OrtEndProfiling = X.Yd)(a);
          var Bb = p._malloc = (a) => (Bb = p._malloc = X.Zd)(a), T = p._free = (a) => (T = p._free = X._d)(a), lb = (a) => (lb = X.$d)(a);
          p.__embind_initialize_bindings = () => (p.__embind_initialize_bindings = X.ae)();
          var W = (a, b) => (W = X.ce)(a, b), La = (a) => (La = X.de)(a), Y = () => (Y = X.ee)(), Z = (a) => (Z = X.fe)(a), bf = (a) => (bf = X.ge)(a), Qb = (a) => (Qb = X.he)(a), Pb = (a) => (Pb = X.ie)(a), Ma = (a, b, c) => (Ma = X.je)(a, b, c), Ka = (a) => (Ka = X.ke)(a);
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
          function Be(a, b, c) {
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
          function se(a, b, c, d) {
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
          function Ge(a, b, c, d) {
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
          function we(a, b, c, d, e) {
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
          function ue(a, b, c, d, e, f, g) {
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
          function Ae(a, b, c, d, e, f, g, h, k, m, n, u) {
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
          function te(a, b, c, d, e) {
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
          function re(a, b, c, d, e, f, g, h, k) {
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
          function Se(a, b, c, d, e, f, g, h) {
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
          function Pe(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y) {
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
          function Qe(a, b) {
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
          function Je(a, b, c, d, e, f, g, h, k, m) {
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
          function Xe(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C) {
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
          function Ze(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G) {
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
          function We(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D) {
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
          function Ve(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z) {
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
          function Ye(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F) {
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
          function He(a, b, c, d, e, f, g, h, k, m) {
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
          function Ee(a, b, c, d, e, f, g, h, k, m, n) {
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
          function Oe(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w) {
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
          function Ue(a, b, c, d, e, f, g, h, k, m) {
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
          function Te(a, b, c, d, e, f, g, h, k) {
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
          function Ie(a, b, c, d, e, f) {
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
          function ye(a, b, c, d, e, f, g, h) {
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
          function Me(a, b, c, d, e, f, g, h, k) {
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
          function De(a, b, c, d, e, f) {
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
          function pe(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
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
          function be(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G, H, S, ef, ff, gf) {
            var hf = Y();
            try {
              V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G, H, S, ef, ff, gf);
            } catch (Ga) {
              Z(hf);
              if (Ga !== Ga + 0)
                throw Ga;
              W(1, 0);
            }
          }
          function xe(a, b, c, d, e, f) {
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
          function Fe(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
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
          function Ce(a, b, c, d) {
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
          function ve(a, b, c, d, e, f, g, h, k, m, n, u, v) {
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
          function Re(a, b, c, d, e) {
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
          function Ne(a, b, c, d, e, f, g, h, k, m, n, u, v) {
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
          function ze(a, b, c, d, e, f, g, h, k, m) {
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
          function af() {
            var a = X;
            a = Object.assign({}, a);
            var b = (d) => () => d() >>> 0, c = (d) => (e) => d(e) >>> 0;
            a.__errno_location = b(a.__errno_location);
            a.Zd = c(a.Zd);
            a.$d = c(a.$d);
            a.ee = b(a.ee);
            a.ge = c(a.ge);
            return a;
          }
          p.stackAlloc = bf;
          p.stackSave = Y;
          p.stackRestore = Z;
          p.UTF8ToString = Qa;
          p.stringToUTF8 = (a, b, c) => Sa(a, A, b, c);
          p.lengthBytesUTF8 = Ra;
          var cf;
          K = function df() {
            cf || jf();
            cf || (K = df);
          };
          function jf() {
            if (!(0 < J)) {
              for (; 0 < va.length; )
                va.shift()(p);
              if (!(0 < J || cf || (cf = true, p.calledRun = true, oa))) {
                for (; 0 < wa.length; )
                  wa.shift()(p);
                for (aa(p); 0 < xa.length; )
                  xa.shift()(p);
              }
            }
          }
          jf();
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
  var lib_exports = {};
  __export(lib_exports, {
    InferenceSession: () => InferenceSession2,
    Tensor: () => Tensor2,
    TrainingSession: () => TrainingSession2,
    default: () => lib_default,
    env: () => env2,
    registerBackend: () => registerBackend
  });
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
  return __toCommonJS(lib_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL2luZmVyZW5jZS1zZXNzaW9uLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvb25ueC12YWx1ZS50cyIsICIuLi8uLi9jb21tb24vbGliL3RyYWluaW5nLXNlc3Npb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RyYWluaW5nLXNlc3Npb24udHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmRleC50cyIsICJub2RlanMtaWdub3JlOm5vZGU6b3MiLCAibm9kZWpzLWlnbm9yZTpmcyIsICJub2RlanMtaWdub3JlOnBhdGgiLCAiLi4vbGliL3dhc20vYmluZGluZy9vcnQtd2FzbS5qcyIsICIuLi9saWIvd2FzbS93YXNtLWZhY3RvcnkudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy50cyIsICIuLi9saWIvd2FzbS9ydW4tb3B0aW9ucy50cyIsICIuLi9saWIvd2FzbS9zZXNzaW9uLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb21tb24udHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb3JlLWltcGwudHMiLCAiLi4vbGliL3dhc20vcHJveHktd3JhcHBlci50cyIsICJub2RlanMtaWdub3JlOm5vZGU6ZnMvcHJvbWlzZXMiLCAiLi4vbGliL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZS50cyIsICIuLi9saWIvYmFja2VuZC13YXNtLnRzIiwgIi4uL2xpYi9iYWNrZW5kLXdhc20taW5mZXJlbmNlLnRzIiwgIi4uL2xpYi9pbmRleC50cyIsICIuLi9saWIvdmVyc2lvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7QmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kLmpzJztcblxuaW50ZXJmYWNlIEJhY2tlbmRJbmZvIHtcbiAgYmFja2VuZDogQmFja2VuZDtcbiAgcHJpb3JpdHk6IG51bWJlcjtcblxuICBpbml0UHJvbWlzZT86IFByb21pc2U8dm9pZD47XG4gIGluaXRpYWxpemVkPzogYm9vbGVhbjtcbiAgYWJvcnRlZD86IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhY2tlbmRzOiBNYXA8c3RyaW5nLCBCYWNrZW5kSW5mbz4gPSBuZXcgTWFwKCk7XG5jb25zdCBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHk6IHN0cmluZ1tdID0gW107XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBiYWNrZW5kLlxuICpcbiAqIEBwYXJhbSBuYW1lIC0gdGhlIG5hbWUgYXMgYSBrZXkgdG8gbG9va3VwIGFzIGFuIGV4ZWN1dGlvbiBwcm92aWRlci5cbiAqIEBwYXJhbSBiYWNrZW5kIC0gdGhlIGJhY2tlbmQgb2JqZWN0LlxuICogQHBhcmFtIHByaW9yaXR5IC0gYW4gaW50ZWdlciBpbmRpY2F0aW5nIHRoZSBwcmlvcml0eSBvZiB0aGUgYmFja2VuZC4gSGlnaGVyIG51bWJlciBtZWFucyBoaWdoZXIgcHJpb3JpdHkuIGlmIHByaW9yaXR5XG4gKiA8IDAsIGl0IHdpbGwgYmUgY29uc2lkZXJlZCBhcyBhICdiZXRhJyB2ZXJzaW9uIGFuZCB3aWxsIG5vdCBiZSB1c2VkIGFzIGEgZmFsbGJhY2sgYmFja2VuZCBieSBkZWZhdWx0LlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyQmFja2VuZCA9IChuYW1lOiBzdHJpbmcsIGJhY2tlbmQ6IEJhY2tlbmQsIHByaW9yaXR5OiBudW1iZXIpOiB2b2lkID0+IHtcbiAgaWYgKGJhY2tlbmQgJiYgdHlwZW9mIGJhY2tlbmQuaW5pdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgYmFja2VuZC5jcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IGN1cnJlbnRCYWNrZW5kID0gYmFja2VuZHMuZ2V0KG5hbWUpO1xuICAgIGlmIChjdXJyZW50QmFja2VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBiYWNrZW5kcy5zZXQobmFtZSwge2JhY2tlbmQsIHByaW9yaXR5fSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50QmFja2VuZC5wcmlvcml0eSA+IHByaW9yaXR5KSB7XG4gICAgICAvLyBzYW1lIG5hbWUgaXMgYWxyZWFkeSByZWdpc3RlcmVkIHdpdGggYSBoaWdoZXIgcHJpb3JpdHkuIHNraXAgcmVnaXN0ZXJhdGlvbi5cbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kLnByaW9yaXR5ID09PSBwcmlvcml0eSkge1xuICAgICAgaWYgKGN1cnJlbnRCYWNrZW5kLmJhY2tlbmQgIT09IGJhY2tlbmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcmVnaXN0ZXIgYmFja2VuZCBcIiR7bmFtZX1cIiB1c2luZyBwcmlvcml0eSAke3ByaW9yaXR5fWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcmlvcml0eSA+PSAwKSB7XG4gICAgICBjb25zdCBpID0gYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaSAhPT0gLTEpIHtcbiAgICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnNwbGljZShpLCAxKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJhY2tlbmRzLmdldChiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHlbaV0pIS5wcmlvcml0eSA8PSBwcmlvcml0eSkge1xuICAgICAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5zcGxpY2UoaSwgMCwgbmFtZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkucHVzaChuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgdmFsaWQgYmFja2VuZCcpO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlIGJhY2tlbmQgYnkgc3BlY2lmaWVkIGhpbnRzLlxuICpcbiAqIEBwYXJhbSBiYWNrZW5kSGludHMgLSBhIGxpc3Qgb2YgZXhlY3V0aW9uIHByb3ZpZGVyIG5hbWVzIHRvIGxvb2t1cC4gSWYgb21pdHRlZCB1c2UgcmVnaXN0ZXJlZCBiYWNrZW5kcyBhcyBsaXN0LlxuICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGJhY2tlbmQuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZUJhY2tlbmQgPSBhc3luYyhiYWNrZW5kSGludHM6IHJlYWRvbmx5IHN0cmluZ1tdKTogUHJvbWlzZTxCYWNrZW5kPiA9PiB7XG4gIGNvbnN0IGJhY2tlbmROYW1lcyA9IGJhY2tlbmRIaW50cy5sZW5ndGggPT09IDAgPyBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkgOiBiYWNrZW5kSGludHM7XG4gIGNvbnN0IGVycm9ycyA9IFtdO1xuICBmb3IgKGNvbnN0IGJhY2tlbmROYW1lIG9mIGJhY2tlbmROYW1lcykge1xuICAgIGNvbnN0IGJhY2tlbmRJbmZvID0gYmFja2VuZHMuZ2V0KGJhY2tlbmROYW1lKTtcbiAgICBpZiAoYmFja2VuZEluZm8pIHtcbiAgICAgIGlmIChiYWNrZW5kSW5mby5pbml0aWFsaXplZCkge1xuICAgICAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcbiAgICAgIH0gZWxzZSBpZiAoYmFja2VuZEluZm8uYWJvcnRlZCkge1xuICAgICAgICBjb250aW51ZTsgIC8vIGN1cnJlbnQgYmFja2VuZCBpcyB1bmF2YWlsYWJsZTsgdHJ5IG5leHRcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNJbml0aWFsaXppbmcgPSAhIWJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFpc0luaXRpYWxpemluZykge1xuICAgICAgICAgIGJhY2tlbmRJbmZvLmluaXRQcm9taXNlID0gYmFja2VuZEluZm8uYmFja2VuZC5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgICAgIGJhY2tlbmRJbmZvLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGJhY2tlbmRJbmZvLmJhY2tlbmQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmICghaXNJbml0aWFsaXppbmcpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaCh7bmFtZTogYmFja2VuZE5hbWUsIGVycjogZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJhY2tlbmRJbmZvLmFib3J0ZWQgPSB0cnVlO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZGVsZXRlIGJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgbm8gYXZhaWxhYmxlIGJhY2tlbmQgZm91bmQuIEVSUjogJHtlcnJvcnMubWFwKGUgPT4gYFske2UubmFtZX1dICR7ZS5lcnJ9YCkuam9pbignLCAnKX1gKTtcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7VHJhaW5pbmdTZXNzaW9ufSBmcm9tICcuL3RyYWluaW5nLXNlc3Npb24uanMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFNlc3Npb25IYW5kbGVyIHtcbiAgdHlwZSBGZWVkc1R5cGUgPSB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX07XG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGx9O1xuICB0eXBlIFJldHVyblR5cGUgPSB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX07XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBzaGFyZWQgU2Vzc2lvbkhhbmRsZXIgZnVuY3Rpb25hbGl0eVxuICpcbiAqIEBpZ25vcmVcbiAqL1xuaW50ZXJmYWNlIFNlc3Npb25IYW5kbGVyIHtcbiAgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIHJlYWRvbmx5IGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuICByZWFkb25seSBvdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgaGFuZGxlciBpbnN0YW5jZSBvZiBhbiBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgZXh0ZW5kcyBTZXNzaW9uSGFuZGxlciB7XG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQ7XG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIHJ1bihmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgaGFuZGxlciBpbnN0YW5jZSBvZiBhIHRyYWluaW5nIGluZmVyZW5jZSBzZXNzaW9uLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xuICBydW5UcmFpblN0ZXAoXG4gICAgICBmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG5cbiAgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYXJyYXk6IFVpbnQ4QXJyYXksIHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+O1xuICBnZXRDb250aWd1b3VzUGFyYW1ldGVycyh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxVaW50OEFycmF5Pjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBiYWNrZW5kIHRoYXQgcHJvdmlkZXMgaW1wbGVtZW50YXRpb24gb2YgbW9kZWwgaW5mZXJlbmNpbmcuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tlbmQge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmFja2VuZCBhc3luY2hyb25vdXNseS4gU2hvdWxkIHRocm93IHdoZW4gZmFpbGVkLlxuICAgKi9cbiAgaW5pdCgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKHVyaU9yQnVmZmVyOiBzdHJpbmd8VWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG5cbiAgY3JlYXRlVHJhaW5pbmdTZXNzaW9uSGFuZGxlcj9cbiAgICAgIChjaGVja3BvaW50U3RhdGVVcmlPckJ1ZmZlcjogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyLCB0cmFpbk1vZGVsVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VUklvckJ1ZmZlcixcbiAgICAgICBldmFsTW9kZWxVcmlPckJ1ZmZlcjogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyLCBvcHRpbWl6ZXJNb2RlbFVyaU9yQnVmZmVyOiBUcmFpbmluZ1Nlc3Npb24uVVJJb3JCdWZmZXIsXG4gICAgICAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8VHJhaW5pbmdTZXNzaW9uSGFuZGxlcj47XG59XG5cbmV4cG9ydCB7cmVnaXN0ZXJCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgL2pzL3NjcmlwdHMvdXBkYXRlLXZlcnNpb24udHNcbi8vIERvIG5vdCBtb2RpZnkgZmlsZSBjb250ZW50IG1hbnVhbGx5LlxuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcxLjE3LjAnO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0Vudn0gZnJvbSAnLi9lbnYuanMnO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICcuL3ZlcnNpb24uanMnO1xuXG50eXBlIExvZ0xldmVsVHlwZSA9IEVudlsnbG9nTGV2ZWwnXTtcblxubGV0IGxvZ0xldmVsVmFsdWU6IFJlcXVpcmVkPExvZ0xldmVsVHlwZT4gPSAnd2FybmluZyc7XG5cbmV4cG9ydCBjb25zdCBlbnY6IEVudiA9IHtcbiAgd2FzbToge30gYXMgRW52LldlYkFzc2VtYmx5RmxhZ3MsXG4gIHdlYmdsOiB7fSBhcyBFbnYuV2ViR0xGbGFncyxcbiAgd2ViZ3B1OiB7fSBhcyBFbnYuV2ViR3B1RmxhZ3MsXG4gIHZlcnNpb25zOiB7Y29tbW9uOiB2ZXJzaW9ufSxcblxuICBzZXQgbG9nTGV2ZWwodmFsdWU6IExvZ0xldmVsVHlwZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IFsndmVyYm9zZScsICdpbmZvJywgJ3dhcm5pbmcnLCAnZXJyb3InLCAnZmF0YWwnXS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHt2YWx1ZX1gKTtcbiAgICB9XG4gICAgbG9nTGV2ZWxWYWx1ZSA9IHZhbHVlO1xuICB9LFxuICBnZXQgbG9nTGV2ZWwoKTogUmVxdWlyZWQ8TG9nTGV2ZWxUeXBlPiB7XG4gICAgcmV0dXJuIGxvZ0xldmVsVmFsdWU7XG4gIH0sXG59O1xuXG4vLyBzZXQgcHJvcGVydHkgJ2xvZ0xldmVsJyBzbyB0aGF0IHRoZXkgY2FuIGJlIGNvcnJlY3RseSB0cmFuc2ZlcnJlZCB0byB3b3JrZXIgYnkgYHBvc3RNZXNzYWdlKClgLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudiwgJ2xvZ0xldmVsJywge2VudW1lcmFibGU6IHRydWV9KTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtlbnYgYXMgZW52SW1wbH0gZnJvbSAnLi9lbnYtaW1wbC5qcyc7XG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBFbnYge1xuICBleHBvcnQgdHlwZSBXYXNtUHJlZml4T3JGaWxlUGF0aHMgPSBzdHJpbmd8e1xuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuICAgICdvcnQtd2FzbS53YXNtJz86IHN0cmluZztcbiAgICAnb3J0LXdhc20tdGhyZWFkZWQud2FzbSc/OiBzdHJpbmc7XG4gICAgJ29ydC13YXNtLXNpbWQud2FzbSc/OiBzdHJpbmc7XG4gICAgJ29ydC10cmFpbmluZy13YXNtLXNpbWQud2FzbSc/OiBzdHJpbmc7XG4gICAgJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbSc/OiBzdHJpbmc7XG4gICAgLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cbiAgfTtcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJBc3NlbWJseUZsYWdzIHtcbiAgICAvKipcbiAgICAgKiBzZXQgb3IgZ2V0IG51bWJlciBvZiB0aHJlYWQocykuIElmIG9taXR0ZWQgb3Igc2V0IHRvIDAsIG51bWJlciBvZiB0aHJlYWQocykgd2lsbCBiZSBkZXRlcm1pbmVkIGJ5IHN5c3RlbS4gSWYgc2V0XG4gICAgICogdG8gMSwgbm8gd29ya2VyIHRocmVhZCB3aWxsIGJlIHNwYXduZWQuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgd2hlbiBXZWJBc3NlbWJseSBtdWx0aXRocmVhZCBmZWF0dXJlIGlzIGF2YWlsYWJsZSBpbiBjdXJyZW50IGNvbnRleHQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAwYFxuICAgICAqL1xuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBzZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gZW5hYmxlIFNJTUQuIElmIHNldCB0byBmYWxzZSwgU0lNRCB3aWxsIGJlIGZvcmNlbHkgZGlzYWJsZWQuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgd2hlbiBXZWJBc3NlbWJseSBTSU1EIGZlYXR1cmUgaXMgYXZhaWxhYmxlIGluIGN1cnJlbnQgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYHRydWVgXG4gICAgICovXG4gICAgc2ltZD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IGEgbnVtYmVyIHNwZWNpZnlpbmcgdGhlIHRpbWVvdXQgZm9yIGluaXRpYWxpemF0aW9uIG9mIFdlYkFzc2VtYmx5IGJhY2tlbmQsIGluIG1pbGxpc2Vjb25kcy4gQSB6ZXJvXG4gICAgICogdmFsdWUgaW5kaWNhdGVzIG5vIHRpbWVvdXQgaXMgc2V0LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgMGBcbiAgICAgKi9cbiAgICBpbml0VGltZW91dD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFNldCBhIGN1c3RvbSBVUkwgcHJlZml4IHRvIHRoZSAud2FzbSBmaWxlcyBvciBhIHNldCBvZiBvdmVycmlkZXMgZm9yIGVhY2ggLndhc20gZmlsZS4gVGhlIG92ZXJyaWRlIHBhdGggc2hvdWxkIGJlXG4gICAgICogYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKi9cbiAgICB3YXNtUGF0aHM/OiBXYXNtUHJlZml4T3JGaWxlUGF0aHM7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gcHJveHkgdGhlIGV4ZWN1dGlvbiBvZiBtYWluIHRocmVhZCB0byBhIHdvcmtlciB0aHJlYWQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBwcm94eT86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdMRmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIFdlYkdMIENvbnRleHQgSUQgKHdlYmdsIG9yIHdlYmdsMikuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAnd2ViZ2wyJ2BcbiAgICAgKi9cbiAgICBjb250ZXh0SWQ/OiAnd2ViZ2wnfCd3ZWJnbDInO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgV2ViR0wgcmVuZGVyaW5nIGNvbnRleHQuXG4gICAgICovXG4gICAgcmVhZG9ubHkgY29udGV4dDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIG1heGltdW0gYmF0Y2ggc2l6ZSBmb3IgbWF0bXVsLiAwIG1lYW5zIHRvIGRpc2FibGUgYmF0Y2hpbmcuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIG1hdG11bE1heEJhdGNoU2l6ZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSB0ZXh0dXJlIGNhY2hlIG1vZGUuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAnZnVsbCdgXG4gICAgICovXG4gICAgdGV4dHVyZUNhY2hlTW9kZT86ICdpbml0aWFsaXplck9ubHknfCdmdWxsJztcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwYWNrZWQgdGV4dHVyZSBtb2RlXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBwYWNrPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHdoZXRoZXIgZW5hYmxlIGFzeW5jIGRvd25sb2FkLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICovXG4gICAgYXN5bmM/OiBib29sZWFuO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVGbGFncyB7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXG4gICAgICovXG4gICAgcHJvZmlsaW5nTW9kZT86ICdvZmYnfCdkZWZhdWx0JztcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRldmljZSBmb3IgV2ViR1BVLlxuICAgICAqXG4gICAgICogV2hlbiB1c2Ugd2l0aCBUeXBlU2NyaXB0LCB0aGUgdHlwZSBvZiB0aGlzIHByb3BlcnR5IGlzIGBHUFVEZXZpY2VgIGRlZmluZWQgaW4gXCJAd2ViZ3B1L3R5cGVzXCIuXG4gICAgICogVXNlIGBjb25zdCBkZXZpY2UgPSBlbnYud2ViZ3B1LmRldmljZSBhcyBHUFVEZXZpY2U7YCBpbiBUeXBlU2NyaXB0IHRvIGFjY2VzcyB0aGlzIHByb3BlcnR5IHdpdGggY29ycmVjdCB0eXBlLlxuICAgICAqXG4gICAgICogc2VlIGNvbW1lbnRzIG9uIHtAbGluayBHcHVCdWZmZXJUeXBlfSBmb3IgbW9yZSBkZXRhaWxzIGFib3V0IHdoeSBub3QgdXNlIHR5cGVzIGRlZmluZWQgaW4gXCJAd2ViZ3B1L3R5cGVzXCIuXG4gICAgICovXG4gICAgcmVhZG9ubHkgZGV2aWNlOiB1bmtub3duO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgd2hldGhlciB2YWxpZGF0ZSBpbnB1dCBjb250ZW50LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICovXG4gICAgdmFsaWRhdGVJbnB1dENvbnRlbnQ/OiBib29sZWFuO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW52IHtcbiAgLyoqXG4gICAqIHNldCB0aGUgc2V2ZXJpdHkgbGV2ZWwgZm9yIGxvZ2dpbmcuXG4gICAqXG4gICAqIEBkZWZhdWx0VmFsdWUgYCd3YXJuaW5nJ2BcbiAgICovXG4gIGxvZ0xldmVsPzogJ3ZlcmJvc2UnfCdpbmZvJ3wnd2FybmluZyd8J2Vycm9yJ3wnZmF0YWwnO1xuICAvKipcbiAgICogSW5kaWNhdGUgd2hldGhlciBydW4gaW4gZGVidWcgbW9kZS5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAqL1xuICBkZWJ1Zz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEdldCB2ZXJzaW9uIG9mIHRoZSBjdXJyZW50IHBhY2thZ2UuXG4gICAqL1xuICByZWFkb25seSB2ZXJzaW9uczoge1xuICAgIHJlYWRvbmx5IGNvbW1vbjogc3RyaW5nO1xuICAgIHJlYWRvbmx5IHdlYj86IHN0cmluZztcbiAgICByZWFkb25seSBub2RlPzogc3RyaW5nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICByZWFkb25seSAncmVhY3QtbmF0aXZlJz86IHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJBc3NlbWJseVxuICAgKi9cbiAgcmVhZG9ubHkgd2FzbTogRW52LldlYkFzc2VtYmx5RmxhZ3M7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViR0xcbiAgICovXG4gIHJlYWRvbmx5IHdlYmdsOiBFbnYuV2ViR0xGbGFncztcblxuICAvKipcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJHUFVcbiAgICovXG4gIHJlYWRvbmx5IHdlYmdwdTogRW52LldlYkdwdUZsYWdzO1xuXG4gIFtuYW1lOiBzdHJpbmddOiB1bmtub3duO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBhcyBhIGdsb2JhbCBzaW5nbGV0b24uXG4gKi9cbmV4cG9ydCBjb25zdCBlbnY6IEVudiA9IGVudkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7VGVuc29yVG9EYXRhVXJsT3B0aW9ucywgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvRGF0YVVSTCgpXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JUb0RhdGFVUkwgPSAodGVuc29yOiBUZW5zb3IsIG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGNhbnZhcy53aWR0aCA9IHRlbnNvci5kaW1zWzNdO1xuICBjYW52YXMuaGVpZ2h0ID0gdGVuc29yLmRpbXNbMl07XG4gIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgIC8vIERlZmF1bHQgdmFsdWVzIGZvciBoZWlnaHQgYW5kIHdpZHRoICYgZm9ybWF0XG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XG4gICAgbGV0IGhlaWdodDogbnVtYmVyO1xuICAgIGlmIChvcHRpb25zPy50ZW5zb3JMYXlvdXQgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzJdO1xuICAgICAgaGVpZ2h0ID0gdGVuc29yLmRpbXNbM107XG4gICAgfSBlbHNlIHsgIC8vIERlZmF1bHQgbGF5b3V0IGlzIE5DV0hcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbM107XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dGZvcm1hdCA9IG9wdGlvbnM/LmZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5mb3JtYXQgOiAnUkdCJztcblxuICAgIGNvbnN0IG5vcm0gPSBvcHRpb25zPy5ub3JtO1xuICAgIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgbGV0IG5vcm1CaWFzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0ubWVhbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBub3JtTWVhbiA9IFsyNTUsIDI1NSwgMjU1LCAyNTVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIChub3JtLm1lYW4pID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuWzBdLCBub3JtLm1lYW5bMV0sIG5vcm0ubWVhblsyXSwgMF07XG4gICAgICAgIGlmIChub3JtLm1lYW5bM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1NZWFuWzNdID0gbm9ybS5tZWFuWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1CaWFzID0gWzAsIDAsIDAsIDBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIChub3JtLmJpYXMpID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1CaWFzWzNdID0gbm9ybS5iaWFzWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gICAgLy8gRGVmYXVsdCBwb2ludGVyIGFzc2lnbm1lbnRzXG4gICAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCwgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMiwgYVRlbnNvclBvaW50ZXIgPSAtMTtcblxuICAgIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBpbnB1dCBpbWFnZSBmb3JtYXRcbiAgICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQicpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdpZHRoOyBqKyspIHtcbiAgICAgICAgY29uc3QgUiA9ICgodGVuc29yLmRhdGFbclRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzBdKSAqIG5vcm1NZWFuWzBdOyAgLy8gUiB2YWx1ZVxuICAgICAgICBjb25zdCBHID0gKCh0ZW5zb3IuZGF0YVtnVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMV0pICogbm9ybU1lYW5bMV07ICAvLyBHIHZhbHVlXG4gICAgICAgIGNvbnN0IEIgPSAoKHRlbnNvci5kYXRhW2JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1syXSkgKiBub3JtTWVhblsyXTsgIC8vIEIgdmFsdWVcbiAgICAgICAgY29uc3QgQSA9IGFUZW5zb3JQb2ludGVyID09PSAtMSA/XG4gICAgICAgICAgICAyNTUgOlxuICAgICAgICAgICAgKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107ICAvLyBBIHZhbHVlXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvcmVzdHJpY3QtcGx1cy1vcGVyYW5kc1xuICAgICAgICBwaXhlbHMyRENvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoJyArIFIgKyAnLCcgKyBHICsgJywnICsgQiArICcsJyArIEEgKyAnKSc7XG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5maWxsUmVjdChqLCBpLCAxLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IudG9JbWFnZURhdGEoKVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVG9JbWFnZURhdGEgPSAodGVuc29yOiBUZW5zb3IsIG9wdGlvbnM/OiBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMpOiBJbWFnZURhdGEgPT4ge1xuICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpO1xuICBsZXQgaW1hZ2U6IEltYWdlRGF0YTtcbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IGNoYW5uZWxzOiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1sxXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbM107XG4gICAgfSBlbHNlIHsgIC8vIERlZmF1bHQgbGF5b3V0IGlzIE5DV0hcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbM107XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbMV07XG4gICAgfVxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgKG5vcm0ubWVhbikgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW5bMF0sIG5vcm0ubWVhblsxXSwgbm9ybS5tZWFuWzJdLCAyNTVdO1xuICAgICAgICBpZiAobm9ybS5tZWFuWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtTWVhblszXSA9IG5vcm0ubWVhblszXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0uYmlhcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBub3JtQmlhcyA9IFswLCAwLCAwLCAwXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiAobm9ybS5iaWFzKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xuICAgICAgICBpZiAobm9ybS5iaWFzWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtQmlhc1szXSA9IG5vcm0uYmlhc1szXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0cmlkZSA9IGhlaWdodCAqIHdpZHRoO1xuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvcHRpb25zLmZvcm1hdCAhPT0gdW5kZWZpbmVkICYmIChjaGFubmVscyA9PT0gNCAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQkEnKSB8fFxuICAgICAgICAgIChjaGFubmVscyA9PT0gMyAmJiAob3B0aW9ucy5mb3JtYXQgIT09ICdSR0InICYmIG9wdGlvbnMuZm9ybWF0ICE9PSAnQkdSJykpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIGZvcm1hdCBkb2VzblxcJ3QgbWF0Y2ggaW5wdXQgdGVuc29yIGRpbXMnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcbiAgICBjb25zdCBzdGVwID0gNDtcbiAgICBsZXQgckltYWdlUG9pbnRlciA9IDAsIGdJbWFnZVBvaW50ZXIgPSAxLCBiSW1hZ2VQb2ludGVyID0gMiwgYUltYWdlUG9pbnRlciA9IDM7XG4gICAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCwgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMiwgYVRlbnNvclBvaW50ZXIgPSAtMTtcblxuICAgIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBpbnB1dCBpbWFnZSBmb3JtYXRcbiAgICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQicpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9XG5cbiAgICBpbWFnZSA9IHBpeGVsczJEQ29udGV4dC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodCAqIHdpZHRoO1xuICAgICAgICAgckltYWdlUG9pbnRlciArPSBzdGVwLCBnSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYUltYWdlUG9pbnRlciArPSBzdGVwLCBpKyspIHtcbiAgICAgIGltYWdlLmRhdGFbckltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW3JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1swXSkgKiBub3JtTWVhblswXTsgIC8vIFIgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbZ0ltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgIC8vIEcgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbYkltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1syXSkgKiBub3JtTWVhblsyXTsgIC8vIEIgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbYUltYWdlUG9pbnRlcl0gPSBhVGVuc29yUG9pbnRlciA9PT0gLTEgP1xuICAgICAgICAgIDI1NSA6XG4gICAgICAgICAgKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107ICAvLyBBIHZhbHVlXG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbiAgcmV0dXJuIGltYWdlO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtPcHRpb25zRGltZW5zaW9ucywgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLCBPcHRpb25zVGVuc29yRm9ybWF0LCBPcHRpb25zVGVuc29yTGF5b3V0LCBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucywgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucywgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLCBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnMsIFRlbnNvckZyb21VcmxPcHRpb25zfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7VGVuc29yIGFzIFRlbnNvckludGVyZmFjZX0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG5pbnRlcmZhY2UgQnVmZmVyVG9UZW5zb3JPcHRpb25zIGV4dGVuZHMgT3B0aW9uc0RpbWVuc2lvbnMsIE9wdGlvbnNUZW5zb3JMYXlvdXQsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcHRpb25zRm9ybWF0LCBPcHRpb25zVGVuc29yRm9ybWF0IHt9XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSBpbWFnZSBvYmplY3RcbiAqXG4gKiBAcGFyYW0gYnVmZmVyIC0gRXh0cmFjdGVkIGltYWdlIGJ1ZmZlciBkYXRhIC0gYXNzdW1pbmcgUkdCQSBmb3JtYXRcbiAqIEBwYXJhbSBpbWFnZUZvcm1hdCAtIGlucHV0IGltYWdlIGNvbmZpZ3VyYXRpb24gLSByZXF1aXJlZCBjb25maWd1cmF0aW9ucyBoZWlnaHQsIHdpZHRoLCBmb3JtYXRcbiAqIEBwYXJhbSB0ZW5zb3JGb3JtYXQgLSBvdXRwdXQgdGVuc29yIGNvbmZpZ3VyYXRpb24gLSBEZWZhdWx0IGlzIFJHQiBmb3JtYXRcbiAqL1xuZXhwb3J0IGNvbnN0IGJ1ZmZlclRvVGVuc29yID0gKGJ1ZmZlcjogVWludDhDbGFtcGVkQXJyYXl8dW5kZWZpbmVkLCBvcHRpb25zOiBCdWZmZXJUb1RlbnNvck9wdGlvbnMpOiBUZW5zb3IgPT4ge1xuICBpZiAoYnVmZmVyID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGJ1ZmZlciBtdXN0IGJlIGRlZmluZWQnKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oZWlnaHQgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLndpZHRoID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGhlaWdodCBhbmQgd2lkdGggbXVzdCBiZSBkZWZpbmVkJyk7XG4gIH1cbiAgaWYgKG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05IV0MgVGVuc29yIGxheW91dCBpcyBub3Qgc3VwcG9ydGVkIHlldCcpO1xuICB9XG5cbiAgY29uc3Qge2hlaWdodCwgd2lkdGh9ID0gb3B0aW9ucztcblxuICBjb25zdCBub3JtID0gb3B0aW9ucy5ub3JtID8/IHttZWFuOiAyNTUsIGJpYXM6IDB9O1xuICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuXG4gIGlmICh0eXBlb2YgKG5vcm0ubWVhbikgPT09ICdudW1iZXInKSB7XG4gICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgfSBlbHNlIHtcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4hWzBdLCBub3JtLm1lYW4hWzFdLCBub3JtLm1lYW4hWzJdLCBub3JtLm1lYW4hWzNdID8/IDI1NV07XG4gIH1cblxuICBpZiAodHlwZW9mIChub3JtLmJpYXMpID09PSAnbnVtYmVyJykge1xuICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhc107XG4gIH0gZWxzZSB7XG4gICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzIVswXSwgbm9ybS5iaWFzIVsxXSwgbm9ybS5iaWFzIVsyXSwgbm9ybS5iaWFzIVszXSA/PyAwXTtcbiAgfVxuXG4gIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQkEnO1xuICAvLyBkZWZhdWx0IHZhbHVlIGlzIFJHQkEgc2luY2UgaW1hZ2VkYXRhIGFuZCBIVE1MSW1hZ2VFbGVtZW50IHVzZXMgaXRcblxuICBjb25zdCBvdXRwdXRmb3JtYXQgPVxuICAgICAgb3B0aW9ucy50ZW5zb3JGb3JtYXQgIT09IHVuZGVmaW5lZCA/IChvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy50ZW5zb3JGb3JtYXQgOiAnUkdCJykgOiAnUkdCJztcbiAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gIGNvbnN0IGZsb2F0MzJEYXRhID0gb3V0cHV0Zm9ybWF0ID09PSAnUkdCQScgPyBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDQpIDogbmV3IEZsb2F0MzJBcnJheShzdHJpZGUgKiAzKTtcblxuICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcbiAgbGV0IHN0ZXAgPSA0LCBySW1hZ2VQb2ludGVyID0gMCwgZ0ltYWdlUG9pbnRlciA9IDEsIGJJbWFnZVBvaW50ZXIgPSAyLCBhSW1hZ2VQb2ludGVyID0gMztcbiAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCwgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMiwgYVRlbnNvclBvaW50ZXIgPSAtMTtcblxuICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XG4gIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQicpIHtcbiAgICBzdGVwID0gMztcbiAgICBySW1hZ2VQb2ludGVyID0gMDtcbiAgICBnSW1hZ2VQb2ludGVyID0gMTtcbiAgICBiSW1hZ2VQb2ludGVyID0gMjtcbiAgICBhSW1hZ2VQb2ludGVyID0gLTE7XG4gIH1cblxuICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgb3V0cHV0IHRlbnNvciBmb3JtYXRcbiAgaWYgKG91dHB1dGZvcm1hdCA9PT0gJ1JHQkEnKSB7XG4gICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xuICB9IGVsc2UgaWYgKG91dHB1dGZvcm1hdCA9PT0gJ1JCRycpIHtcbiAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICB9IGVsc2UgaWYgKG91dHB1dGZvcm1hdCA9PT0gJ0JHUicpIHtcbiAgICBiVGVuc29yUG9pbnRlciA9IDA7XG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgclRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpZGU7XG4gICAgICAgaSsrLCBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXApIHtcbiAgICBmbG9hdDMyRGF0YVtyVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbckltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1swXSkgLyBub3JtTWVhblswXTtcbiAgICBmbG9hdDMyRGF0YVtnVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbZ0ltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1sxXSkgLyBub3JtTWVhblsxXTtcbiAgICBmbG9hdDMyRGF0YVtiVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbYkltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1syXSkgLyBub3JtTWVhblsyXTtcbiAgICBpZiAoYVRlbnNvclBvaW50ZXIgIT09IC0xICYmIGFJbWFnZVBvaW50ZXIgIT09IC0xKSB7XG4gICAgICBmbG9hdDMyRGF0YVthVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbYUltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1szXSkgLyBub3JtTWVhblszXTtcbiAgICB9XG4gIH1cblxuICAvLyBGbG9hdDMyQXJyYXkgLT4gb3J0LlRlbnNvclxuICBjb25zdCBvdXRwdXRUZW5zb3IgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBUZW5zb3IoJ2Zsb2F0MzInLCBmbG9hdDMyRGF0YSwgWzEsIDQsIGhlaWdodCwgd2lkdGhdKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgMywgaGVpZ2h0LCB3aWR0aF0pO1xuICByZXR1cm4gb3V0cHV0VGVuc29yO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUltYWdlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tSW1hZ2UgPSBhc3luYyhcbiAgICBpbWFnZTogSW1hZ2VEYXRhfEhUTUxJbWFnZUVsZW1lbnR8SW1hZ2VCaXRtYXB8c3RyaW5nLFxuICAgIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9uc3xUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9uc3xUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zfFxuICAgIFRlbnNvckZyb21VcmxPcHRpb25zKTogUHJvbWlzZTxUZW5zb3I+ID0+IHtcbiAgLy8gY2hlY2tpbmcgdGhlIHR5cGUgb2YgaW1hZ2Ugb2JqZWN0XG4gIGNvbnN0IGlzSFRNTEltYWdlRWxlID0gdHlwZW9mIChIVE1MSW1hZ2VFbGVtZW50KSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50O1xuICBjb25zdCBpc0ltYWdlRGF0YUVsZSA9IHR5cGVvZiAoSW1hZ2VEYXRhKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGE7XG4gIGNvbnN0IGlzSW1hZ2VCaXRtYXAgPSB0eXBlb2YgKEltYWdlQml0bWFwKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZUJpdG1hcDtcbiAgY29uc3QgaXNTdHJpbmcgPSB0eXBlb2YgaW1hZ2UgPT09ICdzdHJpbmcnO1xuXG4gIGxldCBkYXRhOiBVaW50OENsYW1wZWRBcnJheXx1bmRlZmluZWQ7XG4gIGxldCBidWZmZXJUb1RlbnNvck9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnMgPz8ge307XG5cbiAgLy8gZmlsbGluZyBhbmQgY2hlY2tpbmcgaW1hZ2UgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gIGlmIChpc0hUTUxJbWFnZUVsZSkge1xuICAgIC8vIEhUTUxJbWFnZUVsZW1lbnQgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgaXMgUkdCQSBieSBkZWZhdWx0XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgICAgbGV0IGhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgIGxldCB3aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRIZWlnaHQgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGhlaWdodCA9IG9wdGlvbnMucmVzaXplZEhlaWdodDtcbiAgICAgICAgd2lkdGggPSBvcHRpb25zLnJlc2l6ZWRXaWR0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICBpZiAob3B0aW9ucy50ZW5zb3JGb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgaW5wdXQgY29uZmlnIGZvcm1hdCBtdXN0IGJlIFJHQkEgZm9yIEhUTUxJbWFnZUVsZW1lbnQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMudGVuc29yRm9ybWF0ID0gJ1JHQkEnO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLnRlbnNvckZvcm1hdCA9ICdSR0JBJztcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG4gICAgICB9XG5cbiAgICAgIHBpeGVsczJEQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xuICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzSW1hZ2VEYXRhRWxlKSB7XG4gICAgbGV0IGhlaWdodDogbnVtYmVyO1xuICAgIGxldCB3aWR0aDogbnVtYmVyO1xuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRXaWR0aCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZEhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZWRIZWlnaHQ7XG4gICAgICB3aWR0aCA9IG9wdGlvbnMucmVzaXplZFdpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICB3aWR0aCA9IGltYWdlLndpZHRoO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5mb3JtYXQgPSAnUkdCQSc7XG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcblxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHRlbXBDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgdGVtcENhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgdGVtcENhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IHRlbXBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5wdXRJbWFnZURhdGEoaW1hZ2UsIDAsIDApO1xuICAgICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBpbWFnZS5kYXRhO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ltYWdlQml0bWFwKSB7XG4gICAgLy8gSW1hZ2VCaXRtYXAgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgbXVzdCBiZSBwcm92aWRlZCBieSB1c2VyXG4gICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBpbWFnZSBjb25maWcgd2l0aCBmb3JtYXQgZm9yIEltYWdlYml0bWFwJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgY29uc3Qgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgIHBpeGVsczJEQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIHJldHVybiBidWZmZXJUb1RlbnNvcihkYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNTdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBpZiAoIWltYWdlIHx8ICFjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiByZWplY3QoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld0ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICBuZXdJbWFnZS5jcm9zc09yaWdpbiA9ICdBbm9ueW1vdXMnO1xuICAgICAgbmV3SW1hZ2Uuc3JjID0gaW1hZ2U7XG4gICAgICBuZXdJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IG5ld0ltYWdlLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gbmV3SW1hZ2UuaGVpZ2h0O1xuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShuZXdJbWFnZSwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY29uc3QgaW1nID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gY2FudmFzLndpZHRoO1xuICAgICAgICByZXNvbHZlKGJ1ZmZlclRvVGVuc29yKGltZy5kYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBkYXRhIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWQgLSBhYm9ydGVkIHRlbnNvciBjcmVhdGlvbicpO1xuICB9XG5cbiAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBidWZmZXJUb1RlbnNvcihkYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgZGF0YSBwcm92aWRlZCBpcyBub3Qgc3VwcG9ydGVkIC0gYWJvcnRlZCB0ZW5zb3IgY3JlYXRpb24nKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbVRleHR1cmUoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21UZXh0dXJlID0gPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZURhdGFUeXBlcz4oXG4gICAgdGV4dHVyZTogVGVuc29ySW50ZXJmYWNlLlRleHR1cmVUeXBlLCBvcHRpb25zOiBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VD4pOiBUZW5zb3IgPT4ge1xuICBjb25zdCB7d2lkdGgsIGhlaWdodCwgZG93bmxvYWQsIGRpc3Bvc2V9ID0gb3B0aW9ucztcbiAgLy8gQWx3YXlzIGFzc3VtZSBSR0JBRjMyLiBUT0RPOiBzdXBwb3J0IGRpZmZlcmVudCB0ZXh0dXJlIGZvcm1hdFxuICBjb25zdCBkaW1zID0gWzEsIGhlaWdodCwgd2lkdGgsIDRdO1xuICByZXR1cm4gbmV3IFRlbnNvcih7bG9jYXRpb246ICd0ZXh0dXJlJywgdHlwZTogJ2Zsb2F0MzInLCB0ZXh0dXJlLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZX0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcigpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbUdwdUJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gICAgZ3B1QnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyVHlwZSwgb3B0aW9uczogVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VD4pOiBUZW5zb3IgPT4ge1xuICBjb25zdCB7ZGF0YVR5cGUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlfSA9IG9wdGlvbnM7XG4gIHJldHVybiBuZXcgVGVuc29yKHtsb2NhdGlvbjogJ2dwdS1idWZmZXInLCB0eXBlOiBkYXRhVHlwZSA/PyAnZmxvYXQzMicsIGdwdUJ1ZmZlciwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2V9KTtcbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21QaW5uZWRCdWZmZXIoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21QaW5uZWRCdWZmZXIgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxuICAgIHR5cGU6IFQsIGJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlTWFwW1RdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3IgPT5cbiAgICBuZXcgVGVuc29yKHtsb2NhdGlvbjogJ2NwdS1waW5uZWQnLCB0eXBlLCBkYXRhOiBidWZmZXIsIGRpbXM6IGRpbXMgPz8gW2J1ZmZlci5sZW5ndGhdfSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPSBGbG9hdDMyQXJyYXlDb25zdHJ1Y3RvcnxVaW50OEFycmF5Q29uc3RydWN0b3J8SW50OEFycmF5Q29uc3RydWN0b3J8XG4gICAgVWludDE2QXJyYXlDb25zdHJ1Y3RvcnxJbnQxNkFycmF5Q29uc3RydWN0b3J8SW50MzJBcnJheUNvbnN0cnVjdG9yfEJpZ0ludDY0QXJyYXlDb25zdHJ1Y3RvcnxVaW50OEFycmF5Q29uc3RydWN0b3J8XG4gICAgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3J8VWludDMyQXJyYXlDb25zdHJ1Y3RvcnxCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yO1xuZXhwb3J0IHR5cGUgU3VwcG9ydGVkVHlwZWRBcnJheSA9IEluc3RhbmNlVHlwZTxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzPjtcblxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQID0gbmV3IE1hcDxzdHJpbmcsIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnM+KFtcbiAgWydmbG9hdDMyJywgRmxvYXQzMkFycmF5XSxcbiAgWyd1aW50OCcsIFVpbnQ4QXJyYXldLFxuICBbJ2ludDgnLCBJbnQ4QXJyYXldLFxuICBbJ3VpbnQxNicsIFVpbnQxNkFycmF5XSxcbiAgWydmbG9hdDE2JywgVWludDE2QXJyYXldLFxuICBbJ2ludDE2JywgSW50MTZBcnJheV0sXG4gIFsnaW50MzInLCBJbnQzMkFycmF5XSxcbiAgWydib29sJywgVWludDhBcnJheV0sXG4gIFsnZmxvYXQ2NCcsIEZsb2F0NjRBcnJheV0sXG4gIFsndWludDMyJywgVWludDMyQXJyYXldLFxuXSk7XG5cbi8vIGEgcnVudGltZSBtYXAgdGhhdCBtYXBzIHR5cGUgc3RyaW5nIHRvIFR5cGVkQXJyYXkgY29uc3RydWN0b3IuIFNob3VsZCBtYXRjaCBUZW5zb3IuRGF0YVR5cGVNYXAuXG5leHBvcnQgY29uc3QgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCA9IG5ldyBNYXA8U3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycywgVGVuc29yLlR5cGU+KFtcbiAgW0Zsb2F0MzJBcnJheSwgJ2Zsb2F0MzInXSxcbiAgW1VpbnQ4QXJyYXksICd1aW50OCddLFxuICBbSW50OEFycmF5LCAnaW50OCddLFxuICBbVWludDE2QXJyYXksICd1aW50MTYnXSxcbiAgW0ludDE2QXJyYXksICdpbnQxNiddLFxuICBbSW50MzJBcnJheSwgJ2ludDMyJ10sXG4gIFtGbG9hdDY0QXJyYXksICdmbG9hdDY0J10sXG4gIFtVaW50MzJBcnJheSwgJ3VpbnQzMiddLFxuXSk7XG5cbi8vIHRoZSBmb2xsb3dpbmcgY29kZSBhbGxvd3MgZGVsYXlpbmcgZXhlY3V0aW9uIG9mIEJpZ0ludCBjaGVja2luZy4gVGhpcyBhbGxvd3MgbGF6eSBpbml0aWFsaXphdGlvbiBmb3Jcbi8vIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgYW5kIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIHdoaWNoIGFsbG93cyBCaWdJbnQgcG9seWZpbGxcbi8vIGlmIGF2YWlsYWJsZS5cbmxldCBpc0JpZ0ludENoZWNrZWQgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBjaGVja0JpZ0ludCA9ICgpID0+IHtcbiAgaWYgKCFpc0JpZ0ludENoZWNrZWQpIHtcbiAgICBpc0JpZ0ludENoZWNrZWQgPSB0cnVlO1xuICAgIGNvbnN0IGlzQmlnSW50NjRBcnJheUF2YWlsYWJsZSA9IHR5cGVvZiBCaWdJbnQ2NEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQmlnSW50NjRBcnJheS5mcm9tID09PSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IGlzQmlnVWludDY0QXJyYXlBdmFpbGFibGUgPVxuICAgICAgICB0eXBlb2YgQmlnVWludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBCaWdVaW50NjRBcnJheS5mcm9tID09PSAnZnVuY3Rpb24nO1xuXG4gICAgaWYgKGlzQmlnSW50NjRBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ2ludDY0JywgQmlnSW50NjRBcnJheSk7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLnNldChCaWdJbnQ2NEFycmF5LCAnaW50NjQnKTtcbiAgICB9XG4gICAgaWYgKGlzQmlnVWludDY0QXJyYXlBdmFpbGFibGUpIHtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuc2V0KCd1aW50NjQnLCBCaWdVaW50NjRBcnJheSk7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLnNldChCaWdVaW50NjRBcnJheSwgJ3VpbnQ2NCcpO1xuICAgIH1cbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMsIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycywgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc30gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnLi90ZW5zb3ItaW1wbC5qcyc7XG5cbi8qKlxuICogY2FsY3VsYXRlIHNpemUgZnJvbSBkaW1zLlxuICpcbiAqIEBwYXJhbSBkaW1zIHRoZSBkaW1zIGFycmF5LiBNYXkgYmUgYW4gaWxsZWdhbCBpbnB1dC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVNpemUgPSAoZGltczogcmVhZG9ubHkgdW5rbm93bltdKTogbnVtYmVyID0+IHtcbiAgbGV0IHNpemUgPSAxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBkaW0gPSBkaW1zW2ldO1xuICAgIGlmICh0eXBlb2YgZGltICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzU2FmZUludGVnZXIoZGltKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgZGltc1ske2l9XSBtdXN0IGJlIGFuIGludGVnZXIsIGdvdDogJHtkaW19YCk7XG4gICAgfVxuICAgIGlmIChkaW0gPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgZGltc1ske2l9XSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIsIGdvdDogJHtkaW19YCk7XG4gICAgfVxuICAgIHNpemUgKj0gZGltO1xuICB9XG4gIHJldHVybiBzaXplO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IucmVzaGFwZSgpXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JSZXNoYXBlID0gKHRlbnNvcjogVGVuc29yLCBkaW1zOiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvciA9PiB7XG4gIHN3aXRjaCAodGVuc29yLmxvY2F0aW9uKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHRlbnNvci50eXBlLCB0ZW5zb3IuZGF0YSwgZGltcyk7XG4gICAgY2FzZSAnY3B1LXBpbm5lZCc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAnY3B1LXBpbm5lZCcsXG4gICAgICAgIGRhdGE6IHRlbnNvci5kYXRhIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1snZGF0YSddLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGNhc2UgJ3RleHR1cmUnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3Ioe1xuICAgICAgICBsb2NhdGlvbjogJ3RleHR1cmUnLFxuICAgICAgICB0ZXh0dXJlOiB0ZW5zb3IudGV4dHVyZSxcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAnZ3B1LWJ1ZmZlcicsXG4gICAgICAgIGdwdUJ1ZmZlcjogdGVuc29yLmdwdUJ1ZmZlcixcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXG4gICAgICAgIGRpbXMsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0ZW5zb3JSZXNoYXBlOiB0ZW5zb3IgbG9jYXRpb24gJHt0ZW5zb3IubG9jYXRpb259IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHt0ZW5zb3JUb0RhdGFVUkwsIHRlbnNvclRvSW1hZ2VEYXRhfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLWltcGwuanMnO1xuaW1wb3J0IHtUZW5zb3JUb0RhdGFVcmxPcHRpb25zLCBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnN9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xuaW1wb3J0IHt0ZW5zb3JGcm9tR3B1QnVmZmVyLCB0ZW5zb3JGcm9tSW1hZ2UsIHRlbnNvckZyb21QaW5uZWRCdWZmZXIsIHRlbnNvckZyb21UZXh0dXJlfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LWltcGwuanMnO1xuaW1wb3J0IHtDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMsIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycywgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnMsIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucywgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zLCBUZW5zb3JGcm9tVXJsT3B0aW9ucywgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc30gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQge2NoZWNrQmlnSW50LCBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLCBTdXBwb3J0ZWRUeXBlZEFycmF5LCBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzfSBmcm9tICcuL3RlbnNvci1pbXBsLXR5cGUtbWFwcGluZy5qcyc7XG5pbXBvcnQge2NhbGN1bGF0ZVNpemUsIHRlbnNvclJlc2hhcGV9IGZyb20gJy4vdGVuc29yLXV0aWxzLWltcGwuanMnO1xuaW1wb3J0IHtUZW5zb3IgYXMgVGVuc29ySW50ZXJmYWNlfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbi8vIHR5cGUgYWxpYXNlcyBmb3IgdGhvc2UgZXhwb3J0ZWQgZnJvbSBUZW5zb3IgaW50ZXJmYWNlXG5cbnR5cGUgVGVuc29yVHlwZSA9IFRlbnNvckludGVyZmFjZS5UeXBlO1xudHlwZSBUZW5zb3JEYXRhVHlwZSA9IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZTtcbnR5cGUgVGVuc29yRGF0YUxvY2F0aW9uID0gVGVuc29ySW50ZXJmYWNlLkRhdGFMb2NhdGlvbjtcbnR5cGUgVGVuc29yVGV4dHVyZVR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGU7XG50eXBlIFRlbnNvckdwdUJ1ZmZlclR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyVHlwZTtcblxuLyoqXG4gKiB0aGUgaW1wbGVtZW50YXRpb24gb2YgVGVuc29yIGludGVyZmFjZS5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBUZW5zb3IgaW1wbGVtZW50cyBUZW5zb3JJbnRlcmZhY2Uge1xuICAvLyAjcmVnaW9uIGNvbnN0cnVjdG9yc1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgQ1BVIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgdHlwZTogVGVuc29yVHlwZSwgZGF0YTogVGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgYm9vbGVhbltdLFxuICAgICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLiBUeXBlIGlzIGluZmVycmVkIGZyb20gZGF0YS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFRlbnNvckRhdGFUeXBlfHJlYWRvbmx5IHN0cmluZ1tdfHJlYWRvbmx5IGJvb2xlYW5bXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIHBpbm5lZCBDUFUgZGF0YSB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnY3B1LXBpbm5lZCcuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgV2ViR0wgdGV4dHVyZSB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAndGV4dHVyZScuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIFdlYkdQVSBidWZmZXIgd2l0aCB0aGUgZ2l2ZW4gdHlwZSBhbmQgZGltcy5cbiAgICpcbiAgICogVGVuc29yJ3MgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ2dwdS1idWZmZXInLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcblxuICAvKipcbiAgICogaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIGFyZzA6IFRlbnNvclR5cGV8VGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYm9vbGVhbltdfENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc3xcbiAgICAgIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnN8R3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICAgICAgYXJnMT86IFRlbnNvckRhdGFUeXBlfHJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IHN0cmluZ1tdfHJlYWRvbmx5IGJvb2xlYW5bXSwgYXJnMj86IHJlYWRvbmx5IG51bWJlcltdKSB7XG4gICAgLy8gcGVyZm9ybSBvbmUtdGltZSBjaGVjayBmb3IgQmlnSW50IHN1cHBvcnRcbiAgICBjaGVja0JpZ0ludCgpO1xuXG4gICAgbGV0IHR5cGU6IFRlbnNvclR5cGU7XG4gICAgbGV0IGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xuXG4gICAgaWYgKHR5cGVvZiBhcmcwID09PSAnb2JqZWN0JyAmJiAnbG9jYXRpb24nIGluIGFyZzApIHtcbiAgICAgIC8vXG4gICAgICAvLyBjb25zdHJ1Y3RpbmcgdGVuc29yIGZyb20gc3BlY2lmaWMgbG9jYXRpb25cbiAgICAgIC8vXG4gICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9IGFyZzAubG9jYXRpb247XG4gICAgICB0eXBlID0gYXJnMC50eXBlO1xuICAgICAgZGltcyA9IGFyZzAuZGltcztcbiAgICAgIHN3aXRjaCAoYXJnMC5sb2NhdGlvbikge1xuICAgICAgICBjYXNlICdjcHUtcGlubmVkJzoge1xuICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5nZXQodHlwZSk7XG4gICAgICAgICAgaWYgKCFleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gcGlubmVkIGJ1ZmZlcmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIShhcmcwLmRhdGEgaW5zdGFuY2VvZiBleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGJ1ZmZlciBzaG91bGQgYmUgb2YgdHlwZSAke2V4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yLm5hbWV9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY3B1RGF0YSA9IGFyZzAuZGF0YTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd0ZXh0dXJlJzoge1xuICAgICAgICAgIGlmICh0eXBlICE9PSAnZmxvYXQzMicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIHRleHR1cmVgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ncHVUZXh0dXJlRGF0YSA9IGFyZzAudGV4dHVyZTtcbiAgICAgICAgICB0aGlzLmRvd25sb2FkZXIgPSBhcmcwLmRvd25sb2FkO1xuICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSBhcmcwLmRpc3Bvc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnZ3B1LWJ1ZmZlcic6IHtcbiAgICAgICAgICBpZiAoKHR5cGUgIT09ICdmbG9hdDMyJyAmJiB0eXBlICE9PSAnZmxvYXQxNicgJiYgdHlwZSAhPT0gJ2ludDMyJyAmJiB0eXBlICE9PSAnaW50NjQnICYmIHR5cGUgIT09ICd1aW50MzInICYmXG4gICAgICAgICAgICAgICB0eXBlICE9PSAnYm9vbCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBncHUgYnVmZmVyYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IGFyZzAuZ3B1QnVmZmVyO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XG4gICAgICAgICAgdGhpcy5kaXNwb3NlciA9IGFyZzAuZGlzcG9zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yIGNvbnN0cnVjdG9yOiB1bnN1cHBvcnRlZCBsb2NhdGlvbiAnJHt0aGlzLmRhdGFMb2NhdGlvbn0nYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vXG4gICAgICAvLyBjb25zdHJ1Y3RpbmcgdGVuc29yIG9mIGxvY2F0aW9uICdjcHUnXG4gICAgICAvL1xuICAgICAgbGV0IGRhdGE6IFRlbnNvckRhdGFUeXBlO1xuICAgICAgbGV0IG1heWJlRGltczogdHlwZW9mIGFyZzF8dHlwZW9mIGFyZzI7XG4gICAgICAvLyBjaGVjayB3aGV0aGVyIGFyZzAgaXMgdHlwZSBvciBkYXRhXG4gICAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIE92ZXJyaWRlOiBjb25zdHJ1Y3Rvcih0eXBlLCBkYXRhLCAuLi4pXG4gICAgICAgIC8vXG4gICAgICAgIHR5cGUgPSBhcmcwO1xuICAgICAgICBtYXliZURpbXMgPSBhcmcyO1xuICAgICAgICBpZiAoYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHN0cmluZyB0ZW5zb3JcXCdzIGRhdGEgbXVzdCBiZSBhIHN0cmluZyBhcnJheS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2UgZG9uJ3QgY2hlY2sgd2hldGhlciBldmVyeSBlbGVtZW50IGluIHRoZSBhcnJheSBpcyBzdHJpbmc7IHRoaXMgaXMgdG9vIHNsb3cuIHdlIGFzc3VtZSBpdCdzIGNvcnJlY3QgYW5kXG4gICAgICAgICAgLy8gZXJyb3Igd2lsbCBiZSBwb3B1bGF0ZWQgYXQgaW5mZXJlbmNlXG4gICAgICAgICAgZGF0YSA9IGFyZzE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbnVtZXJpYyB0ZW5zb3JcbiAgICAgICAgICBjb25zdCB0eXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldChhcmcwKTtcbiAgICAgICAgICBpZiAodHlwZWRBcnJheUNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuc3VwcG9ydGVkIHRlbnNvciB0eXBlOiAke2FyZzB9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICAgICAgaWYgKGFyZzAgPT09ICdmbG9hdDE2Jykge1xuICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBoZXJlIGJlY2F1c2Ugd2hlbiB1c2VyIHRyeSB0byB1c2UgbnVtYmVyIGFycmF5IGFzIGRhdGEsXG4gICAgICAgICAgICAgIC8vIGUuZy4gbmV3IFRlbnNvcignZmxvYXQxNicsIFsxLCAyLCAzLCA0XSwgZGltcykpLCBpdCB3aWxsIGFjdHVhbGx5IGNhbGxcbiAgICAgICAgICAgICAgLy8gVWludDE2QXJyYXkuZnJvbShhcmcxKSB3aGljaCBnZW5lcmF0ZXMgd3JvbmcgZGF0YS5cbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgICAgICdDcmVhdGluZyBhIGZsb2F0MTYgdGVuc29yIGZyb20gbnVtYmVyIGFycmF5IGlzIG5vdCBzdXBwb3J0ZWQuIFBsZWFzZSB1c2UgVWludDE2QXJyYXkgYXMgZGF0YS4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMCA9PT0gJ3VpbnQ2NCcgfHwgYXJnMCA9PT0gJ2ludDY0Jykge1xuICAgICAgICAgICAgICAvLyB1c2UgJ2FzIGFueScgaGVyZSBiZWNhdXNlOlxuICAgICAgICAgICAgICAvLyAxLiBUeXBlU2NyaXB0J3MgY2hlY2sgb24gdHlwZSBvZiAnQXJyYXkuaXNBcnJheSgpJyBkb2VzIG5vdCB3b3JrIHdpdGggcmVhZG9ubHkgYXJyYXlzLlxuICAgICAgICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xNzAwMlxuICAgICAgICAgICAgICAvLyAyLiBUeXBlU2NyaXB0J3MgY2hlY2sgb24gdW5pb24gdHlwZSBvZiAnKEJpZ0ludDY0QXJyYXlDb25zdHJ1Y3RvcnxCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yKS5mcm9tKCknXG4gICAgICAgICAgICAgIC8vIGRvZXMgbm90IGFjY2VwdCBwYXJhbWV0ZXIgbWFwRm4uXG4gICAgICAgICAgICAgIC8vIDMuIHBhcmFtZXRlcnMgb2YgJ1N1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMuZnJvbSgpJyBkb2VzIG5vdCBtYXRjaCB0aGUgcmVxdWlyZW1lbnQgb2YgdGhlIHVuaW9uXG4gICAgICAgICAgICAgIC8vIHR5cGUuXG5cbiAgICAgICAgICAgICAgLy8gYXNzdW1lICdhcmcxJyBpcyBvZiB0eXBlIFwicmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgYmlnaW50W11cIiBoZXJlLlxuXG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgIGRhdGEgPSAodHlwZWRBcnJheUNvbnN0cnVjdG9yIGFzIGFueSkuZnJvbShhcmcxLCBCaWdJbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gYXNzdW1lICdhcmcxJyBpcyBvZiB0eXBlIFwicmVhZG9ubHkgbnVtYmVyW11cIiBoZXJlLlxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICBkYXRhID0gKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciBhcyBhbnkpLmZyb20oYXJnMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcxIGluc3RhbmNlb2YgdHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICBkYXRhID0gYXJnMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQSAke3R5cGV9IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mICR7dHlwZWRBcnJheUNvbnN0cnVjdG9yfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gT3ZlcnJpZGU6IGNvbnN0cnVjdG9yKGRhdGEsIC4uLilcbiAgICAgICAgLy9cbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMCkpIHtcbiAgICAgICAgICAvLyBvbmx5IGJvb2xlYW5bXSBhbmQgc3RyaW5nW10gaXMgc3VwcG9ydGVkXG4gICAgICAgICAgaWYgKGFyZzAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUZW5zb3IgdHlwZSBjYW5ub3QgYmUgaW5mZXJyZWQgZnJvbSBhbiBlbXB0eSBhcnJheS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZmlyc3RFbGVtZW50VHlwZSA9IHR5cGVvZiBhcmcwWzBdO1xuICAgICAgICAgIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdHlwZSA9ICdzdHJpbmcnO1xuICAgICAgICAgICAgZGF0YSA9IGFyZzA7XG4gICAgICAgICAgfSBlbHNlIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnYm9vbCc7XG4gICAgICAgICAgICAvLyAnYXJnMCcgaXMgb2YgdHlwZSAnYm9vbGVhbltdJy4gVWludDhBcnJheS5mcm9tKGJvb2xlYW5bXSkgYWN0dWFsbHkgd29ya3MsIGJ1dCB0eXBlc2NyaXB0IHRoaW5rcyB0aGlzIGlzXG4gICAgICAgICAgICAvLyB3cm9uZyB0eXBlLiBXZSB1c2UgJ2FzIGFueScgdG8gbWFrZSBpdCBoYXBweS5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzAgYXMgYW55W10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGVsZW1lbnQgdHlwZSBvZiBkYXRhIGFycmF5OiAke2ZpcnN0RWxlbWVudFR5cGV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBnZXQgdGVuc29yIHR5cGUgZnJvbSBUeXBlZEFycmF5XG4gICAgICAgICAgY29uc3QgbWFwcGVkVHlwZSA9XG4gICAgICAgICAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuZ2V0KGFyZzAuY29uc3RydWN0b3IgYXMgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyk7XG4gICAgICAgICAgaWYgKG1hcHBlZFR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5zdXBwb3J0ZWQgdHlwZSBmb3IgdGVuc29yIGRhdGE6ICR7YXJnMC5jb25zdHJ1Y3Rvcn0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHR5cGUgPSBtYXBwZWRUeXBlO1xuICAgICAgICAgIGRhdGEgPSBhcmcwIGFzIFN1cHBvcnRlZFR5cGVkQXJyYXk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdHlwZSBhbmQgZGF0YSBpcyBwcm9jZXNzZWQsIG5vdyBwcm9jZXNzaW5nIGRpbXNcbiAgICAgIGlmIChtYXliZURpbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBhc3N1bWUgMS1EIHRlbnNvciBpZiBkaW1zIG9taXR0ZWRcbiAgICAgICAgbWF5YmVEaW1zID0gW2RhdGEubGVuZ3RoXTtcbiAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWF5YmVEaW1zKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHRlbnNvclxcJ3MgZGltcyBtdXN0IGJlIGEgbnVtYmVyIGFycmF5Jyk7XG4gICAgICB9XG4gICAgICBkaW1zID0gbWF5YmVEaW1zIGFzIHJlYWRvbmx5IG51bWJlcltdO1xuXG4gICAgICB0aGlzLmNwdURhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnY3B1JztcbiAgICB9XG5cbiAgICAvLyBwZXJmb3JtIGNoZWNrIG9uIGRpbXNcbiAgICBjb25zdCBzaXplID0gY2FsY3VsYXRlU2l6ZShkaW1zKTtcbiAgICAvLyBpZiBkYXRhIGlzIG9uIENQVSwgY2hlY2sgd2hldGhlciBkYXRhIGxlbmd0aCBtYXRjaGVzIHRlbnNvciBzaXplXG4gICAgaWYgKHRoaXMuY3B1RGF0YSAmJiBzaXplICE9PSB0aGlzLmNwdURhdGEubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbnNvcidzIHNpemUoJHtzaXplfSkgZG9lcyBub3QgbWF0Y2ggZGF0YSBsZW5ndGgoJHt0aGlzLmNwdURhdGEubGVuZ3RofSkuYCk7XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmRpbXMgPSBkaW1zO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gZmFjdG9yeVxuICBzdGF0aWMgYXN5bmMgZnJvbUltYWdlKFxuICAgICAgaW1hZ2U6IEltYWdlRGF0YXxIVE1MSW1hZ2VFbGVtZW50fEltYWdlQml0bWFwfHN0cmluZyxcbiAgICAgIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9uc3xUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9uc3xUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zfFxuICAgICAgVGVuc29yRnJvbVVybE9wdGlvbnMpOiBQcm9taXNlPFRlbnNvckludGVyZmFjZT4ge1xuICAgIHJldHVybiB0ZW5zb3JGcm9tSW1hZ2UoaW1hZ2UsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21UZXh0dXJlPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZURhdGFUeXBlcz4oXG4gICAgICB0ZXh0dXJlOiBUZW5zb3JUZXh0dXJlVHlwZSwgb3B0aW9uczogVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQ+KTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbVRleHR1cmUodGV4dHVyZSwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUdwdUJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gICAgICBncHVCdWZmZXI6IFRlbnNvckdwdUJ1ZmZlclR5cGUsIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+KTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbUdwdUJ1ZmZlcihncHVCdWZmZXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21QaW5uZWRCdWZmZXI8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxuICAgICAgdHlwZTogVCwgYnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuRGF0YVR5cGVNYXBbVF0sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvciB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21QaW5uZWRCdWZmZXIodHlwZSwgYnVmZmVyLCBkaW1zKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGNvbnZlcnNpb25zXG4gIHRvRGF0YVVSTChvcHRpb25zPzogVGVuc29yVG9EYXRhVXJsT3B0aW9ucyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRlbnNvclRvRGF0YVVSTCh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHRvSW1hZ2VEYXRhKG9wdGlvbnM/OiBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMpOiBJbWFnZURhdGEge1xuICAgIHJldHVybiB0ZW5zb3JUb0ltYWdlRGF0YSh0aGlzLCBvcHRpb25zKTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwdWJsaWMgZmllbGRzXG4gIHJlYWRvbmx5IGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xuICByZWFkb25seSB0eXBlOiBUZW5zb3JUeXBlO1xuICByZWFkb25seSBzaXplOiBudW1iZXI7XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHByaXZhdGUgZmllbGRzXG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXG4gICAqL1xuICBwcml2YXRlIGRhdGFMb2NhdGlvbjogVGVuc29yRGF0YUxvY2F0aW9uO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIGRhdGEgb24gQ1BVLCBpZiBsb2NhdGlvbiBpcyAnY3B1JyBvciAnY3B1LXBpbm5lZCcuIG90aGVyd2lzZSBlbXB0eS5cbiAgICovXG4gIHByaXZhdGUgY3B1RGF0YT86IFRlbnNvckRhdGFUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgdGV4dHVyZSB3aGVuIGxvY2F0aW9uIGlzICd0ZXh0dXJlJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBncHVUZXh0dXJlRGF0YT86IFRlbnNvclRleHR1cmVUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgR1BVIGJ1ZmZlciB3aGVuIGxvY2F0aW9uIGlzICdncHUtYnVmZmVyJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBncHVCdWZmZXJEYXRhPzogVGVuc29yR3B1QnVmZmVyVHlwZTtcblxuICAvKipcbiAgICogc3RvcmVzIGFuIG9wdGlvbmFsIGRvd25sb2FkZXIgZnVuY3Rpb24gdG8gZG93bmxvYWQgZGF0YSBmcm9tIEdQVSB0byBDUFUuXG4gICAqL1xuICBwcml2YXRlIGRvd25sb2FkZXI/KCk6IFByb21pc2U8VGVuc29yRGF0YVR5cGU+O1xuXG4gIC8qKlxuICAgKiBhIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBkYXRhIGlzIGJlaW5nIGRvd25sb2FkZWQgZnJvbSBHUFUgdG8gQ1BVLlxuICAgKi9cbiAgcHJpdmF0ZSBpc0Rvd25sb2FkaW5nPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogc3RvcmVzIGFuIG9wdGlvbmFsIGRpc3Bvc2VyIGZ1bmN0aW9uIHRvIGRpc3Bvc2UgdGhlIHVuZGVybHlpbmcgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgZGlzcG9zZXI/KCk6IHZvaWQ7XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHByb3BlcnRpZXNcbiAgZ2V0IGRhdGEoKTogVGVuc29yRGF0YVR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuY3B1RGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdUaGUgZGF0YSBpcyBub3Qgb24gQ1BVLiBVc2UgYGdldERhdGEoKWAgdG8gZG93bmxvYWQgR1BVIGRhdGEgdG8gQ1BVLCAnICtcbiAgICAgICAgICAnb3IgdXNlIGB0ZXh0dXJlYCBvciBgZ3B1QnVmZmVyYCBwcm9wZXJ0eSB0byBhY2Nlc3MgdGhlIEdQVSBkYXRhIGRpcmVjdGx5LicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jcHVEYXRhO1xuICB9XG5cbiAgZ2V0IGxvY2F0aW9uKCk6IFRlbnNvckRhdGFMb2NhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YUxvY2F0aW9uO1xuICB9XG5cbiAgZ2V0IHRleHR1cmUoKTogVGVuc29yVGV4dHVyZVR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuZ3B1VGV4dHVyZURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgaXMgbm90IHN0b3JlZCBhcyBhIFdlYkdMIHRleHR1cmUuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdwdVRleHR1cmVEYXRhO1xuICB9XG5cbiAgZ2V0IGdwdUJ1ZmZlcigpOiBUZW5zb3JHcHVCdWZmZXJUeXBlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKCF0aGlzLmdwdUJ1ZmZlckRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgaXMgbm90IHN0b3JlZCBhcyBhIFdlYkdQVSBidWZmZXIuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdwdUJ1ZmZlckRhdGE7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0aG9kc1xuXG4gIGFzeW5jIGdldERhdGEocmVsZWFzZURhdGE/OiBib29sZWFuKTogUHJvbWlzZTxUZW5zb3JEYXRhVHlwZT4ge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBzd2l0Y2ggKHRoaXMuZGF0YUxvY2F0aW9uKSB7XG4gICAgICBjYXNlICdjcHUnOlxuICAgICAgY2FzZSAnY3B1LXBpbm5lZCc6XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XG4gICAgICAgIGlmICghdGhpcy5kb3dubG9hZGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgbm90IGNyZWF0ZWQgd2l0aCBhIHNwZWNpZmllZCBkYXRhIGRvd25sb2FkZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNEb3dubG9hZGluZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmRvd25sb2FkZXIoKTtcbiAgICAgICAgICB0aGlzLmRvd25sb2FkZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnY3B1JztcbiAgICAgICAgICB0aGlzLmNwdURhdGEgPSBkYXRhO1xuXG4gICAgICAgICAgaWYgKHJlbGVhc2VEYXRhICYmIHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZ2V0IGRhdGEgZnJvbSBsb2NhdGlvbjogJHt0aGlzLmRhdGFMb2NhdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRG93bmxvYWRpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgIHRoaXMuZGlzcG9zZXIoKTtcbiAgICAgIHRoaXMuZGlzcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuY3B1RGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRvd25sb2FkZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnbm9uZSc7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB0ZW5zb3IgdXRpbGl0aWVzXG4gIHByaXZhdGUgZW5zdXJlVmFsaWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YUxvY2F0aW9uID09PSAnbm9uZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRlbnNvciBpcyBkaXNwb3NlZC4nKTtcbiAgICB9XG4gIH1cblxuICByZXNoYXBlKGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKHRoaXMuZG93bmxvYWRlciB8fCB0aGlzLmRpc3Bvc2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZXNoYXBlIGEgdGVuc29yIHRoYXQgb3ducyBHUFUgcmVzb3VyY2UuJyk7XG4gICAgfVxuICAgIHJldHVybiB0ZW5zb3JSZXNoYXBlKHRoaXMsIGRpbXMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3JGYWN0b3J5fSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7VGVuc29yIGFzIFRlbnNvckltcGx9IGZyb20gJy4vdGVuc29yLWltcGwuanMnO1xuaW1wb3J0IHtUeXBlZFRlbnNvclV0aWxzfSBmcm9tICcuL3RlbnNvci11dGlscy5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuLyoqXG4gKiByZXByZXNlbnQgYSBiYXNpYyB0ZW5zb3Igd2l0aCBzcGVjaWZpZWQgZGltZW5zaW9ucyBhbmQgZGF0YSB0eXBlLlxuICovXG5pbnRlcmZhY2UgVHlwZWRUZW5zb3JCYXNlPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xuICAvKipcbiAgICogR2V0IHRoZSBkaW1lbnNpb25zIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSB0eXBlOiBUO1xuICAvKipcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gQ1BVIChlZy4gaXQncyBpbiB0aGUgZm9ybSBvZiBXZWJHTCB0ZXh0dXJlIG9yIFdlYkdQVSBidWZmZXIpLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbjtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR0wgdGV4dHVyZSB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHTCB0ZXh0dXJlLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR1BVIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHUFUgYnVmZmVyLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGdwdUJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGU7XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYnVmZmVyIGRhdGEgb2YgdGhlIHRlbnNvci5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgb24gQ1BVLCByZXR1cm5zIHRoZSBkYXRhIGltbWVkaWF0ZWx5LlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBHUFUsIGRvd25sb2FkcyB0aGUgZGF0YSBhbmQgcmV0dXJucyB0aGUgcHJvbWlzZS5cbiAgICpcbiAgICogQHBhcmFtIHJlbGVhc2VEYXRhIC0gd2hldGhlciByZWxlYXNlIHRoZSBkYXRhIG9uIEdQVS4gSWdub3JlIGlmIGRhdGEgaXMgYWxyZWFkeSBvbiBDUFUuXG4gICAqL1xuICBnZXREYXRhKHJlbGVhc2VEYXRhPzogYm9vbGVhbik6IFByb21pc2U8VGVuc29yLkRhdGFUeXBlTWFwW1RdPjtcblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgdGVuc29yIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIENQVSwgcmVtb3ZlIGl0cyBpbnRlcm5hbCByZWZlcmVuY2UgdG8gdGhlIHVuZGVybHlpbmcgZGF0YS5cbiAgICogSWYgdGhlIGRhdGEgaXMgb24gR1BVLCByZWxlYXNlIHRoZSBkYXRhIG9uIEdQVS5cbiAgICpcbiAgICogQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCB0aGUgdGVuc29yIGlzIGNvbnNpZGVyZWQgbm8gbG9uZ2VyIHZhbGlkLiBJdHMgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ25vbmUnLlxuICAgKi9cbiAgZGlzcG9zZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgVGVuc29yIHtcbiAgaW50ZXJmYWNlIERhdGFUeXBlTWFwIHtcbiAgICBmbG9hdDMyOiBGbG9hdDMyQXJyYXk7XG4gICAgdWludDg6IFVpbnQ4QXJyYXk7XG4gICAgaW50ODogSW50OEFycmF5O1xuICAgIHVpbnQxNjogVWludDE2QXJyYXk7XG4gICAgaW50MTY6IEludDE2QXJyYXk7XG4gICAgaW50MzI6IEludDMyQXJyYXk7XG4gICAgaW50NjQ6IEJpZ0ludDY0QXJyYXk7XG4gICAgc3RyaW5nOiBzdHJpbmdbXTtcbiAgICBib29sOiBVaW50OEFycmF5O1xuICAgIGZsb2F0MTY6IFVpbnQxNkFycmF5OyAgLy8gS2VlcCB1c2luZyBVaW50MTZBcnJheSB1bnRpbCB3ZSBoYXZlIGEgY29uY3JldGUgc29sdXRpb24gZm9yIGZsb2F0IDE2LlxuICAgIGZsb2F0NjQ6IEZsb2F0NjRBcnJheTtcbiAgICB1aW50MzI6IFVpbnQzMkFycmF5O1xuICAgIHVpbnQ2NDogQmlnVWludDY0QXJyYXk7XG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XG4gIH1cblxuICBpbnRlcmZhY2UgRWxlbWVudFR5cGVNYXAge1xuICAgIGZsb2F0MzI6IG51bWJlcjtcbiAgICB1aW50ODogbnVtYmVyO1xuICAgIGludDg6IG51bWJlcjtcbiAgICB1aW50MTY6IG51bWJlcjtcbiAgICBpbnQxNjogbnVtYmVyO1xuICAgIGludDMyOiBudW1iZXI7XG4gICAgaW50NjQ6IGJpZ2ludDtcbiAgICBzdHJpbmc6IHN0cmluZztcbiAgICBib29sOiBib29sZWFuO1xuICAgIGZsb2F0MTY6IG51bWJlcjsgIC8vIEtlZXAgdXNpbmcgVWludDE2QXJyYXkgdW50aWwgd2UgaGF2ZSBhIGNvbmNyZXRlIHNvbHV0aW9uIGZvciBmbG9hdCAxNi5cbiAgICBmbG9hdDY0OiBudW1iZXI7XG4gICAgdWludDMyOiBudW1iZXI7XG4gICAgdWludDY0OiBiaWdpbnQ7XG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XG4gIH1cblxuICB0eXBlIERhdGFUeXBlID0gRGF0YVR5cGVNYXBbVHlwZV07XG4gIHR5cGUgRWxlbWVudFR5cGUgPSBFbGVtZW50VHlwZU1hcFtUeXBlXTtcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgcGlubmVkIENQVSBidWZmZXJcbiAgICovXG4gIGV4cG9ydCB0eXBlIENwdVBpbm5lZERhdGFUeXBlcyA9IEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPjtcblxuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR0wgdGV4dHVyZVxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVGV4dHVyZVR5cGUgPSBXZWJHTFRleHR1cmU7XG5cbiAgLyoqXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcbiAgICovXG4gIGV4cG9ydCB0eXBlIFRleHR1cmVEYXRhVHlwZXMgPSAnZmxvYXQzMic7XG5cbiAgLyoqXG4gICAqIHR5cGUgYWxpYXMgZm9yIFdlYkdQVSBidWZmZXJcbiAgICpcbiAgICogVGhlIHJlYXNvbiB3aHkgd2UgZG9uJ3QgdXNlIHR5cGUgXCJHUFVCdWZmZXJcIiBkZWZpbmVkIGluIHdlYmdwdS5kLnRzIGZyb20gQHdlYmdwdS90eXBlcyBpcyBiZWNhdXNlIFwiQHdlYmdwdS90eXBlc1wiXG4gICAqIHJlcXVpcmVzIFwiQHR5cGVzL2RvbS13ZWJjb2RlY3NcIiBhcyBwZWVyIGRlcGVuZGVuY3kgd2hlbiB1c2luZyBUeXBlU2NyaXB0IDwgdjUuMSBhbmQgaXRzIHZlcnNpb24gbmVlZCB0byBiZSBjaG9zZW5cbiAgICogY2FyZWZ1bGx5IGFjY29yZGluZyB0byB0aGUgVHlwZVNjcmlwdCB2ZXJzaW9uIGJlaW5nIHVzZWQuIFRoaXMgbWVhbnMgc28gZmFyIHRoZXJlIGlzIG5vdCBhIHdheSB0byBrZWVwIGV2ZXJ5XG4gICAqIFR5cGVTY3JpcHQgdmVyc2lvbiBoYXBweS4gSXQgdHVybnMgb3V0IHRoYXQgd2Ugd2lsbCBlYXNpbHkgYnJva2UgdXNlcnMgb24gc29tZSBUeXBlU2NyaXB0IHZlcnNpb24uXG4gICAqXG4gICAqIGZvciBtb3JlIGluZm8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ncHV3ZWIvdHlwZXMvaXNzdWVzLzEyN1xuICAgKi9cbiAgZXhwb3J0IHR5cGUgR3B1QnVmZmVyVHlwZSA9IHtzaXplOiBudW1iZXI7IG1hcFN0YXRlOiAndW5tYXBwZWQnIHwgJ3BlbmRpbmcnIHwgJ21hcHBlZCd9O1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXG4gICAqL1xuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJEYXRhVHlwZXMgPSAnZmxvYXQzMid8J2Zsb2F0MTYnfCdpbnQzMid8J2ludDY0J3wndWludDMyJ3wnYm9vbCc7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB3aGVyZSB0aGUgdGVuc29yIGRhdGEgaXMgc3RvcmVkXG4gICAqL1xuICBleHBvcnQgdHlwZSBEYXRhTG9jYXRpb24gPSAnbm9uZSd8J2NwdSd8J2NwdS1waW5uZWQnfCd0ZXh0dXJlJ3wnZ3B1LWJ1ZmZlcic7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB0aGUgZGF0YSB0eXBlIG9mIGEgdGVuc29yXG4gICAqL1xuICBleHBvcnQgdHlwZSBUeXBlID0ga2V5b2YgRGF0YVR5cGVNYXA7XG59XG5cbi8qKlxuICogUmVwcmVzZW50IG11bHRpLWRpbWVuc2lvbmFsIGFycmF5cyB0byBmZWVkIHRvIG9yIGZldGNoIGZyb20gbW9kZWwgaW5mZXJlbmNpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWRUZW5zb3I8VCBleHRlbmRzIFRlbnNvci5UeXBlPiBleHRlbmRzIFR5cGVkVGVuc29yQmFzZTxUPiwgVHlwZWRUZW5zb3JVdGlsczxUPiB7fVxuLyoqXG4gKiBSZXByZXNlbnQgbXVsdGktZGltZW5zaW9uYWwgYXJyYXlzIHRvIGZlZWQgdG8gb3IgZmV0Y2ggZnJvbSBtb2RlbCBpbmZlcmVuY2luZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW5zb3IgZXh0ZW5kcyBUeXBlZFRlbnNvckJhc2U8VGVuc29yLlR5cGU+LCBUeXBlZFRlbnNvclV0aWxzPFRlbnNvci5UeXBlPiB7fVxuXG4vKipcbiAqIHR5cGUgVGVuc29yQ29uc3RydWN0b3IgZGVmaW5lcyB0aGUgY29uc3RydWN0b3JzIG9mICdUZW5zb3InIHRvIGNyZWF0ZSBDUFUgdGVuc29yIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JDb25zdHJ1Y3RvciB7XG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIHNwZWNpZnkgZWxlbWVudCB0eXBlXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgc3RyaW5nIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyh0eXBlOiAnc3RyaW5nJywgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwWydzdHJpbmcnXXxyZWFkb25seSBzdHJpbmdbXSxcbiAgICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdzdHJpbmcnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGJvb2wgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KHR5cGU6ICdib29sJywgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwWydib29sJ118cmVhZG9ubHkgYm9vbGVhbltdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnYm9vbCc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgNjQtYml0IGludGVnZXIgdHlwZWQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3PFQgZXh0ZW5kcyAndWludDY0J3wnaW50NjQnPihcbiAgICAgIHR5cGU6IFQsIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXXxyZWFkb25seSBiaWdpbnRbXXxyZWFkb25seSBudW1iZXJbXSxcbiAgICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgbnVtZXJpYyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXc8VCBleHRlbmRzIEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnfCdib29sJ3wndWludDY0J3wnaW50NjQnPj4oXG4gICAgICB0eXBlOiBULCBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF18cmVhZG9ubHkgbnVtYmVyW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPFQ+O1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gaW5mZXIgZWxlbWVudCB0eXBlc1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgZmxvYXQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBGbG9hdDMyQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdmbG9hdDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IFVpbnQ4QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50OCc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDE2IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IFVpbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBJbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50MTYnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDMyIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEludDMyQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdpbnQzMic+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW50NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogQmlnSW50NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogcmVhZG9ubHkgc3RyaW5nW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdzdHJpbmcnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGJvb2wgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogcmVhZG9ubHkgYm9vbGVhbltdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnYm9vbCc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgZmxvYXQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBGbG9hdDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdmbG9hdDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogVWludDMyQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBCaWdVaW50NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ2NCc+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIENQVSB0ZW5zb3IgLSBmYWxsIGJhY2sgdG8gbm9uLWdlbmVyaWMgdGVuc29yIHR5cGUgZGVjbGFyYXRpb25cblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyh0eXBlOiBUZW5zb3IuVHlwZSwgZGF0YTogVGVuc29yLkRhdGFUeXBlfHJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IHN0cmluZ1tdfHJlYWRvbmx5IGJpZ2ludFtdfHJlYWRvbmx5IGJvb2xlYW5bXSxcbiAgICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvcjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IFRlbnNvci5EYXRhVHlwZSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yO1xuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBUZW5zb3IgPSBUZW5zb3JJbXBsIGFzIChUZW5zb3JDb25zdHJ1Y3RvciAmIFRlbnNvckZhY3RvcnkpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge3Jlc29sdmVCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb25IYW5kbGVyfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9uIGFzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2V9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuaW1wb3J0IHtPbm54VmFsdWV9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG50eXBlIFNlc3Npb25PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5TZXNzaW9uT3B0aW9ucztcbnR5cGUgUnVuT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuUnVuT3B0aW9ucztcbnR5cGUgRmVlZHNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5GZWVkc1R5cGU7XG50eXBlIEZldGNoZXNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5GZXRjaGVzVHlwZTtcbnR5cGUgUmV0dXJuVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuUmV0dXJuVHlwZTtcblxuZXhwb3J0IGNsYXNzIEluZmVyZW5jZVNlc3Npb24gaW1wbGVtZW50cyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihoYW5kbGVyOiBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcikge1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gIH1cbiAgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIGZldGNoZXM6IEZldGNoZXNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIGFzeW5jIHJ1bihmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGV8UnVuT3B0aW9ucywgYXJnMj86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+IHtcbiAgICBjb25zdCBmZXRjaGVzOiB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZXxudWxsfSA9IHt9O1xuICAgIGxldCBvcHRpb25zOiBSdW5PcHRpb25zID0ge307XG4gICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgaWYgKHR5cGVvZiBmZWVkcyAhPT0gJ29iamVjdCcgfHwgZmVlZHMgPT09IG51bGwgfHwgZmVlZHMgaW5zdGFuY2VvZiBUZW5zb3IgfHwgQXJyYXkuaXNBcnJheShmZWVkcykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgJ1xcJ2ZlZWRzXFwnIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgdXNlIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy4nKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGZXRjaGVzRW1wdHkgPSB0cnVlO1xuICAgIC8vIGRldGVybWluZSB3aGljaCBvdmVycmlkZSBpcyBiZWluZyB1c2VkXG4gICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGFyZzEgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5leHBlY3RlZCBhcmd1bWVudFsxXTogY2Fubm90IGJlIG51bGwuJyk7XG4gICAgICB9XG4gICAgICBpZiAoYXJnMSBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIGNhbm5vdCBiZSBhIFRlbnNvcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICBpZiAoYXJnMS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIGNhbm5vdCBiZSBhbiBlbXB0eSBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAvLyBvdXRwdXQgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGFyZzEpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkgb3IgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5vdXRwdXROYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdmZXRjaGVzJyBjb250YWlucyBpbnZhbGlkIG91dHB1dCBuYW1lOiAke25hbWV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRlY2lkZSB3aGV0aGVyIGFyZzEgaXMgZmV0Y2hlcyBvciBvcHRpb25zXG4gICAgICAgIC8vIGlmIGFueSBvdXRwdXQgbmFtZSBpcyBwcmVzZW50IGFuZCBpdHMgdmFsdWUgaXMgdmFsaWQgT25ueFZhbHVlLCB3ZSBjb25zaWRlciBpdCBmZXRjaGVzXG4gICAgICAgIGxldCBpc0ZldGNoZXMgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgYXJnMUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmcxKTtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMub3V0cHV0TmFtZXMpIHtcbiAgICAgICAgICBpZiAoYXJnMUtleXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSAoYXJnMSBhcyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLk51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSlbbmFtZV07XG4gICAgICAgICAgICBpZiAodiA9PT0gbnVsbCB8fCB2IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlcyA9IHRydWU7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZldGNoZXMpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMSBhcyBSdW5PcHRpb25zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IG11c3QgYmUgXFwnZmV0Y2hlc1xcJyBvciBcXCdvcHRpb25zXFwnLicpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dHMgYXJlIGluIGZlZWRcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5pbnB1dE5hbWVzKSB7XG4gICAgICBpZiAodHlwZW9mIGZlZWRzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlucHV0ICcke25hbWV9JyBpcyBtaXNzaW5nIGluICdmZWVkcycuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxuICAgIGlmIChpc0ZldGNoZXNFbXB0eSkge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMub3V0cHV0TmFtZXMpIHtcbiAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMgYXJlIHByZXBhcmVkXG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bihmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IHtbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfSA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3VsdHMpIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHRzLCBrZXkpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNba2V5XTtcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IG5ldyBUZW5zb3IocmVzdWx0LnR5cGUsIHJlc3VsdC5kYXRhLCByZXN1bHQuZGltcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG5cbiAgYXN5bmMgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUocGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg/OiBudW1iZXIsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPjtcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShcbiAgICAgIGFyZzA6IHN0cmluZ3xBcnJheUJ1ZmZlckxpa2V8VWludDhBcnJheSwgYXJnMT86IFNlc3Npb25PcHRpb25zfG51bWJlciwgYXJnMj86IG51bWJlcixcbiAgICAgIGFyZzM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT4ge1xuICAgIC8vIGVpdGhlciBsb2FkIGZyb20gYSBmaWxlIG9yIGJ1ZmZlclxuICAgIGxldCBmaWxlUGF0aE9yVWludDhBcnJheTogc3RyaW5nfFVpbnQ4QXJyYXk7XG4gICAgbGV0IG9wdGlvbnM6IFNlc3Npb25PcHRpb25zID0ge307XG5cbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IGFyZzA7XG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucyA9IGFyZzE7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXJnMCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICAgYXJnMCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8XG4gICAgICAgICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGFyZzAgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcikpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGFyZzA7XG4gICAgICBsZXQgYnl0ZU9mZnNldCA9IDA7XG4gICAgICBsZXQgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGJ5dGVPZmZzZXQgPSBhcmcxO1xuICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVPZmZzZXQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2J5dGVPZmZzZXRcXCcgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBieXRlT2Zmc2V0ID49IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdieXRlT2Zmc2V0JyBpcyBvdXQgb2YgcmFuZ2UgWzAsICR7YnVmZmVyLmJ5dGVMZW5ndGh9KS5gKTtcbiAgICAgICAgfVxuICAgICAgICBieXRlTGVuZ3RoID0gYXJnMC5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldDtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGJ5dGVMZW5ndGggPSBhcmcyO1xuICAgICAgICAgIGlmICghTnVtYmVyLmlzU2FmZUludGVnZXIoYnl0ZUxlbmd0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdieXRlTGVuZ3RoXFwnIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJ5dGVMZW5ndGggPD0gMCB8fCBieXRlT2Zmc2V0ICsgYnl0ZUxlbmd0aCA+IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2J5dGVMZW5ndGgnIGlzIG91dCBvZiByYW5nZSAoMCwgJHtidWZmZXIuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXR9XS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmczID09PSAnb2JqZWN0JyAmJiBhcmczICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gYXJnMztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmczICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnYnl0ZUxlbmd0aFxcJyBtdXN0IGJlIGEgbnVtYmVyLicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgfVxuICAgICAgZmlsZVBhdGhPclVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGFyZ3VtZW50WzBdOiBtdXN0IGJlIFxcJ3BhdGhcXCcgb3IgXFwnYnVmZmVyXFwnLicpO1xuICAgIH1cblxuICAgIC8vIGdldCBiYWNrZW5kIGhpbnRzXG4gICAgY29uc3QgZXBzID0gb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMgfHwgW107XG4gICAgY29uc3QgYmFja2VuZEhpbnRzID0gZXBzLm1hcChpID0+IHR5cGVvZiBpID09PSAnc3RyaW5nJyA/IGkgOiBpLm5hbWUpO1xuICAgIGNvbnN0IGJhY2tlbmQgPSBhd2FpdCByZXNvbHZlQmFja2VuZChiYWNrZW5kSGludHMpO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKGZpbGVQYXRoT3JVaW50OEFycmF5LCBvcHRpb25zKTtcbiAgICByZXR1cm4gbmV3IEluZmVyZW5jZVNlc3Npb24oaGFuZGxlcik7XG4gIH1cblxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZXIuc3RhcnRQcm9maWxpbmcoKTtcbiAgfVxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVyLmVuZFByb2ZpbGluZygpO1xuICB9XG5cbiAgZ2V0IGlucHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuaW5wdXROYW1lcztcbiAgfVxuICBnZXQgb3V0cHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIub3V0cHV0TmFtZXM7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZXI6IEluZmVyZW5jZVNlc3Npb25IYW5kbGVyO1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbkltcGx9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24taW1wbC5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZSwgT25ueFZhbHVlRGF0YUxvY2F0aW9ufSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBpbnB1dC9vdXRwdXQgdHlwZXNcblxuICB0eXBlIE9ubnhWYWx1ZU1hcFR5cGUgPSB7cmVhZG9ubHkgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX07XG4gIHR5cGUgTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlID0ge3JlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsfTtcblxuICAvKipcbiAgICogQSBmZWVkcyAobW9kZWwgaW5wdXRzKSBpcyBhbiBvYmplY3QgdGhhdCB1c2VzIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHR5cGUgRmVlZHNUeXBlID0gT25ueFZhbHVlTWFwVHlwZTtcblxuICAvKipcbiAgICogQSBmZXRjaGVzIChtb2RlbCBvdXRwdXRzKSBjb3VsZCBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZzpcbiAgICpcbiAgICogLSBPbWl0dGVkLiBVc2UgbW9kZWwncyBvdXRwdXQgbmFtZXMgZGVmaW5pdGlvbi5cbiAgICogLSBBbiBhcnJheSBvZiBzdHJpbmcgaW5kaWNhdGluZyB0aGUgb3V0cHV0IG5hbWVzLlxuICAgKiAtIEFuIG9iamVjdCB0aGF0IHVzZSBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIG9yIG51bGwgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqXG4gICAqIEByZW1hcmtcbiAgICogZGlmZmVyZW50IGZyb20gaW5wdXQgYXJndW1lbnQsIGluIG91dHB1dCwgT25ueFZhbHVlIGlzIG9wdGlvbmFsLiBJZiBhbiBPbm54VmFsdWUgaXMgcHJlc2VudCBpdCB3aWxsIGJlXG4gICAqIHVzZWQgYXMgYSBwcmUtYWxsb2NhdGVkIHZhbHVlIGJ5IHRoZSBpbmZlcmVuY2UgZW5naW5lOyBpZiBvbWl0dGVkLCBpbmZlcmVuY2UgZW5naW5lIHdpbGwgYWxsb2NhdGUgYnVmZmVyXG4gICAqIGludGVybmFsbHkuXG4gICAqL1xuICB0eXBlIEZldGNoZXNUeXBlID0gcmVhZG9ubHkgc3RyaW5nW118TnVsbGFibGVPbm54VmFsdWVNYXBUeXBlO1xuXG4gIC8qKlxuICAgKiBBIGluZmVyZW5jaW5nIHJldHVybiB0eXBlIGlzIGFuIG9iamVjdCB0aGF0IHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHR5cGUgUmV0dXJuVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gc2Vzc2lvbiBvcHRpb25zXG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIGNvbmZpZ3VyYXRpb25zIGZvciBzZXNzaW9uIGJlaGF2aW9yLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgZXhlY3V0aW9uIHByb3ZpZGVyIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBBbiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9uIGNhbiBiZSBhIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBuYW1lIG9mIHRoZSBleGVjdXRpb24gcHJvdmlkZXIsXG4gICAgICogb3IgYW4gb2JqZWN0IG9mIGNvcnJlc3BvbmRpbmcgdHlwZS5cbiAgICAgKi9cbiAgICBleGVjdXRpb25Qcm92aWRlcnM/OiByZWFkb25seSBFeGVjdXRpb25Qcm92aWRlckNvbmZpZ1tdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGludHJhIE9QIHRocmVhZHMgbnVtYmVyLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgaW50cmFPcE51bVRocmVhZHM/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50ZXIgT1AgdGhyZWFkcyBudW1iZXIuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICBpbnRlck9wTnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBmcmVlRGltZW5zaW9uT3ZlcnJpZGVzPzoge3JlYWRvbmx5IFtkaW1lbnNpb25OYW1lOiBzdHJpbmddOiBudW1iZXJ9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9wdGltaXphdGlvbiBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBncmFwaE9wdGltaXphdGlvbkxldmVsPzogJ2Rpc2FibGVkJ3wnYmFzaWMnfCdleHRlbmRlZCd8J2FsbCc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBDUFUgbWVtb3J5IGFyZW5hLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGVuYWJsZUNwdU1lbUFyZW5hPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIG1lbW9yeSBwYXR0ZXJuLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGVuYWJsZU1lbVBhdHRlcm4/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogRXhlY3V0aW9uIG1vZGUuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZXhlY3V0aW9uTW9kZT86ICdzZXF1ZW50aWFsJ3wncGFyYWxsZWwnO1xuXG4gICAgLyoqXG4gICAgICogT3B0aW1pemVkIG1vZGVsIGZpbGUgcGF0aC5cbiAgICAgKlxuICAgICAqIElmIHRoaXMgc2V0dGluZyBpcyBzcGVjaWZpZWQsIHRoZSBvcHRpbWl6ZWQgbW9kZWwgd2lsbCBiZSBkdW1wZWQuIEluIGJyb3dzZXIsIGEgYmxvYiB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiB3aXRoIGEgcG9wLXVwIHdpbmRvdy5cbiAgICAgKi9cbiAgICBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogV2V0aGVyIGVuYWJsZSBwcm9maWxpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYSBwbGFjZWhvbGRlciBmb3IgYSBmdXR1cmUgdXNlLlxuICAgICAqL1xuICAgIGVuYWJsZVByb2ZpbGluZz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBGaWxlIHByZWZpeCBmb3IgcHJvZmlsaW5nLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGEgcGxhY2Vob2xkZXIgZm9yIGEgZnV0dXJlIHVzZS5cbiAgICAgKi9cbiAgICBwcm9maWxlRmlsZVByZWZpeD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIExvZyBJRC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dJZD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dTZXZlcml0eUxldmVsPzogMHwxfDJ8M3w0O1xuXG4gICAgLyoqXG4gICAgICogTG9nIHZlcmJvc2l0eSBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKi9cbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgc3RyaW5nIGFzIGEgcHJlZmVycmVkIGRhdGEgbG9jYXRpb24gZm9yIGFsbCBvdXRwdXRzLCBvciBhbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIGFcbiAgICAgKiBwcmVmZXJyZWQgZGF0YSBsb2NhdGlvbiBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSBXZWIgZm9yIFdlYkdMIGFuZCBXZWJHUFUgRVAuXG4gICAgICovXG4gICAgcHJlZmVycmVkT3V0cHV0TG9jYXRpb24/OiBPbm54VmFsdWVEYXRhTG9jYXRpb258e3JlYWRvbmx5IFtvdXRwdXROYW1lOiBzdHJpbmddOiBPbm54VmFsdWVEYXRhTG9jYXRpb259O1xuXG4gICAgLyoqXG4gICAgICogU3RvcmUgY29uZmlndXJhdGlvbnMgZm9yIGEgc2Vzc2lvbi4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Nlc3Npb24vXG4gICAgICogb25ueHJ1bnRpbWVfc2Vzc2lvbl9vcHRpb25zX2NvbmZpZ19rZXlzLmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBganNcbiAgICAgKiBleHRyYToge1xuICAgICAqICAgc2Vzc2lvbjoge1xuICAgICAqICAgICBzZXRfZGVub3JtYWxfYXNfemVybzogXCIxXCIsXG4gICAgICogICAgIGRpc2FibGVfcHJlcGFja2luZzogXCIxXCJcbiAgICAgKiAgIH0sXG4gICAgICogICBvcHRpbWl6YXRpb246IHtcbiAgICAgKiAgICAgZW5hYmxlX2dlbHVfYXBwcm94aW1hdGlvbjogXCIxXCJcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZXh0cmE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgfVxuXG4gIC8vICNyZWdpb24gZXhlY3V0aW9uIHByb3ZpZGVyc1xuXG4gIC8vIEN1cnJlbnRseSwgd2UgaGF2ZSB0aGUgZm9sbG93aW5nIGJhY2tlbmRzIHRvIHN1cHBvcnQgZXhlY3V0aW9uIHByb3ZpZGVyczpcbiAgLy8gQmFja2VuZCBOb2RlLmpzIGJpbmRpbmc6IHN1cHBvcnRzICdjcHUnIGFuZCAnY3VkYScuXG4gIC8vIEJhY2tlbmQgV2ViQXNzZW1ibHk6IHN1cHBvcnRzICdjcHUnLCAnd2FzbScsICd4bm5wYWNrJyBhbmQgJ3dlYm5uJy5cbiAgLy8gQmFja2VuZCBPTk5YLmpzOiBzdXBwb3J0cyAnd2ViZ2wnLlxuICAvLyBCYWNrZW5kIFJlYWN0IE5hdGl2ZTogc3VwcG9ydHMgJ2NwdScsICd4bm5wYWNrJywgJ2NvcmVtbCcgKGlPUyksICdubmFwaScgKEFuZHJvaWQpLlxuICBpbnRlcmZhY2UgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25NYXAge1xuICAgIGNwdTogQ3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgY29yZW1sOiBDb3JlTWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBjdWRhOiBDdWRhRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgZG1sOiBEbWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB0ZW5zb3JydDogVGVuc29yUnRFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3YXNtOiBXZWJBc3NlbWJseUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdlYmdsOiBXZWJHTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHhubnBhY2s6IFhubnBhY2tFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3ZWJncHU6IFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdlYm5uOiBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIG5uYXBpOiBObmFwaUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICB9XG5cbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlck5hbWUgPSBrZXlvZiBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcDtcbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlckNvbmZpZyA9XG4gICAgICBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcFtFeGVjdXRpb25Qcm92aWRlck5hbWVdfEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9ufEV4ZWN1dGlvblByb3ZpZGVyTmFtZXxzdHJpbmc7XG5cbiAgZXhwb3J0IGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2NwdSc7XG4gICAgdXNlQXJlbmE/OiBib29sZWFuO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3VkYUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjdWRhJztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENvcmVNbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjb3JlbWwnO1xuICAgIGNvcmVNbEZsYWdzPzogbnVtYmVyO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgRG1sRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2RtbCc7XG4gICAgZGV2aWNlSWQ/OiBudW1iZXI7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBUZW5zb3JSdEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd0ZW5zb3JydCc7XG4gICAgZGV2aWNlSWQ/OiBudW1iZXI7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJBc3NlbWJseUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3YXNtJztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdMRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dlYmdsJztcbiAgICAvLyBUT0RPOiBhZGQgZmxhZ3NcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFhubnBhY2tFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAneG5ucGFjayc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2ViZ3B1JztcbiAgICBwcmVmZXJyZWRMYXlvdXQ/OiAnTkNIVyd8J05IV0MnO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2Vibm4nO1xuICAgIGRldmljZVR5cGU/OiAnY3B1J3wnZ3B1J3wnbnB1JztcbiAgICBudW1UaHJlYWRzPzogbnVtYmVyO1xuICAgIHBvd2VyUHJlZmVyZW5jZT86ICdkZWZhdWx0J3wnbG93LXBvd2VyJ3wnaGlnaC1wZXJmb3JtYW5jZSc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBDb3JlTUxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnY29yZW1sJztcbiAgICB1c2VDUFVPbmx5PzogYm9vbGVhbjtcbiAgICBlbmFibGVPblN1YmdyYXBoPzogYm9vbGVhbjtcbiAgICBvbmx5RW5hYmxlRGV2aWNlV2l0aEFORT86IGJvb2xlYW47XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBObmFwaUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdubmFwaSc7XG4gICAgdXNlRlAxNj86IGJvb2xlYW47XG4gICAgdXNlTkNIVz86IGJvb2xlYW47XG4gICAgY3B1RGlzYWJsZWQ/OiBib29sZWFuO1xuICAgIGNwdU9ubHk/OiBib29sZWFuO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBydW4gb3B0aW9uc1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBjb25maWd1cmF0aW9ucyBmb3IgaW5mZXJlbmNlIHJ1biBiZWhhdmlvclxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBSdW5PcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBMb2cgc2V2ZXJpdHkgbGV2ZWwuIFNlZVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9jb21tb24vbG9nZ2luZy9zZXZlcml0eS5oXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgbG9nU2V2ZXJpdHlMZXZlbD86IDB8MXwyfDN8NDtcblxuICAgIC8qKlxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgbG9nVmVyYm9zaXR5TGV2ZWw/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUZXJtaW5hdGUgYWxsIGluY29tcGxldGUgT3J0UnVuIGNhbGxzIGFzIHNvb24gYXMgcG9zc2libGUgaWYgdHJ1ZVxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqL1xuICAgIHRlcm1pbmF0ZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBBIHRhZyBmb3IgdGhlIFJ1bigpIGNhbGxzIHVzaW5nIHRoaXNcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICB0YWc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBzaW5nbGUgcnVuIGNvbmZpZ3VyYXRpb24gZW50cnkuIFNlZVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9zZXNzaW9uL1xuICAgICAqIG9ubnhydW50aW1lX3J1bl9vcHRpb25zX2NvbmZpZ19rZXlzLmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqIGV4dHJhOiB7XG4gICAgICogICBtZW1vcnk6IHtcbiAgICAgKiAgICAgZW5hYmxlX21lbW9yeV9hcmVuYV9zaHJpbmthZ2U6IFwiMVwiLFxuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBleHRyYT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gdmFsdWUgbWV0YWRhdGFcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWludGVyZmFjZVxuICBpbnRlcmZhY2UgVmFsdWVNZXRhZGF0YSB7XG4gICAgLy8gVEJEXG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgcnVudGltZSBpbnN0YW5jZSBvZiBhbiBPTk5YIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluZmVyZW5jZVNlc3Npb24ge1xuICAvLyAjcmVnaW9uIHJ1bigpXG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgdGhlIG1vZGVsIGFzeW5jaHJvbm91c2x5IHdpdGggdGhlIGdpdmVuIGZlZWRzIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLklucHV0VHlwZWAgZm9yIGRldGFpbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCBpbmZlcmVuY2UuXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqL1xuICBydW4oZmVlZHM6IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8qKlxuICAgKiBFeGVjdXRlIHRoZSBtb2RlbCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcywgZmV0Y2hlcyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5JbnB1dFR5cGVgIGZvciBkZXRhaWwuXG4gICAqIEBwYXJhbSBmZXRjaGVzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIG91dHB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uT3V0cHV0VHlwZWAgZm9yXG4gICAqIGRldGFpbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCBpbmZlcmVuY2UuXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqL1xuICBydW4oZmVlZHM6IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlLCBmZXRjaGVzOiBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlLFxuICAgICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcblxuICAvKipcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cbiAgICovXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9maWxpbmdcblxuICAvKipcbiAgICogU3RhcnQgcHJvZmlsaW5nLlxuICAgKi9cbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZDtcblxuICAvKipcbiAgICogRW5kIHByb2ZpbGluZy5cbiAgICovXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG1ldGFkYXRhXG5cbiAgLyoqXG4gICAqIEdldCBpbnB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldCBvdXRwdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvLyAvKipcbiAgLy8gICogR2V0IGlucHV0IG1ldGFkYXRhIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gIC8vICAqL1xuICAvLyByZWFkb25seSBpbnB1dE1ldGFkYXRhOiBSZWFkb25seUFycmF5PFJlYWRvbmx5PEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YT4+O1xuXG4gIC8vIC8qKlxuICAvLyAgKiBHZXQgb3V0cHV0IG1ldGFkYXRhIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gIC8vICAqL1xuICAvLyByZWFkb25seSBvdXRwdXRNZXRhZGF0YTogUmVhZG9ubHlBcnJheTxSZWFkb25seTxJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGE+PjtcblxuICAvLyAjZW5kcmVnaW9uXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbkZhY3Rvcnkge1xuICAvLyAjcmVnaW9uIGNyZWF0ZSgpXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGFuIE9OTlggbW9kZWwgZmlsZS5cbiAgICpcbiAgICogQHBhcmFtIHVyaSAtIFRoZSBVUkkgb3IgZmlsZSBwYXRoIG9mIHRoZSBtb2RlbCB0byBsb2FkLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKHVyaTogc3RyaW5nLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGFuIGFycmF5IGJ1ZmVyLlxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQW4gQXJyYXlCdWZmZXIgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cbiAgICovXG4gIGNyZWF0ZShidWZmZXI6IEFycmF5QnVmZmVyTGlrZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24gYW5kIGxvYWQgbW9kZWwgYXN5bmNocm9ub3VzbHkgZnJvbSBzZWdtZW50IG9mIGFuIGFycmF5IGJ1ZmVyLlxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQW4gQXJyYXlCdWZmZXIgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cbiAgICogQHBhcmFtIGJ5dGVPZmZzZXQgLSBUaGUgYmVnaW5uaW5nIG9mIHRoZSBzcGVjaWZpZWQgcG9ydGlvbiBvZiB0aGUgYXJyYXkgYnVmZmVyLlxuICAgKiBAcGFyYW0gYnl0ZUxlbmd0aCAtIFRoZSBsZW5ndGggaW4gYnl0ZXMgb2YgdGhlIGFycmF5IGJ1ZmZlci5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cbiAgICovXG4gIGNyZWF0ZShidWZmZXI6IEFycmF5QnVmZmVyTGlrZSwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoPzogbnVtYmVyLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24gYW5kIGxvYWQgbW9kZWwgYXN5bmNocm9ub3VzbHkgZnJvbSBhIFVpbnQ4QXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBIFVpbnQ4QXJyYXkgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cbiAgICovXG4gIGNyZWF0ZShidWZmZXI6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBJbmZlcmVuY2VTZXNzaW9uOiBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSA9IEluZmVyZW5jZVNlc3Npb25JbXBsO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG50eXBlIE5vblRlbnNvclR5cGUgPSBuZXZlcjtcblxuLyoqXG4gKiBUeXBlIE9ubnhWYWx1ZSBSZXByZXNlbnRzIGJvdGggdGVuc29ycyBhbmQgbm9uLXRlbnNvcnMgdmFsdWUgZm9yIG1vZGVsJ3MgaW5wdXRzL291dHB1dHMuXG4gKlxuICogTk9URTogY3VycmVudGx5IG5vdCBzdXBwb3J0IG5vbi10ZW5zb3JcbiAqL1xuZXhwb3J0IHR5cGUgT25ueFZhbHVlID0gVGVuc29yfE5vblRlbnNvclR5cGU7XG5cbi8qKlxuICogVHlwZSBPbm54VmFsdWVEYXRhTG9jYXRpb24gcmVwcmVzZW50cyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgb2YgYW4gT25ueFZhbHVlLlxuICovXG5leHBvcnQgdHlwZSBPbm54VmFsdWVEYXRhTG9jYXRpb24gPSBUZW5zb3IuRGF0YUxvY2F0aW9uO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge3Jlc29sdmVCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XG5pbXBvcnQge1Nlc3Npb25IYW5kbGVyLCBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9uIGFzIEluZmVyZW5jZVNlc3Npb259IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuaW1wb3J0IHtPbm54VmFsdWV9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnLi90ZW5zb3IuanMnO1xuaW1wb3J0IHtUcmFpbmluZ1Nlc3Npb24gYXMgVHJhaW5pbmdTZXNzaW9uSW50ZXJmYWNlLCBUcmFpbmluZ1Nlc3Npb25DcmVhdGVPcHRpb25zfSBmcm9tICcuL3RyYWluaW5nLXNlc3Npb24uanMnO1xuXG50eXBlIFNlc3Npb25PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucztcbnR5cGUgRmVlZHNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGU7XG50eXBlIEZldGNoZXNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbi5GZXRjaGVzVHlwZTtcbnR5cGUgUmV0dXJuVHlwZSA9IEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZTtcbnR5cGUgUnVuT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucztcblxuY29uc3Qgbm9CYWNrZW5kRXJyTXNnOiBzdHJpbmcgPSAnVHJhaW5pbmcgYmFja2VuZCBjb3VsZCBub3QgYmUgcmVzb2x2ZWQuICcgK1xuICAgICdNYWtlIHN1cmUgeW91XFwncmUgdXNpbmcgdGhlIGNvcnJlY3QgY29uZmlndXJhdGlvbiAmIFdlYkFzc2VtYmx5IGZpbGVzLic7XG5cbmV4cG9ydCBjbGFzcyBUcmFpbmluZ1Nlc3Npb24gaW1wbGVtZW50cyBUcmFpbmluZ1Nlc3Npb25JbnRlcmZhY2Uge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKGhhbmRsZXI6IFRyYWluaW5nU2Vzc2lvbkhhbmRsZXIpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICB9XG4gIHByaXZhdGUgaGFuZGxlcjogVHJhaW5pbmdTZXNzaW9uSGFuZGxlcjtcblxuICBnZXQgaW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE5hbWVzO1xuICB9XG4gIGdldCBvdXRwdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5vdXRwdXROYW1lcztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUodHJhaW5pbmdPcHRpb25zOiBUcmFpbmluZ1Nlc3Npb25DcmVhdGVPcHRpb25zLCBzZXNzaW9uT3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8VHJhaW5pbmdTZXNzaW9uPiB7XG4gICAgY29uc3QgZXZhbE1vZGVsOiBzdHJpbmd8VWludDhBcnJheSA9IHRyYWluaW5nT3B0aW9ucy5ldmFsTW9kZWwgfHwgJyc7XG4gICAgY29uc3Qgb3B0aW1pemVyTW9kZWw6IHN0cmluZ3xVaW50OEFycmF5ID0gdHJhaW5pbmdPcHRpb25zLm9wdGltaXplck1vZGVsIHx8ICcnO1xuICAgIGNvbnN0IG9wdGlvbnM6IFNlc3Npb25PcHRpb25zID0gc2Vzc2lvbk9wdGlvbnMgfHwge307XG5cbiAgICAvLyBnZXQgYmFja2VuZCBoaW50c1xuICAgIGNvbnN0IGVwcyA9IG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzIHx8IFtdO1xuICAgIGNvbnN0IGJhY2tlbmRIaW50cyA9IGVwcy5tYXAoaSA9PiB0eXBlb2YgaSA9PT0gJ3N0cmluZycgPyBpIDogaS5uYW1lKTtcbiAgICBjb25zdCBiYWNrZW5kID0gYXdhaXQgcmVzb2x2ZUJhY2tlbmQoYmFja2VuZEhpbnRzKTtcbiAgICBpZiAoYmFja2VuZC5jcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGVyKSB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gYXdhaXQgYmFja2VuZC5jcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGVyKFxuICAgICAgICAgIHRyYWluaW5nT3B0aW9ucy5jaGVja3BvaW50U3RhdGUsIHRyYWluaW5nT3B0aW9ucy50cmFpbk1vZGVsLCBldmFsTW9kZWwsIG9wdGltaXplck1vZGVsLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiBuZXcgVHJhaW5pbmdTZXNzaW9uKGhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3Iobm9CYWNrZW5kRXJyTXNnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIGZvciBydW5UcmFpblN0ZXAgYW5kIGZ1dHVyZSBydW5TdGVwIG1ldGhvZHMgdGhhdCBoYW5kbGVzIHRoZSB0eXBlLW5hcnJvd2luZyBjb252ZXJzaW9uIGZyb21cbiAgICogdGhlIGdpdmVuIHBhcmFtZXRlcnMgdG8gU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUgYW5kIFJ1bk9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyB0aGUgcmVxdWlyZWQgaW5wdXRcbiAgICogQHBhcmFtIGFyZzEgbmFycm93ZWQgJiBjb252ZXJ0ZWQgaW50byB0aGUgU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUgb3IgUnVuT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIGFyZzIgb3B0aW9uYWwgUnVuT3B0aW9ucyBvYmplY3QuXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICB0eXBlTmFycm93aW5nRm9yUnVuU3RlcChmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGV8UnVuT3B0aW9ucywgYXJnMj86IFJ1bk9wdGlvbnMpOlxuICAgICAgW1Nlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLCBSdW5PcHRpb25zXSB7XG4gICAgY29uc3QgZmV0Y2hlczoge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV8bnVsbH0gPSB7fTtcbiAgICBsZXQgb3B0aW9uczogUnVuT3B0aW9ucyA9IHt9O1xuICAgIC8vIGNoZWNrIGlucHV0c1xuICAgIGlmICh0eXBlb2YgZmVlZHMgIT09ICdvYmplY3QnIHx8IGZlZWRzID09PSBudWxsIHx8IGZlZWRzIGluc3RhbmNlb2YgVGVuc29yIHx8IEFycmF5LmlzQXJyYXkoZmVlZHMpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICdcXCdmZWVkc1xcJyBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IHVzZSBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuJyk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmV0Y2hlc0VtcHR5ID0gdHJ1ZTtcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggb3ZlcnJpZGUgaXMgYmVpbmcgdXNlZFxuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChhcmcxID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZzEgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBjYW5ub3QgYmUgYSBUZW5zb3InKTtcbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgaWYgKGFyZzEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBjYW5ub3QgYmUgYW4gZW1wdHkgYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgLy8gb3V0cHV0IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBhcmcxKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBtdXN0IGJlIGEgc3RyaW5nIGFycmF5IG9yIGFuIG9iamVjdC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMub3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnZmV0Y2hlcycgY29udGFpbnMgaW52YWxpZCBvdXRwdXQgbmFtZTogJHtuYW1lfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkZWNpZGUgd2hldGhlciBhcmcxIGlzIGZldGNoZXMgb3Igb3B0aW9uc1xuICAgICAgICAvLyBpZiBhbnkgb3V0cHV0IG5hbWUgaXMgcHJlc2VudCBhbmQgaXRzIHZhbHVlIGlzIHZhbGlkIE9ubnhWYWx1ZSwgd2UgY29uc2lkZXIgaXQgZmV0Y2hlc1xuICAgICAgICBsZXQgaXNGZXRjaGVzID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFyZzFLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJnMSk7XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLm91dHB1dE5hbWVzKSB7XG4gICAgICAgICAgaWYgKGFyZzFLZXlzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gKGFyZzEgYXMgSW5mZXJlbmNlU2Vzc2lvbi5OdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUpW25hbWVdO1xuICAgICAgICAgICAgaWYgKHYgPT09IG51bGwgfHwgdiBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICAgICAgICBpc0ZldGNoZXMgPSB0cnVlO1xuICAgICAgICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICBmZXRjaGVzW25hbWVdID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGZXRjaGVzKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gYXJnMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzEgYXMgUnVuT3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBtdXN0IGJlIFxcJ2ZldGNoZXNcXCcgb3IgXFwnb3B0aW9uc1xcJy4nKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiBhbGwgaW5wdXRzIGFyZSBpbiBmZWVkXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMuaW5wdXROYW1lcykge1xuICAgICAgaWYgKHR5cGVvZiBmZWVkc1tuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCAnJHtuYW1lfScgaXMgbWlzc2luZyBpbiAnZmVlZHMnLmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIG5vIGZldGNoZXMgaXMgc3BlY2lmaWVkLCB3ZSB1c2UgdGhlIGZ1bGwgb3V0cHV0IG5hbWVzIGxpc3RcbiAgICBpZiAoaXNGZXRjaGVzRW1wdHkpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLm91dHB1dE5hbWVzKSB7XG4gICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbZmV0Y2hlcywgb3B0aW9uc107XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIG1ldGhvZCBmb3IgcnVuVHJhaW5TdGVwIGFuZCBhbnkgb3RoZXIgcnVuU3RlcCBtZXRob2RzLiBUYWtlcyB0aGUgUmV0dXJuVHlwZSByZXN1bHQgZnJvbSB0aGUgU2Vzc2lvbkhhbmRsZXJcbiAgICogYW5kIGNoYW5nZXMgaXQgaW50byBhIG1hcCBvZiBUZW5zb3JzLlxuICAgKlxuICAgKiBAcGFyYW0gcmVzdWx0c1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgY29udmVydEhhbmRsZXJSZXR1cm5UeXBlVG9NYXBPZlRlbnNvcnMocmVzdWx0czogU2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZSk6IFJldHVyblR5cGUge1xuICAgIGNvbnN0IHJldHVyblZhbHVlOiB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX0gPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByZXN1bHRzKSB7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0cywga2V5KSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW2tleV07XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSBuZXcgVGVuc29yKHJlc3VsdC50eXBlLCByZXN1bHQuZGF0YSwgcmVzdWx0LmRpbXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxuXG4gIHJ1blRyYWluU3RlcChmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIHJ1blRyYWluU3RlcChmZWVkczogRmVlZHNUeXBlLCBmZXRjaGVzOiBGZXRjaGVzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBhc3luYyBydW5UcmFpblN0ZXAoZmVlZHM6IEZlZWRzVHlwZSwgYXJnMT86IEZldGNoZXNUeXBlfFJ1bk9wdGlvbnMsIGFyZzI/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPiB7XG4gICAgY29uc3QgW2ZldGNoZXMsIG9wdGlvbnNdID0gdGhpcy50eXBlTmFycm93aW5nRm9yUnVuU3RlcChmZWVkcywgYXJnMSwgYXJnMik7XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuaGFuZGxlci5ydW5UcmFpblN0ZXAoZmVlZHMsIGZldGNoZXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmNvbnZlcnRIYW5kbGVyUmV0dXJuVHlwZVRvTWFwT2ZUZW5zb3JzKHJlc3VsdHMpO1xuICB9XG5cbiAgYXN5bmMgbG9hZFBhcmFtZXRlcnNCdWZmZXIoX2FycmF5OiBVaW50OEFycmF5LCBfdHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxuXG4gIGFzeW5jIGdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKF90cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xuICB9XG5cbiAgYXN5bmMgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmRpc3Bvc2UoKTtcbiAgfVxufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb259IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuaW1wb3J0IHtUcmFpbmluZ1Nlc3Npb24gYXMgVHJhaW5pbmdTZXNzaW9uSW1wbH0gZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLWltcGwuanMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBUcmFpbmluZ1Nlc3Npb24ge1xuICAvKipcbiAgICogRWl0aGVyIFVSSSBmaWxlIHBhdGggKHN0cmluZykgb3IgVWludDhBcnJheSBjb250YWluaW5nIG1vZGVsIG9yIGNoZWNrcG9pbnQgaW5mb3JtYXRpb24uXG4gICAqL1xuICB0eXBlIFVSSW9yQnVmZmVyID0gc3RyaW5nfFVpbnQ4QXJyYXk7XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgcnVudGltZSBpbnN0YW5jZSBvZiBhbiBPTk5YIHRyYWluaW5nIHNlc3Npb24sXG4gKiB3aGljaCBjb250YWlucyBhIG1vZGVsIHRoYXQgY2FuIGJlIHRyYWluZWQsIGFuZCwgb3B0aW9uYWxseSxcbiAqIGFuIGV2YWwgYW5kIG9wdGltaXplciBtb2RlbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb24ge1xuICAvLyAjcmVnaW9uIHJ1bigpXG5cbiAgLyoqXG4gICAqIFJ1biBUcmFpblN0ZXAgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3JcbiAgIGRldGFpbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCB0cmFpbmluZy5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1blRyYWluU3RlcChmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8qKlxuICAgKiBSdW4gYSBzaW5nbGUgdHJhaW4gc3RlcCB3aXRoIHRoZSBnaXZlbiBpbnB1dHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC5cbiAgICogQHBhcmFtIGZldGNoZXMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgb3V0cHV0LlxuICAgKiBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmdcbiAgIHZhbHVlcy5cbiAgICovXG4gIHJ1blRyYWluU3RlcChcbiAgICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgZmV0Y2hlczogSW5mZXJlbmNlU2Vzc2lvbi5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gY29weSBwYXJhbWV0ZXJzXG4gIC8qKlxuICAgKiBDb3BpZXMgZnJvbSBhIGJ1ZmZlciBjb250YWluaW5nIHBhcmFtZXRlcnMgdG8gdGhlIFRyYWluaW5nU2Vzc2lvbiBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gYnVmZmVyIGNvbnRhaW5pbmcgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0gdHJhaW5hYmxlT25seSAtIFRydWUgaWYgdHJhaW5hYmxlIHBhcmFtZXRlcnMgb25seSB0byBiZSBtb2RpZmllZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYXJyYXk6IFVpbnQ4QXJyYXksIHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBDb3BpZXMgZnJvbSB0aGUgVHJhaW5pbmdTZXNzaW9uIHBhcmFtZXRlcnMgdG8gYSBidWZmZXIuXG4gICAqXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gVHJ1ZSBpZiB0cmFpbmFibGUgcGFyYW1ldGVycyBvbmx5IHRvIGJlIGNvcGllZCwgZmFsc2Ugb3Rocndpc2UuXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYnVmZmVyIG9mIHRoZSByZXF1ZXN0ZWQgcGFyYW1ldGVycy5cbiAgICovXG4gIGdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPFVpbnQ4QXJyYXk+O1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcblxuICAvKipcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cbiAgICovXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0YWRhdGFcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgb3B0aW9uYWwgcGFyYW1ldGVycyB0aGF0IGNhbiBiZSBwYXNzZWQgaW50byB0aGUgVHJhaW5pbmdTZXNzaW9uRmFjdG9yeS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb25DcmVhdGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFVSSSBvciBidWZmZXIgZm9yIGEgLmNrcHQgZmlsZSB0aGF0IGNvbnRhaW5zIHRoZSBjaGVja3BvaW50IGZvciB0aGUgdHJhaW5pbmcgbW9kZWwuXG4gICAqL1xuICBjaGVja3BvaW50U3RhdGU6IFRyYWluaW5nU2Vzc2lvbi5VUklvckJ1ZmZlcjtcbiAgLyoqXG4gICAqIFVSSSBvciBidWZmZXIgZm9yIHRoZSAub25ueCB0cmFpbmluZyBmaWxlLlxuICAgKi9cbiAgdHJhaW5Nb2RlbDogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyO1xuICAvKipcbiAgICogT3B0aW9uYWwuIFVSSSBvciBidWZmZXIgZm9yIHRoZSAub25ueCBvcHRpbWl6ZXIgbW9kZWwgZmlsZS5cbiAgICovXG4gIG9wdGltaXplck1vZGVsPzogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyO1xuICAvKipcbiAgICogT3B0aW9uYWwuIFVSSSBvciBidWZmZXIgZm9yIHRoZSAub25ueCBldmFsIG1vZGVsIGZpbGUuXG4gICAqL1xuICBldmFsTW9kZWw/OiBUcmFpbmluZ1Nlc3Npb24uVVJJb3JCdWZmZXI7XG59XG5cbi8qKlxuICogRGVmaW5lcyBtZXRob2Qgb3ZlcmxvYWQgcG9zc2liaWxpdGllcyBmb3IgY3JlYXRpbmcgYSBUcmFpbmluZ1Nlc3Npb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gY3JlYXRlKClcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBUcmFpbmluZ1Nlc3Npb24gYW5kIGFzeW5jaHJvbm91c2x5IGxvYWRzIGFueSBtb2RlbHMgcGFzc2VkIGluIHRocm91Z2ggdHJhaW5pbmdPcHRpb25zXG4gICAqXG4gICAqIEBwYXJhbSB0cmFpbmluZ09wdGlvbnMgc3BlY2lmeSBtb2RlbHMgYW5kIGNoZWNrcG9pbnRzIHRvIGxvYWQgaW50byB0aGUgVHJhaW5pbmcgU2Vzc2lvblxuICAgKiBAcGFyYW0gc2Vzc2lvbk9wdGlvbnMgc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciB0cmFpbmluZyBzZXNzaW9uIGJlaGF2aW9yXG4gICAqXG4gICAqIEByZXR1cm5zIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIFRyYWluaW5nU2Vzc2lvbiBvYmplY3RcbiAgICovXG4gIGNyZWF0ZSh0cmFpbmluZ09wdGlvbnM6IFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnMsIHNlc3Npb25PcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbj47XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgVHJhaW5pbmdTZXNzaW9uOiBUcmFpbmluZ1Nlc3Npb25GYWN0b3J5ID0gVHJhaW5pbmdTZXNzaW9uSW1wbDtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLyoqXG4gKiAjIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSVxuICpcbiAqIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSSBpcyBhIHVuaWZpZWQgQVBJIGZvciBhbGwgSmF2YVNjcmlwdCB1c2FnZXMsIGluY2x1ZGluZyB0aGUgZm9sbG93aW5nIE5QTSBwYWNrYWdlczpcbiAqXG4gKiAtIFtvbm54cnVudGltZS1ub2RlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS1ub2RlKVxuICogLSBbb25ueHJ1bnRpbWUtd2ViXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS13ZWIpXG4gKiAtIFtvbm54cnVudGltZS1yZWFjdC1uYXRpdmVdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLXJlYWN0LW5hdGl2ZSlcbiAqXG4gKiBTZWUgYWxzbzpcbiAqIC0gW0dldCBTdGFydGVkXShodHRwczovL29ubnhydW50aW1lLmFpL2RvY3MvZ2V0LXN0YXJ0ZWQvd2l0aC1qYXZhc2NyaXB0Lmh0bWwpXG4gKiAtIFtJbmZlcmVuY2UgZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUtaW5mZXJlbmNlLWV4YW1wbGVzL3RyZWUvbWFpbi9qcylcbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2JhY2tlbmQuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9lbnYuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLmpzJztcbiIsICJleHBvcnQgY29uc3QgY3B1cyA9IHVuZGVmaW5lZDsiLCAiZXhwb3J0IGNvbnN0IHJlYWRGaWxlID0gdW5kZWZpbmVkOyIsICJleHBvcnQgY29uc3Qgam9pbiA9IHVuZGVmaW5lZDsiLCAiXG52YXIgb3J0V2FzbSA9ICgoKSA9PiB7XG4gIHZhciBfc2NyaXB0RGlyID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0ID8gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMgOiB1bmRlZmluZWQ7XG4gIGlmICh0eXBlb2YgX19maWxlbmFtZSAhPT0gJ3VuZGVmaW5lZCcpIF9zY3JpcHREaXIgPSBfc2NyaXB0RGlyIHx8IF9fZmlsZW5hbWU7XG4gIHJldHVybiAoXG5mdW5jdGlvbihtb2R1bGVBcmcgPSB7fSkge1xuXG52YXIgcD1tb2R1bGVBcmcsYWEsYmE7cC5yZWFkeT1uZXcgUHJvbWlzZSgoYSxiKT0+e2FhPWE7YmE9Yn0pO3ZhciBjYT1PYmplY3QuYXNzaWduKHt9LHApLGRhPVwiLi90aGlzLnByb2dyYW1cIixlYT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93LHE9XCJmdW5jdGlvblwiPT10eXBlb2YgaW1wb3J0U2NyaXB0cyxmYT1cIm9iamVjdFwiPT10eXBlb2YgcHJvY2VzcyYmXCJvYmplY3RcIj09dHlwZW9mIHByb2Nlc3MudmVyc2lvbnMmJlwic3RyaW5nXCI9PXR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGUscj1cIlwiLGhhLGlhLGphO1xuaWYoZmEpe3ZhciBmcz1yZXF1aXJlKFwiZnNcIiksa2E9cmVxdWlyZShcInBhdGhcIik7cj1xP2thLmRpcm5hbWUocikrXCIvXCI6X19kaXJuYW1lK1wiL1wiO2hhPShhLGIpPT57YT1hLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpP25ldyBVUkwoYSk6a2Eubm9ybWFsaXplKGEpO3JldHVybiBmcy5yZWFkRmlsZVN5bmMoYSxiP3ZvaWQgMDpcInV0ZjhcIil9O2phPWE9PnthPWhhKGEsITApO2EuYnVmZmVyfHwoYT1uZXcgVWludDhBcnJheShhKSk7cmV0dXJuIGF9O2lhPShhLGIsYyxkPSEwKT0+e2E9YS5zdGFydHNXaXRoKFwiZmlsZTovL1wiKT9uZXcgVVJMKGEpOmthLm5vcm1hbGl6ZShhKTtmcy5yZWFkRmlsZShhLGQ/dm9pZCAwOlwidXRmOFwiLChlLGYpPT57ZT9jKGUpOmIoZD9mLmJ1ZmZlcjpmKX0pfTshcC50aGlzUHJvZ3JhbSYmMTxwcm9jZXNzLmFyZ3YubGVuZ3RoJiYoZGE9cHJvY2Vzcy5hcmd2WzFdLnJlcGxhY2UoL1xcXFwvZyxcIi9cIikpO3Byb2Nlc3MuYXJndi5zbGljZSgyKTtwLmluc3BlY3Q9KCk9PlwiW0Vtc2NyaXB0ZW4gTW9kdWxlIG9iamVjdF1cIn1lbHNlIGlmKGVhfHxcbnEpcT9yPXNlbGYubG9jYXRpb24uaHJlZjpcInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQmJmRvY3VtZW50LmN1cnJlbnRTY3JpcHQmJihyPWRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjKSxfc2NyaXB0RGlyJiYocj1fc2NyaXB0RGlyKSwwIT09ci5pbmRleE9mKFwiYmxvYjpcIik/cj1yLnN1YnN0cigwLHIucmVwbGFjZSgvWz8jXS4qLyxcIlwiKS5sYXN0SW5kZXhPZihcIi9cIikrMSk6cj1cIlwiLGhhPWE9Pnt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiR0VUXCIsYSwhMSk7Yi5zZW5kKG51bGwpO3JldHVybiBiLnJlc3BvbnNlVGV4dH0scSYmKGphPWE9Pnt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiR0VUXCIsYSwhMSk7Yi5yZXNwb25zZVR5cGU9XCJhcnJheWJ1ZmZlclwiO2Iuc2VuZChudWxsKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYi5yZXNwb25zZSl9KSxpYT0oYSxiLGMpPT57dmFyIGQ9bmV3IFhNTEh0dHBSZXF1ZXN0O2Qub3BlbihcIkdFVFwiLGEsITApO2QucmVzcG9uc2VUeXBlPVxuXCJhcnJheWJ1ZmZlclwiO2Qub25sb2FkPSgpPT57MjAwPT1kLnN0YXR1c3x8MD09ZC5zdGF0dXMmJmQucmVzcG9uc2U/YihkLnJlc3BvbnNlKTpjKCl9O2Qub25lcnJvcj1jO2Quc2VuZChudWxsKX07dmFyIGxhPWNvbnNvbGUubG9nLmJpbmQoY29uc29sZSksdD1jb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihwLGNhKTtjYT1udWxsO1wib2JqZWN0XCIhPXR5cGVvZiBXZWJBc3NlbWJseSYmbWEoXCJubyBuYXRpdmUgd2FzbSBzdXBwb3J0IGRldGVjdGVkXCIpO3ZhciBuYSxvYT0hMSx4LEEsQixwYSxFLEkscWEscmEsc2EsdGE7XG5mdW5jdGlvbiB1YSgpe3ZhciBhPW5hLmJ1ZmZlcjtwLkhFQVA4PXg9bmV3IEludDhBcnJheShhKTtwLkhFQVAxNj1CPW5ldyBJbnQxNkFycmF5KGEpO3AuSEVBUFU4PUE9bmV3IFVpbnQ4QXJyYXkoYSk7cC5IRUFQVTE2PXBhPW5ldyBVaW50MTZBcnJheShhKTtwLkhFQVAzMj1FPW5ldyBJbnQzMkFycmF5KGEpO3AuSEVBUFUzMj1JPW5ldyBVaW50MzJBcnJheShhKTtwLkhFQVBGMzI9cWE9bmV3IEZsb2F0MzJBcnJheShhKTtwLkhFQVBGNjQ9dGE9bmV3IEZsb2F0NjRBcnJheShhKTtwLkhFQVA2ND1yYT1uZXcgQmlnSW50NjRBcnJheShhKTtwLkhFQVBVNjQ9c2E9bmV3IEJpZ1VpbnQ2NEFycmF5KGEpfXZhciB2YT1bXSx3YT1bXSx4YT1bXSxKPTAseWE9bnVsbCxLPW51bGw7XG5mdW5jdGlvbiBtYShhKXthPVwiQWJvcnRlZChcIithK1wiKVwiO3QoYSk7b2E9ITA7YT1uZXcgV2ViQXNzZW1ibHkuUnVudGltZUVycm9yKGErXCIuIEJ1aWxkIHdpdGggLXNBU1NFUlRJT05TIGZvciBtb3JlIGluZm8uXCIpO2JhKGEpO3Rocm93IGE7fWZ1bmN0aW9uIHphKGEpe3JldHVybiBhLnN0YXJ0c1dpdGgoXCJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsXCIpfXZhciBBYTtBYT1cIm9ydC13YXNtLndhc21cIjtpZighemEoQWEpKXt2YXIgQmE9QWE7QWE9cC5sb2NhdGVGaWxlP3AubG9jYXRlRmlsZShCYSxyKTpyK0JhfWZ1bmN0aW9uIENhKGEpe2lmKGphKXJldHVybiBqYShhKTt0aHJvd1wiYm90aCBhc3luYyBhbmQgc3luYyBmZXRjaGluZyBvZiB0aGUgd2FzbSBmYWlsZWRcIjt9XG5mdW5jdGlvbiBEYShhKXtpZihlYXx8cSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZmV0Y2gmJiFhLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpKXJldHVybiBmZXRjaChhLHtjcmVkZW50aWFsczpcInNhbWUtb3JpZ2luXCJ9KS50aGVuKGI9PntpZighYi5vayl0aHJvd1wiZmFpbGVkIHRvIGxvYWQgd2FzbSBiaW5hcnkgZmlsZSBhdCAnXCIrYStcIidcIjtyZXR1cm4gYi5hcnJheUJ1ZmZlcigpfSkuY2F0Y2goKCk9PkNhKGEpKTtpZihpYSlyZXR1cm4gbmV3IFByb21pc2UoKGIsYyk9PntpYShhLGQ9PmIobmV3IFVpbnQ4QXJyYXkoZCkpLGMpfSl9cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9PkNhKGEpKX1mdW5jdGlvbiBFYShhLGIsYyl7cmV0dXJuIERhKGEpLnRoZW4oZD0+V2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoZCxiKSkudGhlbihkPT5kKS50aGVuKGMsZD0+e3QoYGZhaWxlZCB0byBhc3luY2hyb25vdXNseSBwcmVwYXJlIHdhc206ICR7ZH1gKTttYShkKX0pfVxuZnVuY3Rpb24gRmEoYSxiKXt2YXIgYz1BYTtyZXR1cm5cImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZ3x8emEoYyl8fGMuc3RhcnRzV2l0aChcImZpbGU6Ly9cIil8fGZhfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBmZXRjaD9FYShjLGEsYik6ZmV0Y2goYyx7Y3JlZGVudGlhbHM6XCJzYW1lLW9yaWdpblwifSkudGhlbihkPT5XZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhkLGEpLnRoZW4oYixmdW5jdGlvbihlKXt0KGB3YXNtIHN0cmVhbWluZyBjb21waWxlIGZhaWxlZDogJHtlfWApO3QoXCJmYWxsaW5nIGJhY2sgdG8gQXJyYXlCdWZmZXIgaW5zdGFudGlhdGlvblwiKTtyZXR1cm4gRWEoYyxhLGIpfSkpfXZhciBIYT1bXSxJYT0wLEw9MDtcbmZ1bmN0aW9uIEphKGEpe3RoaXMucmU9YTt0aGlzLmxlPWEtMjQ7dGhpcy5KZT1mdW5jdGlvbihiKXtJW3RoaXMubGUrND4+PjI+Pj4wXT1ifTt0aGlzLnNlPWZ1bmN0aW9uKCl7cmV0dXJuIElbdGhpcy5sZSs0Pj4+Mj4+PjBdfTt0aGlzLkllPWZ1bmN0aW9uKGIpe0lbdGhpcy5sZSs4Pj4+Mj4+PjBdPWJ9O3RoaXMuemU9ZnVuY3Rpb24oYil7eFt0aGlzLmxlKzEyPj4+MD4+PjBdPWI/MTowfTt0aGlzLkZlPWZ1bmN0aW9uKCl7cmV0dXJuIDAhPXhbdGhpcy5sZSsxMj4+PjA+Pj4wXX07dGhpcy5BZT1mdW5jdGlvbihiKXt4W3RoaXMubGUrMTM+Pj4wPj4+MF09Yj8xOjB9O3RoaXMuQmU9ZnVuY3Rpb24oKXtyZXR1cm4gMCE9eFt0aGlzLmxlKzEzPj4+MD4+PjBdfTt0aGlzLkhlPWZ1bmN0aW9uKGIsYyl7dGhpcy50ZSgwKTt0aGlzLkplKGIpO3RoaXMuSWUoYyl9O3RoaXMudGU9ZnVuY3Rpb24oYil7SVt0aGlzLmxlKzE2Pj4+Mj4+PjBdPWJ9O3RoaXMuRWU9ZnVuY3Rpb24oKXtyZXR1cm4gSVt0aGlzLmxlK1xuMTY+Pj4yPj4+MF19O3RoaXMuR2U9ZnVuY3Rpb24oKXtpZihLYSh0aGlzLnNlKCkpKXJldHVybiBJW3RoaXMucmU+Pj4yPj4+MF07dmFyIGI9dGhpcy5FZSgpO3JldHVybiAwIT09Yj9iOnRoaXMucmV9fVxudmFyIE5hPWE9Pnt2YXIgYj1MO2lmKCFiKXJldHVybiBMYSgwKSwwO3ZhciBjPW5ldyBKYShiKTtjLnRlKGIpO3ZhciBkPWMuc2UoKTtpZighZClyZXR1cm4gTGEoMCksYjtmb3IodmFyIGUgaW4gYSl7dmFyIGY9YVtlXTtpZigwPT09Znx8Zj09PWQpYnJlYWs7aWYoTWEoZixkLGMubGUrMTYpKXJldHVybiBMYShmKSxifUxhKGQpO3JldHVybiBifSxPYT1cInVuZGVmaW5lZFwiIT10eXBlb2YgVGV4dERlY29kZXI/bmV3IFRleHREZWNvZGVyKFwidXRmOFwiKTp2b2lkIDAsUGE9KGEsYixjKT0+e2I+Pj49MDt2YXIgZD1iK2M7Zm9yKGM9YjthW2NdJiYhKGM+PWQpOykrK2M7aWYoMTY8Yy1iJiZhLmJ1ZmZlciYmT2EpcmV0dXJuIE9hLmRlY29kZShhLnN1YmFycmF5KGIsYykpO2ZvcihkPVwiXCI7YjxjOyl7dmFyIGU9YVtiKytdO2lmKGUmMTI4KXt2YXIgZj1hW2IrK10mNjM7aWYoMTkyPT0oZSYyMjQpKWQrPVN0cmluZy5mcm9tQ2hhckNvZGUoKGUmMzEpPDw2fGYpO2Vsc2V7dmFyIGc9YVtiKytdJlxuNjM7ZT0yMjQ9PShlJjI0MCk/KGUmMTUpPDwxMnxmPDw2fGc6KGUmNyk8PDE4fGY8PDEyfGc8PDZ8YVtiKytdJjYzOzY1NTM2PmU/ZCs9U3RyaW5nLmZyb21DaGFyQ29kZShlKTooZS09NjU1MzYsZCs9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxlPj4xMCw1NjMyMHxlJjEwMjMpKX19ZWxzZSBkKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpfXJldHVybiBkfSxRYT0oYSxiKT0+KGE+Pj49MCk/UGEoQSxhLGIpOlwiXCIsUmE9YT0+e2Zvcih2YXIgYj0wLGM9MDtjPGEubGVuZ3RoOysrYyl7dmFyIGQ9YS5jaGFyQ29kZUF0KGMpOzEyNz49ZD9iKys6MjA0Nz49ZD9iKz0yOjU1Mjk2PD1kJiY1NzM0Mz49ZD8oYis9NCwrK2MpOmIrPTN9cmV0dXJuIGJ9LFNhPShhLGIsYyxkKT0+e2M+Pj49MDtpZighKDA8ZCkpcmV0dXJuIDA7dmFyIGU9YztkPWMrZC0xO2Zvcih2YXIgZj0wO2Y8YS5sZW5ndGg7KytmKXt2YXIgZz1hLmNoYXJDb2RlQXQoZik7aWYoNTUyOTY8PWcmJjU3MzQzPj1nKXt2YXIgaD1cbmEuY2hhckNvZGVBdCgrK2YpO2c9NjU1MzYrKChnJjEwMjMpPDwxMCl8aCYxMDIzfWlmKDEyNz49Zyl7aWYoYz49ZClicmVhaztiW2MrKz4+PjBdPWd9ZWxzZXtpZigyMDQ3Pj1nKXtpZihjKzE+PWQpYnJlYWs7YltjKys+Pj4wXT0xOTJ8Zz4+Nn1lbHNle2lmKDY1NTM1Pj1nKXtpZihjKzI+PWQpYnJlYWs7YltjKys+Pj4wXT0yMjR8Zz4+MTJ9ZWxzZXtpZihjKzM+PWQpYnJlYWs7YltjKys+Pj4wXT0yNDB8Zz4+MTg7YltjKys+Pj4wXT0xMjh8Zz4+MTImNjN9YltjKys+Pj4wXT0xMjh8Zz4+NiY2M31iW2MrKz4+PjBdPTEyOHxnJjYzfX1iW2M+Pj4wXT0wO3JldHVybiBjLWV9LFRhPWE9PntpZihudWxsPT09YSlyZXR1cm5cIm51bGxcIjt2YXIgYj10eXBlb2YgYTtyZXR1cm5cIm9iamVjdFwiPT09Ynx8XCJhcnJheVwiPT09Ynx8XCJmdW5jdGlvblwiPT09Yj9hLnRvU3RyaW5nKCk6XCJcIithfSxVYSxNPWE9Pntmb3IodmFyIGI9XCJcIjtBW2E+Pj4wXTspYis9VWFbQVthKys+Pj4wXV07cmV0dXJuIGJ9LFxuVmE9e30sV2E9e30sWGE9e30sTjtmdW5jdGlvbiBZYShhLGIsYz17fSl7dmFyIGQ9Yi5uYW1lO2lmKCFhKXRocm93IG5ldyBOKGB0eXBlIFwiJHtkfVwiIG11c3QgaGF2ZSBhIHBvc2l0aXZlIGludGVnZXIgdHlwZWlkIHBvaW50ZXJgKTtpZihXYS5oYXNPd25Qcm9wZXJ0eShhKSl7aWYoYy5DZSlyZXR1cm47dGhyb3cgbmV3IE4oYENhbm5vdCByZWdpc3RlciB0eXBlICcke2R9JyB0d2ljZWApO31XYVthXT1iO2RlbGV0ZSBYYVthXTtWYS5oYXNPd25Qcm9wZXJ0eShhKSYmKGI9VmFbYV0sZGVsZXRlIFZhW2FdLGIuZm9yRWFjaChlPT5lKCkpKX1mdW5jdGlvbiBPKGEsYixjPXt9KXtpZighKFwiYXJnUGFja0FkdmFuY2VcImluIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJyZWdpc3RlclR5cGUgcmVnaXN0ZXJlZEluc3RhbmNlIHJlcXVpcmVzIGFyZ1BhY2tBZHZhbmNlXCIpO1lhKGEsYixjKX1cbnZhciBaYT0oYSxiLGMpPT57c3dpdGNoKGIpe2Nhc2UgMTpyZXR1cm4gYz9kPT54W2Q+Pj4wPj4+MF06ZD0+QVtkPj4+MD4+PjBdO2Nhc2UgMjpyZXR1cm4gYz9kPT5CW2Q+Pj4xPj4+MF06ZD0+cGFbZD4+PjE+Pj4wXTtjYXNlIDQ6cmV0dXJuIGM/ZD0+RVtkPj4+Mj4+PjBdOmQ9PklbZD4+PjI+Pj4wXTtjYXNlIDg6cmV0dXJuIGM/ZD0+cmFbZD4+PjNdOmQ9PnNhW2Q+Pj4zXTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgaW50ZWdlciB3aWR0aCAoJHtifSk6ICR7YX1gKTt9fTtmdW5jdGlvbiAkYSgpe3RoaXMubmU9W3ZvaWQgMF07dGhpcy54ZT1bXX12YXIgUD1uZXcgJGE7ZnVuY3Rpb24gYWIoYSl7YT4+Pj0wO2E+PVAubGUmJjA9PT0tLVAuZ2V0KGEpLnllJiZQLnRlKGEpfVxudmFyIFE9YT0+e2lmKCFhKXRocm93IG5ldyBOKFwiQ2Fubm90IHVzZSBkZWxldGVkIHZhbC4gaGFuZGxlID0gXCIrYSk7cmV0dXJuIFAuZ2V0KGEpLnZhbHVlfSxSPWE9Pntzd2l0Y2goYSl7Y2FzZSB2b2lkIDA6cmV0dXJuIDE7Y2FzZSBudWxsOnJldHVybiAyO2Nhc2UgITA6cmV0dXJuIDM7Y2FzZSAhMTpyZXR1cm4gNDtkZWZhdWx0OnJldHVybiBQLnNlKHt5ZToxLHZhbHVlOmF9KX19O2Z1bmN0aW9uIGJiKGEpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShFW2E+Pj4yPj4+MF0pfXZhciBjYj0oYSxiKT0+e3N3aXRjaChiKXtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShxYVtjPj4+Mj4+PjBdKX07Y2FzZSA4OnJldHVybiBmdW5jdGlvbihjKXtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUodGFbYz4+PjM+Pj4wXSl9O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcihgaW52YWxpZCBmbG9hdCB3aWR0aCAoJHtifSk6ICR7YX1gKTt9fTtcbmZ1bmN0aW9uIGRiKGEpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShJW2E+Pj4yPj4+MF0pfVxudmFyIGViPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBUZXh0RGVjb2Rlcj9uZXcgVGV4dERlY29kZXIoXCJ1dGYtMTZsZVwiKTp2b2lkIDAsZmI9KGEsYik9Pnt2YXIgYz1hPj4xO2Zvcih2YXIgZD1jK2IvMjshKGM+PWQpJiZwYVtjPj4+MF07KSsrYztjPDw9MTtpZigzMjxjLWEmJmViKXJldHVybiBlYi5kZWNvZGUoQS5zdWJhcnJheShhPj4+MCxjPj4+MCkpO2M9XCJcIjtmb3IoZD0wOyEoZD49Yi8yKTsrK2Qpe3ZhciBlPUJbYSsyKmQ+Pj4xPj4+MF07aWYoMD09ZSlicmVhaztjKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpfXJldHVybiBjfSxnYj0oYSxiLGMpPT57dm9pZCAwPT09YyYmKGM9MjE0NzQ4MzY0Nyk7aWYoMj5jKXJldHVybiAwO2MtPTI7dmFyIGQ9YjtjPWM8MiphLmxlbmd0aD9jLzI6YS5sZW5ndGg7Zm9yKHZhciBlPTA7ZTxjOysrZSlCW2I+Pj4xPj4+MF09YS5jaGFyQ29kZUF0KGUpLGIrPTI7QltiPj4+MT4+PjBdPTA7cmV0dXJuIGItZH0saGI9YT0+MiphLmxlbmd0aCxpYj0oYSxiKT0+XG57Zm9yKHZhciBjPTAsZD1cIlwiOyEoYz49Yi80KTspe3ZhciBlPUVbYSs0KmM+Pj4yPj4+MF07aWYoMD09ZSlicmVhazsrK2M7NjU1MzY8PWU/KGUtPTY1NTM2LGQrPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUyOTZ8ZT4+MTAsNTYzMjB8ZSYxMDIzKSk6ZCs9U3RyaW5nLmZyb21DaGFyQ29kZShlKX1yZXR1cm4gZH0samI9KGEsYixjKT0+e2I+Pj49MDt2b2lkIDA9PT1jJiYoYz0yMTQ3NDgzNjQ3KTtpZig0PmMpcmV0dXJuIDA7dmFyIGQ9YjtjPWQrYy00O2Zvcih2YXIgZT0wO2U8YS5sZW5ndGg7KytlKXt2YXIgZj1hLmNoYXJDb2RlQXQoZSk7aWYoNTUyOTY8PWYmJjU3MzQzPj1mKXt2YXIgZz1hLmNoYXJDb2RlQXQoKytlKTtmPTY1NTM2KygoZiYxMDIzKTw8MTApfGcmMTAyM31FW2I+Pj4yPj4+MF09ZjtiKz00O2lmKGIrND5jKWJyZWFrfUVbYj4+PjI+Pj4wXT0wO3JldHVybiBiLWR9LGtiPWE9Pntmb3IodmFyIGI9MCxjPTA7YzxhLmxlbmd0aDsrK2Mpe3ZhciBkPWEuY2hhckNvZGVBdChjKTtcbjU1Mjk2PD1kJiY1NzM0Mz49ZCYmKytjO2IrPTR9cmV0dXJuIGJ9LG1iPShhLGIpPT57dmFyIGM9V2FbYV07aWYodm9pZCAwPT09Yyl0aHJvdyBhPWxiKGEpLGM9TShhKSxUKGEpLG5ldyBOKGIrXCIgaGFzIHVua25vd24gdHlwZSBcIitjKTtyZXR1cm4gY30sbmI9e30sb2I9YT0+e3ZhciBiPW5iW2FdO3JldHVybiB2b2lkIDA9PT1iP00oYSk6Yn0scGI9W10scWI9KCk9Plwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpLHJiPWE9Pnt2YXIgYj1wYi5sZW5ndGg7cGIucHVzaChhKTtyZXR1cm4gYn0sc2I9KGEsYik9Pntmb3IodmFyIGM9QXJyYXkoYSksZD0wO2Q8YTsrK2QpY1tkXT1tYihJW2IrNCpkPj4+Mj4+PjBdLFwicGFyYW1ldGVyIFwiK2QpO3JldHVybiBjfSx0Yj1hPT57aWYodm9pZCAwPT09YSlyZXR1cm5cIl91bmtub3duXCI7YT1hLnJlcGxhY2UoL1teYS16QS1aMC05X10vZyxcIiRcIik7dmFyIGI9YS5jaGFyQ29kZUF0KDApO1xucmV0dXJuIDQ4PD1iJiY1Nz49Yj9gXyR7YX1gOmF9LHViPXt9O2Z1bmN0aW9uIHZiKGEsYil7YT10YihhKTtyZXR1cm57W2FdOmZ1bmN0aW9uKCl7cmV0dXJuIGIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX1bYV19ZnVuY3Rpb24gd2IoYSl7dmFyIGI9RnVuY3Rpb247aWYoIShiIGluc3RhbmNlb2YgRnVuY3Rpb24pKXRocm93IG5ldyBUeXBlRXJyb3IoYG5ld18gY2FsbGVkIHdpdGggY29uc3RydWN0b3IgdHlwZSAke3R5cGVvZiBifSB3aGljaCBpcyBub3QgYSBmdW5jdGlvbmApO3ZhciBjPXZiKGIubmFtZXx8XCJ1bmtub3duRnVuY3Rpb25OYW1lXCIsZnVuY3Rpb24oKXt9KTtjLnByb3RvdHlwZT1iLnByb3RvdHlwZTtjPW5ldyBjO2E9Yi5hcHBseShjLGEpO3JldHVybiBhIGluc3RhbmNlb2YgT2JqZWN0P2E6Y31cbnZhciB4Yj1hPT57Zm9yKHZhciBiPVwiXCIsYz0wO2M8YTsrK2MpYis9KDAhPT1jP1wiLCBcIjpcIlwiKStcImFyZ1wiK2M7dmFyIGQ9XCJyZXR1cm4gZnVuY3Rpb24gZW12YWxfYWxsb2NhdG9yX1wiK2ErXCIoY29uc3RydWN0b3IsIGFyZ1R5cGVzLCBhcmdzKSB7XFxuICB2YXIgSEVBUFUzMiA9IGdldE1lbW9yeSgpO1xcblwiO2ZvcihjPTA7YzxhOysrYylkKz1cInZhciBhcmdUeXBlXCIrYytcIiA9IHJlcXVpcmVSZWdpc3RlcmVkVHlwZShIRUFQVTMyWygoYXJnVHlwZXMpPj4+MildLCAncGFyYW1ldGVyIFwiK2MrXCInKTtcXG52YXIgYXJnXCIrYytcIiA9IGFyZ1R5cGVcIitjK1wiLnJlYWRWYWx1ZUZyb21Qb2ludGVyKGFyZ3MpO1xcbmFyZ3MgKz0gYXJnVHlwZVwiK2MrXCJbJ2FyZ1BhY2tBZHZhbmNlJ107XFxuYXJnVHlwZXMgKz0gNDtcXG5cIjtyZXR1cm4obmV3IEZ1bmN0aW9uKFwicmVxdWlyZVJlZ2lzdGVyZWRUeXBlXCIsXCJNb2R1bGVcIixcInZhbHVlVG9IYW5kbGVcIixcImdldE1lbW9yeVwiLGQrKFwidmFyIG9iaiA9IG5ldyBjb25zdHJ1Y3RvcihcIitcbmIrXCIpO1xcbnJldHVybiB2YWx1ZVRvSGFuZGxlKG9iaik7XFxufVxcblwiKSkpKG1iLHAsUiwoKT0+SSl9LHliPXt9LFU9YT0+MD09PWElNCYmKDAhPT1hJTEwMHx8MD09PWElNDAwKSx6Yj1bMCwzMSw2MCw5MSwxMjEsMTUyLDE4MiwyMTMsMjQ0LDI3NCwzMDUsMzM1XSxBYj1bMCwzMSw1OSw5MCwxMjAsMTUxLDE4MSwyMTIsMjQzLDI3MywzMDQsMzM0XSxDYj1hPT57dmFyIGI9UmEoYSkrMSxjPUJiKGIpO2MmJlNhKGEsQSxjLGIpO3JldHVybiBjfSxEYj17fSxGYj0oKT0+e2lmKCFFYil7dmFyIGE9e1VTRVI6XCJ3ZWJfdXNlclwiLExPR05BTUU6XCJ3ZWJfdXNlclwiLFBBVEg6XCIvXCIsUFdEOlwiL1wiLEhPTUU6XCIvaG9tZS93ZWJfdXNlclwiLExBTkc6KFwib2JqZWN0XCI9PXR5cGVvZiBuYXZpZ2F0b3ImJm5hdmlnYXRvci5sYW5ndWFnZXMmJm5hdmlnYXRvci5sYW5ndWFnZXNbMF18fFwiQ1wiKS5yZXBsYWNlKFwiLVwiLFwiX1wiKStcIi5VVEYtOFwiLF86ZGF8fFwiLi90aGlzLnByb2dyYW1cIn0sYjtmb3IoYiBpbiBEYil2b2lkIDA9PT1cbkRiW2JdP2RlbGV0ZSBhW2JdOmFbYl09RGJbYl07dmFyIGM9W107Zm9yKGIgaW4gYSljLnB1c2goYCR7Yn09JHthW2JdfWApO0ViPWN9cmV0dXJuIEVifSxFYixHYj1bbnVsbCxbXSxbXV0sSGI9WzMxLDI5LDMxLDMwLDMxLDMwLDMxLDMxLDMwLDMxLDMwLDMxXSxJYj1bMzEsMjgsMzEsMzAsMzEsMzAsMzEsMzEsMzAsMzEsMzAsMzFdO2Z1bmN0aW9uIEpiKGEpe3ZhciBiPUFycmF5KFJhKGEpKzEpO1NhKGEsYiwwLGIubGVuZ3RoKTtyZXR1cm4gYn1cbmZ1bmN0aW9uIEtiKGEsYixjLGQpe2Z1bmN0aW9uIGUobCx3LHkpe2ZvcihsPVwibnVtYmVyXCI9PXR5cGVvZiBsP2wudG9TdHJpbmcoKTpsfHxcIlwiO2wubGVuZ3RoPHc7KWw9eVswXStsO3JldHVybiBsfWZ1bmN0aW9uIGYobCx3KXtyZXR1cm4gZShsLHcsXCIwXCIpfWZ1bmN0aW9uIGcobCx3KXtmdW5jdGlvbiB5KEMpe3JldHVybiAwPkM/LTE6MDxDPzE6MH12YXIgejswPT09KHo9eShsLmdldEZ1bGxZZWFyKCktdy5nZXRGdWxsWWVhcigpKSkmJjA9PT0oej15KGwuZ2V0TW9udGgoKS13LmdldE1vbnRoKCkpKSYmKHo9eShsLmdldERhdGUoKS13LmdldERhdGUoKSkpO3JldHVybiB6fWZ1bmN0aW9uIGgobCl7c3dpdGNoKGwuZ2V0RGF5KCkpe2Nhc2UgMDpyZXR1cm4gbmV3IERhdGUobC5nZXRGdWxsWWVhcigpLTEsMTEsMjkpO2Nhc2UgMTpyZXR1cm4gbDtjYXNlIDI6cmV0dXJuIG5ldyBEYXRlKGwuZ2V0RnVsbFllYXIoKSwwLDMpO2Nhc2UgMzpyZXR1cm4gbmV3IERhdGUobC5nZXRGdWxsWWVhcigpLFxuMCwyKTtjYXNlIDQ6cmV0dXJuIG5ldyBEYXRlKGwuZ2V0RnVsbFllYXIoKSwwLDEpO2Nhc2UgNTpyZXR1cm4gbmV3IERhdGUobC5nZXRGdWxsWWVhcigpLTEsMTEsMzEpO2Nhc2UgNjpyZXR1cm4gbmV3IERhdGUobC5nZXRGdWxsWWVhcigpLTEsMTEsMzApfX1mdW5jdGlvbiBrKGwpe3ZhciB3PWwub2U7Zm9yKGw9bmV3IERhdGUoKG5ldyBEYXRlKGwucGUrMTkwMCwwLDEpKS5nZXRUaW1lKCkpOzA8dzspe3ZhciB5PWwuZ2V0TW9udGgoKSx6PShVKGwuZ2V0RnVsbFllYXIoKSk/SGI6SWIpW3ldO2lmKHc+ei1sLmdldERhdGUoKSl3LT16LWwuZ2V0RGF0ZSgpKzEsbC5zZXREYXRlKDEpLDExPnk/bC5zZXRNb250aCh5KzEpOihsLnNldE1vbnRoKDApLGwuc2V0RnVsbFllYXIobC5nZXRGdWxsWWVhcigpKzEpKTtlbHNle2wuc2V0RGF0ZShsLmdldERhdGUoKSt3KTticmVha319eT1uZXcgRGF0ZShsLmdldEZ1bGxZZWFyKCkrMSwwLDQpO3c9aChuZXcgRGF0ZShsLmdldEZ1bGxZZWFyKCksXG4wLDQpKTt5PWgoeSk7cmV0dXJuIDA+PWcodyxsKT8wPj1nKHksbCk/bC5nZXRGdWxsWWVhcigpKzE6bC5nZXRGdWxsWWVhcigpOmwuZ2V0RnVsbFllYXIoKS0xfWE+Pj49MDtiPj4+PTA7Yz4+Pj0wO2Q+Pj49MDt2YXIgbT1JW2QrNDA+Pj4yPj4+MF07ZD17TWU6RVtkPj4+Mj4+PjBdLExlOkVbZCs0Pj4+Mj4+PjBdLHVlOkVbZCs4Pj4+Mj4+PjBdLHdlOkVbZCsxMj4+PjI+Pj4wXSx2ZTpFW2QrMTY+Pj4yPj4+MF0scGU6RVtkKzIwPj4+Mj4+PjBdLG1lOkVbZCsyND4+PjI+Pj4wXSxvZTpFW2QrMjg+Pj4yPj4+MF0sT2U6RVtkKzMyPj4+Mj4+PjBdLEtlOkVbZCszNj4+PjI+Pj4wXSxOZTptP1FhKG0pOlwiXCJ9O2M9UWEoYyk7bT17XCIlY1wiOlwiJWEgJWIgJWQgJUg6JU06JVMgJVlcIixcIiVEXCI6XCIlbS8lZC8leVwiLFwiJUZcIjpcIiVZLSVtLSVkXCIsXCIlaFwiOlwiJWJcIixcIiVyXCI6XCIlSTolTTolUyAlcFwiLFwiJVJcIjpcIiVIOiVNXCIsXCIlVFwiOlwiJUg6JU06JVNcIixcIiV4XCI6XCIlbS8lZC8leVwiLFwiJVhcIjpcIiVIOiVNOiVTXCIsXG5cIiVFY1wiOlwiJWNcIixcIiVFQ1wiOlwiJUNcIixcIiVFeFwiOlwiJW0vJWQvJXlcIixcIiVFWFwiOlwiJUg6JU06JVNcIixcIiVFeVwiOlwiJXlcIixcIiVFWVwiOlwiJVlcIixcIiVPZFwiOlwiJWRcIixcIiVPZVwiOlwiJWVcIixcIiVPSFwiOlwiJUhcIixcIiVPSVwiOlwiJUlcIixcIiVPbVwiOlwiJW1cIixcIiVPTVwiOlwiJU1cIixcIiVPU1wiOlwiJVNcIixcIiVPdVwiOlwiJXVcIixcIiVPVVwiOlwiJVVcIixcIiVPVlwiOlwiJVZcIixcIiVPd1wiOlwiJXdcIixcIiVPV1wiOlwiJVdcIixcIiVPeVwiOlwiJXlcIn07Zm9yKHZhciBuIGluIG0pYz1jLnJlcGxhY2UobmV3IFJlZ0V4cChuLFwiZ1wiKSxtW25dKTt2YXIgdT1cIlN1bmRheSBNb25kYXkgVHVlc2RheSBXZWRuZXNkYXkgVGh1cnNkYXkgRnJpZGF5IFNhdHVyZGF5XCIuc3BsaXQoXCIgXCIpLHY9XCJKYW51YXJ5IEZlYnJ1YXJ5IE1hcmNoIEFwcmlsIE1heSBKdW5lIEp1bHkgQXVndXN0IFNlcHRlbWJlciBPY3RvYmVyIE5vdmVtYmVyIERlY2VtYmVyXCIuc3BsaXQoXCIgXCIpO209e1wiJWFcIjpsPT51W2wubWVdLnN1YnN0cmluZygwLDMpLFwiJUFcIjpsPT51W2wubWVdLFwiJWJcIjpsPT5cbnZbbC52ZV0uc3Vic3RyaW5nKDAsMyksXCIlQlwiOmw9PnZbbC52ZV0sXCIlQ1wiOmw9PmYoKGwucGUrMTkwMCkvMTAwfDAsMiksXCIlZFwiOmw9PmYobC53ZSwyKSxcIiVlXCI6bD0+ZShsLndlLDIsXCIgXCIpLFwiJWdcIjpsPT5rKGwpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpLFwiJUdcIjpsPT5rKGwpLFwiJUhcIjpsPT5mKGwudWUsMiksXCIlSVwiOmw9PntsPWwudWU7MD09bD9sPTEyOjEyPGwmJihsLT0xMik7cmV0dXJuIGYobCwyKX0sXCIlalwiOmw9Pntmb3IodmFyIHc9MCx5PTA7eTw9bC52ZS0xO3crPShVKGwucGUrMTkwMCk/SGI6SWIpW3krK10pO3JldHVybiBmKGwud2UrdywzKX0sXCIlbVwiOmw9PmYobC52ZSsxLDIpLFwiJU1cIjpsPT5mKGwuTGUsMiksXCIlblwiOigpPT5cIlxcblwiLFwiJXBcIjpsPT4wPD1sLnVlJiYxMj5sLnVlP1wiQU1cIjpcIlBNXCIsXCIlU1wiOmw9PmYobC5NZSwyKSxcIiV0XCI6KCk9PlwiXFx0XCIsXCIldVwiOmw9PmwubWV8fDcsXCIlVVwiOmw9PmYoTWF0aC5mbG9vcigobC5vZSs3LWwubWUpLzcpLDIpLFwiJVZcIjpsPT5cbnt2YXIgdz1NYXRoLmZsb29yKChsLm9lKzctKGwubWUrNiklNykvNyk7Mj49KGwubWUrMzcxLWwub2UtMiklNyYmdysrO2lmKHcpNTM9PXcmJih5PShsLm1lKzM3MS1sLm9lKSU3LDQ9PXl8fDM9PXkmJlUobC5wZSl8fCh3PTEpKTtlbHNle3c9NTI7dmFyIHk9KGwubWUrNy1sLm9lLTEpJTc7KDQ9PXl8fDU9PXkmJlUobC5wZSU0MDAtMSkpJiZ3Kyt9cmV0dXJuIGYodywyKX0sXCIld1wiOmw9PmwubWUsXCIlV1wiOmw9PmYoTWF0aC5mbG9vcigobC5vZSs3LShsLm1lKzYpJTcpLzcpLDIpLFwiJXlcIjpsPT4obC5wZSsxOTAwKS50b1N0cmluZygpLnN1YnN0cmluZygyKSxcIiVZXCI6bD0+bC5wZSsxOTAwLFwiJXpcIjpsPT57bD1sLktlO3ZhciB3PTA8PWw7bD1NYXRoLmFicyhsKS82MDtyZXR1cm4odz9cIitcIjpcIi1cIikrU3RyaW5nKFwiMDAwMFwiKyhsLzYwKjEwMCtsJTYwKSkuc2xpY2UoLTQpfSxcIiVaXCI6bD0+bC5OZSxcIiUlXCI6KCk9PlwiJVwifTtjPWMucmVwbGFjZSgvJSUvZyxcIlxceDAwXFx4MDBcIik7Zm9yKG4gaW4gbSljLmluY2x1ZGVzKG4pJiZcbihjPWMucmVwbGFjZShuZXcgUmVnRXhwKG4sXCJnXCIpLG1bbl0oZCkpKTtjPWMucmVwbGFjZSgvXFwwXFwwL2csXCIlXCIpO249SmIoYyk7aWYobi5sZW5ndGg+YilyZXR1cm4gMDt4LnNldChuLGE+Pj4wKTtyZXR1cm4gbi5sZW5ndGgtMX1mb3IodmFyIExiPVtdLE1iLFY9YT0+e3ZhciBiPUxiW2FdO2J8fChhPj1MYi5sZW5ndGgmJihMYi5sZW5ndGg9YSsxKSxMYlthXT1iPU1iLmdldChhKSk7cmV0dXJuIGJ9LE5iPUFycmF5KDI1NiksT2I9MDsyNTY+T2I7KytPYilOYltPYl09U3RyaW5nLmZyb21DaGFyQ29kZShPYik7VWE9TmI7Tj1wLkJpbmRpbmdFcnJvcj1jbGFzcyBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKGEpe3N1cGVyKGEpO3RoaXMubmFtZT1cIkJpbmRpbmdFcnJvclwifX07cC5JbnRlcm5hbEVycm9yPWNsYXNzIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoYSl7c3VwZXIoYSk7dGhpcy5uYW1lPVwiSW50ZXJuYWxFcnJvclwifX07XG5PYmplY3QuYXNzaWduKCRhLnByb3RvdHlwZSx7Z2V0KGEpe3JldHVybiB0aGlzLm5lW2FdfSxoYXMoYSl7cmV0dXJuIHZvaWQgMCE9PXRoaXMubmVbYV19LHNlKGEpe3ZhciBiPXRoaXMueGUucG9wKCl8fHRoaXMubmUubGVuZ3RoO3RoaXMubmVbYl09YTtyZXR1cm4gYn0sdGUoYSl7dGhpcy5uZVthXT12b2lkIDA7dGhpcy54ZS5wdXNoKGEpfX0pO1AubmUucHVzaCh7dmFsdWU6dm9pZCAwfSx7dmFsdWU6bnVsbH0se3ZhbHVlOiEwfSx7dmFsdWU6ITF9KTtQLmxlPVAubmUubGVuZ3RoO3AuY291bnRfZW12YWxfaGFuZGxlcz0oKT0+e2Zvcih2YXIgYT0wLGI9UC5sZTtiPFAubmUubGVuZ3RoOysrYil2b2lkIDAhPT1QLm5lW2JdJiYrK2E7cmV0dXJuIGF9O1xudmFyICRlPXt1OmZ1bmN0aW9uKGEpe2E9bmV3IEphKGE+Pj4wKTthLkZlKCl8fChhLnplKCEwKSxJYS0tKTthLkFlKCExKTtIYS5wdXNoKGEpO1BiKGEucmUpO3JldHVybiBhLkdlKCl9LE06KCk9PntXKDAsMCk7dmFyIGE9SGEucG9wKCk7UWIoYS5yZSk7TD0wfSxhOmZ1bmN0aW9uKCl7cmV0dXJuIE5hKFtdKX0sbDpmdW5jdGlvbihhKXtyZXR1cm4gTmEoW2E+Pj4wXSl9LHg6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gTmEoW2E+Pj4wLGI+Pj4wXSl9LHE6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBOYShbYT4+PjAsYj4+PjAsYz4+PjBdKX0seWI6KCk9Pnt2YXIgYT1IYS5wb3AoKTthfHxtYShcIm5vIGV4Y2VwdGlvbiB0byB0aHJvd1wiKTt2YXIgYj1hLnJlO2EuQmUoKXx8KEhhLnB1c2goYSksYS5BZSghMCksYS56ZSghMSksSWErKyk7TD1iO3Rocm93IEw7fSx0OmZ1bmN0aW9uKGEsYixjKXthPj4+PTA7KG5ldyBKYShhKSkuSGUoYj4+PjAsYz4+PjApO0w9YTtJYSsrO3Rocm93IEw7fSxSYTooKT0+XG5JYSxnOmZ1bmN0aW9uKGEpe0x8fChMPWE+Pj4wKTt0aHJvdyBMO30semI6ZnVuY3Rpb24oKXtyZXR1cm4gMH0sVmM6ZnVuY3Rpb24oKXt9LEVjOmZ1bmN0aW9uKCl7fSxHYzpmdW5jdGlvbigpe30seWM6ZnVuY3Rpb24oKXtyZXR1cm4gMH0sVGM6ZnVuY3Rpb24oKXt9LE5jOmZ1bmN0aW9uKCl7fSxTYzpmdW5jdGlvbigpe30sU2I6ZnVuY3Rpb24oKXt9LEZjOmZ1bmN0aW9uKCl7fSxDYzpmdW5jdGlvbigpe30sVWM6ZnVuY3Rpb24oKXt9LERjOmZ1bmN0aW9uKCl7fSxWYjpmdW5jdGlvbihhLGIsYyxkLGUpe2I+Pj49MDtiPU0oYik7dmFyIGY9LTEhPWIuaW5kZXhPZihcInVcIik7ZiYmKGU9KDFuPDw2NG4pLTFuKTtPKGE+Pj4wLHtuYW1lOmIsZnJvbVdpcmVUeXBlOmc9PmcsdG9XaXJlVHlwZTpmdW5jdGlvbihnLGgpe2lmKFwiYmlnaW50XCIhPXR5cGVvZiBoJiZcIm51bWJlclwiIT10eXBlb2YgaCl0aHJvdyBuZXcgVHlwZUVycm9yKGBDYW5ub3QgY29udmVydCBcIiR7VGEoaCl9XCIgdG8gJHt0aGlzLm5hbWV9YCk7XG5pZihoPGR8fGg+ZSl0aHJvdyBuZXcgVHlwZUVycm9yKGBQYXNzaW5nIGEgbnVtYmVyIFwiJHtUYShoKX1cIiBmcm9tIEpTIHNpZGUgdG8gQy9DKysgc2lkZSB0byBhbiBhcmd1bWVudCBvZiB0eXBlIFwiJHtifVwiLCB3aGljaCBpcyBvdXRzaWRlIHRoZSB2YWxpZCByYW5nZSBbJHtkfSwgJHtlfV0hYCk7cmV0dXJuIGh9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6WmEoYixjPj4+MCwhZikscWU6bnVsbH0pfSxZYzpmdW5jdGlvbihhLGIsYyxkKXtiPU0oYj4+PjApO08oYT4+PjAse25hbWU6Yixmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7cmV0dXJuISFlfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGUsZil7cmV0dXJuIGY/YzpkfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShBW2U+Pj4wXSl9LHFlOm51bGx9KX0sWGM6ZnVuY3Rpb24oYSxiKXtiPU0oYj4+PjApO08oYT4+PjAse25hbWU6YixcbmZyb21XaXJlVHlwZTpjPT57dmFyIGQ9UShjKTthYihjKTtyZXR1cm4gZH0sdG9XaXJlVHlwZTooYyxkKT0+UihkKSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmJiLHFlOm51bGx9KX0sVWI6ZnVuY3Rpb24oYSxiLGMpe2I9TShiPj4+MCk7TyhhPj4+MCx7bmFtZTpiLGZyb21XaXJlVHlwZTpkPT5kLHRvV2lyZVR5cGU6KGQsZSk9PmUsYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpjYihiLGM+Pj4wKSxxZTpudWxsfSl9LHVhOmZ1bmN0aW9uKGEsYixjLGQsZSl7YT4+Pj0wO2M+Pj49MDtiPU0oYj4+PjApOy0xPT09ZSYmKGU9NDI5NDk2NzI5NSk7ZT1oPT5oO2lmKDA9PT1kKXt2YXIgZj0zMi04KmM7ZT1oPT5oPDxmPj4+Zn12YXIgZz1iLmluY2x1ZGVzKFwidW5zaWduZWRcIik/ZnVuY3Rpb24oaCxrKXtyZXR1cm4gaz4+PjB9OmZ1bmN0aW9uKGgsayl7cmV0dXJuIGt9O08oYSx7bmFtZTpiLGZyb21XaXJlVHlwZTplLHRvV2lyZVR5cGU6ZyxhcmdQYWNrQWR2YW5jZTo4LFxucmVhZFZhbHVlRnJvbVBvaW50ZXI6WmEoYixjLDAhPT1kKSxxZTpudWxsfSl9LFo6ZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGQoZil7cmV0dXJuIG5ldyBlKHguYnVmZmVyLElbZis0Pj4+Mj4+PjBdLElbZj4+PjI+Pj4wXSl9dmFyIGU9W0ludDhBcnJheSxVaW50OEFycmF5LEludDE2QXJyYXksVWludDE2QXJyYXksSW50MzJBcnJheSxVaW50MzJBcnJheSxGbG9hdDMyQXJyYXksRmxvYXQ2NEFycmF5LEJpZ0ludDY0QXJyYXksQmlnVWludDY0QXJyYXldW2JdO2M9TShjPj4+MCk7TyhhPj4+MCx7bmFtZTpjLGZyb21XaXJlVHlwZTpkLGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6ZH0se0NlOiEwfSl9LFdiOmZ1bmN0aW9uKGEsYil7Yj1NKGI+Pj4wKTt2YXIgYz1cInN0ZDo6c3RyaW5nXCI9PT1iO08oYT4+PjAse25hbWU6Yixmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZCl7dmFyIGU9SVtkPj4+Mj4+PjBdLGY9ZCs0O2lmKGMpZm9yKHZhciBnPWYsaD0wO2g8PWU7KytoKXt2YXIgaz1cbmYraDtpZihoPT1lfHwwPT1BW2s+Pj4wXSl7Zz1RYShnLGstZyk7aWYodm9pZCAwPT09bSl2YXIgbT1nO2Vsc2UgbSs9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSxtKz1nO2c9aysxfX1lbHNle209QXJyYXkoZSk7Zm9yKGg9MDtoPGU7KytoKW1baF09U3RyaW5nLmZyb21DaGFyQ29kZShBW2YraD4+PjBdKTttPW0uam9pbihcIlwiKX1UKGQpO3JldHVybiBtfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGQsZSl7ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyJiYoZT1uZXcgVWludDhBcnJheShlKSk7dmFyIGY9XCJzdHJpbmdcIj09dHlwZW9mIGU7aWYoIShmfHxlIGluc3RhbmNlb2YgVWludDhBcnJheXx8ZSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHxlIGluc3RhbmNlb2YgSW50OEFycmF5KSl0aHJvdyBuZXcgTihcIkNhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gc3RkOjpzdHJpbmdcIik7dmFyIGc9YyYmZj9SYShlKTplLmxlbmd0aDt2YXIgaD1CYig0K2crMSksaz1oKzQ7SVtoPj4+Mj4+PjBdPVxuZztpZihjJiZmKVNhKGUsQSxrLGcrMSk7ZWxzZSBpZihmKWZvcihmPTA7ZjxnOysrZil7dmFyIG09ZS5jaGFyQ29kZUF0KGYpO2lmKDI1NTxtKXRocm93IFQoayksbmV3IE4oXCJTdHJpbmcgaGFzIFVURi0xNiBjb2RlIHVuaXRzIHRoYXQgZG8gbm90IGZpdCBpbiA4IGJpdHNcIik7QVtrK2Y+Pj4wXT1tfWVsc2UgZm9yKGY9MDtmPGc7KytmKUFbaytmPj4+MF09ZVtmXTtudWxsIT09ZCYmZC5wdXNoKFQsaCk7cmV0dXJuIGh9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6ZGIscWUoZCl7VChkKX19KX0sQmI6ZnVuY3Rpb24oYSxiLGMpe2I+Pj49MDtjPj4+PTA7Yz1NKGMpO2lmKDI9PT1iKXt2YXIgZD1mYjt2YXIgZT1nYjt2YXIgZj1oYjt2YXIgZz0oKT0+cGE7dmFyIGg9MX1lbHNlIDQ9PT1iJiYoZD1pYixlPWpiLGY9a2IsZz0oKT0+SSxoPTIpO08oYT4+PjAse25hbWU6Yyxmcm9tV2lyZVR5cGU6az0+e2Zvcih2YXIgbT1JW2s+Pj4yPj4+MF0sbj1nKCksdSx2PWsrXG40LGw9MDtsPD1tOysrbCl7dmFyIHc9ays0K2wqYjtpZihsPT1tfHwwPT1uW3c+Pj5oXSl2PWQodix3LXYpLHZvaWQgMD09PXU/dT12Oih1Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKDApLHUrPXYpLHY9dytifVQoayk7cmV0dXJuIHV9LHRvV2lyZVR5cGU6KGssbSk9PntpZihcInN0cmluZ1wiIT10eXBlb2YgbSl0aHJvdyBuZXcgTihgQ2Fubm90IHBhc3Mgbm9uLXN0cmluZyB0byBDKysgc3RyaW5nIHR5cGUgJHtjfWApO3ZhciBuPWYobSksdT1CYig0K24rYik7SVt1Pj4+Ml09bj4+aDtlKG0sdSs0LG4rYik7bnVsbCE9PWsmJmsucHVzaChULHUpO3JldHVybiB1fSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmJiLHFlKGspe1Qoayl9fSl9LGFkOmZ1bmN0aW9uKGEsYil7Yj1NKGI+Pj4wKTtPKGE+Pj4wLHtEZTohMCxuYW1lOmIsYXJnUGFja0FkdmFuY2U6MCxmcm9tV2lyZVR5cGU6KCk9Pnt9LHRvV2lyZVR5cGU6KCk9Pnt9fSl9LFdjOigpPT4hMCxwZDpmdW5jdGlvbihhLFxuYixjKXtiPj4+PTA7Yz4+Pj0wO2E9UShhPj4+MCk7Yj1tYihiLFwiZW12YWw6OmFzXCIpO3ZhciBkPVtdLGU9UihkKTtJW2M+Pj4yPj4+MF09ZTtyZXR1cm4gYi50b1dpcmVUeXBlKGQsYSl9LGxhOmZ1bmN0aW9uKGEsYixjLGQsZSl7Yz4+Pj0wO2Q+Pj49MDtlPj4+PTA7YT1wYlthPj4+MF07Yj1RKGI+Pj4wKTtjPW9iKGMpO3ZhciBmPVtdO0lbZD4+PjI+Pj4wXT1SKGYpO3JldHVybiBhKGIsYyxmLGUpfSxmZDpmdW5jdGlvbihhLGIsYyxkKXtjPj4+PTA7ZD4+Pj0wO2E9cGJbYT4+PjBdO2I9UShiPj4+MCk7Yz1vYihjKTthKGIsYyxudWxsLGQpfSx4YzphYixxZDpmdW5jdGlvbihhLGIpe2I+Pj49MDthPVEoYT4+PjApO2I9UShiKTtyZXR1cm4gYT09Yn0sd2M6ZnVuY3Rpb24oYSl7YT4+Pj0wO2lmKDA9PT1hKXJldHVybiBSKHFiKCkpO2E9b2IoYSk7cmV0dXJuIFIocWIoKVthXSl9LGphOmZ1bmN0aW9uKGEsYil7dmFyIGM9c2IoYSxiPj4+MCksZD1jWzBdO2I9ZC5uYW1lK1wiXyRcIitjLnNsaWNlKDEpLm1hcChmdW5jdGlvbihuKXtyZXR1cm4gbi5uYW1lfSkuam9pbihcIl9cIikrXG5cIiRcIjt2YXIgZT11YltiXTtpZih2b2lkIDAhPT1lKXJldHVybiBlO2U9W1wicmV0VHlwZVwiXTtmb3IodmFyIGY9W2RdLGc9XCJcIixoPTA7aDxhLTE7KytoKWcrPSgwIT09aD9cIiwgXCI6XCJcIikrXCJhcmdcIitoLGUucHVzaChcImFyZ1R5cGVcIitoKSxmLnB1c2goY1sxK2hdKTt2YXIgaz1cInJldHVybiBmdW5jdGlvbiBcIit0YihcIm1ldGhvZENhbGxlcl9cIitiKStcIihoYW5kbGUsIG5hbWUsIGRlc3RydWN0b3JzLCBhcmdzKSB7XFxuXCIsbT0wO2ZvcihoPTA7aDxhLTE7KytoKWsrPVwiICAgIHZhciBhcmdcIitoK1wiID0gYXJnVHlwZVwiK2grXCIucmVhZFZhbHVlRnJvbVBvaW50ZXIoYXJnc1wiKyhtP1wiK1wiK206XCJcIikrXCIpO1xcblwiLG0rPWNbaCsxXS5hcmdQYWNrQWR2YW5jZTtrKz1cIiAgICB2YXIgcnYgPSBoYW5kbGVbbmFtZV0oXCIrZytcIik7XFxuXCI7Zm9yKGg9MDtoPGEtMTsrK2gpY1toKzFdLmRlbGV0ZU9iamVjdCYmKGsrPVwiICAgIGFyZ1R5cGVcIitoK1wiLmRlbGV0ZU9iamVjdChhcmdcIitoK1wiKTtcXG5cIik7ZC5EZXx8XG4oays9XCIgICAgcmV0dXJuIHJldFR5cGUudG9XaXJlVHlwZShkZXN0cnVjdG9ycywgcnYpO1xcblwiKTtlLnB1c2goaytcIn07XFxuXCIpO2E9d2IoZSkuYXBwbHkobnVsbCxmKTtlPXJiKGEpO3JldHVybiB1YltiXT1lfSxqZDpmdW5jdGlvbihhLGIpe2I+Pj49MDthPVEoYT4+PjApO2I9UShiKTtyZXR1cm4gUihhW2JdKX0sUDpmdW5jdGlvbihhKXthPj4+PTA7NDxhJiYoUC5nZXQoYSkueWUrPTEpfSxyZDpmdW5jdGlvbihhLGIsYyxkKXtjPj4+PTA7ZD4+Pj0wO2E9UShhPj4+MCk7dmFyIGU9eWJbYl07ZXx8KGU9eGIoYikseWJbYl09ZSk7cmV0dXJuIGUoYSxjLGQpfSxpZDpmdW5jdGlvbigpe3JldHVybiBSKFtdKX0sbWQ6ZnVuY3Rpb24oYSl7YT1RKGE+Pj4wKTtmb3IodmFyIGI9QXJyYXkoYS5sZW5ndGgpLGM9MDtjPGEubGVuZ3RoO2MrKyliW2NdPWFbY107cmV0dXJuIFIoYil9LFg6ZnVuY3Rpb24oYSl7cmV0dXJuIFIob2IoYT4+PjApKX0sUWE6ZnVuY3Rpb24oKXtyZXR1cm4gUih7fSl9LFxuc2Q6ZnVuY3Rpb24oYSl7YT4+Pj0wO2Zvcih2YXIgYj1RKGEpO2IubGVuZ3RoOyl7dmFyIGM9Yi5wb3AoKTtiLnBvcCgpKGMpfWFiKGEpfSx1ZDpmdW5jdGlvbihhLGIsYyl7Yj4+Pj0wO2M+Pj49MDthPVEoYT4+PjApO2I9UShiKTtjPVEoYyk7YVtiXT1jfSx3YjpmdW5jdGlvbihhLGIpe2I+Pj49MDthPW1iKGE+Pj4wLFwiX2VtdmFsX3Rha2VfdmFsdWVcIik7YT1hLnJlYWRWYWx1ZUZyb21Qb2ludGVyKGIpO3JldHVybiBSKGEpfSxLYzpmdW5jdGlvbihhLGIpe2E9LTkwMDcxOTkyNTQ3NDA5OTI+YXx8OTAwNzE5OTI1NDc0MDk5MjxhP05hTjpOdW1iZXIoYSk7Yj4+Pj0wO2E9bmV3IERhdGUoMUUzKmEpO0VbYj4+PjI+Pj4wXT1hLmdldFVUQ1NlY29uZHMoKTtFW2IrND4+PjI+Pj4wXT1hLmdldFVUQ01pbnV0ZXMoKTtFW2IrOD4+PjI+Pj4wXT1hLmdldFVUQ0hvdXJzKCk7RVtiKzEyPj4+Mj4+PjBdPWEuZ2V0VVRDRGF0ZSgpO0VbYisxNj4+PjI+Pj4wXT1hLmdldFVUQ01vbnRoKCk7RVtiK1xuMjA+Pj4yPj4+MF09YS5nZXRVVENGdWxsWWVhcigpLTE5MDA7RVtiKzI0Pj4+Mj4+PjBdPWEuZ2V0VVRDRGF5KCk7RVtiKzI4Pj4+Mj4+PjBdPShhLmdldFRpbWUoKS1EYXRlLlVUQyhhLmdldFVUQ0Z1bGxZZWFyKCksMCwxLDAsMCwwLDApKS84NjRFNXwwfSxMYzpmdW5jdGlvbihhLGIpe2E9LTkwMDcxOTkyNTQ3NDA5OTI+YXx8OTAwNzE5OTI1NDc0MDk5MjxhP05hTjpOdW1iZXIoYSk7Yj4+Pj0wO2E9bmV3IERhdGUoMUUzKmEpO0VbYj4+PjI+Pj4wXT1hLmdldFNlY29uZHMoKTtFW2IrND4+PjI+Pj4wXT1hLmdldE1pbnV0ZXMoKTtFW2IrOD4+PjI+Pj4wXT1hLmdldEhvdXJzKCk7RVtiKzEyPj4+Mj4+PjBdPWEuZ2V0RGF0ZSgpO0VbYisxNj4+PjI+Pj4wXT1hLmdldE1vbnRoKCk7RVtiKzIwPj4+Mj4+PjBdPWEuZ2V0RnVsbFllYXIoKS0xOTAwO0VbYisyND4+PjI+Pj4wXT1hLmdldERheSgpO0VbYisyOD4+PjI+Pj4wXT0oVShhLmdldEZ1bGxZZWFyKCkpP3piOkFiKVthLmdldE1vbnRoKCldK1xuYS5nZXREYXRlKCktMXwwO0VbYiszNj4+PjI+Pj4wXT0tKDYwKmEuZ2V0VGltZXpvbmVPZmZzZXQoKSk7dmFyIGM9KG5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSw2LDEpKS5nZXRUaW1lem9uZU9mZnNldCgpLGQ9KG5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSwwLDEpKS5nZXRUaW1lem9uZU9mZnNldCgpO0VbYiszMj4+PjI+Pj4wXT0oYyE9ZCYmYS5nZXRUaW1lem9uZU9mZnNldCgpPT1NYXRoLm1pbihkLGMpKXwwfSxNYzpmdW5jdGlvbihhKXthPj4+PTA7dmFyIGI9bmV3IERhdGUoRVthKzIwPj4+Mj4+PjBdKzE5MDAsRVthKzE2Pj4+Mj4+PjBdLEVbYSsxMj4+PjI+Pj4wXSxFW2ErOD4+PjI+Pj4wXSxFW2ErND4+PjI+Pj4wXSxFW2E+Pj4yPj4+MF0sMCksYz1FW2ErMzI+Pj4yPj4+MF0sZD1iLmdldFRpbWV6b25lT2Zmc2V0KCksZT0obmV3IERhdGUoYi5nZXRGdWxsWWVhcigpLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksZj0obmV3IERhdGUoYi5nZXRGdWxsWWVhcigpLDAsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksXG5nPU1hdGgubWluKGYsZSk7MD5jP0VbYSszMj4+PjI+Pj4wXT1OdW1iZXIoZSE9ZiYmZz09ZCk6MDxjIT0oZz09ZCkmJihlPU1hdGgubWF4KGYsZSksYi5zZXRUaW1lKGIuZ2V0VGltZSgpKzZFNCooKDA8Yz9nOmUpLWQpKSk7RVthKzI0Pj4+Mj4+PjBdPWIuZ2V0RGF5KCk7RVthKzI4Pj4+Mj4+PjBdPShVKGIuZ2V0RnVsbFllYXIoKSk/emI6QWIpW2IuZ2V0TW9udGgoKV0rYi5nZXREYXRlKCktMXwwO0VbYT4+PjI+Pj4wXT1iLmdldFNlY29uZHMoKTtFW2ErND4+PjI+Pj4wXT1iLmdldE1pbnV0ZXMoKTtFW2ErOD4+PjI+Pj4wXT1iLmdldEhvdXJzKCk7RVthKzEyPj4+Mj4+PjBdPWIuZ2V0RGF0ZSgpO0VbYSsxNj4+PjI+Pj4wXT1iLmdldE1vbnRoKCk7RVthKzIwPj4+Mj4+PjBdPWIuZ2V0WWVhcigpO3JldHVybiBCaWdJbnQoYi5nZXRUaW1lKCkvMUUzKX0sSGM6ZnVuY3Rpb24oKXtyZXR1cm4tNTJ9LEpjOmZ1bmN0aW9uKCl7fSxBYzpmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChrKXtyZXR1cm4oaz1cbmsudG9UaW1lU3RyaW5nKCkubWF0Y2goL1xcKChbQS1aYS16IF0rKVxcKSQvKSk/a1sxXTpcIkdNVFwifWM+Pj49MDt2YXIgZT0obmV3IERhdGUpLmdldEZ1bGxZZWFyKCksZj1uZXcgRGF0ZShlLDAsMSksZz1uZXcgRGF0ZShlLDYsMSk7ZT1mLmdldFRpbWV6b25lT2Zmc2V0KCk7dmFyIGg9Zy5nZXRUaW1lem9uZU9mZnNldCgpO0lbYT4+PjA+Pj4yPj4+MF09NjAqTWF0aC5tYXgoZSxoKTtFW2I+Pj4wPj4+Mj4+PjBdPU51bWJlcihlIT1oKTthPWQoZik7Yj1kKGcpO2E9Q2IoYSk7Yj1DYihiKTtoPGU/KElbYz4+PjI+Pj4wXT1hLElbYys0Pj4+Mj4+PjBdPWIpOihJW2M+Pj4yPj4+MF09YixJW2MrND4+PjI+Pj4wXT1hKX0saGI6KCk9PnttYShcIlwiKX0sVGI6KCk9PkRhdGUubm93KCksQmM6ZnVuY3Rpb24oKXtyZXR1cm4gNDI5NDkwMTc2MH0sZGE6KCk9PnBlcmZvcm1hbmNlLm5vdygpLFJjOmZ1bmN0aW9uKGEsYixjKXtiPj4+PTA7cmV0dXJuIEEuY29weVdpdGhpbihhPj4+MD4+PjAsYj4+PlxuMCxiKyhjPj4+MCk+Pj4wKX0semM6ZnVuY3Rpb24oYSl7YT4+Pj0wO3ZhciBiPUEubGVuZ3RoO2lmKDQyOTQ5MDE3NjA8YSlyZXR1cm4hMTtmb3IodmFyIGM9MTs0Pj1jO2MqPTIpe3ZhciBkPWIqKDErLjIvYyk7ZD1NYXRoLm1pbihkLGErMTAwNjYzMjk2KTt2YXIgZT1NYXRoO2Q9TWF0aC5tYXgoYSxkKTthOntlPShlLm1pbi5jYWxsKGUsNDI5NDkwMTc2MCxkKyg2NTUzNi1kJTY1NTM2KSU2NTUzNiktbmEuYnVmZmVyLmJ5dGVMZW5ndGgrNjU1MzUpLzY1NTM2O3RyeXtuYS5ncm93KGUpO3VhKCk7dmFyIGY9MTticmVhayBhfWNhdGNoKGcpe31mPXZvaWQgMH1pZihmKXJldHVybiEwfXJldHVybiExfSxQYzpmdW5jdGlvbihhLGIpe2E+Pj49MDtiPj4+PTA7dmFyIGM9MDtGYigpLmZvckVhY2goKGQsZSk9Pnt2YXIgZj1iK2M7ZT1JW2ErNCplPj4+Mj4+PjBdPWY7Zm9yKGY9MDtmPGQubGVuZ3RoOysrZil4W2UrKz4+PjA+Pj4wXT1kLmNoYXJDb2RlQXQoZik7eFtlPj4+MD4+PjBdPTA7XG5jKz1kLmxlbmd0aCsxfSk7cmV0dXJuIDB9LFFjOmZ1bmN0aW9uKGEsYil7YT4+Pj0wO2I+Pj49MDt2YXIgYz1GYigpO0lbYT4+PjI+Pj4wXT1jLmxlbmd0aDt2YXIgZD0wO2MuZm9yRWFjaChlPT5kKz1lLmxlbmd0aCsxKTtJW2I+Pj4yPj4+MF09ZDtyZXR1cm4gMH0sQWI6KCk9PjUyLFJiOmZ1bmN0aW9uKCl7cmV0dXJuIDUyfSxPYzpmdW5jdGlvbigpe3JldHVybiA3MH0sUWI6ZnVuY3Rpb24oYSxiLGMsZCl7Yj4+Pj0wO2M+Pj49MDtkPj4+PTA7Zm9yKHZhciBlPTAsZj0wO2Y8YztmKyspe3ZhciBnPUlbYj4+PjI+Pj4wXSxoPUlbYis0Pj4+Mj4+PjBdO2IrPTg7Zm9yKHZhciBrPTA7azxoO2srKyl7dmFyIG09QVtnK2s+Pj4wXSxuPUdiW2FdOzA9PT1tfHwxMD09PW0/KCgxPT09YT9sYTp0KShQYShuLDApKSxuLmxlbmd0aD0wKTpuLnB1c2gobSl9ZSs9aH1JW2Q+Pj4yPj4+MF09ZTtyZXR1cm4gMH0sZ2I6UmIsWmM6U2IscmE6VGIsRTpVYixwYTpWYixlYTpXYixfYzpYYixjZDpZYixcbk46WmIsejokYixiOmFjLCRiOmJjLHNhOmNjLGU6ZGMsRGI6ZWMsaDpmYyxXOmdjLGk6aGMsJGM6aWMsajpqYyxyOmtjLHM6bGMsbzptYyx6YTpuYyxVYTpvYyxnYTpwYyxPYjpxYyxZYTpyYyxIYjpzYyxsYjp0YyxlYzp1YyxyYzp2YyxiYzp3YyxjYzp4YyxYYjp5YyxpYTp6YyxmYjpBYyx3YTpCYyxDYjpDYyxiYTpEYyxkYzpFYyxPYTpGYyxEOkdjLEs6SGMsRmI6SWMsaGQ6SmMsb2E6S2MsTDpMYyxfOk1jLFU6TmMseTpPYyxFYjpQYyxhYzpRYyxCOlJjLEdiOlNjLGdkOlRjLFBhOlVjLGFiOlZjLGZjOldjLFliOlhjLExiOlljLE86WmMsRjokYyxDOmFkLGpiOmJkLFI6Y2QsZDpkZCxXYTplZCxrOmZkLHZhOmdkLFZhOmhkLHRiOmpkLGY6a2Qsc2M6bGQsYWE6bWQsYmI6bmQseGE6b2Qsa2I6cGQsZGI6cWQsYzpyZCxwYzpzZCxrZDp0ZCxtOnVkLG5jOnZkLG46d2QscWM6eGQsbWM6eWQsbmQ6emQscDpBZCxNYTpCZCxyYjpDZCxMYTpEZCxKYjpFZCxBOkZkLEg6R2QsVjpIZCxUYTpJZCxcbmpjOkpkLGNiOktkLHRhOkxkLG1hOk1kLFE6TmQsWmE6T2QsR2E6UGQsaWI6UWQsQ2E6UmQsaGM6U2QsQmE6VGQsRGE6VWQsdGQ6VmQsbmE6V2QsbGQ6WGQsSGE6WWQsRmE6WmQsdGM6JGQsbGM6YWUsRWE6YmUsSWE6Y2UsbmI6ZGUsZmE6ZWUseWE6ZmUsZ2M6Z2Usa2M6aGUsSWI6aWUsQWE6amUsa2E6a2UseGI6bGUsZWQ6bWUsVDpuZSx1YjpvZSwkYTpwZSxTYTpxZSxlYjpyZSxJOnNlLFM6dGUsdmI6dWUsZGQ6dmUsJDp3ZSxtYjp4ZSxoYTp5ZSxaYjp6ZSx2ZDpBZSx3OkJlLF9hOkNlLG9kOkRlLE1iOkVlLGljOkZlLHZjOkdlLE5iOkhlLEtiOkllLFhhOkplLHVjOktlLFBiOkxlLEphOk1lLF9iOk5lLFk6T2Usb2M6UGUsSjpRZSxiZDpSZSxzYjpTZSxxYTpUZSxHOlVlLHBiOlZlLEthOldlLE5hOlhlLG9iOlllLHFiOlplLHY6ZnVuY3Rpb24oYSl7cmV0dXJuIGE+Pj4wfSxJYzpLYixjYTpmdW5jdGlvbihhLGIsYyxkKXtyZXR1cm4gS2IoYT4+PjAsYj4+PjAsYz4+PjAsZD4+PjApfX0sXG5YPWZ1bmN0aW9uKCl7dmFyIGE9e2E6JGV9O0orKztGYShhLGZ1bmN0aW9uKGIpe1g9Yi5pbnN0YW5jZS5leHBvcnRzO1g9YWYoKTtuYT1YLndkO3VhKCk7TWI9WC5iZTt3YS51bnNoaWZ0KFgueGQpO0otLTswPT1KJiYobnVsbCE9PXlhJiYoY2xlYXJJbnRlcnZhbCh5YSkseWE9bnVsbCksSyYmKGI9SyxLPW51bGwsYigpKSl9KS5jYXRjaChiYSk7cmV0dXJue319KCk7cC5fT3J0SW5pdD0oYSxiKT0+KHAuX09ydEluaXQ9WC55ZCkoYSxiKTtwLl9PcnRHZXRMYXN0RXJyb3I9KGEsYik9PihwLl9PcnRHZXRMYXN0RXJyb3I9WC56ZCkoYSxiKTtwLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucz0oYSxiLGMsZCxlLGYsZyxoLGssbSk9PihwLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucz1YLkFkKShhLGIsYyxkLGUsZixnLGgsayxtKTtwLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcj0oYSxiKT0+KHAuX09ydEFwcGVuZEV4ZWN1dGlvblByb3ZpZGVyPVguQmQpKGEsYik7XG5wLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGU9KGEsYixjKT0+KHAuX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZT1YLkNkKShhLGIsYyk7cC5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5PShhLGIsYyk9PihwLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnk9WC5EZCkoYSxiLGMpO3AuX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucz1hPT4ocC5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zPVguRWQpKGEpO3AuX09ydENyZWF0ZVNlc3Npb249KGEsYixjKT0+KHAuX09ydENyZWF0ZVNlc3Npb249WC5GZCkoYSxiLGMpO3AuX09ydFJlbGVhc2VTZXNzaW9uPWE9PihwLl9PcnRSZWxlYXNlU2Vzc2lvbj1YLkdkKShhKTtwLl9PcnRHZXRJbnB1dE91dHB1dENvdW50PShhLGIsYyk9PihwLl9PcnRHZXRJbnB1dE91dHB1dENvdW50PVguSGQpKGEsYixjKTtwLl9PcnRHZXRJbnB1dE5hbWU9KGEsYik9PihwLl9PcnRHZXRJbnB1dE5hbWU9WC5JZCkoYSxiKTtcbnAuX09ydEdldE91dHB1dE5hbWU9KGEsYik9PihwLl9PcnRHZXRPdXRwdXROYW1lPVguSmQpKGEsYik7cC5fT3J0RnJlZT1hPT4ocC5fT3J0RnJlZT1YLktkKShhKTtwLl9PcnRDcmVhdGVUZW5zb3I9KGEsYixjLGQsZSxmKT0+KHAuX09ydENyZWF0ZVRlbnNvcj1YLkxkKShhLGIsYyxkLGUsZik7cC5fT3J0R2V0VGVuc29yRGF0YT0oYSxiLGMsZCxlKT0+KHAuX09ydEdldFRlbnNvckRhdGE9WC5NZCkoYSxiLGMsZCxlKTtwLl9PcnRSZWxlYXNlVGVuc29yPWE9PihwLl9PcnRSZWxlYXNlVGVuc29yPVguTmQpKGEpO3AuX09ydENyZWF0ZVJ1bk9wdGlvbnM9KGEsYixjLGQpPT4ocC5fT3J0Q3JlYXRlUnVuT3B0aW9ucz1YLk9kKShhLGIsYyxkKTtwLl9PcnRBZGRSdW5Db25maWdFbnRyeT0oYSxiLGMpPT4ocC5fT3J0QWRkUnVuQ29uZmlnRW50cnk9WC5QZCkoYSxiLGMpO3AuX09ydFJlbGVhc2VSdW5PcHRpb25zPWE9PihwLl9PcnRSZWxlYXNlUnVuT3B0aW9ucz1YLlFkKShhKTtcbnAuX09ydENyZWF0ZUJpbmRpbmc9YT0+KHAuX09ydENyZWF0ZUJpbmRpbmc9WC5SZCkoYSk7cC5fT3J0QmluZElucHV0PShhLGIsYyk9PihwLl9PcnRCaW5kSW5wdXQ9WC5TZCkoYSxiLGMpO3AuX09ydEJpbmRPdXRwdXQ9KGEsYixjLGQpPT4ocC5fT3J0QmluZE91dHB1dD1YLlRkKShhLGIsYyxkKTtwLl9PcnRDbGVhckJvdW5kT3V0cHV0cz1hPT4ocC5fT3J0Q2xlYXJCb3VuZE91dHB1dHM9WC5VZCkoYSk7cC5fT3J0UmVsZWFzZUJpbmRpbmc9YT0+KHAuX09ydFJlbGVhc2VCaW5kaW5nPVguVmQpKGEpO3AuX09ydFJ1bldpdGhCaW5kaW5nPShhLGIsYyxkLGUpPT4ocC5fT3J0UnVuV2l0aEJpbmRpbmc9WC5XZCkoYSxiLGMsZCxlKTtwLl9PcnRSdW49KGEsYixjLGQsZSxmLGcsaCk9PihwLl9PcnRSdW49WC5YZCkoYSxiLGMsZCxlLGYsZyxoKTtwLl9PcnRFbmRQcm9maWxpbmc9YT0+KHAuX09ydEVuZFByb2ZpbGluZz1YLllkKShhKTtcbnZhciBCYj1wLl9tYWxsb2M9YT0+KEJiPXAuX21hbGxvYz1YLlpkKShhKSxUPXAuX2ZyZWU9YT0+KFQ9cC5fZnJlZT1YLl9kKShhKSxsYj1hPT4obGI9WC4kZCkoYSk7cC5fX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzPSgpPT4ocC5fX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzPVguYWUpKCk7dmFyIFc9KGEsYik9PihXPVguY2UpKGEsYiksTGE9YT0+KExhPVguZGUpKGEpLFk9KCk9PihZPVguZWUpKCksWj1hPT4oWj1YLmZlKShhKSxiZj1hPT4oYmY9WC5nZSkoYSksUWI9YT0+KFFiPVguaGUpKGEpLFBiPWE9PihQYj1YLmllKShhKSxNYT0oYSxiLGMpPT4oTWE9WC5qZSkoYSxiLGMpLEthPWE9PihLYT1YLmtlKShhKTtmdW5jdGlvbiBmYyhhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fVxuZnVuY3Rpb24gZGMoYSxiLGMpe3ZhciBkPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCl9fWZ1bmN0aW9uIGtkKGEsYixjKXt2YXIgZD1ZKCk7dHJ5e1YoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCl9fWZ1bmN0aW9uIGFjKGEsYil7dmFyIGM9WSgpO3RyeXtyZXR1cm4gVihhKShiKX1jYXRjaChkKXtaKGMpO2lmKGQhPT1kKzApdGhyb3cgZDtXKDEsMCl9fWZ1bmN0aW9uIGZkKGEsYil7dmFyIGM9WSgpO3RyeXtWKGEpKGIpfWNhdGNoKGQpe1ooYyk7aWYoZCE9PWQrMCl0aHJvdyBkO1coMSwwKX19ZnVuY3Rpb24gR2MoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCl9Y2F0Y2goZil7WihlKTtpZihmIT09ZiswKXRocm93IGY7VygxLDApfX1cbmZ1bmN0aW9uIGRkKGEpe3ZhciBiPVkoKTt0cnl7VihhKSgpfWNhdGNoKGMpe1ooYik7aWYoYyE9PWMrMCl0aHJvdyBjO1coMSwwKX19ZnVuY3Rpb24ga2MoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1mdW5jdGlvbiBqYyhhLGIsYyxkLGUsZil7dmFyIGc9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19ZnVuY3Rpb24gaGMoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19ZnVuY3Rpb24gcmQoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fVxuZnVuY3Rpb24gdWQoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1mdW5jdGlvbiAkYihhKXt2YXIgYj1ZKCk7dHJ5e3JldHVybiBWKGEpKCl9Y2F0Y2goYyl7WihiKTtpZihjIT09YyswKXRocm93IGM7VygxLDApfX1mdW5jdGlvbiBPYyhhLGIsYyl7dmFyIGQ9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMpfWNhdGNoKGUpe1ooZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1coMSwwKX19ZnVuY3Rpb24gQmUoYSxiLGMpe3ZhciBkPVkoKTt0cnl7VihhKShiLGMpfWNhdGNoKGUpe1ooZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1coMSwwKX19ZnVuY3Rpb24gd2QoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7VihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19XG5mdW5jdGlvbiBsYyhhLGIsYyxkLGUsZixnLGgpe3ZhciBrPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCl9Y2F0Y2gobSl7WihrKTtpZihtIT09bSswKXRocm93IG07VygxLDApfX1mdW5jdGlvbiBXYihhLGIpe3ZhciBjPVkoKTt0cnl7cmV0dXJuIFYoYSkoYil9Y2F0Y2goZCl7WihjKTtpZihkIT09ZCswKXRocm93IGQ7VygxLDApfX1mdW5jdGlvbiBaYyhhLGIpe3ZhciBjPVkoKTt0cnl7cmV0dXJuIFYoYSkoYil9Y2F0Y2goZCl7WihjKTtpZihkIT09ZCswKXRocm93IGQ7VygxLDApO3JldHVybiAwbn19ZnVuY3Rpb24gUmIoYSxiKXt2YXIgYz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIpfWNhdGNoKGQpe1ooYyk7aWYoZCE9PWQrMCl0aHJvdyBkO1coMSwwKX19ZnVuY3Rpb24gbWMoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtaKG0pO2lmKG4hPT1uKzApdGhyb3cgbjtXKDEsMCl9fVxuZnVuY3Rpb24gc2UoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fWZ1bmN0aW9uIEFkKGEsYixjLGQsZSxmLGcpe3ZhciBoPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1mdW5jdGlvbiBHZShhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e1YoYSkoYixjLGQpfWNhdGNoKGYpe1ooZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1coMSwwKX19ZnVuY3Rpb24gbGUoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtaKGgpO2lmKGshPT1rKzApdGhyb3cgaztXKDEsMCl9fWZ1bmN0aW9uIEZkKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKG0pe1ooayk7aWYobSE9PW0rMCl0aHJvdyBtO1coMSwwKX19XG5mdW5jdGlvbiB3ZShhLGIsYyxkLGUpe3ZhciBmPVkoKTt0cnl7VihhKShiLGMsZCxlKX1jYXRjaChnKXtaKGYpO2lmKGchPT1nKzApdGhyb3cgZztXKDEsMCl9fWZ1bmN0aW9uIG5jKGEsYixjLGQsZSxmLGcsaCxrLG0pe3ZhciBuPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrLG0pfWNhdGNoKHUpe1oobik7aWYodSE9PXUrMCl0aHJvdyB1O1coMSwwKX19ZnVuY3Rpb24gR2QoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe1oobSk7aWYobiE9PW4rMCl0aHJvdyBuO1coMSwwKX19ZnVuY3Rpb24gQWMoYSxiLGMsZCxlLGYsZyxoLGssbSxuKXt2YXIgdT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4pfWNhdGNoKHYpe1oodSk7aWYodiE9PXYrMCl0aHJvdyB2O1coMSwwKX19XG5mdW5jdGlvbiBLZShhLGIsYyxkLGUsZixnLGgsayl7dmFyIG09WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayl9Y2F0Y2gobil7WihtKTtpZihuIT09biswKXRocm93IG47VygxLDApfX1mdW5jdGlvbiB1ZShhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe1ooaCk7aWYoayE9PWsrMCl0aHJvdyBrO1coMSwwKX19ZnVuY3Rpb24gJGQoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtaKGgpO2lmKGshPT1rKzApdGhyb3cgaztXKDEsMCl9fWZ1bmN0aW9uIEhkKGEsYixjLGQsZSxmLGcsaCxrLG0pe3ZhciBuPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSl9Y2F0Y2godSl7WihuKTtpZih1IT09dSswKXRocm93IHU7VygxLDApfX1cbmZ1bmN0aW9uICRjKGEsYixjKXt2YXIgZD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyl9Y2F0Y2goZSl7WihkKTtpZihlIT09ZSswKXRocm93IGU7VygxLDApO3JldHVybiAwbn19ZnVuY3Rpb24gbGQoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fWZ1bmN0aW9uIHZjKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgsayl9Y2F0Y2gobil7WihtKTtpZihuIT09biswKXRocm93IG47VygxLDApfX1mdW5jdGlvbiBwYyhhLGIsYyxkLGUsZixnLGgsayxtLG4sdSl7dmFyIHY9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUpfWNhdGNoKGwpe1oodik7aWYobCE9PWwrMCl0aHJvdyBsO1coMSwwKX19XG5mdW5jdGlvbiBPZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwpe3ZhciB3PVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsKX1jYXRjaCh5KXtaKHcpO2lmKHkhPT15KzApdGhyb3cgeTtXKDEsMCl9fWZ1bmN0aW9uIEFlKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1KXt2YXIgdj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1KX1jYXRjaChsKXtaKHYpO2lmKGwhPT1sKzApdGhyb3cgbDtXKDEsMCl9fWZ1bmN0aW9uIG9lKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1KXt2YXIgdj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1KX1jYXRjaChsKXtaKHYpO2lmKGwhPT1sKzApdGhyb3cgbDtXKDEsMCl9fWZ1bmN0aW9uIHRlKGEsYixjLGQsZSl7dmFyIGY9WSgpO3RyeXtWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19XG5mdW5jdGlvbiBqZChhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe1ooaCk7aWYoayE9PWsrMCl0aHJvdyBrO1coMSwwKX19ZnVuY3Rpb24gcmUoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe1oobSk7aWYobiE9PW4rMCl0aHJvdyBuO1coMSwwKX19ZnVuY3Rpb24gcWQoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtaKGgpO2lmKGshPT1rKzApdGhyb3cgaztXKDEsMCl9fWZ1bmN0aW9uIHhkKGEsYixjLGQsZSxmLGcsaCxrLG0sbil7dmFyIHU9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4pfWNhdGNoKHYpe1oodSk7aWYodiE9PXYrMCl0aHJvdyB2O1coMSwwKX19XG5mdW5jdGlvbiBTZShhLGIsYyxkLGUsZixnLGgpe3ZhciBrPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoKX1jYXRjaChtKXtaKGspO2lmKG0hPT1tKzApdGhyb3cgbTtXKDEsMCl9fWZ1bmN0aW9uIGFkKGEsYixjLGQpe3ZhciBlPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQpfWNhdGNoKGYpe1ooZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1coMSwwKTtyZXR1cm4gMG59fWZ1bmN0aW9uIHNkKGEsYixjLGQsZSl7dmFyIGY9WSgpO3RyeXtWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19ZnVuY3Rpb24gUGUoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSl7dmFyIHo9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5KX1jYXRjaChDKXtaKHopO2lmKEMhPT1DKzApdGhyb3cgQztXKDEsMCl9fVxuZnVuY3Rpb24ga2UoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7VihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19ZnVuY3Rpb24gTGUoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe1oobSk7aWYobiE9PW4rMCl0aHJvdyBuO1coMSwwKX19ZnVuY3Rpb24gSGMoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19ZnVuY3Rpb24gTWMoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsKXt2YXIgdz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwpfWNhdGNoKHkpe1oodyk7aWYoeSE9PXkrMCl0aHJvdyB5O1coMSwwKX19XG5mdW5jdGlvbiBRZShhLGIpe3ZhciBjPVkoKTt0cnl7VihhKShiKX1jYXRjaChkKXtaKGMpO2lmKGQhPT1kKzApdGhyb3cgZDtXKDEsMCl9fWZ1bmN0aW9uIGNkKGEsYixjKXt2YXIgZD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyl9Y2F0Y2goZSl7WihkKTtpZihlIT09ZSswKXRocm93IGU7VygxLDApO3JldHVybiAwbn19ZnVuY3Rpb24gTGMoYSxiLGMsZCxlLGYsZyxoLGssbSl7dmFyIG49WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoLGssbSl9Y2F0Y2godSl7WihuKTtpZih1IT09dSswKXRocm93IHU7VygxLDApfX1mdW5jdGlvbiBaYihhLGIsYyxkLGUpe3ZhciBmPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1cbmZ1bmN0aW9uIEtkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCl7dmFyIHc9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwpfWNhdGNoKHkpe1oodyk7aWYoeSE9PXkrMCl0aHJvdyB5O1coMSwwKX19ZnVuY3Rpb24gZWQoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1mdW5jdGlvbiB2ZChhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe1ooaCk7aWYoayE9PWsrMCl0aHJvdyBrO1coMSwwKX19ZnVuY3Rpb24gbmQoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1cbmZ1bmN0aW9uIHlkKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKG0pe1ooayk7aWYobSE9PW0rMCl0aHJvdyBtO1coMSwwKX19ZnVuY3Rpb24gVmQoYSxiLGMsZCxlLGYsZyxoLGssbSxuKXt2YXIgdT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbil9Y2F0Y2godil7Wih1KTtpZih2IT09diswKXRocm93IHY7VygxLDApfX1mdW5jdGlvbiBxYyhhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHope3ZhciBDPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseil9Y2F0Y2goRCl7WihDKTtpZihEIT09RCswKXRocm93IEQ7VygxLDApfX1mdW5jdGlvbiBOZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KXt2YXIgbD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpfWNhdGNoKHcpe1oobCk7aWYodyE9PXcrMCl0aHJvdyB3O1coMSwwKX19XG5mdW5jdGlvbiBVYyhhLGIpe3ZhciBjPVkoKTt0cnl7cmV0dXJuIFYoYSkoYil9Y2F0Y2goZCl7WihjKTtpZihkIT09ZCswKXRocm93IGQ7VygxLDApfX1mdW5jdGlvbiByYyhhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYpe3ZhciBHPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQsRil9Y2F0Y2goSCl7WihHKTtpZihIIT09SCswKXRocm93IEg7VygxLDApfX1mdW5jdGlvbiBKZShhLGIsYyxkLGUsZixnLGgsayxtKXt2YXIgbj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0pfWNhdGNoKHUpe1oobik7aWYodSE9PXUrMCl0aHJvdyB1O1coMSwwKX19ZnVuY3Rpb24gRmMoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1cbmZ1bmN0aW9uIExkKGEsYixjLGQsZSxmLGcsaCxrLG0sbil7dmFyIHU9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4pfWNhdGNoKHYpe1oodSk7aWYodiE9PXYrMCl0aHJvdyB2O1coMSwwKX19ZnVuY3Rpb24gTmMoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fWZ1bmN0aW9uIGZlKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fWZ1bmN0aW9uIFhlKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDKXt2YXIgRD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDKX1jYXRjaChGKXtaKEQpO2lmKEYhPT1GKzApdGhyb3cgRjtXKDEsMCl9fVxuZnVuY3Rpb24gQ2QoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6KXt2YXIgQz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseil9Y2F0Y2goRCl7WihDKTtpZihEIT09RCswKXRocm93IEQ7VygxLDApfX1mdW5jdGlvbiBCZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5KXt2YXIgej1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkpfWNhdGNoKEMpe1ooeik7aWYoQyE9PUMrMCl0aHJvdyBDO1coMSwwKX19ZnVuY3Rpb24gRGQoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcpe3ZhciB5PVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcpfWNhdGNoKHope1ooeSk7aWYoeiE9PXorMCl0aHJvdyB6O1coMSwwKX19XG5mdW5jdGlvbiBaZShhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYsRyl7dmFyIEg9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYsRyl9Y2F0Y2goUyl7WihIKTtpZihTIT09UyswKXRocm93IFM7VygxLDApfX1mdW5jdGlvbiBXZShhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxEKXt2YXIgRj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQpfWNhdGNoKEcpe1ooRik7aWYoRyE9PUcrMCl0aHJvdyBHO1coMSwwKX19ZnVuY3Rpb24gVmUoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6KXt2YXIgQz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseil9Y2F0Y2goRCl7WihDKTtpZihEIT09RCswKXRocm93IEQ7VygxLDApfX1cbmZ1bmN0aW9uIFllKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQsRil7dmFyIEc9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYpfWNhdGNoKEgpe1ooRyk7aWYoSCE9PUgrMCl0aHJvdyBIO1coMSwwKX19ZnVuY3Rpb24gSGUoYSxiLGMsZCxlLGYsZyxoLGssbSl7dmFyIG49WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtKX1jYXRjaCh1KXtaKG4pO2lmKHUhPT11KzApdGhyb3cgdTtXKDEsMCl9fWZ1bmN0aW9uIEVlKGEsYixjLGQsZSxmLGcsaCxrLG0sbil7dmFyIHU9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4pfWNhdGNoKHYpe1oodSk7aWYodiE9PXYrMCl0aHJvdyB2O1coMSwwKX19XG5mdW5jdGlvbiBPZShhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyl7dmFyIHk9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyl9Y2F0Y2goeil7Wih5KTtpZih6IT09eiswKXRocm93IHo7VygxLDApfX1mdW5jdGlvbiBVZShhLGIsYyxkLGUsZixnLGgsayxtKXt2YXIgbj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0pfWNhdGNoKHUpe1oobik7aWYodSE9PXUrMCl0aHJvdyB1O1coMSwwKX19ZnVuY3Rpb24gVGUoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBtPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe1oobSk7aWYobiE9PW4rMCl0aHJvdyBuO1coMSwwKX19ZnVuY3Rpb24gVmIoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1cbmZ1bmN0aW9uIG9kKGEsYixjLGQsZSl7dmFyIGY9WSgpO3RyeXtWKGEpKGIsYyxkLGUpfWNhdGNoKGcpe1ooZik7aWYoZyE9PWcrMCl0aHJvdyBnO1coMSwwKX19ZnVuY3Rpb24gWWMoYSxiLGMpe3ZhciBkPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCk7cmV0dXJuIDBufX1mdW5jdGlvbiB6YyhhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtaKGgpO2lmKGshPT1rKzApdGhyb3cgaztXKDEsMCl9fWZ1bmN0aW9uIEllKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fVxuZnVuY3Rpb24gbmUoYSxiLGMsZCxlLGYsZyxoLGssbSxuKXt2YXIgdT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbil9Y2F0Y2godil7Wih1KTtpZih2IT09diswKXRocm93IHY7VygxLDApfX1mdW5jdGlvbiBkZShhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KXt2YXIgbD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpfWNhdGNoKHcpe1oobCk7aWYodyE9PXcrMCl0aHJvdyB3O1coMSwwKX19ZnVuY3Rpb24gRGMoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fWZ1bmN0aW9uIGFlKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpe3ZhciBsPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdil9Y2F0Y2godyl7WihsKTtpZih3IT09dyswKXRocm93IHc7VygxLDApfX1cbmZ1bmN0aW9uIGhlKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKG0pe1ooayk7aWYobSE9PW0rMCl0aHJvdyBtO1coMSwwKX19ZnVuY3Rpb24geWUoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCl9Y2F0Y2gobSl7WihrKTtpZihtIT09bSswKXRocm93IG07VygxLDApfX1mdW5jdGlvbiBWYyhhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fWZ1bmN0aW9uIGVlKGEsYixjLGQsZSxmLGcsaCxrLG0pe3ZhciBuPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSl9Y2F0Y2godSl7WihuKTtpZih1IT09dSswKXRocm93IHU7VygxLDApfX1cbmZ1bmN0aW9uIE1lKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtaKG0pO2lmKG4hPT1uKzApdGhyb3cgbjtXKDEsMCl9fWZ1bmN0aW9uIGNlKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtaKG0pO2lmKG4hPT1uKzApdGhyb3cgbjtXKDEsMCl9fWZ1bmN0aW9uIFlkKGEsYixjLGQsZSxmLGcsaCxrLG0pe3ZhciBuPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSl9Y2F0Y2godSl7WihuKTtpZih1IT09dSswKXRocm93IHU7VygxLDApfX1mdW5jdGlvbiBEZShhLGIsYyxkLGUsZil7dmFyIGc9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7WihnKTtpZihoIT09aCswKXRocm93IGg7VygxLDApfX1cbmZ1bmN0aW9uIEpkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1KXt2YXIgdj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1KX1jYXRjaChsKXtaKHYpO2lmKGwhPT1sKzApdGhyb3cgbDtXKDEsMCl9fWZ1bmN0aW9uIHBlKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCl7dmFyIHc9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwpfWNhdGNoKHkpe1oodyk7aWYoeSE9PXkrMCl0aHJvdyB5O1coMSwwKX19ZnVuY3Rpb24gS2MoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKG0pe1ooayk7aWYobSE9PW0rMCl0aHJvdyBtO1coMSwwKX19ZnVuY3Rpb24gUGQoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcpe3ZhciB5PVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcpfWNhdGNoKHope1ooeSk7aWYoeiE9PXorMCl0aHJvdyB6O1coMSwwKX19XG5mdW5jdGlvbiBaZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwpe3ZhciB3PVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsKX1jYXRjaCh5KXtaKHcpO2lmKHkhPT15KzApdGhyb3cgeTtXKDEsMCl9fWZ1bmN0aW9uIFdkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3KXt2YXIgeT1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3KX1jYXRjaCh6KXtaKHkpO2lmKHohPT16KzApdGhyb3cgejtXKDEsMCl9fWZ1bmN0aW9uIGhkKGEsYixjKXt2YXIgZD1ZKCk7dHJ5e1YoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCl9fWZ1bmN0aW9uIEVkKGEsYixjLGQsZSxmLGcsaCxrLG0pe3ZhciBuPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSl9Y2F0Y2godSl7WihuKTtpZih1IT09dSswKXRocm93IHU7VygxLDApfX1cbmZ1bmN0aW9uIGJlKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQsRixHLEgsUyxlZixmZixnZil7dmFyIGhmPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6LEMsRCxGLEcsSCxTLGVmLGZmLGdmKX1jYXRjaChHYSl7WihoZik7aWYoR2EhPT1HYSswKXRocm93IEdhO1coMSwwKX19ZnVuY3Rpb24geGUoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7VihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19ZnVuY3Rpb24gdGMoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdil7dmFyIGw9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdil9Y2F0Y2godyl7WihsKTtpZih3IT09dyswKXRocm93IHc7VygxLDApfX1cbmZ1bmN0aW9uIE1kKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1KXt2YXIgdj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1KX1jYXRjaChsKXtaKHYpO2lmKGwhPT1sKzApdGhyb3cgbDtXKDEsMCl9fWZ1bmN0aW9uIHBkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpe3ZhciBsPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdil9Y2F0Y2godyl7WihsKTtpZih3IT09dyswKXRocm93IHc7VygxLDApfX1mdW5jdGlvbiBVZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYsRyl7dmFyIEg9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYsRyl9Y2F0Y2goUyl7WihIKTtpZihTIT09UyswKXRocm93IFM7VygxLDApfX1mdW5jdGlvbiBjYyhhLGIsYyl7dmFyIGQ9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMpfWNhdGNoKGUpe1ooZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1coMSwwKX19XG5mdW5jdGlvbiB6ZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KXt2YXIgbD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpfWNhdGNoKHcpe1oobCk7aWYodyE9PXcrMCl0aHJvdyB3O1coMSwwKX19ZnVuY3Rpb24gRmUoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsKXt2YXIgdz1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCl9Y2F0Y2goeSl7Wih3KTtpZih5IT09eSswKXRocm93IHk7VygxLDApfX1mdW5jdGlvbiBpZShhLGIsYyxkLGUsZixnLGgpe3ZhciBrPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoKX1jYXRjaChtKXtaKGspO2lmKG0hPT1tKzApdGhyb3cgbTtXKDEsMCl9fWZ1bmN0aW9uIFJkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseil7dmFyIEM9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHopfWNhdGNoKEQpe1ooQyk7aWYoRCE9PUQrMCl0aHJvdyBEO1coMSwwKX19XG5mdW5jdGlvbiBUZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYpe3ZhciBHPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6LEMsRCxGKX1jYXRjaChIKXtaKEcpO2lmKEghPT1IKzApdGhyb3cgSDtXKDEsMCl9fWZ1bmN0aW9uIFNkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkseixDLEQpe3ZhciBGPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6LEMsRCl9Y2F0Y2goRyl7WihGKTtpZihHIT09RyswKXRocm93IEc7VygxLDApfX1mdW5jdGlvbiBYZChhLGIsYyxkLGUsZixnLGgsayxtLG4pe3ZhciB1PVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuKX1jYXRjaCh2KXtaKHUpO2lmKHYhPT12KzApdGhyb3cgdjtXKDEsMCl9fVxuZnVuY3Rpb24gb2MoYSxiLGMsZCxlLGYsZyxoLGssbSxuKXt2YXIgdT1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4pfWNhdGNoKHYpe1oodSk7aWYodiE9PXYrMCl0aHJvdyB2O1coMSwwKX19ZnVuY3Rpb24gc2MoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSx6LEMsRCxGKXt2YXIgRz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2LGwsdyx5LHosQyxELEYpfWNhdGNoKEgpe1ooRyk7aWYoSCE9PUgrMCl0aHJvdyBIO1coMSwwKX19ZnVuY3Rpb24gdGQoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1mdW5jdGlvbiBJZChhLGIsYyxkLGUsZixnLGgsayxtLG4sdSl7dmFyIHY9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSl9Y2F0Y2gobCl7Wih2KTtpZihsIT09bCswKXRocm93IGw7VygxLDApfX1cbmZ1bmN0aW9uIFJjKGEsYixjLGQsZSl7dmFyIGY9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlKX1jYXRjaChnKXtaKGYpO2lmKGchPT1nKzApdGhyb3cgZztXKDEsMCl9fWZ1bmN0aW9uIGJkKGEsYixjLGQpe3ZhciBlPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQpfWNhdGNoKGYpe1ooZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1coMSwwKTtyZXR1cm4gMG59fWZ1bmN0aW9uIGdlKGEsYixjLGQsZSxmLGcpe3ZhciBoPVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1mdW5jdGlvbiBTYyhhLGIsYyxkLGUsZil7dmFyIGc9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYpfWNhdGNoKGgpe1ooZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1coMSwwKX19ZnVuY3Rpb24gamUoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1cbmZ1bmN0aW9uIFdjKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7WihnKTtpZihoIT09aCswKXRocm93IGg7VygxLDApfX1mdW5jdGlvbiBxZShhLGIsYyxkLGUsZixnLGgsayl7dmFyIG09WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayl9Y2F0Y2gobil7WihtKTtpZihuIT09biswKXRocm93IG47VygxLDApfX1mdW5jdGlvbiBtZChhLGIsYyxkKXt2YXIgZT1ZKCk7dHJ5e1YoYSkoYixjLGQpfWNhdGNoKGYpe1ooZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1coMSwwKX19ZnVuY3Rpb24gQmMoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKG0pe1ooayk7aWYobSE9PW0rMCl0aHJvdyBtO1coMSwwKX19ZnVuY3Rpb24gQ2UoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fVxuZnVuY3Rpb24gZ2MoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fWZ1bmN0aW9uIEljKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7WihnKTtpZihoIT09aCswKXRocm93IGg7VygxLDApfX1mdW5jdGlvbiB1YyhhLGIsYyxkLGUsZixnLGgsayxtLG4sdSl7dmFyIHY9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUpfWNhdGNoKGwpe1oodik7aWYobCE9PWwrMCl0aHJvdyBsO1coMSwwKX19ZnVuY3Rpb24gRWMoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKG0pe1ooayk7aWYobSE9PW0rMCl0aHJvdyBtO1coMSwwKX19XG5mdW5jdGlvbiB4YyhhLGIsYyxkLGUsZixnLGgsayxtLG4pe3ZhciB1PVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrLG0sbil9Y2F0Y2godil7Wih1KTtpZih2IT09diswKXRocm93IHY7VygxLDApfX1mdW5jdGlvbiBKYyhhLGIsYyxkLGUsZixnKXt2YXIgaD1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtaKGgpO2lmKGshPT1rKzApdGhyb3cgaztXKDEsMCl9fWZ1bmN0aW9uIHdjKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpe3ZhciBsPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpfWNhdGNoKHcpe1oobCk7aWYodyE9PXcrMCl0aHJvdyB3O1coMSwwKX19ZnVuY3Rpb24gUWMoYSxiLGMsZCxlLGYsZyl7dmFyIGg9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7WihoKTtpZihrIT09ayswKXRocm93IGs7VygxLDApfX1cbmZ1bmN0aW9uIFRjKGEsYixjLGQsZSxmLGcpe3ZhciBoPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe1ooaCk7aWYoayE9PWsrMCl0aHJvdyBrO1coMSwwKX19ZnVuY3Rpb24gUGMoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMsZCl9Y2F0Y2goZil7WihlKTtpZihmIT09ZiswKXRocm93IGY7VygxLDApfX1mdW5jdGlvbiBtZShhLGIsYyxkLGUsZixnLGgsayxtKXt2YXIgbj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0pfWNhdGNoKHUpe1oobik7aWYodSE9PXUrMCl0aHJvdyB1O1coMSwwKX19ZnVuY3Rpb24gdmUoYSxiLGMsZCxlLGYsZyxoLGssbSxuLHUsdil7dmFyIGw9WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KX1jYXRjaCh3KXtaKGwpO2lmKHchPT13KzApdGhyb3cgdztXKDEsMCl9fVxuZnVuY3Rpb24gYmMoYSxiLGMpe3ZhciBkPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCl9fWZ1bmN0aW9uIGVjKGEsYixjLGQpe3ZhciBlPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQpfWNhdGNoKGYpe1ooZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1coMSwwKX19ZnVuY3Rpb24gZ2QoYSxiLGMsZCl7dmFyIGU9WSgpO3RyeXtWKGEpKGIsYyxkKX1jYXRjaChmKXtaKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtXKDEsMCl9fWZ1bmN0aW9uIFliKGEsYixjLGQpe3ZhciBlPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQpfWNhdGNoKGYpe1ooZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1coMSwwKX19ZnVuY3Rpb24gUmUoYSxiLGMsZCxlKXt2YXIgZj1ZKCk7dHJ5e1YoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1cbmZ1bmN0aW9uIFViKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7WihnKTtpZihoIT09aCswKXRocm93IGg7VygxLDApfX1mdW5jdGlvbiBOZShhLGIsYyxkLGUsZixnLGgsayxtLG4sdSx2KXt2YXIgbD1ZKCk7dHJ5e1YoYSkoYixjLGQsZSxmLGcsaCxrLG0sbix1LHYpfWNhdGNoKHcpe1oobCk7aWYodyE9PXcrMCl0aHJvdyB3O1coMSwwKX19ZnVuY3Rpb24gemUoYSxiLGMsZCxlLGYsZyxoLGssbSl7dmFyIG49WSgpO3RyeXtWKGEpKGIsYyxkLGUsZixnLGgsayxtKX1jYXRjaCh1KXtaKG4pO2lmKHUhPT11KzApdGhyb3cgdTtXKDEsMCl9fWZ1bmN0aW9uIFRiKGEsYixjLGQpe3ZhciBlPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQpfWNhdGNoKGYpe1ooZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1coMSwwKX19XG5mdW5jdGlvbiBDYyhhLGIsYyxkLGUpe3ZhciBmPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSl9Y2F0Y2goZyl7WihmKTtpZihnIT09ZyswKXRocm93IGc7VygxLDApfX1mdW5jdGlvbiBYYyhhKXt2YXIgYj1ZKCk7dHJ5e3JldHVybiBWKGEpKCl9Y2F0Y2goYyl7WihiKTtpZihjIT09YyswKXRocm93IGM7VygxLDApO3JldHVybiAwbn19ZnVuY3Rpb24geWMoYSxiLGMsZCxlLGYpe3ZhciBnPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtaKGcpO2lmKGghPT1oKzApdGhyb3cgaDtXKDEsMCl9fWZ1bmN0aW9uIGljKGEsYixjLGQsZSxmKXt2YXIgZz1ZKCk7dHJ5e3JldHVybiBWKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7WihnKTtpZihoIT09aCswKXRocm93IGg7VygxLDApfX1cbmZ1bmN0aW9uIFFkKGEsYixjLGQsZSxmLGcsaCxrLG0sbix1LHYsbCx3LHkpe3ZhciB6PVkoKTt0cnl7VihhKShiLGMsZCxlLGYsZyxoLGssbSxuLHUsdixsLHcseSl9Y2F0Y2goQyl7Wih6KTtpZihDIT09QyswKXRocm93IEM7VygxLDApfX1mdW5jdGlvbiBYYihhLGIsYyl7dmFyIGQ9WSgpO3RyeXtyZXR1cm4gVihhKShiLGMpfWNhdGNoKGUpe1ooZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1coMSwwKX19ZnVuY3Rpb24gU2IoYSxiLGMpe3ZhciBkPVkoKTt0cnl7cmV0dXJuIFYoYSkoYixjKX1jYXRjaChlKXtaKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtXKDEsMCl9fVxuZnVuY3Rpb24gYWYoKXt2YXIgYT1YO2E9T2JqZWN0LmFzc2lnbih7fSxhKTt2YXIgYj1kPT4oKT0+ZCgpPj4+MCxjPWQ9PmU9PmQoZSk+Pj4wO2EuX19lcnJub19sb2NhdGlvbj1iKGEuX19lcnJub19sb2NhdGlvbik7YS5aZD1jKGEuWmQpO2EuJGQ9YyhhLiRkKTthLmVlPWIoYS5lZSk7YS5nZT1jKGEuZ2UpO3JldHVybiBhfXAuc3RhY2tBbGxvYz1iZjtwLnN0YWNrU2F2ZT1ZO3Auc3RhY2tSZXN0b3JlPVo7cC5VVEY4VG9TdHJpbmc9UWE7cC5zdHJpbmdUb1VURjg9KGEsYixjKT0+U2EoYSxBLGIsYyk7cC5sZW5ndGhCeXRlc1VURjg9UmE7dmFyIGNmO0s9ZnVuY3Rpb24gZGYoKXtjZnx8amYoKTtjZnx8KEs9ZGYpfTtcbmZ1bmN0aW9uIGpmKCl7aWYoISgwPEopKXtmb3IoOzA8dmEubGVuZ3RoOyl2YS5zaGlmdCgpKHApO2lmKCEoMDxKfHxjZnx8KGNmPSEwLHAuY2FsbGVkUnVuPSEwLG9hKSkpe2Zvcig7MDx3YS5sZW5ndGg7KXdhLnNoaWZ0KCkocCk7Zm9yKGFhKHApOzA8eGEubGVuZ3RoOyl4YS5zaGlmdCgpKHApfX19amYoKTtcblxuXG4gIHJldHVybiBtb2R1bGVBcmcucmVhZHlcbn1cblxuKTtcbn0pKCk7XG5pZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuICBtb2R1bGUuZXhwb3J0cyA9IG9ydFdhc207XG5lbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10pXG4gIGRlZmluZShbXSwgKCkgPT4gb3J0V2FzbSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7RW52fSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge09ydFdhc21Nb2R1bGV9IGZyb20gJy4vYmluZGluZy9vcnQtd2FzbSc7XG5pbXBvcnQge09ydFdhc21UaHJlYWRlZE1vZHVsZX0gZnJvbSAnLi9iaW5kaW5nL29ydC13YXNtLXRocmVhZGVkJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cyAqL1xubGV0IG9ydFdhc21GYWN0b3J5OiBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPjtcblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkcpIHtcbiAgb3J0V2FzbUZhY3RvcnkgPSByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXRyYWluaW5nLXdhc20tc2ltZC5qcycpO1xufSBlbHNlIHtcbiAgb3J0V2FzbUZhY3RvcnkgPVxuICAgICAgQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSA/IHJlcXVpcmUoJy4vYmluZGluZy9vcnQtd2FzbS5qcycpIDogcmVxdWlyZSgnLi9iaW5kaW5nL29ydC13YXNtLXNpbWQuanNlcC5qcycpO1xufVxuXG5jb25zdCBvcnRXYXNtRmFjdG9yeVRocmVhZGVkOiBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPiA9ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9USFJFQUQgP1xuICAgIChCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVID8gcmVxdWlyZSgnLi9iaW5kaW5nL29ydC13YXNtLXRocmVhZGVkLmpzJykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZSgnLi9iaW5kaW5nL29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC5qcycpKSA6XG4gICAgb3J0V2FzbUZhY3Rvcnk7XG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMgKi9cblxubGV0IHdhc206IE9ydFdhc21Nb2R1bGV8dW5kZWZpbmVkO1xubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG5sZXQgYWJvcnRlZCA9IGZhbHNlO1xuXG5jb25zdCBpc011bHRpVGhyZWFkU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICB0cnkge1xuICAgIC8vIElmICdTaGFyZWRBcnJheUJ1ZmZlcicgaXMgbm90IGF2YWlsYWJsZSwgV2ViQXNzZW1ibHkgdGhyZWFkcyB3aWxsIG5vdCB3b3JrLlxuICAgIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVGVzdCBmb3IgdHJhbnNmZXJhYmlsaXR5IG9mIFNBQnMgKGZvciBicm93c2Vycy4gbmVlZGVkIGZvciBGaXJlZm94KVxuICAgIC8vIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vZm9ydW0vIyFtc2cvbW96aWxsYS5kZXYucGxhdGZvcm0vSUhrQlpsSEVUcEEvZHdzTU5jaFdFUUFKXG4gICAgaWYgKHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5ldyBNZXNzYWdlQ2hhbm5lbCgpLnBvcnQxLnBvc3RNZXNzYWdlKG5ldyBTaGFyZWRBcnJheUJ1ZmZlcigxKSk7XG4gICAgfVxuXG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgdGhyZWFkcyBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIHRocmVhZGVkIGluc3RydWN0aW9ucy5cbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMCwgOTcsIDExNSwgMTA5LCAxLCAwLCAgMCwgIDAsIDEsIDQsIDEsICA5NiwgMCwgICAwLCAgMywgMiwgMSwgIDAsIDUsXG4gICAgICA0LCAxLCAgMywgICAxLCAgIDEsIDEwLCAxMSwgMSwgOSwgMCwgNjUsIDAsICAyNTQsIDE2LCAyLCAwLCAyNiwgMTFcbiAgICBdKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGlzU2ltZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSBTSU1EIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgU0lNRCBpbnN0cnVjdGlvbnMuXG5cbiAgICAvLyBUaGUgYmluYXJ5IGRhdGEgaXMgZ2VuZXJhdGVkIGZyb20gdGhlIGZvbGxvd2luZyBjb2RlIGJ5IHdhdDJ3YXNtOlxuICAgIC8vXG4gICAgLy8gKG1vZHVsZVxuICAgIC8vICAgKHR5cGUgJHQwIChmdW5jKSlcbiAgICAvLyAgIChmdW5jICRmMCAodHlwZSAkdDApXG4gICAgLy8gICAgIChkcm9wXG4gICAgLy8gICAgICAgKGkzMng0LmRvdF9pMTZ4OF9zXG4gICAgLy8gICAgICAgICAoaTh4MTYuc3BsYXRcbiAgICAvLyAgICAgICAgICAgKGkzMi5jb25zdCAwKSlcbiAgICAvLyAgICAgICAgICh2MTI4LmNvbnN0IGkzMng0IDB4MDAwMDAwMDAgMHgwMDAwMDAwMCAweDAwMDAwMDAwIDB4MDAwMDAwMDApKSkpKVxuXG4gICAgcmV0dXJuIFdlYkFzc2VtYmx5LnZhbGlkYXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDAsICAgOTcsIDExNSwgMTA5LCAxLCAwLCAwLCAwLCAxLCA0LCAxLCA5NiwgMCwgMCwgMywgMiwgMSwgMCwgMTAsIDMwLCAxLCAgIDI4LCAgMCwgNjUsIDAsXG4gICAgICAyNTMsIDE1LCAyNTMsIDEyLCAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDAsIDAsIDAsIDAsIDAsIDAsIDAsICAwLCAgMjUzLCAxODYsIDEsIDI2LCAxMVxuICAgIF0pKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgZ2V0V2FzbUZpbGVOYW1lID0gKHVzZVNpbWQ6IGJvb2xlYW4sIHVzZVRocmVhZHM6IGJvb2xlYW4pID0+IHtcbiAgaWYgKHVzZVNpbWQpIHtcbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9UUkFJTklORykge1xuICAgICAgcmV0dXJuICdvcnQtdHJhaW5pbmctd2FzbS1zaW1kLndhc20nO1xuICAgIH1cbiAgICByZXR1cm4gdXNlVGhyZWFkcyA/ICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLndhc20nIDogJ29ydC13YXNtLXNpbWQud2FzbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVzZVRocmVhZHMgPyAnb3J0LXdhc20tdGhyZWFkZWQud2FzbScgOiAnb3J0LXdhc20ud2FzbSc7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplV2ViQXNzZW1ibHkgPSBhc3luYyhmbGFnczogRW52LldlYkFzc2VtYmx5RmxhZ3MpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIGlmIChpbml0aWFsaXppbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpcGxlIGNhbGxzIHRvIFxcJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpXFwnIGRldGVjdGVkLicpO1xuICB9XG4gIGlmIChhYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcmV2aW91cyBjYWxsIHRvIFxcJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpXFwnIGZhaWxlZC4nKTtcbiAgfVxuXG4gIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgLy8gd2FzbSBmbGFncyBhcmUgYWxyZWFkeSBpbml0aWFsaXplZFxuICBjb25zdCB0aW1lb3V0ID0gZmxhZ3MuaW5pdFRpbWVvdXQhO1xuICBjb25zdCBudW1UaHJlYWRzID0gZmxhZ3MubnVtVGhyZWFkcyE7XG4gIGNvbnN0IHNpbWQgPSBmbGFncy5zaW1kITtcblxuICBjb25zdCB1c2VUaHJlYWRzID0gbnVtVGhyZWFkcyA+IDEgJiYgaXNNdWx0aVRocmVhZFN1cHBvcnRlZCgpO1xuICBjb25zdCB1c2VTaW1kID0gc2ltZCAmJiBpc1NpbWRTdXBwb3J0ZWQoKTtcblxuICBjb25zdCB3YXNtUGF0aHMgPSBmbGFncy53YXNtUGF0aHM7XG4gIGNvbnN0IHdhc21QcmVmaXhPdmVycmlkZSA9IHR5cGVvZiB3YXNtUGF0aHMgPT09ICdzdHJpbmcnID8gd2FzbVBhdGhzIDogdW5kZWZpbmVkO1xuICBjb25zdCB3YXNtRmlsZU5hbWUgPSBnZXRXYXNtRmlsZU5hbWUodXNlU2ltZCwgdXNlVGhyZWFkcyk7XG4gIGNvbnN0IHdhc21QYXRoT3ZlcnJpZGUgPSB0eXBlb2Ygd2FzbVBhdGhzID09PSAnb2JqZWN0JyA/IHdhc21QYXRoc1t3YXNtRmlsZU5hbWVdIDogdW5kZWZpbmVkO1xuXG4gIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcblxuICBjb25zdCB0YXNrczogQXJyYXk8UHJvbWlzZTx2b2lkPj4gPSBbXTtcblxuICAvLyBwcm9taXNlIGZvciB0aW1lb3V0XG4gIGlmICh0aW1lb3V0ID4gMCkge1xuICAgIHRhc2tzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpc1RpbWVvdXQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9LCB0aW1lb3V0KTtcbiAgICB9KSk7XG4gIH1cblxuICAvLyBwcm9taXNlIGZvciBtb2R1bGUgaW5pdGlhbGl6YXRpb25cbiAgdGFza3MucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHVzZVRocmVhZHMgPyBvcnRXYXNtRmFjdG9yeVRocmVhZGVkIDogb3J0V2FzbUZhY3Rvcnk7XG4gICAgY29uc3QgY29uZmlnOiBQYXJ0aWFsPE9ydFdhc21Nb2R1bGU+ID0ge1xuICAgICAgbG9jYXRlRmlsZTogKGZpbGVOYW1lOiBzdHJpbmcsIHNjcmlwdERpcmVjdG9yeTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fVEhSRUFEICYmIHVzZVRocmVhZHMgJiYgZmlsZU5hbWUuZW5kc1dpdGgoJy53b3JrZXIuanMnKSAmJlxuICAgICAgICAgICAgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIHJlcXVpcmUoKSBmdW5jdGlvbiBpcyBoYW5kbGVkIGJ5IGVzYnVpbGQgcGx1Z2luIHRvIGxvYWQgZmlsZSBjb250ZW50IGFzIHN0cmluZy5cbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0c1xuICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vYmluZGluZy9vcnQtd2FzbS10aHJlYWRlZC53b3JrZXIuanMnKVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB7dHlwZTogJ3RleHQvamF2YXNjcmlwdCd9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsZU5hbWUuZW5kc1dpdGgoJy53YXNtJykpIHtcbiAgICAgICAgICBpZiAod2FzbVBhdGhPdmVycmlkZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdhc21QYXRoT3ZlcnJpZGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcHJlZml4ID0gd2FzbVByZWZpeE92ZXJyaWRlID8/IHNjcmlwdERpcmVjdG9yeTtcblxuICAgICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgICAgICAgaWYgKHdhc21GaWxlTmFtZSA9PT0gJ29ydC13YXNtLXNpbWQud2FzbScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZWZpeCArICdvcnQtd2FzbS1zaW1kLmpzZXAud2FzbSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdhc21GaWxlTmFtZSA9PT0gJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZWZpeCArICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHByZWZpeCArIHdhc21GaWxlTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzY3JpcHREaXJlY3RvcnkgKyBmaWxlTmFtZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9USFJFQUQgJiYgdXNlVGhyZWFkcykge1xuICAgICAgaWYgKHR5cGVvZiBCbG9iID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25maWcubWFpblNjcmlwdFVybE9yQmxvYiA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdvcnQtd2FzbS10aHJlYWRlZC5qcycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0U291cmNlQ29kZSA9IGB2YXIgb3J0V2FzbVRocmVhZGVkPSR7ZmFjdG9yeS50b1N0cmluZygpfTtgO1xuICAgICAgICBjb25maWcubWFpblNjcmlwdFVybE9yQmxvYiA9IG5ldyBCbG9iKFtzY3JpcHRTb3VyY2VDb2RlXSwge3R5cGU6ICd0ZXh0L2phdmFzY3JpcHQnfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZmFjdG9yeShjb25maWcpLnRoZW4oXG4gICAgICAgIC8vIHdhc20gbW9kdWxlIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseVxuICAgICAgICBtb2R1bGUgPT4ge1xuICAgICAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICB3YXNtID0gbW9kdWxlO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgZmFpbGVkIHRvIGluaXRpYWxpemVcbiAgICAgICAgKHdoYXQpID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3Qod2hhdCk7XG4gICAgICAgIH0pO1xuICB9KSk7XG5cbiAgYXdhaXQgUHJvbWlzZS5yYWNlKHRhc2tzKTtcblxuICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBXZWJBc3NlbWJseSBiYWNrZW5kIGluaXRpYWxpemluZyBmYWlsZWQgZHVlIHRvIHRpbWVvdXQ6ICR7dGltZW91dH1tc2ApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5zdGFuY2UgPSAoKTogT3J0V2FzbU1vZHVsZSA9PiB7XG4gIGlmIChpbml0aWFsaXplZCAmJiB3YXNtKSB7XG4gICAgcmV0dXJuIHdhc207XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IGlzIG5vdCBpbml0aWFsaXplZCB5ZXQuJyk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlzcG9zZSA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKGluaXRpYWxpemVkICYmICFpbml0aWFsaXppbmcgJiYgIWFib3J0ZWQpIHtcbiAgICBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gICAgKHdhc20gYXMgT3J0V2FzbVRocmVhZGVkTW9kdWxlKS5QVGhyZWFkPy50ZXJtaW5hdGVBbGxUaHJlYWRzKCk7XG4gICAgd2FzbSA9IHVuZGVmaW5lZDtcblxuICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgYWJvcnRlZCA9IHRydWU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IGFsbG9jV2FzbVN0cmluZyA9IChkYXRhOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiBudW1iZXIgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBkYXRhTGVuZ3RoID0gd2FzbS5sZW5ndGhCeXRlc1VURjgoZGF0YSkgKyAxO1xuICBjb25zdCBkYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKGRhdGFMZW5ndGgpO1xuICB3YXNtLnN0cmluZ1RvVVRGOChkYXRhLCBkYXRhT2Zmc2V0LCBkYXRhTGVuZ3RoKTtcbiAgYWxsb2NzLnB1c2goZGF0YU9mZnNldCk7XG5cbiAgcmV0dXJuIGRhdGFPZmZzZXQ7XG59O1xuXG5pbnRlcmZhY2UgRXh0cmFPcHRpb25zSGFuZGxlciB7XG4gIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgaXRlcmF0ZUV4dHJhT3B0aW9ucyA9XG4gICAgKG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBwcmVmaXg6IHN0cmluZywgc2VlbjogV2Vha1NldDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4sXG4gICAgIGhhbmRsZXI6IEV4dHJhT3B0aW9uc0hhbmRsZXIpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0JyAmJiBvcHRpb25zICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChzZWVuLmhhcyhvcHRpb25zKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGluIG9wdGlvbnMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWVuLmFkZChvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBPYmplY3QuZW50cmllcyhvcHRpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9IChwcmVmaXgpID8gcHJlZml4ICsga2V5IDoga2V5O1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIG5hbWUgKyAnLicsIHNlZW4sIGhhbmRsZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGhhbmRsZXIobmFtZSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICBoYW5kbGVyKG5hbWUsICh2YWx1ZSkgPyAnMScgOiAnMCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgaGFuZGxlIGV4dHJhIGNvbmZpZyB0eXBlOiAke3R5cGVvZiB2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuLyoqXG4gKiBjaGVjayB3ZWIgYXNzZW1ibHkgQVBJJ3MgbGFzdCBlcnJvciBhbmQgdGhyb3cgZXJyb3IgaWYgYW55IGVycm9yIG9jY3VycmVkLlxuICogQHBhcmFtIG1lc3NhZ2UgYSBtZXNzYWdlIHVzZWQgd2hlbiBhbiBlcnJvciBvY2N1cnJlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNoZWNrTGFzdEVycm9yID0gKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFyYW1zT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDgpO1xuICAgIHdhc20uX09ydEdldExhc3RFcnJvcihwYXJhbXNPZmZzZXQsIHBhcmFtc09mZnNldCArIDQpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uSEVBUDMyW3BhcmFtc09mZnNldCAvIDRdO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZVBvaW50ZXIgPSB3YXNtLkhFQVBVMzJbcGFyYW1zT2Zmc2V0IC8gNCArIDFdO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZVBvaW50ZXIgPyB3YXNtLlVURjhUb1N0cmluZyhlcnJvck1lc3NhZ2VQb2ludGVyKSA6ICcnO1xuICAgIHRocm93IG5ldyBFcnJvcihgJHttZXNzYWdlfSBFUlJPUl9DT0RFOiAke2Vycm9yQ29kZX0sIEVSUk9SX01FU1NBR0U6ICR7ZXJyb3JNZXNzYWdlfWApO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge2dldEluc3RhbmNlfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQge2FsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3IsIGl0ZXJhdGVFeHRyYU9wdGlvbnN9IGZyb20gJy4vd2FzbS11dGlscyc7XG5cbmV4cG9ydCBjb25zdCBzZXRSdW5PcHRpb25zID0gKG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlcltdXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBsZXQgcnVuT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGNvbnN0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBydW5PcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRyeSB7XG4gICAgaWYgKG9wdGlvbnM/LmxvZ1NldmVyaXR5TGV2ZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID0gMjsgIC8vIERlZmF1bHQgdG8gd2FybmluZ1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCkgfHxcbiAgICAgICAgb3B0aW9ucy5sb2dTZXZlcml0eUxldmVsIDwgMCB8fCBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPiA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXJ2ZXJpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke29wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8ubG9nVmVyYm9zaXR5TGV2ZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCA9IDA7ICAvLyBEZWZhdWx0IHRvIDBcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy50ZXJtaW5hdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy50ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgdGFnRGF0YU9mZnNldCA9IDA7XG4gICAgaWYgKG9wdGlvbnM/LnRhZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YWdEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKG9wdGlvbnMudGFnLCBhbGxvY3MpO1xuICAgIH1cblxuICAgIHJ1bk9wdGlvbnNIYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVSdW5PcHRpb25zKFxuICAgICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwhLCBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsISwgISFydW5PcHRpb25zLnRlcm1pbmF0ZSEsIHRhZ0RhdGFPZmZzZXQpO1xuICAgIGlmIChydW5PcHRpb25zSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgcnVuIG9wdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmV4dHJhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnMob3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRSdW5Db25maWdFbnRyeShydW5PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHJ1biBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3J1bk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIGFsbG9jcy5mb3JFYWNoKGFsbG9jID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb259IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7YWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9uc30gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuY29uc3QgZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsID0gKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw6IHN0cmluZ3x1bmtub3duKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChncmFwaE9wdGltaXphdGlvbkxldmVsKSB7XG4gICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAnZXh0ZW5kZWQnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAnYWxsJzpcbiAgICAgIHJldHVybiA5OTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBncmFwaCBvcHRpbWl6YXRpb24gbGV2ZWw6ICR7Z3JhcGhPcHRpbWl6YXRpb25MZXZlbH1gKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0RXhlY3V0aW9uTW9kZSA9IChleGVjdXRpb25Nb2RlOiAnc2VxdWVudGlhbCd8J3BhcmFsbGVsJyk6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAoZXhlY3V0aW9uTW9kZSkge1xuICAgIGNhc2UgJ3NlcXVlbnRpYWwnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAncGFyYWxsZWwnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZXhlY3V0aW9uIG1vZGU6ICR7ZXhlY3V0aW9uTW9kZX1gKTtcbiAgfVxufTtcblxuY29uc3QgYXBwZW5kRGVmYXVsdE9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IHZvaWQgPT4ge1xuICBpZiAoIW9wdGlvbnMuZXh0cmEpIHtcbiAgICBvcHRpb25zLmV4dHJhID0ge307XG4gIH1cbiAgaWYgKCFvcHRpb25zLmV4dHJhLnNlc3Npb24pIHtcbiAgICBvcHRpb25zLmV4dHJhLnNlc3Npb24gPSB7fTtcbiAgfVxuICBjb25zdCBzZXNzaW9uID0gb3B0aW9ucy5leHRyYS5zZXNzaW9uIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGlmICghc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIHNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSA9ICcxJztcbiAgfVxuXG4gIC8vIGlmIHVzaW5nIEpTRVAgd2l0aCBXZWJHUFUsIGFsd2F5cyBkaXNhYmxlIG1lbW9yeSBwYXR0ZXJuXG4gIGlmIChvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyAmJlxuICAgICAgb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMuc29tZShlcCA9PiAodHlwZW9mIGVwID09PSAnc3RyaW5nJyA/IGVwIDogZXAubmFtZSkgPT09ICd3ZWJncHUnKSkge1xuICAgIG9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybiA9IGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBzZXRFeGVjdXRpb25Qcm92aWRlcnMgPVxuICAgIChzZXNzaW9uT3B0aW9uc0hhbmRsZTogbnVtYmVyLCBleGVjdXRpb25Qcm92aWRlcnM6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uRXhlY3V0aW9uUHJvdmlkZXJDb25maWdbXSxcbiAgICAgYWxsb2NzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xuICAgICAgZm9yIChjb25zdCBlcCBvZiBleGVjdXRpb25Qcm92aWRlcnMpIHtcbiAgICAgICAgbGV0IGVwTmFtZSA9IHR5cGVvZiBlcCA9PT0gJ3N0cmluZycgPyBlcCA6IGVwLm5hbWU7XG5cbiAgICAgICAgLy8gY2hlY2sgRVAgbmFtZVxuICAgICAgICBzd2l0Y2ggKGVwTmFtZSkge1xuICAgICAgICAgIGNhc2UgJ3hubnBhY2snOlxuICAgICAgICAgICAgZXBOYW1lID0gJ1hOTlBBQ0snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd2Vibm4nOlxuICAgICAgICAgICAgZXBOYW1lID0gJ1dFQk5OJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHdlYm5uT3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICAgICAgICAgICAgaWYgKHdlYm5uT3B0aW9ucz8uZGV2aWNlVHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ2RldmljZVR5cGUnLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh3ZWJubk9wdGlvbnMuZGV2aWNlVHlwZSwgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PVxuICAgICAgICAgICAgICAgICAgICAwKSB7XG4gICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICdkZXZpY2VUeXBlJyAtICR7d2Vibm5PcHRpb25zLmRldmljZVR5cGV9LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAod2Vibm5PcHRpb25zPy5udW1UaHJlYWRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IG51bVRocmVhZHMgPSB3ZWJubk9wdGlvbnMubnVtVGhyZWFkcztcbiAgICAgICAgICAgICAgICAvLyBKdXN0IGlnbm9yZSBpbnZhbGlkIHdlYm5uT3B0aW9ucy5udW1UaHJlYWRzLlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbnVtVGhyZWFkcyAhPSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihudW1UaHJlYWRzKSB8fCBudW1UaHJlYWRzIDwgMCkge1xuICAgICAgICAgICAgICAgICAgbnVtVGhyZWFkcyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ251bVRocmVhZHMnLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhudW1UaHJlYWRzLnRvU3RyaW5nKCksIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT1cbiAgICAgICAgICAgICAgICAgICAgMCkge1xuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAnbnVtVGhyZWFkcycgLSAke3dlYm5uT3B0aW9ucy5udW1UaHJlYWRzfS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHdlYm5uT3B0aW9ucz8ucG93ZXJQcmVmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygncG93ZXJQcmVmZXJlbmNlJywgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcod2Vibm5PcHRpb25zLnBvd2VyUHJlZmVyZW5jZSwgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PVxuICAgICAgICAgICAgICAgICAgICAwKSB7XG4gICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICBgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICdwb3dlclByZWZlcmVuY2UnIC0gJHt3ZWJubk9wdGlvbnMucG93ZXJQcmVmZXJlbmNlfS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3dlYmdwdSc6XG4gICAgICAgICAgICBlcE5hbWUgPSAnSlMnO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgY29uc3Qgd2ViZ3B1T3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zPy5wcmVmZXJyZWRMYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAod2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgIT09ICdOQ0hXJyAmJiB3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCAhPT0gJ05IV0MnKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHByZWZlcnJlZExheW91dCBtdXN0IGJlIGVpdGhlciAnTkNIVycgb3IgJ05IV0MnOiAke3dlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKCdwcmVmZXJyZWRMYXlvdXQnLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCwgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PVxuICAgICAgICAgICAgICAgICAgICAwKSB7XG4gICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICBgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICdwcmVmZXJyZWRMYXlvdXQnIC0gJHt3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dH0uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd3YXNtJzpcbiAgICAgICAgICBjYXNlICdjcHUnOlxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgbm90IHN1cHBvcnRlZCBleGVjdXRpb24gcHJvdmlkZXI6ICR7ZXBOYW1lfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXBOYW1lRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhlcE5hbWUsIGFsbG9jcyk7XG4gICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcihzZXNzaW9uT3B0aW9uc0hhbmRsZSwgZXBOYW1lRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYXBwZW5kIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9LmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuZXhwb3J0IGNvbnN0IHNldFNlc3Npb25PcHRpb25zID0gKG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGNvbnN0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBzZXNzaW9uT3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGFwcGVuZERlZmF1bHRPcHRpb25zKHNlc3Npb25PcHRpb25zKTtcblxuICB0cnkge1xuICAgIGNvbnN0IGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPSBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwoc2Vzc2lvbk9wdGlvbnMuZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCA/PyAnYWxsJyk7XG4gICAgY29uc3QgZXhlY3V0aW9uTW9kZSA9IGdldEV4ZWN1dGlvbk1vZGUoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uTW9kZSA/PyAnc2VxdWVudGlhbCcpO1xuICAgIGNvbnN0IGxvZ0lkRGF0YU9mZnNldCA9XG4gICAgICAgIHR5cGVvZiBzZXNzaW9uT3B0aW9ucy5sb2dJZCA9PT0gJ3N0cmluZycgPyBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMubG9nSWQsIGFsbG9jcykgOiAwO1xuXG4gICAgY29uc3QgbG9nU2V2ZXJpdHlMZXZlbCA9IHNlc3Npb25PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPz8gMjsgIC8vIERlZmF1bHQgdG8gMiAtIHdhcm5pbmdcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nU2V2ZXJpdHlMZXZlbCkgfHwgbG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHwgbG9nU2V2ZXJpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNlcnZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nU2V2ZXJpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dWZXJib3NpdHlMZXZlbCA9IHNlc3Npb25PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID8/IDA7ICAvLyBEZWZhdWx0IHRvIDAgLSB2ZXJib3NlXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxvZ1ZlcmJvc2l0eUxldmVsKSB8fCBsb2dWZXJib3NpdHlMZXZlbCA8IDAgfHwgbG9nVmVyYm9zaXR5TGV2ZWwgPiA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyB2ZXJib3NpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke2xvZ1ZlcmJvc2l0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGltaXplZE1vZGVsRmlsZVBhdGhPZmZzZXQgPSB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCA9PT0gJ3N0cmluZycgP1xuICAgICAgICBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCwgYWxsb2NzKSA6XG4gICAgICAgIDA7XG5cbiAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZVNlc3Npb25PcHRpb25zKFxuICAgICAgICBncmFwaE9wdGltaXphdGlvbkxldmVsLCAhIXNlc3Npb25PcHRpb25zLmVuYWJsZUNwdU1lbUFyZW5hLCAhIXNlc3Npb25PcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4sIGV4ZWN1dGlvbk1vZGUsXG4gICAgICAgICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlUHJvZmlsaW5nLCAwLCBsb2dJZERhdGFPZmZzZXQsIGxvZ1NldmVyaXR5TGV2ZWwsIGxvZ1ZlcmJvc2l0eUxldmVsLFxuICAgICAgICBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0KTtcbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBzZXNzaW9uIG9wdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycykge1xuICAgICAgc2V0RXhlY3V0aW9uUHJvdmlkZXJzKHNlc3Npb25PcHRpb25zSGFuZGxlLCBzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMsIGFsbG9jcyk7XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmZyZWVEaW1lbnNpb25PdmVycmlkZXMpIHtcbiAgICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSkge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZSBuYW1lIG11c3QgYmUgYSBzdHJpbmc6ICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgfHwgdmFsdWUgPCAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZSB2YWx1ZSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXI6ICR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhuYW1lLCBhbGxvY3MpO1xuICAgICAgICBpZiAod2FzbS5fT3J0QWRkRnJlZURpbWVuc2lvbk92ZXJyaWRlKHNlc3Npb25PcHRpb25zSGFuZGxlLCBuYW1lT2Zmc2V0LCB2YWx1ZSkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGU6ICR7bmFtZX0gLSAke3ZhbHVlfS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5leHRyYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKHNlc3Npb25PcHRpb25zLmV4dHJhLCAnJywgbmV3IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KCksIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoa2V5LCBhbGxvY3MpO1xuICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XG5cbiAgICAgICAgaWYgKHdhc20uX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJHtrZXl9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBbc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgIHdhc20uX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucyhzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIGFsbG9jcy5mb3JFYWNoKGFsbG9jID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuLy8gVGhpcyBmaWxlIGluY2x1ZGVzIGNvbW1vbiBkZWZpbml0aW9ucy4gVGhleSBkbyBOT1QgaGF2ZSBkZXBlbmRlbmN5IG9uIHRoZSBXZWJBc3NlbWJseSBpbnN0YW5jZS5cblxuLyoqXG4gKiBDb3BpZWQgZnJvbSBPTk5YIGRlZmluaXRpb24uIFVzZSB0aGlzIHRvIGRyb3AgZGVwZW5kZW5jeSAnb25ueF9wcm90bycgdG8gZGVjcmVhc2UgY29tcGlsZWQgLmpzIGZpbGUgc2l6ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gRGF0YVR5cGUge1xuICB1bmRlZmluZWQgPSAwLFxuICBmbG9hdCA9IDEsXG4gIHVpbnQ4ID0gMixcbiAgaW50OCA9IDMsXG4gIHVpbnQxNiA9IDQsXG4gIGludDE2ID0gNSxcbiAgaW50MzIgPSA2LFxuICBpbnQ2NCA9IDcsXG4gIHN0cmluZyA9IDgsXG4gIGJvb2wgPSA5LFxuICBmbG9hdDE2ID0gMTAsXG4gIGRvdWJsZSA9IDExLFxuICB1aW50MzIgPSAxMixcbiAgdWludDY0ID0gMTMsXG4gIGNvbXBsZXg2NCA9IDE0LFxuICBjb21wbGV4MTI4ID0gMTUsXG4gIGJmbG9hdDE2ID0gMTZcbn1cblxuLyoqXG4gKiBNYXAgc3RyaW5nIHRlbnNvciBkYXRhIHRvIGVudW0gdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtID0gKHR5cGU6IHN0cmluZyk6IERhdGFUeXBlID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnaW50OCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50ODtcbiAgICBjYXNlICd1aW50OCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDg7XG4gICAgY2FzZSAnYm9vbCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuYm9vbDtcbiAgICBjYXNlICdpbnQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MTY7XG4gICAgY2FzZSAndWludDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MTY7XG4gICAgY2FzZSAnaW50MzInOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDMyO1xuICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDMyO1xuICAgIGNhc2UgJ2Zsb2F0MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0MTY7XG4gICAgY2FzZSAnZmxvYXQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZmxvYXQ7XG4gICAgY2FzZSAnZmxvYXQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZG91YmxlO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuc3RyaW5nO1xuICAgIGNhc2UgJ2ludDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ2NDtcbiAgICBjYXNlICd1aW50NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ2NDtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xuICB9XG59O1xuXG4vKipcbiAqIE1hcCBlbnVtIHZhbHVlIHRvIHN0cmluZyB0ZW5zb3IgZGF0YVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcgPSAodHlwZVByb3RvOiBEYXRhVHlwZSk6IFRlbnNvci5UeXBlID0+IHtcbiAgc3dpdGNoICh0eXBlUHJvdG8pIHtcbiAgICBjYXNlIERhdGFUeXBlLmludDg6XG4gICAgICByZXR1cm4gJ2ludDgnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDg6XG4gICAgICByZXR1cm4gJ3VpbnQ4JztcbiAgICBjYXNlIERhdGFUeXBlLmJvb2w6XG4gICAgICByZXR1cm4gJ2Jvb2wnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50MTY6XG4gICAgICByZXR1cm4gJ2ludDE2JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQxNjpcbiAgICAgIHJldHVybiAndWludDE2JztcbiAgICBjYXNlIERhdGFUeXBlLmludDMyOlxuICAgICAgcmV0dXJuICdpbnQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50MzI6XG4gICAgICByZXR1cm4gJ3VpbnQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDE2OlxuICAgICAgcmV0dXJuICdmbG9hdDE2JztcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0OlxuICAgICAgcmV0dXJuICdmbG9hdDMyJztcbiAgICBjYXNlIERhdGFUeXBlLmRvdWJsZTpcbiAgICAgIHJldHVybiAnZmxvYXQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS5zdHJpbmc6XG4gICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ2NDpcbiAgICAgIHJldHVybiAnaW50NjQnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDY0OlxuICAgICAgcmV0dXJuICd1aW50NjQnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGVQcm90b31gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBnZXQgdGVuc29yIGVsZW1lbnQgc2l6ZSBpbiBieXRlcyBieSB0aGUgZ2l2ZW4gZGF0YSB0eXBlXG4gKiBAcmV0dXJucyBzaXplIGluIGludGVnZXIgb3IgdW5kZWZpbmVkIGlmIHRoZSBkYXRhIHR5cGUgaXMgbm90IHN1cHBvcnRlZFxuICovXG5leHBvcnQgY29uc3QgZ2V0VGVuc29yRWxlbWVudFNpemUgPSAoZGF0ZVR5cGU6IG51bWJlcik6IG51bWJlcnxcbiAgICB1bmRlZmluZWQgPT4gW3VuZGVmaW5lZCwgNCwgMSwgMSwgMiwgMiwgNCwgOCwgdW5kZWZpbmVkLCAxLCAyLCA4LCA0LCA4LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXVtkYXRlVHlwZV07XG5cbi8qKlxuICogZ2V0IHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yIGJ5IHRoZSBnaXZlbiB0ZW5zb3IgdHlwZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gKHR5cGU6IFRlbnNvci5UeXBlKTogRmxvYXQzMkFycmF5Q29uc3RydWN0b3J8VWludDhBcnJheUNvbnN0cnVjdG9yfFxuICAgIEludDhBcnJheUNvbnN0cnVjdG9yfFVpbnQxNkFycmF5Q29uc3RydWN0b3J8SW50MTZBcnJheUNvbnN0cnVjdG9yfEludDMyQXJyYXlDb25zdHJ1Y3RvcnxCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3J8XG4gICAgVWludDhBcnJheUNvbnN0cnVjdG9yfEZsb2F0NjRBcnJheUNvbnN0cnVjdG9yfFVpbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvciA9PiB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICAgICAgcmV0dXJuIFVpbnQxNkFycmF5O1xuICAgICAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgICAgICByZXR1cm4gRmxvYXQzMkFycmF5O1xuICAgICAgICBjYXNlICd1aW50OCc6XG4gICAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XG4gICAgICAgIGNhc2UgJ2ludDgnOlxuICAgICAgICAgIHJldHVybiBJbnQ4QXJyYXk7XG4gICAgICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICAgICAgcmV0dXJuIFVpbnQxNkFycmF5O1xuICAgICAgICBjYXNlICdpbnQxNic6XG4gICAgICAgICAgcmV0dXJuIEludDE2QXJyYXk7XG4gICAgICAgIGNhc2UgJ2ludDMyJzpcbiAgICAgICAgICByZXR1cm4gSW50MzJBcnJheTtcbiAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XG4gICAgICAgIGNhc2UgJ2Zsb2F0NjQnOlxuICAgICAgICAgIHJldHVybiBGbG9hdDY0QXJyYXk7XG4gICAgICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICAgICAgcmV0dXJuIFVpbnQzMkFycmF5O1xuICAgICAgICBjYXNlICdpbnQ2NCc6XG4gICAgICAgICAgcmV0dXJuIEJpZ0ludDY0QXJyYXk7XG4gICAgICAgIGNhc2UgJ3VpbnQ2NCc6XG4gICAgICAgICAgcmV0dXJuIEJpZ1VpbnQ2NEFycmF5O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZTogJHt0eXBlfWApO1xuICAgICAgfVxuICAgIH07XG5cbi8qKlxuICogTWFwIHN0cmluZyBsb2cgbGV2ZWwgdG8gaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgbG9nTGV2ZWxTdHJpbmdUb0VudW0gPSAobG9nTGV2ZWw/OiAndmVyYm9zZSd8J2luZm8nfCd3YXJuaW5nJ3wnZXJyb3InfCdmYXRhbCcpOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGxvZ0xldmVsKSB7XG4gICAgY2FzZSAndmVyYm9zZSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdpbmZvJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAnZXJyb3InOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSAnZmF0YWwnOlxuICAgICAgcmV0dXJuIDQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHtsb2dMZXZlbH1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBnaXZlbiB0ZW5zb3IgdHlwZSBpcyBzdXBwb3J0ZWQgYnkgR1BVIGJ1ZmZlclxuICovXG5leHBvcnQgY29uc3QgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlID0gKHR5cGU6IFRlbnNvci5UeXBlKTogdHlwZSBpcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0+IHR5cGUgPT09ICdmbG9hdDMyJyB8fFxuICAgIHR5cGUgPT09ICdpbnQzMicgfHwgdHlwZSA9PT0gJ2ludDY0JyB8fCB0eXBlID09PSAnYm9vbCcgfHwgdHlwZSA9PT0gJ2Zsb2F0MTYnIHx8IHR5cGUgPT09ICd1aW50MzInO1xuXG4vKipcbiAqIE1hcCBzdHJpbmcgZGF0YSBsb2NhdGlvbiB0byBpbnRlZ2VyIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0gPSAobG9jYXRpb246IFRlbnNvci5EYXRhTG9jYXRpb24pOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGxvY2F0aW9uKSB7XG4gICAgY2FzZSAnbm9uZSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAnY3B1LXBpbm5lZCc6XG4gICAgICByZXR1cm4gMjtcbiAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxuICAgICAgcmV0dXJuIDQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSBsb2NhdGlvbjogJHtsb2NhdGlvbn1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgaW50ZWdlciBkYXRhIGxvY2F0aW9uIHRvIHN0cmluZyB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZGF0YUxvY2F0aW9uRW51bVRvU3RyaW5nID0gKGxvY2F0aW9uOiBudW1iZXIpOiBUZW5zb3IuRGF0YUxvY2F0aW9ufHVuZGVmaW5lZCA9PlxuICAgIChbJ25vbmUnLCAnY3B1JywgJ2NwdS1waW5uZWQnLCAndGV4dHVyZScsICdncHUtYnVmZmVyJ10gYXMgY29uc3QpW2xvY2F0aW9uXTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtFbnYsIEluZmVyZW5jZVNlc3Npb24sIFRlbnNvcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtTZXJpYWxpemFibGVNb2RlbGRhdGEsIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSwgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEsIFRlbnNvck1ldGFkYXRhfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCB7c2V0UnVuT3B0aW9uc30gZnJvbSAnLi9ydW4tb3B0aW9ucyc7XG5pbXBvcnQge3NldFNlc3Npb25PcHRpb25zfSBmcm9tICcuL3Nlc3Npb24tb3B0aW9ucyc7XG5pbXBvcnQge2RhdGFMb2NhdGlvblN0cmluZ1RvRW51bSwgZ2V0VGVuc29yRWxlbWVudFNpemUsIGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSwgbG9nTGV2ZWxTdHJpbmdUb0VudW0sIHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nLCB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bSwgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yfSBmcm9tICcuL3dhc20tY29tbW9uJztcbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7YWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvcn0gZnJvbSAnLi93YXNtLXV0aWxzJztcblxubGV0IG9ydEVudkluaXRpYWxpemVkID0gZmFsc2U7XG5cbi8qKlxuICogZ2V0IHRoZSBpbnB1dC9vdXRwdXQgY291bnQgb2YgdGhlIHNlc3Npb24uXG4gKiBAcGFyYW0gc2Vzc2lvbkhhbmRsZSB0aGUgaGFuZGxlIHJlcHJlc2VudGluZyB0aGUgc2Vzc2lvbi4gc2hvdWxkIGJlIG5vbi16ZXJvLlxuICogQHJldHVybnMgYSB0dXBsZSBpbmNsdWRpbmcgMiBudW1iZXJzLCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGNvdW50IGFuZCBvdXRwdXQgY291bnQuXG4gKi9cbmNvbnN0IGdldFNlc3Npb25JbnB1dE91dHB1dENvdW50ID0gKHNlc3Npb25IYW5kbGU6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoOCk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0SW5wdXRPdXRwdXRDb3VudChzZXNzaW9uSGFuZGxlLCBkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgNCk7XG4gICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IGNvdW50LicpO1xuICAgIH1cbiAgICByZXR1cm4gW3dhc20uSEVBUDMyW2RhdGFPZmZzZXQgLyA0XSwgd2FzbS5IRUFQMzJbZGF0YU9mZnNldCAvIDQgKyAxXV07XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuXG4vKipcbiAqIGluaXRpYWxpemUgT1JUIGVudmlyb25tZW50LlxuICogQHBhcmFtIG51bVRocmVhZHMgU2V0R2xvYmFsSW50cmFPcE51bVRocmVhZHMobnVtVGhyZWFkcylcbiAqIEBwYXJhbSBsb2dnaW5nTGV2ZWwgQ3JlYXRlRW52KHN0YXRpY19jYXN0PE9ydExvZ2dpbmdMZXZlbD4obG9nZ2luZ19sZXZlbCkpXG4gKi9cbmNvbnN0IGluaXRPcnQgPSAobnVtVGhyZWFkczogbnVtYmVyLCBsb2dnaW5nTGV2ZWw6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCBlcnJvckNvZGUgPSBnZXRJbnN0YW5jZSgpLl9PcnRJbml0KG51bVRocmVhZHMsIGxvZ2dpbmdMZXZlbCk7XG4gIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBpbml0aWFsaXplIG9ubnhydW50aW1lLicpO1xuICB9XG59O1xuXG4vKipcbiAqIGludGlhbGl6ZSBydW50aW1lIGVudmlyb25tZW50LlxuICogQHBhcmFtIGVudiBwYXNzZWQgaW4gdGhlIGVudmlyb25tZW50IGNvbmZpZyBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0UnVudGltZSA9IGFzeW5jKGVudjogRW52KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIC8vIGluaXQgT1JUXG4gIGluaXRPcnQoZW52Lndhc20ubnVtVGhyZWFkcyEsIGxvZ0xldmVsU3RyaW5nVG9FbnVtKGVudi5sb2dMZXZlbCkpO1xuXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgIC8vIGluaXQgSlNFUCBpZiBhdmFpbGFibGVcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gICAgY29uc3QgaW5pdEpzZXAgPSByZXF1aXJlKCcuL2pzZXAvaW5pdCcpLmluaXQ7XG4gICAgYXdhaXQgaW5pdEpzZXAoZ2V0SW5zdGFuY2UoKSwgZW52KTtcbiAgfVxuXG4gIG9ydEVudkluaXRpYWxpemVkID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogdmFsaWQgZGF0YSBsb2NhdGlvbnMgZm9yIGlucHV0L291dHB1dCB0ZW5zb3JzLlxuICovXG50eXBlIFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0ID0gJ2NwdSd8J2NwdS1waW5uZWQnfCdncHUtYnVmZmVyJztcblxudHlwZSBJT0JpbmRpbmdTdGF0ZSA9IHtcbiAgLyoqXG4gICAqIHRoZSBoYW5kbGUgb2YgSU8gYmluZGluZy5cbiAgICovXG4gIHJlYWRvbmx5IGhhbmRsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiB0aGUgcHJlZmVycmVkIGxvY2F0aW9uIGZvciBlYWNoIG91dHB1dCB0ZW5zb3IuXG4gICAqXG4gICAqIHZhbHVlIGlzIG9uZSBvZiAnY3B1JywgJ2NwdS1waW5uZWQnLCAnZ3B1LWJ1ZmZlcicuXG4gICAqL1xuICByZWFkb25seSBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnM6IHJlYWRvbmx5IFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0W107XG5cbiAgLyoqXG4gICAqIGVudW0gdmFsdWUgb2YgdGhlIHByZWZlcnJlZCBsb2NhdGlvbiBmb3IgZWFjaCBvdXRwdXQgdGVuc29yLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZDogcmVhZG9ubHkgbnVtYmVyW107XG59O1xuXG4vKipcbiAqICB0dXBsZSBlbGVtZW50cyBhcmU6IEluZmVyZW5jZVNlc3Npb24gSUQ7IGlucHV0TmFtZXNVVEY4RW5jb2RlZDsgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZDsgYmluZGluZ1N0YXRlXG4gKi9cbnR5cGUgU2Vzc2lvbk1ldGFkYXRhID0gW1xuICBpbmZlcmVuY2VTZXNzaW9uSWQ6IG51bWJlciwgaW5wdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZDogbnVtYmVyW10sXG4gIGJpbmRpbmdTdGF0ZTogSU9CaW5kaW5nU3RhdGV8bnVsbFxuXTtcblxuY29uc3QgYWN0aXZlU2Vzc2lvbnMgPSBuZXcgTWFwPG51bWJlciwgU2Vzc2lvbk1ldGFkYXRhPigpO1xuXG5leHBvcnQgY29uc3QgaXNPcnRFbnZJbml0aWFsaXplZCA9ICgpOiBib29sZWFuID0+IG9ydEVudkluaXRpYWxpemVkO1xuXG4vKipcbiAqIGFsbG9jYXRlIHRoZSBtZW1vcnkgYW5kIG1lbWNweSB0aGUgbW9kZWwgYnl0ZXMsIHByZXBhcmluZyBmb3IgY3JlYXRpbmcgYW4gaW5zdGFuY2Ugb2YgSW5mZXJlbmNlU2Vzc2lvbi5cbiAqIEByZXR1cm5zIGEgMi1lbGVtZW50cyB0dXBsZSAtIHRoZSBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBhbGxvY2F0ZWQgYnVmZmVyXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uQWxsb2NhdGUgPSAobW9kZWw6IFVpbnQ4QXJyYXkpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IG1vZGVsRGF0YU9mZnNldCA9IHdhc20uX21hbGxvYyhtb2RlbC5ieXRlTGVuZ3RoKTtcbiAgaWYgKG1vZGVsRGF0YU9mZnNldCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgY3JlYXRlIGEgc2Vzc2lvbi4gZmFpbGVkIHRvIGFsbG9jYXRlIGEgYnVmZmVyIG9mIHNpemUgJHttb2RlbC5ieXRlTGVuZ3RofS5gKTtcbiAgfVxuICB3YXNtLkhFQVBVOC5zZXQobW9kZWwsIG1vZGVsRGF0YU9mZnNldCk7XG4gIHJldHVybiBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbC5ieXRlTGVuZ3RoXTtcbn07XG5cbi8qKlxuICogY3JlYXRlIGFuIGluZmVyZW5jZSBzZXNzaW9uIHVzaW5nIHRoZSBwcmVwYXJlZCBidWZmZXIgY29udGFpbmluZyB0aGUgbW9kZWwgZGF0YS5cbiAqIEBwYXJhbSBtb2RlbERhdGEgYSAyLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIG1vZGVsIGRhdGEgYnVmZmVyLlxuICogQHBhcmFtIG9wdGlvbnMgYW4gb3B0aW9uYWwgc2Vzc2lvbiBvcHRpb25zIG9iamVjdC5cbiAqIEByZXR1cm5zIGEgMy1lbGVtZW50cyB0dXBsZSBjb250YWluaW5nIFtzZXNzaW9uIGhhbmRsZSwgaW5wdXQgbmFtZXMsIG91dHB1dCBuYW1lc11cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb25GaW5hbGl6ZSA9XG4gICAgKG1vZGVsRGF0YTogU2VyaWFsaXphYmxlTW9kZWxkYXRhLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSA9PiB7XG4gICAgICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICAgICAgbGV0IHNlc3Npb25IYW5kbGUgPSAwO1xuICAgICAgbGV0IHNlc3Npb25PcHRpb25zSGFuZGxlID0gMDtcbiAgICAgIGxldCBpb0JpbmRpbmdIYW5kbGUgPSAwO1xuICAgICAgbGV0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcbiAgICAgIGNvbnN0IGlucHV0TmFtZXNVVEY4RW5jb2RlZCA9IFtdO1xuICAgICAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IFtdO1xuXG4gICAgICB0cnkge1xuICAgICAgICBbc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGFsbG9jc10gPSBzZXRTZXNzaW9uT3B0aW9ucyhvcHRpb25zKTtcblxuICAgICAgICBzZXNzaW9uSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlU2Vzc2lvbihtb2RlbERhdGFbMF0sIG1vZGVsRGF0YVsxXSwgc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgICAgICBpZiAoc2Vzc2lvbkhhbmRsZSA9PT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBhIHNlc3Npb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBbaW5wdXRDb3VudCwgb3V0cHV0Q291bnRdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSk7XG5cbiAgICAgICAgY29uc3QgaW5wdXROYW1lcyA9IFtdO1xuICAgICAgICBjb25zdCBvdXRwdXROYW1lcyA9IFtdO1xuICAgICAgICBjb25zdCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnM6IFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBuYW1lID0gd2FzbS5fT3J0R2V0SW5wdXROYW1lKHNlc3Npb25IYW5kbGUsIGkpO1xuICAgICAgICAgIGlmIChuYW1lID09PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgYW4gaW5wdXQgbmFtZS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLnB1c2gobmFtZSk7XG4gICAgICAgICAgaW5wdXROYW1lcy5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBuYW1lID0gd2FzbS5fT3J0R2V0T3V0cHV0TmFtZShzZXNzaW9uSGFuZGxlLCBpKTtcbiAgICAgICAgICBpZiAobmFtZSA9PT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgZ2V0IGFuIG91dHB1dCBuYW1lLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLnB1c2gobmFtZSk7XG4gICAgICAgICAgY29uc3QgbmFtZVN0cmluZyA9IHdhc20uVVRGOFRvU3RyaW5nKG5hbWUpO1xuICAgICAgICAgIG91dHB1dE5hbWVzLnB1c2gobmFtZVN0cmluZyk7XG5cbiAgICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdHlwZW9mIG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbiA6XG4gICAgICAgICAgICAgICAgb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24/LltuYW1lU3RyaW5nXSA/PyAnY3B1JztcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbiAhPT0gJ2NwdScgJiYgbG9jYXRpb24gIT09ICdjcHUtcGlubmVkJyAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCBwcmVmZXJyZWQgb3V0cHV0IGxvY2F0aW9uOiAke2xvY2F0aW9ufS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1c2UgSU8gYmluZGluZyBvbmx5IHdoZW4gYXQgbGVhc3Qgb25lIG91dHB1dCBpcyBwcmVmZmVyZWQgdG8gYmUgb24gR1BVLlxuICAgICAgICBsZXQgYmluZGluZ1N0YXRlOiBJT0JpbmRpbmdTdGF0ZXxudWxsID0gbnVsbDtcbiAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVICYmIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5zb21lKGwgPT4gbCA9PT0gJ2dwdS1idWZmZXInKSkge1xuICAgICAgICAgIGlvQmluZGluZ0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZUJpbmRpbmcoc2Vzc2lvbkhhbmRsZSk7XG4gICAgICAgICAgaWYgKGlvQmluZGluZ0hhbmRsZSA9PT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIElPIGJpbmRpbmcuJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYmluZGluZ1N0YXRlID0ge1xuICAgICAgICAgICAgaGFuZGxlOiBpb0JpbmRpbmdIYW5kbGUsXG4gICAgICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsXG4gICAgICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkOiBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMubWFwKGwgPT4gZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGwpKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25IYW5kbGUsIFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGJpbmRpbmdTdGF0ZV0pO1xuICAgICAgICByZXR1cm4gW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXMsIG91dHB1dE5hbWVzXTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goYnVmID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcblxuICAgICAgICBpZiAoaW9CaW5kaW5nSGFuZGxlICE9PSAwKSB7XG4gICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nSGFuZGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXNzaW9uSGFuZGxlICE9PSAwKSB7XG4gICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb24oc2Vzc2lvbkhhbmRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uX2ZyZWUobW9kZWxEYXRhWzBdKTtcbiAgICAgICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zKHNlc3Npb25PcHRpb25zSGFuZGxlKTtcbiAgICAgICAgfVxuICAgICAgICBhbGxvY3MuZm9yRWFjaChhbGxvYyA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgICB9XG4gICAgfTtcblxuXG4vKipcbiAqIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiBJbmZlcmVuY2VTZXNzaW9uLlxuICogQHJldHVybnMgdGhlIG1ldGFkYXRhIG9mIEluZmVyZW5jZVNlc3Npb24uIDAtdmFsdWUgaGFuZGxlIGZvciBmYWlsdXJlLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9XG4gICAgKG1vZGVsOiBVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSA9PiB7XG4gICAgICBjb25zdCBtb2RlbERhdGE6IFNlcmlhbGl6YWJsZU1vZGVsZGF0YSA9IGNyZWF0ZVNlc3Npb25BbGxvY2F0ZShtb2RlbCk7XG4gICAgICByZXR1cm4gY3JlYXRlU2Vzc2lvbkZpbmFsaXplKG1vZGVsRGF0YSwgb3B0aW9ucyk7XG4gICAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJlbGVhc2Ugc2Vzc2lvbi4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcbiAgfVxuICBjb25zdCBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZV0gPSBzZXNzaW9uO1xuXG4gIGlmIChpb0JpbmRpbmdTdGF0ZSkge1xuICAgIHdhc20uX09ydFJlbGVhc2VCaW5kaW5nKGlvQmluZGluZ1N0YXRlLmhhbmRsZSk7XG4gIH1cblxuICB3YXNtLmpzZXBVbnJlZ2lzdGVyQnVmZmVycz8uKHNlc3Npb25JZCk7XG5cbiAgaW5wdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goYnVmID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG4gIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb24oc2Vzc2lvbkhhbmRsZSk7XG4gIGFjdGl2ZVNlc3Npb25zLmRlbGV0ZShzZXNzaW9uSWQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVJbnB1dE91dHB1dFRlbnNvciA9XG4gICAgKHRlbnNvcjogVGVuc29yTWV0YWRhdGF8bnVsbCwgdGVuc29ySGFuZGxlczogbnVtYmVyW10sIGFsbG9jczogbnVtYmVyW10sIHNlc3Npb25JZDogbnVtYmVyLCBpbmRleDogbnVtYmVyKTpcbiAgICAgICAgdm9pZCA9PiB7XG4gICAgICAgICAgaWYgKCF0ZW5zb3IpIHtcbiAgICAgICAgICAgIHRlbnNvckhhbmRsZXMucHVzaCgwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICAgICAgICAgIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xuICAgICAgICAgIGNvbnN0IGRpbXMgPSB0ZW5zb3JbMV07XG4gICAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0ZW5zb3JbM107XG5cbiAgICAgICAgICBsZXQgcmF3RGF0YTogbnVtYmVyO1xuICAgICAgICAgIGxldCBkYXRhQnl0ZUxlbmd0aDogbnVtYmVyO1xuXG4gICAgICAgICAgaWYgKGRhdGFUeXBlID09PSAnc3RyaW5nJyAmJiBsb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGxvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IHRlbnNvclsyXS5ncHVCdWZmZXIgYXMgR1BVQnVmZmVyO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFNpemVJbkJ5dGVzID0gZ2V0VGVuc29yRWxlbWVudFNpemUodGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpKSE7XG4gICAgICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRpbXMucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSkgKiBlbGVtZW50U2l6ZUluQnl0ZXM7XG4gICAgICAgICAgICByYXdEYXRhID0gd2FzbS5qc2VwUmVnaXN0ZXJCdWZmZXIoc2Vzc2lvbklkLCBpbmRleCwgZ3B1QnVmZmVyLCBkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0ZW5zb3JbMl07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgIC8vIHN0cmluZyB0ZW5zb3JcbiAgICAgICAgICAgICAgZGF0YUJ5dGVMZW5ndGggPSA0ICogZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcbiAgICAgICAgICAgICAgbGV0IGRhdGFJbmRleCA9IHJhd0RhdGEgLyA0O1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB0ZW5zb3IgZGF0YSBhdCBpbmRleCAke2l9IGlzIG5vdCBhIHN0cmluZ2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3YXNtLkhFQVBVMzJbZGF0YUluZGV4KytdID0gYWxsb2NXYXNtU3RyaW5nKGRhdGFbaV0sIGFsbG9jcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICAgICAgICByYXdEYXRhID0gd2FzbS5fbWFsbG9jKGRhdGFCeXRlTGVuZ3RoKTtcbiAgICAgICAgICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICAgICAgICAgIHdhc20uSEVBUFU4LnNldChuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhQnl0ZUxlbmd0aCksIHJhd0RhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgICAgICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDQgKiBkaW1zLmxlbmd0aCk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkaW1JbmRleCA9IGRpbXNPZmZzZXQgLyA0O1xuICAgICAgICAgICAgZGltcy5mb3JFYWNoKGQgPT4gd2FzbS5IRUFQMzJbZGltSW5kZXgrK10gPSBkKTtcbiAgICAgICAgICAgIGNvbnN0IHRlbnNvciA9IHdhc20uX09ydENyZWF0ZVRlbnNvcihcbiAgICAgICAgICAgICAgICB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksIHJhd0RhdGEsIGRhdGFCeXRlTGVuZ3RoLCBkaW1zT2Zmc2V0LCBkaW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obG9jYXRpb24pKTtcbiAgICAgICAgICAgIGlmICh0ZW5zb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGNyZWF0ZSB0ZW5zb3IgZm9yIGlucHV0L291dHB1dC4gc2Vzc2lvbj0ke3Nlc3Npb25JZH0sIGluZGV4PSR7aW5kZXh9LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVuc29ySGFuZGxlcy5wdXNoKHRlbnNvcik7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbi8qKlxuICogcGVyZm9ybSBpbmZlcmVuY2UgcnVuXG4gKi9cbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyhcbiAgICBzZXNzaW9uSWQ6IG51bWJlciwgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSwgaW5wdXRUZW5zb3JzOiBUZW5zb3JNZXRhZGF0YVtdLCBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgICBvdXRwdXRUZW5zb3JzOiBBcnJheTxUZW5zb3JNZXRhZGF0YXxudWxsPiwgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJ1biBpbmZlcmVuY2UuIGludmFsaWQgc2Vzc2lvbiBpZDogJHtzZXNzaW9uSWR9YCk7XG4gIH1cbiAgY29uc3QgW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZCwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCwgaW9CaW5kaW5nU3RhdGVdID0gc2Vzc2lvbjtcblxuICBjb25zdCBpbnB1dENvdW50ID0gaW5wdXRJbmRpY2VzLmxlbmd0aDtcbiAgY29uc3Qgb3V0cHV0Q291bnQgPSBvdXRwdXRJbmRpY2VzLmxlbmd0aDtcblxuICBsZXQgcnVuT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGxldCBydW5PcHRpb25zQWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IGlucHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3Qgb3V0cHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3QgaW5wdXRPdXRwdXRBbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3QgYmVmb3JlUnVuU3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICBjb25zdCBpbnB1dFZhbHVlc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhpbnB1dENvdW50ICogNCk7XG4gIGNvbnN0IGlucHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIDQpO1xuICBjb25zdCBvdXRwdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2Mob3V0cHV0Q291bnQgKiA0KTtcbiAgY29uc3Qgb3V0cHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2Mob3V0cHV0Q291bnQgKiA0KTtcblxuICB0cnkge1xuICAgIFtydW5PcHRpb25zSGFuZGxlLCBydW5PcHRpb25zQWxsb2NzXSA9IHNldFJ1bk9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAvLyBjcmVhdGUgaW5wdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IoaW5wdXRUZW5zb3JzW2ldLCBpbnB1dFRlbnNvckhhbmRsZXMsIGlucHV0T3V0cHV0QWxsb2NzLCBzZXNzaW9uSWQsIGlucHV0SW5kaWNlc1tpXSk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG91dHB1dCB0ZW5zb3JzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IoXG4gICAgICAgICAgb3V0cHV0VGVuc29yc1tpXSwgb3V0cHV0VGVuc29ySGFuZGxlcywgaW5wdXRPdXRwdXRBbGxvY3MsIHNlc3Npb25JZCwgaW5wdXRDb3VudCArIG91dHB1dEluZGljZXNbaV0pO1xuICAgIH1cblxuICAgIGxldCBpbnB1dFZhbHVlc0luZGV4ID0gaW5wdXRWYWx1ZXNPZmZzZXQgLyA0O1xuICAgIGxldCBpbnB1dE5hbWVzSW5kZXggPSBpbnB1dE5hbWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgb3V0cHV0VmFsdWVzSW5kZXggPSBvdXRwdXRWYWx1ZXNPZmZzZXQgLyA0O1xuICAgIGxldCBvdXRwdXROYW1lc0luZGV4ID0gb3V0cHV0TmFtZXNPZmZzZXQgLyA0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICB3YXNtLkhFQVBVMzJbaW5wdXRWYWx1ZXNJbmRleCsrXSA9IGlucHV0VGVuc29ySGFuZGxlc1tpXTtcbiAgICAgIHdhc20uSEVBUFUzMltpbnB1dE5hbWVzSW5kZXgrK10gPSBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5wdXRJbmRpY2VzW2ldXTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICB3YXNtLkhFQVBVMzJbb3V0cHV0VmFsdWVzSW5kZXgrK10gPSBvdXRwdXRUZW5zb3JIYW5kbGVzW2ldO1xuICAgICAgd2FzbS5IRUFQVTMyW291dHB1dE5hbWVzSW5kZXgrK10gPSBvdXRwdXROYW1lc1VURjhFbmNvZGVkW291dHB1dEluZGljZXNbaV1dO1xuICAgIH1cblxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSAmJiBpb0JpbmRpbmdTdGF0ZSkge1xuICAgICAgY29uc3Qge2hhbmRsZSwgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkfSA9IGlvQmluZGluZ1N0YXRlO1xuXG4gICAgICBpZiAoaW5wdXROYW1lc1VURjhFbmNvZGVkLmxlbmd0aCAhPT0gaW5wdXRDb3VudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlucHV0IGNvdW50IGZyb20gZmVlZHMgKCR7XG4gICAgICAgICAgICBpbnB1dENvdW50fSkgaXMgZXhwZWN0ZWQgdG8gYmUgYWx3YXlzIGVxdWFsIHRvIG1vZGVsJ3MgaW5wdXQgY291bnQgKCR7aW5wdXROYW1lc1VURjhFbmNvZGVkLmxlbmd0aH0pLmApO1xuICAgICAgfVxuXG4gICAgICAvLyBwcm9jZXNzIGlucHV0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBpbnB1dEluZGljZXNbaV07XG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydEJpbmRJbnB1dChoYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIGlucHV0VGVuc29ySGFuZGxlc1tpXSk7XG4gICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBpbnB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcHJvY2VzcyBwcmUtYWxsb2NhdGVkIG91dHB1dHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IG91dHB1dEluZGljZXNbaV07XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gb3V0cHV0VGVuc29yc1tpXT8uWzNdOyAgLy8gdW5kZWZpbmVkIG1lYW5zIG91dHB1dCBpcyBub3QgcHJlLWFsbG9jYXRlZC5cblxuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAvLyBvdXRwdXQgaXMgcHJlLWFsbG9jYXRlZC4gYmluZCB0aGUgdGVuc29yLlxuICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEJpbmRPdXRwdXQoaGFuZGxlLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgb3V0cHV0VGVuc29ySGFuZGxlc1tpXSwgMCk7XG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgcHJlLWFsbG9jYXRlZCBvdXRwdXRbJHtpfV0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuIHJlc2V0IHByZWZlcnJlZCBsb2NhdGlvbi5cbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPVxuICAgICAgICAgICAgICB3YXNtLl9PcnRCaW5kT3V0cHV0KGhhbmRsZSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIDAsIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWRbaW5kZXhdKTtcbiAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBvdXRwdXRbJHtpfV0gdG8gJHtvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbaV19IGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZXJyb3JDb2RlOiBudW1iZXI7XG5cbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgaW9CaW5kaW5nU3RhdGUpIHtcbiAgICAgIGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydFJ1bldpdGhCaW5kaW5nKFxuICAgICAgICAgIHNlc3Npb25IYW5kbGUsIGlvQmluZGluZ1N0YXRlLmhhbmRsZSwgb3V0cHV0Q291bnQsIG91dHB1dFZhbHVlc09mZnNldCwgcnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydFJ1bihcbiAgICAgICAgICBzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzT2Zmc2V0LCBpbnB1dFZhbHVlc09mZnNldCwgaW5wdXRDb3VudCwgb3V0cHV0TmFtZXNPZmZzZXQsIG91dHB1dENvdW50LFxuICAgICAgICAgIG91dHB1dFZhbHVlc09mZnNldCwgcnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuXG4gICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ2ZhaWxlZCB0byBjYWxsIE9ydFJ1bigpLicpO1xuICAgIH1cblxuICAgIGNvbnN0IG91dHB1dDogVGVuc29yTWV0YWRhdGFbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCB0ZW5zb3IgPSB3YXNtLkhFQVBVMzJbb3V0cHV0VmFsdWVzT2Zmc2V0IC8gNCArIGldO1xuICAgICAgaWYgKHRlbnNvciA9PT0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXSkge1xuICAgICAgICAvLyBvdXRwdXQgdGVuc29yIGlzIHByZS1hbGxvY2F0ZWQuIG5vIG5lZWQgdG8gY29weSBkYXRhLlxuICAgICAgICBvdXRwdXQucHVzaChvdXRwdXRUZW5zb3JzW2ldISk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiZWZvcmVHZXRUZW5zb3JEYXRhU3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICAgICAgLy8gc3RhY2sgYWxsb2NhdGUgNCBwb2ludGVyIHZhbHVlXG4gICAgICBjb25zdCB0ZW5zb3JEYXRhT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDQgKiA0KTtcblxuICAgICAgbGV0IGtlZXBPdXRwdXRUZW5zb3IgPSBmYWxzZTtcbiAgICAgIGxldCB0eXBlOiBUZW5zb3IuVHlwZXx1bmRlZmluZWQsIGRhdGFPZmZzZXQgPSAwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0VGVuc29yRGF0YShcbiAgICAgICAgICAgIHRlbnNvciwgdGVuc29yRGF0YU9mZnNldCwgdGVuc29yRGF0YU9mZnNldCArIDQsIHRlbnNvckRhdGFPZmZzZXQgKyA4LCB0ZW5zb3JEYXRhT2Zmc2V0ICsgMTIpO1xuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFjY2VzcyBvdXRwdXQgdGVuc29yIGRhdGEgb24gaW5kZXggJHtpfS5gKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGVuc29yRGF0YUluZGV4ID0gdGVuc29yRGF0YU9mZnNldCAvIDQ7XG4gICAgICAgIGNvbnN0IGRhdGFUeXBlID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgZGF0YU9mZnNldCA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBjb25zdCBkaW1zTGVuZ3RoID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgY29uc3QgZGltcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRpbXMucHVzaCh3YXNtLkhFQVBVMzJbZGltc09mZnNldCAvIDQgKyBpXSk7XG4gICAgICAgIH1cbiAgICAgICAgd2FzbS5fT3J0RnJlZShkaW1zT2Zmc2V0KTtcblxuICAgICAgICBjb25zdCBzaXplID0gZGltcy5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKTtcbiAgICAgICAgdHlwZSA9IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nKGRhdGFUeXBlKTtcblxuICAgICAgICBjb25zdCBwcmVmZXJyZWRMb2NhdGlvbiA9IGlvQmluZGluZ1N0YXRlPy5vdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbb3V0cHV0SW5kaWNlc1tpXV07XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RyaW5nIHRlbnNvciBpcyBub3Qgc3VwcG9ydGVkIG9uIEdQVS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc3RyaW5nRGF0YTogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICBsZXQgZGF0YUluZGV4ID0gZGF0YU9mZnNldCAvIDQ7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHdhc20uSEVBUFUzMltkYXRhSW5kZXgrK107XG4gICAgICAgICAgICBjb25zdCBtYXhCeXRlc1RvUmVhZCA9IGkgPT09IHNpemUgLSAxID8gdW5kZWZpbmVkIDogd2FzbS5IRUFQVTMyW2RhdGFJbmRleF0gLSBvZmZzZXQ7XG4gICAgICAgICAgICBzdHJpbmdEYXRhLnB1c2god2FzbS5VVEY4VG9TdHJpbmcob2Zmc2V0LCBtYXhCeXRlc1RvUmVhZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgc3RyaW5nRGF0YSwgJ2NwdSddKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBhIGNlcnRhaW4gb3V0cHV0J3MgcHJlZmVycmVkIGxvY2F0aW9uIGlzIEdQVSBidXQgdGhlIHRlbnNvciBpcyBlbXB0eSwgd2Ugc3RpbGwgbmVlZCB0byBjcmVhdGUgYSBDUFVcbiAgICAgICAgICAvLyB0ZW5zb3IgZm9yIGl0LiBUaGVyZSBpcyBubyBtYXBwaW5nIEdQVSBidWZmZXIgZm9yIGFuIGVtcHR5IHRlbnNvci5cbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyAmJiBzaXplID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZ3B1QnVmZmVyID0gd2FzbS5qc2VwR2V0QnVmZmVyKGRhdGFPZmZzZXQpO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFNpemUgPSBnZXRUZW5zb3JFbGVtZW50U2l6ZShkYXRhVHlwZSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudFNpemUgPT09IHVuZGVmaW5lZCB8fCAhaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlKHR5cGUpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRvIG5vdCByZWxlYXNlIHRoZSB0ZW5zb3IgcmlnaHQgbm93LiBpdCB3aWxsIGJlIHJlbGVhc2VkIHdoZW4gdXNlciBjYWxscyB0ZW5zb3IuZGlzcG9zZSgpLlxuICAgICAgICAgICAga2VlcE91dHB1dFRlbnNvciA9IHRydWU7XG5cbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcbiAgICAgICAgICAgICAgdHlwZSwgZGltcywge1xuICAgICAgICAgICAgICAgIGdwdUJ1ZmZlcixcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogd2FzbS5qc2VwQ3JlYXRlRG93bmxvYWRlcihncHVCdWZmZXIsIHNpemUgKiBlbGVtZW50U2l6ZSwgdHlwZSksXG4gICAgICAgICAgICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgJ2dwdS1idWZmZXInXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdHlwZWRBcnJheUNvbnN0cnVjdG9yID0gdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yKHR5cGUpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG5ldyB0eXBlZEFycmF5Q29uc3RydWN0b3Ioc2l6ZSk7XG4gICAgICAgICAgICBuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAgICAgLnNldCh3YXNtLkhFQVBVOC5zdWJhcnJheShkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgZGF0YS5ieXRlTGVuZ3RoKSk7XG4gICAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgZGF0YSwgJ2NwdSddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uc3RhY2tSZXN0b3JlKGJlZm9yZUdldFRlbnNvckRhdGFTdGFjayk7XG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiBkYXRhT2Zmc2V0KSB7XG4gICAgICAgICAgd2FzbS5fZnJlZShkYXRhT2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWtlZXBPdXRwdXRUZW5zb3IpIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW9CaW5kaW5nU3RhdGUpIHtcbiAgICAgIHdhc20uX09ydENsZWFyQm91bmRPdXRwdXRzKGlvQmluZGluZ1N0YXRlLmhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShiZWZvcmVSdW5TdGFjayk7XG5cbiAgICBpbnB1dFRlbnNvckhhbmRsZXMuZm9yRWFjaCh2ID0+IHdhc20uX09ydFJlbGVhc2VUZW5zb3IodikpO1xuICAgIG91dHB1dFRlbnNvckhhbmRsZXMuZm9yRWFjaCh2ID0+IHdhc20uX09ydFJlbGVhc2VUZW5zb3IodikpO1xuICAgIGlucHV0T3V0cHV0QWxsb2NzLmZvckVhY2gocCA9PiB3YXNtLl9mcmVlKHApKTtcblxuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgcnVuT3B0aW9uc0FsbG9jcy5mb3JFYWNoKHAgPT4gd2FzbS5fZnJlZShwKSk7XG4gIH1cbn07XG5cbi8qKlxuICogZW5kIHByb2ZpbGluZ1xuICovXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzZXNzaW9uIGlkJyk7XG4gIH1cbiAgY29uc3Qgc2Vzc2lvbkhhbmRsZSA9IHNlc3Npb25bMF07XG5cbiAgLy8gcHJvZmlsZSBmaWxlIG5hbWUgaXMgbm90IHVzZWQgeWV0LCBidXQgaXQgbXVzdCBiZSBmcmVlZC5cbiAgY29uc3QgcHJvZmlsZUZpbGVOYW1lID0gd2FzbS5fT3J0RW5kUHJvZmlsaW5nKHNlc3Npb25IYW5kbGUpO1xuICBpZiAocHJvZmlsZUZpbGVOYW1lID09PSAwKSB7XG4gICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgZ2V0IGFuIHByb2ZpbGUgZmlsZSBuYW1lLicpO1xuICB9XG4gIHdhc20uX09ydEZyZWUocHJvZmlsZUZpbGVOYW1lKTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyA9ICh0ZW5zb3JzOiByZWFkb25seSBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKTogQXJyYXlCdWZmZXJMaWtlW10gPT4ge1xuICBjb25zdCBidWZmZXJzOiBBcnJheUJ1ZmZlckxpa2VbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHRlbnNvciBvZiB0ZW5zb3JzKSB7XG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkgJiYgJ2J1ZmZlcicgaW4gZGF0YSkge1xuICAgICAgYnVmZmVycy5wdXNoKGRhdGEuYnVmZmVyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ1ZmZlcnM7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0VudiwgZW52LCBJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge09ydFdhc21NZXNzYWdlLCBTZXJpYWxpemFibGVNb2RlbGRhdGEsIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSwgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEsIFRlbnNvck1ldGFkYXRhfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnLi93YXNtLWNvcmUtaW1wbCc7XG5pbXBvcnQge2luaXRpYWxpemVXZWJBc3NlbWJseX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuXG5jb25zdCBpc1Byb3h5ID0gKCk6IGJvb2xlYW4gPT4gISFlbnYud2FzbS5wcm94eSAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xubGV0IHByb3h5V29ya2VyOiBXb3JrZXJ8dW5kZWZpbmVkO1xubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgYWJvcnRlZCA9IGZhbHNlO1xuXG4vLyByZXNvbHZlOyByZWplY3RcbnR5cGUgUHJvbWlzZUNhbGxiYWNrczxUID0gdm9pZD4gPSBbKHJlc3VsdDogVCkgPT4gdm9pZCwgKHJlYXNvbjogdW5rbm93bikgPT4gdm9pZF07XG5cbmxldCBpbml0V2FzbUNhbGxiYWNrczogUHJvbWlzZUNhbGxiYWNrcztcbmxldCBpbml0T3J0Q2FsbGJhY2tzOiBQcm9taXNlQ2FsbGJhY2tzO1xuY29uc3QgY3JlYXRlU2Vzc2lvbkFsbG9jYXRlQ2FsbGJhY2tzOiBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPFNlcmlhbGl6YWJsZU1vZGVsZGF0YT4+ID0gW107XG5jb25zdCBjcmVhdGVTZXNzaW9uRmluYWxpemVDYWxsYmFja3M6IEFycmF5PFByb21pc2VDYWxsYmFja3M8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPj4gPSBbXTtcbmNvbnN0IGNyZWF0ZVNlc3Npb25DYWxsYmFja3M6IEFycmF5PFByb21pc2VDYWxsYmFja3M8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPj4gPSBbXTtcbmNvbnN0IHJlbGVhc2VTZXNzaW9uQ2FsbGJhY2tzOiBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPHZvaWQ+PiA9IFtdO1xuY29uc3QgcnVuQ2FsbGJhY2tzOiBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10+PiA9IFtdO1xuY29uc3QgZW5kUHJvZmlsaW5nQ2FsbGJhY2tzOiBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPHZvaWQ+PiA9IFtdO1xuY29uc3QgaXNPcnRFbnZJbml0aWFsaXplZENhbGxiYWNrczogQXJyYXk8UHJvbWlzZUNhbGxiYWNrczxib29sZWFuPj4gPSBbXTtcblxuY29uc3QgZW5zdXJlV29ya2VyID0gKCk6IHZvaWQgPT4ge1xuICBpZiAoaW5pdGlhbGl6aW5nIHx8ICFpbml0aWFsaXplZCB8fCBhYm9ydGVkIHx8ICFwcm94eVdvcmtlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignd29ya2VyIG5vdCByZWFkeScpO1xuICB9XG59O1xuXG5jb25zdCBvblByb3h5V29ya2VyTWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50PE9ydFdhc21NZXNzYWdlPik6IHZvaWQgPT4ge1xuICBzd2l0Y2ggKGV2LmRhdGEudHlwZSkge1xuICAgIGNhc2UgJ2luaXQtd2FzbSc6XG4gICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgaW5pdFdhc21DYWxsYmFja3NbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICBpbml0V2FzbUNhbGxiYWNrc1swXSgpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5pdC1vcnQnOlxuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGluaXRPcnRDYWxsYmFja3NbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5pdE9ydENhbGxiYWNrc1swXSgpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY3JlYXRlX2FsbG9jYXRlJzpcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBjcmVhdGVTZXNzaW9uQWxsb2NhdGVDYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3JlYXRlU2Vzc2lvbkFsbG9jYXRlQ2FsbGJhY2tzLnNoaWZ0KCkhWzBdKGV2LmRhdGEub3V0ISk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjcmVhdGVfZmluYWxpemUnOlxuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGNyZWF0ZVNlc3Npb25GaW5hbGl6ZUNhbGxiYWNrcy5zaGlmdCgpIVsxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcmVhdGVTZXNzaW9uRmluYWxpemVDYWxsYmFja3Muc2hpZnQoKSFbMF0oZXYuZGF0YS5vdXQhKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgY3JlYXRlU2Vzc2lvbkNhbGxiYWNrcy5zaGlmdCgpIVsxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcmVhdGVTZXNzaW9uQ2FsbGJhY2tzLnNoaWZ0KCkhWzBdKGV2LmRhdGEub3V0ISk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZWxlYXNlJzpcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICByZWxlYXNlU2Vzc2lvbkNhbGxiYWNrcy5zaGlmdCgpIVsxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWxlYXNlU2Vzc2lvbkNhbGxiYWNrcy5zaGlmdCgpIVswXSgpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncnVuJzpcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBydW5DYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcnVuQ2FsbGJhY2tzLnNoaWZ0KCkhWzBdKGV2LmRhdGEub3V0ISk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlbmQtcHJvZmlsaW5nJzpcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBlbmRQcm9maWxpbmdDYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kUHJvZmlsaW5nQ2FsbGJhY2tzLnNoaWZ0KCkhWzBdKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpcy1vcnQtZW52LWluaXRpYWxpemVkJzpcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBpc09ydEVudkluaXRpYWxpemVkQ2FsbGJhY2tzLnNoaWZ0KCkhWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzT3J0RW52SW5pdGlhbGl6ZWRDYWxsYmFja3Muc2hpZnQoKSFbMF0oZXYuZGF0YS5vdXQhKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gIH1cbn07XG5cbmNvbnN0IHNjcmlwdFNyYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAoZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmMgOiB1bmRlZmluZWQ7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplV2ViQXNzZW1ibHlJbnN0YW5jZSA9IGFzeW5jKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGlmIChpbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaW5pdGlhbGl6aW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpcGxlIGNhbGxzIHRvIFxcJ2luaXRXYXNtKClcXCcgZGV0ZWN0ZWQuJyk7XG4gICAgfVxuICAgIGlmIChhYm9ydGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzIGNhbGwgdG8gXFwnaW5pdFdhc20oKVxcJyBmYWlsZWQuJyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuICAgIC8vIG92ZXJ3cml0ZSB3YXNtIGZpbGVwYXRoc1xuICAgIGlmIChlbnYud2FzbS53YXNtUGF0aHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHNjcmlwdFNyYyAmJiBzY3JpcHRTcmMuaW5kZXhPZignYmxvYjonKSAhPT0gMCkge1xuICAgICAgICBlbnYud2FzbS53YXNtUGF0aHMgPSBzY3JpcHRTcmMuc3Vic3RyKDAsICsoc2NyaXB0U3JjKS5sYXN0SW5kZXhPZignLycpICsgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHByb3h5V29ya2VyPy50ZXJtaW5hdGUoKTtcblxuICAgICAgY29uc3Qgd29ya2VyVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihcbiAgICAgICAgICBbXG4gICAgICAgICAgICAvLyBUaGlzIHJlcXVpcmUoKSBmdW5jdGlvbiBpcyBoYW5kbGVkIGJ5IGVzYnVpbGQgcGx1Z2luIHRvIGxvYWQgZmlsZSBjb250ZW50IGFzIHN0cmluZy5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzXG4gICAgICAgICAgICByZXF1aXJlKCcuL3Byb3h5LXdvcmtlci9tYWluJylcbiAgICAgICAgICBdLFxuICAgICAgICAgIHt0eXBlOiAndGV4dC9qYXZhc2NyaXB0J30pKTtcbiAgICAgIHByb3h5V29ya2VyID0gbmV3IFdvcmtlcih3b3JrZXJVcmwsIHtuYW1lOiAnb3J0LXdhc20tcHJveHktd29ya2VyJ30pO1xuICAgICAgcHJveHlXb3JrZXIub25lcnJvciA9IChldjogRXJyb3JFdmVudCkgPT4gcmVqZWN0KGV2KTtcbiAgICAgIHByb3h5V29ya2VyLm9ubWVzc2FnZSA9IG9uUHJveHlXb3JrZXJNZXNzYWdlO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh3b3JrZXJVcmwpO1xuICAgICAgaW5pdFdhc21DYWxsYmFja3MgPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdpbml0LXdhc20nLCBpbiA6IGVudi53YXNtfTtcbiAgICAgIHByb3h5V29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGluaXRpYWxpemVXZWJBc3NlbWJseShlbnYud2FzbSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplUnVudGltZSA9IGFzeW5jKGVudjogRW52KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGluaXRPcnRDYWxsYmFja3MgPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdpbml0LW9ydCcsIGluIDogZW52fTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhd2FpdCBjb3JlLmluaXRSdW50aW1lKGVudik7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uQWxsb2NhdGUgPSBhc3luYyhtb2RlbDogVWludDhBcnJheSk6IFByb21pc2U8U2VyaWFsaXphYmxlTW9kZWxkYXRhPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZU1vZGVsZGF0YT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY3JlYXRlU2Vzc2lvbkFsbG9jYXRlQ2FsbGJhY2tzLnB1c2goW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2NyZWF0ZV9hbGxvY2F0ZScsIGluIDoge21vZGVsfX07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgW21vZGVsLmJ1ZmZlcl0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLmNyZWF0ZVNlc3Npb25BbGxvY2F0ZShtb2RlbCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uRmluYWxpemUgPSBhc3luYyhtb2RlbGRhdGE6IFNlcmlhbGl6YWJsZU1vZGVsZGF0YSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgIFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPiA9PiB7XG4gICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgICAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNyZWF0ZVNlc3Npb25GaW5hbGl6ZUNhbGxiYWNrcy5wdXNoKFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnY3JlYXRlX2ZpbmFsaXplJywgaW4gOiB7bW9kZWxkYXRhLCBvcHRpb25zfX07XG4gICAgICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb3JlLmNyZWF0ZVNlc3Npb25GaW5hbGl6ZShtb2RlbGRhdGEsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID1cbiAgICBhc3luYyhtb2RlbDogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIC8vIGNoZWNrIHVuc3VwcG9ydGVkIG9wdGlvbnNcbiAgICBpZiAob3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2Vzc2lvbiBvcHRpb24gXCJwcmVmZXJyZWRPdXRwdXRMb2NhdGlvblwiIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjcmVhdGVTZXNzaW9uQ2FsbGJhY2tzLnB1c2goW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2NyZWF0ZScsIGluIDoge21vZGVsLCBvcHRpb25zfX07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgW21vZGVsLmJ1ZmZlcl0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLmNyZWF0ZVNlc3Npb24obW9kZWwsIG9wdGlvbnMpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVsZWFzZVNlc3Npb24gPSBhc3luYyhzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZWxlYXNlU2Vzc2lvbkNhbGxiYWNrcy5wdXNoKFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdyZWxlYXNlJywgaW4gOiBzZXNzaW9uSWR9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvcmUucmVsZWFzZVNlc3Npb24oc2Vzc2lvbklkKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJ1biA9IGFzeW5jKFxuICAgIHNlc3Npb25JZDogbnVtYmVyLCBpbnB1dEluZGljZXM6IG51bWJlcltdLCBpbnB1dHM6IFRlbnNvck1ldGFkYXRhW10sIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxuICAgIG91dHB1dHM6IEFycmF5PFRlbnNvck1ldGFkYXRhfG51bGw+LCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPFRlbnNvck1ldGFkYXRhW10+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICAvLyBjaGVjayBpbnB1dHMgbG9jYXRpb25cbiAgICBpZiAoaW5wdXRzLnNvbWUodCA9PiB0WzNdICE9PSAnY3B1JykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW5wdXQgdGVuc29yIG9uIEdQVSBpcyBub3Qgc3VwcG9ydGVkIGZvciBwcm94eS4nKTtcbiAgICB9XG4gICAgLy8gY2hlY2sgb3V0cHV0cyBsb2NhdGlvblxuICAgIGlmIChvdXRwdXRzLnNvbWUodCA9PiB0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmUtYWxsb2NhdGVkIG91dHB1dCB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XG4gICAgfVxuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBydW5DYWxsYmFja3MucHVzaChbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBzZXJpYWxpemFibGVJbnB1dHMgPSBpbnB1dHMgYXMgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXTsgIC8vIGV2ZXJ5IGlucHV0IGlzIG9uIENQVS5cbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID1cbiAgICAgICAgICB7dHlwZTogJ3J1bicsIGluIDoge3Nlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHM6IHNlcmlhbGl6YWJsZUlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9uc319O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIGNvcmUuZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMoc2VyaWFsaXphYmxlSW5wdXRzKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvcmUucnVuKHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG91dHB1dHMsIG9wdGlvbnMpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gYXN5bmMoc2Vzc2lvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5kUHJvZmlsaW5nQ2FsbGJhY2tzLnB1c2goW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2VuZC1wcm9maWxpbmcnLCBpbiA6IHNlc3Npb25JZH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29yZS5lbmRQcm9maWxpbmcoc2Vzc2lvbklkKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlzT3J0RW52SW5pdGlhbGl6ZWQgPSBhc3luYygpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaXNPcnRFbnZJbml0aWFsaXplZENhbGxiYWNrcy5wdXNoKFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdpcy1vcnQtZW52LWluaXRpYWxpemVkJ307XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvcmUuaXNPcnRFbnZJbml0aWFsaXplZCgpO1xuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCByZWFkRmlsZSA9IHVuZGVmaW5lZDsiLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7cmVhZEZpbGV9IGZyb20gJ25vZGU6ZnMvcHJvbWlzZXMnO1xuaW1wb3J0IHtlbnYsIEluZmVyZW5jZVNlc3Npb24sIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyLCBTZXNzaW9uSGFuZGxlciwgVGVuc29yfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge1NlcmlhbGl6YWJsZU1vZGVsZGF0YSwgVGVuc29yTWV0YWRhdGF9IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0IHtjcmVhdGVTZXNzaW9uLCBjcmVhdGVTZXNzaW9uQWxsb2NhdGUsIGNyZWF0ZVNlc3Npb25GaW5hbGl6ZSwgZW5kUHJvZmlsaW5nLCBpbml0aWFsaXplUnVudGltZSwgaXNPcnRFbnZJbml0aWFsaXplZCwgcmVsZWFzZVNlc3Npb24sIHJ1bn0gZnJvbSAnLi9wcm94eS13cmFwcGVyJztcbmltcG9ydCB7aXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlfSBmcm9tICcuL3dhc20tY29tbW9uJztcblxubGV0IHJ1bnRpbWVJbml0aWFsaXphdGlvblByb21pc2U6IFByb21pc2U8dm9pZD58dW5kZWZpbmVkO1xuXG5leHBvcnQgY29uc3QgZW5jb2RlVGVuc29yTWV0YWRhdGEgPSAodGVuc29yOiBUZW5zb3IsIGdldE5hbWU6ICgpID0+IHN0cmluZyk6IFRlbnNvck1ldGFkYXRhID0+IHtcbiAgc3dpdGNoICh0ZW5zb3IubG9jYXRpb24pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHRlbnNvci5kYXRhLCAnY3B1J107XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XG4gICAgICByZXR1cm4gW3RlbnNvci50eXBlLCB0ZW5zb3IuZGltcywge2dwdUJ1ZmZlcjogdGVuc29yLmdwdUJ1ZmZlcn0sICdncHUtYnVmZmVyJ107XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvci5sb2NhdGlvbn0gZm9yICR7Z2V0TmFtZSgpfWApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZGVjb2RlVGVuc29yTWV0YWRhdGEgPSAodGVuc29yOiBUZW5zb3JNZXRhZGF0YSk6IFRlbnNvciA9PiB7XG4gIHN3aXRjaCAodGVuc29yWzNdKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHRlbnNvclswXSwgdGVuc29yWzJdLCB0ZW5zb3JbMV0pO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XG4gICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcbiAgICAgIGlmICghaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlKGRhdGFUeXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZGF0YSB0eXBlOiAke2RhdGFUeXBlfSBmb3IgZGVzZXJpYWxpemluZyBHUFUgdGVuc29yYCk7XG4gICAgICB9XG4gICAgICBjb25zdCB7Z3B1QnVmZmVyLCBkb3dubG9hZCwgZGlzcG9zZX0gPSB0ZW5zb3JbMl07XG4gICAgICByZXR1cm4gVGVuc29yLmZyb21HcHVCdWZmZXIoZ3B1QnVmZmVyLCB7ZGF0YVR5cGUsIGRpbXM6IHRlbnNvclsxXSwgZG93bmxvYWQsIGRpc3Bvc2V9KTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvclszXX1gKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlTZXNzaW9uSGFuZGxlciBpbXBsZW1lbnRzIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIHtcbiAgcHJpdmF0ZSBzZXNzaW9uSWQ6IG51bWJlcjtcblxuICBpbnB1dE5hbWVzOiBzdHJpbmdbXTtcbiAgb3V0cHV0TmFtZXM6IHN0cmluZ1tdO1xuXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb25BbGxvY2F0ZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPFNlcmlhbGl6YWJsZU1vZGVsZGF0YT4ge1xuICAgIC8vIGZldGNoIG1vZGVsIGZyb20gdXJsIGFuZCBtb3ZlIHRvIHdhc20gaGVhcC4gVGhlIGFycmF5YnVmZmZlciB0aGF0IGhlbGQgdGhlIGh0dHBcbiAgICAvLyByZXNwb25zZSBpcyBmcmVlZCBvbmNlIHdlIHJldHVyblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocGF0aCk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGZhaWxlZCB0byBsb2FkIG1vZGVsOiAke3BhdGh9YCk7XG4gICAgfVxuICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcbiAgICByZXR1cm4gY3JlYXRlU2Vzc2lvbkFsbG9jYXRlKG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIH1cblxuICBhc3luYyBsb2FkTW9kZWwocGF0aE9yQnVmZmVyOiBzdHJpbmd8VWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIShhd2FpdCBpc09ydEVudkluaXRpYWxpemVkKCkpKSB7XG4gICAgICBpZiAoIXJ1bnRpbWVJbml0aWFsaXphdGlvblByb21pc2UpIHtcbiAgICAgICAgcnVudGltZUluaXRpYWxpemF0aW9uUHJvbWlzZSA9IGluaXRpYWxpemVSdW50aW1lKGVudik7XG4gICAgICB9XG4gICAgICBhd2FpdCBydW50aW1lSW5pdGlhbGl6YXRpb25Qcm9taXNlO1xuICAgICAgcnVudGltZUluaXRpYWxpemF0aW9uUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHBhdGhPckJ1ZmZlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLm5vZGUpIHtcbiAgICAgICAgLy8gbm9kZVxuICAgICAgICBjb25zdCBtb2RlbCA9IGF3YWl0IHJlYWRGaWxlKHBhdGhPckJ1ZmZlcik7XG4gICAgICAgIFt0aGlzLnNlc3Npb25JZCwgdGhpcy5pbnB1dE5hbWVzLCB0aGlzLm91dHB1dE5hbWVzXSA9IGF3YWl0IGNyZWF0ZVNlc3Npb24obW9kZWwsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYnJvd3NlclxuICAgICAgICAvLyBmZXRjaCBtb2RlbCBhbmQgbW92ZSB0byB3YXNtIGhlYXAuXG4gICAgICAgIGNvbnN0IG1vZGVsRGF0YTogU2VyaWFsaXphYmxlTW9kZWxkYXRhID0gYXdhaXQgdGhpcy5jcmVhdGVTZXNzaW9uQWxsb2NhdGUocGF0aE9yQnVmZmVyKTtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzZXNzaW9uXG4gICAgICAgIFt0aGlzLnNlc3Npb25JZCwgdGhpcy5pbnB1dE5hbWVzLCB0aGlzLm91dHB1dE5hbWVzXSA9IGF3YWl0IGNyZWF0ZVNlc3Npb25GaW5hbGl6ZShtb2RlbERhdGEsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBbdGhpcy5zZXNzaW9uSWQsIHRoaXMuaW5wdXROYW1lcywgdGhpcy5vdXRwdXROYW1lc10gPSBhd2FpdCBjcmVhdGVTZXNzaW9uKHBhdGhPckJ1ZmZlciwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gcmVsZWFzZVNlc3Npb24odGhpcy5zZXNzaW9uSWQpO1xuICB9XG5cbiAgYXN5bmMgcnVuKGZlZWRzOiBTZXNzaW9uSGFuZGxlci5GZWVkc1R5cGUsIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlPiB7XG4gICAgY29uc3QgaW5wdXRBcnJheTogVGVuc29yW10gPSBbXTtcbiAgICBjb25zdCBpbnB1dEluZGljZXM6IG51bWJlcltdID0gW107XG4gICAgT2JqZWN0LmVudHJpZXMoZmVlZHMpLmZvckVhY2goa3ZwID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBrdnBbMF07XG4gICAgICBjb25zdCB0ZW5zb3IgPSBrdnBbMV07XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5wdXROYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgaW5wdXQgJyR7bmFtZX0nYCk7XG4gICAgICB9XG4gICAgICBpbnB1dEFycmF5LnB1c2godGVuc29yKTtcbiAgICAgIGlucHV0SW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG91dHB1dEFycmF5OiBBcnJheTxUZW5zb3J8bnVsbD4gPSBbXTtcbiAgICBjb25zdCBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIE9iamVjdC5lbnRyaWVzKGZldGNoZXMpLmZvckVhY2goa3ZwID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBrdnBbMF07XG4gICAgICBjb25zdCB0ZW5zb3IgPSBrdnBbMV07XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMub3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIG91dHB1dCAnJHtuYW1lfSdgKTtcbiAgICAgIH1cbiAgICAgIG91dHB1dEFycmF5LnB1c2godGVuc29yKTtcbiAgICAgIG91dHB1dEluZGljZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBpbnB1dHMgPVxuICAgICAgICBpbnB1dEFycmF5Lm1hcCgodCwgaSkgPT4gZW5jb2RlVGVuc29yTWV0YWRhdGEodCwgKCkgPT4gYGlucHV0IFwiJHt0aGlzLmlucHV0TmFtZXNbaW5wdXRJbmRpY2VzW2ldXX1cImApKTtcbiAgICBjb25zdCBvdXRwdXRzID0gb3V0cHV0QXJyYXkubWFwKFxuICAgICAgICAodCwgaSkgPT4gdCA/IGVuY29kZVRlbnNvck1ldGFkYXRhKHQsICgpID0+IGBvdXRwdXQgXCIke3RoaXMub3V0cHV0TmFtZXNbb3V0cHV0SW5kaWNlc1tpXV19XCJgKSA6IG51bGwpO1xuXG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHJ1bih0aGlzLnNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG91dHB1dHMsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgcmVzdWx0TWFwOiBTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRNYXBbdGhpcy5vdXRwdXROYW1lc1tvdXRwdXRJbmRpY2VzW2ldXV0gPSBvdXRwdXRBcnJheVtpXSA/PyBkZWNvZGVUZW5zb3JNZXRhZGF0YShyZXN1bHRzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdE1hcDtcbiAgfVxuXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCBwcm9maWxpbmdcbiAgfVxuXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB2b2lkIGVuZFByb2ZpbGluZyh0aGlzLnNlc3Npb25JZCk7XG4gIH1cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtjcHVzfSBmcm9tICdub2RlOm9zJztcbmltcG9ydCB7QmFja2VuZCwgZW52LCBJbmZlcmVuY2VTZXNzaW9uLCBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtpbml0aWFsaXplV2ViQXNzZW1ibHlJbnN0YW5jZX0gZnJvbSAnLi93YXNtL3Byb3h5LXdyYXBwZXInO1xuaW1wb3J0IHtPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXJ9IGZyb20gJy4vd2FzbS9zZXNzaW9uLWhhbmRsZXItaW5mZXJlbmNlJztcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIGFsbCBmbGFncyBmb3IgV2ViQXNzZW1ibHkuXG4gKlxuICogVGhvc2UgZmxhZ3MgYXJlIGFjY2Vzc2libGUgZnJvbSBgb3J0LmVudi53YXNtYC4gVXNlcnMgYXJlIGFsbG93IHRvIHNldCB0aG9zZSBmbGFncyBiZWZvcmUgdGhlIGZpcnN0IGluZmVyZW5jZSBzZXNzaW9uXG4gKiBiZWluZyBjcmVhdGVkLCB0byBvdmVycmlkZSBkZWZhdWx0IHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUZsYWdzID0gKCk6IHZvaWQgPT4ge1xuICBpZiAodHlwZW9mIGVudi53YXNtLmluaXRUaW1lb3V0ICE9PSAnbnVtYmVyJyB8fCBlbnYud2FzbS5pbml0VGltZW91dCA8IDApIHtcbiAgICBlbnYud2FzbS5pbml0VGltZW91dCA9IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIGVudi53YXNtLnNpbWQgIT09ICdib29sZWFuJykge1xuICAgIGVudi53YXNtLnNpbWQgPSB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5wcm94eSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZW52Lndhc20ucHJveHkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW52Lndhc20ubnVtVGhyZWFkcyAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIoZW52Lndhc20ubnVtVGhyZWFkcykgfHwgZW52Lndhc20ubnVtVGhyZWFkcyA8PSAwKSB7XG4gICAgY29uc3QgbnVtQ3B1TG9naWNhbENvcmVzID0gdHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgPyBjcHVzKCkubGVuZ3RoIDogbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3k7XG4gICAgZW52Lndhc20ubnVtVGhyZWFkcyA9IE1hdGgubWluKDQsIE1hdGguY2VpbCgobnVtQ3B1TG9naWNhbENvcmVzIHx8IDEpIC8gMikpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgT25ueHJ1bnRpbWVXZWJBc3NlbWJseUJhY2tlbmQgaW1wbGVtZW50cyBCYWNrZW5kIHtcbiAgYXN5bmMgaW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBwb3B1bGF0ZSB3YXNtIGZsYWdzXG4gICAgaW5pdGlhbGl6ZUZsYWdzKCk7XG5cbiAgICAvLyBpbml0IHdhc21cbiAgICBhd2FpdCBpbml0aWFsaXplV2ViQXNzZW1ibHlJbnN0YW5jZSgpO1xuICB9XG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKHBhdGg6IHN0cmluZywgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG4gIGFzeW5jIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKHBhdGhPckJ1ZmZlcjogc3RyaW5nfFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+IHtcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IE9ubnhydW50aW1lV2ViQXNzZW1ibHlTZXNzaW9uSGFuZGxlcigpO1xuICAgIGF3YWl0IGhhbmRsZXIubG9hZE1vZGVsKHBhdGhPckJ1ZmZlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShoYW5kbGVyKTtcbiAgfVxufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge09ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmQtd2FzbSc7XG5leHBvcnQgY29uc3Qgd2FzbUJhY2tlbmQgPSBuZXcgT25ueHJ1bnRpbWVXZWJBc3NlbWJseUJhY2tlbmQoKTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlcywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cyAqL1xuLy8gV2UgdXNlIFwicmVxdWlyZVwiIGluc3RlYWQgb2YgXCJpbXBvcnRcIiBoZXJlIGJlY2F1c2UgaW1wb3J0IHN0YXRlbWVudCBtdXN0IGJlIHB1dCBpbiB0b3AgbGV2ZWwuIE91ciBjdXJyZW50IGNvZGUgZG9lc1xuLy8gbm90IGFsbG93IGJ1bmRsZXIgdG8gdHJlZS1zaGFraW5nIGNvZGUgYXMgZXhwZWN0ZWQgYmVjYXVzZSBzb21lIGNvZGVzIGFyZSB0cmVhdGVkIGFzIGhhdmluZyBzaWRlIGVmZmVjdHMuXG4vLyBTbyB3ZSBpbXBvcnQgY29kZSBpbnNpZGUgdGhlIGlmLWNsYXVzZSB0byBhbGxvdyBidW5kbGVyIHJlbW92ZSB0aGUgY29kZSBzYWZlbHkuXG5cbmV4cG9ydCAqIGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5pbXBvcnQgKiBhcyBvcnQgZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0IG9ydDtcblxuaW1wb3J0IHtyZWdpc3RlckJhY2tlbmQsIGVudn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAnLi92ZXJzaW9uJztcblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR0wpIHtcbiAgY29uc3Qgb25ueGpzQmFja2VuZCA9IHJlcXVpcmUoJy4vYmFja2VuZC1vbm54anMnKS5vbm54anNCYWNrZW5kO1xuICByZWdpc3RlckJhY2tlbmQoJ3dlYmdsJywgb25ueGpzQmFja2VuZCwgLTEwKTtcbn1cblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTSkge1xuICBjb25zdCB3YXNtQmFja2VuZCA9IEJVSUxEX0RFRlMuRElTQUJMRV9UUkFJTklORyA/IHJlcXVpcmUoJy4vYmFja2VuZC13YXNtLWluZmVyZW5jZScpLndhc21CYWNrZW5kIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlKCcuL2JhY2tlbmQtd2FzbS10cmFpbmluZycpLndhc21CYWNrZW5kO1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLmdwdSkge1xuICAgIHJlZ2lzdGVyQmFja2VuZCgnd2ViZ3B1Jywgd2FzbUJhY2tlbmQsIDUpO1xuICB9XG4gIHJlZ2lzdGVyQmFja2VuZCgnY3B1Jywgd2FzbUJhY2tlbmQsIDEwKTtcbiAgcmVnaXN0ZXJCYWNrZW5kKCd3YXNtJywgd2FzbUJhY2tlbmQsIDEwKTtcbiAgaWYgKEJVSUxEX0RFRlMuRElTQUJMRV9UUkFJTklORykge1xuICAgIHJlZ2lzdGVyQmFja2VuZCgneG5ucGFjaycsIHdhc21CYWNrZW5kLCA5KTtcbiAgICByZWdpc3RlckJhY2tlbmQoJ3dlYm5uJywgd2FzbUJhY2tlbmQsIDkpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnYudmVyc2lvbnMsICd3ZWInLCB7dmFsdWU6IHZlcnNpb24sIGVudW1lcmFibGU6IHRydWV9KTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSAvanMvc2NyaXB0cy91cGRhdGUtdmVyc2lvbi50c1xuLy8gRG8gbm90IG1vZGlmeSBmaWxlIGNvbnRlbnQgbWFudWFsbHkuXG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzEuMTcuMCc7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BY00sVUFDQSwwQkFZTyxpQkEwQ0E7QUFyRWI7OztBQWNBLE1BQU0sV0FBcUMsb0JBQUksSUFBRztBQUNsRCxNQUFNLDJCQUFxQyxDQUFBO0FBWXBDLE1BQU0sa0JBQWtCLENBQUMsTUFBYyxTQUFrQixhQUEwQjtBQUN4RixZQUFJLFdBQVcsT0FBTyxRQUFRLFNBQVMsY0FBYyxPQUFPLFFBQVEsa0NBQWtDLFlBQVk7QUFDaEgsZ0JBQU0saUJBQWlCLFNBQVMsSUFBSSxJQUFJO0FBQ3hDLGNBQUksbUJBQW1CLFFBQVc7QUFDaEMscUJBQVMsSUFBSSxNQUFNLEVBQUMsU0FBUyxTQUFRLENBQUM7cUJBQzdCLGVBQWUsV0FBVyxVQUFVO0FBRTdDO3FCQUNTLGVBQWUsYUFBYSxVQUFVO0FBQy9DLGdCQUFJLGVBQWUsWUFBWSxTQUFTO0FBQ3RDLG9CQUFNLElBQUksTUFBTSw0QkFBNEIsSUFBSSxvQkFBb0IsUUFBUSxFQUFFOzs7QUFJbEYsY0FBSSxZQUFZLEdBQUc7QUFDakIsa0JBQU0sSUFBSSx5QkFBeUIsUUFBUSxJQUFJO0FBQy9DLGdCQUFJLE1BQU0sSUFBSTtBQUNaLHVDQUF5QixPQUFPLEdBQUcsQ0FBQzs7QUFHdEMscUJBQVNBLEtBQUksR0FBR0EsS0FBSSx5QkFBeUIsUUFBUUEsTUFBSztBQUN4RCxrQkFBSSxTQUFTLElBQUkseUJBQXlCQSxFQUFDLENBQUMsRUFBRyxZQUFZLFVBQVU7QUFDbkUseUNBQXlCLE9BQU9BLElBQUcsR0FBRyxJQUFJO0FBQzFDOzs7QUFHSixxQ0FBeUIsS0FBSyxJQUFJOztBQUVwQzs7QUFHRixjQUFNLElBQUksVUFBVSxxQkFBcUI7TUFDM0M7QUFVTyxNQUFNLGlCQUFpQixPQUFNLGlCQUFxRDtBQUN2RixjQUFNLGVBQWUsYUFBYSxXQUFXLElBQUksMkJBQTJCO0FBQzVFLGNBQU0sU0FBUyxDQUFBO0FBQ2YsbUJBQVcsZUFBZSxjQUFjO0FBQ3RDLGdCQUFNLGNBQWMsU0FBUyxJQUFJLFdBQVc7QUFDNUMsY0FBSSxhQUFhO0FBQ2YsZ0JBQUksWUFBWSxhQUFhO0FBQzNCLHFCQUFPLFlBQVk7dUJBQ1YsWUFBWSxTQUFTO0FBQzlCOztBQUdGLGtCQUFNLGlCQUFpQixDQUFDLENBQUMsWUFBWTtBQUNyQyxnQkFBSTtBQUNGLGtCQUFJLENBQUMsZ0JBQWdCO0FBQ25CLDRCQUFZLGNBQWMsWUFBWSxRQUFRLEtBQUk7O0FBRXBELG9CQUFNLFlBQVk7QUFDbEIsMEJBQVksY0FBYztBQUMxQixxQkFBTyxZQUFZO3FCQUNaLEdBQUc7QUFDVixrQkFBSSxDQUFDLGdCQUFnQjtBQUNuQix1QkFBTyxLQUFLLEVBQUMsTUFBTSxhQUFhLEtBQUssRUFBQyxDQUFDOztBQUV6QywwQkFBWSxVQUFVOztBQUV0QixxQkFBTyxZQUFZOzs7O0FBS3pCLGNBQU0sSUFBSSxNQUFNLG9DQUFvQyxPQUFPLElBQUksT0FBSyxJQUFJLEVBQUUsSUFBSSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRTtNQUMxRzs7Ozs7QUNyR0E7OztBQTJFQTs7Ozs7QUMzRUEsTUFNYTtBQU5iOzs7QUFNTyxNQUFNLFVBQVU7Ozs7O0FDTnZCLE1BUUksZUFFUztBQVZiOzs7QUFJQTtBQUlBLE1BQUksZ0JBQXdDO0FBRXJDLE1BQU0sTUFBVztRQUN0QixNQUFNLENBQUE7UUFDTixPQUFPLENBQUE7UUFDUCxRQUFRLENBQUE7UUFDUixVQUFVLEVBQUMsUUFBUSxRQUFPO1FBRTFCLElBQUksU0FBUyxPQUFtQjtBQUM5QixjQUFJLFVBQVUsUUFBVztBQUN2Qjs7QUFFRixjQUFJLE9BQU8sVUFBVSxZQUFZLENBQUMsV0FBVyxRQUFRLFdBQVcsU0FBUyxPQUFPLEVBQUUsUUFBUSxLQUFLLE1BQU0sSUFBSTtBQUN2RyxrQkFBTSxJQUFJLE1BQU0sOEJBQThCLEtBQUssRUFBRTs7QUFFdkQsMEJBQWdCO1FBQ2xCO1FBQ0EsSUFBSSxXQUFRO0FBQ1YsaUJBQU87UUFDVDs7QUFJRixhQUFPLGVBQWUsS0FBSyxZQUFZLEVBQUMsWUFBWSxLQUFJLENBQUM7Ozs7O0FDL0J6RCxNQW1LYUM7QUFuS2I7OztBQUdBO0FBZ0tPLE1BQU1BLE9BQVc7Ozs7O0FDbkt4QixNQVNhLGlCQTBGQTtBQW5HYjs7O0FBU08sTUFBTSxrQkFBa0IsQ0FBQyxRQUFnQixZQUE0QztBQUMxRixjQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsZUFBTyxRQUFRLE9BQU8sS0FBSyxDQUFDO0FBQzVCLGVBQU8sU0FBUyxPQUFPLEtBQUssQ0FBQztBQUM3QixjQUFNLGtCQUFrQixPQUFPLFdBQVcsSUFBSTtBQUU5QyxZQUFJLG1CQUFtQixNQUFNO0FBRTNCLGNBQUk7QUFDSixjQUFJO0FBQ0osY0FBSSxTQUFTLGlCQUFpQixVQUFhLFFBQVEsaUJBQWlCLFFBQVE7QUFDMUUsb0JBQVEsT0FBTyxLQUFLLENBQUM7QUFDckIscUJBQVMsT0FBTyxLQUFLLENBQUM7aUJBQ2pCO0FBQ0wsb0JBQVEsT0FBTyxLQUFLLENBQUM7QUFDckIscUJBQVMsT0FBTyxLQUFLLENBQUM7O0FBR3hCLGdCQUFNLGNBQWMsU0FBUyxXQUFXLFNBQVksUUFBUSxTQUFTO0FBRXJFLGdCQUFNLE9BQU8sU0FBUztBQUN0QixjQUFJO0FBQ0osY0FBSTtBQUNKLGNBQUksU0FBUyxVQUFhLEtBQUssU0FBUyxRQUFXO0FBQ2pELHVCQUFXLENBQUMsS0FBSyxLQUFLLEtBQUssR0FBRztpQkFDekI7QUFDTCxnQkFBSSxPQUFRLEtBQUssU0FBVSxVQUFVO0FBQ25DLHlCQUFXLENBQUMsS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSyxJQUFJO21CQUNqRDtBQUNMLHlCQUFXLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUN2RCxrQkFBSSxLQUFLLEtBQUssQ0FBQyxNQUFNLFFBQVc7QUFDOUIseUJBQVMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDOzs7O0FBSS9CLGNBQUksU0FBUyxVQUFhLEtBQUssU0FBUyxRQUFXO0FBQ2pELHVCQUFXLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztpQkFDakI7QUFDTCxnQkFBSSxPQUFRLEtBQUssU0FBVSxVQUFVO0FBQ25DLHlCQUFXLENBQUMsS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSyxJQUFJO21CQUNqRDtBQUNMLHlCQUFXLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUN2RCxrQkFBSSxLQUFLLEtBQUssQ0FBQyxNQUFNLFFBQVc7QUFDOUIseUJBQVMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDOzs7O0FBSy9CLGdCQUFNLFNBQVMsU0FBUztBQUV4QixjQUFJLGlCQUFpQixHQUFHLGlCQUFpQixRQUFRLGlCQUFpQixTQUFTLEdBQUcsaUJBQWlCO0FBRy9GLGNBQUksZ0JBQWdCLFFBQVE7QUFDMUIsNkJBQWlCO0FBQ2pCLDZCQUFpQjtBQUNqQiw2QkFBaUIsU0FBUztBQUMxQiw2QkFBaUIsU0FBUztxQkFDakIsZ0JBQWdCLE9BQU87QUFDaEMsNkJBQWlCO0FBQ2pCLDZCQUFpQjtBQUNqQiw2QkFBaUIsU0FBUztxQkFDakIsZ0JBQWdCLE9BQU87QUFDaEMsNkJBQWlCO0FBQ2pCLDZCQUFpQjtBQUNqQiw2QkFBaUIsU0FBUzs7QUFHNUIsbUJBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxLQUFLO0FBQy9CLHFCQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSztBQUM5QixvQkFBTSxLQUFNLE9BQU8sS0FBSyxnQkFBZ0IsSUFBZSxTQUFTLENBQUMsS0FBSyxTQUFTLENBQUM7QUFDaEYsb0JBQU0sS0FBTSxPQUFPLEtBQUssZ0JBQWdCLElBQWUsU0FBUyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQ2hGLG9CQUFNLEtBQU0sT0FBTyxLQUFLLGdCQUFnQixJQUFlLFNBQVMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztBQUNoRixvQkFBTSxJQUFJLG1CQUFtQixLQUN6QixPQUNFLE9BQU8sS0FBSyxnQkFBZ0IsSUFBZSxTQUFTLENBQUMsS0FBSyxTQUFTLENBQUM7QUFFMUUsOEJBQWdCLFlBQVksVUFBVSxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJO0FBQ3hFLDhCQUFnQixTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUM7OztBQUd2QyxpQkFBTyxPQUFPLFVBQVM7ZUFDbEI7QUFDTCxnQkFBTSxJQUFJLE1BQU0sMkJBQTJCOztNQUUvQztBQUtPLE1BQU0sb0JBQW9CLENBQUMsUUFBZ0IsWUFBaUQ7QUFDakcsY0FBTSxrQkFBa0IsU0FBUyxjQUFjLFFBQVEsRUFBRSxXQUFXLElBQUk7QUFDeEUsWUFBSTtBQUNKLFlBQUksbUJBQW1CLE1BQU07QUFFM0IsY0FBSTtBQUNKLGNBQUk7QUFDSixjQUFJO0FBQ0osY0FBSSxTQUFTLGlCQUFpQixVQUFhLFFBQVEsaUJBQWlCLFFBQVE7QUFDMUUsb0JBQVEsT0FBTyxLQUFLLENBQUM7QUFDckIscUJBQVMsT0FBTyxLQUFLLENBQUM7QUFDdEIsdUJBQVcsT0FBTyxLQUFLLENBQUM7aUJBQ25CO0FBQ0wsb0JBQVEsT0FBTyxLQUFLLENBQUM7QUFDckIscUJBQVMsT0FBTyxLQUFLLENBQUM7QUFDdEIsdUJBQVcsT0FBTyxLQUFLLENBQUM7O0FBRTFCLGdCQUFNLGNBQWMsWUFBWSxTQUFhLFFBQVEsV0FBVyxTQUFZLFFBQVEsU0FBUyxRQUFTO0FBRXRHLGdCQUFNLE9BQU8sU0FBUztBQUN0QixjQUFJO0FBQ0osY0FBSTtBQUNKLGNBQUksU0FBUyxVQUFhLEtBQUssU0FBUyxRQUFXO0FBQ2pELHVCQUFXLENBQUMsS0FBSyxLQUFLLEtBQUssR0FBRztpQkFDekI7QUFDTCxnQkFBSSxPQUFRLEtBQUssU0FBVSxVQUFVO0FBQ25DLHlCQUFXLENBQUMsS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSyxJQUFJO21CQUNqRDtBQUNMLHlCQUFXLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsR0FBRztBQUN6RCxrQkFBSSxLQUFLLEtBQUssQ0FBQyxNQUFNLFFBQVc7QUFDOUIseUJBQVMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDOzs7O0FBSS9CLGNBQUksU0FBUyxVQUFhLEtBQUssU0FBUyxRQUFXO0FBQ2pELHVCQUFXLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztpQkFDakI7QUFDTCxnQkFBSSxPQUFRLEtBQUssU0FBVSxVQUFVO0FBQ25DLHlCQUFXLENBQUMsS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSyxJQUFJO21CQUNqRDtBQUNMLHlCQUFXLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUN2RCxrQkFBSSxLQUFLLEtBQUssQ0FBQyxNQUFNLFFBQVc7QUFDOUIseUJBQVMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDOzs7O0FBSy9CLGdCQUFNLFNBQVMsU0FBUztBQUN4QixjQUFJLFlBQVksUUFBVztBQUN6QixnQkFBSSxRQUFRLFdBQVcsV0FBYyxhQUFhLEtBQUssUUFBUSxXQUFXLFdBQ3JFLGFBQWEsTUFBTSxRQUFRLFdBQVcsU0FBUyxRQUFRLFdBQVcsUUFBUztBQUM5RSxvQkFBTSxJQUFJLE1BQU0sK0NBQWdEOzs7QUFLcEUsZ0JBQU0sT0FBTztBQUNiLGNBQUksZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsZ0JBQWdCO0FBQzdFLGNBQUksaUJBQWlCLEdBQUcsaUJBQWlCLFFBQVEsaUJBQWlCLFNBQVMsR0FBRyxpQkFBaUI7QUFHL0YsY0FBSSxnQkFBZ0IsUUFBUTtBQUMxQiw2QkFBaUI7QUFDakIsNkJBQWlCO0FBQ2pCLDZCQUFpQixTQUFTO0FBQzFCLDZCQUFpQixTQUFTO3FCQUNqQixnQkFBZ0IsT0FBTztBQUNoQyw2QkFBaUI7QUFDakIsNkJBQWlCO0FBQ2pCLDZCQUFpQixTQUFTO3FCQUNqQixnQkFBZ0IsT0FBTztBQUNoQyw2QkFBaUI7QUFDakIsNkJBQWlCO0FBQ2pCLDZCQUFpQixTQUFTOztBQUc1QixrQkFBUSxnQkFBZ0IsZ0JBQWdCLE9BQU8sTUFBTTtBQUVyRCxtQkFBUyxJQUFJLEdBQUcsSUFBSSxTQUFTLE9BQ3hCLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLEtBQUs7QUFDcEcsa0JBQU0sS0FBSyxhQUFhLEtBQU0sT0FBTyxLQUFLLGdCQUFnQixJQUFlLFNBQVMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztBQUNsRyxrQkFBTSxLQUFLLGFBQWEsS0FBTSxPQUFPLEtBQUssZ0JBQWdCLElBQWUsU0FBUyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQ2xHLGtCQUFNLEtBQUssYUFBYSxLQUFNLE9BQU8sS0FBSyxnQkFBZ0IsSUFBZSxTQUFTLENBQUMsS0FBSyxTQUFTLENBQUM7QUFDbEcsa0JBQU0sS0FBSyxhQUFhLElBQUksbUJBQW1CLEtBQzNDLE9BQ0UsT0FBTyxLQUFLLGdCQUFnQixJQUFlLFNBQVMsQ0FBQyxLQUFLLFNBQVMsQ0FBQzs7ZUFHdkU7QUFDTCxnQkFBTSxJQUFJLE1BQU0sMkJBQTJCOztBQUU3QyxlQUFPO01BQ1Q7Ozs7O0FDL0xBLE1BaUJhLGdCQWtGQSxpQkE4SUEsbUJBV0EscUJBU0E7QUFyUWI7OztBQUlBO0FBYU8sTUFBTSxpQkFBaUIsQ0FBQyxRQUFxQyxZQUEwQztBQUM1RyxZQUFJLFdBQVcsUUFBVztBQUN4QixnQkFBTSxJQUFJLE1BQU0sOEJBQThCOztBQUVoRCxZQUFJLFFBQVEsV0FBVyxVQUFhLFFBQVEsVUFBVSxRQUFXO0FBQy9ELGdCQUFNLElBQUksTUFBTSx3Q0FBd0M7O0FBRTFELFlBQUksUUFBUSxpQkFBaUIsUUFBUTtBQUNuQyxnQkFBTSxJQUFJLE1BQU0seUNBQXlDOztBQUczRCxjQUFNLEVBQUMsUUFBUSxNQUFLLElBQUk7QUFFeEIsY0FBTSxPQUFPLFFBQVEsUUFBUSxFQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUM7QUFDaEQsWUFBSTtBQUNKLFlBQUk7QUFFSixZQUFJLE9BQVEsS0FBSyxTQUFVLFVBQVU7QUFDbkMscUJBQVcsQ0FBQyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLElBQUk7ZUFDakQ7QUFDTCxxQkFBVyxDQUFDLEtBQUssS0FBTSxDQUFDLEdBQUcsS0FBSyxLQUFNLENBQUMsR0FBRyxLQUFLLEtBQU0sQ0FBQyxHQUFHLEtBQUssS0FBTSxDQUFDLEtBQUssR0FBRzs7QUFHL0UsWUFBSSxPQUFRLEtBQUssU0FBVSxVQUFVO0FBQ25DLHFCQUFXLENBQUMsS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSyxJQUFJO2VBQ2pEO0FBQ0wscUJBQVcsQ0FBQyxLQUFLLEtBQU0sQ0FBQyxHQUFHLEtBQUssS0FBTSxDQUFDLEdBQUcsS0FBSyxLQUFNLENBQUMsR0FBRyxLQUFLLEtBQU0sQ0FBQyxLQUFLLENBQUM7O0FBRzdFLGNBQU0sY0FBYyxRQUFRLFdBQVcsU0FBWSxRQUFRLFNBQVM7QUFHcEUsY0FBTSxlQUNGLFFBQVEsaUJBQWlCLFNBQWEsUUFBUSxpQkFBaUIsU0FBWSxRQUFRLGVBQWUsUUFBUztBQUMvRyxjQUFNLFNBQVMsU0FBUztBQUN4QixjQUFNLGNBQWMsaUJBQWlCLFNBQVMsSUFBSSxhQUFhLFNBQVMsQ0FBQyxJQUFJLElBQUksYUFBYSxTQUFTLENBQUM7QUFHeEcsWUFBSSxPQUFPLEdBQUcsZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsZ0JBQWdCO0FBQ3ZGLFlBQUksaUJBQWlCLEdBQUcsaUJBQWlCLFFBQVEsaUJBQWlCLFNBQVMsR0FBRyxpQkFBaUI7QUFHL0YsWUFBSSxnQkFBZ0IsT0FBTztBQUN6QixpQkFBTztBQUNQLDBCQUFnQjtBQUNoQiwwQkFBZ0I7QUFDaEIsMEJBQWdCO0FBQ2hCLDBCQUFnQjs7QUFJbEIsWUFBSSxpQkFBaUIsUUFBUTtBQUMzQiwyQkFBaUIsU0FBUzttQkFDakIsaUJBQWlCLE9BQU87QUFDakMsMkJBQWlCO0FBQ2pCLDJCQUFpQjtBQUNqQiwyQkFBaUIsU0FBUzttQkFDakIsaUJBQWlCLE9BQU87QUFDakMsMkJBQWlCO0FBQ2pCLDJCQUFpQjtBQUNqQiwyQkFBaUIsU0FBUzs7QUFHNUIsaUJBQVMsSUFBSSxHQUFHLElBQUksUUFDZixLQUFLLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNO0FBQ3BHLHNCQUFZLGdCQUFnQixLQUFLLE9BQU8sYUFBYSxJQUFJLFNBQVMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztBQUNsRixzQkFBWSxnQkFBZ0IsS0FBSyxPQUFPLGFBQWEsSUFBSSxTQUFTLENBQUMsS0FBSyxTQUFTLENBQUM7QUFDbEYsc0JBQVksZ0JBQWdCLEtBQUssT0FBTyxhQUFhLElBQUksU0FBUyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQ2xGLGNBQUksbUJBQW1CLE1BQU0sa0JBQWtCLElBQUk7QUFDakQsd0JBQVksZ0JBQWdCLEtBQUssT0FBTyxhQUFhLElBQUksU0FBUyxDQUFDLEtBQUssU0FBUyxDQUFDOzs7QUFLdEYsY0FBTSxlQUFlLGlCQUFpQixTQUFTLElBQUksT0FBTyxXQUFXLGFBQWEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxLQUFLLENBQUMsSUFDeEQsSUFBSSxPQUFPLFdBQVcsYUFBYSxDQUFDLEdBQUcsR0FBRyxRQUFRLEtBQUssQ0FBQztBQUN2RyxlQUFPO01BQ1Q7QUFLTyxNQUFNLGtCQUFrQixPQUMzQixPQUNBLFlBQ3lDO0FBRTNDLGNBQU0saUJBQWlCLE9BQVEscUJBQXNCLGVBQWUsaUJBQWlCO0FBQ3JGLGNBQU0saUJBQWlCLE9BQVEsY0FBZSxlQUFlLGlCQUFpQjtBQUM5RSxjQUFNLGdCQUFnQixPQUFRLGdCQUFpQixlQUFlLGlCQUFpQjtBQUMvRSxjQUFNLFdBQVcsT0FBTyxVQUFVO0FBRWxDLFlBQUk7QUFDSixZQUFJLHdCQUErQyxXQUFXLENBQUE7QUFHOUQsWUFBSSxnQkFBZ0I7QUFFbEIsZ0JBQU0sU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUM5QyxpQkFBTyxRQUFRLE1BQU07QUFDckIsaUJBQU8sU0FBUyxNQUFNO0FBQ3RCLGdCQUFNLGtCQUFrQixPQUFPLFdBQVcsSUFBSTtBQUU5QyxjQUFJLG1CQUFtQixNQUFNO0FBQzNCLGdCQUFJLFNBQVMsTUFBTTtBQUNuQixnQkFBSSxRQUFRLE1BQU07QUFDbEIsZ0JBQUksWUFBWSxVQUFhLFFBQVEsa0JBQWtCLFVBQWEsUUFBUSxpQkFBaUIsUUFBVztBQUN0Ryx1QkFBUyxRQUFRO0FBQ2pCLHNCQUFRLFFBQVE7O0FBR2xCLGdCQUFJLFlBQVksUUFBVztBQUN6QixzQ0FBd0I7QUFDeEIsa0JBQUksUUFBUSxpQkFBaUIsUUFBVztBQUN0QyxzQkFBTSxJQUFJLE1BQU0sNkRBQTZEO3FCQUN4RTtBQUNMLHNDQUFzQixlQUFlOztBQUV2QyxvQ0FBc0IsU0FBUztBQUMvQixvQ0FBc0IsUUFBUTttQkFDekI7QUFDTCxvQ0FBc0IsZUFBZTtBQUNyQyxvQ0FBc0IsU0FBUztBQUMvQixvQ0FBc0IsUUFBUTs7QUFHaEMsNEJBQWdCLFVBQVUsT0FBTyxHQUFHLENBQUM7QUFDckMsbUJBQU8sZ0JBQWdCLGFBQWEsR0FBRyxHQUFHLE9BQU8sTUFBTSxFQUFFO2lCQUNwRDtBQUNMLGtCQUFNLElBQUksTUFBTSwyQkFBMkI7O21CQUVwQyxnQkFBZ0I7QUFDekIsY0FBSTtBQUNKLGNBQUk7QUFFSixjQUFJLFlBQVksVUFBYSxRQUFRLGlCQUFpQixVQUFhLFFBQVEsa0JBQWtCLFFBQVc7QUFDdEcscUJBQVMsUUFBUTtBQUNqQixvQkFBUSxRQUFRO2lCQUNYO0FBQ0wscUJBQVMsTUFBTTtBQUNmLG9CQUFRLE1BQU07O0FBR2hCLGNBQUksWUFBWSxRQUFXO0FBQ3pCLG9DQUF3Qjs7QUFFMUIsZ0NBQXNCLFNBQVM7QUFDL0IsZ0NBQXNCLFNBQVM7QUFDL0IsZ0NBQXNCLFFBQVE7QUFFOUIsY0FBSSxZQUFZLFFBQVc7QUFDekIsa0JBQU0sYUFBYSxTQUFTLGNBQWMsUUFBUTtBQUVsRCx1QkFBVyxRQUFRO0FBQ25CLHVCQUFXLFNBQVM7QUFFcEIsa0JBQU0sa0JBQWtCLFdBQVcsV0FBVyxJQUFJO0FBRWxELGdCQUFJLG1CQUFtQixNQUFNO0FBQzNCLDhCQUFnQixhQUFhLE9BQU8sR0FBRyxDQUFDO0FBQ3hDLHFCQUFPLGdCQUFnQixhQUFhLEdBQUcsR0FBRyxPQUFPLE1BQU0sRUFBRTttQkFDcEQ7QUFDTCxvQkFBTSxJQUFJLE1BQU0sMkJBQTJCOztpQkFFeEM7QUFDTCxtQkFBTyxNQUFNOzttQkFFTixlQUFlO0FBRXhCLGNBQUksWUFBWSxRQUFXO0FBQ3pCLGtCQUFNLElBQUksTUFBTSx5REFBeUQ7O0FBRzNFLGdCQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsaUJBQU8sUUFBUSxNQUFNO0FBQ3JCLGlCQUFPLFNBQVMsTUFBTTtBQUN0QixnQkFBTSxrQkFBa0IsT0FBTyxXQUFXLElBQUk7QUFFOUMsY0FBSSxtQkFBbUIsTUFBTTtBQUMzQixrQkFBTSxTQUFTLE1BQU07QUFDckIsa0JBQU0sUUFBUSxNQUFNO0FBQ3BCLDRCQUFnQixVQUFVLE9BQU8sR0FBRyxHQUFHLE9BQU8sTUFBTTtBQUNwRCxtQkFBTyxnQkFBZ0IsYUFBYSxHQUFHLEdBQUcsT0FBTyxNQUFNLEVBQUU7QUFDekQsa0NBQXNCLFNBQVM7QUFDL0Isa0NBQXNCLFFBQVE7QUFDOUIsbUJBQU8sZUFBZSxNQUFNLHFCQUFxQjtpQkFDNUM7QUFDTCxrQkFBTSxJQUFJLE1BQU0sMkJBQTJCOzttQkFFcEMsVUFBVTtBQUNuQixpQkFBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVU7QUFDckMsa0JBQU0sU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUM5QyxrQkFBTSxVQUFVLE9BQU8sV0FBVyxJQUFJO0FBQ3RDLGdCQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7QUFDdEIscUJBQU8sT0FBTTs7QUFFZixrQkFBTSxXQUFXLElBQUksTUFBSztBQUMxQixxQkFBUyxjQUFjO0FBQ3ZCLHFCQUFTLE1BQU07QUFDZixxQkFBUyxTQUFTLE1BQUs7QUFDckIscUJBQU8sUUFBUSxTQUFTO0FBQ3hCLHFCQUFPLFNBQVMsU0FBUztBQUN6QixzQkFBUSxVQUFVLFVBQVUsR0FBRyxHQUFHLE9BQU8sT0FBTyxPQUFPLE1BQU07QUFDN0Qsb0JBQU0sTUFBTSxRQUFRLGFBQWEsR0FBRyxHQUFHLE9BQU8sT0FBTyxPQUFPLE1BQU07QUFFbEUsb0NBQXNCLFNBQVMsT0FBTztBQUN0QyxvQ0FBc0IsUUFBUSxPQUFPO0FBQ3JDLHNCQUFRLGVBQWUsSUFBSSxNQUFNLHFCQUFxQixDQUFDO1lBQ3pEO1VBQ0YsQ0FBQztlQUNJO0FBQ0wsZ0JBQU0sSUFBSSxNQUFNLGdFQUFnRTs7QUFHbEYsWUFBSSxTQUFTLFFBQVc7QUFDdEIsaUJBQU8sZUFBZSxNQUFNLHFCQUFxQjtlQUM1QztBQUNMLGdCQUFNLElBQUksTUFBTSxnRUFBZ0U7O01BRXBGO0FBS08sTUFBTSxvQkFBb0IsQ0FDN0IsU0FBc0MsWUFBZ0Q7QUFDeEYsY0FBTSxFQUFDLE9BQU8sUUFBUSxVQUFVLFFBQU8sSUFBSTtBQUUzQyxjQUFNLE9BQU8sQ0FBQyxHQUFHLFFBQVEsT0FBTyxDQUFDO0FBQ2pDLGVBQU8sSUFBSSxPQUFPLEVBQUMsVUFBVSxXQUFXLE1BQU0sV0FBVyxTQUFTLE1BQU0sVUFBVSxRQUFPLENBQUM7TUFDNUY7QUFLTyxNQUFNLHNCQUFzQixDQUMvQixXQUEwQyxZQUFrRDtBQUM5RixjQUFNLEVBQUMsVUFBVSxNQUFNLFVBQVUsUUFBTyxJQUFJO0FBQzVDLGVBQU8sSUFBSSxPQUFPLEVBQUMsVUFBVSxjQUFjLE1BQU0sWUFBWSxXQUFXLFdBQVcsTUFBTSxVQUFVLFFBQU8sQ0FBQztNQUM3RztBQUtPLE1BQU0seUJBQXlCLENBQ2xDLE1BQVMsUUFBd0MsU0FDakQsSUFBSSxPQUFPLEVBQUMsVUFBVSxjQUFjLE1BQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxDQUFDLE9BQU8sTUFBTSxFQUFDLENBQUM7Ozs7O0FDdlExRixNQVdhLHVDQWNBLHVDQWNULGlCQUNTO0FBeENiOzs7QUFXTyxNQUFNLHdDQUF3QyxvQkFBSSxJQUE2QztRQUNwRyxDQUFDLFdBQVcsWUFBWTtRQUN4QixDQUFDLFNBQVMsVUFBVTtRQUNwQixDQUFDLFFBQVEsU0FBUztRQUNsQixDQUFDLFVBQVUsV0FBVztRQUN0QixDQUFDLFdBQVcsV0FBVztRQUN2QixDQUFDLFNBQVMsVUFBVTtRQUNwQixDQUFDLFNBQVMsVUFBVTtRQUNwQixDQUFDLFFBQVEsVUFBVTtRQUNuQixDQUFDLFdBQVcsWUFBWTtRQUN4QixDQUFDLFVBQVUsV0FBVztPQUN2QjtBQUdNLE1BQU0sd0NBQXdDLG9CQUFJLElBQWtEO1FBQ3pHLENBQUMsY0FBYyxTQUFTO1FBQ3hCLENBQUMsWUFBWSxPQUFPO1FBQ3BCLENBQUMsV0FBVyxNQUFNO1FBQ2xCLENBQUMsYUFBYSxRQUFRO1FBQ3RCLENBQUMsWUFBWSxPQUFPO1FBQ3BCLENBQUMsWUFBWSxPQUFPO1FBQ3BCLENBQUMsY0FBYyxTQUFTO1FBQ3hCLENBQUMsYUFBYSxRQUFRO09BQ3ZCO0FBS0QsTUFBSSxrQkFBa0I7QUFDZixNQUFNLGNBQWMsTUFBSztBQUM5QixZQUFJLENBQUMsaUJBQWlCO0FBQ3BCLDRCQUFrQjtBQUNsQixnQkFBTSwyQkFBMkIsT0FBTyxrQkFBa0IsZUFBZSxPQUFPLGNBQWMsU0FBUztBQUN2RyxnQkFBTSw0QkFDRixPQUFPLG1CQUFtQixlQUFlLE9BQU8sZUFBZSxTQUFTO0FBRTVFLGNBQUksMEJBQTBCO0FBQzVCLGtEQUFzQyxJQUFJLFNBQVMsYUFBYTtBQUNoRSxrREFBc0MsSUFBSSxlQUFlLE9BQU87O0FBRWxFLGNBQUksMkJBQTJCO0FBQzdCLGtEQUFzQyxJQUFJLFVBQVUsY0FBYztBQUNsRSxrREFBc0MsSUFBSSxnQkFBZ0IsUUFBUTs7O01BR3hFOzs7OztBQ3hEQSxNQVdhLGVBa0JBO0FBN0JiOzs7QUFJQTtBQU9PLE1BQU0sZ0JBQWdCLENBQUMsU0FBb0M7QUFDaEUsWUFBSSxPQUFPO0FBQ1gsaUJBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEtBQUs7QUFDcEMsZ0JBQU0sTUFBTSxLQUFLLENBQUM7QUFDbEIsY0FBSSxPQUFPLFFBQVEsWUFBWSxDQUFDLE9BQU8sY0FBYyxHQUFHLEdBQUc7QUFDekQsa0JBQU0sSUFBSSxVQUFVLFFBQVEsQ0FBQyw4QkFBOEIsR0FBRyxFQUFFOztBQUVsRSxjQUFJLE1BQU0sR0FBRztBQUNYLGtCQUFNLElBQUksV0FBVyxRQUFRLENBQUMsMENBQTBDLEdBQUcsRUFBRTs7QUFFL0Usa0JBQVE7O0FBRVYsZUFBTztNQUNUO0FBS08sTUFBTSxnQkFBZ0IsQ0FBQyxRQUFnQixTQUFtQztBQUMvRSxnQkFBUSxPQUFPLFVBQVU7VUFDdkIsS0FBSztBQUNILG1CQUFPLElBQUksT0FBTyxPQUFPLE1BQU0sT0FBTyxNQUFNLElBQUk7VUFDbEQsS0FBSztBQUNILG1CQUFPLElBQUksT0FBTztjQUNoQixVQUFVO2NBQ1YsTUFBTSxPQUFPO2NBQ2IsTUFBTSxPQUFPO2NBQ2I7YUFDRDtVQUNILEtBQUs7QUFDSCxtQkFBTyxJQUFJLE9BQU87Y0FDaEIsVUFBVTtjQUNWLFNBQVMsT0FBTztjQUNoQixNQUFNLE9BQU87Y0FDYjthQUNEO1VBQ0gsS0FBSztBQUNILG1CQUFPLElBQUksT0FBTztjQUNoQixVQUFVO2NBQ1YsV0FBVyxPQUFPO2NBQ2xCLE1BQU0sT0FBTztjQUNiO2FBQ0Q7VUFDSDtBQUNFLGtCQUFNLElBQUksTUFBTSxrQ0FBa0MsT0FBTyxRQUFRLG1CQUFtQjs7TUFFMUY7Ozs7O0FDekRBLE1Bd0JhO0FBeEJiOzs7QUFHQTtBQUVBO0FBRUE7QUFDQTtBQWdCTSxNQUFPLFNBQVAsTUFBYTs7OztRQXlDakIsWUFDSSxNQUVBLE1BQThFLE1BQXdCO0FBRXhHLHNCQUFXO0FBRVgsY0FBSTtBQUNKLGNBQUk7QUFFSixjQUFJLE9BQU8sU0FBUyxZQUFZLGNBQWMsTUFBTTtBQUlsRCxpQkFBSyxlQUFlLEtBQUs7QUFDekIsbUJBQU8sS0FBSztBQUNaLG1CQUFPLEtBQUs7QUFDWixvQkFBUSxLQUFLLFVBQVU7Y0FDckIsS0FBSyxjQUFjO0FBQ2pCLHNCQUFNLGdDQUFnQyxzQ0FBc0MsSUFBSSxJQUFJO0FBQ3BGLG9CQUFJLENBQUMsK0JBQStCO0FBQ2xDLHdCQUFNLElBQUksVUFBVSxxQkFBcUIsSUFBSSx1Q0FBdUM7O0FBRXRGLG9CQUFJLEVBQUUsS0FBSyxnQkFBZ0IsZ0NBQWdDO0FBQ3pELHdCQUFNLElBQUksVUFBVSw0QkFBNEIsOEJBQThCLElBQUksRUFBRTs7QUFFdEYscUJBQUssVUFBVSxLQUFLO0FBQ3BCOztjQUVGLEtBQUssV0FBVztBQUNkLG9CQUFJLFNBQVMsV0FBVztBQUN0Qix3QkFBTSxJQUFJLFVBQVUscUJBQXFCLElBQUksaUNBQWlDOztBQUVoRixxQkFBSyxpQkFBaUIsS0FBSztBQUMzQixxQkFBSyxhQUFhLEtBQUs7QUFDdkIscUJBQUssV0FBVyxLQUFLO0FBQ3JCOztjQUVGLEtBQUssY0FBYztBQUNqQixvQkFBSyxTQUFTLGFBQWEsU0FBUyxhQUFhLFNBQVMsV0FBVyxTQUFTLFdBQVcsU0FBUyxZQUM3RixTQUFTLFFBQVM7QUFDckIsd0JBQU0sSUFBSSxVQUFVLHFCQUFxQixJQUFJLG9DQUFvQzs7QUFFbkYscUJBQUssZ0JBQWdCLEtBQUs7QUFDMUIscUJBQUssYUFBYSxLQUFLO0FBQ3ZCLHFCQUFLLFdBQVcsS0FBSztBQUNyQjs7Y0FFRjtBQUNFLHNCQUFNLElBQUksTUFBTSw2Q0FBNkMsS0FBSyxZQUFZLEdBQUc7O2lCQUVoRjtBQUlMLGdCQUFJO0FBQ0osZ0JBQUk7QUFFSixnQkFBSSxPQUFPLFNBQVMsVUFBVTtBQUk1QixxQkFBTztBQUNQLDBCQUFZO0FBQ1osa0JBQUksU0FBUyxVQUFVO0FBRXJCLG9CQUFJLENBQUMsTUFBTSxRQUFRLElBQUksR0FBRztBQUN4Qix3QkFBTSxJQUFJLFVBQVUsZ0RBQWlEOztBQUl2RSx1QkFBTztxQkFDRjtBQUVMLHNCQUFNLHdCQUF3QixzQ0FBc0MsSUFBSSxJQUFJO0FBQzVFLG9CQUFJLDBCQUEwQixRQUFXO0FBQ3ZDLHdCQUFNLElBQUksVUFBVSw0QkFBNEIsSUFBSSxHQUFHOztBQUV6RCxvQkFBSSxNQUFNLFFBQVEsSUFBSSxHQUFHO0FBQ3ZCLHNCQUFJLFNBQVMsV0FBVztBQUl0QiwwQkFBTSxJQUFJLFVBQ04sK0ZBQStGOzZCQUMxRixTQUFTLFlBQVksU0FBUyxTQUFTO0FBWWhELDJCQUFRLHNCQUE4QixLQUFLLE1BQU0sTUFBTTt5QkFDbEQ7QUFHTCwyQkFBUSxzQkFBOEIsS0FBSyxJQUFJOzsyQkFFeEMsZ0JBQWdCLHVCQUF1QjtBQUNoRCx5QkFBTzt1QkFDRjtBQUNMLHdCQUFNLElBQUksVUFBVSxLQUFLLElBQUksa0NBQWtDLHFCQUFxQixFQUFFOzs7bUJBR3JGO0FBSUwsMEJBQVk7QUFDWixrQkFBSSxNQUFNLFFBQVEsSUFBSSxHQUFHO0FBRXZCLG9CQUFJLEtBQUssV0FBVyxHQUFHO0FBQ3JCLHdCQUFNLElBQUksVUFBVSxxREFBcUQ7O0FBRTNFLHNCQUFNLG1CQUFtQixPQUFPLEtBQUssQ0FBQztBQUN0QyxvQkFBSSxxQkFBcUIsVUFBVTtBQUNqQyx5QkFBTztBQUNQLHlCQUFPOzJCQUNFLHFCQUFxQixXQUFXO0FBQ3pDLHlCQUFPO0FBSVAseUJBQU8sV0FBVyxLQUFLLElBQWE7dUJBQy9CO0FBQ0wsd0JBQU0sSUFBSSxVQUFVLHVDQUF1QyxnQkFBZ0IsR0FBRzs7cUJBRTNFO0FBRUwsc0JBQU0sYUFDRixzQ0FBc0MsSUFBSSxLQUFLLFdBQThDO0FBQ2pHLG9CQUFJLGVBQWUsUUFBVztBQUM1Qix3QkFBTSxJQUFJLFVBQVUscUNBQXFDLEtBQUssV0FBVyxHQUFHOztBQUU5RSx1QkFBTztBQUNQLHVCQUFPOzs7QUFLWCxnQkFBSSxjQUFjLFFBQVc7QUFFM0IsMEJBQVksQ0FBQyxLQUFLLE1BQU07dUJBQ2YsQ0FBQyxNQUFNLFFBQVEsU0FBUyxHQUFHO0FBQ3BDLG9CQUFNLElBQUksVUFBVSx3Q0FBeUM7O0FBRS9ELG1CQUFPO0FBRVAsaUJBQUssVUFBVTtBQUNmLGlCQUFLLGVBQWU7O0FBSXRCLGdCQUFNLE9BQU8sY0FBYyxJQUFJO0FBRS9CLGNBQUksS0FBSyxXQUFXLFNBQVMsS0FBSyxRQUFRLFFBQVE7QUFDaEQsa0JBQU0sSUFBSSxNQUFNLGlCQUFpQixJQUFJLGdDQUFnQyxLQUFLLFFBQVEsTUFBTSxJQUFJOztBQUc5RixlQUFLLE9BQU87QUFDWixlQUFLLE9BQU87QUFDWixlQUFLLE9BQU87UUFDZDs7O1FBSUEsYUFBYSxVQUNULE9BQ0EsU0FDb0I7QUFDdEIsaUJBQU8sZ0JBQWdCLE9BQU8sT0FBTztRQUN2QztRQUVBLE9BQU8sWUFDSCxTQUE0QixTQUFvQztBQUNsRSxpQkFBTyxrQkFBa0IsU0FBUyxPQUFPO1FBQzNDO1FBRUEsT0FBTyxjQUNILFdBQWdDLFNBQXNDO0FBQ3hFLGlCQUFPLG9CQUFvQixXQUFXLE9BQU87UUFDL0M7UUFFQSxPQUFPLGlCQUNILE1BQVMsUUFBd0MsTUFBd0I7QUFDM0UsaUJBQU8sdUJBQXVCLE1BQU0sUUFBUSxJQUFJO1FBQ2xEOzs7UUFLQSxVQUFVLFNBQWdDO0FBQ3hDLGlCQUFPLGdCQUFnQixNQUFNLE9BQU87UUFDdEM7UUFFQSxZQUFZLFNBQWtDO0FBQzVDLGlCQUFPLGtCQUFrQixNQUFNLE9BQU87UUFDeEM7OztRQWdEQSxJQUFJLE9BQUk7QUFDTixlQUFLLFlBQVc7QUFDaEIsY0FBSSxDQUFDLEtBQUssU0FBUztBQUNqQixrQkFBTSxJQUFJLE1BQ04sZ0pBQzJFOztBQUVqRixpQkFBTyxLQUFLO1FBQ2Q7UUFFQSxJQUFJLFdBQVE7QUFDVixpQkFBTyxLQUFLO1FBQ2Q7UUFFQSxJQUFJLFVBQU87QUFDVCxlQUFLLFlBQVc7QUFDaEIsY0FBSSxDQUFDLEtBQUssZ0JBQWdCO0FBQ3hCLGtCQUFNLElBQUksTUFBTSw0Q0FBNEM7O0FBRTlELGlCQUFPLEtBQUs7UUFDZDtRQUVBLElBQUksWUFBUztBQUNYLGVBQUssWUFBVztBQUNoQixjQUFJLENBQUMsS0FBSyxlQUFlO0FBQ3ZCLGtCQUFNLElBQUksTUFBTSw0Q0FBNEM7O0FBRTlELGlCQUFPLEtBQUs7UUFDZDs7O1FBS0EsTUFBTSxRQUFRLGFBQXFCO0FBQ2pDLGVBQUssWUFBVztBQUNoQixrQkFBUSxLQUFLLGNBQWM7WUFDekIsS0FBSztZQUNMLEtBQUs7QUFDSCxxQkFBTyxLQUFLO1lBQ2QsS0FBSztZQUNMLEtBQUssY0FBYztBQUNqQixrQkFBSSxDQUFDLEtBQUssWUFBWTtBQUNwQixzQkFBTSxJQUFJLE1BQU0scUVBQXFFOztBQUV2RixrQkFBSSxLQUFLLGVBQWU7QUFDdEIsc0JBQU0sSUFBSSxNQUFNLHlDQUF5Qzs7QUFFM0Qsa0JBQUk7QUFDRixxQkFBSyxnQkFBZ0I7QUFDckIsc0JBQU0sT0FBTyxNQUFNLEtBQUssV0FBVTtBQUNsQyxxQkFBSyxhQUFhO0FBQ2xCLHFCQUFLLGVBQWU7QUFDcEIscUJBQUssVUFBVTtBQUVmLG9CQUFJLGVBQWUsS0FBSyxVQUFVO0FBQ2hDLHVCQUFLLFNBQVE7QUFDYix1QkFBSyxXQUFXOztBQUdsQix1QkFBTzs7QUFHUCxxQkFBSyxnQkFBZ0I7OztZQUd6QjtBQUNFLG9CQUFNLElBQUksTUFBTSxrQ0FBa0MsS0FBSyxZQUFZLEVBQUU7O1FBRTNFO1FBRUEsVUFBTztBQUNMLGNBQUksS0FBSyxlQUFlO0FBQ3RCLGtCQUFNLElBQUksTUFBTSx5Q0FBeUM7O0FBRzNELGNBQUksS0FBSyxVQUFVO0FBQ2pCLGlCQUFLLFNBQVE7QUFDYixpQkFBSyxXQUFXOztBQUVsQixlQUFLLFVBQVU7QUFDZixlQUFLLGlCQUFpQjtBQUN0QixlQUFLLGdCQUFnQjtBQUNyQixlQUFLLGFBQWE7QUFDbEIsZUFBSyxnQkFBZ0I7QUFFckIsZUFBSyxlQUFlO1FBQ3RCOzs7UUFLUSxjQUFXO0FBQ2pCLGNBQUksS0FBSyxpQkFBaUIsUUFBUTtBQUNoQyxrQkFBTSxJQUFJLE1BQU0seUJBQXlCOztRQUU3QztRQUVBLFFBQVEsTUFBdUI7QUFDN0IsZUFBSyxZQUFXO0FBQ2hCLGNBQUksS0FBSyxjQUFjLEtBQUssVUFBVTtBQUNwQyxrQkFBTSxJQUFJLE1BQU0saURBQWlEOztBQUVuRSxpQkFBTyxjQUFjLE1BQU0sSUFBSTtRQUNqQzs7Ozs7O0FDbGFGLE1Bd1VhQztBQXhVYjs7O0FBSUE7QUFvVU8sTUFBTUEsVUFBUzs7Ozs7QUN4VXRCLE1BZWE7QUFmYjs7O0FBR0E7QUFJQTtBQVFNLE1BQU8sbUJBQVAsTUFBTyxrQkFBZ0I7UUFDM0IsWUFBb0IsU0FBZ0M7QUFDbEQsZUFBSyxVQUFVO1FBQ2pCO1FBR0EsTUFBTSxJQUFJLE9BQWtCLE1BQStCLE1BQWlCO0FBQzFFLGdCQUFNLFVBQTRDLENBQUE7QUFDbEQsY0FBSSxVQUFzQixDQUFBO0FBRTFCLGNBQUksT0FBTyxVQUFVLFlBQVksVUFBVSxRQUFRLGlCQUFpQkMsV0FBVSxNQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ2xHLGtCQUFNLElBQUksVUFDTiwrRkFBaUc7O0FBR3ZHLGNBQUksaUJBQWlCO0FBRXJCLGNBQUksT0FBTyxTQUFTLFVBQVU7QUFDNUIsZ0JBQUksU0FBUyxNQUFNO0FBQ2pCLG9CQUFNLElBQUksVUFBVSx5Q0FBeUM7O0FBRS9ELGdCQUFJLGdCQUFnQkEsU0FBUTtBQUMxQixvQkFBTSxJQUFJLFVBQVUsOEJBQWdDOztBQUd0RCxnQkFBSSxNQUFNLFFBQVEsSUFBSSxHQUFHO0FBQ3ZCLGtCQUFJLEtBQUssV0FBVyxHQUFHO0FBQ3JCLHNCQUFNLElBQUksVUFBVSxxQ0FBdUM7O0FBRTdELCtCQUFpQjtBQUVqQix5QkFBVyxRQUFRLE1BQU07QUFDdkIsb0JBQUksT0FBTyxTQUFTLFVBQVU7QUFDNUIsd0JBQU0sSUFBSSxVQUFVLGdEQUFrRDs7QUFFeEUsb0JBQUksS0FBSyxZQUFZLFFBQVEsSUFBSSxNQUFNLElBQUk7QUFDekMsd0JBQU0sSUFBSSxXQUFXLDJDQUEyQyxJQUFJLEdBQUc7O0FBRXpFLHdCQUFRLElBQUksSUFBSTs7QUFHbEIsa0JBQUksT0FBTyxTQUFTLFlBQVksU0FBUyxNQUFNO0FBQzdDLDBCQUFVO3lCQUNELE9BQU8sU0FBUyxhQUFhO0FBQ3RDLHNCQUFNLElBQUksVUFBVSw4QkFBZ0M7O21CQUVqRDtBQUdMLGtCQUFJLFlBQVk7QUFDaEIsb0JBQU0sV0FBVyxPQUFPLG9CQUFvQixJQUFJO0FBQ2hELHlCQUFXLFFBQVEsS0FBSyxhQUFhO0FBQ25DLG9CQUFJLFNBQVMsUUFBUSxJQUFJLE1BQU0sSUFBSTtBQUNqQyx3QkFBTSxJQUFLLEtBQTRELElBQUk7QUFDM0Usc0JBQUksTUFBTSxRQUFRLGFBQWFBLFNBQVE7QUFDckMsZ0NBQVk7QUFDWixxQ0FBaUI7QUFDakIsNEJBQVEsSUFBSSxJQUFJOzs7O0FBS3RCLGtCQUFJLFdBQVc7QUFDYixvQkFBSSxPQUFPLFNBQVMsWUFBWSxTQUFTLE1BQU07QUFDN0MsNEJBQVU7MkJBQ0QsT0FBTyxTQUFTLGFBQWE7QUFDdEMsd0JBQU0sSUFBSSxVQUFVLDhCQUFnQzs7cUJBRWpEO0FBQ0wsMEJBQVU7OztxQkFHTCxPQUFPLFNBQVMsYUFBYTtBQUN0QyxrQkFBTSxJQUFJLFVBQVUseURBQTZEOztBQUluRixxQkFBVyxRQUFRLEtBQUssWUFBWTtBQUNsQyxnQkFBSSxPQUFPLE1BQU0sSUFBSSxNQUFNLGFBQWE7QUFDdEMsb0JBQU0sSUFBSSxNQUFNLFVBQVUsSUFBSSwwQkFBMEI7OztBQUs1RCxjQUFJLGdCQUFnQjtBQUNsQix1QkFBVyxRQUFRLEtBQUssYUFBYTtBQUNuQyxzQkFBUSxJQUFJLElBQUk7OztBQU1wQixnQkFBTSxVQUFVLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxTQUFTLE9BQU87QUFDOUQsZ0JBQU0sY0FBMkMsQ0FBQTtBQUNqRCxxQkFBVyxPQUFPLFNBQVM7QUFDekIsZ0JBQUksT0FBTyxlQUFlLEtBQUssU0FBUyxHQUFHLEdBQUc7QUFDNUMsb0JBQU0sU0FBUyxRQUFRLEdBQUc7QUFDMUIsa0JBQUksa0JBQWtCQSxTQUFRO0FBQzVCLDRCQUFZLEdBQUcsSUFBSTtxQkFDZDtBQUNMLDRCQUFZLEdBQUcsSUFBSSxJQUFJQSxRQUFPLE9BQU8sTUFBTSxPQUFPLE1BQU0sT0FBTyxJQUFJOzs7O0FBSXpFLGlCQUFPO1FBQ1Q7UUFFQSxNQUFNLFVBQU87QUFDWCxpQkFBTyxLQUFLLFFBQVEsUUFBTztRQUM3QjtRQU9BLGFBQWEsT0FDVCxNQUF5QyxNQUE4QixNQUN2RSxNQUFxQjtBQUV2QixjQUFJO0FBQ0osY0FBSSxVQUEwQixDQUFBO0FBRTlCLGNBQUksT0FBTyxTQUFTLFVBQVU7QUFDNUIsbUNBQXVCO0FBQ3ZCLGdCQUFJLE9BQU8sU0FBUyxZQUFZLFNBQVMsTUFBTTtBQUM3Qyx3QkFBVTt1QkFDRCxPQUFPLFNBQVMsYUFBYTtBQUN0QyxvQkFBTSxJQUFJLFVBQVUsOEJBQWdDOztxQkFFN0MsZ0JBQWdCLFlBQVk7QUFDckMsbUNBQXVCO0FBQ3ZCLGdCQUFJLE9BQU8sU0FBUyxZQUFZLFNBQVMsTUFBTTtBQUM3Qyx3QkFBVTt1QkFDRCxPQUFPLFNBQVMsYUFBYTtBQUN0QyxvQkFBTSxJQUFJLFVBQVUsOEJBQWdDOztxQkFHcEQsZ0JBQWdCLGVBQ2YsT0FBTyxzQkFBc0IsZUFBZSxnQkFBZ0IsbUJBQW9CO0FBQ25GLGtCQUFNLFNBQVM7QUFDZixnQkFBSSxhQUFhO0FBQ2pCLGdCQUFJLGFBQWEsS0FBSztBQUN0QixnQkFBSSxPQUFPLFNBQVMsWUFBWSxTQUFTLE1BQU07QUFDN0Msd0JBQVU7dUJBQ0QsT0FBTyxTQUFTLFVBQVU7QUFDbkMsMkJBQWE7QUFDYixrQkFBSSxDQUFDLE9BQU8sY0FBYyxVQUFVLEdBQUc7QUFDckMsc0JBQU0sSUFBSSxXQUFXLGtDQUFvQzs7QUFFM0Qsa0JBQUksYUFBYSxLQUFLLGNBQWMsT0FBTyxZQUFZO0FBQ3JELHNCQUFNLElBQUksV0FBVyxvQ0FBb0MsT0FBTyxVQUFVLElBQUk7O0FBRWhGLDJCQUFhLEtBQUssYUFBYTtBQUMvQixrQkFBSSxPQUFPLFNBQVMsVUFBVTtBQUM1Qiw2QkFBYTtBQUNiLG9CQUFJLENBQUMsT0FBTyxjQUFjLFVBQVUsR0FBRztBQUNyQyx3QkFBTSxJQUFJLFdBQVcsa0NBQW9DOztBQUUzRCxvQkFBSSxjQUFjLEtBQUssYUFBYSxhQUFhLE9BQU8sWUFBWTtBQUNsRSx3QkFBTSxJQUFJLFdBQVcsb0NBQW9DLE9BQU8sYUFBYSxVQUFVLElBQUk7O0FBRTdGLG9CQUFJLE9BQU8sU0FBUyxZQUFZLFNBQVMsTUFBTTtBQUM3Qyw0QkFBVTsyQkFDRCxPQUFPLFNBQVMsYUFBYTtBQUN0Qyx3QkFBTSxJQUFJLFVBQVUsOEJBQWdDOzt5QkFFN0MsT0FBTyxTQUFTLGFBQWE7QUFDdEMsc0JBQU0sSUFBSSxVQUFVLGdDQUFrQzs7dUJBRS9DLE9BQU8sU0FBUyxhQUFhO0FBQ3RDLG9CQUFNLElBQUksVUFBVSw4QkFBZ0M7O0FBRXRELG1DQUF1QixJQUFJLFdBQVcsUUFBUSxZQUFZLFVBQVU7aUJBQy9EO0FBQ0wsa0JBQU0sSUFBSSxVQUFVLHFEQUF5RDs7QUFJL0UsZ0JBQU0sTUFBTSxRQUFRLHNCQUFzQixDQUFBO0FBQzFDLGdCQUFNLGVBQWUsSUFBSSxJQUFJLE9BQUssT0FBTyxNQUFNLFdBQVcsSUFBSSxFQUFFLElBQUk7QUFDcEUsZ0JBQU0sVUFBVSxNQUFNLGVBQWUsWUFBWTtBQUNqRCxnQkFBTSxVQUFVLE1BQU0sUUFBUSw4QkFBOEIsc0JBQXNCLE9BQU87QUFDekYsaUJBQU8sSUFBSSxrQkFBaUIsT0FBTztRQUNyQztRQUVBLGlCQUFjO0FBQ1osZUFBSyxRQUFRLGVBQWM7UUFDN0I7UUFDQSxlQUFZO0FBQ1YsZUFBSyxRQUFRLGFBQVk7UUFDM0I7UUFFQSxJQUFJLGFBQVU7QUFDWixpQkFBTyxLQUFLLFFBQVE7UUFDdEI7UUFDQSxJQUFJLGNBQVc7QUFDYixpQkFBTyxLQUFLLFFBQVE7UUFDdEI7Ozs7OztBQ3JORixNQXFjYUM7QUFyY2I7OztBQUdBO0FBa2NPLE1BQU1BLG9CQUE0Qzs7Ozs7QUNyY3pEOzs7Ozs7O0FDQUEsTUFnQk0saUJBR087QUFuQmI7OztBQUdBO0FBSUE7QUFTQSxNQUFNLGtCQUEwQjtBQUcxQixNQUFPLGtCQUFQLE1BQU8saUJBQWU7UUFDMUIsWUFBb0IsU0FBK0I7QUFDakQsZUFBSyxVQUFVO1FBQ2pCO1FBR0EsSUFBSSxhQUFVO0FBQ1osaUJBQU8sS0FBSyxRQUFRO1FBQ3RCO1FBQ0EsSUFBSSxjQUFXO0FBQ2IsaUJBQU8sS0FBSyxRQUFRO1FBQ3RCO1FBRUEsYUFBYSxPQUFPLGlCQUErQyxnQkFBK0I7QUFFaEcsZ0JBQU0sWUFBK0IsZ0JBQWdCLGFBQWE7QUFDbEUsZ0JBQU0saUJBQW9DLGdCQUFnQixrQkFBa0I7QUFDNUUsZ0JBQU0sVUFBMEIsa0JBQWtCLENBQUE7QUFHbEQsZ0JBQU0sTUFBTSxRQUFRLHNCQUFzQixDQUFBO0FBQzFDLGdCQUFNLGVBQWUsSUFBSSxJQUFJLE9BQUssT0FBTyxNQUFNLFdBQVcsSUFBSSxFQUFFLElBQUk7QUFDcEUsZ0JBQU0sVUFBVSxNQUFNLGVBQWUsWUFBWTtBQUNqRCxjQUFJLFFBQVEsOEJBQThCO0FBQ3hDLGtCQUFNLFVBQVUsTUFBTSxRQUFRLDZCQUMxQixnQkFBZ0IsaUJBQWlCLGdCQUFnQixZQUFZLFdBQVcsZ0JBQWdCLE9BQU87QUFDbkcsbUJBQU8sSUFBSSxpQkFBZ0IsT0FBTztpQkFDN0I7QUFDTCxrQkFBTSxJQUFJLE1BQU0sZUFBZTs7UUFFbkM7Ozs7Ozs7Ozs7UUFXQSx3QkFBd0IsT0FBa0IsTUFBK0IsTUFBaUI7QUFFeEYsZ0JBQU0sVUFBNEMsQ0FBQTtBQUNsRCxjQUFJLFVBQXNCLENBQUE7QUFFMUIsY0FBSSxPQUFPLFVBQVUsWUFBWSxVQUFVLFFBQVEsaUJBQWlCQyxXQUFVLE1BQU0sUUFBUSxLQUFLLEdBQUc7QUFDbEcsa0JBQU0sSUFBSSxVQUNOLCtGQUFpRzs7QUFHdkcsY0FBSSxpQkFBaUI7QUFFckIsY0FBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixnQkFBSSxTQUFTLE1BQU07QUFDakIsb0JBQU0sSUFBSSxVQUFVLHlDQUF5Qzs7QUFFL0QsZ0JBQUksZ0JBQWdCQSxTQUFRO0FBQzFCLG9CQUFNLElBQUksVUFBVSw4QkFBZ0M7O0FBR3RELGdCQUFJLE1BQU0sUUFBUSxJQUFJLEdBQUc7QUFDdkIsa0JBQUksS0FBSyxXQUFXLEdBQUc7QUFDckIsc0JBQU0sSUFBSSxVQUFVLHFDQUF1Qzs7QUFFN0QsK0JBQWlCO0FBRWpCLHlCQUFXLFFBQVEsTUFBTTtBQUN2QixvQkFBSSxPQUFPLFNBQVMsVUFBVTtBQUM1Qix3QkFBTSxJQUFJLFVBQVUsZ0RBQWtEOztBQUV4RSxvQkFBSSxLQUFLLFlBQVksUUFBUSxJQUFJLE1BQU0sSUFBSTtBQUN6Qyx3QkFBTSxJQUFJLFdBQVcsMkNBQTJDLElBQUksR0FBRzs7QUFFekUsd0JBQVEsSUFBSSxJQUFJOztBQUdsQixrQkFBSSxPQUFPLFNBQVMsWUFBWSxTQUFTLE1BQU07QUFDN0MsMEJBQVU7eUJBQ0QsT0FBTyxTQUFTLGFBQWE7QUFDdEMsc0JBQU0sSUFBSSxVQUFVLDhCQUFnQzs7bUJBRWpEO0FBR0wsa0JBQUksWUFBWTtBQUNoQixvQkFBTSxXQUFXLE9BQU8sb0JBQW9CLElBQUk7QUFDaEQseUJBQVcsUUFBUSxLQUFLLGFBQWE7QUFDbkMsb0JBQUksU0FBUyxRQUFRLElBQUksTUFBTSxJQUFJO0FBQ2pDLHdCQUFNLElBQUssS0FBbUQsSUFBSTtBQUNsRSxzQkFBSSxNQUFNLFFBQVEsYUFBYUEsU0FBUTtBQUNyQyxnQ0FBWTtBQUNaLHFDQUFpQjtBQUNqQiw0QkFBUSxJQUFJLElBQUk7Ozs7QUFLdEIsa0JBQUksV0FBVztBQUNiLG9CQUFJLE9BQU8sU0FBUyxZQUFZLFNBQVMsTUFBTTtBQUM3Qyw0QkFBVTsyQkFDRCxPQUFPLFNBQVMsYUFBYTtBQUN0Qyx3QkFBTSxJQUFJLFVBQVUsOEJBQWdDOztxQkFFakQ7QUFDTCwwQkFBVTs7O3FCQUdMLE9BQU8sU0FBUyxhQUFhO0FBQ3RDLGtCQUFNLElBQUksVUFBVSx5REFBNkQ7O0FBSW5GLHFCQUFXLFFBQVEsS0FBSyxZQUFZO0FBQ2xDLGdCQUFJLE9BQU8sTUFBTSxJQUFJLE1BQU0sYUFBYTtBQUN0QyxvQkFBTSxJQUFJLE1BQU0sVUFBVSxJQUFJLDBCQUEwQjs7O0FBSzVELGNBQUksZ0JBQWdCO0FBQ2xCLHVCQUFXLFFBQVEsS0FBSyxhQUFhO0FBQ25DLHNCQUFRLElBQUksSUFBSTs7O0FBSXBCLGlCQUFPLENBQUMsU0FBUyxPQUFPO1FBQzFCOzs7Ozs7OztRQVNBLHVDQUF1QyxTQUFrQztBQUN2RSxnQkFBTSxjQUEyQyxDQUFBO0FBQ2pELHFCQUFXLE9BQU8sU0FBUztBQUN6QixnQkFBSSxPQUFPLGVBQWUsS0FBSyxTQUFTLEdBQUcsR0FBRztBQUM1QyxvQkFBTSxTQUFTLFFBQVEsR0FBRztBQUMxQixrQkFBSSxrQkFBa0JBLFNBQVE7QUFDNUIsNEJBQVksR0FBRyxJQUFJO3FCQUNkO0FBQ0wsNEJBQVksR0FBRyxJQUFJLElBQUlBLFFBQU8sT0FBTyxNQUFNLE9BQU8sTUFBTSxPQUFPLElBQUk7Ozs7QUFJekUsaUJBQU87UUFDVDtRQUlBLE1BQU0sYUFBYSxPQUFrQixNQUErQixNQUFpQjtBQUNuRixnQkFBTSxDQUFDLFNBQVMsT0FBTyxJQUFJLEtBQUssd0JBQXdCLE9BQU8sTUFBTSxJQUFJO0FBQ3pFLGdCQUFNLFVBQVUsTUFBTSxLQUFLLFFBQVEsYUFBYSxPQUFPLFNBQVMsT0FBTztBQUN2RSxpQkFBTyxLQUFLLHVDQUF1QyxPQUFPO1FBQzVEO1FBRUEsTUFBTSxxQkFBcUIsUUFBb0IsZ0JBQXVCO0FBQ3BFLGdCQUFNLElBQUksTUFBTSx5QkFBeUI7UUFDM0M7UUFFQSxNQUFNLHdCQUF3QixnQkFBdUI7QUFDbkQsZ0JBQU0sSUFBSSxNQUFNLHlCQUF5QjtRQUMzQztRQUVBLE1BQU0sVUFBTztBQUNYLGlCQUFPLEtBQUssUUFBUSxRQUFPO1FBQzdCOzs7Ozs7QUM1TEYsTUFxSWFDO0FBckliOzs7QUFJQTtBQWlJTyxNQUFNQSxtQkFBMEM7Ozs7O0FDckl2RDs7NEJBQUFDO0lBQUEsY0FBQUM7SUFBQSx1QkFBQUM7SUFBQSxXQUFBQztJQUFBOzs7OztBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDeEJBLE1BQWE7QUFBYjtBQUFBO0FBQU8sTUFBTSxPQUFPO0FBQUE7QUFBQTs7O0FDQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBYTtBQUFiO0FBQUE7QUFBTyxNQUFNLFdBQVc7QUFBQTtBQUFBOzs7QUNBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFhO0FBQWI7QUFBQTtBQUFPLE1BQU0sT0FBTztBQUFBO0FBQUE7OztBQ0FwQjtBQUFBO0FBQUE7QUFDQSxVQUFJLFdBQVcsTUFBTTtBQUNuQixZQUFJLGFBQWEsT0FBTyxhQUFhLGVBQWUsU0FBUyxnQkFBZ0IsU0FBUyxjQUFjLE1BQU07QUFDMUcsWUFBSSxPQUFPLGVBQWU7QUFBYSx1QkFBYSxjQUFjO0FBQ2xFLGVBQ0YsU0FBUyxZQUFZLENBQUMsR0FBRztBQUV6QixjQUFJLElBQUUsV0FBVSxJQUFHO0FBQUcsWUFBRSxRQUFNLElBQUksUUFBUSxDQUFDLEdBQUUsTUFBSTtBQUFDLGlCQUFHO0FBQUUsaUJBQUc7QUFBQSxVQUFDLENBQUM7QUFBRSxjQUFJLEtBQUcsT0FBTyxPQUFPLENBQUMsR0FBRSxDQUFDLEdBQUUsS0FBRyxrQkFBaUIsS0FBRyxZQUFVLE9BQU8sUUFBTyxJQUFFLGNBQVksT0FBTyxlQUFjLEtBQUcsWUFBVSxPQUFPLFdBQVMsWUFBVSxPQUFPLFFBQVEsWUFBVSxZQUFVLE9BQU8sUUFBUSxTQUFTLE1BQUssSUFBRSxJQUFHLElBQUcsSUFBRztBQUM3UixjQUFHLElBQUc7QUFBQyxnQkFBSSxLQUFHLHVDQUFjLEtBQUc7QUFBZ0IsZ0JBQUUsSUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFFLE1BQUksWUFBVTtBQUFJLGlCQUFHLENBQUMsR0FBRSxNQUFJO0FBQUMsa0JBQUUsRUFBRSxXQUFXLFNBQVMsSUFBRSxJQUFJLElBQUksQ0FBQyxJQUFFLEdBQUcsVUFBVSxDQUFDO0FBQUUscUJBQU8sR0FBRyxhQUFhLEdBQUUsSUFBRSxTQUFPLE1BQU07QUFBQSxZQUFDO0FBQUUsaUJBQUcsT0FBRztBQUFDLGtCQUFFLEdBQUcsR0FBRSxJQUFFO0FBQUUsZ0JBQUUsV0FBUyxJQUFFLElBQUksV0FBVyxDQUFDO0FBQUcscUJBQU87QUFBQSxZQUFDO0FBQUUsaUJBQUcsQ0FBQyxHQUFFLEdBQUUsR0FBRSxJQUFFLFNBQUs7QUFBQyxrQkFBRSxFQUFFLFdBQVcsU0FBUyxJQUFFLElBQUksSUFBSSxDQUFDLElBQUUsR0FBRyxVQUFVLENBQUM7QUFBRSxpQkFBRyxTQUFTLEdBQUUsSUFBRSxTQUFPLFFBQU8sQ0FBQyxHQUFFLE1BQUk7QUFBQyxvQkFBRSxFQUFFLENBQUMsSUFBRSxFQUFFLElBQUUsRUFBRSxTQUFPLENBQUM7QUFBQSxjQUFDLENBQUM7QUFBQSxZQUFDO0FBQUUsYUFBQyxFQUFFLGVBQWEsSUFBRSxRQUFRLEtBQUssV0FBUyxLQUFHLFFBQVEsS0FBSyxDQUFDLEVBQUUsUUFBUSxPQUFNLEdBQUc7QUFBRyxvQkFBUSxLQUFLLE1BQU0sQ0FBQztBQUFFLGNBQUUsVUFBUSxNQUFJO0FBQUEsVUFBNEIsV0FBUyxNQUN6aEI7QUFBRSxnQkFBRSxJQUFFLEtBQUssU0FBUyxPQUFLLGVBQWEsT0FBTyxZQUFVLFNBQVMsa0JBQWdCLElBQUUsU0FBUyxjQUFjLE1BQUssZUFBYSxJQUFFLGFBQVksTUFBSSxFQUFFLFFBQVEsT0FBTyxJQUFFLElBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRSxRQUFRLFVBQVMsRUFBRSxFQUFFLFlBQVksR0FBRyxJQUFFLENBQUMsSUFBRSxJQUFFLElBQUcsS0FBRyxPQUFHO0FBQUMsa0JBQUksSUFBRSxJQUFJO0FBQWUsZ0JBQUUsS0FBSyxPQUFNLEdBQUUsS0FBRTtBQUFFLGdCQUFFLEtBQUssSUFBSTtBQUFFLHFCQUFPLEVBQUU7QUFBQSxZQUFZLEdBQUUsTUFBSSxLQUFHLE9BQUc7QUFBQyxrQkFBSSxJQUFFLElBQUk7QUFBZSxnQkFBRSxLQUFLLE9BQU0sR0FBRSxLQUFFO0FBQUUsZ0JBQUUsZUFBYTtBQUFjLGdCQUFFLEtBQUssSUFBSTtBQUFFLHFCQUFPLElBQUksV0FBVyxFQUFFLFFBQVE7QUFBQSxZQUFDLElBQUcsS0FBRyxDQUFDLEdBQUUsR0FBRSxNQUFJO0FBQUMsa0JBQUksSUFBRSxJQUFJO0FBQWUsZ0JBQUUsS0FBSyxPQUFNLEdBQUUsSUFBRTtBQUFFLGdCQUFFLGVBQ3BmO0FBQWMsZ0JBQUUsU0FBTyxNQUFJO0FBQUMsdUJBQUssRUFBRSxVQUFRLEtBQUcsRUFBRSxVQUFRLEVBQUUsV0FBUyxFQUFFLEVBQUUsUUFBUSxJQUFFLEVBQUU7QUFBQSxjQUFDO0FBQUUsZ0JBQUUsVUFBUTtBQUFFLGdCQUFFLEtBQUssSUFBSTtBQUFBLFlBQUM7QUFBRSxjQUFJLEtBQUcsUUFBUSxJQUFJLEtBQUssT0FBTyxHQUFFLElBQUUsUUFBUSxNQUFNLEtBQUssT0FBTztBQUFFLGlCQUFPLE9BQU8sR0FBRSxFQUFFO0FBQUUsZUFBRztBQUFLLHNCQUFVLE9BQU8sZUFBYSxHQUFHLGlDQUFpQztBQUFFLGNBQUksSUFBRyxLQUFHLE9BQUcsR0FBRSxHQUFFLEdBQUUsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUc7QUFDbFQsbUJBQVMsS0FBSTtBQUFDLGdCQUFJLElBQUUsR0FBRztBQUFPLGNBQUUsUUFBTSxJQUFFLElBQUksVUFBVSxDQUFDO0FBQUUsY0FBRSxTQUFPLElBQUUsSUFBSSxXQUFXLENBQUM7QUFBRSxjQUFFLFNBQU8sSUFBRSxJQUFJLFdBQVcsQ0FBQztBQUFFLGNBQUUsVUFBUSxLQUFHLElBQUksWUFBWSxDQUFDO0FBQUUsY0FBRSxTQUFPLElBQUUsSUFBSSxXQUFXLENBQUM7QUFBRSxjQUFFLFVBQVEsSUFBRSxJQUFJLFlBQVksQ0FBQztBQUFFLGNBQUUsVUFBUSxLQUFHLElBQUksYUFBYSxDQUFDO0FBQUUsY0FBRSxVQUFRLEtBQUcsSUFBSSxhQUFhLENBQUM7QUFBRSxjQUFFLFNBQU8sS0FBRyxJQUFJLGNBQWMsQ0FBQztBQUFFLGNBQUUsVUFBUSxLQUFHLElBQUksZUFBZSxDQUFDO0FBQUEsVUFBQztBQUFDLGNBQUksS0FBRyxDQUFDLEdBQUUsS0FBRyxDQUFDLEdBQUUsS0FBRyxDQUFDLEdBQUUsSUFBRSxHQUFFLEtBQUcsTUFBSyxJQUFFO0FBQ3pYLG1CQUFTLEdBQUcsR0FBRTtBQUFDLGdCQUFFLGFBQVcsSUFBRTtBQUFJLGNBQUUsQ0FBQztBQUFFLGlCQUFHO0FBQUcsZ0JBQUUsSUFBSSxZQUFZLGFBQWEsSUFBRSwwQ0FBMEM7QUFBRSxlQUFHLENBQUM7QUFBRSxrQkFBTTtBQUFBLFVBQUU7QUFBQyxtQkFBUyxHQUFHLEdBQUU7QUFBQyxtQkFBTyxFQUFFLFdBQVcsdUNBQXVDO0FBQUEsVUFBQztBQUFDLGNBQUk7QUFBRyxlQUFHO0FBQWdCLGNBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRTtBQUFDLGdCQUFJLEtBQUc7QUFBRyxpQkFBRyxFQUFFLGFBQVcsRUFBRSxXQUFXLElBQUcsQ0FBQyxJQUFFLElBQUU7QUFBQSxVQUFFO0FBQUMsbUJBQVMsR0FBRyxHQUFFO0FBQUMsZ0JBQUc7QUFBRyxxQkFBTyxHQUFHLENBQUM7QUFBRSxrQkFBSztBQUFBLFVBQWtEO0FBQ3RZLG1CQUFTLEdBQUcsR0FBRTtBQUFDLGdCQUFHLE1BQUksR0FBRTtBQUFDLGtCQUFHLGNBQVksT0FBTyxTQUFPLENBQUMsRUFBRSxXQUFXLFNBQVM7QUFBRSx1QkFBTyxNQUFNLEdBQUUsRUFBQyxhQUFZLGNBQWEsQ0FBQyxFQUFFLEtBQUssT0FBRztBQUFDLHNCQUFHLENBQUMsRUFBRTtBQUFHLDBCQUFLLHlDQUF1QyxJQUFFO0FBQUkseUJBQU8sRUFBRSxZQUFZO0FBQUEsZ0JBQUMsQ0FBQyxFQUFFLE1BQU0sTUFBSSxHQUFHLENBQUMsQ0FBQztBQUFFLGtCQUFHO0FBQUcsdUJBQU8sSUFBSSxRQUFRLENBQUMsR0FBRSxNQUFJO0FBQUMscUJBQUcsR0FBRSxPQUFHLEVBQUUsSUFBSSxXQUFXLENBQUMsQ0FBQyxHQUFFLENBQUM7QUFBQSxnQkFBQyxDQUFDO0FBQUEsWUFBQztBQUFDLG1CQUFPLFFBQVEsUUFBUSxFQUFFLEtBQUssTUFBSSxHQUFHLENBQUMsQ0FBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsbUJBQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxPQUFHLFlBQVksWUFBWSxHQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFFLE9BQUc7QUFBQyxnQkFBRSwwQ0FBMEMsQ0FBQyxFQUFFO0FBQUUsaUJBQUcsQ0FBQztBQUFBLFlBQUMsQ0FBQztBQUFBLFVBQUM7QUFDemUsbUJBQVMsR0FBRyxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFO0FBQUcsbUJBQU0sY0FBWSxPQUFPLFlBQVksd0JBQXNCLEdBQUcsQ0FBQyxLQUFHLEVBQUUsV0FBVyxTQUFTLEtBQUcsTUFBSSxjQUFZLE9BQU8sUUFBTSxHQUFHLEdBQUUsR0FBRSxDQUFDLElBQUUsTUFBTSxHQUFFLEVBQUMsYUFBWSxjQUFhLENBQUMsRUFBRSxLQUFLLE9BQUcsWUFBWSxxQkFBcUIsR0FBRSxDQUFDLEVBQUUsS0FBSyxHQUFFLFNBQVMsR0FBRTtBQUFDLGdCQUFFLGtDQUFrQyxDQUFDLEVBQUU7QUFBRSxnQkFBRSwyQ0FBMkM7QUFBRSxxQkFBTyxHQUFHLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxDQUFDLENBQUM7QUFBQSxVQUFDO0FBQUMsY0FBSSxLQUFHLENBQUMsR0FBRSxLQUFHLEdBQUUsSUFBRTtBQUMvWCxtQkFBUyxHQUFHLEdBQUU7QUFBQyxpQkFBSyxLQUFHO0FBQUUsaUJBQUssS0FBRyxJQUFFO0FBQUcsaUJBQUssS0FBRyxTQUFTLEdBQUU7QUFBQyxnQkFBRSxLQUFLLEtBQUcsTUFBSSxNQUFJLENBQUMsSUFBRTtBQUFBLFlBQUM7QUFBRSxpQkFBSyxLQUFHLFdBQVU7QUFBQyxxQkFBTyxFQUFFLEtBQUssS0FBRyxNQUFJLE1BQUksQ0FBQztBQUFBLFlBQUM7QUFBRSxpQkFBSyxLQUFHLFNBQVMsR0FBRTtBQUFDLGdCQUFFLEtBQUssS0FBRyxNQUFJLE1BQUksQ0FBQyxJQUFFO0FBQUEsWUFBQztBQUFFLGlCQUFLLEtBQUcsU0FBUyxHQUFFO0FBQUMsZ0JBQUUsS0FBSyxLQUFHLE9BQUssTUFBSSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUEsWUFBQztBQUFFLGlCQUFLLEtBQUcsV0FBVTtBQUFDLHFCQUFPLEtBQUcsRUFBRSxLQUFLLEtBQUcsT0FBSyxNQUFJLENBQUM7QUFBQSxZQUFDO0FBQUUsaUJBQUssS0FBRyxTQUFTLEdBQUU7QUFBQyxnQkFBRSxLQUFLLEtBQUcsT0FBSyxNQUFJLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBQSxZQUFDO0FBQUUsaUJBQUssS0FBRyxXQUFVO0FBQUMscUJBQU8sS0FBRyxFQUFFLEtBQUssS0FBRyxPQUFLLE1BQUksQ0FBQztBQUFBLFlBQUM7QUFBRSxpQkFBSyxLQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMsbUJBQUssR0FBRyxDQUFDO0FBQUUsbUJBQUssR0FBRyxDQUFDO0FBQUUsbUJBQUssR0FBRyxDQUFDO0FBQUEsWUFBQztBQUFFLGlCQUFLLEtBQUcsU0FBUyxHQUFFO0FBQUMsZ0JBQUUsS0FBSyxLQUFHLE9BQUssTUFBSSxDQUFDLElBQUU7QUFBQSxZQUFDO0FBQUUsaUJBQUssS0FBRyxXQUFVO0FBQUMscUJBQU8sRUFBRSxLQUFLLEtBQzlmLE9BQUssTUFBSSxDQUFDO0FBQUEsWUFBQztBQUFFLGlCQUFLLEtBQUcsV0FBVTtBQUFDLGtCQUFHLEdBQUcsS0FBSyxHQUFHLENBQUM7QUFBRSx1QkFBTyxFQUFFLEtBQUssT0FBSyxNQUFJLENBQUM7QUFBRSxrQkFBSSxJQUFFLEtBQUssR0FBRztBQUFFLHFCQUFPLE1BQUksSUFBRSxJQUFFLEtBQUs7QUFBQSxZQUFFO0FBQUEsVUFBQztBQUNsSCxjQUFJLEtBQUcsT0FBRztBQUFDLGdCQUFJLElBQUU7QUFBRSxnQkFBRyxDQUFDO0FBQUUscUJBQU8sR0FBRyxDQUFDLEdBQUU7QUFBRSxnQkFBSSxJQUFFLElBQUksR0FBRyxDQUFDO0FBQUUsY0FBRSxHQUFHLENBQUM7QUFBRSxnQkFBSSxJQUFFLEVBQUUsR0FBRztBQUFFLGdCQUFHLENBQUM7QUFBRSxxQkFBTyxHQUFHLENBQUMsR0FBRTtBQUFFLHFCQUFRLEtBQUssR0FBRTtBQUFDLGtCQUFJLElBQUUsRUFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxLQUFHLE1BQUk7QUFBRTtBQUFNLGtCQUFHLEdBQUcsR0FBRSxHQUFFLEVBQUUsS0FBRyxFQUFFO0FBQUUsdUJBQU8sR0FBRyxDQUFDLEdBQUU7QUFBQSxZQUFDO0FBQUMsZUFBRyxDQUFDO0FBQUUsbUJBQU87QUFBQSxVQUFDLEdBQUUsS0FBRyxlQUFhLE9BQU8sY0FBWSxJQUFJLFlBQVksTUFBTSxJQUFFLFFBQU8sS0FBRyxDQUFDLEdBQUUsR0FBRSxNQUFJO0FBQUMsbUJBQUs7QUFBRSxnQkFBSSxJQUFFLElBQUU7QUFBRSxpQkFBSSxJQUFFLEdBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxLQUFHO0FBQUksZ0JBQUU7QUFBRSxnQkFBRyxLQUFHLElBQUUsS0FBRyxFQUFFLFVBQVE7QUFBRyxxQkFBTyxHQUFHLE9BQU8sRUFBRSxTQUFTLEdBQUUsQ0FBQyxDQUFDO0FBQUUsaUJBQUksSUFBRSxJQUFHLElBQUUsS0FBRztBQUFDLGtCQUFJLElBQUUsRUFBRSxHQUFHO0FBQUUsa0JBQUcsSUFBRSxLQUFJO0FBQUMsb0JBQUksSUFBRSxFQUFFLEdBQUcsSUFBRTtBQUFHLG9CQUFHLFFBQU0sSUFBRTtBQUFLLHVCQUFHLE9BQU8sY0FBYyxJQUFFLE9BQUssSUFBRSxDQUFDO0FBQUEscUJBQU07QUFBQyxzQkFBSSxJQUFFLEVBQUUsR0FBRyxJQUNwZjtBQUFHLHNCQUFFLFFBQU0sSUFBRSxRQUFNLElBQUUsT0FBSyxLQUFHLEtBQUcsSUFBRSxLQUFHLElBQUUsTUFBSSxLQUFHLEtBQUcsS0FBRyxLQUFHLElBQUUsRUFBRSxHQUFHLElBQUU7QUFBRywwQkFBTSxJQUFFLEtBQUcsT0FBTyxhQUFhLENBQUMsS0FBRyxLQUFHLE9BQU0sS0FBRyxPQUFPLGFBQWEsUUFBTSxLQUFHLElBQUcsUUFBTSxJQUFFLElBQUk7QUFBQSxnQkFBRTtBQUFBLGNBQUM7QUFBTSxxQkFBRyxPQUFPLGFBQWEsQ0FBQztBQUFBLFlBQUM7QUFBQyxtQkFBTztBQUFBLFVBQUMsR0FBRSxLQUFHLENBQUMsR0FBRSxPQUFLLE9BQUssS0FBRyxHQUFHLEdBQUUsR0FBRSxDQUFDLElBQUUsSUFBRyxLQUFHLE9BQUc7QUFBQyxxQkFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEVBQUUsR0FBRTtBQUFDLGtCQUFJLElBQUUsRUFBRSxXQUFXLENBQUM7QUFBRSxxQkFBSyxJQUFFLE1BQUksUUFBTSxJQUFFLEtBQUcsSUFBRSxTQUFPLEtBQUcsU0FBTyxLQUFHLEtBQUcsR0FBRSxFQUFFLEtBQUcsS0FBRztBQUFBLFlBQUM7QUFBQyxtQkFBTztBQUFBLFVBQUMsR0FBRSxLQUFHLENBQUMsR0FBRSxHQUFFLEdBQUUsTUFBSTtBQUFDLG1CQUFLO0FBQUUsZ0JBQUcsRUFBRSxJQUFFO0FBQUcscUJBQU87QUFBRSxnQkFBSSxJQUFFO0FBQUUsZ0JBQUUsSUFBRSxJQUFFO0FBQUUscUJBQVEsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEVBQUUsR0FBRTtBQUFDLGtCQUFJLElBQUUsRUFBRSxXQUFXLENBQUM7QUFBRSxrQkFBRyxTQUFPLEtBQUcsU0FBTyxHQUFFO0FBQUMsb0JBQUksSUFDbmYsRUFBRSxXQUFXLEVBQUUsQ0FBQztBQUFFLG9CQUFFLFVBQVEsSUFBRSxTQUFPLE1BQUksSUFBRTtBQUFBLGNBQUk7QUFBQyxrQkFBRyxPQUFLLEdBQUU7QUFBQyxvQkFBRyxLQUFHO0FBQUU7QUFBTSxrQkFBRSxRQUFNLENBQUMsSUFBRTtBQUFBLGNBQUMsT0FBSztBQUFDLG9CQUFHLFFBQU0sR0FBRTtBQUFDLHNCQUFHLElBQUUsS0FBRztBQUFFO0FBQU0sb0JBQUUsUUFBTSxDQUFDLElBQUUsTUFBSSxLQUFHO0FBQUEsZ0JBQUMsT0FBSztBQUFDLHNCQUFHLFNBQU8sR0FBRTtBQUFDLHdCQUFHLElBQUUsS0FBRztBQUFFO0FBQU0sc0JBQUUsUUFBTSxDQUFDLElBQUUsTUFBSSxLQUFHO0FBQUEsa0JBQUUsT0FBSztBQUFDLHdCQUFHLElBQUUsS0FBRztBQUFFO0FBQU0sc0JBQUUsUUFBTSxDQUFDLElBQUUsTUFBSSxLQUFHO0FBQUcsc0JBQUUsUUFBTSxDQUFDLElBQUUsTUFBSSxLQUFHLEtBQUc7QUFBQSxrQkFBRTtBQUFDLG9CQUFFLFFBQU0sQ0FBQyxJQUFFLE1BQUksS0FBRyxJQUFFO0FBQUEsZ0JBQUU7QUFBQyxrQkFBRSxRQUFNLENBQUMsSUFBRSxNQUFJLElBQUU7QUFBQSxjQUFFO0FBQUEsWUFBQztBQUFDLGNBQUUsTUFBSSxDQUFDLElBQUU7QUFBRSxtQkFBTyxJQUFFO0FBQUEsVUFBQyxHQUFFLEtBQUcsT0FBRztBQUFDLGdCQUFHLFNBQU87QUFBRSxxQkFBTTtBQUFPLGdCQUFJLElBQUUsT0FBTztBQUFFLG1CQUFNLGFBQVcsS0FBRyxZQUFVLEtBQUcsZUFBYSxJQUFFLEVBQUUsU0FBUyxJQUFFLEtBQUc7QUFBQSxVQUFDLEdBQUUsSUFBRyxJQUFFLE9BQUc7QUFBQyxxQkFBUSxJQUFFLElBQUcsRUFBRSxNQUFJLENBQUM7QUFBRyxtQkFBRyxHQUFHLEVBQUUsUUFBTSxDQUFDLENBQUM7QUFBRSxtQkFBTztBQUFBLFVBQUMsR0FDbmYsS0FBRyxDQUFDLEdBQUUsS0FBRyxDQUFDLEdBQUUsS0FBRyxDQUFDLEdBQUU7QUFBRSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxJQUFFLENBQUMsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFLLGdCQUFHLENBQUM7QUFBRSxvQkFBTSxJQUFJLEVBQUUsU0FBUyxDQUFDLCtDQUErQztBQUFFLGdCQUFHLEdBQUcsZUFBZSxDQUFDLEdBQUU7QUFBQyxrQkFBRyxFQUFFO0FBQUc7QUFBTyxvQkFBTSxJQUFJLEVBQUUseUJBQXlCLENBQUMsU0FBUztBQUFBLFlBQUU7QUFBQyxlQUFHLENBQUMsSUFBRTtBQUFFLG1CQUFPLEdBQUcsQ0FBQztBQUFFLGVBQUcsZUFBZSxDQUFDLE1BQUksSUFBRSxHQUFHLENBQUMsR0FBRSxPQUFPLEdBQUcsQ0FBQyxHQUFFLEVBQUUsUUFBUSxPQUFHLEVBQUUsQ0FBQztBQUFBLFVBQUU7QUFBQyxtQkFBUyxFQUFFLEdBQUUsR0FBRSxJQUFFLENBQUMsR0FBRTtBQUFDLGdCQUFHLEVBQUUsb0JBQW1CO0FBQUcsb0JBQU0sSUFBSSxVQUFVLHlEQUF5RDtBQUFFLGVBQUcsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQzFiLGNBQUksS0FBRyxDQUFDLEdBQUUsR0FBRSxNQUFJO0FBQUMsb0JBQU8sR0FBRTtBQUFBLGNBQUMsS0FBSztBQUFFLHVCQUFPLElBQUUsT0FBRyxFQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsT0FBRyxFQUFFLE1BQUksTUFBSSxDQUFDO0FBQUEsY0FBRSxLQUFLO0FBQUUsdUJBQU8sSUFBRSxPQUFHLEVBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxPQUFHLEdBQUcsTUFBSSxNQUFJLENBQUM7QUFBQSxjQUFFLEtBQUs7QUFBRSx1QkFBTyxJQUFFLE9BQUcsRUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLE9BQUcsRUFBRSxNQUFJLE1BQUksQ0FBQztBQUFBLGNBQUUsS0FBSztBQUFFLHVCQUFPLElBQUUsT0FBRyxHQUFHLE1BQUksQ0FBQyxJQUFFLE9BQUcsR0FBRyxNQUFJLENBQUM7QUFBQSxjQUFFO0FBQVEsc0JBQU0sSUFBSSxVQUFVLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQUEsWUFBRTtBQUFBLFVBQUM7QUFBRSxtQkFBUyxLQUFJO0FBQUMsaUJBQUssS0FBRyxDQUFDLE1BQU07QUFBRSxpQkFBSyxLQUFHLENBQUM7QUFBQSxVQUFDO0FBQUMsY0FBSSxJQUFFLElBQUk7QUFBRyxtQkFBUyxHQUFHLEdBQUU7QUFBQyxtQkFBSztBQUFFLGlCQUFHLEVBQUUsTUFBSSxNQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxNQUFJLEVBQUUsR0FBRyxDQUFDO0FBQUEsVUFBQztBQUMzWSxjQUFJLElBQUUsT0FBRztBQUFDLGdCQUFHLENBQUM7QUFBRSxvQkFBTSxJQUFJLEVBQUUsc0NBQW9DLENBQUM7QUFBRSxtQkFBTyxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQUEsVUFBSyxHQUFFLElBQUUsT0FBRztBQUFDLG9CQUFPLEdBQUU7QUFBQSxjQUFDLEtBQUs7QUFBTyx1QkFBTztBQUFBLGNBQUUsS0FBSztBQUFLLHVCQUFPO0FBQUEsY0FBRSxLQUFLO0FBQUcsdUJBQU87QUFBQSxjQUFFLEtBQUs7QUFBRyx1QkFBTztBQUFBLGNBQUU7QUFBUSx1QkFBTyxFQUFFLEdBQUcsRUFBQyxJQUFHLEdBQUUsT0FBTSxFQUFDLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFFLG1CQUFTLEdBQUcsR0FBRTtBQUFDLG1CQUFPLEtBQUssYUFBYSxFQUFFLE1BQUksTUFBSSxDQUFDLENBQUM7QUFBQSxVQUFDO0FBQUMsY0FBSSxLQUFHLENBQUMsR0FBRSxNQUFJO0FBQUMsb0JBQU8sR0FBRTtBQUFBLGNBQUMsS0FBSztBQUFFLHVCQUFPLFNBQVMsR0FBRTtBQUFDLHlCQUFPLEtBQUssYUFBYSxHQUFHLE1BQUksTUFBSSxDQUFDLENBQUM7QUFBQSxnQkFBQztBQUFBLGNBQUUsS0FBSztBQUFFLHVCQUFPLFNBQVMsR0FBRTtBQUFDLHlCQUFPLEtBQUssYUFBYSxHQUFHLE1BQUksTUFBSSxDQUFDLENBQUM7QUFBQSxnQkFBQztBQUFBLGNBQUU7QUFBUSxzQkFBTSxJQUFJLFVBQVUsd0JBQXdCLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFBQSxZQUFFO0FBQUEsVUFBQztBQUNoZixtQkFBUyxHQUFHLEdBQUU7QUFBQyxtQkFBTyxLQUFLLGFBQWEsRUFBRSxNQUFJLE1BQUksQ0FBQyxDQUFDO0FBQUEsVUFBQztBQUNyRCxjQUFJLEtBQUcsZUFBYSxPQUFPLGNBQVksSUFBSSxZQUFZLFVBQVUsSUFBRSxRQUFPLEtBQUcsQ0FBQyxHQUFFLE1BQUk7QUFBQyxnQkFBSSxJQUFFLEtBQUc7QUFBRSxxQkFBUSxJQUFFLElBQUUsSUFBRSxHQUFFLEVBQUUsS0FBRyxNQUFJLEdBQUcsTUFBSSxDQUFDO0FBQUcsZ0JBQUU7QUFBRSxrQkFBSTtBQUFFLGdCQUFHLEtBQUcsSUFBRSxLQUFHO0FBQUcscUJBQU8sR0FBRyxPQUFPLEVBQUUsU0FBUyxNQUFJLEdBQUUsTUFBSSxDQUFDLENBQUM7QUFBRSxnQkFBRTtBQUFHLGlCQUFJLElBQUUsR0FBRSxFQUFFLEtBQUcsSUFBRSxJQUFHLEVBQUUsR0FBRTtBQUFDLGtCQUFJLElBQUUsRUFBRSxJQUFFLElBQUUsTUFBSSxNQUFJLENBQUM7QUFBRSxrQkFBRyxLQUFHO0FBQUU7QUFBTSxtQkFBRyxPQUFPLGFBQWEsQ0FBQztBQUFBLFlBQUM7QUFBQyxtQkFBTztBQUFBLFVBQUMsR0FBRSxLQUFHLENBQUMsR0FBRSxHQUFFLE1BQUk7QUFBQyx1QkFBUyxNQUFJLElBQUU7QUFBWSxnQkFBRyxJQUFFO0FBQUUscUJBQU87QUFBRSxpQkFBRztBQUFFLGdCQUFJLElBQUU7QUFBRSxnQkFBRSxJQUFFLElBQUUsRUFBRSxTQUFPLElBQUUsSUFBRSxFQUFFO0FBQU8scUJBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxFQUFFO0FBQUUsZ0JBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLFdBQVcsQ0FBQyxHQUFFLEtBQUc7QUFBRSxjQUFFLE1BQUksTUFBSSxDQUFDLElBQUU7QUFBRSxtQkFBTyxJQUFFO0FBQUEsVUFBQyxHQUFFLEtBQUcsT0FBRyxJQUFFLEVBQUUsUUFBTyxLQUFHLENBQUMsR0FBRSxNQUNwZjtBQUFDLHFCQUFRLElBQUUsR0FBRSxJQUFFLElBQUcsRUFBRSxLQUFHLElBQUUsTUFBSTtBQUFDLGtCQUFJLElBQUUsRUFBRSxJQUFFLElBQUUsTUFBSSxNQUFJLENBQUM7QUFBRSxrQkFBRyxLQUFHO0FBQUU7QUFBTSxnQkFBRTtBQUFFLHVCQUFPLEtBQUcsS0FBRyxPQUFNLEtBQUcsT0FBTyxhQUFhLFFBQU0sS0FBRyxJQUFHLFFBQU0sSUFBRSxJQUFJLEtBQUcsS0FBRyxPQUFPLGFBQWEsQ0FBQztBQUFBLFlBQUM7QUFBQyxtQkFBTztBQUFBLFVBQUMsR0FBRSxLQUFHLENBQUMsR0FBRSxHQUFFLE1BQUk7QUFBQyxtQkFBSztBQUFFLHVCQUFTLE1BQUksSUFBRTtBQUFZLGdCQUFHLElBQUU7QUFBRSxxQkFBTztBQUFFLGdCQUFJLElBQUU7QUFBRSxnQkFBRSxJQUFFLElBQUU7QUFBRSxxQkFBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sRUFBRSxHQUFFO0FBQUMsa0JBQUksSUFBRSxFQUFFLFdBQVcsQ0FBQztBQUFFLGtCQUFHLFNBQU8sS0FBRyxTQUFPLEdBQUU7QUFBQyxvQkFBSSxJQUFFLEVBQUUsV0FBVyxFQUFFLENBQUM7QUFBRSxvQkFBRSxVQUFRLElBQUUsU0FBTyxNQUFJLElBQUU7QUFBQSxjQUFJO0FBQUMsZ0JBQUUsTUFBSSxNQUFJLENBQUMsSUFBRTtBQUFFLG1CQUFHO0FBQUUsa0JBQUcsSUFBRSxJQUFFO0FBQUU7QUFBQSxZQUFLO0FBQUMsY0FBRSxNQUFJLE1BQUksQ0FBQyxJQUFFO0FBQUUsbUJBQU8sSUFBRTtBQUFBLFVBQUMsR0FBRSxLQUFHLE9BQUc7QUFBQyxxQkFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEVBQUUsR0FBRTtBQUFDLGtCQUFJLElBQUUsRUFBRSxXQUFXLENBQUM7QUFDdmYsdUJBQU8sS0FBRyxTQUFPLEtBQUcsRUFBRTtBQUFFLG1CQUFHO0FBQUEsWUFBQztBQUFDLG1CQUFPO0FBQUEsVUFBQyxHQUFFLEtBQUcsQ0FBQyxHQUFFLE1BQUk7QUFBQyxnQkFBSSxJQUFFLEdBQUcsQ0FBQztBQUFFLGdCQUFHLFdBQVM7QUFBRSxvQkFBTSxJQUFFLEdBQUcsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLEdBQUUsSUFBSSxFQUFFLElBQUUsdUJBQXFCLENBQUM7QUFBRSxtQkFBTztBQUFBLFVBQUMsR0FBRSxLQUFHLENBQUMsR0FBRSxLQUFHLE9BQUc7QUFBQyxnQkFBSSxJQUFFLEdBQUcsQ0FBQztBQUFFLG1CQUFPLFdBQVMsSUFBRSxFQUFFLENBQUMsSUFBRTtBQUFBLFVBQUMsR0FBRSxLQUFHLENBQUMsR0FBRSxLQUFHLE1BQUksWUFBVSxPQUFPLGFBQVcsYUFBVyxTQUFTLGFBQWEsRUFBRSxHQUFFLEtBQUcsT0FBRztBQUFDLGdCQUFJLElBQUUsR0FBRztBQUFPLGVBQUcsS0FBSyxDQUFDO0FBQUUsbUJBQU87QUFBQSxVQUFDLEdBQUUsS0FBRyxDQUFDLEdBQUUsTUFBSTtBQUFDLHFCQUFRLElBQUUsTUFBTSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxFQUFFO0FBQUUsZ0JBQUUsQ0FBQyxJQUFFLEdBQUcsRUFBRSxJQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxlQUFhLENBQUM7QUFBRSxtQkFBTztBQUFBLFVBQUMsR0FBRSxLQUFHLE9BQUc7QUFBQyxnQkFBRyxXQUFTO0FBQUUscUJBQU07QUFBVyxnQkFBRSxFQUFFLFFBQVEsa0JBQWlCLEdBQUc7QUFBRSxnQkFBSSxJQUFFLEVBQUUsV0FBVyxDQUFDO0FBQ3RmLG1CQUFPLE1BQUksS0FBRyxNQUFJLElBQUUsSUFBSSxDQUFDLEtBQUc7QUFBQSxVQUFDLEdBQUUsS0FBRyxDQUFDO0FBQUUsbUJBQVMsR0FBRyxHQUFFLEdBQUU7QUFBQyxnQkFBRSxHQUFHLENBQUM7QUFBRSxtQkFBTSxFQUFDLENBQUMsQ0FBQyxHQUFFLFdBQVU7QUFBQyxxQkFBTyxFQUFFLE1BQU0sTUFBSyxTQUFTO0FBQUEsWUFBQyxFQUFDLEVBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUU7QUFBQyxnQkFBSSxJQUFFO0FBQVMsZ0JBQUcsRUFBRSxhQUFhO0FBQVUsb0JBQU0sSUFBSSxVQUFVLHFDQUFxQyxPQUFPLENBQUMsMEJBQTBCO0FBQUUsZ0JBQUksSUFBRSxHQUFHLEVBQUUsUUFBTSx1QkFBc0IsV0FBVTtBQUFBLFlBQUMsQ0FBQztBQUFFLGNBQUUsWUFBVSxFQUFFO0FBQVUsZ0JBQUUsSUFBSTtBQUFFLGdCQUFFLEVBQUUsTUFBTSxHQUFFLENBQUM7QUFBRSxtQkFBTyxhQUFhLFNBQU8sSUFBRTtBQUFBLFVBQUM7QUFDalosY0FBSSxLQUFHLE9BQUc7QUFBQyxxQkFBUSxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRSxFQUFFO0FBQUUsb0JBQUksTUFBSSxJQUFFLE9BQUssTUFBSSxRQUFNO0FBQUUsZ0JBQUksSUFBRSxxQ0FBbUMsSUFBRTtBQUFrRSxpQkFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEVBQUU7QUFBRSxtQkFBRyxnQkFBYyxJQUFFLG9FQUFrRSxJQUFFLGlCQUFlLElBQUUsZUFBYSxJQUFFLGtEQUFnRCxJQUFFO0FBQXdDLG1CQUFPLElBQUksU0FBUyx5QkFBd0IsVUFBUyxpQkFBZ0IsYUFBWSxLQUFHLCtCQUNqZSxJQUFFLHNDQUFzQyxFQUFHLElBQUcsR0FBRSxHQUFFLE1BQUksQ0FBQztBQUFBLFVBQUMsR0FBRSxLQUFHLENBQUMsR0FBRSxJQUFFLE9BQUcsTUFBSSxJQUFFLE1BQUksTUFBSSxJQUFFLE9BQUssTUFBSSxJQUFFLE1BQUssS0FBRyxDQUFDLEdBQUUsSUFBRyxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxHQUFHLEdBQUUsS0FBRyxDQUFDLEdBQUUsSUFBRyxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxHQUFHLEdBQUUsS0FBRyxPQUFHO0FBQUMsZ0JBQUksSUFBRSxHQUFHLENBQUMsSUFBRSxHQUFFLElBQUUsR0FBRyxDQUFDO0FBQUUsaUJBQUcsR0FBRyxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUUsbUJBQU87QUFBQSxVQUFDLEdBQUUsS0FBRyxDQUFDLEdBQUUsS0FBRyxNQUFJO0FBQUMsZ0JBQUcsQ0FBQyxJQUFHO0FBQUMsa0JBQUksSUFBRSxFQUFDLE1BQUssWUFBVyxTQUFRLFlBQVcsTUFBSyxLQUFJLEtBQUksS0FBSSxNQUFLLGtCQUFpQixPQUFNLFlBQVUsT0FBTyxhQUFXLFVBQVUsYUFBVyxVQUFVLFVBQVUsQ0FBQyxLQUFHLEtBQUssUUFBUSxLQUFJLEdBQUcsSUFBRSxVQUFTLEdBQUUsTUFBSSxpQkFBZ0IsR0FBRTtBQUFFLG1CQUFJLEtBQUs7QUFBRywyQkFDdGYsR0FBRyxDQUFDLElBQUUsT0FBTyxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxHQUFHLENBQUM7QUFBRSxrQkFBSSxJQUFFLENBQUM7QUFBRSxtQkFBSSxLQUFLO0FBQUUsa0JBQUUsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQUUsbUJBQUc7QUFBQSxZQUFDO0FBQUMsbUJBQU87QUFBQSxVQUFFLEdBQUUsSUFBRyxLQUFHLENBQUMsTUFBSyxDQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsS0FBRyxDQUFDLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxFQUFFLEdBQUUsS0FBRyxDQUFDLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxFQUFFO0FBQUUsbUJBQVMsR0FBRyxHQUFFO0FBQUMsZ0JBQUksSUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFFLENBQUM7QUFBRSxlQUFHLEdBQUUsR0FBRSxHQUFFLEVBQUUsTUFBTTtBQUFFLG1CQUFPO0FBQUEsVUFBQztBQUM1UCxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxxQkFBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsbUJBQUksSUFBRSxZQUFVLE9BQU8sSUFBRSxFQUFFLFNBQVMsSUFBRSxLQUFHLElBQUcsRUFBRSxTQUFPO0FBQUcsb0JBQUUsRUFBRSxDQUFDLElBQUU7QUFBRSxxQkFBTztBQUFBLFlBQUM7QUFBQyxxQkFBUyxFQUFFLEdBQUUsR0FBRTtBQUFDLHFCQUFPLEVBQUUsR0FBRSxHQUFFLEdBQUc7QUFBQSxZQUFDO0FBQUMscUJBQVMsRUFBRSxHQUFFLEdBQUU7QUFBQyx1QkFBUyxFQUFFLEdBQUU7QUFBQyx1QkFBTyxJQUFFLElBQUUsS0FBRyxJQUFFLElBQUUsSUFBRTtBQUFBLGNBQUM7QUFBQyxrQkFBSTtBQUFFLHFCQUFLLElBQUUsRUFBRSxFQUFFLFlBQVksSUFBRSxFQUFFLFlB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LE9BQUcsRUFBRSxFQUFFLElBQUcsR0FBRSxHQUFHLEdBQUUsTUFBSyxPQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLENBQUMsR0FBRSxNQUFLLE9BQUc7QUFBQyxrQkFBRSxFQUFFO0FBQUcsbUJBQUcsSUFBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLEtBQUc7QUFBSSxxQkFBTyxFQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsR0FBRSxNQUFLLE9BQUc7QUFBQyx1QkFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUcsRUFBRSxLQUFHLEdBQUUsTUFBSSxFQUFFLEVBQUUsS0FBRyxJQUFJLElBQUUsS0FBRyxJQUFJLEdBQUc7QUFBRTtBQUFDLHFCQUFPLEVBQUUsRUFBRSxLQUFHLEdBQUUsQ0FBQztBQUFBLFlBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxFQUFFLEtBQUcsR0FBRSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLENBQUMsR0FBRSxNQUFLLE1BQUksTUFBSyxNQUFLLE9BQUcsS0FBRyxFQUFFLE1BQUksS0FBRyxFQUFFLEtBQUcsT0FBSyxNQUFLLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFBSyxNQUFJLEtBQUssTUFBSyxPQUFHLEVBQUUsTUFBSSxHQUFFLE1BQUssT0FBRyxFQUFFLEtBQUssT0FBTyxFQUFFLEtBQUcsSUFBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLENBQUMsR0FBRSxNQUFLLE9BQ25mO0FBQUMsa0JBQUksSUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFHLEtBQUcsRUFBRSxLQUFHLEtBQUcsS0FBRyxDQUFDO0FBQUUsb0JBQUksRUFBRSxLQUFHLE1BQUksRUFBRSxLQUFHLEtBQUcsS0FBRztBQUFJLGtCQUFHO0FBQUUsc0JBQUksTUFBSSxLQUFHLEVBQUUsS0FBRyxNQUFJLEVBQUUsTUFBSSxHQUFFLEtBQUcsS0FBRyxLQUFHLEtBQUcsRUFBRSxFQUFFLEVBQUUsTUFBSSxJQUFFO0FBQUEsbUJBQVE7QUFBQyxvQkFBRTtBQUFHLG9CQUFJLEtBQUcsRUFBRSxLQUFHLElBQUUsRUFBRSxLQUFHLEtBQUc7QUFBRSxpQkFBQyxLQUFHLEtBQUcsS0FBRyxLQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUksQ0FBQyxNQUFJO0FBQUEsY0FBRztBQUFDLHFCQUFPLEVBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxHQUFFLE1BQUssT0FBRyxFQUFFLElBQUcsTUFBSyxPQUFHLEVBQUUsS0FBSyxPQUFPLEVBQUUsS0FBRyxLQUFHLEVBQUUsS0FBRyxLQUFHLEtBQUcsQ0FBQyxHQUFFLENBQUMsR0FBRSxNQUFLLFFBQUksRUFBRSxLQUFHLE1BQU0sU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEtBQUcsTUFBSyxNQUFLLE9BQUc7QUFBQyxrQkFBRSxFQUFFO0FBQUcsa0JBQUksSUFBRSxLQUFHO0FBQUUsa0JBQUUsS0FBSyxJQUFJLENBQUMsSUFBRTtBQUFHLHNCQUFPLElBQUUsTUFBSSxPQUFLLE9BQU8sVUFBUSxJQUFFLEtBQUcsTUFBSSxJQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFBQSxZQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsSUFBRyxNQUFLLE1BQUksSUFBRztBQUFFLGdCQUFFLEVBQUUsUUFBUSxPQUFNLE1BQVU7QUFBRSxpQkFBSSxLQUFLO0FBQUUsZ0JBQUUsU0FBUyxDQUFDLE1BQ3JnQixJQUFFLEVBQUUsUUFBUSxJQUFJLE9BQU8sR0FBRSxHQUFHLEdBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQUcsZ0JBQUUsRUFBRSxRQUFRLFNBQVEsR0FBRztBQUFFLGdCQUFFLEdBQUcsQ0FBQztBQUFFLGdCQUFHLEVBQUUsU0FBTztBQUFFLHFCQUFPO0FBQUUsY0FBRSxJQUFJLEdBQUUsTUFBSSxDQUFDO0FBQUUsbUJBQU8sRUFBRSxTQUFPO0FBQUEsVUFBQztBQUFDLG1CQUFRLEtBQUcsQ0FBQyxHQUFFLElBQUcsSUFBRSxPQUFHO0FBQUMsZ0JBQUksSUFBRSxHQUFHLENBQUM7QUFBRSxrQkFBSSxLQUFHLEdBQUcsV0FBUyxHQUFHLFNBQU8sSUFBRSxJQUFHLEdBQUcsQ0FBQyxJQUFFLElBQUUsR0FBRyxJQUFJLENBQUM7QUFBRyxtQkFBTztBQUFBLFVBQUMsR0FBRSxLQUFHLE1BQU0sR0FBRyxHQUFFLEtBQUcsR0FBRSxNQUFJLElBQUcsRUFBRTtBQUFHLGVBQUcsRUFBRSxJQUFFLE9BQU8sYUFBYSxFQUFFO0FBQUUsZUFBRztBQUFHLGNBQUUsRUFBRSxlQUFhLGNBQWMsTUFBSztBQUFBLFlBQUMsWUFBWSxHQUFFO0FBQUMsb0JBQU0sQ0FBQztBQUFFLG1CQUFLLE9BQUs7QUFBQSxZQUFjO0FBQUEsVUFBQztBQUFFLFlBQUUsZ0JBQWMsY0FBYyxNQUFLO0FBQUEsWUFBQyxZQUFZLEdBQUU7QUFBQyxvQkFBTSxDQUFDO0FBQUUsbUJBQUssT0FBSztBQUFBLFlBQWU7QUFBQSxVQUFDO0FBQ3RkLGlCQUFPLE9BQU8sR0FBRyxXQUFVLEVBQUMsSUFBSSxHQUFFO0FBQUMsbUJBQU8sS0FBSyxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsSUFBSSxHQUFFO0FBQUMsbUJBQU8sV0FBUyxLQUFLLEdBQUcsQ0FBQztBQUFBLFVBQUMsR0FBRSxHQUFHLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEtBQUssR0FBRyxJQUFJLEtBQUcsS0FBSyxHQUFHO0FBQU8saUJBQUssR0FBRyxDQUFDLElBQUU7QUFBRSxtQkFBTztBQUFBLFVBQUMsR0FBRSxHQUFHLEdBQUU7QUFBQyxpQkFBSyxHQUFHLENBQUMsSUFBRTtBQUFPLGlCQUFLLEdBQUcsS0FBSyxDQUFDO0FBQUEsVUFBQyxFQUFDLENBQUM7QUFBRSxZQUFFLEdBQUcsS0FBSyxFQUFDLE9BQU0sT0FBTSxHQUFFLEVBQUMsT0FBTSxLQUFJLEdBQUUsRUFBQyxPQUFNLEtBQUUsR0FBRSxFQUFDLE9BQU0sTUFBRSxDQUFDO0FBQUUsWUFBRSxLQUFHLEVBQUUsR0FBRztBQUFPLFlBQUUsc0JBQW9CLE1BQUk7QUFBQyxxQkFBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLElBQUcsSUFBRSxFQUFFLEdBQUcsUUFBTyxFQUFFO0FBQUUseUJBQVMsRUFBRSxHQUFHLENBQUMsS0FBRyxFQUFFO0FBQUUsbUJBQU87QUFBQSxVQUFDO0FBQ2pYLGNBQUksS0FBRztBQUFBLFlBQUMsR0FBRSxTQUFTLEdBQUU7QUFBQyxrQkFBRSxJQUFJLEdBQUcsTUFBSSxDQUFDO0FBQUUsZ0JBQUUsR0FBRyxNQUFJLEVBQUUsR0FBRyxJQUFFLEdBQUU7QUFBTSxnQkFBRSxHQUFHLEtBQUU7QUFBRSxpQkFBRyxLQUFLLENBQUM7QUFBRSxpQkFBRyxFQUFFLEVBQUU7QUFBRSxxQkFBTyxFQUFFLEdBQUc7QUFBQSxZQUFDO0FBQUEsWUFBRSxHQUFFLE1BQUk7QUFBQyxnQkFBRSxHQUFFLENBQUM7QUFBRSxrQkFBSSxJQUFFLEdBQUcsSUFBSTtBQUFFLGlCQUFHLEVBQUUsRUFBRTtBQUFFLGtCQUFFO0FBQUEsWUFBQztBQUFBLFlBQUUsR0FBRSxXQUFVO0FBQUMscUJBQU8sR0FBRyxDQUFDLENBQUM7QUFBQSxZQUFDO0FBQUEsWUFBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLHFCQUFPLEdBQUcsQ0FBQyxNQUFJLENBQUMsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUU7QUFBQyxxQkFBTyxHQUFHLENBQUMsTUFBSSxHQUFFLE1BQUksQ0FBQyxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsR0FBRSxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMscUJBQU8sR0FBRyxDQUFDLE1BQUksR0FBRSxNQUFJLEdBQUUsTUFBSSxDQUFDLENBQUM7QUFBQSxZQUFDO0FBQUEsWUFBRSxJQUFHLE1BQUk7QUFBQyxrQkFBSSxJQUFFLEdBQUcsSUFBSTtBQUFFLG1CQUFHLEdBQUcsdUJBQXVCO0FBQUUsa0JBQUksSUFBRSxFQUFFO0FBQUcsZ0JBQUUsR0FBRyxNQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUUsRUFBRSxHQUFHLElBQUUsR0FBRSxFQUFFLEdBQUcsS0FBRSxHQUFFO0FBQU0sa0JBQUU7QUFBRSxvQkFBTTtBQUFBLFlBQUU7QUFBQSxZQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDLHFCQUFLO0FBQUUsY0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFHLEdBQUcsTUFBSSxHQUFFLE1BQUksQ0FBQztBQUFFLGtCQUFFO0FBQUU7QUFBSyxvQkFBTTtBQUFBLFlBQUU7QUFBQSxZQUFFLElBQUcsTUFDcmY7QUFBQSxZQUFHLEdBQUUsU0FBUyxHQUFFO0FBQUMsb0JBQUksSUFBRSxNQUFJO0FBQUcsb0JBQU07QUFBQSxZQUFFO0FBQUEsWUFBRSxJQUFHLFdBQVU7QUFBQyxxQkFBTztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsV0FBVTtBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsV0FBVTtBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsV0FBVTtBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsV0FBVTtBQUFDLHFCQUFPO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxXQUFVO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxXQUFVO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxXQUFVO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxXQUFVO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxXQUFVO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxXQUFVO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxXQUFVO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxXQUFVO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLHFCQUFLO0FBQUUsa0JBQUUsRUFBRSxDQUFDO0FBQUUsa0JBQUksSUFBRSxNQUFJLEVBQUUsUUFBUSxHQUFHO0FBQUUsb0JBQUksS0FBRyxNQUFJLE9BQUs7QUFBSSxnQkFBRSxNQUFJLEdBQUUsRUFBQyxNQUFLLEdBQUUsY0FBYSxPQUFHLEdBQUUsWUFBVyxTQUFTLEdBQUUsR0FBRTtBQUFDLG9CQUFHLFlBQVUsT0FBTyxLQUFHLFlBQVUsT0FBTztBQUFFLHdCQUFNLElBQUksVUFBVSxtQkFBbUIsR0FBRyxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtBQUM5ZixvQkFBRyxJQUFFLEtBQUcsSUFBRTtBQUFFLHdCQUFNLElBQUksVUFBVSxxQkFBcUIsR0FBRyxDQUFDLENBQUMsd0RBQXdELENBQUMsd0NBQXdDLENBQUMsS0FBSyxDQUFDLElBQUk7QUFBRSx1QkFBTztBQUFBLGNBQUMsR0FBRSxnQkFBZSxHQUFFLHNCQUFxQixHQUFHLEdBQUUsTUFBSSxHQUFFLENBQUMsQ0FBQyxHQUFFLElBQUcsS0FBSSxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxrQkFBRSxFQUFFLE1BQUksQ0FBQztBQUFFLGdCQUFFLE1BQUksR0FBRSxFQUFDLE1BQUssR0FBRSxjQUFhLFNBQVMsR0FBRTtBQUFDLHVCQUFNLENBQUMsQ0FBQztBQUFBLGNBQUMsR0FBRSxZQUFXLFNBQVMsR0FBRSxHQUFFO0FBQUMsdUJBQU8sSUFBRSxJQUFFO0FBQUEsY0FBQyxHQUFFLGdCQUFlLEdBQUUsc0JBQXFCLFNBQVMsR0FBRTtBQUFDLHVCQUFPLEtBQUssYUFBYSxFQUFFLE1BQUksQ0FBQyxDQUFDO0FBQUEsY0FBQyxHQUFFLElBQUcsS0FBSSxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRTtBQUFDLGtCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsZ0JBQUUsTUFBSSxHQUFFO0FBQUEsZ0JBQUMsTUFBSztBQUFBLGdCQUN4ZixjQUFhLE9BQUc7QUFBQyxzQkFBSSxJQUFFLEVBQUUsQ0FBQztBQUFFLHFCQUFHLENBQUM7QUFBRSx5QkFBTztBQUFBLGdCQUFDO0FBQUEsZ0JBQUUsWUFBVyxDQUFDLEdBQUUsTUFBSSxFQUFFLENBQUM7QUFBQSxnQkFBRSxnQkFBZTtBQUFBLGdCQUFFLHNCQUFxQjtBQUFBLGdCQUFHLElBQUc7QUFBQSxjQUFJLENBQUM7QUFBQSxZQUFDO0FBQUEsWUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxrQkFBRSxFQUFFLE1BQUksQ0FBQztBQUFFLGdCQUFFLE1BQUksR0FBRSxFQUFDLE1BQUssR0FBRSxjQUFhLE9BQUcsR0FBRSxZQUFXLENBQUMsR0FBRSxNQUFJLEdBQUUsZ0JBQWUsR0FBRSxzQkFBcUIsR0FBRyxHQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsS0FBSSxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLHFCQUFLO0FBQUUscUJBQUs7QUFBRSxrQkFBRSxFQUFFLE1BQUksQ0FBQztBQUFFLHFCQUFLLE1BQUksSUFBRTtBQUFZLGtCQUFFLE9BQUc7QUFBRSxrQkFBRyxNQUFJLEdBQUU7QUFBQyxvQkFBSSxJQUFFLEtBQUcsSUFBRTtBQUFFLG9CQUFFLE9BQUcsS0FBRyxNQUFJO0FBQUEsY0FBQztBQUFDLGtCQUFJLElBQUUsRUFBRSxTQUFTLFVBQVUsSUFBRSxTQUFTLEdBQUUsR0FBRTtBQUFDLHVCQUFPLE1BQUk7QUFBQSxjQUFDLElBQUUsU0FBUyxHQUFFLEdBQUU7QUFBQyx1QkFBTztBQUFBLGNBQUM7QUFBRSxnQkFBRSxHQUFFO0FBQUEsZ0JBQUMsTUFBSztBQUFBLGdCQUFFLGNBQWE7QUFBQSxnQkFBRSxZQUFXO0FBQUEsZ0JBQUUsZ0JBQWU7QUFBQSxnQkFDbmdCLHNCQUFxQixHQUFHLEdBQUUsR0FBRSxNQUFJLENBQUM7QUFBQSxnQkFBRSxJQUFHO0FBQUEsY0FBSSxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsR0FBRSxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsdUJBQVMsRUFBRSxHQUFFO0FBQUMsdUJBQU8sSUFBSSxFQUFFLEVBQUUsUUFBTyxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxFQUFFLE1BQUksTUFBSSxDQUFDLENBQUM7QUFBQSxjQUFDO0FBQUMsa0JBQUksSUFBRSxDQUFDLFdBQVUsWUFBVyxZQUFXLGFBQVksWUFBVyxhQUFZLGNBQWEsY0FBYSxlQUFjLGNBQWMsRUFBRSxDQUFDO0FBQUUsa0JBQUUsRUFBRSxNQUFJLENBQUM7QUFBRSxnQkFBRSxNQUFJLEdBQUUsRUFBQyxNQUFLLEdBQUUsY0FBYSxHQUFFLGdCQUFlLEdBQUUsc0JBQXFCLEVBQUMsR0FBRSxFQUFDLElBQUcsS0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRTtBQUFDLGtCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsa0JBQUksSUFBRSxrQkFBZ0I7QUFBRSxnQkFBRSxNQUFJLEdBQUUsRUFBQyxNQUFLLEdBQUUsY0FBYSxTQUFTLEdBQUU7QUFBQyxvQkFBSSxJQUFFLEVBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxJQUFFLElBQUU7QUFBRSxvQkFBRztBQUFFLDJCQUFRLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBRyxHQUFFLEVBQUUsR0FBRTtBQUFDLHdCQUFJLElBQzVmLElBQUU7QUFBRSx3QkFBRyxLQUFHLEtBQUcsS0FBRyxFQUFFLE1BQUksQ0FBQyxHQUFFO0FBQUMsMEJBQUUsR0FBRyxHQUFFLElBQUUsQ0FBQztBQUFFLDBCQUFHLFdBQVM7QUFBRSw0QkFBSSxJQUFFO0FBQUE7QUFBTyw2QkFBRyxPQUFPLGFBQWEsQ0FBQyxHQUFFLEtBQUc7QUFBRSwwQkFBRSxJQUFFO0FBQUEsb0JBQUM7QUFBQSxrQkFBQztBQUFBLHFCQUFLO0FBQUMsc0JBQUUsTUFBTSxDQUFDO0FBQUUsdUJBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxFQUFFO0FBQUUsc0JBQUUsQ0FBQyxJQUFFLE9BQU8sYUFBYSxFQUFFLElBQUUsTUFBSSxDQUFDLENBQUM7QUFBRSxzQkFBRSxFQUFFLEtBQUssRUFBRTtBQUFBLGdCQUFDO0FBQUMsa0JBQUUsQ0FBQztBQUFFLHVCQUFPO0FBQUEsY0FBQyxHQUFFLFlBQVcsU0FBUyxHQUFFLEdBQUU7QUFBQyw2QkFBYSxnQkFBYyxJQUFFLElBQUksV0FBVyxDQUFDO0FBQUcsb0JBQUksSUFBRSxZQUFVLE9BQU87QUFBRSxvQkFBRyxFQUFFLEtBQUcsYUFBYSxjQUFZLGFBQWEscUJBQW1CLGFBQWE7QUFBVyx3QkFBTSxJQUFJLEVBQUUsdUNBQXVDO0FBQUUsb0JBQUksSUFBRSxLQUFHLElBQUUsR0FBRyxDQUFDLElBQUUsRUFBRTtBQUFPLG9CQUFJLElBQUUsR0FBRyxJQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsSUFBRTtBQUFFLGtCQUFFLE1BQUksTUFBSSxDQUFDLElBQ25mO0FBQUUsb0JBQUcsS0FBRztBQUFFLHFCQUFHLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQztBQUFBLHlCQUFVO0FBQUUsdUJBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxFQUFFLEdBQUU7QUFBQyx3QkFBSSxJQUFFLEVBQUUsV0FBVyxDQUFDO0FBQUUsd0JBQUcsTUFBSTtBQUFFLDRCQUFNLEVBQUUsQ0FBQyxHQUFFLElBQUksRUFBRSx3REFBd0Q7QUFBRSxzQkFBRSxJQUFFLE1BQUksQ0FBQyxJQUFFO0FBQUEsa0JBQUM7QUFBQTtBQUFNLHVCQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsRUFBRTtBQUFFLHNCQUFFLElBQUUsTUFBSSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUseUJBQU8sS0FBRyxFQUFFLEtBQUssR0FBRSxDQUFDO0FBQUUsdUJBQU87QUFBQSxjQUFDLEdBQUUsZ0JBQWUsR0FBRSxzQkFBcUIsSUFBRyxHQUFHLEdBQUU7QUFBQyxrQkFBRSxDQUFDO0FBQUEsY0FBQyxFQUFDLENBQUM7QUFBQSxZQUFDO0FBQUEsWUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxxQkFBSztBQUFFLHFCQUFLO0FBQUUsa0JBQUUsRUFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxHQUFFO0FBQUMsb0JBQUksSUFBRTtBQUFHLG9CQUFJLElBQUU7QUFBRyxvQkFBSSxJQUFFO0FBQUcsb0JBQUksSUFBRSxNQUFJO0FBQUcsb0JBQUksSUFBRTtBQUFBLGNBQUM7QUFBTSxzQkFBSSxNQUFJLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsTUFBSSxHQUFFLElBQUU7QUFBRyxnQkFBRSxNQUFJLEdBQUUsRUFBQyxNQUFLLEdBQUUsY0FBYSxPQUFHO0FBQUMseUJBQVEsSUFBRSxFQUFFLE1BQUksTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxJQUFFLElBQ3BmLEdBQUUsSUFBRSxHQUFFLEtBQUcsR0FBRSxFQUFFLEdBQUU7QUFBQyxzQkFBSSxJQUFFLElBQUUsSUFBRSxJQUFFO0FBQUUsc0JBQUcsS0FBRyxLQUFHLEtBQUcsRUFBRSxNQUFJLENBQUM7QUFBRSx3QkFBRSxFQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsV0FBUyxJQUFFLElBQUUsS0FBRyxLQUFHLE9BQU8sYUFBYSxDQUFDLEdBQUUsS0FBRyxJQUFHLElBQUUsSUFBRTtBQUFBLGdCQUFDO0FBQUMsa0JBQUUsQ0FBQztBQUFFLHVCQUFPO0FBQUEsY0FBQyxHQUFFLFlBQVcsQ0FBQyxHQUFFLE1BQUk7QUFBQyxvQkFBRyxZQUFVLE9BQU87QUFBRSx3QkFBTSxJQUFJLEVBQUUsNkNBQTZDLENBQUMsRUFBRTtBQUFFLG9CQUFJLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxHQUFHLElBQUUsSUFBRSxDQUFDO0FBQUUsa0JBQUUsTUFBSSxDQUFDLElBQUUsS0FBRztBQUFFLGtCQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsQ0FBQztBQUFFLHlCQUFPLEtBQUcsRUFBRSxLQUFLLEdBQUUsQ0FBQztBQUFFLHVCQUFPO0FBQUEsY0FBQyxHQUFFLGdCQUFlLEdBQUUsc0JBQXFCLElBQUcsR0FBRyxHQUFFO0FBQUMsa0JBQUUsQ0FBQztBQUFBLGNBQUMsRUFBQyxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRTtBQUFDLGtCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsZ0JBQUUsTUFBSSxHQUFFLEVBQUMsSUFBRyxNQUFHLE1BQUssR0FBRSxnQkFBZSxHQUFFLGNBQWEsTUFBSTtBQUFBLGNBQUMsR0FBRSxZQUFXLE1BQUk7QUFBQSxjQUFDLEVBQUMsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsTUFBSTtBQUFBLFlBQUcsSUFBRyxTQUFTLEdBQ3RmLEdBQUUsR0FBRTtBQUFDLHFCQUFLO0FBQUUscUJBQUs7QUFBRSxrQkFBRSxFQUFFLE1BQUksQ0FBQztBQUFFLGtCQUFFLEdBQUcsR0FBRSxXQUFXO0FBQUUsa0JBQUksSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUM7QUFBRSxnQkFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFO0FBQUUscUJBQU8sRUFBRSxXQUFXLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxxQkFBSztBQUFFLHFCQUFLO0FBQUUscUJBQUs7QUFBRSxrQkFBRSxHQUFHLE1BQUksQ0FBQztBQUFFLGtCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsa0JBQUUsR0FBRyxDQUFDO0FBQUUsa0JBQUksSUFBRSxDQUFDO0FBQUUsZ0JBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLENBQUM7QUFBRSxxQkFBTyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsWUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLHFCQUFLO0FBQUUscUJBQUs7QUFBRSxrQkFBRSxHQUFHLE1BQUksQ0FBQztBQUFFLGtCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsa0JBQUUsR0FBRyxDQUFDO0FBQUUsZ0JBQUUsR0FBRSxHQUFFLE1BQUssQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUc7QUFBQSxZQUFHLElBQUcsU0FBUyxHQUFFLEdBQUU7QUFBQyxxQkFBSztBQUFFLGtCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsa0JBQUUsRUFBRSxDQUFDO0FBQUUscUJBQU8sS0FBRztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsU0FBUyxHQUFFO0FBQUMscUJBQUs7QUFBRSxrQkFBRyxNQUFJO0FBQUUsdUJBQU8sRUFBRSxHQUFHLENBQUM7QUFBRSxrQkFBRSxHQUFHLENBQUM7QUFBRSxxQkFBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFBQSxZQUFDO0FBQUEsWUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMsa0JBQUksSUFBRSxHQUFHLEdBQUUsTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUM7QUFBRSxrQkFBRSxFQUFFLE9BQUssT0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksU0FBUyxHQUFFO0FBQUMsdUJBQU8sRUFBRTtBQUFBLGNBQUksQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUN0aUI7QUFBSSxrQkFBSSxJQUFFLEdBQUcsQ0FBQztBQUFFLGtCQUFHLFdBQVM7QUFBRSx1QkFBTztBQUFFLGtCQUFFLENBQUMsU0FBUztBQUFFLHVCQUFRLElBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRSxJQUFHLElBQUUsR0FBRSxJQUFFLElBQUUsR0FBRSxFQUFFO0FBQUUsc0JBQUksTUFBSSxJQUFFLE9BQUssTUFBSSxRQUFNLEdBQUUsRUFBRSxLQUFLLFlBQVUsQ0FBQyxHQUFFLEVBQUUsS0FBSyxFQUFFLElBQUUsQ0FBQyxDQUFDO0FBQUUsa0JBQUksSUFBRSxxQkFBbUIsR0FBRyxrQkFBZ0IsQ0FBQyxJQUFFLHlDQUF3QyxJQUFFO0FBQUUsbUJBQUksSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLEVBQUU7QUFBRSxxQkFBRyxnQkFBYyxJQUFFLGVBQWEsSUFBRSxnQ0FBOEIsSUFBRSxNQUFJLElBQUUsTUFBSSxRQUFPLEtBQUcsRUFBRSxJQUFFLENBQUMsRUFBRTtBQUFlLG1CQUFHLCtCQUE2QixJQUFFO0FBQU8sbUJBQUksSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLEVBQUU7QUFBRSxrQkFBRSxJQUFFLENBQUMsRUFBRSxpQkFBZSxLQUFHLGdCQUFjLElBQUUsc0JBQW9CLElBQUU7QUFBUSxnQkFBRSxPQUNoZixLQUFHO0FBQXFELGdCQUFFLEtBQUssSUFBRSxNQUFNO0FBQUUsa0JBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxNQUFLLENBQUM7QUFBRSxrQkFBRSxHQUFHLENBQUM7QUFBRSxxQkFBTyxHQUFHLENBQUMsSUFBRTtBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsU0FBUyxHQUFFLEdBQUU7QUFBQyxxQkFBSztBQUFFLGtCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsa0JBQUUsRUFBRSxDQUFDO0FBQUUscUJBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLEdBQUUsU0FBUyxHQUFFO0FBQUMscUJBQUs7QUFBRSxrQkFBRSxNQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsTUFBSTtBQUFBLFlBQUU7QUFBQSxZQUFFLElBQUcsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMscUJBQUs7QUFBRSxxQkFBSztBQUFFLGtCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsa0JBQUksSUFBRSxHQUFHLENBQUM7QUFBRSxvQkFBSSxJQUFFLEdBQUcsQ0FBQyxHQUFFLEdBQUcsQ0FBQyxJQUFFO0FBQUcscUJBQU8sRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsV0FBVTtBQUFDLHFCQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUU7QUFBQyxrQkFBRSxFQUFFLE1BQUksQ0FBQztBQUFFLHVCQUFRLElBQUUsTUFBTSxFQUFFLE1BQU0sR0FBRSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU87QUFBSSxrQkFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUscUJBQU8sRUFBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsR0FBRSxTQUFTLEdBQUU7QUFBQyxxQkFBTyxFQUFFLEdBQUcsTUFBSSxDQUFDLENBQUM7QUFBQSxZQUFDO0FBQUEsWUFBRSxJQUFHLFdBQVU7QUFBQyxxQkFBTyxFQUFFLENBQUMsQ0FBQztBQUFBLFlBQUM7QUFBQSxZ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RSxHQUFHLENBQUM7QUFBRSx3QkFBSSxLQUFHLE9BQUssTUFBSSxNQUFJLElBQUUsS0FBRyxHQUFHLEdBQUcsR0FBRSxDQUFDLENBQUMsR0FBRSxFQUFFLFNBQU8sS0FBRyxFQUFFLEtBQUssQ0FBQztBQUFBLGdCQUFDO0FBQUMscUJBQUc7QUFBQSxjQUFDO0FBQUMsZ0JBQUUsTUFBSSxNQUFJLENBQUMsSUFBRTtBQUFFLHFCQUFPO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQ2xmLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLEdBQUU7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUNuZixJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJ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QU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUN6ZCxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRTtBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUM5YixtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUUscUJBQU87QUFBQSxZQUFFO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDaGYsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUMvZCxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUN6YixtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUNuYSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFFLHFCQUFPO0FBQUEsWUFBRTtBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUM5YSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDM2MsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ3ZhLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBRSxxQkFBTztBQUFBLFlBQUU7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUNwYixtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ3JiLG1CQUFTLEdBQUcsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFFLHFCQUFPO0FBQUEsWUFBRTtBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUM5WSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDM1osbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDMWUsbUJBQVMsR0FBRyxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDaGQsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQzFjLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUN2WixtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDM2IsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDM1gsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQzFjLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFFLHFCQUFPO0FBQUEsWUFBRTtBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQzNZLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ2xkLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDOVosbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ3ZhLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQzFlLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ3ZjLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHO0FBQUMsZ0JBQUksS0FBRyxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLElBQUcsRUFBRTtBQUFBLFlBQUMsU0FBTyxJQUFHO0FBQUMsZ0JBQUUsRUFBRTtBQUFFLGtCQUFHLE9BQUssS0FBRztBQUFFLHNCQUFNO0FBQUcsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQzlaLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQzFlLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUMvZSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUMvWixtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDN2UsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUUscUJBQU87QUFBQSxZQUFFO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ2xmLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUNqZixtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDM2IsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ25kLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDcmIsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQzVjLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUNqYixtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBRSxxQkFBTztBQUFBLFlBQUU7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDOVksbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDN1QsbUJBQVMsS0FBSTtBQUFDLGdCQUFJLElBQUU7QUFBRSxnQkFBRSxPQUFPLE9BQU8sQ0FBQyxHQUFFLENBQUM7QUFBRSxnQkFBSSxJQUFFLE9BQUcsTUFBSSxFQUFFLE1BQUks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QkFBZ0IsVUFBVUEsY0FBYSxDQUFDO0FBQUEsSUFDMUM7QUFDQSxvQkFBZ0IsT0FBT0EsY0FBYSxFQUFFO0FBQ3RDLG9CQUFnQixRQUFRQSxjQUFhLEVBQUU7QUFDdkMsUUFBSSxNQUE2QjtBQUMvQixzQkFBZ0IsV0FBV0EsY0FBYSxDQUFDO0FBQ3pDLHNCQUFnQixTQUFTQSxjQUFhLENBQUM7QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFFQSxTQUFPLGVBQWVDLEtBQUksVUFBVSxPQUFPLEVBQUMsT0FBT0MsVUFBUyxZQUFZLEtBQUksQ0FBQzsiLAogICJuYW1lcyI6IFsiaSIsICJlbnYiLCAiVGVuc29yIiwgIlRlbnNvciIsICJJbmZlcmVuY2VTZXNzaW9uIiwgIlRlbnNvciIsICJUcmFpbmluZ1Nlc3Npb24iLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiVHJhaW5pbmdTZXNzaW9uIiwgImVudiIsICJ3YXNtIiwgIndhc20iLCAid2FzbSIsICJ3YXNtIiwgImVudiIsICJ0ZW5zb3IiLCAiZXJyb3JDb2RlIiwgImkiLCAiY3JlYXRlU2Vzc2lvbkFsbG9jYXRlIiwgImNyZWF0ZVNlc3Npb25GaW5hbGl6ZSIsICJjcmVhdGVTZXNzaW9uIiwgInJlbGVhc2VTZXNzaW9uIiwgInJ1biIsICJlbmRQcm9maWxpbmciLCAiaXNPcnRFbnZJbml0aWFsaXplZCIsICJlbnYiLCAicmVhZEZpbGUiLCAiVGVuc29yIiwgImNyZWF0ZVNlc3Npb25BbGxvY2F0ZSIsICJpc09ydEVudkluaXRpYWxpemVkIiwgImVudiIsICJyZWFkRmlsZSIsICJjcmVhdGVTZXNzaW9uIiwgImNyZWF0ZVNlc3Npb25GaW5hbGl6ZSIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJJbmZlcmVuY2VTZXNzaW9uIiwgIlRlbnNvciIsICJUcmFpbmluZ1Nlc3Npb24iLCAiZW52IiwgInZlcnNpb24iLCAid2FzbUJhY2tlbmQiLCAiZW52IiwgInZlcnNpb24iXQp9Cg==
