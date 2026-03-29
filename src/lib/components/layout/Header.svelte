<!-- src/lib/components/layout/Header.svelte -->
<script lang="ts">
  export let title = "Echotrip";
  export let subtitle = "Your comprehensive guide to planning the perfect trip. Find destinations, compare costs, and organize everything in one place.";
</script>

<div class="text-center mb-12">
  <div class="inline-block mb-6 relative">
    <div class="absolute inset-0 bg-white/20 blur-2xl rounded-full"></div>
    <div class="relative text-7xl filter drop-shadow-lg">🌎</div>
  </div>
  
  <h1 class="text-5xl font-display font-light mb-4 bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent">
    {title}
  </h1>
  
  <p class="text-gray-700 text-lg font-light max-w-2xl mx-auto">
    {subtitle}
  </p>
</div>