<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';  // Changed from '$app.css' to '../app.css'
  import { onMount } from 'svelte';
  
  let currentYear = new Date().getFullYear();
</script>

<!-- Dreamy overlay for atmosphere -->
<div class="dreamy-overlay"></div>

<!-- Header with nostalgic navigation -->
<header class="relative z-20 bg-white/60 backdrop-blur-sm border-b border-amber-200/30">
  <div class="nostalgic-container">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <span class="text-2xl">✈️</span>
        <span class="font-bold text-xl bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
          EchoGlaze - Work Abroad  Planner
        </span>
      </a>
      
      <!-- Navigation -->
      <nav class="hidden md:flex gap-2">
        <a href="/" class="pill-nav">Explore</a>
        <a href="/compare" class="pill-nav">Compare</a>
        <a href="/saved" class="pill-nav">Saved Plans</a>
      </nav>
      
      <!-- Action buttons -->
      <div class="flex items-center gap-2">
        <button class="icon-button" title="Search">🔍</button>
        <button class="icon-button" title="Profile">👤</button>
      </div>
    </div>
  </div>
</header>

<!-- Main content -->
<main class="relative z-10">
  <slot />
</main>

<!-- Footer -->
<footer class="relative z-10 mt-24 border-t border-amber-200/30 bg-white/40 backdrop-blur-sm">
  <div class="nostalgic-container py-8">
    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        🌍 Designed for digital nomads who value authenticity over exact prices
      </p>
      <p class="text-xs text-gray-500">
        © {currentYear} Travel Planner — Use multipliers to compare, not exact numbers
      </p>
    </div>
  </div>
</footer>