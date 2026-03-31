<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';

  let currentYear = new Date().getFullYear();

  $: themeColor = $page.url.pathname === '/' ? 'beach-glacier' :
                  $page.url.pathname.includes('resonance') ? 'pink-purple' :
                  $page.url.pathname.includes('logistics') ? 'purple-pink' :
                  $page.url.pathname.includes('accommodation') ? 'amber-orange' :
                  'default';
</script>

<svelte:window />  <!-- FIXED: no binding needed -->

<!-- SINGLE theme overlay -->
<div
  class="page-theme-overlay fixed inset-0 z-0 transition-all duration-1000"
  class:resonance-theme={themeColor === 'pink-purple'}
  class:logistics-theme={themeColor === 'purple-pink'}
  class:accommodation-theme={themeColor === 'amber-orange'}
></div>


<!-- SINGLE layout shell -->
<main class="layout-main relative min-h-screen z-10">
  <!-- Header -->
  <header class="relative z-30 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-2xl shadow-black/10">
    <div class="nostalgic-container">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
<a href="/" class="flex items-center gap-2 group">
  <span class="text-2xl">✈️</span>
  <span class="font-bold text-lg bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
    EchoGlaze
  </span>
  <span class="text-sm text-slate-500 ml-0.5">– Work Abroad Planner</span>
</a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex gap-4">
          <a
            href="/saved"
            class="pill-nav text-sm font-medium px-3 py-1.5 rounded-full
            hover:bg-white/30 hover:text-white transition backdrop-blur-sm">
            Saved Plans
          </a>
        </nav>

        <!-- Action buttons -->
        <div class="flex items-center gap-2">
          <button class="icon-button text-white/80 hover:text-white transition" title="Search">🔍</button>
          <button class="icon-button text-white/80 hover:text-white transition" title="Profile">👤</button>
        </div>
      </div>
    </div>
  </header>

  <!-- Content area -->
  <div class="relative z-20 pt-8 pb-20">
    <slot />
  </div>

  <!-- Footer -->
  <footer class="relative z-20 mt-auto border-t border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/10">
    <div class="nostalgic-container py-6">
      <div class="text-center">
        <p class="text-xs text-white/80">© {currentYear} Travel Planner</p>
      </div>
    </div>
  </footer>
</main>

<style>
  :global(body, html) {
    margin: 0;
    padding: 0;
    background: transparent;
    overflow-x: hidden;
  }

  :global(.resonance-theme) {
    background: linear-gradient(135deg, #fdf2f8 0%, #f8e8ff 30%, #e0f2fe 70%, #f0f9ff 100%);
  }
  :global(.logistics-theme) {
    background: linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 50%, #e0f2fe 100%);
  }
  :global(.accommodation-theme) {
    background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fee2e2 100%);
  }

  :global(.layout-main) {
    background: transparent;
    min-height: 100vh;
    position: relative;
  }

  :global(.icon-button) {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    border: 1px solid rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  :global(.pill-nav) {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
  }
</style>
