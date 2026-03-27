<!-- src/routes/country/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAllCountries } from '$lib/loaders/countryLoader';
  import type { Country } from '$lib/schema/types';
  
  let countries: Country[] = [];
  let loading = true;
  
  onMount(async () => {
    try {
      countries = await loadAllCountries();
    } catch (error) {
      console.error('Failed to load countries:', error);
    } finally {
      loading = false;
    }
  });
</script>

<div class="max-w-6xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-gray-900 mb-2">🌍 All Destinations</h1>
  <p class="text-gray-600 mb-8">Explore countries around the world</p>
  
  {#if loading}
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
    </div>
  {:else}
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each countries as country}
        <a href={`/country/${country.id}`} class="block bg-white rounded-lg shadow hover:shadow-md transition p-6">
          <h2 class="text-xl font-semibold mb-2">{country.name}</h2>
          <p class="text-gray-600 text-sm">{country.region}</p>
          <div class="mt-3 flex flex-wrap gap-2">
            {#if country.decisionAttributes?.nomadFriendliness?.infra}
              <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                Work: {country.decisionAttributes.nomadFriendliness.infra}/10
              </span>
            {/if}
            {#if country.decisionAttributes?.safety}
              <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                Safety: {country.decisionAttributes.safety}/10
              </span>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>