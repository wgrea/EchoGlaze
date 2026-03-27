<!-- src/lib/components/echoglazeui/pages/CityPage.svelte -->
<script lang="ts">
  import type { City } from '$lib/echoglaze/schema/types';
  import WifiBadge from '../badges/WifiBadge.svelte';
  import CoworkingDensityDisplay from '../displays/CoworkingDensityDisplay.svelte';
  import StayOptionCard from '../cards/StayOptionCard.svelte';
  
  export let city: City;
  
  // UI Rule: Don't render if WiFi below 3.0
  $: showWarning = (city.wifiScore || 0) < 3.0;
</script>

{#if showWarning}
  <div class="max-w-4xl mx-auto p-6">
    <div class="nostalgic-card p-8 text-center bg-red-50/50">
      <span class="text-5xl mb-4 block">⚠️</span>
      <h1 class="text-2xl font-semibold text-gray-800 mb-2">Work Not Recommended</h1>
      <p class="text-gray-600">
        This city has a WiFi score below 3.0, making it unreliable for remote work.
        Consider visiting for leisure instead.
      </p>
    </div>
  </div>
{:else}
  <div class="max-w-4xl mx-auto p-6">
    <!-- City Header -->
    <div class="nostalgic-card p-6 mb-6">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent">
            {city.name}
          </h1>
          <p class="text-gray-600 mt-1 capitalize">{city.type}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-mono">{city.costMultiplier}x</div>
          <div class="text-xs text-gray-500">vs country baseline</div>
        </div>
      </div>
      
      <!-- Vibe tags -->
      {#if city.vibe?.length}
        <div class="flex flex-wrap gap-2 mt-4">
          {#each city.vibe as vibe}
            <span class="px-2 py-1 bg-amber-50 rounded-full text-xs text-amber-700">
              {vibe}
            </span>
          {/each}
        </div>
      {/if}
    </div>
    
    <!-- Work & Connectivity Section -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div class="nostalgic-card p-6">
        <h2 class="text-xl font-semibold mb-4">💻 Work Connectivity</h2>
        <div class="space-y-4">
          <div>
            <div class="text-sm text-gray-600 mb-1">WiFi Reliability</div>
            <WifiBadge score={city.wifiScore} />
          </div>
          <CoworkingDensityDisplay density={city.coworkingDensity} />
          {#if city.englishLevel}
            <div>
              <div class="text-sm text-gray-600 mb-1">English Level</div>
              <div class="flex items-center gap-2">
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-amber-500 rounded-full" style="width: {city.englishLevel * 10}%"></div>
                </div>
                <span class="text-sm font-medium">{city.englishLevel}/10</span>
              </div>
            </div>
          {/if}
        </div>
      </div>
      
      <div class="nostalgic-card p-6">
        <h2 class="text-xl font-semibold mb-4">💰 Cost Breakdown</h2>
        <div class="space-y-3">
          <div>
            <div class="text-sm text-gray-600">Groceries</div>
            <div class="font-mono">{(city.foodAffordability?.grocery || 0) * city.costMultiplier}x multiplier</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Street Food</div>
            <div class="font-mono">{(city.foodAffordability?.streetFood || 0) * city.costMultiplier}x multiplier</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Dining Out</div>
            <div class="font-mono">{(city.foodAffordability?.diningOut || 0) * city.costMultiplier}x multiplier</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Safety Section -->
    <div class="nostalgic-card p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">🛡️ Safety Pattern</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="text-sm text-gray-600">Daytime Safety</div>
          <div class="text-2xl font-bold">{city.safetyPattern?.day || 0}/10</div>
        </div>
        <div>
          <div class="text-sm text-gray-600">Nighttime Safety</div>
          <div class="text-2xl font-bold">{city.safetyPattern?.night || 0}/10</div>
        </div>
      </div>
      {#if city.safetyPattern?.notes}
        <p class="text-sm text-gray-500 mt-3">{city.safetyPattern.notes}</p>
      {/if}
    </div>
    
    <!-- Stay Options -->
    {#if city.stayOptions?.length}
      <div class="nostalgic-card p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">🏠 Accommodation Options</h2>
        <div class="space-y-3">
          {#each city.stayOptions as option}
            <StayOptionCard option={option} />
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Avoid If Section -->
    {#if city.avoidIf?.length}
      <div class="nostalgic-card p-6 bg-amber-50/50">
        <h2 class="text-xl font-semibold mb-3">⚠️ Consider Avoiding If</h2>
        <ul class="list-disc list-inside space-y-1 text-gray-700">
          {#each city.avoidIf as reason}
            <li>{reason}</li>
          {/each}
        </ul>
      </div>
    {/if}
    
    <!-- Price Note -->
    <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
      💡 All costs shown as multipliers against country baseline for long-term accuracy.
    </div>
  </div>
{/if}

<style>
  .nostalgic-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,245,0.98));
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05);
    backdrop-filter: blur(2px);
  }
</style>