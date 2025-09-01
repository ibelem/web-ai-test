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
  let inputData;

  // Helper function to convert value to boolean (0 or 1)
  const toBool = (val) => {
    if (typeof val === 'string') {
      const lower = val.toLowerCase().trim();
      return (lower === 'true' || lower === '1' || lower === 'yes') ? 1 : 0;
    }
    return val ? 1 : 0;
  };

  // Helper function to safely parse numbers
  const safeParseFloat = (val) => {
    const parsed = parseFloat(val);
    return isFinite(parsed) ? parsed : 0;
  };

  const safeParseInt = (val) => {
    const parsed = parseInt(val);
    return isFinite(parsed) ? parsed : 0;
  };

  switch (dataType?.toLowerCase()) {
    case 'float32':
    case 'fp32':
    case 'f32':
      inputData = new Float32Array(size);
      if (fillType === 'random') {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.random();
        }
      } else if (Array.isArray(fillType)) {
        for (let j = 0; j < size; j++) {
          inputData[j] = safeParseFloat(fillType[j % fillType.length]);
        }
      } else {
        inputData.fill(safeParseFloat(fillType));
      }
      break;

    case 'float16':
    case 'fp16':
    case 'f16':
      inputData = new Float16Array(size);
      if (fillType === 'random') {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.random();
        }
      } else if (Array.isArray(fillType)) {
        for (let j = 0; j < size; j++) {
          inputData[j] = safeParseFloat(fillType[j % fillType.length]);
        }
      } else {
        inputData.fill(safeParseFloat(fillType));
      }
      break;

    case 'int8':
      inputData = new Int8Array(size);
      if (fillType === 'random') {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.floor(Math.random() * 256) - 128; // -128 to 127
        }
      } else if (Array.isArray(fillType)) {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.max(-128, Math.min(127, safeParseInt(fillType[j % fillType.length])));
        }
      } else {
        inputData.fill(Math.max(-128, Math.min(127, safeParseInt(fillType))));
      }
      break;

    case 'uint8':
      inputData = new Uint8Array(size);
      if (fillType === 'random') {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.floor(Math.random() * 256);
        }
      } else if (Array.isArray(fillType)) {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.max(0, Math.min(255, safeParseInt(fillType[j % fillType.length])));
        }
      } else {
        inputData.fill(Math.max(0, Math.min(255, safeParseInt(fillType))));
      }
      break;

    case 'int16':
      inputData = new Int16Array(size);
      if (fillType === 'random') {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.floor(Math.random() * 65536) - 32768; // -32768 to 32767
        }
      } else if (Array.isArray(fillType)) {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.max(-32768, Math.min(32767, safeParseInt(fillType[j % fillType.length])));
        }
      } else {
        inputData.fill(Math.max(-32768, Math.min(32767, safeParseInt(fillType))));
      }
      break;

    case 'uint16':
      inputData = new Uint16Array(size);
      if (fillType === 'random') {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.floor(Math.random() * 65536);
        }
      } else if (Array.isArray(fillType)) {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.max(0, Math.min(65535, safeParseInt(fillType[j % fillType.length])));
        }
      } else {
        inputData.fill(Math.max(0, Math.min(65535, safeParseInt(fillType))));
      }
      break;

    case 'int32':
    case 'int64':
      inputData = new Int32Array(size);
      if (fillType === 'random') {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.floor(Math.random() * 256); // 0 to 255 for compatibility
        }
      } else if (Array.isArray(fillType)) {
        for (let j = 0; j < size; j++) {
          inputData[j] = safeParseInt(fillType[j % fillType.length]);
        }
      } else {
        inputData.fill(safeParseInt(fillType));
      }
      break;

    case 'uint32':
      inputData = new Uint32Array(size);
      if (fillType === 'random') {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.floor(Math.random() * 256);
        }
      } else if (Array.isArray(fillType)) {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.max(0, safeParseInt(fillType[j % fillType.length]));
        }
      } else {
        inputData.fill(Math.max(0, safeParseInt(fillType)));
      }
      break;

    case 'bool':
    case 'boolean':
      // Use Uint8Array for boolean values (0 or 1)
      inputData = new Uint8Array(size);
      if (fillType === 'random') {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.random() > 0.5 ? 1 : 0;
        }
      } else if (Array.isArray(fillType)) {
        for (let j = 0; j < size; j++) {
          inputData[j] = toBool(fillType[j % fillType.length]);
        }
      } else {
        inputData.fill(toBool(fillType));
      }
      break;

    default:
      // Default to float32
      console.warn(`Unknown data type: ${dataType}, defaulting to float32`);
      inputData = new Float32Array(size);
      if (fillType === 'random') {
        for (let j = 0; j < size; j++) {
          inputData[j] = Math.random();
        }
      } else {
        inputData.fill(0);
      }
      break;
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
    const inputSpec = modelInputs[0]; // Get the first input specification object

    // Handle multiple inputs in the specification
    for (const [inputName, [dataType, fillType, shape, metadata]] of Object.entries(inputSpec)) {
      const totalSize = shape.reduce((acc, dim) => acc * dim, 1);

      // Generate input data using the external function
      const inputData = generateInputData(dataType, fillType, totalSize);

      // Create a fresh tensor for each input
      const tensor = new Tensor(inputData, shape);
      inputTensors.push(tensor);
      inputNames.push(inputName);

      console.log(`Created input "${inputName}": ${dataType} ${JSON.stringify(shape)}`);
    }
  } else {
    // Fallback: create default input tensor if no model inputs found
    console.warn(`No input specification found for model ${modelId}, using default`);
    const inputData = generateInputData('float32', 'random', 1 * 3 * 224 * 224);
    const tensor = new Tensor(inputData, [1, 3, 224, 224]);
    inputTensors.push(tensor);
    inputNames.push('input');
  }

  return { inputTensors, inputNames };
};