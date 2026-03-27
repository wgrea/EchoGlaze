<!-- src/lib/components/home/FeaturedDestinations.svelte -->
<script lang="ts">
  import type { Country } from '$lib/schema/types';
  import NomadFriendlinessBadge from '$lib/components/badges/NomadFriendlinessBadge.svelte';

  export let countries: Country[];
</script>

<div class="mb-12">
  <div class="text-center mb-6">
    <h2 class="text-2xl font-light text-gray-900">🌍 Featured Destinations</h2>
    <p class="text-gray-600 text-sm mt-1">Places loved by digital nomads</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each countries as country}
      <a href="/country/{country.id}" class="block group">
        <div class="nostalgic-card p-5 h-full transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition">
              {country.name}
            </h3>
            <span class="text-2xl">
              {country.region === 'southeast-asia' && '🌴'}
              {country.region === 'southern-europe' && '🍷'}
              {country.region === 'western-europe' && '🏰'}
              {country.region === 'east-asia' && '🍜'}
              {country.region === 'north-america' && '🗽'}
              {country.region === 'south-america' && '💃'}
            </span>
          </div>
          <p class="text-xs text-gray-500 mb-3">
            {country.region?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Various'}
          </p>
          <NomadFriendlinessBadge 
            infra={country.decisionAttributes.nomadFriendliness.infra}
            vibe={country.decisionAttributes.nomadFriendliness.vibe}
          />
          <div class="mt-3 flex gap-2 text-xs text-gray-500">
            <span>🛂 {country.visaSummary.type}</span>
            <span>•</span>
            <span>💰 {country.costTier || 'Varies'}</span>
          </div>
        </div>
      </a>
    {/each}
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
</style>