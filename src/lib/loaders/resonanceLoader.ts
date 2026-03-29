// src/lib/loaders/resonanceLoader.ts
import azerbaijanData from '$lib/data/countries/azerbaijan/index.ts';
import usaData from '$lib/data/countries/united-states/index.ts';
import { loadCities } from './cityLoader';

export async function resonanceLoader() {
    try {
        const allCitiesData = await loadCities();
        
        // Map the city to its country based on your folder structure or city properties
        const citiesWithCountry = allCitiesData.map((city: any) => {
            // Logic to determine countryId if it's missing from the city file
            let countryId = city.countryId;
            
            // Fallback: If Austin doesn't have countryId: 'USA', we check names or IDs
            if (city.id === 'AUS' || city.id === 'CHI') countryId = 'USA';
            if (city.id === 'BAK') countryId = 'AZE';

            return {
                ...city,
                countryId,
                countryName: countryId === 'USA' ? 'United States' : 'Azerbaijan'
            };
        });
        
        const azerbaijanCities = citiesWithCountry.filter(city => city.countryId === 'AZE');
        const usCities = citiesWithCountry.filter(city => city.countryId === 'USA');
        
        const countries = [
            {
                ...azerbaijanData,
                id: 'AZE',
                cities: azerbaijanCities,
                resonanceSignals: azerbaijanData.resonanceSignals || {}
            },
            {
                ...usaData,
                id: 'USA',
                cities: usCities,
                resonanceSignals: usaData.resonanceSignals || {}
            }
        ];
        
        return {
            countries,
            cities: citiesWithCountry
        };
    } catch (error) {
        console.error('Error in resonanceLoader:', error);
        throw error;
    }
}