// src/lib/data/countries/indonesia/index.ts
export default {
  id: 'IDN',
  name: 'Indonesia',
  region: 'Southeast Asia',
  costTier: 'Medium-Low', // Bali/Canggu carries a 30% premium over Java
  avoidIf: [
    'Dislikes heavy scooter traffic and "Influencer" density',
    'Sensitive to volcanic activity/seismic alerts',
    'Needs high-speed walking infrastructure (Walking is difficult in Bali)'
  ],
  travelReadiness: {
    visa: {
      touristStayDays: 30, // VOA (Extendable once)
      longStayTouristVisaMonths: 2, // B211A 60-day visa
      nomadVisa: { 
        available: true, 
        name: 'E33G Remote Worker Visa',
        durationMonths: 12,
        renewable: true,
        incomeRequirement: 5000 // Roughly $60,000 USD annual
      },
      requirements: [
        'Employment contract with non-Indonesian entity',
        'Proof of $60,000 annual salary',
        'Bank statement showing $2,000+ for last 3 months',
        'Fee: ~$150 USD + ITAS processing'
      ]
    },
    seasonality: {
      cheapest: [1, 2, 11], // Peak Rainy Season
      sweetSpot: [4, 5, 9, 10],
      peak: [7, 8, 12]
    }
  },
  transportation: {
    daytime: {
      defaultMode: 'Scooter (Gojek / Grab)',
      cheapestMode: 'Bemo (Local Minibus)',
      notes: 'Gojek "Bike" is the most efficient way to bypass Canggu/Ubud traffic.'
    },
    apps: {
      rideHailing: ['Gojek', 'Grab'],
      foodDelivery: ['GoFood', 'GrabFood']
    }
  },
  resonanceSignals: {
    nightlifeOverall: 9,
    barDensity: 10,
    socialMeetups: 10,
    safetyAtNight: 7,
    expatCommunityStrength: 10
  }
};