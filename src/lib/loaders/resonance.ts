// src/lib/loaders/resonance.ts
import { COUNTRY_REGISTRY } from '$lib/data/manifest';
import { loadCities } from './city';
import type { City } from '$lib/types';

export async function resonanceLoader() {
  const allCities = await loadCities();
  
  const countries = COUNTRY_REGISTRY.map(country => ({
    ...country.data,
    id: country.id,
    cities: allCities.filter((city: City) => city.countryId === country.id),
    resonanceSignals: country.data.resonanceSignals || {}
  }));

  return { countries, cities: allCities };
}