// src/lib/data/countries/united-states/index.ts
export default {
  id: 'USA',
  name: 'United States of America',
  region: 'North America',
  viewMode: 'city-first',
  resonanceMode: 'city-first',
  personaFit: [
    'The Corporate Renegade',
    'The National Park Junkie',
    'The Tech Optimizer'
  ],
  costTier: 'High',
  decisionAttributes: {
    visaEase: 3,
    digitalNomadVisa: false,
    nomadFriendliness: { infra: 10, vibe: 5 },
    safety: 6,
    englishLevel: 10,
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
  /** ⭐ NEW: Unified travel readiness block */
/** ⭐ NEW: Unified travel readiness block */
travelReadiness: {
    visa: {
      type: 'ESTA / B1/B2',
      stayLength: 'Standard seasonal stay',
      easeLevel: 'moderate',
      workPolicy: 'Strictly limited to incidental remote work',
      requirements: [
        'Digital authorization or interview',
        'Proof of stable income',
        'Passport valid for 6+ months',
        'Evidence of ties to home country',
        'Clean background check'
      ],
      registrationAfterDays: 'Not applicable for standard stay',
      nomadVisaAvailable: false
    },
    flights: {
      friction: 'low',
      commonStops: 0,
      routingNotes: 'Massive internal hub network; direct flights available from most continents.',
      bestTimeToBook: '3 months in advance',
      lastMinuteVolatility: 'medium',
      hubs: ['Chicago (ORD)', 'Atlanta (ATL)', 'New York (JFK)', 'Los Angeles (LAX)']
    },
    seasonality: {
      cheapest: [1, 2],
      sweetSpot: [5, 6, 9, 10], // Broadly true, though regional
      peak: [7, 8, 11, 12] // Added Nov/Dec for the massive holiday travel spikes
    },
    seasonalVolatility: {
      cheapest: 'low',     // Deep winter (except ski hubs) is very stable.
      sweetSpot: 'medium', // Shoulder season stability.
      neutral: 'high',     // "Neutral" months like May/Sept often hit by business travel.
      peak: 'high'         // Holiday travel is notoriously volatile.
    }
  }
};