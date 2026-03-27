<!-- src/lib/components/PersonaFitBadge.svelte -->
<script lang="ts">
  export let personaFit: string[] | any;
  export let avoidIf: string[];
  
  function getPersonaList(): string[] {
    if (Array.isArray(personaFit)) {
      return personaFit;
    }
    return [];
  }
  
  const personas = getPersonaList();
</script>

<div class="space-y-4">
  {#if personas.length > 0}
    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 class="font-semibold text-green-800 mb-2">✨ Perfect For</h3>
      <div class="flex flex-wrap gap-2">
        {#each personas as persona}
          <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {persona}
          </span>
        {/each}
      </div>
    </div>
  {/if}
  
  {#if avoidIf && avoidIf.length > 0}
    <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <h3 class="font-semibold text-amber-800 mb-2">⚠️ Avoid If</h3>
      <ul class="list-disc list-inside text-amber-700">
        {#each avoidIf as reason}
          <li>{reason}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>