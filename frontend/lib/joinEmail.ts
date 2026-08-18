import {
  emailBadge,
  emailLink,
  emailRow,
  emailRowRaw,
  escapeHtml,
  renderEmailShell,
} from "@/lib/emailLayout";
import { joinRoleLabel } from "@/lib/joinRoles";

/** Re-exported so existing importers keep working. */
export { escapeHtml };

export type JoinPayload = {
  fullName: string;
  email: string;
  employer: string;
  city: string;
  country: string;
  mainRole: string;
  otherRole: string;
};

/** "London, United Kingdom", or whichever half was filled in. */
function formatLocation(p: JoinPayload): string {
  return [p.city, p.country].filter(Boolean).join(", ");
}

function formatRole(p: JoinPayload): string {
  const label = joinRoleLabel(p.mainRole);
  return p.mainRole === "other" && p.otherRole
    ? `${label} — ${p.otherRole}`
    : label;
}

function formatSubmittedAt(when: Date): string {
  return `${when.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

export function buildJoinNotificationHtml(
  p: JoinPayload,
  submittedAt: Date = new Date(),
): string {
  const roleHtml =
    p.mainRole === "other" && p.otherRole
      ? `${emailBadge(joinRoleLabel(p.mainRole))} <span style="color:#1f2937;">${escapeHtml(p.otherRole)}</span>`
      : emailBadge(joinRoleLabel(p.mainRole));

  const bodyHtml = [
    emailRow("Full name", p.fullName),
    emailRowRaw("Email", emailLink(p.email)),
    emailRowRaw("Main role", roleHtml),
    emailRow("Employer", p.employer),
    emailRow("Location", formatLocation(p)),
    emailRow("Submitted", formatSubmittedAt(submittedAt)),
  ].join("\n");

  return renderEmailShell({
    eyebrow: "Join i-FAB",
    heading: "New membership interest",
    intro: `${p.fullName} has asked to join the i-FAB community.`,
    preheader: `${p.fullName} — ${formatRole(p)}${formatLocation(p) ? ` — ${formatLocation(p)}` : ""}`,
    bodyHtml,
    footerNote:
      "Reply to this email to answer them directly — the reply-to address is already set to the sender. This submission is also saved in the Sanity Studio.",
  });
}

/** Plain-text alternative. Improves deliverability and serves text-only clients. */
export function buildJoinNotificationText(
  p: JoinPayload,
  submittedAt: Date = new Date(),
): string {
  return [
    "i-FAB — Join i-FAB",
    "New membership interest",
    "",
    `${p.fullName} has asked to join the i-FAB community.`,
    "",
    `Full name: ${p.fullName}`,
    `Email:     ${p.email}`,
    `Main role: ${formatRole(p)}`,
    `Employer:  ${p.employer || "—"}`,
    `Location:  ${formatLocation(p) || "—"}`,
    `Submitted: ${formatSubmittedAt(submittedAt)}`,
    "",
    "Reply to this email to answer them directly.",
    "This submission is also saved in the Sanity Studio.",
  ].join("\n");
}

export type ContactBoardPayload = {
  name: string;
  email: string;
  message: string;
};

export function buildContactBoardNotificationHtml(p: ContactBoardPayload): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;color:#081849;width:160px">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#374151">${escapeHtml(value || "—")}</td></tr>`;

  const messageBlock = `<pre style="margin:0;white-space:pre-wrap;word-break:break-word;font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#374151">${escapeHtml(p.message)}</pre>`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111827">
  <p style="margin:0 0 16px;font-size:15px">New <strong>Contact the Board</strong> message:</p>
  <table style="border-collapse:collapse;max-width:560px;font-size:14px">
    ${row("Name", p.name)}
    ${row("Email", p.email)}
    <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;color:#081849;vertical-align:top;width:160px">Message</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${messageBlock}</td></tr>
  </table>
</body>
</html>`;
}
