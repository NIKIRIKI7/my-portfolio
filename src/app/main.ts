import { createApp, watch } from 'vue';
import { createHead } from '@vueuse/head';
import App from '@/app/App.vue';
import { withProviders } from '@/app/providers';
import '@/app/styles/index.scss';

import { useThemeStore } from '@/features/theme-switcher';
import { useLanguageStore } from '@/features/language-switcher';
import { THEME_STORAGE_KEY } from '@/shared/config/constants';

const head = createHead();
const app = createApp(App);

withProviders(app);

const themeStore = useThemeStore();

const initialTheme = themeStore.initTheme();

document.documentElement.setAttribute('data-theme', initialTheme);

watch(
    () => themeStore.theme,
    (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    },
);

const languageStore = useLanguageStore();
languageStore.initLanguage();

app.use(head);
app.mount('#app');
