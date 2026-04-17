import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useAddStudent = () => {
    const authStore = useAuthStore();
    const userId = ref("");
    const loading = ref(false);
    const error = ref(null);

    const fetchAddStudent = async (subjectId) => {
        if (!authStore.token) return;
        loading.value = true;
        error.value = null;

        try {
            const request = await fetch(`http://localhost:3000/admin/subjects/${subjectId}/grades`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${authStore.token}`
                },
                body: JSON.stringify({ userId: userId.value })
            });

            const response = await request.json();

            return response;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return { userId, loading, error, fetchAddStudent };
}