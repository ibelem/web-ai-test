<script>
	import { beforeUpdate, onMount } from 'svelte';
	import Environment from '$lib/components/Environment.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigModelsManual from '$lib/components/ConfigModelsManual.svelte';
	import Results from '$lib/components/Results.svelte';
	import TestQueue from '$lib/components/TestQueue.svelte';
	import { auto, run, resetResult, resetInfo } from '../../../lib/assets/js/utils';
	import { autoStore, testQueueStore } from '$lib/store/store';

	/**
	 * @type {string[]}
	 */
	export let testQueue;
	testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	const runManual = () => {
		autoStore.update(() => false);
		resetResult();
		resetInfo();
		run();
	};

	beforeUpdate(() => {});

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
			<ConfigModelsManual />
			<ConfigNumOfRuns />
		</div>
	{/if}

	<Results />
	<TestQueue />
	<div class="run">
		{#if testQueue.length > 0 && !auto}
			<button on:click={runManual}>Run Manual Tests</button>
		{/if}
	</div>

	<Environment />
</div>

<style>
</style>
