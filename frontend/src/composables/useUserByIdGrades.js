import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useUserByIdGrades = () => {
    const authStore = useAuthStore();
    const grades = ref([]);

    const fetchGradesById = async (id) => {
        if (!authStore.token) return;

        const request = await fetch(`http://localhost:3000/admin/grades/${id}`, {
            headers: {
                "Authorization": `Bearer ${authStore.token}`
            }
        })

        const data = await request.json();
        grades.value = Array.isArray(data) ? data : [];
    }

    return { grades, fetchGradesById }
}