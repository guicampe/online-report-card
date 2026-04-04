<script setup>
import { onMounted } from "vue";
import { useSubjects } from "@/composables/useSubjects";
import DataTable from "./DataTable.vue";

const { subjects, fetchSubjects } = useSubjects();

onMounted(async () => {
    await fetchSubjects();
})
</script>

<template>
    <DataTable
        title="Matérias"
        :items="subjects",
        :columns="[{ label: 'Matéria', key:'name' }]"
    />
</template>