<!-- src/lib/components/StayOptionsList.svelte -->
<script lang="ts">
  import type { StayOption } from '$lib/schema/types';
  
  export let options: StayOption[];
  export let cityName: string;
  export let cityMultiplier: number;
  
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
    return type === 'hotel' ? '🏨 Hotel' : '🏠 Apartment';
  }
</script>

<div class="mt-8">
  <h2 class="text-2xl font-semibold mb-4">🏠 Stay Options in {cityName}</h2>
  {#if options.length === 0}
    <p class="text-gray-500">No stay options available yet.</p>
  {:else}
    <div class="grid md:grid-cols-2 gap-4">
      {#each options as option}
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-start mb-2">
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
            
            <div>
              <span class="font-medium">Social Tone:</span>
              <span class="capitalize"> {option.socialTone}</span>
            </div>
            
            <div>
              <span class="font-medium">Price:</span>
              <span> {getPriceRange(option.priceTier)}/night</span>
              {#if cityMultiplier !== 1}
                <span class="text-xs text-gray-500">
                  ({cityMultiplier > 1 ? '+' : ''}{Math.round((cityMultiplier - 1) * 100)}% vs country avg)
                </span>
              {/if}
            </div>
            
            {#if option.amenities.length > 0}
              <div>
                <span class="font-medium">Amenities:</span>
                <div class="flex flex-wrap gap-1 mt-1">
                  {#each option.amenities as amenity}
                    <span class="text-xs bg-gray-100 px-2 py-1 rounded">{amenity}</span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>