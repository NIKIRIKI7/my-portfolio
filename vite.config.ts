// vite.config.ts

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    base: '/my-portfolio/',
    plugins: [
        vue(),
        legacy({
            targets: ['defaults', 'not IE 11'],
            renderLegacyChunks: true,
            modernPolyfills: true,
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        postcss: {
            plugins: [autoprefixer({})],
        },
    },
});
