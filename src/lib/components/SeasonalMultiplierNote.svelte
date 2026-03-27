<!-- src/lib/components/SeasonalMultiplierNote.svelte -->
<script lang="ts">
  export let seasonalMultipliers: {
    winter: number;
    summer: number;
    shoulder: number;
  } = { winter: 1, summer: 1, shoulder: 1 };
  
  export let bestMonths: number[] = [];
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
</script>

<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <h3 class="font-semibold text-blue-800 mb-2">📅 Seasonal Note</h3>
  <p class="text-blue-700 text-sm">
    {#if seasonalMultipliers}
      Winter is {Math.round((seasonalMultipliers.winter - 1) * 100)}% 
      {seasonalMultipliers.winter < 1 ? 'cheaper' : 'more expensive'} than average,
      Summer is {Math.round((seasonalMultipliers.summer - 1) * 100)}% 
      {seasonalMultipliers.summer < 1 ? 'cheaper' : 'more expensive'}.
    {/if}
    {#if bestMonths && bestMonths.length > 0}
      Best months: {bestMonths.map(m => monthNames[m-1]).join(', ')}
    {/if}
  </p>
  <p class="text-xs text-blue-600 mt-2">
    Note: Flight and stay prices fluctuate together with seasons.
  </p>
</div>