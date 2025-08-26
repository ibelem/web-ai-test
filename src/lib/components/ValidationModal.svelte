<!-- lib/components/ValidationModal.svelte -->
<script>
  import { tracking } from '$lib/config/index.js';
  export let onValidate;
  export let onCancel;

  let ia = '';
  let errorMessage = '';

  function handleSubmit() {
    const reversedTracking = tracking.map(item => item.split('').reverse().join(''));
    if (reversedTracking.includes(ia)) {
      onValidate();
    } else {
      errorMessage = 'Incorrect PIN code, try again.';
    }
  }
</script>

<div class="modal">
  <div class="modal-content">
    <h2 class="title">Enter PIN code</h2>
    <input 
      type="password" 
      bind:value={ia} 
      placeholder="Your PIN code"
    />
    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
    <div class="actions">
      <button on:click={handleSubmit}>Submit</button>
      <button on:click={onCancel}>Cancel</button>
    </div>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 300px;
    text-align: center;
  }

  .error {
    color: var(--red);
    margin: 0;
  }

  input {
    border: 1px solid var(--grey-02);
    outline: none;
    padding: 0.5rem;
    font-size: 1.1rem;
    margin: 1rem 0;
    color: var(--b1);
  }

  input::placeholder {
    font-size: 1rem;
  }

  input:hover {
    border: 1px solid var(--b1);
    color: var(--b1);
  }

  .actions {
    display: flex;
    justify-content: center;
  }

  .actions button {
    text-align: center;
    margin: 10px auto;
    padding: 4px 16px;
    background-color: var(--b1);
    border: 1px solid var(--b1);
    color: white;
    display: inline-block;
    margin: 10px;
    cursor: pointer;
    box-shadow: var(--b1) 0px 10px 20px -12px, var(--b1) 0px 18px 16px -18px;
  }

  .actions button:hover {
    background-color: var(--purple);
    border: 1px solid var(--purple);
    box-shadow: var(--purple) 0px 6px 12px -8px, var(--purple) 0px 12px 10px -12px;
  }

  h2.title {
    margin-top: 0;
    color: var(--b1);
    display: inline-block;
    background-color: var(--b1-005);
    font-size: 1.2em;
    padding: 6px 20px;
    border-radius: 9999px;
    text-transform: uppercase;
  }
</style>