<script setup lang="ts">
</script>

<template>
    <div class="skeleton"></div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.skeleton {
    background-color: $color-border;
    border-radius: rem(4);
    position: relative;
    overflow: hidden;

    // Анимация градиента
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -150%;
        height: 100%;
        width: 150%;
        background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 50%,
            transparent 100%
        );
        animation: shimmer 1.5s infinite;
    }
}

@keyframes shimmer {
    100% {
        left: 150%;
    }
}
</style>
