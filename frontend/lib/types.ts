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

export type CongressJournalItem = {
  _key?: string;
  kind?: "link" | "pdf" | "image" | null;
  label?: string | null;
  url?: string | null;
  file?: {
    asset?: {
      url?: string | null;
      originalFilename?: string | null;
    } | null;
  } | null;
  image?: {
    alt?: string | null;
    asset?: { url?: string | null } | null;
  } | null;
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
  /** Multiple journal / proceedings entries (preferred). */
  journalItems?: CongressJournalItem[] | null;
  journalUrl?: string | null;
  /** `link` = external URL; `pdf` = uploaded file — legacy when journalItems is empty */
  journalLinkType?: "link" | "pdf" | null;
  journalPdf?: {
    asset?: {
      url?: string | null;
      originalFilename?: string | null;
    } | null;
  } | null;
  /** Optional label above the countdown on the homepage */
  homeEyebrow?: string | null;
  /** Conferences upcoming card: `light` = pale image column; `dark` = brand gradient */
  upcomingCardImageBackdrop?: "light" | "dark" | null;
};

/** Resolved journal row for UI (link, PDF, or image URL). */
export type CongressJournalResource = {
  href: string;
  kind: "link" | "pdf" | "image";
  label?: string | null;
  /** Sanity `originalFilename` for PDF assets (past conferences UI). */
  fileName?: string | null;
};

/** Props for `UpcomingConferenceHome` (CMS or defaults). */
export type UpcomingConferenceHomeProps = {
  name?: string;
  location?: string;
  date?: string;
  venue?: string;
  countdownTarget?: string;
  eyebrow?: string;
  /** One or more journal / proceedings actions from CMS */
  learnMoreItems?: CongressJournalResource[];
  /** @deprecated use learnMoreItems */
  learnMoreUrl?: string;
  learnMoreKind?: "link" | "pdf";
};
