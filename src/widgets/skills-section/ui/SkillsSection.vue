<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useSkillStore, SkillBar } from '@/entities/skill';
import { useIntersectionObserver } from '@/shared/lib/use/useIntersectionObserver';

const { t } = useI18n();
const skillStore = useSkillStore();
const { skills } = storeToRefs(skillStore);

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const elementsToObserve = ref<(Element | null)[]>([]);

onMounted(() => {
    if (sectionRef.value) {
        elementsToObserve.value = [sectionRef.value];
    }
});

useIntersectionObserver(elementsToObserve, {
    threshold: 0.25,
    onIntersect: (entry, observer) => {
        if (entry.isIntersecting) {
            isVisible.value = true;
            observer.unobserve(entry.target);
        }
    },
});
</script>

<template>
    <section id="skills" ref="sectionRef" class="skills-section">
        <div class="container">
            <header class="skills-section__header">
                <h2 class="skills-section__title">{{ t('skills.title') }}</h2>
                <p class="skills-section__subtitle">
                    {{ t('skills.subtitle') }}
                </p>
            </header>
            <div class="skills-section__list">
                <SkillBar
                    v-for="skill in skills"
                    :key="skill.id"
                    :skill="skill"
                    :is-visible="isVisible"
                />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.skills-section {
    padding: rem(100px) 0;
    background-color: transparent;
    transition: background-color 0.3s ease;

    @include responsive($tablet) {
        padding: rem(60px) 0;
    }

    &__header {
        text-align: center;
        max-width: rem(540px);
        margin: 0 auto;
        margin-bottom: rem(80px);

        @include responsive($tablet) {
            margin-bottom: rem(60px);
        }
    }

    &__title {
        color: $color-text-primary;
    }

    &__subtitle {
        margin-top: rem(16px);
        color: $color-text-secondary;
        font-size: rem(18px);
    }

    &__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: rem(40px) rem(60px);

        @include responsive($tablet) {
            grid-template-columns: 1fr;
            gap: rem(30px);
        }
    }
}

[data-theme='dark'] .skills-section {
    .skills-section__title,
    .skills-section__subtitle {
        @include apply-text-shadow-for-contrast;
    }
}
</style>
