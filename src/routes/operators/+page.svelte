<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import Info from '$lib/components/Info.svelte';
	import ArrowOutward from '$lib/components/svg/ArrowOutward.svelte';
	import { models } from '$lib/config';
	import { beforeUpdate, onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';
	import { autoStore, customStore } from '$lib/store/store';
	import {
		resetStore,
		getModelNameById,
		getModelDataTypeById,
		getModelDescriptionById,
		getModelNoteById,
		getModelTagById,
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
	$: onnxOperatorsCountFP16 = 0;
	$: onnxOperatorsCountINT8 = 0;
	$: onnxOperatorsCountINT4 = 0;
	$: onnxOperatorsCountFP32 = 0;
	let subModels = models;

	const getUniqueCategories = (/** @type {any[]} */ array) => {
		let categories = array.map((item) => item.category);
		categories = [...new Set(categories)];
		categories = categories.filter((item) => item !== 'Model Access Check');
		return categories.sort();
	};

	const updateModelCountofType = () => {
		onnxOperatorsCountFP16 = 0;
		onnxOperatorsCountINT8 = 0;
		onnxOperatorsCountINT4 = 0;
		onnxOperatorsCountFP32 = 0;
		uniqueModels.forEach((item) => {
				if (item.id.endsWith('_fp16')) {
					onnxOperatorsCountFP16++;
				} else if (item.id.endsWith('_int8')) {
					onnxOperatorsCountINT8++;
				} else if (item.id.endsWith('_int4')) {
					onnxOperatorsCountINT4++;
				} else {
					onnxOperatorsCountFP32++;
				}
		});
	};

	const getHTMLModelName = (/** @type {string} */ model) => {
		let name = getModelNameById(model);
		name = name
			?.replace('Encoder', '<span>Encoder</span>')
			.replace('Decoder', '<span>Decoder</span>')
			.replace('Non-KV-Cache', '<span>Non-KV-Cache</span>')
			.replace('Static KV-Cache', '<span class="static">Static-KV-Cache</span>')
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
		let custom = { /* ... */ };
		customStore.update(() => custom);
		autoStore.update(() => false);

    // Only include models with tag === 'onnx_operators'
    subModels = models.filter((item) => item.format === 'onnx' && item.tag === 'onnx_operators');
    uniqueModels = sortModelById(subModels); // Keep as array of model objects
    orginalUniqueModels = uniqueModels;
    categories = getUniqueCategories(subModels);
    updateModelCountofType();
	});

	onDestroy(() => {});
</script>

<Header />

<div class="tqtitle">
	<div class="title tq">Operators Tests · {uniqueModels.length}</div>
	<div class="title">Please refrain from conducting tests, as they do not accurately reflect the real models.</div>
</div>

<div>

	<div class="title tq fp16">FLOAT16 · {onnxOperatorsCountFP16}</div>
	<div class="tq benchmark fp16">
			{#each uniqueModels as model}
					{#if model.id !== 'model_access_check'}
							{#if (getModelDataTypeById(model.id) === 'fp16' || model.id.indexOf('_q4f16') > -1)}
									<div
											class="q tests {model.id}"
											title="{model.id.replaceAll('_', '-')} · {getModelDescriptionById(model.id)} · {getModelNoteById(model.id)}"
									>
											<div class="status_1 s netron_link">
													<a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model.id)}"
															><ArrowOutward /></a
													>
											</div>
											<a href="{base}/run/{model.id}" class="titlemark"
													>{@html getHTMLModelName(model.id)}
													{#if model.id.indexOf('_q4f16') > -1}<span>q4f16</span>{/if}
													{#if getModelSizeById(model.id)}<span>{getModelSizeById(model.id)}</span>{/if}</a
											>
											{#if getModelTagById(model.id) === 'onnx_operators'}
													<div class="tag"></div>
											{/if}
									</div>
							{/if}
					{/if}
			{/each}
	</div>

	<div class="title tq">FLOAT32 · {onnxOperatorsCountFP32}</div>
<div class="tq benchmark fp32">
    {#each uniqueModels as model}
        {#if model.id !== 'model_access_check'}
            {#if (getModelDataTypeById(model.id) === 'fp32')}
                <div
                    class="q tests {model.id}"
                    title="{model.id.replaceAll('_', '-')} · {getModelDescriptionById(model.id)} · {getModelNoteById(model.id)}"
                >
                    <div class="status_1 s netron_link">
                        <a href="https://ibelem.github.io/netron/?url={getModelHFUrlById(model.id)}"
                            ><ArrowOutward /></a
                        >
                    </div>
                    <a href="{base}/run/{model.id}" class="titlemark"
                        >{@html getHTMLModelName(model.id)}
                        {#if getModelSizeById(model.id)}<span>{getModelSizeById(model.id)}</span>{/if}</a
                    >
                    {#if getModelTagById(model.id) === 'onnx_operators'}
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
		text-decoration: none;
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
