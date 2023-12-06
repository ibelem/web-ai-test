<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import { models } from '$lib/config';
	import Log from '$lib/components/svg/Log.svelte';
	import LogToggle from '$lib/components/svg/LogToggle.svelte';
	import { onMount, beforeUpdate } from 'svelte';
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
		setModelDownloadUrl
	} from '$lib/assets/js/utils';
	import {
		conformanceLogStore,
		conformanceStore,
		conformanceQueueStore,
		autoStore
	} from '$lib/store/store';
	import Conformance from '$lib/components/Conformance.svelte';
	import { runOnnxConformance } from '$lib/assets/js/ort_utils_conformance';

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

	$: conformanceString = JSON.stringify(conformance);

	const run = () => {
		/**
		 * @type {string}
		 */
		let id;
		/**
		 * @type {string}
		 */
		let backend;
		if (conformanceQueue.length > 0) {
			id = conformanceQueue[0].split('__')[0];
			backend = conformanceQueue[0].split('__')[1];
			let model = models.find((item) => item.id === id);
			model.backend = backend;

			runOnnxConformance(id, 'onnx', getModelDataTypeById(id), backend);
			// location.href = location.pathname;
			conformance = conformance;
			conformanceLog = conformanceLog;
		}
	};

	const addSuffixes = (/** @type {any[]} */ array, /** @type {any[]} */ suffixes) => {
		/**
		 * @type {any[]}
		 */
		let result = [];
		array.forEach((/** @type {any} */ item) => {
			suffixes.forEach((/** @type {any} */ suffix) => {
				result.push(item + suffix);
			});
		});
		return result;
	};

	const setConformanceQueue = (/** @type {string} */ id) => {
		// conformance = [];
		// conformanceLog = [];
		// conformanceString = [];

		clearConformance();
		clearConformanceQueue();
		clearConformanceLog();

		let bk = ['__wasm_4', '__webnn_cpu_4', '__webgl', '__webgpu', '__webnn_gpu'];

		if (id === 'all') {
			let m = models.map((model) => model.id);
			m = m.filter((item) => item !== 'model_access_check');
			m = addSuffixes(m, bk);
			updateConformanceQueue(m);
		} else if (id === 'fp32') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'fp32');
			let model = m.map((model) => model.id);
			model = addSuffixes(model, bk);
			updateConformanceQueue(model);
		}
		// else if (id === 'int64') {
		// 	let m = models.filter((model) => getModelDataTypeById(model.id) === 'int64');
		// 	let model = m.map((model) => model.id);
		// 	model = addSuffixes(model, bk);
		// 	updateConformanceQueue(model);
		// }
		else if (id === 'fp16') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'fp16');
			let model = m.map((model) => model.id);
			model = addSuffixes(model, bk);
			updateConformanceQueue(model);
		} else if (id === 'int8') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'int8');
			let model = m.map((model) => model.id);
			model = addSuffixes(model, bk);
			updateConformanceQueue(model);
		} else {
			let m = models.map((model) => model.id);
			let model = [m.find((item) => item === id)];
			model = addSuffixes(model, bk);
			updateConformanceQueue(model);
		}

		run();
	};

	let logShow = true;
	let jsonLogShow = true;

	const copyJsonInfo = async () => {
		let log = JSON.stringify(conformance).toString();
		await navigator.clipboard.writeText(log);
		updateConformanceLog(`Json file string copied`);
		conformanceLog = conformanceLog;
	};

	const copyLogInfo = async () => {
		let log = conformanceLog.toString().replaceAll(',', '\r\n');
		await navigator.clipboard.writeText(log);
		updateConformanceLog(`Log history copied`);
		conformanceLog = conformanceLog;
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

	const scrollToBottom = (/** @type {HTMLDivElement} */ node) => {
		node?.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	beforeUpdate(() => {
		resetStore();
		autoStore.update(() => false);
		if (conformance) scrollToBottom(element);
		if (conformanceLog) scrollToBottom(element2);
	});

	onMount(async () => {
		await setModelDownloadUrl();
		if (conformanceQueue.length > 0) {
			run();
		}
	});
</script>

<Header />

<div class="tqtitle subtitle">
	<div class="title tq">WebNN Conformance Tests</div>
	<div>Check the WebNN conformance status with your current browser</div>
</div>

{#if conformanceString && conformanceString.length > 2}
	<div>
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
					{#if conformanceQueue[0]}In testing: {conformanceQueue[0].replace('__', ' ')}{/if}
				</div>
				<div class="queue">
					{#if conformanceQueue.length > 0}Test queue: {conformanceQueue.length} left{:else}Fallback
						test completed{/if}
				</div>
				<div class="next">
					{#if conformanceQueue[1]}Next: {conformanceQueue[1].replace('__', ' ')}{/if}
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

<div class="title tq"><button on:click={() => setConformanceQueue('fp32')}>Float32</button></div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'fp32'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => setConformanceQueue(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div>

<!-- <div class="title tq"><button on:click={() => setConformanceQueue('int64')}>INT64</button></div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'int64'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => setConformanceQueue(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div> -->

<div class="title tq"><button on:click={() => setConformanceQueue('fp16')}>Float16</button></div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'fp16'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => setConformanceQueue(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div>

<div class="title tq"><button on:click={() => setConformanceQueue('int8')}>Int8</button></div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'int8'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => setConformanceQueue(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div>

<Conformance />

<div class="run" title="It will take quite a long time...">
	<button on:click={() => setConformanceQueue('all')}>Test Conformance for All Models</button>
	<button class="log" on:click={() => clearConformanceQueue()}>Cancel</button>
</div>

<Environment />
<Footer />

<style>
	.tqtitle {
		margin: 0;
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

	.f {
		cursor: pointer;
		display: inline-block;
		margin: 2px 4px;
		min-width: 45px;
		text-align: center;
	}

	.f button {
		border: 1px solid var(--grey-02);
		padding: 0px 6px 0px 6px;
		background: transparent;
		font-family: 'Space Mono', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background-color: var(--white);
		color: var(--font);
		font-size: 12px;
		cursor: pointer;
		width: 176px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.f button:hover {
		background-image: none;
		background-color: var(--red-005);
		color: var(--red);
		border: 1px solid var(--red) !important;
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
</style>
