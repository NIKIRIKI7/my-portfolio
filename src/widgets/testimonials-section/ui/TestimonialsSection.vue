<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { TestimonialCard, useTestimonialStore } from '@/entities/testimonial';
import AppStatus from '@/shared/ui/AppStatus';
import SkeletonCard from '@/shared/ui/SkeletonCard';

const { t } = useI18n();
const testimonialStore = useTestimonialStore();

const { data: testimonials, isLoading, error } = storeToRefs(testimonialStore);
const { fetchData: fetchTestimonials } = testimonialStore;

const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
    if (!testimonials.value?.length) {
        fetchTestimonials();
    }
});
</script>

<template>
    <section
        id="testimonials"
        ref="sectionRef"
        class="testimonials-section animate-container"
    >
        <div class="container">
            <header class="testimonials-section__header animate-child">
                <h2 class="testimonials-section__title">{{ t('testimonials.title') }}</h2>
                <p class="testimonials-section__subtitle">
                    {{ t('testimonials.subtitle') }}
                </p>
            </header>

            <div class="testimonials-section__body animate-child" style="--stagger-delay: 0.2s">
                <div v-if="isLoading" class="testimonials-section__list">
                    <SkeletonCard v-for="i in 4" :key="i" />
                </div>
                <AppStatus
                    v-else-if="error || !testimonials?.length"
                    :error="error"
                    :is-empty="!testimonials?.length"
                    :loading-text="t('testimonials.loading')"
                    :error-text-prefix="t('testimonials.error')"
                    :empty-text="t('testimonials.empty')"
                />
                <div
                    v-if="!isLoading && !error && testimonials?.length"
                    class="testimonials-section__list"
                >
                    <TestimonialCard
                        v-for="item in testimonials"
                        :key="item.id"
                        :testimonial-data="item"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.testimonials-section {
    padding: rem(100px) 0;
    transition: background-color 0.3s ease;

    @include responsive($tablet) {
        padding: rem(60px) 0;
    }

    :deep(.testimonial-card),
    :deep(.skeleton-card) {
        background-color: $testimonial-card-bg;
    }

    &__header {
        text-align: center;
        max-width: rem(540px);
        margin: 0 auto;
    }

    &__title {
        color: $color-text-primary;
    }

    &__subtitle {
        margin-top: rem(16px);
        color: $color-text-secondary;
        font-size: rem(18px);
    }

    &__body {
        margin-top: rem(80px);
        @include responsive($tablet) {
            margin-top: rem(60px);
        }
    }

    &__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: rem(30px);

        @include responsive($tablet) {
            grid-template-columns: 1fr;
            gap: rem(20px);
        }
    }

    &__error {
        color: $color-special-icon;
    }
}
</style>
