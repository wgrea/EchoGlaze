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
        sortedSignals?: any[];
        topSignals?: any[];
        places?: any[];
    }

    interface Country {
        id: string;
        name: string;
        sortedSignals?: any[];
        topSignals?: any[];
        places?: any[];
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
<label for="city-select" class="block text-sm font-medium mb-2">
    Select City:
</label>

<select
    id="city-select"
    bind:value={selectedCityId}
    class="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800"
>
    {#each cities as city (city.id)}
        <option value={city.id}>
            {city.name} — {city.countryName}
        </option>
    {/each}
</select>

        </div>
    {/if}

    <h2 class="text-xl font-semibold mt-8 mb-4">
        {level === 'country' ? data.country.name : selectedCity?.name}
    </h2>

    {#if !currentData?.sortedSignals?.length}
        <p class="text-gray-500 mt-4">No signals available for this location.</p>
    {:else}
        <TopSignals items={currentData.topSignals} />
        <SignalList items={currentData.sortedSignals} />
        <ExploreBySignal
            signals={currentData.sortedSignals}
            places={currentData.places}
        />
    {/if}
</div>