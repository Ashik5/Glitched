import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
    const isProduction = command === 'build' || process.env.APP_ENV === 'production';
    return {
        base: isProduction ? 'https://glitched.onrender.com/' : '/',
        plugins: [
            laravel({
                input: ['resources/js/app.jsx'],
                refresh: !isProduction,
                buildDirectory: 'build',
            }),
            react(),
        ],
        server: {
            https: true,
            host: '0.0.0.0',
            port: 5173,
            strictPort: true,
            hmr: {
                host: 'glitched.onrender.com',
            },
            cors: {
                origin: 'https://glitched.onrender.com',
                methods: ['GET', 'POST', 'OPTIONS'],
            },
        },
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: 'assets/[name]-[hash].js',
                    chunkFileNames: 'assets/[name]-[hash].js',
                    assetFileNames: 'assets/[name]-[hash][extname]',
                },
            },
        },
    };
});
