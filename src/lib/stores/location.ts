// src/lib/stores/location.ts
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// 1. The Helper Function (Keep this!)
function persisted<T>(key: string, fallback: T) {
  const initial = browser ? JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback : fallback;
  const store = writable<T>(initial);

  if (browser) {
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
}

// 2. Create the underlying persisted store
const countryStore = persisted<string>('selectedCountryId', 'all');

// 3. Export a wrapper that handles the "Safety Net" normalization
export const selectedCountryId = {
  subscribe: countryStore.subscribe,
  set: (val: string) => {
    // Safety Net Mapping
    const mapping: Record<string, string> = {
      "united-states": "USA",
      "qatar": "QAT",
      "greece": "GRC"
    };
    
    // Normalize: Check mapping first, then uppercase, or stay 'all'
    const normalized = val === 'all' ? 'all' : (mapping[val.toLowerCase()] || val.toUpperCase());
    
    countryStore.set(normalized);
  },
  update: countryStore.update
};

export const selectedCityId = persisted<string>('selectedCityId', 'all');
