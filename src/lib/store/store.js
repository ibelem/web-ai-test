import { persisted } from 'svelte-local-storage-store'

export const numberOfRunsStore = persisted('numberOfRunsStore', 1);
export const backendsStore = persisted('backendsStore', []);
export const dataTypesStore = persisted('dataTypesStore', []);
export const modelTypesStore = persisted('modelTypesStore', []);
export const modelsStore = persisted('modelsStore', []);
export const autoStore = persisted('autoStore', false);
export const testQueueStore = persisted('testQueueStore', []);
export const testQueueLengthStore = persisted('testQueueLengthStore', 0);
export const resultsStore = persisted('resultsStore', []);
export const infoStore = persisted('infoStore', []);
export const modelDownloadProgressStore = persisted('modelDownloadProgressStore', []);
export const modelDownloadUrlStore = persisted('modelDownloadUrlStore', 1);
export const refererStore = persisted('refererStore', '');
export const cpuStore = persisted('cpuStore', '');
export const fallbackQueueStore = persisted('fallbackQueueStore', []);
export const fallbackLogStore = persisted('fallbackLogStore', []);
export const fallbackStore = persisted('fallbackStore', []);
export const conformanceQueueStore = persisted('conformanceQueueStore', []);
export const conformanceLogStore = persisted('conformanceLogStore', []);
export const conformanceStore = persisted('conformanceStore', []);
export const sleepStore = persisted('sleepStore', false);
export const ortWebVersionStore = persisted('ortWebVersionStore', { selected: 2, dev: '', stable: '' });
export const customStore = persisted('customStore', { id: '', filename: '', size: '', time: '', node_attributes_value_fp16: false, properties: [], metadata: [], nodes: [], inputs: [], outputs: [], overrides: []});
