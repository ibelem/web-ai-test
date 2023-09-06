<script>
	import Environment from '$lib/components/Environment.svelte';
	import { base } from '$app/paths';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import {
		numberofrunsStore,
		backendsStore,
		modelTypesStore,
		dataTypesStore,
		modelsStore
	} from '../../lib/store';

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
</script>

<div>
	<div class="config">
		<ConfigBackends />
		<ConfigNumOfRuns />
	</div>
	<div class="temp">
		<span class="tobe">MobileNetv2</span><br /><br />
		To be tested when complete MobileNetv2<br /><br />
		<br />Backends: {selectedBackends}
		<br />Model Types: {selectedModelTypes}
		<br />Data Types: {selectedDataTypes}
		<br />Models: {selectedModels}
		<br />Number of Runs: {selectedNumOfRuns}<br /><br />
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
</style>
