<!-- src/routes/+page.svelte -->
<script lang="ts">
  // Home components
  import MenuGrid from '$lib/components/home/MenuGrid.svelte';

  let loading = false;

const menuItems = [
  {
    title: 'Destination Finder',
    description: 'Match places to your travel style',
    icon: '🌅',  // sunset for beach vibe
    path: '/resonance',
    color: 'from-pink-50 via-orange-50 to-yellow-100',  // pink-orange-yellow sunset
    accent: 'text-pink-600 drop-shadow-lg'
  },
  {
    title: 'Logistics', 
    description: 'Visa needs and seasonal flight data',
    icon: '✈️',
    path: '/logistics',
    color: 'from-indigo-50 via-blue-50 to-cyan-50',  // Frutiger Aero glassy blue
    accent: 'text-blue-600 drop-shadow-sm'
  },
  {
    title: 'Accommodation',
    description: 'Find hostels and coliving spaces',
    icon: '🏠',
    path: '/accommodation',
    color: 'from-amber-50 via-emerald-50 to-stone-100',  // Cozy wood cabin warmth
    accent: 'text-amber-600 drop-shadow-md'
  },
  {
    title: 'Packing Strategy',
    description: 'Regional style and tech loadouts',
    icon: '🎒',
    path: '/packing',
    color: 'from-blue-50 via-indigo-50 to-slate-100', // Glacial/Tech blue
    accent: 'text-indigo-600 drop-shadow-sm'
  }
];

// Add these to your menuItems or as a secondary section on your home page
const digitalNomadLinks = [
  {
    title: 'Supports',
    description: 'Mental health & expat networks',
    icon: '👥',
    path: '/nomad/support',
    color: 'from-indigo-50 to-blue-50', // Cold glacier blue
    accent: 'text-indigo-600'
  },
  {
    title: 'WFA Guide',
    description: 'Remote career blueprints',
    icon: '💼',
    path: '/nomad/how-to-wfa',
    color: 'from-teal-50 to-cyan-50', // Tropical seafoam
    accent: 'text-teal-600'
  }
];
</script>

<div class="home-page-container relative max-w-[1440px] mx-auto">
  <div class="absolute inset-0 -z-10"> 
    <div class="beach-glacier-bg absolute inset-0">

    </div>
  </div>
  
  <!-- Your existing content -->
  <div class="relative z-10 py-12 space-y-16 max-w-6xl mx-auto px-4">
    <!-- Hero -->
<div class="text-center mb-20">
  <div class="flex justify-center mb-10">
    <div class="relative group w-full max-w-2xl px-4"> <div class="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-2xl opacity-15 group-hover:opacity-35 transition duration-1000"></div>
      
      <img 
        src="/echoglazelogo.png" 
        alt="EchoGlaze Logo (Letters)" 
        class="relative w-full h-auto object-contain mx-auto"
      />
    </div>
  </div>

  <p class="text-xl text-slate-600/90 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
    A decision‑first planner for digital nomads who care more about vibe and legality than exact prices.
  </p>
</div>

    <!-- Main menu grid -->
<div class="max-w-4xl mx-auto mb-16">
  <MenuGrid {menuItems} />
</div>

<div class="max-w-2xl mx-auto pb-20 px-4">
  <div class="flex items-center gap-4 mb-6">
    <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">Nomad Support</h2>
    <div class="h-px w-full bg-gradient-to-r from-slate-200 to-transparent"></div>
  </div>
  
  <div class="grid grid-cols-2 gap-4">
    {#each digitalNomadLinks as link}
      <a href={link.path} class="group relative p-5 bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div class="flex items-center gap-3">
          <span class="text-2xl drop-shadow-sm">{link.icon}</span>
          <div>
            <h3 class="font-bold text-sm text-slate-800 leading-none">{link.title}</h3>
            <p class="text-[10px] text-slate-500 mt-1 leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
              Access resources
            </p>
          </div>
        </div>
        <div class="absolute -right-4 -bottom-4 w-12 h-12 bg-gradient-to-br {link.color} blur-2xl opacity-50"></div>
      </a>
    {/each}
  </div>
</div>
  </div>
</div>

<style>
  .beach-glacier-bg {
    background: 
      /* Beach sunset base */
      radial-gradient(circle at 20% 80%, rgba(253, 242, 248, 0.6) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(165, 243, 252, 0.4) 0%, transparent 50%),
      
      /* Glacier ice blue */
      radial-gradient(circle at 40% 30%, rgba(147, 197, 253, 0.5) 0%, transparent 40%),
      radial-gradient(circle at 70% 60%, rgba(219, 234, 254, 0.7) 0%, transparent 50%),
      
      /* Ocean horizon */
      linear-gradient(135deg, 
        #f8fafc 0%, 
        #e2e8f0 30%, 
        #f1f5f9 70%, 
        #f8fafc 100%);
    
    filter: blur(20px) brightness(1.1);
    transform: scale(1.1);
  }
</style>