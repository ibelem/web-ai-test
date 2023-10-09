import ort from 'onnxruntime-web';

export const generateTensor = (dataType, shape, val) => {
  let size = 1;
  shape.forEach((element) => {
    size *= element;
  });
  switch (dataType) {
    case "uint16":
      return new ort.Tensor(
        dataType,
        Uint16Array.from({ length: size }, () => val),
        shape
      );
    case "float16":
      return new ort.Tensor(
        dataType,
        Uint16Array.from({ length: size }, () => val),
        shape
      );
    case "float32":
      return new ort.Tensor(
        dataType,
        Float32Array.from({ length: size }, () => val),
        shape
      );
    case "int32":
      return new ort.Tensor(
        dataType,
        Int32Array.from({ length: size }, () => val),
        shape
      );
    case "int64":
      return new ort.Tensor(
        dataType,
        BigInt64Array.from({ length: size }, () => val),
        shape
      );
  }
  throw new Error(`Input tensor type ${dataType} is unknown`);
}

export const type_to_func = {
  float32: Float32Array,
  uint16: Uint16Array,
  float16: Uint16Array,
  int32: Int32Array,
  BigInt64Array: BigInt64Array,
};

export const clone = (x) => {
  let feed = {};
  for (const [key, value] of Object.entries(x)) {
    let func = type_to_func[value.type];
    let arrayType = func.from(value.data);
    feed[key] = new ort.Tensor(
      value.type,
      arrayType.slice(0),
      value.dims
    );
  }
  return feed;
}
