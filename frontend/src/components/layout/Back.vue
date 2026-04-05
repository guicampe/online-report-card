<script setup></script>

<template>
    <div class="flex flex-row p-2">
        <button 
            @click="$router.back()"
            class="flex align-center justify-center bg-indigo-500 text-gray-200 p-2 rounded-md cursor-pointer hover:bg-indigo-400 duration-300 ease-in-out shadow-md"> 
            <span class="material-icons">arrow_back</span>
        </button>
    </div>
</template>