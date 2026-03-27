<!-- src/routes/echoglaze/country/[id]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { error } from '@sveltejs/kit';
  import { loadCountry } from '$lib/echoglaze/loaders/countryLoader';
  import { loadCitiesByCountry } from '$lib/echoglaze/loaders/cityLoader';
  import CountryPageComponent from '$lib/components/echoglazeui/pages/CountryPage.svelte';
  
  let country: any = null;
  let cities: any[] = [];
  let loading = true;
  
  onMount(async () => {
    try {
      const id = $page.params.id;
      
      // Handle undefined ID
      if (!id) {
        throw error(404, 'Country ID is required');
      }
      
      const countryData = await loadCountry(id);
      if (!countryData) {
        throw error(404, 'Country not found');
      }
      country = countryData;
      
      const citiesData = await loadCitiesByCountry(country.id);
      cities = citiesData;
    } catch (err) {
      console.error('Failed to load country:', err);
      throw error(404, 'Country not found');
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <div class="inline-block animate-spin text-4xl">🌍</div>
      <p class="text-gray-600 mt-2">Loading destination...</p>
    </div>
  </div>
{:else if country}
  <CountryPageComponent 
    country={country}
    cities={cities}
  />
{/if}