// src/lib/data/countries/united-states/index.ts
export default {
  id: 'USA',
  name: 'United States of America',
  region: 'North America',
  viewMode: 'city-first',
  resonanceMode: 'city-first',
  registrationRequiredAfterDays: 90,
  personaFit: [
    'The Corporate Renegade',
    'The National Park Junkie',
    'The Tech Optimizer'
  ],
  costTier: 'High',
  decisionAttributes: {
    visaEase: 3, // Moderate–Difficult
    digitalNomadVisa: false,
    nomadFriendliness: {
      infra: 10,
      vibe: 5
    },
    safety: 6,
    englishLevel: 10, // Native
    avoidIf: [
      'Requires universal healthcare',
      'Low tolerance for car dependency',
      'Sensitive to political polarization'
    ],
    majorHubs: ['ATL', 'DFW', 'ORD', 'DEN', 'LAX', 'JFK']
  },
  likelihoodScores: {
    nightlife: 8,
    hiking: 10,
    coworking: 10,
    food: 9,
    history: 6,
    safety: 6
  },
  seasonality: {
    bestMonths: [5, 6, 9, 10],
    expensiveMonths: [7, 8, 12],
    cheapMonths: [1, 2],
    seasonalMultipliers: {
      winter: 1.25,
      summer: 1.40,
      shoulder: 0.90
    }
  },
resonanceSignals: {
    nightlifeOverall: 8,
    lateNightDining: 6.5,
    musicScene: 9.5,
    danceScene: 8,
    barDensity: 9,
    safetyAtNight: 5,
    socialMeetups: 9,
    waterActivities: 9,
    snowActivities: 9,
    natureAccess: 9.5,
    festivalCulture: 9,
    socialProximity: 5,
    soloFriendly: 7,
    expatCommunityStrength: 9
  },
  visaSummary: {
    type: 'ESTA or B1/B2',
    duration: 90,
    extensionPossible: false,
    cost: 21,
    difficulty: 4
  },
  flightsSummary: {
    fromMajorHubs: {
      LHR: { avgPrice: 600, duration: 8, airlines: ['Delta', 'United', 'American'] },
      CDG: { avgPrice: 650, duration: 9, airlines: ['Delta', 'Air France'] }
    },
    bestTimeToBook: '2-3 months in advance',
    notes: 'Prices vary significantly by season and destination'
  }
};