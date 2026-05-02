<!-- src/lib/components/logistics/CountryView.svelte -->
<script lang="ts">
  import type { Country } from '$lib/types';
  import { selectedCountryId } from '$lib/stores/location';

  export let data: Country & { icon?: string }; // The initial data
  export let countries: { id: string; name: string; icon: string }[];
  export let selectedMonth: string = 'none';

  const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthKeys = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

  // FIND the full country object from the list whenever the ID changes
  $: activeCountry = countries.find(c => c.id === $selectedCountryId) || data;
  
  // Cast the full data from the manifest or passed data
  // Note: In a real app, you might need to fetch the full object if 'countries' only has names/icons
  $: readiness = (activeCountry as Country).travelReadiness || data.travelReadiness;
</script>

<div class="space-y-8 animate-in fade-in duration-300">
  <header>
    <div class="flex items-center gap-2">
      <!-- Use the icon from the active selection -->
      <span class="text-2xl">{activeCountry.icon || data.icon}</span>
      <select
        bind:value={$selectedCountryId}
        class="bg-transparent font-black text-slate-900 text-xl outline-none cursor-pointer hover:text-indigo-600 transition-colors"
      >
        {#each countries as c}
          <option value={c.id}>{c.name}</option>
        {/each}
      </select>
    </div>

    <p class="text-slate-500 text-sm italic mt-1">
      Region: {data.region}
    </p>
  </header>

  <div class="space-y-6">
    <section class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 class="text-sm font-black uppercase tracking-[0.18em] text-slate-400 mb-4">Seasonality</h2>
      
      <div class="flex gap-2 overflow-x-auto pb-2 seasonality-strip">
        {#each Array(12) as _, i}
          {@const monthNum = i + 1}
          {@const isHighlighted = monthKeys[i] === selectedMonth}
          
          <div class="min-w-[75px] flex-1 rounded-2xl border px-3 py-3 text-center text-xs transition-all
            {isHighlighted ? 'ring-2 ring-indigo-500 ring-offset-2 z-10' : ''} 
            {readiness.seasonality.sweetSpot.includes(monthNum) ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : readiness.seasonality.cheapest.includes(monthNum) ? 'bg-sky-50 border-sky-200 text-sky-800' 
            : readiness.seasonality.peak.includes(monthNum) ? 'bg-rose-50 border-rose-200 text-rose-800' 
            : 'bg-slate-50 border-slate-100 text-slate-400'}">
            
            <div class="text-[10px] font-black uppercase tracking-[0.16em] mb-1">{monthLabels[i]}</div>
            <div class="text-[10px] font-bold">
              {#if readiness.seasonality.sweetSpot.includes(monthNum)}✨ Sweet
              {:else if readiness.seasonality.cheapest.includes(monthNum)}💸 Cheap
              {:else if readiness.seasonality.peak.includes(monthNum)}🔥 Peak
              {:else}• Neutral{/if}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Work Policy Section -->
    <section class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
       <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <div class="space-y-1">
          <p class="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Work Policy</p>
          <p class="text-slate-700 leading-snug font-medium">{readiness.visa.workPolicy}</p>
        </div>
        <div class="space-y-1">
          <p class="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Registration</p>
          <p class="text-slate-700 font-medium">
            {readiness.visa.registrationAfterDays ? `Required after ${readiness.visa.registrationAfterDays} days` : 'No registration required'}
          </p>
        </div>
      </div>
    </section>
  </div>
</div>