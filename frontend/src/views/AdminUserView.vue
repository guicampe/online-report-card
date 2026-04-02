<script setup>
import { onMounted } from "vue";
import { useUsers } from "@/composables/useUsers";
import Logout from "@/components/layout/Logout.vue";

const { users, fetchUsers } = useUsers();

onMounted(async () => {
    await fetchUsers();
})
</script>

<template>
    <Logout />
    <table class="mx-auto">
        <thead>
            <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Nota 1</th>
                <th>Nota 2</th>
                <th>Média</th>
                <th>Faltas</th>
                <th>Presença</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.grade1 ?? "-" }}</td>
                <td>{{ user.grade2 ?? "-" }}</td>
                <td>{{ user.average ?? "-" }}</td>
                <td>{{ user.absences ?? "-" }}</td>
                <td>{{ user.attendance ?? "-" }}</td>
            </tr>
        </tbody>
    </table>
</template>