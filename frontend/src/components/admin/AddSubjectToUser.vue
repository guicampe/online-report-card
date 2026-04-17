<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAddSubjectToUser } from "@/composables/useAddSubjectToUser";
import { useSubjects } from "@/composables/useSubjects";
import Loader from "../ui/Loader.vue";

const route = useRoute();
const emit = defineEmits(["created"]);
const { subjectId, loading, fetchAddSubjectToUser } = useAddSubjectToUser();
const { subjects, fetchSubjects } = useSubjects();

async function handleCreate() {
    if (!subjectId.value) return;

    await fetchAddSubjectToUser(route.params.id);

    subjectId.value = "";
    emit("created");
}

onMounted(async () => {
    await fetchSubjects();
})
</script>

<template>
    <div class="flex gap-3">
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
    </div>
</template>