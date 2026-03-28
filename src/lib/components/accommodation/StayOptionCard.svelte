<!-- This file to shows the data -->
<!-- src/lib/components/accommodation/StayOptionCard.svelte -->
<script lang="ts">
  export let option: any;
  
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
  
function getWorkabilityStatus(score: number) {
  // 4.5 - 5.0: The Elite Tier (4K, Heavy Uploads, Zero Latency)
  if (score >= 4.5) {
    return { 
      label: 'High-Bandwidth / 4K Ready', 
      color: 'bg-indigo-100 text-indigo-700' 
    };
  }
  
  // 3.0 - 4.4: The Professional Standard (Stable Zoom, Screenshare, VPN)
  // Since we don't add data below 3.0, this is our "Baseline"
  return { 
    label: 'Standard Video Sync', 
    color: 'bg-blue-100 text-blue-700' 
  };
}

  // RECTIVE DECLARATION: This replaces the const declaration.
  // It will automatically re-calculate if 'option' changes.
  $: workStatus = getWorkabilityStatus(option.wifiScore || 0);
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
      <div class="flex items-center justify-between mt-4">
        <div class="flex flex-col">
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Workability</span>
          <span class="text-sm font-black {option.wifiScore >= 4 ? 'text-green-600' : 'text-orange-500'}">
            {option.wifiScore}/5
          </span>
        </div>
        
<div class="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
  {option.wifiScore >= 4.5 ? '🚀 Ultra-Stable' : '💻 Meeting Ready'}
</div>
      </div>

      <div class="flex justify-between border-t border-gray-50 pt-2">
        <span class="font-medium text-xs">Price Tier</span>
        <span class="text-gray-900 font-bold text-xs">{getPriceTierLabel(option.priceTier)}</span>
      </div>
      
      <div class="flex flex-wrap gap-1.5 pt-2">
        {#each option.amenities?.slice(0, 3) || [] as amenity}
          <span class="text-[11px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-100">
            {amenity}
          </span>
        {/each}
      </div>
    </div>
  </div>
</div>