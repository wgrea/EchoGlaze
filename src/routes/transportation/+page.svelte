<!-- src/routes/echoglaze/transportation/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { loadTransportationData } from '$lib/echoglaze/loaders/transportationLoader';
  
  let transportData: any = null;
  let loading = true;
  
  onMount(async () => {
    try {
      transportData = await loadTransportationData();
    } catch (error) {
      console.error('Failed to load transportation data:', error);
    } finally {
      loading = false;
    }
  });
</script>

<div class="max-w-4xl mx-auto p-6">
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent">
      Transportation Costs
    </h1>
    <p class="text-gray-600 mt-2">Compare local and intercity travel costs</p>
  </div>
  
  {#if loading}
    <div class="text-center py-12">
      <div class="animate-spin text-4xl">🚗</div>
    </div>
  {:else if transportData}
    <div class="space-y-6">
      <!-- Local Transport -->
      <div class="nostalgic-card p-6">
        <h2 class="text-xl font-semibold mb-4">🚌 Local Transport</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-600">Public Transport (per trip)</div>
            <div class="text-2xl font-mono">{transportData.local?.publicTransport || 'N/A'}x</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Taxi (per km)</div>
            <div class="text-2xl font-mono">{transportData.local?.taxi || 'N/A'}x</div>
          </div>
        </div>
      </div>
      
      <!-- Intercity Transport -->
      <div class="nostalgic-card p-6">
        <h2 class="text-xl font-semibold mb-4">🚆 Intercity Travel</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-600">Train (100km)</div>
            <div class="text-2xl font-mono">{transportData.intercity?.train || 'N/A'}x</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Bus (100km)</div>
            <div class="text-2xl font-mono">{transportData.intercity?.bus || 'N/A'}x</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Domestic Flight (per hour)</div>
            <div class="text-2xl font-mono">{transportData.intercity?.flight || 'N/A'}x</div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
    💡 All costs shown as multipliers. Actual prices vary by country and season.
  </div>
</div>

<style>
  .nostalgic-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,245,0.98));
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  }
</style>