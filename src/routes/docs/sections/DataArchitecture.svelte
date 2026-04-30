<article class="prose prose-sm max-w-none">

  <h2 class="text-2xl font-bold text-slate-900 mb-6">🏗️ Data Architecture</h2>

  <!-- Why this matters -->
  <div class="mb-8 bg-slate-50 border border-slate-200 p-5 rounded-xl text-sm text-slate-600">
    <strong>Why this matters:</strong>
    EchoGlaze’s modular country hierarchy allows a single data source to power
    multiple UI views without duplication. This section explains how the system
    evolved and why the structure supports long-term scalability.
  </div>

  <!-- Micro TOC -->
  <nav class="text-xs text-slate-400 mb-8 space-y-1">
    <p class="font-bold text-slate-500">On this section</p>
    <ul class="list-disc ml-4 space-y-1">
      <li><a href="#pivot" class="text-blue-600">The Pivot</a></li>
      <li><a href="#example" class="text-blue-600">Country Module Example</a></li>
      <li><a href="#insight" class="text-blue-600">Key Insight</a></li>
    </ul>
  </nav>

  <!-- Pivot -->
  <h3 id="pivot" class="text-sm font-black uppercase tracking-widest text-slate-400">
    The Pivot: Trip → Glaze
  </h3>
  <p>
    Originally, data was flat and duplicated. The <strong>EchoGlaze Migration</strong>
    refactored this into a Modular Country Hierarchy.
  </p>

  <!-- Example -->
  <h3 id="example" class="text-lg font-bold text-slate-800 mt-8">Country Module Example</h3>

  <div class="bg-slate-900 rounded-2xl p-6 my-6 shadow-xl">
    <pre class="text-blue-300 text-[11px]"><code>{`
// src/lib/data/countries/thailand.ts
export const thailand: CountryData = {
  meta: { region: 'SEA', subregion: 'Mainland' },
  resonance: {
    socialFriction: 0.8, // High density / Low barrier
    tags: ['tropical-digital', 'night-market-flow'],
  },
  logistics: { visa: 'DTV-Eligible', stayLimit: 180 }
};
    `}</code></pre>
  </div>

  <!-- Insight -->
  <h3 id="insight" class="font-bold text-slate-800">Key Insight</h3>
  <p>
    Data structure ≠ Page structure. One source file now powers the Destination
    Finder, Logistics, and Living Costs views simultaneously.
  </p>

  <p class="text-xs text-slate-500 mt-4">
    Related: See <a href="#intelligence" class="text-blue-600">Orchestration & Prompts</a>
    for how AI interacts with this structure.
  </p>

</article>
