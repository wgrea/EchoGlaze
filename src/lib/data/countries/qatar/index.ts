export default {
  id: 'QAT',
  name: 'Qatar',
  region: 'Middle East / GCC',
  viewMode: 'city-first',
  resonanceMode: 'country-first',
  personaFit: [
    'The Business Nomad',
    'The Stopover Explorer',
    'The Architecture Enthusiast',
    'The Luxury Executive'
  ],
  costTier: 'High',
  decisionAttributes: {
    visaEase: 9,
    digitalNomadVisa: false,
    nomadFriendliness: { infra: 9, vibe: 6 },
    safety: 9,
    englishLevel: 9,
    avoidIf: [
      'Strict budget constraints (Accommodation is expensive)',
      'Sensitivity to conservative social laws',
      'Dislikes extreme artificial environments'
    ],
    majorHubs: ['DOH'] 
  },
  likelihoodScores: {
    nightlife: 4,
    hiking: 2,
    coworking: 10,
    food: 9,
    history: 7,
    safety: 9
  },
  resonanceSignals: {
    nightlifeOverall: 4,
    lateNightDining: 9,
    musicScene: 5,
    danceScene: 3,
    barDensity: 4,
    safetyAtNight: 10,
    socialMeetups: 5,
    waterActivities: 8,
    snowActivities: 1,
    natureAccess: 3,
    festivalCulture: 6,
    socialProximity: 5,
    soloFriendly: 7,
    expatCommunityStrength: 8
  },
  travelReadiness: {
    visa: {
      type: 'Visa Waiver / Hayya Entry',
      stayLength: '90 Days',
      easeLevel: 'simple',
      workPolicy: 'Remote work permitted on tourist status',
      requirements: [
        'Passport valid for 3+ months',
        'Confirmed hotel/accommodation',
        'Mandatory Health Insurance (QAR 50)',
        'Return/Onward ticket'
      ],
      registrationAfterDays: 'None for tourists',
      nomadVisaAvailable: false // 10-year Executive visas exist but aren't "nomad" specific
    },
    flights: {
      friction: 'low',
      commonStops: 0,
      routingNotes: 'World-class connectivity via Qatar Airways; direct from 12+ US cities.',
      bestTimeToBook: '2 months in advance',
      lastMinuteVolatility: 'medium',
      hubs: ['DOH', 'JFK', 'ORD', 'LHR']
    },
    seasonality: {
      cheapest: [6, 7, 8], // Extreme heat = low prices
      sweetSpot: [4, 5, 10, 11], 
      peak: [12, 1, 2, 3] 
    },
    seasonalVolatility: {
      cheapest: 'low',
      sweetSpot: 'medium',
      neutral: 'high',
      peak: 'extreme' 
    }
  }
};