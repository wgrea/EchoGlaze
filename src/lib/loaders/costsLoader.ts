// src/lib/echoglaze/loaders/costsLoader.ts
import type { Costs } from '$lib/echoglaze/schema/types';

export async function loadCosts(countryId: string): Promise<Costs | null> {
  try {
    const module = await import(`$lib/data/countries/${countryId}/costs.ts`);
    const costsData = module.default;
    // Ensure the costs object has countryId
    if (costsData && !costsData.countryId) {
      costsData.countryId = countryId;
    }
    return costsData;
  } catch (error) {
    console.error(`Failed to load costs for ${countryId}:`, error);
    return null;
  }
}