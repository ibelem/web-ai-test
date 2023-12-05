<script>
	import ConfigConformance from '$lib/components/ConfigConformance.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Results from '$lib/components/Results.svelte';
	import Info from '$lib/components/Info.svelte';
	import InferenceLog from '$lib/components/InferenceLog.svelte';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
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
		modelDownloadProgressStore,
		refererStore,
		conformanceStore
	} from '$lib/store/store';
	import {
		resetResult,
		resetInfo,
		urlToStore,
		updateTestQueue,
		setModelDownloadUrl
	} from '$lib/assets/js/utils';

	let logShow = true;

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

	const runConformance = async () => {
		autoStore.update(() => true);
		conformanceStore.update(() => true);
		modelDownloadProgressStore.update(() => []);
		updateTestQueue();
		resetResult();
		resetInfo();
		await setModelDownloadUrl();
		let path = `${base}/run/${testQueue[0].model}`;
		// goto(path);
		location.href = path;
	};

	afterUpdate(() => {
		if ($page.url.searchParams.size === 0) {
			let path = `${base}/conformance?modeltype=none&datatype=none&backend=none&run=1&model=none`;
			goto(path);
		} else {
			urlToStore($page.url.searchParams, false);
		}

		refererStore.update(() => $page.url.href);
	});

	onMount(() => {
		conformanceStore.update(() => false);
	});

	onDestroy(() => {});
</script>

<Header />
<div>
	<ConfigConformance />
	<Results />
	<InferenceLog bind:logShow />
	<!-- <TestQueue /> -->
	<div class="run">
		{#if selectedModels.length > 0 && selectedBackends.length > 0}
			<button on:click={runConformance}>Run Conformance Tests</button>
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
	<Info />
</div>
<Footer />

<style>
</style>
