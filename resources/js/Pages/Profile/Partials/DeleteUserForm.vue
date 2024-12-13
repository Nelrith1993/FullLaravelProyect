<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionSection from '@/Components/varios/ActionSection.vue';
import DangerButton from '@/Components/varios/DangerButton.vue';
import DialogModal from '@/Components/varios/DialogModal.vue';
import InputError from '@/Components/varios/InputError.vue';
import SecondaryButton from '@/Components/varios/SecondaryButton.vue';
import TextInput from '@/Components/varios/TextInput.vue';

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;

    setTimeout(() => passwordInput.value.focus(), 250);
};

const deleteUser = () => {
    form.delete(route('current-user.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;

    form.reset();
};
</script>

<template>
    <ActionSection>
        <template #title>
            <div class='text-neutral-200'>
                Borrar cuenta
            </div>
        </template>

        <template #description>
            <div class='text-neutral-400'>
                Elimina permanentemente tu cuenta.
            </div>
        </template>

        <template #content>
            <div class="max-w-xl text-sm text-neutral-400">
                Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán permanentemente. Antes de
                eliminar su cuenta, descargue cualquier dato o información que desee conservar.
            </div>

            <div class="mt-5">
                <DangerButton @click="confirmUserDeletion">
                    Borrar cuenta
                </DangerButton>
            </div>

            <!-- Delete Account Confirmation Modal -->
            <DialogModal :show="confirmingUserDeletion" @close="closeModal">
                <template #title>
                    Borrar cuenta
                </template>

                <template #content>
                    ¿Estás seguro de que quieres eliminar tu cuenta? Una vez que se elimine su cuenta, todos sus
                    recursos y datos se eliminarán permanentemente. Ingrese su contraseña para confirmar que desea
                    eliminar permanentemente su cuenta.

                    <div class="mt-4">
                        <TextInput ref="passwordInput" v-model="form.password" type="password" class="block w-3/4 mt-1"
                            placeholder="Password" autocomplete="current-password" @keyup.enter="deleteUser" />

                        <InputError :message="form.errors.password" class="mt-2" />
                    </div>
                </template>

                <template #footer>
                    <SecondaryButton @click="closeModal">
                        Cancelar
                    </SecondaryButton>

                    <DangerButton class="ms-3" :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
                        @click="deleteUser">
                        Borrar cuenta
                    </DangerButton>
                </template>
            </DialogModal>
        </template>
    </ActionSection>
</template>
