<script>
	import RunManual from '$lib/components/RunManual.svelte';
	import { page } from '$app/stores';
	import { loadLiteRt } from '@litertjs/core';
	import { onMount } from 'svelte';

	$: modelId = $page.params.id;

	onMount(async () => {
		const isTflite =
			window.location.href.includes('tflite') ||
			modelId.includes('tflite') ||
			new URLSearchParams(window.location.search).get('modeltype') === 'tflite';

		if (isTflite && !window.__litertLoaded__) {
			await loadLiteRt('/litertjs/0.1.0/core/wasm');
			window.__litertLoaded__ = true;
		}
	});
</script>

<RunManual {modelId} />
