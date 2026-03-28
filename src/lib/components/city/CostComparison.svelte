<!-- src/lib/components/CostComparison.svelte -->
<script lang="ts">
  export let cityMultiplier: number;
  // Remove countryBase or make it a const export
  export const countryBase = undefined; // Not used in component
  
  function getComparisonText() {
    if (cityMultiplier < 1) {
      const percentCheaper = Math.round((1 - cityMultiplier) * 100);
      return `💰 Budget Friendly: ${percentCheaper}% cheaper than the country average.`;
    } else if (cityMultiplier > 1.2) {
      return `💎 Premium Zone: ${Math.round((cityMultiplier - 1) * 100)}% more expensive than the country average.`;
    } else {
      return `📊 Average: Costs are similar to the country average.`;
    }
  }
</script>

<div class="bg-white rounded-lg shadow p-6">
  <h2 class="text-xl font-semibold mb-4">💵 Cost Comparison</h2>
  <p class="text-gray-700">{getComparisonText()}</p>
  <p class="text-xs text-gray-500 mt-2">
    Base reference: Country average = 1.0
  </p>
</div>