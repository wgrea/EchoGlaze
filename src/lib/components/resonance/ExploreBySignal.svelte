<!-- src/lib/components/resonance/ExploreBySignal.svelte -->
<script lang="ts">
    interface SignalItem {
        name: string;
        intensity: number;
    }

    export let signals: SignalItem[] = [];
    export let places: any[] = []; // Used in filteredPlaces below to clear warning

    // 1. MATCHING KEYS (Must match your transformer exactly: "Snow Activities")
    const sections = [
            { 
            title: "💃 Energy & Scene", 
            keys: ['Drinking Culture', 'Dance Scene', 'Music Scene', 'Nightlife', 'Bar Density'],
            color: "border-purple-200 bg-purple-50/30 dark:bg-purple-900/10" 
        },    
    { 
            title: "🌍 Geographic Base", 
            keys: ['Snow Activities', 'Water Activities'], 
            color: "border-blue-200 bg-blue-50/30 dark:bg-blue-900/10"
        }
    ];

    // 2. THE MAP (Defined here so the HTML can see it)
    const nameMap: Record<string, string> = {
        "Snow Activities": "Snow / Alpine",
        "Water Activities": "Water / Coastal",
        "Dance Scene": "Dance Scene",
        "Music Scene": "Live Music",
        "Nightlife": "Nightlife Overall",
        "Bar Density": "Bar Density",
        "Drinking Culture": "Drinking Culture"
    };

    export let selectedSignals: string[] = [];

    // Reactive: Assigns signals to buckets
    $: assignedKeys = sections.flatMap(s => s.keys);
    $: otherSignals = signals.filter(s => !assignedKeys.includes(s.name));
    
    // Reactive: Helper to find signal by key
    $: getSignal = (key: string) => signals.find(s => s.name === key);

    // Reactive: Consumes 'places' to fix the "Unused Export" warning
    $: filteredPlaces = selectedSignals.length === 0 
        ? places 
        : places.filter(p => p.signalMatch >= 80);

function toggleSignal(name: string) {
    // Single selection: if it's already selected, clear it. 
    // Otherwise, replace the whole array with just the new name.
    selectedSignals = selectedSignals.includes(name) ? [] : [name];
}
</script>

<div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each sections as section}
            <div class="p-5 rounded-2xl border {section.color}">
                <h3 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                    {section.title}
                </h3>
                
                <div class="space-y-3">
                    {#each section.keys as key}
                        {@const signal = getSignal(key)}
                        {#if signal}
                            <button
                                type="button"
                                class="w-full flex justify-between items-center p-3 rounded-xl border transition
                                       {selectedSignals.includes(key) 
                                         ? 'bg-white dark:bg-gray-800 border-blue-500 shadow-md' 
                                         : 'bg-white/50 dark:bg-gray-900/50 border-transparent'}"
                                on:click={() => toggleSignal(key)}
                            >
                                <span class="font-medium text-sm">{nameMap[key] || key}</span>
<span class="text-lg font-mono font-bold 
    {signal.intensity >= 8 ? 'text-blue-600' : 
     signal.intensity >= 6 ? 'text-blue-400' : 
     'text-gray-400'}">
    {signal.intensity}
</span>
                            </button>
                        {/if}
                    {/each}
                </div>
            </div>
        {/each}
    </div>

    <div class="pt-4 border-t border-gray-100 dark:border-gray-800">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Other Resonance Signals</h3>
        <div class="flex flex-wrap gap-2">
            {#each otherSignals as signal}
                <button
                    type="button"
                    class="px-3 py-1.5 rounded-lg border text-xs transition
                           {selectedSignals.includes(signal.name)
                             ? 'bg-blue-600 text-white border-blue-600'
                             : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600'}"
                    on:click={() => toggleSignal(signal.name)}
                >
                    {signal.name}: <span class="font-bold">{signal.intensity}</span>
                </button>
            {/each}
        </div>
    </div>
</div>