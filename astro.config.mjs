import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    edgeMiddleware: true
  }),
  site: "https://irachile.com/",
  // "https://astro-tutorial-js.vercel.app/",
  integrations: [react(), tailwind()]
});