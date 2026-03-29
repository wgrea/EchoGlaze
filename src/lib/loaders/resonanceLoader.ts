// src/lib/loaders/resonanceLoader.ts
// Import your actual data files
import azerbaijanData from '$lib/data/countries/azerbaijan/index.ts';
import bakuData from '$lib/data/countries/azerbaijan/cities/baku.ts';
import usaData from '$lib/data/countries/united-states/index.ts';

// Import US cities - you'll need to add these files
// For now, let's create a mock US city or import if exists
// import chicagoData from '$lib/data/countries/united-states/cities/chicago.ts';
// import nycData from '$lib/data/countries/united-states/cities/new-york.ts';

export async function resonanceLoader() {
    console.log('=== RESONANCE LOADER STARTED ===');
    
    try {
        // Build countries data
        const countries = [
            {
                ...azerbaijanData,
                id: azerbaijanData.id || 'AZE',
                name: azerbaijanData.name,
                cities: [bakuData], // Add more cities as you have them
                resonanceSignals: azerbaijanData.resonanceSignals || {}
            },
            {
                ...usaData,
                id: usaData.id || 'USA',
                name: usaData.name,
                cities: [], // Add US cities here when you have them
                resonanceSignals: usaData.resonanceSignals || {}
            }
        ];
        
        // Get all cities from all countries
        const allCities = countries.flatMap(country => 
            (country.cities || []).map((city: any) => ({
                ...city,
                countryName: country.name,
                countryId: country.id,
                resonanceSignals: city.resonanceSignals || {}
            }))
        );
        
        console.log('Countries loaded successfully:', countries.length);
        console.log('Cities loaded successfully:', allCities.length);
        console.log('First country:', countries[0]?.name);
        console.log('First city:', allCities[0]?.name);
        
        return {
            countries,
            cities: allCities
        };
    } catch (error) {
        console.error('Error in resonanceLoader:', error);
        throw error;
    }
}