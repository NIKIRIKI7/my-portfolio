<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useContactFormStore } from '../../model/store';
import AppInput from '@/shared/ui/AppInput';
import AppTextarea from '@/shared/ui/AppTextarea';
import AppButton from '@/shared/ui/AppButton';
import AppModal from '@/shared/ui/AppModal';
import { useContactFormValidation } from '../../model/useContactFormValidation';

const { t } = useI18n();
const formStore = useContactFormStore();

const { formData } = formStore;
const { isLoading, error: apiErrorKey, successMessage: successMessageKey } = storeToRefs(formStore);

const { submitForm, resetForm } = formStore;

const { errors, validate, validateField, isFormValid } = useContactFormValidation(formData);

const isStatusModalVisible = computed(() => !!successMessageKey.value || !!apiErrorKey.value);

async function handleSubmit() {
    if (!validate()) {
        return;
    }
    await submitForm();
}

function closeStatusModal() {
    resetForm();
}
</script>

<template>
    <div>
        <form class="contact-form" novalidate @submit.prevent="handleSubmit">
            <div class="contact-form__fields">
                <AppInput
                    v-model="formData.email"
                    :label="t('contactForm.emailLabel')"
                    type="email"
                    :placeholder="t('contactForm.emailPlaceholder')"
                    class="contact-form__field"
                    required
                    :error="errors.email ? t(errors.email) : ''"
                    @blur="validateField('email')"
                />
                <AppInput
                    v-model="formData.mobile"
                    :label="t('contactForm.mobileLabel')"
                    type="tel"
                    :placeholder="t('contactForm.mobilePlaceholder')"
                    class="contact-form__field"
                    required
                    :error="errors.mobile ? t(errors.mobile) : ''"
                    @blur="validateField('mobile')"
                />
                <AppTextarea
                    v-model="formData.message"
                    :label="t('contactForm.messageLabel')"
                    :placeholder="t('contactForm.messagePlaceholder')"
                    class="contact-form__field contact-form__field--full-width"
                    :rows="4"
                    required
                    :error="errors.message ? t(errors.message) : ''"
                    @blur="validateField('message')"
                />
            </div>
            <div class="contact-form__footer">
                <AppButton
                    type="submit"
                    theme="primary"
                    :disabled="isLoading || !isFormValid"
                    class="contact-form__submit"
                >
                    {{ t(isLoading ? 'contactForm.submittingButton' : 'contactForm.submitButton') }}
                </AppButton>
            </div>
        </form>

        <AppModal
            :model-value="isStatusModalVisible"
            :title="
                t(apiErrorKey ? 'contactForm.status.errorTitle' : 'contactForm.status.successTitle')
            "
            @update:model-value="closeStatusModal"
        >
            <p v-if="successMessageKey">{{ t(successMessageKey) }}</p>
            <p v-if="apiErrorKey">{{ t(apiErrorKey) }}</p>

            <template #footer>
                <AppButton theme="primary" @click="closeStatusModal">
                    {{ t('contactForm.status.closeButton') }}
                </AppButton>
            </template>
        </AppModal>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.contact-form {
    display: flex;
    flex-direction: column;
    gap: rem(30px);
    width: 100%;

    &__fields {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: rem(20px);

        @include responsive($tablet) {
            grid-template-columns: 1fr;
        }
    }

    &__field {
        &--full-width {
            grid-column: 1 / -1;
        }
    }

    &__footer {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: rem(15px);
    }

    &__submit {
        :deep(.app-button__arrow) {
            display: none;
        }
    }
}
</style>
