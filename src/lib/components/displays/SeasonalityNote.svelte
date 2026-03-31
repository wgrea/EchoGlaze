<!-- src/lib/components/echoglazeui/displays/SeasonalityNote.svelte -->
<script lang="ts">
  export let seasonality: {
    bestMonths: number[];
    expensiveMonths: number[];
    cheapMonths: number[];
    seasonalMultipliers: {
      winter: number;
      summer: number;
      shoulder: number;
    };
  };
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Define the season notes with explicit typing
  type SeasonType = 'expensive' | 'cheap' | 'shoulder';
  
  const seasonNotes: Record<SeasonType, { text: string; color: string }> = {
    expensive: { text: 'Summer is more expensive', color: 'text-orange-600' },
    cheap: { text: 'Winter is cheaper', color: 'text-green-600' },
    shoulder: { text: 'Shoulder season is ideal', color: 'text-blue-600' }
  };
  
  // Get current season with proper typing
  $: currentSeason = (() => {
    const month = new Date().getMonth();
    if (seasonality.expensiveMonths.includes(month)) return 'expensive' as SeasonType;
    if (seasonality.cheapMonths.includes(month)) return 'cheap' as SeasonType;
    return 'shoulder' as SeasonType;
  })();
</script>

<div class="seasonality-note p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
  <div class="flex items-center gap-2">
    <span>📅</span>
    <span class="text-sm font-medium">Seasonal Note:</span>
    <span class={`text-sm ${seasonNotes[currentSeason].color}`}>
      {seasonNotes[currentSeason].text}
    </span>
  </div>
  <div class="mt-2 text-xs text-gray-600">
    <div>Best time: {seasonality.bestMonths.map(m => monthNames[m]).join(', ')}</div>
    <div class="mt-1 text-gray-500">💡 Flight and stay prices fluctuate together with seasons</div>
  </div>
</div>