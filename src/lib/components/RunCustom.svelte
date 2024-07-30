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
		updateTestQueueCustom,
		resetStore,
		urlToStore
	} from '$lib/assets/js/utils';
	import * as BrowserHost from '$lib/assets/js/onnx/browser';
	// import { onnxGraph } from '$lib/assets/js/onnx/view';
	import * as View from '$lib/assets/js/onnx/view';
	import { runOnnx } from '$lib/assets/js/ort_utils_custom';
	import {
		autoStore,
		testQueueStore,
		backendsStore,
		modelDownloadProgressStore
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

	const runCustom = async () => {
		if (testQueue[0] && getModelIdfromPath() === testQueue[0].model) {
			let t0 = testQueue[0];
			let r = {
				id: t0.id,
				model: t0.model,
				modeltype: t0.modeltype,
				datatype: t0.datatype,
				modelsize: getModelSizeById(t0.model)
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
				await runOnnx(
					t0.id,
					t0.model,
					t0.modeltype,
					t0.datatype,
					getModelSizeById(t0.model),
					t0.backend
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
		updateTestQueueCustom();
		resetResult();
		resetInfo();
		runCustom();
		// await runOnnx(1, id, 'onnx', 'fp32', size, 'webnn_gpu', buffer);
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

	// /**
	//  * @type {string}
	//  */
	// let dataType = 'fp32';

	$: loaded = false;

	const readFileAsArrayBuffer = (/** @type {Blob} */ file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = () => reject(reader.error);
			reader.readAsArrayBuffer(file);
		});
	};

	let openFile;
	let buffer = null;

	const handleFileInput = async (e) => {
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
				custominit.time = getDateTimeCustom();
				customStore.update(() => custominit);
				getTotalNodeCount();
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

	let descending = true;
	const sortNodebyCount = () => {
		custom.nodes.sort((a, b) => {
			return descending ? a.count - b.count : b.count - a.count;
		});
		descending = !descending;
		customStore.update(() => custom);
	};

	beforeUpdate(() => {});

	onMount(async () => {
		resetStore();
		if (testQueue.length > 0 && auto) {
			// run();
		}
		if (custom && custom.id) {
			id = custom.id;
			fileName = custom.filename;
			size = custom.size;
			time = custom.time;
		}

		const host = new BrowserHost.BrowserHost();
		const v = new View.View(host);
		await v.start();
	});

	afterUpdate(() => {
		if (!auto) {
			if ($page.url.searchParams.size === 0) {
				let path = `${location.pathname}/?backend=webnn_gpu&run=1&modeltype=onnx&datatype=all`;
				// goto(path);
				location.href = location.origin + path;
			} else {
				getTotalNodeCount();
				if (id) {
					urlToStore($page.url.searchParams, id);
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
							accept=".onnx"
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
					<div>
						<span id="order-name" class="name count" title="Sort by name">
							<button on:click={sortNodebyName}>
								<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
									<path
										d="m80-280 150-400h86l150 400h-82l-34-96H196l-32 96H80Zm140-164h104l-48-150h-6l-50 150Zm328 164v-76l202-252H556v-72h282v76L638-352h202v72H548ZM360-760l120-120 120 120H360ZM480-80 360-200h240L480-80Z"
									/>
								</svg>
							</button>
						</span>
						<span id="order-value" class="value count" title="Sort by count">
							<button on:click={sortNodebyCount}>
								<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
									<path
										d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"
									/>
								</svg>
							</button>
						</span>
					</div>
					{#if custom && custom.nodes.length > 0 && nodeCount != 0}
						{#each custom.nodes as node}
							<div>
								<span class="name count" title={node.type}>{node.type}</span>
								<span class="value count" title={node.count}>x{node.count}</span>
								<span class="value count" title="{((node.count * 100) / nodeCount).toFixed(2)}%"
									>{((node.count * 100) / nodeCount).toFixed(1)}%</span
								>
							</div>
						{/each}
						<div>
							<span class="name count" title="Total"></span>
							<span class="value count" title={nodeCount}>{nodeCount}</span>
							<span class="value count" title="100.00%">100%</span>
						</div>
					{/if}
				</div>
				<div id="graph-inputs" class="list netron-analysis">
					<div class="title"><span>Inputs</span></div>
					{#if custom && custom.inputs.length > 0}
						{#each custom.inputs as input}
							<div>
								<span class="name inputs" title={input.name}>{input.name}</span>
								<span class="value datatype" title={input.datatype}>{input.datatype}</span>
								<span class="value dim" title="[{input.shapeDimensionsRaw}]"
									>[{input.shapeDimensions}]</span
								>
							</div>
						{/each}
					{/if}
				</div>
				<div id="graph-outputs" class="list netron-analysis">
					<div class="title"><span>Outputs</span></div>
					{#if custom && custom.outputs.length > 0}
						{#each custom.outputs as output}
							<div>
								<span class="name outputs" title={output.name}>{output.name}</span>
								<span class="value datatype" title={output.datatype}>{output.datatype}</span>
								<span class="value dim" title="[{output.shapeDimensionsRaw}]"
									>[{output.shapeDimensions}]</span
								>
							</div>
						{/each}
					{/if}
				</div>
				<div id="properties-meta" class="netron-analysis">
					<div id="graph-properties" class="list">
						<div class="title"><span>Properties</span></div>
						{#if custom && custom.properties.length > 0}
							{#each custom.properties as property}
								<div>
									<span class="name properties" title={property.name}>{property.name}</span>
									<span class="value properties" title={property.value}>{property.value}</span>
								</div>
							{/each}
						{/if}
					</div>
					<div id="graph-meta" class="list">
						<div class="title"><span>Metadata</span></div>
						{#if custom && custom.metadata.length > 0}
							{#each custom.metadata as metadata}
								<div>
									<span class="name metadata" title={metadata.name}>{metadata.name}</span>
									<span class="value metadata" title={metadata.value}>{metadata.value}</span>
								</div>
							{/each}
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
			{#if selectedBackends.length > 0 && !auto}
				{#if buffer}
					<button on:click={run}>Run</button>
				{/if}
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
