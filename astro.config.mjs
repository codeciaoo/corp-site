import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://code-ciao.com",
  devToolbar: { enabled: false },
  // CSS は HTML に埋め込む。描画を止めるリクエストを無くすため
  build: { inlineStylesheets: "always" },
  output: "server",
  adapter: cloudflare({
    mode: "directory",
  }),
  // ページは Astro の部品だけで書いている（React と Tailwind は使わない）
  integrations: [sitemap()],
  redirects: {
    "/blog": "https://zenn.dev/p/codeciao",
    "/projects/aws-optimization-iac": "/projects/aws-account-platform",
    "/projects/ec2-to-ecs-migration": "/projects/ec2-to-ecs",
    "/projects/construction-management-system": "/projects",
    "/projects/generative-ai-development": "/projects/safety-ai",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        quality: 80,
      },
    },
  },
});
