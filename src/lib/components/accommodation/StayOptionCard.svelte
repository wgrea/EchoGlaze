<!-- This file to shows the data -->
<!-- src/lib/components/accommodation/StayOptionCard.svelte -->
<script lang="ts">
  export let option: any;
  
  // Add this function if it's missing
  function getPriceTierLabel(tier: number): string {
    const labels: Record<number, string> = {
      1: 'Ultra Budget',
      2: 'Budget',
      3: 'Moderate',
      4: 'Premium',
      5: 'Luxury'
    };
    return labels[tier] || 'Contact for Price';
  }
  
  // Helper function to get WiFi score
  function getWifiScore(option: any): number {
    return option.wifiScore || option.wifiMin || option.wifiRating || option.wifi || 0;
  }
  
  function getWorkabilityStatus(score: number) {
    if (score >= 9) return { label: 'Ultra-Reliable Hub', color: 'bg-green-100 text-green-700' };
    if (score >= 7) return { label: 'Reliable Workflow', color: 'bg-blue-100 text-blue-700' };
    return { label: 'Async Only', color: 'bg-amber-100 text-amber-700' };
  }

  const wifiScore = getWifiScore(option);
  const workStatus = getWorkabilityStatus(wifiScore);
</script>

<div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
  <div class="p-5">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-lg font-bold text-gray-800">{option.name}</h3>
      <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-gray-50 text-gray-400 rounded">
        {option.type}
      </span>
    </div>

    <div class="flex items-center gap-2 mb-4">
      <span class={`text-xs font-bold px-2 py-0.5 rounded-full ${workStatus.color}`}>
        {workStatus.label}
      </span>
    </div>
    
    <div class="space-y-3 text-sm text-gray-600">
      <div class="flex justify-between">
        <span class="font-medium">Workability</span>
        <span class="text-gray-900 font-semibold">{wifiScore}/10</span>
      </div>

      <div class="flex justify-between border-t border-gray-50 pt-2">
        <span class="font-medium">Price Tier</span>
        <span class="text-gray-900">{getPriceTierLabel(option.priceTier)}</span>
      </div>
      
      <div class="flex flex-wrap gap-1.5 pt-2">
        {#each option.amenities?.slice(0, 3) || [] as amenity}
          <span class="text-[11px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-100">
            {amenity}
          </span>
        {/each}
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
      <span>📍 {option.cityName}</span>
      <button class="text-orange-500 font-bold hover:underline">View Details →</button>
    </div>
  </div>
</div>