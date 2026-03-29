<!-- src/lib/components/resonance/TopSignals.svelte -->
<script lang="ts">
    export let items: Array<{ name: string; intensity: number; description?: string }> = [];
</script>

<div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Top Resonance Signals</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each items as signal (signal.name)}
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        {signal.name}
                    </h3>
                    <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {signal.intensity}
                    </span>
                </div>
                {#if signal.description}
                    <p class="text-gray-600 dark:text-gray-300 text-sm">
                        {signal.description}
                    </p>
                {/if}
                <div class="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                        class="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                        style="width: {signal.intensity}%"
                    ></div>
                </div>
            </div>
        {/each}
    </div>
    {#if items.length === 0}
        <p class="text-gray-500 dark:text-gray-400 text-center py-8">
            No signals available for this location.
        </p>
    {/if}
</div>