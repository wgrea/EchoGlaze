<!-- src/lib/components/layout/GlobalLocationSelector.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { selectedCountryId, selectedCityId } from '$lib/stores/location';
  import { loadCountries } from '$lib/loaders/country';
  import { loadCities } from '$lib/loaders/city';
  import type { Country, City } from '$lib/types';

  export let level: 'country' | 'city' = 'country';
  export let showAllOption = true;

  let countries: Country[] = [];
  let allCities: City[] = [];

  // Reactive filtering for the city dropdown
  $: filteredCities = $selectedCountryId === 'all' 
    ? allCities 
    : allCities.filter(c => c.countryId === $selectedCountryId);

  // Auto-reset city if it doesn't belong to the selected country
  $: if ($selectedCountryId !== 'all') {
    const currentCity = allCities.find(c => c.id === $selectedCityId);
    if (currentCity && currentCity.countryId !== $selectedCountryId) {
      selectedCityId.set('all');
    }
  }

  onMount(async () => {
    [countries, allCities] = await Promise.all([
      loadCountries(),
      loadCities()
    ]);
  });
</script>

<div class="flex flex-wrap gap-4">
  <!-- Country Selector -->
  <div class="flex flex-col">
    <select 
      bind:value={$selectedCountryId}
      class="px-3 py-2 border rounded-lg bg-white font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
    >
      {#if showAllOption}<option value="all">All Countries</option>{/if}
{#each countries as country}
  <option value={country.id}>{country.icon} {country.name}</option>
{/each}
    </select>
  </div>

  <!-- City Selector (Only shows if level is 'city') -->
  {#if level === 'city'}
    <div class="flex flex-col">
      <select 
        bind:value={$selectedCityId}
        class="px-3 py-2 border rounded-lg bg-white font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        <option value="all">All Cities</option>
        {#each filteredCities as city}
          <option value={city.id}>{city.name}</option>
        {/each}
      </select>
    </div>
  {/if}
</div>