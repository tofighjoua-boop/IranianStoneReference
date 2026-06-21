import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // [PLACEHOLDER] — replace with real email sending (e.g. Resend, SendGrid, Nodemailer)
    console.log("[Contact Form Submission]", JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
