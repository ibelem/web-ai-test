<script>
	import { backendsStore } from '../store/store';
	import { selectedBackends, updateTestQueue, goTo, resetInfo } from '$lib/assets/js/utils';
	import { onMount } from 'svelte';

	/**
	 * @type {any}
	 */
	const backends = {
		wasm_1: false,
		wasm_4: false,
		webgl: false,
		webgpu: false,
		webnn_cpu_1: false,
		webnn_cpu_4: false,
		webnn_gpu: false,
		webnn_npu: false
	};

	const toggleBackends = () => {
		for (const backend in backends) {
			if (backends.hasOwnProperty(backend)) {
				backends[backend] = !backends[backend];
			}
		}

		const allBackends = [
			'wasm_1',
			'wasm_4',
			'webgl',
			'webgpu',
			'webnn_cpu_1',
			'webnn_cpu_4',
			'webnn_gpu',
			'webnn_npu'
		];

		/**
		 * @type {any}
		 */
		let invertBackends = allBackends.filter((item) => !selectedBackends.includes(item));
		backendsStore.update((arr) => invertBackends);

		updateTestQueue();
		goTo();
		resetInfo();
	};

	const toggleBackend = (/** @type {string} */ backend) => {
		if (backends.hasOwnProperty(backend)) {
			backends[backend] = !backends[backend];
		}

		if (selectedBackends.includes(backend)) {
			backendsStore.update((arr) => {
				const index = arr.indexOf(backend);
				if (index !== -1) {
					arr.splice(index, 1);
				}
				return arr;
			});
		} else {
			backendsStore.update((arr) => [...arr, backend]);
		}

		updateTestQueue();
		goTo();
		resetInfo();
	};

	onMount(() => {
		for (const backend of selectedBackends) {
			backends[backend] = true;
		}
	});
</script>

<div class="title">
	<label class="" title="Toggle backends">
		<input type="checkbox" on:change={() => toggleBackends()} />
		Backend
	</label>
</div>
<div class="backends">
	<div
		class="group {backends.wasm_1 ||
			backends.wasm_4 ||
			backends.webnn_cpu_1 ||
			backends.webnn_cpu_4}"
	>
		<span>CPU</span>
		<div class="block">
			<label id="wasm_1" class={backends.wasm_1.toString()} title="WebAssembly SIMD with 1 thread">
				<input type="checkbox" on:change={() => toggleBackend('wasm_1')} />
				Wasm
			</label>
			<label class={backends.wasm_4.toString()} title="WebAssembly SIMD with 4 threads">
				<input type="checkbox" on:change={() => toggleBackend('wasm_4')} />
				Wasm 4T
			</label>
			<label
				id="webnn_cpu_1"
				class={backends.webnn_cpu_1.toString()}
				title="WebNN CPU with 1 thread"
			>
				<input type="checkbox" on:change={() => toggleBackend('webnn_cpu_1')} />
				WebNN
			</label>
			<label class={backends.webnn_cpu_4.toString()} title="WebNN CPU with 4 threads">
				<input type="checkbox" on:change={() => toggleBackend('webnn_cpu_4')} />
				WebNN 4T
			</label>
		</div>
	</div>
	<div class="group {backends.webgl || backends.webgpu || backends.webnn_gpu}">
		<span>GPU</span>
		<div class="block">
			<label class={backends.webgl.toString()} title="WebGL">
				<input type="checkbox" on:change={() => toggleBackend('webgl')} />
				WebGL
			</label>
			<label class={backends.webgpu.toString()} title="WebGPU">
				<input type="checkbox" on:change={() => toggleBackend('webgpu')} />
				WebGPU
			</label>
			<label class={backends.webnn_gpu.toString()} title="WebNN GPU">
				<input type="checkbox" on:change={() => toggleBackend('webnn_gpu')} />
				WebNN
			</label>
		</div>
	</div>

	<div class="group {backends.webnn_npu}">
		<span>NPU</span>
		<div class="block">
			<label class={backends.webnn_npu.toString()} title="WebNN NPU">
				<input type="checkbox" on:change={() => toggleBackend('webnn_npu')} />
				WebNN
			</label>
		</div>
	</div>
</div>

<style>
</style>
