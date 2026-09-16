import {
  emailBadge,
  emailLink,
  emailRow,
  emailRowBlock,
  emailRowRaw,
  escapeHtml,
  renderEmailShell,
} from "@/lib/emailLayout";
import { PURPOSE_LABEL, type Purpose } from "@/lib/purpose";

/** Re-exported so existing importers keep working. */
export { escapeHtml };

export type JoinPayload = {
  purpose: Purpose;
  fullName: string;
  email: string;
  employer: string;
  city: string;
  country: string;
  mainRole: string;
  researchLine: string;
  message: string;
  communicationsConsent: boolean;
};

/**
 * How each purpose introduces itself. The board triages from the subject line
 * and the first line of the preview, so a message waiting on a reply must not
 * look like a membership interest waiting on a decision.
 */
const FRAMING: Record<
  Purpose,
  { eyebrow: string; heading: string; intro: (name: string) => string }
> = {
  join: {
    eyebrow: "Join iFAB",
    heading: "New membership interest",
    intro: (name) => `${name} has asked to join the iFAB community.`,
  },
  contact: {
    eyebrow: "Contact the board",
    heading: "New message for the board",
    intro: (name) => `${name} has written to the board and is waiting on a reply.`,
  },
};

/** "London, United Kingdom", or whichever half was filled in. */
function formatLocation(p: JoinPayload): string {
  return [p.city, p.country].filter(Boolean).join(", ");
}

function formatSubmittedAt(when: Date): string {
  return `${when.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

export function buildJoinNotificationHtml(
  p: JoinPayload,
  submittedAt: Date = new Date(),
): string {
  const bodyHtml = [
    emailRow("Enquiry", PURPOSE_LABEL[p.purpose]),
    emailRow("Full name", p.fullName),
    emailRowRaw("Email", emailLink(p.email)),
    emailRowRaw("Main role", emailBadge(p.mainRole)),
    emailRow("Research line", p.researchLine),
    emailRow("Employer", p.employer),
    emailRow("Location", formatLocation(p)),
    emailRowBlock("Message", p.message),
    emailRow(
      "Email updates",
      p.communicationsConsent
        ? "Opted in — may be contacted about meetings and community news"
        : "Not opted in — do not add to any mailing list",
    ),
    emailRow("Submitted", formatSubmittedAt(submittedAt)),
  ].join("\n");

  const framing = FRAMING[p.purpose];

  return renderEmailShell({
    eyebrow: framing.eyebrow,
    heading: framing.heading,
    intro: framing.intro(p.fullName),
    preheader: `${p.fullName} — ${p.mainRole}${formatLocation(p) ? ` — ${formatLocation(p)}` : ""}`,
    bodyHtml,
    footerNote:
      "Reply to this email to answer them directly — the reply-to address is already set to the sender. This submission is also saved in the Sanity Studio.",
  });
}

/** Plain-text alternative. Improves deliverability and serves text-only clients. */
export function buildJoinNotificationText(
  p: JoinPayload,
  submittedAt: Date = new Date(),
): string {
  const framing = FRAMING[p.purpose];

  return [
    `iFAB — ${framing.eyebrow}`,
    framing.heading,
    "",
    framing.intro(p.fullName),
    "",
    `Enquiry:       ${PURPOSE_LABEL[p.purpose]}`,
    `Full name:     ${p.fullName}`,
    `Email:         ${p.email}`,
    `Main role:     ${p.mainRole}`,
    `Research line: ${p.researchLine || "—"}`,
    `Employer:      ${p.employer || "—"}`,
    `Location:      ${formatLocation(p) || "—"}`,
    `Submitted:     ${formatSubmittedAt(submittedAt)}`,
    "",
    "Message:",
    p.message || "—",
    "",
    `Email updates:  ${p.communicationsConsent ? "opted in" : "NOT opted in — do not add to any mailing list"}`,
    "",
    "Reply to this email to answer them directly.",
    "This submission is also saved in the Sanity Studio.",
  ].join("\n");
}

