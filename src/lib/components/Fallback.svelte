<script>
	import { resultsStore } from '$lib/store/store';
	import { fallback, fallbackEnv } from '$lib/fallback';
	import { models } from '$lib/config';
	import { getModelNameById, getModelTypeById, getModelDataTypeById } from '$lib/assets/js/utils';
	import { afterUpdate } from 'svelte';
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
</script>

<div id="fallback">
	<div class="rqtitle">
		<div class="title rq mb mt">Fallback</div>
		<div class="subtitle">
			Tested on Chrome Canary {fallbackEnv.version} / Last update: {fallbackEnv.last_update}
		</div>
	</div>
	<div class="result">
		<div class="q _3 title {y_pin}">
			<div class="name" title="Model Name">Model</div>
			<div class="info" title="Model Info">Model Info</div>
			<div class="su" title="Supported">Supported</div>
			<div class="su" title="Not Supported">Not Supported</div>
			<div class="su" title="Not Supported (Input Type)">Input Type</div>
			<div class="node" title="Nodes">Nodes</div>
			<div class="err" title="Error">Errors</div>
		</div>
		{#each fallback as { name, backend, supported, not_supported, input_type_not_supported, partitions_supported_by_webnn, nodes_in_the_graph, nodes_supported_by_webnn, error }, i}
			<div class="q _3">
				<div class="name">{getModelNameById(name)}</div>
				<div class="info">
					{getModelTypeById(name)} ·
					{getModelDataTypeById(name)} · {#if backend}{backend}{/if}
				</div>
				<div class="su">
					{#if supported}{supported.toString().replaceAll(',', ', ')}{/if}
				</div>
				<div class="su">
					{#if not_supported}{not_supported.toString().replaceAll(',', ', ')}{/if}
				</div>
				<div class="su">
					{#if input_type_not_supported?.length > 0}{input_type_not_supported
							.toString()
							.replaceAll(',', ', ')}{/if}
				</div>
				<div class="node">
					{#if partitions_supported_by_webnn}<span title="Number of partitions supported by WebNN"
							>{partitions_supported_by_webnn}</span
						> ·
					{/if}
					{#if nodes_in_the_graph}<span title="Number of nodes in the graph"
							>{nodes_in_the_graph}</span
						> ·
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
</div>

<svelte:window bind:scrollY={y} />

<style>
	#fallback .result,
	#fallback .subtitle {
		font-size: 0.8em;
	}

	#fallback .result .q {
		background-color: var(--green-002);
	}

	#fallback .result .q:hover {
		background-color: var(--green);
		color: var(--white);
	}

	#fallback .q._3.title.true {
		position: sticky;
		top: -1px;
		background-color: var(--white);
	}

	.q._3.title div {
		padding: 8px 2px;
		font-weight: 600;
	}

	.q._3 div {
		padding: 2px 2px;
	}
	.mt {
		margin-top: 10px;
	}
	.mb {
		margin-bottom: 10px;
	}

	.name {
		width: 6vw;
	}

	.info {
		width: 4vw;
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
</style>
