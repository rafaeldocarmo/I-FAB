/**
 * How long a Join submission is kept, and the cutoff that follows from it.
 *
 * Four years spans two congress cycles, which is how long a submission stays
 * useful for the purpose it was given for. The Privacy Policy states this
 * period publicly, so it lives here rather than inline in the route that
 * enforces it: a promise made to the public and the job that keeps it must not
 * be able to drift apart.
 */
export const RETENTION_YEARS = 4;

/**
 * The instant before which submissions are due for deletion.
 *
 * Calendar arithmetic, not `4 × 365` days: subtracting fixed day counts drifts
 * by a day for every leap year in the window, which would quietly delete
 * records slightly early.
 */
export function retentionCutoff(now: Date = new Date()): Date {
  const cutoff = new Date(now);
  cutoff.setFullYear(cutoff.getFullYear() - RETENTION_YEARS);
  return cutoff;
}
