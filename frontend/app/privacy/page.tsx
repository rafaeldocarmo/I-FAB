import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";

export const metadata = {
  title: "Privacy Policy — i-FAB",
  description:
    "How the International Foot and Ankle Biomechanics Community collects, uses, and protects personal data submitted through this website.",
  // Draft: keep out of search results until the content is signed off.
  robots: { index: false, follow: false },
};

/**
 * Every factual section mirrors what the site actually does today: the form on
 * /join (`app/api/join/route.ts`) emails the board via Resend and saves a
 * record to Sanity under either subject — membership interest or a message for
 * the board — and mail written to the published address is received and
 * forwarded by Resend (`app/api/inbound/route.ts`).
 *
 * The organisational questions have been settled by the board: i-FAB is an
 * unincorporated academic network, info@i-fab.org is the single contact
 * address, congress photographs are i-FAB's own, joining is an expression of
 * interest only, and retention is enforced on a schedule rather than by hand.
 *
 * Two things still have to be true before the `draft` flag comes off and the
 * page is allowed into search results: the scheduled deletion described under
 * "How long we keep your data" has to actually exist, and the board has to
 * sign the document off on a date.
 */
const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "i-FAB — the International Foot and Ankle Biomechanics Community — is an international network of academic researchers. It is not a company or a registered charity, and it has no legal personality separate from the people who make it up.",
      "This website is operated by the members of the i-FAB Scientific Board, who are named on our Scientific Board page. They are jointly responsible for the personal data described in this policy, and in data protection terms they act together as its controller.",
      "i-FAB is far below the size at which a Data Protection Officer must be appointed, so there is no separate privacy office to write to. Everything covered by this policy — including a request about your own data — goes to info@i-fab.org, which reaches the board.",
    ],
  },
  {
    heading: "What personal data we collect",
    body: [
      "We only hold personal data that you send us yourself. There is no account to create, and we do not buy or otherwise acquire personal data from anyone else.",
      "There is one form, on our Join page. It asks what your enquiry is about — joining the community, or a message for the board — and collects the same details either way: your full name, email address, employer, city, country, main role, research line, and anything you choose to write in the message box. Only the name, email address and main role are required, plus the message itself if you are writing to the board.",
      "Each submission is saved as a record in our content management system, together with the date and time it was made, which of the two subjects you chose, and — if you ticked the box for email updates — the exact wording of the consent you agreed to, so that we can show what was agreed rather than merely that a box was ticked.",
      "Because the message box is free text, please include only what you want the board to have. Do not send sensitive information such as health data through it.",
      "If you write to info@i-fab.org, we hold your message. The i-FAB domain has no mailbox of its own, so mail sent to that address is received by Resend, our email provider, and forwarded on to the board members' own inboxes at Gmail. Your address, your message and any attachments pass through both.",
      "This site is hosted by Vercel, which processes technical data such as your IP address and browser user agent in order to serve the pages you ask for and to apply basic abuse protection. Vercel keeps those request logs for one hour and then deletes them automatically. We have not enabled extended log retention or log export, we do not copy the logs anywhere else, and we do not use them to build any picture of who visits the site.",
    ],
  },
  {
    heading: "How we use your data, and our legal basis",
    body: [
      "Replying to you, and — where you asked to join — considering your interest in the community. Our legal basis is our legitimate interests, Article 6(1)(f) GDPR. You approached us through a form whose purpose is stated on the page, we ask for no more than that form shows, we use what you send for nothing else, and we do not publish it on this website.",
      "Sending you occasional email about congresses and community news. Our legal basis here is your consent, Article 6(1)(a) GDPR. This is a separate question from answering you, so the Join form asks it separately, with a box that is not pre-ticked. Leaving it unticked has no effect on the rest of your submission. You may withdraw at any time by writing to info@i-fab.org, and we will stop.",
      "Email addresses given to us before that box existed are on no list and will not be added to one. Consent cannot be assumed after the event, so those addresses are used only to reply to the person who sent them.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "This website sets no cookies of its own. It carries no analytics, no advertising or tracking scripts, and no embedded social media or video players. Vercel sells a visitor analytics product for sites it hosts, and we have not turned it on. Nothing here profiles you or follows you to other sites, which is why you are not asked to dismiss a consent banner.",
      "If we ever add analytics or embedded media, we will update this section and, where the law requires it, ask for your consent before doing so.",
    ],
  },
  {
    heading: "Who we share your data with",
    body: [
      "We do not sell your personal data, and we never share it for advertising. We share it only with the service providers that run the site for us, each under contract and on our instructions:",
    ],
    bullets: [
      "Resend — sends the notification email generated by the form, in whose body your submitted details appear, and receives and forwards mail addressed to info@i-fab.org.",
      "Sanity — our content management system. As well as holding the editorial content of this site, it stores form submissions so the board can review them together.",
      "Google — the board reads and keeps this correspondence in mailboxes held with Gmail.",
      "Vercel — hosts the site and serves every page and form submission, and so handles the technical data described above.",
      "We may also disclose personal data where the law requires us to.",
    ],
  },
  {
    heading: "International transfers",
    body: [
      "Vercel, Resend, Sanity and Google are all United States companies and process data there, and the board members themselves are spread across several countries, so your data will cross borders.",
      "Each of those providers processes personal data for us under its own data processing agreement, which incorporates the Standard Contractual Clauses approved by the European Commission for transfers of this kind.",
    ],
  },
  {
    heading: "How long we keep your data",
    body: [
      "We keep form submissions for four years from the date they are made, whichever subject they were sent under. That period spans two congress cycles, which is how long a submission stays useful for the purpose it was given for.",
      "After four years the record is deleted from the content management system on a schedule, so that nobody has to remember to do it. The notification email that went to the board at the time is a second copy of the same details, and it is cleared from the inbox on the same four-year schedule.",
      "Until the end of August 2026 a separate Contact the Board form, with its own name, email and message fields, was offered on the Scientific Board page. It has been replaced by the single form described above. Messages sent through it while it existed may still be held in the inbox that received them, and the same four-year rule applies to them.",
      "If you ask us to delete your data sooner than that, we will. See Your rights below.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "If you are in the United Kingdom, the European Economic Area, or another jurisdiction with comparable legislation, you have the right to:",
    ],
    bullets: [
      "request access to the personal data we hold about you;",
      "request that inaccurate data be corrected;",
      "request erasure of your data;",
      "request that we restrict processing, or object to it;",
      "request a copy of your data in a portable format;",
      "withdraw consent at any time, where we rely on consent; and",
      "lodge a complaint with a data protection authority.",
    ],
  },
  {
    heading: "How to exercise them",
    body: [
      "Write to info@i-fab.org. We will answer within one month, and there is no charge.",
      "On complaints: because i-FAB has no establishment in the European Economic Area or the United Kingdom, there is no single lead supervisory authority for it. If you are in the EEA or the UK, the authority to approach is the one for the country where you live or work. We would of course rather hear from you first.",
    ],
  },
  {
    heading: "Security",
    body: [
      "The site is served over HTTPS with a strict transport security policy, sets a content security policy, and rate-limits its form endpoint. Submissions are written to the content management system with a token held on the server, which is never exposed to your browser.",
      "No method of transmission or storage is completely secure, and we cannot guarantee absolute security. Please do not send sensitive personal information — such as health data — through the form.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The date at the top of this page shows when it was last revised.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      "For any question about this policy, or to exercise any of the rights above, write to info@i-fab.org.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      draft
      title="Privacy Policy"
      lastUpdated="[[TO CONFIRM: the date the board signs this off]]"
      intro="This policy explains what personal data the i-FAB website collects, why we collect it, who it is shared with, and the rights you have over it."
      sections={SECTIONS}
    />
  );
}
