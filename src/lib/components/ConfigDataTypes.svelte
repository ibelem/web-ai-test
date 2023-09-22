<script>
	import {
		trimComma,
		removeStringFromArray,
		arrayToStringWithComma,
		containsAllElementsInArray,
		getURLParameterValue,
		selectedDataTypes,
		getUniqueDataTypesByModelId,
		goTo,
		stringToArray,
		getModelIdfromPath
	} from '$lib/assets/js/utils';
	import { beforeUpdate, onMount } from 'svelte';

	/**
	 * @type {any}
	 */
	let dataTypes = {};

	/**
	 * @type {any[]}
	 */
	let uniqueDataTypes = [];

	const toggleDataTypes = () => {
		for (const datatype in dataTypes) {
			if (dataTypes.hasOwnProperty(datatype)) {
				dataTypes[datatype] = !dataTypes[datatype];
			}
		}

		let urlDataTypes = getURLParameterValue('datatype')?.toLocaleLowerCase().trim();
		urlDataTypes = decodeURIComponent(urlDataTypes);
		urlDataTypes = trimComma(urlDataTypes);

		/**
		 * @type {any}
		 */
		let invertDataTypes = '';

		if (urlDataTypes !== 'none') {
			urlDataTypes = stringToArray(urlDataTypes);
			invertDataTypes = arrayToStringWithComma(
				uniqueDataTypes.filter((item) => !urlDataTypes.includes(item))
			);
		} else if (urlDataTypes === 'none') {
			invertDataTypes = 'all';
		}

		if (invertDataTypes.length === 0) {
			goTo('datatype', 'none');
		} else {
			goTo('datatype', invertDataTypes);
		}
	};

	const toggleDataType = (/** @type {string} */ datatype) => {
		if (dataTypes.hasOwnProperty(datatype)) {
			dataTypes[datatype] = !dataTypes[datatype];
		}

		let urlDataTypes = getURLParameterValue('datatype')?.toLocaleLowerCase().trim();
		urlDataTypes = decodeURIComponent(urlDataTypes);

		urlDataTypes = trimComma(urlDataTypes);

		if (dataTypes[datatype]) {
			// Add datatype
			console.log(dataTypes[datatype]);
			if (urlDataTypes === 'none') {
				urlDataTypes = datatype;
			} else {
				urlDataTypes = urlDataTypes + ',' + datatype;
			}
		} else {
			// Remove datatype
			if (urlDataTypes && urlDataTypes?.indexOf(datatype) > -1) {
				if (urlDataTypes === datatype) {
					urlDataTypes = 'none';
				} else {
					urlDataTypes = urlDataTypes?.replaceAll(datatype, '').replaceAll(',,', ',');
				}
			}
		}

		urlDataTypes = trimComma(urlDataTypes);

		goTo('datatype', urlDataTypes);
	};

	beforeUpdate(() => {
		uniqueDataTypes = getUniqueDataTypesByModelId(getModelIdfromPath());
		for (let u of uniqueDataTypes) {
			dataTypes[u] = false;
		}
	});

	onMount(() => {
		for (const datatype of selectedDataTypes) {
			dataTypes[datatype] = true;
		}
	});
</script>

{#if dataTypes}
	<div class="title">
		<label class="" title="Toggle data types">
			<input type="checkbox" on:change={() => toggleDataTypes()} />
			Data Type
		</label>
	</div>
	<div class="types">
		{#each Object.keys(dataTypes) as dt}
			<label class="extra {dataTypes[dt]}" title={dt}>
				<input type="checkbox" on:change={() => toggleDataType(dt)} />
				{dt}
			</label>
		{/each}

		<!-- <label class="extra {dataTypes.fp32}" title="FP32">
			<input type="checkbox" on:change={() => toggleDataType('fp32')} />
			FP32
		</label>
		<label class="extra {dataTypes.fp16}" title="FP16">
			<input type="checkbox" on:change={() => toggleDataType('fp16')} />
			FP16
		</label>
		<label class="extra {dataTypes.int8}" title="INT8">
			<input type="checkbox" on:change={() => toggleDataType('int8')} />
			INT8
		</label> -->
	</div>
{/if}

<style>
</style>
