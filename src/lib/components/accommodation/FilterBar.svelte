<!-- src/lib/components/FilterBar.svelte -->
<script lang="ts">
  export let filters: {
    type: string;
    wifiMin: number;
    maxPriceTier: string; // Changed from priceTier
    socialTone: string;
  };
  
  // WiFi descriptions from your green sticky note
  const wifiLevels = [
    { val: 3.0, label: '3.0+ | 📩 Lite / Async', desc: 'Slack, Email, Jira' },
    { val: 3.5, label: '3.5+ | 💻 Standard Work', desc: 'Zoom, Figma, Dev work' },
    { val: 4.5, label: '4.5+ | 🚀 Power User', desc: '4K Streaming, Large Pushes' }
  ];
</script>

<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div>
      <label for="type-filter" class="block text-xs font-bold uppercase text-gray-500 mb-2">Stay Type</label>
      <select id="type-filter" bind:value={filters.type} on:change
        class="w-full border-gray-200 rounded-lg text-sm focus:ring-orange-500">
        <option value="all">All Types</option>
        <option value="hostel">Hostels</option>
        <option value="coliving">Coliving</option>
      </select>
    </div>
    
    <div>
      <label for="wifi-filter" class="block text-xs font-bold uppercase text-gray-500 mb-2">WiFi Needs</label>
      <select id="wifi-filter" bind:value={filters.wifiMin} on:change
        class="w-full border-gray-200 rounded-lg text-sm">
        {#each wifiLevels as level}
          <option value={level.val}>{level.label}</option>
        {/each}
      </select>
    </div>
    
    <div>
      <label for="price-filter" class="block text-xs font-bold uppercase text-gray-500 mb-2">Budget Limit</label>
      <select id="price-filter" bind:value={filters.maxPriceTier} on:change
        class="w-full border-gray-200 rounded-lg text-sm">
        <option value="all">Any Budget</option>
        <option value="1">Entry Level (Tier 1)</option>
        <option value="2">Budget (Tier 2)</option>
        <option value="3">Mid-Range (Tier 3)</option>
        <option value="4">Premium (Tier 4)</option>
      </select>
    </div>
  </div>
</div>