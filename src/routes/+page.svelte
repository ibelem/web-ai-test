<script>
	import Environment from '$lib/components/Environment.svelte';
	import Config from '$lib/components/Config.svelte';
	import { beforeUpdate } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import {
		numberofrunsStore,
		backendsStore,
		modelTypesStore,
		dataTypesStore,
		modelsStore,
		testQueueStore
	} from '../lib/store';
	import { initStore, updateStore, clearTestQueue } from '../lib/assets/js/utils';

	/**
	 * @type {number}
	 */
	let selectedNumOfRuns;

	const unsubscribeNumOfRuns = numberofrunsStore.subscribe((value) => {
		selectedNumOfRuns = value;
	});

	/**
	 * @type {string[]}
	 */
	let selectedBackends;
	const unsubscribeBackends = backendsStore.subscribe((value) => {
		selectedBackends = value;
	});

	/**
	 * @type {string[]}
	 */
	let selectedModelTypes;
	const unsubscribeModelTypes = modelTypesStore.subscribe((value) => {
		selectedModelTypes = value;
	});

	/**
	 * @type {string[]}
	 */
	let selectedDataTypes;
	const unsubscribeDataTypes = dataTypesStore.subscribe((value) => {
		selectedDataTypes = value;
	});

	/**
	 * @type {string[]}
	 */
	let selectedModels;
	const unsubscribeModels = modelsStore.subscribe((value) => {
		selectedModels = value;
	});

	/**
	 * @type {string[]}
	 */
	let testQueue;
	const unsubscribeTestQueue = testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	const stringToArray = (value) => {
		if (value.indexOf(',') > -1) {
			value = value.split(',');
		} else {
			value = [value];
		}
		return value;
	};

	const urlToStore = () => {
		let p = $page.url.searchParams;
		if (p.size > 0) {
			let modelType = p.get('modeltype');
			let dataType = p.get('datatype');
			let backend = p.get('backend');
			let numOfRuns = p.get('run');
			let model = p.get('model');

			if (modelType.indexOf(',') > -1) {
				modelType = stringToArray(modelType);
			} else if (modelType.toLowerCase() === 'all') {
				modelType = ['onnx', 'tflite', 'npy'];
			} else {
				modelType = [modelType];
			}

			if (dataType.indexOf(',') > -1) {
				dataType = stringToArray(dataType);
			} else if (dataType.toLowerCase() === 'all') {
				dataType = ['fp32', 'fp16', 'int8'];
			} else {
				dataType = [dataType];
			}

			if (backend.indexOf(',') > -1) {
				backend = stringToArray(backend);
			} else if (backend.toLowerCase() === 'all') {
				backend = [
					'wasm_1',
					'wasm_4',
					'webgl',
					'webgpu',
					'webnn_cpu_1',
					'webnn_cpu_4',
					'webnn_gpu',
					'webnn_npu'
				];
			} else {
				backend = [backend];
			}

			if (model.indexOf(',') > -1) {
				model = stringToArray(model);
			} else {
				model = [model];
			}

			numOfRuns = parseInt(numOfRuns);

			if (numOfRuns <= 1) {
				numOfRuns = 1;
			} else if (numOfRuns > 1000) {
				numOfRuns = 1000;
			}

			if (modelType && dataType && backend && model) {
				if (numOfRuns) {
					updateStore(numOfRuns, backend, dataType, modelType, model);
				} else {
					updateStore(1, backend, dataType, modelType, model);
				}
				console.log('update STORE via url parameters');
			}
		}
	};

	beforeUpdate(() => {
		urlToStore();
	});
</script>

<div>
	<Config />
	<div class="temp">
		<span class="tobe">To be tested</span>
		<br />Backends: {selectedBackends}
		<br />Model Types: {selectedModelTypes}
		<br />Data Types: {selectedDataTypes}
		<br />Models: {selectedModels}
		<br />Number of Runs: {selectedNumOfRuns}<br /><br />
		<div class="testqueue">
			{#each testQueue as tq}
				{tq} <br />
			{/each}
		</div>
		<br /><br />
		{#if selectedModels[0]}
			<a href="{base}/onnx/{selectedModels[0]}">RUN</a>
		{/if}

		<div>
			<button on:click|once={clearTestQueue}> Clear STORE </button>
		</div>
	</div>

	<Environment />
</div>

<style>
	.temp {
		text-align: center;
	}
	.tobe {
		padding: 4px 16px;
		background-color: var(--pink);
		color: white;
		display: inline-block;
		margin: 10px;
	}
	a {
		padding: 4px 16px;
		background-color: var(--green);
		color: white;
		display: inline-block;
		margin: 10px;
	}

	a:hover {
		background-color: var(--red);
	}
	.testqueue {
		text-align: left;
	}
</style>
