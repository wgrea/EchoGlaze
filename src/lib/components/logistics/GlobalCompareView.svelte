<!-- src/lib/components/logistics/GlobalCompareView.svelte -->
<script lang="ts">
  import { COUNTRY_REGISTRY } from '$lib/data/manifest';

  export let applyFilters: (r: any) => boolean;
  export let onSelect: (slug: string) => void;
  export let sortMode: string;
  export let visaType: string;


  // Derived sorted + filtered list
  $: filtered = COUNTRY_REGISTRY
    .filter(c => applyFilters(c.data.travelReadiness))
.sort((a, b) => {
  const aVisa = a.data.travelReadiness.visa;
  const bVisa = b.data.travelReadiness.visa;

  const aNomad = (aVisa.nomadVisa as { durationMonths?: number | null })?.durationMonths ?? 0;
  const bNomad = (bVisa.nomadVisa as { durationMonths?: number | null })?.durationMonths ?? 0;

  const aLong = (aVisa as { longStayTouristVisaMonths?: number | null }).longStayTouristVisaMonths ?? 0;
  const bLong = (bVisa as { longStayTouristVisaMonths?: number | null }).longStayTouristVisaMonths ?? 0;

  const aStay = aVisa.touristStayDays ?? 0;
  const bStay = bVisa.touristStayDays ?? 0;

  if (visaType === 'nomad') {
    if (sortMode === 'nomadAsc') return aNomad - bNomad;
    if (sortMode === 'nomadDesc') return bNomad - aNomad;
  }

  if (visaType === 'longStay') {
    if (sortMode === 'longStayAsc') return aLong - bLong;
    if (sortMode === 'longStayDesc') return bLong - aLong;
  }

  if (visaType === 'visaFree' || visaType === 'all') {
    if (sortMode === 'stayAsc') return aStay - bStay;
    if (sortMode === 'stayDesc') return bStay - aStay;
  }

  return 0;
});




</script>

<header class="mb-6 space-y-2">
  <h1 class="text-xl font-black text-slate-900">Compare Countries</h1>
  <p class="text-slate-500 text-xs">Filter destinations by visas and stay duration.</p>
</header>

<!-- FILTER BAR -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">

<!-- Sort -->
<select bind:value={sortMode} class="text-[10px] font-bold uppercase p-2 rounded border bg-slate-50">
  <option value="none">Sort</option>

  {#if visaType === 'nomad'}
    <option value="nomadAsc">Nomad Visa: Short → Long</option>
    <option value="nomadDesc">Nomad Visa: Long → Short</option>
  {/if}

  {#if visaType === 'longStay'}
    <option value="longStayAsc">Long‑Stay: Short → Long</option>
    <option value="longStayDesc">Long‑Stay: Long → Short</option>
  {/if}

  {#if visaType === 'visaFree' || visaType === 'all'}
    <option value="stayAsc">Visa‑Free: Short → Long</option>
    <option value="stayDesc">Visa‑Free: Long → Short</option>
  {/if}
</select>

<!-- Visa Type -->
<select bind:value={visaType} class="text-[10px] font-bold uppercase p-2 rounded border bg-slate-50">
  <option value="all">Visa Type: All</option>
  <option value="nomad">Digital Nomad Visa</option>
  <option value="longStay">Long‑Stay Tourist Visa</option>
  <option value="visaFree">Visa‑Free Stay</option>
</select>



</div>

{#if filtered.length === 0}
  <p class="text-xs text-slate-500 italic">No countries match these filters.</p>
{:else}

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each filtered as country, i}
    <button 
      class="group p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 transition-all text-left"
      on:click={() => onSelect(country.slug)}
    >
      <div class="flex justify-between items-start mb-3">
        <span class="text-2xl">{country.icon}</span>
        <span class="text-[9px] font-black uppercase tracking-tighter text-slate-400 bg-slate-100 px-2 py-1 rounded">
          #{i + 1}
        </span>
      </div>

      <h3 class="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
        {country.data.name}
      </h3>

<div class="mt-4 space-y-1.5 text-[10px]">

  {#if visaType === 'nomad' || visaType === 'all'}
    <div class="flex justify-between">
      <span class="text-slate-400 uppercase">Nomad Visa</span>
      <span class="font-bold text-slate-700">
        {country.data.travelReadiness.visa.nomadVisa?.available
          ? `${(country.data.travelReadiness.visa.nomadVisa as { durationMonths?: number | null })?.durationMonths ?? 0} Months`
          : 'None'}
      </span>
    </div>
  {/if}

  {#if visaType === 'visaFree' || visaType === 'all'}
    <div class="flex justify-between">
      <span class="text-slate-400 uppercase">Visa-Free Stay</span>
      <span class="font-bold text-slate-700">
        {country.data.travelReadiness.visa.touristStayDays} Days
      </span>
    </div>
  {/if}

  {#if visaType === 'longStay' || visaType === 'all'}
    <div class="flex justify-between">
      <span class="text-slate-400 uppercase">Long‑Stay Visa</span>
      <span class="font-bold text-slate-700">
        {(country.data.travelReadiness.visa as { longStayTouristVisaMonths?: number | null }).longStayTouristVisaMonths ?? 'None'}
      </span>
    </div>
  {/if}

</div>

    </button>
  {/each}
</div>

{/if}
