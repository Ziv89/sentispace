import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: Partial<VitePWAOptions> = {
    devOptions: {
        enabled: true,
        type: 'module',
    },
    registerType: 'autoUpdate',
    includeAssets: ['**/*'],
    workbox: {
        globPatterns: ['**/*'],
        maximumFileSizeToCacheInBytes: 5_000_000,
    },
    manifest: {
        name: 'Sentispace',
        short_name: 'Sentispace',
        description:
            'Sentispace is a diary application designed to log your everyday activities and your sentiments associated with them. It offers daily, weekly, and monthly overviews of the activities you choose to monitor, alongside trend analysis and statistical data.',
        theme_color: '#fff',
        orientation: 'portrait',
        display: 'standalone',
        icons: [
            {
                src: 'manifest-icon-192.maskable.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: 'manifest-icon-192.maskable.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: 'manifest-icon-512.maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: 'manifest-icon-512.maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    },
};

export default defineConfig({
    base: './',
    plugins: [react(), VitePWA(pwaOptions)],
});
