// src/lib/stores/location.ts
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// 1. The Helper Function (Keep this as is)
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

// 2. Simplified Exports (NO WRAPPERS, NO MAPPINGS)
export const selectedCountryId = persisted<string>('selectedCountryId', 'all');
export const selectedCityId = persisted<string>('selectedCityId', 'all');