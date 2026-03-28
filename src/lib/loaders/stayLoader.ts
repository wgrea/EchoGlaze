// src/lib/loaders/stayLoader.ts
import { loadCities } from './cityLoader';

export async function loadAllStayOptions() {
  const cities = await loadCities();
  const allOptions: any[] = [];
  
  cities.forEach(city => {
    if (city.stayOptions && Array.isArray(city.stayOptions)) {
      // Change (option) to (option: any) here
      city.stayOptions.forEach((option: any) => { 
        allOptions.push({
          ...option,
          cityId: city.id,
          cityName: city.name,
          cityMultiplier: city.costMultiplier,
          // Now TypeScript won't complain about checking option.wifiScore
          wifiScore: option.wifiScore ?? city.wifiScore ?? 0 
        });
      });
    }
  });
  
  return allOptions;
}