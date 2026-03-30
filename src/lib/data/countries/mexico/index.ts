// src/lib/data/countries/mexico/index.ts
export default {
  id: 'MEX',
  name: 'Mexico',
  region: 'North America / LatAm',
  viewMode: 'country-first',
  resonanceMode: 'country-first',
  personaFit: ['The Cultural Architect', 'The Time-Zone Synchronizer', 'The Street Food Strategist'],
  costTier: 'Medium-Low',
  decisionAttributes: {
    visaEase: 10,
    digitalNomadVisa: true,
    nomadFriendliness: { infra: 9, vibe: 10 },
    safety: 6,
    englishLevel: 5,
    avoidIf: ['Highly sensitive to noise pollution', 'Requires strict 1:1 rule-following culture'],
    majorHubs: ['MEX', 'CUN', 'GDL']
  },
  likelihoodScores: { nightlife: 10, hiking: 8, coworking: 9, food: 10, history: 10, safety: 6 },
  resonanceSignals: {
    nightlifeOverall: 9, lateNightDining: 10, musicScene: 9, danceScene: 8, barDensity: 10,
    safetyAtNight: 6, socialMeetups: 10, waterActivities: 8, snowActivities: 1, natureAccess: 8,
    festivalCulture: 10, socialProximity: 9, soloFriendly: 10, expatCommunityStrength: 10
  },
  travelReadiness: {
    visa: {
      touristStayDays: 180,
      longStayTouristVisaMonths: 12,
      nomadVisa: { available: true, durationMonths: 12 },
      workPolicy: "Strictly foreign income; local Mexican employment requires a separate NUT (Work Permit).",
      registrationAfterDays: 30,
      requirements: ["Proof of monthly income (~$2,600+)", "Bank statements (last 6 months)", "Passport valid 6+ months"]
    },
    seasonality: { cheapest: [5, 6, 9], sweetSpot: [10, 11, 3, 4], peak: [12, 1, 2] },
    seasonalVolatility: { cheapest: 'high', sweetSpot: 'low', neutral: 'medium', peak: 'high' }
  },
  transportation: {
    daytime: { defaultMode: 'metro/bus', cheapestMode: 'metro', recommendedCard: 'Tarjeta de Movilidad Integrada', notes: 'Buses in MEX use a complex "Metrobus" lane system.' },
    nighttime: { safestMode: 'rideHailing', recommendedApps: ['Uber', 'Didi'], notes: 'Never hail "street taxis" at night; use Sitio stands or apps.' },
    apps: { rideHailing: ['Uber', 'Didi', 'Cabify'], transit: ['Citymapper', 'Google Maps'], navigation: ['Waze'] },
    intercity: { cheapest: 'bus', fastest: 'plane', recommended: 'luxury-bus (ADO/ETN)' }
  }
};