<!-- src/lib/components/ResonanceSignalsChart.svelte -->
<script lang="ts">
  export let signals: any;
  
  const topSignals = [
    { label: 'Nightlife', value: signals?.nightlifeOverall || 0 },
    { label: 'Social Meetups', value: signals?.socialMeetups || 0 },
    { label: 'Solo Friendly', value: signals?.soloFriendly || 0 },
    { label: 'Festival Culture', value: signals?.festivalCulture || 0 },
    { label: 'Safety at Night', value: signals?.safetyAtNight || 0 }
  ];
</script>

<div class="bg-white rounded-lg shadow p-6">
  <h2 class="text-xl font-semibold mb-4">🎯 Vibe Signals</h2>
  <div class="space-y-3">
    {#each topSignals as signal}
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span>{signal.label}</span>
          <span>{signal.value}/10</span>
        </div>
        <div class="h-2 bg-gray-200 rounded">
          <div class="h-2 bg-purple-500 rounded" style="width: {signal.value * 10}%"></div>
        </div>
      </div>
    {/each}
  </div>
</div>