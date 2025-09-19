import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
        }
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:5174',  // Changed from 3002 to 5000
                changeOrigin: true
            }
        }
    }
});