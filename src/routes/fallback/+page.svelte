<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import { models, ortDists } from '$lib/config';
	import { onMount } from 'svelte';
	import {
		getModelDataTypeById,
		getModelDescriptionById,
		getModelNoteById,
		getModelNameById,
		getDateTime
	} from '$lib/assets/js/utils';

	onMount(async () => {});

	/**
	 * @type {any[]}
	 */
	$: fallbackLog = [];

	const fallbackCheck = (/** @type {string} */ id) => {
		const worker = new Worker(ortDists.webnn_webglfix.workerjs);

		fallbackLog = [];

		fallbackLog.push(
			`${getDateTime()} Start to check WebNN fallback status of ${getModelNameById(id)}`
		);

		if (id === 'all') {
			worker.postMessage(models);
		} else {
			let m = models.find((model) => model.id === id);
			worker.postMessage([m]);
		}

		worker.onmessage = (event) => {
			const outputData = event.data;
			if (typeof outputData === 'object') {
				fallbackLog.push(JSON.stringify(outputData));
			} else {
				fallbackLog.push(outputData);
			}
			fallbackLog = fallbackLog;
			// Handle the output received from the worker
		};
	};
</script>

<Header />

<div class="tqtitle">
	<div class="title tq">WebNN Fallback Checker</div>
	<div>Check the WebNN fallback status of models with your current browser.</div>
</div>

{#if fallbackLog && fallbackLog.length > 0}
	<div class="result">
		{#each fallbackLog as fb}
			<div>{fb}</div>
		{/each}
	</div>
{/if}

<div class="title tq">FLOAT32</div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'fp32'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => fallbackCheck(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div>

<div class="title tq">FLOAT16</div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'fp16'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => fallbackCheck(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div>

<div class="title tq">INT64</div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'int64'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => fallbackCheck(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div>

<div class="title tq">INT8</div>
<div>
	{#each models as m}
		{#if m.id !== 'model_access_check'}
			{#if getModelDataTypeById(m.id) === 'int8'}
				<span class="q tests f" title="{getModelDescriptionById(m.id)} {getModelNoteById(m.id)}">
					<button on:click={() => fallbackCheck(m.id)}>{getModelNameById(m.id)}</button>
				</span>
			{/if}
		{/if}
	{/each}
</div>

<div class="run" title="It will take quite a long time...">
	<button on:click={() => fallbackCheck('all')}>Check WebNN Fallback for All Models</button>
</div>

<Environment />
<Footer />

<style>
	.tqtitle {
		margin: 0;
	}

	.title {
		text-align: center;
		color: var(--red);
	}

	.tq {
		margin: 10px 0 10px 0;
	}

	.result {
		border: 1px solid var(--grey-02);
		margin: 10px 0;
		padding: 10px;
	}

	.result:hover {
		border: 1px solid var(--red);
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

	.f button.true {
		background-image: none;
		background-color: var(--red-005);
		color: var(--red);
		border: 1px solid var(--red) !important;
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

	.run {
		margin-top: 40px;
	}
</style>
