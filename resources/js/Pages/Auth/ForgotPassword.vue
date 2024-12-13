<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/varios/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/varios/AuthenticationCardLogo.vue';
import InputError from '@/Components/varios/InputError.vue';
import InputLabel from '@/Components/varios/InputLabel.vue';
import PrimaryButton from '@/Components/varios/PrimaryButton.vue';
import TextInput from '@/Components/varios/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <AppLayout>
        <Head title="Contraseña Olvidadada" />
        <AuthenticationCard>
            <div class="mb-8 text-sm text-white ms-2 me-2">
                ¿Olvidaste tu contraseña? No hay problema. Simplemente dejanos saber tu correo electronico y enviaremos
                un
                restablecimiento de contraseña para que selecciones una nueva.
            </div>

            <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
                {{ status }}
            </div>

            <form @submit.prevent="submit" class="w-full">
                <div>
                    <InputLabel for="email" value="Email" class="text-white ms-2"/>
                    <TextInput id="email" v-model="form.email" type="email" class="block w-full mt-1" required autofocus
                        autocomplete="username" />
                    <InputError class="mt-2" :message="form.errors.email" />
                </div>

                <div class="flex items-center justify-center mt-8">
                    <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Reiniciar contraseña
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticationCard>
    </AppLayout>
</template>