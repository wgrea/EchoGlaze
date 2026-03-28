<!-- src/lib/components/SafetyPatternDisplay.svelte -->
<script lang="ts">
  export let safety: { day: number; night: number; notes: string };
  
  function getSafetyLevel(score: number): string {
    if (score >= 8) return 'Very Safe';
    if (score >= 6) return 'Generally Safe';
    if (score >= 4) return 'Exercise Caution';
    return 'High Risk';
  }
  
  function getColor(score: number): string {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  }
</script>

<div class="bg-white rounded-lg shadow p-6">
  <h2 class="text-xl font-semibold mb-4">🛡️ Safety Pattern</h2>
  <div class="space-y-3">
    <div class="flex justify-between">
      <span class="font-medium">Day:</span>
      <span class={getColor(safety.day)}>{getSafetyLevel(safety.day)} ({safety.day}/10)</span>
    </div>
    <div class="flex justify-between">
      <span class="font-medium">Night:</span>
      <span class={getColor(safety.night)}>{getSafetyLevel(safety.night)} ({safety.night}/10)</span>
    </div>
    <p class="text-sm text-gray-600 mt-2 italic">{safety.notes}</p>
  </div>
</div>