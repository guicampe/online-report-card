<script setup>
import { onMounted } from "vue";
import { useUsers } from "@/composables/useUsers";
import { useUser } from "@/composables/useUser";
import Logout from "@/components/layout/Logout.vue";
import AdminHome from "@/views/AdminHome.vue";

const { users, fetchUsers } = useUsers();
const { user, fetchUser } = useUser();

onMounted(async () => {
    await fetchUsers();
    await fetchUser();
})
</script>

<template>
    <Logout />
    <AdminHome
        :userName="user?.name"
    />
</template>