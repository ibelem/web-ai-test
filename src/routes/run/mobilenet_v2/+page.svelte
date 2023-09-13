<script>
	import { beforeUpdate, onMount } from 'svelte';
	import Environment from '$lib/components/Environment.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigModelsManual from '$lib/components/ConfigModelsManual.svelte';
	import Results from '$lib/components/Results.svelte';
	import TestQueue from '$lib/components/TestQueue.svelte';
	import { autoStore, modelsStore, testQueueStore } from '../../../lib/store/store';
	import { addResult, filterTestQueue, sleep } from '../../../lib/assets/js/utils';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	/**
	 * @type {boolean}
	 */
	let auto;
	autoStore.subscribe((value) => {
		auto = value;
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
	 * @type {string}
	 */
	let info;

	const random = () => {
		return Math.floor(Math.random() * 2);
	};

	const runTests = async () => {
		if (testQueue[0] && location.pathname.replace('/run/', '') === testQueue[0].model) {
			let t0 = testQueue[0];
			let r = {
				id: t0.id,
				model: t0.model,
				modeltype: t0.modeltype,
				datatype: t0.datatype,
				backend: t0.backend,
				inferencetime: [random(), random(), random(), random(), random()]
			};
			filterTestQueue(t0.id);
			addResult(r);
			runTests();
		} else if (testQueue[0]) {
			console.log(testQueue[0].model);
			let path = `${base}/run/${testQueue[0].model}`;
			info = `Now go to next page to test ${testQueue[0].model}`;
			await sleep(5000);
			goto(path);
		} else {
			info = `Test completed`;
			let path = `${base}/`;
			goto(path);
		}
	};

	beforeUpdate(() => {});

	onMount(() => {
		if (auto) {
			runTests();
		}
	});
</script>

<div>
	{#if !auto}
		<div class="config">
			<ConfigBackends />
			<ConfigModelsManual />
			<ConfigNumOfRuns />
		</div>
	{/if}

	<TestQueue />

	<div class="run">
		{#if selectedModels[0] && !auto}
			<button on:click={runTests}>Run Tests</button>
		{/if}
	</div>

	<div class="info">
		{info}
	</div>
	<Results />
	<Environment />
</div>

<style>
</style>
