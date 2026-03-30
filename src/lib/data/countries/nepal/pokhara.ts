// src/lib/data/countries/nepal/cities/pokhara.ts
export default {
  id: 'PKR',
  name: 'Pokhara',
  type: 'mountain-retreat',
  costMultiplier: 0.7,
  avoidIf: [
    'Requires high-speed fiber for 4K video streaming',
    'Cannot handle periodic mountain-town power load shedding'
  ],
  safetyPattern: {
    day: 5, night: 5,
    notes: 'One of the safest cities in Asia. Lakeside is very walkable at all hours.'
  },
  foodStrategy: {
    breakfast: { bestValue: "Tibetan Bread + Honey", cheapest: "Sel Roti (Rice donut)" },
    lunch: { bestValue: "Thakali Thali (High protein/quality)", cheapest: "Buff Momos (Local favorite)" },
    dinner: { bestValue: "Roadhouse Cafe: Firewood Pizza", cheapest: "Chow Mein stalls" },
    healthyCheap: "Dal Bhat (Power 24 Hour) is the literal fuel for the Himalayas. It is nutritious and always comes with free refills."
  },
  wifiScore: 3, // Needs a local Ncell SIM backup
  coworkingDensity: 5,
  stayOptions: [
    {
      id: 'pokhara-backpackers',
      name: 'Pokhara Backpackers',
      type: 'hostel',
      verifiedWifi: true,
      socialTone: 'chill',
      amenities: ['Garden workspace', 'Solar backup', 'Mountain views'],
      priceTier: 1
    }
  ],
  resonanceSignals: {
    nightlifeOverall: 5, natureAccess: 10, snowActivities: 8, soloFriendly: 10, socialMeetups: 7
  }
};