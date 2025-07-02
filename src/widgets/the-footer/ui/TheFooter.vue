<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <footer class="the-footer animate-container">
        <div class="container animate-child">
            <p class="the-footer__text">
                {{ t('footer.madeWith') }} <span class="the-footer__heart">❤</span>
            </p>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.the-footer {
    padding: rem(30px) 0;
    background-color: $color-background;
    transition: background-color 0.3s ease;

    &__text {
        text-align: center;
        color: $color-text-secondary;
        font-size: rem(14px);
    }

    &__heart {
        color: $color-special-icon;
    }
}
</style>
