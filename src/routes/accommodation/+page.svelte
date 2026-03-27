<!-- src/routes/echoglaze/accommodation/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAccommodationOptions } from '$lib/echoglaze/loaders/accommodationLoader';
  import StayOptionCard from '$lib/components/echoglazeui/cards/StayOptionCard.svelte';
  
  let accommodations: any[] = [];
  let loading = true;
  let filterType: string = 'all';
  
  onMount(async () => {
    try {
      accommodations = await loadAccommodationOptions();
    } catch (error) {
      console.error('Failed to load accommodations:', error);
    } finally {
      loading = false;
    }
  });
  
  $: filtered = filterType === 'all' 
    ? accommodations 
    : accommodations.filter(a => a.type === filterType);
</script>

<div class="max-w-6xl mx-auto p-6">
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent">
      Accommodation Options
    </h1>
    <p class="text-gray-600 mt-2">Find the perfect place to stay based on your work style</p>
  </div>
  
  <div class="flex gap-3 justify-center mb-8">
    <button 
      on:click={() => filterType = 'all'}
      class="pill-button {filterType === 'all' ? 'bg-amber-500 text-white' : 'bg-white'}"
    >
      All
    </button>
    <button 
      on:click={() => filterType = 'hostel'}
      class="pill-button {filterType === 'hostel' ? 'bg-amber-500 text-white' : 'bg-white'}"
    >
      🎒 Hostel Spot
    </button>
    <button 
      on:click={() => filterType = 'coliving'}
      class="pill-button {filterType === 'coliving' ? 'bg-amber-500 text-white' : 'bg-white'}"
    >
      💼 Coliving Hub
    </button>
  </div>
  
  {#if loading}
    <div class="text-center py-12">
      <div class="animate-spin text-4xl">🏠</div>
    </div>
  {:else}
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filtered as option}
        <StayOptionCard option={option} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .pill-button {
    padding: 0.5rem 1.5rem;
    border-radius: 9999px;
    font-weight: 500;
    transition: all 0.2s;
    border: 1px solid #f59e0b20;
  }
  .pill-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
</style>