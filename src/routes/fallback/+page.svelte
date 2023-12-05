<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import { models, ortDists } from '$lib/config';
	import Log from '$lib/components/svg/Log.svelte';
	import LogToggle from '$lib/components/svg/LogToggle.svelte';
	import { onMount, beforeUpdate } from 'svelte';
	import {
		getModelDataTypeById,
		getModelDescriptionById,
		getModelNoteById,
		getModelNameById,
		addFallback,
		resetFallback,
		resetFallbackLog,
		updateFallbackLog,
		resetFallbackQueue,
		updateFallbackQueue,
		resetStore
	} from '$lib/assets/js/utils';
	import { fallbackLogStore, fallbackStore, fallbackQueueStore, autoStore } from '$lib/store/store';
	import Fallback from '$lib/components/Fallback.svelte';

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

	const run = () => {
		/**
		 * @type {string}
		 */
		let id;
		/**
		 * @type {string}
		 */
		let backend;
		const worker = new Worker(ortDists.webnn_webglfix.workerjs);
		if (fallbackQueue.length > 0) {
			id = fallbackQueue[0].split('__')[0];
			backend = fallbackQueue[0].split('__')[1];
			let model = models.find((item) => item.id === id);
			model.backend = backend;
			worker.postMessage(model);
			// location.href = location.pathname;
		}

		worker.onmessage = (event) => {
			const outputData = event.data;
			if (typeof outputData === 'object') {
				addFallback(outputData);
				let filteredFallbackQueue = fallbackQueue.filter(
					(item) => item !== `${outputData.name}__${outputData.backend}`
				);
				fallbackQueueStore.update(() => filteredFallbackQueue);
				if (fallbackQueue.length > 0) {
					location.href = location.origin + `/fallback?${fallbackQueue[0]}`;
				}
			} else {
				updateFallbackLog(outputData);
			}

			fallback = fallback;
			fallbackLog = fallbackLog;
			// Handle the output received from the worker
		};
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

	const copyJsonInfo = async () => {
		let log = JSON.stringify(fallback).toString();
		await navigator.clipboard.writeText(log);
		updateFallbackLog(`Json file string copied`);
		fallbackLog = fallbackLog;
	};

	const copyLogInfo = async () => {
		let log = fallbackLog.toString().replaceAll(',', '\r\n');
		await navigator.clipboard.writeText(log);
		updateFallbackLog(`Log history copied`);
		fallbackLog = fallbackLog;
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
		if (fallback) scrollToBottom(element);
		if (fallbackLog) scrollToBottom(element2);
	});

	onMount(() => {
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

{#if fallbackLog && fallbackLog.length > 0}
	<div class="log">
		{#if logShow}
			<div class="inferlog" bind:this={element2}>
				{#each fallbackLog as fb}
					<div>{fb}</div>
				{/each}
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

{#if fallbackString && fallbackString.length > 2}
	<div>
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
{/if}

<div class="title tq"><button on:click={() => setFallbackQueue('fp32')}>Float32</button></div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'fp32'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => setFallbackQueue(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div>

<!-- <div class="title tq"><button on:click={() => setFallbackQueue('int64')}>INT64</button></div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'int64'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => setFallbackQueue(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div> -->

<div class="title tq"><button on:click={() => setFallbackQueue('fp16')}>Float16</button></div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'fp16'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => setFallbackQueue(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div>

<div class="title tq"><button on:click={() => setFallbackQueue('int8')}>Int8</button></div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'int8'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => setFallbackQueue(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div>

<Fallback />

<div class="run" title="It will take quite a long time...">
	<button on:click={() => setFallbackQueue('all')}>Check WebNN Fallback for All Models</button>
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
</style>
