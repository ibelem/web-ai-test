<script>
	import {
		median,
		copyResults,
		copyInfo,
		selectedBackends,
		copyRawInference
	} from '$lib/assets/js/utils';
	import { resultsStore } from '$lib/store/store';
	import Info from './Info.svelte';
	import Copy from './svg/Copy.svelte';
	import Log from './svg/Log.svelte';
	import Complete from './svg/Complete.svelte';
	import Fail from './svg/Fail.svelte';
	import Queue from './svg/Queue.svelte';
	import Testing from './svg/Testing.svelte';
	import Onnx from './svg/Onnx.svelte';
	import Tflite from './svg/Tflite.svelte';
	import Npy from './svg/Npy.svelte';
	import Pt from './svg/Pt.svelte';

	/**
	 * @type {string[]}
	 */
	export let results;
	resultsStore.subscribe((value) => {
		results = value;
	});
</script>

<Info />

{#if results.length > 0}
	<div class="result">
		<div class="q title _{selectedBackends.length}">
			<div class="m">Model</div>
			<div class="mt">Model Type</div>
			<div class="dt">Data Type</div>
			{#if selectedBackends && selectedBackends.length > 0}
				{#each selectedBackends as backend}
					<div class="backend">
						{#if backend === 'wasm_1'}
							Wasm 1 thread
						{/if}
						{#if backend === 'wasm_4'}
							Wasm 4 threads
						{/if}
						{#if backend === 'webgl'}
							WebGL
						{/if}
						{#if backend === 'webgpu'}
							WebGPU
						{/if}
						{#if backend === 'webnn_cpu_1'}
							WebNN CPU 1 thread
						{/if}
						{#if backend === 'webnn_cpu_4'}
							WebNN CPU 4 threads
						{/if}
						{#if backend === 'webnn_gpu'}
							WebNN GPU
						{/if}
						{#if backend === 'webnn_npu'}
							WebNN NPU
						{/if}
						(Median)
					</div>
				{/each}
			{/if}
		</div>
		{#each Object.entries(results) as [index, key]}
			<div class="q _{selectedBackends.length}">
				<div class="m">{key.model}</div>

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
							title={key.wasm_1.inference.toString()}
						>
							<Complete />
							<span>
								{median(key.wasm_1.inference, key.wasm_1.inference.length)}
							</span>
							<button on:click={() => copyRawInference(key.wasm_1.inference)}>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.wasm_1.status === 4}
						<div class="status_{key.wasm_1.status} s">
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
							title={key.wasm_4.inference.toString()}
						>
							<Complete />
							<span>
								{median(key.wasm_4.inference, key.wasm_4.inference.length)}
							</span>
							<button on:click={() => copyRawInference(key.wasm_4.inference)}>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.wasm_4.status === 4}
						<div class="status_{key.wasm_4.status} s">
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
						<div class="status_{key.webgl.status} s backend" title={key.webgl.inference.toString()}>
							<Complete />
							<span>
								{median(key.webgl.inference, key.webgl.inference.length)}
							</span>
							<button on:click={() => copyRawInference(key.webgl.inference)}>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webgl.status === 4}
						<div class="status_{key.webgl.status} s">
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
							title={key.webgpu.inference.toString()}
						>
							<Complete />
							<span>
								{median(key.webgpu.inference, key.webgpu.inference.length)}
							</span>
							<button on:click={() => copyRawInference(key.webgpu.inference)}>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webgpu.status === 4}
						<div class="status_{key.webgpu.status} s">
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
							title={key.webnn_cpu_1.inference.toString()}
						>
							<Complete />
							<span>
								{median(key.webnn_cpu_1.inference, key.webnn_cpu_1.inference.length)}
							</span>
							<button on:click={() => copyRawInference(key.webnn_cpu_1.inference)}>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_cpu_1.status === 4}
						<div class="status_{key.webnn_cpu_1.status} s">
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
							title={key.webnn_cpu_4.inference.toString()}
						>
							<Complete />
							<span>
								{median(key.webnn_cpu_4.inference, key.webnn_cpu_4.inference.length)}
							</span>
							<button on:click={() => copyRawInference(key.webnn_cpu_4.inference)}>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_cpu_4.status === 4}
						<div class="status_{key.webnn_cpu_4.status} s">
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
							title={key.webnn_gpu.inference.toString()}
						>
							<Complete />
							<span>
								{median(key.webnn_gpu.inference, key.webnn_gpu.inference.length)}
							</span>
							<button on:click={() => copyRawInference(key.webnn_gpu.inference)}>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_gpu.status === 4}
						<div class="status_{key.webnn_gpu.status} s">
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
							title={key.webnn_npu.inference.toString()}
						>
							<Complete />
							<span>
								{median(key.webnn_npu.inference, key.webnn_npu.inference.length)}
							</span>
							<button on:click={() => copyRawInference(key.webnn_npu.inference)}>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_npu.status === 4}
						<div class="status_{key.webnn_npu.status} s">
							<Fail />
						</div>
					{/if}
				{/if}
			</div>
		{/each}
		<div class="q copy">
			<div>
				<button title="Copy full test results" on:click={() => copyResults()}>
					<Copy />
				</button>
				<button title="Copy full test logs" on:click={() => copyInfo()}>
					<Log />
				</button>
			</div>
		</div>
	</div>
{/if}
