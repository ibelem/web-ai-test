<script>
	// @ts-nocheck

	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
	import { customStore } from '$lib/store/store';
	// import TestQueue from './TestQueue.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import InferenceLog from '$lib/components/InferenceLog.svelte';
	import Results from '$lib/components/Results.svelte';
	import Environment from './Environment.svelte';
	import Info from './Info.svelte';
	import OnnxCustom from '$lib/components/svg/OnnxCustom.svelte';
	import {
		auto,
		resetResult,
		resetInfo,
		getDateTimeCustom,
		resetStore,
		updateStore,
		stringToArray,
		initResult,
		filterTestQueue,
		updateInfo
	} from '$lib/assets/js/utils';
	import * as BrowserHost from '$lib/assets/js/onnx/browser';
	// import { onnxGraph } from '$lib/assets/js/onnx/view';
	import * as View from '$lib/assets/js/onnx/view';
	import { runOnnx } from '$lib/assets/js/ort_utils_custom';
	import {
		autoStore,
		testQueueStore,
		backendsStore,
		modelDownloadProgressStore,
		testQueueLengthStore
	} from '$lib/store/store';
	import { page } from '$app/stores';

	let logShow = true;

	/**
	 * @type {string[]}
	 */
	let selectedBackends;
	backendsStore.subscribe((value) => {
		selectedBackends = value;
	});

	/**
	 * @type {string[]}
	 */
	let testQueue;
	testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	/**
	 * @type {number}
	 */
	export let testQueueLength;

	testQueueLengthStore.subscribe((value) => {
		testQueueLength = value;
	});

	/**
	 * @type {string}
	 */
	let dataType = 'fp32';

	/**
	 * @type {object{}}
	 */
	let custom;
	$: customStore.subscribe((value) => {
		custom = value;
	});

	let custominit = {
		id: '',
		filename: '',
		size: '',
		time: '',
		nodes: [],
		inputs: [],
		outputs: [],
		overrides: [],
		properties: [],
		metadata: []
	};

	const updateTestQueue = () => {
		/**
		 * @type {string[]}
		 */
		let testQueue = [];
		let i = 1;
		for (const b of selectedBackends) {
			// t = `${mt} ${m} ${dt} ${b}`;
			// testQueue.push(t);
			// Status: 0 Not selected, 1 Not started, 2 In testing, 3 Completed, 4 Fail or Error
			let t = {
				id: i,
				status: 1,
				model: id,
				modeltype: 'onnx',
				datatype: dataType,
				backend: b
			};
			testQueue.push(t);
			i++;
		}
		testQueueStore.update(() => testQueue);
		testQueueLengthStore.update(() => testQueue.length);
	};

	const urlToStore = (urlSearchParams, modelIdFromUrl, dataType) => {
		if (urlSearchParams.size > 0 && urlSearchParams.size != 1) {
			let modelType = urlSearchParams.get('modeltype');
			let backend = urlSearchParams.get('backend');
			let numOfRuns = urlSearchParams.get('run');
			let model = urlSearchParams.get('model');

			if (modelType.indexOf(',') > -1) {
				modelType = stringToArray(modelType);
			} else if (modelType.toLowerCase() === 'none') {
				modelType = [];
			} else if (modelType.toLowerCase() === 'all') {
				modelType = getUniqueModelTypes();
			} else {
				modelType = [modelType];
			}

			dataType = [dataType];

			if (backend.indexOf(',') > -1) {
				backend = stringToArray(backend);
			} else if (backend.toLowerCase() === 'none') {
				backend = [];
			} else if (backend.toLowerCase() === 'all') {
				backend = uniqueBackends;
			} else {
				backend = [backend];
			}

			if (model && model.indexOf(',') > -1) {
				model = stringToArray(model);
			} else if (model?.toLowerCase() === 'none') {
				model = [];
			} else if (model?.toLowerCase() === 'all') {
				model = getUniqueModels();
			} else {
				model = [model];
			}

			numOfRuns = parseInt(numOfRuns);

			if (!auto && numOfRuns > 500000 && location.pathname?.indexOf('run') > -1) {
				numOfRuns = 500000;
			}
			if (!auto && numOfRuns > 0 && numOfRuns <= 500000 && location.pathname?.indexOf('run') > -1) {
				numOfRuns = numOfRuns;
			} else if (numOfRuns < 1) {
				numOfRuns = 1;
			} else if (numOfRuns > 1000) {
				numOfRuns = 1000;
			}

			if (modelIdFromUrl) {
				updateStore(numOfRuns, backend, dataType, modelType, [modelIdFromUrl]);
			} else {
				updateStore(numOfRuns, backend, dataType, modelType, model);
			}

			// if (!auto) {
			//   updateTestQueue();
			// }

			if (modelType.length === 0 && dataType.length === 0 && backend.length === 0) {
				resetResult();
			}
		}
	};

	const runCustom = async () => {
		if (testQueue[0]) {
			let t0 = testQueue[0];
			let modelSize = size.toFixed(2) + ' MB';
			let r = {
				id: t0.id,
				model: t0.model,
				modeltype: t0.modeltype,
				datatype: t0.datatype,
				modelsize: modelSize
			};
			for (const prop of selectedBackends) {
				r[prop] = {
					status: 1,
					inference: [],
					compilation: null,
					warmup: null,
					timetofirstinference: null,
					inferencebest: null,
					inferencemedian: null,
					inferencethroughput: null,
					inferenceninety: null,
					inferenceaverage: null,
					error: null
				};
			}
			initResult(r);

			if (t0.modeltype === 'onnx') {
				// await runOnnx(1, id, 'onnx', 'fp32', size, 'webnn_gpu', buffer);
				await runOnnx(
					t0.id,
					t0.model,
					t0.modeltype,
					t0.datatype,
					modelSize,
					t0.backend,
					buffer,
					custom
				);
			}

			filterTestQueue(t0.id);
			runCustom();
		} else {
			updateInfo(`[${testQueueLength - testQueue.length}/${testQueueLength}] All tests completed`);
		}
	};

	const run = async () => {
		autoStore.update(() => false);
		updateTestQueue();
		resetResult();
		resetInfo();
		runCustom();
	};

	let statusCollapse;
	let map;
	const toggle = () => {
		if (statusCollapse.classList.contains('show')) {
			statusCollapse.removeAttribute('class');
			map.removeAttribute('class');
		} else {
			statusCollapse.setAttribute('class', 'show');
			map.setAttribute('class', 'none');
		}
	};

	/**
	 * @type {string}
	 */
	$: id = '';

	/**
	 * @type {string}
	 */
	$: fileName = '';

	/**
	 * @type {string}
	 */
	$: size = '';

	/**
	 * @type {string}
	 */
	$: time = '';

	$: loaded = false;

	const readFileAsArrayBuffer = (/** @type {Blob} */ file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = () => reject(reader.error);
			reader.readAsArrayBuffer(file);
		});
	};

	let bh, v;
	let openFile;
	let buffer = null;

	const handleFileInput = async (e) => {
		buffer = null;
		const file = e.target.files[0];
		// console.log(file);
		if (file) {
			loaded = true;
			fileName = file.name;
			size = file.size / (1024 * 1024);
			id = fileName.replaceAll(' ', '_').replaceAll('-', '_').replaceAll('.', '_').toLowerCase();
			try {
				const arrayBuffer = await readFileAsArrayBuffer(file);
				buffer = new Uint8Array(arrayBuffer);
				// const reader = protobuf.TextReader.open(buffer);
				// let tags = reader?.signature();
				// console.log(tags);

				custominit.id = id;
				custominit.filename = fileName;
				custominit.size = size;
				custominit.node_attributes_value_fp16 = false;
				custominit.time = getDateTimeCustom();
				customStore.update(() => custominit);
				await v.start();
				getTotalNodeCount();
				getDataType();
				initRun();
			} catch (error) {
				console.error('Error reading or parsing the file:', error);
			}
		}
	};

	if (custom && custom.overrides) {
		custom.overrides.forEach((override) => {
			if (override.value === null) {
				override.value = 0;
			}
		});
	}

	$: getDataType = () => {
		// Check if any input has datatype of float16
		const hasFloat16Input = custom.inputs.some((input) => input.datatype === 'float16');

		// List of quantized operation types
		const quantizedOps = [
			'QuantizeLinear',
			'DequantizeLinear',
			'DynamicQuantizeLinear',
			'MatMulInteger',
			'ConvInteger',
			'MatMulNBits',
			'QLinearAdd',
			'QLinearConv',
			'QLinearMatMul',
			'QLinearAveragePool',
			'QlinearGlobalAveragePool'
		];

		// Check if any node type is in the quantizedOps list
		const hasQuantizedOp = custom.nodes.some((node) => quantizedOps.includes(node.type));

		if (hasFloat16Input || custom.node_attributes_value_fp16) {
			dataType = 'fp16';
		} else if (hasQuantizedOp) {
			dataType = 'int8';
		} else {
			// If neither condition is met, return fp32
			dataType = 'fp32';
		}
		document.body.setAttribute('class', dataType);
	};

	const setOverrideValue = (name, value) => {
		let override = custom.overrides.find((override) => override.name === name);
		if (override) {
			override.value = value;
			customStore.update(() => custom);
		} else {
			console.log(`Override with name ${name} not found.`);
		}
	};

	const updateInputValue = () => {
		// Helper function to process a single dimension
		function processDimension(dim) {
			if (dim.includes('+')) {
				const baseName = dim.split(' + ')[0];
				const add1Name = baseName + '_add1';
				const add1Override = custom.overrides.find((o) => o.name === add1Name);
				return add1Override && add1Override.value !== null ? add1Override.value : dim;
			} else if (dim.includes('/')) {
				const baseName = dim.split(' / ')[0];
				const div2Name = baseName + '_div2';
				const div2Override = custom.overrides.find((o) => o.name === div2Name);
				return div2Override && div2Override.value !== null ? div2Override.value : dim;
			} else {
				const override = custom.overrides.find((o) => o.name === dim);
				return override && override.value !== null ? override.value : dim;
			}
		}

		['inputs', 'outputs'].forEach((io) => {
			custom[io].forEach((item) => {
				item.shapeDimensions = item.shapeDimensionsRaw.map((dim) => {
					if (typeof dim === 'string') {
						return processDimension(dim);
					}
					return dim;
				});
			});
		});
		customStore.update(() => custom);
	};

	const updateOverride = (override) => {
		let name = override.name;
		let value = override.value;
		if (value === '-') {
			return; // Keep the minus sign and exit the function
		}

		value = value.replace(/(?!^-)\D/g, '');
		value = parseInt(value, 10);

		if (!isNaN(value)) {
			// Ensure value is an integer between -1 and 10000
			value = Math.max(-1, Math.min(10000, Math.round(value)));

			// Find the index of the override with the given name
			const index = custom.overrides.findIndex((override) => override.name === name);
			if (index === -1) return; // If not found, exit the function

			// Update the value
			custom.overrides[index].value = value;

			// Handle special cases
			if (name.endsWith('_add1')) {
				const baseName = name.slice(0, -5);
				const baseIndex = custom.overrides.findIndex((override) => override.name === baseName);
				if (baseIndex !== -1) {
					custom.overrides[baseIndex].value = value - 1;
				}
			} else if (name.endsWith('_div2')) {
				const baseName = name.slice(0, -5);
				const baseIndex = custom.overrides.findIndex((override) => override.name === baseName);
				if (baseIndex !== -1) {
					custom.overrides[baseIndex].value = value * 2;
				}
			} else {
				const add1Name = `${name}_add1`;
				const add1Index = custom.overrides.findIndex((override) => override.name === add1Name);
				if (add1Index !== -1) {
					custom.overrides[add1Index].value = value + 1;
				}

				const div2Name = `${name}_div2`;
				const div2Index = custom.overrides.findIndex((override) => override.name === div2Name);
				if (div2Index !== -1) {
					custom.overrides[div2Index].value = Math.floor(value / 2);
				}
			}
		} else {
			const index = custom.overrides.findIndex((override) => override.name === name);
			if (index === -1) return; // If not found, exit the function

			// Update the value
			custom.overrides[index].value = null;

			// Handle special cases
			if (name.endsWith('_add1')) {
				const baseName = name.slice(0, -5);
				const baseIndex = custom.overrides.findIndex((override) => override.name === baseName);
				if (baseIndex !== -1) {
					custom.overrides[baseIndex].value = null;
				}
			} else if (name.endsWith('_div2')) {
				const baseName = name.slice(0, -5);
				const baseIndex = custom.overrides.findIndex((override) => override.name === baseName);
				if (baseIndex !== -1) {
					custom.overrides[baseIndex].value = null;
				}
			} else {
				const add1Name = `${name}_add1`;
				const add1Index = custom.overrides.findIndex((override) => override.name === add1Name);
				if (add1Index !== -1) {
					custom.overrides[add1Index].value = null;
				}

				const div2Name = `${name}_div2`;
				const div2Index = custom.overrides.findIndex((override) => override.name === div2Name);
				if (div2Index !== -1) {
					custom.overrides[div2Index].value = null;
				}
			}
		}

		customStore.update(() => custom);
		updateInputValue();
	};

	let nodeCount = 0;
	const getTotalNodeCount = () => {
		if (custom && custom.nodes.length > 0) {
			nodeCount = custom.nodes.reduce((acc, item) => acc + item.count, 0);
		} else {
		}
	};

	let ascending = true;
	const sortNodebyName = () => {
		custom.nodes.sort((a, b) => {
			if (a.type < b.type) return ascending ? -1 : 1;
			if (a.type > b.type) return ascending ? 1 : -1;
			return 0;
		});
		ascending = !ascending;
		customStore.update(() => custom);
	};

	let inputAscending = true;
	const sortInputsbyName = () => {
		custom.inputs.sort((a, b) => {
			// Regex to extract alphabetic part and numeric part
			const regex = /^([a-zA-Z_]+)(\d+)$/;
			
			// Apply regex to extract parts for both names
			const aMatch = a.name.match(regex);
			const bMatch = b.name.match(regex);

			if (aMatch && bMatch) {
				// Compare the alphabetic part first
				if (aMatch[1] < bMatch[1]) return inputAscending ? -1 : 1;
				if (aMatch[1] > bMatch[1]) return inputAscending ? 1 : -1;

				// If alphabetic parts are equal, compare the numeric part
				const aNum = parseInt(aMatch[2], 10);
				const bNum = parseInt(bMatch[2], 10);

				if (aNum < bNum) return inputAscending ? -1 : 1;
				if (aNum > bNum) return inputAscending ? 1 : -1;
			}

			// In case the regex doesn't match, do default string comparison
			return a.name < b.name ? (inputAscending ? -1 : 1) : (inputAscending ? 1 : -1);
		});
		inputAscending = !inputAscending;
		customStore.update(() => custom);
	};

	let outputAscending = true;
	const sortOutputsbyName = () => {
		custom.outputs.sort((a, b) => {
			// Regex to extract alphabetic part and numeric part
			const regex = /^([a-zA-Z_]+)(\d+)$/;
			
			// Apply regex to extract parts for both names
			const aMatch = a.name.match(regex);
			const bMatch = b.name.match(regex);

			if (aMatch && bMatch) {
				// Compare the alphabetic part first
				if (aMatch[1] < bMatch[1]) return outputAscending ? -1 : 1;
				if (aMatch[1] > bMatch[1]) return outputAscending ? 1 : -1;

				// If alphabetic parts are equal, compare the numeric part
				const aNum = parseInt(aMatch[2], 10);
				const bNum = parseInt(bMatch[2], 10);

				if (aNum < bNum) return outputAscending ? -1 : 1;
				if (aNum > bNum) return outputAscending ? 1 : -1;
			}

			// In case the regex doesn't match, do default string comparison
			return a.name < b.name ? (outputAscending ? -1 : 1) : (outputAscending ? 1 : -1);
		});
		outputAscending = !outputAscending;
		customStore.update(() => custom);
	};

	let descending = true;
	const sortNodebyCount = () => {
		custom.nodes.sort((a, b) => {
			return descending ? a.count - b.count : b.count - a.count;
		});
		descending = !descending;
		customStore.update(() => custom);
	};

	const copyPlain = async () => {
		let plain = '';
		custom.inputs.forEach((input) => {
			let i = `${input.name}\t\t${input.datatype}\t\t[${input.shapeDimensions}]\r\n`;
			plain += i;
		})
		await navigator.clipboard.writeText(plain);
	}

	// 'processed_lens': ['int64', 1n, [1], {}],
	// 'embed_states': ['float32', 'random', [1, 128, 3, 19], {}],

	const generateInputsCode  = async () => {
		let code = '';
		custom.inputs.forEach((input) => {
			let i = '';
			if (input.datatype === 'float32') {
				i = `'${input.name}': ['float32', 'random', [${input.shapeDimensions}], {}],\r\n`;
			} else if (input.datatype === 'int64') {
				i = `'${input.name}': ['int64', 1n, [${input.shapeDimensions}], {}],\r\n`;
			}
			code += i;
		})
		await navigator.clipboard.writeText(code);
	}

	const generateFeedsCode  = async () => {
		let code = '';
		custom.inputs.forEach((input) => {
			let i = '';
			if (input.datatype === 'float32') {
				i = `feeds['${input.name}'] = getFeedInfo('${input.name}', 'float32', 1, [${input.shapeDimensions}]);\r\n`;
			} else if (input.datatype === 'int64') {
				i = `feeds['${input.name}'] = getFeedInfo('${input.name}', 'int64', 1n, [${input.shapeDimensions}]);\r\n`;
			} 
			code += i;
		})
		await navigator.clipboard.writeText(code);
	}

	let checkRun = false;
	$: initRun = () => {
		if (selectedBackends.length > 0 && !auto) {
			if (custom && buffer) {
				const overrides = custom.overrides;
				if (overrides) {
					if (overrides.length === 0) {
						checkRun = true;
					} else {
						let r = overrides.every(
							(override) => Number.isInteger(override.value) && override.value !== null
						);
						console.log(r);
						checkRun = r;
					}
				}
			}
		}
	};

	beforeUpdate(() => {});

	onMount(async () => {
		resetStore();
		getTotalNodeCount();
		getDataType();
		initRun();
		if (testQueue.length > 0 && auto) {
			// run();
		}
		if (custom && custom.id) {
			id = custom.id;
			fileName = custom.filename;
			size = custom.size;
			time = custom.time;
		}

		bh = new BrowserHost.BrowserHost();
		v = new View.View(bh);
		await v.start();
	});

	afterUpdate(() => {
		if (!auto) {
			if ($page.url.searchParams.size === 0) {
				let path = `${location.pathname}/?backend=webnn_gpu&run=1&modeltype=onnx`;
				// goto(path);
				location.href = location.origin + path;
			} else {
				getTotalNodeCount();
				getDataType();
				initRun();
				if (id) {
					urlToStore($page.url.searchParams, id, dataType);
				}
			}
		}
	});
</script>

{#if testQueue}
	{#if testQueue.length != 0}
		<Info />
	{:else}
		<Header />
		<div class="tqtitle">
			<div class="title tq s">
				Performance Test · {#if fileName}{fileName} · {#if size}{size.toFixed(2)} MB{/if}{:else}Custom
					Model{/if}
				{#if dataType && dataType != 'fp32'}· {#if dataType === 'int8'}Quantized{:else}{dataType}{/if}{/if}
			</div>
		</div>

		{#if !auto}
			<div class="init">
				<div class="config">
					<ConfigBackends />
					<ConfigNumOfRuns />
				</div>
				<div class="modelfile">
					<label>
						<input
							id="open-file-dialog"
							bind:value={openFile}
							type="file"
							accept=".onnx,.tflite"
							on:change={handleFileInput}
							hidden
						/>
						<span><OnnxCustom />Upload ONNX Model</span>
					</label>
				</div>
			</div>
		{/if}
		<div id="map" class="none">
			<div id="status_collapse" bind:this={statusCollapse} class="show">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div on:click={toggle} title="WebNN Implementation Status in Chromium for this model">
					<svg id="up" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"
						><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" /></svg
					>
					<svg id="down" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"
						><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg
					>
					<span>IMPL STATUS</span>
				</div>
			</div>
			<div id="status_map" class="none" bind:this={map}></div>
		</div>
		<div id="netron-graph" class="">
			{#if custom && custom.nodes.length > 0}
				<div id="graph-nodes" class="list netron-analysis">
					<div class="title"><span>Operations · Count</span></div>
					<table>
						<tbody>
							<tr>
								<td>
									<span id="order-name" class="name count" title="Sort by name">
										<button on:click={sortNodebyName} aria-label="Sort nodes by name">
											<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
												<path d="m80-280 150-400h86l150 400h-82l-34-96H196l-32 96H80Zm140-164h104l-48-150h-6l-50 150Zm328 164v-76l202-252H556v-72h282v76L638-352h202v72H548ZM360-760l120-120 120 120H360ZM480-80 360-200h240L480-80Z"/>
											</svg>
										</button>
									</span>
								</td>
								<td>
									<span id="order-value" class="value count" title="Sort by count">
										<button on:click={sortNodebyCount} aria-label="Sort nodes by count">
											<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
												<path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"/>
											</svg>
										</button>
									</span>
								</td>
								<td></td>
							</tr>
						</tbody>
					</table>
					{#if custom && custom.nodes.length > 0 && nodeCount != 0}
						<table>
							<tbody>
								{#each custom.nodes as node}
									<tr>
										<td><span class="name count" title={node.type}>{node.type}</span></td>
										<td><span class="value count" title={node.count}>x{node.count}</span></td>
										<td
											><span
												class="value count"
												title="{((node.count * 100) / nodeCount).toFixed(2)}%"
												>{((node.count * 100) / nodeCount).toFixed(1)}%</span
											></td
										>
									</tr>
								{/each}
								<tr>
									<td><span class="name count" title="Total"></span></td>
									<td><span class="value count" title={nodeCount}>{nodeCount}</span></td>
									<td><span class="value count" title="100.00%">100%</span></td>
								</tr>
							</tbody>
						</table>
					{/if}
				</div>
				<div id="graph-inputs" class="list netron-analysis">
					<div class="title"><span>Inputs</span></div>
					<table id="inputButtons">
						<tbody>
							<tr>
								<td class="r">
									<span id="order-name-input" class="name count" title="Sort by name">
										<button on:click={sortInputsbyName} aria-label="Sort inputs by name">
											<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
												<path d="m80-280 150-400h86l150 400h-82l-34-96H196l-32 96H80Zm140-164h104l-48-150h-6l-50 150Zm328 164v-76l202-252H556v-72h282v76L638-352h202v72H548ZM360-760l120-120 120 120H360ZM480-80 360-200h240L480-80Z"/>
											</svg>
										</button>
									</span>
								</td>
								<td class="c"></td>
								<td class="e">
									<span class="name count copy">
										<button class="copy" on:click={copyPlain} title="Copy Inputs" aria-label="Copy inputs to clipboard">
											<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
										</button>
										<button class="code" on:click={generateInputsCode} title="Generate Inputs code" aria-label="Generate inputs code">
											<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m384-336 56-57-87-87 87-87-56-57-144 144 144 144Zm192 0 144-144-144-144-56 57 87 87-87 87 56 57ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
										</button>
										<button class="code" on:click={generateFeedsCode} title="Generate Feeds code" aria-label="Generate feeds code">
											<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m384-336 56-57-87-87 87-87-56-57-144 144 144 144Zm192 0 144-144-144-144-56 57 87 87-87 87 56 57ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
										</button>
									</span>
								</td>
							</tr>
						</tbody>
					</table>
					{#if custom && custom.inputs.length > 0}
						<table>
							<tbody>
								{#each custom.inputs as input}
									<tr>
										<td><span class="name inputs" title={input.name}>{input.name}</span></td>
										<td
											><span class="value datatype" title={input.datatype}>{input.datatype}</span></td
										>
										<td
											><span class="value dim" title="[{input.shapeDimensionsRaw}]"
												>[{input.shapeDimensions}]</span
											></td
										>
									</tr>
								{/each}
							</tbody>
						</table>
					{/if}
				</div>
				<div id="graph-outputs" class="list netron-analysis">
					<div class="title"><span>Outputs</span></div>
					<table id="outputButtons">
						<tbody>
							<tr>
								<td class="r">
									<span id="order-name-output" class="name count" title="Sort by name">
										<button on:click={sortOutputsbyName} aria-label="Sort outputs by name">
											<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
												<path d="m80-280 150-400h86l150 400h-82l-34-96H196l-32 96H80Zm140-164h104l-48-150h-6l-50 150Zm328 164v-76l202-252H556v-72h282v76L638-352h202v72H548ZM360-760l120-120 120 120H360ZM480-80 360-200h240L480-80Z"/>
											</svg>
										</button>
									</span>
								</td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
					{#if custom && custom.outputs.length > 0}
						<table>
							<tbody>
								{#each custom.outputs as output}
									<tr>
										<td><span class="name outputs" title={output.name}>{output.name}</span></td>
										<td
											><span class="value datatype" title={output.datatype}>{output.datatype}</span
											></td
										>
										<td
											><span class="value dim" title="[{output.shapeDimensionsRaw}]"
												>[{output.shapeDimensions}]</span
											></td
										>
									</tr>
								{/each}
							</tbody>
						</table>
					{/if}
				</div>
				<div id="properties-meta" class="netron-analysis">
					<div id="graph-properties" class="list">
						<div class="title"><span>Properties</span></div>
						{#if custom && custom.properties.length > 0}
							<table>
								<tbody>
									{#each custom.properties as property}
										<tr>
											<td
												><span class="name properties" title={property.name}>{property.name}</span
												></td
											>
											<td
												><span class="value properties" title={property.value}>{property.value}</span
												></td
											>
										</tr>
									{/each}
								</tbody>
							</table>
						{/if}
					</div>
					<div id="graph-meta" class="list">
						<div class="title"><span>Metadata</span></div>
						{#if custom && custom.metadata.length > 0}
							<table>
								<tbody>
									{#each custom.metadata as metadata}
										<tr>
											<td><span class="name metadata" title={metadata.name}>{metadata.name}</span></td
											>
											<td
												><span class="value metadata" title={metadata.value}>{metadata.value}</span
												></td
											>
										</tr>
									{/each}
								</tbody>
							</table>
						{/if}
					</div>
				</div>
			{/if}
		</div>
		{#if custom && custom.overrides.length > 0}
			<div id="webnn-inputs-overrides" class="">
				<div class="tqtitle">
					<div class="title tq s">
						<span>Inputs · Feeds</span>
					</div>
				</div>
				<div class="note">
					<span class="title">Making dynamic input shapes fixed</span> Please specify fixed integer values
					for the symbolic dimensions below before running the performance testing
				</div>
				<div id="override-settings">
					{#each custom.overrides as override (override.name)}
						<div>
							<span id="overrides_span_{override.name}" class="overridename"
								>{override.name.replace('_div2', ' / 2').replace('_add1', ' + 1')}</span
							>
							<input
								id={override.name}
								class="overridevalue"
								type="text"
								bind:value={override.value}
								on:input={() => updateOverride(override)}
							/>
						</div>
					{/each}
				</div>
				<!-- <p>Override values:</p>
				<ul>
				{#each custom.overrides as override (override.name)}
					<li>{override.name}: {override.value}</li>
				{/each}
				</ul> -->
				<div id="inputs-feeds"></div>
			</div>
		{/if}
		<div id="override" class="none"></div>
		<Results />
		<InferenceLog bind:logShow />
		<div class="run">
			{#if checkRun}
				<button on:click={run}>Run</button>
			{/if}
			{#if !logShow}
				<button
					class="log"
					on:click={() => {
						logShow = true;
					}}>Show Logs</button
				>
			{/if}
		</div>
		<Environment />
		<Footer />
	{/if}
{/if}

<!-- <TestQueue /> -->

<style>
	.title {
		text-align: center;
		color: var(--red);
	}

	.modelfile {
		display: grid;
		font-family: 'JetBrains Mono', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.modelfile label {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		align-self: stretch;
		justify-items: center;
		border: 1px solid var(--red-005);
		background-color: var(--red-005);
		border-left: 0px solid var(--red-005);
	}

	.modelfile label:hover {
		border: 1px solid var(--red);
		background-color: var(--red-01);
	}

	.modelfile input {
		font-family: 'JetBrains Mono', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background-color: transparent;
	}

	#graph-meta {
		margin-top: 10px;
	}
</style>
