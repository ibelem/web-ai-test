<script>
	// @ts-nocheck

	import { onMount, afterUpdate } from 'svelte';
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
	import Upload from '$lib/components/svg/Upload.svelte';
	import { auto, run, resetResult, resetInfo, getDateTimeCustom } from '$lib/assets/js/utils';
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

	const runCustomize = async () => {
		autoStore.update(() => false);
		modelDownloadProgressStore.update(() => []);
		resetResult();
		resetInfo();
		run();
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

	// const readFileAsArrayBuffer = (/** @type {Blob} */ file) => {
	// 	return new Promise((resolve, reject) => {
	// 		const reader = new FileReader();
	// 		reader.onload = () => resolve(reader.result);
	// 		reader.onerror = () => reject(reader.error);
	// 		reader.readAsArrayBuffer(file);
	// 	});
	// }

	const handleFileInput = async (e) => {
		const file = e.target.files[0];
		// console.log(file);
		if (file) {
			loaded = true;
			fileName = file.name;
			size = file.size / (1024 * 1024);
			id = fileName.replaceAll(' ', '_').replaceAll('-', '_').replaceAll('.', '_').toLowerCase();
			try {
				// const arrayBuffer = await readFileAsArrayBuffer(file);
				// const buffer = new Uint8Array(arrayBuffer);
				// const reader = protobuf.TextReader.open(buffer);
				// let tags = reader?.signature();
				// console.log(tags);

				// await runOnnx(1, id, 'onnx', 'fp32', size, 'webnn_gpu', buffer);

				// if (e.target && e.target.files && e.target.files.length > 0) {
				// 	const host = new BrowserHost.BrowserHost()
				// 	const v = new View.View(host);

				//     const files = Array.from(e.target.files);
				// 	console.log(files);
				//     const file = files.find(async (file) => {
				// 		v.accept(file.name, file.size);
				// 		if (file) {
				// 			console.log(file);
				// 			const context = new BrowserHost.BrowserHost.BrowserFileContext(file, files);
				// 			await context.open();
				// 			const model = await v.open(context);
				// 			console.log(model);
				// 			// v._open(file, files);
				//     	}
				// 	});

				// }

				custominit.id = id;
				custominit.filename = fileName;
				custominit.size = size;
				custominit.time = getDateTimeCustom();
				customStore.update(() => custominit);
			} catch (error) {
				console.error('Error reading or parsing the file:', error);
			}
		}
	};

	$: nodeCount = getTotalNodeCount();

	const getTotalNodeCount = () => {
		if (custom && custom.nodes.length > 0) {
			return custom.nodes.reduce((acc, item) => acc + item.count, 0);
		} else {
			return 0;
		}
	};

	onMount(async () => {
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
				let path = `${location.pathname}/?backend=none&run=1&modeltype=onnx`;
				// goto(path);
				location.href = location.origin + path;
			} else {
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
							type="file"
							accept=".onnx"
							on:change={handleFileInput}
							hidden
						/>
						<span><Upload />Upload ONNX Model</span>
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
				<div id="graph-nodes" class="list">
					<div class="title"><span>Operations · Count</span></div>
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
				<div id="graph-inputs" class="list">
					<div class="title"><span>Inputs</span></div>
					{#if custom && custom.inputs.length > 0}
						{#each custom.inputs as input}
							<div>
								<span class="name inputs" title={input.name}>{input.name}</span>
								<span class="value datatype" title={input.datatype}>{input.datatype}</span>
								<span class="value dim" title="[{input.shapeDimensions}]"
									>[{input.shapeDimensions}]</span
								>
							</div>
						{/each}
					{/if}
				</div>
				<div id="graph-outputs" class="list">
					{#if custom && custom.outputs.length > 0}
						{#each custom.outputs as output}
							<div>
								<span class="name outputs" title={output.name}>{output.name}</span>
								<span class="value datatype" title={output.datatype}>{output.datatype}</span>
								<span class="value dim" title="[{output.shapeDimensions}]"
									>[{output.shapeDimensions}]</span
								>
							</div>
						{/each}
					{/if}
				</div>
				<div id="properties-meta">
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
						{#each custom.overrides as override}
							<div>
								<span id="overrides_span_{override.name}" class="overridename">{override.name}</span
								>
								<input
									id="overrides_input_{override.name}"
									class="overridevalue"
									type="text"
								/>
							</div>
						{/each}
				</div>
				<div id="inputs-feeds"></div>
			</div>
		{/if}
		<div id="override" class="none"></div>
		<Results />
		<InferenceLog bind:logShow />
		<div class="run">
			{#if selectedBackends.length > 0 && !auto}
				{#if testQueue.length === 0}
					<button on:click={runCustomize}>Run</button>
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
