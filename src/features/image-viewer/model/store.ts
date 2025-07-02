import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useImageViewerStore = defineStore('image-viewer', () => {
    const isOpen = ref(false);

    const imageSrc = ref<string | null>(null);

    function open(src: string) {
        imageSrc.value = src;
        isOpen.value = true;
    }

    function close() {
        isOpen.value = false;
        setTimeout(() => {
            imageSrc.value = null;
        }, 300);
    }

    return {
        isOpen,
        imageSrc,
        open,
        close,
    };
});
