// src/lib/loaders/logisticsLoader.ts
import { flightRoutes } from '$lib/data/flightRoutes';
import { loadCountry } from './countryLoader';
import type { TravelReadiness } from '$lib/schema/types';

/**
 * Extracts the travelReadiness block from a specific country.
 * This bridges the gap between the raw country data and the UI's needs.
 */
export async function loadReadiness(id: string): Promise<TravelReadiness | null> {
  const country = await loadCountry(id);
  
  // Using 'travelReadiness' to match your updated src/lib/schema/types.ts
  if (country && country.travelReadiness) {
    return country.travelReadiness;
  }
  
  return null;
}

/**
 * Loads specific flight route data between two locations.
 * Implements a "Null-Object" pattern to prevent UI crashes if a route is missing.
 */
export async function loadFlights(originId: string, destinationId: string) {
  // Normalize IDs to lowercase to match the keys in flightRoutes.ts
  const oid = originId?.toLowerCase();
  const did = destinationId?.toLowerCase();

  const route = flightRoutes[oid]?.[did];

  if (!route) {
    // Return a safe fallback object instead of null
    return {
      friction: 'high',
      commonStops: 1,
      routingNotes: 'Route data not yet established for this specific pair.',
      hubs: [],
      bestTimeToBook: 'N/A',
      lastMinuteVolatility: 'high'
    };
  }

  return route;
}