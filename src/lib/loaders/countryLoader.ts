// src/lib/loaders/countryLoader.ts
import type { Country } from '$lib/schema/types';

// Import your existing country data
import azerbaijanData from '$lib/data/countries/azerbaijan/index.js';
import unitedStatesData from '$lib/data/countries/united-states/index.js';

// Helper to normalize data to match the Country interface
function normalizeCountry(data: any): Country {
  return {
    id: data.id,
    name: data.name,
    region: data.region,
    viewMode: data.viewMode || 'country-first',
    resonanceMode: data.resonanceMode || 'country-first',

    personaFit: data.personaFit,
    costTier: data.costTier,

    decisionAttributes: {
      visaEase: data.decisionAttributes.visaEase,
      digitalNomadVisa: data.decisionAttributes.digitalNomadVisa,
      nomadFriendliness: data.decisionAttributes.nomadFriendliness,
      safety: data.decisionAttributes.safety,
      englishLevel: data.decisionAttributes.englishLevel,
      avoidIf: data.decisionAttributes.avoidIf,
      majorHubs: data.decisionAttributes.majorHubs
    },

    likelihoodScores: data.likelihoodScores,
    resonanceSignals: data.resonanceSignals,

    /** ⭐ NEW unified block */
    travelReadiness: data.travelReadiness
  };
}

export async function loadCountry(id: string): Promise<Country | null> {
  // Map URL-friendly IDs to your data
  if (id === 'azerbaijan') {
    return normalizeCountry(azerbaijanData);
  }
  
  if (id === 'united-states' || id === 'usa') {
    return normalizeCountry(unitedStatesData);
  }
  
  return null;
}

export async function loadCountries(): Promise<Country[]> {
  const countries = await Promise.all([
    loadCountry('azerbaijan'),
    loadCountry('united-states')
  ]);
  return countries.filter(c => c !== null) as Country[];
}