<!-- src/lib/components/echoglazeui/cards/StayOptionCard.svelte -->
<script lang="ts">
  import type { StayOption } from '$lib/types';
  import WifiBadge from '../badges/WifiBadge.svelte';
  
  export let option: StayOption;
  // Removed unused cityMultiplier and countryBaseMultiplier
  
  // UI Rule: Different labels for Hostel vs Coliving
  const getTypeLabel = (type: string) => {
    if (type === 'hostel') return { label: 'Hostel Spot', icon: '🎒', desc: 'Social, budget-friendly, expect some noise' };
    if (type === 'coliving') return { label: 'Coliving Hub', icon: '💼', desc: 'Work-focused, community, quieter environment' };
    return { label: type, icon: '🏠', desc: '' };
  };
  
  const typeConfig = getTypeLabel(option.type);
  
  // Value Upgrade Bridge logic
  $: isValueUpgrade = option.type === 'coliving' && option.priceTier <= 2;
  
  // Price tier display
  const priceTiers = {
    1: { usd: '$35–$50', label: 'Budget Friendly' },
    2: { usd: '$55–$85', label: 'Standard' },
    3: { usd: '$90–$130', label: 'Premium' },
    4: { usd: '$140+', label: 'Luxury' },
    5: { usd: 'Varies', label: 'High End' }
  };
</script>

<div class="nostalgic-card p-4">
  <div class="flex items-start justify-between">
    <div>
      <div class="flex items-center gap-2">
        <span class="text-2xl">{typeConfig.icon}</span>
        <h3 class="font-semibold">{typeConfig.label}</h3>
        {#if option.verifiedWifi}
          <WifiBadge score={4.5} /> <!-- Would need actual wifi score -->
        {/if}
      </div>
      <p class="text-sm text-gray-600 mt-1">{typeConfig.desc}</p>
    </div>
    <div class="text-right">
      <div class="font-mono font-bold">{priceTiers[option.priceTier].usd}</div>
      <div class="text-xs text-gray-500">{priceTiers[option.priceTier].label}</div>
    </div>
  </div>
  
  {#if isValueUpgrade}
    <div class="mt-3 p-2 bg-amber-50 rounded-lg text-sm">
      💡 Value Upgrade: Private room/desk for the price of a Tier 4 Hostel room
    </div>
  {/if}
  
  <div class="mt-3">
    <div class="flex flex-wrap gap-2">
      {#each option.amenities.slice(0, 3) as amenity}
        <span class="text-xs px-2 py-1 bg-gray-100 rounded-full">{amenity}</span>
      {/each}
      {#if option.amenities.length > 3}
        <span class="text-xs text-gray-500">+{option.amenities.length - 3} more</span>
      {/if}
    </div>
  </div>
  
  <div class="mt-3 flex items-center gap-2">
    <span class="text-sm">
      {#if option.socialTone === 'quiet'}🔇 Quiet{/if}
      {#if option.socialTone === 'social'}🗣️ Social{/if}
      {#if option.socialTone === 'party'}🎉 Party{/if}
      {#if option.socialTone === 'mixed'}🔄 Mixed{/if}
    </span>
  </div>
</div>

<style>
  .nostalgic-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,245,0.98));
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05);
    backdrop-filter: blur(2px);
    transition: all 0.2s ease;
  }
  
  .nostalgic-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.05);
  }
</style>