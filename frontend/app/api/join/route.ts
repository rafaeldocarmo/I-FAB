import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  buildJoinNotificationHtml,
  type JoinPayload,
} from "@/lib/joinEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const required = ["fullName", "email", "mainRole"] as const;
    for (const key of required) {
      if (typeof body[key] !== "string" || !String(body[key]).trim()) {
        return NextResponse.json(
          { ok: false, error: "Missing fields" },
          { status: 400 },
        );
      }
    }

    const payload: JoinPayload = {
      fullName: String(body.fullName).trim(),
      email: String(body.email).trim(),
      employer: String(body.employer ?? "").trim(),
      city: String(body.city ?? "").trim(),
      country: String(body.country ?? "").trim(),
      mainRole: String(body.mainRole).trim(),
      otherRole: String(body.otherRole ?? "").trim(),
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

    const to = toRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (to.length === 0) {
      return NextResponse.json(
        { ok: false, error: "not_configured" },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
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
