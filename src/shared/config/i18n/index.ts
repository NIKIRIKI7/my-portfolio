import { createI18n } from 'vue-i18n';
import ru from './locales/ru.json';
import en from './locales/en.json';

/**
 * @file Настройка и экспорт экземпляра vue-i18n.
 */

// Получаем язык браузера
const browserLanguage = navigator.language.split('-')[0];

/**
 * @description Экземпляр I18n для управления локализацией в приложении.
 * @property {boolean} legacy - Отключаем для использования с Composition API.
 * @property {string} locale - Язык по умолчанию, определенный из localStorage или настроек браузера.
 * @property {string} fallbackLocale - Резервный язык.
 * @property {object} messages - Объект с файлами переводов.
 */
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('portfolio-language') || (browserLanguage === 'ru' ? 'ru' : 'en'),
    fallbackLocale: 'en',
    messages: {
        ru,
        en,
    },
});

export default i18n;
