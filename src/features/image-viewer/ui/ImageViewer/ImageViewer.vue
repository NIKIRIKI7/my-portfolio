<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useImageViewerStore } from '../../model/store';
import { useImageZoomPan } from '../../model/useImageZoomPan';
import IconClose from '@/shared/assets/icons/IconClose.vue';
import IconZoomIn from '@/shared/assets/icons/IconZoomIn.vue';
import IconZoomOut from '@/shared/assets/icons/IconZoomOut.vue';

const store = useImageViewerStore();
const { isOpen, imageSrc } = storeToRefs(store);
const { close } = store;

const {
    imageStyle,
    zoomIn,
    zoomOut,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    isZoomInDisabled,
    isZoomOutDisabled,
} = useImageZoomPan(isOpen);

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        close();
    }
};

watch(isOpen, (isNowOpen) => {
    if (isNowOpen) {
        window.addEventListener('keydown', handleKeyDown);
    } else {
        window.removeEventListener('keydown', handleKeyDown);
    }
});
</script>

<template>
    <Transition name="fade">
        <div v-if="isOpen" class="image-viewer" @click.self="close">
            <div class="image-viewer__controls">
                <button
                    class="image-viewer__control-button"
                    aria-label="Увеличить"
                    :disabled="isZoomInDisabled"
                    @click="zoomIn"
                >
                    <IconZoomIn />
                </button>
                <button
                    class="image-viewer__control-button"
                    aria-label="Уменьшить"
                    :disabled="isZoomOutDisabled"
                    @click="zoomOut"
                >
                    <IconZoomOut />
                </button>
                <button class="image-viewer__control-button" aria-label="Закрыть" @click="close">
                    <IconClose />
                </button>
            </div>

            <Transition name="zoom">
                <img
                    v-if="imageSrc"
                    :key="imageSrc"
                    :src="imageSrc"
                    alt="Просмотр изображения"
                    class="image-viewer__image"
                    :style="imageStyle"
                    @mousedown="onMouseDown"
                    @mousemove="onMouseMove"
                    @mouseup="onMouseUp"
                    @mouseleave="onMouseUp"
                />
            </Transition>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
// ... стили остаются без изменений
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.image-viewer {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 2000;
    @include flex-center;
    padding: rem(20px);
    overflow: hidden;
}

.image-viewer__controls {
    position: absolute;
    top: rem(20px);
    right: rem(20px);
    display: flex;
    gap: rem(10px);
    background-color: rgba(0, 0, 0, 0.5);
    padding: rem(5px);
    border-radius: rem(8px);
}

.image-viewer__control-button {
    color: white;
    width: rem(50px);
    height: rem(50px);
    @include flex-center;
    border-radius: rem(4px);
    transition:
        transform 0.3s,
        background-color 0.3s,
        opacity 0.3s;

    &:not(:disabled):hover {
        transform: scale(1.1);
        background-color: rgba(255, 255, 255, 0.2);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}

.image-viewer__image {
    @include modal-image;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    will-change: transform;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
    transition:
        transform 0.3s ease,
        opacity 0.3s ease;
}
.zoom-enter-from,
.zoom-leave-to {
    transform: scale(0.9);
    opacity: 0;
}
</style>
