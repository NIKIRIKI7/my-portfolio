import { ref, computed, watch, type Ref } from 'vue';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.5;

export function useImageZoomPan(isOpen: Ref<boolean>) {
    const scale = ref(MIN_SCALE);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const isDragging = ref(false);
    const startDrag = ref({ x: 0, y: 0 });

    const resetTransform = () => {
        scale.value = MIN_SCALE;
        offsetX.value = 0;
        offsetY.value = 0;
    };

    const zoomIn = () => {
        scale.value = Math.min(scale.value + ZOOM_STEP, MAX_SCALE);
    };

    const zoomOut = () => {
        const newScale = Math.max(scale.value - ZOOM_STEP, MIN_SCALE);
        if (newScale < scale.value) {
            scale.value = newScale;
            if (newScale === MIN_SCALE) {
                resetTransform();
            }
        }
    };

    const imageStyle = computed(() => ({
        transform: `scale(${scale.value}) translate(${offsetX.value}px, ${offsetY.value}px)`,
        cursor: scale.value > 1 ? (isDragging.value ? 'grabbing' : 'grab') : 'default',
    }));

    const onMouseDown = (event: MouseEvent) => {
        if (scale.value <= 1) return;
        event.preventDefault();
        isDragging.value = true;
        startDrag.value = {
            x: event.clientX - offsetX.value,
            y: event.clientY - offsetY.value,
        };
    };

    const onMouseMove = (event: MouseEvent) => {
        if (!isDragging.value) return;
        event.preventDefault();
        offsetX.value = event.clientX - startDrag.value.x;
        offsetY.value = event.clientY - startDrag.value.y;
    };

    const onMouseUp = () => {
        isDragging.value = false;
    };

    const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        if (event.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    };

    watch(isOpen, (isNowOpen) => {
        if (isNowOpen) {
            resetTransform();
            window.addEventListener('wheel', handleWheel, { passive: false });
        } else {
            window.removeEventListener('wheel', handleWheel);
        }
    });

    return {
        scale,
        imageStyle,
        zoomIn,
        zoomOut,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        isZoomInDisabled: computed(() => scale.value >= MAX_SCALE),
        isZoomOutDisabled: computed(() => scale.value <= MIN_SCALE),
    };
}
