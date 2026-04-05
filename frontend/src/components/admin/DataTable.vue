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

defineEmits(["row-click"])
</script>

<template>
    <main class="bg-indigo-100 flex flex-col items-center p-10"
    >
        <p 
            class="text-gray-800 text-6xl font-bold mb-10 text-shadow-lg"
        >{{ title }}</p>

        <ul
            class="w-full border border-gray-600 divide-y divide-gray-600 rounded-md bg-gray-100">
            <li v-for="item in items" :key="item.id"
                class="p-1 even:bg-gray-300 first:rounded-t-md last:rounded-b-md flex justify-between cursor-pointer transition-all duration-200 hover:px-3 hover:bg-indigo-200 hover:shadow-md first:hover:rounded-t-md last:hover:rounded-b-md"
                @click="$emit('row-click', item)"
            >
                <span v-for="col in columns" :key="col.key"
                    class="mx-1"
                >
                    {{ item[col.key] }}
                </span>
            </li>
        </ul>
    </main>
</template>