<script setup>
import { onMounted } from "vue";
import { useUsers } from "@/composables/useUsers";
import DataList from "../components/admin/DataList.vue";
import Back from "@/components/layout/Back.vue";

const { users, fetchUsers } = useUsers();

onMounted(async () => {
    await fetchUsers();
})
</script>

<template>
        <div class="h-screen bg-indigo-100">
            <Back />
            <DataList
                title="Alunos"
                :items="users"
                :columns="[{ label: 'Nome', key: 'name' }]"
                @row-click="(user) => $router.push(`/admin/${user.id}`)"
            ></DataList>
        </div>
</template>