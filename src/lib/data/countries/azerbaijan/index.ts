// src/lib/data/countries/azerbaijan/index.ts
export default {
  id: 'AZE',
  name: 'Azerbaijan',
  region: 'Caucasus / Eurasia',
  viewMode: 'country-first',
  resonanceMode: 'country-first',
  registrationRequiredAfterDays: 15,
  personaFit: [
    'The Budget Architect',
    'The Silk Road Historian',
    'The F1 Enthusiast'
  ],
  costTier: 'Low–Medium',
  decisionAttributes: {
    visaEase: 5, // High
    digitalNomadVisa: false,
    nomadFriendliness: {
      infra: 8,
      vibe: 7
    },
    safety: 8,
    englishLevel: 3, // Low–Moderate
    avoidIf: [
      'Sensitive to "Grey-Zone" political tensions',
      'Requires high LGBTQ+ visibility'
    ],
    majorHubs: ['ATL', 'DFW', 'ORD', 'DEN', 'LAX', 'JFK']
  },
  likelihoodScores: {
    nightlife: 6,
    hiking: 9,
    coworking: 7,
    food: 9,
    history: 10,
    safety: 8
  },
  seasonality: {
    bestMonths: [5, 6, 9, 10],
    expensiveMonths: [7, 8, 12],
    cheapMonths: [1, 2],
    seasonalMultipliers: {
      winter: 0.70,
      summer: 1.50,
      shoulder: 1.00
    }
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
    socialProximity: 8, // High proximity/low friction
    soloFriendly: 8,
    expatCommunityStrength: 4
  },
  visaSummary: {
    type: 'ASAN e-Visa',
    duration: 30,
    extensionPossible: true,
    cost: 26,
    difficulty: 2
  },
  flightsSummary: {
    fromMajorHubs: {
      ATL: { avgPrice: 800, duration: 12, airlines: ['Turkish', 'Qatar'] },
      JFK: { avgPrice: 750, duration: 11, airlines: ['Turkish', 'Emirates'] }
    },
    bestTimeToBook: '2-3 months in advance',
    notes: 'Prices spike during F1 weekend in June'
  }
};