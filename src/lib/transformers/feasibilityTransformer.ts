// src/lib/echoglaze/transformers/feasibilityTransformer.ts
import type { Country, City } from '$lib/echoglaze/schema/types';

export interface UserProfile {
  avoidSensitivities: string[];
  budget?: number;
  season?: string;
  nationality?: string;
}

export interface FeasibilityResult {
  score: number; // 0-100
  warnings: string[];
  blocking: boolean;
}

export function checkFeasibility(
  entity: Country | City,
  userProfile: UserProfile
): FeasibilityResult {
  const warnings: string[] = [];
  let blocking = false;
  
  // Check avoidIf constraints
  if ('avoidIf' in entity && entity.avoidIf) {
    for (const avoid of entity.avoidIf) {
      for (const sensitivity of userProfile.avoidSensitivities) {
        if (avoid.toLowerCase().includes(sensitivity.toLowerCase())) {
          warnings.push(`⚠️ Warning: ${avoid}`);
          blocking = true;
        }
      }
    }
  }
  
  // Check budget constraints if provided
  if (userProfile.budget && 'costMultiplier' in entity) {
    // This would need cost data to evaluate
    // Placeholder for now
  }
  
  // Check seasonal constraints
  if (userProfile.season && 'seasonalMultipliers' in entity) {
    const seasonKey = userProfile.season.toLowerCase();
    const multiplier = entity.seasonalMultipliers?.[seasonKey as keyof typeof entity.seasonalMultipliers];
    if (multiplier && multiplier > 1.5) {
      warnings.push(`📅 Peak ${userProfile.season} season - expect higher costs and crowds`);
    }
  }
  
  const score = blocking ? 0 : Math.max(0, 100 - (warnings.length * 10));
  
  return {
    score,
    warnings,
    blocking
  };
}