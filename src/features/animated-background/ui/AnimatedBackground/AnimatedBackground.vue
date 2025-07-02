<script setup lang="ts">
import { useFollowCursor } from '../../model/useFollowCursor';
import { usePageVisibility } from '@/shared/lib/use/usePageVisibility';

const { interactiveBubbleEl } = useFollowCursor();
const { isVisible } = usePageVisibility();
</script>

<template>
    <div class="animated-background" :class="{ 'is-paused': !isVisible }">
        <svg class="animated-background__svg-filters">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                        result="goo"
                    />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </defs>
        </svg>
        <div class="animated-background__gradients-container">
            <div
                class="animated-background__gradient-item animated-background__gradient-item--1"
            ></div>
            <div
                class="animated-background__gradient-item animated-background__gradient-item--2"
            ></div>
            <div
                class="animated-background__gradient-item animated-background__gradient-item--3"
            ></div>
            <div
                class="animated-background__gradient-item animated-background__gradient-item--4"
            ></div>
            <div
                class="animated-background__gradient-item animated-background__gradient-item--5"
            ></div>
            <div ref="interactiveBubbleEl" class="animated-background__interactive-bubble"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.animated-background {
    --blending: hard-light;
    --circle-size: 80%;

    --color1-rgb: var(--color-bg-anim-1-rgb);
    --color2-rgb: var(--color-bg-anim-2-rgb);
    --color3-rgb: var(--color-bg-anim-3-rgb);
    --color4-rgb: var(--color-bg-anim-4-rgb);
    --color5-rgb: var(--color-bg-anim-5-rgb);
    --color-interactive-rgb: var(--color-accent-primary-rgb);

    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: transparent;

    &.is-paused {
        .animated-background__gradient-item,
        .animated-background__interactive-bubble {
            animation-play-state: paused;
        }
    }

    &__svg-filters {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
    }

    &__gradients-container {
        filter: url(#goo) blur(30px);
        width: 100%;
        height: 100%;
    }

    &__gradient-item {
        position: absolute;
        mix-blend-mode: var(--blending);
        opacity: 1;

        &--1 {
            background: radial-gradient(
                    circle at center,
                    rgba(var(--color1-rgb), 0.8) 0,
                    rgba(var(--color1-rgb), 0) 50%
            )
            no-repeat;
            width: var(--circle-size);
            height: var(--circle-size);
            top: calc(50% - var(--circle-size) / 2);
            left: calc(50% - var(--circle-size) / 2);
            transform-origin: center center;
            animation: moveVertical 30s ease infinite;
        }

        &--2 {
            background: radial-gradient(
                    circle at center,
                    rgba(var(--color2-rgb), 0.8) 0,
                    rgba(var(--color2-rgb), 0) 50%
            )
            no-repeat;
            width: var(--circle-size);
            height: var(--circle-size);
            top: calc(50% - var(--circle-size) / 2);
            left: calc(50% - var(--circle-size) / 2);
            transform-origin: calc(50% - 400px);
            animation: moveInCircle 20s reverse infinite;
        }

        &--3 {
            background: radial-gradient(
                    circle at center,
                    rgba(var(--color3-rgb), 0.8) 0,
                    rgba(var(--color3-rgb), 0) 50%
            )
            no-repeat;
            width: var(--circle-size);
            height: var(--circle-size);
            top: calc(50% - var(--circle-size) / 2 + 200px);
            left: calc(50% - var(--circle-size) / 2 - 500px);
            transform-origin: calc(50% + 400px);
            animation: moveInCircle 40s linear infinite;
        }

        &--4 {
            background: radial-gradient(
                    circle at center,
                    rgba(var(--color4-rgb), 0.8) 0,
                    rgba(var(--color4-rgb), 0) 50%
            )
            no-repeat;
            width: var(--circle-size);
            height: var(--circle-size);
            top: calc(50% - var(--circle-size) / 2);
            left: calc(50% - var(--circle-size) / 2);
            transform-origin: calc(50% - 200px);
            animation: moveHorizontal 40s ease infinite;
            opacity: 0.7;
        }

        &--5 {
            background: radial-gradient(
                    circle at center,
                    rgba(var(--color5-rgb), 0.8) 0,
                    rgba(var(--color5-rgb), 0) 50%
            )
            no-repeat;
            width: calc(var(--circle-size) * 2);
            height: calc(var(--circle-size) * 2);
            top: calc(50% - var(--circle-size));
            left: calc(50% - var(--circle-size));
            transform-origin: calc(50% - 800px) calc(50% + 200px);
            animation: moveInCircle 20s ease infinite;
        }
    }

    &__interactive-bubble {
        position: absolute;
        background: radial-gradient(
                circle at center,
                rgba(var(--color-interactive-rgb), 0.6) 0,
                rgba(var(--color-interactive-rgb), 0) 50%
        )
        no-repeat;
        mix-blend-mode: var(--blending);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.7;
        will-change: transform;
        transform: translate(var(--mouse-x, 50vw), var(--mouse-y, 50vh)) translate(-50%, -50%);
        transition: transform 0.2s ease-out;
        pointer-events: none;
    }
}

[data-theme='light'] .animated-background {
    --blending: soft-light;
    opacity: 0.7;
}

@keyframes moveInCircle {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes moveVertical {
    0% {
        transform: translateY(-50%);
    }
    50% {
        transform: translateY(50%);
    }
    100% {
        transform: translateY(-50%);
    }
}

@keyframes moveHorizontal {
    0% {
        transform: translateX(-50%) translateY(-10%);
    }
    50% {
        transform: translateX(50%) translateY(10%);
    }
    100% {
        transform: translateX(-50%) translateY(-10%);
    }
}
</style>
