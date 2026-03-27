import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/client";
import type { Congress } from "@/lib/types";
import { ConferenceHero } from "@/components/sections/ConferenceHero";
import { ConferencesContent } from "./ConferencesContent";

const CONGRESS_QUERY = `*[_type == "congress"] | order(startDate desc) {
  _id, title, slug, venue, city, country, startDate, endDate,
  editionNumber, description, images, journalUrl
}`;

const fetchOptions = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export type UpcomingConferenceData = {
  edition: number;
  name: string;
  location: string;
  date: string;
  theme: string;
  description: string;
  image: string;
};

export type PastConferenceData = {
  edition: string;
  year: string;
  location: string;
  name: string;
  description: string;
  /** Link to journal / proceedings (Sanity `journalUrl`) */
  journalUrl?: string | null;
};

const MOCK_UPCOMING: UpcomingConferenceData = {
  edition: 10,
  name: "i-FAB World Congress 2026",
  location: "Singapore, Singapore",
  date: "September 14–17, 2026",
  theme: "Bridging Science and Clinical Practice",
  description:
    "The 10th i-FAB World Congress returns to Southeast Asia for the first time, bringing together the world's foremost experts in foot and ankle biomechanics. Join us for three days of plenary lectures, symposia, free communications, and workshops at the iconic Suntec Convention Centre.",
  image: "https://images.unsplash.com/photo-1576141546153-3e04370b5ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
};

function toOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDate(start?: string | null, end?: string | null): string {
  if (!start) return "";
  const s = new Date(start);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
  description: "Since 2006, i-FAB has convened biennial world congresses that serve as the premier forum for foot and ankle biomechanics research globally.",
};

export default async function ConferencesPage() {
  const congressesRaw = await client.fetch<Congress[]>(CONGRESS_QUERY, {}, fetchOptions);

  const now = new Date();
  let upcoming: UpcomingConferenceData = MOCK_UPCOMING;
  let past: PastConferenceData[] = [];

  if (congressesRaw.length > 0) {
    const upcomingRaw = congressesRaw.find((c) => c.startDate && new Date(c.startDate) > now);
    const pastRaw = congressesRaw.filter((c) => !c.startDate || new Date(c.startDate) <= now);

    if (upcomingRaw) {
      const firstImage = upcomingRaw.images?.[0];
      const imgUrl = firstImage ? urlFor(firstImage)?.width(900).url() ?? MOCK_UPCOMING.image : MOCK_UPCOMING.image;
      upcoming = {
        edition: upcomingRaw.editionNumber ? upcomingRaw.editionNumber : MOCK_UPCOMING.edition,
        name: upcomingRaw.title,
        location: [upcomingRaw.city, upcomingRaw.country].filter(Boolean).join(", ") || MOCK_UPCOMING.location,
        date: formatDate(upcomingRaw.startDate, upcomingRaw.endDate) || MOCK_UPCOMING.date,
        theme: MOCK_UPCOMING.theme,
        description: MOCK_UPCOMING.description,
        image: imgUrl,
      };
    }

    if (pastRaw.length > 0) {
      past = pastRaw.map((c) => {
        const year = c.startDate ? new Date(c.startDate).getFullYear().toString() : "—";
        const location = [c.venue, c.city, c.country].filter(Boolean).join(", ") || "—";
        const description = typeof c.description === "string" ? c.description : "";
        return {
          edition: c.editionNumber ? toOrdinal(c.editionNumber) : "—",
          year,
          location,
          name: c.title,
          description,
          journalUrl: c.journalUrl ?? null,
        };
      });
    }
  }

  return (
    <div>
      <ConferenceHero />

      <ConferencesContent
        upcoming={upcoming}
        past={past}
      />
    </div>
  );
}
