<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSubjectsById } from '@/composables/useSubjectsById';
import DataList from '@/components/admin/DataList.vue';
import Back from '@/components/layout/Back.vue';
import AddUserInput from '@/components/admin/AddUserInput.vue';
import { useSubjectById } from '@/composables/useSubjectById';

const route = useRoute();
const { subjects, fetchSubjectsById } = useSubjectsById();
const { subject, fetchSubjectById } = useSubjectById();

onMounted(async () => {
    await Promise.all([
        fetchSubjectsById(route.params.id),
        fetchSubjectById(route.params.id)
    ]);
})
</script>

<template>
    <main class="h-screen bg-indigo-100">
        <Back />
        <DataList
            v-if="subjects.length"
            :title="subject?.name"
            :items="subjects"
            :columns="[{ label: 'Aluno', key: 'user_name' }]"
        >
        <template #actions>
            <AddUserInput @created="fetchSubjectsById(route.params.id)" />
        </template>
        </DataList>
        <div v-else class="flex flex-col items-center gap-5 p-10">
            <p class="text-center font-bold text-3xl text-gray-800">Nenhum aluno matriculado em {{ subject?.name }}</p>
            <AddUserInput 
                @created="fetchSubjectsById(route.params.id)" 
                
            />
        </div>
    </main>
</template>