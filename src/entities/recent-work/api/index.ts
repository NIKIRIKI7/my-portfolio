import type { RecentWork } from '../model/types';

import workImage1 from '/assets/images/recent-work/work__item-1.png';
import workImage2 from '/assets/images/recent-work/work__item-2.png';
import workImage3 from '/assets/images/recent-work/work__item-3.png';
import workImage4 from '/assets/images/recent-work/work__item-4.png';

const mockData: RecentWork[] = [
    {
        id: 1,
        titleKey: 'recentWorksData.item1.title',
        descriptionKey: 'recentWorksData.item1.description',
        image: workImage1,
    },
    {
        id: 2,
        titleKey: 'recentWorksData.item2.title',
        descriptionKey: 'recentWorksData.item2.description',
        image: workImage2,
    },
    {
        id: 3,
        titleKey: 'recentWorksData.item3.title',
        descriptionKey: 'recentWorksData.item3.description',
        image: workImage3,
    },
    {
        id: 4,
        titleKey: 'recentWorksData.item4.title',
        descriptionKey: 'recentWorksData.item4.description',
        image: workImage4,
    },
];

export const fetchRecentWorksApi = async (): Promise<RecentWork[]> => {
    return mockData;
};
