import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId2 = process.env.TELEGRAM_CHAT_ID_2;

  const debug: Record<string, unknown> = {
    token_set: !!token,
    token_preview: token ? token.slice(0, 10) + "..." : null,
    chat_id_2: chatId2 ?? null,
  };

  if (!token) {
    return NextResponse.json({ ...debug, error: "TELEGRAM_BOT_TOKEN not set" });
  }

  if (!chatId2) {
    return NextResponse.json({ ...debug, error: "TELEGRAM_CHAT_ID_2 not set" });
  }

  // Test bot connection
  const meRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
  const me = await meRes.json() as Record<string, unknown>;
  debug.bot = me;

  if (!(me as { ok?: boolean }).ok) {
    return NextResponse.json({ ...debug, error: "Invalid bot token" });
  }

  // Send test message
  const msgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId2,
      text: "✅ تست موفق — سیستم درخواست قیمت ISR متصل شد.",
    }),
  });
  const msg = await msgRes.json() as Record<string, unknown>;
  debug.send_result = msg;

  return NextResponse.json(debug);
}
