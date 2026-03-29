<!-- src/routes/logistics/[from]/[to]/+page.svelte -->
<script lang="ts">
  import type { Country, Visa } from '$lib/schema/types';
  import VisaSummaryCard from '$lib/components/country/VisaSummaryCard.svelte';
  import FlightsSummaryCard from '$lib/components/country/FlightsSummaryCard.svelte';

  // This tells TS exactly what to expect from the +page.ts loader
  export let data: {
    destination: Country;
    visaInfo: Visa;
    originId: string;
  };

  const { destination, visaInfo, originId } = data;

  // Logic to find the right flight hub data
  const flightData = destination.flightsSummary.fromMajorHubs[originId] || 
                     destination.flightsSummary.fromMajorHubs['united-states'];
</script>

<div class="p-6 max-w-5xl mx-auto space-y-8">
  <header class="flex justify-between border-b pb-4">
    <h1 class="text-2xl font-bold">{originId} to {destination.name}</h1>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <section>
      <div class="flex items-center gap-2 mb-4">
        <span class="i-heroicons-identification"></span> <h2 class="font-bold uppercase tracking-widest text-sm text-slate-500">Visa Requirements</h2>
      </div>
      
      <VisaSummaryCard visa={destination.visaSummary} />
    </section>

    <section>
      <div class="flex items-center gap-2 mb-4">
        <span class="i-heroicons-paper-airplane"></span> <h2 class="font-bold uppercase tracking-widest text-sm text-slate-500">Flight Intelligence</h2>
      </div>

      <FlightsSummaryCard flights={flightData} />
    </section>
  </div>
</div>