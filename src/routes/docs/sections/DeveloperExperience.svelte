<article class="prose prose-sm max-w-none">

  <h2 class="text-2xl font-bold text-slate-900 mb-6">⚡ Developer Experience (DX)</h2>

  <!-- Why this matters -->
  <div class="mb-8 bg-amber-50 border border-amber-100 p-5 rounded-xl text-sm text-amber-900">
    <strong>Why this matters:</strong>
    EchoGlaze’s development workflow is intentionally optimized for rapid
    prototyping, small component surfaces, and predictable styling. This section
    documents the DX principles that keep the project maintainable.
  </div>

  <!-- Micro TOC -->
  <nav class="text-xs text-slate-400 mb-8 space-y-1">
    <p class="font-bold text-slate-500">On this section</p>
    <ul class="list-disc ml-4 space-y-1">
      <li><a href="#foundation" class="text-blue-600">The Foundation</a></li>
      <li><a href="#friction" class="text-blue-600">Dependency Friction</a></li>
    </ul>
  </nav>

  <!-- Foundation -->
  <h3 id="foundation" class="text-lg font-bold text-slate-800">The Foundation</h3>
  <p class="text-slate-600">
    Setting up a "Utility UX" environment requires a specific, repeatable stack:
  </p>

  <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 list-none p-0">
    <li class="bg-white border border-slate-200 p-3 rounded-lg text-xs">
      <strong>SvelteKit + TS:</strong> Type safety for complex geographic data.
    </li>
    <li class="bg-white border border-slate-200 p-3 rounded-lg text-xs">
      <strong>Tailwind CSS:</strong> Overcoming the "initialization friction" to
      enable rapid-fire UI prototyping.
    </li>
  </ul>

  <!-- Friction -->
  <h3 id="friction" class="text-lg font-bold text-slate-800 mt-8">Dependency Friction</h3>

  <div class="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
    <h4 class="text-amber-900 font-bold text-xs uppercase mb-2">Technical Note</h4>
    <p class="text-xs text-amber-800">
      The repetitive nature of Tailwind/PostCSS initialization is a known DX
      bottleneck. EchoGlaze mitigates this by using
      <strong>Modular Component Pruning</strong>—keeping components small enough
      that styling remains scannable even as the project scales.
    </p>
  </div>

  <p class="text-xs text-slate-500 mt-4">
    Related: See <a href="#design" class="text-blue-600">Sand & Glam System</a>
    for how DX and design reinforce each other.
  </p>

</article>
