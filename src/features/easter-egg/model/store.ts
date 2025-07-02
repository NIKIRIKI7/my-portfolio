import { defineStore } from 'pinia';
import { ref } from 'vue';

type EasterEggStage = 'idle' | 'exploding' | 'playing';

export const useEasterEggStore = defineStore('easter-egg', () => {
    const stage = ref<EasterEggStage>('idle');

    function activate() {
        if (stage.value === 'idle') {
            stage.value = 'exploding';
        }
    }

    function startGame() {
        if (stage.value === 'exploding') {
            stage.value = 'playing';
        }
    }

    return {
        stage,
        activate,
        startGame,
    };
});
