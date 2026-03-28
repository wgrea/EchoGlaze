<!-- src/lib/components/FoodStrategyCard.svelte -->
<script lang="ts">
  export let foodAffordability: { grocery: number; streetFood: number; diningOut: number };
  
  function getCostLevel(score: number): string {
    if (score <= 4) return 'Very Cheap';
    if (score <= 6) return 'Cheap';
    if (score <= 8) return 'Moderate';
    return 'Expensive';
  }
</script>

<div class="bg-white rounded-lg shadow p-6">
  <h2 class="text-xl font-semibold mb-4">🍜 Food Strategy</h2>
  <div class="space-y-3">
    <div>
      <div class="flex justify-between text-sm mb-1">
        <span>Groceries</span>
        <span>{getCostLevel(foodAffordability.grocery)}</span>
      </div>
      <div class="h-2 bg-gray-200 rounded">
        <div class="h-2 bg-green-500 rounded" style="width: {10 - foodAffordability.grocery * 10}%"></div>
      </div>
    </div>
    
    <div>
      <div class="flex justify-between text-sm mb-1">
        <span>Street Food</span>
        <span>{getCostLevel(foodAffordability.streetFood)}</span>
      </div>
      <div class="h-2 bg-gray-200 rounded">
        <div class="h-2 bg-yellow-500 rounded" style="width: {10 - foodAffordability.streetFood * 10}%"></div>
      </div>
    </div>
    
    <div>
      <div class="flex justify-between text-sm mb-1">
        <span>Dining Out</span>
        <span>{getCostLevel(foodAffordability.diningOut)}</span>
      </div>
      <div class="h-2 bg-gray-200 rounded">
        <div class="h-2 bg-orange-500 rounded" style="width: {10 - foodAffordability.diningOut * 10}%"></div>
      </div>
    </div>
  </div>
</div>