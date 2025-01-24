import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

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
        server: {
            host: isProduction ? '0.0.0.0' : '127.0.0.1',
            port: 5173,
            https: isProduction, // HTTPS only in production
            strictPort: true,
            hmr: {
                host: isProduction ? 'https://glitched.onrender.com' : 'localhost',
            },
            cors: isProduction ? {
                origin: 'https://glitched.onrender.com',
                methods: ['GET', 'POST'],
            } : true,
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