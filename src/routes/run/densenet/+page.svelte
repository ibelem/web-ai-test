<script>
	import { beforeUpdate, onMount } from 'svelte';
	import Environment from '$lib/components/Environment.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigModelsManual from '$lib/components/ConfigModelsManual.svelte';
	import Results from '$lib/components/Results.svelte';
	import TestQueue from '$lib/components/TestQueue.svelte';
	import { auto, selectedModels, runAuto } from '../../../lib/assets/js/utils';

	beforeUpdate(() => {});

	onMount(() => {
		if (auto) {
			runAuto();
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
		{#if selectedModels[0] && !auto}
			<button on:click={runAuto}>Run Tests</button>
		{/if}
	</div>

	<Environment />
</div>

<style>
</style>
