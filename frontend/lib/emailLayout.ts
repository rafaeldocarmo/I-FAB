/**
 * Branded HTML shell for transactional emails.
 *
 * Written for email clients, not browsers: table-based layout, inline styles,
 * `bgcolor` attributes alongside CSS, fixed 600px max width, and no flexbox,
 * grid, gradients or web fonts — Outlook in particular ignores all of those.
 */

export const EMAIL_BRAND = {
  navy: "#081849",
  blue: "#213885",
  sand: "#ECDFD2",
  page: "#f4f4f7",
  panel: "#f9f7f5",
  text: "#1f2937",
  muted: "#6B7280",
  hairline: "#e9ebf0",
} as const;

const FONT_STACK =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/** Escape user input for safe HTML email bodies. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** A label/value row. Values are escaped here, so pass raw text. */
export function emailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:14px 0 6px;font-family:${FONT_STACK};font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:${EMAIL_BRAND.blue};">${escapeHtml(label)}</td>
  </tr>
  <tr>
    <td style="padding:0 0 14px;border-bottom:1px solid ${EMAIL_BRAND.hairline};font-family:${FONT_STACK};font-size:16px;line-height:1.5;color:${EMAIL_BRAND.text};">${escapeHtml(value || "—")}</td>
  </tr>`;
}

/** A label/value row whose value is pre-rendered HTML (already escaped). */
export function emailRowRaw(label: string, valueHtml: string): string {
  return `<tr>
    <td style="padding:14px 0 6px;font-family:${FONT_STACK};font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:${EMAIL_BRAND.blue};">${escapeHtml(label)}</td>
  </tr>
  <tr>
    <td style="padding:0 0 14px;border-bottom:1px solid ${EMAIL_BRAND.hairline};font-family:${FONT_STACK};font-size:16px;line-height:1.5;color:${EMAIL_BRAND.text};">${valueHtml}</td>
  </tr>`;
}

/** Small pill, e.g. for the submitted role. */
export function emailBadge(text: string): string {
  return `<span style="display:inline-block;padding:5px 12px;background-color:${EMAIL_BRAND.sand};color:${EMAIL_BRAND.navy};border-radius:999px;font-family:${FONT_STACK};font-size:13px;font-weight:700;">${escapeHtml(text)}</span>`;
}

/** `mailto:` link styled as body text. */
export function emailLink(address: string): string {
  const safe = escapeHtml(address);
  return `<a href="mailto:${encodeURIComponent(address)}" style="color:${EMAIL_BRAND.blue};text-decoration:underline;">${safe}</a>`;
}

type ShellOptions = {
  /** Small line above the heading, e.g. "Join i-FAB". */
  eyebrow: string;
  heading: string;
  /** Sentence under the heading. */
  intro: string;
  /** Hidden text shown in the inbox preview line. */
  preheader: string;
  /** Rows or other pre-rendered HTML for the main panel. */
  bodyHtml: string;
  /** Closing note in the footer. */
  footerNote: string;
};

export function renderEmailShell({
  eyebrow,
  heading,
  intro,
  preheader,
  bodyHtml,
  footerNote,
}: ShellOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="x-apple-disable-message-reformatting"/>
<title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${EMAIL_BRAND.page};">
<div style="display:none;max-height:0;max-width:0;opacity:0;overflow:hidden;font-size:1px;line-height:1px;color:${EMAIL_BRAND.page};">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL_BRAND.page}" style="background-color:${EMAIL_BRAND.page};">
  <tr>
    <td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 8px rgba(8,24,73,.06);">

        <tr>
          <td bgcolor="${EMAIL_BRAND.navy}" style="background-color:${EMAIL_BRAND.navy};padding:26px 32px;">
            <div style="font-family:${FONT_STACK};font-size:19px;font-weight:700;letter-spacing:.22em;color:#ffffff;">i-FAB</div>
            <div style="margin-top:5px;font-family:${FONT_STACK};font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${EMAIL_BRAND.sand};">${escapeHtml(eyebrow)}</div>
          </td>
        </tr>
        <tr>
          <td bgcolor="${EMAIL_BRAND.sand}" height="4" style="background-color:${EMAIL_BRAND.sand};height:4px;line-height:4px;font-size:0;">&nbsp;</td>
        </tr>

        <tr>
          <td style="padding:32px 32px 8px;">
            <h1 style="margin:0 0 10px;font-family:${FONT_STACK};font-size:22px;line-height:1.3;font-weight:700;color:${EMAIL_BRAND.navy};">${escapeHtml(heading)}</h1>
            <p style="margin:0 0 4px;font-family:${FONT_STACK};font-size:15px;line-height:1.6;color:${EMAIL_BRAND.muted};">${escapeHtml(intro)}</p>
          </td>
        </tr>

        <tr>
          <td style="padding:8px 32px 28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${bodyHtml}
            </table>
          </td>
        </tr>

        <tr>
          <td bgcolor="${EMAIL_BRAND.panel}" style="background-color:${EMAIL_BRAND.panel};padding:20px 32px;border-top:1px solid ${EMAIL_BRAND.hairline};">
            <p style="margin:0 0 6px;font-family:${FONT_STACK};font-size:13px;line-height:1.6;color:${EMAIL_BRAND.muted};">${escapeHtml(footerNote)}</p>
            <p style="margin:0;font-family:${FONT_STACK};font-size:12px;line-height:1.6;color:#9ca3af;">International Foot and Ankle Biomechanics Community</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
