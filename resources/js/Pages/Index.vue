<script setup>
import { defineProps, onMounted } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { useMainStore } from '@/store/';  // Asegúrate de que la ruta sea correcta

// Recibe los props
const props = defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    categories: {
        type: Array,
        required: true,
    },
    gameVersions: {
        type: Array,
        required: true,
    },
    subcategories: {
        type: Array,
        required: true,
    },
    auras: {
        type: Array,
        required: true,
    },
});

// Usamos el store de Pinia
const store = useMainStore();

// Guarda los props en el store cuando el componente se monta
onMounted(() => {
    // Asegúrate de que los props tienen los datos
    if (props.categories && props.subcategories && props.auras && props.gameVersions) {
        store.setCategories(props.categories);
        store.setSubcategories(props.subcategories);
        store.setAuras(props.auras);
        store.setGameVersions(props.gameVersions);
    } else {
        console.error('Datos faltantes en los props.');
    }
});
</script>

<template>
    <div class="w-full">
        <AppLayout>
            <Head title="Inicio" />
        </AppLayout>
    </div>
</template>
