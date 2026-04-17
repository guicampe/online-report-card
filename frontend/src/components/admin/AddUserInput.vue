<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAddStudent } from '@/composables/useAddStudent';
import Loader from '../ui/Loader.vue';
import { useAvailableUsers } from '@/composables/useAvailableUsers';

const route = useRoute();
const emit = defineEmits(["created"]);
const { userId, loading, fetchAddStudent } = useAddStudent();
const { users, fetchAvailableUsers } = useAvailableUsers();

async function handleCreate() {
    if (!userId.value)  return;

    await fetchAddStudent(route.params.id);

    userId.value = "";
    emit("created");
}

onMounted(async () => {
    await fetchAvailableUsers(route.params.id);
})
</script>

<template>
    <div class="flex gap-3">
        <select
            v-model="userId"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
            <option value="" disabled>Selecione um aluno</option>
            <option v-for="user in users" :key="users.id" :value="user.id">
                {{ user.name }}
            </option>
        </select>
        <button
            class="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-gray-100 hover:bg-indigo-600 disabled:opacity-50"
            :disabled="loading"
            @click="handleCreate"
        >
            <Loader v-if="loading" />
            <span class="material-icons">playlist_add</span>
            Adicionar
        </button>
    </div>
</template>