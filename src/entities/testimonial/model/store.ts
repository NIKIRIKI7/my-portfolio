import { createApiStore } from '@/shared/lib/pinia/createApiStore';
import { fetchTestimonialsApi } from '../api';
import type { Testimonial } from './types';

export const useTestimonialStore = createApiStore<Testimonial>(
    'testimonial',
    fetchTestimonialsApi,
    'отзывов',
);
