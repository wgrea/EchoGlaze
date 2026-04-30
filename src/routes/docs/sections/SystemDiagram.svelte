<!-- src/routes/docs/sections/SystemDiagram.svelte -->
<article class="prose prose-sm max-w-none">

  <h2 class="text-2xl font-bold text-slate-900 mb-6">🗺️ System Diagram</h2>

  <!-- Why this matters -->
  <div class="mb-8 bg-slate-50 border border-slate-200 p-5 rounded-xl text-sm text-slate-600">
    <strong>Why this matters:</strong>
    EchoGlaze is a multi‑layered system where data, UI, and AI collaboration
    reinforce each other. This diagram clarifies how information flows through
    the product—helping contributors, reviewers, and AI assistants reason about
    changes without breaking the architecture.
  </div>

  <!-- Micro TOC -->
  <nav class="text-xs text-slate-400 mb-8 space-y-1">
    <p class="font-bold text-slate-500">On this section</p>
    <ul class="list-disc ml-4 space-y-1">
      <li><a href="#layers" class="text-blue-600">System Layers</a></li>
      <li><a href="#flow" class="text-blue-600">Data Flow</a></li>
      <li><a href="#ai" class="text-blue-600">AI Collaboration Path</a></li>
      <li><a href="#future" class="text-blue-600">Future Diagram</a></li>
    </ul>
  </nav>

  <!-- System Layers -->
  <h3 id="layers" class="text-lg font-bold text-slate-800">System Layers</h3>
  <p class="text-sm text-slate-600">
    EchoGlaze is structured around four cooperating layers:
  </p>

  <ul class="text-sm text-slate-700 space-y-2">
    <li><strong>1. Data Layer:</strong> Country modules, resonance values, visa logic.</li>
    <li><strong>2. Logic Layer:</strong> Resonance engine, filtering rules, social friction scoring.</li>
    <li><strong>3. UI Layer:</strong> Sand & Glam components, Radix primitives, Utility UX patterns.</li>
    <li><strong>4. AI Layer:</strong> Prompt orchestration, refactoring patterns, context‑aware generation.</li>
  </ul>

  <p class="text-xs text-slate-500 mt-2">
    Related: See <a href="#architecture" class="text-blue-600">Data Architecture</a> for the country module structure.
  </p>

  <!-- Data Flow -->
  <h3 id="flow" class="text-lg font-bold text-slate-800 mt-10">Data Flow</h3>
  <p class="text-sm text-slate-600">
    A simplified view of how data moves through EchoGlaze:
  </p>

  <div class="bg-white border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-700 leading-relaxed my-4">
    Country Module → Resonance Engine → Filtered Results → UI Components → User Decision
  </div>

  <p class="text-xs text-slate-500">
    This flow ensures that a single source of truth powers multiple views without duplication.
  </p>

  <!-- AI Collaboration Path -->
  <h3 id="ai" class="text-lg font-bold text-slate-800 mt-10">AI Collaboration Path</h3>
  <p class="text-sm text-slate-600">
    The AI layer interacts with the system through a controlled protocol:
  </p>

  <ul class="text-sm text-slate-700 space-y-2">
    <li><strong>1. Context Injection:</strong> Provide resonance.ts, types.ts, resonanceData.ts, and a country example.</li>
    <li><strong>2. Task Framing:</strong> Ask for transformations, not inventions.</li>
    <li><strong>3. Refactor Loop:</strong> AI proposes → human validates → system updates.</li>
  </ul>

  <p class="text-xs text-slate-500 mt-2">
    Related: See <a href="#intelligence" class="text-blue-600">Orchestration & Prompts</a> for the full protocol.
  </p>

  <!-- Future Diagram -->
  <h3 id="future" class="text-lg font-bold text-slate-800 mt-10">Future Diagram</h3>
  <p class="text-sm text-slate-600">
    A full visual diagram will be added later. It will include:
  </p>

  <ul class="text-sm text-slate-700 space-y-1">
    <li>Data pipeline</li>
    <li>Resonance scoring flow</li>
    <li>Visa logic branching</li>
    <li>UI component hierarchy</li>
    <li>AI prompting loop</li>
  </ul>

</article>
