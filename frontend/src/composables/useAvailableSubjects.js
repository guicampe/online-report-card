import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useAvailableSubjects = () => {
    const authStore = useAuthStore();
    const subjects = ref([]);

    const fetchAvailableSubjects = async (userId) => {
        if (!authStore.token) return;

        const request = await fetch(`http://localhost:3000/admin/users/${userId}/available-subjects`, {
            headers: { "Authorization": `Bearer ${authStore.token}` }
        });

        subjects.value = await request.json();
    }

    return { subjects, fetchAvailableSubjects }
}