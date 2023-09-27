<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { getModelIdfromPath } from '$lib/assets/js/utils';
	import { onMount } from 'svelte';

	$: url = base;
	$: search = '';
	$: fullSearch = search;

	const homeUrl = () => {
		let model = getModelIdfromPath();
		let host = $page.url.protocol + '//' + $page.url.hostname;
		let port = $page.url.port;
		if (port) {
			host = host + ':' + port;
		}
		if ($page.url.pathname.indexOf('web-ai-benchmark') > -1) {
			host = host + '/web-ai-benchmark';
		}

		if ($page.url.pathname.indexOf('/run/') > -1) {
			url = `${host}${search}&model=${model}`;
		} else {
			url = `${host}${fullSearch}`;
		}
	};

	onMount(() => {
		search = $page.url.search;

		if ($page.url.pathname.indexOf('/run/') > -1) {
			fullSearch = search + '&model=' + getModelIdfromPath();
		}
	});
</script>

<nav>
	<a href={url} on:click={homeUrl}>home</a>
	<a href="{base}/tests{fullSearch}">tests</a>
	<a href="{base}/about{fullSearch}">about</a>
</nav>
