<script setup lang="ts">
import AppSkeleton from '@/shared/ui/AppSkeleton';
</script>

<template>
    <div class="skeleton-service-card">
        <AppSkeleton class="skeleton-service-card__icon" />
        <div class="skeleton-service-card__content">
            <AppSkeleton class="skeleton-service-card__title" />
            <AppSkeleton class="skeleton-service-card__line" />
            <AppSkeleton class="skeleton-service-card__line skeleton-service-card__line--short" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.skeleton-service-card {
  background-color: transparent;
  border: 1px solid $color-border;
  border-radius: rem(8);
  padding: rem(30px);
  display: flex;
  flex-direction: column;
  gap: rem(20px);

  &__icon {
    width: rem(48px);
    height: rem(48px);
    border-radius: rem(8px);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: rem(12px);
  }

  &__title {
    width: 60%;
    height: rem(22px);
    margin-bottom: rem(8px);
  }

  &__line {
    width: 100%;
    height: rem(14px);

    &--short {
      width: 80%;
    }
  }
}
</style>
