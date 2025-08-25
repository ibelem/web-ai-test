import { models } from '$lib/config';

export const prerender = true;

export function entries() {
    // Add more thorough filtering and logging
    console.log('Total models found:', models.length);
    
    const validModels = models.filter(model => {
        if (!model) {
            console.warn('Found null/undefined model');
            return false;
        }
        if (!model.id || typeof model.id !== 'string' || model.id.trim() === '') {
            console.warn('Found model with invalid id:', model);
            return false;
        }
        return true;
    });
    
    console.log('Valid models after filtering:', validModels.length);
    
    const entries = validModels.map(model => ({ id: model.id }));
    console.log('Sample entries:', entries.slice(0, 5));
    
    return entries;
}

export function load({ params }) {
    return {
        modelId: params.id
    };
}