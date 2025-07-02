import { ref, computed, type Ref } from 'vue';
import { SLIDER_GAP } from '@/shared/config/constants';

interface SliderConfig {
    slidesPerView: Ref<number>;
}

export function useSlider<T>(items: Ref<T[] | null>, config: SliderConfig) {
    const currentIndex = ref(0);

    const isPrevDisabled = computed(() => currentIndex.value === 0);

    const isNextDisabled = computed(() => {
        if (!items.value) {
            return true;
        }
        return currentIndex.value >= items.value.length - config.slidesPerView.value;
    });

    const next = () => {
        if (!isNextDisabled.value) {
            currentIndex.value++;
        }
    };

    const prev = () => {
        if (!isPrevDisabled.value) {
            currentIndex.value--;
        }
    };

    const sliderOffset = computed(() => {
        const gap = SLIDER_GAP;
        const slidesPerViewValue = config.slidesPerView.value;
        const index = currentIndex.value;

        const slideWidthFormula = `(100% - ${(slidesPerViewValue - 1) * gap}px) / ${slidesPerViewValue}`;
        const offsetFormula = `-${index} * ((${slideWidthFormula}) + ${gap}px)`;

        return `calc(${offsetFormula})`;
    });

    return {
        currentIndex,
        isPrevDisabled,
        isNextDisabled,
        sliderOffset,
        next,
        prev,
    };
}
