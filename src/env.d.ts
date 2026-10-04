/// <reference path="../.astro/types.d.ts" />

type CloudflareRuntime = import("@astrojs/cloudflare").Runtime<{
  SLACK_WEBHOOK_URL?: string;
}>;

declare namespace App {
  // runtime が入るのは、Cloudflare の実行時と、開発サーバー（platformProxy）だけ
  interface Locals extends Partial<CloudflareRuntime> {}
}

interface ImportMetaEnv {
  readonly SLACK_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
