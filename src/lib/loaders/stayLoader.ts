// src/lib/loaders/stayLoader.ts
import type { StayOption } from '$lib/schema/types';
import { loadCity } from './cityLoader';

export async function loadStayOptions(cityId: string): Promise<StayOption[]> {
  const city = await loadCity(cityId);
  return city?.stayOptions || [];
}

export async function loadAllStayOptions(): Promise<(StayOption & { cityId: string; cityName: string; cityMultiplier: number })[]> {
  const allOptions: (StayOption & { cityId: string; cityName: string; cityMultiplier: number })[] = [];
  
  // Load Chicago's stay options
  const chicago = await loadCity('chicago');
  if (chicago && chicago.stayOptions) {
    chicago.stayOptions.forEach(option => {
      allOptions.push({
        ...option,
        cityId: chicago.id,
        cityName: chicago.name,
        cityMultiplier: chicago.costMultiplier
      });
    });
  }
  
  // Load Baku's stay options
  const baku = await loadCity('baku');
  if (baku && baku.stayOptions) {
    baku.stayOptions.forEach(option => {
      allOptions.push({
        ...option,
        cityId: baku.id,
        cityName: baku.name,
        cityMultiplier: baku.costMultiplier
      });
    });
  }
  
  return allOptions;
}