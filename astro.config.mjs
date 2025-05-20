import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import fs from 'fs-extra';

/**
 * @license
 * Fair Witness Bot Framework Performance Configuration
 * Copyright (c) 2025 Fair Witness Bot
 */

// https://astro.build/config
// Copy scripts directory to public during build
const copyScriptsToPublic = () => ({
  name: 'copy-scripts-hook',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      try {
        await fs.copy('./src/scripts', './public/scripts');
        console.log('✅ Scripts directory copied to public folder successfully');
      } catch (error) {
        console.error('❌ Error copying scripts directory:', error);
      }
    }
  }
});

export default defineConfig({
  vite: {
    build: {
      sourcemap: process.env.NODE_ENV === "production" ? false : true
    }
  },
  site: 'https://fairwitness.bot',
  integrations: [tailwind(), copyScriptsToPublic()],
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
