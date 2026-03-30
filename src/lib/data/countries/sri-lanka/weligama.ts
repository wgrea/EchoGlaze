// src/lib/data/countries/sri-lanka/cities/weligama.ts
export default {
  id: 'WLG',
  name: 'Weligama',
  type: 'coastal-hub',
  costMultiplier: 0.8,
  avoidIf: [
    'Hates "Surf-Bros" and beach party noise',
    'Highly sensitive to humidity/salt air affecting hardware'
  ],
  safetyPattern: {
    day: 5, night: 4,
    notes: 'Very safe; mostly surf-communal. Be wary of "Tuk-Tuk price gouging" after 10 PM.'
  },
  foodStrategy: {
    breakfast: { bestValue: "Nomad Cafe: Smoothie Bowl", cheapest: "Local: Kottu Rotty (Egg/Veg)" },
    lunch: { bestValue: "Rice & Curry (Unlimited refills)", cheapest: "Street: Fish Bun / Short Eats" },
    dinner: { bestValue: "Beach BBQ: Fresh Snapper", cheapest: "Grocery: Curd + Treacle" },
    healthyCheap: "Local 'Rice & Curry' spots are the ultimate utility play—high-fiber, diverse nutrients, and under $2."
  },
  wifiScore: 5, // Plan B and Outpost have 300Mbps+ fiber
  coworkingDensity: 9,
  stayOptions: [
    {
      id: 'plan-b-weligama',
      name: 'Plan B Coworking',
      type: 'coliving',
      verifiedWifi: true,
      socialTone: 'productive',
      amenities: ['A/C workroom', 'Ergonomic chairs', 'Power backup', '500Mbps fiber'],
      priceTier: 2
    },
    {
      id: 'outpost-weligama',
      name: 'Outpost Weligama',
      type: 'hybrid',
      verifiedWifi: true,
      socialTone: 'balanced',
      amenities: ['Poolside desks', 'Focus zones', 'Community events'],
      priceTier: 2
    }
  ],
  resonanceSignals: {
    nightlifeOverall: 7, lateNightDining: 6, waterActivities: 10, natureAccess: 8, soloFriendly: 9
  }
};