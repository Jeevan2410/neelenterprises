import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL is the single canonical origin (docs/ARCHITECTURE.md, DECISIONS #6).
const SITE_URL = process.env.SITE_URL ?? 'https://neel-enterprises.example.com';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap({
    i18n: { defaultLocale: 'en', locales: { en: 'en', kn: 'kn', hi: 'hi' } },
  })],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'kn', 'hi'],
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
