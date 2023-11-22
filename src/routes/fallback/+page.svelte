<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import { models, ortDists } from '$lib/config';
	import { beforeUpdate, onMount, onDestroy } from 'svelte';
	import { loadScript } from '$lib/assets/js/utils';

	beforeUpdate(() => {});

	onMount(async () => {});

	onDestroy(() => {});

	const fallbackCheck = (/** @type {string} */ id) => {
		const worker = new Worker(ortDists.webnn_webglfix.workerjs);
		worker.postMessage(models);

		worker.onmessage = (event) => {
			const outputData = event.data;
			console.log(outputData);
			// Handle the output received from the worker
		};
	};
</script>

<Header />

<div class="tqtitle">
	<div class="title tq">WebNN Fallback Checker (WIP)</div>
</div>

<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			<span>{m.id} </span>
		{/if}
	{/each}
</div>

<div class="run">
	<button on:click={() => fallbackCheck('mobilenet_v2')}>Check WebNN Fallbacks</button>
</div>

<Environment />
<Footer />

<style>
	.title {
		text-align: center;
		color: var(--red);
	}

	.tq {
		margin-bottom: 20px;
	}

	.tq .q.tests {
		display: flex;
		align-items: center;
	}

	.tq .q.tests a {
		margin-left: 20px;
	}

	.tq .q.tests a:hover {
		color: var(--orange);
	}
</style>
