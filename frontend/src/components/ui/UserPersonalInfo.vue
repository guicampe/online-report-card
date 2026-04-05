<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserById } from '@/composables/useUserById';


const route = useRoute();
const { userById, fetchUserById } = useUserById();

onMounted(async () => {
    await fetchUserById(route.params.id);
})
</script>

<template>
    <main class="h-screen bg-indigo-100">
        <div class="p-10">
            <h1 class="text-gray-800 text-4xl font-bold mb-10 text-shadow-md">Área do aluno</h1>
            <div class="flex flex-col gap-1 border-2 border-indigo-400 p-2 bg-gray-200 rounded-md shadow-md">
                <h2 class="text-gray-800 text-2xl font-bold text-shadow-md">Informações pessoais</h2>
                <p class="text-indigo-500 font-bold">Nome: <span class="text-gray-800 font-normal">{{ userById?.name }}</span></p>
                <p class="text-indigo-500 font-bold">RA: <span class="text-gray-800 font-normal">{{ userById?.id }}</span></p>
                <p class="text-indigo-500 font-bold">E-mail: <span class="text-gray-800 font-normal">{{ userById?.email }}</span></p>
            </div>
        </div>
    </main>
</template>