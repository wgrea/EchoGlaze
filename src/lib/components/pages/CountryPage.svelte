<!-- src/lib/components/echoglazeui/pages/CountryPage.svelte -->
<script lang="ts">
  import type { Country, City } from '$lib/echoglaze/schema/types';
  import WifiBadge from '../badges/WifiBadge.svelte';
  import NomadFriendlinessBadge from '../badges/NomadFriendlinessBadge.svelte';
  import ValueComparison from '../comparisons/ValueComparison.svelte';
  import CoworkingDensityDisplay from '../displays/CoworkingDensityDisplay.svelte';
  import SeasonalityNote from '../displays/SeasonalityNote.svelte';
  import StayOptionCard from '../cards/StayOptionCard.svelte';
  
  export let country: Country;
  export let cities: City[];
  // Removed unused costs prop
  
  // UI Rule: Baseline filter - never render cities with WiFi below 3.0
  $: viableCities = cities.filter(city => (city.wifiScore || 0) >= 3.0);
  
  // Sort cities by cost multiplier for value comparisons
  $: sortedCities = [...viableCities].sort((a, b) => (a.costMultiplier || 0) - (b.costMultiplier || 0));
</script>

<!-- Rest of the component remains the same -->

<div class="max-w-6xl mx-auto p-6">
  <!-- Header with nostalgic styling -->
  <div class="nostalgic-header mb-8">
    <h1 class="text-4xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent">
      {country.name}
    </h1>
    <p class="text-gray-600 mt-2">{country.region}</p>
  </div>
  
  <!-- Decision Attributes Grid -->
  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="nostalgic-card p-6">
      <h2 class="text-xl font-semibold mb-4">💼 Work & Live</h2>
      <NomadFriendlinessBadge 
        infra={country.decisionAttributes.nomadFriendliness.infra}
        vibe={country.decisionAttributes.nomadFriendliness.vibe}
      />
      <div class="mt-4">
        <WifiBadge score={cities[0]?.wifiScore} />
      </div>
    </div>
    
    <div class="nostalgic-card p-6">
      <h2 class="text-xl font-semibold mb-4">📋 Quick Facts</h2>
      <div class="space-y-2">
        <div>🛂 Visa: {country.visaSummary.type} ({country.visaSummary.duration} days)</div>
        <div>💰 Cost Tier: {country.costTier || 'Varies by city'}</div>
        <div>⚠️ Avoid if: {country.decisionAttributes.avoidIf.join(', ')}</div>
      </div>
    </div>
  </div>
  
  <!-- Seasonality Note -->
  <SeasonalityNote seasonality={country.seasonality} />
  
  <!-- Cities Section with Value Comparisons -->
  <div class="mt-8">
    <h2 class="text-2xl font-semibold mb-4">🏙️ Cities Worth Exploring</h2>
    <div class="grid md:grid-cols-2 gap-6">
      {#each sortedCities as city, index}
        <div class="nostalgic-card p-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold">{city.name}</h3>
              <div class="text-sm text-gray-600">{city.type}</div>
            </div>
            <div class="text-right">
              <div class="font-mono">Multiplier: {city.costMultiplier}x</div>
              <div class="text-xs text-gray-500">vs country baseline</div>
            </div>
          </div>
          
          <!-- Value Comparison with cheapest city -->
          {#if index === 0 && sortedCities.length > 1}
            <ValueComparison 
              cityName={city.name}
              cityMultiplier={city.costMultiplier || 1}
              referenceCityName={sortedCities[sortedCities.length - 1].name}
              referenceMultiplier={sortedCities[sortedCities.length - 1].costMultiplier || 1}
            />
          {/if}
          
          <div class="mt-3">
            <CoworkingDensityDisplay density={city.coworkingDensity} />
          </div>
          
          <!-- Stay Options -->
          {#if city.stayOptions?.length}
            <div class="mt-3">
              <h4 class="font-medium text-sm mb-2">Accommodation Options</h4>
              <div class="space-y-2">
                {#each city.stayOptions.slice(0, 2) as option}
                  <StayOptionCard 
                    option={option}
                  />
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Resonance Signals -->
  {#if country.resonanceSignals}
    <div class="mt-8 nostalgic-card p-6">
      <h2 class="text-xl font-semibold mb-4">✨ What Makes This Place Special</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div class="text-sm text-gray-600">Nightlife</div>
          <div class="font-semibold">{country.resonanceSignals.nightlifeOverall}/10</div>
        </div>
        <div>
          <div class="text-sm text-gray-600">Nature Access</div>
          <div class="font-semibold">{country.resonanceSignals.natureAccess}/10</div>
        </div>
        <div>
          <div class="text-sm text-gray-600">Social Meetups</div>
          <div class="font-semibold">{country.resonanceSignals.socialMeetups}/10</div>
        </div>
        <div>
          <div class="text-sm text-gray-600">Expat Community</div>
          <div class="font-semibold">{country.resonanceSignals.expatCommunityStrength}/10</div>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Price Data Note -->
  <div class="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
    💡 Note: Actual price data is intended to be removed since it will be inaccurate shortly after updates, 
    but this app is still intended to be a budgeting tool. Use multipliers and comparisons for relative cost understanding.
  </div>
</div>

<style>
  .nostalgic-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,245,0.98));
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05);
    backdrop-filter: blur(2px);
    transition: all 0.2s ease;
  }
  
  .nostalgic-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.05);
  }
  
  /* Removed unused .pill-badge selector */
</style>