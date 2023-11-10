<script>
	import { onMount, afterUpdate } from 'svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	// import TestQueue from './TestQueue.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import InferenceLog from '$lib/components/InferenceLog.svelte';
	import Results from '$lib/components/Results.svelte';
	import Info from './Info.svelte';
	import Nav from './Nav.svelte';
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
		modelDownloadProgressStore
	} from '$lib/store/store';
	import { page } from '$app/stores';

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

	/**
	 * @type {string}
	 */

	let id = '';
	/**
	 * @type {string}
	 */
	let modelName = '';

	/**
	 * @type {string }
	 */
	let modelType = '';

	/**
	 * @type {string}
	 */
	let dataType = '';

	onMount(() => {
		id = getModelIdfromPath() || '';
		modelName = getModelNameById(id) || '';
		modelType = getModelTypeById(id) || '';
		dataType = getModelDataTypeById(id) || '';

		if (testQueue.length > 0 && auto) {
			run();
		}
	});

	afterUpdate(() => {
		if (!auto) {
			if ($page.url.searchParams.size === 0) {
				let path = `${location.pathname}/?backend=none&run=100&modeltype=${modelType}&datatype=${dataType}`;
				// goto(path);
				location.href = location.origin + path;
			} else {
				urlToStore($page.url.searchParams, getModelIdfromPath());
			}
		}
	});
</script>

<header>
	<div></div>
	<div class="nav">
		<Nav />
	</div>
</header>

<div>
	<div class="tqtitle">
		<div class="title tq s">
			{modelName} / {modelType} / {dataType} / {#if numOfRuns === 1}
				1 Run
			{:else}{numOfRuns} Runs{/if}
		</div>
	</div>

	{#if !auto}
		<div class="config">
			<ConfigBackends />
			<!-- <ConfigNumOfRuns /> -->
		</div>
	{/if}

	{#if testQueue.length === 0}
		<Results />
		<InferenceLog bind:logShow />
	{/if}

	{#if testQueue.length > 0}
		<Info />
	{/if}

	<!-- <TestQueue /> -->

	<div class="run">
		{#if selectedBackends.length > 0 && !auto}
			{#if testQueue.length === 0}
				<button on:click={runManual}>Run Manual Tests</button>
			{/if}
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
	header {
		height: 60px;
	}

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
