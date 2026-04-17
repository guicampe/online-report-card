import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useAvailableUsers = () => {
    const authStore = useAuthStore();
    const users = ref([]);

    const fetchAvailableUsers = async (subjectId) => {
        if (!authStore.token) return;

        const request = await fetch(`http://localhost:3000/admin/subjects/${subjectId}/available-users`, {
            headers: { "Authorization": `Bearer ${authStore.token}` }
        });

        users.value = await request.json();
    }

    return { users, fetchAvailableUsers }
}