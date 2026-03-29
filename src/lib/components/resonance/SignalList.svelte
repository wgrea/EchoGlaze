<!-- src/lib/components/resonance/SignalList.svelte -->
<script lang="ts">
    import type { ResonanceSignal } from '$lib/schema/types';

    export let items: ResonanceSignal[] | undefined;
</script>

<div class="mt-10">
    <h2 class="text-2xl font-semibold mb-4">All Resonance Signals</h2>

    {#if !items || items.length === 0}
        <p class="text-gray-500 text-sm">No signals available.</p>
    {:else}
        <div class="space-y-2">
            {#each items as signal (signal.name)}
                <div class="p-3 rounded-lg border bg-white dark:bg-gray-900">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="font-medium">{signal.name}</div>

                            {#if signal.description}
                                <div class="text-xs text-gray-600 dark:text-gray-400">
                                    {signal.description}
                                </div>
                            {/if}
                        </div>

                        <div class="text-sm text-blue-600 dark:text-blue-400">
                            {signal.intensity}/100
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
