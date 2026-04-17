<script setup>
import { onMounted } from "vue";
import { useSubjects } from "@/composables/useSubjects";
import Back from "@/components/layout/Back.vue";
import DataList from "@/components/admin/DataList.vue";
import AddSubjectInput from "@/components/admin/AddSubjectInput.vue";

const { subjects, fetchSubjects } = useSubjects();

onMounted(async () => {
    await fetchSubjects();
})
</script>

<template>
    <div class="h-screen bg-indigo-100">
        <Back />
        <DataList
            title="Matérias"
            :items="subjects",
            :columns="[{ label: 'Matéria', key:'name' }]"
            @row-click="(subject) => $router.push({ name: 'subjectsById', params: { id: subject.id } })"
            @delete-subject="fetchSubjects"
            >
            <template #actions>
                <AddSubjectInput @created="fetchSubjects" />
            </template>
        </DataList>
    </div>
</template>