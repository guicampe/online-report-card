<script setup>
import NavCard from '@/components/ui/NavCard.vue';

defineProps({
    userName: String
})
</script>

<template>
    <main class="border border-gray-400 mx-auto w-5/6 h-64 rounded-md">
        <p class="mb-10 p-2 text-2xl text-gray-800 bg-blue-300 w-full rounded-t-md shadow-lg">
            Bem vindo de volta,
            <span>{{ userName }}</span>
        </p>
        <nav class="flex justify-between p-2 w-4/5 mx-auto">
            <NavCard label="Alunos" path="/admin/users" />
            <NavCard label="Matérias" path="/admin/subjects" />
        </nav>
    </main>
</template>