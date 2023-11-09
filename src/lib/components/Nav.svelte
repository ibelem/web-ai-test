<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { getModelIdfromPath, getModelTypeById, getModelDataTypeById } from '$lib/assets/js/utils';
	import { onMount } from 'svelte';

	$: url = base;
	$: search = '';
	$: fullSearch = search;

	const homeUrl = () => {
		search = $page.url.search;

		if ($page.url.pathname.indexOf('/run/') > -1 && search.indexOf('model=') <= -1) {
			if (search.indexOf('?') > -1) {
				let id = getModelIdfromPath();
				fullSearch = search + `&model=${id}`;
			} else {
				fullSearch = search;
			}
		} else {
			fullSearch = search;
		}

		let host = $page.url.protocol + '//' + $page.url.hostname;
		let port = $page.url.port;
		if (port) {
			host = host + ':' + port;
		}
		if ($page.url.pathname.indexOf('web-ai-benchmark') > -1) {
			host = host + '/web-ai-benchmark';
		}
		url = `${host}${fullSearch}`;
	};

	onMount(() => {});
</script>

<nav>
	<a href={url} on:click={homeUrl}>Home</a>
	<a href="{base}/tests{fullSearch}" on:click={homeUrl}>Tests</a>
	<a href="{base}/about{fullSearch}" on:click={homeUrl}>About</a>
</nav>
