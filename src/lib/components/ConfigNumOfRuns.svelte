<script>
	import { goTo } from '$lib/assets/js/utils';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	/**
	 * @type {number}
	 */
	let numOfRuns = 1;

	const setNumberOfRuns = () => {
		goTo('run', numOfRuns);
	};

	onMount(() => {
		let para = $page.url.searchParams;
		if (para.get('run')) {
			numOfRuns = parseInt(para.get('run'));
		}
	});
</script>

<div class="title">
	<span class="" title="Number of Runs">
		{#if numOfRuns === 1}
			{numOfRuns} Run
		{:else if numOfRuns > 1 && numOfRuns <= 1000}
			{numOfRuns} Runs
		{:else}
			# Runs
		{/if}
	</span>
</div>
<div class="numofruns">
	<label>
		<input type="number" bind:value={numOfRuns} min="1" max="1000" on:change={setNumberOfRuns} />
		<input type="range" bind:value={numOfRuns} min="1" max="1000" on:change={setNumberOfRuns} />
	</label>
</div>

<style>
	.title,
	.numofruns {
		margin-top: -4px;
	}

	.title span {
		text-align: center;
	}

	input[type='number'] {
		padding: 1px 6px;
		border: 1px solid var(--grey-02);
		margin-left: -6px;
	}
	input[type='number']:hover,
	input[type='number']:focus {
		border: 1px solid var(--red);
		outline: none;
	}
	input[type='range'] {
		-webkit-appearance: none;
		width: 70vw;
		height: 1px;
		border-radius: 5px;
		background-color: var(--grey-02);
		outline: none;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background-color: var(--grey-02);
	}

	input[type='range']:hover,
	input[type='range']:hover::-webkit-slider-thumb {
		background-color: var(--red);
	}

	input[type='range']:hover {
		height: 4px;
	}

	input[type='range']:hover::-webkit-slider-thumb {
		width: 16px;
		height: 16px;
		cursor: pointer;
	}

	.numofruns label:hover {
		background-color: transparent;
	}

	@media (max-width: 500px) {
		input[type='range'] {
			width: 35vw;
		}
	}
</style>
