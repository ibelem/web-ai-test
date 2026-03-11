<script>
	import { infoStore } from '$lib/store/store';
	import { copyInfo } from '$lib/assets/js/utils';
	import Log from './svg/Log.svelte';
	import LogToggle from './svg/LogToggle.svelte';
	import { testQueueStore } from '$lib/store/store';
	import { onDestroy } from 'svelte';

	let testQueue = $state([]);
	const unsubTestQueue = testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	let info = $state([]);
	const unsubInfo = infoStore.subscribe((value) => {
		info = value;
	});

	let logShow = $state(true);

	/**
	 * @type {HTMLDivElement}
	 */
	let element = $state();

	const scrollToBottom = async (/** @type {HTMLDivElement} */ node) => {
		node?.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	$effect.pre(() => {
		if (info) scrollToBottom(element);
	});

	$effect(() => {
		if (info && element) {
			scrollToBottom(element);
		}
	});

	onDestroy(() => {
		unsubTestQueue();
		unsubInfo();
	});
</script>

{#if logShow}
	{#if info.length > 0}
		<div class="inferlog" bind:this={element}>
			{#each info as i}
				<div>{i}</div>
			{/each}
		</div>
		{#if testQueue.length === 0}
			<div class="q copy">
				<div>
					<button title="Copy full test logs" onclick={() => copyInfo()}>
						<Log />
					</button>

					<button
						title="Hide logs"
						onclick={() => {
							logShow = false;
						}}
					>
						<LogToggle />
					</button>
				</div>
			</div>
		{/if}
	{/if}
{/if}

<style>
	.inferlog {
		margin-top: 10px;
		border: 1px solid var(--grey-02);
		padding: 10px;
		height: 200px;
		overflow-y: scroll;
		scroll-behavior: smooth;
		text-align: left;
	}

	.inferlog:hover {
		border: 1px solid var(--grey-04);
	}

	.inferlog {
		scrollbar-width: auto;
		scrollbar-color: var(--grey-02), #ffffff;
	}

	.inferlog::-webkit-scrollbar {
		width: 12px !important;
		height: 11px !important;
	}

	.inferlog::-webkit-scrollbar-track {
		background: transparent;
	}

	.inferlog::-webkit-scrollbar-thumb {
		background-color: var(--grey-04);
		border-radius: 10px;
		border: 5px solid #ffffff;
	}

	.inferlog:hover::-webkit-scrollbar-thumb {
		background-color: var(--green);
	}
</style>
