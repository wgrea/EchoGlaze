<!-- src/lib/components/logistics/GlobalCompareView.svelte -->
<script lang="ts">
  import { COUNTRY_REGISTRY } from '$lib/data/manifest';

  export let applyFilters: (r: any) => boolean;
  export let onSelect: (slug: string) => void;
  export let sortMode: string;
  export let visaType: string;
  export let selectedMonth: string;

  type SeasonTier = 'Cheapest' | 'Sweet Spot' | 'Neutral' | 'Peak';

  const monthMap: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
  };

  const seasonRank: Record<SeasonTier, number> = {
    Cheapest: 1,
    'Sweet Spot': 2,
    Neutral: 3,
    Peak: 4
  };

  function getSeasonTier(country: any, month: string): SeasonTier {
    const s = country.data.travelReadiness.seasonality;
    const monthNum = monthMap[month];

    if (s.cheapest.includes(monthNum)) return 'Cheapest';
    if (s.sweetSpot.includes(monthNum)) return 'Sweet Spot';
    if (s.peak.includes(monthNum)) return 'Peak';
    return 'Neutral';
  }

  // FILTER + SORT PIPELINE
  $: filtered = COUNTRY_REGISTRY
    .filter(c => applyFilters(c.data.travelReadiness))
    .sort((a, b) => {
      // --- SEASON MODE ---
      if (selectedMonth !== 'none') {
        const aTier = getSeasonTier(a, selectedMonth);
        const bTier = getSeasonTier(b, selectedMonth);
        return seasonRank[aTier] - seasonRank[bTier];
      }

      // --- VISA MODE ---
      const aVisa = a.data.travelReadiness.visa;
      const bVisa = b.data.travelReadiness.visa;

      const aNomad = (aVisa.nomadVisa as any)?.durationMonths ?? 0;
      const bNomad = (bVisa.nomadVisa as any)?.durationMonths ?? 0;

      const aTourist = (aVisa as any).longStayTouristVisaMonths ?? 0;
      const bTourist = (bVisa as any).longStayTouristVisaMonths ?? 0;

      const aStay = aVisa.touristStayDays ?? 0;
      const bStay = bVisa.touristStayDays ?? 0;

      if (visaType === 'nomad') {
        if (sortMode === 'nomadAsc') return aNomad - bNomad;
        if (sortMode === 'nomadDesc') return bNomad - aNomad;
      }

      if (visaType === 'tourist') {
        if (sortMode === 'touristAsc') return aTourist - bTourist;
        if (sortMode === 'touristDesc') return bTourist - aTourist;
      }

      if (visaType === 'visaFree') {
        if (sortMode === 'stayAsc') return aStay - bStay;
        if (sortMode === 'stayDesc') return bStay - aStay;
      }

      return 0;
    });
</script>

<header class="mb-6 space-y-2">
  <h1 class="text-xl font-black text-slate-900">Compare Countries</h1>
  <p class="text-slate-500 text-xs">Filter destinations by visas or seasonality.</p>
</header>

<!-- FILTER BAR -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">

  <!-- MONTH SELECTOR -->
  <select bind:value={selectedMonth} class="text-[10px] font-bold uppercase p-2 rounded border bg-slate-50">
    <option value="none">Visa Mode (No Month)</option>
    <option value="jan">January</option>
    <option value="feb">February</option>
    <option value="mar">March</option>
    <option value="apr">April</option>
    <option value="may">May</option>
    <option value="jun">June</option>
    <option value="jul">July</option>
    <option value="aug">August</option>
    <option value="sep">September</option>
    <option value="oct">October</option>
    <option value="nov">November</option>
    <option value="dec">December</option>
  </select>

  <!-- VISA MODE ONLY -->
  {#if selectedMonth === 'none'}

    <!-- Sort -->
    {#if visaType !== 'all'}
      <select bind:value={sortMode} class="text-[10px] font-bold uppercase p-2 rounded border bg-slate-50">
        <option disabled selected>Sort</option>
        {#if visaType === 'nomad'}
          <option value="nomadAsc">Short → Long</option>
          <option value="nomadDesc">Long → Short</option>
        {/if}

        {#if visaType === 'tourist'}
          <option value="touristAsc">Short → Long</option>
          <option value="touristDesc">Long → Short</option>
        {/if}

        {#if visaType === 'visaFree'}
          <option value="stayAsc">Short → Long</option>
          <option value="stayDesc">Long → Short</option>
        {/if}
      </select>
    {/if}

    <!-- Visa Type -->
    <select bind:value={visaType} class="text-[10px] font-bold uppercase p-2 rounded border bg-slate-50">
      <option value="all">Visa Type: All</option>
      <option value="nomad">Digital Nomad Visa</option>
      <option value="tourist">Tourist Visa</option>
      <option value="visaFree">Visa‑Free Stay</option>
    </select>

  {/if}

</div>

<!-- EMPTY STATE -->
{#if filtered.length === 0}
  <p class="text-xs text-slate-500 italic">No countries match these filters.</p>
{:else}

<!-- RESULTS GRID -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each filtered as country, i}

    <!-- PRECOMPUTE TOURIST MONTHS SAFELY -->
    {#key country.slug}
{@const touristMonths =
  (country.data.travelReadiness.visa as any).longStayTouristVisaMonths ??
  (country.data.travelReadiness.visa as any).touristVisaMonths ??
  null
}


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

          <!-- SEASON MODE -->
{#if selectedMonth !== 'none'}
  <div class="flex justify-between border-b border-slate-50 pb-1 mb-1">
    <span class="text-slate-400 uppercase">Season</span>
    <span class="font-bold text-indigo-600">
      {getSeasonTier(country, selectedMonth)}
    </span>
  </div>
{/if}


          <!-- VISA MODE -->
          {#if selectedMonth === 'none'}

            {#if visaType === 'nomad' || visaType === 'all'}
              <div class="flex justify-between">
                <span class="text-slate-400 uppercase">Nomad Visa</span>
                <span class="font-bold text-slate-700">
                  {country.data.travelReadiness.visa.nomadVisa?.available
                    ? `${(country.data.travelReadiness.visa.nomadVisa as any)?.durationMonths ?? 0} Months`
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

            {#if visaType === 'tourist' || visaType === 'all'}
              <div class="flex justify-between">
                <span class="text-slate-400 uppercase">Tourist Visa</span>
                <span class="font-bold text-slate-700">
                  {touristMonths ? `${touristMonths} Months` : 'None'}
                </span>
              </div>
            {/if}

          {/if}

        </div>
      </button>
    {/key}

  {/each}
</div>

{/if}
