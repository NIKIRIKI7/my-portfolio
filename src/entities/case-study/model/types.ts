export type CaseTagType = 'fintech' | 'edtech' | 'pharma';

export interface CaseTag {
    textKey: string;
    type: CaseTagType;
}

export interface CaseStudy {
    id: number;
    titleKey: string;
    descriptionKey: string;
    image: string;
    tag: CaseTag;
    link?: string;
}
