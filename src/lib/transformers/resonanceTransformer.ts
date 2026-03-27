// src/lib/echoglaze/transformers/resonanceTransformer.ts
import type { ResonanceSignals } from '$lib/echoglaze/schema/types';

// Preserves 1-10 scale, no normalization
export function calculateResonanceScore(signals: ResonanceSignals): number {
  const coreAvg = (
    signals.nightlifeOverall +
    signals.lateNightDining +
    signals.musicScene +
    signals.danceScene +
    signals.barDensity +
    signals.safetyAtNight +
    signals.socialMeetups
  ) / 7;
  
  const seasonalAvg = (
    signals.waterActivities +
    signals.snowActivities +
    signals.natureAccess +
    signals.festivalCulture
  ) / 4;
  
  const socialAvg = (
    signals.socialFriction +
    signals.soloFriendly +
    signals.expatCommunityStrength
  ) / 3;
  
  // Weighted: Core 50%, Seasonal 25%, Social 25%
  return Number(((coreAvg * 0.5) + (seasonalAvg * 0.25) + (socialAvg * 0.25)).toFixed(1));
}

export function getPrimaryVibe(signals: ResonanceSignals): string[] {
  const vibes: string[] = [];
  
  if (signals.nightlifeOverall >= 7) vibes.push('Nightlife Hub');
  if (signals.musicScene >= 7) vibes.push('Music Scene');
  if (signals.natureAccess >= 7) vibes.push('Nature Access');
  if (signals.festivalCulture >= 7) vibes.push('Festival Culture');
  if (signals.soloFriendly >= 7) vibes.push('Solo-Friendly');
  if (signals.expatCommunityStrength >= 7) vibes.push('Expat Community');
  
  return vibes;
}

export function getSocialAtmosphere(signals: ResonanceSignals): string {
  if (signals.socialFriction <= 3) return 'Low Friction - Very Welcoming';
  if (signals.socialFriction <= 6) return 'Moderate Friction - Navigable';
  return 'High Friction - Scene-dependent';
}