<!-- src/lib/components/FilterBar.svelte -->
<script lang="ts">
  export let filters: {
    type: string;
    wifiMin: number;
    maxPriceTier: string;
    socialTone: string;
  };

  const wifiLevels = [
    { val: 3.0, label: '3.0+ | 📩 Lite / Async', desc: 'Slack, Email, Jira' },
    { val: 3.5, label: '3.5+ | 💻 Standard Work', desc: 'Zoom, Figma, Dev work' },
    { val: 4.5, label: '4.5+ | 🚀 Power User', desc: '4K Streaming, Large Pushes' }
  ];
</script>

<div class="bg-slate-100 rounded-2xl border border-slate-200 p-6 mb-10 shadow-inner">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    <div class="md:col-span-2 p-5 bg-white border border-slate-200 rounded-xl flex gap-4 items-start shadow-sm">
      <div class="text-2xl mt-1 opacity-80">🗓️</div>
      <div class="flex-1">
        <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
          Stay Elasticity & Planning
        </h2>
        <p class="text-xs text-slate-600 leading-relaxed">
          Hostel workability is tied to seasonal demand. 
          <span class="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">Cheap seasons</span> 
          often allow for stable <strong>4–6 month</strong> residencies. 
          
          <span class="text-indigo-700 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100/50">Sweet Spots</span> 
          typically support <strong>1–3 month</strong> stays, while 
          
          <span class="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100/50">Peak</span> 
          demand usually triggers rotation caps <strong>under 30 days</strong>.
        </p>
      </div>
    </div>

    <div>
      <label for="wifi-filter" class="block text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">WiFi Needs</label>
      <p class="text-[11px] text-slate-400 mb-2 leading-tight">Minimum quality for smooth nomad work</p>
      <select id="wifi-filter" bind:value={filters.wifiMin} on:change
        class="w-full border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 transition-all">
        {#each wifiLevels as level}
          <option value={level.val}>{level.label}</option>
        {/each}
      </select>
    </div>
      
    <div>
      <label for="price-filter" class="block text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Budget Limit</label>
      <p class="text-[11px] text-slate-400 mb-2 leading-tight">Includes this tier and all cheaper options</p>
      <select id="price-filter" bind:value={filters.maxPriceTier} on:change
        class="w-full border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 transition-all">
        <option value="all">Any Budget</option>
        <option value="1">Entry Level (Tier 1)</option>
        <option value="2">Budget (Tier 2)</option>
        <option value="3">Mid-Range (Tier 3)</option>
        <option value="4">Premium (Tier 4)</option>
      </select>
    </div>
  </div>
</div>