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
	let description = '';

	/**
	 * @type {string}
	 */
	let note = '';

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
				Performance Test · Custom Model
			</div>
		</div>
		<div class="modelfile">
			<label>
				<input id="open-file-dialog" type="file" accept=".onnx" on:change={handleFileInput} hidden />
				<span><Upload />Upload ONNX File</span>
			</label>
		</div>
		<div id="modeldesc" class="{loaded} reverse">
			<span class="modeldes">{id}</span>
			<span class="modeldes">{modelName}</span>
			<span class="modeldes">{modelType}</span>
			<!-- <span class="modeldes">{dataType}</span> -->
			{#if inputs}
				<span class="modeldes">{inputs}</span>
			{/if}
			<span class="modeldes">{#if size}{size.toFixed(2)} MB{/if}</span>
			<div>{description}</div>
			{#if note}
				<div class="note">
					<svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="14"
						><path
							d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
						/></svg
					>{note}
				</div>
			{/if}
		</div>
		<div id="netron-graph" class="none">
			<div id="graph-nodes" class="list"></div>
			<div id="graph-nodes-webnn-dml" class="list"></div>
			<div id="graph-nodes-webnn-coreml" class="list"></div>
			<div id="graph-nodes-webnn-tflite" class="list"></div>
			<div id="graph-properties" class="list"></div>
			<div id="graph-meta" class="list"></div>
			<div id="graph-inputs" class="list"></div>
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
		margin: 0px auto 10px 0;
		text-align: center;
		font-family: 'JetBrains Mono', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.modelfile input {
		font-family: 'JetBrains Mono', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background-color: transparent;
	}

	#modeldesc.reverse.false {
		display: none;
	}

	.modelfile span {
		padding: 12px 28px;
	}
</style>
