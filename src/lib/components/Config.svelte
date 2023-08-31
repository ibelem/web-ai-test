<script>
	import { goto } from '$app/navigation';
	import { numberofruns } from '../../store';
	import settings from '../../store';
	$: ({
		wasm_1,
		wasm_4,
		webgl,
		webgpu,
		webnn_cpu_1,
		webnn_cpu_4,
		webnn_gpu,
		webnn_npu,
		mobilenet_v2_7,
		mobilenet_v2_10,
		efficientnet_lite4_11,
		resnet50_v1_12,
		resnet50_v2_7,
		squeezenet_11_7,
		fns_candy_8,
		emotion_ferplus_8,
		densenet_9,
		tinyyolov2_8
	} = $settings);

	/**
	 * @type {number}
	 */
	let numOfRuns;

	numberofruns.subscribe((value) => {
		numOfRuns = value;
	});

	const setNumberOfRuns = () => {
		numberofruns.update(() => numOfRuns);
		goTo();
	};

	const goTo = (/** @type {string | undefined} */ value) => {
		console.log('wasm_1: ' + wasm_1);

		if (value === 'toggle_backends') {
			settings.toggleBackends();
		} else if (value === 'wasm_1') {
			settings.setWasm1();
		} else if (value === 'wasm_4') {
			settings.setWasm4();
		} else if (value === 'webgl') {
			settings.setWebgl();
		} else if (value === 'webgpu') {
			settings.setWebGpu;
		} else if (value === 'webnn_cpu_1') {
			settings.setWebnnCpu1();
		} else if (value === 'webnn_cpu_4') {
			settings.setWebnnCpu4();
		} else if (value === 'webnn_gpu') {
			settings.setWebnnGpu();
		} else if (value === 'webnn_npu') {
			settings.setWebnnNpu();
		} else if (value === 'toggle_models') {
			settings.toggleModels();
		} else if (value === 'mobilenet_v2_7') {
			settings.set_mobilenet_v2_7();
		} else if (value === 'mobilenet_v2_10') {
			settings.set_mobilenet_v2_10();
		} else if (value === 'efficientnet_lite4_11') {
			settings.set_efficientnet_lite4_11();
		} else if (value === 'resnet50_v1_12') {
			settings.set_resnet50_v1_12();
		} else if (value === 'resnet50_v2_7') {
			settings.set_resnet50_v2_7();
		} else if (value === 'squeezenet_11_7') {
			settings.set_squeezenet_11_7();
		} else if (value === 'fns_candy_8') {
			settings.set_fns_candy_8();
		} else if (value === 'emotion_ferplus_8') {
			settings.set_emotion_ferplus_8();
		} else if (value === 'densenet_9') {
			settings.set_densenet_9();
		} else if (value === 'tinyyolov2_8') {
			settings.set_tinyyolov2_8();
		}

		let backends = '';
		if (
			wasm_1 &&
			wasm_4 &&
			webgl &&
			webgpu &&
			webnn_cpu_1 &&
			webnn_cpu_4 &&
			webnn_gpu &&
			webnn_npu
		) {
			backends = 'all';
		} else if (
			!wasm_1 &&
			!wasm_4 &&
			!webgl &&
			!webgpu &&
			!webnn_cpu_1 &&
			!webnn_cpu_4 &&
			!webnn_gpu &&
			!webnn_npu
		) {
			backends = 'none';
		} else {
			if (wasm_1) {
				backends += 'wasm_1,';
			}
			if (wasm_4) {
				backends += 'wasm_4,';
			}
			if (webgl) {
				backends += 'webgl,';
			}
			if (webgpu) {
				backends += 'webgpu,';
			}
			if (webnn_cpu_1) {
				backends += 'webnn_cpu_1,';
			}
			if (webnn_cpu_4) {
				backends += 'webnn_cpu_4,';
			}
			if (webnn_gpu) {
				backends += 'webnn_gpu,';
			}
			if (webnn_npu) {
				backends += 'webnn_npu';
			}
		}

		if (backends.lastIndexOf(',') > -1) {
			backends = backends.substring(0, backends.lastIndexOf(','));
		}

		let models = '';

		if (
			mobilenet_v2_7 &&
			mobilenet_v2_10 &&
			efficientnet_lite4_11 &&
			resnet50_v1_12 &&
			resnet50_v2_7 &&
			squeezenet_11_7 &&
			fns_candy_8 &&
			emotion_ferplus_8 &&
			densenet_9 &&
			tinyyolov2_8
		) {
			models = 'all';
		} else if (
			!mobilenet_v2_7 &&
			!mobilenet_v2_10 &&
			!efficientnet_lite4_11 &&
			!resnet50_v1_12 &&
			!resnet50_v2_7 &&
			!squeezenet_11_7 &&
			!fns_candy_8 &&
			!emotion_ferplus_8 &&
			!densenet_9 &&
			!tinyyolov2_8
		) {
			models = 'none';
		} else {
			if (mobilenet_v2_7) {
				models += 'mobilenet_v2_7,';
			}
			if (mobilenet_v2_10) {
				models += 'mobilenet_v2_10,';
			}
			if (efficientnet_lite4_11) {
				models += 'efficientnet_lite4_11,';
			}
			if (resnet50_v1_12) {
				models += 'resnet50_v1_12,';
			}
			if (resnet50_v2_7) {
				models += 'resnet50_v2_7,';
			}
			if (squeezenet_11_7) {
				models += 'squeezenet_11_7,';
			}
			if (fns_candy_8) {
				models += 'fns_candy_8,';
			}
			if (emotion_ferplus_8) {
				models += 'emotion_ferplus_8,';
			}
			if (densenet_9) {
				models += 'densenet_9,';
			}
			if (tinyyolov2_8) {
				models += 'tinyyolov2_8';
			}
		}

		if (models.lastIndexOf(',') > -1) {
			models = models.substring(0, models.lastIndexOf(','));
		}

		let path = `${numOfRuns}-${backends}-${models}`;
		path = path.replaceAll(',-', '');

		goto(`${numOfRuns}-${backends}-${models}`);
	};
</script>

<div class="config">
	<div class="title">
		<label class="" title="Toggle backends">
			<input type="checkbox" on:change={() => goTo('toggle_backends')} />
			Backend
		</label>
	</div>
	<div class="backends">
		<div class="group {wasm_1 || wasm_4}">
			<span>Wasm</span>
			<label class={wasm_1.toString()} title="WebAssembly SIMD with 1 thread">
				<input type="checkbox" on:change={() => goTo('wasm_1')} />
				1T
			</label>
			<label class={wasm_4.toString()} title="WebAssembly SIMD with 4 threads">
				<input type="checkbox" on:change={() => goTo('wasm_4')} />
				4T
			</label>
		</div>
		<label class="extra {webgl.toString()}" title="WebGL">
			<input type="checkbox" on:change={() => goTo('webgl')} />
			WebGL
		</label>
		<label class="extra {webgpu.toString()}" title="WebGPU">
			<input type="checkbox" on:change={() => goTo('webgpu')} />
			WebGPU
		</label>
		<div class="group {webnn_cpu_1 || webnn_cpu_4 || webnn_gpu || webnn_npu}">
			<span>WebNN</span>
			<label class={webnn_cpu_1.toString()} title="WebNN CPU with 1 thread">
				<input type="checkbox" on:change={() => goTo('webnn_cpu_1')} />
				CPU 1T
			</label>
			<label class={webnn_cpu_4.toString()} title="WebNN CPU with 4 threads">
				<input type="checkbox" on:change={() => goTo('webnn_cpu_4')} />
				CPU 4T
			</label>
			<label class={webnn_gpu.toString()} title="WebNN GPU">
				<input type="checkbox" on:change={() => goTo('webnn_gpu')} />
				GPU
			</label>
			<label class={webnn_npu.toString()} title="WebNN NPU">
				<input type="checkbox" on:change={() => goTo('webnn_npu')} />
				NPU
			</label>
		</div>
	</div>
	<div class="title">
		<label class="" title="Toggle models">
			<input type="checkbox" on:change={() => goTo('toggle_models')} />
			Model
		</label>
	</div>
	<div class="models">
		<label class="extra {mobilenet_v2_7.toString()}" title="MobileNet v2-7">
			<input type="checkbox" on:change={() => goTo('mobilenet_v2_7')} />
			MobileNet v2-7
		</label>
		<label class="extra {mobilenet_v2_10.toString()}" title="MobileNet v2-1.0">
			<input type="checkbox" on:change={() => goTo('mobilenet_v2_10')} />
			MobileNet v2-1.0
		</label>
		<label class="extra {efficientnet_lite4_11.toString()}" title="EfficientNet Lite4">
			<input type="checkbox" on:change={() => goTo('efficientnet_lite4_11')} />
			EfficientNet Lite4
		</label>
		<label class="extra {resnet50_v1_12.toString()}" title="ResNet50 v1">
			<input type="checkbox" on:change={() => goTo('resnet50_v1_12')} />
			ResNet50 v1
		</label>
		<label class="extra {resnet50_v2_7.toString()}" title="ResNet50 v2">
			<input type="checkbox" on:change={() => goTo('resnet50_v2_7')} />
			ResNet50 v2
		</label>
		<label class="extra {squeezenet_11_7.toString()}" title="SqueezeNet 1.1">
			<input type="checkbox" on:change={() => goTo('squeezenet_11_7')} />
			SqueezeNet 1.1
		</label>
		<label class="extra {fns_candy_8.toString()}" title="FNS Candy">
			<input type="checkbox" on:change={() => goTo('fns_candy_8')} />
			FNS Candy
		</label>
		<label class="extra {emotion_ferplus_8.toString()}" title="Emotion FERPlus">
			<input type="checkbox" on:change={() => goTo('emotion_ferplus_8')} />
			Emotion FERPlus
		</label>
		<label class="extra {densenet_9.toString()}" title="DenseNet-121">
			<input type="checkbox" on:change={() => goTo('densenet_9')} />
			DenseNet-121
		</label>
		<label class="extra {tinyyolov2_8.toString()}" title="Tiny YOLO v2">
			<input type="checkbox" on:change={() => goTo('tinyyolov2_8')} />
			Tiny YOLO v2
		</label>
	</div>
	<div class="title">{numOfRuns} of Runs</div>
	<div class="numofruns">
		<label>
			<input type="number" bind:value={numOfRuns} min="1" max="1000" on:change={setNumberOfRuns} />
			<input type="range" bind:value={numOfRuns} min="1" max="1000" on:change={setNumberOfRuns} />
		</label>
	</div>
</div>

<style>
	input[type='number'] {
		padding: 4px 6px;
		border: 1px solid var(--grey-02);
	}
	input[type='number']:hover,
	input[type='number']:focus {
		border: 1px solid var(--red);
		outline: none;
	}
	input[type='range'] {
		-webkit-appearance: none;
		width: 70vw;
		height: 1px;
		border-radius: 5px;
		background-color: var(--grey-02);
		outline: none;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background-color: var(--grey-02);
	}

	input[type='range']:hover,
	input[type='range']:hover::-webkit-slider-thumb {
		background-color: var(--red);
	}

	input[type='range']:hover {
		height: 4px;
	}

	input[type='range']:hover::-webkit-slider-thumb {
		width: 16px;
		height: 16px;
		cursor: pointer;
	}

	.numofruns label:hover {
		background-color: transparent;
	}
</style>
