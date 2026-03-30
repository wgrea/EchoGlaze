export default {
  id: 'GRC',
  name: 'Greece',
  region: 'Europe / Mediterranean',
  viewMode: 'city-first',
  resonanceMode: 'dynamic',
  personaFit: [
    'The Island Hopper',
    'The Ancient Historian',
    'The Mediterranean Foodie',
    'The Digital Nomad (DNV Path)'
  ],
  costTier: 'Medium',
  decisionAttributes: {
    visaEase: 7,
    digitalNomadVisa: true,
    nomadFriendliness: { infra: 8, vibe: 10 },
    safety: 8,
    englishLevel: 8,
    avoidIf: [
      'High heat sensitivity (July/August peaks)',
      'Frustrated by "Island Time" logistics'
    ],
    majorHubs: ['ATH', 'SKG'] 
  },
  likelihoodScores: {
    nightlife: 9,
    hiking: 7,
    coworking: 8,
    food: 10,
    history: 10,
    safety: 8
  },
  resonanceSignals: {
    nightlifeOverall: 9,
    lateNightDining: 10,
    musicScene: 8,
    danceScene: 7,
    barDensity: 10,
    safetyAtNight: 8,
    socialMeetups: 9,
    waterActivities: 10,
    snowActivities: 4,
    natureAccess: 8,
    festivalCulture: 9,
    socialProximity: 9,
    soloFriendly: 9,
    expatCommunityStrength: 8
  },
  travelReadiness: {
    visa: {
      type: 'Greece Digital Nomad Visa',
      stayLength: '1–2 Years',
      easeLevel: 'moderate',
      workPolicy: 'Remote work for non-Greek entities only',
      requirements: [
        'Proof of €3,500 monthly income',
        'Certified health insurance',
        'Clean criminal record',
        'Valid passport'
      ],
      registrationAfterDays: 'Required after 90 days',
      nomadVisaAvailable: true
    },
    flights: {
      friction: 'low',
      commonStops: 0,
      routingNotes: 'Major European hub; direct flights from most US East Coast cities in summer.',
      bestTimeToBook: '3-4 months in advance',
      lastMinuteVolatility: 'medium',
      hubs: ['London (LHR)', 'Frankfurt (FRA)', 'Paris (CDG)']
    },
    seasonality: {
      cheapest: [1, 2, 11, 12],
      sweetSpot: [5, 6, 9, 10], 
      peak: [7, 8] 
    },
    seasonalVolatility: {
      cheapest: 'low',
      sweetSpot: 'medium',
      neutral: 'medium',
      peak: 'extreme' // Island prices can triple in August
    }
  }
};