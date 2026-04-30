<script lang="ts">
  import * as Sections from './sections/index.js';
  import { onMount } from 'svelte';

  const docGroups = [
    {
      group: "Foundation",
      items: [
        { id: 'overview', label: 'Overview', component: Sections.Overview },
        { id: 'architecture', label: 'Data Architecture', component: Sections.DataArchitecture },
      ]
    },
    {
      group: "The AI Lab",
      items: [
        { id: 'intelligence', label: 'Orchestration & Prompts', component: Sections.AILab },
        { id: 'dx', label: 'Developer Experience', component: Sections.DeveloperExperience }
      ]
    },
    {
      group: "Product Design",
      items: [
        { id: 'design', label: 'Sand & Glam System', component: Sections.DesignSystem },
        { id: 'history', label: 'Evolution Log', component: Sections.IterationLog }
      ]
    },
    {
      group: "Reference",
      items: [
        { id: 'system-diagram', label: 'System Diagram', component: Sections.SystemDiagram },
        { id: 'glossary', label: 'Glossary', component: Sections.Glossary }
      ]
    }
  ];

  let activeId = 'overview';

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activeId = entry.target.id;
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  });
</script>

<div class="min-h-screen bg-[#fcfcfd] flex">

  <!-- Desktop Sidebar -->
  <aside class="fixed left-0 top-0 h-screen w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200 overflow-y-auto p-6 hidden md:block z-50">
    <div class="mb-10 px-3">
      <a href="/" class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors">
        ← Back to EchoGlaze
      </a>
    </div>

    <nav class="space-y-8">
      {#each docGroups as category}
        <div>
          <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-3">
            {category.group}
          </h3>
          <div class="space-y-1">
            {#each category.items as item}
              <a 
                href={`#${item.id}`} 
                class="block py-2 px-3 text-sm rounded-xl transition-all duration-300 
                {activeId === item.id 
                  ? 'bg-blue-50 text-blue-600 font-medium shadow-sm ring-1 ring-blue-100 translate-x-1' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}"
              >
                {item.label}
              </a>
            {/each}
          </div>
        </div>
      {/each}
    </nav>
  </aside>

  <!-- Right-side floating TOC -->
  <aside class="hidden lg:block fixed right-10 top-40 w-48 text-xs text-slate-400 space-y-2">
    <p class="font-bold text-slate-500">On this page</p>
    {#each docGroups as category}
      <p class="uppercase tracking-widest text-[10px] mt-4">{category.group}</p>
      {#each category.items as item}
        <a href={`#${item.id}`} class="block hover:text-blue-600">
          {item.label}
        </a>
      {/each}
    {/each}
  </aside>

  <!-- Content -->
  <main class="flex-1 md:ml-64 p-8 lg:p-20 bg-gradient-to-br from-white via-[#fcfcfd] to-slate-50/30">
    <div class="max-w-3xl mx-auto">

      <!-- Header -->
      <header class="mb-24 border-b border-slate-100 pb-12">
        <div class="flex items-center gap-3 mb-6">
           <span class="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100">
             Internal Docs
           </span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-4">Technical Manifesto</h1>
        <p class="text-lg text-slate-500 leading-relaxed">
          The architecture, decision rationale, and evolution of EchoGlaze.
        </p>
        <p class="text-xs text-slate-400 mt-3">v1.0 • Updated April 2026</p>

        <!-- Purpose / Audience / Scope -->
        <div class="mt-10 bg-slate-50 border border-slate-200 p-6 rounded-xl text-sm text-slate-600 space-y-3">
          <p><strong>Purpose:</strong> Capture the architectural intent, design philosophy, and AI‑assisted workflows behind EchoGlaze.</p>
          <p><strong>Audience:</strong> Future contributors, AI collaborators, and reviewers evaluating system reasoning.</p>
          <p><strong>Scope:</strong> Covers data architecture, design system, prompting protocols, developer experience, and product evolution.</p>
        </div>
      </header>

      <!-- Sections -->
      <div class="space-y-32">
        {#each docGroups as category}
          {#each category.items as item}
            <section id={item.id} class="scroll-mt-24 group">

              <!-- Section Header -->
              <h2 class="text-xl font-black text-slate-900 mb-6">{item.label}</h2>

              <!-- Section Path Indicator -->
              <div class="flex items-center gap-4 mb-8">
                <span class="text-xs font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  /{item.id}
                </span>
                <div class="h-px flex-1 bg-slate-100"></div>
              </div>

              <!-- Section Component -->
              <svelte:component this={item.component} />
            </section>
          {/each}
        {/each}
      </div>

      <!-- Footer -->
      <footer class="mt-40 pt-12 border-t border-slate-100">
        <p class="text-xs text-slate-400 font-medium text-center">
          Building with Utility UX • © 2026
        </p>
      </footer>
    </div>
  </main>
</div>
