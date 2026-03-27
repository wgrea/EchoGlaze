<!-- src/lib/components/StayOptionCard.svelte -->
<script lang="ts">
  export let option: any;
  
  function getPriceRange(tier: number): string {
    const tiers: Record<number, string> = {
      1: '$15-35',
      2: '$35-55',
      3: '$55-90',
      4: '$90-140',
      5: '$140+'
    };
    return tiers[tier] || 'Varies';
  }
  
  function getTypeLabel(type: string): string {
    if (type === 'hostel') return '🏨 Hostel Spot';
    if (type === 'coliving') return '🏢 Coliving Hub';
    if (type === 'hotel') return '🏨 Hotel';
    return '🏠 Apartment';
  }
  
  function getSocialToneIcon(tone: string): string {
    if (tone === 'quiet') return '🤫';
    if (tone === 'social') return '🗣️';
    if (tone === 'party') return '🎉';
    return '💬';
  }
</script>

<div class="bg-white rounded-lg shadow hover:shadow-md transition p-4">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-lg font-semibold">{option.name}</h3>
    <span class="text-sm font-medium px-2 py-1 bg-gray-100 rounded">
      {getTypeLabel(option.type)}
    </span>
  </div>
  
  <div class="space-y-2 text-sm">
    <div class="flex items-center gap-2">
      <span>{option.verifiedWifi ? '✅' : '⚠️'}</span>
      <span>Verified WiFi: {option.verifiedWifi ? 'Yes' : 'Not verified'}</span>
    </div>
    
    <div class="flex items-center gap-2">
      <span>{getSocialToneIcon(option.socialTone)}</span>
      <span class="capitalize">{option.socialTone}</span>
    </div>
    
    <div>
      <span class="font-medium">Price:</span>
      <span> {getPriceRange(option.priceTier)}/night</span>
      {#if option.cityMultiplier && option.cityMultiplier !== 1}
        <span class="text-xs text-gray-500 ml-1">
          ({option.cityMultiplier > 1 ? '+' : ''}{Math.round((option.cityMultiplier - 1) * 100)}% vs avg)
        </span>
      {/if}
    </div>
    
    {#if option.amenities && option.amenities.length > 0}
      <div>
        <span class="font-medium">Amenities:</span>
        <div class="flex flex-wrap gap-1 mt-1">
          {#each option.amenities.slice(0, 3) as amenity}
            <span class="text-xs bg-gray-100 px-2 py-1 rounded">{amenity}</span>
          {/each}
          {#if option.amenities.length > 3}
            <span class="text-xs text-gray-500">+{option.amenities.length - 3} more</span>
          {/if}
        </div>
      </div>
    {/if}
    
    <div class="text-xs text-gray-500 mt-2">
      📍 {option.cityName}
    </div>
  </div>
</div>