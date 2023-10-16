<script>
	import { testQueueStore, testQueueLengthStore, backendsStore } from '$lib/store/store';
	import {
		getModelNameById,
		getModelHFUrlById,
		copyResults,
		copyRawInference,
		downloadScreenshot
	} from '$lib/assets/js/utils';
	import { resultsStore } from '$lib/store/store';
	import ArrowOutward from './svg/ArrowOutward.svelte';
	import Info from './Info.svelte';
	import Copy from './svg/Copy.svelte';
	import FileCopy from './svg/FileCopy.svelte';
	import Fail from './svg/Fail.svelte';
	import Queue from './svg/Queue.svelte';
	import Testing from './svg/Testing.svelte';
	import Onnx from './svg/Onnx.svelte';
	import Tflite from './svg/Tflite.svelte';
	import Npy from './svg/Npy.svelte';
	import Pt from './svg/Pt.svelte';
	import Screenshot from './svg/Screenshot.svelte';

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
	let results;
	resultsStore.subscribe((value) => {
		results = value;
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
</script>

<Info />

{#if results.length > 0}
	<div class="rqtitle">
		<div class="title rq">Inference Time (Median)</div>
	</div>
	<div class="result" id="result">
		<div class="q title _{selectedBackends.length}">
			<div class="m">Model</div>
			<div class="mt"><span class="hide">Model </span>Type</div>
			<div class="dt">Operand <span class="hide">Type</span></div>
			{#if results[0].wasm_1 && results[0].wasm_1.status !== 0}<div class="backend">
					<span title="WebAssembly SIMD with 1 Thread">Wasm 1T</span>
				</div>{/if}
			{#if results[0].wasm_4 && results[0].wasm_4.status !== 0}<div class="backend">
					<span title="WebAssembly SIMD with 4 Threads">Wasm 4T</span>
				</div>{/if}
			{#if results[0].webgl && results[0].webgl.status !== 0}<div class="backend">
					<span title="WebGL">WebGL</span>
				</div>{/if}
			{#if results[0].webgpu && results[0].webgpu.status !== 0}<div class="backend">
					<span title="WebGPU">WebGPU</span>
				</div>{/if}
			{#if results[0].webnn_cpu_1 && results[0].webnn_cpu_1.status !== 0}<div class="backend">
					<span title="WebNN CPU with 1 Thread"><span class="hide">Web</span>NN CPU 1T</span>
				</div>{/if}
			{#if results[0].webnn_cpu_4 && results[0].webnn_cpu_4.status !== 0}<div class="backend">
					<span title="WebNN CPU with 4 Threads"><span class="hide">Web</span>NN CPU 4T</span>
				</div>{/if}
			{#if results[0].webnn_gpu && results[0].webnn_gpu.status !== 0}<div class="backend">
					<span title="WebNN GPU"><span class="hide">Web</span>NN GPU</span>
				</div>{/if}
			{#if results[0].webnn_npu && results[0].webnn_npu.status !== 0}<div class="backend">
					<span title="WebNN NPU"><span class="hide">Web</span>NN NPU</span>
				</div>{/if}
		</div>

		{#each Object.entries(results) as [index, key]}
			<div class="q _{selectedBackends.length}">
				<div class="m">
					{getModelNameById(key.model)}

					<a
						title="WebNN support status of {getModelNameById(key.model)}"
						href="https://ibelem.github.io/netron/?url={getModelHFUrlById(key.model)}"
						><ArrowOutward /></a
					>
				</div>

				{#if key.modeltype === 'onnx'}
					<div class="{key.modeltype} mt">
						<Onnx />
					</div>
				{/if}

				{#if key.modeltype === 'tflite'}
					<div class="{key.modeltype} mt">
						<Tflite />
					</div>
				{/if}

				{#if key.modeltype === 'npy'}
					<div class="{key.modeltype} mt"><Npy /></div>
				{/if}

				{#if key.modeltype === 'pt'}
					<div class="{key.modeltype} mt"><Pt /></div>
				{/if}

				<div class="{key.datatype} dt">{key.datatype}</div>

				{#if key.wasm_1 && key.wasm_1.status !== 0}
					{#if key.wasm_1.status === 1}
						<div class="status_{key.wasm_1.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.wasm_1.status === 2}
						<div class="status_{key.wasm_1.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.wasm_1.status === 3}
						<div
							class="status_{key.wasm_1.status} s backend"
							title="Warmup Time: {key.wasm_1.warmup.toString()} ms; Inference Time (Median): {key
								.wasm_1.inferencemedian} ms; Inference Times: [{key.wasm_1.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.wasm_1.inferencemedian}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Warmup Time: ${key.wasm_1.warmup.toString()} ms; Inference Time (Median): ${
											key.wasm_1.inferencemedian
										} ms; Inference Times: [${key.wasm_1.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.wasm_1.status === 4}
						<div class="status_{key.wasm_1.status} s" title={key.wasm_1.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.wasm_4 && key.wasm_4.status !== 0}
					{#if key.wasm_4.status === 1}
						<div class="status_{key.wasm_4.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.wasm_4.status === 2}
						<div class="status_{key.wasm_4.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.wasm_4.status === 3}
						<div
							class="status_{key.wasm_4.status} s backend"
							title="Warmup Time: {key.wasm_4.warmup.toString()} ms; Inference Time (Median): {key
								.wasm_4.inferencemedian} ms; Inference Times: [{key.wasm_4.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.wasm_4.inferencemedian}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Warmup Time: ${key.wasm_4.warmup.toString()} ms; Inference Time (Median): ${
											key.wasm_4.inferencemedian
										} ms; Inference Times: [${key.wasm_4.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.wasm_4.status === 4}
						<div class="status_{key.wasm_4.status} s" title={key.wasm_4.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webgl && key.webgl.status !== 0}
					{#if key.webgl.status === 1}
						<div class="status_{key.webgl.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webgl.status === 2}
						<div class="status_{key.webgl.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webgl.status === 3}
						<div
							class="status_{key.webgl.status} s backend"
							title="Warmup Time: {key.webgl.warmup.toString()} ms; Inference Time (Median): {key
								.webgl.inferencemedian} ms; Inference Times: [{key.webgl.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webgl.inferencemedian}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Warmup Time: ${key.webgl.warmup.toString()} ms; Inference Time (Median): ${
											key.webgl.inferencemedian
										} ms; Inference Times: [${key.webgl.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webgl.status === 4}
						<div class="status_{key.webgl.status} s" title={key.webgl.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webgpu && key.webgpu.status !== 0}
					{#if key.webgpu.status === 1}
						<div class="status_{key.webgpu.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webgpu.status === 2}
						<div class="status_{key.webgpu.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webgpu.status === 3}
						<div
							class="status_{key.webgpu.status} s backend"
							title="Warmup Time: {key.webgpu.warmup.toString()} ms; Inference Time (Median): {key
								.webgpu.inferencemedian} ms; Inference Times: [{key.webgpu.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webgpu.inferencemedian}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Warmup Time: ${key.webgpu.warmup.toString()} ms; Inference Time (Median): ${
											key.webgpu.inferencemedian
										} ms; Inference Times: [${key.webgpu.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webgpu.status === 4}
						<div class="status_{key.webgpu.status} s" title={key.webgpu.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webnn_cpu_1 && key.webnn_cpu_1.status !== 0}
					{#if key.webnn_cpu_1.status === 1}
						<div class="status_{key.webnn_cpu_1.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webnn_cpu_1.status === 2}
						<div class="status_{key.webnn_cpu_1.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webnn_cpu_1.status === 3}
						<div
							class="status_{key.webnn_cpu_1.status} s backend"
							title="Warmup Time: {key.webnn_cpu_1.warmup.toString()} ms; Inference Time (Median): {key
								.webnn_cpu_1.inferencemedian} ms; Inference Times: [{key.webnn_cpu_1.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webnn_cpu_1.inferencemedian}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Warmup Time: ${key.webnn_cpu_1.warmup.toString()} ms; Inference Time (Median): ${
											key.webnn_cpu_1.inferencemedian
										} ms; Inference Times: [${key.webnn_cpu_1.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_cpu_1.status === 4}
						<div class="status_{key.webnn_cpu_1.status} s" title={key.webnn_cpu_1.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webnn_cpu_4 && key.webnn_cpu_4.status !== 0}
					{#if key.webnn_cpu_4.status === 1}
						<div class="status_{key.webnn_cpu_4.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webnn_cpu_4.status === 2}
						<div class="status_{key.webnn_cpu_4.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webnn_cpu_4.status === 3}
						<div
							class="status_{key.webnn_cpu_4.status} s backend"
							title="Warmup Time: {key.webnn_cpu_4.warmup.toString()} ms; Inference Time (Median): {key
								.webnn_cpu_4.inferencemedian} ms; Inference Times: [{key.webnn_cpu_4.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webnn_cpu_4.inferencemedian}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Warmup Time: ${key.webnn_cpu_4.warmup.toString()} ms; Inference Time (Median): ${
											key.webnn_cpu_4.inferencemedian
										} ms; Inference Times: [${key.webnn_cpu_4.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_cpu_4.status === 4}
						<div class="status_{key.webnn_cpu_4.status} s" title={key.webnn_cpu_4.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webnn_gpu && key.webnn_gpu.status !== 0}
					{#if key.webnn_gpu.status === 1}
						<div class="status_{key.webnn_gpu.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webnn_gpu.status === 2}
						<div class="status_{key.webnn_gpu.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webnn_gpu.status === 3}
						<div
							class="status_{key.webnn_gpu.status} s backend"
							title="Warmup Time: {key.webnn_gpu.warmup.toString()} ms; Inference Time (Median): {key
								.webnn_gpu.inferencemedian} ms; Inference Times: [{key.webnn_gpu.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webnn_gpu.inferencemedian}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Warmup Time: ${key.webnn_gpu.warmup.toString()} ms; Inference Time (Median): ${
											key.webnn_gpu.inferencemedian
										} ms; Inference Times: [${key.webnn_gpu.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_gpu.status === 4}
						<div class="status_{key.webnn_gpu.status} s" title={key.webnn_gpu.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webnn_npu && key.webnn_npu.status !== 0}
					{#if key.webnn_npu.status === 1}
						<div class="status_{key.webnn_npu.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webnn_npu.status === 2}
						<div class="status_{key.webnn_npu.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webnn_npu.status === 3}
						<div
							class="status_{key.webnn_npu.status} s backend"
							title="Warmup Time: {key.webnn_npu.warmup.toString()} ms; Inference Time (Median): {key
								.webnn_npu.inferencemedian} ms; Inference Times: [{key.webnn_npu.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webnn_npu.inferencemedian}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Warmup Time: ${key.webnn_npu.warmup.toString()} ms; Inference Time (Median): ${
											key.webnn_npu.inferencemedian
										} ms; Inference Times: [${key.webnn_npu.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_npu.status === 4}
						<div class="status_{key.webnn_npu.status} s" title={key.webnn_npu.error}>
							<Fail />
						</div>
					{/if}
				{/if}
			</div>
		{/each}
	</div>
	<div class="q copy">
		<div>
			<span>
				{testQueueLength - testQueue.length}/{testQueueLength}
				{percentageTestQueue}%</span
			>
			{#if testQueue.length === 0}
				<button title="Download screenshot of test results" on:click={() => downloadScreenshot()}>
					<Screenshot />
				</button>
				<button title="Copy full test results" on:click={() => copyResults()}>
					<FileCopy />
				</button>
			{/if}
		</div>
	</div>
{/if}
