import type { APIRoute } from "astro";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://code-ciao.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const POST: APIRoute = async ({ request }) => {
  const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";

  try {
    const formData = await request.json();
    
    // Slackに通知を送信
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
      body: JSON.stringify({
        text: `新規お問い合わせがありました\n\n会社名: ${formData.company}\nお名前: ${formData.name}\nメール: ${formData.email}\nサービス: ${formData.service}\n\n${formData.message}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Slackへの通知送信に失敗しました");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error details:", {
      error: error instanceof Error ? error.message : String(error),
      webhookUrl: SLACK_WEBHOOK_URL ? "設定されています" : "未設定です",
    });
    return new Response(JSON.stringify({ 
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
