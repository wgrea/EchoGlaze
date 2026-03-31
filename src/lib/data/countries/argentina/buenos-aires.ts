// src/lib/data/countries/argentina/index.ts

export default {
  id: 'ARG',
  name: 'Argentina',
  region: 'South America',
  viewMode: 'country-first',
  resonanceMode: 'country-first',
  personaFit: [
    'The European Soul',
    'The Night-Owl Developer',
    'The Value-Strategist'
  ],
  costTier: 'Low-Medium',
  decisionAttributes: {
    visaEase: 9,
    digitalNomadVisa: true,
    nomadFriendliness: { infra: 9, vibe: 10 },
    safety: 7,
    englishLevel: 7,
    avoidIf: [
      'Frustrated by complex currency exchange systems',
      'Needs early-morning social life (the country runs late)',
      'Low tolerance for high-decibel social environments'
    ],
    majorHubs: ['BUE', 'MDZ', 'BRC']
  },
  likelihoodScores: {
    nightlife: 10,
    hiking: 10,
    coworking: 9,
    food: 9,
    history: 9,
    safety: 7
  },
  resonanceSignals: {
    nightlifeOverall: 10,
    lateNightDining: 10,
    musicScene: 9,
    danceScene: 10,
    barDensity: 10,
    safetyAtNight: 7,
    socialMeetups: 9,
    waterActivities: 5,
    snowActivities: 9,
    natureAccess: 10,
    festivalCulture: 9,
    socialProximity: 10,
    soloFriendly: 9,
    expatCommunityStrength: 9
  },

  travelReadiness: {
    visa: {
      touristStayDays: 90,
      longStayTouristVisaMonths: 6,
      nomadVisa: {
        available: true,
        durationMonths: 6 // Extendable for another 6
      },
      workPolicy: "Transit residence status; local employment strictly prohibited.",
      registrationAfterDays: 0,
      requirements: [
        "US Citizens: Visa-free 90 days",
        "Nomad Visa: Proof of $2,500+ monthly foreign income",
        "Clean criminal record (Apostilled)",
        "Health insurance with COVID/Emergency coverage",
        "2026 Rule: US Visa/Green Card holders get simplified entry"
      ]
    },
    /** ⭐ 2026 Flight Friction Update */
    flights: {
      friction: 'medium',
      routingNotes: "Domestic flights via Aerolíneas Argentinas are reliable but pricey for non-residents. Use Flybondi for budget hops.",
      hubs: ['EZE', 'AEP']
    },
    seasonality: {
      cheapest: [6, 7, 8], // Winter (except ski hubs)
      sweetSpot: [10, 11, 3, 4], // Spring/Autumn
      peak: [12, 1, 2] // Summer / Holidays
    },
    seasonalVolatility: {
      cheapest: 'low',
      sweetSpot: 'medium',
      neutral: 'medium',
      peak: 'high'
    }
  },

  transportation: {
    daytime: {
      defaultMode: 'subte',
      cheapestMode: 'colectivo (bus)',
      recommendedCard: 'SUBE',
      notes: 
        'SUBE is the ONLY way to pay for transit. 2026 Tip: It is currently easier to buy at "Centros de Atención" than Kioscos due to stock shortages.'
    },
    nighttime: {
      safestMode: 'rideHailing',
      recommendedApps: ['Cabify', 'Uber'],
      notes: 
        'Cabify is the gold standard for safety in BUE. Avoid unmarked street taxis after 2 AM.'
    },
    apps: {
      rideHailing: ['Cabify', 'Uber', 'Didi'],
      transit: ['Moovit', 'Google Maps', 'Cuando Subo'],
      navigation: ['Google Maps', 'Waze']
    },
    intercity: {
      cheapest: 'bus', // Cama-Suite is high utility
      fastest: 'plane',
      recommended: 'plane'
    }
  }
};