<!-- src/lib/components/logistics/CountryView.svelte -->
<script lang="ts">
  import type { Country } from '$lib/types';
  import TravelReadinessCard from '$lib/components/logistics/TravelReadinessCard.svelte';

  export let data: Country;
  export let countries: { id: string; name: string; icon: string }[];
  export let to: string;
</script>

<div class="space-y-8 animate-in fade-in duration-300">

    <header>
  <select 
    bind:value={to} 
    class="bg-transparent font-bold text-indigo-600 text-sm outline-none"
  >
    {#each countries as c}
      <option value={c.id}>{c.icon} {c.name}</option>
    {/each}
  </select>


    <p class="text-slate-500 text-sm italic">Region: {data.region}</p>
  </header>

  <TravelReadinessCard 
    readiness={data.travelReadiness} 
    countryName={data.name} 
  />

  <a href="/transportation" class="p-6 bg-white rounded-xl border flex items-center gap-6 hover:shadow-lg transition-all group">
    <span class="text-3xl group-hover:scale-110 transition-transform">🚗</span>
    <div>
      <p class="font-bold text-slate-900 text-lg">Transportation Strategy</p>
      <p class="text-sm text-slate-500">Mobility, safety, and essential apps for {data.name}.</p>
    </div>
  </a>

</div>
