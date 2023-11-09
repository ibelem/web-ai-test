{#if results.length > 0}
	<div class="rqtitle">
		<div class="title rq">Inference Time (Average)</div>
	</div>
	<div class="result">
		<div class="q title _{selectedBackends.length}">
			<div class="m" title="Model Name">
				Model <button on:click={sortResult('id')} class="btn"
					>{#if !sortId}<SortAscending />{:else}<SortDescending />{/if}</button
				>
			</div>
			<div class="ms" title="Model Size">
				Size <button on:click={sortResult('modelsize')} class="btn"
					>{#if !sortModelSize}<SortAscending />{:else}<SortDescending />{/if}</button
				>
			</div>
			<div class="mt" title="Model Type">
				Type <button on:click={sortResult('modeltype')} class="btn"
					>{#if !sortModelType}<SortAscending />{:else}<SortDescending />{/if}</button
				>
			</div>
			<div class="dt" title="Operand Data Type">
				Data <button on:click={sortResult('datatype')} class="btn"
					>{#if !sortDataType}<SortAscending />{:else}<SortDescending />{/if}</button
				>
			</div>
			{#if results[0].wasm_1 && results[0].wasm_1.status !== 0}<div class="backend cpu">
					<span title="WebAssembly SIMD with 1 Thread on CPU"
						>Wasm 1T <button on:click={sortResult('wasm_1')} class="btn"
							>{#if !sortWasm1}<SortAscending />{:else}<SortDescending />{/if}</button
						></span
					>
				</div>{/if}
			{#if results[0].wasm_4 && results[0].wasm_4.status !== 0}<div class="backend cpu">
					<span title="WebAssembly SIMD with 4 Threads on CPU"
						>Wasm 4T <button on:click={sortResult('wasm_4')} class="btn"
							>{#if !sortWasm4}<SortAscending />{:else}<SortDescending />{/if}</button
						></span
					>
				</div>{/if}
			{#if results[0].webnn_cpu_1 && results[0].webnn_cpu_1.status !== 0}<div class="backend cpu">
					<span title="WebNN CPU with 1 Thread on CPU"
						><span class="hide">Web</span>NN CPU 1T
						<button on:click={sortResult('webnn_cpu_1')} class="btn"
							>{#if !sortWebnnCpu1}<SortAscending />{:else}<SortDescending />{/if}</button
						></span
					>
				</div>{/if}
			{#if results[0].webnn_cpu_4 && results[0].webnn_cpu_4.status !== 0}<div class="backend cpu">
					<span title="WebNN CPU with 4 Threads on CPU"
						><span class="hide">Web</span>NN CPU 4T
						<button on:click={sortResult('webnn_cpu_4')} class="btn"
							>{#if !sortWebnnCpu4}<SortAscending />{:else}<SortDescending />{/if}</button
						></span
					>
				</div>{/if}

			{#if results[0].webgl && results[0].webgl.status !== 0}<div class="backend gpu">
					<span title="WebGL on GPU"
						>WebGL <button on:click={sortResult('webgl')} class="btn"
							>{#if !sortWebGl}<SortAscending />{:else}<SortDescending />{/if}</button
						></span
					>
				</div>{/if}
			{#if results[0].webgpu && results[0].webgpu.status !== 0}<div class="backend gpu">
					<span title="WebGPU on GPU"
						>WebGPU <button on:click={sortResult('webgpu')} class="btn"
							>{#if !sortWebGpu}<SortAscending />{:else}<SortDescending />{/if}</button
						></span
					>
				</div>{/if}
			{#if results[0].webnn_gpu && results[0].webnn_gpu.status !== 0}<div class="backend gpu">
					<span title="WebNN GPU on GPU"
						><span class="hide">Web</span>NN GPU
						<button on:click={sortResult('webnn_gpu')} class="btn"
							>{#if !sortWebnnGpu}<SortAscending />{:else}<SortDescending />{/if}</button
						></span
					>
				</div>{/if}
			{#if results[0].webnn_npu && results[0].webnn_npu.status !== 0}<div class="backend npu">
					<span title="WebNN NPU on NPU"
						><span class="hide">Web</span>NN NPU
						<button on:click={sortResult('webnn_npu')} class="btn"
							>{#if !sortWebnnNpu}<SortAscending />{:else}<SortDescending />{/if}</button
						></span
					>
				</div>{/if}
		</div>

		<!-- style="background: linear-gradient(90deg, var(--green-01) 0%, rgba(255,255,255,1) {getProgress(
							key.model
						)}%);" -->

		{#each Object.entries(results) as [index, key]}
			<div class="q _{selectedBackends.length}">
				<div class="m">
					{#if getProgress(key.model) === '100.0'}
						<span title="{getModelNameById(key.model)} - {getModelDescriptionById(key.model)}"
							>{getModelNameById(key.model)}</span
						>
					{:else}
						{getModelNameById(key.model)}
					{/if}

					<a
						title="Check WebNN support status of {getModelNameById(key.model)}"
						href="https://ibelem.github.io/netron/?url={getModelHFUrlById(key.model)}"
						><ArrowOutward /></a
					>
				</div>

				<div class="ms">
					<!-- {#if getProgress(key.model) === '100.0'}
						<span title="{getModelNameById(key.model)} downloaded" class="download">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								><path
									d="M382-320 155-547l57-57 170 170 366-366 57 57-423 423ZM200-160v-80h560v80H200Z"
								/></svg
							>
						</span>
					{:else} -->
					{#if getLoaded(key.model)}
						{#if getProgress(key.model) === '100.0'}
							<span title="{getModelNameById(key.model)} downloaded">{getLoaded(key.model)} MB</span
							>
						{/if}

						{#if getProgress(key.model) !== '100.0'}
							<svg
								class="downloading"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								><path
									d="M439-82q-76-8-141.5-42.5t-113.5-88Q136-266 108.5-335T81-481q0-155 102.5-268.5T440-880v80q-121 17-200 107.5T161-481q0 121 79 211.5T439-162v80Zm40-198L278-482l57-57 104 104v-245h80v245l103-103 57 58-200 200Zm40 198v-80q43-6 82.5-23t73.5-43l58 58q-47 37-101 59.5T519-82Zm158-652q-35-26-74.5-43T520-800v-80q59 6 113 28.5T733-792l-56 58Zm112 506-56-57q26-34 42-73.5t22-82.5h82q-8 59-30 113.5T789-228Zm8-293q-6-43-22-82.5T733-677l56-57q38 45 61 99.5T879-521h-82Z"
								/></svg
							>
							<span class="downloadprogress"
								>{getLoaded(key.model)} MB / {getProgress(key.model)}%</span
							>
						{/if}
					{:else}
						{key.modelsize}
					{/if}
				</div>

				{#if key.modeltype === 'onnx'}
					<div class="{key.modeltype} mt">
						<Onnx />
					</div>
				{/if}

				{#if key.modeltype === 'tflite'}
					<div class="{key.modeltype} mt">
						<Tflite />
					</div>
				{/if}

				{#if key.modeltype === 'npy'}
					<div class="{key.modeltype} mt"><Npy /></div>
				{/if}

				{#if key.modeltype === 'pt'}
					<div class="{key.modeltype} mt"><Pt /></div>
				{/if}

				<div class="{key.datatype} dt">{key.datatype}</div>

				{#if key.wasm_1 && key.wasm_1.status !== 0}
					{#if key.wasm_1.status === 1}
						<div class="status_{key.wasm_1.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.wasm_1.status === 2}
						<div class="status_{key.wasm_1.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.wasm_1.status === 3}
						<div
							class="status_{key.wasm_1.status} s backend"
							title="Compilation Time: {key.wasm_1.compilation.toString()} ms; First Inference Time: {key.wasm_1.warmup.toString()} ms; Inference Time (Average): {key
								.wasm_1.inferenceaverage} ms; Inference Times: [{key.wasm_1.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.wasm_1.inferenceaverage}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Compilation Time: ${key.wasm_1.compilation.toString()} ms; First Inference Time: ${key.wasm_1.warmup.toString()} ms; Inference Time (Average): ${
											key.wasm_1.inferenceaverage
										} ms; Inference Times: [${key.wasm_1.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.wasm_1.status === 4}
						<div class="status_{key.wasm_1.status} s" title={key.wasm_1.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.wasm_4 && key.wasm_4.status !== 0}
					{#if key.wasm_4.status === 1}
						<div class="status_{key.wasm_4.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.wasm_4.status === 2}
						<div class="status_{key.wasm_4.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.wasm_4.status === 3}
						<div
							class="status_{key.wasm_4.status} s backend"
							title="Compilation Time: {key.wasm_4.compilation.toString()} ms; First Inference Time: {key.wasm_4.warmup.toString()} ms; Inference Time (Average): {key
								.wasm_4.inferenceaverage} ms; Inference Times: [{key.wasm_4.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.wasm_4.inferenceaverage}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Compilation Time: ${key.wasm_4.compilation.toString()} ms; First Inference Time: ${key.wasm_4.warmup.toString()} ms; Inference Time (Average): ${
											key.wasm_4.inferenceaverage
										} ms; Inference Times: [${key.wasm_4.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.wasm_4.status === 4}
						<div class="status_{key.wasm_4.status} s" title={key.wasm_4.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webnn_cpu_1 && key.webnn_cpu_1.status !== 0}
					{#if key.webnn_cpu_1.status === 1}
						<div class="status_{key.webnn_cpu_1.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webnn_cpu_1.status === 2}
						<div class="status_{key.webnn_cpu_1.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webnn_cpu_1.status === 3}
						<div
							class="status_{key.webnn_cpu_1.status} s backend"
							title="Compilation Time: {key.webnn_cpu_1.compilation.toString()} ms; First Inference Time: {key.webnn_cpu_1.warmup.toString()} ms; Inference Time (Average): {key
								.webnn_cpu_1.inferenceaverage} ms; Inference Times: [{key.webnn_cpu_1.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webnn_cpu_1.inferenceaverage}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Compilation Time: ${key.webnn_cpu_1.compilation.toString()} ms; First Inference Time: ${key.webnn_cpu_1.warmup.toString()} ms; Inference Time (Average): ${
											key.webnn_cpu_1.inferenceaverage
										} ms; Inference Times: [${key.webnn_cpu_1.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_cpu_1.status === 4}
						<div class="status_{key.webnn_cpu_1.status} s" title={key.webnn_cpu_1.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webnn_cpu_4 && key.webnn_cpu_4.status !== 0}
					{#if key.webnn_cpu_4.status === 1}
						<div class="status_{key.webnn_cpu_4.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webnn_cpu_4.status === 2}
						<div class="status_{key.webnn_cpu_4.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webnn_cpu_4.status === 3}
						<div
							class="status_{key.webnn_cpu_4.status} s backend"
							title="Compilation Time: {key.webnn_cpu_4.compilation.toString()} ms;  First Inference Time: {key.webnn_cpu_4.warmup.toString()} ms; Inference Time (Average): {key
								.webnn_cpu_4.inferenceaverage} ms; Inference Times: [{key.webnn_cpu_4.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webnn_cpu_4.inferenceaverage}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Compilation Time: ${key.webnn_cpu_4.compilation.toString()} ms;  First Inference Time: ${key.webnn_cpu_4.warmup.toString()} ms; Inference Time (Average): ${
											key.webnn_cpu_4.inferenceaverage
										} ms; Inference Times: [${key.webnn_cpu_4.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_cpu_4.status === 4}
						<div class="status_{key.webnn_cpu_4.status} s" title={key.webnn_cpu_4.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webgl && key.webgl.status !== 0}
					{#if key.webgl.status === 1}
						<div class="status_{key.webgl.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webgl.status === 2}
						<div class="status_{key.webgl.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webgl.status === 3}
						<div
							class="status_{key.webgl.status} s backend"
							title="Compilation Time: {key.webgl.compilation.toString()} ms; First Inference Time: {key.webgl.warmup.toString()} ms; Inference Time (Average): {key
								.webgl.inferenceaverage} ms; Inference Times: [{key.webgl.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webgl.inferenceaverage}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Compilation Time: ${key.webgl.compilation.toString()} ms; First Inference Time: ${key.webgl.warmup.toString()} ms; Inference Time (Average): ${
											key.webgl.inferenceaverage
										} ms; Inference Times: [${key.webgl.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webgl.status === 4}
						<div class="status_{key.webgl.status} s" title={key.webgl.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webgpu && key.webgpu.status !== 0}
					{#if key.webgpu.status === 1}
						<div class="status_{key.webgpu.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webgpu.status === 2}
						<div class="status_{key.webgpu.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webgpu.status === 3}
						<div
							class="status_{key.webgpu.status} s backend"
							title="Compilation Time: {key.webgpu.compilation.toString()} ms; First Inference Time: {key.webgpu.warmup.toString()} ms; Inference Time (Average): {key
								.webgpu.inferenceaverage} ms; Inference Times: [{key.webgpu.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webgpu.inferenceaverage}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Compilation Time: ${key.webgpu.compilation.toString()} ms; First Inference Time: ${key.webgpu.warmup.toString()} ms; Inference Time (Average): ${
											key.webgpu.inferenceaverage
										} ms; Inference Times: [${key.webgpu.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webgpu.status === 4}
						<div class="status_{key.webgpu.status} s" title={key.webgpu.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webnn_gpu && key.webnn_gpu.status !== 0}
					{#if key.webnn_gpu.status === 1}
						<div class="status_{key.webnn_gpu.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webnn_gpu.status === 2}
						<div class="status_{key.webnn_gpu.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webnn_gpu.status === 3}
						<div
							class="status_{key.webnn_gpu.status} s backend"
							title="Compilation Time: {key.webnn_gpu.compilation.toString()} ms; First Inference Time: {key.webnn_gpu.warmup.toString()} ms; Inference Time (Average): {key
								.webnn_gpu.inferenceaverage} ms; Inference Times: [{key.webnn_gpu.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webnn_gpu.inferenceaverage}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Compilation Time: ${key.webnn_gpu.compilation.toString()} ms; First Inference Time: ${key.webnn_gpu.warmup.toString()} ms; Inference Time (Average): ${
											key.webnn_gpu.inferenceaverage
										} ms; Inference Times: [${key.webnn_gpu.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_gpu.status === 4}
						<div class="status_{key.webnn_gpu.status} s" title={key.webnn_gpu.error}>
							<Fail />
						</div>
					{/if}
				{/if}

				{#if key.webnn_npu && key.webnn_npu.status !== 0}
					{#if key.webnn_npu.status === 1}
						<div class="status_{key.webnn_npu.status} s">
							<Queue />
						</div>
					{/if}

					{#if key.webnn_npu.status === 2}
						<div class="status_{key.webnn_npu.status} s">
							<Testing />
						</div>
					{/if}

					{#if key.webnn_npu.status === 3}
						<div
							class="status_{key.webnn_npu.status} s backend"
							title="Compilation Time: {key.webnn_npu.compilation.toString()} ms; First Inference Time: {key.webnn_npu.warmup.toString()} ms; Inference Time (Average): {key
								.webnn_npu.inferenceaverage} ms; Inference Times: [{key.webnn_npu.inference
								.toString()
								.replace(',', ', ')}] ms"
						>
							<span>
								{key.webnn_npu.inferenceaverage}
							</span>
							<button
								on:click={() =>
									copyRawInference(
										`Compilation Time: ${key.webnn_npu.compilation.toString()} ms; First Inference Time: ${key.webnn_npu.warmup.toString()} ms; Inference Time (Average): ${
											key.webnn_npu.inferenceaverage
										} ms; Inference Times: [${key.webnn_npu.inference
											.toString()
											.replace(',', ', ')}] ms`
									)}
							>
								<Copy />
							</button>
						</div>
					{/if}

					{#if key.webnn_npu.status === 4}
						<div class="status_{key.webnn_npu.status} s" title={key.webnn_npu.error}>
							<Fail />
						</div>
					{/if}
				{/if}
			</div>
		{/each}
	</div>
	<div class="q copy">
		<div>
			<span>
				{testQueueLength - testQueue.length}/{testQueueLength}
				{percentageTestQueue}%</span
			>
			{#if testQueue.length === 0}
				<button title="Download screenshot of test results" on:click={() => downloadScreenshot()}>
					<Screenshot />
				</button>
				<button title="Copy full test results" on:click={() => copyResults()}>
					<FileCopy />
				</button>
			{/if}
		</div>
	</div>
{/if}
