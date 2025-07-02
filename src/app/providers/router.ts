import {
    createRouter,
    createWebHistory,
    type RouterScrollBehavior,
    type RouteLocationNormalized,
    type NavigationGuardNext,
} from 'vue-router';
import { nextTick } from 'vue';

const scrollBehavior: RouterScrollBehavior = async (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    }

    if (to.hash) {
        await nextTick();
        const element = document.querySelector(to.hash);
        if (element) {
            return { el: to.hash, behavior: 'smooth' };
        }
    }

    return { top: 0, left: 0 };
};

const handleSectionRedirect = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
) => {
    const sectionId = to.params.sectionId as string;
    const availableSections = [
        'skills',
        'services',
        'case-studies',
        'testimonials',
        'recent-work',
        'contact',
    ];

    if (availableSections.includes(sectionId)) {
        next({ path: '/', hash: `#${sectionId}` });
    } else {
        next({ name: 'home' });
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/home'),
            meta: {
                title: 'Никита Горобец — Веб-разработчик и дизайнер',
                description:
                    'Портфолио веб-разработчика и дизайнера. Создание интуитивно понятных и эффективных веб-решений.',
            },
        },
        {
            path: '/:sectionId',
            name: 'sectionRedirect',
            beforeEnter: handleSectionRedirect,
            component: {},
        },
    ],
});

export default router;
