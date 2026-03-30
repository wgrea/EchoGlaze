// src/lib/schema/types.ts

// Most important file for drafting Svelte files accordingly

export interface Country {
  id: string;
  name: string;
  region: string;
  travelReadiness: TravelReadiness;
  transportation: Transportation; // <-- add this here
}

export interface City {
  id: string;
  name: string;
  countryId: string;

  stayOptions?: StayOption[];
  costMultiplier?: number;

  wifiScore?: number;
  foodStrategy?: {
    staples: string[];
    cheapEats: string[];
    groceryTips: string[];
    notes?: string;
  };

  transportation?: Transportation; // <-- REQUIRED for loader return
  transportationOverrides?: Partial<Transportation>;
}



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

export interface TravelReadiness {
  visa: {
    touristStayDays: number; // e.g., 30, 60, 90, 180, 365
    longStayTouristVisaMonths?: number | null; // e.g., 6 or 12
    nomadVisa: {
      available: boolean;
      durationMonths?: number | null;
    };
    workPolicy: string; // "Tourist status; no local employment"
    registrationAfterDays?: number | null; // e.g., 15 for Azerbaijan
    requirements: string[]; // evergreen, simple
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

type TransportMode =
  | 'metro'
  | 'bus'
  | 'tram'
  | 'walk'
  | 'rideHailing'
  | 'taxi'
  | 'mixed';

type IntercityMode = 'bus' | 'train' | 'flight' | 'ferry'; // optional

export interface Transportation {
  daytime: {
    /**
     * Most common everyday mode locals use during the day.
     * Helps anchor the user's mental model of "how people actually move here."
     */
    defaultMode: TransportMode;

    cheapestMode: TransportMode;
    recommendedCard?: string;
    notes?: string;
  };

  nighttime: {
    safestMode: TransportMode;
    recommendedApps: string[]; // flexible: ride-hailing + local safety apps
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
