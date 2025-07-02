import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { siteConfig } from '@/shared/config/site';

export function useSeo(photoUrl: string) {
    const route = useRoute();

    useHead(
        computed(() => {
            const title = (route.meta.title as string) || 'Портфолио Никиты Горобца';
            const description =
                (route.meta.description as string) ||
                'Портфолио веб-разработчика и дизайнера. Создание интуитивно понятных и эффективных веб-решений.';
            const fullPhotoUrl = `${siteConfig.SITE_URL}${photoUrl.replace(/^\//, '')}`;

            const personSchema = {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: siteConfig.PERSON_NAME,
                url: siteConfig.SITE_URL,
                jobTitle: siteConfig.PERSON_JOB_TITLE,
                sameAs: [
                    siteConfig.SOCIAL_LINKS.LINKEDIN,
                    siteConfig.SOCIAL_LINKS.TWITTER,
                    siteConfig.SOCIAL_LINKS.GITHUB,
                ],
                image: fullPhotoUrl,
            };

            const websiteSchema = {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                url: siteConfig.SITE_URL,
                name: title,
                author: {
                    '@type': 'Person',
                    name: siteConfig.PERSON_NAME,
                },
                description,
            };

            return {
                title,
                meta: [
                    {
                        name: 'description',
                        content: description,
                    },
                ],
                link: [
                    {
                        rel: 'preload',
                        href: photoUrl,
                        as: 'image',
                        type: 'image/png',
                    },
                ],
                script: [
                    {
                        type: 'application/ld+json',
                        children: JSON.stringify(personSchema),
                        id: 'person-schema',
                    },
                    {
                        type: 'application/ld+json',
                        children: JSON.stringify(websiteSchema),
                        id: 'website-schema',
                    },
                ],
            };
        }),
    );
}
