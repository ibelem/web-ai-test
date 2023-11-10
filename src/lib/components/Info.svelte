<script>
	import { infoStore, modelDownloadProgressStore } from '$lib/store/store';
	import { getModelIdfromPath, getModelNameById } from '../../lib/assets/js/utils';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	/**
	 * @type {string[]}
	 */
	let info;
	infoStore.subscribe((value) => {
		info = value;
	});

	/**
	 * @type {string[]}
	 */
	let progress;
	modelDownloadProgressStore.subscribe((value) => {
		progress = value;
	});

	$: getProgress = (model) => {
		let p = progress.find((item) => item.name === model);
		if (p) {
			return p.progress;
		} else {
			return 0;
		}
	};

	$: getLoaded = (model) => {
		let p = progress.find((item) => item.name === model);
		if (p) {
			return p.current;
		} else {
			return 0;
		}
	};

	/**
	 * @type {string}
	 */

	let id = '';

	onMount(() => {
		id = getModelIdfromPath() || '';
		console.log('>>>' + $page.url.pathname);
	});
</script>

{#if info.length > 0 && $page.url.pathname.length > 1}
	<div class="info">
		<div class="ms">
			{#if getLoaded(id)}
				{#if getProgress(id) === '100.0'}
					<span title="{getModelNameById(id)} downloaded">{getLoaded(id)} MB</span>
				{/if}

				{#if getProgress(id) !== '100.0'}
					<span class="downloadprogress">{getLoaded(id)} MB / {getProgress(id)}%</span>
				{/if}
			{/if}
		</div>
		{info.slice(-1)}
	</div>
{/if}

<style>
	/* .info {
		height: 18px;
		position: fixed;
		bottom: 0px;
		left: 0px;
		background-color: #dee1e6;
		color: #3c4043;
		font-size: 11px;
		padding: 5px 10px 0px 10px;
		border-top-right-radius: 5px;
		font-family: Arial, sans-serif;
	} */
	.info {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 10px;
		color: var(--font);
	}

	.info .ms {
		text-align: center;
	}
</style>
