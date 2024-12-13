<script setup>
import { Link, router } from '@inertiajs/vue3';  // Usamos Inertia.js para la navegación
import Dropdown from '@/Components/varios/Dropdown.vue';
import DropdownLink from '@/Components/varios/DropdownLink.vue';
import { ref, computed, onMounted } from 'vue';
import { useMainStore } from '@/store/'; // Importamos el store de Pinia

// Usamos el store de Pinia
const store = useMainStore();

// Accedemos a las categorías, subcategorías, versiones de juegos y auras desde el store de Pinia
const categories = computed(() => store.categories);
const gameVersions = computed(() => store.gameVersions);

// Función de logout
const logout = () => {
    router.post(route('logout'));  // Usamos Inertia.js para logout
};

// Redirigir al index
const index = () => {
    router.visit(route('index'));  // Usamos Inertia.js para la redirección al índice
};

// Definir la versión seleccionada
const selectedVersion = ref(null);

// Filtrar categorías según la versión seleccionada
const filteredCategories = computed(() => {
    if (!selectedVersion.value) {
        return categories.value;
    }

    return categories.value.filter(category =>
        category.game_versions.some(version => version.id === selectedVersion.value.id)
    );
});

// Función para navegar a la subcategoría usando Inertia.js
const navigateToSubcategory = (subcategoryId) => {
    router.visit(route('subcategory.index', { id: subcategoryId }));  // Usamos Inertia.js para navegar
};

</script>

<template>
    <div data-theme="mytheme" class="justify-between navbar bg-base-100">
        <div>
            <div class="drawer w-fit" tabindex="0">
                <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content">
                    <label htmlFor="my-drawer" class="btn btn-ghost btn-circle drawer-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </label>
                </div>
                <div class="drawer-side top-16 z-[9999]">
                    <label htmlFor="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul
                        class="min-h-screen p-4 overflow-y-scroll menu bg-base-100 2xl:bg-base-100/70 text-base-content w-80">
                        <li class="menu">
                            <ul>
                                <!-- Iteramos sobre las versiones y categorías -->
                                <li v-for="version in gameVersions" :key="version.id">
                                    <details open>
                                        <hr class="mb-2">
                                        <summary class="text-lg font-semibold">{{ version.name }}</summary>
                                        <ul>
                                            <li v-for="category in filteredCategories" :key="category.id">
                                                <details>
                                                    <summary
                                                        class="text-base font-semibold underline underline-offset-4">{{
                                                            category.name }}</summary>
                                                    <ul>
                                                        <!-- Iteramos sobre las subcategorías de cada categoría -->
                                                        <li v-for="subcategory in category.subcategories"
                                                            :key="subcategory.id">
                                                            <a :style="{ color: subcategory.color }"
                                                                @click.prevent="navigateToSubcategory(subcategory.id)">
                                                                {{ subcategory.name }}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </details>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex">
                <a class="text-xl btn btn-ghost" @click.prevent="index">AuraMods</a>
            </div>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <!-- Aquí va tu lógica para el menú de usuario -->
                <div v-if="$page.props.auth && $page.props.auth.user">
                    <div class="relative ms-3">
                        <Dropdown align="right" width="48">
                            <template #trigger>
                                <button v-if="$page.props.jetstream.managesProfilePhotos"
                                    class="flex text-sm transition border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300">
                                    <img class="object-cover rounded-full size-8"
                                        :src="$page.props.auth.user.profile_photo_url"
                                        :alt="$page.props.auth.user.name">
                                </button>
                                <span v-else class="inline-flex rounded-md">
                                    <button type="button"
                                        class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out bg-transparent border border-transparent rounded-md text-neutral-200 hover:text-neutral-500 focus:outline-none ">
                                        {{ $page.props.auth.user.name }}
                                        <svg class="ms-2 -me-0.5 size-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                </span>
                            </template>
                            <template #content>
                                <div class="block px-4 py-2 text-xs text-gray-400">
                                    Administrar cuenta
                                </div>
                                <DropdownLink :href="route('profile.show')">Perfiles</DropdownLink>
                                <DropdownLink v-if="$page.props.jetstream.hasApiFeatures"
                                    :href="route('api-tokens.index')">API Tokens</DropdownLink>
                                <div class="border-t border-gray-200" />
                                <form @submit.prevent="logout">
                                    <DropdownLink as="button">Salir</DropdownLink>
                                </form>
                            </template>
                        </Dropdown>
                    </div>
                </div>
                <div v-else>
                    <Link :href="route('login')"
                        class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                    Entrar</Link>
                    <Link :href="route('register')"
                        class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                    Registrarse</Link>
                </div>
            </div>
        </div>
    </div>
</template>
