<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/varios/ActionMessage.vue';
import FormSection from '@/Components/varios/FormSection.vue';
import InputError from '@/Components/varios/InputError.vue';
import InputLabel from '@/Components/varios/InputLabel.vue';
import PrimaryButton from '@/Components/varios/PrimaryButton.vue';
import TextInput from '@/Components/varios/TextInput.vue';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('user-password.update'), {
        errorBag: 'updatePassword',
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value.focus();
            }

            if (form.errors.current_password) {
                form.reset('current_password');
                currentPasswordInput.value.focus();
            }
        },
    });
};
</script>

<template>
    <FormSection @submitted="updatePassword">
        <template #title>
            <div class="underline text-neutral-200 underline-offset-2">
                Actualizar contraseña
            </div>
        </template>

        <template #description>
            <div class="text-neutral-400">
                Asegurate de que tu cuenta esté usando una contraseña, larga y aleatoria para estar segura.
            </div>
        </template>

        <template #form>
            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="current_password" value="Current Password" class="text-white ms-2" />
                <TextInput id="current_password" ref="currentPasswordInput" v-model="form.current_password"
                    type="password" class="block w-full mt-1" autocomplete="current-password" />
                <InputError :message="form.errors.current_password" class="mt-2" />
            </div>

            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="password" value="New Password" class="text-white ms-2" />
                <TextInput id="password" ref="passwordInput" v-model="form.password" type="password"
                    class="block w-full mt-1" autocomplete="new-password" />
                <InputError :message="form.errors.password" class="mt-2" />
            </div>

            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="password_confirmation" value="Confirm Password" class="text-white ms-2" />
                <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password"
                    class="block w-full mt-1" autocomplete="new-password" />
                <InputError :message="form.errors.password_confirmation" class="mt-2" />
            </div>
        </template>

        <template #actions>
            <ActionMessage :on="form.recentlySuccessful" class="me-3">
                Guardado.
            </ActionMessage>

            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Guardar
            </PrimaryButton>
        </template>
    </FormSection>
</template>
