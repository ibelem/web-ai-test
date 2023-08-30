<script>
	import Environment from '$lib/components/Environment.svelte';
	import Config from '$lib/components/Config.svelte';
	import configs from '../store';
</script>

<div>{JSON.stringify($configs).replaceAll(',', ' ')}</div>

<div>
	<Config />
	<Environment />
	<a href="./run">RUN</a>
</div>
