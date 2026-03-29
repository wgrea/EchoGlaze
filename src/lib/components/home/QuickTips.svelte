<!-- src/lib/components/home/QuickTips.svelte -->
<div class="card-standard card-padding nostalgic-card">
  <div class="flex items-center gap-4">
    <div class="w-12 h-12 radius-large bg-amber-100 flex items-center justify-center text-amber-600">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div class="text-left">
      <p class="font-medium text-gray-900">Getting Started</p>
      <p class="text-sm text-gray-600 mt-1">
        Begin with the Destination Finder to narrow down locations, then explore costs and visa requirements.
        All cost data uses multipliers for accurate long-term budgeting.
      </p>
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