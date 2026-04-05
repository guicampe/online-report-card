<script setup>
import { onMounted } from "vue";
import { useUsers } from "@/composables/useUsers";
import DataTable from "./DataTable.vue";
import Back from "../layout/Back.vue";

const { users, fetchUsers } = useUsers();

onMounted(async () => {
    await fetchUsers();
})
</script>

<template>
        <div class="h-screen bg-indigo-100">
            <Back />
            <DataTable
                title="Alunos"
                :items="users"
                :columns="[{ label: 'Nome', key: 'name' }]"
                @row-click="(user) => $router.push(`/users/${user.id}`)"
            />
        </div>
</template>