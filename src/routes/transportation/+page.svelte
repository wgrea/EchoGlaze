<!-- src/routes/echoglaze/transportation/+page.svelte -->
<div class="max-w-6xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-gray-900 mb-2">🚗 Transportation</h1>
  <p class="text-gray-600 mb-8">Getting around in your destination</p>
  
  <div class="grid md:grid-cols-3 gap-6">
    <div class="bg-white rounded-lg shadow p-6">
      <div class="text-3xl mb-3">🚌</div>
      <h2 class="text-xl font-semibold mb-2">Local Transit</h2>
      <p class="text-gray-600 text-sm">Metro, buses, and ride-hailing options vary by city. Most hubs have reliable public transit.</p>
    </div>
    
    <div class="bg-white rounded-lg shadow p-6">
      <div class="text-3xl mb-3">🚂</div>
      <h2 class="text-xl font-semibold mb-2">Intercity Travel</h2>
      <p class="text-gray-600 text-sm">Trains and buses connect major cities. Regional flights available for longer distances.</p>
    </div>
    
    <div class="bg-white rounded-lg shadow p-6">
      <div class="text-3xl mb-3">✈️</div>
      <h2 class="text-xl font-semibold mb-2">Airport Transfers</h2>
      <p class="text-gray-600 text-sm">Taxis, shuttles, and public transit options available at most airports.</p>
    </div>
  </div>
  
  <div class="mt-8">
    <h2 class="text-2xl font-semibold mb-4">City-Specific Info</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <a href="/city/baku" class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
        <h3 class="font-semibold">Baku</h3>
        <p class="text-sm text-gray-600">Metro, buses, and BakuCard for tourists</p>
      </a>
      <a href="/city/chicago" class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
        <h3 class="font-semibold">Chicago</h3>
        <p class="text-sm text-gray-600">'L' train, buses, and ride-sharing</p>
      </a>
    </div>
  </div>
</div>