import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';

export type CursorState = 'default' | 'hover' | 'text' | 'disabled';

export function useCursor() {
    const coords = reactive({ x: 0, y: 0 });
    const cursorState = ref<CursorState>('default');

    const selectors = {
        hover: 'a, button, [role="button"], input, textarea, .case-study-card__image-wrapper, .recent-work-card__image-wrapper, [data-cursor="hover"]',
        text: 'h1, h2, h3, h4, h5, h6, p, span, li, [data-cursor="text"]',
        disabled: '[disabled], .disabled, [data-cursor="disabled"]',
    };

    const handleMouseMove = (event: MouseEvent) => {
        coords.x = event.clientX;
        coords.y = event.clientY;
    };

    const handleMouseOver = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (target.closest(selectors.disabled)) {
            cursorState.value = 'disabled';
        } else if (target.closest(selectors.hover)) {
            cursorState.value = 'hover';
        } else if (target.closest(selectors.text)) {
            cursorState.value = 'text';
        }
    };

    const handleMouseOut = () => {
        cursorState.value = 'default';
    };

    onMounted(() => {
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseout', handleMouseOut);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.body.removeEventListener('mouseover', handleMouseOver);
        document.body.removeEventListener('mouseout', handleMouseOut);
    });

    return {
        coords,
        cursorState,
    };
}
