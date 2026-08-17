import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";

export const metadata = {
  title: "Terms of Use — i-FAB",
  description:
    "The terms governing use of the International Foot and Ankle Biomechanics Community website.",
  // Draft: keep out of search results until the content is signed off.
  robots: { index: false, follow: false },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    body: [
      "By accessing or using this website you agree to these terms. If you do not agree with them, please do not use the site.",
      "The site is operated by the International Foot and Ankle Biomechanics Community (i-FAB). [[TO CONFIRM: registered name, legal form, and registered address of the entity operating the site]].",
    ],
  },
  {
    heading: "About this website",
    body: [
      "This site provides information about i-FAB, its scientific board, its mission, and its congresses, and allows you to express interest in joining the community or to contact the board.",
      "Content is provided for general information and scientific communication. It is not medical, clinical, or professional advice, and it must not be used as a substitute for consulting a qualified professional.",
    ],
  },
  {
    heading: "Permitted use",
    body: [
      "You may browse the site and use its forms for their intended purpose. You agree not to:",
    ],
    bullets: [
      "use the site or its forms to send unlawful, abusive, misleading, or unsolicited commercial messages;",
      "attempt to gain unauthorised access to the site, its systems, or its underlying infrastructure;",
      "interfere with the operation of the site, including by circumventing rate limits or submitting automated traffic; or",
      "scrape, copy, or redistribute the site's content at scale without our prior written permission.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The i-FAB name, logo, and the text, images, and design of this site are owned by i-FAB or its licensors and are protected by copyright and other rights.",
      "[[TO CONFIRM: the licence terms that should apply to congress photographs and to any proceedings or programme PDFs published through the site, and whether third-party contributors have granted the necessary permissions]].",
      "You may quote or link to material on this site with appropriate attribution. Any other reuse requires our permission.",
    ],
  },
  {
    heading: "Material you submit",
    body: [
      "When you submit information through the Join or Contact the Board forms, you confirm that the information is accurate and that you are entitled to provide it.",
      "Personal data submitted through these forms is handled as described in our Privacy Policy.",
      "Submitting the Join form is an expression of interest. It does not create membership, confer any status within i-FAB, or oblige us to respond. [[TO CONFIRM: whether i-FAB wishes to state any formal membership admission process here]].",
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
      "[[TO CONFIRM: the limitation of liability wording appropriate to the governing law chosen below. This clause materially affects i-FAB's legal exposure and must be drafted or approved by a qualified adviser rather than adapted from a template.]]",
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
      "[[TO CONFIRM: the governing law and the courts having jurisdiction — this should follow the jurisdiction in which the i-FAB entity is established]].",
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
      draft
      title="Terms of Use"
      lastUpdated="[[TO CONFIRM: publication date]]"
      intro="These terms govern your use of the i-FAB website. Please read them before using the site or submitting information through it."
      sections={SECTIONS}
    />
  );
}
