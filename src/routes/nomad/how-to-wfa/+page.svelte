<!-- src/routes/nomad/how-to-wfa -->
<script lang="ts">
  const jobBoards = [
    { title: 'We Work Remotely', category: 'Legit UX/Frontend roles', color: 'bg-orange-50 text-orange-700' },
    { title: 'Remote OK', category: 'Async-friendly tech teams', color: 'bg-red-50 text-red-700' },
    { title: 'JS Remotely', category: 'Svelte/React-heavy listings', color: 'bg-yellow-50 text-yellow-700' }
  ];
</script>

<div class="max-w-4xl mx-auto py-12 px-6 space-y-10">
  <header>
    <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Work From Anywhere</h1>
    <p class="text-slate-500 mt-2">A realistic path into remote, async-first work.</p>
  </header>

  <section class="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
    <h2 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">The WFA Blueprint</h2>
    <div class="space-y-6">

      <!-- 1. Skill Liquidity -->
      <div class="flex gap-4">
        <div class="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 font-bold text-sm">1</div>
        <div>
          <h4 class="font-bold text-slate-800">Skill Liquidity</h4>
          <p class="text-sm text-slate-500">
            Remote work isn’t about chasing “digital nomad jobs.” It’s about building portable, high‑order skills:
            UX Engineering, SvelteKit prototyping, systems thinking, async collaboration.  
            These roles naturally support remote, contract-friendly work.
          </p>
        </div>
      </div>

      <!-- 2. Sweet Spot Buffer -->
      <div class="flex gap-4">
        <div class="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 font-bold text-sm">2</div>
        <div>
          <h4 class="font-bold text-slate-800">The “Sweet Spot” Buffer</h4>
          <p class="text-sm text-slate-500">
            A realistic runway is **$7,000–$10,000**. Enough to cover a 2–3 month landing period while you onboard into remote work.
            <span class="block mt-2 italic text-xs text-indigo-600">
              What actually works: keeping a stable part‑time job while building your portfolio and identity-aligned projects. 
              It removes pressure and lets you pace your transition.
            </span>
          </p>
        </div>
      </div>

    </div>
  </section>

  <!-- Job Boards -->
  <section>
    <h3 class="text-sm font-bold text-slate-900 mb-4">Targeted Job Boards</h3>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {#each jobBoards as board}
        <div class="p-4 {board.color} rounded-2xl font-bold text-sm text-center border border-current/10">
          {board.title}
          <span class="block font-normal text-[10px] opacity-70 mt-1">{board.category}</span>
        </div>
      {/each}
    </div>
    <p class="text-[11px] text-slate-400 mt-3 italic">
      Tip: Most traction comes from contributor loops, warm signals, and async-fit teams — not mass‑applying.
    </p>
  </section>
</div>
