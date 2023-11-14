<script>
	import {
		infoStore,
		modelDownloadProgressStore,
		numberOfRunsStore,
		testQueueStore,
		testQueueLengthStore
	} from '$lib/store/store';
	import { getModelIdfromPath, getModelNameById } from '../../lib/assets/js/utils';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

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

	$: percentageTestQueue = (
		((testQueueLength - testQueue.length) * 100) /
		(testQueueLength * 1.0)
	).toFixed(2);

	/**
	 * @type {string[]}
	 */
	let info;
	infoStore.subscribe((value) => {
		info = value;
	});

	/**
	 * @type {string[]}
	 */
	let progress;
	modelDownloadProgressStore.subscribe((value) => {
		progress = value;
	});

	$: getProgress = (model) => {
		let p = progress.find((item) => item.name === model);
		if (p) {
			return p.progress;
		} else {
			return 0;
		}
	};

	$: getLoaded = (model) => {
		let p = progress.find((item) => item.name === model);
		if (p) {
			return p.current;
		} else {
			return 0;
		}
	};

	/**
	 * @type {string}
	 */

	let id = '';

	onMount(() => {
		id = getModelIdfromPath() || '';
	});
</script>

{#if testQueue.length > 0 && $page.url.pathname.length > 1}
	<div class="info">
		<div class="title tq">
			{testQueue[0].model}
		</div>
		<div class="s">
			{testQueue[0].modeltype} · {testQueue[0].datatype} · {#if numOfRuns === 1}
				1 run
			{:else}{numOfRuns} runs{/if} · {testQueue[0].backend}
			{#if getLoaded(id)}
				·
				{#if getProgress(id) === '100.0'}
					<span title="{getModelNameById(id)} downloaded">{getLoaded(id)} MB</span>
				{/if}
				{#if getProgress(id) !== '100.0'}
					<span class="downloadprogress">{getLoaded(id)} MB / {getProgress(id)}%</span>
				{/if}
			{/if}
		</div>
		{#if info.length > 0}
			<div class="infodetails">
				{info.slice(-1)}
			</div>
		{/if}
		<div>
			<span>
				{testQueueLength - testQueue.length}/{testQueueLength}
				{percentageTestQueue}%</span
			>
		</div>
	</div>
{/if}

<style>
	.info {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 10px;
		color: var(--font);
		text-align: center;
		max-width: 60%;
	}

	.info .s {
		text-align: center;
		margin-bottom: 10px;
	}

	.info .title {
		color: var(--red);
	}
</style>
