<!-- src/lib/components/NomadFriendlinessCard.svelte -->
<script lang="ts">
  export let infra: number;
  export let vibe: number;
  export let safety: number;
  
  function getInfraLabel(score: number): string {
    if (score >= 9) return 'Ultra‑Reliable Work Hub';
    if (score >= 7) return 'Reliable for Most Workflows';
    if (score >= 5) return 'Mixed Reliability';
    return 'Unpredictable for Remote Work';
  }
  
  function getVibeLabel(score: number): string {
    if (score >= 9) return 'Effortless Daily Life';
    if (score >= 7) return 'Generally Comfortable';
    if (score >= 5) return 'High Friction';
    return 'Difficult for Long Stays';
  }
</script>

<div class="bg-white rounded-lg shadow p-6">
  <h2 class="text-xl font-semibold mb-4">🌍 Nomad Friendliness</h2>
  <div class="space-y-4">
    <div>
      <div class="flex justify-between mb-1">
        <span class="font-medium">Infrastructure</span>
        <span class="text-sm text-gray-600">{getInfraLabel(infra)}</span>
      </div>
      <div class="h-2 bg-gray-200 rounded">
        <div class="h-2 bg-blue-500 rounded" style="width: {infra * 10}%"></div>
      </div>
    </div>
    
    <div>
      <div class="flex justify-between mb-1">
        <span class="font-medium">Vibe & Livability</span>
        <span class="text-sm text-gray-600">{getVibeLabel(vibe)}</span>
      </div>
      <div class="h-2 bg-gray-200 rounded">
        <div class="h-2 bg-green-500 rounded" style="width: {vibe * 10}%"></div>
      </div>
    </div>
    
    <div>
      <div class="flex justify-between mb-1">
        <span class="font-medium">Safety</span>
        <span class="text-sm text-gray-600">{safety}/10</span>
      </div>
      <div class="h-2 bg-gray-200 rounded">
        <div class="h-2 bg-yellow-500 rounded" style="width: {safety * 10}%"></div>
      </div>
    </div>
  </div>
</div>