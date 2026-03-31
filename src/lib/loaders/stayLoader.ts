// src/lib/loaders/stayLoader.ts
import { loadCities } from './cityLoader';
import { loadCountries } from './countryLoader'; // you likely already have this

export async function loadAllStayOptions() {
  const [cities, countries] = await Promise.all([
    loadCities(),
    loadCountries()
  ]);

  const allOptions: any[] = [];

  cities.forEach(city => {
    const country = countries.find(ct => ct.id === city.countryId);

    if (city.stayOptions && Array.isArray(city.stayOptions)) {
      city.stayOptions.forEach((option: any) => {
        allOptions.push({
          ...option,

          // existing fields you already use
          cityId: city.id,
          cityName: city.name,
          cityMultiplier: city.costMultiplier,
          wifiScore: option.wifiScore ?? city.wifiScore ?? 0,

          // NEW: attach city + country for StayOptionCard
city: {
  id: city.id,
  name: city.name,
  countryId: city.countryId,              // <-- ADD THIS
  countryName: country?.name ?? 'Unknown'
}

        });
      });
    }
  });

  return allOptions;
}

// unchanged
export async function loadStayOptions(cityId: string) {
  const all = await loadAllStayOptions();
  return all.filter(option => option.cityId === cityId);
}
