<script setup>
import { onMounted } from "vue";
import { useSubjects } from "@/composables/useSubjects";
import DataTable from "./DataTable.vue";
import Back from "../layout/Back.vue";

const { subjects, fetchSubjects } = useSubjects();

onMounted(async () => {
    await fetchSubjects();
})
</script>

<template>
    <div class="h-screen bg-indigo-100">
        <Back />
        <DataTable
            title="Matérias"
            :items="subjects",
            :columns="[{ label: 'Matéria', key:'name' }]"
            @row-click="(subject) => $router.push(`/subjects/${subject.id}`)"
        />
    </div>
</template>