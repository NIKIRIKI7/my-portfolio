<script setup lang="ts">
import { type PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Testimonial } from '../../model/types';

const { t } = useI18n();

defineProps({
    testimonialData: {
        type: Object as PropType<Testimonial>,
        required: true,
    },
});
</script>

<template>
    <article class="testimonial-card">
        <p class="testimonial-card__text">
            {{ t(testimonialData.textKey) }}
        </p>
        <div class="testimonial-card__author">
            <img
                :src="testimonialData.authorImage"
                :alt="`Photo of ${t(testimonialData.authorNameKey)}`"
                class="testimonial-card__author-image"
            />
            <span class="testimonial-card__author-name">{{ t(testimonialData.authorNameKey) }}</span>
        </div>
    </article>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.testimonial-card {
    position: relative;
    padding: rem(30px);
    border: 1px solid $color-border;
    border-radius: rem(8px);
    display: flex;
    flex-direction: column;
    height: 100%;

    &__text {
        flex-grow: 1;
        color: $color-text-secondary;
        font-size: rem($font-size-text-lg);
        line-height: 1.7;
    }

    &__author {
        display: flex;
        align-items: center;
        gap: rem(15px);
        margin-top: rem(30px);
    }

    &__author-image {
        width: rem(50px);
        height: rem(50px);
        border-radius: 50%;
        object-fit: cover;
    }

    &__author-name {
        @include apply-font($font-family-title, 700, rem($font-size-client-name-lg));
        color: $color-text-primary;
    }
}
</style>
