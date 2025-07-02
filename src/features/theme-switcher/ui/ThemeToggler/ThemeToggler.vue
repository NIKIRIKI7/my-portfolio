<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '../../model/store';
import IconSun from '@/shared/assets/icons/IconSun.vue';
import IconMoon from '@/shared/assets/icons/IconMoon.vue';

const { t } = useI18n();
const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
const { toggleTheme } = themeStore;
</script>

<template>
    <button
        class="theme-toggler"
        :aria-label="t(theme === 'dark' ? 'theme.switchToLight' : 'theme.switchToDark')"
        @click="toggleTheme"
    >
        <Transition name="fade" mode="out-in">
            <component :is="theme === 'dark' ? IconSun : IconMoon" :key="theme" />
        </Transition>
    </button>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.theme-toggler {
    color: $color-text-secondary;
    width: rem(40px);
    height: rem(40px);
    @include flex-center;
    transition: color 0.3s ease;

    @include on-event {
        color: $color-accent-primary;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
