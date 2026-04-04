<script setup>
import { onMounted } from "vue";
import { useUsers } from "@/composables/useUsers";

const { users, fetchUsers } = useUsers();

onMounted(async () => {
    await fetchUsers();
})
</script>

<template>
    <main>
        <p>Lista de usuários</p>

        <ul v-for="user in users">
            <li>{{ user.name }}</li>
        </ul>
    </main>
</template>