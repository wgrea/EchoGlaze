<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { loadCountries } from '$lib/loaders/countryLoader';
  import type { Country } from '$lib/schema/types';

  // Home components
  import MenuGrid from '$lib/components/home/MenuGrid.svelte';
  import DigitalNomadLinks from '$lib/components/home/DigitalNomadLinks.svelte';
  import PriceNote from '$lib/components/home/PriceNote.svelte';

  let countries: Country[] = [];
  let loading = false;

  onMount(async () => {
    try {
      const allCountries = await loadCountries();
      countries = allCountries.slice(0, 6);
    } catch (error) {
      console.error('Failed to load countries:', error);
    } finally {
      loading = false;
    }
  });

  const menuItems = [
    {
      title: 'Destination Finder',
      description: 'Match places to your travel style',
      icon: '🔍',
      path: '/resonance',
      color: 'from-blue-50 to-indigo-50',
      accent: 'text-blue-600'
    },
    {
      title: 'Logistics',
      description: 'Visa needs and flight intelligence',
      icon: '✈️',
      path: '/logistics',
      color: 'from-purple-50 to-pink-50',
      accent: 'text-purple-600'
    },
    {
      title: 'Travel Essentials',
      description: 'Packing lists and travel must‑haves',
      icon: '🎒',
      path: '/travel-essentials',
      color: 'from-green-50 to-emerald-50',
      accent: 'text-green-600'
    },
    {
      title: 'Accommodation',
      description: 'Find hostels and coliving spaces',
      icon: '🏠',
      path: '/accommodation',
      color: 'from-amber-50 to-orange-50',
      accent: 'text-amber-600'
    },
    {
      title: 'Transportation',
      description: 'Compare local and intercity travel costs',
      icon: '🚗',
      path: '/transportation',
      color: 'from-rose-50 to-red-50',
      accent: 'text-rose-600'
    }
  ];

  const digitalNomadLinks = [
    {
      title: 'Supports & Communities',
      description: 'Expat networks and mental health resources',
      icon: '👥',
      path: '/digital-nomad/support',
      color: 'from-indigo-50 to-blue-50',
      accent: 'text-indigo-600'
    },
    {
      title: 'Work From Anywhere',
      description: 'Remote jobs and location‑independent careers',
      icon: '💼',
      path: '/digital-nomad/how-to-work-from-anywhere',
      color: 'from-teal-50 to-cyan-50',
      accent: 'text-teal-600'
    }
  ];
</script>

<div class="home-page-container py-8">
  <!-- Hero -->
  <div class="text-center mb-12">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
      EchoGlaze
    </h1>
    <p class="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
      A decision‑first planner for digital nomads who care more about vibe and legality
      than exact prices.
    </p>
  </div>

  <!-- Main menu grid -->
  <MenuGrid {menuItems} />

  <!-- Digital Nomad quick‑links -->
  <DigitalNomadLinks links={digitalNomadLinks} />

  <!-- Price philosophy note -->
  <PriceNote />
</div>

<style>
  .home-page-container {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
</style>