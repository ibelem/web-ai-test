<script>
	import { onMount } from 'svelte';
	import { ortDists } from '$lib/config.js';
	import { ortWebVersionStore } from '$lib/store/store';
	import {
		getURLParameterValue
	} from '$lib/assets/js/utils';
	import Modal from './Modal.svelte';
	import AutoComplete from 'simple-svelte-autocomplete';
	let ortStable = '';
	let ortDev = '';
	let relaxedSimd = null;
	/**
	 * @type {number }
	 */
	let selected = 1;
	let showOrtDevModal = false;
	let showOrtStableModal = false;
	let devList = [];
	let stableList = [];
	let selectedDev = '';
	let selectedStable = '';

	/**
	 * @type {{ selected?: any; stable?: any; dev?: any; }}
	 */
	export let ortWebVersion;

	ortWebVersionStore.subscribe((value) => {
		ortWebVersion = value;
	});

	let onChange = (/** @type {{ currentTarget: { value: number; }; }} */ event) => {
		selected = event.currentTarget.value;
		selected = Number(selected);
		let ort = ortWebVersion;
		ort.selected = selected;
		ortWebVersionStore.update(() => ort);
	};

	const getVersion = async () => {
		try {
			const response = await fetch('https://data.jsdelivr.com/v1/packages/npm/onnxruntime-web');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			if (ortWebVersion.dev) {
				ortDev = ortWebVersion.dev;
			} else {
				ortDev = data.tags.dev;
			}

			if (ortWebVersion.stable) {
				ortStable = ortWebVersion.stable;
			} else {
				ortStable = data.tags.latest;
			}

			devList = [];
			stableList = [];
			
			data.versions.forEach(v => {
				if(v.version.toLowerCase().indexOf('-dev.') >-1) {
					let mainversion = v.version.split('-')[0].split('.')[1];
					if(parseInt(mainversion) >= 19) {
						devList.push(v.version);
					}
				}
				if(v.version.toLowerCase().indexOf('-dev.') == -1 && v.version.toLowerCase().indexOf('-esm') == -1) {
					let mainversion = v.version.split('-')[0].split('.')[1];
					if(parseInt(mainversion) >= 17) {
						stableList.push(v.version);
					}
				}
			})
			selected = Number(selected);
			let ort = {
				selected: selected,
				stable: ortStable,
				dev: ortDev
			};
			ortWebVersionStore.update(() => ort);
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	const updateDev = () => {
		let ort = ortWebVersion;
		if(selectedDev) {
			ort.dev = selectedDev;
			ortWebVersionStore.update(() => ort);
		}
	}

	const updateStable = () => {
		let ort = ortWebVersion;
		if(selectedStable) {
			ort.stable = selectedStable;
			ortWebVersionStore.update(() => ort);
		}
	}

	onMount(async () => {
		relaxedSimd = getURLParameterValue('relaxedsimd')?.toLocaleLowerCase().trim();
		if (relaxedSimd === '0' || relaxedSimd === '1') {
			selected = 0
		} else {
			if (ortWebVersion) {
				selected = ortWebVersion.selected;
				ortDev = ortWebVersion.dev;
				ortStable = ortWebVersion.stable;
			}
		}
		await getVersion();

	});
</script>

<div class="environment framework">
	<Modal bind:showOrtDevModal>
		<h2 slot="header" class="updatecpu">ONNX Runtime Web</h2>	
		<div class="info">
			Select the Dev version of ONNX Runtime Web to be tested.
		</div>
		<AutoComplete items={devList} bind:selectedItem={selectedDev} onChange={updateDev} />
	</Modal>

	<Modal bind:showOrtStableModal>
		<h2 slot="header" class="updatecpu">ONNX Runtime Web</h2>	
		<div class="info">
			Select the Stable version of ONNX Runtime Web to be tested.
		</div>
		<AutoComplete items={stableList} bind:selectedItem={selectedStable} onChange={updateStable} />
	</Modal>

	<div class="ort">
		{#if ortWebVersion}
			<div class="version">
				<svg viewBox="0 0 120 44" id="logo_onnx"
					><g transform="matrix(1.8 0 0 1.8 -44 -45)"
						><path
							class="logo_onnx_1"
							d="M34.35 37.89c-.11.008-.2-.056-.25-.156l-4.08-7.547c-.052-.085-.062-.19-.026-.282a1.03 1.03 0 0 0-1.577-1.172.42.42 0 0 1-.373.076L20.02 27.2c-.124-.008-.228-.1-.253-.22-.393-1.334-2.395-.714-1.965.61.045.116.024.247-.054.344l-6.367 9.134c-.086.124-.17.177-.297.13-.545-.047-1.032.342-1.106.884a1.01 1.01 0 0 0 .878 1.161c.125.004.232.092.26.215l3.427 8.44c.04.09.048.194.02.3-.295.965.83 1.735 1.622 1.11a.36.36 0 0 1 .277-.081l10.325 1.008a.27.27 0 0 1 .262.18c.588 1.344 2.585.31 1.825-.947-.064-.088-.065-.207-.003-.296l5.21-9.045a.28.28 0 0 1 .273-.169c1.392.016 1.4-2.08-.003-2.06zm-15.943-8.153l.292-1.26c.024-.106.057-.17.194-.178.258-.013.498-.138.657-.343.064-.1.182-.126.285-.086L27.9 29.48c.022.004.043.015.125.046l-2.538 1.1-7.653 3.333a5.27 5.27 0 0 1-.117.049c-.082.033-.16.11-.254.03-.088-.075-.023-.157-.005-.234l.95-4.078zm-.58-.706l.042.028-1.085 4.644c-.015.108-.095.197-.2.222a.97.97 0 0 0-.709.87c.001.102-.052.198-.14.25l-3.438 2.023c-.028.01-.057.016-.086.02zm-2.715 18.12c-.013.064-.03.128-.05.2l-3.293-8.098a.35.35 0 0 1 .054-.428.77.77 0 0 0 .191-.59c-.02-.135.057-.266.183-.316l3.765-2.22c.07-.042.14-.138.244-.04.093.088.22.13.197.314l-.338 2.903-.954 8.282zm1.177.64a.78.78 0 0 0-.397-.263c-.093-.03-.156-.067-.125-.155l.295-2.574.59-5.126.408-3.586c.025-.237.2-.23.34-.317s.186.043.25.1l8.542 7.42c.185.192.132.508-.105.63l-9.52 3.928c-.113.047-.19.06-.28-.056zm11.145 1.35c-.078.035-.144.092-.19.164-.132.277-.36.243-.6.22l-9.884-.975-.016-.046 1.534-.638 8.02-3.31c.15-.063.244-.008.384.04.4.14.408.45.444.777l.402 3.533c.012.1.01.177-.095.232zm-.34-6.506c-.016.126-.075.162-.175.208s-.222.023-.292-.064l-2.052-1.785-6.504-5.654a.71.71 0 0 1-.174-.625c.044-.09.153-.1.236-.136L28 30.28c.144-.065.256-.1.367.054a.48.48 0 0 0 .207.143c.097.04.137.092.115.157l-.286 2.18-1.298 9.823zm1.122 6.285l-.16-1.304-.288-2.5c-.028-.23-.047-.42.196-.6a.88.88 0 0 0 .328-.863c-.01-.095-.008-.155.077-.213L33.2 40.15c.025-.008.05-.014.075-.018zm5.248-10.49a.75.75 0 0 0-.122.582.27.27 0 0 1-.141.31l-5.178 3.547c-.057.04-.104.112-.2.058-.105-.06-.067-.146-.057-.223l1.572-11.888c.012-.088.032-.174.06-.32l.935 1.717 3.127 5.783c.103.125.106.306.006.434z"
							fill="#343433"
						/><path
							class="logo_onnx_2"
							d="M28.678 30.633c.022-.064-.018-.118-.115-.157a.48.48 0 0 1-.207-.143c-.11-.153-.223-.12-.367-.054l-1.534.67q-4.16 1.813-8.322 3.627c-.082.036-.192.044-.236.135a.711.711 0 0 0 .174.625l8.556 7.44a.237.237 0 0 0 .292.064c.1-.046.16-.08.175-.208l.652-4.936q.324-2.443.645-4.887l.286-2.18z"
							fill="#fefefe"
						/><path
							class="logo_onnx_3"
							d="M26.194 43.288q-4.27-3.71-8.542-7.42c-.066-.057-.12-.188-.25-.1s-.314.08-.34.317l-.408 3.586-.59 5.126-.295 2.574c-.032.088.032.126.125.155a.781.781 0 0 1 .397.263c.088.116.165.102.28.056q4.76-1.966 9.52-3.927a.397.397 0 0 0 .105-.629z"
							fill="#f4f5f6"
						/><path
							class="logo_onnx_4"
							d="M30.33 32.213l-.935-1.717-.06.32-.53 4.056q-.52 3.916-1.04 7.832c-.01.077-.048.164.057.223.096.054.142-.02.2-.058l5.178-3.547a.27.27 0 0 0 .141-.31.749.749 0 0 1 .122-.582.346.346 0 0 0-.006-.434q-1.57-2.89-3.127-5.783z"
							fill="#dedfdf"
						/><path
							class="logo_onnx_5"
							d="M17.462 34.048c.095.08.172.003.255-.03l.117-.05q3.827-1.666 7.653-3.333l2.538-1.1-.125-.046q-4.033-.805-8.066-1.612a.243.243 0 0 0-.285.086.885.885 0 0 1-.657.343c-.138.01-.17.072-.194.178q-.144.63-.292 1.26l-.95 4.078c-.018.077-.083.16.005.234zm9.666 11.327c-.036-.327-.045-.638-.444-.777-.14-.05-.233-.104-.384-.04q-4.008 1.66-8.02 3.3l-1.534.638.016.046 9.884.975c.24.024.467.058.6-.22a.435.435 0 0 1 .189-.164c.105-.056.107-.13.095-.232a542.666 542.666 0 0 1-.402-3.533z"
							fill="#d1d1d1"
						/><path
							class="logo_onnx_6"
							d="M16.405 35.964c.023-.185-.105-.226-.197-.314-.102-.098-.173-.002-.244.04l-3.765 2.22a.295.295 0 0 0-.183.316.769.769 0 0 1-.191.59.351.351 0 0 0-.054.428q1.073 2.62 2.133 5.243l1.16 2.856a1.954 1.954 0 0 0 .05-.19q.236-2.032.47-4.065.243-2.108.484-4.217l.338-2.903z"
							fill="#d8d8d8"
						/><path
							class="logo_onnx_7"
							d="M28.372 43.45c-.086.06-.088.118-.077.213a.881.881 0 0 1-.328.862c-.243.17-.224.36-.196.6l.288 2.5.16 1.304 5.06-8.79a.503.503 0 0 0-.075.018q-2.414 1.652-4.828 3.302zm-12.64-8.408a.286.286 0 0 0 .141-.25.971.971 0 0 1 .709-.87.265.265 0 0 0 .201-.222q.54-2.322 1.085-4.644l-.042-.028-5.618 8.056a.475.475 0 0 0 .086-.019q1.718-1.012 3.438-2.023z"
							fill="#b2b2b2"
						/></g
					><g transform="matrix(1.8 0 0 1.8 -54 -30)"
						><path
							class="logo_onnx_1"
							d="M94.93 23.994c-.18-.05-.367-.06-.55-.03-.43.078-.55.212-.55.642V37.46l-.15-.215L86.05 25.86a13.05 13.05 0 0 0-1.013-1.438c-.19-.254-.475-.423-.8-.468-.383-.033-.818.08-.817.514l.005 15.126a.46.46 0 0 0 .079.296c.17.226.645.32 1.01.2.308-.1.393-.236.393-.63V26.608l.123.176 8.076 11.956a6.85 6.85 0 0 0 .82 1.101c.252.275.644.372.995.247.244-.04.41-.267.378-.512V24.5c.036-.246-.137-.473-.383-.504zm-16.488.002a1.28 1.28 0 0 0-.574-.029c-.41.082-.528.215-.528.634v12.863l-.155-.222-7.964-11.89a7.42 7.42 0 0 0-.679-.937c-.19-.233-.452-.394-.746-.458-.56-.098-.85.132-.85.688v14.9a.5.5 0 0 0 .082.342c.18.22.653.312 1.016.2.303-.102.376-.226.376-.638V26.933a.52.52 0 0 1 .02-.259c.08.028.1.104.14.16l8.404 12.435c.152.238.334.454.542.645a.91.91 0 0 0 .926.171c.23-.052.384-.265.362-.5l-.003-15.104c.036-.238-.132-.458-.37-.486zm-15.918 7.992l-.004-3.647c-.035-1.85-.997-3.228-2.74-3.87-1.87-.688-3.8-.702-5.698-.213-2.264.58-3.368 2.07-3.368 4.403v7.103c0 1.93.984 3.383 2.803 4.02 1.875.66 3.792.658 5.7.155 1.933-.51 3.272-1.842 3.305-4.16l.003-3.792zm-1.473.135v3.383c0 1.975-.88 3.107-2.802 3.527-1.26.296-2.58.245-3.814-.147-1.434-.47-2.226-1.55-2.234-3.06v-7.42c.008-1.567.876-2.702 2.4-3.115 1.416-.414 2.926-.38 4.322.096 1.377.48 2.13 1.58 2.137 3.04l.001 3.698zm49.212 7.033l-4.828-6.93c-.1-.104-.103-.268-.006-.374l4.72-6.83a3.23 3.23 0 0 0 .256-.407c.124-.207.035-.477-.19-.57a.92.92 0 0 0-1.18.205 5.9 5.9 0 0 0-.407.539l-4.206 6.158-.103-.135L101 25.92l-1.097-1.588c-.215-.34-.632-.49-1.015-.37-.505.127-.617.417-.32.85l4.85 7.06a.24.24 0 0 1-.005.331l-4.875 7.043c-.264.384-.182.646.245.832.465.202.8.08 1.14-.42l4.485-6.556.08.09 4.404 6.4c.095.15.21.286.34.406.332.24.787.21 1.088-.066.236-.215.225-.37-.06-.78z"
							fill="#343433"
						/></g
					></svg
				>
				Runtime Web

				{#if selected === 0}
					<label class="stable true" title="Select ORT Web test versions">
						<input
							checked={selected === 0}
							on:change={onChange}
							type="radio"
							name="amount"
							value="0"
						/>
						Public Stable
					</label>
				{:else}
					<label class="stable" title="Select ORT Web test versions">
						<input
							checked={selected === 0}
							on:change={onChange}
							type="radio"
							name="amount"
							value="0"
						/>
						Public Stable
					</label>{/if}

				{#if selected === 1}
					<label class="dev true" title="Select ORT Web test versions">
						<input
							checked={selected === 1}
							on:change={onChange}
							type="radio"
							name="amount"
							value="1"
						/>
						Public Dev
					</label>
				{:else}
					<label class="dev" title="Select ORT Web test versions">
						<input
							checked={selected === 1}
							on:change={onChange}
							type="radio"
							name="amount"
							value="1"
						/>
						Public Dev
					</label>{/if}

				{#if selected === 2}
					<label class="internal true" title="Select ORT Web test versions">
						<input
							checked={selected === 2}
							on:change={onChange}
							type="radio"
							name="amount"
							value="2"
						/>
						Internal Dev
					</label>
				{:else}
					<label class="internal" title="Select ORT Web test versions">
						<input
							checked={selected === 2}
							on:change={onChange}
							type="radio"
							name="amount"
							value="2"
						/>
						Internal Dev
					</label>
				{/if}
			</div>

			{#if ortWebVersion.selected === 2}
				<div class="wasm">
					<span class="title">Wasm</span>
					<span class="version"
						><a href="https://www.npmjs.com/package/onnxruntime-web/v/{ortWebVersion.stable}"
							>{ortWebVersion.stable}</a
						></span
					>
				</div>
				<!-- <div class="webgpu">
					<span class="title">WebGPU</span>
					<span class="version">{ortDists.webgpu.version}</span>
				</div> -->
				<div class="webnn">
					<span class="title">WebGPU · WebNN</span>
					<span class="version">{ortDists.webnn_webglfix_wasm.version}</span>
				</div>
			{:else if ortWebVersion.selected === 1}
				<div class="webnn">
					<span class="title">Wasm · WebGPU · WebNN</span>
					<span class="version"
						><a href="https://www.npmjs.com/package/onnxruntime-web/v/{ortDev}"
							>{ortWebVersion.dev}</a
						></span
					>
					<span class="version selector">
						<button on:click={() => (showOrtDevModal = true)}>
							<svg height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
						</button>
					</span>
				</div>
				
			{:else}
				<div class="webnn">
					{#if relaxedSimd === '1'}
					  <span class="title">Wasm</span>
						<span class="version">Relaxed Simd {ortDists.wasm_relaxed_simd.version}</span>
					{:else if relaxedSimd === '0'}
						<span class="title">Wasm</span>
						<span class="version"
						><a href="https://www.npmjs.com/package/onnxruntime-web/v/{ortWebVersion.stable}"
							>{ortWebVersion.stable}</a
						></span
					>
					{:else }
					<span class="title">Wasm · WebGPU · WebNN</span>
					<span class="version"
						><a href="https://www.npmjs.com/package/onnxruntime-web/v/{ortWebVersion.stable}"
							>{ortWebVersion.stable}</a
						></span
					>
					{/if}
					<span class="version selector">
						<button on:click={() => (showOrtStableModal = true)}>
							<svg height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
						</button>
					</span>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.version {
		display: inline-block;
		border: 1px solid var(--grey-02);
		padding: 0 0 0 10px;
	}

	.version:hover {
		border: 1px solid var(--red);
	}

	@media (max-width: 932px) {
		.version {
			margin-bottom: 10px;
		}
	}

	.stable,
	.dev,
	.internal {
		padding: 0 10px;
		cursor: pointer;
		margin: 0;
	}

	.stable,
	.dev {
		margin-right: -8px;
	}

	.version label.true {
		background-color: var(--red);
		color: #fff;
	}

	.version label:hover {
		background-color: var(--red-01);
	}

	.version label.true:hover {
		background-color: var(--red-01);
		color: var(--font);
	}

	.version input {
		display: none;
	}

	.ort .version:hover a {
		color: var(--white);
	}

	.framework {
		margin-top: 20px;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.ort .wasm,
	.ort .webgpu,
	.ort .webnn {
		display: inline-block;
		margin: 0px;
	}

	.ort .wasm span,
	.ort .webgpu span,
	.ort .webnn span {
		display: inline-block;
		padding: 0px 10px 0px 10px;
	}

	.ort .wasm .title {
		border: 1px solid var(--b1);
		background-color: var(--b1);
		color: #fff;
	}

	.ort .webgpu .title {
		border: 1px solid var(--p2);
		background-color: var(--p2);
		color: #fff;
	}

	.ort .webnn .title {
		border: 1px solid var(--purple);
		background-color: var(--purple);
		color: #fff;
	}

	.ort .wasm .version {
		margin-left: -8px;
		border: 1px solid var(--b1);
		background-color: transparent;
	}

	.ort .webgpu .version {
		margin-left: -8px;
		border: 1px solid var(--p2);
		background-color: transparent;
	}

	.ort .webnn .version {
		margin-left: -8px;
		border: 1px solid var(--purple);
		background-color: transparent;
	}

	.ort .wasm .version:hover,
	.ort .wasm .version:hover a {
		color: var(--white);
		background-color: var(--b1);
	}

	.ort .webgpu .version:hover {
		color: var(--white);
		background-color: var(--p2);
	}

	.ort .webnn .version:hover {
		color: var(--white);
		background-color: var(--purple);
	}
</style>
