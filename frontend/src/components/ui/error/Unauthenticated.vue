<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <h1 class="text-4xl font-bold">Ops, parece que você não fez login!</h1>
        <p 
        @click="$router.push('/')"
        class="mt-5 text-xl text-indigo-500 cursor-pointer ease hover:underline">Retorne à página inicial</p>
    </div>
</template>