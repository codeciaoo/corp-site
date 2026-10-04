// お問い合わせと採用応募を受け取り、Slack へ通知する。
// 受け取る JSON は 2 つの形。
//   お問い合わせ: { company, name, email, service, message }
//   採用応募:     { type: "careers", name, email, position, experience, githubUrl, message }
import type { APIRoute } from "astro";

import {
  EMAIL_PATTERN,
  EXPERIENCE_OPTIONS,
  LIMITS,
  POSITION_OPTIONS,
  SERVICE_OPTIONS,
  type Option,
} from "@/components/forms/schema";

export const prerender = false;

interface ContactInquiry {
  kind: "contact";
  company: string;
  name: string;
  email: string;
  service: string;
  message: string;
}

interface CareersInquiry {
  kind: "careers";
  name: string;
  email: string;
  position: string;
  experience: string;
  githubUrl: string;
  message: string;
}

type Inquiry = ContactInquiry | CareersInquiry;

/** 入力欄の名前 → エラーの文 */
type FieldErrors = Record<string, string>;

type Parsed =
  | { ok: true; inquiry: Inquiry }
  | { ok: false; fields: FieldErrors };

/** 受け取る本文の上限（バイト）。入力欄の上限の合計より十分に大きく、メモリを使い切らない大きさ */
const MAX_BODY_BYTES = 64 * 1024;
const SLACK_TIMEOUT_MS = 8_000;

class BodyTooLargeError extends Error {}

/** 本文を上限まで読む。上限を超えたら、残りを読まずに打ち切る */
const readBody = async (request: Request): Promise<string> => {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) throw new BodyTooLargeError();
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new BodyTooLargeError();
    }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
};

const json = (status: number, body: Record<string, unknown>): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** 文字列なら前後の空白を除いて返す。文字列でなければ空文字 */
const toText = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const hasValue = (value: unknown): boolean =>
  typeof value === "string"
    ? value.trim() !== ""
    : value !== undefined && value !== null;

const labelOf = (
  options: readonly Option[],
  value: string
): string | undefined => options.find(option => option.value === value)?.label;

const isHttpUrl = (value: string): boolean => {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
};

const parseInquiry = (body: Record<string, unknown>): Parsed => {
  const fields: FieldErrors = {};

  const textOf = (
    key: string,
    label: string,
    max: number,
    required: boolean
  ): string => {
    const value = toText(body[key]);
    if (required && !value) {
      fields[key] = `${label}を入力してください。`;
    } else if (value.length > max) {
      fields[key] = `${label}は${max}字以内で入力してください。`;
    }
    return value;
  };

  const choiceOf = (
    key: string,
    label: string,
    options: readonly Option[]
  ): string => {
    const value = toText(body[key]);
    if (!labelOf(options, value)) fields[key] = `${label}を選んでください。`;
    return value;
  };

  const name = textOf("name", "お名前", LIMITS.name, true);
  const email = textOf("email", "メールアドレス", LIMITS.email, true);
  if (!fields.email && !EMAIL_PATTERN.test(email)) {
    fields.email = "メールアドレスの形式を確かめてください。";
  }

  let inquiry: Inquiry;
  if (body.type === "careers") {
    const githubUrl = textOf("githubUrl", "GitHubのURL", LIMITS.url, false);
    if (githubUrl && !fields.githubUrl && !isHttpUrl(githubUrl)) {
      fields.githubUrl = "URLの形式を確かめてください。";
    }
    inquiry = {
      kind: "careers",
      name,
      email,
      position: choiceOf("position", "希望職種", POSITION_OPTIONS),
      experience: choiceOf("experience", "経験年数", EXPERIENCE_OPTIONS),
      githubUrl,
      message: textOf("message", "自己PR", LIMITS.message, false),
    };
  } else {
    inquiry = {
      kind: "contact",
      company: textOf("company", "会社名", LIMITS.company, true),
      name,
      email,
      service: choiceOf("service", "相談したいこと", SERVICE_OPTIONS),
      message: textOf("message", "相談の内容", LIMITS.message, true),
    };
  }

  return Object.keys(fields).length > 0
    ? { ok: false, fields }
    : { ok: true, inquiry };
};

/** Slack の記法（メンション、リンク）として解釈されないようにする */
const escapeSlack = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** 1 行の値。改行を空白に変えて、通知の中に偽の項目の行を作れないようにする */
const oneLine = (value: string): string =>
  escapeSlack(value.replace(/[\r\n\u2028\u2029]+/g, " "));

/** 複数行の値。全部の行を引用にして、通知の項目と見分けが付くようにする */
const quoted = (value: string): string =>
  escapeSlack(value)
    .split(/\r\n|[\r\n\u2028\u2029]/)
    .map(line => `> ${line}`)
    .join("\n");

const toSlackText = (inquiry: Inquiry): string => {
  const lines =
    inquiry.kind === "careers"
      ? [
          "採用の応募がありました",
          "",
          `お名前: ${oneLine(inquiry.name)}`,
          `メール: ${oneLine(inquiry.email)}`,
          `希望職種: ${labelOf(POSITION_OPTIONS, inquiry.position)}`,
          `経験年数: ${labelOf(EXPERIENCE_OPTIONS, inquiry.experience)}`,
          `GitHub: ${inquiry.githubUrl ? oneLine(inquiry.githubUrl) : "（未入力）"}`,
          "",
          inquiry.message ? quoted(inquiry.message) : "（自己PRは未入力）",
        ]
      : [
          "新規お問い合わせがありました",
          "",
          `会社名: ${oneLine(inquiry.company)}`,
          `お名前: ${oneLine(inquiry.name)}`,
          `メール: ${oneLine(inquiry.email)}`,
          `サービス: ${labelOf(SERVICE_OPTIONS, inquiry.service)}`,
          "",
          quoted(inquiry.message),
        ];
  return lines.join("\n");
};

/** Cloudflare の実行時は runtime.env、開発時は import.meta.env から読む */
const readWebhookUrl = (locals: App.Locals): string | undefined => {
  const candidates: unknown[] = [
    locals.runtime?.env.SLACK_WEBHOOK_URL,
    import.meta.env.SLACK_WEBHOOK_URL,
  ];
  return candidates.find(
    (value): value is string => typeof value === "string" && value !== ""
  );
};

export const POST: APIRoute = async ({ request, locals }) => {
  // JSON だけを受ける。ほかのオリジンからの JSON 送信は、ブラウザが事前確認で止める
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json(415, {
      error: "unsupported_media_type",
      message: "application/jsonで送ってください。",
    });
  }

  let body: unknown;
  try {
    body = JSON.parse(await readBody(request));
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return json(413, {
        error: "payload_too_large",
        message: "送信する内容が長すぎます。",
      });
    }
    return json(400, {
      error: "invalid_json",
      message: "JSONとして読めませんでした。",
    });
  }
  if (!isRecord(body)) {
    return json(400, {
      error: "invalid_json",
      message: "JSONのオブジェクトで送ってください。",
    });
  }

  // 迷惑送信対策。画面に出さない欄に値があれば、何もせず成功を返す
  if (hasValue(body.trap_note)) return json(200, { success: true });

  const parsed = parseInquiry(body);
  if (!parsed.ok) {
    return json(400, {
      error: "invalid_input",
      message: "入力内容を確かめてください。",
      fields: parsed.fields,
    });
  }

  const webhookUrl = readWebhookUrl(locals);
  if (!webhookUrl) {
    console.error(
      "[api/contact] SLACK_WEBHOOK_URLが未設定のため、通知を送れません。"
    );
    return json(503, {
      error: "not_configured",
      message: "現在は送信を受け付けられません。",
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: toSlackText(parsed.inquiry) }),
      signal: AbortSignal.timeout(SLACK_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(
        `[api/contact] Slackへの通知に失敗しました（HTTP ${response.status}）。`
      );
      return json(502, {
        error: "notify_failed",
        message: "通知を送れませんでした。",
      });
    }
  } catch (error) {
    // エラーの本文は出さない（実行環境によっては、通知先の URL が含まれるため）
    console.error(
      "[api/contact] Slackへの通知に失敗しました。",
      error instanceof Error ? error.name : "unknown"
    );
    return json(502, {
      error: "notify_failed",
      message: "通知を送れませんでした。",
    });
  }

  return json(200, { success: true });
};
