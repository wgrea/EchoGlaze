// src/lib/loaders/resonanceLoader.ts
import azerbaijanData from '$lib/data/countries/azerbaijan/index.ts';
import usaData from '$lib/data/countries/united-states/index.ts';
import { loadCities } from './cityLoader';

export async function resonanceLoader() {
    console.log('=== RESONANCE LOADER STARTED ===');
    
    try {
        // Load all cities
        const allCitiesData = await loadCities();
        
        // Create a map of country names for cities
        const countryMap: Record<string, string> = {
            'azerbaijan': azerbaijanData.name,
            'united-states': usaData.name
        };
        
        // Add countryName to each city
        const citiesWithCountry = allCitiesData.map(city => ({
            ...city,
            countryName: countryMap[city.countryId] || city.countryId
        }));
        
        // Group cities by country
        const azerbaijanCities = citiesWithCountry.filter(city => city.countryId === 'azerbaijan');
        const usCities = citiesWithCountry.filter(city => city.countryId === 'united-states');
        
        // Build countries data with their cities
        const countries = [
            {
                ...azerbaijanData,
                id: azerbaijanData.id || 'AZE',
                name: azerbaijanData.name,
                cities: azerbaijanCities,
                resonanceSignals: azerbaijanData.resonanceSignals || {}
            },
            {
                ...usaData,
                id: usaData.id || 'USA',
                name: usaData.name,
                cities: usCities,
                resonanceSignals: usaData.resonanceSignals || {}
            }
        ];
        
        console.log('Countries loaded:', countries.map(c => `${c.name} (${c.cities.length} cities)`));
        console.log('Total cities loaded:', citiesWithCountry.length);
        console.log('Cities:', citiesWithCountry.map(c => `${c.name} (${c.countryName})`));
        
        return {
            countries,
            cities: citiesWithCountry
        };
    } catch (error) {
        console.error('Error in resonanceLoader:', error);
        throw error;
    }
}