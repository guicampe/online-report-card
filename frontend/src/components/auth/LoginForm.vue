<script setup>
import { ref } from 'vue';
import { useAuthStore } from "../../stores/auth";
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(["goToRegister"]);
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");
const credentialsError = ref("");
const isLoading = ref(false);

const handleSubmit = async () => {
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
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })

        const data = await response.json();

        if (!response.ok) {
            credentialsError.value = data.message;
            return;
        }

        authStore.setToken(data.token);
        router.push("/user");
    } catch (error) {
        credentialsError.value = "Não foi possível conectar ao servidor. Tente novamente"
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="w-full">
        <h1 class="text-2xl font-bold mb-3">Entrar no sistema</h1>
        <input v-model="email" type="email" placeholder="E-mail"
            class="border border-gray-300 rounded-md p-2 w-full outline-none focus:border-indigo-500" />
        <span v-if="emailError" class="text-red-500 text-xs mt-1 block">{{ emailError }}</span>
        <input v-model="password" type="password" placeholder="Senha"
            class="border border-gray-300 rounded-md p-2 w-full outline-none focus:border-indigo-500 mt-3" />
        <span v-if="passwordError" class="text-red-500 text-xs mt-1 block">{{ passwordError }}</span>
        <button type="submit"
            class="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium p-2 rounded-md transition-colors cursor-pointer">
            Entrar
        </button>
        <span v-if="credentialsError" class="text-red-500 text-xs mt-2 block">{{ credentialsError }}</span>    
        <p class="w-full text-center text-sm mt-1">
            Não tem conta?
            <span @click="emit('goToRegister')" class="text-indigo-600 cursor-pointer hover:underline">Cadastrar</span>
        </p>
        <div v-if="isLoading" class="mt-2 text-center">
            <span class="loader align-middle mr-2"></span>
            <span class="text-sm">Aguarde...</span>
        </div>
    </form>
</template>

<style scoped>
.loader {
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-color: #6366F1 transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1.5s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>