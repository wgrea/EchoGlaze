<!-- src/routes/logistics/+page.svelte -->
<script lang="ts">
  import { loadCountry } from '$lib/loaders/countryLoader';
  import type { Country } from '$lib/schema/types';

  import TravelReadinessCard from '$lib/components/country/TravelReadinessCard.svelte';

  let from = 'united-states';
  let to = 'azerbaijan';
  let destinationData: Country | null = null;
  let loading = false;

  const countries = [
    { id: 'united-states', name: 'United States', icon: '🇺🇸' },
    { id: 'azerbaijan', name: 'Azerbaijan', icon: '🇦🇿' },
    { id: 'turkey', name: 'Turkey', icon: '🇹🇷' } // <-- ADD THIS
  ];

  $: if (from && to) updateLogistics(from, to);

  async function updateLogistics(origin: string, dest: string) {
    if (origin === dest) {
      destinationData = null;
      return;
    }
    loading = true;
    try {
      const c = await loadCountry(dest);
      destinationData = c;
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }

  function formatName(str: string) {
    return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  function swap() {
    const temp = from;
    from = to;
    to = temp;
  }
</script>

<div class="min-h-screen bg-slate-50/50">
  <nav class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 shadow-sm">
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4 w-full md:w-auto">
        <div class="flex-1">
          <label for="from" class="text-[10px] font-bold uppercase tracking-tighter text-slate-400 block mb-1">
            Origin
          </label>
          <select id="from" bind:value={from} class="bg-transparent font-semibold text-slate-700 outline-none cursor-pointer">
            {#each countries as c}
              <option value={c.id}>{c.icon} {c.name}</option>
            {/each}
          </select>
        </div>

        <button
          type="button"
          class="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 text-xs hover:bg-slate-50 hover:text-slate-700 transition"
          on:click={swap}
          aria-label="Swap origin and destination"
        >
          ⇄
        </button>

        <div class="flex-1 text-right md:text-left">
          <label for="to" class="text-[10px] font-bold uppercase tracking-tighter text-slate-400 block mb-1">
            Destination
          </label>
          <select id="to" bind:value={to} class="bg-transparent font-semibold text-indigo-600 outline-none cursor-pointer">
            {#each countries as c}
              <option value={c.id}>{c.icon} {c.name}</option>
            {/each}
          </select>
        </div>
      </div>

      {#if destinationData}
        <div class="hidden md:block text-right">
          <span class="text-xs font-medium text-slate-400 block">Region</span>
          <span class="text-sm font-bold text-slate-800">{destinationData.region}</span>
        </div>
      {/if}
    </div>
  </nav>

  <main class="max-w-5xl mx-auto p-6 space-y-8">
    {#if from === to}
      <div class="py-20 text-center space-y-4">
        <div class="text-4xl">📍</div>
        <h2 class="text-xl font-bold text-slate-400">Please select a different destination.</h2>
        <p class="text-slate-400 text-sm">Domestic logistics are coming in a future update.</p>
      </div>
    {:else if loading}
      <div class="py-20 text-center animate-pulse">
        <div class="text-4xl mb-4">✈️</div>
        <p class="text-slate-400 font-medium">Syncing flight patterns and visa rules...</p>
      </div>
    {:else if destinationData}
      <section class="space-y-6">
        <header class="space-y-2">
          <h1 class="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            {formatName(from)} <span class="text-indigo-500">to</span> {destinationData.name}
          </h1>
          <p class="text-slate-500 text-sm">
            A decision-first view of entry rules, flight friction, and seasonal timing—without chasing exact prices.
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
