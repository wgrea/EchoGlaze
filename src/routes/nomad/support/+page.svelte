<!-- src/routes/nomad/support/+page.svelte -->
<script lang="ts">
  const communities = [
    { name: 'Nomad List', desc: 'Useful for volatility, hubs, and cost signals — not for socializing.', link: 'https://nomadlist.com', icon: '🌐' },
    { name: 'Expat.com', desc: 'Great for long-stay logistics, residency questions, and real lived experiences.', link: 'https://expat.com', icon: '🏡' },
    { name: 'Meetup', desc: 'Best for grounding yourself with real, in-person tech or gaming groups.', link: 'https://meetup.com', icon: '🤝' }
  ];

  const mentalHealth = [
    { title: 'BetterHelp', desc: 'Flexible online therapy that adapts to your timezone shifts.', icon: '🧠' },
    { title: 'Nomad Soulmates', desc: 'A space for deeper connections if you’re traveling long-term.', icon: '❤️' }
  ];
</script>

<div class="max-w-4xl mx-auto py-12 px-6 space-y-12">
  <header>
    <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Supports & Communities</h1>
    <p class="text-slate-500 mt-2 italic">Isolation is the only real nomad tax — build your support net early.</p>
  </header>

  <!-- Communities -->
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {#each communities as item}
      <a href={item.link} target="_blank" class="group p-6 bg-white border border-slate-200 rounded-[2rem] hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
        <span class="text-3xl mb-4 block">{item.icon}</span>
        <h3 class="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
        <p class="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
      </a>
    {/each}
  </section>

  <!-- Mental Resilience -->
  <section class="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
    <div class="relative z-10">
      <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
        <span>🛡️</span> Mental Resilience
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each mentalHealth as resource}
          <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <h4 class="font-bold text-sm">{resource.title}</h4>
            <p class="text-xs opacity-80 mt-1">{resource.desc}</p>
          </div>
        {/each}
      </div>
    </div>
    <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
  </section>
</div>
