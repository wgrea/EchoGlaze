// src/lib/transformers/resonanceTransformer.ts

import type { ResonanceSignals } from '$lib/schema/types';

/**
 * Convert raw ResonanceSignals → UI-friendly array
 */
export function signalsToArray(raw: ResonanceSignals | undefined) {
    if (!raw) return [];

    return Object.entries(raw)
        .map(([key, value]) => ({
            name: key,
            intensity: value
        }))
        .sort((a, b) => b.intensity - a.intensity);
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
