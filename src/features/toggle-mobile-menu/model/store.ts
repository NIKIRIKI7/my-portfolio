import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMobileMenuStore = defineStore('mobile-menu', () => {
    const isMenuOpen = ref(false);

    function toggle() {
        isMenuOpen.value = !isMenuOpen.value;
    }

    function closeMenu() {
        if (isMenuOpen.value) {
            isMenuOpen.value = false;
        }
    }

    function openMenu() {
        if (!isMenuOpen.value) {
            isMenuOpen.value = true;
        }
    }

    return {
        isMenuOpen,
        toggle,
        openMenu,
        closeMenu,
    };
});
