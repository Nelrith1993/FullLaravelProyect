<script setup>
import { ref, computed, watch } from 'vue';
import { router, useForm, usePage } from '@inertiajs/vue3';
import ActionSection from '@/Components/varios/ActionSection.vue';
import ConfirmsPassword from '@/Components/varios/ConfirmsPassword.vue';
import DangerButton from '@/Components/varios/DangerButton.vue';
import InputError from '@/Components/varios/InputError.vue';
import InputLabel from '@/Components/varios/InputLabel.vue';
import PrimaryButton from '@/Components/varios/PrimaryButton.vue';
import SecondaryButton from '@/Components/varios/SecondaryButton.vue';
import TextInput from '@/Components/varios/TextInput.vue';

const props = defineProps({
    requiresConfirmation: Boolean,
});

const page = usePage();
const enabling = ref(false);
const confirming = ref(false);
const disabling = ref(false);
const qrCode = ref(null);
const setupKey = ref(null);
const recoveryCodes = ref([]);

const confirmationForm = useForm({
    code: '',
});

const twoFactorEnabled = computed(
    () => !enabling.value && page.props.auth.user?.two_factor_enabled,
);

watch(twoFactorEnabled, () => {
    if (!twoFactorEnabled.value) {
        confirmationForm.reset();
        confirmationForm.clearErrors();
    }
});

const enableTwoFactorAuthentication = () => {
    enabling.value = true;

    router.post(route('two-factor.enable'), {}, {
        preserveScroll: true,
        onSuccess: () => Promise.all([
            showQrCode(),
            showSetupKey(),
            showRecoveryCodes(),
        ]),
        onFinish: () => {
            enabling.value = false;
            confirming.value = props.requiresConfirmation;
        },
    });
};

const showQrCode = () => {
    return axios.get(route('two-factor.qr-code')).then(response => {
        qrCode.value = response.data.svg;
    });
};

const showSetupKey = () => {
    return axios.get(route('two-factor.secret-key')).then(response => {
        setupKey.value = response.data.secretKey;
    });
}

const showRecoveryCodes = () => {
    return axios.get(route('two-factor.recovery-codes')).then(response => {
        recoveryCodes.value = response.data;
    });
};

const confirmTwoFactorAuthentication = () => {
    confirmationForm.post(route('two-factor.confirm'), {
        errorBag: "confirmTwoFactorAuthentication",
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            confirming.value = false;
            qrCode.value = null;
            setupKey.value = null;
        },
    });
};

const regenerateRecoveryCodes = () => {
    axios
        .post(route('two-factor.recovery-codes'))
        .then(() => showRecoveryCodes());
};

const disableTwoFactorAuthentication = () => {
    disabling.value = true;

    router.delete(route('two-factor.disable'), {
        preserveScroll: true,
        onSuccess: () => {
            disabling.value = false;
            confirming.value = false;
        },
    });
};
</script>

<template>
    <ActionSection>
        <template #title>
            <div class="underline text-neutral-200 underline-offset-2">
                Autenticación en dos pasos
            </div>
        </template>

        <template #description>
            <div class="text-neutral-400">
                Añade a tu cuenta una capa de seguridad extra usando la autenticación en dos pasos.
            </div>
        </template>

        <template #content>
            <h3 v-if="twoFactorEnabled && !confirming" class="text-lg font-medium text-neutral-400">
                Tienes la autenticación en dos pasos activada.
            </h3>

            <h3 v-else-if="twoFactorEnabled && confirming" class="text-lg font-medium text-neutral-400">
                Termina habilitando la autenticación en dos pasos
            </h3>

            <h3 v-else class="text-lg font-medium text-neutral-200">
                No tienes habilitada la autenticación en dos pasos.
            </h3>

            <div class="max-w-xl mt-3 text-sm text-neutral-400">
                <p>
                    Cuando la autenticación en dos pasos está activada, se le solicitará un token aleatorio seguro
                    durante la autenticación. Puede recuperar este token desde la aplicacion Google Authentificatos de
                    su teléfono.
                </p>
            </div>

            <div v-if="twoFactorEnabled">
                <div v-if="qrCode">
                    <div class="max-w-xl mt-4 text-sm text-neutral-400">
                        <p v-if="confirming" class="font-semibold">
                            Para terminar de habilitar la autenticación de dos factores, escanee el siguiente código QR
                            usando el teléfono
                            aplicación de autenticación o ingrese la clave de configuración y proporcione el código OTP
                            generado.
                        </p>

                        <p v-else>

                            La autenticación de dos factores ahora está habilitada. Escanea el siguiente código QR
                            usando tu teléfono
                            aplicación de autenticación o ingrese la clave de configuración.
                        </p>
                    </div>

                    <div class="inline-block p-2 mt-4 bg-white" v-html="qrCode" />

                    <div v-if="setupKey" class="max-w-xl mt-4 text-sm text-gray-600">
                        <p class="font-semibold">
                            Setup Key: <span v-html="setupKey"></span>
                        </p>
                    </div>

                    <div v-if="confirming" class="mt-4">
                        <InputLabel for="code" value="Code" />

                        <TextInput id="code" v-model="confirmationForm.code" type="text" name="code"
                            class="block w-1/2 mt-1" inputmode="numeric" autofocus autocomplete="one-time-code"
                            @keyup.enter="confirmTwoFactorAuthentication" />

                        <InputError :message="confirmationForm.errors.code" class="mt-2" />
                    </div>
                </div>

                <div v-if="recoveryCodes.length > 0 && !confirming">
                    <div class="max-w-xl mt-4 text-sm text-neutral-400">
                        <p class="font-semibold">
                            Store these recovery codes in a secure password manager. They can be used to recover access
                            to your account if your two factor authentication device is lost.
                        </p>
                    </div>

                    <div class="grid max-w-xl gap-1 px-4 py-4 mt-4 font-mono text-sm bg-gray-100 rounded-lg">
                        <div v-for="code in recoveryCodes" :key="code">
                            {{ code }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-5">
                <div v-if="!twoFactorEnabled">
                    <ConfirmsPassword @confirmed="enableTwoFactorAuthentication">
                        <PrimaryButton type="button" :class="{ 'opacity-25': enabling }" :disabled="enabling">
                            Activar
                        </PrimaryButton>
                    </ConfirmsPassword>
                </div>

                <div v-else>
                    <ConfirmsPassword @confirmed="confirmTwoFactorAuthentication">
                        <PrimaryButton v-if="confirming" type="button" class="me-3" :class="{ 'opacity-25': enabling }"
                            :disabled="enabling">
                            Confirmar
                        </PrimaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="regenerateRecoveryCodes">
                        <SecondaryButton v-if="recoveryCodes.length > 0 && !confirming" class="me-3">
                            Regenerar los códigos de recuperación
                        </SecondaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="showRecoveryCodes">
                        <SecondaryButton v-if="recoveryCodes.length === 0 && !confirming" class="me-3">
                            Mostrar códigos de recuperación
                        </SecondaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
                        <SecondaryButton v-if="confirming" :class="{ 'opacity-25': disabling }" :disabled="disabling">
                            Cancelar
                        </SecondaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
                        <DangerButton v-if="!confirming" :class="{ 'opacity-25': disabling }" :disabled="disabling">
                            Deshabilitar
                        </DangerButton>
                    </ConfirmsPassword>
                </div>
            </div>
        </template>
    </ActionSection>
</template>
