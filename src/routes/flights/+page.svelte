<!-- src/routes/flights/+page.svelte -->
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
  <h1 class="text-3xl font-bold text-gray-900 mb-2">✈️ Flight Costs & Timing</h1>
  <p class="text-gray-600 mb-8">Find the best seasons and flight prices for your destinations</p>
  
  {#if loading}
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
    </div>
  {:else}
    <div class="grid md:grid-cols-2 gap-6">
      {#each countries as country}
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-3">{country.name}</h2>
          {#if country.flightsSummary}
            <div class="space-y-2 text-sm">
              <p><span class="font-medium">Best time to book:</span> {country.flightsSummary.bestTimeToBook}</p>
              <p class="text-gray-600">{country.flightsSummary.notes}</p>
              {#if country.flightsSummary.fromMajorHubs}
                <div class="mt-3">
                  <p class="font-medium">From major hubs:</p>
                  <div class="mt-1 space-y-1">
                    {#each Object.entries(country.flightsSummary.fromMajorHubs).slice(0, 2) as [hub, details]}
                      <p class="text-xs text-gray-600">{hub}: ${(details as any).avgPrice} ({(details as any).duration}h)</p>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          {:else}
            <p class="text-gray-500">Flight information coming soon</p>
          {/if}
          <div class="mt-4">
            <a href={`/country/${country.id}`} class="text-orange-600 hover:text-orange-700 text-sm">
              View details →
            </a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>