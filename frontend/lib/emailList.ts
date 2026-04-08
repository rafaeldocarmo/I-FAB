/** Resend: máximo 50 destinatários no total (to + cc + bcc). */
export const RESEND_MAX_RECIPIENTS = 50;

/** Lista separada por vírgulas → emails (ex.: `JOIN_NOTIFICATION_TO`). */
export function parseEmailList(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
