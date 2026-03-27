<!-- src/lib/components/home/FeaturesSection.svelte -->
<div class="card-standard card-padding mb-6 nostalgic-card">
  <h2 class="text-2xl font-light text-gray-900 mb-6 text-center">Why Use Echotrip?</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-standard text-center">
    <div class="text-gray-700">
      <div class="text-3xl mb-3">💰</div>
      <h3 class="font-medium text-gray-900 mb-2">Save Money</h3>
      <p class="text-sm text-gray-600">Use multipliers to compare costs across destinations</p>
    </div>
    <div class="text-gray-700">
      <div class="text-3xl mb-3">⏱️</div>
      <h3 class="font-medium text-gray-900 mb-2">Save Time</h3>
      <p class="text-sm text-gray-600">All your travel research in one place</p>
    </div>
    <div class="text-gray-700">
      <div class="text-3xl mb-3">🎯</div>
      <h3 class="font-medium text-gray-900 mb-2">Perfect Match</h3>
      <p class="text-sm text-gray-600">Find destinations that fit your work & lifestyle</p>
    </div>
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