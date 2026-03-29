// src/lib/loaders/stayLoader.ts
import { loadCities } from './cityLoader';

export async function loadAllStayOptions() {
  const cities = await loadCities();
  const allOptions: any[] = [];
  
  cities.forEach(city => {
    if (city.stayOptions && Array.isArray(city.stayOptions)) {
      city.stayOptions.forEach((option: any) => { 
        allOptions.push({
          ...option,
          cityId: city.id,
          cityName: city.name,
          cityMultiplier: city.costMultiplier,
          wifiScore: option.wifiScore ?? city.wifiScore ?? 0 
        });
      });
    }
  });
  
  return allOptions;
}

// NEW: per-city loader
export async function loadStayOptions(cityId: string) {
  const all = await loadAllStayOptions();
  return all.filter(option => option.cityId === cityId);
}
