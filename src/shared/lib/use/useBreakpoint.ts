import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useBreakpoint(breakpoint: number) {
    const isMatch = ref(false);

    let mediaQueryList: MediaQueryList | null = null;

    const updateMatches = (event: MediaQueryListEvent | MediaQueryList) => {
        isMatch.value = event.matches;
    };

    onMounted(() => {
        mediaQueryList = window.matchMedia(`(max-width: ${breakpoint}px)`);
        updateMatches(mediaQueryList);
        mediaQueryList.addEventListener('change', updateMatches);
    });

    onBeforeUnmount(() => {
        if (mediaQueryList) {
            mediaQueryList.removeEventListener('change', updateMatches);
        }
    });

    return {
        isMatch,
    };
}
