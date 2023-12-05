<script>
	import { testQueueStore } from '$lib/store/store';
	import ConfigBackendsConformance from './ConfigBackendsConformance.svelte';
	import ConfigModels from './ConfigModels.svelte';
	let showConfig = true;
	const toggleConfig = () => {
		showConfig = !showConfig;
	};
	/**
	 * @type {string[]}
	 */
	export let testQueue;
	testQueueStore.subscribe((value) => {
		testQueue = value;
	});
</script>

<div class={showConfig.toString()}>
	<div class="config">
		<ConfigBackendsConformance />
		<ConfigModels />
	</div>
	{#if testQueue.length !== 0}
		<div class="toggleconfig">
			<button title="Hide/Show test options" on:click={() => toggleConfig()}>
				{#if showConfig}
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
						><path
							d="m357-384 123-123 123 123 57-56-180-180-180 180 57 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
						/></svg
					>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
						><path
							d="m480-340 180-180-57-56-123 123-123-123-57 56 180 180Zm0 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
						/></svg
					>
				{/if}
			</button>
		</div>
	{/if}
</div>

<style>
	.true .config {
		margin-top: 0px;
		transition: margin-bottom 0.5s ease-in-out;
	}
	.false .config {
		height: 180px;
		margin-top: -200px;
		transition: margin-top 0.3s ease-out;
	}

	.toggleconfig {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		border-bottom: 0px solid transparent !important;
	}

	.toggleconfig button {
		border: 1px solid var(--grey-02);
		background-color: transparent;
		cursor: pointer;
		margin-left: -10px;
		border-top: 0px solid transparent;
		padding: 4px 16px 0 16px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.toggleconfig:hover {
		border-bottom: 0px solid transparent !important;
	}

	.toggleconfig svg {
		width: 16px;
		height: 16px;
	}
	.toggleconfig svg path {
		fill: var(--grey);
	}
	.toggleconfig:hover svg path {
		fill: var(--orange);
	}

	.toggleconfig svg:hover path {
		fill: var(--green);
	}
</style>
