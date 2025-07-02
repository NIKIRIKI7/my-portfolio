import { onBeforeUnmount, watch, type Ref } from 'vue';
import { useNavigationStore } from '@/widgets/the-header/model/navigationStore';

export function useScrollSpy(targets: Ref<(Element | null)[]>) {
    const navigationStore = useNavigationStore();
    let observer: IntersectionObserver | null = null;

    const handleIntersect: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navigationStore.setActiveSectionId(entry.target.id);
            }
        });
    };

    observer = new IntersectionObserver(handleIntersect, {
        rootMargin: '-15% 0px -75% 0px',
        threshold: 0,
    });

    const stopWatch = watch(
        targets,
        (newTargets, oldTargets) => {
            oldTargets?.forEach((el) => {
                if (el) observer?.unobserve(el);
            });
            newTargets.forEach((el) => {
                if (el) observer?.observe(el);
            });
        },
        { immediate: true, deep: true },
    );

    onBeforeUnmount(() => {
        stopWatch();
        observer?.disconnect();
    });
}
