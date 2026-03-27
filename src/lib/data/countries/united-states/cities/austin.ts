// src/lib/data/countries/united-states/cities/austin.ts
export default {
  id: 'AUS',
  name: 'Austin',
  type: 'hub',
  costMultiplier: 1.5,
  avoidIf: [
    'Needs strong public transit',
    'Hates extreme heat/humidity'
  ],
  safetyPattern: {
    day: 4,
    night: 3,
    notes: 'Safe-Bubble Pattern — central/west safe; avoid underpasses & late-night East 6th'
  },
  foodAffordability: {
    grocery: 7,
    streetFood: 8,
    diningOut: 5
  },
  wifiScore: 5,
  coworkingDensity: 5,
  englishLevel: 5,
  vibe: ['Music-centric', 'Tech hub', 'Outdoor'],
  seasonalMultipliers: {
    winter: 1.1,
    summer: 1.2,
    shoulder: 1.4
  },
  stayOptions: [
    {
      id: 'outsite-austin',
      name: 'Outsite Austin',
      type: 'coliving',
      verifiedWifi: true,
      socialTone: 'social',
      amenities: ['central open workspace', 'in-room desks', 'community events'],
      priceTier: 2
    }
  ],
  resonanceSignals: {
    nightlifeOverall: 9,
    lateNightDining: 6,
    musicScene: 10,
    danceScene: 6,
    barDensity: 10,
    safetyAtNight: 7,
    socialMeetups: 9,
    waterActivities: 9,
    snowActivities: 1,
    natureAccess: 8,
    festivalCulture: 10,
    socialFriction: 7,
    soloFriendly: 9,
    expatCommunityStrength: 5
  }
};