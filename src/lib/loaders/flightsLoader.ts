// src/lib/loaders/flightsLoader.ts
import azerbaijanData from '$lib/data/countries/azerbaijan/index.js';
import unitedStatesData from '$lib/data/countries/united-states/index.js';

export async function loadFlights(countryId: string) {
  if (countryId === 'azerbaijan') {
    return azerbaijanData.travelReadiness.flights;
  }
  
  if (countryId === 'united-states') {
    return unitedStatesData.travelReadiness.flights;
  }
  
  return null;
}
