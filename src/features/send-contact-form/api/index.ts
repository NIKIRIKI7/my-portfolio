import type { ContactFormData } from '../model/types';

export const sendContactFormApi = (formData: ContactFormData): Promise<{ success: boolean }> => {
    console.log('Отправка данных на сервер:', formData);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Сервер ответил успехом');
            resolve({ success: true });
        }, 1500);
    });
};
