<script>
	import { onMount, afterUpdate } from 'svelte';
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
	import {
		auto,
		run,
		resetResult,
		resetInfo
	} from '$lib/assets/js/utils';
	import * as BrowserHost from '$lib/assets/js/onnx/browser'
	import * as View from '$lib/assets/js/onnx/view'
	import {
		runOnnx
	} from '$lib/assets/js/ort_utils_custom';
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

	const runCustomize = async () => {
		autoStore.update(() => false);
		modelDownloadProgressStore.update(() => []);
		resetResult();
		resetInfo();
		run();
	};

	/**
	 * @type {string}
	 */
	let id = '';
	/**
	 * @type {string}
	 */
	$:modelName = '';

	/**
	 * @type {string }
	 */
	const modelType = 'onnx';

	// /**
	//  * @type {string}
	//  */
	// let dataType = 'fp32';

	/**
	 * @type {string}
	 */
	 let inputs = '';

	/**
	 * @type {string}
	 */
	$:size = '';

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
			modelName = file.name;
			size = file.size / (1024 * 1024);
			id = modelName.replaceAll(' ', '_').replaceAll('-', '_').replaceAll('.', '_').toLowerCase();
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

			} catch (error) {
				console.error('Error reading or parsing the file:', error);
			}
		}
	};

	onMount(async () => {
		if (testQueue.length > 0 && auto) {
			 // run();
		}
		const host = new BrowserHost.BrowserHost();
		const v = new View.View(host);
		await v.start();
	});

	afterUpdate(() => {
		if (!auto) {
			if ($page.url.searchParams.size === 0) {
				let path = `${location.pathname}/?backend=none&run=100&modeltype=${modelType}`;
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
				Performance Test · {#if modelName}{modelName} · {#if size}{size.toFixed(2)} MB{/if}{:else}Custom Model{/if}
			</div>
		</div>
		<div class="modelfile">
			<label>
				<input id="open-file-dialog" type="file" accept=".onnx" on:change={handleFileInput} hidden />
				<span><Upload />Upload ONNX File</span>
			</label>
		</div>
		<div id="map" class="none"></div>
		<div id="netron-graph" class="none">
			<div id="graph-nodes" class="list"></div>
			<div id="graph-inputs" class="list"></div>
			<div id="graph-outputs" class="list"></div>
			<div id="properties-meta">
				<div id="graph-properties" class="list"></div>
				<div id="graph-meta" class="list"></div>
			</div>
		</div>
		{#if !auto}
			<div class="config">
				<ConfigBackends />
				<ConfigNumOfRuns />
			</div>
		{/if}
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
		margin: 0px auto;
		text-align: center;
		font-family: 'JetBrains Mono', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.modelfile input {
		font-family: 'JetBrains Mono', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background-color: transparent;
	}

	.modelfile span {
		padding: 12px 28px;
	}

	#graph-meta {
		margin-top: 10px;
	}
</style>
