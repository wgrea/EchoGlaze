// src/lib/data/countries/sri-lanka/index.ts
export default {
  id: 'LKA',
  name: 'Sri Lanka',
  region: 'South Asia',
  costTier: 'Low',
  avoidIf: [
    'Requires 99.9% power uptime without a generator (Grid can be volatile)',
    'High sensitivity to humidity (Hard on high-end laptop cooling)',
    'Aversion to "Island Time" service speed'
  ],
  travelReadiness: {
    visa: {
      touristStayDays: 30,
      longStayTouristVisaMonths: 6,
      nomadVisa: { 
        available: true, 
        name: 'Digital Nomad Visa (Launched Feb 2026)',
        durationMonths: 12,
        renewable: true,
        incomeRequirement: 2000 // USD per month
      },
      requirements: [
        'Proof of $2,000 monthly foreign income',
        'International health insurance (Mandatory)',
        'Police clearance certificate (issued within 3 months)',
        'Fee: ~$500 USD'
      ]
    },
    seasonality: {
      cheapest: [5, 6, 9], // Inter-monsoon
      sweetSpot: [2, 3, 10], 
      peak: [12, 1] // Christmas/New Year coastal surge
    }
  },
  transportation: {
    daytime: {
      defaultMode: 'Tuk-Tuk (PickMe App)',
      cheapestMode: 'Local Bus',
      notes: 'Use the PickMe app for fixed-rate Tuk-Tuks to avoid "tourist tax" haggling.'
    },
    intercity: {
      recommended: 'Train (1st/2nd Class Observation)',
      notes: 'The Kandy-Ella-Weligama rail line is a functional masterpiece, but book 30 days ahead.'
    }
  },
  resonanceSignals: {
    natureAccess: 10,
    waterActivities: 10,
    soloFriendly: 9,
    safetyAtNight: 6,
    socialMeetups: 8
  }
};