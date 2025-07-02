import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import i18n from '@/shared/config/i18n';
import type { Language } from './types';
import { I18N_STORAGE_KEY } from '@/shared/config/constants';

export const useLanguageStore = defineStore('language', () => {
    const language = ref<Language>(i18n.global.locale.value as Language);

    function setLanguage(newLang: Language) {
        language.value = newLang;
    }

    function initLanguage() {
        const savedLang = localStorage.getItem(I18N_STORAGE_KEY) as Language | null;
        if (savedLang && ['ru', 'en'].includes(savedLang)) {
            setLanguage(savedLang);
        } else {
            const browserLang = navigator.language.split('-')[0];
            setLanguage(browserLang === 'ru' ? 'ru' : 'en');
        }
    }

    watch(language, (newLang) => {
        i18n.global.locale.value = newLang;
        localStorage.setItem(I18N_STORAGE_KEY, newLang);
    });

    return {
        language,
        setLanguage,
        initLanguage,
    };
});
