<!-- src/lib/components/accommodation/FoodStrategyCard.svelte -->
<script lang="ts">
  export let strategy: any;
  const meals = ['breakfast', 'lunch', 'dinner', 'dessert'];
</script>

<div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-8">
  <div class="bg-orange-600 px-4 py-3">
    <h3 class="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
      🥗 Decision Engine: Food
    </h3>
  </div>
  
  <div class="p-4 space-y-4">
    {#each meals as meal}
      {#if strategy[meal]}
        <div class="group border-b border-gray-50 pb-3 last:border-0">
          <h4 class="text-[10px] font-black text-gray-300 uppercase mb-2 group-hover:text-orange-500 transition-colors">{meal}</h4>
          <div class="space-y-2">
            <div class="flex justify-between items-start gap-4">
              <span class="text-[11px] text-gray-800 leading-tight">
                <span class="font-bold text-green-600">BEST:</span> {strategy[meal].bestValue}
              </span>
            </div>
            <div class="flex justify-between items-start gap-4">
              <span class="text-[11px] text-gray-500 leading-tight">
                <span class="font-bold text-gray-400">CHEAP:</span> {strategy[meal].cheapest}
              </span>
            </div>
          </div>
        </div>
      {/if}
    {/each}

    {#if strategy.healthyCheap}
      <div class="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p class="text-[11px] text-blue-800 leading-relaxed italic">
          <span class="font-bold not-italic">Nomad Strategy:</span> {strategy.healthyCheap}
        </p>
      </div>
    {/if}
  </div>
</div>