// src/lib/loaders/cityLoader.ts
import { CITY_REGISTRY } from '$lib/data/manifest';
import type { City } from '$lib/schema/types'; // Add this

/**
 * NORMALIZE: Ensures raw data matches our strict 'City' interface.
 */
function normalizeCity(data: any, countryId: string): City {
  return {
    ...data,
    id: data.id.toLowerCase(), 
    countryId: countryId,
    foodStrategy: data.foodStrategy || null 
  };
}

export async function loadCity(id: string): Promise<City | null> {
  const city = CITY_REGISTRY.find(c => 
    c.id === id.toUpperCase() || c.slug === id.toLowerCase()
  );
  if (!city) return null;
  return normalizeCity(city.data, city.countryId);
}

export async function loadCities(): Promise<City[]> {
  return CITY_REGISTRY.map(c => normalizeCity(c.data, c.countryId));
}