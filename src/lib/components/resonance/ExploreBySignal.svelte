<!-- src/lib/components/resonance/ExploreBySignal.svelte -->
<script lang="ts">
    import type { ResonanceSignal, ResonancePlace } from '$lib/schema/types';

    // 1. Interfaces (no export)
    // Already imported above

    // 2. Exported props
    export let signals: ResonanceSignal[] = [];
    export let places: ResonancePlace[] = [];

    // 3. Local state
    let selectedSignals: string[] = [];

    // 4. Functions
    function toggleSignal(name: string) {
        selectedSignals = selectedSignals.includes(name)
            ? selectedSignals.filter(s => s !== name)
            : [...selectedSignals, name];
    }

    // 5. Reactive values
    $: filteredPlaces =
        selectedSignals.length === 0
            ? places
            : places.filter(p => p.signalMatch >= 80);
</script>

<div>
    <h2 class="text-2xl font-semibold mb-4">Explore by Signal</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- SIGNALS -->
        <div class="space-y-4">
            <h3 class="text-lg font-medium">Signals</h3>

            <div class="space-y-2">
                {#each signals.slice(0, 5) as signal (signal.name)}
                    <button
                        type="button"
                        class="w-full text-left p-3 rounded-lg border transition
                               {selectedSignals.includes(signal.name)
                                   ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                                   : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'}"
                        on:click={() => toggleSignal(signal.name)}
                    >
                        <div class="flex justify-between items-center">
                            <span class="font-medium">{signal.name}</span>
                            <span class="text-sm text-blue-600 dark:text-blue-400">
                                {signal.intensity}
                            </span>
                        </div>
                    </button>
                {/each}
            </div>
        </div>

        <!-- PLACES -->
        <div class="space-y-4">
            <h3 class="text-lg font-medium">Recommended Places</h3>

            <div class="space-y-2">
                {#each filteredPlaces as place (place.name)}
                    <div class="p-3 rounded-lg border bg-gray-50 dark:bg-gray-800">
                        <div class="font-medium">{place.name}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            {place.description}
                        </div>
                        <div class="text-xs text-green-600 dark:text-green-400 mt-1">
                            Signal Match: {place.signalMatch}%
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
