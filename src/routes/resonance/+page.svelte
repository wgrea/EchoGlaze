<!-- src/routes/resonance/+page.svelte -->
<script lang="ts">
    import { page } from '$app/stores';
    import TopSignals from '$lib/components/resonance/TopSignals.svelte';
    import SignalList from '$lib/components/resonance/SignalList.svelte';
    import ExploreBySignal from '$lib/components/resonance/ExploreBySignal.svelte';
    import LevelToggle from '$lib/components/resonance/LevelToggle.svelte';
    
    // Define types for city data
    interface City {
        id: string;
        name: string;
        countryName?: string;
        type?: string;
        topSignals?: any[];
        sortedSignals?: any[];
        places?: any[];
        [key: string]: any;
    }
    
    interface Country {
        id: string;
        name: string;
        topSignals?: any[];
        sortedSignals?: any[];
        places?: any[];
        [key: string]: any;
    }
    
    let level: 'country' | 'city' = 'country';
    let selectedCityId: string | null = null;
    
    function handleToggle() {
        level = level === 'country' ? 'city' : 'country';
        selectedCityId = null; // Reset city selection when switching levels
    }
    
    $: data = $page.data.data;
    $: countries = ($page.data.data?.allCountries as Country[]) || [];
    $: cities = ($page.data.data?.allCities as City[]) || [];
    
    $: selectedCity = selectedCityId 
        ? cities.find((c: City) => c.id === selectedCityId) 
        : cities[0];
    
    $: currentData = level === 'country' 
        ? data?.country 
        : (selectedCity || data?.city);
</script>

<div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-2">Resonance Signals</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
        Discover the unique characteristics and energy patterns of destinations
    </p>
    
    <LevelToggle {level} onToggle={handleToggle} />
    
    {#if level === 'city' && cities.length > 1}
        <div class="mb-6">
            <label for="city-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select City:
            </label>
            <select 
                id="city-select"
                bind:value={selectedCityId}
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                {#each cities as city (city.id)}
                    <option value={city.id}>
                        {city.name} - {city.countryName}
                    </option>
                {/each}
            </select>
        </div>
    {/if}
    
    <div class="mt-6">
        <TopSignals items={currentData?.topSignals || []} />
        <SignalList items={currentData?.sortedSignals || []} />
        <ExploreBySignal 
            signals={currentData?.sortedSignals || []} 
            places={currentData?.places || []}
        />
    </div>
</div>