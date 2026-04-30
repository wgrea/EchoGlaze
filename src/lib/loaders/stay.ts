// src/lib/loaders/stay.ts
import { loadCities } from './city';
import { loadCountries } from './country';

export async function loadAllStayOptions() {
  const [cities, countries] = await Promise.all([
    loadCities(),
    loadCountries()
  ]);

  const allOptions: any[] = [];

  cities.forEach(city => {
    const country = countries.find(ct => ct.id === city.countryId!);  // Non-null assertion

    if (city.stayOptions && Array.isArray(city.stayOptions)) {
      city.stayOptions.forEach((option: any) => {
        allOptions.push({
          ...option,
          cityId: city.id,
          cityName: city.name,
          cityMultiplier: city.costMultiplier,
          wifiScore: option.wifiScore ?? city.wifiScore ?? 0,
          city: {
            id: city.id,
            name: city.name,
            countryId: city.countryId!,  // Safe now
            countryName: country?.name ?? 'Unknown'
          }
        });
      });
    }
  });

  return allOptions;
}