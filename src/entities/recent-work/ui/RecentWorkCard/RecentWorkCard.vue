<script setup lang="ts">
import { type PropType, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { RecentWork } from '../../model/types';
import BaseCard from '@/shared/ui/BaseCard';
import AppButton from '@/shared/ui/AppButton';
import { useImageViewerStore } from '@/features/image-viewer';
import { generateImageSources } from '@/shared/lib/image-helpers';

const props = defineProps({
    workData: {
        type: Object as PropType<RecentWork>,
        required: true,
    },
});

const { t } = useI18n();
const imageViewerStore = useImageViewerStore();

const imageSources = computed(() => generateImageSources(props.workData.image));
</script>

<template>
    <BaseCard
        :image-src="imageSources.original"
        :image-alt="t(workData.titleKey)"
        class="recent-work-card"
        @image-click="imageViewerStore.open(workData.image)"
    >
        <template #image>
            <picture>
                <source :srcset="imageSources.avif" type="image/avif" />
                <source :srcset="imageSources.webp" type="image/webp" />
                <img :src="imageSources.original" :alt="t(workData.titleKey)" loading="lazy" />
            </picture>
        </template>
        <template #title>{{ t(workData.titleKey) }}</template>
        <template #description>{{ t(workData.descriptionKey) }}</template>
        <template #action>
            <AppButton theme="primary" to="/#recent-work">
                {{ t('recentWork.buttonText') }}
            </AppButton>
        </template>
    </BaseCard>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.recent-work-card {
    background-color: $recent-work-card-bg;
    border: 1px solid $color-border;
    border-radius: rem(8px);
    overflow: hidden;
    flex-shrink: 0;

    flex-direction: column;
    gap: 0;

    :deep(.base-card__image-wrapper) {
        max-width: 100%;
    }

    :deep(.base-card__content) {
        padding: rem(25px) rem(30px) rem(30px);
        text-align: left;
        max-width: 100%;
        align-content: space-between;
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
