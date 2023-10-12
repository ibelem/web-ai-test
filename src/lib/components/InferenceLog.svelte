<script>
	import { infoStore } from '$lib/store/store';
	import { copyInfo } from '$lib/assets/js/utils';
	import { afterUpdate, onMount } from 'svelte';
	import Log from './svg/Log.svelte';
	import { testQueueStore } from '$lib/store/store';

	/**
	 * @type {string[]}
	 */
	export let testQueue;
	testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	/**
	 * @type {string[]}
	 */
	export let info;
	infoStore.subscribe((value) => {
		info = value;
	});

	/**
	 * @type {HTMLDivElement}
	 */
	let element;

	$: if (info && element) {
		scrollToBottom(element);
	}

	const scrollToBottom = async (/** @type {HTMLDivElement} */ node) => {
		node?.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	afterUpdate(() => {
		if (info) scrollToBottom(element);
	});
</script>

{#if info.length > 0}
	<div class="inferlog" bind:this={element}>
		{#each info as i}
			<div>{i}</div>
		{/each}
	</div>
	{#if testQueue.length === 0}
		<div class="q copy">
			<div>
				<button title="Copy full test logs" on:click={() => copyInfo()}>
					<Log />
				</button>
			</div>
		</div>
	{/if}
{/if}

<style>
	.inferlog {
		margin-top: 10px;
		border: 1px solid var(--grey-02);
		padding: 10px;
		height: 140px;
		overflow: scroll;
		scroll-behavior: smooth;
	}

	* {
		scrollbar-width: auto;
		scrollbar-color: var(--grey-02) #ffffff;
	}

	*::-webkit-scrollbar {
		width: 13px;
		height: 12px;
	}

	*::-webkit-scrollbar-track {
		background: #ffffff;
	}

	*::-webkit-scrollbar-thumb {
		background-color: var(--grey-04);
		border-radius: 10px;
		border: 5px solid #ffffff;
	}
</style>
