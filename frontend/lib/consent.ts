/**
 * The wording shown next to the communications opt-in, and the version stamped
 * on every record.
 *
 * Consent has to be demonstrable, and a boolean cannot show *what* somebody
 * agreed to. The form renders this text and the API stores it verbatim next to
 * the answer, so every record carries the exact wording that was on screen at
 * the time. Changing the wording means bumping the version, never rewriting
 * records that were collected under the old one.
 */
export const COMMUNICATIONS_CONSENT_VERSION = "2026-08-18";

export const COMMUNICATIONS_CONSENT_TEXT =
  "Yes, i-FAB may email me occasionally about congresses and community news. " +
  "I can withdraw this at any time by emailing info@i-fab.org.";

/**
 * The notice shown at the point of collection, which is what Article 13
 * actually requires — telling people, rather than asking them to accept.
 * Kept here so the form and any future copy of it cannot drift apart.
 */
export const COLLECTION_NOTICE =
  "Your details go to the i-FAB board, who use them to reply to you and to consider your " +
  "interest in the community. We keep them for four years, never publish them on this site, " +
  "and never share them for advertising. To ask what we hold about you, to correct it, or to " +
  "have it deleted, email info@i-fab.org.";
