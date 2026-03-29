<!-- src/lib/components/WifiBadge.svelte -->
<script lang="ts">
  export let score: number | undefined = undefined;
  
  function getBadgeInfo() {
    if (score === undefined) return { label: 'No Data', tooltip: 'WiFi information not available', icon: '❓' };
    
    if (score >= 4.5) {
      return {
        label: '🚀 Power User',
        tooltip: '4K Streaming, Heavy Figma Syncing, & Large Git Pushes.',
        icon: '🚀'
      };
    } else if (score >= 3.5) {
      return {
        label: '💻 Standard Work',
        tooltip: 'Smooth Zoom calls, Figma (light), and standard Dev work.',
        icon: '💻'
      };
    } else if (score >= 3.0) {
      return {
        label: '📩 Lite / Async',
        tooltip: 'Slack, Email, and Jira. May struggle with HD Video calls.',
        icon: '📩'
      };
    } else {
      return {
        label: '⚠️ Unreliable',
        tooltip: 'Not recommended for work',
        icon: '⚠️'
      };
    }
  }
  
  const badge = getBadgeInfo();
</script>

<div class="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full" title={badge.tooltip}>
  <span>{badge.icon}</span>
  <span class="text-sm font-medium">{badge.label}</span>
  {#if score !== undefined}
    <span class="text-xs text-gray-500">({score.toFixed(1)})</span>
  {/if}
</div>