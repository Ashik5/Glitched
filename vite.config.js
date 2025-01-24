import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
    const isProduction = command === 'build' || process.env.APP_ENV === 'production';

    return {
        plugins: [
            laravel({
                input: ['resources/js/app.jsx'],
                refresh: !isProduction, // Enable HMR only in development
            }),
            react(),
        ],
        server: {
            host: isProduction ? '0.0.0.0' : '127.0.0.1',  // Use 0.0.0.0 for Render (production), 127.0.0.1 for local dev
            port: 5173,
            https: isProduction, // Enable HTTPS in production
            strictPort: true,
            hmr: {
                host: 'localhost', // HMR host for local dev
            },
            cors: isProduction ? {
                origin: 'https://glitched.onrender.com', // Allow the production URL in production
                methods: ['GET', 'POST'],
            } : true, // Allow all origins in local development
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
