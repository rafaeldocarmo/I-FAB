import { NextResponse } from "next/server";
import { Resend } from "resend";

import { parseEmailList } from "@/lib/emailList";

/**
 * Webhook for mail arriving at the i-FAB inbound address.
 *
 * The site can send but the domain has no mailbox, so anything written to the
 * address published in the privacy policy would otherwise vanish. Resend
 * receives it and calls this route, which hands it straight back to Resend to
 * forward to the board's real inboxes.
 *
 * `passthrough` forwards the original message with its attachments, so there
 * is no fetching, decoding or re-assembling to get wrong.
 */

/** Non-2xx tells Resend to retry, so only use it for failures worth retrying. */
const RETRY = 500;

export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  // Defaults to the board list that already receives Join notifications, so
  // there is one set of addresses to keep current rather than two that drift.
  // Set INBOUND_FORWARD_TO only to send inbound mail somewhere different.
  const override = parseEmailList(process.env.INBOUND_FORWARD_TO);
  const to =
    override.length > 0 ? override : parseEmailList(process.env.JOIN_NOTIFICATION_TO);

  if (!secret || !apiKey || !from || to.length === 0) {
    console.error(
      "[api/inbound] Missing RESEND_WEBHOOK_SECRET, RESEND_API_KEY, RESEND_FROM_EMAIL, or a recipient list (INBOUND_FORWARD_TO / JOIN_NOTIFICATION_TO)",
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  // The signature covers the exact bytes sent, so verify before parsing.
  const payload = await req.text();

  // The SDK wants the three signing headers, not the whole Headers object.
  const signingHeaders = {
    id: req.headers.get("webhook-id") ?? "",
    timestamp: req.headers.get("webhook-timestamp") ?? "",
    signature: req.headers.get("webhook-signature") ?? "",
  };

  const resend = new Resend(apiKey);
  let event;
  try {
    event = resend.webhooks.verify({
      payload,
      headers: signingHeaders,
      webhookSecret: secret,
    });
  } catch (e) {
    console.error("[api/inbound] Signature verification failed:", e);
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 401 });
  }

  // Other event types share this webhook; acknowledge and ignore them.
  if (event.type !== "email.received") {
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  const { email_id: emailId, from: sender } = event.data;

  // Never forward something we sent ourselves: a bounce or an auto-reply
  // landing back here would otherwise bounce between us and Resend forever.
  const ownDomain = from.split("@").pop()?.replace(">", "").trim().toLowerCase();
  if (ownDomain && sender.toLowerCase().includes(`@${ownDomain}`)) {
    console.warn("[api/inbound] Ignoring mail from our own domain:", sender);
    return NextResponse.json({ ok: true, ignored: "loop_guard" });
  }

  try {
    const { error } = await resend.emails.receiving.forward({ emailId, to, from });
    if (error) {
      console.error("[api/inbound] Forward failed:", error);
      return NextResponse.json({ ok: false, error: "forward_failed" }, { status: RETRY });
    }
  } catch (e) {
    console.error("[api/inbound] Forward threw:", e);
    return NextResponse.json({ ok: false, error: "forward_failed" }, { status: RETRY });
  }

  return NextResponse.json({ ok: true });
}
