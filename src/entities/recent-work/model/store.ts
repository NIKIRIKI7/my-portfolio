import { createApiStore } from '@/shared/lib/pinia/createApiStore';
import { fetchRecentWorksApi } from '../api';
import type { RecentWork } from './types';

export const useRecentWorkStore = createApiStore<RecentWork>(
    'recent-work',
    fetchRecentWorksApi,
    'последних работ',
);
