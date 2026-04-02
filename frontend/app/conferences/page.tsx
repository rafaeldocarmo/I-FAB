import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/client";
import { CONGRESS_LIST_QUERY } from "@/lib/congressQuery";
import type { Congress } from "@/lib/types";
import { resolveCongressJournalItems } from "@/lib/journalResource";
import type { CongressJournalResource } from "@/lib/types";
import { toOrdinal } from "@/lib/ordinal";
import { ConferenceHero } from "@/components/sections/ConferenceHero";
import { ConferencesContent } from "./ConferencesContent";

const fetchOptions = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export type UpcomingConferenceData = {
  edition: number | null;
  name: string;
  location: string;
  date: string;
  theme: string;
  description: string;
  image: string;
  journalResources: CongressJournalResource[];
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
  let upcoming: UpcomingConferenceData | null = null;
  let past: PastConferenceData[] = [];

  if (congressesRaw.length > 0) {
    const upcomingRaw = congressesRaw.find((c) => c.startDate && new Date(c.startDate) > now);
    const pastRaw = congressesRaw.filter((c) => !c.startDate || new Date(c.startDate) <= now);

    if (upcomingRaw) {
      const firstImage = upcomingRaw.images?.[0];
      const imgUrl = firstImage ? urlFor(firstImage)?.width(900).url() ?? "" : "";
      const description =
        typeof upcomingRaw.description === "string" ? upcomingRaw.description : "";
      upcoming = {
        edition: upcomingRaw.editionNumber ?? null,
        name: upcomingRaw.title,
        location: [upcomingRaw.city, upcomingRaw.country].filter(Boolean).join(", ") || "—",
        date: formatDate(upcomingRaw.startDate, upcomingRaw.endDate) || "—",
        theme: "",
        description,
        image: imgUrl,
        journalResources: resolveCongressJournalItems(upcomingRaw),
      };
    }

    if (pastRaw.length > 0) {
      past = pastRaw.map((c) => {
        const year = c.startDate ? new Date(c.startDate).getFullYear().toString() : "—";
        const datePart = formatDate(c.startDate, c.endDate);
        const dateLine =
          datePart && year !== "—" ? `${datePart}, ${year}` : datePart || year;
        const location = [c.venue, c.city, c.country].filter(Boolean).join(", ") || "—";
        const description = typeof c.description === "string" ? c.description : "";
        const firstImage = c.images?.[0];
        const imgUrl = firstImage
          ? urlFor(firstImage)?.width(1200).auto("format").url() ?? null
          : null;
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
          dateLine,
          location,
          name: c.title,
          description,
          image: imgUrl,
          imageAlt,
          journalResources: resolveCongressJournalItems(c),
        };
      });
    }
  }

  return (
    <div>
      <ConferenceHero />

      <ConferencesContent upcoming={upcoming} past={past} />
    </div>
  );
}
