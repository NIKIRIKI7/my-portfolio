<script setup lang="ts">
import { useCursor } from '../../model/useCursor';

const { coords, cursorState } = useCursor();
</script>

<template>
    <div class="custom-cursor" :class="`custom-cursor--${cursorState}`">
        <div
            class="custom-cursor__dot"
            :style="{ transform: `translate(${coords.x}px, ${coords.y}px)` }"
        ></div>
        <div
            class="custom-cursor__outline"
            :style="{ transform: `translate(${coords.x}px, ${coords.y}px)` }"
        ></div>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.custom-cursor {
    // Скрываем на тач-устройствах
    @media (pointer: coarse) {
        display: none;
    }

    &__dot,
    &__outline {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        border-radius: 50%;
        z-index: 9999;
        will-change: transform;
        transition:
            transform 0.15s ease-out,
            width 0.3s ease,
            height 0.3s ease,
            border-color 0.3s ease,
            background-color 0.3s ease,
            opacity 0.3s ease,
            border-radius 0.3s ease,
            border-width 0.3s ease;
    }

    &__dot {
        width: 8px;
        height: 8px;
        background-color: $color-accent-primary;
        margin-top: -4px;
        margin-left: -4px;
    }

    &__outline {
        width: 40px;
        height: 40px;
        border: 1px solid $color-accent-primary;
        background-color: transparent;
        margin-top: -20px;
        margin-left: -20px;
    }

    &--hover {
        .custom-cursor__dot {
            opacity: 0;
        }
        .custom-cursor__outline {
            width: 60px;
            height: 60px;
            margin-top: -30px;
            margin-left: -30px;
            background-color: rgba(97, 183, 0, 0.2);
        }
    }

    &--text {
        .custom-cursor__dot {
            opacity: 0;
        }
        .custom-cursor__outline {
            width: 4px;
            height: 40px;
            border-radius: 2px;
            border-color: $color-text-primary;
            background-color: $color-text-primary;
            margin-top: -20px;
            margin-left: -2px;
        }
    }

    // Состояние "недоступно"
    &--disabled {
        .custom-cursor__dot {
            background-color: $color-text-secondary;
        }
        .custom-cursor__outline {
            border-color: $color-text-secondary;
            background-color: rgba(128, 128, 128, 0.2);

            &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 15%;
                width: 70%;
                height: 1px;
                background-color: $color-text-secondary;
                transform: rotate(-45deg);
                transition: all 0.3s ease;
            }
        }
    }
}
</style>
