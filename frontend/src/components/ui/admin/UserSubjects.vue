<script setup>
import AddSubjectToUser from '@/components/admin/AddSubjectToUser.vue';

defineProps({
    subjects: {
        type: Array,
        required: true,
    }
})

defineEmits(["created"]);
</script>

<template>
    <div class="p-10">
        <h1 class="text-gray-800 text-4xl font-bold mb-10 text-shadow-md">Boletim</h1>
        <div class="flex flex-col gap-1 border-2 border-indigo-400 p-2 bg-gray-200 rounded-md shadow-md">
            <table v-if="subjects?.length > 0" class="shadow-md">
                <thead class="bg-indigo-400 h-12 text-gray-200 text-lg">
                    <tr>
                        <th>Matéria</th>
                        <th>Nota 01</th>
                        <th>Nota 02</th>
                        <th>Faltas</th>
                        <th>Presença</th>
                        <th>Média</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="subject in subjects" :key="subject.subject_id"
                        class="text-center text-gray-800 
                        h-10 odd:bg-white even:bg-gray-100">
                        <td class="text-left p-2">
                            {{ subject.subject_name }}
                        </td>
                        <td>{{ subject.grade1 }}</td>
                        <td>{{ subject.grade2 }}</td>
                        <td>{{ subject.absences }}</td>
                        <td class="font-bold">{{ subject.attendance != null ? subject.attendance + "%" : "-" }}</td>
                        <td class="font-bold">{{ subject.average }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-else class="text-gray-800 font-bold text-2xl">Ainda não há matérias cadastradas</p>
            <AddSubjectToUser @created="$emit('created')" class="mt-2" />
        </div>
    </div>
</template>