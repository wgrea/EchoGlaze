// src/lib/echoglaze/loaders/transportation.ts
import { loadCountry } from './country';

export async function loadTransportation(countryId: string) {
  const country = await loadCountry(countryId);
  if (!country) throw new Error(`Country not found: ${countryId}`);

  return country.transportation;
}
