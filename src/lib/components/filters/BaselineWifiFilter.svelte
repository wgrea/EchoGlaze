<!-- src/lib/components/filters/BaselineWifiFilter.svelte -->
<script lang="ts">
  import { writable } from 'svelte/store';
  
  // Global store for WiFi filter
  export const wifiThreshold = writable(3.0);
  
  // Utility function to filter cities/countries
  export function filterByWifiScore(items: any[], getWifiScore: (item: any) => number) {
    return items.filter(item => {
      const score = getWifiScore(item);
      return score !== undefined && score >= 3.0;
    });
  }
</script>

<div class="wifi-filter p-3 bg-gray-50 rounded-lg">
  <label class="text-sm font-medium flex items-center gap-2">
    <span>📶 WiFi Baseline:</span>
    <select bind:value={$wifiThreshold} class="text-sm border rounded-md p-1">
      <option value={3.0}>3.0+ (Work Viable)</option>
      <option value={3.5}>3.5+ (Standard Work)</option>
      <option value={4.5}>4.5+ (Power User)</option>
    </select>
  </label>
  <p class="text-xs text-gray-500 mt-1">
    Only showing places with WiFi suitable for remote work
  </p>
</div>