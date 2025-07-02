<script setup lang="ts">
import { onMounted, ref, type Ref, type ComponentPublicInstance } from 'vue';
import TheHeader from '@/widgets/the-header';
import HeroSection from '@/widgets/hero-section';
import SkillsSection from '@/widgets/skills-section';
import ServicesSection from '@/widgets/services-section';
import CaseStudiesSection from '@/widgets/case-studies-section';
import TestimonialsSection from '@/widgets/testimonials-section';
import RecentWorkSection from '@/widgets/recent-work-section';
import GetInTouchSection from '@/widgets/get-in-touch-section';
import TheFooter from '@/widgets/the-footer';
import { AnimatedBackground } from '@/features/animated-background';
import { useScrollSpy } from '@/shared/lib/use/useScrollSpy';
import { useIntersectionObserver } from '@/shared/lib/use/useIntersectionObserver';

const heroSectionRef = ref<ComponentPublicInstance | null>(null);
const skillsSectionRef = ref<ComponentPublicInstance | null>(null);
const servicesSectionRef = ref<ComponentPublicInstance | null>(null);
const caseStudiesSectionRef = ref<ComponentPublicInstance | null>(null);
const testimonialsSectionRef = ref<ComponentPublicInstance | null>(null);
const recentWorkSectionRef = ref<ComponentPublicInstance | null>(null);
const contactSectionRef = ref<ComponentPublicInstance | null>(null);
const footerRef = ref<ComponentPublicInstance | null>(null);

const sectionElements: Ref<Element[]> = ref([]);

onMounted(() => {
    const sectionsRefs = [
        heroSectionRef.value,
        skillsSectionRef.value,
        servicesSectionRef.value,
        caseStudiesSectionRef.value,
        testimonialsSectionRef.value,
        recentWorkSectionRef.value,
        contactSectionRef.value,
        footerRef.value,
    ];
    sectionElements.value = sectionsRefs.map((comp) => comp?.$el as Element).filter(Boolean);
});

useScrollSpy(sectionElements);
useIntersectionObserver(sectionElements, {
    threshold: 0.1,
    animationClass: 'is-visible',
});
</script>

<template>
    <div class="home-page">
        <AnimatedBackground class="home-page__background" />
        <TheHeader />
        <HeroSection id="home" ref="heroSectionRef" />
        <main>
            <SkillsSection id="skills" ref="skillsSectionRef" />
            <ServicesSection id="services" ref="servicesSectionRef" />
            <CaseStudiesSection id="case-studies" ref="caseStudiesSectionRef" />
            <TestimonialsSection id="testimonials" ref="testimonialsSectionRef" />
            <RecentWorkSection id="recent-work" ref="recentWorkSectionRef" />
            <GetInTouchSection id="contact" ref="contactSectionRef" />
        </main>
        <TheFooter ref="footerRef" />
    </div>
</template>

<style lang="scss" scoped>
.home-page {
    background-color: var(--color-background);
    position: relative;
    z-index: 1;

    &__background {
        display: block; // Отображаем фон по умолчанию для всех тем
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
    }
}
</style>
