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
        base: isProduction ? 'https://glitched.onrender.com/' : '/', // Use HTTPS in production
        plugins: [
            laravel({
                input: [
                    'resources/js/app.jsx',
                    ...pageFiles
                ],
                refresh: !isProduction, // Enable HMR only for development
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
                }
            }
        },
        server: {
            https: false, // Keep HTTPS false for local development
            host: '0.0.0.0', // Allow external access in development
            port: 5173,
            strictPort: true,
            hmr: {
                protocol: isProduction ? 'wss' : 'ws', // Use WebSocket Secure in production
                host: isProduction ? 'glitched.onrender.com' : 'localhost',
                clientPort: isProduction ? 443 : 5173, // Default HTTPS port for production
            },
        }
    };
});
