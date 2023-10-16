<script>
	import {
		trimComma,
		arrayToStringWithComma,
		getURLParameterValue,
		getUniqueDataTypesByModelId,
		goTo,
		stringToArray,
		getModelIdfromPath
	} from '$lib/assets/js/utils';
	// import { dataTypesStore } from '$lib/store/store';
	import { beforeUpdate, onMount } from 'svelte';

	// /**
	//  * @type {string[]}
	//  */
	// let selectedDataTypes;
	// dataTypesStore.subscribe((value) => {
	// 	selectedDataTypes = value;
	// });

	let dataTypesFromUrl;

	/**
	 * @type {any}
	 */
	let dataTypes = {
		fp32: { selected: false, show: false },
		fp16: { selected: false, show: false },
		int8: { selected: false, show: false }
	};

	/**
	 * @type {any[]}
	 */
	let uniqueDataTypes = [];
	const toggleDataTypes = () => {
		for (const datatype in dataTypes) {
			if (dataTypes.hasOwnProperty(datatype)) {
				dataTypes[datatype].selected = !dataTypes[datatype].selected;
			}
		}
		let urlDataTypes = getURLParameterValue('datatype')?.toLocaleLowerCase().trim();
		urlDataTypes = decodeURIComponent(urlDataTypes);
		urlDataTypes = urlDataTypes?.replaceAll('undefined', '');
		urlDataTypes = trimComma(urlDataTypes);
		/**
		 * @type {any}
		 */
		let invertDataTypes = '';
		if (urlDataTypes !== 'none') {
			urlDataTypes = stringToArray(urlDataTypes);
			invertDataTypes = arrayToStringWithComma(
				uniqueDataTypes.filter((item) => !urlDataTypes?.includes(item))
			);
		} else if (urlDataTypes === 'none') {
			invertDataTypes = arrayToStringWithComma(uniqueDataTypes);
		}

		invertDataTypes = invertDataTypes?.replaceAll('undefined', '');
		if (invertDataTypes.length === 0) {
			goTo('datatype', 'none');
		} else {
			goTo('datatype', invertDataTypes);
		}
	};

	const toggleDataType = (/** @type {string} */ datatype) => {
		if (dataTypes.hasOwnProperty(datatype)) {
			dataTypes[datatype].selected = !dataTypes[datatype].selected;
		}
		dataTypes = dataTypes;
		let urlDataTypes = getURLParameterValue('datatype')?.toLocaleLowerCase().trim();
		urlDataTypes = decodeURIComponent(urlDataTypes);
		urlDataTypes = urlDataTypes?.replaceAll('undefined', '');
		urlDataTypes = trimComma(urlDataTypes);
		if (dataTypes[datatype]) {
			// Remove
			if (urlDataTypes && urlDataTypes?.indexOf(datatype) > -1) {
				if (urlDataTypes === datatype) {
					urlDataTypes = 'none';
				} else {
					urlDataTypes = urlDataTypes?.replaceAll(datatype, '').replaceAll(',,', ',');
				}
			} else {
				if (urlDataTypes === 'none') {
					urlDataTypes = datatype;
				} else {
					urlDataTypes = urlDataTypes + ',' + datatype;
				}
			}
		}
		urlDataTypes = urlDataTypes?.replaceAll('undefined', '');
		urlDataTypes = trimComma(urlDataTypes);
		goTo('datatype', urlDataTypes);
	};

	beforeUpdate(() => {
		uniqueDataTypes = getUniqueDataTypesByModelId(getModelIdfromPath());
		for (let dataType of uniqueDataTypes) {
			if (dataTypes[dataType]) {
				dataTypes[dataType].show = true;
			}
		}
	});

	const highlightDataTypes = () => {
		dataTypesFromUrl = getURLParameterValue('datatype')?.toLocaleLowerCase().trim();
		dataTypesFromUrl = decodeURIComponent(dataTypesFromUrl);
		dataTypesFromUrl = dataTypesFromUrl?.replaceAll('undefined', '');
		dataTypesFromUrl = trimComma(dataTypesFromUrl);

		if (dataTypesFromUrl === 'all') {
			dataTypesFromUrl = ['fp32', 'fp16', 'int8'];
		} else {
			dataTypesFromUrl = stringToArray(dataTypesFromUrl);
		}

		dataTypesFromUrl = dataTypesFromUrl.filter((item) => item !== 'none');

		if (dataTypesFromUrl.length > 0) {
			for (const datatype of dataTypesFromUrl) {
				dataTypes[datatype].selected = true;
			}
		}
	};

	onMount(() => {
		highlightDataTypes();
	});
</script>

{#if dataTypes}
	<div class="title">
		<label class="" title="Toggle operand types">
			<input type="checkbox" on:change={() => toggleDataTypes()} />
			Operand Type
		</label>
	</div>
	<div class="types">
		<!-- {#each Object.keys(dataTypes) as dt}
			<label class="extra {dataTypes[dt]}" title={dt.toUpperCase()}>
				<input type="checkbox" on:change={() => toggleDataType(dt)} />
				{dt.toUpperCase()}
			</label>
		{/each} -->

		{#if dataTypes.fp32.show}
			<label class="extra {dataTypes.fp32.selected}" title="FP32">
				<input type="checkbox" on:change={() => toggleDataType('fp32')} />
				FP32
			</label>
		{/if}
		{#if dataTypes.fp16.show}
			<label class="extra {dataTypes.fp16.selected}" title="FP16">
				<input type="checkbox" on:change={() => toggleDataType('fp16')} />
				FP16
			</label>
		{/if}
		{#if dataTypes.int8.show}
			<label class="extra {dataTypes.int8.selected}" title="INT8">
				<input type="checkbox" on:change={() => toggleDataType('int8')} />
				INT8
			</label>
		{/if}
	</div>
{/if}

<style>
</style>
