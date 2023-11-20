


self.addEventListener('message', async (event) => {
  const models = event.data;

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

  const getHfMirrorUrlById = (id) => {
    for (let i = 0; i < models.length; i++) {
      if (models[i].id === id) {
        return modelHosts.hfmirror + models[i].model;
      }
    }
    return null;
  };

  const getAwsUrlById = (id) => {
    for (let i = 0; i < models.length; i++) {
      if (models[i].id === id) {
        return modelHosts.cf + models[i].model;
      }
    }
    return null;
  };

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
      modelPath = 
    }
    return modelPath;
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

    // Perform inference with the input data
    const output = await session.run(inputData);
  }

  // Send the output back to the main thread
  self.postMessage(output);
});