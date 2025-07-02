import { markRaw } from 'vue';
import type { Service } from '../model/types';
import IconDesign from '@/shared/assets/icons/services/IconDesign.vue';
import IconLayout from '@/shared/assets/icons/services/IconLayout.vue';
import IconDevelopment from '@/shared/assets/icons/services/IconDevelopment.vue';

const mockData: Service[] = [
    {
        id: 1,
        titleKey: 'servicesData.layout.title',
        descriptionKey: 'servicesData.layout.description',
        icon: markRaw(IconLayout),
        category: 'layout',
    },
    {
        id: 2,
        titleKey: 'servicesData.design.title',
        descriptionKey: 'servicesData.design.description',
        icon: markRaw(IconDesign),
        category: 'design',
    },
    {
        id: 3,
        titleKey: 'servicesData.development.title',
        descriptionKey: 'servicesData.development.description',
        icon: markRaw(IconDevelopment),
        category: 'development',
    },
    {
        id: 4,
        titleKey: 'servicesData.optimization.title',
        descriptionKey: 'servicesData.optimization.description',
        icon: markRaw(IconDevelopment),
        category: 'development',
    },
    {
        id: 5,
        titleKey: 'servicesData.adaptive.title',
        descriptionKey: 'servicesData.adaptive.description',
        icon: markRaw(IconLayout),
        category: 'layout',
    },
    {
        id: 6,
        titleKey: 'servicesData.ux.title',
        descriptionKey: 'servicesData.ux.description',
        icon: markRaw(IconDesign),
        category: 'design',
    },
];

export const fetchServicesApi = async (): Promise<Service[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 500);
    });
};
