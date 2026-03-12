export const _getWebnnOps = async () => {
    const response = await fetch("https://webmachinelearning.github.io/assets/json/webnn_status.json");
    // const response = await fetch("https://ibelem.github.io/webnn_status.json");
    const data = await response.json();
    const status = data.impl_status;
    const webnn = [];
    for (const s of status) {
        const item = {
            "spec": "",
            "alias": [],
            "tflite": 0,
            "tflite_chromium_version_added": '',
            "windowsml": 0,
            "windowsml_chromium_version_added": '',
            "coreml": 0,
            "coreml_chromium_version_added": ""
        };
        let op = s.op;
        op = op.replace(/element-wise binary \/|element-wise unary \/|pooling \/|reduction \/ /g, '')
            .trim();
        item.spec = op;
        let alias = [];
        for (const o of s.tflite_op) {
            if (o) alias.push(o);
        }
        item.tflite_chromium_version_added = s.tflite_chromium_version_added;
        for (let o of s.windowsml_op) {
            if (typeof (o) === 'object') {
                o = o[0];
            }
            o = o.toLowerCase()
                .replace(/map to other op|supported by tensor strides|element_wise_|activation_|reduce_function_/g, '')
                .trim();
            if (o) alias.push(o);
        }
        item.windowsml_chromium_version_added = s.windowsml_chromium_version_added;

        for (const o of s.coreml_op) {
            if (o) alias.push(o);
        }

        item.coreml_chromium_version_added = s.coreml_chromium_version_added;
        for (const o of s.fw_tflite_op) {
            if (o) alias.push(o);
        }
        for (const o of s.fw_ort_op) {
            if (o) alias.push(o);
        }
        // let filter = new Set(alias);
        // alias = [...filter];
        alias = new Map(alias.map(s => [s.toLowerCase(), s]));
        alias = [...alias.values()];
        alias = alias.filter((x) => x.toLowerCase() !== op.toLowerCase());
        item.alias = alias;
        if (s.tflite_progress === 4) {
            item.tflite = 4;
        } else if (s.tflite_progress === 3) {
            item.tflite = 3;
        }
        if (s.windowsml_progress === 4) {
            item.windowsml = 4;
        } else if (s.windowsml_progress === 3) {
            item.windowsml = 3;
        }
        if (s.coreml_progress === 4) {
            item.coreml = 4;
        } else if (s.coreml_progress === 3) {
            item.coreml = 3;
        }
        webnn.push(item);
    }
    return webnn;
}