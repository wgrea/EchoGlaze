<!-- src/lib/components/CityPreviewGrid.svelte -->
<script lang="ts">
  import type { City } from '$lib/schema/types';
  
  export let cities: City[];
  export let countryName: string;
</script>

{#if cities && cities.length > 0}
  <div class="mt-8">
    <h2 class="text-2xl font-semibold mb-4">🏙️ Cities in {countryName}</h2>
    <div class="grid md:grid-cols-2 gap-4">
      {#each cities as city}
        <a href={`/city/${city.id}`} class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
          <h3 class="text-lg font-semibold">{city.name}</h3>
          <p class="text-sm text-gray-600 mt-1">{city.vibe?.join(' • ') || ''}</p>
          <div class="mt-2 text-xs text-gray-500">
            Cost: {city.costMultiplier > 1 ? '+' : ''}{Math.round((city.costMultiplier - 1) * 100)}% vs country avg
          </div>
        </a>
      {/each}
    </div>
  </div>
{/if}