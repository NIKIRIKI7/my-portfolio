import { ref, onMounted, onUnmounted } from 'vue';

export function usePageVisibility() {
    const isVisible = ref(!document.hidden);

    const handleVisibilityChange = () => {
        isVisible.value = !document.hidden;
    };

    onMounted(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
    });

    onUnmounted(() => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    });

    return {
        isVisible,
    };
}
