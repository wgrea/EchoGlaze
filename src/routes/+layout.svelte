<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';

  import { slide, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let isMenuOpen = false;
  const toggleMenu = () => isMenuOpen = !isMenuOpen;
  const closeMenu = () => isMenuOpen = false;

  let currentYear = new Date().getFullYear();

    import { goto } from '$app/navigation';
  $: currentCountry = $page.url.searchParams.get('country') || 'USA';

  $: themeColor = $page.url.pathname === '/' ? 'beach-glacier' :
                  $page.url.pathname.includes('resonance') ? 'pink-purple' :
                  $page.url.pathname.includes('logistics') ? 'purple-pink' :
                  $page.url.pathname.includes('accommodation') ? 'amber-orange' :
                  'default';
const navLinks = [
  { name: 'Logistics', path: '/logistics', icon: '✈️', color: 'bg-blue-100 text-blue-800' },
  { name: 'Accommodation', path: '/accommodation', icon: '🏠', color: 'bg-amber-100 text-amber-800' },
  { name: 'Resonance', path: '/resonance', icon: '🌅', color: 'bg-pink-100 text-rose-800', primary: true },
  { name: 'Packing', path: '/packing', icon: '🎒', color: 'bg-emerald-100 text-emerald-800', secondary: true },
  { name: 'Support', path: '/support', icon: '🌐', color: 'bg-violet-100 text-violet-800', secondary: true }
];
</script>

<svelte:window />  <!-- FIXED: no binding needed -->

<!-- SINGLE theme overlay -->
<div
  class="page-theme-overlay fixed inset-0 z-0 transition-all duration-1000"
  class:resonance-theme={themeColor === 'pink-purple'}
  class:logistics-theme={themeColor === 'purple-pink'}
  class:accommodation-theme={themeColor === 'amber-orange'}
></div>


<!-- inside your layout shell ... -->
<main class="layout-main relative min-h-screen z-10">
<!-- STICKY HEADER -->
<header class="sticky top-0 z-50 py-4 pointer-events-none">
  <div class="nostalgic-container mx-auto px-4 flex flex-col items-center">
    
    <!-- THE UNIFIED EASY NAV PILL -->
    <div class="pointer-events-auto flex flex-col bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-white/50 shadow-2xl transition-all duration-500 overflow-hidden w-full max-w-fit">
      
      <!-- Top Row: Logo & Interaction Area -->
      <div class="flex items-center gap-3 p-2">
        <!-- Integrated Logo (Home Button) -->
        <a href="/" on:click={closeMenu} class="flex items-center pl-2 pr-1 group transition-transform active:scale-95">
          <img src="/echoglazelogo.png" alt="EchoGlaze" class="h-7 w-auto object-contain" />
        </a>

        <!-- Vertical Divider (Desktop only) -->
        <div class="w-px h-6 bg-slate-200/60 hidden md:block"></div>

        <!-- DESKTOP LINKS (Visible always on MD+) -->
        <nav class="hidden md:flex items-center gap-1">
          {#each navLinks as link}
            <a href={`${link.path}?country=${currentCountry}`} 
               class="px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all hover:bg-white/80 {link.color.split(' ')[1]}">
              {link.name}
            </a>
          {/each}
        </nav>

        <!-- MOBILE TRIGGER (Visible only on SM) -->
        <button 
          on:click={toggleMenu}
          class="md:hidden flex items-center gap-2 pl-2 pr-4 py-2 hover:bg-slate-50/50 rounded-full transition-colors group"
        >
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            {isMenuOpen ? 'Close' : 'Navigation'}
          </span>
          <div class="flex flex-col gap-1 w-4 transition-transform duration-300 {isMenuOpen ? 'rotate-180' : ''}">
            <span class="h-0.5 w-full bg-slate-400 rounded-full"></span>
            <span class="h-0.5 w-full bg-slate-400 rounded-full opacity-50"></span>
          </div>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Mobile menu panel (OUTSIDE the header, inside the <main>) -->
{#if isMenuOpen}
  <div
    transition:slide|local
    class="fixed top-20 left-4 right-4 z-50 bg-white/95 backdrop-blur-md md:hidden rounded-t-3xl p-4 shadow-2xl"
  >
    <nav class="flex flex-col gap-2">
      {#each navLinks as link}
        <a
          href={`${link.path}?country=${currentCountry}`}
          on:click={closeMenu}
          class="px-4 py-3 text-sm font-black uppercase tracking-widest text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
        >
          {link.icon} {link.name}
        </a>
      {/each}
    </nav>
  </div>
{/if}

  <!-- Content area -->
  <div class="relative z-20 pt-4 pb-24">
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
