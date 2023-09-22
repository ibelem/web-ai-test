<script>
	import { beforeUpdate, onMount } from 'svelte';
	import Environment from '$lib/components/Environment.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigDataTypes from '$lib/components/ConfigDataTypes.svelte';
	import ConfigModelTypes from '$lib/components/ConfigModelTypes.svelte';
	import Results from '$lib/components/Results.svelte';
	import TestQueue from '$lib/components/TestQueue.svelte';
	import {
		auto,
		run,
		resetResult,
		resetInfo,
		urlToStore,
		updateTestQueue,
		getModelIdfromPath
	} from '../../lib/assets/js/utils';
	import {
		autoStore,
		testQueueStore,
		numberOfRunsStore,
		testQueueLengthStore,
		backendsStore,
		modelTypesStore,
		modelsStore,
		dataTypesStore
	} from '$lib/store/store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

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

	const runManual = () => {
		autoStore.update(() => false);
		updateTestQueue();
		resetResult();
		resetInfo();
		run();
	};

	beforeUpdate(() => {
		if (!auto) {
			if ($page.url.searchParams.size === 0) {
				let path = `${location.pathname}/?modeltype=none&datatype=none&backend=none&run=1`;
				goto(path);
			} else {
				urlToStore($page.url.searchParams, getModelIdfromPath());
				resetInfo();
			}
		}
	});

	onMount(() => {
		if (testQueue.length > 0 && auto) {
			run();
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
