<script setup lang="ts">
import type { PropType, Component } from 'vue';
import { useI18n } from 'vue-i18n';

interface SocialLink {
    url: string;
    icon: Component;
    labelKey: string;
}

defineProps({
    links: {
        type: Array as PropType<SocialLink[]>,
        required: true,
    },
});

const { t } = useI18n();
</script>
<template>
    <ul class="header-socials">
        <li v-for="social in links" :key="social.url" class="header-socials__item">
            <a
                :href="social.url"
                class="header-socials__link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="t(social.labelKey)"
                data-cursor="hover"
            >
                <component :is="social.icon" />
            </a>
        </li>
    </ul>
</template>
<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.header-socials {
    display: flex;
    align-items: center;
    gap: rem(25px);
    list-style: none;

    &__link {
        color: $color-text-secondary;
        transition: color 0.3s ease;
        display: flex;

        @include on-event {
            color: $color-accent-primary;
        }
    }
}

[data-theme='dark'] .header-socials__link {
    @include apply-text-shadow-for-contrast;
}
</style>
