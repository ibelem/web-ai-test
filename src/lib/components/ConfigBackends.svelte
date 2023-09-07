<script>
	import { backendsStore, dataTypesStore, modelTypesStore, modelsStore } from '../store';
	import { models } from '$lib/config';
	import { testQueue } from '$lib/assets/js/utils';
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

	/**
	 * @type {string[]}
	 */
	let selectedBackends;
	const unsubscribeBackends = backendsStore.subscribe((value) => {
		selectedBackends = value;
	});

	/**
	 * @type {string[]}
	 */
	let selectedModelTypes;
	const unsubscribeModelTypes = modelTypesStore.subscribe((value) => {
		selectedModelTypes = value;
	});

	/**
	 * @type {string[]}
	 */
	let selectedDataTypes;
	const unsubscribeDataTypes = dataTypesStore.subscribe((value) => {
		selectedDataTypes = value;
	});

	/**
	 * @type {string[]}
	 */
	let selectedModels;
	const unsubscribeModels = modelsStore.subscribe((value) => {
		selectedModels = value;
	});

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
		testQueue(models, selectedModels, selectedBackends, selectedDataTypes, selectedModelTypes);
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

		testQueue(models, selectedModels, selectedBackends, selectedDataTypes, selectedModelTypes);
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
	<div class="group {backends.wasm_1 || backends.wasm_4}">
		<span>Wasm</span>
		<label class={backends.wasm_1.toString()} title="WebAssembly SIMD with 1 thread">
			<input type="checkbox" on:change={() => toggleBackend('wasm_1')} />
			1T
		</label>
		<label class={backends.wasm_4.toString()} title="WebAssembly SIMD with 4 threads">
			<input type="checkbox" on:change={() => toggleBackend('wasm_4')} />
			4T
		</label>
	</div>
	<label class="extra {backends.webgl.toString()}" title="WebGL">
		<input type="checkbox" on:change={() => toggleBackend('webgl')} />
		WebGL
	</label>
	<label class="extra {backends.webgpu.toString()}" title="WebGPU">
		<input type="checkbox" on:change={() => toggleBackend('webgpu')} />
		WebGPU
	</label>
	<div
		class="group {backends.webnn_cpu_1 ||
			backends.webnn_cpu_4 ||
			backends.webnn_gpu ||
			backends.webnn_npu}"
	>
		<span>WebNN</span>
		<label class={backends.webnn_cpu_1.toString()} title="WebNN CPU with 1 thread">
			<input type="checkbox" on:change={() => toggleBackend('webnn_cpu_1')} />
			CPU 1T
		</label>
		<label class={backends.webnn_cpu_4.toString()} title="WebNN CPU with 4 threads">
			<input type="checkbox" on:change={() => toggleBackend('webnn_cpu_4')} />
			CPU 4T
		</label>
		<label class={backends.webnn_gpu.toString()} title="WebNN GPU">
			<input type="checkbox" on:change={() => toggleBackend('webnn_gpu')} />
			GPU
		</label>
		<label class={backends.webnn_npu.toString()} title="WebNN NPU">
			<input type="checkbox" on:change={() => toggleBackend('webnn_npu')} />
			NPU
		</label>
	</div>
</div>

<style>
</style>
