import { NextRequest, NextResponse } from "next/server";
import { getContacts, saveContacts, type ContactSubmission } from "@/lib/storage";

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = [
    process.env.TELEGRAM_CHAT_ID_1,
    process.env.TELEGRAM_CHAT_ID_2,
  ].filter(Boolean);

  if (!token || chatIds.length === 0) return;

  await Promise.allSettled(
    chatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      })
    )
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name?: string; company?: string; country?: string;
      phone?: string; email?: string;
      stone?: string; projectType?: string; message?: string; locale?: string;
    };

    const submission: ContactSubmission = {
      id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: body.name ?? "",
      company: body.company ?? "",
      country: body.country ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      stone: body.stone ?? "",
      projectType: body.projectType ?? "",
      message: body.message ?? "",
      locale: body.locale ?? "en",
      submittedAt: new Date().toISOString(),
    };

    // Save to storage
    const contacts = await getContacts();
    contacts.unshift(submission);
    await saveContacts(contacts);

    // Send Telegram notification
    const date = new Date(submission.submittedAt).toLocaleString("fa-IR", {
      timeZone: "Asia/Tehran",
    });

    const telegramText = `🔔 <b>درخواست قیمت جدید</b>

👤 <b>نام:</b> ${submission.name || "—"}
🏢 <b>شرکت:</b> ${submission.company || "—"}
🌍 <b>کشور:</b> ${submission.country || "—"}
📞 <b>تلفن:</b> ${submission.phone || "—"}
📧 <b>ایمیل:</b> ${submission.email || "—"}
💎 <b>سنگ:</b> ${submission.stone || "—"}
🏗️ <b>نوع پروژه:</b> ${submission.projectType || "—"}
💬 <b>پیام:</b> ${submission.message || "—"}
🌐 <b>زبان:</b> ${submission.locale === "fa" ? "فارسی" : "English"}
📅 <b>تاریخ:</b> ${date}`;

    await sendTelegram(telegramText);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
