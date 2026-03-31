// src/routes/packing/+page.ts
import type { PageLoad } from './$types';
import type { Country } from '$lib/schema/types';

export const load: PageLoad = async ({ parent }) => {
    const data = await parent();
    
    // We cast 'data' as any just to extract the country without TS complaining
    const country = (data as any).country as Country;
    
    return {
        country
    };
};