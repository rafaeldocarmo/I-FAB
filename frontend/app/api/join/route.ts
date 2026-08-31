import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  buildJoinNotificationHtml,
  buildJoinNotificationText,
  type JoinPayload,
} from "@/lib/joinEmail";
import { parseEmailList, RESEND_MAX_RECIPIENTS } from "@/lib/emailList";
import { getWriteClient } from "@/sanity/writeClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LEN = 500;
/** The free-text box needs far more room than the single-line fields. */
const MAX_MESSAGE_LEN = 5000;

function sanitize(raw: unknown, maxLen = MAX_FIELD_LEN): string {
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, maxLen);
}

/**
 * Store the submission so the board can review it in the Studio.
 *
 * Best-effort on purpose: if the write token is missing or Sanity is
 * unavailable we log and carry on, because the notification email is the
 * record that actually has to reach a person. Failing the request here would
 * lose the submission entirely and show the visitor an error for a problem
 * that does not affect them.
 */
async function persistSubmission(
  payload: JoinPayload,
  submittedAt: Date,
): Promise<void> {
  const sanity = getWriteClient();
  if (!sanity) {
    console.warn(
      "[api/join] SANITY_API_WRITE_TOKEN not set — submission emailed but not saved to the Studio",
    );
    return;
  }

  try {
    await sanity.create({
      _type: "joinSubmission",
      ...payload,
      submittedAt: submittedAt.toISOString(),
    });
  } catch (e) {
    console.error("[api/join] Sanity write failed:", e);
  }
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
    const fullName = sanitize(b.fullName);
    const email = sanitize(b.email, 254);
    const mainRole = sanitize(b.mainRole);

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

    const payload: JoinPayload = {
      fullName,
      email,
      employer: sanitize(b.employer),
      city: sanitize(b.city),
      country: sanitize(b.country),
      mainRole,
      researchLine: sanitize(b.researchLine),
      message: sanitize(b.message, MAX_MESSAGE_LEN),
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

    const submittedAt = new Date();
    await persistSubmission(payload, submittedAt);

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      ...(cc.length > 0 ? { cc } : {}),
      ...(bcc.length > 0 ? { bcc } : {}),
      replyTo: payload.email,
      subject: `i-FAB - New Join i-FAB submission: ${payload.fullName}`,
      html: buildJoinNotificationHtml(payload, submittedAt),
      text: buildJoinNotificationText(payload, submittedAt),
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
