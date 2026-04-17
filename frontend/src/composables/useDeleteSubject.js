import { useAuthStore } from "@/stores/auth"

export const useDeleteSubject = () => {
    const authStore = useAuthStore();

    const fetchDeleteSubject = async (id) => {
        if (!authStore.token) return;

        const request = await fetch(`http://localhost:3000/admin/subjects/${id}`, {
            method: "DELETE",
                headers: { "Authorization": `Bearer ${authStore.token}` }
        })

        if (!request.ok) {
            throw new Error("Erro ao deletar");
        }

        if (request.status === 204) {
            return null;
        }

        return await request.json();
    }

    return { fetchDeleteSubject }
}