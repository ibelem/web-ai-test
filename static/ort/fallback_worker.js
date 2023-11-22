
importScripts('./ort.min.js');

self.addEventListener('message', async (event) => {

  const models = event.data;
  console.log(models)

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

  let fallbackChecker = async (backend) => {
    let options = {
      executionProviders: [
        {
          name: 'webnn',
          deviceType: backend,
          powerPreference: "default",
          preferredLayout: 'NHWC',
          numThreads: 4
        },
      ]
    };

    options.logSeverityLevel = 0;

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

      const session = await ort.InferenceSession.create(modelBuffer, options);
      await session.release();

      let everything = console.everything.map(item => item.value[0]);
      let filteredEverything = everything.filter(item => {
        return (
          String(item).includes("Operator type") ||
          String(item).includes("GetCapability")
          // || String(item).includes("Node(s) placed on")
        );
      });
      filteredEverything = filteredEverything.filter(item => !item.includes("is supported by browser"));
      filteredEverything = filteredEverything.filter(item => !item.includes("current supported node group size"));

      // Remove strings before "Operator type: "
      let cleanedJsonOperatorType = filteredEverything.map(item => {
        const match = item.match(/Operator type: .*/);
        return match ? match[0] : item;
      });

      // Remove strings before "WebNNExecutionProvider::GetCapability,"
      let cleanedJsonWebNN = cleanedJsonOperatorType.map(item => {
        const match = item.match(/WebNNExecutionProvider::GetCapability, .*/);
        return match ? match[0] : item;
      });

      let removedOperatorType = cleanedJsonWebNN.map(item => item.replace("Operator type: ", ""));

      // Remove "WebNNExecutionProvider::GetCapability, " from each item
      let removedWebNN = removedOperatorType.map(item => item.replace("WebNNExecutionProvider::GetCapability, ", ""));
      let removedCenter = removedWebNN.map(item => item.replace(/index: \[.*?\] supported: /, 'index: [] supported: '));
      let removeTail = removedCenter.map(item => item.replace('\u001b[m', ''));

      // Find the index of the first "number of" item
      let indexOfNumber = removeTail.findIndex(item => item.startsWith("number of"));

      // Remove the item starting with "number of" and its preceding items
      if (indexOfNumber !== -1) {
        removeTail = removeTail.slice(indexOfNumber + 1);
      }

      let modifiedT = removeTail.flatMap(item => {
        if (item.startsWith("number of")) {
          return item.split("number of").filter(Boolean).map(part => `number of ${part.trim()}`);
        } else {
          return item;
        }
      });

      modifiedT = modifiedT.map(item => item.replace(' index: [] supported: ', ''));
      modifiedT = [...new Set(modifiedT)];

      let obj = {
        "supported": [],
        "not_supported": [],
        "partitions_supported_by_webnn": 0,
        "nodes_in_the_graph": 0,
        "nodes_supported_by_webnn": 0
      };

      modifiedT.forEach(item => {
        if (item.startsWith("[") && item.endsWith("][1]")) {
          obj["supported"].push(item.substring(1, item.indexOf("][")));
        } else if (item.startsWith("[") && item.endsWith("][0]")) {
          obj["not_supported"].push(item.substring(1, item.indexOf("][")));
        } else if (item.startsWith("number of partitions supported by WebNN: ")) {
          obj["partitions_supported_by_webnn"] = parseInt(item.split(": ")[1]);
        } else if (item.startsWith("number of nodes in the graph: ")) {
          obj["nodes_in_the_graph"] = parseInt(item.split(": ")[1]);
        } else if (item.startsWith("number of nodes supported by WebNN: ")) {
          obj["nodes_supported_by_webnn"] = parseInt(item.split(": ")[1]);
        }
      });

      console.log(obj);

      self.postMessage(`Backend: WebNN_${backend.toUpperCase()}`);
      self.postMessage(obj);

    }
  }

  await fallbackChecker('cpu');
  await fallbackChecker('gpu');
});