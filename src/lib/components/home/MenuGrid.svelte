<!-- src/lib/components/home/MenuGrid.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  export let menuItems;
  function navigate(path: string) { goto(path); }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
  {#each menuItems as item}
    <button 
      on:click={() => navigate(item.path)} 
      class="group h-auto min-h-[140px] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
    >
      <div class="h-full p-1 bg-gradient-to-br {item.color} rounded-[2rem] shadow-xl backdrop-blur-lg border border-white/40 overflow-hidden">
        <div class="nostalgic-card h-full p-6 relative rounded-[1.8rem]">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div class="relative z-10 flex items-center gap-6 h-full text-left">
            <div class="text-4xl {item.accent} drop-shadow-xl shrink-0">
              {@html item.icon}
            </div>
            
            <div class="flex-1">
              <h3 class="text-lg font-black text-slate-900 leading-tight mb-1">
                {item.title}
              </h3>
              <p class="text-xs text-slate-600 font-medium leading-relaxed max-w-[200px]">
                {item.description}
              </p>
            </div>

            <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <span class="text-xl {item.accent}">→</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  {/each}
</div>

<style>
  .nostalgic-card {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.3);
  }
  
  .nostalgic-card:hover {
    background: rgba(255,255,255,0.3);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  }
</style>