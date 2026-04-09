<!-- src/routes/logistics/+page.svelte -->
<script lang="ts">
  import { loadCountry } from '$lib/loaders/countryLoader';
  import { COUNTRY_REGISTRY } from '$lib/data/manifest';
  import CountryView from '$lib/components/logistics/CountryView.svelte';
  import GlobalCompareView from '$lib/components/logistics/GlobalCompareView.svelte';

  let selectedMonth: string = 'none';

  let to = 'azerbaijan';
  let destinationData: any = null;
  let loading = false;
  let mode: 'country' | 'filters' = 'country';
  let sortMode: 'none' | 'stayAsc' | 'stayDesc' = 'none';
  let visaType: 'all' | 'nomad' | 'longStay' | 'visaFree' = 'all';

  const countries = COUNTRY_REGISTRY.map(c => ({
    id: c.slug,
    name: c.data.name,
    icon: c.icon
  }));

  // Month → number map (needed for filtering)
  const monthMap: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
  };

  function applyFilters(r: any): boolean {
    if (!r) return false;

    // Visa filters
    if (visaType === 'nomad' && !r.visa.nomadVisa?.available) return false;
    if (visaType === 'longStay' && !r.visa.longStayTouristVisaMonths) return false;
    if (visaType === 'visaFree' && (!r.visa.touristStayDays || r.visa.touristStayDays <= 0)) return false;

    // Seasonality filter
    if (selectedMonth !== 'none') {
      const s = r.seasonality;
      if (!s) return false;

      const monthNum = monthMap[selectedMonth];

      const valid =
        s.cheapest.includes(monthNum) ||
        s.sweetSpot.includes(monthNum) ||
        s.peak.includes(monthNum);

      if (!valid) return false;
    }

    return true;
  }

  $: if (to) updateLogistics(to);

  async function updateLogistics(dest: string) {
    loading = true;
    destinationData = await loadCountry(dest);
    loading = false;
  }

  const selectCountry = (slug: string) => {
    to = slug;
    mode = 'country';
  };
</script>

<nav class="sticky top-0 z-20 bg-white border-b border-slate-200 p-4 shadow-sm">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

    <!-- Mode Switch -->
    <div class="flex items-center gap-4">
      <div class="flex bg-slate-100 p-1 rounded-lg">
        <button 
          class="px-3 py-1 rounded-md text-xs font-bold {mode === 'country' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}"
          on:click={() => mode = 'country'}
        >
          Country View
        </button>

        <button 
          class="px-3 py-1 rounded-md text-xs font-bold {mode === 'filters' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}"
          on:click={() => mode = 'filters'}
        >
          Compare All
        </button>
      </div>
    </div>

  </div>
</nav>

<main class="max-w-6xl mx-auto p-6">
  {#if mode === 'country'}
    {#if loading}
      <div class="py-20 text-center animate-pulse">🌍 Loading {to}...</div>
    {:else if destinationData}
      {#if applyFilters(destinationData.travelReadiness)}
        <CountryView 
          data={destinationData}
          {countries}
          {selectedMonth} 
          bind:to
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