<!-- src/routes/echoglaze/city/[id]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { error } from '@sveltejs/kit';
  import { loadCity } from '$lib/echoglaze/loaders/cityLoader';
  import CityPageComponent from '$lib/components/echoglazeui/pages/CityPage.svelte';
  
  let city: any = null;
  let loading = true;
  
  onMount(async () => {
    try {
      // The param is 'id' from the folder name [id]
      const id = $page.params.id;
      
      if (!id) {
        throw error(404, 'City not found');
      }
      
      // Parse countryId and cityId from id like "japan-tokyo" or "thailand-bangkok"
      const parts = id.split('-');
      
      // Assume the last part is the cityId, everything before is the countryId
      // This handles country IDs like "united-states" correctly
      const cityId = parts.pop();
      const countryId = parts.join('-');
      
      if (!countryId || !cityId) {
        throw error(404, 'Invalid city URL');
      }
      
      const cityData = await loadCity(countryId, cityId);
      if (!cityData) {
        throw error(404, 'City not found');
      }
      city = cityData;
    } catch (err) {
      console.error('Failed to load city:', err);
      throw error(404, 'City not found');
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <div class="inline-block animate-spin text-4xl">🏙️</div>
      <p class="text-gray-600 mt-2">Loading city...</p>
    </div>
  </div>
{:else if city}
  <CityPageComponent city={city} />
{/if}