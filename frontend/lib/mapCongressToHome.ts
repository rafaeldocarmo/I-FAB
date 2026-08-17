import type { Congress, UpcomingConferenceHomeProps } from "@/lib/types";
import { formatConferenceHomeDate } from "@/lib/conferenceDates";
import { resolveCongressJournalItems } from "@/lib/journalResource";

/** Epoch ms for a CMS date, or `null` when absent/unparseable. */
function congressTime(raw?: string | null): number | null {
  if (!raw) return null;
  const t = new Date(raw).getTime();
  return Number.isNaN(t) ? null : t;
}

/**
 * Every congress that has not finished yet, soonest first — including one that is
 * currently running. A congress counts as running until `endDate`; without an
 * `endDate` it is over once `startDate` passes.
 *
 * Callers must treat this as the single source of truth for the upcoming/past split:
 * anything not returned here is past, which keeps every congress on exactly one list.
 */
export function listUpcomingCongresses(
  congresses: Congress[],
  now: Date = new Date(),
): Congress[] {
  const tNow = now.getTime();
  return congresses
    .filter((c) => {
      const start = congressTime(c.startDate);
      if (start === null) return false;
      return (congressTime(c.endDate) ?? start) >= tNow;
    })
    .sort((a, b) => (congressTime(a.startDate) ?? 0) - (congressTime(b.startDate) ?? 0));
}

/** The next congress, or the one running right now; `null` when there is none. */
export function pickUpcomingCongress(
  congresses: Congress[],
  now: Date = new Date(),
): Congress | null {
  return listUpcomingCongresses(congresses, now)[0] ?? null;
}

export function mapCongressToHomeProps(
  c: Congress,
): UpcomingConferenceHomeProps {
  const location = [c.city, c.country].filter(Boolean).join(", ") || "—";
  const date = formatConferenceHomeDate(c.startDate, c.endDate) || "—";

  const learnMoreItems = resolveCongressJournalItems(c);

  const eyebrow =
    typeof c.homeEyebrow === "string" && c.homeEyebrow.trim()
      ? c.homeEyebrow.trim()
      : undefined;

  const description =
    typeof c.description === "string" ? c.description.trim() : "";

  return {
    name: c.title.trim() || "i-FAB Congress",
    location,
    date,
    venue: c.venue ?? undefined,
    countdownTarget: c.startDate as string,
    eyebrow,
    editionNumber: c.editionNumber,
    ...(description ? { description } : {}),
    learnMoreItems: learnMoreItems.length > 0 ? learnMoreItems : undefined,
  };
}
