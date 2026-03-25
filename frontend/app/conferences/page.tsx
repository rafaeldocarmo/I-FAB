import { Calendar } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/client";
import type { Congress } from "@/lib/types";
import { PageHero } from "@/components/sections/PageHero";
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
  edition: string;
  name: string;
  location: string;
  date: string;
  theme: string;
  description: string;
  highlights: string[];
  venue: string;
  image: string;
};

export type PastConferenceData = {
  edition: string;
  year: string;
  location: string;
  name: string;
  description: string;
  delegates: string;
  countries: string;
  papers: string;
};

const MOCK_UPCOMING: UpcomingConferenceData = {
  edition: "10th",
  name: "i-FAB World Congress 2026",
  location: "Singapore, Singapore",
  date: "September 14–17, 2026",
  theme: "Bridging Science and Clinical Practice",
  description:
    "The 10th i-FAB World Congress returns to Southeast Asia for the first time, bringing together the world's foremost experts in foot and ankle biomechanics. Join us for three days of plenary lectures, symposia, free communications, and workshops at the iconic Suntec Convention Centre.",
  highlights: [
    "30+ Invited Keynote Speakers",
    "5 Pre-conference Workshops",
    "Abstract Submission Opens Jan 2026",
    "Young Investigator Award",
  ],
  venue: "Suntec Convention Centre, Singapore",
  image: "https://images.unsplash.com/photo-1576141546153-3e04370b5ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
};

const MOCK_PAST: PastConferenceData[] = [
  { edition: "9th", year: "2024", location: "Chicago, USA", name: "i-FAB World Congress 2024", description: "The 9th congress convened at the Hyatt Regency Chicago, attracting over 800 delegates from 35 countries, with a focus on digital health and wearable biomechanics.", delegates: "820+", countries: "35", papers: "210" },
  { edition: "8th", year: "2022", location: "Heidelberg, Germany", name: "i-FAB World Congress 2022", description: "The first hybrid congress of the post-pandemic era, held at Heidelberg University, combining in-person and virtual attendance to maximise global participation.", delegates: "750+", countries: "32", papers: "195" },
  { edition: "7th", year: "2019", location: "Christchurch, New Zealand", name: "i-FAB World Congress 2019", description: "A landmark congress celebrating a decade of i-FAB scientific excellence, hosted at the Air Force Museum with sessions spanning gait analysis, orthotics, and surgical biomechanics.", delegates: "680+", countries: "28", papers: "185" },
  { edition: "6th", year: "2017", location: "Staffordshire, UK", name: "i-FAB World Congress 2017", description: "Held at Staffordshire University, this congress highlighted translational research and featured dedicated tracks for students and early-career researchers.", delegates: "590+", countries: "27", papers: "170" },
  { edition: "5th", year: "2015", location: "Washington DC, USA", name: "i-FAB World Congress 2015", description: "Co-hosted with the American Society of Biomechanics, the Washington congress expanded the community's reach into North American research networks.", delegates: "540+", countries: "25", papers: "155" },
  { edition: "4th", year: "2012", location: "Busan, South Korea", name: "i-FAB World Congress 2012", description: "The first i-FAB congress in Asia, hosted at BEXCO, establishing lasting relationships with Asian research institutions and clinical groups.", delegates: "490+", countries: "22", papers: "140" },
  { edition: "3rd", year: "2010", location: "Melbourne, Australia", name: "i-FAB World Congress 2010", description: "La Trobe University hosted this congress, which saw the formal ratification of i-FAB's constitution and the election of its first international governing committee.", delegates: "420+", countries: "20", papers: "125" },
  { edition: "2nd", year: "2008", location: "Dundee, Scotland", name: "i-FAB World Congress 2008", description: "The second congress, held at the University of Dundee, began establishing the biennial rhythm that now defines the i-FAB calendar.", delegates: "340+", countries: "17", papers: "108" },
  { edition: "1st", year: "2006", location: "Bologna, Italy", name: "i-FAB Inaugural Congress 2006", description: "The inaugural i-FAB congress, held at the University of Bologna — the birthplace of the community — marking the formal foundation of the international network.", delegates: "280+", countries: "14", papers: "82" },
];

function toOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDate(start?: string | null, end?: string | null): string {
  if (!start) return "";
  const s = new Date(start);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[s.getMonth()];
  const startDay = s.getDate();
  const year = s.getFullYear();
  if (end) {
    const e = new Date(end);
    return `${month} ${startDay}–${e.getDate()}, ${year}`;
  }
  return `${month} ${startDay}, ${year}`;
}

export const metadata = {
  title: "Conferences — i-FAB",
  description: "Since 2006, i-FAB has convened biennial world congresses that serve as the premier forum for foot and ankle biomechanics research globally.",
};

export default async function ConferencesPage() {
  const congressesRaw = await client.fetch<Congress[]>(CONGRESS_QUERY, {}, fetchOptions);

  const now = new Date();
  let upcoming: UpcomingConferenceData = MOCK_UPCOMING;
  let past: PastConferenceData[] = MOCK_PAST;

  if (congressesRaw.length > 0) {
    const upcomingRaw = congressesRaw.find((c) => c.startDate && new Date(c.startDate) > now);
    const pastRaw = congressesRaw.filter((c) => !c.startDate || new Date(c.startDate) <= now);

    if (upcomingRaw) {
      const firstImage = upcomingRaw.images?.[0];
      const imgUrl = firstImage ? urlFor(firstImage)?.width(900).url() ?? MOCK_UPCOMING.image : MOCK_UPCOMING.image;
      upcoming = {
        edition: upcomingRaw.editionNumber ? toOrdinal(upcomingRaw.editionNumber) : MOCK_UPCOMING.edition,
        name: upcomingRaw.title,
        location: [upcomingRaw.city, upcomingRaw.country].filter(Boolean).join(", ") || MOCK_UPCOMING.location,
        date: formatDate(upcomingRaw.startDate, upcomingRaw.endDate) || MOCK_UPCOMING.date,
        theme: MOCK_UPCOMING.theme,
        description: MOCK_UPCOMING.description,
        highlights: MOCK_UPCOMING.highlights,
        venue: upcomingRaw.venue || MOCK_UPCOMING.venue,
        image: imgUrl,
      };
    }

    if (pastRaw.length > 0) {
      past = pastRaw.map((c) => {
        const year = c.startDate ? new Date(c.startDate).getFullYear().toString() : "—";
        const location = [c.city, c.country].filter(Boolean).join(", ") || "—";
        return {
          edition: c.editionNumber ? toOrdinal(c.editionNumber) : "—",
          year,
          location,
          name: c.title,
          description: "",
          delegates: "—",
          countries: "—",
          papers: "—",
        };
      });
    }
  }

  return (
    <div>
      <PageHero
        icon={Calendar}
        badge="World Congresses"
        title="i-FAB Conferences"
        description="Since 2006, i-FAB has convened biennial world congresses that serve as the premier forum for foot and ankle biomechanics research globally."
      />

      <ConferencesContent
        upcoming={upcoming}
        past={past}
      />
    </div>
  );
}
