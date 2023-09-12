<script>
	import Environment from '$lib/components/Environment.svelte';
	import Config from '$lib/components/Config.svelte';
	import { beforeUpdate, onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import {
		autoStore,
		numberOfRunsStore,
		backendsStore,
		modelTypesStore,
		dataTypesStore,
		modelsStore,
		testQueueStore
	} from '../lib/store/store';
	import {
		stringToArray,
		urlToStoreHome,
		updateStore,
		clearTestQueue
	} from '../lib/assets/js/utils';

	/**
	 * @type {boolean}
	 */
	let auto;
	autoStore.subscribe((value) => {
		auto = value;
	});

	/**
	 * @type {number}
	 */
	let selectedNumOfRuns;

	numberOfRunsStore.subscribe((value) => {
		selectedNumOfRuns = value;
	});

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
	let selectedModelTypes;
	modelTypesStore.subscribe((value) => {
		selectedModelTypes = value;
	});

	/**
	 * @type {string[]}
	 */
	let selectedDataTypes;
	dataTypesStore.subscribe((value) => {
		selectedDataTypes = value;
	});

	/**
	 * @type {string[]}
	 */
	let selectedModels;
	modelsStore.subscribe((value) => {
		selectedModels = value;
	});

	/**
	 * @type {string[]}
	 */
	let testQueue;
	testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	const runTests = () => {
		autoStore.update(() => true);
	};

	beforeUpdate(() => {
		console.log($page.url.searchParams);
		urlToStoreHome($page.url.searchParams);
	});

	onMount(() => {});
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
		<div class="testqueue">{JSON.stringify(testQueue)}</div>
		<br /><br />
		{#if selectedModels[0]}
			<a href="{base}/onnx/{selectedModels[0]}">Go to {selectedModels[0]}</a>
		{/if}

		<div>
			<button on:click|once={runTests}>Run Tests</button>
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
