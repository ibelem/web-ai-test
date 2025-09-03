import { Tensor } from '@litertjs/core';
import { getInputsById } from './utils';

/**
 * Generate input data based on data type and fill specification
 * @param {string} dataType - The data type ('float32', 'float16', 'int32', 'int64', 'bool', etc.)
 * @param {string|number|Array} fillType - How to fill the data ('random', array values, or constant)
 * @param {number} totalSize - Total number of elements needed
 * @returns {TypedArray} The generated input data
 */
export const generateInputData = (dataType, fillType, totalSize) => {
  const size = Math.max(1, Math.floor(totalSize) || 1);
  const type = String(dataType || '').toLowerCase();
  
  // Helper function to convert value to boolean (0 or 1)
  const toBool = (val) => {
    if (typeof val === 'string') {
      const lower = val.toLowerCase().trim();
      return (lower === 'true' || lower === '1' || lower === 'yes') ? 1 : 0;
    }
    return val ? 1 : 0;
  };

  // Determine TypedArray constructor based on data type
  let TypedArrayConstructor;
  
  switch (type) {
    case 'bool':
    case 'boolean':
      TypedArrayConstructor = Uint8Array;
      break;
    case 'int4':
    case 'int8':
      TypedArrayConstructor = Int8Array;
      break;
    case 'uint8':
      TypedArrayConstructor = Uint8Array;
      break;
    case 'int16':
      TypedArrayConstructor = Int16Array;
      break;
    case 'uint16':
      TypedArrayConstructor = Uint16Array;
      break;
    case 'float16':
    case 'fp16':
      TypedArrayConstructor = Float16Array;
      break;
    case 'float32':
    case 'fp32':
      TypedArrayConstructor = Float32Array;
      break;
    case 'int32':
      TypedArrayConstructor = Int32Array;
      break;
    case 'uint32':
      TypedArrayConstructor = Uint32Array;
      break;
    case 'int64':
      TypedArrayConstructor = BigInt64Array;
      break;
    case 'float64':
      TypedArrayConstructor = Float64Array;
      break;
    default:
      console.warn(`Unknown data type: ${dataType}, defaulting to float32`);
      TypedArrayConstructor = Float32Array;
      break;
  }

  let inputData;

  // Handle different fill types
  if (Array.isArray(fillType)) {
    // Create from array data
    if (type === 'bool' || type === 'boolean') {
      inputData = TypedArrayConstructor.from({ length: size }, (_, i) => 
        toBool(fillType[i % fillType.length])
      );
    } else {
      inputData = TypedArrayConstructor.from({ length: size }, (_, i) => 
        fillType[i % fillType.length]
      );
    }
  } else if (fillType === 'random') {
    // Generate random data
    if (type === 'bool' || type === 'boolean') {
      inputData = TypedArrayConstructor.from({ length: size }, () => 
        Math.random() > 0.5 ? 1 : 0
      );
    } else if (type === 'int8') {
      inputData = TypedArrayConstructor.from({ length: size }, () => 
        Math.floor(Math.random() * 256) - 128  // -128 to 127
      );
    } else if (type === 'uint8') {
      inputData = TypedArrayConstructor.from({ length: size }, () => 
        Math.floor(Math.random() * 256)  // 0 to 255
      );
    } else if (type === 'int16') {
      inputData = TypedArrayConstructor.from({ length: size }, () => 
        Math.floor(Math.random() * 65536) - 32768  // -32768 to 32767
      );
    } else if (type === 'uint16') {
      inputData = TypedArrayConstructor.from({ length: size }, () => 
        Math.floor(Math.random() * 65536)  // 0 to 65535
      );
    } else if (type === 'int32' || type === 'int64') {
      inputData = TypedArrayConstructor.from({ length: size }, () => 
        Math.floor(Math.random() * 256)  // 0 to 255 for compatibility
      );
    } else if (type === 'uint32') {
      inputData = TypedArrayConstructor.from({ length: size }, () => 
        Math.floor(Math.random() * 256)  // 0 to 255 for compatibility
      );
    } else {
      // float types
      inputData = TypedArrayConstructor.from({ length: size }, () => Math.random());
    }
  } else if (fillType === 'ramp') {
    // Generate ramp data (0, 1, 2, 3, ...)
    inputData = TypedArrayConstructor.from({ length: size }, (_, i) => i);
  } else {
    // Fill with constant value
    if (type === 'bool' || type === 'boolean') {
      const boolValue = toBool(fillType);
      inputData = TypedArrayConstructor.from({ length: size }, () => boolValue);
    } else {
      const numValue = Number(fillType) || 0;
      inputData = TypedArrayConstructor.from({ length: size }, () => numValue);
    }
  }

  return inputData;
};

/**
 * Create input tensors based on model specification
 * @param {string} modelId - The model ID to get input specifications for
 * @returns {Object} Object containing inputTensors array and inputNames array
 */
export const createInputTensors = (modelId) => {
  const modelInputs = getInputsById(modelId);
  let inputTensors = [];
  let inputNames = [];

  if (modelInputs && modelInputs.length > 0) {
    // Process each input specification in the array
    for (const inputSpec of modelInputs) {
      // Each inputSpec is an object like { 'input_ids': ['int32', 1, [1, 384], {}] }
      for (const [inputName, [dataType, fillType, shape, metadata]] of Object.entries(inputSpec)) {
        const totalSize = shape.reduce((acc, dim) => acc * dim, 1);

        // Generate input data using the external function
        const inputData = generateInputData(dataType, fillType, totalSize);

        // Create a fresh tensor for each input
        const tensor = new Tensor(inputData, shape);
        inputTensors.push(tensor);
        inputNames.push(inputName);

        console.log(`Created input "${inputName}": ${dataType} ${JSON.stringify(shape)}, size: ${totalSize}`);
      }
    }
  } else {
    // Fallback: create default input tensor if no model inputs found
    console.warn(`No input specification found for model ${modelId}, using default`);
    const inputData = generateInputData('float32', 'random', 1 * 3 * 224 * 224);
    const tensor = new Tensor(inputData, [1, 3, 224, 224]);
    inputTensors.push(tensor);
    inputNames.push('input');
  }

  console.log(`Created ${inputTensors.length} input tensors for model ${modelId}:`, inputNames);
  return { inputTensors, inputNames };
};