<script>
	import { models } from '../config';
	import { fallback, fallbackEnv } from '../fallback';
	import {
		trimComma,
		removeStringFromArray,
		arrayToStringWithComma,
		containsAllElementsInArray,
		getURLParameterValue,
		getUniqueDataTypes,
		getUniqueModelTypes,
		getModelDataTypeById,
		getModelTypeById,
		getModelDescriptionById,
		getModelSizeById,
		getModelCategoryById,
		getModelInputsById,
		getModelNoteById,
		getModelIsvById,
		goTo,
		stringToArray,
		getModelNameById,
		sortModelById,
		getModelTagById
	} from '$lib/assets/js/utils';
	import { modelTypesStore, dataTypesStore, modelsStore } from '$lib/store/store';
	import { onMount, beforeUpdate } from 'svelte';
	import Info from './svg/Info.svelte';
	// import Fail from './svg/Fail.svelte';
	// import Clock from './svg/Clock.svelte';
	// import MoreTime from './svg/MoreTime.svelte';
	// import Check from './svg/Check.svelte';

	/**
	 * @type {string[]}
	 */
	export let selectedModelTypes;
	modelTypesStore.subscribe((value) => {
		selectedModelTypes = value;
	});

	/**
	 * @type {string[]}
	 */
	export let selectedDataTypes;
	dataTypesStore.subscribe((value) => {
		selectedDataTypes = value;
	});

	/**
	 * @type {string[]}
	 */
	let selectedModels;
	modelsStore.subscribe((value) => {
		selectedModels = value;
	});

	/**
	 * @type {any[]}
	 */
	let filteredModelIds = [];

   /**
	 * @type {any}
	 */
	 let categories = {
		top2025: true,
		devpreview: true,
		tfbench: true,
		operators: true,
		other: true,
	};

	const toggleCategories = () => {
    Object.keys(categories).forEach(key => {
        categories[key] = !categories[key];
    });
    
    filterModelsFromSelectedModelTypeandDataTypes();
};

	/**
	 * @param {string} category
	 */
	const toggleCategory = (category) => {
		if (category in categories) {
				categories[category] = !categories[category];
		}
		filterModelsFromSelectedModelTypeandDataTypes();
	};

	/**
	 * @type {any}
	 */
	let dataTypes = {
		fp32: false,
		fp16: false,
		int8: false,
		int4: false
		// int64: false
	};

	const uniqueDataTypes = getUniqueDataTypes();

	const toggleDataTypes = () => {
		for (const datatype in dataTypes) {
			if (dataTypes.hasOwnProperty(datatype)) {
				dataTypes[datatype] = !dataTypes[datatype];
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

		if (urlDataTypes !== 'all' && urlDataTypes !== 'none') {
			urlDataTypes = urlDataTypes?.replaceAll('undefined', '');
			urlDataTypes = stringToArray(urlDataTypes);
			invertDataTypes = arrayToStringWithComma(
				uniqueDataTypes.filter((item) => !urlDataTypes.includes(item))
			);
			invertDataTypes = invertDataTypes?.replaceAll('undefined', '');
		} else if (urlDataTypes === 'all') {
			invertDataTypes = 'none';
		} else if (urlDataTypes === 'none') {
			invertDataTypes = 'all';
		}

		filterModelsFromSelectedModelTypeandDataTypes();
		if (invertDataTypes.length === 8) {
			goTo('datatype', 'all');
		} else if (invertDataTypes.length === 0) {
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
		urlDataTypes = urlDataTypes?.replaceAll('undefined', '');
		urlDataTypes = trimComma(urlDataTypes);

		if (dataTypes[datatype]) {
			// Add datatype
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
			} else if (urlDataTypes === 'all') {
				// let removedDataTypes = removeStringFromArray(['fp32', 'fp16', 'int8', 'int64'], datatype);
				let removedDataTypes = removeStringFromArray(['fp32', 'fp16', 'int8', 'int4'], datatype);
				urlDataTypes = arrayToStringWithComma(removedDataTypes);
			}
		}

		urlDataTypes = urlDataTypes?.replaceAll('undefined', '');
		urlDataTypes = trimComma(urlDataTypes);

		if (containsAllElementsInArray(urlDataTypes, uniqueDataTypes)) {
			urlDataTypes = 'all';
		}

		filterModelsFromSelectedModelTypeandDataTypes();
		goTo('datatype', urlDataTypes);
	};

	/**
	 * @type {any}
	 */
	let modelTypes = {
		onnx: false,
		tflite: false,
		npy: false,
		pt: false
	};

	const uniqueModelTypes = getUniqueModelTypes();

	const toggleModelTypes = () => {
		for (const modeltype in modelTypes) {
			if (modelTypes.hasOwnProperty(modeltype)) {
				modelTypes[modeltype] = !modelTypes[modeltype];
			}
		}

		let urlModelTypes = getURLParameterValue('modeltype')?.toLocaleLowerCase().trim();
		urlModelTypes = decodeURIComponent(urlModelTypes);
		urlModelTypes = urlModelTypes?.replaceAll('undefined', '');
		urlModelTypes = trimComma(urlModelTypes);

		/**
		 * @type {any}
		 */
		let invertModelTypes = '';

		if (urlModelTypes !== 'all' && urlModelTypes !== 'none') {
			urlModelTypes = urlModelTypes?.replaceAll('undefined', '');
			urlModelTypes = stringToArray(urlModelTypes);
			invertModelTypes = arrayToStringWithComma(
				uniqueModelTypes.filter((item) => !urlModelTypes.includes(item))
			);
			invertModelTypes = invertModelTypes?.replaceAll('undefined', '');
		} else if (urlModelTypes === 'all') {
			invertModelTypes = 'none';
		} else if (urlModelTypes === 'none') {
			invertModelTypes = 'all';
		}

		filterModelsFromSelectedModelTypeandDataTypes();

		if (invertModelTypes.length === 8) {
			goTo('modeltype', 'all');
		} else if (invertModelTypes.length === 0) {
			goTo('modeltype', 'none');
		} else {
			goTo('modeltype', invertModelTypes);
		}
	};

	const toggleModelType = (/** @type {string} */ modeltype) => {
		if (modelTypes.hasOwnProperty(modeltype)) {
			modelTypes[modeltype] = !modelTypes[modeltype];
		}

		let urlModelTypes = getURLParameterValue('modeltype')?.toLocaleLowerCase().trim();
		urlModelTypes = decodeURIComponent(urlModelTypes);
		urlModelTypes = urlModelTypes?.replaceAll('undefined', '');
		urlModelTypes = trimComma(urlModelTypes);

		if (modelTypes[modeltype]) {
			// Add modeltype
			if (urlModelTypes === 'none') {
				urlModelTypes = modeltype;
			} else {
				urlModelTypes = urlModelTypes + ',' + modeltype;
			}
		} else {
			// Remove modeltype
			if (urlModelTypes && urlModelTypes?.indexOf(modeltype) > -1) {
				if (urlModelTypes === modeltype) {
					urlModelTypes = 'none';
				} else {
					urlModelTypes = urlModelTypes?.replaceAll(modeltype, '').replaceAll(',,', ',');
				}
			} else if (urlModelTypes === 'all') {
				let removedModelTypes = removeStringFromArray(['onnx', 'tflite', 'npy', 'pt'], modeltype);
				urlModelTypes = arrayToStringWithComma(removedModelTypes);
			}
		}

		urlModelTypes = urlModelTypes?.replaceAll('undefined', '');
		urlModelTypes = trimComma(urlModelTypes);

		if (containsAllElementsInArray(urlModelTypes, uniqueModelTypes)) {
			urlModelTypes = 'all';
		}

		filterModelsFromSelectedModelTypeandDataTypes();
		goTo('modeltype', urlModelTypes);
	};

	// const uniqueModels = getUniqueModels();

	const getFilteredArray = (array, categories) => {
		if (Object.values(categories).every(value => !value)) {
			return [];
		}
		
		if (Object.values(categories).every(value => value)) {
			return array;
		}
		
		return array.filter(item => {
			const id = item.id;
			const isv = getModelIsvById(id);
			const tag = getModelTagById(id);
			if (categories.top2025 && isv && isv === 'ms') {
				return true;
			}
			if (categories.devpreview && id.includes("_demo_")) {
				return true;
			}
			if (categories.tfbench && (id.includes("_tfbench_model_") || id.includes("_tfbench_pipeline_"))) {
				return true;
			}
			if (categories.operators && tag && tag === 'onnx_operators') {
				return true;
			}
			if (categories.other && 
					!(isv && isv === 'ms') && 
					!(tag && tag !== 'onnx_operators') && 
					!id.includes("_tfbench_model_") && 
					!id.includes("_tfbench_pipeline_")) {
				return true;
			}
			return false;
		});
	}

	const filterModelsFromSelectedModelTypeandDataTypes = () => {
		let filteredModels = sortModelById(models);
		filteredModels = filteredModels
			.filter(
				(model) =>
					selectedModelTypes.includes(model.format) && selectedDataTypes.includes(model.datatype)
			)
			.map((model) => ({
				id: model.id,
				name: model.name,
				selected: false
			}));

		filteredModels = getFilteredArray(filteredModels, categories);

		for (const model of filteredModels) {
			for (const m of selectedModels) {
				if (model.id === m) {
					model.selected = true;
				}
			}
		}

		/**
		 * @type {any[]}
		 */
		const uniqueObjects = [];

		filteredModels.forEach((obj) => {
			if (!uniqueObjects.some((o) => o.id === obj.id)) {
				uniqueObjects.push(obj);
			}
		});

		filteredModelIds = uniqueObjects;
	};

	for (const model of filteredModelIds) {
		model['selected'] = false;
	}
	const toggleModels = () => {
		filteredModelIds = filteredModelIds.map((item) => ({
			...item,
			selected: !item.selected
		}));
		let selectedIds = filteredModelIds
			.filter((item) => item.selected === true)
			.map((item) => item.id);
		let urlModels = getURLParameterValue('model')?.toLocaleLowerCase().trim();
		urlModels = decodeURIComponent(urlModels);
		urlModels = urlModels?.replaceAll('undefined', '');
		urlModels = trimComma(urlModels);

		/**
		 * @type {any}
		 */
		let invertModels = '';
		if (selectedIds.length === 0) {
			invertModels = 'none';
		} else {
			invertModels = arrayToStringWithComma(selectedIds);
		}

		invertModels = invertModels?.replaceAll('undefined', '');
		goTo('model', invertModels);
	};

	const toggleModel = (/** @type {string} */ model) => {
		filteredModelIds = filteredModelIds.map((item) => {
			if (item.id === model) {
				return { ...item, selected: !item.selected };
			}
			return item;
		});

		let urlModels = getURLParameterValue('model')?.toLocaleLowerCase().trim();
		urlModels = decodeURIComponent(urlModels);
		urlModels = urlModels?.replaceAll('undefined', '');
		urlModels = trimComma(urlModels);

		const selectedM = filteredModelIds.find((item) => item.id === model);
		const selectedV = selectedM ? selectedM.selected : false;

		if (selectedV) {
			// Add model
			if (urlModels === 'none') {
				urlModels = model;
			} else {
				urlModels = urlModels + ',' + model;
			}
		} else {
			// Remove model
			if (urlModels && urlModels?.indexOf(model) > -1) {
				if (urlModels === model) {
					urlModels = 'none';
				} else {
					urlModels = urlModels?.replaceAll(model, '').replaceAll(',,', ',');
				}
			}
		}

		urlModels = urlModels?.replaceAll('undefined', '');
		urlModels = trimComma(urlModels);
		goTo('model', urlModels);
	};

	beforeUpdate(() => {
		filterModelsFromSelectedModelTypeandDataTypes();
	});

	let dataTypesFromUrl;
	const highlightDataTypes = () => {
		dataTypesFromUrl = getURLParameterValue('datatype')?.toLocaleLowerCase().trim();
		dataTypesFromUrl = decodeURIComponent(dataTypesFromUrl);
		dataTypesFromUrl = dataTypesFromUrl?.replaceAll('undefined', '');
		dataTypesFromUrl = trimComma(dataTypesFromUrl);

		if (dataTypesFromUrl === 'all') {
			dataTypesFromUrl = ['fp32', 'fp16', 'int8', 'int4'];
			// dataTypesFromUrl = ['fp32', 'fp16', 'int8', 'int64'];
		} else {
			dataTypesFromUrl = stringToArray(dataTypesFromUrl);
		}

		if (dataTypesFromUrl.length > 0) {
			for (const datatype of dataTypesFromUrl) {
				if (dataTypes.hasOwnProperty(datatype)) {
					dataTypes[datatype] = true;
				}
			}
		}
	};

	let modelTypesFromUrl;
	const highlightModelTypes = () => {
		modelTypesFromUrl = getURLParameterValue('modeltype')?.toLocaleLowerCase().trim();
		modelTypesFromUrl = decodeURIComponent(modelTypesFromUrl);
		modelTypesFromUrl = modelTypesFromUrl?.replaceAll('undefined', '');
		modelTypesFromUrl = trimComma(modelTypesFromUrl);

		if (modelTypesFromUrl === 'all') {
			modelTypesFromUrl = ['onnx', 'tflite', 'npy', 'pt'];
		} else {
			modelTypesFromUrl = stringToArray(modelTypesFromUrl);
		}

		if (modelTypesFromUrl.length > 0) {
			for (const modeltype of modelTypesFromUrl) {
				if (modelTypes.hasOwnProperty(modeltype)) {
					modelTypes[modeltype] = true;
				}
			}
		}
	};

	let modelsFromUrl;
	const highlightModels = () => {
		modelsFromUrl = getURLParameterValue('model')?.toLocaleLowerCase().trim();
		modelsFromUrl = decodeURIComponent(modelsFromUrl);
		modelsFromUrl = modelsFromUrl?.replaceAll('undefined', '');
		modelsFromUrl = trimComma(modelsFromUrl);
		modelsFromUrl = stringToArray(modelsFromUrl);

		if (modelsFromUrl.length > 0) {
			for (const model of modelsFromUrl) {
				filteredModelIds[model] = true;
			}
		}
	};

	let show = false;
	let mDataType = '',
		mCategory = '',
		mId = '',
		mName = '',
		mModelType = '',
		mInputs = '',
		mSize = '',
		mDesc = '',
		mNote = '';
	// let fallbackId = [];

	const hideModelInfo = () => {
		show = false;
	};
	const showModelInfo = (/** @type {any} */ id) => {
		mId = id.replaceAll('_', '-');
		mCategory = getModelCategoryById(id);
		mName = getModelNameById(id);
		mModelType = getModelTypeById(id);
		mDataType = getModelDataTypeById(id);
		mInputs = getModelInputsById(id);
		mSize = getModelSizeById(id);
		mDesc = getModelDescriptionById(id);
		mNote = getModelNoteById(id);

		// fallbackId = fallback.filter((item) => item.name === id);
		show = true;
	};

	onMount(() => {
		// for (const datatype of selectedDataTypes) {
		// 	dataTypes[datatype] = true;
		// }

		// for (const modeltype of selectedModelTypes) {
		// 	modelTypes[modeltype] = true;
		// }

		// for (const model of selectedModels) {
		// 	filteredModelIds[model] = true;
		// }

		highlightDataTypes();
		highlightModelTypes();
		highlightModels();
	});
</script>

<div class="title">
	<label class="" title="Toggle operand data types">
		<input type="checkbox" on:change={() => toggleDataTypes()} />
		Data Type
	</label>
</div>
<div class="types">
	<label class="extra {dataTypes.fp32.toString()} fp32" title="FP32">
		<input type="checkbox" on:change={() => toggleDataType('fp32')} />
		FP32
	</label>
	<!-- <label class="extra {dataTypes.int64.toString()} int64" title="INT64">
		<input type="checkbox" on:change={() => toggleDataType('int64')} />
		INT64
	</label> -->
	<label class="extra {dataTypes.fp16.toString()} fp16" title="FP16">
		<input type="checkbox" on:change={() => toggleDataType('fp16')} />
		FP16
	</label>
	<label class="extra {dataTypes.int8.toString()} int8" title="INT8">
		<input type="checkbox" on:change={() => toggleDataType('int8')} />
		INT8
	</label>
	<label class="extra {dataTypes.int4.toString()} int4" title="INT4">
		<input type="checkbox" on:change={() => toggleDataType('int4')} />
		INT4
	</label>
</div>

<div class="title">
	<label class="" title="Toggle model types">
		<input type="checkbox" on:change={() => toggleModelTypes()} />
		Model Type
	</label>
</div>
<div class="types">
	<div>
		<label class="onnx extra {modelTypes.onnx.toString()}" title="ONNX">
			<input type="checkbox" on:change={() => toggleModelType('onnx')} />
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 44" id="logo_onnx"
				><g transform="matrix(1.7 0 0 1.7 -44 -42)"
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
				><g transform="matrix(1.8 0 0 1.8 -54 -34)"
					><path
						class="logo_onnx_1"
						d="M94.93 23.994c-.18-.05-.367-.06-.55-.03-.43.078-.55.212-.55.642V37.46l-.15-.215L86.05 25.86a13.05 13.05 0 0 0-1.013-1.438c-.19-.254-.475-.423-.8-.468-.383-.033-.818.08-.817.514l.005 15.126a.46.46 0 0 0 .079.296c.17.226.645.32 1.01.2.308-.1.393-.236.393-.63V26.608l.123.176 8.076 11.956a6.85 6.85 0 0 0 .82 1.101c.252.275.644.372.995.247.244-.04.41-.267.378-.512V24.5c.036-.246-.137-.473-.383-.504zm-16.488.002a1.28 1.28 0 0 0-.574-.029c-.41.082-.528.215-.528.634v12.863l-.155-.222-7.964-11.89a7.42 7.42 0 0 0-.679-.937c-.19-.233-.452-.394-.746-.458-.56-.098-.85.132-.85.688v14.9a.5.5 0 0 0 .082.342c.18.22.653.312 1.016.2.303-.102.376-.226.376-.638V26.933a.52.52 0 0 1 .02-.259c.08.028.1.104.14.16l8.404 12.435c.152.238.334.454.542.645a.91.91 0 0 0 .926.171c.23-.052.384-.265.362-.5l-.003-15.104c.036-.238-.132-.458-.37-.486zm-15.918 7.992l-.004-3.647c-.035-1.85-.997-3.228-2.74-3.87-1.87-.688-3.8-.702-5.698-.213-2.264.58-3.368 2.07-3.368 4.403v7.103c0 1.93.984 3.383 2.803 4.02 1.875.66 3.792.658 5.7.155 1.933-.51 3.272-1.842 3.305-4.16l.003-3.792zm-1.473.135v3.383c0 1.975-.88 3.107-2.802 3.527-1.26.296-2.58.245-3.814-.147-1.434-.47-2.226-1.55-2.234-3.06v-7.42c.008-1.567.876-2.702 2.4-3.115 1.416-.414 2.926-.38 4.322.096 1.377.48 2.13 1.58 2.137 3.04l.001 3.698zm49.212 7.033l-4.828-6.93c-.1-.104-.103-.268-.006-.374l4.72-6.83a3.23 3.23 0 0 0 .256-.407c.124-.207.035-.477-.19-.57a.92.92 0 0 0-1.18.205 5.9 5.9 0 0 0-.407.539l-4.206 6.158-.103-.135L101 25.92l-1.097-1.588c-.215-.34-.632-.49-1.015-.37-.505.127-.617.417-.32.85l4.85 7.06a.24.24 0 0 1-.005.331l-4.875 7.043c-.264.384-.182.646.245.832.465.202.8.08 1.14-.42l4.485-6.556.08.09 4.404 6.4c.095.15.21.286.34.406.332.24.787.21 1.088-.066.236-.215.225-.37-.06-.78z"
						fill="#343433"
					/></g
				></svg
			>
		</label>
		<label class="tflite extra {modelTypes.tflite.toString()}" title="LiteRT">
			<input type="checkbox" on:change={() => toggleModelType('tflite')} />
			<img src="../img/litert.png" alt="LiteRT" id="logo_tflite" />
		</label>
		<label class="npy extra {modelTypes.npy.toString()}" title="NumPy">
			<input type="checkbox" on:change={() => toggleModelType('npy')} />

			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450" id="logo_npy"
				><g id="Layer_1" data-name="Layer 1"
					><polygon
						class="npy-1"
						points="220.93 127.14 151.77 92.23 75.87 130.11 146.9 165.78 220.93 127.14"
					/><polygon
						class="npy-1"
						points="252.63 143.14 325.14 179.74 249.91 217.52 178.77 181.79 252.63 143.14"
					/><polygon
						class="npy-1"
						points="349.47 92.76 423.96 130.11 357.34 163.57 284.68 126.92 349.47 92.76"
					/><polygon
						class="npy-1"
						points="317.41 76.67 250.35 43.05 184.01 76.15 253.11 111 317.41 76.67"
					/><polygon
						class="npy-1"
						points="264.98 365.44 264.98 456.95 346.22 416.41 346.13 324.86 264.98 365.44"
					/><polygon
						class="npy-1"
						points="346.1 292.91 346.01 202.32 264.98 242.6 264.98 333.22 346.1 292.91"
					/><polygon
						class="npy-1"
						points="443.63 275.93 443.63 367.8 374.34 402.38 374.29 310.93 443.63 275.93"
					/><polygon
						class="npy-1"
						points="443.63 243.81 443.63 153.79 374.21 188.3 374.27 279.07 443.63 243.81"
					/><path
						class="npy-2"
						d="M236.3,242.6l-54.72-27.51V334s-66.92-142.39-73.12-155.18c-.8-1.65-4.09-3.46-4.93-3.9-12-6.3-47.16-24.11-47.16-24.11V360.89l48.64,26V277.08s66.21,127.23,66.88,128.62,7.32,14.8,14.42,19.51c9.46,6.26,50,30.64,50,30.64Z"
					/></g
				></svg
			>
			<span>NumPy</span>
		</label>
		<label class="pt extra {modelTypes.pt.toString()}" title="pt">
			<input type="checkbox" on:change={() => toggleModelType('pt')} />

			<svg xmlns="http://www.w3.org/2000/svg" id="logo_pt"
				><g transform="matrix(0.45 0 0 0.45 -8 0)" fill="#ee4c2c"
					><path
						d="M40.8 9.3l-2.1 2.1c3.5 3.5 3.5 9.2 0 12.7s-9.2 3.5-12.7 0-3.5-9.2 0-12.7l5.6-5.6.7-.8V.8l-8.5 8.5a11.89 11.89 0 0 0 0 16.9 11.89 11.89 0 0 0 16.9 0c4.8-4.7 4.8-12.3.1-16.9z"
					/><circle cx="36.6" cy="7.1" r="1.6" /></g
				><g transform="matrix(0.58 0 0 0.58 -8 -11)"
					><path
						d="M48.008 32.028h-2v5.144h-1.493V22.57h3.65c3.872 0 5.697 1.88 5.697 4.6 0 3.208-2.268 4.812-5.863 4.867zm.1-8.075H45.96v6.693l2.102-.055c2.766-.055 4.26-1.162 4.26-3.43 0-2.046-1.438-3.208-4.204-3.208zM60.62 37.116l-.885 2.323c-.996 2.6-2 3.374-3.485 3.374-.83 0-1.438-.22-2.102-.498l.442-1.327c.498.277 1.05.442 1.66.442.83 0 1.438-.442 2.212-2.5l.72-1.88-4.148-10.564h1.55l3.374 8.85 3.32-8.85h1.493zm9.125-13.108v13.22h-1.493v-13.22h-5.144V22.57h11.78v1.383h-5.144zm9.347 13.495c-2.987 0-5.2-2.212-5.2-5.642s2.268-5.697 5.3-5.697c2.987 0 5.144 2.212 5.144 5.642s-2.268 5.697-5.255 5.697zm.055-10c-2.268 0-3.76 1.825-3.76 4.314 0 2.6 1.55 4.37 3.816 4.37s3.76-1.825 3.76-4.314c0-2.6-1.55-4.37-3.816-4.37zm8.906 9.724h-1.438v-10.73l1.438-.277v2.268c.72-1.383 1.77-2.268 3.153-2.268a3.92 3.92 0 0 1 1.88.498L92.7 28.1c-.442-.277-1.05-.442-1.66-.442-1.106 0-2.157.83-3.042 2.766v6.803zm10.73.276c-3.208 0-5.255-2.323-5.255-5.642 0-3.374 2.212-5.697 5.255-5.697 1.327 0 2.434.332 3.374.94l-.387 1.327c-.83-.553-1.825-.885-2.987-.885-2.323 0-3.76 1.715-3.76 4.26 0 2.6 1.55 4.314 3.816 4.314a5.57 5.57 0 0 0 2.987-.885l.277 1.327c-.94.608-2.102.94-3.32.94zm12.334-.276v-6.914c0-1.88-.774-2.7-2.268-2.7-1.217 0-2.434.608-3.32 1.55v8.13h-1.438v-15.82l1.438-.277v6.748c1.106-1.106 2.544-1.715 3.706-1.715 2.102 0 3.374 1.327 3.374 3.65v7.356z"
						fill="#252525"
					/></g
				></svg
			>
		</label>
	</div>
</div>

<div class="title">
	<label class="" title="Toggle model categories">
		<input type="checkbox" on:change={() => toggleCategories()} />
		Category
	</label>
</div>
<div class="types">
	<label class="extra {categories.operators.toString()}" title="Operators">
		<input type="checkbox" on:change={() => toggleCategory('operators')} />
		Operators
	</label>
	<label class="extra {categories.top2025.toString()} " title="Top 2025 Models">
		<input type="checkbox" on:change={() => toggleCategory('top2025')} />
		Top 2025
	</label>
	<label class="extra {categories.tfbench.toString()} " title="Transformers.js Benchmark Models">
		<input type="checkbox" on:change={() => toggleCategory('tfbench')} />
		Transformers.js Benchmark
	</label>
	<label class="extra {categories.devpreview.toString()}" title="WebNN Developer Preview Models">
		<input type="checkbox" on:change={() => toggleCategory('devpreview')} />
		WebNN Dev Preview
	</label>
	<label class="extra {categories.other.toString()}" title="Other Models">
		<input type="checkbox" on:change={() => toggleCategory('other')} />
		Others
	</label>
</div>


<div class="title">
	<label class="" title="Toggle models">
		<input type="checkbox" on:change={() => toggleModels()} />
		Model
	</label>
</div>
<div class="models" role="button" tabindex="0" id="models" on:mouseleave={() => hideModelInfo()}>
	{#if filteredModelIds.length > 0}
		{#each filteredModelIds as { id, name, selected }, i}
			<label
				class="extra {id} {selected} {getModelDataTypeById(id)}"
				title="{id.replaceAll('_', '-')} · {name}"
				on:focus={() => {}}
				on:mouseover={() => showModelInfo(id)}
			>
				<input type="checkbox" on:change={() => toggleModel(id)} />

				{#if getModelNoteById(id)}
					<Info />
					{#if id.indexOf('_merged') > -1}
						<span class="kvcache">KV-C</span>
					{/if}
					{#if id.indexOf('_with_past') > -1}
						<span class="kvcache">PAST</span>
					{/if}
					{#if id.indexOf('_encoder') > -1}
						<span class="kvcache">E</span>
					{/if}
					{#if id.indexOf('_decoder') > -1}
						<span class="kvcache">D</span>
					{/if}
					{name.replaceAll(' Encoder', '').replaceAll(' Decoder', '').replaceAll('TFBench_Pipeline', 'TF').replaceAll('TFBench_Model', 'TF')}
					{:else}
					{#if id.indexOf('_merged') > -1}
						<span class="kvcache">KV-C</span>
					{/if}
					{#if id.indexOf('_with_past') > -1}
						<span class="kvcache">PAST</span>
					{/if}
					{#if id.indexOf('_encoder') > -1}
						<span class="kvcache">E</span>
					{/if}
					{#if id.indexOf('_decoder') > -1}
						<span class="kvcache">D</span>
					{/if}
					{name.replaceAll(' Encoder', '').replaceAll(' Decoder', '').replaceAll('TFBench_Pipeline', 'TF').replaceAll('TFBench_Model', 'TF')}{/if}
			</label>
		{/each}
	{:else}
		Choose model type and operand data type at first
	{/if}

	<div id="modeldesc" class="{show} {mDataType}">
		<span class="modeldes">{mCategory}</span>
		<span class="modeldes">{mId}</span>
		<span class="modeldes">{mName}</span>
		<span class="modeldes">{mModelType}</span>
		<span class="modeldes">{mDataType}</span>
		{#if mInputs}
			<span class="modeldes">{mInputs}</span>
		{/if}
		<span class="modeldes">{mSize}</span>
		<div class="des">{mDesc}</div>
		{#if mNote}
			<div class="note">
				<svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="14"
					><path
						d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
					/></svg
				>{mNote}
			</div>
		{/if}
	</div>
	<!-- <div id="fallback" class="{show} g3">
		<div class="cpu">
			{#if fallbackId}
				{#each fallbackId as i}
					{#if i.backend === 'cpu'}
						<div class="tit s">
							WebNN CPU / {fallbackEnv.version} / {fallbackEnv.last_update}
						</div>
						<div class="dg3 s">
							<div>
								<div><Check /></div>
								<div>
									{#if i.supported}
										{i.supported.toString().replaceAll(',', ', ')}
									{/if}
								</div>
							</div>
							<div>
								<div><MoreTime /></div>
								<div>
									{#if i.not_supported}{i.not_supported.toString().replaceAll(',', ', ')}{/if}
								</div>
							</div>
							<div>
								<div><MoreTime /></div>
								<div>
									{#if i.input_type_not_supported?.length > 0}{i.input_type_not_supported
											.toString()
											.replaceAll(',', ', ')}{/if}
								</div>
							</div>
						</div>
						<div class="dg3">
							<div title="Number of partitions supported by WebNN">
								<div class="number">
									{#if i.partitions_supported_by_webnn}{i.partitions_supported_by_webnn}{/if}
								</div>
								<div class="s">Partitions</div>
							</div>
							<div title="Number of nodes in the graph">
								<div class="number">
									{#if i.nodes_in_the_graph}{i.nodes_in_the_graph}{/if}
								</div>
								<div class="s">Graph Nodes</div>
							</div>
							<div title="Number of nodes supported by WebNN">
								<div class="number">
									{#if i.nodes_supported_by_webnn}{i.nodes_supported_by_webnn}{/if}
								</div>
								<div class="s">WebNN Nodes</div>
							</div>
						</div>
						<div class="s err">
							{#if i.error}{i.error}<br /><br />We are working on it.{/if}
						</div>
					{/if}
				{/each}
			{/if}
		</div>

		<div class="gpu">
			{#if fallbackId}
				{#each fallbackId as i}
					{#if i.backend === 'gpu'}
						<div class="tit s">
							WebNN GPU / {fallbackEnv.version} / Update: {fallbackEnv.last_update}
						</div>
						<div class="dg3 s">
							<div>
								<div><Check /></div>
								<div>
									{#if i.supported}
										{i.supported.toString().replaceAll(',', ', ')}
									{/if}
								</div>
							</div>
							<div>
								<div><MoreTime /></div>
								<div>
									{#if i.not_supported}{i.not_supported.toString().replaceAll(',', ', ')}{/if}
								</div>
							</div>
							<div>
								<div><MoreTime /></div>
								<div>
									{#if i.input_type_not_supported?.length > 0}{i.input_type_not_supported
											.toString()
											.replaceAll(',', ', ')}{/if}
								</div>
							</div>
						</div>
						<div class="dg3">
							<div title="Number of partitions supported by WebNN">
								<div class="number">
									{#if i.partitions_supported_by_webnn}{i.partitions_supported_by_webnn}{/if}
								</div>
								<div class="s">Partitions</div>
							</div>
							<div title="Number of nodes in the graph">
								<div class="number">
									{#if i.nodes_in_the_graph}{i.nodes_in_the_graph}{/if}
								</div>
								<div class="s">Graph Nodes</div>
							</div>
							<div title="Number of nodes supported by WebNN">
								<div class="number">
									{#if i.nodes_supported_by_webnn}{i.nodes_supported_by_webnn}{/if}
								</div>
								<div class="s">WebNN Nodes</div>
							</div>
						</div>
						<div class="s err">
							{#if i.error}{i.error}<br /><br />We are working on it.{/if}
						</div>
					{/if}
				{/each}
			{/if}
		</div>

		<div class="npu">
			{#if fallbackId}
				{#each fallbackId as i}
					{#if i.backend === 'npu'}
						<div class="tit s">
							WebNN NPU / {fallbackEnv.version} / Update: {fallbackEnv.last_update}
						</div>
						<div class="dg3 s">
							<div>
								<div><Check /></div>
								<div>
									{#if i.supported}
										{i.supported.toString().replaceAll(',', ', ')}
									{/if}
								</div>
							</div>
							<div>
								<div><MoreTime /></div>
								<div>
									{#if i.not_supported}{i.not_supported.toString().replaceAll(',', ', ')}{/if}
								</div>
							</div>
							<div>
								<div><MoreTime /></div>
								<div>
									{#if i.input_type_not_supported?.length > 0}{i.input_type_not_supported
											.toString()
											.replaceAll(',', ', ')}{/if}
								</div>
							</div>
						</div>
						<div class="dg3">
							<div title="Number of partitions supported by WebNN">
								<div class="number">
									{#if i.partitions_supported_by_webnn}{i.partitions_supported_by_webnn}{/if}
								</div>
								<div class="s">Partitions</div>
							</div>
							<div title="Number of nodes in the graph">
								<div class="number">
									{#if i.nodes_in_the_graph}{i.nodes_in_the_graph}{/if}
								</div>
								<div class="s">Graph Nodes</div>
							</div>
							<div title="Number of nodes supported by WebNN">
								<div class="number">
									{#if i.nodes_supported_by_webnn}{i.nodes_supported_by_webnn}{/if}
								</div>
								<div class="s">WebNN Nodes</div>
							</div>
						</div>
						<div class="s err">
							{#if i.error}{i.error}<br /><br />We are working on it.{/if}
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	</div> -->
</div>

<style>
	#modeldesc.false {
		display: none !important;
	}
	#modeldesc.true {
		display: block;
		padding: 10px;
	}

	/* #fallback.true {
		display: grid !important;
	}
		
	#fallback.false {
		display: none !important;
	}

	#fallback.g3 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		align-items: stretch;
		color: var(--white);
		justify-content: space-between;
		align-content: space-between;
		justify-items: stretch;
		padding: 0;
	}

	#fallback .dg3 {
		align-items: end !important;
	} */

	.tit {
		text-align: center;
	}

	.s {
		font-size: 0.6rem;
	}

	/* #fallback .cpu > div,
	#fallback .gpu > div,
	#fallback .npu > div {
		padding: 10px;
	}

	#fallback .dg3 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		color: var(--white);
		padding: 0;
		align-items: center;
		text-align: center;
		border-top: 1px solid var(--white-02);
	} */

	.err {
		border-top: 1px solid var(--white-02);
	}

	.dg3 > div {
		border-right: 1px solid var(--white-02);
		width: 100%;
		height: 100%;
	}

	.dg3 > div:last-child {
		border-right: none;
	}

	.number {
		font-size: 1.2em;
	}

	.kvcache {
		display: inline-block;
		margin-bottom: 2.5px;
		font-size: 0.6rem;
		padding: 0px 2px;
		border: 1px solid var(--grey-02);
	}

	/* #fallback .cpu {
		background-image: linear-gradient(to right, var(--b1-09) 0%, var(--b1) 100%);
	}
	#fallback .gpu {
		background-image: linear-gradient(to right, var(--p2-09) 0%, var(--p2) 100%);
	}
	#fallback .npu {
		background-image: linear-gradient(to right, var(--purple-09) 0%, var(--purple) 100%);
	}

	@media (max-width: 1024px) {
		#fallback.g3 {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;
		}
	}

	@media (max-width: 512px) {
		#fallback.g3 {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr 1fr;
		}
	} */
</style>
