// src/lib/echoglaze/loaders/transportationLoader.ts
import { loadCountry } from './countryLoader';

export async function loadTransportation(countryId: string) {
  const country = await loadCountry(countryId);
  if (!country) throw new Error(`Country not found: ${countryId}`);

  return country.transportation;
}
