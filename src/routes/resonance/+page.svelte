<script lang="ts">
    import { page } from '$app/stores';
    import { signalsToArray } from '$lib/transformers/resonanceTransformer';
    import ExploreBySignal from '$lib/components/resonance/ExploreBySignal.svelte';
    import LevelToggle from '$lib/components/resonance/LevelToggle.svelte';

    // Reactive data from the loader
    $: countries = ($page.data.data.allCountries as any[]) || [];
    $: allCities = ($page.data.data.allCities as any[]) || [];

    let level: 'country' | 'city' = 'country';
    let selectedCountryId = '';
    let selectedCityId = '';

    // Initialize selection
    $: if (countries.length > 0 && !selectedCountryId) {
        selectedCountryId = countries[0].id;
    }

    // This ensures that when the country changes, we select the first city available
    $: if (selectedCountryId) {
        const citiesForCountry = allCities.filter(c => c.countryId === selectedCountryId);
        if (citiesForCountry.length > 0) {
            // Only reset if the current city isn't part of the new country
            if (!citiesForCountry.find(c => c.id === selectedCityId)) {
                selectedCityId = citiesForCountry[0].id;
            }
        }
    }

    // Toggle logic
    function handleToggle() {
        level = level === 'country' ? 'city' : 'country';
    }

    // Reactive filtering
    $: filteredCities = allCities.filter(c => c.countryId === selectedCountryId);

    // Get the RAW active item based on user selection
    $: rawActiveItem = level === 'country' 
        ? countries.find(c => c.id === selectedCountryId)
        : (allCities.find(c => c.id === selectedCityId) || filteredCities[0]);

    // TRANSFORM for UI
$: displayData = rawActiveItem ? {
    name: rawActiveItem.name,
    rawSignals: rawActiveItem.resonanceSignals,
    places: level === 'country' 
        ? (rawActiveItem.cities?.map((c: any) => ({ 
            name: c.name, 
            signalMatch: 85,
            description: `Explore ${c.name}`,
            slug: c.id.toLowerCase()
        })) || [])
        : (rawActiveItem.stayOptions?.map((s: any) => ({
            name: s.name,
            signalMatch: 90,
            description: `${s.type.charAt(0).toUpperCase() + s.type.slice(1)} — ${s.socialTone} vibe`,
            slug: s.id
        })) || [])
} : null;

</script>

<div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-2">Resonance Signals</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
        Discover the unique characteristics and energy patterns of destinations
    </p>

    <LevelToggle {level} onToggle={handleToggle} />

    <div class="flex flex-wrap gap-4 mt-6 mb-6">
        <div>
            <label for="country-select" class="block text-sm font-medium mb-2">Select Country:</label>
            <select
                id="country-select"
                bind:value={selectedCountryId}
                class="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800"
            >
                {#each countries as country}
                    <option value={country.id}>{country.name}</option>
                {/each}
            </select>
        </div>

        {#if level === 'city'}
            <div>
                <label for="city-select" class="block text-sm font-medium mb-2">Select City:</label>
                <select
                    id="city-select"
                    bind:value={selectedCityId}
                    class="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800"
                >
                    {#if filteredCities.length === 0}
                        <option disabled>No cities found</option>
                    {:else}
                        {#each filteredCities as city}
                            <option value={city.id}>{city.name}</option>
                        {/each}
                    {/if}
                </select>
            </div>
        {/if}
    </div>

    <hr class="border-gray-200 dark:border-gray-700 my-8" />

    {#if !displayData || !displayData.rawSignals || Object.keys(displayData.rawSignals).length === 0}
        <div class="py-12 text-center">
            <h2 class="text-2xl font-semibold mb-2">{displayData?.name || 'Loading...'}</h2>
            <p class="text-gray-500">No signals available for this location yet.</p>
        </div>
    {:else}

<ExploreBySignal
    rawSignals={displayData.rawSignals}
    places={displayData.places}
/>

    {/if}
</div>