import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";

export const metadata = {
  title: "Terms of Use — i-FAB",
  description:
    "The terms governing use of the International Foot and Ankle Biomechanics Community website.",
};

/**
 * i-FAB is unincorporated, which shapes two clauses that a template would get
 * wrong: there is no jurisdiction of establishment to point a governing-law
 * clause at, and liability cannot be parked on a legal entity because there
 * isn't one. Both are written to say so plainly rather than to claim a
 * protection i-FAB does not have.
 */
const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    body: [
      "By accessing or using this website you agree to these terms. If you do not agree with them, please do not use the site.",
      "The site is run by the members of the Scientific Board of i-FAB, the International Foot and Ankle Biomechanics Community. i-FAB is an international network of academic researchers; it is not incorporated in any country and has no legal personality separate from its members. The board can be reached at info@i-fab.org.",
    ],
  },
  {
    heading: "About this website",
    body: [
      "This site provides information about i-FAB, its scientific board, its mission, and its congresses, and carries a form through which you can express interest in joining the community or send a message to the board.",
      "Content is provided for general information and scientific communication. It is not medical, clinical, or professional advice, and it must not be used as a substitute for consulting a qualified professional.",
      "The site is provided free of charge. Using it does not make you a customer, and nothing on it is offered for sale.",
    ],
  },
  {
    heading: "Permitted use",
    body: [
      "You may browse the site and use its form for its intended purpose. You agree not to:",
    ],
    bullets: [
      "use the site or its form to send unlawful, abusive, misleading, or unsolicited commercial messages;",
      "attempt to gain unauthorised access to the site, its systems, or its underlying infrastructure;",
      "interfere with the operation of the site, including by circumventing rate limits or submitting automated traffic; or",
      "scrape, copy, or redistribute the site's content at scale without our prior written permission.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The i-FAB name and logo, and the text and design of this site, belong to i-FAB or its licensors and are protected by copyright and other rights. The congress photographs published here are i-FAB's own.",
      "Programmes, proceedings, and other documents published through the site remain the work of their authors and are made available here with their permission.",
      "You may quote from the site or link to it with appropriate attribution. Any other reuse — republishing photographs, reproducing pages, or redistributing documents — needs our permission first: write to info@i-fab.org.",
      "If you appear in a congress photograph on this site and would prefer it were not published, write to info@i-fab.org and we will remove it.",
    ],
  },
  {
    heading: "Material you submit",
    body: [
      "When you submit information through the form on our Join page, under either subject, you confirm that the information is accurate and that you are entitled to provide it.",
      "Personal data submitted through the form is handled as described in our Privacy Policy.",
      "Submitting the form under the joining subject is an expression of interest and nothing more. It does not create membership, confer any status within i-FAB, or oblige us to respond — i-FAB keeps no formal membership register and runs no admission process.",
      "A message sent to the board is read by its members, who will normally reply, but we cannot promise a response or a particular timescale.",
    ],
  },
  {
    heading: "Links to other sites",
    body: [
      "This site links to external resources, including journal and proceedings pages hosted by third parties. We do not control those sites and are not responsible for their content, availability, or privacy practices. Following an external link is at your own risk.",
    ],
  },
  {
    heading: "Availability and accuracy",
    body: [
      "We aim to keep the site available and its content accurate and current, but we do not guarantee either. Congress dates, venues, and board composition may change, and the site may be unavailable for maintenance or for reasons beyond our control.",
      "The site is provided on an “as is” and “as available” basis, without warranties of any kind to the fullest extent permitted by law.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "The site is offered free of charge and for information. To the fullest extent permitted by law, neither i-FAB, nor the members of its Scientific Board, nor anyone operating the site on their behalf is liable for any loss or damage arising from your use of the site or from reliance on anything published on it — including loss arising from the site being unavailable, incomplete, out of date, or inaccurate, or from the content of any site we link to.",
      "Nothing in these terms excludes or limits liability where it would be unlawful to do so, including liability for death or personal injury caused by negligence, or for fraud.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may revise these terms from time to time. The date at the top of this page shows when they were last changed, and the revised terms apply from the moment they are posted.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "Because i-FAB is not incorporated in any country, these terms do not name a single governing law or a single court with jurisdiction, and we make no attempt to require you to bring a claim somewhere far from home.",
      "Nothing in these terms takes away a right you have under the mandatory law of the country where you live.",
    ],
  },
  {
    heading: "Contact",
    body: ["Questions about these terms can be sent to info@i-fab.org."],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Use"
      lastUpdated="16 September 2026"
      intro="These terms govern your use of the i-FAB website. Please read them before using the site or submitting information through it."
      sections={SECTIONS}
    />
  );
}
