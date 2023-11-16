<script>
	import { onMount, afterUpdate } from 'svelte';
	// import TestQueue from './TestQueue.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import InferenceLog from '$lib/components/InferenceLog.svelte';
	import Results from '$lib/components/Results.svelte';
	import Info from './Info.svelte';
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
	} from '$lib/assets/js/utils';
	import {
		autoStore,
		testQueueStore,
		backendsStore,
		modelDownloadProgressStore
	} from '$lib/store/store';
	import { page } from '$app/stores';

	let logShow = true;

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

{#if testQueue}
	{#if testQueue.length != 0}
		<Info />
	{:else}
		<Header />
		<div class="tqtitle">
			<div class="title tq s">
				{modelName}
			</div>
		</div>
		{#if !auto}
			<div class="config">
				<ConfigBackends />
				<ConfigNumOfRuns />
			</div>
		{/if}
		<Results />
		<InferenceLog bind:logShow />
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
		<Footer />
	{/if}
{/if}

<!-- <TestQueue /> -->

<style>
	.title {
		text-align: center;
		color: var(--red);
	}
</style>
