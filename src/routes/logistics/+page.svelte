<!-- src/routes/echoglaze/logistics/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  let loading = true;
  
  onMount(async () => {
    // Load logistics data here
    loading = false;
  });
</script>

<div class="max-w-4xl mx-auto p-6">
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent">
      Travel Logistics
    </h1>
    <p class="text-gray-600 mt-2">Plan your flights, visas, and essential documents</p>
  </div>
  
  {#if loading}
    <div class="text-center py-12">
      <div class="animate-spin text-4xl">📋</div>
    </div>
  {:else}
    <div class="space-y-6">
      <div class="nostalgic-card p-6">
        <h2 class="text-xl font-semibold mb-4">✈️ Flight Planning</h2>
        <p class="text-gray-600">Coming soon: Flight cost comparisons and booking timing recommendations</p>
      </div>
      
      <div class="nostalgic-card p-6">
        <h2 class="text-xl font-semibold mb-4">🛂 Visa Information</h2>
        <p class="text-gray-600">Coming soon: Detailed visa requirements and application guides</p>
      </div>
      
      <div class="nostalgic-card p-6">
        <h2 class="text-xl font-semibold mb-4">📄 Essential Documents</h2>
        <p class="text-gray-600">Coming soon: Document checklists and travel insurance recommendations</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .nostalgic-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,245,0.98));
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  }
</style>