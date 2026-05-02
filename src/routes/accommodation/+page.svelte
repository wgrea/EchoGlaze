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

// 2. THE MASTER CONTROLLER
  $: {
    if (cities.length > 0 && stayOptions.length > 0) {
      const cityObj = cities.find(c => c.id === $selectedCityId);

      // STEP A: Top-Down Reset (PRIORITY)
      // If we pick a country, and the current city doesn't live there, kill the city immediately.
      if ($selectedCountryId !== 'all' && $selectedCityId !== 'all' && cityObj) {
        if (cityObj.countryId !== $selectedCountryId) {
          selectedCityId.set('all');
        }
      }

      // STEP B: Bottom-Up Sync
      // Only sync country to city if the country is currently set to 'all'.
      // This prevents the city from "dragging" the country back to the old one.
      if ($selectedCityId !== 'all' && cityObj && $selectedCountryId === 'all') {
        selectedCountryId.set(cityObj.countryId);
      }

      applyFilters();
    }
  }

  // 3. Simple Helper
  $: selectedCity = cities.find(c => c.id === $selectedCityId) || null;

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
    } catch (error) {
      console.error("Failed to fetch accommodation data:", error);
    }
  });

  function applyFilters() {
    const countrySel = ($selectedCountryId || "all").toLowerCase();
    const citySel = ($selectedCityId || "all").toLowerCase();

    filteredOptions = stayOptions.filter(opt => {
      const optCountryId = (opt.city?.countryId || opt.countryId || "").toLowerCase();
      const optCityId = (opt.cityId || "").toLowerCase();

      if (countrySel !== 'all' && optCountryId !== countrySel) return false;
      if (citySel !== 'all' && optCityId !== citySel) return false;
      if (filters.type !== 'all' && opt.type !== filters.type) return false;
      if ((opt.wifiScore ?? 0) < filters.wifiMin) return false;
      
      return true;
    });
  }
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
