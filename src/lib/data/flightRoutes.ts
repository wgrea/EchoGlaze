// src/lib/data/flightRoutes.ts
export const flightRoutes: Record<string, Record<string, any>> = {
  'azerbaijan': {
    'united-states': {
      friction: 'medium',
      commonStops: 1,
      routingNotes: 'Long-haul flights usually transit through Istanbul or Frankfurt.',
      hubs: ['IST', 'FRA'],
      bestTimeToBook: '3 months in advance',
      lastMinuteVolatility: 'high'
    },
    'turkey': {
      friction: 'low',
      commonStops: 0,
      routingNotes: 'Short regional hop; multiple daily flights to Istanbul and Ankara.',
      hubs: ['IST', 'SAW', 'ESB'],
      bestTimeToBook: '1-2 weeks in advance',
      lastMinuteVolatility: 'low'
    }
  },
    'united-states': {
    'azerbaijan': {
      friction: 'medium',
      commonStops: 1,
      routingNotes: 'Typically requires a layover in Istanbul (IST) or Doha (DOH).',
      hubs: ['IST', 'DOH'],
      bestTimeToBook: '2-3 months in advance',
      lastMinuteVolatility: 'high'
    },
    'turkey': {
      friction: 'low',
      commonStops: 0,
      routingNotes: 'Direct flights from ORD, JFK, and LAX via Turkish Airlines.',
      hubs: ['IST'],
      bestTimeToBook: '2-3 months in advance',
      lastMinuteVolatility: 'medium'
    }
  },
  'turkey': {
    'azerbaijan': {
      friction: 'low',
      commonStops: 0,
      routingNotes: 'Very frequent regional flights between Istanbul and Baku.',
      hubs: ['IST', 'SAW'],
      bestTimeToBook: '1-2 weeks in advance',
      lastMinuteVolatility: 'low'
    },
    'united-states': {
      friction: 'low',
      commonStops: 0,
      routingNotes: 'Major gateway to North America; many direct options.',
      hubs: ['JFK', 'ORD', 'EWR'],
      bestTimeToBook: '3 months in advance',
      lastMinuteVolatility: 'medium'
    }
  }
};