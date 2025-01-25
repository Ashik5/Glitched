import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ command }) => {
    const isProduction = command === 'build' || process.env.APP_ENV === 'production';

    return {
        base: isProduction ? '/' : '/',
        plugins: [
            laravel({
                input: ['resources/js/app.jsx'],
                refresh: !isProduction,
            }),
            react(),
        ],
        build: {
            manifest: true,
            rollupOptions: {
                output: {
                    entryFileNames: 'assets/[name]-[hash].js',
                    chunkFileNames: 'assets/[name]-[hash].js',
                    assetFileNames: 'assets/[name]-[hash][extname]',
                },
            },
        },
        server: {
            https: false,
            host: '0.0.0.0',
            port: 5173,
            hmr: {
                protocol: isProduction ? 'wss' : 'ws',
                host: isProduction ? 'glitched.onrender.com' : 'localhost',
                clientPort: isProduction ? 443 : 5173,
            },
        },
    };
});
