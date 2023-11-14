<script>
	import {
		infoStore,
		modelDownloadProgressStore,
		numberOfRunsStore,
		testQueueStore,
		testQueueLengthStore
	} from '$lib/store/store';
	import { getModelIdfromPath, getModelNameById } from '$lib/assets/js/utils';
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
			{testQueue[0].modeltype} · {testQueue[0].datatype} · {testQueue[0].backend} · {#if numOfRuns === 1}
				1 run
			{:else}{numOfRuns} runs{/if}
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
		<div class="g2">
			<div class="next">
				{#if testQueue[1]}
					Next: {testQueue[1].model} · {testQueue[1].modeltype} · {testQueue[1].datatype} · {testQueue[1]
						.backend}
				{/if}
			</div>
			<div class="progressinfo">
				Test queue: {testQueueLength - testQueue.length}/{testQueueLength}
				{percentageTestQueue}% completed
			</div>
		</div>
		<div style="background-color:var(--green); width: {percentageTestQueue}%;" class="bar"></div>
	</div>
{/if}

<style>
	.info {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 0;
		color: var(--font);
		text-align: center;
		width: 50vw;
		border: 1px solid var(--grey-02);
	}

	.g2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		grid-row-gap: 0px;
		margin-top: 20px;
		padding: 0 10px;
	}

	.bar {
		height: 1px;
		margin-top: 10px;
	}

	.infodetails {
		padding: 0;
		overflow: hidden;
		color: var(--red);
		height: 36px;
	}

	.info .s {
		text-align: center;
		margin-bottom: 20px;
	}

	.info .title {
		color: var(--red);
		margin-top: 10px;
	}

	.progressinfo {
		justify-self: right;
	}

	.next {
		justify-self: left;
	}

	@media (max-width: 1024px) {
		.info {
			width: 66vw;
		}
	}

	@media (max-width: 900px) {
		.info {
			width: 75vw;
		}
	}

	@media (max-width: 800px) {
		.info {
			width: 86vw;
		}
	}

	@media (max-width: 512px) {
		.info {
			width: 98vw;
		}
		.g2 {
			display: block;
			padding: 0 10px;
		}
	}
</style>
