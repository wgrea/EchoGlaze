<!-- src/routes/transportation/+page.svelte -->
<script lang="ts">
  import { loadCountry } from '$lib/loaders/countryLoader';
  import type { Transportation, Country } from '$lib/schema/types';
  import { COUNTRY_REGISTRY } from '$lib/data/manifest';

  console.log("TRANSPORTATION PAGE HYDRATED");

  // Same selector state as Logistics
  let to = 'azerbaijan';
  let destinationData: Country | null = null;
  let transportation: Transportation | null = null;
  let loading = false;

  // Build the dropdown list exactly like Logistics
  const countries = COUNTRY_REGISTRY.map(c => ({
    id: c.slug,
    name: c.data.name,
    icon: c.icon
  }));

  // Reactive: whenever "to" changes, reload
  $: if (to) updateTransportation(to);

  async function updateTransportation(dest: string) {
    loading = true;
    try {
      destinationData = await loadCountry(dest);
      transportation = destinationData?.transportation ?? null;
    } catch (e) {
      console.error("Failed to load transportation:", e);
    } finally {
      loading = false;
    }
  }
</script>

<nav class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 shadow-sm">
  <div class="max-w-5xl mx-auto flex items-center justify-between gap-4">
    <div class="flex items-center gap-2">
      <span class="text-xl">🚗</span>
      <select bind:value={to} class="bg-transparent font-bold text-indigo-600 outline-none cursor-pointer text-sm">
        {#each countries as c}
          <option value={c.id}>{c.icon} {c.name}</option>
        {/each}
      </select>
    </div>

    {#if destinationData}
      <div class="text-right">
        <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 block leading-none mb-1">Region</span>
        <span class="text-xs font-bold text-slate-600">{destinationData.region}</span>
      </div>
    {/if}
  </div>
</nav>

<div class="max-w-6xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-gray-900 mb-2">🚗 Transportation</h1>
  <p class="text-gray-600 mb-8">How locals move — cheapest by day, safest by night.</p>

  {#if loading}
    <p class="text-slate-400">Loading transportation data...</p>
{:else if transportation}
  <!-- Daytime Mobility -->
  <section class="bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-3">🌞 Daytime Mobility</h2>
    <p><strong>Default mode:</strong> {transportation.daytime.defaultMode}</p>
    <p><strong>Cheapest mode:</strong> {transportation.daytime.cheapestMode}</p>
    {#if transportation.daytime.recommendedCard}
      <p><strong>Recommended card:</strong> {transportation.daytime.recommendedCard}</p>
    {/if}
    {#if transportation.daytime.notes}
      <p class="text-xs text-slate-500 mt-2">{transportation.daytime.notes}</p>
    {/if}
  </section>

  <!-- Nighttime Mobility -->
  <section class="bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-3">🌙 Nighttime Mobility</h2>
    <p><strong>Safest mode:</strong> {transportation.nighttime.safestMode}</p>
    <p><strong>Recommended apps:</strong> {transportation.nighttime.recommendedApps.join(', ')}</p>
    {#if transportation.nighttime.notes}
      <p class="text-xs text-slate-500 mt-2">{transportation.nighttime.notes}</p>
    {/if}
  </section>

  <!-- Apps -->
  <section class="bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-3">📱 Recommended Apps</h2>
    <p><strong>Ride‑hailing:</strong> {transportation.apps.rideHailing.join(', ')}</p>
    <p><strong>Transit:</strong> {transportation.apps.transit.join(', ')}</p>
    {#if transportation.apps.navigation}
      <p><strong>Navigation:</strong> {transportation.apps.navigation.join(', ')}</p>
    {/if}
  </section>

  <!-- Intercity -->
  {#if transportation.intercity}
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-3">🚆 Intercity Travel</h2>
      <p><strong>Cheapest:</strong> {transportation.intercity.cheapest}</p>
      <p><strong>Fastest:</strong> {transportation.intercity.fastest}</p>
      <p><strong>Recommended:</strong> {transportation.intercity.recommended}</p>
    </section>
  {/if}
  {/if}
</div>
