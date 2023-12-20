<script>
	import { resultsStore } from '$lib/store/store';
	import { fallback, fallbackEnv } from '$lib/fallback';
	import {
		getModelNameById,
		getModelTypeById,
		getModelDataTypeById,
		sortModelById
	} from '$lib/assets/js/utils';
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

	let filteredFallback = fallback;
	filteredFallback = sortModelById(filteredFallback);
	let filteredBackendFallback = filteredFallback;

	/**
	 * @type {any}
	 */
	let fallbackOptions = {
		cpu: true,
		gpu: true,
		npu: false
	};

	const toggleIndex = (/** @type {string} */ id) => {
		fallbackOptions[id] = !fallbackOptions[id];
		if (
			fallbackOptions.cpu === false &&
			fallbackOptions.gpu === false &&
			fallbackOptions.npu === false
		) {
			fallbackOptions.gpu = true;
		}
		filteredBackendFallback = filteredFallback.filter((item) => fallbackOptions[item.backend]);
	};

	onMount(() => {
		if (results && results.length > 0) {
			filteredFallback = fallback.filter((/** @type {{ name: any; }} */ fallbackItem) => {
				return results.some((resultItem) => resultItem.model === fallbackItem.name);
			});
			filteredFallback = sortModelById(filteredFallback);
		}
		filteredBackendFallback = filteredFallback.filter((item) => fallbackOptions[item.backend]);
	});
</script>

{#if (results && results.length > 0 && (results[0].webnn_cpu_1 || results[0].webnn_cpu_4 || results[0].webnn_gpu || results[0].webnn_npu)) || $page.url.pathname.indexOf('fallback') > -1}
	{#if filteredBackendFallback && filteredBackendFallback.length > 0}
		<div id="fallback">
			<div class="rqtitle">
				<div class="title rq mt">WebNN Fallback Status</div>
			</div>
			<div class="figure options">
				<span
					class="cpu {fallbackOptions.cpu}"
					role="button"
					tabindex="0"
					on:keydown={() => {}}
					on:click={() => toggleIndex('cpu')}>WebNN CPU</span
				>
				<span
					class="gpu {fallbackOptions.gpu}"
					role="button"
					tabindex="0"
					on:keydown={() => {}}
					on:click={() => toggleIndex('gpu')}>WebNN GPU</span
				>
				<span
					class="npu {fallbackOptions.npu}"
					role="button"
					tabindex="0"
					on:keydown={() => {}}
					on:click={() => toggleIndex('npu')}>WebNN NPU</span
				>
			</div>
			<div class="result">
				<div class="q _3 title {y_pin}">
					<div class="name" title="Model Name">Model</div>
					<div class="info" title="Model Info">Info</div>
					<div class="su" title="Supported">Supported</div>
					<div class="su ns" title="Not Supported">Not Supported</div>
					<div class="su nst" title="Not Supported (Input Type)">Input Type</div>
					<div class="node" title="Nodes">Nodes</div>
					<div class="err" title="Error">Errors</div>
				</div>
				{#each filteredBackendFallback as { name, backend, supported, not_supported, input_type_not_supported, partitions_supported_by_webnn, nodes_in_the_graph, nodes_supported_by_webnn, error }, i}
					<div class="q _3">
						<div class="name">{getModelNameById(name)}</div>
						<div class="info">
							{getModelTypeById(name)}<br />
							{getModelDataTypeById(name)}<br />
							{#if backend === 'cpu'}
								<span class="cpu">{backend}</span>{:else}<span class="gpu">{backend}</span>{/if}
						</div>
						<div class="su s">
							{#if supported}
								{#each supported as s}
									<span>{s}</span>
								{/each}
							{/if}
						</div>
						<div class="su ns">
							{#if not_supported}
								{#each not_supported as n}
									<span>{n}</span>
								{/each}
							{/if}
						</div>
						<div class="su nst">
							{#if input_type_not_supported}
								{#each input_type_not_supported as nst}
									<span>{nst}</span>
								{/each}
							{/if}
						</div>
						<div class="node">
							{#if partitions_supported_by_webnn}<span
									title="Number of partitions supported by WebNN"
									>{partitions_supported_by_webnn}</span
								><br />
							{/if}
							{#if nodes_in_the_graph}<span title="Number of nodes in the graph"
									>{nodes_in_the_graph}</span
								><br />
							{/if}
							{#if nodes_supported_by_webnn}<span title="Number of nodes supported by WebNN"
									>{nodes_supported_by_webnn}</span
								>{/if}
						</div>
						<div class="err">
							{#if error}{error} · We are working on it.{/if}
						</div>
					</div>
				{/each}
			</div>
			<div class="subtitle">
				Tested on Windows {fallbackEnv.windows} · Chrome Canary {fallbackEnv.version} · Last update:
				{fallbackEnv.last_update}
			</div>
		</div>
	{/if}
{/if}

<svelte:window bind:scrollY={y} />

<style>
	#fallback {
		margin: 10px 0 20px 0;
	}

	#fallback .result .q {
		background-color: var(--green-002);
	}

	#fallback .result .q:hover {
		color: var(--green);
	}

	#fallback .q._3.title.true {
		position: sticky;
		top: -1px;
		background-color: var(--white-09);
	}

	.q._3.title div {
		padding: 8px 2px;
	}

	.q._3 div {
		padding: 2px 2px;
		text-align: center;
		justify-self: center;
	}

	.mb {
		margin-bottom: 10px;
	}

	.mt {
		margin-top: 20px;
	}

	.name {
		width: 6vw;
	}

	.info {
		width: 4vw;
	}

	.info span.cpu {
		background-color: var(--b1-005);
		border-radius: 55px;
		padding: 1px 8px;
		font-size: 0.8em;
	}

	.result .q:hover .info span.cpu {
		background-color: var(--b1);
		color: var(--white);
	}

	.info span.gpu {
		background-color: var(--p2-005);
		border-radius: 55px;
		padding: 1px 8px;
		font-size: 0.8em;
	}

	.result .q:hover .info span.gpu {
		background-color: var(--p2);
		color: var(--white);
	}

	.su {
		width: 15vw;
	}
	.node {
		width: 6vw;
	}
	.err {
		width: 25vw;
	}

	.s span {
		background-color: var(--green-01);
		border-radius: 55px;
		display: inline-block;
		padding: 1px 8px;
		margin: 0 2px 2px 0;
		font-size: 0.8em;
	}

	.result .q:hover .s span {
		background-color: var(--green);
		color: var(--white);
	}

	.ns span,
	.nst span {
		background-color: var(--red-01);
		border-radius: 55px;
		display: inline-block;
		padding: 1px 8px;
		margin: 0 2px 2px 0;
		font-size: 0.8em;
	}

	.result .q:hover .ns span,
	.result .q:hover .nst span {
		background-color: var(--red);
		color: var(--white);
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
	}

	.subtitle {
		text-align: right;
		font-size: 0.8em;
		margin-top: 4px;
	}

	.figure.options span:hover {
		cursor: pointer;
	}

	.figure.options .cpu {
		background-color: var(--b1-005);
	}

	.figure.options .cpu:hover,
	.figure.options .cpu.true:hover {
		border: 1px solid var(--b1);
		background-color: var(--b1-005);
		padding: 0px 10px;
		color: var(--b1);
	}

	.figure.options .cpu.true {
		color: var(--white);
		background-color: var(--b1);
	}

	.figure.options .gpu {
		background-color: var(--p2-005);
	}

	.figure.options .gpu:hover,
	.figure.options .gpu.true:hover {
		border: 1px solid var(--p2);
		background-color: var(--p2-005);
		padding: 0px 10px;
		color: var(--p2);
	}

	.figure.options .gpu.true {
		color: var(--white);
		background-color: var(--p2);
	}

	.figure.options .npu {
		background-color: var(--purple-005);
	}

	.figure.options .npu:hover,
	.figure.options .npu.true:hover {
		background-color: var(--purple-005);
		border: 1px solid var(--purple);
		padding: 0px 10px;
		color: var(--purple);
	}

	.figure.options .npu.true {
		color: var(--white);
		background-color: var(--purple);
	}
</style>
