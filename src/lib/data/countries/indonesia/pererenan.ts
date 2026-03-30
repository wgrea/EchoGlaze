// src/lib/data/countries/indonesia/cities/pererenan.ts
export default {
  id: 'PRN',
  name: 'Pererenan',
  type: 'tech-enclave',
  costMultiplier: 1.5,
  avoidIf: [
    'Dislikes "Digital Nomad Bubble" atmospheres',
    'Sensitive to scooter traffic noise'
  ],
  safetyPattern: {
    day: 5, night: 4,
    notes: 'Safe, but watch out for "Phone snatching" while on a moving scooter.'
  },
  foodStrategy: {
    breakfast: { bestValue: "Avo Toast (The Bali Tax)", cheapest: "Warung: Nasi Jinggo" },
    lunch: { bestValue: "Warung Yess: Local buffet", cheapest: "Warung Bu Mi (Point-and-choose)" },
    dinner: { bestValue: "Shady Shack: Vegan/Healthy", cheapest: "Bakso cart" },
    healthyCheap: "Local 'Warung' buffets are the most functional way to eat healthy—cheap protein (Tempeh) and fresh greens."
  },
  wifiScore: 5,
  coworkingDensity: 10,
  stayOptions: [
    {
      id: 'tribal-bali',
      name: 'Tribal Bali',
      type: 'coworking-hostel',
      verifiedWifi: true,
      socialTone: 'productive',
      amenities: ['Custom work booths', 'No-call zones', 'Pool', 'Huge industrial workspace'],
      priceTier: 2
    }
  ],
  resonanceSignals: {
    nightlifeOverall: 8, socialMeetups: 10, waterActivities: 9, soloFriendly: 9, expatCommunityStrength: 10
  }
};