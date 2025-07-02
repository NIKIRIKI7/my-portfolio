import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', () => {
    const activeSectionId = ref<string | null>(null);

    function setActiveSectionId(id: string | null) {
        activeSectionId.value = id;
    }

    return {
        activeSectionId,
        setActiveSectionId,
    };
});
