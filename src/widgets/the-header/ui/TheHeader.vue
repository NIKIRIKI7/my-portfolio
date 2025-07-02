<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHeaderStore } from '@/widgets/the-header/model/store';
import { ThemeToggler } from '@/features/theme-switcher';
import { ToggleMobileMenu, useMobileMenuStore } from '@/features/toggle-mobile-menu';
import { LanguageSwitcher } from '@/features/language-switcher';
import HeaderNav from './HeaderNav.vue';
import HeaderSocials from './HeaderSocials.vue';

const headerStore = useHeaderStore();
const { navLinks, socialLinks } = storeToRefs(headerStore);

const mobileMenuStore = useMobileMenuStore();
const { isMenuOpen } = storeToRefs(mobileMenuStore);
const { closeMenu } = mobileMenuStore;
</script>

<template>
    <header class="the-header">
        <div class="the-header__container container">
            <div class="the-header__inner">
                <div class="the-header__menu-wrapper">
                    <HeaderNav
                        :links="navLinks"
                        :social-links="socialLinks"
                        :is-open="isMenuOpen"
                        @navigated="closeMenu"
                    />
                </div>

                <div class="the-header__actions">
                    <HeaderSocials :links="socialLinks" class="the-header__socials--desktop" />
                    <LanguageSwitcher class="the-header__lang-switcher--desktop" />
                    <ThemeToggler />
                    <ToggleMobileMenu class="the-header__burger" />
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.the-header {
    position: sticky;
    top: 0;
    z-index: 1000;

    &__inner {
        background: rgba(var(--color-border-rgb), 0.5);
        backdrop-filter: blur(10px);
        border-radius: rem(8px);
        height: rem(70px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-inline: rem(20px);
        transition: background-color 0.3s ease;
        gap: rem(40px);
    }

    &__menu-wrapper {
        flex-grow: 1;
        display: flex;
        justify-content: center;
    }

    &__actions {
        display: flex;
        align-items: center;
        gap: rem(10px);
        flex-shrink: 0;
    }

    &__burger {
        display: none;
        color: $color-text-primary;
        z-index: 101;
    }

    @include responsive($laptop) {
        &__burger {
            display: flex;
        }

        &__socials--desktop,
        &__lang-switcher--desktop {
            display: none;
        }
    }

    @include responsive($mobile) {
        &__inner {
            justify-content: flex-end;
        }
        &__menu-wrapper {
            display: contents;
        }
    }
}
</style>
