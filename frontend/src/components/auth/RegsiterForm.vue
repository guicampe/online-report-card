<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(["goToLogin"]);
const authStore = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");
const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const credentialsError = ref("");
const isLoading = ref(false);
const registered = ref(false);

const handleRegister = async () => {
    nameError.value = "";
    emailError.value = "";
    passwordError.value = "";
    credentialsError.value = "";

    if (!name.value) {
        nameError.value = "Nome obrigatório";
        return;
    }

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
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            })
        })

        const data = await response.json();
        console.log(data)
        console.log(response.ok)

        if (!response.ok) {
            credentialsError.value = data.message;
            return;
        }

        authStore.setToken(data.token);
        isLoading.value = false;
        registered.value = true;
        if (authStore.role === "admin") {
            router.push("/admin");
        } else {
            router.push("/user");
        }
    } catch (error) {
        credentialsError.value = "Não foi possível conectar ao servidor. Tente novamente."
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleRegister" class="w-full">
        <h1 class="text-2xl font-bold mb-3">Preencha seus dados</h1>
        <input v-model="name" type="text" placeholder="Nome"
            class="border border-gray-300 rounded-md p-2 w-full outline-none focus:border-indigo-500">
        <span v-if="nameError" class="text-red-500 text-xs mt-1 block">{{ nameError }}</span>
        <input v-model="email" type="email" placeholder="E-mail"
            class="border border-gray-300 rounded-md p-2 w-full outline-none focus:border-indigo-500 mt-3" />
        <span v-if="emailError" class="text-red-500 text-xs mt-1 block">{{ emailError }}</span>
        <input v-model="password" type="password" placeholder="Senha"
            class="border border-gray-300 rounded-md p-2 w-full outline-none focus:border-indigo-500 mt-3" />
        <span v-if="passwordError" class="text-red-500 text-xs mt-1 block">{{ passwordError }}</span>
        <button type="submit"
            class="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium p-2 rounded-md transition-colors cursor-pointer">
            Cadastrar
        </button>
        <span v-if="credentialsError" class="text-red-500 text-xs mt-2 block">{{ credentialsError }}</span>
        <p class="text-center text-sm mt-1">
            Já tem conta?
            <span @click="emit('goToLogin')" class="text-indigo-600 cursor-pointer hover:underline">Entrar</span>
        </p>
        <div v-if="isLoading" class="mt-2 text-center">
            <span class="loader align-middle mr-2"></span>
            <span class="text-sm">Aguarde...</span>
        </div>
        <div v-if="registered" class="text-center mt-2 text-green-500 font-bold">
            <span>√ Usuário registrado com sucesso! Redirecionando...</span>
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