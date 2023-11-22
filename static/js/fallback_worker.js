
importScripts('https://ibelem.github.io/onnxruntime-web-dist/1.17_11082023/ort.min.js');

self.addEventListener('message', async (event) => {

  const receivedData = event.data;

  if (Array.isArray(receivedData)) {
    // Iterate through the array of objects
    receivedData.forEach((object) => {
      // Process each object
      console.log('Received object:', object);
      // Perform operations with each object here
    });
  }

  const ortDists = {
    public: {
      version: 'v1.16.1 Public',
      url: 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js'
    },
    webgpu: {
      version: 'v1.17 Internal Nov 20',
      url: '../ort/1.17_11202023/web/webgpu/ort.webgpu.min.js'
    },
    webnn_webglfix: {
      version: 'v1.17 Internal Nov 08',
      url: 'https://ibelem.github.io/onnxruntime-web-dist/1.17_11082023/ort.min.js'
    }
  }

  const modelHosts = {
    hf: 'https://huggingface.co/webml/models/resolve/main/',
    hfmirror: 'https://hf-mirror.com/webml/models/resolve/main/',
    cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/',
    local: 'models/'
  }

  const getFreeDimensionOverridesById = (id) => {
    for (let i = 0; i < models.length; i++) {
      if (models[i].id === id) {
        if (models[i].inputs && models[i].inputs[0]) {
          const firstKey = Object.keys(models[i].inputs[0])[0];
          if (firstKey) {
            return models[i].inputs[0][firstKey][3];
          }
        }
      }
    }
    return null;
  }

  const getHfUrlById = (id) => {
    for (let i = 0; i < models.length; i++) {
      if (models[i].id === id) {
        return modelHosts.hf + models[i].model;
      }
    }
    return null;
  };

  // const getHfMirrorUrlById = (id) => {
  //   for (let i = 0; i < models.length; i++) {
  //     if (models[i].id === id) {
  //       return modelHosts.hfmirror + models[i].model;
  //     }
  //   }
  //   return null;
  // };

  // const getAwsUrlById = (id) => {
  //   for (let i = 0; i < models.length; i++) {
  //     if (models[i].id === id) {
  //       return modelHosts.cf + models[i].model;
  //     }
  //   }
  //   return null;
  // };

  const getLocalUrlById = (id) => {
    for (let i = 0; i < models.length; i++) {
      if (models[i].id === id) {
        return location.origin + '/' + modelHosts.local + models[i].model;
      }
    }
    return null;
  };

  const getModelUrl = (_model) => {
    let modelPath = '';
    if (location.origin.indexOf('webai.run') > -1) {
      modelPath = getHfUrlById(_model);
    } else {
      modelPath = getLocalUrlById(_model);
    }
    return modelPath;
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

  async function getModelOPFS(name, url, updateModel) {
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

  console.log(models);

  let options = {
    executionProviders: [
      {
        name: 'webnn',
        deviceType: 'cpu',
        powerPreference: "default",
        preferredLayout: 'NHWC',
        numThreads: 4
      },
    ],
    //executionProviders: [{name: "webnn", deviceType: 'gpu', powerPreference: 'high-performance' }],
  };

  options.logSeverityLevel = 0;
  // options.logVerbosityLevel = 0;

  for (let m of models) {

    console.log(m.id)

    if (m.id === 'mobilenet_v2') {

      let freeDimensionOverrides = getFreeDimensionOverridesById(m.id);
      if (freeDimensionOverrides) {
        options.freeDimensionOverrides = freeDimensionOverrides;
      }

      let modelPath = getModelUrl(m.id);
      let modelBuffer = await getModelOPFS(m.id, modelPath, false);
      if (modelBuffer.byteLength < 1024) {
        modelBuffer = await getModelOPFS(m.id, modelPath, true);
      }

      // Load the ONNX model using the provided model path
      const session = await ort.InferenceSession.create(modelBuffer, options);

      console.log(session)

      // // Perform inference with the input data
      // const output = await session.run(inputData);

      // Send the output back to the main thread
      self.postMessage(session);

      await session.release();
    }
  }
});