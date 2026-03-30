// src/lib/loaders/resonanceLoader.ts
import { COUNTRY_REGISTRY } from '$lib/data/manifest';
import { loadCities } from './cityLoader'; // 1. IMPORT THIS
import type { City } from '$lib/schema/types'; // 2. IMPORT THIS

export async function resonanceLoader() {
  const allCities = await loadCities();
  
  const countries = COUNTRY_REGISTRY.map(country => ({
    ...country.data,
    id: country.id,
    // 3. Add : City type to the filter parameter
    cities: allCities.filter((city: City) => city.countryId === country.id),
    resonanceSignals: country.data.resonanceSignals || {}
  }));

  return { countries, cities: allCities };
}