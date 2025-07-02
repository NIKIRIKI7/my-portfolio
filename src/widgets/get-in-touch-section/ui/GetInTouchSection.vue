<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ContactForm } from '@/features/send-contact-form';

const { t } = useI18n();
</script>

<template>
    <section id="contact" class="get-in-touch-section animate-container">
        <div class="container">
            <header class="get-in-touch-section__header animate-child">
                <h2 class="get-in-touch-section__title">{{ t('getInTouch.title') }}</h2>
                <p class="get-in-touch-section__subtitle">
                    {{ t('getInTouch.subtitle') }}
                </p>
            </header>
            <div class="get-in-touch-section__body animate-child" style="--stagger-delay: 0.2s">
                <ContactForm />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.get-in-touch-section {
    padding: rem(100px) 0;
    transition: background-color 0.3s ease;

    @include responsive($tablet) {
        padding: rem(60px) 0;
    }

    &__header {
        text-align: center;
        max-width: rem(540px);
        margin: 0 auto;
    }

    &__title {
        color: $color-text-primary;
    }

    &__subtitle {
        margin-top: rem(16px);
        color: $color-text-secondary;
        font-size: rem(18px);
    }

    &__body {
        margin-top: rem(60px);
        max-width: rem(730px);
        margin-inline: auto;
    }
}
</style>
