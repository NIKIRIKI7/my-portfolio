import type { Testimonial } from '../model/types';

import client1 from '/assets/images/testimonials/client__item-1.png';
import client2 from '/assets/images/testimonials/client__item-2.png';
import client3 from '/assets/images/testimonials/client__item-3.png';
import client4 from '/assets/images/testimonials/client__item-4.png';

const mockData: Testimonial[] = [
    {
        id: 1,
        textKey: 'testimonialsData.item1.text',
        authorNameKey: 'testimonialsData.item1.authorName',
        authorImage: client1,
    },
    {
        id: 2,
        textKey: 'testimonialsData.item2.text',
        authorNameKey: 'testimonialsData.item2.authorName',
        authorImage: client2,
    },
    {
        id: 3,
        textKey: 'testimonialsData.item3.text',
        authorNameKey: 'testimonialsData.item3.authorName',
        authorImage: client3,
    },
    {
        id: 4,
        textKey: 'testimonialsData.item4.text',
        authorNameKey: 'testimonialsData.item4.authorName',
        authorImage: client4,
    },
];

export const fetchTestimonialsApi = async (): Promise<Testimonial[]> => {
    return mockData;
};
