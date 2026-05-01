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

  import { selectedCountryId, selectedCityId } from '$lib/stores/location';


  // 1. Reactive Data Hub
  $: currentCountry = countries.find(c => c.id === $selectedCountryId);
  $: currentCity = cities.find(c => c.id === $selectedCityId);

  // 2. City Filtering Logic
  // Show all cities if no country is selected, otherwise filter by country
  $: filteredCities = $selectedCountryId === 'all'
    ? cities
    : cities.filter(c => (c as any).countryId === $selectedCountryId);

  // 3. CROSS-LOGIC: Auto-reset City if it doesn't belong to the selected Country
  $: if ($selectedCountryId !== 'all' && $selectedCityId !== 'all') {
    const city = cities.find(c => c.id === $selectedCityId);
    if (city && city.countryId !== $selectedCountryId) {
      selectedCityId.set('all');
    }
  }

  // 4. CROSS-LOGIC: If a specific city is picked, sync the country store
  $: if ($selectedCityId !== 'all') {
    const city = cities.find(c => c.id === $selectedCityId);
    if (city && city.countryId !== $selectedCountryId) {
      selectedCountryId.set(city.countryId);
    }
  }

  // 2. Reactive display values
  $: countryName = currentCountry ? currentCountry.name : 'All Countries';
  $: cityName = currentCity ? currentCity.name : 'All Cities';

  // Keep these as plain variables, update them reactively
  let localCountryId = 'all';
  let localCityId = 'all';

  // 1. Sync store -> local (when user navigates or selects elsewhere)
  $: localCountryId = $selectedCountryId;
  $: localCityId = $selectedCityId;

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

  // Sync city object
  $: selectedCity = cities.find(c => c.id === $selectedCityId) || null;

// 1. WATCHERS: When the local dropdown changes, update the global store
$: if (localCountryId !== $selectedCountryId) {
  selectedCountryId.set(localCountryId);
}

$: if (localCityId !== $selectedCityId) {
  selectedCityId.set(localCityId);
}

// 2. AUTO-RESET CITY: If country changes to something new, reset city to 'all'
// This prevents being stuck in "Lahore" while the country is "Greece"
$: if ($selectedCountryId) {
  const city = cities.find(c => c.id === $selectedCityId);
  if (city && $selectedCountryId !== 'all' && city.countryId !== $selectedCountryId) {
    selectedCityId.set('all');
  }
}

  // Reactive Filter Runner
  $: {
    // This block automatically re-runs when ANY of these change
    $selectedCountryId;
    $selectedCityId;
    filters;
    
    // Only apply if data is loaded
    if (stayOptions.length > 0) {
      applyFilters();
    }
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
    
    // Force sync local proxy to current store value now that data is ready
    localCountryId = $selectedCountryId;
    localCityId = $selectedCityId;
    
    applyFilters();
  });

  function applyFilters() {
    filteredOptions = stayOptions.filter(option => {
      if ($selectedCountryId !== 'all' && option.city.countryId !== $selectedCountryId) return false;
      if ($selectedCityId !== 'all' && option.cityId !== $selectedCityId) return false;
      if (filters.type !== 'all' && option.type !== filters.type) return false;
      if ((option.wifiScore || 0) < filters.wifiMin) return false;
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
      <div class="flex flex-wrap gap-4 mt-6 mb-6">
        <div>
          <label for="country-select-stay" class="block text-sm font-medium mb-2">Select Country:</label>
{#if countries.length > 0}
<select 
  id="country-select-stay" 
  bind:value={$selectedCountryId} 
  class="px-4 py-2 border rounded-lg bg-white"
>
  <option value="all">All Countries</option>
  {#each countries as country}
    <option value={country.id}>{country.name}</option>
  {/each}
</select>
{/if}
        </div>
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
      </div>
    {/if}

    {#if mode === 'food'}
<div class="flex flex-wrap gap-4 mt-6 mb-6">
  <div>
    <label for="city-select-food" class="block text-sm font-medium mb-2">Select City:</label>
{#if cities.length > 0}
<select 
  id="city-select-food" 
  bind:value={$selectedCityId} 
  class="px-4 py-2 border rounded-lg bg-white"
>
  <option value="all">All Cities</option>
  {#each filteredCities as city}
    <option value={city.id}>{city.name}</option>
  {/each}
</select>
{/if}
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