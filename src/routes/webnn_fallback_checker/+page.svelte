<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import { models } from '$lib/config';
	import { beforeUpdate, onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';

	beforeUpdate(() => {});

	onMount(() => {});

	onDestroy(() => {});

	// self.addEventListener('message', async (event) => {
	// 	const { modelPath, inputData } = event.data;

	// 	// Load the ONNX model using the provided model path
	// 	const session = await InferenceSession.create({ modelUrl: modelPath });

	// 	// Perform inference with the input data
	// 	const output = await session.run(inputData);

	// 	// Send the output back to the main thread
	// 	self.postMessage(output);
	// });

	// 	// Create a Web Worker
	// const worker = new Worker('path_to_your_worker_script.js');

	// // Define the input data and model path
	// const inputData = /* your input data */;
	// const modelPath = 'path_to_your_onnx_model.onnx';

	// // Send data to the Web Worker
	// worker.postMessage({ modelPath, inputData });

	// // Receive output from the Web Worker
	// worker.onmessage = (event) => {
	// 	const outputData = event.data;
	// 	// Handle the output received from the worker
	// };
	const fallbackCheck = () => {};
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
	<button on:click={fallbackCheck}>Check WebNN Fallbacks</button>
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
