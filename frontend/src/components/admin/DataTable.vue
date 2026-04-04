<script setup>
defineProps({
    title: String,
    items: {
        type: Array,
        required: true,
    },
    columns: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <main class="bg-indigo-100 h-screen flex flex-col items-center p-10">
        <p 
            class="text-gray-800 text-6xl font-bold mb-10 text-shadow-lg"
        >{{ title }}</p>

        <ul
            class="w-full border border-gray-600 divide-y divide-gray-600 rounded-md bg-gray-100">
            <li v-for="item in items" :key="item.id"
                class="p-1 even:bg-gray-300 flex gap-4"
            >
                <span v-for="col in columns" :key="col.key">
                    {{ item[col.key] }}
                </span>
            </li>
        </ul>
    </main>
</template>