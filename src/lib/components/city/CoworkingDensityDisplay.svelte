<!-- src/lib/components/CoworkingDensityDisplay.svelte -->
<script lang="ts">
  export let density: number | undefined = undefined;
  
  function getDensityInfo() {
    if (density === undefined) return { label: 'No Data', description: 'Coworking information not available', icon: '❓' };
    
    if (density >= 7) {
      return {
        label: '🏙️ Hub City',
        description: `${density}/10 density - 10+ workspaces nearby. If one goes down, you have a backup within walking distance.`,
        icon: '🏙️'
      };
    } else {
      return {
        label: '🌿 Solo Spot',
        description: `${density}/10 density - Limited dedicated workspaces. Best to rely on your accommodation's verified WiFi.`,
        icon: '🌿'
      };
    }
  }
  
  const info = getDensityInfo();
</script>

{#if density !== undefined}
  <div class="space-y-1">
    <div class="flex items-center gap-2">
      <span class="text-xl">{info.icon}</span>
      <span class="font-medium">{info.label}</span>
    </div>
    <p class="text-sm text-gray-600">{info.description}</p>
  </div>
{/if}