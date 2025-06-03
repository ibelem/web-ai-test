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
	$: fp16Count = 0;
	$: int8Count = 0;
	$: int4Count = 0;
	$: fp32Count = 0;
	$: demoCount = 0;
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
		uniqueModels.forEach((item) => {
			if (item.endsWith('_int4')) {
				int4Count++;
			} else if (item.endsWith('_int8')) {
				int8Count++;
			} else if (item.endsWith('_fp16')) {
				fp16Count++;
			} else {
				fp32Count++;
			}

			if (item.indexOf('_demo') > -1) {
				demoCount++;
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
			.replace('Demo', '')
			.replace('GPU', '<span class="gpu">GPU</span>')
			.replace('MLTensor', '<span class="mltensor">MLTensor</span>')
			.replace('WIP', '<span class="wip">WIP</span>');
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
	<div class="title tq">PV Tests</div>
</div>

<div>
	<div class="tq benchmark">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelTagById(model) === 'pv'}
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
