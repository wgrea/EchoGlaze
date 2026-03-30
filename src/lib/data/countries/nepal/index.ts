// src/lib/data/countries/nepal/index.ts
export default {
  id: 'NPL',
  name: 'Nepal',
  region: 'South Asia',
  costTier: 'Ultra-Low',
  avoidIf: [
    'Requires "Big City" sanitation standards',
    'Cannot handle dust (Kathmandu "Dustmandu" effect)',
    'Requires high-bandwidth synchronous video calls (Zoom/Teams) daily'
  ],
  travelReadiness: {
    visa: {
      touristStayDays: 90, // Standard on-arrival options
      longStayTouristVisaMonths: 5, // 150 days per calendar year limit
      nomadVisa: { 
        available: true, 
        name: 'Digital Nomad Visa (5-Year Multiple Entry)',
        durationMonths: 12, // 1 year per entry
        renewable: true,
        incomeRequirement: 1500 // USD per month OR $20k savings
      },
      requirements: [
        'Proof of $1,500/mo income or $20,000 savings',
        'Health insurance ($100k coverage)',
        'Clean criminal record',
        'Fee: TBD (~$700 per year projected)'
      ]
    },
    seasonality: {
      cheapest: [6, 7, 8], // Monsoon (Not recommended for hiking)
      sweetSpot: [3, 4, 5], // Spring bloom
      peak: [10, 11] // Peak Visibility / Trekking Season
    }
  },
  transportation: {
    daytime: {
      defaultMode: 'Walking / Pathao (Bike Taxi)',
      cheapestMode: 'Local Bus / Micro',
      notes: 'Use Pathao for reliable, non-haggled transport in Kathmandu and Pokhara.'
    },
    intercity: {
      recommended: 'Tourist Bus (Greenline)',
      fastest: 'Domestic Flight (Kathmandu to Pokhara - 25 mins)',
      notes: 'Avoid local night buses for safety/terrain reasons.'
    }
  },
  resonanceSignals: {
    natureAccess: 10,
    hiking: 10,
    soloFriendly: 10,
    history: 10,
    nightlifeOverall: 4
  }
};