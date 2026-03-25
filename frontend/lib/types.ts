import type { SanityImageSource } from "@sanity/image-url";

export type CommitteeMember = {
  _id: string;
  name: string;
  role: string;
  image?: (SanityImageSource & { alt?: string | null }) | null;
  university?: string | null;
  country?: string | null;
  contactUrl?: string | null;
  socialUrl?: string | null;
};

export type Congress = {
  _id: string;
  title: string;
  slug?: { current?: string | null } | null;
  venue?: string | null;
  city?: string | null;
  country?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  editionNumber?: number | null;
  description?: unknown;
  images?:
    | Array<SanityImageSource & { alt?: string | null; caption?: string | null }>
    | null;
  journalUrl?: string | null;
};
