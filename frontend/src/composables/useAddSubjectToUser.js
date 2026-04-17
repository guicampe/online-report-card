import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useAddSubjectToUser = () => {
    const authStore = useAuthStore();
    const subjectId = ref("");
    const loading = ref(false);
    const error = ref(null);

    const fetchAddSubjectToUser = async (userId) => {
        if (!authStore.token) return;

        loading.value = true;
        error.value = null;

        try {
            const request = await fetch(`http://localhost:3000/admin/users/${userId}/grades`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${authStore.token}`
                },
                body: JSON.stringify({ subjectId: subjectId.value })
            });

            const response = await request.json();

            if (!request.ok) {
                error.value = response.message || "Deu ruim";
                return null;
            }

            return response;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return { subjectId, loading, error, fetchAddSubjectToUser };
}