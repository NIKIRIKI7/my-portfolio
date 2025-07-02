interface SiteConfig {
    readonly SITE_URL: string;
    readonly PERSON_NAME: string;
    readonly PERSON_JOB_TITLE: string;
    readonly SOCIAL_LINKS: {
        readonly LINKEDIN: string;
        readonly TWITTER: string;
        readonly GITHUB: string;
    };
}

export const siteConfig: SiteConfig = {
    SITE_URL: 'https://nikiriki7.github.io/my-portfolio/',
    PERSON_NAME: 'Никита Горобец',
    PERSON_JOB_TITLE: 'Веб-разработчик',
    SOCIAL_LINKS: {
        LINKEDIN: 'https://www.linkedin.com/in/your-profile/',
        TWITTER: 'https://twitter.com/your-profile',
        GITHUB: 'https://github.com/nikiriki7',
    },
};
