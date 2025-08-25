<script>
    import RunManual from '$lib/components/RunManual.svelte';
    import { page } from '$app/stores';

    $: modelId = $page.params.id;
</script>

<RunManual {modelId} />