<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  let currentYear = new Date().getFullYear();

  // Optional: add a global theme context here later
</script>

<!-- Glassy overlay -->
<div class="dreamy-overlay pointer-events-none"></div>

<!-- Main layout shell -->
<main class="layout-main relative min-h-screen">
  <!-- Header -->
  <header class="relative z-20 bg-white/60 backdrop-blur-sm border-b border-amber-200/40">
    <div class="nostalgic-container">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 group">
          <span class="text-2xl">✈️</span>
          <span
            class="font-bold text-lg bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent"
          >
            EchoGlaze
          </span>
          <span class="text-sm text-gray-600 ml-0.5">– Work Abroad Planner</span>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex gap-4">
          <a
            href="/saved"
            class="pill-nav text-sm font-medium px-3 py-1.5 rounded-full
                   hover:bg-blue-50 hover:text-blue-700 transition"
          >
            Saved Plans
          </a>
        </nav>

        <!-- Action buttons -->
        <div class="flex items-center gap-2">
          <button
            class="icon-button text-gray-700 hover:text-blue-700 transition"
            title="Search"
          >
            🔍
          </button>
          <button
            class="icon-button text-gray-700 hover:text-blue-700 transition"
            title="Profile"
          >
            👤
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Content area (where +page.svelte plugs in) -->
  <main class="relative z-10">
    <slot />
  </main>

  <!-- Footer -->
  <footer
    class="relative z-10 mt-auto border-t border-amber-200/40 bg-white/40 backdrop-blur-sm"
  >
    <div class="nostalgic-container py-6">
      <div class="text-center">
        <p class="text-xs text-gray-500">
          © {currentYear} Travel Planner
        </p>
      </div>
    </div>
  </footer>
</main>

<style>
  :global(.layout-main) {
    background: radial-gradient(
        circle at top,
        rgba(14, 165, 233, 0.06),
        rgba(14, 165, 233, 0.02) 50%,
        transparent 100%
      ),
      radial-gradient(
        circle at bottom,
        rgba(255, 255, 255, 0.9),
        rgba(251, 251, 251, 0.9)
      );
  }

  /* Reusable nav pill */
  :global(.pill-nav) {
    color: #4b5563;
    background: transparent;
    border: none;
    outline: none;
  }

  :global(.icon-button) {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(4px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
  }
</style>