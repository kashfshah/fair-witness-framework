import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://fairwitness.bot',
  integrations: [tailwind()],
  output: 'static'
});
