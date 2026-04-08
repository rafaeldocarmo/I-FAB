/** Escape user input for safe HTML email bodies */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type JoinPayload = {
  fullName: string;
  email: string;
  employer: string;
  city: string;
  country: string;
  mainRole: string;
  otherRole: string;
};

export function buildJoinNotificationHtml(p: JoinPayload): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;color:#081849;width:160px">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#374151">${escapeHtml(value || "—")}</td></tr>`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111827">
  <p style="margin:0 0 16px;font-size:15px">New <strong>Join i-FAB</strong> submission:</p>
  <table style="border-collapse:collapse;max-width:560px;font-size:14px">
    ${row("Full name", p.fullName)}
    ${row("Email", p.email)}
    ${row("Employer", p.employer)}
    ${row("City", p.city)}
    ${row("Country", p.country)}
    ${row("Main role", p.mainRole)}
    ${row("Other role", p.otherRole)}
  </table>
</body>
</html>`;
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
