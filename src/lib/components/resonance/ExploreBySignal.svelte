<!-- src/lib/components/resonance/ExploreBySignal.svelte -->
<script lang="ts">
    import type { ResonanceSignals } from '$lib/schema/types';

    export let signals: { name: string; intensity: number }[] = [];
    export let places: any[] = [];

    const signalNameMap: Record<string, string> = {
        nightlifeOverall: "Nightlife",
        lateNightDining: "Late Night Dining",
        musicScene: "Music Scene",
        danceScene: "Dance Scene",
        barDensity: "Bar Density",
        safetyAtNight: "Night Safety",
        socialMeetups: "Social Meetups",
        waterActivities: "Water Activities",
        snowActivities: "Snow Activities",
        natureAccess: "Nature Access",
        festivalCulture: "Festival Culture",
        socialProximity: "Social Ease",
        soloFriendly: "Solo Friendly",
        expatCommunityStrength: "Expat Community"
    };

    let selectedSignals: string[] = [];

    function toggleSignal(name: string) {
        selectedSignals = selectedSignals.includes(name)
            ? selectedSignals.filter(s => s !== name)
            : [...selectedSignals, name];
    }

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
                {#each signals as signal (signal.name)}
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
    </div>
</div>
