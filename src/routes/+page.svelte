<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAllCountries } from '$lib/loaders/countryLoader';
  import type { Country } from '$lib/schema/types';
  
  // Import home components
  import MenuGrid from '$lib/components/home/MenuGrid.svelte';
  import FeaturedDestinations from '$lib/components/home/FeaturedDestinations.svelte';
  import DigitalNomadLinks from '$lib/components/home/DigitalNomadLinks.svelte';
  import FeaturesSection from '$lib/components/home/FeaturesSection.svelte';
  import QuickTips from '$lib/components/home/QuickTips.svelte';
  import PriceNote from '$lib/components/home/PriceNote.svelte';
  
  let countries: Country[] = [];
  let loading = true;
  
  onMount(async () => {
    try {
      const allCountries = await loadAllCountries();
      countries = allCountries.slice(0, 6);
    } catch (error) {
      console.error('Failed to load countries:', error);
    } finally {
      loading = false;
    }
  });

  const menuItems = [
    { title: "Destination Finder", description: "Find places that match your travel style", icon: "🔍", path: "/country", color: "from-blue-50 to-indigo-50", accent: "text-blue-600" },
    { title: "Visa Requirements", description: "Check visa needs and application process", icon: "📝", path: "/visa", color: "from-purple-50 to-pink-50", accent: "text-purple-600" },
    { title: "Travel Essentials", description: "Packing lists and travel must-haves", icon: "🎒", path: "/travel-essentials", color: "from-green-50 to-emerald-50", accent: "text-green-600" },
    { title: "Flight Costs & Timing", description: "Find best seasons and flight prices", icon: "✈️", path: "/flight-costs", color: "from-cyan-50 to-sky-50", accent: "text-cyan-600" },
    { title: "Accommodation", description: "Find hostels and coliving spaces", icon: "🏠", path: "/accommodation", color: "from-amber-50 to-orange-50", accent: "text-amber-600" },
    { title: "Transportation", description: "Compare local and intercity travel costs", icon: "🚗", path: "/transportation", color: "from-rose-50 to-red-50", accent: "text-rose-600" }
  ];

  const digitalNomadLinks = [
    { title: "Supports & Communities", description: "Expat networks and mental health resources", icon: "👥", path: "/digital-nomad/support", color: "from-indigo-50 to-blue-50", accent: "text-indigo-600" },
    { title: "Work From Anywhere", description: "Remote jobs and location-independent careers", icon: "💼", path: "/digital-nomad/how-to-work-from-anywhere", color: "from-teal-50 to-cyan-50", accent: "text-teal-600" }
  ];
</script>

<div class="nostalgic-container py-8">
  <!-- Header -->
  <div class="home-header">
    <div class="text-6xl mb-4">🌎</div>
    <h1 class="home-title">Echotrip</h1>
    <p class="home-subtitle">
      Your comprehensive guide to planning the perfect trip. Find destinations, compare costs, and organize everything in one place.
    </p>
  </div>

  <!-- Main Menu Grid -->
  <MenuGrid {menuItems} />
  
  <!-- Featured Destinations -->
  {#if !loading && countries.length > 0}
    <FeaturedDestinations {countries} />
  {/if}
  
  <!-- Digital Nomad Resources -->
  <DigitalNomadLinks links={digitalNomadLinks} />
  
  <!-- Features Section -->
  <FeaturesSection />
  
  <!-- Quick Tips -->
  <QuickTips />
  
  <!-- Price Note -->
  <PriceNote />
</div>

<style>
  /* Homepage specific styles that aren't in components */
  .home-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }
  
  .home-title {
    font-size: 3.5rem;
    font-weight: 600;
    background: linear-gradient(135deg, #b45309 0%, #f59e0b 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  
  .home-subtitle {
    color: #6b5a4a;
    font-size: 1.125rem;
    max-width: 32rem;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .nostalgic-container {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 2;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .home-title {
      font-size: 2.5rem;
    }
  }
</style>