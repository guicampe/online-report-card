import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export const useLogin = () => {
    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref("");
    const password = ref("");
    const emailError = ref("");
    const passwordError = ref("");
    const credentialsError = ref("");
    const isLoading = ref(false);

    const handleSubmit = async () => {
        authStore.logout();
        emailError.value = "";
        passwordError.value = "";
        credentialsError.value = "";

        if (!email.value) {
            emailError.value = "E-mail obrigatório";
            return;
        }

        if (!password.value) {
            passwordError.value = "Senha obrigatória";
            return;
        }

        try {
            isLoading.value = true;

            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                credentialsError.value = data.message;
                return;
            }

            authStore.setToken(data.token);

            if (authStore.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/user");
            }
        } catch (error) {
            credentialsError.value = "Não foi possível conectar ao servidor. Tente novamente";
        } finally {
            isLoading.value = false;
        }
    };

    return {
        email,
        password,
        emailError,
        passwordError,
        credentialsError,
        isLoading,
        handleSubmit,
    };
}