<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { RecentWorkCard, useRecentWorkStore } from '@/entities/recent-work';
import { useSlider, SliderControls } from '@/features/recent-work-slider';
import { TABLET_BREAKPOINT_WIDTH } from '@/shared/config/constants';
import AppStatus from '@/shared/ui/AppStatus';
import SkeletonCard from '@/shared/ui/SkeletonCard';
import { useBreakpoint } from '@/shared/lib/use/useBreakpoint';

const { t } = useI18n();
const workStore = useRecentWorkStore();

const { data: works, isLoading, error } = storeToRefs(workStore);
const { fetchData: fetchRecentWorks } = workStore;

const sectionRef = ref<HTMLElement | null>(null);

const { isMatch: isTablet } = useBreakpoint(TABLET_BREAKPOINT_WIDTH);
const slidesPerView = computed(() => (isTablet.value ? 1 : 2));

const { sliderOffset, isPrevDisabled, isNextDisabled, next, prev } = useSlider(works, {
    slidesPerView,
});

onMounted(() => {
    if (!works.value?.length) {
        fetchRecentWorks();
    }
});
</script>

<template>
    <section
        id="recent-work"
        ref="sectionRef"
        class="recent-work-section animate-container"
    >
        <div class="container">
            <header class="recent-work-section__header animate-child">
                <div class="recent-work-section__info">
                    <h2 class="recent-work-section__title">{{ t('recentWork.title') }}</h2>
                    <p class="recent-work-section__subtitle">
                        {{ t('recentWork.subtitle') }}
                    </p>
                </div>
                <SliderControls
                    :is-prev-disabled="isPrevDisabled"
                    :is-next-disabled="isNextDisabled"
                    @prev="prev"
                    @next="next"
                />
            </header>

            <div class="recent-work-section__body animate-child" style="--stagger-delay: 0.2s">
                <div v-if="isLoading" class="slider">
                    <div class="slider__track">
                        <SkeletonCard
                            v-for="i in slidesPerView"
                            :key="i"
                            class="slider__slide"
                            :style="{ '--slides-per-view': slidesPerView }"
                        />
                    </div>
                </div>
                <AppStatus
                    v-else-if="error || !works?.length"
                    :error="error"
                    :is-empty="!works?.length"
                    :loading-text="t('recentWork.loading')"
                    :error-text-prefix="t('recentWork.error')"
                    :empty-text="t('recentWork.empty')"
                    class="recent-work-section__status"
                />
                <div v-if="!isLoading && !error && works?.length" class="slider">
                    <div
                        class="slider__track"
                        :style="{ transform: `translateX(${sliderOffset})` }"
                    >
                        <RecentWorkCard
                            v-for="work in works"
                            :key="work.id"
                            :work-data="work"
                            class="slider__slide"
                            :style="{ '--slides-per-view': slidesPerView }"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.recent-work-section {
    padding: rem(100px) 0;
    background: $color-text-primary;
    transition: background-color 0.3s ease;


    &__status {
        color: $color-background;

        :deep(.app-status__spinner) {
            border-color: rgba(255, 255, 255, 0.2);
            border-top-color: $color-accent-primary;
        }
    }

    @include responsive($tablet) {
        padding: rem(60px) 0;
    }

    :deep(.recent-work-card) {
        background-color: $recent-work-card-bg;
        border-color: $color-border;
    }

    :deep(h3) {
        color: $color-text-primary;
    }
    :deep(p) {
        color: $color-text-secondary;
    }

    &__info {
        color: $case-study-card-description;
    }
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: rem(80px);

        @include responsive($tablet) {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: rem(30px);
            margin-bottom: rem(60px);
        }
    }

    &__title {
        color: $color-background;
    }

    &__subtitle {
        color: $case-study-card-description!important;
        font-size: rem(18px);
        margin-top: rem(16px);
        max-width: rem(450px);
    }

    .slider {
        overflow: hidden;
    }

    .slider__track {
        display: flex;
        gap: rem(30px);
        transition: transform 0.5s ease-in-out;
    }

    .slider__slide {
        width: calc((100% - #{rem(30px)} * (var(--slides-per-view) - 1)) / var(--slides-per-view));
        flex-shrink: 0;
    }
}
</style>
