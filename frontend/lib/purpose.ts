/**
 * Why somebody filled the form in: to join the community, or to write to the
 * board.
 *
 * One form collects the same details either way, so the only thing that
 * separates the two is what the sender wants back. That makes the purpose
 * worth storing and worth putting in the subject line — the board needs to
 * know whether something is waiting on a reply or on a decision.
 *
 * Records created before this field existed have no purpose stored. They were
 * all membership interest, because that was the only form there was, so
 * everything that reads the field treats a missing value as `join`.
 */
export const PURPOSES = ["join", "contact"] as const;

export type Purpose = (typeof PURPOSES)[number];

export const DEFAULT_PURPOSE: Purpose = "join";

/** Anything that is not a known purpose falls back to the default. */
export function parsePurpose(raw: unknown): Purpose {
  return PURPOSES.includes(raw as Purpose) ? (raw as Purpose) : DEFAULT_PURPOSE;
}

/** What the visitor picks from, and what the board reads in the notification. */
export const PURPOSE_LABEL: Record<Purpose, string> = {
  join: "Join iFAB",
  contact: "Contact the board",
};

/**
 * A message is the entire point of writing to the board, so it is required
 * there. For membership interest it stays optional: the other fields already
 * say who somebody is.
 */
export function requiresMessage(purpose: Purpose): boolean {
  return purpose === "contact";
}
