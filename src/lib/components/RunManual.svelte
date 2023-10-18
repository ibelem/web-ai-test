<script>
	import { onMount, afterUpdate } from 'svelte';
	import Environment from '$lib/components/Environment.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigDataTypes from '$lib/components/ConfigDataTypes.svelte';
	import ConfigModelTypes from '$lib/components/ConfigModelTypes.svelte';
	import InferenceLog from '$lib/components/InferenceLog.svelte';
	import Results from '$lib/components/Results.svelte';
	import TestQueue from '$lib/components/TestQueue.svelte';
	import {
		auto,
		run,
		resetResult,
		resetInfo,
		urlToStore,
		getModelIdfromPath,
		updateTestQueue
	} from '../../lib/assets/js/utils';
	import {
		autoStore,
		testQueueStore,
		numberOfRunsStore,
		testQueueLengthStore,
		backendsStore,
		modelTypesStore,
		modelsStore,
		dataTypesStore,
		modelDownloadProgressStore
	} from '$lib/store/store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	/**
	 * @type {number}
	 */
	let numOfRuns;

	numberOfRunsStore.subscribe((value) => {
		numOfRuns = value;
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

	/**
	 * @type {number}
	 */
	let testQueueLength;

	testQueueLengthStore.subscribe((value) => {
		testQueueLength = value;
	});

	const runManual = () => {
		autoStore.update(() => false);
		modelDownloadProgressStore.update(() => []);
		updateTestQueue();
		resetResult();
		resetInfo();
		run();
	};

	onMount(() => {
		if (testQueue.length > 0 && auto) {
			run();
		}
	});

	afterUpdate(() => {
		if (!auto) {
			if ($page.url.searchParams.size === 0) {
				let path = `${location.pathname}/?modeltype=none&datatype=none&backend=none&run=1`;
				goto(path);
			} else {
				urlToStore($page.url.searchParams, getModelIdfromPath());
			}
		}
	});
</script>

<div>
	{#if !auto}
		<div class="config">
			<ConfigBackends />
			<ConfigModelTypes />
			<ConfigDataTypes />
			<ConfigNumOfRuns />
		</div>
	{/if}
	<Results />
	<InferenceLog />
	<TestQueue />
	<div class="run">
		{#if selectedBackends.length > 0 && selectedDataTypes.length > 0 && selectedModelTypes.length > 0 && !auto}
			<button on:click={runManual}>Run Manual Tests</button>
		{/if}
	</div>

	<Environment />
</div>

<style>
</style>
