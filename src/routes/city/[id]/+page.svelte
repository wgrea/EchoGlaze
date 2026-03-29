<!-- src/routes/city/[id]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import type { City, Country, StayOption } from '$lib/schema/types';
  import { loadCity } from '$lib/loaders/cityLoader';
  import { loadCountry } from '$lib/loaders/countryLoader';
  import { loadStayOptions } from '$lib/loaders/stayLoader';
  
  // UI Components
  import WifiBadge from '$lib/components/city/WifiBadge.svelte';
  import CoworkingDensityDisplay from '$lib/components/city/CoworkingDensityDisplay.svelte';
  import SafetyPatternDisplay from '$lib/components/city/SafetyPatternDisplay.svelte';
  import CostComparison from '$lib/components/city/CostComparison.svelte';

  import FoodStrategyCard from '$lib/components/city/FoodStrategyCard.svelte';
  import SimCardInfo from '$lib/components/city/SimCardInfo.svelte';
  import ResonanceSignalsChart from '$lib/components/country/ResonanceSignalsChart.svelte';
  import SeasonalMultiplierNote from '$lib/components/country/SeasonalMultiplierNote.svelte';
  
  let city: City | null = null;
  let country: Country | null = null;
  let stayOptions: StayOption[] = [];
  let loading = true;
  
  onMount(async () => {
    const { id } = $page.params;
    if (!id) {
      console.error('No city ID provided');
      loading = false;
      return;
    }
    
    try {
      const cityData = await loadCity(id);
      if (cityData) {
        const [countryData, stayData] = await Promise.all([
          loadCountry(cityData.countryId),
          loadStayOptions(id)
        ]);
        city = cityData;
        country = countryData;
        stayOptions = stayData;
      }
    } catch (error) {
      console.error('Failed to load city data:', error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
  </div>
{:else if city && country}
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Header with breadcrumb -->
    <div class="mb-6">
      <a href={`/country/${country.id}`} class="text-orange-600 hover:text-orange-700">
        ← {country.name}
      </a>
      <h1 class="text-4xl font-bold text-gray-900 mt-2">{city.name}</h1>
      <div class="flex gap-2 mt-2">
        <span class="px-2 py-1 bg-gray-100 rounded text-sm">{city.type}</span>
        {#each city.vibe as vibe}
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">{vibe}</span>
        {/each}
      </div>
    </div>
    
    <!-- Avoid If -->
    {#if city.avoidIf && city.avoidIf.length}
      <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h3 class="font-semibold text-amber-800 mb-2">⚠️ Avoid If</h3>
        <ul class="list-disc list-inside text-amber-700">
          {#each city.avoidIf as reason}
            <li>{reason}</li>
          {/each}
        </ul>
      </div>
    {/if}
    
    <!-- Workability Section -->
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">💻 Workability</h2>
        <div class="space-y-4">
          <WifiBadge score={city.wifiScore} />
          <CoworkingDensityDisplay density={city.coworkingDensity} />
          <div>
            <span class="font-medium">English Level:</span>
            <div class="mt-1">
              <div class="h-2 bg-gray-200 rounded">
                <div class="h-2 bg-green-500 rounded" style="width: {((city.englishLevel ?? 0) * 10)}%"></div>
              </div>
              <p class="text-sm text-gray-600 mt-1">
                {city.englishLevel === undefined ? 'No data' : 
                  city.englishLevel >= 8 ? 'Fluent' : 
                  city.englishLevel >= 6 ? 'Conversational' : 
                  city.englishLevel >= 4 ? 'Basic' : 'Limited'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Safety Pattern -->
      <SafetyPatternDisplay safety={city.safetyPattern} />
    </div>

    <!-- Cost & Seasonal Info -->
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <CostComparison cityMultiplier={city.costMultiplier} />
      <SeasonalMultiplierNote 
        seasonalMultipliers={city.seasonalMultipliers}
        bestMonths={city.sweetSpotMonths ?? []}
      />
    </div>
    
    <!-- Resonance Signals -->
    <ResonanceSignalsChart signals={city.resonanceSignals} />
    
    <!-- Food Strategy -->
    <FoodStrategyCard foodAffordability={city.foodAffordability} />
    
    <!-- SIM Cards -->
    <SimCardInfo />
  
  </div>
{/if}