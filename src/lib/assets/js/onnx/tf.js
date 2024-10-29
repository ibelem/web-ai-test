
// Experimental

import * as base from './base.js';
import * as protobuf from './protobuf.js';
import * as zip from './zip.js';

const tf = {};

tf.ModelFactory = class {

    match(context) {
        const identifier = context.identifier;
        const extension = identifier.split('.').pop().toLowerCase();
        if (extension === 'pbtxt' || extension === 'prototxt' || extension === 'pt' || extension === 'txt') {
            if (identifier.endsWith('predict_net.pbtxt') || identifier.endsWith('predict_net.prototxt') ||
                identifier.endsWith('init_net.pbtxt') || identifier.endsWith('init_net.prototxt')) {
                return;
            }
            const tags = context.tags('pbtxt');
            if (['input_stream', 'output_stream', 'input_side_packet', 'output_side_packet'].some((key) => tags.has(key) || tags.has(`node.${key}`))) {
                return;
            }
            if (tags.has('saved_model_schema_version') || tags.has('meta_graphs')) {
                context.type = 'tf.pbtxt.SavedModel';
                return;
            }
            if (tags.has('graph_def')) {
                context.type = 'tf.pbtxt.MetaGraphDef';
                return;
            }
            if (tags.has('node')) {
                context.type = 'tf.pbtxt.GraphDef';
                return;
            }
        }
        if (extension === 'pb' || extension === 'pbtxt' || extension === 'prototxt' || extension === 'graphdef' || extension === 'meta') {
            if (identifier.endsWith('predict_net.pb') || identifier.endsWith('init_net.pb')) {
                return;
            }
            if (identifier === 'tfhub_module.pb') {
                const stream = context.stream;
                const signature = [0x08, 0x03];
                if (signature.length === stream.length && stream.peek(signature.length).every((value, index) => value === signature[index])) {
                    return;
                }
            }
            const tags = context.tags('pb');
            if (tags.size > 0) {
                if (Array.from(tags).every(([key, value]) => key < 8 && value !== 5)) {
                    const match = (tags, schema) => {
                        for (const [key, inner] of schema) {
                            const value = tags[key];
                            if (value === undefined) {
                                continue;
                            }
                            if (inner === false) {
                                return false;
                            }
                            if (Array.isArray(inner)) {
                                if (typeof value !== 'object' || !match(value, inner)) {
                                    return false;
                                }
                            } else if (inner !== value) {
                                if (inner === 2 && !Array.isArray(value) && Object(value) === (value) && Object.keys(value).length === 0) {
                                    return true;
                                }
                                return false;
                            }
                        }
                        return true;
                    };
                    const signatureGraphDef = [
                        [1 /* node */, [
                            [1 /* name */, 2],
                            [2 /* op */, 2],
                            [3 /* input */, 2],
                            [4 /* device */,2],
                            [5 /* attr */, [
                                [1,2],
                                [2,[]]
                            ]],
                            [6 /* experimental_debug_info */, []]
                        ]],
                        [2 /* library */, []],
                        [3 /* version */, 0],
                        [4 /* versions */, [[1,0],[2,0]]]
                    ];
                    const signatureMetaGraphDef = [
                        [1 /* meta_info_def */, [[1,2],[2,[]],[3,[]],/* [4,2], */[6,2],[7,0],[8,[]]]],
                        [2 /* graph_def */, signatureGraphDef],
                        [3 /* saver_def */, [[1,2],[2,2],[3,2],[4,0],[5,0],[6,5],[7,0]]],
                        [4 /* collection_def */,[]],
                        [5 /* signature_def */, []],
                        [6 /* asset_file_def */, []],
                        [7 /* object_graph_def */, []]
                    ];
                    const signatureSavedModel = [[1,0],[2,signatureMetaGraphDef]];
                    // optimization_guide.proto.PageTopicsOverrideList
                    if (identifier === 'override_list.pb' && tags.size === 1 && tags.get(1) === 2) {
                        return;
                    }
                    if (tags.size === 1 && tags.get(1) === 2) {
                        const tags = context.tags('pb+');
                        // mediapipe.BoxDetectorIndex
                        if (match(tags, [[1,[[1,[[1,[[1,5],[2,5],[3,5],[4,5],[6,0],[7,5],[8,5],[10,5],[11,0],[12,0]]],[2,5],[3,[]]]],[2,false],[3,false],[4,false],[5,false]]],[2,false],[3,false]])) {
                            return;
                        }
                        // third_party.tensorflow.python.keras.protobuf.SavedMetadata
                        if (match(tags, [[1,[[1,[[1,0],[2,0]]],[2,0],[3,2],[4,2],[5,2]]]])) {
                            return;
                        }
                    }
                    if ((!tags.has(1) || tags.get(1) === 0) && tags.get(2) === 2) {
                        const tags = context.tags('pb+');
                        if (match(tags, signatureSavedModel)) {
                            context.type = 'tf.pb.SavedModel';
                            return;
                        }
                    }
                    if ((!tags.has(1) || tags.get(1) === 2) &&
                        (!tags.has(2) || tags.get(2) === 2) &&
                        (!tags.has(3) || tags.get(3) === 2) &&
                        (!tags.has(4) || tags.get(4) === 2)) {
                        const tags = context.tags('pb+');
                        if (match(tags, signatureMetaGraphDef)) {
                            context.type = 'tf.pb.MetaGraphDef';
                            return;
                        }
                    }
                    if (tags.get(1) !== 2) {
                        const tags = context.tags('pb+');
                        if (match(tags, signatureGraphDef)) {
                            context.type = 'tf.pb.GraphDef';
                            return;
                        }
                    }
                    // tensorflow.FingerprintDef
                    if (identifier === 'fingerprint.pb' &&
                        tags.get(1) === 0 && tags.get(2) === 0 &&
                        tags.get(3) === 0 && tags.get(5) === 0 && tags.get(6) === 2) {
                        context.type = 'tf.pb.FingerprintDef';
                        return;
                    }
                    const decode = (buffer, value) => {
                        try {
                            const reader = protobuf.BinaryReader.open(buffer);
                            const length = reader.length;
                            while (reader.position < length) {
                                const tag = reader.uint32();
                                const number = tag >>> 3;
                                const type = tag & 7;
                                if (value === number) {
                                    return type === 2 ? reader.bytes() : null;
                                }
                                reader.skipType(type);
                            }
                        } catch {
                            // continue regardless of error
                        }
                        return null;
                    };
                    const stream = context.stream;
                    const buffer = stream.peek();
                    const nodeBuffer = decode(buffer, 1);
                    if (nodeBuffer) {
                        const nameBuffer = decode(nodeBuffer, 1);
                        if (nameBuffer) {
                            const decoder = new TextDecoder('utf-8');
                            const name = decoder.decode(nameBuffer);
                            if (Array.from(name).filter((c) => c <= ' ').length < 256) {
                                context.type = 'tf.pb.GraphDef';
                                return;
                            }
                        }
                    }
                }
            } else {
                const tags = context.tags('pbtxt');
                if (['input_stream', 'output_stream', 'input_side_packet', 'output_side_packet'].some((key) => tags.has(key) || tags.has(`node.${key}`))) {
                    return;
                }
                if (tags.has('node')) {
                    context.type = 'tf.pbtxt.GraphDef';
                    return;
                }
                if (tags.has('graph_def')) {
                    context.type = 'tf.pbtxt.MetaGraphDef';
                    return;
                }
                if (tags.has('saved_model_schema_version') || tags.has('meta_graphs')) {
                    context.type = 'tf.pbtxt.SavedModel';
                    return;
                }
            }
        }
        if (extension === 'json') {
            for (const type of ['json', 'json.gz']) {
                const obj = context.peek(type);
                if (obj && obj.modelTopology && (obj.format === 'graph-model' || Array.isArray(obj.modelTopology.node))) {
                    context.type = `tf.${type}`;
                    return;
                }
            }
        }
        if (extension === 'index' || extension === 'ckpt') {
            const stream = context.stream;
            if (stream.length > 8) {
                stream.seek(-8);
                const buffer = stream.read(8);
                stream.seek(0);
                const signature = [0x57, 0xfb, 0x80, 0x8b, 0x24, 0x75, 0x47, 0xdb];
                if (buffer.every((value, index) => value === signature[index])) {
                    context.type = 'tf.bundle';
                    return;
                }
            }
        }
        if (/.data-[0-9][0-9][0-9][0-9][0-9]-of-[0-9][0-9][0-9][0-9][0-9]$/.exec(identifier)) {
            context.type = 'tf.data';
            return;
        }
        if (/^events.out.tfevents./.exec(identifier)) {
            const stream = context.stream;
            if (tf.EventFileReader.open(stream)) {
                context.type = 'tf.events';
                return;
            }
        }
        if (extension === 'pbmm') {
            const stream = context.stream;
            if (stream.length > 8) {
                stream.seek(-8);
                const buffer = stream.read(8);
                stream.seek(0);
                const reader = base.BinaryReader.open(buffer);
                const offset = reader.uint64().toNumber();
                if (offset < stream.length) {
                    context.type = 'tf.pb.mmap';
                }
            }
        }
    }

    filter(context, type) {
        return context.type !== 'tf.bundle' || type !== 'tf.data';
    }

    async open(context) {
        tf.proto = await context.require('./tf-proto');
        const openModel = async (saved_model, format, producer, bundle) => {
            const metadata = await context.metadata('tf-metadata.json');
            return new tf.Model(metadata, saved_model, format, producer, bundle);
        };
        const openSavedModel = async (context, saved_model, format, producer) => {
            if (format === '') {
                format = 'TensorFlow Saved Model';
                if (saved_model && saved_model.saved_model_schema_version) {
                    format = `${format} v${saved_model.saved_model_schema_version}`;
                }
            }
            if (saved_model.meta_graphs.length === 1 &&
                saved_model.meta_graphs[0].object_graph_def &&
                saved_model.meta_graphs[0].object_graph_def.nodes &&
                saved_model.meta_graphs[0].object_graph_def.nodes.length > 0) {
                const identifier = 'variables/variables.index';
                try {
                    const content = await context.fetch(identifier);
                    const stream = content.stream;
                    const bundle = await tf.TensorBundle.open(stream, identifier, context);
                    return openModel(saved_model, format, producer, bundle);
                } catch {
                    return openModel(saved_model, format, producer, null);
                }
            }
            if (saved_model && Array.isArray(saved_model.meta_graphs) && saved_model.meta_graphs.length > 0 &&
                saved_model.meta_graphs[0].meta_info_def &&
                Object.prototype.hasOwnProperty.call(saved_model.meta_graphs[0].meta_info_def, 'tensorflow_version')) {
                producer = `TensorFlow v${saved_model.meta_graphs[0].meta_info_def.tensorflow_version}`;
            }
            return openModel(saved_model, format, producer, null);
        };
        const openBundle = async (context, stream, identifier) => {
            stream = stream || context.stream;
            identifier = identifier || context.identifier;
            try {
                const bundle = await tf.TensorBundle.open(stream, identifier, context);
                return openModel(null, `TensorFlow Tensor Bundle v${bundle.format}`, null, bundle);
            } catch (error) {
                context.error(error, false);
                throw error;
            }
        };
        const openData = async (context) => {
            const identifier = context.identifier;
            const base = identifier.split('.');
            base.pop();
            const file = `${base.join('.')}.index`;
            try {
                const content = await context.fetch(file);
                const stream = content.stream;
                return openBundle(context, stream, file);
            } catch {
                const file = `${base.join('.')}.ckpt`;
                const content = await context.fetch(file);
                const stream = content.stream;
                return openBundle(context, stream, file);
            }
        };
        const openEventFile = async (context) => {
            let format = 'TensorFlow Event File';
            let producer = null;
            const stream = context.stream;
            const eventFileReader = tf.EventFileReader.open(stream);
            const saved_model = new tf.proto.tensorflow.SavedModel();
            const run_metadata = [];
            const summaries = [];
            for (;;) {
                const event = eventFileReader.read();
                if (!event) {
                    break;
                }
                switch (event.what) {
                    case 'file_version': {
                        const formats = new Map([
                            ['brain.Event:1', 'TensorFlow Event File v1'],
                            ['brain.Event:2', 'TensorFlow Event File v2']
                        ]);
                        if (!formats.has(event.file_version)) {
                            throw new tf.Error(`Unsupported event file version '${event.file_version}'.`);
                        }
                        format = formats.get(event.file_version);
                        break;
                    }
                    case 'graph_def': {
                        const buffer = event.graph_def;
                        const reader = protobuf.BinaryReader.open(buffer);
                        const graph_def = tf.proto.tensorflow.GraphDef.decode(reader);
                        const meta_graph_def = new tf.proto.tensorflow.MetaGraphDef();
                        meta_graph_def.meta_info_def = new tf.proto.tensorflow.MetaGraphDef.MetaInfoDef();
                        meta_graph_def.meta_info_def.any_info = event.wall_time.toString();
                        meta_graph_def.graph_def = graph_def;
                        saved_model.meta_graphs.push(meta_graph_def);
                        break;
                    }
                    case 'meta_graph_def': {
                        const buffer = event.meta_graph_def;
                        const reader = protobuf.BinaryReader.open(buffer);
                        const meta_graph_def = tf.proto.tensorflow.MetaGraphDef.decode(reader);
                        saved_model.meta_graphs.push(meta_graph_def);
                        break;
                    }
                    case 'summary': {
                        for (const value of event.summary.value) {
                            summaries.push(value);
                        }
                        break;
                    }
                    case 'tagged_run_metadata': {
                        const entry = event.tagged_run_metadata;
                        const buffer = entry.run_metadata;
                        const reader = protobuf.BinaryReader.open(buffer);
                        const metadata = tf.proto.tensorflow.RunMetadata.decode(reader);
                        run_metadata.push(metadata);
                        break;
                    }
                    default: {
                        throw new tf.Error(`Unsupported event type '${event.what}'.`);
                    }
                }
            }
            if (saved_model.meta_graphs.every((meta_graph) => meta_graph.graph_def.node.every((node) => node.op.startsWith('aten::') || node.op.startsWith('prim::') || node.op.startsWith('quantized::') || node.op === 'IO Node'))) {
                producer = 'PyTorch';
                const openPyTorchMetadata = async (context, saved_model) => {
                    try {
                        const pytorch = await context.require('./pytorch');
                        const python = await context.require('./python');
                        const metadata = await pytorch.Metadata.open(context);
                        const execution = new python.Execution();
                        metadata.register(execution);
                        const torch = execution.register('torch');
                        for (const graph of saved_model.meta_graphs) {
                            for (const node of graph.graph_def.node) {
                                const schemas = torch._C._jit_get_schemas_for_operator(node.op);
                                if (Array.isArray(schemas) && schemas.length > 0) {
                                    node.__metadata__ = schemas;
                                    node.__torch__ = torch;
                                }
                            }
                        }
                    } catch {
                        // continue regardless of error
                    }
                    return saved_model;
                };
                const updated_saved_model = await openPyTorchMetadata(context, saved_model);
                return openModel(updated_saved_model, format, producer, null);
            }
            return openSavedModel(context, saved_model, format, producer);
        };
        const openJson = async (context, type) => {
            try {
                const obj = context.peek(type);
                const format = `TensorFlow.js ${obj.format || 'graph-model'}`;
                const producer = obj.convertedBy || obj.generatedBy || '';
                const meta_graph = new tf.proto.tensorflow.MetaGraphDef();
                meta_graph.graph_def = tf.JsonReader.decodeGraphDef(obj.modelTopology);
                const saved_model = new tf.proto.tensorflow.SavedModel();
                saved_model.meta_graphs.push(meta_graph);
                const nodes = new Map();
                for (const node of meta_graph.graph_def.node) {
                    node.input = node.input || [];
                    if (node.op === 'Const') {
                        nodes.set(node.name, node);
                    }
                }
                const shards = new Map();
                const manifests = Array.isArray(obj.weightsManifest) ? obj.weightsManifest : [];
                for (const manifest of manifests) {
                    for (const path of manifest.paths) {
                        if (!shards.has(path)) {
                            shards.set(path, context.fetch(path));
                        }
                    }
                }
                const openShards = (shards) => {
                    const dtype_size_map = new Map([
                        ['float16', 2], ['float32', 4], ['float64', 8],
                        ['int8', 1], ['int16', 2], ['int32', 4], ['int64', 8],
                        ['uint8', 1], ['uint16', 2], ['uint32', 4], ['uint64', 8],
                        ['bool', 1]
                    ]);
                    for (const manifest of manifests) {
                        let buffer = null;
                        if (Array.isArray(manifest.paths) && manifest.paths.length > 0 && manifest.paths.every((path) => shards.has(path))) {
                            const list = manifest.paths.map((path) => shards.get(path));
                            const size = list.reduce((a, b) => a + b.length, 0);
                            buffer = new Uint8Array(size);
                            let offset = 0;
                            for (const item of list) {
                                buffer.set(item, offset);
                                offset += item.length;
                            }
                        }
                        let offset = 0;
                        for (const weight of manifest.weights) {
                            const dtype = weight.quantization && weight.quantization.dtype ? weight.quantization.dtype : weight.dtype;
                            const size = weight.shape.reduce((a, b) => a * b, 1);
                            switch (dtype) {
                                case 'string': {
                                    const data = [];
                                    if (buffer && size > 0) {
                                        const reader = new tf.BinaryReader(buffer.subarray(offset));
                                        for (let i = 0; i < size; i++) {
                                            data[i] = reader.string();
                                        }
                                        offset += reader.position;
                                    }
                                    if (nodes.has(weight.name)) {
                                        const node = nodes.get(weight.name);
                                        node.attr.value.tensor.dtype = tf.Utility.dataTypeKey(dtype);
                                        node.attr.value.tensor.string_val = data;
                                    }
                                    break;
                                }
                                default: {
                                    if (!dtype_size_map.has(dtype)) {
                                        throw new tf.Error(`Unsupported weight data type size '${dtype}'.`);
                                    }
                                    const itemsize = dtype_size_map.get(dtype);
                                    const length = itemsize * size;
                                    const tensor_content = buffer ? buffer.slice(offset, offset + length) : null;
                                    offset += length;
                                    if (nodes.has(weight.name)) {
                                        const node = nodes.get(weight.name);
                                        node.attr.value.tensor.dtype = tf.Utility.dataTypeKey(dtype);
                                        node.attr.value.tensor.tensor_content = tensor_content;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    return openSavedModel(context, saved_model, format, producer);
                };
                try {
                    const contexts = await Promise.all(shards.values());
                    for (const key of shards.keys()) {
                        const context = contexts.shift();
                        const buffer = context.stream.peek();
                        shards.set(key, buffer);
                    }
                    if (type === 'json.gz') {
                        try {
                            for (const key of shards.keys()) {
                                const stream = shards.get(key);
                                const archive = zip.Archive.open(stream, 'gzip');
                                if (archive && archive.entries.size === 1) {
                                    const stream = archive.entries.values().next().value;
                                    const buffer = stream.peek();
                                    shards.set(key, buffer);
                                }
                            }
                        } catch {
                            // continue regardless of error
                        }
                    }
                    return openShards(shards);
                } catch {
                    shards.clear();
                    return openShards(shards);
                }
            } catch (error) {
                throw new tf.Error(`File text format is not TensorFlow.js graph-model (${error.message}).`);
            }
        };
        const openTextGraphDef = (context) => {
            try {
                const reader = context.read('protobuf.text');
                const graph_def = tf.proto.tensorflow.GraphDef.decodeText(reader);
                const meta_graph = new tf.proto.tensorflow.MetaGraphDef();
                meta_graph.graph_def = graph_def;
                const saved_model = new tf.proto.tensorflow.SavedModel();
                saved_model.meta_graphs.push(meta_graph);
                const format = 'TensorFlow Graph';
                return openSavedModel(context, saved_model, format, null);
            } catch (error) {
                const message = error && error.message ? error.message : error.toString();
                throw new tf.Error(`File text format is not tensorflow.GraphDef (${message.replace(/\.$/, '')}).`);
            }
        };
        const openTextMetaGraphDef = (context) => {
            try {
                const reader = context.read('protobuf.text');
                const meta_graph = tf.proto.tensorflow.MetaGraphDef.decodeText(reader);
                const saved_model = new tf.proto.tensorflow.SavedModel();
                saved_model.meta_graphs.push(meta_graph);
                const format = 'TensorFlow MetaGraph';
                return openSavedModel(context, saved_model, format, null);
            } catch (error) {
                throw new tf.Error(`File text format is not tensorflow.MetaGraphDef (${error.message}).`);
            }
        };
        const openTextSavedModel = (context) => {
            try {
                const reader = context.read('protobuf.text');
                return tf.proto.tensorflow.SavedModel.decodeText(reader);
            } catch (error) {
                throw new tf.Error(`File text format is not tensorflow.SavedModel (${error.message}).`);
            }
        };
        const openBinaryGraphDef = (context) => {
            let saved_model = null;
            const format = 'TensorFlow Graph';
            try {
                const reader = context.read('protobuf.binary');
                const graph_def = tf.proto.tensorflow.GraphDef.decode(reader);
                const meta_graph = new tf.proto.tensorflow.MetaGraphDef();
                meta_graph.graph_def = graph_def;
                saved_model = new tf.proto.tensorflow.SavedModel();
                saved_model.meta_graphs.push(meta_graph);
            } catch (error) {
                const message = error && error.message ? error.message : error.toString();
                throw new tf.Error(`File format is not tensorflow.GraphDef (${message.replace(/\.$/, '')}).`);
            }
            return openSavedModel(context, saved_model, format, null);
        };
        const openBinaryMetaGraphDef = (context) => {
            let saved_model = null;
            const format = 'TensorFlow MetaGraph';
            try {
                const reader = context.read('protobuf.binary');
                const meta_graph = tf.proto.tensorflow.MetaGraphDef.decode(reader);
                saved_model = new tf.proto.tensorflow.SavedModel();
                saved_model.meta_graphs.push(meta_graph);
            } catch (error) {
                const message = error && error.message ? error.message : error.toString();
                throw new tf.Error(`File format is not tensorflow.MetaGraphDef (${message.replace(/\.$/, '')}).`);
            }
            return openSavedModel(context, saved_model, format, null);
        };
        const openBinarySavedModel = (context) => {
            try {
                const reader = context.read('protobuf.binary');
                return tf.proto.tensorflow.SavedModel.decode(reader);
            } catch (error) {
                const message = error && error.message ? error.message : error.toString();
                throw new tf.Error(`File format is not tensorflow.SavedModel (${message.replace(/\.$/, '')}).`);
            }
        };
        const openFingerprint = async (context) => {
            let format = '';
            let saved_model = null;
            try {
                const identifier = 'saved_model.pb';
                const content = await context.fetch(identifier);
                saved_model = openBinarySavedModel(content);

            } catch {
                format = 'TensorFlow Fingerprint';
                saved_model = new tf.proto.tensorflow.SavedModel();
            }
            const reader = context.read('protobuf.binary');
            saved_model.fingerprint = tf.proto.tensorflow.FingerprintDef.decode(reader);
            return openSavedModel(context, saved_model, format, null);
        };
        const openMemmapped = (context) => {
            const stream = context.stream;
            const readDirectoryOffset = (stream) => {
                stream.seek(-8);
                stream = stream.stream(8);
                const reader = base.BinaryReader.open(stream);
                return reader.uint64().toNumber();
            };
            const readDirectory = (stream, offset) => {
                const end = stream.position - 8;
                stream.seek(offset);
                stream = stream.stream(end - offset);
                const reader = protobuf.BinaryReader.open(stream);
                return tf.proto.tensorflow.MemmappedFileSystemDirectory.decode(reader);
            };
            const offset = readDirectoryOffset(stream);
            const directory = readDirectory(stream, offset);
            const elements = new Map();
            for (const element of directory.element) {
                const name = element.name;
                if (elements.has(name)) {
                    throw new tf.Error(`Memory mapped file directory contains duplicate '${name}'.`);
                }
                elements.set(name, {
                    offset: typeof element.offset === 'bigint' ? Number(element.offset) : element.offset,
                    length: typeof element.length === 'bigint' ? Number(element.length) : element.length
                });
            }
            const offsets = Array.from(elements).map(([, value]) => value.offset);
            offsets.push(offset);
            for (const value of elements.values()) {
                if (value.length === 0) {
                    const min = Math.min.apply(null, offsets.filter((offset) => offset > value.offset));
                    if (Number.isInteger(min)) {
                        value.length = min - value.offset;
                    }
                }
            }
            for (const [, value] of elements) {
                const offset = value.offset;
                const length = value.length;
                stream.seek(offset);
                value.buffer = stream.read(length);
            }
            if (!elements.has('memmapped_package://.')) {
                throw new tf.Error('Memory mapped file directory does not contain tensorflow.GraphDef root.');
            }
            const element = elements.get('memmapped_package://.');
            const buffer = element.buffer;
            const reader = protobuf.BinaryReader.open(buffer);
            const graph_def = tf.proto.tensorflow.GraphDef.decode(reader);
            const format = 'TensorFlow GraphDef Memmapped';
            const meta_graph = new tf.proto.tensorflow.MetaGraphDef();
            meta_graph.graph_def = graph_def;
            const saved_model = new tf.proto.tensorflow.SavedModel();
            saved_model.meta_graphs.push(meta_graph);
            return openSavedModel(context, saved_model, format, null);
        };
        switch (context.type) {
            case 'tf.bundle':
                return openBundle(context);
            case 'tf.data':
                return openData(context);
            case 'tf.events':
                return openEventFile(context);
            case 'tf.json':
                return openJson(context, 'json');
            case 'tf.json.gz':
                return openJson(context, 'json.gz');
            case 'tf.pbtxt.GraphDef':
                return openTextGraphDef(context);
            case 'tf.pbtxt.MetaGraphDef':
                return openTextMetaGraphDef(context);
            case 'tf.pbtxt.SavedModel':
                return openSavedModel(context, openTextSavedModel(context), '', null);
            case 'tf.pb.GraphDef':
                return openBinaryGraphDef(context);
            case 'tf.pb.MetaGraphDef':
                return openBinaryMetaGraphDef(context);
            case 'tf.pb.SavedModel':
                return openSavedModel(context, openBinarySavedModel(context), '', null);
            case 'tf.pb.FingerprintDef':
                return openFingerprint(context);
            case 'tf.pb.mmap':
                return openMemmapped(context);
            default:
                throw new tf.Error(`Unsupported TensorFlow format '${context.type}'.`);
        }
    }
};

tf.Model = class {

    constructor(metadata, model, format, producer, bundle) {
        this.format = format;
        this.producer = producer || '';
        this.graphs = [];
        if (model) {
            for (let i = 0; i < model.meta_graphs.length; i++) {
                const meta_graph = model.meta_graphs[i];
                let name = '';
                if (meta_graph.meta_info_def && meta_graph.meta_info_def.any_info) {
                    name = meta_graph.meta_info_def.any_info.toString();
                } else if (model.meta_graphs.length > 1) {
                    name = i.toString();
                }
                const graph = new tf.Graph(metadata, meta_graph, name, bundle);
                this.graphs.push(graph);
            }
        } else {
            const graph = new tf.Graph(metadata, null, '', bundle);
            this.graphs.push(graph);
        }
    }
};

tf.Graph = class {

    constructor(metadata, meta_graph, name, bundle) {
        this.name = name;
        this.nodes = [];
        this.inputs = [];
        this.outputs = [];
        this.signatures = [];
        this.version = null;
        this.groups = false;
        if (meta_graph && meta_graph.graph_def) {
            const graph = meta_graph.graph_def;
            if (graph.versions) {
                this.version = `v${graph.versions.producer}`;
            } else if (graph.version) {
                this.version = graph.version;
            } else if (meta_graph.meta_info_def && meta_graph.meta_info_def.tensorflow_version) {
                this.version = meta_graph.meta_info_def.tensorflow_version;
            }
            if (meta_graph.meta_info_def && meta_graph.meta_info_def.tags) {
                this.tags = meta_graph.meta_info_def.tags.join(', ');
            }
            const output_arg_map = new Map();
            metadata = new tf.GraphMetadata(metadata, graph.library);
            const context = new tf.Context();
            for (const [key, signature_def] of Object.entries(meta_graph.signature_def)) {
                const inputs = [];
                for (const [key, tensor] of Object.entries(signature_def.inputs)) {
                    const type = new tf.TensorType(tensor.dtype, tensor.tensor_shape);
                    const name = tensor.name.replace(/:0$/, '');
                    const value = context.value(name, type);
                    const argument = new tf.Argument(key, [value]);
                    inputs.push(argument);
                }
                const outputs = [];
                for (const [key, tensor] of Object.entries(signature_def.outputs)) {
                    const type = new tf.TensorType(tensor.dtype, tensor.tensor_shape);
                    const name = tensor.name.replace(/:0$/, '');
                    const value = context.value(name, type);
                    const argument = new tf.Argument(key, [value]);
                    outputs.push(argument);
                    output_arg_map.set(name, key);
                }
                const signature = new tf.Signature(key, inputs, outputs);
                this.signatures.push(signature);
            }
            const nodes = graph.node || [];
            context.graph(metadata, nodes, output_arg_map);
            this.nodes = context.nodes;
            this.inputs = context.inputs;
            this.outputs = context.outputs;
        } else if (bundle) {
            const nodes = new Map();
            for (const tensor of bundle.tensors) {
                const parts = tensor.name.split('/');
                if (bundle.format === 2) {
                    if (tensor.name === '_CHECKPOINTABLE_OBJECT_GRAPH' ||
                        tensor.name.startsWith('optimizer/') ||
                        tensor.name.startsWith('keras_api/metrics/') ||
                        tensor.name.endsWith('/ExponentialMovingAverage') ||
                        tensor.name.indexOf('.OPTIMIZER_SLOT') !== -1) {
                        continue;
                    }
                    if (tensor.name.endsWith('/.ATTRIBUTES/VARIABLE_VALUE')) {
                        parts.pop();
                        parts.pop();
                    }
                }
                const tensorName = parts.pop();
                const name = parts.join('/');
                if (!nodes.has(name)) {
                    nodes.set(name, []);
                }
                nodes.get(name).push({ name: tensorName, value: tensor });
            }
            const namespaces = new Set();
            this.nodes = Array.from(nodes).map(([name, value]) => {
                const node = { op: 'Node', name };
                return new tf.Node(metadata, node, namespaces, new tf.Context(), value);
            });
        }
    }
};

tf.Signature = class {

    constructor(name, inputs, outputs) {
        this.name = name;
        this.inputs = inputs;
        this.outputs = outputs;
    }
};

tf.Argument = class {

    constructor(name, value, type, visible) {
        this.name = name;
        this.value = value;
        this.type = type || null;
        this.visible = visible !== false;
    }
};

tf.Value = class {

    constructor(name, type, initializer) {
        if (typeof name !== 'string') {
            throw new tf.Error(`Invalid value identifier '${JSON.stringify(name)}'.`);
        }
        this.name = name;
        this.type = !type && initializer ? initializer.type : type;
        this.initializer = initializer || null;
    }
};

tf.Function = class {

    constructor(metadata, name, func) {
        this.type = 'function';
        this.name = name;
        this.version = null;
        this.tags = null;
        this.nodes = [];
        this.inputs = [];
        this.outputs = [];
        this.description = func ? null : 'Function definition not found.';
        this.groups = false;
        const context = new tf.Context();
        const input_arg = func && func.signature ? func.signature.input_arg : [];
        const output_arg = func && func.signature ? func.signature.output_arg : [];
        const ret = func && func.ret ? func.ret : {};
        const nodes = func && func.node_def ? func.node_def : [];
        if (input_arg) {
            for (const input of input_arg) {
                const value = context.value(input.name, new tf.TensorType(input.type, null), null);
                const argument = new tf.Argument(input.name, [value]);
                this.inputs.push(argument);
            }
        }
        const output_arg_map = new Map();
        if (output_arg) {
            const ret_map = new Map();
            for (const key of Object.keys(ret)) {
                const value = func.ret[key];
                const split = value.split(':', 2);
                ret_map.set(key, split[0]);
            }
            for (const output of output_arg) {
                const name = ret_map.get(output.name);
                const type = new tf.TensorType(output.type, null);
                const value = context.value(name, type, null);
                const argument = new tf.Argument(output.name, [value]);
                this.outputs.push(argument);
                output_arg_map.set(name, output.name);
            }
        }
        context.graph(metadata, nodes, output_arg_map);
        this.nodes = context.nodes;
    }
};

tf.Node = class {

    constructor(metadata, node, namespaces, context, tensors) {
        this.type = node.metadata || metadata.type(node.op) || { name: node.op };
        this.name = node.name;
        this.attributes = [];
        this.inputs = [];
        this.outputs = [];
        this.group = '';
        if (node.name) {
            if (namespaces.has(node.name)) {
                this.group = node.name;
            } else {
                const index = node.name.lastIndexOf('/');
                if (index !== -1) {
                    const namespace = node.name.substring(0, index);
                    if (namespaces.has(namespace)) {
                        this.group = namespace;
                    }
                }
            }
        }
        if (tensors) {
            for (const tensor of tensors) {
                const value = context.value(tensor.value.name, null, tensor.value);
                const argument = new tf.Argument(tensor.name, [value]);
                this.inputs.push(argument);
            }
        } else {
            if (node.device !== undefined) {
                this.device = node.device;
            }
            if (node.attr) {
                this.attributes = Object.entries(node.attr).map(([name, obj]) => {
                    const schema = obj && obj.metadata ? obj.metadata : metadata.attribute(node.op, name);
                    let value = null;
                    let type = schema && schema.type ? schema.type : null;
                    let visible = metadata.visible(node.op, name);
                    switch (obj.value) {
                        case undefined:
                            type = '';
                            value = null;
                            break;
                        case 'type':
                            type = 'type';
                            value = tf.Utility.dataType(obj.type);
                            break;
                        case 'i':
                            value = obj.i;
                            break;
                        case 'f':
                            value = obj.f;
                            break;
                        case 'b':
                            value = obj.b;
                            break;
                        case 'shape':
                            type = 'shape';
                            value = new tf.TensorShape(obj.shape);
                            break;
                        case 's':
                            value = tf.Utility.decodeText(obj.s);
                            break;
                        case 'tensor': {
                            type = 'tensor';
                            value = new tf.Tensor(obj.tensor);
                            break;
                        }
                        case 'func': {
                            type = 'function';
                            value = new tf.Node(metadata, { op: obj.func.name, attr: obj.func.attr }, null, new tf.Context());
                            break;
                        }
                        case 'placeholder': {
                            type = 'placeholder';
                            value = obj;
                            break;
                        }
                        case 'list': {
                            const list = obj.list;
                            if (list.s && list.s.length > 0) {
                                value = list.s.map((s) => tf.Utility.decodeText(s));
                            } else if (list.i && list.i.length > 0) {
                                value = list.i;
                            } else if (list.f && list.f.length > 0) {
                                value = list.f;
                            } else if (list.type && list.type.length > 0) {
                                type = 'type[]';
                                value = list.type.map((type) => tf.Utility.dataType(type));
                            } else if (list.shape && list.shape.length > 0) {
                                type = 'shape[]';
                                value = list.shape.map((shape) => new tf.TensorShape(shape));
                            } else if (list.func && list.func.length > 0) {
                                type = 'function[]';
                                value = list.func.map((func) => new tf.Node(metadata, { op: func.name, attr: func.attr }));
                            } else {
                                value = [];
                            }
                            break;
                        }
                        default: {
                            throw new tf.Error(`Unsupported attribute value type '${JSON.stringify(value).substring(0, 32)}'.`);
                        }
                    }
                    if (schema) {
                        if (schema.visible === false) {
                            visible = false;
                        } else if (schema.default !== undefined) {
                            const equals = (value, defaultValue) => {
                                if (!Array.isArray(defaultValue) && defaultValue === Object(defaultValue)) {
                                    switch (defaultValue.type) {
                                        case 'type':
                                            defaultValue = tf.Utility.dataType(defaultValue.value);
                                            break;
                                        case 'shape':
                                        case 'tensor':
                                            defaultValue = defaultValue.value;
                                            break;
                                        default:
                                            throw new tf.Error(JSON.stringify(defaultValue));
                                    }
                                }
                                if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
                                    return value === defaultValue;
                                }
                                if (typeof value === 'bigint') {
                                    return Number(value) === defaultValue;
                                }
                                return false;
                            };
                            const defaultValue = schema.default;
                            if (Array.isArray(value) && Array.isArray(defaultValue)) {
                                if (value.length === defaultValue.length && value.every((item, index) => equals(item, defaultValue[index]))) {
                                    visible = false;
                                }
                            } else if (equals(value, defaultValue)) {
                                visible = false;
                            }
                        }
                    }
                    if (name === '_class' || name === '_output_shapes' || visible === false) {
                        visible = false;
                    }
                    return new tf.Argument(name, value, type, visible);
                });
            }
            let inputIndex = 0;
            const inputs = (node.input || []).filter((input) => !input.name.startsWith('^'));
            if (this.type && this.type.inputs) {
                for (const input of this.type.inputs) {
                    let count = 1;
                    if (input.numberAttr) {
                        const inputNumber = node.attr[input.numberAttr];
                        if (inputNumber && inputNumber.i) {
                            count = Number(inputNumber.i);
                        }
                    } else if (input.typeListAttr) {
                        const inputTypeListAttr = node.attr[input.typeListAttr];
                        if (inputTypeListAttr && inputTypeListAttr.list && inputTypeListAttr.list.type) {
                            count = inputTypeListAttr.list.type.length;
                        }
                    }
                    const values = inputs.slice(inputIndex, inputIndex + count).map((input) => context.value(input.name, null, null));
                    const argument = new tf.Argument(input.name, values);
                    this.inputs.push(argument);
                    inputIndex += count;
                }
            }
            this.inputs.push(...inputs.slice(inputIndex).map((input, index) => {
                const name = input.label ? input.label : (inputIndex + index).toString();
                return new tf.Argument(name, [context.value(input.name)]);
            }));
            let outputIndex = 0;
            const outputs = node.output || [];
            if (this.type && this.type.outputs) {
                for (const output of this.type.outputs) {
                    let count = 1;
                    if (output.numberAttr) {
                        const outputNumber = node.attr[output.numberAttr];
                        if (outputNumber && outputNumber.i) {
                            count = Number(outputNumber.i);
                        }
                    } else if (output.typeListAttr) {
                        const outputTypeListAttr = node.attr[output.typeListAttr];
                        if (outputTypeListAttr && outputTypeListAttr.list && outputTypeListAttr.list.type) {
                            count = outputTypeListAttr.list.type.length;
                        }
                    }
                    const values = outputs.slice(outputIndex, outputIndex + count).map((output) => {
                        return context.value(output.name ? output.name : '-', null, null);
                    });
                    const name = output.name ? output.name : `output${this.outputs.length === 0 ? '' : this.outputs.length}`;
                    const argument = new tf.Argument(name, values);
                    this.outputs.push(argument);
                    outputIndex += count;
                }
            }
            this.outputs.push(...outputs.slice(outputIndex).map((output, index) => {
                const name = (outputIndex + index).toString();
                const value = context.value(output.name ? output.name : '-', null, null);
                return new tf.Argument(name, [value]);
            }));
            const controlDependencies = node.controlDependencies || [];
            this.controlDependencies = controlDependencies.map((input) => context.value(input.name));
        }
    }
};

tf.Tensor = class {

    constructor(tensor, name, category) {
        this.name = name;
        this.category = category || null;
        if (tensor) {
            this.type = new tf.TensorType(tensor.dtype, tensor.tensor_shape || tensor.tensorShape);
            this._tensor = tensor;
            if (Object.prototype.hasOwnProperty.call(tensor, 'tensor_content')) {
                this._values = tensor.tensor_content;
                this.encoding = '<';
            } else {
                const DataType = tf.proto.tensorflow.DataType;
                switch (tensor.dtype) {
                    case DataType.DT_INVALID: {
                        break;
                    }
                    case DataType.DT_BFLOAT16: {
                        const values = tensor.half_val || [];
                        this._values = new Uint8Array(values.length << 2);
                        const view = new DataView(this._values.buffer, this._values.byteOffset, this._values.byteLength);
                        for (let i = 0; i < values.length; i++) {
                            view.setUint32(i << 2, values[i] << 16, true);
                        }
                        this.encoding = '<';
                        break;
                    }
                    case DataType.DT_HALF: {
                        const values = tensor.half_val || [];
                        this._values = new Uint8Array(values.length << 1);
                        const view = new DataView(this._values.buffer, this._values.byteOffset, this._values.byteLength);
                        for (let i = 0; i < values.length; i++) {
                            view.setUint16(i << 1, values[i], true);
                        }
                        this.encoding = '<';
                        break;
                    }
                    case DataType.DT_FLOAT: {
                        this._values = tensor.float_val || null;
                        this.encoding = '|';
                        break;
                    }
                    case DataType.DT_DOUBLE: {
                        this._values = tensor.double_val || null;
                        this.encoding = '|';
                        break;
                    }
                    case DataType.DT_UINT8:
                    case DataType.DT_UINT16:
                    case DataType.DT_INT8:
                    case DataType.DT_INT16:
                    case DataType.DT_INT32: {
                        this._values = tensor.int_val || null;
                        this.encoding = '|';
                        break;
                    }
                    case DataType.DT_UINT32: {
                        this._values = tensor.uint32_val || null;
                        this.encoding = '|';
                        break;
                    }
                    case DataType.DT_INT64: {
                        this._values = tensor.int64_val || null;
                        this.encoding = '|';
                        break;
                    }
                    case DataType.DT_UINT64: {
                        this._values = tensor.uint64_val || null;
                        this.encoding = '|';
                        break;
                    }
                    case DataType.DT_BOOL: {
                        this._values = tensor.bool_val || null;
                        this.encoding = '|';
                        break;
                    }
                    case DataType.DT_STRING: {
                        this._values = tensor.string_val || null;
                        this.encoding = '|';
                        break;
                    }
                    case DataType.DT_COMPLEX64: {
                        const values = tensor.scomplex_val || null;
                        this._values = new Array(values.length >> 1);
                        for (let i = 0; i < values.length; i += 2) {
                            this._values[i >> 1] = new base.Complex64(values[i], values[i + 1]);
                        }
                        this.encoding = '|';
                        break;
                    }
                    case DataType.DT_COMPLEX128: {
                        const values = tensor.dcomplex_val || null;
                        this._values = new Array(values.length >> 1);
                        for (let i = 0; i < values.length; i += 2) {
                            this._values[i >> 1] = new base.Complex128(values[i], values[i + 1]);
                        }
                        this.encoding = '|';
                        break;
                    }
                    default: {
                        throw new tf.Error(`Unsupported tensor data type '${tensor.dtype}'.`);
                    }
                }
            }
        } else {
            this.type = new tf.TensorType('?', null);
            this._tensor = null;
        }
    }

    get values() {
        let values = this._values;
        if (this.encoding === '|' && Array.isArray(values)) {
            if (this.type.dataType === 'string') {
                values = values.map((value) => tf.Utility.decodeText(value));
            }
            const shape = (this._tensor.tensor_shape || this._tensor.tensorShape).dim.map((dim) => dim.size);
            const size = shape.reduce((a, b) => a * Number(b), 1);
            if (values.length === 1 && size > 1) {
                values = new Array(size).fill(values[0]);
            }
        }
        return values;
    }
};

tf.TensorType = class {

    constructor(dtype, shape) {
        this.dataType = dtype ? tf.Utility.dataType(dtype) : '?';
        this.shape = new tf.TensorShape(shape);
    }

    equals(obj) {
        return obj && this.dataType === obj.dataType && this.shape.equals(obj.shape);
    }

    toString() {
        return this.dataType + this.shape.toString();
    }
};

tf.TensorShape = class {

    constructor(shape) {
        this.dimensions = null;
        if (shape) {
            if (shape.unknown_rank) {
                this.dimensions = null;
            } else if (Array.isArray(shape.dim)) {
                if (shape.dim.length === 0) {
                    this.dimensions = [];
                } else if (shape.dim.length === 1 && !shape.dim[0].size) {
                    this.dimensions = [0];
                } else {
                    this.dimensions = shape.dim.map((dim) => {
                        const size = dim.size && dim.size.toNumber ? dim.size.toNumber() : dim.size;
                        return size && size !== -1 ? size : '?';
                    });
                }
            }
        }
    }

    equals(obj) {
        return (this.dimensions === null && obj.dimensions === null) || (Array.isArray(this.dimensions) && Array.isArray(obj.dimensions) && this.dimensions.length === obj.dimensions.length && this.dimensions.every((value, index) => obj.dimensions[index] === value));
    }

    toString() {
        if (this.dimensions === null) {
            return '[?]';
        }
        if (this.dimensions.length === 0) {
            return '';
        }
        return `[${this.dimensions.map((dim) => (dim && dim !== -1) ? dim.toString() : '?').join(',')}]`;
    }
};

tf.TensorBundle = class {

    static async open(stream, identifier, context) {
        const format = identifier.toLowerCase().endsWith('.index') ? 2 : 1;
        const table = new tf.TensorBundle.Table(stream);
        if (!table.entries.has('')) {
            throw new tf.Error('Bundle header not available.');
        }
        if (format === 1) {
            return new tf.TensorBundle(format, table.entries, []);
        }
        const buffer = table.entries.get('');
        const reader = protobuf.BinaryReader.open(buffer);
        const header = tf.proto.tensorflow.BundleHeaderProto.decode(reader);
        const numShards = header.num_shards;
        const promises = [];
        for (let i = 0; i < numShards; i++) {
            const shardIndex = (`0000${i}`).slice(-5);
            const shardCount = (`0000${numShards}`).slice(-5);
            const filename = identifier.split('.');
            filename.pop();
            const basename = filename.join('.');
            const name = `${basename}.data-${shardIndex}-of-${shardCount}`;
            promises.push(context.fetch(name));
        }
        try {
            const contexts = await Promise.all(promises);
            const streams = contexts.map((context) => context.stream);
            return new tf.TensorBundle(format, table.entries, streams);
        } catch (error) {
            context.error(error, false);
            return new tf.TensorBundle(format, table.entries, null);
        }
    }

    constructor(format, entries, streams) {
        this.format = format;
        this.tensors = [];
        switch (format) {
            case 1: {
                const buffer = entries.get('');
                const reader = protobuf.BinaryReader.open(buffer);
                const header = tf.proto.tensorflow.SavedTensorSlices.decode(reader);
                const data = new Map();
                for (const [name, buffer] of entries) {
                    if (name !== '' && name !== 'global_step') {
                        const reader = protobuf.BinaryReader.open(buffer);
                        const slices = tf.proto.tensorflow.SavedTensorSlices.decode(reader);
                        const name = slices.data.name;
                        const tensor = slices.data.data;
                        if (data.has(name)) {
                            const item = data.get(name);
                            if (item !== null) {
                                if (tensor[item.key] && tensor[item.key].length > 0) {
                                    item.value = item.value.concat(tensor[item.key]);
                                } else {
                                    data.set(name, null);
                                }
                            }
                        } else if (tensor.tensor_content && tensor.tensor_content.length > 0) {
                            data.set(name, { key: 'tensor_content', value: tensor.tensor_content });
                        } else {
                            const keys = Object.keys(tensor).filter((key) => key.endsWith('_val') && tensor[key] && tensor[key].length > 0);
                            data.set(name, keys.length === 1 ? { key: keys[0], value: tensor[keys[0]] } : null);
                        }
                    }
                }
                for (const meta of header.meta.tensor) {
                    if (meta.name !== 'global_step') {
                        const tensor = new tf.proto.tensorflow.TensorProto();
                        tensor.dtype = meta.type;
                        tensor.tensor_shape = meta.shape;
                        const item = data.get(meta.name);
                        if (item) {
                            tensor[item.key] = item.value;
                        }
                        this.tensors.push(new tf.Tensor(tensor, meta.name, null));
                    }
                }
                break;
            }
            case 2: {
                entries.forEach((buffer, name) => {
                    if (name !== '') {
                        const reader = protobuf.BinaryReader.open(buffer);
                        const entry = tf.proto.tensorflow.BundleEntryProto.decode(reader);
                        const tensor = new tf.proto.tensorflow.TensorProto();
                        tensor.dtype = entry.dtype;
                        tensor.tensor_shape = entry.shape;
                        const offset = typeof entry.offset === 'bigint' ? Number(entry.offset) : entry.offset;
                        const size = typeof entry.size === 'bigint' ? Number(entry.size) : entry.size;
                        if (streams) {
                            const stream = streams[entry.shard_id];
                            stream.seek(offset);
                            tensor.tensor_content = stream.peek(size);
                        }
                        this.tensors.push(new tf.Tensor(tensor, name, null));
                    }
                });
                break;
            }
            default: {
                throw new tf.Error(`Unsupported Tensor Bundle format '${format}'.`);
            }
        }
    }
};

tf.TensorBundle.Table = class {

    constructor(stream) {
        // https://github.com/tensorflow/tensorflow/blob/master/tensorflow/core/lib/io/table.cc
        this.entries = new Map();
        if (stream.length <= 54) {
            throw new tf.Error('Invalid index file size.');
        }
        stream.seek(-48);
        const buffer = stream.peek(48);
        const reader = new tf.BinaryReader(buffer);
        reader.seek(-8);
        const signature = [0x57, 0xfb, 0x80, 0x8b, 0x24, 0x75, 0x47, 0xdb];
        if (!reader.read(8).every((value, index) => value === signature[index])) {
            throw new tf.Error('Invalid table signature.');
        }
        reader.seek(-48); // kEncodedLength
        reader.varint64(); // metaindex offset
        reader.varint64(); // metaindex size
        const indexOffset = reader.varint64();
        const indexSize = reader.varint64();
        const indexBlock = new tf.TensorBundle.Table.Block(stream, indexOffset, indexSize);
        for (const [, value] of indexBlock.entries) {
            const valueReader = new tf.BinaryReader(value);
            const offset = valueReader.varint64();
            const size = valueReader.varint64();
            const block = new tf.TensorBundle.Table.Block(stream, offset, size);
            for (const [name, value] of block.entries) {
                this.entries.set(name, value);
            }
        }
        stream.seek(0);
    }
};

tf.TensorBundle.Table.Block = class {

    constructor(stream, offset, size) {
        // https://github.com/tensorflow/tensorflow/blob/master/tensorflow/core/lib/io/block.cc
        this.entries = new Map();
        stream.seek(offset);
        const buffer = stream.read(size); // blockContents
        const [compression] = stream.read(1);
        stream.skip(4); // crc32
        let reader = new tf.BinaryReader(buffer);
        switch (compression) {
            case 0: // kNoCompression
                break;
            case 1: // kSnappyCompression
                reader = new tf.BinaryReader(reader.unsnappy());
                break;
            default:
                throw new tf.Error(`Unsupported block compression '${compression}'.`);
        }
        reader.seek(-4);
        const numRestarts = reader.int32();
        reader.seek(-4 - (4 * numRestarts));
        const restartOffsets = [];
        for (let i = 0; i < numRestarts; i++) {
            restartOffsets.push(reader.int32());
        }
        const decoder = new TextDecoder();
        for (let i = 0; i < numRestarts; i++) {
            reader.seek(restartOffsets[i]);
            let key = '';
            while (reader.position < reader.length) {
                const sharedSize = reader.varint32(); // index shared size
                const nonSharedSize = reader.varint32(); // index non shared size
                const valueSize = reader.varint32();
                if (sharedSize === 0 && nonSharedSize === 0 && valueSize === 0) {
                    break;
                }
                key = key.substring(0, sharedSize);
                key += decoder.decode(reader.read(nonSharedSize));
                const value = reader.read(valueSize);
                this.entries.set(key, value);
            }
        }
    }
};

tf.BinaryReader = class {

    constructor(buffer) {
        this._reader = base.BinaryReader.open(buffer);
        this._decoder = new TextDecoder('utf-8');
    }

    get length() {
        return this._reader.length;
    }

    get position() {
        return this._reader.position;
    }

    seek(position) {
        this._reader.seek(position);
    }

    read(length) {
        return this._reader.read(length);
    }

    byte() {
        return this._reader.byte();
    }

    int32() {
        return this._reader.int32();
    }

    uint32() {
        return this._reader.uint32();
    }

    string() {
        const size = this.uint32();
        const buffer = this.read(size);
        return this._decoder.decode(buffer);
    }

    varint32() {
        return this.varint64();
    }

    varint64() {
        let result = 0;
        for (let shift = 0; shift <= 63; shift += 7) {
            const byte = this.byte();
            if (byte & 128) {
                result |= (byte & 127) << shift;
            } else {
                result |= byte << shift;
                break;
            }
        }
        return result;
    }

    unsnappy() {
        const data = new Uint8Array(this.varint64());
        const mask = [0, 0xff, 0xffff, 0xffffff, 0xffffffff];
        let position = 0;
        while (this._position < this._length) {
            let length = 0;
            const c = this.byte();
            switch (c & 0x03) {
                case 0: {
                    length = (c >>> 2) + 1;
                    if (length > 60) {
                        const short = length - 60;
                        length = (this.uint32() & mask[short]) + 1;
                        this._position += short - 4;
                    }
                    data.set(this.read(length), position);
                    break;
                }
                case 1: {
                    length = ((c >>> 2) & 0x07) + 4;
                    const offset = this.byte() + ((c >>> 5) << 8);
                    data.set(data.subarray(position - offset, position - offset + length), position);
                    break;
                }
                case 2: {
                    length = (c >>> 2) + 1;
                    const offset = this.uint16();
                    data.set(data.subarray(position - offset, position - offset + length), position);
                    break;
                }
                case 3: {
                    length = (c >>> 2) + 1;
                    const offset = this.uint32();
                    data.set(data.subarray(position - offset, position - offset + length), position);
                    break;
                }
                default: {
                    break;
                }
            }
            position += length;
        }
        return data;
    }
};

tf.EventFileReader = class {

    static open(stream) {
        if (stream.length < 16) {
            return null;
        }
        const masked_crc32c = (bytes) => {
            const poly = 0x82f63b78;
            let crc = 0xffffffff;
            for (let n = 0; n < bytes.length; n++) {
                crc ^= bytes[n];
                crc = crc & 1 ? (crc >>> 1) ^ poly : crc >>> 1;
                crc = crc & 1 ? (crc >>> 1) ^ poly : crc >>> 1;
                crc = crc & 1 ? (crc >>> 1) ^ poly : crc >>> 1;
                crc = crc & 1 ? (crc >>> 1) ^ poly : crc >>> 1;
                crc = crc & 1 ? (crc >>> 1) ^ poly : crc >>> 1;
                crc = crc & 1 ? (crc >>> 1) ^ poly : crc >>> 1;
                crc = crc & 1 ? (crc >>> 1) ^ poly : crc >>> 1;
                crc = crc & 1 ? (crc >>> 1) ^ poly : crc >>> 1;
                crc >>>= 0;
            }
            crc ^= 0xffffffff;
            crc >>>= 0;
            crc = ((crc >> 15) | (crc << 17)) + 0xa282ead8;
            crc >>>= 0;
            return crc;
        };
        const buffer = stream.peek(12);
        const reader = new tf.BinaryReader(buffer);
        const length_bytes = reader.read(8);
        const length_crc = reader.uint32();
        if (masked_crc32c(length_bytes) !== length_crc) {
            return null;
        }
        return new tf.EventFileReader(stream);
    }

    constructor(stream) {
        this._stream = stream;
    }

    read() {
        if (this._stream.position < this._stream.length) {
            const uint64 = (stream) => {
                const buffer = stream.read(8);
                const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
                const value = view.getBigUint64(0, true);
                return value.toNumber();
            };
            const length = uint64(this._stream);
            this._stream.skip(4); // masked crc of length
            const buffer = this._stream.read(length);
            const reader = protobuf.BinaryReader.open(buffer);
            const event = tf.proto.tensorflow.Event.decode(reader);
            this._stream.skip(4); // masked crc of data
            return event;
        }
        return null;
    }
};

tf.GraphMetadata = class {

    constructor(metadata, library) {
        this._metadata = metadata;
        this._functions = new Map();
        this._attributes = new Map();
        this._visibleCache = new Map();

        if (library && Array.isArray(library.function)) {
            for (const func of library.function) {
                const name = func.signature.name;
                if (this._functions.has(func.name)) {
                    throw new tf.Error(`Duplicate function name '${func.name}'.`);
                }
                this._functions.set(name, func);
            }
        }
    }

    type(name) {
        if (this._functions.has(name)) {
            const func = this._functions.get(name);
            if (func instanceof tf.Function) {
                return func;
            }
            this._functions.set(name, new tf.Function(this, func.signature.name, func));
            return this._functions.get(name);
        }
        const type = this._metadata.type(name);
        if (!type) {
            this._functions.set(name, new tf.Function(this, name, null));
            return this._functions.get(name);
        }
        return type;
    }

    attribute(type, name) {
        const key = `${type}::${name}`;
        if (!this._attributes.has(key)) {
            const schema = this.type(type);
            if (schema && schema.attributes) {
                for (const attribute of schema.attributes) {
                    const key = `${type}::${attribute.name}`;
                    this._attributes.set(key, attribute);
                }
            }
        }
        return this._attributes.get(key);
    }

    visible(type, name) {
        if (!this._visibleCache.has(type)) {
            const set = new Set();
            const schema = this.type(type);
            if (schema && schema.inputs) {
                for (const input of schema.inputs) {
                    if (input.typeAttr) {
                        set.add(input.typeAttr);
                    } else if (input.typeListAttr) {
                        set.add(input.typeListAttr);
                    }
                    if (input.numberAttr) {
                        set.add(input.numberAttr);
                    }
                }
            }
            if (schema && schema.outputs) {
                for (const output of schema.outputs) {
                    if (output.typeAttr) {
                        set.add(output.typeAttr);
                    } else if (output.typeListAttr) {
                        set.add(output.typeListAttr);
                    }
                    if (output.numberAttr) {
                        set.add(output.numberAttr);
                    }
                }
            }
            this._visibleCache.set(type, set);
        }
        return !this._visibleCache.get(type).has(name);
    }
};

tf.Context = class {

    constructor() {
        this._values = new Map();
        this.signatures = [];
        this.nodes = [];
    }

    value(name, type, tensor) {
        if (name.length === 0 && tensor) {
            return new tf.Value(name, type || null, tensor);
        }
        if (!this._values.has(name)) {
            this._values.set(name, new tf.Value(name, type || null, tensor || null));
        } else if ((type && !type.equals(this._values.get(name).type)) || tensor) {
            throw new tf.Error(`Duplicate value '${name}'.`);
        }
        return this._values.get(name);
    }

    graph(metadata, nodes, output_arg_map) {
        const namespaces = new Set();
        nodes = new Map(nodes.map((node) => [node.name, node]));
        this.inputs = [];
        this.outputs = [];
        for (const [name, node] of nodes) {
            if (node.op !== 'Const') {
                const index = name.lastIndexOf('/');
                if (index !== -1) {
                    const namespace = name.substring(0, index);
                    namespaces.add(namespace);
                }
            }
            node.output = [];
        }
        const node_output = (input) => {
            const parts = input.split(':', 3);
            let [name] = parts;
            const index = parts.length === 1 ? 0 : parseInt(parts.pop(), 10);
            const control = name.startsWith('^');
            name = control ? name.substring(1) : name;
            const from = nodes.get(name);
            if (from) {
                for (let i = from.output.length; i <= index; i++) {
                    const key = i === 0 ? from.name : `${from.name}:${i}`;
                    const value = { name: key, to: [] };
                    from.output.push(value);
                }
            }
            const key = index === 0 ? name : `${name}:${index}`;
            return [key, index, control, from];
        };
        for (const node of nodes.values()) {
            const inputs = node.input;
            node.input = [];
            node.controlDependencies = [];
            for (const input of inputs) {
                const [key, index, control, from] = node_output(input);
                if (from) {
                    from.output[index].to.push(node);
                }
                const value = { name: key, from };
                if (control) {
                    node.controlDependencies.push(value);
                } else {
                    node.input.push(value);
                }
            }
        }
        if (output_arg_map) {
            for (const [name, node] of nodes) {
                if (output_arg_map.has(name)) {
                    node.output.push({ name, to: [] });
                }
            }
        }
        const map_tensor = (name, node, kind) => {
            if (node && node.op === 'Const' && node.input.length === 0 && node.output.length === 1 && node.output[0].to.length === 1 && node.controlDependencies.length === 0) {
                const value = node.attr.value;
                if (value && Object.prototype.hasOwnProperty.call(value, 'tensor')) {
                    const tensor = new tf.Tensor(value.tensor, name, kind);
                    return this.value(name, tensor.type, tensor);
                }
            }
            return null;
        };
        const map_resource = (name, node, tensor) => {
            if (node && node.op === 'Placeholder' && node.input.length === 0 && node.output.length === 1 && node.controlDependencies.length === 0) {
                const dtype = node.attr.dtype.type;
                if (dtype === tf.proto.tensorflow.DataType.DT_RESOURCE) {
                    return this.value(name, null, tensor);
                }
            }
            return null;
        };
        for (const node of nodes.values()) {
            if (node.op === 'Identity' && node.input.length === 1 && node.output.length === 1 && node.output[0].to.length === 1 && node.controlDependencies.length === 0) {
                const initializer = map_tensor(node.name, node.input[0].from, 'Identity Constant');
                if (initializer) {
                    nodes.delete(initializer.name);
                    nodes.delete(node.input[0].name);
                }
                const identity = node.input[0].from;
                if (identity && identity.op === 'Identity' && identity.input.length === 1 && identity.output.length === 1 && node.output[0].to.length === 1 && node.controlDependencies.length === 0) {
                    const initializer = map_tensor(node.name, identity.input[0].from, 'Identity Constant');
                    if (initializer) {
                        nodes.delete(initializer.name);
                        nodes.delete(initializer.name);
                        nodes.delete(identity.name);
                        nodes.delete(node.name);
                    }
                }
            }
        }
        for (const node of nodes.values()) {
            const initializer = map_tensor(node.name, node, 'Const');
            if (initializer) {
                nodes.delete(node.name);
                nodes.delete(initializer.name);
            }
        }
        for (const node of nodes.values()) {
            if (node.op === 'ReadVariableOp' && node.input.length === 1 && node.output.length === 1 && node.output[0].to.length === 1 && node.controlDependencies.length === 0) {
                if (node.attr && node.attr.dtype && node.attr._output_shapes && node.attr._output_shapes.list && node.attr._output_shapes.list.shape) {
                    const tensor = new tf.proto.tensorflow.TensorProto();
                    tensor.dtype = node.attr.dtype.type;
                    /* eslint-disable prefer-destructuring */
                    tensor.tensor_shape = node.attr._output_shapes.list.shape[0];
                    /* eslint-enable prefer-destructuring */
                    const name = node.name;
                    const initializer = map_resource(name, node.input[0].from,  new tf.Tensor(tensor, name, 'Resource Variable'));
                    if (initializer) {
                        nodes.delete(initializer.name);
                        nodes.delete(node.input[0].name);
                    }
                }
            }
        }
        const inputs = new Map();
        for (const [name, node] of nodes) {
            if (node.op === 'Placeholder' && node.attr && node.attr.dtype && Number.isInteger(node.attr.dtype.type) &&
                node.attr._output_shapes && node.attr._output_shapes.list && Array.isArray(node.attr._output_shapes.list.shape) && node.attr._output_shapes.list.shape.length > 0 &&
                node.input.length === 0 && node.output.length === 1 && node.controlDependencies.length === 0) {
                const type = new tf.TensorType(node.attr.dtype.type, node.attr._output_shapes.list.shape[0]);
                const value = this.value(name, type, null);
                const argument = new tf.Argument(name, [value]);
                inputs.set(name, argument);
                nodes.delete(name);
            }
        }
        const updateTorchScript = (nodes) => {
            for (const node of nodes.values()) {
                if (node.op === 'prim::Constant' && node.input.length === 0 && node.controlDependencies.length === 0 && node.attr && Object.keys(node.attr).length === 1 && node.attr.attr && node.attr.attr.s) {
                    const value = tf.Utility.decodeText(node.attr.attr.s);
                    const match = /{\s*value\s*:\s*(.*)\s*}/.exec(value);
                    if (match) {
                        node.value = match[1].trim();
                    }
                    const empty = /{\s*}/.exec(value);
                    if (empty) {
                        node.value = null;
                    }
                }
                if (node.op === 'prim::GetAttr' && node.input.length === 1 && node.controlDependencies.length === 0 && node.attr && Object.keys(node.attr).length === 1 && node.attr.attr && node.attr.attr.s) {
                    const value = tf.Utility.decodeText(node.attr.attr.s);
                    const match = /{\s*name\s*:\s*([A-Za-z0-9_]*)\s*}/.exec(value);
                    if (match) {
                        node.value = match[1].trim();
                    }
                }
                if (node.op === 'IO Node' && node.controlDependencies.length === 0) {
                    const shape = node.attr && node.attr._output_shapes && node.attr._output_shapes.list && node.attr._output_shapes.list.shape ? node.attr._output_shapes.list.shape[0] : null;
                    const type = shape ? new tf.TensorType('?', shape) : null;
                    if (node.input.length === 0 && node.output.length === 1) {
                        const argument = new tf.Argument(node.name, [this.value(node.output[0].name, type, null)]);
                        this.inputs.push(argument);
                        nodes.delete(node.name);
                    }
                    if (node.input.length === 1 && node.output.length === 0) {
                        const argument = new tf.Argument(node.name, [this.value(node.input[0].name, type, null)]);
                        this.outputs.push(argument);
                        nodes.delete(node.name);
                    }
                }
                if (Object.keys(node.attr).length === 2 &&
                    node.attr.attr && node.attr.attr.s && node.attr._output_shapes) {
                    const value = tf.Utility.decodeText(node.attr.attr.s);
                    if (/\s*/.exec(value) || /{\s*}/.exec(value)) {
                        node.attr = {};
                        delete node._output_shapes;
                    }
                }
            }
            const remove_input = (input, node) => {
                const from = input.from;
                if (from) {
                    for (const output of from.output) {
                        output.to = output.to.filter((to) => to !== node);
                    }
                    if (from.output.every((output) => output.to.length === 0) && from.controlDependencies.length === 0) {
                        from.remove = true;
                    }
                    delete input.from;
                }
            };
            for (const node of nodes.values()) {
                if (node.op === 'prim::ListConstruct' && node.input.every((input) => input.from.value !== undefined) && node.controlDependencies.length === 0) {
                    node.value = node.input.map((input) => input.from.value);
                    for (const input of node.input) {
                        remove_input(input, node);
                    }
                    node.input = [];
                }
            }
            for (const node of nodes.values()) {
                const remove = new Set();
                for (let i = 0; i < node.input.length; i++) {
                    const input = node.input[i];
                    const from = input.from;
                    if (from) {
                        if (from.op === 'prim::GetAttr' && from.input.length === 1 && from.output.length === 1 && from.controlDependencies.length === 0 && from.value !== undefined) {
                            remove_input(input, node);
                            input.label = from.value;
                            const tensor = new tf.Tensor(null, input.name, from.op);
                            this.value(input.name, null, tensor);
                        }
                        if (from.op === 'prim::Constant' && from.input.length === 0 && from.controlDependencies.length === 0 && from.value !== undefined) {
                            input.constant = from.value;
                            remove_input(input, node);
                            remove.add(input.name);
                        }
                        if (from.op === 'prim::ListConstruct' && from.output.length === 1 && from.controlDependencies.length === 0 && from.value !== undefined) {
                            input.list = from.value;
                            remove_input(input, node);
                            remove.add(input.name);
                        }
                    }
                }
                if (node.__metadata__) {
                    const torch = node.__torch__;
                    const match = (node, schema) => {
                        const args = schema.arguments || [];
                        const inputs = node.input || [];
                        if (inputs.length > args.length) {
                            return false;
                        }
                        for (let i = 0; i < inputs.length; i++) {
                            const input = inputs[i];
                            const arg = args[i];
                            let type = arg.real_type;
                            type = type instanceof torch.OptionalType ? type.getElementType() : type;
                            switch (type.str()) {
                                case 'Tensor': {
                                    if ((input.constant === undefined && input.list === undefined) || input.constant === null) {
                                        continue;
                                    }
                                    break;
                                }
                                case 'int':
                                case 'SymInt': {
                                    if (input.constant !== undefined &&
                                        Number.isInteger(parseInt(input.constant, 10))) {
                                        continue;
                                    }
                                    break;
                                }
                                case 'float': {
                                    if (input.constant !== undefined && !isNaN(parseFloat(input.constant))) {
                                        continue;
                                    }
                                    break;
                                }
                                case 'int[]':
                                case 'int[2]':
                                case 'SymInt[]':
                                case 'SymInt[2]': {
                                    if (Array.isArray(input.list)) {
                                        const list = input.list.map((item) => parseInt(item, 10));
                                        if (list.every((value) => Number.isInteger(value))) {
                                            continue;
                                        }
                                    }
                                    break;
                                }
                                case 'bool': {
                                    if (input.constant === 'false' ||
                                        input.constant === 'true' ||
                                        input.constant === '0' ||
                                        input.constant === '1') {
                                        continue;
                                    }
                                    break;
                                }
                                case 'Scalar': {
                                    if (input.constant !== undefined &&
                                        Number.isInteger(parseInt(input.constant, 10))) {
                                        continue;
                                    }
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                            return false;
                        }
                        return true;
                    };
                    const schema = node.__metadata__.find((schema) => match(node, schema));
                    if (schema) {
                        const args = schema.arguments;
                        const inputs = node.input || [];
                        for (let i = 0; i < inputs.length; i++) {
                            const input = inputs[i];
                            delete input.metadata;
                            const arg = args[i];
                            let type = arg.real_type;
                            type = type instanceof torch.OptionalType ? type.getElementType() : type;
                            switch (type.str()) {
                                case 'Tensor': {
                                    input.metadata = arg;
                                    break;
                                }
                                case 'int':
                                case 'SymInt': {
                                    const value = parseInt(input.constant, 10);
                                    input.attr = new tf.proto.tensorflow.AttrValue();
                                    input.attr.i = value;
                                    input.attr.metadata = arg;
                                    break;
                                }
                                case 'float': {
                                    const value = parseFloat(input.constant, 10);
                                    input.attr = new tf.proto.tensorflow.AttrValue();
                                    input.attr.f = value;
                                    input.attr.metadata = arg;
                                    break;
                                }
                                case 'int[]':
                                case 'int[2]':
                                case 'SymInt[]':
                                case 'SymInt[2]': {
                                    const list = input.list.map((item) => parseInt(item, 10));
                                    input.attr = new tf.proto.tensorflow.AttrValue();
                                    input.attr.list = new tf.proto.tensorflow.ListValue();
                                    input.attr.list.i = list;
                                    input.attr.metadata = arg;
                                    break;
                                }
                                case 'bool': {
                                    input.attr = new tf.proto.tensorflow.AttrValue();
                                    input.attr.b = input.constant === 'true' || input.constant === '1';
                                    input.attr.metadata = arg;
                                    break;
                                }
                                case 'Scalar': {
                                    const value = parseInt(input.constant, 10);
                                    input.attr = new tf.proto.tensorflow.AttrValue();
                                    input.attr.i = value;
                                    input.attr.metadata = arg;
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        }
                        node.metadata = { ...schema };
                        node.metadata.name = node.op;
                    }
                }
                node.input = node.input.filter((input, index) => {
                    if (input.attr) {
                        const name = input.attr.metadata ? input.attr.metadata.name : index.toString();
                        node.attr[name] = input.attr;
                    } else if (input.constant !== undefined && input.constant !== null) {
                        const attr = new tf.proto.tensorflow.AttrValue();
                        attr.s = input.constant;
                        node.attr[index.toString()] = attr;
                    } else if (input.list !== undefined) {
                        const attr = new tf.proto.tensorflow.AttrValue();
                        attr.list = new tf.proto.tensorflow.ListValue();
                        attr.list.s = input.list;
                        node.attr[index.toString()] = attr;
                    }
                    return !remove.has(input.name);
                });
            }
            for (const node of nodes.values()) {
                if (node.op === 'prim::GetAttr' && node.remove) {
                    nodes.delete(node.name);
                }
                if (node.op === 'prim::Constant' && node.remove) {
                    nodes.delete(node.name);
                }
                if (node.op === 'prim::ListConstruct' && node.remove) {
                    nodes.delete(node.name);
                }
            }
        };
        updateTorchScript(nodes);
        for (const input of inputs.values()) {
            this.inputs.push(input);
        }
        for (const node of nodes.values()) {
            this.nodes.push(new tf.Node(metadata, node, namespaces, this));
        }
    }
};

tf.Utility = class {

    static decodeText(value) {
        if (typeof value === 'string') {
            return value;
        }
        if (value.length === 0) {
            return '';
        }
        tf.Utility._utf8Decoder = tf.Utility._utf8Decoder || new TextDecoder('utf-8');
        return tf.Utility._utf8Decoder.decode(value);
    }

    static dataType(type) {
        if (!tf.Utility._dataTypes) {
            const DataType = tf.proto.tensorflow.DataType;
            const dataTypes = new Map(Object.entries(DataType).map(([name, value]) => {
                const key = name.startsWith('DT_') ? name.substring(3) : name;
                return [value, key.toLowerCase()];
            }));
            dataTypes.set(DataType.DT_HALF, 'float16');
            dataTypes.set(DataType.DT_FLOAT, 'float32');
            dataTypes.set(DataType.DT_DOUBLE, 'float64');
            dataTypes.set(DataType.DT_BOOL, 'boolean');
            tf.Utility._dataTypes = dataTypes;
        }
        return tf.Utility._dataTypes.has(type) ? tf.Utility._dataTypes.get(type) : '?';
    }

    static dataTypeKey(type) {
        if (!tf.Utility._dataTypeKeys) {
            tf.Utility.dataType(0);
            tf.Utility._dataTypeKeys = new Map(Array.from(tf.Utility._dataTypes).map(([key, value]) => [value, key]));
        }
        return tf.Utility._dataTypeKeys.get(type);
    }
};

tf.JsonReader = class {

    static decodeGraphDef(json) {
        const message = new tf.proto.tensorflow.GraphDef();
        message.node = json.node.map((node) => tf.JsonReader.decodeNodeDef(node));
        message.library = tf.JsonReader.decodeFunctionDefLibrary(json.library);
        if (message.versions) {
            message.versions = tf.JsonReader.decodeVersionDef(json.versions);
        }
        return message;
    }

    static decodeNodeDef(json) {
        const message = new tf.proto.tensorflow.NodeDef();
        message.name = json.name;
        message.op = json.op;
        message.input = json.input || [];
        if (json.device) {
            message.device = json.device;
        }
        message.attr = {};
        if (json.attr) {
            for (const [name, value] of Object.entries(json.attr)) {
                message.attr[name] = tf.JsonReader.decodeAttrValue(value);
            }
        }
        return message;
    }

    static decodeAttrValue(json) {
        const message = new tf.proto.tensorflow.AttrValue();
        const keys = Object.keys(json);
        if (keys.length !== 1) {
            throw new tf.Error(`Unsupported JSON tensorflow.AttrValue '${JSON.stringify(keys)}'.`);
        }
        const [key] = keys;
        const value = json[key];
        switch (key) {
            case 'type':
                message.type = typeof value === 'number' ? value : tf.proto.tensorflow.DataType[value];
                break;
            case 'shape':
                message.shape = tf.JsonReader.decodeTensorShapeProto(value);
                break;
            case 'tensor':
                message.tensor = tf.JsonReader.decodeTensorProto(value);
                break;
            case 'b':
                message[key] = value;
                break;
            case 'f':
                message[key] = parseFloat(value);
                break;
            case 'i':
                message[key] = parseInt(value, 10);
                break;
            case 's':
                message[key] = typeof value === 'string' ? atob(value) : tf.Utility.decodeText(Uint8Array.from(value));
                break;
            case 'list':
                message.list = tf.JsonReader.decodeAttrValueListValue(json.list);
                break;
            case 'func':
                message[key] = value;
                break;
            default:
                throw new tf.Error(`Unsupported JSON 'tensorflow.AttrValue.${key}'.`);
        }
        return message;
    }

    static decodeAttrValueListValue(json) {
        const message = new tf.proto.tensorflow.AttrValue.ListValue();
        const entries = Object.entries(json);
        if (entries.length > 0) {
            const entry = entries.find(([, value]) => Array.isArray(value) && value.length > 0);
            if (!entry) {
                throw new tf.Error(`Unsupported JSON tensorflow.AttrValue.ListValue '${JSON.stringify(entries.map(([key]) => key))}'.`);
            }
            const [key, value] = entry;
            switch (key) {
                case 'i':
                    message[key] = value.map((value) => parseInt(value, 10));
                    break;
                case 's':
                    message[key] = value.map((value) => typeof value === 'string' ? atob(value) : tf.Utility.decodeText(Uint8Array.from(value)));
                    break;
                case 'type':
                    message[key] = value.map((value) => tf.proto.tensorflow.DataType[value]);
                    break;
                case 'shape':
                    message[key] = value.map((shape) => tf.JsonReader.decodeTensorShapeProto(shape));
                    break;
                default:
                    throw new tf.Error(`Unsupported JSON 'tensorflow.AttrValue.ListValue.${key}'.`);
            }
        }
        return message;
    }

    static decodeTensorProto(json) {
        const message = new tf.proto.tensorflow.TensorProto();
        message.dtype = tf.proto.tensorflow.DataType[json.dtype];
        message.tensor_shape = tf.JsonReader.decodeTensorShapeProto(json.tensorShape);
        return message;
    }

    static decodeTensorShapeProto(json) {
        const message = new tf.proto.tensorflow.TensorShapeProto();
        message.dim = (json.dim || []).map((json) => {
            const message = new tf.proto.tensorflow.TensorShapeProto.Dim();
            message.size = typeof json.size === 'string' ? parseInt(json.size, 10) : json.size;
            message.name = json.name;
            return message;
        });
        return message;
    }

    static decodeVersionDef(json) {
        const message = new tf.proto.tensorflow.VersionDef();
        message.producer = json.producer;
        message.min_consumer = json.min_consumer;
        message.bad_consumers = json.bad_consumers ? json.bad_consumers : [];
        return message;
    }

    static decodeFunctionDefLibrary(json) {
        const message = new tf.proto.tensorflow.FunctionDefLibrary();
        message.function = json ? (json.function || []).map((json) => tf.JsonReader.decodeFunctionDef(json)) : [];
        return message;
    }

    static decodeFunctionDef(json) {
        const message = new tf.proto.tensorflow.FunctionDef();
        message.signature = tf.JsonReader.decodeOpDef(json.signature);
        message.attr = {};
        if (json.attr) {
            for (const [name, value] of Object.entries(json.attr)) {
                message.attr[name] = tf.JsonReader.decodeAttrValue(value);
            }
        }
        message.nodeDef = (json.nodeDef || []).map((json) => tf.JsonReader.decodeNodeDef(json));
        message.ret = json.ret;
        message.control_ret = json.control_ret;
        return message;
    }

    static decodeOpDef(json) {
        const message = new tf.proto.tensorflow.OpDef();
        message.name = json.name;
        message.input_arg = json.inputArg.map((json) => tf.JsonReader.decodeArgDef(json));
        message.output_arg = json.outputArg.map((json) => tf.JsonReader.decodeArgDef(json));
        return message;
    }

    static decodeArgDef(json) {
        const message = new tf.proto.tensorflow.OpDef.ArgDef();
        message.name = json.name;
        message.description = json.decscription;
        return message;
    }
};

tf.Error = class extends Error {

    constructor(message) {
        super(message);
        this.name = 'Error loading TensorFlow model.';
    }
};

export const ModelFactory = tf.ModelFactory;
