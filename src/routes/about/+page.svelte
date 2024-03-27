<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
</script>

<Header />

<div class="page">
	<div class="tqtitle subtitle">
		<div class="title tq">About</div>
	</div>

	<div>
		<a href="https://webmachinelearning.github.io/webnn-intro/">Web Neural Network API (WebNN)</a> is
		a new web standard that allows web apps and frameworks to accelerate deep neural networks with on-device
		hardware such as GPUs, CPUs, or purpose-built AI accelerators.
	</div>

	<div>
		Web AI Run is a web
		application for testing the performance of deep learning inference on client side, covering
		Web Assembly (Wasm), WebGL, WebGPU, WebNN CPU, WebNN GPU and WebNN NPU backends.
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
