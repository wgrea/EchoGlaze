<!-- src/lib/components/logistics/TravelReadinessCard.svelte -->
<script lang="ts">
  import type { TravelReadiness } from '$lib/schema/types';

  export let readiness: TravelReadiness;
  export let countryName: string;

  const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const frictionLabel = {
    low: 'Low friction',
    medium: 'Moderate friction',
    high: 'High friction'
  } as const;
</script>

<div class="space-y-6">
  <section class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
    <h2 class="text-sm font-black uppercase tracking-[0.18em] text-slate-400 mb-4">Seasonality for {countryName}</h2>
    
    {#if readiness.seasonalVolatility}
      <p class="text-[11px] text-slate-400 mb-4 font-medium">
        Volatility: 💸 {readiness.seasonalVolatility.cheapest} · ✨ {readiness.seasonalVolatility.sweetSpot} · • {readiness.seasonalVolatility.neutral} · 🔥 {readiness.seasonalVolatility.peak}
      </p>
    {/if}

    <div class="flex gap-2 overflow-x-auto pb-2 seasonality-strip">
      {#each Array(12) as _, i}
        <div class="min-w-[75px] flex-1 rounded-2xl border px-3 py-3 text-center text-xs transition-all
          {readiness.seasonality.sweetSpot.includes(i + 1) ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-sm' 
          : readiness.seasonality.cheapest.includes(i + 1) ? 'bg-sky-50 border-sky-200 text-sky-800' 
          : readiness.seasonality.peak.includes(i + 1) ? 'bg-rose-50 border-rose-200 text-rose-800' 
          : 'bg-slate-50 border-slate-100 text-slate-400'}">
          <div class="text-[10px] font-black uppercase tracking-[0.16em] mb-1">{monthLabels[i]}</div>
          <div class="text-[10px] font-bold">
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
        <p class="text-lg font-bold text-slate-900 mt-1">
          {readiness.visa.type} for {countryName}
        </p>
      </div>
      <div class="text-right space-y-1">
        <span class="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase text-emerald-700">
          {readiness.visa.easeLevel === 'simple' ? 'Easy' : readiness.visa.easeLevel === 'moderate' ? 'Moderate' : 'Complex'}
        </span>
        <p class="text-[11px] font-bold text-slate-400">STAY: {readiness.visa.stayLength.toUpperCase()}</p>
      </div>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
      <div class="space-y-1">
        <p class="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Work Policy</p>
        <p class="text-slate-700 leading-snug font-medium">
          {readiness.visa.workPolicy}
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Nomad Visa</p>
        <p class="text-xs font-bold inline-flex items-center rounded-md px-2 py-1 border
          {readiness.visa.nomadVisaAvailable ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}">
          {readiness.visa.nomadVisaAvailable ? 'Available' : 'Not available'}
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Registration</p>
        <p class="text-slate-700 font-medium">
          {readiness.visa.registrationAfterDays ? `Required after ${readiness.visa.registrationAfterDays} days` : 'None required.'}
        </p>
      </div>
    </div>

    {#if readiness.visa.requirements?.length}
      <div class="pt-4 border-t border-slate-100">
        <p class="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">Core Requirements</p>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-600 font-medium">
          {#each readiness.visa.requirements as req}
            <li class="flex items-start gap-2">
              <span class="mt-[2px] text-emerald-500 font-bold">✓</span>
              <span>{req}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </section>
</div>

<style>
  .seasonality-strip::-webkit-scrollbar { height: 4px; }
  .seasonality-strip::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 999px; }
</style>