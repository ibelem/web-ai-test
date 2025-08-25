import { models } from '$lib/config';

export const prerender = true;

export function entries() {
    // Return an array of all model IDs you want to prerender
    return models.map(model => `/run/${model.id}`);
}