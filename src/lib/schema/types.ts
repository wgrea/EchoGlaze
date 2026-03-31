// src/lib/schema/types.ts

// --- Base Interfaces ---
export interface BaseEntity {
  id: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface NamedEntity extends BaseEntity {
  name: string;
  slug?: string;
}

// --- Food Strategy ---
export interface FoodMealStrategy {
  bestValue: string;
  cheapest: string;
}

export interface FoodStrategy {
  breakfast: FoodMealStrategy;
  lunch: FoodMealStrategy;
  dinner: FoodMealStrategy;
  dessert: FoodMealStrategy;
  healthyCheap: string;
}

// --- Stay Options ---
export interface StayOption {
  id: string;
  name: string;
  type: 'hostel' | 'coliving' | 'hotel' | 'apartment' | 'boutique-hostel' | 'coworking-hostel' | 'premium-hostel' | 'hybrid';
  verifiedWifi: boolean;
  socialTone: 'quiet' | 'social' | 'party' | 'mixed' | 'balanced' | 'productive' | 'ultra-quiet';
  amenities: string[];
  priceTier: 1 | 2 | 3 | 4 | 5; // 1: Ultra Budget, 2: Budget, 3: Moderate, 4: Premium, 5: Luxury
}

// --- Transport ---
export type TransportMode = 'metro' | 'bus' | 'tram' | 'walk' | 'rideHailing' | 'taxi' | 'mixed';
export type IntercityMode = 'bus' | 'train' | 'flight' | 'ferry';

export interface Transportation {
  daytime: {
    defaultMode: TransportMode;
    cheapestMode: TransportMode;
    recommendedCard?: string;
    notes?: string;
  };
  nighttime: {
    safestMode: TransportMode;
    recommendedApps: string[];
    notes?: string;
  };
  apps: {
    rideHailing: string[];
    transit: string[];
    navigation?: string[];
  };
  intercity?: {
    cheapest: IntercityMode;
    fastest: IntercityMode;
    recommended: IntercityMode;
  };
}

// --- Resonance & Readiness ---
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

export interface TravelReadiness {
  visa: {
    touristStayDays: number;
    longStayTouristVisaMonths?: number | null;
    nomadVisa: {
      available: boolean;
      name?: string;
      durationMonths?: number | null;
      incomeRequirement?: number;
    };
    workPolicy: string;
    registrationAfterDays?: number | null;
    requirements: string[];
  };
  flights: {
    friction: 'low' | 'medium' | 'high';
    routingNotes: string;
    hubs?: string[];
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

// --- Main Entities ---
export interface City extends NamedEntity {
  type: 'capital' | 'metropolis' | 'hub' | 'tech-enclave' | 'remote';
  costMultiplier: number;
  avoidIf: string[];
  safetyPattern: { day: number; night: number; notes: string };
  foodStrategy: FoodStrategy;
  wifiScore: number;
  coworkingDensity: number;
  englishLevel: number;
  vibe: string[];
  stayOptions: StayOption[];
  resonanceSignals: Partial<ResonanceSignals>;
  transportationOverrides?: Partial<Transportation>;
}

export interface Country extends NamedEntity {
  region: string;
  costTier: string;
  viewMode?: 'country-first' | 'city-first';
  resonanceMode?: 'country-first' | 'city-first';
  personaFit: string[];
  decisionAttributes: {
    visaEase: number;
    digitalNomadVisa: boolean;
    nomadFriendliness: { infra: number; vibe: number };
    safety: number;
    avoidIf: string[];
    majorHubs: string[];
  };
  travelReadiness: TravelReadiness;
  transportation: Transportation;
  likelihoodScores?: Record<string, number>;
  resonanceSignals?: Partial<ResonanceSignals>;
}