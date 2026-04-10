import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useGrades = () => {
    const authStore = useAuthStore();
    const grades = ref(null);

    const fetchGrades = async () => {
        if (!authStore.token) return;

        grades.value = null;

        const request = await fetch("http://localhost:3000/users/grades/", {
            headers: {
                "Authorization": `Bearer ${authStore.token}`
            }
        })

        const data = await request.json();
        grades.value = data;
    }

    return { grades, fetchGrades }
}