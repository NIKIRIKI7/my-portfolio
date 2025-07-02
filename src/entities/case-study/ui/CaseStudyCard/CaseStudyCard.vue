<script setup lang="ts">
import { type PropType, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { type CaseStudy, type CaseTagType } from '../../model/types';
import BaseCard from '@/shared/ui/BaseCard';
import AppButton from '@/shared/ui/AppButton';
import { useImageViewerStore } from '@/features/image-viewer';
import { generateImageSources } from '@/shared/lib/image-helpers';

const props = defineProps({
    caseData: {
        type: Object as PropType<CaseStudy>,
        required: true,
    },
});

const { t } = useI18n();
const imageViewerStore = useImageViewerStore();

const imageSources = computed(() => generateImageSources(props.caseData.image));
const cardVariant = 'inverted';

type AccentButtonTheme = 'accent-1' | 'accent-2' | 'accent-3';
const themeMap: Record<CaseTagType, AccentButtonTheme> = {
    fintech: 'accent-1',
    edtech: 'accent-2',
    pharma: 'accent-3',
};
const buttonTheme = computed<AccentButtonTheme>(() => themeMap[props.caseData.tag.type]);
</script>

<template>
    <BaseCard
        :variant="cardVariant"
        :image-src="imageSources.original"
        :image-alt="t(caseData.titleKey)"
        class="case-study-card"
        @image-click="imageViewerStore.open(caseData.image)"
    >
        <template #image>
            <picture>
                <source :srcset="imageSources.avif" type="image/avif" />
                <source :srcset="imageSources.webp" type="image/webp" />
                <img :src="imageSources.original" :alt="t(caseData.titleKey)" loading="lazy" />
            </picture>
        </template>

        <template #tag>
            <span :class="['case-study-card__tag', `case-study-card__tag--${caseData.tag.type}`]">
                {{ t(caseData.tag.textKey) }}
            </span>
        </template>

        <template #title>{{ t(caseData.titleKey) }}</template>

        <template #description>{{ t(caseData.descriptionKey) }}</template>

        <template #action>
            <a
                v-if="caseData.link"
                :href="caseData.link"
                target="_blank"
                rel="noopener noreferrer"
                class="case-study-card__link"
            >
                <AppButton :theme="buttonTheme">{{ t('caseStudies.buttonText') }}</AppButton>
            </a>
            <AppButton v-else to="/#case-studies" :theme="buttonTheme">
                {{ t('caseStudies.buttonText') }}
            </AppButton>
        </template>
    </BaseCard>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.case-study-card {
    &__link {
        text-decoration: none;
    }
    &__tag {
        display: inline-block;
        padding: rem(8px) rem(16px);
        border-radius: rem(100px);
        font-family: $font-family-title;
        font-size: rem($font-size-tag-lg);
        font-weight: 500;
        color: $color-text-primary;

        &--fintech {
            background-color: $color-accent-tag-1;
        }
        &--edtech {
            background-color: $color-accent-tag-2;
        }
        &--pharma {
            background-color: $color-accent-tag-3;
        }
    }
}
</style>
