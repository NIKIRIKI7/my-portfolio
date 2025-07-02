import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { ContactFormData } from './types';
import { sendContactFormApi } from '../api';

const getInitialState = (): ContactFormData => ({
    email: '',
    mobile: '',
    message: '',
});

export const useContactFormStore = defineStore('contact-form', () => {
    const formData = reactive<ContactFormData>(getInitialState());
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const successMessage = ref<string | null>(null);

    function resetForm() {
        Object.assign(formData, getInitialState());
        error.value = null;
        successMessage.value = null;
    }

    async function submitForm() {
        if (isLoading.value) return;

        isLoading.value = true;
        error.value = null;
        successMessage.value = null;

        try {
            await sendContactFormApi(formData);
            successMessage.value = 'contactForm.status.successMessage';
            Object.assign(formData, getInitialState());
        } catch (e) {
            console.error('Ошибка при отправке формы:', e);
            error.value = 'contactForm.status.errorMessage';
        } finally {
            isLoading.value = false;
        }
    }

    return {
        formData,
        isLoading,
        error,
        successMessage,
        submitForm,
        resetForm,
    };
});
