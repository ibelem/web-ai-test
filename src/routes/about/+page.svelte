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
		a new web standard that enables web applications and frameworks to accelerate deep neural networks
		using on-device hardware such as GPUs, CPUs, or purpose-built AI accelerators.
	</div>

	<div>
		Web AI Benchmark is a web application designed to test the performance of deep learning
		inference on the client side, covering Web Assembly (Wasm), WebGL, WebGPU, WebNN CPU, WebNN GPU,
		and WebNN NPU backends.
	</div>

	<div class="g2-metrics">
		<div>
			<p>It measures the performance of AI models using the following metrics:</p>
			<ul>
				<li>✔️ Build / Compilation Time</li>
				<li>✔️ Time to First Inference</li>
				<li>✔️ First Inference Time</li>
				<li>✔️ Average / Median Inference Time</li>
				<li>✔️ 90th Percentile Inference Time</li>
				<li>✔️ Best Inference Time</li>
				<li>✔️ Throughput</li>
			</ul>
		</div>
		<div>
			<p>For language models, the following test indicators are not currently supported:</p>
			<ul>
				<li>❌ Time to First Token (TTFS / Prefill)</li>
				<li>❌ Time Per Output Token (TPOT)</li>
				<li>❌ Decode Time</li>
				<li>❌ Tokens Per Second (TPS)</li>
				<li>❌ End-to-End Time</li>
				<li>❌ E2E Tokens Per Second</li>
			</ul>
		</div>
	</div>
	<div>
		Other applications to measure language model performance include:
		<ul>
			<li>
				<a href="https://microsoft.github.io/webnn-developer-preview/demos/text-generation/"
					>✨ WebNN Text Generation Demo</a
				>
			</li>
			<li>
				<a href="https://chat-nextjs.vercel.app/"
					>✨ Chat demos based on Next.js / Transformers.js</a
				>
			</li>
			<li>
				<a href="https://wenqini.github.io/built-in-ai-benchmark/">✨ Intel Built-in AI Benchmark</a
				>
			</li>
			<li>
				<a href="https://microsoftedge.github.io/Demos/built-in-ai/playgrounds/prompt-api/"
					>✨ Microsoft: Built-in AI Playground</a
				>
			</li>
			<li><a href="https://chrome.dev/web-ai-demos/#builtin">✨ Google: Built-in AI Demos</a></li>
			<li>
				<a href="https://chrome.dev/web-ai-demos/built-in-ai-playground/"
					>✨ Google: Built-In AI Playground</a
				>
			</li>
			<li>
				<a href="https://thangman22.github.io/built-in-ai-playground/"
					>✨ thangman22: Built-in AI Playground</a
				>
			</li>
		</ul>
	</div>
</div>

<Environment />

<Footer />

<style>
	.page {
		margin: 0 6px;
	}

	.g2-metrics {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0px;
	}

	div {
		margin: 10px 0;
	}

	.title {
		text-align: center;
		color: var(--red);
	}

	ul li {
		list-style-type: none;
	}

	a {
		color: var(--red);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.g2-metrics {
			grid-template-columns: 1fr;
			margin: 0;
		}
		div {
			margin: 5px;
		}
		ul {
			margin-left: -1.5rem;
		}
	}
</style>
