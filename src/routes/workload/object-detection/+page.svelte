<script>
	import { onMount } from 'svelte';
	import { getHfUrlById, getLocalUrlByIdandLocaltion } from '$lib/assets/js/utils';
	import { pipeline, env } from '@xenova/transformers';
	import Upload from '$lib/components/svg/Upload.svelte';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const getModelUrl = (/** @type {string} */ id) => {
		let modelPath = '';
		if ($page.origin?.toLowerCase().indexOf('webai.run') > -1) {
			modelPath = getHfUrlById(id);
		} else {
			modelPath = getLocalUrlByIdandLocaltion(id, $page.origin);
		}
		return modelPath;
	};

	env.allowLocalModels = true;
	env.localModelPath = getModelUrl('detr_resnet_50_int8');

	// Disable the loading of remote models from the Hugging Face Hub:
	env.allowRemoteModels = false;

	// Set location of .wasm files. Defaults to use a CDN.
	// env.backends.onnx.wasm.wasmPaths = '../ort/';

	/**
	 * @type {HTMLParagraphElement}
	 */
	let status;
	let fileUpload;
	/**
	 * @type {HTMLDivElement}
	 */
	let imageContainer;
	let detector;

	// Detect objects in the image
	async function detect(img) {
		status.textContent = 'Analysing...';
		const output = await detector(img.src, {
			threshold: 0.5,
			percentage: true
		});
		status.textContent = '';
		console.log('output', output);
		output.forEach(renderBox);
	}

	// Render a bounding box and label on the image
	function renderBox({ box, label }) {
		const { xmax, xmin, ymax, ymin } = box;

		// Generate a random color for the box
		const color =
			'#' +
			Math.floor(Math.random() * 0xffffff)
				.toString(16)
				.padStart(6, 0);

		// Draw the box
		const boxElement = document.createElement('div');
		boxElement.className = 'bounding-box';
		Object.assign(boxElement.style, {
			borderColor: color,
			left: 100 * xmin + '%',
			top: 100 * ymin + '%',
			width: 100 * (xmax - xmin) + '%',
			height: 100 * (ymax - ymin) + '%'
		});

		// Draw label
		const labelElement = document.createElement('span');
		labelElement.textContent = label;
		labelElement.className = 'bounding-box-label';
		labelElement.style.backgroundColor = color;

		boxElement.appendChild(labelElement);
		imageContainer.appendChild(boxElement);
	}

	onMount(async () => {
		// Create a new object detection pipeline
		status.textContent = 'Loading model...';
		detector = await pipeline('object-detection', 'Xenova/detr-resnet-50');
		status.textContent = 'Ready';
		imageContainer = document.querySelector('#image-container');

		fileUpload.addEventListener('change', function (e) {
			const file = e.target.files[0];
			if (!file) {
				return;
			}

			const reader = new FileReader();

			// Set up a callback when the file is loaded
			reader.onload = function (e2) {
				imageContainer.innerHTML = '';
				const image = document.createElement('img');
				image.src = e2.target.result;
				imageContainer.appendChild(image);
				detect(image);
			};
			reader.readAsDataURL(file);
		});
	});
</script>

<Header />

<main class="container">
	<label class="custom-file-upload">
		<input id="file-upload" bind:this={fileUpload} type="file" accept="image/*" />
		<Upload />
		Upload image
	</label>
	<div id="image-container" bind:this={imageContainer}></div>
	<p id="status" bind:this={status}></p>
</main>

<Footer />

<style>
	.container {
		margin: 40px auto;
		width: max(50vw, 400px);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.custom-file-upload {
		display: flex;
		align-items: center;
		cursor: pointer;
		gap: 10px;
		border: 2px solid black;
		padding: 8px 16px;
		cursor: pointer;
		border-radius: 6px;
	}

	#file-upload {
		display: none;
	}

	#image-container {
		width: 100%;
		margin-top: 20px;
		position: relative;
	}
</style>
