import type { SanityImageSource } from "@sanity/image-url";

export type CommitteeMember = {
  _id: string;
  name: string;
  role: string;
  secondaryRole?: string | null;
  additionalInfo?: string | null;
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
  /** `link` = external URL; `pdf` = uploaded file */
  journalLinkType?: "link" | "pdf" | null;
  journalPdf?: {
    asset?: {
      url?: string | null;
      originalFilename?: string | null;
    } | null;
  } | null;
  /** Optional label above the countdown on the homepage */
  homeEyebrow?: string | null;
};

/** Props for `UpcomingConferenceHome` (CMS or defaults). */
export type UpcomingConferenceHomeProps = {
  name?: string;
  location?: string;
  date?: string;
  venue?: string;
  countdownTarget?: string;
  eyebrow?: string;
  /** Resolved journal URL (link or PDF asset); default `/conferences` */
  learnMoreUrl?: string;
  /** Whether the journal is a PDF file or external link (for icon) */
  learnMoreKind?: "link" | "pdf";
};
