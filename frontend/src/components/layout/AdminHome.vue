<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToUsers = () => {
    router.push("/admin/users");
}

defineProps({
    userName: String,
})
</script>

<template>
    <p class="ml-4 mb-10 text-2xl text-gray-800">
        Bem vindo de volta, 
        <span>{{ userName }}</span>
    </p>
    <main class="flex justify-around p-2 w-4/5 mx-auto">
        <div
            @click="goToUsers"
            class="bg-blue-500 w-1/4 h-24 flex justify-center items-center rounded-md shadow-sm text-gray-300 font-bold text-3xl cursor-pointer duration-250 ease hover:bg-blue-400"
        >
            <p>Alunos</p>
        </div>

        <div 
            class="bg-blue-500 w-1/4 h-24 flex justify-center items-center rounded-md shadow-sm text-gray-300 font-bold text-3xl cursor-pointer duration-250 ease hover:bg-blue-400"
        >
            <p>Matérias</p>
        </div>
    </main>
</template>