<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <h1 class="text-4xl font-bold">Ops, parece que você não tem acesso aqui!</h1>
        <p 
        @click="$router.push('/user')"
        class="mt-5 text-xl text-indigo-500 cursor-pointer ease hover:underline">Voltar</p>
    </div>
</template>