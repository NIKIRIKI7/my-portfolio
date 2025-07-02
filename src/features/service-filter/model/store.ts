import { defineStore } from 'pinia';
import { ref, readonly } from 'vue';
import type { ServiceCategory } from '@/entities/service';

interface FilterCategory {
    id: ServiceCategory;
    nameKey: string;
}

export const useServiceFilterStore = defineStore('service-filter', () => {
    const categories = readonly<FilterCategory[]>([
        { id: 'all', nameKey: 'services.categories.all' },
        { id: 'layout', nameKey: 'services.categories.layout' },
        { id: 'design', nameKey: 'services.categories.design' },
        { id: 'development', nameKey: 'services.categories.development' },
    ]);

    const activeCategory = ref<ServiceCategory>('all');

    function setActiveCategory(category: ServiceCategory) {
        activeCategory.value = category;
    }

    return {
        categories,
        activeCategory,
        setActiveCategory,
    };
});
