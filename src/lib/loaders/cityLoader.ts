// src/lib/loaders/cityLoader.ts
import type { City } from '$lib/schema/types';

// 1. IMPORT RAW DATA
import chicagoData from '$lib/data/countries/united-states/chicago.ts';
import austinData from '$lib/data/countries/united-states/austin.ts';
import denverData from '$lib/data/countries/united-states/denver.ts';
import miamiData from '$lib/data/countries/united-states/miami.ts';
import seattleData from '$lib/data/countries/united-states/seattle.ts';
import bakuData from '$lib/data/countries/azerbaijan/baku.ts';
import instanbulData from '$lib/data/countries/turkey/instanbul.ts';


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
// src/lib/loaders/cityLoader.ts

export async function loadCity(id: string): Promise<City | null> {
  if (!id) return null;
  const cityId = id.toLowerCase();

  switch (cityId) {
    case 'chicago':
    case 'chi':
      return normalizeCity(chicagoData, 'USA'); // Change from 'united-states'
    case 'austin':
    case 'aus':
      return normalizeCity(austinData, 'USA'); // Change from 'united-states'
    case 'denver':
    case 'den':
      return normalizeCity(denverData, 'USA'); 
    case 'miami':
    case 'mia':
      return normalizeCity(miamiData, 'USA');
    case 'seattle':
    case 'sea':
      return normalizeCity(seattleData, 'USA');
    case 'baku':
    case 'bak':
      return normalizeCity(bakuData, 'AZE'); // Change from 'azerbaijan'
    case 'instanbul':
    case 'ins':
      return normalizeCity(instanbulData, 'TUR');
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
  const cityIds = ['chicago', 'austin', 'denver', 'miami', 'seattle', 'baku', 'instanbul'];
  const results = await Promise.all(cityIds.map(id => loadCity(id)));
  return results.filter((city): city is City => city !== null);
}