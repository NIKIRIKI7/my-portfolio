<script setup lang="ts">
import AppSkeleton from '../AppSkeleton';

</script>

<template>
    <div class="skeleton-card">
        <AppSkeleton class="skeleton-card__image" />
        <div class="skeleton-card__content">
            <AppSkeleton class="skeleton-card__title" />
            <AppSkeleton class="skeleton-card__line" />
            <AppSkeleton class="skeleton-card__line skeleton-card__line--short" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.skeleton-card {
    background-color: $color-background;
    border: 1px solid $color-border;
    border-radius: rem(8);
    overflow: hidden;
    width: 100%;

    &__image {
        width: 100%;
        height: rem(310);

        @include responsive($mobile) {
            height: rem(240);
        }
    }

    &__content {
        padding: rem(25) rem(30) rem(30);
        display: flex;
        flex-direction: column;
        gap: rem(12);

        @include responsive($mobile) {
            padding: rem(20);
        }
    }

    &__title {
        width: 60%;
        height: rem(24);
        margin-bottom: rem(10);
    }

    &__line {
        width: 100%;
        height: rem(14);

        &--short {
            width: 80%;
        }
    }
}
</style>
