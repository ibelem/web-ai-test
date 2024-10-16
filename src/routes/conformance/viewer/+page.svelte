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
		getModelNameById,
		getModelTypeById,
		sortModelById,
		resetStore
	} from '$lib/assets/js/utils';

	/**
	 * @type {HTMLDivElement}
	 */
	let element;

	$: if (element) {
		scrollToBottom(element);
	}

	/**
	 * @type {any[]}
	 */
	let conformance;
	/**
	 * @type {string[]}
	 */
	let conformanceString;
	/**
	 * @type {string | any[]}
	 */
	let filteredDataConformance;

	const scrollToBottom = (/** @type {HTMLDivElement} */ node) => {
		node?.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	/**
	 * @type {any}
	 */
	let y;
	let y_pin = false;

	afterUpdate(() => {
		y > 1024 ? (y_pin = true) : (y_pin = false);
	});

	/**
	 * @type {any}
	 */
	let conformanceDataTypeOptions = {
		fp32: true,
		fp16: true,
		int8: true,
		int4: true,
	};

	const filter = () => {
		filteredDataConformance = conformance.filter((item) => {
			if (item.name.includes('_fp16') && conformanceDataTypeOptions.fp16) {
				return true;
			} else if (item.name.includes('_int8') && conformanceDataTypeOptions.int8) {
				return true;
			} else if (item.name.includes('_int4') && conformanceDataTypeOptions.int4) {
				return true;
			} else if (
				!item.name.includes('_fp16') &&
				!item.name.includes('_int8') &&
				!item.name.includes('_int4') &&
				conformanceDataTypeOptions.fp32
			) {
				return true;
			}
			return false;
		});
	};

	const toggleDataIndex = (/** @type {string} */ id) => {
		conformanceDataTypeOptions[id] = !conformanceDataTypeOptions[id];
		if (
			conformanceDataTypeOptions.fp32 === false &&
			conformanceDataTypeOptions.fp16 === false &&
			conformanceDataTypeOptions.int8 === false &&
			conformanceDataTypeOptions.int4 === false
		) {
			conformanceDataTypeOptions.fp32 = true;
		}

		filter();
	};

	const loadConformance = () => {
		console.log(JSON.parse(conformanceString));
		conformance = JSON.parse(conformanceString);
		conformance = sortModelById(conformance);
		filteredDataConformance = conformance;
	};

	beforeUpdate(() => {
		resetStore();
	});

	afterUpdate(() => {});

	onMount(async () => {});
</script>

<Header />

{#if filteredDataConformance && filteredDataConformance.length > 0}
	<div id="conformance">
		<div class="rqtitle">
			<div class="title rq mt">WebNN Conformance Status</div>
		</div>
		<div class="figure options">
			<span
				class="fp32 {conformanceDataTypeOptions.fp32}"
				role="button"
				tabindex="0"
				on:keydown={() => {}}
				on:click={() => toggleDataIndex('fp32')}>FP32</span
			>
			<span
				class="fp16 {conformanceDataTypeOptions.fp16}"
				role="button"
				tabindex="0"
				on:keydown={() => {}}
				on:click={() => toggleDataIndex('fp16')}>FP16</span
			>
			<span
				class="int8 {conformanceDataTypeOptions.int8}"
				role="button"
				tabindex="0"
				on:keydown={() => {}}
				on:click={() => toggleDataIndex('int8')}>INT8</span
			>
			<span
				class="int4 {conformanceDataTypeOptions.int4}"
				role="button"
				tabindex="0"
				on:keydown={() => {}}
				on:click={() => toggleDataIndex('int4')}>INT4</span
			>
		</div>
		<div class="result">
			<div class="q _5 title {y_pin}">
				<div class="name" title="Model Name">Model</div>
				<div class="info" title="Model Info">Info</div>
				<div class="info" title="Hardware">Hardware</div>
				<div class="su" title="Wasm (Baseline)">Wasm / Baseline</div>
				<div class="su" title="WebGL">WebGL</div>
				<div class="su" title="WebGPU">WebGPU</div>
				<div class="su" title="WebNN CPU">WebNN CPU</div>
				<div class="su" title="WebNN GPU">WebNN GPU</div>
				<div class="su" title="WebNN NPU">WebNN NPU</div>
			</div>
			{#each filteredDataConformance as { name, gpu, wasm_1, webnn_cpu_1, webgl, webgpu, webnn_gpu, webnn_npu }, i}
				<div class="q _5">
					<div class="name c" title={name?.replaceAll('_', '-')}>{getModelNameById(name)}</div>
					<div class="su info c">
						{getModelTypeById(name)}
						{getModelDataTypeById(name)}
					</div>
					<div class="hardware c" title="Hardware">{gpu}</div>
					<div class="su info">
						{#if wasm_1}
							<span class="base">{wasm_1.e3}</span>
							<span class="base">{wasm_1.e4}</span>
							<span class="base">{wasm_1.e5}</span>
							<span class="base">{wasm_1.e6}</span>
							<span class="base">{wasm_1.e7}</span>
							<span class="base">{wasm_1.e8}</span>
							<div class="dif">
								<span class="diff">max diff 1</span>
								<span class="diff">max diff 2</span>
								<span class="diff">max diff 3</span>
							</div>
							{#if wasm_1.error}<span class="err" title={wasm_1.error}>error</span>{/if}
							<span class="test"><a href="../c?q={name}__wasm_1">raw</a></span>
						{/if}
					</div>
					<div class="su">
						{#if webgl}
							{#if webgl.e3 === 'pass'}<span class="pass">{webgl.e3}</span
								>{:else if webgl.e3 === 'fail'}<span class="fail">{webgl.e3}</span
								>{:else if webgl.e3 === 'n/a'}
								<span class="na">{webgl.e3}</span>{:else}<span>{webgl.e3}</span>
							{/if}
							{#if webgl.e4 === 'pass'}<span class="pass">{webgl.e4}</span
								>{:else if webgl.e4 === 'fail'}<span class="fail">{webgl.e4}</span
								>{:else if webgl.e4 === 'n/a'}
								<span class="na">{webgl.e4}</span>{:else}<span>{webgl.e4}</span>
							{/if}
							{#if webgl.e5 === 'pass'}<span class="pass">{webgl.e5}</span
								>{:else if webgl.e5 === 'fail'}<span class="fail">{webgl.e5}</span
								>{:else if webgl.e5 === 'n/a'}
								<span class="na">{webgl.e5}</span>{:else}<span>{webgl.e5}</span>
							{/if}
							{#if webgl.e6 === 'pass'}<span class="pass">{webgl.e6}</span
								>{:else if webgl.e6 === 'fail'}<span class="fail">{webgl.e6}</span
								>{:else if webgl.e6 === 'n/a'}
								<span class="na">{webgl.e6}</span>{:else}<span>{webgl.e6}</span>
							{/if}
							{#if webgl.e7 === 'pass'}<span class="pass">{webgl.e7}</span
								>{:else if webgl.e7 === 'fail'}<span class="fail">{webgl.e7}</span
								>{:else if webgl.e7 === 'n/a'}
								<span class="na">{webgl.e7}</span>{:else}<span>{webgl.e7}</span>
							{/if}
							{#if webgl.e8 === 'pass'}<span class="pass">{webgl.e8}</span
								>{:else if webgl.e8 === 'fail'}<span class="fail">{webgl.e8}</span
								>{:else if webgl.e8 === 'n/a'}
								<span class="na">{webgl.e8}</span>{:else}<span>{webgl.e8}</span>
							{/if}
							<div class="dif">
								{#if webgl.max_diff}
									{#each webgl.max_diff as j}
										<span class="diff" title={j}>{j}</span>
									{/each}
								{/if}
							</div>
							{#if webgl.error}<span class="err" title={webgl.error}>error</span>{/if}
							<span class="test"><a href="../c?q={name}__webgl">raw</a></span>
						{/if}
					</div>
					<div class="su">
						{#if webgpu}
							{#if webgpu.e3 === 'pass'}<span class="pass">{webgpu.e3}</span
								>{:else if webgpu.e3 === 'fail'}<span class="fail">{webgpu.e3}</span
								>{:else if webgpu.e3 === 'n/a'}
								<span class="na">{webgpu.e3}</span>{:else}<span>{webgpu.e3}</span>
							{/if}
							{#if webgpu.e4 === 'pass'}<span class="pass">{webgpu.e4}</span
								>{:else if webgpu.e4 === 'fail'}<span class="fail">{webgpu.e4}</span
								>{:else if webgpu.e4 === 'n/a'}
								<span class="na">{webgpu.e4}</span>{:else}<span>{webgpu.e4}</span>
							{/if}
							{#if webgpu.e5 === 'pass'}<span class="pass">{webgpu.e5}</span
								>{:else if webgpu.e5 === 'fail'}<span class="fail">{webgpu.e5}</span
								>{:else if webgpu.e5 === 'n/a'}
								<span class="na">{webgpu.e5}</span>{:else}<span>{webgpu.e5}</span>
							{/if}
							{#if webgpu.e6 === 'pass'}<span class="pass">{webgpu.e6}</span
								>{:else if webgpu.e6 === 'fail'}<span class="fail">{webgpu.e6}</span
								>{:else if webgpu.e6 === 'n/a'}
								<span class="na">{webgpu.e6}</span>{:else}<span>{webgpu.e6}</span>
							{/if}
							{#if webgpu.e7 === 'pass'}<span class="pass">{webgpu.e7}</span
								>{:else if webgpu.e7 === 'fail'}<span class="fail">{webgpu.e7}</span
								>{:else if webgpu.e7 === 'n/a'}
								<span class="na">{webgpu.e7}</span>{:else}<span>{webgpu.e7}</span>
							{/if}
							{#if webgpu.e8 === 'pass'}<span class="pass">{webgpu.e8}</span
								>{:else if webgpu.e8 === 'fail'}<span class="fail">{webgpu.e8}</span
								>{:else if webgpu.e8 === 'n/a'}
								<span class="na">{webgpu.e8}</span>{:else}<span>{webgpu.e8}</span>
							{/if}
							<div class="dif">
								{#if webgpu.max_diff}
									{#each webgpu.max_diff as j}
										<span class="diff" title={j}>{j}</span>
									{/each}
								{/if}
							</div>
							{#if webgpu.error}<span class="err" title={webgpu.error}>error</span>{/if}
							<span class="test"><a href="../c?q={name}__webgpu">raw</a></span>
						{/if}
					</div>
					<div class="su">
						{#if webnn_cpu_1}
							{#if webnn_cpu_1.e3 === 'pass'}<span class="pass">{webnn_cpu_1.e3}</span
								>{:else if webnn_cpu_1.e3 === 'fail'}<span class="fail">{webnn_cpu_1.e3}</span
								>{:else if webnn_cpu_1.e3 === 'n/a'}
								<span class="na">{webnn_cpu_1.e3}</span>{:else}<span>{webnn_cpu_1.e3}</span>
							{/if}
							{#if webnn_cpu_1.e4 === 'pass'}<span class="pass">{webnn_cpu_1.e4}</span
								>{:else if webnn_cpu_1.e4 === 'fail'}<span class="fail">{webnn_cpu_1.e4}</span
								>{:else if webnn_cpu_1.e4 === 'n/a'}
								<span class="na">{webnn_cpu_1.e4}</span>{:else}<span>{webnn_cpu_1.e4}</span>
							{/if}
							{#if webnn_cpu_1.e5 === 'pass'}<span class="pass">{webnn_cpu_1.e5}</span
								>{:else if webnn_cpu_1.e5 === 'fail'}<span class="fail">{webnn_cpu_1.e5}</span
								>{:else if webnn_cpu_1.e5 === 'n/a'}
								<span class="na">{webnn_cpu_1.e5}</span>{:else}<span>{webnn_cpu_1.e5}</span>
							{/if}
							{#if webnn_cpu_1.e6 === 'pass'}<span class="pass">{webnn_cpu_1.e6}</span
								>{:else if webnn_cpu_1.e6 === 'fail'}<span class="fail">{webnn_cpu_1.e6}</span
								>{:else if webnn_cpu_1.e6 === 'n/a'}
								<span class="na">{webnn_cpu_1.e6}</span>{:else}<span>{webnn_cpu_1.e6}</span>
							{/if}
							{#if webnn_cpu_1.e7 === 'pass'}<span class="pass">{webnn_cpu_1.e7}</span
								>{:else if webnn_cpu_1.e7 === 'fail'}<span class="fail">{webnn_cpu_1.e7}</span
								>{:else if webnn_cpu_1.e7 === 'n/a'}
								<span class="na">{webnn_cpu_1.e7}</span>{:else}<span>{webnn_cpu_1.e7}</span>
							{/if}
							{#if webnn_cpu_1.e8 === 'pass'}<span class="pass">{webnn_cpu_1.e8}</span
								>{:else if webnn_cpu_1.e8 === 'fail'}<span class="fail">{webnn_cpu_1.e8}</span
								>{:else if webnn_cpu_1.e8 === 'n/a'}
								<span class="na">{webnn_cpu_1.e8}</span>{:else}<span>{webnn_cpu_1.e8}</span>
							{/if}
							<div class="dif">
								{#if webnn_cpu_1.max_diff}
									{#each webnn_cpu_1.max_diff as j}
										<span class="diff" title={j}>{j}</span>
									{/each}
								{/if}
							</div>
							{#if webnn_cpu_1.error}<span class="err" title={webnn_cpu_1.error}>error</span>{/if}
							<span class="test"><a href="../c?q={name}__webnn_cpu_1">raw</a></span>
						{/if}
					</div>
					<div class="su">
						{#if webnn_gpu}
							{#if webnn_gpu.e3 === 'pass'}<span class="pass">{webnn_gpu.e3}</span
								>{:else if webnn_gpu.e3 === 'fail'}<span class="fail">{webnn_gpu.e3}</span
								>{:else if webnn_gpu.e3 === 'n/a'}
								<span class="na">{webnn_gpu.e3}</span>{:else}<span>{webnn_gpu.e3}</span>
							{/if}
							{#if webnn_gpu.e4 === 'pass'}<span class="pass">{webnn_gpu.e4}</span
								>{:else if webnn_gpu.e4 === 'fail'}<span class="fail">{webnn_gpu.e4}</span
								>{:else if webnn_gpu.e4 === 'n/a'}
								<span class="na">{webnn_gpu.e4}</span>{:else}<span>{webnn_gpu.e4}</span>
							{/if}
							{#if webnn_gpu.e5 === 'pass'}<span class="pass">{webnn_gpu.e5}</span
								>{:else if webnn_gpu.e5 === 'fail'}<span class="fail">{webnn_gpu.e5}</span
								>{:else if webnn_gpu.e5 === 'n/a'}
								<span class="na">{webnn_gpu.e5}</span>{:else}<span>{webnn_gpu.e5}</span>
							{/if}
							{#if webnn_gpu.e6 === 'pass'}<span class="pass">{webnn_gpu.e6}</span
								>{:else if webnn_gpu.e6 === 'fail'}<span class="fail">{webnn_gpu.e6}</span
								>{:else if webnn_gpu.e6 === 'n/a'}
								<span class="na">{webnn_gpu.e6}</span>{:else}<span>{webnn_gpu.e6}</span>
							{/if}
							{#if webnn_gpu.e7 === 'pass'}<span class="pass">{webnn_gpu.e7}</span
								>{:else if webnn_gpu.e7 === 'fail'}<span class="fail">{webnn_gpu.e7}</span
								>{:else if webnn_gpu.e7 === 'n/a'}
								<span class="na">{webnn_gpu.e7}</span>{:else}<span>{webnn_gpu.e7}</span>
							{/if}
							{#if webnn_gpu.e8 === 'pass'}<span class="pass">{webnn_gpu.e8}</span
								>{:else if webnn_gpu.e8 === 'fail'}<span class="fail">{webnn_gpu.e8}</span
								>{:else if webnn_gpu.e8 === 'n/a'}
								<span class="na">{webnn_gpu.e8}</span>{:else}<span>{webnn_gpu.e8}</span>
							{/if}
							<div class="dif">
								{#if webnn_gpu.max_diff}
									{#each webnn_gpu.max_diff as j}
										<span class="diff" title={j}>{j}</span>
									{/each}
								{/if}
							</div>
							{#if webnn_gpu.error}<span class="err" title={webnn_gpu.error}>error</span>{/if}
							<span class="test"><a href="../c?q={name}__wenn_gpu">raw</a></span>
						{/if}
					</div>
					<div class="su">
						{#if webnn_npu}
							{#if webnn_npu.e3 === 'pass'}<span class="pass">{webnn_npu.e3}</span
								>{:else if webnn_npu.e3 === 'fail'}<span class="fail">{webnn_npu.e3}</span
								>{:else if webnn_npu.e3 === 'n/a'}
								<span class="na">{webnn_npu.e3}</span>{:else}<span>{webnn_npu.e3}</span>
							{/if}
							{#if webnn_npu.e4 === 'pass'}<span class="pass">{webnn_npu.e4}</span
								>{:else if webnn_npu.e4 === 'fail'}<span class="fail">{webnn_npu.e4}</span
								>{:else if webnn_npu.e4 === 'n/a'}
								<span class="na">{webnn_npu.e4}</span>{:else}<span>{webnn_npu.e4}</span>
							{/if}
							{#if webnn_npu.e5 === 'pass'}<span class="pass">{webnn_npu.e5}</span
								>{:else if webnn_npu.e5 === 'fail'}<span class="fail">{webnn_npu.e5}</span
								>{:else if webnn_npu.e5 === 'n/a'}
								<span class="na">{webnn_npu.e5}</span>{:else}<span>{webnn_npu.e5}</span>
							{/if}
							{#if webnn_npu.e6 === 'pass'}<span class="pass">{webnn_npu.e6}</span
								>{:else if webnn_npu.e6 === 'fail'}<span class="fail">{webnn_npu.e6}</span
								>{:else if webnn_npu.e6 === 'n/a'}
								<span class="na">{webnn_npu.e6}</span>{:else}<span>{webnn_npu.e6}</span>
							{/if}
							{#if webnn_npu.e7 === 'pass'}<span class="pass">{webnn_npu.e7}</span
								>{:else if webnn_npu.e7 === 'fail'}<span class="fail">{webnn_npu.e7}</span
								>{:else if webnn_npu.e7 === 'n/a'}
								<span class="na">{webnn_npu.e7}</span>{:else}<span>{webnn_npu.e7}</span>
							{/if}
							{#if webnn_npu.e8 === 'pass'}<span class="pass">{webnn_npu.e8}</span
								>{:else if webnn_npu.e8 === 'fail'}<span class="fail">{webnn_npu.e8}</span
								>{:else if webnn_npu.e8 === 'n/a'}
								<span class="na">{webnn_npu.e8}</span>{:else}<span>{webnn_npu.e8}</span>
							{/if}
							<div class="dif">
								{#if webnn_npu.max_diff}
									{#each webnn_npu.max_diff as j}
										<span class="diff" title={j}>{j}</span>
									{/each}
								{/if}
							</div>
							{#if webnn_npu.error}<span class="err" title={webnn_npu.error}>error</span>{/if}
							<span class="test"><a href="../c?q={name}__wenn_npu">raw</a></span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<div class="tqtitle">
	<div class="title tq">WebNN Conformance Viewer</div>
</div>

<div class="fs">
	<textarea class="confdata" contenteditable="true" bind:value={conformanceString}></textarea>
</div>

<div class="run">
	<button on:click={() => loadConformance()}>Load Conformance JSON File</button>
</div>

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

	.result .title {
		color: var(--font);
	}

	.title.rq {
		color: var(--green);
	}

	.tq {
		margin: 10px 0 10px 0;
	}

	.confdata {
		margin-top: 10px;
		border: 1px solid var(--grey-02);
		padding: 10px;
		height: 120px;
		overflow-y: scroll;
		scroll-behavior: smooth;
		text-align: left;
		font-size: 10px;
		outline: var(--green);
		width: 88vw;
	}

	.confdata:hover {
		border: 1px solid var(--grey-04);
	}

	.confdata {
		scrollbar-width: auto;
		scrollbar-color: var(--grey-02), #ffffff;
	}

	.confdata::-webkit-scrollbar {
		width: 12px !important;
		height: 11px !important;
	}

	.confdata::-webkit-scrollbar-track {
		background: transparent;
	}

	.confdata::-webkit-scrollbar-thumb {
		background-color: var(--grey-04);
		border-radius: 10px;
		border: 5px solid #ffffff;
	}

	.confdata:hover::-webkit-scrollbar-thumb {
		background-color: var(--green);
	}

	.run {
		margin-top: 10px;
	}

	#conformance {
		margin: 10px 0 20px 0;
	}

	#conformance .result .q {
		background-color: var(--green-002);
		align-items: start;
	}

	#conformance .result .q:hover {
		color: var(--green);
	}

	#conformance .q._5.title.true {
		position: sticky;
		top: -1px;
		background-color: var(--white-09);
	}

	#conformance .mt {
		margin-top: 10px;
	}

	.q._5.title div {
		padding: 8px 2px;
		font-size: 1em;
	}

	.q._5 div {
		padding: 2px 2px;
		text-align: center;
		justify-self: center;
		font-size: 0.8em;
	}

	.q._5 .c {
		align-self: center;
	}

	.mb {
		margin-bottom: 10px;
	}

	.result .q:hover .err {
		background-color: var(--red);
		color: var(--white);
	}

	.result .q.title:hover .err {
		background-color: var(--white-09);
		color: var(--green);
	}

	.result .q .err {
		background-color: var(--red-005);
		margin-top: 0px;
		margin-left: 4px;
		padding: 0px 6px !important;
		text-align: center;
	}

	.subtitle {
		text-align: right;
		margin-top: 4px;
		font-size: 0.8em;
	}

	.su span {
		border-radius: 55px;
		display: block;
		justify-content: center;
		padding: 0px 6px;
		margin: 2px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 80px;
	}

	.su span.base {
		background-color: var(--grey-02);
	}

	.dif span.diff {
		padding: 0px 6px !important;
		background-color: var(--grey-02);
		font-size: 9.6px;
	}

	.su span.pass {
		background-color: var(--green-01);
	}

	.su span.fail {
		background-color: var(--red-01);
	}

	.su span.na {
		background-color: var(--orange-01);
	}

	.su span.test {
		background-color: var(--blue-01);
		margin-left: 4px;
	}

	.dif + .test {
		margin-top: -2px;
	}

	.result .q:hover span.test {
		background-color: var(--blue);
		color: var(--white) !important;
	}

	.result .q:hover span.test a {
		color: var(--white) !important;
	}

	.dif {
		margin-top: -4px;
	}

	.diff {
		justify-content: flex-start !important;
	}

	.result .q:hover span.base,
	.result .q:hover .dif span.diff {
		background-color: var(--onnx);
		color: var(--white);
	}

	.result .q:hover span.pass {
		background-color: var(--green);
		color: var(--white);
	}

	.result .q:hover span.fail {
		background-color: var(--red);
		color: var(--white);
	}

	.result .q:hover span.na {
		background-color: var(--orange);
		color: var(--white);
	}
</style>
