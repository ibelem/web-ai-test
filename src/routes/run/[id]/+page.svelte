<script>
	import RunManual from '$lib/components/RunManual.svelte';
	import { page } from '$app/state';
	// import { loadLiteRt } from '@litertjs/core';
	// import { onMount } from 'svelte';

	let modelId = $derived(page.params.id);
</script>

<RunManual {modelId} />
