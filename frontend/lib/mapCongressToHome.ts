import type { Congress, UpcomingConferenceHomeProps } from "@/lib/types";
import { formatConferenceHomeDate } from "@/lib/conferenceDates";
import { resolveCongressJournalItems } from "@/lib/journalResource";

export function pickUpcomingCongress(
  congresses: Congress[],
  now: Date = new Date(),
): Congress | null {
  let best: Congress | null = null;
  let bestTime = Infinity;
  const tNow = now.getTime();
  for (const c of congresses) {
    if (!c.startDate) continue;
    const t = new Date(c.startDate).getTime();
    if (Number.isNaN(t) || t <= tNow) continue;
    if (t < bestTime) {
      bestTime = t;
      best = c;
    }
  }
  return best;
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
