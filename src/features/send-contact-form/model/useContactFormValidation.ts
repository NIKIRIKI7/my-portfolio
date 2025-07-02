import { reactive, computed } from 'vue';
import type { ContactFormData } from './types';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export function useContactFormValidation(formData: ContactFormData) {
    const errors = reactive({
        email: '',
        message: '',
        mobile: '',
    });

    const isFormValid = computed(() => {
        return (
            !errors.email &&
            !errors.message &&
            !errors.mobile &&
            formData.email &&
            formData.message &&
            formData.mobile
        );
    });

    function validateField(field: keyof ContactFormData) {
        switch (field) {
            case 'email':
                if (!formData.email) {
                    errors.email = 'contactForm.validation.emailRequired';
                } else if (!EMAIL_REGEX.test(formData.email)) {
                    errors.email = 'contactForm.validation.emailInvalid';
                } else {
                    errors.email = '';
                }
                break;
            case 'mobile':
                if (!formData.mobile) {
                    errors.mobile = 'contactForm.validation.mobileRequired';
                } else if (!PHONE_REGEX.test(formData.mobile)) {
                    errors.mobile = 'contactForm.validation.mobileInvalid';
                } else {
                    errors.mobile = '';
                }
                break;
            case 'message':
                if (!formData.message) {
                    errors.message = 'contactForm.validation.messageRequired';
                } else {
                    errors.message = '';
                }
                break;
        }
    }

    function validate() {
        validateField('email');
        validateField('mobile');
        validateField('message');
        return !errors.email && !errors.message && !errors.mobile;
    }

    return {
        errors,
        validate,
        validateField,
        isFormValid,
    };
}
