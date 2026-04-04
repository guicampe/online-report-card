import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useSubjects = () => {
    const authStore = useAuthStore();
    const subjects = ref([]);

    const fetchSubjects = async () => {
        if (!authStore.token) return;

        const request = await fetch("http://localhost:3000/subjects/", {
            headers: {
                "Authorization": `Bearer ${authStore.token}`
            }
        })

        const response = await request.json();
        subjects.value = response;
    }

    return { subjects, fetchSubjects }
}