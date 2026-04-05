<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    label: String,
    path: String,
})

const goTo = () => {
    router.push(props.path);
}
</script>

<template>
    <div @click="goTo()"
        class="bg-blue-500 w-1/4 h-24 flex justify-center items-center rounded-md shadow-sm text-gray-300 font-bold text-3xl cursor-pointer duration-250 ease hover:bg-blue-400 hover:scale-[1.1]">
        <p>{{ label }}</p>
    </div>
</template>