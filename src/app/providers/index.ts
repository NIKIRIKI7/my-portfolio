import { type App } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import i18n from '@/shared/config/i18n';

export const withProviders = (app: App<Element>) => {
    app.use(createPinia()).use(router).use(i18n);

    return app;
};
