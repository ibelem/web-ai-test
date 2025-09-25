import { Tensor } from '@litertjs/core';

const DTypeInfo = {
  'bool': { name: 'BOOL', ctor: Uint8Array },
  'int8': { name: 'INT8', ctor: Int8Array },
  'uint8': { name: 'UINT8', ctor: Uint8Array },
  'int16': { name: 'INT16', ctor: Int16Array },
  'uint16': { name: 'UINT16', ctor: Uint16Array },
  'int32': { name: 'INT32', ctor: Int32Array },
  'uint32': { name: 'UINT32', ctor: Uint32Array },
  'int64': { name: 'INT64', ctor: Int32Array },
  'uint64': { name: 'UINT64', ctor: Uint32Array },
  'float16': { name: 'FLOAT16', ctor: Float32Array },
  'float32': { name: 'FLOAT32', ctor: Float32Array },
  'float64': { name: 'FLOAT64', ctor: Float64Array },
  'bfloat16': { name: 'BFLOAT16', ctor: Float32Array }
};

// Based on constants.ts of litert.js core 0.1.1, only these are currently supported
const SUPPORTED_DTYPES = new Set(['float32', 'int32']);

export const generateInputData = (dtype, shape, fillSpec = 'random') => {
  let finalDtype = dtype.toLowerCase();
  
  // CRITICAL: Always use a supported dtype for data creation
  if (!SUPPORTED_DTYPES.has(finalDtype)) {
    console.warn(`Data type "${finalDtype}" not supported, falling back to "float32"`);
    finalDtype = 'float32';
  }

  const info = DTypeInfo[finalDtype];
  const Ctor = info.ctor;
  const total = shape.reduce((a, b) => a * b, 1);
  const data = new Ctor(total);

  const fillConst = v => data.fill(v);

  if (fillSpec === 'zeros') fillConst(0);
  else if (fillSpec === 'ones') fillConst(1);
  else if (typeof fillSpec === 'number') fillConst(fillSpec);
  else if (fillSpec === 'random') {
    if (Ctor === Int8Array) for (let i=0;i<total;i++) data[i] = (Math.random()*256|0)-128;
    else if (Ctor === Uint8Array) for (let i=0;i<total;i++) data[i] = Math.random()*256|0;
    else if (Ctor === Int16Array) for (let i=0;i<total;i++) data[i] = (Math.random()*65536|0)-32768;
    else if (Ctor === Uint16Array) for (let i=0;i<total;i++) data[i] = Math.random()*65536|0;
    else if (Ctor === Int32Array || Ctor === Uint32Array) for (let i=0;i<total;i++) data[i] = Math.random()*256|0;
    else for (let i=0;i<total;i++) data[i] = Math.random();
  } else fillConst(0);

  return { data, finalDtype };
};

export const getInputDataTypes = (model) => {
  const inputDescriptors = getOrderedInputDescriptors(model);
  return inputDescriptors.map(desc => desc.dtype);
}

export const getOrderedInputDescriptors = (model) => {
  let details = [];
  if (model?.primarySignature?.getInputDetails) {
    details = model.primarySignature.getInputDetails();
  } else if (model?.getInputDetails) {
    details = model.getInputDetails();
  } else {
    console.error('No signature input details available on model.');
    return [];
  }

  console.log('DEBUG: Raw model input details:', JSON.stringify(details, null, 2));

  return details.map((d, idx) => {
    const name = d.name;
    const dtype = d.dtype ?? d.type;
    const shape = Array.from(d.shape || []);

    console.log(`Processing input ${idx}: name="${name}", dtype="${dtype}", shape=[${shape}]`);

    if (!Array.isArray(shape) || shape.length === 0 || shape.some(dim => typeof dim !== 'number' || dim <= 0)) {
      console.error(`Invalid shape for input "${name}": ${JSON.stringify(shape)}`);
      return null;
    }
    if (dtype === undefined || dtype === null) {
      console.error(`Missing dtype for input "${name}"`);
      return null;
    }
    return { name, dtype, shape };
  }).filter(Boolean);
};

export const getOrderedOutputDescriptors = (model) => {
  let details = [];
  if (model?.primarySignature?.getOutputDetails) {
    details = model.primarySignature.getOutputDetails();
  } else if (model?.getOutputDetails) {
    details = model.getOutputDetails();
  } else {
    console.error('No signature output details available on model.');
    return [];
  }

  console.log('DEBUG: Raw model output details:', JSON.stringify(details, null, 2));

  return details.map((d, idx) => {
    const name = d.name;
    const dtype = d.dtype ?? d.type;
    const shape = Array.from(d.shape || []);

    console.log(`Processing input ${idx}: name="${name}", dtype="${dtype}", shape=[${shape}]`);

    if (!Array.isArray(shape) || shape.length === 0 || shape.some(dim => typeof dim !== 'number' || dim <= 0)) {
      console.error(`Invalid shape for input "${name}": ${JSON.stringify(shape)}`);
      return null;
    }
    if (dtype === undefined || dtype === null) {
      console.error(`Missing dtype for input "${name}"`);
      return null;
    }
    return { name, dtype, shape };
  }).filter(Boolean);
};

export const createInputTensors = (model) => {
  const descriptors = getOrderedInputDescriptors(model);
  const inputTensors = [];
  const inputNames = [];

  console.log(`Creating ${descriptors.length} input tensors...`);

  if (!descriptors.length) {
    console.error('Could not create any input tensors, descriptors are empty or invalid.');
    return { inputTensors, inputNames, descriptors };
  }

  descriptors.forEach((desc, idx) => {
    const lname = desc.name.toLowerCase();
    let fill = 'random';
    if (
      lname.includes('mask') ||
      lname.includes('segment') ||
      lname.includes('token_type') ||
      lname.includes('frame_count')
    ) fill = 'ones';

    try {
      // Generate data with the appropriate supported type
      const { data, finalDtype } = generateInputData(desc.dtype, desc.shape, fill);

      // CRITICAL FIX: Pass the dtype string as the third parameter
      const t = new Tensor(data, desc.shape, finalDtype);

      inputTensors.push(t);
      inputNames.push(desc.name);
      console.log(`✓ Created input[${idx}] name="${desc.name}" requested_dtype="${desc.dtype}" final_dtype="${finalDtype}" shape=[${desc.shape}] fill="${fill}"`);
    } catch (e) {
      console.error(`✗ Failed to create tensor for ${desc.name}:`, e);
      console.error('Error details:', e.stack);
      // Don't stop - continue with next tensor
    }
  });

  console.log(`Successfully created ${inputTensors.length} input tensors out of ${descriptors.length} expected`);
  return { inputTensors, inputNames, descriptors };
};