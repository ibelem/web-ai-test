<script>
	import { resultsStore } from '../../lib/store/store';
	/**
	 * @type {string[]}
	 */
	let results;
	resultsStore.subscribe((value) => {
		results = value;
	});
</script>

<div>{JSON.stringify(results)}</div>
