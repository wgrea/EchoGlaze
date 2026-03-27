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
  <h1 class="text-3xl font-bold text-gray-900 mb-2">🛂 Visa Requirements</h1>
  <p class="text-gray-600 mb-8">Compare visa policies for digital nomads and travelers</p>
  
  {#if loading}
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
    </div>
  {:else}
    <div class="grid md:grid-cols-2 gap-6">
      {#each countries as country}
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-3">{country.name}</h2>
          {#if country.visaSummary}
            <div class="space-y-2 text-sm">
              <p><span class="font-medium">Type:</span> {country.visaSummary.type}</p>
              <p><span class="font-medium">Duration:</span> {country.visaSummary.duration} days</p>
              {#if country.visaSummary.extensionPossible}
                <p><span class="font-medium">Extension:</span> Possible</p>
              {/if}
              <p><span class="font-medium">Cost:</span> ${country.visaSummary.cost}</p>
              <p><span class="font-medium">Difficulty:</span> {country.visaSummary.difficulty}/10</p>
            </div>
          {:else}
            <p class="text-gray-500">Visa information coming soon</p>
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