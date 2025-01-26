import type { APIRoute } from "astro";

const SLACK_WEBHOOK_URL = import.meta.env.SLACK_WEBHOOK_URL;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();
    
    // Slackに通知を送信
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}; 