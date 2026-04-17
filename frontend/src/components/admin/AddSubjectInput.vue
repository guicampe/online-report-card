<script setup>
import AddInput from './AddInput.vue';
import { useCreateSubject } from '@/composables/useCreateSubject';

const emit = defineEmits(["created"]);
const { name, loading, fetchCreateSubject } = useCreateSubject();

async function handleCreate() {
    if (!name.value.trim()) return;
    
    await fetchCreateSubject();

    name.value = "";

    emit("created");
}
</script>

<template>
    <AddInput v-model="name" placeholder="Nome da matéria" :loading="loading" @submit="handleCreate" />
</template>