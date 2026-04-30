<article class="prose prose-sm max-w-none">

  <h2 class="text-2xl font-bold text-slate-900 mb-6">🤖 The AI Lab: Prompting & Collaboration</h2>

  <!-- Why this matters -->
  <div class="mb-8 bg-indigo-50 border border-indigo-100 p-5 rounded-xl text-sm text-indigo-900">
    <strong>Why this matters:</strong>
    EchoGlaze relies on AI for refactoring, data shaping, and interface
    generation. This section documents the protocols that prevent context
    blindness and ensure consistent, brand-aligned output.
  </div>

  <!-- Micro TOC -->
  <nav class="text-xs text-slate-400 mb-8 space-y-1">
    <p class="font-bold text-slate-500">On this section</p>
    <ul class="list-disc ml-4 space-y-1">
      <li><a href="#blue-button" class="text-blue-600">The Blue Button Insight</a></li>
      <li><a href="#protocol" class="text-blue-600">Resonance Data Protocol</a></li>
      <li><a href="#refactoring" class="text-blue-600">AI-Assisted Refactoring</a></li>
    </ul>
  </nav>

  <!-- Blue Button -->
  <h3 id="blue-button" class="text-lg font-bold text-slate-800">The Blue Button Insight</h3>

  <div class="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8">
    <h4 class="text-indigo-800 font-bold mb-2 italic">"The Blue Button Insight"</h4>
    <p class="text-indigo-900 text-sm">
      AI defaults to generic #2563eb buttons. Professional UX requires
      brand-specific logic. We prompt for <strong>Context</strong> over
      <strong>Vague Improvement</strong>.
    </p>
  </div>

  <!-- Protocol -->
  <h3 id="protocol" class="text-lg font-bold text-slate-800">The Resonance Data Protocol</h3>
  <p>
    To avoid "Context Blindness," the AI must see these 4 files before generating
    data:
  </p>

  <ul class="grid grid-cols-2 gap-2 list-none p-0 text-[11px] font-mono">
    <li class="bg-slate-100 p-2 rounded">1. resonance.ts (Structure)</li>
    <li class="bg-slate-100 p-2 rounded">2. types.ts (Definitions)</li>
    <li class="bg-slate-100 p-2 rounded">3. resonanceData.ts (Tags)</li>
    <li class="bg-slate-100 p-2 rounded">4. Country Example (Reference)</li>
  </ul>

  <!-- Refactoring -->
  <h3 id="refactoring" class="text-lg font-bold text-slate-800 mt-8">AI-Assisted Refactoring</h3>

  <pre class="bg-gray-800 text-white p-4 rounded text-xs">
# Pattern: Update all imports before moving files
sed -i 's/OldName/NewName/g' src/routes/**/*.svelte
  </pre>

  <p class="text-xs text-slate-500 mt-4">
    Related: See <a href="#dx" class="text-blue-600">Developer Experience</a>
    for how this integrates with the Utility UX workflow.
  </p>

</article>
