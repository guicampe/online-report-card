<script setup>
import Loader from '../ui/Loader.vue';

const props = defineProps({
    placeholder: { type: String, default: "Nome" },
    loading: { type: Boolean, default: false }
});

const emit = defineEmits(["submit"]);
const name = defineModel();
</script>

<template>
    <div class="flex gap-3">
        <input
            v-model="name"
            type="text"
            :placeholder="props.placeholder"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            @keyup.enter="$emit('submit')"
        />
        <button
            class="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-gray-100 hover:bg-indigo-600 disabled:opacity-50"
            :disabled="loading"
            @click="$emit('submit')"
        >
            <Loader v-if="loading" />
            <span class="material-icons">playlist_add</span>
            Adicionar
        </button>
    </div>
</template>