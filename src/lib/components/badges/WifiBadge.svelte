<!-- src/lib/components/echoglazeui/badges/WifiBadge.svelte -->
<script lang="ts">
  export let score: number | undefined;
  
  // UI Rule: Never render if WiFi score below 3.0
  const getWifiConfig = (score: number) => {
    if (score >= 4.5) return { 
      label: '🚀 Power User', 
      tooltip: '4K Streaming, Heavy Figma Syncing, & Large Git Pushes.',
      class: 'bg-gradient-to-r from-purple-100 to-purple-200'
    };
    if (score >= 3.5) return { 
      label: '💻 Standard Work', 
      tooltip: 'Smooth Zoom calls, Figma (light), and standard Dev work.',
      class: 'bg-gradient-to-r from-green-100 to-green-200'
    };
    if (score >= 3.0) return { 
      label: '📩 Lite / Async', 
      tooltip: 'Slack, Email, and Jira. May struggle with HD Video calls.',
      class: 'bg-gradient-to-r from-yellow-100 to-yellow-200'
    };
    return null;
  };
  
  $: config = score ? getWifiConfig(score) : null;
</script>

{#if config}
  <div class="pill-badge {config.class}" title={config.tooltip}>
    {config.label}
  </div>
{/if}

<style>
  .pill-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
</style>