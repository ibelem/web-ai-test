<script>
	import {
		infoStore,
		modelDownloadProgressStore,
		numberOfRunsStore,
		testQueueStore,
		testQueueLengthStore
	} from '$lib/store/store';
	import {
		getModelIdfromPath,
		getModelNameById,
		getModelExternalDataNameById,
		resetStore
	} from '$lib/assets/js/utils';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';
	import LiteRtBlue from './svg/LiteRTBlue.svelte';
	import OnnxCustom from './svg/OnnxCustom.svelte';
	import Clear from './svg/Clear.svelte';
	import Rerun from './svg/Rerun.svelte';

	let numOfRuns = $state(0);
	const unsubNumOfRuns = numberOfRunsStore.subscribe((value) => {
		numOfRuns = value;
	});

	let testQueue = $state([]);
	const unsubTestQueue = testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	let testQueueLength = $state(0);
	const unsubTestQueueLength = testQueueLengthStore.subscribe((value) => {
		testQueueLength = value;
	});

	let percentageTestQueue = $derived(
		((testQueueLength - testQueue.length) * 100 / (testQueueLength * 1.0)).toFixed(2)
	);

	let info = $state([]);
	const unsubInfo = infoStore.subscribe((value) => {
		info = value;
	});

	let progress = $state([]);
	const unsubProgress = modelDownloadProgressStore.subscribe((value) => {
		progress = value;
	});

	onDestroy(() => {
		unsubNumOfRuns();
		unsubTestQueue();
		unsubTestQueueLength();
		unsubInfo();
		unsubProgress();
	});

	const getProgress = (model) => {
		let p = progress.find((item) => item.name === model);
		return p ? p.progress : 0;
	};

	const getLoaded = (model) => {
		let p = progress.find((item) => item.name === model);
		return p ? p.current : 0;
	};

	let isLiteRT = $derived(page.url.pathname.includes('tflite'));

	let id = $state('');

	const reRun = () => {
		resetStore();
		window.location.reload();
	};

	onMount(() => {
		id = getModelIdfromPath() || '';
	});
</script>

{#if testQueue.length > 0 && page.url.pathname.length > 1}
	{#if isLiteRT}
		<div class="mlframework litertblue">
			<LiteRtBlue />
		</div>
	{:else}
		<div class="mlframework onnx">
			<OnnxCustom />
		</div>
	{/if}

	<div class="info">
		<div class="title tq {testQueue[0].datatype} testing">
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
					<span class="downloadprogress">&nbsp;{getLoaded(id)} MB / {getProgress(id)}%</span>
				{/if}
			{/if}
		</div>
		{#if info.length > 0}
			<div class="infodetails {testQueue[0].datatype}">
				{info.slice(-1)}
			</div>
			{#if getModelExternalDataNameById(id)}
				<div class="infodetails {testQueue[0].datatype}">
					External data {getModelExternalDataNameById(id)} need to be downloaded, please expect longer
					time.
				</div>
			{/if}
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
	<div class="re-run">
		<div>
			<button class="" onclick={reRun}><Clear /> <Rerun /> Re-run {testQueue[0].model}</button>
			Clicking this button will clear the entire test queue and test results
		</div>
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

	.re-run {
		position: fixed;
    bottom: 0;
    left: 0;
    padding: 0;
    color: var(--font);
    text-align: center;
		padding: 10px 0;
		margin: 0 auto;
		display: block;
		width: 100%;
	}

	.re-run div {
		display: grid;
		grid-template-columns: 1fr;
		justify-items: center;
		color: var(--font-01);
	}

	.re-run:hover div {
		display: grid;
		grid-template-columns: 1fr;
		justify-items: center;
		color: var(--font);
	}

	.re-run button {
		background-color: transparent;
		color: var(--font-01);
		border: 1px solid var(--font-01);
		padding: 6px 20px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-items: center;
		margin-bottom: 6px;
		border-radius: 3px;
		text-transform: uppercase;
	}

	.re-run:hover div button {
		color: var(--font);
		border: 1px solid var(--font);
	}

	.re-run div button:hover {
		color: var(--googlegreen);
		border: 1px solid var(--googlegreen);
	}

	.testing {
		margin-top: 15px !important;
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

	.infodetails.fp16 {
		color: var(--fp16);
	}

	.infodetails.int8 {
		color: var(--p);
	}

	.infodetails.int4 {
		color: var(--int4);
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

	.mlframework {
		position: fixed;
    top: 30px;
    left: 50%;
    transform: translate(-50%, -50%);
		width: 120px;
		padding: 10px 20px;
		display: inline-block;
		text-align: center;
	}

	.litertblue {
		background-color: #000D59; 
	}

	.onnx {
		background-color: #fafafa; 
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
			margin: 0;
		}
		.g2 {
			display: block;
			padding: 0 10px;
		}
		.g2 .progressinfo,
		.g2 .next {
			justify-self: center;
		}
	}
</style>
