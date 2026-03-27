// src/lib/echoglaze/loaders/countryLoader.ts
import type { Country } from '$lib/echoglaze/schema/types';

export async function loadCountry(id: string): Promise<Country | null> {
  try {
    const module = await import(`$lib/data/countries/${id}/index.ts`);
    return module.default as Country;
  } catch (error) {
    console.error(`Failed to load country ${id}:`, error);
    return null;
  }
}

export async function loadAllCountries(): Promise<Country[]> {
  // Phase 1 only for now - will add Phase 2 JSON support later
  // This will need a list of country IDs to dynamically load
  return [];
}