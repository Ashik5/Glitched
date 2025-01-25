import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ command }) => {
    const isProduction = command === 'build' || process.env.APP_ENV === 'production';

    // Dynamically find all page components
    const pagesDir = path.resolve(__dirname, 'resources/js/Pages');
    const pageFiles = fs.readdirSync(pagesDir)
        .filter(file => file.endsWith('.jsx'))
        .map(file => `resources/js/Pages/${file}`);

    return {
        base: 'https://glitched.onrender.com',
        plugins: [
            laravel({
                input: [
                    'resources/js/app.jsx',
                    ...pageFiles
                ],
                refresh: true,
            }),
            react(),
        ],
        build: {
            manifest: true,
            rollupOptions: {
                output: {
                    entryFileNames: 'assets/[name]-[hash].js',
                    chunkFileNames: 'assets/[name]-[hash].js',
                    assetFileNames: 'assets/[name]-[hash][extname]'
                }
            }
        },
        server: {
            https: true,
            host: true,
            port: 5173,
            strictPort: true,
            hmr: {
                host: 'glitched.onrender.com'
            }
        }
    };
});
