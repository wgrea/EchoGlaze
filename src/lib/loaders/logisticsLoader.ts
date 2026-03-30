// src/lib/loaders/logisticsLoader.ts
import { loadCountry } from './countryLoader';
import type { TravelReadiness } from '$lib/schema/types';

/**
 * Extracts the travelReadiness block from a specific country.
 * This bridges the gap between the raw country data and the UI's needs.
 */
export async function loadReadiness(id: string): Promise<TravelReadiness | null> {
  const country = await loadCountry(id);
  
  // Using 'travelReadiness' to match your updated src/lib/schema/types.ts
  if (country && country.travelReadiness) {
    return country.travelReadiness;
  }
  
  return null;
}
