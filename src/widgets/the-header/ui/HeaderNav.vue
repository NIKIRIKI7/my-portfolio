<script setup lang="ts">
import type { PropType, Component } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useNavigationStore } from '@/widgets/the-header/model/navigationStore';
import HeaderSocials from './HeaderSocials.vue';
import { LanguageSwitcher } from '@/features/language-switcher';

interface NavLink {
    textKey: string;
    to: string;
}

interface SocialLink {
    url: string;
    icon: Component;
    labelKey: string;
}

defineProps({
    links: {
        type: Array as PropType<NavLink[]>,
        required: true,
    },
    socialLinks: {
        type: Array as PropType<SocialLink[]>,
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits<{ (e: 'navigated'): void }>();

const { t } = useI18n();
const navigationStore = useNavigationStore();
const { activeSectionId } = storeToRefs(navigationStore);

function isLinkActive(link: NavLink): boolean {
    const linkId = link.to.split('#')[1] ?? '';
    if (linkId === 'home') {
        return activeSectionId.value === 'home' || !activeSectionId.value;
    }
    return activeSectionId.value === linkId;
}
</script>

<template>
    <div class="header-nav-wrapper" :class="{ 'header-nav-wrapper--is-open': isOpen }">
        <nav class="header-nav-wrapper__nav">
            <ul class="header-nav">
                <li v-for="link in links" :key="link.to" class="header-nav__item">
                    <RouterLink
                        :to="link.to"
                        :class="[
                            'header-nav__link',
                            { 'header-nav__link--active': isLinkActive(link) },
                        ]"
                        @click="emit('navigated')"
                    >
                        {{ t(link.textKey) }}
                    </RouterLink>
                </li>
            </ul>
        </nav>
        <div class="header-nav-wrapper__mobile-controls">
            <HeaderSocials :links="socialLinks" />
            <LanguageSwitcher />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.header-nav {
    display: flex;
    align-items: center;
    list-style: none;
}

.header-nav__link {
    @include apply-font($font-family-text, 500, rem(16px));
    text-decoration: none;
    padding: rem(8px) rem(16px);
    border-radius: rem(6px);
    transition: all 0.3s ease;
    color: $color-text-secondary;
    white-space: nowrap;

    &--active {
        color: $color-accent-primary;
    }

    @include on-event {
        &:not(.header-nav__link--active) {
            color: $color-text-primary;
        }
    }
}

.header-nav-wrapper {
    &__mobile-controls {
        display: none;
    }

    @include responsive($laptop) {
        position: fixed;
        top: 0;
        left: 0;
        width: 80%;
        max-width: rem(320px);
        height: 100dvh;
        background-color: $color-background;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: rem(20px);
        transform: translateX(-100%);
        transition:
            transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
            background-color 0.3s ease;

        &--is-open {
            transform: translateX(0);
        }

        .header-nav {
            flex-direction: column;
            gap: rem(40px);
            text-align: center;
        }

        .header-nav__link {
            font-size: rem(20px);
        }

        &__mobile-controls {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: rem(25px);
            margin-top: rem(50px);
            padding-top: rem(30px);
            border-top: 1px solid $color-border;
            width: 100%;
        }
    }
}

[data-theme='dark'] .header-nav__link {
    @include apply-text-shadow-for-contrast;
}
</style>
