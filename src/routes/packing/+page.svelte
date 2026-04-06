<!-- src/routes/packing/+page.svelte -->
<script lang="ts">
  import { loadCountry } from '$lib/loaders/countryLoader';
  import type { Country, PackingStrategy } from '$lib/types';
  import { COUNTRY_REGISTRY } from '$lib/data/manifest';
  import { GLOBAL_GAMING_LOADOUT } from '$lib/data/constants';

  console.log("PACKING PAGE HYDRATED");

  // Default to Argentina for testing since it has the new data
  let to = 'argentina'; 
  let destinationData: Country | null = null;
  let packing: PackingStrategy | null = null;
  let loading = false;

  const countries = COUNTRY_REGISTRY.map(c => ({
    id: c.slug,
    name: c.data.name,
    icon: c.icon
  }));

  $: if (to) updatePacking(to);

  async function updatePacking(dest: string) {
    loading = true;
    console.log(`DEBUG: Loading data for ${dest}...`);
    try {
      destinationData = await loadCountry(dest);
      console.log("DEBUG: Raw Country Object:", destinationData);
      
      packing = destinationData?.packing ?? null;
      console.log("DEBUG: Packing Object extracted:", packing);
    } catch (e) {
      console.error("DEBUG: Failed to load packing data:", e);
    } finally {
      loading = false;
    }
  }
</script>

<nav class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 shadow-sm">
  <div class="max-w-5xl mx-auto flex items-center justify-between gap-4">
    <div class="flex items-center gap-2">
      <span class="text-xl">🎒</span>
      <select bind:value={to} class="bg-transparent font-bold text-blue-600 outline-none cursor-pointer text-sm">
        {#each countries as c}
          <option value={c.id}>{c.icon} {c.name}</option>
        {/each}
      </select>
    </div>
  </div>
</nav>

<div class="max-w-4xl mx-auto px-4 py-12 space-y-10">
  <header>
    <h1 class="text-3xl font-bold text-slate-900 tracking-tight">🎒 Packing Strategy</h1>
    <p class="text-slate-500 mt-2">Personal gear constants meets regional constraints.</p>
  </header>

  {#if loading}
    <p class="text-slate-400 animate-pulse italic">Retrieving country-specific nuance...</p>
  {:else if packing}
    <section class="space-y-6">
      <div class="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm">
        <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          Regional Style: {destinationData?.name}
        </h3>
        <p class="text-slate-700 leading-relaxed text-lg font-medium">
          {packing.clothingStyle}
        </p>
        
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
            <span class="text-xs font-bold text-blue-600 uppercase">Airport Protocol</span>
            <p class="text-sm text-blue-900 mt-1">{packing.airportUniform}</p>
          </div>
          {#if packing.localNuance}
            <div class="p-5 bg-amber-50/50 rounded-2xl border border-amber-100">
              <span class="text-xs font-bold text-amber-600 uppercase">Local Note</span>
              <p class="text-sm text-amber-900 mt-1">{packing.localNuance}</p>
            </div>
          {/if}
        </div>

        <div class="mt-6 pt-6 border-t border-slate-100">
          <h4 class="text-xs font-bold text-slate-400 uppercase mb-3">Essential Gear</h4>
          <div class="flex flex-wrap gap-2">
            {#each packing.essentialGear as item}
              <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">{item}</span>
            {/each}
          </div>
        </div>
      </div>
    </section>
  {:else}
    <div class="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300">
      <p class="text-slate-400 text-sm">No packing data found in <strong>{to}</strong> file.</p>
      <p class="text-[10px] mt-2 text-slate-300">Check if 'packing' object is exported in the index.ts of this country.</p>
    </div>
  {/if}

    <section class="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl">
    <div class="flex items-center gap-3 mb-6">
      <span class="text-3xl">🎮</span>
      <h2 class="text-xl font-bold">Tech & Gaming Loadout</h2>
    </div>
    <ul class="grid grid-cols-1 md:grid-cols-3 gap-3">
      {#each GLOBAL_GAMING_LOADOUT.handhelds as device}
        <li class="p-3 bg-white/5 rounded-xl border border-white/10 text-sm">
          {device}
        </li>
      {/each}
    </ul>
    <div class="mt-6 pt-6 border-t border-white/10 text-xs text-slate-400">
      <p><strong>Protection:</strong> {GLOBAL_GAMING_LOADOUT.protection}</p>
      <p><strong>Power:</strong> {GLOBAL_GAMING_LOADOUT.power}</p>
    </div>
  </section>
</div>