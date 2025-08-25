import { models } from '$lib/config';

export const prerender = true;

export function entries() {
    // Only include models with a valid id
    return models
        .filter(model => model.id && typeof model.id === 'string' && model.id.length > 0)
        .map(model => `/run/${model.id}`);
}