import { persisted } from 'svelte-local-storage-store'

export const numberofrunsStore = persisted('numberofrunsStore', 1);
export const backendsStore = persisted('backendsStore', []);
export const dataTypesStore = persisted('dataTypesStore', []);
export const modelTypesStore = persisted('modelTypesStore', []);
export const modelsStore = persisted('modelsStore', []);
export const autoStore = persisted('autoStore', false);
export const testQueueStore = persisted('testQueueStore', []);
export const resultStore = persisted('resultQueueStore', []);