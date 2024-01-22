<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
</script>

<Header />

<div class="page">
	<div class="tqtitle subtitle">
		<div class="title tq">Demo</div>
	</div>

	<div>
		<a href="../stable-diffusion/sync.html">Stable Diffusion · UNet 1.5 · Sync</a>
	</div>
	<div>
		<a href="../stable-diffusion/index.html">Stable Diffusion · UNet 1.5 · Async</a>
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

	.red {
		color: var(--red);
	}

	.title {
		text-align: center;
		color: var(--red);
	}
</style>
