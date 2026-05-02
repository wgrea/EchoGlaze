<!-- src/routes/accommodation/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAllStayOptions } from '$lib/loaders/stay';
  import { loadCountries } from '$lib/loaders/country';
  import { loadCities } from '$lib/loaders/city';
  import type { Country, City } from '$lib/types';
  import FilterBar from '$lib/components/accommodation/FilterBar.svelte';
  import StayOptionCard from '$lib/components/accommodation/StayOptionCard.svelte';
  import FoodStrategyCard from '$lib/components/accommodation/FoodStrategyCard.svelte';
  import GlobalLocationSelector from '$lib/components/layout/GlobalLocationSelector.svelte';
  import { selectedCountryId, selectedCityId } from '$lib/stores/location';

  // 1. Data State
  let stayOptions: any[] = [];
  let filteredOptions: any[] = [];
  let countries: Country[] = [];
  let cities: City[] = [];
  let mode: 'stay' | 'food' = 'stay';

  let filters = {
    type: 'all',
    wifiMin: 3.0,
    maxPriceTier: 'all',
    socialTone: 'all'
  };

  // Logic: If a city is selected (even from another page), 
  // auto-sync the country store so the filter doesn't break.
// ONLY sync country if we are NOT in the middle of a country change
  $: {
    if (cities.length > 0 && $selectedCityId !== 'all') {
      const cityObj = cities.find(c => c.id === $selectedCityId);
      
      // Safety: Only force the country to match the city if the city 
      // actually belongs to a country. If we just switched to Spain 
      // and Medellin is still there, this should NOT fire.
      if (cityObj && cityObj.countryId === $selectedCountryId) {
        // City and Country match, all good.
      } else if (cityObj && $selectedCountryId === 'all') {
        // Only auto-select country if no country is currently picked
        selectedCountryId.set(cityObj.countryId);
      }
    }
  }

  // 3. The Master Filter Trigger
  // This block watches the data array AND the stores. 
  // It will re-fire as soon as stayOptions is populated.
  $: {
    if (stayOptions.length > 0) {
      // Accessing these values makes the block reactive to them
      $selectedCountryId;
      $selectedCityId;
      filters;
      applyFilters();
    }
  }

  onMount(async () => {
    try {
      const [optionsData, citiesData, countriesData] = await Promise.all([
        loadAllStayOptions(),
        loadCities(),
        loadCountries()
      ]);
      
      stayOptions = optionsData;
      cities = citiesData;
      countries = countriesData;
      
      // Note: The $: block above will handle the filtering once stayOptions is set
    } catch (error) {
      console.error("Failed to fetch accommodation data:", error);
    }
  });

// 2. Reactive Helpers
  $: selectedCity = cities.find(c => c.id === $selectedCityId) || null;

// 1. Monitor Country changes to reset City
  // This is the "Reset Switch" that prevents the sticky-city bug.
  $: if ($selectedCountryId) {
    // If the country changes, we check if the current city still belongs to it.
    if ($selectedCityId !== 'all' && cities.length > 0) {
      const cityObj = cities.find(c => c.id === $selectedCityId);
      if (!cityObj || cityObj.countryId !== $selectedCountryId) {
        // Force reset to 'all' so the filter doesn't get stuck searching for
        // a city that isn't in the new country.
        selectedCityId.set('all');
      }
    }
  }

// Remove all previous $: blocks and replace with this:
// Replace your existing $: blocks with this single one:
$: {
  if (cities.length > 0 && stayOptions.length > 0) {
    const cityObj = cities.find(c => c.id === $selectedCityId);

    // Bottom-Up Sync:
    // If a city is somehow selected (like from a saved state or link),
    // make sure the country dropdown matches it.
    if ($selectedCityId !== 'all' && cityObj && $selectedCountryId !== cityObj.countryId) {
       selectedCountryId.set(cityObj.countryId);
    }

    // Always run the filter engine whenever these values change
    applyFilters();
  }
}

function applyFilters() {
  // Normalize selections
  const countrySel = ($selectedCountryId || "all").toLowerCase();
  const citySel = ($selectedCityId || "all").toLowerCase();

  filteredOptions = stayOptions.filter(opt => {
    const optCountryId = (opt.city?.countryId || opt.countryId || "").toLowerCase();
    const optCityId = (opt.cityId || "").toLowerCase();

    // 1. Country Match
    if (countrySel !== 'all' && optCountryId !== countrySel) return false;
    
    // 2. City Match
    if (citySel !== 'all' && optCityId !== citySel) return false;

    // 3. Attribute Filters
    if (filters.type !== 'all' && opt.type !== filters.type) return false;
    if ((opt.wifiScore ?? 0) < filters.wifiMin) return false;
    
    return true;
  });
}


</script>
