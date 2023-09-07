<script>
	import {
		numberofrunsStore,
		backendsStore,
		dataTypesStore,
		modelTypesStore,
		modelsStore
	} from '../store';
	import { models } from '$lib/config';
	import { testQueue } from '$lib/assets/js/utils';
	import { onMount } from 'svelte';

	/**
	 * @type {number}
	 */
	let numOfRuns;

	numberofrunsStore.subscribe((value) => {
		numOfRuns = value;
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

	const setNumberOfRuns = () => {
		numberofrunsStore.update(() => numOfRuns);
		testQueue(models, selectedModels, selectedBackends, selectedDataTypes, selectedModelTypes);
	};

	onMount(() => {});
</script>

<div class="title">{numOfRuns} of Runs</div>
<div class="numofruns">
	<label>
		<input type="number" bind:value={numOfRuns} min="1" max="1000" on:change={setNumberOfRuns} />
		<input type="range" bind:value={numOfRuns} min="1" max="1000" on:change={setNumberOfRuns} />
	</label>
</div>

<style>
	input[type='number'] {
		padding: 4px 6px;
		border: 1px solid var(--grey-02);
	}
	input[type='number']:hover,
	input[type='number']:focus {
		border: 1px solid var(--red);
		outline: none;
	}
	input[type='range'] {
		-webkit-appearance: none;
		width: 70vw;
		height: 1px;
		border-radius: 5px;
		background-color: var(--grey-02);
		outline: none;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background-color: var(--grey-02);
	}

	input[type='range']:hover,
	input[type='range']:hover::-webkit-slider-thumb {
		background-color: var(--red);
	}

	input[type='range']:hover {
		height: 4px;
	}

	input[type='range']:hover::-webkit-slider-thumb {
		width: 16px;
		height: 16px;
		cursor: pointer;
	}

	.numofruns label:hover {
		background-color: transparent;
	}
</style>
