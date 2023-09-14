<script>
	import Environment from '$lib/components/Environment.svelte';
	import Config from '$lib/components/Config.svelte';
	import TestQueue from '$lib/components/TestQueue.svelte';
	import Results from '$lib/components/Results.svelte';
	import { beforeUpdate, onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { autoStore, testQueueStore } from '../lib/store/store';
	import { resetResult, urlToStoreHome, sleep } from '../lib/assets/js/utils';

	/**
	 * @type {string[]}
	 */
	let testQueue;
	testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	const run = async () => {
		autoStore.update(() => true);
		resetResult();
		sleep(5000);
		let path = `${base}/run/${testQueue[0].model}`;
		goto(path);
	};

	beforeUpdate(() => {
		urlToStoreHome($page.url.searchParams);
	});

	onMount(() => {});

	onDestroy(() => {});
</script>

<div>
	<Config />
	<TestQueue />

	<div class="run">
		{#if testQueue[0]}
			<button on:click={run}>Run Tests</button>
		{/if}
	</div>

	<Results />
	<Environment />
</div>

<style>
</style>
