<script setup>
defineProps({
    name: String,
    id: Number,
    email: String
})
</script>

<template>
        <div class="p-10">
            <h1 class="text-gray-800 text-4xl font-bold mb-10 text-shadow-md">Área do aluno</h1>
            <div class="flex flex-col gap-1 border-2 border-indigo-400 p-2 bg-gray-200 rounded-md shadow-md">
                <h2 class="text-gray-800 text-2xl font-bold text-shadow-md">Informações pessoais</h2>
                <p class="text-indigo-500 font-bold">Nome: <span class="text-gray-800 font-normal">{{ name }}</span></p>
                <p class="text-indigo-500 font-bold">RA: <span class="text-gray-800 font-normal">{{ id }}</span></p>
                <p class="text-indigo-500 font-bold">E-mail: <span class="text-gray-800 font-normal">{{ email }}</span></p>
            </div>
        </div>
</template>