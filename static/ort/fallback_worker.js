importScripts('./ort.min.js');

self.addEventListener('message', async (event) => {

  const model = event.data;

  if (console.everything === undefined) {
    console.everything = [];

    console.defaultLog = console.log.bind(console);
    console.log = function () {
      console.everything.push({ "type": "log", "datetime": Date().toLocaleString(), "value": Array.from(arguments) });
      console.defaultLog.apply(console, arguments);
    }
    console.defaultError = console.error.bind(console);
    console.error = function () {
      console.everything.push({ "type": "error", "datetime": Date().toLocaleString(), "value": Array.from(arguments) });
      console.defaultError.apply(console, arguments);
    }
    console.defaultWarn = console.warn.bind(console);
    console.warn = function () {
      console.everything.push({ "type": "warn", "datetime": Date().toLocaleString(), "value": Array.from(arguments) });
      console.defaultWarn.apply(console, arguments);
    }
    console.defaultDebug = console.debug.bind(console);
    console.debug = function () {
      console.everything.push({ "type": "debug", "datetime": Date().toLocaleString(), "value": Array.from(arguments) });
      console.defaultDebug.apply(console, arguments);
    }
  }

  const modelHosts = {
    hf: 'https://huggingface.co/webml/models/resolve/main/',
    hfmirror: 'https://hf-mirror.com/webml/models/resolve/main/',
    cf: 'https://d3i5xkfad89fac.cloudfront.net/benchmark/',
    local: 'models/'
  }

  const getFreeDimensionOverrides = () => {
    if (model.inputs) {
      let fdo = {};
      for (let input of model.inputs) {
        for (let key in input) {
          let value = input[key];
          let ob = value[3];
          if (Object.keys(ob).length !== 0) {
            Object.keys(ob).forEach(key => {
              if (ob[key].toString().trim()) {
                fdo[key] = ob[key];
              }
            });
          }
        }
      }
      return fdo;
    }
  }

  const getHfUrl = () => {
    return modelHosts.hf + model.model;
  };

  const getLocalUrl = () => {
    return location.origin + '/' + modelHosts.local + model.model;
  };

  const getModelUrl = () => {
    let modelPath = '';
    if (location.origin.indexOf('webai.run') > -1) {
      modelPath = getHfUrl();
    } else {
      modelPath = getLocalUrl();
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

  const inputType = {
    0: 'UNDEFINED',
    1: 'FLOAT',
    2: 'UINT8',
    3: 'INT8',
    4: 'UINT16',
    5: 'INT16',
    6: 'INT32',
    7: 'INT64',
    8: 'STRING',
    9: 'BOOL',
    10: 'FLOAT16',
    11: 'DOUBLE',
    12: 'UINT32',
    13: 'UINT64',
    14: 'COMPLEX64',
    15: 'COMPLEX128',
    16: 'BFLOAT16',
    17: 'FLOAT8E4M3FN',
    18: 'FLOAT8E4M3FNUZ',
    19: 'FLOAT8E5M2',
    20: 'FLOAT8E5M2FNUZ'
  };

  let fallbackChecker = async () => {
    let everything;
    let options = {
      executionProviders: [
        {
          name: 'webnn',
          deviceType: model.backend,
          powerPreference: "default",
          preferredLayout: 'NHWC',
          numThreads: 1
        },
      ]
    };

    options.logSeverityLevel = 0;

    let freeDimensionOverrides = getFreeDimensionOverrides();
    if (freeDimensionOverrides) {
      options.freeDimensionOverrides = freeDimensionOverrides;
    }

    console.log(options.freeDimensionOverrides)
    console.log(options);

    let modelPath = getModelUrl();
    self.postMessage(`[1] Downloading ${model.id} model`);
    let modelBuffer = await getModelOPFS(model.id, modelPath, false);
    if (modelBuffer.byteLength < 1024) {
      modelBuffer = await getModelOPFS(model.id, modelPath, true);
    }

    if (modelBuffer) {
      self.postMessage(`[2] Downloaded ${model.id} model`);
    }

    self.postMessage(`[3] options.freeDimensionOverrides: ` + JSON.stringify(freeDimensionOverrides));

    self.postMessage(`[4] Checking WebNN fallback status of ${model.id} on ${model.backend} backend, please wait...`);

    let session;
    let er = '';
    try {
      session = await ort.InferenceSession.create(modelBuffer, options);
    } catch (error) {
      self.postMessage(`[Error] WebNN fallback status of ${model.backend} backend`);
      self.postMessage(error.message);
      obj.name = model.id;
      obj.backend = model.backend;
      er = error.message;
      // er.push(error.message);
    }

    try {
      await session.release();
    } catch (error2) {
      // er.push(error2.message);
    }

    obj.error = er;
    self.postMessage(`[5] Waiting 10 seconds for WebNN EP to generate the full console logs`);
    everything = console.everything.map(item => item.value[0]);
    self.postMessage(everything);
    await timeout(10000);
    self.postMessage(`[6] Filtering WebNN fallback log messages`);
    everything = console.everything.map(item => item.value[0]);
    self.postMessage(everything);
    let filteredEverything = everything.filter(item => {
      return (
        String(item).includes("Operator type") ||
        String(item).includes("GetCapability") ||
        String(item).includes("is not supported for now")
        // || String(item).includes("Node(s) placed on")
      );
    });

    filteredEverything = filteredEverything.filter(item => !item.includes("is supported by browser"));
    filteredEverything = filteredEverything.filter(item => !item.includes("current supported node group size"));

    // Remove strings before "Operator type: "
    let removeEverything = filteredEverything.map(item => {
      const match = String(item).match(/Operator type: .*/);
      return match ? match[0] : item;
    });

    // Remove strings before "WebNNExecutionProvider::GetCapability,"
    removeEverything = removeEverything.map(item => {
      const match = String(item).match(/WebNNExecutionProvider::GetCapability, .*/);
      return match ? match[0] : item;
    });

    removeEverything = removeEverything.map(item => {
      const match = String(item).match(/HasSupportedInputsImpl], .*/);
      return match ? match[0] : item;
    });

    removeEverything = removeEverything.map(item => {
      let indexOfReshape = item.indexOf("base_op_builder.cc:90");
      return indexOfReshape !== -1 ? item.substring(indexOfReshape) : item;
    });

    removeEverything = removeEverything.map(item => String(item).replace("base_op_builder.cc:90 ", ""));

    removeEverything = removeEverything.map(item => String(item).replace("Operator type: ", ""));

    // Remove "WebNNExecutionProvider::GetCapability, " from each item
    let removedWebNN = removeEverything.map(item => item.replace("WebNNExecutionProvider::GetCapability, ", ""));
    let removedCenter = removedWebNN.map(item => item.replace(/index: \[.*?\] supported: /, 'index: [] supported: '));
    let removeTail = removedCenter.map(item => item.replace('\u001b[m', ''));
    let removeNewTail = removeTail.map(item => item.replace('HasSupportedInputsImpl]', ''));

    // Find the index of the first "number of" item
    let indexOfNumber = removeNewTail.findIndex(item => item.startsWith("number of"));

    if (model.backend === 'cpu') {
      // Remove the item starting with "number of" and its preceding items
      if (indexOfNumber !== -1) {
        console.log(indexOfNumber + ': Remove the item starting with "number of" and its preceding items for CPU backend');
        removeNewTail = removeNewTail.slice(indexOfNumber + 1);
      }
    }

    removeNewTail = removeNewTail.flatMap(item => {
      if (item.startsWith("number of")) {
        return item.split("number of").filter(Boolean).map(part => `number of ${part.trim()}`);
      } else {
        return item;
      }
    });

    modifiedT = removeNewTail.map(item => item.replace(' index: [] supported: ', ''));
    modifiedT = [...new Set(modifiedT)];

    obj.name = model.id;
    obj.backend = model.backend;

    let supported = [];
    let not_supported = []
    let input_type_not_supported = []

    modifiedT.forEach(item => {
      if (item.startsWith("[") && item.endsWith("][1]")) {
        supported.push(item.substring(1, item.indexOf("][")));
      } else if (item.startsWith("[") && item.endsWith("][0]")) {
        not_supported.push(item.substring(1, item.indexOf("][")));
      } else if (item.startsWith("number of partitions supported by WebNN: ")) {
        obj.partitions_supported_by_webnn = parseInt(item.split(": ")[1]);
      } else if (item.startsWith("number of nodes in the graph: ")) {
        obj.nodes_in_the_graph = parseInt(item.split(": ")[1]);
      } else if (item.startsWith("number of nodes supported by WebNN: ")) {
        obj.nodes_supported_by_webnn = parseInt(item.split(": ")[1]);
      } else if (item.endsWith("is not supported for now")) {
        let op = item.split("Input type: ")[0].trim().replace('[', '').replace(']', '');
        let datatypeCode = item.split("Input type: ")[1].replace('is not supported for now', '').trim().replace('[', '').replace(']', '')
        let dataType = inputType[parseInt(datatypeCode)];
        input_type_not_supported.push(`${op}: ${dataType}`);
      }
    });

    if (supported.length > 0) {
      obj.supported = supported.sort();
    }

    if (not_supported.length > 0) {
      obj.not_supported = not_supported.sort();
    }

    if (input_type_not_supported.length > 0) {
      obj.input_type_not_supported = input_type_not_supported.sort();
    }

    self.postMessage(`[7] WebNN fallback status of ${model.id} on ${model.backend} backend - Completed`);
    self.postMessage(obj);
    self.postMessage('|-------------------------------------------------------------------------------------|');
  }

  let obj = {
    "name": '',
    "backend": '',
  };

  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fallbackChecker();

});