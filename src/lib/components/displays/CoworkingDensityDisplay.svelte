<!-- src/lib/components/echoglazeui/displays/CoworkingDensityDisplay.svelte -->
<script lang="ts">
  export let density: number | undefined;
  
  const getDensityConfig = (score: number) => {
    if (score >= 8) return { 
      label: 'Hub City', 
      desc: '10+ workspaces nearby. If one goes down, you have a backup within walking distance.',
      icon: '🏙️'
    };
    return { 
      label: 'Solo Spot', 
      desc: 'Limited dedicated workspaces. Best to rely on your accommodation’s verified WiFi.',
      icon: '🏠'
    };
  };
  
  $: config = density ? getDensityConfig(density) : null;
</script>

{#if config}
  <div class="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
    <span class="text-xl">{config.icon}</span>
    <div>
      <div class="font-semibold text-sm">{config.label}</div>
      <div class="text-xs text-gray-600">{config.desc}</div>
    </div>
  </div>
{/if}