<script>
	import Environment from '$lib/components/Environment.svelte';
	import Config from '$lib/components/Config.svelte';
	import TestQueue from '$lib/components/TestQueue.svelte';
	import Results from '$lib/components/Results.svelte';
	import Info from '$lib/components/Info.svelte';
	import InferenceLog from '$lib/components/InferenceLog.svelte';
	import { afterUpdate, onDestroy } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		autoStore,
		testQueueStore,
		testQueueLengthStore,
		numberOfRunsStore,
		backendsStore,
		modelTypesStore,
		dataTypesStore,
		modelsStore,
		modelDownloadProgressStore
	} from '../lib/store/store';
	import { resetResult, resetInfo, urlToStore, updateTestQueue } from '../lib/assets/js/utils';

	/**
	 * @type {number}
	 */
	export let numOfRuns;

	numberOfRunsStore.subscribe((value) => {
		numOfRuns = value;
	});

	/**
	 * @type {string[]}
	 */
	export let selectedBackends;
	backendsStore.subscribe((value) => {
		selectedBackends = value;
	});

	/**
	 * @type {string[]}
	 */
	export let selectedModelTypes;
	modelTypesStore.subscribe((value) => {
		selectedModelTypes = value;
	});

	/**
	 * @type {string[]}
	 */
	export let selectedDataTypes;
	dataTypesStore.subscribe((value) => {
		selectedDataTypes = value;
	});

	/**
	 * @type {string[]}
	 */
	export let selectedModels;
	modelsStore.subscribe((value) => {
		selectedModels = value;
	});

	/**
	 * @type {string[]}
	 */
	export let testQueue;
	testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	/**
	 * @type {number}
	 */
	export let testQueueLength;

	testQueueLengthStore.subscribe((value) => {
		testQueueLength = value;
	});

	const run = async () => {
		autoStore.update(() => true);
		modelDownloadProgressStore.update(() => []);
		updateTestQueue();
		resetResult();
		resetInfo();
		let path = `${base}/run/${testQueue[0].model}`;
		goto(path);
	};

	afterUpdate(() => {
		if ($page.url.searchParams.size === 0) {
			let path = `${base}/?modeltype=none&datatype=none&backend=none&run=1&model=none`;
			goto(path);
		} else {
			urlToStore($page.url.searchParams, false);
		}
	});

	onDestroy(() => {});
</script>

<div>
	<Config />
	<Results />
	<InferenceLog />
	<TestQueue />
	<div class="run">
		{#if selectedModels.length > 0}
			<button on:click={run}>Run Tests</button>
		{/if}
	</div>
	<Environment />
	<Info />
</div>

<style>
</style>
