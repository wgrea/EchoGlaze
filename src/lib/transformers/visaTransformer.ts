// src/lib/echoglaze/transformers/visaTransformer.ts
import type { Visa } from '$lib/echoglaze/schema/types';

export function getVisaDifficulty(visa: Visa): 1 | 2 | 3 | 4 | 5 {
  const base = visa.method === 'visaFree' ? 1 :
               visa.method === 'visaOnArrival' ? 2 :
               visa.method === 'evisa' ? 3 : 4;
               
  const processingBonus = visa.processingDays > 14 ? 1 : 0;
  const costBonus = visa.costUSD > 100 ? 1 : 0;
  
  return Math.min(5, base + processingBonus + costBonus) as 1 | 2 | 3 | 4 | 5;
}

export function isVisaRequired(visa: Visa, nationality: string): boolean {
  // Check if nationality is in any visa-free group
  for (const [group, nationalities] of Object.entries(visa.nationalGroupings)) {
    if (nationalities.includes(nationality)) {
      return group !== 'Visa-Free';
    }
  }
  return true;
}