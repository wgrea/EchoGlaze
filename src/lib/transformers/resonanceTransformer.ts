// src/lib/transformers/resonanceTransformer.ts

import type { ResonanceSignals } from '$lib/schema/types';

/**
 * Convert raw ResonanceSignals → UI-friendly array
 */
const SIGNAL_LABELS: Record<string, string> = {
    nightlifeOverall: "Nightlife",
    lateNightDining: "Late Night Dining",
    musicScene: "Music Scene",
    danceScene: "Dance Scene",
    barDensity: "Bar Density",
    drinkingCulture: "Drinking Culture", // <--- Add this
    safetyAtNight: "Night Safety",
    socialMeetups: "Social Meetups",
    waterActivities: "Water Activities",
    snowActivities: "Snow Activities",
    natureAccess: "Nature Access",
    festivalCulture: "Festival Culture",
    socialProximity: "Social Ease",
    soloFriendly: "Solo Friendly",
    expatCommunityStrength: "Expat Community"
};

export function signalsToArray(raw: ResonanceSignals | undefined) {
    if (!raw) return [];

    return Object.entries(raw)
        .map(([key, value]) => ({
            name: SIGNAL_LABELS[key] ?? key,
            intensity: value
        }))
        .sort((a, b) => b.intensity - a.intensity); // DESCENDING
}

/**
 * Transform raw API data → minimal resonance data
 */
export function resonanceTransformer(rawData: any) {
    const firstCountry = rawData.countries?.[0];
    const firstCity = rawData.cities?.[0];

    return {
        country: {
            id: firstCountry?.id ?? 'none',
            name: firstCountry?.name ?? 'No Country Data',
            signals: signalsToArray(firstCountry?.resonanceSignals),
            places: firstCountry?.cities ?? []
        },
        city: {
            id: firstCity?.id ?? 'none',
            name: firstCity?.name ?? 'No City Data',
            signals: signalsToArray(firstCity?.resonanceSignals),
            places: firstCity?.cities ?? []
        }
    };
}
