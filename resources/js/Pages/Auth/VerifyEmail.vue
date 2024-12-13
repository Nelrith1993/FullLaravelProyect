<script setup>
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/varios/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/varios/AuthenticationCardLogo.vue';
import PrimaryButton from '@/Components/varios/PrimaryButton.vue';

const props = defineProps({
    status: String,
});

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <Head title="Email Verification" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div class="mb-4 text-sm text-gray-600">
            Antes de continuar, ¿podria verificar el correo electronico haciendo "Click" en el enlace que le hemos enviado?. Si no ha recivido el email, le enviaremos otro.
        </div>

        <div v-if="verificationLinkSent" class="mb-4 text-sm font-medium text-green-600">
            Un nuevo enlace de verificación ha sido enviado al correo electronico que se muestra en tus ajustes de perfil.
        </div>

        <form @submit.prevent="submit">
            <div class="flex items-center justify-between mt-4">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Reenviar el enlace de verificación.
                </PrimaryButton>

                <div>
                    <Link
                        :href="route('profile.show')"
                        class="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Editar Perfil</Link>

                    <Link
                        :href="route('logout')"
                        method="post"
                        as="button"
                        class="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ms-2"
                    >
                        Salir
                    </Link>
                </div>
            </div>
        </form>
    </AuthenticationCard>
</template>
