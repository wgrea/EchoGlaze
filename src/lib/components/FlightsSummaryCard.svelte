<!-- src/lib/components/FlightsSummaryCard.svelte -->
<script lang="ts">
  export let flights: any;
</script>

{#if flights}
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">✈️ Flights</h2>
    <div class="space-y-2">
      <p><span class="font-medium">Best time to book:</span> {flights.bestTimeToBook}</p>
      <p class="text-sm text-gray-600">{flights.notes}</p>
      {#if flights.fromMajorHubs}
        <div class="mt-3">
          <p class="font-medium text-sm">From major hubs:</p>
          <div class="mt-1 space-y-1">
            {#each Object.entries(flights.fromMajorHubs) as [hub, details]}
              {@const price = (details as any).avgPrice}
              {@const duration = (details as any).duration}
              <p class="text-xs text-gray-600">{hub}: ${price} ({duration}h)</p>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}