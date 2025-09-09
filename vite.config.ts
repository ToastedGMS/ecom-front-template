import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
	plugins: [
		react(),
		sitemap({
			hostname: 'https://your-domain.com',
			exclude: ['/your-admin-path', '/your-admin-path/login'],
			robots: [
				{ userAgent: '*', allow: '/' },
				{ userAgent: '*', disallow: '/your-admin-path' }, // Disallow access to the admin dashboard
			],
		}),
	],
	server: {
		host: '0.0.0.0',
	},
	test: { environment: 'jsdom', globals: true, setupFiles: './tests/setup.js' },
} as UserConfig);
