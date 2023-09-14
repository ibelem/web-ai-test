<script>
	import { beforeUpdate, onMount } from 'svelte';
	import Environment from '$lib/components/Environment.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigModelsManual from '$lib/components/ConfigModelsManual.svelte';
	import Results from '$lib/components/Results.svelte';
	import TestQueue from '$lib/components/TestQueue.svelte';
	import { autoStore, modelsStore, backendsStore, testQueueStore } from '../../../lib/store/store';
	import {
		initResult,
		addResult,
		filterTestQueue,
		sleep,
		random
	} from '../../../lib/assets/js/utils';
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
	 * @type {string}
	 */
	let info;

	const run = async () => {
		if (
			testQueue[0] &&
			location.pathname.replace('/web-ai-benchmark/run/', '').replace('/run/', '') ===
				testQueue[0].model
		) {
			let t0 = testQueue[0];
			let r = {
				id: t0.id,
				model: t0.model,
				modeltype: t0.modeltype,
				datatype: t0.datatype
			};

			for (const prop of selectedBackends) {
				r[prop] = {
					status: 1,
					inference: []
				};
			}

			initResult(r);

			info = `${t0.model}-${t0.modeltype}-${t0.datatype}-${t0.backend} - Start`;
			await sleep(3000);
			addResult(t0.model, t0.modeltype, t0.datatype, t0.backend, 1, []);

			await sleep(5000);
			info = `${t0.model}-${t0.modeltype}-${t0.datatype}-${t0.backend} - Testing`;
			addResult(t0.model, t0.modeltype, t0.datatype, t0.backend, 2, []);

			await sleep(10000);

			addResult(t0.model, t0.modeltype, t0.datatype, t0.backend, 3, [random(), random(), random()]);

			info = `${t0.model}-${t0.modeltype}-${t0.datatype}-${t0.backend} - Completed`;
			filterTestQueue(t0.id);
			run();
		} else if (testQueue[0]) {
			console.log(testQueue[0].model);
			let path = `${base}/run/${testQueue[0].model}`;
			info = `Now go to next page to test ${testQueue[0].model}`;
			await sleep(5000);
			goto(path);
		} else {
			info = `All tests completed`;
			let path = `${base}/`;
			goto(path);
		}
	};

	beforeUpdate(() => {});

	onMount(() => {
		if (auto) {
			run();
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
			<button on:click={run}>Run Tests</button>
		{/if}
	</div>

	{#if info}
		<div class="info">
			{info}
		</div>
	{/if}
	<Results />
	<Environment />
</div>

<style>
</style>
