// src/lib/echoglaze/data/index.ts
import { loadCountry, loadCosts, loadVisa } from '$lib/echoglaze/loaders';
import { loadCitiesByCountry } from '$lib/echoglaze/loaders/cityLoader';

export interface CountryData {
  country: Awaited<ReturnType<typeof loadCountry>>;
  costs: Awaited<ReturnType<typeof loadCosts>>;
  visa: Awaited<ReturnType<typeof loadVisa>>;
  cities: Awaited<ReturnType<typeof loadCitiesByCountry>>;
}

export async function getCountryData(countryId: string): Promise<CountryData> {
  const [country, costs, visa, cities] = await Promise.all([
    loadCountry(countryId),
    loadCosts(countryId),
    loadVisa(countryId),
    loadCitiesByCountry(countryId)
  ]);
  
  return { country, costs, visa, cities };
}

export async function getCityData(countryId: string, cityId: string) {
  const cities = await loadCitiesByCountry(countryId);
  const city = cities.find(c => c.id === cityId);
  const costs = await loadCosts(countryId);
  
  return { city, costs };
}

export async function getFullDestinationData(countryId: string, cityId?: string) {
  const countryData = await getCountryData(countryId);
  if (!cityId) return countryData;
  
  const cityData = await getCityData(countryId, cityId);
  return { ...countryData, ...cityData };
}