<!-- src/routes/echoglaze/saved/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  let savedItems: any[] = [];
  let loading = true;
  
  onMount(async () => {
    try {
      // Load saved items from localStorage or your backend
      const saved = localStorage.getItem('savedDestinations');
      if (saved) {
        savedItems = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load saved items:', error);
    } finally {
      loading = false;
    }
  });
  
  function removeItem(id: string) {
    savedItems = savedItems.filter(item => item.id !== id);
    localStorage.setItem('savedDestinations', JSON.stringify(savedItems));
  }
</script>

<div class="max-w-4xl mx-auto p-6">
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent">
      Saved Plans
    </h1>
    <p class="text-gray-600 mt-2">Your favorite destinations and itineraries</p>
  </div>
  
  {#if loading}
    <div class="text-center py-12">
      <div class="animate-spin text-4xl">💾</div>
    </div>
  {:else if savedItems.length === 0}
    <div class="nostalgic-card p-12 text-center">
      <span class="text-5xl mb-4 block">📌</span>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">No saved plans yet</h2>
      <p class="text-gray-600 mb-4">Start exploring destinations and save your favorites</p>
      <button 
        on:click={() => goto('/echoglaze/country')}
        class="pill-button px-6 py-2 bg-amber-500 text-white hover:bg-amber-600"
      >
        Explore Destinations
      </button>
    </div>
  {:else}
    <div class="space-y-4">
      {#each savedItems as item}
        <div class="nostalgic-card p-4 flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-lg">{item.name}</h3>
            <p class="text-sm text-gray-600">{item.type}</p>
          </div>
          <button 
            on:click={() => removeItem(item.id)}
            class="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .nostalgic-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,245,0.98));
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  }
  
  .pill-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .pill-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
</style>