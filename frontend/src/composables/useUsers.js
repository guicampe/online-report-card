import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useUsers = () => {
    const authStore = useAuthStore();
    const users = ref([]);

    const fetchUsers = async () => {
        if (!authStore.token) return;

        const request = await fetch("http://localhost:3000/admin/users/", {
            headers: {
                "Authorization": `Bearer ${authStore.token}`
            }
        })

        const response = await request.json();
        users.value = response;
    }

    return { users, fetchUsers }
}