<!-- src/lib/components/resonance/LevelToggle.svelte -->
<script lang="ts">
    export let level: 'country' | 'city';
    export let onToggle: () => void;
</script>

<div class="flex gap-4 mb-6" role="group" aria-label="View level toggle">
    <button
        type="button"
        class="px-6 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        class:bg-blue-600={level === 'country'}
        class:text-white={level === 'country'}
        class:bg-gray-200={level !== 'country'}
        class:text-gray-700={level !== 'country'}
        class:dark:bg-gray-700={level !== 'country'}
        class:dark:text-gray-300={level !== 'country'}
        on:click={onToggle}
        aria-pressed={level === 'country'}
    >
        Country Level
    </button>
    <button
        type="button"
        class="px-6 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        class:bg-blue-600={level === 'city'}
        class:text-white={level === 'city'}
        class:bg-gray-200={level !== 'city'}
        class:text-gray-700={level !== 'city'}
        class:dark:bg-gray-700={level !== 'city'}
        class:dark:text-gray-300={level !== 'city'}
        on:click={onToggle}
        aria-pressed={level === 'city'}
    >
        City Level
    </button>
</div>