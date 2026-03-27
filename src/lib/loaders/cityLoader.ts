// src/lib/echoglaze/loaders/cityLoader.ts
import type { City } from '$lib/echoglaze/schema/types';

export async function loadCitiesByCountry(countryId: string): Promise<City[]> {
  try {
    const module = await import(`$lib/data/countries/${countryId}/cities/index.ts`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load cities for ${countryId}:`, error);
    return [];
  }
}

export async function loadCity(countryId: string, cityId: string): Promise<City | null> {
  const cities = await loadCitiesByCountry(countryId);
  return cities.find(city => city.id === cityId) || null;
}