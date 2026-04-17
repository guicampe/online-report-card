<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAddSubjectToUser } from "@/composables/useAddSubjectToUser";
import { useAvailableSubjects } from "@/composables/useAvailableSubjects";
import Loader from "../ui/Loader.vue";

const route = useRoute();
const emit = defineEmits(["created"]);
const { subjectId, loading, error, fetchAddSubjectToUser } = useAddSubjectToUser();
const { subjects, fetchAvailableSubjects } = useAvailableSubjects();

async function handleCreate() {
    if (!subjectId.value) return;

    const result = await fetchAddSubjectToUser(route.params.id);

    if (!result) return;

    subjectId.value = "";
    emit("created");
}

onMounted(async () => {
    await fetchAvailableSubjects(route.params.id);
})
</script>

<template>
    <div class="flex items-center gap-3">
        <select v-model="subjectId"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="" disabled>Selecione uma matéria</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                {{ subject.name }}
            </option>
        </select>
        <button
            class="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-gray-100 hover:bg-indigo-600 disabled:opacity-50"
            :disabled="loading" @click="handleCreate">
            <Loader v-if="loading" />
            <span class="material-icons">playlist_add</span>
            Adicionar
        </button>
        <p v-if="error" class="text-red-500">{{ error }}</p>
    </div>
</template>