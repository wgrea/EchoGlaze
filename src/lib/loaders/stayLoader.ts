// src/lib/loaders/stayLoader.ts
import { loadCities } from './cityLoader';

export async function loadAllStayOptions() {
  const cities = await loadCities();
  const allOptions: any[] = [];
  
  cities.forEach(city => {
    // If city.stayOptions is undefined or empty, this skip ensures no crash
    if (city.stayOptions && Array.isArray(city.stayOptions)) {
      city.stayOptions.forEach(option => {
        allOptions.push({
          ...option,
          cityId: city.id,       // Ensure this is 'sea', 'chi', etc.
          cityName: city.name,
          cityMultiplier: city.costMultiplier
        });
      });
    }
  });
  
  return allOptions;
}