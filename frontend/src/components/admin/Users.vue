<script setup>
import { onMounted } from "vue";
import { useUsers } from "@/composables/useUsers";
import DataTable from "./DataTable.vue";

const { users, fetchUsers } = useUsers();

onMounted(async () => {
    await fetchUsers();
})
</script>

<template>
    <DataTable
        title="Alunos"
        :items="users"
        :columns="[{ label: 'Nome', key: 'name' }, { label: 'Email', key: 'email' }]"
    />
</template>