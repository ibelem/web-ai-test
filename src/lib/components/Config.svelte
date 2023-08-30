<script>
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
	};
</script>

<div class="config">
	<div>
		<label class="" title="Toggle backends">
			<input type="checkbox" on:change={() => settings.toggleBackends()} />
			Backend
		</label>
	</div>
	<div>
		<div class="group {wasm_1 || wasm_4}">
			<span>Wasm</span>
			<label class={wasm_1.toString()} title="WebAssembly SIMD with 1 thread">
				<input type="checkbox" on:change={() => settings.toggleWasm1()} />
				1T
			</label>
			<label class={wasm_4.toString()} title="WebAssembly SIMD with 4 threads">
				<input type="checkbox" on:change={() => settings.toggleWasm4()} />
				4T
			</label>
		</div>
		<label class="extra {webgl.toString()}" title="WebGL">
			<input type="checkbox" on:change={() => settings.toggleWebgl()} />
			WebGL
		</label>
		<label class="extra {webgpu.toString()}" title="WebGPU">
			<input type="checkbox" on:change={() => settings.toggleWebGpu()} />
			WebGPU
		</label>
		<div class="group {webnn_cpu_1 || webnn_cpu_4 || webnn_gpu || webnn_npu}">
			<span>WebNN</span>
			<label class={webnn_cpu_1.toString()} title="WebNN CPU with 1 thread">
				<input type="checkbox" on:change={() => settings.toggleWebnnCpu1()} />
				CPU 1T
			</label>
			<label class={webnn_cpu_4.toString()} title="WebNN CPU with 4 threads">
				<input type="checkbox" on:change={() => settings.toggleWebnnCpu4()} />
				CPU 4T
			</label>
			<label class={webnn_gpu.toString()} title="WebNN GPU">
				<input type="checkbox" on:change={() => settings.toggleWebnnGpu()} />
				GPU
			</label>
			<label class={webnn_npu.toString()} title="WebNN NPU">
				<input type="checkbox" on:change={() => settings.toggleWebnnNpu()} />
				NPU
			</label>
		</div>
	</div>
	<div>
		<label class="" title="Toggle models">
			<input type="checkbox" on:change={() => settings.toggleModels()} />
			Model
		</label>
	</div>
	<div>
		<label class="extra {mobilenet_v2_7.toString()}" title="MobileNet v2-7">
			<input type="checkbox" on:change={() => settings.toggle_mobilenet_v2_7()} />
			MobileNet v2-7
		</label>
		<label class="extra {mobilenet_v2_10.toString()}" title="MobileNet v2-1.0">
			<input type="checkbox" on:change={() => settings.toggle_mobilenet_v2_10()} />
			MobileNet v2-1.0
		</label>
		<label class="extra {efficientnet_lite4_11.toString()}" title="EfficientNet Lite4">
			<input type="checkbox" on:change={() => settings.toggle_efficientnet_lite4_11()} />
			EfficientNet Lite4
		</label>
		<label class="extra {resnet50_v1_12.toString()}" title="ResNet50 v1">
			<input type="checkbox" on:change={() => settings.toggle_resnet50_v1_12()} />
			ResNet50 v1
		</label>
		<label class="extra {resnet50_v2_7.toString()}" title="ResNet50 v2">
			<input type="checkbox" on:change={() => settings.toggle_resnet50_v2_7()} />
			ResNet50 v2
		</label>
		<label class="extra {squeezenet_11_7.toString()}" title="SqueezeNet 1.1">
			<input type="checkbox" on:change={() => settings.toggle_squeezenet_11_7()} />
			SqueezeNet 1.1
		</label>
		<label class="extra {fns_candy_8.toString()}" title="FNS Candy">
			<input type="checkbox" on:change={() => settings.toggle_fns_candy_8()} />
			FNS Candy
		</label>
		<label class="extra {emotion_ferplus_8.toString()}" title="Emotion FERPlus">
			<input type="checkbox" on:change={() => settings.toggle_emotion_ferplus_8()} />
			Emotion FERPlus
		</label>
		<label class="extra {densenet_9.toString()}" title="DenseNet-121">
			<input type="checkbox" on:change={() => settings.toggle_densenet_9()} />
			DenseNet-121
		</label>
		<label class="extra {tinyyolov2_8.toString()}" title="Tiny YOLO v2">
			<input type="checkbox" on:change={() => settings.toggle_tinyyolov2_8()} />
			Tiny YOLO v2
		</label>
	</div>
	<div>{numOfRuns} of Runs</div>
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
