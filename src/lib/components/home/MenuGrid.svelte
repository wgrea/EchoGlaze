<!-- src/lib/components/home/MenuGrid.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  export let menuItems;
  function navigate(path: string) { goto(path); }
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
  {#each menuItems as item}
    <button on:click={() => navigate(item.path)} class="group h-48 transition-all duration-500 hover:scale-110 hover:-translate-y-3">
      <div class="h-full p-3 bg-gradient-to-br {item.color} rounded-2xl shadow-2xl shadow-[hsl(var(--color-pink)/0.4)] backdrop-blur-lg border border-white/30 hover:border-white/50 overflow-hidden">
        <div class="nostalgic-card h-full p-6 relative">
          <!-- Shine -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          <div class="relative z-10 flex flex-col h-full justify-between">
            <div class="text-3xl mb-3 {item.accent} drop-shadow-2xl">{@html item.icon}</div>
            <div>
              <h3 class="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-transparent bg-clip-text mb-2">{item.title}</h3>
              <p class="text-sm text-gray-800/90 font-light leading-tight">{item.description}</p>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto">
              <span class="text-xl {item.accent.replace('text-', 'text-rose-400 ')} drop-shadow-lg">✨→</span>
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