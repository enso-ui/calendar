import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@enso-ui/calendar': fileURLToPath(new URL('./', import.meta.url)),
            '@enso-ui/enums': fileURLToPath(new URL('../enums', import.meta.url)),
            '@enso-ui/ui': fileURLToPath(new URL('../ui', import.meta.url)),
            pinia: fileURLToPath(new URL('./node_modules/pinia', import.meta.url)),
        },
    },
    test: {
        environment: 'jsdom',
    },
});
