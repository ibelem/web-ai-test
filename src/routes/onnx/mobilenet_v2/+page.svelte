<script>
	import { beforeUpdate } from 'svelte';
	import Environment from '$lib/components/Environment.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigModelsManual from '$lib/components/ConfigModelsManual.svelte';
	import {
		autoStore,
		numberOfRunsStore,
		backendsStore,
		modelTypesStore,
		dataTypesStore
	} from '../../../lib/store/store';

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

	const runTest = () => {};

	beforeUpdate(() => {});
</script>

<div>
	{#if !auto}
		<div class="config">
			<ConfigBackends />
			<ConfigModelsManual />
			<ConfigNumOfRuns />
		</div>
	{/if}
	<div class="temp">
		<span class="tobe">MobileNetv2</span><br /><br />
		To be tested when complete MobileNetv2<br /><br />
		<br />Backends: {selectedBackends}
		<br />Model Types: {selectedModelTypes}
		<br />Data Types: {selectedDataTypes}
		<br />Number of Runs: {selectedNumOfRuns}<br /><br />
	</div>

	<button on:click|once={runTest}> Run </button>

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
