<script>
	import Environment from '$lib/components/Environment.svelte';
	import Config from '$lib/components/Config.svelte';
	import configs from '../store';
	import { base } from '$app/paths';
</script>

<div>{JSON.stringify($configs).replaceAll(',', ' ')}</div>

<div>
	<Config />
	<Environment />
	<a href="{base}/run">RUN</a>
</div>
