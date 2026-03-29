// src/lib/transformers/resonanceTransformer.ts

export function transformToResonanceSignals(signalsObj: any): ResonanceSignal[] {
    if (!signalsObj) return [];
    
    const signalMap: Record<string, { name: string; description: string }> = {
        nightlifeOverall: { name: 'Nightlife', description: 'Nightlife scene and activities' },
        lateNightDining: { name: 'Late Night Dining', description: 'Food availability after dark' },
        musicScene: { name: 'Music Scene', description: 'Live music and venues' },
        // ... (rest of your map)
    };

    const signals: ResonanceSignal[] = [];
    for (const [key, value] of Object.entries(signalsObj)) {
        if (!signalMap[key] || typeof value !== 'number') continue;
        let intensity = value <= 10 ? value * 10 : value;
        signals.push({
            name: signalMap[key].name,
            intensity: Math.min(100, intensity),
            description: signalMap[key].description
        });
    }
    return signals.sort((a, b) => b.intensity - a.intensity);
}

import type {
    ResonanceSignals,
    ResonanceSignal,
    ResonancePlace,
    ResonanceCountry,
    ResonanceCity
} from '$lib/schema/types';

export function resonanceTransformer(rawData: any): {
    country: ResonanceCountry;
    city: ResonanceCity;
} {
    console.log('=== RESONANCE TRANSFORMER STARTED ===');
    console.log('Countries count:', rawData.countries?.length);
    console.log('Cities count:', rawData.cities?.length);

    // Convert resonance signals object → sorted array
    function signalsToArray(signalsObj: ResonanceSignals | undefined): ResonanceSignal[] {
        if (!signalsObj) return [];
        if (Array.isArray(signalsObj)) return signalsObj as ResonanceSignal[];

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

        const signals: ResonanceSignal[] = [];

        for (const [key, value] of Object.entries(signalsObj)) {
            if (!signalMap[key] || typeof value !== 'number') continue;

            let intensity = value;

            if (value >= 0 && value <= 10) intensity = Math.round(value * 10);
            else if (value > 10 && value <= 100) intensity = Math.round(value);

            intensity = Math.min(100, Math.max(0, intensity));

            signals.push({
                name: signalMap[key].name,
                intensity,
                description: signalMap[key].description,
                rawValue: value
            });
        }

        return signals.sort((a, b) => b.intensity - a.intensity);
    }

    const getTopSignals = (signals: ResonanceSignal[]): ResonanceSignal[] =>
        signals.slice(0, 5);

    const getPlaces = (item: any): ResonancePlace[] => {
        if (!item.cities || !Array.isArray(item.cities)) return [];

        return item.cities.slice(0, 6).map((city: any) => ({
            name: city.name,
            slug: city.id?.toLowerCase(),
            description: city.type === 'capital'
                ? `${city.name}, the capital city`
                : `Explore ${city.name}`,
            signalMatch: 85
        }));
    };

    // COUNTRY
    const firstCountry = rawData.countries?.[0];
    const countrySignals = signalsToArray(firstCountry?.resonanceSignals);

    const countryData: ResonanceCountry = firstCountry
        ? {
              name: firstCountry.name,
              id: firstCountry.id,
              region: firstCountry.region,
              costTier: firstCountry.costTier,
              sortedSignals: countrySignals,
              topSignals: getTopSignals(countrySignals),
              places: getPlaces(firstCountry)
          }
        : {
              name: 'No Country Data',
              id: 'none',
              sortedSignals: [],
              topSignals: [],
              places: []
          };

    // CITY
    const firstCity = rawData.cities?.[0];
    const citySignals = signalsToArray(firstCity?.resonanceSignals);

    const cityData: ResonanceCity = firstCity
        ? {
              name: firstCity.name,
              id: firstCity.id,
              type: firstCity.type,
              vibe: firstCity.vibe,
              wifiScore: firstCity.wifiScore,
              coworkingDensity: firstCity.coworkingDensity,
              sortedSignals: citySignals,
              topSignals: getTopSignals(citySignals),
              places: getPlaces(firstCity)
          }
        : {
              name: 'No City Data',
              id: 'none',
              sortedSignals: [],
              topSignals: [],
              places: []
          };

    return {
        country: countryData,
        city: cityData
    };
}
