<!-- src/routes/logistics/+page.svelte -->
<script lang="ts">
  import { loadCountry } from '$lib/loaders/countryLoader';
  import { COUNTRY_REGISTRY } from '$lib/data/manifest';
  import CountryView from '$lib/components/logistics/CountryView.svelte';
  import GlobalCompareView from '$lib/components/logistics/GlobalCompareView.svelte';
  
  // State
  let to = 'azerbaijan';
  let destinationData: any = null;
  let loading = false;
  let mode: 'country' | 'filters' = 'country';
  let sortMode: 'none' | 'stayAsc' | 'stayDesc' = 'none';


  let filters = {
    workPolicy: 'all',
    nomadVisa: 'all',
    longStay: 'all',
    registration: 'all'
  };

  const countries = COUNTRY_REGISTRY.map(c => ({
    id: c.slug,
    name: c.data.name,
    icon: c.icon
  }));

  // Filtering Logic
  function applyFilters(r: any): boolean {
    if (!r) return false;
    if (filters.workPolicy !== 'all' && r.visa.workPolicy !== filters.workPolicy) return false;
    if (filters.nomadVisa !== 'all') {
      const hasNomad = r.visa.nomadVisa?.available;
      if ((filters.nomadVisa === 'yes' && !hasNomad) || (filters.nomadVisa === 'no' && hasNomad)) return false;
    }
    if (filters.longStay !== 'all') {
      const hasLong = !!r.visa.longStayTouristVisaMonths;
      if ((filters.longStay === 'yes' && !hasLong) || (filters.longStay === 'no' && hasLong)) return false;
    }
    if (filters.registration !== 'all') {
      const requires = !!r.visa.registrationAfterDays;
      if ((filters.registration === 'required' && !requires) || (filters.registration === 'none' && requires)) return false;
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
  bind:to
/>

      {:else}
        <div class="p-12 text-center bg-slate-100 rounded-2xl border border-dashed border-slate-300">
          <p class="text-slate-500 font-bold">Filters hide {destinationData.name}.</p>
          <button class="text-indigo-600 text-sm underline mt-2" on:click={() => filters = {workPolicy:'all', nomadVisa:'all', longStay:'all', registration:'all'}}>Reset Filters</button>
        </div>
      {/if}
    {/if}
  {:else}
<GlobalCompareView 
  {applyFilters}
  {sortMode}
  {filters}
  onSelect={selectCountry}
/>


  {/if}
</main>