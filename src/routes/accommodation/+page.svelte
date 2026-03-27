<!-- src/routes/accommodation/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { StayOption } from '$lib/schema/types';
  import { loadAllStayOptions } from '$lib/loaders/stayLoader';
  import { loadCities } from '$lib/loaders/cityLoader';
  
  // UI Components
  import StayOptionCard from '$lib/components/StayOptionCard.svelte';
  import FilterBar from '$lib/components/FilterBar.svelte';
  import ValueUpgradeBridge from '$lib/components/ValueUpgradeBridge.svelte';
  
  let stayOptions: (StayOption & { cityName: string; cityMultiplier: number })[] = [];
  let filteredOptions: (StayOption & { cityName: string; cityMultiplier: number })[] = [];
  let filters = {
    type: 'all',
    wifiMin: 3.0,
    priceTier: 'all',
    socialTone: 'all'
  };
  
  onMount(async () => {
    try {
      const options = await loadAllStayOptions();
      stayOptions = options;
      filteredOptions = options;
    } catch (error) {
      console.error('Failed to load stay options:', error);
    }
  });
  
  function applyFilters() {
    filteredOptions = stayOptions.filter(option => {
      if (filters.type !== 'all' && option.type !== filters.type) return false;
      if (filters.priceTier !== 'all' && option.priceTier.toString() !== filters.priceTier) return false;
      if (filters.socialTone !== 'all' && option.socialTone !== filters.socialTone) return false;
      return true;
    });
  }
</script>

<div class="max-w-6xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-gray-900 mb-2">🏠 Accommodation Finder</h1>
  <p class="text-gray-600 mb-8">Find hostels and coliving spaces with verified WiFi and work-friendly amenities</p>
  
  <!-- Filter Bar -->
  <FilterBar bind:filters on:change={applyFilters} />
  
  <!-- Value Upgrade Bridge (if applicable) -->
  <ValueUpgradeBridge options={filteredOptions} />
  
  <!-- Results Grid -->
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    {#each filteredOptions as option}
      <StayOptionCard {option} />
    {/each}
  </div>
  
  <!-- Empty State -->
  {#if filteredOptions.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-500">No accommodations match your filters. Try adjusting your criteria.</p>
    </div>
  {/if}
</div>