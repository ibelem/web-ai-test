import { AutoTokenizer } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.13.4';

// Get model via Origin Private File System
export async function getModelOPFS(name, url, updateModel) {
    const root = await navigator.storage.getDirectory();
    let fileHandle;

    async function updateFile() {
        const response = await fetch(url);
        const buffer = await readResponse(response);
        fileHandle = await root.getFileHandle(name, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(buffer);
        await writable.close();
        return buffer;
    }

    if (updateModel) {
        return await updateFile();
    }

    try {
        fileHandle = await root.getFileHandle(name);
        const blob = await fileHandle.getFile();
        return await blob.arrayBuffer();
    } catch (e) {
        return await updateFile();
    }
}

async function readResponse(response) {
    const contentLength = response.headers.get('Content-Length');
    let total = parseInt(contentLength ?? '0');
    let buffer = new Uint8Array(total);
    let loaded = 0;

    const reader = response.body.getReader();
    async function read() {
        const { done, value } = await reader.read();
        if (done) return;

        let newLoaded = loaded + value.length;
        if (newLoaded > total) {
            total = newLoaded;
            let newBuffer = new Uint8Array(total);
            newBuffer.set(buffer);
            buffer = newBuffer;
        }
        buffer.set(value, loaded);
        loaded = newLoaded;
        return read();
    }

    await read();
    return buffer;
}

let tokenizers;
document.addEventListener('DOMContentLoaded', async () => {
    let path = modelPath() + 'stable-diffusion/tokenizer/';
    if (location.href.toLowerCase().indexOf('webai.run') > -1) {
        path = `stable-diffusion/tokenizer`;
    }
    tokenizers = await AutoTokenizer.from_pretrained(path);
});

export async function getTokenizers(text) {
    const { input_ids } = await tokenizers(text);
    return Array.from(input_ids.data, number => Number(number)).flat();
}

export function log(message) {
    console.log(message);
    appendStatus(message);
}

export function appendStatus(message) {
    document.getElementById('status').innerText += `\n[${performance.now().toFixed(3)}] ` + message;
}

export function generateTensorFillValue(dataType, shape, value) {
    let size = 1;
    shape.forEach(element => { size *= element; });
    switch (dataType) {
        case 'uint8': return new ort.Tensor(dataType, Uint8Array.from({ length: size }, () => value), shape);
        case 'int8': return new ort.Tensor(dataType, Int8Array.from({ length: size }, () => value), shape);
        case 'uint16': return new ort.Tensor(dataType, Uint16Array.from({ length: size }, () => value), shape);
        case 'int16': return new ort.Tensor(dataType, Int16Array.from({ length: size }, () => value), shape);
        case 'uint32': return new ort.Tensor(dataType, Uint32Array.from({ length: size }, () => value), shape);
        case 'int32': return new ort.Tensor(dataType, Int32Array.from({ length: size }, () => value), shape);
        case 'float16': return new ort.Tensor(dataType, Uint16Array.from({ length: size }, () => value), shape);
        case 'float32': return new ort.Tensor(dataType, Float32Array.from({ length: size }, () => value), shape);
        case 'uint64': return new ort.Tensor(dataType, BigUint64Array.from({ length: size }, () => value), shape);
        case 'int64': return new ort.Tensor(dataType, BigInt64Array.from({ length: size }, () => value), shape);
    }
    throw new Error(`Input tensor type ${dataType} is unknown`);
}

export function generateTensorFromValues(dataType, shape, values) {
    let size = 1;
    shape.forEach(element => { size *= element; });
    //log(`values.byteLength: ${values.byteLength}`;
    //log(`size: ${size}`);
    switch (dataType) {
        case 'uint8': return new ort.Tensor(dataType, new Uint8Array(values), shape);
        case 'int8': return new ort.Tensor(dataType, new Int8Array(values), shape);
        case 'uint16': return new ort.Tensor(dataType, new Uint16Array(values), shape);
        case 'int16': return new ort.Tensor(dataType, new Int16Array(values), shape);
        case 'uint32': return new ort.Tensor(dataType, new Uint32Array(values), shape);
        case 'int32': return new ort.Tensor(dataType, new Int32Array(values), shape);
        case 'float16': return new ort.Tensor(dataType, new Uint16Array(values), shape);
        case 'float32': return new ort.Tensor(dataType, new Float32Array(values), shape);
        case 'uint64': return new ort.Tensor(dataType, new BigUint64Array(values), shape);
        case 'int64': return new ort.Tensor(dataType, new BigInt64Array(values), shape);
    }
    throw new Error(`Input tensor type ${dataType} is unknown`);
}

export function generateTensorFromBytes(dataType, shape, values) {
    let size = 1;
    shape.forEach(element => { size *= element; });

    // Coerce TypedArray to actual byte buffer, to avoid constructor behavior that casts to the target type.
    if (!(values instanceof ArrayBuffer)) {
        values = values.buffer;
    }
    switch (dataType) {
        case 'uint8': return new ort.Tensor(dataType, new Uint8Array(values), shape);
        case 'int8': return new ort.Tensor(dataType, new Int8Array(values), shape);
        case 'uint16': return new ort.Tensor(dataType, new Uint16Array(values), shape);
        case 'int16': return new ort.Tensor(dataType, new Int16Array(values), shape);
        case 'uint32': return new ort.Tensor(dataType, new Uint32Array(values), shape);
        case 'int32': return new ort.Tensor(dataType, new Int32Array(values), shape);
        case 'float16': return new ort.Tensor(dataType, new Uint16Array(values), shape);
        case 'float32': return new ort.Tensor(dataType, new Float32Array(values), shape);
        case 'uint64': return new ort.Tensor(dataType, new BigUint64Array(values), shape);
        case 'int64': return new ort.Tensor(dataType, new BigInt64Array(values), shape);
    }
    throw new Error(`Input tensor type ${dataType} is unknown`);
}

export function decodeFloat16(binaryValue)/*: float Number*/ {
    'use strict';
    let fraction = binaryValue & 0x03FF;
    let exponent = (binaryValue & 0x7C00) >> 10;
    return (binaryValue >> 15 ? -1 : 1) *
        (
            exponent ?
                (
                    (exponent === 0x1F) ?
                        (fraction ? NaN : Infinity) :
                        Math.pow(2, exponent - 15) * (1 + fraction / 0x400)
                ) :
                6.103515625e-5 * (fraction / 0x400)
        )
}

// https://stackoverflow.com/questions/32633585/how-do-you-convert-to-half-floats-in-javascript
export function encodeFloat16(floatValue)/*: uint16 Number*/ {
    let floatView = new Float32Array(1);
    let int32View = new Int32Array(floatView.buffer);

    floatView[0] = floatValue;
    let x = int32View[0];

    let bits = (x >> 16) & 0x8000; // Get the sign
    let m = (x >> 12) & 0x07FF; // Keep one extra bit for rounding
    let e = (x >> 23) & 0xFF; // Using int is faster here

    // If zero, denormal, or underflowing exponent, then return signed zero.
    if (e < 103) {
        return bits;
    }

    // If NaN, return NaN. If Inf or exponent overflow, return Inf.
    if (e > 142) {
        bits |= 0x7C00;
        // If exponent was 0xff and one mantissa bit was set, it means NaN,
        // not Inf, so make sure we set one mantissa bit too.
        bits |= ((e == 255) ? 0 : 1) && (x & 0x007FFFFF);
        return bits;
    }

    // If exponent underflows but not too much, return a denormal
    if (e < 113) {
        m |= 0x0800;
        // Extra rounding may overflow and set mantissa to 0 and exponent to 1, which is okay.
        bits |= (m >> (114 - e)) + ((m >> (113 - e)) & 1);
        return bits;
    }

    bits |= ((e - 112) << 10) | (m >> 1);
    // Extra rounding. An overflow will set mantissa to 0 and increment the exponent, which is okay.
    bits += m & 1;
    return bits;
}

const loadScript = async (id, url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.onload = resolve;
        script.onerror = reject;
        script.id = id;
        script.src = url;
        if (url.startsWith('http')) {
            script.crossOrigin = 'anonymous';
        }
        document.body.append(script);
    })
}

const removeElement = async (id) => {
    let el = document.querySelector(`#${id}`);
    if (el) {
        el.parentNode.removeChild(el);
    }
}

export const getQueryValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

export const getQueryVariable = (name, defaults) => {
    const query = window.location.search.substring(1);
    let vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (pair[0] == name) {
            return pair[1];
        }
    }
    return defaults;
}

export const modelPath = () => {
    console.log(location.hostname);
    if (location.hostname.toLowerCase().indexOf('webai.run') > -1) {
        return 'https://huggingface.co/webml/models/resolve/main/';
    } else {
        return '../models/'
    }
}

export const randomNumber = () => {
    // generate 6 digital random number between 100, 000 and 999,999
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

export const webNnStatus = async () => {
    let result = {};
    try {
        const context = await navigator.ml.createContext();
        if (context) {
            try {
                const builder = new MLGraphBuilder(context);
                if (builder) {
                    result.webnn = true;
                    return result;
                } else {
                    result.webnn = false;
                    return result;
                }
            } catch (e) {
                result.webnn = false;
                result.error = e.message;
                return result;
            }
        } else {
            result.webnn = false;
            return result;
        }
    } catch (ex) {
        result.webnn = false;
        result.error = ex.message;
        return result;
    }
};