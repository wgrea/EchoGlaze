<!-- src/routes/resonance/+page.svelte -->
<script lang="ts">
    import { page } from '$app/stores';
    import TopSignals from '$lib/components/resonance/TopSignals.svelte';
    import SignalList from '$lib/components/resonance/SignalList.svelte';
    import ExploreBySignal from '$lib/components/resonance/ExploreBySignal.svelte';
    import LevelToggle from '$lib/components/resonance/LevelToggle.svelte';
    
    let level: 'country' | 'city' = 'country';
    
    // Function to handle toggle
    function handleToggle() {
        level = level === 'country' ? 'city' : 'country';
    }
    
    $: data = $page.data.data;
    $: currentData = level === 'country' ? data?.country : data?.city;
</script>

<div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-2">Resonance Signals</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
        Discover the unique characteristics and energy patterns of destinations
    </p>
    
    <LevelToggle level={level} onToggle={handleToggle} />
    
    <div class="mt-6">
        <TopSignals items={currentData?.topSignals || []} />
        <SignalList items={currentData?.sortedSignals || []} />
        <ExploreBySignal 
            signals={currentData?.sortedSignals || []} 
            places={currentData?.places || []}
        />
    </div>
</div>