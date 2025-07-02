import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Theme } from './types';
import { THEME_STORAGE_KEY } from '@/shared/config/constants';

export const useThemeStore = defineStore('theme', () => {
    const theme = ref<Theme>('dark');

    function setTheme(newTheme: Theme) {
        theme.value = newTheme;
    }

    function toggleTheme() {
        setTheme(theme.value === 'dark' ? 'light' : 'dark');
    }

    function initTheme(): Theme {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

        if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
            theme.value = savedTheme;
        } else {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            theme.value = prefersLight ? 'light' : 'dark';
        }
        return theme.value;
    }

    return {
        theme,
        toggleTheme,
        initTheme,
        setTheme,
    };
});
