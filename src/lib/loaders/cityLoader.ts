// src/lib/loaders/cityLoader.ts
import { CITY_REGISTRY } from '$lib/data/manifest';
import { loadCountry } from './countryLoader';
import type { City, Transportation } from '$lib/schema/types';

function normalizeCity(data: any, countryId: string): City {
  return {
    ...data,
    id: data.id.toLowerCase(),
    countryId,
    foodStrategy: data.foodStrategy || null
  };
}

export async function loadCity(id: string): Promise<City | null> {
  const entry = CITY_REGISTRY.find(
    c => c.id === id.toUpperCase() || c.slug === id.toLowerCase()
  );
  if (!entry) return null;

  const city = normalizeCity(entry.data, entry.countryId);

  // ⭐ Load country
  const country = await loadCountry(entry.countryId);
  if (!country) throw new Error(`Country not found: ${entry.countryId}`);

  // ⭐ Merge transportation
  const mergedTransportation: Transportation = {
    ...country.transportation,
    ...(city.transportationOverrides || {})
  };

  return {
    ...city,
    transportation: mergedTransportation
  };
}

export async function loadCities(): Promise<City[]> {
  return Promise.all(
    CITY_REGISTRY.map(async entry => {
      const city = normalizeCity(entry.data, entry.countryId);
      const country = await loadCountry(entry.countryId);
      if (!country) throw new Error(`Country not found: ${entry.countryId}`);

      const mergedTransportation: Transportation = {
        ...country.transportation,
        ...(city.transportationOverrides || {})
      };

      return {
        ...city,
        transportation: mergedTransportation
      };
    })
  );
}
