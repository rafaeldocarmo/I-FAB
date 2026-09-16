import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";

export const metadata = {
  title: "Privacy Policy — iFAB",
  description:
    "How the International Foot and Ankle Biomechanics Community collects, uses, and protects personal data submitted through this website.",
};

/**
 * Every factual section mirrors what the site actually does today: the form on
 * /join (`app/api/join/route.ts`) emails the board via Resend and saves a
 * record to Sanity under either subject — membership interest or a message for
 * the board — and mail written to the published address is received and
 * forwarded by Resend (`app/api/inbound/route.ts`).
 *
 * The organisational questions have been settled by the board: iFAB is an
 * unincorporated academic network, info@i-fab.org is the single contact
 * address, meeting photographs are iFAB's own, joining is an expression of
 * interest only, and retention is enforced on a schedule rather than by hand.
 *
 * Published: the scheduled deletion this promises is real and verified against
 * a deployment, and the board has put a date on the text. Anyone revising this
 * should pass `draft` again while the wording is unsettled — it restores the
 * banner and keeps the page out of search results.
 *
 * One limit is stated rather than engineered away: the board reads this
 * correspondence in mailboxes their employers run, so the four-year rule is
 * enforced automatically on iFAB's own copy and asked for on theirs. Do not
 * let that sentence drift into claiming more.
 */
const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "iFAB — the International Foot and Ankle Biomechanics Community — is an international network of academic researchers. It is not a company or a registered charity, and it has no legal personality separate from the people who make it up.",
      "This website is operated by the members of the iFAB Scientific Board, who are named on our Scientific Board page. They are jointly responsible for the personal data described in this policy, and in data protection terms they act together as its controller.",
      "iFAB is far below the size at which a Data Protection Officer must be appointed, so there is no separate privacy office to write to. Everything covered by this policy — including a request about your own data — goes to info@i-fab.org, which reaches the board.",
    ],
  },
  {
    heading: "What personal data we collect",
    body: [
      "We only hold personal data that you send us yourself. There is no account to create, and we do not buy or otherwise acquire personal data from anyone else.",
      "There is one form, on our Join page. It asks what your enquiry is about — joining the community, or a message for the board — and collects the same details either way: your full name, email address, employer, city, country, main role, research line, and anything you choose to write in the message box. Only the name, email address and main role are required, plus the message itself if you are writing to the board.",
      "Each submission is saved as a record in our content management system, together with the date and time it was made, which of the two subjects you chose, and — if you ticked the box for email updates — the exact wording of the consent you agreed to, so that we can show what was agreed rather than merely that a box was ticked.",
      "Because the message box is free text, please include only what you want the board to have. Do not send sensitive information such as health data through it.",
      "If you write to info@i-fab.org, we hold your message. The iFAB domain has no mailbox of its own, so mail sent to that address is received by Resend, our email provider, and forwarded on to the board members' institutional mailboxes — the email accounts their universities and employers provide. Your address, your message and any attachments pass through both.",
      "This site is hosted by Vercel, which processes technical data such as your IP address and browser user agent in order to serve the pages you ask for and to apply basic abuse protection. Vercel keeps those request logs for one hour and then deletes them automatically. We have not enabled extended log retention or log export, we do not copy the logs anywhere else, and we do not use them to build any picture of who visits the site.",
    ],
  },
  {
    heading: "How we use your data, and our legal basis",
    body: [
      "Replying to you, and — where you asked to join — considering your interest in the community. Our legal basis is our legitimate interests, Article 6(1)(f) GDPR. You approached us through a form whose purpose is stated on the page, we ask for no more than that form shows, we use what you send for nothing else, and we do not publish it on this website.",
      "Sending you occasional email about meetings and community news. Our legal basis here is your consent, Article 6(1)(a) GDPR. This is a separate question from answering you, so the Join form asks it separately, with a box that is not pre-ticked. Leaving it unticked has no effect on the rest of your submission. You may withdraw at any time by writing to info@i-fab.org, and we will stop.",
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
      "Vercel — hosts the site and serves every page and form submission, and so handles the technical data described above.",
    ],
  },
  {
    heading: "Where the board reads your message",
    body: [
      "The board members are academics, and they receive iFAB correspondence in the mailboxes their own universities and employers provide. Your message is therefore read, and kept, inside email systems that those institutions run and that iFAB does not administer.",
      "We tell you this plainly because it has a consequence we cannot engineer away: iFAB can delete its own copy of a submission on a schedule, but it cannot reach into an employer's mail system to enforce one. See How long we keep your data.",
      "We may also disclose personal data where the law requires us to.",
    ],
  },
  {
    heading: "International transfers",
    body: [
      "Vercel, Resend and Sanity are all United States companies and process data there, and the board members themselves are spread across several countries, so your data will cross borders.",
      "Each of those three providers processes personal data for us under its own data processing agreement, which incorporates the Standard Contractual Clauses approved by the European Commission for transfers of this kind.",
    ],
  },
  {
    heading: "How long we keep your data",
    body: [
      "We keep form submissions for four years from the date they are made, whichever subject they were sent under. That period spans two meeting cycles, which is how long a submission stays useful for the purpose it was given for.",
      "After four years the record is deleted from the content management system automatically, by a scheduled job that runs every day. Nobody has to remember to do it, and nothing depends on anybody noticing that a record has aged.",
      "The notification email sent to the board at the time is a second copy of the same details, and it sits in the recipient's institutional mailbox. Board members are asked to delete these messages once the four years are up, and we will not pretend to more than that: iFAB cannot impose a deletion schedule inside a mail system somebody's employer runs. If you ask us to erase your data, we pass that request to every board member who received it.",
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
      "On complaints: because iFAB has no establishment in the European Economic Area or the United Kingdom, there is no single lead supervisory authority for it. If you are in the EEA or the UK, the authority to approach is the one for the country where you live or work. We would of course rather hear from you first.",
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
      title="Privacy Policy"
      lastUpdated="16 September 2026"
      intro="This policy explains what personal data the iFAB website collects, why we collect it, who it is shared with, and the rights you have over it."
      sections={SECTIONS}
    />
  );
}
