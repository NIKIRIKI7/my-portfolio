import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Skill } from './types';

export const useSkillStore = defineStore('skill', () => {
    const skills = ref<Skill[]>([
        { id: 1, name: 'HTML5 / CSS3 (SCSS)', level: 95, color: 'var(--color-accent-tag-1)' },
        { id: 2, name: 'JavaScript (ES6+)', level: 85, color: 'var(--color-accent-tag-2)' },
        { id: 3, name: 'TypeScript', level: 80, color: 'var(--color-accent-tag-3)' },
        {
            id: 4,
            name: 'Vue.js (Vue 3, Pinia, Router)',
            level: 90,
            color: 'var(--color-accent-primary)',
        },
        { id: 5, name: 'Git & CI/CD', level: 75, color: 'var(--color-text-secondary)' },
        { id: 6, name: 'Figma / UI Design', level: 70, color: 'var(--color-special-icon)' },
    ]);

    return {
        skills,
    };
});
