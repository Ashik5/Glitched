import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => {
    const isProduction = command === 'build' || process.env.APP_ENV === 'production';
    return {
        plugins: [
            laravel({
                input: ['resources/js/app.jsx'],
                refresh: !isProduction,
            }),
            react(),
        ],
        resolve: {
            alias: {
                '@assets': path.resolve(__dirname, 'resources/assets'),
            },
        },
        server: {
            host: '0.0.0.0',
            port: 5173,
            https: true,
            strictPort: true,
            hmr: {
                host: 'glitched.onrender.com',
            },
            cors: {
                origin: ['https://glitched.onrender.com', 'http://glitched.onrender.com'],
                methods: ['GET', 'POST', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization'],
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
