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
	import LiteRTLite from '$lib/components/svg/LiteRTLite.svelte';
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

	import { runTflite } from '$lib/assets/js/litert_utils_custom.js';
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

	$: testQueue = $testQueueStore; 
	/**
	 * @type {string[]}
	 */
	let testQueue;
	testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	$: testQueueLength = $testQueueLengthStore; 

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
	customStore.subscribe((value) => {
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
				modeltype: 'tflite',
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
					loadcompilation: null,
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

			if (t0.modeltype === 'tflite') {
				// await runOnnx(1, id, 'tflite', 'fp32', size, 'webnn_gpu', buffer);
				await runTflite(t0.id, t0.model, t0.modeltype, t0.datatype, modelSize, t0.backend, buffer);
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
	$: checkRun = false; // Add this line

	const readFileAsArrayBuffer = (/** @type {Blob} */ file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = () => reject(reader.error);
			reader.readAsArrayBuffer(file);
		});
	};

	let buffer = null;

	const handleFileInput = async (e) => {
		buffer = null;
		loaded = false;
		checkRun = false;

		const file = e.target.files[0];
		if (file) {
			fileName = file.name;
			size = file.size / (1024 * 1024);
			id = fileName.replaceAll(' ', '_').replaceAll('-', '_').replaceAll('.', '_').toLowerCase();
			try {
				const arrayBuffer = await readFileAsArrayBuffer(file);
				buffer = new Uint8Array(arrayBuffer);

				custominit.id = id;
				custominit.filename = fileName;
				custominit.size = size;
				custominit.node_attributes_value_fp16 = false;
				custominit.time = getDateTimeCustom();
				customStore.update(() => custominit);

				loaded = true; // Set loaded after successful processing
				initRun(); // Re-evaluate checkRun state

				updateInfo(`TFLite model loaded: ${fileName} (${size.toFixed(2)} MB)`);
			} catch (error) {
				console.error('Error reading or parsing the file:', error);
				updateInfo(`Error loading model: ${error.message}`);
				buffer = null;
				loaded = false;
				checkRun = false;
			}
		}
	};

	const initRun = () => {
		if (selectedBackends.length > 0 && !auto) {
			if (buffer && loaded) {
				// Check both buffer and loaded state
				checkRun = true;
			} else {
				checkRun = false;
			}
		} else {
			checkRun = false;
		}
	};

	beforeUpdate(() => {});

	onMount(async () => {
		resetStore();
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
	});

	afterUpdate(() => {
		if (!auto) {
			if ($page.url.searchParams.size === 0) {
				let path = `${location.pathname}/?backend=webgpu&run=1&modeltype=tflite`;
				// goto(path);
				location.href = location.origin + path;
			} else {
				initRun();
				if (id) {
					urlToStore($page.url.searchParams, id, dataType);
				}
			}
		}
	});

	// Add this reactive statement to monitor changes
	$: {
		if (selectedBackends && buffer && loaded) {
			initRun();
		}
	}
</script>

{#if testQueue}
	{#if testQueue.length != 0} 
	<Info /> 
	{:else}
		<Header />
		<div class="tqtitle">
			<div class="title tq s">
				{#if fileName}{fileName} · {#if size}{size.toFixed(2)} MB{/if}{:else}Performance Test · Custom
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
							type="file"
							accept=".tflite"
							onchange={handleFileInput}
							hidden
						/>
						<span><LiteRTLite />Upload TFLite Model</span>
					</label>
				</div>
			</div>
		{/if}
		<div id="netron-graph" class="g2">
			{#if custom}
				<div id="graph-inputs" class="list">
					{#if custom && custom.inputs && custom.inputs.length > 0}
						<div class="title"><span>Inputs</span></div>
						<div class="g2">
							{#each custom.inputs as input}
								<div>
									<span class="name inputs" title={input.name}>{input.name}</span>
									<span class="value datatype" title={input.dtype}>{input.dtype}</span>
									<span class="value dim" title="[{input.shape}]">[{input.shape}]</span>
								</div>
							{/each}
						</div>
					{/if}
				</div>
				<div id="graph-outputs" class="list">
					{#if custom && custom.outputs && custom.outputs.length > 0}
						<div class="title"><span>Outputs</span></div>
						<div class="g2">
							{#each custom.outputs as output}
								<div>
									<span class="name outputs" title={output.name}>{output.name}</span>
									<span class="value datatype" title={output.dtype}>{output.dtype}</span>
									<span class="value dim" title="[{output.shape}]">[{output.shape}]</span>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
		<Results />
		<InferenceLog bind:logShow />
		<div class="run">
			{#if checkRun}
				<button onclick={run}>Run</button>
			{/if}
			{#if !logShow}
				<button
					class="log"
					onclick={() => {
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
	.g2 {
		display: grid;
		grid-template-columns: 1fr 1fr !important;
	}

	#graph-inputs {
		margin-left: 0;
	}

	#netron-graph .list {
		padding-bottom: 10px;
	}

	#netron-graph .list div {
		margin: 1px 0;
	}

	.title {
		text-align: center;
		color: var(--red);
		margin-top: 10px !important;
	}

	#netron-graph > div {
		padding: 0px 10px;
	}

	#netron-graph span.name {
		width: 124px;
	}

	#netron-graph span.value {
		width: 48px;
	}

	#netron-graph span.value.dim {
		width: 116px;
		
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
</style>
