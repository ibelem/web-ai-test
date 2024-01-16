<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import { loadScript } from '$lib/assets/js/utils.js';
	import FullscreenSVG from '$lib/components/svg/FullscreenSVG.svelte';
	import FullscreenExitSVG from '$lib/components/svg/FullscreenExitSVG.svelte';
	import Fullscreen from 'svelte-fullscreen';

	let bar, loadingBar, border, text, mynetwork;
	let full = false;

	onMount(async () => {
		await loadScript(
			'vis',
			'https://cdnjs.cloudflare.com/ajax/libs/vis-network/9.1.2/dist/vis-network.min.js'
		);
	});

	async function handleFileInput(event) {
		const file = event.target.files[0];
		if (file) {
			try {
				const fileContent = await readFile(file);

				var edges;
				var nodes;
				var allNodes;
				var allEdges;
				var nodeColors;
				var network;
				var data;

				function drawGraph() {
					let nodesFromJson = JSON.parse(fileContent).nodes.map((node) => ({
						color: '#97c2fc',
						id: node.name,
						label: node.name,
						shape: 'dot'
					}));

					if (nodesFromJson.length > 0) {
						nodesFromJson.forEach((node) => {
							if (node.id === 'Input_0') {
								node.color = 'rgba(226, 69, 124, 1)';
							}
						});

						nodesFromJson.forEach((node) => {
							if (node.id === 'Output_0') {
								node.color = 'rgba(106, 198, 0, 1)';
							}
						});
					}

					nodes = new vis.DataSet(nodesFromJson);

					let edgesFromJson = JSON.parse(fileContent).edges.map((edge) => ({
						from: edge.FromNode,
						to: edge.ToNode
					}));

					edges = new vis.DataSet(edgesFromJson);

					nodeColors = {};
					allNodes = nodes.get({ returnType: 'Object' });
					for (let nodeId in allNodes) {
						nodeColors[nodeId] = allNodes[nodeId].color;
					}
					allEdges = edges.get({ returnType: 'Object' });
					data = { nodes: nodes, edges: edges };

					var options = {
						layout: { hierarchical: false },
						edges: { arrows: { to: { enabled: true } } }
					};

					network = new vis.Network(mynetwork, data, options);

					network.on('stabilizationProgress', function (params) {
						loadingBar.removeAttribute('style');
						var maxWidth = 496;
						var minWidth = 20;
						var widthFactor = params.iterations / params.total;
						var width = Math.max(minWidth, maxWidth * widthFactor);
						bar.style.width = width + 'px';
						text.innerHTML = Math.round(widthFactor * 100) + '%';
					});
					network.once('stabilizationIterationsDone', function () {
						text.innerHTML = '100%';
						bar.style.width = '496px';
						loadingBar.style.opacity = 0;
						// really clean the dom element
						setTimeout(function () {
							loadingBar.style.display = 'none';
						}, 500);
					});

					return network;
				}
				drawGraph();
			} catch (error) {
				console.error('Error reading or parsing the file:', error);
			}
		}
	}

	function readFile(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (event) => {
				resolve(event.target.result);
			};

			reader.onerror = (error) => {
				reject(error);
			};

			reader.readAsText(file);
		});
	}
</script>

<Header />

<div class="page {full} ">
	<div class="tqtitle subtitle">
		<div class="title tq">WebNN DirectML Graph Before Compilation</div>
	</div>

	<div class="jsonfile">
		<input type="file" accept=".json" on:change={handleFileInput} />
	</div>

	<div class="mb-2 network" style="width: 100%">
		<Fullscreen let:onToggle>
			<div id="mynetwork" bind:this={mynetwork}></div>
			<div class="q copy">
				<div>
					{#if full}
						<button
							id="btnfullexit"
							title="Exit fullscreen"
							on:click={() => {
								onToggle();
							}}
						>
							<FullscreenExitSVG />
						</button>
					{:else}
						<button
							id="btnfull"
							title="Enter fullscreen"
							on:click={() => {
								onToggle();
							}}
						>
							<FullscreenSVG />
						</button>
					{/if}
				</div>
			</div>
		</Fullscreen>
	</div>

	<div id="loadingBar" bind:this={loadingBar}>
		<div class="outerBorder">
			<div id="text" bind:this={text}>0%</div>
			<div id="border" bind:this={border}>
				<div id="bar" bind:this={bar}></div>
			</div>
		</div>
	</div>
</div>

<Environment />

<Footer />

<style>
	.true #btnfullexit {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 1000;
		background-color: red;
	}

	.jsonfile {
		margin: 0px auto 10px 0;
		text-align: center;
	}

	#mynetwork {
		width: 100%;
		height: auto;
		background-color: white;
		border: 1px solid var(--grey-02);
		outline: none;
	}

	#mynetwork canvas {
		height: 100% !important;
	}

	.q div {
		border: 1px solid var(--grey-02);
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		border-top: 0px;
		margin-right: -2px;
	}

	#mynetwork:hover,
	.q div:hover {
		border: 1px solid var(--grey-04);
	}

	.q div:hover {
		border-top: 0px;
	}

	.network button {
		background: transparent;
		border: 0px;
	}

	#loadingBar {
		/* position: absolute;
		top: 0px;
		left: 0px; */
		transition: all 0.5s ease;
	}

	#bar {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 10px;
		height: 10px;
		margin: auto auto auto auto;
		border-radius: 11px;
		border: 2px solid rgba(30, 30, 30, 0.05);
		background: rgb(0, 173, 246);
	}

	#border {
		position: absolute;
		top: 5px;
		left: 10px;
		width: 560px;
		height: 13px;
		margin: auto auto auto auto;
		border-radius: 10px;
	}

	#text {
		position: absolute;
		top: 3px;
		left: 566px;
		width: 30px;
		height: 20px;
		margin: auto auto auto auto;
		font-size: 12px;
	}

	div.outerBorder {
		position: relative;
		width: 600px;
		height: 24px;
		margin: 0 auto;
		background: rgb(252, 252, 252);
		border-radius: 24px;
	}

	.page {
		margin: 0 6px;
	}

	.red {
		color: var(--red);
	}

	.title {
		text-align: center;
		color: var(--red);
	}
</style>
