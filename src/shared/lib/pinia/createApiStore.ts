import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export function createApiStore<T>(
    storeId: string,
    fetchApi: () => Promise<T[]>,
    errorContext: string = 'данных',
) {
    return defineStore(storeId, () => {
        const data: Ref<T[] | null> = ref(null);
        const isLoading: Ref<boolean> = ref(false);
        const error: Ref<string | null> = ref(null);

        async function fetchData(): Promise<void> {
            if (isLoading.value || data.value) return;

            isLoading.value = true;
            error.value = null;
            try {
                data.value = await fetchApi();
            } catch (e) {
                const message = e instanceof Error ? e.message : 'Произошла неизвестная ошибка';
                error.value = message;
                console.error(`Ошибка при загрузке ${errorContext}:`, message);
            } finally {
                isLoading.value = false;
            }
        }

        return {
            data,
            isLoading,
            error,
            fetchData,
        };
    });
}
