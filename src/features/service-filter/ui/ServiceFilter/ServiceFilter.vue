<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useServiceFilterStore } from '../../model/store';

const { t } = useI18n();
const filterStore = useServiceFilterStore();
const { categories, activeCategory } = storeToRefs(filterStore);
const { setActiveCategory } = filterStore;
</script>

<template>
    <div class="service-filter">
        <button
            v-for="category in categories"
            :key="category.id"
            :class="[
                'service-filter__button',
                { 'service-filter__button--active': activeCategory === category.id },
            ]"
            @click="setActiveCategory(category.id)"
        >
            {{ t(category.nameKey) }}
        </button>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.service-filter {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: rem(10px);

    &__button {
        padding: rem(10px) rem(20px);
        border-radius: rem(100px);
        border: 1px solid $color-border;
        color: $color-text-secondary;
        background-color: transparent;
        font-family: $font-family-text;
        font-weight: 500;
        transition: all 0.3s ease;

        @include on-event {
            border-color: $color-accent-primary;
            color: $color-accent-primary;
        }

        &--active {
            background-color: $color-accent-primary;
            border-color: $color-accent-primary;
            color: $color-background;
            [data-theme='light'] & {
                color: #ffffff;
            }
        }
    }
}
</style>
