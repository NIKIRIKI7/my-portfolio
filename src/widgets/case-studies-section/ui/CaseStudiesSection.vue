<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { CaseStudyCard, useCaseStudyStore } from '@/entities/case-study';
import AppStatus from '@/shared/ui/AppStatus';
import SkeletonCard from '@/shared/ui/SkeletonCard';

const { t } = useI18n();
const caseStudyStore = useCaseStudyStore();
const { data: caseStudies, isLoading, error } = storeToRefs(caseStudyStore);
const { fetchData: fetchCaseStudies } = caseStudyStore;

const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
    if (!caseStudies.value?.length) {
        fetchCaseStudies();
    }
});
</script>

<template>
    <section
        id="case-studies"
        ref="sectionRef"
        class="case-studies-section animate-container"
    >
        <div class="container">
            <header class="case-studies-section__header animate-child">
                <h2 class="case-studies-section__title">{{ t('caseStudies.title') }}</h2>
                <p class="case-studies-section__subtitle">
                    {{ t('caseStudies.subtitle') }}
                </p>
            </header>

            <div class="case-studies-section__body animate-child" style="--stagger-delay: 0.2s">
                <div v-if="isLoading" class="case-studies-section__list">
                    <SkeletonCard
                        v-for="i in 3"
                        :key="i"
                        class="case-studies-section__item-skeleton"
                    />
                </div>
                <AppStatus
                    v-else-if="error || !caseStudies?.length"
                    :error="error"
                    :is-empty="!caseStudies?.length"
                    :loading-text="t('caseStudies.loading')"
                    :error-text-prefix="t('caseStudies.error')"
                    :empty-text="t('caseStudies.empty')"
                    class="case-studies-section__status"
                />
                <div
                    v-if="!isLoading && !error && caseStudies?.length"
                    class="case-studies-section__list"
                >
                    <CaseStudyCard
                        v-for="caseItem in caseStudies"
                        :key="caseItem.id"
                        :case-data="caseItem"
                        variant="inverted"
                        class="case-studies-section__item"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.case-studies-section {
    padding: rem(100px) 0;
    background: $color-text-primary;
    transition: background-color 0.3s ease;

    @include responsive($tablet) {
        padding: rem(60px) 0;
    }

    &__header {
        text-align: center;
        max-width: rem(540px);
        margin: 0 auto;
    }

    &__status {
        color: $case-study-card-description;

        :deep(.app-status__spinner) {
            border-color: rgba(0, 0, 0, 0.1);
            border-top-color: $color-accent-primary;
        }
    }

    &__title {
        color: $color-background;
    }

    &__subtitle {
        margin-top: rem(16px);
        color: $case-study-card-description;
        font-size: rem(18px);
    }

    &__body {
        margin-top: rem(80px);
        @include responsive($tablet) {
            margin-top: rem(60px);
        }
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: rem(80px);
        @include responsive($tablet) {
            gap: rem(60px);
        }
    }

    &__item {
        &:nth-child(even) {
            flex-direction: row-reverse;
        }

        @include responsive($tablet) {
            &:nth-child(even) {
                flex-direction: column;
            }
        }
    }
}
</style>
