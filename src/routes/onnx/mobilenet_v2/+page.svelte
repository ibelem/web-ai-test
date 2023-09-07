<script>
	import Environment from '$lib/components/Environment.svelte';
	import { base } from '$app/paths';
	import { beforeUpdate } from 'svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import {
		numberofrunsStore,
		backendsStore,
		modelTypesStore,
		dataTypesStore,
		modelsStore
	} from '../../../lib/store';
	import { page } from '$app/stores';

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

	let showRun = false;
	let showConfig = false;

	let runstatus = 'not started';

	const run = () => {
		runstatus = 'runing';
	};

	beforeUpdate(() => {
		if (selectedBackends.length > 0) {
			showConfig = false;
			showRun = false;
			runstatus = 'running...';
		} else {
			showConfig = true;
			showRun = true;
		}
	});
</script>

<div>
	{#if showConfig}
		<div class="config">
			<ConfigBackends />
			<ConfigNumOfRuns />
		</div>
	{/if}
	<div class="temp">
		<span class="tobe">MobileNetv2</span><br /><br />
		To be tested when complete MobileNetv2<br /><br />
		<br />Backends: {selectedBackends}
		<br />Model Types: {selectedModelTypes}
		<br />Data Types: {selectedDataTypes}
		<br />Models: {selectedModels}
		<br />Number of Runs: {selectedNumOfRuns}<br /><br />
	</div>

	<div class="temp">{runstatus}</div>

	{#if showRun}
		<button on:click|once={run}> Run </button>
	{/if}

	<Environment />
</div>

<style>
	.temp {
		text-align: center;
		margin: 10px;
	}
	.tobe {
		padding: 4px 16px;
		background-color: var(--pink);
		color: white;
		display: inline-block;
		margin: 10px;
	}
</style>
