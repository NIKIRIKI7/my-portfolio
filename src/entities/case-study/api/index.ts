import type { CaseStudy } from '../model/types';

import fintechImage from '/assets/images/case-studies/work__item-1.png';
import edtechImage from '/assets/images/case-studies/work__item-2.png';
import pharmaImage from '/assets/images/case-studies/work__item-3.png';

const mockData: CaseStudy[] = [
    {
        id: 1,
        titleKey: 'caseStudiesData.item1.title',
        descriptionKey: 'caseStudiesData.item1.description',
        image: fintechImage,
        tag: { textKey: 'caseStudiesData.item1.tag', type: 'fintech' },
        link: 'https://nikiriki7.github.io/ClinicApp/',
    },
    {
        id: 2,
        titleKey: 'caseStudiesData.item2.title',
        descriptionKey: 'caseStudiesData.item2.description',
        image: edtechImage,
        tag: { textKey: 'caseStudiesData.item2.tag', type: 'edtech' },
    },
    {
        id: 3,
        titleKey: 'caseStudiesData.item3.title',
        descriptionKey: 'caseStudiesData.item3.description',
        image: pharmaImage,
        tag: { textKey: 'caseStudiesData.item3.tag', type: 'pharma' },
    },
];

export const fetchCaseStudiesApi = async (): Promise<CaseStudy[]> => {
    return mockData;
};
