<!-- src/routes/accommodation/+page.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAllStayOptions } from '$lib/loaders/stayLoader';
  import { loadCountries } from '$lib/loaders/countryLoader';
  import { loadCities } from '$lib/loaders/cityLoader';
  import type { Country } from '$lib/schema/types';
  import type { City } from '$lib/schema/types';
  
  import FilterBar from '$lib/components/accommodation/FilterBar.svelte';
  import StayOptionCard from '$lib/components/accommodation/StayOptionCard.svelte';
  import FoodStrategyCard from '$lib/components/accommodation/FoodStrategyCard.svelte';

  let stayOptions: any[] = [];
  let filteredOptions: any[] = [];
  let countries: Country[] = [];
  let cities: City[] = [];
  let selectedCity: City | null = null;
  let selectedCountryId = 'all';
  let selectedCityId = 'all';

  $: filteredCities = selectedCountryId === 'all'
    ? cities
    : cities.filter(c => c.countryId === selectedCountryId);

  let filters = {
    type: 'all',
    wifiMin: 3.0,
    maxPriceTier: 'all',
    socialTone: 'all'
  };

  let mode: 'stay' | 'food' = 'stay';


  onMount(async () => {
    const [optionsData, citiesData, countriesData] = await Promise.all([
      loadAllStayOptions(),
      loadCities(),
      loadCountries()
    ]);

    stayOptions = optionsData;
    filteredOptions = optionsData;
    cities = citiesData;
    countries = countriesData;
  });

  $: if (selectedCityId) {
    selectedCity = cities.find(c => c.id === selectedCityId) || null;
    applyFilters();
  }

function applyFilters() {
  filteredOptions = stayOptions.filter(option => {
    // Country filter
if (selectedCountryId !== 'all' && option.city.countryId !== selectedCountryId)
  return false;


    // City filter
    if (selectedCityId !== 'all' && option.cityId !== selectedCityId)
      return false;

    // Type filter
    if (filters.type !== 'all' && option.type !== filters.type)
      return false;

    // WiFi filter
    if ((option.wifiScore || 0) < filters.wifiMin)
      return false;

    // Price tier filter
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
      <label class="block text-sm font-medium mb-2">Select Country:</label>
      <select bind:value={selectedCountryId} class="px-4 py-2 border rounded-lg bg-white">
        <option value="all">All Countries</option>
        {#each countries as country}
          <option value={country.id}>{country.name}</option>
        {/each}
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Select City:</label>
      <select bind:value={selectedCityId} class="px-4 py-2 border rounded-lg bg-white">
        <option value="all">All Cities</option>
        {#each filteredCities as city}
          <option value={city.id}>{city.name}</option>
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
  <!-- Location Selector ABOVE food strategy -->
  <div class="flex flex-wrap gap-4 mt-6 mb-6">
    <div>
      <label class="block text-sm font-medium mb-2">Select Country:</label>
      <select bind:value={selectedCountryId} class="px-4 py-2 border rounded-lg bg-white">
        <option value="all">All Countries</option>
        {#each countries as country}
          <option value={country.id}>{country.name}</option>
        {/each}
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Select City:</label>
      <select bind:value={selectedCityId} class="px-4 py-2 border rounded-lg bg-white">
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
