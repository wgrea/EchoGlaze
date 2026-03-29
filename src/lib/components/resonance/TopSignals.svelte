<!-- src/lib/components/resonance/TopSignals.svelte -->
<script lang="ts">
    import type { ResonanceSignal } from '$lib/schema/types';

    export let items: ResonanceSignal[] | undefined;
</script>

<div class="mt-8">
    <h2 class="text-2xl font-semibold mb-4">Top Resonance Signals</h2>

    {#if !items || items.length === 0}
        <p class="text-gray-500 text-sm">No signals available.</p>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each items as signal (signal.name)}
                <div class="p-4 rounded-lg border bg-gray-50 dark:bg-gray-800">
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-medium">{signal.name}</span>
                        <span class="text-sm text-blue-600 dark:text-blue-400">
                            {signal.intensity}
                        </span>
                    </div>

                    {#if signal.description}
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                            {signal.description}
                        </p>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>
