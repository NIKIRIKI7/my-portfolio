<script setup lang="ts">
import { computed } from 'vue';

type Variant = 'default' | 'inverted';

const props = defineProps<{
    variant?: Variant;
    imageSrc: string;
    imageAlt: string;
}>();

const emit = defineEmits<{
    (e: 'image-click'): void;
}>();

const cardClasses = computed(() => ['base-card', `base-card--variant-${props.variant}`]);
</script>

<template>
    <article :class="cardClasses">
        <div class="base-card__image-wrapper" @click="emit('image-click')">
            <slot name="image">
                <img :src="imageSrc" :alt="imageAlt" class="base-card__image" loading="lazy" />
            </slot>
        </div>
        <div class="base-card__content">
            <div class="base-card__tag">
                <slot name="tag" />
            </div>
            <h3 class="base-card__title">
                <slot name="title" />
            </h3>
            <p class="base-card__description">
                <slot name="description" />
            </p>
            <div class="base-card__action">
                <slot name="action" />
            </div>
        </div>
    </article>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.base-card {
    display: flex;
    align-items: center;
    gap: rem(60px);
    justify-content: space-between;
    background-color: transparent;

    @include responsive($laptop) {
        gap: rem(40px);
    }
    @include responsive($tablet) {
        flex-direction: column;
        gap: rem(30px);
    }

    &--variant-inverted {
        .base-card__title {
            color: $color-background;
        }
        .base-card__description {
            color: $case-study-card-description;
        }
    }
}

.base-card__image-wrapper {
    flex-shrink: 0;
    width: 100%;
    max-width: rem(540px);
    border-radius: rem(8px);
    overflow: hidden;
    cursor: pointer;

    @include responsive($laptop) {
        max-width: rem(450px);
    }

    @include responsive($tablet) {
        max-width: rem(540px);
    }
}

:deep(picture img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.base-card__content {
    flex: 1;
    max-width: rem(450px);

    @include responsive($tablet) {
        max-width: rem(540px);
        text-align: center;
    }
}

.base-card__tag {
    margin-bottom: rem(20px);
}

.base-card__title {
    margin-top: 0;
}

.base-card__description {
    margin-top: rem(16px);
}

.base-card__action {
    margin-top: rem(30px);
}
</style>
