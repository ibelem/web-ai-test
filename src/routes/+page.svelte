<script>
	import Environment from '$lib/components/Environment.svelte';
	import Config from '$lib/components/Config.svelte';
	import { base } from '$app/paths';
	import {
		numberofrunsStore,
		backendsStore,
		modelTypesStore,
		dataTypesStore,
		modelsStore,
		testQueueStore
	} from '../lib/store';

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
			<a href="{base}/{selectedModels[0]}">RUN</a>
		{/if}
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
