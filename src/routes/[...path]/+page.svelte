<script>
	// @ts-ignore
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { config, environment, models } from '$lib/config.js';
	import { getGpu } from '$lib/assets/js/utils.js';
	// @ts-ignore
	import { UAParser } from 'ua-parser-js';

	// @ts-ignore
	export let data;
	/**
	 * @type { string[] | null }
	 */
	let path = data.params.path.toLowerCase().trim().split('/');
	const paths = {
		backend: path[0].trim(),
		numRuns: path[1].trim(),
		numWarmups: path[2].trim(),
		modelId: path[3].trim()
	};

	const setBackend = (/** @type {string} */ backend) => {
		if (backend === 'wasm') {
			config.backend.wasm = true;
		}
		if (backend === 'webnngl') {
			config.backend.webgl = true;
		}
		if (backend === 'webgpu') {
			config.backend.webgpu = true;
		}
		if (backend === 'webnn_cpu') {
			config.backend.webnn.cpu = true;
		}
		if (backend === 'webnn_gpu') {
			config.backend.webnn.gpu = true;
		}
		if (backend === 'webnn_npu') {
			config.backend.webnn.npu = true;
		}
	};

	const setThreads = (/** @type {string} */ backend, /** @type {string} */ i) => {
		if (backend === 'wasm' && i === '1') {
			config.backend.wasm = true;
			config.wasm.threads.one = true;
		}
		if (backend === 'wasm' && i === '2') {
			config.backend.wasm = true;
			config.wasm.threads.two = true;
		}
		if (backend === 'wasm' && i === '4') {
			config.backend.wasm = true;
			config.wasm.threads.four = true;
		}
		if (backend === 'webnn_cpu' && i === '1') {
			config.backend.webnn.cpu = true;
			config.webnn.cpu.threads.one = true;
		}
		if (backend === 'webnn_cpu' && i === '2') {
			config.backend.webnn.cpu = true;
			config.webnn.cpu.threads.two = true;
		}
		if (backend === 'webnn_cpu' && i === '4') {
			config.backend.webnn.cpu = true;
			config.webnn.cpu.threads.four = true;
		}
	};

	const handlePathThreads = (/** @type {string} */ backend, /** @type {string} */ threadsNum) => {
		let threads = threadsNum.split('');
		for (let t of threads) {
			setThreads(backend, t.trim());
		}
	};

	const handlePathBackends = (backend) => {
		if (backend.indexOf('-') > -1) {
			handlePathThreads(backend.split('-')[0].trim(), backend.split('-')[1].trim());
		} else {
			if (backend.trim() === 'wasm' || backend.trim() === 'webnn_cpu') {
				handlePathThreads(backend.trim(), '1');
			} else if (backend.trim() === 'webnn_gpu') {
				config.backend.webnn.gpu = true;
			} else if (backend.trim() === 'webnn_npu') {
				config.backend.webnn.npu = true;
			} else {
				config.backend[backend.trim()] = true;
			}
		}
	};

	const updateConfig = () => {
		if (paths.backend.indexOf(',') > -1) {
			let backends = paths.backend.split(',');
			for (let backend of backends) {
				console.log('___________' + backend);
				handlePathBackends(backend);
			}
		} else {
			handlePathBackends(paths.backend.trim());
		}
	};

	const changeBackend = () => {
		if (config.backend.all) {
			config.backend.wasm = true;
			if (!config.wasm.threads.one && !config.wasm.threads.two && !config.wasm.threads.four) {
				config.wasm.threads.one = true;
			}
			config.backend.webgl = true;
			config.backend.webgpu = true;
			config.backend.webnn.cpu = true;
			if (
				!config.webnn.cpu.threads.one &&
				!config.webnn.cpu.threads.two &&
				!config.webnn.cpu.threads.four
			) {
				config.webnn.cpu.threads.one = true;
			}
			config.backend.webnn.gpu = true;
			config.backend.webnn.npu = true;
			config.backend.all = true;
		} else {
			config.backend.wasm = false;
			config.backend.webgl = false;
			config.backend.webgpu = false;
			config.backend.webnn.cpu = false;
			config.backend.webnn.gpu = false;
			config.backend.webnn.npu = false;
			config.backend.all = false;
			config.wasm.threads.one = false;
			config.wasm.threads.two = false;
			config.wasm.threads.four = false;
			config.webnn.cpu.threads.one = false;
			config.webnn.cpu.threads.two = false;
			config.webnn.cpu.threads.four = false;
		}
		console.log(config);
	};

	const changeWasm = () => {
		if (!config.backend.wasm) {
			config.wasm.threads.one = false;
			config.wasm.threads.two = false;
			config.wasm.threads.four = false;
		} else if (!config.wasm.threads.one && !config.wasm.threads.two && !config.wasm.threads.four) {
			config.wasm.threads.one = true;
		}
	};

	const changeWasmThreads = () => {
		if (!config.wasm.threads.one && !config.wasm.threads.two && !config.wasm.threads.four) {
			config.backend.wasm = false;
		} else {
			config.backend.wasm = true;
		}
	};

	const changeWebnncpuThreads = () => {
		if (
			!config.webnn.cpu.threads.one &&
			!config.webnn.cpu.threads.two &&
			!config.webnn.cpu.threads.four
		) {
			config.backend.webnn.cpu = false;
		} else {
			config.backend.webnn.cpu = true;
		}
	};

	const changeWebnncpu = () => {
		if (!config.backend.webnn.cpu) {
			config.webnn.cpu.threads.one = false;
			config.webnn.cpu.threads.two = false;
			config.webnn.cpu.threads.four = false;
		} else if (
			!config.webnn.cpu.threads.one &&
			!config.webnn.cpu.threads.two &&
			!config.webnn.cpu.threads.four
		) {
			config.webnn.cpu.threads.one = true;
		}
	};

	const selectModel = (/** @type {number} */ i) => {
		models[i].selected = !models[i].selected;
	};

	const changeModel = () => {
		if (!models[0].selected) {
			models.forEach((model) => {
				model.selected = true;
				console.log(model.selected);
			});
		} else {
			models.forEach((model) => {
				model.selected = false;
				console.log(model.selected);
			});
		}
	};

	onMount(() => {
		let parser = UAParser(navigator.userAgent);
		environment.cpu = parser.cpu.architecture;
		environment.logicCores = navigator.hardwareConcurrency;
		environment.gpu = getGpu();
		environment.os = parser.os.name;
		environment.osVersion = parser.os.version;
		environment.webbrowser = parser.browser.name;
		environment.browserVersion = parser.browser.version;

		updateConfig();
	});
</script>

<div>
	<div class="config">
		<div class="options">
			<div>
				<label>
					<input type="checkbox" bind:checked={config.backend.all} on:change={changeBackend} />
					{#if config.backend.all}Backend{:else}Backend{/if}
				</label>
			</div>
			<div class="option">
				<div class="group">
					<label class={config.backend.wasm.toString()} title="Web Assembly SIMD">
						<input type="checkbox" bind:checked={config.backend.wasm} on:change={changeWasm} />
						Wasm
					</label>
					<label class="{config.wasm.threads.one.toString()} sub" title="1 thread">
						<input
							type="checkbox"
							bind:checked={config.wasm.threads.one}
							on:change={changeWasmThreads}
						/>
						1
					</label>
					<label class="{config.wasm.threads.two.toString()} sub" title="2 threads">
						<input
							type="checkbox"
							bind:checked={config.wasm.threads.two}
							on:change={changeWasmThreads}
						/>
						2
					</label>
					<label class="{config.wasm.threads.four.toString()} sub" title="4 threads">
						<input
							type="checkbox"
							bind:checked={config.wasm.threads.four}
							on:change={changeWasmThreads}
						/>
						4
					</label>
				</div>
				<label class={config.backend.webgl.toString()}>
					<input type="checkbox" bind:checked={config.backend.webgl} />
					WebGL
				</label>
				<label class={config.backend.webgpu.toString()}>
					<input type="checkbox" bind:checked={config.backend.webgpu} />
					WebGPU
				</label>
				<div class="group">
					<label class={config.backend.webnn.cpu.toString()}>
						<input
							type="checkbox"
							bind:checked={config.backend.webnn.cpu}
							on:change={changeWebnncpu}
						/>
						WebNN (CPU)
					</label>
					<label class="{config.webnn.cpu.threads.one.toString()} sub" title="1 thread">
						<input
							type="checkbox"
							bind:checked={config.webnn.cpu.threads.one}
							on:change={changeWebnncpuThreads}
						/>
						1
					</label>
					<label class="{config.webnn.cpu.threads.two.toString()} sub" title="2 threads">
						<input
							type="checkbox"
							bind:checked={config.webnn.cpu.threads.two}
							on:change={changeWebnncpuThreads}
						/>
						2
					</label>
					<label class="{config.webnn.cpu.threads.four.toString()} sub" title="4 threads">
						<input
							type="checkbox"
							bind:checked={config.webnn.cpu.threads.four}
							on:change={changeWebnncpuThreads}
						/>
						4
					</label>
				</div>
				<label class={config.backend.webnn.gpu.toString()}>
					<input type="checkbox" bind:checked={config.backend.webnn.gpu} />
					WebNN (GPU)
				</label>
				<label class={config.backend.webnn.npu.toString()}>
					<input type="checkbox" bind:checked={config.backend.webnn.npu} />
					WebNN (NPU)
				</label>
			</div>
		</div>
		<div class="options models">
			<div>
				<label>
					<input type="checkbox" bind:checked={models[0].selected} on:change={changeModel} />
					Model
				</label>
			</div>
			<div class="option">
				{#each models as { name, selected }, i}
					<label class={selected.toString()}>
						<input type="checkbox" on:change={() => selectModel(i)} />
						{name}
					</label>
				{/each}
			</div>
		</div>
	</div>

	{#if config.backend.wasm}
		<p>wasm: Yes</p>
	{:else}
		<p>wasm: False</p>
	{/if}

	<div>{paths.numRuns}</div>
	<div>{paths.numWarmups}</div>
	<div>{paths.modelId}</div>
</div>

<div>
	<br />

	Wasm-1/1/0/1,2,3,4,5,6,7,8 [backend]-[threads]/[numruns]/[numwarmups]/[modelid]
	<br />Wasm-124,WebGL,WebGPU,WebNN_CPU-1,WebNN_NPU/1/0/1,2,3,4,5,6,7,8
	[backend]-[threads]/[numruns]/[numwarmups]/[modelid]
</div>

<div class="environment">
	{environment.cpu}
	{environment.logicCores} logical cores * {environment.gpu} * {environment.os}
	{environment.osVersion} * {environment.webbrowser}
	{environment.browserVersion}
</div>
