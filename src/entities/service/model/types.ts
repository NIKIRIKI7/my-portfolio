import type { Component } from 'vue';

export type ServiceCategory = 'all' | 'design' | 'layout' | 'development';

export interface Service {
    id: number;
    titleKey: string;
    descriptionKey: string;
    icon: Component;
    category: ServiceCategory;
}
