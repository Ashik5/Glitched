import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
    const isProduction = command === 'build' || process.env.APP_ENV === 'production';

    return {
        plugins: [
            laravel({
                input: ['resources/js/app.jsx'],
                refresh: true,
            }),
            react(),
        ],
        server: {
            host: isProduction ? true : '127.0.0.1',
            port: 5173,
            https: isProduction,
            strictPort: true,
        },
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: 'assets/[name]-[hash].js',
                    chunkFileNames: 'assets/[name]-[hash].js',
                    assetFileNames: 'assets/[name]-[hash][extname]'
                }
            }
        }
    };
});