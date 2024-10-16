<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
</script>

<Header />

<div class="page">
	<div class="tqtitle subtitle">
		<div class="title tq">WebNN Installation Guide for the AI PC</div>
	</div>

	<div id='install-guides' class="">
		To get started with WebNN on Intel AI PCs you will need:
		<ul>
			<li>Window 11, version 21H2 or newer</li>
			<li>It's recommended to install the latest <a href="https://www.intel.com/content/www/us/en/download/785597/intel-arc-iris-xe-graphics-windows.html">Intel® Arc™ & Iris® Xe Graphics on Windows</a> for improved WebNN compatibility and performance</li>
		</ul>

		<ol>
			<li>Download and install the latest <a href="https://google.com/chrome/canary" title="Download Google Chrome Canary">Chrome Canary</a> or <a href="https://www.microsoft.com/en-us/edge/download/insider?form=MA13FJ" title="Download Microsoft Edge Canary">Edge Canary</a></li>
			<li>Navigate to <code>about://flags</code> in browser address bar</li>
			<li>Search for <code>Enables WebNN API</code> and change it to <code>Enabled</code></li>
			<li>Exit browser</li>
		</ol>

		<h3>Running WebNN on CPU or GPU</h3>

		<ol>
			<li>Launch Chrome Canary or Edge Canary</li>
		</ol>

		<h3>Running WebNN on NPU</h3>
		<ul>
			<li>Window 11, version 24H2 or newer</li>
			<li>It's recommended to install the latest <a href="https://www.intel.com/content/www/us/en/download/794734/intel-npu-driver-windows.html">Intel® Core™ Ultra NPU Driver on Windows</a> for improved WebNN compatibility and performance</li>
		</ul>
		<h4>Chrome Canary</h4>
		<ol>
			<li>Download the latest redistributable <a href="https://www.nuget.org/packages/Microsoft.AI.DirectML/1.15.2">Microsoft.AI.DirectML</a>, rename <code>microsoft.ai.directml.&lt;version&gt;.nupkg</code> to <code>microsoft.ai.directml.&lt;version&gt;.nupkg.zip</code> and extract it</li>
			<li>Copy <code>\bin\x64-win\DirectML.dll</code> to <code>%LOCALAPPDATA%\Google\Chrome SxS\Application\&lt;version&gt;\</code>
				<ul>
					<li><code>%LOCALAPPDATA%</code> means <code>C:\Users\&lt;username&gt;\AppData\Local\</code></li>
					<li>Note that Chrome Canary frequently updates automatically. When this occurs, recopy the <code>DirectML.dll</code> to the new version's directory.</li>
				</ul>
			</li>
			<li>Launch Chrome Canary in Windows Command Line: <code>"%LOCALAPPDATA%\Google\Chrome SxS\Application\chrome.exe" --use-redist-dml --disable_webnn_for_npu=0</code></li>
		</ol>
		<h4>Edge Canary</h4>
		<ol>
			<li>Ensure the <code>DirectML.dll</code> was downloaded automatically (may take several minutes)
				<ol>
					<li>Launch Edge Canary</li>
					<li>Go to <code>%LOCALAPPDATA%\Microsoft\Edge SxS\User Data</code>, check the <code>EdgeOnnxRuntimeDirectML\&lt;version&gt;\DirectML.dll</code> exists</li>
					<li><code>%LOCALAPPDATA%</code> means <code>C:\Users\&lt;username&gt;\AppData\Local\</code></li>
					<li>Exit Edge Canary</li>
				</ol>
			</li>
			<li>Launch Edge Canary in Windows Command Line: <code>"%LOCALAPPDATA%\Microsoft\Edge SxS\Application\msedge.exe" --disable_webnn_for_npu=0</code></li>
			<li>If <code>EdgeOnnxRuntimeDirectML\&lt;version&gt;\DirectML.dll</code> does not exist under <code>%LOCALAPPDATA%\Microsoft\Edge SxS\User Data</code>:
				<ul>
					<li>Go to <code>edge://components/</code></li>
					<li>Click <code>Check for update</code> button of <code>Edge Video Super Resolution</code></li>
					<li>Repeat step 2</li>
				</ul>
			</li>
		</ol>
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

	.title {
		text-align: center;
		color: var(--red);
	}

	a {
		margin: 1px auto;
		background-color: var(--red-01);
		display: inline-block;
		padding: 0px 6px;
		border-radius: 3px;
	}

	a:hover {
		background-color: var(--red);
		color: var(--white);
	}

	code {
		margin: 1px auto;
		background-color: var(--green-01);
		display: inline-block;
		padding: 0px 6px;
		border-radius: 3px;
	}

	code:hover {
		background-color: var(--green);
		color: var(--white);
	}
</style>
