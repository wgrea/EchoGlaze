<!-- src/lib/components/layout/BackgroundElements.svelte -->
<!-- Background floating elements -->
<div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
  <div class="absolute top-20 left-[10%] w-32 h-32 radius-large
    bg-gradient-to-br from-amber-200/30 to-orange-200/30 
    border border-white/40 shadow-lg backdrop-blur-sm
    animate-float-slow">
  </div>
  
  <div class="absolute top-40 right-[15%] w-24 h-24 radius-large 
    bg-amber-100/30 border border-amber-100/50 shadow-sm
    animate-float-medium [animation-delay:1s]">
  </div>
  
  <div class="absolute bottom-32 left-[20%] w-40 h-40 radius-large 
    bg-orange-100/20 border border-orange-100/40 shadow-sm
    animate-float-slow [animation-delay:2s]">
  </div>
  
  <div class="absolute bottom-20 right-[25%] w-28 h-28 radius-large 
    bg-yellow-100/20 border border-yellow-100/40 shadow-sm
    animate-float-medium [animation-delay:1.5s]">
  </div>
  
  <div class="absolute top-1/2 right-[8%] text-4xl opacity-10">✈️</div>
  <div class="absolute bottom-1/4 left-[12%] text-3xl opacity-10">🌍</div>
</div>

<style>
  @keyframes float-slow {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }
  
  @keyframes float-medium {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(-3deg);
    }
  }
  
  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }
  
  .animate-float-medium {
    animation: float-medium 6s ease-in-out infinite;
  }
</style>