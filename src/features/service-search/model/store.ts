import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useServiceSearchStore = defineStore('service-search', () => {
    const searchQuery = ref('');

    function setSearchQuery(query: string) {
        searchQuery.value = query;
    }

    return {
        searchQuery,
        setSearchQuery,
    };
});
