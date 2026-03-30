<!-- src/lib/components/logistics/TravelReadinessCard.svelte -->
<script lang="ts">
  import type { TravelReadiness } from '$lib/schema/types';

  export let readiness: TravelReadiness;
  export let flights: any; // Data from loadFlights
  export let countryName: string;

  const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const frictionLabel = {
    low: 'Low friction',
    medium: 'Moderate friction',
    high: 'High friction'
  } as const;

  const volatilityLabel = {
    low: 'Stable pricing',
    medium: 'Some volatility',
    high: 'Highly volatile'
  } as const;
</script>

<div class="space-y-6">
    <section class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
    <h2 class="text-sm font-black uppercase tracking-[0.18em] text-slate-400 mb-4">Seasonality for {countryName}</h2>
    
    {#if readiness.seasonalVolatility}
      <p class="text-[11px] text-slate-400 mb-4">
        Volatility: 💸 {readiness.seasonalVolatility.cheapest} · ✨ {readiness.seasonalVolatility.sweetSpot} · • {readiness.seasonalVolatility.neutral} · 🔥 {readiness.seasonalVolatility.peak}
      </p>
    {/if}

    <div class="flex gap-2 overflow-x-auto pb-2 seasonality-strip">
      {#each Array(12) as _, i}
        <div class="min-w-[70px] flex-1 rounded-2xl border px-3 py-3 text-center text-xs
          {readiness.seasonality.sweetSpot.includes(i + 1) ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-sm' 
          : readiness.seasonality.cheapest.includes(i + 1) ? 'bg-sky-50 border-sky-200 text-sky-800' 
          : readiness.seasonality.peak.includes(i + 1) ? 'bg-rose-50 border-rose-200 text-rose-800' 
          : 'bg-slate-50 border-slate-100 text-slate-400'}">
          <div class="text-[10px] font-semibold uppercase tracking-[0.16em] mb-1">{monthLabels[i]}</div>
          <div class="text-[10px] font-medium">
            {#if readiness.seasonality.sweetSpot.includes(i + 1)}✨ Sweet
            {:else if readiness.seasonality.cheapest.includes(i + 1)}💸 Cheap
            {:else if readiness.seasonality.peak.includes(i + 1)}🔥 Peak
            {:else}• Neutral{/if}
          </div>
        </div>
      {/each}
    </div>
  </section>
  <section class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
    <header class="flex items-center justify-between gap-4">
      <div>
        <h2 class="text-sm font-black uppercase tracking-[0.18em] text-slate-400">Entry Rules & Stay</h2>
        <p class="text-lg font-semibold text-slate-900 mt-1">
          {readiness.visa.type} for {countryName}
        </p>
      </div>
      <div class="text-right space-y-1">
        <span class="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
          {readiness.visa.easeLevel === 'simple' ? 'Easy Entry' : readiness.visa.easeLevel === 'moderate' ? 'Moderate Process' : 'Complex Process'}
        </span>
        <p class="text-[11px] text-slate-400">Stay: {readiness.visa.stayLength}</p>
      </div>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
      <div class="space-y-1">
        <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Work Policy</p>
        <p class="text-slate-700 leading-snug">
          {readiness.visa.workPolicy}
          <span class="block text-[11px] text-slate-400 mt-1">Remote work generally tolerated.</span>
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Nomad Visa</p>
        <p class="text-xs font-semibold inline-flex items-center rounded-md px-2 py-1 border
          {readiness.visa.nomadVisaAvailable ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}">
          {readiness.visa.nomadVisaAvailable ? 'Available' : 'Not available'}
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Registration</p>
        <p class="text-slate-700 text-sm">
          {readiness.visa.registrationAfterDays ? `Required after ${readiness.visa.registrationAfterDays} days` : 'No special registration noted.'}
        </p>
      </div>
    </div>

    {#if readiness.visa.requirements?.length}
      <div class="pt-3 border-t border-slate-100">
        <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-2">Core Requirements</p>
        <ul class="space-y-1 text-sm text-slate-700">
          {#each readiness.visa.requirements as req}
            <li class="flex items-start gap-2">
              <span class="mt-[2px] text-emerald-500">✓</span>
              <span>{req}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </section>

  {#if flights}
    <section class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
      <header class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-sm font-black uppercase tracking-[0.18em] text-slate-400">Flight Pattern</h2>
          <p class="text-lg font-semibold text-slate-900 mt-1">Route Logistics</p>
        </div>
        <div class="text-right space-y-1">
          <span class="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold border
            {flights.friction === 'low' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}">
            {frictionLabel[flights.friction as keyof typeof frictionLabel] || flights.friction}
          </span>
          <p class="text-[11px] text-slate-400">
            {flights.commonStops === 0 ? 'Typically direct' : `Usually ${flights.commonStops} stop${flights.commonStops > 1 ? 's' : ''}`}
          </p>
        </div>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div class="space-y-1">
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Routing Notes</p>
          <p class="text-slate-700 leading-snug">
            {flights.routingNotes}
            {#if flights.hubs?.length}
              <span class="block text-[11px] text-slate-400 mt-1">Common via: {flights.hubs.join(', ')}</span>
            {/if}
          </p>
        </div>
        <div class="space-y-1">
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Best Time to Book</p>
          <p class="text-slate-700 leading-snug">{flights.bestTimeToBook}</p>
        </div>
        <div class="space-y-1">
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Last-Minute Pattern</p>
          <p class="text-slate-700 leading-snug">
            {volatilityLabel[flights.lastMinuteVolatility as keyof typeof volatilityLabel] || flights.lastMinuteVolatility}
          </p>
        </div>
      </div>
    </section>
  {:else}
    <div class="p-6 text-center text-slate-400 text-sm italic border border-dashed border-slate-200 rounded-2xl bg-white/50">
      Select an origin to view flight logistics.
    </div>
  {/if}

</div>

<style>
  .seasonality-strip::-webkit-scrollbar { height: 4px; }
  .seasonality-strip::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 999px; }
</style>