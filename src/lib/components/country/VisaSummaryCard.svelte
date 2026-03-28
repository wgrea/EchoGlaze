<!-- src/lib/components/VisaSummaryCard.svelte -->
<script lang="ts">
  export let visa: any;
</script>

{#if visa}
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">🛂 Visa Summary</h2>
    <div class="space-y-2">
      <p><span class="font-medium">Type:</span> {visa.type}</p>
      <p><span class="font-medium">Duration:</span> {visa.duration} days</p>
      {#if visa.extensionPossible}
        <p><span class="font-medium">Extension:</span> Possible</p>
      {/if}
      <p><span class="font-medium">Cost:</span> ${visa.cost}</p>
      {#if visa.difficulty}
        <p><span class="font-medium">Difficulty:</span> {visa.difficulty}/10</p>
      {/if}
    </div>
  </div>
{/if}