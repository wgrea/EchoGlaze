// src/lib/data/countries/united-states/cities/denver.ts
export default {
  id: 'DEN',
  name: 'Denver',
  type: 'mountain',
  costMultiplier: 1.4,
  avoidIf: [
    'Sensitive to altitude',
    'Dislikes car-centric sprawl'
  ],
  safetyPattern: {
    day: 4,
    night: 2,
    notes: 'Daytime-Only Pattern — downtown safe by day, unpredictable after dark'
  },
  foodAffordability: {
    grocery: 9,
    streetFood: 6,
    diningOut: 6
  },
  wifiScore: 4,
  coworkingDensity: 4,
  englishLevel: 5,
  vibe: ['Outdoor adventure', 'Beer culture', 'Mountain gateway'],
  seasonalMultipliers: {
    winter: 1.6,
    summer: 1.2,
    shoulder: 0.9
  },
  stayOptions: [
    {
      id: 'hostel-fish',
      name: 'Hostel Fish',
      type: 'hostel',
      verifiedWifi: true,
      socialTone: 'social',
      amenities: ['24-hour business center', 'dining area', 'bar', 'events'],
      priceTier: 2
    }
  ],
  resonanceSignals: {
    nightlifeOverall: 7,
    lateNightDining: 5,
    musicScene: 8,
    danceScene: 5,
    barDensity: 7,
    safetyAtNight: 7,
    socialMeetups: 8,
    waterActivities: 3,
    snowActivities: 10,
    natureAccess: 10,
    festivalCulture: 6,
    socialFriction: 5,
    soloFriendly: 8,
    expatCommunityStrength: 4
  }
};