<script>
	import Environment from '$lib/components/Environment.svelte';
	import Config from '$lib/components/Config.svelte';
	import TestQueue from '$lib/components/TestQueue.svelte';
	import { beforeUpdate, onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { autoStore, modelsStore } from '../lib/store/store';
	import { urlToStoreHome, clearTestQueue, resetStore } from '../lib/assets/js/utils';

	/**
	 * @type {string[]}
	 */
	let selectedModels;
	modelsStore.subscribe((value) => {
		selectedModels = value;
	});

	const runTests = () => {
		autoStore.update(() => true);
		let path = `${base}/onnx/${selectedModels[0]}`;
		goto(path);
	};

	beforeUpdate(() => {
		console.log($page.url.searchParams);
		urlToStoreHome($page.url.searchParams);
	});

	onMount(() => {});
</script>

<div>
	<Config />
	<TestQueue />

	<div class="temp">
		{#if selectedModels[0]}
			<button on:click|once={runTests}>Run Tests</button>
		{/if}
		<button on:click|once={clearTestQueue}> Clear Test Queue </button>
		<button on:click|once={resetStore}> Reset Store </button>
	</div>

	<Environment />
</div>

<style>
	.temp {
		text-align: center;
		margin-top: 1em;
	}
	button {
		padding: 4px 16px;
		background-color: var(--green);
		border: 1px solid var(--green);
		color: white;
		display: inline-block;
		margin: 10px;
		cursor: pointer;
		box-shadow:
			var(--green) 0px 10px 20px -12px,
			var(--green) 0px 18px 16px -18px;
	}

	button:hover {
		background-color: var(--pink);
		border: 1px solid var(--pink);
		box-shadow:
			var(--pink) 0px 6px 12px -8px,
			var(--pink) 0px 12px 10px -12px;
	}
</style>
