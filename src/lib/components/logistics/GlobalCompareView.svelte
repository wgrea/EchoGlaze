<!-- src/lib/components/logistics/GlobalCompareView.svelte -->
<script lang="ts">
  import { COUNTRY_REGISTRY } from '$lib/data/manifest';

  export let applyFilters: (r: any) => boolean;
  export let onSelect: (slug: string) => void;
  export let sortMode: string;

  export let filters: {
    nomadVisa: string;
    longStay: string;
    registration: string;
  };

  // Derived sorted + filtered list
  $: filtered = COUNTRY_REGISTRY
    .filter(c => applyFilters(c.data.travelReadiness))
    .sort((a, b) => {
      if (sortMode === 'stayAsc')
        return a.data.travelReadiness.visa.touristStayDays - b.data.travelReadiness.visa.touristStayDays;
      if (sortMode === 'stayDesc')
        return b.data.travelReadiness.visa.touristStayDays - a.data.travelReadiness.visa.touristStayDays;
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
    <option value="stayAsc">Stay: Short → Long</option>
    <option value="stayDesc">Stay: Long → Short</option>
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

  <div class="flex justify-between">
    <span class="text-slate-400 uppercase">Nomad Visa</span>
    <span class="font-bold text-slate-700">
      {country.data.travelReadiness.visa.nomadVisa?.available ? 'Available' : 'None'}
    </span>
  </div>

  <div class="flex justify-between">
    <span class="text-slate-400 uppercase">Tourist Stay</span>
    <span class="font-bold text-slate-700">
      {country.data.travelReadiness.visa.touristStayDays} Days
    </span>
  </div>

</div>


    </button>
  {/each}
</div>

{/if}
