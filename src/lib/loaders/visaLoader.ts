// src/lib/echoglaze/loaders/visaLoader.ts
import type { Visa } from '$lib/echoglaze/schema/types';

export async function loadVisa(countryId: string): Promise<Visa | null> {
  try {
    const module = await import(`$lib/data/countries/${countryId}/visa.ts`);
    const visaData = module.default;
    // Ensure the visa object has countryId
    if (visaData && !visaData.countryId) {
      visaData.countryId = countryId;
    }
    return visaData;
  } catch (error) {
    console.error(`Failed to load visa for ${countryId}:`, error);
    return null;
  }
}