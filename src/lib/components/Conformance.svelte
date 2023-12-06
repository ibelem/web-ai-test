<script>
	import { resultsStore } from '$lib/store/store';
	import { conformance, conformanceEnv } from '$lib/conformance';
	import { getModelNameById, getModelTypeById, getModelDataTypeById } from '$lib/assets/js/utils';
	import { afterUpdate, onMount } from 'svelte';
	import { page } from '$app/stores';

	/**
	 * @type {string[]}
	 */
	let results;
	resultsStore.subscribe((value) => {
		results = value;
	});

	/**
	 * @type {any}
	 */
	let y;
	let y_pin = false;

	afterUpdate(() => {
		y > 1024 ? (y_pin = true) : (y_pin = false);
	});

	let filteredConformance = conformance;

	const transformedData = {};

	filteredConformance.forEach((item) => {
		if (!transformedData[item.name]) {
			transformedData[item.name] = {
				name: item.name,
				gpu: item.gpu
			};
		}
		transformedData[item.name][item.backend] = {
			conformance_e3: item.conformance_e3 || '',
			conformance_e4: item.conformance_e4 || '',
			conformance_e5: item.conformance_e5 || '',
			result: item.result || {},
			error: item.error || ''
		};
	});

	onMount(() => {
		filteredConformance = Object.values(transformedData);

		if (results && results.length > 0) {
			filteredConformance = conformance.filter((/** @type {{ name: any; }} */ conformanceItem) => {
				return results.some((resultItem) => resultItem.model === conformanceItem.name);
			});
		}
	});
</script>

{#if (results && results.length > 0) || $page.url.pathname.indexOf('conformance') > -1}
	<div id="conformance">
		<div class="rqtitle">
			<div class="title rq mb mt">WebNN Conformance Status</div>
		</div>
		<div class="result">
			<div class="q _4 title {y_pin}">
				<div class="name" title="Model Name">Model</div>
				<div class="info" title="Model Info">Info</div>
				<div class="su" title="Wasm (Baseline)">Wasm / Baseline</div>
				<div class="su" title="WebGL">WebGL</div>
				<div class="su" title="WebGPU">WebGPU</div>
				<div class="su" title="WebNN CPU">WebNN CPU</div>
				<div class="su" title="WebNN GPU">WebNN GPU</div>
				<div class="su" title="WebNN NPU">WebNN NPU</div>
			</div>
			{#each filteredConformance as { name, wasm_4, webnn_cpu_4, webgl, webgpu, webnn_gpu, webnn_npu }, i}
				<div class="q _4">
					<div class="name">{getModelNameById(name)}</div>
					<div class="info">
						{getModelTypeById(name)}
						{getModelDataTypeById(name)}
					</div>
					<div class="su">
						{#if wasm_4}
							<span class="base">{wasm_4.conformance_e3}</span>
							<span class="base">{wasm_4.conformance_e4}</span>
							<span class="base">{wasm_4.conformance_e5}</span>
							{#if wasm_4.error}<br /><span class="err">{wasm_4.error}</span>{/if}
						{/if}
					</div>
					<div class="su">
						{#if webgl}
							{#if webgl.conformance_e3 === 'pass'}<span class="pass">{webgl.conformance_e3}</span
								>{:else if webgl.conformance_e3 === 'fail'}<span class="fail"
									>{webgl.conformance_e3}</span
								>{:else if webgl.conformance_e3 === 'n/a'}
								<span class="na">{webgl.conformance_e3}</span>{:else}<span
									>{webgl.conformance_e3}</span
								>
							{/if}
							{#if webgl.conformance_e4 === 'pass'}<span class="pass">{webgl.conformance_e4}</span
								>{:else if webgl.conformance_e4 === 'fail'}<span class="fail"
									>{webgl.conformance_e4}</span
								>{:else if webgl.conformance_e4 === 'n/a'}
								<span class="na">{webgl.conformance_e4}</span>{:else}<span
									>{webgl.conformance_e4}</span
								>
							{/if}
							{#if webgl.conformance_e5 === 'pass'}<span class="pass">{webgl.conformance_e5}</span
								>{:else if webgl.conformance_e5 === 'fail'}<span class="fail"
									>{webgl.conformance_e5}</span
								>{:else if webgl.conformance_e5 === 'n/a'}
								<span class="na">{webgl.conformance_e5}</span>{:else}<span
									>{webgl.conformance_e5}</span
								>
							{/if}
							{#if webgl.error}<br /><span class="err">{webgl.error}</span>{/if}
						{/if}
					</div>
					<div class="su">
						{#if webgpu}
							{#if webgpu.conformance_e3 === 'pass'}<span class="pass">{webgpu.conformance_e3}</span
								>{:else if webgpu.conformance_e3 === 'fail'}<span class="fail"
									>{webgpu.conformance_e3}</span
								>{:else if webgpu.conformance_e3 === 'n/a'}
								<span class="na">{webgpu.conformance_e3}</span>{:else}<span
									>{webgpu.conformance_e3}</span
								>
							{/if}
							{#if webgpu.conformance_e4 === 'pass'}<span class="pass">{webgpu.conformance_e4}</span
								>{:else if webgpu.conformance_e4 === 'fail'}<span class="fail"
									>{webgpu.conformance_e4}</span
								>{:else if webgpu.conformance_e4 === 'n/a'}
								<span class="na">{webgpu.conformance_e4}</span>{:else}<span
									>{webgpu.conformance_e4}</span
								>
							{/if}
							{#if webgpu.conformance_e5 === 'pass'}<span class="pass">{webgpu.conformance_e5}</span
								>{:else if webgpu.conformance_e5 === 'fail'}<span class="fail"
									>{webgpu.conformance_e5}</span
								>{:else if webgpu.conformance_e5 === 'n/a'}
								<span class="na">{webgpu.conformance_e5}</span>{:else}<span
									>{webgpu.conformance_e5}</span
								>
							{/if}
							{#if webgpu.error}<br /><span class="err">{webgpu.error}</span>{/if}
						{/if}
					</div>
					<div class="su">
						{#if webnn_cpu_4}
							{#if webnn_cpu_4.conformance_e3 === 'pass'}<span class="pass"
									>{webnn_cpu_4.conformance_e3}</span
								>{:else if webnn_cpu_4.conformance_e3 === 'fail'}<span class="fail"
									>{webnn_cpu_4.conformance_e3}</span
								>{:else if webnn_cpu_4.conformance_e3 === 'n/a'}
								<span class="na">{webnn_cpu_4.conformance_e3}</span>{:else}<span
									>{webnn_cpu_4.conformance_e3}</span
								>
							{/if}
							{#if webnn_cpu_4.conformance_e4 === 'pass'}<span class="pass"
									>{webnn_cpu_4.conformance_e4}</span
								>{:else if webnn_cpu_4.conformance_e4 === 'fail'}<span class="fail"
									>{webnn_cpu_4.conformance_e4}</span
								>{:else if webnn_cpu_4.conformance_e4 === 'n/a'}
								<span class="na">{webnn_cpu_4.conformance_e4}</span>{:else}<span
									>{webnn_cpu_4.conformance_e4}</span
								>
							{/if}
							{#if webnn_cpu_4.conformance_e5 === 'pass'}<span class="pass"
									>{webnn_cpu_4.conformance_e5}</span
								>{:else if webnn_cpu_4.conformance_e5 === 'fail'}<span class="fail"
									>{webnn_cpu_4.conformance_e5}</span
								>{:else if webnn_cpu_4.conformance_e5 === 'n/a'}
								<span class="na">{webnn_cpu_4.conformance_e5}</span>{:else}<span
									>{webnn_cpu_4.conformance_e5}</span
								>
							{/if}
							{#if webnn_cpu_4.error}<br /><span class="err">{webnn_cpu_4.error}</span>{/if}
						{/if}
					</div>
					<div class="su">
						{#if webnn_gpu}
							{#if webnn_gpu.conformance_e3 === 'pass'}<span class="pass"
									>{webnn_gpu.conformance_e3}</span
								>{:else if webnn_gpu.conformance_e3 === 'fail'}<span class="fail"
									>{webnn_gpu.conformance_e3}</span
								>{:else if webnn_gpu.conformance_e3 === 'n/a'}
								<span class="na">{webnn_gpu.conformance_e3}</span>{:else}<span
									>{webnn_gpu.conformance_e3}</span
								>
							{/if}
							{#if webnn_gpu.conformance_e4 === 'pass'}<span class="pass"
									>{webnn_gpu.conformance_e4}</span
								>{:else if webnn_gpu.conformance_e4 === 'fail'}<span class="fail"
									>{webnn_gpu.conformance_e4}</span
								>{:else if webnn_gpu.conformance_e4 === 'n/a'}
								<span class="na">{webnn_gpu.conformance_e4}</span>{:else}<span
									>{webnn_gpu.conformance_e4}</span
								>
							{/if}
							{#if webnn_gpu.conformance_e5 === 'pass'}<span class="pass"
									>{webnn_gpu.conformance_e5}</span
								>{:else if webnn_gpu.conformance_e5 === 'fail'}<span class="fail"
									>{webnn_gpu.conformance_e5}</span
								>{:else if webnn_gpu.conformance_e5 === 'n/a'}
								<span class="na">{webnn_gpu.conformance_e5}</span>{:else}<span
									>{webnn_gpu.conformance_e5}</span
								>
							{/if}
							{#if webnn_gpu.error}<br /><span class="err">{webnn_gpu.error}</span>{/if}
						{/if}
					</div>
					<div class="su">
						{#if webnn_npu}
							{#if webnn_npu.conformance_e3 === 'pass'}<span class="pass"
									>{webnn_npu.conformance_e3}</span
								>{:else if webnn_npu.conformance_e3 === 'fail'}<span class="fail"
									>{webnn_npu.conformance_e3}</span
								>{:else if webnn_npu.conformance_e3 === 'n/a'}
								<span class="na">{webnn_npu.conformance_e3}</span>{:else}<span
									>{webnn_npu.conformance_e3}</span
								>
							{/if}
							{#if webnn_npu.conformance_e4 === 'pass'}<span class="pass"
									>{webnn_npu.conformance_e4}</span
								>{:else if webnn_npu.conformance_e4 === 'fail'}<span class="fail"
									>{webnn_npu.conformance_e4}</span
								>{:else if webnn_npu.conformance_e4 === 'n/a'}
								<span class="na">{webnn_npu.conformance_e4}</span>{:else}<span
									>{webnn_npu.conformance_e4}</span
								>
							{/if}
							{#if webnn_npu.conformance_e5 === 'pass'}<span class="pass"
									>{webnn_npu.conformance_e5}</span
								>{:else if webnn_npu.conformance_e5 === 'fail'}<span class="fail"
									>{webnn_npu.conformance_e5}</span
								>{:else if webnn_npu.conformance_e5 === 'n/a'}
								<span class="na">{webnn_npu.conformance_e5}</span>{:else}<span
									>{webnn_npu.conformance_e5}</span
								>
							{/if}
							{#if webnn_npu.error}<br /><span class="err">{webnn_npu.error}</span>{/if}
						{/if}
					</div>
				</div>
			{/each}
		</div>
		<div class="subtitle">
			Tested on Chrome Canary {conformanceEnv.version} / {#if conformance[0].gpu}{conformance[0]
					.gpu} /{/if} Last update: {conformanceEnv.last_update}
		</div>
	</div>
{/if}

<svelte:window bind:scrollY={y} />

<style>
	#conformance {
		margin: 10px 0 20px 0;
	}

	#conformance .result .q {
		background-color: var(--green-002);
	}

	#conformance .result .q:hover {
		color: var(--green);
	}

	#conformance .q_4.title.true {
		position: sticky;
		top: -1px;
		background-color: var(--white-09);
	}

	.q._4.title div {
		padding: 8px 2px;
	}

	.q._4 div {
		padding: 2px 2px;
		text-align: center;
		justify-self: center;
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
		padding: 0;
		font-size: 0.8em;
		border-radius: 0;
	}

	.subtitle {
		text-align: right;
		font-size: 0.8em;
		margin-top: 4px;
	}

	.su span {
		border-radius: 55px;
		display: grid;
		padding: 1px 8px;
		margin: 0 2px 2px 0;
		font-size: 0.8em;
	}

	.su span.base {
		background-color: var(--grey-02);
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

	.result .q:hover span.base {
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
