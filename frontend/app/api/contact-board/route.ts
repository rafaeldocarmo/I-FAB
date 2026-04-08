import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  buildContactBoardNotificationHtml,
  type ContactBoardPayload,
} from "@/lib/joinEmail";
import { parseEmailList, RESEND_MAX_RECIPIENTS } from "@/lib/emailList";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LEN = 200;
const MAX_MESSAGE_LEN = 5000;

function sanitize(raw: unknown, maxLen: number): string {
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, maxLen);
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") ?? "";
    if (!ct.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Invalid content type" },
        { status: 415 },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON" },
        { status: 400 },
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { ok: false, error: "Invalid body" },
        { status: 400 },
      );
    }

    const b = body as Record<string, unknown>;
    const name = sanitize(b.name, MAX_NAME_LEN);
    const email = sanitize(b.email, 254);
    const message = sanitize(b.message, MAX_MESSAGE_LEN);

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    const payload: ContactBoardPayload = { name, email, message };

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const toRaw = process.env.JOIN_NOTIFICATION_TO;

    if (!apiKey || !from || !toRaw) {
      console.error(
        "[api/contact-board] Missing RESEND_API_KEY, RESEND_FROM_EMAIL, or JOIN_NOTIFICATION_TO",
      );
      return NextResponse.json(
        { ok: false, error: "not_configured" },
        { status: 503 },
      );
    }

    const to = parseEmailList(toRaw);
    if (to.length === 0) {
      return NextResponse.json(
        { ok: false, error: "not_configured" },
        { status: 503 },
      );
    }

    const cc = parseEmailList(process.env.JOIN_NOTIFICATION_CC);
    const bcc = parseEmailList(process.env.JOIN_NOTIFICATION_BCC);

    if (to.length + cc.length + bcc.length > RESEND_MAX_RECIPIENTS) {
      console.error(
        `[api/contact-board] Too many recipients (max ${RESEND_MAX_RECIPIENTS} total for to+cc+bcc)`,
      );
      return NextResponse.json(
        { ok: false, error: "not_configured" },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      ...(cc.length > 0 ? { cc } : {}),
      ...(bcc.length > 0 ? { bcc } : {}),
      replyTo: payload.email,
      subject: `Contact the Board: ${payload.name}`,
      html: buildContactBoardNotificationHtml(payload),
    });

    if (error) {
      console.error("[api/contact-board] Resend:", error);
      return NextResponse.json(
        { ok: false, error: "email_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/contact-board]", e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
