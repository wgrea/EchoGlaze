<!-- src/routes/accommodation/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAllStayOptions } from '$lib/loaders/stayLoader';
  import { loadCountries } from '$lib/loaders/countryLoader';
  import { loadCities } from '$lib/loaders/cityLoader';
  import type { Country, City } from '$lib/schema/types';
  
  import FilterBar from '$lib/components/accommodation/FilterBar.svelte';
  import StayOptionCard from '$lib/components/accommodation/StayOptionCard.svelte';
  import FoodStrategyCard from '$lib/components/accommodation/FoodStrategyCard.svelte';

  // 1. State Declarations
  let stayOptions: any[] = [];
  let filteredOptions: any[] = [];
  let countries: Country[] = [];
  let cities: City[] = [];
  
  let selectedCountryId = 'all';
  let selectedCityId = 'all';
  let selectedCity: City | null = null;
  let mode: 'stay' | 'food' = 'stay';

  let filters = {
    type: 'all',
    wifiMin: 3.0,
    maxPriceTier: 'all',
    socialTone: 'all'
  };

  // 2. Reactive Logic (The "Engine")
  
  // Filter the city dropdown based on country
  $: filteredCities = selectedCountryId === 'all'
    ? cities
    : cities.filter(c => (c as any).countryId === selectedCountryId);

  // Sync selectedCity object when ID changes
  $: selectedCity = cities.find(c => c.id === selectedCityId) || null;

  // Reset City when Country changes to show ALL hostels for that country
  $: if (selectedCountryId) {
    selectedCityId = 'all'; 
  }

  // Run the filter automatically whenever any selection or filter changes
  $: {
    // Reference dependencies
    selectedCountryId; 
    selectedCityId; 
    filters; 
    
    if (stayOptions.length > 0) {
      applyFilters();
    }
  }

  // 3. Functions
  function applyFilters() {
    filteredOptions = stayOptions.filter(option => {
      // Country check
      if (selectedCountryId !== 'all' && option.city.countryId !== selectedCountryId)
        return false;

      // City check
      if (selectedCityId !== 'all' && option.cityId !== selectedCityId)
        return false;

      // Type check
      if (filters.type !== 'all' && option.type !== filters.type)
        return false;

      // WiFi check
      if ((option.wifiScore || 0) < filters.wifiMin)
        return false;

      // Price Tier check
      if (filters.maxPriceTier !== 'all') {
        const maxTier = parseInt(filters.maxPriceTier);
        if (option.priceTier > maxTier) return false;
      }

      return true;
    });
  }

  onMount(async () => {
    const [optionsData, citiesData, countriesData] = await Promise.all([
      loadAllStayOptions(),
      loadCities(),
      loadCountries()
    ]);

    stayOptions = optionsData;
    cities = citiesData;
    countries = countriesData;
    // Initial run
    applyFilters();
  });
</script>

<div class="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
  
  <div class="flex-1">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">🏠 Accommodation Finder</h1>
    <p class="text-gray-600 mb-8">Verified WiFi for digital nomads</p>
    
    <!-- Toggle -->
    <div class="flex gap-2 mb-6">
      <button
        class="px-3 py-1 rounded-lg text-sm font-bold 
          {mode === 'stay' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}"
        on:click={() => mode = 'stay'}
      >
        Where to Stay
      </button>

      <button
        class="px-3 py-1 rounded-lg text-sm font-bold 
          {mode === 'food' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}"
        on:click={() => mode = 'food'}
      >
        Food Strategy
      </button>
    </div>


{#if mode === 'stay'}
  <FilterBar bind:filters on:change={applyFilters} />

  <!-- Location Selector BELOW filters -->
<div class="flex flex-wrap gap-4 mt-6 mb-6">
  <div>
    <label for="country-select-stay" class="block text-sm font-medium mb-2">Select Country:</label>
    <select 
      id="country-select-stay" 
      bind:value={selectedCountryId} 
      class="px-4 py-2 border rounded-lg bg-white"
    >
      <option value="all">All Countries</option>
      {#each countries as country}
        <option value={country.id}>{country.name}</option>
      {/each}
    </select>
  </div>
  
  </div>

  <div class="grid md:grid-cols-2 gap-6 mt-8">
    {#each filteredOptions as option}
      <StayOptionCard {option} />
    {/each}
  </div>
{/if}


{#if mode === 'food'}
  <div class="flex flex-wrap gap-4 mt-6 mb-6">
    <div>
      <label for="country-select-food" class="block text-sm font-medium mb-2">Select Country:</label>
      <select 
        id="country-select-food" 
        bind:value={selectedCountryId} 
        class="px-4 py-2 border rounded-lg bg-white"
      >
        <option value="all">All Countries</option>
        {#each countries as country}
          <option value={country.id}>{country.name}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="city-select-food" class="block text-sm font-medium mb-2">Select City:</label>
      <select 
        id="city-select-food" 
        bind:value={selectedCityId} 
        class="px-4 py-2 border rounded-lg bg-white"
      >
        <option value="all">All Cities</option>
        {#each filteredCities as city}
          <option value={city.id}>{city.name}</option>
        {/each}
      </select>
    </div>
  </div>

  {#if selectedCity?.foodStrategy}
    <FoodStrategyCard strategy={selectedCity.foodStrategy} />
  {:else}
    <div class="p-6 bg-orange-50 rounded-xl border border-orange-100 text-center mt-8">
      <p class="text-xs text-orange-800">
        Select a city to see where to find the healthiest & cheapest meals.
      </p>
    </div>
  {/if}
{/if}





  </div>
</div>
