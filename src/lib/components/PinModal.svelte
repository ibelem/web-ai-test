<script>
	import Modal from './Modal.svelte';
	import { canRunTests, verifyPin, isLockedOut, getLockoutRemainingTime, getRemainingAttempts, getGpuVendor } from '$lib/assets/js/pin_verify.js';

	let { showPinModal = $bindable(false), onVerified = () => {} } = $props();

	let pinInput = $state('');
	let errorMessage = $state('');
	let lockedOut = $state(false);
	let lockoutTime = $state('');
	let remainingAttempts = $state(3);
	let verifying = $state(false);
	let gpuVendor = $state('');

	$effect(() => {
		if (showPinModal) {
			lockedOut = isLockedOut();
			lockoutTime = getLockoutRemainingTime();
			remainingAttempts = getRemainingAttempts();
			gpuVendor = getGpuVendor();
			pinInput = '';
			errorMessage = '';
		}
	});

	const handleVerify = async () => {
		if (!pinInput.trim()) {
			errorMessage = 'Please enter a pin code.';
			return;
		}

		verifying = true;
		errorMessage = '';

		const isValid = await verifyPin(pinInput.trim());

		if (isValid) {
			showPinModal = false;
			onVerified();
		} else {
			lockedOut = isLockedOut();
			lockoutTime = getLockoutRemainingTime();
			remainingAttempts = getRemainingAttempts();

			if (lockedOut) {
				errorMessage = `Too many failed attempts. Please try again in ${lockoutTime}.`;
			} else {
				errorMessage = `Invalid pin code. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`;
			}
		}

		verifying = false;
	};

	const handleKeydown = (e) => {
		if (e.key === 'Enter') {
			handleVerify();
		}
	};
</script>

<Modal bind:showModal={showPinModal}>
	{#snippet header()}
		<h2 class="pin-title">Verification Required</h2>
	{/snippet}

	<div class="pin-content">
		{#if lockedOut}
			<div class="pin-locked">
				<svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36"><path fill="#c62828" d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/></svg>
				<p>Too many failed attempts.</p>
				<p>Please try again in <strong>{lockoutTime}</strong>.</p>
			</div>
		{:else}
			<p class="pin-desc">
				A <strong>{gpuVendor.toUpperCase()}</strong> GPU is detected. Non-Intel devices require a pin code to run tests.
			</p>
			<div class="pin-notes">
				<p><strong>Notes:</strong></p>
				<ul>
					<li>@google.com users: type your username only (e.g. <em>kainino</em>)</li>
					<li>@microsoft.com users: type your username only (e.g. <em>guschmue</em>)</li>
					<li>Or use a general access code</li>
					<li>You can also add <code>?pin=yourcode</code> to the URL</li>
				</ul>
			</div>
			<div class="pin-input-group">
				<input
					type="text"
					bind:value={pinInput}
					onkeydown={handleKeydown}
					placeholder="Enter pin code"
					disabled={verifying}
					class="pin-input"
				/>
				<button
					onclick={handleVerify}
					disabled={verifying || !pinInput.trim()}
					class="pin-verify-btn"
				>
					{verifying ? 'Verifying...' : 'Verify'}
				</button>
			</div>
			{#if errorMessage}
				<p class="pin-error">{errorMessage}</p>
			{/if}
		{/if}
	</div>
</Modal>

<style>
	.pin-content {
		font-size: 13px;
		line-height: 1.5;
	}

	:global(.pin-title) {
		font-size: 16px;
		margin: 0 0 8px 0;
		color: #333;
	}

	.pin-desc {
		margin: 0 0 8px 0;
	}

	.pin-notes {
		background: #f5f5f5;
		border-radius: 4px;
		padding: 6px 8px;
		margin-bottom: 12px;
		font-size: 12px;
	}

	.pin-notes p {
		margin: 0 0 4px 0;
	}

	.pin-notes ul {
		margin: 0;
		padding-left: 16px;
	}

	.pin-notes li {
		margin-bottom: 2px;
	}

	.pin-notes code {
		background: #e0e0e0;
		padding: 1px 4px;
		border-radius: 2px;
		font-size: 11px;
	}

	.pin-notes em {
		color: #1565c0;
	}

	.pin-input-group {
		display: flex;
		gap: 8px;
		margin-bottom: 8px;
	}

	.pin-input {
		flex: 1;
		padding: 6px 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
		outline: none;
	}

	.pin-input:focus {
		border-color: var(--b1, #1976d2);
	}

	.pin-verify-btn {
		padding: 6px 16px;
		background-color: var(--b1, #1976d2);
		border: 1px solid var(--b1, #1976d2);
		color: white;
		border-radius: 4px;
		cursor: pointer;
		font-size: 13px;
		white-space: nowrap;
	}

	.pin-verify-btn:hover:not(:disabled) {
		background-color: var(--purple, #7b1fa2);
		border-color: var(--purple, #7b1fa2);
	}

	.pin-verify-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.pin-error {
		color: #c62828;
		font-size: 12px;
		margin: 4px 0 0 0;
	}

	.pin-locked {
		text-align: center;
		padding: 20px 0;
	}

	.pin-locked p {
		margin: 8px 0;
		color: #555;
	}
</style>
