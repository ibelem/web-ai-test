<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import Info from '$lib/components/Info.svelte';
	import Clock from '$lib/components/svg/Clock.svelte';
	import { models } from '$lib/config';
	import { beforeUpdate, onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';
	import { autoStore } from '$lib/store/store';
	import {
		resetStore,
		getModelNameById,
		getModelDataTypeById,
		getModelDescriptionById,
		getModelNoteById,
		sortModelById
	} from '$lib/assets/js/utils';

	/**
	 * @type {string[]}
	 */
	let uniqueModels = [];

	beforeUpdate(() => {
		resetStore();
		autoStore.update(() => false);
		uniqueModels = sortModelById(models);
		uniqueModels = [...new Set(uniqueModels.map((model) => model.id))];
	});

	onMount(() => {});

	onDestroy(() => {});
</script>

<Header />

<div class="tqtitle">
	<div class="title tq">Benchmark Tests</div>
</div>

<div>
	<div class="title tq">FLOAT32</div>
	<div class="tq">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelDataTypeById(model) === 'fp32'}
					<div class="q tests" title="{getModelDescriptionById(model)} {getModelNoteById(model)}">
						<div class="status_1 s">
							<Clock />
						</div>
						<a href="{base}/run/{model}" class="">{getModelNameById(model)}</a>
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<!-- <div class="title tq">INT64</div>
	<div class="tq">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelDataTypeById(model) === 'int64'}
					<div class="q tests" title="{getModelDescriptionById(model)} {getModelNoteById(model)}">
						<div class="status_1 s">
							<Clock />
						</div>
						<a href="{base}/run/{model}" class="">{getModelNameById(model)}</a>
					</div>
				{/if}
			{/if}
		{/each}
	</div> -->

	<div class="title tq">FLOAT16</div>
	<div class="tq">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelDataTypeById(model) === 'fp16'}
					<div class="q tests" title="{getModelDescriptionById(model)} {getModelNoteById(model)}">
						<div class="status_1 s">
							<Clock />
						</div>
						<a href="{base}/run/{model}" class="">{getModelNameById(model)}</a>
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<div class="title tq">INT8</div>
	<div class="tq">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				{#if getModelDataTypeById(model) === 'int8'}
					<div class="q tests" title="{getModelDescriptionById(model)} ">
						<div class="status_1 s">
							<Clock />
						</div>
						<a href="{base}/run/{model}" class="">{getModelNameById(model)}</a>
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	<Environment />
	<Info />
</div>
<Footer />

<style>
	.title {
		text-align: center;
		color: var(--red);
	}

	.tq {
		margin-bottom: 20px;
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
</style>
