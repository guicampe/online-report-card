<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useUserById } from '@/composables/useUserById';
import { useUserByIdGrades } from '@/composables/useUserByIdGrades';
import Back from '../layout/Back.vue';
import UserPersonalInfo from '../ui/admin/UserPersonalInfo.vue';
import UserSubjects from '../ui/admin/UserSubjects.vue';

const route = useRoute();
const { userById, fetchUserById } = useUserById();
const { subjects, fetchSubjectsById } = useUserByIdGrades();

onMounted(async () => {
    await fetchUserById(route.params.id);
    await fetchSubjectsById(route.params.id);
})
</script>

<template>
    <main class="h-screen bg-indigo-100">
        <Back />
        <UserPersonalInfo 
            :name="userById?.name"
            :id="userById?.id"
            :email="userById?.email"
        />
        <UserSubjects 
            :subjects="subjects"
        />
    </main>
</template>