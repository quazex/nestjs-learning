import { preact } from '@preact/preset-vite';
import { defineConfig } from 'vite';

export default defineConfig({
    root: './source/frontend',
    plugins: [
        preact(),
    ],
    build: {
        outDir: 'dist',
    },
});
