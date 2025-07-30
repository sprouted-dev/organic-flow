// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'min-light',
        dark: 'min-dark',
      },
      wrap: true,
      // Add custom CSS classes for better control
      transformers: [{
        name: 'add-classes',
        pre(node) {
          node.properties.class = 'shiki-code-block';
        }
      }]
    },
  },
});
