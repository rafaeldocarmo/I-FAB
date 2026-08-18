/**
 * The roles offered by the Join form. Single source of truth for the form
 * options, the API allow-list, the notification email, and the Sanity schema
 * (`cms/schemaTypes/joinSubmission.ts` mirrors these values).
 */
export const JOIN_ROLES = [
  { value: "academic", label: "Academic" },
  { value: "industry", label: "Industry" },
  { value: "clinician", label: "Clinician" },
  { value: "other", label: "Other" },
] as const;

export type JoinRole = (typeof JOIN_ROLES)[number]["value"];

export const ALLOWED_JOIN_ROLES: ReadonlySet<string> = new Set(
  JOIN_ROLES.map((r) => r.value),
);

/** Human-readable role, falling back to the raw value for unknown input. */
export function joinRoleLabel(value: string): string {
  return JOIN_ROLES.find((r) => r.value === value)?.label ?? value;
}
