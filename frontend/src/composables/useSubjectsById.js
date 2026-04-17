import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

export const useSubjectsById = () => {
    const authStore = useAuthStore();
    const subjects = ref([]);

    const fetchSubjectsById = async (id) => {
        if (!authStore.token) return;

        const request = await fetch(`http://localhost:3000/admin/subjects/${id}/grades`, {
            headers: {
                "Authorization": `Bearer ${authStore.token}`
            }
        });

        if (request.status === 404) {
            router.push("/not-found");
            return;
        }

        const data = await request.json();
        subjects.value = Array.isArray(data) ? data : [];
    }

    return { subjects, fetchSubjectsById }
}