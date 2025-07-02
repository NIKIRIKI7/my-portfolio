import { createApiStore } from '@/shared/lib/pinia/createApiStore';
import { fetchCaseStudiesApi } from '../api';
import type { CaseStudy } from './types';

export const useCaseStudyStore = createApiStore<CaseStudy>(
    'case-study',
    fetchCaseStudiesApi,
    'кейсов',
);
