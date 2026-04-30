<!-- src/routes/+page.svelte -->
<script lang="ts">
  // 1. IMPORT YOUR COMPONENTS
  import MenuGrid from '$lib/components/home/MenuGrid.svelte';

  // 2. DECLARE THE MAIN MENU ARRAY
  const menuItems = [
    {
      title: 'Destination Finder',
      description: 'Match places to your travel style',
      icon: '🌅',
      path: '/resonance',
      color: 'from-pink-50 via-orange-50 to-yellow-100',
      accent: 'text-pink-600 drop-shadow-lg'
    },
    {
      title: 'Logistics', 
      description: 'Visa needs and seasonal flight data',
      icon: '✈️',
      path: '/logistics',
      color: 'from-indigo-50 via-blue-50 to-cyan-50',
      accent: 'text-blue-600 drop-shadow-sm'
    },
    {
      title: 'Accommodation',
      description: 'Find hostels and coliving spaces',
      icon: '🏠',
      path: '/accommodation',
      color: 'from-amber-50 via-emerald-50 to-stone-100',
      accent: 'text-amber-600 drop-shadow-md'
    },
    {
      title: 'Packing Strategy',
      description: 'Regional style and tech loadouts',
      icon: '🎒',
      path: '/packing',
      color: 'from-blue-50 via-indigo-50 to-slate-100',
      accent: 'text-indigo-600 drop-shadow-sm'
    }
  ];

  // 3. DECLARE THE MERGED SUPPORT OBJECT
  const digitalNomadLink = {
    title: 'Support & WFA Guide',
    description: 'Career blueprints, mental health, and expat networks',
    icon: '🌐',
    path: '/support',
    color: 'from-indigo-50 via-blue-50 to-teal-50', 
    accent: 'text-slate-800'
  };
</script>

<div class="home-page-container relative max-w-[1440px] mx-auto min-h-screen">
  <!-- Beach Glacier Background remains the same -->
  <div class="absolute inset-0 -z-10"> 
    <div class="beach-glacier-bg absolute inset-0"></div>
  </div>
  
  <div class="relative z-10 py-8 space-y-12 max-w-6xl mx-auto px-4">

    <!-- 2. MAIN HUB: The Core 4 Tools -->
    <section>

      <MenuGrid {menuItems} />
    </section>

    <!-- 3. SECONDARY HUB: The "Long-Term" Infrastructure -->
    <section class="max-w-4xl mx-auto border-t border-slate-200/50 pt-12 pb-20">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Support & WFA Master Button (Visual upgrade) -->
        <a href={digitalNomadLink.path} 
           class="group relative p-6 bg-white/40 backdrop-blur-md border border-white/60 rounded-[2rem] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
        >
          <div class="flex items-center gap-5 relative z-10">
            <span class="text-3xl drop-shadow-md group-hover:scale-110 transition-transform">{digitalNomadLink.icon}</span>
            <div>
              <h3 class="font-black text-slate-800 leading-tight text-lg">{digitalNomadLink.title}</h3>
              <p class="text-xs text-slate-500 mt-1 font-medium italic opacity-80">Career & Resilience</p>
            </div>
          </div>
          <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-gradient-to-br {digitalNomadLink.color} blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
        </a>

        <!-- Documentation / Wiki Button -->
        <a href="/docs"
           class="group relative p-6 bg-white/20 backdrop-blur-sm border border-slate-200/50 rounded-[2rem] hover:bg-white/60 transition-all duration-300"
        >
          <div class="flex items-center gap-5">
            <span class="text-3xl grayscale group-hover:grayscale-0 transition-all">📚</span>
            <div>
              <h3 class="font-bold text-slate-700 text-lg">Knowledge Base</h3>
              <p class="text-xs text-slate-400 mt-1 uppercase tracking-widest font-black">Architecture Docs</p>
            </div>
          </div>
        </a>
      </div>
    </section>
  </div>
</div>

<style>
  /* Bring back the soft beach‑glacier glow */
  .beach-glacier-bg {
    background:
      radial-gradient(circle at 20% 80%, rgba(253, 242, 248, 0.6) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(165, 243, 252, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 40% 30%, rgba(147, 197, 253, 0.5) 0%, transparent 40%),
      radial-gradient(circle at 70% 60%, rgba(219, 234, 254, 0.7) 0%, transparent 50%),
      linear-gradient(135deg,
        #f8fafc 0%,
        #e2e8f0 30%,
        #f1f5f9 70%,
        #f8fafc 100%
      );
    filter: blur(20px) brightness(1.1);
    transform: scale(1.1);
  }

  .home-page-container {
    min-height: 100vh;
  }

  /* Re‑create the hero’s breathable text */
  .hero-copy {
    color: #2d2a24;
    font-size: 1.125rem;
    line-height: 1.7;
    text-align: center;
    max-width: 32rem;
    margin: 0 auto;
  }
</style>