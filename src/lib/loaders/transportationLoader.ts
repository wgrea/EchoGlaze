// src/lib/echoglaze/loaders/transportationLoader.ts
export async function loadTransportationData() {
  // This is temporary - you'll replace with actual data loading
  return {
    local: { publicTransport: 1.0, taxi: 1.0 },
    intercity: { train: 1.0, bus: 0.8, flight: 2.0 }
  };
}