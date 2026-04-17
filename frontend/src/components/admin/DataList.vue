<script setup>
import { useDeleteSubject } from '@/composables/useDeleteSubject';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const openMenuId = ref(null);

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

const emit = defineEmits(["row-click", "delete-subject"]);

const { fetchDeleteSubject } = useDeleteSubject();

const handleDelete = async (id) => {
    await fetchDeleteSubject(id);
    emit("delete-subject", id);
}

const handleClickOutside = () => {
    openMenuId.value = null;
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
})

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
})
</script>

<template>
    <main class="bg-indigo-100 flex flex-col items-center p-10">
        <p class="text-gray-800 text-6xl font-bold mb-10 text-shadow-lg">{{ title }}</p>

        <ul v-if="items.length"
            class="w-full border border-gray-600 divide-y divide-gray-600 rounded-md bg-gray-100 mb-10">
            <li v-for="item in items" :key="item.id"
                class="p-1 even:bg-gray-300 first:rounded-t-md last:rounded-b-md flex items-center justify-between cursor-pointer transition-all duration-200 hover:px-3 hover:bg-indigo-200 hover:shadow-md first:hover:rounded-t-md last:hover:rounded-b-md"
                @click="$emit('row-click', item)">
                <span v-for="col in columns" :key="col.key" class="flex items-center p-1">
                    {{ item[col.key] }}
                </span>
                <div class="relative flex items-center">
                    <button @click.stop="openMenuId = openMenuId === item.id ? null : item.id"
                        class="material-icons text-indigo-500 transition hover:text-black rounded-full hover:bg-indigo-500">
                        more_vert
                    </button>
                    <div class="relative flex items-center">
                        <div v-if="openMenuId === item.id"
                            class="absolute right-0 top-6 w-32 bg-white border rounded shadow-md z-10">
                            <button class="w-full text-left px-3 py-2 hover:bg-gray-100"
                                @click.stop="$emit('row-click', item)">
                                Editar
                            </button>

                            <button class="w-full text-left px-3 py-2 text-red-500 hover:bg-red-100"
                                @click.stop="handleDelete(item.id)">
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <slot v-else name="empty" />
        <div class="w-full flex justify-start gap-5">
            <slot name="actions" />
        </div>
    </main>
</template>