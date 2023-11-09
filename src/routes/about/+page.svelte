<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Fail from '$lib/components/svg/Fail.svelte';
</script>

<Header />

<div class="page">
	<h1>About</h1>

	<div>
		<a href="https://webmachinelearning.github.io/webnn-intro/">Web Neural Network API (WebNN)</a> is
		a new web standard that allows web apps and frameworks to accelerate deep neural networks with on-device
		hardware such as GPUs, CPUs, or purpose-built AI accelerators.
	</div>

	<div>
		<span class="red">Not ready for formal measurement usage</span>, please contact
		belem&commat;163.com for more details.
	</div>
</div>

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
</style>
