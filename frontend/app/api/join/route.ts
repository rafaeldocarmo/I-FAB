import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  buildJoinNotificationHtml,
  type JoinPayload,
} from "@/lib/joinEmail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LEN = 500;
const ALLOWED_ROLES = new Set(["academic", "industry", "clinician", "other"]);

function sanitize(raw: unknown, maxLen = MAX_FIELD_LEN): string {
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, maxLen);
}

/** Lista separada por vírgulas → emails (ex.: `JOIN_NOTIFICATION_TO`). */
function parseEmailList(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Resend: máximo 50 destinatários no total (to + cc + bcc). */
const RESEND_MAX_RECIPIENTS = 50;

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
    const fullName = sanitize(b.fullName);
    const email = sanitize(b.email, 254);
    const mainRole = sanitize(b.mainRole, 50);

    if (!fullName || !email || !mainRole) {
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

    if (!ALLOWED_ROLES.has(mainRole)) {
      return NextResponse.json(
        { ok: false, error: "Invalid role" },
        { status: 400 },
      );
    }

    const payload: JoinPayload = {
      fullName,
      email,
      employer: sanitize(b.employer),
      city: sanitize(b.city),
      country: sanitize(b.country),
      mainRole,
      otherRole: sanitize(b.otherRole),
    };

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const toRaw = process.env.JOIN_NOTIFICATION_TO;

    if (!apiKey || !from || !toRaw) {
      console.error(
        "[api/join] Missing RESEND_API_KEY, RESEND_FROM_EMAIL, or JOIN_NOTIFICATION_TO",
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
        `[api/join] Too many recipients (max ${RESEND_MAX_RECIPIENTS} total for to+cc+bcc)`,
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
      subject: `Join i-FAB: ${payload.fullName}`,
      html: buildJoinNotificationHtml(payload),
    });

    if (error) {
      console.error("[api/join] Resend:", error);
      return NextResponse.json(
        { ok: false, error: "email_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/join]", e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
