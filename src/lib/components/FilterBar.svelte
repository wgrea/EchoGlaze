<!-- src/lib/components/FilterBar.svelte -->
<script lang="ts">
  export let filters: {
    type: string;
    wifiMin: number;
    priceTier: string;
    socialTone: string;
  };
  
  function updateFilter(key: string, value: any) {
    filters = { ...filters, [key]: value };
  }
</script>

<div class="bg-white rounded-lg shadow p-4 mb-6">
  <div class="flex flex-wrap gap-4">
    <div>
      <label for="type-filter" class="block text-sm font-medium text-gray-700 mb-1">Type</label>
      <select 
        id="type-filter"
        bind:value={filters.type} 
        on:change
        class="border rounded px-3 py-1 text-sm"
      >
        <option value="all">All</option>
        <option value="hostel">Hostels</option>
        <option value="coliving">Coliving</option>
        <option value="hotel">Hotels</option>
        <option value="apartment">Apartments</option>
      </select>
    </div>
    
    <div>
      <label for="wifi-filter" class="block text-sm font-medium text-gray-700 mb-1">WiFi Score</label>
      <select 
        id="wifi-filter"
        bind:value={filters.wifiMin} 
        on:change
        class="border rounded px-3 py-1 text-sm"
      >
        <option value={3.0}>3.0+ (Minimal)</option>
        <option value={3.5}>3.5+ (Standard)</option>
        <option value={4.0}>4.0+ (Good)</option>
        <option value={4.5}>4.5+ (Power User)</option>
      </select>
    </div>
    
    <div>
      <label for="price-filter" class="block text-sm font-medium text-gray-700 mb-1">Price Tier</label>
      <select 
        id="price-filter"
        bind:value={filters.priceTier} 
        on:change
        class="border rounded px-3 py-1 text-sm"
      >
        <option value="all">All</option>
        <option value="1">Budget ($15-35)</option>
        <option value="2">Moderate ($35-55)</option>
        <option value="3">Mid-Range ($55-90)</option>
        <option value="4">Premium ($90-140)</option>
        <option value="5">Luxury ($140+)</option>
      </select>
    </div>
    
    <div>
      <label for="social-filter" class="block text-sm font-medium text-gray-700 mb-1">Social Tone</label>
      <select 
        id="social-filter"
        bind:value={filters.socialTone} 
        on:change
        class="border rounded px-3 py-1 text-sm"
      >
        <option value="all">All</option>
        <option value="quiet">🤫 Quiet / Focus</option>
        <option value="mixed">💬 Mixed</option>
        <option value="social">🗣️ Social</option>
        <option value="party">🎉 Party</option>
      </select>
    </div>
  </div>
</div>