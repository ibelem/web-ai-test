<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import Info from '$lib/components/Info.svelte';
	import ArrowOutward from '$lib/components/svg/ArrowOutward.svelte';
	import { models } from '$lib/config';
	import { beforeUpdate, onMount, onDestroy } from 'svelte';
	import OnnxFull from '$lib/components/svg/OnnxFull.svelte';
	import TfliteFull from '$lib/components/svg/TfliteFull.svelte';
	import Onnx from '$lib/components/svg/Onnx.svelte';
	import Tflite from '$lib/components/svg/Tflite.svelte';
	import { base } from '$app/paths';
	import { autoStore, customStore } from '$lib/store/store';
	import {
		resetStore,
		getModelNameById,
		getModelDataTypeById,
		getModelDescriptionById,
		getModelNoteById,
		getModelTypeById,
		getModelTagById,
		getModelIsvById,
		sortModelById,
		getModelSizeById,
		getModelHFUrlById
	} from '$lib/assets/js/utils';

	/**
	 * @type {string[]}
	 */
	$: uniqueModels = [];
	/**
	 * @type {string[]}
	 */
	$: orginalUniqueModels = [];
	/**
	 * @type {any[]}
	 */
	$: categories = [];
	$: search = '';
	$: fp16Count = 0;
	$: int8Count = 0;
	$: int4Count = 0;
	$: fp32Count = 0;
	$: demoCount = 0;
	$: hfbenchModelCount = 0;
	$: hfbenchPipelineCountFp32 = 0;
	$: hfbenchPipelineCountFp16 = 0;
	$: hfbenchPipelineCountInt8 = 0;
	$: top2025CountFP16 = 0;
	$: top2025CountINT8 = 0;
	$: top2025CountINT4 = 0;
	$: top2025CountFP32 = 0;
	let subModels = models;
	let selected = 'onnx';

	const getUniqueCategories = (/** @type {any[]} */ array) => {
		let categories = array.map((item) => item.category);
		categories = [...new Set(categories)];
		categories = categories.filter((item) => item !== 'Model Access Check');
		return categories.sort();
	};

	const filterCategory = (/** @type string */ category) => {
		if (typeof category === 'string') {
			let filterModels = models.filter((item) =>
				item.category.toLowerCase().includes(category.toLowerCase())
			);
			const filter = filterModels.filter((item) => item.format === 'onnx');
			uniqueModels = sortModelById(filter);
			uniqueModels = [...new Set(uniqueModels.map((model) => model.id))];
			uniqueModels = uniqueModels;
		} else {
			uniqueModels = orginalUniqueModels;
		}
		updateModelCountofType();
	};

	const updateModelCountofType = () => {
		int4Count = 0;
		int8Count = 0;
		fp16Count = 0;
		fp32Count = 0;
		demoCount = 0;
		hfbenchModelCount = 0;
		hfbenchPipelineCountFp32 = 0;
		hfbenchPipelineCountFp16 = 0;
		hfbenchPipelineCountInt8 = 0;
		top2025CountFP16 = 0;
		top2025CountINT8 = 0;
		top2025CountINT4 = 0;
		top2025CountFP32 = 0;
		uniqueModels.forEach((item) => {
			if (getModelIsvById(item) === 'ms') {
				if (item.endsWith('_fp16')) {
					top2025CountFP16++;
				} else if (item.endsWith('_int8')) {
					top2025CountINT8++;
				} else if (item.endsWith('_int4')) {
					top2025CountINT4++;
				} else {
					top2025CountFP32++;
				}
			}

			if (item.endsWith('_int4') || (item.indexOf('_q4') > -1 && item.indexOf('_q4f16') === -1)) {
				int4Count++;
			} else if (item.endsWith('_int8')) {
				int8Count++;
			} else if (item.endsWith('_fp16') || item.indexOf('_q4f16') > -1) {
				fp16Count++;
			} else {
				fp32Count++;
			}

			if (item.indexOf('_demo') > -1) {
				demoCount++;
			}

			if (
				item.indexOf('_tfbench') > -1 &&
				(item.indexOf('_model') > -1 || item.indexOf('_pipeline') > -1) &&
				item.indexOf('_fp16') === -1 &&
				item.indexOf('_int8') === -1
			) {
				hfbenchPipelineCountFp32++;
			}

			if (
				item.indexOf('_tfbench') > -1 &&
				(item.indexOf('_model') > -1 || item.indexOf('_pipeline') > -1) &&
				item.indexOf('_fp16') > -1
			) {
				hfbenchPipelineCountFp16++;
			}

			if (
				item.indexOf('_tfbench') > -1 &&
				(item.indexOf('_model') > -1 || item.indexOf('_pipeline') > -1) &&
				item.indexOf('_int8') > -1
			) {
				hfbenchPipelineCountInt8++;
			}
		});
	};

	const filterUniqueModelsByKeyword = (/** @type {any[]} */ array, /** @type {any} */ keyword) => {
		const lowerKeyword = keyword.toLowerCase();
		let filterModels = array.filter((item) => item.name.toLowerCase().includes(lowerKeyword));
		const filter = filterModels.filter((item) => item.format === 'onnx');
		uniqueModels = sortModelById(filter);
		uniqueModels = [...new Set(uniqueModels.map((model) => model.id))];
		uniqueModels = uniqueModels;
	};

	const searchUniqueModels = () => {
		if (search) {
			filterUniqueModelsByKeyword(models, search);
		} else {
			uniqueModels = orginalUniqueModels;
		}
		updateModelCountofType();
	};

	const typeChange = (/** @type {{ currentTarget: { value: string; }; }} */ event) => {
		selected = event.currentTarget.value;
		console.log(selected);
		subModels = models.filter((item) => item.format === selected);
		console.log(subModels);
		subModels = sortModelById(subModels);
		console.log(subModels);
		uniqueModels = [...new Set(subModels.map((model) => model.id))];
		console.log(uniqueModels);
		uniqueModels = uniqueModels;
	};

	const getHTMLModelName = (/** @type {string} */ model) => {
		let name = getModelNameById(model);
		name = name
			?.replace('Encoder', '<span>Encoder</span>')
			.replace('Decoder', '<span>Decoder</span>')
			.replace('Non-KV-Cache', '<span>Non-KV-Cache</span>')
			.replace(' KV-Cache', ' <span>KV-Cache</span>')
			.replace('w/i Past', '<span>w/i Past</span>')
			.replace('Static Shape', '<span class="static">Static Shape</span>')
			.replace(
				'QDQ',
				'<span class="qdq" title="Quantization using QuantizeLinear and DeQuantizeLinear only">QDQ</span>'
			)
			.replace('MS Word', '<span class="word" title="Microsoft Word">MS Word</span>')
			.replace(
				'MS PowerPoint',
				'<span class="powerpoint" title="Microsoft PowerPoint">MS PowerPoint</span>'
			)
			.replace('Gemma', '<span class="phi3">Gemma</span>')
			.replace('Phi-3.5-mini', '<span class="phi3">Phi-3.5-mini</span>')
			.replace('Phi-3 Mini', '<span class="phi3">Phi-3 Mini</span>')
			.replace('ISV', '<span class="isv">ISV</span>')
			.replace('Demo', '<span class="demo" title="WebNN Developer Preview Demo model">Demo</span>')
			.replace('GPU', '<span class="gpu">GPU</span>')
			.replace('MLTensor', '<span class="mltensor">MLTensor</span>')
			.replace('WIP', '<span class="wip">WIP</span>')
			.replace('TFBench_Model', '<span class="tfbench">Model</span>')
			.replace('TFBench_Pipeline', '<span class="tfbench_pipeline">Pipeline</span>')
			.replace('Tiny Random', '<span title="Tiny Random">TR</span>')
			.replace('Conditional Generation', '<span title="Conditional Generation">CG</span>')
			.replace('fp32', '<span class="fp32">FP32</span>')
			.replace('fp16', '<span class="fp16">FP16</span>')
			.replace('int8', '<span class="int8">INT8</span>')
			.replace('int4', '<span class="int4">INT4</span>')
			.replace(
				'HF-FDO',
				'<span class="hf-fdo" title="freeDimensionOverrides in transformers.js_config">HF-FDO</span>'
			);
		return name;
	};

	beforeUpdate(() => {});

	onMount(() => {
		resetStore();
		let custom = {
			id: '',
			filename: '',
			size: '',
			time: '',
			node_attributes_value_fp16: false,
			properties: [],
			metadata: [],
			nodes: [],
			inputs: [],
			outputs: [],
			overrides: []
		};
		customStore.update(() => custom);
		autoStore.update(() => false);
		subModels = models.filter((item) => item.format === 'onnx');
		uniqueModels = sortModelById(subModels);
		uniqueModels = [...new Set(uniqueModels.map((model) => model.id))];
		uniqueModels = uniqueModels;
		orginalUniqueModels = uniqueModels;
		categories = getUniqueCategories(models);
		updateModelCountofType();
	});

	onDestroy(() => {});
</script>

<Header />

<div class="tqtitle">
	<div class="title tq">Performance Tests · {uniqueModels.length}</div>
	<div class="title">INT8 and INT4 models are not ready for testing</div>
</div>
<div class="search">
	<input
		id="search"
		type="text"
		on:input={searchUniqueModels}
		on:change={searchUniqueModels}
		bind:value={search}
		placeholder="Search models"
	/>
	<div id="category">
		{#each categories as tag}
			<button class="category" on:click={filterCategory(tag)}>{tag}</button>
		{/each}
		<button class="category" on:click={filterCategory}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="#5f6368"
				><path
					d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"
				/></svg
			>
			Reset</button
		>
	</div>
</div>

<div class="modelselection">
	<div class="tabs">
		<input
			type="radio"
			on:change={typeChange}
			checked={selected === 'onnx'}
			id="r-onnx"
			value="onnx"
			name="tabs"
		/>
		<label class="tab" for="r-onnx"><OnnxFull /></label>
		<input
			type="radio"
			on:change={typeChange}
			checked={selected === 'tflite'}
			id="r-tflite"
			value="tflite"
			name="tabs"
		/>
		<label class="tab" for="r-tflite"><TfliteFull /></label>
		<span class="glider"></span>
	</div>
</div>

<div>
	<div class="title tq fp16">2025 Top Models · FP16 · {top2025CountFP16}</div>
	<div class="tq benchmark fp16">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelIsvById(model) === 'ms' && model.indexOf('_fp16') > -1}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<!-- {#if getModelTypeById(model) === 'onnx'}
							<div class="onnx">
								<Onnx />
							</div>
						{/if}

						{#if getModelTypeById(model) === 'tflite'}
							<div class="tflite">
								<Tflite />
							</div>
						{/if} -->

						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq int8">2025 Top Models · INT8 · {top2025CountINT8}</div>
	<div class="tq benchmark int8">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelIsvById(model) === 'ms' && model.indexOf('_int8') > -1}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<!-- {#if getModelTypeById(model) === 'onnx'}
							<div class="onnx">
								<Onnx />
							</div>
						{/if}

						{#if getModelTypeById(model) === 'tflite'}
							<div class="tflite">
								<Tflite />
							</div>
						{/if} -->

						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq int4">2025 Top Models · INT4 · {top2025CountINT4}</div>
	<div class="tq benchmark int4">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelIsvById(model) === 'ms' && model.indexOf('_int4') > -1}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<!-- {#if getModelTypeById(model) === 'onnx'}
							<div class="onnx">
								<Onnx />
							</div>
						{/if}

						{#if getModelTypeById(model) === 'tflite'}
							<div class="tflite">
								<Tflite />
							</div>
						{/if} -->

						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq fp32">2025 Top Models · FP32 · {top2025CountFP32}</div>
	<div class="tq benchmark fp32">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelIsvById(model) === 'ms' && !(model.indexOf('_fp16') > -1 || model.indexOf('_int8') > -1 || model.indexOf('_int4') > -1)}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<!-- {#if getModelTypeById(model) === 'onnx'}
							<div class="onnx">
								<Onnx />
							</div>
						{/if}

						{#if getModelTypeById(model) === 'tflite'}
							<div class="tflite">
								<Tflite />
							</div>
						{/if} -->

						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq tf_benchmark">
		Transformers.js Benchmarking Pipeline and Model Test Suite · {hfbenchPipelineCountFp32}
	</div>
	<div>
		Reference: <a
			href="https://github.com/huggingface/transformers.js-benchmarking/tree/main/packages/core/src"
			>Transformers.js Benchmarking</a
		>
	</div>
	<div class="tq benchmark tf_benchmark">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if model.indexOf('_tfbench') > -1 && model.indexOf('tfbench_pipeline') > -1 && model.indexOf('_int8') === -1}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
				{#if model.indexOf('_tfbench') > -1 && model.indexOf('tfbench_model') > -1 && model.indexOf('_int8') === -1}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq tf_benchmark">
		Transformers.js Benchmarking Pipeline and Model Test Suite · {hfbenchPipelineCountInt8}
	</div>
	<div class="tq benchmark tf_benchmark">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if model.indexOf('_tfbench') > -1 && model.indexOf('tfbench_pipeline') > -1 && model.indexOf('_int8') > -1}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
				{#if model.indexOf('_tfbench') > -1 && model.indexOf('tfbench_model') > -1 && model.indexOf('_int8') > -1}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq demo">Developer Preview Models · {demoCount}</div>
	<div class="tq benchmark demo">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if model.indexOf('_demo') > -1}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<!-- {#if getModelTypeById(model) === 'onnx'}
							<div class="onnx">
								<Onnx />
							</div>
						{/if}

						{#if getModelTypeById(model) === 'tflite'}
							<div class="tflite">
								<Tflite />
							</div>
						{/if} -->

						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq int4">INT4 · {int4Count}</div>
	<div class="tq benchmark int4">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if (getModelDataTypeById(model) === 'int4' || (model.indexOf('_q4') > -1 && model.indexOf('_q4f16') === -1)) && getModelIsvById(model) !== 'ms'}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<!-- {#if getModelTypeById(model) === 'onnx'}
							<div class="onnx">
								<Onnx />
							</div>
						{/if}

						{#if getModelTypeById(model) === 'tflite'}
							<div class="tflite">
								<Tflite />
							</div>
						{/if} -->

						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if (model.indexOf('_q4') > -1 && model.indexOf('_q4f16') === -1)}<span>q4</span>{/if}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq int8">INT8 · {int8Count}</div>
	<div class="tq benchmark int8">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelDataTypeById(model) === 'int8' && model.indexOf('_tfbench') === -1 && model.indexOf('tfbench_pipeline') === -1 && getModelIsvById(model) !== 'ms'}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<!-- {#if getModelTypeById(model) === 'onnx'}
							<div class="onnx">
								<Onnx />
							</div>
						{/if}

						{#if getModelTypeById(model) === 'tflite'}
							<div class="tflite">
								<Tflite />
							</div>
						{/if} -->

						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq fp16">FLOAT16 · {fp16Count}</div>
	<div class="tq benchmark fp16">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if (getModelDataTypeById(model) === 'fp16' || model.indexOf('_q4f16') > -1) && model.indexOf('_demo') === -1 && getModelIsvById(model) !== 'ms'}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<!-- {#if getModelTypeById(model) === 'onnx'}
							<div class="onnx">
								<Onnx />
							</div>
						{/if}

						{#if getModelTypeById(model) === 'tflite'}
							<div class="tflite">
								<Tflite />
							</div>
						{/if} -->

						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if model.indexOf('_q4f16') > -1}<span>q4f16</span>{/if}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq">FLOAT32 · {fp32Count}</div>
	<div class="tq benchmark fp32">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelDataTypeById(model) === 'fp32' && model.indexOf('_tfbench') === -1 && model.indexOf('tfbench_pipeline') === -1 && getModelIsvById(model) !== 'ms'}
					<div
						class="q tests {model} tagH"
						title="{model.replaceAll('_', '-')} · {getModelDescriptionById(
							model
						)} · {getModelNoteById(model)}"
					>
						<div class="status_1 s netron_link">
							<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model)}"
								><ArrowOutward /></a
							>
						</div>
						<!-- {#if getModelTypeById(model) === 'onnx'}
							<div class="onnx">
								<Onnx />
							</div>
						{/if}

						{#if getModelTypeById(model) === 'tflite'}
							<div class="tflite">
								<Tflite />
							</div>
						{/if} -->

						<a href="{base}/run/{model}" class="titlemark"
							>{@html getHTMLModelName(model)}
							{#if getModelSizeById(model)}<span>{getModelSizeById(model)}</span>{/if}</a
						>

						{#if getModelTagById(model) === '2h'}
							<div class="tag"></div>
						{/if}
					</div>
				{/if}
			{/if}
		{/each}
	</div>
</div>

<Environment />
<Info />
<Footer />

<style>
	#category {
		display: flex;
		flex-direction: row;
		justify-items: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.category {
		background-color: var(--grey-02);
		display: inline-flex;
		font-size: 0.76rem;
		padding: 2px 8px;
		border: 1px solid var(--grey-02);
		border-radius: 20px;
		margin: 2px;
		color: var(--font-3);
		font-family: 'JetBrains Mono', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		cursor: pointer;
		align-items: center;
	}

	.category:hover {
		background-color: transparent;
		color: var(--red);
	}

	.category svg {
		width: 18px;
		height: 18px;
	}

	.category:hover svg path {
		fill: var(--red);
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.category:hover svg {
		animation-name: spin;
		animation-duration: 5000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	.title {
		text-align: center;
		color: var(--red);
	}

	.tq {
		margin-bottom: 10px;
	}

	.tq .q.tests {
		display: flex;
		align-items: center;
	}

	.tq .q.tests a {
		margin-left: 20px;
	}

	.tq .q.tests a:hover {
		color: var(--orange);
	}

	.tq.fp16 .q.tests a:hover {
		color: var(--fp16);
	}

	.tq.int8 .q.tests a:hover {
		color: var(--p);
	}

	.tq.int4 .q.tests a:hover {
		color: var(--int4);
	}

	.tq.fp32 .q.tests a:hover {
		color: var(--red);
	}

	.tq.demo .q.tests a:hover {
		color: var(--demo);
	}

	.tq.tf_benchmark .q.tests a:hover {
		color: var(--tfbench);
	}

	.tq .q:hover {
		border-bottom: 0px solid var(--fp16);
	}

	/* .tq.fp16 .q:hover {
		border-bottom: 1px solid var(--fp16);
	}

	.tq.int8 .q:hover {
		border-bottom: 1px solid var(--p);
	}

	.tq.int4 .q:hover {
		border-bottom: 1px solid var(--int4);
	}

	.tq.fp32 .q:hover {
		border-bottom: 1px solid var(--red);
	} */

	.modelselection {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tabs {
		display: flex;
		background-color: #fff;
		box-shadow:
			0 0 1px 0 rgba(var(--red), 0.15),
			0 6px 12px 0 rgba(var(--red), 0.15);
		padding: 6px 20px;
		border-radius: 99px;
		margin: 10px auto 0 auto;
		text-align: center;
	}

	input[type='radio'] {
		display: none;
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6px 20px;
		font-weight: 500;
		border-radius: 99px;
		cursor: pointer;
		transition: color 0.15s ease-in;
	}

	input[type='radio'] {
		&:checked {
			& + label {
				color: var(--red);
			}
		}
	}

	input[id='r-onnx'] {
		&:checked {
			& ~ .glider {
				transform: translateX(0);
			}
		}
	}

	input[id='r-tflite'] {
		&:checked {
			& ~ .glider {
				transform: translateX(100%);
			}
		}
	}
	/* 
	input[id='radio-3'] {
		&:checked {
			& ~ .glider {
				transform: translateX(200%);
			}
		}
	} */

	.glider {
		position: absolute;
		display: flex;
		height: 30px;
		width: 140px;
		background-color: var(--red-005);
		z-index: 1;
		border-radius: 99px;
		transition: 0.25s ease-out;
	}

	.benchmark {
		margin: 0.5rem 0 2rem 0;
	}

	.benchmark.tq .onnx,
	.benchmark.tq .tflite {
		margin: 0 0 2px 6px;
	}

	.search {
		margin: 0 auto;
		text-align: center;
	}

	#search {
		font-family: 'JetBrains Mono', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		display: inline-block;
		color: var(--font);
		border: 1px solid var(--grey-02);
		padding: 10px 10px;
		border-radius: 4px;
		cursor: pointer;
		margin-bottom: 10px;
		width: 380px;
		background-color: var(--grey-02);
	}

	#search:hover {
		border: 1px solid var(--grey-06);
	}

	#search:focus {
		outline: var(--red);
		background-color: var(--white);
		color: var(--red);
		border: 1px solid var(--red);
	}

	@media (max-width: 700px) {
		.tabs {
			transform: scale(0.6);
		}
	}

	@media (max-width: 512px) {
		#search {
			width: 90vw;
		}
	}
</style>
