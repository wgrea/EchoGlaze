// src/lib/loaders/cityLoader.ts
import type { City } from '$lib/schema/types';

// 1. IMPORT RAW DATA
import chicagoData from '$lib/data/countries/united-states/cities/chicago.js';
import austinData from '$lib/data/countries/united-states/cities/austin.js';
import denverData from '$lib/data/countries/united-states/cities/denver.js';
import miamiData from '$lib/data/countries/united-states/cities/miami.js';
import seattleData from '$lib/data/countries/united-states/cities/seattle.js';
import bakuData from '$lib/data/countries/azerbaijan/cities/baku.js';

/**
 * NORMALIZE: Ensures raw data matches our strict 'City' interface.
 * Line 23 Fix: Ensures properties are properly comma-separated.
 */
function normalizeCity(data: any, countryId: string): City {
  return {
    ...data,
    id: data.id.toLowerCase(), 
    countryId: countryId,
    foodStrategy: data.foodStrategy || null 
  };
}

/**
 * SINGLE FETCH: Loads a specific city by its ID.
 * Fixed: Uses 'cityId' consistently to avoid "Cannot find name" errors.
 */
export async function loadCity(id: string): Promise<City | null> {
  if (!id) return null;
  const cityId = id.toLowerCase();

  switch (cityId) {
    case 'chicago':
    case 'chi':
      return normalizeCity(chicagoData, 'united-states');
    case 'austin':
    case 'aus':
      return normalizeCity(austinData, 'united-states');
    case 'denver':
    case 'den':
      return normalizeCity(denverData, 'united-states');
    case 'miami':
    case 'mia':
      return normalizeCity(miamiData, 'united-states');
    case 'seattle':
    case 'sea':
      return normalizeCity(seattleData, 'united-states');
    case 'baku':
    case 'bak':
      return normalizeCity(bakuData, 'azerbaijan');
    default:
      return null;
  }
}

/**
 * REGIONAL FETCH: Groups cities by country.
 */
export async function loadCitiesByCountry(countryId: string): Promise<City[]> {
  const all = await loadCities();
  return all.filter(city => city.countryId === countryId);
}

/**
 * GLOBAL FETCH: Returns every city registered in the app.
 */
export async function loadCities(): Promise<City[]> {
  const cityIds = ['chicago', 'austin', 'denver', 'miami', 'seattle', 'baku'];
  const results = await Promise.all(cityIds.map(id => loadCity(id)));
  return results.filter((city): city is City => city !== null);
}