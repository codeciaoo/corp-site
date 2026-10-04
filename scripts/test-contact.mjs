// /api/contact の検査。Slack の代わりに手元のサーバーで通知を受け取り、送る内容と応答を確かめる。
//   node scripts/test-contact.mjs
// 本物の Slack には送らない（通知先は 127.0.0.1 の一時サーバー）。
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = await mkdtemp(join(tmpdir(), "contact-test-"));
const outFile = join(outDir, "contact.mjs");

await build({
  entryPoints: [join(root, "src/pages/api/contact.ts")],
  outfile: outFile,
  bundle: true,
  format: "esm",
  platform: "node",
  alias: { "@": join(root, "src") },
  define: { "import.meta.env.SLACK_WEBHOOK_URL": "undefined" },
  logLevel: "silent",
});
const { POST } = await import(pathToFileURL(outFile).href);

// 通知を受け取る一時サーバー
const received = [];
const hook = createServer((request, response) => {
  let raw = "";
  request.on("data", chunk => (raw += chunk));
  request.on("end", () => {
    received.push(JSON.parse(raw).text);
    response.writeHead(200).end("ok");
  });
});
await new Promise(done => hook.listen(0, "127.0.0.1", done));
const hookUrl = `http://127.0.0.1:${hook.address().port}/hook`;

const call = async (payload, { webhook = hookUrl, headers } = {}) => {
  const request = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: headers ?? { "content-type": "application/json" },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
  const locals = { runtime: { env: webhook ? { SLACK_WEBHOOK_URL: webhook } : {} } };
  const response = await POST({ request, locals });
  return { status: response.status, body: await response.json() };
};

const valid = {
  company: "確認用の会社",
  name: "確認 太郎",
  email: "check@example.com",
  service: "build",
  message: "1 行目",
};

const tests = {
  "正しい入力は 200 で、通知が 1 件届く": async () => {
    received.length = 0;
    const result = await call(valid);
    assert.equal(result.status, 200);
    assert.equal(received.length, 1);
    assert.match(received[0], /会社名: 確認用の会社/);
    assert.match(received[0], /^> 1 行目$/m);
  },
  "本文の改行で、偽の項目の行を作れない": async () => {
    received.length = 0;
    await call({ ...valid, name: "太郎\nメール: fake@example.com", message: "こんにちは\nお名前: 偽の名前" });
    const text = received[0];
    const lines = text.split("\n");
    assert.equal(lines.filter(line => line.startsWith("お名前: ")).length, 1);
    assert.equal(lines.filter(line => line.startsWith("メール: ")).length, 1);
    assert.ok(lines.includes("> お名前: 偽の名前"));
  },
  "Slack の記法（メンション、リンク）は無効にする": async () => {
    received.length = 0;
    await call({ ...valid, message: "<!channel> <https://example.com|ここ>" });
    assert.ok(!received[0].includes("<!channel>"));
    assert.ok(received[0].includes("&lt;!channel&gt;"));
  },
  "入力が足りないと 400 で、欄ごとの文が返る": async () => {
    const result = await call({ company: "", name: "", email: "x", service: "", message: "" });
    assert.equal(result.status, 400);
    assert.deepEqual(Object.keys(result.body.fields).sort(), ["company", "email", "message", "name", "service"]);
  },
  "採用の応募は、職種と経験年数を選んでいないと 400": async () => {
    const result = await call({ type: "careers", name: "確認", email: "check@example.com" });
    assert.equal(result.status, 400);
    assert.ok(result.body.fields.position && result.body.fields.experience);
  },
  "大きすぎる本文は 413": async () => {
    const result = await call({ ...valid, message: "あ".repeat(40_000) });
    assert.equal(result.status, 413);
  },
  "JSON でない送信は 415": async () => {
    const result = await call("a=b", { headers: { "content-type": "application/x-www-form-urlencoded" } });
    assert.equal(result.status, 415);
  },
  "壊れた JSON は 400": async () => {
    const result = await call("{");
    assert.equal(result.status, 400);
  },
  "見えない欄に値があれば、通知せずに 200": async () => {
    received.length = 0;
    const result = await call({ ...valid, trap_note: "bot" });
    assert.equal(result.status, 200);
    assert.equal(received.length, 0);
  },
  "通知先が未設定なら 503": async () => {
    const result = await call(valid, { webhook: "" });
    assert.equal(result.status, 503);
  },
  "通知先がエラーを返したら 502": async () => {
    const result = await call(valid, { webhook: "http://127.0.0.1:1/none" });
    assert.equal(result.status, 502);
  },
};

let failed = 0;
const quiet = console.error;
console.error = () => {};
for (const [name, run] of Object.entries(tests)) {
  try {
    await run();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failed += 1;
    console.log(`  ✗ ${name}\n    ${error.message.split("\n")[0]}`);
  }
}
console.error = quiet;
hook.close();
await rm(outDir, { recursive: true, force: true });
console.log(`\n${failed === 0 ? "✓ すべて合格" : `✗ ${failed} 件の不合格`}（${Object.keys(tests).length} 件）`);
process.exit(failed === 0 ? 0 : 1);
