<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useHeroStore } from '../model/store';
import AppButton from '@/shared/ui/AppButton';
import { generateImageSources, type ImageSources } from '@/shared/lib/image-helpers';

const { t } = useI18n();
const heroStore = useHeroStore();
const { heroData, workedWith } = storeToRefs(heroStore);
const photoSources = computed<ImageSources>(() => generateImageSources(heroData.value.photo));

const cvPath = computed(() => `${import.meta.env.BASE_URL}cv.pdf`);

const heroSectionRef = ref<HTMLElement | null>(null);
</script>

<template>
    <section ref="heroSectionRef" class="hero-section animate-container">
        <div class="hero-section__container container">
            <div class="hero-section__content">
                <div class="hero-section__info">
                    <h1 class="hero-section__title animate-child">
                        {{ t(heroData.nameKey) }}
                    </h1>
                    <p
                        class="hero-section__description animate-child"
                        style="--stagger-delay: 0.1s"
                    >
                        {{ t(heroData.introTextKey) }}
                    </p>
                    <div class="hero-section__actions animate-child" style="--stagger-delay: 0.2s">
                        <AppButton :to="{ path: '/', hash: '#contact' }" theme="primary">
                            {{ t(heroData.buttonTextKey) }}
                        </AppButton>
                        <AppButton :href="cvPath" theme="secondary" download>
                            {{ t('hero.downloadCV') }}
                        </AppButton>
                    </div>
                </div>
                <div
                    class="hero-section__photo-wrapper animate-child"
                    style="--stagger-delay: 0.1s"
                >
                    <picture>
                        <source :srcset="photoSources.avif" type="image/avif" />
                        <source :srcset="photoSources.webp" type="image/webp" />
                        <img
                            :src="photoSources.original"
                            alt="Portrait of Nikita Gorobets"
                            class="hero-section__photo"
                            loading="eager"
                            width="400"
                            height="400"
                        />
                    </picture>
                </div>
            </div>

            <div
                class="hero-section__worked-with worked-with animate-child"
                style="--stagger-delay: 0.3s"
            >
                <p class="worked-with__title">{{ t('hero.workedWith') }}</p>
                <ul class="worked-with__list">
                    <li v-for="company in workedWith" :key="company.name" class="worked-with__item">
                        <component :is="company.icon" class="worked-with__icon" />
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.hero-section {
    position: relative;
    background-color: transparent;

    &__container {
        display: flex;
        flex-direction: column;
    }
    &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: rem(30px);
        padding: rem(80px) 0 0 0;
        @include responsive($tablet) {
            flex-direction: column-reverse;
            text-align: center;
            gap: rem(40px);
        }
    }
    &__info {
        flex: 1;
        max-width: rem(540px);
        @include responsive($tablet) {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
    &__title {
        color: $color-text-primary;
        font-size: rem(80px);
        line-height: 1.1;
        @include responsive($tablet) {
            font-size: rem(64px);
        }
        @include responsive($mobile) {
            font-size: rem(48px);
        }
    }
    &__description {
        color: $color-text-secondary;
        margin-top: rem(24px);
        line-height: 1.6;
        font-size: rem(18px);
        @include responsive($mobile) {
            font-size: rem(16px);
        }
    }
    &__actions {
        margin-top: rem(30px);
        display: flex;
        align-items: center;
        gap: rem(20px);
        white-space: nowrap;

        @include responsive($mobile) {
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: rem(300px);
        }

        .app-button {
            padding: rem(21px) rem(64px);
            font-size: rem(18px);

            @include responsive($mobile) {
                padding: rem(18px) rem(32px);
                font-size: rem(16px);
                width: 100%;
            }
        }
    }
    &__photo-wrapper {
        flex-shrink: 0;
    }
    &__photo {
        width: rem(400px);
        height: rem(400px);
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid $color-border;
        transition: border-color 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

        @include responsive($tablet) {
            width: rem(320px);
            height: rem(320px);
        }
        @include responsive($mobile) {
            width: rem(280px);
            height: rem(280px);
        }
    }
    &__worked-with {
        padding: rem(57px) 0 0 0;
    }
}
.worked-with {
    &__title {
        color: $color-text-secondary;
        @include responsive($tablet) {
            text-align: center;
        }
    }
    &__list {
        padding: rem(20px) 0 rem(45px) 0;
        display: flex;
        justify-content: space-between;
        gap: rem(20px);
        list-style: none;
        @include responsive($tablet) {
            flex-wrap: wrap;
            justify-content: center;
        }
    }
    &__icon {
        :deep(rect) {
            stroke: $color-border;
        }
        :deep(path) {
            fill: $color-text-primary;
        }
    }
}

[data-theme='dark'] {
    .hero-section__title,
    .hero-section__description,
    .worked-with__title {
        @include apply-text-shadow-for-contrast;
    }
}
</style>
