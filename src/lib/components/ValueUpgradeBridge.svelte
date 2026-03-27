<!-- src/lib/components/ValueUpgradeBridge.svelte -->
<script lang="ts">
  export let options: any[];
  
  // Find if there are any Tier 2 hostels and Tier 1 coliving spaces
  const tier2Hostels = options.filter(o => o.type === 'hostel' && o.priceTier === 2);
  const tier1Coliving = options.filter(o => o.type === 'coliving' && o.priceTier === 1);
  
  const hasUpgrade = tier2Hostels.length > 0 && tier1Coliving.length > 0;
</script>

{#if hasUpgrade}
  <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4 mb-6">
    <div class="flex items-start gap-3">
      <div class="text-2xl">💎</div>
      <div>
        <h3 class="font-semibold text-purple-800 mb-1">Value Upgrade Available</h3>
        <p class="text-sm text-purple-700">
          Consider upgrading from a Tier 2 Hostel to a Tier 1 Coliving space. 
          Get a private room and dedicated desk for the same price as a premium hostel dorm!
        </p>
        <div class="mt-2 text-xs text-purple-600">
          {tier1Coliving.length} coliving space{tier1Coliving.length !== 1 ? 's' : ''} available at budget-friendly rates
        </div>
      </div>
    </div>
  </div>
{/if}