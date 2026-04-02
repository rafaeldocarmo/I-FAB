import type { Congress, CongressJournalResource } from "@/lib/types";

export type JournalKind = "link" | "pdf" | "image";

function legacyJournalHref(c: Congress): string | null {
  const mode = c.journalLinkType ?? "link";
  if (mode === "pdf") {
    const u = c.journalPdf?.asset?.url;
    return u?.trim() || null;
  }
  const u = c.journalUrl?.trim();
  return u || null;
}

function legacyJournalKind(c: Congress): Exclude<JournalKind, "image"> {
  return c.journalLinkType === "pdf" ? "pdf" : "link";
}

/**
 * All resolved journal / proceedings URLs for a congress (new list + legacy fallback).
 */
export function resolveCongressJournalItems(c: Congress): CongressJournalResource[] {
  const rows = c.journalItems;
  if (rows && rows.length > 0) {
    const out: CongressJournalResource[] = [];
    for (const row of rows) {
      const k = row.kind;
      if (k === "link") {
        const u = row.url?.trim();
        if (u) out.push({ href: u, kind: "link", label: row.label });
      } else if (k === "pdf") {
        const u = row.file?.asset?.url?.trim();
        const fn = row.file?.asset?.originalFilename?.trim();
        if (u) out.push({ href: u, kind: "pdf", label: row.label, fileName: fn || null });
      } else if (k === "image") {
        const u = row.image?.asset?.url?.trim();
        if (u) out.push({ href: u, kind: "image", label: row.label });
      }
    }
    if (out.length > 0) return out;
  }

  const href = legacyJournalHref(c);
  if (!href) return [];
  const legacyKind = legacyJournalKind(c);
  const legacyFile =
    legacyKind === "pdf"
      ? c.journalPdf?.asset?.originalFilename?.trim() || null
      : null;
  return [{ href, kind: legacyKind, label: null, fileName: legacyFile }];
}

/** First journal href, or null (legacy helper). */
export function resolveCongressJournalHref(c: Congress): string | null {
  const items = resolveCongressJournalItems(c);
  return items[0]?.href ?? null;
}

export function resolveCongressJournalKind(c: Congress): JournalKind {
  return resolveCongressJournalItems(c)[0]?.kind ?? "link";
}

export function journalResourceButtonLabel(
  item: CongressJournalResource,
  index: number,
  total: number,
): string {
  const custom = item.label?.trim();
  if (custom) return custom;
  if (total === 1) return "Learn More";
  if (item.kind === "pdf") return "PDF";
  if (item.kind === "image") return "Image";
  return "Link";
}
