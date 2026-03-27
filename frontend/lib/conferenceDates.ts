const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Human-readable range for the homepage countdown block (e.g. "September 14–17, 2026").
 */
export function formatConferenceHomeDate(
  start?: string | null,
  end?: string | null,
): string {
  if (!start) return "";
  const s = new Date(start);
  if (Number.isNaN(s.getTime())) return "";

  const sm = MONTHS[s.getMonth()];
  const sd = s.getDate();
  const sy = s.getFullYear();

  if (!end) {
    return `${sm} ${sd}, ${sy}`;
  }

  const e = new Date(end);
  if (Number.isNaN(e.getTime())) {
    return `${sm} ${sd}, ${sy}`;
  }

  const em = MONTHS[e.getMonth()];
  const ed = e.getDate();
  const ey = e.getFullYear();

  if (sy === ey && s.getMonth() === e.getMonth()) {
    return `${sm} ${sd}–${ed}, ${sy}`;
  }

  if (sy === ey) {
    return `${sm} ${sd} – ${em} ${ed}, ${sy}`;
  }

  return `${sm} ${sd}, ${sy} – ${em} ${ed}, ${ey}`;
}
