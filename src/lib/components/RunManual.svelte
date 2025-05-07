<script>
	import { onMount, afterUpdate } from 'svelte';
	import { getGpu, isMobile, getURLParameterValue, isFirefoxOrSafari, isSafari } from '$lib/assets/js/utils.js';
	import { tracking } from '../config.js';
	// import TestQueue from './TestQueue.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ConfigBackends from '$lib/components/ConfigBackends.svelte';
	import ConfigNumOfRuns from '$lib/components/ConfigNumOfRuns.svelte';
	import Conformance from './Conformance.svelte';
	import InferenceLog from '$lib/components/InferenceLog.svelte';
	import Results from '$lib/components/Results.svelte';
	import Environment from './Environment.svelte';
	import Info from './Info.svelte';
	import ValidationModal from '$lib/components/ValidationModal.svelte';
	import { writable } from 'svelte/store';
	import {
		auto,
		run,
		resetResult,
		resetInfo,
		urlToStore,
		getModelIdfromPath,
		updateTestQueue,
		setModelDownloadUrl,
		getModelNameById,
		getModelInputsById,
		getModelSizeById,
		getModelCategoryById,
		getModelDescriptionById,
		getModelNoteById,
		getModelTypeById,
		getModelDataTypeById
	} from '$lib/assets/js/utils';
	import {
		autoStore,
		testQueueStore,
		backendsStore,
		modelDownloadProgressStore
	} from '$lib/store/store';
	import { page } from '$app/stores';
	import Fallback from './Fallback.svelte';

	let logShow = true;
	let ia = true;
	let showModal = false;
	let attempts = writable(3);
	let isValidated = false;
	let urlPin = false;
	let isXNNPACKWasm = false;

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
	let testQueue;
	testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	const openValidationModal = () => {
		showModal = true;
	};

	const handleValidation = async () => {
		isValidated = true;
		showModal = false;
		console.log('Access granted');
		await proceed();
	};

	const handleCancel = () => {
		showModal = false;
		console.log('Access denied');
		attempts.set(3);
	};

	const proceed = async () => {
		autoStore.update(() => false);
		modelDownloadProgressStore.update(() => []);
		updateTestQueue();
		resetResult();
		resetInfo();
		await setModelDownloadUrl();
		run();
	};

	const runManual = async () => {
		if (ia) {
			await proceed();
		} else {
			openValidationModal();
		}
	};

	/**
	 * @type {string}
	 */

	let id = '';
	/**
	 * @type {string}
	 */
	let modelName = '';

	/**
	 * @type {string }
	 */
	let modelType = '';

	/**
	 * @type {string}
	 */
	let dataType = '';

	/**
	 * @type {string}
	 */
	let category = '';

	/**
	 * @type {string}
	 */
	let description = '';

	/**
	 * @type {string}
	 */
	let note = '';

	/**
	 * @type {string}
	 */
	let inputs = '';

	/**
	 * @type {string}
	 */
	let size = '';

	onMount(() => {
		if(getURLParameterValue('backend')?.trim()) {
			if(getURLParameterValue('backend')?.trim() === 'xnnpack_cpu') {
				isXNNPACKWasm = true;
			}
		}
		id = getModelIdfromPath() || '';
		modelName = getModelNameById(id) || '';
		modelType = getModelTypeById(id) || '';
		dataType = getModelDataTypeById(id) || '';
		category = getModelCategoryById(id) || '';
		description = getModelDescriptionById(id) || '';
		note = getModelNoteById(id) || '';
		inputs = getModelInputsById(id) || '';
		size = getModelSizeById(id) || '';

		// if (console.everything === undefined) {
		// 	console.everything = [];
		// 	function TS() {
		// 		return new Date().toLocaleString('sv', { timeZone: 'UTC' }) + 'Z';
		// 	}
		// 	window.onerror = function (error, url, line) {
		// 		console.everything.push({
		// 			type: 'exception',
		// 			timeStamp: TS(),
		// 			value: { error, url, line }
		// 		});
		// 		return false;
		// 	};
		// 	window.onunhandledrejection = function (e) {
		// 		console.everything.push({
		// 			type: 'promiseRejection',
		// 			timeStamp: TS(),
		// 			value: e.reason
		// 		});
		// 	};

		// 	function hookLogType(logType) {
		// 		const original = console[logType].bind(console);
		// 		return function () {
		// 			console.everything.push({
		// 				type: logType,
		// 				timeStamp: TS(),
		// 				value: Array.from(arguments)
		// 			});
		// 			original.apply(console, arguments);
		// 		};
		// 	}

		// 	['log', 'error', 'warn', 'debug'].forEach((logType) => {
		// 		console[logType] = hookLogType(logType);
		// 	});
		// }

		urlPin = getURLParameterValue('pin')?.toLocaleLowerCase().trim();
		const reversedTracking = tracking.map(item => item.split('').reverse().join(''));
		if (!reversedTracking.includes(urlPin)) {
			if(!isFirefoxOrSafari()) {
				navigator.userAgentData.getHighEntropyValues(['architecture']).then((ua) => {
					if (ua.architecture === 'arm' && !isMobile()) {
						const vendors = ['apple', 'qualcomm', 'adreno'];
						const hasVendor = vendors.some((vendor) => getGpu().toLowerCase().includes(vendor));
						if (hasVendor) {
							ia = false;
						}
					}
				});
			}

			if(isSafari() ) {
				ia = false;
			}
		}

		if (testQueue.length > 0 && auto) {
			run();
		}
	});

	afterUpdate(() => {
		if (!auto) {
			if ($page.url.searchParams.size === 0) {
				let path = `${location.pathname}/?backend=none&run=50&modeltype=${modelType}&datatype=${dataType}`;
				// goto(path);
				location.href = location.origin + path;
			} else {
				urlToStore($page.url.searchParams, getModelIdfromPath());
			}
		}
	});
</script>

{#if showModal}
	<ValidationModal onValidate={handleValidation} onCancel={handleCancel} />
{/if}

{#if testQueue}
	{#if testQueue.length != 0}
		<Info />
	{:else}
		<Header />
		<div class="tqtitle">
			<div class="title tq s {dataType}">
				{modelName}
			</div>
		</div>
		<div id="modeldesc" class="true {dataType} reverse">
			<span class="modeldes">{category}</span>
			<span class="modeldes">{id}</span>
			<span class="modeldes">{modelType}</span>
			<span class="modeldes">{dataType}</span>
			{#if inputs}
				<span class="modeldes">{inputs}</span>
			{/if}
			<span class="modeldes">{size}</span>
			<div class="des">{description}</div>
			{#if note}
				<div class="note">
					<svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="14"
						><path
							d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
						/></svg
					>{note}
				</div>
			{/if}
		</div>
		{#if !auto}
			<div class="config">
				<ConfigBackends />
				<ConfigNumOfRuns />
			</div>
		{/if}
		<Results />
		<Fallback />
		<Conformance />
		<InferenceLog bind:logShow />
		<div class="run">
			{#if (selectedBackends.length > 0 || isXNNPACKWasm)&& !auto}
				{#if testQueue.length === 0}
					<button on:click={runManual}>Run Manual Tests</button>
				{/if}
			{/if}
			{#if !logShow}
				<button
					class="log"
					on:click={() => {
						logShow = true;
					}}>Show Logs</button
				>
			{/if}
		</div>
		<Environment />
		<Footer />
	{/if}
{/if}

<!-- <TestQueue /> -->

<style>
	.title {
		text-align: center;
		color: var(--red);
	}
</style>
