<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLanguageStore } from '../../model/store';
import type { Language } from '../../model/types';

const languageStore = useLanguageStore();
const { language } = storeToRefs(languageStore);

const availableLanguages: Language[] = ['ru', 'en'];
</script>

<template>
    <div class="language-switcher">
        <button
            v-for="lang in availableLanguages"
            :key="lang"
            class="language-switcher__button"
            :class="{ 'language-switcher__button--active': language === lang }"
            @click="languageStore.setLanguage(lang)"
        >
            {{ lang.toUpperCase() }}
        </button>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.language-switcher {
    display: flex;
    align-items: center;
    gap: rem(5px);
    border: 1px solid $color-border;
    border-radius: rem(6px);
    padding: rem(4px);
    background-color: $color-background;
    transition: all 0.3s ease;

    &__button {
        font-family: $font-family-text;
        font-weight: 500;
        font-size: rem(14px);
        padding: rem(4px) rem(8px);
        border-radius: rem(4px);
        color: $color-text-secondary;
        transition: all 0.3s ease;

        &--active {
            color: $color-text-primary;
            background-color: $case-study-card-description;
        }

        @include on-event {
            &:not(.language-switcher__button--active) {
                color: $color-text-primary;
            }
        }
    }
}
</style>
