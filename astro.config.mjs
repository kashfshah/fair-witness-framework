import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

/**
 * @license
 * Fair Witness Bot Framework Performance Configuration
 * Copyright (c) 2025 Fair Witness Bot
 */

// https://astro.build/config
export default defineConfig({
  site: 'https://fairwitness.bot',
  integrations: [tailwind()],
  output: 'static',
  build: {
    // Optimize assets during build
    assets: 'assets',
    // Inlines small assets to reduce HTTP requests
    inlineStyleThreshold: 4096
  },
  vite: {
    // Enhanced build optimization
    build: {
      // Optimize chunk size
      chunkSizeWarningLimit: 60,
      // Enable standard compression
      minify: true,
      // Split chunks for better caching
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    // Optimize CSS processing
    css: {
      devSourcemap: false,
    },
    // Enable asset preloading
    ssr: {
      noExternal: ['@astrojs/tailwind']
    }
  }
});
