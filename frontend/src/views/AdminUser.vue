<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useUserById } from '@/composables/useUserById';
import { useUserByIdGrades } from '@/composables/useUserByIdGrades';
import Back from '@/components/layout/Back.vue';
import UserSubjects from '@/components/ui/admin/UserSubjects.vue';
import UserPersonalInfo from '@/components/ui/admin/UserPersonalInfo.vue';

const route = useRoute();
const { userById, fetchUserById } = useUserById();
const { grades, fetchGradesById } = useUserByIdGrades();

onMounted(async () => {
    await fetchUserById(route.params.id);
    await fetchGradesById(route.params.id);
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
            :subjects="grades"
        />
    </main>
</template>