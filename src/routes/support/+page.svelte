<!-- src/routes/support/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  $: currentCountry = $page.url.searchParams.get('country') || 'USA';
  
  const jobBoards = [
    { title: 'We Work Remotely', category: 'Legit UX/Frontend roles', color: 'bg-orange-50 text-orange-700' },
    { title: 'Remote OK', category: 'Async-friendly tech teams', color: 'bg-red-50 text-red-700' },
    { title: 'JS Remotely', category: 'Svelte/React-heavy listings', color: 'bg-yellow-50 text-yellow-700' }
  ] as const;  // ← FIX: typed array

  const communities = [
    { name: 'Nomad List', desc: 'Useful for volatility, hubs, and cost signals — not for socializing.', link: 'https://nomadlist.com', icon: '🌐' },
    { name: 'Expat.com', desc: 'Great for long-stay logistics, residency questions, and real lived experiences.', link: 'https://expat.com', icon: '🏡' },
    { name: 'Meetup', desc: 'Best for grounding yourself with real, in-person tech or gaming groups.', link: 'https://meetup.com', icon: '🤝' }
  ] as const;  // ← FIX: typed array

const mentalHealth = [
    { 
      title: 'BetterHelp', 
      desc: 'Flexible online therapy that adapts to your timezone shifts.', 
      icon: '🧠' 
    },
    { 
      title: 'Nomad Soulmates', 
      desc: "A space for deeper connections if you're traveling long-term.", 
      icon: '❤️' 
    }
  ] as const;
</script>

<div class="max-w-4xl mx-auto py-12 px-6 space-y-12">
  <!-- Header -->
  <header class="text-center mb-12">
    <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-4">Support & WFA Guide</h1>
    <p class="text-xl text-slate-600 max-w-2xl mx-auto">
      {currentCountry.toUpperCase()} Edition
    </p>
  </header>

  <!-- WFA Blueprint -->
  <section class="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
    <h2 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">The WFA Blueprint</h2>
    <div class="space-y-8">
      <div class="flex gap-6 items-start">
        <div class="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 font-bold text-xl mt-1">1</div>
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-slate-900 mb-3">Skill Liquidity</h3>
          <p class="text-lg text-slate-700 leading-relaxed">
            Remote work isn't about "digital nomad jobs." It's portable skills: UX Engineering, SvelteKit prototyping, async collaboration.
          </p>
        </div>
      </div>
      
      <div class="flex gap-6 items-start">
        <div class="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 font-bold text-xl mt-1">2</div>
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-slate-900 mb-3">Sweet Spot Buffer</h3>
          <p class="text-lg text-slate-700 leading-relaxed">
            $7k–$10k runway. Keep part-time job while building portfolio.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Mental Health -->
  <section class="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 text-white p-12 rounded-[3rem] shadow-2xl overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
    <div class="relative z-10 max-w-4xl mx-auto">
      <h2 class="text-3xl font-black mb-8 flex items-center gap-3">
        <span>🛡️</span> Mental Resilience
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each mentalHealth as resource}
          <div class="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
            <h4 class="text-xl font-bold mb-3">{resource.title}</h4>
            <p class="text-lg opacity-95 leading-relaxed">{resource.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
</div>