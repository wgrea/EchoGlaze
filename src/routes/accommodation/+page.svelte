<!-- src/routes/accommodation/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAllStayOptions } from '$lib/loaders/stay';
  import { loadCountries } from '$lib/loaders/country';
  import { loadCities } from '$lib/loaders/city';
  import type { Country, City } from '$lib/types';
  import FilterBar from '$lib/components/accommodation/FilterBar.svelte';
  import StayOptionCard from '$lib/components/accommodation/StayOptionCard.svelte';
  import FoodStrategyCard from '$lib/components/accommodation/FoodStrategyCard.svelte';
  import GlobalLocationSelector from '$lib/components/layout/GlobalLocationSelector.svelte';
  import { selectedCountryId, selectedCityId } from '$lib/stores/location';

  // 1. Data State
  let stayOptions: any[] = [];
  let filteredOptions: any[] = [];
  let countries: Country[] = [];
  let cities: City[] = [];
  let mode: 'stay' | 'food' = 'stay';

  let filters = {
    type: 'all',
    wifiMin: 3.0,
    maxPriceTier: 'all',
    socialTone: 'all'
  };

  // 2. Reactive Helpers
  $: selectedCity = cities.find(c => c.id === $selectedCityId) || null;

  // Logic: If a city is selected (even from another page), 
  // auto-sync the country store so the filter doesn't break.
  $: if ($selectedCityId !== 'all' && cities.length > 0) {
    const cityObj = cities.find(c => c.id === $selectedCityId);
    if (cityObj && cityObj.countryId !== $selectedCountryId) {
      selectedCountryId.set(cityObj.countryId);
    }
  }

  // 3. The Master Filter Trigger
  // This block watches the data array AND the stores. 
  // It will re-fire as soon as stayOptions is populated.
  $: {
    if (stayOptions.length > 0) {
      // Accessing these values makes the block reactive to them
      $selectedCountryId;
      $selectedCityId;
      filters;
      applyFilters();
    }
  }

  onMount(async () => {
    try {
      const [optionsData, citiesData, countriesData] = await Promise.all([
        loadAllStayOptions(),
        loadCities(),
        loadCountries()
      ]);
      
      stayOptions = optionsData;
      cities = citiesData;
      countries = countriesData;
      
      // Note: The $: block above will handle the filtering once stayOptions is set
    } catch (error) {
      console.error("Failed to fetch accommodation data:", error);
    }
  });

function applyFilters() {
  // 1. Get the current selection from the store
  const selection = ($selectedCountryId || "").toString().toLowerCase().trim();
  const citySelection = ($selectedCityId || "").toString().toLowerCase().trim();

  filteredOptions = stayOptions.filter(option => {
    // 2. Flexible Country Filtering
    if (selection !== 'all') {
      // Get data from the nested city object created in stay.ts loader
      const countryId = (option.city?.countryId || "").toLowerCase();
      const countryName = (option.city?.countryName || "").toLowerCase();
      
      // We need the slug. Since stay.ts doesn't include it by default, 
      // we check against ID (QAT) and Name (Qatar). 
      // If your Logistics page saves "qatar", countryName.toLowerCase() will catch it.
      const isCountryMatch = countryId === selection || countryName === selection;
      
      if (!isCountryMatch) return false;
    }

    // 3. Flexible City Filtering
    if (citySelection !== 'all') {
      const cityId = (option.cityId || "").toLowerCase();
      const cityName = (option.cityName || "").toLowerCase();
      
      const isCityMatch = cityId === citySelection || cityName === citySelection;
      if (!isCityMatch) return false;
    }

    // 4. Existing Functional Filters
    if (filters.type !== 'all' && option.type !== filters.type) return false;
    if ((option.wifiScore ?? 0) < filters.wifiMin) return false;
    
    return true;
  });
}
  // Reactive log to track the store changing globally
  $: console.log("Current Global Store Country:", $selectedCountryId);
</script>

<div class="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
  <div class="flex-1">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">🏠 Accommodation Finder</h1>
    
    <div class="mt-6 mb-6">
      <p class="text-sm font-medium mb-2 text-slate-500">Global Location</p>
      <!-- This component handles the $selectedCountryId and $selectedCityId internally -->
      <GlobalLocationSelector level="city" />
    </div>

    <div class="flex gap-2 mb-6">
      <button
        class="px-3 py-1 rounded-lg text-sm font-bold 
          {mode === 'stay' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}"
        on:click={() => (mode = 'stay')}
      >
        Where to Stay
      </button>

      <button
        class="px-3 py-1 rounded-lg text-sm font-bold 
          {mode === 'food' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}"
        on:click={() => (mode = 'food')}
      >
        Food Strategy
      </button>
    </div>

    {#if mode === 'stay'}
      <FilterBar bind:filters on:change={applyFilters} />

      <div class="grid md:grid-cols-2 gap-6 mt-8">
        {#each filteredOptions as option}
          <StayOptionCard {option} />
        {/each}
        {#if filteredOptions.length === 0}
          <div class="col-span-full py-12 text-center text-slate-400 italic">
            No stays match the current filters.
          </div>
        {/if}
      </div>
    {:else if mode === 'food'}
      <div class="space-y-6">
        {#if selectedCity?.foodStrategy}
          <FoodStrategyCard strategy={selectedCity.foodStrategy} />
        {:else}
          <div class="p-6 bg-orange-50 rounded-xl border border-orange-100 text-center">
            <p class="text-xs text-orange-800">
              Select a specific city to see its food strategy.
            </p>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>