<!-- src/routes/echoglaze/logistics/+page.svelte -->
<script lang="ts">
  import { loadCountry } from '$lib/loaders/countryLoader';
  import { loadVisa } from '$lib/loaders/visaLoader'; 
  import type { Country, Visa } from '$lib/schema/types';
  
  import VisaSummaryCard from '$lib/components/country/VisaSummaryCard.svelte';
  import FlightsSummaryCard from '$lib/components/country/FlightsSummaryCard.svelte';

  let from = 'united-states';
  let to = 'azerbaijan';
  let destinationData: Country | null = null;
  let visaData: Visa | null = null;
  let loading = false;
  let selectedHub = '';

  const countries = [
    { id: 'united-states', name: 'United States', icon: '🇺🇸' },
    { id: 'azerbaijan', name: 'Azerbaijan', icon: '🇦🇿' }
  ];

  $: if (from && to) updateLogistics(from, to);
  // Reactive: Reset hub when destination changes
  $: if (destinationData) {
    selectedHub = destinationData.decisionAttributes.majorHubs[0] || 'default';
  }

  async function updateLogistics(origin: string, dest: string) {
    if (origin === dest) {
      destinationData = null;
      return;
    }
    loading = true;
    try {
      const [c, v] = await Promise.all([loadCountry(dest), loadVisa(dest)]);
      destinationData = c;
      visaData = v;
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }

  const formatName = (str: string) => str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
</script>

<div class="min-h-screen bg-slate-50/50">
  <nav class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 shadow-sm">
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4 w-full md:w-auto">
        <div class="flex-1">
          <label for="from" class="text-[10px] font-bold uppercase tracking-tighter text-slate-400 block mb-1">Origin</label>
          <select id="from" bind:value={from} class="bg-transparent font-semibold text-slate-700 outline-none cursor-pointer">
            {#each countries as c}<option value={c.id}>{c.icon} {c.name}</option>{/each}
          </select>
        </div>
        
        <span class="text-slate-300 mt-4">→</span>

        <div class="flex-1 text-right md:text-left">
          <label for="to" class="text-[10px] font-bold uppercase tracking-tighter text-slate-400 block mb-1">Destination</label>
          <select id="to" bind:value={to} class="bg-transparent font-semibold text-indigo-600 outline-none cursor-pointer">
            {#each countries as c}<option value={c.id}>{c.icon} {c.name}</option>{/each}
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
      <p class="text-slate-400 text-sm">Domestic logistics are coming in a future update!</p>
    </div>
  {:else if loading}
    <div class="py-20 text-center animate-pulse">
      <div class="text-4xl mb-4">✈️</div>
      <p class="text-slate-400 font-medium">Syncing flight patterns and visa rules...</p>
    </div>
  {:else if destinationData}
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-6">
        <header>
          <h1 class="text-4xl font-black tracking-tight text-slate-900">
            {formatName(from)} <span class="text-indigo-500">to</span> {destinationData.name}
          </h1>
          <p class="text-slate-500 mt-1">Comprehensive entry requirements and flight timing.</p>
        </header>

        {#if destinationData.decisionAttributes.majorHubs.length > 1}
          <div class="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-2 rounded-xl border border-slate-200 w-fit shadow-sm">
            <span class="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Arrival Hub</span>
            <div class="flex gap-1">
              {#each destinationData.decisionAttributes.majorHubs as hub}
                <button 
                  on:click={() => selectedHub = hub}
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                  {selectedHub === hub ? 'bg-indigo-600 text-white shadow-md scale-105' : 'bg-white text-slate-500 hover:bg-slate-100'}"
                >
                  {hub.toUpperCase()}
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <VisaSummaryCard visa={destinationData.visaSummary} />
          <FlightsSummaryCard 
             flights={destinationData.flightsSummary.fromMajorHubs[selectedHub] || destinationData.flightsSummary.fromMajorHubs['default']} 
          />
        </div>
      </div>

      <aside class="space-y-4">
        <div class="nostalgic-card p-5 rounded-2xl border border-slate-100">
          <h4 class="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">At a Glance</h4>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-slate-500 font-medium">Visa Ease</span>
              <span class="text-sm font-bold text-green-600">{destinationData.decisionAttributes.visaEase}/10</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-slate-500 font-medium">Safety Score</span>
              <span class="text-sm font-bold text-blue-600">{destinationData.decisionAttributes.safety}/10</span>
            </div>
            <div class="flex justify-between items-center">
               <span class="text-sm text-slate-500 font-medium">Nomad Visa</span>
               <span class="text-[10px] font-bold px-2 py-1 rounded-md {destinationData.decisionAttributes.digitalNomadVisa ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}">
                  {destinationData.decisionAttributes.digitalNomadVisa ? 'AVAILABLE' : 'N/A'}
               </span>
            </div>
          </div>
        </div>
        
        <div class="bg-indigo-600 p-5 rounded-2xl text-white shadow-lg shadow-indigo-200/50">
          <h4 class="text-[10px] font-black uppercase opacity-70 mb-2 tracking-widest">Nomad Tip</h4>
          <p class="text-xs leading-relaxed font-medium">
            Registration in {destinationData.name} is mandatory within {destinationData.registrationRequiredAfterDays} days. Keep your passport handy!
          </p>
        </div>
      </aside>
    </section>

    <section class="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
      <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
        <span class="text-xl">📅</span> When to visit {destinationData.name}?
      </h3>
      <div class="month-timeline flex gap-2 overflow-x-auto pb-4">
        {#each [1,2,3,4,5,6,7,8,9,10,11,12] as month}
          <div class="flex-1 min-w-[70px] text-center p-4 rounded-2xl border transition-all duration-300
            {destinationData.seasonality.bestMonths.includes(month) ? 'sweet-spot-month text-green-700' : 'bg-slate-50 border-slate-100 text-slate-400'}">
            <span class="text-[10px] font-black uppercase block opacity-40 mb-1">
              {new Date(0, month-1).toLocaleString('default', {month:'short'})}
            </span>
            <span class="text-xl">{destinationData.seasonality.bestMonths.includes(month) ? '✨' : '•'}</span>
          </div>
        {/each}
      </div>
    </section>
  {/if}
</main>
</div>

<style>
  .nostalgic-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  }

  .sweet-spot-month {
    background: radial-gradient(circle at top left, #f0fdf4, #dcfce7);
    border-color: #86efac;
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.2);
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }

  .month-timeline::-webkit-scrollbar {
    height: 4px;
  }
  .month-timeline::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
  }
</style>