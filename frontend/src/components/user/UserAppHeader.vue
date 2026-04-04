<script setup>
defineProps({
    userName: String,
    userRa: [String, Number]
})
</script>

<template>
    <header class="bg-indigo-500 p-6 flex justify-around align-center mb-4 mt-4 text-gray-200 w-7/8 mx-auto rounded-sm shadow-md">
        <p class="border rounded-md p-2 shadow-sm">Aluno(a): <span class="font-bold">{{ userName }}</span></p>
        <p class="border rounded-md p-2 shadow-sm">RA: <span class="font-bold">{{ userRa }}</span></p>
        <p class="border rounded-md p-2 shadow-sm">Ano letivo: <span class="font-bold">2026</span></p>
    </header>
</template>