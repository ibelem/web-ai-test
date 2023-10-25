<script>
	import Environment from '$lib/components/Environment.svelte';
	import Info from '$lib/components/Info.svelte';
	import Clock from '$lib/components/svg/Clock.svelte';
	import { models } from '$lib/config';
	import { beforeUpdate, onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';
	import { autoStore } from '../../lib/store/store';
	import { resetStore, getModelNameById } from '$lib/assets/js/utils';

	/**
	 * @type {string[]}
	 */
	let uniqueModels = [];

	beforeUpdate(() => {
		resetStore();
		autoStore.update(() => false);
		uniqueModels = [...new Set(models.map((model) => model.id))];
	});

	onMount(() => {});

	onDestroy(() => {});
</script>

<div class="tqtitle">
	<div class="title tq">Run single model tests</div>
</div>

<div>
	<div class="tq">
		{#each uniqueModels as model}
			{#if model !== 'model_access_check'}
				<div class="q tests">
					<div class="status_1 s">
						<Clock />
					</div>
					<a href="{base}/run/{model}" class="">{getModelNameById(model)}</a>
				</div>
			{/if}
		{/each}
	</div>

	<Environment />
	<Info />
</div>

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
