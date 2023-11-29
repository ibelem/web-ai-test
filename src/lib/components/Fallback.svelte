<script>
	import { resultsStore } from '$lib/store/store';
	import { fallback } from '$lib/fallback';
	import { models } from '$lib/config';
	import { getModelNameById, getModelTypeById, getModelDataTypeById } from '$lib/assets/js/utils';
	/**
	 * @type {string[]}
	 */
	let results;
	resultsStore.subscribe((value) => {
		results = value;
	});
</script>

<!-- "error": "Failed to execute 'buildSync' on 'MLGraphBuilder': XNNPACK can't support keep
dimensions.", "partitions_supported_by_webnn": 74, "nodes_in_the_graph": 385,
"nodes_supported_by_webnn": 309, "supported": [ "Add", "Div", "Mul", "Pow", "ReduceMean", "Reshape",
"Softmax", "Sub", "Transpose" ], "not_supported": [ "Erf", "Gather", "MatMul", "Reshape", "Sqrt" ],
"input_type_not_supported": [ "Reshape: INT64" ] }, -->

<!-- {#if results && results.length > 0} -->
<div id="fallback">
	<div class="rqtitle">
		<div class="title rq mb mt">Fallback</div>
	</div>
	<div class="result">
		<div class="q _3 title">
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

<!-- {/if} -->

<style>
	#fallback .result {
		font-size: 0.8em;
	}

	#fallback .result .q {
		background-color: var(--green-002);
		border-bottom: 1px solid var(--green);
	}

	#fallback .result .q:hover {
		background-color: var(--green);
		color: var(--white);
	}

	.q._3.title {
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
