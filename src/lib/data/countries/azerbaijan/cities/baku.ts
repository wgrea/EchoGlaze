// src/lib/data/countries/azerbaijan/cities/baku.ts
export default {
  id: 'BAK',
  name: 'Baku',
  type: 'capital',
  costMultiplier: 1.4,
  avoidIf: [
    'Hates strong winds ("City of Winds")',
    'High-decibel construction noise sensitivity'
  ],
  safetyPattern: {
    day: 4,
    night: 4,
    notes: 'Extremely safe in central/fountain zones; avoid unlit Soviet-block suburbs'
  },
  foodAffordability: {
    grocery: 6,
    streetFood: 9,
    diningOut: 10
  },
  wifiScore: 4,
  coworkingDensity: 4,
  englishLevel: 3,
  vibe: ['Cosmopolitan', 'Historical', 'Modern'],
  seasonalMultipliers: {
    winter: 0.8,
    summer: 2.5,
    shoulder: 1.1
  },
  stayOptions: [
    {
      id: 'sahil-hostel',
      name: 'Sahil Hostel & Hotel',
      type: 'hostel',
      verifiedWifi: true,
      socialTone: 'social',
      amenities: ['24-hour business center', 'soundproofed rooms', 'kitchen'],
      priceTier: 1
    }
  ],
  resonanceSignals: {
    nightlifeOverall: 8,
    lateNightDining: 7,
    musicScene: 6,
    danceScene: 8,
    barDensity: 9,
    safetyAtNight: 9,
    socialMeetups: 6,
    waterActivities: 8,
    snowActivities: 7,
    natureAccess: 6,
    festivalCulture: 7,
    socialFriction: 9,
    soloFriendly: 7,
    expatCommunityStrength: 6
  }
};