import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useUserById = () => {
    const authStore = useAuthStore();
    const userById = ref(null);

    const fetchUserById = async (id) => {
        if (!authStore.token) return;

        userById.value = null;

        const request = await fetch(`http://localhost:3000/users/${id}`, {
            headers: {
                "Authorization": `Bearer ${authStore.token}`
            }
        })

        const data = await request.json();

        userById.value = data;
    }
    return { userById, fetchUserById }
}
