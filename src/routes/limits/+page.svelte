<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import { onMount } from 'svelte';
	import { isFirefoxOrSafari } from '$lib/assets/js/utils.js';

	/**
	 * @type {string | null}
	 */
	let cpuSupportLimits = null;
	let gpuSupportLimits = null;
	let npuSupportLimits = null;
	let numberofCpuOps = 0;
	let numberofGpuOps = 0;
	let numberofNpuOps = 0;

	function generateHTMLTable(limits) {
		let html = '<table><thead><tr>';

		// Header cells
		html += '<th>operation</th><th>item</th>';

		// Get all unique dataTypes
		const allDataTypes = new Set();
		for (let key in limits) {
			for (let subkey in limits[key]) {
				limits[key][subkey].dataTypes?.forEach((type) => allDataTypes.add(type));
			}
		}

		const sortedDataTypes = Array.from(allDataTypes).sort();

		// Add dataTypes as column headers
		sortedDataTypes.forEach((dt) => {
			html += `<th>${dt}</th>`;
		});

		// Add rankRange columns
		html += '<th>rankRange min</th><th>rankRange max</th></tr></thead><tbody>';

		// Add rows
		for (const [opName, opData] of Object.entries(limits)) {
			if (typeof opData === 'object' && opData !== null) {
				for (const [subItemName, subItemData] of Object.entries(opData)) {
					html += `<tr><td>${opName}</td><td>${subItemName}</td>`;

					// Add data type cells
					sortedDataTypes.forEach((dt) => {
						if (
							(subItemData &&
								Array.isArray(subItemData.dataTypes) &&
								subItemData.dataTypes.includes(dt)) ||
							(subItemData && Array.isArray(subItemData) && subItemData.includes(dt))
						) {
							html += '<td>Yes</td>';
						} else {
							html += '<td></td>';
						}
					});

					// Add rankRange min and max cells
					if (subItemData && subItemData.rankRange) {
						html += `<td>${subItemData.rankRange.min}</td><td>${subItemData.rankRange.max}</td>`;
					} else {
						html += '<td></td><td></td>';
					}

					html += '</tr>';
				}
			}
		}

		html += '</tbody></table>';
		return html;
	}

	const countUniqueKeys = (obj) => {
		let uniqueKeys = new Set();

		for (let key in obj) {
			uniqueKeys.add(key);
		}

		return uniqueKeys.size;
	};

	let os = 'windows';
	let osVersion = '';
	let cpu = '';

	onMount(async () => {
		if (!isFirefoxOrSafari()) {
			if (navigator.userAgentData) {
				os = navigator.userAgentData.platform;
			}

			navigator.userAgentData
				?.getHighEntropyValues(['platformVersion', 'architecture', 'bitness'])
				.then((ua) => {
					if (navigator.userAgentData?.platform === 'Windows') {
						const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0]);
						if (majorPlatformVersion >= 13) {
							osVersion = '11 or later';
						} else if (majorPlatformVersion > 0) {
							osVersion = '10';
						} else {
							osVersion = '7, 8 or 8.1';
						}
					} else {
						osVersion = parser.os.version;
					}

					if (ua.architecture === 'x86') {
						if (ua.bitness === '64') {
							cpu = 'x86-64';
						} else if (ua.bitness === '32') {
							cpu = 'x86';
						}
					} else if (ua.architecture === 'arm') {
						if (ua.bitness === '64') {
							cpu = 'arm64';
						} else if (ua.bitness === '32') {
							cpu = 'arm32';
						}
					}
				});
		}

		if (navigator.ml) {
			const cpuContext = await navigator.ml?.createContext({ deviceType: 'cpu' });
			const cpuJson = cpuContext.opSupportLimits();
			console.log('-- cpu --');
			console.log(cpuJson);
			cpuSupportLimits = generateHTMLTable(cpuJson);
			numberofCpuOps = countUniqueKeys(cpuJson);
			const gpuContext = await navigator.ml?.createContext({ deviceType: 'gpu' });
			const gpuJson = gpuContext.opSupportLimits();
			console.log('-- gpu --');
			console.log(gpuJson);
			gpuSupportLimits = generateHTMLTable(gpuJson);
			numberofGpuOps = countUniqueKeys(gpuJson);
			const npuContext = await navigator.ml?.createContext({ deviceType: 'npu' });
			const npuJson = npuContext.opSupportLimits();
			console.log('-- npu --');
			console.log(npuJson);
			npuSupportLimits = generateHTMLTable(npuJson);
			numberofNpuOps = countUniqueKeys(npuJson);
		}
	});
</script>

<Header />

<div class="page limits">
	<div class="tqtitle subtitle">
		<div class="title tq">WebNN Operation Support Limits</div>
		{#if os}
			<div title="Operation system" class="os">
				{#if os.toLowerCase().indexOf('windows') > -1}
					<svg viewBox="0 0 448 512"
						><path
							d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"
						/></svg
					>
				{:else if os.toLowerCase().indexOf('linux') > -1}
					<svg viewBox="0 0 448 512"
						><path
							d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4.7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6.6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-1.4-25.9c-4.1-6.6-9.6-13.6-14.4-19.6 7.1 0 14.2-2.2 16.7-8.9 2.3-6.2 0-14.9-7.4-24.9-13.5-18.2-38.3-32.5-38.3-32.5-13.5-8.4-21.1-18.7-24.6-29.9s-3-23.3-.3-35.2c5.2-22.9 18.6-45.2 27.2-59.2 2.3-1.7.8 3.2-8.7 20.8-8.5 16.1-24.4 53.3-2.6 82.4.6-20.7 5.5-41.8 13.8-61.5 12-27.4 37.3-74.9 39.3-112.7 1.1.8 4.6 3.2 6.2 4.1 4.6 2.7 8.1 6.7 12.6 10.3 12.4 10 28.5 9.2 42.4 1.2 6.2-3.5 11.2-7.5 15.9-9 9.9-3.1 17.8-8.6 22.3-15 7.7 30.4 25.7 74.3 37.2 95.7 6.1 11.4 18.3 35.5 23.6 64.6 3.3-.1 7 .4 10.9 1.4 13.8-35.7-11.7-74.2-23.3-84.9-4.7-4.6-4.9-6.6-2.6-6.5 12.6 11.2 29.2 33.7 35.2 59 2.8 11.6 3.3 23.7.4 35.7 16.4 6.8 35.9 17.9 30.7 34.8-2.2-.1-3.2 0-4.2 0 3.2-10.1-3.9-17.6-22.8-26.1-19.6-8.6-36-8.6-38.3 12.5-12.1 4.2-18.3 14.7-21.4 27.3-2.8 11.2-3.6 24.7-4.4 39.9-.5 7.7-3.6 18-6.8 29-32.1 22.9-76.7 32.9-114.3 7.2zm257.4-11.5c-.9 16.8-41.2 19.9-63.2 46.5-13.2 15.7-29.4 24.4-43.6 25.5s-26.5-4.8-33.7-19.3c-4.7-11.1-2.4-23.1 1.1-36.3 3.7-14.2 9.2-28.8 9.9-40.6.8-15.2 1.7-28.5 4.2-38.7 2.6-10.3 6.6-17.2 13.7-21.1.3-.2.7-.3 1-.5.8 13.2 7.3 26.6 18.8 29.5 12.6 3.3 30.7-7.5 38.4-16.3 9-.3 15.7-.9 22.6 5.1 9.9 8.5 7.1 30.3 17.1 41.6 10.6 11.6 14 19.5 13.7 24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z"
						/></svg
					>
				{:else if os.toLowerCase().indexOf('cros') > -1}
					<svg viewBox="0 0 512 512"
						><path
							d="M0 256C0 209.4 12.47 165.6 34.27 127.1L144.1 318.3C166 357.5 207.9 384 256 384C270.3 384 283.1 381.7 296.8 377.4L220.5 509.6C95.9 492.3 0 385.3 0 256zM365.1 321.6C377.4 302.4 384 279.1 384 256C384 217.8 367.2 183.5 340.7 160H493.4C505.4 189.6 512 222.1 512 256C512 397.4 397.4 511.1 256 512L365.1 321.6zM477.8 128H256C193.1 128 142.3 172.1 130.5 230.7L54.19 98.47C101 38.53 174 0 256 0C350.8 0 433.5 51.48 477.8 128V128zM168 256C168 207.4 207.4 168 256 168C304.6 168 344 207.4 344 256C344 304.6 304.6 344 256 344C207.4 344 168 304.6 168 256z"
						/></svg
					>
				{:else if os.toLowerCase().indexOf('android') > -1}
					<svg viewBox="0 0 576 512"
						><path
							d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"
						/></svg
					>
				{:else if os.toLowerCase().indexOf('mac os') > -1 || os
						.toLowerCase()
						.indexOf('iphone os') > -1 || os.toLowerCase().indexOf('ios') > -1}
					<svg viewBox="0 0 384 512"
						><path
							d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
						/></svg
					>
				{/if}
				{os}
				{osVersion}
				{#if cpu}· {cpu}{/if}
			</div>
		{/if}
	</div>

	<div class="">
		{#if cpuSupportLimits}
			<div>
				<div class="title tq">CPU · {numberofCpuOps}</div>
				<div id="cpu">{@html cpuSupportLimits}</div>
			</div>
		{/if}

		{#if gpuSupportLimits}
			<div>
				<div class="title tq">GPU · {numberofGpuOps}</div>
				<div id="gpu">{@html gpuSupportLimits}</div>
			</div>
		{/if}

		{#if npuSupportLimits}
			<div>
				<div class="title tq">NPU · {numberofNpuOps}</div>
				<div id="npu">{@html npuSupportLimits}</div>
			</div>
		{/if}
	</div>

	{#if !cpuSupportLimits && !gpuSupportLimits && !npuSupportLimits}
		<div>Your browser doesn't support WebNN</div>
	{/if}
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
</style>
