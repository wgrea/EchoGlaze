// src/lib/loaders/countryLoader.ts
import type { Country } from '$lib/schema/types';
import { COUNTRY_REGISTRY } from '$lib/data/manifest'; // Import the new registry

// Helper to normalize data to match the Country interface
function normalizeCountry(data: any, id: string): Country {
  return {
    ...data,
    id: id, // Ensure we use the official ID from the registry (e.g., GRC)
    viewMode: data.viewMode || 'country-first',
    resonanceMode: data.resonanceMode || 'country-first',
    // Spread the rest to ensure travelReadiness, resonanceSignals, etc., come through
  };
}

export async function loadCountry(id: string): Promise<Country | null> {
  const normalizedId = id.toLowerCase();

  // DYNAMIC SEARCH: Find by slug (greece) or ID (grc)
  const entry = COUNTRY_REGISTRY.find(c => 
    c.slug === normalizedId || c.id.toLowerCase() === normalizedId
  );

  if (!entry) {
    console.warn(`Country Loader: Could not find country with ID/Slug "${id}"`);
    return null;
  }

  return normalizeCountry(entry.data, entry.id);
}

export async function loadCountries(): Promise<Country[]> {
  // DYNAMIC LOAD: Just map over whatever is in the registry
  const countries = await Promise.all(
    COUNTRY_REGISTRY.map(c => loadCountry(c.id))
  );
  
  return countries.filter((c): c is Country => c !== null);
}