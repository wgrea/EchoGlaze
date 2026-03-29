import azerbaijanData from '$lib/data/countries/azerbaijan/index.ts';
import usaData from '$lib/data/countries/united-states/index.ts';
import turkeyData from '$lib/data/countries/turkey/index.ts'; // 1. IMPORT TURKEY
import { loadCities } from './cityLoader';

export async function resonanceLoader() {
    try {
        const allCitiesData = await loadCities();
        
        const citiesWithCountry = allCitiesData.map((city: any) => {
            let countryId = city.countryId;
            
            // 2. ADD TURKEY FALLBACKS
            if (city.id === 'AUS' || city.id === 'CHI') countryId = 'USA';
            if (city.id === 'BAK') countryId = 'AZE';
            if (city.id === 'INS') countryId = 'TUR'; // Istanbul to Turkey

            return {
                ...city,
                countryId,
                countryName: countryId === 'USA' ? 'United States' : 
                             countryId === 'AZE' ? 'Azerbaijan' : 
                             'Turkey' // 3. ADD NAME MAPPING
            };
        });
        
        const azerbaijanCities = citiesWithCountry.filter(city => city.countryId === 'AZE');
        const usCities = citiesWithCountry.filter(city => city.countryId === 'USA');
        const turkeyCities = citiesWithCountry.filter(city => city.countryId === 'TUR'); // 4. FILTER TURKEY
        
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
            },
            // 5. ADD TURKEY TO THE COUNTRIES ARRAY
            {
                ...turkeyData,
                id: 'TUR',
                cities: turkeyCities,
                resonanceSignals: turkeyData.resonanceSignals || {}
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