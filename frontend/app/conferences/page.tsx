import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/client";
import { CONGRESS_LIST_QUERY } from "@/lib/congressQuery";
import type { Congress } from "@/lib/types";
import { resolveCongressJournalItems } from "@/lib/journalResource";
import type { CongressJournalResource } from "@/lib/types";
import { toOrdinal } from "@/lib/ordinal";
import { formatConferenceHomeDate } from "@/lib/conferenceDates";
import { listUpcomingCongresses } from "@/lib/mapCongressToHome";
import { ConferenceHero } from "@/components/sections/ConferenceHero";
import { ConferencesContent } from "./ConferencesContent";

const fetchOptions = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export type UpcomingConferenceData = {
  id: string;
  edition: number | null;
  name: string;
  location: string;
  date: string;
  theme: string;
  description: string;
  image: string;
  journalResources: CongressJournalResource[];
  /** Coluna da imagem no card upcoming (Conferences) */
  imageBackdrop: "light" | "dark";
};

export type PastConferenceData = {
  edition: string;
  year: string;
  /** Formatted congress dates with year, e.g. "14-17 September, 2024" */
  dateLine: string;
  location: string;
  name: string;
  description: string;
  image: string | null;
  imageAlt: string;
  journalResources: CongressJournalResource[];
};

function toUpcoming(c: Congress): UpcomingConferenceData {
  const firstImage = c.images?.[0];
  return {
    id: c._id,
    edition: c.editionNumber ?? null,
    name: c.title,
    location:
      [c.venue, c.city, c.country].filter(Boolean).join(", ") || "—",
    date: formatConferenceHomeDate(c.startDate, c.endDate) || "—",
    theme: "",
    description: typeof c.description === "string" ? c.description : "",
    image: firstImage ? urlFor(firstImage)?.width(900).url() ?? "" : "",
    journalResources: resolveCongressJournalItems(c),
    imageBackdrop: c.upcomingCardImageBackdrop === "light" ? "light" : "dark",
  };
}

/** Past-conference date line, e.g. "14-17 September" (year is appended by `toPast`). */
function formatDate(start?: string | null, end?: string | null): string {
  if (!start) return "";
  const s = new Date(start);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const startMonth = monthNames[s.getMonth()];
  const startDay = s.getDate();
  if (end) {
    const e = new Date(end);
    const endMonth = monthNames[e.getMonth()];
    const endDay = e.getDate();
    if (startMonth === endMonth) return `${startDay}-${endDay} ${startMonth}`;
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  }
  return `${startDay} ${startMonth}`;
}

function toPast(c: Congress): PastConferenceData {
  const year = c.startDate ? new Date(c.startDate).getFullYear().toString() : "—";
  const datePart = formatDate(c.startDate, c.endDate);
  const firstImage = c.images?.[0];
  const imageAlt =
    firstImage &&
    typeof firstImage === "object" &&
    "alt" in firstImage &&
    typeof firstImage.alt === "string" &&
    firstImage.alt.trim()
      ? firstImage.alt.trim()
      : `${c.title} — ${year}`;

  return {
    edition: c.editionNumber ? toOrdinal(c.editionNumber) : "—",
    year,
    dateLine:
      datePart && year !== "—" ? `${datePart}, ${year}` : datePart || year,
    location: [c.venue, c.city, c.country].filter(Boolean).join(", ") || "—",
    name: c.title,
    description: typeof c.description === "string" ? c.description : "",
    image: firstImage ? urlFor(firstImage)?.width(1200).auto("format").url() ?? null : null,
    imageAlt,
    journalResources: resolveCongressJournalItems(c),
  };
}

export const metadata = {
  title: "Conferences — i-FAB",
  description:
    "Since 2006, i-FAB has convened biennial world congresses that serve as the premier forum for foot and ankle biomechanics research globally.",
};

export default async function ConferencesPage() {
  const congressesRaw = await client.fetch<Congress[]>(
    CONGRESS_LIST_QUERY,
    {},
    fetchOptions,
  );

  const now = new Date();
  // Single split: everything not upcoming is past, so no congress can fall through
  // the gap and disappear from the page.
  const upcomingRaw = listUpcomingCongresses(congressesRaw, now);
  const upcomingIds = new Set(upcomingRaw.map((c) => c._id));

  const upcoming = upcomingRaw.map(toUpcoming);
  const past = congressesRaw.filter((c) => !upcomingIds.has(c._id)).map(toPast);

  return (
    <div>
      <ConferenceHero />

      <ConferencesContent upcoming={upcoming} past={past} />
    </div>
  );
}
