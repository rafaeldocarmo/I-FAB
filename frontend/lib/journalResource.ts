import type { Congress } from "@/lib/types";

/** How the journal / proceedings is provided in the CMS */
export type JournalKind = "link" | "pdf";

/**
 * Resolved URL for opening or downloading (Sanity CDN for PDF uploads).
 */
export function resolveCongressJournalHref(c: Congress): string | null {
  const mode = c.journalLinkType ?? "link";
  if (mode === "pdf") {
    const u = c.journalPdf?.asset?.url;
    return u?.trim() || null;
  }
  const u = c.journalUrl?.trim();
  return u || null;
}

export function resolveCongressJournalKind(c: Congress): JournalKind {
  return c.journalLinkType === "pdf" ? "pdf" : "link";
}
