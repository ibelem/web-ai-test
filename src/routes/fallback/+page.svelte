<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import { models } from '$lib/config';
	import Log from '$lib/components/svg/Log.svelte';
	import LogToggle from '$lib/components/svg/LogToggle.svelte';
	import Enlarge from '$lib/components/svg/Enlarge.svelte';
	import FitScreen from '$lib/components/svg/FitScreen.svelte';
	import { onMount, beforeUpdate } from 'svelte';
	import {
		getModelDataTypeById,
		getModelDescriptionById,
		getModelNoteById,
		getModelNameById,
		sortModelById,
		resetFallback,
		resetFallbackLog,
		updateFallbackLog,
		resetFallbackQueue,
		updateFallbackQueue,
		resetStore,
		setModelDownloadUrl,
		sleep
	} from '$lib/assets/js/utils';
	import { runOnnx, getRawConsole } from '$lib/assets/js/ort_fallback';
	import { fallbackLogStore, fallbackStore, fallbackQueueStore, autoStore } from '$lib/store/store';
	import Fallback from '$lib/components/Fallback.svelte';

	$: rawConsole = 'Raw console log for WebNN EP developers';

	/**
	 * @type {string[]}
	 */
	let fallback;
	fallbackStore.subscribe((value) => {
		fallback = value;
	});

	/**
	 * @type {string[]}
	 */
	let fallbackQueue;
	fallbackQueueStore.subscribe((value) => {
		fallbackQueue = value;
	});

	/**
	 * @type {string[]}
	 */
	let fallbackLog;
	fallbackLogStore.subscribe((value) => {
		fallbackLog = value;
	});

	$: fallbackString = JSON.stringify(fallback);

	/**
	 * @type {string | any[]}
	 */
	let sortedModels = [];

	const run = async () => {
		/**
		 * @type {string}
		 */
		let id;
		/**
		 * @type {string}
		 */
		let backend;

		if (fallbackQueue.length > 0) {
			id = fallbackQueue[0].split('__')[0];
			backend = fallbackQueue[0].split('__')[1];
			let model = models.find((item) => item.id === id);
			await runOnnx(id, model?.id, model?.format, model?.datatype, model?.size, backend);
			rawConsole = getRawConsole();
			// location.href = location.pathname;
		}

		// const worker = new Worker(ortDists.webnn_webglfix_wasm.workerjs);
		// if (fallbackQueue.length > 0) {
		// 	id = fallbackQueue[0].split('__')[0];
		// 	backend = fallbackQueue[0].split('__')[1];
		// 	let model = models.find((item) => item.id === id);
		// 	model.backend = backend;
		// 	rawConsole = '';
		// 	worker.postMessage(model);
		// 	// location.href = location.pathname;
		// }

		// worker.onmessage = (event) => {
		// 	const outputData = event.data;
		// 	if (typeof outputData === 'object' && 'name' in outputData && 'backend' in outputData) {
		// 		addFallback(outputData);
		// 		let filteredFallbackQueue = fallbackQueue.filter(
		// 			(item) => item !== `${outputData.name}__${outputData.backend}`
		// 		);
		// 		fallbackQueueStore.update(() => filteredFallbackQueue);
		// 		if (fallbackQueue.length > 0) {
		// 			location.href = location.origin + `/fallback?${fallbackQueue[0]}`;
		// 		}
		// 	} else if (typeof outputData === 'object') {
		// 		for (let i = 0; i < outputData.length; i++) {
		// 			if (typeof outputData[i] === 'object') {
		// 				rawConsole = rawConsole + `<div>${JSON.stringify(outputData[i])}</div>`;
		// 			} else {
		// 				rawConsole = rawConsole + `<div>${outputData[i]}</div>`;
		// 			}
		// 		}
		// 	} else {
		// 		updateFallbackLog(outputData);
		// 	}

		// 	fallback = fallback;
		// 	fallbackLog = fallbackLog;
		// };
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

	const setFallbackQueue = (/** @type {string} */ id) => {
		// fallback = [];
		// fallbackLog = [];
		// fallbackString = [];

		resetFallback();
		resetFallbackQueue();
		resetFallbackLog();

		let bk = ['__cpu', '__gpu'];

		if (id === 'all') {
			let m = models.map((model) => model.id);
			updateFallbackQueue(m.filter((item) => item !== 'model_access_check'));
		} else if (id === 'fp32') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'fp32');
			let model = m.map((model) => model.id);
			model = addSuffixes(model, bk);
			updateFallbackQueue(model);
		}
		// else if (id === 'int64') {
		// 	let m = models.filter((model) => getModelDataTypeById(model.id) === 'int64');
		// 	let model = m.map((model) => model.id);
		// 	model = addSuffixes(model, bk);
		// 	updateFallbackQueue(model);
		// }
		else if (id === 'fp16') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'fp16');
			let model = m.map((model) => model.id);
			model = addSuffixes(model, bk);
			updateFallbackQueue(model);
		} else if (id === 'int8') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'int8');
			let model = m.map((model) => model.id);
			model = addSuffixes(model, bk);
			updateFallbackQueue(model);
		} else if (id === 'int4') {
			let m = models.filter((model) => getModelDataTypeById(model.id) === 'int4');
			let model = m.map((model) => model.id);
			model = addSuffixes(model, bk);
			updateFallbackQueue(model);
		} else {
			let m = models.map((model) => model.id);
			let model = [m.find((item) => item === id)];
			model = addSuffixes(model, bk);
			updateFallbackQueue(model);
		}

		run();
	};

	let logShow = true;
	let jsonLogShow = true;
	let consoleSize = false;

	const copyJsonInfo = async () => {
		let log = JSON.stringify(fallback);
		await navigator.clipboard.writeText(log);
		updateFallbackLog(`Json file string copied`);
		fallbackLog = fallbackLog;
	};

	const copyRawConsole = async () => {
		rawConsole = getRawConsole();
		rawConsole = rawConsole.replaceAll('<div>', '').replaceAll('</div>', '\r\n');
		await navigator.clipboard.writeText(rawConsole);
		updateFallbackLog(`Raw console log copied`);
		rawConsole = rawConsole;
	};

	const copyLogInfo = async () => {
		let log = fallbackLog.toString().replaceAll(',', '\r\n');
		await navigator.clipboard.writeText(log);
		updateFallbackLog(`Log history copied`);
		fallbackLog = fallbackLog;
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

	const scrollToBottom = (/** @type {HTMLDivElement} */ node) => {
		node?.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	beforeUpdate(() => {
		resetStore();
		autoStore.update(() => false);
		if (fallback) scrollToBottom(element);
		if (fallbackLog) scrollToBottom(element2);
		if (rawConsole) scrollToBottom(element3);
	});

	onMount(async () => {
		sortedModels = sortModelById(models);
		await setModelDownloadUrl();
		if (fallbackQueue.length > 0) {
			run();
		}
	});
</script>

<Header />

<div class="tqtitle subtitle">
	<div class="title tq">WebNN Fallback Checker</div>
	<div>Check the WebNN fallback status with your current browser</div>
</div>

<div class={consoleSize}>
	<!-- <div class="fs rawconsole">
		{#if jsonLogShow}
			<div class="inferlog" bind:this={element3}>
				<div>{@html rawConsole}</div>
			</div>
		{/if}
		<div class="q copy">
			<div>
				<button title="Switch the element size" on:click={() => toggleConsole()}>
					{#if consoleSize}
						<Enlarge />
					{:else}
						<FitScreen />
					{/if}
				</button>
				<button title="Copy raw console logs" on:click={() => copyRawConsole()}>
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
	</div> -->

	<div class="fs">
		{#if jsonLogShow}
			<div class="inferlog" bind:this={element}>
				<div>{fallbackString}</div>
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
</div>

{#if fallbackLog && fallbackLog.length > 0}
	<div class="log">
		{#if logShow}
			<div class="inferlog" bind:this={element2}>
				{#each fallbackLog as fb}
					<div>{fb}</div>
				{/each}
			</div>
			<div class="progress">
				<div>
					{#if fallbackQueue[0]}In testing: {fallbackQueue[0]
							.replace('__cpu', ' webnn_cpu')
							.replace('__gpu', ' webnn_gpu')}{/if}
				</div>
				<div class="queue">
					{#if fallbackQueue.length > 0}Test queue: {fallbackQueue.length} left{:else}Fallback test
						completed{/if}
				</div>
				<div class="next">
					{#if fallbackQueue[1]}Next: {fallbackQueue[1]
							.replace('__cpu', ' webnn_cpu')
							.replace('__gpu', ' webnn_gpu')}{/if}
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

{#if sortedModels && sortedModels.length > 0}
	<div class="title tq fp16">
		<button on:click={() => setFallbackQueue('fp16')}>Float16</button>
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
						<button on:click={() => setFallbackQueue(m.id)}>{getModelNameById(m.id)}</button>
					</span>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq int8"><button on:click={() => setFallbackQueue('int8')}>Int8</button></div>
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
						<button on:click={() => setFallbackQueue(m.id)}>{getModelNameById(m.id)}</button>
					</span>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq int4"><button on:click={() => setFallbackQueue('int4')}>Int4</button></div>
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
						<button on:click={() => setFallbackQueue(m.id)}>{getModelNameById(m.id)}</button>
					</span>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq"><button on:click={() => setFallbackQueue('fp32')}>Float32</button></div>
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
						<button on:click={() => setFallbackQueue(m.id)}>{getModelNameById(m.id)}</button>
					</span>
				{/if}
			{/if}
		{/each}
	</div>
{/if}

<Fallback />

<div class="run" title="It will take quite a long time...">
	<button on:click={() => setFallbackQueue('all')}>Check WebNN Fallback for All Models</button>
	<button class="log" on:click={() => resetFallbackQueue()}>Cancel</button>
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
