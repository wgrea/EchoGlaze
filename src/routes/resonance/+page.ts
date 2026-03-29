// src/routes/resonance/+page.ts
import type { PageLoad } from './$types';
import { resonanceLoader } from '$lib/loaders/resonanceLoader';
import { resonanceTransformer } from '$lib/transformers/resonanceTransformer';

export const load: PageLoad = async () => {
    const rawData = await resonanceLoader();
    const transformedData = resonanceTransformer(rawData);
    
    return {
        data: transformedData
    };
};