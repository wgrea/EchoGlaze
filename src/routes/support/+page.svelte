<!-- src/routes/support/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';

  $: currentCountryCode = $page.url.searchParams.get('country') || 'USA';

  // Strongly-typed interface matching EchoGlaze's structural design system
  interface LocalContext {
    name: string;
    icon: string;
    costMultiplier: number;
    localNuance: string;
  }

  // A hardcoded, fail-safe lookup table for your active production countries
  const localContexts: Record<string, LocalContext> = {
    USA: {
      name: 'United States',
      icon: '🇺🇸',
      costMultiplier: 1.0,
      localNuance: 'Highly digitized infrastructure. Electronic and mobile payments are globally mandatory; physical currency is rarely required outside small tips.'
    },
    EGY: {
      name: 'Egypt',
      icon: '🇪🇬',
      costMultiplier: 0.5,
      localNuance: 'Cash is absolute king. Physical cash is mandatory for markets, local stalls, and regional transit.'
    }
  };

  // Safe reactive data assignment with strict type alignment
  $: activeContext = localContexts[currentCountryCode.toUpperCase()] || null;

  const jobBoards = [
    { title: 'We Work Remotely', category: 'High-signal UX, product, & marketing roles', color: 'bg-orange-50 text-orange-700' },
    { title: 'Remote OK', category: 'Async-fit tech & operations teams', color: 'bg-red-50 text-red-700' },
    { title: 'FlexJobs', category: 'Vetted, high-trust professional listings', color: 'bg-blue-50 text-blue-700' }
  ] as const;

  const communities = [
    { name: 'Nomad List', desc: 'Useful for macro volatility, hub density, and cost signals — not for socializing.', link: 'https://nomadlist.com', icon: '🌐' },
    { name: 'Expat.com', desc: 'Great for long-stay logistics, residency frameworks, and real lived experiences.', link: 'https://expat.com', icon: '🏡' },
    { name: 'IATA Travel Centre', desc: 'The definitive passport, visa, and health documentation clearinghouse used by airlines.', link: 'https://iatatravelcentre.com', icon: '✈️' }
  ] as const;
</script>

<div class="max-w-4xl mx-auto py-12 px-6 space-y-12">
  <!-- Header -->
  <header class="text-left max-w-2xl border-b border-slate-100 pb-8">
    <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-3">Support & WFA Guide</h1>
    <p class="text-lg text-slate-600 leading-relaxed">
      A lightweight toolkit engineered to help you stabilize an asynchronous workflow, map out financial runway logistics, and cross-reference critical international entry parameters.
    </p>
  </header>

  <!-- Dynamic Country Context Layer -->
  {#if activeContext && currentCountryCode.toUpperCase() !== 'USA'}
    <section class="bg-slate-50 border border-slate-200 p-6 rounded-3xl">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-2xl">{activeContext.icon}</span>
        <h2 class="text-sm font-black uppercase tracking-widest text-slate-500">
          Local Infrastructure Context: {activeContext.name}
        </h2>
      </div>
      <p class="text-slate-700 leading-relaxed text-base">
        When targeting {activeContext.name}, EchoGlaze uses an estimated <span class="font-bold text-slate-900">cost multiplier of {activeContext.costMultiplier}x</span>. 
        Critical operational parameter: <span class="text-slate-800 font-medium">{activeContext.localNuance}</span>
      </p>
    </section>
  {/if}

  <!-- WFA Blueprint -->
  <section class="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm space-y-8">
    <h2 class="text-xs font-black uppercase tracking-widest text-slate-400">The WFA Blueprint</h2>
    
    <div class="space-y-8">
      <div class="flex gap-6 items-start">
        <div class="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 font-bold text-xl mt-1">1</div>
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-slate-900 mb-2">Skill Liquidity & Execution</h3>
          <p class="text-lg text-slate-700 leading-relaxed">
            Remote work is entirely accessible at any level, provided you shift the focus from traditional credentials to proof of execution. High-trust teams hire global contributors who demonstrate clear strategic logic, functional prototyping, and design-to-delivery execution. If your output handles complex requirements cleanly and your interfaces are intuitive, your skills are immediately portable.
          </p>
        </div>
      </div>
      
      <div class="flex gap-6 items-start">
        <div class="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 font-bold text-xl mt-1">2</div>
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-slate-900 mb-2">The Runway Strategy</h3>
          <p class="text-lg text-slate-700 leading-relaxed">
            You don't need a massive windfall to launch, just a predictable baseline. Balancing a local role, part-time shifts, or freelance work gives you the financial stability to build a clean production portfolio without survival anxiety. Treating your personal projects as a serious professional commitment is the most practical bridge to secure a trusted remote pipeline.
          </p>
        </div>
      </div>

      <div class="flex gap-6 items-start">
        <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xl mt-1">3</div>
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-slate-900 mb-2">Asynchronous Artifacts</h3>
          <p class="text-lg text-slate-700 leading-relaxed">
            When you lack years of physical office presence, your public documentation is your entire reputation. Prove you can thrive on an async-fit team by leaving clear architectural footprints: clean project management logs, scannable documentation, interactive execution breakdowns, and logical component layouts. Build public artifacts that prove you can deliver value when completely unsupervised.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Curated Pipelines & Resources -->
  <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Job Boards Column -->
    <div class="space-y-4">
      <h3 class="text-xl font-bold text-slate-900 px-2">Trusted Remote Pipelines</h3>
      <div class="space-y-3">
        {#each jobBoards as board}
          <div class="p-4 border border-slate-100 rounded-2xl bg-slate-50 flex justify-between items-center">
            <div>
              <h4 class="font-bold text-slate-800">{board.title}</h4>
              <p class="text-sm text-slate-500">{board.category}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Communities & Logistics Column -->
    <div class="space-y-4">
      <h3 class="text-xl font-bold text-slate-900 px-2">Logistical Anchors</h3>
      <div class="space-y-3">
        {#each communities as community}
          <a href={community.link} target="_blank" rel="noopener noreferrer" class="p-4 border border-slate-200 rounded-2xl bg-white hover:border-slate-300 block transition-colors group">
            <div class="flex items-start gap-3">
              <span class="text-xl mt-0.5">{community.icon}</span>
              <div>
                <h4 class="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{community.name}</h4>
                <p class="text-sm text-slate-600 leading-normal">{community.desc}</p>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>
</div>
