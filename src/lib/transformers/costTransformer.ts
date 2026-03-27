// src/lib/echoglaze/transformers/costTransformer.ts
import type { Costs } from '$lib/echoglaze/schema/types';

export function calculateDailyBudget(
  costs: Costs, 
  style: 'budget' | 'midRange' | 'luxury',
  cityMultiplier: number = 1
): number {
  const accommodation = costs.accommodation[style];
  const food = costs.food[style];
  const transport = costs.transport.local;
  
  return Number(((accommodation + food + transport) * cityMultiplier * costs.baseMultiplier / 30).toFixed(0));
}

export function getCostTier(dailyBudget: number): 'budget' | 'moderate' | 'expensive' | 'luxury' {
  if (dailyBudget < 30) return 'budget';
  if (dailyBudget < 70) return 'moderate';
  if (dailyBudget < 150) return 'expensive';
  return 'luxury';
}