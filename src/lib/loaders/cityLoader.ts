//  src/lib/loaders/cityLoader.ts
import type { City } from '$lib/schema/types';

// Import your existing city data
import chicagoData from '$lib/data/countries/united-states/cities/chicago.js';
import bakuData from '$lib/data/countries/azerbaijan/cities/baku.js';

// Helper to normalize city data
function normalizeCity(data: any, countryId: string): City {
  return {
    id: data.id.toLowerCase(),
    countryId: countryId,
    name: data.name,
    type: data.type,
    costMultiplier: data.costMultiplier,
    vibe: data.vibe,
    avoidIf: data.avoidIf,
    safetyPattern: data.safetyPattern,
    foodAffordability: data.foodAffordability,
    wifiScore: data.wifiScore,
    coworkingDensity: data.coworkingDensity,
    englishLevel: data.englishLevel,
    sweetSpotMonths: data.sweetSpotMonths,
    seasonalMultipliers: data.seasonalMultipliers,
    resonanceSignals: data.resonanceSignals,
    stayOptions: data.stayOptions
  };
}

export async function loadCity(id: string): Promise<City | null> {
  // Chicago
  if (id === 'chicago') {
    return normalizeCity(chicagoData, 'united-states');
  }
  
  // Baku
  if (id === 'baku') {
    return normalizeCity(bakuData, 'azerbaijan');
  }
  
  return null;
}

export async function loadCitiesByCountry(countryId: string): Promise<City[]> {
  const allCities: City[] = [];
  
  if (countryId === 'united-states') {
    const chicago = await loadCity('chicago');
    if (chicago) allCities.push(chicago);
  }
  
  if (countryId === 'azerbaijan') {
    const baku = await loadCity('baku');
    if (baku) allCities.push(baku);
  }
  
  return allCities;
}

export async function loadCities(): Promise<City[]> {
  const [chicago, baku] = await Promise.all([
    loadCity('chicago'),
    loadCity('baku')
  ]);
  
  const cities: City[] = [];
  if (chicago) cities.push(chicago);
  if (baku) cities.push(baku);
  
  return cities;
}