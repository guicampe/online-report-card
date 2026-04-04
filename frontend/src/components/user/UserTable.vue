<script setup>
defineProps({
    grades: {
        type: Array,
        default: () => []
    }
})
</script>

<template>
    <table v-if="grades?.length !== 0"
    class="bg-white p-6 mb-4 mt-4 w-9/10 mx-auto shadow-md">
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
            <tr 
                v-for="grade in grades"
                :key="grade.subject_id"
                class="text-center text-gray-800 h-10 odd:bg-white even:bg-gray-100"
            >
                <td>{{ grade.subject_name }}</td>
                <td>{{ grade.grade1 }}</td>
                <td>{{ grade.grade2 }}</td>
                <td>{{ grade.absences }}</td>
                <td class="font-bold">{{ grade.attendance != null ? grade.attendance + "%" : "-" }}</td>
                <td class="font-bold">{{ grade.average }}</td>
            </tr>
        </tbody>
    </table>
    <p v-else class="text-center text-2xl text-gray-700">Nenhum dado cadastrado</p>
</template>