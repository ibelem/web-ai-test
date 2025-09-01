<script>
	import RunManual from '$lib/components/RunManual.svelte';
	import { page } from '$app/stores';
	// import { loadLiteRt } from '@litertjs/core';
	// import { onMount } from 'svelte';

	$: modelId = $page.params.id;
</script>

<RunManual {modelId} />
