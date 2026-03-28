<!-- src/routes/accommodation/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAllStayOptions } from '$lib/loaders/stayLoader';
  import { loadCities } from '$lib/loaders/cityLoader';
  import type { City } from '$lib/schema/types';
  
  import FilterBar from '$lib/components/accommodation/FilterBar.svelte';
  import StayOptionCard from '$lib/components/accommodation/StayOptionCard.svelte';
  import FoodStrategyCard from '$lib/components/accommodation/FoodStrategyCard.svelte';

  let stayOptions: any[] = [];
  let filteredOptions: any[] = [];
  let cities: City[] = [];
  let selectedCity: City | null = null;
  let selectedCityId = 'all';

  let filters = {
    type: 'all',
    wifiMin: 3.0,
    maxPriceTier: 'all',
    socialTone: 'all'
  };

  onMount(async () => {
    const [optionsData, citiesData] = await Promise.all([
      loadAllStayOptions(),
      loadCities()
    ]);
    stayOptions = optionsData;
    filteredOptions = optionsData;
    cities = citiesData;
  });

  $: if (selectedCityId) {
    selectedCity = cities.find(c => c.id === selectedCityId) || null;
    applyFilters();
  }

function applyFilters() {
  filteredOptions = stayOptions.filter(option => {
    // 1. City Filter
    if (selectedCityId !== 'all' && option.cityId !== selectedCityId) return false;
    
    // 2. Type Check
    if (filters.type !== 'all' && option.type !== filters.type) return false;
    
    // 3. WiFi Check 
    // IMPORTANT: If the option doesn't have a score, use the city's score
    // Since we added 'cityId' to the option, we can find the city's score
    const city = cities.find(c => c.id === option.cityId);
    const wifiValue = option.wifiScore || city?.wifiScore || 0; 
    
    if (wifiValue < filters.wifiMin) return false;
    
    // 4. Price Tier
    if (filters.maxPriceTier !== 'all') {
      const maxTier = parseInt(filters.maxPriceTier);
      if (option.priceTier > maxTier) return false;
    }
    
    return true;
  });
}
</script>

<div class="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
  
  <div class="flex-1">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">🏠 Accommodation Finder</h1>
    <p class="text-gray-600 mb-8">Verified WiFi for digital nomads</p>
    
    <FilterBar bind:filters on:change={applyFilters} />
    
    <div class="grid md:grid-cols-2 gap-6 mt-8">
      {#each filteredOptions as option}
        <StayOptionCard {option} />
      {/each}
    </div>
  </div>

  <aside class="w-full lg:w-80 space-y-6">
<div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
  <label for="city-selector" class="block text-[10px] font-bold text-gray-400 uppercase mb-2">
    Select Location
  </label>
  <select 
    id="city-selector" 
    bind:value={selectedCityId} 
    class="w-full p-2 border rounded-lg bg-white text-sm"
  >
    <option value="all">All Cities (Global View)</option>
    {#each cities as city}
      <option value={city.id}>{city.name}</option>
    {/each}
  </select>
</div>

    {#if selectedCity?.foodStrategy}
      <FoodStrategyCard strategy={selectedCity.foodStrategy} />
    {:else}
      <div class="p-6 bg-orange-50 rounded-xl border border-orange-100 text-center">
        <p class="text-xs text-orange-800">Select a city to see where to find the healthiest & cheapest meals.</p>
      </div>
    {/if}
  </aside>
</div>