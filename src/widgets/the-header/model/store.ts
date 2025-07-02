import { defineStore } from 'pinia';
import { shallowRef } from 'vue';
import type { Component } from 'vue';

import IconLinkedin from '@/shared/assets/icons/IconLinkedin.vue';
import IconTwitter from '@/shared/assets/icons/IconTwitter.vue';

interface NavLink {
    textKey: string;
    to: string;
}

interface SocialLink {
    url: string;
    icon: Component;
    labelKey: string;
}

export const useHeaderStore = defineStore('header', () => {
    const navLinks = shallowRef<NavLink[]>([
        { textKey: 'nav.home', to: '/#home' },
        { textKey: 'nav.skills', to: '/#skills' },
        { textKey: 'nav.services', to: '/#services' },
        { textKey: 'nav.caseStudies', to: '/#case-studies' },
        { textKey: 'nav.testimonials', to: '/#testimonials' },
        { textKey: 'nav.recentWork', to: '/#recent-work' },
        { textKey: 'nav.contact', to: '/#contact' },
    ]);
    const socialLinks = shallowRef<SocialLink[]>([
        { url: 'https://linkedin.com', icon: IconLinkedin, labelKey: 'socials.linkedin' },
        { url: 'https://twitter.com', icon: IconTwitter, labelKey: 'socials.twitter' },
    ]);

    return {
        navLinks,
        socialLinks,
    };
});
