import { createApiStore } from '@/shared/lib/pinia/createApiStore';
import { fetchServicesApi } from '../api';
import type { Service } from './types';

export const useServiceStore = createApiStore<Service>('service', fetchServicesApi, 'услуг');
