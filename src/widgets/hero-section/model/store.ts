import { defineStore } from 'pinia';
import { shallowRef, type Component } from 'vue';

import photoUrl from '/assets/images/Nikita.png';
import IconClickUp from '@/shared/assets/icons/companies/IconClickUp.vue';
import IconDropbox from '@/shared/assets/icons/companies/IconDropbox.vue';
import IconPaychex from '@/shared/assets/icons/companies/IconPaychex.vue';
import IconElastic from '@/shared/assets/icons/companies/IconElastic.vue';
import IconStripe from '@/shared/assets/icons/companies/IconStripe.vue';

interface HeroData {
    nameKey: string;
    introTextKey: string;
    buttonTextKey: string;
    photo: string;
}

interface WorkedWithCompany {
    name: string;
    icon: Component;
}

export const useHeroStore = defineStore('hero-section', () => {
    const heroData = shallowRef<HeroData>({
        nameKey: 'hero.name',
        introTextKey: 'hero.introText',
        buttonTextKey: 'hero.buttonText',
        photo: photoUrl,
    });

    const workedWith = shallowRef<WorkedWithCompany[]>([
        { name: 'ClickUp', icon: IconClickUp },
        { name: 'Dropbox', icon: IconDropbox },
        { name: 'Paychex', icon: IconPaychex },
        { name: 'Elastic', icon: IconElastic },
        { name: 'Stripe', icon: IconStripe },
    ]);

    return {
        heroData,
        workedWith,
    };
});
