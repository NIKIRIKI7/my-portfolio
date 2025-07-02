<script setup lang="ts">
import { type PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Service } from '../../model/types';

defineProps({
    serviceData: {
        type: Object as PropType<Service>,
        required: true,
    },
});

const { t } = useI18n();

const isFlipped = ref(false);

function toggleFlip() {
    isFlipped.value = !isFlipped.value;
}
</script>

<template>
    <article class="service-card" @click="toggleFlip">
        <div class="service-card__inner" :class="{ 'is-flipped': isFlipped }">
            <div class="service-card__front">
                <div class="service-card__content">
                    <div class="service-card__icon-wrapper">
                        <component :is="serviceData.icon" class="service-card__icon" />
                    </div>
                    <h3 class="service-card__title">{{ t(serviceData.titleKey) }}</h3>
                    <p class="service-card__hint">{{ t('services.card.flipHint') }}</p>
                </div>
                <div class="service-card__glow"></div>
            </div>

            <div class="service-card__back">
                <div class="service-card__content">
                    <h3 class="service-card__title">{{ t(serviceData.titleKey) }}</h3>
                    <p class="service-card__description">{{ t(serviceData.descriptionKey) }}</p>
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.service-card {
    --card-glow-color: #{$color-accent-primary};
    --card-bg: rgba(var(--color-border-rgb), 0.4);
    --card-border-color: rgba(var(--color-accent-primary-rgb), 0.3);
}

.service-card {
    background-color: transparent;
    width: 100%;
    height: rem(280px);
    perspective: 1000px;
    cursor: pointer;
    border: none;
    padding: 0;
    transition: none;

    &:hover,
    &:focus-visible {
        border-color: transparent;
        transform: none;
        box-shadow: none;
    }

    &__inner {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    &.is-flipped .service-card__inner,
    &__inner.is-flipped {
        transform: rotateY(180deg);
    }

    &__front,
    &__back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: rem(12px);
        border: 1px solid transparent;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    &__front {
        background: var(--card-bg);
        border-color: var(--card-border-color);
        backdrop-filter: blur(5px);
    }

    &__back {
        background: var(--card-bg);
        border-color: var(--card-border-color);
        transform: rotateY(180deg);
        padding: rem(20px) rem(30px);
    }

    &__content {
        padding: rem(20px);
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: rem(15px);
        height: 100%;
    }

    &__icon-wrapper {
        margin-bottom: rem(5px);
    }

    &__icon {
        width: rem(48px);
        height: rem(48px);
        color: var(--card-glow-color);
        transition: color 0.3s ease;
    }

    &__title {
        color: $color-text-primary;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        margin: 0;
    }

    &__description {
        color: $color-text-secondary;
        font-size: rem($font-size-text-lg);
        line-height: 1.7;
        flex-grow: 1;
    }

    &__hint {
        color: $color-text-secondary;
        font-size: rem(12px);
        opacity: 0.7;
        position: absolute;
        bottom: rem(20px);
    }

    &__glow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: rem(12px);
        pointer-events: none;
        background: radial-gradient(
                circle at 50% 50%,
                rgba(var(--color-accent-primary-rgb), 0.15),
                transparent 70%
        );
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: 1;
    }

    @include on-event {
        .service-card__inner:not(.is-flipped) {
            transform: translateY(-5px) translateZ(20px);
        }

        .service-card__glow {
            opacity: 1;
        }
    }
}
</style>
