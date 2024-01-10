export const isDict = (v) => {
  return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
}

export const dataTypeToArrayConstructor = {
  float32: Float32Array,
  uint16: Uint16Array,
  float16: Uint16Array,
  int32: Int32Array,
  int64: BigInt64Array,
  BigInt64Array: BigInt64Array,
  int8: Int8Array,
  uint8: Uint8Array,
  bool: Uint8Array,
};

// export const bigInt64ArrayToString = (arr) => {
//   console.log(`The variable array is a BigInt64Array`)
//   arr = BigInt64Array.from(arr);
//   return arr.join(',');
// }

export const bigInt64ArrayToString = (obj) => {
  return JSON.stringify(obj, (_, v) => typeof v === 'bigint' ? v.toString() : v)
}

export const bigInt64ArrayToFloat32Array = (arr) => {
  console.log(`The variable array is a BigInt64Array`)
  let float32Array = new Float32Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    float32Array[i] = Number(arr[i]);
  }
  return float32Array;
}

export const uint16ArrayToFloat32Array = (uint16Arr) => {
  console.log(`The variable array is a Uint16Array`)
  let arr = new Float32Array(uint16Arr.buffer)
  return arr;
}

// This function converts a Float16 stored as the bits of a Uint16 into a Javascript Number.
// Adapted from: https://gist.github.com/martinkallman/5049614
// input is a Uint16 (eg, new Uint16Array([value])[0])

export function float16ToNumber(input) {
  // Create a 32 bit DataView to store the input
  const arr = new ArrayBuffer(4);
  const dv = new DataView(arr);

  // Set the Float16 into the last 16 bits of the dataview
  // So our dataView is [00xx]
  dv.setUint16(2, input, false);

  // Get all 32 bits as a 32 bit integer
  // (JS bitwise operations are performed on 32 bit signed integers)
  const asInt32 = dv.getInt32(0, false);

  // All bits aside from the sign
  let rest = asInt32 & 0x7fff;
  // Sign bit
  let sign = asInt32 & 0x8000;
  // Exponent bits
  const exponent = asInt32 & 0x7c00;

  // Shift the non-sign bits into place for a 32 bit Float
  rest <<= 13;
  // Shift the sign bit into place for a 32 bit Float
  sign <<= 16;

  // Adjust bias
  // https://en.wikipedia.org/wiki/Half-precision_floating-point_format#Exponent_encoding
  rest += 0x38000000;
  // Denormals-as-zero
  rest = (exponent === 0 ? 0 : rest);
  // Re-insert sign bit
  rest |= sign;

  // Set the adjusted float32 (stored as int32) back into the dataview
  dv.setInt32(0, rest, false);

  // Get it back out as a float32 (which js will convert to a Number)
  const asFloat32 = dv.getFloat32(0, false);

  return asFloat32;
}