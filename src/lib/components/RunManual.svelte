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
		updateTestQueue,
		setModelDownloadUrl,
		getModelNameById,
		getModelTypeById,
		getModelDataTypeById
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

	let logShow = true;

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

	const runManual = async () => {
		autoStore.update(() => false);
		modelDownloadProgressStore.update(() => []);
		updateTestQueue();
		resetResult();
		resetInfo();
		await setModelDownloadUrl();
		run();
	};

	let modelname = '';

	onMount(() => {
		modelname = getModelNameById(getModelIdfromPath());
		if (testQueue.length > 0 && auto) {
			run();
		}
	});

	afterUpdate(() => {
		if (!auto) {
			if ($page.url.searchParams.size === 0) {
				let modeltype = getModelTypeById(getModelIdfromPath());
				let datatype = getModelDataTypeById(getModelIdfromPath());
				let path = `${location.pathname}/?modeltype=${modeltype}&datatype=${datatype}&backend=none&run=100`;
				// goto(path);
				location.href = location.origin + path;
			} else {
				urlToStore($page.url.searchParams, getModelIdfromPath());
			}
		}
	});
</script>

<div>
	{#if !auto}
		<div class="tqtitle"><div class="title tq s">{modelname}</div></div>
		<div class="config">
			<ConfigBackends />
			<ConfigModelTypes />
			<ConfigDataTypes />
			<ConfigNumOfRuns />
		</div>
	{/if}
	<Results />
	<InferenceLog bind:logShow />
	<!-- <TestQueue /> -->
	<div class="run">
		{#if selectedBackends.length > 0 && selectedDataTypes.length > 0 && selectedModelTypes.length > 0 && !auto}
			<button on:click={runManual}>Run Manual Tests</button>
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
</div>

<style>
	.title {
		text-align: center;
		color: var(--red);
	}

	.tqtitle {
		margin-top: 10px;
	}

	.tq {
		margin-bottom: 10px;
	}
</style>
