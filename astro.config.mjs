import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://code-ciao.com",
  output: 'server',
  adapter: cloudflare({
    mode: 'directory'
  }),
  integrations: [react(), tailwind(), sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 80
      }
    }
  },
});
