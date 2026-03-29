// src/lib/data/countries/azerbaijan/index.ts
export default {
  id: 'AZE',
  name: 'Azerbaijan',
  region: 'Caucasus / Eurasia',
  viewMode: 'country-first',
  resonanceMode: 'country-first',
  personaFit: [
    'The Budget Architect',
    'The Silk Road Historian',
    'The F1 Enthusiast'
  ],
  costTier: 'Low–Medium',
  decisionAttributes: {
    visaEase: 5,
    digitalNomadVisa: false,
    nomadFriendliness: { infra: 8, vibe: 7 },
    safety: 8,
    englishLevel: 3,
    avoidIf: [
      'Sensitive to "Grey-Zone" political tensions',
      'Requires high LGBTQ+ visibility'
    ],
    majorHubs: ['GYD'] 
  },
  likelihoodScores: {
    nightlife: 6,
    hiking: 9,
    coworking: 7,
    food: 9,
    history: 10,
    safety: 8
  },
  resonanceSignals: {
    nightlifeOverall: 7,
    lateNightDining: 8.5,
    musicScene: 6,
    danceScene: 5,
    barDensity: 6,
    safetyAtNight: 9,
    socialMeetups: 4,
    waterActivities: 6,
    snowActivities: 8,
    natureAccess: 9,
    festivalCulture: 7,
    socialProximity: 8,
    soloFriendly: 8,
    expatCommunityStrength: 4
  },
  /** ⭐ NEW: Unified travel readiness block */
  travelReadiness: {
    visa: {
      type: 'ASAN e-Visa',
      stayLength: '30 days',
      easeLevel: 'simple',
      workPolicy: 'Tourist status; no local employment',
      requirements: ['Passport valid 6 months', 'Hotel confirmation'],
      registrationAfterDays: 15,
      nomadVisaAvailable: false
    },
    flights: {
      friction: 'medium',
      commonStops: 1,
      routingNotes: 'Typically requires a layover in Istanbul (IST) or Doha (DOH) from the US.',
      bestTimeToBook: '2-3 months in advance',
      lastMinuteVolatility: 'high'
    },
    seasonality: {
      cheapest: [1, 2, 11], // Added November as a quiet, budget month
      sweetSpot: [5, 6, 9, 10], 
      peak: [7, 8, 3] // Added March due to Novruz holiday demand
    }
  }
};