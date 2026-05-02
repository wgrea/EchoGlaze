<!-- src/routes/logistics/+page.svelte -->
<script lang="ts">
  import { loadCountry } from '$lib/loaders/country';
  import { COUNTRY_REGISTRY } from '$lib/data/manifest';
  import CountryView from '$lib/components/logistics/CountryView.svelte';
  import GlobalCompareView from '$lib/components/logistics/GlobalCompareView.svelte';
  import { selectedCountryId } from '$lib/stores/location';

  let selectedMonth: string = 'none';
  let destinationData: any = null;
  let loading = false;
  let mode: 'country' | 'filters' = 'filters';
  let sortMode: 'none' | 'stayAsc' | 'stayDesc' = 'none';
  let visaType: 'all' | 'nomad' | 'tourist' | 'visaFree' = 'all';

  const countries = COUNTRY_REGISTRY.map(c => ({
    id: c.id,
    name: c.data.name,
    icon: c.icon
  }));

  const monthMap: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
  };

  // REACTIVE LOGIC: Fetch data whenever the global store changes
  $: if ($selectedCountryId && $selectedCountryId !== 'all') {
    updateLogistics($selectedCountryId);
  }

  async function updateLogistics(dest: string) {
    loading = true;
    destinationData = await loadCountry(dest);
    loading = false;
  }

  const selectCountry = (slug: string) => {
    selectedCountryId.set(slug); 
    mode = 'country';
  };

  function applyFilters(r: any): boolean {
    if (!r) return false;
    if (visaType === 'nomad' && !r.visa.nomadVisa?.available) return false;
    if (visaType === 'tourist' && !r.visa.longStayTouristVisaMonths) return false;
    if (visaType === 'visaFree' && (!r.visa.touristStayDays || r.visa.touristStayDays <= 0)) return false;

    if (selectedMonth !== 'none') {
      const monthNum = monthMap[selectedMonth];
      const s = r.seasonality;
      if (!s) return false;
      const allActiveMonths = [...s.cheapest, ...s.sweetSpot, ...s.peak, ...(s.neutral || [])];
      if (!allActiveMonths.includes(monthNum)) return false;
    }
    return true;
  }
</script>

<nav class="sticky top-0 z-20 bg-white border-b border-slate-200 p-4 shadow-sm">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
  <!-- Mode Switch Container -->
<div class="flex flex-col md:flex-row items-stretch gap-4 w-full max-w-6xl">
  
  <!-- Global View Toggle (Fixed Width Symmetry) -->
  <div class="flex items-center p-1.5 bg-slate-200/50 backdrop-blur-md rounded-[1.5rem] border border-slate-300/30">
    <button 
      class="flex-1 min-w-[140px] relative px-5 py-3 rounded-xl text-xs font-black tracking-widest transition-all duration-300
      {mode === 'filters' ? 'bg-white text-indigo-600 shadow-md scale-100' : 'text-slate-500 hover:text-slate-700 scale-95'}"
      on:click={() => mode = 'filters'}
    >
      COMPARE ALL
    </button>
    <button 
      class="flex-1 min-w-[140px] relative px-5 py-3 rounded-xl text-xs font-black tracking-widest transition-all duration-300
      {mode === 'country' ? 'bg-white text-indigo-600 shadow-md scale-100' : 'text-slate-500 hover:text-slate-700 scale-95'}"
      on:click={() => mode = 'country'}
    >
      COUNTRY VIEW
    </button>
  </div>

  <!-- Transportation Action Card (Now scales with the toggle) -->
  <a href="/transportation" 
     class="group relative flex-1 flex items-center justify-between p-1 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
  >
    <div class="flex items-center gap-4 p-3">
      <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-indigo-50 transition-colors duration-500">
        <span class="group-hover:scale-110 group-hover:-rotate-3 transition-transform">🚗</span>
      </div>
      <div>
        <h3 class="font-black text-slate-900 text-sm tracking-tight leading-none">Transportation</h3>
        <p class="text-[10px] text-slate-500 font-medium mt-1">Strategy & Apps</p>
      </div>
    </div>

    <div class="pr-6 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
    </div>
  </a>
</div>


  </div>
</nav>

<main class="max-w-6xl mx-auto p-6">


{#if mode === 'country'}
  {#if loading}
    <!-- Use the store value for the loading label -->
    <div class="py-20 text-center animate-pulse">🌍 Loading {$selectedCountryId}...</div>
  {:else if destinationData}
    {#if applyFilters(destinationData.travelReadiness)}
      <CountryView 
        data={destinationData}
        {countries}
        {selectedMonth} 
      />
    {:else}
        <div class="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p class="text-slate-500 font-bold">The filters from "Compare All" are hiding {destinationData.name}.</p>
          <button 
            class="text-indigo-600 text-sm font-bold mt-2 hover:underline" 
            on:click={() => { visaType = 'all'; selectedMonth = 'none'; }}
          >
            Reset Filters to View
          </button>
        </div>
      {/if}
    {/if}
  {:else}
    <GlobalCompareView 
      {applyFilters}
      {sortMode}
      {visaType}
      bind:selectedMonth 
      onSelect={selectCountry}
    />
  {/if}
</main>
