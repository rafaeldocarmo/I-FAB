import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/client";
import type { CommitteeMember } from "@/lib/types";
import { CommitteeHero } from "@/components/sections/CommitteeHero";
import { CommitteeContent } from "./CommitteeContent";

const COMMITTEE_QUERY = `*[_type == "committeeMember"] | order(name asc) {
  _id, name, role, image, university, country, contactUrl, socialUrl
}`;

const fetchOptions = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export type CommitteeMemberDisplay = {
  name: string;
  role: string;
  affiliation: string;
  image: string;
  email: string;
  country: string;
};

const MOCK_COMMITTEE: CommitteeMemberDisplay[] = [
  {
    name: "Prof. James A. Woodburn",
    role: "President",
    affiliation: "Glasgow Caledonian University, UK",
    image: "https://images.unsplash.com/photo-1659353888640-91aa7c25fa29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    email: "#",
    country: "🇬🇧",
  },
  {
    name: "Prof. Anita Bhatt",
    role: "Vice-President",
    affiliation: "University of Melbourne, Australia",
    image: "https://images.unsplash.com/photo-1758685848006-1bc450061624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    email: "#",
    country: "🇦🇺",
  },
  {
    name: "Dr. Claudia Menz",
    role: "Secretary General",
    affiliation: "La Trobe University, Australia",
    image: "https://images.unsplash.com/photo-1758685848226-eedca8f6bce7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    email: "#",
    country: "🇦🇺",
  },
  {
    name: "Prof. Chen-Wei Liu",
    role: "Treasurer",
    affiliation: "National Taiwan University, Taiwan",
    image: "https://images.unsplash.com/photo-1691935152210-35ae500d91d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    email: "#",
    country: "🇹🇼",
  },
  {
    name: "Dr. Yuki Tanaka",
    role: "Scientific Committee Chair",
    affiliation: "University of Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    email: "#",
    country: "🇯🇵",
  },
  {
    name: "Prof. Marco Di Prampero",
    role: "Congress Chair 2026",
    affiliation: "University of Bologna, Italy",
    image: "https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    email: "#",
    country: "🇮🇹",
  },
  {
    name: "Prof. Chen-Wei Liw",
    role: "Treasurer",
    affiliation: "National Taiwan University, Taiwan",
    image: "https://images.unsplash.com/photo-1691935152210-35ae500d91d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    email: "#",
    country: "🇹🇼",
  },
  {
    name: "Dr. Yuki Tanako",
    role: "Scientific Committee Chair",
    affiliation: "University of Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    email: "#",
    country: "🇯🇵",
  },
  {
    name: "Prof. Marco Di Prampera",
    role: "Congress Chair 2026",
    affiliation: "University of Bologna, Italy",
    image: "https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    email: "#",
    country: "🇮🇹",
  },
];


export const metadata = {
  title: "Scientific Committee — i-FAB",
  description: "Our committee is composed of internationally recognized experts who guide the scientific direction of i-FAB.",
};

export default async function CommitteePage() {
  const committeeRaw = await client.fetch<CommitteeMember[]>(COMMITTEE_QUERY, {}, fetchOptions);

  const committee: CommitteeMemberDisplay[] =
    committeeRaw.length > 0
      ? committeeRaw.map((m) => ({
          name: m.name,
          role: m.role,
          affiliation: m.university ?? "",
          image: m.image ? urlFor(m.image)?.width(400).url() ?? "" : "",
          email: m.contactUrl ?? "#",
          country: m.country ?? "",
        }))
      : MOCK_COMMITTEE;

  return (
    <div>
      <CommitteeHero />

      <CommitteeContent
        committee={MOCK_COMMITTEE}
      />
    </div>
  );
}
