// src/lib/loaders/city.ts
import { CITY_REGISTRY } from '$lib/data/manifest';
import type { City, Transportation } from '$lib/types';  // Add CityRegistryEntry

// Type for registry entries
interface CityRegistryEntry {
  id: string;
  slug: string;
  countryId: string;
  data: any;
}

function normalizeCity(data: any, countryId: string): City {
  return {
    ...data,
    id: data.id.toLowerCase(),
    countryId,
    foodStrategy: data.foodStrategy || null
  };
}

export async function loadCity(id: string): Promise<City | undefined> {
  const allCities = await loadCities();
  return allCities.find(city => city.id === id.toLowerCase());
}

export async function loadCities(): Promise<City[]> {
  return CITY_REGISTRY.map((entry: CityRegistryEntry) => 
    normalizeCity(entry.data, entry.countryId)
  );
}

export async function loadCitiesByCountry(countryId: string): Promise<City[]> {
  const cities = CITY_REGISTRY
    .filter((c: CityRegistryEntry) => c.countryId === countryId)
    .sort((a: CityRegistryEntry, b: CityRegistryEntry) => a.slug.localeCompare(b.slug));
  
  return cities.map((entry: CityRegistryEntry) => 
    normalizeCity(entry.data, countryId)
  );
}