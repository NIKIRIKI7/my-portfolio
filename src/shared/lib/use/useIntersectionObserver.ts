import { onBeforeUnmount, watch, type Ref } from 'vue';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
    animationClass?: string;
    onIntersect?: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
}

export function useIntersectionObserver(
    targets: Ref<(Element | null)[]>,
    options: UseIntersectionObserverOptions,
) {
    let observer: IntersectionObserver | null = null;

    const { onIntersect, animationClass, ...observerOptions } = options;

    const handleIntersect: IntersectionObserverCallback = (entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (animationClass) {
                    entry.target.classList.add(animationClass);
                }
                if (onIntersect) {
                    onIntersect(entry, obs);
                } else if (animationClass) {
                    obs.unobserve(entry.target);
                }
            }
        });
    };

    observer = new IntersectionObserver(handleIntersect, observerOptions);

    const stopWatch = watch(
        targets,
        (newTargets, oldTargets) => {
            oldTargets?.forEach((el) => {
                if (el && observer) observer.unobserve(el);
            });
            newTargets?.forEach((el) => {
                if (el) observer?.observe(el);
            });
        },
        { immediate: true, deep: true },
    );

    onBeforeUnmount(() => {
        stopWatch();
        if (observer) observer.disconnect();
    });
}
