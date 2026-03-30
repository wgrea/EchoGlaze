// src/lib/schema/types.ts

// Most important file for drafting Svelte files accordingly

// Base interfaces
export interface BaseEntity {
  id: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface NamedEntity extends BaseEntity {
  name: string;
  slug?: string;
}

export interface FoodMealStrategy {
  bestValue: string;    // e.g., "Business Lunch Set"
  cheapest: string;     // e.g., "Supermarket Grab-and-go"
  note?: string;        // e.g., "Only available 12pm-3pm"
}

export interface FoodStrategy {
  breakfast: FoodMealStrategy;
  lunch: FoodMealStrategy;
  dinner: FoodMealStrategy;
  dessert: FoodMealStrategy;
  nomadProTip?: string;
}

// Country interface
export interface Country extends BaseEntity {
  id: string;
  name: string;
  region: string;

  viewMode: 'country-first' | 'city-first' | 'grid' | 'list' | 'map';
  resonanceMode: 'country-first' | 'city-first' | 'dynamic' | 'static';

  personaFit: string[] | {
    digitalNomad: number;
    backpacker: number;
    luxuryTraveler: number;
    family: number;
  };

  costTier?: string;

  decisionAttributes: {
    visaEase: number;
    digitalNomadVisa: boolean;
    nomadFriendliness: {
      infra: number;
      vibe: number;
    };
    safety: number;
    englishLevel: number;
    avoidIf: string[];
    majorHubs: string[];
  };

  likelihoodScores?: {
    nightlife: number;
    hiking: number;
    coworking: number;
    food: number;
    history: number;
    safety: number;
  };

  resonanceSignals: ResonanceSignals;

  /** ⭐ NEW: Unified travel readiness block */
  travelReadiness: TravelReadiness;
}

// City interface
export interface City extends BaseEntity {
  id: string;
  countryId: string;
  name: string;
  type: 'capital' | 'hub' | 'beach' | 'mountain' | 'cultural' | 'emerging';
  costMultiplier: number;
  vibe: string[];
  avoidIf: string[];
  safetyPattern: {
    day: number;
    night: number;
    notes: string;
  };
  foodAffordability: {
    grocery: number;
    streetFood: number;
    diningOut: number;
  };
  foodStrategy?: FoodStrategy; 
  wifiScore?: number;
  coworkingDensity?: number;
  englishLevel?: number;
  sweetSpotMonths?: number[];
  seasonalMultipliers: {
    winter: number;
    summer: number;
    shoulder: number;
  };
  resonanceSignals: ResonanceSignals;
  stayOptions?: StayOption[];
}

// Stay Option interface
export interface StayOption {
  id: string;
  name: string;
  type: 'hostel' | 'coliving' | 'hotel' | 'apartment';
  verifiedWifi: boolean;
  socialTone: 'quiet' | 'social' | 'party' | 'mixed';
  amenities: string[];
  priceTier: 1 | 2 | 3 | 4 | 5;
}

// Costs interface - includes countryId for JSON storage
export interface Costs extends BaseEntity {
  countryId: string;
  baseMultiplier: number;
  cityMultipliers: Record<string, number>;
  eventMultipliers: Record<string, number>;
  accommodation: {
    budget: number;
    midRange: number;
    luxury: number;
  };
  food: {
    budget: number;
    midRange: number;
    luxury: number;
  };
  transport: {
    local: number;
    intercity: number;
  };
}

// Visa interface - includes countryId for JSON storage
export interface Visa extends BaseEntity {
  countryId: string;
  method: 'evisa' | 'visaOnArrival' | 'embassy' | 'visaFree';
  processingDays: number;
  costUSD: number;
  nationalGroupings: Record<string, string[]>;
}

export interface ResonanceSignals {
  nightlifeOverall: number;
  lateNightDining: number;
  musicScene: number;
  danceScene: number;
  barDensity: number;
  safetyAtNight: number;
  socialMeetups: number;

  waterActivities: number;
  snowActivities: number;
  natureAccess: number;
  festivalCulture: number;

  socialProximity: number;
  soloFriendly: number;
  expatCommunityStrength: number;
}

// ... (keep all your Base, Food, Country, and City interfaces as they are)

export interface TravelReadiness {
  visa: {
    type: string;
    stayLength: string;
    easeLevel: 'simple' | 'moderate' | 'complex';
    workPolicy: string;
    incomeTier?: 'low' | 'medium' | 'high';
    requirements: string[];
    registrationAfterDays?: number;
    nomadVisaAvailable: boolean;
  };

  /** ⭐ UPDATED: Lean Flight Schema */
  flights: {
    friction: 'low' | 'medium' | 'high';
    routingNotes: string;
    hubs?: string[];
    // Removed: commonStops, bestTimeToBook, lastMinuteVolatility (Utility UX)
  };

  seasonality: {
    cheapest: number[];
    sweetSpot: number[];
    peak: number[];
  };

  seasonalVolatility?: {
    cheapest: 'low' | 'medium';
    sweetSpot: 'medium';
    neutral: 'medium' | 'high';
    peak: 'high';
  };
}