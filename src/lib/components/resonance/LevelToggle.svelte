<!-- src/lib/components/resonance/LevelToggle.svelte -->
<script lang="ts">
    export let level: 'country' | 'city';
    export let onToggle: () => void;
</script>

<div class="inline-flex items-center gap-2 mb-6">
    <span class="text-sm font-medium">Country Level</span>

    <button
        type="button"
        class="relative inline-flex h-6 w-11 items-center rounded-full transition
               {level === 'city' ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}"
        on:click={onToggle}
        aria-label="Toggle between country and city level"
    >
        <span
            class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition
                   {level === 'city' ? 'translate-x-5' : 'translate-x-1'}"
        ></span>
    </button>

    <span class="text-sm font-medium">City Level</span>
</div>
