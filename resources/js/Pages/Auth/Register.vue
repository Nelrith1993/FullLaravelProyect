<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import Checkbox from '@/Components/varios/Checkbox.vue';
import InputError from '@/Components/varios/InputError.vue';
import InputLabel from '@/Components/varios/InputLabel.vue';
import PrimaryButton from '@/Components/varios/PrimaryButton.vue';
import TextInput from '@/Components/varios/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import AuthenticationCard from '@/Components/varios/AuthenticationCard.vue';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <AppLayout>

        <Head title="Registro" />
        <AuthenticationCard>
            <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
                {{ status }}
            </div>
            <div class="w-full">
                <h1 class="mb-4 text-2xl font-semibold text-center text-gray-50">REGISTRARSE</h1>
                <hr class="mb-6" />
            </div>
            <form @submit.prevent="submit" class="w-full">
                <div class="w-full mt-6">
                    <InputLabel for="name" value="Name" class="text-white ms-2" />
                    <TextInput id="name" v-model="form.name" type="text" class="block w-full mt-1" required autofocus
                        autocomplete="name" />
                    <InputError class="mt-2" :message="form.errors.name" />
                </div>

                <div class="mt-4">
                    <InputLabel for="email" value="Email" class="text-white ms-2" />
                    <TextInput id="email" v-model="form.email" type="email" class="block w-full mt-1" required
                        autocomplete="username" />
                    <InputError class="mt-2" :message="form.errors.email" />
                </div>

                <div class="mt-4">
                    <InputLabel for="password" value="Password" class="text-white ms-2" />
                    <TextInput id="password" v-model="form.password" type="password" class="block w-full mt-1" required
                        autocomplete="new-password" />
                    <InputError class="mt-2" :message="form.errors.password" />
                </div>

                <div class="mt-4">
                    <InputLabel for="password_confirmation" value="Confirm Password" class="text-white ms-2" />
                    <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password"
                        class="block w-full mt-1" required autocomplete="new-password" />
                    <InputError class="mt-2" :message="form.errors.password_confirmation" />
                </div>

                <div v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature" class="mt-4">
                    <InputLabel for="terms">
                        <div class="flex items-center">
                            <Checkbox id="terms" v-model:checked="form.terms" name="terms" required />
                            <div class="ms-2">
                                Acepto
                                <a target="_blank" :href="route('terms.show')"
                                    class="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    los términos y condiciones
                                </a> y
                                <a target="_blank" :href="route('policy.show')"
                                    class="text-sm underline rounded-md text-white-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    la política de privacidad.
                                </a>
                            </div>
                        </div>
                    </InputLabel>
                    <InputError class="mt-2" :message="form.errors.terms" />
                </div>

                <div class="mt-4 ms-2">
                    <Link :href="route('login')"
                        class="text-sm text-gray-100 underline rounded-md hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    ¿Ya estás registrado?
                    </Link>
                </div>
                <div class="mt-10 text-center">
                    <PrimaryButton class="w-full mb-4" :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing">
                        Registrarse
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticationCard>
    </AppLayout>
</template>
