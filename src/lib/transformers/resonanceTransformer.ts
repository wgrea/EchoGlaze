// src/lib/transformers/resonanceTransformer.ts
export function resonanceTransformer(rawData: any) {
    console.log('=== RESONANCE TRANSFORMER STARTED ===');
    console.log('Countries count:', rawData.countries?.length);
    console.log('Cities count:', rawData.cities?.length);
    
    // Helper function to convert resonanceSignals object to array
    function signalsToArray(signalsObj: any) {
        if (!signalsObj) return [];
        
        // If it's already an array, return it
        if (Array.isArray(signalsObj)) return signalsObj;
        
        // Map your specific signal names to display names
        const signalMap: Record<string, { name: string; description: string }> = {
            nightlifeOverall: { name: 'Nightlife', description: 'Nightlife scene and activities' },
            lateNightDining: { name: 'Late Night Dining', description: 'Food availability after dark' },
            musicScene: { name: 'Music Scene', description: 'Live music and venues' },
            danceScene: { name: 'Dance Scene', description: 'Clubs and dancing opportunities' },
            barDensity: { name: 'Bar Density', description: 'Number and variety of bars' },
            safetyAtNight: { name: 'Night Safety', description: 'Safety perception after dark' },
            socialMeetups: { name: 'Social Meetups', description: 'Community events and gatherings' },
            waterActivities: { name: 'Water Activities', description: 'Beaches, boating, water sports' },
            snowActivities: { name: 'Snow Activities', description: 'Winter sports and activities' },
            natureAccess: { name: 'Nature Access', description: 'Parks, trails, outdoor spaces' },
            festivalCulture: { name: 'Festival Culture', description: 'Local festivals and events' },
            socialFriction: { name: 'Social Ease', description: 'Ease of social integration' },
            soloFriendly: { name: 'Solo Friendly', description: 'How welcoming for solo travelers' },
            expatCommunityStrength: { name: 'Expat Community', description: 'Size and activity of expat community' }
        };
        
        const signals = [];
        for (const [key, value] of Object.entries(signalsObj)) {
            if (signalMap[key] && typeof value === 'number') {
                // Values are already on 0-10 scale, convert to 0-100
                const intensity = Math.min(100, Math.max(0, value * 10));
                
                signals.push({
                    name: signalMap[key].name,
                    intensity: intensity,
                    description: signalMap[key].description,
                    rawValue: value
                });
            }
        }
        
        return signals.sort((a, b) => b.intensity - a.intensity);
    }
    
    function getTopSignals(signals: any[]) {
        return signals.slice(0, 5);
    }
    
    function getPlaces(item: any) {
        if (item.cities && Array.isArray(item.cities) && item.cities.length > 0) {
            return item.cities.slice(0, 6).map((city: any) => ({
                name: city.name,
                slug: city.id?.toLowerCase(),
                description: city.type === 'capital' ? `${city.name}, the capital city` : `Explore ${city.name}`,
                signalMatch: Math.floor(Math.random() * 30) + 70
            }));
        }
        return [];
    }
    
    // Process the first country
    const firstCountry = rawData.countries?.[0];
    const countrySignals = firstCountry ? signalsToArray(firstCountry.resonanceSignals) : [];
    
    const countryData = firstCountry ? {
        name: firstCountry.name,
        id: firstCountry.id,
        topSignals: getTopSignals(countrySignals),
        sortedSignals: countrySignals,
        places: getPlaces(firstCountry),
        region: firstCountry.region,
        costTier: firstCountry.costTier
    } : { 
        topSignals: [], 
        sortedSignals: [], 
        places: [],
        name: 'No Country Data',
        id: 'none'
    };
    
    // Process the first city
    const firstCity = rawData.cities?.[0];
    const citySignals = firstCity ? signalsToArray(firstCity.resonanceSignals) : [];
    
    const cityData = firstCity ? {
        name: firstCity.name,
        id: firstCity.id,
        type: firstCity.type,
        topSignals: getTopSignals(citySignals),
        sortedSignals: citySignals,
        places: getPlaces(firstCity),
        vibe: firstCity.vibe,
        wifiScore: firstCity.wifiScore,
        coworkingDensity: firstCity.coworkingDensity
    } : { 
        topSignals: [], 
        sortedSignals: [], 
        places: [],
        name: 'No City Data',
        id: 'none'
    };
    
    const result = {
        country: countryData,
        city: cityData
    };
    
    console.log('Transform complete!');
    console.log('Country:', result.country.name);
    console.log('Country topSignals count:', result.country.topSignals?.length);
    console.log('City:', result.city.name);
    console.log('City topSignals count:', result.city.topSignals?.length);
    console.log('Country places count:', result.country.places?.length);
    console.log('City places count:', result.city.places?.length);
    
    // Log the top signals for debugging
    if (result.country.topSignals?.length) {
        console.log('Top country signals:', result.country.topSignals.map((s: any) => `${s.name}: ${s.intensity}`));
    }
    if (result.city.topSignals?.length) {
        console.log('Top city signals:', result.city.topSignals.map((s: any) => `${s.name}: ${s.intensity}`));
    }
    
    return result;
}