// src/lib/data/countries/united-states/cities/chicago.ts
export default {
  id: 'CHI',
  name: 'Chicago',
  type: 'hub',
  costMultiplier: 1.2,
  avoidIf: [
    'Low tolerance for cold/wind',
    'Wants a soft/nature-first vibe'
  ],
  safetyPattern: {
    day: 4,
    night: 3,
    notes: 'Grid-Boundary Pattern — Loop & North Side safe; sharp drop west/south'
  },
  foodAffordability: {
    grocery: 10,
    streetFood: 9,
    diningOut: 6
  },
  wifiScore: 4,
  coworkingDensity: 4,
  englishLevel: 5,
  vibe: ['Architectural', 'Foodie', 'Cultural'],
  seasonalMultipliers: {
    winter: 0.7,
    summer: 1.6,
    shoulder: 1.1
  },
  stayOptions: [
    {
      id: 'hi-chicago',
      name: 'HI Chicago',
      type: 'hostel',
      verifiedWifi: true,
      socialTone: 'social',
      amenities: ['dedicated library', 'mezzanine workspace', 'kitchen', 'events'],
      priceTier: 3
    }
  ],
  resonanceSignals: {
    nightlifeOverall: 9,
    lateNightDining: 9,
    musicScene: 9,
    danceScene: 9,
    barDensity: 10,
    safetyAtNight: 6,
    socialMeetups: 8,
    waterActivities: 9,
    snowActivities: 2,
    natureAccess: 5,
    festivalCulture: 9,
    socialFriction: 8,
    soloFriendly: 8,
    expatCommunityStrength: 7
  }
};