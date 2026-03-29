<!-- src/lib/components/resonance/ExploreBySignal.svelte -->
<script lang="ts">
    export let signals: Array<{ name: string; intensity: number; description?: string }> = [];
    export let places: Array<{ name: string; slug: string; description: string; signalMatch: number }> = [];
</script>

<div>
    <h2 class="text-2xl font-semibold mb-4">Explore by Signal</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Signals</h3>
            <div class="space-y-2">
                {#each signals.slice(0, 5) as signal (signal.name)}
                    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="font-medium">{signal.name}</span>
                            <span class="text-sm text-blue-600 dark:text-blue-400">{signal.intensity}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Recommended Places</h3>
            <div class="space-y-2">
                {#each places as place (place.name)}
                    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div class="font-medium">{place.name}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">{place.description}</div>
                        <div class="text-xs text-green-600 dark:text-green-400 mt-1">
                            Signal Match: {place.signalMatch}%
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>