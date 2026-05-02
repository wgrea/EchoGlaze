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

  onMount(async () => {
    [countries, allCities] = await Promise.all([
      loadCountries(),
      loadCities()
    ]);
  });

function handleCountryChange() {
    // 1. Wipe the city first
    selectedCityId.set('all');
    
    // 2. The bind:value on the select handles the Country store,
    // but forcing a small tick ensures the city is gone before
    // the page's filter logic re-runs.
  }
</script>
<div class="flex flex-wrap gap-4">
  <div class="flex flex-col">
    <select 
      bind:value={$selectedCountryId}
      on:change={() => selectedCityId.set('all')}
      class="px-3 py-2 border rounded-lg bg-white font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
    >
      {#if showAllOption}<option value="all">All Countries</option>{/if}
      {#each countries as country}
        <option value={country.id}>{country.icon} {country.name}</option>
      {/each}
    </select>
  </div>

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
