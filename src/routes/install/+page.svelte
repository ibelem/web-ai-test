<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
</script>

<Header />

<div class="page">
	<div class="tqtitle subtitle">
		<div class="title tq">WebNN Installation Guide for the AI PC</div>
	</div>

	<div id='install-guides' class="">
		For the most current and consistent installation instructions, see the <a title="WebNN Documentation - WebNN Installation Guide" href="https://webnn.io/en/learn/get-started/installation">WebNN Installation Guide</a> from <a href="https://webnn.io/">https://webnn.io/</a>.
	</div>
</div>

<Environment />

<Footer />

<style>
	.page {
		margin: 0 6px;
	}
	div {
		margin-bottom: 20px;
	}

	.title {
		text-align: center;
		color: var(--red);
	}

	a {
		margin: 1px auto;
		background-color: var(--red-01);
		display: inline-block;
		padding: 0px 6px;
		border-radius: 3px;
	}

	a:hover {
		background-color: var(--red);
		color: var(--white);
	}
</style>
