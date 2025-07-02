import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from '@/shared/lib/utils/throttle';

const MOUSE_MOVE_THROTTLE_DELAY = 16;

export function useFollowCursor() {
    const interactiveBubbleEl = ref<HTMLDivElement | null>(null);

    const trackMousePosition = (event: MouseEvent) => {
        if (interactiveBubbleEl.value) {
            interactiveBubbleEl.value.style.setProperty('--mouse-x', `${event.clientX}px`);
            interactiveBubbleEl.value.style.setProperty('--mouse-y', `${event.clientY}px`);
        }
    };

    const throttledTrackMousePosition = throttle(trackMousePosition, MOUSE_MOVE_THROTTLE_DELAY);

    onMounted(() => {
        window.addEventListener('mousemove', throttledTrackMousePosition);
    });

    onUnmounted(() => {
        window.removeEventListener('mousemove', throttledTrackMousePosition);
    });

    return {
        interactiveBubbleEl,
    };
}
