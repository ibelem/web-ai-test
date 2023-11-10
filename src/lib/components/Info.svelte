<script>
	import { infoStore } from '$lib/store/store';
	/**
	 * @type {string[]}
	 */
	let info;
	infoStore.subscribe((value) => {
		info = value;
	});
</script>

{#if info.length > 0}
	<div class="info">
		{info.slice(-1)}
	</div>
{/if}

<style>
	/* .info {
		height: 18px;
		position: fixed;
		bottom: 0px;
		left: 0px;
		background-color: #dee1e6;
		color: #3c4043;
		font-size: 11px;
		padding: 5px 10px 0px 10px;
		border-top-right-radius: 5px;
		font-family: Arial, sans-serif;
	} */
	.info {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 10px;
		color: var(--red);
	}
</style>
