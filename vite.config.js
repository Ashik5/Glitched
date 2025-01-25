import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
    const isProduction = command === 'build' || process.env.APP_ENV === 'production';
    return {
        base: 'https://glitched.onrender.com/',
        plugins: [
            laravel({
                input: ['resources/js/app.jsx'],
                refresh: true,
                buildDirectory: 'build',
            }),
            react(),
        ],
        build: {
            manifest: true,
            outDir: 'public/build',
            rollupOptions: {
                output: {
                    entryFileNames: 'assets/[name]-[hash].js',
                    chunkFileNames: 'assets/[name]-[hash].js',
                    assetFileNames: 'assets/[name]-[hash][extname]',
                },
            },
        },
        server: {
            https: true,
            host: true,
            port: 5173,
            strictPort: true,
            hmr: {
                protocol: 'https',
                host: 'glitched.onrender.com',
            },
        },
    };
});
