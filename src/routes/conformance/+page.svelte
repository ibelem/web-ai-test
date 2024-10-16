<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import { models } from '$lib/config';
	import Log from '$lib/components/svg/Log.svelte';
	import LogToggle from '$lib/components/svg/LogToggle.svelte';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import Enlarge from '$lib/components/svg/Enlarge.svelte';
	import FitScreen from '$lib/components/svg/FitScreen.svelte';
	import {
		getModelDataTypeById,
		getModelDescriptionById,
		getModelNoteById,
		getModelNameById,
		clearConformance,
		clearConformanceLog,
		updateConformanceLog,
		clearConformanceQueue,
		updateConformanceQueue,
		resetStore,
		setModelDownloadUrl,
		updateSleep,
		sortModelById
	} from '$lib/assets/js/utils';
	import {
		conformanceLogStore,
		conformanceStore,
		conformanceQueueStore,
		autoStore,
		sleepStore
	} from '$lib/store/store';
	import Conformance from '$lib/components/Conformance.svelte';
	import {
		runOnnxConformance,
		wasmResult,
		webglResult,
		webgpuResult,
		webnncpu4Result,
		webnngpuResult,
		webnnnpuResult
	} from '$lib/assets/js/ort_utils_conformance_one_page';

	/**
	 * @type {string | any[]}
	 */
	let sortedModels = [];

	/**
	 * @type {string[]}
	 */
	let conformance;
	conformanceStore.subscribe((value) => {
		conformance = value;
	});

	/**
	 * @type {string[]}
	 */
	let conformanceQueue;
	conformanceQueueStore.subscribe((value) => {
		conformanceQueue = value;
	});

	/**
	 * @type {string[]}
	 */
	let conformanceLog;
	conformanceLogStore.subscribe((value) => {
		conformanceLog = value;
	});

	/**
	 * @type {boolean}
	 */
	export let sleeping;
	sleepStore.subscribe((value) => {
		sleeping = value;
	});

	/**
	 * @type {boolean}
	 */
	let localSleep;

	$: conformanceString = JSON.stringify(conformance);

	const toggleSleep = () => {
		updateSleep(localSleep);
	};

	const next = (/** @type {string} */ _model) => {
		let filteredConformanceQueue = conformanceQueue.filter((item) => item !== `${_model}`);
		conformanceQueueStore.update(() => filteredConformanceQueue);
		if (conformanceQueue.length > 0) {
			location.href = location.origin + `/conformance?${conformanceQueue[0]}`;
		}
	};

	const run = async () => {
		/**
		 * @type {string}
		 */
		let id;
		/**
		 * @type {string}
		 */

		wasmResultR = '';
		webglResultR = '';
		webgpuResultR = '';
		webnncpu4ResultR = '';
		webnngpuResultR = '';
		webnnnpuResultR = '';

		if (conformanceQueue.length > 0) {
			id = conformanceQueue[0];
			await runOnnxConformance(id, 'onnx', getModelDataTypeById(id));
			// location.href = location.pathname;
			conformance = conformance;
			conformanceLog = conformanceLog;
			wasmResultR = JSON.stringify(wasmResult, null, ' ');
			webglResultR = JSON.stringify(webglResult, null, ' ');
			webgpuResultR = JSON.stringify(webgpuResult, null, ' ');
			webnncpu4ResultR = JSON.stringify(webnncpu4Result, null, ' ');
			webnngpuResultR = JSON.stringify(webnngpuResult, null, ' ');
			webnnnpuResultR = JSON.stringify(webnnnpuResult, null, ' ');
			next(id);
		}
	};

	async function setConformanceQueue(/** @type {string} */ id) {
		clearConformance();
		clearConformanceQueue();
		clearConformanceLog();

		if (id === 'all') {
			let m = models.map((model) => model.id);
			m = m.filter((item) => item !== 'model_access_check');
			updateConformanceQueue(m);
		} else if (id === 'fp32') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'fp32');
			let model = m.map((model) => model.id);
			updateConformanceQueue(model);
		} else if (id === 'fp16') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'fp16');
			let model = m.map((model) => model.id);
			updateConformanceQueue(model);
		} else if (id === 'int8') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'int8');
			let model = m.map((model) => model.id);
			updateConformanceQueue(model);
		} else if (id === 'int4') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'int4');
			let model = m.map((model) => model.id);
			updateConformanceQueue(model);
		} else {
			let m = models.map((model) => model.id);
			let model = [m.find((item) => item === id)];
			updateConformanceQueue(model);
		}

		await run();
	}

	let logShow = true;
	let jsonLogShow = true;
	let consoleSize = false;
	$: wasmResultR = '';
	$: webglResultR = '';
	$: webgpuResultR = '';
	$: webnncpu4ResultR = '';
	$: webnngpuResultR = '';
	$: webnnnpuResultR = '';

	const copyJsonInfo = async () => {
		let log = JSON.stringify(conformance).toString();
		await navigator.clipboard.writeText(log);
		updateConformanceLog(`Json file string copied`);
		conformanceLog = conformanceLog;
	};

	const copyWasmResult = async () => {
		await navigator.clipboard.writeText(wasmResultR.replaceAll(' ', '').replaceAll('\n', ''));
		updateConformanceLog(`Raw inference result of Wasm backend copied`);
		wasmResultR = wasmResultR;
	};

	const copyWebglResult = async () => {
		await navigator.clipboard.writeText(webglResultR.replaceAll(' ', '').replaceAll('\n', ''));
		updateConformanceLog(`Raw inference result of compared backend copied`);
		webglResultR = webglResultR;
	};

	const copyWebgpuResult = async () => {
		await navigator.clipboard.writeText(webgpuResultR.replaceAll(' ', '').replaceAll('\n', ''));
		updateConformanceLog(`Raw inference result of compared backend copied`);
		webgpuResultR = webgpuResultR;
	};

	const copyWebnncpu4Result = async () => {
		await navigator.clipboard.writeText(webnncpu4ResultR.replaceAll(' ', '').replaceAll('\n', ''));
		updateConformanceLog(`Raw inference result of compared backend copied`);
		webnncpu4ResultR = webnncpu4ResultR;
	};

	const copyWebnngpuResult = async () => {
		await navigator.clipboard.writeText(webnngpuResultR.replaceAll(' ', '').replaceAll('\n', ''));
		updateConformanceLog(`Raw inference result of compared backend copied`);
		webnngpuResultR = webnngpuResultR;
	};

	const copyWebnnnpuResult = async () => {
		await navigator.clipboard.writeText(webnnnpuResultR.replaceAll(' ', '').replaceAll('\n', ''));
		updateConformanceLog(`Raw inference result of compared backend copied`);
		webnnnpuResultR = webnnnpuResultR;
	};

	const copyLogInfo = async () => {
		let log = conformanceLog.toString().replaceAll(',', '\r\n');
		await navigator.clipboard.writeText(log);
		updateConformanceLog(`Log history copied`);
		conformanceLog = conformanceLog;
	};

	const toggleConsole = () => {
		consoleSize = !consoleSize;
	};

	/**
	 * @type {HTMLDivElement}
	 */
	let element;

	$: if (element) {
		scrollToBottom(element);
	}

	/**
	 * @type {HTMLDivElement}
	 */
	let element2;

	$: if (element2) {
		scrollToBottom(element2);
	}

	/**
	 * @type {HTMLDivElement}
	 */
	let element3;

	$: if (element3) {
		scrollToBottom(element3);
	}

	/**
	 * @type {HTMLDivElement}
	 */
	let element4;

	$: if (element4) {
		scrollToBottom(element4);
	}

	/**
	 * @type {HTMLDivElement}
	 */
	let element5;

	$: if (element5) {
		scrollToBottom(element5);
	}

	/**
	 * @type {HTMLDivElement}
	 */
	let element6;

	$: if (element6) {
		scrollToBottom(element6);
	}

	/**
	 * @type {HTMLDivElement}
	 */
	let element7;

	$: if (element7) {
		scrollToBottom(element7);
	}

	/**
	 * @type {HTMLDivElement}
	 */
	let element8;

	$: if (element8) {
		scrollToBottom(element8);
	}

	const scrollToBottom = (/** @type {HTMLDivElement} */ node) => {
		node?.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	beforeUpdate(() => {
		resetStore();
		autoStore.update(() => false);
		if (conformance) scrollToBottom(element);
		if (conformanceLog) scrollToBottom(element2);
		if (wasmResultR) scrollToBottom(element3);
		if (webglResultR) scrollToBottom(element4);
		if (webgpuResultR) scrollToBottom(element5);
		if (webnncpu4ResultR) scrollToBottom(element6);
		if (webnngpuResultR) scrollToBottom(element7);
		if (webnnnpuResultR) scrollToBottom(element8);
	});

	afterUpdate(() => {});

	onMount(async () => {
		sortedModels = sortModelById(models);
		if (sleeping) {
			localSleep = sleeping;
		} else {
			localSleep = false;
		}
		await setModelDownloadUrl();
		if (conformanceQueue.length > 0) {
			await run();
		}
	});
</script>

<Header />

<div class="tqtitle subtitle">
	<div class="title tq">WebNN Conformance Tests</div>
	<div>Check the WebNN conformance status with your current browser</div>
</div>

<!-- <div>
	<label>
		<input type="checkbox" bind:checked={localSleep} on:change={toggleSleep} />
		Sleep 10s to get raw inference results from Console of Developer Tool during the testing
	</label>
</div> -->

<div class="g2 {consoleSize}">
	{#if conformanceString && conformanceString.length > 0}
		<div class="fs">
			{#if jsonLogShow}
				<div class="inferlog" bind:this={element}>
					<div>{conformanceString}</div>
				</div>
			{/if}
			<div class="q copy">
				<div>
					<button title="Copy full test logs" on:click={() => copyJsonInfo()}>
						<Log />
					</button>

					<button
						title="Hide logs"
						on:click={() => {
							jsonLogShow = !jsonLogShow;
						}}
					>
						<LogToggle />
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if conformanceLog && conformanceLog.length > 0}
		<div class="log">
			{#if logShow}
				<div class="inferlog" bind:this={element2}>
					{#each conformanceLog as fb}
						<div>{fb}</div>
					{/each}
				</div>
				<div class="progress">
					<div>
						{#if conformanceQueue[0]}In testing: {conformanceQueue[0]}{/if}
					</div>
					<div class="queue">
						{#if conformanceQueue.length > 0}Test queue: {conformanceQueue.length} left{:else}Conformance
							test completed{/if}
					</div>
					<div class="next">
						{#if conformanceQueue[1]}Next: {conformanceQueue[1]}{/if}
					</div>
				</div>
			{/if}
			<div class="q copy">
				<div>
					<button title="Copy full test logs" on:click={() => copyLogInfo()}>
						<Log />
					</button>

					<button
						title="Hide logs"
						on:click={() => {
							logShow = !logShow;
						}}
					>
						<LogToggle />
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<div class="g2 {consoleSize}">
	{#if wasmResultR && wasmResultR.length > 0}
		<div class="fs rawconsole">
			{#if jsonLogShow}
				<div class="inferlog" bind:this={element3}>
					<div>{@html wasmResultR}</div>
				</div>
			{/if}
			<div class="q copy">
				<div>
					<div class="noborder wasm">Inference result <span>Wasm</span></div>
					<button title="Switch the element size" on:click={() => toggleConsole()}>
						{#if consoleSize}
							<Enlarge />
						{:else}
							<FitScreen />
						{/if}
					</button>
					<button title="Copy raw inference result" on:click={() => copyWasmResult()}>
						<Log />
					</button>

					<button
						title="Hide logs"
						on:click={() => {
							jsonLogShow = !jsonLogShow;
						}}
					>
						<LogToggle />
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if webglResultR && webglResultR.length > 0}
		<div class="fs rawconsole">
			{#if jsonLogShow}
				<div class="inferlog" bind:this={element4}>
					<div>{@html webglResultR}</div>
				</div>
			{/if}
			<div class="q copy">
				<div>
					<div class="noborder webgl">
						Inference result <span>WebGL</span>
					</div>
					<button title="Switch the element size" on:click={() => toggleConsole()}>
						{#if consoleSize}
							<Enlarge />
						{:else}
							<FitScreen />
						{/if}
					</button>
					<button title="Copy raw inference result" on:click={() => copyWebglResult()}>
						<Log />
					</button>

					<button
						title="Hide logs"
						on:click={() => {
							jsonLogShow = !jsonLogShow;
						}}
					>
						<LogToggle />
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if webgpuResultR && webgpuResultR.length > 0}
		<div class="fs rawconsole">
			{#if jsonLogShow}
				<div class="inferlog" bind:this={element5}>
					<div>{@html webgpuResultR}</div>
				</div>
			{/if}
			<div class="q copy">
				<div>
					<div class="noborder webgpu">
						Inference result <span>WebGPU</span>
					</div>
					<button title="Switch the element size" on:click={() => toggleConsole()}>
						{#if consoleSize}
							<Enlarge />
						{:else}
							<FitScreen />
						{/if}
					</button>
					<button title="Copy raw inference result" on:click={() => copyWebgpuResult()}>
						<Log />
					</button>

					<button
						title="Hide logs"
						on:click={() => {
							jsonLogShow = !jsonLogShow;
						}}
					>
						<LogToggle />
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if webnncpu4ResultR && webnncpu4ResultR.length > 0}
		<div class="fs rawconsole">
			{#if jsonLogShow}
				<div class="inferlog" bind:this={element6}>
					<div>{@html webnncpu4ResultR}</div>
				</div>
			{/if}
			<div class="q copy">
				<div>
					<div class="noborder webnn_cpu">
						Inference result <span>WebNN CPU</span>
					</div>
					<button title="Switch the element size" on:click={() => toggleConsole()}>
						{#if consoleSize}
							<Enlarge />
						{:else}
							<FitScreen />
						{/if}
					</button>
					<button title="Copy raw inference result" on:click={() => copyWebnncpu4Result()}>
						<Log />
					</button>

					<button
						title="Hide logs"
						on:click={() => {
							jsonLogShow = !jsonLogShow;
						}}
					>
						<LogToggle />
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if webnngpuResultR && webnngpuResultR.length > 0}
		<div class="fs rawconsole">
			{#if jsonLogShow}
				<div class="inferlog" bind:this={element6}>
					<div>{@html webnngpuResultR}</div>
				</div>
			{/if}
			<div class="q copy">
				<div>
					<div class="noborder webnn_gpu">
						Inference result <span>WebNN GPU</span>
					</div>
					<button title="Switch the element size" on:click={() => toggleConsole()}>
						{#if consoleSize}
							<Enlarge />
						{:else}
							<FitScreen />
						{/if}
					</button>
					<button title="Copy raw inference result" on:click={() => copyWebnngpuResult()}>
						<Log />
					</button>

					<button
						title="Hide logs"
						on:click={() => {
							jsonLogShow = !jsonLogShow;
						}}
					>
						<LogToggle />
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if webnnnpuResultR && webnnnpuResultR.length > 0}
		<div class="fs rawconsole">
			{#if jsonLogShow}
				<div class="inferlog" bind:this={element6}>
					<div>{@html webnnnpuResultR}</div>
				</div>
			{/if}
			<div class="q copy">
				<div>
					<div class="noborder webnn_npu">
						Inference result <span>WebNN NPU</span>
					</div>
					<button title="Switch the element size" on:click={() => toggleConsole()}>
						{#if consoleSize}
							<Enlarge />
						{:else}
							<FitScreen />
						{/if}
					</button>
					<button title="Copy raw inference result" on:click={() => copyWebnnnpuResult()}>
						<Log />
					</button>

					<button
						title="Hide logs"
						on:click={() => {
							jsonLogShow = !jsonLogShow;
						}}
					>
						<LogToggle />
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

{#if sortedModels && sortedModels.length > 0}
	<div class="title tq fp16">
		<button on:click={() => setConformanceQueue('fp16')}>Float16</button>
	</div>
	<div class="ho fp16">
		{#each sortedModels as m}
			{#if m.id !== 'model_access_check'}
				{#if getModelDataTypeById(m.id) === 'fp16'}
					<span
						class="q tests f"
						title="{m.id.replaceAll('_', '-')} · {getModelNameById(
							m.id
						)} · {getModelDescriptionById(m.id)} · {getModelNoteById(m.id)}"
					>
						<button on:click={() => setConformanceQueue(m.id)}>{getModelNameById(m.id)}</button>
					</span>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq int8">
		<button on:click={() => setConformanceQueue('int8')}>Int8</button>
	</div>
	<div class="ho int8">
		{#each sortedModels as m}
			{#if m.id !== 'model_access_check'}
				{#if getModelDataTypeById(m.id) === 'int8'}
					<span
						class="q tests f"
						title="{m.id.replaceAll('_', '-')} · {getModelNameById(
							m.id
						)} · {getModelDescriptionById(m.id)} · {getModelNoteById(m.id)}"
					>
						<button on:click={() => setConformanceQueue(m.id)}>{getModelNameById(m.id)}</button>
					</span>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq int4">
		<button on:click={() => setConformanceQueue('int4')}>INT4</button>
	</div>
	<div class="ho int4">
		{#each sortedModels as m}
			{#if m.id !== 'model_access_check'}
				{#if getModelDataTypeById(m.id) === 'int4'}
					<span
						class="q tests f"
						title="{m.id.replaceAll('_', '-')} · {getModelNameById(
							m.id
						)} · {getModelDescriptionById(m.id)} · {getModelNoteById(m.id)}"
					>
						<button on:click={() => setConformanceQueue(m.id)}>{getModelNameById(m.id)}</button>
					</span>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq"><button on:click={() => setConformanceQueue('fp32')}>Float32</button></div>
	<div class="ho">
		{#each sortedModels as m}
			{#if m.id !== 'model_access_check'}
				{#if getModelDataTypeById(m.id) === 'fp32'}
					<span
						class="q tests f"
						title="{m.id.replaceAll('_', '-')} · {getModelNameById(
							m.id
						)} · {getModelDescriptionById(m.id)} · {getModelNoteById(m.id)}"
					>
						<button on:click={() => setConformanceQueue(m.id)}>{getModelNameById(m.id)}</button>
					</span>
				{/if}
			{/if}
		{/each}
	</div>
{/if}

<Conformance />

<div class="run" title="It will take quite a long time...">
	<button on:click={() => setConformanceQueue('all')}>Test Conformance for All Models</button>
	<button class="log" on:click={() => clearConformanceQueue()}>Cancel</button>
</div>

<Environment />
<Footer />

<style>
	.tqtitle {
		margin: 10px 0 0 0;
	}

	.subtitle {
		margin-bottom: 10px;
	}

	.title {
		text-align: center;
		color: var(--red);
	}

	.title button {
		background-color: transparent;
		border: 0;
		color: var(--red);
		text-transform: uppercase;
	}

	.title button:hover {
		cursor: pointer;
	}

	.tq {
		margin: 10px 0 10px 0;
	}

	.inferlog {
		margin-top: 10px;
		border: 1px solid var(--grey-02);
		padding: 10px;
		height: 120px;
		overflow-y: scroll;
		scroll-behavior: smooth;
		text-align: left;
	}

	.inferlog:hover {
		border: 1px solid var(--grey-04);
	}

	.inferlog {
		scrollbar-width: auto;
		scrollbar-color: var(--grey-02), #ffffff;
	}

	.inferlog::-webkit-scrollbar {
		width: 12px !important;
		height: 11px !important;
	}

	.inferlog::-webkit-scrollbar-track {
		background: transparent;
	}

	.inferlog::-webkit-scrollbar-thumb {
		background-color: var(--grey-04);
		border-radius: 10px;
		border: 5px solid #ffffff;
	}

	.inferlog:hover::-webkit-scrollbar-thumb {
		background-color: var(--green);
	}

	.run {
		margin-top: 40px;
	}

	.progress {
		border: 1px solid var(--grey-02);
		padding: 4px 10px;
		margin-top: -1px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.progress:hover {
		border: 1px solid var(--grey-04);
	}

	.progress .queue {
		justify-self: center;
	}

	.progress .next {
		justify-self: right;
	}

	.noborder {
		border: 0;
		text-align: center;
	}

	.noborder span {
		background-color: var(--b1-005);
		border-radius: 55px;
		padding: 1px 8px;
		font-size: 0.8em;
	}

	.noborder.webnn_cpu span {
		background-color: var(--b1-005);
	}

	.noborder.webgl span,
	.noborder.webgpu span,
	.noborder.webnn_gpu span {
		background-color: var(--p2-005);
	}

	.noborder.webnn_npu span {
		background-color: var(--purple-005);
	}

	.g2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		grid-column-gap: 10px;
		grid-row-gap: 0px;
	}

	.g2 .fs {
		width: 44.2vw;
	}

	.true.g2 {
		display: block;
	}

	.true.g2 .fs {
		width: 100%;
	}

	.true.g2 .rawconsole .inferlog {
		height: 60vh;
	}

	@media (max-width: 512px) {
		.f button {
			width: 46.6vw;
		}
		.g2 {
			display: block;
		}
		.g2 .fs {
			width: 100%;
		}
	}
</style>
