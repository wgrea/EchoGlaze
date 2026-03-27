<!-- src/routes/country/[id]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import type { Country, City } from '$lib/schema/types';
  import { loadCountry } from '$lib/loaders/countryLoader';
  import { loadCitiesByCountry } from '$lib/loaders/cityLoader';
  import { loadVisa } from '$lib/loaders/visaLoader';
  import { loadFlights } from '$lib/loaders/flightsLoader';
  
  // UI Components
  import PersonaFitBadge from '$lib/components/PersonaFitBadge.svelte';
  import NomadFriendlinessCard from '$lib/components/NomadFriendlinessCard.svelte';
  import ResonanceSignalsChart from '$lib/components/ResonanceSignalsChart.svelte';
  import SeasonalMultiplierNote from '$lib/components/SeasonalMultiplierNote.svelte';
  import VisaSummaryCard from '$lib/components/VisaSummaryCard.svelte';
  import FlightsSummaryCard from '$lib/components/FlightsSummaryCard.svelte';
  import CityPreviewGrid from '$lib/components/CityPreviewGrid.svelte';
  
  let country: Country | null = null;
  let cities: City[] = [];
  let visa: any = null;
  let flights: any = null;
  let loading = true;
  
  onMount(async () => {
    const { id } = $page.params;
    if (!id) {
      console.error('No country ID provided');
      loading = false;
      return;
    }
    
    try {
      const [countryData, citiesData, visaData, flightsData] = await Promise.all([
        loadCountry(id),
        loadCitiesByCountry(id),
        loadVisa(id),
        loadFlights(id)
      ]);
      
      country = countryData;
      cities = citiesData;
      visa = visaData;
      flights = flightsData;
    } catch (error) {
      console.error('Failed to load country data:', error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
  </div>
{:else if country}
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">{country.name}</h1>
      <p class="text-gray-600">{country.region}</p>
    </div>
    
    <!-- Persona Fit & Avoid If -->
    <PersonaFitBadge 
      personaFit={country.personaFit} 
      avoidIf={country.decisionAttributes.avoidIf}
    />
    
    <!-- Nomad Friendliness -->
    <NomadFriendlinessCard 
      infra={country.decisionAttributes.nomadFriendliness.infra}
      vibe={country.decisionAttributes.nomadFriendliness.vibe}
      safety={country.decisionAttributes.safety}
    />
    
    <!-- Seasonal Note -->
    <SeasonalMultiplierNote 
      seasonalMultipliers={country.seasonality.seasonalMultipliers}
      bestMonths={country.seasonality.bestMonths ?? []}
    />
    
    <!-- Resonance Signals -->
    <ResonanceSignalsChart signals={country.resonanceSignals} />
    
    <!-- Key Cities -->
    <CityPreviewGrid cities={cities} countryName={country.name} />
    
    <!-- Visa & Flights -->
    <div class="grid md:grid-cols-2 gap-6 mt-8">
      <VisaSummaryCard visa={visa} />
      <FlightsSummaryCard flights={flights} />
    </div>
  </div>
{/if}