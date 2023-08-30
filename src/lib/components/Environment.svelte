<script>
	import { onMount } from 'svelte';
	import { environment } from '$lib/config.js';
	import { getGpu } from '$lib/assets/js/utils.js';
	// @ts-ignore
	import { UAParser } from 'ua-parser-js';

	onMount(() => {
		let parser = UAParser(navigator.userAgent);
		environment.cpu = parser.cpu.architecture;
		environment.logicCores = navigator.hardwareConcurrency;
		environment.gpu = getGpu();
		environment.os = parser.os.name;
		environment.osVersion = parser.os.version;
		environment.webbrowser = parser.browser.name;
		environment.browserVersion = parser.browser.version;
	});
</script>

<div class="environment">
	{environment.cpu}
	{environment.logicCores} logical cores * {environment.gpu} * {environment.os}
	{environment.osVersion} * {environment.webbrowser}
	{environment.browserVersion}
</div>
