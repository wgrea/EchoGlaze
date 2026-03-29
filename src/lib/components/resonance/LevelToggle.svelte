<!-- src/lib/components/resonance/LevelToggle.svelte -->
<script lang="ts">
    export let level: 'country' | 'city';
    export let onToggle: () => void;
</script>

<div class="flex gap-4 mb-6">
    <button
        class="px-6 py-2 rounded-lg font-medium transition-all duration-200"
        class:bg-blue-600={level === 'country'}
        class:text-white={level === 'country'}
        class:bg-gray-200={level !== 'country'}
        class:text-gray-700={level !== 'country'}
        class:dark:bg-gray-700={level !== 'country'}
        class:dark:text-gray-300={level !== 'country'}
        on:click={onToggle}
    >
        Country Level
    </button>
    <button
        class="px-6 py-2 rounded-lg font-medium transition-all duration-200"
        class:bg-blue-600={level === 'city'}
        class:text-white={level === 'city'}
        class:bg-gray-200={level !== 'city'}
        class:text-gray-700={level !== 'city'}
        class:dark:bg-gray-700={level !== 'city'}
        class:dark:text-gray-300={level !== 'city'}
        on:click={onToggle}
    >
        City Level
    </button>
</div>