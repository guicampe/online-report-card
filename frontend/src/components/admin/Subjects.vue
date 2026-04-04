<script setup>
import { onMounted } from "vue";
import { useSubjects } from "@/composables/useSubjects";

const { subjects, fetchSubjects } = useSubjects();

onMounted(async () => {
    await fetchSubjects();
})
</script>

<template>
    <main>
        <p>Lista de matérias</p>

        <ul v-for="subject in subjects">
            <li>{{ subject.name }}</li>
        </ul>
    </main>
</template>