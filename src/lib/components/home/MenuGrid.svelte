<!-- src/lib/components/home/MenuGrid.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';

  export let menuItems: Array<{
    title: string;
    description: string;
    icon: string;
    path: string;
    color: string;
    accent: string;
  }>;

  function navigate(path: string) {
    goto(path);
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-standard mb-12">
  {#each menuItems as item}
    <button
      on:click={() => navigate(item.path)}
      aria-label="Go to {item.title}"
      class="group relative text-left transition-all duration-300 hover:scale-105"
    >
      <div class="card-standard card-padding bg-gradient-to-br {item.color} nostalgic-card">
        <div class="relative z-10">
          <div class="text-3xl mb-3 {item.accent}">{item.icon}</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
          <p class="text-gray-600 text-sm font-light">{item.description}</p>
        </div>
        <div class="absolute bottom-6 right-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300">
          <span class="text-lg">→</span>
        </div>
      </div>
    </button>
  {/each}
</div>

<style>
  .nostalgic-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,245,0.98));
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05);
    backdrop-filter: blur(2px);
    transition: all 0.2s ease;
  }
  
  .nostalgic-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.05);
  }
  
  .card-standard {
    transition: all 0.3s ease;
  }
</style>