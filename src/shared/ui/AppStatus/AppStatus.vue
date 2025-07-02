<script setup lang="ts">
interface Props {
    isLoading?: boolean;
    error?: string | null;
    isEmpty?: boolean;
    loadingText?: string;
    errorTextPrefix?: string;
    emptyText?: string;
}

withDefaults(defineProps<Props>(), {
    isLoading: false,
    error: null,
    isEmpty: false,
    loadingText: 'Загрузка...',
    errorTextPrefix: 'Ошибка загрузки',
    emptyText: 'Данные не найдены.',
});
</script>

<template>
    <div v-if="isLoading" class="app-status app-status--loading">
        <div class="app-status__spinner"></div>
        <p>{{ loadingText }}</p>
    </div>
    <div v-else-if="error" class="app-status app-status--error">
        <p>{{ errorTextPrefix }}: {{ error }}</p>
    </div>
    <div v-else-if="isEmpty" class="app-status app-status--empty">
        <p>{{ emptyText }}</p>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.app-status {
    @include flex-center(column);
    gap: rem(20px);
    padding: rem(40px) 0;
    font-size: rem(20px);
    text-align: center;
    color: $color-text-secondary;

    &--error {
        color: $color-special-icon;
    }

    &__spinner {
        width: rem(40px);
        height: rem(40px);
        border: rem(4px) solid $color-border;
        border-top-color: $color-accent-primary;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
