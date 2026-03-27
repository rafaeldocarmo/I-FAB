/** GROQ for congress list — keep in sync with `Congress` in `@/lib/types`. */
export const CONGRESS_LIST_QUERY = `*[_type == "congress"] | order(startDate desc) {
  _id, title, slug, venue, city, country, startDate, endDate,
  editionNumber, description, images, journalUrl,
  homeEyebrow
}`;
