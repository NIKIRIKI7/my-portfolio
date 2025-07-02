/**
 * @file Файл с глобальными константами приложения.
 */

/**
 * @const {number} SLIDER_GAP
 * @description Отступ между слайдами в пикселях. Должен быть синхронизирован с переменной $gap в SCSS.
 */
export const SLIDER_GAP = 30;

/**
 * @const {number} TABLET_BREAKPOINT_WIDTH
 * @description Ширина планшетного брейкпоинта в пикселях. Должна быть синхронизирована с $tablet в variables.scss.
 */
export const TABLET_BREAKPOINT_WIDTH = 768;

/**
 * @const {string} THEME_STORAGE_KEY
 * @description Ключ для хранения темы в localStorage.
 */
export const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * @const {string} I18N_STORAGE_KEY
 * @description Ключ для хранения языка в localStorage.
 */
export const I18N_STORAGE_KEY = 'portfolio-language';
