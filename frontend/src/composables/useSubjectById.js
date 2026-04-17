import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useSubjectById = () => {
    const authStore = useAuthStore();
    const subject = ref(null);

    const fetchSubjectById = async (id) => {
        if (!authStore.token) return;

        const request = await fetch(`http://localhost:3000/admin/subjects/${id}`, {
            headers: { "Authorization": `Bearer ${authStore.token}` }
        });

        subject.value = await request.json();
    }

    return { subject, fetchSubjectById };
}