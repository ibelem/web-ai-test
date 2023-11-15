<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<slot />
		<div class="update">
			<button on:click={() => dialog.close()}>Close</button>
		</div>
	</div>
</dialog>

<style>
	dialog {
		width: 320px;
		height: 360px;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
		display: block;
	}
	.update {
		margin: 20px auto;
		text-align: center;
		display: block;
	}

	.update button {
		text-align: center;
		margin: 10px auto;
		padding: 4px 16px;
		background-color: var(--b1);
		border: 1px solid var(--b1);
		color: white;
		display: inline-block;
		margin: 10px;
		cursor: pointer;
		box-shadow:
			var(--b1) 0px 10px 20px -12px,
			var(--b1) 0px 18px 16px -18px;
	}

	.update button:hover {
		background-color: var(--purple);
		border: 1px solid var(--purple);
		box-shadow:
			var(--purple) 0px 6px 12px -8px,
			var(--purple) 0px 12px 10px -12px;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
