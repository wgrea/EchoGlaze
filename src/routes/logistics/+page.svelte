<!-- src/routes/logistics/+page.svelte -->
<script lang="ts">
  import { loadCountry } from '$lib/loaders/countryLoader';
  import type { Country } from '$lib/schema/types';
  import TravelReadinessCard from '$lib/components/logistics/TravelReadinessCard.svelte';
  import { COUNTRY_REGISTRY } from '$lib/data/manifest';

  // State Management - We only care about 'to' now
  let to = 'azerbaijan';
  let destinationData: Country | null = null;
  let loading = false;

  const countries = COUNTRY_REGISTRY.map(c => ({
    id: c.slug, 
    name: c.data.name, 
    icon: c.icon 
  }));

  // Reactive Statement: Re-fetch whenever destination changes
  $: if (to) updateLogistics(to);

  async function updateLogistics(dest: string) {
    loading = true;
    try {
      destinationData = await loadCountry(dest);
    } catch (e) {
      console.error('Failed to sync logistics:', e);
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-slate-50/50">
  <nav class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 shadow-sm">
    <div class="max-w-5xl mx-auto flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="text-xl">🔍</span>
        <select id="to" bind:value={to} class="bg-transparent font-bold text-indigo-600 outline-none cursor-pointer text-sm">
          {#each countries as c}
            <option value={c.id}>{c.icon} {c.name}</option>
          {/each}
        </select>
      </div>

      {#if destinationData}
        <div class="text-right">
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 block leading-none mb-1">Region</span>
          <span class="text-xs font-bold text-slate-600">{destinationData.region}</span>
        </div>
      {/if}
    </div>
  </nav>

  <main class="max-w-5xl mx-auto p-6 space-y-8">
    {#if loading}
      <div class="py-20 text-center animate-pulse">
        <div class="text-4xl mb-4">🌍</div>
        <p class="text-slate-400 font-medium">Loading entry rules and seasonal data...</p>
      </div>

    {:else if destinationData}
      <section class="space-y-6">
        <header>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">
             {destinationData.name} Logistics
          </h1>
          <p class="text-slate-500 text-xs mt-1">
            Decision-first entry rules and seasonal timing.
          </p>
        </header>

        <TravelReadinessCard
          readiness={destinationData.travelReadiness}
          countryName={destinationData.name}
        />
      </section>
    {/if}
  </main>
</div>