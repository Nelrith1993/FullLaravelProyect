<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/varios/AuthenticationCard.vue';
import Checkbox from '@/Components/varios/Checkbox.vue';
import InputError from '@/Components/varios/InputError.vue';
import InputLabel from '@/Components/varios/InputLabel.vue';
import PrimaryButton from '@/Components/varios/PrimaryButton.vue';
import TextInput from '@/Components/varios/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <AppLayout>
        <Head title="Entrar" />
        <AuthenticationCard>
            <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
                {{ status }}
            </div>
            <div class="w-full">
                <h1 class="mb-4 text-2xl font-semibold text-center text-gray-50">ENTRAR</h1>
                <hr class="mb-6">
            </div>
            <form @submit.prevent="submit" class="w-full">
                <div>
                    <InputLabel for="email" value="Email" class="text-white ms-2" />
                    <TextInput id="email" v-model="form.email" type="email" class="block w-full mt-1" required autofocus
                        autocomplete="username" />
                    <InputError class="mt-2" :message="form.errors.email" />
                </div>

                <div class="mt-6">
                    <InputLabel for="password" value="Password" class="text-white ms-2" />
                    <TextInput id="password" v-model="form.password" type="password" class="block w-full mt-1" required
                        autocomplete="current-password" />
                    <InputError class="mt-2" :message="form.errors.password" />
                </div>

                <div class="flex justify-between mt-4 ms-2 me-2">
                    <label class="flex items-center">
                        <Checkbox v-model:checked="form.remember" name="remember" />
                        <span class="text-sm text-gray-100 ms-2">Recuerdame</span>
                    </label>
                    <Link v-if="canResetPassword" :href="route('password.request')"
                        class="text-sm text-gray-100 underline rounded-md hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    ¿Olvidaste tu contraseña?
                    </Link>
                </div>
                <div class="mt-10 text-center">
                    <PrimaryButton class="w-full mb-4" :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing">
                        Entrar
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticationCard>
    </AppLayout>
</template>