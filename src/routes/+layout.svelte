<script>
	import '$lib/assets/css/global.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div id="layout">
	<Header />
	<slot />
	<Footer />
</div>
