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
	import { onMount } from 'svelte';

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
	let dataTypes = $state({
		fp32: { selected: false, show: false },
		fp16: { selected: false, show: false },
		q4f16: { selected: false, show: false },
		int8: { selected: false, show: false },
		uint8: { selected: false, show: false },
		int4: { selected: false, show: false },
		bnb4: { selected: false, show: false },
		q4: { selected: false, show: false }
	});

	/**
	 * @type {any[]}
	 */
	let uniqueDataTypes = $state([]);
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

	$effect.pre(() => {
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
			dataTypesFromUrl = ['fp32', 'fp16', 'q4f16', 'int8', 'uint8', 'int4', 'bnb4', 'q4'];
		} else {
			dataTypesFromUrl = stringToArray(dataTypesFromUrl);
		}

		dataTypesFromUrl = dataTypesFromUrl.filter((item) => item !== 'none');

		if (dataTypesFromUrl.length > 0) {
			for (const datatype of dataTypesFromUrl) {
				if (dataTypes[datatype]) {
					dataTypes[datatype].selected = true;
				}
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
			<input type="checkbox" onchange={() => toggleDataTypes()} />
			Data Type
		</label>
	</div>
	<div class="types">
		<!-- {#each Object.keys(dataTypes) as dt}
			<label class="extra {dataTypes[dt]}" title={dt.toUpperCase()}>
				<input type="checkbox" onchange={() => toggleDataType(dt)} />
				{dt.toUpperCase()}
			</label>
		{/each} -->

		{#if dataTypes.fp32.show}
			<label class="extra {dataTypes.fp32.selected} fp32" title="FP32">
				<input type="checkbox" onchange={() => toggleDataType('fp32')} />
				FP32
			</label>
		{/if}
		<!-- {#if dataTypes.int64.show}
			<label class="extra {dataTypes.int64.selected} int64" title="INT64">
				<input type="checkbox" onchange={() => toggleDataType('int64')} />
				INT64
			</label>
		{/if} -->
		{#if dataTypes.fp16.show}
			<label class="extra {dataTypes.fp16.selected} fp16" title="FP16">
				<input type="checkbox" onchange={() => toggleDataType('fp16')} />
				FP16
			</label>
		{/if}
		{#if dataTypes.q4f16.show}
			<label class="extra {dataTypes.q4f16.selected} q4f16" title="Q4F16">
				<input type="checkbox" onchange={() => toggleDataType('q4f16')} />
				Q4F16
			</label>
		{/if}
		{#if dataTypes.int8.show}
			<label class="extra {dataTypes.int8.selected} int8" title="INT8">
				<input type="checkbox" onchange={() => toggleDataType('int8')} />
				INT8
			</label>
		{/if}
		{#if dataTypes.uint8.show}
			<label class="extra {dataTypes.uint8.selected} uint8" title="UINT8">
				<input type="checkbox" onchange={() => toggleDataType('uint8')} />
				UINT8
			</label>
		{/if}
		{#if dataTypes.int4.show}
			<label class="extra {dataTypes.int4.selected} int4" title="INT4">
				<input type="checkbox" onchange={() => toggleDataType('int4')} />
				INT4
			</label>
		{/if}
		{#if dataTypes.bnb4.show}
			<label class="extra {dataTypes.bnb4.selected} bnb4" title="BNB4">
				<input type="checkbox" onchange={() => toggleDataType('bnb4')} />
				BNB4
			</label>
		{/if}
		{#if dataTypes.q4.show}
			<label class="extra {dataTypes.q4.selected} q4" title="Q4">
				<input type="checkbox" onchange={() => toggleDataType('q4')} />
				Q4
			</label>
		{/if}
	</div>
{/if}

<style>
</style>
