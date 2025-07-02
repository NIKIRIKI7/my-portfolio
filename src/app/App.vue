<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSeo } from '@/shared/lib/use/useSeo';
import { ImageViewer } from '@/features/image-viewer';
import { CustomCursor } from '@/features/custom-cursor';
import {
    useEasterEggStore,
    ParticleExplosion,
    PacmanGame,
} from '@/features/easter-egg';
import nikitaPhoto from '/assets/images/Nikita.png';

useSeo(nikitaPhoto);

const easterEggStore = useEasterEggStore();
const { stage } = storeToRefs(easterEggStore);

const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];
let userInput: string[] = [];

const handleKonami = (event: KeyboardEvent) => {
    userInput.push(event.key);
    userInput = userInput.slice(-konamiCode.length);

    if (userInput.join('') === konamiCode.join('')) {
        easterEggStore.activate();
    }
};

onMounted(() => window.addEventListener('keydown', handleKonami));
onUnmounted(() => window.removeEventListener('keydown', handleKonami));
</script>

<template>
    <div
        class="main-app-wrapper"
        :class="{ 'is-fading-out': stage === 'exploding' }"
    >
        <template v-if="stage === 'idle' || stage === 'exploding'">
            <CustomCursor />
            <RouterView />
            <ImageViewer />
        </template>
    </div>

    <ParticleExplosion
        v-if="stage === 'exploding'"
        @animation-finished="easterEggStore.startGame"
    />

    <PacmanGame v-if="stage === 'playing'" />
</template>

<style lang="scss">
.main-app-wrapper {
    transition: opacity 0.5s ease-out;
}
.main-app-wrapper.is-fading-out {
    opacity: 0;
    pointer-events: none;
}
</style>
