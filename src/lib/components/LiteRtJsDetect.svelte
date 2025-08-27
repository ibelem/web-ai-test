<script>
    import { onMount } from 'svelte';
    import { liteRtJsVersionStore } from '$lib/store/store';
    import Modal from './Modal.svelte';
    import AutoComplete from 'simple-svelte-autocomplete';

    let liteRtDev = '';
    /**
     * @type {number }
     */
    let selected = 1; // Always dev version
    let showLiteRtDevModal = false;
    let devList = [];
    let selectedDev = '';

    /**
     * @type {{ selected?: any; stable?: any; dev?: any; }}
     */
    export let liteRtJsVersion;

    liteRtJsVersionStore.subscribe((value) => {
        liteRtJsVersion = value;
    });

    let onChange = (/** @type {{ currentTarget: { value: number; }; }} */ event) => {
        selected = event.currentTarget.value;
        selected = Number(selected);
        let liteRt = liteRtJsVersion;
        liteRt.selected = selected;
        liteRtJsVersionStore.update(() => liteRt);
    };

    const getVersion = async () => {
        try {
            const response = await fetch('https://data.jsdelivr.com/v1/packages/npm/@litertjs/core');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Use the latest version as dev version
            if (liteRtJsVersion.dev) {
                liteRtDev = liteRtJsVersion.dev;
            } else {
                liteRtDev = data.tags.latest;
            }

            // Populate dev list with all versions (treat all as dev versions)
            devList = [];
            data.versions.forEach(v => {
                devList.push(v.version);
            });

            // Sort versions in descending order (latest first)
            devList.sort((a, b) => {
                const aVersion = a.split('.').map(Number);
                const bVersion = b.split('.').map(Number);
                for (let i = 0; i < Math.max(aVersion.length, bVersion.length); i++) {
                    const aPart = aVersion[i] || 0;
                    const bPart = bVersion[i] || 0;
                    if (aPart !== bPart) {
                        return bPart - aPart;
                    }
                }
                return 0;
            });

            selected = Number(selected);
            let liteRt = {
                selected: selected,
                stable: "",
                dev: liteRtDev
            };
            liteRtJsVersionStore.update(() => liteRt);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const updateDev = () => {
        let liteRt = liteRtJsVersion;
        if(selectedDev) {
            liteRt.dev = selectedDev;
            liteRtJsVersionStore.update(() => liteRt);
        }
    }

    onMount(async () => {
        // Always use dev version (selected = 1)
        if (liteRtJsVersion) {
            selected = liteRtJsVersion.selected || 1;
            liteRtDev = liteRtJsVersion.dev;
        }
        await getVersion();
    });
</script>

<div class="environment framework">
    <Modal bind:showLiteRtDevModal>
        <h2 slot="header" class="updatecpu">LiteRT.js</h2>	
        <div class="info">
            Select the version of LiteRT.js to be tested.
        </div>
        <AutoComplete items={devList} bind:selectedItem={selectedDev} onChange={updateDev} />
    </Modal>

    <div class="litert">
        {#if liteRtJsVersion}
            <div class="version">
                <img src="../img/litert.png" alt="LiteRT" id="logo_litert" class="">
                LiteRT.js

                {#if selected === 1}
                    <label class="dev true" title="Select LiteRT.js dev version">
                        <input
                            checked={selected === 1}
                            on:change={onChange}
                            type="radio"
                            name="litert_version"
                            value="1"
                        />
                        Public Dev
                    </label>
                {:else}
                    <label class="stable" title="Select LiteRT.js stable version">
                        <input
                            checked={selected === 0}
                            on:change={onChange}
                            type="radio"
                            name="litert_version"
                            value="0"
                        />
                        Public Stable
                    </label>
                {/if}
            </div>

            <div class="tflite">
                <span class="title">Wasm · WebGPU</span>
                <span class="version">
                    <a href="https://www.npmjs.com/package/@litertjs/core/v/{liteRtJsVersion.dev}">
                        {liteRtJsVersion.dev}
                    </a>
                </span>
                <span class="version selector">
                    <!-- onclick={() => (showLiteRtDevModal = true)} -->
                    <button aria-label="Select LiteRT.js version">
                        <svg height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                    </button>
                </span>
            </div>
        {/if}
    </div>
</div>

<style>
    .version {
        border: 1px solid var(--grey-02);
        display: inline-flex;
        column-gap: 10px;
    }

    .version:hover {
        border: 1px solid var(--googlegreen);
    }

    img {
      max-width: 56px;
      max-height: 15px;
      margin-left: 10px;
      margin-top: 2px;
    }

    .dev {
        padding: 0 10px;
        cursor: pointer;
        margin: 0;
    }

    .version label {
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .version label.true {
        background-color: var(--googlegreen);
        color: #fff;
    }

    .version label:hover {
        background-color: var(--googlegreen-01);
    }

    .version label.true:hover {
        background-color: var(--googlegreen-01);
        color: var(--font);
    }

    .version input {
        display: none;
    }

    .litert {
        display: inline-flex;
        align-items: center;
        column-gap: 10px;
    }

    .litert .version:hover a {
        color: var(--white);
    }

    .framework {
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .litert .tflite {
        display: inline-flex;
        margin-left: 0px;
        flex-direction: row;
    }

    .litert .tflite .title {
        border: 1px solid var(--googlegreen);
        background-color: var(--googlegreen);
        color: #fff;
        margin: 0;
        padding: 0 10px;
    }

    .litert .tflite .version {
        border: 1px solid var(--googlegreen);
        background-color: transparent;
        margin: 0 8px 0 0;
        padding: 0 10px;
    }

    .litert .tflite .version:hover,
    .litert .tflite .version:hover a {
        color: var(--white);
        background-color: var(--googlegreen);
    }

    .version.selector {
        padding: 0;
        border: 1px solid var(--googlegreen);
    }

    .version.selector button {
        background: transparent;
        border: none;
        padding: 8px 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .version.selector:hover {
        background-color: var(--googlegreen);
    }

    .version.selector:hover button svg {
        fill: var(--white);
    }

    .version.selector button svg {
        fill: var(--googlegreen);
    }
</style>