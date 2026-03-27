<!-- src/lib/components/home/DigitalNomadLinks.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';

  export let links: Array<{
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

<div class="mb-12">
  <div class="text-center mb-4">
    <h2 class="text-lg font-medium text-gray-700">For Remote Workers</h2>
    <p class="text-gray-500 text-sm mt-1">Additional resources for digital nomads</p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
    {#each links as item}
      <button
        on:click={() => navigate(item.path)}
        aria-label="Go to {item.title}"
        class="group relative text-left transition-all duration-200 hover:scale-102"
      >
        <div class="card-standard p-4 bg-gradient-to-br {item.color} nostalgic-card">
          <div class="relative z-10">
            <div class="text-xl mb-2 {item.accent}">{item.icon}</div>
            <h3 class="text-base font-medium text-gray-700 mb-1">{item.title}</h3>
            <p class="text-gray-500 text-xs font-light">{item.description}</p>
          </div>
          <div class="absolute bottom-4 right-4 text-gray-400 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all duration-200">
            <span class="text-sm">→</span>
          </div>
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .nostalgic-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,245,0.98));
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05);
    backdrop-filter: blur(2px);
    transition: all 0.2s ease;
  }
  
  .card-standard {
    transition: all 0.3s ease;
  }
</style>