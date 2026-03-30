import type { Congress, UpcomingConferenceHomeProps } from "@/lib/types";
import { formatConferenceHomeDate } from "@/lib/conferenceDates";
import {
  resolveCongressJournalHref,
  resolveCongressJournalKind,
} from "@/lib/journalResource";

export function pickUpcomingCongress(
  congresses: Congress[],
  now: Date = new Date(),
): Congress | null {
  const upcoming = congresses.find(
    (c) => c.startDate && new Date(c.startDate) > now,
  );
  return upcoming ?? null;
}

export function mapCongressToHomeProps(
  c: Congress,
): UpcomingConferenceHomeProps {
  const location =
    [c.city, c.country].filter(Boolean).join(", ") || undefined;
  const date = formatConferenceHomeDate(c.startDate, c.endDate) || undefined;

  const journalHref = resolveCongressJournalHref(c);
  const journalKind = resolveCongressJournalKind(c);
  return {
    name: c.title,
    location,
    date,
    venue: c.venue ?? undefined,
    countdownTarget: c.startDate ?? undefined,
    eyebrow: c.homeEyebrow ?? undefined,
    learnMoreUrl: journalHref || undefined,
    learnMoreKind: journalKind,
  };
}
