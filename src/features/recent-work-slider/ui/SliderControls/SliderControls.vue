<script setup lang="ts">
import IconArrowLeft from '@/shared/assets/icons/IconArrowLeft.vue';
import IconArrowRight from '@/shared/assets/icons/IconArrowRight.vue';

defineProps({
    isPrevDisabled: {
        type: Boolean,
        default: false,
    },
    isNextDisabled: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['prev', 'next']);
</script>

<template>
    <div class="slider-controls">
        <button
            class="slider-controls__button slider-controls__button--prev"
            :disabled="isPrevDisabled"
            aria-label="Previous slide"
            @click="$emit('prev')"
        >
            <IconArrowLeft />
        </button>
        <button
            class="slider-controls__button slider-controls__button--next"
            :disabled="isNextDisabled"
            aria-label="Next slide"
            @click="$emit('next')"
        >
            <IconArrowRight />
        </button>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.slider-controls {
    display: flex;
    gap: rem(10px);

    &__button {
        width: rem(50px);
        height: rem(50px);
        border-radius: 50%;
        border: 1px solid $color-border;
        color: $color-background;
        @include flex-center;
        transition:
            color 0.3s,
            border-color 0.3s;

        @include on-event {
            color: $color-accent-primary;
            border-color: $color-accent-primary;
        }

        &:disabled {
            color: $color-border;
            border-color: $color-border;
            cursor: not-allowed;
        }
    }
}
</style>
