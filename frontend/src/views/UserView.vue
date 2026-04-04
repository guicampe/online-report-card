<script setup>
import { onMounted } from "vue";
import { useUser } from "@/composables/useUser";
import { useGrades } from "@/composables/useGrades";
import UserAppHeader from "@/components/user/UserAppHeader.vue";
import UserTable from "@/components/user/UserTable.vue";
import Logout from "@/components/layout/Logout.vue";

const { user, fetchUser } = useUser();
const { grades, fetchGrades } = useGrades();

onMounted(async () => {
    await fetchUser();
    await fetchGrades();
})
</script>

<template>
    <Logout />
    <UserAppHeader 
        :userName="user?.name"
        :userRa="user?.id"
    />
    <UserTable :grades="grades" />
</template>