<script setup>
import { Head } from '@inertiajs/vue3';
import NavBar from '@/Components/NavBar.vue';

defineProps({
    title: {
        type: String,
        default: '',
    },
});

</script>

<template>

    <Head :title="title" />
    <div class="min-h-screen w-full bg-gradient-to-tl from-[#030637] via-[#3c0753] to-[#720455] text-white/10">
        <header>
            <NavBar/>
        </header>

        <main class="mt-6">
            <slot />
        </main>
    </div>
</template>
