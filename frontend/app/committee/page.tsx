import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/client";
import type { CommitteeMember } from "@/lib/types";
import { CommitteeHero } from "@/components/sections/CommitteeHero";
import { CommitteeContent } from "./CommitteeContent";

const COMMITTEE_QUERY = `*[_type == "committeeMember"] | order(name asc) {
  _id, name, role, secondaryRole, additionalInfo, image, university, country, contactUrl, socialUrl
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
  /** Optional second role line from CMS */
  secondaryRole?: string;
  affiliation: string;
  image: string;
  email: string;
  country: string;
  /** Extra text from CMS (overlay); falls back to affiliation when absent */
  additionalInfo?: string;
};

export const metadata = {
  title: "Scientific Board — i-FAB",
  description: "Our board is composed of internationally recognized experts who guide the scientific direction of i-FAB.",
};

export default async function CommitteePage() {
  const committeeRaw = await client.fetch<CommitteeMember[]>(COMMITTEE_QUERY, {}, fetchOptions);

  const committee: CommitteeMemberDisplay[] =
    committeeRaw.length > 0
      ? committeeRaw
          .map((m) => ({
            name: m.name,
            role: m.role,
            secondaryRole: m.secondaryRole ?? undefined,
            affiliation: m.university ?? "",
            image: m.image ? urlFor(m.image)?.width(400).url() ?? "" : "",
            email: m.contactUrl ?? "#",
            country: m.country ?? "",
            additionalInfo: m.additionalInfo ?? undefined,
          }))
          .sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
          )
      : [];

  return (
    <div>
      <CommitteeHero />

      <CommitteeContent committee={committee} />
    </div>
  );
}
