import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
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
            host: '127.0.0.1', // Localhost for local development
            port: 5173, // Vite development server port
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
