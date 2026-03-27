<!-- src/lib/components/echoglazeui/comparisons/ValueComparison.svelte -->
<script lang="ts">
  export let cityName: string;
  export let cityMultiplier: number;
  export let referenceCityName: string;
  export let referenceMultiplier: number;
  
  // UI Rule: "Cheaper Than" Logic
  $: percentDiff = Math.abs(((cityMultiplier - referenceMultiplier) / referenceMultiplier) * 100);
  $: isCheaper = cityMultiplier < referenceMultiplier;
  $: message = isCheaper 
    ? `${cityName} is ${percentDiff.toFixed(0)}% more affordable for housing than ${referenceCityName}.`
    : `${cityName} is ${percentDiff.toFixed(0)}% more expensive for housing than ${referenceCityName}.`;
</script>

<div class="value-comparison p-3 bg-blue-50 rounded-lg">
  <p class="text-sm">
    {#if isCheaper}
      💰 Budget Friendly: 
    {:else}
      💸 Premium Zone: 
    {/if}
    {message}
  </p>
</div>