<!-- src/lib/components/echoglazeui/badges/NomadFriendlinessBadge.svelte -->
<script lang="ts">
  export let infra: number;
  export let vibe: number;
  
  const getInfraLabel = (score: number) => {
    if (score >= 9) return 'Ultra‑Reliable Work Hub';
    if (score >= 7) return 'Reliable for Most Workflows';
    if (score >= 5) return 'Mixed Reliability';
    if (score < 5) return 'Unpredictable for Remote Work';
    return null;
  };
  
  const getVibeLabel = (score: number) => {
    if (score >= 9) return 'Effortless Daily Life';
    if (score >= 7) return 'Generally Comfortable';
    if (score >= 5) return 'High Friction';
    if (score < 5) return 'Difficult for Long Stays';
    return null;
  };
  
  $: infraLabel = getInfraLabel(infra);
  $: vibeLabel = getVibeLabel(vibe);
  $: showWarning = infra < 5 || vibe < 5;
</script>

<div class="space-y-2">
  <div class="flex items-center gap-2">
    <span class="text-sm font-medium">💻 Work:</span>
    <span class="pill-badge {infra >= 7 ? 'bg-green-100' : infra >= 5 ? 'bg-yellow-100' : 'bg-red-100'}">
      {infraLabel}
    </span>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-sm font-medium">🌍 Live:</span>
    <span class="pill-badge {vibe >= 7 ? 'bg-green-100' : vibe >= 5 ? 'bg-yellow-100' : 'bg-red-100'}">
      {vibeLabel}
    </span>
  </div>
  {#if showWarning}
    <div class="text-xs text-amber-600 mt-1">
      ⚠️ {infra < 5 ? 'Work infrastructure may be challenging. ' : ''}
      {vibe < 5 ? 'Daily life may require extra effort.' : ''}
    </div>
  {/if}
</div>