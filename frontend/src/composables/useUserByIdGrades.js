import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useUserByIdGrades = () => {
    const authStore = useAuthStore();
    const subjects = ref([]);

    const fetchSubjectsById = async (id) => {
        if (!authStore.token) return;

        subjects.value = null;

        const request = await fetch(`http://localhost:3000/grades/${id}`, {
            headers: {
                "Authorization": `Bearer ${authStore.token}`
            }
        })

        const data = await request.json();
        subjects.value = data;
    }

    return { subjects, fetchSubjectsById }
}